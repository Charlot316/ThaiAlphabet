export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
export type VocabularyExpansionTheme = "清楚模糊" | "合适" | "方便" | "奇怪普通特别" | "差不多" | "刚好" | "程度副词";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Context = { thai: string; roman: string; chinese: string; id: string };

const CORE_ADJECTIVES_ADVERBS_REFS = ["thai-frequency", "thai-a2-core-adjectives-adverbs-02-candidate"];

const contexts: readonly Context[] = [
  { thai: "คำอธิบายนี้", roman: "kham a-thi-baai nii", chinese: "这个说明", id: "kham-a-thi-baai-nii" },
  { thai: "รูปถ่ายนี้", roman: "ruup-thaai nii", chinese: "这张照片", id: "ruup-thaai-nii" },
  { thai: "เสียงในคลิป", roman: "siiang nai khip", chinese: "视频里的声音", id: "siiang-nai-khip" },
  { thai: "แผนวันนี้", roman: "phaaen wan-nii", chinese: "今天的计划", id: "phaaen-wan-nii" },
  { thai: "เวลานัด", roman: "wee-laa nat", chinese: "约定时间", id: "wee-laa-nat" },
  { thai: "ราคานี้", roman: "raa-khaa nii", chinese: "这个价格", id: "raa-khaa-nii" },
  { thai: "เสื้อตัวนี้", roman: "seua dtua nii", chinese: "这件衣服", id: "seua-dtua-nii" },
  { thai: "ห้องพักนี้", roman: "haawng phak nii", chinese: "这个房间", id: "haawng-phak-nii" },
  { thai: "ทางไปตลาด", roman: "thaang bpai dta-laat", chinese: "去市场的路", id: "thaang-bpai-dta-laat" },
  { thai: "เมนูร้านนี้", roman: "mee-nuu raan nii", chinese: "这家店的菜单", id: "mee-nuu-raan-nii" },
  { thai: "วิธีใช้นี้", roman: "wi-thii chai nii", chinese: "这个使用方法", id: "wi-thii-chai-nii" },
  { thai: "ที่นั่งตรงนี้", roman: "thii nang dtrong nii", chinese: "这里的座位", id: "thii-nang-dtrong-nii" },
  { thai: "สีของกระเป๋า", roman: "sii khaawng gra-bpao", chinese: "包的颜色", id: "sii-khaawng-gra-bpao" },
  { thai: "รสชาติอาหาร", roman: "rot-chaat aa-haan", chinese: "食物味道", id: "rot-chaat-aa-haan" },
  { thai: "อากาศตอนเช้า", roman: "aa-gaat dtaawn chaao", chinese: "早上的天气", id: "aa-gaat-dtaawn-chaao" },
  { thai: "ขนาดรองเท้า", roman: "kha-naat raawng-thaao", chinese: "鞋子的尺寸", id: "kha-naat-raawng-thaao" },
];

