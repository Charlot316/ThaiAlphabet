"use client";

import Link from "next/link";
import { BookOpenText, LockKeyhole } from "lucide-react";
import { ALPHABET_FINAL_EXAM_POLICY, useAlphabetFinalExamResult } from "@/lib/moduleProgress";

export default function GrammarPage() {
  const examResult = useAlphabetFinalExamResult();
  return (
    <div className="space-y-5">
      <section className="card-soft p-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border"
            style={{
              background: "color-mix(in srgb, var(--duo-blue) 10%, var(--duo-card))",
              borderColor: "color-mix(in srgb, var(--duo-blue) 28%, var(--duo-line))",
              color: "var(--duo-blue-d)",
            }}
          >
            <BookOpenText size={23} strokeWidth={2.1} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-2xl font-semibold">Grammar</div>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
              完整语法主线会接在 Alphabet 期末之后，并随堂带高频词。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={examResult ? "chip chip-high" : "chip"} style={examResult ? undefined : { background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                {examResult ? "已解锁" : "未解锁"}
              </span>
              <span className="chip chip-blue">30 个语法覆盖区</span>
              <span className="chip chip-low">C1/C2 语域</span>
            </div>
          </div>
        </div>
      </section>

      {!examResult && (
        <Link
          href={ALPHABET_FINAL_EXAM_POLICY.route}
          className="flex items-center justify-between gap-3 rounded-lg border p-4 transition hover:-translate-y-0.5"
          style={{
            background: "var(--duo-card)",
            borderColor: "var(--duo-line)",
            boxShadow: "var(--shadow-small)",
          }}
        >
          <div className="flex items-center gap-3">
            <LockKeyhole size={18} strokeWidth={2.1} style={{ color: "var(--duo-orange-d)" }} />
            <div>
              <div className="font-semibold">先通过 Alphabet 期末</div>
              <div className="text-sm" style={{ color: "var(--duo-muted)" }}>
                {ALPHABET_FINAL_EXAM_POLICY.matchedTarget} 配对 · ≤{ALPHABET_FINAL_EXAM_POLICY.maxMisses} 失误 · {ALPHABET_FINAL_EXAM_POLICY.streakTarget} 连击
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
