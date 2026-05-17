export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "高频词块" | "跟进复盘" | "原因结果" | "计划调整" | "礼貌表达" | "易混补漏";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type ReviewChunk = { thai: string; id: string; roman: string; chinese: string; theme: VocabularyExpansionTheme; tag: string };
type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };

const BRIDGE_TO_B1_REVIEW_REFS = ["thai-frequency", "thai-a2-bridge-to-b1-review-candidate"];

const chunks: readonly ReviewChunk[] = [
  { thai: "เรื่องที่ต้องตามต่อ", id: "reuuang-thii-dtawng-dtaam-dtaaw", roman: "reuuang thii dtawng dtaam dtaaw", chinese: "需要继续跟进的事", theme: "跟进复盘", tag: "跟进" },
  { thai: "ข้อมูลที่ยังไม่ครบ", id: "khaaw-muun-thii-yang-mai-khrop", roman: "khaaw-muun thii yang mai khrop", chinese: "还不完整的信息", theme: "高频词块", tag: "信息" },
  { thai: "เวลาที่ตกลงกัน", id: "wee-laa-thii-dtok-long-gan", roman: "wee-laa thii dtok-long gan", chinese: "约好的时间", theme: "计划调整", tag: "时间" },
  { thai: "คนที่รับผิดชอบ", id: "khon-thii-rap-phit-chaawp", roman: "khon thii rap-phit-chaawp", chinese: "负责的人", theme: "高频词块", tag: "人员" },
  { thai: "วิธีที่ง่ายกว่า", id: "wi-thii-thii-ngaai-gwaa", roman: "wi-thii thii ngaai gwaa", chinese: "更简单的方法", theme: "易混补漏", tag: "方法" },
  { thai: "ปัญหาที่เจอบ่อย", id: "bpan-haa-thii-jooe-baawy", roman: "bpan-haa thii jooe baawy", chinese: "常遇到的问题", theme: "跟进复盘", tag: "问题" },
  { thai: "ของที่ต้องเตรียม", id: "khaawng-thii-dtawng-dtriiam", roman: "khaawng thii dtawng dtriiam", chinese: "需要准备的东西", theme: "计划调整", tag: "准备" },
  { thai: "คำพูดที่สุภาพ", id: "kham-phuut-thii-su-phaap", roman: "kham phuut thii su-phaap", chinese: "礼貌的说法", theme: "礼貌表达", tag: "礼貌" },
  { thai: "สิ่งที่เปลี่ยนไป", id: "sing-thii-bpliian-bpai", roman: "sing thii bpliian bpai", chinese: "发生变化的事物", theme: "计划调整", tag: "变化" },
  { thai: "แผนสำรองง่ายๆ", id: "phaaen-sam-raawng-ngaai-ngaai", roman: "phaaen sam-raawng ngaai ngaai", chinese: "简单备用计划", theme: "计划调整", tag: "计划" },
  { thai: "ผลที่เกิดขึ้น", id: "phon-thii-goeet-kheun", roman: "phon thii goeet kheun", chinese: "发生的结果", theme: "原因结果", tag: "结果" },
  { thai: "เหตุผลที่พอเข้าใจ", id: "heet-phon-thii-phaaw-khao-jai", roman: "heet-phon thii phaaw khao-jai", chinese: "还算能理解的理由", theme: "原因结果", tag: "理由" },
  { thai: "จุดที่ต้องแก้", id: "jut-thii-dtawng-gaae", roman: "jut thii dtawng gaae", chinese: "需要修改的地方", theme: "易混补漏", tag: "修改" },
  { thai: "ข้อความที่ควรตอบ", id: "khaaw-khwaam-thii-khuuan-dtaawp", roman: "khaaw-khwaam thii khuuan dtaawp", chinese: "应该回复的消息", theme: "礼貌表达", tag: "消息" },
  { thai: "ทางที่ปลอดภัยกว่า", id: "thaang-thii-bplaawt-phai-gwaa", roman: "thaang thii bplaawt-phai gwaa", chinese: "更安全的方式/路线", theme: "易混补漏", tag: "安全" },
  { thai: "เรื่องที่ควรถามเพิ่ม", id: "reuuang-thii-khuuan-thaam-phoem", roman: "reuuang thii khuuan thaam phoem", chinese: "应该再问的问题", theme: "高频词块", tag: "追问" },
];

