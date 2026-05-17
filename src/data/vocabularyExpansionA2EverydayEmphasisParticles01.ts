export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
export type VocabularyExpansionTheme = "จริงๆ" | "เลย" | "มากๆ" | "นิดหน่อย" | "แล้ว" | "ก่อน" | "ด้วย" | "นะ";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Phrase = { thai: string; roman: string; chinese: string; id: string };

const EVERYDAY_EMPHASIS_PARTICLES_REFS = ["thai-frequency", "thai-a2-everyday-emphasis-particles-candidate"];

const phrases: readonly Phrase[] = [
  { thai: "หิว", roman: "hiu", chinese: "饿", id: "hiu" },
  { thai: "เหนื่อย", roman: "neuueai", chinese: "累", id: "neuueai" },
  { thai: "ชอบร้านนี้", roman: "chaawp raan nii", chinese: "喜欢这家店", id: "chaawp-raan-nii" },
  { thai: "เข้าใจแล้ว", roman: "khao-jai laaeo", chinese: "明白了", id: "khao-jai-laaeo" },
  { thai: "ไม่ต้องห่วง", roman: "mai dtawng huang", chinese: "不用担心", id: "mai-dtawng-huang" },
  { thai: "รอสักครู่", roman: "raaw sak khruu", chinese: "等一下", id: "raaw-sak-khruu" },
  { thai: "ช่วยดูให้", roman: "chuai duu hai", chinese: "帮忙看一下", id: "chuai-duu-hai" },
  { thai: "ไปด้วยกัน", roman: "bpai duai gan", chinese: "一起去", id: "bpai-duai-gan" },
  { thai: "กินข้าวก่อน", roman: "gin khaao gaawn", chinese: "先吃饭", id: "gin-khaao-gaawn" },
  { thai: "กลับบ้านแล้ว", roman: "glap baan laaeo", chinese: "已经回家了", id: "glap-baan-laaeo" },
  { thai: "พูดช้าๆ", roman: "phuut chaa chaa", chinese: "慢慢说", id: "phuut-chaa-chaa" },
  { thai: "ใกล้นิดหน่อย", roman: "glai nit naawy", chinese: "近一点点", id: "glai-nit-naawy" },
  { thai: "แพงไป", roman: "phaaeng bpai", chinese: "太贵", id: "phaaeng-bpai" },
  { thai: "สะดวกมาก", roman: "sa-duuak maak", chinese: "很方便", id: "sa-duuak-maak" },
  { thai: "ดีขึ้น", roman: "dii kheun", chinese: "变好了", id: "dii-kheun" },
  { thai: "อย่าลืม", roman: "yaa leum", chinese: "别忘了", id: "yaa-leum" },
];

