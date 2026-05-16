import {
  ADVANCED_GRAMMAR_COMPETENCIES,
  C2_DOMAIN_TARGETS,
  GRAMMAR_COVERAGE_SECTIONS,
  LEXICON_BUILD_TARGET,
  PROFESSIONAL_GENRE_TARGETS,
  SHAPE_CONFUSABLES,
  VOCABULARY_MASTERY_BANDS,
  type ContentLevel,
} from "@/data";
import { CONSONANTS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import type { StudyItem } from "@/lib/study";

export type LessonKind = "consonant" | "vowel" | "blend" | "review";

export interface CourseLesson {
  id: string;
  unit: string;
  title: string;
  subtitle: string;
  kind: LessonKind;
  itemIds: string[];
  newItemIds: string[];
}

export interface CourseProgress {
  completedLessonIds: string[];
  updatedAt: number;
}

export interface PracticeMode {
  id: "random" | "homophone" | "shape" | "consonant-class" | "vowel-length";
  title: string;
  subtitle: string;
}

export const COURSE_PROGRESS_KEY = "thai-alphabet:course-progress:v2";

const c = (ids: string[]) => ids.map((id) => `c:${id}`);
const v = (ids: string[]) => ids.map((id) => `v:${id}`);

const MID_CONSONANTS = [
  "ko-kai",
  "cho-chan",
  "do-dek",
  "to-tao",
  "do-chada",
  "to-patak",
  "bo-baimai",
  "po-pla",
  "o-ang",
];

const HIGH_CONSONANTS = [
  "kho-khai",
  "kho-khuat",
  "cho-ching",
  "tho-thung",
  "tho-than",
  "pho-phueng",
  "fo-fa",
  "so-sala",
  "so-rusi",
  "so-suea",
  "ho-hip",
];

const LOW_CONSONANTS_1 = [
  "kho-khwai",
  "kho-khon",
  "kho-rakhang",
  "cho-chang",
  "so-so",
  "cho-choe",
  "tho-montho",
  "tho-phuthao",
  "tho-thahan",
  "tho-thong",
  "pho-phan",
  "fo-fan",
  "pho-samphao",
  "ho-nokhuk",
];

const LOW_CONSONANTS_2 = [
  "ngo-ngu",
  "yo-ying",
  "no-nen",
  "no-nu",
  "mo-ma",
  "yo-yak",
  "ro-ruea",
  "lo-ling",
  "wo-waen",
  "lo-chula",
];

const BASIC_VOWELS_1 = [
  "a-short",
  "a-long",
  "i-short",
  "i-long",
  "ue-short",
  "ue-long",
  "u-short",
  "u-long",
];

const BASIC_VOWELS_2 = [
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
];

const SPECIAL_VOWELS = ["am", "ai-maimalai", "ai-maimuan", "ao", "rue", "rue-long"];
const COMPOUND_VOWELS = ["ia-short", "ia-long", "uea-short", "uea-long", "ua-short", "ua-long"];
const RARE_SPECIAL_VOWELS = ["lue", "lue-long"];

export const VOWEL_FAMILIES = [
  { label: "a / aa", ids: ["a-short", "a-long"] },
  { label: "i / ii", ids: ["i-short", "i-long"] },
  { label: "ue / uue", ids: ["ue-short", "ue-long"] },
  { label: "u / uu", ids: ["u-short", "u-long"] },
  { label: "e / ee", ids: ["e-short", "e-long"] },
  { label: "ae / aae", ids: ["ae-short", "ae-long"] },
  { label: "o / oo", ids: ["o-short", "o-long"] },
  { label: "o(open) / oor", ids: ["oe-short", "or-long"] },
  { label: "oe / ooe", ids: ["er-short", "er-long"] },
  { label: "ia / iia", ids: ["ia-short", "ia-long"] },
  { label: "uea / uuea", ids: ["uea-short", "uea-long"] },
  { label: "ua / uua", ids: ["ua-short", "ua-long"] },
  { label: "am / ao", ids: ["am", "ao"] },
  { label: "ai", ids: ["ai-maimuan", "ai-maimalai"] },
  { label: "rue", ids: ["rue", "rue-long"] },
  { label: "lue", ids: ["lue", "lue-long"] },
];

export const PRACTICE_MODES: PracticeMode[] = [
  {
    id: "random",
    title: "随机小课",
    subtitle: "从已解锁内容里抽一组，类似旧版课程模式",
  },
  {
    id: "homophone",
    title: "同音字特训",
    subtitle: "同一个读音的字母全部放在一起，不再限制数量",
  },
  {
    id: "shape",
    title: "形近字特训",
    subtitle: "专门比较长得像、容易看混的字母和符号",
  },
  {
    id: "consonant-class",
    title: "辅音等级",
    subtitle: "专练中辅音、高辅音、低辅音判断",
  },
  {
    id: "vowel-length",
    title: "元音长短",
    subtitle: "把同一口型的短元音和长元音放在一起练",
  },
];

function uniq(ids: string[]): string[] {
  return Array.from(new Set(ids));
}

function consonantsByFinalSound(sounds: Array<(typeof CONSONANTS)[number]["finalSound"]>): string[] {
  const wanted = new Set(sounds);
  return c(CONSONANTS.filter((item) => wanted.has(item.finalSound)).map((item) => item.id));
}

function makeMainCourse(): CourseLesson[] {
  const lessons: CourseLesson[] = [];
  let step = 1;

  const add = (unit: string, lesson: Omit<CourseLesson, "id" | "unit">) => {
    lessons.push({
      ...lesson,
      id: `L${String(step).padStart(2, "0")}`,
      unit,
    });
    step += 1;
  };

  const allConsonants = c(CONSONANTS.map((item) => item.id));
  const allVowels = v(VOWELS.map((item) => item.id));
  const chapter1Core = [...c(MID_CONSONANTS), ...v(BASIC_VOWELS_1)];
  const chapter2Core = [...v(BASIC_VOWELS_2), ...v(SPECIAL_VOWELS)];
  const chapter4Core = c(HIGH_CONSONANTS);
  const chapter5Core = c(LOW_CONSONANTS_1);
  const chapter6Core = c(LOW_CONSONANTS_2);
  const chapter7Core = v(COMPOUND_VOWELS);

  add("第 1 课 · 中辅音和单元音", {
    title: "中辅音",
    subtitle: "ก จ ด ต ฎ ฏ บ ป อ；先建立中辅音和字母名。",
    kind: "consonant",
    itemIds: c(MID_CONSONANTS),
    newItemIds: c(MID_CONSONANTS),
  });
  add("第 1 课 · 中辅音和单元音", {
    title: "单元音（一）",
    subtitle: "-ะ -า -ิ -ี -ึ -ื -ุ -ู；先分清短长和上下位置。",
    kind: "vowel",
    itemIds: v(BASIC_VOWELS_1),
    newItemIds: v(BASIC_VOWELS_1),
  });
  add("第 1 课 · 中辅音和单元音", {
    title: "中辅音 + 单元音拼读",
    subtitle: "用中辅音搭配第一组单元音，先把基本 CV 音节跑顺。",
    kind: "blend",
    itemIds: chapter1Core,
    newItemIds: [],
  });

  add("第 2 课 · 单元音（二）和特殊元音", {
    title: "前置单元音",
    subtitle: "เ-ะ เ- แ-ะ แ- โ-ะ โ- เ-าะ -อ เ-อะ เ-อ。",
    kind: "vowel",
    itemIds: v(BASIC_VOWELS_2),
    newItemIds: v(BASIC_VOWELS_2),
  });
  add("第 2 课 · 单元音（二）和特殊元音", {
    title: "特殊元音",
    subtitle: "-ำ ไ- ใ- เ-า ฤ ฤๅ；注意 ไ / ใ 都读 ai，但用法不同。",
    kind: "vowel",
    itemIds: v(SPECIAL_VOWELS),
    newItemIds: v(SPECIAL_VOWELS),
  });
  add("第 2 课 · 单元音（二）和特殊元音", {
    title: "元音短长对照",
    subtitle: "把第 1-2 课的单元音混在一起，专门复习长短和相近读音。",
    kind: "review",
    itemIds: uniq([...v(BASIC_VOWELS_1), ...chapter2Core]),
    newItemIds: [],
  });

  add("第 3 课 · 中辅音声调", {
    title: "中辅音声调入门",
    subtitle: "认识 -่ -้ -๊ -๋ 的作用；先用中辅音做声调规则预备练习。",
    kind: "blend",
    itemIds: chapter1Core,
    newItemIds: [],
  });
  add("第 3 课 · 中辅音声调", {
    title: "中辅音声调复习",
    subtitle: "继续强化中辅音、短长元音、声调标记之间的关系。",
    kind: "review",
    itemIds: chapter1Core,
    newItemIds: [],
  });

  add("第 4 课 · 高辅音和声调", {
    title: "高辅音",
    subtitle: "ข ฃ ฉ ถ ฐ ผ ฝ ศ ษ ส ห；包含 ฃ 作为完整字母表补充。",
    kind: "consonant",
    itemIds: chapter4Core,
    newItemIds: chapter4Core,
  });
  add("第 4 课 · 高辅音和声调", {
    title: "高辅音 + 元音拼读",
    subtitle: "用高辅音搭配已学元音，开始对照高辅音声调规律。",
    kind: "blend",
    itemIds: uniq([...chapter4Core, ...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2)]),
    newItemIds: [],
  });

  add("第 5 课 · 低辅音（一）和声调", {
    title: "低辅音（一）",
    subtitle: "ค ฅ ฆ ช ซ ฌ ฑ ฒ ท ธ พ ฟ ภ ฮ；包含 ฅ 作为完整字母表补充。",
    kind: "consonant",
    itemIds: chapter5Core,
    newItemIds: chapter5Core,
  });
  add("第 5 课 · 低辅音（一）和声调", {
    title: "低辅音（一）声调预备",
    subtitle: "把低辅音（一）和已学元音拼起来，对照中/高/低辅音差异。",
    kind: "blend",
    itemIds: uniq([...chapter5Core, ...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2)]),
    newItemIds: [],
  });

  add("第 6 课 · 低辅音（二）", {
    title: "低辅音（二）",
    subtitle: "ง ญ ณ น ม ย ร ล ว ฬ；补齐常用响音类低辅音。",
    kind: "consonant",
    itemIds: chapter6Core,
    newItemIds: chapter6Core,
  });
  add("第 6 课 · 低辅音（二）", {
    title: "三类辅音总混合",
    subtitle: "把中、高、低辅音放在一起，重点判断类别和读音。",
    kind: "review",
    itemIds: allConsonants,
    newItemIds: [],
  });

  add("第 7 课 · 复合元音", {
    title: "复合元音",
    subtitle: "เ-ียะ เ-ีย เ-ือะ เ-ือ -ัวะ -ัว；按短长成组学习。",
    kind: "vowel",
    itemIds: chapter7Core,
    newItemIds: chapter7Core,
  });
  add("第 7 课 · 复合元音", {
    title: "复合元音拼读",
    subtitle: "把复合元音放进真实拼读，训练多元素元音从左到右识别。",
    kind: "blend",
    itemIds: uniq([...c(MID_CONSONANTS), ...c(LOW_CONSONANTS_2), ...chapter7Core]),
    newItemIds: [],
  });

  add("第 8 课 · 单元音小结", {
    title: "辅音小结",
    subtitle: "按字母表顺序、辅音类别、读音三条线复习 44 个辅音。",
    kind: "review",
    itemIds: allConsonants,
    newItemIds: [],
  });
  add("第 8 课 · 单元音小结", {
    title: "元音小结",
    subtitle: "复习单元音、特殊元音和复合元音，重点看长短和形状。",
    kind: "review",
    itemIds: uniq([...allVowels, ...v(RARE_SPECIAL_VOWELS)]),
    newItemIds: v(RARE_SPECIAL_VOWELS),
  });
  add("第 8 课 · 单元音小结", {
    title: "声调小结",
    subtitle: "中/高/低辅音 + 短长元音混合，为后面的尾辅音规则做准备。",
    kind: "blend",
    itemIds: uniq([...allConsonants, ...allVowels]),
    newItemIds: [],
  });

  add("第 9 课 · 清尾辅音", {
    title: "尾辅音总览",
    subtitle: "แม่กก แม่กด แม่กบ แม่กง แม่กน แม่กม แม่เกย แม่เกอว。",
    kind: "review",
    itemIds: allConsonants,
    newItemIds: [],
  });
  add("第 9 课 · 清尾辅音", {
    title: "响音尾辅音",
    subtitle: "แม่กง แม่กน แม่กม แม่เกย แม่เกอว；先熟悉可延长的尾音。",
    kind: "blend",
    itemIds: uniq([...consonantsByFinalSound(["ng", "n", "m", "y", "w"]), ...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2)]),
    newItemIds: [],
  });

  add("第 10 课 · 浊尾辅音", {
    title: "塞音尾辅音",
    subtitle: "แม่กก แม่กด แม่กบ；重点分清 k / t / p 三类尾音。",
    kind: "review",
    itemIds: consonantsByFinalSound(["k", "t", "p"]),
    newItemIds: [],
  });
  add("第 10 课 · 浊尾辅音", {
    title: "尾辅音对照",
    subtitle: "把响音尾和塞音尾混在一起，练最终读音而不是字母形状。",
    kind: "blend",
    itemIds: uniq([...allConsonants, ...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2)]),
    newItemIds: [],
  });

  add("第 11 课 · 前引字", {
    title: "不发音前引字",
    subtitle: "อ ห 作前引字时影响声调或读法，先从 อ / ห 识别开始。",
    kind: "review",
    itemIds: c(["o-ang", "ho-hip", ...LOW_CONSONANTS_2]),
    newItemIds: [],
  });
  add("第 11 课 · 前引字", {
    title: "发音前引字",
    subtitle: "高辅音和中辅音作前引字；用类别判断帮助记声调规则。",
    kind: "review",
    itemIds: uniq([...c(HIGH_CONSONANTS), ...c(MID_CONSONANTS)]),
    newItemIds: [],
  });

  add("第 12 课 · 复合辅音", {
    title: "真复合辅音",
    subtitle: "重点准备 กร กล กว ขร ขล ขว คร คล คว ตร ปร ปล พร พล 等组合。",
    kind: "blend",
    itemIds: uniq([...c(["ko-kai", "kho-khai", "kho-khwai", "to-tao", "po-pla", "pho-phan", "ro-ruea", "lo-ling", "wo-waen"]), ...v(BASIC_VOWELS_1)]),
    newItemIds: [],
  });
  add("第 12 课 · 复合辅音", {
    title: "假复合辅音",
    subtitle: "准备 จร ซร ศร สร ทร 等特殊读法，先用相近字形和读音复习。",
    kind: "review",
    itemIds: c(["cho-chan", "so-so", "so-sala", "so-suea", "tho-thahan", "ro-ruea"]),
    newItemIds: [],
  });

  add("第 13 课 · 特殊读法和符号", {
    title: "ร / รร 特殊读法",
    subtitle: "复习 ร และ ฤ；后续会增加 รร、์、ๆ、ฯ、ฯลฯ 专门题。",
    kind: "review",
    itemIds: uniq([...c(["ro-ruea"]), ...v(["rue", "rue-long"])]),
    newItemIds: [],
  });
  add("第 13 课 · 特殊读法和符号", {
    title: "常用符号预备",
    subtitle: "์ ๆ ฯ ฯลฯ 会在符号题型里单独补；这里先复习特殊元音和相关字母。",
    kind: "review",
    itemIds: uniq([...v(SPECIAL_VOWELS), ...c(["ro-ruea", "o-ang"])]),
    newItemIds: [],
  });

  add("第 14 课 · 语音小结", {
    title: "辅音排列和作用",
    subtitle: "按名称、初辅音、尾辅音、三类辅音重新扫完整字母表。",
    kind: "review",
    itemIds: allConsonants,
    newItemIds: [],
  });
  add("第 14 课 · 语音小结", {
    title: "元音排列和 ไ / ใ",
    subtitle: "按元音名称和排列顺序总复习，并再次区分 ไ- / ใ-。",
    kind: "review",
    itemIds: allVowels,
    newItemIds: [],
  });
  add("第 14 课 · 语音小结", {
    title: "语音期末预备",
    subtitle: "把辅音、元音、拼读、声调预备、尾辅音主题混合起来。",
    kind: "review",
    itemIds: uniq([...allConsonants, ...allVowels]),
    newItemIds: [],
  });

  return lessons;
}

