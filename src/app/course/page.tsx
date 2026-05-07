"use client";
import { useEffect, useMemo, useState } from "react";
import PronounceButton from "@/components/PronounceButton";
import { MASTERY_TARGET, MasteryProgress, addMastery as recordMastery, loadMastery, resetMastery } from "@/lib/mastery";
import { StudyItem, buildStudyItems, displayRoman, shuffleStrong, uniqueChoices } from "@/lib/study";
import { addXp, loseHeart, useStats } from "@/lib/stats";
import { speak } from "@/lib/tts";

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

const PRAISE = ["太棒了！", "做得好！", "完美！", "继续保持！", "答对了！", "厉害👏"];

export default function CoursePage() {
  const allConsonants = useMemo(() => buildStudyItems().filter((item) => item.pool === "consonant"), []);
  const stats = useStats();
  const [progress, setProgress] = useState<MasteryProgress>({});
  const [lessonItems, setLessonItems] = useState<StudyItem[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const [praise, setPraise] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  const current = questions[index];
  const complete = questions.length > 0 && index >= questions.length;
  const mastered = allConsonants.filter((item) => (progress[item.id] || 0) >= MASTERY_TARGET).length;
  const lessonProgress = questions.length === 0 ? 0 : Math.min(100, (index / questions.length) * 100);

  function startLesson(nextProgress = progress) {
    const pickedItems = pickLessonItems(allConsonants, nextProgress);
    setLessonItems(pickedItems);
    setQuestions(buildQuestions(pickedItems, allConsonants));
    setIndex(0);
    setPicked(null);
    setFeedback(null);
    setPraise("");
    setCorrectCount(0);
    setXpEarned(0);
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
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      addXp(2);
      setXpEarned((v) => v + 2);
      speak(current.item.speak);
    } else {
      setFeedback("bad");
      loseHeart();
    }
  }

  function next() {
    setPicked(null);
    setFeedback(null);
    setIndex((v) => v + 1);
  }

  function markLooked() {
    if (!current) return;
    gainMastery(current.item.id, 1);
    setCorrectCount((v) => v + 1);
    addXp(1);
    setXpEarned((v) => v + 1);
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
      {/* 顶部：进度条 + 退出 */}
      <div className="flex items-center gap-3">
        <button
          onClick={resetProgress}
          className="text-xl opacity-50 hover:opacity-100"
          aria-label="重置进度"
          title="重置熟练度"
        >
          ✕
        </button>
        <div className="progress-track flex-1">
          <div className="progress-fill" style={{ width: `${lessonProgress}%` }} />
        </div>
        <span className="stat text-sm">
          <span aria-hidden>❤️</span>
          <span style={{ color: "var(--duo-red)" }}>{stats.hearts}</span>
        </span>
      </div>

      {/* 总进度 chip */}
      <div className="card-soft p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="opacity-70">总熟练度</span>
          <span className="font-extrabold">{mastered} / {allConsonants.length}</span>
        </div>
        <div className="progress-track mt-2" style={{ height: "8px" }}>
          <div
            className="progress-fill"
            style={{ width: `${(mastered / allConsonants.length) * 100}%`, background: "linear-gradient(180deg, #ffe066, var(--duo-yellow))" }}
          />
        </div>
        <div className="mt-2 thai-big opacity-80">
          本轮: {lessonItems.map((item) => item.front).join(" ")}
        </div>
      </div>

      {/* 主题 */}
      {complete ? (
        <section className="card-soft p-7 text-center animate-pop">
          <div className="text-6xl">🎉</div>
          <div className="mt-3 text-xl font-extrabold" style={{ color: "var(--duo-green)" }}>
            本轮完成！
          </div>
          <div className="mt-1 text-sm opacity-70">
            答对 {correctCount} / {questions.length} · 获得 {xpEarned} XP
          </div>
          <button onClick={() => startLesson()} className="btn-primary mt-5 px-6">
            再来一轮
          </button>
        </section>
      ) : current ? (
        <QuestionCard
          question={current}
          picked={picked}
          progress={progress}
          feedback={feedback}
          praise={praise}
          onAnswer={answer}
          onNext={next}
          onLooked={markLooked}
        />
      ) : (
        <section className="card-soft p-6 text-center text-sm opacity-70">正在生成课程...</section>
      )}
    </div>
  );
}

