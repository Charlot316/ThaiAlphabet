"use client";
import { useEffect, useMemo, useState } from "react";
import PronounceButton from "@/components/PronounceButton";
import TraceSvg from "@/components/TraceSvg";
import {
  MASTERY_TARGET,
  MasteryProgress,
  addMastery as recordMastery,
  applyWrongAnswer,
  loadMastery,
  resetMastery,
} from "@/lib/mastery";
import { StudyItem, buildStudyItems, displayRoman, shuffleStrong, uniqueChoices } from "@/lib/study";
import { markActive } from "@/lib/stats";
import { speak, warmupVoices } from "@/lib/tts";
import { feedbackComplete, feedbackCorrect, feedbackTap, feedbackWrong } from "@/lib/feedback";

const LAST_LESSON_KEY = "thai-alphabet:last-lesson:v1";
const LESSON_SIZE = 4;

type QuestionKind = "sound" | "letter" | "look" | "write";

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
      { id: `${item.id}:write`, kind: "write" as const, item, choices: [item] },
      { id: `${item.id}:sound`, kind: "sound" as const, item, choices: soundChoices },
      { id: `${item.id}:letter`, kind: "letter" as const, item, choices: letterChoices },
    ];
  });
  return shuffleStrong(questions);
}

const PRAISE = ["太棒了！", "做得好！", "完美！", "继续保持！", "答对了！", "厉害👏"];