const directRows: readonly Definition[] = [
  { thai: "สรุปเรื่องที่ต้องตามต่อ", id: "sa-rup-reuuang-thii-dtawng-dtaam-dtaaw", roman: "sa-rup reuuang thii dtawng dtaam dtaaw", chinese: "总结需要继续跟进的事", partOfSpeech: "短语", theme: "跟进复盘", exampleThai: "ก่อนจบวัน เราสรุปเรื่องที่ต้องตามต่อ", exampleRoman: "gaawn jop wan, rao sa-rup reuuang thii dtawng dtaam dtaaw", exampleChinese: "一天结束前，我们总结需要继续跟进的事。", tag: "复盘" },
  { thai: "เช็กข้อมูลที่ยังไม่ครบ", id: "chek-khaaw-muun-thii-yang-mai-khrop", roman: "chek khaaw-muun thii yang mai khrop", chinese: "检查还不完整的信息", partOfSpeech: "短语", theme: "高频词块", exampleThai: "ก่อนส่งข้อความ ควรเช็กข้อมูลที่ยังไม่ครบ", exampleRoman: "gaawn song khaaw-khwaam, khuuan chek khaaw-muun thii yang mai khrop", exampleChinese: "发送消息前，应该检查还不完整的信息。", tag: "信息" },
  { thai: "เปลี่ยนเวลาที่ตกลงกัน", id: "bpliian-wee-laa-thii-dtok-long-gan", roman: "bpliian wee-laa thii dtok-long gan", chinese: "更改约好的时间", partOfSpeech: "短语", theme: "计划调整", exampleThai: "ถ้าฝนตกหนัก เราอาจเปลี่ยนเวลาที่ตกลงกัน", exampleRoman: "thaa fon dtok nak, rao aat bpliian wee-laa thii dtok-long gan", exampleChinese: "如果雨下得很大，我们可能更改约好的时间。", tag: "时间" },
  { thai: "พูดด้วยคำที่สุภาพกว่า", id: "phuut-duuai-kham-thii-su-phaap-gwaa", roman: "phuut duuai kham thii su-phaap gwaa", chinese: "用更礼貌的话说", partOfSpeech: "短语", theme: "礼貌表达", exampleThai: "เวลาขอความช่วยเหลือ ควรพูดด้วยคำที่สุภาพกว่า", exampleRoman: "wee-laa khaaw khwaam chuai-leuuea, khuuan phuut duuai kham thii su-phaap gwaa", exampleChinese: "请求帮助时，应该用更礼貌的话说。", tag: "礼貌" },
  { thai: "ดูผลที่เกิดขึ้นก่อน", id: "duu-phon-thii-goeet-kheun-gaawn", roman: "duu phon thii goeet kheun gaawn", chinese: "先看看发生的结果", partOfSpeech: "短语", theme: "原因结果", exampleThai: "อย่าเพิ่งตัดสินใจ ดูผลที่เกิดขึ้นก่อน", exampleRoman: "yaa phoeng dtat-sin-jai, duu phon thii goeet kheun gaawn", exampleChinese: "先别急着决定，先看看发生的结果。", tag: "结果" },
  { thai: "หาวิธีที่ง่ายกว่า", id: "haa-wi-thii-thii-ngaai-gwaa", roman: "haa wi-thii thii ngaai gwaa", chinese: "找更简单的方法", partOfSpeech: "短语", theme: "易混补漏", exampleThai: "ถ้าวิธีนี้ยาก เราหาวิธีที่ง่ายกว่าได้", exampleRoman: "thaa wi-thii nii yaak, rao haa wi-thii thii ngaai gwaa dai", exampleChinese: "如果这个方法难，我们可以找更简单的方法。", tag: "方法" },
  { thai: "เตรียมแผนสำรองง่ายๆ", id: "dtriiam-phaaen-sam-raawng-ngaai-ngaai", roman: "dtriiam phaaen sam-raawng ngaai ngaai", chinese: "准备简单备用计划", partOfSpeech: "短语", theme: "计划调整", exampleThai: "ถ้าไปไม่ทัน ควรเตรียมแผนสำรองง่ายๆ", exampleRoman: "thaa bpai mai than, khuuan dtriiam phaaen sam-raawng ngaai ngaai", exampleChinese: "如果来不及去，应该准备简单备用计划。", tag: "计划" },
  { thai: "ถามเพิ่มอย่างสุภาพ", id: "thaam-phoem-yaang-su-phaap", roman: "thaam phoem yaang su-phaap", chinese: "礼貌地再问", partOfSpeech: "短语", theme: "礼貌表达", exampleThai: "ถ้ายังไม่เข้าใจ ให้ถามเพิ่มอย่างสุภาพ", exampleRoman: "thaa yang mai khao-jai, hai thaam phoem yaang su-phaap", exampleChinese: "如果还不明白，就礼貌地再问。", tag: "追问" },
];

const learnRows = chunks.map((chunk): Definition => ({
  thai: `จำกลุ่มคำว่า${chunk.thai}`,
  id: `jam-glum-kham-waa-${chunk.id}`,
  roman: `jam glum kham waa ${chunk.roman}`,
  chinese: `记住“${chunk.chinese}”这个词块`,
  partOfSpeech: "短语",
  theme: chunk.theme,
  exampleThai: `ช่วงทบทวน เราควรจำกลุ่มคำว่า${chunk.thai}`,
  exampleRoman: `chuuang thop-thuan, rao khuuan jam glum kham waa ${chunk.roman}`,
  exampleChinese: `复习时，我们应该记住“${chunk.chinese}”这个词块。`,
  tag: chunk.tag,
}));

