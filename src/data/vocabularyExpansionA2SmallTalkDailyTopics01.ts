export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "日常闲聊" | "天气" | "工作学习" | "吃饭" | "周末" | "家人" | "兴趣" | "近况" | "礼貌追问" | "回应";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionExample[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
};
export type VocabularyExpansionCandidate = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  level: "a2";
  priority: number;
  senses: VocabularyExpansionSense[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

type Definition = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  exampleThai: string;
  exampleRoman: string;
  exampleChinese: string;
  tag: string;
};

type Topic = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const SMALL_TALK_DAILY_TOPICS_REFS = ["thai-frequency", "thai-a2-small-talk-daily-topics-candidate"];

const topics: readonly Topic[] = [
  { thai: "อากาศแถวบ้านคุณ", roman: "aa-gaat thaeo baan khun", chinese: "你家附近的天气", id: "aa-gaat-thaeo-baan-khun", theme: "天气" },
  { thai: "ฝนเมื่อเช้า", roman: "fon muea-chaao", chinese: "早上的雨", id: "fon-muea-chaao", theme: "天气" },
  { thai: "แดดตอนเที่ยง", roman: "daaet dtaawn thiiang", chinese: "中午的太阳", id: "daaet-dtaawn-thiiang", theme: "天气" },
  { thai: "งานช่วงนี้", roman: "ngaan chuuang nii", chinese: "最近的工作", id: "ngaan-chuuang-nii", theme: "工作学习" },
  { thai: "บทเรียนวันนี้", roman: "bot-riian wan-nii", chinese: "今天的课", id: "bot-riian-wan-nii", theme: "工作学习" },
  { thai: "การบ้านเมื่อคืน", roman: "gaan-baan muea-kheun", chinese: "昨晚的作业", id: "gaan-baan-muea-kheun", theme: "工作学习" },
  { thai: "อาหารกลางวันวันนี้", roman: "aa-haan glaang-wan wan-nii", chinese: "今天的午饭", id: "aa-haan-glaang-wan-wan-nii", theme: "吃饭" },
  { thai: "ร้านกาแฟใหม่", roman: "raan gaa-faae mai", chinese: "新咖啡店", id: "raan-gaa-faae-mai", theme: "吃饭" },
  { thai: "มื้อเย็นที่บ้าน", roman: "meu yen thii baan", chinese: "家里的晚饭", id: "meu-yen-thii-baan", theme: "吃饭" },
  { thai: "แผนวันเสาร์", roman: "phaaen wan sao", chinese: "周六计划", id: "phaaen-wan-sao", theme: "周末" },
  { thai: "วันหยุดที่ผ่านมา", roman: "wan-yut thii phaan maa", chinese: "刚过去的假日", id: "wan-yut-thii-phaan-maa", theme: "周末" },
  { thai: "ที่เที่ยวใกล้บ้าน", roman: "thii thiao glai baan", chinese: "家附近的游玩地方", id: "thii-thiao-glai-baan", theme: "周末" },
  { thai: "ครอบครัวของคุณ", roman: "khraawp-khrua khaawng khun", chinese: "你的家人", id: "khraawp-khrua-khaawng-khun", theme: "家人" },
  { thai: "สุขภาพของพ่อแม่", roman: "suk-kha-phaap khaawng phaaw maae", chinese: "父母的健康", id: "suk-kha-phaap-khaawng-phaaw-maae", theme: "家人" },
  { thai: "น้องที่โรงเรียน", roman: "naawng thii roong-riian", chinese: "在学校的弟妹/小孩", id: "naawng-thii-roong-riian", theme: "家人" },
  { thai: "งานอดิเรกใหม่", roman: "ngaan a-di-reek mai", chinese: "新的爱好", id: "ngaan-a-di-reek-mai", theme: "兴趣" },
  { thai: "เพลงที่ชอบช่วงนี้", roman: "phleeng thii chaawp chuuang nii", chinese: "最近喜欢的歌", id: "phleeng-thii-chaawp-chuuang-nii", theme: "兴趣" },
  { thai: "หนังที่ดูเมื่อคืน", roman: "nang thii duu muea-kheun", chinese: "昨晚看的电影", id: "nang-thii-duu-muea-kheun", theme: "兴趣" },
  { thai: "หนังสือที่อ่านอยู่", roman: "nang-sue thii aan yuu", chinese: "正在读的书", id: "nang-sue-thii-aan-yuu", theme: "兴趣" },
  { thai: "การออกกำลังกายตอนเย็น", roman: "gaan aawk-gam-lang-gaai dtaawn yen", chinese: "傍晚运动", id: "gaan-aawk-gam-lang-gaai-dtaawn-yen", theme: "兴趣" },
  { thai: "เรื่องดี ๆ วันนี้", roman: "rueang dii dii wan-nii", chinese: "今天的好事", id: "rueang-dii-dii-wan-nii", theme: "近况" },
  { thai: "เรื่องยุ่ง ๆ ช่วงนี้", roman: "rueang yung yung chuuang nii", chinese: "最近忙乱的事", id: "rueang-yung-yung-chuuang-nii", theme: "近况" },
  { thai: "การเดินทางตอนเช้า", roman: "gaan doen-thaang dtaawn chaao", chinese: "早上的通勤", id: "gaan-doen-thaang-dtaawn-chaao", theme: "近况" },
  { thai: "ร้านใกล้บ้าน", roman: "raan glai baan", chinese: "家附近的店", id: "raan-glai-baan", theme: "日常闲聊" },
  { thai: "เพื่อนใหม่ในชั้นเรียน", roman: "phuean mai nai chan-riian", chinese: "班里的新朋友", id: "phuean-mai-nai-chan-riian", theme: "日常闲聊" },
  { thai: "ข่าวดีของคุณ", roman: "khaao dii khaawng khun", chinese: "你的好消息", id: "khaao-dii-khaawng-khun", theme: "近况" },
];

