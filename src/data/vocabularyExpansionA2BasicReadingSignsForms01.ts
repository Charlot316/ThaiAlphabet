export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "姓名地址日期" | "签名" | "入口出口" | "柜台" | "开放时间" | "说明栏" | "必填选填";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Field = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const BASIC_READING_SIGNS_FORMS_REFS = ["thai-frequency", "thai-a2-basic-reading-signs-forms-candidate"];

const fields: readonly Field[] = [
  { thai: "ช่องชื่อจริง", roman: "chaawng cheuu jing", chinese: "真实姓名栏", id: "chaawng-cheuu-jing", theme: "姓名地址日期" },
  { thai: "ช่องนามสกุล", roman: "chaawng naam-sa-gun", chinese: "姓氏栏", id: "chaawng-naam-sa-gun", theme: "姓名地址日期" },
  { thai: "ช่องชื่อเล่น", roman: "chaawng cheuu-len", chinese: "昵称栏", id: "chaawng-cheuu-len", theme: "姓名地址日期" },
  { thai: "ช่องที่อยู่ปัจจุบัน", roman: "chaawng thii-yuu bpat-ju-ban", chinese: "现住址栏", id: "chaawng-thii-yuu-bpat-ju-ban", theme: "姓名地址日期" },
  { thai: "ช่องรหัสไปรษณีย์", roman: "chaawng ra-hat bprai-sa-nii", chinese: "邮编栏", id: "chaawng-ra-hat-bprai-sa-nii", theme: "姓名地址日期" },
  { thai: "ช่องวันเดือนปีเกิด", roman: "chaawng wan deuuan bpii goet", chinese: "出生日期栏", id: "chaawng-wan-deuuan-bpii-goet", theme: "姓名地址日期" },
  { thai: "ช่องวันที่กรอก", roman: "chaawng wan-thii graawk", chinese: "填写日期栏", id: "chaawng-wan-thii-graawk", theme: "姓名地址日期" },
  { thai: "ช่องลายเซ็น", roman: "chaawng laai-sen", chinese: "签名栏", id: "chaawng-laai-sen", theme: "签名" },
  { thai: "ช่องเบอร์โทร", roman: "chaawng booe thoo", chinese: "电话号码栏", id: "chaawng-booe-thoo", theme: "姓名地址日期" },
  { thai: "ช่องอีเมล", roman: "chaawng ii-meel", chinese: "邮箱栏", id: "chaawng-ii-meel", theme: "姓名地址日期" },
  { thai: "ช่องหมายเหตุ", roman: "chaawng maai-heet", chinese: "备注栏", id: "chaawng-maai-heet", theme: "说明栏" },
  { thai: "ช่องคำอธิบาย", roman: "chaawng kham a-thi-baai", chinese: "说明栏", id: "chaawng-kham-a-thi-baai", theme: "说明栏" },
  { thai: "ช่องข้อมูลเพิ่มเติม", roman: "chaawng khaaw-muun phoem-dtoem", chinese: "补充信息栏", id: "chaawng-khaaw-muun-phoem-dtoem", theme: "说明栏" },
  { thai: "ช่องที่ต้องกรอก", roman: "chaawng thii dtawng graawk", chinese: "必填栏", id: "chaawng-thii-dtawng-graawk", theme: "必填选填" },
  { thai: "ช่องที่ไม่บังคับ", roman: "chaawng thii mai bang-khap", chinese: "选填栏", id: "chaawng-thii-mai-bang-khap", theme: "必填选填" },
  { thai: "ช่องเลขบัตร", roman: "chaawng leek bat", chinese: "证件号码栏", id: "chaawng-leek-bat", theme: "姓名地址日期" },
];

