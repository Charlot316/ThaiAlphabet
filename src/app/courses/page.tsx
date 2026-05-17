"use client";

import Link from "next/link";
import {
  BookOpenText,
  CheckCircle2,
  GraduationCap,
  Languages,
  LockKeyhole,
  Map,
  Route,
} from "lucide-react";
import {
  COURSE_ROADMAP_COVERAGE,
  COURSE_ROADMAP_PHASES,
  type CourseRoadmapLesson,
} from "@/lib/curriculum";
import { GRAMMAR_LESSON_PLANS } from "@/lib/grammarCourse";
import { ALPHABET_FINAL_EXAM_POLICY, useAlphabetFinalExamResult } from "@/lib/moduleProgress";

const PHASE_ICONS = {
  phonics: GraduationCap,
  "core-grammar": BookOpenText,
  "advanced-grammar": Route,
  vocabulary: Languages,
};

function lessonHref(lesson: CourseRoadmapLesson) {
  if (lesson.kind === "phonics-path") return "/course";
  const focusPointId = lesson.grammarPointIds?.length === 1 ? lesson.grammarPointIds[0] : undefined;
  const focusLesson = focusPointId
    ? GRAMMAR_LESSON_PLANS.find((item) => item.focusPointId === focusPointId)
    : undefined;
  const coverageId = lesson.newGrammarCoverageIds?.[0] ?? lesson.reviewGrammarCoverageIds?.[0];
  const coverageLesson = coverageId
    ? GRAMMAR_LESSON_PLANS.find((item) => item.coverageId === coverageId)
    : undefined;
  const grammarLesson = focusLesson ?? coverageLesson;
  if (grammarLesson) return `/grammar#lesson=${grammarLesson.id}`;
  return lesson.kind === "vocabulary-band" || lesson.kind === "domain-vocabulary"
    ? "/vocabulary"
    : "/grammar";
}

function lessonActionLabel(lesson: CourseRoadmapLesson) {
  if (lesson.kind === "phonics-path") return "去字母课";
  if (lesson.kind === "vocabulary-band" || lesson.kind === "domain-vocabulary") return "看词汇";
  return "预览语法课";
}

const A1_GRAMMAR_LESSONS = GRAMMAR_LESSON_PLANS.filter(
  (lesson) => lesson.phase === "core" && Boolean(lesson.focusPointId)
);