export const MAIN_COURSE = makeMainCourse();

export function loadCourseProgress(): CourseProgress {
  if (typeof window === "undefined") return { completedLessonIds: [], updatedAt: 0 };
  try {
    const raw = JSON.parse(window.localStorage.getItem(COURSE_PROGRESS_KEY) || "null") as Partial<CourseProgress> | null;
    return {
      completedLessonIds: Array.isArray(raw?.completedLessonIds) ? raw.completedLessonIds : [],
      updatedAt: typeof raw?.updatedAt === "number" ? raw.updatedAt : 0,
    };
  } catch {
    return { completedLessonIds: [], updatedAt: 0 };
  }
}

export function saveCourseProgress(progress: CourseProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event("thai-alphabet:course-progress"));
}

export function completeCourseLesson(lessonId: string): CourseProgress {
  const current = loadCourseProgress();
  const completedLessonIds = uniq([...current.completedLessonIds, lessonId]);
  const next = { completedLessonIds, updatedAt: Date.now() };
  saveCourseProgress(next);
  return next;
}

export function resetCourseProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(COURSE_PROGRESS_KEY);
  window.dispatchEvent(new Event("thai-alphabet:course-progress"));
}

export function nextLesson(progress: CourseProgress, lessons: CourseLesson[] = MAIN_COURSE): CourseLesson | null {
  const completed = new Set(progress.completedLessonIds);
  return lessons.find((lesson) => !completed.has(lesson.id)) ?? null;
}

