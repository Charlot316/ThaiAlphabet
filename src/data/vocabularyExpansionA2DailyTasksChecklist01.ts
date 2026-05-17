export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "买东西" | "打电话" | "预约" | "寄件" | "打扫" | "检查" | "完成遗漏" | "优先顺序";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Task = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const DAILY_TASKS_CHECKLIST_REFS = ["thai-frequency", "thai-a2-daily-tasks-checklist-candidate"];

const tasks: readonly Task[] = [
  { thai: "ซื้อผักสด", roman: "seu phak sot", chinese: "买新鲜蔬菜", id: "seu-phak-sot", theme: "买东西" },
  { thai: "ซื้อน้ำดื่ม", roman: "seu naam deum", chinese: "买饮用水", id: "seu-naam-deum", theme: "买东西" },
  { thai: "โทรหาแม่", roman: "thoo haa maae", chinese: "给妈妈打电话", id: "thoo-haa-maae", theme: "打电话" },
  { thai: "โทรถามร้านซ่อม", roman: "thoo thaam raan saawm", chinese: "打电话问维修店", id: "thoo-thaam-raan-saawm", theme: "打电话" },
  { thai: "จองคิวตัดผม", roman: "jaawng khiu dtat phom", chinese: "预约理发", id: "jaawng-khiu-dtat-phom", theme: "预约" },
  { thai: "นัดหมอตอนเช้า", roman: "nat maaw dtaawn chaao", chinese: "预约早上看医生", id: "nat-maaw-dtaawn-chaao", theme: "预约" },
  { thai: "ส่งพัสดุให้เพื่อน", roman: "song phat-sa-du hai pheuuan", chinese: "给朋友寄包裹", id: "song-phat-sa-du-hai-pheuuan", theme: "寄件" },
  { thai: "ส่งเอกสารทางไปรษณีย์", roman: "song eek-ga-saan thaang bprai-sa-nii", chinese: "邮寄文件", id: "song-eek-ga-saan-thaang-bprai-sa-nii", theme: "寄件" },
  { thai: "กวาดพื้นห้อง", roman: "gwaat pheuun haawng", chinese: "扫房间地板", id: "gwaat-pheuun-haawng", theme: "打扫" },
  { thai: "เช็ดโต๊ะกินข้าว", roman: "chet dto gin khaao", chinese: "擦餐桌", id: "chet-dto-gin-khaao", theme: "打扫" },
  { thai: "ตรวจประตูหน้าบ้าน", roman: "dtruaat bpra-dtuu naa baan", chinese: "检查家门", id: "dtruaat-bpra-dtuu-naa-baan", theme: "检查" },
  { thai: "ตรวจไฟในครัว", roman: "dtruaat fai nai khrua", chinese: "检查厨房灯", id: "dtruaat-fai-nai-khrua", theme: "检查" },
  { thai: "เตรียมอาหารเย็น", roman: "dtriiam aa-haan yen", chinese: "准备晚饭", id: "dtriiam-aa-haan-yen", theme: "完成遗漏" },
  { thai: "เก็บเสื้อผ้าเข้าตู้", roman: "gep seua-phaa khao dtuu", chinese: "把衣服收进柜子", id: "gep-seua-phaa-khao-dtuu", theme: "完成遗漏" },
  { thai: "จ่ายค่าน้ำค่าไฟ", roman: "jaai khaa naam khaa fai", chinese: "缴水电费", id: "jaai-khaa-naam-khaa-fai", theme: "优先顺序" },
  { thai: "ตอบข้อความสำคัญ", roman: "dtaawp khaaw-khwaam sam-khan", chinese: "回复重要消息", id: "dtaawp-khaaw-khwaam-sam-khan", theme: "优先顺序" },
];

