import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Brain,
  Gamepad2,
  Keyboard,
  LibraryBig,
  Repeat2,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { HeroStatusBar } from "@/components/StatusBar";

interface ModeCard {
  href: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  tone: "green" | "blue" | "purple" | "orange" | "yellow";
  preview: string;
}

const MODES: ModeCard[] = [
  { href: "/course", icon: Target, title: "小课程", desc: "看、听、写、配对混合练习", tone: "green", preview: "ก ข ค ง" },
  { href: "/endless-match", icon: Gamepad2, title: "无尽配对", desc: "字母和罗马音快速建立连接", tone: "orange", preview: "streak" },
  { href: "/srs", icon: Brain, title: "记忆模式", desc: "不偷看，确认答案后再前进", tone: "purple", preview: "1 → 5 → 25 m" },
  { href: "/flashcards", icon: Zap, title: "Flashcard 速看", desc: "随机洗牌，直接扫答案", tone: "blue", preview: "ABC" },
  { href: "/overview", icon: LibraryBig, title: "字母总览", desc: "辅音、元音、声调和熟练度", tone: "yellow", preview: "ก…ฮ" },
  { href: "/spell", icon: Keyboard, title: "拼读输入", desc: "音节解析和声调推导", tone: "green", preview: "กา → kaa" },
];

const TONE_MAP: Record<ModeCard["tone"], { accent: string; tint: string }> = {
  green: { accent: "var(--duo-green)", tint: "color-mix(in srgb, var(--duo-green) 12%, transparent)" },
  blue: { accent: "var(--duo-blue)", tint: "color-mix(in srgb, var(--duo-blue) 12%, transparent)" },
  purple: { accent: "var(--duo-purple)", tint: "color-mix(in srgb, var(--duo-purple) 12%, transparent)" },
  orange: { accent: "var(--duo-orange)", tint: "color-mix(in srgb, var(--duo-orange) 12%, transparent)" },
  yellow: { accent: "var(--duo-yellow)", tint: "color-mix(in srgb, var(--duo-yellow) 14%, transparent)" },
};

export default function Home() {
  return (
    <div className="space-y-4">
      <section className="card-soft overflow-hidden p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="thai-big flex h-14 w-14 items-center justify-center rounded-lg text-2xl font-semibold"
              style={{
                background: "color-mix(in srgb, var(--duo-green) 14%, transparent)",
                color: "var(--duo-green)",
                border: "1px solid color-mix(in srgb, var(--duo-green) 26%, transparent)",
              }}
            >
              ไทย
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: "var(--duo-green)" }}>
                <Sparkles size={14} strokeWidth={2.3} />
                Thai Alphabet Studio
              </div>
              <h1 className="mt-1 text-2xl font-semibold leading-tight">学习泰语字母</h1>
              <p className="mt-1 text-sm" style={{ color: "var(--duo-muted)" }}>
                辅音、元音、声调和拼读，按熟练度一点点推进。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:min-w-64">
            {[
              ["44", "辅音"],
              ["32", "元音"],
              ["4", "声调"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border p-3" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
                <div className="text-lg font-semibold">{value}</div>
                <div className="mt-0.5" style={{ color: "var(--duo-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HeroStatusBar />

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODES.map((m) => {
          const c = TONE_MAP[m.tone];
          const Icon = m.icon;
          return (
            <li key={m.href}>
              <Link
                href={m.href}
                className="group block h-full rounded-lg border p-4 transition hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, var(--duo-card), ${c.tint})`,
                  borderColor: "var(--duo-line)",
                  boxShadow: "var(--shadow-small)",
                }}
              >
                <div className="flex min-h-[8rem] flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        background: c.tint,
                        color: c.accent,
                        border: `1px solid color-mix(in srgb, ${c.accent} 28%, transparent)`,
                      }}
                    >
                      <Icon size={20} strokeWidth={2.2} />
                    </div>
                    <ArrowUpRight
                      className="opacity-35 transition group-hover:opacity-80"
                      size={18}
                      strokeWidth={2.2}
                    />
                  </div>

                  <div>
                    <div className="text-base font-semibold leading-tight">{m.title}</div>
                    <div className="mt-1 text-sm leading-snug" style={{ color: "var(--duo-muted)" }}>
                      {m.desc}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Repeat2 size={14} strokeWidth={2.2} style={{ color: c.accent }} />
                    <span className="thai-big truncate text-sm font-semibold" style={{ color: c.accent }}>
                      {m.preview}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