export default function CoursePage() {
  const [pool, setPool] = useState<"consonant" | "vowel">("consonant");
  const allItems = useMemo(() => buildStudyItems().filter((item) => item.pool === pool), [pool]);
  const [progress, setProgress] = useState<MasteryProgress>({});
  const [lessonItems, setLessonItems] = useState<StudyItem[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const [praise, setPraise] = useState("");
  const [correctCount, setCorrectCount] = useState(0);

  const current = questions[index];
  const complete = questions.length > 0 && index >= questions.length;

  useEffect(() => {
    warmupVoices();
  }, []);

  // 完成时来一发庆祝音
  useEffect(() => {
    if (complete) feedbackComplete();
  }, [complete]);

  // 自动朗读：look / sound / write 进入题目时自动播放目标字母音
  useEffect(() => {
    if (!current) return;
    if (current.kind === "look" || current.kind === "sound" || current.kind === "write") {
      speak(current.item.speak);
    }
  }, [current]);

  const mastered = allItems.filter((item) => (progress[item.id] || 0) >= MASTERY_TARGET).length;
  const lessonProgress = questions.length === 0 ? 0 : Math.min(100, (index / questions.length) * 100);

  function startLesson(nextProgress = progress) {
    const pickedItems = pickLessonItems(allItems, nextProgress);
    setLessonItems(pickedItems);
    setQuestions(buildQuestions(pickedItems, allItems));
    setIndex(0);
    setPicked(null);
    setSubmitted(false);
    setFeedback(null);
    setPraise("");
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

  // 模式 sound：4 个读音中选正确读音 — 单击即提交
  function answerSound(id: string) {
    if (!current || submitted) return;
    setPicked(id);
    setSubmitted(true);
    const ok = id === current.item.id;
    if (ok) {
      gainMastery(current.item.id, 1);
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
      speak(current.item.speak);
    } else {
      setProgress(applyWrongAnswer(current.item.id, id));
      setFeedback("bad");
      feedbackWrong();
    }
  }

  // 模式 letter：4 个字母中选正确字母 — 单击预览（播音 + 选中），需点确认才提交
  function previewLetter(id: string) {
    if (!current || submitted) return;
    setPicked(id);
    const choice = current.choices.find((c) => c.id === id);
    if (choice) {
      feedbackTap();
      speak(choice.speak);
    }
  }

  function confirmLetter() {
    if (!current || submitted || !picked) return;
    setSubmitted(true);
    const ok = picked === current.item.id;
    if (ok) {
      gainMastery(current.item.id, 1);
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
      speak(current.item.speak);
    } else {
      setProgress(applyWrongAnswer(current.item.id, picked));
      setFeedback("bad");
      feedbackWrong();
    }
  }

  function next() {
    setPicked(null);
    setSubmitted(false);
    setFeedback(null);
    setIndex((v) => v + 1);
  }

  function markLooked() {
    if (!current) return;
    gainMastery(current.item.id, 1);
    setCorrectCount((v) => v + 1);
    markActive();
    next();
  }

  function markWrote() {
    if (!current) return;
    gainMastery(current.item.id, 1);
    setCorrectCount((v) => v + 1);
    markActive();
    feedbackComplete();
    setTimeout(() => next(), 800);
  }

  function resetProgress() {
    resetMastery();
    window.localStorage.removeItem(LAST_LESSON_KEY);
    const empty = {};
    setProgress(empty);
    startLesson(empty);
  }

  return (
    <div className="flex h-full flex-col gap-4">
      {/* 顶部：选择池 */}
      <div className="shrink-0 flex gap-2">
        <button
          onClick={() => setPool("consonant")}
          className={pool === "consonant" ? "btn-primary text-xs py-1.5 px-3" : "btn-ghost text-xs py-1.5 px-3"}
        >
          辅音
        </button>
        <button
          onClick={() => setPool("vowel")}
          className={pool === "vowel" ? "btn-primary text-xs py-1.5 px-3" : "btn-ghost text-xs py-1.5 px-3"}
        >
          元音
        </button>
      </div>

      {/* 进度条 + 重置 */}
      <div className="shrink-0">
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
        </div>

        {/* 总进度 chip */}
        <div className="card-soft mt-4 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="opacity-70">总熟练度</span>
            <span className="font-extrabold">{mastered} / {allItems.length}</span>
          </div>
          <div className="progress-track mt-2" style={{ height: "8px" }}>
            <div
              className="progress-fill"
              style={{ width: `${(mastered / allItems.length) * 100}%`, background: "linear-gradient(180deg, #ffe066, var(--duo-yellow))" }}
            />
          </div>
          <div className="mt-2 thai-big opacity-80">
            本轮: {lessonItems.map((item) => item.front).join(" ")}
          </div>
        </div>
      </div>

      {/* 中间：主要内容 */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {complete ? (
          <section className="card-soft p-7 text-center animate-pop">
            <div className="text-6xl">🎉</div>
            <div className="mt-3 text-xl font-extrabold" style={{ color: "var(--duo-green)" }}>
              本轮完成！
            </div>
            <div className="mt-1 text-sm opacity-70">
              答对 {correctCount} / {questions.length}
            </div>
            <button onClick={() => startLesson()} className="btn-primary mt-5 px-6">
              再来一轮
            </button>
          </section>
        ) : current ? (
          <QuestionCard
            question={current}
            picked={picked}
            submitted={submitted}
            progress={progress}
            feedback={feedback}
            praise={praise}
            onAnswerSound={answerSound}
            onPreviewLetter={previewLetter}
            onConfirmLetter={confirmLetter}
            onNext={next}
            onLooked={markLooked}
            onWrote={markWrote}
          />
        ) : (
          <section className="card-soft p-6 text-center text-sm opacity-70">正在生成课程...</section>
        )}
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  picked,
  submitted,
  progress,
  feedback,
  praise,
  onAnswerSound,
  onPreviewLetter,
  onConfirmLetter,
  onNext,
  onLooked,
  onWrote,
}: {
  question: Question;
  picked: string | null;
  submitted: boolean;
  progress: MasteryProgress;
  feedback: "ok" | "bad" | null;
  praise: string;
  onAnswerSound: (id: string) => void;
  onPreviewLetter: (id: string) => void;
  onConfirmLetter: () => void;
  onNext: () => void;
  onLooked: () => void;
  onWrote: () => void;
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
        <div className="mt-2 font-mono text-xs" style={{ color: "var(--duo-blue)" }}>
          🔊 应念: {question.item.phonetic}
        </div>
        <div className="mt-3">
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

  if (question.kind === "write") {
    return (
      <section className="space-y-3">
        <div className="card-soft p-5 flex flex-col items-center">
          <div className="chip chip-blue">书写</div>
          <div className="thai-big mt-3 text-5xl leading-none">{question.item.front}</div>
          {question.item.name && (
            <div className="thai-big mt-2 text-base opacity-80">{question.item.name}</div>
          )}
          <div className="mt-2 text-xs opacity-60">
            描红：拖小球沿轮廓走 · 熟练度 {mastery} / {MASTERY_TARGET}
          </div>
          <div className="mt-2">
            <PronounceButton text={question.item.speak} label="🔊 听一下" />
          </div>
        </div>
        <TraceSvg
          key={question.id}
          letter={question.item.front}
          onComplete={onWrote}
        />
        <button onClick={onWrote} className="btn-ghost w-full text-xs">
          跳过 →
        </button>
      </section>
    );
  }

  const roman = displayRoman(question.item.roman);
  const prompt = question.kind === "sound" ? "这个字母读什么？" : `哪个字母读 ${roman}？`;
  const correctAnswered = submitted && picked === question.item.id;
  const isLetterKind = question.kind === "letter";

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
        {isLetterKind && !submitted && (
          <div className="mt-3 text-[11px] opacity-60">点击字母可听读音，确认后提交</div>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {question.choices.map((choice) => {
          const isPicked = picked === choice.id;
          const isCorrect = choice.id === question.item.id;
          let cls = "opt";
          if (submitted) {
            if (isCorrect) cls = "opt opt-correct";
            else if (isPicked) cls = "opt opt-wrong";
            else cls = "opt opt-disabled";
          } else if (isPicked) {
            cls = "opt opt-selected";
          }
          return (
            <li key={choice.id}>
              <button
                onClick={() =>
                  isLetterKind ? onPreviewLetter(choice.id) : onAnswerSound(choice.id)
                }
                disabled={submitted}
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

      {isLetterKind && !submitted && (
        <button
          onClick={onConfirmLetter}
          disabled={!picked}
          className="btn-primary w-full"
        >
          确认
        </button>
      )}

      {submitted && (
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
