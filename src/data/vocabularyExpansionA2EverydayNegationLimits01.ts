export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "不会不能" | "没有还没" | "不太几乎不" | "不要别" | "没办法" | "来不及" | "不够";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Action = { thai: string; roman: string; chinese: string; id: string };
type Need = { thai: string; roman: string; chinese: string; id: string };

const EVERYDAY_NEGATION_LIMITS_REFS = ["thai-frequency", "thai-a2-everyday-negation-limits-candidate"];

const actions: readonly Action[] = [
  { thai: "พูดเร็วแบบนี้", roman: "phuut reo baaep nii", chinese: "这样说得很快", id: "phuut-reo-baaep-nii" },
  { thai: "อ่านตัวเล็กๆ", roman: "aan dtua lek lek", chinese: "读很小的字", id: "aan-dtua-lek-lek" },
  { thai: "กินเผ็ดมาก", roman: "gin phet maak", chinese: "吃很辣", id: "gin-phet-maak" },
  { thai: "ยกของหนักคนเดียว", roman: "yok khaawng nak khon diaao", chinese: "一个人搬重物", id: "yok-khaawng-nak-khon-diaao" },
  { thai: "รอนานขนาดนี้", roman: "raaw naan kha-naat nii", chinese: "等这么久", id: "raaw-naan-kha-naat-nii" },
  { thai: "ออกไปตอนฝนตก", roman: "aawk bpai dtaawn fon dtok", chinese: "下雨时出去", id: "aawk-bpai-dtaawn-fon-dtok" },
  { thai: "จ่ายเงินสดตอนนี้", roman: "jaai ngoen sot dtaawn nii", chinese: "现在付现金", id: "jaai-ngoen-sot-dtaawn-nii" },
  { thai: "ตื่นเช้ามากทุกวัน", roman: "dteuun chaao maak thuk wan", chinese: "每天起很早", id: "dteuun-chaao-maak-thuk-wan" },
  { thai: "ใช้แอปนี้คล่อง", roman: "chai aaep nii khlaawng", chinese: "熟练使用这个应用", id: "chai-aaep-nii-khlaawng" },
  { thai: "จำชื่อถนนนี้", roman: "jam cheuu tha-non nii", chinese: "记住这条路名", id: "jam-cheuu-tha-non-nii" },
  { thai: "หาเอกสารนั้น", roman: "haa eek-ga-saan nan", chinese: "找那份文件", id: "haa-eek-ga-saan-nan" },
  { thai: "กลับบ้านก่อนสองทุ่ม", roman: "glap baan gaawn saawng thum", chinese: "晚上八点前回家", id: "glap-baan-gaawn-saawng-thum" },
  { thai: "ทำงานนี้คนเดียว", roman: "tham ngaan nii khon diaao", chinese: "一个人做这件事", id: "tham-ngaan-nii-khon-diaao" },
  { thai: "นั่งตรงนี้นานๆ", roman: "nang dtrong nii naan naan", chinese: "在这里坐很久", id: "nang-dtrong-nii-naan-naan" },
  { thai: "กินของหวานตอนดึก", roman: "gin khaawng waan dtaawn deuk", chinese: "深夜吃甜食", id: "gin-khaawng-waan-dtaawn-deuk" },
  { thai: "เปิดเสียงดังในห้อง", roman: "bpoet siiang dang nai haawng", chinese: "在房间里开很大声", id: "bpoet-siiang-dang-nai-haawng" },
];

const needs: readonly Need[] = [
  { thai: "เวลา", roman: "wee-laa", chinese: "时间", id: "wee-laa" },
  { thai: "เงินสด", roman: "ngoen sot", chinese: "现金", id: "ngoen-sot" },
  { thai: "น้ำดื่ม", roman: "naam deum", chinese: "饮用水", id: "naam-deum" },
  { thai: "ที่นั่ง", roman: "thii nang", chinese: "座位", id: "thii-nang" },
  { thai: "จาน", roman: "jaan", chinese: "盘子", id: "jaan" },
  { thai: "ข้อมูล", roman: "khaaw-muun", chinese: "信息", id: "khaaw-muun" },
  { thai: "แรง", roman: "raaeng", chinese: "力气", id: "raaeng" },
  { thai: "แบตโทรศัพท์", roman: "baet thoo-ra-sap", chinese: "手机电量", id: "baet-thoo-ra-sap" },
  { thai: "ห้องว่าง", roman: "haawng waang", chinese: "空房间", id: "haawng-waang" },
  { thai: "ถุงใส่ของ", roman: "thung sai khaawng", chinese: "装东西的袋子", id: "thung-sai-khaawng" },
  { thai: "โต๊ะว่าง", roman: "dto waang", chinese: "空桌", id: "dto-waang" },
  { thai: "ไฟในห้อง", roman: "fai nai haawng", chinese: "房间里的灯", id: "fai-nai-haawng" },
];

