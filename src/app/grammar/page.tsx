"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  BookOpenText,
  CheckCircle2,
  Layers3,
  LockKeyhole,
  Route,
  Search,
  XCircle,
} from "lucide-react";
import {
  GRAMMAR_COVERAGE_SECTIONS,
  GRAMMAR_POINT_BY_ID,
  GRAMMAR_POINTS,
} from "@/data/grammar";
import {
  A1_GRAMMAR_LEARNING_LINE,
  buildGrammarExercisesForLesson,
  GRAMMAR_EXERCISE_CATALOG,
  GRAMMAR_LESSON_PLANS,
  type GrammarExercise,
} from "@/lib/grammarCourse";
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

type GrammarView = "courses" | "tracks" | "coverage" | "points";

const GRAMMAR_VIEWS: Array<{ id: GrammarView; icon: typeof Layers3; label: string }> = [
  { id: "courses", icon: BookOpenText, label: "课程" },
  { id: "coverage", icon: Layers3, label: "覆盖区" },
  { id: "tracks", icon: Route, label: "学习线" },
  { id: "points", icon: BookOpenCheck, label: "条目" },
];

const GRAMMAR_PROGRESS_KEY = "thai-alphabet:grammar-course-progress:v1";

function matchesSearch(text: string, query: string) {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

function loadCompletedGrammarLessons(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(GRAMMAR_PROGRESS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function saveCompletedGrammarLessons(ids: string[]) {
  try {
    window.localStorage.setItem(GRAMMAR_PROGRESS_KEY, JSON.stringify(Array.from(new Set(ids))));
  } catch {
    /* local progress is best-effort */
  }
}

export default function GrammarPage() {
  const examResult = useAlphabetFinalExamResult();
  const [view, setView] = useState<GrammarView>("courses");
  const [query, setQuery] = useState("");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(loadCompletedGrammarLessons);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GrammarExercise[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [selectedTokenIds, setSelectedTokenIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const courseUnlocked = Boolean(examResult);
  const currentQuestion = questions[questionIndex];
  const activeLesson = GRAMMAR_LESSON_PLANS.find((lesson) => lesson.id === activeLessonId);
  const complete = activeLessonId && questions.length > 0 && questionIndex >= questions.length;
  const progressPercent = questions.length === 0 ? 0 : Math.min(100, (questionIndex / questions.length) * 100);
  const selectedTokenLabels =
    currentQuestion?.tokens
      ?.filter((token) => selectedTokenIds.includes(token.id))
      .sort((a, b) => selectedTokenIds.indexOf(a.id) - selectedTokenIds.indexOf(b.id))
      .map((token) => token.label) ?? [];
  const isTokenQuestion =
    currentQuestion?.kind === "order-tokens" || currentQuestion?.kind === "output-plan";
  const orderCorrect =
    isTokenQuestion &&
    selectedTokenLabels.join("\u0001") === (currentQuestion.answerTokens ?? []).join("\u0001");
  const choiceCorrect =
    currentQuestion?.choices?.find((choice) => choice.id === selectedChoiceId)?.correct ?? false;
  const answerCorrect = isTokenQuestion ? orderCorrect : choiceCorrect;

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

  const filteredLessons = useMemo(() => {
    if (!query.trim()) return GRAMMAR_LESSON_PLANS;
    return GRAMMAR_LESSON_PLANS.filter((lesson) =>
      matchesSearch(`${lesson.title} ${lesson.subtitle} ${lesson.pointIds.join(" ")}`, query)
    );
  }, [query]);

  function startLesson(lessonId: string) {
    setActiveLessonId(lessonId);
    setQuestions(buildGrammarExercisesForLesson(lessonId));
    setQuestionIndex(0);
    setSelectedChoiceId(null);
    setSelectedTokenIds([]);
    setSubmitted(false);
    setCorrectCount(0);
  }

  function closeLesson() {
    setActiveLessonId(null);
    setQuestions([]);
    setQuestionIndex(0);
    setSelectedChoiceId(null);
    setSelectedTokenIds([]);
    setSubmitted(false);
    setCorrectCount(0);
  }

  function submitCurrent(correct: boolean) {
    if (submitted) return;
    setSubmitted(true);
    if (correct) setCorrectCount((value) => value + 1);
  }

  function nextQuestion() {
    if (!activeLessonId) return;
    const nextIndex = questionIndex + 1;
    if (nextIndex >= questions.length) {
      const nextCompleted = Array.from(new Set([...completedLessonIds, activeLessonId]));
      setCompletedLessonIds(nextCompleted);
      saveCompletedGrammarLessons(nextCompleted);
    }
    setQuestionIndex(nextIndex);
    setSelectedChoiceId(null);
    setSelectedTokenIds([]);
    setSubmitted(false);
  }

  if (activeLessonId && activeLesson) {
    return (
      <div className="space-y-4">
        <section className="card-soft p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                语法课程 · {LEVEL_LABELS[activeLesson.level] ?? activeLesson.level}
              </div>
              <h1 className="mt-1 truncate text-xl font-semibold">{activeLesson.title}</h1>
              <p className="mt-1 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                {activeLesson.subtitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeLesson.trainingModes.map((mode) => (
                  <span key={mode} className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                    {mode}
                  </span>
                ))}
              </div>
            </div>
            <button type="button" onClick={closeLesson} className="btn-ghost shrink-0 px-3">
              退出
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {activeLesson.skillGoalsZh.slice(0, 4).map((goal) => (
              <div key={goal} className="rounded-lg border px-3 py-2 text-xs font-semibold leading-5" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)", color: "var(--duo-muted)" }}>
                {goal}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="progress-track flex-1">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>
              {Math.min(questionIndex + 1, questions.length)} / {questions.length}
            </div>
          </div>
        </section>

        {complete ? (
          <section className="card-soft p-7 text-center">
            <CheckCircle2 className="mx-auto" size={46} style={{ color: "var(--duo-green-d)" }} />
            <h2 className="mt-4 text-2xl font-semibold">这一节语法完成了</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--duo-muted)" }}>
              答对 {correctCount} / {questions.length}。这节课已记录在本机进度里。
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => startLesson(activeLessonId)} className="btn-primary px-5">
                再练一次
              </button>
              <button type="button" onClick={closeLesson} className="btn-ghost px-5">
                回到语法列表
              </button>
            </div>
          </section>
        ) : currentQuestion ? (
          <section className={`space-y-4 ${submitted && !answerCorrect ? "animate-shake" : ""}`}>
            <article className="card-soft p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip chip-blue">{currentQuestion.pointTitleZh}</span>
                <span className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                  {currentQuestion.kind.replace(/-/g, " ")}
                </span>
              </div>
              <div className="mt-4 text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>
                {currentQuestion.instructionZh}
              </div>
              <div className="mt-3 text-2xl font-semibold leading-relaxed">
                {currentQuestion.promptZh}
              </div>
              {currentQuestion.example?.roman && (
                <div className="mt-2 font-mono text-sm" style={{ color: "var(--duo-blue-d)" }}>
                  {currentQuestion.example.roman}
                </div>
              )}
            </article>

            {isTokenQuestion ? (
              <section className="space-y-3">
                <div className="min-h-16 rounded-lg border p-3" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)" }}>
                  <div className="flex flex-wrap gap-2">
                    {selectedTokenIds.length === 0 ? (
                      <span className="text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>
                        点下面的词块来完成顺序
                      </span>
                    ) : (
                      selectedTokenLabels.map((label, index) => (
                        <span key={`${label}-${index}`} className="chip chip-blue">{label}</span>
                      ))
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {currentQuestion.tokens?.map((token) => {
                    const used = selectedTokenIds.includes(token.id);
                    return (
                      <button
                        key={token.id}
                        type="button"
                        disabled={used || submitted}
                        onClick={() => setSelectedTokenIds((ids) => [...ids, token.id])}
                        className={used ? "opt opt-disabled min-h-[56px]" : "opt min-h-[56px]"}
                      >
                        <span className="thai-big text-lg">{token.label}</span>
                      </button>
                    );
                  })}
                </div>
                {!submitted && (
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setSelectedTokenIds([])} className="btn-ghost">
                      清空
                    </button>
                    <button
                      type="button"
                      disabled={selectedTokenIds.length !== (currentQuestion.answerTokens?.length ?? 0)}
                      onClick={() => submitCurrent(orderCorrect)}
                      className="btn-primary"
                    >
                      确认
                    </button>
                  </div>
                )}
              </section>
            ) : (
              <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {currentQuestion.choices?.map((choice) => {
                  const picked = selectedChoiceId === choice.id;
                  let cls = "opt min-h-[76px] px-4 py-3 text-left";
                  if (submitted) {
                    if (choice.correct) cls += " opt-correct";
                    else if (picked) cls += " opt-wrong";
                    else cls += " opt-disabled";
                  } else if (picked) {
                    cls += " opt-selected";
                  }
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      disabled={submitted}
                      onClick={() => {
                        setSelectedChoiceId(choice.id);
                        submitCurrent(choice.correct);
                      }}
                      className={cls}
                    >
                      <span className="block font-semibold">{choice.label}</span>
                      {choice.subLabel && (
                        <span className="mt-1 block text-xs opacity-65">{choice.subLabel}</span>
                      )}
                    </button>
                  );
                })}
              </section>
            )}

            {submitted && (
              <section className={`feedback ${answerCorrect ? "feedback-ok" : "feedback-bad"} animate-pop`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-base">
                      {answerCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                      <span>{answerCorrect ? "答对了" : "这里要再看一眼"}</span>
                    </div>
                    <div className="mt-1 text-sm leading-6 opacity-80">{currentQuestion.explanationZh}</div>
                  </div>
                  <button type="button" onClick={nextQuestion} className={answerCorrect ? "btn-primary px-5" : "btn-red px-5"}>
                    继续
                  </button>
                </div>
              </section>
            )}
          </section>
        ) : null}
      </div>
    );
  }

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
                语法条目可以提前浏览；课程现在会用例句自动生成结构识别、缺词选择、翻译匹配和点词排序题。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip chip-blue">可浏览</span>
                <span className={courseUnlocked ? "chip chip-high" : "chip chip-low"}>
                  {courseUnlocked ? "课程已解锁" : "课程未解锁"}
                </span>
                <span className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                  {GRAMMAR_COVERAGE_SECTIONS.length} 覆盖区 · {GRAMMAR_POINTS.length} 条目
                </span>
                <span className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                  A1 {A1_GRAMMAR_LEARNING_LINE.length} 节 · {GRAMMAR_EXERCISE_CATALOG.length} 种题型
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

      {view === "courses" && (
        <section className="space-y-3">
          {filteredLessons.map((lesson, index) => {
            const done = completedLessonIds.includes(lesson.id);
            return (
              <article
                key={lesson.id}
                className="rounded-lg border p-4"
                style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                      Lesson {index + 1} · {LEVEL_LABELS[lesson.level] ?? lesson.level}
                    </div>
                    <h2 className="mt-1 text-lg font-semibold">{lesson.title}</h2>
                    <p className="mt-2 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                      {lesson.subtitle}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="chip chip-blue">{lesson.pointIds.length} 个语法点</span>
                      <span className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                        {lesson.phase === "core" ? "核心语法" : lesson.phase === "advanced" ? "C1/C2 高级" : "输出课"}
                      </span>
                      {lesson.trainingModes.slice(0, 3).map((mode) => (
                        <span key={mode} className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                          {mode}
                        </span>
                      ))}
                      <span className="chip chip-low">{lesson.examplesCount} 条例句</span>
                      <span className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                        约 {lesson.estimatedQuestions} 题
                      </span>
                      {done && <span className="chip chip-high">已完成</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => startLesson(lesson.id)}
                    className={courseUnlocked ? "btn-primary shrink-0 px-5" : "btn-ghost shrink-0 px-5"}
                    title={courseUnlocked ? "开始语法课" : "可预览练习；正式进度以后接入解锁"}
                  >
                    {done ? "复习" : courseUnlocked ? "开始" : "预览"}
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}

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
          <article className="rounded-lg border p-4" style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                  A1 learning line
                </div>
                <h2 className="mt-1 text-lg font-semibold">A1 逐点学习线</h2>
              </div>
              <span className="chip chip-blue">{A1_GRAMMAR_LEARNING_LINE.length} 个语法小点</span>
            </div>
            <p className="mt-3 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
              按现有学习线展开，每个语法条目对应一节课；旧学习线漏掉的 A1 条目会按覆盖区顺序补在后面，先保证 A1 不重不漏。
            </p>
          </article>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {A1_GRAMMAR_LEARNING_LINE.map((step) => {
              const point = GRAMMAR_POINT_BY_ID[step.pointId];
              const lesson = GRAMMAR_LESSON_PLANS.find((item) => item.focusPointId === step.pointId);
              if (!point) return null;
              return (
                <article
                  key={step.pointId}
                  className="rounded-lg border p-4"
                  style={{ background: "var(--duo-card)", borderColor: "var(--duo-line)", boxShadow: "var(--shadow-small)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
                        {String(step.order).padStart(2, "0")} · {LEVEL_LABELS[point.level] ?? point.level} · {step.trackTitleZh}
                      </div>
                      <h2 className="mt-1 text-base font-semibold">{point.titleZh}</h2>
                      <p className="mt-2 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
                        {point.summaryZh}
                      </p>
                    </div>
                    {lesson && (
                      <button type="button" onClick={() => startLesson(lesson.id)} className={courseUnlocked ? "btn-primary shrink-0 px-4" : "btn-ghost shrink-0 px-4"}>
                        {courseUnlocked ? "开始" : "预览"}
                      </button>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="chip chip-blue">{point.examples.length} 条例句</span>
                    {step.coverageTitleZh && (
                      <span className="chip" style={{ background: "var(--surface-subtle)", color: "var(--duo-muted)", borderColor: "var(--duo-line)" }}>
                        {step.coverageTitleZh}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
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
