export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type MistakesClarificationTheme =
  | "说错听错看错"
  | "误会"
  | "解释"
  | "澄清"
  | "确认"
  | "重新说"
  | "慢一点"
  | "什么意思"
  | "不是这个"
  | "更正回应";

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
  theme: MistakesClarificationTheme,
];

const MISTAKES_CLARIFICATION_REFS = [
  "worker-a-a2-mistakes-clarification",
  "basic-thai-clarification-repair",
];

const rows: Row[] = [
  ["phit", "ผิด", "phit", "错；不对", "形容词", "说错听错看错"],
  ["phuut-phit", "พูดผิด", "phuut phit", "说错", "动词", "说错听错看错"],
  ["fang-phit", "ฟังผิด", "fang phit", "听错", "动词", "说错听错看错"],
  ["aan-phit", "อ่านผิด", "aan phit", "读错", "动词", "说错听错看错"],
  ["duu-phit", "ดูผิด", "duu phit", "看错", "动词", "说错听错看错"],
  ["khian-phit", "เขียนผิด", "khian phit", "写错", "动词", "说错听错看错"],
  ["jam-phit", "จำผิด", "jam phit", "记错", "动词", "说错听错看错"],
  ["got-phit", "กดผิด", "got phit", "按错；点错", "动词", "说错听错看错"],
  ["song-phit", "ส่งผิด", "song phit", "发错；送错", "动词", "说错听错看错"],
  ["lueak-phit", "เลือกผิด", "lueak phit", "选错", "动词", "说错听错看错"],
  ["maa-phit-thii", "มาผิดที่", "maa phit thii", "来错地方", "短语", "说错听错看错"],
  ["tho-phit-boe", "โทรผิดเบอร์", "thoo phit boe", "打错号码", "短语", "说错听错看错"],
  ["khao-jai-phit", "เข้าใจผิด", "khao jai phit", "误会；理解错", "动词", "误会"],
  ["khwaam-khao-jai-phit", "ความเข้าใจผิด", "khwaam khao jai phit", "误会；错误理解", "名词", "误会"],
  ["mai-dai-maai-khwaam-waa", "ไม่ได้หมายความว่า", "mai dai maai khwaam waa", "不是指……；并不是说……", "句型", "误会"],
  ["maai-thueng", "หมายถึง", "maai thueng", "意思是；指的是", "动词", "误会"],
  ["nuek-waa", "นึกว่า", "nuek waa", "以为……", "句型", "误会"],
  ["khao-jai-mai-dtrong-gan", "เข้าใจไม่ตรงกัน", "khao jai mai dtrong gan", "理解不一致", "句型", "误会"],
  ["khaaw-thoot-thii-khao-jai-phit", "ขอโทษที่เข้าใจผิด", "khaaw thoot thii khao jai phit", "抱歉我误会了", "句型", "误会"],
  ["yaa-khao-jai-phit", "อย่าเข้าใจผิด", "yaa khao jai phit", "别误会", "句型", "误会"],
  ["mai-chai-baep-thii-khit", "ไม่ใช่แบบที่คิด", "mai chai baaep thii khit", "不是你想的那样", "句型", "误会"],
  ["khaaw-hai-khao-jai-dtrong-gan", "ขอให้เข้าใจตรงกัน", "khaaw hai khao jai dtrong gan", "请大家理解一致", "句型", "误会"],
  ["a-thi-baai", "อธิบาย", "a-thi-baai", "解释；说明", "动词", "解释"],
  ["kham-a-thi-baai", "คำอธิบาย", "kham a-thi-baai", "解释；说明文字", "名词", "解释"],
  ["a-thi-baai-iik-khrang", "อธิบายอีกครั้ง", "a-thi-baai iik khrang", "再解释一次", "短语", "解释"],
  ["phuut-hai-chat", "พูดให้ชัด", "phuut hai chat", "说清楚", "短语", "解释"],
  ["bawk-het-phon", "บอกเหตุผล", "baawk het phon", "说明理由", "短语", "解释"],
  ["maai-khwaam-waa", "หมายความว่า", "maai khwaam waa", "意思是……", "句型", "解释"],
  ["phraw-waa", "เพราะว่า", "phraw waa", "因为……", "句型", "解释"],
  ["khue-waa", "คือว่า", "khue waa", "就是说；是这样的", "句型", "解释"],
  ["dtua-yaang-chen", "ตัวอย่างเช่น", "dtua yaang chen", "例如", "短语", "解释"],
  ["hai-dtua-yaang", "ให้ตัวอย่าง", "hai dtua yaang", "举例子", "动词", "解释"],
  ["chii-jaeng", "ชี้แจง", "chii jaaeng", "澄清；说明清楚", "动词", "澄清"],
  ["khaaw-chii-jaeng", "ขอชี้แจง", "khaaw chii jaaeng", "请允许澄清", "句型", "澄清"],
  ["phuut-hai-chat-jen", "พูดให้ชัดเจน", "phuut hai chat jen", "讲得清楚明确", "短语", "澄清"],
  ["khaaw-a-thi-baai-hai-chat", "ขออธิบายให้ชัด", "khaaw a-thi-baai hai chat", "请让我说明清楚", "句型", "澄清"],
  ["sa-rup-waa", "สรุปว่า", "sa-rup waa", "总结来说；结论是", "句型", "澄清"],
  ["dtok-long-waa", "ตกลงว่า", "dtok long waa", "所以说；最终是", "句型", "澄清"],
  ["jing-jing-laew", "จริง ๆ แล้ว", "jing jing laew", "其实；实际上", "短语", "澄清"],
  ["mai-chai-yaang-nan", "ไม่ใช่อย่างนั้น", "mai chai yaang nan", "不是那样", "句型", "澄清"],
  ["khaaw-gae-khai", "ขอแก้ไข", "khaaw gaae khai", "请允许更正", "句型", "澄清"],
  ["khaaw-phuut-mai", "ขอพูดใหม่", "khaaw phuut mai", "请让我重新说", "句型", "澄清"],
  ["yuen-yan", "ยืนยัน", "yuen yan", "确认；肯定", "动词", "确认"],
  ["chek-iik-khrang", "เช็กอีกครั้ง", "chek iik khrang", "再检查一次", "短语", "确认"],
  ["dtruat-iik-khrang", "ตรวจอีกครั้ง", "dtruat iik khrang", "再核对一次", "短语", "确认"],
  ["chai-mai", "ใช่ไหม", "chai mai", "是吗；对吗", "句型", "确认"],
  ["thuuk-mai", "ถูกไหม", "thuuk mai", "对吗；正确吗", "句型", "确认"],
  ["khao-jai-thuuk-mai", "เข้าใจถูกไหม", "khao jai thuuk mai", "我理解得对吗", "句型", "确认"],
  ["chai-rue-plao", "ใช่หรือเปล่า", "chai rue bplao", "是不是", "句型", "确认"],
  ["nae-jai-mai", "แน่ใจไหม", "nae jai mai", "确定吗", "句型", "确认"],
  ["yuen-yan-iik-khrang", "ยืนยันอีกครั้ง", "yuen yan iik khrang", "再次确认", "短语", "确认"],
  ["thaam-phuea-khwaam-nae-jai", "ถามเพื่อความแน่ใจ", "thaam phuea khwaam nae jai", "为了确定而问", "短语", "确认"],
  ["phuut-mai", "พูดใหม่", "phuut mai", "重新说", "动词", "重新说"],
  ["phuut-iik-khrang", "พูดอีกครั้ง", "phuut iik khrang", "再说一次", "短语", "重新说"],
  ["bawk-iik-thii", "บอกอีกที", "baawk iik thii", "再告诉一次", "短语", "重新说"],
  ["aan-iik-khrang", "อ่านอีกครั้ง", "aan iik khrang", "再读一次", "短语", "重新说"],
  ["khian-mai", "เขียนใหม่", "khian mai", "重新写", "动词", "重新说"],
  ["song-mai", "ส่งใหม่", "song mai", "重新发送", "动词", "重新说"],
  ["roem-mai", "เริ่มใหม่", "roem mai", "重新开始", "动词", "重新说"],
  ["tham-mai", "ทำใหม่", "tham mai", "重新做", "动词", "重新说"],
  ["laawng-mai", "ลองใหม่", "laawng mai", "重新试", "动词", "重新说"],
  ["glap-bpai-duu-mai", "กลับไปดูใหม่", "glap bpai duu mai", "回去重新看", "短语", "重新说"],
  ["chaa-noi", "ช้าหน่อย", "chaa noi", "慢一点", "短语", "慢一点"],
  ["phuut-chaa-noi", "พูดช้าหน่อย", "phuut chaa noi", "请说慢一点", "句型", "慢一点"],
  ["phuut-chaa-chaa", "พูดช้า ๆ", "phuut chaa chaa", "慢慢说", "句型", "慢一点"],
  ["raaw-sak-khruu", "รอสักครู่", "raaw sak khruu", "请等一下", "句型", "慢一点"],
  ["thii-la-kham", "ทีละคำ", "thii la kham", "一个词一个词地", "短语", "慢一点"],
  ["thii-la-bpra-yook", "ทีละประโยค", "thii la bpra-yook", "一句一句地", "短语", "慢一点"],
  ["chat-chat", "ชัด ๆ", "chat chat", "清楚地", "副词", "慢一点"],
  ["dang-khuen-noi", "ดังขึ้นหน่อย", "dang khuen noi", "大声一点", "句型", "慢一点"],
  ["khian-hai-duu", "เขียนให้ดู", "khian hai duu", "写给我看", "句型", "慢一点"],
  ["phim-hai-duu", "พิมพ์ให้ดู", "phim hai duu", "打字给我看", "句型", "慢一点"],
  ["maai-khwaam-waa-a-rai", "หมายความว่าอะไร", "maai khwaam waa a-rai", "是什么意思", "句型", "什么意思"],
  ["bplae-waa-a-rai", "แปลว่าอะไร", "bplae waa a-rai", "翻译成什么；是什么意思", "句型", "什么意思"],
  ["kham-nii-bplae-waa-a-rai", "คำนี้แปลว่าอะไร", "kham nii bplae waa a-rai", "这个词是什么意思", "句型", "什么意思"],
  ["khun-maai-thueng-a-rai", "คุณหมายถึงอะไร", "khun maai thueng a-rai", "你指的是什么", "句型", "什么意思"],
  ["an-nii-khue-a-rai", "อันนี้คืออะไร", "an nii khue a-rai", "这个是什么", "句型", "什么意思"],
  ["an-nan-khue-a-rai", "อันนั้นคืออะไร", "an nan khue a-rai", "那个是什么", "句型", "什么意思"],
  ["phuut-thueng-a-rai", "พูดถึงอะไร", "phuut thueng a-rai", "在说什么；指什么", "句型", "什么意思"],
  ["chai-yaang-rai", "ใช้อย่างไร", "chai yaang rai", "怎么用", "句型", "什么意思"],
  ["dtaang-gan-yaang-rai", "ต่างกันอย่างไร", "dtaang gan yaang rai", "有什么不同", "句型", "什么意思"],
  ["tham-mai-chai-kham-nii", "ทำไมใช้คำนี้", "tham mai chai kham nii", "为什么用这个词", "句型", "什么意思"],
  ["mai-chai", "ไม่ใช่", "mai chai", "不是", "短语", "不是这个"],
  ["mai-chai-an-nii", "ไม่ใช่อันนี้", "mai chai an nii", "不是这个", "句型", "不是这个"],
  ["mai-chai-an-nan", "ไม่ใช่อันนั้น", "mai chai an nan", "不是那个", "句型", "不是这个"],
  ["mai-chai-khon-nii", "ไม่ใช่คนนี้", "mai chai khon nii", "不是这个人", "句型", "不是这个"],
  ["mai-chai-thii-nii", "ไม่ใช่ที่นี่", "mai chai thii nii", "不是这里", "句型", "不是这个"],
  ["mai-chai-wan-nii", "ไม่ใช่วันนี้", "mai chai wan nii", "不是今天", "句型", "不是这个"],
  ["mai-chai-baep-nii", "ไม่ใช่แบบนี้", "mai chai baaep nii", "不是这样", "句型", "不是这个"],
  ["mai-chai-rueang-nii", "ไม่ใช่เรื่องนี้", "mai chai rueang nii", "不是这件事", "句型", "不是这个"],
  ["mai-chai-kham-nii", "ไม่ใช่คำนี้", "mai chai kham nii", "不是这个词", "句型", "不是这个"],
  ["mai-ao-an-nii", "ไม่เอาอันนี้", "mai ao an nii", "不要这个", "句型", "不是这个"],
  ["khaaw-thoot", "ขอโทษ", "khaaw thoot", "对不起；抱歉", "短语", "更正回应"],
  ["khaaw-thoot-khrap-kha", "ขอโทษครับ/ค่ะ", "khaaw thoot khrap/kha", "礼貌地说对不起", "短语", "更正回应"],
  ["mai-bpen-rai", "ไม่เป็นไร", "mai bpen rai", "没关系", "短语", "更正回应"],
  ["khao-jai-laew", "เข้าใจแล้ว", "khao jai laew", "明白了", "句型", "更正回应"],
  ["khao-jai-maak-khuen", "เข้าใจมากขึ้น", "khao jai maak khuen", "更明白了", "句型", "更正回应"],
  ["khawp-khun-thii-bawk", "ขอบคุณที่บอก", "khaawp khun thii baawk", "谢谢你告诉我", "句型", "更正回应"],
  ["khawp-khun-thii-gae-hai", "ขอบคุณที่แก้ให้", "khaawp khun thii gaae hai", "谢谢你帮我纠正", "句型", "更正回应"],
  ["khaaw-gae-kham-dtaawp", "ขอแก้คำตอบ", "khaaw gaae kham dtaawp", "请允许我改答案", "句型", "更正回应"],
  ["kham-dtaawp-thii-thuuk-khue", "คำตอบที่ถูกคือ", "kham dtaawp thii thuuk khue", "正确答案是……", "句型", "更正回应"],
  ["phuut-phit-khaaw-gae-bpen", "พูดผิด ขอแก้เป็น", "phuut phit khaaw gaae bpen", "说错了，改成……", "句型", "更正回应"],
  ["muea-gii-phuut-phit", "เมื่อกี้พูดผิด", "muea gii phuut phit", "刚才说错了", "句型", "更正回应"],
];

