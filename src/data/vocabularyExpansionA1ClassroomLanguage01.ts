export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语" | "句型";
export type VocabularyExpansionLevel = "a1";
export type VocabularyExpansionTheme = "课堂指令" | "听说读写" | "老师学生" | "作业练习" | "提问" | "懂不懂" | "再说一遍" | "学习互动";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";
export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };

type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme];

const CLASSROOM_REFS = ["worker-a-a1-classroom-language", "basic-thai-classroom"];

const rows: Row[] = [
  ["khao-haawng", "เข้าห้อง", "khao haawng", "进教室；进房间", "动词", "课堂指令"],
  ["aawk-jaak-haawng", "ออกจากห้อง", "aawk jaak haawng", "离开教室；出房间", "动词", "课堂指令"],
  ["nang-long", "นั่งลง", "nang long", "坐下", "动词", "课堂指令"],
  ["yuen-kheun", "ยืนขึ้น", "yuen kheun", "站起来", "动词", "课堂指令"],
  ["bpoet-nang-sue", "เปิดหนังสือ", "bpoet nang-sue", "打开书", "动词", "课堂指令"],
  ["bpit-nang-sue", "ปิดหนังสือ", "bpit nang-sue", "合上书", "动词", "课堂指令"],
  ["bpoet-naa", "เปิดหน้า", "bpoet naa", "翻到第……页；打开页面", "动词", "课堂指令"],
  ["duu-naa", "ดูหน้า", "duu naa", "看第……页", "动词", "课堂指令"],
  ["duu-gra-daan", "ดูกระดาน", "duu gra-daan", "看黑板/白板", "动词", "课堂指令"],
  ["khiian-bon-gra-daan", "เขียนบนกระดาน", "khiian bon gra-daan", "写在板上", "动词", "课堂指令"],
  ["jot-long-sa-mut", "จดลงสมุด", "jot long sa-mut", "记到本子上", "动词", "课堂指令"],
  ["tham-dtaam", "ทำตาม", "tham dtaam", "照着做", "动词", "课堂指令"],
  ["tham-phraawm-gan", "ทำพร้อมกัน", "tham phraawm gan", "一起做", "动词", "课堂指令"],
  ["tham-khon-diao", "ทำคนเดียว", "tham khon diao", "自己一个人做", "动词", "课堂指令"],
  ["tham-pen-khuu", "ทำเป็นคู่", "tham bpen khuu", "两人一组做", "动词", "课堂指令"],
  ["tham-pen-klum", "ทำเป็นกลุ่ม", "tham bpen glum", "分组做", "动词", "课堂指令"],
  ["fang", "ฟัง", "fang", "听", "动词", "听说读写"],
  ["fang-khruu", "ฟังครู", "fang khruu", "听老师说", "动词", "听说读写"],
  ["fang-laaeo-dtaawp", "ฟังแล้วตอบ", "fang laaeo dtaawp", "听后回答", "动词", "听说读写"],
  ["phuut", "พูด", "phuut", "说；讲话", "动词", "听说读写"],
  ["phuut-thai", "พูดไทย", "phuut thai", "说泰语", "动词", "听说读写"],
  ["phuut-dtaam", "พูดตาม", "phuut dtaam", "跟着说", "动词", "听说读写"],
  ["phuut-chaa-chaa", "พูดช้า ๆ", "phuut chaa chaa", "慢慢说", "动词", "听说读写"],
  ["phuut-dang-dang", "พูดดัง ๆ", "phuut dang dang", "大声说", "动词", "听说读写"],
  ["phuut-bao-bao", "พูดเบา ๆ", "phuut bao bao", "小声说", "动词", "听说读写"],
  ["aan", "อ่าน", "aan", "读；阅读", "动词", "听说读写"],
  ["aan-aawk-siang", "อ่านออกเสียง", "aan aawk siiang", "朗读；读出声", "动词", "听说读写"],
  ["aan-nai-jai", "อ่านในใจ", "aan nai jai", "默读", "动词", "听说读写"],
  ["aan-dtaam", "อ่านตาม", "aan dtaam", "跟读", "动词", "听说读写"],
  ["khiian", "เขียน", "khiian", "写", "动词", "听说读写"],
  ["khiian-kham", "เขียนคำ", "khiian kham", "写词", "动词", "听说读写"],
  ["khiian-bpra-yook", "เขียนประโยค", "khiian bpra-yook", "写句子", "动词", "听说读写"],
  ["khruu", "ครู", "khruu", "老师", "名词", "老师学生"],
  ["nak-riian", "นักเรียน", "nak riian", "学生", "名词", "老师学生"],
  ["phuean-ruam-haawng", "เพื่อนร่วมห้อง", "phuean ruam haawng", "同班同学", "名词", "老师学生"],
  ["hua-naa-haawng", "หัวหน้าห้อง", "hua naa haawng", "班长", "名词", "老师学生"],
  ["haawng-riian", "ห้องเรียน", "haawng riian", "教室", "名词", "老师学生"],
  ["gra-daan", "กระดาน", "gra-daan", "黑板；白板", "名词", "老师学生"],
  ["bpaaak-gaa-gra-daan", "ปากกากระดาน", "bpaak-gaa gra-daan", "白板笔", "名词", "老师学生"],
  ["sa-mut", "สมุด", "sa-mut", "本子", "名词", "老师学生"],
  ["nang-sue-riian", "หนังสือเรียน", "nang-sue riian", "课本", "名词", "老师学生"],
  ["bai-ngaan", "ใบงาน", "bai ngaan", "练习单；作业纸", "名词", "作业练习"],
  ["gaan-baan", "การบ้าน", "gaan baan", "作业", "名词", "作业练习"],
  ["baaep-feuk-hat", "แบบฝึกหัด", "baaep feuk hat", "练习题", "名词", "作业练习"],
  ["kham-thaam", "คำถาม", "kham thaam", "问题；题目", "名词", "提问"],
  ["kham-dtaawp", "คำตอบ", "kham dtaawp", "答案", "名词", "提问"],
  ["dtaawp-kham-thaam", "ตอบคำถาม", "dtaawp kham thaam", "回答问题", "动词", "提问"],
  ["thaam-khruu", "ถามครู", "thaam khruu", "问老师", "动词", "提问"],
  ["yak-thaam", "อยากถาม", "yaak thaam", "想问", "短语", "提问"],
  ["mii-kham-thaam", "มีคำถาม", "mii kham thaam", "有问题想问", "短语", "提问"],
  ["khaaw-thaam", "ขอถาม", "khaaw thaam", "请问；想问", "短语", "提问"],
  ["khao-jai", "เข้าใจ", "khao jai", "明白；理解", "动词", "懂不懂"],
  ["mai-khao-jai", "ไม่เข้าใจ", "mai khao jai", "不明白", "短语", "懂不懂"],
  ["khao-jai-mai", "เข้าใจไหม", "khao jai mai", "明白吗", "句型", "懂不懂"],
  ["khao-jai-laaeo", "เข้าใจแล้ว", "khao jai laaeo", "明白了", "短语", "懂不懂"],
  ["yang-mai-khao-jai", "ยังไม่เข้าใจ", "yang mai khao jai", "还不明白", "短语", "懂不懂"],
  ["mai-ruu-rueang", "ไม่รู้เรื่อง", "mai ruu rueang", "听不懂；搞不懂", "短语", "懂不懂"],
  ["fang-mai-than", "ฟังไม่ทัน", "fang mai than", "听不上；跟不上", "短语", "懂不懂"],
  ["aan-mai-aawk", "อ่านไม่ออก", "aan mai aawk", "读不出来；不会读", "短语", "懂不懂"],
  ["khiian-mai-dai", "เขียนไม่ได้", "khiian mai dai", "不会写；写不了", "短语", "懂不懂"],
  ["phuut-mai-dai", "พูดไม่ได้", "phuut mai dai", "不会说；说不了", "短语", "懂不懂"],
  ["iik-khrang", "อีกครั้ง", "iik khrang", "再一次", "副词", "再说一遍"],
  ["iik-thii", "อีกที", "iik thii", "再一遍", "副词", "再说一遍"],
  ["phuut-iik-khrang", "พูดอีกครั้ง", "phuut iik khrang", "再说一次", "动词", "再说一遍"],
  ["aan-iik-khrang", "อ่านอีกครั้ง", "aan iik khrang", "再读一次", "动词", "再说一遍"],
  ["khiian-iik-khrang", "เขียนอีกครั้ง", "khiian iik khrang", "再写一次", "动词", "再说一遍"],
  ["a-thi-baai-iik-thii", "อธิบายอีกที", "a-thi-baai iik thii", "再解释一遍", "动词", "再说一遍"],
  ["khaaw-iik-khrang", "ขออีกครั้ง", "khaaw iik khrang", "请再一次", "短语", "再说一遍"],
  ["cha-cha-dai-mai", "ช้า ๆ ได้ไหม", "chaa chaa dai mai", "可以慢一点吗", "句型", "再说一遍"],
  ["phuut-mai", "พูดใหม่", "phuut mai", "重新说", "动词", "再说一遍"],
  ["laawng-mai", "ลองใหม่", "laawng mai", "再试一次", "动词", "再说一遍"],
  ["song-gaan-baan", "ส่งการบ้าน", "song gaan baan", "交作业", "动词", "作业练习"],
  ["tham-gaan-baan", "ทำการบ้าน", "tham gaan baan", "做作业", "动词", "作业练习"],
  ["truat-gaan-baan", "ตรวจการบ้าน", "dtruat gaan baan", "检查作业", "动词", "作业练习"],
  ["gae-gaan-baan", "แก้การบ้าน", "gaae gaan baan", "改作业；订正作业", "动词", "作业练习"],
  ["tham-baaep-feuk-hat", "ทำแบบฝึกหัด", "tham baaep feuk hat", "做练习题", "动词", "作业练习"],
  ["feuk-phuut", "ฝึกพูด", "feuk phuut", "练习说", "动词", "作业练习"],
  ["feuk-fang", "ฝึกฟัง", "feuk fang", "练习听", "动词", "作业练习"],
  ["feuk-aan", "ฝึกอ่าน", "feuk aan", "练习读", "动词", "作业练习"],
  ["feuk-khiian", "ฝึกเขียน", "feuk khiian", "练习写", "动词", "作业练习"],
  ["tham-khruang-maai", "ทำเครื่องหมาย", "tham khreuuang maai", "做标记；打勾标出", "动词", "作业练习"],
  ["kaan-baan-naa", "การบ้านหน้า", "gaan baan naa", "第……页作业", "短语", "作业练习"],
  ["dtaaw-khai", "ต่อไป", "dtaaw bpai", "接下来；下一个", "副词", "学习互动"],
  ["roem-rian", "เริ่มเรียน", "roem riian", "开始上课", "动词", "学习互动"],
  ["loek-rian", "เลิกเรียน", "loek riian", "下课；放学", "动词", "学习互动"],
  ["phak-sip-naa-thii", "พักสิบนาที", "phak sip naa thii", "休息十分钟", "短语", "学习互动"],
  ["dtaaw-thaaeo", "ต่อแถว", "dtaaw thaaeo", "排队", "动词", "学习互动"],
  ["yok-mue", "ยกมือ", "yok mue", "举手", "动词", "学习互动"],
  ["dtang-jai", "ตั้งใจ", "dtang jai", "认真；用心", "动词", "学习互动"],
  ["sa-ngop", "สงบ", "sa-ngop", "安静；平静", "形容词", "学习互动"],
  ["ngiap-ngiap", "เงียบ ๆ", "ngiiap ngiiap", "安静地", "副词", "学习互动"],
  ["dii-maak", "ดีมาก", "dii maak", "很好", "短语", "学习互动"],
  ["thuuk", "ถูก", "thuuk", "正确；对", "形容词", "学习互动"],
  ["phit", "ผิด", "phit", "错误；错", "形容词", "学习互动"],
  ["kae-kham-phit", "แก้คำผิด", "gaae kham phit", "改错字；纠正错词", "动词", "学习互动"],
  ["tham-dii-laaeo", "ทำดีแล้ว", "tham dii laaeo", "做得好了", "短语", "学习互动"],
];

