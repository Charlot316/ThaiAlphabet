import { CONSONANTS } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { calculateTone, syllableLifetime, TONE_MARKS, TONE_NAMES } from "@/data/tones";
import { Consonant, ToneMark, ToneName, Vowel } from "@/data/types";

export interface BuiltSyllable {
  initial: Consonant;
  vowel: Vowel;
  finalConsonant: Consonant | null;
  toneMark: ToneMark;
  thai: string;          // 拼出的泰语字符串（含字符位置）
  roman: string;         // 罗马音
  tone: ToneName;        // 计算出的声调
  life: "live" | "dead";
}

const PLACEHOLDER = /◌/g;

/**
 * 把 vowel.form 中的 ◌ 替换为辅音，并按需要插入尾辅音与声调符号。
 * 复杂的元音形态（前置/后置/绕字符）通过简单替换得到正确视觉效果。
 * 对于带尾辅音的「元音简化」(如 โ-ะ + 尾 -> 短 o 形式) 不做特殊形变，保留显式形态以便学习理解。
 */
export function renderSyllableThai(
  initial: Consonant,
  vowel: Vowel,
  finalConsonant: Consonant | null,
  mark: ToneMark
): string {
  let s = vowel.form.replace(PLACEHOLDER, initial.letter);
  const markSymbol = TONE_MARKS.find((m) => m.id === mark)?.symbol ?? "";
  if (mark !== "none" && markSymbol) {
    // 把声调符号尽量放在初辅音之后（粗略策略）
    const idx = s.indexOf(initial.letter) + initial.letter.length;
    s = s.slice(0, idx) + markSymbol + s.slice(idx);
  }
  if (finalConsonant) {
    s = s + finalConsonant.letter;
  }
  return s;
}

const FINAL_ROMAN: Record<string, string> = {
  k: "k", t: "t", p: "p", n: "n", m: "m", ng: "ng", y: "i", w: "o", none: "",
};

export function romanizeSyllable(
  initial: Consonant,
  vowel: Vowel,
  finalConsonant: Consonant | null,
  tone: ToneName
): string {
  const v = vowel.roman.replace("(open)", ""); // for or/ɔ
  const init = initial.romanInitial === "ʔ" ? "" : initial.romanInitial;
  const fin = finalConsonant ? FINAL_ROMAN[finalConsonant.finalSound] : "";
  const toneMark = {
    mid: "",
    low: "̀",     // grave
    falling: "̂", // circumflex
    high: "́",    // acute
    rising: "̌",  // caron
  }[tone];
  return `${init}${v}${fin}${toneMark}`;
}

export interface GenerateOptions {
  withFinal?: boolean;
  allowMark?: boolean;
  excludeObsolete?: boolean;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 生成符合常规拼读规则的合法音节。
 * 仅使用单元音 + 长/短元音；尾辅音可选且使用基本的 8 类。
 */
export function generateSyllable(opts: GenerateOptions = {}): BuiltSyllable {
  const { withFinal = false, allowMark = true, excludeObsolete = true } = opts;

  const initials = CONSONANTS.filter((c) => (excludeObsolete ? !c.obsolete : true));
  const initial = pick(initials);

  // 选简单的单元音（避免特殊元音如 ฤ）
  const usable = VOWELS.filter(
    (v) => v.category === "monophthong" || v.id === "am" || v.id === "ai-maimalai" || v.id === "ao"
  );
  const vowel = pick(usable);

  let finalConsonant: Consonant | null = null;
  if (withFinal && vowel.id !== "am" && vowel.id !== "ai-maimalai" && vowel.id !== "ao") {
    // 从尾辅音常用代表里挑：每个 final 音类选 1-2 个
    const finalCandidates = CONSONANTS.filter(
      (c) =>
        !c.obsolete &&
        c.finalSound !== "none" &&
        // 简化：只用代表辅音
        ["ก", "ด", "บ", "น", "ม", "ง", "ย", "ว"].includes(c.letter)
    );
    finalConsonant = pick(finalCandidates);
  }

  // 决定是否加声调符号
  const possibleMarks: ToneMark[] = ["none"];
  if (allowMark) {
    if (initial.class === "mid") possibleMarks.push("ek", "tho", "tri", "chattawa");
    else if (initial.class === "high") possibleMarks.push("ek", "tho");
    else possibleMarks.push("ek", "tho");
  }
  const mark = pick(possibleMarks);

  const finalSound = finalConsonant ? finalConsonant.finalSound : "none";
  const tone = calculateTone(initial.class, vowel.length, finalSound, mark);
  const life = syllableLifetime(vowel.length, finalSound);

  return {
    initial,
    vowel,
    finalConsonant,
    toneMark: mark,
    thai: renderSyllableThai(initial, vowel, finalConsonant, mark),
    roman: romanizeSyllable(initial, vowel, finalConsonant, tone),
    tone,
    life,
  };
}

/** 规范化用户输入：去除组合声调符号、去多余空格、小写 */
export function normalizeAnswer(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

/** 把 vowel.roman 中的 (open) 等标记清掉，得到「可输入」的罗马音 */
export function plainVowelRoman(v: Vowel): string {
  return v.roman.replace("(open)", "");
}

export { TONE_NAMES };
