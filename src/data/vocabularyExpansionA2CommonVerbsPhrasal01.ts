export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "拿来拿去" | "带来带走" | "放下拿起" | "打开关上" | "找得到找不到" | "做完未完";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const COMMON_VERBS_PHRASAL_REFS = ["thai-frequency", "thai-a2-common-verbs-phrasal-candidate"];

const objects: readonly Item[] = [
  { thai: "หนังสือเล่มนี้", roman: "nang-seuu lem nii", chinese: "这本书", id: "nang-seuu-lem-nii" },
  { thai: "แก้วน้ำใบนี้", roman: "gaaeo naam bai nii", chinese: "这个水杯", id: "gaaeo-naam-bai-nii" },
  { thai: "กุญแจบ้าน", roman: "gun-jaae baan", chinese: "家门钥匙", id: "gun-jaae-baan" },
  { thai: "กระเป๋าใบเล็ก", roman: "gra-bpao bai lek", chinese: "小包", id: "gra-bpao-bai-lek" },
  { thai: "เอกสารชุดนี้", roman: "eek-ga-saan chut nii", chinese: "这套文件", id: "eek-ga-saan-chut-nii" },
  { thai: "ข้าวกล่องนี้", roman: "khaao glaawng nii", chinese: "这盒饭", id: "khaao-glaawng-nii" },
  { thai: "ร่มสีดำ", roman: "rom sii dam", chinese: "黑色雨伞", id: "rom-sii-dam" },
  { thai: "รองเท้าคู่นี้", roman: "raawng-thaao khuu nii", chinese: "这双鞋", id: "raawng-thaao-khuu-nii" },
  { thai: "โทรศัพท์เครื่องเก่า", roman: "thoo-ra-sap khreuuang gao", chinese: "旧手机", id: "thoo-ra-sap-khreuuang-gao" },
  { thai: "ขนมถุงนี้", roman: "kha-nom thung nii", chinese: "这袋零食", id: "kha-nom-thung-nii" },
  { thai: "เสื้อสีขาว", roman: "seua sii khaao", chinese: "白色衣服", id: "seua-sii-khaao" },
  { thai: "กล่องพลาสติก", roman: "glaawng phlaat-dtik", chinese: "塑料盒", id: "glaawng-phlaat-dtik" },
  { thai: "ถุงผ้าใบนี้", roman: "thung phaa bai nii", chinese: "这个布袋", id: "thung-phaa-bai-nii" },
  { thai: "บัตรนักเรียน", roman: "bat nak-riian", chinese: "学生证", id: "bat-nak-riian" },
  { thai: "ยาแก้ปวด", roman: "yaa gaae bpuat", chinese: "止痛药", id: "yaa-gaae-bpuat" },
  { thai: "ของฝากถุงนี้", roman: "khaawng-faak thung nii", chinese: "这袋伴手礼", id: "khaawng-faak-thung-nii" },
];

const tasks: readonly Item[] = [
  { thai: "การบ้านหน้าแรก", roman: "gaan-baan naa raaek", chinese: "第一页作业", id: "gaan-baan-naa-raaek" },
  { thai: "จดหมายสั้นๆ", roman: "jot-maai san san", chinese: "短信/短信件", id: "jot-maai-san-san" },
  { thai: "รายการซื้อของ", roman: "raai-gaan seu khaawng", chinese: "购物清单", id: "raai-gaan-seu-khaawng" },
  { thai: "งานบ้านวันนี้", roman: "ngaan-baan wan-nii", chinese: "今天的家务", id: "ngaan-baan-wan-nii" },
  { thai: "แบบฝึกหัดง่ายๆ", roman: "baaep-feuk-hat ngaai ngaai", chinese: "简单练习", id: "baaep-feuk-hat-ngaai-ngaai" },
  { thai: "อาหารเย็น", roman: "aa-haan yen", chinese: "晚饭", id: "aa-haan-yen" },
  { thai: "รูปถ่ายชุดนี้", roman: "ruup-thaai chut nii", chinese: "这一组照片", id: "ruup-thaai-chut-nii" },
  { thai: "ข้อความตอบกลับ", roman: "khaaw-khwaam dtaawp glap", chinese: "回复消息", id: "khaaw-khwaam-dtaawp-glap" },
];

