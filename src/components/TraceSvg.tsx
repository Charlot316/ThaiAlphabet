"use client";
import { useEffect, useRef, useState } from "react";
import { letterPath } from "@/lib/thaiFont";
import { feedbackComplete, feedbackTap } from "@/lib/feedback";

/**
 * 沿字母轮廓拖小球的描红组件（Duolingo 风格）。
 * - 字母的 outline path 来自 Noto Sans Thai 字体（opentype.js 提取）
 * - 用户按住起点的小球，拖着它沿 path 走到末端
 * - 拖偏路径时小球不动，重新靠近路径才能继续推进
 */
export default function TraceSvg({
  letter,
  onComplete,
}: {
  letter: string;
  onComplete?: () => void;
}) {
  const [d, setD] = useState<string | null>(null);
  const [vb, setVb] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dragging = useRef(false);
  const lastProgress = useRef(0);

  useEffect(() => {
    let cancelled = false;
    setProgress(0);
    setDone(false);
    setError(null);
    setD(null);
    lastProgress.current = 0;

    letterPath(letter, 240)
      .then(({ d, bbox }) => {
        if (cancelled) return;
        const w = bbox.x2 - bbox.x1;
        const h = bbox.y2 - bbox.y1;
        const pad = Math.max(w, h) * 0.12;
        setVb({
          x: bbox.x1 - pad,
          y: bbox.y1 - pad,
          w: w + pad * 2,
          h: h + pad * 2,
        });
        setD(d);
      })
      .catch((e) => {
        if (cancelled) return;
        setError((e as Error).message || "字体加载失败");
      });
    return () => {
      cancelled = true;
    };
  }, [letter]);

  // d 改变后等下一帧拿 totalLength
  useEffect(() => {
    if (d && pathRef.current) {
      const t = pathRef.current.getTotalLength();
      setTotal(t);
    }
  }, [d]);

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

  /** 在 [hint - back, hint + forward] 区间采样找最接近指针的 path 长度 */
  function nearestLengthAhead(
    x: number,
    y: number,
    hint: number
  ): { len: number; dist: number } {
    const path = pathRef.current;
    if (!path) return { len: hint, dist: Infinity };
    const back = Math.max(2, vb.w * 0.02);
    const forward = Math.max(20, vb.w * 0.18);
    const start = Math.max(0, hint - back);
    const end = Math.min(total, hint + forward);
    let bestLen = hint;
    let bestD2 = Infinity;
    const steps = 28;
    for (let i = 0; i <= steps; i++) {
      const t = start + ((end - start) * i) / steps;
      const p = path.getPointAtLength(t);
      const d2 = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
      if (d2 < bestD2) {
        bestD2 = d2;
        bestLen = t;
      }
    }
    return { len: bestLen, dist: Math.sqrt(bestD2) };
  }

  function onDown(e: React.PointerEvent) {
    if (done || !pathRef.current) return;
    const p = svgPoint(e);
    if (!p) return;
    // 必须从当前小球附近开始按下
    const ball = pathRef.current.getPointAtLength(progress);
    const tolerance = vb.w * 0.18;
    if (Math.hypot(p.x - ball.x, p.y - ball.y) > tolerance) return;
    dragging.current = true;
    feedbackTap();
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onMove(e: React.PointerEvent) {
    if (!dragging.current || done) return;
    const p = svgPoint(e);
    if (!p) return;
    const tolerance = vb.w * 0.22;
    const r = nearestLengthAhead(p.x, p.y, lastProgress.current);
    if (r.dist > tolerance) return; // 偏离路径，小球不动
    lastProgress.current = r.len;
    setProgress(r.len);
    if (total > 0 && r.len >= total * 0.97) {
      lastProgress.current = total;
      setProgress(total);
      setDone(true);
      dragging.current = false;
      feedbackComplete();
      onComplete?.();
    }
  }

  function onUp() {
    dragging.current = false;
  }

  function reset() {
    setProgress(0);
    setDone(false);
    lastProgress.current = 0;
  }

  if (error) {
    return (
      <div className="card-soft p-6 text-center text-sm" style={{ color: "var(--duo-red)" }}>
        ⚠️ 字体加载失败：{error}
      </div>
    );
  }
  if (!d) {
    return (
      <div className="card-soft p-12 text-center text-sm opacity-60">
        加载字体中...
      </div>
    );
  }

  // 计算小球位置
  const ballPoint = pathRef.current?.getPointAtLength(progress);
  const ballR = vb.w * 0.05;
  const strokeW = vb.w * 0.012;

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
          {/* 1. 灰色字母轮廓 fill - 提供视觉参考 */}
          <path d={d} fill="rgba(0,0,0,0.06)" stroke="rgba(0,0,0,0.18)" strokeWidth={strokeW} />
          {/* 2. 实际跟踪的 path（不可见，只用于 getPointAtLength） */}
          <path ref={pathRef} d={d} fill="none" stroke="transparent" strokeWidth={0} />
          {/* 3. 已走过的部分高亮绿色 */}
          {total > 0 && (
            <path
              d={d}
              fill="none"
              stroke="var(--duo-green)"
              strokeWidth={strokeW * 3}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${progress} ${Math.max(0, total - progress + 1)}`}
            />
          )}
          {/* 4. 小球（起点 / 当前位置 / 终点） */}
          {ballPoint && (
            <g style={{ pointerEvents: "none" }}>
              <circle
                cx={ballPoint.x}
                cy={ballPoint.y}
                r={ballR * 1.5}
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
              width: `${total > 0 ? Math.round((progress / total) * 100) : 0}%`,
            }}
          />
        </div>
        <span className="w-10 text-right font-mono text-xs opacity-70">
          {total > 0 ? Math.round((progress / total) * 100) : 0}%
        </span>
        <button onClick={reset} className="btn-orange px-3 text-xs">
          🔄 重来
        </button>
      </div>
      <p className="text-center text-xs opacity-60">
        {done ? "✨ 完成！按下一个继续" : "按住绿/蓝色小球，沿灰色轮廓拖动"}
      </p>
    </div>
  );
}