export function lessonStatus(
  lesson: CourseLesson,
  progress: CourseProgress,
  lessons: CourseLesson[] = MAIN_COURSE
): "done" | "current" | "locked" {
  if (progress.completedLessonIds.includes(lesson.id)) return "done";
  const next = nextLesson(progress, lessons);
  return next?.id === lesson.id ? "current" : "locked";
}

export function unlockedItemIds(
  progress: CourseProgress,
  throughLessonId?: string,
  lessons: CourseLesson[] = MAIN_COURSE
): Set<string> {
  const completed = new Set(progress.completedLessonIds);
  const targetIndex = throughLessonId ? lessons.findIndex((lesson) => lesson.id === throughLessonId) : -1;
  const next = nextLesson(progress, lessons);
  const nextIndex = next ? lessons.findIndex((lesson) => lesson.id === next.id) : lessons.length - 1;
  const maxIndex = Math.max(targetIndex, nextIndex, 0);
  const ids = new Set<string>();

  lessons.forEach((lesson, index) => {
    if (completed.has(lesson.id) || index <= maxIndex) {
      for (const id of lesson.itemIds) ids.add(id);
    }
  });

  return ids;
}

export function filterUnlockedItems<T extends { id: string }>(
  items: T[],
  progress: CourseProgress,
  throughLessonId?: string
): T[] {
  const ids = unlockedItemIds(progress, throughLessonId);
  const filtered = items.filter((item) => ids.has(item.id));
  return filtered.length > 0 ? filtered : items.slice(0, 4);
}

