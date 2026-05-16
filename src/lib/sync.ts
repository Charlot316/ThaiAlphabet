"use client";

// 客户端 ↔ Cloudflare D1 同步层
// - 登录后服务端发 token，存 localStorage
// - 监听同步白名单里的 localStorage 写入，防抖批量推送
// - 启动时拉取服务端 → 与本地按 updated_at 合并

const TOKEN_KEY = "thai-alphabet:sync:token";
const USER_KEY = "thai-alphabet:sync:user";
const SINCE_KEY = "thai-alphabet:sync:since";        // 上次拉取的服务端时间
const META_KEY = "thai-alphabet:sync:meta";          // {key: updated_at}
const LAST_PULL_KEY = "thai-alphabet:sync:last-pull";
const COURSE_PROGRESS_SYNC_KEY = "thai-alphabet:course-progress:v2";

// 这些 key 才参与同步
const SYNC_KEYS = new Set<string>([
  "thai-alphabet:mastery:v2",                // 多维熟练度（含 SRS 字段）
  "thai-alphabet:stats:v1",                  // streak / active days
  COURSE_PROGRESS_SYNC_KEY,                  // 课程列表完成进度
  "thai:module:alphabet-final:v1",           // 字母期末通过状态
  "thai-alphabet:last-lesson:v1",            // 旧版 course last lesson，保留读取
  "thai-alphabet:endless-match:best",        // 无尽配对最高连击
  "thai-alphabet:flashcards-last-order:v1:consonant",
  "thai-alphabet:flashcards-last-order:v1:vowel",
  "thai-alphabet:flashcards-last-order:v1:both",
]);

// 不再使用、已废弃的 key —— 登录时一次性请求云端删除
export const LEGACY_REMOTE_KEYS: readonly string[] = [
  "thai-alphabet:course-progress:v1",
  "thai-alphabet:srs:v1",
];

// 本地标记：旧 key 已经在云端 + 本地都清理过了
const LEGACY_CLEANUP_FLAG = "thai-alphabet:cleanup:legacy:v2";

const SKIP_KEYS = new Set<string>([TOKEN_KEY, USER_KEY, SINCE_KEY, META_KEY, LAST_PULL_KEY]);

interface KvRow {
  key: string;
  value: string;
  updated_at: number;
}

interface CourseProgressSyncValue {
  completedLessonIds?: unknown;
  updatedAt?: unknown;
  resetAt?: unknown;
}

export type SyncStatus = "off" | "idle" | "pulling" | "pushing" | "error";

const listeners = new Set<(status: SyncStatus, msg?: string) => void>();
let currentStatus: SyncStatus = "off";
let currentMsg = "";
let pullInFlight: Promise<{ ok: boolean; merged: number; error?: string }> | null = null;

function emit(status: SyncStatus, msg = "") {
  currentStatus = status;
  currentMsg = msg;
  listeners.forEach((fn) => fn(status, msg));
}

export function getStatus() {
  return { status: currentStatus, msg: currentMsg };
}

export function subscribe(fn: (status: SyncStatus, msg?: string) => void): () => void {
  listeners.add(fn);
  fn(currentStatus, currentMsg);
  return () => {
    listeners.delete(fn);
  };
}

export function getToken(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(TOKEN_KEY) || "";
}
export function getUsername(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(USER_KEY) || "";
}
export function getLastPullAt(): number {
  if (typeof window === "undefined") return 0;
  return readNumberKey(LAST_PULL_KEY);
}
export function isLoggedIn(): boolean {
  return getToken().length > 0;
}

const authListeners = new Set<() => void>();
function emitAuth() {
  authListeners.forEach((fn) => fn());
}
export function subscribeAuth(fn: () => void): () => void {
  authListeners.add(fn);
  return () => {
    authListeners.delete(fn);
  };
}

export interface LoginResult {
  ok: boolean;
  error?: string;
}

export async function login(username: string, password: string): Promise<LoginResult> {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      token?: string;
      username?: string;
      error?: string;
    };
    if (!res.ok || !data.token) {
      return { ok: false, error: data.error || `HTTP ${res.status}` };
    }
    window.localStorage.setItem(TOKEN_KEY, data.token);
    window.localStorage.setItem(USER_KEY, data.username || username);
    emitAuth();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function logout() {
  const token = getToken();
  if (token) {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      });
    } catch {
      // 即使网络失败也清本地
    }
  }
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(SINCE_KEY);
  window.localStorage.removeItem(META_KEY);
  emit("off");
  emitAuth();
}