const directRows: readonly Definition[] = [
  { thai: "ดีจริงๆ นะ", id: "dii-jing-jing-na", roman: "dii jing jing na", chinese: "真的很好哦", partOfSpeech: "短语", theme: "จริงๆ", exampleThai: "ร้านนี้ดีจริงๆ นะ ลองไปดูได้", exampleRoman: "raan nii dii jing jing na, laawng bpai duu dai", exampleChinese: "这家店真的很好哦，可以去试试看。", tag: "强调" },
  { thai: "ไม่รู้เลยจริงๆ", id: "mai-ruu-looei-jing-jing", roman: "mai ruu looei jing jing", chinese: "真的完全不知道", partOfSpeech: "短语", theme: "เลย", exampleThai: "เรื่องนี้ฉันไม่รู้เลยจริงๆ", exampleRoman: "reuuang nii chan mai ruu looei jing jing", exampleChinese: "这件事我真的完全不知道。", tag: "强调否定" },
  { thai: "ขอบคุณมากๆ", id: "khaawp-khun-maak-maak", roman: "khaawp khun maak maak", chinese: "非常感谢", partOfSpeech: "短语", theme: "มากๆ", exampleThai: "คุณช่วยฉันเยอะ ขอบคุณมากๆ", exampleRoman: "khun chuai chan yoe, khaawp khun maak maak", exampleChinese: "你帮了我很多，非常感谢。", tag: "加强" },
  { thai: "ขอพักนิดหน่อย", id: "khaaw-phak-nit-naawy", roman: "khaaw phak nit naawy", chinese: "请让我休息一下", partOfSpeech: "短语", theme: "นิดหน่อย", exampleThai: "เดินมานานแล้ว ขอพักนิดหน่อย", exampleRoman: "doeen maa naan laaeo, khaaw phak nit naawy", exampleChinese: "走了很久了，请让我休息一下。", tag: "一点" },
  { thai: "กินแล้วนะ", id: "gin-laaeo-na", roman: "gin laaeo na", chinese: "已经吃了哦", partOfSpeech: "短语", theme: "แล้ว", exampleThai: "ไม่ต้องซื้อข้าวให้ ฉันกินแล้วนะ", exampleRoman: "mai dtawng seu khaao hai, chan gin laaeo na", exampleChinese: "不用给我买饭，我已经吃了哦。", tag: "已然" },
  { thai: "รอก่อนนะ", id: "raaw-gaawn-na", roman: "raaw gaawn na", chinese: "先等一下哦", partOfSpeech: "短语", theme: "ก่อน", exampleThai: "ฉันยังไม่พร้อม รอก่อนนะ", exampleRoman: "chan yang mai phraawm, raaw gaawn na", exampleChinese: "我还没准备好，先等一下哦。", tag: "先" },
  { thai: "ช่วยถือด้วยนะ", id: "chuai-theuu-duai-na", roman: "chuai theuu duai na", chinese: "也请帮忙拿一下哦", partOfSpeech: "短语", theme: "ด้วย", exampleThai: "ถุงนี้หนัก ช่วยถือด้วยนะ", exampleRoman: "thung nii nak, chuai theuu duai na", exampleChinese: "这个袋子重，也请帮忙拿一下哦。", tag: "也/请" },
  { thai: "อย่าลืมพรุ่งนี้นะ", id: "yaa-leum-phrung-nii-na", roman: "yaa leum phrung-nii na", chinese: "明天别忘了哦", partOfSpeech: "短语", theme: "นะ", exampleThai: "พรุ่งนี้เจอกันเก้าโมง อย่าลืมพรุ่งนี้นะ", exampleRoman: "phrung-nii jooe gan gaao moong, yaa leum phrung-nii na", exampleChinese: "明天九点见，明天别忘了哦。", tag: "语气" },
];

const reallyRows = phrases.map((phrase): Definition => ({
  thai: `${phrase.thai}จริงๆ`,
  id: `${phrase.id}-jing-jing`,
  roman: `${phrase.roman} jing jing`,
  chinese: `真的${phrase.chinese}`,
  partOfSpeech: "短语",
  theme: "จริงๆ",
  exampleThai: `วันนี้ฉัน${phrase.thai}จริงๆ ไม่ได้พูดเล่น`,
  exampleRoman: `wan-nii chan ${phrase.roman} jing jing, mai dai phuut len`,
  exampleChinese: `今天我真的${phrase.chinese}，不是开玩笑。`,
  tag: "จริงๆ",
}));

const loeiRows = phrases.map((phrase): Definition => ({
  thai: `${phrase.thai}เลย`,
  id: `${phrase.id}-looei`,
  roman: `${phrase.roman} looei`,
  chinese: `就/完全${phrase.chinese}`,
  partOfSpeech: "短语",
  theme: "เลย",
  exampleThai: `ถ้าโอเค เรา${phrase.thai}เลยได้ไหม`,
  exampleRoman: `thaa oo-khee, rao ${phrase.roman} looei dai mai`,
  exampleChinese: `如果可以，我们就${phrase.chinese}可以吗？`,
  tag: "เลย",
}));

const veryRows = phrases.map((phrase): Definition => ({
  thai: `${phrase.thai}มากๆ`,
  id: `${phrase.id}-maak-maak`,
  roman: `${phrase.roman} maak maak`,
  chinese: `非常${phrase.chinese}`,
  partOfSpeech: "短语",
  theme: "มากๆ",
  exampleThai: `ช่วงนี้ฉัน${phrase.thai}มากๆ ต้องพักหน่อย`,
  exampleRoman: `chuuang nii chan ${phrase.roman} maak maak, dtawng phak naawy`,
  exampleChinese: `最近我非常${phrase.chinese}，需要休息一下。`,
  tag: "มากๆ",
}));

