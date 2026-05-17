export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "生气" | "难过" | "紧张" | "误会" | "吵架" | "道歉" | "和好" | "安慰" | "解释感受";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Topic = { thai: string; roman: string; chinese: string; id: string };

const BASIC_EMOTION_CONFLICT_REFS = ["thai-frequency", "thai-a2-basic-emotion-conflict-candidate"];

const topics: readonly Topic[] = [
  { thai: "เรื่องเวลา", roman: "reuuang wee-laa", chinese: "时间的事", id: "reuuang-wee-laa" },
  { thai: "เรื่องเงิน", roman: "reuuang ngoen", chinese: "钱的事", id: "reuuang-ngoen" },
  { thai: "เรื่องงานบ้าน", roman: "reuuang ngaan-baan", chinese: "家务的事", id: "reuuang-ngaan-baan" },
  { thai: "เรื่องนัด", roman: "reuuang nat", chinese: "约定的事", id: "reuuang-nat" },
  { thai: "เรื่องคำพูด", roman: "reuuang kham-phuut", chinese: "说话的事", id: "reuuang-kham-phuut" },
  { thai: "เรื่องโทรศัพท์", roman: "reuuang thoo-ra-sap", chinese: "电话的事", id: "reuuang-thoo-ra-sap" },
  { thai: "เรื่องเพื่อน", roman: "reuuang pheuuan", chinese: "朋友的事", id: "reuuang-pheuuan" },
  { thai: "เรื่องครอบครัว", roman: "reuuang khraawp-khrua", chinese: "家人的事", id: "reuuang-khraawp-khrua" },
  { thai: "เรื่องอาหาร", roman: "reuuang aa-haan", chinese: "吃饭的事", id: "reuuang-aa-haan" },
  { thai: "เรื่องการบ้าน", roman: "reuuang gaan-baan", chinese: "作业的事", id: "reuuang-gaan-baan" },
  { thai: "เรื่องการเดินทาง", roman: "reuuang gaan dooen-thaang", chinese: "出行的事", id: "reuuang-gaan-dooen-thaang" },
  { thai: "เรื่องเสียงดัง", roman: "reuuang siiang dang", chinese: "声音太大的事", id: "reuuang-siiang-dang" },
  { thai: "เรื่องของหาย", roman: "reuuang khaawng haai", chinese: "东西丢了的事", id: "reuuang-khaawng-haai" },
  { thai: "เรื่องข้อความ", roman: "reuuang khaaw-khwaam", chinese: "消息的事", id: "reuuang-khaaw-khwaam" },
  { thai: "เรื่องรอคิวนาน", roman: "reuuang raaw khiu naan", chinese: "排队等太久的事", id: "reuuang-raaw-khiu-naan" },
  { thai: "เรื่องเข้าใจผิด", roman: "reuuang khao-jai phit", chinese: "误会的事", id: "reuuang-khao-jai-phit" },
];

const comfortTopics = topics.slice(0, 12);

