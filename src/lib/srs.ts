// 简化版 SM-2-lite SRS 算法

export type Grade = "again" | "hard" | "good";

export interface SrsCard {
  id: string;
  ease: number;     // 难度系数, 默认 2.5
  interval: number; // 单位：分钟
  due: number;      // unix ms
  reps: number;
  lapses: number;
}

export function newCard(id: string): SrsCard {
  return {
    id,
    ease: 2.5,
    interval: 0,
    due: Date.now(),
    reps: 0,
    lapses: 0,
  };
}

const MIN = 1;
const HOUR = 60;
const DAY = 24 * HOUR;

export function review(card: SrsCard, grade: Grade, now: number = Date.now()): SrsCard {
  let { ease, interval, reps, lapses } = card;
  if (grade === "again") {
    lapses += 1;
    reps = 0;
    ease = Math.max(1.3, ease - 0.2);
    interval = MIN; // 1 分钟后重来
  } else if (grade === "hard") {
    ease = Math.max(1.3, ease - 0.05);
    if (reps === 0) interval = 5 * MIN;
    else interval = Math.max(MIN, interval * 1.2);
    reps += 1;
  } else {
    // good
    if (reps === 0) interval = 10 * MIN;
    else if (reps === 1) interval = 1 * DAY;
    else interval = interval * ease;
    reps += 1;
    ease = ease + 0.05;
  }
  return {
    ...card,
    ease,
    interval,
    reps,
    lapses,
    due: now + interval * 60 * 1000,
  };
}

export function dueCards(cards: SrsCard[], now: number = Date.now()): SrsCard[] {
  return cards.filter((c) => c.due <= now).sort((a, b) => a.due - b.due);
}

export function loadDeck(key: string): SrsCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as SrsCard[]) : [];
  } catch {
    return [];
  }
}

export function saveDeck(key: string, deck: SrsCard[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(deck));
}
