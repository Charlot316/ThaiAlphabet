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

export type LessonKind = "consonant" | "vowel" | "blend" | "review" | "tone-rule";

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
  skippedUnits: string[];
  updatedAt: number;
  resetAt?: number;
}

export const UNIT_CHALLENGE_MISTAKE_LIMIT = 2;

export interface PracticeMode {
  id: "random" | "homophone" | "shape" | "consonant-class" | "vowel-length" | "tone-rule";
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
  {
    id: "tone-rule",
    title: "声调拼读",
    subtitle: "辅音类别 + 元音长短 + 尾辅音 + 声调符号合起来推真实读音",
  },
];

function uniq(ids: string[]): string[] {
  return Array.from(new Set(ids));
}

function consonantsByFinalSound(sounds: Array<(typeof CONSONANTS)[number]["finalSound"]>): string[] {
  const wanted = new Set(sounds);
  return c(CONSONANTS.filter((item) => wanted.has(item.finalSound)).map((item) => item.id));
}

const COURSE_LABELS = new Map<string, string>([
  ...CONSONANTS.map((item) => [`c:${item.id}`, item.letter] as const),
  ...VOWELS.map((item) => [`v:${item.id}`, item.display] as const),
]);

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    out.push(items.slice(index, index + size));
  }
  return out;
}

