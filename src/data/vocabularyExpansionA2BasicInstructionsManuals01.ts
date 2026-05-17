export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "按打开" | "选择输入" | "保存确认取消" | "步骤" | "注意" | "使用前后";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const BASIC_INSTRUCTIONS_MANUALS_REFS = ["thai-frequency", "thai-a2-basic-instructions-manuals-candidate"];

const controls: readonly Item[] = [
  { thai: "ปุ่มสีเขียว", roman: "bpum sii khiaao", chinese: "绿色按钮", id: "bpum-sii-khiaao" },
  { thai: "ปุ่มเริ่ม", roman: "bpum roem", chinese: "开始按钮", id: "bpum-roem" },
  { thai: "ปุ่มหยุด", roman: "bpum yut", chinese: "停止按钮", id: "bpum-yut" },
  { thai: "ปุ่มบันทึก", roman: "bpum ban-theuk", chinese: "保存按钮", id: "bpum-ban-theuk" },
  { thai: "ปุ่มยืนยัน", roman: "bpum yeuun-yan", chinese: "确认按钮", id: "bpum-yeuun-yan" },
  { thai: "ปุ่มยกเลิก", roman: "bpum yok-loek", chinese: "取消按钮", id: "bpum-yok-loek" },
  { thai: "หน้าจอหลัก", roman: "naa-jaaw lak", chinese: "主页面", id: "naa-jaaw-lak" },
  { thai: "เมนูตั้งค่า", roman: "mee-nuu dtang khaa", chinese: "设置菜单", id: "mee-nuu-dtang-khaa" },
  { thai: "ช่องชื่อ", roman: "chaawng cheuu", chinese: "姓名栏", id: "chaawng-cheuu" },
  { thai: "ช่องเบอร์โทร", roman: "chaawng booe thoo", chinese: "电话栏", id: "chaawng-booe-thoo" },
  { thai: "ช่องรหัสผ่าน", roman: "chaawng ra-hat phaan", chinese: "密码栏", id: "chaawng-ra-hat-phaan" },
  { thai: "รายการภาษา", roman: "raai-gaan phaa-saa", chinese: "语言列表", id: "raai-gaan-phaa-saa" },
  { thai: "รูปภาพที่ต้องการ", roman: "ruup-phaap thii dtawng-gaan", chinese: "想要的图片", id: "ruup-phaap-thii-dtawng-gaan" },
  { thai: "ไฟล์เอกสาร", roman: "fai eek-ga-saan", chinese: "文档文件", id: "fai-eek-ga-saan" },
  { thai: "วิธีใช้งาน", roman: "wi-thii chai-ngaan", chinese: "使用方法", id: "wi-thii-chai-ngaan" },
  { thai: "ข้อความเตือน", roman: "khaaw-khwaam dteuuan", chinese: "提醒信息", id: "khaaw-khwaam-dteuuan" },
];

const steps: readonly Item[] = [
  { thai: "ล้างมือให้สะอาด", roman: "laang meuu hai sa-aat", chinese: "把手洗干净", id: "laang-meuu-hai-sa-aat" },
  { thai: "เสียบปลั๊กให้แน่น", roman: "siiap bplak hai naaen", chinese: "把插头插牢", id: "siiap-bplak-hai-naaen" },
  { thai: "เปิดฝาเครื่อง", roman: "bpoet faa khreuuang", chinese: "打开机器盖子", id: "bpoet-faa-khreuuang" },
  { thai: "ใส่น้ำพอดี", roman: "sai naam phaaw dii", chinese: "放适量水", id: "sai-naam-phaaw-dii" },
  { thai: "เลือกโหมดเบา", roman: "leuuak moot bao", chinese: "选择轻柔模式", id: "leuuak-moot-bao" },
  { thai: "รอสัญญาณเสียง", roman: "raaw san-yaan siiang", chinese: "等待提示音", id: "raaw-san-yaan-siiang" },
  { thai: "ปิดเครื่องหลังใช้", roman: "bpit khreuuang lang chai", chinese: "用后关机", id: "bpit-khreuuang-lang-chai" },
  { thai: "ถอดปลั๊กออก", roman: "thaawt bplak aawk", chinese: "拔掉插头", id: "thaawt-bplak-aawk" },
  { thai: "เช็ดให้แห้ง", roman: "chet hai haaeng", chinese: "擦干", id: "chet-hai-haaeng" },
  { thai: "เก็บไว้ในที่แห้ง", roman: "gep wai nai thii haaeng", chinese: "收在干燥处", id: "gep-wai-nai-thii-haaeng" },
  { thai: "อ่านคำเตือนก่อน", roman: "aan kham-dteuuan gaawn", chinese: "先读注意事项", id: "aan-kham-dteuuan-gaawn" },
  { thai: "ตรวจข้อมูลอีกครั้ง", roman: "dtruaat khaaw-muun iik khrang", chinese: "再检查一次信息", id: "dtruaat-khaaw-muun-iik-khrang" },
];

