import { ConsonantClass, ToneMark, ToneName } from "./types";

export const TONE_MARKS: { id: ToneMark; symbol: string; name: string; nameRoman: string }[] = [
  { id: "none", symbol: "—", name: "ไม่มีรูปวรรณยุกต์", nameRoman: "无符号" },
  { id: "ek", symbol: "่", name: "ไม้เอก", nameRoman: "mai ek" },
  { id: "tho", symbol: "้", name: "ไม้โท", nameRoman: "mai tho" },
  { id: "tri", symbol: "๊", name: "ไม้ตรี", nameRoman: "mai tri" },
  { id: "chattawa", symbol: "๋", name: "ไม้จัตวา", nameRoman: "mai chattawa" },
];

export const TONE_NAMES: Record<ToneName, { th: string; cn: string; pinyin: string }> = {
  mid: { th: "สามัญ", cn: "平声", pinyin: "samaan" },
  low: { th: "เอก", cn: "低声", pinyin: "ek" },
  falling: { th: "โท", cn: "降声", pinyin: "tho" },
  high: { th: "ตรี", cn: "高声", pinyin: "tri" },
  rising: { th: "จัตวา", cn: "升声", pinyin: "chattawa" },
};

/**
 * 判断音节是 live (เป็น) 还是 dead (ตาย)
 * - live: 长元音不带 stop 尾辅音，或带 sonorant 尾辅音 (n, m, ng, y, w)
 * - dead: 短元音不带尾辅音，或带 stop 尾辅音 (k, t, p)
 */
export type SyllableLifetime = "live" | "dead";

export function syllableLifetime(
  vowelLength: "short" | "long",
  finalSound: "k" | "t" | "p" | "n" | "m" | "ng" | "y" | "w" | "none"
): SyllableLifetime {
  if (finalSound === "k" || finalSound === "t" || finalSound === "p") return "dead";
  if (finalSound === "none") return vowelLength === "long" ? "live" : "dead";
  return "live"; // sonorant 尾
}

/**
 * 给定初辅音类别、元音长短、尾辅音、声调符号，返回声调名。
 * 不覆盖所有特殊例外（如某些借词），但覆盖常规拼读规则。
 */
export function calculateTone(
  initialClass: ConsonantClass,
  vowelLength: "short" | "long",
  finalSound: "k" | "t" | "p" | "n" | "m" | "ng" | "y" | "w" | "none",
  mark: ToneMark
): ToneName {
  const life = syllableLifetime(vowelLength, finalSound);

  if (initialClass === "mid") {
    if (mark === "ek") return "low";
    if (mark === "tho") return "falling";
    if (mark === "tri") return "high";
    if (mark === "chattawa") return "rising";
    return life === "live" ? "mid" : "low";
  }

  if (initialClass === "high") {
    if (mark === "ek") return "low";
    if (mark === "tho") return "falling";
    // 高辅音通常没有 tri / chattawa；理论上不出现，给个保守 fallback
    if (mark === "tri") return "high";
    if (mark === "chattawa") return "rising";
    return life === "live" ? "rising" : "low";
  }

  // low class
  if (mark === "ek") return "falling";
  if (mark === "tho") return "high";
  if (mark === "tri") return "high";
  if (mark === "chattawa") return "rising";
  if (life === "live") return "mid";
  // dead syllable
  return vowelLength === "short" ? "high" : "falling";
}
