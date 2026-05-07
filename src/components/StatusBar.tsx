"use client";
import { useStats } from "@/lib/stats";

export default function StatusBar() {
  const s = useStats();
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="stat" title="连续学习天数">
        <span aria-hidden>🔥</span>
        <span style={{ color: s.streak > 0 ? "var(--duo-orange)" : "var(--duo-muted)" }}>
          {s.streak}
        </span>
      </span>
    </div>
  );
}

export function HeroStatusBar() {
  const s = useStats();
  return (
    <div className="card-soft flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="text-3xl">🔥</div>
        <div>
          <div
            className="text-2xl font-extrabold leading-none"
            style={{ color: s.streak > 0 ? "var(--duo-orange)" : "var(--duo-muted)" }}
          >
            {s.streak}
          </div>
          <div className="mt-0.5 text-[11px] uppercase tracking-wider opacity-60">
            连续学习
          </div>
        </div>
      </div>
      <div className="text-right text-xs opacity-60">
        {s.lastActiveDay ? `上次 ${s.lastActiveDay}` : "今天来打个卡吧"}
      </div>
    </div>
  );
}
