"use client";
import Link from "next/link";
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
  useCallback,
  useMemo,
  useRef,
  useState,
  Suspense,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PronounceButton from "@/components/PronounceButton";
import TraceSvg from "@/components/TraceSvg";
import { CONSONANT_BY_ID } from "@/data/consonants";
import {
  TONE_MARKS,
  TONE_NAMES,
  calculateTone,
  syllableLifetime,
} from "@/data/tones";
import type { Consonant, ToneMark, ToneName, Vowel } from "@/data/types";
import { VOWEL_BY_ID } from "@/data/vowels";
import {
  CourseLesson,
  CourseProgress,
  MAIN_COURSE,
  PRACTICE_MODES,
  PracticeMode,
  UNIT_CHALLENGE_MISTAKE_LIMIT,
  completeCourseLesson,
  consonantClassItems,
  filterUnlockedItems,
  homophoneGroups,
  lessonStatus,
  markUnitSkipped,
  nextLesson,
  resetCourseProgress,
  shapeGroups,
  studyItemsByIds,
  unitStatus,
  unitStudyItemIds,
  unlockedItemIds,
  vowelLengthGroups,
} from "@/lib/curriculum";
import {
  getCourseProgressSnapshot,
  isCourseProgressReady,
  useCourseProgressState,
} from "@/lib/courseProgressStore";
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
import { renderSyllableThai, romanizeSyllable } from "@/lib/syllable";
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
  | "syllable-letter"
  | "syllable-compose"
  | "syllable-parts"
  | "syllable-vowel"
  | "syllable-initial"
  | "final-sound"
  | "tone-mark-symbol"
  | "tone-mark-name"
  | "tone-guide"
  | "tone-derive"
  | "live-dead";

interface SyllableChoice {
  id: string;
  front: string;
  roman: string;
  speak: string;
  componentIds: string[];
  consonantId: string;
  consonantFront: string;
  consonantRoman: string;
  vowelId: string;
  vowelFront: string;
  vowelRoman: string;
}

interface ToneMarkChoice {
  id: string;
  symbol: string;
  name: string;
  roman: string;
}

interface ToneSyllable {
  initial: Consonant;
  vowel: Vowel;
  finalConsonant: Consonant | null;
  toneMark: ToneMark;
  thai: string;
  roman: string;
  tone: ToneName;
  life: "live" | "dead";
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
  guided?: boolean;
  toneGuide?: ToneGuideKind;
  fontVariant?: ThaiFontVariant;
  syllable?: SyllableChoice;
  syllableChoices?: SyllableChoice[];
  toneMark?: ToneMarkChoice;
  toneMarkChoices?: ToneMarkChoice[];
  toneSyllable?: ToneSyllable;
}

type ToneGuideKind = "tone-system" | "mid-tone" | "high-tone" | "low-tone" | "live-dead";

interface ActiveSession {
  title: string;
  subtitle: string;
  lessonId?: string;
  unit?: string;
  mode: "lesson" | "practice" | "challenge";
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

const CONSONANT_CLASS_OPTIONS = [
  { label: "中辅音", value: "mid", color: "var(--duo-blue)" },
  { label: "高辅音", value: "high", color: "var(--duo-green)" },
  { label: "低辅音", value: "low", color: "var(--duo-orange)" },
];

const VOWEL_LENGTH_OPTIONS = [
  { label: "短元音", value: "short", color: "var(--duo-orange)" },
  { label: "长元音", value: "long", color: "var(--duo-blue)" },
];

const FINAL_SOUND_OPTIONS = [
  { label: "k · แม่กก", value: "k" },
  { label: "t · แม่กด", value: "t" },
  { label: "p · แม่กบ", value: "p" },
  { label: "ng · แม่กง", value: "ng" },
  { label: "n · แม่กน", value: "n" },
  { label: "m · แม่กม", value: "m" },
  { label: "y · แม่เกย", value: "y" },
  { label: "w · แม่เกอว", value: "w" },
  { label: "无尾音", value: "none" },
];

const COURSE_TONE_MARKS: ToneMarkChoice[] = TONE_MARKS
  .filter((mark) => mark.id !== "none")
  .map((mark) => ({
    id: mark.id,
    symbol: mark.symbol,
    name: mark.name,
    roman: mark.nameRoman,
  }));

function getConsonantClassLabel(value?: string): string {
  return CONSONANT_CLASS_OPTIONS.find((option) => option.value === value)?.label ?? "";
}

function getVowelLengthLabel(value?: string): string {
  return VOWEL_LENGTH_OPTIONS.find((option) => option.value === value)?.label ?? "";
}

function getFinalSoundLabel(value?: string): string {
  return FINAL_SOUND_OPTIONS.find((option) => option.value === value)?.label ?? "";
}

function finalSoundForItem(item: StudyItem): string | null {
  if (!item.id.startsWith("c:")) return null;
  return CONSONANT_BY_ID[item.id.slice(2)]?.finalSound ?? null;
}

function introAttributeFor(item: StudyItem) {
  if (item.pool === "consonant" && item.class) {
    return {
      kind: "class" as const,
      prompt: "先判断它属于哪一类辅音",
      correct: item.class,
      options: CONSONANT_CLASS_OPTIONS,
    };
  }
  if (item.pool === "vowel" && item.length) {
    return {
      kind: "length" as const,
      prompt: "先判断它是长元音还是短元音",
      correct: item.length,
      options: VOWEL_LENGTH_OPTIONS,
    };
  }
  return null;
}

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
    consonantId: consonant.id,
    consonantFront: consonant.front,
    consonantRoman: displayRoman(consonant.roman),
    vowelId: vowel.id,
    vowelFront: vowel.front,
    vowelRoman: displayRoman(vowel.roman),
  };
}