const directRows: readonly Definition[] = [
  { thai: "ทำรายการงานวันนี้", id: "tham-raai-gaan-ngaan-wan-nii", roman: "tham raai-gaan ngaan wan-nii", chinese: "列今天的任务清单", partOfSpeech: "短语", theme: "优先顺序", exampleThai: "ก่อนเริ่มงาน ฉันทำรายการงานวันนี้ก่อน", exampleRoman: "gaawn roem ngaan, chan tham raai-gaan ngaan wan-nii gaawn", exampleChinese: "开始做事前，我先列今天的任务清单。", tag: "清单" },
  { thai: "งานไหนต้องทำก่อน", id: "ngaan-nai-dtawng-tham-gaawn", roman: "ngaan nai dtawng tham gaawn", chinese: "哪件事要先做", partOfSpeech: "短语", theme: "优先顺序", exampleThai: "งานเยอะมาก งานไหนต้องทำก่อน", exampleRoman: "ngaan yoe maak, ngaan nai dtawng tham gaawn", exampleChinese: "事情很多，哪件事要先做？", tag: "优先" },
  { thai: "ขีดฆ่างานที่เสร็จแล้ว", id: "khiit-khaa-ngaan-thii-set-laaeo", roman: "khiit khaa ngaan thii set laaeo", chinese: "划掉已完成的任务", partOfSpeech: "短语", theme: "完成遗漏", exampleThai: "เมื่อทำเสร็จแล้ว ฉันขีดฆ่างานที่เสร็จแล้ว", exampleRoman: "meuua tham set laaeo, chan khiit khaa ngaan thii set laaeo", exampleChinese: "做完后，我划掉已完成的任务。", tag: "完成" },
  { thai: "อย่าลืมงานเล็กๆ", id: "yaa-leum-ngaan-lek-lek", roman: "yaa leum ngaan lek lek", chinese: "别忘了小任务", partOfSpeech: "短语", theme: "完成遗漏", exampleThai: "วันนี้มีงานเล็กหลายอย่าง อย่าลืมงานเล็กๆ นะ", exampleRoman: "wan-nii mii ngaan lek laai yaang, yaa leum ngaan lek lek na", exampleChinese: "今天有好几件小事，别忘了小任务。", tag: "遗漏" },
  { thai: "เพิ่มงานนี้ในลิสต์", id: "phoem-ngaan-nii-nai-lit", roman: "phoem ngaan nii nai lit", chinese: "把这件事加进清单", partOfSpeech: "短语", theme: "优先顺序", exampleThai: "ถ้านึกออกแล้ว เพิ่มงานนี้ในลิสต์ด้วย", exampleRoman: "thaa neuk aawk laaeo, phoem ngaan nii nai lit duai", exampleChinese: "如果想起来了，也把这件事加进清单。", tag: "清单" },
  { thai: "เหลืองานอีกสองอย่าง", id: "leuua-ngaan-iik-saawng-yaang", roman: "leuua ngaan iik saawng yaang", chinese: "还剩两件事", partOfSpeech: "短语", theme: "完成遗漏", exampleThai: "วันนี้ทำไปเยอะแล้ว เหลืองานอีกสองอย่าง", exampleRoman: "wan-nii tham bpai yoe laaeo, leuua ngaan iik saawng yaang", exampleChinese: "今天已经做了很多，还剩两件事。", tag: "剩余" },
  { thai: "เรื่องนี้ด่วนกว่า", id: "reuuang-nii-duan-gwaa", roman: "reuuang nii duan gwaa", chinese: "这件事更急", partOfSpeech: "短语", theme: "优先顺序", exampleThai: "เราทำอันนั้นทีหลังได้ เรื่องนี้ด่วนกว่า", exampleRoman: "rao tham an nan thii lang dai, reuuang nii duan gwaa", exampleChinese: "我们可以晚点做那个，这件事更急。", tag: "优先" },
  { thai: "ตรวจอีกครั้งก่อนส่ง", id: "dtruaat-iik-khrang-gaawn-song", roman: "dtruaat iik khrang gaawn song", chinese: "发送前再检查一次", partOfSpeech: "短语", theme: "检查", exampleThai: "เอกสารนี้สำคัญ ตรวจอีกครั้งก่อนส่ง", exampleRoman: "eek-ga-saan nii sam-khan, dtruaat iik khrang gaawn song", exampleChinese: "这份文件很重要，发送前再检查一次。", tag: "检查" },
];