export function studyItemsByIds(items: StudyItem[], ids: string[]): StudyItem[] {
  const byId = new Map(items.map((item) => [item.id, item]));
  return ids.map((id) => byId.get(id)).filter((item): item is StudyItem => Boolean(item));
}

export function homophoneGroups(items: StudyItem[]): StudyItem[][] {
  const byRoman = new Map<string, StudyItem[]>();
  for (const item of items.filter((it) => it.pool === "consonant")) {
    byRoman.set(item.roman, [...(byRoman.get(item.roman) ?? []), item]);
  }
  return [...byRoman.values()].filter((group) => group.length > 1);
}

export function shapeGroups(items: StudyItem[]): StudyItem[][] {
  const groups: StudyItem[][] = [];
  for (const shapes of SHAPE_CONFUSABLES) {
    const group = items.filter((item) => shapes.includes(item.front));
    if (group.length > 1) groups.push(group);
  }
  return groups;
}

export function consonantClassItems(items: StudyItem[]): StudyItem[] {
  return items.filter((item) => item.pool === "consonant" && !!item.class);
}

export function vowelLengthGroups(items: StudyItem[]): StudyItem[][] {
  return VOWEL_FAMILIES
    .map((family) => studyItemsByIds(items, v(family.ids)))
    .filter((group) => group.length > 1);
}

