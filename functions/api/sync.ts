// 同步 API：GET 拉取（可带 since），POST 上传（last-write-wins）
// 单用户：固定 user = "charlot"

interface D1PreparedStatement {
  bind: (...values: unknown[]) => D1PreparedStatement;
  all: <T = unknown>() => Promise<{ results: T[] }>;
  run: () => Promise<unknown>;
}
interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
  batch: (statements: D1PreparedStatement[]) => Promise<unknown[]>;
}

interface Env {
  DB: D1Database;
  SYNC_PASSWORD: string;
}

interface KvRow {
  key: string;
  value: string;
  updated_at: number;
}

interface PostBody {
  items?: KvRow[];
}

const USER = "charlot";

function authorized(request: Request, env: Env): boolean {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  if (!token || !env.SYNC_PASSWORD) return false;
  if (token.length !== env.SYNC_PASSWORD.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ env.SYNC_PASSWORD.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  if (!authorized(request, env)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const url = new URL(request.url);
  const since = Number(url.searchParams.get("since") || "0") || 0;
  const result = await env.DB
    .prepare(
      "SELECT key, value, updated_at FROM kv WHERE user = ? AND updated_at > ? ORDER BY updated_at"
    )
    .bind(USER, since)
    .all<KvRow>();
  return Response.json({
    ok: true,
    items: result.results || [],
    serverTime: Date.now(),
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  if (!authorized(request, env)) {
    return new Response("Unauthorized", { status: 401 });
  }
  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  if (!body.items || !Array.isArray(body.items)) {
    return new Response("Bad request", { status: 400 });
  }
  const valid = body.items.filter(
    (it) =>
      it &&
      typeof it.key === "string" &&
      it.key.length > 0 &&
      it.key.length < 256 &&
      typeof it.value === "string" &&
      it.value.length < 256 * 1024 &&
      typeof it.updated_at === "number" &&
      Number.isFinite(it.updated_at)
  );
  if (valid.length === 0) {
    return Response.json({ ok: true, accepted: 0, serverTime: Date.now() });
  }
  // last-write-wins upsert
  const stmt = env.DB.prepare(
    `INSERT INTO kv (user, key, value, updated_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(user, key) DO UPDATE SET
       value = excluded.value,
       updated_at = excluded.updated_at
     WHERE excluded.updated_at > kv.updated_at`
  );
  const batch = valid.map((it) =>
    stmt.bind(USER, it.key, it.value, it.updated_at)
  );
  await env.DB.batch(batch);
  return Response.json({
    ok: true,
    accepted: valid.length,
    serverTime: Date.now(),
  });
}
