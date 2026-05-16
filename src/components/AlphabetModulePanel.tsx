"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  FileCheck2,
  Gamepad2,
  Keyboard,
  LibraryBig,
  Target,
  Zap,
} from "lucide-react";
import { ALPHABET_FINAL_EXAM_POLICY, type AlphabetFinalExamResult } from "@/lib/moduleProgress";

interface ModeCard {
  href: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  preview: string;
  tone?: "primary" | "blue" | "orange" | "purple";
}

const ALPHABET_MODES: ModeCard[] = [
  { href: "/course", icon: Target, title: "字母小课程", desc: "按顺序学辅音、元音、拼读", preview: "ก ข ค ง", tone: "primary" },
  { href: "/overview", icon: LibraryBig, title: "字母总览", desc: "浏览字形、读音和熟练度", preview: "ก…ฮ", tone: "blue" },
  { href: "/endless-match", icon: Gamepad2, title: "无尽配对", desc: "字母和罗马音快速建立连接", preview: "kh ↔ ข", tone: "orange" },
  { href: "/srs", icon: Brain, title: "记忆模式", desc: "确认答案后再记录熟练度", preview: "SRS", tone: "purple" },
  { href: "/flashcards", icon: Zap, title: "闪卡速看", desc: "随机速看，自动朗读", preview: "随机", tone: "blue" },
  { href: "/spell", icon: Keyboard, title: "拼读输入", desc: "音节解析和声调推导", preview: "กา → kaa", tone: "primary" },
  {
    href: ALPHABET_FINAL_EXAM_POLICY.route,
    icon: FileCheck2,
    title: "字母期末",
    desc: `${ALPHABET_FINAL_EXAM_POLICY.matchedTarget} 配对 · ≤${ALPHABET_FINAL_EXAM_POLICY.maxMisses} 失误 · ${ALPHABET_FINAL_EXAM_POLICY.streakTarget} 连击`,
    preview: "期末",
    tone: "orange",
  },
];

function toneVars(tone: ModeCard["tone"]) {
  if (tone === "orange") {
    return {
      color: "var(--duo-orange-d)",
      border: "color-mix(in srgb, var(--duo-orange) 28%, var(--duo-line))",
      bg: "color-mix(in srgb, var(--duo-orange) 10%, var(--duo-card))",
    };
  }
  if (tone === "purple") {
    return {
      color: "var(--duo-purple-d)",
      border: "color-mix(in srgb, var(--duo-purple) 24%, var(--duo-line))",
      bg: "color-mix(in srgb, var(--duo-purple) 9%, var(--duo-card))",
    };
  }
  if (tone === "blue") {
    return {
      color: "var(--duo-blue-d)",
      border: "color-mix(in srgb, var(--duo-blue) 26%, var(--duo-line))",
      bg: "color-mix(in srgb, var(--duo-blue) 9%, var(--duo-card))",
    };
  }
  return {
    color: "var(--duo-green-d)",
    border: "color-mix(in srgb, var(--duo-green) 34%, var(--duo-line))",
    bg: "color-mix(in srgb, var(--duo-green) 10%, var(--duo-card))",
  };
}

export default function AlphabetModulePanel({
  examResult,
  showHeader = true,
}: {
  examResult?: AlphabetFinalExamResult | null;
  showHeader?: boolean;
}) {
  return (
    <section className="space-y-3">
      {showHeader && (
        <div className="card-soft p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div
                className="thai-big flex h-12 w-12 items-center justify-center rounded-lg border text-2xl font-semibold"
                style={{
                  background: "var(--surface-subtle)",
                  borderColor: "var(--duo-line)",
                  color: "var(--duo-green-d)",
                }}
              >
                ก
              </div>
              <div>
                <div className="text-lg font-semibold">字母</div>
                <div className="text-sm" style={{ color: "var(--duo-muted)" }}>
                  字母、元音、声调、拼读和书写
                </div>
              </div>
            </div>
            <div
              className="inline-flex items-center gap-2 self-start rounded-lg border px-3 py-2 text-xs font-semibold sm:self-auto"
              style={{
                background: examResult ? "color-mix(in srgb, var(--duo-green) 12%, var(--duo-card))" : "var(--surface-subtle)",
                borderColor: examResult ? "color-mix(in srgb, var(--duo-green) 32%, var(--duo-line))" : "var(--duo-line)",
                color: examResult ? "var(--duo-green-d)" : "var(--duo-muted)",
              }}
            >
              <CheckCircle2 size={15} strokeWidth={2.2} />
              {examResult ? "期末已通过" : "默认学习模块"}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ALPHABET_MODES.map((mode) => {
          const Icon = mode.icon;
          const tone = toneVars(mode.tone);
          return (
            <Link
              key={mode.href}
              href={mode.href}
              className="group block h-full rounded-lg border p-4 transition hover:-translate-y-0.5"
              style={{
                background: "var(--duo-card)",
                borderColor: mode.tone === "primary" ? tone.border : "var(--duo-line)",
                boxShadow: mode.tone === "primary" ? "var(--shadow-cyan)" : "var(--shadow-small)",
              }}
            >
              <div className="flex min-h-[8.5rem] flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                    style={{
                      background: tone.bg,
                      borderColor: tone.border,
                      color: tone.color,
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
                  <div className="text-base font-semibold leading-tight">{mode.title}</div>
                  <div className="mt-1 text-sm leading-snug" style={{ color: "var(--duo-muted)" }}>
                    {mode.desc}
                  </div>
                </div>
                <span
                  className="thai-big inline-flex max-w-full rounded-md border px-2 py-1 text-xs font-semibold"
                  style={{
                    background: "var(--surface-subtle)",
                    borderColor: "var(--duo-line)",
                    color: tone.color,
                  }}
                >
                  {mode.preview}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
