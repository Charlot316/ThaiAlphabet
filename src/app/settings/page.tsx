"use client";
import { useEffect, useState } from "react";
import {
  SyncStatus,
  isLoggedIn,
  login,
  logout,
  pull,
  pushAll,
  subscribe,
} from "@/lib/sync";

export default function SettingsPage() {
  const [logged, setLogged] = useState(false);
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [tone, setTone] = useState<"ok" | "bad" | "info">("info");
  const [status, setStatus] = useState<SyncStatus>("off");

  useEffect(() => {
    setLogged(isLoggedIn());
    return subscribe((s) => setStatus(s));
  }, []);

  async function handleLogin() {
    if (!pw) return;
    setBusy(true);
    const r = await login(pw);
    if (r.ok) {
      setLogged(true);
      setMsg("登录成功，正在拉取云端数据...");
      setTone("ok");
      setPw("");
      const p = await pull();
      if (p.ok) {
        setMsg(`已合并 ${p.merged} 条云端数据`);
      } else {
        setMsg(`拉取失败：${p.error}`);
        setTone("bad");
      }
    } else {
      setMsg(`登录失败：${r.error}`);
      setTone("bad");
    }
    setBusy(false);
  }

  async function handleLogout() {
    logout();
    setLogged(false);
    setMsg("已退出登录（本地数据保留）");
    setTone("info");
  }

  async function handlePush() {
    setBusy(true);
    setMsg("正在推送...");
    setTone("info");
    const r = await pushAll();
    if (r.ok) {
      setMsg(`已推送 ${r.pushed} 条`);
      setTone("ok");
    } else {
      setMsg(`推送失败：${r.error}`);
      setTone("bad");
    }
    setBusy(false);
  }

  async function handlePull() {
    setBusy(true);
    setMsg("正在拉取...");
    setTone("info");
    const r = await pull();
    if (r.ok) {
      setMsg(`已合并 ${r.merged} 条`);
      setTone("ok");
    } else {
      setMsg(`拉取失败：${r.error}`);
      setTone("bad");
    }
    setBusy(false);
  }

  return (
    <div className="space-y-4">
      <section className="card-soft p-5">
        <h1 className="text-lg font-extrabold">⚙️ 同步设置</h1>
        <p className="mt-1 text-xs opacity-70">
          登录后学习进度会自动同步到 Cloudflare D1，多设备共用。
        </p>
      </section>

      {!logged ? (
        <section className="card-soft p-5 space-y-3">
          <div className="text-sm">
            用户：<b>charlot</b>
          </div>
          <input
            type="password"
            placeholder="输入同步密码"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            autoComplete="current-password"
            className="w-full rounded-2xl border-2 px-3 py-3 font-mono text-sm"
            style={{
              borderColor: "var(--duo-line)",
              background: "var(--duo-card)",
              color: "var(--duo-text)",
            }}
          />
          <button onClick={handleLogin} disabled={busy || !pw} className="btn-primary w-full">
            {busy ? "登录中..." : "登录并同步"}
          </button>
        </section>
      ) : (
        <section className="card-soft p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm">
                ✅ 已登录为 <b>charlot</b>
              </div>
              <div className="mt-1 text-xs opacity-70">
                状态：
                <span
                  style={{
                    color:
                      status === "error"
                        ? "var(--duo-red)"
                        : status === "idle"
                        ? "var(--duo-green)"
                        : "var(--duo-blue)",
                  }}
                >
                  {labelFor(status)}
                </span>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-ghost text-xs px-3 py-2">
              退出
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handlePull} disabled={busy} className="btn-blue">
              ⬇️ 拉取
            </button>
            <button onClick={handlePush} disabled={busy} className="btn-primary">
              ⬆️ 推送
            </button>
          </div>
          <p className="text-xs opacity-60">
            一般无需手动操作：写入会自动推送（防抖 1.5 秒），打开页面会自动拉取。
          </p>
        </section>
      )}

      {msg && (
        <div
          className={`feedback animate-pop ${
            tone === "ok" ? "feedback-ok" : tone === "bad" ? "feedback-bad" : ""
          }`}
          style={
            tone === "info"
              ? {
                  background: "rgba(28,176,246,0.1)",
                  color: "var(--duo-blue)",
                  border: "2px solid rgba(28,176,246,0.3)",
                }
              : undefined
          }
        >
          {msg}
        </div>
      )}

      <section className="card-soft p-4 text-xs opacity-80 leading-relaxed">
        <div className="font-extrabold mb-1">同步范围</div>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>课程熟练度（mastery）</li>
          <li>SRS 卡片状态</li>
          <li>连续学习天数</li>
          <li>课程历史 / Flashcard 顺序</li>
        </ul>
      </section>
    </div>
  );
}

function labelFor(s: SyncStatus): string {
  switch (s) {
    case "idle":
      return "已同步";
    case "pulling":
      return "拉取中…";
    case "pushing":
      return "推送中…";
    case "error":
      return "出错";
    default:
      return "未启用";
  }
}
