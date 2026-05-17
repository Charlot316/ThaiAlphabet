import {
  ADVANCED_GRAMMAR_COMPETENCIES,
  PROFESSIONAL_GENRE_TARGETS,
  REGISTER_TRANSFORMATION_TARGETS,
} from "@/data/advancedGrammar";
import {
  GRAMMAR_COVERAGE_SECTIONS,
  GRAMMAR_POINT_BY_ID,
  GRAMMAR_POINTS,
  GRAMMAR_TRACKS,
} from "@/data/grammar";
import type {
  AdvancedGrammarCompetency,
  ContentLevel,
  GrammarCoverageSection,
  GrammarPoint,
  ProfessionalGenreTarget,
  ThaiExample,
} from "@/data/types";
import { shuffleStrong, uniqueChoices } from "@/lib/study";

export type GrammarExerciseKind =
  | "lesson-brief"
  | "example-showcase"
  | "concept-choice"
  | "pattern-choice"
  | "meaning-choice"
  | "thai-choice"
  | "cloze-choice"
  | "order-tokens"
  | "example-classify"
  | "register-rewrite"
  | "genre-move"
  | "risk-detect"
  | "output-plan";

export type GrammarLessonPhase = "core" | "advanced" | "professional-output" | "review";

export type GrammarTrainingMode =
  | "showcase"
  | "recognition"
  | "pattern"
  | "example-comprehension"
  | "cloze"
  | "ordering"
  | "classification"
  | "register"
  | "risk"
  | "genre-output";

export interface GrammarExerciseCatalogItem {
  id: GrammarExerciseKind;
  labelZh: string;
  purposeZh: string;
  interactionZh: string;
  usedFromLevel: ContentLevel;
}

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
  phase: GrammarLessonPhase;
  coverageId?: string;
  advancedCompetencyId?: string;
  professionalGenreId?: string;
  focusPointId?: string;
  learningLineTitleZh?: string;
  pointIds: string[];
  reviewPointIds?: string[];
  trainingModes: GrammarTrainingMode[];
  skillGoalsZh: string[];
  outputTaskZh?: string;
  examplesCount: number;
  estimatedQuestions: number;
}

export const GRAMMAR_EXERCISE_CATALOG: GrammarExerciseCatalogItem[] = [
  {
    id: "lesson-brief",
    labelZh: "规则展示",
    purposeZh: "每个语法小点先单独讲清楚功能、结构和常见坑，再进入选择题。",
    interactionZh: "读规则卡，点继续。",
    usedFromLevel: "pre-a1",
  },
  {
    id: "example-showcase",
    labelZh: "例句展示",
    purposeZh: "先用多条例句建立语感，再做理解、选句、缺空和排序。",
    interactionZh: "看泰文、罗马音、中文和直译提示，点继续。",
    usedFromLevel: "pre-a1",
  },
  {
    id: "concept-choice",
    labelZh: "概念识别",
    purposeZh: "先知道这节课讲的是哪一个语法现象，避免只背例句。",
    interactionZh: "读中文说明，点选对应语法点。",
    usedFromLevel: "pre-a1",
  },
  {
    id: "pattern-choice",
    labelZh: "结构选择",
    purposeZh: "把抽象说明落到可复用的句型骨架。",
    interactionZh: "从多个结构中点选最核心模式。",
    usedFromLevel: "pre-a1",
  },
  {
    id: "meaning-choice",
    labelZh: "泰文理解",
    purposeZh: "训练看见真实泰文例句时能迅速抓住意思。",
    interactionZh: "看泰文例句，点选中文意思。",
    usedFromLevel: "pre-a1",
  },
  {
    id: "thai-choice",
    labelZh: "中文到泰文识别",
    purposeZh: "训练把中文意图映射到自然泰语表达。",
    interactionZh: "看中文意思，点选对应泰语句。",
    usedFromLevel: "a1",
  },
  {
    id: "cloze-choice",
    labelZh: "功能词缺空",
    purposeZh: "集中练 ไม่/ไหม/ที่/ให้/ก็/นะ 等高频语法词的位置和语气。",
    interactionZh: "看缺空句，点选最自然的词。",
    usedFromLevel: "a1",
  },
  {
    id: "order-tokens",
    labelZh: "点词排序",
    purposeZh: "让词序、后置修饰和从句边界变成身体记忆。",
    interactionZh: "按顺序点词块拼出泰语句。",
    usedFromLevel: "a1",
  },
  {
    id: "example-classify",
    labelZh: "例句归类",
    purposeZh: "在相近语法点之间做辨别，而不是孤立背规则。",
    interactionZh: "看例句，点选它主要体现的语法点。",
    usedFromLevel: "a1",
  },
  {
    id: "register-rewrite",
    labelZh: "语域转换",
    purposeZh: "C1/C2 重点训练同一意思在朋友、客户、长辈、正式文件中的不同说法。",
    interactionZh: "看场景和原句，点选更安全的改写。",
    usedFromLevel: "c1",
  },
  {
    id: "risk-detect",
    labelZh: "冒犯风险识别",
    purposeZh: "识别太硬、太亲密、过度承诺、责任不清等真实沟通风险。",
    interactionZh: "读一句话或场景，点选主要风险。",
    usedFromLevel: "c1",
  },
  {
    id: "genre-move",
    labelZh: "文类动作",
    purposeZh: "学会合同摘要、会议纪要、公告、投诉回复等文本必须包含哪些 move。",
    interactionZh: "根据文类点选下一步应写的功能段。",
    usedFromLevel: "c1",
  },
  {
    id: "output-plan",
    labelZh: "输出计划",
    purposeZh: "为后续真正写作/口头输出打底，先学会组织结构。",
    interactionZh: "点选一段正式输出应该包含的结构顺序。",
    usedFromLevel: "c1",
  },
];

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

