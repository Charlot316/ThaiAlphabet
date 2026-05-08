"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { letterPath, letterSkeleton } from "@/lib/thaiFont";
import { feedbackComplete, feedbackTap } from "@/lib/feedback";
import { getLetterStrokes } from "@/data/strokes";

const DRAFT_KEY = "thai-alphabet:strokes-draft:v1";

function loadLocalStrokeDraft(key: string): { strokes: { d: string }[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as Record<string, { strokes?: Array<{ d?: string }> }>;
    const strokes = draft[key]?.strokes?.filter((stroke): stroke is { d: string } => typeof stroke.d === "string") ?? [];
    return strokes.length > 0 ? { strokes } : null;
  } catch {
    return null;
  }
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
  const [outline, setOutline] = useState<{ d: string; transform?: string; offX?: number; offY?: number; scale?: number } | null>(null);
  const [skeletonPaths, setSkeletonPaths] = useState<string[]>([]);
  const [vb, setVb] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    let cancelled = false;
    setOutline(null);
    setSkeletonPaths([]);
    setError(null);
    setActiveIdx(0);
    setProgress(0);
    lastProgress.current = 0;
    setDone(false);

    const localDraft = loadLocalStrokeDraft(lookupKey);
    // 优先尝试用录制草稿，其次用手工录入的笔画数据（src/data/strokes.ts）
    const manual = localDraft ?? getLetterStrokes(lookupKey);
    if (manual && manual.strokes.length > 0) {
      // 手工数据用 viewBox 0..100，把字体 outline 映射进同一个 viewBox 作背景
      letterPath(letter, 240)
        .then(({ d, bbox }) => {
          if (cancelled) return;
          const w = bbox.x2 - bbox.x1;
          const h = bbox.y2 - bbox.y1;
          if (w > 0 && h > 0) {
            const VB = 100;
            const PAD = 6;
            const scale = (VB - PAD * 2) / Math.max(w, h);
            const offX = (VB - w * scale) / 2 - bbox.x1 * scale;
            const offY = (VB - h * scale) / 2 - bbox.y1 * scale;
            setOutline({
              d,
              transform: `translate(${offX} ${offY}) scale(${scale})`,
              offX,
              offY,
              scale,
            });
          }
          setVb({ x: 0, y: 0, w: 100, h: 100 });
          setSkeletonPaths(manual.strokes.map((s) => s.d));
        })
        .catch((e) => {
          if (cancelled) return;
          setError((e as Error).message || "字体加载失败");
        });
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
  }, [letter, lookupKey]);

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

  function onDown(e: React.PointerEvent) {
    if (done || !activePath) return;
    const p = svgPoint(e);
    if (!p || !ballPoint) return;
    if (!isInsideGlyph(p)) return;
    const tolerance = vb.w * 0.18;
    if (Math.hypot(p.x - ballPoint.x, p.y - ballPoint.y) > tolerance) return;
    dragging.current = true;
    feedbackTap();
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onMove(e: React.PointerEvent) {
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
      // 推进到下一段
      const nextIdx = activeIdx + 1;
      if (nextIdx < skeletonPaths.length) {
        feedbackTap();
        setActiveIdx(nextIdx);
        setProgress(0);
        lastProgress.current = 0;
      } else {
        setDone(true);
        dragging.current = false;
        feedbackComplete();
        onComplete?.();
      }
    }
  }

  function onUp() {
    dragging.current = false;
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
  const skeletonStrokeW = vb.w * 0.025;
  const trailStrokeW = vb.w * 0.04;

  return (
    <div className="space-y-3">
      <div className="card-soft overflow-hidden p-3">
        <svg
          ref={svgRef}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          className="block w-full select-none touch-none"
          style={{ aspectRatio: `${vb.w} / ${vb.h}`, background: "white" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <path
            ref={outlinePathRef}
            d={outline.d}
            fill="black"
            opacity={0}
            style={{ pointerEvents: "none" }}
          />
          {/* 背景：字体 outline 淡色填充作视觉参考 */}
          {outline.transform ? (
            <g transform={outline.transform}>
              <path d={outline.d} fill="rgba(0,0,0,0.07)" stroke="rgba(0,0,0,0.13)" strokeWidth={1} />
            </g>
          ) : (
            <path d={outline.d} fill="rgba(0,0,0,0.07)" stroke="rgba(0,0,0,0.13)" strokeWidth={vb.w * 0.005} />
          )}

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
