"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import { getLetterStrokes, type LetterStrokes, type Stroke } from "@/data/strokes";
import { TONE_MARKS } from "@/data/tones";
import {
  buildPathFromPointSequence,
  fmtPathNumber,
  pointModelFromStroke,
  reversePathBySegments,
  resolveStrokeSequence,
  type PathNode,
} from "@/lib/pathOrder";

type Point = { x: number; y: number };
type Tab = "consonant" | "vowel";

interface StrokeDraft extends LetterStrokes {
  updated_at?: number;
}

interface EditorItem {
  key: string;
  display: string;
  label: string;
  meaning: string;
  kind: Tab;
}

const DRAFT_KEY = "thai-alphabet:strokes-draft:v1";
const VB = 100;
const VOWEL_ELEMENT_ITEMS: Omit<EditorItem, "kind">[] = [
  { key: "v:a-short", display: "◌ะ", label: "a", meaning: "ะ" },
  { key: "v:a-long", display: "◌า", label: "aa", meaning: "า" },
  { key: "v:mai-han-akat", display: "◌ั", label: "mai han-akat", meaning: "ั" },
  { key: "v:mai-kham-mark", display: "◌ํ", label: "mai kham", meaning: "ํ" },
  { key: "v:i-short", display: "◌ิ", label: "i", meaning: "ิ" },
  { key: "v:i-long", display: "◌ี", label: "ii", meaning: "ี" },
  { key: "v:ue-short", display: "◌ึ", label: "ue", meaning: "ึ" },
  { key: "v:ue-long", display: "◌ื", label: "uue", meaning: "ื" },
  { key: "v:u-short", display: "◌ุ", label: "u", meaning: "ุ" },
  { key: "v:u-long", display: "◌ู", label: "uu", meaning: "ู" },
  { key: "v:e-long", display: "เ◌", label: "ee", meaning: "เ" },
  { key: "v:ae-long", display: "แ◌", label: "aae", meaning: "แ" },
  { key: "v:o-long", display: "โ◌", label: "oo", meaning: "โ" },
  { key: "v:ai-maimuan", display: "ใ◌", label: "ai", meaning: "ใ" },
  { key: "v:ai-maimalai", display: "ไ◌", label: "ai", meaning: "ไ" },
  { key: "v:o-letter", display: "อ", label: "o", meaning: "อ" },
  { key: "v:yo", display: "ย", label: "yo", meaning: "ย" },
  { key: "v:wo", display: "ว", label: "wo", meaning: "ว" },
  { key: "v:rue", display: "ฤ", label: "rue", meaning: "ฤ" },
  { key: "v:lue", display: "ฦ", label: "lue", meaning: "ฦ" },
  { key: "v:mai-kham", display: "ๅ", label: "mai kham", meaning: "ๅ" },
];
const EDITABLE_TONE_IDS = new Set(["ek", "tho", "tri", "chattawa"]);
const EDITABLE_STROKE_KEYS = new Set([
  ...CONSONANTS.map((c) => c.letter),
  ...VOWEL_ELEMENT_ITEMS.map((v) => v.key),
  ...TONE_MARKS.filter((m) => EDITABLE_TONE_IDS.has(m.id)).map((m) => `mark:${m.id}`),
]);

function buildItems(): EditorItem[] {
  const consonants: EditorItem[] = CONSONANTS.map((c) => ({
    key: c.letter,
    display: c.letter,
    label: `${c.letter} ${c.name}`,
    meaning: c.meaning,
    kind: "consonant",
  }));
  const vowels: EditorItem[] = VOWEL_ELEMENT_ITEMS.map((v) => ({ ...v, kind: "vowel" }));
  const toneMarks: EditorItem[] = TONE_MARKS.filter((m) => m.symbol && EDITABLE_TONE_IDS.has(m.id)).map((m) => ({
    key: `mark:${m.id}`,
    display: m.symbol,
    label: m.name,
    meaning: m.nameRoman,
    kind: "vowel",
  }));
  return [...consonants, ...vowels, ...toneMarks];
}

