import Link from "next/link";
import { HeroStatusBar } from "@/components/StatusBar";

interface ModeCard {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  color: "green" | "blue" | "purple" | "orange" | "yellow" | "red";
  preview: string;
}

const MODES: ModeCard[] = [
  { href: "/course", emoji: "🎯", title: "小课程", desc: "辅音 / 元音混合题型", color: "green", preview: "ก ข ค ง" },
  { href: "/flashcards", emoji: "⚡", title: "Flashcard 速看", desc: "随机洗牌，直接看答案", color: "blue", preview: "ABC" },
  { href: "/overview", emoji: "📚", title: "字母总览", desc: "44 辅音 / 元音 / 声调", color: "purple", preview: "ก…ฮ" },
  { href: "/srs", emoji: "🧠", title: "Anki 记忆", desc: "知道 / 模糊 / 不知道", color: "yellow", preview: "1 → 5 → 25 m" },
  { href: "/spell", emoji: "🔤", title: "拼读输入", desc: "音节解析 + 声调推导", color: "green", preview: "กา → kaa" },
];

const COLOR_MAP: Record<ModeCard["color"], { bg: string; shadow: string; emojiBg: string }> = {
  green:  { bg: "var(--duo-green)",  shadow: "var(--duo-green-shadow)",  emojiBg: "rgba(255,255,255,0.25)" },
  blue:   { bg: "var(--duo-blue)",   shadow: "var(--duo-blue-d)",   emojiBg: "rgba(255,255,255,0.25)" },
  purple: { bg: "var(--duo-purple)", shadow: "var(--duo-purple-d)", emojiBg: "rgba(255,255,255,0.25)" },
  orange: { bg: "var(--duo-orange)", shadow: "var(--duo-orange-d)", emojiBg: "rgba(255,255,255,0.25)" },
  yellow: { bg: "var(--duo-yellow)", shadow: "#d6a800",             emojiBg: "rgba(0,0,0,0.08)" },
  red:    { bg: "var(--duo-red)",    shadow: "var(--duo-red-d)",    emojiBg: "rgba(255,255,255,0.25)" },
};

export default function Home() {
  return (
    <div className="space-y-5">
      <section className="card-soft p-5" style={{ background: "linear-gradient(135deg, #fff 0%, #f1faff 100%)" }}>
        <div className="flex items-center gap-3">
          <div
            className="thai-big flex h-14 w-14 items-center justify-center rounded-2xl text-3xl text-white"
            style={{ background: "var(--duo-green)", boxShadow: "0 4px 0 var(--duo-green-shadow)" }}
          >
            ไทย
          </div>
          <div style={{ color: "#333" }}>
            <h1 className="text-xl font-extrabold tracking-tight">学习泰语字母</h1>
            <p className="text-xs opacity-70">辅音 · 元音 · 声调 · 拼读</p>
          </div>
        </div>
      </section>

      <HeroStatusBar />

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {MODES.map((m) => {
          const c = COLOR_MAP[m.color];
          const textColor = m.color === "yellow" ? "#5b4500" : "#fff";
          return (
            <li key={m.href}>
              <Link
                href={m.href}
                className="block rounded-3xl p-4 transition-transform active:translate-y-[2px]"
                style={{
                  background: c.bg,
                  boxShadow: `0 5px 0 ${c.shadow}`,
                  color: textColor,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
                    style={{ background: c.emojiBg }}
                  >
                    {m.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-extrabold leading-tight">{m.title}</div>
                    <div className="mt-0.5 text-xs opacity-90">{m.desc}</div>
                    <div
                      className="thai-big mt-2 inline-block rounded-lg px-2 py-0.5 text-sm"
                      style={{ background: c.emojiBg }}
                    >
                      {m.preview}
                    </div>
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