const A1_LEVELS = new Set<ContentLevel>(["pre-a1", "a1", "a1-plus"]);

interface GrammarLearningLineStep {
  pointId: string;
  titleZh: string;
  level: ContentLevel;
  order: number;
  trackId: string;
  trackTitleZh: string;
  coverageId?: string;
  coverageTitleZh?: string;
  reviewPointIds: string[];
}

const coverageByPointId = new Map<string, GrammarCoverageSection>();
for (const section of GRAMMAR_COVERAGE_SECTIONS) {
  for (const pointId of section.pointIds) {
    if (!coverageByPointId.has(pointId)) coverageByPointId.set(pointId, section);
  }
}

function buildA1GrammarLearningLine(): GrammarLearningLineStep[] {
  const seen = new Set<string>();
  const steps: GrammarLearningLineStep[] = [];

  const addPoint = (
    pointId: string,
    track: { id: string; titleZh: string },
    reviewPointIds: string[] = []
  ) => {
    const point = GRAMMAR_POINT_BY_ID[pointId];
    if (!point || !A1_LEVELS.has(point.level) || seen.has(point.id)) return;
    seen.add(point.id);
    const coverage = coverageByPointId.get(point.id);
    steps.push({
      pointId: point.id,
      titleZh: point.titleZh,
      level: point.level,
      order: steps.length + 1,
      trackId: track.id,
      trackTitleZh: track.titleZh,
      coverageId: coverage?.id,
      coverageTitleZh: coverage?.titleZh,
      reviewPointIds: reviewPointIds.filter((id) => id !== point.id),
    });
  };

  for (const track of GRAMMAR_TRACKS) {
    for (const pointId of track.pointIds) {
      addPoint(pointId, track, track.reviewPointIds ?? []);
    }
  }

  for (const section of GRAMMAR_COVERAGE_SECTIONS) {
    for (const pointId of section.pointIds) {
      addPoint(pointId, {
        id: `line-fill-${section.id}`,
        titleZh: `补全线 · ${section.titleZh}`,
      });
    }
  }

  return steps;
}

export const A1_GRAMMAR_LEARNING_LINE: GrammarLearningLineStep[] = buildA1GrammarLearningLine();

function makeLessonBriefExercise(point: GrammarPoint): GrammarExercise {
  return {
    id: `${point.id}:brief`,
    kind: "lesson-brief",
    pointId: point.id,
    pointTitleZh: point.titleZh,
    pointSummaryZh: point.summaryZh,
    promptZh: point.titleZh,
    instructionZh: "先看规则卡，再开始练习。",
    explanationZh: [
      point.summaryZh,
      point.patterns.length ? `常见结构：${point.patterns.join("；")}` : "",
      point.tags.length ? `标签：${point.tags.join(" / ")}` : "",
    ].filter(Boolean).join("\n"),
    choices: [{ id: `${point.id}:brief:ok`, label: "我看懂了，继续", correct: true }],
  };
}