export default function CoursesPage() {
  const examResult = useAlphabetFinalExamResult();
  const grammarUnlocked = Boolean(examResult);

  return (
    <div className="space-y-5">
      <section className="card-soft p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border"
              style={{
                background: "color-mix(in srgb, var(--duo-green) 10%, var(--duo-card))",
                borderColor: "color-mix(in srgb, var(--duo-green) 30%, var(--duo-line))",
                color: "var(--duo-green-d)",
              }}
            >
              <Map size={24} strokeWidth={2.1} />
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-semibold">课程</div>
              <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                课程负责安排学习顺序：先完成语音和文字，再进入语法主线，语法课里会先预习本课词汇，最后再开纯词汇扩展。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip chip-blue">{COURSE_ROADMAP_PHASES.length} 大单元</span>
                <span className="chip chip-high">
                  语法覆盖 {COURSE_ROADMAP_COVERAGE.grammarCoveragePlanned}/{COURSE_ROADMAP_COVERAGE.grammarCoverageTotal}
                </span>
                <span className={grammarUnlocked ? "chip chip-high" : "chip chip-low"}>
                  {grammarUnlocked ? "语法课已解锁" : "语法课需通过字母期末"}
                </span>
              </div>
            </div>
          </div>

          {!grammarUnlocked && (
            <Link href={ALPHABET_FINAL_EXAM_POLICY.route} className="btn-orange shrink-0">
              <LockKeyhole size={16} strokeWidth={2.2} />
              字母期末
            </Link>
          )}
        </div>
      </section>

      <section className="space-y-5">
        {COURSE_ROADMAP_PHASES.map((phase) => {
          const Icon = PHASE_ICONS[phase.id];
          const locked = phase.id !== "phonics" && !grammarUnlocked;
          return (
            <article key={phase.id} className="card-soft overflow-hidden">
              <div className="border-b p-5" style={{ borderColor: "var(--duo-line)" }}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        background: "var(--surface-subtle)",
                        borderColor: "var(--duo-line)",
                        color: locked ? "var(--duo-muted)" : "var(--duo-blue-d)",
                      }}
                    >
                      <Icon size={20} strokeWidth={2.1} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                        第 {phase.order} 大单元
                      </div>
                      <h2 className="mt-1 text-xl font-semibold">{phase.title.replace(/^第.+?·\s*/, "")}</h2>
                      <p className="mt-2 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                        {phase.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={locked ? "chip chip-low" : "chip chip-high"}>
                    {locked ? phase.unlockRuleZh : "可进入"}
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                {phase.id === "core-grammar" && (
                  <section className="rounded-lg border p-4" style={{ borderColor: "var(--duo-line)", background: "var(--duo-card)" }}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                          A1 · {A1_GRAMMAR_LESSONS.length} 节
                        </div>
                        <h3 className="mt-1 font-semibold">A1 语法逐点课</h3>
                        <p className="mt-1 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                          每个语法小点单独成课；先讲本课词汇，再看规则、例句和点选题。
                        </p>
                      </div>
                      <span className="chip chip-blue">按条目展开</span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                      {A1_GRAMMAR_LESSONS.map((lesson, index) => {
                        const disabled = locked;
                        return (
                          <Link
                            key={lesson.id}
                            href={disabled ? "#" : `/grammar#lesson=${lesson.id}`}
                            className="rounded-lg border p-3 transition hover:-translate-y-0.5"
                            style={{
                              pointerEvents: disabled ? "none" : undefined,
                              opacity: disabled ? 0.55 : 1,
                              background: "var(--surface-subtle)",
                              borderColor: "var(--duo-line)",
                              boxShadow: "var(--shadow-small)",
                            }}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>
                                {String(index + 1).padStart(2, "0")} · {lesson.level.toUpperCase()}
                              </span>
                              {disabled ? (
                                <LockKeyhole size={15} strokeWidth={2.1} style={{ color: "var(--duo-muted)" }} />
                              ) : (
                                <CheckCircle2 size={15} strokeWidth={2.1} style={{ color: "var(--duo-green-d)" }} />
                              )}
                            </div>
                            <div className="mt-2 font-semibold leading-snug">{lesson.title}</div>
                            <p className="mt-1 line-clamp-2 text-xs leading-5" style={{ color: "var(--duo-muted)" }}>
                              {lesson.subtitle}
                            </p>
                            <div className="mt-3 text-xs font-semibold" style={{ color: disabled ? "var(--duo-muted)" : "var(--duo-green-d)" }}>
                              {disabled ? "未解锁" : "开始逐点课"}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}

                {phase.units.map((unit) => (
                  <section key={unit.id} className="rounded-lg border p-4" style={{ borderColor: "var(--duo-line)", background: "var(--duo-card)" }}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                          {unit.level.toUpperCase()} · {unit.lessons.length} 节
                        </div>
                        <h3 className="mt-1 font-semibold">{unit.title}</h3>
                        <p className="mt-1 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                          {unit.subtitle}
                        </p>
                      </div>
                      <span className="chip" style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}>
                        {unit.completionGateZh}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                      {unit.lessons.map((lesson, index) => {
                        const disabled = locked && lesson.kind !== "phonics-path";
                        return (
                          <Link
                            key={lesson.id}
                            href={disabled ? "#" : lessonHref(lesson)}
                            className="rounded-lg border p-3 transition hover:-translate-y-0.5"
                            style={{
                              pointerEvents: disabled ? "none" : undefined,
                              opacity: disabled ? 0.55 : 1,
                              background: "var(--surface-subtle)",
                              borderColor: "var(--duo-line)",
                              boxShadow: "var(--shadow-small)",
                            }}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>
                                {String(index + 1).padStart(2, "0")} · {lesson.level.toUpperCase()}
                              </span>
                              {disabled ? (
                                <LockKeyhole size={15} strokeWidth={2.1} style={{ color: "var(--duo-muted)" }} />
                              ) : (
                                <CheckCircle2 size={15} strokeWidth={2.1} style={{ color: "var(--duo-green-d)" }} />
                              )}
                            </div>
                            <div className="mt-2 font-semibold leading-snug">{lesson.title}</div>
                            <p className="mt-1 line-clamp-2 text-xs leading-5" style={{ color: "var(--duo-muted)" }}>
                              {lesson.subtitle}
                            </p>
                            {lesson.vocabularyPlan && (
                              <div className="mt-2 text-xs font-semibold" style={{ color: "var(--duo-blue-d)" }}>
                                词汇 {lesson.vocabularyPlan.rankRange[0]}-{lesson.vocabularyPlan.rankRange[1]} · 随堂预习
                              </div>
                            )}
                            <div className="mt-3 text-xs font-semibold" style={{ color: disabled ? "var(--duo-muted)" : "var(--duo-green-d)" }}>
                              {disabled ? "未解锁" : lessonActionLabel(lesson)}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
