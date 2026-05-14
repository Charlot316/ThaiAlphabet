import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Brain,
  Gamepad2,
  Keyboard,
  LibraryBig,
  Target,
  Zap,
} from "lucide-react";
import { HeroStatusBar } from "@/components/StatusBar";

interface ModeCard {
  href: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  preview: string;
  primary?: boolean;
}

const MODES: ModeCard[] = [
  { href: "/course", icon: Target, title: "小课程", desc: "看、听、写、配对混合练习", preview: "ก ข ค ง", primary: true },
  { href: "/endless-match", icon: Gamepad2, title: "无尽配对", desc: "字母和罗马音快速建立连接", preview: "kh ↔ ข" },
  { href: "/srs", icon: Brain, title: "记忆模式", desc: "不偷看，确认答案后再前进", preview: "1 → 5 → 25 m" },
  { href: "/flashcards", icon: Zap, title: "Flashcard 速看", desc: "随机洗牌，直接扫答案", preview: "random" },
  { href: "/overview", icon: LibraryBig, title: "字母总览", desc: "辅音、元音、声调和熟练度", preview: "ก…ฮ" },
  { href: "/spell", icon: Keyboard, title: "拼读输入", desc: "音节解析和声调推导", preview: "กา → kaa" },
];

export default function Home() {
  return (
    <div className="space-y-5">
      <section
        className="card-soft relative overflow-hidden p-6 sm:p-7"
        style={{
          background:
            "radial-gradient(circle at 78% 30%, rgba(40, 215, 244, 0.18), transparent 16rem), linear-gradient(135deg, rgba(13, 49, 66, 0.72), rgba(6, 20, 28, 0.96) 58%)",
          borderColor: "rgba(130, 220, 245, 0.24)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-10 bottom-0 hidden h-44 w-48 opacity-25 sm:block"
          aria-hidden
          style={{
            background:
              "linear-gradient(135deg, transparent 47%, rgba(40, 215, 244, 0.45) 48%, transparent 51%), radial-gradient(ellipse at 50% 100%, transparent 35%, rgba(40, 215, 244, 0.26) 36%, transparent 38%)",
            clipPath: "polygon(50% 0, 60% 18%, 60% 35%, 72% 35%, 72% 100%, 20% 100%, 20% 45%, 34% 45%, 34% 20%)",
          }}
        />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="relative z-10">
            <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
              Thai Alphabet
            </div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              学习泰语字母
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6" style={{ color: "color-mix(in srgb, var(--duo-text) 72%, var(--duo-muted))" }}>
              从字母开始，掌握发音、书写和拼读，把泰语字形固定下来。
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-xs md:min-w-72">
            {[
              ["44", "辅音"],
              ["32", "元音"],
              ["5", "声调"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border p-3"
                style={{
                  borderColor: "rgba(130, 220, 245, 0.18)",
                  background: "rgba(6, 20, 28, 0.58)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.045) inset",
                }}
              >
                <div className="text-xl font-semibold">{value}</div>
                <div className="mt-0.5" style={{ color: label === "元音" ? "var(--duo-green-d)" : "var(--duo-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HeroStatusBar />

      <div className="text-sm font-semibold" style={{ color: "var(--duo-text)" }}>选择学习模式</div>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODES.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={m.href}
              className="group block h-full rounded-lg border p-4 transition hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008)), var(--duo-card)",
                borderColor: m.primary ? "color-mix(in srgb, var(--duo-green) 42%, var(--duo-line))" : "var(--duo-line)",
                boxShadow: m.primary ? "var(--shadow-cyan)" : "var(--shadow-small)",
              }}
            >
              <div className="flex min-h-[9.25rem] flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                    style={{
                      background: m.primary ? "rgba(40, 215, 244, 0.13)" : "var(--surface-subtle)",
                      borderColor: m.primary ? "rgba(40, 215, 244, 0.28)" : "var(--duo-line)",
                      color: m.primary ? "var(--duo-green-d)" : "var(--duo-blue-d)",
                    }}
                  >
                    <Icon size={19} strokeWidth={2.1} />
                  </div>
                  <ArrowUpRight
                    className="opacity-35 transition group-hover:opacity-70"
                    size={17}
                    strokeWidth={2.1}
                    style={{ color: "var(--duo-muted)" }}
                  />
                </div>

                <div>
                  <div className="text-base font-semibold leading-tight">{m.title}</div>
                  <div className="mt-1 text-sm leading-snug" style={{ color: "var(--duo-muted)" }}>
                    {m.desc}
                  </div>
                </div>

                <div>
                  <span
                    className="thai-big inline-flex max-w-full rounded-md border px-2 py-1 text-xs font-semibold"
                    style={{
                      background: "var(--surface-subtle)",
                      borderColor: "var(--duo-line)",
                      color: m.primary ? "var(--duo-green-d)" : "var(--duo-muted)",
                    }}
                  >
                    {m.preview}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
