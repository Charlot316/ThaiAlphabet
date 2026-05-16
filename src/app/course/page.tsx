"use client";
import {
  BookOpen,
  Check,
  Dumbbell,
  LockKeyhole,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import PronounceButton from "@/components/PronounceButton";
import TraceSvg from "@/components/TraceSvg";
import { CONSONANT_BY_ID } from "@/data/consonants";
import { VOWEL_BY_ID } from "@/data/vowels";
import {
  CourseLesson,
  CourseProgress,
  MAIN_COURSE,
  PRACTICE_MODES,
  PracticeMode,
  completeCourseLesson,
  filterUnlockedItems,
  homophoneGroups,
  lessonStatus,
  loadCourseProgress,
  nextLesson,
  resetCourseProgress,
  shapeGroups,
  studyItemsByIds,
  unlockedItemIds,
  vowelLengthGroups,
} from "@/lib/curriculum";
import {
  MASTERY_TARGET,
  MasteryProgress,
  addMastery as recordMastery,
  applyWrongAnswer,
  loadMastery,
  recordOutcome,
  resetMastery,
} from "@/lib/mastery";
import {
  StudyItem,
  buildStudyItems,
  displayRoman,
  shuffleStrong,
  uniqueChoices,
} from "@/lib/study";
import { renderSyllableThai } from "@/lib/syllable";
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

type QuestionKind =
  | "sound"
  | "letter"
  | "font-sound"
  | "font-letter"
  | "sound-blind"
  | "letter-blind"
  | "look"
  | "write"
  | "match"
  | "memory"
  | "class"
  | "length"
  | "syllable-sound"
  | "syllable-letter";

interface SyllableChoice {
  id: string;
  front: string;
  roman: string;
  speak: string;
  componentIds: string[];
}

interface ThaiFontVariant {
  label: string;
  className: string;
  note: string;
}

interface Question {
  id: string;
  kind: QuestionKind;
  item: StudyItem;
  choices: StudyItem[];
  fontVariant?: ThaiFontVariant;
  syllable?: SyllableChoice;
  syllableChoices?: SyllableChoice[];
}

interface ActiveSession {
  title: string;
  subtitle: string;
  lessonId?: string;
  mode: "lesson" | "practice";
  kind: CourseLesson["kind"] | PracticeMode["id"];
  items: StudyItem[];
  choiceItems: StudyItem[];
}

type QuestionKindKey =
  | "sound"
  | "letter"
  | "fontSound"
  | "fontLetter"
  | "write1"
  | "write2"
  | "memory"
  | "soundBlind"
  | "letterBlind"
  | "class1"
  | "class2"
  | "length1"
  | "length2";

const THAI_FONT_VARIANTS: ThaiFontVariant[] = [
  { label: "Noto Sans Thai", className: "thai-big thai-font-noto", note: "无圈印刷体" },
  { label: "Prompt", className: "thai-big thai-font-prompt", note: "现代简化字形" },
  { label: "Kanit", className: "thai-big thai-font-kanit", note: "屏幕/标题常见" },
  { label: "Sarabun", className: "thai-big thai-font-sarabun", note: "正文和文件常见" },
];

function fontVariantFor(item: StudyItem, salt: string): ThaiFontVariant {
  const seed = [...`${item.id}:${salt}`].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return THAI_FONT_VARIANTS[seed % THAI_FONT_VARIANTS.length];
}

function makeQuestion(
  item: StudyItem,
  kind: QuestionKindKey,
  allItems: StudyItem[]
): Question {
  const samePool = allItems.filter((option) => option.pool === item.pool);
  const choicePool = samePool.length >= 2 ? samePool : allItems;
  switch (kind) {
    case "sound":
      return {
        id: `${item.id}:sound`,
        kind: "sound",
        item,
        choices: uniqueChoices(item, choicePool, 4, (o) => o.roman),
      };
    case "letter":
      return {
        id: `${item.id}:letter`,
        kind: "letter",
        item,
        choices: uniqueChoices(item, choicePool, 4, (o) => o.roman),
      };
    case "fontSound":
      return {
        id: `${item.id}:font-sound`,
        kind: "font-sound",
        item,
        choices: uniqueChoices(item, choicePool, 4, (o) => o.roman),
        fontVariant: fontVariantFor(item, "sound"),
      };
    case "fontLetter":
      return {
        id: `${item.id}:font-letter`,
        kind: "font-letter",
        item,
        choices: uniqueChoices(item, choicePool, 4, (o) => o.roman),
        fontVariant: fontVariantFor(item, "letter"),
      };
    case "write1":
      return { id: `${item.id}:write:1`, kind: "write", item, choices: [item] };
    case "write2":
      return { id: `${item.id}:write:2`, kind: "write", item, choices: [item] };
    case "memory":
      return { id: `${item.id}:memory`, kind: "memory", item, choices: [item] };
    case "soundBlind":
      return {
        id: `${item.id}:sound-blind`,
        kind: "sound-blind",
        item,
        choices: uniqueChoices(item, choicePool, 4, (o) => o.roman),
      };
    case "letterBlind":
      return {
        id: `${item.id}:letter-blind`,
        kind: "letter-blind",
        item,
        choices: uniqueChoices(item, choicePool, 4, (o) => o.roman),
      };
    case "class1":
    case "class2":
      return { id: `${item.id}:class:${kind}`, kind: "class", item, choices: [item] };
    case "length1":
    case "length2":
      return { id: `${item.id}:length:${kind}`, kind: "length", item, choices: [item] };
  }
}

function normalizeVowelRoman(roman: string): string {
  return roman.replace("(open)", "");
}

function makeSyllableChoice(consonant: StudyItem, vowel: StudyItem): SyllableChoice | null {
  if (!consonant.id.startsWith("c:") || !vowel.id.startsWith("v:")) return null;
  const cData = CONSONANT_BY_ID[consonant.id.slice(2)];
  const vData = VOWEL_BY_ID[vowel.id.slice(2)];
  if (!cData || !vData || !vData.form.includes("◌")) return null;
  const front = renderSyllableThai(cData, null, vData, null, "none");
  const init = cData.romanInitial === "ʔ" ? "" : cData.romanInitial;
  const roman = `${init}${normalizeVowelRoman(vData.roman)}`;
  return {
    id: `s:${consonant.id}:${vowel.id}`,
    front,
    roman,
    speak: front,
    componentIds: [consonant.id, vowel.id],
  };
}

function buildSyllableBank(items: StudyItem[], limit = 8): SyllableChoice[] {
  const consonants = items.filter((item) => item.pool === "consonant");
  const vowels = items.filter((item) => item.pool === "vowel");
  const seen = new Set<string>();
  const out: SyllableChoice[] = [];
  for (const consonant of shuffleStrong(consonants)) {
    for (const vowel of shuffleStrong(vowels)) {
      const syllable = makeSyllableChoice(consonant, vowel);
      if (!syllable || seen.has(syllable.roman)) continue;
      seen.add(syllable.roman);
      out.push(syllable);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

function uniqueSyllableChoices(
  correct: SyllableChoice,
  allOptions: SyllableChoice[],
  count: number
): SyllableChoice[] {
  const seen = new Set<string>([correct.roman]);
  const result = [correct];
  for (const option of shuffleStrong(allOptions)) {
    if (result.length >= count) break;
    if (seen.has(option.roman)) continue;
    seen.add(option.roman);
    result.push(option);
  }
  return shuffleStrong(result);
}

function makeSyllableQuestion(
  syllable: SyllableChoice,
  kind: "syllable-sound" | "syllable-letter",
  bank: SyllableChoice[],
  fallbackItem: StudyItem
): Question {
  return {
    id: `${syllable.id}:${kind}`,
    kind,
    item: fallbackItem,
    choices: [fallbackItem],
    syllable,
    syllableChoices: uniqueSyllableChoices(syllable, bank, 4),
  };
}

function buildQuestions(session: ActiveSession): Question[] {
  const lessonItems = session.items;
  const choiceItems = session.choiceItems.length ? session.choiceItems : lessonItems;
  const focusItems =
    session.mode === "practice" && session.kind === "random"
      ? lessonItems.slice(0, Math.min(6, lessonItems.length))
      : lessonItems;

  const introRound = focusItems.map((item) => ({
    id: `${item.id}:look`,
    kind: "look" as const,
    item,
    choices: [item],
  }));

  const pickRound = focusItems.map((item, idx) =>
    makeQuestion(item, idx % 2 === 0 ? "sound" : "letter", choiceItems)
  );

  const fontVariantRound = shuffleStrong(focusItems)
    .slice(0, Math.min(3, focusItems.length))
    .map((item, idx) =>
      makeQuestion(item, idx % 2 === 0 ? "fontSound" : "fontLetter", choiceItems)
    );

  const memoryRound = shuffleStrong(focusItems)
    .slice(0, Math.min(4, focusItems.length))
    .map((item) => makeQuestion(item, "memory", choiceItems));

  const writingRound =
    session.kind === "homophone" || session.kind === "shape"
      ? []
      : shuffleStrong(focusItems)
          .slice(0, Math.min(session.kind === "vowel-length" ? 0 : 2, focusItems.length))
          .map((item) => makeQuestion(item, "write1", choiceItems));

  const classOrLengthRound =
    session.kind === "vowel-length"
      ? focusItems
          .filter((item) => item.pool === "vowel")
          .slice(0, Math.min(4, focusItems.length))
          .map((item) => makeQuestion(item, "length1", choiceItems))
      : [];

  const syllableBank = session.kind === "blend" || session.kind === "review"
    ? buildSyllableBank(choiceItems, 10)
    : [];
  const syllableRound =
    syllableBank.length >= 2
      ? shuffleStrong(syllableBank)
          .slice(0, Math.min(4, syllableBank.length))
          .map((syllable, idx) =>
            makeSyllableQuestion(
              syllable,
              idx % 2 === 0 ? "syllable-sound" : "syllable-letter",
              syllableBank,
              focusItems[0]
            )
          )
      : [];

  const finalMatch =
    focusItems.length >= 2
      ? [{
          id: `match:${session.title}:${Date.now()}`,
          kind: "match" as const,
          item: focusItems[0],
          choices: focusItems,
        }]
      : [];

  return shuffleStrong([...introRound, ...pickRound]).concat(
    shuffleStrong([
      ...fontVariantRound,
      ...syllableRound,
      ...memoryRound,
      ...writingRound,
      ...classOrLengthRound,
    ]),
    finalMatch
  );
}

const PRAISE = ["太棒了！", "做得好！", "完美！", "继续保持！", "答对了！", "厉害👏"];

function isShortcutBlocked(event: KeyboardEvent): boolean {
  if (event.metaKey || event.ctrlKey || event.altKey) return true;
  const target = event.target;
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

function choiceIndexFromKey(event: KeyboardEvent, max: number): number | null {
  if (event.repeat) return null;
  const index = Number(event.key) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= max) return null;
  return index;
}

function isSpaceKey(event: KeyboardEvent): boolean {
  return event.key === " " || event.code === "Space";
}

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
  const [courseProgress, setCourseProgress] = useState<CourseProgress>({
    completedLessonIds: [],
    updatedAt: 0,
  });
  const [session, setSession] = useState<ActiveSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const [praise, setPraise] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [pendingMemoryCorrect, setPendingMemoryCorrect] = useState(false);
  const completedRecordedRef = useRef<string | null>(null);

  const current = questions[index];
  const complete = questions.length > 0 && index >= questions.length;
  const upcomingLesson = useMemo(() => nextLesson(courseProgress), [courseProgress]);
  const unlockedCount = useMemo(
    () => unlockedItemIds(courseProgress).size,
    [courseProgress]
  );

  useEffect(() => {
    warmupVoices();
  }, []);

  // 完成时来一发庆祝音
  useEffect(() => {
    if (!complete) return;
    feedbackComplete();
    if (session?.mode === "lesson" && session.lessonId && completedRecordedRef.current !== session.lessonId) {
      completedRecordedRef.current = session.lessonId;
      setCourseProgress(completeCourseLesson(session.lessonId));
    }
  }, [complete, session]);

  // 自动朗读：look / sound / write 进入题目时自动播放目标字母音
  useEffect(() => {
    if (!current) return;
    if (current.kind === "look" || current.kind === "sound" || current.kind === "write") {
      speak(current.item.speak);
    } else if (
      (current.kind === "syllable-sound" || current.kind === "syllable-letter") &&
      current.syllable
    ) {
      speak(current.syllable.speak);
    }
  }, [current]);

  const lessonProgress = questions.length === 0 ? 0 : Math.min(100, (index / questions.length) * 100);

  function beginSession(nextSession: ActiveSession) {
    completedRecordedRef.current = null;
    setSession(nextSession);
    setQuestions(buildQuestions(nextSession));
    setIndex(0);
    setPicked(null);
    setSubmitted(false);
    setFeedback(null);
    setPraise("");
    setCorrectCount(0);
    setPendingMemoryCorrect(false);
  }

  function selectLessonItems(lesson: CourseLesson): StudyItem[] {
    const raw = studyItemsByIds(allItems, lesson.itemIds);
    if (lesson.kind !== "review") return raw;
    return [...raw]
      .sort((a, b) => (progress[a.id] || 0) - (progress[b.id] || 0))
      .slice(0, Math.min(8, raw.length));
  }

  function startCourseLesson(lesson: CourseLesson) {
    const status = lessonStatus(lesson, courseProgress);
    if (status === "locked") return;
    const choiceIds = unlockedItemIds(courseProgress, lesson.id);
    const choiceItems = allItems.filter((item) => choiceIds.has(item.id));
    const items = selectLessonItems(lesson);
    beginSession({
      title: lesson.title,
      subtitle: lesson.subtitle,
      lessonId: lesson.id,
      mode: "lesson",
      kind: lesson.kind,
      items,
      choiceItems,
    });
  }

  function weakestGroup(groups: StudyItem[][]): StudyItem[] | null {
    if (groups.length === 0) return null;
    return [...groups].sort((a, b) => {
      const aScore = a.reduce((sum, item) => sum + (progress[item.id] || 0), 0) / a.length;
      const bScore = b.reduce((sum, item) => sum + (progress[item.id] || 0), 0) / b.length;
      return aScore - bScore;
    })[0];
  }

  function startPractice(mode: PracticeMode["id"]) {
    const unlocked = filterUnlockedItems(allItems, courseProgress);
    let items: StudyItem[] = [];
    const title = PRACTICE_MODES.find((m) => m.id === mode)?.title ?? "专项练习";
    let subtitle = PRACTICE_MODES.find((m) => m.id === mode)?.subtitle ?? "";

    if (mode === "random") {
      items = [...unlocked]
        .sort((a, b) => (progress[a.id] || 0) - (progress[b.id] || 0))
        .slice(0, Math.min(6, unlocked.length));
    } else if (mode === "homophone") {
      items = weakestGroup(homophoneGroups(unlocked)) ?? [];
      if (items.length > 0) subtitle = `这一组都读 ${displayRoman(items[0].roman)}`;
    } else if (mode === "shape") {
      items = weakestGroup(shapeGroups(unlocked)) ?? [];
    } else if (mode === "vowel-length") {
      items = weakestGroup(vowelLengthGroups(unlocked)) ?? [];
    }

    if (items.length === 0) return;
    beginSession({
      title,
      subtitle,
      mode: "practice",
      kind: mode,
      items,
      choiceItems: unlocked,
    });
  }

  useEffect(() => {
    const refresh = () => {
      setProgress(loadMastery());
      setCourseProgress(loadCourseProgress());
    };
    refresh();
    window.addEventListener("thai-alphabet:mastery", refresh);
    window.addEventListener("thai-alphabet:course-progress", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("thai-alphabet:mastery", refresh);
      window.removeEventListener("thai-alphabet:course-progress", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  function gainMastery(itemId: string, amount: number) {
    setProgress(recordMastery(itemId, amount));
  }

  function gainQuestionMastery(question: Question, amount: number) {
    const ids = question.syllable?.componentIds ?? [question.item.id];
    let next = progress;
    for (const id of ids) next = recordMastery(id, amount);
    setProgress(next);
  }

  function markQuestionWrong(question: Question) {
    const ids = question.syllable?.componentIds ?? [question.item.id];
    for (const id of ids) recordOutcome(id, "wrong");
    setProgress(loadMastery());
  }

  // 答错后把同题型的 replay 题压到队列后面（重新抽选项）。
  function queueReplay(question: Question) {
    const replayPool = session?.choiceItems ?? allItems;
    const fresh: Question = {
      ...question,
      id: `${question.id}:retry:${Date.now()}`,
      choices:
        question.kind === "sound" ||
        question.kind === "letter" ||
        question.kind === "font-sound" ||
        question.kind === "font-letter"
          ? uniqueChoices(question.item, replayPool, 4, (option) => option.roman)
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
    setPendingMemoryCorrect(false);
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

  function answerSyllable(id: string) {
    if (!current || submitted || !current.syllable || !current.syllableChoices) return;
    setPicked(id);
    setSubmitted(true);
    const pickedSyllable = current.syllableChoices.find((choice) => choice.id === id);
    const ok = pickedSyllable?.roman === current.syllable.roman;
    if (ok) {
      gainQuestionMastery(current, 1);
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
      speak(current.syllable.speak);
    } else {
      markQuestionWrong(current);
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
    speak(current.item.speak);
    const effective = peeked ? Math.min(grade, 2) : grade;
    const outcome = effective >= 3 ? "correct" : effective === 2 ? "hard" : "wrong";
    if (outcome === "correct") {
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      setPendingMemoryCorrect(true);
      feedbackCorrect();
    } else if (outcome === "hard") {
      recordOutcome(current.item.id, outcome);
      setProgress(loadMastery());
      setFeedback("bad");
      feedbackTap();
      queueReplay(current);
    } else {
      recordOutcome(current.item.id, outcome);
      setProgress(loadMastery());
      setFeedback("bad");
      feedbackWrong();
      queueReplay(current);
    }
  }

  function confirmMemoryAnswer() {
    if (current?.kind === "memory" && submitted && pendingMemoryCorrect) {
      recordOutcome(current.item.id, "correct");
      setProgress(loadMastery());
      setCorrectCount((v) => v + 1);
      markActive();
    }
    next();
  }

  function markMemoryMistaken() {
    if (current?.kind !== "memory" || !submitted || !pendingMemoryCorrect) return;
    recordOutcome(current.item.id, "wrong");
    setProgress(loadMastery());
    queueReplay(current);
    feedbackWrong();
    next();
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

  function answerClass(correct: boolean) {
    if (!current || submitted) return;
    setSubmitted(true);
    if (correct) {
      gainMastery(current.item.id, 1);
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
    } else {
      setProgress(applyWrongAnswer(current.item.id));
      setFeedback("bad");
      feedbackWrong();
      queueReplay(current);
    }
  }

  function answerLength(correct: boolean) {
    if (!current || submitted) return;
    setSubmitted(true);
    if (correct) {
      gainMastery(current.item.id, 1);
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
    } else {
      setProgress(applyWrongAnswer(current.item.id));
      setFeedback("bad");
      feedbackWrong();
      queueReplay(current);
    }
  }

  function answerLook(correct: boolean) {
    if (!current) return;
    if (!correct) return;
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
    if (!confirm("清空课程进度和所有熟练度？")) return;
    resetMastery();
    resetCourseProgress();
    const empty = {};
    setProgress(empty);
    const reset = loadCourseProgress();
    setCourseProgress(reset);
    setSession(null);
    setQuestions([]);
  }

  if (!session) {
    return (
      <CourseHome
        progress={courseProgress}
        mastery={progress}
        unlockedCount={unlockedCount}
        upcomingLesson={upcomingLesson}
        allItems={allItems}
        onStartLesson={startCourseLesson}
        onStartPractice={startPractice}
        onReset={resetProgress}
      />
    );
  }

  return (
    <div className="flex h-full min-w-0 flex-col gap-4 overflow-x-hidden">
      {/* 进度条 + 重置 */}
      <div className="shrink-0">
        <div className="flex items-center justify-between gap-3 mb-1 px-1">
          <div className="min-w-0">
            <div className="text-[10px] font-bold opacity-40 tracking-wider uppercase">
              {session.mode === "lesson" ? "主线课程" : "专项练习"}
            </div>
            <div className="truncate text-sm font-semibold">{session.title}</div>
          </div>
          <div className="text-[10px] font-bold opacity-40">
            {index < questions.length ? `${index + 1} / ${questions.length}` : "完成"}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSession(null)}
            className="btn-ghost h-9 px-3 text-xs"
            aria-label="返回课程列表"
          >
            课程列表
          </button>
          <div className="progress-track flex-1">
            <div className="progress-fill" style={{ width: `${lessonProgress}%` }} />
          </div>
        </div>
      </div>

      {/* 中间：主要内容 */}
      <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden" style={{ touchAction: "pan-y" }}>
        {complete ? (
          <section className="card-soft p-7 text-center animate-pop">
            <div className="text-6xl">🎉</div>
            <div className="mt-3 text-xl font-extrabold" style={{ color: "var(--duo-green)" }}>
              本轮完成！
            </div>
            <div className="mt-1 text-sm opacity-70">
              答对 {correctCount} / {questions.length}
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {session.mode === "lesson" && upcomingLesson && (
                <button onClick={() => startCourseLesson(upcomingLesson)} className="btn-primary px-6">
                  下一课
                </button>
              )}
              <button onClick={() => beginSession(session)} className="btn-ghost px-5">
                复习本课
              </button>
              <button onClick={() => setSession(null)} className="btn-ghost px-5">
                回到列表
              </button>
            </div>
          </section>
        ) : current ? (
          <div className="min-w-0 max-w-full overflow-x-hidden">
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
              onAnswerClass={answerClass}
              onAnswerLength={answerLength}
              onAnswerSyllable={answerSyllable}
              onAnswerLook={answerLook}
              onCompleteMatch={completeMatch}
              onNext={next}
              onMemoryNext={confirmMemoryAnswer}
              onMemoryMistaken={markMemoryMistaken}
              canMarkMemoryMistaken={pendingMemoryCorrect}
              onWrote={markWrote}
              romanGroups={romanGroups}
            />
          </div>

        ) : (
          <section className="card-soft p-6 text-center text-sm opacity-70">请选择一节课程</section>
        )}
      </div>
    </div>
  );
}

const PATH_X = [50, 66, 58, 38, 30, 44, 62, 70, 52, 34];
const PATH_ROW_HEIGHT = 82;

function lessonKindMeta(kind: CourseLesson["kind"]): {
  label: string;
  Icon: LucideIcon;
  chip: string;
} {
  if (kind === "consonant") return { label: "辅音", Icon: Star, chip: "chip-high" };
  if (kind === "vowel") return { label: "元音", Icon: BookOpen, chip: "chip-yellow" };
  if (kind === "blend") return { label: "拼读", Icon: Sparkles, chip: "chip-blue" };
  return { label: "复习", Icon: Dumbbell, chip: "chip-low" };
}

function CourseHome({
  progress,
  mastery,
  unlockedCount,
  upcomingLesson,
  allItems,
  onStartLesson,
  onStartPractice,
  onReset,
}: {
  progress: CourseProgress;
  mastery: MasteryProgress;
  unlockedCount: number;
  upcomingLesson: CourseLesson | null;
  allItems: StudyItem[];
  onStartLesson: (lesson: CourseLesson) => void;
  onStartPractice: (mode: PracticeMode["id"]) => void;
  onReset: () => void;
}) {
  const unlocked = filterUnlockedItems(allItems, progress);
  const completed = progress.completedLessonIds.length;
  const completionPct = Math.round((completed / MAIN_COURSE.length) * 100);
  const masteredUnlocked = unlocked.filter((item) => (mastery[item.id] || 0) >= 60).length;
  const currentUnit = upcomingLesson?.unit ?? MAIN_COURSE[MAIN_COURSE.length - 1]?.unit;
  const currentLessonNumber = upcomingLesson
    ? MAIN_COURSE.findIndex((lesson) => lesson.id === upcomingLesson.id) + 1
    : MAIN_COURSE.length;
  const practiceAvailability: Record<PracticeMode["id"], number> = {
    random: unlocked.length,
    homophone: homophoneGroups(unlocked).length,
    shape: shapeGroups(unlocked).length,
    "vowel-length": vowelLengthGroups(unlocked).length,
  };

  const units = MAIN_COURSE.reduce<Record<string, CourseLesson[]>>((acc, lesson) => {
    acc[lesson.unit] = [...(acc[lesson.unit] ?? []), lesson];
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <section
        className="sticky top-0 z-10 overflow-hidden rounded-lg border p-3 sm:p-4"
        style={{
          background:
            "radial-gradient(circle at 84% 20%, rgba(40, 215, 244, 0.18), transparent 14rem), linear-gradient(135deg, rgba(8, 32, 44, 0.98), rgba(4, 14, 21, 0.98))",
          borderColor: "var(--duo-line-d)",
          boxShadow: "0 18px 36px rgba(0, 9, 16, 0.28)",
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
              第 {currentLessonNumber} / {MAIN_COURSE.length} 节
            </div>
            <h1 className="mt-0.5 truncate text-xl font-semibold sm:text-2xl">
              {currentUnit ?? "课程路径"}
            </h1>
            {upcomingLesson && (
              <div className="mt-0.5 truncate text-sm font-semibold" style={{ color: "var(--duo-blue-d)" }}>
                当前：{upcomingLesson.title}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:min-w-64">
            <div className="rounded-lg border px-3 py-1.5" style={{ borderColor: "var(--duo-line)", background: "rgba(255,255,255,0.025)" }}>
              <div className="text-lg font-semibold" style={{ color: "var(--duo-green-d)" }}>{completed}</div>
              <div className="opacity-65">已完成</div>
            </div>
            <div className="rounded-lg border px-3 py-1.5" style={{ borderColor: "var(--duo-line)", background: "rgba(255,255,255,0.025)" }}>
              <div className="text-lg font-semibold" style={{ color: "var(--duo-blue-d)" }}>{unlockedCount}</div>
              <div className="opacity-65">已解锁</div>
            </div>
            <div className="rounded-lg border px-3 py-1.5" style={{ borderColor: "var(--duo-line)", background: "rgba(255,255,255,0.025)" }}>
              <div className="text-lg font-semibold" style={{ color: "var(--duo-orange-d)" }}>{masteredUnlocked}</div>
              <div className="opacity-65">较熟悉</div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="progress-track h-2 flex-1">
            <div className="progress-fill" style={{ width: `${completionPct}%` }} />
          </div>
          <div className="w-12 text-right text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>
            {completionPct}%
          </div>
        </div>

        {upcomingLesson && (
          <button onClick={() => onStartLesson(upcomingLesson)} className="btn-primary mt-3 px-4 py-2 text-xs">
            继续学习
          </button>
        )}
      </section>

      <section
        className="relative overflow-hidden rounded-lg border px-2 py-4 sm:px-5"
        style={{
          borderColor: "var(--duo-line)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.004)), rgba(2, 10, 15, 0.38)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background: "linear-gradient(180deg, rgba(40, 215, 244, 0.08), transparent)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl">
          {Object.entries(units).map(([unit, lessons], unitIndex) => (
            <CoursePathUnit
              key={unit}
              unit={unit}
              unitIndex={unitIndex}
              lessons={lessons}
              progress={progress}
              allItems={allItems}
              onStartLesson={onStartLesson}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">训练场</h2>
            <div className="mt-0.5 text-xs" style={{ color: "var(--duo-muted)" }}>
              不影响主线，专门练已经解锁的内容。
            </div>
          </div>
          <button onClick={onReset} className="btn-ghost px-3 py-2 text-xs">
            重置
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRACTICE_MODES.map((mode) => {
            const disabled = practiceAvailability[mode.id] === 0;
            return (
              <button
                key={mode.id}
                onClick={() => onStartPractice(mode.id)}
                disabled={disabled}
                className="card group min-h-[8rem] p-4 text-left transition hover:-translate-y-0.5 disabled:opacity-45"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold">{mode.title}</div>
                  <span className="chip chip-blue">{practiceAvailability[mode.id]}</span>
                </div>
                <div className="mt-2 text-sm leading-5" style={{ color: "var(--duo-muted)" }}>
                  {mode.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function CoursePathUnit({
  unit,
  unitIndex,
  lessons,
  progress,
  allItems,
  onStartLesson,
}: {
  unit: string;
  unitIndex: number;
  lessons: CourseLesson[];
  progress: CourseProgress;
  allItems: StudyItem[];
  onStartLesson: (lesson: CourseLesson) => void;
}) {
  const height = lessons.length * PATH_ROW_HEIGHT + 28;
  const points = lessons
    .map((_, index) => {
      const x = PATH_X[(index + unitIndex * 2) % PATH_X.length];
      return `${x},${index * PATH_ROW_HEIGHT + 40}`;
    })
    .join(" ");

  return (
    <div className="relative pb-3">
      <div
        className="mx-auto mb-3 flex max-w-sm items-center justify-between gap-3 rounded-lg border px-4 py-2.5"
        style={{
          borderColor: "var(--duo-line-d)",
          background: "linear-gradient(180deg, rgba(40, 215, 244, 0.09), rgba(40, 215, 244, 0.025))",
        }}
      >
        <div>
          <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
            第 {unitIndex + 1} 阶段
          </div>
          <div className="mt-0.5 text-sm font-semibold sm:text-base">{unit.replace(/^第.+?·\s*/, "")}</div>
        </div>
        <div className="text-xs" style={{ color: "var(--duo-muted)" }}>
          {lessons.length} 节
        </div>
      </div>

      <div className="relative mx-auto max-w-xl" style={{ height }}>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <polyline
            points={points}
            fill="none"
            stroke="rgba(130, 220, 245, 0.18)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 7"
          />
        </svg>

        {lessons.map((lesson, index) => {
          const x = PATH_X[(index + unitIndex * 2) % PATH_X.length];
          return (
            <CoursePathNode
              key={lesson.id}
              lesson={lesson}
              status={lessonStatus(lesson, progress)}
              preview={studyItemsByIds(allItems, lesson.itemIds).slice(0, 5).map((item) => item.front).join(" ")}
              x={x}
              y={index * PATH_ROW_HEIGHT}
              onStartLesson={onStartLesson}
            />
          );
        })}
      </div>
    </div>
  );
}

function CoursePathNode({
  lesson,
  status,
  preview,
  x,
  y,
  onStartLesson,
}: {
  lesson: CourseLesson;
  status: "done" | "current" | "locked";
  preview: string;
  x: number;
  y: number;
  onStartLesson: (lesson: CourseLesson) => void;
}) {
  const meta = lessonKindMeta(lesson.kind);
  const Icon = status === "done" ? Check : status === "locked" ? LockKeyhole : meta.Icon;
  const disabled = status === "locked";

  return (
    <div
      className="absolute flex -translate-x-1/2 flex-col items-center"
      style={{ left: `${x}%`, top: y }}
    >
      {status === "current" && (
        <div
          className="absolute -top-9 rounded-lg border px-3 py-1.5 text-xs font-semibold"
          style={{
            background: "var(--surface-solid)",
            borderColor: "rgba(40, 215, 244, 0.42)",
            color: "var(--duo-green-d)",
            boxShadow: "var(--shadow-cyan)",
          }}
        >
          开始
        </div>
      )}

      <button
        onClick={() => onStartLesson(lesson)}
        disabled={disabled}
        className="relative flex h-16 w-16 items-center justify-center rounded-full border transition hover:-translate-y-0.5 active:scale-95 disabled:cursor-not-allowed sm:h-[68px] sm:w-[68px]"
        style={{
          background:
            status === "done"
              ? "linear-gradient(180deg, rgba(40, 215, 244, 0.28), rgba(40, 215, 244, 0.12))"
              : status === "current"
              ? "linear-gradient(180deg, #4be7fb, #20c8eb)"
              : "linear-gradient(180deg, rgba(142, 167, 181, 0.18), rgba(142, 167, 181, 0.08))",
          borderColor:
            status === "current"
              ? "rgba(151, 242, 255, 0.78)"
              : status === "done"
              ? "rgba(40, 215, 244, 0.34)"
              : "rgba(130, 220, 245, 0.12)",
          boxShadow:
            status === "current"
              ? "0 0 0 7px rgba(40, 215, 244, 0.1), 0 16px 32px rgba(40, 215, 244, 0.18)"
              : status === "done"
              ? "0 12px 26px rgba(0, 9, 16, 0.24)"
              : "none",
          color: status === "current" ? "#021016" : status === "locked" ? "var(--duo-muted)" : "var(--duo-green-d)",
        }}
        aria-label={`${lesson.title}${status === "done" ? "，复习" : status === "current" ? "，开始" : "，未解锁"}`}
        title={`${lesson.title} · ${meta.label} · ${preview}`}
      >
        {status === "current" && (
          <span
            className="absolute inset-[-7px] rounded-full border"
            style={{ borderColor: "rgba(40, 215, 244, 0.36)" }}
            aria-hidden
          />
        )}
        <Icon size={26} strokeWidth={2.35} />
      </button>

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
  onAnswerClass,
  onAnswerLength,
  onAnswerSyllable,
  onAnswerLook,
  onCompleteMatch,
  onNext,
  onMemoryNext,
  onMemoryMistaken,
  canMarkMemoryMistaken,
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
  onAnswerClass: (correct: boolean) => void;
  onAnswerLength: (correct: boolean) => void;
  onAnswerSyllable: (id: string) => void;
  onAnswerLook: (correct: boolean) => void;
  onCompleteMatch: () => void;
  onNext: () => void;
  onMemoryNext: () => void;
  onMemoryMistaken: () => void;
  canMarkMemoryMistaken: boolean;
  onWrote: () => void;
  romanGroups: Record<string, StudyItem[]>;
}) {
  const mastery = progress[question.item.id] || 0;
  const isBlind = question.kind === "sound-blind" || question.kind === "letter-blind";
  const isFontSound = question.kind === "font-sound";
  const isFontLetter = question.kind === "font-letter";
  const isSoundLike = question.kind === "sound" || question.kind === "sound-blind" || isFontSound;
  const isLetterKind = question.kind === "letter" || isFontLetter;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (question.kind === "write" || question.kind === "match" || question.kind === "memory" || question.kind === "class" || question.kind === "length") {
        return;
      }

      if (question.kind === "look") {
        if (isSpaceKey(event) || event.key === "Enter") {
          event.preventDefault();
          onAnswerLook(true);
        }
        return;
      }

      if (submitted) {
        if (isSpaceKey(event)) {
          event.preventDefault();
          onNext();
        }
        return;
      }

      if (question.kind === "syllable-sound" || question.kind === "syllable-letter") {
        const choices = question.syllableChoices ?? [];
        const index = choiceIndexFromKey(event, Math.min(4, choices.length));
        if (index === null) return;
        event.preventDefault();
        onAnswerSyllable(choices[index].id);
        return;
      }

      if (isLetterKind && (isSpaceKey(event) || event.key === "Enter")) {
        if (!picked) return;
        event.preventDefault();
        onConfirmLetter();
        return;
      }

      const index = choiceIndexFromKey(event, Math.min(4, question.choices.length));
      if (index === null) return;
      event.preventDefault();
      const choiceId = question.choices[index].id;
      if (isBlind) onAnswerBlind(choiceId);
      else if (isLetterKind) onPreviewLetter(choiceId);
      else onAnswerSound(choiceId);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (question.kind === "look") {
    const isConsonant = question.item.id.startsWith("c:");
    return (
      <section className={`card-soft p-7 text-center animate-pop ${feedback === "bad" ? "animate-shake" : ""}`}>
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
        {isConsonant && (
          <div className="mt-1 text-xs font-bold" style={{ color: "var(--duo-purple)" }}>
            等级: {question.item.class === "mid" ? "中辅音" : question.item.class === "high" ? "高辅音" : "低辅音"}
          </div>
        )}
        {!isConsonant && question.item.length && (
          <div className="mt-1 text-xs font-bold" style={{ color: "var(--duo-purple)" }}>
            长度: {question.item.length === "short" ? "短元音" : "长元音"}
          </div>
        )}
        <div className="mt-3">
          <PronounceButton text={question.item.speak} label="🔊 听一下" />
        </div>

        <button onClick={() => onAnswerLook(true)} className="btn-primary mt-6 px-8">
          记住了，继续
        </button>

        <div className="mt-5 text-xs opacity-50">
          熟练度 {mastery} / {MASTERY_TARGET}
        </div>
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
    return (
      <MatchCard
        key={question.id}
        question={question}
        submitted={submitted}
        onComplete={onCompleteMatch}
        onNext={onNext}
      />
    );
  }

  if (question.kind === "class") {
    return (
      <ClassCard
        key={question.id}
        question={question}
        submitted={submitted}
        feedback={feedback}
        praise={praise}
        onAnswer={onAnswerClass}
        onNext={onNext}
      />
    );
  }

  if (question.kind === "length") {
    return (
      <LengthCard
        key={question.id}
        question={question}
        submitted={submitted}
        feedback={feedback}
        praise={praise}
        onAnswer={onAnswerLength}
        onNext={onNext}
      />
    );
  }

  if (question.kind === "memory") {
    return (
      <MemoryCard
        key={question.id}
        question={question}
        submitted={submitted}
        feedback={feedback}
        praise={praise}
        onGrade={onAnswerMemory}
        onNext={onMemoryNext}
        onMistaken={onMemoryMistaken}
        canMarkMistaken={canMarkMemoryMistaken}
      />
    );
  }

  if (question.kind === "syllable-sound" || question.kind === "syllable-letter") {
    return (
      <SyllableCard
        key={question.id}
        question={question}
        picked={picked}
        submitted={submitted}
        feedback={feedback}
        praise={praise}
        onPick={onAnswerSyllable}
        onNext={onNext}
      />
    );
  }

  const roman = displayRoman(question.item.roman);
  const isFontVariant = question.kind === "font-sound" || question.kind === "font-letter";
  const prompt = isSoundLike
    ? isFontSound
      ? "这个字体变体读什么？"
      : question.kind === "sound-blind"
      ? "这个字母读什么？(无提示)"
      : "这个字母读什么？"
    : isFontLetter
    ? `哪个字体变体读 ${roman}？`
    : question.kind === "letter-blind"
    ? `哪个字母读 ${roman}？(无提示)`
    : `哪个字母读 ${roman}？`;
  const correctAnswered = submitted && picked === question.item.id;
  const glyphClassName = question.fontVariant?.className ?? "thai-big";

  const onPick = (choiceId: string) => {
    if (isBlind) onAnswerBlind(choiceId);
    else if (isLetterKind) onPreviewLetter(choiceId);
    else onAnswerSound(choiceId);
  };

  return (
    <section className="space-y-4">
      <div className={`card-soft p-6 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-blue">{prompt}</div>
        {isFontVariant && question.fontVariant && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className="chip chip-low">{question.fontVariant.label}</span>
            <span
              className="chip"
              style={{
                background: "var(--surface-subtle)",
                borderColor: "var(--duo-line)",
                color: "var(--duo-muted)",
              }}
            >
              {question.fontVariant.note}
            </span>
          </div>
        )}
        {isSoundLike ? (
          <div className={`${glyphClassName} mt-5 text-8xl leading-none`}>
            {question.item.front}
          </div>
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
                    <span className={`${isFontLetter ? glyphClassName : "thai-big"} text-4xl leading-none`}>
                      {choice.front}
                    </span>
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

function SyllableCard({
  question,
  picked,
  submitted,
  feedback,
  praise,
  onPick,
  onNext,
}: {
  question: Question;
  picked: string | null;
  submitted: boolean;
  feedback: "ok" | "bad" | null;
  praise: string;
  onPick: (id: string) => void;
  onNext: () => void;
}) {
  const syllable = question.syllable;
  const choices = question.syllableChoices ?? [];
  if (!syllable) return null;
  const asksSound = question.kind === "syllable-sound";
  const prompt = asksSound ? "这个拼读读什么？" : `哪个拼读读 ${syllable.roman}？`;
  const correctAnswered = submitted && choices.find((choice) => choice.id === picked)?.roman === syllable.roman;

  return (
    <section className="space-y-4">
      <div className={`card-soft p-6 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-blue">原辅音拼读</div>
        <div className="mt-3 text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>{prompt}</div>
        {asksSound ? (
          <div className="thai-big mt-5 text-8xl leading-none">{syllable.front}</div>
        ) : (
          <div className="mt-5 font-mono text-5xl font-semibold" style={{ color: "var(--duo-green-d)" }}>
            {syllable.roman}
          </div>
        )}
        <div className="mt-4">
          <PronounceButton text={syllable.speak} label="🔊 听" />
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {choices.map((choice) => {
          const isPicked = picked === choice.id;
          const isCorrect = choice.roman === syllable.roman;
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
              <button onClick={() => onPick(choice.id)} disabled={submitted} className={`${cls} min-h-[76px]`}>
                {asksSound ? (
                  <span className="font-mono text-xl">{choice.roman}</span>
                ) : (
                  <span className="thai-big text-4xl leading-none">{choice.front}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {submitted && (
        <div className={`feedback ${correctAnswered ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div>{correctAnswered ? praise : "正确答案是"}</div>
              <div className="mt-1 text-sm font-bold">
                <span className="thai-big mr-2 text-lg">{syllable.front}</span>
                <span className="font-mono">{syllable.roman}</span>
              </div>
            </div>
            <button onClick={onNext} className={correctAnswered ? "btn-primary px-5" : "btn-red px-5"}>
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
      speak(leftItem.speak);
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

  const handlePointerPress = (event: ReactPointerEvent<HTMLButtonElement>, press: () => void) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    press();
  };

  const handleKeyboardPress = (event: ReactKeyboardEvent<HTMLButtonElement>, press: () => void) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    press();
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
            <span className="font-semibold animate-pop" style={{ color: "var(--duo-orange)" }}>
              连击 ×{streak}
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
                <button
                  onPointerDown={(event) => handlePointerPress(event, () => onLeft(it.id))}
                  onKeyDown={(event) => handleKeyboardPress(event, () => onLeft(it.id))}
                  disabled={ok}
                  className={`${cls} flex min-h-[72px] w-full items-center justify-center`}
                  style={{ touchAction: "none", userSelect: "none" }}
                >
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
                <button
                  onPointerDown={(event) => handlePointerPress(event, () => onRight(it.id))}
                  onKeyDown={(event) => handleKeyboardPress(event, () => onRight(it.id))}
                  disabled={ok}
                  className={`${cls} flex min-h-[72px] w-full items-center justify-center`}
                  style={{ touchAction: "none", userSelect: "none" }}
                >
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
  onMistaken,
  canMarkMistaken,
}: {
  question: Question;
  submitted: boolean;
  feedback: "ok" | "bad" | null;
  praise: string;
  onGrade: (grade: number, peeked: boolean) => void;
  onNext: () => void;
  onMistaken: () => void;
  canMarkMistaken: boolean;
}) {
  const [peeked, setPeeked] = useState(false);
  // 双保险：题目变化时显式 reset peeked。即便 React 复用了 instance（例如
  // queueReplay 改写 questions 数组导致 reconcile 行为微妙），也保证新题
  // 开始时 peeked=false，不会让上一题的偷看状态把"认识"降成"模糊"。
  useEffect(() => {
    setPeeked(false);
  }, [question.id]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (!submitted) {
        const index = choiceIndexFromKey(event, 3);
        if (index === null) return;
        if (peeked && index === 2) return;
        event.preventDefault();
        onGrade(index + 1, peeked);
        return;
      }
      if (isSpaceKey(event)) {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key === "Enter" && canMarkMistaken) {
        event.preventDefault();
        onMistaken();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

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
            🔊 偷听一下（&ldquo;认识&rdquo;会被降为&ldquo;模糊&rdquo;）
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
          <button onClick={() => onGrade(3, peeked)} className="btn-primary text-sm" disabled={peeked}>
            {peeked ? "认识 (已封顶)" : "认识 ✓"}
          </button>
        </div>
      ) : (
        <div className={`feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex items-center justify-between gap-3">
            <div className="text-base">{feedback === "ok" ? `${praise || "答对了！"}` : "再试试看！"}</div>
            <div className="flex flex-wrap justify-end gap-2">
              {canMarkMistaken && (
                <button onClick={onMistaken} className="btn-ghost px-4 text-xs">
                  认错了
                </button>
              )}
              <button onClick={onNext} className={feedback === "ok" ? "btn-primary px-5" : "btn-red px-5"}>继续</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ClassCard({
  question,
  submitted,
  feedback,
  praise,
  onAnswer,
  onNext,
}: {
  question: Question;
  submitted: boolean;
  feedback: "ok" | "bad" | null;
  praise: string;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);

  const OPTIONS = [
    { label: "中辅音", value: "mid", color: "var(--duo-blue)" },
    { label: "高辅音", value: "high", color: "var(--duo-green)" },
    { label: "低辅音", value: "low", color: "var(--duo-orange)" },
  ];

  const handlePick = (val: string) => {
    if (submitted) return;
    setPicked(val);
    onAnswer(val === question.item.class);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (submitted) {
        if (isSpaceKey(event)) {
          event.preventDefault();
          onNext();
        }
        return;
      }
      const index = choiceIndexFromKey(event, OPTIONS.length);
      if (index === null) return;
      event.preventDefault();
      handlePick(OPTIONS[index].value);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section className="space-y-4">
      <div className={`card-soft p-7 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-blue">判断辅音等级</div>
        <div className="thai-big mt-5 text-8xl leading-none">{question.item.front}</div>
        <div className="mt-3 text-2xl font-extrabold" style={{ color: "var(--duo-blue)" }}>
          {displayRoman(question.item.roman)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {OPTIONS.map((opt) => {
          const isCorrect = opt.value === question.item.class;
          const isPicked = picked === opt.value;
          let cls = "btn-ghost border-2";
          let style = {};

          if (submitted) {
            if (isCorrect) {
              cls = "btn-primary";
            } else if (isPicked) {
              cls = "btn-red";
            } else {
              cls = "btn-ghost opacity-40";
            }
          } else if (isPicked) {
            style = { borderColor: opt.color, color: opt.color };
          }

          return (
            <button
              key={opt.value}
              onClick={() => handlePick(opt.value)}
              disabled={submitted}
              className={`${cls} py-4 text-sm font-bold`}
              style={style}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className={`feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex items-center justify-between gap-3">
            <div className="text-base">
              {feedback === "ok" ? (
                <span>✅ {praise}</span>
              ) : (
                <span>❌ 正确答案：{OPTIONS.find(o => o.value === question.item.class)?.label}</span>
              )}
            </div>
            <button
              onClick={onNext}
              className={feedback === "ok" ? "btn-primary px-5" : "btn-red px-5"}
            >
              继续
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function LengthCard({
  question,
  submitted,
  feedback,
  praise,
  onAnswer,
  onNext,
}: {
  question: Question;
  submitted: boolean;
  feedback: "ok" | "bad" | null;
  praise: string;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);

  const OPTIONS = [
    { label: "短元音", value: "short" },
    { label: "长元音", value: "long" },
  ];

  const handlePick = (val: string) => {
    if (submitted) return;
    setPicked(val);
    onAnswer(val === question.item.length);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (submitted) {
        if (isSpaceKey(event)) {
          event.preventDefault();
          onNext();
        }
        return;
      }
      const index = choiceIndexFromKey(event, OPTIONS.length);
      if (index === null) return;
      event.preventDefault();
      handlePick(OPTIONS[index].value);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section className="space-y-4">
      <div className={`card-soft p-7 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-purple">判断元音长度</div>
        <div className="thai-big mt-5 text-8xl leading-none">{question.item.front}</div>
        <div className="mt-3 text-2xl font-extrabold" style={{ color: "var(--duo-blue)" }}>
          {displayRoman(question.item.roman)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((opt) => {
          const isCorrect = opt.value === question.item.length;
          const isPicked = picked === opt.value;
          let cls = "btn-ghost border-2";

          if (submitted) {
            if (isCorrect) cls = "btn-primary";
            else if (isPicked) cls = "btn-red";
            else cls = "btn-ghost opacity-40";
          }

          return (
            <button
              key={opt.value}
              onClick={() => handlePick(opt.value)}
              disabled={submitted}
              className={`${cls} py-5 text-base font-bold`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className={`feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex items-center justify-between gap-3">
            <div className="text-base">
              {feedback === "ok" ? (
                <span>✅ {praise}</span>
              ) : (
                <span>❌ 正确答案：{question.item.length === "long" ? "长元音" : "短元音"}</span>
              )}
            </div>
            <button
              onClick={onNext}
              className={feedback === "ok" ? "btn-primary px-5" : "btn-red px-5"}
            >
              继续
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