const relatedByTheme: Record<
  MistakesClarificationTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  说错听错看错: {
    synonym: "ผิด / phit / 错",
    antonym: "ถูก / thuuk / 对、正确",
    comparison: "พูดผิด 是说错，ฟังผิด 是听错，ดูผิด 是看错；都可用 动词 + ผิด。",
    collocation: "ขอโทษ ฉันพูดผิด / khaaw thoot chan phuut phit / 对不起，我说错了",
  },
  误会: {
    synonym: "เข้าใจผิด / khao jai phit / 误会",
    antonym: "เข้าใจตรงกัน / khao jai dtrong gan / 理解一致",
    comparison: "นึกว่า 表示“我以为”，เข้าใจผิด 表示已经理解错了。",
    collocation: "อย่าเข้าใจผิด / yaa khao jai phit / 别误会",
  },
  解释: {
    synonym: "อธิบาย / a-thi-baai / 解释",
    antonym: "ไม่อธิบาย / mai a-thi-baai / 不解释",
    comparison: "อธิบาย 是解释动作，คำอธิบาย 是解释内容或说明文字。",
    collocation: "อธิบายอีกครั้ง / a-thi-baai iik khrang / 再解释一次",
  },
  澄清: {
    synonym: "ชี้แจง / chii jaaeng / 澄清说明",
    antonym: "ปล่อยให้เข้าใจผิด / bplaawy hai khao jai phit / 放着让人误会",
    comparison: "ชี้แจง 比 อธิบาย 更强调把误会或不清楚的地方说清楚。",
    collocation: "ขอชี้แจงเรื่องนี้ / khaaw chii jaaeng rueang nii / 请允许澄清这件事",
  },
  确认: {
    synonym: "ยืนยัน / yuen yan / 确认",
    antonym: "ไม่แน่ใจ / mai nae jai / 不确定",
    comparison: "ใช่ไหม 用来确认“是不是”；แน่ใจไหม 用来问对方是否确定。",
    collocation: "เช็กอีกครั้งได้ไหม / chek iik khrang dai mai / 可以再检查一次吗",
  },
  重新说: {
    synonym: "พูดอีกครั้ง / phuut iik khrang / 再说一次",
    antonym: "พูดครั้งเดียว / phuut khrang diao / 只说一次",
    comparison: "พูดใหม่ 是重新说，บอกอีกที 是再告诉一遍，语气更口语。",
    collocation: "ช่วยพูดใหม่ได้ไหม / chuai phuut mai dai mai / 可以重新说吗",
  },
  慢一点: {
    synonym: "พูดช้าหน่อย / phuut chaa noi / 请说慢一点",
    antonym: "พูดเร็ว / phuut reo / 说得快",
    comparison: "ช้าหน่อย 说速度慢一点，ชัด ๆ 说要清楚一点。",
    collocation: "พูดช้า ๆ และชัด ๆ / phuut chaa chaa lae chat chat / 慢慢地、清楚地说",
  },
  什么意思: {
    synonym: "หมายความว่าอะไร / maai khwaam waa a-rai / 是什么意思",
    antonym: "เข้าใจแล้ว / khao jai laew / 已经明白",
    comparison: "แปลว่าอะไร 常问词语翻译，หมายความว่าอะไร 可问句子或整件事的意思。",
    collocation: "คำนี้แปลว่าอะไร / kham nii bplae waa a-rai / 这个词是什么意思",
  },
  不是这个: {
    synonym: "ไม่ใช่ / mai chai / 不是",
    antonym: "ใช่ / chai / 是",
    comparison: "ไม่ใช่ 用于否定“是”，ไม่เอา 用于表示“不要”。",
    collocation: "ไม่ใช่อันนี้ เอาอันนั้น / mai chai an nii ao an nan / 不是这个，要那个",
  },
  更正回应: {
    synonym: "ขอแก้ไข / khaaw gaae khai / 请允许更正",
    antonym: "ไม่แก้ / mai gaae / 不改",
    comparison: "ขอโทษ 用于道歉，ขอแก้ไข 用于正式或清楚地更正内容。",
    collocation: "เมื่อกี้พูดผิด ขอแก้เป็น... / muea gii phuut phit khaaw gaae bpen... / 刚才说错了，改成……",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ถ้ามีเรื่องเข้าใจผิดในบทสนทนา ฉันใช้คำว่า “${row[1]}” เพื่อถาม ยืนยัน หรือแก้ไขให้ชัดเจน`,
  roman: `thaa mii rueang khao jai phit nai bot-son-tha-naa chan chai kham waa "${row[2]}" phuea thaam yuen-yan rue gaae khai hai chat-jen`,
  chinese: `如果对话里有误会，我会用“${row[1]}”来提问、确认或更正，让意思更清楚。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "沟通修复", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 对话澄清和纠错常用表达。适合听不懂、说错、误会或需要确认时使用；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: MISTAKES_CLARIFICATION_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_MISTAKES_CLARIFICATION_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
