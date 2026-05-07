"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { letterPath, letterSkeleton } from "@/lib/thaiFont";

interface CompletedStroke {
  d: string;
  pointCount: number;
  source: "auto" | "manual";
}

interface CandidateStroke {
  points: Point[];
  sourceIndex: number;
}

interface StrokeDraft {
  v: number;
  strokes: { d: string }[];
  candidates?: CandidateStroke[];
  updated_at?: number;
}

type Point = { x: number; y: number };

const DRAFT_KEY = "thai-alphabet:strokes-draft:v1";
const VB = 100;
const PAD = 6;

interface EditorItem {
  /** 在 LETTER_STROKES 中的 key */
  key: string;
  /** 顶部大方块里显示的字符 */
  display: string;
  /** 用于渲染字体 outline 背景的 string（含辅音占位） */
  outlineSource: string;
  label: string;
  meaning: string;
  kind: "consonant" | "vowel";
}

function buildItems(): EditorItem[] {
  const consonants: EditorItem[] = CONSONANTS.filter((c) => !c.obsolete).map((c) => ({
    key: c.letter,
    display: c.letter,
    outlineSource: c.letter,
    label: c.name,
    meaning: c.meaning,
    kind: "consonant",
  }));
  const vowels: EditorItem[] = VOWELS.map((v) => ({
    key: `v:${v.id}`,
    display: v.display,
    // 字体 outline 用 ก 替换占位符让 TTS / 字形稳定显示组合
    outlineSource: v.display.replace(/◌/g, "ก"),
    label: v.roman + (v.length === "long" ? " (长)" : v.length === "short" ? " (短)" : ""),
    meaning: v.notes ?? "",
    kind: "vowel",
  }));
  return [...consonants, ...vowels];
}

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

function parseLinePath(d: string): Point[] {
  const tokens = d.match(/[ML]|-?\d+(?:\.\d+)?/g) ?? [];
  const points: Point[] = [];
  let i = 0;
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd !== "M" && cmd !== "L") continue;
    const x = Number(tokens[i++]);
    const y = Number(tokens[i++]);
    if (Number.isFinite(x) && Number.isFinite(y)) points.push({ x, y });
  }
  return points;
}

function normalizeSkeletonPoints(
  d: string,
  norm: { offX: number; offY: number; scale: number }
): Point[] {
  return parseLinePath(d).map((point) => ({
    x: Number((point.x * norm.scale + norm.offX).toFixed(2)),
    y: Number((point.y * norm.scale + norm.offY).toFixed(2)),
  }));
}

function normalizeDraft(raw: unknown): StrokeDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Partial<StrokeDraft>;
  if (!Array.isArray(value.strokes)) return null;
  return {
    v: value.v || 1,
    strokes: value.strokes.filter((stroke) => stroke && typeof stroke.d === "string"),
    candidates: Array.isArray(value.candidates)
      ? value.candidates
          .map((candidate, sourceIndex) => ({
            sourceIndex: candidate?.sourceIndex ?? sourceIndex,
            points: Array.isArray(candidate?.points) ? candidate.points : [],
          }))
          .filter((candidate) => candidate.points.length >= 2)
      : undefined,
    updated_at: typeof value.updated_at === "number" ? value.updated_at : undefined,
  };
}

function loadDraft(): Record<string, StrokeDraft> {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(DRAFT_KEY) || "{}") as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed)
        .map(([key, value]) => [key, normalizeDraft(value)] as const)
        .filter((entry): entry is [string, StrokeDraft] => Boolean(entry[1]))
    );
  } catch {
    return {};
  }
}
function saveDraft(d: Record<string, StrokeDraft>) {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
}

function authHeaders(): HeadersInit {
  const token = window.localStorage.getItem("thai-alphabet:sync:token") || "";
  return token ? { authorization: `Bearer ${token}` } : {};
}