function fallbackPoint(): Point {
  return { x: 0, y: 0 };
}

function endpointsFromPath(d: string): { start: Point; end: Point } {
  const model = pointModelFromStroke({ d });
  const startNode = model.nodes.find((node) => node.id === model.sequence[0]);
  const endNode = model.nodes.find((node) => node.id === model.sequence[model.sequence.length - 1]);
  if (startNode && endNode) {
    return {
      start: startNode.point,
      end: endNode.point,
    };
  }
  const nums = d.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  if (nums.length < 4) return { start: fallbackPoint(), end: fallbackPoint() };
  return {
    start: { x: nums[0], y: nums[1] },
    end: { x: nums[nums.length - 2], y: nums[nums.length - 1] },
  };
}

function normalizeDraft(raw: unknown): StrokeDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Partial<StrokeDraft>;
  if ((value.v ?? 0) < 5 || !Array.isArray(value.strokes)) return null;
  return {
    v: 5,
    strokes: value.strokes
      .filter((stroke): stroke is Stroke => typeof stroke?.d === "string")
      .map((stroke) => resolveStrokeSequence(stroke)),
    guides: Array.isArray(value.guides)
      ? value.guides.filter((stroke): stroke is Stroke => typeof stroke?.d === "string")
      : undefined,
    updated_at: typeof value.updated_at === "number" ? value.updated_at : undefined,
  };
}

function draftMatchesBase(draft: StrokeDraft, base: LetterStrokes | null): boolean {
  if (!base) return true;
  const baseSources = new Set(base.strokes.map((stroke) => stroke.sourceD ?? stroke.d));
  return draft.strokes.every((stroke) => {
    const strokeSourceD = stroke.sourceD ?? stroke.d;
    return stroke.d.trim().length === 0 || baseSources.has(strokeSourceD);
  });
}