const directRows: readonly Definition[] = [
  { thai: "ฉันไม่ได้ตั้งใจให้คุณเสียใจ", id: "chan-mai-dai-dtang-jai-hai-khun-siia-jai", roman: "chan mai dai dtang-jai hai khun siia-jai", chinese: "我不是故意让你难过的", partOfSpeech: "短语", theme: "道歉", exampleThai: "ขอโทษนะ ฉันไม่ได้ตั้งใจให้คุณเสียใจ", exampleRoman: "khaaw-thoot na, chan mai dai dtang-jai hai khun siia-jai", exampleChinese: "对不起，我不是故意让你难过的。", tag: "道歉" },
  { thai: "เราใจเย็นๆ ก่อน", id: "rao-jai-yen-yen-gaawn", roman: "rao jai yen yen gaawn", chinese: "我们先冷静一下", partOfSpeech: "短语", theme: "安慰", exampleThai: "เราใจเย็นๆ ก่อน แล้วค่อยคุยกัน", exampleRoman: "rao jai yen yen gaawn, laaeo khaawy khui gan", exampleChinese: "我们先冷静一下，然后再谈。", tag: "安慰" },
  { thai: "ฉันรู้สึกไม่สบายใจ", id: "chan-ruu-seuk-mai-sa-baai-jai", roman: "chan ruu-seuk mai sa-baai-jai", chinese: "我觉得心里不舒服", partOfSpeech: "短语", theme: "解释感受", exampleThai: "ตอนคุณพูดแบบนั้น ฉันรู้สึกไม่สบายใจ", exampleRoman: "dtaawn khun phuut baaep nan, chan ruu-seuk mai sa-baai-jai", exampleChinese: "你那样说的时候，我觉得心里不舒服。", tag: "感受" },
  { thai: "อย่าโกรธกันเลย", id: "yaa-groot-gan-looei", roman: "yaa groot gan looei", chinese: "别互相生气了", partOfSpeech: "短语", theme: "和好", exampleThai: "เรื่องเล็กน้อย อย่าโกรธกันเลย", exampleRoman: "reuuang lek naawy, yaa groot gan looei", exampleChinese: "小事情，别互相生气了。", tag: "和好" },
  { thai: "ขออธิบายก่อน", id: "khaaw-a-thi-baai-gaawn", roman: "khaaw a-thi-baai gaawn", chinese: "请让我先解释", partOfSpeech: "短语", theme: "解释感受", exampleThai: "อย่าเพิ่งโมโห ขออธิบายก่อน", exampleRoman: "yaa phoeng moo-hoo, khaaw a-thi-baai gaawn", exampleChinese: "先别生气，请让我先解释。", tag: "解释" },
  { thai: "พูดกันดีๆ ได้ไหม", id: "phuut-gan-dii-dii-dai-mai", roman: "phuut gan dii dii dai mai", chinese: "可以好好说吗", partOfSpeech: "短语", theme: "吵架", exampleThai: "เราไม่ต้องตะโกน พูดกันดีๆ ได้ไหม", exampleRoman: "rao mai dtawng dta-goon, phuut gan dii dii dai mai", exampleChinese: "我们不用喊，可以好好说吗？", tag: "沟通" },
  { thai: "ทุกอย่างโอเคแล้ว", id: "thuk-yaang-oo-khee-laaeo", roman: "thuk yaang oo-khee laaeo", chinese: "一切已经没事了", partOfSpeech: "短语", theme: "安慰", exampleThai: "ไม่ต้องกังวลนะ ทุกอย่างโอเคแล้ว", exampleRoman: "mai dtawng gang-won na, thuk yaang oo-khee laaeo", exampleChinese: "不用担心，一切已经没事了。", tag: "安慰" },
  { thai: "เราดีกันเหมือนเดิม", id: "rao-dii-gan-meuuan-doem", roman: "rao dii gan meuuan doem", chinese: "我们像以前一样和好了", partOfSpeech: "短语", theme: "和好", exampleThai: "หลังคุยกันแล้ว เราดีกันเหมือนเดิม", exampleRoman: "lang khui gan laaeo, rao dii gan meuuan doem", exampleChinese: "谈过之后，我们像以前一样和好了。", tag: "和好" },
];

const angryRows = topics.map((topic): Definition => ({
  thai: `โกรธเพราะ${topic.thai}`,
  id: `groot-phraw-${topic.id}`,
  roman: `groot phraw ${topic.roman}`,
  chinese: `因为${topic.chinese}生气`,
  partOfSpeech: "短语",
  theme: "生气",
  exampleThai: `เขาโกรธเพราะ${topic.thai} แต่ยังยอมคุยดีๆ`,
  exampleRoman: `khao groot phraw ${topic.roman}, dtaae yang yaawm khui dii dii`,
  exampleChinese: `他/她因为${topic.chinese}生气，但还是愿意好好谈。`,
  tag: "生气",
}));