function labels(ids: string[]): string {
  return ids.map((id) => COURSE_LABELS.get(id) ?? id).join(" ");
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

  const addChunks = (
    unit: string,
    title: string,
    kind: "consonant" | "vowel",
    ids: string[],
    size: number,
    note: string
  ) => {
    const parts = chunk(ids, size);
    parts.forEach((part, index) => {
      add(unit, {
        title: parts.length > 1 ? `${title} ${index + 1}` : title,
        subtitle: `${labels(part)}；${note}`,
        kind,
        itemIds: part,
        newItemIds: part,
      });
    });
  };

  const addPractice = (
    unit: string,
    title: string,
    subtitle: string,
    kind: "blend" | "review" | "tone-rule",
    ids: string[]
  ) => {
    add(unit, {
      title,
      subtitle,
      kind,
      itemIds: uniq(ids),
      newItemIds: [],
    });
  };

  const allConsonants = c(CONSONANTS.map((item) => item.id));
  const allVowels = v(VOWELS.map((item) => item.id));
  const chapter1Core = [...c(MID_CONSONANTS), ...v(BASIC_VOWELS_1)];
  const chapter2Core = [...v(BASIC_VOWELS_2), ...v(SPECIAL_VOWELS)];
  const chapter4Core = c(HIGH_CONSONANTS);
  const chapter5Core = c(LOW_CONSONANTS_1);
  const chapter6Core = c(LOW_CONSONANTS_2);
  const chapter7Core = v(COMPOUND_VOWELS);
  const firstBasicVowels = v(BASIC_VOWELS_1.slice(0, 4));
  const secondBasicVowels = v(BASIC_VOWELS_1.slice(4));
  const frontVowelsA = v(BASIC_VOWELS_2.slice(0, 4));
  const frontVowelsB = v(BASIC_VOWELS_2.slice(4, 8));
  const frontVowelsC = v(BASIC_VOWELS_2.slice(8));

  addChunks("第 1 课 · 中辅音和单元音", "中辅音", "consonant", c(MID_CONSONANTS), 3, "每次只认 3 个，先把中辅音类别钉住。");
  addChunks("第 1 课 · 中辅音和单元音", "单元音（一）", "vowel", v(BASIC_VOWELS_1), 4, "按口型和短长成组学习。");
  addPractice("第 1 课 · 中辅音和单元音", "中辅音拼读（一）", "只用前三个中辅音和第一组单元音做 CV 拼读。", "blend", [...c(MID_CONSONANTS.slice(0, 3)), ...firstBasicVowels]);
  addPractice("第 1 课 · 中辅音和单元音", "中辅音拼读（二）", "扩展到全部中辅音和第二组单元音。", "blend", chapter1Core);

  addChunks("第 2 课 · 单元音（二）和特殊元音", "前置单元音", "vowel", v(BASIC_VOWELS_2), 4, "前置写法容易混，分小组看位置。");
  addChunks("第 2 课 · 单元音（二）和特殊元音", "特殊元音", "vowel", v(SPECIAL_VOWELS), 3, "一次只处理 3 个特殊元音。");
  addPractice("第 2 课 · 单元音（二）和特殊元音", "前置元音拼读", "把前置元音放进中辅音拼读，避免只记图形。", "blend", [...c(MID_CONSONANTS), ...frontVowelsA, ...frontVowelsB, ...frontVowelsC]);
  addPractice("第 2 课 · 单元音（二）和特殊元音", "特殊元音对照", "复习 -ำ / เ-า / ไ- / ใ- / ฤ / ฤๅ 的读音和形状。", "review", chapter2Core);

  addPractice("第 3 课 · 中辅音声调", "声调符号认识", "先记 -่ -้ -๊ -๋ 四个声调符号和它们出现的位置。", "review", chapter1Core);
  addPractice("第 3 课 · 中辅音声调", "中辅音 + 短元音", "用中辅音和短元音做声调规则预备。", "blend", [...c(MID_CONSONANTS), ...v(["a-short", "i-short", "ue-short", "u-short"])]);
  addPractice("第 3 课 · 中辅音声调", "中辅音 + 长元音", "用中辅音和长元音做声调规则预备。", "blend", [...c(MID_CONSONANTS), ...v(["a-long", "i-long", "ue-long", "u-long"])]);
  addPractice("第 3 课 · 中辅音声调", "中辅音声调推导", "先看规则讲解，再带提示做声调推导：中辅音 + 元音长短 + 声调符号。", "tone-rule", [...c(MID_CONSONANTS), ...v(BASIC_VOWELS_1)]);
  addPractice("第 3 课 · 中辅音声调", "中辅音声调复习", "把中辅音、短长元音、声调标记之间的关系再洗一遍；仍保留规则提示。", "review", chapter1Core);

  addChunks("第 4 课 · 高辅音和声调", "高辅音", "consonant", chapter4Core, 4, "分批认识高辅音，持续判断高中低。");
  addPractice("第 4 课 · 高辅音和声调", "高辅音拼读（一）", "高辅音搭配基础短长元音，先建立读音连接。", "blend", [...chapter4Core.slice(0, 6), ...v(BASIC_VOWELS_1)]);
  addPractice("第 4 课 · 高辅音和声调", "高辅音声调推导", "先讲高辅音活/死音节默认声调，再带提示做推导题。", "tone-rule", [...chapter4Core, ...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2.slice(0, 4))]);
  addPractice("第 4 课 · 高辅音和声调", "高辅音声调预备", "把高辅音与中辅音放在一起，对照类别差异。", "review", uniq([...chapter4Core, ...c(MID_CONSONANTS)]));

  addChunks("第 5 课 · 低辅音（一）和声调", "低辅音（一）", "consonant", chapter5Core, 4, "低辅音数量多，按 4 个左右一组推进。");
  addPractice("第 5 课 · 低辅音（一）和声调", "低辅音（一）拼读", "低辅音（一）搭配已学元音，先练读音连接。", "blend", [...chapter5Core, ...v(BASIC_VOWELS_1)]);
  addPractice("第 5 课 · 低辅音（一）和声调", "低辅音声调推导", "先讲低辅音活音节、死短、死长三条规则，再带提示做推导题。", "tone-rule", [...chapter5Core, ...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2.slice(0, 4))]);
  addPractice("第 5 课 · 低辅音（一）和声调", "低辅音（一）声调预备", "把低辅音（一）和中/高辅音混合判断。", "review", uniq([...chapter5Core, ...c(MID_CONSONANTS), ...chapter4Core]));

  addChunks("第 6 课 · 低辅音（二）", "低辅音（二）", "consonant", chapter6Core, 3, "响音类低辅音更常见，拆小组反复见。");
  addPractice("第 6 课 · 低辅音（二）", "低辅音（二）拼读", "低辅音（二）搭配已学元音，特别注意 ง ญ น ม ย ร ล ว ฬ。", "blend", [...chapter6Core, ...v(BASIC_VOWELS_1)]);
  addPractice("第 6 课 · 低辅音（二）", "三类辅音总混合", "把中、高、低辅音放在一起，重点判断类别和读音。", "review", allConsonants);

  addChunks("第 7 课 · 复合元音", "复合元音", "vowel", chapter7Core, 2, "每次一组短长复合元音。");
  addPractice("第 7 课 · 复合元音", "复合元音拼读（一）", "用中辅音和复合元音练多元素元音。", "blend", [...c(MID_CONSONANTS), ...chapter7Core]);
  addPractice("第 7 课 · 复合元音", "复合元音拼读（二）", "加入低辅音（二），训练更自然的复合元音拼读。", "blend", uniq([...c(LOW_CONSONANTS_2), ...chapter7Core]));

  addPractice("第 8 课 · 单元音小结", "辅音类别小结", "按中/高/低三类重新复习 44 个辅音。", "review", allConsonants);
  addPractice("第 8 课 · 单元音小结", "单元音小结", "复习所有单元音，重点看短长和位置。", "review", uniq([...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2)]));
  addPractice("第 8 课 · 单元音小结", "特殊和复合元音小结", "复习特殊元音、复合元音和 ฦ / ฦๅ。", "review", uniq([...v(SPECIAL_VOWELS), ...chapter7Core, ...v(RARE_SPECIAL_VOWELS)]));
  addPractice("第 8 课 · 单元音小结", "声调小结", "中/高/低辅音 + 短长元音混合，为尾辅音规则做准备。", "blend", uniq([...allConsonants, ...allVowels]));

  addPractice("第 9 课 · 清尾辅音", "แม่กก / แม่กด / แม่กบ", "先分清 k / t / p 三类塞音尾。", "review", consonantsByFinalSound(["k", "t", "p"]));
  addPractice("第 9 课 · 清尾辅音", "แม่กง / แม่กน / แม่กม", "练 ng / n / m 三类响音尾。", "review", consonantsByFinalSound(["ng", "n", "m"]));
  addPractice("第 9 课 · 清尾辅音", "แม่เกย / แม่เกอว", "练 y / w 两类滑音尾。", "review", consonantsByFinalSound(["y", "w"]));
  addPractice("第 9 课 · 清尾辅音", "尾辅音拼读", "把八类尾辅音和已学元音混合起来。", "blend", uniq([...allConsonants, ...firstBasicVowels, ...frontVowelsA]));

  addPractice("第 10 课 · 浊尾辅音", "塞音尾规则", "集中练 แม่กก แม่กด แม่กบ，读音只保留 k / t / p。", "review", consonantsByFinalSound(["k", "t", "p"]));
  addPractice("第 10 课 · 浊尾辅音", "塞音尾 + 短元音", "塞音尾和短元音组合，准备活音/死音判断。", "blend", uniq([...consonantsByFinalSound(["k", "t", "p"]), ...v(["a-short", "i-short", "u-short", "e-short", "o-short"])]));
  addPractice("第 10 课 · 浊尾辅音", "活音节 / 死音节判断", "先讲活音节/死音节定义，再带提示判断元音长短和尾辅音类型。", "tone-rule", uniq([...c(MID_CONSONANTS), ...chapter4Core, ...chapter5Core, ...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2.slice(0, 4))]));
  addPractice("第 10 课 · 浊尾辅音", "尾辅音对照", "把响音尾和塞音尾混在一起，练最终读音而不是字母形状。", "blend", uniq([...allConsonants, ...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2)]));
  addPractice("第 10 课 · 浊尾辅音", "尾辅音 + 声调综合", "全单元综合推导：辅音类别 + 元音长短 + 尾辅音类型 + 声调符号 → 真实声调。", "tone-rule", uniq([...allConsonants, ...v(BASIC_VOWELS_1), ...v(BASIC_VOWELS_2)]));

  addPractice("第 11 课 · 前引字", "不发音前引字 อ / ห", "อ / ห 作前引字时影响声调或读法，先抓住两个前引核心字。", "review", c(["o-ang", "ho-hip", ...LOW_CONSONANTS_2]));
  addPractice("第 11 课 · 前引字", "高辅音前引字", "ข ฉ ถ ฐ ผ ฝ ศ ส ษ 作前引字时，先用高辅音类别帮助记忆。", "review", c(["kho-khai", "cho-ching", "tho-thung", "tho-than", "pho-phueng", "fo-fa", "so-sala", "so-suea", "so-rusi"]));
  addPractice("第 11 课 · 前引字", "中辅音前引字", "ก จ ด ฎ ต ฏ บ ป อ 作前引字时，回到中辅音类别判断。", "review", c(MID_CONSONANTS));

  addPractice("第 12 课 · 复合辅音", "真复合辅音（一）", "กร กล กว ขร ขล ขว：先练 ก/ข 开头的复合辅音预备。", "blend", uniq([...c(["ko-kai", "kho-khai", "ro-ruea", "lo-ling", "wo-waen"]), ...firstBasicVowels]));
  addPractice("第 12 课 · 复合辅音", "真复合辅音（二）", "คร คล คว ตร ปร ปล พร พล：继续练常用真复合辅音预备。", "blend", uniq([...c(["kho-khwai", "to-tao", "po-pla", "pho-phan", "ro-ruea", "lo-ling", "wo-waen"]), ...secondBasicVowels]));
  addPractice("第 12 课 · 复合辅音", "假复合辅音", "จร ซร ศร สร ทร 等特殊读法，先用相近字形和读音复习。", "review", c(["cho-chan", "so-so", "so-sala", "so-suea", "tho-thahan", "ro-ruea"]));

  addPractice("第 13 课 · 特殊读法和符号", "ร / รร 特殊读法", "复习 ร และ ฤ；后续会增加 รร 专门题。", "review", uniq([...c(["ro-ruea"]), ...v(["rue", "rue-long"])]));
  addPractice("第 13 课 · 特殊读法和符号", "์ 静音符号预备", "先复习带 ยักษ์ 等记忆词的字母，后续补 ์ 专门题。", "review", c(["yo-yak", "ho-nokhuk", "ro-ruea"]));
  addPractice("第 13 课 · 特殊读法和符号", "ๆ ฯ ฯลฯ 符号预备", "符号题型后续单独补；这里先复习特殊元音和相关字母。", "review", uniq([...v(SPECIAL_VOWELS), ...c(["ro-ruea", "o-ang"])]));

  addPractice("第 14 课 · 语音小结", "辅音排列和名称", "按名称、初辅音、三类辅音重新扫完整字母表。", "review", allConsonants);
  addPractice("第 14 课 · 语音小结", "辅音尾音总复习", "按尾辅音作用重新扫完整字母表。", "review", allConsonants);
  addPractice("第 14 课 · 语音小结", "元音排列和 ไ / ใ", "按元音名称和排列顺序总复习，并再次区分 ไ- / ใ-。", "review", allVowels);
  addPractice("第 14 课 · 语音小结", "语音期末预备", "把辅音、元音、拼读、声调预备、尾辅音主题混合起来。", "review", uniq([...allConsonants, ...allVowels]));

  return lessons;
}

