export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "决定" | "犹豫" | "取消" | "改主意" | "准备好" | "来得及" | "先做哪个" | "下一步";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Plan = { thai: string; roman: string; chinese: string; id: string };

const SIMPLE_PLANS_DECISIONS_REFS = ["thai-frequency", "thai-a2-simple-plans-decisions-candidate"];

const plans: readonly Plan[] = [
  { thai: "ไปตลาดเช้า", roman: "bpai dta-laat chaao", chinese: "早上去市场", id: "bpai-dta-laat-chaao" },
  { thai: "โทรจองโต๊ะ", roman: "thoo jaawng dto", chinese: "打电话订桌", id: "thoo-jaawng-dto" },
  { thai: "ซื้อของเข้าบ้าน", roman: "seu khaawng khao baan", chinese: "买东西回家", id: "seu-khaawng-khao-baan" },
  { thai: "ไปซักผ้า", roman: "bpai sak phaa", chinese: "去洗衣服", id: "bpai-sak-phaa" },
  { thai: "ส่งพัสดุตอนบ่าย", roman: "song phat-sa-du dtaawn baai", chinese: "下午寄包裹", id: "song-phat-sa-du-dtaawn-baai" },
  { thai: "ทำอาหารเย็น", roman: "tham aa-haan yen", chinese: "做晚饭", id: "tham-aa-haan-yen" },
  { thai: "ไปหาหมอ", roman: "bpai haa maaw", chinese: "去看医生", id: "bpai-haa-maaw" },
  { thai: "เรียนออนไลน์", roman: "riian aawn-lai", chinese: "线上学习", id: "riian-aawn-lai" },
  { thai: "ออกกำลังกาย", roman: "aawk gam-lang-gaai", chinese: "运动", id: "aawk-gam-lang-gaai" },
  { thai: "ทำความสะอาดห้อง", roman: "tham khwaam sa-aat haawng", chinese: "打扫房间", id: "tham-khwaam-sa-aat-haawng" },
  { thai: "เจอเพื่อนเก่า", roman: "jooe pheuuan gao", chinese: "见老朋友", id: "jooe-pheuuan-gao" },
  { thai: "ดูหนังรอบเย็น", roman: "duu nang raawp yen", chinese: "看傍晚场电影", id: "duu-nang-raawp-yen" },
  { thai: "อ่านหนังสือก่อนนอน", roman: "aan nang-seuu gaawn naawn", chinese: "睡前看书", id: "aan-nang-seuu-gaawn-naawn" },
  { thai: "เก็บเงินเดือนนี้", roman: "gep ngoen deuuan nii", chinese: "这个月存钱", id: "gep-ngoen-deuuan-nii" },
  { thai: "เปลี่ยนแผนเดินทาง", roman: "bpliian phaaen doeen-thaang", chinese: "更改出行计划", id: "bpliian-phaaen-doeen-thaang" },
  { thai: "เตรียมของสำหรับพรุ่งนี้", roman: "dtriiam khaawng sam-rap phrung-nii", chinese: "准备明天的东西", id: "dtriiam-khaawng-sam-rap-phrung-nii" },
];

