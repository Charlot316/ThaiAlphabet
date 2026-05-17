export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type UsefulSetPhrasesTheme =
  | "没问题"
  | "看情况"
  | "随便你"
  | "我也一样"
  | "差不多"
  | "慢慢来"
  | "先这样"
  | "等一下"
  | "确认回应"
  | "轻松结束";

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
  theme: UsefulSetPhrasesTheme,
];

const USEFUL_SET_PHRASES_REFS = [
  "worker-a-a2-useful-set-phrases-02",
  "basic-thai-useful-set-phrases",
];

const rows: Row[] = [
  ["mai-bpen-rai", "ไม่เป็นไร", "mai bpen rai", "没关系；没问题", "短语", "没问题"],
  ["mai-mi-pan-haa", "ไม่มีปัญหา", "mai mii bpan-haa", "没有问题", "句型", "没问题"],
  ["dai-loei", "ได้เลย", "dai loei", "可以，没问题", "短语", "没问题"],
  ["ok-loei", "โอเคเลย", "oo-khee loei", "完全可以；很 OK", "短语", "没问题"],
  ["chai-dai", "ใช้ได้", "chai dai", "可以用；还可以", "短语", "没问题"],
  ["mai-dtawng-huang", "ไม่ต้องห่วง", "mai dtawng huang", "不用担心", "句型", "没问题"],
  ["sabai-maak", "สบายมาก", "sa-baai maak", "很轻松；没问题", "短语", "没问题"],
  ["tham-dai", "ทำได้", "tham dai", "做得到", "句型", "没问题"],
  ["dai-nae-naawn", "ได้แน่นอน", "dai nae naawn", "肯定可以", "句型", "没问题"],
  ["mai-pen-pan-haa-loei", "ไม่เป็นปัญหาเลย", "mai bpen bpan-haa loei", "完全不是问题", "句型", "没问题"],
  ["duu-gaawn", "ดูก่อน", "duu gaawn", "先看看；看情况", "短语", "看情况"],
  ["laew-dtae", "แล้วแต่", "laew dtae", "看……而定；随……", "短语", "看情况"],
  ["laew-dtae-sathaana-gaan", "แล้วแต่สถานการณ์", "laew dtae sa-thaa-na-gaan", "看情况而定", "句型", "看情况"],
  ["thaa-waang", "ถ้าว่าง", "thaa waang", "如果有空", "句型", "看情况"],
  ["thaa-saduak", "ถ้าสะดวก", "thaa sa-duak", "如果方便", "句型", "看情况"],
  ["khoi-waa-gan", "ค่อยว่ากัน", "khaawy waa gan", "到时候再说", "短语", "看情况"],
  ["yang-mai-nae-jai", "ยังไม่แน่ใจ", "yang mai nae jai", "还不确定", "句型", "看情况"],
  ["dtaawng-duu-iik-thii", "ต้องดูอีกที", "dtawng duu iik thii", "还要再看一下", "句型", "看情况"],
  ["thaa-pen-bpai-dai", "ถ้าเป็นไปได้", "thaa bpen bpai dai", "如果可能的话", "句型", "看情况"],
  ["waang-laew-ja-bawk", "ว่างแล้วจะบอก", "waang laew ja baawk", "有空后会告诉你", "句型", "看情况"],
  ["laew-dtae-khun", "แล้วแต่คุณ", "laew dtae khun", "随便你；由你决定", "句型", "随便你"],
  ["laew-dtae-ter", "แล้วแต่เธอ", "laew dtae thoe", "随便你；看你", "句型", "随便你"],
  ["ao-thii-saduak", "เอาที่สะดวก", "ao thii sa-duak", "按方便的来", "句型", "随便你"],
  ["ao-baep-nai-gaw-dai", "เอาแบบไหนก็ได้", "ao baaep nai gaw dai", "哪种都可以", "句型", "随便你"],
  ["ar-ai-gaw-dai", "อะไรก็ได้", "a-rai gaw dai", "什么都可以", "句型", "随便你"],
  ["thii-nai-gaw-dai", "ที่ไหนก็ได้", "thii nai gaw dai", "哪里都可以", "句型", "随便你"],
  ["muea-rai-gaw-dai", "เมื่อไรก็ได้", "muea rai gaw dai", "什么时候都可以", "句型", "随便你"],
  ["mai-seuan", "ไม่เลือก", "mai lueak", "不挑；不选", "动词", "随便你"],
  ["ao-taam-nan", "เอาตามนั้น", "ao dtaam nan", "就按那个来", "句型", "随便你"],
  ["taam-jai-khun", "ตามใจคุณ", "dtaam jai khun", "随你喜欢", "句型", "随便你"],
  ["chan-go-muean-gan", "ฉันก็เหมือนกัน", "chan gaw muean gan", "我也一样", "句型", "我也一样"],
  ["pom-go-muean-gan", "ผมก็เหมือนกัน", "phom gaw muean gan", "我也一样（男性常用）", "句型", "我也一样"],
  ["dichan-go-muean-gan", "ดิฉันก็เหมือนกัน", "di-chan gaw muean gan", "我也一样（女性正式）", "句型", "我也一样"],
  ["duai-khon", "ด้วยคน", "duai khon", "我也要一起；算我一个", "短语", "我也一样"],
  ["duai", "ด้วย", "duai", "也；一起", "副词", "我也一样"],
  ["chaawp-muean-gan", "ชอบเหมือนกัน", "chaawp muean gan", "也喜欢", "句型", "我也一样"],
  ["khit-muean-gan", "คิดเหมือนกัน", "khit muean gan", "想法一样", "句型", "我也一样"],
  ["pen-baep-diao-gan", "เป็นแบบเดียวกัน", "bpen baaep diao gan", "是同一种情况", "句型", "我也一样"],
  ["khoei-muean-gan", "เคยเหมือนกัน", "khoei muean gan", "也曾经……过", "句型", "我也一样"],
  ["mai-dai-muean-gan", "ไม่ได้เหมือนกัน", "mai dai muean gan", "也不行/也不能", "句型", "我也一样"],
  ["bpra-maan", "ประมาณ", "bpra-maan", "大约；差不多", "副词", "差不多"],
  ["bpra-maan-nii", "ประมาณนี้", "bpra-maan nii", "大概这样", "短语", "差不多"],
  ["klai-khiang", "ใกล้เคียง", "glai khiiang", "接近；相近", "形容词", "差不多"],
  ["mai-dtaang-gan-maak", "ไม่ต่างกันมาก", "mai dtaang gan maak", "差别不大", "句型", "差不多"],
  ["phaaw-phaaw-gan", "พอ ๆ กัน", "phaaw phaaw gan", "差不多一样", "短语", "差不多"],
  ["gaw-ok", "ก็โอเค", "gaw oo-khee", "也还可以", "短语", "差不多"],
  ["rueap-roi", "เกือบ", "gueap", "差点；几乎", "副词", "差不多"],
  ["gueap-set", "เกือบเสร็จ", "gueap set", "快完成了", "句型", "差不多"],
  ["mai-khoi-dtaang", "ไม่ค่อยต่าง", "mai khoi dtaang", "不太不同", "句型", "差不多"],
  ["dai-bpra-maan-nii", "ได้ประมาณนี้", "dai bpra-maan nii", "能做到大概这样", "句型", "差不多"],
  ["khaawy-khaawy", "ค่อย ๆ", "khaawy khaawy", "慢慢地；逐步", "副词", "慢慢来"],
  ["jai-yen-yen", "ใจเย็น ๆ", "jai yen yen", "冷静点；别急", "短语", "慢慢来"],
  ["mai-dtawng-riip", "ไม่ต้องรีบ", "mai dtawng riip", "不用急", "句型", "慢慢来"],
  ["tham-thii-la-khan", "ทำทีละขั้น", "tham thii la khan", "一步一步做", "短语", "慢慢来"],
  ["phuut-chaa-chaa", "พูดช้า ๆ", "phuut chaa chaa", "慢慢说", "短语", "慢慢来"],
  ["ao-thii-la-yaang", "เอาทีละอย่าง", "ao thii la yaang", "一件一件来", "句型", "慢慢来"],
  ["khaawy-khit", "ค่อยคิด", "khaawy khit", "慢慢想；之后再想", "短语", "慢慢来"],
  ["khaawy-tham", "ค่อยทำ", "khaawy tham", "慢慢做；稍后做", "短语", "慢慢来"],
  ["mai-pen-rai-khaawy", "ไม่เป็นไร ค่อย ๆ", "mai bpen rai khaawy khaawy", "没关系，慢慢来", "句型", "慢慢来"],
  ["diao-gaw-dai", "เดี๋ยวก็ได้", "diao gaw dai", "等一下也可以", "句型", "慢慢来"],
  ["ao-baep-nii-gaawn", "เอาแบบนี้ก่อน", "ao baaep nii gaawn", "先这样吧", "句型", "先这样"],
  ["phaaw-thao-nii-gaawn", "พอเท่านี้ก่อน", "phaaw thao nii gaawn", "先到这里；先这样多", "句型", "先这样"],
  ["wan-nii-phaaw-gaawn", "วันนี้พอก่อน", "wan nii phaaw gaawn", "今天先到这里", "句型", "先这样"],
  ["khaawy-dtaaw-phrung-nii", "ค่อยต่อพรุ่งนี้", "khaawy dtaaw phrung nii", "明天再继续", "句型", "先这样"],
  ["wai-khaawy-waa-gan", "ไว้ค่อยว่ากัน", "wai khaawy waa gan", "以后再说", "短语", "先这样"],
  ["thaao-nii-gaawn", "เท่านี้ก่อน", "thao nii gaawn", "先这些；先到这里", "短语", "先这样"],
  ["dtaaw-bpai-khaawy-duu", "ต่อไปค่อยดู", "dtaaw bpai khaawy duu", "接下来再看", "句型", "先这样"],
  ["phak-gaawn", "พักก่อน", "phak gaawn", "先休息", "短语", "先这样"],
  ["yut-gaawn", "หยุดก่อน", "yut gaawn", "先停一下", "短语", "先这样"],
  ["laew-khaawy-dtaaw", "แล้วค่อยต่อ", "laew khaawy dtaaw", "然后再继续", "短语", "先这样"],
  ["diao", "เดี๋ยว", "diao", "等一下；一会儿", "副词", "等一下"],
  ["diao-gaawn", "เดี๋ยวก่อน", "diao gaawn", "等一下；先等等", "短语", "等一下"],
  ["raw-diao", "รอเดี๋ยว", "raaw diao", "等一会儿", "短语", "等一下"],
  ["raw-bpaep", "รอแป๊บ", "raaw bpaep", "等一下下", "短语", "等一下"],
  ["bpaep-nueng", "แป๊บหนึ่ง", "bpaep nueng", "一小会儿", "短语", "等一下"],
  ["raw-sak-khruu", "รอสักครู่", "raaw sak khruu", "请稍等", "短语", "等一下"],
  ["iik-sak-khruu", "อีกสักครู่", "iik sak khruu", "再过一会儿", "短语", "等一下"],
  ["diao-maa", "เดี๋ยวมา", "diao maa", "一会儿回来", "句型", "等一下"],
  ["diao-dtaawp", "เดี๋ยวตอบ", "diao dtaawp", "等一下回复", "句型", "等一下"],
  ["diao-duu-hai", "เดี๋ยวดูให้", "diao duu hai", "等一下帮你看", "句型", "等一下"],
  ["chai", "ใช่", "chai", "是；对", "短语", "确认回应"],
  ["mai-chai", "ไม่ใช่", "mai chai", "不是；不对", "短语", "确认回应"],
  ["thuuk", "ถูก", "thuuk", "对；正确", "形容词", "确认回应"],
  ["thuuk-dtawng", "ถูกต้อง", "thuuk dtawng", "正确", "形容词", "确认回应"],
  ["chai-laew", "ใช่แล้ว", "chai laew", "对了；就是", "短语", "确认回应"],
  ["ok", "โอเค", "oo-khee", "好的；可以", "短语", "确认回应"],
  ["khao-jai-laew", "เข้าใจแล้ว", "khao jai laew", "明白了", "句型", "确认回应"],
  ["rap-thraap", "รับทราบ", "rap saap", "收到；知悉", "动词", "确认回应"],
  ["dai-khrap-kha", "ได้ครับ/ค่ะ", "dai khrap/kha", "可以的", "短语", "确认回应"],
  ["tok-long", "ตกลง", "dtok long", "同意；说定了", "动词", "确认回应"],
  ["laew-gan", "แล้วกัน", "laew gan", "那就……吧", "副词", "轻松结束"],
  ["jer-gan", "เจอกัน", "joe gan", "再见；见面吧", "短语", "轻松结束"],
  ["phop-gan-mai", "พบกันใหม่", "phop gan mai", "下次见", "短语", "轻松结束"],
  ["waai-jer-gan", "ไว้เจอกัน", "wai joe gan", "回头见", "短语", "轻松结束"],
  ["dtaaw-bpai-khui-gan", "ต่อไปคุยกัน", "dtaaw bpai khui gan", "之后再聊", "句型", "轻松结束"],
  ["khaawy-khui-gan-mai", "ค่อยคุยกันใหม่", "khaawy khui gan mai", "下次再聊", "句型", "轻松结束"],
  ["phak-phaawn-na", "พักผ่อนนะ", "phak phaawn na", "好好休息哦", "句型", "轻松结束"],
  ["doen-thaang-dii-dii", "เดินทางดี ๆ", "doen thaang dii dii", "一路顺利", "短语", "轻松结束"],
  ["chok-dii", "โชคดี", "chook dii", "祝好运", "短语", "轻松结束"],
  ["dtaam-nan", "ตามนั้น", "dtaam nan", "就那样；按那个来", "短语", "轻松结束"],
];

