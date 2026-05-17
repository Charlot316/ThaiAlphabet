export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "介词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type TimeSequenceRoutineTheme =
  | "先后顺序"
  | "同时"
  | "过去未来"
  | "刚刚马上"
  | "持续频率"
  | "偶尔习惯"
  | "流程步骤"
  | "日常流程"
  | "时间连接"
  | "等待结束";

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
  theme: TimeSequenceRoutineTheme,
];

const TIME_SEQUENCE_ROUTINE_REFS = [
  "worker-a-a2-time-sequence-routine-02",
  "basic-thai-time-routine",
];

const rows: Row[] = [
  ["gaawn", "ก่อน", "gaawn", "先；以前；在……之前", "副词", "先后顺序"],
  ["thi-lang", "ทีหลัง", "thii lang", "之后；回头再", "副词", "先后顺序"],
  ["dtaam-maa", "ตามมา", "dtaam maa", "随后来；接着来", "动词", "先后顺序"],
  ["dtaam-duai", "ตามด้วย", "dtaam duai", "接着是；后面跟着", "短语", "先后顺序"],
  ["khan-raek", "ขั้นแรก", "khan raaek", "第一步", "名词", "先后顺序"],
  ["khan-thii-saawng", "ขั้นที่สอง", "khan thii saawng", "第二步", "名词", "先后顺序"],
  ["khan-thii-saam", "ขั้นที่สาม", "khan thii saam", "第三步", "名词", "先后顺序"],
  ["thii-raek", "ที่แรก", "thii raaek", "第一个地方；最先的地方", "短语", "先后顺序"],
  ["thii-lang", "ที่หลัง", "thii lang", "后面的；后来的", "短语", "先后顺序"],
  ["thii-sut-thaai", "ที่สุดท้าย", "thii sut-thaai", "最后一个；最后的地方", "短语", "先后顺序"],
  ["gaawn-laew-khaawy", "ก่อนแล้วค่อย", "gaawn laew khaawy", "先……然后再……", "句型", "先后顺序"],
  ["laew-khaawy", "แล้วค่อย", "laew khaawy", "然后再；之后才", "副词", "先后顺序"],
  ["phraawm-gan", "พร้อมกัน", "phraawm gan", "同时；一起", "副词", "同时"],
  ["nai-welaa-diao-gan", "ในเวลาเดียวกัน", "nai we-laa diao gan", "在同一时间；同时", "短语", "同时"],
  ["rawang-thii", "ระหว่างที่", "ra-waang thii", "在……的时候", "句型", "同时"],
  ["ton-thii", "ตอนที่", "dtaawn thii", "当……的时候", "句型", "同时"],
  ["khan-thii", "ขณะที่", "kha-na thii", "当……时；与此同时", "句型", "同时"],
  ["phuut-bpai-duai", "พูดไปด้วย", "phuut bpai duai", "一边说一边……", "句型", "同时"],
  ["fang-bpai-duai", "ฟังไปด้วย", "fang bpai duai", "一边听一边……", "句型", "同时"],
  ["gin-bpai-duai", "กินไปด้วย", "gin bpai duai", "一边吃一边……", "句型", "同时"],
  ["tham-song-yaang", "ทำสองอย่าง", "tham saawng yaang", "做两件事", "短语", "同时"],
  ["nai-khana-nan", "ในขณะนั้น", "nai kha-na nan", "那时候；同时那一刻", "短语", "同时"],
  ["muea-gaawn", "เมื่อก่อน", "muea gaawn", "以前；过去", "副词", "过去未来"],
  ["dtae-gaawn", "แต่ก่อน", "dtae gaawn", "从前；以前", "副词", "过去未来"],
  ["muea-wan-nii", "เมื่อวานนี้", "muea waan nii", "昨天", "名词", "过去未来"],
  ["muea-chao-nii", "เมื่อเช้านี้", "muea chao nii", "今天早上", "名词", "过去未来"],
  ["muea-khuen-nii", "เมื่อคืนนี้", "muea khuen nii", "昨晚", "名词", "过去未来"],
  ["dtaawn-laaeng", "ตอนหลัง", "dtaawn lang", "后来；之后", "副词", "过去未来"],
  ["lang-jaak-nan", "หลังจากนั้น", "lang jaak nan", "那之后", "短语", "过去未来"],
  ["dtaaw-jaak-nii", "ต่อจากนี้", "dtaaw jaak nii", "从现在起；接下来", "短语", "过去未来"],
  ["dtaaw-bpai-nii", "ต่อไปนี้", "dtaaw bpai nii", "今后；以后", "短语", "过去未来"],
  ["nai-wan-khaang-naa", "ในวันข้างหน้า", "nai wan khaang naa", "以后的日子；将来", "短语", "过去未来"],
  ["muea-gii", "เมื่อกี้", "muea gii", "刚才", "副词", "刚刚马上"],
  ["phueng", "เพิ่ง", "phoeng", "刚刚才", "副词", "刚刚马上"],
  ["phueng-ja", "เพิ่งจะ", "phoeng ja", "刚要；才刚", "副词", "刚刚马上"],
  ["diao-nii", "เดี๋ยวนี้", "diao nii", "现在；立刻", "副词", "刚刚马上"],
  ["diao", "เดี๋ยว", "diao", "一会儿；等一下", "副词", "刚刚马上"],
  ["diao-gaw", "เดี๋ยวก็", "diao gaw", "马上就会；一会儿就", "句型", "刚刚马上"],
  ["than-thii", "ทันที", "than thii", "立刻；马上", "副词", "刚刚马上"],
  ["reo-reo-nii", "เร็ว ๆ นี้", "reo reo nii", "近期；很快", "副词", "刚刚马上"],
  ["iik-mai-naan", "อีกไม่นาน", "iik mai naan", "不久以后", "短语", "刚刚马上"],
  ["gam-lang-ja", "กำลังจะ", "gam-lang ja", "正要；快要", "句型", "刚刚马上"],
  ["talot", "ตลอด", "dta-laawt", "一直；整个", "副词", "持续频率"],
  ["talot-welaa", "ตลอดเวลา", "dta-laawt we-laa", "一直；所有时间", "副词", "持续频率"],
  ["talot-wan", "ตลอดวัน", "dta-laawt wan", "一整天", "短语", "持续频率"],
  ["bpen-bpra-jam", "เป็นประจำ", "bpen bpra-jam", "定期；经常", "副词", "持续频率"],
  ["samoe", "เสมอ", "sa-moe", "总是；一直", "副词", "持续频率"],
  ["thuk-khrang", "ทุกครั้ง", "thuk khrang", "每次", "副词", "持续频率"],
  ["thuk-wan", "ทุกวัน", "thuk wan", "每天", "副词", "持续频率"],
  ["thuk-aathit", "ทุกอาทิตย์", "thuk aa-thit", "每周", "副词", "持续频率"],
  ["thuk-duean", "ทุกเดือน", "thuk duean", "每月", "副词", "持续频率"],
  ["wan-laa-khrang", "วันละครั้ง", "wan la khrang", "一天一次", "短语", "持续频率"],
  ["baang-khrang", "บางครั้ง", "baang khrang", "有时候", "副词", "偶尔习惯"],
  ["bpen-baang-khrang", "เป็นบางครั้ง", "bpen baang khrang", "偶尔；有时", "副词", "偶尔习惯"],
  ["naan-naan-khrang", "นาน ๆ ครั้ง", "naan naan khrang", "很偶尔；隔很久一次", "副词", "偶尔习惯"],
  ["mai-khoi-baawy", "ไม่ค่อยบ่อย", "mai khoi baawy", "不太频繁", "短语", "偶尔习惯"],
  ["bpok-ga-dti", "ปกติ", "bpok-ga-dti", "通常；正常", "副词", "偶尔习惯"],
  ["tam-bpok-ga-dti", "ตามปกติ", "dtaam bpok-ga-dti", "照常；按平时", "副词", "偶尔习惯"],
  ["dtaang-jaak-bpok-ga-dti", "ต่างจากปกติ", "dtaang jaak bpok-ga-dti", "和平时不同", "短语", "偶尔习惯"],
  ["ni-sai-bpra-jam", "นิสัยประจำ", "ni-sai bpra-jam", "固定习惯", "名词", "偶尔习惯"],
  ["wen-bang-wan", "เว้นบางวัน", "wen baang wan", "隔几天；有些天不做", "短语", "偶尔习惯"],
  ["laaek-bplian-welaa", "แลกเปลี่ยนเวลา", "laaek bpliian we-laa", "调整时间；互换时间", "动词", "偶尔习惯"],
  ["khan-dtaawn", "ขั้นตอน", "khan dtaawn", "步骤；流程", "名词", "流程步骤"],
  ["lam-dap", "ลำดับ", "lam-dap", "顺序", "名词", "流程步骤"],
  ["rian-dtaam-lam-dap", "เรียงตามลำดับ", "riang dtaam lam-dap", "按顺序排列", "短语", "流程步骤"],
  ["tham-dtaam-khan-dtaawn", "ทำตามขั้นตอน", "tham dtaam khan dtaawn", "按步骤做", "短语", "流程步骤"],
  ["roem-jaak", "เริ่มจาก", "roem jaak", "从……开始", "句型", "流程步骤"],
  ["dtaaw-duai", "ต่อด้วย", "dtaaw duai", "接着用；接着是", "短语", "流程步骤"],
  ["sut-thaai", "สุดท้าย", "sut-thaai", "最后", "副词", "流程步骤"],
  ["khan-sut-thaai", "ขั้นสุดท้าย", "khan sut-thaai", "最后一步", "名词", "流程步骤"],
  ["tham-sam", "ทำซ้ำ", "tham sam", "重复做", "动词", "流程步骤"],
  ["thop-thuan", "ทบทวน", "thop thuan", "复习；回顾", "动词", "流程步骤"],
  ["dtuen-naawn", "ตื่นนอน", "dteun naawn", "起床", "动词", "日常流程"],
  ["lang-naa", "ล้างหน้า", "laang naa", "洗脸", "动词", "日常流程"],
  ["bpraaeng-fan", "แปรงฟัน", "bpraaeng fan", "刷牙", "动词", "日常流程"],
  ["gin-khaao-chao", "กินข้าวเช้า", "gin khaao chao", "吃早饭", "动词", "日常流程"],
  ["awk-jaak-baan", "ออกจากบ้าน", "awk jaak baan", "出门；离开家", "短语", "日常流程"],
  ["bpai-tham-ngaan", "ไปทำงาน", "bpai tham ngaan", "去上班", "短语", "日常流程"],
  ["phak-thiang", "พักเที่ยง", "phak thiang", "午休", "动词", "日常流程"],
  ["glap-baan", "กลับบ้าน", "glap baan", "回家", "动词", "日常流程"],
  ["gin-khaao-yen", "กินข้าวเย็น", "gin khaao yen", "吃晚饭", "动词", "日常流程"],
  ["khao-naawn", "เข้านอน", "khao naawn", "上床睡觉", "动词", "日常流程"],
  ["muea", "เมื่อ", "muea", "当……时；在……时候", "句型", "时间连接"],
  ["lang-jaak", "หลังจาก", "lang jaak", "在……之后", "句型", "时间连接"],
  ["gaawn-thii", "ก่อนที่", "gaawn thii", "在……之前", "句型", "时间连接"],
  ["phaa-nai", "ภายใน", "phaai nai", "在……以内", "短语", "时间连接"],
  ["dtang-dtae", "ตั้งแต่", "dtang dtae", "从……开始", "句型", "时间连接"],
  ["jon-thueng", "จนถึง", "jon thueng", "直到……", "句型", "时间连接"],
  ["ra-waang", "ระหว่าง", "ra-waang", "在……期间", "介词", "时间连接"],
  ["thaang-nii", "ทางนี้", "thaang nii", "这期间；这方面", "短语", "时间连接"],
  ["thuk-khrang-thii", "ทุกครั้งที่", "thuk khrang thii", "每次……的时候", "句型", "时间连接"],
  ["muea-rai-gaw", "เมื่อไรก็", "muea rai gaw", "什么时候都……", "句型", "时间连接"],
  ["raw", "รอ", "raaw", "等；等待", "动词", "等待结束"],
  ["raw-gaawn", "รอก่อน", "raaw gaawn", "先等一下", "短语", "等待结束"],
  ["raw-sak-khruu", "รอสักครู่", "raaw sak khruu", "请等片刻", "短语", "等待结束"],
  ["raw-nit-nueng", "รอนิดหนึ่ง", "raaw nit nueng", "等一下下", "短语", "等待结束"],
  ["mai-dtawng-raw", "ไม่ต้องรอ", "mai dtawng raaw", "不用等", "句型", "等待结束"],
  ["set", "เสร็จ", "set", "完成；做完", "动词", "等待结束"],
  ["set-laew", "เสร็จแล้ว", "set laew", "已经完成了", "句型", "等待结束"],
  ["yang-mai-set", "ยังไม่เสร็จ", "yang mai set", "还没完成", "句型", "等待结束"],
  ["glai-set", "ใกล้เสร็จ", "glai set", "快完成了", "短语", "等待结束"],
  ["set-than-welaa", "เสร็จทันเวลา", "set than we-laa", "及时完成", "短语", "等待结束"],
];

