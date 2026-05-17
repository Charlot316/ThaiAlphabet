export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "想要" | "打算" | "愿意" | "必须" | "应该" | "可以可能" | "敢不敢" | "试试看" | "决定做不做";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Action = { thai: string; roman: string; chinese: string; id: string };

const BASIC_MODAL_INTENTIONS_REFS = ["thai-frequency", "thai-a2-basic-modal-intentions-candidate"];

const actions: readonly Action[] = [
  { thai: "ไปตลาดเช้า", roman: "bpai dta-laat chaao", chinese: "早上去市场", id: "bpai-dta-laat-chaao" },
  { thai: "ซื้อของเข้าบ้าน", roman: "seu khaawng khao baan", chinese: "买东西回家", id: "seu-khaawng-khao-baan" },
  { thai: "โทรหาแม่ก่อน", roman: "thoo haa maae gaawn", chinese: "先给妈妈打电话", id: "thoo-haa-maae-gaawn" },
  { thai: "ถามทางอีกครั้ง", roman: "thaam thaang iik khrang", chinese: "再问一次路", id: "thaam-thaang-iik-khrang" },
  { thai: "ลองพูดภาษาไทย", roman: "laawng phuut phaa-saa thai", chinese: "试着说泰语", id: "laawng-phuut-phaa-saa-thai" },
  { thai: "จองโต๊ะล่วงหน้า", roman: "jaawng dto luang-naa", chinese: "提前订桌", id: "jaawng-dto-luang-naa" },
  { thai: "กลับบ้านเร็วหน่อย", roman: "glap baan reo naawy", chinese: "早点回家", id: "glap-baan-reo-naawy" },
  { thai: "พักผ่อนให้พอ", roman: "phak-phaawn hai phaaw", chinese: "休息够", id: "phak-phaawn-hai-phaaw" },
  { thai: "กินข้าวก่อนออกไป", roman: "gin khaao gaawn aawk bpai", chinese: "出门前吃饭", id: "gin-khaao-gaawn-aawk-bpai" },
  { thai: "ช่วยเพื่อนย้ายของ", roman: "chuai pheuuan yaai khaawng", chinese: "帮朋友搬东西", id: "chuai-pheuuan-yaai-khaawng" },
  { thai: "ส่งข้อความขอโทษ", roman: "song khaaw-khwaam khaaw-thoot", chinese: "发道歉消息", id: "song-khaaw-khwaam-khaaw-thoot" },
  { thai: "เรียนคำศัพท์ใหม่", roman: "riian kham-sap mai", chinese: "学新单词", id: "riian-kham-sap-mai" },
  { thai: "ทำกับข้าวง่ายๆ", roman: "tham gap-khaao ngaai ngaai", chinese: "做简单饭菜", id: "tham-gap-khaao-ngaai-ngaai" },
  { thai: "เก็บเงินเดือนนี้", roman: "gep ngoen deuuan nii", chinese: "这个月存钱", id: "gep-ngoen-deuuan-nii" },
  { thai: "ออกกำลังกายเบาๆ", roman: "aawk gam-lang-gaai bao bao", chinese: "轻松运动", id: "aawk-gam-lang-gaai-bao-bao" },
  { thai: "นอนให้เร็วขึ้น", roman: "naawn hai reo kheun", chinese: "早点睡", id: "naawn-hai-reo-kheun" },
];

