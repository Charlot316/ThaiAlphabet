export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "任务" | "进度" | "复习" | "问题" | "资料" | "开会" | "练习" | "截止" | "检查提交";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Work = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const DAILY_WORK_STUDY_REVIEW_REFS = ["thai-frequency", "thai-a2-daily-work-study-review-02-candidate"];

const works: readonly Work[] = [
  { thai: "งานเขียนสั้นๆ", roman: "ngaan khiian san san", chinese: "短写作任务", id: "ngaan-khiian-san-san", theme: "任务" },
  { thai: "แบบฝึกหัดบทนี้", roman: "baaep-feuk-hat bot nii", chinese: "这一课练习", id: "baaep-feuk-hat-bot-nii", theme: "练习" },
  { thai: "คำศัพท์ชุดใหม่", roman: "kham-sap chut mai", chinese: "新一组单词", id: "kham-sap-chut-mai", theme: "复习" },
  { thai: "รายงานเล็กๆ", roman: "raai-ngaan lek lek", chinese: "小报告", id: "raai-ngaan-lek-lek", theme: "任务" },
  { thai: "สไลด์นำเสนอ", roman: "sa-lai nam-sa-nooe", chinese: "演示幻灯片", id: "sa-lai-nam-sa-nooe", theme: "资料" },
  { thai: "ไฟล์เสียงฝึกฟัง", roman: "fai siiang feuk fang", chinese: "听力练习音频", id: "fai-siiang-feuk-fang", theme: "练习" },
  { thai: "เอกสารประชุม", roman: "eek-ga-saan bpra-chum", chinese: "会议资料", id: "eek-ga-saan-bpra-chum", theme: "资料" },
  { thai: "บันทึกการเรียน", roman: "ban-theuk gaan riian", chinese: "学习笔记", id: "ban-theuk-gaan-riian", theme: "复习" },
  { thai: "คำถามที่ยังไม่เข้าใจ", roman: "kham-thaam thii yang mai khao-jai", chinese: "还不懂的问题", id: "kham-thaam-thii-yang-mai-khao-jai", theme: "问题" },
  { thai: "ตารางงานวันนี้", roman: "dtaa-raang ngaan wan-nii", chinese: "今天的工作安排", id: "dtaa-raang-ngaan-wan-nii", theme: "进度" },
  { thai: "งานที่ต้องส่ง", roman: "ngaan thii dtawng song", chinese: "要提交的任务", id: "ngaan-thii-dtawng-song", theme: "检查提交" },
  { thai: "การบ้านหน้าใหม่", roman: "gaan-baan naa mai", chinese: "新一页作业", id: "gaan-baan-naa-mai", theme: "任务" },
  { thai: "หัวข้อประชุม", roman: "hua-khaaw bpra-chum", chinese: "会议主题", id: "hua-khaaw-bpra-chum", theme: "开会" },
  { thai: "งานก่อนหมดวัน", roman: "ngaan gaawn mot wan", chinese: "当天结束前的任务", id: "ngaan-gaawn-mot-wan", theme: "截止" },
  { thai: "บทเรียนเก่า", roman: "bot-riian gao", chinese: "旧课文/旧课程", id: "bot-riian-gao", theme: "复习" },
  { thai: "ข้อมูลจากครู", roman: "khaaw-muun jaak khruu", chinese: "老师给的信息", id: "khaaw-muun-jaak-khruu", theme: "资料" },
];