const signs: readonly Field[] = [
  { thai: "ป้ายทางเข้า", roman: "bpaai thaang khao", chinese: "入口标识", id: "bpaai-thaang-khao", theme: "入口出口" },
  { thai: "ป้ายทางออก", roman: "bpaai thaang aawk", chinese: "出口标识", id: "bpaai-thaang-aawk", theme: "入口出口" },
  { thai: "ป้ายทางออกฉุกเฉิน", roman: "bpaai thaang aawk chuk-chooen", chinese: "紧急出口标识", id: "bpaai-thaang-aawk-chuk-chooen", theme: "入口出口" },
  { thai: "ป้ายห้ามเข้า", roman: "bpaai haam khao", chinese: "禁止进入标识", id: "bpaai-haam-khao", theme: "入口出口" },
  { thai: "เคาน์เตอร์บริการ", roman: "khao-dtooe baaw-ri-gaan", chinese: "服务柜台", id: "khao-dtooe-baaw-ri-gaan", theme: "柜台" },
  { thai: "เคาน์เตอร์รับบัตรคิว", roman: "khao-dtooe rap bat khiu", chinese: "取号柜台", id: "khao-dtooe-rap-bat-khiu", theme: "柜台" },
  { thai: "เคาน์เตอร์จ่ายเงิน", roman: "khao-dtooe jaai ngoen", chinese: "付款柜台", id: "khao-dtooe-jaai-ngoen", theme: "柜台" },
  { thai: "ป้ายเวลาเปิดปิด", roman: "bpaai wee-laa bpoet bpit", chinese: "开放时间标识", id: "bpaai-wee-laa-bpoet-bpit", theme: "开放时间" },
];

const directRows: readonly Definition[] = [
  { thai: "กรอกชื่อให้ตรงบัตร", id: "graawk-cheuu-hai-dtrong-bat", roman: "graawk cheuu hai dtrong bat", chinese: "按证件填写姓名", partOfSpeech: "短语", theme: "姓名地址日期", exampleThai: "ในแบบฟอร์มนี้ กรุณากรอกชื่อให้ตรงบัตร", exampleRoman: "nai baaep-faawm nii, ga-ru-naa graawk cheuu hai dtrong bat", exampleChinese: "在这张表格里，请按证件填写姓名。", tag: "姓名" },
  { thai: "เซ็นชื่อในช่องล่างสุด", id: "sen-cheuu-nai-chaawng-laang-sut", roman: "sen cheuu nai chaawng laang sut", chinese: "在最下面一栏签名", partOfSpeech: "短语", theme: "签名", exampleThai: "ถ้าข้อมูลถูกต้องแล้ว เซ็นชื่อในช่องล่างสุด", exampleRoman: "thaa khaaw-muun thuuk-dtawng laaeo, sen cheuu nai chaawng laang sut", exampleChinese: "如果信息正确了，就在最下面一栏签名。", tag: "签名" },
  { thai: "เดินตามป้ายทางออก", id: "doeen-dtaam-bpaai-thaang-aawk", roman: "doeen dtaam bpaai thaang aawk", chinese: "跟着出口标识走", partOfSpeech: "短语", theme: "入口出口", exampleThai: "ถ้าจะออกจากตึก ให้เดินตามป้ายทางออก", exampleRoman: "thaa ja aawk jaak dteuk, hai doeen dtaam bpaai thaang aawk", exampleChinese: "如果要离开大楼，请跟着出口标识走。", tag: "出口" },
  { thai: "ติดต่อที่เคาน์เตอร์นี้", id: "dtit-dtaaw-thii-khao-dtooe-nii", roman: "dtit-dtaaw thii khao-dtooe nii", chinese: "在这个柜台联系/办理", partOfSpeech: "短语", theme: "柜台", exampleThai: "ถ้าต้องการเปลี่ยนข้อมูล ติดต่อที่เคาน์เตอร์นี้", exampleRoman: "thaa dtawng-gaan bpliian khaaw-muun, dtit-dtaaw thii khao-dtooe nii", exampleChinese: "如果需要更改信息，请在这个柜台办理。", tag: "柜台" },
  { thai: "เปิดตั้งแต่เก้าโมง", id: "bpoet-dtang-dtaae-gaao-moong", roman: "bpoet dtang-dtaae gaao moong", chinese: "从九点开始开放", partOfSpeech: "短语", theme: "开放时间", exampleThai: "ป้ายเขียนว่าเปิดตั้งแต่เก้าโมง", exampleRoman: "bpaai khiian waa bpoet dtang-dtaae gaao moong", exampleChinese: "标识上写着从九点开始开放。", tag: "开放时间" },
  { thai: "อ่านคำอธิบายก่อนกรอก", id: "aan-kham-a-thi-baai-gaawn-graawk", roman: "aan kham a-thi-baai gaawn graawk", chinese: "填写前先读说明", partOfSpeech: "短语", theme: "说明栏", exampleThai: "แบบฟอร์มนี้มีหลายช่อง อ่านคำอธิบายก่อนกรอก", exampleRoman: "baaep-faawm nii mii laai chaawng, aan kham a-thi-baai gaawn graawk", exampleChinese: "这张表有很多栏，填写前先读说明。", tag: "说明" },
  { thai: "ช่องนี้จำเป็นต้องกรอก", id: "chaawng-nii-jam-bpen-dtawng-graawk", roman: "chaawng nii jam-bpen dtawng graawk", chinese: "这一栏必须填写", partOfSpeech: "短语", theme: "必填选填", exampleThai: "ช่องนี้จำเป็นต้องกรอก ไม่อย่างนั้นส่งไม่ได้", exampleRoman: "chaawng nii jam-bpen dtawng graawk, mai yaang nan song mai dai", exampleChinese: "这一栏必须填写，否则提交不了。", tag: "必填" },
  { thai: "ช่องนี้ไม่ต้องกรอกก็ได้", id: "chaawng-nii-mai-dtawng-graawk-gaaw-dai", roman: "chaawng nii mai dtawng graawk gaaw dai", chinese: "这一栏不填也可以", partOfSpeech: "短语", theme: "必填选填", exampleThai: "ถ้าไม่มีข้อมูล ช่องนี้ไม่ต้องกรอกก็ได้", exampleRoman: "thaa mai mii khaaw-muun, chaawng nii mai dtawng graawk gaaw dai", exampleChinese: "如果没有信息，这一栏不填也可以。", tag: "选填" },
];

