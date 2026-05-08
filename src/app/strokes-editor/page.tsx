"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import { TONE_MARKS } from "@/data/tones";
import { VOWELS } from "@/data/vowels";
import { lockPageScroll, preventElementTouchScroll, unlockPageScroll, type PageScrollLock } from "@/lib/scrollLock";
import { letterPath } from "@/lib/thaiFont";

type Point = { x: number; y: number };
type TimedPoint = Point & { t: number };
type Tab = "consonant" | "vowel";

interface RecordedStroke {
  d: string;
  order: number;
  start: Point;
  end: Point;
  source: "recorded";
  pointCount: number;
  durationMs: number;
  samples: TimedPoint[];
}

interface StrokeDraft {
  v: number;
  strokes: RecordedStroke[];
  updated_at?: number;
}

interface EditorItem {
  key: string;
  display: string;
  outlineSource: string;
  label: string;
  meaning: string;
  kind: Tab;
}

const DRAFT_KEY = "thai-alphabet:strokes-draft:v1";
const VB = 100;
const PAD = 6;

function buildItems(): EditorItem[] {
  const consonants: EditorItem[] = CONSONANTS.map((c) => ({
    key: c.letter,
    display: c.letter,
    outlineSource: c.letter,
    label: `${c.letter} ${c.name}`,
    meaning: c.meaning,
    kind: "consonant",
  }));
  const vowels: EditorItem[] = VOWELS.map((v) => ({
    key: `v:${v.id}`,
    display: v.display,
    outlineSource: v.display.replace(/◌/g, "ก"),
    label: v.roman + (v.length === "long" ? " (长)" : v.length === "short" ? " (短)" : ""),
    meaning: v.notes ?? "",
    kind: "vowel",
  }));
  const toneMarks: EditorItem[] = TONE_MARKS.filter((m) => m.symbol && m.id !== "none").map((m) => ({
    key: `mark:${m.id}`,
    display: m.symbol,
    outlineSource: m.symbol,
    label: m.name,
    meaning: m.nameRoman,
    kind: "vowel",
  }));
  const extras = ["ฯ", "ๆ", "๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"].map((symbol) => ({
    key: `symbol:${symbol}`,
    display: symbol,
    outlineSource: symbol,
    label: symbol,
    meaning: "符号/数字",
    kind: "vowel" as const,
  }));
  return [...consonants, ...vowels, ...toneMarks, ...extras];
}

function fallbackPoint(): Point {
  return { x: 0, y: 0 };
}

function endpointsFromPath(d: string): { start: Point; end: Point } {
  const nums = d.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  if (nums.length < 4) return { start: fallbackPoint(), end: fallbackPoint() };
  return {
    start: { x: nums[0], y: nums[1] },
    end: { x: nums[nums.length - 2], y: nums[nums.length - 1] },
  };
}

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function simplify(points: TimedPoint[], tol: number): TimedPoint[] {
  if (points.length < 3) return points.slice();
  const sqTol = tol * tol;

  function distSq(p: TimedPoint, a: TimedPoint, b: TimedPoint): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (dx === 0 && dy === 0) return (p.x - a.x) ** 2 + (p.y - a.y) ** 2;
    const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
    const x = a.x + dx * t;
    const y = a.y + dy * t;
    return (p.x - x) ** 2 + (p.y - y) ** 2;
  }

  function walk(start: number, end: number, keep: boolean[]) {
    let max = 0;
    let idx = -1;
    for (let i = start + 1; i < end; i++) {
      const d = distSq(points[i], points[start], points[end]);
      if (d > max) {
        max = d;
        idx = i;
      }
    }
    if (max > sqTol && idx > 0) {
      keep[idx] = true;
      walk(start, idx, keep);
      walk(idx, end, keep);
    }
  }

  const keep = new Array(points.length).fill(false);
  keep[0] = true;
  keep[points.length - 1] = true;
  walk(0, points.length - 1, keep);
  return points.filter((_, i) => keep[i]);
}

