export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "昨天今天明天" | "发生" | "遇到" | "然后" | "结果" | "原因" | "经历" | "故事复述";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type EventItem = { thai: string; roman: string; chinese: string; id: string };

const SHORT_STORIES_DAILY_REFS = ["thai-frequency", "thai-a2-short-stories-daily-candidate"];

const events: readonly EventItem[] = [
  { thai: "รถเมล์มาช้า", roman: "rot-mee maa chaa", chinese: "公交车来晚了", id: "rot-mee-maa-chaa" },
  { thai: "ฝนตกตอนเช้า", roman: "fon dtok dtaawn chaao", chinese: "早上下雨", id: "fon-dtok-dtaawn-chaao" },
  { thai: "ลืมกุญแจบ้าน", roman: "leum gun-jaae baan", chinese: "忘带家门钥匙", id: "leum-gun-jaae-baan" },
  { thai: "เจอเพื่อนเก่า", roman: "jooe phuean gao", chinese: "遇到老朋友", id: "jooe-phuean-gao" },
  { thai: "ซื้อของผิด", roman: "seu khaawng phit", chinese: "买错东西", id: "seu-khaawng-phit" },
  { thai: "ทำอาหารไหม้", roman: "tham aa-haan mai", chinese: "做饭烧焦了", id: "tham-aa-haan-mai" },
  { thai: "โทรศัพท์แบตหมด", roman: "thoo-ra-sap baaet mot", chinese: "手机没电", id: "thoo-ra-sap-baaet-mot" },
  { thai: "หากระเป๋าไม่เจอ", roman: "haa gra-bpao mai jooe", chinese: "找不到包", id: "haa-gra-bpao-mai-jooe" },
  { thai: "ได้ที่นั่งบนรถไฟ", roman: "dai thii-nang bon rot-fai", chinese: "在火车上有座位", id: "dai-thii-nang-bon-rot-fai" },
  { thai: "กินอาหารอร่อย", roman: "gin aa-haan a-raawy", chinese: "吃到好吃的饭菜", id: "gin-aa-haan-a-raawy" },
  { thai: "เรียนคำใหม่", roman: "riian kham mai", chinese: "学了新词", id: "riian-kham-mai" },
  { thai: "ช่วยคนหลงทาง", roman: "chuai khon long thaang", chinese: "帮助迷路的人", id: "chuai-khon-long-thaang" },
  { thai: "รอคิวนาน", roman: "raaw khiu naan", chinese: "排队等很久", id: "raaw-khiu-naan" },
  { thai: "จ่ายเงินเกิน", roman: "jaai ngoen goen", chinese: "多付了钱", id: "jaai-ngoen-goen" },
  { thai: "ได้ของคืน", roman: "dai khaawng kheun", chinese: "找回东西", id: "dai-khaawng-kheun" },
  { thai: "พลาดรถเที่ยวแรก", roman: "phlaat rot thiao raaek", chinese: "错过第一班车", id: "phlaat-rot-thiao-raaek" },
  { thai: "เจอร้านใหม่", roman: "jooe raan mai", chinese: "发现新店", id: "jooe-raan-mai" },
  { thai: "นอนดึกเกินไป", roman: "naawn deuk goen bpai", chinese: "睡得太晚", id: "naawn-deuk-goen-bpai" },
  { thai: "ได้รับข้อความสำคัญ", roman: "dai rap khaaw-khwaam sam-khan", chinese: "收到重要消息", id: "dai-rap-khaaw-khwaam-sam-khan" },
  { thai: "เจอปัญหาเล็กน้อย", roman: "jooe bpan-haa lek naawy", chinese: "遇到小问题", id: "jooe-bpan-haa-lek-naawy" },
  { thai: "เดินผิดทาง", roman: "doen phit thaang", chinese: "走错路", id: "doen-phit-thaang" },
  { thai: "ได้ลองอาหารใหม่", roman: "dai laawng aa-haan mai", chinese: "试了新食物", id: "dai-laawng-aa-haan-mai" },
  { thai: "เจอแมวหน้าบ้าน", roman: "jooe maaeo naa baan", chinese: "在家门口遇到猫", id: "jooe-maaeo-naa-baan" },
  { thai: "ทำงานเสร็จเร็ว", roman: "tham-ngaan set reo", chinese: "工作很快完成", id: "tham-ngaan-set-reo" },
];