const directRows: readonly Definition[] = [
  { thai: "ไม่ค่อยเข้าใจเท่าไร", id: "mai-khaawy-khao-jai-thao-rai", roman: "mai khaawy khao-jai thao rai", chinese: "不太明白", partOfSpeech: "短语", theme: "不太几乎不", exampleThai: "คุณพูดเร็วมาก ฉันไม่ค่อยเข้าใจเท่าไร", exampleRoman: "khun phuut reo maak, chan mai khaawy khao-jai thao rai", exampleChinese: "你说得很快，我不太明白。", tag: "不太" },
  { thai: "ยังไม่ได้เริ่มเลย", id: "yang-mai-dai-roem-looei", roman: "yang mai dai roem looei", chinese: "还完全没开始", partOfSpeech: "短语", theme: "没有还没", exampleThai: "งานนี้ยาก ฉันยังไม่ได้เริ่มเลย", exampleRoman: "ngaan nii yaak, chan yang mai dai roem looei", exampleChinese: "这件事很难，我还完全没开始。", tag: "还没" },
  { thai: "ทำไม่ได้จริงๆ", id: "tham-mai-dai-jing-jing", roman: "tham mai dai jing jing", chinese: "真的做不了", partOfSpeech: "短语", theme: "不会不能", exampleThai: "ขอโทษนะ วันนี้ฉันทำไม่ได้จริงๆ", exampleRoman: "khaaw-thoot na, wan-nii chan tham mai dai jing jing", exampleChinese: "对不起，今天我真的做不了。", tag: "不能" },
  { thai: "ไม่มีทางเลือกมาก", id: "mai-mii-thaang-leuuak-maak", roman: "mai mii thaang leuuak maak", chinese: "没有太多选择", partOfSpeech: "短语", theme: "没有还没", exampleThai: "ตอนนี้เราไม่มีทางเลือกมาก ต้องเลือกอันนี้ก่อน", exampleRoman: "dtaawn nii rao mai mii thaang leuuak maak, dtawng leuuak an nii gaawn", exampleChinese: "现在我们没有太多选择，必须先选这个。", tag: "没有" },
  { thai: "อย่าเพิ่งบอกเขา", id: "yaa-phoeng-baawk-khao", roman: "yaa phoeng baawk khao", chinese: "先别告诉他/她", partOfSpeech: "短语", theme: "不要别", exampleThai: "เรื่องนี้ยังไม่แน่ใจ อย่าเพิ่งบอกเขา", exampleRoman: "reuuang nii yang mai naae-jai, yaa phoeng baawk khao", exampleChinese: "这件事还不确定，先别告诉他/她。", tag: "别" },
  { thai: "ไม่มีวิธีอื่นแล้ว", id: "mai-mii-wi-thii-euun-laaeo", roman: "mai mii wi-thii euun laaeo", chinese: "已经没有别的办法了", partOfSpeech: "短语", theme: "没办法", exampleThai: "ถ้าไม่มีวิธีอื่นแล้ว เราต้องลองวิธีนี้", exampleRoman: "thaa mai mii wi-thii euun laaeo, rao dtawng laawng wi-thii nii", exampleChinese: "如果已经没有别的办法了，我们必须试这个方法。", tag: "没办法" },
  { thai: "เวลาไม่พอจริงๆ", id: "wee-laa-mai-phaaw-jing-jing", roman: "wee-laa mai phaaw jing jing", chinese: "时间真的不够", partOfSpeech: "短语", theme: "不够", exampleThai: "งานเยอะมาก เวลาไม่พอจริงๆ", exampleRoman: "ngaan yoe maak, wee-laa mai phaaw jing jing", exampleChinese: "事情很多，时间真的不够。", tag: "不够" },
  { thai: "ไปไม่ทันแน่นอน", id: "bpai-mai-than-naae-naawn", roman: "bpai mai than naae-naawn", chinese: "肯定赶不上去", partOfSpeech: "短语", theme: "来不及", exampleThai: "ถ้าออกตอนนี้ เราไปไม่ทันแน่นอน", exampleRoman: "thaa aawk dtaawn nii, rao bpai mai than naae-naawn", exampleChinese: "如果现在出发，我们肯定赶不上。", tag: "来不及" },
];

const cannotRows = actions.map((action): Definition => ({
  thai: `ไม่สามารถ${action.thai}ได้`,
  id: `mai-saa-maat-${action.id}-dai`,
  roman: `mai saa-maat ${action.roman} dai`,
  chinese: `不能${action.chinese}`,
  partOfSpeech: "短语",
  theme: "不会不能",
  exampleThai: `วันนี้ฉันไม่สามารถ${action.thai}ได้ เพราะไม่สบาย`,
  exampleRoman: `wan-nii chan mai saa-maat ${action.roman} dai, phraw mai sa-baai`,
  exampleChinese: `今天我不能${action.chinese}，因为不舒服。`,
  tag: "不能",
}));

