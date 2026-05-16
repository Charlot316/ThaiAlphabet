const CORE_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];
const FREQUENCY_REFS = ["thai-frequency", "wiktionary-thai-frequency", "phupha-wordfreq"];
const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar", "fsi-thai-basic"];
const QUESTION_REFS = ["thai-reference-questions", "complete-thai-a1", "into-asia-grammar"];
const DISCOURSE_REFS = ["complete-thai-a1", "into-asia-grammar", "cambridge-reference-grammar-toc"];
const TIME_REFS = ["complete-thai-a1", "into-asia-grammar"];

export type VocabularyExpansionRelatedWord = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionComparison = {
  target: VocabularyExpansionRelatedWord;
  distinctionZh: string;
};

export type VocabularyExpansionCollocation = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionExample = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionSense = {
  id: string;
  chinese: string;
  example: VocabularyExpansionExample;
  synonyms?: VocabularyExpansionRelatedWord[];
  antonyms?: VocabularyExpansionRelatedWord[];
  comparisons?: VocabularyExpansionComparison[];
  collocations?: VocabularyExpansionCollocation[];
  usageNotesZh?: string[];
  tags?: string[];
};

export type VocabularyExpansionCandidate = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech:
    | "adverb"
    | "chunk"
    | "conjunction"
    | "discourse-marker"
    | "particle"
    | "preposition"
    | "question"
    | "time-expression";
  theme:
    | "connector"
    | "degree"
    | "discourse"
    | "location"
    | "particle"
    | "question"
    | "quantity"
    | "time";
  level: "a1" | "a2";
  priority: number;
  senses: VocabularyExpansionSense[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

export const VOCABULARY_EXPANSION_A2_CONNECTORS_PARTICLES_01 = [
  {
    thai: "ก็",
    id: "gaw",
    roman: "gaw",
    chinese: "也；就；那么",
    partOfSpeech: "particle",
    theme: "discourse",
    level: "a1",
    priority: 1001,
    senses: [
      {
        id: "continuation-result",
        chinese: "连接上下文，表示“也、就、那么”，常让句子更自然顺接",
        example: {
          thai: "ถ้าคุณพร้อม เราก็เริ่มทบทวนคำใหม่ด้วยกันได้เลย",
          roman: "thaa khun phraawm rao gaw roem thop-thuaan kham mai duai-gan dai loei",
          chinese: "如果你准备好了，我们就可以一起开始复习新词了。",
        },
        tags: ["flow", "result", "particle"],
      },
    ],
    synonyms: [{ thai: "แล้วก็", roman: "laaeo gaw", chinese: "然后；也" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "แล้ว", roman: "laaeo", chinese: "已经；然后" },
        distinctionZh: "ก็ 更像顺接或承接语气；แล้ว 更常标记完成或时间上的然后。",
      },
    ],
    collocations: [
      { thai: "ก็ได้", roman: "gaw dai", chinese: "也可以" },
      { thai: "ก็เลย", roman: "gaw loei", chinese: "所以就" },
    ],
    tags: ["particle", "discourse", "a1"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "จะ",
    id: "ja",
    roman: "ja",
    chinese: "将要；会",
    partOfSpeech: "particle",
    theme: "time",
    level: "a1",
    priority: 1002,
    senses: [
      {
        id: "future-intention",
        chinese: "放在动词前，表示将来、打算或即将发生",
        example: {
          thai: "พรุ่งนี้ผมจะไปโรงเรียนเร็วขึ้น เพราะมีสอบภาษาไทยตอนเช้า",
          roman: "phrung-nii phom ja bpai roong-riian reo kheun phraw mii saawp phaa-saa thai dtaawn chaao",
          chinese: "明天我要早点去学校，因为早上有泰语考试。",
        },
        tags: ["future", "intention"],
      },
    ],
    synonyms: [{ thai: "กำลังจะ", roman: "gam-lang ja", chinese: "正要；即将" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "กำลัง", roman: "gam-lang", chinese: "正在" },
        distinctionZh: "จะ 指未来或意图；กำลัง 指动作正在进行。",
      },
    ],
    collocations: [
      { thai: "จะไป", roman: "ja bpai", chinese: "将要去" },
      { thai: "จะทำ", roman: "ja tham", chinese: "将要做" },
    ],
    tags: ["future", "modal", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "แล้ว",
    id: "laaeo",
    roman: "laaeo",
    chinese: "已经；了；然后",
    partOfSpeech: "particle",
    theme: "time",
    level: "a1",
    priority: 1003,
    senses: [
      {
        id: "completion-already",
        chinese: "表示动作完成、状态已经改变，也可顺接“然后”",
        example: {
          thai: "ฉันทำการบ้านเสร็จแล้ว แล้วจะอ่านบทเรียนใหม่ก่อนนอน",
          roman: "chan tham gaan-baan set laaeo laaeo ja aan bot-riian mai gaawn naawn",
          chinese: "我作业已经做完了，然后睡前会读新课。",
        },
        tags: ["aspect", "completion"],
      },
    ],
    synonyms: [{ thai: "เสร็จแล้ว", roman: "set laaeo", chinese: "完成了" }],
    antonyms: [{ thai: "ยัง", roman: "yang", chinese: "还；尚未" }],
    comparisons: [
      {
        target: { thai: "ยัง", roman: "yang", chinese: "还；仍然" },
        distinctionZh: "แล้ว 表示完成或变化；ยัง 表示还没完成或仍然如此。",
      },
    ],
    collocations: [
      { thai: "กินแล้ว", roman: "gin laaeo", chinese: "吃过了" },
      { thai: "แล้วก็", roman: "laaeo gaw", chinese: "然后；而且" },
    ],
    tags: ["aspect", "sequence", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ยัง",
    id: "yang",
    roman: "yang",
    chinese: "还；仍然；尚未",
    partOfSpeech: "adverb",
    theme: "time",
    level: "a1",
    priority: 1004,
    senses: [
      {
        id: "still-yet",
        chinese: "表示状态仍在持续；和否定连用时表示“还没”",
        example: {
          thai: "ตอนนี้ฉันยังไม่เข้าใจประโยคนี้ แต่จะถามครูหลังเลิกเรียน",
          roman: "dtaawn-nii chan yang mai khao-jai bpra-yook nii dtaae ja thaam khruu lang loek riian",
          chinese: "现在我还不明白这个句子，但下课后会问老师。",
        },
        tags: ["aspect", "not-yet"],
      },
    ],
    synonyms: [{ thai: "ยังคง", roman: "yang khong", chinese: "仍然；依旧" }],
    antonyms: [{ thai: "แล้ว", roman: "laaeo", chinese: "已经；了" }],
    comparisons: [
      {
        target: { thai: "แล้ว", roman: "laaeo", chinese: "已经" },
        distinctionZh: "ยังไม่ 表示“还没”；...แล้ว 表示“已经”。",
      },
    ],
    collocations: [
      { thai: "ยังไม่", roman: "yang mai", chinese: "还没" },
      { thai: "ยังอยู่", roman: "yang yuu", chinese: "还在" },
    ],
    tags: ["aspect", "time", "negation"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "กำลัง",
    id: "gam-lang",
    roman: "gam-lang",
    chinese: "正在",
    partOfSpeech: "adverb",
    theme: "time",
    level: "a1",
    priority: 1005,
    senses: [
      {
        id: "progressive-action",
        chinese: "放在动词前，表示动作正在进行",
        example: {
          thai: "นักเรียนกำลังฟังครูอธิบายเรื่องเสียงวรรณยุกต์อย่างตั้งใจ",
          roman: "nak-riian gam-lang fang khruu a-thi-baai rueang siang wan-na-yuk yaang dtang-jai",
          chinese: "学生们正在认真听老师解释声调。",
        },
        tags: ["progressive", "aspect"],
      },
    ],
    synonyms: [{ thai: "กำลัง...อยู่", roman: "gam-lang...yuu", chinese: "正在……" }],
    antonyms: [{ thai: "เสร็จแล้ว", roman: "set laaeo", chinese: "完成了" }],
    comparisons: [
      {
        target: { thai: "จะ", roman: "ja", chinese: "将要" },
        distinctionZh: "กำลัง 表示正在发生；จะ 表示未来还没发生。",
      },
    ],
    collocations: [
      { thai: "กำลังเรียน", roman: "gam-lang riian", chinese: "正在学习" },
      { thai: "กำลังจะ", roman: "gam-lang ja", chinese: "正要；即将" },
    ],
    tags: ["aspect", "progressive", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เคย",
    id: "khoei",
    roman: "khoei",
    chinese: "曾经",
    partOfSpeech: "adverb",
    theme: "time",
    level: "a1",
    priority: 1006,
    senses: [
      {
        id: "past-experience",
        chinese: "表示过去有过某种经验，常用于“曾经/有没有过”",
        example: {
          thai: "คุณเคยไปเชียงใหม่ไหม หรือครั้งนี้จะเป็นครั้งแรก",
          roman: "khun khoei bpai chiang-mai mai rue khrang nii ja bpen khrang raaek",
          chinese: "你去过清迈吗，还是这次会是第一次？",
        },
        tags: ["experience", "aspect", "question"],
      },
    ],
    synonyms: [{ thai: "เคย...มาก่อน", roman: "khoei...maa gaawn", chinese: "以前曾经……过" }],
    antonyms: [{ thai: "ไม่เคย", roman: "mai khoei", chinese: "从未" }],
    comparisons: [
      {
        target: { thai: "เคย", roman: "khoei", chinese: "曾经" },
        distinctionZh: "เคย 说过去经验；แล้ว 只说动作完成，不一定强调经验。",
      },
    ],
    collocations: [
      { thai: "เคยกิน", roman: "khoei gin", chinese: "吃过" },
      { thai: "เคยไป", roman: "khoei bpai", chinese: "去过" },
    ],
    tags: ["aspect", "experience", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "จาก",
    id: "jaak",
    roman: "jaak",
    chinese: "从；来自",
    partOfSpeech: "preposition",
    theme: "location",
    level: "a1",
    priority: 1007,
    senses: [
      {
        id: "source-origin",
        chinese: "表示来源、起点或距离的出发点",
        example: {
          thai: "จากโรงแรมไปตลาดใหญ่ใช้เวลาประมาณสิบห้านาทีถ้ารถไม่ติด",
          roman: "jaak roong-raem bpai dta-laat yai chai wee-laa bpra-maan sip-haa naa-thii thaa rot mai dtit",
          chinese: "从酒店去大市场大约要十五分钟，如果不堵车的话。",
        },
        tags: ["source", "motion", "location"],
      },
    ],
    synonyms: [{ thai: "มาจาก", roman: "maa jaak", chinese: "来自" }],
    antonyms: [{ thai: "ถึง", roman: "thueng", chinese: "到；直到" }],
    comparisons: [
      {
        target: { thai: "ถึง", roman: "thueng", chinese: "到" },
        distinctionZh: "จาก 标出起点；ถึง 标出终点或到达范围。",
      },
    ],
    collocations: [
      { thai: "จากบ้าน", roman: "jaak baan", chinese: "从家" },
      { thai: "มาจากไหน", roman: "maa jaak nai", chinese: "从哪里来" },
    ],
    tags: ["preposition", "source", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ถึง",
    id: "thueng",
    roman: "thueng",
    chinese: "到；直到",
    partOfSpeech: "preposition",
    theme: "location",
    level: "a1",
    priority: 1008,
    senses: [
      {
        id: "endpoint-until",
        chinese: "表示到达地点、范围终点或时间上的直到",
        example: {
          thai: "เราจะเรียนถึงบ่ายสามโมง แล้วค่อยไปกินข้าวใกล้โรงเรียน",
          roman: "rao ja riian thueng baai saam moong laaeo khawy bpai gin khaao glai roong-riian",
          chinese: "我们会学到下午三点，然后再去学校附近吃饭。",
        },
        tags: ["endpoint", "time", "location"],
      },
    ],
    synonyms: [{ thai: "จนถึง", roman: "jon thueng", chinese: "直到" }],
    antonyms: [{ thai: "จาก", roman: "jaak", chinese: "从" }],
    comparisons: [
      {
        target: { thai: "จาก", roman: "jaak", chinese: "从" },
        distinctionZh: "ถึง 看终点；จาก 看起点。",
      },
    ],
    collocations: [
      { thai: "ถึงบ้าน", roman: "thueng baan", chinese: "到家" },
      { thai: "ตั้งแต่...ถึง...", roman: "dtang-dtaae...thueng...", chinese: "从……到……" },
    ],
    tags: ["preposition", "endpoint", "time"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ใน",
    id: "nai",
    roman: "nai",
    chinese: "在……里面；在……中",
    partOfSpeech: "preposition",
    theme: "location",
    level: "a1",
    priority: 1009,
    senses: [
      {
        id: "inside-in",
        chinese: "表示在某个空间、范围、时间段或群体之内",
        example: {
          thai: "ในห้องเรียนนี้มีนักเรียนสิบสองคนและมีหนังสือภาษาไทยหลายเล่ม",
          roman: "nai haawng-riian nii mii nak-riian sip-saawng khon lae mii nang-sue phaa-saa thai laai lem",
          chinese: "这间教室里有十二个学生，还有好几本泰语书。",
        },
        tags: ["location", "inside"],
      },
    ],
    synonyms: [{ thai: "ข้างใน", roman: "khaang-nai", chinese: "里面" }],
    antonyms: [{ thai: "นอก", roman: "naawk", chinese: "外面" }],
    comparisons: [
      {
        target: { thai: "ที่", roman: "thii", chinese: "在；于" },
        distinctionZh: "ใน 强调内部；ที่ 只是标记地点，范围更宽。",
      },
    ],
    collocations: [
      { thai: "ในบ้าน", roman: "nai baan", chinese: "在家里" },
      { thai: "ในตอนเช้า", roman: "nai dtaawn chaao", chinese: "在早上" },
    ],
    tags: ["preposition", "location", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "บน",
    id: "bon",
    roman: "bon",
    chinese: "在……上面",
    partOfSpeech: "preposition",
    theme: "location",
    level: "a1",
    priority: 1010,
    senses: [
      {
        id: "on-top-of",
        chinese: "表示物体位于某物表面或上方",
        example: {
          thai: "วางสมุดบนโต๊ะก่อนนะ เดี๋ยวครูจะตรวจการบ้านของทุกคน",
          roman: "waang sa-mut bon dto gaawn na diaao khruu ja dtruat gaan-baan khaawng thuk khon",
          chinese: "先把本子放在桌上吧，等一下老师会检查每个人的作业。",
        },
        tags: ["location", "position"],
      },
    ],
    synonyms: [{ thai: "ข้างบน", roman: "khaang-bon", chinese: "上面" }],
    antonyms: [{ thai: "ใต้", roman: "dtai", chinese: "下面；下方" }],
    comparisons: [
      {
        target: { thai: "เหนือ", roman: "nuea", chinese: "在……之上；北方" },
        distinctionZh: "บน 常指接触表面的上面；เหนือ 更强调上方或北方，未必接触。",
      },
    ],
    collocations: [
      { thai: "บนโต๊ะ", roman: "bon dto", chinese: "在桌上" },
      { thai: "บนรถ", roman: "bon rot", chinese: "在车上" },
    ],
    tags: ["preposition", "location", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ใต้",
    id: "dtai",
    roman: "dtai",
    chinese: "在……下面；南方",
    partOfSpeech: "preposition",
    theme: "location",
    level: "a1",
    priority: 1011,
    senses: [
      {
        id: "under-below",
        chinese: "表示某物在另一物下方，也可表示南方",
        example: {
          thai: "กระเป๋าอยู่ใต้เก้าอี้ ถ้าคุณหาไม่เจอให้ถามเจ้าหน้าที่",
          roman: "gra-bpao yuu dtai gao-ii thaa khun haa mai joo hai thaam jao-naa-thii",
          chinese: "包在椅子下面，如果你找不到就问工作人员。",
        },
        tags: ["location", "position"],
      },
    ],
    synonyms: [{ thai: "ข้างใต้", roman: "khaang-dtai", chinese: "下面" }],
    antonyms: [{ thai: "บน", roman: "bon", chinese: "上面" }],
    comparisons: [
      {
        target: { thai: "ล่าง", roman: "laang", chinese: "下方；下面的" },
        distinctionZh: "ใต้ 常作介词“在……下”；ล่าง 常作位置名词或修饰语“下方的”。",
      },
    ],
    collocations: [
      { thai: "ใต้โต๊ะ", roman: "dtai dto", chinese: "桌子下面" },
      { thai: "ภาคใต้", roman: "phaak dtai", chinese: "南部" },
    ],
    tags: ["preposition", "location", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "หน้า",
    id: "naa",
    roman: "naa",
    chinese: "前面；脸；页",
    partOfSpeech: "preposition",
    theme: "location",
    level: "a1",
    priority: 1012,
    senses: [
      {
        id: "front-position",
        chinese: "作为位置词表示“前面”，常和名词组合成 หน้า + 地点",
        example: {
          thai: "เจอกันหน้าสถานีรถไฟตอนแปดโมง แล้วเราเดินไปตลาดด้วยกัน",
          roman: "joo gan naa sa-thaa-nii rot-fai dtaawn bpaaet moong laaeo rao doen bpai dta-laat duai-gan",
          chinese: "八点在火车站前见，然后我们一起走去市场。",
        },
        tags: ["location", "position"],
      },
    ],
    synonyms: [{ thai: "ข้างหน้า", roman: "khaang-naa", chinese: "前面" }],
    antonyms: [{ thai: "หลัง", roman: "lang", chinese: "后面" }],
    comparisons: [
      {
        target: { thai: "ต่อหน้า", roman: "dtaaw naa", chinese: "当着……面前" },
        distinctionZh: "หน้า 是普通位置“前面”；ต่อหน้า 强调在某人面前、当面。",
      },
    ],
    collocations: [
      { thai: "หน้าบ้าน", roman: "naa baan", chinese: "家门前" },
      { thai: "ข้างหน้า", roman: "khaang-naa", chinese: "前方" },
    ],
    tags: ["location", "position", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "หลัง",
    id: "lang",
    roman: "lang",
    chinese: "后面；以后",
    partOfSpeech: "preposition",
    theme: "location",
    level: "a1",
    priority: 1013,
    senses: [
      {
        id: "behind-after",
        chinese: "可表示空间上的后面，也可表示时间上的之后",
        example: {
          thai: "หลังเรียนเสร็จ เราจะไปกินข้าวร้านเล็ก ๆ หลังโรงเรียน",
          roman: "lang riian set rao ja bpai gin khaao raan lek lek lang roong-riian",
          chinese: "下课之后，我们会去学校后面的小店吃饭。",
        },
        tags: ["location", "time"],
      },
    ],
    synonyms: [{ thai: "ข้างหลัง", roman: "khaang-lang", chinese: "后面" }],
    antonyms: [{ thai: "หน้า", roman: "naa", chinese: "前面" }],
    comparisons: [
      {
        target: { thai: "หลังจาก", roman: "lang jaak", chinese: "在……之后" },
        distinctionZh: "หลัง 可直接接短名词或动词短语；หลังจาก 更明确引出较完整的事件。",
      },
    ],
    collocations: [
      { thai: "หลังบ้าน", roman: "lang baan", chinese: "屋后" },
      { thai: "หลังเลิกเรียน", roman: "lang loek riian", chinese: "放学后" },
    ],
    tags: ["location", "time", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ข้าง",
    id: "khaang",
    roman: "khaang",
    chinese: "旁边；一侧",
    partOfSpeech: "preposition",
    theme: "location",
    level: "a1",
    priority: 1014,
    senses: [
      {
        id: "side-position",
        chinese: "表示旁边或一侧，常组成 ข้างหน้า、ข้างหลัง、ข้างใน 等位置词",
        example: {
          thai: "ร้านกาแฟอยู่ข้างโรงแรม เดินจากห้องพักไปแค่สองนาที",
          roman: "raan gaa-faae yuu khaang roong-raem doen jaak haawng-phak bpai khaae saawng naa-thii",
          chinese: "咖啡店在酒店旁边，从房间走过去只要两分钟。",
        },
        tags: ["location", "side"],
      },
    ],
    synonyms: [{ thai: "ข้าง ๆ", roman: "khaang khaang", chinese: "旁边；隔壁" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ใกล้", roman: "glai", chinese: "近" },
        distinctionZh: "ข้าง 指旁边的位置；ใกล้ 只表示距离近，不一定在侧边。",
      },
    ],
    collocations: [
      { thai: "ข้างบ้าน", roman: "khaang baan", chinese: "家旁边" },
      { thai: "ข้างใน", roman: "khaang-nai", chinese: "里面" },
    ],
    tags: ["location", "position", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "รอบ",
    id: "raawp",
    roman: "raawp",
    chinese: "周围；一圈；轮次",
    partOfSpeech: "preposition",
    theme: "location",
    level: "a2",
    priority: 1015,
    senses: [
      {
        id: "around-surrounding",
        chinese: "表示围绕某处、某物周边，也可表示一轮或一次",
        example: {
          thai: "ตอนเย็นเราชอบเดินรอบสวนสาธารณะหนึ่งรอบก่อนกลับบ้าน",
          roman: "dtaawn yen rao chaawp doen raawp suuan saa-thaa-ra-na nueng raawp gaawn glap baan",
          chinese: "傍晚我们喜欢绕公园走一圈再回家。",
        },
        tags: ["location", "round"],
      },
    ],
    synonyms: [{ thai: "รอบ ๆ", roman: "raawp raawp", chinese: "周围" }],
    antonyms: [{ thai: "กลาง", roman: "glaang", chinese: "中间" }],
    comparisons: [
      {
        target: { thai: "แถว", roman: "thaaeo", chinese: "一带；附近" },
        distinctionZh: "รอบ 强调环绕；แถว 强调某一区域附近。",
      },
    ],
    collocations: [
      { thai: "รอบบ้าน", roman: "raawp baan", chinese: "房子周围" },
      { thai: "หนึ่งรอบ", roman: "nueng raawp", chinese: "一圈；一轮" },
    ],
    tags: ["location", "a2"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ตรง",
    id: "dtrong",
    roman: "dtrong",
    chinese: "正好在；直；准确",
    partOfSpeech: "adverb",
    theme: "location",
    level: "a1",
    priority: 1016,
    senses: [
      {
        id: "exact-location",
        chinese: "强调位置、时间或答案“正好、准确、直接”",
        example: {
          thai: "กรุณารอฉันตรงหน้าร้านหนังสือ เพราะตรงนั้นหาง่ายมาก",
          roman: "ga-ru-naa raaw chan dtrong naa raan nang-sue phraw dtrong nan haa ngaai maak",
          chinese: "请在书店正前方等我，因为那里很容易找。",
        },
        tags: ["exactness", "location"],
      },
    ],
    synonyms: [{ thai: "พอดี", roman: "phaaw-dii", chinese: "正好；刚好" }],
    antonyms: [{ thai: "อ้อม", roman: "aawm", chinese: "绕；不直接" }],
    comparisons: [
      {
        target: { thai: "ที่", roman: "thii", chinese: "在；于" },
        distinctionZh: "ที่ 标记位置；ตรง 强调正好在那个点。",
      },
    ],
    collocations: [
      { thai: "ตรงนี้", roman: "dtrong nii", chinese: "这里；这一点" },
      { thai: "ตรงเวลา", roman: "dtrong wee-laa", chinese: "准时" },
    ],
    tags: ["location", "exactness", "a1"],
    sourceRefs: [...GRAMMAR_REFS, ...CORE_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ด้วย",
    id: "duai",
    roman: "duai",
    chinese: "也；一起；用",
    partOfSpeech: "particle",
    theme: "connector",
    level: "a1",
    priority: 1017,
    senses: [
      {
        id: "too-with-together",
        chinese: "表示“也、一起、用……”，也常用于请求尾部增加礼貌感",
        example: {
          thai: "ถ้าคุณไปตลาดตอนเช้า ฉันขอไปด้วยได้ไหมคะ",
          roman: "thaa khun bpai dta-laat dtaawn chaao chan khaaw bpai duai dai mai kha",
          chinese: "如果你早上去市场，我可以一起去吗？",
        },
        tags: ["with", "also", "request"],
      },
    ],
    synonyms: [{ thai: "ด้วยกัน", roman: "duai-gan", chinese: "一起" }],
    antonyms: [{ thai: "คนเดียว", roman: "khon diaao", chinese: "一个人；独自" }],
    comparisons: [
      {
        target: { thai: "กับ", roman: "gap", chinese: "和；跟" },
        distinctionZh: "กับ 常连接名词“和谁”；ด้วย 可表示“也/一起”，也能放句末。",
      },
    ],
    collocations: [
      { thai: "ไปด้วย", roman: "bpai duai", chinese: "一起去；也去" },
      { thai: "ช่วยด้วย", roman: "chuai duai", chinese: "救命；请帮忙" },
    ],
    tags: ["particle", "with", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ให้",
    id: "hai",
    roman: "hai",
    chinese: "给；让；为",
    partOfSpeech: "particle",
    theme: "connector",
    level: "a1",
    priority: 1018,
    senses: [
      {
        id: "give-let-for",
        chinese: "核心功能词，表示给某人、让某人做或为某人做",
        example: {
          thai: "ครูให้การบ้านเราเล็กน้อย เพื่อให้ทุกคนจำคำใหม่ได้ดีขึ้น",
          roman: "khruu hai gaan-baan rao lek-naawy phuea hai thuk khon jam kham mai dai dii kheun",
          chinese: "老师给我们一点作业，为了让每个人把新词记得更好。",
        },
        tags: ["benefactive", "causative", "give"],
      },
    ],
    synonyms: [{ thai: "มอบให้", roman: "maawp hai", chinese: "交给；赠予" }],
    antonyms: [{ thai: "รับ", roman: "rap", chinese: "接收；接受" }],
    comparisons: [
      {
        target: { thai: "ขอ", roman: "khaaw", chinese: "请求；要" },
        distinctionZh: "ให้ 是给/让；ขอ 是请求得到或请求允许。",
      },
    ],
    collocations: [
      { thai: "ให้ฉัน", roman: "hai chan", chinese: "给我；让我" },
      { thai: "ทำให้", roman: "tham hai", chinese: "使得；让" },
    ],
    tags: ["function-word", "benefactive", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ว่า",
    id: "waa",
    roman: "waa",
    chinese: "说；认为；……这件事",
    partOfSpeech: "particle",
    theme: "connector",
    level: "a2",
    priority: 1019,
    senses: [
      {
        id: "complementizer-that",
        chinese: "引出说话、想法、知道的内容，相当于“说/认为/知道……”。",
        example: {
          thai: "ครูบอกว่าวันนี้เราจะฝึกฟังประโยคยาวกว่าปกติ",
          roman: "khruu baawk waa wan-nii rao ja fuek fang bpra-yook yaao gwaa bpa-ga-dti",
          chinese: "老师说今天我们会练习听比平常更长的句子。",
        },
        tags: ["clause", "speech", "cognition"],
      },
    ],
    synonyms: [{ thai: "ว่า...", roman: "waa...", chinese: "说……；认为……" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "คือ", roman: "khue", chinese: "就是；即是" },
        distinctionZh: "ว่า 引出内容从句；คือ 常用于定义或解释身份。",
      },
    ],
    collocations: [
      { thai: "คิดว่า", roman: "khit waa", chinese: "认为" },
      { thai: "บอกว่า", roman: "baawk waa", chinese: "说；告诉说" },
    ],
    tags: ["clause", "connector", "a2"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ที่",
    id: "thii",
    roman: "thii",
    chinese: "在；的；关系词",
    partOfSpeech: "particle",
    theme: "connector",
    level: "a1",
    priority: 1020,
    senses: [
      {
        id: "location-relative-linker",
        chinese: "可标记地点，也可连接修饰从句，相当于“在/的/……的地方”",
        example: {
          thai: "ร้านที่เราไปเมื่อวานอยู่ใกล้ตลาดและขายอาหารไม่แพง",
          roman: "raan thii rao bpai muea-waan yuu glai dta-laat lae khaai aa-haan mai phaaeng",
          chinese: "我们昨天去的那家店在市场附近，卖的食物不贵。",
        },
        tags: ["relative", "location", "linker"],
      },
    ],
    synonyms: [{ thai: "ซึ่ง", roman: "seung", chinese: "关系词；其", notesZh: "较书面。" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ใน", roman: "nai", chinese: "在……里面" },
        distinctionZh: "ที่ 标记地点或从句连接；ใน 强调在内部。",
      },
    ],
    collocations: [
      { thai: "ที่บ้าน", roman: "thii baan", chinese: "在家" },
      { thai: "คนที่...", roman: "khon thii...", chinese: "……的人" },
    ],
    tags: ["particle", "relative", "location"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เพื่อ",
    id: "phuea",
    roman: "phuea",
    chinese: "为了",
    partOfSpeech: "conjunction",
    theme: "connector",
    level: "a2",
    priority: 1021,
    senses: [
      {
        id: "purpose",
        chinese: "引出目的，表示“为了……、以便……”。",
        example: {
          thai: "ฉันฟังประโยคเดิมหลายครั้งเพื่อฝึกออกเสียงให้ชัดขึ้น",
          roman: "chan fang bpra-yook doem laai khrang phuea fuek aawk-siang hai chat kheun",
          chinese: "我听同一个句子好几遍，为了练习把发音说得更清楚。",
        },
        tags: ["purpose", "connector"],
      },
    ],
    synonyms: [{ thai: "เพื่อให้", roman: "phuea hai", chinese: "为了让；以便" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "เพราะ", roman: "phraw", chinese: "因为" },
        distinctionZh: "เพื่อ 说目的；เพราะ 说原因。",
      },
    ],
    collocations: [
      { thai: "เพื่อเรียน", roman: "phuea riian", chinese: "为了学习" },
      { thai: "เพื่อให้เข้าใจ", roman: "phuea hai khao-jai", chinese: "为了让……理解" },
    ],
    tags: ["purpose", "conjunction", "a2"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ตอน",
    id: "dtaawn",
    roman: "dtaawn",
    chinese: "时候；段",
    partOfSpeech: "time-expression",
    theme: "time",
    level: "a1",
    priority: 1022,
    senses: [
      {
        id: "time-period",
        chinese: "表示一天中的时段、某个时候或内容的一段",
        example: {
          thai: "ตอนเช้าฉันเรียนภาษาไทย ส่วนตอนเย็นฉันทบทวนคำศัพท์ที่บ้าน",
          roman: "dtaawn chaao chan riian phaa-saa thai suuan dtaawn yen chan thop-thuaan kham-sap thii baan",
          chinese: "早上我学泰语，而傍晚我在家复习词汇。",
        },
        tags: ["time", "period"],
      },
    ],
    synonyms: [{ thai: "ช่วง", roman: "chuang", chinese: "时段；阶段" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "เวลา", roman: "wee-laa", chinese: "时间" },
        distinctionZh: "ตอน 指具体时段或片段；เวลา 是更泛的“时间”。",
      },
    ],
    collocations: [
      { thai: "ตอนนี้", roman: "dtaawn-nii", chinese: "现在" },
      { thai: "ตอนเช้า", roman: "dtaawn chaao", chinese: "早上" },
    ],
    tags: ["time", "a1"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ก่อน",
    id: "gaawn",
    roman: "gaawn",
    chinese: "先；以前；之前",
    partOfSpeech: "adverb",
    theme: "time",
    level: "a1",
    priority: 1023,
    senses: [
      {
        id: "before-first",
        chinese: "表示时间上在前，也可表示先做某事",
        example: {
          thai: "ก่อนออกจากบ้าน คุณควรตรวจโทรศัพท์และกุญแจให้เรียบร้อย",
          roman: "gaawn aawk jaak baan khun khuuan dtruat tho-ra-sap lae gun-jaae hai riiap-raawy",
          chinese: "出门前，你应该把手机和钥匙检查好。",
        },
        tags: ["time", "sequence"],
      },
    ],
    synonyms: [{ thai: "ก่อนหน้านี้", roman: "gaawn naa nii", chinese: "在这之前" }],
    antonyms: [{ thai: "หลัง", roman: "lang", chinese: "之后；后面" }],
    comparisons: [
      {
        target: { thai: "แรก", roman: "raaek", chinese: "第一；最初" },
        distinctionZh: "ก่อน 强调先于另一件事；แรก 强调第一或最初。",
      },
    ],
    collocations: [
      { thai: "ก่อนนอน", roman: "gaawn naawn", chinese: "睡前" },
      { thai: "ไปก่อน", roman: "bpai gaawn", chinese: "先走" },
    ],
    tags: ["time", "sequence", "a1"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "หลังจาก",
    id: "lang-jaak",
    roman: "lang jaak",
    chinese: "在……之后",
    partOfSpeech: "conjunction",
    theme: "time",
    level: "a2",
    priority: 1024,
    senses: [
      {
        id: "after-event",
        chinese: "引出一个事件，表示在该事件之后",
        example: {
          thai: "หลังจากกินข้าวเสร็จ เราจะนั่งทบทวนบทเรียนด้วยกันครึ่งชั่วโมง",
          roman: "lang jaak gin khaao set rao ja nang thop-thuaan bot-riian duai-gan khreung chua-moong",
          chinese: "吃完饭以后，我们会坐下来一起复习半个小时的课。",
        },
        tags: ["time-clause", "sequence"],
      },
    ],
    synonyms: [{ thai: "หลัง", roman: "lang", chinese: "之后；后面" }],
    antonyms: [{ thai: "ก่อน", roman: "gaawn", chinese: "之前；先" }],
    comparisons: [
      {
        target: { thai: "เมื่อ", roman: "muea", chinese: "当……时" },
        distinctionZh: "หลังจาก 强调之后；เมื่อ 只标记某时间点或“当……时”。",
      },
    ],
    collocations: [
      { thai: "หลังจากนั้น", roman: "lang jaak nan", chinese: "那之后" },
      { thai: "หลังจากเรียน", roman: "lang jaak riian", chinese: "学习之后" },
    ],
    tags: ["conjunction", "time", "a2"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ระหว่าง",
    id: "ra-waang",
    roman: "ra-waang",
    chinese: "在……期间；在……之间",
    partOfSpeech: "preposition",
    theme: "time",
    level: "a2",
    priority: 1025,
    senses: [
      {
        id: "during-between",
        chinese: "表示两个点之间，或某活动进行期间",
        example: {
          thai: "ระหว่างเรียนออนไลน์ กรุณาปิดเสียงไมค์ถ้ายังไม่ได้พูด",
          roman: "ra-waang riian awn-lai ga-ru-naa bpit siang mai thaa yang mai dai phuut",
          chinese: "在线学习期间，如果还没有发言，请关闭麦克风声音。",
        },
        tags: ["time", "between"],
      },
    ],
    synonyms: [{ thai: "ขณะ", roman: "kha-na", chinese: "当……期间" }],
    antonyms: [{ thai: "นอกเวลา", roman: "naawk wee-laa", chinese: "时间之外；非工作时间" }],
    comparisons: [
      {
        target: { thai: "ในขณะที่", roman: "nai kha-na thii", chinese: "当……的时候；而" },
        distinctionZh: "ระหว่าง 常接名词或活动；ในขณะที่ 更常连接完整句子。",
      },
    ],
    collocations: [
      { thai: "ระหว่างทาง", roman: "ra-waang thaang", chinese: "路上；途中" },
      { thai: "ระหว่างเรียน", roman: "ra-waang riian", chinese: "上课期间" },
    ],
    tags: ["preposition", "time", "a2"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ทุก",
    id: "thuk",
    roman: "thuk",
    chinese: "每；所有",
    partOfSpeech: "adverb",
    theme: "quantity",
    level: "a1",
    priority: 1026,
    senses: [
      {
        id: "every-all",
        chinese: "放在名词前，表示每一个或全体",
        example: {
          thai: "ทุกเช้าฉันฟังเสียงภาษาไทยสิบนาทีก่อนเริ่มทำงาน",
          roman: "thuk chaao chan fang siang phaa-saa thai sip naa-thii gaawn roem tham-ngaan",
          chinese: "每天早上我开始工作前听十分钟泰语声音。",
        },
        tags: ["quantity", "frequency"],
      },
    ],
    synonyms: [{ thai: "ทั้งหมด", roman: "thang-mot", chinese: "全部" }],
    antonyms: [{ thai: "บาง", roman: "baang", chinese: "某些；一些" }],
    comparisons: [
      {
        target: { thai: "ทั้งหมด", roman: "thang-mot", chinese: "全部" },
        distinctionZh: "ทุก 放在名词前表示“每/所有”；ทั้งหมด 常放在后面总结“全部”。",
      },
    ],
    collocations: [
      { thai: "ทุกวัน", roman: "thuk wan", chinese: "每天" },
      { thai: "ทุกคน", roman: "thuk khon", chinese: "每个人" },
    ],
    tags: ["quantity", "frequency", "a1"],
    sourceRefs: [...GRAMMAR_REFS, ...CORE_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    thai: "บาง",
    id: "baang",
    roman: "baang",
    chinese: "一些；某些",
    partOfSpeech: "adverb",
    theme: "quantity",
    level: "a1",
    priority: 1027,
    senses: [
      {
        id: "some-certain",
        chinese: "放在名词前，表示不是全部，而是某些、一部分",
        example: {
          thai: "บางคำในบทเรียนนี้อ่านง่าย แต่บางคำต้องฟังหลายครั้ง",
          roman: "baang kham nai bot-riian nii aan ngaai dtaae baang kham dtawng fang laai khrang",
          chinese: "这课里有些词容易读，但有些词需要听好几遍。",
        },
        tags: ["quantity", "partial"],
      },
    ],
    synonyms: [{ thai: "บางส่วน", roman: "baang suuan", chinese: "一部分" }],
    antonyms: [{ thai: "ทุก", roman: "thuk", chinese: "每；所有" }],
    comparisons: [
      {
        target: { thai: "หลาย", roman: "laai", chinese: "许多" },
        distinctionZh: "บาง 表示某些，不强调数量多；หลาย 表示数量不少。",
      },
    ],
    collocations: [
      { thai: "บางคน", roman: "baang khon", chinese: "有些人" },
      { thai: "บางครั้ง", roman: "baang khrang", chinese: "有时候" },
    ],
    tags: ["quantity", "a1"],
    sourceRefs: [...GRAMMAR_REFS, ...CORE_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    thai: "อีก",
    id: "iik",
    roman: "iik",
    chinese: "再；另外；还",
    partOfSpeech: "adverb",
    theme: "quantity",
    level: "a1",
    priority: 1028,
    senses: [
      {
        id: "again-more-another",
        chinese: "表示再一次、更多或另外一个",
        example: {
          thai: "ช่วยพูดประโยคนี้อีกครั้งได้ไหมครับ ผมยังฟังไม่ทัน",
          roman: "chuai phuut bpra-yook nii iik khrang dai mai khrap phom yang fang mai than",
          chinese: "可以请你再说一次这个句子吗？我还没听跟上。",
        },
        tags: ["repeat", "addition"],
      },
    ],
    synonyms: [{ thai: "เพิ่มเติม", roman: "phoem-dtoem", chinese: "额外；补充" }],
    antonyms: [{ thai: "พอแล้ว", roman: "phaaw laaeo", chinese: "够了" }],
    comparisons: [
      {
        target: { thai: "ใหม่", roman: "mai", chinese: "新的；重新" },
        distinctionZh: "อีก 强调再/另外；ใหม่ 强调新的或重新开始。",
      },
    ],
    collocations: [
      { thai: "อีกครั้ง", roman: "iik khrang", chinese: "再一次" },
      { thai: "อีกนิด", roman: "iik nit", chinese: "再一点" },
    ],
    tags: ["addition", "repeat", "a1"],
    sourceRefs: FREQUENCY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ทั้งหมด",
    id: "thang-mot",
    roman: "thang-mot",
    chinese: "全部；一共",
    partOfSpeech: "adverb",
    theme: "quantity",
    level: "a1",
    priority: 1029,
    senses: [
      {
        id: "all-total",
        chinese: "表示全部、总共，没有剩余",
        example: {
          thai: "ค่าอาหารทั้งหมดเท่าไรครับ ถ้ารวมกาแฟสองแก้วด้วย",
          roman: "khaa aa-haan thang-mot thao-rai khrap thaa ruuam gaa-faae saawng gaaeow duai",
          chinese: "如果也包括两杯咖啡，餐费一共多少钱？",
        },
        tags: ["total", "quantity"],
      },
    ],
    synonyms: [{ thai: "รวมทั้งหมด", roman: "ruuam thang-mot", chinese: "总共" }],
    antonyms: [{ thai: "บางส่วน", roman: "baang suuan", chinese: "一部分" }],
    comparisons: [
      {
        target: { thai: "ทุก", roman: "thuk", chinese: "每；所有" },
        distinctionZh: "ทุก 放在名词前；ทั้งหมด 常放在名词后或句末表示总量。",
      },
    ],
    collocations: [
      { thai: "ทั้งหมดเท่าไร", roman: "thang-mot thao-rai", chinese: "一共多少" },
      { thai: "คนทั้งหมด", roman: "khon thang-mot", chinese: "所有人" },
    ],
    tags: ["quantity", "total", "a1"],
    sourceRefs: [...GRAMMAR_REFS, ...CORE_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ทั้ง",
    id: "thang",
    roman: "thang",
    chinese: "整个；两者都；既……又……",
    partOfSpeech: "adverb",
    theme: "quantity",
    level: "a2",
    priority: 1030,
    senses: [
      {
        id: "both-whole",
        chinese: "表示整体、双方或两个方面都包括在内",
        example: {
          thai: "คอร์สนี้เหมาะทั้งสำหรับคนเริ่มเรียนและคนที่อยากทบทวนพื้นฐาน",
          roman: "khaawt nii maw thang sam-rap khon roem riian lae khon thii yaak thop-thuaan pheun-thaan",
          chinese: "这门课既适合初学者，也适合想复习基础的人。",
        },
        tags: ["both", "inclusion"],
      },
    ],
    synonyms: [{ thai: "ทั้งสอง", roman: "thang saawng", chinese: "两者都" }],
    antonyms: [{ thai: "อย่างเดียว", roman: "yaang diaao", chinese: "只有一种；仅仅" }],
    comparisons: [
      {
        target: { thai: "ทั้งหมด", roman: "thang-mot", chinese: "全部" },
        distinctionZh: "ทั้ง 常用于“整个/两者都/既……又……”；ทั้งหมด 强调整体总量。",
      },
    ],
    collocations: [
      { thai: "ทั้งวัน", roman: "thang wan", chinese: "一整天" },
      { thai: "ทั้ง...และ...", roman: "thang...lae...", chinese: "既……又……" },
    ],
    tags: ["quantity", "connector", "a2"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เดี๋ยว",
    id: "diaao-moment",
    roman: "diaao",
    chinese: "等一下；马上",
    partOfSpeech: "time-expression",
    theme: "time",
    level: "a1",
    priority: 1031,
    senses: [
      {
        id: "soon-moment",
        chinese: "表示很短时间后，常用于“等一下、马上”。",
        example: {
          thai: "เดี๋ยวฉันส่งไฟล์เสียงให้คุณฟังอีกครั้งหลังประชุมเสร็จ",
          roman: "diaao chan song fai siang hai khun fang iik khrang lang bpra-chum set",
          chinese: "等一下会议结束后，我会再把音频文件发给你听。",
        },
        tags: ["time", "soon"],
      },
    ],
    synonyms: [{ thai: "อีกเดี๋ยว", roman: "iik diaao", chinese: "再过一会儿" }],
    antonyms: [{ thai: "นาน", roman: "naan", chinese: "久" }],
    comparisons: [
      {
        target: { thai: "เดียว", roman: "diaao", chinese: "单一；只" },
        distinctionZh: "เดี๋ยว 是时间上的“一会儿”；เดียว 表示“单一/只有”。",
      },
    ],
    collocations: [
      { thai: "เดี๋ยวก่อน", roman: "diaao gaawn", chinese: "等一下" },
      { thai: "เดี๋ยวนี้", roman: "diaao nii", chinese: "现在；立刻" },
    ],
    tags: ["time", "spoken", "a1"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เดียว",
    id: "diaao-only",
    roman: "diaao",
    chinese: "单一；只有",
    partOfSpeech: "adverb",
    theme: "quantity",
    level: "a1",
    priority: 1032,
    senses: [
      {
        id: "single-only",
        chinese: "表示只有一个、单独一个或限定在一种情况",
        example: {
          thai: "วันนี้ฉันมีประชุมเดียว แต่ต้องเตรียมเอกสารหลายหน้า",
          roman: "wan-nii chan mii bpra-chum diaao dtaae dtawng dtriiam eek-ga-saan laai naa",
          chinese: "今天我只有一个会议，但必须准备好几页文件。",
        },
        tags: ["only", "single"],
      },
    ],
    synonyms: [{ thai: "เพียง", roman: "phiiang", chinese: "仅仅；只" }],
    antonyms: [{ thai: "หลาย", roman: "laai", chinese: "许多；好几个" }],
    comparisons: [
      {
        target: { thai: "เดี๋ยว", roman: "diaao", chinese: "等一下" },
        distinctionZh: "เดียว 表示数量或限定；เดี๋ยว 表示短时间。",
      },
    ],
    collocations: [
      { thai: "คนเดียว", roman: "khon diaao", chinese: "一个人；独自" },
      { thai: "อย่างเดียว", roman: "yaang diaao", chinese: "只有一种；只" },
    ],
    tags: ["quantity", "limiter", "a1"],
    sourceRefs: FREQUENCY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "แค่",
    id: "khaae",
    roman: "khaae",
    chinese: "只；仅仅",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a1",
    priority: 1033,
    senses: [
      {
        id: "only-just",
        chinese: "限制数量、程度或范围，表示“只、仅仅、不过”。",
        example: {
          thai: "จากบ้านถึงโรงเรียนแค่สิบนาที ถ้าเดินเร็วหน่อยก็ถึงทันเวลา",
          roman: "jaak baan thueng roong-riian khaae sip naa-thii thaa doen reo naawy gaw thueng than wee-laa",
          chinese: "从家到学校只要十分钟，如果走快一点就能准时到。",
        },
        tags: ["limiter", "degree"],
      },
    ],
    synonyms: [{ thai: "เพียง", roman: "phiiang", chinese: "仅；只", notesZh: "更正式。" }],
    antonyms: [{ thai: "มากกว่า", roman: "maak gwaa", chinese: "超过；更多" }],
    comparisons: [
      {
        target: { thai: "เท่านั้น", roman: "thao-nan", chinese: "而已；仅此" },
        distinctionZh: "แค่ 常放在被限制的词前；เท่านั้น 常放在后面收束“仅此而已”。",
      },
    ],
    collocations: [
      { thai: "แค่นี้", roman: "khaae nii", chinese: "就这些；这么点" },
      { thai: "แค่ไหน", roman: "khaae nai", chinese: "到什么程度" },
    ],
    tags: ["degree", "limiter", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เท่านั้น",
    id: "thao-nan",
    roman: "thao-nan",
    chinese: "而已；仅此",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a1",
    priority: 1034,
    senses: [
      {
        id: "only-that",
        chinese: "放在后面收束范围，表示“只有这样/仅此而已”。",
        example: {
          thai: "วันนี้เราจะฝึกอ่านห้าประโยคเท่านั้น แล้วค่อยเรียนคำใหม่พรุ่งนี้",
          roman: "wan-nii rao ja fuek aan haa bpra-yook thao-nan laaeo khawy riian kham mai phrung-nii",
          chinese: "今天我们只练习读五个句子，明天再学新词。",
        },
        tags: ["limiter", "scope"],
      },
    ],
    synonyms: [{ thai: "แค่นั้น", roman: "khaae nan", chinese: "就那样；仅此" }],
    antonyms: [{ thai: "มากกว่านั้น", roman: "maak gwaa nan", chinese: "比那更多" }],
    comparisons: [
      {
        target: { thai: "แค่", roman: "khaae", chinese: "只；仅仅" },
        distinctionZh: "แค่ 通常在前面限制；เท่านั้น 通常在后面总结限制。",
      },
    ],
    collocations: [
      { thai: "เท่านี้เท่านั้น", roman: "thao-nii thao-nan", chinese: "仅此而已" },
      { thai: "สิบบาทเท่านั้น", roman: "sip baat thao-nan", chinese: "只要十泰铢" },
    ],
    tags: ["degree", "limiter", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ประมาณ",
    id: "bpra-maan",
    roman: "bpra-maan",
    chinese: "大约",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a1",
    priority: 1035,
    senses: [
      {
        id: "approximately",
        chinese: "表示估计的数量、时间或程度，不是精确值",
        example: {
          thai: "จากที่นี่ไปสนามบินใช้เวลาประมาณหนึ่งชั่วโมงถ้าฝนไม่ตก",
          roman: "jaak thii-nii bpai sa-naam-bin chai wee-laa bpra-maan nueng chua-moong thaa fon mai dtok",
          chinese: "从这里去机场大约要一个小时，如果不下雨的话。",
        },
        tags: ["approximation", "quantity"],
      },
    ],
    synonyms: [{ thai: "ราว ๆ", roman: "raao raao", chinese: "大约；左右" }],
    antonyms: [{ thai: "เป๊ะ", roman: "bpe", chinese: "正好；精确", notesZh: "口语。" }],
    comparisons: [
      {
        target: { thai: "เกือบ", roman: "geuuap", chinese: "差不多；快要" },
        distinctionZh: "ประมาณ 是估算；เกือบ 表示接近但还没达到。",
      },
    ],
    collocations: [
      { thai: "ประมาณสิบนาที", roman: "bpra-maan sip naa-thii", chinese: "大约十分钟" },
      { thai: "ประมาณนี้", roman: "bpra-maan nii", chinese: "大概这样" },
    ],
    tags: ["approximation", "a1"],
    sourceRefs: FREQUENCY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ค่อนข้าง",
    id: "khaawn-khaang",
    roman: "khaawn-khaang",
    chinese: "相当；比较",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a2",
    priority: 1036,
    senses: [
      {
        id: "quite-rather",
        chinese: "表示程度偏高但不一定到“非常”，相当于“比较、蛮”。",
        example: {
          thai: "บทสนทนานี้ค่อนข้างยาว แต่ถ้าฟังทีละตอนจะเข้าใจง่ายขึ้น",
          roman: "bot-son-tha-naa nii khaawn-khaang yaao dtaae thaa fang thii-la dtaawn ja khao-jai ngaai kheun",
          chinese: "这段对话比较长，但如果一段一段听，会更容易理解。",
        },
        tags: ["degree", "moderation"],
      },
    ],
    synonyms: [{ thai: "พอสมควร", roman: "phaaw-som-khuuan", chinese: "相当；还算" }],
    antonyms: [{ thai: "ไม่ค่อย", roman: "mai khaawy", chinese: "不太" }],
    comparisons: [
      {
        target: { thai: "มาก", roman: "maak", chinese: "很；非常" },
        distinctionZh: "ค่อนข้าง 程度较高但比 มาก 含蓄。",
      },
    ],
    collocations: [
      { thai: "ค่อนข้างยาก", roman: "khaawn-khaang yaak", chinese: "比较难" },
      { thai: "ค่อนข้างดี", roman: "khaawn-khaang dii", chinese: "相当好" },
    ],
    tags: ["degree", "a2"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "จริง ๆ",
    id: "jing-jing",
    roman: "jing jing",
    chinese: "真的；实际上",
    partOfSpeech: "adverb",
    theme: "discourse",
    level: "a1",
    priority: 1037,
    senses: [
      {
        id: "really-actually",
        chinese: "加强真实性、强调感受，也可表示“其实、实际上”。",
        example: {
          thai: "จริง ๆ แล้วฉันอยากเรียนภาษาไทยทุกวัน แต่ช่วงนี้งานค่อนข้างเยอะ",
          roman: "jing jing laaeo chan yaak riian phaa-saa thai thuk wan dtaae chuang nii ngaan khaawn-khaang yuh",
          chinese: "其实我想每天学泰语，但最近工作比较多。",
        },
        tags: ["emphasis", "discourse"],
      },
    ],
    synonyms: [{ thai: "แท้จริง", roman: "thaae-jing", chinese: "真正地；真实地" }],
    antonyms: [{ thai: "ไม่จริง", roman: "mai jing", chinese: "不是真的" }],
    comparisons: [
      {
        target: { thai: "มาก", roman: "maak", chinese: "很" },
        distinctionZh: "จริง ๆ 强调真实性或感叹；มาก 强调程度。",
      },
    ],
    collocations: [
      { thai: "จริง ๆ แล้ว", roman: "jing jing laaeo", chinese: "其实；实际上" },
      { thai: "ดีจริง ๆ", roman: "dii jing jing", chinese: "真的很好" },
    ],
    tags: ["emphasis", "discourse", "a1"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เลย",
    id: "loei",
    roman: "loei",
    chinese: "就；完全；一点也",
    partOfSpeech: "particle",
    theme: "discourse",
    level: "a2",
    priority: 1038,
    senses: [
      {
        id: "result-emphasis",
        chinese: "可表示结果“就”，也可加强程度；否定中常表示“一点也不”。",
        example: {
          thai: "ฝนตกหนักมาก เราเลยต้องเลื่อนนัดเรียนออนไลน์ไปพรุ่งนี้",
          roman: "fon dtok nak maak rao loei dtawng leuuan nat riian awn-lai bpai phrung-nii",
          chinese: "雨下得很大，所以我们只好把线上课约到明天。",
        },
        tags: ["result", "emphasis"],
      },
    ],
    synonyms: [{ thai: "จึง", roman: "jeung", chinese: "因此；所以", notesZh: "较书面。" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ก็", roman: "gaw", chinese: "就；也" },
        distinctionZh: "เลย 常带结果或强烈顺势；ก็ 更轻、更通用。",
      },
    ],
    collocations: [
      { thai: "ก็เลย", roman: "gaw loei", chinese: "所以就" },
      { thai: "ไม่...เลย", roman: "mai...loei", chinese: "一点也不……" },
    ],
    tags: ["result", "emphasis", "a2"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เกินไป",
    id: "goen-bpai",
    roman: "goen bpai",
    chinese: "太；过于",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a1",
    priority: 1039,
    senses: [
      {
        id: "too-excessive",
        chinese: "放在形容词后，表示超过合适程度，常带负面评价",
        example: {
          thai: "ประโยคนี้ยาวเกินไปสำหรับผู้เริ่มเรียน เราควรแบ่งเป็นสองประโยค",
          roman: "bpra-yook nii yaao goen bpai sam-rap phuu roem riian rao khuuan baeng bpen saawng bpra-yook",
          chinese: "这个句子对初学者来说太长了，我们应该分成两个句子。",
        },
        tags: ["degree", "excess"],
      },
    ],
    synonyms: [{ thai: "มากไป", roman: "maak bpai", chinese: "太多；过多" }],
    antonyms: [{ thai: "พอดี", roman: "phaaw-dii", chinese: "刚好；合适" }],
    comparisons: [
      {
        target: { thai: "มาก", roman: "maak", chinese: "很；多" },
        distinctionZh: "มาก 只是强程度；เกินไป 表示过度、不合适。",
      },
    ],
    collocations: [
      { thai: "แพงเกินไป", roman: "phaaeng goen bpai", chinese: "太贵了" },
      { thai: "เร็วเกินไป", roman: "reo goen bpai", chinese: "太快了" },
    ],
    tags: ["degree", "excess", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ขึ้น",
    id: "kheun",
    roman: "kheun",
    chinese: "上；起来；更……",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a1",
    priority: 1040,
    senses: [
      {
        id: "increase-change-up",
        chinese: "表示向上、起身，或状态变得更高、更强、更好",
        example: {
          thai: "ถ้าฟังทุกวัน การออกเสียงของคุณจะชัดขึ้นทีละนิด",
          roman: "thaa fang thuk wan gaan aawk-siang khaawng khun ja chat kheun thii-la nit",
          chinese: "如果每天听，你的发音会一点一点变得更清楚。",
        },
        tags: ["change", "increase"],
      },
    ],
    synonyms: [{ thai: "มากขึ้น", roman: "maak kheun", chinese: "更多；更……" }],
    antonyms: [{ thai: "ลง", roman: "long", chinese: "下；降低" }],
    comparisons: [
      {
        target: { thai: "กว่า", roman: "gwaa", chinese: "比……更" },
        distinctionZh: "ขึ้น 表示变化方向“更……起来”；กว่า 明确比较两个对象。",
      },
    ],
    collocations: [
      { thai: "ดีขึ้น", roman: "dii kheun", chinese: "变好" },
      { thai: "มากขึ้น", roman: "maak kheun", chinese: "更多" },
    ],
    tags: ["degree", "change", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ลง",
    id: "long",
    roman: "long",
    chinese: "下；降低；变少",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a1",
    priority: 1041,
    senses: [
      {
        id: "decrease-change-down",
        chinese: "表示向下，或状态降低、减少、变轻",
        example: {
          thai: "ช่วยพูดช้าลงนิดหน่อยได้ไหม ฉันอยากจดคำใหม่ให้ทัน",
          roman: "chuai phuut chaa long nit-naawy dai mai chan yaak jot kham mai hai than",
          chinese: "可以请你说慢一点点吗？我想把新词记下来跟上。",
        },
        tags: ["change", "decrease"],
      },
    ],
    synonyms: [{ thai: "น้อยลง", roman: "naawy long", chinese: "变少" }],
    antonyms: [{ thai: "ขึ้น", roman: "kheun", chinese: "上；增加" }],
    comparisons: [
      {
        target: { thai: "ลด", roman: "lot", chinese: "减少；降低" },
        distinctionZh: "ลง 可作变化补语；ลด 是动词“减少/降低”。",
      },
    ],
    collocations: [
      { thai: "ช้าลง", roman: "chaa long", chinese: "慢下来" },
      { thai: "น้อยลง", roman: "naawy long", chinese: "变少" },
    ],
    tags: ["degree", "change", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "กว่า",
    id: "gwaa",
    roman: "gwaa",
    chinese: "比……更",
    partOfSpeech: "particle",
    theme: "degree",
    level: "a1",
    priority: 1042,
    senses: [
      {
        id: "comparative-than",
        chinese: "放在形容词或数量后，表示比较“比……更”。",
        example: {
          thai: "บทนี้ยากกว่าบทที่แล้ว แต่ตัวอย่างช่วยให้เข้าใจง่ายขึ้น",
          roman: "bot nii yaak gwaa bot thii laaeo dtaae dtua-yaang chuai hai khao-jai ngaai kheun",
          chinese: "这一课比上一课难，但例子帮助理解得更容易。",
        },
        tags: ["comparison", "degree"],
      },
    ],
    synonyms: [{ thai: "มากกว่า", roman: "maak gwaa", chinese: "更多；比……多" }],
    antonyms: [{ thai: "น้อยกว่า", roman: "naawy gwaa", chinese: "更少；比……少" }],
    comparisons: [
      {
        target: { thai: "ที่สุด", roman: "thii-sut", chinese: "最" },
        distinctionZh: "กว่า 比两个对象；ที่สุด 表示范围内最高程度。",
      },
    ],
    collocations: [
      { thai: "ดีกว่า", roman: "dii gwaa", chinese: "更好" },
      { thai: "มากกว่า", roman: "maak gwaa", chinese: "更多" },
    ],
    tags: ["comparison", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ที่สุด",
    id: "thii-sut",
    roman: "thii-sut",
    chinese: "最",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a1",
    priority: 1043,
    senses: [
      {
        id: "superlative-most",
        chinese: "放在形容词后，表示某范围内程度最高",
        example: {
          thai: "สำหรับฉัน การฟังทุกวันเป็นวิธีที่ดีที่สุดในการจำเสียงใหม่",
          roman: "sam-rap chan gaan fang thuk wan bpen wi-thii thii dii thii-sut nai gaan jam siang mai",
          chinese: "对我来说，每天听是记住新声音的最好方法。",
        },
        tags: ["superlative", "degree"],
      },
    ],
    synonyms: [{ thai: "มากที่สุด", roman: "maak thii-sut", chinese: "最多；最……" }],
    antonyms: [{ thai: "น้อยที่สุด", roman: "naawy thii-sut", chinese: "最少" }],
    comparisons: [
      {
        target: { thai: "กว่า", roman: "gwaa", chinese: "比……更" },
        distinctionZh: "กว่า 是比较级；ที่สุด 是最高级。",
      },
    ],
    collocations: [
      { thai: "ดีที่สุด", roman: "dii thii-sut", chinese: "最好" },
      { thai: "ยากที่สุด", roman: "yaak thii-sut", chinese: "最难" },
    ],
    tags: ["superlative", "comparison", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เพราะว่า",
    id: "phraw-waa",
    roman: "phraw waa",
    chinese: "因为",
    partOfSpeech: "conjunction",
    theme: "connector",
    level: "a1",
    priority: 1044,
    senses: [
      {
        id: "because-reason",
        chinese: "引出原因，比单独 เพราะ 更完整、口语中很常见",
        example: {
          thai: "วันนี้ฉันเรียนออนไลน์เพราะว่าฝนตกหนักและรถติดมาก",
          roman: "wan-nii chan riian awn-lai phraw waa fon dtok nak lae rot dtit maak",
          chinese: "今天我线上学习，因为雨下得很大，而且堵车很严重。",
        },
        tags: ["reason", "connector"],
      },
    ],
    synonyms: [{ thai: "เพราะ", roman: "phraw", chinese: "因为" }],
    antonyms: [{ thai: "ดังนั้น", roman: "dang-nan", chinese: "因此；所以" }],
    comparisons: [
      {
        target: { thai: "เพื่อ", roman: "phuea", chinese: "为了" },
        distinctionZh: "เพราะว่า 引出原因；เพื่อ 引出目的。",
      },
    ],
    collocations: [
      { thai: "เพราะว่า...", roman: "phraw waa...", chinese: "因为……" },
      { thai: "ทำไม...เพราะว่า...", roman: "tham-mai...phraw waa...", chinese: "为什么……因为……" },
    ],
    tags: ["conjunction", "reason", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ดังนั้น",
    id: "dang-nan",
    roman: "dang-nan",
    chinese: "因此；所以",
    partOfSpeech: "conjunction",
    theme: "connector",
    level: "a2",
    priority: 1045,
    senses: [
      {
        id: "therefore-result",
        chinese: "连接前后句，表示由前面的情况推出结果",
        example: {
          thai: "คำนี้ใช้บ่อยมาก ดังนั้นเราควรฝึกอ่านและฟังหลายครั้ง",
          roman: "kham nii chai baawy maak dang-nan rao khuuan fuek aan lae fang laai khrang",
          chinese: "这个词使用很频繁，因此我们应该多练习读和听几遍。",
        },
        tags: ["result", "formal"],
      },
    ],
    synonyms: [
      { thai: "เพราะฉะนั้น", roman: "phraw-cha-nan", chinese: "因此；所以" },
      { thai: "ก็เลย", roman: "gaw loei", chinese: "所以就", notesZh: "更口语。" },
    ],
    antonyms: [{ thai: "เพราะว่า", roman: "phraw waa", chinese: "因为" }],
    comparisons: [
      {
        target: { thai: "เลย", roman: "loei", chinese: "所以就" },
        distinctionZh: "ดังนั้น 更书面、更清楚标记逻辑；เลย 更口语、顺势。",
      },
    ],
    collocations: [
      { thai: "ดังนั้นจึง", roman: "dang-nan jeung", chinese: "因此就" },
      { thai: "ดังนั้นเรา...", roman: "dang-nan rao...", chinese: "所以我们……" },
    ],
    tags: ["conjunction", "result", "a2"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "แล้วก็",
    id: "laaeo-gaw",
    roman: "laaeo gaw",
    chinese: "然后；而且",
    partOfSpeech: "conjunction",
    theme: "connector",
    level: "a1",
    priority: 1046,
    senses: [
      {
        id: "and-then-also",
        chinese: "连接动作或补充信息，表示“然后、还有”。",
        example: {
          thai: "เราจะฟังเสียงก่อน แล้วก็อ่านประโยคตามครูทีละประโยค",
          roman: "rao ja fang siang gaawn laaeo gaw aan bpra-yook dtaam khruu thii-la bpra-yook",
          chinese: "我们会先听声音，然后跟着老师一句一句读句子。",
        },
        tags: ["sequence", "addition"],
      },
    ],
    synonyms: [{ thai: "จากนั้น", roman: "jaak-nan", chinese: "然后；之后" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "และ", roman: "lae", chinese: "和；以及" },
        distinctionZh: "แล้วก็ 更口语，也可带顺序；และ 更中性书面。",
      },
    ],
    collocations: [
      { thai: "แล้วก็ไป", roman: "laaeo gaw bpai", chinese: "然后去" },
      { thai: "แล้วก็มี", roman: "laaeo gaw mii", chinese: "还有；然后有" },
    ],
    tags: ["conjunction", "sequence", "a1"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "หรือว่า",
    id: "rue-waa",
    roman: "rue waa",
    chinese: "或者说；还是说",
    partOfSpeech: "conjunction",
    theme: "connector",
    level: "a2",
    priority: 1047,
    senses: [
      {
        id: "or-alternative-possibility",
        chinese: "提出另一种选择或可能性，语气比 หรือ 更展开",
        example: {
          thai: "คุณอยากฝึกฟังก่อน หรือว่าอยากทบทวนคำศัพท์ใหม่ก่อนครับ",
          roman: "khun yaak fuek fang gaawn rue waa yaak thop-thuaan kham-sap mai gaawn khrap",
          chinese: "你想先练听力，还是说想先复习新词？",
        },
        tags: ["alternative", "question"],
      },
    ],
    synonyms: [{ thai: "หรือ", roman: "rue", chinese: "或者；还是" }],
    antonyms: [{ thai: "และ", roman: "lae", chinese: "和；以及" }],
    comparisons: [
      {
        target: { thai: "หรือเปล่า", roman: "rue-bplaao", chinese: "吗；是不是" },
        distinctionZh: "หรือว่า 常连接选择；หรือเปล่า 构成确认问题。",
      },
    ],
    collocations: [
      { thai: "หรือว่าไม่", roman: "rue waa mai", chinese: "还是不……" },
      { thai: "หรือว่าเพราะ", roman: "rue waa phraw", chinese: "或者是因为" },
    ],
    tags: ["conjunction", "question", "a2"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "แต่ว่า",
    id: "dtaae-waa",
    roman: "dtaae waa",
    chinese: "但是；不过",
    partOfSpeech: "conjunction",
    theme: "connector",
    level: "a1",
    priority: 1048,
    senses: [
      {
        id: "but-however",
        chinese: "连接转折，比单独 แต่ 更完整，口语常用",
        example: {
          thai: "ฉันอยากไปเรียนที่โรงเรียน แต่ว่าวันนี้ต้องทำงานถึงเย็น",
          roman: "chan yaak bpai riian thii roong-riian dtaae waa wan-nii dtawng tham-ngaan thueng yen",
          chinese: "我想去学校上课，但是今天必须工作到傍晚。",
        },
        tags: ["contrast", "connector"],
      },
    ],
    synonyms: [{ thai: "แต่", roman: "dtaae", chinese: "但是" }],
    antonyms: [{ thai: "และ", roman: "lae", chinese: "和；以及" }],
    comparisons: [
      {
        target: { thai: "อย่างไรก็ตาม", roman: "yaang-rai gaw-dtaam", chinese: "然而；不过" },
        distinctionZh: "แต่ว่า 是日常转折；อย่างไรก็ตาม 更书面。",
      },
    ],
    collocations: [
      { thai: "แต่ว่ายัง", roman: "dtaae waa yang", chinese: "但是还" },
      { thai: "แต่ว่าไม่", roman: "dtaae waa mai", chinese: "但是不" },
    ],
    tags: ["conjunction", "contrast", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ไม่ว่า",
    id: "mai-waa",
    roman: "mai waa",
    chinese: "无论；不管",
    partOfSpeech: "conjunction",
    theme: "connector",
    level: "a2",
    priority: 1049,
    senses: [
      {
        id: "no-matter",
        chinese: "引出让步条件，表示无论哪种情况结果都一样",
        example: {
          thai: "ไม่ว่าคุณเรียนช้าหรือเร็ว ถ้าฝึกทุกวันก็จะเก่งขึ้น",
          roman: "mai waa khun riian chaa rue reo thaa fuek thuk wan gaw ja geng kheun",
          chinese: "无论你学得慢还是快，如果每天练习都会进步。",
        },
        tags: ["concession", "condition"],
      },
    ],
    synonyms: [{ thai: "ไม่ว่าจะ", roman: "mai waa ja", chinese: "无论会……" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ถ้า", roman: "thaa", chinese: "如果" },
        distinctionZh: "ถ้า 提出条件；ไม่ว่า 表示无论哪种条件都成立。",
      },
    ],
    collocations: [
      { thai: "ไม่ว่าใคร", roman: "mai waa khrai", chinese: "无论谁" },
      { thai: "ไม่ว่าอะไร", roman: "mai waa arai", chinese: "无论什么" },
    ],
    tags: ["conjunction", "concession", "a2"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ในขณะที่",
    id: "nai-kha-na-thii",
    roman: "nai kha-na thii",
    chinese: "当……的时候；而",
    partOfSpeech: "conjunction",
    theme: "connector",
    level: "a2",
    priority: 1050,
    senses: [
      {
        id: "while-whereas",
        chinese: "连接两个同时发生或形成对比的句子",
        example: {
          thai: "ในขณะที่ครูกำลังอธิบาย นักเรียนควรฟังและจดตัวอย่างสำคัญ",
          roman: "nai kha-na thii khruu gam-lang a-thi-baai nak-riian khuuan fang lae jot dtua-yaang sam-khan",
          chinese: "老师正在解释的时候，学生应该听并记下重要例子。",
        },
        tags: ["time-clause", "contrast"],
      },
    ],
    synonyms: [{ thai: "ระหว่างที่", roman: "ra-waang thii", chinese: "当……期间" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ระหว่าง", roman: "ra-waang", chinese: "在……期间" },
        distinctionZh: "ในขณะที่ 常接完整句子；ระหว่าง 可接名词或活动。",
      },
    ],
    collocations: [
      { thai: "ในขณะที่...", roman: "nai kha-na thii...", chinese: "当……的时候" },
      { thai: "ในขณะเดียวกัน", roman: "nai kha-na diaao gan", chinese: "与此同时" },
    ],
    tags: ["conjunction", "time", "a2"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ใช่ไหม",
    id: "chai-mai",
    roman: "chai mai",
    chinese: "对吗；是不是",
    partOfSpeech: "question",
    theme: "question",
    level: "a1",
    priority: 1051,
    senses: [
      {
        id: "tag-confirmation",
        chinese: "句末确认问题，通常说话者已有一个预期答案",
        example: {
          thai: "พรุ่งนี้เรามีเรียนตอนเก้าโมง ใช่ไหมครับ ผมจะได้มาถึงก่อนเวลา",
          roman: "phrung-nii rao mii riian dtaawn gao moong chai mai khrap phom ja dai maa thueng gaawn wee-laa",
          chinese: "我们明天九点有课，对吗？这样我就能提前到。",
        },
        tags: ["tag-question", "confirmation"],
      },
    ],
    synonyms: [{ thai: "จริงไหม", roman: "jing mai", chinese: "真的吗；对吧" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ไหม", roman: "mai", chinese: "吗" },
        distinctionZh: "ไหม 是一般是否问题；ใช่ไหม 是带预期答案的确认。",
      },
    ],
    collocations: [
      { thai: "ถูกใช่ไหม", roman: "thuuk chai mai", chinese: "对吧" },
      { thai: "ดีใช่ไหม", roman: "dii chai mai", chinese: "不错吧" },
    ],
    tags: ["question", "confirmation", "a1"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "หรือเปล่า",
    id: "rue-bplaao",
    roman: "rue-bplaao",
    chinese: "吗；是不是",
    partOfSpeech: "question",
    theme: "question",
    level: "a1",
    priority: 1052,
    senses: [
      {
        id: "open-yes-no",
        chinese: "较开放的是否问题，相当于“是不是/有没有”。",
        example: {
          thai: "คืนนี้คุณว่างหรือเปล่า ถ้าว่างเรามาฝึกสนทนาภาษาไทยกัน",
          roman: "khuen-nii khun waang rue-bplaao thaa waang rao maa fuek son-tha-naa phaa-saa thai gan",
          chinese: "今晚你有空吗？如果有空，我们来练习泰语会话。",
        },
        tags: ["yes-no-question", "confirmation"],
      },
    ],
    synonyms: [{ thai: "ไหม", roman: "mai", chinese: "吗" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ใช่ไหม", roman: "chai mai", chinese: "对吗" },
        distinctionZh: "หรือเปล่า 更开放；ใช่ไหม 更像请对方确认自己的判断。",
      },
    ],
    collocations: [
      { thai: "มีหรือเปล่า", roman: "mii rue-bplaao", chinese: "有没有" },
      { thai: "ไปหรือเปล่า", roman: "bpai rue-bplaao", chinese: "去不去；去吗" },
    ],
    tags: ["question", "yes-no", "a1"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "อย่างไร",
    id: "yaang-rai",
    roman: "yaang-rai",
    chinese: "怎样；如何",
    partOfSpeech: "question",
    theme: "question",
    level: "a1",
    priority: 1053,
    senses: [
      {
        id: "how-manner",
        chinese: "询问方式、方法或状态，较标准、稍正式",
        example: {
          thai: "ถ้าอยากจำวรรณยุกต์ให้แม่น ควรฝึกอย่างไรทุกวัน",
          roman: "thaa yaak jam wan-na-yuk hai maaen khuuan fuek yaang-rai thuk wan",
          chinese: "如果想把声调记准，每天应该怎样练习？",
        },
        tags: ["question-word", "manner"],
      },
    ],
    synonyms: [{ thai: "ยังไง", roman: "yang-ngai", chinese: "怎么；怎样", notesZh: "更口语。" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ทำไม", roman: "tham-mai", chinese: "为什么" },
        distinctionZh: "อย่างไร 问方法；ทำไม 问原因。",
      },
    ],
    collocations: [
      { thai: "ทำอย่างไร", roman: "tham yaang-rai", chinese: "怎么做" },
      { thai: "เป็นอย่างไร", roman: "bpen yaang-rai", chinese: "怎么样" },
    ],
    tags: ["question", "manner", "a1"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ยังไง",
    id: "yang-ngai",
    roman: "yang-ngai",
    chinese: "怎么；怎样",
    partOfSpeech: "question",
    theme: "question",
    level: "a1",
    priority: 1054,
    senses: [
      {
        id: "spoken-how",
        chinese: "口语中询问方法、情况或结果，相当于“怎么、怎样”。",
        example: {
          thai: "คำนี้ออกเสียงยังไงครับ ผมฟังแล้วแต่ยังพูดตามไม่ได้",
          roman: "kham nii aawk-siang yang-ngai khrap phom fang laaeo dtaae yang phuut dtaam mai dai",
          chinese: "这个词怎么发音？我听了，但还不能跟着说出来。",
        },
        tags: ["question-word", "spoken"],
      },
    ],
    synonyms: [{ thai: "อย่างไร", roman: "yaang-rai", chinese: "如何；怎样" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "อย่างไร", roman: "yaang-rai", chinese: "如何" },
        distinctionZh: "ยังไง 更口语；อย่างไร 更标准或正式。",
      },
    ],
    collocations: [
      { thai: "เป็นยังไง", roman: "bpen yang-ngai", chinese: "怎么样" },
      { thai: "ทำยังไง", roman: "tham yang-ngai", chinese: "怎么做" },
    ],
    tags: ["question", "spoken", "a1"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "กี่",
    id: "gii",
    roman: "gii",
    chinese: "几；多少",
    partOfSpeech: "question",
    theme: "question",
    level: "a1",
    priority: 1055,
    senses: [
      {
        id: "how-many-countable",
        chinese: "询问可数数量，常和量词或时间单位连用",
        example: {
          thai: "ในห้องเรียนนี้มีนักเรียนกี่คน และวันนี้ขาดเรียนกี่คน",
          roman: "nai haawng-riian nii mii nak-riian gii khon lae wan-nii khaat riian gii khon",
          chinese: "这间教室里有几个学生？今天有几个人缺课？",
        },
        tags: ["question-word", "quantity"],
      },
    ],
    synonyms: [{ thai: "เท่าไร", roman: "thao-rai", chinese: "多少；多少钱" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "เท่าไร", roman: "thao-rai", chinese: "多少；多少钱" },
        distinctionZh: "กี่ 常和可数量词连用；เท่าไร 可问价格、程度或总量。",
      },
    ],
    collocations: [
      { thai: "กี่คน", roman: "gii khon", chinese: "几个人" },
      { thai: "กี่โมง", roman: "gii moong", chinese: "几点" },
    ],
    tags: ["question", "quantity", "a1"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "แค่ไหน",
    id: "khaae-nai",
    roman: "khaae nai",
    chinese: "到什么程度；多么",
    partOfSpeech: "question",
    theme: "question",
    level: "a2",
    priority: 1056,
    senses: [
      {
        id: "extent-degree",
        chinese: "询问程度、范围或距离，相当于“有多……”。",
        example: {
          thai: "จากบ้านคุณถึงโรงเรียนไกลแค่ไหน ถ้าเดินไปใช้เวลากี่นาที",
          roman: "jaak baan khun thueng roong-riian glai khaae nai thaa doen bpai chai wee-laa gii naa-thii",
          chinese: "从你家到学校有多远？如果走路要花几分钟？",
        },
        tags: ["question-word", "degree"],
      },
    ],
    synonyms: [{ thai: "เท่าไร", roman: "thao-rai", chinese: "多少；到什么程度" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "กี่", roman: "gii", chinese: "几；多少" },
        distinctionZh: "แค่ไหน 问程度或距离；กี่ 问可数数量。",
      },
    ],
    collocations: [
      { thai: "ไกลแค่ไหน", roman: "glai khaae nai", chinese: "多远" },
      { thai: "ยากแค่ไหน", roman: "yaak khaae nai", chinese: "有多难" },
    ],
    tags: ["question", "degree", "a2"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เมื่อกี้",
    id: "muea-gii",
    roman: "muea-gii",
    chinese: "刚才",
    partOfSpeech: "time-expression",
    theme: "time",
    level: "a1",
    priority: 1057,
    senses: [
      {
        id: "just-now",
        chinese: "表示刚刚发生的过去时间，常用于口语",
        example: {
          thai: "เมื่อกี้ครูพูดเร็วไปหน่อย คุณช่วยอธิบายอีกครั้งได้ไหม",
          roman: "muea-gii khruu phuut reo bpai naawy khun chuai a-thi-baai iik khrang dai mai",
          chinese: "刚才老师说得有点太快了，你可以再解释一次吗？",
        },
        tags: ["time", "recent-past"],
      },
    ],
    synonyms: [{ thai: "เมื่อครู่", roman: "muea khruu", chinese: "刚才", notesZh: "稍正式。" }],
    antonyms: [{ thai: "เดี๋ยว", roman: "diaao", chinese: "等一下；马上" }],
    comparisons: [
      {
        target: { thai: "เมื่อวาน", roman: "muea-waan", chinese: "昨天" },
        distinctionZh: "เมื่อกี้ 是很近的过去；เมื่อวาน 是昨天。",
      },
    ],
    collocations: [
      { thai: "เมื่อกี้นี้", roman: "muea-gii nii", chinese: "刚刚这个时候" },
      { thai: "คำเมื่อกี้", roman: "kham muea-gii", chinese: "刚才那个词" },
    ],
    tags: ["time", "spoken", "a1"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ตอนนี้",
    id: "dtaawn-nii",
    roman: "dtaawn-nii",
    chinese: "现在",
    partOfSpeech: "time-expression",
    theme: "time",
    level: "a1",
    priority: 1058,
    senses: [
      {
        id: "now-currently",
        chinese: "表示说话当下或目前这个阶段",
        example: {
          thai: "ตอนนี้ฉันจำพยัญชนะได้มากขึ้น แต่ยังต้องฝึกสระทุกวัน",
          roman: "dtaawn-nii chan jam pha-yan-cha-na dai maak kheun dtaae yang dtawng fuek sa-ra thuk wan",
          chinese: "现在我记得更多辅音了，但还必须每天练习元音。",
        },
        tags: ["time", "present"],
      },
    ],
    synonyms: [{ thai: "เดี๋ยวนี้", roman: "diaao nii", chinese: "现在；如今" }],
    antonyms: [{ thai: "เมื่อก่อน", roman: "muea gaawn", chinese: "以前" }],
    comparisons: [
      {
        target: { thai: "วันนี้", roman: "wan-nii", chinese: "今天" },
        distinctionZh: "ตอนนี้ 是此刻/目前；วันนี้ 是今天整天。",
      },
    ],
    collocations: [
      { thai: "ตอนนี้อยู่ที่ไหน", roman: "dtaawn-nii yuu thii nai", chinese: "现在在哪里" },
      { thai: "ตอนนี้ยัง", roman: "dtaawn-nii yang", chinese: "现在还" },
    ],
    tags: ["time", "present", "a1"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ตอนเช้า",
    id: "dtaawn-chaao",
    roman: "dtaawn chaao",
    chinese: "早上",
    partOfSpeech: "time-expression",
    theme: "time",
    level: "a1",
    priority: 1059,
    senses: [
      {
        id: "morning-period",
        chinese: "一天中的早上时段，常放在句首或句末定位时间",
        example: {
          thai: "ตอนเช้าฉันชอบดื่มกาแฟร้อนและอ่านข่าวภาษาไทยสั้น ๆ",
          roman: "dtaawn chaao chan chaawp duuem gaa-faae raawn lae aan khaao phaa-saa thai san san",
          chinese: "早上我喜欢喝热咖啡，并读短的泰语新闻。",
        },
        tags: ["time", "daily-routine"],
      },
    ],
    synonyms: [{ thai: "เช้า", roman: "chaao", chinese: "早上；早" }],
    antonyms: [{ thai: "ตอนเย็น", roman: "dtaawn yen", chinese: "傍晚" }],
    comparisons: [
      {
        target: { thai: "พรุ่งนี้เช้า", roman: "phrung-nii chaao", chinese: "明天早上" },
        distinctionZh: "ตอนเช้า 泛指早上；พรุ่งนี้เช้า 明确是明天早上。",
      },
    ],
    collocations: [
      { thai: "ทุกตอนเช้า", roman: "thuk dtaawn chaao", chinese: "每天早上" },
      { thai: "ตอนเช้ามาก", roman: "dtaawn chaao maak", chinese: "很早上；大清早" },
    ],
    tags: ["time", "a1"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ตอนเย็น",
    id: "dtaawn-yen",
    roman: "dtaawn yen",
    chinese: "傍晚；晚上前段",
    partOfSpeech: "time-expression",
    theme: "time",
    level: "a1",
    priority: 1060,
    senses: [
      {
        id: "evening-period",
        chinese: "傍晚时段，通常指下午晚些时候到晚上早段",
        example: {
          thai: "ตอนเย็นหลังเลิกงาน ฉันมักจะฟังบทสนทนาภาษาไทยระหว่างเดินกลับบ้าน",
          roman: "dtaawn yen lang loek ngaan chan mak ja fang bot-son-tha-naa phaa-saa thai ra-waang doen glap baan",
          chinese: "傍晚下班后，我常常在走回家的路上听泰语对话。",
        },
        tags: ["time", "daily-routine"],
      },
    ],
    synonyms: [{ thai: "เย็น", roman: "yen", chinese: "傍晚；凉" }],
    antonyms: [{ thai: "ตอนเช้า", roman: "dtaawn chaao", chinese: "早上" }],
    comparisons: [
      {
        target: { thai: "กลางคืน", roman: "glaang-khuen", chinese: "夜里" },
        distinctionZh: "ตอนเย็น 是傍晚；กลางคืน 是夜里。",
      },
    ],
    collocations: [
      { thai: "วันนี้ตอนเย็น", roman: "wan-nii dtaawn yen", chinese: "今天傍晚" },
      { thai: "ตอนเย็นหลังงาน", roman: "dtaawn yen lang ngaan", chinese: "下班后傍晚" },
    ],
    tags: ["time", "a1"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "วันละ",
    id: "wan-la",
    roman: "wan la",
    chinese: "每天……；一天……",
    partOfSpeech: "time-expression",
    theme: "time",
    level: "a2",
    priority: 1061,
    senses: [
      {
        id: "per-day",
        chinese: "表示按天分配的数量或频率",
        example: {
          thai: "ถ้าคุณจำคำใหม่วันละห้าคำ หนึ่งเดือนจะรู้คำมากขึ้นมาก",
          roman: "thaa khun jam kham mai wan la haa kham nueng duean ja ruu kham maak kheun maak",
          chinese: "如果你每天记五个新词，一个月后会认识多很多词。",
        },
        tags: ["frequency", "distribution"],
      },
    ],
    synonyms: [{ thai: "ทุกวัน", roman: "thuk wan", chinese: "每天" }],
    antonyms: [{ thai: "เดือนละครั้ง", roman: "duean la khrang", chinese: "每月一次" }],
    comparisons: [
      {
        target: { thai: "ทุกวัน", roman: "thuk wan", chinese: "每天" },
        distinctionZh: "วันละ 后面常接数量；ทุกวัน 只表示每天发生。",
      },
    ],
    collocations: [
      { thai: "วันละครั้ง", roman: "wan la khrang", chinese: "每天一次" },
      { thai: "วันละนิด", roman: "wan la nit", chinese: "每天一点" },
    ],
    tags: ["time", "frequency", "a2"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ทีละ",
    id: "thii-la",
    roman: "thii la",
    chinese: "一次一个；逐一",
    partOfSpeech: "adverb",
    theme: "quantity",
    level: "a2",
    priority: 1062,
    senses: [
      {
        id: "one-at-a-time",
        chinese: "表示按次序一个一个、一步一步地处理",
        example: {
          thai: "อย่ารีบอ่านทั้งหน้า ให้ฝึกทีละประโยคแล้วค่อยเพิ่มความเร็ว",
          roman: "yaa riip aan thang naa hai fuek thii la bpra-yook laaeo khawy phoem khwaam-reo",
          chinese: "不要急着读整页，先一句一句练，再慢慢提高速度。",
        },
        tags: ["sequence", "distribution"],
      },
    ],
    synonyms: [{ thai: "ทีละน้อย", roman: "thii la naawy", chinese: "一点一点地" }],
    antonyms: [{ thai: "พร้อมกัน", roman: "phraawm gan", chinese: "同时" }],
    comparisons: [
      {
        target: { thai: "พร้อมกัน", roman: "phraawm gan", chinese: "同时" },
        distinctionZh: "ทีละ 表示逐一；พร้อมกัน 表示同时。",
      },
    ],
    collocations: [
      { thai: "ทีละคำ", roman: "thii la kham", chinese: "一个词一个词地" },
      { thai: "ทีละคน", roman: "thii la khon", chinese: "一个人一个人地" },
    ],
    tags: ["sequence", "quantity", "a2"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ทุกวัน",
    id: "thuk-wan",
    roman: "thuk wan",
    chinese: "每天",
    partOfSpeech: "time-expression",
    theme: "time",
    level: "a1",
    priority: 1063,
    senses: [
      {
        id: "every-day",
        chinese: "表示每天都发生的频率",
        example: {
          thai: "ฉันพยายามฟังภาษาไทยทุกวัน แม้บางวันจะมีเวลาแค่นิดหน่อย",
          roman: "chan pha-yaa-yaam fang phaa-saa thai thuk wan maae baang wan ja mii wee-laa khaae nit-naawy",
          chinese: "我努力每天听泰语，即使有些天只有一点点时间。",
        },
        tags: ["frequency", "routine"],
      },
    ],
    synonyms: [{ thai: "วันละ", roman: "wan la", chinese: "每天……；一天……" }],
    antonyms: [{ thai: "บางวัน", roman: "baang wan", chinese: "有些天" }],
    comparisons: [
      {
        target: { thai: "เสมอ", roman: "sa-moe", chinese: "总是" },
        distinctionZh: "ทุกวัน 明确每天；เสมอ 表示总是，不一定按天。",
      },
    ],
    collocations: [
      { thai: "เรียนทุกวัน", roman: "riian thuk wan", chinese: "每天学习" },
      { thai: "ฟังทุกวัน", roman: "fang thuk wan", chinese: "每天听" },
    ],
    tags: ["time", "frequency", "a1"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "บ่อย ๆ",
    id: "baawy-baawy",
    roman: "baawy baawy",
    chinese: "常常；经常",
    partOfSpeech: "adverb",
    theme: "time",
    level: "a1",
    priority: 1064,
    senses: [
      {
        id: "often-frequency",
        chinese: "表示频率高，经常发生",
        example: {
          thai: "ถ้าออกเสียงคำยากบ่อย ๆ ปากจะคุ้นกับเสียงใหม่มากขึ้น",
          roman: "thaa aawk-siang kham yaak baawy baawy bpaak ja khun gap siang mai maak kheun",
          chinese: "如果经常发难词的音，嘴巴会更习惯新的声音。",
        },
        tags: ["frequency", "reduplication"],
      },
    ],
    synonyms: [{ thai: "บ่อย", roman: "baawy", chinese: "常；经常" }],
    antonyms: [{ thai: "ไม่ค่อย", roman: "mai khaawy", chinese: "不太；不常" }],
    comparisons: [
      {
        target: { thai: "เสมอ", roman: "sa-moe", chinese: "总是" },
        distinctionZh: "บ่อย ๆ 是经常；เสมอ 更接近总是、一直。",
      },
    ],
    collocations: [
      { thai: "เจอบ่อย ๆ", roman: "joo baawy baawy", chinese: "常常见到" },
      { thai: "ฝึกบ่อย ๆ", roman: "fuek baawy baawy", chinese: "常常练习" },
    ],
    tags: ["frequency", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "บางครั้ง",
    id: "baang-khrang",
    roman: "baang khrang",
    chinese: "有时候",
    partOfSpeech: "adverb",
    theme: "time",
    level: "a1",
    priority: 1065,
    senses: [
      {
        id: "sometimes",
        chinese: "表示某事偶尔发生，不是每次都发生",
        example: {
          thai: "บางครั้งฉันเข้าใจคำแยกกัน แต่ยังไม่เข้าใจทั้งประโยค",
          roman: "baang khrang chan khao-jai kham yaaek gan dtaae yang mai khao-jai thang bpra-yook",
          chinese: "有时候我理解单个词，但还不理解整个句子。",
        },
        tags: ["frequency", "partial"],
      },
    ],
    synonyms: [{ thai: "บางที", roman: "baang-thii", chinese: "有时；也许" }],
    antonyms: [{ thai: "เสมอ", roman: "sa-moe", chinese: "总是" }],
    comparisons: [
      {
        target: { thai: "บางที", roman: "baang-thii", chinese: "有时；也许" },
        distinctionZh: "บางครั้ง 明确表示有时候；บางที 还可表示也许。",
      },
    ],
    collocations: [
      { thai: "บางครั้งก็", roman: "baang khrang gaw", chinese: "有时候也/就" },
      { thai: "บางครั้งไม่", roman: "baang khrang mai", chinese: "有时候不" },
    ],
    tags: ["frequency", "a1"],
    sourceRefs: TIME_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ปกติ",
    id: "bpa-ga-dti",
    roman: "bpa-ga-dti",
    chinese: "通常；正常",
    partOfSpeech: "adverb",
    theme: "time",
    level: "a1",
    priority: 1066,
    senses: [
      {
        id: "usually-normal",
        chinese: "表示平常情况或正常状态",
        example: {
          thai: "ปกติฉันเรียนตอนเย็น แต่สัปดาห์นี้ต้องเรียนตอนเช้าแทน",
          roman: "bpa-ga-dti chan riian dtaawn yen dtaae sap-daa nii dtawng riian dtaawn chaao thaaen",
          chinese: "我通常傍晚学习，但这周必须改成早上学习。",
        },
        tags: ["frequency", "normality"],
      },
    ],
    synonyms: [{ thai: "ตามปกติ", roman: "dtaam bpa-ga-dti", chinese: "照常；通常" }],
    antonyms: [{ thai: "ผิดปกติ", roman: "phit bpa-ga-dti", chinese: "异常" }],
    comparisons: [
      {
        target: { thai: "เสมอ", roman: "sa-moe", chinese: "总是" },
        distinctionZh: "ปกติ 是通常/正常；เสมอ 强调总是或一贯。",
      },
    ],
    collocations: [
      { thai: "ตามปกติ", roman: "dtaam bpa-ga-dti", chinese: "照常" },
      { thai: "ปกติแล้ว", roman: "bpa-ga-dti laaeo", chinese: "通常来说" },
    ],
    tags: ["frequency", "normality", "a1"],
    sourceRefs: FREQUENCY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เสมอ",
    id: "sa-moe",
    roman: "sa-moe",
    chinese: "总是；一贯",
    partOfSpeech: "adverb",
    theme: "time",
    level: "a2",
    priority: 1067,
    senses: [
      {
        id: "always-consistently",
        chinese: "表示一贯如此、经常保持不变",
        example: {
          thai: "ครูเตือนเสมอว่าอย่าแปลทีละคำโดยไม่ดูบริบททั้งประโยค",
          roman: "khruu dteuuan sa-moe waa yaa bplaae thii la kham dooi mai duu baw-ri-bot thang bpra-yook",
          chinese: "老师总是提醒不要不看整个句子的语境就逐词翻译。",
        },
        tags: ["frequency", "consistency"],
      },
    ],
    synonyms: [{ thai: "ตลอด", roman: "dta-laawt", chinese: "一直；始终" }],
    antonyms: [{ thai: "บางครั้ง", roman: "baang khrang", chinese: "有时候" }],
    comparisons: [
      {
        target: { thai: "ทุกวัน", roman: "thuk wan", chinese: "每天" },
        distinctionZh: "เสมอ 表示一贯；ทุกวัน 明确每天发生。",
      },
    ],
    collocations: [
      { thai: "จำไว้เสมอ", roman: "jam wai sa-moe", chinese: "永远记住" },
      { thai: "พูดเสมอ", roman: "phuut sa-moe", chinese: "总是说" },
    ],
    tags: ["frequency", "a2"],
    sourceRefs: FREQUENCY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ไม่เคย",
    id: "mai-khoei",
    roman: "mai khoei",
    chinese: "从未；没有过",
    partOfSpeech: "adverb",
    theme: "time",
    level: "a1",
    priority: 1068,
    senses: [
      {
        id: "never-experience",
        chinese: "否定过去经验，表示从来没有做过或遇到过",
        example: {
          thai: "ฉันไม่เคยไปภูเก็ต แต่ปีหน้าอยากไปเที่ยวกับเพื่อน",
          roman: "chan mai khoei bpai phuu-get dtaae bpii naa yaak bpai thiaao gap phuean",
          chinese: "我从未去过普吉岛，但明年想和朋友去玩。",
        },
        tags: ["experience", "negation"],
      },
    ],
    synonyms: [{ thai: "ไม่เคย...มาก่อน", roman: "mai khoei...maa gaawn", chinese: "以前从未……过" }],
    antonyms: [{ thai: "เคย", roman: "khoei", chinese: "曾经；有过" }],
    comparisons: [
      {
        target: { thai: "ยังไม่", roman: "yang mai", chinese: "还没" },
        distinctionZh: "ไม่เคย 强调从未有过经验；ยังไม่ 只说还没发生，未来可能会发生。",
      },
    ],
    collocations: [
      { thai: "ไม่เคยกิน", roman: "mai khoei gin", chinese: "从没吃过" },
      { thai: "ไม่เคยเห็น", roman: "mai khoei hen", chinese: "从没见过" },
    ],
    tags: ["negation", "experience", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "คือว่า",
    id: "khue-waa",
    roman: "khue waa",
    chinese: "就是说；是这样的",
    partOfSpeech: "discourse-marker",
    theme: "discourse",
    level: "a2",
    priority: 1069,
    senses: [
      {
        id: "preface-explanation",
        chinese: "口语中用于开头解释情况、补充背景或委婉开口",
        example: {
          thai: "คือว่าพรุ่งนี้ฉันอาจจะมาสายเล็กน้อย เพราะมีนัดหมอก่อนเรียน",
          roman: "khue waa phrung-nii chan aat-ja maa saai lek-naawy phraw mii nat maaw gaawn riian",
          chinese: "是这样的，明天我可能会晚到一点，因为上课前有医生预约。",
        },
        tags: ["discourse", "softener"],
      },
    ],
    synonyms: [{ thai: "คือ", roman: "khue", chinese: "就是；即是" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ว่า", roman: "waa", chinese: "说；认为" },
        distinctionZh: "คือว่า 常作话语开头；ว่า 常作从句连接词。",
      },
    ],
    collocations: [
      { thai: "คือว่า...", roman: "khue waa...", chinese: "就是说……" },
      { thai: "คือว่าไม่", roman: "khue waa mai", chinese: "是这样的，不……" },
    ],
    tags: ["discourse", "spoken", "a2"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "นะ",
    id: "na",
    roman: "na",
    chinese: "呢；啊；吧（柔和语气）",
    partOfSpeech: "particle",
    theme: "particle",
    level: "a1",
    priority: 1070,
    senses: [
      {
        id: "softener-reminder",
        chinese: "句末语气词，使提醒、请求或说明更柔和",
        example: {
          thai: "พรุ่งนี้อย่าลืมนำหนังสือภาษาไทยมาด้วยนะ เราจะใช้ในชั้นเรียน",
          roman: "phrung-nii yaa luuem nam nang-sue phaa-saa thai maa duai na rao ja chai nai chan-riian",
          chinese: "明天别忘了把泰语书也带来哦，我们会在课堂上用。",
        },
        tags: ["particle", "softener"],
      },
    ],
    synonyms: [{ thai: "นะครับ", roman: "na khrap", chinese: "柔和礼貌语气（男）" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "สิ", roman: "si", chinese: "嘛；吧（催促/鼓励）" },
        distinctionZh: "นะ 柔和提醒；สิ 更像催促、鼓励或强调。",
      },
    ],
    collocations: [
      { thai: "นะครับ", roman: "na khrap", chinese: "哦/吧（男性礼貌）" },
      { thai: "นะคะ", roman: "na kha", chinese: "哦/吧（女性礼貌）" },
    ],
    tags: ["particle", "pragmatics", "a1"],
    sourceRefs: ["thai-reference-polite-particles", ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    thai: "สิ",
    id: "si",
    roman: "si",
    chinese: "嘛；吧（催促/强调）",
    partOfSpeech: "particle",
    theme: "particle",
    level: "a2",
    priority: 1071,
    senses: [
      {
        id: "urge-emphasize",
        chinese: "句末语气词，用于鼓励、催促或强调显而易见的事",
        example: {
          thai: "ถ้าไม่เข้าใจคำนี้ ลองถามครูสิ ครูอธิบายได้ชัดมาก",
          roman: "thaa mai khao-jai kham nii laawng thaam khruu si khruu a-thi-baai dai chat maak",
          chinese: "如果不懂这个词，就问老师嘛，老师解释得很清楚。",
        },
        tags: ["particle", "urging"],
      },
    ],
    synonyms: [{ thai: "เถอะ", roman: "thoe", chinese: "吧；还是……吧" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "นะ", roman: "na", chinese: "柔和语气" },
        distinctionZh: "สิ 更有推动感；นะ 更柔和。",
      },
    ],
    collocations: [
      { thai: "ลองสิ", roman: "laawng si", chinese: "试试嘛" },
      { thai: "ถามสิ", roman: "thaam si", chinese: "问嘛" },
    ],
    tags: ["particle", "pragmatics", "a2"],
    sourceRefs: ["thai-reference-polite-particles", ...DISCOURSE_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ล่ะ",
    id: "la",
    roman: "la",
    chinese: "呢；那么……呢",
    partOfSpeech: "particle",
    theme: "particle",
    level: "a2",
    priority: 1072,
    senses: [
      {
        id: "return-question-topic",
        chinese: "用于把话题转回对方或追问“那……呢？”",
        example: {
          thai: "ฉันชอบเรียนตอนเช้า แล้วคุณล่ะ ชอบเรียนเวลาไหนมากกว่า",
          roman: "chan chaawp riian dtaawn chaao laaeo khun la chaawp riian wee-laa nai maak gwaa",
          chinese: "我喜欢早上学习，那你呢？你更喜欢什么时候学习？",
        },
        tags: ["particle", "topic-shift"],
      },
    ],
    synonyms: [{ thai: "แล้ว...ล่ะ", roman: "laaeo...la", chinese: "那么……呢" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "ไหม", roman: "mai", chinese: "吗" },
        distinctionZh: "ไหม 构成是否问题；ล่ะ 常把问题转向另一个话题或对象。",
      },
    ],
    collocations: [
      { thai: "คุณล่ะ", roman: "khun la", chinese: "你呢" },
      { thai: "แล้วเราล่ะ", roman: "laaeo rao la", chinese: "那我们呢" },
    ],
    tags: ["particle", "question", "a2"],
    sourceRefs: ["thai-reference-polite-particles", ...QUESTION_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    thai: "เถอะ",
    id: "thoe",
    roman: "thoe",
    chinese: "吧；还是……吧",
    partOfSpeech: "particle",
    theme: "particle",
    level: "a2",
    priority: 1073,
    senses: [
      {
        id: "suggestion-soft-command",
        chinese: "用于建议、劝说或柔和命令，常有“吧”的感觉",
        example: {
          thai: "ถ้าเหนื่อยมาก พักสิบนาทีก่อนเถอะ แล้วค่อยกลับมาฝึกต่อ",
          roman: "thaa neueai maak phak sip naa-thii gaawn thoe laaeo khawy glap maa fuek dtaaw",
          chinese: "如果很累，就先休息十分钟吧，然后再回来继续练习。",
        },
        tags: ["particle", "suggestion"],
      },
    ],
    synonyms: [{ thai: "เถอะนะ", roman: "thoe na", chinese: "吧，好吗" }],
    antonyms: [],
    comparisons: [
      {
        target: { thai: "สิ", roman: "si", chinese: "嘛；吧" },
        distinctionZh: "เถอะ 常像劝说或建议；สิ 更像催促或提醒对方行动。",
      },
    ],
    collocations: [
      { thai: "ไปเถอะ", roman: "bpai thoe", chinese: "走吧" },
      { thai: "พักเถอะ", roman: "phak thoe", chinese: "休息吧" },
    ],
    tags: ["particle", "suggestion", "a2"],
    sourceRefs: ["thai-reference-polite-particles", ...DISCOURSE_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ด้วยกัน",
    id: "duai-gan",
    roman: "duai-gan",
    chinese: "一起",
    partOfSpeech: "adverb",
    theme: "connector",
    level: "a1",
    priority: 1074,
    senses: [
      {
        id: "together",
        chinese: "表示多人一起做同一件事",
        example: {
          thai: "หลังเลิกเรียน เราจะนั่งทบทวนคำศัพท์ด้วยกันที่ร้านกาแฟใกล้โรงเรียน",
          roman: "lang loek riian rao ja nang thop-thuaan kham-sap duai-gan thii raan gaa-faae glai roong-riian",
          chinese: "下课后，我们会一起坐在学校附近的咖啡店复习词汇。",
        },
        tags: ["together", "social"],
      },
    ],
    synonyms: [{ thai: "พร้อมกัน", roman: "phraawm gan", chinese: "同时；一起" }],
    antonyms: [{ thai: "คนเดียว", roman: "khon diaao", chinese: "一个人；独自" }],
    comparisons: [
      {
        target: { thai: "ด้วย", roman: "duai", chinese: "也；一起" },
        distinctionZh: "ด้วยกัน 明确“一起”；ด้วย 单独可表示也、用、一起等多种功能。",
      },
    ],
    collocations: [
      { thai: "ไปด้วยกัน", roman: "bpai duai-gan", chinese: "一起去" },
      { thai: "เรียนด้วยกัน", roman: "riian duai-gan", chinese: "一起学习" },
    ],
    tags: ["adverb", "together", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "อย่างนั้น",
    id: "yaang-nan",
    roman: "yaang nan",
    chinese: "那样",
    partOfSpeech: "adverb",
    theme: "discourse",
    level: "a1",
    priority: 1075,
    senses: [
      {
        id: "that-way",
        chinese: "指前面提到或对方指示的方式、情况",
        example: {
          thai: "ถ้าเขียนอย่างนั้น คนไทยจะเข้าใจว่าเป็นคำถาม ไม่ใช่คำสั่ง",
          roman: "thaa khiian yaang nan khon thai ja khao-jai waa bpen kham-thaam mai chai kham-sang",
          chinese: "如果那样写，泰国人会理解成问题，而不是命令。",
        },
        tags: ["demonstrative", "manner"],
      },
    ],
    synonyms: [{ thai: "แบบนั้น", roman: "baaep nan", chinese: "那样；那种方式" }],
    antonyms: [{ thai: "อย่างนี้", roman: "yaang nii", chinese: "这样" }],
    comparisons: [
      {
        target: { thai: "อย่างไร", roman: "yaang-rai", chinese: "怎样" },
        distinctionZh: "อย่างนั้น 指已知的那种方式；อย่างไร 问方式。",
      },
    ],
    collocations: [
      { thai: "ทำอย่างนั้น", roman: "tham yaang nan", chinese: "那样做" },
      { thai: "พูดอย่างนั้น", roman: "phuut yaang nan", chinese: "那样说" },
    ],
    tags: ["manner", "demonstrative", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "อย่างนี้",
    id: "yaang-nii",
    roman: "yaang nii",
    chinese: "这样",
    partOfSpeech: "adverb",
    theme: "discourse",
    level: "a1",
    priority: 1076,
    senses: [
      {
        id: "this-way",
        chinese: "指当前展示、正在说明或靠近说话者的方式",
        example: {
          thai: "ออกเสียงอย่างนี้ก่อน แล้วค่อยพูดเร็วขึ้นเมื่อปากเริ่มคุ้น",
          roman: "aawk-siang yaang nii gaawn laaeo khawy phuut reo kheun muea bpaak roem khun",
          chinese: "先这样发音，等嘴巴开始习惯后再说快一点。",
        },
        tags: ["demonstrative", "manner"],
      },
    ],
    synonyms: [{ thai: "แบบนี้", roman: "baaep nii", chinese: "这样；这种方式" }],
    antonyms: [{ thai: "อย่างนั้น", roman: "yaang nan", chinese: "那样" }],
    comparisons: [
      {
        target: { thai: "อย่างไร", roman: "yaang-rai", chinese: "怎样" },
        distinctionZh: "อย่างนี้ 是示范“这样”；อย่างไร 是询问“怎样”。",
      },
    ],
    collocations: [
      { thai: "ทำอย่างนี้", roman: "tham yaang nii", chinese: "这样做" },
      { thai: "เขียนอย่างนี้", roman: "khiian yaang nii", chinese: "这样写" },
    ],
    tags: ["manner", "demonstrative", "a1"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "อย่างน้อย",
    id: "yaang-naawy",
    roman: "yaang naawy",
    chinese: "至少",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a2",
    priority: 1077,
    senses: [
      {
        id: "at-least-minimum",
        chinese: "表示最低数量、最低程度或最低要求",
        example: {
          thai: "ก่อนสอบควรทบทวนคำศัพท์อย่างน้อยวันละยี่สิบคำเป็นเวลาหนึ่งสัปดาห์",
          roman: "gaawn saawp khuuan thop-thuaan kham-sap yaang naawy wan la yii-sip kham bpen wee-laa nueng sap-daa",
          chinese: "考试前应该至少一周每天复习二十个词。",
        },
        tags: ["minimum", "degree"],
      },
    ],
    synonyms: [{ thai: "ไม่น้อยกว่า", roman: "mai naawy gwaa", chinese: "不少于" }],
    antonyms: [{ thai: "อย่างมาก", roman: "yaang maak", chinese: "至多" }],
    comparisons: [
      {
        target: { thai: "อย่างมาก", roman: "yaang maak", chinese: "至多" },
        distinctionZh: "อย่างน้อย 给下限；อย่างมาก 给上限。",
      },
    ],
    collocations: [
      { thai: "อย่างน้อยหนึ่งครั้ง", roman: "yaang naawy nueng khrang", chinese: "至少一次" },
      { thai: "อย่างน้อยสิบนาที", roman: "yaang naawy sip naa-thii", chinese: "至少十分钟" },
    ],
    tags: ["degree", "minimum", "a2"],
    sourceRefs: FREQUENCY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "อย่างมาก",
    id: "yaang-maak",
    roman: "yaang maak",
    chinese: "至多；顶多",
    partOfSpeech: "adverb",
    theme: "degree",
    level: "a2",
    priority: 1078,
    senses: [
      {
        id: "at-most-maximum",
        chinese: "表示最高数量、最高程度或上限",
        example: {
          thai: "แบบฝึกหัดนี้ใช้เวลาอย่างมากสิบห้านาที ถ้าคุณทำทีละข้อ",
          roman: "baaep-fuek-hat nii chai wee-laa yaang maak sip-haa naa-thii thaa khun tham thii-la khaaw",
          chinese: "这个练习至多花十五分钟，如果你一题一题做。",
        },
        tags: ["maximum", "degree"],
      },
    ],
    synonyms: [{ thai: "ไม่เกิน", roman: "mai goen", chinese: "不超过" }],
    antonyms: [{ thai: "อย่างน้อย", roman: "yaang naawy", chinese: "至少" }],
    comparisons: [
      {
        target: { thai: "ประมาณ", roman: "bpra-maan", chinese: "大约" },
        distinctionZh: "อย่างมาก 是上限；ประมาณ 是估算值。",
      },
    ],
    collocations: [
      { thai: "อย่างมากสองครั้ง", roman: "yaang maak saawng khrang", chinese: "最多两次" },
      { thai: "อย่างมากหนึ่งชั่วโมง", roman: "yaang maak nueng chua-moong", chinese: "最多一小时" },
    ],
    tags: ["degree", "maximum", "a2"],
    sourceRefs: FREQUENCY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "ก็ได้",
    id: "gaw-dai",
    roman: "gaw dai",
    chinese: "也可以；都行",
    partOfSpeech: "chunk",
    theme: "discourse",
    level: "a1",
    priority: 1079,
    senses: [
      {
        id: "acceptable-option",
        chinese: "表示某个选择可以接受，也可表达“随便，都行”。",
        example: {
          thai: "ถ้าร้านนี้คนเยอะ เราไปร้านข้าง ๆ ก็ได้ ไม่ต้องรอนาน",
          roman: "thaa raan nii khon yuh rao bpai raan khaang khaang gaw dai mai dtawng raaw naan",
          chinese: "如果这家店人多，我们去旁边那家也可以，不用等很久。",
        },
        tags: ["option", "acceptance"],
      },
    ],
    synonyms: [{ thai: "ได้เหมือนกัน", roman: "dai muean gan", chinese: "也可以" }],
    antonyms: [{ thai: "ไม่ได้", roman: "mai dai", chinese: "不可以" }],
    comparisons: [
      {
        target: { thai: "ได้", roman: "dai", chinese: "可以" },
        distinctionZh: "ได้ 表示能/可以；ก็ได้ 更像“也行、这样也可以”。",
      },
    ],
    collocations: [
      { thai: "อะไรก็ได้", roman: "arai gaw dai", chinese: "什么都可以" },
      { thai: "ไปก็ได้", roman: "bpai gaw dai", chinese: "去也可以" },
    ],
    tags: ["chunk", "option", "a1"],
    sourceRefs: DISCOURSE_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    thai: "อะไรก็ได้",
    id: "arai-gaw-dai",
    roman: "arai gaw dai",
    chinese: "什么都可以；随便",
    partOfSpeech: "chunk",
    theme: "discourse",
    level: "a1",
    priority: 1080,
    senses: [
      {
        id: "anything-is-fine",
        chinese: "表示不挑选、任何选择都能接受",
        example: {
          thai: "มื้อเที่ยงกินอะไรก็ได้ ขอแค่ร้านไม่ไกลและราคาไม่แพงมาก",
          roman: "mue thiiang gin arai gaw dai khaaw khaae raan mai glai lae raa-khaa mai phaaeng maak",
          chinese: "午饭吃什么都可以，只要店不远而且价格不要太贵。",
        },
        tags: ["indefinite", "preference"],
      },
    ],
    synonyms: [{ thai: "แล้วแต่", roman: "laaeo dtaae", chinese: "随便；看情况" }],
    antonyms: [{ thai: "ต้องการเฉพาะ", roman: "dtawng-gaan cha-phaw", chinese: "只要特定的" }],
    comparisons: [
      {
        target: { thai: "อะไร", roman: "arai", chinese: "什么" },
        distinctionZh: "อะไร 是疑问词“什么”；อะไรก็ได้ 是固定块“什么都可以”。",
      },
    ],
    collocations: [
      { thai: "กินอะไรก็ได้", roman: "gin arai gaw dai", chinese: "吃什么都行" },
      { thai: "เลือกอะไรก็ได้", roman: "leuuak arai gaw dai", chinese: "选什么都行" },
    ],
    tags: ["chunk", "indefinite", "a1"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "candidate-draft",
  },
] satisfies VocabularyExpansionCandidate[];