export function allKnownStudyIds(): string[] {
  return [
    ...CONSONANTS.map((item) => `c:${item.id}`),
    ...VOWELS.map((item) => `v:${item.id}`),
  ];
}

export type CourseRoadmapPhaseId =
  | "phonics"
  | "core-grammar"
  | "advanced-grammar"
  | "vocabulary";

export type CourseRoadmapLessonKind =
  | "phonics-path"
  | "grammar-core"
  | "grammar-review"
  | "advanced-grammar"
  | "output-practice"
  | "vocabulary-band"
  | "domain-vocabulary";

export interface CourseVocabularyPlan {
  mode: "inline-with-grammar" | "dedicated-vocabulary";
  rankRange: [number, number];
  bandIds: string[];
  activeTarget?: number;
  domains: string[];
  noteZh: string;
}

export interface CourseRoadmapLesson {
  id: string;
  title: string;
  subtitle: string;
  kind: CourseRoadmapLessonKind;
  level: ContentLevel;
  sourceCourseLessonId?: string;
  studyItemIds?: string[];
  newGrammarCoverageIds?: string[];
  reviewGrammarCoverageIds?: string[];
  grammarPointIds?: string[];
  advancedCompetencyIds?: string[];
  professionalGenreIds?: string[];
  c2DomainTargetIds?: string[];
  vocabularyPlan?: CourseVocabularyPlan;
}

export interface CourseRoadmapUnit {
  id: string;
  phaseId: CourseRoadmapPhaseId;
  order: number;
  title: string;
  subtitle: string;
  level: ContentLevel;
  completionGateZh: string;
  lessons: CourseRoadmapLesson[];
}

export interface CourseRoadmapPhase {
  id: CourseRoadmapPhaseId;
  order: number;
  title: string;
  subtitle: string;
  unlockRuleZh: string;
  units: CourseRoadmapUnit[];
}

const coverageById = new Map(GRAMMAR_COVERAGE_SECTIONS.map((section) => [section.id, section]));
const bandById = new Map(VOCABULARY_MASTERY_BANDS.map((band) => [band.id, band]));
const advancedCompetencyById = new Map(ADVANCED_GRAMMAR_COMPETENCIES.map((item) => [item.id, item]));

function bandIdsForRange(range: [number, number]): string[] {
  const [start, end] = range;
  return VOCABULARY_MASTERY_BANDS.filter((band) => {
    const [bandStart, bandEnd] = band.passiveRange;
    return bandStart <= end && bandEnd >= start;
  }).map((band) => band.id);
}

function activeTargetForBandIds(bandIds: string[]): number | undefined {
  const targets = bandIds
    .map((id) => bandById.get(id)?.activeTarget)
    .filter((target): target is number => typeof target === "number");
  return targets.length > 0 ? Math.max(...targets) : undefined;
}

function splitRankRange(range: [number, number], parts: number, index: number): [number, number] {
  if (parts <= 1) return range;
  const [start, end] = range;
  const width = Math.ceil((end - start + 1) / parts);
  const itemStart = start + width * index;
  return [itemStart, Math.min(end, itemStart + width - 1)];
}

function pointIdsForCoverage(coverageIds: string[]): string[] {
  return uniq(coverageIds.flatMap((id) => coverageById.get(id)?.pointIds ?? []));
}

function inlineVocabularyPlan(
  range: [number, number],
  domains: string[],
  noteZh = "这批高频词跟语法一起学，只做点选、听辨、拼读和例句识别，不额外开输入题。"
): CourseVocabularyPlan {
  const bandIds = bandIdsForRange(range);
  return {
    mode: "inline-with-grammar",
    rankRange: range,
    bandIds,
    activeTarget: activeTargetForBandIds(bandIds),
    domains,
    noteZh,
  };
}

function dedicatedVocabularyPlan(
  range: [number, number],
  domains: string[],
  noteZh = "语法主线完成后再进入纯词汇课，重点扩被动识别、主动表达和场景输出。"
): CourseVocabularyPlan {
  const bandIds = bandIdsForRange(range);
  return {
    mode: "dedicated-vocabulary",
    rankRange: range,
    bandIds,
    activeTarget: activeTargetForBandIds(bandIds),
    domains,
    noteZh,
  };
}

const PHONICS_ROADMAP_UNIT: CourseRoadmapUnit = {
  id: "phonics-script-and-syllables",
  phaseId: "phonics",
  order: 1,
  title: "语音单元 · 字母、元音和拼读",
  subtitle: "沿用现在的字母表课程，先把文字和基础发音跑通。",
  level: "pre-a1",
  completionGateZh: "完成全部字母/元音/拼读小课，解锁语法主线。",
  lessons: MAIN_COURSE.map((lesson) => ({
    id: `roadmap-${lesson.id}`,
    title: lesson.title,
    subtitle: lesson.subtitle,
    kind: "phonics-path",
    level: "pre-a1",
    sourceCourseLessonId: lesson.id,
    studyItemIds: lesson.itemIds,
    newGrammarCoverageIds: ["coverage-01-phonology-writing"],
  })),
};

