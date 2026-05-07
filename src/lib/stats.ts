"use client";
import { useEffect, useState } from "react";

const STATS_KEY = "thai-alphabet:stats:v1";
const EVENT = "thai-alphabet:stats";

export interface Stats {
  xp: number;
  streak: number;
  lastActiveDay: string; // YYYY-MM-DD
  hearts: number;
  heartsMax: number;
  heartsRefilledAt: number; // unix ms 上次回血时间
}

const HEART_REFILL_MINUTES = 30; // 每 30 分钟回 1 颗心

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function defaultStats(): Stats {
  return {
    xp: 0,
    streak: 0,
    lastActiveDay: "",
    hearts: 5,
    heartsMax: 5,
    heartsRefilledAt: Date.now(),
  };
}

export function loadStats(): Stats {
  if (typeof window === "undefined") return defaultStats();
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) return defaultStats();
    return { ...defaultStats(), ...(JSON.parse(raw) as Partial<Stats>) };
  } catch {
    return defaultStats();
  }
}

function saveStats(s: Stats) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STATS_KEY, JSON.stringify(s));
  window.dispatchEvent(new Event(EVENT));
}

/** 把心数按时间回血到当前应有的值 */
function refillHearts(s: Stats): Stats {
  if (s.hearts >= s.heartsMax) return { ...s, heartsRefilledAt: Date.now() };
  const now = Date.now();
  const gap = now - (s.heartsRefilledAt || now);
  const gain = Math.floor(gap / (HEART_REFILL_MINUTES * 60_000));
  if (gain <= 0) return s;
  const hearts = Math.min(s.heartsMax, s.hearts + gain);
  const heartsRefilledAt = (s.heartsRefilledAt || now) + gain * HEART_REFILL_MINUTES * 60_000;
  return { ...s, hearts, heartsRefilledAt };
}

export function addXp(amount: number): Stats {
  const today = todayStr();
  const cur = refillHearts(loadStats());
  let streak = cur.streak;
  if (cur.lastActiveDay !== today) {
    // 连胜：昨天活跃 +1，否则重置为 1
    const yesterday = new Date(Date.now() - 86400_000).toISOString().slice(0, 10);
    streak = cur.lastActiveDay === yesterday ? cur.streak + 1 : 1;
  }
  const next: Stats = {
    ...cur,
    xp: cur.xp + amount,
    streak,
    lastActiveDay: today,
  };
  saveStats(next);
  return next;
}

export function loseHeart(): Stats {
  const cur = refillHearts(loadStats());
  const next: Stats = {
    ...cur,
    hearts: Math.max(0, cur.hearts - 1),
    heartsRefilledAt: cur.hearts >= cur.heartsMax ? Date.now() : cur.heartsRefilledAt,
  };
  saveStats(next);
  return next;
}

export function resetStats(): Stats {
  const s = defaultStats();
  saveStats(s);
  return s;
}

export function useStats() {
  const [s, setS] = useState<Stats>(defaultStats());
  useEffect(() => {
    const refresh = () => setS(refillHearts(loadStats()));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(EVENT, refresh);
    const id = setInterval(refresh, 60_000); // 每分钟刷新一次心数
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVENT, refresh);
      clearInterval(id);
    };
  }, []);
  return s;
}
