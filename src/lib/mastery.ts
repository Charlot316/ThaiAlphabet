"use client";
import { useEffect, useState } from "react";

// =============================================================================
// 多维熟练度系统 (v2)
// =============================================================================
// 一份 MasteryRecord 同时给课程、记忆模式、无尽配对、总览使用，避免多套数据
// 不同步。每个字母累计：
//   - attempts/correct  → 总曝光与正确率
//   - recent (EMA)      → 最近表现，新答题加权高
//   - ease/interval/due → SRS 字段（SM-2 风格），决定下次复习时间
//   - reps/lapses       → 连续答对/翻车计数
//   - streakBest        → 无尽配对的历史最高连击（次要装饰用）
//   - lastSeenAt        → 上次答题时间，用来给 score 加 "久未复习扣分"
//
// score 是从这些字段派生的 0-100 综合熟练度（用于 UI 展示）。
// =============================================================================

export const MASTERY_TARGET = 100;
export const MASTERY_KEY = "thai-alphabet:mastery:v2";
// 旧 v1 数据格式不再兼容，加载时直接删掉。
const LEGACY_KEYS = ["thai-alphabet:course-progress:v1", "thai-alphabet:srs:v1"];

export type Outcome = "correct" | "hard" | "wrong";

export interface MasteryRecord {
  attempts: number;
  correct: number;
  recent: number; // 0..1，最近 K 次正确性的 EMA
  ease: number; // SRS ease，默认 2.5，区间 1.3..3.0
  interval: number; // SRS 间隔（分钟）
  due: number; // 下次到期时间 (unix ms)
  reps: number; // 连续答对次数
  lapses: number; // 翻车次数
  lastSeenAt: number; // 上次答题时间 (unix ms)
  streakBest: number; // 无尽配对模式里的历史最高连击
}

export type MasteryStore = Record<string, MasteryRecord>;
// 向后兼容：UI 直接拿派生的 0-100 数字
export type MasteryProgress = Record<string, number>;

const MIN = 1;
const HOUR = 60;
const DAY = 24 * HOUR;

function emptyRecord(): MasteryRecord {
  return {
    attempts: 0,
    correct: 0,
    recent: 0,
    ease: 2.5,
    interval: 0,
    due: 0,
    reps: 0,
    lapses: 0,
    lastSeenAt: 0,
    streakBest: 0,
  };
}

function emit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("thai-alphabet:mastery"));
}

function readRaw(): unknown {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(MASTERY_KEY) || "null");
  } catch {
    return null;
  }
}

const PURGE_FLAG = "thai-alphabet:mastery:legacy-purged";
let purgedThisSession = false;

function purgeLegacyOnce() {
  if (purgedThisSession) return;
  purgedThisSession = true;
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(PURGE_FLAG)) return;
    for (const key of LEGACY_KEYS) window.localStorage.removeItem(key);
    window.localStorage.setItem(PURGE_FLAG, "1");
  } catch {
    /* ignore */
  }
}

export function loadStore(): MasteryStore {
  purgeLegacyOnce();
  const direct = readRaw();
  if (direct && typeof direct === "object") return direct as MasteryStore;
  return {};
}

export function saveStore(store: MasteryStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MASTERY_KEY, JSON.stringify(store));
  emit();
}

export function getRecord(id: string): MasteryRecord {
  const store = loadStore();
  return store[id] ?? emptyRecord();
}

// 写入一次答题结果。课程 / 记忆 / 配对都走这个口子。
export function recordOutcome(
  id: string,
  outcome: Outcome,
  opts?: { streak?: number }
): MasteryStore {
  const store = loadStore();
  const record = { ...(store[id] ?? emptyRecord()) };
  const now = Date.now();

  record.attempts += 1;
  record.lastSeenAt = now;

  // 最近表现 EMA：新结果只占 5%，大约要 30 次同向才稳定到 0.8
  const value = outcome === "correct" ? 1 : outcome === "hard" ? 0.5 : 0;
  record.recent = record.recent * 0.95 + value * 0.05;

  if (outcome === "correct") {
    record.correct += 1;
    record.reps += 1;
    record.ease = Math.min(3.0, record.ease + 0.05);
    // SRS 间隔起步缓：要答对 6-8 次才进入"天"级，再多次后才走 ease 乘法
    if (record.interval < 1) record.interval = 5 * MIN;
    else if (record.reps <= 3) record.interval = 30 * MIN;
    else if (record.reps <= 5) record.interval = 4 * HOUR;
    else if (record.reps <= 8) record.interval = 1 * DAY;
    else record.interval = record.interval * record.ease;
    record.due = now + record.interval * 60 * 1000;
  } else if (outcome === "hard") {
    record.ease = Math.max(1.3, record.ease - 0.05);
    // 模糊：间隔小幅退步
    record.interval = Math.max(5 * MIN, record.interval * 0.6);
    record.due = now + record.interval * 60 * 1000;
  } else {
    record.lapses += 1;
    record.reps = 0;
    record.ease = Math.max(1.3, record.ease - 0.2);
    record.interval = 1 * MIN;
    record.due = now + 60 * 1000;
  }

  if (opts?.streak && opts.streak > record.streakBest) {
    record.streakBest = opts.streak;
  }

  store[id] = record;
  saveStore(store);
  return store;
}