const CORE_GRAMMAR_UNIT_CONFIGS: Array<{
  id: string;
  title: string;
  subtitle: string;
  level: ContentLevel;
  coverageIds: string[];
  vocabularyRange: [number, number];
  vocabularyDomains: string[];
}> = [
  {
    id: "grammar-01-foundation",
    title: "语法 1 · 句子地基",
    subtitle: "先把无变位、是/有/在、人称、礼貌、问句和否定连起来。",
    level: "a1",
    coverageIds: [
      "coverage-02-word-classes",
      "coverage-17-copulative-sentences",
      "coverage-04-personal-reference",
      "coverage-14-speech-level-particles",
      "coverage-22-questions",
      "coverage-23-negation",
    ],
    vocabularyRange: [1, 1200],
    vocabularyDomains: ["core", "politeness", "identity", "question", "negation"],
  },
  {
    id: "grammar-02-nouns-classifiers",
    title: "语法 2 · 名词、指示词和量词",
    subtitle: "解决这个/那个、几个、第几个、谁的和名词后置修饰。",
    level: "a1",
    coverageIds: [
      "coverage-05-noun-phrases",
      "coverage-06-classifiers",
      "coverage-07-demonstratives",
    ],
    vocabularyRange: [1201, 2500],
    vocabularyDomains: ["people", "objects", "numbers", "shopping", "classifiers"],
  },
  {
    id: "grammar-03-verbs-time-modality",
    title: "语法 3 · 动词、时间和能力",
    subtitle: "把动作、时体、想要/应该/可以/会、结果可能放进同一套感觉里。",
    level: "a1-plus",
    coverageIds: [
      "coverage-10-verbs-transitivity",
      "coverage-13-aspect",
      "coverage-12-modality",
      "coverage-28-potential",
    ],
    vocabularyRange: [2501, 4000],
    vocabularyDomains: ["daily actions", "time", "ability", "work basics", "travel"],
  },
  {
    id: "grammar-04-description-wordbuilding",
    title: "语法 4 · 描述、比较和构词",
    subtitle: "练形容词谓语、程度、比较、复合词、重叠和身体表达。",
    level: "a2",
    coverageIds: [
      "coverage-08-adjectives-comparison-degree",
      "coverage-09-adverbs",
      "coverage-03-word-formation",
      "coverage-16-body-expressions",
    ],
    vocabularyRange: [4001, 6000],
    vocabularyDomains: ["quality", "manner", "body", "emotion", "word formation"],
  },
  {
    id: "grammar-05-clause-chains",
    title: "语法 5 · 连动、从句和转述",
    subtitle: "开始从短句进入原因、条件、目的、关系从句和 ว่า 转述。",
    level: "a2",
    coverageIds: [
      "coverage-18-serial-verbs",
      "coverage-19-relative-clauses",
      "coverage-20-complementation-quotation",
      "coverage-21-adverbial-clauses",
    ],
    vocabularyRange: [6001, 8000],
    vocabularyDomains: ["movement", "reason", "condition", "reporting", "opinions"],
  },
  {
    id: "grammar-06-voice-causative-purpose",
    title: "语法 6 · 被动、使役和受益",
    subtitle: "把 ถูก/โดน/ได้รับ、ทำให้、ให้、เพื่อ/เผื่อ 这些高频结构分清楚。",
    level: "b1",
    coverageIds: [
      "coverage-25-passive",
      "coverage-26-causative",
      "coverage-27-benefactive-purposive",
    ],
    vocabularyRange: [8001, 10000],
    vocabularyDomains: ["workplace", "services", "responsibility", "helping", "process"],
  },
  {
    id: "grammar-07-discourse-interaction",
    title: "语法 7 · 互动、篇章和自然泰语",
    subtitle: "收束 ก็、语气助词、请求命令、กัน、话题推进和指代追踪。",
    level: "b1",
    coverageIds: [
      "coverage-11-ko-linking-marker",
      "coverage-15-pragmatic-particles",
      "coverage-24-reciprocal-distributive-collective",
      "coverage-29-pragmatics-commands",
      "coverage-30-discourse",
    ],
    vocabularyRange: [10001, 12000],
    vocabularyDomains: ["interaction", "particles", "requests", "discourse", "social media"],
  },
];

function makeCoreGrammarUnits(): CourseRoadmapUnit[] {
  return CORE_GRAMMAR_UNIT_CONFIGS.map((unit, unitIndex) => {
    const grammarLessons = unit.coverageIds.map((coverageId, index) => {
      const section = coverageById.get(coverageId);
      const rankRange = splitRankRange(unit.vocabularyRange, unit.coverageIds.length, index);
      return {
        id: `${unit.id}-${String(index + 1).padStart(2, "0")}`,
        title: section?.titleZh ?? coverageId,
        subtitle: section?.summaryZh ?? unit.subtitle,
        kind: "grammar-core" as const,
        level: section?.level ?? unit.level,
        newGrammarCoverageIds: [coverageId],
        grammarPointIds: section?.pointIds ?? [],
        vocabularyPlan: inlineVocabularyPlan(rankRange, unit.vocabularyDomains),
      };
    });

    return {
      id: unit.id,
      phaseId: "core-grammar",
      order: unitIndex + 1,
      title: unit.title,
      subtitle: unit.subtitle,
      level: unit.level,
      completionGateZh: "本单元语法点和随堂高频词都达到基础掌握后，进入下一组。",
      lessons: [
        ...grammarLessons,
        {
          id: `${unit.id}-review`,
          title: `${unit.title} · 复习`,
          subtitle: "把本单元语法点、例句和高频词混在一起做识别、点选和拼读。",
          kind: "grammar-review" as const,
          level: unit.level,
          reviewGrammarCoverageIds: unit.coverageIds,
          grammarPointIds: pointIdsForCoverage(unit.coverageIds),
          vocabularyPlan: inlineVocabularyPlan(unit.vocabularyRange, unit.vocabularyDomains),
        },
      ],
    };
  });
}

