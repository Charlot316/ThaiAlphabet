export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type EverydayCollocationsTheme =
  | "时间搭配"
  | "问题帮助"
  | "决定想法"
  | "感觉表达"
  | "沟通表达"
  | "日常动作"
  | "生活安排"
  | "学习工作"
  | "评价程度"
  | "请求回应";

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
  theme: EverydayCollocationsTheme,
];

const EVERYDAY_COLLOCATIONS_REFS = [
  "worker-a-a2-everyday-collocations",
  "basic-thai-daily-collocations",
];

const rows: Row[] = [
  ["chai-welaa", "ใช้เวลา", "chai we-laa", "花时间；需要时间", "动词", "时间搭配"],
  ["sia-welaa", "เสียเวลา", "siia we-laa", "浪费时间", "动词", "时间搭配"],
  ["mi-welaa", "มีเวลา", "mii we-laa", "有时间", "句型", "时间搭配"],
  ["mai-mi-welaa", "ไม่มีเวลา", "mai mii we-laa", "没有时间", "句型", "时间搭配"],
  ["khaaw-welaa", "ขอเวลา", "khaaw we-laa", "请求给时间", "动词", "时间搭配"],
  ["dtawng-gaan-welaa", "ต้องการเวลา", "dtawng gaan we-laa", "需要时间", "句型", "时间搭配"],
  ["than-welaa", "ทันเวลา", "than we-laa", "来得及；按时", "短语", "时间搭配"],
  ["mai-than-welaa", "ไม่ทันเวลา", "mai than we-laa", "来不及；没赶上时间", "短语", "时间搭配"],
  ["dtarang-welaa", "ตรงเวลา", "dtrong we-laa", "准时", "副词", "时间搭配"],
  ["luean-welaa", "เลื่อนเวลา", "leuan we-laa", "推迟时间", "动词", "时间搭配"],
  ["mi-pan-haa", "มีปัญหา", "mii bpan-haa", "有问题", "句型", "问题帮助"],
  ["gae-pan-haa", "แก้ปัญหา", "gaae bpan-haa", "解决问题", "动词", "问题帮助"],
  ["haa-withi", "หาวิธี", "haa wi-thii", "找方法", "动词", "问题帮助"],
  ["khaaw-khwaam-chuai-luea", "ขอความช่วยเหลือ", "khaaw khwaam chuai luea", "请求帮助", "动词", "问题帮助"],
  ["hai-khwaam-chuai-luea", "ให้ความช่วยเหลือ", "hai khwaam chuai luea", "提供帮助", "动词", "问题帮助"],
  ["dtawng-gaan-khwaam-chuai-luea", "ต้องการความช่วยเหลือ", "dtawng gaan khwaam chuai luea", "需要帮助", "句型", "问题帮助"],
  ["chuai-gae", "ช่วยแก้", "chuai gaae", "帮忙解决/修改", "动词", "问题帮助"],
  ["chuai-duu", "ช่วยดู", "chuai duu", "帮忙看一下", "动词", "问题帮助"],
  ["chuai-chek", "ช่วยเช็ก", "chuai chek", "帮忙检查", "动词", "问题帮助"],
  ["mai-mi-pan-haa", "ไม่มีปัญหา", "mai mii bpan-haa", "没有问题", "句型", "问题帮助"],
  ["dtat-sin-jai", "ตัดสินใจ", "dtat sin jai", "决定；下决定", "动词", "决定想法"],
  ["plian-jai", "เปลี่ยนใจ", "bpliian jai", "改变主意", "动词", "决定想法"],
  ["dtang-jai", "ตั้งใจ", "dtang jai", "有意；用心", "动词", "决定想法"],
  ["khit-waa", "คิดว่า", "khit waa", "觉得；认为", "句型", "决定想法"],
  ["ruu-suek-waa", "รู้สึกว่า", "ruu suek waa", "感觉……", "句型", "决定想法"],
  ["hen-waa", "เห็นว่า", "hen waa", "认为；看出", "句型", "决定想法"],
  ["lueak-aan-nii", "เลือกอันนี้", "lueak an nii", "选择这个", "句型", "决定想法"],
  ["mi-khwaam-khit", "มีความคิด", "mii khwaam khit", "有想法", "句型", "决定想法"],
  ["sanoe-khwaam-khit", "เสนอความคิด", "sa-noe khwaam khit", "提出想法", "动词", "决定想法"],
  ["mai-nae-jai", "ไม่แน่ใจ", "mai nae jai", "不确定", "形容词", "决定想法"],
  ["ruu-suek-dii", "รู้สึกดี", "ruu suek dii", "感觉好", "句型", "感觉表达"],
  ["ruu-suek-mai-dii", "รู้สึกไม่ดี", "ruu suek mai dii", "感觉不好", "句型", "感觉表达"],
  ["ruu-suek-nueai", "รู้สึกเหนื่อย", "ruu suek neuuai", "觉得累", "句型", "感觉表达"],
  ["ruu-suek-nguang", "รู้สึกง่วง", "ruu suek nguang", "觉得困", "句型", "感觉表达"],
  ["ruu-suek-hio", "รู้สึกหิว", "ruu suek hiw", "觉得饿", "句型", "感觉表达"],
  ["ruu-suek-glua", "รู้สึกกลัว", "ruu suek glua", "觉得害怕", "句型", "感觉表达"],
  ["ruu-suek-sabai-jai", "รู้สึกสบายใจ", "ruu suek sa-baai jai", "觉得安心", "句型", "感觉表达"],
  ["ruu-suek-mai-sabai-jai", "รู้สึกไม่สบายใจ", "ruu suek mai sa-baai jai", "觉得不安心", "句型", "感觉表达"],
  ["tham-hai-dii-jai", "ทำให้ดีใจ", "tham hai dii jai", "让人高兴", "句型", "感觉表达"],
  ["tham-hai-sia-jai", "ทำให้เสียใจ", "tham hai siia jai", "让人伤心", "句型", "感觉表达"],
  ["phuut-khwaam-jing", "พูดความจริง", "phuut khwaam jing", "说实话", "动词", "沟通表达"],
  ["phuut-dtrong-dtrong", "พูดตรง ๆ", "phuut dtrong dtrong", "直接说", "动词", "沟通表达"],
  ["phuut-su-phaap", "พูดสุภาพ", "phuut su-phaap", "礼貌地说", "动词", "沟通表达"],
  ["bawk-khwaam-jing", "บอกความจริง", "baawk khwaam jing", "告诉真相", "动词", "沟通表达"],
  ["thaam-kham-thaam", "ถามคำถาม", "thaam kham thaam", "提问", "动词", "沟通表达"],
  ["dtaawp-kham-thaam", "ตอบคำถาม", "dtaawp kham thaam", "回答问题", "动词", "沟通表达"],
  ["a-thi-baai-hai-khao-jai", "อธิบายให้เข้าใจ", "a-thi-baai hai khao jai", "解释到让人明白", "动词", "沟通表达"],
  ["phuut-iik-khrang", "พูดอีกครั้ง", "phuut iik khrang", "再说一次", "动词", "沟通表达"],
  ["fang-hai-jop", "ฟังให้จบ", "fang hai jop", "听完", "动词", "沟通表达"],
  ["khao-jai-dtrong-gan", "เข้าใจตรงกัน", "khao jai dtrong gan", "理解一致", "句型", "沟通表达"],
  ["tham-khwaam-sa-aat", "ทำความสะอาด", "tham khwaam sa-aat", "打扫；清洁", "动词", "日常动作"],
  ["tham-aa-haan", "ทำอาหาร", "tham aa-haan", "做饭", "动词", "日常动作"],
  ["sue-khaawng", "ซื้อของ", "sue khaawng", "买东西", "动词", "日常动作"],
  ["long-thabian", "ลงทะเบียน", "long tha-biian", "登记；注册", "动词", "日常动作"],
  ["jaai-ngoen", "จ่ายเงิน", "jaai ngoen", "付款", "动词", "日常动作"],
  ["rap-ngoen", "รับเงิน", "rap ngoen", "收钱", "动词", "日常动作"],
  ["khaaw-bai-set", "ขอใบเสร็จ", "khaaw bai-set", "要收据", "动词", "日常动作"],
  ["dtid-dtaaw", "ติดต่อ", "dtit dtaaw", "联系", "动词", "日常动作"],
  ["jaawng-khiu", "จองคิว", "jaawng khiu", "预约排号", "动词", "日常动作"],
  ["rap-baaw-ri-gaan", "รับบริการ", "rap baaw-ri-gaan", "接受服务；办理服务", "动词", "日常动作"],
  ["waang-phaaen", "วางแผน", "waang phaaen", "做计划", "动词", "生活安排"],
  ["tham-dtaam-phaaen", "ทำตามแผน", "tham dtaam phaaen", "按计划做", "动词", "生活安排"],
  ["plian-phaaen", "เปลี่ยนแผน", "bpliian phaaen", "改变计划", "动词", "生活安排"],
  ["dtang-bpao-maai", "ตั้งเป้าหมาย", "dtang bpao maai", "设定目标", "动词", "生活安排"],
  ["tham-bpen-bpra-jam", "ทำเป็นประจำ", "tham bpen bpra-jam", "经常固定做", "短语", "生活安排"],
  ["dtuen-chao", "ตื่นเช้า", "dteun chao", "早起", "动词", "生活安排"],
  ["naawn-duek", "นอนดึก", "naawn duek", "晚睡", "动词", "生活安排"],
  ["awk-gamlang-gaai", "ออกกำลังกาย", "awk gam-lang gaai", "运动；锻炼", "动词", "生活安排"],
  ["phak-phaawn", "พักผ่อน", "phak phaawn", "休息；放松", "动词", "生活安排"],
  ["chai-chiiwit", "ใช้ชีวิต", "chai chii-wit", "生活；过日子", "动词", "生活安排"],
  ["tham-gaan-baan", "ทำการบ้าน", "tham gaan baan", "做作业", "动词", "学习工作"],
  ["tham-ngaan", "ทำงาน", "tham ngaan", "工作；做任务", "动词", "学习工作"],
  ["rian-phaa-saa", "เรียนภาษา", "rian phaa-saa", "学语言", "动词", "学习工作"],
  ["aan-nang-sue", "อ่านหนังสือ", "aan nang-sue", "读书；看书", "动词", "学习工作"],
  ["khian-raai-ngaan", "เขียนรายงาน", "khian raai ngaan", "写报告", "动词", "学习工作"],
  ["song-ngaan", "ส่งงาน", "song ngaan", "交任务/作业", "动词", "学习工作"],
  ["truat-ngaan", "ตรวจงาน", "dtruat ngaan", "检查工作/作业", "动词", "学习工作"],
  ["pra-chum-ngaan", "ประชุมงาน", "bpra-chum ngaan", "开工作会", "动词", "学习工作"],
  ["thop-thuan-bot-rian", "ทบทวนบทเรียน", "thop thuan bot rian", "复习课文", "动词", "学习工作"],
  ["fuek-phuut", "ฝึกพูด", "fuek phuut", "练习说", "动词", "学习工作"],
  ["dii-maak", "ดีมาก", "dii maak", "很好", "形容词", "评价程度"],
  ["mai-dii-therai", "ไม่ดีเท่าไร", "mai dii thao rai", "不太好", "短语", "评价程度"],
  ["khon-khaang-dii", "ค่อนข้างดี", "khon khaang dii", "比较好", "短语", "评价程度"],
  ["khon-khaang-phaaeng", "ค่อนข้างแพง", "khon khaang phaaeng", "比较贵；偏贵", "短语", "评价程度"],
  ["mai-khoi-saduak", "ไม่ค่อยสะดวก", "mai khoi sa-duak", "不太方便", "短语", "评价程度"],
  ["saduak-maak", "สะดวกมาก", "sa-duak maak", "很方便", "短语", "评价程度"],
  ["khum-raa-khaa", "คุ้มราคา", "khum raa-khaa", "价格划算；值这个价", "形容词", "评价程度"],
  ["mai-khum", "ไม่คุ้ม", "mai khum", "不划算", "形容词", "评价程度"],
  ["naa-son-jai", "น่าสนใจ", "naa son jai", "有意思；值得关注", "形容词", "评价程度"],
  ["naa-buea", "น่าเบื่อ", "naa buea", "无聊", "形容词", "评价程度"],
  ["khaaw-noi", "ขอหน่อย", "khaaw noi", "请给一点；请帮一下", "短语", "请求回应"],
  ["chuai-noi", "ช่วยหน่อย", "chuai noi", "帮一下", "短语", "请求回应"],
  ["dai-mai", "ได้ไหม", "dai mai", "可以吗", "句型", "请求回应"],
  ["dai-loei", "ได้เลย", "dai loei", "可以，没问题", "短语", "请求回应"],
  ["mai-bpen-rai", "ไม่เป็นไร", "mai bpen rai", "没关系；不用了", "短语", "请求回应"],
  ["khaaw-rab-guuan", "ขอรบกวน", "khaaw rop guan", "麻烦您；打扰一下", "短语", "请求回应"],
  ["khaaw-aphai", "ขออภัย", "khaaw a-phai", "抱歉；正式道歉", "短语", "请求回应"],
  ["khawp-khun-luang-naa", "ขอบคุณล่วงหน้า", "khaawp khun luang naa", "提前谢谢", "短语", "请求回应"],
  ["thaa-saduak", "ถ้าสะดวก", "thaa sa-duak", "如果方便的话", "句型", "请求回应"],
  ["thaa-mai-bpen-gaan-rop-guan", "ถ้าไม่เป็นการรบกวน", "thaa mai bpen gaan rop guan", "如果不打扰的话", "句型", "请求回应"],
];