const directRows: readonly Definition[] = [
  { thai: "ทำตามขั้นตอนทีละข้อ", id: "tham-dtaam-khan-dtaawn-thii-la-khaaw", roman: "tham dtaam khan-dtaawn thii la khaaw", chinese: "逐条按照步骤做", partOfSpeech: "短语", theme: "步骤", exampleThai: "ถ้าใช้ครั้งแรก ให้ทำตามขั้นตอนทีละข้อ", exampleRoman: "thaa chai khrang raaek, hai tham dtaam khan-dtaawn thii la khaaw", exampleChinese: "如果第一次使用，请逐条按照步骤做。", tag: "步骤" },
  { thai: "กดหนึ่งครั้งก็พอ", id: "got-neung-khrang-gaaw-phaaw", roman: "got neung khrang gaaw phaaw", chinese: "按一次就够了", partOfSpeech: "短语", theme: "按打开", exampleThai: "ปุ่มนี้กดหนึ่งครั้งก็พอ ไม่ต้องกดซ้ำ", exampleRoman: "bpum nii got neung khrang gaaw phaaw, mai dtawng got sam", exampleChinese: "这个按钮按一次就够了，不用重复按。", tag: "按" },
  { thai: "เปิดหน้าต่างใหม่", id: "bpoet-naa-dtaang-mai", roman: "bpoet naa-dtaang mai", chinese: "打开新窗口", partOfSpeech: "短语", theme: "按打开", exampleThai: "ถ้าต้องการดูรายละเอียด ให้เปิดหน้าต่างใหม่", exampleRoman: "thaa dtawng-gaan duu raai-la-iiat, hai bpoet naa-dtaang mai", exampleChinese: "如果想看详细内容，请打开新窗口。", tag: "打开" },
  { thai: "เลือกคำตอบที่ถูก", id: "leuuak-kham-dtaawp-thii-thuuk", roman: "leuuak kham-dtaawp thii thuuk", chinese: "选择正确答案", partOfSpeech: "短语", theme: "选择输入", exampleThai: "อ่านโจทย์ก่อน แล้วเลือกคำตอบที่ถูก", exampleRoman: "aan joot gaawn, laaeo leuuak kham-dtaawp thii thuuk", exampleChinese: "先读题，然后选择正确答案。", tag: "选择" },
  { thai: "กรอกข้อมูลให้ครบ", id: "graawk-khaaw-muun-hai-khrop", roman: "graawk khaaw-muun hai khrop", chinese: "把信息填写完整", partOfSpeech: "短语", theme: "选择输入", exampleThai: "ก่อนกดยืนยัน กรุณากรอกข้อมูลให้ครบ", exampleRoman: "gaawn got yeuun-yan, ga-ru-naa graawk khaaw-muun hai khrop", exampleChinese: "按确认前，请把信息填写完整。", tag: "输入" },
  { thai: "บันทึกก่อนออก", id: "ban-theuk-gaawn-aawk", roman: "ban-theuk gaawn aawk", chinese: "退出前先保存", partOfSpeech: "短语", theme: "保存确认取消", exampleThai: "ถ้าแก้ข้อความแล้ว อย่าลืมบันทึกก่อนออก", exampleRoman: "thaa gaae khaaw-khwaam laaeo, yaa leum ban-theuk gaawn aawk", exampleChinese: "如果改了文字，别忘了退出前先保存。", tag: "保存" },
  { thai: "ยืนยันอีกครั้ง", id: "yeuun-yan-iik-khrang", roman: "yeuun-yan iik khrang", chinese: "再次确认", partOfSpeech: "短语", theme: "保存确认取消", exampleThai: "ระบบจะถามให้ยืนยันอีกครั้ง", exampleRoman: "ra-bop ja thaam hai yeuun-yan iik khrang", exampleChinese: "系统会要求再次确认。", tag: "确认" },
  { thai: "ระวังพื้นห้องน้ำเปียก", id: "ra-wang-pheuun-haawng-naam-bpiiak", roman: "ra-wang pheuun haawng naam bpiiak", chinese: "注意浴室地面湿滑", partOfSpeech: "短语", theme: "注意", exampleThai: "หลังอาบน้ำ ระวังพื้นห้องน้ำเปียก", exampleRoman: "lang aap naam, ra-wang pheuun haawng naam bpiiak", exampleChinese: "洗澡后，注意浴室地面湿滑。", tag: "注意" },
];

const pressRows = controls.map((item): Definition => ({
  thai: `กด${item.thai}เบาๆ`,
  id: `got-${item.id}-bao-bao`,
  roman: `got ${item.roman} bao bao`,
  chinese: `轻轻按${item.chinese}`,
  partOfSpeech: "短语",
  theme: "按打开",
  exampleThai: `ถ้าต้องการเริ่ม ให้กด${item.thai}เบาๆ`,
  exampleRoman: `thaa dtawng-gaan roem, hai got ${item.roman} bao bao`,
  exampleChinese: `如果想开始，请轻轻按${item.chinese}。`,
  tag: "按",
}));

