"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  BookOpenText,
  Layers3,
  LockKeyhole,
  Route,
  Search,
} from "lucide-react";
import {
  GRAMMAR_COVERAGE_SECTIONS,
  GRAMMAR_POINT_BY_ID,
  GRAMMAR_POINTS,
  GRAMMAR_TRACKS,
} from "@/data/grammar";
import { ALPHABET_FINAL_EXAM_POLICY, useAlphabetFinalExamResult } from "@/lib/moduleProgress";

const LEVEL_LABELS: Record<string, string> = {
  "pre-a1": "Pre-A1",
  a1: "A1",
  "a1-plus": "A1+",
  a2: "A2",
  b1: "B1",
  b2: "B2",
  c1: "C1",
  c2: "C2",
};

type GrammarView = "tracks" | "coverage" | "points";

const GRAMMAR_VIEWS: Array<{ id: GrammarView; icon: typeof Layers3; label: string }> = [
  { id: "coverage", icon: Layers3, label: "覆盖区" },
  { id: "tracks", icon: Route, label: "学习线" },
  { id: "points", icon: BookOpenCheck, label: "条目" },
];

function matchesSearch(text: string, query: string) {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

export default function GrammarPage() {
  const examResult = useAlphabetFinalExamResult();
  const [view, setView] = useState<GrammarView>("coverage");
  const [query, setQuery] = useState("");
  const courseUnlocked = Boolean(examResult);

  const filteredPoints = useMemo(() => {
    if (!query.trim()) return GRAMMAR_POINTS;
    return GRAMMAR_POINTS.filter((point) =>
      matchesSearch(
        `${point.titleZh} ${point.titleEn} ${point.summaryZh} ${point.patterns.join(" ")} ${point.tags.join(" ")}`,
        query
      )
    );
  }, [query]);

  const filteredCoverage = useMemo(() => {
    if (!query.trim()) return GRAMMAR_COVERAGE_SECTIONS;
    return GRAMMAR_COVERAGE_SECTIONS.filter((section) =>
      matchesSearch(`${section.titleZh} ${section.titleEn} ${section.summaryZh}`, query)
    );
  }, [query]);

  return (
    <div className="space-y-5">
      <section className="card-soft overflow-hidden p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
            <div className="min-w-0">
              <div className="text-2xl font-semibold">语法</div>
              <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                语法条目现在可以提前浏览；正式课程仍然等字母期末通过后再开始。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip chip-blue">可浏览</span>
                <span className={courseUnlocked ? "chip chip-high" : "chip chip-low"}>
                  {courseUnlocked ? "课程已解锁" : "课程未解锁"}
                </span>
                <span className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                  {GRAMMAR_COVERAGE_SECTIONS.length} 覆盖区 · {GRAMMAR_POINTS.length} 条目
                </span>
              </div>
            </div>
          </div>

          {!courseUnlocked && (
            <Link
              href={ALPHABET_FINAL_EXAM_POLICY.route}
              className="btn-orange shrink-0"
              title="通过字母期末后开放语法课程"
            >
              <LockKeyhole size={16} strokeWidth={2.2} />
              课程锁定
            </Link>
          )}
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2 rounded-lg border p-2" style={{ borderColor: "var(--duo-line)", background: "var(--duo-card)" }}>
        {GRAMMAR_VIEWS.map(({ id, icon: Icon, label }) => {
          const active = view === id;
          return (
            <button
              key={id as string}
              type="button"
              onClick={() => setView(id)}
              className="btn h-11 px-2"
              style={{
                background: active ? "var(--surface-subtle)" : "transparent",
                borderColor: active ? "var(--duo-line-d)" : "transparent",
                color: active ? "var(--duo-green-d)" : "var(--duo-muted)",
                boxShadow: active ? "var(--shadow-small)" : "none",
              }}
            >
              <Icon size={16} strokeWidth={2.2} />
              {label}
            </button>
          );
        })}
      </section>

      <label className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)" }}>
        <Search size={17} strokeWidth={2.1} style={{ color: "var(--duo-muted)" }} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索语法、例句、标签..."
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
        />
      </label>

      {view === "coverage" && (
        <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filteredCoverage.map((section, index) => (
            <article key={section.id} className="rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                    {String(index + 1).padStart(2, "0")} · {LEVEL_LABELS[section.level] ?? section.level}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold">{section.titleZh}</h2>
                  <div className="text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>{section.titleEn}</div>
                </div>
                <span className="chip chip-blue">{section.pointIds.length} 点</span>
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>{section.summaryZh}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {section.pointIds.slice(0, 5).map((pointId) => (
                  <span key={pointId} className="chip" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}>
                    {GRAMMAR_POINT_BY_ID[pointId]?.titleZh ?? pointId}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}

      {view === "tracks" && (
        <section className="space-y-3">
          {GRAMMAR_TRACKS.map((track, index) => (
            <article key={track.id} className="rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                    Track {index + 1} · {LEVEL_LABELS[track.level] ?? track.level}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold">{track.titleZh}</h2>
                </div>
                <span className="chip chip-low">{track.pointIds.length} 新点</span>
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>{track.summaryZh}</p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {track.pointIds.map((pointId) => (
                  <div key={pointId} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
                    {GRAMMAR_POINT_BY_ID[pointId]?.titleZh ?? pointId}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}

      {view === "points" && (
        <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filteredPoints.map((point) => (
            <article key={point.id} className="rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold">{point.titleZh}</h2>
                  <div className="text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>{point.titleEn}</div>
                </div>
                <span className="chip chip-blue">{LEVEL_LABELS[point.level] ?? point.level}</span>
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>{point.summaryZh}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {point.patterns.slice(0, 3).map((pattern) => (
                  <code key={pattern} className="rounded-md border px-2 py-1 text-xs" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
                    {pattern}
                  </code>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
