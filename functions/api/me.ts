import { Env, authUserId } from "./_lib";

interface UserRow {
  username: string;
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const userId = await authUserId(request, env);
  if (!userId) return new Response("Unauthorized", { status: 401 });
  const row = await env.DB
    .prepare("SELECT username FROM users WHERE id = ?")
    .bind(userId)
    .first<UserRow>();
  if (!row) return new Response("Unauthorized", { status: 401 });
  return Response.json({ ok: true, username: row.username });
}
