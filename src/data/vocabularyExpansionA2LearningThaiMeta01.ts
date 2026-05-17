export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type LearningThaiMetaTheme =
  | "发音"
  | "声调"
  | "拼写"
  | "语法"
  | "意思"
  | "例句"
  | "复习"
  | "记住忘记"
  | "练习"
  | "学习工具";

export interface VocabularyExpansionExample {
  thai: string;
  roman: string;
  chinese: string;
}

export interface VocabularyExpansionSense {
  chinese: string;
  usageNotesZh: string;
  examples: VocabularyExpansionExample[];
}

export interface VocabularyExpansionCandidate {
  id: string;
  headword: string;
  romanization: string;
  level: VocabularyExpansionLevel;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  tags: string[];
  senses: VocabularyExpansionSense[];
  synonyms?: string[];
  antonyms?: string[];
  comparisons?: string[];
  collocations?: string[];
  sources: string[];
}

type Row = [
  id: string,
  thai: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionPartOfSpeech,
  theme: LearningThaiMetaTheme,
];

const LEARNING_THAI_META_REFS = [
  "worker-a-a2-learning-thai-meta",
  "basic-thai-learning-language",
];

const rows: Row[] = [
  ["ok-siang", "ออกเสียง", "awk siiang", "发音", "动词", "发音"],
  ["siang", "เสียง", "siiang", "声音；语音", "名词", "发音"],
  ["siang-sung", "เสียงสูง", "siiang suung", "高音；音高高", "名词", "发音"],
  ["siang-tam", "เสียงต่ำ", "siiang dtam", "低音；音高低", "名词", "发音"],
  ["phuut-hai-chat", "พูดให้ชัด", "phuut hai chat", "说清楚", "短语", "发音"],
  ["phuut-chaa-chaa", "พูดช้า ๆ", "phuut chaa chaa", "慢慢说", "短语", "发音"],
  ["fang-laew-phuut-dtaam", "ฟังแล้วพูดตาม", "fang laew phuut dtaam", "听后跟读", "句型", "发音"],
  ["tham-siang-dtaam", "ทำเสียงตาม", "tham siiang dtaam", "模仿声音", "动词", "发音"],
  ["siang-mai-chat", "เสียงไม่ชัด", "siiang mai chat", "声音/发音不清楚", "句型", "发音"],
  ["ok-siang-phit", "ออกเสียงผิด", "awk siiang phit", "发音错", "动词", "发音"],
  ["wanna-yuk", "วรรณยุกต์", "wan-na-yuk", "声调符号；声调", "名词", "声调"],
  ["siang-wanna-yuk", "เสียงวรรณยุกต์", "siiang wan-na-yuk", "声调", "名词", "声调"],
  ["mai-ek", "ไม้เอก", "mai eek", "一声调符号", "名词", "声调"],
  ["mai-thoo", "ไม้โท", "mai thoo", "二声调符号", "名词", "声调"],
  ["mai-trii", "ไม้ตรี", "mai dtrii", "三声调符号", "名词", "声调"],
  ["mai-jat-ta-waa", "ไม้จัตวา", "mai jat-dta-waa", "四声调符号", "名词", "声调"],
  ["phuut-phit-siang", "พูดผิดเสียง", "phuut phit siiang", "声调/音说错", "动词", "声调"],
  ["fang-siang", "ฟังเสียง", "fang siiang", "听音；听声调", "动词", "声调"],
  ["fuek-wanna-yuk", "ฝึกวรรณยุกต์", "fuek wan-na-yuk", "练习声调", "动词", "声调"],
  ["siang-dtaang-gan", "เสียงต่างกัน", "siiang dtaang gan", "声音/声调不同", "句型", "声调"],
  ["sakot", "สะกด", "sa-got", "拼写", "动词", "拼写"],
  ["sakot-kham", "สะกดคำ", "sa-got kham", "拼写单词", "动词", "拼写"],
  ["tua-akson", "ตัวอักษร", "dtua ak-saawn", "字母；文字", "名词", "拼写"],
  ["phayanchana", "พยัญชนะ", "pha-yan-cha-na", "辅音字母", "名词", "拼写"],
  ["sara", "สระ", "sa-ra", "元音", "名词", "拼写"],
  ["kham", "คำ", "kham", "词；单词", "名词", "拼写"],
  ["kham-sap", "คำศัพท์", "kham sap", "词汇；单词", "名词", "拼写"],
  ["khian-phit", "เขียนผิด", "khian phit", "写错", "动词", "拼写"],
  ["khian-thuuk", "เขียนถูก", "khian thuuk", "写对", "动词", "拼写"],
  ["waang-sara", "วางสระ", "waang sa-ra", "放置元音符号", "动词", "拼写"],
  ["waiyakon", "ไวยากรณ์", "wai-yaa-gaawn", "语法", "名词", "语法"],
  ["bpra-yook", "ประโยค", "bpra-yook", "句子", "名词", "语法"],
  ["kham-thaam", "คำถาม", "kham thaam", "问题；疑问句", "名词", "语法"],
  ["kham-dtaawp", "คำตอบ", "kham dtaawp", "答案；回答句", "名词", "语法"],
  ["kham-griyaa", "คำกริยา", "kham gri-yaa", "动词", "名词", "语法"],
  ["kham-naam", "คำนาม", "kham naam", "名词", "名词", "语法"],
  ["kham-khun-na-sap", "คำคุณศัพท์", "kham khun-na-sap", "形容词", "名词", "语法"],
  ["riiang-kham", "เรียงคำ", "riiang kham", "排列词序", "动词", "语法"],
  ["tham-bpra-yook", "ทำประโยค", "tham bpra-yook", "造句", "动词", "语法"],
  ["bpra-yook-nii-thuuk-mai", "ประโยคนี้ถูกไหม", "bpra-yook nii thuuk mai", "这个句子对吗", "句型", "语法"],
  ["khwaam-maai", "ความหมาย", "khwaam maai", "意思；含义", "名词", "意思"],
  ["maai-khwaam-waa", "หมายความว่า", "maai khwaam waa", "意思是……", "句型", "意思"],
  ["bplae-waa", "แปลว่า", "bplae waa", "翻译为；意思是", "句型", "意思"],
  ["kham-nii-bplae-waa-arai", "คำนี้แปลว่าอะไร", "kham nii bplae waa a-rai", "这个词是什么意思", "句型", "意思"],
  ["maai-thueng", "หมายถึง", "maai thueng", "指的是；意思是", "动词", "意思"],
  ["khwaam-maai-muean-gan", "ความหมายเหมือนกัน", "khwaam maai muean gan", "意思相同", "句型", "意思"],
  ["khwaam-maai-dtaang-gan", "ความหมายต่างกัน", "khwaam maai dtaang gan", "意思不同", "句型", "意思"],
  ["khao-jai-khwaam-maai", "เข้าใจความหมาย", "khao jai khwaam maai", "理解意思", "动词", "意思"],
  ["mai-khao-jai", "ไม่เข้าใจ", "mai khao jai", "不明白", "句型", "意思"],
  ["khaaw-khwaam-maai", "ขอความหมาย", "khaaw khwaam maai", "请求解释意思", "句型", "意思"],
  ["dtua-yaang", "ตัวอย่าง", "dtua yaang", "例子", "名词", "例句"],
  ["bpra-yook-dtua-yaang", "ประโยคตัวอย่าง", "bpra-yook dtua yaang", "例句", "名词", "例句"],
  ["hai-dtua-yaang", "ให้ตัวอย่าง", "hai dtua yaang", "举例子", "动词", "例句"],
  ["yok-dtua-yaang", "ยกตัวอย่าง", "yok dtua yaang", "举例", "动词", "例句"],
  ["chen", "เช่น", "chen", "例如；比如", "副词", "例句"],
  ["dtua-yaang-chen", "ตัวอย่างเช่น", "dtua yaang chen", "例如", "短语", "例句"],
  ["chai-nai-bpra-yook", "ใช้ในประโยค", "chai nai bpra-yook", "用在句子里", "动词", "例句"],
  ["taeng-bpra-yook", "แต่งประโยค", "dtaeng bpra-yook", "造句", "动词", "例句"],
  ["bpra-yook-ngai-ngai", "ประโยคง่าย ๆ", "bpra-yook ngaai ngaai", "简单句子", "名词", "例句"],
  ["khaaw-dtua-yaang-iik", "ขอตัวอย่างอีก", "khaaw dtua yaang iik", "请再给例子", "句型", "例句"],
  ["thop-thuan", "ทบทวน", "thop thuan", "复习；回顾", "动词", "复习"],
  ["thop-thuan-bot-rian", "ทบทวนบทเรียน", "thop thuan bot rian", "复习课文", "动词", "复习"],
  ["aan-thuan", "อ่านทวน", "aan thuan", "再读复查", "动词", "复习"],
  ["duu-iik-khrang", "ดูอีกครั้ง", "duu iik khrang", "再看一次", "短语", "复习"],
  ["fang-iik-khrang", "ฟังอีกครั้ง", "fang iik khrang", "再听一次", "短语", "复习"],
  ["rian-sam", "เรียนซ้ำ", "rian sam", "重复学习", "动词", "复习"],
  ["tham-sam", "ทำซ้ำ", "tham sam", "重复做", "动词", "复习"],
  ["thuan-kham-sap", "ทวนคำศัพท์", "thuan kham sap", "复习词汇", "动词", "复习"],
  ["dtaa-raang-thop-thuan", "ตารางทบทวน", "dtaa-raang thop thuan", "复习表", "名词", "复习"],
  ["gaawn-sop", "ก่อนสอบ", "gaawn saawp", "考试前", "短语", "复习"],
  ["jam", "จำ", "jam", "记得；记住", "动词", "记住忘记"],
  ["jam-dai", "จำได้", "jam dai", "记得", "句型", "记住忘记"],
  ["jam-mai-dai", "จำไม่ได้", "jam mai dai", "记不住；不记得", "句型", "记住忘记"],
  ["luem", "ลืม", "luem", "忘记", "动词", "记住忘记"],
  ["luem-laew", "ลืมแล้ว", "luem laew", "已经忘了", "句型", "记住忘记"],
  ["jam-kham-sap", "จำคำศัพท์", "jam kham sap", "记单词", "动词", "记住忘记"],
  ["jam-ngai", "จำง่าย", "jam ngaai", "容易记", "形容词", "记住忘记"],
  ["jam-yaak", "จำยาก", "jam yaak", "难记", "形容词", "记住忘记"],
  ["jot-wai", "จดไว้", "jot wai", "记下来", "动词", "记住忘记"],
  ["tham-hai-jam-dai", "ทำให้จำได้", "tham hai jam dai", "让人记得住", "句型", "记住忘记"],
  ["fuek", "ฝึก", "fuek", "练习", "动词", "练习"],
  ["fuek-phuut", "ฝึกพูด", "fuek phuut", "练习说", "动词", "练习"],
  ["fuek-fang", "ฝึกฟัง", "fuek fang", "练习听", "动词", "练习"],
  ["fuek-aan", "ฝึกอ่าน", "fuek aan", "练习读", "动词", "练习"],
  ["fuek-khian", "ฝึกเขียน", "fuek khian", "练习写", "动词", "练习"],
  ["fuek-ok-siang", "ฝึกออกเสียง", "fuek awk siiang", "练习发音", "动词", "练习"],
  ["fuek-thuk-wan", "ฝึกทุกวัน", "fuek thuk wan", "每天练习", "短语", "练习"],
  ["laawng-phuut", "ลองพูด", "laawng phuut", "试着说", "动词", "练习"],
  ["laawng-khian", "ลองเขียน", "laawng khian", "试着写", "动词", "练习"],
  ["fuek-gap-phuean", "ฝึกกับเพื่อน", "fuek gap phuean", "和朋友练习", "动词", "练习"],
  ["baep-rian", "แบบเรียน", "baaep rian", "教材", "名词", "学习工具"],
  ["samut", "สมุด", "sa-mut", "本子；笔记本", "名词", "学习工具"],
  ["pakk-gaa", "ปากกา", "bpaak-gaa", "笔", "名词", "学习工具"],
  ["din-saw", "ดินสอ", "din-saaw", "铅笔", "名词", "学习工具"],
  ["app-rian-phaa-saa", "แอปเรียนภาษา", "aep rian phaa-saa", "语言学习应用", "名词", "学习工具"],
  ["dic-thai", "พจนานุกรมไทย", "phot-ja-naa-nu-grom thai", "泰语词典", "名词", "学习工具"],
  ["kham-bplae", "คำแปล", "kham bplae", "译文；翻译", "名词", "学习工具"],
  ["naang-sue-rian", "หนังสือเรียน", "nang-sue rian", "课本", "名词", "学习工具"],
  ["bot-rian", "บทเรียน", "bot rian", "课文；课程", "名词", "学习工具"],
  ["baep-fuek-hat", "แบบฝึกหัด", "baaep fuek hat", "练习题", "名词", "学习工具"],
];

