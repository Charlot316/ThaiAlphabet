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

  // 最近表现 EMA：新结果只占 15%，大约要 8-10 次同向才稳定
  const value = outcome === "correct" ? 1 : outcome === "hard" ? 0.5 : 0;
  record.recent = record.recent * 0.85 + value * 0.15;

  if (outcome === "correct") {
    record.correct += 1;
    record.reps += 1;
    record.ease = Math.min(3.0, record.ease + 0.05);
    // SRS 间隔起步缓：前几次都是分钟/小时级，要答对 5-6 次才进入"天"级
    if (record.interval < 1) record.interval = 5 * MIN;
    else if (record.reps <= 2) record.interval = 30 * MIN;
    else if (record.reps <= 3) record.interval = 2 * HOUR;
    else if (record.reps <= 4) record.interval = 12 * HOUR;
    else if (record.reps <= 5) record.interval = 1 * DAY;
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
// 设计目标：循序渐进，前几次答对涨幅小，第 6-7 次开始出节奏，
// 大约 10-12 次稳定全对才能接近 100，全对 12-13 次摸到 100。
// 错答会回退但不会跳水。
//
// 大致曲线（连续答对、随时复习）：
//   1: ~3   3: ~15   5: ~34   7: ~57   9: ~84   12: ~95   13+: 100
export function deriveScore(r: MasteryRecord | null | undefined): number {
  if (!r || r.attempts === 0) return 0;

  // 0-25：累计曝光，log 缓增（边际递减）。attempts=30 才接近 25
  const exposure = Math.min(25, Math.log10(r.attempts + 1) * 16.5);
  // 0-30：最近正确率 EMA。因为 alpha=0.15，要连续 8-10 次对才接近满分
  const recentScore = r.recent * 30;
  // 0-30：SRS 间隔深度。每多答对一次 interval 涨一档，反应"长期记得住"
  const srsDepth = Math.min(30, Math.log10(r.interval / HOUR + 1) * 9.5);
  // 0-15：累计正确率。错答会马上拉低这一项
  const ratio = r.correct / Math.max(1, r.attempts);
  const ratioBonus = ratio * 15;
  // 0-10：刚答过的"鲜热度"，14 天衰减到 ≈0
  const daysSince = (Date.now() - r.lastSeenAt) / (1000 * 60 * 60 * 24);
  const recencyBonus = 10 * Math.exp(-daysSince / 14);
  // 翻车扣分：每次 -3，最多扣 20
  const lapsesPenalty = Math.min(20, r.lapses * 3);

  const raw =
    exposure + recentScore + srsDepth + ratioBonus + recencyBonus - lapsesPenalty;

  // 总曝光 ramp-up：前 10 次每次 attempts 解锁 1/10 的最高分，
  // 防止刚见过 1-2 次就冲到 50。第 10 次起完全开放上限。
  const warmup = Math.min(1, r.attempts / 10);
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
