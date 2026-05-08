"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import { TONE_MARKS } from "@/data/tones";
import { AUTOTRACE_STROKES, type AutotraceCandidate } from "@/data/autotraceStrokes";
import { VOWELS } from "@/data/vowels";
import { letterPath } from "@/lib/thaiFont";

type Point = { x: number; y: number };
type Tab = "consonant" | "vowel";

interface SelectedSegment {
  candidateIndex: number;
  reversed: boolean;
}

interface StoredSegment {
  sourceIndex: number;
  reversed: boolean;
  d: string;
  start: Point;
  end: Point;
}

interface CompletedStroke {
  d: string;
  pointCount: number;
  source: "auto" | "manual";
  start: Point;
  end: Point;
  segments?: StoredSegment[];
}

interface StoredStroke {
  d: string;
  order: number;
  start: Point;
  end: Point;
  source?: "auto" | "manual";
  pointCount?: number;
  segments?: StoredSegment[];
}

interface StrokeDraft {
  v: number;
  strokes: StoredStroke[];
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

function fmt(n: number) {
  return n.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

function tokenizePath(d: string) {
  return d.match(/[MLCZ]|-?\d+(?:\.\d+)?/g) ?? [];
}

function reversePath(d: string): string {
  const tokens = tokenizePath(d);
  const segments: Array<
    | { cmd: "L"; from: Point; to: Point }
    | { cmd: "C"; from: Point; c1: Point; c2: Point; to: Point }
  > = [];
  let i = 0;
  let at: Point | null = null;
  const readPoint = (): Point => ({ x: Number(tokens[i++]), y: Number(tokens[i++]) });
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === "M") at = readPoint();
    if (cmd === "L" && at) {
      const to = readPoint();
      segments.push({ cmd, from: at, to });
      at = to;
    }
    if (cmd === "C" && at) {
      const c1 = readPoint();
      const c2 = readPoint();
      const to = readPoint();
      segments.push({ cmd, from: at, c1, c2, to });
      at = to;
    }
  }
  if (segments.length === 0) return d;
  const last = segments[segments.length - 1].to;
  let next = `M ${fmt(last.x)} ${fmt(last.y)}`;
  for (const segment of [...segments].reverse()) {
    if (segment.cmd === "L") {
      next += ` L ${fmt(segment.from.x)} ${fmt(segment.from.y)}`;
    } else {
      next += ` C ${fmt(segment.c2.x)} ${fmt(segment.c2.y)} ${fmt(segment.c1.x)} ${fmt(segment.c1.y)} ${fmt(segment.from.x)} ${fmt(segment.from.y)}`;
    }
  }
  return next;
}

function candidateD(candidate: AutotraceCandidate, reversed: boolean) {
  return reversed ? reversePath(candidate.d) : candidate.d;
}

function storedSegments(candidates: AutotraceCandidate[], selected: SelectedSegment[]): StoredSegment[] {
  return selected.map((segment) => {
    const candidate = candidates[segment.candidateIndex];
    const d = candidateD(candidate, segment.reversed);
    const endpoints = endpointsFromPath(d);
    return {
      sourceIndex: candidate.sourceIndex,
      reversed: segment.reversed,
      d,
      start: endpoints.start,
      end: endpoints.end,
    };
  });
}

function makeStrokeFromSelection(candidates: AutotraceCandidate[], selected: SelectedSegment[]): CompletedStroke {
  const segments = storedSegments(candidates, selected);
  const d = segments.map((segment) => segment.d).join(" ");
  return {
    d,
    pointCount: segments.length,
    source: "auto",
    start: segments[0]?.start ?? fallbackPoint(),
    end: segments[segments.length - 1]?.end ?? fallbackPoint(),
    segments,
  };
}

function fromStoredStroke(stroke: StoredStroke): CompletedStroke {
  const endpoints = endpointsFromPath(stroke.d);
  return {
    d: stroke.d,
    pointCount: stroke.pointCount ?? stroke.segments?.length ?? 0,
    source: stroke.source ?? "auto",
    start: stroke.start ?? endpoints.start,
    end: stroke.end ?? endpoints.end,
    segments: stroke.segments,
  };
}