const checklistRows = tasks.map((task): Definition => ({
  thai: `ใส่${task.thai}ในรายการ`,
  id: `sai-${task.id}-nai-raai-gaan`,
  roman: `sai ${task.roman} nai raai-gaan`,
  chinese: `把${task.chinese}放进清单`,
  partOfSpeech: "短语",
  theme: task.theme,
  exampleThai: `ก่อนลืม ฉันใส่${task.thai}ในรายการ`,
  exampleRoman: `gaawn leum, chan sai ${task.roman} nai raai-gaan`,
  exampleChinese: `趁还没忘，我把${task.chinese}放进清单。`,
  tag: "清单",
}));

const doRows = tasks.map((task): Definition => ({
  thai: `ต้อง${task.thai}วันนี้`,
  id: `dtawng-${task.id}-wan-nii`,
  roman: `dtawng ${task.roman} wan-nii`,
  chinese: `今天必须${task.chinese}`,
  partOfSpeech: "短语",
  theme: task.theme,
  exampleThai: `ในลิสต์เขียนว่าต้อง${task.thai}วันนี้`,
  exampleRoman: `nai lit khiian waa dtawng ${task.roman} wan-nii`,
  exampleChinese: `清单上写着今天必须${task.chinese}。`,
  tag: "任务",
}));

const finishRows = tasks.map((task): Definition => ({
  thai: `${task.thai}เสร็จแล้ว`,
  id: `${task.id}-set-laaeo`,
  roman: `${task.roman} set laaeo`,
  chinese: `已经完成${task.chinese}`,
  partOfSpeech: "短语",
  theme: "完成遗漏",
  exampleThai: `${task.thai}เสร็จแล้ว ต่อไปทำงานข้อถัดไป`,
  exampleRoman: `${task.roman} set laaeo, dtaaw bpai tham ngaan khaaw that bpai`,
  exampleChinese: `已经完成${task.chinese}，接下来做下一项。`,
  tag: "完成",
}));

const forgotRows = tasks.map((task): Definition => ({
  thai: `ลืม${task.thai}`,
  id: `leum-${task.id}`,
  roman: `leum ${task.roman}`,
  chinese: `忘了${task.chinese}`,
  partOfSpeech: "短语",
  theme: "完成遗漏",
  exampleThai: `เมื่อวานฉันลืม${task.thai} วันนี้ต้องทำให้เสร็จ`,
  exampleRoman: `meuua-waan chan leum ${task.roman}, wan-nii dtawng tham hai set`,
  exampleChinese: `昨天我忘了${task.chinese}，今天必须做完。`,
  tag: "遗漏",
}));

const firstRows = tasks.map((task): Definition => ({
  thai: `ทำ${task.thai}ก่อน`,
  id: `tham-${task.id}-gaawn`,
  roman: `tham ${task.roman} gaawn`,
  chinese: `先做${task.chinese}`,
  partOfSpeech: "短语",
  theme: "优先顺序",
  exampleThai: `ถ้าเวลาไม่พอ เราทำ${task.thai}ก่อน`,
  exampleRoman: `thaa wee-laa mai phaaw, rao tham ${task.roman} gaawn`,
  exampleChinese: `如果时间不够，我们先做${task.chinese}。`,
  tag: "优先",
}));

const checkRows = tasks.map((task): Definition => ({
  thai: `ตรวจว่า${task.thai}หรือยัง`,
  id: `dtruaat-waa-${task.id}-reuu-yang`,
  roman: `dtruaat waa ${task.roman} reuu yang`,
  chinese: `检查是否已经${task.chinese}`,
  partOfSpeech: "短语",
  theme: "检查",
  exampleThai: `ก่อนออกจากบ้าน ตรวจว่า${task.thai}หรือยัง`,
  exampleRoman: `gaawn aawk jaak baan, dtruaat waa ${task.roman} reuu yang`,
  exampleChinese: `出门前，检查是否已经${task.chinese}。`,
  tag: "检查",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...checklistRows,
  ...doRows,
  ...finishRows,
  ...forgotRows,
  ...firstRows,
  ...checkRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "清单任务", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 清单任务常用“ใส่...ในรายการ、ต้อง...วันนี้、...เสร็จแล้ว、ลืม...、ทำ...ก่อน、ตรวจว่า...หรือยัง”等句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于买东西、打电话、预约、寄件、打扫、检查、完成、遗漏和优先顺序。"],
    tags,
    sourceRefs: DAILY_TASKS_CHECKLIST_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_TASKS_CHECKLIST_01 = rows.map(toCandidate);
