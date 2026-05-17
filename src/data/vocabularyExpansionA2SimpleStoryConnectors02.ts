export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "连词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type SimpleStoryConnectorsTheme =
  | "后来"
  | "突然"
  | "最后"
  | "本来"
  | "原来"
  | "刚好"
  | "幸好"
  | "没想到"
  | "结果"
  | "补充转折";

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
  theme: SimpleStoryConnectorsTheme,
];

const SIMPLE_STORY_CONNECTORS_REFS = [
  "worker-a-a2-simple-story-connectors-02",
  "basic-thai-story-connectors",
];

const rows: Row[] = [
  ["dtaawn-lang", "ตอนหลัง", "dtaawn lang", "后来；之后", "副词", "后来"],
  ["phaai-lang", "ภายหลัง", "phaai lang", "后来；稍后", "副词", "后来"],
  ["lang-jaak-nan", "หลังจากนั้น", "lang jaak nan", "那之后", "短语", "后来"],
  ["dtaaw-maa", "ต่อมา", "dtaaw maa", "接下来；后来", "副词", "后来"],
  ["laew-khaawy", "แล้วค่อย", "laew khaawy", "然后再；之后才", "连词", "后来"],
  ["laew-gaw", "แล้วก็", "laew gaw", "然后；接着", "连词", "后来"],
  ["dtaaw-jaak-nan", "ต่อจากนั้น", "dtaaw jaak nan", "从那以后；接着", "短语", "后来"],
  ["iik-sak-phak", "อีกสักพัก", "iik sak phak", "过了一会儿", "短语", "后来"],
  ["mai-naan", "ไม่นาน", "mai naan", "不久", "副词", "后来"],
  ["lang-maa", "หลังมา", "lang maa", "后来；之后过来", "副词", "后来"],
  ["yuu-yuu", "อยู่ ๆ", "yuu yuu", "突然；好端端地", "副词", "突然"],
  ["than-thii-thii", "ทันทีที่", "than thii thii", "一……就……", "连词", "突然"],
  ["gathanhan", "กะทันหัน", "ga-than-han", "突然；临时", "副词", "突然"],
  ["juu-juu", "จู่ ๆ", "juu juu", "突然", "副词", "突然"],
  ["nai-than-thii", "ในทันที", "nai than thii", "立刻；马上", "副词", "突然"],
  ["yuu-dii-dii", "อยู่ดี ๆ", "yuu dii dii", "突然；无缘无故", "副词", "突然"],
  ["mi-rueng-gathanhan", "มีเรื่องกะทันหัน", "mii rueang ga-than-han", "突然有事", "句型", "突然"],
  ["fon-dtok-gathanhan", "ฝนตกกะทันหัน", "fon dtok ga-than-han", "突然下雨", "句型", "突然"],
  ["rot-sia-gathanhan", "รถเสียกะทันหัน", "rot siia ga-than-han", "车突然坏了", "句型", "突然"],
  ["dai-yin-siang-than-thii", "ได้ยินเสียงทันที", "dai yin siiang than thii", "立刻听到声音", "句型", "突然"],
  ["sut-thaai", "สุดท้าย", "sut-thaai", "最后", "副词", "最后"],
  ["nai-thii-sut", "ในที่สุด", "nai thii sut", "终于；最后", "副词", "最后"],
  ["dtaawn-jop", "ตอนจบ", "dtaawn jop", "结尾；最后部分", "名词", "最后"],
  ["jop-laew", "จบแล้ว", "jop laew", "结束了", "句型", "最后"],
  ["jop-long-duai", "จบลงด้วย", "jop long duai", "以……结束", "短语", "最后"],
  ["sut-thaai-gaw", "สุดท้ายก็", "sut-thaai gaw", "最后还是……", "句型", "最后"],
  ["laew-rueng-gaw-jop", "แล้วเรื่องก็จบ", "laew rueang gaw jop", "然后事情就结束了", "句型", "最后"],
  ["mai-mi-arai-laew", "ไม่มีอะไรแล้ว", "mai mii a-rai laew", "已经没事了", "句型", "最后"],
  ["thuk-yaang-riiap-roi", "ทุกอย่างเรียบร้อย", "thuk yaang riiap raawy", "一切都妥当了", "句型", "最后"],
  ["dtaawn-sut-thaai", "ตอนสุดท้าย", "dtaawn sut-thaai", "最后的时候", "短语", "最后"],
  ["dtae-doem", "แต่เดิม", "dtae doem", "原本；本来", "副词", "本来"],
  ["dtaang-jai-waa", "ตั้งใจว่า", "dtang jai waa", "本来打算……", "句型", "本来"],
  ["dtaang-jai-ja", "ตั้งใจจะ", "dtang jai ja", "本来/打算要……", "句型", "本来"],
  ["ga-wa-jaa", "กะว่าจะ", "ga waa ja", "本想着要……", "句型", "本来"],
  ["phaaen-doem", "แผนเดิม", "phaaen doem", "原计划", "名词", "本来"],
  ["dtaawn-raek", "ตอนแรก", "dtaawn raaek", "一开始；本来", "副词", "本来"],
  ["raek-roem", "แรกเริ่ม", "raaek roem", "最初；一开始", "副词", "本来"],
  ["khit-wai-waa", "คิดไว้ว่า", "khit wai waa", "原本想着……", "句型", "本来"],
  ["dtae-doem-mai-chai", "แต่เดิมไม่ใช่", "dtae doem mai chai", "原本不是", "句型", "本来"],
  ["phaaen-bplian", "แผนเปลี่ยน", "phaaen bpliian", "计划改变了", "句型", "本来"],
  ["thii-thaae", "ที่แท้", "thii thaae", "原来；其实", "副词", "原来"],
  ["jing-jing-laew", "จริง ๆ แล้ว", "jing jing laew", "其实；实际上", "短语", "原来"],
  ["bpen-yaang-nii-eng", "เป็นอย่างนี้เอง", "bpen yaang nii eng", "原来是这样", "句型", "原来"],
  ["phroeng-ruu-waa", "เพิ่งรู้ว่า", "phoeng ruu waa", "刚知道原来……", "句型", "原来"],
  ["thii-thaae-gaw", "ที่แท้ก็", "thii thaae gaw", "原来竟是……", "句型", "原来"],
  ["mai-chai-yaang-thii-khit", "ไม่ใช่อย่างที่คิด", "mai chai yaang thii khit", "不是想的那样", "句型", "原来"],
  ["khao-jai-phit", "เข้าใจผิด", "khao jai phit", "误会；理解错", "动词", "原来"],
  ["ruu-laew-waa", "รู้แล้วว่า", "ruu laew waa", "现在知道了……", "句型", "原来"],
  ["bpen-rueng-jing", "เป็นเรื่องจริง", "bpen rueang jing", "是真的", "句型", "原来"],
  ["mai-chai-rueng-jing", "ไม่ใช่เรื่องจริง", "mai chai rueang jing", "不是真的", "句型", "原来"],
  ["phaaw-dii", "พอดี", "phaaw dii", "正好；刚好", "副词", "刚好"],
  ["phaaw-dii-waa", "พอดีว่า", "phaaw dii waa", "刚好是因为；正好……", "句型", "刚好"],
  ["dtrong-gap", "ตรงกับ", "dtrong gap", "正好碰上；符合", "动词", "刚好"],
  ["than-welaa", "ทันเวลา", "than we-laa", "刚好赶上；来得及", "短语", "刚好"],
  ["maa-than", "มาทัน", "maa than", "来得及赶到", "动词", "刚好"],
  ["dai-phaaw-dii", "ได้พอดี", "dai phaaw dii", "刚好得到/刚好可以", "句型", "刚好"],
  ["khrop-phaaw-dii", "ครบพอดี", "khrop phaaw dii", "刚好齐了", "句型", "刚好"],
  ["luea-phaaw-dii", "เหลือพอดี", "luea phaaw dii", "刚好剩下", "句型", "刚好"],
  ["jon-than", "จนทัน", "jon than", "做到赶上", "短语", "刚好"],
  ["dtrong-wan-yut", "ตรงวันหยุด", "dtrong wan yut", "正好碰上休息日", "句型", "刚好"],
  ["chok-dii-thii", "โชคดีที่", "chook dii thii", "幸好……", "句型", "幸好"],
  ["yang-dii-thii", "ยังดีที่", "yang dii thii", "还好……", "句型", "幸好"],
  ["dii-thii", "ดีที่", "dii thii", "好在……", "句型", "幸好"],
  ["mai-pen-rai-thii", "ไม่เป็นไรที่", "mai bpen rai thii", "幸亏/没关系的是……", "句型", "幸好"],
  ["chok-dii-mak", "โชคดีมาก", "chook dii maak", "很幸运", "句型", "幸好"],
  ["yang-than", "ยังทัน", "yang than", "还来得及", "句型", "幸好"],
  ["mai-sia-haai", "ไม่เสียหาย", "mai siia haai", "没有损坏；没造成损失", "句型", "幸好"],
  ["mai-pen-arai-mak", "ไม่เป็นอะไรมาก", "mai bpen a-rai maak", "没什么大事", "句型", "幸好"],
  ["khon-chuai-than", "คนช่วยทัน", "khon chuai than", "有人及时帮忙", "句型", "幸好"],
  ["dii-na-thii", "ดีนะที่", "dii na thii", "还好……", "句型", "幸好"],
  ["mai-khit-waa", "ไม่คิดว่า", "mai khit waa", "没想到……", "句型", "没想到"],
  ["mai-nuek-waa", "ไม่นึกว่า", "mai nuek waa", "没想到；没料到", "句型", "没想到"],
  ["khat-mai-thueng", "คาดไม่ถึง", "khaat mai thueng", "意想不到", "形容词", "没想到"],
  ["bplaaek-jai", "แปลกใจ", "bplaaek jai", "惊讶", "动词", "没想到"],
  ["dtok-jai", "ตกใจ", "dtok jai", "吓一跳；吃惊", "动词", "没想到"],
  ["mai-khoei-ruu", "ไม่เคยรู้", "mai khoei ruu", "从来不知道", "句型", "没想到"],
  ["mai-khit-loei", "ไม่คิดเลย", "mai khit loei", "完全没想到", "句型", "没想到"],
  ["bpen-bpai-dai-yaang-rai", "เป็นไปได้อย่างไร", "bpen bpai dai yaang rai", "怎么可能；怎么会这样", "句型", "没想到"],
  ["ruu-suek-bplaaek", "รู้สึกแปลก", "ruu suek bplaaek", "觉得奇怪", "句型", "没想到"],
  ["phit-khaat", "ผิดคาด", "phit khaat", "出乎意料", "形容词", "没想到"],
  ["phon-khue", "ผลคือ", "phon khue", "结果是", "句型", "结果"],
  ["sut-thaai-gaw", "สุดท้ายก็", "sut-thaai gaw", "最后结果还是……", "句型", "结果"],
  ["loei", "เลย", "loei", "所以；于是", "副词", "结果"],
  ["go-loei", "ก็เลย", "gaw loei", "所以就……", "句型", "结果"],
  ["tham-hai", "ทำให้", "tham hai", "导致；使得", "动词", "结果"],
  ["phon-thii-dai", "ผลที่ได้", "phon thii dai", "得到的结果", "名词", "结果"],
  ["bpen-phon-hai", "เป็นผลให้", "bpen phon hai", "结果导致", "句型", "结果"],
  ["rueng-jop-long", "เรื่องจบลง", "rueang jop long", "事情结束下来", "句型", "结果"],
  ["mai-sam-ret", "ไม่สำเร็จ", "mai sam-ret", "没有成功", "句型", "结果"],
  ["sam-ret", "สำเร็จ", "sam-ret", "成功", "动词", "结果"],
  ["dtae", "แต่", "dtae", "但是", "连词", "补充转折"],
  ["dtae-waa", "แต่ว่า", "dtae waa", "但是；可是", "连词", "补充转折"],
  ["lae", "และ", "lae", "和；并且", "连词", "补充转折"],
  ["rue", "หรือ", "rue", "或者；还是", "连词", "补充转折"],
  ["sa-ngan", "ถ้าอย่างนั้น", "thaa yaang nan", "那样的话", "句型", "补充转折"],
  ["naawk-jaak-nii", "นอกจากนี้", "naawk jaak nii", "除此之外", "短语", "补充转折"],
  ["iik-yaang", "อีกอย่าง", "iik yaang", "另外一点", "短语", "补充转折"],
  ["nai-thaang-glap-gan", "ในทางกลับกัน", "nai thaang glap gan", "相反地", "短语", "补充转折"],
  ["dtae-gaw", "แต่ก็", "dtae gaw", "但是也……", "句型", "补充转折"],
  ["laew-dtae", "แล้วแต่", "laew dtae", "看……而定；取决于", "短语", "补充转折"],
];

