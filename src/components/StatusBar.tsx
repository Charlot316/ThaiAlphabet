"use client";
import { Flame } from "lucide-react";
import { useStats } from "@/lib/stats";

export default function StatusBar() {
  const s = useStats();
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="stat" title="连续学习天数">
        <Flame
          size={16}
          strokeWidth={2.3}
          aria-hidden
          style={{ color: s.streak > 0 ? "var(--duo-orange)" : "var(--duo-muted)" }}
        />
        <span style={{ color: s.streak > 0 ? "var(--duo-text)" : "var(--duo-muted)" }}>
          {s.streak}
        </span>
      </span>
    </div>
  );
}

export function HeroStatusBar() {
  const s = useStats();
  return (
    <div className="card-soft flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg border"
          style={{
            background: "color-mix(in srgb, var(--duo-orange) 12%, var(--duo-card))",
            color: s.streak > 0 ? "var(--duo-orange)" : "var(--duo-muted)",
            borderColor: "color-mix(in srgb, var(--duo-orange) 28%, var(--duo-line))",
          }}
        >
          <Flame size={19} strokeWidth={2.3} />
        </div>
        <div>
          <div
            className="text-xl font-semibold leading-none"
            style={{ color: s.streak > 0 ? "var(--duo-text)" : "var(--duo-muted)" }}
          >
            {s.streak}
          </div>
          <div className="mt-1 text-[11px] font-medium" style={{ color: "var(--duo-muted)" }}>
            连续学习
          </div>
        </div>
      </div>
      <div className="text-right text-xs" style={{ color: "var(--duo-muted)" }}>
        {s.lastActiveDay ? `上次 ${s.lastActiveDay}` : "今天来打个卡吧"}
      </div>
    </div>
  );
}