function buildSyllableBank(items: StudyItem[], limit = 8, uniqueByRoman = true): SyllableChoice[] {
  const consonants = items.filter((item) => item.pool === "consonant");
  const vowels = items.filter((item) => item.pool === "vowel");
  const seen = new Set<string>();
  const out: SyllableChoice[] = [];
  for (const consonant of shuffleStrong(consonants)) {
    for (const vowel of shuffleStrong(vowels)) {
      const syllable = makeSyllableChoice(consonant, vowel);
      const key = uniqueByRoman ? syllable?.roman : syllable?.id;
      if (!syllable || !key || seen.has(key)) continue;
      seen.add(key);
      out.push(syllable);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

type SyllableQuestionKind =
  | "syllable-sound"
  | "syllable-letter"
  | "syllable-compose"
  | "syllable-parts"
  | "syllable-vowel"
  | "syllable-initial";

function isSyllableQuestionKind(kind: QuestionKind): kind is SyllableQuestionKind {
  return kind.startsWith("syllable-");
}

function uniqueSyllableChoices(
  correct: SyllableChoice,
  allOptions: SyllableChoice[],
  count: number,
  kind: SyllableQuestionKind
): SyllableChoice[] {
  const keyFor = (option: SyllableChoice) => {
    if (kind === "syllable-parts") return `${option.consonantId}:${option.vowelId}`;
    if (kind === "syllable-vowel") return option.vowelId;
    if (kind === "syllable-initial") return option.consonantId;
    return option.roman;
  };
  const preferredPool =
    kind === "syllable-vowel"
      ? allOptions.filter((option) => option.consonantId === correct.consonantId)
      : kind === "syllable-initial"
        ? allOptions.filter((option) => option.vowelId === correct.vowelId)
        : allOptions;
  const pool = preferredPool.length >= count ? preferredPool : allOptions;
  const seen = new Set<string>([keyFor(correct)]);
  const result = [correct];
  for (const option of shuffleStrong(pool)) {
    if (result.length >= count) break;
    const key = keyFor(option);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(option);
  }
  return shuffleStrong(result);
}

function makeSyllableQuestion(
  syllable: SyllableChoice,
  kind: SyllableQuestionKind,
  bank: SyllableChoice[],
  fallbackItem: StudyItem
): Question {
  return {
    id: `${syllable.id}:${kind}`,
    kind,
    item: fallbackItem,
    choices: [fallbackItem],
    syllable,
    syllableChoices: uniqueSyllableChoices(syllable, bank, 4, kind),
  };
}

function makeFinalSoundQuestion(item: StudyItem): Question {
  return {
    id: `${item.id}:final-sound`,
    kind: "final-sound",
    item,
    choices: [item],
  };
}

function isFinalSoundLesson(session: ActiveSession): boolean {
  return /尾辅音|尾音|แม่|塞音尾|响音尾|滑音尾/.test(`${session.title} ${session.subtitle}`);
}

function isToneMarkLesson(session: ActiveSession): boolean {
  return /声调符号|声调|音调|วรรณยุกต์/.test(`${session.title} ${session.subtitle}`);
}

function makeToneMarkQuestion(
  toneMark: ToneMarkChoice,
  kind: "tone-mark-symbol" | "tone-mark-name",
  fallbackItem: StudyItem
): Question {
  return {
    id: `tone:${toneMark.id}:${kind}`,
    kind,
    item: fallbackItem,
    choices: [fallbackItem],
    toneMark,
    toneMarkChoices: shuffleStrong(COURSE_TONE_MARKS),
  };
}

function toneGuideKindForSession(session: ActiveSession): ToneGuideKind {
  const label = `${session.title} ${session.subtitle}`;
  if (/活音|死音|活死|尾辅音|尾音|塞音尾/.test(label)) return "live-dead";
  if (/中辅音/.test(label)) return "mid-tone";
  if (/高辅音/.test(label)) return "high-tone";
  if (/低辅音/.test(label)) return "low-tone";
  return "tone-system";
}

function makeToneGuideQuestion(session: ActiveSession, fallbackItem: StudyItem): Question {
  return {
    id: `tone-guide:${session.title}:${toneGuideKindForSession(session)}`,
    kind: "tone-guide",
    item: fallbackItem,
    choices: [fallbackItem],
    guided: true,
    toneGuide: toneGuideKindForSession(session),
  };
}

const TONE_SYLLABLE_BLOCKED_FINAL_IDS = new Set([
  "cho-chan",
  "cho-ching",
  "cho-chang",
  "do-chada",
  "to-patak",
  "tho-montho",
  "tho-phuthao",
  "so-so",
  "so-sala",
  "so-rusi",
  "so-suea",
  "kho-khuat",
  "kho-khon",
  "ho-hip",
  "ho-nokhuk",
  "fo-fa",
  "fo-fan",
  "pho-phueng",
  "pho-samphao",
  "o-ang",
]);

const TONE_SYLLABLE_ALLOWED_VOWELS = new Set([
  "a-short",
  "a-long",
  "i-short",
  "i-long",
  "ue-short",
  "ue-long",
  "u-short",
  "u-long",
  "e-short",
  "e-long",
  "ae-short",
  "ae-long",
  "o-short",
  "o-long",
  "oe-short",
  "or-long",
  "er-short",
  "er-long",
  "am",
  "ai-maimalai",
  "ao",
]);

const TONE_SYLLABLE_NO_FINAL_VOWELS = new Set(["am", "ai-maimalai", "ao"]);

function consonantsFromItems(items: StudyItem[]): Consonant[] {
  const seen = new Set<string>();
  const out: Consonant[] = [];
  for (const item of items) {
    if (item.pool !== "consonant") continue;
    const rawId = item.id.slice(2);
    const consonant = CONSONANT_BY_ID[rawId];
    if (!consonant || consonant.obsolete || seen.has(rawId)) continue;
    seen.add(rawId);
    out.push(consonant);
  }
  return out;
}

function vowelsFromItems(items: StudyItem[]): Vowel[] {
  const seen = new Set<string>();
  const out: Vowel[] = [];
  for (const item of items) {
    if (item.pool !== "vowel") continue;
    const rawId = item.id.slice(2);
    if (!TONE_SYLLABLE_ALLOWED_VOWELS.has(rawId)) continue;
    const vowel = VOWEL_BY_ID[rawId];
    if (!vowel || seen.has(rawId)) continue;
    seen.add(rawId);
    out.push(vowel);
  }
  return out;
}

function buildToneSyllableFromItems(
  items: StudyItem[],
  options: { withFinal?: boolean; allowMark?: boolean; requireFinal?: boolean } = {}
): ToneSyllable | null {
  const { withFinal = true, allowMark = true, requireFinal = false } = options;
  const initials = consonantsFromItems(items);
  const vowels = vowelsFromItems(items);
  if (initials.length === 0 || vowels.length === 0) return null;

  const initial = shuffleStrong(initials)[0];
  const vowel = shuffleStrong(vowels)[0];

  let finalConsonant: Consonant | null = null;
  if ((withFinal || requireFinal) && !TONE_SYLLABLE_NO_FINAL_VOWELS.has(vowel.id)) {
    const finalCandidates = initials.filter(
      (c) => c.finalSound !== "none" && !TONE_SYLLABLE_BLOCKED_FINAL_IDS.has(c.id)
    );
    if (finalCandidates.length > 0) {
      if (requireFinal || Math.random() < 0.55) finalConsonant = shuffleStrong(finalCandidates)[0];
    }
  }

  const possibleMarks: ToneMark[] = ["none"];
  if (allowMark) {
    if (initial.class === "mid") possibleMarks.push("ek", "tho", "tri", "chattawa");
    else possibleMarks.push("ek", "tho");
  }
  const mark = shuffleStrong(possibleMarks)[0];

  const finalSound = finalConsonant ? finalConsonant.finalSound : "none";
  const tone = calculateTone(initial.class, vowel.length, finalSound, mark);
  const life = syllableLifetime(vowel.length, finalSound);
  const thai = renderSyllableThai(initial, null, vowel, finalConsonant, mark);
  const roman = romanizeSyllable(initial, vowel, finalConsonant, tone);

  return { initial, vowel, finalConsonant, toneMark: mark, thai, roman, tone, life };
}

function makeToneDeriveQuestion(
  syllable: ToneSyllable,
  fallbackItem: StudyItem,
  guided = true
): Question {
  return {
    id: `tone-derive:${syllable.thai}:${syllable.toneMark}:${Math.random().toString(36).slice(2, 8)}`,
    kind: "tone-derive",
    item: fallbackItem,
    choices: [fallbackItem],
    guided,
    toneSyllable: syllable,
  };
}

function makeLiveDeadQuestion(
  syllable: ToneSyllable,
  fallbackItem: StudyItem,
  guided = true
): Question {
  return {
    id: `live-dead:${syllable.thai}:${Math.random().toString(36).slice(2, 8)}`,
    kind: "live-dead",
    item: fallbackItem,
    choices: [fallbackItem],
    guided,
    toneSyllable: syllable,
  };
}

function isToneRuleLesson(session: ActiveSession): boolean {
  return /声调推导|声调拼读|声调规则|声调综合|真实声调/.test(`${session.title} ${session.subtitle}`);
}

function isLiveDeadLesson(session: ActiveSession): boolean {
  return /活音|死音|活死|塞音尾|尾辅音|尾音/.test(`${session.title} ${session.subtitle}`);
}

function buildQuestions(session: ActiveSession): Question[] {
  const lessonItems = session.items;
  const choiceItems = session.choiceItems.length ? session.choiceItems : lessonItems;
  const isChallenge = session.mode === "challenge";
  const focusItems =
    session.mode === "practice" && session.kind === "random"
      ? lessonItems.slice(0, Math.min(6, lessonItems.length))
      : lessonItems;

  // 挑战测试跳过 introRound（"look" 卡只是预览，不算测试）
  const introRound: Question[] = isChallenge
    ? []
    : focusItems.map((item) => ({
        id: `${item.id}:look`,
        kind: "look",
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

  // 挑战测试中跳过 memory / writing 这种自评题型，只保留严格判定的题目
  const memoryRound = isChallenge
    ? []
    : shuffleStrong(focusItems)
        .slice(0, Math.min(4, focusItems.length))
        .map((item) => makeQuestion(item, "memory", choiceItems));

  const writingRound =
    isChallenge || session.kind === "homophone" || session.kind === "shape"
      ? []
      : shuffleStrong(focusItems)
          .slice(0, Math.min(session.kind === "vowel-length" ? 0 : 2, focusItems.length))
          .map((item) => makeQuestion(item, "write1", choiceItems));

  const classOrLengthRound =
    session.kind === "consonant-class"
      ? focusItems
          .filter((item) => item.pool === "consonant")
          .slice(0, Math.min(8, focusItems.length))
          .map((item) => makeQuestion(item, "class2", choiceItems))
      : session.kind === "vowel-length"
        ? focusItems
            .filter((item) => item.pool === "vowel")
            .slice(0, Math.min(4, focusItems.length))
            .map((item) => makeQuestion(item, "length2", choiceItems))
        : [];

  const syllableSourceItems = session.kind === "blend" ? lessonItems : choiceItems;
  const primarySyllableBank = session.kind === "blend" || session.kind === "review"
    ? buildSyllableBank(syllableSourceItems, 28, false)
    : [];
  const syllableBank =
    primarySyllableBank.length >= 4
      ? primarySyllableBank
      : session.kind === "blend" || session.kind === "review"
        ? buildSyllableBank(choiceItems, 28, false)
        : [];
  const syllableKinds: SyllableQuestionKind[] = [
    "syllable-compose",
    "syllable-sound",
    "syllable-letter",
    "syllable-parts",
    "syllable-vowel",
    "syllable-initial",
  ];
  const syllableRound =
    syllableBank.length >= 2
      ? shuffleStrong(syllableBank)
          .slice(0, Math.min(session.kind === "blend" ? 8 : 5, syllableBank.length))
          .map((syllable, idx) =>
            makeSyllableQuestion(
              syllable,
              syllableKinds[idx % syllableKinds.length],
              syllableBank,
              focusItems[0]
            )
          )
      : [];
  const finalSoundRound = isFinalSoundLesson(session)
    ? shuffleStrong(focusItems)
        .filter((item) => item.pool === "consonant" && finalSoundForItem(item))
        .slice(0, Math.min(6, focusItems.length))
        .map(makeFinalSoundQuestion)
    : [];
  const toneMarkRound = isToneMarkLesson(session)
    ? shuffleStrong(COURSE_TONE_MARKS).map((toneMark, idx) =>
        makeToneMarkQuestion(
          toneMark,
          idx % 2 === 0 ? "tone-mark-symbol" : "tone-mark-name",
          focusItems[0]
        )
      )
    : [];

  const wantsTonePractice = session.kind === "tone-rule" || isToneRuleLesson(session);
  const guidedTonePractice = !isChallenge;
  const toneGuideRound =
    wantsTonePractice && guidedTonePractice && focusItems[0]
      ? [makeToneGuideQuestion(session, focusItems[0])]
      : [];

  const toneDeriveTarget = session.kind === "tone-rule" ? 8 : isChallenge ? 5 : 4;
  const toneDeriveRound: Question[] = [];
  if (wantsTonePractice) {
    for (let i = 0; i < toneDeriveTarget * 3 && toneDeriveRound.length < toneDeriveTarget; i++) {
      const syllable = buildToneSyllableFromItems(focusItems, {
        withFinal: i % 2 === 1,
        allowMark: true,
      });
      if (syllable) toneDeriveRound.push(makeToneDeriveQuestion(syllable, focusItems[0], guidedTonePractice));
    }
  }

  const wantsLiveDeadPractice = session.kind === "tone-rule" || isLiveDeadLesson(session);

  const liveDeadTarget = session.kind === "tone-rule" ? 4 : 3;
  const liveDeadRound: Question[] = [];
  if (wantsLiveDeadPractice) {
    for (let i = 0; i < liveDeadTarget * 3 && liveDeadRound.length < liveDeadTarget; i++) {
      const syllable = buildToneSyllableFromItems(focusItems, {
        withFinal: true,
        allowMark: false,
        requireFinal: i % 2 === 0,
      });
      if (syllable) liveDeadRound.push(makeLiveDeadQuestion(syllable, focusItems[0], guidedTonePractice));
    }
  }

  const finalMatch =
    focusItems.length >= 2
      ? [{
          id: `match:${session.title}:${Date.now()}`,
          kind: "match" as const,
          item: focusItems[0],
          choices: focusItems,
        }]
      : [];

  // 声调规则专项练习：题目里只有 tone-derive / live-dead，不要其他题型
  if (session.kind === "tone-rule") {
    const tonePracticeBody = shuffleStrong([...toneDeriveRound, ...liveDeadRound]);
    if (tonePracticeBody.length === 0) return [];
    return toneGuideRound.concat(tonePracticeBody);
  }

  return introRound.concat(
    shuffleStrong(pickRound),
    shuffleStrong([
      ...fontVariantRound,
      ...syllableRound,
      ...memoryRound,
      ...writingRound,
      ...classOrLengthRound,
      ...finalSoundRound,
      ...toneMarkRound,
      ...toneGuideRound,
      ...toneDeriveRound,
      ...liveDeadRound,
    ]),
    finalMatch
  );
}

const PRAISE = ["太棒了！", "做得好！", "完美！", "继续保持！", "答对了！", "厉害👏"];
const COURSE_MATCH_SLOT_COUNT = 5;
const COURSE_MATCH_MIN_MATCHABLE = 4;
const COURSE_MATCH_MAX_NOT_FULL = 2;

interface CourseMatchBoard {
  leftSlots: (StudyItem | null)[];
  rightSlots: (StudyItem | null)[];
  leftQueue: StudyItem[];
  rightQueue: StudyItem[];
}

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

function multisetDiff(a: string[], b: string[]): string[] {
  const counts = new Map<string, number>();
  for (const x of b) counts.set(x, (counts.get(x) ?? 0) + 1);
  const out: string[] = [];
  for (const x of a) {
    const c = counts.get(x) ?? 0;
    if (c > 0) counts.set(x, c - 1);
    else out.push(x);
  }
  return out;
}

function courseMatchableCount(
  thisSlots: (StudyItem | null)[],
  otherSlots: (StudyItem | null)[]
): number {
  const otherCounts = new Map<string, number>();
  for (const s of otherSlots) {
    if (s) otherCounts.set(s.roman, (otherCounts.get(s.roman) ?? 0) + 1);
  }
  let count = 0;
  for (const s of thisSlots) {
    if (!s) continue;
    const c = otherCounts.get(s.roman) ?? 0;
    if (c > 0) {
      count++;
      otherCounts.set(s.roman, c - 1);
    }
  }
  return count;
}

function coursePickFullyMatchablePair(
  leftQueue: StudyItem[],
  rightQueue: StudyItem[],
  leftAfterClear: (StudyItem | null)[],
  rightAfterClear: (StudyItem | null)[]
): {
  leftItem: StudyItem;
  rightItem: StudyItem;
  leftQueue: StudyItem[];
  rightQueue: StudyItem[];
} | null {
  const leftRomans = leftAfterClear.filter(Boolean).map((s) => (s as StudyItem).roman);
  const rightRomans = rightAfterClear.filter(Boolean).map((s) => (s as StudyItem).roman);
  const lonelyLeft = multisetDiff(leftRomans, rightRomans);
  const lonelyRight = multisetDiff(rightRomans, leftRomans);

  if (lonelyLeft.length === 0 && lonelyRight.length === 0) {
    const leftItem = leftQueue[0];
    if (!leftItem) return null;
    const rightIdx = rightQueue.findIndex((it) => it.roman === leftItem.roman);
    if (rightIdx < 0) return null;
    return {
      leftItem,
      rightItem: rightQueue[rightIdx],
      leftQueue: leftQueue.slice(1),
      rightQueue: [...rightQueue.slice(0, rightIdx), ...rightQueue.slice(rightIdx + 1)],
    };
  }

  const leftIdx = leftQueue.findIndex((it) => it.roman === lonelyRight[0]);
  const rightIdx = rightQueue.findIndex((it) => it.roman === lonelyLeft[0]);
  if (leftIdx < 0 || rightIdx < 0) return null;
  return {
    leftItem: leftQueue[leftIdx],
    rightItem: rightQueue[rightIdx],
    leftQueue: [...leftQueue.slice(0, leftIdx), ...leftQueue.slice(leftIdx + 1)],
    rightQueue: [...rightQueue.slice(0, rightIdx), ...rightQueue.slice(rightIdx + 1)],
  };
}

function coursePickReplenishment(
  queue: StudyItem[],
  thisSlots: (StudyItem | null)[],
  otherSlots: (StudyItem | null)[]
): { item: StudyItem | null; queue: StudyItem[] } {
  if (queue.length === 0) return { item: null, queue };
  const otherRomans = new Set(otherSlots.filter(Boolean).map((s) => (s as StudyItem).roman));
  const thisIds = new Set(thisSlots.filter(Boolean).map((s) => (s as StudyItem).id));
  const activeTarget = Math.min(
    COURSE_MATCH_SLOT_COUNT,
    thisSlots.filter(Boolean).length + 1,
    otherSlots.filter(Boolean).length
  );
  const requiredMatchable = Math.min(COURSE_MATCH_MIN_MATCHABLE, activeTarget);
  const matchable = courseMatchableCount(thisSlots, otherSlots);

  if (matchable < requiredMatchable) {
    const idx = queue.findIndex((it) => otherRomans.has(it.roman) && !thisIds.has(it.id));
    if (idx >= 0) {
      return { item: queue[idx], queue: [...queue.slice(0, idx), ...queue.slice(idx + 1)] };
    }
  }

  const idx = queue.findIndex((it) => !thisIds.has(it.id));
  if (idx >= 0) {
    return { item: queue[idx], queue: [...queue.slice(0, idx), ...queue.slice(idx + 1)] };
  }
  return { item: queue[0], queue: queue.slice(1) };
}

function makeCourseMatchBoard(items: StudyItem[]): CourseMatchBoard {
  const slotCount = Math.min(COURSE_MATCH_SLOT_COUNT, items.length);
  const initialItems = shuffleStrong(items).slice(0, slotCount);
  const initialIds = new Set(initialItems.map((it) => it.id));
  const restItems = items.filter((it) => !initialIds.has(it.id));
  return {
    leftSlots: shuffleStrong(initialItems),
    rightSlots: shuffleStrong(initialItems),
    leftQueue: shuffleStrong(restItems),
    rightQueue: shuffleStrong(restItems),
  };
}

export default function CoursePage() {
  return (
    <Suspense
      fallback={
        <section className="card-soft p-5 text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>
          正在读取课程…
        </section>
      }
    >
      <CoursePageInner />
    </Suspense>
  );
}

function CoursePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const route = useMemo(
    () => ({
      unit: searchParams.get("unit"),
      lessonId: searchParams.get("lesson"),
    }),
    [searchParams]
  );
  const allItems = useMemo(() => buildStudyItems(), []);
  const romanGroups = useMemo(() => {
    const groups: Record<string, StudyItem[]> = {};
    for (const item of allItems) {
      const roman = displayRoman(item.roman);
      groups[roman] = [...(groups[roman] ?? []), item];
    }
    return groups;
  }, [allItems]);
  const [progress, setProgress] = useState<MasteryProgress>(() => loadMastery());
  const { progress: courseProgress, ready: progressReady } = useCourseProgressState();
  const [session, setSession] = useState<ActiveSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const [praise, setPraise] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [pendingMemoryCorrect, setPendingMemoryCorrect] = useState(false);
  const [focusedUnit, setFocusedUnit] = useState<string | null>(null);
  const completedRecordedRef = useRef<string | null>(null);
  const skippedRecordedRef = useRef<string | null>(null);
  const routeLessonStartedRef = useRef<string | null>(null);

  const refreshLocalProgress = useCallback(() => {
    const nextMastery = loadMastery();
    const nextCourseProgress = getCourseProgressSnapshot();
    setProgress(nextMastery);
    return { mastery: nextMastery, courseProgress: nextCourseProgress };
  }, []);

  const challengeFailed = session?.mode === "challenge" && mistakeCount > UNIT_CHALLENGE_MISTAKE_LIMIT;

  const current = challengeFailed ? undefined : questions[index];
  const complete = (questions.length > 0 && index >= questions.length) || challengeFailed;
  // Suspend derived progress values until the store has hydrated. Otherwise
  // `nextLesson` returns the very first lesson against an empty snapshot and
  // the page reports "back to lesson 1" before the real value lands.
  const upcomingLesson = useMemo(
    () => (progressReady ? nextLesson(courseProgress) : null),
    [courseProgress, progressReady]
  );
  const unlockedCount = useMemo(
    () => (progressReady ? unlockedItemIds(courseProgress).size : 0),
    [courseProgress, progressReady]
  );

  useEffect(() => {
    warmupVoices();
  }, []);

  // 完成时来一发庆祝音
  useEffect(() => {
    if (!complete) return;
    if (session?.mode === "challenge" && challengeFailed) {
      feedbackWrong();
      return;
    }
    feedbackComplete();
    if (session?.mode === "challenge" && session.unit && !challengeFailed && skippedRecordedRef.current !== session.unit) {
      skippedRecordedRef.current = session.unit;
      markUnitSkipped(session.unit);
      return;
    }
    if (session?.mode === "lesson" && session.lessonId && completedRecordedRef.current !== session.lessonId) {
      completedRecordedRef.current = session.lessonId;
      completeCourseLesson(session.lessonId);
    }
  }, [complete, session, challengeFailed]);

  // 自动朗读：look / sound / write 进入题目时自动播放目标字母音
  useEffect(() => {
    if (!current) return;
    if (current.kind === "look" || current.kind === "sound" || current.kind === "write") {
      speak(current.item.speak);
    } else if (isSyllableQuestionKind(current.kind) && current.syllable) {
      speak(current.syllable.speak);
    }
  }, [current]);

  const lessonProgress = questions.length === 0 ? 0 : Math.min(100, (index / questions.length) * 100);

  function beginSession(nextSession: ActiveSession) {
    completedRecordedRef.current = null;
    skippedRecordedRef.current = null;
    setSession(nextSession);
    setQuestions(buildQuestions(nextSession));
    setIndex(0);
    setPicked(null);
    setSubmitted(false);
    setFeedback(null);
    setPraise("");
    setCorrectCount(0);
    setMistakeCount(0);
    setPendingMemoryCorrect(false);
  }

  function startUnitChallenge(unit: string) {
    const allUnitItemIds = unitStudyItemIds(unit);
    const items = studyItemsByIds(allItems, allUnitItemIds);
    if (items.length === 0) return;
    beginSession({
      title: `${unit} · 挑战测试`,
      subtitle: `全单元混合测试，失误 ≤ ${UNIT_CHALLENGE_MISTAKE_LIMIT} 即可跳过本单元`,
      unit,
      mode: "challenge",
      kind: "review",
      items,
      choiceItems: items,
    });
  }

  function selectLessonItems(lesson: CourseLesson): StudyItem[] {
    const raw = studyItemsByIds(allItems, lesson.itemIds);
    if (lesson.kind !== "review") return raw;
    return [...raw]
      .sort((a, b) => (progress[a.id] || 0) - (progress[b.id] || 0))
      .slice(0, Math.min(8, raw.length));
  }

  function startCourseLesson(lesson: CourseLesson) {
    const latest = refreshLocalProgress().courseProgress;
    const status = lessonStatus(lesson, latest);
    if (status === "locked") return;
    const choiceIds = unlockedItemIds(latest, lesson.id);
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
    } else if (mode === "consonant-class") {
      const consonants = consonantClassItems(unlocked);
      items = [...consonants]
        .sort((a, b) => (progress[a.id] || 0) - (progress[b.id] || 0))
        .slice(0, Math.min(8, consonants.length));
    } else if (mode === "vowel-length") {
      items = weakestGroup(vowelLengthGroups(unlocked)) ?? [];
    } else if (mode === "tone-rule") {
      // 声调拼读：需要至少一个辅音 + 一个元音作为拼读原料；
      // 优先使用熟练度较低的字母组合让推导更有针对性。
      const consonants = unlocked.filter((item) => item.pool === "consonant");
      const vowels = unlocked
        .filter((item) => item.pool === "vowel")
        .filter((item) => TONE_SYLLABLE_ALLOWED_VOWELS.has(item.id.slice(2)));
      if (consonants.length === 0 || vowels.length === 0) return;
      const consonantPick = [...consonants]
        .sort((a, b) => (progress[a.id] || 0) - (progress[b.id] || 0))
        .slice(0, Math.min(10, consonants.length));
      const vowelPick = [...vowels]
        .sort((a, b) => (progress[a.id] || 0) - (progress[b.id] || 0))
        .slice(0, Math.min(8, vowels.length));
      items = [...consonantPick, ...vowelPick];
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
    };
    refresh();
    window.addEventListener("thai-alphabet:mastery", refresh);
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    window.addEventListener("storage", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("thai-alphabet:mastery", refresh);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
      window.removeEventListener("storage", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  useEffect(() => {
    if (session) return;
    const unit = route.unit;
    if (unit && MAIN_COURSE.some((lesson) => lesson.unit === unit)) {
      if (focusedUnit !== unit) setFocusedUnit(unit);
    } else if (focusedUnit) {
      setFocusedUnit(null);
    }
    const lessonId = route.lessonId;
    if (!lessonId || routeLessonStartedRef.current === lessonId) return;
    // Don't decide locked/unlocked from an unhydrated snapshot — the effect
    // will re-run once progress lands. Re-check by reading the latest
    // snapshot synchronously to dodge stale closure values right after
    // navigation on Safari.
    if (!progressReady && !isCourseProgressReady()) return;
    const latestProgress = isCourseProgressReady() ? getCourseProgressSnapshot() : courseProgress;
    const lesson = MAIN_COURSE.find((item) => item.id === lessonId);
    if (!lesson) return;
    if (lessonStatus(lesson, latestProgress) === "locked") return;
    routeLessonStartedRef.current = lessonId;
    startCourseLesson(lesson);
    // URL 参数只用于首次落到指定小课；课程内部状态仍由本页控制。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseProgress, focusedUnit, progressReady, route.lessonId, route.unit, session]);

  function clearFocusedUnit() {
    refreshLocalProgress();
    setFocusedUnit(null);
    router.replace("/course", { scroll: false });
  }

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
  // 挑战测试模式下，每次答错都累加失误数。
  function queueReplay(question: Question) {
    if (session?.mode === "challenge") {
      setMistakeCount((value) => value + 1);
    }
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

  function isSyllableChoiceCorrect(question: Question, choice: SyllableChoice): boolean {
    if (!question.syllable) return false;
    if (question.kind === "syllable-parts") {
      return (
        choice.consonantId === question.syllable.consonantId &&
        choice.vowelId === question.syllable.vowelId
      );
    }
    if (question.kind === "syllable-vowel") return choice.vowelId === question.syllable.vowelId;
    if (question.kind === "syllable-initial") return choice.consonantId === question.syllable.consonantId;
    return choice.roman === question.syllable.roman;
  }

  function answerSyllable(id: string) {
    if (!current || submitted || !current.syllable || !current.syllableChoices) return;
    setPicked(id);
    setSubmitted(true);
    const pickedSyllable = current.syllableChoices.find((choice) => choice.id === id);
    const ok = pickedSyllable ? isSyllableChoiceCorrect(current, pickedSyllable) : false;
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

  function answerFinalSound(correct: boolean) {
    if (!current || submitted) return;
    setSubmitted(true);
    if (correct) {
      gainMastery(current.item.id, 1);
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
      speak(current.item.speak);
    } else {
      setProgress(applyWrongAnswer(current.item.id));
      setFeedback("bad");
      feedbackWrong();
      queueReplay(current);
    }
  }

  function answerToneMark(correct: boolean) {
    if (!current || submitted) return;
    setSubmitted(true);
    if (correct) {
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
    } else {
      setFeedback("bad");
      feedbackWrong();
      queueReplay(current);
    }
  }

  function answerToneDerive(correct: boolean) {
    if (!current || submitted || !current.toneSyllable) return;
    setSubmitted(true);
    const initialId = `c:${current.toneSyllable.initial.id}`;
    const vowelId = `v:${current.toneSyllable.vowel.id}`;
    if (correct) {
      let next = progress;
      next = recordMastery(initialId, 1);
      next = recordMastery(vowelId, 1);
      setProgress(next);
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
    } else {
      setProgress(applyWrongAnswer(initialId));
      setProgress(applyWrongAnswer(vowelId));
      setFeedback("bad");
      feedbackWrong();
      queueReplay(current);
    }
  }

  function answerLiveDead(correct: boolean) {
    if (!current || submitted || !current.toneSyllable) return;
    setSubmitted(true);
    const initialId = `c:${current.toneSyllable.initial.id}`;
    const vowelId = `v:${current.toneSyllable.vowel.id}`;
    if (correct) {
      let next = progress;
      next = recordMastery(initialId, 1);
      next = recordMastery(vowelId, 1);
      setProgress(next);
      setCorrectCount((v) => v + 1);
      setFeedback("ok");
      setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      markActive();
      feedbackCorrect();
    } else {
      setProgress(applyWrongAnswer(initialId));
      setProgress(applyWrongAnswer(vowelId));
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
    setSession(null);
    setQuestions([]);
  }

  if (!session) {
    return (
      <CourseHome
        progress={courseProgress}
        progressReady={progressReady}
        mastery={progress}
        unlockedCount={unlockedCount}
        upcomingLesson={upcomingLesson}
        focusedUnit={focusedUnit}
        allItems={allItems}
        onStartLesson={startCourseLesson}
        onStartPractice={startPractice}
        onStartChallenge={startUnitChallenge}
        onClearFocusedUnit={clearFocusedUnit}
        onReset={resetProgress}
      />
    );
  }

  return (
    <div className="course-session flex min-h-full min-w-0 flex-col gap-4 overflow-x-clip">
      {/* 进度条 + 重置 */}
      <div className="shrink-0">
        <div className="flex items-center justify-between gap-3 mb-1 px-1">
          <div className="min-w-0">
            <div className="text-[10px] font-bold opacity-40 tracking-wider uppercase">
              {session.mode === "lesson" ? "主线课程" : session.mode === "challenge" ? "挑战测试" : "专项练习"}
            </div>
            <div className="truncate text-sm font-semibold">{session.title}</div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-[10px] font-bold">
            {session.mode === "challenge" && (
              <span
                className="rounded-full px-2 py-0.5"
                style={{
                  background:
                    mistakeCount > UNIT_CHALLENGE_MISTAKE_LIMIT
                      ? "color-mix(in srgb, var(--duo-orange) 20%, transparent)"
                      : "color-mix(in srgb, var(--duo-blue) 16%, transparent)",
                  color:
                    mistakeCount > UNIT_CHALLENGE_MISTAKE_LIMIT
                      ? "var(--duo-orange-d)"
                      : "var(--duo-blue-d)",
                }}
              >
                失误 {mistakeCount} / {UNIT_CHALLENGE_MISTAKE_LIMIT}
              </span>
            )}
            <span className="opacity-40">
              {index < questions.length ? `${index + 1} / ${questions.length}` : "完成"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="btn-ghost h-9 px-3 text-xs"
            aria-label="返回总课程列表"
          >
            总课程
          </Link>
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
      <div
        className="min-h-0 min-w-0 flex-1"
        style={{ overflowX: "clip", overflowY: "visible", touchAction: "pan-y" }}
      >
        {complete ? (
          session.mode === "challenge" && challengeFailed ? (
            <section className="card-soft p-7 text-center animate-pop">
              <div className="text-6xl">💪</div>
              <div className="mt-3 text-xl font-extrabold" style={{ color: "var(--duo-orange)" }}>
                还差一点
              </div>
              <div className="mt-1 text-sm opacity-70">
                失误 {mistakeCount}（上限 {UNIT_CHALLENGE_MISTAKE_LIMIT}） · 答错的字母已记进薄弱清单
              </div>
              <div className="mt-3 text-xs" style={{ color: "var(--duo-muted)" }}>
                可以无限次重试；也可以回到列表，把不熟的字母再练几节再来。
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button onClick={() => beginSession(session)} className="btn-primary px-6">
                  再试一次
                </button>
                <button onClick={() => setSession(null)} className="btn-ghost px-5">
                  回到列表
                </button>
              </div>
            </section>
          ) : session.mode === "challenge" ? (
            <section className="card-soft p-7 text-center animate-pop">
              <div className="text-6xl">🏆</div>
              <div className="mt-3 text-xl font-extrabold" style={{ color: "var(--duo-green)" }}>
                跳关成功！
              </div>
              <div className="mt-1 text-sm opacity-70">
                失误 {mistakeCount} / {UNIT_CHALLENGE_MISTAKE_LIMIT} · 整单元已解锁
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button onClick={() => setSession(null)} className="btn-primary px-6">
                  回到列表
                </button>
              </div>
            </section>
          ) : (
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
          )
        ) : current ? (
          <div className="course-question-shell min-w-0 max-w-full overflow-x-clip">
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
              onAnswerFinalSound={answerFinalSound}
              onAnswerToneMark={answerToneMark}
              onAnswerToneDerive={answerToneDerive}
              onAnswerLiveDead={answerLiveDead}
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
  if (kind === "tone-rule") return { label: "声调推导", Icon: Sparkles, chip: "chip-high" };
  return { label: "复习", Icon: Dumbbell, chip: "chip-low" };
}

function CourseHome({
  progress,
  progressReady,
  mastery,
  unlockedCount,
  upcomingLesson,
  focusedUnit,
  allItems,
  onStartLesson,
  onStartPractice,
  onStartChallenge,
  onClearFocusedUnit,
  onReset,
}: {
  progress: CourseProgress;
  progressReady: boolean;
  mastery: MasteryProgress;
  unlockedCount: number;
  upcomingLesson: CourseLesson | null;
  focusedUnit: string | null;
  allItems: StudyItem[];
  onStartLesson: (lesson: CourseLesson) => void;
  onStartPractice: (mode: PracticeMode["id"]) => void;
  onStartChallenge: (unit: string) => void;
  onClearFocusedUnit: () => void;
  onReset: () => void;
}) {
  const unlocked = progressReady ? filterUnlockedItems(allItems, progress) : [];
  const completedSet = new Set(progress.completedLessonIds);
  const skippedSet = new Set(progress.skippedUnits);
  const passedLessons = progressReady
    ? MAIN_COURSE.filter(
        (lesson) => completedSet.has(lesson.id) || skippedSet.has(lesson.unit)
      ).length
    : 0;
  const completed = progressReady ? progress.completedLessonIds.length : 0;
  const completionPct = progressReady
    ? Math.round((passedLessons / MAIN_COURSE.length) * 100)
    : 0;
  const masteredUnlocked = unlocked.filter((item) => (mastery[item.id] || 0) >= 60).length;
  const unitEntries = Object.entries(
    MAIN_COURSE.reduce<Record<string, CourseLesson[]>>((acc, lesson) => {
      acc[lesson.unit] = [...(acc[lesson.unit] ?? []), lesson];
      return acc;
    }, {})
  );
  const units = Object.fromEntries(unitEntries) as Record<string, CourseLesson[]>;
  const currentUnit = upcomingLesson?.unit ?? MAIN_COURSE[MAIN_COURSE.length - 1]?.unit;
  const currentLessonNumber = upcomingLesson
    ? MAIN_COURSE.findIndex((lesson) => lesson.id === upcomingLesson.id) + 1
    : MAIN_COURSE.length;
  const focusedUnitIndex = focusedUnit ? unitEntries.findIndex(([unit]) => unit === focusedUnit) : -1;
  const focusedUnitLessons = focusedUnit ? units[focusedUnit] ?? [] : [];
  const focusedUnitStatus = focusedUnit && progressReady ? unitStatus(focusedUnit, progress) : null;
  const focusedLesson = progressReady
    ? focusedUnitLessons.find((lesson) => lessonStatus(lesson, progress) === "current") ?? null
    : null;
  const primaryLesson = focusedUnit ? focusedLesson : upcomingLesson;
  const headerEyebrow = focusedUnit
    ? `第 ${focusedUnitIndex >= 0 ? focusedUnitIndex + 1 : 1} / ${unitEntries.length} 阶段`
    : progressReady
      ? `第 ${currentLessonNumber} / ${MAIN_COURSE.length} 节`
      : "正在同步进度…";
  const headerDetail = focusedUnit
    ? !progressReady
      ? "正在同步进度…"
      : focusedLesson
        ? `当前阶段：${focusedLesson.title}`
        : focusedUnitStatus === "done"
          ? "本阶段已完成"
          : focusedUnitStatus === "skipped"
            ? "本阶段已跳过"
            : "上一阶段完成后解锁"
    : progressReady && upcomingLesson
      ? `当前：${upcomingLesson.title}`
      : "";
  const toneRuleConsonants = unlocked.filter((item) => item.pool === "consonant").length;
  const toneRuleVowels = unlocked
    .filter((item) => item.pool === "vowel")
    .filter((item) => TONE_SYLLABLE_ALLOWED_VOWELS.has(item.id.slice(2))).length;
  const practiceAvailability: Record<PracticeMode["id"], number> = {
    random: unlocked.length,
    homophone: homophoneGroups(unlocked).length,
    shape: shapeGroups(unlocked).length,
    "consonant-class": consonantClassItems(unlocked).length,
    "vowel-length": vowelLengthGroups(unlocked).length,
    "tone-rule": toneRuleConsonants > 0 && toneRuleVowels > 0 ? toneRuleConsonants + toneRuleVowels : 0,
  };

  const visibleUnits = focusedUnit && units[focusedUnit] ? { [focusedUnit]: units[focusedUnit] } : units;

  return (
    <div className="space-y-5">
      <section
        className="sticky top-0 z-10 overflow-hidden rounded-lg border p-3 sm:p-4"
        style={{
          background: "var(--duo-card)",
          borderColor: "var(--duo-line-d)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
              {headerEyebrow}
            </div>
            <h1 className="mt-0.5 truncate text-xl font-semibold sm:text-2xl">
              {focusedUnit ? focusedUnit.replace(/^第.+?·\s*/, "") : currentUnit ?? "课程路径"}
            </h1>
            {headerDetail && (
              <div className="mt-0.5 truncate text-sm font-semibold" style={{ color: "var(--duo-blue-d)" }}>
                {headerDetail}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:min-w-64">
            <div className="rounded-lg border px-3 py-1.5" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
              <div className="text-lg font-semibold" style={{ color: "var(--duo-green-d)" }}>
                {progressReady ? completed : "—"}
              </div>
              <div className="opacity-65">已完成</div>
            </div>
            <div className="rounded-lg border px-3 py-1.5" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
              <div className="text-lg font-semibold" style={{ color: "var(--duo-blue-d)" }}>
                {progressReady ? unlockedCount : "—"}
              </div>
              <div className="opacity-65">已解锁</div>
            </div>
            <div className="rounded-lg border px-3 py-1.5" style={{ borderColor: "var(--duo-line)", background: "var(--surface-subtle)" }}>
              <div className="text-lg font-semibold" style={{ color: "var(--duo-orange-d)" }}>
                {progressReady ? masteredUnlocked : "—"}
              </div>
              <div className="opacity-65">较熟悉</div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="progress-track h-2 flex-1">
            <div className="progress-fill" style={{ width: `${progressReady ? completionPct : 0}%` }} />
          </div>
          <div className="w-12 text-right text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>
            {progressReady ? `${completionPct}%` : "—"}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/courses" className="btn-ghost px-4 py-2 text-xs">
            返回总课程
          </Link>
          {focusedUnit && (
            <button type="button" onClick={onClearFocusedUnit} className="btn-ghost px-4 py-2 text-xs">
              全部阶段
            </button>
          )}
          {primaryLesson && (
            <button onClick={() => onStartLesson(primaryLesson)} className="btn-primary px-4 py-2 text-xs">
              继续学习
            </button>
          )}
        </div>
      </section>

      <section
        className="relative overflow-hidden rounded-lg border px-2 py-4 sm:px-5"
        style={{
          borderColor: "var(--duo-line)",
          background: "color-mix(in srgb, var(--surface-subtle) 72%, var(--duo-bg))",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-4 top-0 h-1 rounded-full"
          style={{
            background: "var(--duo-line-d)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl">
          {Object.entries(visibleUnits).map(([unit, lessons], unitIndex) => (
            <CoursePathUnit
              key={unit}
              unit={unit}
              unitIndex={unitIndex}
              lessons={lessons}
              progress={progress}
              progressReady={progressReady}
              allItems={allItems}
              onStartLesson={onStartLesson}
              onStartChallenge={onStartChallenge}
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
  progressReady,
  allItems,
  onStartLesson,
  onStartChallenge,
}: {
  unit: string;
  unitIndex: number;
  lessons: CourseLesson[];
  progress: CourseProgress;
  progressReady: boolean;
  allItems: StudyItem[];
  onStartLesson: (lesson: CourseLesson) => void;
  onStartChallenge: (unit: string) => void;
}) {
  const currentUnitStatus = progressReady ? unitStatus(unit, progress) : null;
  const challengeAvailable = currentUnitStatus === "current";
  const challengeLabel = !progressReady
    ? "同步中…"
    : currentUnitStatus === "done"
      ? "已完成"
      : currentUnitStatus === "skipped"
        ? "已跳过"
        : currentUnitStatus === "locked"
          ? "未解锁"
          : "挑战跳关";
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
          background: "var(--duo-card)",
          boxShadow: "var(--shadow-small)",
        }}
      >
        <div className="min-w-0">
          <div className="text-xs font-semibold" style={{ color: "var(--duo-green-d)" }}>
            第 {unitIndex + 1} 阶段 · {lessons.length} 节
          </div>
          <div className="mt-0.5 truncate text-sm font-semibold sm:text-base">
            {unit.replace(/^第.+?·\s*/, "")}
          </div>
        </div>
        <button
          type="button"
          onClick={() => challengeAvailable && onStartChallenge(unit)}
          disabled={!challengeAvailable}
          className="shrink-0 rounded-md border px-2.5 py-1 text-[11px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            background: challengeAvailable
              ? "color-mix(in srgb, var(--duo-orange) 14%, var(--duo-card))"
              : "var(--surface-subtle)",
            borderColor: challengeAvailable
              ? "color-mix(in srgb, var(--duo-orange) 50%, var(--duo-line))"
              : "var(--duo-line)",
            color: challengeAvailable ? "var(--duo-orange-d)" : "var(--duo-muted)",
          }}
          title={
            challengeAvailable
              ? `挑战测试：失误 ≤ ${UNIT_CHALLENGE_MISTAKE_LIMIT} 可跳过本单元`
              : currentUnitStatus === "locked"
                ? "上一单元解锁后再挑战"
                : "本单元已通过/跳过"
          }
        >
          {challengeLabel}
        </button>
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
            stroke="color-mix(in srgb, var(--duo-line-d) 62%, transparent)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 7"
          />
        </svg>

        {lessons.map((lesson, index) => {
          const x = PATH_X[(index + unitIndex * 2) % PATH_X.length];
          // Before the store reports ready we render a neutral "available"
          // node — never "locked" — so a brief unhydrated frame doesn't paint
          // the entire unit as locked when entering /course?unit=...
          const status = progressReady ? lessonStatus(lesson, progress) : "available";
          return (
            <CoursePathNode
              key={lesson.id}
              lesson={lesson}
              status={status}
              preview={studyItemsByIds(allItems, lesson.itemIds).slice(0, 5).map((item) => item.front).join(" ")}
              x={x}
              y={index * PATH_ROW_HEIGHT}
              onStartLesson={onStartLesson}
              progressReady={progressReady}
            />
          );
        })}
      </div>
    </div>
  );
}

type CourseLessonNodeStatus = "done" | "skipped" | "current" | "locked" | "available";

function CoursePathNode({
  lesson,
  status,
  preview,
  x,
  y,
  onStartLesson,
  progressReady,
}: {
  lesson: CourseLesson;
  status: CourseLessonNodeStatus;
  preview: string;
  x: number;
  y: number;
  onStartLesson: (lesson: CourseLesson) => void;
  progressReady: boolean;
}) {
  const meta = lessonKindMeta(lesson.kind);
  const Icon =
    status === "done"
      ? Check
      : status === "skipped"
        ? Sparkles
        : status === "locked"
          ? LockKeyhole
          : meta.Icon;
  // While we're still hydrating, disable nodes so the user can't enter a
  // lesson before the real lock state is known.
  const disabled = status === "locked" || !progressReady;

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
            borderColor: "color-mix(in srgb, var(--duo-green) 42%, var(--duo-line))",
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
              ? "color-mix(in srgb, var(--duo-green) 16%, var(--duo-card))"
              : status === "skipped"
              ? "color-mix(in srgb, var(--duo-orange) 14%, var(--duo-card))"
              : status === "current"
              ? "var(--duo-green)"
              : "color-mix(in srgb, var(--duo-muted) 12%, var(--duo-card))",
          borderColor:
            status === "current"
              ? "var(--duo-green)"
              : status === "done"
              ? "color-mix(in srgb, var(--duo-green) 38%, var(--duo-line))"
              : status === "skipped"
              ? "color-mix(in srgb, var(--duo-orange) 42%, var(--duo-line))"
              : "var(--duo-line)",
          boxShadow:
            status === "current"
              ? "var(--shadow-cyan)"
              : status === "done" || status === "skipped"
              ? "var(--shadow-small)"
              : "none",
          color:
            status === "current"
              ? "#143000"
              : status === "skipped"
              ? "var(--duo-orange-d)"
              : status === "locked"
              ? "var(--duo-muted)"
              : "var(--duo-green-d)",
        }}
        aria-label={`${lesson.title}${
          status === "done"
            ? "，复习"
            : status === "skipped"
            ? "，已跳过，可补练"
            : status === "current"
            ? "，开始"
            : "，未解锁"
        }`}
        title={`${lesson.title} · ${meta.label}${status === "skipped" ? " · 已通过挑战跳过" : ""} · ${preview}`}
      >
        {status === "current" && (
          <span
            className="absolute inset-[-7px] rounded-full border"
            style={{ borderColor: "color-mix(in srgb, var(--duo-green) 36%, transparent)" }}
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
  onAnswerFinalSound,
  onAnswerToneMark,
  onAnswerToneDerive,
  onAnswerLiveDead,
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
  onAnswerFinalSound: (correct: boolean) => void;
  onAnswerToneMark: (correct: boolean) => void;
  onAnswerToneDerive: (correct: boolean) => void;
  onAnswerLiveDead: (correct: boolean) => void;
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
  const introAttribute = question.kind === "look" ? introAttributeFor(question.item) : null;
  const [lookPicked, setLookPicked] = useState<string | null>(null);

  useEffect(() => {
    setLookPicked(null);
  }, [question.id]);

  function answerIntroLook(value: string) {
    if (submitted || !introAttribute) return;
    setLookPicked(value);
    if (introAttribute.kind === "class") onAnswerClass(value === introAttribute.correct);
    else onAnswerLength(value === introAttribute.correct);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (question.kind === "write") {
        if (!event.repeat && (isSpaceKey(event) || event.key === "Enter")) {
          event.preventDefault();
          onWrote();
        }
        return;
      }

      if (
        question.kind === "match" ||
        question.kind === "memory" ||
        question.kind === "class" ||
        question.kind === "length" ||
        question.kind === "final-sound" ||
        question.kind === "tone-derive" ||
        question.kind === "live-dead" ||
        question.kind === "tone-guide" ||
        question.kind === "tone-mark-symbol" ||
        question.kind === "tone-mark-name"
      ) {
        return;
      }

      if (question.kind === "look") {
        if (submitted) {
          if (isSpaceKey(event) || event.key === "Enter") {
            event.preventDefault();
            onNext();
          }
          return;
        }
        if (!introAttribute) {
          if (isSpaceKey(event) || event.key === "Enter") {
            event.preventDefault();
            onAnswerLook(true);
          }
          return;
        }
        const index = choiceIndexFromKey(event, introAttribute.options.length);
        if (index !== null) {
          event.preventDefault();
          answerIntroLook(introAttribute.options[index].value);
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

      if (isSyllableQuestionKind(question.kind)) {
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
    const gridCols = introAttribute?.options.length === 2 ? "grid-cols-2" : "grid-cols-3";
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
            等级: {getConsonantClassLabel(question.item.class)}
          </div>
        )}
        {!isConsonant && question.item.length && (
          <div className="mt-1 text-xs font-bold" style={{ color: "var(--duo-purple)" }}>
            长度: {getVowelLengthLabel(question.item.length)}
          </div>
        )}
        <div className="mt-3">
          <PronounceButton text={question.item.speak} label="🔊 听一下" />
        </div>

        {introAttribute ? (
          <>
            <div className="mt-5 text-sm font-bold">{introAttribute.prompt}</div>
            <div className={`mt-3 grid ${gridCols} gap-2`}>
              {introAttribute.options.map((option) => {
                const isCorrect = option.value === introAttribute.correct;
                const isPicked = lookPicked === option.value;
                let cls = "btn-ghost border-2";
                let style = {};

                if (submitted) {
                  if (isCorrect) cls = "btn-primary";
                  else if (isPicked) cls = "btn-red";
                  else cls = "btn-ghost opacity-40";
                } else if (isPicked) {
                  style = { borderColor: option.color, color: option.color };
                }

                return (
                  <button
                    key={option.value}
                    onClick={() => answerIntroLook(option.value)}
                    disabled={submitted}
                    className={`${cls} py-4 text-sm font-bold`}
                    style={style}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <button onClick={() => onAnswerLook(true)} className="btn-primary mt-6 px-8">
            继续
          </button>
        )}

        {submitted && introAttribute && (
          <div className={`course-action-feedback feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} mt-5 animate-pop`}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-base">
                {feedback === "ok" ? (
                  <span>{praise || "答对了！"}</span>
                ) : (
                  <span>
                    正确答案：
                    {introAttribute.kind === "class"
                      ? getConsonantClassLabel(introAttribute.correct)
                      : getVowelLengthLabel(introAttribute.correct)}
                  </span>
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

  if (question.kind === "final-sound") {
    return (
      <FinalSoundCard
        key={question.id}
        question={question}
        submitted={submitted}
        feedback={feedback}
        praise={praise}
        onAnswer={onAnswerFinalSound}
        onNext={onNext}
      />
    );
  }

  if (question.kind === "tone-mark-symbol" || question.kind === "tone-mark-name") {
    return (
      <ToneMarkCard
        key={question.id}
        question={question}
        submitted={submitted}
        feedback={feedback}
        praise={praise}
        onAnswer={onAnswerToneMark}
        onNext={onNext}
      />
    );
  }

  if (question.kind === "tone-guide") {
    return (
      <ToneGuideCard
        key={question.id}
        guide={question.toneGuide ?? "tone-system"}
        onNext={onNext}
      />
    );
  }

  if (question.kind === "tone-derive") {
    return (
      <ToneDeriveCard
        key={question.id}
        question={question}
        submitted={submitted}
        feedback={feedback}
        praise={praise}
        onAnswer={onAnswerToneDerive}
        onNext={onNext}
      />
    );
  }

  if (question.kind === "live-dead") {
    return (
      <LiveDeadCard
        key={question.id}
        question={question}
        submitted={submitted}
        feedback={feedback}
        praise={praise}
        onAnswer={onAnswerLiveDead}
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

  if (isSyllableQuestionKind(question.kind)) {
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
        <div className={`course-action-feedback feedback ${correctAnswered ? "feedback-ok" : "feedback-bad"} animate-pop`}>
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
  const kind = isSyllableQuestionKind(question.kind) ? question.kind : "syllable-sound";
  const pickedChoice = choices.find((choice) => choice.id === picked);
  const prompt =
    kind === "syllable-compose"
      ? "这个辅音 + 元音合起来读什么？"
      : kind === "syllable-sound"
        ? "这个拼读读什么？"
        : kind === "syllable-letter"
          ? `哪个拼读读 ${syllable.roman}？`
          : kind === "syllable-parts"
            ? "这个拼读由哪组辅音 + 元音组成？"
            : kind === "syllable-vowel"
              ? `要让 ${syllable.consonantFront} 读成 ${syllable.roman}，该选哪个元音？`
              : `哪个辅音 + ${syllable.vowelFront} 读 ${syllable.roman}？`;
  const correctAnswered = submitted && pickedChoice ? isSyllableAnswerCorrect(kind, syllable, pickedChoice) : false;
  const mainPrompt =
    kind === "syllable-letter" ? (
      <div className="mt-5 font-mono text-5xl font-semibold" style={{ color: "var(--duo-green-d)" }}>
        {syllable.roman}
      </div>
    ) : kind === "syllable-compose" ? (
      <div className="mt-5 flex items-center justify-center gap-4">
        <span className="thai-big text-7xl leading-none">{syllable.consonantFront}</span>
        <span className="text-3xl font-bold" style={{ color: "var(--duo-muted)" }}>+</span>
        <span className="thai-big text-7xl leading-none">{syllable.vowelFront}</span>
      </div>
    ) : kind === "syllable-vowel" ? (
      <div className="mt-5 flex items-center justify-center gap-4">
        <span className="thai-big text-7xl leading-none">{syllable.consonantFront}</span>
        <span className="text-3xl font-bold" style={{ color: "var(--duo-muted)" }}>+</span>
        <span className="rounded-lg border px-5 py-3 text-3xl font-bold" style={{ borderColor: "var(--duo-line)" }}>
          ?
        </span>
      </div>
    ) : kind === "syllable-initial" ? (
      <div className="mt-5 flex items-center justify-center gap-4">
        <span className="rounded-lg border px-5 py-3 text-3xl font-bold" style={{ borderColor: "var(--duo-line)" }}>
          ?
        </span>
        <span className="text-3xl font-bold" style={{ color: "var(--duo-muted)" }}>+</span>
        <span className="thai-big text-7xl leading-none">{syllable.vowelFront}</span>
      </div>
    ) : (
      <div className="thai-big mt-5 text-8xl leading-none">{syllable.front}</div>
    );

  const renderChoice = (choice: SyllableChoice) => {
    if (kind === "syllable-letter") {
      return <span className="thai-big text-4xl leading-none">{choice.front}</span>;
    }
    if (kind === "syllable-parts") {
      return (
        <span className="flex flex-col items-center gap-1">
          <span className="flex items-center gap-2">
            <span className="thai-big text-4xl leading-none">{choice.consonantFront}</span>
            <span className="text-base opacity-60">+</span>
            <span className="thai-big text-4xl leading-none">{choice.vowelFront}</span>
          </span>
          <span className="font-mono text-xs opacity-70">{choice.roman}</span>
        </span>
      );
    }
    if (kind === "syllable-vowel") {
      return (
        <span className="flex flex-col items-center gap-1">
          <span className="thai-big text-4xl leading-none">{choice.vowelFront}</span>
          <span className="font-mono text-xs opacity-70">{choice.vowelRoman}</span>
        </span>
      );
    }
    if (kind === "syllable-initial") {
      return (
        <span className="flex flex-col items-center gap-1">
          <span className="thai-big text-4xl leading-none">{choice.consonantFront}</span>
          <span className="font-mono text-xs opacity-70">{choice.consonantRoman}</span>
        </span>
      );
    }
    return <span className="font-mono text-xl">{choice.roman}</span>;
  };

  return (
    <section className="space-y-4">
      <div className={`card-soft p-6 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-blue">原辅音拼读</div>
        <div className="mt-3 text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>{prompt}</div>
        {mainPrompt}
        {submitted && (
          <div className="mt-3 text-xs font-semibold" style={{ color: "var(--duo-muted)" }}>
            <span className="thai-big mr-1">{syllable.front}</span>
            <span className="font-mono">{syllable.roman}</span>
          </div>
        )}
        <div className="mt-4">
          <PronounceButton text={syllable.speak} label="🔊 听" />
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {choices.map((choice) => {
          const isPicked = picked === choice.id;
          const isCorrect = isSyllableAnswerCorrect(kind, syllable, choice);
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
                {renderChoice(choice)}
              </button>
            </li>
          );
        })}
      </ul>

      {submitted && (
        <div className={`course-action-feedback feedback ${correctAnswered ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div>{correctAnswered ? praise : "正确答案是"}</div>
              <div className="mt-1 text-sm font-bold">
                <span className="thai-big mr-2 text-lg">{syllable.front}</span>
                <span className="font-mono">{syllable.roman}</span>
              </div>
              <div className="mt-1 text-xs opacity-70">
                <span className="thai-big">{syllable.consonantFront}</span>
                <span className="mx-1">+</span>
                <span className="thai-big">{syllable.vowelFront}</span>
                <span className="mx-1">=</span>
                <span className="font-mono">{syllable.consonantRoman} + {syllable.vowelRoman}</span>
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

function isSyllableAnswerCorrect(
  kind: SyllableQuestionKind,
  syllable: SyllableChoice,
  choice: SyllableChoice
): boolean {
  if (kind === "syllable-parts") {
    return choice.consonantId === syllable.consonantId && choice.vowelId === syllable.vowelId;
  }
  if (kind === "syllable-vowel") return choice.vowelId === syllable.vowelId;
  if (kind === "syllable-initial") return choice.consonantId === syllable.consonantId;
  return choice.roman === syllable.roman;
}

function FinalSoundCard({
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
  const correct = finalSoundForItem(question.item);
  const [picked, setPicked] = useState<string | null>(null);
  const options = useMemo(() => {
    const base = correct ? FINAL_SOUND_OPTIONS.filter((option) => option.value === correct) : [];
    const distractors = shuffleStrong(FINAL_SOUND_OPTIONS.filter((option) => option.value !== correct)).slice(0, 3);
    return shuffleStrong([...base, ...distractors]);
  }, [correct]);

  const handlePick = (value: string) => {
    if (submitted || !correct) return;
    setPicked(value);
    onAnswer(value === correct);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (submitted) {
        if (isSpaceKey(event) || event.key === "Enter") {
          event.preventDefault();
          onNext();
        }
        return;
      }
      const index = choiceIndexFromKey(event, options.length);
      if (index === null) return;
      event.preventDefault();
      handlePick(options[index].value);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section className="space-y-4">
      <div className={`card-soft p-7 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-blue">尾辅音</div>
        <div className="thai-big mt-5 text-8xl leading-none">{question.item.front}</div>
        <div className="mt-3 text-2xl font-extrabold" style={{ color: "var(--duo-blue)" }}>
          {displayRoman(question.item.roman)}
        </div>
        {question.item.name && (
          <div className="thai-big mt-2 text-2xl opacity-80">{question.item.name}</div>
        )}
        <div className="mt-3 text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>
          这个辅音作尾辅音时读什么？
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((option) => {
          const isCorrect = option.value === correct;
          const isPicked = picked === option.value;
          let cls = "btn-ghost border-2";
          if (submitted) {
            if (isCorrect) cls = "btn-primary";
            else if (isPicked) cls = "btn-red";
            else cls = "btn-ghost opacity-40";
          }

          return (
            <button
              key={option.value}
              onClick={() => handlePick(option.value)}
              disabled={submitted}
              className={`${cls} min-h-[68px] px-3 py-4 text-sm font-bold`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className={`course-action-feedback feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex items-center justify-between gap-3">
            <div className="text-base">
              {feedback === "ok" ? (
                <span>✅ {praise}</span>
              ) : (
                <span>❌ 正确答案：{getFinalSoundLabel(correct ?? undefined)}</span>
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

function ToneMarkCard({
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
  const toneMark = question.toneMark ?? COURSE_TONE_MARKS[0];
  const choices = question.toneMarkChoices?.length ? question.toneMarkChoices : COURSE_TONE_MARKS;
  const [picked, setPicked] = useState<string | null>(null);

  const asksSymbol = question.kind === "tone-mark-symbol";
  const handlePick = (id: string) => {
    if (submitted) return;
    setPicked(id);
    onAnswer(id === toneMark.id);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (submitted) {
        if (isSpaceKey(event) || event.key === "Enter") {
          event.preventDefault();
          onNext();
        }
        return;
      }
      const index = choiceIndexFromKey(event, choices.length);
      if (index === null) return;
      event.preventDefault();
      handlePick(choices[index].id);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section className="space-y-4">
      <div className={`card-soft p-7 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-purple">声调符号</div>
        {asksSymbol ? (
          <>
            <div className="mt-5 text-2xl font-extrabold">{toneMark.name}</div>
            <div className="mt-2 font-mono text-lg" style={{ color: "var(--duo-blue)" }}>
              {toneMark.roman}
            </div>
            <div className="mt-3 text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>
              哪个符号对应这个名字？
            </div>
          </>
        ) : (
          <>
            <div className="thai-big mt-5 text-8xl leading-none">{toneMark.symbol}</div>
            <div className="mt-3 text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>
              这个声调符号叫什么？
            </div>
          </>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {choices.map((choice) => {
          const isPicked = picked === choice.id;
          const isCorrect = choice.id === toneMark.id;
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
                onClick={() => handlePick(choice.id)}
                disabled={submitted}
                className={`${cls} min-h-[76px]`}
              >
                {asksSymbol ? (
                  <span className="thai-big text-5xl leading-none">{choice.symbol}</span>
                ) : (
                  <span className="flex flex-col items-center gap-1">
                    <span className="text-base font-bold">{choice.name}</span>
                    <span className="font-mono text-xs opacity-70">{choice.roman}</span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {submitted && (
        <div className={`course-action-feedback feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div>{feedback === "ok" ? praise : "正确答案是"}</div>
              <div className="mt-1 text-sm font-bold">
                <span className="thai-big mr-2 text-lg">{toneMark.symbol}</span>
                {toneMark.name}
                <span className="ml-2 font-mono opacity-75">{toneMark.roman}</span>
              </div>
            </div>
            <button onClick={onNext} className={feedback === "ok" ? "btn-primary px-5" : "btn-red px-5"}>
              继续
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

const CONSONANT_CLASS_LABEL: Record<"mid" | "high" | "low", string> = {
  mid: "中辅音",
  high: "高辅音",
  low: "低辅音",
};

const TONE_SYMBOL: Record<ToneName, string> = {
  mid: "0",
  low: "1",
  falling: "2",
  high: "3",
  rising: "4",
};

const TONE_OPTIONS: { id: ToneName; symbol: string; sub: string }[] = [
  { id: "mid", symbol: TONE_SYMBOL.mid, sub: "สามัญ" },
  { id: "low", symbol: TONE_SYMBOL.low, sub: "เอก" },
  { id: "falling", symbol: TONE_SYMBOL.falling, sub: "โท" },
  { id: "high", symbol: TONE_SYMBOL.high, sub: "ตรี" },
  { id: "rising", symbol: TONE_SYMBOL.rising, sub: "จัตวา" },
];

const TONE_GUIDES: Record<ToneGuideKind, { title: string; subtitle: string; bullets: string[] }> = {
  "tone-system": {
    title: "声调先看三件事",
    subtitle: "泰语声调不是只看符号；要先判断初辅音类别、活/死音节，再看有没有声调符号。",
    bullets: [
      "第一步：看开头辅音是中、高、低哪一类。",
      "第二步：看音节是活音节还是死音节。",
      "第三步：看声调符号；无符号也有自己的默认声调。",
    ],
  },
  "mid-tone": {
    title: "中辅音声调规律",
    subtitle: "中辅音最像标准表：无符号活音节是 0 平声，声调符号基本一一对应。",
    bullets: [
      "中辅音 + 活音节：无符号 0；่ 1；้ 2；๊ 3；๋ 4。",
      "中辅音 + 死音节：无符号通常读 1 低声；่ 仍是 1；้ 是 2。",
      "所以先把 ก จ ด ต ฎ ฏ บ ป อ 认成中辅音，再套表。",
    ],
  },
  "high-tone": {
    title: "高辅音声调规律",
    subtitle: "高辅音无符号时会往高处走：活音节默认 4 升声，死音节默认 1 低声。",
    bullets: [
      "高辅音 + 活音节：无符号 4；่ 1；้ 2。",
      "高辅音 + 死音节：无符号 1；่ 1；้ 2。",
      "先记住高辅音这组：ข ฉ ถ ฐ ผ ฝ ศ ษ ส ห。",
    ],
  },
  "low-tone": {
    title: "低辅音声调规律",
    subtitle: "低辅音最容易乱：无符号活音节是 0，死音节还要看元音长短。",
    bullets: [
      "低辅音 + 活音节：无符号 0；่ 2；้ 3。",
      "低辅音 + 死短：无符号 3；低辅音 + 死长：无符号 2。",
      "低辅音带 ่ 通常读 2，带 ้ 通常读 3。",
    ],
  },
  "live-dead": {
    title: "活音节 / 死音节怎么分",
    subtitle: "活死音节会影响无符号声调，尤其是高辅音和低辅音。",
    bullets: [
      "活音节：长元音无尾音，或尾音是 n / m / ng / y / w。",
      "死音节：短元音无尾音，或尾音是 k / t / p。",
      "判断声调前先判断活死，不要直接看声调符号。",
    ],
  },
};

function toneRuleBucket(syllable: ToneSyllable): "mid-live" | "mid-dead" | "high-live" | "high-dead" | "low-live" | "low-dead-short" | "low-dead-long" {
  if (syllable.initial.class === "mid") return syllable.life === "live" ? "mid-live" : "mid-dead";
  if (syllable.initial.class === "high") return syllable.life === "live" ? "high-live" : "high-dead";
  if (syllable.life === "live") return "low-live";
  return syllable.vowel.length === "short" ? "low-dead-short" : "low-dead-long";
}

function toneBucketLabel(bucket: ReturnType<typeof toneRuleBucket>): string {
  const labels: Record<ReturnType<typeof toneRuleBucket>, string> = {
    "mid-live": "中辅音 + 活音节",
    "mid-dead": "中辅音 + 死音节",
    "high-live": "高辅音 + 活音节",
    "high-dead": "高辅音 + 死音节",
    "low-live": "低辅音 + 活音节",
    "low-dead-short": "低辅音 + 死短",
    "low-dead-long": "低辅音 + 死长",
  };
  return labels[bucket];
}

function toneRuleExplanation(syllable: ToneSyllable): string {
  const mark = toneMarkLabel(syllable.toneMark);
  const tone = `${TONE_SYMBOL[syllable.tone]} ${TONE_NAMES[syllable.tone].cn}`;
  return `${toneBucketLabel(toneRuleBucket(syllable))}，${mark} → ${tone}`;
}

function toneMarkLabel(mark: ToneMark): string {
  if (mark === "none") return "无符号";
  return TONE_MARKS.find((m) => m.id === mark)?.symbol ?? "";
}

function describeFinalForRule(finalConsonant: Consonant | null): string {
  if (!finalConsonant) return "无尾音";
  const sound = finalConsonant.finalSound;
  if (sound === "k" || sound === "t" || sound === "p") return `塞音尾 (${sound})`;
  if (sound === "y" || sound === "w") return `滑音尾 (${sound})`;
  if (sound === "none") return "无尾音";
  return `响音尾 (${sound})`;
}

function ToneGuideCard({
  guide,
  onNext,
}: {
  guide: ToneGuideKind;
  onNext: () => void;
}) {
  const content = TONE_GUIDES[guide];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (isSpaceKey(event) || event.key === "Enter") {
        event.preventDefault();
        onNext();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext]);

  return (
    <section className="space-y-4">
      <div className="card-soft p-6 sm:p-7">
        <div className="chip chip-blue">规则讲解</div>
        <h2 className="mt-4 text-2xl font-extrabold">{content.title}</h2>
        <p className="mt-2 text-sm leading-6" style={{ color: "var(--duo-muted)" }}>
          {content.subtitle}
        </p>
        <div className="mt-5 grid gap-3">
          {content.bullets.map((bullet, index) => (
            <div
              key={bullet}
              className="flex gap-3 rounded-lg border p-3 text-sm leading-6"
              style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)" }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold"
                style={{ background: "var(--duo-blue)", color: "#041517" }}
              >
                {index + 1}
              </span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
      <ToneRuleCheatsheet defaultOpen />
      <button onClick={onNext} className="btn-primary w-full py-4">
        开始带提示练习
      </button>
    </section>
  );
}

function ToneRuleCheatsheet({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-lg border text-xs"
      style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2"
        style={{ color: "var(--duo-muted)" }}
      >
        <span className="font-semibold">声调规则速查</span>
        <span className="opacity-70">{open ? "收起 ▲" : "展开 ▼"}</span>
      </button>
      {open && (
        <div className="border-t px-3 py-2" style={{ borderColor: "var(--duo-line)" }}>
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 leading-5">
            <span className="font-semibold" style={{ color: "var(--duo-blue-d)" }}>中辅音 活</span>
            <span>
              无符号 → <b>{TONE_SYMBOL.mid}</b> ｜ ่ → <b>{TONE_SYMBOL.low}</b> ｜ ้ → <b>{TONE_SYMBOL.falling}</b> ｜ ๊ → <b>{TONE_SYMBOL.high}</b> ｜ ๋ → <b>{TONE_SYMBOL.rising}</b>
            </span>
            <span className="font-semibold" style={{ color: "var(--duo-blue-d)" }}>中辅音 死</span>
            <span>
              无符号 → <b>{TONE_SYMBOL.low}</b> ｜ ่ → <b>{TONE_SYMBOL.low}</b> ｜ ้ → <b>{TONE_SYMBOL.falling}</b>
            </span>
            <span className="font-semibold" style={{ color: "var(--duo-green-d)" }}>高辅音 活</span>
            <span>
              无符号 → <b>{TONE_SYMBOL.rising}</b> ｜ ่ → <b>{TONE_SYMBOL.low}</b> ｜ ้ → <b>{TONE_SYMBOL.falling}</b>
            </span>
            <span className="font-semibold" style={{ color: "var(--duo-green-d)" }}>高辅音 死</span>
            <span>
              无符号 → <b>{TONE_SYMBOL.low}</b> ｜ ่ → <b>{TONE_SYMBOL.low}</b> ｜ ้ → <b>{TONE_SYMBOL.falling}</b>
            </span>
            <span className="font-semibold" style={{ color: "var(--duo-orange-d)" }}>低辅音 活</span>
            <span>
              无符号 → <b>{TONE_SYMBOL.mid}</b> ｜ ่ → <b>{TONE_SYMBOL.falling}</b> ｜ ้ → <b>{TONE_SYMBOL.high}</b>
            </span>
            <span className="font-semibold" style={{ color: "var(--duo-orange-d)" }}>低辅音 死短</span>
            <span>
              无符号 → <b>{TONE_SYMBOL.high}</b> ｜ ่ → <b>{TONE_SYMBOL.falling}</b> ｜ ้ → <b>{TONE_SYMBOL.high}</b>
            </span>
            <span className="font-semibold" style={{ color: "var(--duo-orange-d)" }}>低辅音 死长</span>
            <span>
              无符号 → <b>{TONE_SYMBOL.falling}</b> ｜ ่ → <b>{TONE_SYMBOL.falling}</b> ｜ ้ → <b>{TONE_SYMBOL.high}</b>
            </span>
          </div>
          <div className="mt-2 text-[11px] opacity-75">
            声调编号：<b>0</b> สามัญ 平 ｜ <b>1</b> เอก 低 ｜ <b>2</b> โท 降 ｜ <b>3</b> ตรี 高 ｜ <b>4</b> จัตวา 升。活音节 = 长元音 或 响音/滑音尾 (n/m/ng/y/w)；死音节 = 短元音裸 或 塞音尾 (k/t/p)。
          </div>
        </div>
      )}
    </div>
  );
}

function ToneDeriveCard({
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
  const syllable = question.toneSyllable!;
  const [picked, setPicked] = useState<ToneName | null>(null);

  useEffect(() => {
    setPicked(null);
  }, [question.id]);

  const handlePick = (id: ToneName) => {
    if (submitted) return;
    setPicked(id);
    onAnswer(id === syllable.tone);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (submitted) {
        if (isSpaceKey(event) || event.key === "Enter") {
          event.preventDefault();
          onNext();
        }
        return;
      }
      const index = choiceIndexFromKey(event, TONE_OPTIONS.length);
      if (index === null) return;
      event.preventDefault();
      handlePick(TONE_OPTIONS[index].id);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const classLabel = CONSONANT_CLASS_LABEL[syllable.initial.class];
  const vowelLengthLabel = syllable.vowel.length === "long" ? "长元音" : "短元音";
  const lifeLabel = syllable.life === "live" ? "活音节" : "死音节";
  const guided = question.guided !== false;
  const ruleSummary = `${classLabel} + ${vowelLengthLabel} + ${describeFinalForRule(
    syllable.finalConsonant
  )} + ${toneMarkLabel(syllable.toneMark)} → ${lifeLabel} → ${TONE_SYMBOL[syllable.tone]} (${TONE_NAMES[syllable.tone].th})`;

  return (
    <section className="space-y-4">
      {guided && <ToneRuleCheatsheet defaultOpen />}
      <div className={`card-soft p-7 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-blue">声调拼读</div>
        <div className="thai-big mt-4 text-7xl leading-none">{syllable.thai}</div>
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
          <span className="chip chip-blue">{classLabel} {syllable.initial.letter}</span>
          <span className="chip chip-yellow">{vowelLengthLabel} {syllable.vowel.display}</span>
          <span className="chip chip-low">
            {syllable.finalConsonant ? `尾 ${syllable.finalConsonant.letter}` : "无尾"}
          </span>
          <span className="chip chip-high">符号 {toneMarkLabel(syllable.toneMark)}</span>
        </div>
        <div className="mt-3 text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>
          这个音节读什么声调？
        </div>
        {guided && (
          <div
            className="mt-4 rounded-lg border px-3 py-3 text-left text-xs leading-5"
            style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}
          >
            <div className="font-semibold" style={{ color: "var(--duo-blue-d)" }}>
              带提示推导
            </div>
            <div className="mt-1">
              1. {syllable.initial.letter} 是 <b>{classLabel}</b>；2. {vowelLengthLabel} + {describeFinalForRule(syllable.finalConsonant)}，所以是 <b>{lifeLabel}</b>；3. 查表：<b>{toneRuleExplanation(syllable)}</b>。
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {TONE_OPTIONS.map((option) => {
          const isCorrect = option.id === syllable.tone;
          const isPicked = picked === option.id;
          let cls = "btn-ghost border-2";
          if (submitted) {
            if (isCorrect) cls = "btn-primary";
            else if (isPicked) cls = "btn-red";
            else cls = "btn-ghost opacity-40";
          }
          return (
            <button
              key={option.id}
              onClick={() => handlePick(option.id)}
              disabled={submitted}
              className={`${cls} min-h-[68px] flex-col px-2 py-3 font-bold`}
            >
              <span className="text-2xl leading-none">{option.symbol}</span>
              <span className="mt-1 text-[10px] font-normal opacity-65">{option.sub}</span>
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className={`course-action-feedback feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 text-sm">
              {feedback === "ok" ? <span>✅ {praise}</span> : <span>❌ 正确：{TONE_SYMBOL[syllable.tone]} ({TONE_NAMES[syllable.tone].th})</span>}
              <div className="mt-1 text-xs opacity-80">{ruleSummary}</div>
            </div>
            <button
              onClick={onNext}
              className={`shrink-0 ${feedback === "ok" ? "btn-primary px-5" : "btn-red px-5"}`}
            >
              继续
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function LiveDeadCard({
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
  const syllable = question.toneSyllable!;
  const [picked, setPicked] = useState<"live" | "dead" | null>(null);

  useEffect(() => {
    setPicked(null);
  }, [question.id]);

  const handlePick = (id: "live" | "dead") => {
    if (submitted) return;
    setPicked(id);
    onAnswer(id === syllable.life);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (submitted) {
        if (isSpaceKey(event) || event.key === "Enter") {
          event.preventDefault();
          onNext();
        }
        return;
      }
      if (event.key === "1") {
        event.preventDefault();
        handlePick("live");
      } else if (event.key === "2") {
        event.preventDefault();
        handlePick("dead");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const vowelLengthLabel = syllable.vowel.length === "long" ? "长元音" : "短元音";
  const guided = question.guided !== false;
  const ruleSummary = `${vowelLengthLabel} ${syllable.vowel.display} + ${describeFinalForRule(
    syllable.finalConsonant
  )} → ${syllable.life === "live" ? "活音节 (เป็น)" : "死音节 (ตาย)"}`;

  return (
    <section className="space-y-4">
      {guided && (
        <div
          className="rounded-lg border px-3 py-2 text-xs leading-5"
          style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}
        >
          <div className="font-semibold" style={{ color: "var(--duo-blue-d)" }}>
            先判断活死音节
          </div>
          <span className="font-semibold" style={{ color: "var(--duo-green-d)" }}>活 (เป็น)</span>
          ：长元音 或 响音/滑音尾 n/m/ng/y/w。
          <span className="ml-2 font-semibold" style={{ color: "var(--duo-orange-d)" }}>死 (ตาย)</span>
          ：短元音裸 或 塞音尾 k/t/p。
        </div>
      )}
      <div className={`card-soft p-7 text-center ${feedback === "bad" ? "animate-shake" : ""}`}>
        <div className="chip chip-blue">活音节 / 死音节</div>
        <div className="thai-big mt-4 text-7xl leading-none">{syllable.thai}</div>
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
          <span className="chip chip-yellow">{vowelLengthLabel}</span>
          <span className="chip chip-low">
            {syllable.finalConsonant ? `尾 ${syllable.finalConsonant.letter}` : "无尾音"}
          </span>
        </div>
        <div className="mt-3 text-sm font-semibold" style={{ color: "var(--duo-muted)" }}>
          这是活音节还是死音节？
        </div>
        {guided && (
          <div
            className="mt-4 rounded-lg border px-3 py-3 text-left text-xs leading-5"
            style={{ background: "var(--surface-subtle)", borderColor: "var(--duo-line)", color: "var(--duo-muted)" }}
          >
            <b>{syllable.vowel.display}</b> 是 {vowelLengthLabel}；尾音是 <b>{describeFinalForRule(syllable.finalConsonant)}</b>。按上面的定义判断。
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(["live", "dead"] as const).map((id) => {
          const isCorrect = id === syllable.life;
          const isPicked = picked === id;
          let cls = "btn-ghost border-2";
          if (submitted) {
            if (isCorrect) cls = "btn-primary";
            else if (isPicked) cls = "btn-red";
            else cls = "btn-ghost opacity-40";
          }
          return (
            <button
              key={id}
              onClick={() => handlePick(id)}
              disabled={submitted}
              className={`${cls} min-h-[68px] flex-col px-3 py-4 text-base font-bold`}
            >
              <span>{id === "live" ? "活音节" : "死音节"}</span>
              <span className="text-[10px] font-normal opacity-65">
                {id === "live" ? "เป็น" : "ตาย"}
              </span>
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className={`course-action-feedback feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 text-sm">
              {feedback === "ok" ? (
                <span>✅ {praise}</span>
              ) : (
                <span>❌ 正确：{syllable.life === "live" ? "活音节" : "死音节"}</span>
              )}
              <div className="mt-1 text-xs opacity-80">{ruleSummary}</div>
            </div>
            <button
              onClick={onNext}
              className={`shrink-0 ${feedback === "ok" ? "btn-primary px-5" : "btn-red px-5"}`}
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
  const [board, setBoard] = useState<CourseMatchBoard>(() => makeCourseMatchBoard(items));
  const [matchedCount, setMatchedCount] = useState(0);
  const [pickedLeft, setPickedLeft] = useState<number | null>(null);
  const [pickedRight, setPickedRight] = useState<number | null>(null);
  const pickedLeftRef = useRef<number | null>(null);
  const pickedRightRef = useRef<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const completedRef = useRef(false);
  const notFullStreakRef = useRef(0);

  const clearPicks = () => {
    pickedLeftRef.current = null;
    pickedRightRef.current = null;
    setPickedLeft(null);
    setPickedRight(null);
  };

  const tryMatch = (leftIdx: number | null, rightIdx: number | null) => {
    if (leftIdx === null || rightIdx === null) return;
    const leftItem = board.leftSlots[leftIdx];
    const rightItem = board.rightSlots[rightIdx];
    if (!leftItem || !rightItem) return;
    if (leftItem.roman === rightItem.roman) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMatchedCount((count) => count + 1);
      setFlash("ok");
      speak(leftItem.speak);
      if (newStreak >= 2) feedbackCombo(newStreak);
      else feedbackMatch();
      setBoard((b) => {
        const leftAfterClear = [...b.leftSlots];
        leftAfterClear[leftIdx] = null;
        const rightAfterClear = [...b.rightSlots];
        rightAfterClear[rightIdx] = null;

        const newLeftSlots = [...leftAfterClear];
        const newRightSlots = [...rightAfterClear];
        let newLeftQueue = b.leftQueue;
        let newRightQueue = b.rightQueue;
        let placed = false;

        const mustForceFull = notFullStreakRef.current >= COURSE_MATCH_MAX_NOT_FULL;
        if (mustForceFull) {
          const fully = coursePickFullyMatchablePair(
            b.leftQueue,
            b.rightQueue,
            leftAfterClear,
            rightAfterClear
          );
          if (fully) {
            newLeftSlots[leftIdx] = fully.leftItem;
            newRightSlots[rightIdx] = fully.rightItem;
            newLeftQueue = fully.leftQueue;
            newRightQueue = fully.rightQueue;
            placed = true;
          }
        }

        if (!placed) {
          const leftPick = coursePickReplenishment(b.leftQueue, leftAfterClear, rightAfterClear);
          newLeftSlots[leftIdx] = leftPick.item;
          newLeftQueue = leftPick.queue;

          const rightPick = coursePickReplenishment(b.rightQueue, rightAfterClear, newLeftSlots);
          newRightSlots[rightIdx] = rightPick.item;
          newRightQueue = rightPick.queue;
        }

        const activePairs = Math.min(
          newLeftSlots.filter(Boolean).length,
          newRightSlots.filter(Boolean).length
        );
        const requiredMatchable = Math.min(COURSE_MATCH_MIN_MATCHABLE, activePairs);
        const fullyMatchable = courseMatchableCount(newLeftSlots, newRightSlots) >= requiredMatchable;
        notFullStreakRef.current = fullyMatchable ? 0 : notFullStreakRef.current + 1;

        return {
          leftSlots: newLeftSlots,
          rightSlots: newRightSlots,
          leftQueue: newLeftQueue,
          rightQueue: newRightQueue,
        };
      });
      setTimeout(() => setFlash(null), 250);
    } else {
      setStreak(0);
      setFlash("bad");
      feedbackMismatch();
      setTimeout(() => setFlash(null), 350);
    }
  };

  const onLeft = (idx: number) => {
    if (submitted || !board.leftSlots[idx]) return;
    feedbackTap();
    const rightPick = pickedRightRef.current;
    if (rightPick !== null) {
      clearPicks();
      tryMatch(idx, rightPick);
      return;
    }
    const next = pickedLeftRef.current === idx ? null : idx;
    pickedLeftRef.current = next;
    setPickedLeft(next);
  };
  const onRight = (idx: number) => {
    if (submitted || !board.rightSlots[idx]) return;
    feedbackTap();
    const leftPick = pickedLeftRef.current;
    if (leftPick !== null) {
      clearPicks();
      tryMatch(leftPick, idx);
      return;
    }
    const next = pickedRightRef.current === idx ? null : idx;
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
    function handleKeyDown(event: KeyboardEvent) {
      if (isShortcutBlocked(event)) return;
      if (submitted) {
        if (isSpaceKey(event)) {
          event.preventDefault();
          onNext();
        }
        return;
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        if (pickedLeftRef.current === null && pickedRightRef.current === null) return;
        event.preventDefault();
        clearPicks();
        return;
      }

      const hasLeftPick = pickedLeftRef.current !== null;
      const order = hasLeftPick ? visibleRightSlots : visibleLeftSlots;
      const index = choiceIndexFromKey(event, Math.min(5, order.length));
      if (index === null) return;
      event.preventDefault();
      const slot = order[index];
      if (!slot) return;
      if (hasLeftPick) onRight(slot.idx);
      else onLeft(slot.idx);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    if (matchedCount >= items.length && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [matchedCount, items.length, onComplete]);

  const visibleLeftSlots = board.leftSlots
    .map((it, idx) => ({ it, idx }))
    .filter((slot): slot is { it: StudyItem; idx: number } => Boolean(slot.it));
  const visibleRightSlots = board.rightSlots
    .map((it, idx) => ({ it, idx }))
    .filter((slot): slot is { it: StudyItem; idx: number } => Boolean(slot.it));
  const currentMatchable = courseMatchableCount(board.leftSlots, board.rightSlots);

  return (
    <section className={`space-y-4 ${flash === "bad" ? "animate-shake" : ""}`}>
      <div className="card-soft p-5 text-center">
        <div className="chip chip-yellow">配对 · 把字母和读音连起来</div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="opacity-70">已配对 {matchedCount} / {items.length}</span>
          <span className="opacity-50">当前可配 {currentMatchable} 对</span>
          {streak >= 2 && (
            <span className="font-semibold animate-pop" style={{ color: "var(--duo-orange)" }}>
              连击 ×{streak}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ul className="space-y-2">
          {visibleLeftSlots.map(({ it, idx }) => {
            const isPicked = pickedLeft === idx;
            const cls = isPicked ? "opt opt-selected" : "opt";
            return (
              <li key={`L-${idx}-${it.id}`}>
                <button
                  onPointerDown={(event) => handlePointerPress(event, () => onLeft(idx))}
                  onKeyDown={(event) => handleKeyboardPress(event, () => onLeft(idx))}
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
          {visibleRightSlots.map(({ it, idx }) => {
            const isPicked = pickedRight === idx;
            const cls = isPicked ? "opt opt-selected" : "opt";
            return (
              <li key={`R-${idx}-${it.id}`}>
                <button
                  onPointerDown={(event) => handlePointerPress(event, () => onRight(idx))}
                  onKeyDown={(event) => handleKeyboardPress(event, () => onRight(idx))}
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
        <div className="course-action-feedback feedback feedback-ok animate-pop">
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
        <div className={`course-action-feedback feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
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
        <div className={`course-action-feedback feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
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
        <div className={`course-action-feedback feedback ${feedback === "ok" ? "feedback-ok" : "feedback-bad"} animate-pop`}>
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