const openRows = controls.map((item): Definition => ({
  thai: `เปิด${item.thai}เพื่อตรวจดู`,
  id: `bpoet-${item.id}-pheuua-dtruaat-duu`,
  roman: `bpoet ${item.roman} pheuua dtruaat duu`,
  chinese: `打开${item.chinese}来查看`,
  partOfSpeech: "短语",
  theme: "按打开",
  exampleThai: `ก่อนทำต่อ เปิด${item.thai}เพื่อตรวจดูก่อน`,
  exampleRoman: `gaawn tham dtaaw, bpoet ${item.roman} pheuua dtruaat duu gaawn`,
  exampleChinese: `继续做之前，先打开${item.chinese}查看。`,
  tag: "打开",
}));

const chooseRows = controls.map((item): Definition => ({
  thai: `เลือก${item.thai}ที่ต้องการ`,
  id: `leuuak-${item.id}-thii-dtawng-gaan`,
  roman: `leuuak ${item.roman} thii dtawng-gaan`,
  chinese: `选择需要的${item.chinese}`,
  partOfSpeech: "短语",
  theme: "选择输入",
  exampleThai: `ในหน้านี้ ให้เลือก${item.thai}ที่ต้องการ`,
  exampleRoman: `nai naa nii, hai leuuak ${item.roman} thii dtawng-gaan`,
  exampleChinese: `在这个页面，请选择需要的${item.chinese}。`,
  tag: "选择",
}));

const inputRows = controls.slice(8, 14).map((item): Definition => ({
  thai: `ใส่ข้อมูลใน${item.thai}`,
  id: `sai-khaaw-muun-nai-${item.id}`,
  roman: `sai khaaw-muun nai ${item.roman}`,
  chinese: `在${item.chinese}里输入信息`,
  partOfSpeech: "短语",
  theme: "选择输入",
  exampleThai: `กรุณาใส่ข้อมูลใน${item.thai}ให้ถูกต้อง`,
  exampleRoman: `ga-ru-naa sai khaaw-muun nai ${item.roman} hai thuuk-dtawng`,
  exampleChinese: `请在${item.chinese}里正确输入信息。`,
  tag: "输入",
}));

const saveRows = steps.map((step): Definition => ({
  thai: `บันทึกหลังจาก${step.thai}`,
  id: `ban-theuk-lang-jaak-${step.id}`,
  roman: `ban-theuk lang jaak ${step.roman}`,
  chinese: `${step.chinese}之后保存`,
  partOfSpeech: "短语",
  theme: "保存确认取消",
  exampleThai: `เมื่อ${step.thai}แล้ว ให้บันทึกหลังจากนั้น`,
  exampleRoman: `meuua ${step.roman} laaeo, hai ban-theuk lang jaak nan`,
  exampleChinese: `${step.chinese}之后，请保存。`,
  tag: "保存",
}));

const stepRows = steps.map((step): Definition => ({
  thai: `ขั้นตอนนี้คือ${step.thai}`,
  id: `khan-dtaawn-nii-kheuu-${step.id}`,
  roman: `khan-dtaawn nii kheuu ${step.roman}`,
  chinese: `这一步是${step.chinese}`,
  partOfSpeech: "短语",
  theme: "步骤",
  exampleThai: `ขั้นตอนนี้คือ${step.thai} อย่าข้ามนะ`,
  exampleRoman: `khan-dtaawn nii kheuu ${step.roman}, yaa khaam na`,
  exampleChinese: `这一步是${step.chinese}，不要跳过。`,
  tag: "步骤",
}));

const beforeAfterRows = steps.map((step): Definition => ({
  thai: `ก่อนใช้ควร${step.thai}`,
  id: `gaawn-chai-khuuan-${step.id}`,
  roman: `gaawn chai khuuan ${step.roman}`,
  chinese: `使用前应该${step.chinese}`,
  partOfSpeech: "短语",
  theme: "使用前后",
  exampleThai: `ก่อนใช้ครั้งแรก ควร${step.thai}`,
  exampleRoman: `gaawn chai khrang raaek, khuuan ${step.roman}`,
  exampleChinese: `第一次使用前，应该${step.chinese}。`,
  tag: "使用前",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...pressRows,
  ...openRows,
  ...chooseRows,
  ...inputRows,
  ...saveRows,
  ...stepRows,
  ...beforeAfterRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "基础说明操作", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 操作说明常用“กด、เปิด、เลือก、ใส่、บันทึก、ยืนยัน、ขั้นตอน、ก่อนใช้、ระวัง”等词。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于基础说明和操作：按、打开、选择、输入、保存、确认、取消、步骤、注意和使用前后。"],
    tags,
    sourceRefs: BASIC_INSTRUCTIONS_MANUALS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_INSTRUCTIONS_MANUALS_01 = rows.map(toCandidate);