const directRows: readonly Definition[] = [
  { thai: "หยิบมาให้หน่อย", id: "yip-maa-hai-naawy", roman: "yip maa hai naawy", chinese: "请拿过来一下", partOfSpeech: "短语", theme: "拿来拿去", exampleThai: "แก้วอยู่บนโต๊ะ ช่วยหยิบมาให้หน่อย", exampleRoman: "gaaeo yuu bon dto, chuai yip maa hai naawy", exampleChinese: "杯子在桌上，请帮我拿过来一下。", tag: "拿来" },
  { thai: "เอาไปไว้ตรงนั้น", id: "ao-bpai-wai-dtrong-nan", roman: "ao bpai wai dtrong nan", chinese: "拿去放在那里", partOfSpeech: "短语", theme: "拿来拿去", exampleThai: "กล่องนี้หนัก เอาไปไว้ตรงนั้นได้ไหม", exampleRoman: "glaawng nii nak, ao bpai wai dtrong nan dai mai", exampleChinese: "这个盒子重，可以拿去放在那里吗？", tag: "拿去" },
  { thai: "วางไว้บนโต๊ะ", id: "waang-wai-bon-dto", roman: "waang wai bon dto", chinese: "放在桌上", partOfSpeech: "短语", theme: "放下拿起", exampleThai: "ถ้าไม่ใช้แล้ว วางไว้บนโต๊ะก็ได้", exampleRoman: "thaa mai chai laaeo, waang wai bon dto gaaw dai", exampleChinese: "如果不用了，放在桌上也可以。", tag: "放下" },
  { thai: "หยิบขึ้นมาดู", id: "yip-kheun-maa-duu", roman: "yip kheun maa duu", chinese: "拿起来看", partOfSpeech: "短语", theme: "放下拿起", exampleThai: "ฉันหยิบขึ้นมาดู แต่ไม่รู้ว่าเป็นของใคร", exampleRoman: "chan yip kheun maa duu, dtaae mai ruu waa bpen khaawng khrai", exampleChinese: "我拿起来看，但不知道是谁的东西。", tag: "拿起" },
  { thai: "เปิดออกแล้วปิดกลับ", id: "bpoet-aawk-laaeo-bpit-glap", roman: "bpoet aawk laaeo bpit glap", chinese: "打开后再关回去", partOfSpeech: "短语", theme: "打开关上", exampleThai: "ดูข้างในแล้ว เปิดออกแล้วปิดกลับให้ดี", exampleRoman: "duu khaang nai laaeo, bpoet aawk laaeo bpit glap hai dii", exampleChinese: "看完里面后，打开后再好好关回去。", tag: "开关" },
  { thai: "หาเจอแล้ว", id: "haa-jooe-laaeo", roman: "haa jooe laaeo", chinese: "已经找到了", partOfSpeech: "短语", theme: "找得到找不到", exampleThai: "ไม่ต้องช่วยหาแล้ว ฉันหาเจอแล้ว", exampleRoman: "mai dtawng chuai haa laaeo, chan haa jooe laaeo", exampleChinese: "不用帮忙找了，我已经找到了。", tag: "找到" },
  { thai: "หาไม่เจอสักที", id: "haa-mai-jooe-sak-thii", roman: "haa mai jooe sak thii", chinese: "一直找不到", partOfSpeech: "短语", theme: "找得到找不到", exampleThai: "ฉันหาไม่เจอสักที ทั้งที่เพิ่งวางไว้", exampleRoman: "chan haa mai jooe sak thii, thang thii phoeng waang wai", exampleChinese: "我一直找不到，明明刚放在这里。", tag: "找不到" },
  { thai: "ยังทำงานนี้ไม่เสร็จ", id: "yang-tham-ngaan-nii-mai-set", roman: "yang tham ngaan nii mai set", chinese: "这件事还没做完", partOfSpeech: "短语", theme: "做完未完", exampleThai: "ขอเวลาอีกนิด ฉันยังทำงานนี้ไม่เสร็จ", exampleRoman: "khaaw wee-laa iik nit, chan yang tham ngaan nii mai set", exampleChinese: "请再给一点时间，我这件事还没做完。", tag: "未完成" },
];

const takeHereRows = objects.map((item): Definition => ({
  thai: `หยิบ${item.thai}มาให้`,
  id: `yip-${item.id}-maa-hai`,
  roman: `yip ${item.roman} maa hai`,
  chinese: `把${item.chinese}拿过来给我`,
  partOfSpeech: "短语",
  theme: "拿来拿去",
  exampleThai: `ช่วยหยิบ${item.thai}มาให้ฉันหน่อย`,
  exampleRoman: `chuai yip ${item.roman} maa hai chan naawy`,
  exampleChinese: `请帮我把${item.chinese}拿过来。`,
  tag: "拿来",
}));

const takeAwayRows = objects.map((item): Definition => ({
  thai: `เอา${item.thai}ไปเก็บ`,
  id: `ao-${item.id}-bpai-gep`,
  roman: `ao ${item.roman} bpai gep`,
  chinese: `把${item.chinese}拿去收好`,
  partOfSpeech: "短语",
  theme: "拿来拿去",
  exampleThai: `หลังใช้แล้ว เอา${item.thai}ไปเก็บด้วย`,
  exampleRoman: `lang chai laaeo, ao ${item.roman} bpai gep duai`,
  exampleChinese: `用完后，也把${item.chinese}拿去收好。`,
  tag: "拿去",
}));