const relatedByTheme: Record<
  EverydayCollocationsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  时间搭配: {
    synonym: "ใช้เวลา / chai we-laa / 花时间",
    antonym: "ไม่เสียเวลา / mai siia we-laa / 不浪费时间",
    comparison: "ใช้เวลา 是中性“花时间”，เสียเวลา 带有浪费时间的感觉。",
    collocation: "ใช้เวลาประมาณสิบนาที / chai we-laa bpra-maan sip naa-thii / 大约花十分钟",
  },
  问题帮助: {
    synonym: "มีปัญหา / mii bpan-haa / 有问题",
    antonym: "ไม่มีปัญหา / mai mii bpan-haa / 没问题",
    comparison: "ขอความช่วยเหลือ 是请求帮助，ให้ความช่วยเหลือ 是提供帮助。",
    collocation: "มีปัญหา ขอความช่วยเหลือได้ไหม / mii bpan-haa khaaw khwaam chuai luea dai mai / 有问题，可以请求帮助吗",
  },
  决定想法: {
    synonym: "ตัดสินใจ / dtat sin jai / 做决定",
    antonym: "ไม่แน่ใจ / mai nae jai / 不确定",
    comparison: "คิดว่า 偏想法判断，รู้สึกว่า 偏感觉和主观感受。",
    collocation: "ตัดสินใจเลือกอันนี้ / dtat sin jai lueak an nii / 决定选择这个",
  },
  感觉表达: {
    synonym: "รู้สึกว่า / ruu suek waa / 感觉……",
    antonym: "ไม่รู้สึกอะไร / mai ruu suek a-rai / 没什么感觉",
    comparison: "รู้สึก + 形容词说身体或心情感觉，ทำให้ + 感觉词表示“让人……”。",
    collocation: "รู้สึกไม่สบายใจนิดหน่อย / ruu suek mai sa-baai jai nit noi / 有点不安心",
  },
  沟通表达: {
    synonym: "พูดความจริง / phuut khwaam jing / 说实话",
    antonym: "ไม่พูด / mai phuut / 不说",
    comparison: "พูดตรง ๆ 是直接说，พูดสุภาพ 是礼貌地说，二者可以同时做到。",
    collocation: "พูดสุภาพและฟังให้จบ / phuut su-phaap lae fang hai jop / 礼貌地说并听完",
  },
  日常动作: {
    synonym: "ทำความสะอาด / tham khwaam sa-aat / 打扫",
    antonym: "ปล่อยไว้ / bplaawy wai / 放着不管",
    comparison: "รับบริการ 是接受或办理服务，ติดต่อ 是联系某人或机构。",
    collocation: "ติดต่อเจ้าหน้าที่เพื่อรับบริการ / dtit dtaaw jao naa thii phuea rap baaw-ri-gaan / 联系工作人员办理服务",
  },
  生活安排: {
    synonym: "วางแผน / waang phaaen / 做计划",
    antonym: "ไม่มีแผน / mai mii phaaen / 没有计划",
    comparison: "ทำตามแผน 是按计划做，เปลี่ยนแผน 是改变计划。",
    collocation: "วางแผนออกกำลังกายเป็นประจำ / waang phaaen awk gam-lang gaai bpen bpra-jam / 计划定期运动",
  },
  学习工作: {
    synonym: "ทำงาน / tham ngaan / 工作、做任务",
    antonym: "พักผ่อน / phak phaawn / 休息",
    comparison: "งาน 可指工作也可指作业任务，要看学习或工作场景。",
    collocation: "ส่งงานหลังจากตรวจงานแล้ว / song ngaan lang jaak dtruat ngaan laew / 检查后提交任务",
  },
  评价程度: {
    synonym: "ค่อนข้างดี / khon khaang dii / 比较好",
    antonym: "ไม่ดีเท่าไร / mai dii thao rai / 不太好",
    comparison: "ค่อนข้าง 表示程度中等偏上，มาก 语气更强。",
    collocation: "ค่อนข้างแพงแต่คุ้มราคา / khon khaang phaaeng dtae khum raa-khaa / 偏贵但值这个价",
  },
  请求回应: {
    synonym: "ช่วยหน่อย / chuai noi / 帮一下",
    antonym: "ไม่สะดวก / mai sa-duak / 不方便",
    comparison: "หน่อย 能让请求更轻；ถ้าสะดวก 可让对方更容易拒绝或接受。",
    collocation: "ถ้าสะดวก ช่วยดูให้หน่อย / thaa sa-duak chuai duu hai noi / 如果方便，请帮忙看一下",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในการพูดภาษาไทยประจำวัน ฉันจำวลี “${row[1]}” เป็นก้อนคำ เพื่อใช้พูดได้เร็วและเป็นธรรมชาติมากขึ้น`,
  roman: `nai gaan phuut phaa-saa thai bpra-jam wan chan jam wa-lii "${row[2]}" bpen gaawn kham phuea chai phuut dai reo lae bpen tham-ma-chaat maak khuen`,
  chinese: `在日常泰语表达中，我把“${row[1]}”当成一个词组来记，这样说得更快也更自然。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "日常固定搭配", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 高频固定搭配。建议整块记忆，不要只背单个词；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: EVERYDAY_COLLOCATIONS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_COLLOCATIONS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
