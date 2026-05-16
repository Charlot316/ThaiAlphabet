import type { VocabularyEnrichment } from "./types";

const CORE_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];
const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar"];
const POLITE_REFS = ["thai-reference-polite-particles", "complete-thai-a1"];

export const VOCABULARY_ENRICHMENT_BEGINNER_04 = [
  {
    id: "enrich-beginner-04-dichan",
    vocabularyId: "dichan",
    thai: "ดิฉัน",
    roman: "di-chan",
    chinese: "我（女性正式）",
    english: "I; me (formal female)",
    senses: [
      {
        id: "formal-female-first-person",
        chinese: "我；女性说话者在正式、礼貌或服务场景中的自称",
        english: "I; me, a formal first-person pronoun commonly used by female speakers in polite or service contexts",
        register: "polite",
        examples: [
          {
            thai: "ดิฉันชื่อมาลีค่ะ และวันนี้จะช่วยอธิบายวิธีสมัครเรียนภาษาไทยให้คุณเข้าใจง่ายขึ้น",
            roman: "di-chan chue maa-lii kha, lae wan-nii ja chuai a-thi-baai wi-thii sa-mak riian phaa-saa thai hai khun khao-jai ngaai kheun",
            chinese: "我叫 Mali，今天会帮您解释报名学习泰语的方法，让您更容易理解。",
            english: "My name is Mali, and today I will help explain how to enroll in Thai class so that you can understand more easily.",
            grammarIds: ["polite-particles", "future-ja", "benefactive-hai", "comparison-gwaa"],
          },
        ],
        synonyms: [
          { thai: "ฉัน", roman: "chan", chinese: "我", notesZh: "更日常，在教材和非正式口语中常见。" },
          { thai: "หนู", roman: "nuu", chinese: "我（女性/晚辈）", notesZh: "更亲近或晚辈对长辈说话时常用。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register-pair",
            target: { vocabularyId: "chan", thai: "ฉัน", roman: "chan", chinese: "我" },
            distinctionZh: "ดิฉัน 更正式礼貌，常见于电话、会议、服务介绍；ฉัน 更日常、教材感更强。",
          },
          {
            kind: "register-pair",
            target: { vocabularyId: "phom", thai: "ผม", roman: "phom", chinese: "我（男性常用）" },
            distinctionZh: "ดิฉัน 通常由女性说话者在正式场合使用；ผม 通常由男性说话者使用。",
          },
        ],
        collocations: [
          { thai: "ดิฉันชื่อ...", roman: "di-chan chue...", chinese: "我叫……（女性正式）" },
          { thai: "ดิฉันขอ...", roman: "di-chan khaaw...", chinese: "我想请求/请……（女性正式）" },
        ],
        grammarIds: ["polite-particles", "pronouns-first-person-range", "register-formal-spoken"],
        tags: ["pronoun", "female-speaker", "formal"],
      },
    ],
    synonyms: [
      { vocabularyId: "chan", thai: "ฉัน", roman: "chan", chinese: "我" },
      { vocabularyId: "phom", thai: "ผม", roman: "phom", chinese: "我（男性常用）" },
      { thai: "หนู", roman: "nuu", chinese: "我（女性/晚辈）" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "register-pair",
        target: { vocabularyId: "chan", thai: "ฉัน", roman: "chan", chinese: "我" },
        distinctionZh: "ดิฉัน 比 ฉัน 更正式；初学者如果是女性并需要在商务、电话或服务语境中自称，用 ดิฉัน 很稳妥。",
      },
    ],
    registers: ["polite", "business-formal"],
    collocations: [
      { thai: "ดิฉันไม่เข้าใจค่ะ", roman: "di-chan mai khao-jai kha", chinese: "我不明白（女性正式）" },
      { thai: "ของดิฉัน", roman: "khaawng di-chan", chinese: "我的（女性正式）" },
    ],
    learningNotesZh: ["ดิฉัน 常和 ค่ะ/คะ 搭配，语气正式礼貌；日常和朋友聊天时可能显得距离较远。"],
    sourceRefs: [...CORE_REFS, ...POLITE_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-phaa-saa-thai",
    vocabularyId: "phaa-saa-thai",
    thai: "ภาษาไทย",
    roman: "phaa-saa thai",
    chinese: "泰语",
    english: "Thai language",
    senses: [
      {
        id: "thai-language",
        chinese: "泰语；泰国使用的语言",
        english: "the Thai language; the language used in Thailand",
        register: "neutral",
        examples: [
          {
            thai: "ฉันเรียนภาษาไทยทุกเช้า เพราะอยากอ่านเมนูและคุยกับเพื่อนคนไทยได้เอง",
            roman: "chan riian phaa-saa thai thuk chaao, phraw yaak aan mee-nuu lae khui gap phuean khon thai dai eeng",
            chinese: "我每天早上学泰语，因为想自己看菜单并和泰国朋友聊天。",
            english: "I study Thai every morning because I want to read menus and talk with Thai friends by myself.",
            grammarIds: ["time-words-context", "want-like-preference", "conjunction-and-with", "modal-dai-samart"],
          },
        ],
        synonyms: [
          { thai: "ไทย", roman: "thai", chinese: "泰语；泰国的", notesZh: "口语中可省略 ภาษา，但初学阶段用เต็ม形式更清楚。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { vocabularyId: "phaa-saa-ang-grit", thai: "ภาษาอังกฤษ", roman: "phaa-saa ang-grit", chinese: "英语" },
            distinctionZh: "ภาษาไทย 指泰语；ภาษาอังกฤษ 指英语。两者都用 ภาษา + 语言/国家名 的结构。",
          },
        ],
        collocations: [
          { thai: "เรียนภาษาไทย", roman: "riian phaa-saa thai", chinese: "学泰语" },
          { thai: "พูดภาษาไทย", roman: "phuut phaa-saa thai", chinese: "说泰语" },
          { thai: "หนังสือภาษาไทย", roman: "nang-sue phaa-saa thai", chinese: "泰语书" },
        ],
        grammarIds: ["noun-modifiers-follow", "word-formation-compound-nouns"],
        tags: ["language", "classroom"],
      },
    ],
    synonyms: [{ thai: "ไทย", roman: "thai", chinese: "泰语；泰国的" }],
    antonyms: [],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { thai: "อาหารไทย", roman: "aa-haan thai", chinese: "泰国菜" },
        distinctionZh: "ภาษาไทย 的 ไทย 指语言类别；อาหารไทย 的 ไทย 修饰食物类别，结构都是名词后置修饰。",
      },
    ],
    registers: ["neutral", "academic"],
    collocations: [
      { thai: "ภาษาไทยยากไหม", roman: "phaa-saa thai yaak mai", chinese: "泰语难吗" },
      { thai: "ครูภาษาไทย", roman: "khruu phaa-saa thai", chinese: "泰语老师" },
    ],
    learningNotesZh: ["ภาษา 放在语言名前；说“泰语老师”是 ครูภาษาไทย，不需要中文式的“的”。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-phaa-saa-ang-grit",
    vocabularyId: "phaa-saa-ang-grit",
    thai: "ภาษาอังกฤษ",
    roman: "phaa-saa ang-grit",
    chinese: "英语",
    english: "English language",
    senses: [
      {
        id: "english-language",
        chinese: "英语；英语这种语言",
        english: "the English language",
        register: "neutral",
        examples: [
          {
            thai: "นักเรียนใหม่ยังพูดภาษาไทยไม่เก่ง จึงถามครูเป็นภาษาอังกฤษก่อน",
            roman: "nak-riian mai yang phuut phaa-saa thai mai geng, jeung thaam khruu bpen phaa-saa ang-grit gaawn",
            chinese: "新学生泰语还说得不好，所以先用英语问老师。",
            english: "The new student still does not speak Thai well, so they ask the teacher in English first.",
            grammarIds: ["negation-yang-mai-mai-khoei", "adjectives-as-verbs", "core-be-bpen-khue", "adverbial-clauses-temporal"],
          },
        ],
        synonyms: [
          { thai: "อังกฤษ", roman: "ang-grit", chinese: "英语；英国/英语的", notesZh: "口语可省略 ภาษา；作修饰语时也可指英国或英语相关。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { vocabularyId: "phaa-saa-thai", thai: "ภาษาไทย", roman: "phaa-saa thai", chinese: "泰语" },
            distinctionZh: "ภาษาอังกฤษ 是英语；ภาษาไทย 是泰语。两个词都可接在 พูด/เรียน 后作宾语。",
          },
        ],
        collocations: [
          { thai: "พูดภาษาอังกฤษ", roman: "phuut phaa-saa ang-grit", chinese: "说英语" },
          { thai: "แปลเป็นภาษาอังกฤษ", roman: "bplaae bpen phaa-saa ang-grit", chinese: "翻译成英语" },
          { thai: "คำภาษาอังกฤษ", roman: "kham phaa-saa ang-grit", chinese: "英语词" },
        ],
        grammarIds: ["noun-modifiers-follow", "core-be-bpen-khue"],
        tags: ["language", "classroom"],
      },
    ],
    synonyms: [{ thai: "อังกฤษ", roman: "ang-grit", chinese: "英语；英国/英语的" }],
    antonyms: [],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { thai: "คนอังกฤษ", roman: "khon ang-grit", chinese: "英国人" },
        distinctionZh: "ภาษาอังกฤษ 指语言；คนอังกฤษ 指英国人，前面的名词决定整个词组的意思。",
      },
    ],
    registers: ["neutral", "academic"],
    collocations: [
      { thai: "เรียนภาษาอังกฤษ", roman: "riian phaa-saa ang-grit", chinese: "学英语" },
      { thai: "ภาษาอังกฤษง่ายกว่าไหม", roman: "phaa-saa ang-grit ngaai gwaa mai", chinese: "英语更容易吗" },
    ],
    learningNotesZh: ["อังกฤษ 单独出现可能指英语、英国或英国相关；ภาษาอังกฤษ 明确表示“英语”。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-nak-riian",
    vocabularyId: "nak-riian",
    thai: "นักเรียน",
    roman: "nak-riian",
    chinese: "学生",
    english: "student",
    senses: [
      {
        id: "school-student",
        chinese: "学生；在学校或课程中学习的人",
        english: "student; a person who studies in a school or course",
        register: "neutral",
        examples: [
          {
            thai: "นักเรียนสองคนในห้องนี้เพิ่งเริ่มเรียนภาษาไทย แต่ถามคำถามได้ชัดเจนมาก",
            roman: "nak-riian saawng khon nai haawng nii phoeng roem riian phaa-saa thai, dtaae thaam kham-thaam dai chat-jeen maak",
            chinese: "这个教室里的两个学生刚开始学泰语，但提问非常清楚。",
            english: "The two students in this room have just started learning Thai, but they can ask questions very clearly.",
            grammarIds: ["classifiers-basic-counting", "demonstratives-nii-nan-noon", "recent-just-pheung", "conjunction-contrast-reason"],
          },
        ],
        synonyms: [
          { thai: "ผู้เรียน", roman: "phuu-riian", chinese: "学习者", notesZh: "更概括，也可用于成人学习者。" },
          { thai: "ลูกศิษย์", roman: "luuk-sit", chinese: "学生；弟子", notesZh: "强调师生关系。" },
        ],
        antonyms: [{ vocabularyId: "khruu", thai: "ครู", roman: "khruu", chinese: "老师" }],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "riian", thai: "เรียน", roman: "riian", chinese: "学习" },
            distinctionZh: "นักเรียน 是名词“学生”；เรียน 是动词“学习”。นัก + เรียน 字面上是“学习的人”。",
          },
        ],
        collocations: [
          { thai: "นักเรียนใหม่", roman: "nak-riian mai", chinese: "新学生" },
          { thai: "นักเรียนต่างชาติ", roman: "nak-riian dtaang-chaat", chinese: "外国学生" },
          { thai: "นักเรียนสองคน", roman: "nak-riian saawng khon", chinese: "两个学生" },
        ],
        grammarIds: ["word-formation-prefixes", "classifier-animate"],
        tags: ["people", "classroom"],
      },
    ],
    synonyms: [
      { thai: "ผู้เรียน", roman: "phuu-riian", chinese: "学习者" },
      { thai: "ลูกศิษย์", roman: "luuk-sit", chinese: "学生；弟子" },
    ],
    antonyms: [{ vocabularyId: "khruu", thai: "ครู", roman: "khruu", chinese: "老师" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "นักศึกษา", roman: "nak-sueksaa", chinese: "大学生" },
        distinctionZh: "นักเรียน 常指中小学学生或一般课程学员；นักศึกษา 多指大学生。",
      },
    ],
    registers: ["neutral", "academic"],
    collocations: [
      { thai: "ห้องนักเรียน", roman: "haawng nak-riian", chinese: "学生室；学生所在的房间" },
      { thai: "นักเรียนไทย", roman: "nak-riian thai", chinese: "泰国学生" },
    ],
    learningNotesZh: ["นัก- 是常见构词前缀，表示从事某活动的人；นักเรียน 和 เรียน 的关系很透明。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-khruu",
    vocabularyId: "khruu",
    thai: "ครู",
    roman: "khruu",
    chinese: "老师",
    english: "teacher",
    senses: [
      {
        id: "teacher",
        chinese: "老师；教课、指导学习的人",
        english: "teacher; a person who teaches or guides learning",
        register: "neutral",
        examples: [
          {
            thai: "ครูภาษาไทยของเราอธิบายเสียงวรรณยุกต์ช้า ๆ เพื่อให้นักเรียนออกเสียงถูก",
            roman: "khruu phaa-saa thai khaawng rao a-thi-baai siang wan-na-yuk chaa chaa phuea hai nak-riian aawk-siang thuuk",
            chinese: "我们的泰语老师慢慢解释声调，好让学生发音正确。",
            english: "Our Thai teacher explains the tones slowly so that the students pronounce them correctly.",
            grammarIds: ["possession-khaawng", "reduplication", "purpose-phuea", "causative-hai"],
          },
        ],
        synonyms: [
          { thai: "อาจารย์", roman: "aa-jaan", chinese: "老师；讲师", notesZh: "可更正式，常用于大学或尊称老师。" },
          { thai: "ผู้สอน", roman: "phuu-saawn", chinese: "授课者；教师", notesZh: "较书面。" },
        ],
        antonyms: [{ vocabularyId: "nak-riian", thai: "นักเรียน", roman: "nak-riian", chinese: "学生" }],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "อาจารย์", roman: "aa-jaan", chinese: "老师；讲师" },
            distinctionZh: "ครู 是基础通用的“老师”；อาจารย์ 更尊敬或更偏大学、专业场合。",
          },
        ],
        collocations: [
          { thai: "ครูภาษาไทย", roman: "khruu phaa-saa thai", chinese: "泰语老师" },
          { thai: "ถามครู", roman: "thaam khruu", chinese: "问老师" },
          { thai: "ครูสองคน", roman: "khruu saawng khon", chinese: "两位老师" },
        ],
        grammarIds: ["classifier-animate", "noun-modifiers-follow"],
        tags: ["people", "classroom"],
      },
    ],
    synonyms: [
      { thai: "อาจารย์", roman: "aa-jaan", chinese: "老师；讲师" },
      { thai: "ผู้สอน", roman: "phuu-saawn", chinese: "授课者；教师" },
    ],
    antonyms: [{ vocabularyId: "nak-riian", thai: "นักเรียน", roman: "nak-riian", chinese: "学生" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "หมอ", roman: "maaw", chinese: "医生" },
        distinctionZh: "ครู 和 หมอ 都可作职业称呼，但 ครู 是教书的人，หมอ 是医生。",
      },
    ],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "ครูสอน...", roman: "khruu saawn...", chinese: "老师教……" },
      { thai: "คุณครู", roman: "khun khruu", chinese: "老师（礼貌称呼）" },
    ],
    learningNotesZh: ["称呼老师时可以说 ครู 或 คุณครู；说“泰语老师”时 ภาษาไทย 直接放在 ครู 后面。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-phuean",
    vocabularyId: "phuean",
    thai: "เพื่อน",
    roman: "phuean",
    chinese: "朋友",
    english: "friend",
    senses: [
      {
        id: "friend",
        chinese: "朋友；关系亲近、一起活动或互相帮助的人",
        english: "friend; someone you are close to, spend time with, or help each other",
        register: "neutral",
        examples: [
          {
            thai: "เย็นนี้ฉันจะไปกินข้าวกับเพื่อนคนไทยที่ช่วยฝึกพูดภาษาไทยให้ทุกสัปดาห์",
            roman: "yen nii chan ja bpai gin khaao gap phuean khon thai thii chuai fuek phuut phaa-saa thai hai thuk sap-daa",
            chinese: "今天傍晚我要和一位每周帮我练习说泰语的泰国朋友去吃饭。",
            english: "This evening I will go eat with a Thai friend who helps me practice speaking Thai every week.",
            grammarIds: ["future-ja", "serial-verbs-basic", "relative-thii", "benefactive-hai"],
          },
        ],
        synonyms: [
          { thai: "มิตร", roman: "mit", chinese: "朋友；友人", notesZh: "较书面或正式。" },
          { thai: "เพื่อนสนิท", roman: "phuean sa-nit", chinese: "好朋友；密友", notesZh: "关系更近。" },
        ],
        antonyms: [{ thai: "ศัตรู", roman: "sat-dtruu", chinese: "敌人" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "คนรู้จัก", roman: "khon ruu-jak", chinese: "熟人" },
            distinctionZh: "เพื่อน 是朋友；คนรู้จัก 只是认识的人，亲近程度通常较低。",
          },
        ],
        collocations: [
          { thai: "เพื่อนคนไทย", roman: "phuean khon thai", chinese: "泰国朋友" },
          { thai: "เพื่อนสนิท", roman: "phuean sa-nit", chinese: "好朋友" },
          { thai: "ไปกับเพื่อน", roman: "bpai gap phuean", chinese: "和朋友一起去" },
        ],
        grammarIds: ["conjunction-and-with", "relative-thii", "classifier-animate"],
        tags: ["people", "relationship"],
      },
      {
        id: "classmate-peer",
        chinese: "同伴；同学、同事或同一群体中的伙伴",
        english: "peer or companion; a classmate, colleague, or person in the same group",
        register: "neutral",
        examples: [
          {
            thai: "เวลาไม่เข้าใจการบ้าน นักเรียนมักถามเพื่อนในห้องก่อนแล้วค่อยถามครู",
            roman: "wee-laa mai khao-jai gaan-baan, nak-riian mak thaam phuean nai haawng gaawn laaeo khawy thaam khruu",
            chinese: "不懂作业时，学生常常先问教室里的同学，然后再问老师。",
            english: "When they do not understand the homework, students often ask classmates in the room first and then ask the teacher.",
            grammarIds: ["condition-time-clauses", "adverbial-clauses-temporal", "ordinal-sequence"],
          },
        ],
        synonyms: [
          { thai: "เพื่อนร่วมชั้น", roman: "phuean ruam chan", chinese: "同班同学" },
          { thai: "เพื่อนร่วมงาน", roman: "phuean ruam-ngaan", chinese: "同事" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "เพื่อนสนิท", roman: "phuean sa-nit", chinese: "好朋友；密友" },
            distinctionZh: "เพื่อน 可泛指同伴或朋友；เพื่อนสนิท 明确表示亲密朋友。",
          },
        ],
        collocations: [
          { thai: "เพื่อนในห้อง", roman: "phuean nai haawng", chinese: "教室里的同学" },
          { thai: "เพื่อนร่วมงาน", roman: "phuean ruam-ngaan", chinese: "同事" },
        ],
        grammarIds: ["noun-modifiers-follow", "location-prepositions"],
        tags: ["people", "classroom"],
      },
    ],
    synonyms: [
      { thai: "มิตร", roman: "mit", chinese: "友人" },
      { thai: "เพื่อนสนิท", roman: "phuean sa-nit", chinese: "好朋友；密友" },
      { thai: "เพื่อนร่วมชั้น", roman: "phuean ruam chan", chinese: "同班同学" },
    ],
    antonyms: [{ thai: "ศัตรู", roman: "sat-dtruu", chinese: "敌人" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { vocabularyId: "khon", thai: "คน", roman: "khon", chinese: "人" },
        distinctionZh: "คน 只是人；เพื่อน 表示人与人的关系，常和 กับ、ของ、สนิท 搭配。",
      },
    ],
    registers: ["neutral", "casual"],
    collocations: [
      { thai: "มีเพื่อน", roman: "mii phuean", chinese: "有朋友" },
      { thai: "คุยกับเพื่อน", roman: "khui gap phuean", chinese: "和朋友聊天" },
    ],
    learningNotesZh: ["เพื่อน 不必像中文一样总说“一个朋友”；需要计数时用 เพื่อนหนึ่งคน 或 เพื่อนสองคน。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-khon",
    vocabularyId: "khon",
    thai: "คน",
    roman: "khon",
    chinese: "人",
    english: "person",
    senses: [
      {
        id: "person-human",
        chinese: "人；个人、人类或某个不特指性别的人",
        english: "person; human being or an individual without specifying gender",
        register: "neutral",
        examples: [
          {
            thai: "คนที่นั่งข้างครูเป็นนักเรียนใหม่จากเชียงใหม่ และเขาพูดภาษาอังกฤษได้ดี",
            roman: "khon thii nang khaang khruu bpen nak-riian mai jaak chiang-mai, lae khao phuut phaa-saa ang-grit dai dii",
            chinese: "坐在老师旁边的人是来自清迈的新学生，而且他/她英语说得很好。",
            english: "The person sitting beside the teacher is a new student from Chiang Mai, and they can speak English well.",
            grammarIds: ["relative-thii", "core-be-bpen-khue", "conjunction-and-with", "modal-dai-samart"],
          },
        ],
        synonyms: [
          { thai: "บุคคล", roman: "buk-khon", chinese: "个人；人士", notesZh: "更正式，常见于文件或说明。" },
          { thai: "มนุษย์", roman: "ma-nut", chinese: "人类", notesZh: "强调生物学或人类整体。" },
        ],
        antonyms: [{ thai: "สัตว์", roman: "sat", chinese: "动物" }],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "บุคคล", roman: "buk-khon", chinese: "个人；人士" },
            distinctionZh: "คน 是日常基本词；บุคคล 更正式，适合法规、表格或正式说明。",
          },
        ],
        collocations: [
          { thai: "คนไทย", roman: "khon thai", chinese: "泰国人" },
          { thai: "คนที่...", roman: "khon thii...", chinese: "……的人" },
          { thai: "คนนี้", roman: "khon nii", chinese: "这个人" },
        ],
        grammarIds: ["relative-thii", "noun-modifiers-follow", "demonstratives-nii-nan-noon"],
        tags: ["people", "noun"],
      },
      {
        id: "people-unspecified-plural",
        chinese: "人们；不强调单复数时的一群人或泛指的人",
        english: "people; an unspecified person or group when number is not emphasized",
        register: "neutral",
        examples: [
          {
            thai: "ที่ตลาดเช้าวันเสาร์มีคนเยอะมาก แต่คนขายยังพูดกับลูกค้าทุกคนอย่างใจดี",
            roman: "thii dta-laat chaao wan sao mii khon yoe maak, dtaae khon khaai yang phuut gap luuk-khaa thuk khon yaang jai-dii",
            chinese: "周六早上的市场人很多，但卖家仍然友好地和每位顾客说话。",
            english: "At the Saturday morning market there are many people, but the sellers still speak kindly with every customer.",
            grammarIds: ["location-prepositions", "core-have-exist-mii", "conjunction-contrast-reason", "classifier-animate"],
          },
        ],
        synonyms: [
          { thai: "ผู้คน", roman: "phuu-khon", chinese: "人们；人群", notesZh: "更书面或带整体感。" },
        ],
        antonyms: [{ thai: "ไม่มีคน", roman: "mai mii khon", chinese: "没有人" }],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "หลายคน", roman: "laai khon", chinese: "好几个人" },
            distinctionZh: "คน 本身不标复数；要强调“好几个人”时加 หลาย。",
          },
        ],
        collocations: [
          { thai: "มีคน", roman: "mii khon", chinese: "有人" },
          { thai: "คนเยอะ", roman: "khon yoe", chinese: "人多" },
          { thai: "ทุกคน", roman: "thuk khon", chinese: "每个人；大家" },
        ],
        grammarIds: ["core-have-exist-mii", "classifier-animate"],
        tags: ["people", "number"],
      },
    ],
    synonyms: [
      { thai: "บุคคล", roman: "buk-khon", chinese: "个人；人士" },
      { thai: "มนุษย์", roman: "ma-nut", chinese: "人类" },
      { thai: "ผู้คน", roman: "phuu-khon", chinese: "人们" },
    ],
    antonyms: [
      { thai: "สัตว์", roman: "sat", chinese: "动物" },
      { thai: "ไม่มีคน", roman: "mai mii khon", chinese: "没有人" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "classifier-khon", thai: "คน", roman: "khon", chinese: "人用量词" },
        distinctionZh: "คน 可以是名词“人”，也可以作人用量词；看它前后是否有数字、กี่、ทุก 等数量信息。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "คนไทย", roman: "khon thai", chinese: "泰国人" },
      { thai: "หลายคน", roman: "laai khon", chinese: "很多人；好几个人" },
    ],
    learningNotesZh: ["泰语名词通常不标单复数；คน 可翻成“人、一个人、人们”，要靠数量词或上下文判断。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-khrop-khrua",
    vocabularyId: "khrop-khrua",
    thai: "ครอบครัว",
    roman: "khraawp-khrua",
    chinese: "家庭",
    english: "family",
    senses: [
      {
        id: "family-household",
        chinese: "家庭；由亲人组成的家庭或家人整体",
        english: "family; a household or group of relatives as a unit",
        register: "neutral",
        examples: [
          {
            thai: "วันอาทิตย์ครอบครัวของฉันมักกินข้าวเย็นด้วยกันที่บ้าน แล้วคุยเรื่องงานและโรงเรียน",
            roman: "wan aa-thit khraawp-khrua khaawng chan mak gin khaao yen duai gan thii baan, laaeo khui rueang ngaan lae roong-riian",
            chinese: "星期天我的家人常常在家一起吃晚饭，然后聊工作和学校的事。",
            english: "On Sundays my family often eats dinner together at home and then talks about work and school.",
            grammarIds: ["possession-khaawng", "adverbs-frequency", "reciprocal-gan-duai", "conjunction-and-with"],
          },
        ],
        synonyms: [
          { thai: "บ้าน", roman: "baan", chinese: "家", notesZh: "强调住所或家庭归属，语义更宽。" },
          { thai: "ญาติ", roman: "yaat", chinese: "亲戚", notesZh: "强调亲属关系，不一定是同一家庭核心成员。" },
        ],
        antonyms: [{ thai: "คนเดียว", roman: "khon diao", chinese: "一个人；独自" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "บ้าน", roman: "baan", chinese: "家；房子" },
            distinctionZh: "ครอบครัว 指家人这个群体；บ้าน 指家或房子，也可引申为家庭。",
          },
        ],
        collocations: [
          { thai: "ครอบครัวของฉัน", roman: "khraawp-khrua khaawng chan", chinese: "我的家庭" },
          { thai: "อยู่กับครอบครัว", roman: "yuu gap khraawp-khrua", chinese: "和家人住在一起" },
          { thai: "ครอบครัวใหญ่", roman: "khraawp-khrua yai", chinese: "大家庭" },
        ],
        grammarIds: ["possession-khaawng", "conjunction-and-with", "noun-modifiers-follow"],
        tags: ["family", "people"],
      },
    ],
    synonyms: [
      { thai: "บ้าน", roman: "baan", chinese: "家；家庭" },
      { thai: "ญาติพี่น้อง", roman: "yaat phii-naawng", chinese: "亲戚家人" },
    ],
    antonyms: [{ thai: "อยู่คนเดียว", roman: "yuu khon diao", chinese: "一个人住；独自生活" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { vocabularyId: "khon", thai: "คน", roman: "khon", chinese: "人" },
        distinctionZh: "คน 是单个人或泛指人；ครอบครัว 是由多个亲人组成的家庭单位。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "คนในครอบครัว", roman: "khon nai khraawp-khrua", chinese: "家庭成员" },
      { thai: "กับครอบครัว", roman: "gap khraawp-khrua", chinese: "和家人" },
    ],
    learningNotesZh: ["ครอบครัว 强调整体家庭；说“家庭成员”常用 คนในครอบครัว。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-pho",
    vocabularyId: "pho",
    thai: "พ่อ",
    roman: "phaaw",
    chinese: "爸爸",
    english: "father",
    senses: [
      {
        id: "father-dad",
        chinese: "爸爸；父亲，日常亲属称呼",
        english: "father; dad, an everyday kinship term",
        register: "neutral",
        examples: [
          {
            thai: "พ่อของฉันทำอาหารเช้าให้ครอบครัวทุกวันก่อนออกไปทำงาน",
            roman: "phaaw khaawng chan tham aa-haan chaao hai khraawp-khrua thuk wan gaawn aawk bpai tham-ngaan",
            chinese: "我爸爸每天出门上班前给家人做早餐。",
            english: "My father makes breakfast for the family every day before going out to work.",
            grammarIds: ["possession-khaawng", "benefactive-hai", "time-words-context", "serial-verbs-basic"],
          },
        ],
        synonyms: [
          { thai: "บิดา", roman: "bi-daa", chinese: "父亲", notesZh: "正式或书面。" },
          { thai: "คุณพ่อ", roman: "khun phaaw", chinese: "爸爸；父亲", notesZh: "更礼貌或较温柔的称呼。" },
        ],
        antonyms: [{ vocabularyId: "mae", thai: "แม่", roman: "maae", chinese: "妈妈" }],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "บิดา", roman: "bi-daa", chinese: "父亲" },
            distinctionZh: "พ่อ 是日常“爸爸”；บิดา 更正式，常见于文件或书面语。",
          },
        ],
        collocations: [
          { thai: "พ่อของฉัน", roman: "phaaw khaawng chan", chinese: "我爸爸" },
          { thai: "คุณพ่อ", roman: "khun phaaw", chinese: "爸爸；父亲（礼貌）" },
          { thai: "พ่อแม่", roman: "phaaw maae", chinese: "父母" },
        ],
        grammarIds: ["possession-khaawng", "classifier-animate"],
        tags: ["family", "kinship"],
      },
    ],
    synonyms: [
      { thai: "บิดา", roman: "bi-daa", chinese: "父亲" },
      { thai: "คุณพ่อ", roman: "khun phaaw", chinese: "爸爸；父亲" },
    ],
    antonyms: [{ vocabularyId: "mae", thai: "แม่", roman: "maae", chinese: "妈妈" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { vocabularyId: "khrop-khrua", thai: "ครอบครัว", roman: "khraawp-khrua", chinese: "家庭" },
        distinctionZh: "พ่อ 是一个家庭成员；ครอบครัว 是整个家庭。",
      },
    ],
    registers: ["neutral", "casual", "polite"],
    collocations: [
      { thai: "พ่อแม่", roman: "phaaw maae", chinese: "父母" },
      { thai: "รักพ่อ", roman: "rak phaaw", chinese: "爱爸爸" },
    ],
    learningNotesZh: ["พ่อ 是日常称呼；在更礼貌或亲切的说法里常加 คุณ เป็น คุณพ่อ。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-mae",
    vocabularyId: "mae",
    thai: "แม่",
    roman: "maae",
    chinese: "妈妈",
    english: "mother",
    senses: [
      {
        id: "mother-mom",
        chinese: "妈妈；母亲，日常亲属称呼",
        english: "mother; mom, an everyday kinship term",
        register: "neutral",
        examples: [
          {
            thai: "แม่ของเขาชอบฟังภาษาไทยช้า ๆ เพราะกำลังเรียนคำใหม่กับลูกทุกคืน",
            roman: "maae khaawng khao chaawp fang phaa-saa thai chaa chaa phraw gam-lang riian kham mai gap luuk thuk kheun",
            chinese: "他/她的妈妈喜欢听慢速泰语，因为她每天晚上正和孩子一起学新词。",
            english: "His or her mother likes listening to slow Thai because she is learning new words with her child every night.",
            grammarIds: ["possession-khaawng", "want-like-preference", "progressive-gamlang-yuu", "time-words-context"],
          },
        ],
        synonyms: [
          { thai: "มารดา", roman: "maan-daa", chinese: "母亲", notesZh: "正式或书面。" },
          { thai: "คุณแม่", roman: "khun maae", chinese: "妈妈；母亲", notesZh: "更礼貌或较温柔的称呼。" },
        ],
        antonyms: [{ vocabularyId: "pho", thai: "พ่อ", roman: "phaaw", chinese: "爸爸" }],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "มารดา", roman: "maan-daa", chinese: "母亲" },
            distinctionZh: "แม่ 是日常“妈妈”；มารดา 更正式，常见于文件或书面语。",
          },
        ],
        collocations: [
          { thai: "แม่ของเขา", roman: "maae khaawng khao", chinese: "他/她的妈妈" },
          { thai: "คุณแม่", roman: "khun maae", chinese: "妈妈；母亲（礼貌）" },
          { thai: "พ่อแม่", roman: "phaaw maae", chinese: "父母" },
        ],
        grammarIds: ["possession-khaawng", "classifier-animate"],
        tags: ["family", "kinship"],
      },
    ],
    synonyms: [
      { thai: "มารดา", roman: "maan-daa", chinese: "母亲" },
      { thai: "คุณแม่", roman: "khun maae", chinese: "妈妈；母亲" },
    ],
    antonyms: [{ vocabularyId: "pho", thai: "พ่อ", roman: "phaaw", chinese: "爸爸" }],
    comparisons: [
      {
        kind: "near-synonym",
        target: { vocabularyId: "khrop-khrua", thai: "ครอบครัว", roman: "khraawp-khrua", chinese: "家庭" },
        distinctionZh: "แม่ 是一个家庭成员；ครอบครัว 是整个家庭。",
      },
    ],
    registers: ["neutral", "casual", "polite"],
    collocations: [
      { thai: "พ่อแม่", roman: "phaaw maae", chinese: "父母" },
      { thai: "รักแม่", roman: "rak maae", chinese: "爱妈妈" },
    ],
    learningNotesZh: ["แม่ 是日常称呼；คุณแม่ 更礼貌或更柔和。注意 แม่ 的罗马音是 maae。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-riian",
    vocabularyId: "riian",
    thai: "เรียน",
    roman: "riian",
    chinese: "学习",
    english: "study; learn",
    senses: [
      {
        id: "study-learn-subject",
        chinese: "学习；学某门课、语言或技能",
        english: "to study or learn a subject, language, or skill",
        register: "neutral",
        examples: [
          {
            thai: "ถึงแม้ภาษาไทยจะยากในตอนแรก ฉันก็เรียนทุกวันเพื่อพูดกับเพื่อนได้คล่องขึ้น",
            roman: "thueng-maae phaa-saa thai ja yaak nai dtaawn raaek, chan gaw riian thuk wan phuea phuut gap phuean dai khlaawng kheun",
            chinese: "虽然泰语一开始很难，我还是每天学习，为了能和朋友说得更流利。",
            english: "Although Thai is difficult at first, I still study every day so I can speak more fluently with friends.",
            grammarIds: ["adverbial-clauses-logical", "time-words-context", "purpose-phuea", "modal-dai-samart"],
          },
        ],
        synonyms: [
          { thai: "ศึกษา", roman: "sueksaa", chinese: "学习；研究", notesZh: "更正式，常用于学校、学术或深入学习。" },
          { thai: "ฝึก", roman: "fuek", chinese: "练习", notesZh: "强调反复练习技能。" },
        ],
        antonyms: [{ thai: "สอน", roman: "saawn", chinese: "教" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ศึกษา", roman: "sueksaa", chinese: "学习；研究" },
            distinctionZh: "เรียน 是普通“学习/上课”；ศึกษา 更正式，常带研究、系统学习的感觉。",
          },
        ],
        collocations: [
          { thai: "เรียนภาษาไทย", roman: "riian phaa-saa thai", chinese: "学泰语" },
          { thai: "เรียนคำใหม่", roman: "riian kham mai", chinese: "学新词" },
          { thai: "เรียนทุกวัน", roman: "riian thuk wan", chinese: "每天学习" },
        ],
        grammarIds: ["word-formation-prefixes", "time-words-context", "purpose-phuea"],
        tags: ["classroom", "verb"],
      },
      {
        id: "attend-class",
        chinese: "上课；参加课程或在学校学习",
        english: "to attend class or study at school",
        register: "neutral",
        examples: [
          {
            thai: "พรุ่งนี้นักเรียนจะมาเรียนที่ห้องนี้ตอนเก้าโมง แต่ครูจะมาถึงก่อนครึ่งชั่วโมง",
            roman: "phrung-nii nak-riian ja maa riian thii haawng nii dtaawn gao moong, dtaae khruu ja maa thueng gaawn khrueng chua-moong",
            chinese: "明天学生九点会来这个教室上课，但老师会提前半小时到。",
            english: "Tomorrow the students will come study in this room at nine, but the teacher will arrive half an hour earlier.",
            grammarIds: ["future-ja", "location-prepositions", "demonstratives-nii-nan-noon", "quantity-price-time-questions"],
          },
        ],
        synonyms: [
          { thai: "เข้าเรียน", roman: "khao riian", chinese: "进教室上课；参加课程" },
          { thai: "มาเรียน", roman: "maa riian", chinese: "来上课" },
        ],
        antonyms: [
          { thai: "ขาดเรียน", roman: "khaat riian", chinese: "缺课" },
          { thai: "หยุดเรียน", roman: "yut riian", chinese: "停课；不上课" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "สอน", roman: "saawn", chinese: "教" },
            distinctionZh: "นักเรียน เรียน；ครู สอน。เรียน 是学习或上课，สอน 是教别人。",
          },
        ],
        collocations: [
          { thai: "มาเรียน", roman: "maa riian", chinese: "来上课" },
          { thai: "เลิกเรียน", roman: "loek-riian", chinese: "下课；放学" },
          { thai: "ห้องเรียน", roman: "haawng-riian", chinese: "教室" },
        ],
        grammarIds: ["motion-direction-verbs", "location-prepositions"],
        tags: ["classroom", "schedule"],
      },
    ],
    synonyms: [
      { thai: "ศึกษา", roman: "sueksaa", chinese: "学习；研究" },
      { thai: "ฝึก", roman: "fuek", chinese: "练习" },
      { thai: "เข้าเรียน", roman: "khao riian", chinese: "上课" },
    ],
    antonyms: [
      { thai: "สอน", roman: "saawn", chinese: "教" },
      { thai: "ขาดเรียน", roman: "khaat riian", chinese: "缺课" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "nak-riian", thai: "นักเรียน", roman: "nak-riian", chinese: "学生" },
        distinctionZh: "เรียน 是动词“学习/上课”；นักเรียน 是由 นัก + เรียน 形成的名词“学生”。",
      },
    ],
    registers: ["neutral", "academic"],
    collocations: [
      { thai: "อยากเรียน", roman: "yaak riian", chinese: "想学习" },
      { thai: "เรียนกับครู", roman: "riian gap khruu", chinese: "跟老师学习" },
    ],
    learningNotesZh: ["เรียน 后面可直接接学科或语言；和 มา、เข้า、เลิก 组合时常表示上课流程。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-classifier-hawng",
    vocabularyId: "classifier-hawng",
    thai: "ห้อง",
    roman: "haawng",
    chinese: "房间；房间量词",
    english: "room; room classifier",
    senses: [
      {
        id: "room-noun",
        chinese: "房间；建筑物内分隔出的空间",
        english: "room; a divided space inside a building",
        register: "neutral",
        examples: [
          {
            thai: "ห้องนี้กว้างพอสำหรับนักเรียนสิบคน แต่ต้องเปิดหน้าต่างก่อนเริ่มเรียน",
            roman: "haawng nii gwaang phaaw sam-rap nak-riian sip khon, dtaae dtawng bpoet naa-dtaang gaawn roem riian",
            chinese: "这个房间够宽，能容纳十个学生，但开始上课前需要先开窗。",
            english: "This room is wide enough for ten students, but we need to open the windows before starting class.",
            grammarIds: ["demonstratives-nii-nan-noon", "classifier-animate", "conjunction-contrast-reason", "modal-need-should"],
          },
        ],
        synonyms: [
          { thai: "ห้องเรียน", roman: "haawng-riian", chinese: "教室" },
          { thai: "ห้องพัก", roman: "haawng-phak", chinese: "房间；客房", notesZh: "常用于住宿或休息的房间。" },
        ],
        antonyms: [{ thai: "นอกห้อง", roman: "naawk haawng", chinese: "房间外" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "บ้าน", roman: "baan", chinese: "家；房子" },
            distinctionZh: "ห้อง 是房间；บ้าน 是家或房子，范围比 ห้อง 大。",
          },
        ],
        collocations: [
          { thai: "ห้องเรียน", roman: "haawng-riian", chinese: "教室" },
          { thai: "ห้องนี้", roman: "haawng nii", chinese: "这个房间" },
          { thai: "อยู่ในห้อง", roman: "yuu nai haawng", chinese: "在房间里" },
        ],
        grammarIds: ["location-prepositions", "demonstratives-nii-nan-noon"],
        tags: ["place", "room"],
      },
      {
        id: "room-classifier",
        chinese: "间；用于数房间、教室、浴室等空间的量词",
        english: "classifier for rooms and room-like spaces",
        register: "neutral",
        examples: [
          {
            thai: "โรงเรียนเล็กแห่งนี้มีห้องเรียนสามห้องและห้องน้ำหนึ่งห้องสำหรับนักเรียนทุกคน",
            roman: "roong-riian lek haeng nii mii haawng-riian saam haawng lae haawng-naam nueng haawng sam-rap nak-riian thuk khon",
            chinese: "这所小学校有三间教室和一间洗手间，供所有学生使用。",
            english: "This small school has three classrooms and one bathroom for all the students.",
            grammarIds: ["classifier-inanimate-function", "classifiers-basic-counting", "conjunction-and-with", "classifier-animate"],
          },
        ],
        synonyms: [
          { thai: "แห่ง", roman: "haeng", chinese: "处；地点量词", notesZh: "用于地点、机构，不专指房间。" },
        ],
        antonyms: [{ thai: "คน", roman: "khon", chinese: "人用量词" }],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "หลัง", roman: "lang", chinese: "栋；建筑量词" },
            distinctionZh: "ห้อง 数房间；หลัง 数房子或建筑，如 บ้านหนึ่งหลัง。",
          },
        ],
        collocations: [
          { thai: "หนึ่งห้อง", roman: "nueng haawng", chinese: "一间房" },
          { thai: "สามห้อง", roman: "saam haawng", chinese: "三间房" },
          { thai: "กี่ห้อง", roman: "gii haawng", chinese: "几间房" },
        ],
        grammarIds: ["classifiers-basic-counting", "classifier-inanimate-function", "classifier-repeater"],
        tags: ["classifier", "place"],
      },
    ],
    synonyms: [
      { thai: "ห้องเรียน", roman: "haawng-riian", chinese: "教室" },
      { thai: "ห้องพัก", roman: "haawng-phak", chinese: "房间；客房" },
      { thai: "แห่ง", roman: "haeng", chinese: "处；地点量词" },
    ],
    antonyms: [
      { thai: "นอกห้อง", roman: "naawk haawng", chinese: "房间外" },
      { thai: "คน", roman: "khon", chinese: "人用量词" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "classifier-kaaeow", thai: "แก้ว", roman: "gaaeow", chinese: "杯；杯子量词" },
        distinctionZh: "ห้อง 用来数房间或空间；แก้ว 用来数杯装饮料或杯子。两者都是可重复作名词和量词的词。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ห้องหนึ่งห้อง", roman: "haawng nueng haawng", chinese: "一个房间" },
      { thai: "ห้องว่าง", roman: "haawng waang", chinese: "空房间" },
    ],
    learningNotesZh: ["ห้อง 既是名词“房间”，也能重复作量词：ห้องเรียนสามห้อง。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-04-classifier-kaaeow",
    vocabularyId: "classifier-kaaeow",
    thai: "แก้ว",
    roman: "gaaeow",
    chinese: "杯；杯子量词",
    english: "glass; cup classifier",
    senses: [
      {
        id: "glass-cup-noun",
        chinese: "杯子；用来盛饮料的杯、玻璃杯",
        english: "glass or cup; a container used for drinks",
        register: "neutral",
        examples: [
          {
            thai: "แก้วใบนี้สะอาดแล้ว คุณใช้ดื่มน้ำเย็นระหว่างเรียนได้เลย",
            roman: "gaaeow bai nii sa-aat laaeo, khun chai duuem naam yen ra-waang riian dai loei",
            chinese: "这个杯子已经干净了，您可以在上课期间用它喝凉水。",
            english: "This cup is clean now; you can use it to drink cold water during class.",
            grammarIds: ["classifier-inanimate-shape", "demonstratives-nii-nan-noon", "completion-laaeo", "modal-dai-samart"],
          },
        ],
        synonyms: [
          { thai: "ถ้วย", roman: "thuai", chinese: "杯；碗状杯", notesZh: "形状偏碗状或杯状，也可用于杯子。" },
          { thai: "แก้วน้ำ", roman: "gaaeow naam", chinese: "水杯" },
        ],
        antonyms: [{ thai: "จาน", roman: "jaan", chinese: "盘子" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ถ้วย", roman: "thuai", chinese: "杯；碗状杯" },
            distinctionZh: "แก้ว 常指玻璃杯或饮料杯；ถ้วย 形状更像杯/碗，也常用于茶、汤或甜品容器。",
          },
        ],
        collocations: [
          { thai: "แก้วน้ำ", roman: "gaaeow naam", chinese: "水杯" },
          { thai: "แก้วใบนี้", roman: "gaaeow bai nii", chinese: "这个杯子" },
          { thai: "ล้างแก้ว", roman: "laang gaaeow", chinese: "洗杯子" },
        ],
        grammarIds: ["classifier-inanimate-shape", "demonstratives-nii-nan-noon"],
        tags: ["object", "drink"],
      },
      {
        id: "drink-classifier",
        chinese: "杯；用于数杯装饮料的量词",
        english: "classifier for drinks served by the glass or cup",
        register: "neutral",
        examples: [
          {
            thai: "หลังเดินตลาดนาน ๆ แม่สั่งน้ำมะนาวสองแก้วให้พ่อกับลูกดื่มก่อนกลับบ้าน",
            roman: "lang doen dta-laat naan naan, maae sang naam ma-naao saawng gaaeow hai phaaw gap luuk duuem gaawn glap baan",
            chinese: "逛市场很久之后，妈妈点了两杯柠檬水给爸爸和孩子喝，然后再回家。",
            english: "After walking around the market for a long time, Mom ordered two glasses of limeade for Dad and the child to drink before going home.",
            grammarIds: ["adverbial-clauses-temporal", "classifiers-basic-counting", "benefactive-hai", "serial-verbs-basic"],
          },
        ],
        synonyms: [
          { thai: "ถ้วย", roman: "thuai", chinese: "杯；碗状容器量词", notesZh: "某些饮品或甜品可用，范围与 แก้ว 不完全重合。" },
        ],
        antonyms: [{ thai: "จาน", roman: "jaan", chinese: "盘；盘装食物量词" }],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ขวด", roman: "khuat", chinese: "瓶；瓶装量词" },
            distinctionZh: "แก้ว 数杯装饮料；ขวด 数瓶装饮料，如 น้ำหนึ่งขวด。",
          },
        ],
        collocations: [
          { thai: "น้ำหนึ่งแก้ว", roman: "naam nueng gaaeow", chinese: "一杯水" },
          { thai: "กาแฟสองแก้ว", roman: "gaa-faae saawng gaaeow", chinese: "两杯咖啡" },
          { thai: "กี่แก้ว", roman: "gii gaaeow", chinese: "几杯" },
        ],
        grammarIds: ["classifiers-basic-counting", "classifier-measure-words"],
        tags: ["classifier", "drink"],
      },
    ],
    synonyms: [
      { thai: "ถ้วย", roman: "thuai", chinese: "杯；碗状杯" },
      { thai: "แก้วน้ำ", roman: "gaaeow naam", chinese: "水杯" },
    ],
    antonyms: [
      { thai: "จาน", roman: "jaan", chinese: "盘子；盘装量词" },
      { thai: "ขวด", roman: "khuat", chinese: "瓶；瓶装量词" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "classifier-hawng", thai: "ห้อง", roman: "haawng", chinese: "房间；房间量词" },
        distinctionZh: "แก้ว 用于杯子和杯装饮料；ห้อง 用于房间和房间数量。两者都要放在数字后面。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "หนึ่งแก้ว", roman: "nueng gaaeow", chinese: "一杯" },
      { thai: "แก้วนี้", roman: "gaaeow nii", chinese: "这杯；这个杯子" },
    ],
    learningNotesZh: ["แก้ว 可指“杯子”，也可作量词“一杯”；如果强调杯子本身，可说 แก้วใบนี้。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
] satisfies VocabularyEnrichment[];