const notGoodRows = actions.map((action): Definition => ({
  thai: `ไม่ค่อย${action.thai}`,
  id: `mai-khaawy-${action.id}`,
  roman: `mai khaawy ${action.roman}`,
  chinese: `不太${action.chinese}`,
  partOfSpeech: "短语",
  theme: "不太几乎不",
  exampleThai: `ปกติฉันไม่ค่อย${action.thai} ถ้าไม่จำเป็น`,
  exampleRoman: `bpa-ga-dti chan mai khaawy ${action.roman} thaa mai jam-bpen`,
  exampleChinese: `平时如果没必要，我不太${action.chinese}。`,
  tag: "不太",
}));

const notYetRows = actions.map((action): Definition => ({
  thai: `ยังไม่ได้${action.thai}`,
  id: `yang-mai-dai-${action.id}`,
  roman: `yang mai dai ${action.roman}`,
  chinese: `还没${action.chinese}`,
  partOfSpeech: "短语",
  theme: "没有还没",
  exampleThai: `ตอนนี้ฉันยังไม่ได้${action.thai} รออีกนิดนะ`,
  exampleRoman: `dtaawn nii chan yang mai dai ${action.roman}, raaw iik nit na`,
  exampleChinese: `现在我还没${action.chinese}，请再等一下。`,
  tag: "还没",
}));

const dontRows = actions.map((action): Definition => ({
  thai: `อย่า${action.thai}ตอนนี้`,
  id: `yaa-${action.id}-dtaawn-nii`,
  roman: `yaa ${action.roman} dtaawn nii`,
  chinese: `现在不要${action.chinese}`,
  partOfSpeech: "短语",
  theme: "不要别",
  exampleThai: `ถ้ายังไม่พร้อม อย่า${action.thai}ตอนนี้`,
  exampleRoman: `thaa yang mai phraawm, yaa ${action.roman} dtaawn nii`,
  exampleChinese: `如果还没准备好，现在不要${action.chinese}。`,
  tag: "不要",
}));

const noWayRows = actions.map((action): Definition => ({
  thai: `ไม่มีทาง${action.thai}ทัน`,
  id: `mai-mii-thaang-${action.id}-than`,
  roman: `mai mii thaang ${action.roman} than`,
  chinese: `不可能及时${action.chinese}`,
  partOfSpeech: "短语",
  theme: "没办法",
  exampleThai: `เวลาเหลือน้อยมาก ไม่มีทาง${action.thai}ทัน`,
  exampleRoman: `wee-laa leuua naawy maak, mai mii thaang ${action.roman} than`,
  exampleChinese: `剩下的时间很少，不可能及时${action.chinese}。`,
  tag: "没办法",
}));

const notEnoughRows = needs.map((need): Definition => ({
  thai: `${need.thai}ไม่พอ`,
  id: `${need.id}-mai-phaaw`,
  roman: `${need.roman} mai phaaw`,
  chinese: `${need.chinese}不够`,
  partOfSpeech: "短语",
  theme: "不够",
  exampleThai: `วันนี้${need.thai}ไม่พอ เราต้องหาเพิ่ม`,
  exampleRoman: `wan-nii ${need.roman} mai phaaw, rao dtawng haa phoem`,
  exampleChinese: `今天${need.chinese}不够，我们要再找一些。`,
  tag: "不够",
}));

const noRows = needs.map((need): Definition => ({
  thai: `ไม่มี${need.thai}เหลือแล้ว`,
  id: `mai-mii-${need.id}-leuua-laaeo`,
  roman: `mai mii ${need.roman} leuua laaeo`,
  chinese: `已经没有剩余的${need.chinese}了`,
  partOfSpeech: "短语",
  theme: "没有还没",
  exampleThai: `ขอโทษนะ ตอนนี้ไม่มี${need.thai}เหลือแล้ว`,
  exampleRoman: `khaaw-thoot na, dtaawn nii mai mii ${need.roman} leuua laaeo`,
  exampleChinese: `不好意思，现在已经没有剩余的${need.chinese}了。`,
  tag: "没有",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...cannotRows,
  ...notGoodRows,
  ...notYetRows,
  ...dontRows,
  ...noWayRows,
  ...notEnoughRows,
  ...noRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "否定限制", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 否定和限制常用“ไม่สามารถ...ได้、ไม่ค่อย...、ยังไม่ได้...、อย่า...、ไม่มีทาง...ทัน、ไม่พอ、ไม่มี...แล้ว”。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于表达不会、不能、没有、还没、不太、不要、别、没办法、来不及和不够。"],
    tags,
    sourceRefs: EVERYDAY_NEGATION_LIMITS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_NEGATION_LIMITS_01 = rows.map(toCandidate);