export const MAIN_COURSE = makeMainCourse();

export function loadCourseProgress(): CourseProgress {
  if (typeof window === "undefined") return { completedLessonIds: [], skippedUnits: [], updatedAt: 0 };
  try {
    const raw = JSON.parse(window.localStorage.getItem(COURSE_PROGRESS_KEY) || "null") as Partial<CourseProgress> | null;
    return {
      completedLessonIds: Array.isArray(raw?.completedLessonIds) ? raw.completedLessonIds : [],
      skippedUnits: Array.isArray(raw?.skippedUnits) ? raw.skippedUnits : [],
      updatedAt: typeof raw?.updatedAt === "number" ? raw.updatedAt : 0,
      resetAt: typeof raw?.resetAt === "number" ? raw.resetAt : undefined,
    };
  } catch {
    return { completedLessonIds: [], skippedUnits: [], updatedAt: 0 };
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
  const next = {
    completedLessonIds,
    skippedUnits: current.skippedUnits,
    updatedAt: Date.now(),
    resetAt: current.resetAt,
  };
  saveCourseProgress(next);
  return next;
}

export function markUnitSkipped(unit: string): CourseProgress {
  const current = loadCourseProgress();
  const skippedUnits = uniq([...current.skippedUnits, unit]);
  const next = {
    completedLessonIds: current.completedLessonIds,
    skippedUnits,
    updatedAt: Date.now(),
    resetAt: current.resetAt,
  };
  saveCourseProgress(next);
  return next;
}

export function resetCourseProgress() {
  if (typeof window === "undefined") return;
  const now = Date.now();
  saveCourseProgress({ completedLessonIds: [], skippedUnits: [], updatedAt: now, resetAt: now });
}

function isLessonPassed(lesson: CourseLesson, progress: CourseProgress): boolean {
  return progress.completedLessonIds.includes(lesson.id) || progress.skippedUnits.includes(lesson.unit);
}

export function nextLesson(progress: CourseProgress, lessons: CourseLesson[] = MAIN_COURSE): CourseLesson | null {
  return lessons.find((lesson) => !isLessonPassed(lesson, progress)) ?? null;
}

export function lessonStatus(
  lesson: CourseLesson,
  progress: CourseProgress,
  lessons: CourseLesson[] = MAIN_COURSE
): "done" | "skipped" | "current" | "locked" {
  if (progress.completedLessonIds.includes(lesson.id)) return "done";
  if (progress.skippedUnits.includes(lesson.unit)) return "skipped";
  const next = nextLesson(progress, lessons);
  return next?.id === lesson.id ? "current" : "locked";
}

export function unitStatus(
  unit: string,
  progress: CourseProgress,
  lessons: CourseLesson[] = MAIN_COURSE
): "done" | "skipped" | "current" | "locked" {
  const unitLessons = lessons.filter((lesson) => lesson.unit === unit);
  if (unitLessons.length === 0) return "locked";
  if (progress.skippedUnits.includes(unit)) return "skipped";
  if (unitLessons.every((lesson) => progress.completedLessonIds.includes(lesson.id))) return "done";
  const next = nextLesson(progress, lessons);
  return next && next.unit === unit ? "current" : "locked";
}

export function unitStudyItemIds(unit: string, lessons: CourseLesson[] = MAIN_COURSE): string[] {
  return uniq(
    lessons
      .filter((lesson) => lesson.unit === unit)
      .flatMap((lesson) => lesson.itemIds)
  );
}

export function unlockedItemIds(
  progress: CourseProgress,
  throughLessonId?: string,
  lessons: CourseLesson[] = MAIN_COURSE
): Set<string> {
  const targetIndex = throughLessonId ? lessons.findIndex((lesson) => lesson.id === throughLessonId) : -1;
  const next = nextLesson(progress, lessons);
  const nextIndex = next ? lessons.findIndex((lesson) => lesson.id === next.id) : lessons.length - 1;
  const maxIndex = Math.max(targetIndex, nextIndex, 0);
  const ids = new Set<string>();

  lessons.forEach((lesson, index) => {
    if (isLessonPassed(lesson, progress) || index <= maxIndex) {
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
  sourceCourseUnit?: string;
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
  completionGateZh: "完成 14 个语音阶段，解锁语法主线。",
  lessons: Object.entries(
    MAIN_COURSE.reduce<Record<string, CourseLesson[]>>((acc, lesson) => {
      acc[lesson.unit] = [...(acc[lesson.unit] ?? []), lesson];
      return acc;
    }, {})
  ).map(([unit, lessons], index) => ({
    id: `roadmap-phonics-unit-${String(index + 1).padStart(2, "0")}`,
    title: unit,
    subtitle: `${lessons.length} 节小课 · ${lessons.map((lesson) => lesson.title).join(" / ")}`,
    kind: "phonics-path",
    level: "pre-a1",
    sourceCourseUnit: unit,
    sourceCourseLessonId: lessons[0]?.id,
    studyItemIds: uniq(lessons.flatMap((lesson) => lesson.itemIds)),
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