const relatedByTheme: Record<
  UsefulSetPhrasesTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  没问题: {
    synonym: "ไม่มีปัญหา / mai mii bpan-haa / 没有问题",
    antonym: "มีปัญหา / mii bpan-haa / 有问题",
    comparison: "ไม่เป็นไร 可表示没关系或不用了；ไม่มีปัญหา 更直接表示没问题。",
    collocation: "ได้เลย ไม่มีปัญหา / dai loei mai mii bpan-haa / 可以，没问题",
  },
  看情况: {
    synonym: "แล้วแต่สถานการณ์ / laew dtae sa-thaa-na-gaan / 看情况",
    antonym: "แน่นอน / nae naawn / 确定",
    comparison: "ดูก่อน 语气轻，ยังไม่แน่ใจ 明确表示还不确定。",
    collocation: "ต้องดูอีกทีถ้าว่าง / dtawng duu iik thii thaa waang / 如果有空还要再看",
  },
  随便你: {
    synonym: "แล้วแต่คุณ / laew dtae khun / 随你",
    antonym: "ฉันเลือกเอง / chan lueak eng / 我自己选",
    comparison: "อะไรก็ได้ 是什么都可以，ตามใจคุณ 是随你喜欢。",
    collocation: "เอาที่สะดวกแล้วแต่คุณ / ao thii sa-duak laew dtae khun / 按你方便，随你",
  },
  我也一样: {
    synonym: "ฉันก็เหมือนกัน / chan gaw muean gan / 我也一样",
    antonym: "ฉันไม่เหมือนกัน / chan mai muean gan / 我不一样",
    comparison: "เหมือนกัน 表示一样；ด้วยคน 常用于“我也一起/算我一个”。",
    collocation: "ชอบเหมือนกัน / chaawp muean gan / 也喜欢",
  },
  差不多: {
    synonym: "ประมาณนี้ / bpra-maan nii / 大概这样",
    antonym: "ต่างกันมาก / dtaang gan maak / 差很多",
    comparison: "ประมาณ 是大约，พอ ๆ กัน 是两者程度差不多。",
    collocation: "ราคาไม่ต่างกันมาก / raa-khaa mai dtaang gan maak / 价格差不多",
  },
  慢慢来: {
    synonym: "ค่อย ๆ / khaawy khaawy / 慢慢地",
    antonym: "รีบ / riip / 赶快",
    comparison: "ใจเย็น ๆ 用来安抚别人，ค่อย ๆ 描述动作慢慢来。",
    collocation: "ไม่ต้องรีบ ค่อย ๆ ทำ / mai dtawng riip khaawy khaawy tham / 不用急，慢慢做",
  },
  先这样: {
    synonym: "เท่านี้ก่อน / thao nii gaawn / 先到这里",
    antonym: "ทำต่อเลย / tham dtaaw loei / 直接继续做",
    comparison: "ก่อน 在这里表示暂时先这样，之后还可以继续。",
    collocation: "วันนี้พอก่อนแล้วค่อยต่อ / wan nii phaaw gaawn laew khaawy dtaaw / 今天先到这里，之后再继续",
  },
  等一下: {
    synonym: "รอสักครู่ / raaw sak khruu / 请稍等",
    antonym: "ทันที / than thii / 立刻",
    comparison: "แป๊บหนึ่ง 很口语，รอสักครู่ 更礼貌。",
    collocation: "รอแป๊บ เดี๋ยวดูให้ / raaw bpaep diao duu hai / 等一下，我帮你看",
  },
  确认回应: {
    synonym: "เข้าใจแล้ว / khao jai laew / 明白了",
    antonym: "ไม่เข้าใจ / mai khao jai / 不明白",
    comparison: "ใช่ 是确认是，ถูกต้อง 更强调正确；รับทราบ 更正式。",
    collocation: "โอเค รับทราบแล้ว / oo-khee rap saap laew / 好的，已知悉",
  },
  轻松结束: {
    synonym: "ไว้เจอกัน / wai joe gan / 回头见",
    antonym: "ยังไม่จบ / yang mai jop / 还没结束",
    comparison: "เจอกัน 偏口语再见，พบกันใหม่ 更礼貌一点。",
    collocation: "ไว้ค่อยคุยกันใหม่ / wai khaawy khui gan mai / 回头再聊",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในบทสนทนาประจำวัน ฉันใช้สำนวน “${row[1]}” เพื่อให้คำตอบสั้น สุภาพ และเป็นธรรมชาติมากขึ้น`,
  roman: `nai bot-son-tha-naa bpra-jam wan chan chai sam-nuan "${row[2]}" phuea hai kham dtaawp san su-phaap lae bpen tham-ma-chaat maak khuen`,
  chinese: `在日常对话中，我会用“${row[1]}”让回答更简短、礼貌，也更自然。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "常用套语", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 常用套语补漏。适合日常回应、缓和语气、结束话题或表达不确定；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: USEFUL_SET_PHRASES_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_USEFUL_SET_PHRASES_02: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
