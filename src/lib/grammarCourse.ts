import {
  GRAMMAR_COVERAGE_SECTIONS,
  GRAMMAR_POINT_BY_ID,
  GRAMMAR_POINTS,
} from "@/data/grammar";
import type { ContentLevel, GrammarCoverageSection, GrammarPoint, ThaiExample } from "@/data/types";
import { shuffleStrong, uniqueChoices } from "@/lib/study";

export type GrammarExerciseKind =
  | "concept-choice"
  | "pattern-choice"
  | "meaning-choice"
  | "thai-choice"
  | "cloze-choice"
  | "order-tokens"
  | "example-classify";

export interface GrammarChoice {
  id: string;
  label: string;
  subLabel?: string;
  correct: boolean;
}

export interface GrammarToken {
  id: string;
  label: string;
}

export interface GrammarExercise {
  id: string;
  kind: GrammarExerciseKind;
  pointId: string;
  pointTitleZh: string;
  pointSummaryZh: string;
  promptZh: string;
  instructionZh: string;
  explanationZh: string;
  example?: ThaiExample;
  choices?: GrammarChoice[];
  tokens?: GrammarToken[];
  answerTokens?: string[];
}

export interface GrammarLessonPlan {
  id: string;
  title: string;
  subtitle: string;
  level: ContentLevel;
  coverageId: string;
  pointIds: string[];
  examplesCount: number;
  estimatedQuestions: number;
}

const CLOZE_TOKENS = [
  "ไม่",
  "ไหม",
  "หรือ",
  "ใช่ไหม",
  "ของ",
  "ที่",
  "คือ",
  "เป็น",
  "อยู่",
  "มี",
  "จะ",
  "กำลัง",
  "แล้ว",
  "เคย",
  "ได้",
  "ให้",
  "กว่า",
  "ที่สุด",
  "เพราะ",
  "แต่",
  "ถ้า",
  "เพื่อ",
  "ถูก",
  "โดน",
  "ก็",
  "นะ",
  "ครับ",
  "ค่ะ",
];

function pointExamples(point: GrammarPoint): ThaiExample[] {
  return point.examples.filter((example) => example.thai && example.chinese);
}

function allExamples(): Array<{ point: GrammarPoint; example: ThaiExample }> {
  return GRAMMAR_POINTS.flatMap((point) =>
    pointExamples(point).map((example) => ({ point, example }))
  );
}

function otherPoints(point: GrammarPoint, pool: GrammarPoint[], count: number): GrammarPoint[] {
  const source = pool.length >= count + 1 ? pool : GRAMMAR_POINTS;
  return shuffleStrong(source.filter((item) => item.id !== point.id)).slice(0, count);
}

function choiceSet(
  correct: GrammarChoice,
  others: GrammarChoice[],
  count = 4
): GrammarChoice[] {
  return uniqueChoices(correct, [correct, ...others], count, (choice) => choice.id);
}

function makeConceptExercise(point: GrammarPoint, lessonPoints: GrammarPoint[]): GrammarExercise {
  const correct = {
    id: point.id,
    label: point.titleZh,
    subLabel: point.titleEn,
    correct: true,
  };
  const choices = choiceSet(
    correct,
    otherPoints(point, lessonPoints, 5).map((other) => ({
      id: other.id,
      label: other.titleZh,
      subLabel: other.titleEn,
      correct: false,
    }))
  );
  return {
    id: `${point.id}:concept`,
    kind: "concept-choice",
    pointId: point.id,
    pointTitleZh: point.titleZh,
    pointSummaryZh: point.summaryZh,
    promptZh: point.summaryZh,
    instructionZh: "这段说明对应哪一个语法点？",
    explanationZh: `${point.titleZh}：${point.summaryZh}`,
    choices,
  };
}

function makePatternExercise(point: GrammarPoint, lessonPoints: GrammarPoint[]): GrammarExercise | null {
  const pattern = point.patterns[0];
  if (!pattern) return null;
  const distractors = shuffleStrong(
    lessonPoints
      .filter((other) => other.id !== point.id)
      .flatMap((other) => other.patterns)
      .concat(GRAMMAR_POINTS.filter((other) => other.id !== point.id).flatMap((other) => other.patterns))
  );
  const correct = { id: `pattern:${point.id}`, label: pattern, correct: true };
  const choices = choiceSet(
    correct,
    distractors.map((item, index) => ({
      id: `pattern:${point.id}:d${index}:${item}`,
      label: item,
      correct: false,
    }))
  );
  return {
    id: `${point.id}:pattern`,
    kind: "pattern-choice",
    pointId: point.id,
    pointTitleZh: point.titleZh,
    pointSummaryZh: point.summaryZh,
    promptZh: point.titleZh,
    instructionZh: "这个语法点最核心的结构是哪一个？",
    explanationZh: `核心结构：${pattern}`,
    choices,
  };
}

function makeMeaningExercise(point: GrammarPoint, example: ThaiExample): GrammarExercise {
  const examples = allExamples().filter((item) => item.example.chinese !== example.chinese);
  const correct = {
    id: `${point.id}:meaning:correct`,
    label: example.chinese,
    subLabel: example.literalZh,
    correct: true,
  };
  const choices = choiceSet(
    correct,
    examples.map(({ example: other }, index) => ({
      id: `${point.id}:meaning:d${index}`,
      label: other.chinese,
      subLabel: other.literalZh,
      correct: false,
    }))
  );
  return {
    id: `${point.id}:meaning:${example.thai}`,
    kind: "meaning-choice",
    pointId: point.id,
    pointTitleZh: point.titleZh,
    pointSummaryZh: point.summaryZh,
    promptZh: example.thai,
    instructionZh: "选择这句泰语最合适的中文意思。",
    explanationZh: `${example.thai} = ${example.chinese}`,
    example,
    choices,
  };
}

