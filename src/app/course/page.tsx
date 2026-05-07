"use client";
import { useEffect, useMemo, useState } from "react";
import PronounceButton from "@/components/PronounceButton";
import { MASTERY_TARGET, MasteryProgress, addMastery as recordMastery, loadMastery, resetMastery } from "@/lib/mastery";
import { StudyItem, buildStudyItems, displayRoman, shuffleStrong, uniqueChoices } from "@/lib/study";

const LAST_LESSON_KEY = "thai-alphabet:last-lesson:v1";
const LESSON_SIZE = 4;

type QuestionKind = "sound" | "letter" | "look";

interface Question {
  id: string;
  kind: QuestionKind;
  item: StudyItem;
  choices: StudyItem[];
}

function getLastLesson(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(LAST_LESSON_KEY) || "[]") as string[];
  } catch {
    return [];
  }
}

function rememberLesson(ids: string[]) {
  window.localStorage.setItem(LAST_LESSON_KEY, JSON.stringify(ids));
}

function pickLessonItems(items: StudyItem[], progress: MasteryProgress): StudyItem[] {
  const lastIds = new Set(getLastLesson());
  const sorted = shuffleStrong(items).sort((a, b) => (progress[a.id] || 0) - (progress[b.id] || 0));
  const fresh = sorted.filter((item) => !lastIds.has(item.id));
  const source = fresh.length >= LESSON_SIZE ? fresh : sorted;
  const lesson = source.slice(0, LESSON_SIZE);
  rememberLesson(lesson.map((item) => item.id));
  return lesson;
}

function buildQuestions(lessonItems: StudyItem[], allItems: StudyItem[]): Question[] {
  const questions = lessonItems.flatMap((item) => {
    const soundChoices = uniqueChoices(item, allItems, 4, (option) => option.roman);
    const letterChoices = uniqueChoices(item, allItems, 4, (option) => option.id);
    return [
      { id: `${item.id}:look`, kind: "look" as const, item, choices: [item] },
      { id: `${item.id}:sound`, kind: "sound" as const, item, choices: soundChoices },
      { id: `${item.id}:letter`, kind: "letter" as const, item, choices: letterChoices },
    ];
  });

  return shuffleStrong(questions);
}

