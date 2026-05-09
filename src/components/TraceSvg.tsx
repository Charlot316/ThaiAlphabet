"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { letterSkeleton } from "@/lib/thaiFont";
import { feedbackComplete, feedbackTap } from "@/lib/feedback";
import { composeLetterStrokes, getLetterStrokes, getVowelStrokeComponentKeys, type LetterStrokes } from "@/data/strokes";
import { lockPageScroll, preventElementTouchScroll, unlockPageScroll, type PageScrollLock } from "@/lib/scrollLock";
import { resolveStrokeSequence } from "@/lib/pathOrder";

// NOTE: 笔画数据完全使用 src/data/strokes.ts 里写死的内容，不读取 localStorage 草稿。
// 远程/本地 draft 只在 strokes-editor 页面用于编辑，不影响实际书写练习。
function loadTraceStrokes(key: string): LetterStrokes | null {
  const componentKeys = getVowelStrokeComponentKeys(key);
  if (componentKeys) {
    return composeLetterStrokes(key);
  }
  return getLetterStrokes(key);
}

/**
 * 沿字母骨架（中线）拖小球的描红组件，Duolingo 风。
 * - 背景显示字体 outline 作视觉参考
 * - 真正可拖的小球沿"骨架"前进（中线，不是双圈外轮廓）
 * - 用户拖动指针时，小球只能沿路径推进；偏离太远小球不动
 * - 走完所有 sub-path 总长度的 95% 算完成
 */