const directRows: readonly Definition[] = [
  { thai: "พูดให้ชัดกว่านี้", id: "phuut-hai-chat-gwaa-nii", roman: "phuut hai chat gwaa nii", chinese: "说得再清楚一点", partOfSpeech: "短语", theme: "清楚模糊", exampleThai: "ขอโทษนะ ช่วยพูดให้ชัดกว่านี้ได้ไหม", exampleRoman: "khaaw-thoot na, chuai phuut hai chat gwaa nii dai mai", exampleChinese: "不好意思，可以说得再清楚一点吗？", tag: "清楚" },
  { thai: "มองไม่ค่อยชัด", id: "maawng-mai-khaawy-chat", roman: "maawng mai khaawy chat", chinese: "看得不太清楚", partOfSpeech: "短语", theme: "清楚模糊", exampleThai: "ตัวหนังสือเล็กมาก ฉันมองไม่ค่อยชัด", exampleRoman: "dtua nang-seuu lek maak, chan maawng mai khaawy chat", exampleChinese: "字很小，我看得不太清楚。", tag: "模糊" },
  { thai: "พอดีกับฉันมาก", id: "phaaw-dii-gap-chan-maak", roman: "phaaw dii gap chan maak", chinese: "非常适合我/刚好适合我", partOfSpeech: "短语", theme: "刚好", exampleThai: "ไซซ์นี้พอดีกับฉันมาก ไม่ต้องเปลี่ยน", exampleRoman: "sai nii phaaw dii gap chan maak, mai dtawng bpliian", exampleChinese: "这个尺码非常适合我，不用换。", tag: "刚好" },
  { thai: "สะดวกกว่าที่คิด", id: "sa-duuak-gwaa-thii-khit", roman: "sa-duuak gwaa thii khit", chinese: "比想象中方便", partOfSpeech: "短语", theme: "方便", exampleThai: "ใช้แอปนี้สะดวกกว่าที่คิด", exampleRoman: "chai aaep nii sa-duuak gwaa thii khit", exampleChinese: "用这个应用比想象中方便。", tag: "方便" },
  { thai: "ดูแปลกนิดหน่อย", id: "duu-bplaaek-nit-naawy", roman: "duu bplaaek nit naawy", chinese: "看起来有点奇怪", partOfSpeech: "短语", theme: "奇怪普通特别", exampleThai: "สีนี้ดูแปลกนิดหน่อย แต่ก็สวยดี", exampleRoman: "sii nii duu bplaaek nit naawy, dtaae gaaw suai dii", exampleChinese: "这个颜色看起来有点奇怪，但也挺漂亮。", tag: "奇怪" },
  { thai: "ธรรมดาแต่ใช้ได้", id: "tham-ma-daa-dtaae-chai-dai", roman: "tham-ma-daa dtaae chai dai", chinese: "普通但能用", partOfSpeech: "短语", theme: "奇怪普通特别", exampleThai: "ร้านนี้ธรรมดาแต่ใช้ได้ ราคาไม่แพง", exampleRoman: "raan nii tham-ma-daa dtaae chai dai, raa-khaa mai phaaeng", exampleChinese: "这家店普通但可以，价格不贵。", tag: "普通" },
  { thai: "เกือบเหมือนกัน", id: "geuap-meuuan-gan", roman: "geuap meuuan gan", chinese: "几乎一样/差不多", partOfSpeech: "短语", theme: "差不多", exampleThai: "สองสีนี้เกือบเหมือนกัน เลือกสีไหนก็ได้", exampleRoman: "saawng sii nii geuap meuuan gan, leuuak sii nai gaaw dai", exampleChinese: "这两个颜色几乎一样，选哪个都可以。", tag: "差不多" },
  { thai: "พอดีเป๊ะ", id: "phaaw-dii-bpe", roman: "phaaw dii bpe", chinese: "正好/刚刚好", partOfSpeech: "副词", theme: "刚好", exampleThai: "เงินที่พกมาพอดีเป๊ะ ไม่เหลือเลย", exampleRoman: "ngoen thii phok maa phaaw dii bpe, mai leuua looei", exampleChinese: "带来的钱刚刚好，一点没剩。", tag: "刚好" },
];

const clearRows = contexts.map((context): Definition => ({
  thai: `${context.thai}ชัดเจนดี`,
  id: `${context.id}-chat-jeen-dii`,
  roman: `${context.roman} chat-jeen dii`,
  chinese: `${context.chinese}很清楚`,
  partOfSpeech: "短语",
  theme: "清楚模糊",
  exampleThai: `สำหรับฉัน ${context.thai}ชัดเจนดี ไม่ต้องอธิบายเพิ่ม`,
  exampleRoman: `sam-rap chan, ${context.roman} chat-jeen dii, mai dtawng a-thi-baai phoem`,
  exampleChinese: `对我来说，${context.chinese}很清楚，不需要再解释。`,
  tag: "清楚",
}));

const blurryRows = contexts.map((context): Definition => ({
  thai: `${context.thai}ค่อนข้างไม่ชัด`,
  id: `${context.id}-khaawn-khaang-mai-chat`,
  roman: `${context.roman} khaawn-khaang mai chat`,
  chinese: `${context.chinese}比较不清楚/有点模糊`,
  partOfSpeech: "短语",
  theme: "清楚模糊",
  exampleThai: `${context.thai}ค่อนข้างไม่ชัด ช่วยส่งใหม่ได้ไหม`,
  exampleRoman: `${context.roman} khaawn-khaang mai chat, chuai song mai dai mai`,
  exampleChinese: `${context.chinese}比较不清楚，可以重新发吗？`,
  tag: "模糊",
}));