const directRows: readonly Definition[] = [
  { thai: "ช่วงนี้เป็นอย่างไรบ้างคะ", id: "chuuang-nii-bpen-yaang-rai-baang-kha", roman: "chuuang nii bpen yaang-rai baang kha", chinese: "最近怎么样？（女性礼貌）", partOfSpeech: "短语", theme: "近况", exampleThai: "ไม่ได้เจอกันนาน ฉันถามว่า ช่วงนี้เป็นอย่างไรบ้างคะ", exampleRoman: "mai dai jooe gan naan, chan thaam waa chuuang nii bpen yaang-rai baang kha", exampleChinese: "好久不见，我问：“最近怎么样？”", tag: "寒暄" },
  { thai: "ช่วงนี้สบายดีครับ", id: "chuuang-nii-sa-baai-dii-khrap", roman: "chuuang nii sa-baai dii khrap", chinese: "最近挺好（男性礼貌）", partOfSpeech: "短语", theme: "回应", exampleThai: "เขาตอบว่า ช่วงนี้สบายดีครับ ขอบคุณครับ", exampleRoman: "khao dtaawp waa chuuang nii sa-baai dii khrap, khaawp-khun khrap", exampleChinese: "他回答：“最近挺好，谢谢。”", tag: "回应" },
  { thai: "ก็เรื่อย ๆ ค่ะ", id: "gaw-reuuai-reuuai-kha", roman: "gaw reuuai reuuai kha", chinese: "还行吧（女性礼貌）", partOfSpeech: "短语", theme: "回应", exampleThai: "เมื่อเพื่อนถาม ฉันตอบว่าก็เรื่อย ๆ ค่ะ", exampleRoman: "muea phuean thaam, chan dtaawp waa gaw reuuai reuuai kha", "exampleChinese": "朋友问我时，我回答：“还行吧。”", tag: "回应" },
  { thai: "วันนี้ยุ่งนิดหน่อย", id: "wan-nii-yung-nit-naawy", roman: "wan-nii yung nit naawy", chinese: "今天有点忙", partOfSpeech: "短语", theme: "近况", exampleThai: "วันนี้ยุ่งนิดหน่อย แต่ยังพอมีเวลาคุย", exampleRoman: "wan-nii yung nit naawy, dtaae yang phaaw mii wee-laa khui", exampleChinese: "今天有点忙，但还有时间聊一下。", tag: "近况" },
  { thai: "ฟังดูน่าสนุกนะ", id: "fang-duu-naa-sa-nuk-na", roman: "fang duu naa sa-nuk na", chinese: "听起来很有趣哦", partOfSpeech: "短语", theme: "礼貌追问", exampleThai: "เพื่อนเล่าเรื่องเที่ยว ฉันพูดว่าฟังดูน่าสนุกนะ", exampleRoman: "phuean lao rueang thiao, chan phuut waa fang duu naa sa-nuk na", exampleChinese: "朋友讲旅行的事，我说：“听起来很有趣哦。”", tag: "追问" },
  { thai: "แล้วคุณล่ะช่วงนี้", id: "laaeo-khun-la-chuuang-nii", roman: "laaeo khun la chuuang nii", chinese: "那你呢，最近怎么样", partOfSpeech: "短语", theme: "礼貌追问", exampleThai: "ฉันตอบแล้วถามกลับว่า แล้วคุณล่ะช่วงนี้", exampleRoman: "chan dtaawp laaeo thaam glap waa laaeo khun la chuuang nii", exampleChinese: "我回答后反问：“那你呢，最近怎么样？”", tag: "追问" },
  { thai: "จริงเหรอ เล่าอีกหน่อย", id: "jing-rooe-lao-iik-naawy", roman: "jing rooe, lao iik naawy", chinese: "真的吗？再讲一点", partOfSpeech: "短语", theme: "礼貌追问", exampleThai: "เมื่อฟังเรื่องใหม่ ฉันถามว่า จริงเหรอ เล่าอีกหน่อย", exampleRoman: "muea fang rueang mai, chan thaam waa jing rooe, lao iik naawy", exampleChinese: "听到新鲜事时，我问：“真的吗？再讲一点。”", tag: "追问" },
  { thai: "ดีใจที่ได้ยินแบบนั้น", id: "dii-jai-thii-dai-yin-baaep-nan", roman: "dii-jai thii dai-yin baaep nan", chinese: "听到那样我很高兴", partOfSpeech: "短语", theme: "回应", exampleThai: "เพื่อนบอกข่าวดี ฉันพูดว่าดีใจที่ได้ยินแบบนั้น", exampleRoman: "phuean baawk khaao dii, chan phuut waa dii-jai thii dai-yin baaep nan", exampleChinese: "朋友告诉我好消息，我说：“听到那样我很高兴。”", tag: "回应" },
  { thai: "พักบ้างนะ อย่าเหนื่อยเกินไป", id: "phak-baang-na-yaa-neuuai-goen-bpai", roman: "phak baang na, yaa neuuai goen bpai", chinese: "也休息一下，别太累", partOfSpeech: "短语", theme: "回应", exampleThai: "เมื่อเพื่อนบอกว่างานเยอะ ฉันพูดว่าพักบ้างนะ อย่าเหนื่อยเกินไป", exampleRoman: "muea phuean baawk waa ngaan yoe, chan phuut waa phak baang na, yaa neuuai goen bpai", exampleChinese: "朋友说工作多时，我说：“也休息一下，别太累。”", tag: "回应" },
  { thai: "ไว้คุยกันอีกนะ", id: "wai-khui-gan-iik-na", roman: "wai khui gan iik na", chinese: "改天再聊哦", partOfSpeech: "短语", theme: "回应", exampleThai: "ก่อนวางสาย เพื่อนพูดว่าไว้คุยกันอีกนะ", exampleRoman: "gaawn waang saai, phuean phuut waa wai khui gan iik na", exampleChinese: "挂电话前，朋友说：“改天再聊哦。”", tag: "回应" },
  { thai: "ช่วงนี้กินอะไรอร่อยบ้าง", id: "chuuang-nii-gin-a-rai-a-raawy-baang", roman: "chuuang nii gin a-rai a-raawy baang", chinese: "最近吃了什么好吃的吗", partOfSpeech: "短语", theme: "吃饭", exampleThai: "ตอนพักกลางวัน ฉันถามเพื่อนว่า ช่วงนี้กินอะไรอร่อยบ้าง", exampleRoman: "dtaawn phak glaang-wan, chan thaam phuean waa chuuang nii gin a-rai a-raawy baang", exampleChinese: "午休时，我问朋友：“最近吃了什么好吃的吗？”", tag: "闲聊提问" },
  { thai: "เสาร์นี้มีแผนอะไรไหม", id: "sao-nii-mii-phaaen-a-rai-mai", roman: "sao nii mii phaaen a-rai mai", chinese: "这个周六有什么计划吗", partOfSpeech: "短语", theme: "周末", exampleThai: "ก่อนกลับบ้าน ฉันถามว่า เสาร์นี้มีแผนอะไรไหม", exampleRoman: "gaawn glap baan, chan thaam waa sao nii mii phaaen a-rai mai", exampleChinese: "回家前，我问：“这个周六有什么计划吗？”", tag: "闲聊提问" },
  { thai: "ครอบครัวสบายดีไหมช่วงนี้", id: "khraawp-khrua-sa-baai-dii-mai-chuuang-nii", roman: "khraawp-khrua sa-baai dii mai chuuang nii", chinese: "最近家人都好吗", partOfSpeech: "短语", theme: "家人", exampleThai: "ฉันถามเพื่อนเก่าว่า ครอบครัวสบายดีไหมช่วงนี้", exampleRoman: "chan thaam phuean gao waa khraawp-khrua sa-baai dii mai chuuang nii", exampleChinese: "我问老朋友：“最近家人都好吗？”", tag: "闲聊提问" },
  { thai: "ช่วงนี้ยังชอบฟังเพลงไหม", id: "chuuang-nii-yang-chaawp-fang-phleeng-mai", roman: "chuuang nii yang chaawp fang phleeng mai", chinese: "最近还喜欢听歌吗", partOfSpeech: "短语", theme: "兴趣", exampleThai: "ฉันรู้ว่าเขาชอบเพลง จึงถามว่าช่วงนี้ยังชอบฟังเพลงไหม", exampleRoman: "chan ruu waa khao chaawp phleeng, jeung thaam waa chuuang nii yang chaawp fang phleeng mai", exampleChinese: "我知道他喜欢音乐，所以问：“最近还喜欢听歌吗？”", tag: "闲聊提问" },
  { thai: "วันนี้เรียนเหนื่อยไหม", id: "wan-nii-riian-neuuai-mai", roman: "wan-nii riian neuuai mai", chinese: "今天学习累吗", partOfSpeech: "短语", theme: "工作学习", exampleThai: "แม่ถามลูกว่า วันนี้เรียนเหนื่อยไหม", exampleRoman: "maae thaam luuk waa wan-nii riian neuuai mai", exampleChinese: "妈妈问孩子：“今天学习累吗？”", tag: "闲聊提问" },
  { thai: "งานวันนี้ผ่านไปด้วยดีไหม", id: "ngaan-wan-nii-phaan-bpai-duai-dii-mai", roman: "ngaan wan-nii phaan bpai duai dii mai", chinese: "今天工作顺利吗", partOfSpeech: "短语", theme: "工作学习", exampleThai: "ตอนเย็นฉันถามพี่ว่า งานวันนี้ผ่านไปด้วยดีไหม", exampleRoman: "dtaawn yen chan thaam phii waa ngaan wan-nii phaan bpai duai dii mai", exampleChinese: "傍晚我问哥哥/姐姐：“今天工作顺利吗？”", tag: "闲聊提问" },
  { thai: "ฟังแล้วดีใจแทนเลย", id: "fang-laaeo-dii-jai-thaaen-loei", roman: "fang laaeo dii-jai thaaen loei", chinese: "听了真替你高兴", partOfSpeech: "短语", theme: "回应", exampleThai: "เมื่อเพื่อนเล่าข่าวดี ฉันพูดว่าฟังแล้วดีใจแทนเลย", exampleRoman: "muea phuean lao khaao dii, chan phuut waa fang laaeo dii-jai thaaen loei", exampleChinese: "朋友讲好消息时，我说：“听了真替你高兴。”", tag: "回应" },
  { thai: "ถ้าว่างค่อยเล่าต่อก็ได้", id: "thaa-waang-khaawy-lao-dtaaw-gaw-dai", roman: "thaa waang khaawy lao dtaaw gaw dai", chinese: "有空再继续讲也可以", partOfSpeech: "短语", theme: "礼貌追问", exampleThai: "ถ้าเพื่อนยุ่ง ฉันพูดว่าถ้าว่างค่อยเล่าต่อก็ได้", exampleRoman: "thaa phuean yung, chan phuut waa thaa waang khaawy lao dtaaw gaw dai", exampleChinese: "如果朋友忙，我说：“有空再继续讲也可以。”", tag: "追问" },
];