const ADVANCED_GRAMMAR_UNIT_CONFIGS: Array<{
  id: string;
  title: string;
  subtitle: string;
  level: "c1" | "c2";
  competencyIds: string[];
  genreIds: string[];
  vocabularyRange: [number, number];
  vocabularyDomains: string[];
}> = [
  {
    id: "advanced-01-register-stance",
    title: "高级语法 1 · 语气、话题和立场",
    subtitle: "让泰语从“语法正确”变成“关系、立场和语气都对”。",
    level: "c1",
    competencyIds: [
      "c1-particle-stack-control",
      "c1-topic-information-structure",
      "c1-quotation-reporting-control",
    ],
    genreIds: ["genre-formal-email", "genre-news-briefing"],
    vocabularyRange: [12001, 15000],
    vocabularyDomains: ["register", "meetings", "reporting", "media", "customer service"],
  },
  {
    id: "advanced-02-formal-business",
    title: "高级语法 2 · 正式书面和商务文件",
    subtitle: "读懂并写出公告、合同摘要、会议纪要和行动项。",
    level: "c1",
    competencyIds: [
      "c1-formal-written-clause-chain",
      "c1-contract-obligation-condition",
      "c1-meeting-minutes-and-action-items",
    ],
    genreIds: ["genre-meeting-minutes", "genre-contract-summary", "genre-business-proposal"],
    vocabularyRange: [15001, 18000],
    vocabularyDomains: ["contracts", "operations", "procurement", "finance", "management"],
  },
  {
    id: "advanced-03-relationship-public",
    title: "高级语法 3 · 谈判、修复和公共话语",
    subtitle: "练委婉拒绝、投诉回应、责任边界和新闻/评论里的隐含立场。",
    level: "c2",
    competencyIds: [
      "c2-negotiation-face-saving",
      "c2-complaint-apology-repair",
      "c2-public-media-stance",
    ],
    genreIds: ["genre-complaint-reply", "genre-news-briefing"],
    vocabularyRange: [18001, 23000],
    vocabularyDomains: ["negotiation", "conflict", "public discourse", "policy", "social media"],
  },
  {
    id: "advanced-04-native-like-control",
    title: "高级语法 4 · 文化、学术和真实材料",
    subtitle: "处理仪式称谓、学术抽象写作、缩略语、口语噪音和暧昧表达。",
    level: "c2",
    competencyIds: [
      "c2-ritual-kinship-ceremonial",
      "c2-academic-abstract-writing",
      "c2-authentic-noise-control",
    ],
    genreIds: ["genre-ceremonial-speech", "genre-formal-email"],
    vocabularyRange: [23001, 30000],
    vocabularyDomains: ["kinship", "ritual", "academic", "idioms", "slang", "regional exposure"],
  },
];

function makeAdvancedGrammarUnits(): CourseRoadmapUnit[] {
  return ADVANCED_GRAMMAR_UNIT_CONFIGS.map((unit, unitIndex) => {
    const competencyLessons = unit.competencyIds.map((competencyId, index) => {
      const competency = advancedCompetencyById.get(competencyId);
      const rankRange = splitRankRange(unit.vocabularyRange, unit.competencyIds.length, index);
      return {
        id: `${unit.id}-${String(index + 1).padStart(2, "0")}`,
        title: competency?.titleZh ?? competencyId,
        subtitle: competency?.summaryZh ?? unit.subtitle,
        kind: "advanced-grammar" as const,
        level: unit.level,
        newGrammarCoverageIds: competency?.grammarCoverageIds ?? [],
        grammarPointIds: competency?.grammarPointIds ?? [],
        advancedCompetencyIds: [competencyId],
        vocabularyPlan: inlineVocabularyPlan(rankRange, unit.vocabularyDomains),
      };
    });

    const genreIds = unit.genreIds.filter((id) =>
      PROFESSIONAL_GENRE_TARGETS.some((genre) => genre.id === id)
    );

    return {
      id: unit.id,
      phaseId: "advanced-grammar",
      order: unitIndex + 1,
      title: unit.title,
      subtitle: unit.subtitle,
      level: unit.level,
      completionGateZh: "完成输入理解、改写、语域转换和至少一个输出作品后进入下一组。",
      lessons: [
        ...competencyLessons,
        {
          id: `${unit.id}-output`,
          title: `${unit.title} · 输出任务`,
          subtitle: "用真实商务/媒体/正式文本任务检查是否能主动使用。",
          kind: "output-practice" as const,
          level: unit.level,
          advancedCompetencyIds: unit.competencyIds,
          professionalGenreIds: genreIds,
          newGrammarCoverageIds: uniq(
            unit.competencyIds.flatMap((id) => advancedCompetencyById.get(id)?.grammarCoverageIds ?? [])
          ),
          grammarPointIds: uniq(
            unit.competencyIds.flatMap((id) => advancedCompetencyById.get(id)?.grammarPointIds ?? [])
          ),
          vocabularyPlan: inlineVocabularyPlan(unit.vocabularyRange, unit.vocabularyDomains),
        },
      ],
    };
  });
}