const littleRows = phrases.map((phrase): Definition => ({
  thai: `${phrase.thai}นิดหน่อย`,
  id: `${phrase.id}-nit-naawy`,
  roman: `${phrase.roman} nit naawy`,
  chinese: `有点${phrase.chinese}`,
  partOfSpeech: "短语",
  theme: "นิดหน่อย",
  exampleThai: `ฉัน${phrase.thai}นิดหน่อย แต่ยังไหว`,
  exampleRoman: `chan ${phrase.roman} nit naawy, dtaae yang wai`,
  exampleChinese: `我有点${phrase.chinese}，但还可以。`,
  tag: "นิดหน่อย",
}));

const alreadyRows = phrases.map((phrase): Definition => ({
  thai: `${phrase.thai}แล้ว`,
  id: `${phrase.id}-laaeo`,
  roman: `${phrase.roman} laaeo`,
  chinese: `已经${phrase.chinese}`,
  partOfSpeech: "短语",
  theme: "แล้ว",
  exampleThai: `ไม่ต้องช่วยแล้ว ฉัน${phrase.thai}แล้ว`,
  exampleRoman: `mai dtawng chuai laaeo, chan ${phrase.roman} laaeo`,
  exampleChinese: `不用帮忙了，我已经${phrase.chinese}了。`,
  tag: "แล้ว",
}));

const firstRows = phrases.map((phrase): Definition => ({
  thai: `${phrase.thai}ก่อน`,
  id: `${phrase.id}-gaawn`,
  roman: `${phrase.roman} gaawn`,
  chinese: `先${phrase.chinese}`,
  partOfSpeech: "短语",
  theme: "ก่อน",
  exampleThai: `ตอนนี้เรา${phrase.thai}ก่อน แล้วค่อยคุยกัน`,
  exampleRoman: `dtaawn nii rao ${phrase.roman} gaawn, laaeo khaawy khui gan`,
  exampleChinese: `现在我们先${phrase.chinese}，然后再谈。`,
  tag: "ก่อน",
}));

const alsoRows = phrases.map((phrase): Definition => ({
  thai: `${phrase.thai}ด้วย`,
  id: `${phrase.id}-duai`,
  roman: `${phrase.roman} duai`,
  chinese: `也${phrase.chinese}/请一起${phrase.chinese}`,
  partOfSpeech: "短语",
  theme: "ด้วย",
  exampleThai: `ถ้าคุณไป ฉันอยาก${phrase.thai}ด้วย`,
  exampleRoman: `thaa khun bpai, chan yaak ${phrase.roman} duai`,
  exampleChinese: `如果你去，我也想${phrase.chinese}。`,
  tag: "ด้วย",
}));

const softRows = phrases.map((phrase): Definition => ({
  thai: `${phrase.thai}นะ`,
  id: `${phrase.id}-na`,
  roman: `${phrase.roman} na`,
  chinese: `${phrase.chinese}哦/呢`,
  partOfSpeech: "短语",
  theme: "นะ",
  exampleThai: `ถ้าว่าง ช่วย${phrase.thai}นะ`,
  exampleRoman: `thaa waang, chuai ${phrase.roman} na`,
  exampleChinese: `如果有空，请${phrase.chinese}哦。`,
  tag: "นะ",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...reallyRows,
  ...loeiRows,
  ...veryRows,
  ...littleRows,
  ...alreadyRows,
  ...firstRows,
  ...alsoRows,
  ...softRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "日常语气小词", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 语气小词要放进整句理解：จริงๆ 表强调，เลย 常表示“就/完全”，นิดหน่อย 表“一点”，แล้ว 表已然，ก่อน 表先，ด้วย 表也/请一起，นะ 让语气更柔和。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于日常强调和语气小词搭配，不孤立背小词，而是放进常用句框。"],
    tags,
    sourceRefs: EVERYDAY_EMPHASIS_PARTICLES_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_EMPHASIS_PARTICLES_01 = rows.map(toCandidate);