function loadMeta(): Record<string, number> {
  try {
    return JSON.parse(window.localStorage.getItem(META_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveMeta(meta: Record<string, number>) {
  window.localStorage.setItem(META_KEY, JSON.stringify(meta));
}

function isSyncableKey(key: string): boolean {
  return SYNC_KEYS.has(key);
}

function dispatchDataEvents() {
  window.dispatchEvent(new Event("thai-alphabet:mastery"));
  window.dispatchEvent(new Event("thai-alphabet:stats"));
  window.dispatchEvent(new Event("thai-alphabet:course-progress"));
  window.dispatchEvent(new Event("thai:module:alphabet-final"));
}

function readNumberKey(key: string): number {
  try {
    return Number(window.localStorage.getItem(key) || "0") || 0;
  } catch {
    return 0;
  }
}

function writeNumberKey(key: string, value: number) {
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    /* ignore */
  }
}

function parseCourseProgress(raw: string | null): {
  completedLessonIds: string[];
  updatedAt: number;
  resetAt: number;
} | null {
  if (!raw) return { completedLessonIds: [], updatedAt: 0, resetAt: 0 };
  try {
    const parsed = JSON.parse(raw) as CourseProgressSyncValue | null;
    if (!parsed || typeof parsed !== "object") return null;
    const completedLessonIds = Array.isArray(parsed.completedLessonIds)
      ? parsed.completedLessonIds.filter((id): id is string => typeof id === "string")
      : [];
    return {
      completedLessonIds,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
      resetAt: typeof parsed.resetAt === "number" ? parsed.resetAt : 0,
    };
  } catch {
    return null;
  }
}

function sortLessonIds(ids: Iterable<string>): string[] {
  return Array.from(new Set(ids)).sort((a, b) => {
    const aNum = /^L(\d+)$/.exec(a)?.[1];
    const bNum = /^L(\d+)$/.exec(b)?.[1];
    if (aNum && bNum) return Number(aNum) - Number(bNum);
    return a.localeCompare(b);
  });
}

function sameStringArray(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function mergeCourseProgressRow(row: KvRow, meta: Record<string, number>): boolean {
  const local = parseCourseProgress(window.localStorage.getItem(COURSE_PROGRESS_SYNC_KEY));
  const remote = parseCourseProgress(row.value);
  if (!remote) return false;
  if (!local) {
    suppressOnce.add(COURSE_PROGRESS_SYNC_KEY);
    window.localStorage.setItem(COURSE_PROGRESS_SYNC_KEY, row.value);
    meta[COURSE_PROGRESS_SYNC_KEY] = Math.max(meta[COURSE_PROGRESS_SYNC_KEY] || 0, row.updated_at);
    return true;
  }

  const resetAt = Math.max(local.resetAt, remote.resetAt);
  const localIds = local.resetAt === resetAt || local.updatedAt >= resetAt ? local.completedLessonIds : [];
  const remoteIds = remote.resetAt === resetAt || remote.updatedAt >= resetAt ? remote.completedLessonIds : [];
  const mergedIds = sortLessonIds([...localIds, ...remoteIds]);
  const localSorted = sortLessonIds(localIds);
  const remoteSorted = sortLessonIds(remoteIds);
  const localChanged =
    !sameStringArray(localSorted, mergedIds) || local.resetAt !== resetAt || local.completedLessonIds.length !== localSorted.length;
  const remoteNeedsPush = !sameStringArray(remoteSorted, mergedIds) || remote.resetAt !== resetAt;
  const nextUpdatedAt = remoteNeedsPush
    ? Math.max(Date.now(), local.updatedAt, remote.updatedAt, row.updated_at) + 1
    : Math.max(local.updatedAt, remote.updatedAt, row.updated_at);
  const nextValue = JSON.stringify({
    completedLessonIds: mergedIds,
    updatedAt: nextUpdatedAt,
    ...(resetAt ? { resetAt } : {}),
  });

  if (localChanged) {
    suppressOnce.add(COURSE_PROGRESS_SYNC_KEY);
    window.localStorage.setItem(COURSE_PROGRESS_SYNC_KEY, nextValue);
  }

  meta[COURSE_PROGRESS_SYNC_KEY] = Math.max(
    meta[COURSE_PROGRESS_SYNC_KEY] || 0,
    row.updated_at,
    nextUpdatedAt
  );

  if (remoteNeedsPush) {
    pending.set(COURSE_PROGRESS_SYNC_KEY, {
      key: COURSE_PROGRESS_SYNC_KEY,
      value: nextValue,
      updated_at: nextUpdatedAt,
    });
    schedulePush();
  }

  return localChanged;
}

/** 拉取服务端变更，应用到本地（按 updated_at 比较） */
export async function pull(): Promise<{ ok: boolean; merged: number; error?: string }> {
  if (pullInFlight) return pullInFlight;
  pullInFlight = pullOnce().finally(() => {
    pullInFlight = null;
  });
  return pullInFlight;
}

async function pullOnce(): Promise<{ ok: boolean; merged: number; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, merged: 0, error: "not-logged-in" };
  emit("pulling");
  // 同步 key 很少，直接全量拉更可靠。之前用 since + 客户端 updated_at，
  // 设备时间或拉取顺序稍微错开，就可能永久跳过另一台设备刚上传的进度。
  const since = 0;
  try {
    const res = await fetch(`/api/sync?since=${since}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      // token 失效 → 退出
      await logout();
      return { ok: false, merged: 0, error: "session-expired" };
    }
    if (!res.ok) {
      emit("error", `pull ${res.status}`);
      return { ok: false, merged: 0, error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as { items: KvRow[]; serverTime: number };
    const meta = loadMeta();
    let merged = 0;
    for (const row of data.items) {
      if (!isSyncableKey(row.key)) continue;
      if (row.key === COURSE_PROGRESS_SYNC_KEY) {
        if (mergeCourseProgressRow(row, meta)) merged++;
        continue;
      }
      const localStamp = meta[row.key] || 0;
      if (row.updated_at > localStamp) {
        suppressOnce.add(row.key);
        window.localStorage.setItem(row.key, row.value);
        meta[row.key] = row.updated_at;
        merged++;
      }
    }
    saveMeta(meta);
    if (data.serverTime) {
      window.localStorage.setItem(SINCE_KEY, String(data.serverTime));
    }
    writeNumberKey(LAST_PULL_KEY, Date.now());
    emit("idle");
    dispatchDataEvents();
    return { ok: true, merged };
  } catch (e) {
    emit("error", (e as Error).message);
    return { ok: false, merged: 0, error: (e as Error).message };
  }
}

const STROKES_DRAFT_KEY = "thai-alphabet:strokes-draft:v1";

interface StrokeDraftValue {
  v?: number;
  strokes?: unknown;
  guides?: unknown;
  updated_at?: number;
}

/** 拉取云端所有笔画草稿，按 updated_at 合并到本地 strokes-draft localStorage。 */
export async function pullStrokes(): Promise<{ ok: boolean; merged: number; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, merged: 0, error: "not-logged-in" };
  try {
    const res = await fetch("/api/strokes", {
      headers: { authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      await logout();
      return { ok: false, merged: 0, error: "session-expired" };
    }
    if (!res.ok) return { ok: false, merged: 0, error: `HTTP ${res.status}` };
    const data = (await res.json()) as {
      items?: { item_key: string; value: string; updated_at: number }[];
    };
    const items = data.items ?? [];
    let local: Record<string, StrokeDraftValue> = {};
    try {
      local = JSON.parse(window.localStorage.getItem(STROKES_DRAFT_KEY) || "{}");
    } catch {
      local = {};
    }
    let merged = 0;
    for (const row of items) {
      try {
        const parsed = JSON.parse(row.value) as StrokeDraftValue;
        if (!parsed || typeof parsed !== "object") continue;
        const existing = local[row.item_key];
        const existingStamp = existing?.updated_at ?? 0;
        if (row.updated_at > existingStamp) {
          local[row.item_key] = { ...parsed, updated_at: row.updated_at };
          merged++;
        }
      } catch {
        // skip malformed rows
      }
    }
    if (merged > 0) {
      window.localStorage.setItem(STROKES_DRAFT_KEY, JSON.stringify(local));
      window.dispatchEvent(new Event("thai-alphabet:strokes"));
    }
    return { ok: true, merged };
  } catch (e) {
    return { ok: false, merged: 0, error: (e as Error).message };
  }
}

/**
 * 一次性清理：把本地和云端的旧 key 全部删掉。需登录态。
 * 用 localStorage flag 防止重复调用，所以本机只会跑一次。
 */
export async function cleanupLegacyKeys(): Promise<void> {
  if (typeof window === "undefined") return;
  if (!isLoggedIn()) return;
  try {
    if (window.localStorage.getItem(LEGACY_CLEANUP_FLAG)) return;
  } catch {
    return;
  }
  // 先尝试云端删；失败就先不设 flag，下次再试
  const res = await deleteRemoteKeys(LEGACY_REMOTE_KEYS);
  if (!res.ok) return;
  // 云端删除成功，再删本地（pull 不会再把它们带回来）
  for (const k of LEGACY_REMOTE_KEYS) {
    try {
      window.localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  }
  try {
    window.localStorage.setItem(LEGACY_CLEANUP_FLAG, "1");
  } catch {
    /* ignore */
  }
}

/** 在云端删除指定 key（用于清理废弃 key）。已登录时调用，失败静默。 */
export async function deleteRemoteKeys(keys: readonly string[]): Promise<{ ok: boolean; deleted: number }> {
  const token = getToken();
  if (!token) return { ok: false, deleted: 0 };
  if (keys.length === 0) return { ok: true, deleted: 0 };
  try {
    const res = await fetch("/api/sync", {
      method: "DELETE",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ keys }),
    });
    if (!res.ok) return { ok: false, deleted: 0 };
    const data = (await res.json()) as { deleted?: number };
    // 同步本地 meta，避免下次 push 把老 stamp 又带回去
    const meta = loadMeta();
    let dirty = false;
    for (const k of keys) {
      if (k in meta) {
        delete meta[k];
        dirty = true;
      }
    }
    if (dirty) saveMeta(meta);
    return { ok: true, deleted: data.deleted ?? 0 };
  } catch {
    return { ok: false, deleted: 0 };
  }
}

/** 把当前所有受跟踪 key 全量推送 */
export async function pushAll(): Promise<{ ok: boolean; pushed: number; error?: string }> {
  let token = getToken();
  if (!token) return { ok: false, pushed: 0, error: "not-logged-in" };
  const pulled = await pull();
  if (!pulled.ok) return { ok: false, pushed: 0, error: pulled.error || "pull-before-push-failed" };
  token = getToken();
  if (!token) return { ok: false, pushed: 0, error: "not-logged-in" };
  const items: KvRow[] = [];
  const meta = loadMeta();
  const now = Date.now();
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (!k) continue;
    if (SKIP_KEYS.has(k)) continue;
    if (!isSyncableKey(k)) continue;
    const v = window.localStorage.getItem(k);
    if (v === null) continue;
    const updated_at = meta[k] || now;
    items.push({ key: k, value: v, updated_at });
    if (!meta[k]) meta[k] = updated_at;
  }
  if (items.length === 0) return { ok: true, pushed: 0 };
  emit("pushing");
  try {
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });
    if (res.status === 401) {
      await logout();
      return { ok: false, pushed: 0, error: "session-expired" };
    }
    if (!res.ok) {
      emit("error", `push ${res.status}`);
      return { ok: false, pushed: 0, error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as { accepted?: number };
    saveMeta(meta);
    emit("idle");
    return { ok: true, pushed: data.accepted ?? items.length };
  } catch (e) {
    emit("error", (e as Error).message);
    return { ok: false, pushed: 0, error: (e as Error).message };
  }
}

// === 写入拦截：跟踪 + 防抖 push ===
const suppressOnce = new Set<string>();
const pending = new Map<string, KvRow>();
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function schedulePush() {
  if (!isLoggedIn()) return;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    if (pending.size === 0) return;
    const token = getToken();
    if (!token) {
      pending.clear();
      return;
    }
    const queued = Array.from(pending.values());
    pending.clear();
    const meta = loadMeta();
    const items = queued
      .map((row) => {
        const latestValue = window.localStorage.getItem(row.key);
        if (latestValue === null) return null;
        return {
          key: row.key,
          value: latestValue,
          updated_at: meta[row.key] || row.updated_at,
        };
      })
      .filter((row): row is KvRow => row !== null);
    if (items.length === 0) return;
    emit("pushing");
    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });
      if (res.status === 401) {
        await logout();
        return;
      }
      if (res.ok) emit("idle");
      else emit("error", `push ${res.status}`);
    } catch (e) {
      emit("error", (e as Error).message);
    }
  }, 1500);
}

let installed = false;
export function installSyncHook() {
  if (typeof window === "undefined" || installed) return;
  installed = true;
  const proto = Object.getPrototypeOf(window.localStorage) as Storage;
  const original = proto.setItem;
  proto.setItem = function (key: string, value: string) {
    original.call(this, key, value);
    if (suppressOnce.has(key)) {
      suppressOnce.delete(key);
      return;
    }
    if (SKIP_KEYS.has(key)) return;
    if (!isSyncableKey(key)) return;
    const meta = loadMeta();
    const now = Date.now();
    meta[key] = now;
    saveMeta(meta);
    pending.set(key, { key, value, updated_at: now });
    schedulePush();
  };
  emit(isLoggedIn() ? "idle" : "off");
}

let autoPullStarted = false;
let lastAutoPullAt = 0;

function maybeAutoPull(force = false) {
  if (!isLoggedIn()) return;
  if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
  const now = Date.now();
  const lastPullAt = Math.max(lastAutoPullAt, getLastPullAt());
  if (!force && now - lastPullAt < 25_000) return;
  lastAutoPullAt = now;
  pull().catch(() => {
    /* status is emitted by pull */
  });
}

export function startAutoPull() {
  if (typeof window === "undefined" || autoPullStarted) return;
  autoPullStarted = true;

  const onVisible = () => {
    if (document.visibilityState === "visible") maybeAutoPull(true);
  };
  const onFocus = () => maybeAutoPull(true);
  const onPageShow = () => maybeAutoPull(true);

  window.addEventListener("focus", onFocus);
  window.addEventListener("pageshow", onPageShow);
  document.addEventListener("visibilitychange", onVisible);
  setInterval(() => maybeAutoPull(false), 30_000);
  maybeAutoPull(true);
}
