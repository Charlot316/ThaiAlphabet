const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar", "fsi-thai-basic"];
const QUESTION_REFS = ["thai-reference-questions", "complete-thai-a1", "into-asia-grammar"];
const POLITE_REFS = ["thai-reference-polite-particles", "complete-thai-a1", "into-asia-grammar"];
const DISCOURSE_REFS = ["complete-thai-a1", "into-asia-grammar", "cambridge-reference-grammar-toc"];
const LEXICON_REFS = ["thai-frequency", "wiktionary-thai-frequency", "phupha-wordfreq", "pythainlp-corpus"];

export type VocabularyExpansionZhExample = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionZhRelated = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionZhComparison = {
  target: VocabularyExpansionZhRelated;
  distinctionZh: string;
};

export type VocabularyExpansionZhCollocation = {
  thai: string;
  roman: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionZhSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionZhExample[];
  usageNotesZh?: string[];
};

export type VocabularyExpansionCandidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: "助词" | "副词" | "连接词" | "短语" | "话语标记" | "时间表达" | "疑问框架" | "数量词";
  theme:
    | "语气"
    | "话语"
    | "时间体"
    | "连接"
    | "因果"
    | "对比"
    | "数量"
    | "频率"
    | "疑问"
    | "回应"
    | "情态"
    | "条件"
    | "程度";
  level: "a1" | "a2";
  priority: number;
  senses: VocabularyExpansionZhSense[];
  synonyms: VocabularyExpansionZhRelated[];
  antonyms: VocabularyExpansionZhRelated[];
  comparisons: VocabularyExpansionZhComparison[];
  collocations: VocabularyExpansionZhCollocation[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

export const VOCABULARY_EXPANSION_A2_CONNECTORS_PARTICLES_02 = [
  {
    id: "kha-question-polite",
    thai: "คะ",
    roman: "kha",
    chinese: "女性疑问礼貌句末词",
    partOfSpeech: "助词",
    theme: "语气",
    level: "a1",
    priority: 2001,
    senses: [
      {
        id: "female-question-polite",
        chinese: "女性说话者用于疑问句、呼唤或礼貌确认，使语气柔和",
        examples: [
          {
            thai: "ขอโทษนะคะ รถเมล์คันนี้ไปสถานีรถไฟไหมคะ",
            roman: "khaaw-thoot na kha rot-mee khan nii bpai sa-thaa-nii rot-fai mai kha",
            chinese: "不好意思，这辆公交车去火车站吗？",
          },
        ],
        usageNotesZh: ["คะ 常用于女性疑问句；陈述或回答常用 ค่ะ。"],
      },
    ],
    synonyms: [{ thai: "ค่ะ", roman: "kha", chinese: "女性陈述礼貌句末词" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "ค่ะ", roman: "kha", chinese: "女性陈述礼貌句末词" }, distinctionZh: "คะ 多用于问题；ค่ะ 多用于回答或陈述。" },
    ],
    collocations: [
      { thai: "ไหมคะ", roman: "mai kha", chinese: "……吗（女性礼貌）" },
      { thai: "นะคะ", roman: "na kha", chinese: "柔和提醒或请求（女性礼貌）" },
    ],
    tags: ["礼貌", "女性说话者", "疑问"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ha-male-soft",
    thai: "ฮะ",
    roman: "ha",
    chinese: "男性口语礼貌语气词",
    partOfSpeech: "助词",
    theme: "语气",
    level: "a2",
    priority: 2002,
    senses: [
      {
        id: "casual-male-politeness",
        chinese: "男性说话者在口语中使用，礼貌但比 ครับ 更随意",
        examples: [
          {
            thai: "ผมขอถามอีกนิดได้ไหมฮะ เพราะยังไม่เข้าใจคำสุดท้าย",
            roman: "phom khaaw thaam iik nit dai mai ha phraw yang mai khao-jai kham sut-thaai",
            chinese: "我可以再问一点吗？因为还不懂最后那个词。",
          },
        ],
        usageNotesZh: ["ฮะ 常见于较轻松场合；正式场合用 ครับ 更稳妥。"],
      },
    ],
    synonyms: [{ thai: "ครับ", roman: "khrap", chinese: "男性礼貌句末词" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "ครับ", roman: "khrap", chinese: "男性礼貌句末词" }, distinctionZh: "ฮะ 更口语、更轻；ครับ 更标准礼貌。" },
    ],
    collocations: [
      { thai: "ได้ไหมฮะ", roman: "dai mai ha", chinese: "可以吗（男性口语）" },
      { thai: "ขอบคุณฮะ", roman: "khop-khun ha", chinese: "谢谢（男性口语）" },
    ],
    tags: ["礼貌", "口语", "男性说话者"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ja-soft-statement",
    thai: "จ้ะ",
    roman: "ja",
    chinese: "亲切柔和句末词",
    partOfSpeech: "助词",
    theme: "语气",
    level: "a2",
    priority: 2003,
    senses: [
      {
        id: "warm-soft-statement",
        chinese: "用于亲近关系中，使回答、提醒或说明显得温柔亲切",
        examples: [
          {
            thai: "เดี๋ยวแม่ช่วยดูการบ้านให้นะจ้ะ แต่ลูกลองทำเองก่อน",
            roman: "diaao maae chuai duu gaan-baan hai na ja dtaae luuk laawng tham eeng gaawn",
            chinese: "等一下妈妈帮你看作业哦，不过你先自己试着做。",
          },
        ],
        usageNotesZh: ["จ้ะ 常由长辈或亲近的人使用，正式商务场合少用。"],
      },
    ],
    synonyms: [{ thai: "จ้า", roman: "jaa", chinese: "亲切口语语气词" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "ค่ะ", roman: "kha", chinese: "女性礼貌句末词" }, distinctionZh: "จ้ะ 更亲近；ค่ะ 更中性礼貌。" },
    ],
    collocations: [
      { thai: "นะจ้ะ", roman: "na ja", chinese: "亲切提醒" },
      { thai: "ได้จ้ะ", roman: "dai ja", chinese: "可以呀" },
    ],
    tags: ["亲切", "口语", "句末词"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ja-question-warm",
    thai: "จ๊ะ",
    roman: "ja",
    chinese: "亲切疑问句末词",
    partOfSpeech: "助词",
    theme: "语气",
    level: "a2",
    priority: 2004,
    senses: [
      {
        id: "warm-question",
        chinese: "亲近关系中用于疑问或呼唤，语气柔和亲切",
        examples: [
          {
            thai: "วันนี้อยากกินข้าวที่บ้านหรือไปตลาดกับแม่จ๊ะ",
            roman: "wan-nii yaak gin khaao thii baan rue bpai dta-laat gap maae ja",
            chinese: "今天想在家吃饭，还是和妈妈去市场呀？",
          },
        ],
        usageNotesZh: ["จ๊ะ 与 จ้ะ 常按语调和句型区分，初学者可先把它记作亲切口语。"],
      },
    ],
    synonyms: [{ thai: "จ้ะ", roman: "ja", chinese: "亲切陈述句末词" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "คะ", roman: "kha", chinese: "女性疑问礼貌词" }, distinctionZh: "จ๊ะ 亲近感强；คะ 更通用礼貌。" },
    ],
    collocations: [
      { thai: "ใช่ไหมจ๊ะ", roman: "chai mai ja", chinese: "对吗呀" },
      { thai: "อะไรจ๊ะ", roman: "arai ja", chinese: "什么呀" },
    ],
    tags: ["亲切", "疑问", "口语"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jaa-warm-response",
    thai: "จ้า",
    roman: "jaa",
    chinese: "亲切应答语气词",
    partOfSpeech: "助词",
    theme: "回应",
    level: "a2",
    priority: 2005,
    senses: [
      {
        id: "friendly-answer",
        chinese: "用于亲切回答、答应或拉近距离，常见于熟人对话",
        examples: [
          {
            thai: "ได้จ้า เดี๋ยวพี่ส่งลิงก์บทเรียนให้หลังประชุมเสร็จ",
            roman: "dai jaa diaao phii song ling bot-riian hai lang bpra-chum set",
            chinese: "可以呀，等哥哥/姐姐开完会就把课程链接发给你。",
          },
        ],
        usageNotesZh: ["จ้า 很口语，亲切但不适合所有正式关系。"],
      },
    ],
    synonyms: [{ thai: "จ้ะ", roman: "ja", chinese: "亲切柔和语气词" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "ครับ", roman: "khrap", chinese: "男性礼貌句末词" }, distinctionZh: "จ้า 不限于男性礼貌身份，主要表达亲切口语感。" },
    ],
    collocations: [
      { thai: "ขอบคุณจ้า", roman: "khop-khun jaa", chinese: "谢谢呀" },
      { thai: "โอเคจ้า", roman: "oo-khee jaa", chinese: "好呀" },
    ],
    tags: ["回应", "亲切", "口语"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khrap-phom",
    thai: "ครับผม",
    roman: "khrap phom",
    chinese: "好的；是的（男性恭敬回答）",
    partOfSpeech: "短语",
    theme: "回应",
    level: "a1",
    priority: 2006,
    senses: [
      {
        id: "respectful-male-acknowledgement",
        chinese: "男性说话者用于恭敬确认、答应或表示听到指示",
        examples: [
          {
            thai: "ครับผม ผมจะส่งการบ้านก่อนห้าโมงเย็นวันนี้",
            roman: "khrap phom phom ja song gaan-baan gaawn haa moong yen wan-nii",
            chinese: "好的，我会在今天下午五点前交作业。",
          },
        ],
        usageNotesZh: ["ครับผม 比单独 ครับ 更有恭敬和服从感。"],
      },
    ],
    synonyms: [{ thai: "ครับ", roman: "khrap", chinese: "是的；好的（男性礼貌）" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "ครับ", roman: "khrap", chinese: "男性礼貌句末词" }, distinctionZh: "ครับผม 更像完整应答；ครับ 可作一般句末礼貌词。" },
    ],
    collocations: [
      { thai: "ได้ครับผม", roman: "dai khrap phom", chinese: "可以的；好的" },
      { thai: "ขอบคุณครับผม", roman: "khop-khun khrap phom", chinese: "谢谢您" },
    ],
    tags: ["回应", "男性说话者", "礼貌"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "lae-emphasis",
    thai: "แหละ",
    roman: "lae",
    chinese: "就是；正是（强调语气）",
    partOfSpeech: "助词",
    theme: "话语",
    level: "a2",
    priority: 2007,
    senses: [
      {
        id: "emphatic-identification",
        chinese: "句末或短语后加强确认，表示“就是这个、正是这样”",
        examples: [
          {
            thai: "คำนี้แหละที่ฉันได้ยินบ่อยในบทสนทนาของคนไทย",
            roman: "kham nii lae thii chan dai-yin baawy nai bot-son-tha-naa khaawng khon thai",
            chinese: "就是这个词，我在泰国人的对话里经常听到。",
          },
        ],
        usageNotesZh: ["แหละ 常有口语强调感，不一定需要逐字翻译。"],
      },
    ],
    synonyms: [{ thai: "นั่นแหละ", roman: "nan lae", chinese: "就是那样；正是" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "เอง", roman: "eeng", chinese: "自己；本身；就" }, distinctionZh: "แหละ 强调确认；เอง 强调自身或限定。" },
    ],
    collocations: [
      { thai: "นี่แหละ", roman: "nii lae", chinese: "就是这个" },
      { thai: "อย่างนี้แหละ", roman: "yaang nii lae", chinese: "就是这样" },
    ],
    tags: ["强调", "口语", "句末词"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "raawk-soft-negation",
    thai: "หรอก",
    roman: "raawk",
    chinese: "啦；呢（常软化否定或纠正）",
    partOfSpeech: "助词",
    theme: "语气",
    level: "a2",
    priority: 2008,
    senses: [
      {
        id: "soften-negation-correction",
        chinese: "常和否定句连用，减轻纠正、安慰或反驳的生硬感",
        examples: [
          {
            thai: "ไม่ยากหรอก ถ้าคุณฝึกอ่านทีละประโยคทุกวัน",
            roman: "mai yaak raawk thaa khun fuek aan thii-la bpra-yook thuk wan",
            chinese: "不难啦，如果你每天一句一句练习读。",
          },
        ],
        usageNotesZh: ["ไม่...หรอก 常表示“不……啦/不会……的”，语气比直接否定柔和。"],
      },
    ],
    synonyms: [{ thai: "หรอกนะ", roman: "raawk na", chinese: "不是……啦；不会……的" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "เลย", roman: "loei", chinese: "完全；一点也" }, distinctionZh: "หรอก 软化否定；เลย 在否定中加强“一点也不”。" },
    ],
    collocations: [
      { thai: "ไม่ใช่หรอก", roman: "mai chai raawk", chinese: "不是啦" },
      { thai: "ไม่เป็นไรหรอก", roman: "mai bpen rai raawk", chinese: "没关系啦" },
    ],
    tags: ["否定", "柔化", "口语"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "mang-guess",
    thai: "มั้ง",
    roman: "mang",
    chinese: "大概吧；也许吧",
    partOfSpeech: "助词",
    theme: "语气",
    level: "a2",
    priority: 2009,
    senses: [
      {
        id: "tentative-guess",
        chinese: "放在句末表示不确定的推测，语气随意",
        examples: [
          {
            thai: "เขาน่าจะมาช้าหน่อยมั้ง เพราะฝนตกหนักตั้งแต่เช้า",
            roman: "khao naa-ja maa chaa naawy mang phraw fon dtok nak dtang-dtaae chaao",
            chinese: "他大概会晚一点到吧，因为从早上开始雨就下得很大。",
          },
        ],
        usageNotesZh: ["มั้ง 是口语推测，正式说明中应换成 อาจจะ 或 น่าจะ。"],
      },
    ],
    synonyms: [{ thai: "อาจจะ", roman: "aat-ja", chinese: "可能；也许" }],
    antonyms: [{ thai: "แน่นอน", roman: "naae-naawn", chinese: "确定；当然" }],
    comparisons: [
      { target: { thai: "น่าจะ", roman: "naa-ja", chinese: "应该会；大概" }, distinctionZh: "มั้ง 更随意且不确定；น่าจะ 稍有根据。" },
    ],
    collocations: [
      { thai: "ใช่มั้ง", roman: "chai mang", chinese: "大概是吧" },
      { thai: "คงมั้ง", roman: "khong mang", chinese: "可能吧" },
    ],
    tags: ["推测", "口语", "句末词"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "nii-naa-reminder",
    thai: "นี่นา",
    roman: "nii naa",
    chinese: "嘛；不是……吗（提醒语气）",
    partOfSpeech: "助词",
    theme: "话语",
    level: "a2",
    priority: 2010,
    senses: [
      {
        id: "shared-knowledge-reminder",
        chinese: "提醒对方某事本来就知道或很明显，带口语感",
        examples: [
          {
            thai: "วันนี้เรามีนัดเรียนออนไลน์ตอนสองทุ่มนี่นา อย่าลืมเปิดคอมก่อนเวลา",
            roman: "wan-nii rao mii nat riian awn-lai dtaawn saawng thum nii naa yaa luuem bpoet khaawm gaawn wee-laa",
            chinese: "今天我们不是晚上八点有线上课嘛，别忘了提前打开电脑。",
          },
        ],
        usageNotesZh: ["นี่นา 常带“这不是很明显吗”的提醒感，使用时注意语气。"],
      },
    ],
    synonyms: [{ thai: "นี่", roman: "nii", chinese: "这；提示语气" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "นะ", roman: "na", chinese: "柔和提醒" }, distinctionZh: "นี่นา 更像提醒已知事实；นะ 更广泛地柔化语气。" },
    ],
    collocations: [
      { thai: "ก็...นี่นา", roman: "gaw...nii naa", chinese: "可是本来就……嘛" },
      { thai: "บอกแล้วนี่นา", roman: "baawk laaeo nii naa", chinese: "不是已经说过了吗" },
    ],
    tags: ["提醒", "口语", "话语"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "nia-focus",
    thai: "เนี่ย",
    roman: "nia",
    chinese: "这个呀；就是这个（口语提示）",
    partOfSpeech: "助词",
    theme: "话语",
    level: "a2",
    priority: 2011,
    senses: [
      {
        id: "spoken-focus",
        chinese: "口语中突出眼前话题、强调或引起注意",
        examples: [
          {
            thai: "ประโยคนี้เนี่ย ต้องฟังช้า ๆ ถึงจะได้ยินเสียงท้ายคำชัด",
            roman: "bpra-yook nii nia dtawng fang chaa chaa thueng ja dai-yin siang thaai kham chat",
            chinese: "这个句子呀，得慢慢听，才听得清词尾音。",
          },
        ],
        usageNotesZh: ["เนี่ย 常见口语，不宜在正式写作中频繁使用。"],
      },
    ],
    synonyms: [{ thai: "นี่", roman: "nii", chinese: "这；提示话题" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "นี้", roman: "nii", chinese: "这个" }, distinctionZh: "นี้ 是标准指示词；เนี่ย 是口语话题提示。" },
    ],
    collocations: [
      { thai: "ตรงนี้เนี่ย", roman: "dtrong nii nia", chinese: "就是这里呀" },
      { thai: "คำนี้เนี่ย", roman: "kham nii nia", chinese: "这个词呀" },
    ],
    tags: ["口语", "话题提示", "强调"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "eeng-self-only",
    thai: "เอง",
    roman: "eeng",
    chinese: "自己；本身；就",
    partOfSpeech: "助词",
    theme: "话语",
    level: "a1",
    priority: 2012,
    senses: [
      {
        id: "self-or-limiting",
        chinese: "强调自己做、某事本身，或限定“只是……而已”",
        examples: [
          {
            thai: "ลองอ่านเองก่อน ถ้ายังไม่เข้าใจค่อยถามครูอีกครั้ง",
            roman: "laawng aan eeng gaawn thaa yang mai khao-jai khawy thaam khruu iik khrang",
            chinese: "先试着自己读，如果还不懂再问老师一次。",
          },
        ],
        usageNotesZh: ["เอง 可表示“自己”，也可像“而已”一样限制范围。"],
      },
    ],
    synonyms: [{ thai: "ด้วยตัวเอง", roman: "duai dtua eeng", chinese: "靠自己；亲自" }],
    antonyms: [{ thai: "ให้คนอื่น", roman: "hai khon uen", chinese: "让别人" }],
    comparisons: [
      { target: { thai: "เท่านั้น", roman: "thao-nan", chinese: "仅此；而已" }, distinctionZh: "เอง 有“自己/本身”的意味；เท่านั้น 更直接表示范围限制。" },
    ],
    collocations: [
      { thai: "ทำเอง", roman: "tham eeng", chinese: "自己做" },
      { thai: "แค่นี้เอง", roman: "khaae nii eeng", chinese: "就这点而已" },
    ],
    tags: ["限定", "自己", "口语"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "gan-reciprocal",
    thai: "กัน",
    roman: "gan",
    chinese: "一起；互相；表示群体参与",
    partOfSpeech: "助词",
    theme: "连接",
    level: "a1",
    priority: 2013,
    senses: [
      {
        id: "together-reciprocal",
        chinese: "放在动词后，表示一起做或彼此之间发生动作",
        examples: [
          {
            thai: "หลังเรียนเสร็จ เราคุยกันเรื่องคำใหม่ที่ยังจำไม่ได้",
            roman: "lang riian set rao khui gan rueang kham mai thii yang jam mai dai",
            chinese: "下课后，我们一起聊还记不住的新词。",
          },
        ],
        usageNotesZh: ["กัน 可表示“一起”，也可表示“互相”，要看动词和语境。"],
      },
    ],
    synonyms: [{ thai: "ด้วยกัน", roman: "duai-gan", chinese: "一起" }],
    antonyms: [{ thai: "คนเดียว", roman: "khon diaao", chinese: "一个人；独自" }],
    comparisons: [
      { target: { thai: "ด้วยกัน", roman: "duai-gan", chinese: "一起" }, distinctionZh: "กัน 常跟在动词后；ด้วยกัน 更明确强调一起。" },
    ],
    collocations: [
      { thai: "คุยกัน", roman: "khui gan", chinese: "一起聊；彼此交谈" },
      { thai: "ช่วยกัน", roman: "chuai gan", chinese: "一起帮忙" },
    ],
    tags: ["共同动作", "互相", "助词"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naawy-request-softener",
    thai: "หน่อย",
    roman: "naawy",
    chinese: "一点；一下（请求柔化）",
    partOfSpeech: "助词",
    theme: "语气",
    level: "a1",
    priority: 2014,
    senses: [
      {
        id: "small-amount-request",
        chinese: "表示一点点数量，也常放在请求中让语气更柔和",
        examples: [
          {
            thai: "ช่วยพูดช้าหน่อยได้ไหม ฉันอยากจดเสียงวรรณยุกต์ให้ถูก",
            roman: "chuai phuut chaa naawy dai mai chan yaak jot siang wan-na-yuk hai thuuk",
            chinese: "可以请你说慢一点吗？我想把声调记正确。",
          },
        ],
        usageNotesZh: ["请求中用 หน่อย 很常见，但仍要配合礼貌词和语气。"],
      },
    ],
    synonyms: [{ thai: "นิดหนึ่ง", roman: "nit nueng", chinese: "一点点" }],
    antonyms: [{ thai: "มาก", roman: "maak", chinese: "很多；很" }],
    comparisons: [
      { target: { thai: "นิดหน่อย", roman: "nit-naawy", chinese: "一点点" }, distinctionZh: "หน่อย 常软化请求；นิดหน่อย 更像数量或程度短语。" },
    ],
    collocations: [
      { thai: "ช่วย...หน่อย", roman: "chuai...naawy", chinese: "请帮忙……一下" },
      { thai: "รอหน่อย", roman: "raaw naawy", chinese: "等一下" },
    ],
    tags: ["请求", "柔化", "数量"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sak-indefinite",
    thai: "สัก",
    roman: "sak",
    chinese: "某个；一点；大约",
    partOfSpeech: "助词",
    theme: "数量",
    level: "a2",
    priority: 2015,
    senses: [
      {
        id: "indefinite-small-amount",
        chinese: "放在数量或时间词前，表示不精确、柔和的“某个/一点/大约”",
        examples: [
          {
            thai: "วันนี้ขอทบทวนคำศัพท์สักสิบคำก่อน แล้วค่อยเริ่มบทใหม่",
            roman: "wan-nii khaaw thop-thuaan kham-sap sak sip kham gaawn laaeo khawy roem bot mai",
            chinese: "今天先复习大约十个词，然后再开始新课。",
          },
        ],
        usageNotesZh: ["สัก 可让数量听起来不那么硬，也常用于时间表达。"],
      },
    ],
    synonyms: [{ thai: "ประมาณ", roman: "bpra-maan", chinese: "大约" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "แค่", roman: "khaae", chinese: "只；仅仅" }, distinctionZh: "สัก 表示不精确数量；แค่ 表示限制范围。" },
    ],
    collocations: [
      { thai: "สักครู่", roman: "sak khruu", chinese: "片刻；一会儿" },
      { thai: "สักวัน", roman: "sak wan", chinese: "某一天；总有一天" },
    ],
    tags: ["数量", "不定", "柔化"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sa-colloquial-particle",
    thai: "ซะ",
    roman: "sa",
    chinese: "掉；就……吧（口语动作语气）",
    partOfSpeech: "助词",
    theme: "语气",
    level: "a2",
    priority: 2016,
    senses: [
      {
        id: "colloquial-action-particle",
        chinese: "口语中推动动作完成、带命令或顺势完成的语气",
        examples: [
          {
            thai: "ถ้าประโยคนี้ยาวเกินไป ก็แบ่งเป็นสองประโยคซะ จะอ่านง่ายขึ้น",
            roman: "thaa bpra-yook nii yaao goen bpai gaw baeng bpen saawng bpra-yook sa ja aan ngaai kheun",
            chinese: "如果这个句子太长，就把它分成两个句子吧，会更容易读。",
          },
        ],
        usageNotesZh: ["ซะ 口语感强，命令语气可能明显，需注意关系和场合。"],
      },
    ],
    synonyms: [{ thai: "เสีย", roman: "siia", chinese: "掉；用于动作完成语气" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "เถอะ", roman: "thoe", chinese: "吧；建议语气" }, distinctionZh: "ซะ 更像推动动作处理掉；เถอะ 更像劝说或建议。" },
    ],
    collocations: [
      { thai: "ทำซะ", roman: "tham sa", chinese: "做掉吧" },
      { thai: "กินซะ", roman: "gin sa", chinese: "吃掉吧" },
    ],
    tags: ["口语", "命令", "完成"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sak-thii-finally",
    thai: "สักที",
    roman: "sak thii",
    chinese: "终于；总算",
    partOfSpeech: "短语",
    theme: "时间体",
    level: "a2",
    priority: 2017,
    senses: [
      {
        id: "finally-after-waiting",
        chinese: "表示等了很久后终于发生，常带松一口气或不耐烦",
        examples: [
          {
            thai: "ในที่สุดฉันก็ออกเสียงคำนี้ถูกสักที หลังจากฝึกมาหลายวัน",
            roman: "nai thii-sut chan gaw aawk-siang kham nii thuuk sak thii lang jaak fuek maa laai wan",
            chinese: "练了好几天以后，我终于把这个词发对了。",
          },
        ],
        usageNotesZh: ["สักที 常和终于完成的感觉有关，语气比普通 แล้ว 更强。"],
      },
    ],
    synonyms: [{ thai: "เสียที", roman: "siia thii", chinese: "终于；总算" }],
    antonyms: [{ thai: "ยังไม่", roman: "yang mai", chinese: "还没" }],
    comparisons: [
      { target: { thai: "ในที่สุด", roman: "nai thii-sut", chinese: "终于；最后" }, distinctionZh: "สักที 更口语，常带等待后的情绪；ในที่สุด 更中性。" },
    ],
    collocations: [
      { thai: "เสร็จสักที", roman: "set sak thii", chinese: "总算完成" },
      { thai: "เข้าใจสักที", roman: "khao-jai sak thii", chinese: "终于明白" },
    ],
    tags: ["终于", "口语", "时间体"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "siia-thii-finally",
    thai: "เสียที",
    roman: "siia thii",
    chinese: "终于；总算",
    partOfSpeech: "短语",
    theme: "时间体",
    level: "a2",
    priority: 2018,
    senses: [
      {
        id: "finally-completed",
        chinese: "表示期盼或等待后终于完成，语气略书面或较完整",
        examples: [
          {
            thai: "หลังจากแก้ไฟล์หลายรอบ งานนี้ก็เสร็จเสียที",
            roman: "lang jaak gaae fai laai raawp ngaan nii gaw set siia thii",
            chinese: "修改文件好几轮之后，这项工作总算完成了。",
          },
        ],
        usageNotesZh: ["เสียที 和 สักที 意思接近，เสียที 稍显完整或书面些。"],
      },
    ],
    synonyms: [{ thai: "สักที", roman: "sak thii", chinese: "终于；总算" }],
    antonyms: [{ thai: "ยังไม่เสร็จ", roman: "yang mai set", chinese: "还没完成" }],
    comparisons: [
      { target: { thai: "สักที", roman: "sak thii", chinese: "终于" }, distinctionZh: "两者接近；สักที 更口语，เสียที 稍正式或较完整。" },
    ],
    collocations: [
      { thai: "มาถึงเสียที", roman: "maa thueng siia thii", chinese: "终于到了" },
      { thai: "จบเสียที", roman: "jop siia thii", chinese: "总算结束" },
    ],
    tags: ["终于", "时间体", "情绪"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "mai-bpen-rai",
    thai: "ไม่เป็นไร",
    roman: "mai bpen rai",
    chinese: "没关系；不用谢；不要紧",
    partOfSpeech: "短语",
    theme: "回应",
    level: "a1",
    priority: 2019,
    senses: [
      {
        id: "no-problem-response",
        chinese: "回应道歉、感谢或小问题，表示没关系、不严重",
        examples: [
          {
            thai: "ถ้าคุณมาช้านิดหน่อยก็ไม่เป็นไร เรายังไม่ได้เริ่มบทใหม่",
            roman: "thaa khun maa chaa nit-naawy gaw mai bpen rai rao yang mai dai roem bot mai",
            chinese: "如果你晚到一点也没关系，我们还没有开始新课。",
          },
        ],
        usageNotesZh: ["ไม่เป็นไร 可回应“谢谢”或“对不起”，中文要按场景翻译。"],
      },
    ],
    synonyms: [{ thai: "ไม่ต้องกังวล", roman: "mai dtawng gang-won", chinese: "不用担心" }],
    antonyms: [{ thai: "มีปัญหา", roman: "mii bpan-haa", chinese: "有问题" }],
    comparisons: [
      { target: { thai: "ขอโทษ", roman: "khaaw-thoot", chinese: "对不起" }, distinctionZh: "ขอโทษ 是道歉；ไม่เป็นไร 常用来回应道歉。" },
    ],
    collocations: [
      { thai: "ไม่เป็นไรครับ", roman: "mai bpen rai khrap", chinese: "没关系（男性礼貌）" },
      { thai: "ไม่เป็นไรค่ะ", roman: "mai bpen rai kha", chinese: "没关系（女性礼貌）" },
    ],
    tags: ["回应", "礼貌", "常用短语"],
    sourceRefs: ["loecsen-thai", ...POLITE_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "dai-loei",
    thai: "ได้เลย",
    roman: "dai loei",
    chinese: "当然可以；马上可以",
    partOfSpeech: "短语",
    theme: "回应",
    level: "a1",
    priority: 2020,
    senses: [
      {
        id: "sure-can-do",
        chinese: "爽快答应请求，表示可以、没问题",
        examples: [
          {
            thai: "ได้เลย เดี๋ยวฉันส่งตัวอย่างประโยคให้คุณทางแชต",
            roman: "dai loei diaao chan song dtua-yaang bpra-yook hai khun thaang chaaet",
            chinese: "当然可以，我等一下通过聊天把例句发给你。",
          },
        ],
        usageNotesZh: ["ได้เลย 比 ได้ 更爽快，常用于服务和日常帮忙。"],
      },
    ],
    synonyms: [{ thai: "ยินดี", roman: "yin-dii", chinese: "愿意；乐意" }],
    antonyms: [{ thai: "ไม่ได้", roman: "mai dai", chinese: "不可以" }],
    comparisons: [
      { target: { thai: "ได้", roman: "dai", chinese: "可以" }, distinctionZh: "ได้เลย 更积极、爽快；ได้ 只是可以。" },
    ],
    collocations: [
      { thai: "ทำได้เลย", roman: "tham dai loei", chinese: "可以直接做" },
      { thai: "ถามได้เลย", roman: "thaam dai loei", chinese: "可以直接问" },
    ],
    tags: ["回应", "允许", "服务"],
    sourceRefs: POLITE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naae-naawn",
    thai: "แน่นอน",
    roman: "naae-naawn",
    chinese: "当然；确定",
    partOfSpeech: "话语标记",
    theme: "回应",
    level: "a1",
    priority: 2021,
    senses: [
      {
        id: "certainly-definitely",
        chinese: "表示确定、当然、毫无疑问",
        examples: [
          {
            thai: "ถ้าฝึกฟังทุกวัน แน่นอนว่าคุณจะจับเสียงได้เร็วขึ้น",
            roman: "thaa fuek fang thuk wan naae-naawn waa khun ja jap siang dai reo kheun",
            chinese: "如果每天练习听，当然你会更快抓住声音。",
          },
        ],
        usageNotesZh: ["แน่นอน 可单独作回答，也可接 ว่า 引出确定内容。"],
      },
    ],
    synonyms: [{ thai: "แน่ ๆ", roman: "naae naae", chinese: "肯定；一定" }],
    antonyms: [{ thai: "ไม่แน่ใจ", roman: "mai naae-jai", chinese: "不确定" }],
    comparisons: [
      { target: { thai: "คง", roman: "khong", chinese: "大概；恐怕" }, distinctionZh: "แน่นอน 是确定；คง 是推测。" },
    ],
    collocations: [
      { thai: "แน่นอนว่า", roman: "naae-naawn waa", chinese: "当然……" },
      { thai: "ใช่แน่นอน", roman: "chai naae-naawn", chinese: "当然是" },
    ],
    tags: ["回应", "确定", "话语"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "mai-naae-jai",
    thai: "ไม่แน่ใจ",
    roman: "mai naae-jai",
    chinese: "不确定；没把握",
    partOfSpeech: "短语",
    theme: "回应",
    level: "a1",
    priority: 2022,
    senses: [
      {
        id: "not-sure",
        chinese: "表达不知道是否正确、是否会发生或是否能做到",
        examples: [
          {
            thai: "ฉันไม่แน่ใจว่าคำนี้ใช้ในสถานการณ์ทางการได้ไหม",
            roman: "chan mai naae-jai waa kham nii chai nai sa-thaan-na-gaan thaang-gaan dai mai",
            chinese: "我不确定这个词能不能用在正式场合。",
          },
        ],
        usageNotesZh: ["ไม่แน่ใจว่า... 是很实用的委婉表达。"],
      },
    ],
    synonyms: [{ thai: "ไม่มั่นใจ", roman: "mai man-jai", chinese: "没有信心；不确定" }],
    antonyms: [{ thai: "แน่ใจ", roman: "naae-jai", chinese: "确定；有把握" }],
    comparisons: [
      { target: { thai: "ไม่รู้", roman: "mai ruu", chinese: "不知道" }, distinctionZh: "ไม่แน่ใจ 比 ไม่รู้ 更委婉，表示可能知道但没把握。" },
    ],
    collocations: [
      { thai: "ไม่แน่ใจว่า", roman: "mai naae-jai waa", chinese: "不确定……" },
      { thai: "ยังไม่แน่ใจ", roman: "yang mai naae-jai", chinese: "还不确定" },
    ],
    tags: ["回应", "不确定", "委婉"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naae-jai",
    thai: "แน่ใจ",
    roman: "naae-jai",
    chinese: "确定；有把握",
    partOfSpeech: "短语",
    theme: "回应",
    level: "a1",
    priority: 2023,
    senses: [
      {
        id: "be-sure",
        chinese: "表示对信息、选择或判断有把握",
        examples: [
          {
            thai: "คุณแน่ใจไหมว่าต้องส่งแบบฝึกหัดก่อนเที่ยงวันนี้",
            roman: "khun naae-jai mai waa dtawng song baaep-fuek-hat gaawn thiiang wan-nii",
            chinese: "你确定今天中午前必须交练习吗？",
          },
        ],
        usageNotesZh: ["แน่ใจ 常接 ว่า，也常用于确认问题。"],
      },
    ],
    synonyms: [{ thai: "มั่นใจ", roman: "man-jai", chinese: "有信心；确信" }],
    antonyms: [{ thai: "ไม่แน่ใจ", roman: "mai naae-jai", chinese: "不确定" }],
    comparisons: [
      { target: { thai: "แน่นอน", roman: "naae-naawn", chinese: "当然；确定" }, distinctionZh: "แน่ใจ 表示人的把握；แน่นอน 可评价事情确定。" },
    ],
    collocations: [
      { thai: "แน่ใจว่า", roman: "naae-jai waa", chinese: "确定……" },
      { thai: "แน่ใจไหม", roman: "naae-jai mai", chinese: "确定吗" },
    ],
    tags: ["确定", "回应", "认知"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "oe-hesitation",
    thai: "เอ่อ",
    roman: "oe",
    chinese: "呃；嗯（犹豫填充）",
    partOfSpeech: "话语标记",
    theme: "话语",
    level: "a2",
    priority: 2024,
    senses: [
      {
        id: "hesitation-marker",
        chinese: "说话时思考、犹豫或准备开口的填充词",
        examples: [
          {
            thai: "เอ่อ ผมขอคิดก่อนนะครับ เพราะคำถามนี้ตอบยากนิดหน่อย",
            roman: "oe phom khaaw khit gaawn na khrap phraw kham-thaam nii dtaawp yaak nit-naawy",
            chinese: "呃，我想先想一下，因为这个问题有点难回答。",
          },
        ],
        usageNotesZh: ["เอ่อ 是自然口语填充词，正式演讲中过多使用会显得犹豫。"],
      },
    ],
    synonyms: [{ thai: "อืม", roman: "uem", chinese: "嗯" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "อ๋อ", roman: "aw", chinese: "哦；原来如此" }, distinctionZh: "เอ่อ 表示犹豫；อ๋อ 表示理解或恍然。" },
    ],
    collocations: [
      { thai: "เอ่อ คือว่า", roman: "oe khue waa", chinese: "呃，是这样的" },
      { thai: "เอ่อ ขอถามหน่อย", roman: "oe khaaw thaam naawy", chinese: "呃，想问一下" },
    ],
    tags: ["话语标记", "犹豫", "口语"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "uem-thinking",
    thai: "อืม",
    roman: "uem",
    chinese: "嗯；唔",
    partOfSpeech: "话语标记",
    theme: "回应",
    level: "a2",
    priority: 2025,
    senses: [
      {
        id: "thinking-acknowledgement",
        chinese: "表示正在想、听到了、轻微同意或继续听",
        examples: [
          {
            thai: "อืม ประโยคนี้เข้าใจได้ แต่เสียงท้ายคำยังฟังยากอยู่",
            roman: "uem bpra-yook nii khao-jai dai dtaae siang thaai kham yang fang yaak yuu",
            chinese: "嗯，这个句子能理解，但词尾音还是难听出来。",
          },
        ],
        usageNotesZh: ["อืม 可表示思考或回应，具体意思要看语调。"],
      },
    ],
    synonyms: [{ thai: "เอ่อ", roman: "oe", chinese: "呃；犹豫声" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "ใช่", roman: "chai", chinese: "是；对" }, distinctionZh: "อืม 不一定明确同意；ใช่ 明确确认。" },
    ],
    collocations: [
      { thai: "อืม ใช่", roman: "uem chai", chinese: "嗯，对" },
      { thai: "อืม ขอคิดก่อน", roman: "uem khaaw khit gaawn", chinese: "嗯，我先想想" },
    ],
    tags: ["回应", "口语", "思考"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "aw-realization",
    thai: "อ๋อ",
    roman: "aw",
    chinese: "哦；原来如此",
    partOfSpeech: "话语标记",
    theme: "回应",
    level: "a1",
    priority: 2026,
    senses: [
      {
        id: "realization",
        chinese: "表示听懂、恍然大悟或明白对方意思",
        examples: [
          {
            thai: "อ๋อ คำนี้ต้องอ่านเสียงยาว ไม่ใช่เสียงสั้นใช่ไหม",
            roman: "aw kham nii dtawng aan siang yaao mai chai siang san chai mai",
            chinese: "哦，这个词要读长音，不是短音，对吗？",
          },
        ],
        usageNotesZh: ["อ๋อ 常用于突然明白，语气比简单回应更有“原来如此”。"],
      },
    ],
    synonyms: [{ thai: "เข้าใจแล้ว", roman: "khao-jai laaeo", chinese: "明白了" }],
    antonyms: [{ thai: "ไม่เข้าใจ", roman: "mai khao-jai", chinese: "不明白" }],
    comparisons: [
      { target: { thai: "อืม", roman: "uem", chinese: "嗯" }, distinctionZh: "อ๋อ 强调明白；อืม 可能只是回应或思考。" },
    ],
    collocations: [
      { thai: "อ๋อ เข้าใจแล้ว", roman: "aw khao-jai laaeo", chinese: "哦，明白了" },
      { thai: "อ๋อ ใช่", roman: "aw chai", chinese: "哦，对" },
    ],
    tags: ["回应", "理解", "口语"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "waa-ngai",
    thai: "ว่าไง",
    roman: "waa ngai",
    chinese: "怎么说；怎么样；什么事",
    partOfSpeech: "话语标记",
    theme: "疑问",
    level: "a2",
    priority: 2027,
    senses: [
      {
        id: "casual-what-up",
        chinese: "熟人间用于问对方有什么事、怎么看或情况如何",
        examples: [
          {
            thai: "ว่าไง วันนี้อยากฝึกฟังก่อนหรืออยากอ่านบทสนทนาก่อน",
            roman: "waa ngai wan-nii yaak fuek fang gaawn rue yaak aan bot-son-tha-naa gaawn",
            chinese: "怎么样，今天想先练听力，还是先读对话？",
          },
        ],
        usageNotesZh: ["ว่าไง 很口语，适合熟人，不适合正式问候陌生客户。"],
      },
    ],
    synonyms: [{ thai: "เป็นยังไง", roman: "bpen yang-ngai", chinese: "怎么样" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "สวัสดี", roman: "sawat-dii", chinese: "你好" }, distinctionZh: "ว่าไง 是熟人口语开场；สวัสดี 更正式通用。" },
    ],
    collocations: [
      { thai: "ว่าไงนะ", roman: "waa ngai na", chinese: "你说什么来着" },
      { thai: "แล้วว่าไง", roman: "laaeo waa ngai", chinese: "那怎么样" },
    ],
    tags: ["口语", "疑问", "熟人"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ao-la",
    thai: "เอาล่ะ",
    roman: "ao la",
    chinese: "好了；那么",
    partOfSpeech: "话语标记",
    theme: "话语",
    level: "a2",
    priority: 2028,
    senses: [
      {
        id: "transition-ready",
        chinese: "用于开始、转换话题或表示准备进入下一步",
        examples: [
          {
            thai: "เอาล่ะ ตอนนี้เรามาเริ่มอ่านประโยคแรกด้วยกัน",
            roman: "ao la dtaawn-nii rao maa roem aan bpra-yook raaek duai-gan",
            chinese: "好了，现在我们一起来开始读第一个句子。",
          },
        ],
        usageNotesZh: ["เอาล่ะ 常像课堂或对话里的“好了，那么……”。"],
      },
    ],
    synonyms: [{ thai: "ถ้างั้น", roman: "thaa ngan", chinese: "那样的话；那么" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "งั้น", roman: "ngan", chinese: "那；那么" }, distinctionZh: "เอาล่ะ 更像开始或收束话题；งั้น 更像根据前文得出下一步。" },
    ],
    collocations: [
      { thai: "เอาล่ะ เริ่มกัน", roman: "ao la roem gan", chinese: "好了，开始吧" },
      { thai: "เอาล่ะ ต่อไป", roman: "ao la dtaaw bpai", chinese: "好了，接下来" },
    ],
    tags: ["话语标记", "转场", "课堂"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "chaang-thoe",
    thai: "ช่างเถอะ",
    roman: "chaang thoe",
    chinese: "算了吧；别管了",
    partOfSpeech: "短语",
    theme: "回应",
    level: "a2",
    priority: 2029,
    senses: [
      {
        id: "let-it-go",
        chinese: "表示不再追究、不继续谈或放下某件事",
        examples: [
          {
            thai: "ถ้าหาไฟล์เก่าไม่เจอจริง ๆ ก็ช่างเถอะ เราทำใหม่ได้",
            roman: "thaa haa fai gao mai joo jing jing gaw chaang thoe rao tham mai dai",
            chinese: "如果真的找不到旧文件，那就算了吧，我们可以重新做。",
          },
        ],
        usageNotesZh: ["ช่างเถอะ 可安慰，也可能显得不想继续谈，要注意语气。"],
      },
    ],
    synonyms: [{ thai: "ปล่อยไป", roman: "bplaawy bpai", chinese: "放过去；别管" }],
    antonyms: [{ thai: "ต้องจัดการ", roman: "dtawng jat-gaan", chinese: "必须处理" }],
    comparisons: [
      { target: { thai: "ไม่เป็นไร", roman: "mai bpen rai", chinese: "没关系" }, distinctionZh: "ไม่เป็นไร 是安抚回应；ช่างเถอะ 是放下或不追究。" },
    ],
    collocations: [
      { thai: "ช่างเถอะนะ", roman: "chaang thoe na", chinese: "算了吧" },
      { thai: "เรื่องนั้นช่างเถอะ", roman: "rueang nan chaang thoe", chinese: "那件事算了吧" },
    ],
    tags: ["回应", "放下", "口语"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "chaang-man",
    thai: "ช่างมัน",
    roman: "chaang man",
    chinese: "随它去；管它呢",
    partOfSpeech: "短语",
    theme: "回应",
    level: "a2",
    priority: 2030,
    senses: [
      {
        id: "whatever-let-it-be",
        chinese: "较口语地表示不再理会某事，语气可轻松也可不耐烦",
        examples: [
          {
            thai: "ถ้าคะแนนครั้งนี้ไม่ดีมากก็ช่างมัน คราวหน้าเราจะเตรียมตัวให้ดีกว่าเดิม",
            roman: "thaa kha-naaen khrang nii mai dii maak gaw chaang man khraao naa rao ja dtriiam dtua hai dii gwaa doem",
            chinese: "如果这次分数不是很好就随它吧，下次我们会准备得更好。",
          },
        ],
        usageNotesZh: ["ช่างมัน 比 ช่างเถอะ 更随意，有时会显得粗略或不耐烦。"],
      },
    ],
    synonyms: [{ thai: "ปล่อยมันไป", roman: "bplaawy man bpai", chinese: "让它过去" }],
    antonyms: [{ thai: "ใส่ใจ", roman: "sai-jai", chinese: "在意；关心" }],
    comparisons: [
      { target: { thai: "ช่างเถอะ", roman: "chaang thoe", chinese: "算了吧" }, distinctionZh: "ช่างมัน 更随意；ช่างเถอะ 稍柔和。" },
    ],
    collocations: [
      { thai: "ช่างมันเถอะ", roman: "chaang man thoe", chinese: "管它呢，算了吧" },
      { thai: "ก็ช่างมัน", roman: "gaw chaang man", chinese: "那也随它吧" },
    ],
    tags: ["回应", "口语", "放下"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khong-probably",
    thai: "คง",
    roman: "khong",
    chinese: "大概；恐怕；应该会",
    partOfSpeech: "副词",
    theme: "情态",
    level: "a2",
    priority: 2031,
    senses: [
      {
        id: "probable-inference",
        chinese: "表示根据情况推测，语气比确定说法弱",
        examples: [
          {
            thai: "ฝนตกหนักแบบนี้ รถคงติดมาก เราควรออกจากบ้านเร็วขึ้น",
            roman: "fon dtok nak baaep nii rot khong dtit maak rao khuuan aawk jaak baan reo kheun",
            chinese: "雨下这么大，车大概会很堵，我们应该早点出门。",
          },
        ],
        usageNotesZh: ["คง 常表示有根据的推测，不等于完全确定。"],
      },
    ],
    synonyms: [{ thai: "น่าจะ", roman: "naa-ja", chinese: "应该会；大概" }],
    antonyms: [{ thai: "แน่นอน", roman: "naae-naawn", chinese: "确定；当然" }],
    comparisons: [
      { target: { thai: "อาจจะ", roman: "aat-ja", chinese: "可能" }, distinctionZh: "คง 通常推测把握更高；อาจจะ 更开放。" },
    ],
    collocations: [
      { thai: "คงไม่", roman: "khong mai", chinese: "大概不会" },
      { thai: "คงต้อง", roman: "khong dtawng", chinese: "恐怕必须" },
    ],
    tags: ["推测", "情态", "副词"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khong-ja",
    thai: "คงจะ",
    roman: "khong ja",
    chinese: "大概会；应该会",
    partOfSpeech: "副词",
    theme: "情态",
    level: "a2",
    priority: 2032,
    senses: [
      {
        id: "probable-future",
        chinese: "结合推测和将来，表示某事大概会发生",
        examples: [
          {
            thai: "ถ้าเราฝึกทุกวัน เดือนหน้าคงจะอ่านประโยคยาวได้คล่องขึ้น",
            roman: "thaa rao fuek thuk wan duean naa khong ja aan bpra-yook yaao dai khlaawng kheun",
            chinese: "如果我们每天练习，下个月大概会更流利地读长句。",
          },
        ],
        usageNotesZh: ["คงจะ 比单独 จะ 更带推测，不是单纯未来。"],
      },
    ],
    synonyms: [{ thai: "น่าจะ", roman: "naa-ja", chinese: "应该会" }],
    antonyms: [{ thai: "คงไม่", roman: "khong mai", chinese: "大概不会" }],
    comparisons: [
      { target: { thai: "จะ", roman: "ja", chinese: "将要；会" }, distinctionZh: "จะ 表示未来；คงจะ 表示推测中的未来。" },
    ],
    collocations: [
      { thai: "คงจะดี", roman: "khong ja dii", chinese: "大概会不错" },
      { thai: "คงจะมา", roman: "khong ja maa", chinese: "大概会来" },
    ],
    tags: ["推测", "未来", "情态"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "aat",
    thai: "อาจ",
    roman: "aat",
    chinese: "可能；或许",
    partOfSpeech: "副词",
    theme: "情态",
    level: "a2",
    priority: 2033,
    senses: [
      {
        id: "possibility",
        chinese: "表示可能性，常见于较书面或较谨慎的表达",
        examples: [
          {
            thai: "คำนี้อาจใช้ได้ในบทสนทนา แต่ไม่เหมาะกับเอกสารทางการ",
            roman: "kham nii aat chai dai nai bot-son-tha-naa dtaae mai maw gap eek-ga-saan thaang-gaan",
            chinese: "这个词可能能用于对话，但不适合正式文件。",
          },
        ],
        usageNotesZh: ["อาจ 后面常接动词；口语里 อาจจะ 更常见。"],
      },
    ],
    synonyms: [{ thai: "อาจจะ", roman: "aat-ja", chinese: "可能；也许" }],
    antonyms: [{ thai: "เป็นไปไม่ได้", roman: "bpen-bpai mai dai", chinese: "不可能" }],
    comparisons: [
      { target: { thai: "คง", roman: "khong", chinese: "大概" }, distinctionZh: "อาจ 只说可能；คง 往往有较强推测。" },
    ],
    collocations: [
      { thai: "อาจเป็น", roman: "aat bpen", chinese: "可能是" },
      { thai: "อาจใช้ได้", roman: "aat chai dai", chinese: "可能可以用" },
    ],
    tags: ["可能", "情态", "谨慎"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "aat-ja",
    thai: "อาจจะ",
    roman: "aat-ja",
    chinese: "可能；也许",
    partOfSpeech: "副词",
    theme: "情态",
    level: "a1",
    priority: 2034,
    senses: [
      {
        id: "maybe",
        chinese: "表示不确定的可能性，口语和书面都常用",
        examples: [
          {
            thai: "พรุ่งนี้ฉันอาจจะมาเรียนสายหน่อย เพราะต้องไปธนาคารก่อน",
            roman: "phrung-nii chan aat-ja maa riian saai naawy phraw dtawng bpai tha-naa-khaan gaawn",
            chinese: "明天我可能会晚一点来上课，因为要先去银行。",
          },
        ],
        usageNotesZh: ["อาจจะ 可放在动词前，语气比แน่นอน弱很多。"],
      },
    ],
    synonyms: [{ thai: "บางที", roman: "baang-thii", chinese: "也许；有时" }],
    antonyms: [{ thai: "แน่นอน", roman: "naae-naawn", chinese: "确定；当然" }],
    comparisons: [
      { target: { thai: "น่าจะ", roman: "naa-ja", chinese: "应该会" }, distinctionZh: "อาจจะ 可能性更开放；น่าจะ 常带较合理的判断。" },
    ],
    collocations: [
      { thai: "อาจจะใช่", roman: "aat-ja chai", chinese: "可能是" },
      { thai: "อาจจะไม่", roman: "aat-ja mai", chinese: "可能不" },
    ],
    tags: ["可能", "情态", "口语"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naa-ja",
    thai: "น่าจะ",
    roman: "naa-ja",
    chinese: "应该会；大概会",
    partOfSpeech: "副词",
    theme: "情态",
    level: "a1",
    priority: 2035,
    senses: [
      {
        id: "likely-should",
        chinese: "根据判断推测某事应该如此或大概会发生",
        examples: [
          {
            thai: "ถ้าฟังตัวอย่างนี้อีกสองครั้ง คุณน่าจะเข้าใจเสียงท้ายคำชัดขึ้น",
            roman: "thaa fang dtua-yaang nii iik saawng khrang khun naa-ja khao-jai siang thaai kham chat kheun",
            chinese: "如果再听这个例子两遍，你应该会更清楚地理解词尾音。",
          },
        ],
        usageNotesZh: ["น่าจะ 不等于“必须”，更像有根据的“应该会”。"],
      },
    ],
    synonyms: [{ thai: "คงจะ", roman: "khong ja", chinese: "大概会" }],
    antonyms: [{ thai: "ไม่น่าจะ", roman: "mai naa-ja", chinese: "应该不会" }],
    comparisons: [
      { target: { thai: "ควรจะ", roman: "khuuan ja", chinese: "应该要" }, distinctionZh: "น่าจะ 是推测；ควรจะ 是建议或责任。" },
    ],
    collocations: [
      { thai: "น่าจะดี", roman: "naa-ja dii", chinese: "应该不错" },
      { thai: "น่าจะใช่", roman: "naa-ja chai", chinese: "应该是" },
    ],
    tags: ["推测", "情态", "判断"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khuuan",
    thai: "ควร",
    roman: "khuuan",
    chinese: "应该",
    partOfSpeech: "副词",
    theme: "情态",
    level: "a1",
    priority: 2036,
    senses: [
      {
        id: "should-advice",
        chinese: "表示建议、适当做法或道义上的应该",
        examples: [
          {
            thai: "ก่อนส่งข้อความถึงครู คุณควรตรวจคำสุภาพให้เรียบร้อย",
            roman: "gaawn song khaaw-khwaam thueng khruu khun khuuan dtruat kham su-phaap hai riiap-raawy",
            chinese: "给老师发消息前，你应该把礼貌用词检查好。",
          },
        ],
        usageNotesZh: ["ควร 语气比 ต้อง 弱，是建议或应该，不是强制必须。"],
      },
    ],
    synonyms: [{ thai: "ควรจะ", roman: "khuuan ja", chinese: "应该要" }],
    antonyms: [{ thai: "ไม่ควร", roman: "mai khuuan", chinese: "不应该" }],
    comparisons: [
      { target: { thai: "ต้อง", roman: "dtawng", chinese: "必须；要" }, distinctionZh: "ควร 是建议；ต้อง 是必要或义务。" },
    ],
    collocations: [
      { thai: "ควรทำ", roman: "khuuan tham", chinese: "应该做" },
      { thai: "ควรระวัง", roman: "khuuan ra-wang", chinese: "应该小心" },
    ],
    tags: ["建议", "情态", "义务"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khuuan-ja",
    thai: "ควรจะ",
    roman: "khuuan ja",
    chinese: "应该要；最好会",
    partOfSpeech: "副词",
    theme: "情态",
    level: "a2",
    priority: 2037,
    senses: [
      {
        id: "should-future-advice",
        chinese: "表达对将要做的事的建议、预期或适当安排",
        examples: [
          {
            thai: "ถ้าจะสอบเดือนหน้า คุณควรจะเริ่มทบทวนตั้งแต่สัปดาห์นี้",
            roman: "thaa ja saawp duean naa khun khuuan ja roem thop-thuaan dtang-dtaae sap-daa nii",
            chinese: "如果下个月要考试，你应该从这周开始复习。",
          },
        ],
        usageNotesZh: ["ควรจะ 可比 ควร 更像“应该要……”，但仍不是强制命令。"],
      },
    ],
    synonyms: [{ thai: "ควร", roman: "khuuan", chinese: "应该" }],
    antonyms: [{ thai: "ไม่ควรจะ", roman: "mai khuuan ja", chinese: "不应该要" }],
    comparisons: [
      { target: { thai: "น่าจะ", roman: "naa-ja", chinese: "应该会" }, distinctionZh: "ควรจะ 是建议；น่าจะ 是推测。" },
    ],
    collocations: [
      { thai: "ควรจะไป", roman: "khuuan ja bpai", chinese: "应该去" },
      { thai: "ควรจะถาม", roman: "khuuan ja thaam", chinese: "应该问" },
    ],
    tags: ["建议", "情态", "安排"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jam-bpen-dtawng",
    thai: "จำเป็นต้อง",
    roman: "jam-bpen dtawng",
    chinese: "有必要必须；需要",
    partOfSpeech: "短语",
    theme: "情态",
    level: "a2",
    priority: 2038,
    senses: [
      {
        id: "necessary-must",
        chinese: "强调客观上有必要做某事，比 ต้อง 更正式",
        examples: [
          {
            thai: "ผู้เรียนไม่จำเป็นต้องจำทุกคำทันที แต่ควรใช้คำใหม่ในประโยค",
            roman: "phuu-riian mai jam-bpen dtawng jam thuk kham than-thii dtaae khuuan chai kham mai nai bpra-yook",
            chinese: "学习者不必马上记住每个词，但应该把新词用在句子里。",
          },
        ],
        usageNotesZh: ["否定形式 ไม่จำเป็นต้อง 表示“不必”。"],
      },
    ],
    synonyms: [{ thai: "ต้อง", roman: "dtawng", chinese: "必须；要" }],
    antonyms: [{ thai: "ไม่จำเป็นต้อง", roman: "mai jam-bpen dtawng", chinese: "没有必要；不必" }],
    comparisons: [
      { target: { thai: "ควร", roman: "khuuan", chinese: "应该" }, distinctionZh: "จำเป็นต้อง 强调必要；ควร 只是建议或适当。" },
    ],
    collocations: [
      { thai: "จำเป็นต้องไป", roman: "jam-bpen dtawng bpai", chinese: "有必要去" },
      { thai: "ไม่จำเป็นต้องรีบ", roman: "mai jam-bpen dtawng riip", chinese: "不必急" },
    ],
    tags: ["必要", "情态", "正式"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "mai-dtawng",
    thai: "ไม่ต้อง",
    roman: "mai dtawng",
    chinese: "不用；不必",
    partOfSpeech: "短语",
    theme: "情态",
    level: "a1",
    priority: 2039,
    senses: [
      {
        id: "do-not-need",
        chinese: "表示没有必要做某事，也可用于安慰对方不要担心",
        examples: [
          {
            thai: "คำนี้ไม่ต้องแปลทีละคำ ให้ดูความหมายทั้งประโยคก่อน",
            roman: "kham nii mai dtawng bplaae thii-la kham hai duu khwaam-maai thang bpra-yook gaawn",
            chinese: "这个词不用逐词翻译，先看整个句子的意思。",
          },
        ],
        usageNotesZh: ["ไม่ต้อง 不是禁止，而是“不必”；禁止常用 ห้าม 或 อย่า。"],
      },
    ],
    synonyms: [{ thai: "ไม่จำเป็นต้อง", roman: "mai jam-bpen dtawng", chinese: "没有必要" }],
    antonyms: [{ thai: "ต้อง", roman: "dtawng", chinese: "必须；要" }],
    comparisons: [
      { target: { thai: "อย่า", roman: "yaa", chinese: "不要" }, distinctionZh: "ไม่ต้อง 是不必；อย่า 是不要做，命令感更强。" },
    ],
    collocations: [
      { thai: "ไม่ต้องรีบ", roman: "mai dtawng riip", chinese: "不用急" },
      { thai: "ไม่ต้องกลัว", roman: "mai dtawng glua", chinese: "不用怕" },
    ],
    tags: ["不必", "情态", "否定"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "haam",
    thai: "ห้าม",
    roman: "haam",
    chinese: "禁止；不准",
    partOfSpeech: "副词",
    theme: "情态",
    level: "a1",
    priority: 2040,
    senses: [
      {
        id: "prohibition",
        chinese: "表示规则或命令上的禁止，不允许做某事",
        examples: [
          {
            thai: "ในห้องสอบห้ามใช้โทรศัพท์ ถ้ามีคำถามให้ยกมือถามเจ้าหน้าที่",
            roman: "nai haawng-saawp haam chai tho-ra-sap thaa mii kham-thaam hai yok mue thaam jao-naa-thii",
            chinese: "考场里禁止使用手机，如果有问题请举手问工作人员。",
          },
        ],
        usageNotesZh: ["ห้าม 比 อย่า 更像正式规则或禁止标识。"],
      },
    ],
    synonyms: [{ thai: "ไม่อนุญาต", roman: "mai a-nu-yaat", chinese: "不允许" }],
    antonyms: [{ thai: "อนุญาต", roman: "a-nu-yaat", chinese: "允许" }],
    comparisons: [
      { target: { thai: "อย่า", roman: "yaa", chinese: "不要" }, distinctionZh: "ห้าม 常用于规则禁止；อย่า 常用于直接叫人不要做。" },
    ],
    collocations: [
      { thai: "ห้ามเข้า", roman: "haam khao", chinese: "禁止进入" },
      { thai: "ห้ามสูบบุหรี่", roman: "haam suup bu-rii", chinese: "禁止吸烟" },
    ],
    tags: ["禁止", "规则", "情态"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "yaa-prohibit",
    thai: "อย่า",
    roman: "yaa",
    chinese: "不要；别",
    partOfSpeech: "副词",
    theme: "情态",
    level: "a1",
    priority: 2041,
    senses: [
      {
        id: "negative-command",
        chinese: "放在动词前构成否定命令，表示不要做某事",
        examples: [
          {
            thai: "อย่าอ่านเร็วเกินไปตอนฝึกเสียงใหม่ เพราะจะจำผิดได้ง่าย",
            roman: "yaa aan reo goen bpai dtaawn fuek siang mai phraw ja jam phit dai ngaai",
            chinese: "练新声音时不要读得太快，因为容易记错。",
          },
        ],
        usageNotesZh: ["อย่า 是直接命令；若要柔和可加 นะ 或解释原因。"],
      },
    ],
    synonyms: [{ thai: "ห้าม", roman: "haam", chinese: "禁止；不准" }],
    antonyms: [{ thai: "เชิญ", roman: "choen", chinese: "请；邀请做" }],
    comparisons: [
      { target: { thai: "ไม่ต้อง", roman: "mai dtawng", chinese: "不用；不必" }, distinctionZh: "อย่า 是不要做；ไม่ต้อง 是没必要做。" },
    ],
    collocations: [
      { thai: "อย่าลืม", roman: "yaa luuem", chinese: "别忘了" },
      { thai: "อย่ากลัว", roman: "yaa glua", chinese: "不要怕" },
    ],
    tags: ["命令", "否定", "情态"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phoeng",
    thai: "เพิ่ง",
    roman: "phoeng",
    chinese: "刚刚；才",
    partOfSpeech: "副词",
    theme: "时间体",
    level: "a1",
    priority: 2042,
    senses: [
      {
        id: "recently-just",
        chinese: "表示动作刚发生不久，常译为“刚刚、才”",
        examples: [
          {
            thai: "ฉันเพิ่งเริ่มเรียนภาษาไทยเดือนนี้ จึงยังอ่านช้าอยู่",
            roman: "chan phoeng roem riian phaa-saa thai duean nii jeung yang aan chaa yuu",
            chinese: "我这个月才开始学泰语，所以读得还慢。",
          },
        ],
        usageNotesZh: ["เพิ่ง 常放在动词前，强调“刚刚发生”。"],
      },
    ],
    synonyms: [{ thai: "เพิ่งจะ", roman: "phoeng ja", chinese: "刚要；刚刚会" }],
    antonyms: [{ thai: "นานแล้ว", roman: "naan laaeo", chinese: "已经很久了" }],
    comparisons: [
      { target: { thai: "เมื่อกี้", roman: "muea-gii", chinese: "刚才" }, distinctionZh: "เพิ่ง 是副词修饰动作；เมื่อกี้ 是时间名词性表达。" },
    ],
    collocations: [
      { thai: "เพิ่งมา", roman: "phoeng maa", chinese: "刚来" },
      { thai: "เพิ่งรู้", roman: "phoeng ruu", chinese: "才知道" },
    ],
    tags: ["刚刚", "时间体", "副词"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phoeng-ja",
    thai: "เพิ่งจะ",
    roman: "phoeng ja",
    chinese: "刚刚要；才会",
    partOfSpeech: "副词",
    theme: "时间体",
    level: "a2",
    priority: 2043,
    senses: [
      {
        id: "just-about-to-or-just",
        chinese: "强调动作刚刚开始、刚要发生或才刚达到某状态",
        examples: [
          {
            thai: "ผมเพิ่งจะเข้าใจความต่างระหว่างคำสองคำนี้หลังฟังตัวอย่าง",
            roman: "phom phoeng ja khao-jai khwaam dtaang ra-waang kham saawng kham nii lang fang dtua-yaang",
            chinese: "听了例子以后，我才刚明白这两个词的差别。",
          },
        ],
        usageNotesZh: ["เพิ่งจะ 比 เพิ่ง 更突出“才刚要/才刚刚”的过程感。"],
      },
    ],
    synonyms: [{ thai: "เพิ่ง", roman: "phoeng", chinese: "刚刚；才" }],
    antonyms: [{ thai: "นานแล้ว", roman: "naan laaeo", chinese: "已经很久了" }],
    comparisons: [
      { target: { thai: "กำลังจะ", roman: "gam-lang ja", chinese: "正要；即将" }, distinctionZh: "เพิ่งจะ 可表示才刚开始；กำลังจะ 强调正要发生。" },
    ],
    collocations: [
      { thai: "เพิ่งจะเห็น", roman: "phoeng ja hen", chinese: "才刚看到" },
      { thai: "เพิ่งจะเริ่ม", roman: "phoeng ja roem", chinese: "才刚开始" },
    ],
    tags: ["刚刚", "时间体", "过程"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "roem-ja",
    thai: "เริ่มจะ",
    roman: "roem ja",
    chinese: "开始要；逐渐要",
    partOfSpeech: "副词",
    theme: "时间体",
    level: "a2",
    priority: 2044,
    senses: [
      {
        id: "beginning-to",
        chinese: "表示某状态开始出现或动作逐渐要发生",
        examples: [
          {
            thai: "หลังฝึกมาสองสัปดาห์ ฉันเริ่มจะฟังเสียงสั้นกับเสียงยาวออก",
            roman: "lang fuek maa saawng sap-daa chan roem ja fang siang san gap siang yaao aawk",
            chinese: "练了两周以后，我开始听得出短音和长音了。",
          },
        ],
        usageNotesZh: ["เริ่มจะ 常接状态或能力变化，带“逐渐开始”的感觉。"],
      },
    ],
    synonyms: [{ thai: "เริ่ม", roman: "roem", chinese: "开始" }],
    antonyms: [{ thai: "เลิก", roman: "loek", chinese: "停止；结束" }],
    comparisons: [
      { target: { thai: "กำลัง", roman: "gam-lang", chinese: "正在" }, distinctionZh: "เริ่มจะ 强调开始进入状态；กำลัง 强调正在进行。" },
    ],
    collocations: [
      { thai: "เริ่มจะเข้าใจ", roman: "roem ja khao-jai", chinese: "开始理解" },
      { thai: "เริ่มจะดีขึ้น", roman: "roem ja dii kheun", chinese: "开始好转" },
    ],
    tags: ["开始", "变化", "时间体"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaaw",
    thai: "ต่อ",
    roman: "dtaaw",
    chinese: "继续；接着；对着",
    partOfSpeech: "副词",
    theme: "连接",
    level: "a1",
    priority: 2045,
    senses: [
      {
        id: "continue-next",
        chinese: "表示继续做某事或连接下一个部分",
        examples: [
          {
            thai: "อ่านประโยคนี้เสร็จแล้ว เราจะฝึกฟังบทสนทนาต่อ",
            roman: "aan bpra-yook nii set laaeo rao ja fuek fang bot-son-tha-naa dtaaw",
            chinese: "读完这个句子以后，我们会继续练习听对话。",
          },
        ],
        usageNotesZh: ["ต่อ 可放在动词后表示继续，也可作“接、对、向”的核心词。"],
      },
    ],
    synonyms: [{ thai: "ต่อไป", roman: "dtaaw bpai", chinese: "接下来；继续" }],
    antonyms: [{ thai: "หยุด", roman: "yut", chinese: "停止" }],
    comparisons: [
      { target: { thai: "อีก", roman: "iik", chinese: "再；另外" }, distinctionZh: "ต่อ 强调继续接下去；อีก 强调再一次或另外。" },
    ],
    collocations: [
      { thai: "ทำต่อ", roman: "tham dtaaw", chinese: "继续做" },
      { thai: "เรียนต่อ", roman: "riian dtaaw", chinese: "继续学习" },
    ],
    tags: ["继续", "连接", "顺序"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaaw-bpai",
    thai: "ต่อไป",
    roman: "dtaaw bpai",
    chinese: "接下来；以后；继续下去",
    partOfSpeech: "时间表达",
    theme: "连接",
    level: "a1",
    priority: 2046,
    senses: [
      {
        id: "next-from-now",
        chinese: "表示下一个步骤、未来一段时间或继续向前",
        examples: [
          {
            thai: "ต่อไปเราจะฝึกถามตอบด้วยประโยคยาวขึ้นทีละนิด",
            roman: "dtaaw bpai rao ja fuek thaam-dtaawp duai bpra-yook yaao kheun thii-la nit",
            chinese: "接下来我们会用稍微更长的句子练习问答。",
          },
        ],
        usageNotesZh: ["ต่อไป 可作课堂转场，也可表示“从今以后”。"],
      },
    ],
    synonyms: [{ thai: "ถัดไป", roman: "that bpai", chinese: "下一个" }],
    antonyms: [{ thai: "ก่อนหน้านี้", roman: "gaawn naa nii", chinese: "在这之前" }],
    comparisons: [
      { target: { thai: "ต่อมา", roman: "dtaaw maa", chinese: "后来；接着" }, distinctionZh: "ต่อไป 面向接下来或未来；ต่อมา 多叙述过去事件的后来。" },
    ],
    collocations: [
      { thai: "บทต่อไป", roman: "bot dtaaw bpai", chinese: "下一课" },
      { thai: "ครั้งต่อไป", roman: "khrang dtaaw bpai", chinese: "下一次" },
    ],
    tags: ["接下来", "未来", "课堂"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaaw-maa",
    thai: "ต่อมา",
    roman: "dtaaw maa",
    chinese: "后来；接着",
    partOfSpeech: "时间表达",
    theme: "连接",
    level: "a2",
    priority: 2047,
    senses: [
      {
        id: "later-in-sequence",
        chinese: "叙述事件顺序时表示后来、接着发生",
        examples: [
          {
            thai: "ตอนแรกฉันจำเสียงไม่ได้ ต่อมาพอฟังบ่อย ๆ ก็เริ่มแยกได้",
            roman: "dtaawn raaek chan jam siang mai dai dtaaw maa phaaw fang baawy baawy gaw roem yaaek dai",
            chinese: "一开始我记不住声音，后来听多了就开始能区分了。",
          },
        ],
        usageNotesZh: ["ต่อมา 常用于叙述过程，比 แล้วก็ 更书面一些。"],
      },
    ],
    synonyms: [{ thai: "ภายหลัง", roman: "phaai-lang", chinese: "后来；之后" }],
    antonyms: [{ thai: "ตอนแรก", roman: "dtaawn raaek", chinese: "起初；一开始" }],
    comparisons: [
      { target: { thai: "แล้วก็", roman: "laaeo gaw", chinese: "然后；而且" }, distinctionZh: "ต่อมา 更偏叙述；แล้วก็ 更口语顺接。" },
    ],
    collocations: [
      { thai: "ต่อมาจึง", roman: "dtaaw maa jeung", chinese: "后来因此" },
      { thai: "ต่อมาเขา", roman: "dtaaw maa khao", chinese: "后来他/她" },
    ],
    tags: ["叙述", "顺序", "时间"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaaw-jaak-nan",
    thai: "ต่อจากนั้น",
    roman: "dtaaw jaak nan",
    chinese: "在那之后；接下来",
    partOfSpeech: "时间表达",
    theme: "连接",
    level: "a2",
    priority: 2048,
    senses: [
      {
        id: "after-that-sequence",
        chinese: "连接步骤或叙述，表示前一件事之后的下一步",
        examples: [
          {
            thai: "ก่อนอื่นให้ฟังเสียงหนึ่งรอบ ต่อจากนั้นค่อยอ่านตามครู",
            roman: "gaawn uen hai fang siang nueng raawp dtaaw jaak nan khawy aan dtaam khruu",
            chinese: "首先听一遍声音，接下来再跟着老师读。",
          },
        ],
        usageNotesZh: ["ต่อจากนั้น 适合说明步骤，逻辑比口语 แล้วก็ 清楚。"],
      },
    ],
    synonyms: [{ thai: "หลังจากนั้น", roman: "lang jaak nan", chinese: "那之后" }],
    antonyms: [{ thai: "ก่อนหน้านั้น", roman: "gaawn naa nan", chinese: "在那之前" }],
    comparisons: [
      { target: { thai: "ต่อไป", roman: "dtaaw bpai", chinese: "接下来" }, distinctionZh: "ต่อจากนั้น 明确接在已提到事件之后；ต่อไป 可泛指下一步。" },
    ],
    collocations: [
      { thai: "ต่อจากนั้นเรา", roman: "dtaaw jaak nan rao", chinese: "那之后我们" },
      { thai: "ต่อจากนั้นให้", roman: "dtaaw jaak nan hai", chinese: "接下来请" },
    ],
    tags: ["步骤", "顺序", "连接"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "nai-thii-sut",
    thai: "ในที่สุด",
    roman: "nai thii-sut",
    chinese: "最后；终于",
    partOfSpeech: "时间表达",
    theme: "时间体",
    level: "a1",
    priority: 2049,
    senses: [
      {
        id: "finally-eventually",
        chinese: "表示经过过程后最后达到结果，语气中性",
        examples: [
          {
            thai: "หลังจากฝึกพูดหลายวัน ในที่สุดฉันก็ออกเสียงประโยคนี้ได้ชัด",
            roman: "lang jaak fuek phuut laai wan nai thii-sut chan gaw aawk-siang bpra-yook nii dai chat",
            chinese: "练习说了好几天以后，我终于能把这个句子发清楚了。",
          },
        ],
        usageNotesZh: ["ในที่สุด 可用于积极或中性的“最后/终于”。"],
      },
    ],
    synonyms: [{ thai: "สุดท้าย", roman: "sut-thaai", chinese: "最后" }],
    antonyms: [{ thai: "ตอนแรก", roman: "dtaawn raaek", chinese: "起初" }],
    comparisons: [
      { target: { thai: "สักที", roman: "sak thii", chinese: "总算；终于" }, distinctionZh: "ในที่สุด 更中性；สักที 常带等待后的情绪。" },
    ],
    collocations: [
      { thai: "ในที่สุดก็", roman: "nai thii-sut gaw", chinese: "终于就/终于也" },
      { thai: "ในที่สุดเรา", roman: "nai thii-sut rao", chinese: "最后我们" },
    ],
    tags: ["最后", "终于", "叙述"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sut-thaai",
    thai: "สุดท้าย",
    roman: "sut-thaai",
    chinese: "最后；最终",
    partOfSpeech: "时间表达",
    theme: "时间体",
    level: "a1",
    priority: 2050,
    senses: [
      {
        id: "last-final",
        chinese: "表示顺序中的最后一个或最终结果",
        examples: [
          {
            thai: "สุดท้ายครูให้เราสรุปคำใหม่สามคำด้วยประโยคของตัวเอง",
            roman: "sut-thaai khruu hai rao sa-rup kham mai saam kham duai bpra-yook khaawng dtua eeng",
            chinese: "最后老师让我们用自己的句子总结三个新词。",
          },
        ],
        usageNotesZh: ["สุดท้าย 可放句首作转场，也可修饰名词表示最后的。"],
      },
    ],
    synonyms: [{ thai: "ท้ายที่สุด", roman: "thaai thii-sut", chinese: "最终；到最后" }],
    antonyms: [{ thai: "แรก", roman: "raaek", chinese: "第一；最初" }],
    comparisons: [
      { target: { thai: "ในที่สุด", roman: "nai thii-sut", chinese: "最后；终于" }, distinctionZh: "สุดท้าย 可指顺序最后；ในที่สุด 更强调经过过程后的结果。" },
    ],
    collocations: [
      { thai: "ข้อสุดท้าย", roman: "khaaw sut-thaai", chinese: "最后一题" },
      { thai: "สุดท้ายแล้ว", roman: "sut-thaai laaeo", chinese: "最终来说" },
    ],
    tags: ["最后", "顺序", "结果"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "muea-dai",
    thai: "เมื่อใด",
    roman: "muea-dai",
    chinese: "何时；什么时候",
    partOfSpeech: "疑问框架",
    theme: "疑问",
    level: "a2",
    priority: 2051,
    senses: [
      {
        id: "when-formal",
        chinese: "较正式地询问时间，常见于书面或正式说明",
        examples: [
          {
            thai: "หากไม่แน่ใจว่าจะส่งงานเมื่อใด ควรถามครูล่วงหน้า",
            roman: "haak mai naae-jai waa ja song ngaan muea-dai khuuan thaam khruu luuang-naa",
            chinese: "如果不确定什么时候交作业，应该提前问老师。",
          },
        ],
        usageNotesZh: ["เมื่อใด 比 เมื่อไร / เมื่อไหร่ 更正式。"],
      },
    ],
    synonyms: [{ thai: "เมื่อไหร่", roman: "muea-rai", chinese: "什么时候" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "เมื่อไร", roman: "muea-rai", chinese: "什么时候" }, distinctionZh: "เมื่อใด 更正式；เมื่อไร 更常见日常表达。" },
    ],
    collocations: [
      { thai: "เมื่อใดก็ได้", roman: "muea-dai gaw dai", chinese: "什么时候都可以" },
      { thai: "ตั้งแต่เมื่อใด", roman: "dtang-dtaae muea-dai", chinese: "从何时开始" },
    ],
    tags: ["疑问", "时间", "正式"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "chuang-thii",
    thai: "ช่วงที่",
    roman: "chuang thii",
    chinese: "在……那段时间",
    partOfSpeech: "连接词",
    theme: "时间体",
    level: "a2",
    priority: 2052,
    senses: [
      {
        id: "during-period-when",
        chinese: "引出一段时间背景，表示在某段时间里",
        examples: [
          {
            thai: "ช่วงที่ฉันอยู่กรุงเทพ ฉันพยายามฟังคนไทยคุยกันทุกวัน",
            roman: "chuang thii chan yuu grung-theep chan pha-yaa-yaam fang khon thai khui gan thuk wan",
            chinese: "我在曼谷那段时间，努力每天听泰国人聊天。",
          },
        ],
        usageNotesZh: ["ช่วงที่ 常接完整小句，突出某段时间背景。"],
      },
    ],
    synonyms: [{ thai: "ระหว่างที่", roman: "ra-waang thii", chinese: "当……期间" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "ตอน", roman: "dtaawn", chinese: "时候；段" }, distinctionZh: "ช่วงที่ 后面常接小句；ตอน 可直接接时间词或短语。" },
    ],
    collocations: [
      { thai: "ช่วงที่เรียน", roman: "chuang thii riian", chinese: "学习期间" },
      { thai: "ช่วงที่ฝนตก", roman: "chuang thii fon dtok", chinese: "下雨那段时间" },
    ],
    tags: ["时间", "背景", "连接"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "kha-na-thii",
    thai: "ขณะที่",
    roman: "kha-na thii",
    chinese: "当……的时候；在……期间",
    partOfSpeech: "连接词",
    theme: "时间体",
    level: "a2",
    priority: 2053,
    senses: [
      {
        id: "while-clause",
        chinese: "连接两个同时发生的动作或背景事件",
        examples: [
          {
            thai: "ขณะที่ครูกำลังพูด นักเรียนควรจดคำสำคัญไว้",
            roman: "kha-na thii khruu gam-lang phuut nak-riian khuuan jot kham sam-khan wai",
            chinese: "老师正在说话的时候，学生应该把关键词记下来。",
          },
        ],
        usageNotesZh: ["ขณะที่ 比口语 ตอนที่ 更书面一些。"],
      },
    ],
    synonyms: [{ thai: "ตอนที่", roman: "dtaawn thii", chinese: "当……的时候" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "หลังจาก", roman: "lang jaak", chinese: "在……之后" }, distinctionZh: "ขณะที่ 表示同时；หลังจาก 表示之后。" },
    ],
    collocations: [
      { thai: "ขณะที่เรียน", roman: "kha-na thii riian", chinese: "学习时" },
      { thai: "ขณะที่ทำงาน", roman: "kha-na thii tham-ngaan", chinese: "工作时" },
    ],
    tags: ["时间", "同时", "连接"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtang-dtaae",
    thai: "ตั้งแต่",
    roman: "dtang-dtaae",
    chinese: "从……起；自从",
    partOfSpeech: "连接词",
    theme: "时间体",
    level: "a1",
    priority: 2054,
    senses: [
      {
        id: "since-from",
        chinese: "标记时间或范围的起点，表示从某时或某处开始",
        examples: [
          {
            thai: "ฉันเรียนภาษาไทยตั้งแต่ปีที่แล้ว แต่เพิ่งเริ่มฝึกเขียนจริงจัง",
            roman: "chan riian phaa-saa thai dtang-dtaae bpii thii laaeo dtaae phoeng roem fuek khiian jing-jang",
            chinese: "我从去年开始学泰语，但最近才开始认真练写。",
          },
        ],
        usageNotesZh: ["ตั้งแต่ 常和 ถึง 搭配表示从……到……。"],
      },
    ],
    synonyms: [{ thai: "นับจาก", roman: "nap jaak", chinese: "自……起" }],
    antonyms: [{ thai: "จนถึง", roman: "jon thueng", chinese: "直到" }],
    comparisons: [
      { target: { thai: "จาก", roman: "jaak", chinese: "从" }, distinctionZh: "ตั้งแต่ 更强调起始点和持续范围；จาก 可泛指来源或起点。" },
    ],
    collocations: [
      { thai: "ตั้งแต่เช้า", roman: "dtang-dtaae chaao", chinese: "从早上起" },
      { thai: "ตั้งแต่วันนี้", roman: "dtang-dtaae wan-nii", chinese: "从今天起" },
    ],
    tags: ["起点", "时间", "范围"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jon",
    thai: "จน",
    roman: "jon",
    chinese: "直到；以至于",
    partOfSpeech: "连接词",
    theme: "连接",
    level: "a2",
    priority: 2055,
    senses: [
      {
        id: "until-so-that",
        chinese: "表示动作持续到某点，或结果达到某程度",
        examples: [
          {
            thai: "เขาฝึกอ่านจนออกเสียงคำยาวได้ชัดกว่าเดิม",
            roman: "khao fuek aan jon aawk-siang kham yaao dai chat gwaa doem",
            chinese: "他一直练读，直到长词发音比以前清楚了。",
          },
        ],
        usageNotesZh: ["จน 可接时间终点，也可接结果程度。"],
      },
    ],
    synonyms: [{ thai: "จนถึง", roman: "jon thueng", chinese: "直到" }],
    antonyms: [{ thai: "ตั้งแต่", roman: "dtang-dtaae", chinese: "从……起" }],
    comparisons: [
      { target: { thai: "ถึง", roman: "thueng", chinese: "到；直到" }, distinctionZh: "จน 更突出持续到结果或终点；ถึง 更像到达点。" },
    ],
    collocations: [
      { thai: "จนเข้าใจ", roman: "jon khao-jai", chinese: "直到明白" },
      { thai: "จนดึก", roman: "jon duek", chinese: "直到很晚" },
    ],
    tags: ["直到", "结果", "连接"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jon-gwaa",
    thai: "จนกว่า",
    roman: "jon gwaa",
    chinese: "直到……才；直到……为止",
    partOfSpeech: "连接词",
    theme: "条件",
    level: "a2",
    priority: 2056,
    senses: [
      {
        id: "until-condition",
        chinese: "引出必须达到的时间或条件，在此之前动作持续或不发生",
        examples: [
          {
            thai: "อย่าเพิ่งส่งคำตอบจนกว่าจะตรวจวรรณยุกต์ครบทุกคำ",
            roman: "yaa phoeng song kham-dtaawp jon gwaa ja dtruat wan-na-yuk khrop thuk kham",
            chinese: "在检查完每个词的声调前，先不要提交答案。",
          },
        ],
        usageNotesZh: ["จนกว่า 常搭配 จะ，引出“直到……才”的条件点。"],
      },
    ],
    synonyms: [{ thai: "จนถึงตอนที่", roman: "jon thueng dtaawn thii", chinese: "直到……的时候" }],
    antonyms: [{ thai: "ก่อนที่", roman: "gaawn thii", chinese: "在……之前" }],
    comparisons: [
      { target: { thai: "จน", roman: "jon", chinese: "直到；以至于" }, distinctionZh: "จนกว่า 更明确引出条件或时间点；จน 用法更宽。" },
    ],
    collocations: [
      { thai: "จนกว่าจะเสร็จ", roman: "jon gwaa ja set", chinese: "直到完成为止" },
      { thai: "จนกว่าจะเข้าใจ", roman: "jon gwaa ja khao-jai", chinese: "直到明白为止" },
    ],
    tags: ["直到", "条件", "连接"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jon-gra-thang",
    thai: "จนกระทั่ง",
    roman: "jon gra-thang",
    chinese: "直到；一直到",
    partOfSpeech: "连接词",
    theme: "时间体",
    level: "a2",
    priority: 2057,
    senses: [
      {
        id: "until-final-point",
        chinese: "较完整地表示一直持续到某个时间点或事件",
        examples: [
          {
            thai: "เขาทบทวนบทเรียนทุกคืนจนกระทั่งสอบผ่านระดับพื้นฐาน",
            roman: "khao thop-thuaan bot-riian thuk khuen jon gra-thang saawp phaan ra-dap pheun-thaan",
            chinese: "他每晚复习课程，直到通过基础级考试。",
          },
        ],
        usageNotesZh: ["จนกระทั่ง 比 จน 更完整，常用于叙述和书面语。"],
      },
    ],
    synonyms: [{ thai: "จนถึง", roman: "jon thueng", chinese: "直到" }],
    antonyms: [{ thai: "ตั้งแต่", roman: "dtang-dtaae", chinese: "从……起" }],
    comparisons: [
      { target: { thai: "จน", roman: "jon", chinese: "直到" }, distinctionZh: "จนกระทั่ง 更正式、更完整；จน 更短、更口语。" },
    ],
    collocations: [
      { thai: "จนกระทั่งวันนี้", roman: "jon gra-thang wan-nii", chinese: "直到今天" },
      { thai: "จนกระทั่งเข้าใจ", roman: "jon gra-thang khao-jai", chinese: "直到理解" },
    ],
    tags: ["直到", "正式", "叙述"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khraao-nii",
    thai: "คราวนี้",
    roman: "khraao nii",
    chinese: "这次；这回",
    partOfSpeech: "时间表达",
    theme: "时间体",
    level: "a1",
    priority: 2058,
    senses: [
      {
        id: "this-time",
        chinese: "指当前这一次，与上次或下次形成对比",
        examples: [
          {
            thai: "คราวนี้ลองตอบเป็นประโยคยาวขึ้น อย่าตอบแค่คำเดียว",
            roman: "khraao nii laawng dtaawp bpen bpra-yook yaao kheun yaa dtaawp khaae kham diaao",
            chinese: "这次试着用更长的句子回答，不要只回答一个词。",
          },
        ],
        usageNotesZh: ["คราวนี้ 比 ครั้งนี้ 更口语一些，但意思接近。"],
      },
    ],
    synonyms: [{ thai: "ครั้งนี้", roman: "khrang nii", chinese: "这次" }],
    antonyms: [{ thai: "คราวหน้า", roman: "khraao naa", chinese: "下次" }],
    comparisons: [
      { target: { thai: "ครั้งนี้", roman: "khrang nii", chinese: "这次" }, distinctionZh: "คราวนี้ 更口语；ครั้งนี้ 更中性。" },
    ],
    collocations: [
      { thai: "คราวนี้เข้าใจแล้ว", roman: "khraao nii khao-jai laaeo", chinese: "这次明白了" },
      { thai: "คราวนี้ต้อง", roman: "khraao nii dtawng", chinese: "这次必须" },
    ],
    tags: ["这次", "口语", "时间"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khraao-naa",
    thai: "คราวหน้า",
    roman: "khraao naa",
    chinese: "下次；下回",
    partOfSpeech: "时间表达",
    theme: "时间体",
    level: "a1",
    priority: 2059,
    senses: [
      {
        id: "next-time",
        chinese: "表示下一次发生同类事情的时候",
        examples: [
          {
            thai: "คราวหน้าถ้ามีคำถาม ให้จดไว้แล้วถามตอนท้ายชั่วโมง",
            roman: "khraao naa thaa mii kham-thaam hai jot wai laaeo thaam dtaawn thaai chua-moong",
            chinese: "下次如果有问题，请记下来，课快结束时再问。",
          },
        ],
        usageNotesZh: ["คราวหน้า 很适合口语里的“下次”。"],
      },
    ],
    synonyms: [{ thai: "ครั้งหน้า", roman: "khrang naa", chinese: "下一次" }],
    antonyms: [{ thai: "คราวนี้", roman: "khraao nii", chinese: "这次" }],
    comparisons: [
      { target: { thai: "ต่อไป", roman: "dtaaw bpai", chinese: "接下来；以后" }, distinctionZh: "คราวหน้า 指下一次；ต่อไป 可指接下来的一段流程或以后。" },
    ],
    collocations: [
      { thai: "เจอกันคราวหน้า", roman: "joo gan khraao naa", chinese: "下次见" },
      { thai: "คราวหน้าค่อย", roman: "khraao naa khawy", chinese: "下次再" },
    ],
    tags: ["下次", "口语", "时间"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khrang-naa",
    thai: "ครั้งหน้า",
    roman: "khrang naa",
    chinese: "下一次",
    partOfSpeech: "时间表达",
    theme: "时间体",
    level: "a1",
    priority: 2060,
    senses: [
      {
        id: "next-occasion",
        chinese: "指下一次同类活动或机会，语气中性",
        examples: [
          {
            thai: "ครั้งหน้าเราจะฝึกเขียนคำตอบให้ยาวกว่านี้",
            roman: "khrang naa rao ja fuek khiian kham-dtaawp hai yaao gwaa nii",
            chinese: "下一次我们会练习把答案写得比这更长。",
          },
        ],
        usageNotesZh: ["ครั้งหน้า 比 คราวหน้า 稍中性，也常用于安排课程或会议。"],
      },
    ],
    synonyms: [{ thai: "คราวหน้า", roman: "khraao naa", chinese: "下次；下回" }],
    antonyms: [{ thai: "ครั้งก่อน", roman: "khrang gaawn", chinese: "上一次" }],
    comparisons: [
      { target: { thai: "คราวหน้า", roman: "khraao naa", chinese: "下回" }, distinctionZh: "ครั้งหน้า 更中性；คราวหน้า 更口语。" },
    ],
    collocations: [
      { thai: "ครั้งหน้าพบกัน", roman: "khrang naa phop gan", chinese: "下次见" },
      { thai: "ในครั้งหน้า", roman: "nai khrang naa", chinese: "在下一次" },
    ],
    tags: ["下一次", "安排", "时间"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "than-thii",
    thai: "ทันที",
    roman: "than-thii",
    chinese: "立刻；马上",
    partOfSpeech: "副词",
    theme: "时间体",
    level: "a1",
    priority: 2061,
    senses: [
      {
        id: "immediately",
        chinese: "表示没有等待，马上发生或马上做",
        examples: [
          {
            thai: "ถ้าได้รับอีเมลจากครู กรุณาตอบกลับทันทีเพื่อยืนยันเวลาเรียน",
            roman: "thaa dai-rap ii-meel jaak khruu ga-ru-naa dtaawp glap than-thii phuea yuen-yan wee-laa riian",
            chinese: "如果收到老师的邮件，请立刻回复以确认上课时间。",
          },
        ],
        usageNotesZh: ["ทันที 比 เดี๋ยว 更强调立即。"],
      },
    ],
    synonyms: [{ thai: "เดี๋ยวนี้", roman: "diaao nii", chinese: "现在；马上" }],
    antonyms: [{ thai: "ภายหลัง", roman: "phaai-lang", chinese: "以后；稍后" }],
    comparisons: [
      { target: { thai: "เดี๋ยว", roman: "diaao", chinese: "等一下；马上" }, distinctionZh: "ทันที 更明确“立即”；เดี๋ยว 可表示稍等或一会儿。" },
    ],
    collocations: [
      { thai: "ตอบทันที", roman: "dtaawp than-thii", chinese: "立刻回答" },
      { thai: "เริ่มทันที", roman: "roem than-thii", chinese: "马上开始" },
    ],
    tags: ["立刻", "时间", "副词"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "reuuai-reuuai",
    thai: "เรื่อย ๆ",
    roman: "reuuai reuuai",
    chinese: "一直；持续地；慢慢来",
    partOfSpeech: "副词",
    theme: "时间体",
    level: "a2",
    priority: 2062,
    senses: [
      {
        id: "continuously-casually",
        chinese: "表示动作持续进行，也可有不急不慢的感觉",
        examples: [
          {
            thai: "ถ้าฟังเรื่อย ๆ คุณจะคุ้นกับจังหวะของภาษาไทยมากขึ้น",
            roman: "thaa fang reuuai reuuai khun ja khun gap jang-wa khaawng phaa-saa thai maak kheun",
            chinese: "如果持续听下去，你会更习惯泰语的节奏。",
          },
        ],
        usageNotesZh: ["เรื่อย ๆ 可表示持续，也可表示随意、不特别计划。"],
      },
    ],
    synonyms: [{ thai: "ต่อเนื่อง", roman: "dtaaw-neuuang", chinese: "连续；持续" }],
    antonyms: [{ thai: "หยุดเป็นช่วง ๆ", roman: "yut bpen chuang chuang", chinese: "断断续续停下" }],
    comparisons: [
      { target: { thai: "ค่อย ๆ", roman: "khawy khawy", chinese: "慢慢地" }, distinctionZh: "เรื่อย ๆ 强调持续；ค่อย ๆ 强调逐渐、慢慢。" },
    ],
    collocations: [
      { thai: "ทำไปเรื่อย ๆ", roman: "tham bpai reuuai reuuai", chinese: "一直做下去" },
      { thai: "ฟังไปเรื่อย ๆ", roman: "fang bpai reuuai reuuai", chinese: "一直听下去" },
    ],
    tags: ["持续", "口语", "时间体"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khawy-khawy",
    thai: "ค่อย ๆ",
    roman: "khawy khawy",
    chinese: "慢慢地；逐渐地",
    partOfSpeech: "副词",
    theme: "时间体",
    level: "a1",
    priority: 2063,
    senses: [
      {
        id: "gradually-slowly",
        chinese: "表示动作慢慢进行或状态逐渐变化",
        examples: [
          {
            thai: "ค่อย ๆ อ่านทีละคำ แล้วคุณจะเห็นรูปแบบของประโยคชัดขึ้น",
            roman: "khawy khawy aan thii-la kham laaeo khun ja hen ruup-baaep khaawng bpra-yook chat kheun",
            chinese: "慢慢地一个词一个词读，你会更清楚地看到句子的结构。",
          },
        ],
        usageNotesZh: ["ค่อย ๆ 很适合给建议，语气温和。"],
      },
    ],
    synonyms: [{ thai: "ทีละน้อย", roman: "thii-la naawy", chinese: "一点一点地" }],
    antonyms: [{ thai: "ทันที", roman: "than-thii", chinese: "立刻" }],
    comparisons: [
      { target: { thai: "ช้า ๆ", roman: "chaa chaa", chinese: "慢慢地" }, distinctionZh: "ค่อย ๆ 强调逐渐过程；ช้า ๆ 强调速度慢。" },
    ],
    collocations: [
      { thai: "ค่อย ๆ ฝึก", roman: "khawy khawy fuek", chinese: "慢慢练" },
      { thai: "ค่อย ๆ ดีขึ้น", roman: "khawy khawy dii kheun", chinese: "逐渐变好" },
    ],
    tags: ["逐渐", "建议", "副词"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpra-jam",
    thai: "ประจำ",
    roman: "bpra-jam",
    chinese: "经常；固定；常规",
    partOfSpeech: "副词",
    theme: "频率",
    level: "a2",
    priority: 2064,
    senses: [
      {
        id: "regularly-fixed",
        chinese: "表示经常发生、固定负责或常规状态",
        examples: [
          {
            thai: "เขาฝึกฟังข่าวสั้นเป็นประจำ จึงเข้าใจสำเนียงธรรมชาติเร็วขึ้น",
            roman: "khao fuek fang khaao san bpen bpra-jam jeung khao-jai sam-niiang tham-ma-chaat reo kheun",
            chinese: "他经常练习听短新闻，所以更快理解自然口音。",
          },
        ],
        usageNotesZh: ["ประจำ 可单独用，也常见于 เป็นประจำ。"],
      },
    ],
    synonyms: [{ thai: "เป็นประจำ", roman: "bpen bpra-jam", chinese: "经常；定期" }],
    antonyms: [{ thai: "นาน ๆ ครั้ง", roman: "naan naan khrang", chinese: "偶尔一次" }],
    comparisons: [
      { target: { thai: "บ่อย ๆ", roman: "baawy baawy", chinese: "常常" }, distinctionZh: "ประจำ 更像固定习惯；บ่อย ๆ 只说频率高。" },
    ],
    collocations: [
      { thai: "ลูกค้าประจำ", roman: "luuk-khaa bpra-jam", chinese: "常客" },
      { thai: "ทำประจำ", roman: "tham bpra-jam", chinese: "经常做" },
    ],
    tags: ["频率", "固定", "习惯"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpen-bpra-jam",
    thai: "เป็นประจำ",
    roman: "bpen bpra-jam",
    chinese: "经常；定期",
    partOfSpeech: "副词",
    theme: "频率",
    level: "a1",
    priority: 2065,
    senses: [
      {
        id: "regularly",
        chinese: "表示按习惯或固定频率经常做",
        examples: [
          {
            thai: "ถ้าอ่านออกเสียงเป็นประจำ คุณจะจำรูปคำได้แม่นขึ้น",
            roman: "thaa aan aawk-siang bpen bpra-jam khun ja jam ruup kham dai maaen kheun",
            chinese: "如果经常朗读，你会把词形记得更准。",
          },
        ],
        usageNotesZh: ["เป็นประจำ 比 บ่อย ๆ 更像有规律的习惯。"],
      },
    ],
    synonyms: [{ thai: "สม่ำเสมอ", roman: "sa-mam-sa-moe", chinese: "规律地；持续稳定地" }],
    antonyms: [{ thai: "ไม่สม่ำเสมอ", roman: "mai sa-mam-sa-moe", chinese: "不规律" }],
    comparisons: [
      { target: { thai: "ทุกวัน", roman: "thuk wan", chinese: "每天" }, distinctionZh: "เป็นประจำ 表示经常规律；ทุกวัน 明确每天。" },
    ],
    collocations: [
      { thai: "ฝึกเป็นประจำ", roman: "fuek bpen bpra-jam", chinese: "经常练习" },
      { thai: "ใช้เป็นประจำ", roman: "chai bpen bpra-jam", chinese: "经常使用" },
    ],
    tags: ["频率", "习惯", "规律"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dta-laawt-maa",
    thai: "ตลอดมา",
    roman: "dta-laawt maa",
    chinese: "一直以来",
    partOfSpeech: "时间表达",
    theme: "时间体",
    level: "a2",
    priority: 2066,
    senses: [
      {
        id: "all-along-until-now",
        chinese: "表示从过去到现在一直如此",
        examples: [
          {
            thai: "ตลอดมาเขาพยายามเรียนด้วยตัวเอง แม้จะไม่มีเวลามาก",
            roman: "dta-laawt maa khao pha-yaa-yaam riian duai dtua eeng maae ja mai mii wee-laa maak",
            chinese: "一直以来他都努力自学，虽然没有很多时间。",
          },
        ],
        usageNotesZh: ["ตลอดมา 常用于回顾从过去延续到现在的情况。"],
      },
    ],
    synonyms: [{ thai: "มาตลอด", roman: "maa dta-laawt", chinese: "一直以来" }],
    antonyms: [{ thai: "เพิ่ง", roman: "phoeng", chinese: "刚刚；才" }],
    comparisons: [
      { target: { thai: "ตลอดเวลา", roman: "dta-laawt wee-laa", chinese: "一直；全程" }, distinctionZh: "ตลอดมา 强调直到现在的历程；ตลอดเวลา 强调持续不断。" },
    ],
    collocations: [
      { thai: "ตลอดมาจนถึงวันนี้", roman: "dta-laawt maa jon thueng wan-nii", chinese: "一直到今天" },
      { thai: "พยายามตลอดมา", roman: "pha-yaa-yaam dta-laawt maa", chinese: "一直以来努力" },
    ],
    tags: ["延续", "回顾", "时间"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dta-laawt-wee-laa",
    thai: "ตลอดเวลา",
    roman: "dta-laawt wee-laa",
    chinese: "一直；始终；全程",
    partOfSpeech: "副词",
    theme: "时间体",
    level: "a1",
    priority: 2067,
    senses: [
      {
        id: "all-the-time",
        chinese: "表示某状态或动作持续不断",
        examples: [
          {
            thai: "เวลาเรียนออนไลน์ ไม่ควรเปิดไมค์ตลอดเวลาเพราะจะรบกวนเพื่อน",
            roman: "wee-laa riian awn-lai mai khuuan bpoet mai dta-laawt wee-laa phraw ja rop-guuan phuean",
            chinese: "线上学习时，不应该一直开着麦克风，因为会打扰同学。",
          },
        ],
        usageNotesZh: ["ตลอดเวลา 强调全程持续，有时可带负面“老是”。"],
      },
    ],
    synonyms: [{ thai: "ตลอดทั้งเวลา", roman: "dta-laawt thang wee-laa", chinese: "整个时间都" }],
    antonyms: [{ thai: "บางครั้ง", roman: "baang khrang", chinese: "有时候" }],
    comparisons: [
      { target: { thai: "เสมอ", roman: "sa-moe", chinese: "总是；一贯" }, distinctionZh: "ตลอดเวลา 强调时间上不断；เสมอ 强调一贯如此。" },
    ],
    collocations: [
      { thai: "คิดตลอดเวลา", roman: "khit dta-laawt wee-laa", chinese: "一直在想" },
      { thai: "เปิดตลอดเวลา", roman: "bpoet dta-laawt wee-laa", chinese: "一直开着" },
    ],
    tags: ["持续", "频率", "时间"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naan-naan-khrang",
    thai: "นาน ๆ ครั้ง",
    roman: "naan naan khrang",
    chinese: "偶尔；很久一次",
    partOfSpeech: "副词",
    theme: "频率",
    level: "a2",
    priority: 2068,
    senses: [
      {
        id: "rarely-once-in-a-while",
        chinese: "表示频率低，很久才发生一次",
        examples: [
          {
            thai: "ฉันนาน ๆ ครั้งจะดูหนังไทย แต่ฟังเพลงไทยเกือบทุกวัน",
            roman: "chan naan naan khrang ja duu nang thai dtaae fang phleeng thai geuuap thuk wan",
            chinese: "我偶尔才看泰国电影，但几乎每天听泰语歌。",
          },
        ],
        usageNotesZh: ["นาน ๆ ครั้ง 比 บางครั้ง 更强调间隔很久。"],
      },
    ],
    synonyms: [{ thai: "ไม่บ่อย", roman: "mai baawy", chinese: "不常" }],
    antonyms: [{ thai: "บ่อย ๆ", roman: "baawy baawy", chinese: "常常" }],
    comparisons: [
      { target: { thai: "บางครั้ง", roman: "baang khrang", chinese: "有时候" }, distinctionZh: "นาน ๆ ครั้ง 更少；บางครั้ง 只是有时。" },
    ],
    collocations: [
      { thai: "นาน ๆ ครั้งถึงจะ", roman: "naan naan khrang thueng ja", chinese: "很久才会" },
      { thai: "เจอนาน ๆ ครั้ง", roman: "joo naan naan khrang", chinese: "偶尔见到" },
    ],
    tags: ["频率", "偶尔", "低频"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thuk-khrang",
    thai: "ทุกครั้ง",
    roman: "thuk khrang",
    chinese: "每次",
    partOfSpeech: "副词",
    theme: "频率",
    level: "a1",
    priority: 2069,
    senses: [
      {
        id: "every-time",
        chinese: "表示每一次发生同类事情时都如此",
        examples: [
          {
            thai: "ทุกครั้งที่ฟังเสียงใหม่ ฉันจะเขียนสิ่งที่ได้ยินลงในสมุด",
            roman: "thuk khrang thii fang siang mai chan ja khiian sing thii dai-yin long nai sa-mut",
            chinese: "每次听新声音时，我都会把听到的东西写在本子里。",
          },
        ],
        usageNotesZh: ["ทุกครั้งที่... 是很常用的“每当……”结构。"],
      },
    ],
    synonyms: [{ thai: "ทุกที", roman: "thuk thii", chinese: "每次；老是" }],
    antonyms: [{ thai: "บางครั้ง", roman: "baang khrang", chinese: "有时候" }],
    comparisons: [
      { target: { thai: "ทุกวัน", roman: "thuk wan", chinese: "每天" }, distinctionZh: "ทุกครั้ง 按事件次数；ทุกวัน 按日期频率。" },
    ],
    collocations: [
      { thai: "ทุกครั้งที่", roman: "thuk khrang thii", chinese: "每当……" },
      { thai: "ทำทุกครั้ง", roman: "tham thuk khrang", chinese: "每次都做" },
    ],
    tags: ["频率", "每次", "时间"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thuk-thii",
    thai: "ทุกที",
    roman: "thuk thii",
    chinese: "每次；老是",
    partOfSpeech: "副词",
    theme: "频率",
    level: "a2",
    priority: 2070,
    senses: [
      {
        id: "every-time-colloquial",
        chinese: "口语中表示每次都这样，有时带抱怨或强调",
        examples: [
          {
            thai: "พอเจอคำยาว ๆ ฉันอ่านผิดทุกที ต้องฝึกแบ่งพยางค์ใหม่",
            roman: "phaaw joo kham yaao yaao chan aan phit thuk thii dtawng fuek baeng pha-yaang mai",
            chinese: "一遇到长词我每次都读错，得重新练习分音节。",
          },
        ],
        usageNotesZh: ["ทุกที 比 ทุกครั้ง 更口语，常带“老是”的情绪。"],
      },
    ],
    synonyms: [{ thai: "ทุกครั้ง", roman: "thuk khrang", chinese: "每次" }],
    antonyms: [{ thai: "บางที", roman: "baang-thii", chinese: "有时；也许" }],
    comparisons: [
      { target: { thai: "เสมอ", roman: "sa-moe", chinese: "总是" }, distinctionZh: "ทุกที 常指重复事件；เสมอ 更抽象一贯。" },
    ],
    collocations: [
      { thai: "ผิดทุกที", roman: "phit thuk thii", chinese: "每次都错" },
      { thai: "ลืมทุกที", roman: "luuem thuk thii", chinese: "老是忘" },
    ],
    tags: ["频率", "口语", "重复"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "suuan-yai",
    thai: "ส่วนใหญ่",
    roman: "suuan yai",
    chinese: "大部分；多数",
    partOfSpeech: "数量词",
    theme: "数量",
    level: "a1",
    priority: 2071,
    senses: [
      {
        id: "majority-most",
        chinese: "表示大多数部分或多数人",
        examples: [
          {
            thai: "นักเรียนส่วนใหญ่เข้าใจบทนี้แล้ว แต่ยังมีบางคนอยากถามเพิ่ม",
            roman: "nak-riian suuan yai khao-jai bot nii laaeo dtaae yang mii baang khon yaak thaam phoem",
            chinese: "大部分学生已经理解这一课了，但还有一些人想多问。",
          },
        ],
        usageNotesZh: ["ส่วนใหญ่ 可作名词性短语，也可放句首表示“通常/大多”。"],
      },
    ],
    synonyms: [{ thai: "ส่วนมาก", roman: "suuan maak", chinese: "大多；多数" }],
    antonyms: [{ thai: "ส่วนน้อย", roman: "suuan naawy", chinese: "少数" }],
    comparisons: [
      { target: { thai: "ทั้งหมด", roman: "thang-mot", chinese: "全部" }, distinctionZh: "ส่วนใหญ่ 是大部分，不是全部。" },
    ],
    collocations: [
      { thai: "คนส่วนใหญ่", roman: "khon suuan yai", chinese: "大多数人" },
      { thai: "ส่วนใหญ่แล้ว", roman: "suuan yai laaeo", chinese: "大体上；通常" },
    ],
    tags: ["数量", "多数", "概括"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "suuan-maak",
    thai: "ส่วนมาก",
    roman: "suuan maak",
    chinese: "大多；多数",
    partOfSpeech: "数量词",
    theme: "数量",
    level: "a1",
    priority: 2072,
    senses: [
      {
        id: "mostly-most",
        chinese: "表示大多数情况或大部分对象",
        examples: [
          {
            thai: "คำเชื่อมส่วนมากอยู่หน้าประโยค แต่บางคำอยู่กลางประโยค",
            roman: "kham cheuuam suuan maak yuu naa bpra-yook dtaae baang kham yuu glaang bpra-yook",
            chinese: "连接词大多在句子前面，但有些词在句子中间。",
          },
        ],
        usageNotesZh: ["ส่วนมาก 和 ส่วนใหญ่ 很接近，都表示“大多/多数”。"],
      },
    ],
    synonyms: [{ thai: "ส่วนใหญ่", roman: "suuan yai", chinese: "大部分；多数" }],
    antonyms: [{ thai: "ส่วนน้อย", roman: "suuan naawy", chinese: "少数" }],
    comparisons: [
      { target: { thai: "ส่วนใหญ่", roman: "suuan yai", chinese: "大多数" }, distinctionZh: "两者接近；ส่วนใหญ่ 更常作“大部分”，ส่วนมาก 常作“大多情况下”。" },
    ],
    collocations: [
      { thai: "ส่วนมากจะ", roman: "suuan maak ja", chinese: "大多会" },
      { thai: "โดยส่วนมาก", roman: "dooi suuan maak", chinese: "大体上；大多" },
    ],
    tags: ["数量", "多数", "概括"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "juuan-ja",
    thai: "จวนจะ",
    roman: "juaan ja",
    chinese: "快要；将近要",
    partOfSpeech: "副词",
    theme: "时间体",
    level: "a2",
    priority: 2073,
    senses: [
      {
        id: "nearly-about-to",
        chinese: "表示某事快要发生，语气稍书面或较有叙述感",
        examples: [
          {
            thai: "เมื่อจวนจะหมดเวลา ครูให้เราตรวจคำตอบอีกครั้งอย่างรวดเร็ว",
            roman: "muea juaan ja mot wee-laa khruu hai rao dtruat kham-dtaawp iik khrang yaang ruaat-reo",
            chinese: "快到时间结束时，老师让我们快速再检查一次答案。",
          },
        ],
        usageNotesZh: ["จวนจะ 常用于“快要……”，比 กำลังจะ 更强调接近临界点。"],
      },
    ],
    synonyms: [{ thai: "ใกล้จะ", roman: "glai ja", chinese: "快要" }],
    antonyms: [{ thai: "ยังอีกนาน", roman: "yang iik naan", chinese: "还要很久" }],
    comparisons: [
      { target: { thai: "กำลังจะ", roman: "gam-lang ja", chinese: "正要；即将" }, distinctionZh: "จวนจะ 强调快到某点；กำลังจะ 强调正要发生。" },
    ],
    collocations: [
      { thai: "จวนจะเสร็จ", roman: "juaan ja set", chinese: "快完成了" },
      { thai: "จวนจะถึง", roman: "juaan ja thueng", chinese: "快到了" },
    ],
    tags: ["快要", "时间体", "临近"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "geuuap-ja",
    thai: "เกือบจะ",
    roman: "geuuap ja",
    chinese: "差点；几乎要",
    partOfSpeech: "副词",
    theme: "时间体",
    level: "a1",
    priority: 2074,
    senses: [
      {
        id: "almost-about-to",
        chinese: "表示接近发生或达到，但未必真的发生",
        examples: [
          {
            thai: "เมื่อวานฉันเกือบจะลืมส่งการบ้าน แต่เพื่อนเตือนทันเวลา",
            roman: "muea-waan chan geuuap ja luuem song gaan-baan dtaae phuean dteuuan than wee-laa",
            chinese: "昨天我差点忘了交作业，但朋友及时提醒了。",
          },
        ],
        usageNotesZh: ["เกือบจะ 常用于“差点……”，结果是否发生要看上下文。"],
      },
    ],
    synonyms: [{ thai: "จวนจะ", roman: "juaan ja", chinese: "快要" }],
    antonyms: [{ thai: "ยังไม่ใกล้", roman: "yang mai glai", chinese: "还不接近" }],
    comparisons: [
      { target: { thai: "แทบจะ", roman: "thaaep ja", chinese: "几乎；简直" }, distinctionZh: "เกือบจะ 说接近；แทบจะ 常带强调“几乎都要”。" },
    ],
    collocations: [
      { thai: "เกือบจะลืม", roman: "geuuap ja luuem", chinese: "差点忘了" },
      { thai: "เกือบจะเสร็จ", roman: "geuuap ja set", chinese: "快完成了" },
    ],
    tags: ["接近", "差点", "时间体"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaaep-ja",
    thai: "แทบจะ",
    roman: "thaaep ja",
    chinese: "几乎；简直快要",
    partOfSpeech: "副词",
    theme: "程度",
    level: "a2",
    priority: 2075,
    senses: [
      {
        id: "almost-nearly-emphatic",
        chinese: "强调程度接近某状态，常带夸张或强烈语气",
        examples: [
          {
            thai: "ประโยคนี้ยาวมาก ฉันแทบจะต้องอ่านสองรอบถึงเข้าใจ",
            roman: "bpra-yook nii yaao maak chan thaaep ja dtawng aan saawng raawp thueng khao-jai",
            chinese: "这个句子很长，我几乎得读两遍才懂。",
          },
        ],
        usageNotesZh: ["แทบจะ 常用于强调“几乎要……”，语气比 เกือบจะ 更强。"],
      },
    ],
    synonyms: [{ thai: "เกือบจะ", roman: "geuuap ja", chinese: "差点；几乎要" }],
    antonyms: [{ thai: "ห่างไกลจาก", roman: "haang glai jaak", chinese: "远远不是" }],
    comparisons: [
      { target: { thai: "เกือบจะ", roman: "geuuap ja", chinese: "几乎要" }, distinctionZh: "แทบจะ 更强调程度，常带夸张；เกือบจะ 更中性。" },
    ],
    collocations: [
      { thai: "แทบจะไม่ได้", roman: "thaaep ja mai dai", chinese: "几乎不能" },
      { thai: "แทบจะลืม", roman: "thaaep ja luuem", chinese: "差点就忘" },
    ],
    tags: ["程度", "几乎", "强调"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phaaw",
    thai: "พอ",
    roman: "phaaw",
    chinese: "够；一……就……；刚好",
    partOfSpeech: "副词",
    theme: "连接",
    level: "a1",
    priority: 2076,
    senses: [
      {
        id: "enough-when",
        chinese: "可表示足够，也可引出时间条件“一……就……”",
        examples: [
          {
            thai: "พอเข้าใจรูปประโยคแล้ว การจำคำใหม่จะง่ายขึ้นมาก",
            roman: "phaaw khao-jai ruup bpra-yook laaeo gaan jam kham mai ja ngaai kheun maak",
            chinese: "一理解句型以后，记新词就会容易很多。",
          },
        ],
        usageNotesZh: ["พอ 的核心有“够”和“到某点就……”两种常见用法。"],
      },
    ],
    synonyms: [{ thai: "เพียงพอ", roman: "phiiang-phaaw", chinese: "足够" }],
    antonyms: [{ thai: "ไม่พอ", roman: "mai phaaw", chinese: "不够" }],
    comparisons: [
      { target: { thai: "เมื่อ", roman: "muea", chinese: "当……时" }, distinctionZh: "พอ...แล้ว 常表示一达到条件就产生后果；เมื่อ 更中性地标时间。" },
    ],
    collocations: [
      { thai: "พอแล้ว", roman: "phaaw laaeo", chinese: "够了" },
      { thai: "พอถึง", roman: "phaaw thueng", chinese: "一到……就" },
    ],
    tags: ["足够", "条件", "时间"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thao-doem",
    thai: "เท่าเดิม",
    roman: "thao doem",
    chinese: "和原来一样多；不变",
    partOfSpeech: "副词",
    theme: "数量",
    level: "a2",
    priority: 2077,
    senses: [
      {
        id: "same-as-before",
        chinese: "表示数量、程度或状态保持原来的样子",
        examples: [
          {
            thai: "แม้เรียนบทใหม่แล้ว เราก็ควรทบทวนคำเก่าเท่าเดิม",
            roman: "maae riian bot mai laaeo rao gaw khuuan thop-thuaan kham gao thao doem",
            chinese: "即使学了新课，我们也应该照样复习旧词。",
          },
        ],
        usageNotesZh: ["เท่าเดิม 强调没有增加也没有减少。"],
      },
    ],
    synonyms: [{ thai: "เหมือนเดิม", roman: "muean doem", chinese: "和以前一样" }],
    antonyms: [{ thai: "มากขึ้น", roman: "maak kheun", chinese: "更多；增加" }],
    comparisons: [
      { target: { thai: "เท่ากัน", roman: "thao gan", chinese: "一样多；相等" }, distinctionZh: "เท่าเดิม 和过去比；เท่ากัน 在两个对象之间比。" },
    ],
    collocations: [
      { thai: "ราคาเท่าเดิม", roman: "raa-khaa thao doem", chinese: "价格不变" },
      { thai: "ทำเท่าเดิม", roman: "tham thao doem", chinese: "照原来做" },
    ],
    tags: ["数量", "不变", "比较"],
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thao-gan",
    thai: "เท่ากัน",
    roman: "thao gan",
    chinese: "一样多；相等",
    partOfSpeech: "副词",
    theme: "数量",
    level: "a1",
    priority: 2078,
    senses: [
      {
        id: "equal-same-amount",
        chinese: "表示两个或多个对象在数量、大小或程度上相同",
        examples: [
          {
            thai: "คำสองคำนี้เสียงคล้ายกัน แต่ความหมายไม่เท่ากัน",
            roman: "kham saawng kham nii siang khlaai gan dtaae khwaam-maai mai thao gan",
            chinese: "这两个词声音相似，但意思不一样。",
          },
        ],
        usageNotesZh: ["เท่ากัน 可用于数量、程度、大小等比较。"],
      },
    ],
    synonyms: [{ thai: "เสมอกัน", roman: "sa-moe gan", chinese: "相等；持平" }],
    antonyms: [{ thai: "ไม่เท่ากัน", roman: "mai thao gan", chinese: "不相等；不一样多" }],
    comparisons: [
      { target: { thai: "เหมือนกัน", roman: "muean gan", chinese: "一样；相同" }, distinctionZh: "เท่ากัน 强调数量或程度相等；เหมือนกัน 强调性质相同。" },
    ],
    collocations: [
      { thai: "ราคาเท่ากัน", roman: "raa-khaa thao gan", chinese: "价格一样" },
      { thai: "ยาวเท่ากัน", roman: "yaao thao gan", chinese: "一样长" },
    ],
    tags: ["相等", "比较", "数量"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaang-dtaang",
    thai: "ต่าง ๆ",
    roman: "dtaang dtaang",
    chinese: "各种；不同的",
    partOfSpeech: "数量词",
    theme: "数量",
    level: "a2",
    priority: 2079,
    senses: [
      {
        id: "various",
        chinese: "表示多种不同的人、事物或类别",
        examples: [
          {
            thai: "เราควรฟังตัวอย่างจากสถานการณ์ต่าง ๆ เพื่อจำวิธีใช้คำ",
            roman: "rao khuuan fang dtua-yaang jaak sa-thaan-na-gaan dtaang dtaang phuea jam wi-thii chai kham",
            chinese: "我们应该听来自各种情境的例子，以记住词的用法。",
          },
        ],
        usageNotesZh: ["ต่าง ๆ 常放在名词后，表示“各种各样的”。"],
      },
    ],
    synonyms: [{ thai: "หลายแบบ", roman: "laai baaep", chinese: "多种类型" }],
    antonyms: [{ thai: "แบบเดียว", roman: "baaep diaao", chinese: "同一种" }],
    comparisons: [
      { target: { thai: "หลาย", roman: "laai", chinese: "许多" }, distinctionZh: "ต่าง ๆ 强调种类不同；หลาย 强调数量不少。" },
    ],
    collocations: [
      { thai: "เรื่องต่าง ๆ", roman: "rueang dtaang dtaang", chinese: "各种事情" },
      { thai: "คำต่าง ๆ", roman: "kham dtaang dtaang", chinese: "各种词" },
    ],
    tags: ["数量", "种类", "后置修饰"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaae-la",
    thai: "แต่ละ",
    roman: "dtaae la",
    chinese: "每个；各个",
    partOfSpeech: "数量词",
    theme: "数量",
    level: "a1",
    priority: 2080,
    senses: [
      {
        id: "each-individual",
        chinese: "放在名词前，强调逐个看待每一个",
        examples: [
          {
            thai: "แต่ละบทมีคำใหม่ไม่มาก แต่ต้องฝึกใช้ในประโยคจริง",
            roman: "dtaae la bot mii kham mai mai maak dtaae dtawng fuek chai nai bpra-yook jing",
            chinese: "每一课的新词不多，但必须练习在真实句子里使用。",
          },
        ],
        usageNotesZh: ["แต่ละ 强调逐个单位，与 ทุก 的“所有”感觉不同。"],
      },
    ],
    synonyms: [{ thai: "ทุก ๆ", roman: "thuk thuk", chinese: "每一个" }],
    antonyms: [{ thai: "รวมกัน", roman: "ruuam gan", chinese: "合在一起" }],
    comparisons: [
      { target: { thai: "ทุก", roman: "thuk", chinese: "每；所有" }, distinctionZh: "แต่ละ 强调一个一个分别看；ทุก 更强调全部都包括。" },
    ],
    collocations: [
      { thai: "แต่ละคน", roman: "dtaae la khon", chinese: "每个人" },
      { thai: "แต่ละวัน", roman: "dtaae la wan", chinese: "每天；每一天" },
    ],
    tags: ["每个", "数量", "分别"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khon-la",
    thai: "คนละ",
    roman: "khon la",
    chinese: "每人各……",
    partOfSpeech: "数量词",
    theme: "数量",
    level: "a2",
    priority: 2081,
    senses: [
      {
        id: "per-person-each",
        chinese: "表示按人分配，每个人各自得到或做某数量",
        examples: [
          {
            thai: "ครูให้เราพูดคนละสองประโยคเกี่ยวกับครอบครัวของตัวเอง",
            roman: "khruu hai rao phuut khon la saawng bpra-yook giaao gap khraawp-khruua khaawng dtua eeng",
            chinese: "老师让我们每人说两个关于自己家庭的句子。",
          },
        ],
        usageNotesZh: ["คนละ 后面接数量，表示“每人各……”。"],
      },
    ],
    synonyms: [{ thai: "ต่อคน", roman: "dtaaw khon", chinese: "每人" }],
    antonyms: [{ thai: "รวมกัน", roman: "ruuam gan", chinese: "合计；一起" }],
    comparisons: [
      { target: { thai: "ทีละคน", roman: "thii la khon", chinese: "一个人一个人地" }, distinctionZh: "คนละ 说分配数量；ทีละคน 说顺序逐一。" },
    ],
    collocations: [
      { thai: "คนละหนึ่งข้อ", roman: "khon la nueng khaaw", chinese: "每人一题" },
      { thai: "คนละกี่บาท", roman: "khon la gii baat", chinese: "每人多少泰铢" },
    ],
    tags: ["分配", "每人", "数量"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "la-distributive",
    thai: "ละ",
    roman: "la",
    chinese: "每；各（分配）",
    partOfSpeech: "数量词",
    theme: "数量",
    level: "a2",
    priority: 2082,
    senses: [
      {
        id: "per-each",
        chinese: "放在单位后表示每个单位的数量或价格",
        examples: [
          {
            thai: "แบบฝึกหัดนี้มีสิบข้อ ข้อละหนึ่งคะแนน รวมสิบคะแนน",
            roman: "baaep-fuek-hat nii mii sip khaaw khaaw la nueng kha-naaen ruuam sip kha-naaen",
            chinese: "这个练习有十题，每题一分，共十分。",
          },
        ],
        usageNotesZh: ["ละ 常出现在 วันละ、คนละ、ข้อละ 等分配结构中。"],
      },
    ],
    synonyms: [{ thai: "ต่อ", roman: "dtaaw", chinese: "每；对；接着" }],
    antonyms: [{ thai: "รวม", roman: "ruuam", chinese: "合计；รวม" }],
    comparisons: [
      { target: { thai: "ต่อ", roman: "dtaaw", chinese: "每；对" }, distinctionZh: "ละ 常跟在单位后；ต่อ 可放在两个名词之间表示“每”。" },
    ],
    collocations: [
      { thai: "วันละ", roman: "wan la", chinese: "每天……" },
      { thai: "ข้อละ", roman: "khaaw la", chinese: "每题……" },
    ],
    tags: ["分配", "数量", "单位"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "neueang-jaak",
    thai: "เนื่องจาก",
    roman: "neueang jaak",
    chinese: "由于；因为",
    partOfSpeech: "连接词",
    theme: "因果",
    level: "a2",
    priority: 2083,
    senses: [
      {
        id: "formal-because",
        chinese: "较正式地引出原因，常用于说明、公告或书面语",
        examples: [
          {
            thai: "เนื่องจากวันนี้ฝนตกหนัก โรงเรียนจึงเลื่อนเวลาเริ่มเรียนออกไป",
            roman: "neueang jaak wan-nii fon dtok nak roong-riian jeung leuuan wee-laa roem riian aawk bpai",
            chinese: "由于今天雨下得很大，学校因此推迟了上课时间。",
          },
        ],
        usageNotesZh: ["เนื่องจาก 比 เพราะ 更正式，常和 จึง 搭配形成因果链。"],
      },
    ],
    synonyms: [{ thai: "เพราะว่า", roman: "phraw waa", chinese: "因为" }],
    antonyms: [{ thai: "ดังนั้น", roman: "dang-nan", chinese: "因此；所以" }],
    comparisons: [
      { target: { thai: "เพราะ", roman: "phraw", chinese: "因为" }, distinctionZh: "เนื่องจาก 更正式；เพราะ 更日常。" },
    ],
    collocations: [
      { thai: "เนื่องจากว่า", roman: "neueang jaak waa", chinese: "由于……" },
      { thai: "เนื่องจากเหตุผลนี้", roman: "neueang jaak heet-phon nii", chinese: "由于这个原因" },
    ],
    tags: ["原因", "正式", "连接词"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "neueang-jaak-waa",
    thai: "เนื่องจากว่า",
    roman: "neueang jaak waa",
    chinese: "由于；因为说到……",
    partOfSpeech: "连接词",
    theme: "因果",
    level: "a2",
    priority: 2084,
    senses: [
      {
        id: "because-clause",
        chinese: "引出完整原因小句，语气较正式但口语中也能听到",
        examples: [
          {
            thai: "เนื่องจากว่าคำนี้มีหลายความหมาย ครูจึงให้ตัวอย่างเพิ่มอีกสองประโยค",
            roman: "neueang jaak waa kham nii mii laai khwaam-maai khruu jeung hai dtua-yaang phoem iik saawng bpra-yook",
            chinese: "由于这个词有多个意思，老师因此又给了两个例句。",
          },
        ],
        usageNotesZh: ["ว่า 让后面原因更像一个完整从句。"],
      },
    ],
    synonyms: [{ thai: "เนื่องจาก", roman: "neueang jaak", chinese: "由于" }],
    antonyms: [{ thai: "ด้วยเหตุนี้", roman: "duai heet nii", chinese: "因此；由于这个原因" }],
    comparisons: [
      { target: { thai: "เนื่องจาก", roman: "neueang jaak", chinese: "由于" }, distinctionZh: "สอง者接近；เนื่องจากว่า 后面从句感更明显。" },
    ],
    collocations: [
      { thai: "เนื่องจากว่าเรา", roman: "neueang jaak waa rao", chinese: "由于我们……" },
      { thai: "เนื่องจากว่าไม่", roman: "neueang jaak waa mai", chinese: "由于不……" },
    ],
    tags: ["原因", "从句", "正式"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "cha-nan",
    thai: "ฉะนั้น",
    roman: "cha-nan",
    chinese: "因此；所以",
    partOfSpeech: "连接词",
    theme: "因果",
    level: "a2",
    priority: 2085,
    senses: [
      {
        id: "therefore",
        chinese: "根据前面的理由推出结果，语气比口语 ก็เลย 更正式",
        examples: [
          {
            thai: "คำนี้ใช้บ่อยมาก ฉะนั้นควรฝึกออกเสียงให้ชัดตั้งแต่แรก",
            roman: "kham nii chai baawy maak cha-nan khuuan fuek aawk-siang hai chat dtang-dtaae raaek",
            chinese: "这个词使用很频繁，因此应该从一开始就把发音练清楚。",
          },
        ],
        usageNotesZh: ["ฉะนั้น 常用于说明和总结，等同“因此/所以”。"],
      },
    ],
    synonyms: [{ thai: "ดังนั้น", roman: "dang-nan", chinese: "因此；所以" }],
    antonyms: [{ thai: "เพราะว่า", roman: "phraw waa", chinese: "因为" }],
    comparisons: [
      { target: { thai: "ก็เลย", roman: "gaw loei", chinese: "所以就" }, distinctionZh: "ฉะนั้น 更正式；ก็เลย 更口语。" },
    ],
    collocations: [
      { thai: "เพราะฉะนั้น", roman: "phraw-cha-nan", chinese: "因此；所以" },
      { thai: "ฉะนั้นเรา", roman: "cha-nan rao", chinese: "所以我们……" },
    ],
    tags: ["结果", "逻辑", "连接词"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phraw-heet-nii",
    thai: "เพราะเหตุนี้",
    roman: "phraw heet nii",
    chinese: "因为这个原因",
    partOfSpeech: "连接词",
    theme: "因果",
    level: "a2",
    priority: 2086,
    senses: [
      {
        id: "for-this-reason",
        chinese: "回指前面原因，表示正因为这个原因",
        examples: [
          {
            thai: "หลายคนสับสนคำสองคำนี้ เพราะเหตุนี้ครูจึงทำตารางเปรียบเทียบให้",
            roman: "laai khon sap-son kham saawng kham nii phraw heet nii khruu jeung tham dtaa-raang bpriiap-thiiap hai",
            chinese: "很多人混淆这两个词，正因为这个原因老师做了对照表给大家。",
          },
        ],
        usageNotesZh: ["เพราะเหตุนี้ 强调“原因在这里”，常用于解释前后逻辑。"],
      },
    ],
    synonyms: [{ thai: "ด้วยเหตุนี้", roman: "duai heet nii", chinese: "因此；由于这个原因" }],
    antonyms: [{ thai: "โดยไม่มีเหตุผล", roman: "dooi mai mii heet-phon", chinese: "没有理由地" }],
    comparisons: [
      { target: { thai: "เพราะว่า", roman: "phraw waa", chinese: "因为" }, distinctionZh: "เพราะว่า 直接引出原因；เพราะเหตุนี้ 回指已说的原因。" },
    ],
    collocations: [
      { thai: "เพราะเหตุนี้จึง", roman: "phraw heet nii jeung", chinese: "因此就" },
      { thai: "เพราะเหตุนี้เรา", roman: "phraw heet nii rao", chinese: "因此我们" },
    ],
    tags: ["原因", "回指", "连接"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "duai-heet-nii",
    thai: "ด้วยเหตุนี้",
    roman: "duai heet nii",
    chinese: "因此；由于这个原因",
    partOfSpeech: "连接词",
    theme: "因果",
    level: "a2",
    priority: 2087,
    senses: [
      {
        id: "therefore-for-this-reason",
        chinese: "书面或正式地承接前文原因，引出结果",
        examples: [
          {
            thai: "ผู้เรียนมีเวลาน้อย ด้วยเหตุนี้บทเรียนจึงแบ่งเป็นตอนสั้น ๆ",
            roman: "phuu-riian mii wee-laa naawy duai heet nii bot-riian jeung baeng bpen dtaawn san san",
            chinese: "学习者时间少，因此课程被分成短小的部分。",
          },
        ],
        usageNotesZh: ["ด้วยเหตุนี้ 比 เพราะเหตุนี้ 更偏正式总结。"],
      },
    ],
    synonyms: [{ thai: "เพราะเหตุนี้", roman: "phraw heet nii", chinese: "因为这个原因" }],
    antonyms: [{ thai: "โดยไม่มีเหตุผล", roman: "dooi mai mii heet-phon", chinese: "没有理由地" }],
    comparisons: [
      { target: { thai: "ฉะนั้น", roman: "cha-nan", chinese: "因此" }, distinctionZh: "ด้วยเหตุนี้ 明确回指原因；ฉะนั้น 更直接推出结果。" },
    ],
    collocations: [
      { thai: "ด้วยเหตุนี้จึง", roman: "duai heet nii jeung", chinese: "因此就" },
      { thai: "ด้วยเหตุนี้เอง", roman: "duai heet nii eeng", chinese: "正是因为这个原因" },
    ],
    tags: ["结果", "正式", "回指"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "maae-waa",
    thai: "แม้ว่า",
    roman: "maae waa",
    chinese: "虽然；即使",
    partOfSpeech: "连接词",
    theme: "对比",
    level: "a2",
    priority: 2088,
    senses: [
      {
        id: "although-even-though",
        chinese: "引出让步条件，表示虽然如此但后文仍成立",
        examples: [
          {
            thai: "แม้ว่าประโยคนี้จะยาว ฉันก็พอเข้าใจความหมายหลักได้",
            roman: "maae waa bpra-yook nii ja yaao chan gaw phaaw khao-jai khwaam-maai lak dai",
            chinese: "虽然这个句子很长，我还是大致能理解主要意思。",
          },
        ],
        usageNotesZh: ["แม้ว่า 常和 ก็ 搭配，形成“虽然……也/仍然……”。"],
      },
    ],
    synonyms: [{ thai: "ถึงแม้ว่า", roman: "thueng maae waa", chinese: "尽管；虽然" }],
    antonyms: [{ thai: "เพราะว่า", roman: "phraw waa", chinese: "因为" }],
    comparisons: [
      { target: { thai: "แต่", roman: "dtaae", chinese: "但是" }, distinctionZh: "แม้ว่า 引出让步背景；แต่ 直接连接转折。" },
    ],
    collocations: [
      { thai: "แม้ว่า...ก็", roman: "maae waa...gaw", chinese: "虽然……也" },
      { thai: "แม้ว่าจะ", roman: "maae waa ja", chinese: "即使会……" },
    ],
    tags: ["让步", "对比", "连接词"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thueng-maae-waa",
    thai: "ถึงแม้ว่า",
    roman: "thueng maae waa",
    chinese: "尽管；虽然",
    partOfSpeech: "连接词",
    theme: "对比",
    level: "a2",
    priority: 2089,
    senses: [
      {
        id: "even-though",
        chinese: "较完整地引出让步条件，表示即使情况如此",
        examples: [
          {
            thai: "ถึงแม้ว่าฉันจะจำคำได้ไม่หมด แต่ฉันก็กล้าพูดมากขึ้น",
            roman: "thueng maae waa chan ja jam kham dai mai mot dtaae chan gaw glaa phuut maak kheun",
            chinese: "尽管我还记不住所有词，但我更敢说了。",
          },
        ],
        usageNotesZh: ["ถึงแม้ว่า 比 แม้ว่า 更完整，常用于正式或认真表达。"],
      },
    ],
    synonyms: [{ thai: "แม้ว่า", roman: "maae waa", chinese: "虽然；即使" }],
    antonyms: [{ thai: "เพราะว่า", roman: "phraw waa", chinese: "因为" }],
    comparisons: [
      { target: { thai: "แม้ว่า", roman: "maae waa", chinese: "虽然" }, distinctionZh: "ถึงแม้ว่า 更完整；แม้ว่า 更简洁。" },
    ],
    collocations: [
      { thai: "ถึงแม้ว่าจะ", roman: "thueng maae waa ja", chinese: "尽管会……" },
      { thai: "ถึงแม้ว่า...แต่", roman: "thueng maae waa...dtaae", chinese: "尽管……但是" },
    ],
    tags: ["让步", "对比", "正式"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thang-thii",
    thai: "ทั้งที่",
    roman: "thang thii",
    chinese: "明明；尽管事实上",
    partOfSpeech: "连接词",
    theme: "对比",
    level: "a2",
    priority: 2090,
    senses: [
      {
        id: "despite-the-fact",
        chinese: "指出与结果相反的事实，常带“明明……”的感觉",
        examples: [
          {
            thai: "ทั้งที่เขาฝึกทุกวัน เขาก็ยังไม่มั่นใจเวลาออกเสียงต่อหน้าคนอื่น",
            roman: "thang thii khao fuek thuk wan khao gaw yang mai man-jai wee-laa aawk-siang dtaaw naa khon uen",
            chinese: "明明他每天练习，但在人前发音时还是不自信。",
          },
        ],
        usageNotesZh: ["ทั้งที่ 常带反差或意外感。"],
      },
    ],
    synonyms: [{ thai: "แม้ว่า", roman: "maae waa", chinese: "虽然" }],
    antonyms: [{ thai: "เพราะว่า", roman: "phraw waa", chinese: "因为" }],
    comparisons: [
      { target: { thai: "แม้ว่า", roman: "maae waa", chinese: "虽然" }, distinctionZh: "ทั้งที่ 更强调事实与结果的反差；แม้ว่า 更中性。" },
    ],
    collocations: [
      { thai: "ทั้งที่รู้", roman: "thang thii ruu", chinese: "明明知道" },
      { thai: "ทั้งที่ยัง", roman: "thang thii yang", chinese: "明明还" },
    ],
    tags: ["反差", "让步", "对比"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "maae-dtaae",
    thai: "แม้แต่",
    roman: "maae dtaae",
    chinese: "连……都；甚至",
    partOfSpeech: "连接词",
    theme: "对比",
    level: "a2",
    priority: 2091,
    senses: [
      {
        id: "even-inclusive",
        chinese: "强调连某个意外或极端对象也包括在内",
        examples: [
          {
            thai: "คำนี้ยากมาก แม้แต่นักเรียนที่เรียนมานานก็ยังอ่านผิดได้",
            roman: "kham nii yaak maak maae dtaae nak-riian thii riian maa naan gaw yang aan phit dai",
            chinese: "这个词很难，连学了很久的学生也可能读错。",
          },
        ],
        usageNotesZh: ["แม้แต่ 常和 ก็ 搭配，表示“连……也……”。"],
      },
    ],
    synonyms: [{ thai: "กระทั่ง", roman: "gra-thang", chinese: "甚至；直到" }],
    antonyms: [{ thai: "เฉพาะ", roman: "cha-phaw", chinese: "仅限；特定" }],
    comparisons: [
      { target: { thai: "แม้ว่า", roman: "maae waa", chinese: "虽然" }, distinctionZh: "แม้แต่ 强调包括某对象；แม้ว่า 引出让步从句。" },
    ],
    collocations: [
      { thai: "แม้แต่เด็ก", roman: "maae dtaae dek", chinese: "连孩子都" },
      { thai: "แม้แต่คำเดียว", roman: "maae dtaae kham diaao", chinese: "连一个词都" },
    ],
    tags: ["甚至", "包含", "强调"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "glap-contrast",
    thai: "กลับ",
    roman: "glap",
    chinese: "反而；却；返回",
    partOfSpeech: "副词",
    theme: "对比",
    level: "a2",
    priority: 2092,
    senses: [
      {
        id: "contrary-result",
        chinese: "表示结果与预期相反，或动作返回",
        examples: [
          {
            thai: "ฉันคิดว่าบทนี้จะยาก แต่กลับเข้าใจง่ายกว่าบทก่อน",
            roman: "chan khit waa bot nii ja yaak dtaae glap khao-jai ngaai gwaa bot gaawn",
            chinese: "我以为这一课会难，结果反而比上一课容易理解。",
          },
        ],
        usageNotesZh: ["กลับ 作“反而”时常放在动词前，表达预期反转。"],
      },
    ],
    synonyms: [{ thai: "ตรงกันข้าม", roman: "dtrong gan khaam", chinese: "相反" }],
    antonyms: [{ thai: "ตามคาด", roman: "dtaam khaat", chinese: "如预期" }],
    comparisons: [
      { target: { thai: "แต่", roman: "dtaae", chinese: "但是" }, distinctionZh: "แต่ 只是转折；กลับ 强调结果反而相反。" },
    ],
    collocations: [
      { thai: "กลับไม่", roman: "glap mai", chinese: "反而不" },
      { thai: "กลับกลายเป็น", roman: "glap glaai bpen", chinese: "反而变成" },
    ],
    tags: ["反转", "对比", "副词"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaaen",
    thai: "แทน",
    roman: "thaaen",
    chinese: "代替；而不是；替",
    partOfSpeech: "副词",
    theme: "对比",
    level: "a1",
    priority: 2093,
    senses: [
      {
        id: "instead-replace",
        chinese: "表示用一个人、物或做法取代另一个",
        examples: [
          {
            thai: "วันนี้ครูให้เราฟังบทสนทนาแทนการอ่านบทความยาว",
            roman: "wan-nii khruu hai rao fang bot-son-tha-naa thaaen gaan aan bot-khwaam yaao",
            chinese: "今天老师让我们听对话，而不是读长文章。",
          },
        ],
        usageNotesZh: ["แทน 可接名词或名词化动作，表示替代。"],
      },
    ],
    synonyms: [{ thai: "แทนที่", roman: "thaaen thii", chinese: "代替；取代" }],
    antonyms: [{ thai: "เหมือนเดิม", roman: "muean doem", chinese: "照旧" }],
    comparisons: [
      { target: { thai: "เปลี่ยน", roman: "bplian", chinese: "改变；更换" }, distinctionZh: "แทน 强调替代关系；เปลี่ยน 强调变化动作。" },
    ],
    collocations: [
      { thai: "ใช้แทน", roman: "chai thaaen", chinese: "用来代替" },
      { thai: "ไปแทน", roman: "bpai thaaen", chinese: "代替去" },
    ],
    tags: ["替代", "对比", "副词"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaaen-thii-ja",
    thai: "แทนที่จะ",
    roman: "thaaen thii ja",
    chinese: "与其……不如；不是……而是",
    partOfSpeech: "连接词",
    theme: "对比",
    level: "a2",
    priority: 2094,
    senses: [
      {
        id: "instead-of-doing",
        chinese: "引出被替代的做法，再说明实际或建议的做法",
        examples: [
          {
            thai: "แทนที่จะจำคำเดี่ยว ๆ เราควรจำคำในประโยคสั้น ๆ",
            roman: "thaaen thii ja jam kham diaao diaao rao khuuan jam kham nai bpra-yook san san",
            chinese: "与其记孤立的单词，我们应该把词放在短句里记。",
          },
        ],
        usageNotesZh: ["แทนที่จะ... 常与 ควร / กลับ / ให้... 搭配形成建议或反差。"],
      },
    ],
    synonyms: [{ thai: "แทนการ", roman: "thaaen gaan", chinese: "代替……这件事" }],
    antonyms: [{ thai: "นอกจากจะ", roman: "naawk jaak ja", chinese: "除了会……" }],
    comparisons: [
      { target: { thai: "แทน", roman: "thaaen", chinese: "代替" }, distinctionZh: "แทนที่จะ 后接小句或动词短语；แทน 更短，可直接接名词化动作。" },
    ],
    collocations: [
      { thai: "แทนที่จะรอ", roman: "thaaen thii ja raaw", chinese: "与其等" },
      { thai: "แทนที่จะโทษ", roman: "thaaen thii ja thoot", chinese: "与其责怪" },
    ],
    tags: ["替代", "建议", "连接词"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "suuan-topic-contrast",
    thai: "ส่วน",
    roman: "suuan",
    chinese: "至于；而；部分",
    partOfSpeech: "话语标记",
    theme: "对比",
    level: "a2",
    priority: 2095,
    senses: [
      {
        id: "as-for-contrast",
        chinese: "引出另一个话题或对照对象，相当于“至于……、而……”",
        examples: [
          {
            thai: "ฉันจะฝึกฟังตอนเช้า ส่วนตอนเย็นจะทบทวนคำศัพท์",
            roman: "chan ja fuek fang dtaawn chaao suuan dtaawn yen ja thop-thuaan kham-sap",
            chinese: "我早上会练听力，至于傍晚会复习词汇。",
          },
        ],
        usageNotesZh: ["ส่วน 作话语标记时常放在对照话题前。"],
      },
    ],
    synonyms: [{ thai: "สำหรับ", roman: "sam-rap", chinese: "对于；关于" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "แต่", roman: "dtaae", chinese: "但是" }, distinctionZh: "ส่วน 更像换话题做对照；แต่ 是直接转折。" },
    ],
    collocations: [
      { thai: "ส่วนฉัน", roman: "suuan chan", chinese: "至于我" },
      { thai: "ส่วนเรื่องนี้", roman: "suuan rueang nii", chinese: "至于这件事" },
    ],
    tags: ["话题", "对比", "转场"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naawk-jaak-nii",
    thai: "นอกจากนี้",
    roman: "naawk jaak nii",
    chinese: "此外；除此之外",
    partOfSpeech: "连接词",
    theme: "连接",
    level: "a2",
    priority: 2096,
    senses: [
      {
        id: "in-addition",
        chinese: "添加新信息，表示除了前面所说之外还有",
        examples: [
          {
            thai: "บทนี้มีคำเชื่อมใหม่หลายคำ นอกจากนี้ยังมีแบบฝึกหัดฟังสั้น ๆ",
            roman: "bot nii mii kham cheuuam mai laai kham naawk jaak nii yang mii baaep-fuek-hat fang san san",
            chinese: "这一课有很多新的连接词，此外还有短听力练习。",
          },
        ],
        usageNotesZh: ["นอกจากนี้ 适合书面或清晰说明，比 แล้วก็ 更正式。"],
      },
    ],
    synonyms: [{ thai: "อีกทั้ง", roman: "iik thang", chinese: "而且；另外还" }],
    antonyms: [{ thai: "อย่างไรก็ตาม", roman: "yaang-rai gaw-dtaam", chinese: "然而" }],
    comparisons: [
      { target: { thai: "แล้วก็", roman: "laaeo gaw", chinese: "然后；而且" }, distinctionZh: "นอกจากนี้ 更正式地添加信息；แล้วก็ 更口语。" },
    ],
    collocations: [
      { thai: "นอกจากนี้ยัง", roman: "naawk jaak nii yang", chinese: "此外还" },
      { thai: "นอกจากนี้เรา", roman: "naawk jaak nii rao", chinese: "除此之外我们" },
    ],
    tags: ["补充", "连接", "正式"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "tham-mai-la",
    thai: "ทำไมล่ะ",
    roman: "tham-mai la",
    chinese: "为什么呢；怎么会呢",
    partOfSpeech: "疑问框架",
    theme: "疑问",
    level: "a2",
    priority: 2097,
    senses: [
      {
        id: "why-follow-up",
        chinese: "带追问或接话语气的“为什么呢”，常用于对话",
        examples: [
          {
            thai: "ถ้าคุณไม่อยากอ่านบทนี้ ทำไมล่ะ มันยากเกินไปหรือเปล่า",
            roman: "thaa khun mai yaak aan bot nii tham-mai la man yaak goen bpai rue-bplaao",
            chinese: "如果你不想读这一课，为什么呢？是太难了吗？",
          },
        ],
        usageNotesZh: ["ล่ะ 让问题更像接着对方的话追问。"],
      },
    ],
    synonyms: [{ thai: "เพราะอะไร", roman: "phraw arai", chinese: "因为什么" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "ทำไม", roman: "tham-mai", chinese: "为什么" }, distinctionZh: "ทำไมล่ะ 更有追问或接话感；ทำไม 更中性。" },
    ],
    collocations: [
      { thai: "แล้วทำไมล่ะ", roman: "laaeo tham-mai la", chinese: "那为什么呢" },
      { thai: "ทำไมล่ะครับ", roman: "tham-mai la khrap", chinese: "为什么呢（男性礼貌）" },
    ],
    tags: ["疑问", "追问", "口语"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "laaeo-ngai",
    thai: "แล้วไง",
    roman: "laaeo ngai",
    chinese: "然后呢；那又怎样",
    partOfSpeech: "疑问框架",
    theme: "疑问",
    level: "a2",
    priority: 2098,
    senses: [
      {
        id: "so-what-then",
        chinese: "追问后续或表达“那又怎么样”，语气可中性也可挑衅",
        examples: [
          {
            thai: "ถ้าเราจำคำนี้ได้แล้ว แล้วไง เราควรฝึกใช้ในประโยคต่อใช่ไหม",
            roman: "thaa rao jam kham nii dai laaeo laaeo ngai rao khuuan fuek chai nai bpra-yook dtaaw chai mai",
            chinese: "如果我们已经记住这个词了，然后呢？我们应该继续练习把它用在句子里，对吗？",
          },
        ],
        usageNotesZh: ["แล้วไง 语气很依赖场景；对人说可能显得不耐烦。"],
      },
    ],
    synonyms: [{ thai: "แล้วต่อไป", roman: "laaeo dtaaw bpai", chinese: "然后接下来" }],
    antonyms: [],
    comparisons: [
      { target: { thai: "ว่าไง", roman: "waa ngai", chinese: "怎么样；什么事" }, distinctionZh: "แล้วไง 追问结果或态度；ว่าไง 更像询问对方怎么说。" },
    ],
    collocations: [
      { thai: "แล้วไงต่อ", roman: "laaeo ngai dtaaw", chinese: "然后接着怎样" },
      { thai: "แล้วไงล่ะ", roman: "laaeo ngai la", chinese: "那又怎样呢" },
    ],
    tags: ["疑问", "追问", "口语"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dai-rue-bplaao",
    thai: "ได้หรือเปล่า",
    roman: "dai rue-bplaao",
    chinese: "可以吗；能不能",
    partOfSpeech: "疑问框架",
    theme: "疑问",
    level: "a1",
    priority: 2099,
    senses: [
      {
        id: "can-or-not",
        chinese: "询问能力、许可或可行性，语气比直接命令柔和",
        examples: [
          {
            thai: "ถ้าฉันส่งการบ้านพรุ่งนี้เช้าได้หรือเปล่า วันนี้ยังทำไม่เสร็จ",
            roman: "thaa chan song gaan-baan phrung-nii chaao dai rue-bplaao wan-nii yang tham mai set",
            chinese: "我明天早上交作业可以吗？今天还没做完。",
          },
        ],
        usageNotesZh: ["ได้หรือเปล่า 比 ได้ไหม 稍展开，更像“能不能/可不可以”。"],
      },
    ],
    synonyms: [{ thai: "ได้ไหม", roman: "dai mai", chinese: "可以吗" }],
    antonyms: [{ thai: "ไม่ได้หรือ", roman: "mai dai rue", chinese: "不可以吗" }],
    comparisons: [
      { target: { thai: "ได้ไหม", roman: "dai mai", chinese: "可以吗" }, distinctionZh: "两者接近；ได้หรือเปล่า 语气稍开放。" },
    ],
    collocations: [
      { thai: "ขอได้หรือเปล่า", roman: "khaaw dai rue-bplaao", chinese: "可以请求/要吗" },
      { thai: "ไปได้หรือเปล่า", roman: "bpai dai rue-bplaao", chinese: "可以去吗" },
    ],
    tags: ["疑问", "许可", "能力"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "chai-rue-bplaao",
    thai: "ใช่หรือเปล่า",
    roman: "chai rue-bplaao",
    chinese: "是不是；对不对",
    partOfSpeech: "疑问框架",
    theme: "疑问",
    level: "a1",
    priority: 2100,
    senses: [
      {
        id: "is-it-or-not",
        chinese: "确认某事是否正确，语气比 ใช่ไหม 更开放一点",
        examples: [
          {
            thai: "คำนี้อ่านเสียงยาวใช่หรือเปล่า ผมกลัวว่าจะออกเสียงสั้นไป",
            roman: "kham nii aan siang yaao chai rue-bplaao phom glua waa ja aawk-siang san bpai",
            chinese: "这个词读长音是不是？我怕会发得太短。",
          },
        ],
        usageNotesZh: ["ใช่หรือเปล่า 适合确认判断；回答可用 ใช่ 或 ไม่ใช่。"],
      },
    ],
    synonyms: [{ thai: "ใช่ไหม", roman: "chai mai", chinese: "对吗；是不是" }],
    antonyms: [{ thai: "ไม่ใช่หรือเปล่า", roman: "mai chai rue-bplaao", chinese: "是不是不是" }],
    comparisons: [
      { target: { thai: "ใช่ไหม", roman: "chai mai", chinese: "对吗" }, distinctionZh: "ใช่ไหม 常带预期答案；ใช่หรือเปล่า 更开放地确认。" },
    ],
    collocations: [
      { thai: "ถูกใช่หรือเปล่า", roman: "thuuk chai rue-bplaao", chinese: "是不是正确" },
      { thai: "แบบนี้ใช่หรือเปล่า", roman: "baaep nii chai rue-bplaao", chinese: "是不是这样" },
    ],
    tags: ["疑问", "确认", "判断"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
] satisfies VocabularyExpansionCandidate[];
