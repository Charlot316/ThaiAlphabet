import { CONSONANTS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { Consonant, Vowel } from "@/data/types";

export type StudyPool = "consonant" | "vowel" | "both";

export interface StudyItem {
  id: string;
  front: string;
  answer: string;
  roman: string;
  name?: string;
  meaning?: string;
  speak: string;
  /** 用户「应该听到」的拼音对照，例如 "kor kai"、"ia (短)" */
  phonetic: string;
  pool: Exclude<StudyPool, "both">;
}

/**
 * 辅音 speak 文本：泰国小学课本的标准念法 = 字母 + อ + 词。
 * 例如 ก → "กอ ไก่" → TTS 念 "kor kai"，听者能清楚听到字母音 /k/ + 词。
 */
export function consonantSpeak(c: Consonant): string {
  return `${c.letter}อ ${c.name}`;
}

/**
 * 辅音的"应当听到"的拼音对照
 */
export function consonantPhonetic(c: Consonant): string {
  // 罗马音 + or 是字母名（"kor" / "khor" / "ngor"...）
  return `${c.romanInitial === "ʔ" ? "or" : c.romanInitial + "or"} ${c.nameRoman}`;
}

/**
 * 特殊元音的 fallback speak（这几个字符 TTS 单独念会出错或不识别）
 */
const VOWEL_SPEAK_OVERRIDE: Record<string, string> = {
  rue: "ฤดู",          // ฤ → 用「季节」演示，开头 "rue-"
  "rue-long": "หรือ",  // ฤๅ → 用 "或者" 演示长 ruee（最稳定的近音示范词）
  lue: "lue",          // ฦ 已废，没真正用词，让 TTS 用英文念字母组合
  "lue-long": "luee",  // ฦๅ 同上
};

const VOWEL_NEEDS_FALLBACK = new Set(Object.keys(VOWEL_SPEAK_OVERRIDE));

/**
 * 元音 speak 文本：把 ◌ 占位符替换为 ก（不替 อ，因为 อ 容易被 TTS 当独立辅音念出来，
 * 把元音"切断"成怪异音）。例如 เ◌อะ → "เกอะ" → TTS 念 "k-uh"，元音音位清晰。
 */
export function vowelSpeak(v: Vowel): string {
  if (VOWEL_NEEDS_FALLBACK.has(v.id)) return VOWEL_SPEAK_OVERRIDE[v.id];
  return v.display.replace(/◌/g, "ก");
}

/**
 * 元音"应当听到"的拼音对照
 */
export function vowelPhonetic(v: Vowel): string {
  if (v.id === "rue") return "rue";
  if (v.id === "rue-long") return "ruee (≈ 「หรือ」)";
  if (v.id === "lue") return "lue (已废)";
  if (v.id === "lue-long") return "luee (已废)";
  return `k-${v.roman.replace("(open)", "")} (${v.length === "long" ? "长" : "短"})`;
}

export function buildStudyItems(): StudyItem[] {
  const consonants = CONSONANTS.filter((c) => !c.obsolete).map((c) => ({
    id: `c:${c.id}`,
    front: c.letter,
    answer: `${c.romanInitial} · ${c.name} · ${c.meaning}`,
    roman: c.romanInitial,
    name: c.name,
    meaning: c.meaning,
    speak: consonantSpeak(c),
    phonetic: consonantPhonetic(c),
    pool: "consonant" as const,
  }));

  const vowels = VOWELS.map((v) => ({
    id: `v:${v.id}`,
    front: v.display,
    answer: `${v.roman} · ${v.length === "long" ? "长" : "短"}${v.notes ? " · " + v.notes : ""}`,
    roman: v.roman,
    speak: vowelSpeak(v),
    phonetic: vowelPhonetic(v),
    pool: "vowel" as const,
  }));

  return [...consonants, ...vowels];
}

export function filterStudyItems(items: StudyItem[], pool: StudyPool): StudyItem[] {
  return items.filter((item) => pool === "both" || item.pool === pool);
}

export function displayRoman(roman: string): string {
  return roman === "ʔ" ? "空/喉塞" : roman;
}

function randomInt(max: number): number {
  if (max <= 0) return 0;
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const value = new Uint32Array(1);
    crypto.getRandomValues(value);
    return value[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export function shuffleStrong<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function uniqueChoices<T>(
  correct: T,
  allOptions: T[],
  count: number,
  key: (item: T) => string
): T[] {
  const seen = new Set<string>([key(correct)]);
  const result = [correct];

  for (const option of shuffleStrong(allOptions)) {
    if (result.length >= count) break;
    const optionKey = key(option);
    if (!seen.has(optionKey)) {
      seen.add(optionKey);
      result.push(option);
    }
  }

  return shuffleStrong(result);
}