function makeVocabularyUnits(): CourseRoadmapUnit[] {
  const bandLessons: CourseRoadmapLesson[] = VOCABULARY_MASTERY_BANDS.map((band) => ({
    id: `vocab-band-${band.id}`,
    title: band.labelZh,
    subtitle: band.summaryZh,
    kind: "vocabulary-band",
    level: band.level,
    vocabularyPlan: dedicatedVocabularyPlan(band.passiveRange, band.domains),
  }));

  const domainLessons: CourseRoadmapLesson[] = C2_DOMAIN_TARGETS.map((target) => ({
    id: `vocab-domain-${target.id}`,
    title: target.titleZh,
    subtitle: target.summaryZh,
    kind: "domain-vocabulary",
    level: "c2",
    c2DomainTargetIds: [target.id],
    reviewGrammarCoverageIds: target.grammarCoverageIds,
    vocabularyPlan: dedicatedVocabularyPlan(
      [LEXICON_BUILD_TARGET.c1PassiveThreshold + 1, LEXICON_BUILD_TARGET.c2PassiveThreshold],
      target.vocabularyDomains,
      "C2 阶段按场景补专业词、固定搭配、语域词和真实材料词。"
    ),
  }));

  return [
    {
      id: "vocabulary-01-frequency-bands",
      phaseId: "vocabulary",
      order: 1,
      title: "词汇主线 · 高频到 C2",
      subtitle: "语法学完后，按频率段把被动词库推到 5 万级，主动词汇推到 2 万级。",
      level: "c2",
      completionGateZh: "每个频率段完成识别、听辨、例句理解和主动复述后进入下一段。",
      lessons: bandLessons,
    },
    {
      id: "vocabulary-02-professional-domains",
      phaseId: "vocabulary",
      order: 2,
      title: "词汇主线 · 专业和家业场景",
      subtitle: "最后按公司、合同、关系、媒体、文化等真实场景补齐术语和表达。",
      level: "c2",
      completionGateZh: "能在真实文件、会议、谈判和正式写作里调用这些词汇。",
      lessons: domainLessons,
    },
  ];
}

export const COURSE_ROADMAP_PHASES: CourseRoadmapPhase[] = [
  {
    id: "phonics",
    order: 1,
    title: "第一大单元 · 语音和文字",
    subtitle: "现有语音课程：字母、元音、声调和拼读先跑完。",
    unlockRuleZh: "默认解锁。",
    units: [PHONICS_ROADMAP_UNIT],
  },
  {
    id: "core-grammar",
    order: 2,
    title: "第二大单元 · 完整语法主线",
    subtitle: "语法必须完整学完；每节课顺带一小段高频词，不单独开纯词汇负担。",
    unlockRuleZh: "完成第一大单元后解锁。",
    units: makeCoreGrammarUnits(),
  },
  {
    id: "advanced-grammar",
    order: 3,
    title: "第三大单元 · C1/C2 高级语法和语域",
    subtitle: "把语法推进到真实材料、商务文件、正式写作、关系语气和专业输出。",
    unlockRuleZh: "完成核心语法后解锁；仍然继续随堂补高频和领域词。",
    units: makeAdvancedGrammarUnits(),
  },
  {
    id: "vocabulary",
    order: 4,
    title: "第四大单元 · 词汇主线",
    subtitle: "语法全部学完后再进入纯词汇课程，按频率和专业场景扩到精通。",
    unlockRuleZh: "完成第二、第三大单元全部语法课后解锁。",
    units: makeVocabularyUnits(),
  },
];

export const COURSE_ROADMAP_UNITS = COURSE_ROADMAP_PHASES.flatMap((phase) => phase.units);
export const COURSE_ROADMAP_LESSONS = COURSE_ROADMAP_UNITS.flatMap((unit) => unit.lessons);

export const COURSE_ROADMAP_POLICY = {
  grammarBeforeDedicatedVocabulary: true,
  grammarLessonsCarryHighFrequencyVocabulary: true,
  passiveLexiconTarget: LEXICON_BUILD_TARGET.passiveLexiconSize,
  activeC2Target: LEXICON_BUILD_TARGET.activeC2Target,
  dedicatedVocabularyStartsAfterPhaseIds: ["core-grammar", "advanced-grammar"] satisfies CourseRoadmapPhaseId[],
};

const plannedGrammarCoverageIds = new Set(
  COURSE_ROADMAP_LESSONS.flatMap((lesson) => [
    ...(lesson.newGrammarCoverageIds ?? []),
    ...(lesson.reviewGrammarCoverageIds ?? []),
  ])
);

export const COURSE_ROADMAP_COVERAGE = {
  grammarCoverageTotal: GRAMMAR_COVERAGE_SECTIONS.length,
  grammarCoveragePlanned: plannedGrammarCoverageIds.size,
  missingGrammarCoverageIds: GRAMMAR_COVERAGE_SECTIONS.map((section) => section.id).filter(
    (id) => !plannedGrammarCoverageIds.has(id)
  ),
  vocabularyBandIds: VOCABULARY_MASTERY_BANDS.map((band) => band.id),
  c2DomainTargetIds: C2_DOMAIN_TARGETS.map((target) => target.id),
};