const directRows: readonly Definition[] = [
  { thai: "อยากลองดูสักครั้ง", id: "yaak-laawng-duu-sak-khrang", roman: "yaak laawng duu sak khrang", chinese: "想试试看一次", partOfSpeech: "短语", theme: "试试看", exampleThai: "ฉันไม่เคยทำ แต่อยากลองดูสักครั้ง", exampleRoman: "chan mai khooei tham, dtaae yaak laawng duu sak khrang", exampleChinese: "我没做过，但想试试看一次。", tag: "试试" },
  { thai: "ตั้งใจจะเริ่มพรุ่งนี้", id: "dtang-jai-ja-roem-phrung-nii", roman: "dtang-jai ja roem phrung-nii", chinese: "打算明天开始", partOfSpeech: "短语", theme: "打算", exampleThai: "ฉันตั้งใจจะเริ่มพรุ่งนี้ ไม่อยากรอแล้ว", exampleRoman: "chan dtang-jai ja roem phrung-nii, mai yaak raaw laaeo", exampleChinese: "我打算明天开始，不想再等了。", tag: "打算" },
  { thai: "ยอมช่วยถ้ามีเวลา", id: "yaawm-chuai-thaa-mii-wee-laa", roman: "yaawm chuai thaa mii wee-laa", chinese: "如果有时间愿意帮忙", partOfSpeech: "短语", theme: "愿意", exampleThai: "เขายอมช่วยถ้ามีเวลาในตอนเย็น", exampleRoman: "khao yaawm chuai thaa mii wee-laa nai dtaawn yen", exampleChinese: "如果傍晚有时间，他愿意帮忙。", tag: "愿意" },
  { thai: "ต้องทำให้เสร็จวันนี้", id: "dtawng-tham-hai-set-wan-nii", roman: "dtawng tham hai set wan-nii", chinese: "今天必须做完", partOfSpeech: "短语", theme: "必须", exampleThai: "งานนี้ต้องทำให้เสร็จวันนี้ เพราะพรุ่งนี้ไม่ว่าง", exampleRoman: "ngaan nii dtawng tham hai set wan-nii, phraw phrung-nii mai waang", exampleChinese: "这件事今天必须做完，因为明天没空。", tag: "必须" },
  { thai: "ควรถามก่อนตัดสินใจ", id: "khuuan-thaam-gaawn-dtat-sin-jai", roman: "khuuan thaam gaawn dtat-sin-jai", chinese: "决定前应该先问", partOfSpeech: "短语", theme: "应该", exampleThai: "ถ้าไม่แน่ใจ เราควรถามก่อนตัดสินใจ", exampleRoman: "thaa mai naae-jai, rao khuuan thaam gaawn dtat-sin-jai", exampleChinese: "如果不确定，我们决定前应该先问。", tag: "应该" },
  { thai: "อาจไปช้าหน่อย", id: "aat-bpai-chaa-naawy", roman: "aat bpai chaa naawy", chinese: "可能会晚一点去", partOfSpeech: "短语", theme: "可以可能", exampleThai: "ฝนตกหนัก ฉันอาจไปช้าหน่อย", exampleRoman: "fon dtok nak, chan aat bpai chaa naawy", exampleChinese: "雨下得很大，我可能会晚一点去。", tag: "可能" },
  { thai: "กล้าถามตรงๆ ไหม", id: "glaa-thaam-dtrong-dtrong-mai", roman: "glaa thaam dtrong dtrong mai", chinese: "敢直接问吗", partOfSpeech: "短语", theme: "敢不敢", exampleThai: "ถ้าอยากรู้จริงๆ คุณกล้าถามตรงๆ ไหม", exampleRoman: "thaa yaak ruu jing jing, khun glaa thaam dtrong dtrong mai", exampleChinese: "如果真的想知道，你敢直接问吗？", tag: "敢不敢" },
  { thai: "ตัดสินใจไม่ซื้อแล้ว", id: "dtat-sin-jai-mai-seu-laaeo", roman: "dtat-sin-jai mai seu laaeo", chinese: "已经决定不买了", partOfSpeech: "短语", theme: "决定做不做", exampleThai: "ของแพงเกินไป ฉันตัดสินใจไม่ซื้อแล้ว", exampleRoman: "khaawng phaaeng goen bpai, chan dtat-sin-jai mai seu laaeo", exampleChinese: "东西太贵了，我已经决定不买了。", tag: "决定" },
];

const wantRows = actions.map((action): Definition => ({
  thai: `อยาก${action.thai}`,
  id: `yaak-${action.id}`,
  roman: `yaak ${action.roman}`,
  chinese: `想${action.chinese}`,
  partOfSpeech: "短语",
  theme: "想要",
  exampleThai: `วันนี้ฉันอยาก${action.thai} แต่ยังไม่มีเวลา`,
  exampleRoman: `wan-nii chan yaak ${action.roman}, dtaae yang mai mii wee-laa`,
  exampleChinese: `今天我想${action.chinese}，但还没有时间。`,
  tag: "想要",
}));

