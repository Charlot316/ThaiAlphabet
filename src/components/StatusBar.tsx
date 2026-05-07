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
      <span className="stat" title="经验值">
        <span aria-hidden>💎</span>
        <span style={{ color: "var(--duo-blue)" }}>{s.xp}</span>
      </span>
      <span className="stat" title={`生命值 ${s.hearts}/${s.heartsMax}`}>
        <span aria-hidden>{s.hearts > 0 ? "❤️" : "💔"}</span>
        <span style={{ color: s.hearts > 0 ? "var(--duo-red)" : "var(--duo-muted)" }}>
          {s.hearts}
        </span>
      </span>
    </div>
  );
}

export function HeroStatusBar() {
  const s = useStats();
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="card-soft flex flex-col items-center py-3">
        <div className="text-2xl">🔥</div>
        <div className="text-xl font-extrabold" style={{ color: s.streak > 0 ? "var(--duo-orange)" : "var(--duo-muted)" }}>
          {s.streak}
        </div>
        <div className="text-[10px] uppercase tracking-wider opacity-60">连胜</div>
      </div>
      <div className="card-soft flex flex-col items-center py-3">
        <div className="text-2xl">💎</div>
        <div className="text-xl font-extrabold" style={{ color: "var(--duo-blue)" }}>{s.xp}</div>
        <div className="text-[10px] uppercase tracking-wider opacity-60">经验</div>
      </div>
      <div className="card-soft flex flex-col items-center py-3">
        <div className="text-2xl">{s.hearts > 0 ? "❤️" : "💔"}</div>
        <div className="text-xl font-extrabold" style={{ color: s.hearts > 0 ? "var(--duo-red)" : "var(--duo-muted)" }}>
          {s.hearts}/{s.heartsMax}
        </div>
        <div className="text-[10px] uppercase tracking-wider opacity-60">生命</div>
      </div>
    </div>
  );
}
