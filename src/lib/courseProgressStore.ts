"use client";

import { useSyncExternalStore } from "react";
import {
  COURSE_PROGRESS_KEY,
  type CourseProgress,
} from "@/lib/curriculum";
import { installLocationChangeEvents, LOCATION_CHANGE_EVENT } from "@/lib/routeEvents";

export const COURSE_PROGRESS_EVENT = "thai-alphabet:course-progress";

const EMPTY_COURSE_PROGRESS: CourseProgress = Object.freeze({
  completedLessonIds: [],
  skippedUnits: [],
  updatedAt: 0,
});

let cachedRaw: string | null | undefined;
let cachedSnapshot: CourseProgress = EMPTY_COURSE_PROGRESS;

function uniqueStrings(value: unknown): string[] {
  return Array.isArray(value)
    ? Array.from(new Set(value.filter((item): item is string => typeof item === "string")))
    : [];
}

function parseProgress(raw: string | null): CourseProgress {
  if (!raw) return EMPTY_COURSE_PROGRESS;
  try {
    const parsed = JSON.parse(raw) as Partial<CourseProgress> | null;
    if (!parsed || typeof parsed !== "object") return EMPTY_COURSE_PROGRESS;
    return {
      completedLessonIds: uniqueStrings(parsed.completedLessonIds),
      skippedUnits: uniqueStrings(parsed.skippedUnits),
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
      resetAt: typeof parsed.resetAt === "number" ? parsed.resetAt : undefined,
    };
  } catch {
    return EMPTY_COURSE_PROGRESS;
  }
}

function readRawProgress(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(COURSE_PROGRESS_KEY);
  } catch {
    return null;
  }
}

export function getCourseProgressSnapshot(): CourseProgress {
  const raw = readRawProgress();
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  cachedSnapshot = parseProgress(raw);
  return cachedSnapshot;
}

function getServerSnapshot(): CourseProgress {
  return EMPTY_COURSE_PROGRESS;
}

function notifySoon(listener: () => void) {
  listener();
  window.setTimeout(listener, 0);
}

export function subscribeCourseProgress(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  installLocationChangeEvents();

  const onStorage = (event: StorageEvent) => {
    if (!event.key || event.key === COURSE_PROGRESS_KEY) listener();
  };
  const onVisibility = () => {
    if (document.visibilityState === "visible") notifySoon(listener);
  };
  const onPageShow = () => notifySoon(listener);
  const onFocus = () => notifySoon(listener);
  const onRoute = () => notifySoon(listener);

  window.addEventListener(COURSE_PROGRESS_EVENT, listener);
  window.addEventListener("storage", onStorage);
  window.addEventListener("pageshow", onPageShow);
  window.addEventListener("focus", onFocus);
  window.addEventListener(LOCATION_CHANGE_EVENT, onRoute);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    window.removeEventListener(COURSE_PROGRESS_EVENT, listener);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("pageshow", onPageShow);
    window.removeEventListener("focus", onFocus);
    window.removeEventListener(LOCATION_CHANGE_EVENT, onRoute);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

export function notifyCourseProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COURSE_PROGRESS_EVENT));
}

export function useCourseProgress(): CourseProgress {
  return useSyncExternalStore(
    subscribeCourseProgress,
    getCourseProgressSnapshot,
    getServerSnapshot
  );
}
