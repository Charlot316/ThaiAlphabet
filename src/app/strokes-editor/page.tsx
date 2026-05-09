"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONSONANTS } from "@/data/consonants";
import { getLetterStrokes, type LetterStrokes, type Stroke } from "@/data/strokes";
import { TONE_MARKS } from "@/data/tones";
import { VOWELS } from "@/data/vowels";

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

function buildItems(): EditorItem[] {
  const consonants: EditorItem[] = CONSONANTS.map((c) => ({
    key: c.letter,
    display: c.letter,
    label: `${c.letter} ${c.name}`,
    meaning: c.meaning,
    kind: "consonant",
  }));
  const vowels: EditorItem[] = VOWELS.map((v) => ({
    key: `v:${v.id}`,
    display: v.display,
    label: v.roman + (v.length === "long" ? " (长)" : v.length === "short" ? " (短)" : ""),
    meaning: v.notes ?? "",
    kind: "vowel",
  }));
  const toneMarks: EditorItem[] = TONE_MARKS.filter((m) => m.symbol && m.id !== "none").map((m) => ({
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
  const nums = d.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  if (nums.length < 4) return { start: fallbackPoint(), end: fallbackPoint() };
  return {
    start: { x: nums[0], y: nums[1] },
    end: { x: nums[nums.length - 2], y: nums[nums.length - 1] },
  };
}

function fmt(n: number) {
  return Number(n).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

function reversePath(d: string): string {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? [];
  type Segment =
    | { cmd: "L"; from: Point; to: Point }
    | { cmd: "C"; from: Point; c1: Point; c2: Point; to: Point };
  const subpaths: Segment[][] = [];
  let current: Point | null = null;
  let start: Point | null = null;
  let segments: Segment[] = [];
  let i = 0;
  const take = () => Number(tokens[i++]);
  const point = (): Point => ({ x: take(), y: take() });
  const pushSubpath = () => {
    if (segments.length > 0) subpaths.push(segments);
    segments = [];
  };

  while (i < tokens.length) {
    const cmd = tokens[i++];
    const upper = cmd.toUpperCase();
    if (cmd !== upper) return d;
    if (upper === "M") {
      pushSubpath();
      current = point();
      start = current;
    } else if (upper === "L" && current) {
      const to = point();
      segments.push({ cmd: "L", from: current, to });
      current = to;
    } else if (upper === "H" && current) {
      const to: Point = { x: take(), y: current.y };
      segments.push({ cmd: "L", from: current, to });
      current = to;
    } else if (upper === "V" && current) {
      const to: Point = { x: current.x, y: take() };
      segments.push({ cmd: "L", from: current, to });
      current = to;
    } else if (upper === "C" && current) {
      const c1 = point();
      const c2 = point();
      const to = point();
      segments.push({ cmd: "C", from: current, c1, c2, to });
      current = to;
    } else if (upper === "Z" && current && start) {
      segments.push({ cmd: "L", from: current, to: start });
      current = start;
    } else {
      return d;
    }
  }
  pushSubpath();
  if (subpaths.length === 0) return d;

  const parts: string[] = [];
  for (const path of subpaths.reverse()) {
    const last = path[path.length - 1].to;
    parts.push(`M ${fmt(last.x)} ${fmt(last.y)}`);
    for (const segment of [...path].reverse()) {
      if (segment.cmd === "L") {
        parts.push(`L ${fmt(segment.from.x)} ${fmt(segment.from.y)}`);
      } else {
        parts.push(
          `C ${fmt(segment.c2.x)} ${fmt(segment.c2.y)} ${fmt(segment.c1.x)} ${fmt(segment.c1.y)} ${fmt(segment.from.x)} ${fmt(segment.from.y)}`
        );
      }
    }
  }
  return parts.join(" ");
}

function normalizeDraft(raw: unknown): StrokeDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Partial<StrokeDraft>;
  if ((value.v ?? 0) < 5 || !Array.isArray(value.strokes)) return null;
  return {
    v: 5,
    strokes: value.strokes.filter((stroke): stroke is Stroke => typeof stroke?.d === "string"),
    guides: Array.isArray(value.guides)
      ? value.guides.filter((stroke): stroke is Stroke => typeof stroke?.d === "string")
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
  const base = item ? getLetterStrokes(item.key) : null;

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [guides, setGuides] = useState<Stroke[]>([]);
  const [selected, setSelected] = useState(0);
  const [draft, setDraft] = useState<Record<string, StrokeDraft>>({});
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const dirty = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setIdx(0), [tab]);

  useEffect(() => {
    if (!item) return;
    dirty.current = false;
    const localDraft = loadDraft();
    const current = localDraft[item.key] ?? base;
    setDraft(localDraft);
    setStrokes(current?.strokes ?? []);
    setGuides(current?.guides ?? base?.guides ?? []);
    setSelected(0);
    setSaveState(localDraft[item.key] ? "saved" : "idle");

    fetchRemoteDraft(item.key).then((remote) => {
      if (!remote) return;
      const latestLocal = loadDraft()[item.key];
      if ((remote.updated_at || 0) <= (latestLocal?.updated_at || 0)) return;
      const next = { ...loadDraft(), [item.key]: remote };
      saveDraft(next);
      setDraft(next);
      setStrokes(remote.strokes);
      setGuides(remote.guides ?? base?.guides ?? []);
      setSaveState("saved");
      dirty.current = false;
    });
  }, [item, base]);

  useEffect(() => {
    if (!item || !dirty.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const data: StrokeDraft = {
        v: 5,
        strokes,
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
  }, [item, strokes, guides]);

  if (!item) return null;

  const totalDoneAll = Object.values(draft).filter((value) => value.strokes.length > 0).length;
  const totalDoneTab = items.filter((it) => (draft[it.key]?.strokes.length || 0) > 0).length;

  function updateStrokes(next: Stroke[], nextSelected = selected) {
    dirty.current = true;
    setStrokes(next);
    setSelected(Math.max(0, Math.min(next.length - 1, nextSelected)));
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
    if (!strokes[selected]) return;
    const next = strokes.map((stroke, index) => (index === selected ? { d: reversePath(stroke.d) } : stroke));
    updateStrokes(next);
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
  }

  function commitToDraft() {
    const data: StrokeDraft = {
      v: 5,
      strokes,
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
    dirty.current = false;
  }

  return (
    <div className="space-y-3">
      <div className="card-soft p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold">笔画顺序编辑器</h1>
            <p className="mt-0.5 text-xs opacity-70">基于 Figma SVG；只改笔画顺序和方向，占位圈只显示不描红</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold" style={{ color: "var(--duo-green)" }}>
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
          元音/声调 {tab === "vowel" ? `(${totalDoneTab}/${items.length})` : "(36)"}
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
            笔画 {strokes.length}；参考线 {guides.length}
            {" · "}
            {saveState === "saving" ? "同步中..." : saveState === "saved" ? "已同步" : saveState === "error" ? "同步失败" : "未保存"}
          </div>
        </div>
      </div>

      <div className="card-soft p-2">
        <svg viewBox={`0 0 ${VB} ${VB}`} className="block w-full select-none" style={{ aspectRatio: "1 / 1", background: "white" }}>
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
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1.2 1.8"
            />
          ))}
          {strokes.map((stroke, index) => {
            const active = index === selected;
            const { start } = endpointsFromPath(stroke.d);
            return (
              <g key={`${item.key}-${index}`}>
                <path
                  d={stroke.d}
                  fill="none"
                  stroke={active ? "var(--duo-orange)" : "var(--duo-blue)"}
                  strokeWidth={active ? 4.4 : 3.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={active ? 0.95 : 0.72}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    setSelected(index);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <circle cx={start.x} cy={start.y} r={active ? 2.5 : 1.8} fill={active ? "var(--duo-orange)" : "white"} stroke="var(--duo-blue)" strokeWidth={0.8} />
                <text x={start.x + 2.5} y={start.y - 2.5} fontSize={4.2} fill={active ? "var(--duo-orange-d)" : "var(--duo-blue)"} fontWeight={900}>
                  {index + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => moveSelected(-1)} className="btn-ghost text-xs" disabled={selected <= 0}>上移</button>
        <button onClick={() => moveSelected(1)} className="btn-ghost text-xs" disabled={selected >= strokes.length - 1}>下移</button>
        <button onClick={reverseSelected} className="btn-blue text-xs" disabled={!strokes[selected]}>反转</button>
        <button onClick={deleteSelected} className="btn-red text-xs" disabled={!strokes[selected]}>删除</button>
      </div>

      {strokes.length > 0 && (
        <div className="card-soft p-3 text-xs">
          <div className="mb-2 font-bold">笔画列表</div>
          <ul className="space-y-1">
            {strokes.map((stroke, index) => (
              <li
                key={index}
                className={`flex items-center justify-between rounded-lg px-2 py-1 ${index === selected ? "bg-orange-100 text-orange-700" : "bg-black/5"}`}
                onClick={() => setSelected(index)}
              >
                <span>第 {index + 1} 笔</span>
                <span className="font-mono opacity-50">{stroke.d.split(/[MLCVHZ]/).length - 1} 点</span>
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
