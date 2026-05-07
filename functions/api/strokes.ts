import { Env, authUserId, jsonError } from "./_lib";

interface StrokeDraftRow {
  item_key: string;
  value: string;
  updated_at: number;
}

interface PostBody {
  key?: string;
  value?: string;
  updated_at?: number;
}

async function ensureTable(env: Env) {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS stroke_drafts (
      user_id INTEGER NOT NULL,
      item_key TEXT NOT NULL,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (user_id, item_key)
    )`
  ).run();
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const userId = await authUserId(request, env);
  if (!userId) return new Response("Unauthorized", { status: 401 });
  await ensureTable(env);

  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (key) {
    const row = await env.DB
      .prepare("SELECT item_key, value, updated_at FROM stroke_drafts WHERE user_id = ? AND item_key = ?")
      .bind(userId, key)
      .first<StrokeDraftRow>();
    return Response.json({ ok: true, item: row ?? null, serverTime: Date.now() });
  }

  const result = await env.DB
    .prepare("SELECT item_key, value, updated_at FROM stroke_drafts WHERE user_id = ? ORDER BY item_key")
    .bind(userId)
    .all<StrokeDraftRow>();
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
  const userId = await authUserId(request, env);
  if (!userId) return new Response("Unauthorized", { status: 401 });
  await ensureTable(env);

  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return jsonError(400, "bad-request");
  }

  const key = body.key || "";
  const value = body.value || "";
  const updatedAt = body.updated_at || Date.now();
  if (
    typeof key !== "string" ||
    key.length === 0 ||
    key.length > 128 ||
    typeof value !== "string" ||
    value.length > 1024 * 1024 ||
    !Number.isFinite(updatedAt)
  ) {
    return jsonError(400, "bad-request");
  }

  await env.DB
    .prepare(
      `INSERT INTO stroke_drafts (user_id, item_key, value, updated_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(user_id, item_key) DO UPDATE SET
         value = excluded.value,
         updated_at = excluded.updated_at
       WHERE excluded.updated_at >= stroke_drafts.updated_at`
    )
    .bind(userId, key, value, updatedAt)
    .run();

  return Response.json({ ok: true, serverTime: Date.now() });
}
