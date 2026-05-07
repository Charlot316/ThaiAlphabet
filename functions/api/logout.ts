import { Env, authUserId } from "./_lib";

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  if (!token) return Response.json({ ok: true });
  // 即使 token 过期我们也尝试删（用户已知是无效的）
  await env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
  // 路过一下 authUserId 仅用于触发过期清理
  await authUserId(request, env);
  return Response.json({ ok: true });
}
