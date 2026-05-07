interface Env {
  SYNC_PASSWORD: string;
}

interface LoginBody {
  password?: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  if (!env.SYNC_PASSWORD) {
    return Response.json(
      { ok: false, error: "server-misconfigured" },
      { status: 500 }
    );
  }
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return Response.json({ ok: false, error: "bad-request" }, { status: 400 });
  }
  if (typeof body.password !== "string" || !body.password) {
    return Response.json({ ok: false, error: "missing-password" }, { status: 400 });
  }
  // 常量时间比较
  const a = body.password;
  const b = env.SYNC_PASSWORD;
  let mismatch = a.length === b.length ? 0 : 1;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  if (mismatch !== 0) {
    return Response.json({ ok: false, error: "wrong-password" }, { status: 401 });
  }
  return Response.json({ ok: true, user: "charlot" });
}