const directRows: readonly Definition[] = [
  { thai: "วันนี้ทำอะไรเสร็จบ้าง", id: "wan-nii-tham-a-rai-set-baang", roman: "wan-nii tham a-rai set baang", chinese: "今天完成了哪些事", partOfSpeech: "短语", theme: "任务", exampleThai: "ก่อนกลับบ้าน เราถามกันว่าวันนี้ทำอะไรเสร็จบ้าง", exampleRoman: "gaawn glap baan, rao thaam gan waa wan-nii tham a-rai set baang", exampleChinese: "回家前，我们互相问今天完成了哪些事。", tag: "复盘" },
  { thai: "ความคืบหน้ายังช้า", id: "khwaam-kheup-naa-yang-chaa", roman: "khwaam kheup-naa yang chaa", chinese: "进度还慢", partOfSpeech: "短语", theme: "进度", exampleThai: "งานนี้ความคืบหน้ายังช้า ต้องแบ่งงานใหม่", exampleRoman: "ngaan nii khwaam kheup-naa yang chaa, dtawng baeng ngaan mai", exampleChinese: "这项工作进度还慢，需要重新分工。", tag: "进度" },
  { thai: "กลับไปทบทวนอีกครั้ง", id: "glap-bpai-thop-thuan-iik-khrang", roman: "glap bpai thop-thuan iik khrang", chinese: "回去再复习一次", partOfSpeech: "短语", theme: "复习", exampleThai: "ถ้ายังไม่เข้าใจ กลับไปทบทวนอีกครั้งนะ", exampleRoman: "thaa yang mai khao-jai, glap bpai thop-thuan iik khrang na", exampleChinese: "如果还不明白，回去再复习一次。", tag: "复习" },
  { thai: "ปัญหาหลักคือเวลาไม่พอ", id: "bpan-haa-lak-kheuu-wee-laa-mai-phaaw", roman: "bpan-haa lak kheuu wee-laa mai phaaw", chinese: "主要问题是时间不够", partOfSpeech: "短语", theme: "问题", exampleThai: "วันนี้ปัญหาหลักคือเวลาไม่พอ", exampleRoman: "wan-nii bpan-haa lak kheuu wee-laa mai phaaw", exampleChinese: "今天主要问题是时间不够。", tag: "问题" },
  { thai: "หาเอกสารไม่เจอ", id: "haa-eek-ga-saan-mai-jooe", roman: "haa eek-ga-saan mai jooe", chinese: "找不到资料/文件", partOfSpeech: "短语", theme: "资料", exampleThai: "ก่อนประชุม ฉันหาเอกสารไม่เจอ", exampleRoman: "gaawn bpra-chum, chan haa eek-ga-saan mai jooe", exampleChinese: "开会前，我找不到资料。", tag: "资料" },
  { thai: "ประชุมสั้นๆ ตอนเช้า", id: "bpra-chum-san-san-dtaawn-chaao", roman: "bpra-chum san san dtaawn chaao", chinese: "早上开个短会", partOfSpeech: "短语", theme: "开会", exampleThai: "พรุ่งนี้เราประชุมสั้นๆ ตอนเช้าก่อนเริ่มงาน", exampleRoman: "phrung-nii rao bpra-chum san san dtaawn chaao gaawn roem ngaan", exampleChinese: "明天我们早上开始工作前开个短会。", tag: "开会" },
  { thai: "ฝึกซ้ำจนคล่อง", id: "feuk-sam-jon-khlaawng", roman: "feuk sam jon khlaawng", chinese: "反复练到熟练", partOfSpeech: "短语", theme: "练习", exampleThai: "ถ้าอยากพูดได้ดี ต้องฝึกซ้ำจนคล่อง", exampleRoman: "thaa yaak phuut dai dii, dtawng feuk sam jon khlaawng", exampleChinese: "如果想说得好，要反复练到熟练。", tag: "练习" },
  { thai: "ส่งก่อนหมดเวลา", id: "song-gaawn-mot-wee-laa", roman: "song gaawn mot wee-laa", chinese: "在时间结束前提交", partOfSpeech: "短语", theme: "截止", exampleThai: "งานนี้ต้องส่งก่อนหมดเวลา", exampleRoman: "ngaan nii dtawng song gaawn mot wee-laa", exampleChinese: "这项任务必须在时间结束前提交。", tag: "截止" },
];

const taskRows = works.map((work): Definition => ({
  thai: `ทำ${work.thai}ให้เสร็จ`,
  id: `tham-${work.id}-hai-set`,
  roman: `tham ${work.roman} hai set`,
  chinese: `完成${work.chinese}`,
  partOfSpeech: "短语",
  theme: work.theme,
  exampleThai: `วันนี้ฉันต้องทำ${work.thai}ให้เสร็จ`,
  exampleRoman: `wan-nii chan dtawng tham ${work.roman} hai set`,
  exampleChinese: `今天我必须完成${work.chinese}。`,
  tag: "任务",
}));

const progressRows = works.map((work): Definition => ({
  thai: `ความคืบหน้าของ${work.thai}`,
  id: `khwaam-kheup-naa-khaawng-${work.id}`,
  roman: `khwaam kheup-naa khaawng ${work.roman}`,
  chinese: `${work.chinese}的进度`,
  partOfSpeech: "短语",
  theme: "进度",
  exampleThai: `หัวหน้าถามความคืบหน้าของ${work.thai}`,
  exampleRoman: `hua-naa thaam khwaam kheup-naa khaawng ${work.roman}`,
  exampleChinese: `主管询问${work.chinese}的进度。`,
  tag: "进度",
}));

