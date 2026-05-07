import { Env, SESSION_TTL_MS, jsonError, newToken, verifyPassword } from "./_lib";

interface LoginBody {
  username?: string;
  password?: string;
}

interface UserRow {
  id: number;
  username: string;
  password_hash: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return jsonError(400, "bad-request");
  }
  const username = (body.username || "").trim().toLowerCase();
  const password = body.password || "";
  if (!username || !password) {
    return jsonError(400, "missing-credentials");
  }

  const row = await env.DB
    .prepare("SELECT id, username, password_hash FROM users WHERE username = ?")
    .bind(username)
    .first<UserRow>();
  if (!row) {
    return jsonError(401, "wrong-credentials");
  }
  const ok = await verifyPassword(password, row.password_hash);
  if (!ok) {
    return jsonError(401, "wrong-credentials");
  }

  // 生成 session token
  const token = newToken();
  const now = Date.now();
  await env.DB
    .prepare(
      "INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)"
    )
    .bind(token, row.id, now, now + SESSION_TTL_MS)
    .run();

  return Response.json({
    ok: true,
    token,
    username: row.username,
    expiresAt: now + SESSION_TTL_MS,
  });
}