function storedStrokes(strokes: CompletedStroke[]): StoredStroke[] {
  return strokes.map((stroke, order) => ({
    d: stroke.d,
    order,
    start: stroke.start,
    end: stroke.end,
    source: stroke.source,
    pointCount: stroke.pointCount,
    segments: stroke.segments,
  }));
}

function normalizeDraft(raw: unknown): StrokeDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Partial<StrokeDraft>;
  if (!Array.isArray(value.strokes)) return null;
  return {
    v: value.v || 2,
    strokes: value.strokes
      .filter((stroke) => stroke && typeof stroke.d === "string")
      .map((stroke, order) => {
        const endpoints = endpointsFromPath(stroke.d);
        return {
          d: stroke.d,
          order: typeof stroke.order === "number" ? stroke.order : order,
          start: stroke.start ?? endpoints.start,
          end: stroke.end ?? endpoints.end,
          source: stroke.source ?? "auto",
          pointCount: stroke.pointCount,
          segments: stroke.segments,
        };
      }),
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
  const candidates = useMemo(() => [...(AUTOTRACE_STROKES[item?.key]?.candidates ?? [])], [item?.key]);

  const [strokes, setStrokes] = useState<CompletedStroke[]>([]);
  const [selected, setSelected] = useState<SelectedSegment[]>([]);
  const [outlineNorm, setOutlineNorm] = useState<{ d: string; offX: number; offY: number; scale: number } | null>(null);
  const [draft, setDraft] = useState<Record<string, StrokeDraft>>({});
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setIdx(0), [tab]);

  useEffect(() => {
    if (!item) return;
    const localDraft = loadDraft();
    const current = localDraft[item.key];
    setDraft(localDraft);
    setStrokes(current ? current.strokes.map(fromStoredStroke) : []);
    setSelected([]);
    setSaveState(current ? "saved" : "idle");

    fetchRemoteDraft(item.key).then((remote) => {
      if (!remote) return;
      const latestLocal = loadDraft()[item.key];
      if ((remote.updated_at || 0) <= (latestLocal?.updated_at || 0)) return;
      const next = { ...loadDraft(), [item.key]: remote };
      saveDraft(next);
      setDraft(next);
      setStrokes(remote.strokes.map(fromStoredStroke));
      setSaveState("saved");
    });
  }, [item]);

  useEffect(() => {
    if (!item) return;
    let cancelled = false;
    setOutlineNorm(null);
    letterPath(item.outlineSource, 240)
      .then(({ d, bbox }) => {
        if (cancelled) return;
        const w = bbox.x2 - bbox.x1;
        const h = bbox.y2 - bbox.y1;
        if (w <= 0 || h <= 0) return;
        const scale = (VB - PAD * 2) / Math.max(w, h);
        setOutlineNorm({
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
      const currentDraft: StrokeDraft = {
        v: 2,
        strokes: storedStrokes(strokes),
        updated_at: Date.now(),
      };
      const next = { ...loadDraft(), [item.key]: currentDraft };
      if (currentDraft.strokes.length === 0) delete next[item.key];
      saveDraft(next);
      setDraft(next);
      setSaveState("saving");
      pushRemoteDraft(item.key, currentDraft)
        .then(() => setSaveState("saved"))
        .catch(() => setSaveState("error"));
    }, 700);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [item, strokes]);

  if (!item) return null;

  const selectedPreview = selected.length > 0 ? makeStrokeFromSelection(candidates, selected) : null;
  const totalDoneAll = Object.values(draft).filter((value) => value.strokes.length > 0).length;
  const totalDoneTab = items.filter((it) => (draft[it.key]?.strokes.length || 0) > 0).length;

  function appendSegment(candidateIndex: number) {
    setSelected((current) => [...current, { candidateIndex, reversed: false }]);
  }

  function reverseLastSegment() {
    setSelected((current) =>
      current.map((segment, index) =>
        index === current.length - 1 ? { ...segment, reversed: !segment.reversed } : segment
      )
    );
  }

  function finishStroke() {
    if (selected.length === 0) return;
    setStrokes((current) => [...current, makeStrokeFromSelection(candidates, selected)]);
    setSelected([]);
  }

  function deleteStroke(index: number) {
    setStrokes((current) => current.filter((_, i) => i !== index));
  }

  function clearCurrent() {
    setSelected([]);
  }

  function clearAll() {
    if (!confirm(`确定清空 ${item.display} 的所有已确认笔画？候选线不会被删除。`)) return;
    setStrokes([]);
    setSelected([]);
  }

  function commitToDraft() {
    const data: StrokeDraft = {
      v: 2,
      strokes: storedStrokes(strokes),
      updated_at: Date.now(),
    };
    const next = { ...loadDraft(), [item.key]: data };
    if (data.strokes.length === 0) delete next[item.key];
    saveDraft(next);
    setDraft(next);
    pushRemoteDraft(item.key, data).catch(() => {});
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
    const currentDraft = loadDraft();
    const found = items.findIndex((candidate) => !currentDraft[candidate.key]?.strokes.length);
    if (found >= 0) setIdx(found);
  }

  function exportJSON() {
    commitToDraft();
    const exportable = Object.fromEntries(
      Object.entries(loadDraft())
        .filter(([, value]) => value.strokes.length > 0)
        .map(([key, value]) => [key, { v: value.v || 2, strokes: value.strokes }])
    );
    const json = JSON.stringify(exportable, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      alert("已复制到剪贴板。");
    });
  }

  function resetDraft() {
    if (!confirm("确定清空所有字母的录入草稿？此操作不可撤销。")) return;
    saveDraft({});
    setDraft({});
    setStrokes([]);
    setSelected([]);
  }

  return (
    <div className="space-y-3">
      <div className="card-soft p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold">笔画顺序标注工具</h1>
            <p className="mt-0.5 text-xs opacity-70">基于 autotrace 中线；只指定线段顺序和方向，不编辑点位</p>
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
            候选段 {candidates.length} 条；已确认 {strokes.length} 笔；当前选择 {selected.length} 段
            {" · "}
            {saveState === "saving" ? "同步中..." : saveState === "saved" ? "已同步" : saveState === "error" ? "同步失败" : "未保存"}
          </div>
        </div>
      </div>

      <div className="card-soft p-2">
        <svg viewBox={`0 0 ${VB} ${VB}`} className="block w-full select-none touch-none" style={{ aspectRatio: "1 / 1", background: "white" }}>
          {[25, 50, 75].map((p) => (
            <g key={p} stroke="rgba(0,0,0,0.05)" strokeWidth={0.2}>
              <line x1={p} y1={0} x2={p} y2={VB} />
              <line x1={0} y1={p} x2={VB} y2={p} />
            </g>
          ))}
          {outlineNorm && (
            <g
              transform={`translate(${outlineNorm.offX} ${outlineNorm.offY}) scale(${outlineNorm.scale})`}
              fill="rgba(0,0,0,0.08)"
              stroke="rgba(0,0,0,0.14)"
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
            >
              <path d={outlineNorm.d} />
            </g>
          )}

          {candidates.map((candidate, candidateIndex) => {
            const selectedOrders = selected
              .map((segment, order) => ({ ...segment, order }))
              .filter((segment) => segment.candidateIndex === candidateIndex);
            const lastSelected = selectedOrders[selectedOrders.length - 1];
            return (
              <g key={`${item.key}-${candidate.sourceIndex}`}>
                <path
                  d={candidate.d}
                  fill="none"
                  stroke={selectedOrders.length ? "var(--duo-orange)" : "rgba(28,176,246,0.55)"}
                  strokeWidth={selectedOrders.length ? 4.6 : 3.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={selectedOrders.length ? 0.95 : 0.7}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    appendSegment(candidateIndex);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <circle cx={candidate.start.x} cy={candidate.start.y} r={1.7} fill="white" stroke="var(--duo-blue)" strokeWidth={0.75} />
                <circle cx={candidate.end.x} cy={candidate.end.y} r={1.7} fill="white" stroke="var(--duo-blue)" strokeWidth={0.75} />
                <text x={candidate.start.x + 1.8} y={candidate.start.y - 1.8} fontSize={3.4} fill="var(--duo-blue)" fontWeight={800}>
                  {candidate.sourceIndex + 1}
                </text>
                {lastSelected && (
                  <text x={candidate.end.x + 1.8} y={candidate.end.y + 4.2} fontSize={4.4} fill="var(--duo-orange-d)" fontWeight={900}>
                    {lastSelected.order + 1}{lastSelected.reversed ? "R" : ""}
                  </text>
                )}
              </g>
            );
          })}

          {strokes.map((stroke, strokeIndex) => (
            <g key={`stroke-${strokeIndex}`} style={{ pointerEvents: "none" }}>
              <path d={stroke.d} fill="none" stroke="var(--duo-green)" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
              <text x={4} y={14 + strokeIndex * 6} fontSize={4.5} fill="var(--duo-green-d)" fontWeight={900}>
                {strokeIndex + 1}
              </text>
            </g>
          ))}

          {selectedPreview && (
            <path d={selectedPreview.d} fill="none" stroke="var(--duo-orange)" strokeWidth={5.2} strokeLinecap="round" strokeLinejoin="round" opacity={0.35} pointerEvents="none" />
          )}
        </svg>
      </div>

      <div className="card-soft p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-bold">当前笔的线段顺序</div>
            <div className="mt-0.5 opacity-60">
              点蓝色线段会追加到当前笔；同一段可以重复点选；最后一段可反转方向。
            </div>
          </div>
          <button onClick={finishStroke} className="btn-blue shrink-0 px-3 text-xs" disabled={selected.length === 0}>
            保存为第 {strokes.length + 1} 笔
          </button>
        </div>
        <div className="mt-2 flex gap-2">
          <button onClick={() => setSelected((current) => current.slice(0, -1))} className="btn-ghost flex-1 text-xs" disabled={selected.length === 0}>
            撤销最后一段
          </button>
          <button onClick={reverseLastSegment} className="btn-ghost flex-1 text-xs" disabled={selected.length === 0}>
            反转最后一段
          </button>
          <button onClick={clearCurrent} className="btn-ghost flex-1 text-xs" disabled={selected.length === 0}>
            清空当前笔
          </button>
        </div>
        {selected.length > 0 && (
          <div className="mt-2 max-h-24 overflow-auto rounded-lg bg-black/5 p-2 font-mono text-[11px]">
            {selected.map((segment, order) => (
              <span key={`${order}-${segment.candidateIndex}`} className="mr-2 inline-block">
                {order + 1}:#{candidates[segment.candidateIndex]?.sourceIndex + 1}{segment.reversed ? "R" : ""}
              </span>
            ))}
          </div>
        )}
      </div>

      {strokes.length > 0 && (
        <div className="card-soft p-3 text-xs">
          <div className="mb-2 font-bold">已确认的笔画</div>
          <ul className="space-y-1">
            {strokes.map((stroke, index) => (
              <li key={index} className="flex items-center justify-between rounded-lg bg-black/5 px-2 py-1">
                <span>第 {index + 1} 笔 · {stroke.pointCount} 段</span>
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

      <section className="card-soft p-3 text-xs leading-relaxed opacity-80">
        <h3 className="text-sm font-bold opacity-100">使用方式</h3>
        <ol className="mt-1 list-decimal space-y-0.5 pl-4">
          <li>蓝色线段是固定的 autotrace 中线，端点和路径位置不可编辑。</li>
          <li>按真实书写顺序点选线段，点选顺序就是当前笔内部的线段顺序。</li>
          <li>同一线段可以重复选；方向错了就用“反转最后一段”。</li>
          <li>一笔选完后保存为第几笔；多笔之间按保存顺序排列。</li>
          <li>草稿会保存到 localStorage，也会同步到 D1 的 stroke draft 表。</li>
        </ol>
      </section>
    </div>
  );
}
