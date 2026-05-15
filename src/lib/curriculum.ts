import { SHAPE_CONFUSABLES } from "@/data";
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
  id: "random" | "homophone" | "shape" | "vowel-length";
  title: string;
  subtitle: string;
}

export const COURSE_PROGRESS_KEY = "thai-alphabet:course-progress:v2";

const c = (ids: string[]) => ids.map((id) => `c:${id}`);
const v = (ids: string[]) => ids.map((id) => `v:${id}`);

const CONSONANT_GROUPS = [
  { label: "ก–ค", ids: ["ko-kai", "kho-khai", "kho-khuat", "kho-khwai"] },
  { label: "ฅ–จ", ids: ["kho-khon", "kho-rakhang", "ngo-ngu", "cho-chan"] },
  { label: "ฉ–ฌ", ids: ["cho-ching", "cho-chang", "so-so", "cho-choe"] },
  { label: "ญ–ฐ", ids: ["yo-ying", "do-chada", "to-patak", "tho-than"] },
  { label: "ฑ–ด", ids: ["tho-montho", "tho-phuthao", "no-nen", "do-dek"] },
  { label: "ต–ธ", ids: ["to-tao", "tho-thung", "tho-thahan", "tho-thong"] },
  { label: "น–ผ", ids: ["no-nu", "bo-baimai", "po-pla", "pho-phueng"] },
  { label: "ฝ–ภ", ids: ["fo-fa", "pho-phan", "fo-fan", "pho-samphao"] },
  { label: "ม–ล", ids: ["mo-ma", "yo-yak", "ro-ruea", "lo-ling"] },
  { label: "ว–ส", ids: ["wo-waen", "so-sala", "so-rusi", "so-suea"] },
  { label: "ห–ฮ", ids: ["ho-hip", "lo-chula", "o-ang", "ho-nokhuk"] },
];

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
    id: "vowel-length",
    title: "元音长短",
    subtitle: "把同一口型的短元音和长元音放在一起练",
  },
];

function unitFor(step: number): string {
  if (step <= 10) return "第一段 · 字母和开口元音";
  if (step <= 20) return "第二段 · 前置元音和短长对";
  if (step <= 31) return "第三段 · 复合元音";
  return "第四段 · 特殊元音和总复习";
}

function uniq(ids: string[]): string[] {
  return Array.from(new Set(ids));
}

function makeMainCourse(): CourseLesson[] {
  const lessons: CourseLesson[] = [];
  let step = 1;

  const add = (lesson: Omit<CourseLesson, "id" | "unit">) => {
    lessons.push({
      ...lesson,
      id: `L${String(step).padStart(2, "0")}`,
      unit: unitFor(step),
    });
    step += 1;
  };

  for (let i = 0; i < Math.max(CONSONANT_GROUPS.length, VOWEL_FAMILIES.length); i++) {
    const cg = CONSONANT_GROUPS[i];
    if (cg) {
      const ids = c(cg.ids);
      add({
        title: `辅音 ${cg.label}`,
        subtitle: "按字母表顺序认识新辅音",
        kind: "consonant",
        itemIds: ids,
        newItemIds: ids,
      });
    }

    const vg = VOWEL_FAMILIES[i];
    if (vg) {
      const ids = v(vg.ids);
      add({
        title: `元音 ${vg.label}`,
        subtitle: "成对学习口型接近的短长元音",
        kind: "vowel",
        itemIds: ids,
        newItemIds: ids,
      });
    }

    if (cg && vg) {
      const ids = [...c(cg.ids), ...v(vg.ids)];
      add({
        title: `拼读 ${cg.label} + ${vg.label}`,
        subtitle: "只用刚学过和已经解锁的元素做组合",
        kind: "blend",
        itemIds: ids,
        newItemIds: [],
      });
    }

    if ((i + 1) % 3 === 0) {
      const recentConsonants = CONSONANT_GROUPS.slice(Math.max(0, i - 2), i + 1).flatMap((g) => c(g.ids));
      const recentVowels = VOWEL_FAMILIES.slice(Math.max(0, i - 2), i + 1).flatMap((g) => v(g.ids));
      add({
        title: `阶段复习 ${Math.ceil((i + 1) / 3)}`,
        subtitle: "把前三组内容重新洗在一起",
        kind: "review",
        itemIds: uniq([...recentConsonants, ...recentVowels]),
        newItemIds: [],
      });
    }
  }

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