const planRows = actions.map((action): Definition => ({
  thai: `ตั้งใจจะ${action.thai}`,
  id: `dtang-jai-ja-${action.id}`,
  roman: `dtang-jai ja ${action.roman}`,
  chinese: `打算${action.chinese}`,
  partOfSpeech: "短语",
  theme: "打算",
  exampleThai: `สุดสัปดาห์นี้ฉันตั้งใจจะ${action.thai}`,
  exampleRoman: `sut sap-daa nii chan dtang-jai ja ${action.roman}`,
  exampleChinese: `这个周末我打算${action.chinese}。`,
  tag: "打算",
}));

const willingRows = actions.map((action): Definition => ({
  thai: `ยอม${action.thai}ถ้าจำเป็น`,
  id: `yaawm-${action.id}-thaa-jam-bpen`,
  roman: `yaawm ${action.roman} thaa jam-bpen`,
  chinese: `如果有必要愿意${action.chinese}`,
  partOfSpeech: "短语",
  theme: "愿意",
  exampleThai: `ฉันยอม${action.thai}ถ้าจำเป็นจริงๆ`,
  exampleRoman: `chan yaawm ${action.roman} thaa jam-bpen jing jing`,
  exampleChinese: `如果真的有必要，我愿意${action.chinese}。`,
  tag: "愿意",
}));

const mustRows = actions.map((action): Definition => ({
  thai: `ต้อง${action.thai}ก่อน`,
  id: `dtawng-${action.id}-gaawn`,
  roman: `dtawng ${action.roman} gaawn`,
  chinese: `必须先${action.chinese}`,
  partOfSpeech: "短语",
  theme: "必须",
  exampleThai: `ก่อนออกจากบ้าน เราต้อง${action.thai}ก่อน`,
  exampleRoman: `gaawn aawk jaak baan, rao dtawng ${action.roman} gaawn`,
  exampleChinese: `出门前，我们必须先${action.chinese}。`,
  tag: "必须",
}));

const shouldRows = actions.map((action): Definition => ({
  thai: `ควร${action.thai}ให้ดี`,
  id: `khuuan-${action.id}-hai-dii`,
  roman: `khuuan ${action.roman} hai dii`,
  chinese: `应该好好${action.chinese}`,
  partOfSpeech: "短语",
  theme: "应该",
  exampleThai: `ถ้ามีเวลา คุณควร${action.thai}ให้ดี`,
  exampleRoman: `thaa mii wee-laa, khun khuuan ${action.roman} hai dii`,
  exampleChinese: `如果有时间，你应该好好${action.chinese}。`,
  tag: "应该",
}));

const maybeRows = actions.map((action): Definition => ({
  thai: `อาจจะ${action.thai}`,
  id: `aat-ja-${action.id}`,
  roman: `aat ja ${action.roman}`,
  chinese: `可能会${action.chinese}`,
  partOfSpeech: "短语",
  theme: "可以可能",
  exampleThai: `ถ้าฝนไม่ตก เราอาจจะ${action.thai}`,
  exampleRoman: `thaa fon mai dtok, rao aat ja ${action.roman}`,
  exampleChinese: `如果不下雨，我们可能会${action.chinese}。`,
  tag: "可能",
}));

const decideRows = actions.map((action): Definition => ({
  thai: `ตัดสินใจจะ${action.thai}`,
  id: `dtat-sin-jai-ja-${action.id}`,
  roman: `dtat-sin-jai ja ${action.roman}`,
  chinese: `决定要${action.chinese}`,
  partOfSpeech: "短语",
  theme: "决定做不做",
  exampleThai: `คุยกันแล้ว เราตัดสินใจจะ${action.thai}`,
  exampleRoman: `khui gan laaeo, rao dtat-sin-jai ja ${action.roman}`,
  exampleChinese: `谈过之后，我们决定要${action.chinese}。`,
  tag: "决定",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...wantRows,
  ...planRows,
  ...willingRows,
  ...mustRows,
  ...shouldRows,
  ...maybeRows,
  ...decideRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "基础情态意图", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 情态和意图表达常用“อยาก、ตั้งใจจะ、ยอม、ต้อง、ควร、อาจจะ、ตัดสินใจจะ”接动作。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于表达想要、打算、愿意、必须、应该、可能、敢不敢、试试看和决定做或不做。"],
    tags,
    sourceRefs: BASIC_MODAL_INTENTIONS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_MODAL_INTENTIONS_01 = rows.map(toCandidate);