const useRows = chunks.map((chunk): Definition => ({
  thai: `ใช้${chunk.thai}เล่าเรื่องง่ายๆ`,
  id: `chai-${chunk.id}-lao-reuuang-ngaai-ngaai`,
  roman: `chai ${chunk.roman} lao reuuang ngaai ngaai`,
  chinese: `用“${chunk.chinese}”讲简单事情`,
  partOfSpeech: "短语",
  theme: chunk.theme,
  exampleThai: `ผู้เรียนใช้${chunk.thai}เล่าเรื่องง่ายๆ ได้`,
  exampleRoman: `phuu-riian chai ${chunk.roman} lao reuuang ngaai ngaai dai`,
  exampleChinese: `学习者可以用“${chunk.chinese}”讲简单事情。`,
  tag: chunk.tag,
}));

const checkRows = chunks.map((chunk): Definition => ({
  thai: `เช็กความเข้าใจเรื่อง${chunk.thai}`,
  id: `chek-khwaam-khao-jai-reuuang-${chunk.id}`,
  roman: `chek khwaam khao-jai reuuang ${chunk.roman}`,
  chinese: `检查对“${chunk.chinese}”的理解`,
  partOfSpeech: "短语",
  theme: chunk.theme,
  exampleThai: `หลังเรียน ครูเช็กความเข้าใจเรื่อง${chunk.thai}`,
  exampleRoman: `lang riian, khruu chek khwaam khao-jai reuuang ${chunk.roman}`,
  exampleChinese: `课后，老师检查对“${chunk.chinese}”的理解。`,
  tag: chunk.tag,
}));

const followRows = chunks.map((chunk): Definition => ({
  thai: `ตามต่อจาก${chunk.thai}`,
  id: `dtaam-dtaaw-jaak-${chunk.id}`,
  roman: `dtaam dtaaw jaak ${chunk.roman}`,
  chinese: `从“${chunk.chinese}”继续跟进`,
  partOfSpeech: "短语",
  theme: "跟进复盘",
  exampleThai: `พรุ่งนี้เราจะตามต่อจาก${chunk.thai}`,
  exampleRoman: `phrung-nii rao ja dtaam dtaaw jaak ${chunk.roman}`,
  exampleChinese: `明天我们会从“${chunk.chinese}”继续跟进。`,
  tag: chunk.tag,
}));

const reasonRows = chunks.map((chunk): Definition => ({
  thai: `บอกเหตุผลเกี่ยวกับ${chunk.thai}`,
  id: `baawk-heet-phon-giaao-gap-${chunk.id}`,
  roman: `baawk heet-phon giaao gap ${chunk.roman}`,
  chinese: `说明关于“${chunk.chinese}”的理由`,
  partOfSpeech: "短语",
  theme: "原因结果",
  exampleThai: `ถ้าต้องเปลี่ยนแผน ควรบอกเหตุผลเกี่ยวกับ${chunk.thai}`,
  exampleRoman: `thaa dtawng bpliian phaaen, khuuan baawk heet-phon giaao gap ${chunk.roman}`,
  exampleChinese: `如果需要改变计划，应该说明关于“${chunk.chinese}”的理由。`,
  tag: chunk.tag,
}));

const politeRows = chunks.map((chunk): Definition => ({
  thai: `ถามเรื่อง${chunk.thai}อย่างสุภาพ`,
  id: `thaam-reuuang-${chunk.id}-yaang-su-phaap`,
  roman: `thaam reuuang ${chunk.roman} yaang su-phaap`,
  chinese: `礼貌地询问“${chunk.chinese}”`,
  partOfSpeech: "短语",
  theme: "礼貌表达",
  exampleThai: `ถ้าไม่แน่ใจ ให้ถามเรื่อง${chunk.thai}อย่างสุภาพ`,
  exampleRoman: `thaa mai naae-jai, hai thaam reuuang ${chunk.roman} yaang su-phaap`,
  exampleChinese: `如果不确定，就礼貌地询问“${chunk.chinese}”。`,
  tag: chunk.tag,
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...learnRows,
  ...useRows,
  ...checkRows,
  ...followRows,
  ...reasonRows,
  ...politeRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const comparisons: VocabularyExpansionComparison[] = [{ kind: "用法", target: { thai: "ยังไม่ครบ", roman: "yang mai khrop", chinese: "还不完整" }, distinctionZh: "A2/B1 边界表达常用于把事情说完整，例如信息、原因、结果、后续安排；语法不难，但组合更长。" }];
  const tags = ["a2", "低阶过渡最终复盘", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons, collocations, usageNotesZh: ["本批是 A2 到 B1 的低阶过渡复盘，只补日常高频词块，不做专业高阶词。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons,
    collocations,
    usageNotesZh: ["用于复盘、跟进、说明原因结果、调整计划和礼貌追问。"],
    tags,
    sourceRefs: BRIDGE_TO_B1_REVIEW_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BRIDGE_TO_B1_REVIEW_01 = rows.map(toCandidate);