const reviewRows = works.map((work): Definition => ({
  thai: `ทบทวน${work.thai}ก่อนนอน`,
  id: `thop-thuan-${work.id}-gaawn-naawn`,
  roman: `thop-thuan ${work.roman} gaawn naawn`,
  chinese: `睡前复习${work.chinese}`,
  partOfSpeech: "短语",
  theme: "复习",
  exampleThai: `ถ้ามีเวลา ฉันทบทวน${work.thai}ก่อนนอน`,
  exampleRoman: `thaa mii wee-laa, chan thop-thuan ${work.roman} gaawn naawn`,
  exampleChinese: `如果有时间，我睡前复习${work.chinese}。`,
  tag: "复习",
}));

const issueRows = works.map((work): Definition => ({
  thai: `มีปัญหาเรื่อง${work.thai}`,
  id: `mii-bpan-haa-reuuang-${work.id}`,
  roman: `mii bpan-haa reuuang ${work.roman}`,
  chinese: `${work.chinese}有问题`,
  partOfSpeech: "短语",
  theme: "问题",
  exampleThai: `ถ้ามีปัญหาเรื่อง${work.thai} ให้ถามครูได้`,
  exampleRoman: `thaa mii bpan-haa reuuang ${work.roman}, hai thaam khruu dai`,
  exampleChinese: `如果${work.chinese}有问题，可以问老师。`,
  tag: "问题",
}));

const meetingRows = works.map((work): Definition => ({
  thai: `คุยเรื่อง${work.thai}ในประชุม`,
  id: `khui-reuuang-${work.id}-nai-bpra-chum`,
  roman: `khui reuuang ${work.roman} nai bpra-chum`,
  chinese: `在会议里讨论${work.chinese}`,
  partOfSpeech: "短语",
  theme: "开会",
  exampleThai: `พรุ่งนี้เราจะคุยเรื่อง${work.thai}ในประชุม`,
  exampleRoman: `phrung-nii rao ja khui reuuang ${work.roman} nai bpra-chum`,
  exampleChinese: `明天我们会在会议里讨论${work.chinese}。`,
  tag: "开会",
}));

const deadlineRows = works.map((work): Definition => ({
  thai: `${work.thai}ต้องเสร็จก่อนวันศุกร์`,
  id: `${work.id}-dtawng-set-gaawn-wan-suk`,
  roman: `${work.roman} dtawng set gaawn wan suk`,
  chinese: `${work.chinese}必须周五前完成`,
  partOfSpeech: "短语",
  theme: "截止",
  exampleThai: `ครูบอกว่า${work.thai}ต้องเสร็จก่อนวันศุกร์`,
  exampleRoman: `khruu baawk waa ${work.roman} dtawng set gaawn wan suk`,
  exampleChinese: `老师说${work.chinese}必须周五前完成。`,
  tag: "截止",
}));

const submitRows = works.map((work): Definition => ({
  thai: `ตรวจ${work.thai}ก่อนส่ง`,
  id: `dtruaat-${work.id}-gaawn-song`,
  roman: `dtruaat ${work.roman} gaawn song`,
  chinese: `提交前检查${work.chinese}`,
  partOfSpeech: "短语",
  theme: "检查提交",
  exampleThai: `อย่าลืมตรวจ${work.thai}ก่อนส่ง`,
  exampleRoman: `yaa leum dtruaat ${work.roman} gaawn song`,
  exampleChinese: `别忘了提交前检查${work.chinese}。`,
  tag: "检查提交",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...taskRows,
  ...progressRows,
  ...reviewRows,
  ...issueRows,
  ...meetingRows,
  ...deadlineRows,
  ...submitRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "工作学习复盘", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 工作学习复盘常用“ทำ...ให้เสร็จ、ความคืบหน้า、ทบทวน、มีปัญหาเรื่อง、คุยในประชุม、ต้องเสร็จก่อน、ตรวจก่อนส่ง”等句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于任务、进度、复习、问题、资料、开会、练习、截止、检查和提交。"],
    tags,
    sourceRefs: DAILY_WORK_STUDY_REVIEW_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_WORK_STUDY_REVIEW_02 = rows.map(toCandidate);
