export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "听懂回应" | "确认" | "反问" | "没听清" | "请重复" | "理解不理解" | "自然接话";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Topic = { thai: string; roman: string; chinese: string; id: string };

const EVERYDAY_LISTENING_RESPONSES_REFS = ["thai-frequency", "thai-a2-everyday-listening-responses-candidate"];

const topics: readonly Topic[] = [
  { thai: "เวลานัด", roman: "wee-laa nat", chinese: "约定时间", id: "wee-laa-nat" },
  { thai: "สถานที่เจอกัน", roman: "sa-thaan-thii jooe gan", chinese: "见面地点", id: "sa-thaan-thii-jooe-gan" },
  { thai: "ราคาทั้งหมด", roman: "raa-khaa thang mot", chinese: "总价", id: "raa-khaa-thang-mot" },
  { thai: "วิธีเดินทาง", roman: "wi-thii doeen-thaang", chinese: "出行方法", id: "wi-thii-doeen-thaang" },
  { thai: "ชื่อร้าน", roman: "cheuu raan", chinese: "店名", id: "cheuu-raan" },
  { thai: "หมายเลขห้อง", roman: "maai-leek haawng", chinese: "房间号", id: "maai-leek-haawng" },
  { thai: "เบอร์โทร", roman: "booe thoo", chinese: "电话号码", id: "booe-thoo" },
  { thai: "รายการอาหาร", roman: "raai-gaan aa-haan", chinese: "菜品清单", id: "raai-gaan-aa-haan" },
  { thai: "งานที่ต้องทำ", roman: "ngaan thii dtawng tham", chinese: "要做的任务", id: "ngaan-thii-dtawng-tham" },
  { thai: "เหตุผลของเขา", roman: "heet-phon khaawng khao", chinese: "他的理由", id: "heet-phon-khaawng-khao" },
  { thai: "ข้อความเมื่อกี้", roman: "khaaw-khwaam meuua-gii", chinese: "刚才那句话/消息", id: "khaaw-khwaam-meuua-gii" },
  { thai: "คำถามสุดท้าย", roman: "kham-thaam sut-thaai", chinese: "最后一个问题", id: "kham-thaam-sut-thaai" },
  { thai: "เรื่องที่เล่า", roman: "reuuang thii lao", chinese: "讲的那件事", id: "reuuang-thii-lao" },
  { thai: "เสียงประกาศ", roman: "siiang bpra-gaat", chinese: "广播/公告声音", id: "siiang-bpra-gaat" },
  { thai: "คำอธิบายนี้", roman: "kham a-thi-baai nii", chinese: "这个说明", id: "kham-a-thi-baai-nii" },
  { thai: "คำตอบของครู", roman: "kham-dtaawp khaawng khruu", chinese: "老师的回答", id: "kham-dtaawp-khaawng-khruu" },
];

