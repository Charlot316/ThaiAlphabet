"use client";
import { useEffect, useState } from "react";
import {
  cleanupLegacyKeys,
  installSyncHook,
  isLoggedIn,
  login,
  pull,
  pullStrokes,
  subscribeAuth,
} from "@/lib/sync";

function shouldBypassAuthLocally() {
  if (process.env.NODE_ENV === "development") return true;
  if (typeof window === "undefined") return false;
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (shouldBypassAuthLocally()) {
      setLogged(true);
      setReady(true);
      return;
    }

    installSyncHook();
    const sync = () => {
      const v = isLoggedIn();
      setLogged(v);
      if (v) {
        // 先一次性清理废弃 key，再 pull，避免被云端的旧数据反向覆盖
        cleanupLegacyKeys()
          .catch(() => {})
          .finally(() => {
            pull();
            pullStrokes();
          });
      }
    };
    sync();
    setReady(true);
    return subscribeAuth(sync);
  }, []);

  if (!ready) {
    // 避免 SSR 闪烁：客户端 hydrate 完前先空着
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm opacity-60">
        加载中…
      </div>
    );
  }

  if (!logged) return <LoginScreen />;

  return <>{children}</>;
}

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault();
    if (!username || !password) return;
    setBusy(true);
    setErr("");
    const r = await login(username.trim().toLowerCase(), password);
    if (!r.ok) {
      setErr(errorMsg(r.error || ""));
      setBusy(false);
      return;
    }
    // 登录成功后，AuthGuard 会通过 subscribeAuth 收到事件并切换 UI；这里再触发一次清理 + pull
    await cleanupLegacyKeys();
    await pull();
    pullStrokes();
    setBusy(false);
  }

  return (
    <main className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center px-4">
      <div className="card-soft w-full p-6">
        <div className="flex flex-col items-center">
          <div
            className="thai-big flex h-16 w-16 items-center justify-center rounded-lg text-3xl font-semibold"
            style={{
              background: "color-mix(in srgb, var(--duo-green) 14%, transparent)",
              border: "1px solid color-mix(in srgb, var(--duo-green) 26%, transparent)",
              color: "var(--duo-green)",
            }}
          >
            ไทย
          </div>
          <h1 className="mt-4 text-xl font-semibold">学习泰语字母</h1>
          <p className="mt-1 text-xs opacity-70">登录以开始学习并跨设备同步进度</p>
        </div>
        <form onSubmit={handleLogin} className="mt-5 space-y-3">
          <div>
            <label className="text-[11px] font-medium opacity-60">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className="mt-1 w-full rounded-lg border px-3 py-3 text-sm font-medium outline-none transition focus:border-[var(--duo-green)]"
              style={{
                borderColor: "var(--duo-line)",
                background: "var(--duo-card)",
                color: "var(--duo-text)",
              }}
            />
          </div>
          <div>
            <label className="text-[11px] font-medium opacity-60">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border px-3 py-3 font-mono text-sm outline-none transition focus:border-[var(--duo-green)]"
              style={{
                borderColor: "var(--duo-line)",
                background: "var(--duo-card)",
                color: "var(--duo-text)",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={busy || !username || !password}
            className="btn-primary w-full"
          >
            {busy ? "登录中…" : "登录"}
          </button>
        </form>
        {err && (
          <div className="feedback feedback-bad animate-pop mt-4 text-sm">
            {err}
          </div>
        )}
        <p className="mt-4 text-center text-[11px] opacity-50">
          仅授权用户可登录
        </p>
      </div>
    </main>
  );
}

function errorMsg(code: string): string {
  switch (code) {
    case "wrong-credentials":
      return "用户名或密码错误";
    case "missing-credentials":
      return "请输入用户名和密码";
    case "bad-request":
      return "请求格式错误";
    default:
      return code || "登录失败";
  }
}