const suitableRows = contexts.map((context): Definition => ({
  thai: `${context.thai}เหมาะกับฉัน`,
  id: `${context.id}-maw-gap-chan`,
  roman: `${context.roman} maw gap chan`,
  chinese: `${context.chinese}适合我`,
  partOfSpeech: "短语",
  theme: "合适",
  exampleThai: `ฉันคิดว่า${context.thai}เหมาะกับฉันมากกว่า`,
  exampleRoman: `chan khit waa ${context.roman} maw gap chan maak gwaa`,
  exampleChinese: `我觉得${context.chinese}更适合我。`,
  tag: "合适",
}));

const convenientRows = contexts.map((context): Definition => ({
  thai: `${context.thai}สะดวกสำหรับทุกคน`,
  id: `${context.id}-sa-duuak-sam-rap-thuk-khon`,
  roman: `${context.roman} sa-duuak sam-rap thuk khon`,
  chinese: `${context.chinese}对大家都方便`,
  partOfSpeech: "短语",
  theme: "方便",
  exampleThai: `ถ้า${context.thai}สะดวกสำหรับทุกคน เราก็เลือกแบบนี้`,
  exampleRoman: `thaa ${context.roman} sa-duuak sam-rap thuk khon, rao gaaw leuuak baaep nii`,
  exampleChinese: `如果${context.chinese}对大家都方便，我们就选这样。`,
  tag: "方便",
}));

const specialRows = contexts.map((context): Definition => ({
  thai: `${context.thai}พิเศษกว่าปกติ`,
  id: `${context.id}-phi-seet-gwaa-bpa-ga-dti`,
  roman: `${context.roman} phi-seet gwaa bpa-ga-dti`,
  chinese: `${context.chinese}比平常特别`,
  partOfSpeech: "短语",
  theme: "奇怪普通特别",
  exampleThai: `วันนี้${context.thai}พิเศษกว่าปกติ ฉันเลยจำได้`,
  exampleRoman: `wan-nii ${context.roman} phi-seet gwaa bpa-ga-dti, chan looei jam dai`,
  exampleChinese: `今天${context.chinese}比平常特别，所以我记得。`,
  tag: "特别",
}));

const similarRows = contexts.map((context): Definition => ({
  thai: `${context.thai}พอๆ กับเมื่อวาน`,
  id: `${context.id}-phaw-phaw-gap-meuua-waan`,
  roman: `${context.roman} phaw phaw gap meuua-waan`,
  chinese: `${context.chinese}和昨天差不多`,
  partOfSpeech: "短语",
  theme: "差不多",
  exampleThai: `ฉันว่า${context.thai}พอๆ กับเมื่อวาน ไม่ต่างมาก`,
  exampleRoman: `chan waa ${context.roman} phaw phaw gap meuua-waan, mai dtaang maak`,
  exampleChinese: `我觉得${context.chinese}和昨天差不多，差别不大。`,
  tag: "差不多",
}));

const justRightRows = contexts.map((context): Definition => ({
  thai: `${context.thai}พอดีมาก`,
  id: `${context.id}-phaaw-dii-maak`,
  roman: `${context.roman} phaaw dii maak`,
  chinese: `${context.chinese}刚刚好`,
  partOfSpeech: "短语",
  theme: "刚好",
  exampleThai: `${context.thai}พอดีมาก ไม่มากและไม่น้อยเกินไป`,
  exampleRoman: `${context.roman} phaaw dii maak, mai maak lae mai naawy goen bpai`,
  exampleChinese: `${context.chinese}刚刚好，不太多也不太少。`,
  tag: "刚好",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...clearRows,
  ...blurryRows,
  ...suitableRows,
  ...convenientRows,
  ...specialRows,
  ...similarRows,
  ...justRightRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "核心形容词副词", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 描述常用“ชัดเจน、ไม่ชัด、เหมาะกับ、สะดวก、แปลก、ธรรมดา、พิเศษ、พอดี、พอๆ กับ”等形容词和副词性短语。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于补充清楚、模糊、合适、方便、奇怪、普通、特别、差不多和刚好等 A2 核心描述。"],
    tags,
    sourceRefs: CORE_ADJECTIVES_ADVERBS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_CORE_ADJECTIVES_ADVERBS_02 = rows.map(toCandidate);