const directRows: readonly Definition[] = [
  { thai: "เข้าใจที่พูดแล้ว", id: "khao-jai-thii-phuut-laaeo", roman: "khao-jai thii phuut laaeo", chinese: "已经听懂你说的了", partOfSpeech: "短语", theme: "听懂回应", exampleThai: "ขอบคุณนะ เข้าใจที่พูดแล้ว", exampleRoman: "khaawp khun na, khao-jai thii phuut laaeo", exampleChinese: "谢谢，已经听懂你说的了。", tag: "听懂" },
  { thai: "หมายถึงตอนนี้ใช่ไหม", id: "maai-theung-dtaawn-nii-chai-mai", roman: "maai theung dtaawn nii chai mai", chinese: "是指现在对吗", partOfSpeech: "短语", theme: "确认", exampleThai: "คุณหมายถึงตอนนี้ใช่ไหม ฉันจะได้เริ่มเลย", exampleRoman: "khun maai theung dtaawn nii chai mai, chan ja dai roem looei", exampleChinese: "你是指现在对吗？那我就可以开始了。", tag: "确认" },
  { thai: "เมื่อกี้พูดว่าอะไรนะ", id: "meuua-gii-phuut-waa-a-rai-na", roman: "meuua-gii phuut waa a-rai na", chinese: "刚才说什么来着", partOfSpeech: "短语", theme: "反问", exampleThai: "ขอโทษนะ เมื่อกี้พูดว่าอะไรนะ", exampleRoman: "khaaw-thoot na, meuua-gii phuut waa a-rai na", exampleChinese: "不好意思，刚才说什么来着？", tag: "反问" },
  { thai: "ได้ยินไม่ค่อยชัด", id: "dai-yin-mai-khaawy-chat", roman: "dai-yin mai khaawy chat", chinese: "听得不太清楚", partOfSpeech: "短语", theme: "没听清", exampleThai: "เสียงเบามาก ฉันได้ยินไม่ค่อยชัด", exampleRoman: "siiang bao maak, chan dai-yin mai khaawy chat", exampleChinese: "声音很小，我听得不太清楚。", tag: "没听清" },
  { thai: "ช่วยพูดอีกครั้งได้ไหม", id: "chuai-phuut-iik-khrang-dai-mai", roman: "chuai phuut iik khrang dai mai", chinese: "可以再说一次吗", partOfSpeech: "短语", theme: "请重复", exampleThai: "ฉันยังไม่เข้าใจ ช่วยพูดอีกครั้งได้ไหม", exampleRoman: "chan yang mai khao-jai, chuai phuut iik khrang dai mai", exampleChinese: "我还不明白，可以再说一次吗？", tag: "请重复" },
  { thai: "พอเข้าใจบ้างแล้ว", id: "phaaw-khao-jai-baang-laaeo", roman: "phaaw khao-jai baang laaeo", chinese: "大概有点明白了", partOfSpeech: "短语", theme: "理解不理解", exampleThai: "ขอบคุณที่อธิบาย พอเข้าใจบ้างแล้ว", exampleRoman: "khaawp khun thii a-thi-baai, phaaw khao-jai baang laaeo", exampleChinese: "谢谢解释，大概有点明白了。", tag: "理解" },
  { thai: "อ๋อ แล้วต่อยังไง", id: "aaw-laaeo-dtaaw-yang-ngai", roman: "aaw laaeo dtaaw yang ngai", chinese: "哦，然后怎么样", partOfSpeech: "短语", theme: "自然接话", exampleThai: "อ๋อ แล้วต่อยังไง เล่าให้ฟังหน่อย", exampleRoman: "aaw laaeo dtaaw yang ngai, lao hai fang naawy", exampleChinese: "哦，然后怎么样？讲给我听一下。", tag: "接话" },
  { thai: "ขอทวนอีกทีนะ", id: "khaaw-thuuan-iik-thii-na", roman: "khaaw thuuan iik thii na", chinese: "请让我再确认一遍", partOfSpeech: "短语", theme: "确认", exampleThai: "ขอทวนอีกทีนะ เราเจอกันหกโมง", exampleRoman: "khaaw thuuan iik thii na, rao jooe gan hok moong", exampleChinese: "请让我再确认一遍，我们六点见。", tag: "确认" },
];

const understoodRows = topics.map((topic): Definition => ({
  thai: `เข้าใจเรื่อง${topic.thai}แล้ว`,
  id: `khao-jai-reuuang-${topic.id}-laaeo`,
  roman: `khao-jai reuuang ${topic.roman} laaeo`,
  chinese: `已经明白${topic.chinese}了`,
  partOfSpeech: "短语",
  theme: "听懂回应",
  exampleThai: `ขอบคุณที่บอก ฉันเข้าใจเรื่อง${topic.thai}แล้ว`,
  exampleRoman: `khaawp khun thii baawk, chan khao-jai reuuang ${topic.roman} laaeo`,
  exampleChinese: `谢谢你告诉我，我已经明白${topic.chinese}了。`,
  tag: "听懂",
}));

const confirmRows = topics.map((topic): Definition => ({
  thai: `หมายถึง${topic.thai}ใช่ไหม`,
  id: `maai-theung-${topic.id}-chai-mai`,
  roman: `maai theung ${topic.roman} chai mai`,
  chinese: `是指${topic.chinese}对吗`,
  partOfSpeech: "短语",
  theme: "确认",
  exampleThai: `ขอถามอีกครั้ง คุณหมายถึง${topic.thai}ใช่ไหม`,
  exampleRoman: `khaaw thaam iik khrang, khun maai theung ${topic.roman} chai mai`,
  exampleChinese: `我再问一次，你是指${topic.chinese}对吗？`,
  tag: "确认",
}));