const directRows: readonly Definition[] = [
  { thai: "ตัดสินใจแล้วว่าจะไป", id: "dtat-sin-jai-laaeo-waa-ja-bpai", roman: "dtat-sin-jai laaeo waa ja bpai", chinese: "已经决定要去", partOfSpeech: "短语", theme: "决定", exampleThai: "คุยกันนานแล้ว เราตัดสินใจแล้วว่าจะไป", exampleRoman: "khui gan naan laaeo, rao dtat-sin-jai laaeo waa ja bpai", exampleChinese: "聊了很久后，我们已经决定要去。", tag: "决定" },
  { thai: "ยังลังเลอยู่นิดหน่อย", id: "yang-lang-lee-yuu-nit-naawy", roman: "yang lang-lee yuu nit naawy", chinese: "还有点犹豫", partOfSpeech: "短语", theme: "犹豫", exampleThai: "ฉันชอบทั้งสองแบบ ยังลังเลอยู่นิดหน่อย", exampleRoman: "chan chaawp thang saawng baaep, yang lang-lee yuu nit naawy", exampleChinese: "两种我都喜欢，还有点犹豫。", tag: "犹豫" },
  { thai: "ยกเลิกแผนเดิมก่อน", id: "yok-loek-phaaen-doem-gaawn", roman: "yok-loek phaaen doem gaawn", chinese: "先取消原来的计划", partOfSpeech: "短语", theme: "取消", exampleThai: "ถ้าฝนตกหนัก เราคงต้องยกเลิกแผนเดิมก่อน", exampleRoman: "thaa fon dtok nak, rao khong dtawng yok-loek phaaen doem gaawn", exampleChinese: "如果雨下得很大，我们大概要先取消原来的计划。", tag: "取消" },
  { thai: "เปลี่ยนใจตอนสุดท้าย", id: "bpliian-jai-dtaawn-sut-thaai", roman: "bpliian jai dtaawn sut-thaai", chinese: "最后改主意", partOfSpeech: "短语", theme: "改主意", exampleThai: "ฉันเกือบซื้อแล้ว แต่เปลี่ยนใจตอนสุดท้าย", exampleRoman: "chan geuap seu laaeo, dtaae bpliian jai dtaawn sut-thaai", exampleChinese: "我差点买了，但最后改主意了。", tag: "改主意" },
  { thai: "พร้อมออกจากบ้านแล้ว", id: "phraawm-aawk-jaak-baan-laaeo", roman: "phraawm aawk jaak baan laaeo", chinese: "已经准备好出门了", partOfSpeech: "短语", theme: "准备好", exampleThai: "เก็บของครบแล้ว ฉันพร้อมออกจากบ้านแล้ว", exampleRoman: "gep khaawng khrop laaeo, chan phraawm aawk jaak baan laaeo", exampleChinese: "东西收齐了，我已经准备好出门了。", tag: "准备好" },
  { thai: "ยังพอทันเวลา", id: "yang-phaaw-than-wee-laa", roman: "yang phaaw than wee-laa", chinese: "还来得及", partOfSpeech: "短语", theme: "来得及", exampleThai: "ถ้าออกตอนนี้ ยังพอทันเวลา", exampleRoman: "thaa aawk dtaawn nii, yang phaaw than wee-laa", exampleChinese: "如果现在出发，还来得及。", tag: "来得及" },
  { thai: "เริ่มจากงานง่ายก่อน", id: "roem-jaak-ngaan-ngaai-gaawn", roman: "roem jaak ngaan ngaai gaawn", chinese: "先从简单的任务开始", partOfSpeech: "短语", theme: "先做哪个", exampleThai: "งานเยอะมาก เราเริ่มจากงานง่ายก่อนดีไหม", exampleRoman: "ngaan yoe maak, rao roem jaak ngaan ngaai gaawn dii mai", exampleChinese: "事情很多，我们先从简单的任务开始好吗？", tag: "优先" },
  { thai: "ขั้นต่อไปทำอะไร", id: "khan-dtaaw-bpai-tham-a-rai", roman: "khan dtaaw bpai tham a-rai", chinese: "下一步做什么", partOfSpeech: "短语", theme: "下一步", exampleThai: "เราทำข้อแรกเสร็จแล้ว ขั้นต่อไปทำอะไร", exampleRoman: "rao tham khaaw raaek set laaeo, khan dtaaw bpai tham a-rai", exampleChinese: "我们做完第一项了，下一步做什么？", tag: "下一步" },
];

