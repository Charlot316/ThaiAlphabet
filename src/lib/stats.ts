"use client";
import { useEffect, useState } from "react";

const STATS_KEY = "thai-alphabet:stats:v1";
const EVENT = "thai-alphabet:stats";

export interface Stats {
  streak: number;
  lastActiveDay: string; // YYYY-MM-DD
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function defaultStats(): Stats {
  return { streak: 0, lastActiveDay: "" };
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

/** 记录"今天活跃过"，更新 streak */
export function markActive(): Stats {
  const today = todayStr();
  const cur = loadStats();
  if (cur.lastActiveDay === today) return cur;
  const yesterday = new Date(Date.now() - 86400_000).toISOString().slice(0, 10);
  const streak = cur.lastActiveDay === yesterday ? cur.streak + 1 : 1;
  const next: Stats = { streak, lastActiveDay: today };
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
    const refresh = () => setS(loadStats());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVENT, refresh);
    };
  }, []);
  return s;
}
