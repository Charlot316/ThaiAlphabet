"use client";

import Link from "next/link";
import {
  BookOpen,
  BookOpenText,
  CheckCircle2,
  GraduationCap,
  Languages,
  LockKeyhole,
  Map,
  Route,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import {
  COURSE_ROADMAP_COVERAGE,
  COURSE_ROADMAP_PHASES,
  MAIN_COURSE,
  type CourseRoadmapLesson,
  lessonStatus,
  unitStatus,
} from "@/lib/curriculum";
import { GRAMMAR_LESSON_PLANS } from "@/lib/grammarCourse";
import { ALPHABET_FINAL_EXAM_POLICY, useAlphabetFinalExamResult } from "@/lib/moduleProgress";
import { useCourseProgress } from "@/lib/courseProgressStore";

const PHASE_ICONS = {
  phonics: GraduationCap,
  "core-grammar": BookOpenText,
  "advanced-grammar": Route,
  vocabulary: Languages,
};

function lessonHref(lesson: CourseRoadmapLesson) {
  if (lesson.kind === "phonics-path") {
    if (lesson.sourceCourseUnit) return `/course?unit=${encodeURIComponent(lesson.sourceCourseUnit)}`;
    return lesson.sourceCourseLessonId ? `/course?lesson=${lesson.sourceCourseLessonId}` : "/course";
  }
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
  if (lesson.kind === "phonics-path") return "进入阶段";
  if (lesson.kind === "vocabulary-band" || lesson.kind === "domain-vocabulary") return "看词汇";
  return "预览语法课";
}

const A1_GRAMMAR_LESSONS = GRAMMAR_LESSON_PLANS.filter(
  (lesson) => lesson.phase === "core" && Boolean(lesson.focusPointId)
);

const PATH_X = [50, 66, 58, 38, 30, 44, 62, 70, 52, 34];
const PATH_ROW_HEIGHT = 94;

interface PathLesson {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  level: string;
  disabled: boolean;
  status: "done" | "skipped" | "current" | "available" | "locked";
  kind: CourseRoadmapLesson["kind"] | "grammar-point";
  note?: string;
}

function pathLessonMeta(kind: PathLesson["kind"]): { label: string; Icon: LucideIcon; color: "green" | "blue" | "orange" | "purple" } {
  if (kind === "phonics-path") return { label: "字母", Icon: Star, color: "green" };
  if (kind === "grammar-point" || kind === "grammar-core") return { label: "语法", Icon: BookOpenText, color: "blue" };
  if (kind === "grammar-review") return { label: "复习", Icon: Sparkles, color: "orange" };
  if (kind === "advanced-grammar" || kind === "output-practice") return { label: "高级", Icon: Route, color: "purple" };
  if (kind === "vocabulary-band" || kind === "domain-vocabulary") return { label: "词汇", Icon: Languages, color: "blue" };
  return { label: "课程", Icon: BookOpen, color: "green" };
}

function colorVars(color: "green" | "blue" | "orange" | "purple") {
  if (color === "blue") return { main: "var(--duo-blue)", dark: "var(--duo-blue-d)" };
  if (color === "orange") return { main: "var(--duo-orange)", dark: "var(--duo-orange-d)" };
  if (color === "purple") return { main: "var(--duo-purple)", dark: "var(--duo-purple-d)" };
  return { main: "var(--duo-green)", dark: "var(--duo-green-d)" };
}

function CoursePath({ lessons, offset = 0 }: { lessons: PathLesson[]; offset?: number }) {
  const height = lessons.length * PATH_ROW_HEIGHT + 34;
  const points = lessons
    .map((_, index) => {
      const x = PATH_X[(index + offset) % PATH_X.length];
      return `${x},${index * PATH_ROW_HEIGHT + 44}`;
    })
    .join(" ");

  return (
    <div className="relative mx-auto mt-5 max-w-2xl" style={{ height }}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <polyline
          points={points}
          fill="none"
          stroke="color-mix(in srgb, var(--duo-line-d) 62%, transparent)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 7"
        />
      </svg>

      {lessons.map((lesson, index) => {
        const x = PATH_X[(index + offset) % PATH_X.length];
        return (
          <CoursePathNode
            key={lesson.id}
            lesson={lesson}
            active={lesson.status === "current" || (lesson.status === "available" && index === 0)}
            x={x}
            y={index * PATH_ROW_HEIGHT}
          />
        );
      })}
    </div>
  );
}

function CoursePathNode({
  lesson,
  active,
  x,
  y,
}: {
  lesson: PathLesson;
  active: boolean;
  x: number;
  y: number;
}) {
  const meta = pathLessonMeta(lesson.kind);
  const color = colorVars(meta.color);
  const disabled = lesson.disabled || lesson.status === "locked";
  const Icon =
    lesson.status === "done"
      ? CheckCircle2
      : lesson.status === "skipped"
        ? Sparkles
        : disabled
          ? LockKeyhole
          : meta.Icon;
  const labelSide = x > 55 ? "right" : x < 45 ? "left" : "center";

  return (
    <Link
      href={disabled ? "#" : lesson.href}
      className="absolute flex -translate-x-1/2 flex-col items-center"
      style={{
        left: `${x}%`,
        top: y,
        pointerEvents: disabled ? "none" : undefined,
        opacity: disabled ? 0.58 : 1,
      }}
      title={`${lesson.title} · ${meta.label}`}
    >
      {active && (
        <div
          className="absolute -top-8 rounded-lg border px-3 py-1.5 text-xs font-semibold"
          style={{
            background: "var(--surface-solid)",
            borderColor: `color-mix(in srgb, ${color.main} 42%, var(--duo-line))`,
            color: color.dark,
            boxShadow: "var(--shadow-cyan)",
          }}
        >
          开始
        </div>
      )}

      <span
        className="relative flex h-16 w-16 items-center justify-center rounded-full border transition hover:-translate-y-0.5 active:scale-95 sm:h-[68px] sm:w-[68px]"
        style={{
          background: active
            ? color.main
            : lesson.status === "done"
              ? "color-mix(in srgb, var(--duo-green) 14%, var(--duo-card))"
            : lesson.status === "skipped"
              ? "color-mix(in srgb, var(--duo-orange) 14%, var(--duo-card))"
            : disabled
              ? "color-mix(in srgb, var(--duo-muted) 12%, var(--duo-card))"
              : `color-mix(in srgb, ${color.main} 13%, var(--duo-card))`,
          borderColor: active
            ? color.main
            : disabled
              ? "var(--duo-line)"
              : `color-mix(in srgb, ${color.main} 38%, var(--duo-line))`,
          boxShadow: active ? "var(--shadow-cyan)" : "var(--shadow-small)",
          color: active ? "#041517" : disabled ? "var(--duo-muted)" : color.dark,
        }}
      >
        {active && (
          <span
            className="absolute inset-[-7px] rounded-full border"
            style={{ borderColor: `color-mix(in srgb, ${color.main} 36%, transparent)` }}
            aria-hidden
          />
        )}
        <Icon size={26} strokeWidth={2.35} />
      </span>

      <span
        className={`mt-2 w-36 rounded-lg border px-2.5 py-2 text-xs leading-4 ${
          labelSide === "right" ? "translate-x-10" : labelSide === "left" ? "-translate-x-10" : ""
        }`}
        style={{
          background: "color-mix(in srgb, var(--duo-card) 92%, transparent)",
          borderColor: "var(--duo-line)",
          boxShadow: "var(--shadow-small)",
        }}
      >
        <span className="block truncate font-semibold">{lesson.title}</span>
        <span className="mt-0.5 block truncate" style={{ color: "var(--duo-muted)" }}>
          {lesson.level.toUpperCase()} · {lesson.note ?? meta.label}
        </span>
      </span>
    </Link>
  );
}

export default function CoursesPage() {
  const examResult = useAlphabetFinalExamResult();
  const grammarUnlocked = Boolean(examResult);
  const courseProgress = useCourseProgress();

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
          const phonicsUnits = phase.id === "phonics" ? phase.units.flatMap((unit) => unit.lessons) : [];
          const phonicsDoneCount = phonicsUnits.filter((lesson) =>
            lesson.sourceCourseUnit && ["done", "skipped"].includes(unitStatus(lesson.sourceCourseUnit, courseProgress))
          ).length;
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
                    {phase.id === "phonics"
                      ? `${phonicsDoneCount}/${phonicsUnits.length} 阶段已完成`
                      : locked
                        ? phase.unlockRuleZh
                        : "已解锁"}
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

                    <CoursePath
                      offset={1}
                      lessons={A1_GRAMMAR_LESSONS.map((lesson) => ({
                        id: lesson.id,
                        title: lesson.title.replace(/^A1 语法 \d+ ·\s*/, ""),
                        subtitle: lesson.subtitle,
                        href: `/grammar#lesson=${lesson.id}`,
                        level: lesson.level,
                        disabled: locked,
                        status: locked ? "locked" : "available",
                        kind: "grammar-point",
                        note: "逐点课",
                      }))}
                    />
                  </section>
                )}

                {phase.units.map((unit) => (
                  <section key={unit.id} className="rounded-lg border p-4" style={{ borderColor: "var(--duo-line)", background: "var(--duo-card)" }}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                          {unit.level.toUpperCase()} · {unit.lessons.length} {unit.phaseId === "phonics" ? "阶段" : "节"}
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

                    <CoursePath
                      offset={unit.order * 2}
                      lessons={unit.lessons.map((lesson) => {
                        const sourceLesson = lesson.sourceCourseLessonId
                          ? MAIN_COURSE.find((item) => item.id === lesson.sourceCourseLessonId)
                          : undefined;
                        const phonicsStatus = sourceLesson
                          ? lesson.sourceCourseUnit
                            ? unitStatus(lesson.sourceCourseUnit, courseProgress)
                            : lessonStatus(sourceLesson, courseProgress)
                          : "available";
                        const disabled = locked && lesson.kind !== "phonics-path";
                        return {
                          id: lesson.id,
                          title: lesson.title.replace(/^.+?·\s*/, ""),
                          subtitle: lesson.subtitle,
                          href: lessonHref(lesson),
                          level: lesson.level,
                          disabled,
                          status: lesson.kind === "phonics-path"
                            ? phonicsStatus
                            : disabled
                              ? "locked"
                              : "available",
                          kind: lesson.kind,
                          note: lesson.vocabularyPlan
                            ? `词汇 ${lesson.vocabularyPlan.rankRange[0]}-${lesson.vocabularyPlan.rankRange[1]}`
                            : lessonActionLabel(lesson),
                        };
                      })}
                    />
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
