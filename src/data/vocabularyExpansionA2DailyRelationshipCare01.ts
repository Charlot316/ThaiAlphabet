export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type DailyRelationshipCareTheme =
  | "关心"
  | "问候"
  | "陪伴"
  | "帮忙"
  | "提醒"
  | "误会"
  | "和好"
  | "保持联系"
  | "家人朋友"
  | "安慰支持";

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
  theme: DailyRelationshipCareTheme,
];

const DAILY_RELATIONSHIP_CARE_REFS = [
  "worker-a-a2-daily-relationship-care",
  "basic-thai-relationship-care",
];

const rows: Row[] = [
  ["pen-huang", "เป็นห่วง", "bpen huang", "担心；关心", "动词", "关心"],
  ["huang", "ห่วง", "huang", "担心；挂念", "动词", "关心"],
  ["duu-lae", "ดูแล", "duu laae", "照顾", "动词", "关心"],
  ["duu-lae-dtua-eng", "ดูแลตัวเอง", "duu laae dtua eng", "照顾自己", "动词", "关心"],
  ["pen-yaang-rai-baang", "เป็นอย่างไรบ้าง", "bpen yaang rai baang", "怎么样了", "句型", "关心"],
  ["sabai-dii-mai", "สบายดีไหม", "sa-baai dii mai", "身体好吗；最近好吗", "句型", "关心"],
  ["gin-khaao-laew-mai", "กินข้าวแล้วไหม", "gin khaao laew mai", "吃饭了吗", "句型", "关心"],
  ["phak-phaawn-baang", "พักผ่อนบ้าง", "phak phaawn baang", "要休息一下", "句型", "关心"],
  ["yaa-hak-hoam", "อย่าหักโหม", "yaa hak hoom", "别太拼；别过度劳累", "句型", "关心"],
  ["mi-arai-bawk-dai", "มีอะไรบอกได้", "mii a-rai baawk dai", "有事可以告诉我", "句型", "关心"],
  ["thaam-thuk", "ถามทุกข์", "thaam thuk", "问候近况/苦乐", "动词", "问候"],
  ["thaam-khaao-khraao", "ถามข่าวคราว", "thaam khaao khraao", "询问近况", "动词", "问候"],
  ["thak-thaai", "ทักทาย", "thak thaai", "打招呼；问候", "动词", "问候"],
  ["sawat-dii", "สวัสดี", "sa-wat-dii", "你好；再见", "短语", "问候"],
  ["pen-ngai-baang", "เป็นไงบ้าง", "bpen ngai baang", "怎么样啊", "句型", "问候"],
  ["chawng-nii-pen-ngai", "ช่วงนี้เป็นไง", "chuang nii bpen ngai", "最近怎么样", "句型", "问候"],
  ["mai-dai-jer-gan-naan", "ไม่ได้เจอกันนาน", "mai dai joe gan naan", "好久不见", "句型", "问候"],
  ["khit-thueng", "คิดถึง", "khit thueng", "想念", "动词", "问候"],
  ["khit-thueng-na", "คิดถึงนะ", "khit thueng na", "想你哦", "句型", "问候"],
  ["faak-sawat-dii", "ฝากสวัสดี", "faak sa-wat-dii", "代问好", "动词", "问候"],
  ["yuu-pen-phuean", "อยู่เป็นเพื่อน", "yuu bpen phuean", "陪着作伴", "动词", "陪伴"],
  ["bpai-pen-phuean", "ไปเป็นเพื่อน", "bpai bpen phuean", "陪着去", "动词", "陪伴"],
  ["maa-pen-phuean", "มาเป็นเพื่อน", "maa bpen phuean", "来陪伴", "动词", "陪伴"],
  ["nang-pen-phuean", "นั่งเป็นเพื่อน", "nang bpen phuean", "坐着陪伴", "动词", "陪伴"],
  ["khui-pen-phuean", "คุยเป็นเพื่อน", "khui bpen phuean", "聊天陪伴", "动词", "陪伴"],
  ["gin-khaao-duai-gan", "กินข้าวด้วยกัน", "gin khaao duai gan", "一起吃饭", "动词", "陪伴"],
  ["doo-nang-duai-gan", "ดูหนังด้วยกัน", "duu nang duai gan", "一起看电影", "动词", "陪伴"],
  ["doen-len-duai-gan", "เดินเล่นด้วยกัน", "doen len duai gan", "一起散步", "动词", "陪伴"],
  ["mai-yak-yuu-khon-diao", "ไม่อยากอยู่คนเดียว", "mai yaak yuu khon diao", "不想一个人待着", "句型", "陪伴"],
  ["yuu-khaang-khaang", "อยู่ข้าง ๆ", "yuu khaang khaang", "在身边陪着", "短语", "陪伴"],
  ["chuai", "ช่วย", "chuai", "帮忙", "动词", "帮忙"],
  ["chuai-luea", "ช่วยเหลือ", "chuai luea", "帮助", "动词", "帮忙"],
  ["chuai-duai", "ช่วยด้วย", "chuai duai", "请帮忙；救命", "短语", "帮忙"],
  ["chuai-noi", "ช่วยหน่อย", "chuai noi", "帮一下", "短语", "帮忙"],
  ["chuai-kan", "ช่วยกัน", "chuai gan", "一起帮忙", "动词", "帮忙"],
  ["khaaw-khwaam-chuai-luea", "ขอความช่วยเหลือ", "khaaw khwaam chuai luea", "请求帮助", "动词", "帮忙"],
  ["hai-khwaam-chuai-luea", "ให้ความช่วยเหลือ", "hai khwaam chuai luea", "提供帮助", "动词", "帮忙"],
  ["chuai-duu-hai", "ช่วยดูให้", "chuai duu hai", "帮忙看", "动词", "帮忙"],
  ["chuai-thue", "ช่วยถือ", "chuai thue", "帮忙拿着/提着", "动词", "帮忙"],
  ["tham-hai-duai-jai", "ทำให้ด้วยใจ", "tham hai duai jai", "真心帮忙做", "短语", "帮忙"],
  ["dteuan", "เตือน", "dteuan", "提醒", "动词", "提醒"],
  ["dteuan-duai-khwaam-huang", "เตือนด้วยความห่วง", "dteuan duai khwaam huang", "出于关心提醒", "动词", "提醒"],
  ["yaa-luem", "อย่าลืม", "yaa luem", "别忘了", "句型", "提醒"],
  ["jaa-wai-na", "จำไว้นะ", "jam wai na", "记住哦", "句型", "提醒"],
  ["rawang-na", "ระวังนะ", "ra-wang na", "小心哦", "句型", "提醒"],
  ["dteuan-gaawn", "เตือนก่อน", "dteuan gaawn", "先提醒", "动词", "提醒"],
  ["bawk-luang-naa", "บอกล่วงหน้า", "baawk luang naa", "提前告诉", "动词", "提醒"],
  ["song-khaaw-khwaam-dteuan", "ส่งข้อความเตือน", "song khaaw khwaam dteuan", "发消息提醒", "动词", "提醒"],
  ["dteuan-welaa-nat", "เตือนเวลานัด", "dteuan we-laa nat", "提醒约定时间", "动词", "提醒"],
  ["dteuan-hai-phak", "เตือนให้พัก", "dteuan hai phak", "提醒休息", "动词", "提醒"],
  ["khao-jai-phit", "เข้าใจผิด", "khao jai phit", "误会；理解错", "动词", "误会"],
  ["khwaam-khao-jai-phit", "ความเข้าใจผิด", "khwaam khao jai phit", "误会", "名词", "误会"],
  ["yaa-khao-jai-phit", "อย่าเข้าใจผิด", "yaa khao jai phit", "别误会", "句型", "误会"],
  ["mai-dai-maai-khwaam-waa", "ไม่ได้หมายความว่า", "mai dai maai khwaam waa", "不是这个意思", "句型", "误会"],
  ["phuut-mai-chat", "พูดไม่ชัด", "phuut mai chat", "说得不清楚", "句型", "误会"],
  ["fang-phit", "ฟังผิด", "fang phit", "听错", "动词", "误会"],
  ["khaaw-a-thi-baai", "ขออธิบาย", "khaaw a-thi-baai", "请让我解释", "句型", "误会"],
  ["khaaw-thoot-thii-khao-jai-phit", "ขอโทษที่เข้าใจผิด", "khaaw thoot thii khao jai phit", "抱歉我误会了", "句型", "误会"],
  ["khui-hai-khao-jai", "คุยให้เข้าใจ", "khui hai khao jai", "谈清楚", "动词", "误会"],
  ["khao-jai-dtrong-gan", "เข้าใจตรงกัน", "khao jai dtrong gan", "理解一致", "句型", "误会"],
  ["dii-gan", "ดีกัน", "dii gan", "和好", "动词", "和好"],
  ["khuen-dii-gan", "คืนดีกัน", "khuen dii gan", "重归于好", "动词", "和好"],
  ["khaaw-thoot", "ขอโทษ", "khaaw thoot", "道歉；对不起", "短语", "和好"],
  ["hai-a-phai", "ให้อภัย", "hai a-phai", "原谅", "动词", "和好"],
  ["mai-grort-laew", "ไม่โกรธแล้ว", "mai groot laew", "不生气了", "句型", "和好"],
  ["khui-gan-dii-dii", "คุยกันดี ๆ", "khui gan dii dii", "好好谈", "动词", "和好"],
  ["bprap-khwaam-khao-jai", "ปรับความเข้าใจ", "bprap khwaam khao jai", "调整理解；说开误会", "动词", "和好"],
  ["roem-dton-mai", "เริ่มต้นใหม่", "roem dton mai", "重新开始", "动词", "和好"],
  ["glaap-maa-dii-gan", "กลับมาดีกัน", "glap maa dii gan", "重新和好", "句型", "和好"],
  ["mai-ao-rueng-gao", "ไม่เอาเรื่องเก่า", "mai ao rueang gao", "不提旧事", "句型", "和好"],
  ["dtit-dtaaw", "ติดต่อ", "dtit dtaaw", "联系", "动词", "保持联系"],
  ["rak-saa-gaan-dtit-dtaaw", "รักษาการติดต่อ", "rak-saa gaan dtit dtaaw", "保持联系", "动词", "保持联系"],
  ["dtit-dtaaw-gan", "ติดต่อกัน", "dtit dtaaw gan", "互相联系", "动词", "保持联系"],
  ["song-khaaw-khwaam-haa", "ส่งข้อความหา", "song khaaw khwaam haa", "发消息给……", "动词", "保持联系"],
  ["tho-haa", "โทรหา", "thoo haa", "打电话给……", "动词", "保持联系"],
  ["wi-dii-o-khaaw", "วิดีโอคอล", "wi-dii-oo khaaw", "视频通话", "动词", "保持联系"],
  ["jer-gan-baang", "เจอกันบ้าง", "joe gan baang", "偶尔见面", "句型", "保持联系"],
  ["yaa-haai-bpai", "อย่าหายไป", "yaa haai bpai", "别消失；别不联系", "句型", "保持联系"],
  ["waang-laew-tho-haa", "ว่างแล้วโทรหา", "waang laew thoo haa", "有空后打电话", "句型", "保持联系"],
  ["dtit-dtaaw-glap", "ติดต่อกลับ", "dtit dtaaw glap", "回联；回复联系", "动词", "保持联系"],
  ["khraawp-khrua", "ครอบครัว", "khraawp khrua", "家庭；家人", "名词", "家人朋友"],
  ["phuean", "เพื่อน", "phuean", "朋友", "名词", "家人朋友"],
  ["phuean-sanit", "เพื่อนสนิท", "phuean sa-nit", "好朋友；密友", "名词", "家人朋友"],
  ["khon-rak", "คนรัก", "khon rak", "爱人；恋人", "名词", "家人朋友"],
  ["phii-naawng", "พี่น้อง", "phii naawng", "兄弟姐妹", "名词", "家人朋友"],
  ["phaw-mae", "พ่อแม่", "phaaw mae", "父母", "名词", "家人朋友"],
  ["luuk", "ลูก", "luuk", "孩子；子女", "名词", "家人朋友"],
  ["khon-glai-dtua", "คนใกล้ตัว", "khon glai dtua", "身边的人", "名词", "家人朋友"],
  ["khwaam-sam-phan", "ความสัมพันธ์", "khwaam sam-phan", "关系", "名词", "家人朋友"],
  ["sanit-gan", "สนิทกัน", "sa-nit gan", "关系亲近", "句型", "家人朋友"],
  ["hai-gam-lang-jai", "ให้กำลังใจ", "hai gam-lang jai", "鼓励；支持", "动词", "安慰支持"],
  ["bpen-gam-lang-jai", "เป็นกำลังใจ", "bpen gam-lang jai", "给予精神支持", "句型", "安慰支持"],
  ["su-su-na", "สู้ ๆ นะ", "suu suu na", "加油哦", "短语", "安慰支持"],
  ["mai-bpen-rai-na", "ไม่เป็นไรนะ", "mai bpen rai na", "没关系的", "句型", "安慰支持"],
  ["diao-gaw-dii-khuen", "เดี๋ยวก็ดีขึ้น", "diao gaw dii khuen", "一会儿会好起来的", "句型", "安慰支持"],
  ["chan-yuu-khaang-khun", "ฉันอยู่ข้างคุณ", "chan yuu khaang khun", "我在你身边", "句型", "安慰支持"],
  ["phak-gaawn-na", "พักก่อนนะ", "phak gaawn na", "先休息一下吧", "句型", "安慰支持"],
  ["yaa-khit-maak", "อย่าคิดมาก", "yaa khit maak", "别想太多", "句型", "安慰支持"],
  ["tham-dai-nae", "ทำได้แน่", "tham dai nae", "一定做得到", "句型", "安慰支持"],
  ["mi-arai-chan-chuai", "มีอะไรฉันช่วย", "mii a-rai chan chuai", "有什么事我帮你", "句型", "安慰支持"],
];

