"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import PronounceButton from "@/components/PronounceButton";
import TraceSvg from "@/components/TraceSvg";
import {
  MASTERY_TARGET,
  MasteryProgress,
  addMastery as recordMastery,
  applyWrongAnswer,
  loadMastery,
  recordOutcome,
  resetMastery,
} from "@/lib/mastery";
import { StudyItem, buildStudyItems, displayRoman, shuffleStrong, uniqueChoices } from "@/lib/study";
import { markActive } from "@/lib/stats";
import { speak, warmupVoices } from "@/lib/tts";
import {
  feedbackCombo,
  feedbackComplete,
  feedbackCorrect,
  feedbackMatch,
  feedbackMismatch,
  feedbackReveal,
  feedbackTap,
  feedbackWrong,
} from "@/lib/feedback";

const LAST_LESSON_KEY = "thai-alphabet:last-lesson:v1";
const LESSON_SIZE = 6;

type QuestionKind =
  | "sound"
  | "letter"
  | "sound-blind"
  | "letter-blind"
  | "look"
  | "write"
  | "match"
  | "memory";

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
  // 每个音 8 题：1 look (介绍) + 1 sound + 1 letter + 1 sound-blind +
  // 1 letter-blind + 2 write + 1 memory。看一眼放在最前作为介绍，剩下用
  // round-robin 跨音穿插。最后再加 1 道 match 大题覆盖本轮所有字母。
  const perItem = lessonItems.map((item) => {
    const introduction: Question = {
      id: `${item.id}:look`,
      kind: "look",
      item,
      choices: [item],
    };
    const drills: Question[] = shuffleStrong([
      {
        id: `${item.id}:sound`,
        kind: "sound",
        item,
        choices: uniqueChoices(item, allItems, 4, (option) => option.roman),
      },
      {
        id: `${item.id}:letter`,
        kind: "letter",
        item,
        choices: uniqueChoices(item, allItems, 4, (option) => option.roman),
      },
      {
        id: `${item.id}:sound-blind`,
        kind: "sound-blind",
        item,
        choices: uniqueChoices(item, allItems, 4, (option) => option.roman),
      },
      {
        id: `${item.id}:letter-blind`,
        kind: "letter-blind",
        item,
        choices: uniqueChoices(item, allItems, 4, (option) => option.roman),
      },
      { id: `${item.id}:write:1`, kind: "write", item, choices: [item] },
      { id: `${item.id}:write:2`, kind: "write", item, choices: [item] },
      { id: `${item.id}:memory`, kind: "memory", item, choices: [item] },
    ]);
    return { introduction, drills };
  });

  // Round 0: 把所有音的 look 先放出来（介绍轮，按音顺序但随机化）
  const introRound = shuffleStrong(perItem.map((p) => p.introduction));

  // Round-robin：每"轮"从每个音里取一道练习题，本轮内打散；
  // 轮交界处如果连续两题同一个音，就交换一下避免相邻。
  const result: Question[] = [...introRound];
  const drillRounds = Math.max(...perItem.map((p) => p.drills.length));
  for (let round = 0; round < drillRounds; round++) {
    const slice = perItem
      .map((p) => p.drills[round])
      .filter((q): q is Question => Boolean(q));
    const shuffled = shuffleStrong(slice);
    const lastId = result[result.length - 1]?.item.id;
    if (shuffled[0]?.item.id === lastId && shuffled.length > 1) {
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }
    result.push(...shuffled);
  }

  // 末尾追加 1 道配对题，把本轮所有字母放在一起练习
  result.push({
    id: `match:${Date.now()}`,
    kind: "match",
    item: lessonItems[0],
    choices: lessonItems,
  });

  return result;
}

const PRAISE = ["太棒了！", "做得好！", "完美！", "继续保持！", "答对了！", "厉害👏"];