const relatedByTheme: Record<VocabularyExpansionTheme, VocabularyExpansionRelated> = {
  课堂指令: { thai: "ทำตาม", roman: "tham dtaam", chinese: "照着做" },
  听说读写: { thai: "ฝึก", roman: "feuk", chinese: "练习" },
  老师学生: { thai: "ห้องเรียน", roman: "haawng riian", chinese: "教室" },
  作业练习: { thai: "การบ้าน", roman: "gaan baan", chinese: "作业" },
  提问: { thai: "คำถาม", roman: "kham thaam", chinese: "问题" },
  懂不懂: { thai: "เข้าใจ", roman: "khao jai", chinese: "明白" },
  再说一遍: { thai: "อีกครั้ง", roman: "iik khrang", chinese: "再一次" },
  学习互动: { thai: "ครู", roman: "khruu", chinese: "老师" },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในห้องเรียน ครูใช้คำว่า “${row[1]}” เพื่อให้นักเรียนฝึกภาษาไทยทีละขั้น`,
  roman: `nai haawng-riian khruu chai kham waa "${row[2]}" phuea hai nak-riian feuk phaa-saa thai thii la khan`,
  chinese: `在课堂上，老师使用“${row[1]}”这个表达，让学生一步一步练习泰语。`,
});

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];
  const comparison: VocabularyExpansionComparison = { kind: "usage", target: related, distinctionZh: `${row[1]} 属于“${row[5]}”课堂场景；和 ${related.thai} 对照记，可以区分指令、提问、作业和学习互动。` };
  const collocations = [{ thai: row[1], roman: row[2], chinese: row[3] }, related];
  return {
    id: row[0], thai: row[1], roman: row[2], chinese: row[3], partOfSpeech: row[4], theme: row[5], level: "a1", priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [exampleFor(row)], synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5]] }],
    synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5], "A1基础", "课堂"], sourceRefs: CLASSROOM_REFS, reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_CLASSROOM_LANGUAGE_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
