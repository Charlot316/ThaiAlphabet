"use client";

// 客户端 ↔ Cloudflare D1 同步层
// - 登录后服务端发 token，存 localStorage
// - 监听 thai-alphabet:* localStorage 写入，防抖批量推送
// - 启动时拉取服务端 → 与本地按 updated_at 合并

const TOKEN_KEY = "thai-alphabet:sync:token";
const USER_KEY = "thai-alphabet:sync:user";
const SINCE_KEY = "thai-alphabet:sync:since";        // 上次拉取的服务端时间
const META_KEY = "thai-alphabet:sync:meta";          // {key: updated_at}
const PREFIX = "thai-alphabet:";

// 这些 key 才参与同步
const SYNC_KEYS = new Set<string>([
  "thai-alphabet:course-progress:v1",       // mastery
  "thai-alphabet:srs:v1",                   // srs deck
  "thai-alphabet:stats:v1",                 // streak
  "thai-alphabet:last-lesson:v1",           // course last lesson
  "thai-alphabet:flashcards-last-order:v1:consonant",
  "thai-alphabet:flashcards-last-order:v1:vowel",
  "thai-alphabet:flashcards-last-order:v1:both",
]);

const SKIP_KEYS = new Set<string>([TOKEN_KEY, USER_KEY, SINCE_KEY, META_KEY]);

interface KvRow {
  key: string;
  value: string;
  updated_at: number;
}

export type SyncStatus = "off" | "idle" | "pulling" | "pushing" | "error";

const listeners = new Set<(status: SyncStatus, msg?: string) => void>();
let currentStatus: SyncStatus = "off";
let currentMsg = "";

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

/** 拉取服务端变更，应用到本地（按 updated_at 比较） */
export async function pull(): Promise<{ ok: boolean; merged: number; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, merged: 0, error: "not-logged-in" };
  emit("pulling");
  const since = Number(window.localStorage.getItem(SINCE_KEY) || "0") || 0;
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
    emit("idle");
    window.dispatchEvent(new Event("thai-alphabet:mastery"));
    window.dispatchEvent(new Event("thai-alphabet:stats"));
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

/** 把当前所有受跟踪 key 全量推送 */
export async function pushAll(): Promise<{ ok: boolean; pushed: number; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, pushed: 0, error: "not-logged-in" };
  const items: KvRow[] = [];
  const meta = loadMeta();
  const now = Date.now();
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (!k || !k.startsWith(PREFIX)) continue;
    if (SKIP_KEYS.has(k)) continue;
    if (!SYNC_KEYS.has(k)) continue;
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
    const items = Array.from(pending.values());
    pending.clear();
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
    if (!key.startsWith(PREFIX)) return;
    if (SKIP_KEYS.has(key)) return;
    if (!SYNC_KEYS.has(key)) return;
    const meta = loadMeta();
    const now = Date.now();
    meta[key] = now;
    saveMeta(meta);
    pending.set(key, { key, value, updated_at: now });
    schedulePush();
  };
  emit(isLoggedIn() ? "idle" : "off");
}
