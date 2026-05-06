import { Consonant } from "./types";

export const CONSONANTS: Consonant[] = [
  { id: "ko-kai", letter: "ก", name: "ไก่", nameRoman: "kai", meaning: "鸡", romanInitial: "k", finalSound: "k", class: "mid" },
  { id: "kho-khai", letter: "ข", name: "ไข่", nameRoman: "khai", meaning: "蛋", romanInitial: "kh", finalSound: "k", class: "high" },
  { id: "kho-khuat", letter: "ฃ", name: "ขวด", nameRoman: "khuat", meaning: "瓶子", romanInitial: "kh", finalSound: "k", class: "high", obsolete: true },
  { id: "kho-khwai", letter: "ค", name: "ควาย", nameRoman: "khwai", meaning: "水牛", romanInitial: "kh", finalSound: "k", class: "low" },
  { id: "kho-khon", letter: "ฅ", name: "คน", nameRoman: "khon", meaning: "人", romanInitial: "kh", finalSound: "k", class: "low", obsolete: true },
  { id: "kho-rakhang", letter: "ฆ", name: "ระฆัง", nameRoman: "rakhang", meaning: "钟", romanInitial: "kh", finalSound: "k", class: "low" },
  { id: "ngo-ngu", letter: "ง", name: "งู", nameRoman: "ngu", meaning: "蛇", romanInitial: "ng", finalSound: "ng", class: "low" },
  { id: "cho-chan", letter: "จ", name: "จาน", nameRoman: "chan", meaning: "盘子", romanInitial: "j", finalSound: "t", class: "mid" },
  { id: "cho-ching", letter: "ฉ", name: "ฉิ่ง", nameRoman: "ching", meaning: "小铙钹", romanInitial: "ch", finalSound: "t", class: "high" },
  { id: "cho-chang", letter: "ช", name: "ช้าง", nameRoman: "chang", meaning: "象", romanInitial: "ch", finalSound: "t", class: "low" },
  { id: "so-so", letter: "ซ", name: "โซ่", nameRoman: "so", meaning: "链子", romanInitial: "s", finalSound: "t", class: "low" },
  { id: "cho-choe", letter: "ฌ", name: "เฌอ", nameRoman: "choe", meaning: "树", romanInitial: "ch", finalSound: "t", class: "low" },
  { id: "yo-ying", letter: "ญ", name: "หญิง", nameRoman: "ying", meaning: "女人", romanInitial: "y", finalSound: "n", class: "low" },
  { id: "do-chada", letter: "ฎ", name: "ชฎา", nameRoman: "chada", meaning: "头冠", romanInitial: "d", finalSound: "t", class: "mid" },
  { id: "to-patak", letter: "ฏ", name: "ปฏัก", nameRoman: "patak", meaning: "刺棒", romanInitial: "t", finalSound: "t", class: "mid" },
  { id: "tho-than", letter: "ฐ", name: "ฐาน", nameRoman: "than", meaning: "底座", romanInitial: "th", finalSound: "t", class: "high" },
  { id: "tho-montho", letter: "ฑ", name: "มณโฑ", nameRoman: "montho", meaning: "蒙陀（人名）", romanInitial: "th", finalSound: "t", class: "low" },
  { id: "tho-phuthao", letter: "ฒ", name: "ผู้เฒ่า", nameRoman: "phuthao", meaning: "老人", romanInitial: "th", finalSound: "t", class: "low" },
  { id: "no-nen", letter: "ณ", name: "เณร", nameRoman: "nen", meaning: "小沙弥", romanInitial: "n", finalSound: "n", class: "low" },
  { id: "do-dek", letter: "ด", name: "เด็ก", nameRoman: "dek", meaning: "小孩", romanInitial: "d", finalSound: "t", class: "mid" },
  { id: "to-tao", letter: "ต", name: "เต่า", nameRoman: "tao", meaning: "乌龟", romanInitial: "t", finalSound: "t", class: "mid" },
  { id: "tho-thung", letter: "ถ", name: "ถุง", nameRoman: "thung", meaning: "袋子", romanInitial: "th", finalSound: "t", class: "high" },
  { id: "tho-thahan", letter: "ท", name: "ทหาร", nameRoman: "thahan", meaning: "士兵", romanInitial: "th", finalSound: "t", class: "low" },
  { id: "tho-thong", letter: "ธ", name: "ธง", nameRoman: "thong", meaning: "旗", romanInitial: "th", finalSound: "t", class: "low" },
  { id: "no-nu", letter: "น", name: "หนู", nameRoman: "nu", meaning: "老鼠", romanInitial: "n", finalSound: "n", class: "low" },
  { id: "bo-baimai", letter: "บ", name: "ใบไม้", nameRoman: "baimai", meaning: "树叶", romanInitial: "b", finalSound: "p", class: "mid" },
  { id: "po-pla", letter: "ป", name: "ปลา", nameRoman: "pla", meaning: "鱼", romanInitial: "p", finalSound: "p", class: "mid" },
  { id: "pho-phueng", letter: "ผ", name: "ผึ้ง", nameRoman: "phueng", meaning: "蜜蜂", romanInitial: "ph", finalSound: "p", class: "high" },
  { id: "fo-fa", letter: "ฝ", name: "ฝา", nameRoman: "fa", meaning: "盖子", romanInitial: "f", finalSound: "p", class: "high" },
  { id: "pho-phan", letter: "พ", name: "พาน", nameRoman: "phan", meaning: "高脚盘", romanInitial: "ph", finalSound: "p", class: "low" },
  { id: "fo-fan", letter: "ฟ", name: "ฟัน", nameRoman: "fan", meaning: "牙齿", romanInitial: "f", finalSound: "p", class: "low" },
  { id: "pho-samphao", letter: "ภ", name: "สำเภา", nameRoman: "samphao", meaning: "帆船", romanInitial: "ph", finalSound: "p", class: "low" },
  { id: "mo-ma", letter: "ม", name: "ม้า", nameRoman: "ma", meaning: "马", romanInitial: "m", finalSound: "m", class: "low" },
  { id: "yo-yak", letter: "ย", name: "ยักษ์", nameRoman: "yak", meaning: "夜叉", romanInitial: "y", finalSound: "y", class: "low" },
  { id: "ro-ruea", letter: "ร", name: "เรือ", nameRoman: "ruea", meaning: "船", romanInitial: "r", finalSound: "n", class: "low" },
  { id: "lo-ling", letter: "ล", name: "ลิง", nameRoman: "ling", meaning: "猴子", romanInitial: "l", finalSound: "n", class: "low" },
  { id: "wo-waen", letter: "ว", name: "แหวน", nameRoman: "waen", meaning: "戒指", romanInitial: "w", finalSound: "w", class: "low" },
  { id: "so-sala", letter: "ศ", name: "ศาลา", nameRoman: "sala", meaning: "亭子", romanInitial: "s", finalSound: "t", class: "high" },
  { id: "so-rusi", letter: "ษ", name: "ฤๅษี", nameRoman: "rusi", meaning: "隐士", romanInitial: "s", finalSound: "t", class: "high" },
  { id: "so-suea", letter: "ส", name: "เสือ", nameRoman: "suea", meaning: "老虎", romanInitial: "s", finalSound: "t", class: "high" },
  { id: "ho-hip", letter: "ห", name: "หีบ", nameRoman: "hip", meaning: "箱子", romanInitial: "h", finalSound: "none", class: "high" },
  { id: "lo-chula", letter: "ฬ", name: "จุฬา", nameRoman: "chula", meaning: "风筝", romanInitial: "l", finalSound: "n", class: "low" },
  { id: "o-ang", letter: "อ", name: "อ่าง", nameRoman: "ang", meaning: "盆", romanInitial: "ʔ", finalSound: "none", class: "mid" },
  { id: "ho-nokhuk", letter: "ฮ", name: "นกฮูก", nameRoman: "nokhuk", meaning: "猫头鹰", romanInitial: "h", finalSound: "none", class: "low" },
];

export const CONSONANT_BY_ID: Record<string, Consonant> = Object.fromEntries(
  CONSONANTS.map((c) => [c.id, c])
);

// 同音辅音映射：罗马音 -> 辅音 ID 数组
export function consonantsByInitialSound(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const c of CONSONANTS) {
    if (c.obsolete) continue;
    if (!map[c.romanInitial]) map[c.romanInitial] = [];
    map[c.romanInitial].push(c.id);
  }
  return map;
}

// 尾辅音读音规则分组
export const FINAL_GROUPS: Record<string, { sound: string; description: string }> = {
  k: { sound: "k", description: "แม่กก（k 音）" },
  t: { sound: "t", description: "แม่กด（t 音）" },
  p: { sound: "p", description: "แม่กบ（p 音）" },
  n: { sound: "n", description: "แม่กน（n 音）" },
  m: { sound: "m", description: "แม่กม（m 音）" },
  ng: { sound: "ng", description: "แม่กง（ng 音）" },
  y: { sound: "y", description: "แม่เกย（y 音）" },
  w: { sound: "w", description: "แม่เกอว（w 音）" },
  none: { sound: "-", description: "无尾辅音" },
};
