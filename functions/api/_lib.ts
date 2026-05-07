// 共享：D1 类型 + 密码哈希 / token / 鉴权

export interface D1PreparedStatement {
  bind: (...values: unknown[]) => D1PreparedStatement;
  first: <T = unknown>() => Promise<T | null>;
  all: <T = unknown>() => Promise<{ results: T[] }>;
  run: () => Promise<unknown>;
}
export interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
  batch: (statements: D1PreparedStatement[]) => Promise<unknown[]>;
}

export interface Env {
  DB: D1Database;
}

export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 天

// === Base64 helpers (Workers 没有 Buffer) ===
export function bytesToB64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}
export function b64ToBytes(b64: string): Uint8Array {
  const s = atob(b64);
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
  return bytes;
}

// === PBKDF2 验证 ===
// stored 格式：pbkdf2-sha256$iterations$salt_b64$hash_b64
export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2-sha256") return false;
  const iterations = Number(parts[1]);
  if (!Number.isFinite(iterations) || iterations < 1000) return false;
  const salt = b64ToBytes(parts[2]);
  const expected = b64ToBytes(parts[3]);

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const derived = new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
      keyMaterial,
      expected.length * 8
    )
  );
  if (derived.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < derived.length; i++) {
    mismatch |= derived[i] ^ expected[i];
  }
  return mismatch === 0;
}

export function newToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToB64(bytes).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

interface SessionRow {
  user_id: number;
  expires_at: number;
}

/** 验证 Authorization header，返回 user_id 或 null */
export async function authUserId(
  request: Request,
  env: Env
): Promise<number | null> {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const row = await env.DB
    .prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?")
    .bind(token)
    .first<SessionRow>();
  if (!row) return null;
  if (row.expires_at < Date.now()) {
    // 过期顺手清掉
    await env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
    return null;
  }
  return row.user_id;
}

export function jsonError(status: number, error: string): Response {
  return Response.json({ ok: false, error }, { status });
}
