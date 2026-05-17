export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "原因" | "结果" | "问题" | "方法" | "机会" | "经验" | "关系" | "情况" | "意思" | "感觉" | "选择";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type AbstractItem = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const BASIC_ABSTRACT_WORDS_REFS = ["thai-frequency", "thai-a2-basic-abstract-words-candidate"];

const abstracts: readonly AbstractItem[] = [
  { thai: "เหตุผลของเรื่องนี้", roman: "heet-phon khaawng rueang nii", chinese: "这件事的原因", id: "heet-phon-khaawng-rueang-nii", theme: "原因" },
  { thai: "เหตุผลที่มาช้า", roman: "heet-phon thii maa chaa", chinese: "来晚的原因", id: "heet-phon-thii-maa-chaa", theme: "原因" },
  { thai: "สาเหตุที่ไฟดับ", roman: "saa-heet thii fai dap", chinese: "停电的原因", id: "saa-heet-thii-fai-dap", theme: "原因" },
  { thai: "ผลของการนอนน้อย", roman: "phon khaawng gaan naawn naawy", chinese: "睡得少的结果", id: "phon-khaawng-gaan-naawn-naawy", theme: "结果" },
  { thai: "ผลสอบครั้งนี้", roman: "phon saawp khrang nii", chinese: "这次考试结果", id: "phon-saawp-khrang-nii", theme: "结果" },
  { thai: "ผลลัพธ์หลังลองทำ", roman: "phon-lap lang laawng tham", chinese: "试做后的结果", id: "phon-lap-lang-laawng-tham", theme: "结果" },
  { thai: "ปัญหาเล็ก ๆ ในบ้าน", roman: "bpan-haa lek lek nai baan", chinese: "家里的小问题", id: "bpan-haa-lek-lek-nai-baan", theme: "问题" },
  { thai: "ปัญหาเรื่องเวลา", roman: "bpan-haa rueang wee-laa", chinese: "时间问题", id: "bpan-haa-rueang-wee-laa", theme: "问题" },
  { thai: "คำถามสำคัญ", roman: "kham-thaam sam-khan", chinese: "重要问题/提问", id: "kham-thaam-sam-khan", theme: "问题" },
  { thai: "วิธีทำง่าย ๆ", roman: "wi-thii tham ngaai ngaai", chinese: "简单做法", id: "wi-thii-tham-ngaai-ngaai", theme: "方法" },
  { thai: "วิธีไปโรงแรม", roman: "wi-thii bpai roong-raaem", chinese: "去酒店的方法", id: "wi-thii-bpai-roong-raaem", theme: "方法" },
  { thai: "ทางเลือกที่ง่ายกว่า", roman: "thaang leuuak thii ngaai gwaa", chinese: "更简单的选择", id: "thaang-leuuak-thii-ngaai-gwaa", theme: "选择" },
  { thai: "โอกาสเจอเพื่อน", roman: "oo-gaat jooe phuean", chinese: "见朋友的机会", id: "oo-gaat-jooe-phuean", theme: "机会" },
  { thai: "โอกาสฝึกพูด", roman: "oo-gaat feuk phuut", chinese: "练习说话的机会", id: "oo-gaat-feuk-phuut", theme: "机会" },
  { thai: "โอกาสทำงานใหม่", roman: "oo-gaat tham-ngaan mai", chinese: "做新工作的机会", id: "oo-gaat-tham-ngaan-mai", theme: "机会" },
  { thai: "ประสบการณ์ครั้งแรก", roman: "bpra-sop-gaan khrang raaek", chinese: "第一次经验", id: "bpra-sop-gaan-khrang-raaek", theme: "经验" },
  { thai: "ประสบการณ์ที่ดี", roman: "bpra-sop-gaan thii dii", chinese: "好的经验", id: "bpra-sop-gaan-thii-dii", theme: "经验" },
  { thai: "ความเคยชินใหม่", roman: "khwaam khooei-chin mai", chinese: "新习惯/新熟悉感", id: "khwaam-khooei-chin-mai", theme: "经验" },
  { thai: "ความสัมพันธ์กับเพื่อนบ้าน", roman: "khwaam-sam-phan gap phuean-baan", chinese: "和邻居的关系", id: "khwaam-sam-phan-gap-phuean-baan", theme: "关系" },
  { thai: "ความสัมพันธ์ในครอบครัว", roman: "khwaam-sam-phan nai khraawp-khrua", chinese: "家庭关系", id: "khwaam-sam-phan-nai-khraawp-khrua", theme: "关系" },
  { thai: "ความเกี่ยวข้องกับงาน", roman: "khwaam giao-khaawng gap ngaan", chinese: "和工作的关系/关联", id: "khwaam-giao-khaawng-gap-ngaan", theme: "关系" },
  { thai: "สถานการณ์ตอนนี้", roman: "sa-thaa-na-gaan dtaawn-nii", chinese: "现在的情况", id: "sa-thaa-na-gaan-dtaawn-nii", theme: "情况" },
  { thai: "สภาพห้องพัก", roman: "sa-phaap haawng-phak", chinese: "房间状况", id: "sa-phaap-haawng-phak", theme: "情况" },
  { thai: "อาการของแม่", roman: "aa-gaan khaawng maae", chinese: "妈妈的症状/情况", id: "aa-gaan-khaawng-maae", theme: "情况" },
  { thai: "ความหมายของคำนี้", roman: "khwaam-maai khaawng kham nii", chinese: "这个词的意思", id: "khwaam-maai-khaawng-kham-nii", theme: "意思" },
  { thai: "ความหมายในประโยค", roman: "khwaam-maai nai bpra-yook", chinese: "句子里的意思", id: "khwaam-maai-nai-bpra-yook", theme: "意思" },
  { thai: "เจตนาที่ดี", roman: "jee-dta-naa thii dii", chinese: "好的用意", id: "jee-dta-naa-thii-dii", theme: "意思" },
  { thai: "ความรู้สึกตอนนี้", roman: "khwaam-ruu-seuk dtaawn-nii", chinese: "现在的感觉", id: "khwaam-ruu-seuk-dtaawn-nii", theme: "感觉" },
  { thai: "ความรู้สึกหลังฟัง", roman: "khwaam-ruu-seuk lang fang", chinese: "听完后的感觉", id: "khwaam-ruu-seuk-lang-fang", theme: "感觉" },
  { thai: "อารมณ์ตอนเช้า", roman: "aa-rom dtaawn chaao", chinese: "早上的心情", id: "aa-rom-dtaawn-chaao", theme: "感觉" },
  { thai: "ตัวเลือกที่สอง", roman: "dtua leuuak thii saawng", chinese: "第二个选择", id: "dtua-leuuak-thii-saawng", theme: "选择" },
  { thai: "การเลือกที่เหมาะกว่า", roman: "gaan leuuak thii maw gwaa", chinese: "更合适的选择", id: "gaan-leuuak-thii-maw-gwaa", theme: "选择" },
];

