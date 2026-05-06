import { Vowel } from "./types";

// 用 ◌ (U+25CC) 表示辅音占位
const C = "◌";

export const VOWELS: Vowel[] = [
  // 单元音 - 短
  { id: "a-short", form: `${C}ะ`, display: `${C}ะ`, roman: "a", length: "short", category: "monophthong" },
  { id: "i-short", form: `${C}ิ`, display: `${C}ิ`, roman: "i", length: "short", category: "monophthong" },
  { id: "ue-short", form: `${C}ึ`, display: `${C}ึ`, roman: "ue", length: "short", category: "monophthong" },
  { id: "u-short", form: `${C}ุ`, display: `${C}ุ`, roman: "u", length: "short", category: "monophthong" },
  { id: "e-short", form: `เ${C}ะ`, display: `เ${C}ะ`, roman: "e", length: "short", category: "monophthong" },
  { id: "ae-short", form: `แ${C}ะ`, display: `แ${C}ะ`, roman: "ae", length: "short", category: "monophthong" },
  { id: "o-short", form: `โ${C}ะ`, display: `โ${C}ะ`, roman: "o", length: "short", category: "monophthong" },
  { id: "oe-short", form: `เ${C}าะ`, display: `เ${C}าะ`, roman: "o(open)", length: "short", category: "monophthong" },
  { id: "er-short", form: `เ${C}อะ`, display: `เ${C}อะ`, roman: "oe", length: "short", category: "monophthong" },

  // 单元音 - 长
  { id: "a-long", form: `${C}า`, display: `${C}า`, roman: "aa", length: "long", category: "monophthong" },
  { id: "i-long", form: `${C}ี`, display: `${C}ี`, roman: "ii", length: "long", category: "monophthong" },
  { id: "ue-long", form: `${C}ื`, display: `${C}ือ`, roman: "uue", length: "long", category: "monophthong" },
  { id: "u-long", form: `${C}ู`, display: `${C}ู`, roman: "uu", length: "long", category: "monophthong" },
  { id: "e-long", form: `เ${C}`, display: `เ${C}`, roman: "ee", length: "long", category: "monophthong" },
  { id: "ae-long", form: `แ${C}`, display: `แ${C}`, roman: "aae", length: "long", category: "monophthong" },
  { id: "o-long", form: `โ${C}`, display: `โ${C}`, roman: "oo", length: "long", category: "monophthong" },
  { id: "or-long", form: `${C}อ`, display: `${C}อ`, roman: "oor", length: "long", category: "monophthong" },
  { id: "er-long", form: `เ${C}อ`, display: `เ${C}อ`, roman: "ooe", length: "long", category: "monophthong" },

  // 复合元音 - 短
  { id: "ia-short", form: `เ${C}ียะ`, display: `เ${C}ียะ`, roman: "ia", length: "short", category: "diphthong" },
  { id: "uea-short", form: `เ${C}ือะ`, display: `เ${C}ือะ`, roman: "uea", length: "short", category: "diphthong" },
  { id: "ua-short", form: `${C}ัวะ`, display: `${C}ัวะ`, roman: "ua", length: "short", category: "diphthong" },

  // 复合元音 - 长
  { id: "ia-long", form: `เ${C}ีย`, display: `เ${C}ีย`, roman: "iia", length: "long", category: "diphthong" },
  { id: "uea-long", form: `เ${C}ือ`, display: `เ${C}ือ`, roman: "uuea", length: "long", category: "diphthong" },
  { id: "ua-long", form: `${C}ัว`, display: `${C}ัว`, roman: "uua", length: "long", category: "diphthong" },

  // 特殊元音
  { id: "am", form: `${C}ำ`, display: `${C}ำ`, roman: "am", length: "long", category: "special", notes: "等价于 a + m 尾" },
  { id: "ai-maimuan", form: `ใ${C}`, display: `ใ${C}`, roman: "ai", length: "long", category: "special", notes: "ไม้ม้วน, 仅 20 个词" },
  { id: "ai-maimalai", form: `ไ${C}`, display: `ไ${C}`, roman: "ai", length: "long", category: "special", notes: "ไม้มลาย" },
  { id: "ao", form: `เ${C}า`, display: `เ${C}า`, roman: "ao", length: "long", category: "special" },
  { id: "rue", form: "ฤ", display: "ฤ", roman: "rue", length: "short", category: "special", notes: "梵文借字" },
  { id: "rue-long", form: "ฤๅ", display: "ฤๅ", roman: "ruee", length: "long", category: "special" },
  { id: "lue", form: "ฦ", display: "ฦ", roman: "lue", length: "short", category: "special", notes: "已废" },
  { id: "lue-long", form: "ฦๅ", display: "ฦๅ", roman: "luee", length: "long", category: "special", notes: "已废" },
];

export const VOWEL_BY_ID: Record<string, Vowel> = Object.fromEntries(
  VOWELS.map((v) => [v.id, v])
);
