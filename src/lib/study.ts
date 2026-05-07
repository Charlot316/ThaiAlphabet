import { CONSONANTS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";

export type StudyPool = "consonant" | "vowel" | "both";

export interface StudyItem {
  id: string;
  front: string;
  answer: string;
  roman: string;
  name?: string;
  meaning?: string;
  speak: string;
  pool: Exclude<StudyPool, "both">;
}

export function buildStudyItems(): StudyItem[] {
  const consonants = CONSONANTS.filter((c) => !c.obsolete).map((c) => ({
    id: `c:${c.id}`,
    front: c.letter,
    answer: `${c.romanInitial} · ${c.name} · ${c.meaning}`,
    roman: c.romanInitial,
    name: c.name,
    meaning: c.meaning,
    // speak 只用 mnemonic name，避免某些 TTS 不念孤立辅音字母（如 "ก"）
    // 单词的首音正好就是该字母的辅音音，例如 ไก่ 开头的 /k/ 就是 ก 的音
    speak: c.name,
    pool: "consonant" as const,
  }));

  const vowels = VOWELS.map((v) => ({
    id: `v:${v.id}`,
    front: v.display,
    answer: `${v.roman} · ${v.length === "long" ? "长" : "短"}${v.notes ? " · " + v.notes : ""}`,
    roman: v.roman,
    speak: v.display.replace(/◌/g, "อ"),
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