function smoothPath(points: Point[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
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
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function normalizeStroke(stroke: Partial<RecordedStroke>, order: number): RecordedStroke | null {
  if (typeof stroke.d !== "string") return null;
  const endpoints = endpointsFromPath(stroke.d);
  const samples = Array.isArray(stroke.samples)
    ? stroke.samples.filter((p): p is TimedPoint =>
        typeof p?.x === "number" && typeof p?.y === "number" && typeof p?.t === "number"
      )
    : [];
  return {
    d: stroke.d,
    order: typeof stroke.order === "number" ? stroke.order : order,
    start: stroke.start ?? endpoints.start,
    end: stroke.end ?? endpoints.end,
    source: "recorded",
    pointCount: typeof stroke.pointCount === "number" ? stroke.pointCount : samples.length,
    durationMs: typeof stroke.durationMs === "number" ? stroke.durationMs : samples.at(-1)?.t ?? 0,
    samples,
  };
}

function makeStroke(samples: TimedPoint[], order: number): RecordedStroke {
  const cleaned = simplify(samples, 0.5);
  const d = smoothPath(cleaned);
  const endpoints = endpointsFromPath(d);
  return {
    d,
    order,
    start: endpoints.start,
    end: endpoints.end,
    source: "recorded",
    pointCount: cleaned.length,
    durationMs: Math.max(0, samples.at(-1)?.t ?? 0),
    samples: cleaned,
  };
}

function normalizeDraft(raw: unknown): StrokeDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Partial<StrokeDraft>;
  if (!Array.isArray(value.strokes)) return null;
  const strokes = value.strokes
    .map((stroke, order) => normalizeStroke(stroke, order))
    .filter((stroke): stroke is RecordedStroke => Boolean(stroke));
  return {
    v: value.v || 3,
    strokes,
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

function saveDraft(draft: Record<string, StrokeDraft>) {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

function authHeaders(): HeadersInit {
  const token = window.localStorage.getItem("thai-alphabet:sync:token") || "";
  return token ? { authorization: `Bearer ${token}` } : {};
}

async function fetchRemoteDraft(key: string): Promise<StrokeDraft | null> {
  const res = await fetch(`/api/strokes?key=${encodeURIComponent(key)}`, { headers: authHeaders() });
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
    headers: { "content-type": "application/json", ...authHeaders() },
    body: JSON.stringify({
      key,
      value: JSON.stringify(draft),
      updated_at: draft.updated_at || Date.now(),
    }),
  });
}

export default function StrokesEditorPage() {
  const allItems = useMemo(buildItems, []);
  const [tab, setTab] = useState<Tab>("consonant");
  const items = useMemo(() => allItems.filter((it) => it.kind === tab), [allItems, tab]);
  const [idx, setIdx] = useState(0);
  const item = items[idx] ?? items[0];

  const [outline, setOutline] = useState<{ d: string; offX: number; offY: number; scale: number } | null>(null);
  const [strokes, setStrokes] = useState<RecordedStroke[]>([]);
  const [current, setCurrent] = useState<TimedPoint[]>([]);
  const [recording, setRecording] = useState(false);
  const [outside, setOutside] = useState(false);
  const [draft, setDraft] = useState<Record<string, StrokeDraft>>({});
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const svgRef = useRef<SVGSVGElement | null>(null);
  const outlinePathRef = useRef<SVGPathElement | null>(null);
  const currentRef = useRef<TimedPoint[]>([]);
  const scrollLock = useRef<PageScrollLock | null>(null);
  const startTime = useRef(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setIdx(0), [tab]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    return preventElementTouchScroll(svg);
  }, []);

  useEffect(() => {
    return () => {
      unlockPageScroll(scrollLock.current);
      scrollLock.current = null;
    };
  }, []);

  useEffect(() => {
    if (!item) return;
    const localDraft = loadDraft();
    const currentDraft = localDraft[item.key];
    setDraft(localDraft);
    setStrokes(currentDraft?.strokes ?? []);
    setCurrent([]);
    currentRef.current = [];
    setRecording(false);
    setOutside(false);
    setSaveState(currentDraft ? "saved" : "idle");

    fetchRemoteDraft(item.key).then((remote) => {
      if (!remote) return;
      const latestLocal = loadDraft()[item.key];
      if ((remote.updated_at || 0) <= (latestLocal?.updated_at || 0)) return;
      const next = { ...loadDraft(), [item.key]: remote };
      saveDraft(next);
      setDraft(next);
      setStrokes(remote.strokes);
      setSaveState("saved");
    });
  }, [item]);

  useEffect(() => {
    if (!item) return;
    let cancelled = false;
    setOutline(null);
    letterPath(item.outlineSource, 240)
      .then(({ d, bbox }) => {
        if (cancelled) return;
        const w = bbox.x2 - bbox.x1;
        const h = bbox.y2 - bbox.y1;
        if (w <= 0 || h <= 0) return;
        const scale = (VB - PAD * 2) / Math.max(w, h);
        setOutline({
          d,
          scale,
          offX: (VB - w * scale) / 2 - bbox.x1 * scale,
          offY: (VB - h * scale) / 2 - bbox.y1 * scale,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const data: StrokeDraft = {
        v: 3,
        strokes: strokes.map((stroke, order) => ({ ...stroke, order })),
        updated_at: Date.now(),
      };
      const next = { ...loadDraft(), [item.key]: data };
      if (data.strokes.length === 0) delete next[item.key];
      saveDraft(next);
      setDraft(next);
      setSaveState("saving");
      pushRemoteDraft(item.key, data)
        .then(() => setSaveState("saved"))
        .catch(() => setSaveState("error"));
    }, 700);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [item, strokes]);

  if (!item) return null;

  const totalDoneAll = Object.values(draft).filter((value) => value.strokes.length > 0).length;
  const totalDoneTab = items.filter((it) => (draft[it.key]?.strokes.length || 0) > 0).length;

  function svgPoint(e: React.PointerEvent): Point | null {
    const svg = svgRef.current;
    if (!svg) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(ctm.inverse());
    return {
      x: Math.max(0, Math.min(VB, Number(p.x.toFixed(2)))),
      y: Math.max(0, Math.min(VB, Number(p.y.toFixed(2)))),
    };
  }

  function isInsideGlyph(p: Point): boolean {
    const path = outlinePathRef.current;
    const svg = svgRef.current;
    if (!path || !svg || !outline) return false;
    const local = svg.createSVGPoint();
    local.x = (p.x - outline.offX) / outline.scale;
    local.y = (p.y - outline.offY) / outline.scale;
    const hit = path as unknown as { isPointInFill?: (point: DOMPointInit) => boolean };
    return hit.isPointInFill ? hit.isPointInFill(local) : true;
  }

  function setRecorded(points: TimedPoint[]) {
    currentRef.current = points;
    setCurrent(points);
  }

  function appendPoint(p: Point) {
    const t = Math.round(performance.now() - startTime.current);
    const points = currentRef.current;
    const last = points.at(-1);
    if (last && dist(last, p) < 0.35) return;
    setRecorded([...points, { ...p, t }]);
  }

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
    const p = svgPoint(e);
    if (!p || !isInsideGlyph(p)) {
      setOutside(true);
      return;
    }
    startTime.current = performance.now();
    setRecorded([{ ...p, t: 0 }]);
    setRecording(true);
    setOutside(false);
  }

  function onMove(e: React.PointerEvent) {
    e.preventDefault();
    if (!recording) return;
    const p = svgPoint(e);
    if (!p) return;
    if (!isInsideGlyph(p)) {
      setOutside(true);
      return;
    }
    setOutside(false);
    appendPoint(p);
  }

  function onUp(e?: React.PointerEvent) {
    e?.preventDefault();
    unlockDrawingScroll();
    if (!recording) return;
    setRecording(false);
    setOutside(false);
    const points = currentRef.current;
    if (points.length >= 2) {
      setStrokes((value) => [...value, makeStroke(points, value.length)]);
    }
    setRecorded([]);
  }

  function commitToDraft() {
    const data: StrokeDraft = {
      v: 3,
      strokes: strokes.map((stroke, order) => ({ ...stroke, order })),
      updated_at: Date.now(),
    };
    const next = { ...loadDraft(), [item.key]: data };
    if (data.strokes.length === 0) delete next[item.key];
    saveDraft(next);
    setDraft(next);
    pushRemoteDraft(item.key, data).catch(() => {});
  }

  function deleteStroke(index: number) {
    setStrokes((value) => value.filter((_, i) => i !== index).map((stroke, order) => ({ ...stroke, order })));
  }

  function clearAll() {
    if (!confirm(`确定清空 ${item.display} 的所有录制笔画？`)) return;
    setStrokes([]);
    setRecorded([]);
  }

  function nextLetter() {
    commitToDraft();
    setIdx((value) => Math.min(items.length - 1, value + 1));
  }

  function prevLetter() {
    commitToDraft();
    setIdx((value) => Math.max(0, value - 1));
  }

  function gotoFirstUnfinished() {
    commitToDraft();
    const currentDraft = loadDraft();
    const found = items.findIndex((candidate) => !currentDraft[candidate.key]?.strokes.length);
    if (found >= 0) setIdx(found);
  }

  function exportJSON() {
    commitToDraft();
    const exportable = Object.fromEntries(
      Object.entries(loadDraft())
        .filter(([, value]) => value.strokes.length > 0)
        .map(([key, value]) => [key, { v: value.v || 3, strokes: value.strokes }])
    );
    navigator.clipboard.writeText(JSON.stringify(exportable, null, 2)).then(() => {
      alert("已复制到剪贴板。");
    });
  }

  function resetDraft() {
    if (!confirm("确定清空所有字母的录制草稿？此操作不可撤销。")) return;
    saveDraft({});
    setDraft({});
    setStrokes([]);
    setRecorded([]);
  }

  const currentPath = current.length >= 2 ? smoothPath(current) : "";

  return (
    <div className="space-y-3">
      <div className="card-soft p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold">笔画轨迹录制器</h1>
            <p className="mt-0.5 text-xs opacity-70">按住在字形内部直接写；每次松手保存为一笔</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold" style={{ color: "var(--duo-green)" }}>
              {totalDoneAll}/{allItems.length}
            </div>
            <div className="text-[10px] uppercase opacity-60">已录入总数</div>
          </div>
        </div>
        <div className="progress-track mt-2">
          <div className="progress-fill" style={{ width: `${(totalDoneAll / allItems.length) * 100}%` }} />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab("consonant")} className={tab === "consonant" ? "btn-primary px-4 text-sm" : "btn-ghost px-4 text-sm"}>
          辅音 {tab === "consonant" ? `(${totalDoneTab}/${items.length})` : "(44)"}
        </button>
        <button onClick={() => setTab("vowel")} className={tab === "vowel" ? "btn-primary px-4 text-sm" : "btn-ghost px-4 text-sm"}>
          元音/符号 {tab === "vowel" ? `(${totalDoneTab}/${items.length})` : "(48)"}
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
            已录制 {strokes.length} 笔；当前 {current.length} 点
            {" · "}
            {saveState === "saving" ? "同步中..." : saveState === "saved" ? "已同步" : saveState === "error" ? "同步失败" : "未保存"}
          </div>
        </div>
      </div>

      <div className="card-soft p-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB} ${VB}`}
          className="block w-full select-none touch-none"
          style={{
            aspectRatio: "1 / 1",
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
          {[25, 50, 75].map((p) => (
            <g key={p} stroke="rgba(0,0,0,0.05)" strokeWidth={0.2}>
              <line x1={p} y1={0} x2={p} y2={VB} />
              <line x1={0} y1={p} x2={VB} y2={p} />
            </g>
          ))}

          {outline && (
            <>
              <path ref={outlinePathRef} d={outline.d} fill="black" opacity={0} style={{ pointerEvents: "none" }} />
              <g
                transform={`translate(${outline.offX} ${outline.offY}) scale(${outline.scale})`}
                fill="rgba(0,0,0,0.1)"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth={1}
                style={{ pointerEvents: "none" }}
              >
                <path d={outline.d} />
              </g>
            </>
          )}

          {strokes.map((stroke, index) => (
            <g key={`${item.key}-${index}`} style={{ pointerEvents: "none" }}>
              <path d={stroke.d} fill="none" stroke="var(--duo-green)" strokeWidth={3.8} strokeLinecap="round" strokeLinejoin="round" opacity={0.88} />
              <text x={4} y={14 + index * 6} fontSize={4.5} fill="var(--duo-green-d)" fontWeight={900}>
                {index + 1}
              </text>
            </g>
          ))}

          {currentPath && (
            <path d={currentPath} fill="none" stroke="var(--duo-blue)" strokeWidth={4.2} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
          )}
          {current.at(-1) && (
            <circle cx={current.at(-1)?.x} cy={current.at(-1)?.y} r={3.8} fill="var(--duo-blue)" opacity={0.85} pointerEvents="none" />
          )}
        </svg>
      </div>

      <div className="card-soft p-3 text-xs">
        <div className="font-bold">{recording ? "正在录制这一笔" : "按住字形内部开始录制"}</div>
        <div className="mt-1 opacity-65">
          {outside
            ? "指针在字形外，当前位置不会被记录。"
            : "轨迹只记录落在字体黑色填充区域里的点；松手后自动成为下一笔。"}
        </div>
      </div>

      {strokes.length > 0 && (
        <div className="card-soft p-3 text-xs">
          <div className="mb-2 font-bold">已录制的笔画</div>
          <ul className="space-y-1">
            {strokes.map((stroke, index) => (
              <li key={index} className="flex items-center justify-between rounded-lg bg-black/5 px-2 py-1">
                <span>第 {index + 1} 笔 · {stroke.pointCount} 点 · {Math.round(stroke.durationMs)} ms</span>
                <button onClick={() => deleteStroke(index)} className="text-rose-500">删除</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <button onClick={prevLetter} className="btn-ghost text-xs" disabled={idx === 0}>‹ 上一字</button>
        <button onClick={clearAll} className="btn-orange text-xs">清空此字</button>
        <button onClick={nextLetter} className="btn-primary text-xs" disabled={idx === items.length - 1}>下一字 ›</button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={gotoFirstUnfinished} className="btn-blue text-xs">本类首个未录入</button>
        <button onClick={exportJSON} className="btn-primary text-xs">导出全部 JSON</button>
      </div>

      <button onClick={resetDraft} className="btn-red w-full text-xs">重置全部草稿</button>
    </div>
  );
}