const bringRows = objects.map((item): Definition => ({
  thai: `เอา${item.thai}มาด้วย`,
  id: `ao-${item.id}-maa-duai`,
  roman: `ao ${item.roman} maa duai`,
  chinese: `把${item.chinese}也带来`,
  partOfSpeech: "短语",
  theme: "带来带走",
  exampleThai: `พรุ่งนี้อย่าลืมเอา${item.thai}มาด้วย`,
  exampleRoman: `phrung-nii yaa leum ao ${item.roman} maa duai`,
  exampleChinese: `明天别忘了把${item.chinese}也带来。`,
  tag: "带来",
}));

const carryAwayRows = objects.map((item): Definition => ({
  thai: `เอา${item.thai}กลับไป`,
  id: `ao-${item.id}-glap-bpai`,
  roman: `ao ${item.roman} glap bpai`,
  chinese: `把${item.chinese}带回去`,
  partOfSpeech: "短语",
  theme: "带来带走",
  exampleThai: `ก่อนกลับบ้าน อย่าลืมเอา${item.thai}กลับไป`,
  exampleRoman: `gaawn glap baan, yaa leum ao ${item.roman} glap bpai`,
  exampleChinese: `回家前，别忘了把${item.chinese}带回去。`,
  tag: "带走",
}));

const putDownRows = objects.map((item): Definition => ({
  thai: `วาง${item.thai}ลงก่อน`,
  id: `waang-${item.id}-long-gaawn`,
  roman: `waang ${item.roman} long gaawn`,
  chinese: `先把${item.chinese}放下`,
  partOfSpeech: "短语",
  theme: "放下拿起",
  exampleThai: `ถ้าหนักมาก วาง${item.thai}ลงก่อนก็ได้`,
  exampleRoman: `thaa nak maak, waang ${item.roman} long gaawn gaaw dai`,
  exampleChinese: `如果很重，可以先把${item.chinese}放下。`,
  tag: "放下",
}));

const findRows = objects.map((item): Definition => ({
  thai: `หา${item.thai}ไม่เจอ`,
  id: `haa-${item.id}-mai-jooe`,
  roman: `haa ${item.roman} mai jooe`,
  chinese: `找不到${item.chinese}`,
  partOfSpeech: "短语",
  theme: "找得到找不到",
  exampleThai: `ฉันหา${item.thai}ไม่เจอ คุณเห็นไหม`,
  exampleRoman: `chan haa ${item.roman} mai jooe, khun hen mai`,
  exampleChinese: `我找不到${item.chinese}，你看见了吗？`,
  tag: "找不到",
}));

const finishRows = tasks.map((task): Definition => ({
  thai: `ทำ${task.thai}เสร็จแล้ว`,
  id: `tham-${task.id}-set-laaeo`,
  roman: `tham ${task.roman} set laaeo`,
  chinese: `已经做完${task.chinese}`,
  partOfSpeech: "短语",
  theme: "做完未完",
  exampleThai: `ฉันทำ${task.thai}เสร็จแล้ว จึงพักได้`,
  exampleRoman: `chan tham ${task.roman} set laaeo, jeung phak dai`,
  exampleChinese: `我已经做完${task.chinese}，所以可以休息了。`,
  tag: "完成",
}));

const notFinishRows = tasks.map((task): Definition => ({
  thai: `ยังทำ${task.thai}ไม่เสร็จ`,
  id: `yang-tham-${task.id}-mai-set`,
  roman: `yang tham ${task.roman} mai set`,
  chinese: `还没做完${task.chinese}`,
  partOfSpeech: "短语",
  theme: "做完未完",
  exampleThai: `ตอนนี้ฉันยังทำ${task.thai}ไม่เสร็จ`,
  exampleRoman: `dtaawn nii chan yang tham ${task.roman} mai set`,
  exampleChinese: `现在我还没做完${task.chinese}。`,
  tag: "未完成",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...takeHereRows,
  ...takeAwayRows,
  ...bringRows,
  ...carryAwayRows,
  ...putDownRows,
  ...findRows,
  ...finishRows,
  ...notFinishRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "高频动词短语", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 高频动词短语常用“หยิบ、เอา、วาง、หา、ทำ...เสร็จ、ยัง...ไม่เสร็จ”搭配具体物品或事情。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于拿来拿去、带来带走、放下拿起、找得到找不到、做完和还没做完等日常动作。"],
    tags,
    sourceRefs: COMMON_VERBS_PHRASAL_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_COMMON_VERBS_PHRASAL_01 = rows.map(toCandidate);