const askRows = topics.map((topic): Definition => ({
  thai: `ช่วงนี้${topic.thai}เป็นอย่างไรบ้าง`,
  id: `chuuang-nii-${topic.id}-bpen-yaang-rai-baang`,
  roman: `chuuang nii ${topic.roman} bpen yaang-rai baang`,
  chinese: `最近${topic.chinese}怎么样`,
  partOfSpeech: "短语",
  theme: topic.theme,
  exampleThai: `เจอเพื่อนแล้วฉันถามว่า ช่วงนี้${topic.thai}เป็นอย่างไรบ้าง`,
  exampleRoman: `jooe phuean laaeo chan thaam waa chuuang nii ${topic.roman} bpen yaang-rai baang`,
  exampleChinese: `见到朋友后，我问：“最近${topic.chinese}怎么样？”`,
  tag: "闲聊提问",
}));

const followRows = topics.map((topic): Definition => ({
  thai: `เล่าเรื่อง${topic.thai}ให้ฟังหน่อย`,
  id: `lao-rueang-${topic.id}-hai-fang-naawy`,
  roman: `lao rueang ${topic.roman} hai fang naawy`,
  chinese: `讲讲${topic.chinese}给我听`,
  partOfSpeech: "短语",
  theme: "礼貌追问",
  exampleThai: `ฉันสนใจ จึงถามว่า เล่าเรื่อง${topic.thai}ให้ฟังหน่อย`,
  exampleRoman: `chan son-jai, jeung thaam waa lao rueang ${topic.roman} hai fang naawy`,
  exampleChinese: `我感兴趣，所以问：“讲讲${topic.chinese}给我听。”`,
  tag: "追问",
}));

const responseRows = topics.map((topic): Definition => ({
  thai: `เรื่อง${topic.thai}ก็ดีนะ`,
  id: `rueang-${topic.id}-gaw-dii-na`,
  roman: `rueang ${topic.roman} gaw dii na`,
  chinese: `${topic.chinese}还不错哦`,
  partOfSpeech: "短语",
  theme: "回应",
  exampleThai: `เมื่อเพื่อนถาม ฉันตอบว่า เรื่อง${topic.thai}ก็ดีนะ`,
  exampleRoman: `muea phuean thaam, chan dtaawp waa rueang ${topic.roman} gaw dii na`,
  exampleChinese: `朋友问时，我回答：“${topic.chinese}还不错哦。”`,
  tag: "回应",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...askRows,
  ...followRows,
  ...responseRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "日常闲聊", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 闲聊可先用“最近……怎么样”“讲讲……”“……还不错”三组句框轮换。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于日常闲聊、天气、工作学习、吃饭、周末、家人、兴趣、近况、礼貌追问和回应。"],
    tags,
    sourceRefs: SMALL_TALK_DAILY_TOPICS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SMALL_TALK_DAILY_TOPICS_01 = rows.map(toCandidate);
