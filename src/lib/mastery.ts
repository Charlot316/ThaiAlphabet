"use client";
import { useEffect, useState } from "react";

export const MASTERY_KEY = "thai-alphabet:course-progress:v1";
export const MASTERY_TARGET = 24;

export type MasteryProgress = Record<string, number>;

export function loadMastery(): MasteryProgress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(MASTERY_KEY) || "{}") as MasteryProgress;
  } catch {
    return {};
  }
}

export function saveMastery(progress: MasteryProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MASTERY_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event("thai-alphabet:mastery"));
}

export function addMastery(itemId: string, amount = 1): MasteryProgress {
  const current = loadMastery();
  const next = {
    ...current,
    [itemId]: Math.max(0, Math.min(MASTERY_TARGET, (current[itemId] || 0) + amount)),
  };
  saveMastery(next);
  return next;
}

export function resetMastery() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(MASTERY_KEY);
  window.dispatchEvent(new Event("thai-alphabet:mastery"));
}

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