export default function TraceSvg({
  letter,
  strokeKey,
  onComplete,
}: {
  /** 用来渲染字体 outline 的字符（可包含辅音占位符替换后的完整泰文字符串） */
  letter: string;
  /** 用来查询 LETTER_STROKES 的 key；不传则用 letter */
  strokeKey?: string;
  onComplete?: () => void;
}) {
  const lookupKey = strokeKey ?? letter;
  const [strokesVersion, setStrokesVersion] = useState(0);
  useEffect(() => {
    const bump = () => setStrokesVersion((v) => v + 1);
    window.addEventListener("thai-alphabet:strokes", bump);
    return () => window.removeEventListener("thai-alphabet:strokes", bump);
  }, []);
  const [outline, setOutline] = useState<{ d: string; transform?: string; offX?: number; offY?: number; scale?: number } | null>(null);
  const [skeletonPaths, setSkeletonPaths] = useState<string[]>([]);
  const [guidePaths, setGuidePaths] = useState<string[]>([]);
  const [vb, setVb] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const [error, setError] = useState<string | null>(null);
  const [constrainToOutline, setConstrainToOutline] = useState(true);

  // 当前正在描的 sub-path 序号
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalsPerPath, setTotalsPerPath] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const outlinePathRef = useRef<SVGPathElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dragging = useRef(false);
  const lastProgress = useRef(0);
  const scrollLock = useRef<PageScrollLock | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    return preventElementTouchScroll(svg);
  }, [outline]);

  useEffect(() => {
    return () => {
      unlockPageScroll(scrollLock.current);
      scrollLock.current = null;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setOutline(null);
    setSkeletonPaths([]);
    setGuidePaths([]);
    setError(null);
    setConstrainToOutline(true);
    setActiveIdx(0);
    setProgress(0);
    lastProgress.current = 0;
    setDone(false);

    // 元音整项由已编辑的元素拼成；辅音/元素本身优先读本地草稿，再回退到内置数据。
    const manual = loadTraceStrokes(lookupKey);
    if (manual && manual.strokes.length > 0) {
      const resolvedStrokes = manual.strokes
        .map((stroke) => resolveStrokeSequence(stroke))
        .filter((stroke) => stroke.d.trim().length > 0);
      if (resolvedStrokes.length === 0) {
        setError("还没有可描红的笔画");
        return () => {
          cancelled = true;
        };
      }
      // 手工 SVG 数据本身就是描红底纹；不要再叠字体 outline，避免轻微错位。
      setOutline({ d: "" });
      setVb({ x: 0, y: 0, w: 100, h: 100 });
      setSkeletonPaths(resolvedStrokes.map((s) => s.d));
      setGuidePaths(manual.guides?.map((s) => s.d) ?? []);
      setConstrainToOutline(false);
      return () => {
        cancelled = true;
      };
    }

    // fallback：算法骨架
    letterSkeleton(letter, 240)
      .then((res) => {
        if (cancelled) return;
        setOutline({ d: res.outline });
        setSkeletonPaths(res.paths);
        setVb(res.viewBox);
        if (res.paths.length === 0) {
          setError("无法提取骨架（字符过窄）");
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError((e as Error).message || "字体加载失败");
      });

    return () => {
      cancelled = true;
    };
  }, [letter, lookupKey, strokesVersion]);

  // skeleton paths 更新后取每段总长
  useEffect(() => {
    if (skeletonPaths.length === 0) {
      setTotalsPerPath([]);
      return;
    }
    // 等下一帧 ref 挂上
    requestAnimationFrame(() => {
      const totals = skeletonPaths.map((_, i) => {
        const el = pathRefs.current[i];
        return el ? el.getTotalLength() : 0;
      });
      setTotalsPerPath(totals);
    });
  }, [skeletonPaths]);

  const totalAll = useMemo(() => totalsPerPath.reduce((a, b) => a + b, 0), [totalsPerPath]);
  const doneAll = useMemo(() => {
    if (!totalsPerPath.length) return 0;
    let s = 0;
    for (let i = 0; i < activeIdx; i++) s += totalsPerPath[i];
    s += progress;
    return s;
  }, [totalsPerPath, activeIdx, progress]);

  function svgPoint(e: React.PointerEvent): { x: number; y: number } | null {
    const svg = svgRef.current;
    if (!svg) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }

  function isInsideGlyph(p: { x: number; y: number }): boolean {
    if (!constrainToOutline) return true;
    const path = outlinePathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return true;
    const local = svg.createSVGPoint();
    if (outline?.scale) {
      local.x = (p.x - (outline.offX ?? 0)) / outline.scale;
      local.y = (p.y - (outline.offY ?? 0)) / outline.scale;
    } else {
      local.x = p.x;
      local.y = p.y;
    }
    const hit = path as unknown as { isPointInFill?: (point: DOMPointInit) => boolean };
    return hit.isPointInFill ? hit.isPointInFill(local) : true;
  }

  function nearestLengthAhead(
    pathEl: SVGPathElement,
    x: number,
    y: number,
    hint: number,
    total: number
  ): { len: number; dist: number } {
    const back = Math.max(2, vb.w * 0.025);
    const forward = Math.max(20, vb.w * 0.18);
    const start = Math.max(0, hint - back);
    const end = Math.min(total, hint + forward);
    let bestLen = hint;
    let bestD2 = Infinity;
    const steps = 26;
    for (let i = 0; i <= steps; i++) {
      const t = start + ((end - start) * i) / steps;
      const p = pathEl.getPointAtLength(t);
      const d2 = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
      if (d2 < bestD2) {
        bestD2 = d2;
        bestLen = t;
      }
    }
    return { len: bestLen, dist: Math.sqrt(bestD2) };
  }

  const activePath = pathRefs.current[activeIdx] || null;
  const activeTotal = totalsPerPath[activeIdx] || 0;
  const ballPoint =
    activePath && activeTotal > 0 ? activePath.getPointAtLength(progress) : null;

  function lockDrawingScroll() {
    if (!scrollLock.current) scrollLock.current = lockPageScroll();
  }

  function unlockDrawingScroll() {
    unlockPageScroll(scrollLock.current);
    scrollLock.current = null;
  }

  function onDown(e: React.PointerEvent) {
    e.preventDefault();
    lockDrawingScroll();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    if (done || !activePath) return;
    const p = svgPoint(e);
    if (!p || !ballPoint) return;
    if (!isInsideGlyph(p)) return;
    const tolerance = vb.w * 0.18;
    if (Math.hypot(p.x - ballPoint.x, p.y - ballPoint.y) > tolerance) return;
    dragging.current = true;
    feedbackTap();
  }

  function onMove(e: React.PointerEvent) {
    e.preventDefault();
    if (!dragging.current || done || !activePath) return;
    const p = svgPoint(e);
    if (!p) return;
    if (!isInsideGlyph(p)) return;
    const tolerance = vb.w * 0.22;
    const r = nearestLengthAhead(activePath, p.x, p.y, lastProgress.current, activeTotal);
    if (r.dist > tolerance) return;
    lastProgress.current = r.len;
    setProgress(r.len);

    if (activeTotal > 0 && r.len >= activeTotal * 0.96) {
      // 当前 sub-path 完成
      lastProgress.current = activeTotal;
      setProgress(activeTotal);
      // 推进到下一段；强制松手再继续，避免一口气连画下一笔。
      const nextIdx = activeIdx + 1;
      if (nextIdx < skeletonPaths.length) {
        feedbackTap();
        setActiveIdx(nextIdx);
        setProgress(0);
        lastProgress.current = 0;
        dragging.current = false;
      } else {
        setDone(true);
        dragging.current = false;
        feedbackComplete();
        onComplete?.();
      }
    }
  }

  function onUp(e?: React.PointerEvent) {
    e?.preventDefault();
    dragging.current = false;
    unlockDrawingScroll();
  }

  function reset() {
    setActiveIdx(0);
    setProgress(0);
    lastProgress.current = 0;
    setDone(false);
  }

  if (error) {
    return (
      <div className="card-soft p-6 text-center text-sm" style={{ color: "var(--duo-red)" }}>
        ⚠️ {error}
      </div>
    );
  }

  if (!outline) {
    return (
      <div className="card-soft p-12 text-center text-sm opacity-60">
        加载字体中...
      </div>
    );
  }

  const ballR = vb.w * 0.045;
  const skeletonStrokeW = vb.w * (constrainToOutline ? 0.027 : 0.018);
  const trailStrokeW = vb.w * (constrainToOutline ? 0.042 : 0.0275);

  return (
    <div className="space-y-3">
      <div className="card-soft overflow-hidden p-3">
        <svg
          ref={svgRef}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          className="block w-full select-none touch-none"
          style={{
            aspectRatio: `${vb.w} / ${vb.h}`,
            background: "white",
            touchAction: "none",
            overscrollBehavior: "contain",
            WebkitUserSelect: "none",
          }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          {outline.d && (
            <path
              ref={outlinePathRef}
              d={outline.d}
              fill="black"
              opacity={0}
              style={{ pointerEvents: "none" }}
            />
          )}
          {/* 背景：字体 outline 淡色填充作视觉参考 */}
          {outline.transform ? (
            <g transform={outline.transform}>
              <path d={outline.d} fill="rgba(0,0,0,0.07)" stroke="rgba(0,0,0,0.13)" strokeWidth={1} />
            </g>
          ) : outline.d ? (
            <path d={outline.d} fill="rgba(0,0,0,0.07)" stroke="rgba(0,0,0,0.13)" strokeWidth={vb.w * 0.005} />
          ) : null}

          {guidePaths.map((d, i) => (
            <path
              key={`guide-${i}`}
              d={d}
              fill="none"
              stroke="rgba(0,0,0,0.22)"
              strokeWidth={vb.w * 0.018}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${vb.w * 0.01} ${vb.w * 0.015}`}
              pointerEvents="none"
            />
          ))}

          {/* 骨架路径（每条单独一个 path，用于追踪与可视化） */}
          {skeletonPaths.map((d, i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={d}
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth={skeletonStrokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${vb.w * 0.012} ${vb.w * 0.018}`}
            />
          ))}

          {/* 每条骨架已走过部分高亮绿色 */}
          {skeletonPaths.map((d, i) => {
            const total = totalsPerPath[i] || 0;
            let drawLen = 0;
            if (i < activeIdx) drawLen = total;
            else if (i === activeIdx) drawLen = progress;
            return (
              <path
                key={`hl-${i}`}
                d={d}
                fill="none"
                stroke="var(--duo-green)"
                strokeWidth={trailStrokeW}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${drawLen} ${Math.max(0, total - drawLen + 1)}`}
              />
            );
          })}

          {/* 小球 */}
          {ballPoint && (
            <g style={{ pointerEvents: "none" }}>
              <circle
                cx={ballPoint.x}
                cy={ballPoint.y}
                r={ballR * 1.6}
                fill={done ? "var(--duo-green)" : "var(--duo-blue)"}
                opacity={0.25}
              />
              <circle
                cx={ballPoint.x}
                cy={ballPoint.y}
                r={ballR}
                fill={done ? "var(--duo-green)" : "var(--duo-blue)"}
                stroke="white"
                strokeWidth={ballR * 0.3}
              />
            </g>
          )}
        </svg>
      </div>

      <div className="flex items-center gap-2">
        <div className="progress-track flex-1">
          <div
            className="progress-fill"
            style={{
              width: `${totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0}%`,
            }}
          />
        </div>
        <span className="w-10 text-right font-mono text-xs opacity-70">
          {totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0}%
        </span>
        <button onClick={reset} className="btn-orange px-3 text-xs">
          🔄
        </button>
      </div>
      <p className="text-center text-xs opacity-60">
        {done
          ? "✨ 完成！按下一个继续"
          : `按住小球，沿虚线骨架拖动${
              skeletonPaths.length > 1 ? ` (${activeIdx + 1}/${skeletonPaths.length} 段)` : ""
            }`}
      </p>
    </div>
  );
}
