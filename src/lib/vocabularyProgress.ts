"use client";

import { useEffect, useState } from "react";

export const VOCABULARY_PROGRESS_KEY = "thai-alphabet:vocabulary-progress:v1";

export type VocabularyOutcome = "correct" | "hard" | "wrong" | "seen";
export type VocabularyCursorName = "flashcardFormal" | "memoryFormal";

export interface VocabularyProgressRecord {
  seen: number;
  correct: number;
  wrong: number;
  hard: number;
  recent: number;
  score: number;
  lastSeenAt: number;
  due: number;
}

export interface VocabularyProgressStore {
  v: 1;
  records: Record<string, VocabularyProgressRecord>;
  cursors: Partial<Record<VocabularyCursorName, number>>;
  updatedAt: number;
}

function emptyStore(): VocabularyProgressStore {
  return { v: 1, records: {}, cursors: {}, updatedAt: 0 };
}

function emptyRecord(): VocabularyProgressRecord {
  return {
    seen: 0,
    correct: 0,
    wrong: 0,
    hard: 0,
    recent: 0,
    score: 0,
    lastSeenAt: 0,
    due: 0,
  };
}

function emit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("thai-alphabet:vocabulary-progress"));
}

export function loadVocabularyProgress(): VocabularyProgressStore {
  if (typeof window === "undefined") return emptyStore();
  try {
    const parsed = JSON.parse(window.localStorage.getItem(VOCABULARY_PROGRESS_KEY) || "null") as Partial<VocabularyProgressStore> | null;
    if (!parsed || typeof parsed !== "object" || parsed.v !== 1) return emptyStore();
    return {
      v: 1,
      records: parsed.records && typeof parsed.records === "object" ? parsed.records as Record<string, VocabularyProgressRecord> : {},
      cursors: parsed.cursors && typeof parsed.cursors === "object" ? parsed.cursors as Partial<Record<VocabularyCursorName, number>> : {},
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
    };
  } catch {
    return emptyStore();
  }
}

export function saveVocabularyProgress(store: VocabularyProgressStore) {
  if (typeof window === "undefined") return;
  const next = { ...store, updatedAt: Date.now() };
  window.localStorage.setItem(VOCABULARY_PROGRESS_KEY, JSON.stringify(next));
  emit();
}

function scoreRecord(record: VocabularyProgressRecord): number {
  if (record.seen <= 0) return 0;
  const exposure = Math.min(46, Math.log10(record.seen + 1) * 23);
  const recent = record.recent * 32;
  const accuracy = (record.correct / Math.max(1, record.seen)) * 14;
  const hardPenalty = Math.min(10, record.hard * 1.2);
  const wrongPenalty = Math.min(22, record.wrong * 2.5);
  const warmup = Math.min(1, Math.pow(record.seen / 35, 1.15));
  return Math.max(0, Math.min(100, Math.round((exposure + recent + accuracy - hardPenalty - wrongPenalty) * warmup)));
}

export function recordVocabularyOutcome(id: string, outcome: VocabularyOutcome): VocabularyProgressStore {
  const store = loadVocabularyProgress();
  const record = { ...(store.records[id] ?? emptyRecord()) };
  const now = Date.now();
  record.seen += 1;
  record.lastSeenAt = now;

  const value = outcome === "correct" ? 1 : outcome === "hard" || outcome === "seen" ? 0.5 : 0;
  record.recent = record.recent * 0.9 + value * 0.1;

  if (outcome === "correct") {
    record.correct += 1;
    record.due = now + Math.min(14 * 24 * 60 * 60 * 1000, Math.max(15 * 60 * 1000, record.seen * record.seen * 30 * 60 * 1000));
  } else if (outcome === "hard" || outcome === "seen") {
    record.hard += 1;
    record.due = now + 8 * 60 * 1000;
  } else {
    record.wrong += 1;
    record.due = now + 90 * 1000;
  }

  record.score = scoreRecord(record);
  store.records[id] = record;
  saveVocabularyProgress(store);
  return store;
}

export function setVocabularyCursor(name: VocabularyCursorName, value: number): VocabularyProgressStore {
  const store = loadVocabularyProgress();
  store.cursors = { ...store.cursors, [name]: Math.max(0, value) };
  saveVocabularyProgress(store);
  return store;
}

export function useVocabularyProgress() {
  const [store, setStore] = useState<VocabularyProgressStore>(() => emptyStore());
  useEffect(() => {
    const refresh = () => setStore(loadVocabularyProgress());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("thai-alphabet:vocabulary-progress", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("thai-alphabet:vocabulary-progress", refresh);
    };
  }, []);
  return store;
}
