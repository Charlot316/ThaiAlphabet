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
        <div
          className="flex h-11 w-11 items-center justify-center rounded-lg"
          style={{
            background: "color-mix(in srgb, var(--duo-orange) 14%, transparent)",
            color: "var(--duo-orange)",
            border: "1px solid color-mix(in srgb, var(--duo-orange) 25%, transparent)",
          }}
        >
          <Flame size={21} strokeWidth={2.4} />
        </div>
        <div>
          <div
            className="text-2xl font-semibold leading-none"
            style={{ color: s.streak > 0 ? "var(--duo-orange)" : "var(--duo-muted)" }}
          >
            {s.streak}
          </div>
          <div className="mt-0.5 text-[11px] font-medium opacity-60">
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