function makeThaiExercise(point: GrammarPoint, example: ThaiExample): GrammarExercise {
  const examples = allExamples().filter((item) => item.example.thai !== example.thai);
  const correct = {
    id: `${point.id}:thai:correct`,
    label: example.thai,
    subLabel: example.roman,
    correct: true,
  };
  const choices = choiceSet(
    correct,
    examples.map(({ example: other }, index) => ({
      id: `${point.id}:thai:d${index}`,
      label: other.thai,
      subLabel: other.roman,
      correct: false,
    }))
  );
  return {
    id: `${point.id}:thai:${example.chinese}`,
    kind: "thai-choice",
    pointId: point.id,
    pointTitleZh: point.titleZh,
    pointSummaryZh: point.summaryZh,
    promptZh: example.chinese,
    instructionZh: "哪一句泰语表达了这个意思？",
    explanationZh: `${example.chinese} → ${example.thai}`,
    example,
    choices,
  };
}

function makeClozeExercise(point: GrammarPoint, example: ThaiExample): GrammarExercise | null {
  const token = CLOZE_TOKENS.find((item) => example.thai.includes(item));
  if (!token) return null;
  const prompt = example.thai.replace(token, "____");
  const correct = { id: `cloze:${token}`, label: token, correct: true };
  const choices = choiceSet(
    correct,
    CLOZE_TOKENS.filter((item) => item !== token).map((item) => ({
      id: `cloze:${token}:d:${item}`,
      label: item,
      correct: false,
    }))
  );
  return {
    id: `${point.id}:cloze:${example.thai}`,
    kind: "cloze-choice",
    pointId: point.id,
    pointTitleZh: point.titleZh,
    pointSummaryZh: point.summaryZh,
    promptZh: prompt,
    instructionZh: "点选最自然的缺词。",
    explanationZh: `完整句子：${example.thai}（${example.chinese}）`,
    example,
    choices,
  };
}

function makeOrderExercise(point: GrammarPoint, example: ThaiExample): GrammarExercise | null {
  const words = example.thai.split(/\s+/).filter(Boolean);
  if (words.length < 3 || words.length > 8) return null;
  const tokens = shuffleStrong(words.map((label, index) => ({ id: `${index}:${label}`, label })));
  return {
    id: `${point.id}:order:${example.thai}`,
    kind: "order-tokens",
    pointId: point.id,
    pointTitleZh: point.titleZh,
    pointSummaryZh: point.summaryZh,
    promptZh: example.chinese,
    instructionZh: "按顺序点词，拼出自然泰语句子。",
    explanationZh: `${example.thai} · ${example.roman}`,
    example,
    tokens,
    answerTokens: words,
  };
}

function makeClassifyExercise(
  point: GrammarPoint,
  example: ThaiExample,
  lessonPoints: GrammarPoint[]
): GrammarExercise {
  const correct = {
    id: point.id,
    label: point.titleZh,
    subLabel: point.summaryZh,
    correct: true,
  };
  const choices = choiceSet(
    correct,
    otherPoints(point, lessonPoints, 5).map((other) => ({
      id: other.id,
      label: other.titleZh,
      subLabel: other.summaryZh,
      correct: false,
    }))
  );
  return {
    id: `${point.id}:classify:${example.thai}`,
    kind: "example-classify",
    pointId: point.id,
    pointTitleZh: point.titleZh,
    pointSummaryZh: point.summaryZh,
    promptZh: example.thai,
    instructionZh: "这句例句主要在练哪个语法点？",
    explanationZh: `${point.titleZh}：${point.summaryZh}`,
    example,
    choices,
  };
}

function lessonPoints(section: GrammarCoverageSection): GrammarPoint[] {
  return section.pointIds
    .map((pointId) => GRAMMAR_POINT_BY_ID[pointId])
    .filter((point): point is GrammarPoint => Boolean(point));
}

export const GRAMMAR_LESSON_PLANS: GrammarLessonPlan[] = GRAMMAR_COVERAGE_SECTIONS.map((section, index) => {
  const points = lessonPoints(section);
  const examplesCount = points.reduce((sum, point) => sum + pointExamples(point).length, 0);
  return {
    id: `grammar-course-${section.id}`,
    title: `语法 ${index + 1} · ${section.titleZh}`,
    subtitle: section.summaryZh,
    level: section.level,
    coverageId: section.id,
    pointIds: section.pointIds,
    examplesCount,
    estimatedQuestions: Math.min(28, Math.max(8, points.length * 4 + examplesCount)),
  };
});

export function buildGrammarExercisesForLesson(
  lessonId: string,
  maxQuestions = 24
): GrammarExercise[] {
  const plan = GRAMMAR_LESSON_PLANS.find((lesson) => lesson.id === lessonId) ?? GRAMMAR_LESSON_PLANS[0];
  const section = GRAMMAR_COVERAGE_SECTIONS.find((item) => item.id === plan.coverageId);
  if (!section) return [];
  const points = lessonPoints(section);
  const exercises: GrammarExercise[] = [];

  for (const point of points) {
    exercises.push(makeConceptExercise(point, points));
    const pattern = makePatternExercise(point, points);
    if (pattern) exercises.push(pattern);

    const examples = pointExamples(point);
    for (const example of examples.slice(0, 2)) {
      exercises.push(makeMeaningExercise(point, example));
      exercises.push(makeThaiExercise(point, example));
      exercises.push(makeClassifyExercise(point, example, points));
      const cloze = makeClozeExercise(point, example);
      if (cloze) exercises.push(cloze);
      const order = makeOrderExercise(point, example);
      if (order) exercises.push(order);
    }
  }

  return shuffleStrong(exercises).slice(0, maxQuestions);
}