const questionBackRows = topics.map((topic): Definition => ({
  thai: `${topic.thai}คืออะไรนะ`,
  id: `${topic.id}-kheuu-a-rai-na`,
  roman: `${topic.roman} kheuu a-rai na`,
  chinese: `${topic.chinese}是什么来着`,
  partOfSpeech: "短语",
  theme: "反问",
  exampleThai: `ขอโทษนะ ${topic.thai}คืออะไรนะ`,
  exampleRoman: `khaaw-thoot na, ${topic.roman} kheuu a-rai na`,
  exampleChinese: `不好意思，${topic.chinese}是什么来着？`,
  tag: "反问",
}));

const unclearRows = topics.map((topic): Definition => ({
  thai: `ฟัง${topic.thai}ไม่ชัด`,
  id: `fang-${topic.id}-mai-chat`,
  roman: `fang ${topic.roman} mai chat`,
  chinese: `没听清${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "没听清",
  exampleThai: `เสียงดังมาก ฉันฟัง${topic.thai}ไม่ชัด`,
  exampleRoman: `siiang dang maak, chan fang ${topic.roman} mai chat`,
  exampleChinese: `声音很大，我没听清${topic.chinese}。`,
  tag: "没听清",
}));

const repeatRows = topics.map((topic): Definition => ({
  thai: `ช่วยพูดเรื่อง${topic.thai}ซ้ำได้ไหม`,
  id: `chuai-phuut-reuuang-${topic.id}-sam-dai-mai`,
  roman: `chuai phuut reuuang ${topic.roman} sam dai mai`,
  chinese: `可以重复说一下${topic.chinese}吗`,
  partOfSpeech: "短语",
  theme: "请重复",
  exampleThai: `ฉันจดไม่ทัน ช่วยพูดเรื่อง${topic.thai}ซ้ำได้ไหม`,
  exampleRoman: `chan jot mai than, chuai phuut reuuang ${topic.roman} sam dai mai`,
  exampleChinese: `我没记下来，可以重复说一下${topic.chinese}吗？`,
  tag: "请重复",
}));

const notUnderstandRows = topics.map((topic): Definition => ({
  thai: `ยังไม่เข้าใจเรื่อง${topic.thai}`,
  id: `yang-mai-khao-jai-reuuang-${topic.id}`,
  roman: `yang mai khao-jai reuuang ${topic.roman}`,
  chinese: `还不明白${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "理解不理解",
  exampleThai: `ขอโทษนะ ฉันยังไม่เข้าใจเรื่อง${topic.thai}`,
  exampleRoman: `khaaw-thoot na, chan yang mai khao-jai reuuang ${topic.roman}`,
  exampleChinese: `不好意思，我还不明白${topic.chinese}。`,
  tag: "不理解",
}));

const followRows = topics.map((topic): Definition => ({
  thai: `อ๋อ แล้วเรื่อง${topic.thai}ล่ะ`,
  id: `aaw-laaeo-reuuang-${topic.id}-la`,
  roman: `aaw laaeo reuuang ${topic.roman} la`,
  chinese: `哦，那${topic.chinese}呢`,
  partOfSpeech: "短语",
  theme: "自然接话",
  exampleThai: `อ๋อ เข้าใจแล้ว แล้วเรื่อง${topic.thai}ล่ะ`,
  exampleRoman: `aaw khao-jai laaeo, laaeo reuuang ${topic.roman} la`,
  exampleChinese: `哦，明白了，那${topic.chinese}呢？`,
  tag: "接话",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...understoodRows,
  ...confirmRows,
  ...questionBackRows,
  ...unclearRows,
  ...repeatRows,
  ...notUnderstandRows,
  ...followRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "听力回应", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 听懂和没听懂时常用“เข้าใจแล้ว、หมายถึง...ใช่ไหม、คืออะไรนะ、ฟัง...ไม่ชัด、ช่วยพูด...ซ้ำ、ยังไม่เข้าใจ、แล้ว...ล่ะ”等回应。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于听懂后的回应、确认、反问、没听清、请重复、表示理解或不理解，以及自然接话。"],
    tags,
    sourceRefs: EVERYDAY_LISTENING_RESPONSES_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_LISTENING_RESPONSES_01 = rows.map(toCandidate);
