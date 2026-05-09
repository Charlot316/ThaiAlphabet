import { Env, authUserId, jsonError } from "./_lib";

interface KvRow {
  key: string;
  value: string;
  updated_at: number;
}
interface PostBody {
  items?: KvRow[];
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const userId = await authUserId(request, env);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const url = new URL(request.url);
  const since = Number(url.searchParams.get("since") || "0") || 0;
  const result = await env.DB
    .prepare(
      "SELECT key, value, updated_at FROM kv WHERE user_id = ? AND updated_at > ? ORDER BY updated_at"
    )
    .bind(userId, since)
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
  const userId = await authUserId(request, env);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return jsonError(400, "bad-request");
  }
  if (!body.items || !Array.isArray(body.items)) {
    return jsonError(400, "bad-request");
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
  const stmt = env.DB.prepare(
    `INSERT INTO kv (user_id, key, value, updated_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, key) DO UPDATE SET
       value = excluded.value,
       updated_at = excluded.updated_at
     WHERE excluded.updated_at > kv.updated_at`
  );
  const batch = valid.map((it) =>
    stmt.bind(userId, it.key, it.value, it.updated_at)
  );
  await env.DB.batch(batch);
  return Response.json({
    ok: true,
    accepted: valid.length,
    serverTime: Date.now(),
  });
}

interface DeleteBody {
  keys?: string[];
}

export async function onRequestDelete(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const userId = await authUserId(request, env);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  let body: DeleteBody;
  try {
    body = (await request.json()) as DeleteBody;
  } catch {
    return jsonError(400, "bad-request");
  }
  const keys = (body.keys || []).filter(
    (k) => typeof k === "string" && k.length > 0 && k.length < 256
  );
  if (keys.length === 0) {
    return Response.json({ ok: true, deleted: 0 });
  }
  const stmt = env.DB.prepare("DELETE FROM kv WHERE user_id = ? AND key = ?");
  const batch = keys.map((k) => stmt.bind(userId, k));
  const results = await env.DB.batch(batch);
  let deleted = 0;
  for (const r of results) {
    const meta = (r as unknown as { meta?: { changes?: number } }).meta;
    deleted += meta?.changes ?? 0;
  }
  return Response.json({ ok: true, deleted });
}