const directRows: readonly Definition[] = [
  { thai: "เรื่องเริ่มจากเมื่อวาน", id: "rueang-roem-jaak-muea-waan", roman: "rueang roem jaak muea-waan", chinese: "故事从昨天开始", partOfSpeech: "短语", theme: "故事复述", exampleThai: "เรื่องเริ่มจากเมื่อวาน ตอนที่ฉันกลับบ้านช้า", exampleRoman: "rueang roem jaak muea-waan, dtaawn thii chan glap baan chaa", exampleChinese: "故事从昨天开始，那时我回家晚了。", tag: "复述" },
  { thai: "ตอนแรกฉันไม่รู้", id: "dtaawn-raaek-chan-mai-ruu", roman: "dtaawn raaek chan mai ruu", chinese: "一开始我不知道", partOfSpeech: "短语", theme: "故事复述", exampleThai: "ตอนแรกฉันไม่รู้ว่าร้านปิดเร็ว", exampleRoman: "dtaawn raaek chan mai ruu waa raan bpit reo", exampleChinese: "一开始我不知道这家店关得早。", tag: "复述" },
  { thai: "หลังจากนั้นก็กลับบ้าน", id: "lang-jaak-nan-gaw-glap-baan", roman: "lang jaak nan gaw glap baan", chinese: "那之后就回家", partOfSpeech: "短语", theme: "然后", exampleThai: "เรากินข้าวเสร็จ หลังจากนั้นก็กลับบ้าน", exampleRoman: "rao gin khaao set, lang jaak nan gaw glap baan", exampleChinese: "我们吃完饭后，那之后就回家了。", tag: "顺序" },
  { thai: "สุดท้ายทุกอย่างเรียบร้อย", id: "sut-thaai-thuk-yaang-riiap-raawy", roman: "sut-thaai thuk yaang riiap-raawy", chinese: "最后一切都顺利", partOfSpeech: "短语", theme: "结果", exampleThai: "เรากังวลนิดหน่อย แต่สุดท้ายทุกอย่างเรียบร้อย", exampleRoman: "rao gang-won nit naawy, dtaae sut-thaai thuk yaang riiap-raawy", exampleChinese: "我们有点担心，但最后一切都顺利。", tag: "结果" },
  { thai: "เหตุผลคือฉันออกช้า", id: "heet-phon-khue-chan-aawk-chaa", roman: "heet-phon khue chan aawk chaa", chinese: "原因是我出门晚", partOfSpeech: "短语", theme: "原因", exampleThai: "ฉันไปสาย เหตุผลคือฉันออกช้า", exampleRoman: "chan bpai saai, heet-phon khue chan aawk chaa", exampleChinese: "我迟到了，原因是我出门晚。", tag: "原因" },
  { thai: "ผลคือเราไปทัน", id: "phon-khue-rao-bpai-than", roman: "phon khue rao bpai than", chinese: "结果是我们赶上了", partOfSpeech: "短语", theme: "结果", exampleThai: "เรารีบเดิน ผลคือเราไปทันรถ", exampleRoman: "rao riip doen, phon khue rao bpai than rot", exampleChinese: "我们快走，结果是赶上车了。", tag: "结果" },
  { thai: "เรื่องนี้สั้นมาก", id: "rueang-nii-san-maak", roman: "rueang nii san maak", chinese: "这件事很短/很简单", partOfSpeech: "短语", theme: "故事复述", exampleThai: "เรื่องนี้สั้นมาก แต่ฉันจำได้ดี", exampleRoman: "rueang nii san maak, dtaae chan jam dai dii", exampleChinese: "这件事很简单，但我记得很清楚。", tag: "复述" },
  { thai: "ฉันเล่าแบบง่าย ๆ", id: "chan-lao-baaep-ngaai-ngaai", roman: "chan lao baaep ngaai ngaai", chinese: "我简单地讲", partOfSpeech: "短语", theme: "故事复述", exampleThai: "ภาษาไทยฉันยังไม่เก่ง ฉันเล่าแบบง่าย ๆ", exampleRoman: "phaa-saa thai chan yang mai geng, chan lao baaep ngaai ngaai", exampleChinese: "我的泰语还不好，我简单地讲。", tag: "复述" },
];