async function fetchRemoteDraft(key: string): Promise<StrokeDraft | null> {
  const res = await fetch(`/api/strokes?key=${encodeURIComponent(key)}`, {
    headers: authHeaders(),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { item?: { value: string; updated_at: number } | null };
  if (!data.item) return null;
  try {
    const parsed = normalizeDraft(JSON.parse(data.item.value));
    return parsed ? { ...parsed, updated_at: data.item.updated_at } : null;
  } catch {
    return null;
  }
}

async function pushRemoteDraft(key: string, draft: StrokeDraft) {
  await fetch("/api/strokes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({
      key,
      value: JSON.stringify(draft),
      updated_at: draft.updated_at || Date.now(),
    }),
  });
}

type Tab = "consonant" | "vowel";

export default function StrokesEditorPage() {
  const allItems = useMemo(buildItems, []);
  const [tab, setTab] = useState<Tab>("consonant");
  const items = useMemo(() => allItems.filter((it) => it.kind === tab), [allItems, tab]);

  const [idx, setIdx] = useState(0);
  const item = items[idx] ?? items[0];

  const [strokes, setStrokes] = useState<CompletedStroke[]>([]);
  const [current, setCurrent] = useState<{ x: number; y: number }[]>([]);
  const [outlineNorm, setOutlineNorm] = useState<{ d: string; offX: number; offY: number; scale: number } | null>(null);
  const [candidates, setCandidates] = useState<CandidateStroke[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [activeCandidate, setActiveCandidate] = useState<number | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [draft, setDraft] = useState<Record<string, StrokeDraft>>({});

  const svgRef = useRef<SVGSVGElement>(null);
  const draggingPoint = useRef<{ candidate: number; point: number } | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 切 tab 时回到 0
  useEffect(() => {
    setIdx(0);
  }, [tab]);

  // 切字母加载该 key 草稿
  useEffect(() => {
    if (!item) return;
    const d = loadDraft();
    setDraft(d);
    const cur = d[item.key];
    setStrokes(cur ? cur.strokes.map((s) => ({ d: s.d, pointCount: 0, source: "auto" })) : []);
    setCandidates(cur?.candidates ?? []);
    setCurrent([]);
    setSelectedCandidates([]);
    setActiveCandidate(null);
    setSelectedPoint(null);
    setSaveState(cur ? "saved" : "idle");

    fetchRemoteDraft(item.key).then((remote) => {
      if (!remote) return;
      const latestLocal = loadDraft()[item.key];
      const localStamp = latestLocal?.updated_at || 0;
      if ((remote.updated_at || 0) <= localStamp) return;
      const next = { ...loadDraft(), [item.key]: remote };
      saveDraft(next);
      setDraft(next);
      setStrokes(remote.strokes.map((s) => ({ d: s.d, pointCount: 0, source: "auto" })));
      setCandidates(remote.candidates ?? []);
      setSaveState("saved");
    });
  }, [item]);

  // 加载 outline
  useEffect(() => {
    if (!item) return;
    let cancelled = false;
    setOutlineNorm(null);
    setCandidates([]);
    setDetecting(true);
    letterPath(item.outlineSource, 240)
      .then(({ d, bbox }) => {
        if (cancelled) return;
        const w = bbox.x2 - bbox.x1;
        const h = bbox.y2 - bbox.y1;
        if (w <= 0 || h <= 0) return;
        const scale = (VB - PAD * 2) / Math.max(w, h);
        const offX = (VB - w * scale) / 2 - bbox.x1 * scale;
        const offY = (VB - h * scale) / 2 - bbox.y1 * scale;
        const norm = { d, offX, offY, scale };
        setOutlineNorm(norm);
        return letterSkeleton(item.outlineSource, 240).then((skel) => {
          if (cancelled) return;
          const saved = loadDraft()[item.key];
          if (saved?.candidates?.length) return;
          setCandidates(
            skel.paths
              .map((path, sourceIndex) => ({ points: normalizeSkeletonPoints(path, norm), sourceIndex }))
              .filter((path) => path.points.length >= 2)
          );
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setDetecting(false);
      });
    return () => {
      cancelled = true;
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;
    if (detecting) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const currentDraft: StrokeDraft = {
        v: 1,
        strokes: strokes.map((stroke) => ({ d: stroke.d })),
        candidates,
        updated_at: Date.now(),
      };
      const next = { ...loadDraft(), [item.key]: currentDraft };
      saveDraft(next);
      setDraft(next);
      setSaveState("saving");
      pushRemoteDraft(item.key, currentDraft)
        .then(() => setSaveState("saved"))
        .catch(() => setSaveState("error"));
    }, 900);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [item, strokes, candidates, detecting]);

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
    if ((e.target as Element).tagName.toLowerCase() !== "svg") return;
    const p = svgPoint(e);
    if (!p) return;
    if (p.x < 0 || p.x > VB || p.y < 0 || p.y > VB) return;
    setCurrent((cur) => [...cur, p]);
  }

  function undoLast() {
    if (current.length > 0) {
      setCurrent((c) => c.slice(0, -1));
    } else if (strokes.length > 0) {
      setStrokes((s) => s.slice(0, -1));
    }
  }

  function finishStroke() {
    if (current.length < 2) {
      alert("一笔至少需要 2 个点");
      return;
    }
    setStrokes((s) => [...s, { d: smoothPath(current), pointCount: current.length, source: "manual" }]);
    setCurrent([]);
  }

  function deleteStroke(i: number) {
    setStrokes((s) => s.filter((_, j) => j !== i));
  }

  function clearAll() {
    if (!confirm(`确定清空 ${item.display} 的所有笔画？`)) return;
    setStrokes([]);
    setCurrent([]);
    setSelectedCandidates([]);
  }

  function toggleCandidate(i: number) {
    setActiveCandidate(i);
    setSelectedPoint(null);
    setSelectedCandidates((selected) =>
      selected.includes(i) ? selected.filter((value) => value !== i) : [...selected, i]
    );
  }

  function mergeSelectedCandidates() {
    if (selectedCandidates.length === 0) {
      alert("先点选候选段，再合并成一笔");
      return;
    }
    const d = selectedCandidates
      .map((i) => candidates[i]?.points)
      .filter(Boolean)
      .map((points) => smoothPath(points))
      .join(" ");
    setStrokes((s) => [...s, { d, pointCount: selectedCandidates.length, source: "auto" }]);
    setSelectedCandidates([]);
    setActiveCandidate(null);
    setSelectedPoint(null);
  }

  function reverseActiveCandidate() {
    if (activeCandidate === null) return;
    setCandidates((prev) =>
      prev.map((candidate, i) =>
        i === activeCandidate ? { ...candidate, points: [...candidate.points].reverse() } : candidate
      )
    );
  }

  function deleteSelectedPoint() {
    if (activeCandidate === null || selectedPoint === null) return;
    setCandidates((prev) =>
      prev.map((candidate, i) => {
        if (i !== activeCandidate || candidate.points.length <= 2) return candidate;
        return {
          ...candidate,
          points: candidate.points.filter((_, pointIndex) => pointIndex !== selectedPoint),
        };
      })
    );
    setSelectedPoint(null);
  }

  function addPointToActiveCandidate() {
    if (activeCandidate === null) return;
    setCandidates((prev) =>
      prev.map((candidate, i) => {
        if (i !== activeCandidate) return candidate;
        const insertAt = selectedPoint === null ? candidate.points.length - 1 : selectedPoint;
        const a = candidate.points[insertAt];
        const b = candidate.points[Math.min(candidate.points.length - 1, insertAt + 1)] ?? a;
        const point = {
          x: Number(((a.x + b.x) / 2).toFixed(2)),
          y: Number(((a.y + b.y) / 2).toFixed(2)),
        };
        return {
          ...candidate,
          points: [
            ...candidate.points.slice(0, insertAt + 1),
            point,
            ...candidate.points.slice(insertAt + 1),
          ],
        };
      })
    );
    setSelectedPoint((value) => (value === null ? null : value + 1));
  }

  function onPointDown(e: React.PointerEvent, candidate: number, point: number) {
    e.preventDefault();
    e.stopPropagation();
    draggingPoint.current = { candidate, point };
    setActiveCandidate(candidate);
    setSelectedPoint(point);
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onSvgMove(e: React.PointerEvent) {
    const drag = draggingPoint.current;
    if (!drag) return;
    const p = svgPoint(e);
    if (!p) return;
    const nextPoint = {
      x: Math.max(0, Math.min(VB, Number(p.x.toFixed(2)))),
      y: Math.max(0, Math.min(VB, Number(p.y.toFixed(2)))),
    };
    setCandidates((prev) =>
      prev.map((candidate, candidateIndex) => {
        if (candidateIndex !== drag.candidate) return candidate;
        return {
          ...candidate,
          points: candidate.points.map((point, pointIndex) =>
            pointIndex === drag.point ? nextPoint : point
          ),
        };
      })
    );
  }

  function onSvgUp() {
    draggingPoint.current = null;
  }

  function commitToDraft() {
    if (!item) return;
    const manualCurrent =
      current.length >= 2
        ? [{ d: smoothPath(current), pointCount: current.length, source: "manual" as const }]
        : [];
    const allStrokes = [...strokes, ...manualCurrent];
    if (allStrokes.length === 0) {
      const next = { ...draft };
      delete next[item.key];
      saveDraft(next);
      setDraft(next);
      return;
    }
    const data: StrokeDraft = {
      v: 1,
      strokes: allStrokes.map((stroke) => ({ d: stroke.d })),
      candidates,
      updated_at: Date.now(),
    };
    const next = { ...draft, [item.key]: data };
    saveDraft(next);
    setDraft(next);
    setCurrent([]);
    setSaveState("saving");
    pushRemoteDraft(item.key, data)
      .then(() => setSaveState("saved"))
      .catch(() => setSaveState("error"));
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
      if (!d[items[i].key]) {
        setIdx(i);
        return;
      }
    }
    alert(`所有 ${tab === "consonant" ? "辅音" : "元音"} 都已录入！`);
  }

  function exportJSON() {
    commitToDraft();
    const d = loadDraft();
    const exportable = Object.fromEntries(
      Object.entries(d)
        .filter(([, value]) => value.strokes.length > 0)
        .map(([key, value]) => [key, { v: value.v || 1, strokes: value.strokes }])
    );
    const json = JSON.stringify(exportable, null, 2);
    navigator.clipboard.writeText(json).then(
      () => {
        const cCount = Object.keys(exportable).filter((k) => !k.startsWith("v:")).length;
        const vCount = Object.keys(exportable).filter((k) => k.startsWith("v:")).length;
        alert(
          `已复制到剪贴板！\n辅音 ${cCount} 个 · 元音 ${vCount} 个\n\n粘贴到 src/data/strokes.ts 的 LETTER_STROKES 对象`
        );
      },
      () => {
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

  const totalDoneAll = Object.values(draft).filter((value) => value.strokes.length > 0).length;
  const totalDoneTab = items.filter((it) => (draft[it.key]?.strokes.length || 0) > 0).length;

  if (!item) return null;

  return (
    <div className="space-y-3">
      <div className="card-soft p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold">✏️ 笔画录入工具</h1>
            <p className="mt-0.5 text-xs opacity-70">先点选自动识别段合并成笔；必要时手工点关键点修补</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold" style={{ color: "var(--duo-green)" }}>
              {totalDoneAll}/76
            </div>
            <div className="text-[10px] uppercase opacity-60">已录入总数</div>
          </div>
        </div>
        <div className="progress-track mt-2">
          <div className="progress-fill" style={{ width: `${(totalDoneAll / 76) * 100}%` }} />
        </div>
      </div>

      {/* Tab 切换辅音/元音 */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("consonant")}
          className={tab === "consonant" ? "btn-primary px-4 text-sm" : "btn-ghost px-4 text-sm"}
        >
          辅音 {totalDoneAll > 0 && tab === "consonant" ? `(${totalDoneTab}/${items.length})` : `(44)`}
        </button>
        <button
          onClick={() => setTab("vowel")}
          className={tab === "vowel" ? "btn-primary px-4 text-sm" : "btn-ghost px-4 text-sm"}
        >
          元音 {totalDoneAll > 0 && tab === "vowel" ? `(${totalDoneTab}/${items.length})` : `(32)`}
        </button>
      </div>

      <div className="card-soft flex items-center gap-3 p-3">
        <div
          className="thai-big flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl text-white"
          style={{ background: "var(--duo-green)", boxShadow: "0 4px 0 var(--duo-green-shadow)" }}
        >
          {item.display}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm">
            <b>{idx + 1} / {items.length}</b> · <span className="thai-big">{item.label}</span>{" "}
            {item.meaning && <span className="opacity-70">· {item.meaning}</span>}
          </div>
          <div className="mt-0.5 text-xs opacity-60">
            已完成笔画 {strokes.length} 段；当前 {current.length} 个点
            {draft[item.key] ? " · ✅ 已存草稿" : ""}
            {" · "}
            {saveState === "saving" ? "同步中..." : saveState === "saved" ? "已同步" : saveState === "error" ? "同步失败" : "未保存"}
          </div>
          {tab === "vowel" && item.display.includes("◌") && (
            <div className="mt-1 text-[11px]" style={{ color: "var(--duo-blue)" }}>
              ◌ 是辅音占位符（背景显示用 ก 渲染），只录元音本身的笔画即可
            </div>
          )}
        </div>
      </div>

      <div className="card-soft p-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB} ${VB}`}
          className="block w-full select-none touch-none"
          style={{ aspectRatio: "1 / 1", background: "white" }}
          onPointerDown={onClickCanvas}
          onPointerMove={onSvgMove}
          onPointerUp={onSvgUp}
          onPointerCancel={onSvgUp}
        >
          {[25, 50, 75].map((p) => (
            <g key={p} stroke="rgba(0,0,0,0.05)" strokeWidth={0.2}>
              <line x1={p} y1={0} x2={p} y2={VB} />
              <line x1={0} y1={p} x2={VB} y2={p} />
            </g>
          ))}
          {outlineNorm && (
            <g
              transform={`translate(${outlineNorm.offX} ${outlineNorm.offY}) scale(${outlineNorm.scale})`}
              fill="rgba(0,0,0,0.1)"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
            >
              <path d={outlineNorm.d} />
            </g>
          )}

          {candidates.map((candidate, i) => {
            const selectedOrder = selectedCandidates.indexOf(i);
            const selected = selectedOrder >= 0;
            return (
              <g key={`candidate-${i}`}>
                <path
                  d={smoothPath(candidate.points)}
                  fill="none"
                  stroke={selected ? "var(--duo-orange)" : "rgba(28,176,246,0.42)"}
                  strokeWidth={selected ? 4.8 : 3.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={selected ? 0.95 : 0.7}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCandidate(i);
                  }}
                  style={{ cursor: "pointer" }}
                />
                {activeCandidate === i && candidate.points.map((point, pointIndex) => (
                  <circle
                    key={`${i}-${pointIndex}`}
                    cx={point.x}
                    cy={point.y}
                    r={selectedPoint === pointIndex ? 2.6 : 1.9}
                    fill={selectedPoint === pointIndex ? "var(--duo-orange)" : "white"}
                    stroke="var(--duo-blue)"
                    strokeWidth={0.8}
                    onPointerDown={(e) => onPointDown(e, i, pointIndex)}
                    style={{ cursor: "grab" }}
                  />
                ))}
                {selected && (
                  <text x={6 + selectedOrder * 8} y={8} fontSize={5} fill="var(--duo-orange-d)" fontWeight={900}>
                    {selectedOrder + 1}
                  </text>
                )}
              </g>
            );
          })}

          {strokes.map((stroke, i) => (
            <g key={i} style={{ pointerEvents: "none" }}>
              <path
                d={stroke.d}
                fill="none"
                stroke="var(--duo-green)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.85}
              />
              <text x={4} y={14 + i * 6} fontSize={4.5} fill="var(--duo-green-d)" fontWeight={900}>
                {i + 1}
              </text>
            </g>
          ))}
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

      <div className="card-soft p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-bold">自动识别候选段</div>
            <div className="mt-0.5 opacity-60">
              {detecting
                ? "正在识别..."
                : `已识别 ${candidates.length} 段；已选 ${selectedCandidates.length} 段`}
            </div>
          </div>
          <button
            onClick={mergeSelectedCandidates}
            className="btn-blue shrink-0 px-3 text-xs"
            disabled={selectedCandidates.length === 0}
          >
            合并为一笔
          </button>
        </div>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => setSelectedCandidates([])}
            className="btn-ghost flex-1 text-xs"
            disabled={selectedCandidates.length === 0}
          >
            清空选择
          </button>
          <button
            onClick={() => setSelectedCandidates(candidates.map((_, i) => i))}
            className="btn-ghost flex-1 text-xs"
            disabled={candidates.length === 0}
          >
            全选候选段
          </button>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <button
            onClick={addPointToActiveCandidate}
            className="btn-ghost text-xs"
            disabled={activeCandidate === null}
          >
            加点
          </button>
          <button
            onClick={deleteSelectedPoint}
            className="btn-ghost text-xs"
            disabled={activeCandidate === null || selectedPoint === null}
          >
            删点
          </button>
          <button
            onClick={reverseActiveCandidate}
            className="btn-ghost text-xs"
            disabled={activeCandidate === null}
          >
            反转
          </button>
        </div>
        {activeCandidate !== null && (
          <div className="mt-2 text-[11px] opacity-60">
            正在编辑候选段 {activeCandidate + 1}；拖动白色节点微调曲线。
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={undoLast} className="btn-ghost text-xs" disabled={current.length === 0 && strokes.length === 0}>
          ↶ 撤销最后一点/笔
        </button>
        <button onClick={finishStroke} className="btn-blue text-xs" disabled={current.length < 2}>
          ✓ 完成此笔（共 {current.length} 点）
        </button>
      </div>

      {strokes.length > 0 && (
        <div className="card-soft p-3 text-xs">
          <div className="mb-2 font-bold">已完成的笔画</div>
          <ul className="space-y-1">
            {strokes.map((pts, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg bg-black/5 px-2 py-1">
                <span>
                  第 {i + 1} 笔（{pts.source === "auto" ? `${pts.pointCount} 个候选段` : `${pts.pointCount} 点`}）
                </span>
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
        <button onClick={gotoFirstUnfinished} className="btn-blue text-xs">⏭ 本类首个未录入</button>
        <button onClick={exportJSON} className="btn-primary text-xs">📋 导出全部 JSON</button>
      </div>

      <button onClick={resetDraft} className="btn-red w-full text-xs">⚠️ 重置全部草稿</button>

      <section className="card-soft p-3 text-xs leading-relaxed opacity-80">
        <h3 className="text-sm font-bold opacity-100">使用说明</h3>
        <ol className="mt-1 list-decimal space-y-0.5 pl-4">
          <li>切换 <b>辅音 / 元音</b> 标签</li>
          <li>蓝色线是自动识别出的候选段，按教材笔顺依次点选</li>
          <li>点「合并为一笔」把已选候选段保存成当前字母的一笔</li>
          <li>如果候选段缺失或方向不理想，可以直接在画布点关键点手工补一笔</li>
          <li>手工笔每笔 3-8 个点足够；按「✓ 完成此笔」保存</li>
          <li>「下一字」自动保存到浏览器本地草稿</li>
          <li>全部完成「📋 导出全部 JSON」，粘贴到 <code>src/data/strokes.ts</code> 的 <code>LETTER_STROKES</code></li>
          <li>建议每录完 5-10 个就 export 一次备份（清浏览器数据会丢草稿）</li>
        </ol>
      </section>
    </div>
  );
}