function QuestionCard({
  question,
  picked,
  progress,
  feedback,
  praise,
  onAnswer,
  onNext,
  onLooked,
}: {
  question: Question;
  picked: string | null;
  progress: MasteryProgress;
  feedback: "ok" | "bad" | null;
  praise: string;
  onAnswer: (id: string) => void;
  onNext: () => void;
  onLooked: () => void;
}) {
  const mastery = progress[question.item.id] || 0;

  if (question.kind === "look") {
    return (
      <section className="card-soft p-7 text-center animate-pop">
        <div className="chip chip-blue">先看一眼</div>
        <div className="thai-big mt-5 text-8xl leading-none">{question.item.front}</div>
        <div className="mt-3 text-2xl font-extrabold" style={{ color: "var(--duo-blue)" }}>
          {displayRoman(question.item.roman)}
        </div>
        {question.item.name && (
          <div className="thai-big mt-2 text-2xl">{question.item.name}</div>
        )}
        {question.item.meaning && (
          <div className="mt-1 text-sm opacity-70">{question.item.meaning}</div>
        )}
        <div className="mt-4">
          <PronounceButton text={question.item.speak} label="🔊 听一下" />
        </div>
        <div className="mt-5 text-xs opacity-70">
          熟练度 {mastery} / {MASTERY_TARGET}
        </div>
        <button onClick={onLooked} className="btn-primary mt-5 w-full">
          记住一点了 ✨
        </button>
      </section>
    );
  }

  const roman = displayRoman(question.item.roman);
  const prompt = question.kind === "sound" ? "这个字母读什么？" : `哪个字母读 ${roman}？`;
  const correctAnswered = picked && picked === question.item.id;

  return (
    <section className="space-y-4">
      <div className={`card-soft p-6 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-blue">{prompt}</div>
        {question.kind === "sound" ? (
          <div className="thai-big mt-5 text-8xl leading-none">{question.item.front}</div>
        ) : (
          <div className="mt-5 text-5xl font-mono font-extrabold" style={{ color: "var(--duo-blue)" }}>
            {roman}
          </div>
        )}
        <div className="mt-4">
          <PronounceButton text={question.item.speak} label="🔊 听" />
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {question.choices.map((choice) => {
          const isPicked = picked === choice.id;
          const isCorrect = choice.id === question.item.id;
          let cls = "opt";
          if (picked) {
            if (isCorrect) cls = "opt opt-correct";
            else if (isPicked) cls = "opt opt-wrong";
            else cls = "opt opt-disabled";
          } else if (isPicked) cls = "opt opt-selected";
          return (
            <li key={choice.id}>
              <button
                onClick={() => onAnswer(choice.id)}
                disabled={!!picked}
                className={`${cls} min-h-[72px]`}
              >
                {question.kind === "sound" ? (
                  <span className="font-mono text-xl">{displayRoman(choice.roman)}</span>
                ) : (
                  <span className="thai-big text-4xl leading-none">{choice.front}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {picked && (
        <div className={`feedback ${correctAnswered ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-base">
                {correctAnswered ? <span>✅</span> : <span>❌</span>}
                <span>{correctAnswered ? praise : "正确答案是"}</span>
              </div>
              <div className="mt-1 text-sm font-bold">
                <span className="thai-big text-lg mr-2">{question.item.front}</span>
                {roman}
                {question.item.name && <span className="thai-big ml-2 opacity-80">{question.item.name}</span>}
              </div>
            </div>
            <button
              onClick={onNext}
              className={correctAnswered ? "btn-primary px-5" : "btn-red px-5"}
            >
              继续
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