export default function CoursePage() {
  const allItems = useMemo(() => buildStudyItems(), []);
  const romanGroups = useMemo(() => {
    const groups: Record<string, StudyItem[]> = {};
    for (const item of allItems) {
      const roman = displayRoman(item.roman);
      groups[roman] = [...(groups[roman] ?? []), item];
    }
    return groups;
  }, [allItems]);
  const [progress, setProgress] = useState<MasteryProgress>({});
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

  const lessonProgress = questions.length === 0 ? 0 : Math.min(100, (index / questions.length) * 100);

  function startLesson(nextProgress = progress) {
    const pickedItems = pickLessonItems(allItems, nextProgress);
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

  // 答错后把同题型的 replay 题压到队列后面（重新抽选项）。
  function queueReplay(question: Question) {
    const fresh: Question = {
      ...question,
      id: `${question.id}:retry:${Date.now()}`,
      choices:
        question.kind === "sound" || question.kind === "letter"
          ? uniqueChoices(question.item, allItems, 4, (option) => option.roman)
          : question.choices,
    };
    setQuestions((qs) => [...qs, fresh]);
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
      queueReplay(current);
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
      queueReplay(current);
    }
  }

  function next() {
    setPicked(null);
    setSubmitted(false);
    setFeedback(null);
    setIndex((v) => v + 1);
  }

  // sound-blind / letter-blind：点选项即结算（不预览、不提示）
  function answerBlind(id: string) {
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
      queueReplay(current);
    }
  }

  // memory: 选 不认识 / 模糊 / 认识。中途点 "听音" 算偷看 → 结果只能算"模糊"或更差。
  // grade: 1=不认识, 2=模糊, 3=认识
  function answerMemory(grade: number, peeked: boolean) {
    if (!current || submitted) return;
    setSubmitted(true);
    const effective = peeked ? Math.min(grade, 2) : grade;
    const outcome = effective >= 3 ? "correct" : effective === 2 ? "hard" : "wrong";
    recordOutcome(current.item.id, outcome);
    setProgress(loadMastery());
    if (outcome === "correct") {
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
    } else if (outcome === "hard") {
      setFeedback("bad");
      feedbackTap();
      queueReplay(current);
    } else {
      setFeedback("bad");
      feedbackWrong();
      queueReplay(current);
    }
  }

  function completeMatch() {
    if (!current || submitted) return;
    setSubmitted(true);
    setCorrectCount((v) => v + 1);
    for (const item of current.choices) gainMastery(item.id, 1);
    setFeedback("ok");
    setPraise("全部配对成功！");
    markActive();
    feedbackComplete();
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
            onAnswerBlind={answerBlind}
            onAnswerMemory={answerMemory}
            onCompleteMatch={completeMatch}
            onNext={next}
            onLooked={markLooked}
            onWrote={markWrote}
            romanGroups={romanGroups}
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
  onAnswerBlind,
  onAnswerMemory,
  onCompleteMatch,
  onNext,
  onLooked,
  onWrote,
  romanGroups,
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
  onAnswerBlind: (id: string) => void;
  onAnswerMemory: (grade: number, peeked: boolean) => void;
  onCompleteMatch: () => void;
  onNext: () => void;
  onLooked: () => void;
  onWrote: () => void;
  romanGroups: Record<string, StudyItem[]>;
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
      <section className="space-y-2">
        <div className="card-soft flex items-center justify-between gap-3 px-3 py-2">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="chip chip-blue">书写</span>
            <span className="thai-big text-2xl leading-none">{question.item.front}</span>
            <span className="font-mono text-base font-extrabold" style={{ color: "var(--duo-blue)" }}>
              {displayRoman(question.item.roman)}
            </span>
          </div>
          <PronounceButton text={question.item.speak} label="🔊" />
        </div>
        <TraceSvg
          key={question.id}
          letter={question.item.front}
          strokeKey={question.item.id.startsWith("v:") ? question.item.id : undefined}
          onComplete={onWrote}
        />
        <button onClick={onWrote} className="btn-ghost w-full text-xs">跳过 →</button>
      </section>
    );
  }

  if (question.kind === "match") {
    return <MatchCard question={question} submitted={submitted} onComplete={onCompleteMatch} onNext={onNext} />;
  }

  if (question.kind === "memory") {
    return (
      <MemoryCard
        question={question}
        submitted={submitted}
        feedback={feedback}
        praise={praise}
        onGrade={onAnswerMemory}
        onNext={onNext}
      />
    );
  }

  const roman = displayRoman(question.item.roman);
  const isBlind = question.kind === "sound-blind" || question.kind === "letter-blind";
  const isSoundLike = question.kind === "sound" || question.kind === "sound-blind";
  const prompt = isSoundLike
    ? question.kind === "sound-blind"
      ? "这个字母读什么？(无提示)"
      : "这个字母读什么？"
    : question.kind === "letter-blind"
    ? `哪个字母读 ${roman}？(无提示)`
    : `哪个字母读 ${roman}？`;
  const correctAnswered = submitted && picked === question.item.id;
  const isLetterKind = question.kind === "letter"; // 只有非 blind 版才用 preview/confirm 流程

  const onPick = (choiceId: string) => {
    if (isBlind) onAnswerBlind(choiceId);
    else if (isLetterKind) onPreviewLetter(choiceId);
    else onAnswerSound(choiceId);
  };

  return (
    <section className="space-y-4">
      <div className={`card-soft p-6 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-blue">{prompt}</div>
        {isSoundLike ? (
          <div className="thai-big mt-5 text-8xl leading-none">{question.item.front}</div>
        ) : (
          <div className="mt-5 text-5xl font-mono font-extrabold" style={{ color: "var(--duo-blue)" }}>
            {roman}
          </div>
        )}
        {(!isBlind || submitted) && (
          <div className="mt-4">
            <PronounceButton text={question.item.speak} label="🔊 听" />
          </div>
        )}
        {isLetterKind && !submitted && (
          <div className="mt-3 text-[11px] opacity-60">点击字母可听读音，确认后提交</div>
        )}
        {isBlind && !submitted && (
          <div className="mt-3 text-[11px] opacity-60">无提示模式 · 点击选项即结算</div>
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
                onClick={() => onPick(choice.id)}
                disabled={submitted}
                className={`${cls} min-h-[72px]`}
              >
                {isSoundLike ? (
                  <span className="flex flex-col items-center gap-1">
                    <span className="font-mono text-xl">{displayRoman(choice.roman)}</span>
                    {submitted && !isBlind && (
                      <span className="thai-big text-xs opacity-70">
                        {(romanGroups[displayRoman(choice.roman)] ?? [choice]).map((item) => item.front).join(" ")}
                      </span>
                    )}
                    {submitted && isBlind && (
                      <span className="thai-big text-xs opacity-70">{choice.front}</span>
                    )}
                  </span>
                ) : (
                  <span className="flex flex-col items-center gap-1">
                    <span className="thai-big text-4xl leading-none">{choice.front}</span>
                    {submitted && (
                      <span className="font-mono text-xs opacity-70">{displayRoman(choice.roman)}</span>
                    )}
                  </span>
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

// 配对题：左列 thai 字母 / 右列 罗马音，点一边再点另一边尝试配对
function MatchCard({
  question,
  submitted,
  onComplete,
  onNext,
}: {
  question: Question;
  submitted: boolean;
  onComplete: () => void;
  onNext: () => void;
}) {
  const items = question.choices;
  const [leftOrder] = useState(() => shuffleStrong(items));
  const [rightOrder] = useState(() => shuffleStrong(items));
  // 左右各自跟踪已用过的 button id；按罗马音判定配对（同音不同字母可互配），
  // 所以左[X] 配对后右[X] 仍可被用来配 left[Y]（同 roman）。
  const [matchedLeft, setMatchedLeft] = useState<Set<string>>(new Set());
  const [matchedRight, setMatchedRight] = useState<Set<string>>(new Set());
  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const [pickedRight, setPickedRight] = useState<string | null>(null);
  const pickedLeftRef = useRef<string | null>(null);
  const pickedRightRef = useRef<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const completedRef = useRef(false);

  const clearPicks = () => {
    pickedLeftRef.current = null;
    pickedRightRef.current = null;
    setPickedLeft(null);
    setPickedRight(null);
  };

  const tryMatch = (leftId: string | null, rightId: string | null) => {
    if (!leftId || !rightId) return;
    const leftItem = items.find((i) => i.id === leftId);
    const rightItem = items.find((i) => i.id === rightId);
    if (!leftItem || !rightItem) return;
    if (leftItem.roman === rightItem.roman) {
      setMatchedLeft((s) => new Set(s).add(leftId));
      setMatchedRight((s) => new Set(s).add(rightId));
      const newStreak = streak + 1;
      setStreak(newStreak);
      setFlash("ok");
      if (newStreak >= 2) feedbackCombo(newStreak);
      else feedbackMatch();
      setTimeout(() => setFlash(null), 250);
    } else {
      setStreak(0);
      setFlash("bad");
      feedbackMismatch();
      setTimeout(() => setFlash(null), 350);
    }
  };

  const onLeft = (id: string) => {
    if (submitted || matchedLeft.has(id)) return;
    feedbackTap();
    const rightPick = pickedRightRef.current;
    if (rightPick) {
      clearPicks();
      tryMatch(id, rightPick);
      return;
    }
    const next = pickedLeftRef.current === id ? null : id;
    pickedLeftRef.current = next;
    setPickedLeft(next);
  };
  const onRight = (id: string) => {
    if (submitted || matchedRight.has(id)) return;
    feedbackTap();
    const leftPick = pickedLeftRef.current;
    if (leftPick) {
      clearPicks();
      tryMatch(leftPick, id);
      return;
    }
    const next = pickedRightRef.current === id ? null : id;
    pickedRightRef.current = next;
    setPickedRight(next);
  };

  useEffect(() => {
    if (matchedLeft.size === items.length && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [matchedLeft, items.length, onComplete]);

  return (
    <section className={`space-y-4 ${flash === "bad" ? "animate-shake" : ""}`}>
      <div className="card-soft p-5 text-center">
        <div className="chip chip-yellow">配对 · 把字母和读音连起来</div>
        <div className="mt-3 flex items-center justify-center gap-3 text-sm">
          <span className="opacity-70">已配对 {matchedLeft.size} / {items.length}</span>
          {streak >= 2 && (
            <span className="font-extrabold animate-pop" style={{ color: "var(--duo-orange)" }}>
              连击 ×{streak} 🔥
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ul className="space-y-2">
          {leftOrder.map((it) => {
            const ok = matchedLeft.has(it.id);
            const isPicked = pickedLeft === it.id;
            const cls = ok ? "opt opt-correct" : isPicked ? "opt opt-selected" : "opt";
            return (
              <li key={`L-${it.id}`}>
                <button onClick={() => onLeft(it.id)} disabled={ok} className={`${cls} flex min-h-[72px] w-full items-center justify-center`}>
                  <span className="thai-big text-3xl leading-none">{it.front}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2">
          {rightOrder.map((it) => {
            const ok = matchedRight.has(it.id);
            const isPicked = pickedRight === it.id;
            const cls = ok ? "opt opt-correct" : isPicked ? "opt opt-selected" : "opt";
            return (
              <li key={`R-${it.id}`}>
                <button onClick={() => onRight(it.id)} disabled={ok} className={`${cls} flex min-h-[72px] w-full items-center justify-center`}>
                  <span className="font-mono text-lg leading-none">{displayRoman(it.roman)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {submitted && (
        <div className="feedback feedback-ok animate-pop">
          <div className="flex items-center justify-between gap-3">
            <div className="text-base">🎉 全部配对成功！</div>
            <button onClick={onNext} className="btn-primary px-5">继续</button>
          </div>
        </div>
      )}
    </section>
  );
}

// 记忆模式：题干（front）只显示字符，必须按 不认识/模糊/认识 才出答案。
// 提前点击 🔊 偷听音 → 算"模糊"为上限。
function MemoryCard({
  question,
  submitted,
  feedback,
  praise,
  onGrade,
  onNext,
}: {
  question: Question;
  submitted: boolean;
  feedback: "ok" | "bad" | null;
  praise: string;
  onGrade: (grade: number, peeked: boolean) => void;
  onNext: () => void;
}) {
  const [peeked, setPeeked] = useState(false);
  return (
    <section className="space-y-4">
      <div className={`card-soft p-7 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-low">记忆 · 不偷看答案</div>
        <div className="thai-big mt-5 text-8xl leading-none">{question.item.front}</div>
        {!submitted && (
          <button
            onClick={() => {
              setPeeked(true);
              feedbackReveal();
              speak(question.item.speak);
            }}
            className="btn-ghost mt-5 px-5 text-xs"
          >
            🔊 偷听一下（会按&ldquo;模糊&rdquo;封顶）
          </button>
        )}
        {submitted && (
          <div className="mt-5 space-y-1">
            <div className="text-2xl font-extrabold" style={{ color: "var(--duo-blue)" }}>
              {displayRoman(question.item.roman)}
            </div>
            {question.item.name && <div className="thai-big text-base opacity-80">{question.item.name}</div>}
            <div className="font-mono text-xs opacity-70">🔊 应念: {question.item.phonetic}</div>
            <div className="mt-2"><PronounceButton text={question.item.speak} label="🔊 听" /></div>
          </div>
        )}
      </div>
      {!submitted ? (
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => onGrade(1, peeked)} className="btn-red text-sm">不认识</button>
          <button onClick={() => onGrade(2, peeked)} className="btn-orange text-sm">模糊</button>
          <button onClick={() => onGrade(3, peeked)} className="btn-primary text-sm">认识 ✓</button>
        </div>
      ) : (
        <div className={`feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex items-center justify-between gap-3">
            <div className="text-base">{feedback === "ok" ? `${praise || "答对了！"}` : "再试试看！"}</div>
            <button onClick={onNext} className={feedback === "ok" ? "btn-primary px-5" : "btn-red px-5"}>继续</button>
          </div>
        </div>
      )}
    </section>
  );
}