// 0-100 综合熟练度 — 给 UI 显示
//
// 设计目标：100 次才能到 100。前几次几乎不动，30 次稳进，70 次出门槛。
// 一次课程一个字母可能答 8 次，一次课不应该让分数飙起来。
//
// 大致曲线（每次都对、随时复习）：
//   1: 0   8: ~2   16: ~7   30: ~18   50: ~39   70: ~62   85: ~85   100: 100
export function deriveScore(r: MasteryRecord | null | undefined): number {
  if (!r || r.attempts === 0) return 0;

  // 0-50：累计曝光。100 次答题刚好到 50（log10(101)*25 = 50.1）
  const exposure = Math.min(50, Math.log10(r.attempts + 1) * 25);
  // 0-30：最近正确率 EMA（alpha=0.05，约 30 次连对才稳到 0.8）
  const recentScore = r.recent * 30;
  // 0-15：SRS 间隔深度（log）
  const srsDepth = Math.min(15, Math.log10(r.interval / HOUR + 1) * 4.4);
  // 0-5：累计正确率
  const ratio = r.correct / Math.max(1, r.attempts);
  const ratioBonus = ratio * 5;
  // 0-5：刚答过的鲜热度，14 天衰减到 ≈0
  const daysSince = (Date.now() - r.lastSeenAt) / (1000 * 60 * 60 * 24);
  const recencyBonus = 5 * Math.exp(-daysSince / 14);
  // 翻车扣分：每次 -2，最多扣 15
  const lapsesPenalty = Math.min(15, r.lapses * 2);

  const raw =
    exposure + recentScore + srsDepth + ratioBonus + recencyBonus - lapsesPenalty;

  // Ramp-up：前 100 次都在压上限，曲线 (att/100)^1.3 让前期超慢、后期才上来。
  const warmup = Math.min(1, Math.pow(r.attempts / 100, 1.3));
  return Math.max(0, Math.min(100, Math.round(raw * warmup)));
}

// 派生的 0-100 视图，给 UI 用
export function loadMastery(): MasteryProgress {
  const store = loadStore();
  const out: MasteryProgress = {};
  for (const [id, r] of Object.entries(store)) out[id] = deriveScore(r);
  return out;
}

export function dueIds(now: number = Date.now()): string[] {
  const store = loadStore();
  return Object.entries(store)
    .filter(([, r]) => r.attempts > 0 && r.due <= now)
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => id);
}

// =============================================================================
// 向后兼容 API（课程、总览继续用，无需改动调用方）
// =============================================================================

/** 旧 API：amount > 0 视为答对，< 0 视为答错。amount 量级被忽略。 */
export function addMastery(id: string, amount: number = 1): MasteryProgress {
  recordOutcome(id, amount >= 0 ? "correct" : "wrong");
  return loadMastery();
}

export function applyWrongAnswer(targetId: string, wrongId?: string): MasteryProgress {
  recordOutcome(targetId, "wrong");
  if (wrongId && wrongId !== targetId) recordOutcome(wrongId, "wrong");
  return loadMastery();
}

export function clearMastery(itemId: string): MasteryProgress {
  const store = loadStore();
  if (!(itemId in store)) return loadMastery();
  delete store[itemId];
  saveStore(store);
  return loadMastery();
}

export function resetMastery() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(MASTERY_KEY);
  emit();
}

// =============================================================================
// React Hooks
// =============================================================================

export function useMastery() {
  const [progress, setProgress] = useState<MasteryProgress>({});
  useEffect(() => {
    const refresh = () => setProgress(loadMastery());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("thai-alphabet:mastery", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("thai-alphabet:mastery", refresh);
    };
  }, []);
  return progress;
}

export function useMasteryStore() {
  const [store, setStore] = useState<MasteryStore>({});
  useEffect(() => {
    const refresh = () => setStore(loadStore());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("thai-alphabet:mastery", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("thai-alphabet:mastery", refresh);
    };
  }, []);
  return store;
}