const relatedByTheme: Record<
  SimpleStoryConnectorsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  后来: {
    synonym: "หลังจากนั้น / lang jaak nan / 那之后",
    antonym: "ก่อนหน้านั้น / gaawn naa nan / 在那之前",
    comparison: "ต่อมา 偏接下来，หลังจากนั้น 偏那件事之后。",
    collocation: "หลังจากนั้นเขาก็กลับบ้าน / lang jaak nan khao gaw glap baan / 那之后他就回家了",
  },
  突然: {
    synonym: "จู่ ๆ / juu juu / 突然",
    antonym: "ค่อย ๆ / khaawy khaawy / 慢慢地",
    comparison: "อยู่ ๆ 和 จู่ ๆ 都很口语，กะทันหัน 更强调临时突然。",
    collocation: "อยู่ ๆ ฝนก็ตก / yuu yuu fon gaw dtok / 突然就下雨了",
  },
  最后: {
    synonym: "สุดท้าย / sut-thaai / 最后",
    antonym: "ตอนแรก / dtaawn raaek / 一开始",
    comparison: "สุดท้าย 是最后，ในที่สุด 带有终于完成的感觉。",
    collocation: "สุดท้ายทุกอย่างก็เรียบร้อย / sut-thaai thuk yaang gaw riiap raawy / 最后一切都妥当了",
  },
  本来: {
    synonym: "ตอนแรก / dtaawn raaek / 一开始、本来",
    antonym: "ตอนหลัง / dtaawn lang / 后来",
    comparison: "ตั้งใจจะ 强调本来打算，แผนเดิม 强调原计划。",
    collocation: "ตอนแรกตั้งใจจะไปตลาด / dtaawn raaek dtang jai ja bpai dta-laat / 本来打算去市场",
  },
  原来: {
    synonym: "ที่แท้ / thii thaae / 原来",
    antonym: "เข้าใจผิด / khao jai phit / 误会",
    comparison: "จริง ๆ แล้ว 是其实，ที่แท้ 带有发现真相的感觉。",
    collocation: "ที่แท้เป็นอย่างนี้เอง / thii thaae bpen yaang nii eng / 原来是这样",
  },
  刚好: {
    synonym: "พอดี / phaaw dii / 正好",
    antonym: "ไม่ทัน / mai than / 来不及",
    comparison: "พอดี 说刚好，ทันเวลา 说赶得上时间。",
    collocation: "มาทันเวลาพอดี / maa than we-laa phaaw dii / 刚好及时赶到",
  },
  幸好: {
    synonym: "โชคดีที่ / chook dii thii / 幸好",
    antonym: "น่าเสียดายที่ / naa siia daai thii / 可惜",
    comparison: "โชคดีที่ 更强调幸运，ยังดีที่ 更口语地说还好。",
    collocation: "โชคดีที่ยังทัน / chook dii thii yang than / 幸好还来得及",
  },
  没想到: {
    synonym: "ไม่นึกว่า / mai nuek waa / 没想到",
    antonym: "คิดไว้แล้ว / khit wai laew / 早就想到了",
    comparison: "ไม่คิดว่า 更普通，คาดไม่ถึง 更强调出乎意料。",
    collocation: "ไม่คิดว่าจะเจอเพื่อนที่นี่ / mai khit waa ja joe phuean thii nii / 没想到会在这里遇到朋友",
  },
  结果: {
    synonym: "ผลคือ / phon khue / 结果是",
    antonym: "สาเหตุคือ / saa-heet khue / 原因是",
    comparison: "เลย 常接自然结果，ผลคือ 更明确说明结果。",
    collocation: "ฝนตกก็เลยกลับบ้าน / fon dtok gaw loei glap baan / 下雨了，所以就回家",
  },
  补充转折: {
    synonym: "แต่ว่า / dtae waa / 但是",
    antonym: "และ / lae / 和、并且",
    comparison: "แต่ 表示转折，นอกจากนี้ 表示补充信息。",
    collocation: "อยากไปแต่ไม่มีเวลา / yaak bpai dtae mai mii we-laa / 想去，但是没有时间",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาเล่าเรื่องสั้น ๆ ฉันใช้คำว่า “${row[1]}” เพื่อเชื่อมเหตุการณ์และทำให้คนฟังเข้าใจลำดับเรื่อง`,
  roman: `we-laa lao rueang san san chan chai kham waa "${row[2]}" phuea chueam heet-gaan lae tham hai khon fang khao-jai lam-dap rueang`,
  chinese: `讲一个简短故事时，我会用“${row[1]}”来连接事件，让听的人明白事情顺序。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "讲故事连接", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 讲故事连接表达。适合说明后来、突然、最后、本来、原来、刚好、幸好、没想到和结果；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: SIMPLE_STORY_CONNECTORS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_STORY_CONNECTORS_02: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