const relatedByTheme: Record<
  TimeSequenceRoutineTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  先后顺序: {
    synonym: "ก่อน / gaawn / 先、之前",
    antonym: "ทีหลัง / thii lang / 之后",
    comparison: "ก่อน 可表示先做或在之前；ทีหลัง 更像“之后再说”。",
    collocation: "กินข้าวก่อนแล้วค่อยไป / gin khaao gaawn laew khaawy bpai / 先吃饭再去",
  },
  同时: {
    synonym: "พร้อมกัน / phraawm gan / 同时、一起",
    antonym: "ทีละอย่าง / thii la yaang / 一件一件地",
    comparison: "พร้อมกัน 强调同一时间一起做，ระหว่างที่ 强调某事发生期间。",
    collocation: "ฟังไปด้วยเขียนไปด้วย / fang bpai duai khian bpai duai / 一边听一边写",
  },
  过去未来: {
    synonym: "เมื่อก่อน / muea gaawn / 以前",
    antonym: "ต่อไปนี้ / dtaaw bpai nii / 今后",
    comparison: "เมื่อก่อน 指过去常态，หลังจากนั้น 指某件事之后。",
    collocation: "หลังจากนั้นฉันกลับบ้าน / lang jaak nan chan glap baan / 那之后我回家",
  },
  刚刚马上: {
    synonym: "เมื่อกี้ / muea gii / 刚才",
    antonym: "อีกนาน / iik naan / 还要很久",
    comparison: "เพิ่ง 表示才刚刚，ทันที 表示立刻，เดี๋ยว 表示等一下。",
    collocation: "เดี๋ยวก็เสร็จ / diao gaw set / 马上就完成",
  },
  持续频率: {
    synonym: "เป็นประจำ / bpen bpra-jam / 经常、定期",
    antonym: "นาน ๆ ครั้ง / naan naan khrang / 很偶尔",
    comparison: "ตลอดเวลา 强调一直，ทุกครั้ง 强调每一次。",
    collocation: "ออกกำลังกายเป็นประจำ / awk gam-lang gaai bpen bpra-jam / 定期运动",
  },
  偶尔习惯: {
    synonym: "บางครั้ง / baang khrang / 有时候",
    antonym: "เสมอ / sa-moe / 总是",
    comparison: "บางครั้ง 是普通“有时候”，นาน ๆ ครั้ง 表示频率更低。",
    collocation: "บางครั้งฉันทำอาหารเอง / baang khrang chan tham aa-haan eng / 有时候我自己做饭",
  },
  流程步骤: {
    synonym: "ขั้นตอน / khan dtaawn / 步骤",
    antonym: "ไม่เป็นลำดับ / mai bpen lam-dap / 没有顺序",
    comparison: "ขั้นตอน 是步骤本身，ลำดับ 是排列顺序。",
    collocation: "ทำตามขั้นตอนทีละข้อ / tham dtaam khan dtaawn thii la khaaw / 按步骤一条一条做",
  },
  日常流程: {
    synonym: "กิจวัตร / git-ja-wat / 日常作息",
    antonym: "วันพิเศษ / wan phi-seet / 特别的一天",
    comparison: "这些表达多用于描述一天流程，动词后可接时间，如 ตอนเช้า、ตอนเย็น。",
    collocation: "ตื่นนอนแล้วแปรงฟัน / dteun naawn laew bpraaeng fan / 起床后刷牙",
  },
  时间连接: {
    synonym: "หลังจาก / lang jaak / 在……之后",
    antonym: "ก่อนที่ / gaawn thii / 在……之前",
    comparison: "หลังจาก 接已经发生或将发生的动作；ก่อนที่ 表示动作发生前。",
    collocation: "หลังจากเลิกงาน / lang jaak loek ngaan / 下班之后",
  },
  等待结束: {
    synonym: "รอสักครู่ / raaw sak khruu / 请等片刻",
    antonym: "เสร็จแล้ว / set laew / 已经完成",
    comparison: "รอ 是等待，เสร็จ 是完成；服务场景常一起出现。",
    collocation: "รอนิดหนึ่ง ใกล้เสร็จแล้ว / raaw nit nueng glai set laew / 稍等一下，快完成了",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ตอนเล่าเรื่องกิจวัตรประจำวัน ฉันใช้คำว่า “${row[1]}” เพื่อบอกเวลา ลำดับ หรือความถี่ให้ชัดเจน`,
  roman: `dtaawn lao rueang git-ja-wat bpra-jam wan chan chai kham waa "${row[2]}" phuea baawk we-laa lam-dap rue khwaam-thii hai chat-jen`,
  chinese: `讲日常流程时，我会用“${row[1]}”来把时间、顺序或频率说清楚。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "时间顺序流程", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 时间顺序和日常流程表达。适合描述先后、同时、频率、等待和完成；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: TIME_SEQUENCE_ROUTINE_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_TIME_SEQUENCE_ROUTINE_02: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
