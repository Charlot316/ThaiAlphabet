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
    <div className="space-y-4">
      <section className="card-soft p-5 sm:p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-medium" style={{ color: "var(--duo-muted)" }}>
              Thai Alphabet
            </div>
            <h1 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
              学习泰语字母
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
              用小课程推进熟练度，再用配对、记忆、速看和拼读把字形固定下来。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs md:min-w-72">
            {[
              ["44", "辅音"],
              ["32", "元音"],
              ["4", "声调"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border p-3"
                style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}
              >
                <div className="text-lg font-semibold">{value}</div>
                <div className="mt-0.5" style={{ color: "var(--duo-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HeroStatusBar />

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODES.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={m.href}
              className="group block h-full rounded-lg border p-4 transition"
              style={{
                background: "var(--duo-card)",
                borderColor: m.primary ? "color-mix(in srgb, var(--duo-green) 28%, var(--duo-line))" : "var(--duo-line)",
                boxShadow: "var(--shadow-small)",
              }}
            >
              <div className="flex min-h-[8rem] flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                    style={{
                      background: m.primary ? "var(--surface-pressed)" : "var(--surface-subtle)",
                      borderColor: "var(--duo-line)",
                      color: m.primary ? "var(--duo-green-d)" : "var(--duo-muted)",
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
