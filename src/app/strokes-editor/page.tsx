"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import { letterPath } from "@/lib/thaiFont";

// 录入数据格式：与 src/data/strokes.ts 对齐
interface LetterStrokes {
  strokes: { d: string }[];
  v: number;
}

const DRAFT_KEY = "thai-alphabet:strokes-draft:v1";
const VB = 100; // 统一坐标 0..100
const PAD = 6; // 左右上下各预留 6%

// Catmull-Rom -> cubic bezier，让点连起来更顺滑
function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const p = points[0];
    return `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  }
  if (points.length === 2) {
    return `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)} L ${points[1].x.toFixed(2)} ${points[1].y.toFixed(2)}`;
  }
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function loadDraft(): Record<string, LetterStrokes> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(DRAFT_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveDraft(d: Record<string, LetterStrokes>) {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
}

export default function StrokesEditorPage() {
  const items = useMemo(() => CONSONANTS.filter((c) => !c.obsolete), []);
  const [idx, setIdx] = useState(0);
  const letter = items[idx].letter;
  const cInfo = items[idx];

  // 当前字母的笔画（已完成）
  const [strokes, setStrokes] = useState<{ x: number; y: number }[][]>([]);
  // 当前正在画的笔画的点
  const [current, setCurrent] = useState<{ x: number; y: number }[]>([]);
  // 字体 outline 用于背景参考（已映射到 0..100）
  const [outlineNorm, setOutlineNorm] = useState<string | null>(null);
  // 整体进度
  const [draft, setDraft] = useState<Record<string, LetterStrokes>>({});

  const svgRef = useRef<SVGSVGElement>(null);

  // 切字母时加载该字母 draft
  useEffect(() => {
    const d = loadDraft();
    setDraft(d);
    const cur = d[letter];
    setStrokes(cur ? cur.strokes.map(parsePathToPoints) : []);
    setCurrent([]);
  }, [letter]);

  // 加载字母 outline 并归一化到 0..100
  useEffect(() => {
    let cancelled = false;
    setOutlineNorm(null);
    letterPath(letter, 240)
      .then(({ d, bbox }) => {
        if (cancelled) return;
        const w = bbox.x2 - bbox.x1;
        const h = bbox.y2 - bbox.y1;
        if (w <= 0 || h <= 0) return;
        // 把 path 平移 + 缩放到 0..100（保持纵横比，居中）
        const scale = (VB - PAD * 2) / Math.max(w, h);
        const offX = (VB - w * scale) / 2 - bbox.x1 * scale;
        const offY = (VB - h * scale) / 2 - bbox.y1 * scale;
        // outline 字符串以 JSON 形式挂出，render 时套 transform
        setOutlineNorm(JSON.stringify({ d, offX, offY, scale }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [letter]);

  function parsePathToPoints(): { x: number; y: number }[] {
    return [];
  }

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

  function onClickCanvas(e: React.PointerEvent) {
    const p = svgPoint(e);
    if (!p) return;
    if (p.x < 0 || p.x > VB || p.y < 0 || p.y > VB) return;
    setCurrent((cur) => [...cur, p]);
  }

  function undoLast() {
    if (current.length > 0) {
      setCurrent((c) => c.slice(0, -1));
    } else if (strokes.length > 0) {
      // 把最后一笔的点恢复为 current
      const last = strokes[strokes.length - 1];
      setStrokes((s) => s.slice(0, -1));
      setCurrent(last);
    }
  }

  function finishStroke() {
    if (current.length < 2) {
      alert("一笔至少需要 2 个点");
      return;
    }
    setStrokes((s) => [...s, current]);
    setCurrent([]);
  }

  function deleteStroke(i: number) {
    setStrokes((s) => s.filter((_, j) => j !== i));
  }

  function clearAll() {
    if (!confirm(`确定清空 ${letter} 的所有笔画？`)) return;
    setStrokes([]);
    setCurrent([]);
  }

  function commitToDraft() {
    const allStrokes = current.length >= 2 ? [...strokes, current] : strokes;
    if (allStrokes.length === 0) {
      // 删除该字母
      const next = { ...draft };
      delete next[letter];
      saveDraft(next);
      setDraft(next);
      return;
    }
    const data: LetterStrokes = {
      v: 1,
      strokes: allStrokes.map((pts) => ({ d: smoothPath(pts) })),
    };
    const next = { ...draft, [letter]: data };
    saveDraft(next);
    setDraft(next);
    setCurrent([]);
  }

  function nextLetter() {
    commitToDraft();
    setIdx((i) => Math.min(items.length - 1, i + 1));
  }
  function prevLetter() {
    commitToDraft();
    setIdx((i) => Math.max(0, i - 1));
  }
  function gotoFirstUnfinished() {
    commitToDraft();
    const d = loadDraft();
    for (let i = 0; i < items.length; i++) {
      if (!d[items[i].letter]) {
        setIdx(i);
        return;
      }
    }
    alert("全部字母都已录入！");
  }

  function exportJSON() {
    commitToDraft();
    const d = loadDraft();
    const json = JSON.stringify(d, null, 2);
    navigator.clipboard.writeText(json).then(
      () => alert(`已复制到剪贴板！包含 ${Object.keys(d).length} 个字母\n\n粘贴到 src/data/strokes.ts 的 LETTER_STROKES 对象`),
      () => {
        // fallback: open in new window
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        window.open(url);
      }
    );
  }

  function resetDraft() {
    if (!confirm("确定清空所有字母的录入草稿？此操作不可撤销。")) return;
    saveDraft({});
    setDraft({});
    setStrokes([]);
    setCurrent([]);
  }

  const totalDone = Object.keys(draft).length;
  const outline = outlineNorm ? (JSON.parse(outlineNorm) as { d: string; offX: number; offY: number; scale: number }) : null;

  return (
    <div className="space-y-3">
      <div className="card-soft p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold">✏️ 笔画录入工具</h1>
            <p className="mt-0.5 text-xs opacity-70">按教材顺序点关键点；每笔结束按「完成此笔」；自动存 localStorage</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold" style={{ color: "var(--duo-green)" }}>
              {totalDone}/{items.length}
            </div>
            <div className="text-[10px] uppercase opacity-60">已录入</div>
          </div>
        </div>
        <div className="progress-track mt-2">
          <div className="progress-fill" style={{ width: `${(totalDone / items.length) * 100}%` }} />
        </div>
      </div>

      {/* 当前字母信息 */}
      <div className="card-soft flex items-center gap-3 p-3">
        <div
          className="thai-big flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-5xl text-white"
          style={{ background: "var(--duo-green)", boxShadow: "0 4px 0 var(--duo-green-shadow)" }}
        >
          {letter}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm">
            <b>{idx + 1} / {items.length}</b> · <span className="thai-big">{cInfo.name}</span>{" "}
            <span className="opacity-70">{cInfo.meaning}</span>
          </div>
          <div className="mt-0.5 text-xs opacity-60">
            已完成笔画 {strokes.length} 段；当前 {current.length} 个点
            {draft[letter] ? " · ✅ 已存草稿" : ""}
          </div>
        </div>
      </div>

      {/* 编辑画布 */}
      <div className="card-soft p-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB} ${VB}`}
          className="block w-full select-none touch-none"
          style={{ aspectRatio: "1 / 1", background: "white" }}
          onPointerDown={onClickCanvas}
        >
          {/* 网格 */}
          {[25, 50, 75].map((p) => (
            <g key={p} stroke="rgba(0,0,0,0.05)" strokeWidth={0.2}>
              <line x1={p} y1={0} x2={p} y2={VB} />
              <line x1={0} y1={p} x2={VB} y2={p} />
            </g>
          ))}
          {/* 字母 outline 背景 */}
          {outline && (
            <g
              transform={`translate(${outline.offX} ${outline.offY}) scale(${outline.scale})`}
              fill="rgba(0,0,0,0.1)"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
            >
              <path d={outline.d} />
            </g>
          )}
          {/* 已完成的笔画 */}
          {strokes.map((pts, i) => (
            <g key={i} style={{ pointerEvents: "none" }}>
              <path
                d={smoothPath(pts)}
                fill="none"
                stroke="var(--duo-green)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.85}
              />
              {/* 起点标号 */}
              {pts[0] && (
                <g>
                  <circle cx={pts[0].x} cy={pts[0].y} r={2.5} fill="var(--duo-green)" />
                  <text x={pts[0].x + 3} y={pts[0].y - 3} fontSize={4} fill="var(--duo-green-d)" fontWeight={800}>
                    {i + 1}
                  </text>
                </g>
              )}
            </g>
          ))}
          {/* 正在画的笔画 */}
          {current.length > 0 && (
            <g style={{ pointerEvents: "none" }}>
              <path
                d={smoothPath(current)}
                fill="none"
                stroke="var(--duo-blue)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2 1"
              />
              {current.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={1.8}
                  fill="var(--duo-blue)"
                  stroke="white"
                  strokeWidth={0.5}
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* 操作 */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={undoLast} className="btn-ghost text-xs" disabled={current.length === 0 && strokes.length === 0}>
          ↶ 撤销最后一点
        </button>
        <button
          onClick={finishStroke}
          className="btn-blue text-xs"
          disabled={current.length < 2}
        >
          ✓ 完成此笔（共 {current.length} 点）
        </button>
      </div>

      {strokes.length > 0 && (
        <div className="card-soft p-3 text-xs">
          <div className="mb-2 font-bold">已完成的笔画</div>
          <ul className="space-y-1">
            {strokes.map((pts, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg bg-black/5 px-2 py-1">
                <span>第 {i + 1} 笔（{pts.length} 点）</span>
                <button onClick={() => deleteStroke(i)} className="text-rose-500">删除</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <button onClick={prevLetter} className="btn-ghost text-xs" disabled={idx === 0}>
          ‹ 上一字
        </button>
        <button onClick={clearAll} className="btn-orange text-xs">🗑 清空此字</button>
        <button onClick={nextLetter} className="btn-primary text-xs" disabled={idx === items.length - 1}>
          下一字 ›
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={gotoFirstUnfinished} className="btn-blue text-xs">⏭ 跳到首个未录入</button>
        <button onClick={exportJSON} className="btn-primary text-xs">📋 导出 JSON</button>
      </div>

      <button onClick={resetDraft} className="btn-red w-full text-xs">⚠️ 重置全部草稿</button>

      <section className="card-soft p-3 text-xs leading-relaxed opacity-80">
        <h3 className="text-sm font-bold opacity-100">使用说明</h3>
        <ol className="mt-1 list-decimal space-y-0.5 pl-4">
          <li>对照教材，按笔画顺序在画布上点关键点（拐弯、起止）</li>
          <li>每笔几个点足够（3–8 个），系统自动平滑成曲线</li>
          <li>一笔结束 → 「完成此笔」；下一笔继续点</li>
          <li>所有笔画完成 → 「下一字」自动保存草稿</li>
          <li>分多次录入 OK，进度存浏览器本地</li>
          <li>全部完成 → 「导出 JSON」，粘贴到 <code>src/data/strokes.ts</code> 的 <code>LETTER_STROKES</code> 对象</li>
        </ol>
      </section>
    </div>
  );
}
