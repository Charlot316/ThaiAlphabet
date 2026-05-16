import type { VocabularyEnrichment } from "./types";

const CORE_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];
const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar"];
const QUESTION_REFS = ["thai-reference-questions", "complete-thai-a1"];

export const VOCABULARY_ENRICHMENT_BEGINNER_02 = [
  {
    id: "enrich-beginner-02-chaawp",
    vocabularyId: "chaawp",
    thai: "ชอบ",
    roman: "chaawp",
    chinese: "喜欢",
    english: "like",
    senses: [
      {
        id: "like-preference",
        chinese: "喜欢；对人、物、活动有偏好",
        english: "to like; to have a preference for a person, thing, or activity",
        register: "neutral",
        examples: [
          {
            thai: "ฉันชอบเรียนภาษาไทยเพราะเสียงวรรณยุกต์ทำให้ประโยคสั้น ๆ มีความหมายต่างกัน",
            roman: "chan chaawp riian phaa-saa thai phraw siang wan-na-yuk tham-hai bpra-yook san san mii khwaam-maai dtaang gan",
            chinese: "我喜欢学泰语，因为声调会让短句有不同的意思。",
            english: "I like studying Thai because tones make short sentences carry different meanings.",
            grammarIds: ["want-like-preference", "conjunction-contrast-reason", "causative-tham-hai", "reduplication"],
          },
        ],
        synonyms: [
          { thai: "ถูกใจ", roman: "thuuk-jai", chinese: "合心意；喜欢", notesZh: "强调“正合我意”。" },
          { thai: "รัก", roman: "rak", chinese: "爱", notesZh: "感情更强。" },
        ],
        antonyms: [
          { thai: "ไม่ชอบ", roman: "mai chaawp", chinese: "不喜欢" },
          { thai: "เกลียด", roman: "gliiat", chinese: "讨厌；恨" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "รัก", roman: "rak", chinese: "爱" },
            distinctionZh: "ชอบ 是一般喜欢；รัก 情感强度高，常用于亲密关系、家人或非常热爱的事物。",
          },
        ],
        collocations: [
          { thai: "ชอบกิน", roman: "chaawp gin", chinese: "喜欢吃" },
          { thai: "ชอบมาก", roman: "chaawp maak", chinese: "很喜欢" },
          { thai: "ไม่ค่อยชอบ", roman: "mai khaawy chaawp", chinese: "不太喜欢" },
        ],
        grammarIds: ["want-like-preference", "degree-basic", "degree-negatives"],
        tags: ["preference", "feeling"],
      },
    ],
    synonyms: [
      { thai: "ถูกใจ", roman: "thuuk-jai", chinese: "合心意" },
      { thai: "รัก", roman: "rak", chinese: "爱" },
    ],
    antonyms: [
      { thai: "ไม่ชอบ", roman: "mai chaawp", chinese: "不喜欢" },
      { thai: "เกลียด", roman: "gliiat", chinese: "讨厌" },
    ],
    comparisons: [],
    registers: ["neutral"],
    collocations: [
      { thai: "ชอบอะไร", roman: "chaawp arai", chinese: "喜欢什么" },
      { thai: "ชอบ...มากกว่า...", roman: "chaawp...maak gwaa...", chinese: "比起……更喜欢……" },
    ],
    learningNotesZh: ["ชอบ 后面可以直接接名词或动词；否定时说 ไม่ชอบ，弱化时说 ไม่ค่อยชอบ。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-ruu",
    vocabularyId: "ruu",
    thai: "รู้",
    roman: "ruu",
    chinese: "知道",
    english: "know",
    senses: [
      {
        id: "know-fact",
        chinese: "知道；掌握某个事实、答案或消息",
        english: "to know a fact, answer, or piece of information",
        register: "neutral",
        examples: [
          {
            thai: "คุณรู้ไหมว่าพรุ่งนี้ครูจะเริ่มบทเรียนใหม่กี่โมง",
            roman: "khun ruu mai waa phrung-nii khruu ja roem bot-riian mai gii moong",
            chinese: "你知道明天老师几点开始新课吗？",
            english: "Do you know what time the teacher will start the new lesson tomorrow?",
            grammarIds: ["yes-no-mai", "complement-waa", "future-ja", "quantity-price-time-questions"],
          },
        ],
        synonyms: [
          { thai: "ทราบ", roman: "saap", chinese: "知道；知悉", notesZh: "更正式礼貌。" },
        ],
        antonyms: [
          { thai: "ไม่รู้", roman: "mai ruu", chinese: "不知道" },
        ],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "ทราบ", roman: "saap", chinese: "知悉" },
            distinctionZh: "รู้ 是普通“知道”；ทราบ 更礼貌正式，常见于服务、商务和公告。",
          },
        ],
        collocations: [
          { thai: "รู้ว่า...", roman: "ruu waa...", chinese: "知道……" },
          { thai: "รู้ไหม", roman: "ruu mai", chinese: "知道吗" },
        ],
        grammarIds: ["speech-cognition-verbs", "complement-waa"],
        tags: ["knowledge"],
      },
      {
        id: "know-person-place",
        chinese: "认识；熟悉某人、地点或事物",
        english: "to know or be familiar with a person, place, or thing",
        register: "neutral",
        examples: [
          {
            thai: "ผมรู้จักร้านขายอาหารไทยใกล้สถานีที่ไม่แพงและคนไม่เยอะ",
            roman: "phom ruu-jak raan khaai aa-haan thai glai sa-thaa-nii thii mai phaaeng lae khon mai yoe",
            chinese: "我认识车站附近一家不贵而且人不多的泰餐店。",
            english: "I know a Thai food shop near the station that is not expensive and not crowded.",
            grammarIds: ["relative-thii", "noun-modifiers-follow", "conjunction-and-with", "negation-mai"],
          },
        ],
        synonyms: [
          { thai: "รู้จัก", roman: "ruu-jak", chinese: "认识；熟悉", notesZh: "用于人、地方、品牌、概念等熟悉对象。" },
        ],
        antonyms: [
          { thai: "ไม่รู้จัก", roman: "mai ruu-jak", chinese: "不认识；不熟悉" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "รู้", roman: "ruu", chinese: "知道" },
            distinctionZh: "รู้ว่า... 接事实；รู้จัก 接人、地点、品牌或可被熟悉的对象。",
          },
        ],
        collocations: [
          { thai: "รู้จักคน", roman: "ruu-jak khon", chinese: "认识人" },
          { thai: "รู้จักที่นี่", roman: "ruu-jak thii nii", chinese: "熟悉这里" },
        ],
        grammarIds: ["verb-transitivity-transitive", "relative-thii"],
        tags: ["familiarity"],
      },
    ],
    synonyms: [
      { thai: "ทราบ", roman: "saap", chinese: "知道；知悉" },
      { thai: "รู้จัก", roman: "ruu-jak", chinese: "认识；熟悉" },
    ],
    antonyms: [
      { thai: "ไม่รู้", roman: "mai ruu", chinese: "不知道" },
      { thai: "ไม่รู้จัก", roman: "mai ruu-jak", chinese: "不认识" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "khao-jai", thai: "เข้าใจ", roman: "khao-jai", chinese: "理解" },
        distinctionZh: "รู้ 可以只是知道事实；เข้าใจ 表示理解原因、结构或意义。",
      },
    ],
    registers: ["neutral", "business-formal"],
    collocations: [
      { thai: "รู้แล้ว", roman: "ruu laaeo", chinese: "知道了" },
      { thai: "ไม่รู้ว่า...", roman: "mai ruu waa...", chinese: "不知道……" },
    ],
    learningNotesZh: ["区分 รู้ว่า...（知道一个事实）和 รู้จัก...（认识/熟悉对象）。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-khao-jai",
    vocabularyId: "khao-jai",
    thai: "เข้าใจ",
    roman: "khao-jai",
    chinese: "理解；懂",
    english: "understand",
    senses: [
      {
        id: "understand-meaning",
        chinese: "理解；听懂或看懂意思、规则、原因",
        english: "to understand a meaning, rule, explanation, or reason",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าไม่เข้าใจประโยคนี้ คุณถามครูอีกครั้งได้โดยไม่ต้องกลัวผิด",
            roman: "thaa mai khao-jai bpra-yook nii, khun thaam khruu iik khrang dai dooi mai dtawng glua phit",
            chinese: "如果不懂这个句子，你可以再问老师一次，不必怕错。",
            english: "If you do not understand this sentence, you can ask the teacher again without being afraid of making a mistake.",
            grammarIds: ["condition-time-clauses", "demonstratives-nii-nan-noon", "modal-dai-samart", "modal-need-should"],
          },
        ],
        synonyms: [
          { thai: "รู้เรื่อง", roman: "ruu-rueang", chinese: "听懂；明白", notesZh: "偏口语，常用于听懂对方讲的内容。" },
        ],
        antonyms: [
          { thai: "ไม่เข้าใจ", roman: "mai khao-jai", chinese: "不懂；不理解" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { vocabularyId: "ruu", thai: "รู้", roman: "ruu", chinese: "知道" },
            distinctionZh: "รู้ 是知道信息；เข้าใจ 是把信息的意义、关系或原因想明白。",
          },
        ],
        collocations: [
          { thai: "เข้าใจไหม", roman: "khao-jai mai", chinese: "明白吗" },
          { thai: "เข้าใจว่า...", roman: "khao-jai waa...", chinese: "理解为；以为……" },
        ],
        grammarIds: ["speech-cognition-verbs", "yes-no-mai", "complement-waa"],
        tags: ["classroom", "cognition"],
      },
    ],
    synonyms: [
      { thai: "รู้เรื่อง", roman: "ruu-rueang", chinese: "明白；听懂" },
    ],
    antonyms: [
      { thai: "ไม่เข้าใจ", roman: "mai khao-jai", chinese: "不懂；不理解" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "ruu", thai: "รู้", roman: "ruu", chinese: "知道" },
        distinctionZh: "รู้คำตอบ 是知道答案；เข้าใจคำตอบ 是理解答案为什么成立。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "เข้าใจแล้ว", roman: "khao-jai laaeo", chinese: "明白了" },
      { thai: "ยังไม่เข้าใจ", roman: "yang mai khao-jai", chinese: "还不明白" },
    ],
    learningNotesZh: ["课堂求助时 ไม่เข้าใจ 很自然；加 ครับ/ค่ะ 会更礼貌。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-phuut",
    vocabularyId: "phuut",
    thai: "พูด",
    roman: "phuut",
    chinese: "说",
    english: "speak",
    senses: [
      {
        id: "speak-language",
        chinese: "说；讲某种语言",
        english: "to speak a language",
        register: "neutral",
        examples: [
          {
            thai: "ตอนนี้ฉันพูดภาษาไทยได้นิดหน่อย แต่ยังฟังข่าวเร็ว ๆ ไม่ค่อยทัน",
            roman: "dtaawn-nii chan phuut phaa-saa thai dai nit-naawy, dtaae yang fang khaao reo reo mai khaawy than",
            chinese: "现在我会说一点泰语，但听很快的新闻还不太跟得上。",
            english: "I can speak a little Thai now, but I still cannot really keep up with fast news.",
            grammarIds: ["time-words-context", "modal-dai-samart", "degree-negatives", "reduplication"],
          },
        ],
        synonyms: [
          { thai: "กล่าว", roman: "glaao", chinese: "说；陈述", notesZh: "较正式。" },
        ],
        antonyms: [
          { thai: "เงียบ", roman: "ngiiap", chinese: "安静；不说话" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "fang", thai: "ฟัง", roman: "fang", chinese: "听" },
            distinctionZh: "พูด 是输出语言；ฟัง 是接收声音或语言内容。",
          },
        ],
        collocations: [
          { thai: "พูดภาษาไทย", roman: "phuut phaa-saa thai", chinese: "说泰语" },
          { thai: "พูดได้", roman: "phuut dai", chinese: "会说；能说" },
        ],
        grammarIds: ["modal-dai-samart", "speech-cognition-verbs"],
        tags: ["language", "classroom"],
      },
      {
        id: "say-tell",
        chinese: "说；表达某句话、意见或内容",
        english: "to say or express words, an opinion, or content",
        register: "neutral",
        examples: [
          {
            thai: "ครูพูดว่าให้ทุกคนอ่านตัวอย่างก่อน แล้วค่อยเขียนประโยคของตัวเอง",
            roman: "khruu phuut waa hai thuk khon aan dtua-yaang gaawn, laaeo khaawy khiian bpra-yook khaawng dtua-eeng",
            chinese: "老师说让大家先读例句，然后再写自己的句子。",
            english: "The teacher said that everyone should read the example first, then write their own sentences.",
            grammarIds: ["complement-waa", "hai-inducive", "ordinal-sequence", "possession-khaawng"],
          },
        ],
        synonyms: [
          { thai: "บอก", roman: "baawk", chinese: "告诉；说给某人听" },
        ],
        antonyms: [
          { thai: "ปิดบัง", roman: "bpit-bang", chinese: "隐瞒" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "บอก", roman: "baawk", chinese: "告诉" },
            distinctionZh: "พูด 强调说话这个动作或内容；บอก 强调把信息告诉对方。",
          },
        ],
        collocations: [
          { thai: "พูดว่า...", roman: "phuut waa...", chinese: "说……" },
          { thai: "พูดความจริง", roman: "phuut khwaam-jing", chinese: "说实话" },
        ],
        grammarIds: ["complement-waa", "postposed-speech-verb"],
        tags: ["speech"],
      },
    ],
    synonyms: [
      { thai: "กล่าว", roman: "glaao", chinese: "说；陈述" },
      { thai: "บอก", roman: "baawk", chinese: "告诉" },
    ],
    antonyms: [
      { thai: "เงียบ", roman: "ngiiap", chinese: "安静；不说话" },
    ],
    comparisons: [],
    registers: ["neutral", "business-formal"],
    collocations: [
      { thai: "พูดช้า ๆ", roman: "phuut chaa chaa", chinese: "说慢一点" },
      { thai: "พูดกับ...", roman: "phuut gap...", chinese: "和……说话" },
    ],
    learningNotesZh: ["พูด 接语言表示“说某语言”；พูดว่า... 引出具体话语。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-duu",
    vocabularyId: "duu",
    thai: "ดู",
    roman: "duu",
    chinese: "看",
    english: "look; watch",
    senses: [
      {
        id: "look-watch",
        chinese: "看；观看；把注意力放在视觉对象上",
        english: "to look at or watch something",
        register: "neutral",
        examples: [
          {
            thai: "หลังเลิกเรียน เราจะดูวิดีโอสั้น ๆ แล้วจดคำใหม่ที่ได้ยินลงในสมุด",
            roman: "lang loek riian, rao ja duu wi-dii-oo san san laaeo jot kham mai thii dai-yin long nai sa-mut",
            chinese: "下课后，我们会看短视频，然后把听到的新词记在本子里。",
            english: "After class, we will watch short videos and write the new words we hear in a notebook.",
            grammarIds: ["adverbial-clauses-temporal", "future-ja", "relative-thii", "serial-verbs-basic"],
          },
        ],
        synonyms: [
          { vocabularyId: "hen", thai: "เห็น", roman: "hen", chinese: "看见", notesZh: "强调结果：视觉上看到了。" },
          { thai: "ชม", roman: "chom", chinese: "观看；欣赏", notesZh: "更正式或更有欣赏意味。" },
        ],
        antonyms: [
          { thai: "หลับตา", roman: "lap dtaa", chinese: "闭眼" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { vocabularyId: "hen", thai: "เห็น", roman: "hen", chinese: "看见" },
            distinctionZh: "ดู 是主动看；เห็น 是已经看见、看到结果。",
          },
        ],
        collocations: [
          { thai: "ดูหนัง", roman: "duu nang", chinese: "看电影" },
          { thai: "ดูรูป", roman: "duu ruup", chinese: "看照片" },
          { thai: "ดูอีกที", roman: "duu iik thii", chinese: "再看一次" },
        ],
        grammarIds: ["verb-transitivity-transitive", "serial-verbs-basic"],
        tags: ["perception", "daily-action"],
      },
      {
        id: "seem-appear",
        chinese: "看起来；显得",
        english: "to seem or appear",
        register: "neutral",
        examples: [
          {
            thai: "แบบฝึกหัดนี้ดูยากตอนแรก แต่ถ้าแบ่งเป็นส่วนเล็ก ๆ จะทำได้ง่ายขึ้น",
            roman: "baaep-fuek-hat nii duu yaak dtaawn raaek, dtaae thaa baeng bpen suan lek lek, ja tham dai ngaai kheun",
            chinese: "这个练习一开始看起来难，但如果分成小部分，就会更容易做出来。",
            english: "This exercise looks difficult at first, but if you divide it into small parts, it will become easier to do.",
            grammarIds: ["demonstratives-nii-nan-noon", "condition-time-clauses", "future-ja", "comparison-gwaa"],
          },
        ],
        synonyms: [
          { thai: "ดูเหมือน", roman: "duu muean", chinese: "看起来像；似乎" },
        ],
        antonyms: [
          { thai: "ไม่เหมือน", roman: "mai muean", chinese: "不像" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "เหมือน", roman: "muean", chinese: "像" },
            distinctionZh: "ดู + 形容词 表示主观印象；เหมือน 更强调两者相似。",
          },
        ],
        collocations: [
          { thai: "ดูดี", roman: "duu dii", chinese: "看起来好；好看" },
          { thai: "ดูเหมือนว่า...", roman: "duu muean waa...", chinese: "看起来像是……" },
        ],
        grammarIds: ["adjectives-as-verbs", "complement-waa"],
        tags: ["appearance", "judgment"],
      },
    ],
    synonyms: [
      { thai: "ชม", roman: "chom", chinese: "观看；欣赏" },
      { thai: "ดูเหมือน", roman: "duu muean", chinese: "看起来像" },
    ],
    antonyms: [
      { thai: "หลับตา", roman: "lap dtaa", chinese: "闭眼" },
      { thai: "ไม่เหมือน", roman: "mai muean", chinese: "不像" },
    ],
    comparisons: [
      {
        kind: "near-synonym",
        target: { vocabularyId: "hen", thai: "เห็น", roman: "hen", chinese: "看见" },
        distinctionZh: "ดู 是动作；เห็น 是视觉结果。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ลองดู", roman: "laawng duu", chinese: "试试看" },
      { thai: "ดูเหมือน", roman: "duu muean", chinese: "看起来像" },
    ],
    learningNotesZh: ["ดู 不只表示“看”，也常放在形容词前表示“看起来……”。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-chai-use",
    vocabularyId: "chai-use",
    thai: "ใช้",
    roman: "chai",
    chinese: "使用",
    english: "use",
    senses: [
      {
        id: "use-tool-method",
        chinese: "使用；运用工具、语言、方法或资源",
        english: "to use a tool, language, method, or resource",
        register: "neutral",
        examples: [
          {
            thai: "เวลาอ่านคำใหม่ ฉันใช้พจนานุกรมก่อน แล้วค่อยถามครูถ้ายังไม่เข้าใจ",
            roman: "wee-laa aan kham mai, chan chai phot-ja-naa-nu-grom gaawn, laaeo khaawy thaam khruu thaa yang mai khao-jai",
            chinese: "读新词时，我先用词典，然后如果还不懂再问老师。",
            english: "When reading a new word, I use a dictionary first, then ask the teacher if I still do not understand.",
            grammarIds: ["condition-time-clauses", "ordinal-sequence", "negation-yang-mai-mai-khoei"],
          },
        ],
        synonyms: [
          { thai: "ใช้งาน", roman: "chai-ngaan", chinese: "操作；使用", notesZh: "常用于工具、设备、软件。" },
        ],
        antonyms: [
          { thai: "เลิกใช้", roman: "loek chai", chinese: "停止使用" },
        ],
        comparisons: [
          {
            kind: "confusable",
            target: { vocabularyId: "chai", thai: "ใช่", roman: "chai", chinese: "是；对" },
            distinctionZh: "ใช้（使用）和 ใช่（是/对）读音相近但拼写和意思不同。",
          },
        ],
        collocations: [
          { thai: "ใช้เงิน", roman: "chai ngoen", chinese: "花钱；用钱" },
          { thai: "ใช้ภาษาไทย", roman: "chai phaa-saa thai", chinese: "使用泰语" },
          { thai: "ใช้เวลา", roman: "chai wee-laa", chinese: "花时间" },
        ],
        grammarIds: ["verb-transitivity-transitive", "condition-time-clauses"],
        tags: ["daily-action", "tool"],
      },
      {
        id: "spend-time-money",
        chinese: "花费；用掉时间、钱或精力",
        english: "to spend time, money, or effort",
        register: "neutral",
        examples: [
          {
            thai: "การเดินทางจากบ้านไปโรงเรียนใช้เวลาประมาณสี่สิบนาที ถ้ารถไม่ติด",
            roman: "gaan doen-thaang jaak baan bpai roong-riian chai wee-laa bpra-maan sii-sip naa-thii thaa rot mai dtit",
            chinese: "从家到学校大约花四十分钟，如果不堵车的话。",
            english: "Traveling from home to school takes about forty minutes if there is no traffic.",
            grammarIds: ["nominalization-gaan-khwaam", "motion-direction-verbs", "condition-time-clauses", "negation-mai"],
          },
        ],
        synonyms: [
          { thai: "เสียเวลา", roman: "sia wee-laa", chinese: "花时间；耽误时间", notesZh: "常带负面语气。" },
        ],
        antonyms: [
          { thai: "ประหยัด", roman: "bpra-yat", chinese: "节省" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "เสีย", roman: "sia", chinese: "花费；损失" },
            distinctionZh: "ใช้เวลา 是中性“用时”；เสียเวลา 常有浪费或耽误的感觉。",
          },
        ],
        collocations: [
          { thai: "ใช้เวลานาน", roman: "chai wee-laa naan", chinese: "花很久" },
          { thai: "ใช้เงินเยอะ", roman: "chai ngoen yoe", chinese: "花很多钱" },
        ],
        grammarIds: ["nominalization-gaan-khwaam", "degree-basic"],
        tags: ["time", "money"],
      },
    ],
    synonyms: [
      { thai: "ใช้งาน", roman: "chai-ngaan", chinese: "操作；使用" },
      { thai: "เสีย", roman: "sia", chinese: "花费；损失" },
    ],
    antonyms: [
      { thai: "เลิกใช้", roman: "loek chai", chinese: "停止使用" },
      { thai: "ประหยัด", roman: "bpra-yat", chinese: "节省" },
    ],
    comparisons: [
      {
        kind: "homophone",
        target: { vocabularyId: "chai", thai: "ใช่", roman: "chai", chinese: "是；对" },
        distinctionZh: "ใช้ = 使用；ใช่ = 是/对。写作时不要混。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ใช้ได้", roman: "chai dai", chinese: "可以用；还不错" },
      { thai: "ใช้ไม่เป็น", roman: "chai mai bpen", chinese: "不会用" },
    ],
    learningNotesZh: ["ใช้ 可表示“使用”，也常表示“花费时间/钱”。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-hen",
    vocabularyId: "hen",
    thai: "เห็น",
    roman: "hen",
    chinese: "看见",
    english: "see",
    senses: [
      {
        id: "see-perceive",
        chinese: "看见；视觉上注意到某人、某物或事件",
        english: "to see or visually perceive someone, something, or an event",
        register: "neutral",
        examples: [
          {
            thai: "เมื่อเช้าฉันเห็นป้ายใหม่หน้าตลาด แต่ยังไม่ได้อ่านรายละเอียดข้างใน",
            roman: "muea-chaao chan hen bpaai mai naa dta-laat, dtaae yang mai dai aan raai-la-iiat khaang nai",
            chinese: "今天早上我看见市场前的新标牌，但还没有读里面的细节。",
            english: "This morning I saw the new sign in front of the market, but I have not read the details inside yet.",
            grammarIds: ["time-words-context", "location-prepositions", "negation-yang-mai-mai-khoei", "completion-laaeo"],
          },
        ],
        synonyms: [
          { thai: "มองเห็น", roman: "maawng-hen", chinese: "看得见", notesZh: "强调视觉能力或可见性。" },
        ],
        antonyms: [
          { thai: "ไม่เห็น", roman: "mai hen", chinese: "没看见" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { vocabularyId: "duu", thai: "ดู", roman: "duu", chinese: "看" },
            distinctionZh: "ดู 是主动看；เห็น 是已经看见、注意到。",
          },
        ],
        collocations: [
          { thai: "เห็นไหม", roman: "hen mai", chinese: "看见了吗" },
          { thai: "มองเห็น", roman: "maawng-hen", chinese: "看得见" },
        ],
        grammarIds: ["verb-transitivity-transitive", "yes-no-mai"],
        tags: ["perception"],
      },
      {
        id: "think-opinion",
        chinese: "认为；看法是，常用于 เห็นว่า",
        english: "to think or hold an opinion, often in เห็นว่า",
        register: "neutral",
        examples: [
          {
            thai: "หลายคนเห็นว่าบทเรียนนี้ยากเกินไป ครูจึงเพิ่มตัวอย่างที่ใช้ในชีวิตจริง",
            roman: "laai khon hen waa bot-riian nii yaak goen bpai, khruu jeung phoem dtua-yaang thii chai nai chii-wit jing",
            chinese: "很多人认为这一课太难，所以老师增加了现实生活中的例子。",
            english: "Many people think this lesson is too difficult, so the teacher added examples used in real life.",
            grammarIds: ["complement-waa", "demonstratives-nii-nan-noon", "relative-thii", "conjunction-contrast-reason"],
          },
        ],
        synonyms: [
          { thai: "คิดว่า", roman: "khit waa", chinese: "认为；觉得" },
        ],
        antonyms: [
          { thai: "ไม่เห็นด้วย", roman: "mai hen duai", chinese: "不同意" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "คิดว่า", roman: "khit waa", chinese: "认为" },
            distinctionZh: "เห็นว่า 偏“看法/意见”；คิดว่า 更普通，也可表示猜测。",
          },
        ],
        collocations: [
          { thai: "เห็นว่า...", roman: "hen waa...", chinese: "认为……" },
          { thai: "เห็นด้วย", roman: "hen duai", chinese: "同意" },
        ],
        grammarIds: ["complement-waa", "speech-cognition-verbs"],
        tags: ["opinion"],
      },
    ],
    synonyms: [
      { thai: "มองเห็น", roman: "maawng-hen", chinese: "看得见" },
      { thai: "คิดว่า", roman: "khit waa", chinese: "认为" },
    ],
    antonyms: [
      { thai: "ไม่เห็น", roman: "mai hen", chinese: "没看见" },
      { thai: "ไม่เห็นด้วย", roman: "mai hen duai", chinese: "不同意" },
    ],
    comparisons: [
      {
        kind: "near-synonym",
        target: { vocabularyId: "duu", thai: "ดู", roman: "duu", chinese: "看" },
        distinctionZh: "ดู 是看这个动作；เห็น 是看到的结果，也可引申为看法。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "เห็นด้วย", roman: "hen duai", chinese: "同意" },
      { thai: "เห็นต่าง", roman: "hen dtaang", chinese: "意见不同" },
    ],
    learningNotesZh: ["เห็น 有“看见”和“认为”两个常见义项；เห็นด้วย 是固定搭配“同意”。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-yaak",
    vocabularyId: "yaak",
    thai: "อยาก",
    roman: "yaak",
    chinese: "想要",
    english: "want to",
    senses: [
      {
        id: "want-to-do",
        chinese: "想；想要做某事",
        english: "to want to do something",
        register: "neutral",
        examples: [
          {
            thai: "สุดสัปดาห์นี้ผมอยากไปตลาดกับเพื่อน เพื่อซื้อผลไม้ที่ยังไม่เคยกิน",
            roman: "sut-sap-daa nii phom yaak bpai dta-laat gap phuean phuea sue phon-la-maai thii yang mai khoei gin",
            chinese: "这个周末我想和朋友去市场，为了买还没吃过的水果。",
            english: "This weekend I want to go to the market with a friend to buy fruit I have not tried before.",
            grammarIds: ["demonstratives-temporal", "motion-direction-verbs", "purpose-phuea", "negation-yang-mai-mai-khoei"],
          },
        ],
        synonyms: [
          { thai: "ต้องการ", roman: "dtawng-gaan", chinese: "需要；想要", notesZh: "更正式，也可接名词。" },
        ],
        antonyms: [
          { thai: "ไม่อยาก", roman: "mai yaak", chinese: "不想" },
        ],
        comparisons: [
          {
            kind: "confusable",
            target: { vocabularyId: "yaak-difficult", thai: "ยาก", roman: "yaak", chinese: "难" },
            distinctionZh: "อยาก（想要）和 ยาก（难）同音但拼写不同；อยาก 后面常接动词。",
          },
        ],
        collocations: [
          { thai: "อยากกิน", roman: "yaak gin", chinese: "想吃" },
          { thai: "อยากเรียน", roman: "yaak riian", chinese: "想学" },
          { thai: "อยากได้", roman: "yaak dai", chinese: "想得到；想要某物" },
        ],
        grammarIds: ["want-like-preference", "modal-need-should"],
        tags: ["modal", "desire"],
      },
    ],
    synonyms: [
      { thai: "ต้องการ", roman: "dtawng-gaan", chinese: "需要；想要" },
    ],
    antonyms: [
      { thai: "ไม่อยาก", roman: "mai yaak", chinese: "不想" },
    ],
    comparisons: [
      {
        kind: "homophone",
        target: { vocabularyId: "yaak-difficult", thai: "ยาก", roman: "yaak", chinese: "难" },
        distinctionZh: "อยาก = 想要；ยาก = 难。初学者尤其要看拼写。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "อยากไป", roman: "yaak bpai", chinese: "想去" },
      { thai: "อยากให้...", roman: "yaak hai...", chinese: "希望让……；想要……" },
    ],
    learningNotesZh: ["อยาก 后面通常接动词；想要某物可说 อยากได้ + 名词。"],
    sourceRefs: [...GRAMMAR_REFS, ...CORE_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-dtawng",
    vocabularyId: "dtawng",
    thai: "ต้อง",
    roman: "dtawng",
    chinese: "必须；要",
    english: "must; need to",
    senses: [
      {
        id: "must-need",
        chinese: "必须；需要；表示义务、规则或实际必要",
        english: "must; need to; to express obligation, rules, or practical necessity",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าจะสมัครเรียนออนไลน์ คุณต้องกรอกชื่อและอีเมลให้ถูกก่อนส่งแบบฟอร์ม",
            roman: "thaa ja sa-mak riian awn-lai, khun dtawng graawk chue lae ii-meel hai thuuk gaawn song baaep-faawm",
            chinese: "如果要报名线上课，你必须在提交表格前把姓名和邮箱填正确。",
            english: "If you are going to enroll in an online class, you must fill in your name and email correctly before submitting the form.",
            grammarIds: ["condition-time-clauses", "future-ja", "modal-need-should", "hai-adverbial"],
          },
        ],
        synonyms: [
          { thai: "จำเป็นต้อง", roman: "jam-bpen dtawng", chinese: "有必要必须", notesZh: "更正式、更强调必要性。" },
          { thai: "ควร", roman: "khuuan", chinese: "应该", notesZh: "语气比 ต้อง 弱。" },
        ],
        antonyms: [
          { thai: "ไม่ต้อง", roman: "mai dtawng", chinese: "不用；不必" },
          { thai: "ห้าม", roman: "haam", chinese: "禁止", notesZh: "不是“不必须”，而是“不准”。" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ควร", roman: "khuuan", chinese: "应该" },
            distinctionZh: "ต้อง 是必须；ควร 是建议或道义上的应该，强制性较弱。",
          },
        ],
        collocations: [
          { thai: "ต้องไป", roman: "dtawng bpai", chinese: "必须去" },
          { thai: "ต้องทำ", roman: "dtawng tham", chinese: "必须做" },
          { thai: "ไม่ต้องกลัว", roman: "mai dtawng glua", chinese: "不用怕" },
        ],
        grammarIds: ["modal-need-should", "prohibition-yaa-mai-tong"],
        tags: ["modal", "obligation"],
      },
    ],
    synonyms: [
      { thai: "จำเป็นต้อง", roman: "jam-bpen dtawng", chinese: "必须；有必要" },
      { thai: "ควร", roman: "khuuan", chinese: "应该" },
    ],
    antonyms: [
      { thai: "ไม่ต้อง", roman: "mai dtawng", chinese: "不用；不必" },
      { thai: "ห้าม", roman: "haam", chinese: "禁止" },
    ],
    comparisons: [],
    registers: ["neutral"],
    collocations: [
      { thai: "ต้องการ", roman: "dtawng-gaan", chinese: "需要；想要", notesZh: "这是另一个词，不等于 ต้อง + การ 的普通组合。" },
      { thai: "ต้องใช้เวลา", roman: "dtawng chai wee-laa", chinese: "需要花时间" },
    ],
    learningNotesZh: ["否定 ไม่ต้อง 是“不必”，不是“不能”；“不能”通常用 ไม่ได้。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-chuai",
    vocabularyId: "chuai",
    thai: "ช่วย",
    roman: "chuai",
    chinese: "帮助；请帮忙",
    english: "help; please",
    senses: [
      {
        id: "help-assist",
        chinese: "帮助；协助某人完成事情",
        english: "to help or assist someone",
        register: "neutral",
        examples: [
          {
            thai: "เพื่อนช่วยฉันแก้ประโยคที่เขียนผิด แล้วอธิบายว่าทำไมต้องเปลี่ยนลำดับคำ",
            roman: "phuean chuai chan gaae bpra-yook thii khiian phit, laaeo a-thi-baai waa tham-mai dtawng bplian lam-dap kham",
            chinese: "朋友帮我修改写错的句子，然后解释为什么必须改变词序。",
            english: "My friend helped me correct the sentence I wrote incorrectly and explained why the word order had to change.",
            grammarIds: ["relative-thii", "complement-waa", "wh-questions", "modal-need-should"],
          },
        ],
        synonyms: [
          { thai: "ช่วยเหลือ", roman: "chuai-luea", chinese: "帮助；援助", notesZh: "更完整，可用于正式或较严重的帮助场景。" },
        ],
        antonyms: [
          { thai: "ขัดขวาง", roman: "khat-khwaang", chinese: "阻碍" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ช่วยเหลือ", roman: "chuai-luea", chinese: "援助" },
            distinctionZh: "ช่วย 是日常“帮”；ช่วยเหลือ 更正式，也可用于救助、援助。",
          },
        ],
        collocations: [
          { thai: "ช่วยฉันหน่อย", roman: "chuai chan naawy", chinese: "帮我一下" },
          { thai: "ช่วยแก้", roman: "chuai gaae", chinese: "帮忙修改" },
        ],
        grammarIds: ["give-help-request", "benefactive-hai"],
        tags: ["help"],
      },
      {
        id: "polite-request",
        chinese: "请；放在动词前构成礼貌请求",
        english: "please; used before a verb to make a polite request",
        register: "polite",
        examples: [
          {
            thai: "ช่วยพูดช้าลงหน่อยได้ไหมครับ ผมเพิ่งเริ่มเรียนและยังฟังไม่ทัน",
            roman: "chuai phuut chaa long naawy dai mai khrap, phom phoeng roem riian lae yang fang mai than",
            chinese: "请您说慢一点可以吗？我刚开始学，还听不太跟得上。",
            english: "Could you please speak a little more slowly? I just started studying and still cannot keep up when listening.",
            grammarIds: ["give-help-request", "yes-no-mai", "recent-just-pheung", "negation-yang-mai-mai-khoei"],
          },
        ],
        synonyms: [
          { thai: "กรุณา", roman: "ga-ru-naa", chinese: "请", notesZh: "更正式，常见于标示和公告。" },
        ],
        antonyms: [
          { thai: "อย่า", roman: "yaa", chinese: "不要；别" },
        ],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "กรุณา", roman: "ga-ru-naa", chinese: "请" },
            distinctionZh: "ช่วย...หน่อย 日常自然；กรุณา 更正式，适合规则、公告、客服文字。",
          },
        ],
        collocations: [
          { thai: "ช่วย...หน่อย", roman: "chuai...naawy", chinese: "请帮忙……一下" },
          { thai: "ช่วยบอก", roman: "chuai baawk", chinese: "请告诉" },
        ],
        grammarIds: ["give-help-request", "softening-particles-na-si-la", "polite-particles"],
        tags: ["request", "politeness"],
      },
    ],
    synonyms: [
      { thai: "ช่วยเหลือ", roman: "chuai-luea", chinese: "帮助；援助" },
      { thai: "กรุณา", roman: "ga-ru-naa", chinese: "请" },
    ],
    antonyms: [
      { thai: "ขัดขวาง", roman: "khat-khwaang", chinese: "阻碍" },
      { thai: "อย่า", roman: "yaa", chinese: "不要；别" },
    ],
    comparisons: [],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "ช่วยด้วย", roman: "chuai duai", chinese: "救命；帮帮忙" },
      { thai: "ช่วยหน่อย", roman: "chuai naawy", chinese: "帮一下" },
    ],
    learningNotesZh: ["ช่วย 既是“帮助”，也可作为礼貌请求标记；请求时常和 หน่อย、ได้ไหม 连用。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-khaaw-request",
    vocabularyId: "khaaw-request",
    thai: "ขอ",
    roman: "khaaw",
    chinese: "请求；请给我",
    english: "ask for; may I have",
    senses: [
      {
        id: "ask-for-item",
        chinese: "要；请求得到某物或服务",
        english: "to ask for an item or service",
        register: "neutral",
        examples: [
          {
            thai: "ขอน้ำเย็นหนึ่งแก้วได้ไหมคะ เพราะอาหารจานนี้เผ็ดกว่าที่คิด",
            roman: "khaaw naam yen nueng gaaeo dai mai kha, phraw aa-haan jaan nii phet gwaa thii khit",
            chinese: "可以给我一杯冷水吗？因为这盘菜比我想的更辣。",
            english: "May I have one glass of cold water? This dish is spicier than I expected.",
            grammarIds: ["classifiers-basic-counting", "yes-no-mai", "conjunction-contrast-reason", "comparison-gwaa"],
          },
        ],
        synonyms: [
          { thai: "ต้องการ", roman: "dtawng-gaan", chinese: "需要；想要", notesZh: "更直接或正式。" },
        ],
        antonyms: [
          { thai: "ให้", roman: "hai", chinese: "给" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ต้องการ", roman: "dtawng-gaan", chinese: "需要；想要" },
            distinctionZh: "ขอ 是向对方提出请求；ต้องการ 只是表达需求，不一定是在请求对方给。",
          },
        ],
        collocations: [
          { thai: "ขอน้ำ", roman: "khaaw naam", chinese: "请给水" },
          { thai: "ขอใบเสร็จ", roman: "khaaw bai-set", chinese: "要收据" },
        ],
        grammarIds: ["give-help-request", "yes-no-mai"],
        tags: ["request", "shopping"],
      },
      {
        id: "ask-permission",
        chinese: "请允许；请求许可做某事",
        english: "to ask permission to do something",
        register: "polite",
        examples: [
          {
            thai: "ขอถ่ายรูปป้ายนี้ได้ไหมครับ ผมอยากเก็บไว้ทบทวนคำศัพท์ตอนกลับบ้าน",
            roman: "khaaw thaai-ruup bpaai nii dai mai khrap, phom yaak gep wai thop-thuan kham-sap dtaawn glap baan",
            chinese: "我可以拍一下这个标牌吗？我想留着回家复习词汇。",
            english: "May I take a photo of this sign? I want to keep it to review vocabulary when I get home.",
            grammarIds: ["demonstratives-nii-nan-noon", "yes-no-mai", "want-like-preference", "adverbial-clauses-temporal"],
          },
        ],
        synonyms: [
          { thai: "อนุญาต", roman: "a-nu-yaat", chinese: "允许；许可" },
        ],
        antonyms: [
          { thai: "ห้าม", roman: "haam", chinese: "禁止" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ขออนุญาต", roman: "khaaw a-nu-yaat", chinese: "请求允许" },
            distinctionZh: "ขอ + 动词 是日常请求许可；ขออนุญาต 更完整、更正式。",
          },
        ],
        collocations: [
          { thai: "ขอไป", roman: "khaaw bpai", chinese: "请求去；请允许去" },
          { thai: "ขอถาม", roman: "khaaw thaam", chinese: "请问；请允许问" },
        ],
        grammarIds: ["give-help-request", "modal-dai-samart", "polite-particles"],
        tags: ["permission", "politeness"],
      },
    ],
    synonyms: [
      { thai: "ต้องการ", roman: "dtawng-gaan", chinese: "需要；想要" },
      { thai: "ขออนุญาต", roman: "khaaw a-nu-yaat", chinese: "请求允许" },
    ],
    antonyms: [
      { thai: "ให้", roman: "hai", chinese: "给" },
      { thai: "ห้าม", roman: "haam", chinese: "禁止" },
    ],
    comparisons: [],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "ขอ...หน่อย", roman: "khaaw...naawy", chinese: "请给/请让我……一下" },
      { thai: "ขอได้ไหม", roman: "khaaw dai mai", chinese: "可以要/可以请求吗" },
    ],
    learningNotesZh: ["ขอ 可接名词表示“请给我……”，也可接动词表示“请允许我……”。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-dii",
    vocabularyId: "dii",
    thai: "ดี",
    roman: "dii",
    chinese: "好",
    english: "good",
    senses: [
      {
        id: "good-quality",
        chinese: "好；质量、状态、表现或感受令人满意",
        english: "good; satisfactory in quality, condition, performance, or feeling",
        register: "neutral",
        examples: [
          {
            thai: "หนังสือเล่มนี้ดีมากสำหรับผู้เริ่มเรียน เพราะมีตัวอย่างสั้น ๆ และคำอธิบายชัดเจน",
            roman: "nang-sue lem nii dii maak sam-rap phuu roem riian phraw mii dtua-yaang san san lae kham a-thi-baai chat-jen",
            chinese: "这本书对初学者很好，因为有短例句和清楚的解释。",
            english: "This book is very good for beginners because it has short examples and clear explanations.",
            grammarIds: ["classifiers-specific-reference", "degree-basic", "conjunction-contrast-reason", "reduplication"],
          },
        ],
        synonyms: [
          { thai: "ยอดเยี่ยม", roman: "yaawt-yiiam", chinese: "很棒；优秀", notesZh: "强度更高。" },
          { thai: "ใช้ได้", roman: "chai dai", chinese: "还不错；可用" },
        ],
        antonyms: [
          { vocabularyId: "mai-dii", thai: "ไม่ดี", roman: "mai dii", chinese: "不好" },
          { thai: "แย่", roman: "yaae", chinese: "糟；差" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ใช้ได้", roman: "chai dai", chinese: "还不错" },
            distinctionZh: "ดี 是普通正面评价；ใช้ได้ 更像“可以接受、还行”。",
          },
        ],
        collocations: [
          { thai: "ดีมาก", roman: "dii maak", chinese: "很好" },
          { thai: "ดีขึ้น", roman: "dii kheun", chinese: "变好；好转" },
          { thai: "ดูดี", roman: "duu dii", chinese: "看起来好；好看" },
        ],
        grammarIds: ["adjectives-as-verbs", "degree-basic", "comparison-gwaa"],
        tags: ["adjective", "quality"],
      },
    ],
    synonyms: [
      { thai: "ยอดเยี่ยม", roman: "yaawt-yiiam", chinese: "优秀；很棒" },
      { thai: "ใช้ได้", roman: "chai dai", chinese: "还不错；可用" },
    ],
    antonyms: [
      { vocabularyId: "mai-dii", thai: "ไม่ดี", roman: "mai dii", chinese: "不好" },
      { thai: "แย่", roman: "yaae", chinese: "差；糟" },
    ],
    comparisons: [],
    registers: ["neutral"],
    collocations: [
      { thai: "อากาศดี", roman: "aa-gaat dii", chinese: "天气好" },
      { thai: "พูดได้ดี", roman: "phuut dai dii", chinese: "说得好" },
    ],
    learningNotesZh: ["泰语形容词可直接作谓语；ดีมาก 就是“很好”，不需要“是”。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-thuuk",
    vocabularyId: "thuuk",
    thai: "ถูก",
    roman: "thuuk",
    chinese: "便宜；正确",
    english: "cheap; correct",
    senses: [
      {
        id: "cheap-inexpensive",
        chinese: "便宜；价格低",
        english: "cheap; inexpensive",
        register: "neutral",
        examples: [
          {
            thai: "ร้านตรงมุมถนนขายผลไม้ถูกกว่าตลาดใหญ่ แต่ต้องไปเช้ามากถึงจะได้ของสด",
            roman: "raan dtrong mum tha-non khaai phon-la-maai thuuk gwaa dta-laat yai, dtaae dtawng bpai chaao maak thueng ja dai khaawng sot",
            chinese: "街角那家店卖水果比大市场便宜，但必须很早去才买得到新鲜货。",
            english: "The shop on the street corner sells fruit cheaper than the big market, but you have to go very early to get fresh goods.",
            grammarIds: ["comparison-gwaa", "conjunction-contrast-reason", "modal-need-should", "motion-direction-verbs"],
          },
        ],
        synonyms: [
          { thai: "ราคาถูก", roman: "raa-khaa thuuk", chinese: "价格便宜" },
        ],
        antonyms: [
          { vocabularyId: "phaaeng", thai: "แพง", roman: "phaaeng", chinese: "贵" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "คุ้ม", roman: "khum", chinese: "划算" },
            distinctionZh: "ถูก 只说价格低；คุ้ม 表示花的钱值得，可能不一定便宜。",
          },
        ],
        collocations: [
          { thai: "ราคาถูก", roman: "raa-khaa thuuk", chinese: "价格便宜" },
          { thai: "ถูกกว่า", roman: "thuuk gwaa", chinese: "更便宜" },
        ],
        grammarIds: ["adjectives-as-verbs", "comparison-gwaa"],
        tags: ["shopping", "price"],
      },
      {
        id: "correct-right",
        chinese: "正确；答案、做法或信息是对的",
        english: "correct; right for an answer, method, or piece of information",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าคุณวางวรรณยุกต์ถูก ตำแหน่งเสียงของคำจะเปลี่ยนน้อยลงและอ่านง่ายขึ้น",
            roman: "thaa khun waang wan-na-yuk thuuk, dtam-naeng siang khaawng kham ja bplian naawy long lae aan ngaai kheun",
            chinese: "如果你把声调符号放正确，词的音位变化会更少，也更容易读。",
            english: "If you place the tone mark correctly, the word's sound position changes less and becomes easier to read.",
            grammarIds: ["condition-time-clauses", "possession-khaawng", "future-ja", "comparison-gwaa"],
          },
        ],
        synonyms: [
          { vocabularyId: "chai", thai: "ใช่", roman: "chai", chinese: "对；是" },
          { thai: "ถูกต้อง", roman: "thuuk-dtawng", chinese: "正确", notesZh: "更完整、更正式。" },
        ],
        antonyms: [
          { thai: "ผิด", roman: "phit", chinese: "错" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { vocabularyId: "chai", thai: "ใช่", roman: "chai", chinese: "对；是" },
            distinctionZh: "ใช่ 常作回答“是/对”；ถูก 可评价答案、做法、位置是否正确。",
          },
        ],
        collocations: [
          { thai: "ตอบถูก", roman: "dtaawp thuuk", chinese: "答对" },
          { thai: "ทำถูก", roman: "tham thuuk", chinese: "做对" },
          { thai: "ถูกต้อง", roman: "thuuk-dtawng", chinese: "正确" },
        ],
        grammarIds: ["result-completion-verbs", "adjectives-as-verbs"],
        tags: ["answer", "accuracy"],
      },
    ],
    synonyms: [
      { thai: "ราคาถูก", roman: "raa-khaa thuuk", chinese: "价格便宜" },
      { thai: "ถูกต้อง", roman: "thuuk-dtawng", chinese: "正确" },
    ],
    antonyms: [
      { vocabularyId: "phaaeng", thai: "แพง", roman: "phaaeng", chinese: "贵" },
      { thai: "ผิด", roman: "phit", chinese: "错" },
    ],
    comparisons: [],
    registers: ["neutral"],
    collocations: [
      { thai: "ถูกและดี", roman: "thuuk lae dii", chinese: "又便宜又好" },
      { thai: "ถูกไหม", roman: "thuuk mai", chinese: "对吗；便宜吗" },
    ],
    learningNotesZh: ["ถูก 至少有“便宜”和“正确”两个基础义项；靠语境判断，价格语境多为便宜，答案语境多为正确。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-arai",
    vocabularyId: "arai",
    thai: "อะไร",
    roman: "arai",
    chinese: "什么",
    english: "what",
    senses: [
      {
        id: "what-question",
        chinese: "什么；询问事物、动作、名称或内容",
        english: "what; asks about a thing, action, name, or content",
        register: "neutral",
        examples: [
          {
            thai: "คำนี้แปลว่าอะไร และใช้ในประโยคสุภาพได้ไหม",
            roman: "kham nii bplaae waa arai lae chai nai bpra-yook su-phaap dai mai",
            chinese: "这个词是什么意思？能用在礼貌句子里吗？",
            english: "What does this word mean, and can it be used in a polite sentence?",
            grammarIds: ["demonstratives-nii-nan-noon", "wh-questions", "conjunction-and-with", "yes-no-mai"],
          },
        ],
        synonyms: [
          { thai: "สิ่งใด", roman: "sing dai", chinese: "何物；什么东西", notesZh: "较书面或正式。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "khrai", thai: "ใคร", roman: "khrai", chinese: "谁" },
            distinctionZh: "อะไร 问事物或内容；ใคร 问人。",
          },
        ],
        collocations: [
          { thai: "คืออะไร", roman: "khue arai", chinese: "是什么" },
          { thai: "ทำอะไร", roman: "tham arai", chinese: "做什么" },
          { thai: "ชื่ออะไร", roman: "chue arai", chinese: "叫什么名字" },
        ],
        grammarIds: ["wh-questions", "embedded-questions"],
        tags: ["question-word"],
      },
      {
        id: "anything-indefinite",
        chinese: "什么东西；任何东西，常在否定或不定语境中出现",
        english: "anything; something indefinite, often in negative or non-specific contexts",
        register: "neutral",
        examples: [
          {
            thai: "วันนี้ฉันไม่อยากซื้ออะไรเพิ่ม เพราะที่บ้านยังมีอาหารเหลืออยู่หลายอย่าง",
            roman: "wan-nii chan mai yaak sue arai phoem phraw thii baan yang mii aa-haan luea yuu laai yaang",
            chinese: "今天我不想再买任何东西，因为家里还剩着好几样食物。",
            english: "Today I do not want to buy anything else because there are still several kinds of food left at home.",
            grammarIds: ["time-words-context", "negation-mai", "want-like-preference", "core-have-exist-mii"],
          },
        ],
        synonyms: [
          { thai: "สิ่งใด", roman: "sing dai", chinese: "任何事物", notesZh: "正式语体。" },
        ],
        antonyms: [
          { thai: "ทุกอย่าง", roman: "thuk yaang", chinese: "所有东西" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ทุกอย่าง", roman: "thuk yaang", chinese: "所有东西" },
            distinctionZh: "อะไร 在否定中可表示“任何东西”；ทุกอย่าง 表示完整集合“所有东西”。",
          },
        ],
        collocations: [
          { thai: "ไม่มีอะไร", roman: "mai mii arai", chinese: "没什么；什么都没有" },
          { thai: "อะไรก็ได้", roman: "arai gaw dai", chinese: "什么都可以" },
        ],
        grammarIds: ["indefinite-expressions", "negation-mai-mii"],
        tags: ["indefinite"],
      },
    ],
    synonyms: [
      { thai: "สิ่งใด", roman: "sing dai", chinese: "什么；任何事物" },
    ],
    antonyms: [
      { thai: "ทุกอย่าง", roman: "thuk yaang", chinese: "所有东西" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "khrai", thai: "ใคร", roman: "khrai", chinese: "谁" },
        distinctionZh: "อะไร 问物或内容，ใคร 问人。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "อะไรนะ", roman: "arai na", chinese: "什么？再说一遍？" },
      { thai: "เพราะอะไร", roman: "phraw arai", chinese: "因为什么" },
    ],
    learningNotesZh: ["疑问词在泰语里通常留在原来语义位置，不一定移到句首。"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-thii-nai",
    vocabularyId: "thii-nai",
    thai: "ที่ไหน",
    roman: "thii nai",
    chinese: "哪里",
    english: "where",
    senses: [
      {
        id: "where-location",
        chinese: "哪里；询问位置、地点或目的地",
        english: "where; asks about a location, place, or destination",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าจะไปสถานีรถไฟจากโรงแรมนี้ ต้องขึ้นรถเมล์ที่ไหนและลงป้ายไหน",
            roman: "thaa ja bpai sa-thaa-nii rot-fai jaak roong-raem nii, dtawng kheun rot-mee thii nai lae long bpaai nai",
            chinese: "如果要从这家酒店去火车站，应该在哪里上公交、在哪一站下？",
            english: "If going from this hotel to the train station, where should one get on the bus and at which stop get off?",
            grammarIds: ["condition-time-clauses", "motion-direction-verbs", "modal-need-should", "wh-questions"],
          },
        ],
        synonyms: [
          { thai: "ตรงไหน", roman: "dtrong nai", chinese: "哪里；哪一处", notesZh: "更具体地问位置点。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ตรงไหน", roman: "dtrong nai", chinese: "哪一处" },
            distinctionZh: "ที่ไหน 问地点较宽；ตรงไหน 更像问具体位置、哪一点。",
          },
        ],
        collocations: [
          { thai: "อยู่ที่ไหน", roman: "yuu thii nai", chinese: "在哪里" },
          { thai: "ไปที่ไหน", roman: "bpai thii nai", chinese: "去哪里" },
          { thai: "มาจากที่ไหน", roman: "maa jaak thii nai", chinese: "从哪里来" },
        ],
        grammarIds: ["wh-questions", "core-location-yuu", "location-prepositions", "motion-direction-verbs"],
        tags: ["question-word", "place"],
      },
    ],
    synonyms: [
      { thai: "ตรงไหน", roman: "dtrong nai", chinese: "哪里；哪一处" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "muea-rai", thai: "เมื่อไร", roman: "muea-rai", chinese: "什么时候" },
        distinctionZh: "ที่ไหน 问地点；เมื่อไร 问时间。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ห้องน้ำอยู่ที่ไหน", roman: "haawng-naam yuu thii nai", chinese: "洗手间在哪里" },
      { thai: "เรียนที่ไหน", roman: "riian thii nai", chinese: "在哪里学习" },
    ],
    learningNotesZh: ["问位置常用 อยู่ที่ไหน；问目的地常用 ไปที่ไหน。"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-02-thao-rai",
    vocabularyId: "thao-rai",
    thai: "เท่าไร",
    roman: "thao-rai",
    chinese: "多少；多少钱",
    english: "how much",
    senses: [
      {
        id: "how-much-price",
        chinese: "多少钱；询问价格",
        english: "how much; asks about price",
        register: "neutral",
        examples: [
          {
            thai: "เสื้อตัวนี้ราคาเท่าไรครับ ถ้าซื้อสองตัวลดได้ไหม",
            roman: "suea dtua nii raa-khaa thao-rai khrap, thaa sue saawng dtua lot dai mai",
            chinese: "这件衣服多少钱？如果买两件可以打折吗？",
            english: "How much is this shirt? If I buy two, can you give a discount?",
            grammarIds: ["classifiers-specific-reference", "quantity-price-time-questions", "condition-time-clauses", "yes-no-mai"],
          },
        ],
        synonyms: [
          { thai: "กี่บาท", roman: "gii baat", chinese: "几泰铢；多少钱", notesZh: "价格问题中非常常用。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "กี่บาท", roman: "gii baat", chinese: "几泰铢" },
            distinctionZh: "ราคาเท่าไร 问价格较通用；กี่บาท 明确用泰铢问金额。",
          },
        ],
        collocations: [
          { thai: "ราคาเท่าไร", roman: "raa-khaa thao-rai", chinese: "价格多少" },
          { thai: "ทั้งหมดเท่าไร", roman: "thang-mot thao-rai", chinese: "一共多少" },
        ],
        grammarIds: ["quantity-price-time-questions", "classifiers-basic-counting"],
        tags: ["shopping", "price"],
      },
      {
        id: "how-much-amount-degree",
        chinese: "多少；询问数量、程度或范围",
        english: "how much; asks about amount, degree, or extent",
        register: "neutral",
        examples: [
          {
            thai: "จากบ้านถึงโรงเรียนไกลเท่าไร และปกติใช้เวลาเดินทางกี่นาที",
            roman: "jaak baan thueng roong-riian glai thao-rai lae bpa-ga-dti chai wee-laa doen-thaang gii naa-thii",
            chinese: "从家到学校有多远？平常路上要花几分钟？",
            english: "How far is it from home to school, and how many minutes does the trip usually take?",
            grammarIds: ["location-prepositions", "quantity-price-time-questions", "conjunction-and-with", "adverbs-frequency"],
          },
        ],
        synonyms: [
          { thai: "แค่ไหน", roman: "khaae nai", chinese: "到什么程度；多么" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "กี่", roman: "gii", chinese: "几；多少" },
            distinctionZh: "กี่ 多和可数名词/量词连用；เท่าไร 可问价格、程度或不精确数量。",
          },
        ],
        collocations: [
          { thai: "ไกลเท่าไร", roman: "glai thao-rai", chinese: "多远" },
          { thai: "นานเท่าไร", roman: "naan thao-rai", chinese: "多久" },
        ],
        grammarIds: ["quantity-price-time-questions", "degree-basic"],
        tags: ["amount", "degree"],
      },
    ],
    synonyms: [
      { thai: "กี่บาท", roman: "gii baat", chinese: "多少钱；几泰铢" },
      { thai: "แค่ไหน", roman: "khaae nai", chinese: "多么；到什么程度" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { thai: "กี่", roman: "gii", chinese: "几；多少" },
        distinctionZh: "กี่ 通常需要后接量词或名词；เท่าไร 更适合问价格、程度、总量。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "อายุเท่าไร", roman: "aa-yu thao-rai", chinese: "几岁" },
      { thai: "สูงเท่าไร", roman: "suung thao-rai", chinese: "多高" },
    ],
    learningNotesZh: ["购物时 ราคาเท่าไร 和 ทั้งหมดเท่าไร 都很实用；问可数数量时常用 กี่ + 量词。"],
    sourceRefs: ["thai-reference-questions", "loecsen-thai", "complete-thai-a1"],
    reviewStatus: "human-draft",
  },
] satisfies VocabularyEnrichment[];