function makeExampleShowcaseExercise(point: GrammarPoint, example: ThaiExample, index: number): GrammarExercise {
  return {
    id: `${point.id}:example-showcase:${index}`,
    kind: "example-showcase",
    pointId: point.id,
    pointTitleZh: point.titleZh,
    pointSummaryZh: point.summaryZh,
    promptZh: example.thai,
    instructionZh: `例句 ${index + 1}：先看这句话怎样使用这个语法点。`,
    explanationZh: [
      example.roman,
      example.chinese,
      example.literalZh ? `直译/提示：${example.literalZh}` : "",
    ].filter(Boolean).join("\n"),
    example,
    choices: [{ id: `${point.id}:example-showcase:${index}:ok`, label: "继续练这条", correct: true }],
  };
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

function modesForCoreSection(section: GrammarCoverageSection): GrammarTrainingMode[] {
  const modes: GrammarTrainingMode[] = ["recognition", "pattern", "example-comprehension", "classification"];
  if (section.level !== "pre-a1") modes.push("cloze", "ordering");
  if (/(语气|礼貌|语用|话题|篇章|被动|使役|转述|正式|register|discourse|pragmatic)/i.test(`${section.titleZh} ${section.titleEn}`)) {
    modes.push("register", "risk");
  }
  return Array.from(new Set(modes));
}

function coreSkillGoals(section: GrammarCoverageSection, points: GrammarPoint[]): string[] {
  return [
    `能用中文说清楚「${section.titleZh}」解决什么表达问题。`,
    "能在泰语例句里认出本节的核心结构和功能词。",
    "能把中文意思匹配到自然泰语句，而不是逐词翻译。",
    points.length >= 6 ? "能区分本节多个相近语法点的边界。" : "能用本节例句做基础替换练习。",
  ];
}

function pointSkillGoals(point: GrammarPoint): string[] {
  return [
    `能说清楚「${point.titleZh}」在泰语里解决什么表达问题。`,
    point.patterns.length
      ? `能认出并使用结构：${point.patterns.slice(0, 2).join(" / ")}。`
      : "能在例句里认出这个语法功能。",
    "能把泰文例句和中文意思对应起来，不靠逐字硬猜。",
    "能在相近语法点之间判断这条规则为什么适用。",
  ];
}

function advancedSkillGoals(competency: AdvancedGrammarCompetency): string[] {
  return [
    "能读懂真实材料里的语气、责任、来源和隐含立场。",
    "能根据对象和场景选择合适语域，不把语法正确误当成表达得体。",
    ...competency.drills.slice(0, 2).map((drill) => `${drill.titleZh}：${drill.successCriteriaZh.join("、")}。`),
  ];
}

function genreSkillGoals(genre: ProfessionalGenreTarget): string[] {
  return [
    `能识别「${genre.genreZh}」必须完成的文本动作。`,
    "能按功能段组织正式泰语文本，不只会翻译单句。",
    ...genre.assessmentZh.slice(0, 2),
  ];
}

const A1_CORE_GRAMMAR_LESSON_PLANS: GrammarLessonPlan[] = A1_GRAMMAR_LEARNING_LINE.map((step) => {
  const point = GRAMMAR_POINT_BY_ID[step.pointId];
  const examplesCount = pointExamples(point).length;
  return {
    id: `grammar-a1-${String(step.order).padStart(2, "0")}-${point.id}`,
    title: `A1 语法 ${step.order} · ${point.titleZh}`,
    subtitle: `${step.trackTitleZh}：${point.summaryZh}`,
    level: point.level,
    phase: "core",
    coverageId: step.coverageId,
    focusPointId: point.id,
    learningLineTitleZh: step.trackTitleZh,
    pointIds: [point.id],
    reviewPointIds: step.reviewPointIds,
    trainingModes: ["showcase", "recognition", "pattern", "example-comprehension", "classification", "cloze", "ordering"],
    skillGoalsZh: pointSkillGoals(point),
    examplesCount,
    estimatedQuestions: Math.max(10, examplesCount * 5 + point.patterns.length + 3),
  };
});

const LATER_COVERAGE_LESSON_PLANS: GrammarLessonPlan[] = GRAMMAR_COVERAGE_SECTIONS
  .filter((section) => !A1_LEVELS.has(section.level))
  .map((section, index) => {
    const points = lessonPoints(section);
    const examplesCount = points.reduce((sum, point) => sum + pointExamples(point).length, 0);
    return {
      id: `grammar-course-${section.id}`,
      title: `语法进阶 ${index + 1} · ${section.titleZh}`,
      subtitle: section.summaryZh,
      level: section.level,
      phase: "core",
      coverageId: section.id,
      pointIds: section.pointIds,
      trainingModes: modesForCoreSection(section),
      skillGoalsZh: coreSkillGoals(section, points),
      examplesCount,
      estimatedQuestions: Math.min(28, Math.max(8, points.length * 4 + examplesCount)),
    };
  });

const ADVANCED_GRAMMAR_LESSON_PLANS: GrammarLessonPlan[] = ADVANCED_GRAMMAR_COMPETENCIES.map((competency, index) => ({
  id: `grammar-advanced-${competency.id}`,
  title: `高级语法 ${index + 1} · ${competency.titleZh}`,
  subtitle: competency.summaryZh,
  level: competency.level,
  phase: "advanced",
  advancedCompetencyId: competency.id,
  pointIds: competency.grammarPointIds,
  trainingModes: ["recognition", "register", "risk", "genre-output"],
  skillGoalsZh: advancedSkillGoals(competency),
  outputTaskZh: competency.outputGenres.length
    ? `完成一个输出：${competency.outputGenres.slice(0, 3).join(" / ")}。`
    : undefined,
  examplesCount: competency.drills.length,
  estimatedQuestions: Math.max(10, competency.drills.length * 4 + competency.grammarPointIds.length),
}));

const PROFESSIONAL_OUTPUT_LESSON_PLANS: GrammarLessonPlan[] = PROFESSIONAL_GENRE_TARGETS.map((genre, index) => ({
  id: `grammar-output-${genre.id}`,
  title: `输出课 ${index + 1} · ${genre.genreZh}`,
  subtitle: genre.summaryZh,
  level: genre.level,
  phase: "professional-output",
  professionalGenreId: genre.id,
  pointIds: [],
  trainingModes: ["genre-output", "risk", "register"],
  skillGoalsZh: genreSkillGoals(genre),
  outputTaskZh: `按骨架完成：${genre.requiredMovesZh.join(" → ")}。`,
  examplesCount: genre.skeletonThai.length,
  estimatedQuestions: Math.max(8, genre.requiredMovesZh.length + genre.skeletonThai.length + 4),
}));

export const GRAMMAR_LESSON_PLANS: GrammarLessonPlan[] = [
  ...A1_CORE_GRAMMAR_LESSON_PLANS,
  ...LATER_COVERAGE_LESSON_PLANS,
  ...ADVANCED_GRAMMAR_LESSON_PLANS,
  ...PROFESSIONAL_OUTPUT_LESSON_PLANS,
];

function makeAdvancedConceptExercise(competency: AdvancedGrammarCompetency): GrammarExercise {
  const correct = {
    id: competency.id,
    label: competency.titleZh,
    subLabel: competency.summaryZh,
    correct: true,
  };
  const choices = choiceSet(
    correct,
    ADVANCED_GRAMMAR_COMPETENCIES.filter((item) => item.id !== competency.id).map((item) => ({
      id: item.id,
      label: item.titleZh,
      subLabel: item.summaryZh,
      correct: false,
    }))
  );
  return {
    id: `${competency.id}:advanced-concept`,
    kind: "concept-choice",
    pointId: competency.id,
    pointTitleZh: competency.titleZh,
    pointSummaryZh: competency.summaryZh,
    promptZh: competency.summaryZh,
    instructionZh: "这个 C1/C2 能力在训练什么？",
    explanationZh: `${competency.titleZh}：${competency.summaryZh}`,
    choices,
  };
}

function makeAdvancedDrillExercise(competency: AdvancedGrammarCompetency): GrammarExercise[] {
  return competency.drills.map((drill) => {
    const correct = {
      id: drill.id,
      label: drill.titleZh,
      subLabel: drill.instructionZh,
      correct: true,
    };
    const otherDrills = ADVANCED_GRAMMAR_COMPETENCIES.flatMap((item) => item.drills).filter((item) => item.id !== drill.id);
    return {
      id: `${competency.id}:drill:${drill.id}`,
      kind: "risk-detect" as const,
      pointId: competency.id,
      pointTitleZh: competency.titleZh,
      pointSummaryZh: competency.summaryZh,
      promptZh: drill.instructionZh,
      instructionZh: "这个任务最应该用哪一种训练方式？",
      explanationZh: `${drill.titleZh}：${drill.successCriteriaZh.join("；")}`,
      choices: choiceSet(
        correct,
        otherDrills.map((item) => ({
          id: item.id,
          label: item.titleZh,
          subLabel: item.instructionZh,
          correct: false,
        }))
      ),
    };
  });
}

function makeRegisterExercises(competency: AdvancedGrammarCompetency): GrammarExercise[] {
  const targets = REGISTER_TRANSFORMATION_TARGETS.filter((target) =>
    target.grammarPointIds.some((pointId) => competency.grammarPointIds.includes(pointId))
  ).slice(0, 4);

  return targets.map((target) => {
    const correct = {
      id: `${target.id}:after`,
      label: target.afterThai,
      subLabel: target.chinese,
      correct: true,
    };
    const distractors = REGISTER_TRANSFORMATION_TARGETS
      .filter((item) => item.id !== target.id)
      .slice(0, 8)
      .map((item) => ({
        id: `${target.id}:d:${item.id}`,
        label: item.afterThai,
        subLabel: item.chinese,
        correct: false,
      }));
    return {
      id: `${competency.id}:register:${target.id}`,
      kind: "register-rewrite" as const,
      pointId: competency.id,
      pointTitleZh: competency.titleZh,
      pointSummaryZh: competency.summaryZh,
      promptZh: `${target.situationZh}\n原句：${target.beforeThai}`,
      instructionZh: "点选更适合目标场景的泰语改写。",
      explanationZh: target.riskZh,
      choices: choiceSet(correct, distractors),
    };
  });
}

function makeGenreMoveExercise(genre: ProfessionalGenreTarget): GrammarExercise {
  const correctMove = genre.requiredMovesZh[0] ?? genre.genreZh;
  const otherMoves = PROFESSIONAL_GENRE_TARGETS
    .filter((item) => item.id !== genre.id)
    .flatMap((item) => item.requiredMovesZh);
  const correct = {
    id: `${genre.id}:move`,
    label: correctMove,
    subLabel: genre.summaryZh,
    correct: true,
  };
  return {
    id: `${genre.id}:genre-move`,
    kind: "genre-move",
    pointId: genre.id,
    pointTitleZh: genre.genreZh,
    pointSummaryZh: genre.summaryZh,
    promptZh: genre.summaryZh,
    instructionZh: "这种正式文本首先要完成哪个文本动作？",
    explanationZh: `${genre.genreZh} 常见结构：${genre.requiredMovesZh.join(" → ")}`,
    choices: choiceSet(
      correct,
      otherMoves.map((move, index) => ({
        id: `${genre.id}:move-d:${index}`,
        label: move,
        correct: false,
      }))
    ),
  };
}

function makeOutputPlanExercise(genre: ProfessionalGenreTarget): GrammarExercise | null {
  const tokens = genre.requiredMovesZh.map((label, index) => ({ id: `${index}:${label}`, label }));
  if (tokens.length < 2) return null;
  return {
    id: `${genre.id}:output-plan`,
    kind: "output-plan",
    pointId: genre.id,
    pointTitleZh: genre.genreZh,
    pointSummaryZh: genre.summaryZh,
    promptZh: genre.genreZh,
    instructionZh: "按顺序点选这类文本的结构。",
    explanationZh: `${genre.genreZh}：${genre.requiredMovesZh.join(" → ")}`,
    tokens: shuffleStrong(tokens),
    answerTokens: genre.requiredMovesZh,
  };
}

function buildAdvancedExercises(plan: GrammarLessonPlan, maxQuestions: number): GrammarExercise[] {
  const competency = ADVANCED_GRAMMAR_COMPETENCIES.find((item) => item.id === plan.advancedCompetencyId);
  if (!competency) return [];

  const pointExercises = competency.grammarPointIds
    .map((pointId) => GRAMMAR_POINT_BY_ID[pointId])
    .filter((point): point is GrammarPoint => Boolean(point))
    .flatMap((point) => {
      const examples = pointExamples(point);
      return [
        makeConceptExercise(point, GRAMMAR_POINTS),
        ...(examples[0] ? [makeMeaningExercise(point, examples[0])] : []),
        ...(examples[0] ? [makeClassifyExercise(point, examples[0], GRAMMAR_POINTS)] : []),
      ];
    });

  return shuffleStrong([
    makeAdvancedConceptExercise(competency),
    ...makeAdvancedDrillExercise(competency),
    ...makeRegisterExercises(competency),
    ...pointExercises,
  ]).slice(0, maxQuestions);
}

function buildProfessionalOutputExercises(plan: GrammarLessonPlan, maxQuestions: number): GrammarExercise[] {
  const genre = PROFESSIONAL_GENRE_TARGETS.find((item) => item.id === plan.professionalGenreId);
  if (!genre) return [];
  const outputPlan = makeOutputPlanExercise(genre);
  const skeletonExercises = genre.skeletonThai.slice(0, 4).map((line, index) => ({
    id: `${genre.id}:skeleton:${index}`,
    kind: "thai-choice" as const,
    pointId: genre.id,
    pointTitleZh: genre.genreZh,
    pointSummaryZh: genre.summaryZh,
    promptZh: genre.requiredMovesZh[index] ?? genre.summaryZh,
    instructionZh: "这一步可以用哪一句正式泰语表达？",
    explanationZh: `${genre.genreZh} 示例：${line}`,
    choices: choiceSet(
      { id: `${genre.id}:skeleton:${index}:correct`, label: line, correct: true },
      PROFESSIONAL_GENRE_TARGETS.flatMap((item) => item.skeletonThai)
        .filter((item) => item !== line)
        .slice(0, 8)
        .map((item, distractorIndex) => ({
          id: `${genre.id}:skeleton:${index}:d:${distractorIndex}`,
          label: item,
          correct: false,
        }))
    ),
  }));

  return shuffleStrong([
    makeGenreMoveExercise(genre),
    ...(outputPlan ? [outputPlan] : []),
    ...skeletonExercises,
  ]).slice(0, maxQuestions);
}

export function buildGrammarExercisesForLesson(
  lessonId: string,
  maxQuestions = 32
): GrammarExercise[] {
  const plan = GRAMMAR_LESSON_PLANS.find((lesson) => lesson.id === lessonId) ?? GRAMMAR_LESSON_PLANS[0];
  if (plan.phase === "advanced") return buildAdvancedExercises(plan, maxQuestions);
  if (plan.phase === "professional-output") return buildProfessionalOutputExercises(plan, maxQuestions);

  const points = plan.focusPointId
    ? [GRAMMAR_POINT_BY_ID[plan.focusPointId]].filter((point): point is GrammarPoint => Boolean(point))
    : GRAMMAR_COVERAGE_SECTIONS.find((item) => item.id === plan.coverageId)
      ? lessonPoints(GRAMMAR_COVERAGE_SECTIONS.find((item) => item.id === plan.coverageId) as GrammarCoverageSection)
      : [];
  if (points.length === 0) return [];
  const choicePool = plan.focusPointId
    ? A1_GRAMMAR_LEARNING_LINE
        .map((step) => GRAMMAR_POINT_BY_ID[step.pointId])
        .filter((point): point is GrammarPoint => Boolean(point))
    : points;
  const exercises: GrammarExercise[] = [];

  for (const point of points) {
    exercises.push(makeLessonBriefExercise(point));
    exercises.push(makeConceptExercise(point, choicePool));
    const pattern = makePatternExercise(point, choicePool);
    if (pattern) exercises.push(pattern);

    const examples = pointExamples(point);
    for (const [index, example] of examples.entries()) {
      exercises.push(makeExampleShowcaseExercise(point, example, index));
      exercises.push(makeMeaningExercise(point, example));
      exercises.push(makeThaiExercise(point, example));
      exercises.push(makeClassifyExercise(point, example, choicePool));
      const cloze = makeClozeExercise(point, example);
      if (cloze) exercises.push(cloze);
      const order = makeOrderExercise(point, example);
      if (order) exercises.push(order);
    }
  }

  const [brief, ...rest] = exercises;
  return [brief, ...shuffleStrong(rest)].filter(Boolean).slice(0, maxQuestions);
}