const fillRows = fields.map((field): Definition => ({
  thai: `กรอก${field.thai}ให้ครบ`,
  id: `graawk-${field.id}-hai-khrop`,
  roman: `graawk ${field.roman} hai khrop`,
  chinese: `把${field.chinese}填写完整`,
  partOfSpeech: "短语",
  theme: field.theme,
  exampleThai: `ก่อนส่งแบบฟอร์ม กรุณากรอก${field.thai}ให้ครบ`,
  exampleRoman: `gaawn song baaep-faawm, ga-ru-naa graawk ${field.roman} hai khrop`,
  exampleChinese: `提交表格前，请把${field.chinese}填写完整。`,
  tag: "填表",
}));

const checkRows = fields.map((field): Definition => ({
  thai: `ตรวจ${field.thai}อีกครั้ง`,
  id: `dtruaat-${field.id}-iik-khrang`,
  roman: `dtruaat ${field.roman} iik khrang`,
  chinese: `再检查一次${field.chinese}`,
  partOfSpeech: "短语",
  theme: field.theme,
  exampleThai: `ถ้าไม่แน่ใจ ให้ตรวจ${field.thai}อีกครั้ง`,
  exampleRoman: `thaa mai naae-jai, hai dtruaat ${field.roman} iik khrang`,
  exampleChinese: `如果不确定，请再检查一次${field.chinese}。`,
  tag: "检查",
}));