const relatedByTheme: Record<
  DailyRelationshipCareTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  关心: {
    synonym: "เป็นห่วง / bpen huang / 担心、关心",
    antonym: "ไม่สนใจ / mai son jai / 不关心",
    comparison: "เป็นห่วง 强调挂念担心，ดูแล 强调实际照顾。",
    collocation: "ดูแลตัวเองนะ / duu laae dtua eng na / 要照顾自己哦",
  },
  问候: {
    synonym: "ทักทาย / thak thaai / 打招呼、问候",
    antonym: "ไม่ทัก / mai thak / 不打招呼",
    comparison: "สบายดีไหม 较通用，เป็นไงบ้าง 更口语亲近。",
    collocation: "ไม่ได้เจอกันนาน สบายดีไหม / mai dai joe gan naan sa-baai dii mai / 好久不见，最近好吗",
  },
  陪伴: {
    synonym: "อยู่เป็นเพื่อน / yuu bpen phuean / 陪伴",
    antonym: "อยู่คนเดียว / yuu khon diao / 一个人待着",
    comparison: "ไปเป็นเพื่อน 是陪着去，อยู่เป็นเพื่อน 是陪着待在一起。",
    collocation: "ไปโรงพยาบาลเป็นเพื่อน / bpai roong pha-yaa-baan bpen phuean / 陪着去医院",
  },
  帮忙: {
    synonym: "ช่วยเหลือ / chuai luea / 帮助",
    antonym: "ไม่ช่วย / mai chuai / 不帮",
    comparison: "ช่วย 是日常帮忙，ให้ความช่วยเหลือ 更完整、更正式一点。",
    collocation: "มีอะไรให้ช่วยบอกได้ / mii a-rai hai chuai baawk dai / 有什么需要帮忙可以说",
  },
  提醒: {
    synonym: "เตือน / dteuan / 提醒",
    antonym: "ลืมเตือน / luem dteuan / 忘了提醒",
    comparison: "เตือน 可表示提醒也可表示警告，语气看上下文。",
    collocation: "อย่าลืมพักผ่อนนะ / yaa luem phak phaawn na / 别忘了休息哦",
  },
  误会: {
    synonym: "เข้าใจผิด / khao jai phit / 误会",
    antonym: "เข้าใจตรงกัน / khao jai dtrong gan / 理解一致",
    comparison: "ฟังผิด 是听错，เข้าใจผิด 是理解错导致误会。",
    collocation: "คุยกันให้เข้าใจตรงกัน / khui gan hai khao jai dtrong gan / 谈到彼此理解一致",
  },
  和好: {
    synonym: "คืนดีกัน / khuen dii gan / 重归于好",
    antonym: "โกรธกัน / groot gan / 互相生气",
    comparison: "ดีกัน 偏口语和好，ปรับความเข้าใจ 偏把误会说开。",
    collocation: "ขอโทษแล้วกลับมาดีกัน / khaaw thoot laew glap maa dii gan / 道歉后重新和好",
  },
  保持联系: {
    synonym: "ติดต่อกัน / dtit dtaaw gan / 互相联系",
    antonym: "ขาดการติดต่อ / khaat gaan dtit dtaaw / 失去联系",
    comparison: "ติดต่อ 是联系，ติดต่อกลับ 是回联或回复联系。",
    collocation: "ว่างแล้วโทรหากัน / waang laew thoo haa gan / 有空后互相打电话",
  },
  家人朋友: {
    synonym: "คนใกล้ตัว / khon glai dtua / 身边的人",
    antonym: "คนแปลกหน้า / khon bplaaek naa / 陌生人",
    comparison: "เพื่อนสนิท 是关系很近的朋友，คนใกล้ตัว 可包括家人朋友。",
    collocation: "ดูแลความสัมพันธ์กับครอบครัว / duu laae khwaam sam-phan gap khraawp khrua / 维护和家人的关系",
  },
  安慰支持: {
    synonym: "ให้กำลังใจ / hai gam-lang jai / 鼓励、支持",
    antonym: "ทำให้เสียใจ / tham hai siia jai / 让人伤心",
    comparison: "สู้ ๆ นะ 是口语加油，เป็นกำลังใจ 更像表达精神支持。",
    collocation: "ไม่เป็นไรนะ ฉันอยู่ข้างคุณ / mai bpen rai na chan yuu khaang khun / 没关系，我在你身边",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาคุยกับเพื่อนหรือครอบครัว ฉันใช้คำว่า “${row[1]}” เพื่อแสดงความห่วงใยและรักษาความสัมพันธ์`,
  roman: `we-laa khui gap phuean rue khraawp khrua chan chai kham waa "${row[2]}" phuea sa-daaeng khwaam huang-yai lae rak-saa khwaam sam-phan`,
  chinese: `和朋友或家人聊天时，我会用“${row[1]}”来表达关心并维护关系。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "关系维护", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 朋友和家人关系维护表达。适合关心、问候、陪伴、帮忙、提醒、解释误会、和好和保持联系；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: DAILY_RELATIONSHIP_CARE_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_RELATIONSHIP_CARE_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
