"use client";
import { useEffect, useState } from "react";
import {
  cleanupLegacyKeys,
  installSyncHook,
  isLoggedIn,
  login,
  pull,
  pullStrokes,
  startAutoPull,
  subscribeAuth,
  validateSession,
} from "@/lib/sync";
import { installLocationChangeEvents } from "@/lib/routeEvents";
import { markCourseProgressReady } from "@/lib/courseProgressStore";

function shouldBypassAuthLocally() {
  if (process.env.NODE_ENV === "development") return true;
  if (typeof window === "undefined") return false;
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(() => shouldBypassAuthLocally());
  const [logged, setLogged] = useState(() => shouldBypassAuthLocally() || isLoggedIn());

  useEffect(() => {
    if (shouldBypassAuthLocally()) {
      installLocationChangeEvents();
      // No remote sync in bypass mode; trust local storage immediately so
      // pages don't sit on a loading skeleton.
      markCourseProgressReady();
      setLogged(true);
      setReady(true);
      return;
    }

    installSyncHook();
    installLocationChangeEvents();
    let alive = true;
    const sync = async () => {
      const v = isLoggedIn();
      if (!v) {
        if (!alive) return;
        setLogged(false);
        setReady(true);
        return;
      }

      if (alive) {
        setLogged(true);
        setReady(false);
      }

      const valid = await validateSession();
      if (!alive) return;
      if (!valid) {
        setLogged(false);
        setReady(true);
        return;
      }

      cleanupLegacyKeys().catch(() => {});
      await pull();
      if (!alive) return;
      pullStrokes();
      // Pull has merged remote into localStorage; course progress is now
      // trustworthy. Flip the store-level ready flag before unblocking
      // children so their first render sees `ready: true` and renders the
      // real lock state, not a placeholder.
      markCourseProgressReady();
      setLogged(isLoggedIn());
      setReady(true);
    };
    sync().finally(() => startAutoPull());
    const unsubscribe = subscribeAuth(() => {
      void sync();
    });
    return () => {
      alive = false;
      unsubscribe();
    };
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
    // 登录成功后 AuthGuard 会先拉取云端进度，再放出应用页面。
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