const directRows: readonly Definition[] = [
  { thai: "มีเหตุผลของตัวเอง", id: "mii-heet-phon-khaawng-dtua-eeng", roman: "mii heet-phon khaawng dtua-eeng", chinese: "有自己的原因", partOfSpeech: "短语", theme: "原因", exampleThai: "เขาไม่ไปงานเลี้ยง เพราะมีเหตุผลของตัวเอง", exampleRoman: "khao mai bpai ngaan-liiang, phraw mii heet-phon khaawng dtua-eeng", exampleChinese: "他不去聚会，因为有自己的原因。", tag: "原因" },
  { thai: "ผลออกมาดีกว่าที่คิด", id: "phon-aawk-maa-dii-gwaa-thii-khit", roman: "phon aawk maa dii gwaa thii khit", chinese: "结果比想象中好", partOfSpeech: "短语", theme: "结果", exampleThai: "ฉันกังวลมาก แต่ผลออกมาดีกว่าที่คิด", exampleRoman: "chan gang-won maak, dtaae phon aawk maa dii gwaa thii khit", exampleChinese: "我很担心，但结果比想象中好。", tag: "结果" },
  { thai: "ไม่มีปัญหาใหญ่", id: "mai-mii-bpan-haa-yai", roman: "mai mii bpan-haa yai", chinese: "没有大问题", partOfSpeech: "短语", theme: "问题", exampleThai: "ห้องนี้มีเสียงนิดหน่อย แต่ไม่มีปัญหาใหญ่", exampleRoman: "haawng nii mii siiang nit naawy, dtaae mai mii bpan-haa yai", exampleChinese: "这个房间有一点声音，但没有大问题。", tag: "问题" },
  { thai: "มีวิธีอื่นไหม", id: "mii-wi-thii-euen-mai", roman: "mii wi-thii euen mai", chinese: "有别的方法吗", partOfSpeech: "短语", theme: "方法", exampleThai: "ถ้าวิธีนี้ยาก มีวิธีอื่นไหม", exampleRoman: "thaa wi-thii nii yaak, mii wi-thii euen mai", exampleChinese: "如果这个方法难，有别的方法吗？", tag: "方法" },
  { thai: "เป็นโอกาสที่ดี", id: "bpen-oo-gaat-thii-dii", roman: "bpen oo-gaat thii dii", chinese: "是好机会", partOfSpeech: "短语", theme: "机会", exampleThai: "การได้ฝึกพูดกับคนไทยเป็นโอกาสที่ดี", exampleRoman: "gaan dai feuk phuut gap khon thai bpen oo-gaat thii dii", exampleChinese: "能和泰国人练习说话是好机会。", tag: "机会" },
  { thai: "ยังไม่มีประสบการณ์มาก", id: "yang-mai-mii-bpra-sop-gaan-maak", roman: "yang mai mii bpra-sop-gaan maak", chinese: "还没有很多经验", partOfSpeech: "短语", theme: "经验", exampleThai: "ฉันยังไม่มีประสบการณ์มาก จึงต้องถามเพื่อน", exampleRoman: "chan yang mai mii bpra-sop-gaan maak, jeung dtawng thaam phuean", exampleChinese: "我还没有很多经验，所以要问朋友。", tag: "经验" },
  { thai: "ความสัมพันธ์ดีขึ้น", id: "khwaam-sam-phan-dii-kheun", roman: "khwaam-sam-phan dii kheun", chinese: "关系变好了", partOfSpeech: "短语", theme: "关系", exampleThai: "หลังคุยกัน ความสัมพันธ์ดีขึ้นมาก", exampleRoman: "lang khui gan, khwaam-sam-phan dii kheun maak", exampleChinese: "聊过以后，关系好了很多。", tag: "关系" },
  { thai: "สถานการณ์เริ่มดีขึ้น", id: "sa-thaa-na-gaan-roem-dii-kheun", roman: "sa-thaa-na-gaan roem dii kheun", chinese: "情况开始好转", partOfSpeech: "短语", theme: "情况", exampleThai: "ฝนหยุดแล้ว สถานการณ์เริ่มดีขึ้น", exampleRoman: "fon yut laaeo, sa-thaa-na-gaan roem dii kheun", exampleChinese: "雨停了，情况开始好转。", tag: "情况" },
  { thai: "คำนี้มีสองความหมาย", id: "kham-nii-mii-saawng-khwaam-maai", roman: "kham nii mii saawng khwaam-maai", chinese: "这个词有两个意思", partOfSpeech: "短语", theme: "意思", exampleThai: "ครูบอกว่าคำนี้มีสองความหมาย", exampleRoman: "khruu baawk waa kham nii mii saawng khwaam-maai", exampleChinese: "老师说这个词有两个意思。", tag: "意思" },
  { thai: "ความรู้สึกคล้ายกัน", id: "khwaam-ruu-seuk-khlaai-gan", roman: "khwaam-ruu-seuk khlaai gan", chinese: "感觉相似", partOfSpeech: "短语", theme: "感觉", exampleThai: "ฉันกับเพื่อนมีความรู้สึกคล้ายกัน", exampleRoman: "chan gap phuean mii khwaam-ruu-seuk khlaai gan", exampleChinese: "我和朋友感觉相似。", tag: "感觉" },
  { thai: "มีทางเลือกไม่มาก", id: "mii-thaang-leuuak-mai-maak", roman: "mii thaang leuuak mai maak", chinese: "选择不多", partOfSpeech: "短语", theme: "选择", exampleThai: "ตอนดึกมีทางเลือกไม่มาก เราจึงกินร้านใกล้บ้าน", exampleRoman: "dtaawn deuk mii thaang leuuak mai maak, rao jeung gin raan glai baan", exampleChinese: "深夜选择不多，所以我们在家附近的店吃。", tag: "选择" },
];

