"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenText,
  Boxes,
  ChevronDown,
  GraduationCap,
  Languages,
  LockKeyhole,
} from "lucide-react";
import AlphabetModulePanel from "@/components/AlphabetModulePanel";
import { HeroStatusBar } from "@/components/StatusBar";
import { useAlphabetFinalExamResult } from "@/lib/moduleProgress";

type ModuleId = "alphabet" | "grammar" | "vocabulary";

interface LearningModule {
  id: ModuleId;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  status: string;
  stats: string;
  locked?: boolean;
}

const MODULES: LearningModule[] = [
  {
    id: "alphabet",
    icon: GraduationCap,
    title: "Alphabet",
    subtitle: "字母、元音、声调、拼读、书写",
    status: "默认展开",
    stats: "44 辅音 · 32 元音 · 5 声调",
  },
  {
    id: "grammar",
    icon: BookOpenText,
    title: "Grammar",
    subtitle: "完整语法主线，随堂带高频词",
    status: "字母期末后进入",
    stats: "30 覆盖区 · C1/C2 语域",
    locked: true,
  },
  {
    id: "vocabulary",
    icon: Languages,
    title: "Vocabulary",
    subtitle: "词汇总览、记忆模式、例句和关系词",
    status: "语法后主线",
    stats: "50k 被动词库 · 20k 主动目标",
    locked: true,
  },
];

function ModuleButton({
  module,
  active,
  onClick,
  unlocked,
}: {
  module: LearningModule;
  active: boolean;
  onClick: () => void;
  unlocked: boolean;
}) {
  const Icon = module.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-lg border p-4 text-left transition hover:-translate-y-0.5"
      style={{
        background: active ? "color-mix(in srgb, var(--duo-green) 8%, var(--duo-card))" : "var(--duo-card)",
        borderColor: active ? "color-mix(in srgb, var(--duo-green) 34%, var(--duo-line))" : "var(--duo-line)",
        boxShadow: active ? "var(--shadow-cyan)" : "var(--shadow-small)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg border"
          style={{
            background: active ? "color-mix(in srgb, var(--duo-green) 12%, var(--duo-card))" : "var(--surface-subtle)",
            borderColor: active ? "color-mix(in srgb, var(--duo-green) 34%, var(--duo-line))" : "var(--duo-line)",
            color: active ? "var(--duo-green-d)" : "var(--duo-blue-d)",
          }}
        >
          <Icon size={19} strokeWidth={2.1} />
        </div>
        <div className="flex items-center gap-2">
          {!unlocked && <LockKeyhole size={15} strokeWidth={2.1} style={{ color: "var(--duo-muted)" }} />}
          <ChevronDown
            size={17}
            strokeWidth={2.1}
            className={active ? "rotate-180 transition" : "transition"}
            style={{ color: "var(--duo-muted)" }}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-base font-semibold leading-tight">{module.title}</div>
        <div className="mt-1 text-sm leading-snug" style={{ color: "var(--duo-muted)" }}>
          {module.subtitle}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="chip chip-blue">{module.status}</span>
        <span className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
          {module.stats}
        </span>
      </div>
    </button>
  );
}

export default function Home() {
  const examResult = useAlphabetFinalExamResult();
  const [openModule, setOpenModule] = useState<ModuleId>("alphabet");
  const grammarUnlocked = Boolean(examResult);

  return (
    <div className="space-y-5">
      <section className="card-soft relative overflow-hidden p-6 sm:p-7">
        <div
          className="pointer-events-none absolute -right-8 bottom-0 hidden h-44 w-48 opacity-80 sm:block"
          aria-hidden
          style={{
            background: "var(--surface-subtle)",
            border: "1px solid var(--duo-line)",
            borderRadius: "999px 999px 0 0",
            boxShadow: "inset 0 0 0 10px color-mix(in srgb, var(--duo-green) 10%, transparent)",
          }}
        />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
              Thai
            </div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              从字母开始，学完整泰语
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6" style={{ color: "color-mix(in srgb, var(--duo-text) 72%, var(--duo-muted))" }}>
              Alphabet 现在是第一个模块；之后语法和词汇会接在同一条学习路径里。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs md:min-w-72">
            {[
              ["1", "字母模块"],
              ["30", "语法覆盖"],
              ["50k", "词库目标"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border p-3"
                style={{
                  borderColor: "var(--duo-line)",
                  background: "var(--surface-subtle)",
                  boxShadow: "0 2px 0 var(--surface-raised-edge)",
                }}
              >
                <div className="text-xl font-semibold">{value}</div>
                <div className="mt-0.5" style={{ color: label === "语法覆盖" ? "var(--duo-green-d)" : "var(--duo-muted)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HeroStatusBar />

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {MODULES.map((module) => (
          <ModuleButton
            key={module.id}
            module={{
              ...module,
              status:
                module.id === "alphabet" && examResult
                  ? "期末已通过"
                  : module.id === "grammar" && grammarUnlocked
                  ? "已解锁"
                  : module.status,
            }}
            active={openModule === module.id}
            unlocked={module.id === "alphabet" || (module.id === "grammar" && grammarUnlocked)}
            onClick={() => setOpenModule((current) => (current === module.id ? "alphabet" : module.id))}
          />
        ))}
      </section>

      {openModule === "alphabet" && <AlphabetModulePanel examResult={examResult} showHeader={false} />}

      {openModule === "grammar" && (
        <section className="card-soft p-5">
          <div className="flex items-center gap-3">
            <BookOpenText size={22} strokeWidth={2.1} style={{ color: "var(--duo-blue-d)" }} />
            <div>
              <div className="text-lg font-semibold">Grammar</div>
              <div className="text-sm" style={{ color: "var(--duo-muted)" }}>
                先完成 Alphabet 期末，再进入完整语法主线。
              </div>
            </div>
          </div>
        </section>
      )}

      {openModule === "vocabulary" && (
        <section className="card-soft p-5">
          <div className="flex items-center gap-3">
            <Boxes size={22} strokeWidth={2.1} style={{ color: "var(--duo-purple-d)" }} />
            <div>
              <div className="text-lg font-semibold">Vocabulary</div>
              <div className="text-sm" style={{ color: "var(--duo-muted)" }}>
                词汇会复用记忆模式，并增加词义、例句、同反义词和总览。
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