const requiredRows = fields.map((field): Definition => ({
  thai: `${field.thai}เป็นช่องบังคับ`,
  id: `${field.id}-bpen-chaawng-bang-khap`,
  roman: `${field.roman} bpen chaawng bang-khap`,
  chinese: `${field.chinese}是必填栏`,
  partOfSpeech: "短语",
  theme: "必填选填",
  exampleThai: `${field.thai}เป็นช่องบังคับ ต้องกรอกก่อนส่ง`,
  exampleRoman: `${field.roman} bpen chaawng bang-khap, dtawng graawk gaawn song`,
  exampleChinese: `${field.chinese}是必填栏，提交前必须填写。`,
  tag: "必填",
}));

const signRows = fields.slice(0, 10).map((field): Definition => ({
  thai: `เซ็นชื่อหลังตรวจ${field.thai}`,
  id: `sen-cheuu-lang-dtruaat-${field.id}`,
  roman: `sen cheuu lang dtruaat ${field.roman}`,
  chinese: `检查${field.chinese}后签名`,
  partOfSpeech: "短语",
  theme: "签名",
  exampleThai: `กรุณาเซ็นชื่อหลังตรวจ${field.thai}แล้ว`,
  exampleRoman: `ga-ru-naa sen cheuu lang dtruaat ${field.roman} laaeo`,
  exampleChinese: `请在检查${field.chinese}后签名。`,
  tag: "签名",
}));

const signRows2 = signs.map((sign): Definition => ({
  thai: `อ่าน${sign.thai}ให้ดี`,
  id: `aan-${sign.id}-hai-dii`,
  roman: `aan ${sign.roman} hai dii`,
  chinese: `好好读${sign.chinese}`,
  partOfSpeech: "短语",
  theme: sign.theme,
  exampleThai: `ก่อนเดินต่อ ควรอ่าน${sign.thai}ให้ดี`,
  exampleRoman: `gaawn doeen dtaaw, khuuan aan ${sign.roman} hai dii`,
  exampleChinese: `继续走之前，应该好好读${sign.chinese}。`,
  tag: "标识",
}));

const counterRows = signs.map((sign): Definition => ({
  thai: `ถามที่${sign.thai}`,
  id: `thaam-thii-${sign.id}`,
  roman: `thaam thii ${sign.roman}`,
  chinese: `在${sign.chinese}那里询问`,
  partOfSpeech: "短语",
  theme: sign.theme,
  exampleThai: `ถ้าไม่เข้าใจ ให้ถามที่${sign.thai}`,
  exampleRoman: `thaa mai khao-jai, hai thaam thii ${sign.roman}`,
  exampleChinese: `如果不明白，请在${sign.chinese}那里询问。`,
  tag: "询问",
}));

const optionalRows = fields.map((field): Definition => ({
  thai: `${field.thai}กรอกหรือไม่กรอกก็ได้`,
  id: `${field.id}-graawk-reuu-mai-graawk-gaaw-dai`,
  roman: `${field.roman} graawk reuu mai graawk gaaw dai`,
  chinese: `${field.chinese}填或不填都可以`,
  partOfSpeech: "短语",
  theme: "必填选填",
  exampleThai: `ถ้าไม่มีข้อมูล ${field.thai}กรอกหรือไม่กรอกก็ได้`,
  exampleRoman: `thaa mai mii khaaw-muun, ${field.roman} graawk reuu mai graawk gaaw dai`,
  exampleChinese: `如果没有信息，${field.chinese}填或不填都可以。`,
  tag: "选填",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...fillRows,
  ...checkRows,
  ...requiredRows,
  ...signRows,
  ...signRows2,
  ...counterRows,
  ...optionalRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "标识表格", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 读标识和填表常用“กรอก、ตรวจ、ช่อง、ลายเซ็น、ป้ายทางเข้า/ทางออก、เคาน์เตอร์、เวลาเปิดปิด、ช่องบังคับ”等表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于读标识和表格：姓名、地址、日期、签名、入口出口、柜台、开放时间、说明栏、必填和选填。"],
    tags,
    sourceRefs: BASIC_READING_SIGNS_FORMS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_READING_SIGNS_FORMS_01 = rows.map(toCandidate);