const askRows = abstracts.map((item): Definition => ({
  thai: `ถามเรื่อง${item.thai}`,
  id: `thaam-rueang-${item.id}`,
  roman: `thaam rueang ${item.roman}`,
  chinese: `询问${item.chinese}`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `ถ้าไม่เข้าใจ ฉันจะถามเรื่อง${item.thai}กับครู`,
  exampleRoman: `thaa mai khao-jai, chan ja thaam rueang ${item.roman} gap khruu`,
  exampleChinese: `如果不懂，我会向老师询问${item.chinese}。`,
  tag: "询问",
}));

const explainRows = abstracts.map((item): Definition => ({
  thai: `อธิบาย${item.thai}ง่าย ๆ`,
  id: `a-thi-baai-${item.id}-ngaai-ngaai`,
  roman: `a-thi-baai ${item.roman} ngaai ngaai`,
  chinese: `简单说明${item.chinese}`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `ช่วยอธิบาย${item.thai}ง่าย ๆ ให้ฉันฟังหน่อย`,
  exampleRoman: `chuai a-thi-baai ${item.roman} ngaai ngaai hai chan fang naawy`,
  exampleChinese: `请简单说明${item.chinese}给我听。`,
  tag: "说明",
}));

const understandRows = abstracts.map((item): Definition => ({
  thai: `ยังไม่เข้าใจ${item.thai}`,
  id: `yang-mai-khao-jai-${item.id}`,
  roman: `yang mai khao-jai ${item.roman}`,
  chinese: `还不明白${item.chinese}`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `ฉันยังไม่เข้าใจ${item.thai} ขอถามอีกครั้ง`,
  exampleRoman: `chan yang mai khao-jai ${item.roman}, khaaw thaam iik khrang`,
  exampleChinese: `我还不明白${item.chinese}，想再问一次。`,
  tag: "理解",
}));

const importantRows = abstracts.slice(0, 24).map((item): Definition => ({
  thai: `${item.thai}สำคัญสำหรับฉัน`,
  id: `${item.id}-sam-khan-sam-rap-chan`,
  roman: `${item.roman} sam-khan sam-rap chan`,
  chinese: `${item.chinese}对我很重要`,
  partOfSpeech: "短语",
  theme: item.theme,
  exampleThai: `${item.thai}สำคัญสำหรับฉัน เพราะฉันต้องตัดสินใจ`,
  exampleRoman: `${item.roman} sam-khan sam-rap chan, phraw chan dtawng dtat-sin-jai`,
  exampleChinese: `${item.chinese}对我很重要，因为我需要做决定。`,
  tag: "重要",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...askRows,
  ...explainRows,
  ...understandRows,
  ...importantRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "基础抽象词", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 抽象词适合放在“询问、说明、理解、重要”这些简单句框里练习。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于原因、结果、问题、方法、机会、经验、关系、情况、意思、感觉和选择等基础抽象表达。"],
    tags,
    sourceRefs: BASIC_ABSTRACT_WORDS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_ABSTRACT_WORDS_01 = rows.map(toCandidate);
