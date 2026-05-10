import { CONSONANTS, consonantsByInitialSound } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { Consonant, Vowel, SHAPE_CONFUSABLES } from "@/data";

export { SHAPE_CONFUSABLES, consonantsByInitialSound, CONSONANTS };

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
  class?: string;
}

/**
 * 个别 mnemonic 词含 ฤๅ / ฦๅ 等 TTS 通常念不出的字符。
 * 用拼音化的合法泰文音节代替，让 TTS 能正确念出近似音。
 */
const CONSONANT_SPEAK_OVERRIDE: Record<string, string> = {
  // ฤๅษี (ru-si) → 用 รือสี 同音替代（保留 mnemonic 词在 UI 显示，speak 用替代）
  "so-rusi": "ษอ รือสี",
};

/**
 * 辅音 speak 文本：泰国小学课本的标准念法 = 字母 + อ + 词。
 * 例如 ก → "กอ ไก่" → TTS 念 "kor kai"，听者能清楚听到字母音 /k/ + 词。
 */
export function consonantSpeak(c: Consonant): string {
  return CONSONANT_SPEAK_OVERRIDE[c.id] ?? `${c.letter}อ ${c.name}`;
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
  // ฤ / ฤๅ：合法但极少独立使用的字符。用合法音节 รือ 模拟 [rɯɯ] 音。
  rue: "รือ",
  "rue-long": "รือ",
  // ฦ / ฦๅ：已废字符，无现代词例。用合法泰文 ลือ（「传闻」）演示 [lɯɯ]。
  lue: "ลือ",
  "lue-long": "ลือ",
  // 短 oe 元音 เ-อะ 在 TTS 里常被拆成 "เก + อะ"。
  // 用现实词 เคอะ「笨拙/局促」(/kʰɤʔ/) 做演示，开头是 ค (kh)，
  // 跟其它元音用 ก 占位的 k 系列保持视听一致。
  "er-short": "เคอะ",
  // 短 e/ae/o 也容易被尾巴 ะ 拆成两个音节，但通常还能识别，先不动。
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
  if (v.id === "rue") return "rue (短)";
  if (v.id === "rue-long") return "ruee (长)";
  if (v.id === "lue") return "lue (已废)";
  if (v.id === "lue-long") return "luee (已废)";
  if (v.id === "er-short") return "kh-əh (短 ə，≈ เคอะ)";
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
    class: c.class,
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

/**
 * 获取所有的专门训练组：同音字组 和 形近字组
 */
export function getSpecializedGroups(allItems: StudyItem[]): StudyItem[][] {
  const groups: StudyItem[][] = [];

  // 1. 同音字组 (仅限辅音)
  const bySound = consonantsByInitialSound();
  for (const sound in bySound) {
    const ids = bySound[sound].map(id => `c:${id}`);
    if (ids.length > 1) {
      const group = allItems.filter(item => ids.includes(item.id));
      if (group.length > 1) groups.push(group);
    }
  }

  // 2. 形近字组
  for (const shapes of SHAPE_CONFUSABLES) {
    const group = allItems.filter(item => shapes.includes(item.front));
    if (group.length > 1) groups.push(group);
  }

  return groups;
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
