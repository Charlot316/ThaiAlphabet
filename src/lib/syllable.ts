import { CONSONANTS, CONSONANT_BY_ID } from "@/data/consonants";
import { VOWELS } from "@/data/vowels";
import { calculateTone, syllableLifetime, TONE_MARKS, TONE_NAMES } from "@/data/tones";
import { Consonant, ConsonantClass, ToneMark, ToneName, Vowel } from "@/data/types";

export interface BuiltSyllable {
  initial: Consonant;            // 真正发音的初辅音（若有 ห-引导，这是 ห 后面的低辅音）
  silentLeader: Consonant | null; // ห-引导时的 ห；否则 null
  effectiveClass: ConsonantClass; // 用于声调推导的辅音类别
  vowel: Vowel;
  finalConsonant: Consonant | null;
  toneMark: ToneMark;
  thai: string;
  roman: string;
  tone: ToneName;
  life: "live" | "dead";
  rule?: string; // 特殊规则说明（如 ห-引导）
}

const PLACEHOLDER = /◌/g;

/**
 * 生成 Thai 字符串：
 * - 把 ◌ 替换为 (silentLeader + initial) 或仅 initial
 * - 部分元音 + 尾辅音组合需要变形（如 ัว → ว- before final）
 * - 声调符号放在最上方辅音之后
 */
export function renderSyllableThai(
  initial: Consonant,
  silentLeader: Consonant | null,
  vowel: Vowel,
  finalConsonant: Consonant | null,
  mark: ToneMark
): string {
  let form = vowel.form;

  // ัว + 尾 → -ว- + 尾（去掉 ั）
  if (vowel.id === "ua-long" && finalConsonant) {
    form = "◌ว";
  }

  const replacement = (silentLeader ? silentLeader.letter : "") + initial.letter;
  let s = form.replace(PLACEHOLDER, replacement);

  const markSymbol = TONE_MARKS.find((m) => m.id === mark)?.symbol ?? "";
  if (mark !== "none" && markSymbol) {
    // 声调符号放在「最上面那个辅音」之后。ห-引导时仍放在 ห 之后（按规则）。
    // 这里采用粗略策略：放在替换串结尾位置。
    const insertAt = s.indexOf(replacement) + replacement.length;
    s = s.slice(0, insertAt) + markSymbol + s.slice(insertAt);
  }
  if (finalConsonant) s += finalConsonant.letter;
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
  const v = vowel.roman.replace("(open)", "");
  const init = initial.romanInitial === "ʔ" ? "" : initial.romanInitial;
  const fin = finalConsonant ? FINAL_ROMAN[finalConsonant.finalSound] : "";
  const toneMark = {
    mid: "",
    low: "̀",
    falling: "̂",
    high: "́",
    rising: "̌",
  }[tone];
  return `${init}${v}${fin}${toneMark}`;
}

export interface GenerateOptions {
  withFinal?: boolean;
  allowMark?: boolean;
  excludeObsolete?: boolean;
  /** 启用复合元音 เ-ีย / เ-ือ / ัว */
  useDiphthongs?: boolean;
  /** 启用 ห-引导规则（ห + 单独低辅音 → 按高辅音算声调） */
  useHoLeading?: boolean;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** ห-引导可作用的低辅音（单独的 sonorant 低辅音，无对应高辅音） */
const HO_LEADING_TARGETS = ["ngo-ngu", "yo-ying", "no-nu", "mo-ma", "yo-yak", "ro-ruea", "lo-ling", "wo-waen"];

export function generateSyllable(opts: GenerateOptions = {}): BuiltSyllable {
  const {
    withFinal = false,
    allowMark = true,
    excludeObsolete = true,
    useDiphthongs = false,
    useHoLeading = false,
  } = opts;

  const allInitials = CONSONANTS.filter((c) => (excludeObsolete ? !c.obsolete : true));

  // 决定是否使用 ห-引导
  let initial: Consonant;
  let silentLeader: Consonant | null = null;
  let effectiveClass: ConsonantClass;
  let rule: string | undefined;

  if (useHoLeading && Math.random() < 0.25) {
    initial = CONSONANT_BY_ID[pick(HO_LEADING_TARGETS)];
    silentLeader = CONSONANT_BY_ID["ho-hip"]; // ห
    effectiveClass = "high";
    rule = "ห-引导：ห 在单独低辅音前不发音，整个音节按高辅音规则推声调。";
  } else {
    initial = pick(allInitials);
    effectiveClass = initial.class;
  }

  // 元音池
  const usableMonoOrSpecial = VOWELS.filter(
    (v) =>
      v.category === "monophthong" ||
      v.id === "am" ||
      v.id === "ai-maimalai" ||
      v.id === "ao"
  );
  const usableDiphthongs = VOWELS.filter((v) => ["ia-long", "uea-long", "ua-long"].includes(v.id));
  const usable = useDiphthongs ? [...usableMonoOrSpecial, ...usableDiphthongs] : usableMonoOrSpecial;
  const vowel = pick(usable);

  // 尾辅音
  let finalConsonant: Consonant | null = null;
  const noFinalVowels = new Set(["am", "ai-maimalai", "ao"]);
  if (withFinal && !noFinalVowels.has(vowel.id)) {
    const finalCandidates = CONSONANTS.filter(
      (c) =>
        !c.obsolete &&
        c.finalSound !== "none" &&
        ["ก", "ด", "บ", "น", "ม", "ง", "ย", "ว"].includes(c.letter)
    );
    finalConsonant = pick(finalCandidates);
    // ัว / เ-ือ / เ-ีย 已含 ว/อ/ย 作为部件，避免与同音尾重合
    if (vowel.id === "ua-long" && finalConsonant.letter === "ว") finalConsonant = CONSONANT_BY_ID["ko-kai"];
    if (vowel.id === "uea-long" && finalConsonant.id === "o-ang") finalConsonant = CONSONANT_BY_ID["ko-kai"];
    if (vowel.id === "ia-long" && finalConsonant.letter === "ย") finalConsonant = CONSONANT_BY_ID["ko-kai"];
  }

  // 声调符号
  const possibleMarks: ToneMark[] = ["none"];
  if (allowMark) {
    if (effectiveClass === "mid") possibleMarks.push("ek", "tho", "tri", "chattawa");
    else possibleMarks.push("ek", "tho"); // 高/低 一般只用 ek / tho
  }
  const mark = pick(possibleMarks);

  const finalSound = finalConsonant ? finalConsonant.finalSound : "none";
  const tone = calculateTone(effectiveClass, vowel.length, finalSound, mark);
  const life = syllableLifetime(vowel.length, finalSound);

  return {
    initial,
    silentLeader,
    effectiveClass,
    vowel,
    finalConsonant,
    toneMark: mark,
    thai: renderSyllableThai(initial, silentLeader, vowel, finalConsonant, mark),
    roman: romanizeSyllable(initial, vowel, finalConsonant, tone),
    tone,
    life,
    rule,
  };
}

export function normalizeAnswer(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

export function plainVowelRoman(v: Vowel): string {
  return v.roman.replace("(open)", "");
}

export { TONE_NAMES };
