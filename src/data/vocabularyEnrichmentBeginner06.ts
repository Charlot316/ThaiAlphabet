import type { VocabularyEnrichment } from "./types";

const CORE_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];
const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar"];
const QUESTION_REFS = ["thai-reference-questions", "complete-thai-a1", "into-asia-grammar"];

export const VOCABULARY_ENRICHMENT_BEGINNER_06 = [
  {
    id: "enrich-beginner-06-ngaai",
    vocabularyId: "ngaai",
    thai: "ง่าย",
    roman: "ngaai",
    chinese: "容易",
    english: "easy",
    senses: [
      {
        id: "easy-not-difficult",
        chinese: "容易；不难理解、学习、做或使用",
        english: "easy; not difficult to understand, learn, do, or use",
        register: "neutral",
        examples: [
          {
            thai: "บทเรียนวันนี้ง่ายกว่าบทเรียนเมื่อวาน เพราะครูอธิบายช้า ๆ และให้ตัวอย่างหลายข้อ",
            roman: "bot-riian wan-nii ngaai gwaa bot-riian muea-waan phraw khruu a-thi-baai chaa chaa lae hai dtua-yaang laai khaaw",
            chinese: "今天的课比昨天的课容易，因为老师解释得很慢，还给了很多例子。",
            english: "Today's lesson is easier than yesterday's because the teacher explains slowly and gives many examples.",
            grammarIds: ["comparison-gwaa", "conjunction-contrast-reason", "reduplication", "classifiers-basic-counting"],
          },
        ],
        synonyms: [
          { thai: "ไม่ยาก", roman: "mai yaak", chinese: "不难" },
          { thai: "ง่ายดาย", roman: "ngaai-daai", chinese: "轻松容易", notesZh: "比 ง่าย 更强调顺利、不费力。" },
        ],
        antonyms: [
          { vocabularyId: "yaak-difficult", thai: "ยาก", roman: "yaak", chinese: "难" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "สะดวก", roman: "sa-duuak", chinese: "方便" },
            distinctionZh: "ง่าย 强调难度低；สะดวก 强调条件方便、安排顺手。",
          },
        ],
        collocations: [
          { thai: "ง่ายมาก", roman: "ngaai maak", chinese: "很容易" },
          { thai: "เข้าใจง่าย", roman: "khao-jai ngaai", chinese: "容易理解" },
          { thai: "อ่านง่าย", roman: "aan ngaai", chinese: "容易读" },
        ],
        grammarIds: ["adjectives-as-verbs", "degree-basic", "comparison-gwaa"],
        tags: ["adjective", "difficulty"],
      },
    ],
    synonyms: [
      { thai: "ไม่ยาก", roman: "mai yaak", chinese: "不难" },
      { thai: "ง่ายดาย", roman: "ngaai-daai", chinese: "轻松容易" },
    ],
    antonyms: [
      { vocabularyId: "yaak-difficult", thai: "ยาก", roman: "yaak", chinese: "难" },
    ],
    comparisons: [
      {
        kind: "confusable",
        target: { vocabularyId: "yaak", thai: "อยาก", roman: "yaak", chinese: "想要" },
        distinctionZh: "ง่าย 的反义是 ยาก“难”；อยาก 同音但意思是“想要”，拼写不同。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ใช้ง่าย", roman: "chai ngaai", chinese: "容易使用" },
      { thai: "เรียนง่าย", roman: "riian ngaai", chinese: "容易学" },
    ],
    learningNotesZh: ["ง่าย 可直接作谓语：ภาษาไทยง่าย 表示“泰语容易”；也常放在动词后形成“容易……”。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-sanuk",
    vocabularyId: "sanuk",
    thai: "สนุก",
    roman: "sa-nuk",
    chinese: "有趣；好玩",
    english: "fun",
    senses: [
      {
        id: "fun-enjoyable",
        chinese: "有趣；好玩；让人觉得开心、投入",
        english: "fun; enjoyable and engaging",
        register: "neutral",
        examples: [
          {
            thai: "เกมนี้สนุกมาก เพราะต้องฟังเสียงและเลือกตัวอักษรให้ถูกก่อนหมดเวลา",
            roman: "geem nii sa-nuk maak phraw dtawng fang siang lae leuuak dtua-ak-saawn hai thuuk gaawn mot wee-laa",
            chinese: "这个游戏很好玩，因为要听声音，并且要在时间结束前选对字母。",
            english: "This game is very fun because you have to listen to the sound and choose the correct letter before time runs out.",
            grammarIds: ["degree-basic", "conjunction-contrast-reason", "modal-need-should", "hai-adverbial"],
          },
        ],
        synonyms: [
          { thai: "เพลิน", roman: "phloen", chinese: "愉快投入；不知不觉地享受", notesZh: "常强调做着做着很投入。" },
          { thai: "น่าสนใจ", roman: "naa-son-jai", chinese: "有意思；值得关注" },
        ],
        antonyms: [
          { thai: "น่าเบื่อ", roman: "naa-buea", chinese: "无聊" },
          { thai: "เบื่อ", roman: "buea", chinese: "腻；厌烦" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "น่าสนใจ", roman: "naa-son-jai", chinese: "有意思" },
            distinctionZh: "สนุก 强调玩得开心；น่าสนใจ 强调值得了解，不一定让人觉得好玩。",
          },
        ],
        collocations: [
          { thai: "สนุกมาก", roman: "sa-nuk maak", chinese: "很好玩" },
          { thai: "เรียนสนุก", roman: "riian sa-nuk", chinese: "学得有趣" },
          { thai: "เที่ยวสนุก", roman: "thiaao sa-nuk", chinese: "玩得开心" },
        ],
        grammarIds: ["adjectives-as-verbs", "degree-basic"],
        tags: ["adjective", "feeling", "enjoyment"],
      },
    ],
    synonyms: [
      { thai: "เพลิน", roman: "phloen", chinese: "愉快投入" },
      { thai: "น่าสนใจ", roman: "naa-son-jai", chinese: "有意思" },
    ],
    antonyms: [
      { thai: "น่าเบื่อ", roman: "naa-buea", chinese: "无聊" },
      { thai: "เบื่อ", roman: "buea", chinese: "厌烦" },
    ],
    comparisons: [
      {
        kind: "near-synonym",
        target: { vocabularyId: "dii", thai: "ดี", roman: "dii", chinese: "好" },
        distinctionZh: "ดี 是总体正面评价；สนุก 专门评价活动、课、游戏等让人开心好玩。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "สนุกไหม", roman: "sa-nuk mai", chinese: "好玩吗" },
      { thai: "สนุกกว่า", roman: "sa-nuk gwaa", chinese: "更好玩" },
    ],
    learningNotesZh: ["สนุก 常用于活动、游戏、旅行、课程；可以说 สนุกมาก，也可以问 สนุกไหม。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-yai",
    vocabularyId: "yai",
    thai: "ใหญ่",
    roman: "yai",
    chinese: "大",
    english: "big",
    senses: [
      {
        id: "large-size",
        chinese: "大；尺寸、面积、规模或容量较大",
        english: "big; large in size, area, scale, or capacity",
        register: "neutral",
        examples: [
          {
            thai: "บ้านหลังนี้ใหญ่กว่าห้องพักเก่าของเรา แต่ค่าเช่าก็แพงขึ้นด้วย",
            roman: "baan lang nii yai gwaa haawng-phak gao khaawng rao dtaae khaa-chao gaw phaaeng kheun duai",
            chinese: "这栋房子比我们以前的房间大，但是租金也变贵了。",
            english: "This house is bigger than our old room, but the rent has also become more expensive.",
            grammarIds: ["classifiers-specific-reference", "comparison-gwaa", "possession-khaawng", "conjunction-contrast-reason"],
          },
        ],
        synonyms: [
          { thai: "ใหญ่โต", roman: "yai-dtoo", chinese: "很大；宏大", notesZh: "比 ใหญ่ 更强调体量或气势。" },
          { thai: "โต", roman: "dtoo", chinese: "大；长大", notesZh: "常用于人、动物、植物长大。" },
        ],
        antonyms: [
          { vocabularyId: "lek", thai: "เล็ก", roman: "lek", chinese: "小" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "กว้าง", roman: "gwaang", chinese: "宽；宽敞" },
            distinctionZh: "ใหญ่ 是整体“大”；กว้าง 强调横向宽或空间宽敞。",
          },
        ],
        collocations: [
          { thai: "บ้านใหญ่", roman: "baan yai", chinese: "大房子" },
          { thai: "ตลาดใหญ่", roman: "dta-laat yai", chinese: "大市场" },
          { thai: "ใหญ่กว่า", roman: "yai gwaa", chinese: "更大" },
        ],
        grammarIds: ["adjectives-as-verbs", "noun-modifiers-follow", "comparison-gwaa"],
        tags: ["adjective", "size"],
      },
      {
        id: "major-important",
        chinese: "大；重要、严重或影响范围较大",
        english: "big; major, important, or serious in impact",
        register: "neutral",
        examples: [
          {
            thai: "ปัญหานี้ไม่ใหญ่มาก ถ้าเราแก้ทีละขั้นและคุยกันให้ชัดเจน",
            roman: "bpan-haa nii mai yai maak thaa rao gaae thii-la khan lae khui gan hai chat-jen",
            chinese: "这个问题不是很大，如果我们一步一步解决，并且把话说清楚。",
            english: "This problem is not very big if we solve it step by step and talk clearly with each other.",
            grammarIds: ["negation-mai", "degree-basic", "condition-time-clauses", "hai-adverbial"],
          },
        ],
        synonyms: [
          { thai: "สำคัญ", roman: "sam-khan", chinese: "重要" },
          { thai: "ร้ายแรง", roman: "raai-raaeng", chinese: "严重", notesZh: "用于负面问题时强度更高。" },
        ],
        antonyms: [
          { vocabularyId: "lek", thai: "เล็ก", roman: "lek", chinese: "小；小问题" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "สำคัญ", roman: "sam-khan", chinese: "重要" },
            distinctionZh: "เรื่องใหญ่ 像“大事/严重的事”；สำคัญ 更直接表示重要。",
          },
        ],
        collocations: [
          { thai: "เรื่องใหญ่", roman: "rueang yai", chinese: "大事" },
          { thai: "ปัญหาใหญ่", roman: "bpan-haa yai", chinese: "大问题" },
        ],
        grammarIds: ["adjectives-as-verbs", "negation-mai", "degree-basic"],
        tags: ["adjective", "importance"],
      },
    ],
    synonyms: [
      { thai: "ใหญ่โต", roman: "yai-dtoo", chinese: "很大；宏大" },
      { thai: "โต", roman: "dtoo", chinese: "大；长大" },
    ],
    antonyms: [
      { vocabularyId: "lek", thai: "เล็ก", roman: "lek", chinese: "小" },
    ],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "โต", roman: "dtoo", chinese: "大；长大" },
        distinctionZh: "ใหญ่ 可用于物体、地方、问题；โต 常用于人或生物长大，也可形容规模变大。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ใหญ่และเล็ก", roman: "yai lae lek", chinese: "大的和小的" },
      { thai: "ตัวใหญ่", roman: "dtua yai", chinese: "个子大；体型大" },
    ],
    learningNotesZh: ["形容名词时，ใหญ่ 通常放在名词后：บ้านใหญ่、ตลาดใหญ่；作谓语时直接说 บ้านใหญ่。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-lek",
    vocabularyId: "lek",
    thai: "เล็ก",
    roman: "lek",
    chinese: "小",
    english: "small",
    senses: [
      {
        id: "small-size",
        chinese: "小；尺寸、面积、数量或规模较小",
        english: "small; little in size, area, amount, or scale",
        register: "neutral",
        examples: [
          {
            thai: "ห้องพักของฉันเล็กแต่สะอาด และอยู่ใกล้สถานีรถไฟมาก",
            roman: "haawng-phak khaawng chan lek dtaae sa-aat lae yuu glai sa-thaa-nii rot-fai maak",
            chinese: "我的房间小但是干净，而且离火车站很近。",
            english: "My room is small but clean, and it is very near the train station.",
            grammarIds: ["possession-khaawng", "conjunction-contrast-reason", "core-location-yuu", "degree-basic"],
          },
        ],
        synonyms: [
          { thai: "จิ๋ว", roman: "jiu", chinese: "很小；迷你", notesZh: "口语感更强，带“ tiny/可爱地小”的感觉。" },
          { thai: "น้อย", roman: "naawy", chinese: "少；少量" },
        ],
        antonyms: [
          { vocabularyId: "yai", thai: "ใหญ่", roman: "yai", chinese: "大" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "น้อย", roman: "naawy", chinese: "少" },
            distinctionZh: "เล็ก 主要说尺寸小；น้อย 主要说数量少或程度低。",
          },
        ],
        collocations: [
          { thai: "ห้องเล็ก", roman: "haawng lek", chinese: "小房间" },
          { thai: "ตัวเล็ก", roman: "dtua lek", chinese: "个子小；体型小" },
          { thai: "เล็กกว่า", roman: "lek gwaa", chinese: "更小" },
        ],
        grammarIds: ["adjectives-as-verbs", "noun-modifiers-follow", "comparison-gwaa"],
        tags: ["adjective", "size"],
      },
      {
        id: "minor-not-serious",
        chinese: "小；问题、事情或差错不严重",
        english: "small; minor or not serious for a matter, problem, or mistake",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าพิมพ์คำผิดหนึ่งตัว นี่เป็นเรื่องเล็ก แต่ควรแก้ก่อนส่งการบ้าน",
            roman: "thaa phim kham phit nueng dtua, nii bpen rueang lek dtaae khuuan gaae gaawn song gaan-baan",
            chinese: "如果打错一个字母，这是小事，但应该在交作业前改好。",
            english: "If you type one letter wrong, it is a small matter, but you should correct it before submitting the homework.",
            grammarIds: ["condition-time-clauses", "classifiers-basic-counting", "core-be-bpen-khue", "modal-need-should"],
          },
        ],
        synonyms: [
          { thai: "เล็กน้อย", roman: "lek-naawy", chinese: "轻微；小小的" },
          { thai: "ไม่สำคัญมาก", roman: "mai sam-khan maak", chinese: "不是很重要" },
        ],
        antonyms: [
          { vocabularyId: "yai", thai: "ใหญ่", roman: "yai", chinese: "大；严重" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "เล็กน้อย", roman: "lek-naawy", chinese: "轻微" },
            distinctionZh: "เรื่องเล็ก 是“小事”；เล็กน้อย 更常作程度副词或形容“轻微”。",
          },
        ],
        collocations: [
          { thai: "เรื่องเล็ก", roman: "rueang lek", chinese: "小事" },
          { thai: "ปัญหาเล็ก", roman: "bpan-haa lek", chinese: "小问题" },
        ],
        grammarIds: ["core-be-bpen-khue", "adjectives-as-verbs"],
        tags: ["adjective", "importance"],
      },
    ],
    synonyms: [
      { thai: "จิ๋ว", roman: "jiu", chinese: "很小；迷你" },
      { thai: "เล็กน้อย", roman: "lek-naawy", chinese: "轻微；小小的" },
    ],
    antonyms: [
      { vocabularyId: "yai", thai: "ใหญ่", roman: "yai", chinese: "大" },
    ],
    comparisons: [
      {
        kind: "near-synonym",
        target: { vocabularyId: "nit-naawy", thai: "นิดหน่อย", roman: "nit-naawy", chinese: "一点点" },
        distinctionZh: "เล็ก 是形容词“小”；นิดหน่อย 是副词/数量短语“一点点”。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ใหญ่หรือเล็ก", roman: "yai rue lek", chinese: "大还是小" },
      { thai: "เล็กนิดหน่อย", roman: "lek nit-naawy", chinese: "小一点点" },
    ],
    learningNotesZh: ["เล็ก 描述名词时通常跟在名词后；想表达“少一点”时多用 นิดหน่อย 或 น้อย。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-raawn",
    vocabularyId: "raawn",
    thai: "ร้อน",
    roman: "raawn",
    chinese: "热",
    english: "hot",
    senses: [
      {
        id: "hot-temperature",
        chinese: "热；天气、食物、饮料或物体温度高",
        english: "hot; high in temperature for weather, food, drink, or objects",
        register: "neutral",
        examples: [
          {
            thai: "วันนี้อากาศร้อนมาก เราจึงต้องดื่มน้ำเย็นบ่อย ๆ และพักในห้องที่มีแอร์",
            roman: "wan-nii aa-gaat raawn maak rao jeung dtawng duuem naam yen baawy baawy lae phak nai haawng thii mii aae",
            chinese: "今天天气很热，所以我们得常喝冷水，并在有空调的房间里休息。",
            english: "The weather is very hot today, so we have to drink cold water often and rest in a room with air conditioning.",
            grammarIds: ["degree-basic", "modal-need-should", "reduplication", "relative-thii"],
          },
        ],
        synonyms: [
          { thai: "อุ่น", roman: "un", chinese: "温；暖", notesZh: "比 ร้อน 温和，常用于温水或暖天气。" },
          { thai: "ร้อนจัด", roman: "raawn-jat", chinese: "非常热；酷热" },
        ],
        antonyms: [
          { vocabularyId: "yen", thai: "เย็น", roman: "yen", chinese: "凉；冷" },
          { thai: "หนาว", roman: "naao", chinese: "冷；寒冷" },
        ],
        comparisons: [
          {
            kind: "confusable",
            target: { thai: "เผ็ด", roman: "phet", chinese: "辣" },
            distinctionZh: "ร้อน 是温度热；เผ็ด 是味道辣。英语 hot 可以同时表示两者，泰语要分开。",
          },
        ],
        collocations: [
          { thai: "อากาศร้อน", roman: "aa-gaat raawn", chinese: "天气热" },
          { thai: "น้ำร้อน", roman: "naam raawn", chinese: "热水" },
          { thai: "ร้อนมาก", roman: "raawn maak", chinese: "很热" },
        ],
        grammarIds: ["adjectives-as-verbs", "degree-basic", "comparison-gwaa"],
        tags: ["adjective", "temperature"],
      },
    ],
    synonyms: [
      { thai: "อุ่น", roman: "un", chinese: "温；暖" },
      { thai: "ร้อนจัด", roman: "raawn-jat", chinese: "酷热" },
    ],
    antonyms: [
      { vocabularyId: "yen", thai: "เย็น", roman: "yen", chinese: "凉；冷" },
      { thai: "หนาว", roman: "naao", chinese: "寒冷" },
    ],
    comparisons: [
      {
        kind: "confusable",
        target: { thai: "เผ็ด", roman: "phet", chinese: "辣" },
        distinctionZh: "พูดถึง温度用 ร้อน；พูดถึง味道辣用 เผ็ด。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "กาแฟร้อน", roman: "gaa-faae raawn", chinese: "热咖啡" },
      { thai: "ร้อนกว่า", roman: "raawn gwaa", chinese: "更热" },
    ],
    learningNotesZh: ["ร้อน 可以形容天气，也可以形容食物、饮料和物体温度；不要用它来表示“辣”。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-yen",
    vocabularyId: "yen",
    thai: "เย็น",
    roman: "yen",
    chinese: "冷；凉",
    english: "cool; cold",
    senses: [
      {
        id: "cool-cold-temperature",
        chinese: "凉；冷；温度低但不一定到寒冷",
        english: "cool or cold; low in temperature, not always freezing or harsh",
        register: "neutral",
        examples: [
          {
            thai: "ห้องนี้เย็นกว่าข้างนอก เพราะเปิดแอร์ไว้ทั้งวันและแดดไม่เข้า",
            roman: "haawng nii yen gwaa khaang-naawk phraw bpoet aae wai thang wan lae daaet mai khao",
            chinese: "这个房间比外面凉，因为空调整天开着，而且阳光照不进来。",
            english: "This room is cooler than outside because the air conditioning has been left on all day and the sun does not come in.",
            grammarIds: ["comparison-gwaa", "conjunction-contrast-reason", "time-words-context", "negation-mai"],
          },
        ],
        synonyms: [
          { thai: "เย็นสบาย", roman: "yen sa-baai", chinese: "凉爽舒服" },
          { thai: "หนาว", roman: "naao", chinese: "冷；寒冷", notesZh: "比 เย็น 更冷，常用于天气或身体感觉。" },
        ],
        antonyms: [
          { vocabularyId: "raawn", thai: "ร้อน", roman: "raawn", chinese: "热" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "หนาว", roman: "naao", chinese: "冷；寒冷" },
            distinctionZh: "เย็น 可表示凉、冷饮、冷气；หนาว 更强调寒冷或身体觉得冷。",
          },
        ],
        collocations: [
          { thai: "น้ำเย็น", roman: "naam yen", chinese: "冷水" },
          { thai: "อากาศเย็น", roman: "aa-gaat yen", chinese: "天气凉" },
          { thai: "เย็นสบาย", roman: "yen sa-baai", chinese: "凉爽舒服" },
        ],
        grammarIds: ["adjectives-as-verbs", "degree-basic", "comparison-gwaa"],
        tags: ["adjective", "temperature"],
      },
    ],
    synonyms: [
      { thai: "เย็นสบาย", roman: "yen sa-baai", chinese: "凉爽舒服" },
      { thai: "หนาว", roman: "naao", chinese: "寒冷" },
    ],
    antonyms: [
      { vocabularyId: "raawn", thai: "ร้อน", roman: "raawn", chinese: "热" },
    ],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "หนาว", roman: "naao", chinese: "寒冷" },
        distinctionZh: "เย็น 的范围从凉到冷，语气较温和；หนาว 更像“冷到不舒服/寒冷”。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "กาแฟเย็น", roman: "gaa-faae yen", chinese: "冰咖啡；冷咖啡" },
      { thai: "ตอนเย็น", roman: "dtaawn yen", chinese: "傍晚", notesZh: "เย็น 也常出现在时间词 ตอนเย็น 中。" },
    ],
    learningNotesZh: ["เย็น 可形容温度，也出现在 ตอนเย็น“傍晚”；初学时先用 น้ำเย็น、อากาศเย็น 记温度义。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-maak",
    vocabularyId: "maak",
    thai: "มาก",
    roman: "maak",
    chinese: "很；多",
    english: "very; much",
    senses: [
      {
        id: "very-degree",
        chinese: "很；非常；放在形容词或动词后加强程度",
        english: "very; placed after adjectives or verbs to intensify degree",
        register: "neutral",
        examples: [
          {
            thai: "อาหารร้านนี้อร่อยมาก แต่บางจานเผ็ดเกินไปสำหรับเด็ก",
            roman: "aa-haan raan nii a-raawy maak dtaae baang jaan phet goen bpai sam-rap dek",
            chinese: "这家店的食物很好吃，但有些菜对孩子来说太辣了。",
            english: "The food at this restaurant is very delicious, but some dishes are too spicy for children.",
            grammarIds: ["degree-basic", "degree-negatives", "conjunction-contrast-reason", "noun-modifiers-follow"],
          },
        ],
        synonyms: [
          { thai: "เหลือเกิน", roman: "leuua-goen", chinese: "极其；太", notesZh: "更有感叹语气。" },
          { thai: "จริง ๆ", roman: "jing jing", chinese: "真的；非常", notesZh: "口语中加强语气。" },
        ],
        antonyms: [
          { vocabularyId: "nit-naawy", thai: "นิดหน่อย", roman: "nit-naawy", chinese: "一点点" },
          { thai: "น้อย", roman: "naawy", chinese: "少" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "เกินไป", roman: "goen bpai", chinese: "太；过于" },
            distinctionZh: "มาก 只是程度高；เกินไป 表示超过合适范围，常带负面评价。",
          },
        ],
        collocations: [
          { thai: "ดีมาก", roman: "dii maak", chinese: "很好" },
          { thai: "ชอบมาก", roman: "chaawp maak", chinese: "很喜欢" },
          { thai: "ขอบคุณมาก", roman: "khop-khun maak", chinese: "非常感谢" },
        ],
        grammarIds: ["degree-basic", "degree-negatives"],
        tags: ["degree", "intensifier"],
      },
      {
        id: "many-much-quantity",
        chinese: "多；数量、人数或程度很多",
        english: "many or much; a large amount, number, or extent",
        register: "neutral",
        examples: [
          {
            thai: "วันนี้มีนักเรียนมากกว่าปกติ ครูจึงต้องเตรียมเก้าอี้เพิ่มอีกสิบตัว",
            roman: "wan-nii mii nak-riian maak gwaa bpa-ga-dti khruu jeung dtawng dtriiam gao-ii phoem iik sip dtua",
            chinese: "今天学生比平常多，所以老师必须再准备十把椅子。",
            english: "Today there are more students than usual, so the teacher has to prepare ten more chairs.",
            grammarIds: ["core-have-exist-mii", "comparison-gwaa", "modal-need-should", "classifiers-basic-counting"],
          },
        ],
        synonyms: [
          { thai: "เยอะ", roman: "yuh", chinese: "很多", notesZh: "口语常用，较随意。" },
          { thai: "หลาย", roman: "laai", chinese: "许多；好几个", notesZh: "常放在名词或量词前。" },
        ],
        antonyms: [
          { vocabularyId: "nit-naawy", thai: "นิดหน่อย", roman: "nit-naawy", chinese: "一点点" },
          { thai: "น้อย", roman: "naawy", chinese: "少" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "หลาย", roman: "laai", chinese: "许多；好几个" },
            distinctionZh: "มาก 常放在名词、动词或形容词后；หลาย 常放在名词或量词前，如 หลายคน。",
          },
        ],
        collocations: [
          { thai: "คนมาก", roman: "khon maak", chinese: "人多" },
          { thai: "มากกว่า", roman: "maak gwaa", chinese: "更多；比……多" },
          { thai: "เงินมาก", roman: "ngoen maak", chinese: "钱多" },
        ],
        grammarIds: ["degree-basic", "comparison-gwaa", "core-have-exist-mii"],
        tags: ["quantity", "degree"],
      },
    ],
    synonyms: [
      { thai: "เยอะ", roman: "yuh", chinese: "很多" },
      { thai: "หลาย", roman: "laai", chinese: "许多" },
    ],
    antonyms: [
      { vocabularyId: "nit-naawy", thai: "นิดหน่อย", roman: "nit-naawy", chinese: "一点点" },
      { thai: "น้อย", roman: "naawy", chinese: "少" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { thai: "หลาย", roman: "laai", chinese: "许多" },
        distinctionZh: "มาก 可表示程度“很”和数量“多”；หลาย 更专门表示可数的“许多/好几个”。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "มาก ๆ", roman: "maak maak", chinese: "非常；很多很多" },
      { thai: "ไม่มาก", roman: "mai maak", chinese: "不多；不太" },
    ],
    learningNotesZh: ["มาก 通常放在被加强的词后面：ดีมาก、ชอบมาก、คนมาก；比较级常见 มากกว่า。"],
    sourceRefs: [...GRAMMAR_REFS, ...CORE_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-nit-naawy",
    vocabularyId: "nit-naawy",
    thai: "นิดหน่อย",
    roman: "nit-naawy",
    chinese: "一点点",
    english: "a little",
    senses: [
      {
        id: "a-little-amount-degree",
        chinese: "一点点；数量、程度或能力很少",
        english: "a little; a small amount, degree, or ability",
        register: "neutral",
        examples: [
          {
            thai: "ฉันพูดไทยได้นิดหน่อย แต่ถ้าคุณพูดช้า ๆ ฉันจะเข้าใจมากขึ้น",
            roman: "chan phuut thai dai nit-naawy dtaae thaa khun phuut chaa chaa chan ja khao-jai maak kheun",
            chinese: "我会说一点点泰语，但如果你说慢一点，我会更明白。",
            english: "I can speak a little Thai, but if you speak slowly, I will understand more.",
            grammarIds: ["modal-dai-samart", "degree-basic", "conjunction-contrast-reason", "condition-time-clauses"],
          },
        ],
        synonyms: [
          { thai: "นิดเดียว", roman: "nit diaao", chinese: "只一点点", notesZh: "比 นิดหน่อย 更强调很少。" },
          { thai: "เล็กน้อย", roman: "lek-naawy", chinese: "少量；轻微" },
        ],
        antonyms: [
          { vocabularyId: "maak", thai: "มาก", roman: "maak", chinese: "很多；很" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "น้อย", roman: "naawy", chinese: "少" },
            distinctionZh: "นิดหน่อย 语气较柔和，像“一点点”；น้อย 更直接评价数量少。",
          },
        ],
        collocations: [
          { thai: "รู้นิดหน่อย", roman: "ruu nit-naawy", chinese: "知道一点点" },
          { thai: "กินนิดหน่อย", roman: "gin nit-naawy", chinese: "吃一点点" },
          { thai: "ช้าลงนิดหน่อย", roman: "chaa long nit-naawy", chinese: "慢一点点" },
        ],
        grammarIds: ["degree-basic", "modal-dai-samart", "comparison-gwaa"],
        tags: ["degree", "small-amount"],
      },
    ],
    synonyms: [
      { thai: "นิดเดียว", roman: "nit diaao", chinese: "只一点点" },
      { thai: "เล็กน้อย", roman: "lek-naawy", chinese: "少量；轻微" },
    ],
    antonyms: [
      { vocabularyId: "maak", thai: "มาก", roman: "maak", chinese: "很多；很" },
    ],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "หน่อย", roman: "naawy", chinese: "一点；一下" },
        distinctionZh: "นิดหน่อย 表示数量或程度“一点点”；หน่อย 还常用来软化请求，如 ขอ...หน่อย。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "นิดหน่อยเท่านั้น", roman: "nit-naawy thao-nan", chinese: "只是一点点" },
      { thai: "เพิ่มนิดหน่อย", roman: "phoem nit-naawy", chinese: "增加一点点" },
    ],
    learningNotesZh: ["นิดหน่อย 常放在动词或形容词后面，表达一点点能力、数量或程度；语气比直接说 น้อย 柔和。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-mai-khoi",
    vocabularyId: "mai-khoi",
    thai: "ไม่ค่อย",
    roman: "mai khaawy",
    chinese: "不太；不怎么",
    english: "not really; not very",
    senses: [
      {
        id: "not-very-degree",
        chinese: "不太；放在形容词前，表示程度不高",
        english: "not very; placed before an adjective to show a low degree",
        register: "neutral",
        examples: [
          {
            thai: "ห้องนี้ไม่ค่อยเย็น เพราะแอร์เก่าและหน้าต่างปิดไม่สนิท",
            roman: "haawng nii mai khaawy yen phraw aae gao lae naa-dtaang bpit mai sa-nit",
            chinese: "这个房间不太凉，因为空调旧，而且窗户关得不严。",
            english: "This room is not very cool because the air conditioner is old and the window is not closed tightly.",
            grammarIds: ["degree-negatives", "conjunction-contrast-reason", "adjectives-as-verbs", "negation-mai"],
          },
        ],
        synonyms: [
          { thai: "ไม่มาก", roman: "mai maak", chinese: "不多；不太" },
          { thai: "ไม่ค่อยจะ", roman: "mai khaawy ja", chinese: "不太会；不怎么", notesZh: "口语中有时加强“不太”的感觉。" },
        ],
        antonyms: [
          { vocabularyId: "maak", thai: "มาก", roman: "maak", chinese: "很；非常" },
          { thai: "ค่อนข้าง", roman: "khaawn-khaang", chinese: "相当；颇" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ไม่...เลย", roman: "mai...loei", chinese: "一点也不……" },
            distinctionZh: "ไม่ค่อย 是“不太”；ไม่...เลย 是“一点也不”，否定更强。",
          },
        ],
        collocations: [
          { thai: "ไม่ค่อยดี", roman: "mai khaawy dii", chinese: "不太好" },
          { thai: "ไม่ค่อยร้อน", roman: "mai khaawy raawn", chinese: "不太热" },
        ],
        grammarIds: ["degree-negatives", "negation-mai", "adjectives-as-verbs"],
        tags: ["degree", "negation"],
      },
      {
        id: "not-often-not-really",
        chinese: "不怎么；不常；放在动词前，表示频率低或意愿不强",
        english: "not really or not often; placed before a verb to show low frequency or weak inclination",
        register: "neutral",
        examples: [
          {
            thai: "ช่วงนี้ฉันไม่ค่อยอ่านหนังสือตอนกลางคืน เพราะต้องตื่นเช้ามากไปทำงาน",
            roman: "chuang nii chan mai khaawy aan nang-sue dtaawn glaang-khuen phraw dtawng dteun chaao maak bpai tham-ngaan",
            chinese: "最近我不太在晚上看书，因为必须很早起床去上班。",
            english: "These days I do not often read at night because I have to wake up very early to go to work.",
            grammarIds: ["time-words-context", "degree-negatives", "conjunction-contrast-reason", "modal-need-should"],
          },
        ],
        synonyms: [
          { thai: "ไม่บ่อย", roman: "mai baawy", chinese: "不常" },
          { thai: "ไม่ค่อยจะ", roman: "mai khaawy ja", chinese: "不太会；不怎么" },
        ],
        antonyms: [
          { thai: "บ่อย", roman: "baawy", chinese: "常常" },
          { vocabularyId: "maak", thai: "มาก", roman: "maak", chinese: "很多；很" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ไม่", roman: "mai", chinese: "不" },
            distinctionZh: "ไม่ 直接否定；ไม่ค่อย 留有余地，表示“不太/不怎么/不常”。",
          },
        ],
        collocations: [
          { thai: "ไม่ค่อยไป", roman: "mai khaawy bpai", chinese: "不怎么去" },
          { thai: "ไม่ค่อยกิน", roman: "mai khaawy gin", chinese: "不怎么吃" },
        ],
        grammarIds: ["degree-negatives", "negation-mai", "adverbs-frequency"],
        tags: ["frequency", "negation"],
      },
    ],
    synonyms: [
      { thai: "ไม่มาก", roman: "mai maak", chinese: "不多；不太" },
      { thai: "ไม่บ่อย", roman: "mai baawy", chinese: "不常" },
    ],
    antonyms: [
      { vocabularyId: "maak", thai: "มาก", roman: "maak", chinese: "很；很多" },
      { thai: "บ่อย", roman: "baawy", chinese: "常常" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { thai: "ไม่...เลย", roman: "mai...loei", chinese: "一点也不……" },
        distinctionZh: "ไม่ค่อย 是弱否定；ไม่...เลย 是强否定。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ไม่ค่อยเข้าใจ", roman: "mai khaawy khao-jai", chinese: "不太明白" },
      { thai: "ไม่ค่อยมีเวลา", roman: "mai khaawy mii wee-laa", chinese: "不太有时间" },
    ],
    learningNotesZh: ["ไม่ค่อย 放在形容词或动词前，比直接 ไม่ 更委婉；常翻译成“不太、不怎么、不常”。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-mai-question",
    vocabularyId: "mai-question",
    thai: "ไหม",
    roman: "mai",
    chinese: "吗（是否疑问）",
    english: "yes/no question particle",
    senses: [
      {
        id: "yes-no-question-particle",
        chinese: "吗；放在陈述句末尾，把句子变成是否疑问句",
        english: "a yes/no question particle placed at the end of a statement",
        register: "neutral",
        examples: [
          {
            thai: "คุณอยากดื่มน้ำเย็นไหมครับ ถ้าอากาศร้อนมาก",
            roman: "khun yaak duuem naam yen mai khrap thaa aa-gaat raawn maak",
            chinese: "天气很热的话，你想喝冷水吗？",
            english: "Would you like to drink cold water if the weather is very hot?",
            grammarIds: ["yes-no-mai", "want-like-preference", "polite-particles", "condition-time-clauses"],
          },
        ],
        synonyms: [
          { thai: "หรือเปล่า", roman: "rue-bplaao", chinese: "吗；是不是", notesZh: "语气较开放，也常用于确认。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "confusable",
            target: { thai: "ไม่", roman: "mai", chinese: "不" },
            distinctionZh: "ไหม 是句末疑问词；ไม่ 是否定词，放在动词或形容词前。两者拼写和声调不同。",
          },
          {
            kind: "grammar-pair",
            target: { thai: "ใช่ไหม", roman: "chai mai", chinese: "对吗；是不是" },
            distinctionZh: "ไหม 用于一般是否问题；ใช่ไหม 更像“对吗”，通常说话者已有预期答案。",
          },
        ],
        collocations: [
          { thai: "ดีไหม", roman: "dii mai", chinese: "好吗" },
          { thai: "ไปไหม", roman: "bpai mai", chinese: "去吗" },
          { thai: "ได้ไหม", roman: "dai mai", chinese: "可以吗" },
        ],
        grammarIds: ["yes-no-mai", "tag-chai-mai", "polite-particles"],
        tags: ["particle", "question"],
      },
    ],
    synonyms: [
      { thai: "หรือเปล่า", roman: "rue-bplaao", chinese: "吗；是不是" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "confusable",
        target: { thai: "ไม่", roman: "mai", chinese: "不" },
        distinctionZh: "Romanization 都写 mai，但 ไหม 是疑问，ไม่ 是否定；听力和拼写都要分开记。",
      },
    ],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "ไหมครับ", roman: "mai khrap", chinese: "吗（男性礼貌）" },
      { thai: "ไหมคะ", roman: "mai kha", chinese: "吗（女性礼貌）" },
    ],
    learningNotesZh: ["用 ไหม 提问时，回答通常重复主要动词或形容词：หิวไหม? หิว / ไม่หิว。"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-rue",
    vocabularyId: "rue",
    thai: "หรือ",
    roman: "rue",
    chinese: "或者；还是",
    english: "or",
    senses: [
      {
        id: "or-alternative",
        chinese: "或者；还是；连接两个或多个选择",
        english: "or; connects two or more alternatives",
        register: "neutral",
        examples: [
          {
            thai: "ตอนเช้าคุณอยากดื่มชา หรือ กาแฟ ก่อนเริ่มเรียนภาษาไทย",
            roman: "dtaawn chaao khun yaak duuem chaa rue gaa-faae gaawn roem riian phaa-saa thai",
            chinese: "早上开始学泰语前，你想喝茶还是咖啡？",
            english: "In the morning, would you like to drink tea or coffee before starting Thai class?",
            grammarIds: ["alternative-rue-rueplao", "want-like-preference", "time-words-context"],
          },
        ],
        synonyms: [
          { thai: "หรือว่า", roman: "rue waa", chinese: "或者说；还是", notesZh: "常用于提出另一个可能性。" },
        ],
        antonyms: [
          { thai: "และ", roman: "lae", chinese: "和；以及" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "และ", roman: "lae", chinese: "和" },
            distinctionZh: "หรือ 表示二选一或多选一；และ 表示并列相加。",
          },
        ],
        collocations: [
          { thai: "ชา หรือ กาแฟ", roman: "chaa rue gaa-faae", chinese: "茶还是咖啡" },
          { thai: "ใหญ่หรือเล็ก", roman: "yai rue lek", chinese: "大还是小" },
        ],
        grammarIds: ["alternative-rue-rueplao", "conjunction-and-with"],
        tags: ["conjunction", "choice"],
      },
      {
        id: "confirmation-in-rue-bplaao",
        chinese: "用于 หรือเปล่า 等结构，提出较开放的确认问题",
        english: "used in forms like หรือเปล่า to ask an open confirmation question",
        register: "neutral",
        examples: [
          {
            thai: "พรุ่งนี้คุณว่างหรือเปล่า ถ้าว่างเราไปตลาดใหญ่ด้วยกันได้ไหม",
            roman: "phrung-nii khun waang rue-bplaao thaa waang rao bpai dta-laat yai duai gan dai mai",
            chinese: "你明天有空吗？如果有空，我们可以一起去大市场吗？",
            english: "Are you free tomorrow? If you are, can we go to the big market together?",
            grammarIds: ["alternative-rue-rueplao", "condition-time-clauses", "motion-direction-verbs", "yes-no-mai"],
          },
        ],
        synonyms: [
          { vocabularyId: "mai-question", thai: "ไหม", roman: "mai", chinese: "吗" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "mai-question", thai: "ไหม", roman: "mai", chinese: "吗" },
            distinctionZh: "ไหม 是最基础的是否疑问；หรือเปล่า 常感觉更开放，像“是不是/有没有”。",
          },
        ],
        collocations: [
          { thai: "หรือเปล่า", roman: "rue-bplaao", chinese: "吗；是不是" },
          { thai: "หรือยัง", roman: "rue yang", chinese: "……了吗；还是还没" },
        ],
        grammarIds: ["alternative-rue-rueplao", "yes-no-mai"],
        tags: ["question", "confirmation"],
      },
    ],
    synonyms: [
      { thai: "หรือว่า", roman: "rue waa", chinese: "或者说；还是" },
      { thai: "หรือเปล่า", roman: "rue-bplaao", chinese: "吗；是不是" },
    ],
    antonyms: [
      { thai: "และ", roman: "lae", chinese: "和；以及" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { thai: "และ", roman: "lae", chinese: "和；以及" },
        distinctionZh: "หรือ 用于选择；และ 用于累加。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "A หรือ B", roman: "A rue B", chinese: "A 或 B" },
      { thai: "ใช่หรือไม่", roman: "chai rue mai", chinese: "是否；是不是", notesZh: "较正式的“是否”表达。" },
    ],
    learningNotesZh: ["หรือ 连接选择时相当于“还是/或者”；在 หรือเปล่า 里则帮助构成确认问题。"],
    sourceRefs: [...GRAMMAR_REFS, "thai-reference-questions"],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-beginner-06-tham-mai",
    vocabularyId: "tham-mai",
    thai: "ทำไม",
    roman: "tham-mai",
    chinese: "为什么",
    english: "why",
    senses: [
      {
        id: "why-reason-question",
        chinese: "为什么；询问原因、理由或动机",
        english: "why; asks for a reason, cause, or motive",
        register: "neutral",
        examples: [
          {
            thai: "ทำไมวันนี้คุณมาเรียนสายครับ ถ้ารถติดมาก ครูจะเข้าใจ",
            roman: "tham-mai wan-nii khun maa riian saai khrap thaa rot-dtit maak khruu ja khao-jai",
            chinese: "你今天为什么上课迟到了？如果堵车很严重，老师会理解。",
            english: "Why did you come late to class today? If traffic was very bad, the teacher will understand.",
            grammarIds: ["wh-questions", "polite-particles", "condition-time-clauses", "future-ja"],
          },
        ],
        synonyms: [
          { thai: "เพราะอะไร", roman: "phraw arai", chinese: "因为什么" },
          { thai: "เหตุใด", roman: "heet-dai", chinese: "为何", notesZh: "更正式或书面。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "เพราะอะไร", roman: "phraw arai", chinese: "因为什么" },
            distinctionZh: "ทำไม 是最常用的“为什么”；เพราะอะไร 字面像“因为什么”，也常问原因。",
          },
        ],
        collocations: [
          { thai: "ทำไมถึง...", roman: "tham-mai thueng...", chinese: "为什么会……" },
          { thai: "ทำไมครับ", roman: "tham-mai khrap", chinese: "为什么（男性礼貌）" },
          { thai: "ทำไมคะ", roman: "tham-mai kha", chinese: "为什么（女性礼貌）" },
        ],
        grammarIds: ["wh-questions", "conjunction-contrast-reason", "polite-particles"],
        tags: ["question-word", "reason"],
      },
      {
        id: "why-not-suggestion",
        chinese: "为什么不……；可询问未做某事的原因，也可轻轻提出建议",
        english: "why not; asks why something is not done and can gently suggest an action",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าคุณอยากจำคำใหม่ ทำไมไม่เขียนประโยคสั้น ๆ วันละสามประโยคล่ะ",
            roman: "thaa khun yaak jam kham mai tham-mai mai khiian bpra-yook san san wan la saam bpra-yook la",
            chinese: "如果你想记住新词，为什么不每天写三个短句呢？",
            english: "If you want to remember new words, why not write three short sentences a day?",
            grammarIds: ["condition-time-clauses", "want-like-preference", "wh-questions", "negation-mai"],
          },
        ],
        synonyms: [
          { thai: "ลอง...ไหม", roman: "laawng...mai", chinese: "试着……好吗", notesZh: "建议语气更柔和。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ลอง...ไหม", roman: "laawng...mai", chinese: "试着……好吗" },
            distinctionZh: "ทำไมไม่... 可能像追问原因，也可能像建议；ลอง...ไหม 更明确是温和建议。",
          },
        ],
        collocations: [
          { thai: "ทำไมไม่ไป", roman: "tham-mai mai bpai", chinese: "为什么不去" },
          { thai: "ทำไมไม่ลอง", roman: "tham-mai mai laawng", chinese: "为什么不试试" },
        ],
        grammarIds: ["wh-questions", "negation-mai", "yes-no-mai"],
        tags: ["question-word", "suggestion"],
      },
    ],
    synonyms: [
      { thai: "เพราะอะไร", roman: "phraw arai", chinese: "因为什么" },
      { thai: "เหตุใด", roman: "heet-dai", chinese: "为何" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { thai: "เพราะ", roman: "phraw", chinese: "因为" },
        distinctionZh: "ทำไม 用来问原因；เพราะ 用来回答原因。",
      },
    ],
    registers: ["neutral", "polite"],
    collocations: [
      { thai: "ทำไมถึง", roman: "tham-mai thueng", chinese: "为什么会" },
      { thai: "ทำไมไม่", roman: "tham-mai mai", chinese: "为什么不" },
    ],
    learningNotesZh: ["ทำไม 常放在句首；回答原因时常用 เพราะ。ทำไมไม่... 需要注意语气，可能听起来像追问或建议。"],
    sourceRefs: QUESTION_REFS,
    reviewStatus: "human-draft",
  },
] satisfies VocabularyEnrichment[];