export default function CoursePage() {
  const allConsonants = useMemo(() => buildStudyItems().filter((item) => item.pool === "consonant"), []);
  const [progress, setProgress] = useState<MasteryProgress>({});
  const [lessonItems, setLessonItems] = useState<StudyItem[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const current = questions[index];
  const complete = questions.length > 0 && index >= questions.length;
  const mastered = allConsonants.filter((item) => (progress[item.id] || 0) >= MASTERY_TARGET).length;

  function startLesson(nextProgress = progress) {
    const pickedItems = pickLessonItems(allConsonants, nextProgress);
    setLessonItems(pickedItems);
    setQuestions(buildQuestions(pickedItems, allConsonants));
    setIndex(0);
    setPicked(null);
    setCorrectCount(0);
  }

  useEffect(() => {
    const stored = loadMastery();
    setProgress(stored);
    startLesson(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function gainMastery(itemId: string, amount: number) {
    setProgress(recordMastery(itemId, amount));
  }

  function answer(id: string) {
    if (!current || picked) return;
    setPicked(id);
    const ok = id === current.item.id;
    if (ok) {
      gainMastery(current.item.id, 1);
      setCorrectCount((value) => value + 1);
    }
  }

  function next() {
    setPicked(null);
    setIndex((value) => value + 1);
  }

  function markLooked() {
    if (!current) return;
    gainMastery(current.item.id, 1);
    setCorrectCount((value) => value + 1);
    next();
  }

  function resetProgress() {
    resetMastery();
    window.localStorage.removeItem(LAST_LESSON_KEY);
    const empty = {};
    setProgress(empty);
    startLesson(empty);
  }

  return (
    <div className="space-y-4">
      <section className="card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-semibold">小课程</h1>
            <p className="mt-0.5 text-xs opacity-70">每次 4 个辅音，读音单选和字母单选混合出现。</p>
          </div>
          <button onClick={resetProgress} className="btn-ghost shrink-0 text-xs px-3 py-2">
            清空熟练度
          </button>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div
            className="h-full bg-black dark:bg-white"
            style={{ width: `${Math.round((mastered / allConsonants.length) * 100)}%` }}
          />
        </div>
        <div className="mt-2 text-xs opacity-70">
          已熟练 {mastered} / {allConsonants.length} · 本轮 {lessonItems.map((item) => item.front).join(" ")}
        </div>
      </section>

      {complete ? (
        <section className="card p-6 text-center">
          <div className="text-lg font-semibold">本轮完成</div>
          <div className="mt-1 text-sm opacity-70">
            得分 {correctCount} / {questions.length}，对应字母已经更新熟练度。
          </div>
          <button onClick={() => startLesson()} className="btn-primary mt-5 text-sm px-4 py-2">
            开始新课程
          </button>
        </section>
      ) : current ? (
        <QuestionCard
          question={current}
          picked={picked}
          progress={progress}
          onAnswer={answer}
          onNext={next}
          onLooked={markLooked}
        />
      ) : (
        <section className="card p-6 text-center text-sm opacity-70">正在生成课程...</section>
      )}
    </div>
  );
}

function QuestionCard({
  question,
  picked,
  progress,
  onAnswer,
  onNext,
  onLooked,
}: {
  question: Question;
  picked: string | null;
  progress: MasteryProgress;
  onAnswer: (id: string) => void;
  onNext: () => void;
  onLooked: () => void;
}) {
  const mastery = progress[question.item.id] || 0;

  if (question.kind === "look") {
    return (
      <section className="card p-7 text-center">
        <div className="text-xs opacity-60">先看一眼</div>
        <div className="thai-big mt-4 text-8xl leading-none">{question.item.front}</div>
        <div className="mt-4 text-xl font-semibold">{displayRoman(question.item.roman)}</div>
        <div className="thai-big mt-2 text-2xl">{question.item.name}</div>
        <div className="mt-1 text-sm opacity-70">{question.item.meaning}</div>
        <div className="mt-4"><PronounceButton text={question.item.speak} label="听" /></div>
        <div className="mt-5 text-xs opacity-70">熟练度 {mastery} / {MASTERY_TARGET}</div>
        <button onClick={onLooked} className="btn-primary mt-5 text-sm px-5 py-2">记住一点了</button>
      </section>
    );
  }

  const roman = displayRoman(question.item.roman);
  const prompt = question.kind === "sound" ? "这个字母读什么？" : `哪个字母读 ${roman}？`;

  return (
    <section className="space-y-4">
      <div className="card p-6 text-center">
        <div className="text-xs opacity-60">{prompt}</div>
        {question.kind === "sound" ? (
          <div className="thai-big mt-4 text-8xl leading-none">{question.item.front}</div>
        ) : (
          <div className="mt-4 text-4xl font-mono">{roman}</div>
        )}
        <div className="mt-4"><PronounceButton text={question.item.speak} label="听" /></div>
      </div>

      <ul className="grid grid-cols-2 gap-2">
        {question.choices.map((choice) => {
          const isPicked = picked === choice.id;
          const isCorrect = choice.id === question.item.id;
          const state = !picked
            ? "btn-ghost"
            : isCorrect
              ? "btn-primary bg-emerald-600 text-white dark:bg-emerald-500"
              : isPicked
                ? "btn-ghost ring-2 ring-rose-500"
                : "btn-ghost opacity-60";
          return (
            <li key={choice.id}>
              <button onClick={() => onAnswer(choice.id)} className={`${state} w-full min-h-16`}>
                {question.kind === "sound" ? (
                  <span className="font-mono text-lg">{displayRoman(choice.roman)}</span>
                ) : (
                  <span className="thai-big text-4xl leading-none">{choice.front}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {picked && (
        <div className="card p-3 text-sm">
          答案：<b>{roman}</b>
          <span className="thai-big ml-2">{question.item.front} {question.item.name}</span>
          <button onClick={onNext} className="btn-primary float-right -my-1 text-xs px-3 py-1.5">下一题</button>
        </div>
      )}
    </section>
  );
}