const sadRows = topics.map((topic): Definition => ({
  thai: `เสียใจเรื่อง${topic.thai.replace("เรื่อง", "")}`,
  id: `siia-jai-${topic.id}`,
  roman: `siia-jai ${topic.roman}`,
  chinese: `为${topic.chinese}难过`,
  partOfSpeech: "短语",
  theme: "难过",
  exampleThai: `ฉันเสียใจเรื่อง${topic.thai.replace("เรื่อง", "")} แต่ไม่อยากทะเลาะ`,
  exampleRoman: `chan siia-jai ${topic.roman}, dtaae mai yaak tha-law`,
  exampleChinese: `我为${topic.chinese}难过，但不想吵架。`,
  tag: "难过",
}));

const nervousRows = topics.map((topic): Definition => ({
  thai: `กังวลเรื่อง${topic.thai.replace("เรื่อง", "")}`,
  id: `gang-won-${topic.id}`,
  roman: `gang-won ${topic.roman}`,
  chinese: `担心${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "紧张",
  exampleThai: `เธอกังวลเรื่อง${topic.thai.replace("เรื่อง", "")} จึงนอนไม่ค่อยหลับ`,
  exampleRoman: `thoe gang-won ${topic.roman}, jeung naawn mai khaawy lap`,
  exampleChinese: `她担心${topic.chinese}，所以不太睡得着。`,
  tag: "担心",
}));

const misunderstandingRows = topics.map((topic): Definition => ({
  thai: `เข้าใจผิดเรื่อง${topic.thai.replace("เรื่อง", "")}`,
  id: `khao-jai-phit-${topic.id}`,
  roman: `khao-jai phit ${topic.roman}`,
  chinese: `误会了${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "误会",
  exampleThai: `เราเข้าใจผิดเรื่อง${topic.thai.replace("เรื่อง", "")} เลยต้องคุยกันใหม่`,
  exampleRoman: `rao khao-jai phit ${topic.roman}, looei dtawng khui gan mai`,
  exampleChinese: `我们误会了${topic.chinese}，所以要重新谈。`,
  tag: "误会",
}));

const apologizeRows = topics.map((topic): Definition => ({
  thai: `ขอโทษเรื่อง${topic.thai.replace("เรื่อง", "")}`,
  id: `khaaw-thoot-${topic.id}`,
  roman: `khaaw-thoot ${topic.roman}`,
  chinese: `为${topic.chinese}道歉`,
  partOfSpeech: "短语",
  theme: "道歉",
  exampleThai: `ฉันขอโทษเรื่อง${topic.thai.replace("เรื่อง", "")} และจะระวังมากขึ้น`,
  exampleRoman: `chan khaaw-thoot ${topic.roman}, lae ja ra-wang maak kheun`,
  exampleChinese: `我为${topic.chinese}道歉，以后会更注意。`,
  tag: "道歉",
}));

const comfortRows = comfortTopics.map((topic): Definition => ({
  thai: `ปลอบใจเรื่อง${topic.thai.replace("เรื่อง", "")}`,
  id: `bplaawp-jai-${topic.id}`,
  roman: `bplaawp-jai ${topic.roman}`,
  chinese: `因${topic.chinese}安慰对方`,
  partOfSpeech: "短语",
  theme: "安慰",
  exampleThai: `เพื่อนปลอบใจฉันเรื่อง${topic.thai.replace("เรื่อง", "")} และบอกว่าไม่เป็นไร`,
  exampleRoman: `pheuuan bplaawp-jai chan ${topic.roman}, lae baawk waa mai bpen rai`,
  exampleChinese: `朋友因${topic.chinese}安慰我，并说没关系。`,
  tag: "安慰",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...angryRows,
  ...sadRows,
  ...nervousRows,
  ...misunderstandingRows,
  ...apologizeRows,
  ...comfortRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "基础情绪冲突", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 冲突表达常用“โกรธ、เสียใจ、กังวล、เข้าใจผิด、ขอโทษ、ปลอบใจ”说明情绪和原因。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于日常轻微冲突、误会、吵架、道歉、和好、安慰和解释感受。"],
    tags,
    sourceRefs: BASIC_EMOTION_CONFLICT_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_EMOTION_CONFLICT_01 = rows.map(toCandidate);
