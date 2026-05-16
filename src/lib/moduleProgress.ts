"use client";

import { useEffect, useState } from "react";

export const ALPHABET_FINAL_EXAM_KEY = "thai:module:alphabet-final:v1";
export const ALPHABET_FINAL_EXAM_EVENT = "thai:module:alphabet-final";

export const ALPHABET_FINAL_EXAM_POLICY = {
  matchedTarget: 80,
  maxMisses: 5,
  streakTarget: 25,
  route: "/endless-match?exam=alphabet-final",
};

export interface AlphabetFinalExamResult {
  passed: boolean;
  passedAt: number;
  totalMatched: number;
  totalMissed: number;
  bestStreak: number;
}

export function isAlphabetFinalPassingScore(result: {
  totalMatched: number;
  totalMissed: number;
  bestStreak: number;
}): boolean {
  return (
    result.totalMatched >= ALPHABET_FINAL_EXAM_POLICY.matchedTarget &&
    result.totalMissed <= ALPHABET_FINAL_EXAM_POLICY.maxMisses &&
    result.bestStreak >= ALPHABET_FINAL_EXAM_POLICY.streakTarget
  );
}

export function loadAlphabetFinalExamResult(): AlphabetFinalExamResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ALPHABET_FINAL_EXAM_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AlphabetFinalExamResult>;
    if (!parsed.passed || typeof parsed.passedAt !== "number") return null;
    return {
      passed: true,
      passedAt: parsed.passedAt,
      totalMatched: Number(parsed.totalMatched) || 0,
      totalMissed: Number(parsed.totalMissed) || 0,
      bestStreak: Number(parsed.bestStreak) || 0,
    };
  } catch {
    return null;
  }
}

export function saveAlphabetFinalExamResult(result: Omit<AlphabetFinalExamResult, "passed" | "passedAt">) {
  if (typeof window === "undefined") return;
  const next: AlphabetFinalExamResult = {
    ...result,
    passed: true,
    passedAt: Date.now(),
  };
  window.localStorage.setItem(ALPHABET_FINAL_EXAM_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(ALPHABET_FINAL_EXAM_EVENT));
}

export function clearAlphabetFinalExamResult() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ALPHABET_FINAL_EXAM_KEY);
  window.dispatchEvent(new Event(ALPHABET_FINAL_EXAM_EVENT));
}

export function useAlphabetFinalExamResult() {
  const [result, setResult] = useState<AlphabetFinalExamResult | null>(null);
  useEffect(() => {
    const refresh = () => setResult(loadAlphabetFinalExamResult());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(ALPHABET_FINAL_EXAM_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(ALPHABET_FINAL_EXAM_EVENT, refresh);
    };
  }, []);
  return result;
}
