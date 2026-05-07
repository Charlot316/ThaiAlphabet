"use client";
import { useEffect, useState } from "react";
import {
  SyncStatus,
  getUsername,
  logout,
  pull,
  pushAll,
  subscribe,
} from "@/lib/sync";

export default function SettingsPage() {
  const [user, setUser] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [tone, setTone] = useState<"ok" | "bad" | "info">("info");
  const [status, setStatus] = useState<SyncStatus>("off");

  useEffect(() => {
    setUser(getUsername());
    return subscribe((s) => setStatus(s));
  }, []);

  async function handlePush() {
    setBusy(true); setMsg("正在推送..."); setTone("info");
    const r = await pushAll();
    setMsg(r.ok ? `已推送 ${r.pushed} 条` : `推送失败：${r.error}`);
    setTone(r.ok ? "ok" : "bad");
    setBusy(false);
  }

  async function handlePull() {
    setBusy(true); setMsg("正在拉取..."); setTone("info");
    const r = await pull();
    setMsg(r.ok ? `已合并 ${r.merged} 条` : `拉取失败：${r.error}`);
    setTone(r.ok ? "ok" : "bad");
    setBusy(false);
  }

  async function handleLogout() {
    await logout();
    // AuthGuard 会自动切到登录屏
  }

  return (
    <div className="space-y-4">
      <section className="card-soft p-5">
        <h1 className="text-lg font-extrabold">⚙️ 同步设置</h1>
        <p className="mt-1 text-xs opacity-70">
          学习数据自动同步到 Cloudflare D1，多设备共用。
        </p>
      </section>

      <section className="card-soft p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm">
              当前用户：<b>{user || "—"}</b>
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
          <button onClick={handleLogout} className="btn-red px-4 py-2 text-xs">
            退出登录
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

      <section className="card-soft p-4 text-xs leading-relaxed opacity-80">
        <div className="mb-1 font-extrabold">同步范围</div>
        <ul className="list-disc space-y-0.5 pl-4">
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