const decideRows = plans.map((plan): Definition => ({
  thai: `ตัดสินใจจะ${plan.thai}`,
  id: `dtat-sin-jai-ja-${plan.id}`,
  roman: `dtat-sin-jai ja ${plan.roman}`,
  chinese: `决定要${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "决定",
  exampleThai: `หลังคุยกัน เราตัดสินใจจะ${plan.thai}`,
  exampleRoman: `lang khui gan, rao dtat-sin-jai ja ${plan.roman}`,
  exampleChinese: `聊过之后，我们决定要${plan.chinese}。`,
  tag: "决定",
}));

const hesitateRows = plans.map((plan): Definition => ({
  thai: `ลังเลว่าจะ${plan.thai}ไหม`,
  id: `lang-lee-waa-ja-${plan.id}-mai`,
  roman: `lang-lee waa ja ${plan.roman} mai`,
  chinese: `犹豫要不要${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "犹豫",
  exampleThai: `ฉันยังลังเลว่าจะ${plan.thai}ไหม`,
  exampleRoman: `chan yang lang-lee waa ja ${plan.roman} mai`,
  exampleChinese: `我还在犹豫要不要${plan.chinese}。`,
  tag: "犹豫",
}));

const cancelRows = plans.map((plan): Definition => ({
  thai: `ขอยกเลิกแผน${plan.thai}`,
  id: `khaaw-yok-loek-phaaen-${plan.id}`,
  roman: `khaaw yok-loek phaaen ${plan.roman}`,
  chinese: `想取消${plan.chinese}的计划`,
  partOfSpeech: "短语",
  theme: "取消",
  exampleThai: `วันนี้ไม่สะดวก ขอยกเลิกแผน${plan.thai}`,
  exampleRoman: `wan-nii mai sa-duuak, khaaw yok-loek phaaen ${plan.roman}`,
  exampleChinese: `今天不方便，想取消${plan.chinese}的计划。`,
  tag: "取消",
}));

const readyRows = plans.map((plan): Definition => ({
  thai: `พร้อมจะ${plan.thai}แล้ว`,
  id: `phraawm-ja-${plan.id}-laaeo`,
  roman: `phraawm ja ${plan.roman} laaeo`,
  chinese: `已经准备好${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "准备好",
  exampleThai: `ของครบแล้ว ฉันพร้อมจะ${plan.thai}แล้ว`,
  exampleRoman: `khaawng khrop laaeo, chan phraawm ja ${plan.roman} laaeo`,
  exampleChinese: `东西齐了，我已经准备好${plan.chinese}。`,
  tag: "准备好",
}));

const timeRows = plans.map((plan): Definition => ({
  thai: `ยังทันที่จะ${plan.thai}`,
  id: `yang-than-thii-ja-${plan.id}`,
  roman: `yang than thii ja ${plan.roman}`,
  chinese: `还来得及${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "来得及",
  exampleThai: `ถ้ารีบออกตอนนี้ ยังทันที่จะ${plan.thai}`,
  exampleRoman: `thaa riip aawk dtaawn nii, yang than thii ja ${plan.roman}`,
  exampleChinese: `如果现在赶紧出发，还来得及${plan.chinese}。`,
  tag: "来得及",
}));

const firstRows = plans.map((plan): Definition => ({
  thai: `ทำ${plan.thai}ก่อนดีไหม`,
  id: `tham-${plan.id}-gaawn-dii-mai`,
  roman: `tham ${plan.roman} gaawn dii mai`,
  chinese: `先${plan.chinese}好吗`,
  partOfSpeech: "短语",
  theme: "先做哪个",
  exampleThai: `วันนี้มีหลายอย่าง ทำ${plan.thai}ก่อนดีไหม`,
  exampleRoman: `wan-nii mii laai yaang, tham ${plan.roman} gaawn dii mai`,
  exampleChinese: `今天有好几件事，先${plan.chinese}好吗？`,
  tag: "优先",
}));

const nextRows = plans.map((plan): Definition => ({
  thai: `ขั้นต่อไปคือ${plan.thai}`,
  id: `khan-dtaaw-bpai-kheuu-${plan.id}`,
  roman: `khan dtaaw bpai kheuu ${plan.roman}`,
  chinese: `下一步是${plan.chinese}`,
  partOfSpeech: "短语",
  theme: "下一步",
  exampleThai: `ทำข้อแรกเสร็จแล้ว ขั้นต่อไปคือ${plan.thai}`,
  exampleRoman: `tham khaaw raaek set laaeo, khan dtaaw bpai kheuu ${plan.roman}`,
  exampleChinese: `做完第一项后，下一步是${plan.chinese}。`,
  tag: "下一步",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...decideRows,
  ...hesitateRows,
  ...cancelRows,
  ...readyRows,
  ...timeRows,
  ...firstRows,
  ...nextRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "计划决定", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 计划决定常用“ตัดสินใจจะ、ลังเลว่าจะ...ไหม、ขอยกเลิกแผน、พร้อมจะ...แล้ว、ยังทันที่จะ、ทำ...ก่อนดีไหม、ขั้นต่อไปคือ...”等句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于决定、犹豫、取消、改主意、准备好、来得及、先做哪个和下一步。"],
    tags,
    sourceRefs: SIMPLE_PLANS_DECISIONS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_PLANS_DECISIONS_01 = rows.map(toCandidate);
