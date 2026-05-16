"use client";

import Link from "next/link";
import { Boxes, Brain, LibraryBig, LockKeyhole } from "lucide-react";
import { ALPHABET_FINAL_EXAM_POLICY, useAlphabetFinalExamResult } from "@/lib/moduleProgress";

export default function VocabularyPage() {
  const examResult = useAlphabetFinalExamResult();
  return (
    <div className="space-y-5">
      <section className="card-soft p-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border"
            style={{
              background: "color-mix(in srgb, var(--duo-purple) 10%, var(--duo-card))",
              borderColor: "color-mix(in srgb, var(--duo-purple) 28%, var(--duo-line))",
              color: "var(--duo-purple-d)",
            }}
          >
            <Boxes size={23} strokeWidth={2.1} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-2xl font-semibold">Vocabulary</div>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
              词汇会复用记忆模式，并增加义项、例句、同反义词、易混词和总览。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip chip-blue">词汇总览</span>
              <span className="chip chip-low">记忆模式</span>
              <span className="chip chip-high">50k 词库</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}>
          <div className="flex items-center gap-3">
            <LibraryBig size={19} strokeWidth={2.1} style={{ color: "var(--duo-blue-d)" }} />
            <div>
              <div className="font-semibold">词汇总览</div>
              <div className="text-sm" style={{ color: "var(--duo-muted)" }}>按主题、读音、语域和义项浏览</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}>
          <div className="flex items-center gap-3">
            <Brain size={19} strokeWidth={2.1} style={{ color: "var(--duo-purple-d)" }} />
            <div>
              <div className="font-semibold">词汇记忆</div>
              <div className="text-sm" style={{ color: "var(--duo-muted)" }}>沿用认识、模糊、不认识的节奏</div>
            </div>
          </div>
        </div>
      </section>

      {!examResult && (
        <Link
          href={ALPHABET_FINAL_EXAM_POLICY.route}
          className="flex items-center gap-3 rounded-lg border p-4 transition hover:-translate-y-0.5"
          style={{
            background: "var(--duo-card)",
            borderColor: "var(--duo-line)",
            boxShadow: "var(--shadow-small)",
          }}
        >
          <LockKeyhole size={18} strokeWidth={2.1} style={{ color: "var(--duo-orange-d)" }} />
          <div>
            <div className="font-semibold">先完成 Alphabet 期末</div>
            <div className="text-sm" style={{ color: "var(--duo-muted)" }}>
              词汇主线会在语法主线之后展开。
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