const yesterdayRows = events.map((event): Definition => ({
  thai: `เมื่อวานฉัน${event.thai}`,
  id: `muea-waan-chan-${event.id}`,
  roman: `muea-waan chan ${event.roman}`,
  chinese: `昨天我${event.chinese}`,
  partOfSpeech: "短语",
  theme: "昨天今天明天",
  exampleThai: `เมื่อวานฉัน${event.thai} เลยมีเรื่องเล่าให้เพื่อนฟัง`,
  exampleRoman: `muea-waan chan ${event.roman}, loei mii rueang lao hai phuean fang`,
  exampleChinese: `昨天我${event.chinese}，所以有事讲给朋友听。`,
  tag: "昨天",
}));

const todayRows = events.map((event): Definition => ({
  thai: `วันนี้เกิดเรื่อง${event.thai}`,
  id: `wan-nii-goet-rueang-${event.id}`,
  roman: `wan-nii goet rueang ${event.roman}`,
  chinese: `今天发生了${event.chinese}这件事`,
  partOfSpeech: "短语",
  theme: "发生",
  exampleThai: `วันนี้เกิดเรื่อง${event.thai} แต่ไม่ใช่เรื่องใหญ่`,
  exampleRoman: `wan-nii goet rueang ${event.roman}, dtaae mai chai rueang yai`,
  exampleChinese: `今天发生了${event.chinese}这件事，但不是大事。`,
  tag: "发生",
}));

const meetRows = events.map((event): Definition => ({
  thai: `ฉันเจอเรื่อง${event.thai}`,
  id: `chan-jooe-rueang-${event.id}`,
  roman: `chan jooe rueang ${event.roman}`,
  chinese: `我遇到${event.chinese}这件事`,
  partOfSpeech: "短语",
  theme: "遇到",
  exampleThai: `ระหว่างวันฉันเจอเรื่อง${event.thai}`,
  exampleRoman: `ra-waang wan chan jooe rueang ${event.roman}`,
  exampleChinese: `白天我遇到${event.chinese}这件事。`,
  tag: "遇到",
}));

const sequenceRows = events.map((event): Definition => ({
  thai: `จากนั้นฉันก็${event.thai}`,
  id: `jaak-nan-chan-gaw-${event.id}`,
  roman: `jaak nan chan gaw ${event.roman}`,
  chinese: `然后我就${event.chinese}`,
  partOfSpeech: "短语",
  theme: "然后",
  exampleThai: `ฉันทำธุระเสร็จ จากนั้นฉันก็${event.thai}`,
  exampleRoman: `chan tham thu-ra set, jaak nan chan gaw ${event.roman}`,
  exampleChinese: `我办完事后，然后我就${event.chinese}。`,
  tag: "顺序",
}));

const experienceRows = events.slice(0, 20).map((event): Definition => ({
  thai: `ประสบการณ์${event.thai}ครั้งนี้`,
  id: `bpra-sop-gaan-${event.id}-khrang-nii`,
  roman: `bpra-sop-gaan ${event.roman} khrang nii`,
  chinese: `这次${event.chinese}的经历`,
  partOfSpeech: "短语",
  theme: "经历",
  exampleThai: `ประสบการณ์${event.thai}ครั้งนี้ทำให้ฉันจำได้ดี`,
  exampleRoman: `bpra-sop-gaan ${event.roman} khrang nii tham-hai chan jam dai dii`,
  exampleChinese: `这次${event.chinese}的经历让我记得很清楚。`,
  tag: "经历",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...yesterdayRows,
  ...todayRows,
  ...meetRows,
  ...sequenceRows,
  ...experienceRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "日常叙事", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 复述日常小故事时，可用“昨天/今天、发生、然后、结果、原因、经历”把句子连起来。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于 A2 日常叙事：昨天今天明天、发生、遇到、然后、结果、原因、经历和简单故事复述。"],
    tags,
    sourceRefs: SHORT_STORIES_DAILY_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SHORT_STORIES_DAILY_01 = rows.map(toCandidate);