const relatedByTheme: Record<
  LearningThaiMetaTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  发音: {
    synonym: "ออกเสียง / awk siiang / 发音",
    antonym: "ออกเสียงผิด / awk siiang phit / 发音错",
    comparison: "ออกเสียง 是发音动作，เสียง 是声音或语音本身。",
    collocation: "ฟังแล้วพูดตาม / fang laew phuut dtaam / 听后跟读",
  },
  声调: {
    synonym: "วรรณยุกต์ / wan-na-yuk / 声调符号",
    antonym: "เสียงผิด / siiang phit / 声调错",
    comparison: "วรรณยุกต์ 可指声调符号，เสียงวรรณยุกต์ 更强调读出来的声调。",
    collocation: "ฝึกวรรณยุกต์ทุกวัน / fuek wan-na-yuk thuk wan / 每天练习声调",
  },
  拼写: {
    synonym: "สะกดคำ / sa-got kham / 拼写单词",
    antonym: "เขียนผิด / khian phit / 写错",
    comparison: "พยัญชนะ 是辅音字母，สระ 是元音。",
    collocation: "สะกดคำแล้วเขียนลงสมุด / sa-got kham laew khian long sa-mut / 拼写单词后写进本子",
  },
  语法: {
    synonym: "ไวยากรณ์ / wai-yaa-gaawn / 语法",
    antonym: "เรียงคำผิด / riiang kham phit / 词序排错",
    comparison: "ประโยค 是句子，ไวยากรณ์ 是语法规则。",
    collocation: "แต่งประโยคให้ถูกไวยากรณ์ / dtaeng bpra-yook hai thuuk wai-yaa-gaawn / 按正确语法造句",
  },
  意思: {
    synonym: "ความหมาย / khwaam maai / 意思",
    antonym: "ไม่เข้าใจ / mai khao jai / 不明白",
    comparison: "แปลว่า 常问词语翻译，หมายความว่า 可问整句话的意思。",
    collocation: "คำนี้แปลว่าอะไร / kham nii bplae waa a-rai / 这个词是什么意思",
  },
  例句: {
    synonym: "ประโยคตัวอย่าง / bpra-yook dtua yaang / 例句",
    antonym: "ไม่มีตัวอย่าง / mai mii dtua yaang / 没有例子",
    comparison: "ตัวอย่าง 是例子，ประโยคตัวอย่าง 是例句。",
    collocation: "ขอตัวอย่างอีกหนึ่งประโยค / khaaw dtua yaang iik nueng bpra-yook / 请再给一个例句",
  },
  复习: {
    synonym: "ทบทวน / thop thuan / 复习",
    antonym: "ลืม / luem / 忘记",
    comparison: "ทบทวน 是复习回顾，ทำซ้ำ 是重复做。",
    collocation: "ทบทวนบทเรียนก่อนสอบ / thop thuan bot rian gaawn saawp / 考试前复习课文",
  },
  记住忘记: {
    synonym: "จำได้ / jam dai / 记得",
    antonym: "ลืมแล้ว / luem laew / 已经忘了",
    comparison: "จำ 是记住，จำได้ 是记得，จำไม่ได้ 是想不起来或记不住。",
    collocation: "จดไว้เพื่อให้จำได้ / jot wai phuea hai jam dai / 记下来以便记住",
  },
  练习: {
    synonym: "ฝึก / fuek / 练习",
    antonym: "ไม่ฝึก / mai fuek / 不练习",
    comparison: "ฝึก + 技能很常用，如 ฝึกพูด、ฝึกฟัง、ฝึกเขียน。",
    collocation: "ฝึกออกเสียงกับเพื่อน / fuek awk siiang gap phuean / 和朋友练习发音",
  },
  学习工具: {
    synonym: "แบบเรียน / baaep rian / 教材",
    antonym: "ไม่มีอุปกรณ์ / mai mii up-pa-gaawn / 没有工具",
    comparison: "หนังสือเรียน 是课本，แบบฝึกหัด 是练习题，พจนานุกรม 是词典。",
    collocation: "ใช้พจนานุกรมไทยดูคำแปล / chai phot-ja-naa-nu-grom thai duu kham bplae / 用泰语词典查译文",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ตอนเรียนภาษาไทย ฉันใช้คำว่า “${row[1]}” เพื่อถามเรื่องเสียง ความหมาย หรือวิธีฝึกให้ชัดเจน`,
  roman: `dtaawn rian phaa-saa thai chan chai kham waa "${row[2]}" phuea thaam rueang siiang khwaam maai rue wi-thii fuek hai chat-jen`,
  chinese: `学泰语时，我会用“${row[1]}”来清楚地询问发音、意思或练习方法。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "泰语学习元语言", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 学习泰语本身的元语言。适合问发音、声调、拼写、语法、意思、例句，以及描述复习和练习；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: LEARNING_THAI_META_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_LEARNING_THAI_META_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
