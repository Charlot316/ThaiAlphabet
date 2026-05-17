"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  COURSE_PROGRESS_KEY,
  type CourseProgress,
} from "@/lib/curriculum";
import { installLocationChangeEvents, LOCATION_CHANGE_EVENT } from "@/lib/routeEvents";

export const COURSE_PROGRESS_EVENT = "thai-alphabet:course-progress";
export const COURSE_PROGRESS_READY_EVENT = "thai-alphabet:course-progress-ready";

const EMPTY_COURSE_PROGRESS: CourseProgress = Object.freeze({
  completedLessonIds: [],
  skippedUnits: [],
  updatedAt: 0,
});

let cachedRaw: string | null | undefined;
let cachedSnapshot: CourseProgress = EMPTY_COURSE_PROGRESS;

// Module-level "ready" flag. Once true, stays true for the lifetime of the
// browsing session. AuthGuard flips it to true after the initial sync pull
// (or immediately in local-bypass mode). Pages use it to distinguish
// "progress legitimately empty" from "progress not yet loaded", so they
// never paint a fake "everything locked" UI during the hydration window.
let progressReady = false;

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

function invalidateSnapshotCache() {
  cachedRaw = undefined;
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

  const refreshAndNotify = () => {
    invalidateSnapshotCache();
    listener();
  };
  const refreshAndNotifySoon = () => {
    invalidateSnapshotCache();
    notifySoon(listener);
  };

  const onStorage = (event: StorageEvent) => {
    if (!event.key || event.key === COURSE_PROGRESS_KEY) refreshAndNotify();
  };
  const onVisibility = () => {
    if (document.visibilityState === "visible") refreshAndNotifySoon();
  };

  window.addEventListener(COURSE_PROGRESS_EVENT, refreshAndNotify);
  window.addEventListener("storage", onStorage);
  window.addEventListener("pageshow", refreshAndNotifySoon);
  window.addEventListener("focus", refreshAndNotifySoon);
  window.addEventListener(LOCATION_CHANGE_EVENT, refreshAndNotifySoon);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    window.removeEventListener(COURSE_PROGRESS_EVENT, refreshAndNotify);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("pageshow", refreshAndNotifySoon);
    window.removeEventListener("focus", refreshAndNotifySoon);
    window.removeEventListener(LOCATION_CHANGE_EVENT, refreshAndNotifySoon);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

export function notifyCourseProgressChanged() {
  if (typeof window === "undefined") return;
  invalidateSnapshotCache();
  window.dispatchEvent(new Event(COURSE_PROGRESS_EVENT));
}

function subscribeCourseProgressReady(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onEvent = () => listener();
  window.addEventListener(COURSE_PROGRESS_READY_EVENT, onEvent);
  return () => {
    window.removeEventListener(COURSE_PROGRESS_READY_EVENT, onEvent);
  };
}

function getCourseProgressReady(): boolean {
  return progressReady;
}

function getCourseProgressReadyServer(): boolean {
  return false;
}

/**
 * Marks the course progress store as ready. Call this after AuthGuard's
 * initial sync (or immediately in bypass mode) so consumer components can
 * trust the value returned by useCourseProgressState. Idempotent.
 */
export function markCourseProgressReady() {
  if (typeof window === "undefined") return;
  if (progressReady) return;
  progressReady = true;
  invalidateSnapshotCache();
  window.dispatchEvent(new Event(COURSE_PROGRESS_READY_EVENT));
  window.dispatchEvent(new Event(COURSE_PROGRESS_EVENT));
}

export function isCourseProgressReady(): boolean {
  return progressReady;
}

export function useCourseProgress(): CourseProgress {
  return useSyncExternalStore(
    subscribeCourseProgress,
    getCourseProgressSnapshot,
    getServerSnapshot
  );
}

export interface CourseProgressState {
  progress: CourseProgress;
  ready: boolean;
}

/**
 * Returns the current course progress alongside a `ready` flag indicating
 * whether the store has been hydrated from localStorage (and, in production,
 * had its initial sync pull complete). Pages should render a neutral
 * placeholder until `ready` is true to avoid a flash of fake "locked" state.
 */
export function useCourseProgressState(): CourseProgressState {
  const progress = useSyncExternalStore(
    subscribeCourseProgress,
    getCourseProgressSnapshot,
    getServerSnapshot
  );
  const ready = useSyncExternalStore(
    subscribeCourseProgressReady,
    getCourseProgressReady,
    getCourseProgressReadyServer
  );

  // Belt-and-suspenders: after this component mounts, force two extra
  // snapshot re-checks. useSyncExternalStore's initial snapshot can lag on
  // Safari when a fresh page is mounted — sometimes the initial read of
  // localStorage returns the pre-pull value even though pull has written
  // the new value. An immediate refresh + a short delayed refresh covers
  // both the "Safari hasn't surfaced the write yet" case and the
  // "useSyncExternalStore subscribed too early" case.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const refresh = () => {
      invalidateSnapshotCache();
      window.dispatchEvent(new Event(COURSE_PROGRESS_EVENT));
    };
    refresh();
    const timer = window.setTimeout(refresh, 200);
    return () => window.clearTimeout(timer);
  }, []);

  return { progress, ready };
}