function loadDraft(): Record<string, StrokeDraft> {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(DRAFT_KEY) || "{}") as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([key]) => EDITABLE_STROKE_KEYS.has(key))
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
  if (!EDITABLE_STROKE_KEYS.has(key)) return null;
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
  if (!EDITABLE_STROKE_KEYS.has(key)) return;
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
  const base = item ? getLetterStrokes(item.key) : null;

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [guides, setGuides] = useState<Stroke[]>([]);
  const [selected, setSelected] = useState(0);
  const [sequenceDraft, setSequenceDraft] = useState<number[]>([]);
  const [sequenceError, setSequenceError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, StrokeDraft>>({});
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [zoom, setZoom] = useState(1);
  const dirty = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchDistanceRef = useRef(0);

  useEffect(() => setIdx(0), [tab]);

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((z) => Math.max(1, Math.min(3, z * delta)));
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length !== 2) return;
    e.preventDefault();
    const p1 = e.touches[0];
    const p2 = e.touches[1];
    const dx = p2.clientX - p1.clientX;
    const dy = p2.clientY - p1.clientY;
    touchDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length !== 2 || touchDistanceRef.current === 0) return;
    e.preventDefault();
    const p1 = e.touches[0];
    const p2 = e.touches[1];
    const dx = p2.clientX - p1.clientX;
    const dy = p2.clientY - p1.clientY;
    const newDistance = Math.sqrt(dx * dx + dy * dy);
    const ratio = newDistance / touchDistanceRef.current;
    if (ratio > 0.9 && ratio < 1.1) return;
    setZoom((z) => Math.max(1, Math.min(3, z * ratio)));
    touchDistanceRef.current = newDistance;
  };

  const handleTouchEnd = () => {
    touchDistanceRef.current = 0;
  };

  useEffect(() => {
    if (!item) return;
    dirty.current = false;
    const localDraft = loadDraft();
    const cached = localDraft[item.key];
    const usableCached = cached && draftMatchesBase(cached, base) ? cached : null;
    const current = usableCached ?? base;
    setDraft(localDraft);
    setStrokes(current?.strokes ?? []);
    setGuides(current?.guides ?? base?.guides ?? []);
    setSelected(0);
    setSequenceError(null);
    setSaveState(usableCached ? "saved" : "idle");

    fetchRemoteDraft(item.key).then((remote) => {
      if (!remote) return;
      if (!draftMatchesBase(remote, base)) return;
      const latestLocal = loadDraft()[item.key];
      if ((remote.updated_at || 0) <= (latestLocal?.updated_at || 0)) return;
      const next = { ...loadDraft(), [item.key]: remote };
      saveDraft(next);
      setDraft(next);
      setStrokes(remote.strokes);
      setGuides(remote.guides ?? base?.guides ?? []);
      setSequenceError(null);
      setSaveState("saved");
      dirty.current = false;
    });
  }, [item, base]);

  useEffect(() => {
    if (!item || !dirty.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      // Finalize current stroke's sequence before auto-saving
      const stroke = strokes[selected];
      let strokesToSave = strokes;
      if (stroke && sequenceDraft.length >= 2) {
        const nextStroke = buildStrokeFromSequence(stroke, sequenceDraft);
        if (nextStroke) {
          strokesToSave = strokes.map((s, index) => (index === selected ? nextStroke : s));
        }
      }
      const data: StrokeDraft = {
        v: 5,
        strokes: strokesToSave,
        guides,
        updated_at: Date.now(),
      };
      const next = { ...loadDraft(), [item.key]: data };
      saveDraft(next);
      setDraft(next);
      setSaveState("saving");
      pushRemoteDraft(item.key, data)
        .then(() => setSaveState("saved"))
        .catch(() => setSaveState("error"));
      dirty.current = false;
    }, 700);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [item, strokes, guides, selected, sequenceDraft]);

  useEffect(() => {
    const stroke = strokes[selected];
    if (!stroke) {
      setSequenceDraft([]);
      setSequenceError(null);
      return;
    }
    setSequenceDraft(pointModelFromStroke(stroke).sequence);
    setSequenceError(null);
  }, [item?.key, selected, strokes]);

  const referencePaths = useMemo(() => {
    const seen = new Set<string>();
    return (strokes.length > 0 ? strokes : base?.strokes ?? [])
      .map((stroke, index) => ({
        d: stroke.sourceD ?? base?.strokes[index]?.d ?? stroke.d,
        selected: index === selected,
      }))
      .filter((entry) => {
        if (!entry.d || seen.has(entry.d)) return false;
        seen.add(entry.d);
        return true;
      });
  }, [base?.strokes, selected, strokes]);

  if (!item) return null;

  const totalDoneAll = Object.values(draft).filter((value) => value.strokes.length > 0).length;
  const totalDoneTab = items.filter((it) => (draft[it.key]?.strokes.length || 0) > 0).length;
  const selectedStroke = strokes[selected] ?? null;
  const selectedModel = selectedStroke ? pointModelFromStroke(selectedStroke) : null;
  const pointNodes = selectedModel?.nodes ?? [];
  const currentSequence = selectedModel?.sequence ?? [];

  function updateStrokes(next: Stroke[], nextSelected = selected) {
    dirty.current = true;
    setStrokes(next);
    setSelected(Math.max(0, Math.min(next.length - 1, nextSelected)));
  }

  function emptyStrokeFromReference(stroke: Stroke, sequence: number[] = []): Stroke {
    const sourceD = stroke.sourceD ?? stroke.d;
    const model = pointModelFromStroke({ ...stroke, d: sourceD, sourceD });
    return {
      ...stroke,
      d: "",
      sourceD,
      points: model.nodes.map((node) => ({ id: node.id, x: node.point.x, y: node.point.y })),
      sequence,
    };
  }

  function moveSelected(delta: number) {
    if (selected < 0 || selected >= strokes.length) return;
    const target = selected + delta;
    if (target < 0 || target >= strokes.length) return;
    const next = strokes.slice();
    [next[selected], next[target]] = [next[target], next[selected]];
    updateStrokes(next, target);
  }

  function reverseSelected() {
    const stroke = strokes[selected];
    if (!stroke) return;
    const model = pointModelFromStroke(stroke);
    const points = model.nodes.map((node) => ({ id: node.id, x: node.point.x, y: node.point.y }));
    const sourceD = stroke.sourceD ?? stroke.d;
    const sequence = [...model.sequence].reverse();
    const d = buildPathFromPointSequence({ ...stroke, d: sourceD, sourceD, points }, sequence) ?? reversePathBySegments(stroke.d);
    const next = strokes.map((item, index) => (index === selected ? { ...item, d, sourceD, points, sequence } : item));
    updateStrokes(next);
  }

  function applySequence() {
    commitSequenceDraft(sequenceDraft, true);
  }

  function clearSelectedSequence(nextSequence: number[] = []) {
    const stroke = strokes[selected];
    if (!stroke) return null;
    const nextStroke = emptyStrokeFromReference(stroke, nextSequence);
    const next = strokes.map((item, index) => (index === selected ? nextStroke : item));
    setSequenceError(null);
    updateStrokes(next);
    setSequenceDraft(nextSequence);
    return next;
  }

  function buildStrokeFromSequence(stroke: Stroke, sequence: number[], showErrors = false): Stroke | null {
    const model = pointModelFromStroke(stroke);
    const validIds = new Set(model.nodes.map((node) => node.id));
    if (sequence.length < 2 || sequence.some((id) => !validIds.has(id))) {
      if (showErrors) setSequenceError(`顺序至少需要两个点，且只能使用 1-${model.nodes.length} 的点 ID。`);
      return null;
    }
    const points = model.nodes.map((node) => ({ id: node.id, x: node.point.x, y: node.point.y }));
    const sourceD = stroke.sourceD ?? stroke.d;
    const d = buildPathFromPointSequence({ ...stroke, d: sourceD, sourceD, points }, sequence);
    if (!d) {
      if (showErrors) setSequenceError("这两个点之间没有沿原 SVG 相连的路径。");
      return null;
    }
    return { ...stroke, d, sourceD, points, sequence };
  }

  function commitSequenceDraft(sequence: number[], showErrors = false): Stroke[] | null {
    const stroke = strokes[selected];
    if (!stroke) return null;
    if (sequence.length < 2) {
      if (showErrors) setSequenceError("顺序至少需要两个点。");
      return clearSelectedSequence(sequence);
    }
    const nextStroke = buildStrokeFromSequence(stroke, sequence, showErrors);
    if (!nextStroke) return null;
    const next = strokes.map((item, index) => (index === selected ? nextStroke : item));
    setSequenceError(null);
    updateStrokes(next);
    setSequenceDraft(sequence);
    return next;
  }

  function currentStrokesForSave(): Stroke[] {
    const stroke = strokes[selected];
    if (!stroke) return strokes;
    if (sequenceDraft.length < 2) {
      const nextStroke = emptyStrokeFromReference(stroke, sequenceDraft);
      const next = strokes.map((item, index) => (index === selected ? nextStroke : item));
      setStrokes(next);
      return next;
    }
    const nextStroke = buildStrokeFromSequence(stroke, sequenceDraft);
    if (!nextStroke) return strokes;
    const next = strokes.map((item, index) => (index === selected ? nextStroke : item));
    setStrokes(next);
    setSequenceDraft(nextStroke.sequence ?? sequenceDraft);
    return next;
  }

  function resetSequenceInput() {
    if (!selectedStroke) return;
    setSequenceDraft(pointModelFromStroke(selectedStroke).sequence);
    setSequenceError(null);
  }

  function appendPointId(id: number) {
    const next = [...sequenceDraft, id];
    setSequenceDraft(next);
    if (next.length >= 2) commitSequenceDraft(next, true);
    setSequenceError(null);
  }

  function removeSequenceAt(index: number) {
    const next = sequenceDraft.filter((_, i) => i !== index);
    setSequenceDraft(next);
    commitSequenceDraft(next);
    setSequenceError(null);
  }

  function undoSequence() {
    const next = sequenceDraft.slice(0, -1);
    setSequenceDraft(next);
    commitSequenceDraft(next);
    setSequenceError(null);
  }

  function addStrokeAfterSelected() {
    const reference = selectedStroke ?? base?.strokes[0];
    if (!reference) return;
    const sourceD = reference.sourceD ?? reference.d;
    const model = pointModelFromStroke({ ...reference, d: sourceD, sourceD });
    const nextStroke: Stroke = {
      d: "",
      sourceD,
      points: model.nodes.map((node) => ({ id: node.id, x: node.point.x, y: node.point.y })),
      sequence: [],
    };
    const insertAt = Math.min(strokes.length, selected + 1);
    const next = [...strokes.slice(0, insertAt), nextStroke, ...strokes.slice(insertAt)];
    updateStrokes(next, insertAt);
    setSequenceDraft([]);
    setSequenceError(null);
  }

  function deleteSelected() {
    if (!strokes[selected]) return;
    updateStrokes(strokes.filter((_, index) => index !== selected), selected - 1);
  }

  function restoreDefault() {
    if (!base) return;
    if (!confirm(`恢复 ${item.display} 的默认 SVG 笔画顺序？`)) return;
    dirty.current = true;
    setStrokes(base.strokes);
    setGuides(base.guides ?? []);
    setSelected(0);
    setSequenceError(null);
  }

  function commitToDraft() {
    // Finalize the selected stroke's sequence before saving all strokes
    const strokesToSave = currentStrokesForSave();
    const data: StrokeDraft = {
      v: 5,
      strokes: strokesToSave,
      guides,
      updated_at: Date.now(),
    };
    const next = { ...loadDraft(), [item.key]: data };
    saveDraft(next);
    setDraft(next);
    pushRemoteDraft(item.key, data).catch(() => {});
    dirty.current = false;
  }

  function nextLetter() {
    commitToDraft();
    setIdx((value) => Math.min(items.length - 1, value + 1));
  }

  function prevLetter() {
    commitToDraft();
    setIdx((value) => Math.max(0, value - 1));
  }

  function gotoFirstUnedited() {
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
        .map(([key, value]) => [key, { v: value.v || 5, strokes: value.strokes, guides: value.guides }])
    );
    navigator.clipboard.writeText(JSON.stringify(exportable, null, 2)).then(() => {
      alert("已复制到剪贴板。");
    });
  }

  function resetDraft() {
    if (!confirm("确定清空所有本地编辑草稿？默认 SVG 数据不会被删除。")) return;
    saveDraft({});
    setDraft({});
    setStrokes(base?.strokes ?? []);
    setGuides(base?.guides ?? []);
    setSelected(0);
    setSequenceError(null);
    dirty.current = false;
  }

  return (
    <div className="space-y-3">
      <div className="card-soft p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold">笔画顺序编辑器</h1>
            <p className="mt-0.5 text-xs opacity-70">基于 Figma SVG；只改笔画、线段和经过点顺序，不移动点位</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold" style={{ color: "var(--duo-green)" }}>
              {totalDoneAll}/{allItems.length}
            </div>
            <div className="text-[10px] uppercase opacity-60">已编辑草稿</div>
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
          元音元素/声调 {tab === "vowel" ? `(${totalDoneTab}/${items.length})` : `(${VOWEL_ELEMENT_ITEMS.length + EDITABLE_TONE_IDS.size})`}
        </button>
      </div>

      <div className="card-soft flex items-center gap-3 p-3">
        <div
          className="thai-big flex h-16 w-16 shrink-0 items-center justify-center rounded-lg text-4xl font-semibold"
          style={{
            background: "color-mix(in srgb, var(--duo-green) 14%, transparent)",
            border: "1px solid color-mix(in srgb, var(--duo-green) 26%, transparent)",
            color: "var(--duo-green)",
          }}
        >
          {item.display}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm">
            <b>{idx + 1} / {items.length}</b> · <span className="thai-big">{item.label}</span>{" "}
            {item.meaning && <span className="opacity-70">· {item.meaning}</span>}
          </div>
          <div className="mt-0.5 text-xs opacity-60">
            笔画 {strokes.length}；点 {pointNodes.length}；顺序 {currentSequence.length}；参考线 {guides.length}
            {" · "}
            {saveState === "saving" ? "同步中..." : saveState === "saved" ? "已同步" : saveState === "error" ? "同步失败" : "未保存"}
          </div>
        </div>
      </div>

      <div className="card-soft p-2">
        <div style={{ overflow: "hidden", aspectRatio: "1 / 1" }}>
          <svg
            viewBox={`0 0 ${VB} ${VB}`}
            className="block w-full select-none"
            style={{
              aspectRatio: "1 / 1",
              background: "white",
              transform: `scale(${zoom})`,
              transformOrigin: "center",
              transition: "transform 0.1s ease-out",
              touchAction: "none",
            }}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
          {[25, 50, 75].map((p) => (
            <g key={p} stroke="rgba(0,0,0,0.05)" strokeWidth={0.2}>
              <line x1={p} y1={0} x2={p} y2={VB} />
              <line x1={0} y1={p} x2={VB} y2={p} />
            </g>
          ))}
          {guides.map((guide, index) => (
            <path
              key={`guide-${index}`}
              d={guide.d}
              fill="none"
              stroke="rgba(0,0,0,0.22)"
              strokeWidth={1.2 / zoom}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${1.2 / zoom} ${1.8 / zoom}`}
            />
          ))}
          {referencePaths.map((reference, index) => {
            return (
              <path
                key={`reference-${item.key}-${index}`}
                d={reference.d}
                fill="none"
                stroke="rgba(0,0,0,0.16)"
                strokeWidth={(reference.selected ? 3.2 : 2.4) / zoom}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={reference.selected ? "0" : `${1.5 / zoom} ${2.2 / zoom}`}
                pointerEvents="none"
              />
            );
          })}
          {strokes.map((stroke, index) => {
            const active = index === selected;
            const hasPath = stroke.d.trim().length > 0;
            const { start } = endpointsFromPath(stroke.d);
            return (
              <g key={`${item.key}-${index}`}>
                {hasPath && (
                  <>
                    <path
                      d={stroke.d}
                      fill="none"
                      stroke={active ? "var(--duo-orange)" : "var(--duo-blue)"}
                      strokeWidth={(active ? 4.4 : 3.4) / zoom}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={active ? 0.95 : 0.72}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        setSelected(index);
                        setSequenceError(null);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <g style={{ transform: `scale(${1 / zoom})`, transformOrigin: `${start.x}px ${start.y}px` }}>
                      <circle cx={start.x} cy={start.y} r={active ? 1.6 : 1.2} fill={active ? "var(--duo-orange)" : "white"} stroke="var(--duo-blue)" strokeWidth={0.5 / zoom} />
                    </g>
                    <text x={start.x + 2} y={start.y - 1.8} fontSize={2.6} fill={active ? "var(--duo-orange-d)" : "var(--duo-blue)"} fontWeight={900} style={{ transform: `scale(${1 / zoom})`, transformOrigin: `${start.x + 2}px ${start.y - 1.8}px` }}>
                      {index + 1}
                    </text>
                  </>
                )}
              </g>
            );
          })}
          {pointNodes.map((node) => {
            return (
              <g
                key={`point-${node.id}`}
                onPointerDown={(event) => {
                  event.preventDefault();
                  appendPointId(node.id);
                }}
                style={{ cursor: "pointer" }}
              >
                <g style={{ transform: `scale(${1 / zoom})`, transformOrigin: `${node.point.x}px ${node.point.y}px` }}>
                  <circle
                    cx={node.point.x}
                    cy={node.point.y}
                    r={1.5}
                    fill="white"
                    stroke={node.useCount > 1 ? "var(--duo-red)" : "var(--duo-green)"}
                    strokeWidth={0.6 / zoom}
                  />
                </g>
                <text
                  x={node.point.x}
                  y={node.point.y + 0.8}
                  textAnchor="middle"
                  fontSize={2.2}
                  fill="var(--duo-green-d)"
                  fontWeight={900}
                  style={{ pointerEvents: "none", transform: `scale(${1 / zoom})`, transformOrigin: `${node.point.x}px ${node.point.y + 0.8}px` }}
                >
                  {node.id}
                </text>
              </g>
            );
          })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        <button onClick={() => moveSelected(-1)} className="btn-ghost text-xs" disabled={selected <= 0}>上移</button>
        <button onClick={() => moveSelected(1)} className="btn-ghost text-xs" disabled={selected >= strokes.length - 1}>下移</button>
        <button onClick={addStrokeAfterSelected} className="btn-primary text-xs" disabled={!selectedStroke && !base}>+ 一笔</button>
        <button onClick={reverseSelected} className="btn-blue text-xs" disabled={!strokes[selected]}>反转</button>
        <button onClick={deleteSelected} className="btn-red text-xs" disabled={!strokes[selected]}>删除</button>
      </div>

      {selectedStroke && (
        <div className="card-soft p-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="font-bold">第 {selected + 1} 笔：点 ID / 顺序</div>
            <div className="font-mono opacity-60">已套用 {currentSequence.length}</div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            <button onClick={applySequence} className="btn-primary text-xs" disabled={!selectedStroke}>
              套用顺序
            </button>
            <button onClick={undoSequence} className="btn-ghost text-xs" disabled={sequenceDraft.length === 0}>
              撤销一步
            </button>
            <button onClick={resetSequenceInput} className="btn-ghost text-xs" disabled={!selectedStroke}>
              还原
            </button>
            <button
              onClick={() => {
                clearSelectedSequence([]);
              }}
              className="btn-red text-xs"
              disabled={sequenceDraft.length === 0}
            >
              清空
            </button>
          </div>

          <div className="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-8">
            {pointNodes.map((node: PathNode) => (
              <button
                key={node.id}
                onClick={() => appendPointId(node.id)}
                className={node.useCount > 1 ? "btn-red h-10 px-0 text-sm" : "btn-ghost h-10 px-0 text-sm"}
                title={`${fmtPathNumber(node.point.x)}, ${fmtPathNumber(node.point.y)}`}
              >
                {node.id}
              </button>
            ))}
          </div>

          <div className="mt-3 h-24 overflow-y-auto rounded-xl border border-black/10 bg-white p-2">
            {sequenceDraft.length === 0 ? (
              <span className="px-1 py-1 text-xs opacity-45">点画布上的点，或点上面的 ID 按钮</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {sequenceDraft.map((id, index) => (
                  <button
                    key={`${id}-${index}`}
                    onClick={() => removeSequenceAt(index)}
                    className="rounded-lg bg-green-100 px-2.5 py-1.5 font-mono text-sm font-extrabold text-green-800"
                    title="点一下移除这个顺序点"
                  >
                    {id}
                  </button>
                ))}
              </div>
            )}
          </div>

          {sequenceError && <div className="mt-2 font-bold text-red-600">{sequenceError}</div>}
        </div>
      )}

      {strokes.length > 0 && (
        <div className="card-soft p-3 text-xs">
          <div className="mb-2 font-bold">笔画列表</div>
          <ul className="space-y-1">
            {strokes.map((stroke, index) => (
              <li
                key={index}
                className={`flex items-center justify-between rounded-lg px-2 py-1 ${index === selected ? "bg-orange-100 text-orange-700" : "bg-black/5"}`}
                onClick={() => {
                  setSelected(index);
                  setSequenceError(null);
                }}
              >
                <span>第 {index + 1} 笔</span>
                <span className="font-mono opacity-50">{pointModelFromStroke(stroke).nodes.length} 点</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <button onClick={prevLetter} className="btn-ghost text-xs" disabled={idx === 0}>‹ 上一字</button>
        <button onClick={restoreDefault} className="btn-orange text-xs" disabled={!base}>恢复默认</button>
        <button onClick={nextLetter} className="btn-primary text-xs" disabled={idx === items.length - 1}>下一字 ›</button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={gotoFirstUnedited} className="btn-blue text-xs">本类首个未编辑</button>
        <button onClick={exportJSON} className="btn-primary text-xs">导出编辑 JSON</button>
      </div>

      <button onClick={resetDraft} className="btn-red w-full text-xs">重置编辑草稿</button>
    </div>
  );
}
