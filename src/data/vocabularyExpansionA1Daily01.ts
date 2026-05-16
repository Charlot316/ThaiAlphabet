export type VocabularyExpansionPartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "phrase";

export type VocabularyExpansionLevel = "a1" | "a2";

export type VocabularyExpansionTheme =
  | "home"
  | "family"
  | "body"
  | "clothing"
  | "weather"
  | "objects"
  | "daily-action"
  | "quality";

export type VocabularyExpansionReviewStatus = "candidate-draft";

export type VocabularyExpansionExample = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionRelated = {
  thai: string;
  roman: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionComparison = {
  kind: "near-synonym" | "antonym" | "confusable" | "usage" | "register";
  target: VocabularyExpansionRelated;
  distinctionZh: string;
};

export type VocabularyExpansionCollocation = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionExample[];
  synonyms: VocabularyExpansionRelated[];
  antonyms: VocabularyExpansionRelated[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  tags: string[];
};

export type VocabularyExpansionCandidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  level: VocabularyExpansionLevel;
  priority: number;
  senses: VocabularyExpansionSense[];
  synonyms: VocabularyExpansionRelated[];
  antonyms: VocabularyExpansionRelated[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: VocabularyExpansionReviewStatus;
};

const DAILY_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];
const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar"];

export const VOCABULARY_EXPANSION_A1_DAILY_01 = [
  {
    id: "bpra-dtuu",
    thai: "ประตู",
    roman: "bpra-dtuu",
    chinese: "门",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 1,
    senses: [
      {
        id: "door",
        chinese: "门；房间、房子或建筑物的出入口",
        examples: [
          {
            thai: "ก่อนออกจากบ้าน พ่อปิดประตูและตรวจดูกุญแจอีกครั้ง",
            roman: "gaawn aawk jaak baan, phaaw bpit bpra-dtuu lae dtruat duu goon-jaae iik khrang",
            chinese: "出门前，爸爸关上门并又检查了一次钥匙。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "หน้าต่าง", roman: "naa-dtaang", chinese: "窗户" },
            distinctionZh: "ประตู 是供人进出的门；หน้าต่าง 是通风、采光或看外面的窗户。",
          },
        ],
        collocations: [
          { thai: "เปิดประตู", roman: "bpoet bpra-dtuu", chinese: "开门" },
          { thai: "ปิดประตู", roman: "bpit bpra-dtuu", chinese: "关门" },
        ],
        tags: ["home", "object"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [
      {
        kind: "usage",
        target: { thai: "หน้าต่าง", roman: "naa-dtaang", chinese: "窗户" },
        distinctionZh: "门用于进出，窗户通常用于通风、采光或观察外面。",
      },
    ],
    collocations: [
      { thai: "ประตูบ้าน", roman: "bpra-dtuu baan", chinese: "家门" },
      { thai: "ประตูห้อง", roman: "bpra-dtuu haawng", chinese: "房间门" },
    ],
    tags: ["home", "object", "building-part"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naa-dtaang",
    thai: "หน้าต่าง",
    roman: "naa-dtaang",
    chinese: "窗户",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 2,
    senses: [
      {
        id: "window",
        chinese: "窗户；墙上可开关、透光或通风的部分",
        examples: [
          {
            thai: "ตอนเช้าแม่เปิดหน้าต่างให้ลมเข้าห้องก่อนทำความสะอาด",
            roman: "dtaawn chaao maae bpoet naa-dtaang hai lom khao haawng gaawn tham-khwaam-sa-aat",
            chinese: "早上妈妈先打开窗户让风进房间，然后打扫。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ประตู", roman: "bpra-dtuu", chinese: "门" },
            distinctionZh: "หน้าต่าง 是窗户；ประตู 是门，不要把“开窗”和“开门”混用。",
          },
        ],
        collocations: [
          { thai: "เปิดหน้าต่าง", roman: "bpoet naa-dtaang", chinese: "开窗" },
          { thai: "ปิดหน้าต่าง", roman: "bpit naa-dtaang", chinese: "关窗" },
        ],
        tags: ["home", "object"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "หน้าต่างห้อง", roman: "naa-dtaang haawng", chinese: "房间窗户" },
      { thai: "ข้างหน้าต่าง", roman: "khaang naa-dtaang", chinese: "窗边" },
    ],
    tags: ["home", "object", "building-part"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dto",
    thai: "โต๊ะ",
    roman: "dto",
    chinese: "桌子",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 3,
    senses: [
      {
        id: "table-desk",
        chinese: "桌子；用于吃饭、学习或放东西的家具",
        examples: [
          {
            thai: "นักเรียนวางหนังสือภาษาไทยและปากกาไว้บนโต๊ะก่อนเริ่มเรียน",
            roman: "nak-riian waang nang-sue phaa-saa thai lae bpaak-gaa wai bon dto gaawn roem riian",
            chinese: "学生开始上课前把泰语书和笔放在桌子上。",
          },
        ],
        synonyms: [
          { thai: "โต๊ะเรียน", roman: "dto riian", chinese: "学习桌；课桌" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "เก้าอี้", roman: "gao-ii", chinese: "椅子" },
            distinctionZh: "โต๊ะ 用来放东西或工作；เก้าอี้ 用来坐。",
          },
        ],
        collocations: [
          { thai: "บนโต๊ะ", roman: "bon dto", chinese: "在桌上" },
          { thai: "โต๊ะกินข้าว", roman: "dto gin khaao", chinese: "餐桌" },
        ],
        tags: ["home", "furniture"],
      },
    ],
    synonyms: [{ thai: "โต๊ะเรียน", roman: "dto riian", chinese: "学习桌；课桌" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "วางบนโต๊ะ", roman: "waang bon dto", chinese: "放在桌上" },
      { thai: "ใต้โต๊ะ", roman: "dtai dto", chinese: "桌子下面" },
    ],
    tags: ["home", "object", "furniture"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "gao-ii",
    thai: "เก้าอี้",
    roman: "gao-ii",
    chinese: "椅子",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 4,
    senses: [
      {
        id: "chair",
        chinese: "椅子；一个人坐的家具",
        examples: [
          {
            thai: "ในห้องเรียนมีเก้าอี้ไม่พอ ครูจึงเอาเก้าอี้จากห้องข้าง ๆ มาเพิ่ม",
            roman: "nai haawng-riian mii gao-ii mai phaaw, khruu jeung ao gao-ii jaak haawng khaang khaang maa phoem",
            chinese: "教室里的椅子不够，所以老师从旁边的房间多拿了几把来。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "โต๊ะ", roman: "dto", chinese: "桌子" },
            distinctionZh: "เก้าอี้ 是椅子，常和 นั่ง“坐”搭配；โต๊ะ 是桌子，常和 วาง“放”搭配。",
          },
        ],
        collocations: [
          { thai: "นั่งเก้าอี้", roman: "nang gao-ii", chinese: "坐椅子" },
          { thai: "เก้าอี้ว่าง", roman: "gao-ii waang", chinese: "空椅子" },
        ],
        tags: ["home", "furniture"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "เก้าอี้หนึ่งตัว", roman: "gao-ii nueng dtua", chinese: "一把椅子" },
      { thai: "หลังเก้าอี้", roman: "lang gao-ii", chinese: "椅背；椅子后面" },
    ],
    tags: ["home", "object", "furniture"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtiiang",
    thai: "เตียง",
    roman: "dtiiang",
    chinese: "床",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 5,
    senses: [
      {
        id: "bed-frame",
        chinese: "床；睡觉用的家具",
        examples: [
          {
            thai: "หลังทำงานทั้งวัน เขาวางโทรศัพท์ไว้ข้างเตียงแล้วนอนทันที",
            roman: "lang tham-ngaan thang wan, khao waang thoo-ra-sap wai khaang dtiiang laaeo naawn than-thii",
            chinese: "工作了一整天后，他把手机放在床边就马上睡了。",
          },
        ],
        synonyms: [
          { thai: "ที่นอน", roman: "thii-naawn", chinese: "床垫；睡觉的地方" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ที่นอน", roman: "thii-naawn", chinese: "床垫；睡觉处" },
            distinctionZh: "เตียง 更像“床架/床”这个家具；ที่นอน 可指床垫或睡觉的地方。",
          },
        ],
        collocations: [
          { thai: "ข้างเตียง", roman: "khaang dtiiang", chinese: "床边" },
          { thai: "บนเตียง", roman: "bon dtiiang", chinese: "在床上" },
        ],
        tags: ["home", "furniture", "sleep"],
      },
    ],
    synonyms: [{ thai: "ที่นอน", roman: "thii-naawn", chinese: "床垫；睡觉的地方" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "เตียงนอน", roman: "dtiiang naawn", chinese: "睡床" },
      { thai: "จัดเตียง", roman: "jat dtiiang", chinese: "整理床铺" },
    ],
    tags: ["home", "object", "sleep"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thii-naawn",
    thai: "ที่นอน",
    roman: "thii-naawn",
    chinese: "床垫；睡觉的地方",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 6,
    senses: [
      {
        id: "mattress-sleeping-place",
        chinese: "床垫；睡觉用的垫子或地方",
        examples: [
          {
            thai: "แม่เอาผ้าห่มไปวางบนที่นอน เพราะคืนนี้อากาศหนาวกว่าปกติ",
            roman: "maae ao phaa-hom bpai waang bon thii-naawn phraw kheun nii aa-gaat naao gwaa bpa-ga-dti",
            chinese: "妈妈把毯子放到床垫上，因为今晚天气比平常冷。",
          },
        ],
        synonyms: [{ thai: "ฟูก", roman: "fuuk", chinese: "床垫；垫褥" }],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "เตียง", roman: "dtiiang", chinese: "床" },
            distinctionZh: "ที่นอน 更强调睡觉的垫子或位置；เตียง 是床这个家具。",
          },
        ],
        collocations: [
          { thai: "บนที่นอน", roman: "bon thii-naawn", chinese: "在床垫/床上" },
          { thai: "ปูที่นอน", roman: "bpuu thii-naawn", chinese: "铺床垫；铺床" },
        ],
        tags: ["home", "sleep"],
      },
    ],
    synonyms: [{ thai: "ฟูก", roman: "fuuk", chinese: "床垫；垫褥" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ที่นอนนุ่ม", roman: "thii-naawn num", chinese: "软床垫" },
      { thai: "เก็บที่นอน", roman: "gep thii-naawn", chinese: "收拾床铺" },
    ],
    tags: ["home", "object", "sleep"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "maawn",
    thai: "หมอน",
    roman: "maawn",
    chinese: "枕头",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 7,
    senses: [
      {
        id: "pillow",
        chinese: "枕头；睡觉时垫头的物品",
        examples: [
          {
            thai: "ถ้าหมอนสูงเกินไป ฉันจะปวดคอหลังตื่นนอนตอนเช้า",
            roman: "thaa maawn suung gern bpai, chan ja bpuat khaaw lang dteun naawn dtaawn chaao",
            chinese: "如果枕头太高，我早上醒来后会脖子疼。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [],
        collocations: [
          { thai: "ปลอกหมอน", roman: "bplaawk maawn", chinese: "枕套" },
          { thai: "หมอนนุ่ม", roman: "maawn num", chinese: "软枕头" },
        ],
        tags: ["home", "sleep"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "หนุนหมอน", roman: "nun maawn", chinese: "枕着枕头" },
      { thai: "ซักปลอกหมอน", roman: "sak bplaawk maawn", chinese: "洗枕套" },
    ],
    tags: ["home", "object", "sleep"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phaa-hom",
    thai: "ผ้าห่ม",
    roman: "phaa-hom",
    chinese: "毯子；被子",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 8,
    senses: [
      {
        id: "blanket",
        chinese: "毯子；睡觉或保暖时盖在身上的布",
        examples: [
          {
            thai: "คืนนี้ฝนตกและอากาศหนาว น้องจึงเอาผ้าห่มอีกผืนมาให้พี่สาว",
            roman: "kheun nii fon dtok lae aa-gaat naao, naawng jeung ao phaa-hom iik phuen maa hai phii-saao",
            chinese: "今晚下雨而且天气冷，弟弟/妹妹又拿了一条毯子给姐姐。",
          },
        ],
        synonyms: [
          { thai: "ผ้านวม", roman: "phaa-nuam", chinese: "棉被；厚被子" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ผ้าเช็ดตัว", roman: "phaa-chet-dtua", chinese: "毛巾；浴巾" },
            distinctionZh: "ผ้าห่ม 用来盖；ผ้าเช็ดตัว 用来擦身体。",
          },
        ],
        collocations: [
          { thai: "ห่มผ้า", roman: "hom phaa", chinese: "盖毯子/被子" },
          { thai: "ผ้าห่มอุ่น", roman: "phaa-hom un", chinese: "暖和的毯子" },
        ],
        tags: ["home", "sleep", "weather"],
      },
    ],
    synonyms: [{ thai: "ผ้านวม", roman: "phaa-nuam", chinese: "棉被；厚被子" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ซักผ้าห่ม", roman: "sak phaa-hom", chinese: "洗毯子/被子" },
      { thai: "เอาผ้าห่มมา", roman: "ao phaa-hom maa", chinese: "拿毯子来" },
    ],
    tags: ["home", "object", "sleep"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtuu-yen",
    thai: "ตู้เย็น",
    roman: "dtuu-yen",
    chinese: "冰箱",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 9,
    senses: [
      {
        id: "refrigerator",
        chinese: "冰箱；用来冷藏食物和饮料的家电",
        examples: [
          {
            thai: "แม่เก็บนมและผลไม้ไว้ในตู้เย็น เพื่อให้เด็ก ๆ กินได้พรุ่งนี้เช้า",
            roman: "maae gep nom lae phon-la-maai wai nai dtuu-yen phuea hai dek dek gin dai phrung-nii chaao",
            chinese: "妈妈把牛奶和水果放在冰箱里，好让孩子们明天早上可以吃。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ตู้", roman: "dtuu", chinese: "柜子" },
            distinctionZh: "ตู้เย็น 是冰箱；ตู้ 单独说通常是柜子。",
          },
        ],
        collocations: [
          { thai: "ในตู้เย็น", roman: "nai dtuu-yen", chinese: "在冰箱里" },
          { thai: "เปิดตู้เย็น", roman: "bpoet dtuu-yen", chinese: "打开冰箱" },
        ],
        tags: ["home", "appliance", "food"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ของในตู้เย็น", roman: "khaawng nai dtuu-yen", chinese: "冰箱里的东西" },
      { thai: "ตู้เย็นเสีย", roman: "dtuu-yen siia", chinese: "冰箱坏了" },
    ],
    tags: ["home", "object", "appliance"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phat-lom",
    thai: "พัดลม",
    roman: "phat-lom",
    chinese: "电风扇",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 10,
    senses: [
      {
        id: "electric-fan",
        chinese: "电风扇；让空气流动、降温的家电",
        examples: [
          {
            thai: "วันนี้อากาศร้อนมาก พี่ชายจึงเปิดพัดลมในห้องรับแขกทั้งบ่าย",
            roman: "wan-nii aa-gaat raawn maak, phii-chaai jeung bpoet phat-lom nai haawng rap-khaaek thang baai",
            chinese: "今天天气很热，哥哥所以下午一直开着客厅的电风扇。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ลม", roman: "lom", chinese: "风" },
            distinctionZh: "พัดลม 是电风扇；ลม 是自然或一般的风。",
          },
        ],
        collocations: [
          { thai: "เปิดพัดลม", roman: "bpoet phat-lom", chinese: "开风扇" },
          { thai: "ปิดพัดลม", roman: "bpit phat-lom", chinese: "关风扇" },
        ],
        tags: ["home", "appliance", "weather"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "พัดลมตั้งโต๊ะ", roman: "phat-lom dtang dto", chinese: "台式风扇" },
      { thai: "ลมจากพัดลม", roman: "lom jaak phat-lom", chinese: "风扇吹出的风" },
    ],
    tags: ["home", "object", "appliance"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "fai",
    thai: "ไฟ",
    roman: "fai",
    chinese: "灯；电；火",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 11,
    senses: [
      {
        id: "light-electricity",
        chinese: "灯；电，日常常指房间里的灯或电力",
        examples: [
          {
            thai: "ก่อนนอนน้องปิดไฟในห้อง แต่ยังชาร์จโทรศัพท์ไว้ข้างเตียง",
            roman: "gaawn naawn naawng bpit fai nai haawng dtaae yang chaat thoo-ra-sap wai khaang dtiiang",
            chinese: "睡前弟弟/妹妹关了房间的灯，但还把手机放在床边充电。",
          },
        ],
        synonyms: [
          { thai: "แสงไฟ", roman: "saaeng fai", chinese: "灯光" },
        ],
        antonyms: [{ thai: "ความมืด", roman: "khwaam-mueut", chinese: "黑暗" }],
        comparisons: [
          {
            kind: "confusable",
            target: { thai: "ไฟไหม้", roman: "fai mai", chinese: "着火；火灾" },
            distinctionZh: "ไฟ 可指灯或电；ไฟไหม้ 是“着火/火灾”，语义更危险。",
          },
        ],
        collocations: [
          { thai: "เปิดไฟ", roman: "bpoet fai", chinese: "开灯" },
          { thai: "ปิดไฟ", roman: "bpit fai", chinese: "关灯" },
        ],
        tags: ["home", "utility"],
      },
    ],
    synonyms: [{ thai: "แสงไฟ", roman: "saaeng fai", chinese: "灯光" }],
    antonyms: [{ thai: "ความมืด", roman: "khwaam-mueut", chinese: "黑暗" }],
    comparisons: [],
    collocations: [
      { thai: "ไฟดับ", roman: "fai dap", chinese: "停电；灯灭了" },
      { thai: "ค่าไฟ", roman: "khaa fai", chinese: "电费" },
    ],
    tags: ["home", "object", "utility"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "goon-jaae",
    thai: "กุญแจ",
    roman: "goon-jaae",
    chinese: "钥匙",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 12,
    senses: [
      {
        id: "key-object",
        chinese: "钥匙；用来开锁或关锁的小物品",
        examples: [
          {
            thai: "ถ้าลืมกุญแจไว้ในบ้าน คุณต้องโทรหาแม่ก่อนกลับเข้าห้อง",
            roman: "thaa luuem goon-jaae wai nai baan, khun dtawng thoo haa maae gaawn glap khao haawng",
            chinese: "如果把钥匙忘在家里，你进房间前必须先打电话给妈妈。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [],
        collocations: [
          { thai: "กุญแจบ้าน", roman: "goon-jaae baan", chinese: "家门钥匙" },
          { thai: "ลืมกุญแจ", roman: "luuem goon-jaae", chinese: "忘带钥匙" },
        ],
        tags: ["object", "home"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "หากุญแจ", roman: "haa goon-jaae", chinese: "找钥匙" },
      { thai: "พวงกุญแจ", roman: "phuang goon-jaae", chinese: "钥匙串" },
    ],
    tags: ["objects", "home", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thang-kha-ya",
    thai: "ถังขยะ",
    roman: "thang-kha-ya",
    chinese: "垃圾桶",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 13,
    senses: [
      {
        id: "trash-bin",
        chinese: "垃圾桶；放垃圾的容器",
        examples: [
          {
            thai: "หลังทำอาหารเสร็จ แม่เอาเปลือกผลไม้ไปทิ้งในถังขยะหน้าบ้าน",
            roman: "lang tham aa-haan set, maae ao bpleuuak phon-la-maai bpai thing nai thang-kha-ya naa baan",
            chinese: "做完饭后，妈妈把水果皮扔到屋前的垃圾桶里。",
          },
        ],
        synonyms: [
          { thai: "ถังขยะ", roman: "thang-kha-ya", chinese: "垃圾桶" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ขยะ", roman: "kha-ya", chinese: "垃圾" },
            distinctionZh: "ขยะ 是垃圾本身；ถังขยะ 是装垃圾的桶。",
          },
        ],
        collocations: [
          { thai: "ทิ้งขยะ", roman: "thing kha-ya", chinese: "扔垃圾" },
          { thai: "ถังขยะเต็ม", roman: "thang-kha-ya dtem", chinese: "垃圾桶满了" },
        ],
        tags: ["home", "cleaning"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "เอาขยะไปทิ้ง", roman: "ao kha-ya bpai thing", chinese: "把垃圾拿去扔" },
      { thai: "ข้างถังขยะ", roman: "khaang thang-kha-ya", chinese: "垃圾桶旁边" },
    ],
    tags: ["home", "object", "cleaning"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "sa-buu",
    thai: "สบู่",
    roman: "sa-buu",
    chinese: "肥皂",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 14,
    senses: [
      {
        id: "soap",
        chinese: "肥皂；洗手、洗澡用的清洁用品",
        examples: [
          {
            thai: "ก่อนกินข้าว เด็ก ๆ ควรล้างมือด้วยสบู่ให้สะอาดทุกครั้ง",
            roman: "gaawn gin khaao, dek dek khuan laang mue duai sa-buu hai sa-aat thuk khrang",
            chinese: "吃饭前，孩子们每次都应该用肥皂把手洗干净。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ยาสีฟัน", roman: "yaa-sii-fan", chinese: "牙膏" },
            distinctionZh: "สบู่ 用来洗手或洗澡；ยาสีฟัน 用来刷牙。",
          },
        ],
        collocations: [
          { thai: "ล้างมือด้วยสบู่", roman: "laang mue duai sa-buu", chinese: "用肥皂洗手" },
          { thai: "สบู่ก้อน", roman: "sa-buu gaawn", chinese: "一块肥皂" },
        ],
        tags: ["hygiene", "object"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ซื้อสบู่", roman: "sue sa-buu", chinese: "买肥皂" },
      { thai: "สบู่หมด", roman: "sa-buu mot", chinese: "肥皂用完了" },
    ],
    tags: ["objects", "hygiene", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "yaa-sii-fan",
    thai: "ยาสีฟัน",
    roman: "yaa-sii-fan",
    chinese: "牙膏",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 15,
    senses: [
      {
        id: "toothpaste",
        chinese: "牙膏；刷牙时使用的清洁用品",
        examples: [
          {
            thai: "ตอนเช้าลูกบีบยาสีฟันนิดหน่อยบนแปรงสีฟันแล้วแปรงฟันเอง",
            roman: "dtaawn chaao luuk biip yaa-sii-fan nit-naawy bon bpraaeng-sii-fan laaeo bpraaeng fan eeng",
            chinese: "早上孩子自己在牙刷上挤一点牙膏，然后刷牙。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "แปรงสีฟัน", roman: "bpraaeng-sii-fan", chinese: "牙刷" },
            distinctionZh: "ยาสีฟัน 是牙膏；แปรงสีฟัน 是牙刷，常一起出现。",
          },
        ],
        collocations: [
          { thai: "บีบยาสีฟัน", roman: "biip yaa-sii-fan", chinese: "挤牙膏" },
          { thai: "หลอดยาสีฟัน", roman: "laawt yaa-sii-fan", chinese: "一管牙膏" },
        ],
        tags: ["hygiene", "object"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ยาสีฟันหมด", roman: "yaa-sii-fan mot", chinese: "牙膏用完了" },
      { thai: "ซื้อยาสีฟัน", roman: "sue yaa-sii-fan", chinese: "买牙膏" },
    ],
    tags: ["objects", "hygiene", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpraaeng-sii-fan",
    thai: "แปรงสีฟัน",
    roman: "bpraaeng-sii-fan",
    chinese: "牙刷",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 16,
    senses: [
      {
        id: "toothbrush",
        chinese: "牙刷；刷牙用的工具",
        examples: [
          {
            thai: "น้องลืมแปรงสีฟันไว้ที่โรงแรม พ่อจึงซื้ออันใหม่ให้ที่ตลาด",
            roman: "naawng luuem bpraaeng-sii-fan wai thii roong-raem, phaaw jeung sue an mai hai thii dta-laat",
            chinese: "弟弟/妹妹把牙刷忘在酒店了，所以爸爸在市场给他/她买了一支新的。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ยาสีฟัน", roman: "yaa-sii-fan", chinese: "牙膏" },
            distinctionZh: "แปรงสีฟัน 是工具；ยาสีฟัน 是挤在工具上的牙膏。",
          },
        ],
        collocations: [
          { thai: "แปรงฟัน", roman: "bpraaeng fan", chinese: "刷牙" },
          { thai: "แปรงสีฟันใหม่", roman: "bpraaeng-sii-fan mai", chinese: "新牙刷" },
        ],
        tags: ["hygiene", "object"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ใช้แปรงสีฟัน", roman: "chai bpraaeng-sii-fan", chinese: "使用牙刷" },
      { thai: "เปลี่ยนแปรงสีฟัน", roman: "bplian bpraaeng-sii-fan", chinese: "换牙刷" },
    ],
    tags: ["objects", "hygiene", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phaa-chet-dtua",
    thai: "ผ้าเช็ดตัว",
    roman: "phaa-chet-dtua",
    chinese: "浴巾；毛巾",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 17,
    senses: [
      {
        id: "body-towel",
        chinese: "浴巾；洗澡后擦身体用的毛巾",
        examples: [
          {
            thai: "หลังอาบน้ำ ลูกใช้ผ้าเช็ดตัวสะอาดเช็ดผมและตัวก่อนใส่เสื้อ",
            roman: "lang aap-naam, luuk chai phaa-chet-dtua sa-aat chet phom lae dtua gaawn sai seua",
            chinese: "洗澡后，孩子先用干净浴巾擦头发和身体，然后穿上衣。",
          },
        ],
        synonyms: [
          { thai: "ผ้าขนหนู", roman: "phaa-khon-nuu", chinese: "毛巾" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ผ้าห่ม", roman: "phaa-hom", chinese: "毯子；被子" },
            distinctionZh: "ผ้าเช็ดตัว 用来擦干身体；ผ้าห่ม 用来盖在身上保暖。",
          },
        ],
        collocations: [
          { thai: "เช็ดตัว", roman: "chet dtua", chinese: "擦身体" },
          { thai: "ผ้าเช็ดตัวสะอาด", roman: "phaa-chet-dtua sa-aat", chinese: "干净浴巾" },
        ],
        tags: ["hygiene", "object"],
      },
    ],
    synonyms: [{ thai: "ผ้าขนหนู", roman: "phaa-khon-nuu", chinese: "毛巾" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ซักผ้าเช็ดตัว", roman: "sak phaa-chet-dtua", chinese: "洗浴巾" },
      { thai: "ผ้าเช็ดตัวเปียก", roman: "phaa-chet-dtua bpiiak", chinese: "湿浴巾" },
    ],
    tags: ["objects", "hygiene", "home"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khrueang-sak-phaa",
    thai: "เครื่องซักผ้า",
    roman: "khreuuang-sak-phaa",
    chinese: "洗衣机",
    partOfSpeech: "noun",
    theme: "home",
    level: "a1",
    priority: 18,
    senses: [
      {
        id: "washing-machine",
        chinese: "洗衣机；洗衣服用的家电",
        examples: [
          {
            thai: "เครื่องซักผ้าเสีย แม่จึงต้องซักเสื้อกับกางเกงด้วยมือวันนี้",
            roman: "khreuuang-sak-phaa siia, maae jeung dtawng sak seua gap gaang-geeng duai mue wan-nii",
            chinese: "洗衣机坏了，所以妈妈今天必须手洗上衣和裤子。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ซักผ้า", roman: "sak-phaa", chinese: "洗衣服" },
            distinctionZh: "เครื่องซักผ้า 是洗衣机；ซักผ้า 是洗衣服这个动作。",
          },
        ],
        collocations: [
          { thai: "ใช้เครื่องซักผ้า", roman: "chai khreuuang-sak-phaa", chinese: "使用洗衣机" },
          { thai: "เครื่องซักผ้าเสีย", roman: "khreuuang-sak-phaa siia", chinese: "洗衣机坏了" },
        ],
        tags: ["home", "appliance", "cleaning"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "เปิดเครื่องซักผ้า", roman: "bpoet khreuuang-sak-phaa", chinese: "开洗衣机" },
      { thai: "ข้างเครื่องซักผ้า", roman: "khaang khreuuang-sak-phaa", chinese: "洗衣机旁边" },
    ],
    tags: ["home", "object", "appliance"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thuai",
    thai: "ถ้วย",
    roman: "thuai",
    chinese: "碗；杯",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 19,
    senses: [
      {
        id: "bowl-cup",
        chinese: "碗；杯状容器，可盛汤、甜品或饮料",
        examples: [
          {
            thai: "แม่ตักข้าวต้มใส่ถ้วยเล็กให้ลูกกินก่อนออกไปโรงเรียน",
            roman: "maae dtak khaao-dtom sai thuai lek hai luuk gin gaawn aawk bpai roong-riian",
            chinese: "妈妈把米粥盛进小碗里给孩子吃，然后孩子去学校。",
          },
        ],
        synonyms: [
          { thai: "ชาม", roman: "chaam", chinese: "碗" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "แก้ว", roman: "gaaeow", chinese: "杯子；杯装量词" },
            distinctionZh: "ถ้วย 常是碗状或杯状容器；แก้ว 更常指玻璃杯或杯装饮料。",
          },
        ],
        collocations: [
          { thai: "ถ้วยเล็ก", roman: "thuai lek", chinese: "小碗/小杯" },
          { thai: "ใส่ถ้วย", roman: "sai thuai", chinese: "放进碗/杯里" },
        ],
        tags: ["object", "food"],
      },
    ],
    synonyms: [{ thai: "ชาม", roman: "chaam", chinese: "碗" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ล้างถ้วย", roman: "laang thuai", chinese: "洗碗/杯" },
      { thai: "ถ้วยกาแฟ", roman: "thuai gaa-faae", chinese: "咖啡杯" },
    ],
    tags: ["objects", "food", "home"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jaan",
    thai: "จาน",
    roman: "jaan",
    chinese: "盘子；盘",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 20,
    senses: [
      {
        id: "plate-dish",
        chinese: "盘子；盛饭菜的扁平餐具，也可作盘装食物量词",
        examples: [
          {
            thai: "พี่สาวล้างจานหลังอาหารเย็น เพราะแม่ทำอาหารให้ทั้งครอบครัวแล้ว",
            roman: "phii-saao laang jaan lang aa-haan yen phraw maae tham aa-haan hai thang khraawp-khrua laaeo",
            chinese: "晚饭后姐姐洗盘子，因为妈妈已经给全家做了饭。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ถ้วย", roman: "thuai", chinese: "碗；杯" },
            distinctionZh: "จาน 通常是盘子；ถ้วย 更像碗或杯。",
          },
        ],
        collocations: [
          { thai: "ล้างจาน", roman: "laang jaan", chinese: "洗盘子；洗碗" },
          { thai: "อาหารหนึ่งจาน", roman: "aa-haan nueng jaan", chinese: "一盘食物" },
        ],
        tags: ["object", "food", "classifier"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "จานสะอาด", roman: "jaan sa-aat", chinese: "干净盘子" },
      { thai: "วางจานบนโต๊ะ", roman: "waang jaan bon dto", chinese: "把盘子放在桌上" },
    ],
    tags: ["objects", "food", "home"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "chaawn",
    thai: "ช้อน",
    roman: "chaawn",
    chinese: "勺子",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 21,
    senses: [
      {
        id: "spoon",
        chinese: "勺子；吃饭、喝汤或舀东西用的餐具",
        examples: [
          {
            thai: "คนไทยมักกินข้าวกับช้อนและส้อม ไม่ได้ใช้มีดบนโต๊ะทุกครั้ง",
            roman: "khon thai mak gin khaao gap chaawn lae saawm, mai dai chai miit bon dto thuk khrang",
            chinese: "泰国人常用勺子和叉子吃饭，并不是每次都在餐桌上用刀。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ส้อม", roman: "saawm", chinese: "叉子" },
            distinctionZh: "ช้อน 是勺子；ส้อม 是叉子，泰餐中常一起使用。",
          },
        ],
        collocations: [
          { thai: "ช้อนกับส้อม", roman: "chaawn gap saawm", chinese: "勺子和叉子" },
          { thai: "ใช้ช้อน", roman: "chai chaawn", chinese: "用勺子" },
        ],
        tags: ["object", "food"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ล้างช้อน", roman: "laang chaawn", chinese: "洗勺子" },
      { thai: "ช้อนหนึ่งคัน", roman: "chaawn nueng khan", chinese: "一把勺子" },
    ],
    tags: ["objects", "food", "home"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "saawm",
    thai: "ส้อม",
    roman: "saawm",
    chinese: "叉子",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 22,
    senses: [
      {
        id: "fork",
        chinese: "叉子；吃饭时叉或辅助食物的餐具",
        examples: [
          {
            thai: "ร้านนี้ให้ช้อนกับส้อมทุกโต๊ะ แต่ถ้าต้องการมีดต้องขอเพิ่ม",
            roman: "raan nii hai chaawn gap saawm thuk dto, dtaae thaa dtawng-gaan miit dtawng khaaw phoem",
            chinese: "这家店每张桌子都给勺子和叉子，但如果需要刀要另外要。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ช้อน", roman: "chaawn", chinese: "勺子" },
            distinctionZh: "ส้อม 是叉子；ช้อน 是勺子。泰语里常说 ช้อนกับส้อม。",
          },
        ],
        collocations: [
          { thai: "ใช้ส้อม", roman: "chai saawm", chinese: "用叉子" },
          { thai: "ช้อนกับส้อม", roman: "chaawn gap saawm", chinese: "勺子和叉子" },
        ],
        tags: ["object", "food"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ล้างส้อม", roman: "laang saawm", chinese: "洗叉子" },
      { thai: "ส้อมหนึ่งคัน", roman: "saawm nueng khan", chinese: "一把叉子" },
    ],
    tags: ["objects", "food", "home"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "miit",
    thai: "มีด",
    roman: "miit",
    chinese: "刀",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 23,
    senses: [
      {
        id: "knife",
        chinese: "刀；切东西用的工具",
        examples: [
          {
            thai: "พ่อใช้มีดเล่มเล็กหั่นผลไม้ให้ลูก แล้วเก็บมีดไว้ในครัวทันที",
            roman: "phaaw chai miit lem lek han phon-la-maai hai luuk laaeo gep miit wai nai khrua than-thii",
            chinese: "爸爸用一把小刀给孩子切水果，然后立刻把刀收进厨房。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ช้อน", roman: "chaawn", chinese: "勺子" },
            distinctionZh: "มีด 用来切；ช้อน 用来舀或吃饭。",
          },
        ],
        collocations: [
          { thai: "ใช้มีด", roman: "chai miit", chinese: "用刀" },
          { thai: "มีดเล่มเล็ก", roman: "miit lem lek", chinese: "一把小刀" },
        ],
        tags: ["object", "kitchen"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "มีดคม", roman: "miit khom", chinese: "锋利的刀" },
      { thai: "เก็บมีด", roman: "gep miit", chinese: "收刀" },
    ],
    tags: ["objects", "food", "home"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thoo-ra-sap",
    thai: "โทรศัพท์",
    roman: "thoo-ra-sap",
    chinese: "电话；手机",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 24,
    senses: [
      {
        id: "phone",
        chinese: "电话；日常常指手机",
        examples: [
          {
            thai: "ถ้าแม่มาถึงตลาดแล้ว เธอจะโทรศัพท์หาพ่อเพื่อถามว่าจะซื้ออะไรเพิ่ม",
            roman: "thaa maae maa thueng dta-laat laaeo, thuuhr ja thoo-ra-sap haa phaaw phuea thaam waa ja sue a-rai phoem",
            chinese: "如果妈妈到市场了，她会打电话给爸爸，问还要多买什么。",
          },
        ],
        synonyms: [
          { thai: "มือถือ", roman: "mue-thue", chinese: "手机", notesZh: "口语里更常指 mobile phone。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "มือถือ", roman: "mue-thue", chinese: "手机" },
            distinctionZh: "โทรศัพท์ 可泛指电话或手机；มือถือ 明确偏“手机”。",
          },
        ],
        collocations: [
          { thai: "โทรศัพท์หาแม่", roman: "thoo-ra-sap haa maae", chinese: "打电话给妈妈" },
          { thai: "ชาร์จโทรศัพท์", roman: "chaat thoo-ra-sap", chinese: "给手机充电" },
        ],
        tags: ["object", "communication"],
      },
    ],
    synonyms: [{ thai: "มือถือ", roman: "mue-thue", chinese: "手机" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "เบอร์โทรศัพท์", roman: "buuhr thoo-ra-sap", chinese: "电话号码" },
      { thai: "โทรศัพท์ของฉัน", roman: "thoo-ra-sap khaawng chan", chinese: "我的电话/手机" },
    ],
    tags: ["objects", "communication", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khaawng",
    thai: "ของ",
    roman: "khaawng",
    chinese: "东西；物品；的",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 25,
    senses: [
      {
        id: "thing-item",
        chinese: "东西；物品，泛指不具体说明的物件",
        examples: [
          {
            thai: "ก่อนออกจากโรงแรม คุณควรตรวจดูของในกระเป๋าและบนโต๊ะให้ครบ",
            roman: "gaawn aawk jaak roong-raem, khun khuan dtruat duu khaawng nai gra-bpao lae bon dto hai khrop",
            chinese: "离开酒店前，你应该检查包里和桌上的东西是否齐全。",
          },
        ],
        synonyms: [
          { thai: "สิ่งของ", roman: "sing-khaawng", chinese: "物品；东西" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "confusable",
            target: { thai: "ของฉัน", roman: "khaawng chan", chinese: "我的" },
            distinctionZh: "ของ 可作名词“东西”，也可作所属标记“的”；看后面是否接人称或名词。",
          },
        ],
        collocations: [
          { thai: "ของในกระเป๋า", roman: "khaawng nai gra-bpao", chinese: "包里的东西" },
          { thai: "ซื้อของ", roman: "sue khaawng", chinese: "买东西" },
        ],
        tags: ["object", "general"],
      },
    ],
    synonyms: [{ thai: "สิ่งของ", roman: "sing-khaawng", chinese: "物品；东西" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ของใช้", roman: "khaawng chai", chinese: "用品" },
      { thai: "เก็บของ", roman: "gep khaawng", chinese: "收拾东西" },
    ],
    tags: ["objects", "grammar-tool", "daily-life"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "naa-li-gaa",
    thai: "นาฬิกา",
    roman: "naa-li-gaa",
    chinese: "钟；手表",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 26,
    senses: [
      {
        id: "clock-watch",
        chinese: "钟；手表，用来看时间的物品",
        examples: [
          {
            thai: "นาฬิกาบนผนังบอกเวลาแปดโมงแล้ว นักเรียนจึงต้องรีบไปโรงเรียน",
            roman: "naa-li-gaa bon pha-nang baawk wee-laa bpaaet moong laaeo, nak-riian jeung dtawng riip bpai roong-riian",
            chinese: "墙上的钟显示已经八点了，所以学生必须赶快去学校。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "เวลา", roman: "wee-laa", chinese: "时间" },
            distinctionZh: "นาฬิกา 是看时间的物品；เวลา 是时间本身。",
          },
        ],
        collocations: [
          { thai: "นาฬิกาข้อมือ", roman: "naa-li-gaa khaaw-mue", chinese: "手表" },
          { thai: "นาฬิกาปลุก", roman: "naa-li-gaa bpluk", chinese: "闹钟" },
        ],
        tags: ["object", "time"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ดูนาฬิกา", roman: "duu naa-li-gaa", chinese: "看钟/表" },
      { thai: "ใส่นาฬิกา", roman: "sai naa-li-gaa", chinese: "戴手表" },
    ],
    tags: ["objects", "time", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "nang-sue",
    thai: "หนังสือ",
    roman: "nang-sue",
    chinese: "书",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 27,
    senses: [
      {
        id: "book",
        chinese: "书；阅读、学习用的印刷或电子材料",
        examples: [
          {
            thai: "ฉันอ่านหนังสือภาษาไทยก่อนนอนทุกคืน เพื่อจำคำใหม่ได้มากขึ้น",
            roman: "chan aan nang-sue phaa-saa thai gaawn naawn thuk kheun phuea jam kham mai dai maak kheun",
            chinese: "我每天晚上睡前读泰语书，为了记住更多新词。",
          },
        ],
        synonyms: [
          { thai: "ตำรา", roman: "dtam-raa", chinese: "教材；课本", notesZh: "更偏学习或专业教材。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ตำรา", roman: "dtam-raa", chinese: "教材；课本" },
            distinctionZh: "หนังสือ 是普通“书”；ตำรา 更像教材或专业书。",
          },
        ],
        collocations: [
          { thai: "อ่านหนังสือ", roman: "aan nang-sue", chinese: "读书" },
          { thai: "หนังสือภาษาไทย", roman: "nang-sue phaa-saa thai", chinese: "泰语书" },
        ],
        tags: ["object", "classroom"],
      },
    ],
    synonyms: [{ thai: "ตำรา", roman: "dtam-raa", chinese: "教材；课本" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ซื้อหนังสือ", roman: "sue nang-sue", chinese: "买书" },
      { thai: "หนังสือเล่มนี้", roman: "nang-sue lem nii", chinese: "这本书" },
    ],
    tags: ["objects", "classroom", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "din-saw",
    thai: "ดินสอ",
    roman: "din-saw",
    chinese: "铅笔",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 28,
    senses: [
      {
        id: "pencil",
        chinese: "铅笔；可擦写的书写工具",
        examples: [
          {
            thai: "เด็กเขียนคำใหม่ด้วยดินสอก่อน เพราะถ้าเขียนผิดจะลบได้ง่าย",
            roman: "dek khiian kham mai duai din-saw gaawn phraw thaa khiian phit ja lop dai ngaai",
            chinese: "孩子先用铅笔写新词，因为如果写错了可以容易擦掉。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ปากกา", roman: "bpaak-gaa", chinese: "笔；钢笔/圆珠笔" },
            distinctionZh: "ดินสอ 通常可擦；ปากกา 写出来一般不容易擦掉。",
          },
        ],
        collocations: [
          { thai: "เขียนด้วยดินสอ", roman: "khiian duai din-saw", chinese: "用铅笔写" },
          { thai: "เหลาดินสอ", roman: "lao din-saw", chinese: "削铅笔" },
        ],
        tags: ["object", "classroom"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ดินสอสั้น", roman: "din-saw san", chinese: "短铅笔" },
      { thai: "ยางลบดินสอ", roman: "yaang-lop din-saw", chinese: "橡皮擦" },
    ],
    tags: ["objects", "classroom", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpaak-gaa",
    thai: "ปากกา",
    roman: "bpaak-gaa",
    chinese: "笔；圆珠笔",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 29,
    senses: [
      {
        id: "pen",
        chinese: "笔；通常指圆珠笔、钢笔等不可轻易擦掉的书写工具",
        examples: [
          {
            thai: "ครูขอให้นักเรียนใช้ปากกาสีน้ำเงินเขียนชื่อบนกระดาษทุกแผ่น",
            roman: "khruu khaaw hai nak-riian chai bpaak-gaa sii naam-ngern khiian chue bon gra-daat thuk phaen",
            chinese: "老师请学生用蓝色笔在每张纸上写名字。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ดินสอ", roman: "din-saw", chinese: "铅笔" },
            distinctionZh: "ปากกา 写字较正式、不易擦；ดินสอ 适合练习和修改。",
          },
        ],
        collocations: [
          { thai: "ปากกาสีน้ำเงิน", roman: "bpaak-gaa sii naam-ngern", chinese: "蓝色笔" },
          { thai: "ใช้ปากกา", roman: "chai bpaak-gaa", chinese: "用笔" },
        ],
        tags: ["object", "classroom"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ปากกาหมึกดำ", roman: "bpaak-gaa muek dam", chinese: "黑墨水笔" },
      { thai: "ยืมปากกา", roman: "yueum bpaak-gaa", chinese: "借笔" },
    ],
    tags: ["objects", "classroom", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "gra-bpao",
    thai: "กระเป๋า",
    roman: "gra-bpao",
    chinese: "包；袋子",
    partOfSpeech: "noun",
    theme: "objects",
    level: "a1",
    priority: 30,
    senses: [
      {
        id: "bag",
        chinese: "包；装东西、随身携带的袋子或包",
        examples: [
          {
            thai: "ก่อนขึ้นรถ แม่ตรวจดูกระเป๋าเพื่อให้แน่ใจว่ามีกุญแจและโทรศัพท์",
            roman: "gaawn kheun rot, maae dtruat duu gra-bpao phuea hai naae-jai waa mii goon-jaae lae thoo-ra-sap",
            chinese: "上车前，妈妈检查包，确认有钥匙和手机。",
          },
        ],
        synonyms: [
          { thai: "ถุง", roman: "thung", chinese: "袋子" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ถุง", roman: "thung", chinese: "袋子" },
            distinctionZh: "กระเป๋า 通常是可随身携带的包；ถุง 更像购物袋、塑料袋等。",
          },
        ],
        collocations: [
          { thai: "กระเป๋านักเรียน", roman: "gra-bpao nak-riian", chinese: "学生书包" },
          { thai: "ในกระเป๋า", roman: "nai gra-bpao", chinese: "在包里" },
        ],
        tags: ["object", "daily-life"],
      },
    ],
    synonyms: [{ thai: "ถุง", roman: "thung", chinese: "袋子" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "เก็บของในกระเป๋า", roman: "gep khaawng nai gra-bpao", chinese: "把东西收进包里" },
      { thai: "กระเป๋าหนัก", roman: "gra-bpao nak", chinese: "包很重" },
    ],
    tags: ["objects", "travel", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "seua",
    thai: "เสื้อ",
    roman: "seua",
    chinese: "上衣；衣服",
    partOfSpeech: "noun",
    theme: "clothing",
    level: "a1",
    priority: 31,
    senses: [
      {
        id: "shirt-top",
        chinese: "上衣；穿在上半身的衣服",
        examples: [
          {
            thai: "วันนี้อากาศร้อน พี่ชายจึงใส่เสื้อบาง ๆ ไปตลาดกับแม่",
            roman: "wan-nii aa-gaat raawn, phii-chaai jeung sai seua baang baang bpai dta-laat gap maae",
            chinese: "今天天气热，哥哥所以穿薄上衣和妈妈去市场。",
          },
        ],
        synonyms: [
          { thai: "เสื้อผ้า", roman: "seua-phaa", chinese: "衣服" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "กางเกง", roman: "gaang-geeng", chinese: "裤子" },
            distinctionZh: "เสื้อ 穿在上半身；กางเกง 穿在下半身。",
          },
        ],
        collocations: [
          { thai: "ใส่เสื้อ", roman: "sai seua", chinese: "穿上衣" },
          { thai: "เสื้อสีขาว", roman: "seua sii khaao", chinese: "白色上衣" },
        ],
        tags: ["clothing", "daily-life"],
      },
    ],
    synonyms: [{ thai: "เสื้อผ้า", roman: "seua-phaa", chinese: "衣服" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ถอดเสื้อ", roman: "thaawt seua", chinese: "脱上衣" },
      { thai: "ซักเสื้อ", roman: "sak seua", chinese: "洗上衣" },
    ],
    tags: ["clothing", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "gaang-geeng",
    thai: "กางเกง",
    roman: "gaang-geeng",
    chinese: "裤子",
    partOfSpeech: "noun",
    theme: "clothing",
    level: "a1",
    priority: 32,
    senses: [
      {
        id: "pants",
        chinese: "裤子；穿在下半身的衣服",
        examples: [
          {
            thai: "กางเกงตัวนี้เล็กเกินไป พ่อจึงจะพาลูกไปซื้อกางเกงใหม่",
            roman: "gaang-geeng dtua nii lek gern bpai, phaaw jeung ja phaa luuk bpai sue gaang-geeng mai",
            chinese: "这条裤子太小了，所以爸爸会带孩子去买新裤子。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "กระโปรง", roman: "gra-bproong", chinese: "裙子" },
            distinctionZh: "กางเกง 是裤子；กระโปรง 是裙子。",
          },
        ],
        collocations: [
          { thai: "ใส่กางเกง", roman: "sai gaang-geeng", chinese: "穿裤子" },
          { thai: "กางเกงใหม่", roman: "gaang-geeng mai", chinese: "新裤子" },
        ],
        tags: ["clothing", "daily-life"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ถอดกางเกง", roman: "thaawt gaang-geeng", chinese: "脱裤子" },
      { thai: "กางเกงขายาว", roman: "gaang-geeng khaa yaao", chinese: "长裤" },
    ],
    tags: ["clothing", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "gra-bproong",
    thai: "กระโปรง",
    roman: "gra-bproong",
    chinese: "裙子",
    partOfSpeech: "noun",
    theme: "clothing",
    level: "a1",
    priority: 33,
    senses: [
      {
        id: "skirt",
        chinese: "裙子；从腰部向下穿的衣服",
        examples: [
          {
            thai: "น้องสาวใส่กระโปรงสีฟ้าไปโรงเรียน เพราะวันนี้มีงานพิเศษ",
            roman: "naawng-saao sai gra-bproong sii faa bpai roong-riian phraw wan-nii mii ngaan phi-seet",
            chinese: "妹妹穿蓝色裙子去学校，因为今天有特别活动。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "กางเกง", roman: "gaang-geeng", chinese: "裤子" },
            distinctionZh: "กระโปรง 是裙子；กางเกง 是裤子。两者都常用量词 ตัว。",
          },
        ],
        collocations: [
          { thai: "ใส่กระโปรง", roman: "sai gra-bproong", chinese: "穿裙子" },
          { thai: "กระโปรงสีฟ้า", roman: "gra-bproong sii faa", chinese: "蓝色裙子" },
        ],
        tags: ["clothing", "daily-life"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "กระโปรงยาว", roman: "gra-bproong yaao", chinese: "长裙" },
      { thai: "ซักกระโปรง", roman: "sak gra-bproong", chinese: "洗裙子" },
    ],
    tags: ["clothing", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "raawng-thaao",
    thai: "รองเท้า",
    roman: "raawng-thaao",
    chinese: "鞋",
    partOfSpeech: "noun",
    theme: "clothing",
    level: "a1",
    priority: 34,
    senses: [
      {
        id: "shoes",
        chinese: "鞋；穿在脚上保护脚的物品",
        examples: [
          {
            thai: "ฝนตกหนักมาก เด็ก ๆ จึงถอดรองเท้าไว้หน้าประตูก่อนเข้าบ้าน",
            roman: "fon dtok nak maak, dek dek jeung thaawt raawng-thaao wai naa bpra-dtuu gaawn khao baan",
            chinese: "雨下得很大，所以孩子们进屋前把鞋脱在门口。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ถุงเท้า", roman: "thung-thaao", chinese: "袜子" },
            distinctionZh: "รองเท้า 穿在最外面；ถุงเท้า 通常穿在鞋里面。",
          },
        ],
        collocations: [
          { thai: "ใส่รองเท้า", roman: "sai raawng-thaao", chinese: "穿鞋" },
          { thai: "ถอดรองเท้า", roman: "thaawt raawng-thaao", chinese: "脱鞋" },
        ],
        tags: ["clothing", "daily-life"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "รองเท้าใหม่", roman: "raawng-thaao mai", chinese: "新鞋" },
      { thai: "รองเท้าเปียก", roman: "raawng-thaao bpiiak", chinese: "湿鞋" },
    ],
    tags: ["clothing", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thung-thaao",
    thai: "ถุงเท้า",
    roman: "thung-thaao",
    chinese: "袜子",
    partOfSpeech: "noun",
    theme: "clothing",
    level: "a1",
    priority: 35,
    senses: [
      {
        id: "socks",
        chinese: "袜子；穿在脚上、通常在鞋里面的衣物",
        examples: [
          {
            thai: "ก่อนใส่รองเท้าไปโรงเรียน ลูกหาถุงเท้าสะอาดในกระเป๋าไม่เจอ",
            roman: "gaawn sai raawng-thaao bpai roong-riian, luuk haa thung-thaao sa-aat nai gra-bpao mai jooe",
            chinese: "穿鞋去学校前，孩子在包里找不到干净袜子。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "รองเท้า", roman: "raawng-thaao", chinese: "鞋" },
            distinctionZh: "ถุงเท้า 是袜子；รองเท้า 是鞋。",
          },
        ],
        collocations: [
          { thai: "ใส่ถุงเท้า", roman: "sai thung-thaao", chinese: "穿袜子" },
          { thai: "ถุงเท้าสะอาด", roman: "thung-thaao sa-aat", chinese: "干净袜子" },
        ],
        tags: ["clothing", "daily-life"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ซักถุงเท้า", roman: "sak thung-thaao", chinese: "洗袜子" },
      { thai: "ถุงเท้าคู่หนึ่ง", roman: "thung-thaao khuu nueng", chinese: "一双袜子" },
    ],
    tags: ["clothing", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "muaak",
    thai: "หมวก",
    roman: "muaak",
    chinese: "帽子",
    partOfSpeech: "noun",
    theme: "clothing",
    level: "a1",
    priority: 36,
    senses: [
      {
        id: "hat-cap",
        chinese: "帽子；戴在头上的衣物",
        examples: [
          {
            thai: "แดดแรงมาก แม่จึงให้ลูกใส่หมวกก่อนออกไปเดินตลาด",
            roman: "daaet raaeng maak, maae jeung hai luuk sai muaak gaawn aawk bpai doen dta-laat",
            chinese: "阳光很强，所以妈妈让孩子出门逛市场前戴帽子。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "แว่นตา", roman: "waaen-dtaa", chinese: "眼镜" },
            distinctionZh: "หมวก 戴在头上；แว่นตา 戴在眼睛前。",
          },
        ],
        collocations: [
          { thai: "ใส่หมวก", roman: "sai muaak", chinese: "戴帽子" },
          { thai: "ถอดหมวก", roman: "thaawt muaak", chinese: "摘帽子" },
        ],
        tags: ["clothing", "weather"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "หมวกสีดำ", roman: "muaak sii dam", chinese: "黑帽子" },
      { thai: "หมวกกันแดด", roman: "muaak gan daaet", chinese: "遮阳帽" },
    ],
    tags: ["clothing", "daily-life", "weather"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "waaen-dtaa",
    thai: "แว่นตา",
    roman: "waaen-dtaa",
    chinese: "眼镜",
    partOfSpeech: "noun",
    theme: "clothing",
    level: "a1",
    priority: 37,
    senses: [
      {
        id: "eyeglasses",
        chinese: "眼镜；戴在眼前帮助看清楚的物品",
        examples: [
          {
            thai: "คุณยายหาแว่นตาไม่เจอ จึงอ่านหนังสือพิมพ์ตอนเช้าไม่ได้",
            roman: "khun yaai haa waaen-dtaa mai jooe, jeung aan nang-sue-phim dtaawn chaao mai dai",
            chinese: "外婆找不到眼镜，所以早上不能读报纸。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ตา", roman: "dtaa", chinese: "眼睛" },
            distinctionZh: "ตา 是身体部位“眼睛”；แว่นตา 是戴在眼前的物品。",
          },
        ],
        collocations: [
          { thai: "ใส่แว่นตา", roman: "sai waaen-dtaa", chinese: "戴眼镜" },
          { thai: "ถอดแว่นตา", roman: "thaawt waaen-dtaa", chinese: "摘眼镜" },
        ],
        tags: ["clothing", "object", "body"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "แว่นตาใหม่", roman: "waaen-dtaa mai", chinese: "新眼镜" },
      { thai: "เช็ดแว่นตา", roman: "chet waaen-dtaa", chinese: "擦眼镜" },
    ],
    tags: ["clothing", "objects", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "hua",
    thai: "หัว",
    roman: "hua",
    chinese: "头",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 38,
    senses: [
      {
        id: "head",
        chinese: "头；身体最上方的部分",
        examples: [
          {
            thai: "ถ้าปวดหัวมาก คุณควรดื่มน้ำและพักผ่อนก่อนทำงานต่อ",
            roman: "thaa bpuat hua maak, khun khuan duuem naam lae phak-phaawn gaawn tham-ngaan dtaaw",
            chinese: "如果头很痛，你应该先喝水并休息，然后再继续工作。",
          },
        ],
        synonyms: [
          { thai: "ศีรษะ", roman: "sii-sa", chinese: "头；头部", notesZh: "更正式或医学/礼貌。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register",
            target: { thai: "ศีรษะ", roman: "sii-sa", chinese: "头部" },
            distinctionZh: "หัว 是日常说法；ศีรษะ 更正式、礼貌或医学化。",
          },
        ],
        collocations: [
          { thai: "ปวดหัว", roman: "bpuat hua", chinese: "头疼" },
          { thai: "สระผม", roman: "sa phom", chinese: "洗头发" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [{ thai: "ศีรษะ", roman: "sii-sa", chinese: "头部" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "หัวร้อน", roman: "hua raawn", chinese: "生气；头脑发热" },
      { thai: "เจ็บหัว", roman: "jep hua", chinese: "头疼" },
    ],
    tags: ["body", "health", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dtaa",
    thai: "ตา",
    roman: "dtaa",
    chinese: "眼睛；外公",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 39,
    senses: [
      {
        id: "eye",
        chinese: "眼睛；用来看东西的身体部位",
        examples: [
          {
            thai: "หลังอ่านหนังสือนาน ๆ ฉันพักตาโดยมองออกไปนอกหน้าต่างสักครู่",
            roman: "lang aan nang-sue naan naan, chan phak dtaa dooi maawng aawk bpai naawk naa-dtaang sak-khruu",
            chinese: "读书很久以后，我通过看向窗外一会儿来休息眼睛。",
          },
        ],
        synonyms: [
          { thai: "ดวงตา", roman: "duang-dtaa", chinese: "眼睛", notesZh: "较书面或柔和。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "confusable",
            target: { thai: "แว่นตา", roman: "waaen-dtaa", chinese: "眼镜" },
            distinctionZh: "ตา 是眼睛；แว่นตา 是眼镜。",
          },
        ],
        collocations: [
          { thai: "เจ็บตา", roman: "jep dtaa", chinese: "眼睛疼" },
          { thai: "พักตา", roman: "phak dtaa", chinese: "休息眼睛" },
        ],
        tags: ["body", "health"],
      },
      {
        id: "maternal-grandfather",
        chinese: "外公；母亲的父亲，也可作亲切称呼",
        examples: [
          {
            thai: "วันอาทิตย์แม่พาลูกไปกินข้าวกับตาและยายที่บ้านเก่า",
            roman: "wan aa-thit maae phaa luuk bpai gin khaao gap dtaa lae yaai thii baan gao",
            chinese: "星期天妈妈带孩子去老家和外公外婆吃饭。",
          },
        ],
        synonyms: [
          { thai: "คุณตา", roman: "khun dtaa", chinese: "外公；爷爷式礼貌称呼" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ปู่", roman: "bpuu", chinese: "爷爷；父亲的父亲" },
            distinctionZh: "ตา 是母亲的父亲；ปู่ 是父亲的父亲。",
          },
        ],
        collocations: [
          { thai: "คุณตา", roman: "khun dtaa", chinese: "外公（礼貌/亲切）" },
          { thai: "ตากับยาย", roman: "dtaa gap yaai", chinese: "外公和外婆" },
        ],
        tags: ["family", "kinship"],
      },
    ],
    synonyms: [
      { thai: "ดวงตา", roman: "duang-dtaa", chinese: "眼睛" },
      { thai: "คุณตา", roman: "khun dtaa", chinese: "外公" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "confusable",
        target: { thai: "ตา", roman: "dtaa", chinese: "眼睛/外公" },
        distinctionZh: "ตา 是同形词，可能是“眼睛”也可能是“外公”，要靠上下文判断。",
      },
    ],
    collocations: [
      { thai: "ตาแดง", roman: "dtaa daaeng", chinese: "眼睛红" },
      { thai: "ไปหาตา", roman: "bpai haa dtaa", chinese: "去看外公" },
    ],
    tags: ["body", "family", "homograph"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "huu",
    thai: "หู",
    roman: "huu",
    chinese: "耳朵",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 40,
    senses: [
      {
        id: "ear",
        chinese: "耳朵；用来听声音的身体部位",
        examples: [
          {
            thai: "เสียงรถข้างนอกดังมาก น้องจึงปิดหูและเดินกลับเข้าห้อง",
            roman: "siang rot khaang naawk dang maak, naawng jeung bpit huu lae doen glap khao haawng",
            chinese: "外面的车声很大，弟弟/妹妹所以捂住耳朵并走回房间。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ตา", roman: "dtaa", chinese: "眼睛" },
            distinctionZh: "หู 用来听；ตา 用来看。",
          },
        ],
        collocations: [
          { thai: "เจ็บหู", roman: "jep huu", chinese: "耳朵疼" },
          { thai: "ปิดหู", roman: "bpit huu", chinese: "捂耳朵" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ฟังด้วยหู", roman: "fang duai huu", chinese: "用耳朵听" },
      { thai: "หูฟัง", roman: "huu-fang", chinese: "耳机" },
    ],
    tags: ["body", "health", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "ja-muuk",
    thai: "จมูก",
    roman: "ja-muuk",
    chinese: "鼻子",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 41,
    senses: [
      {
        id: "nose",
        chinese: "鼻子；用来呼吸和闻气味的身体部位",
        examples: [
          {
            thai: "อากาศในห้องแห้งมาก ทำให้จมูกของเด็กเจ็บตอนกลางคืน",
            roman: "aa-gaat nai haawng haaeng maak, tham-hai ja-muuk khaawng dek jep dtaawn glaang-kheun",
            chinese: "房间里的空气很干，让孩子晚上鼻子疼。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [],
        collocations: [
          { thai: "คัดจมูก", roman: "khat ja-muuk", chinese: "鼻塞" },
          { thai: "เจ็บจมูก", roman: "jep ja-muuk", chinese: "鼻子疼" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "เช็ดจมูก", roman: "chet ja-muuk", chinese: "擦鼻子" },
      { thai: "หายใจทางจมูก", roman: "haai-jai thaang ja-muuk", chinese: "用鼻子呼吸" },
    ],
    tags: ["body", "health", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpaak",
    thai: "ปาก",
    roman: "bpaak",
    chinese: "嘴",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 42,
    senses: [
      {
        id: "mouth",
        chinese: "嘴；用于吃、说话的身体部位",
        examples: [
          {
            thai: "หลังแปรงฟันแล้ว เด็กควรล้างปากให้สะอาดก่อนเข้านอน",
            roman: "lang bpraaeng fan laaeo, dek khuan laang bpaak hai sa-aat gaawn khao naawn",
            chinese: "刷牙后，孩子睡觉前应该把嘴漱干净。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "confusable",
            target: { thai: "ปากกา", roman: "bpaak-gaa", chinese: "笔" },
            distinctionZh: "ปาก 是嘴；ปากกา 是笔，虽然开头相同但不是身体部位。",
          },
        ],
        collocations: [
          { thai: "ล้างปาก", roman: "laang bpaak", chinese: "漱口" },
          { thai: "เจ็บปาก", roman: "jep bpaak", chinese: "嘴疼" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ปิดปาก", roman: "bpit bpaak", chinese: "闭嘴；捂嘴" },
      { thai: "อ้าปาก", roman: "aa bpaak", chinese: "张嘴" },
    ],
    tags: ["body", "health", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "mue",
    thai: "มือ",
    roman: "mue",
    chinese: "手",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 43,
    senses: [
      {
        id: "hand",
        chinese: "手；抓、拿、写字等使用的身体部位",
        examples: [
          {
            thai: "ก่อนกินอาหาร ทุกคนล้างมือด้วยสบู่เพราะมือจับของหลายอย่างทั้งวัน",
            roman: "gaawn gin aa-haan, thuk khon laang mue duai sa-buu phraw mue jap khaawng laai yaang thang wan",
            chinese: "吃饭前，大家用肥皂洗手，因为手一整天碰了很多东西。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "เท้า", roman: "thaao", chinese: "脚" },
            distinctionZh: "มือ 是手；เท้า 是脚。两个词都很高频。",
          },
        ],
        collocations: [
          { thai: "ล้างมือ", roman: "laang mue", chinese: "洗手" },
          { thai: "จับมือ", roman: "jap mue", chinese: "握手；牵手" },
        ],
        tags: ["body", "hygiene"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "มือซ้าย", roman: "mue saai", chinese: "左手" },
      { thai: "มือขวา", roman: "mue khwaa", chinese: "右手" },
    ],
    tags: ["body", "hygiene", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaao",
    thai: "เท้า",
    roman: "thaao",
    chinese: "脚",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 44,
    senses: [
      {
        id: "foot",
        chinese: "脚；站立、走路使用的身体部位",
        examples: [
          {
            thai: "หลังเดินตลาดนาน ๆ แม่ปวดเท้าและอยากกลับบ้านไปพัก",
            roman: "lang doen dta-laat naan naan, maae bpuat thaao lae yaak glap baan bpai phak",
            chinese: "逛市场很久之后，妈妈脚疼，想回家休息。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ขา", roman: "khaa", chinese: "腿" },
            distinctionZh: "เท้า 是脚；ขา 是腿。",
          },
        ],
        collocations: [
          { thai: "ปวดเท้า", roman: "bpuat thaao", chinese: "脚疼" },
          { thai: "ล้างเท้า", roman: "laang thaao", chinese: "洗脚" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ใส่รองเท้า", roman: "sai raawng-thaao", chinese: "穿鞋" },
      { thai: "ถุงเท้า", roman: "thung-thaao", chinese: "袜子" },
    ],
    tags: ["body", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khaa-leg",
    thai: "ขา",
    roman: "khaa",
    chinese: "腿",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 45,
    senses: [
      {
        id: "leg",
        chinese: "腿；支撑身体、走路跑步用的身体部位",
        examples: [
          {
            thai: "หลังวิ่งกับเพื่อนที่สวนสาธารณะ เขาปวดขาแต่รู้สึกสนุกมาก",
            roman: "lang wing gap phuean thii suan-saa-thaa-ra-na, khao bpuat khaa dtaae ruu-seuk sa-nuk maak",
            chinese: "和朋友在公园跑步后，他腿疼但觉得很开心。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "confusable",
            target: { thai: "ค่ะ", roman: "kha", chinese: "女性礼貌句末词" },
            distinctionZh: "ขา 是“腿”；ค่ะ 是女性礼貌词，泰文和声调不同。",
          },
        ],
        collocations: [
          { thai: "ปวดขา", roman: "bpuat khaa", chinese: "腿疼" },
          { thai: "ขาซ้าย", roman: "khaa saai", chinese: "左腿" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ขาขวา", roman: "khaa khwaa", chinese: "右腿" },
      { thai: "เจ็บขา", roman: "jep khaa", chinese: "腿疼；腿受伤" },
    ],
    tags: ["body", "health", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "khaaen",
    thai: "แขน",
    roman: "khaaen",
    chinese: "胳膊；手臂",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 46,
    senses: [
      {
        id: "arm",
        chinese: "胳膊；从肩到手的身体部位",
        examples: [
          {
            thai: "พ่ออุ้มลูกนานเกินไปจนปวดแขน แต่ลูกยังไม่อยากลงเดินเอง",
            roman: "phaaw um luuk naan gern bpai jon bpuat khaaen, dtaae luuk yang mai yaak long doen eeng",
            chinese: "爸爸抱孩子太久抱到胳膊疼，但孩子还不想下来自己走。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "มือ", roman: "mue", chinese: "手" },
            distinctionZh: "แขน 是手臂；มือ 是手。",
          },
        ],
        collocations: [
          { thai: "ปวดแขน", roman: "bpuat khaaen", chinese: "胳膊疼" },
          { thai: "แขนซ้าย", roman: "khaaen saai", chinese: "左臂" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "แขนขวา", roman: "khaaen khwaa", chinese: "右臂" },
      { thai: "ยกแขน", roman: "yok khaaen", chinese: "举手臂" },
    ],
    tags: ["body", "health", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "niu",
    thai: "นิ้ว",
    roman: "niu",
    chinese: "手指；脚趾",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 47,
    senses: [
      {
        id: "finger-toe",
        chinese: "手指；脚趾，需靠 มือ/เท้า 说明是手还是脚",
        examples: [
          {
            thai: "ลูกเจ็บนิ้วมือเพราะปิดประตูเร็วเกินไป แม่จึงพาไปล้างแผล",
            roman: "luuk jep niu mue phraw bpit bpra-dtuu reo gern bpai, maae jeung phaa bpai laang phlaae",
            chinese: "孩子手指疼，因为关门太快夹到了，所以妈妈带去清洗伤口。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "นิ้วเท้า", roman: "niu thaao", chinese: "脚趾" },
            distinctionZh: "นิ้ว 单独说可指手指或脚趾；นิ้วมือ 是手指，นิ้วเท้า 是脚趾。",
          },
        ],
        collocations: [
          { thai: "นิ้วมือ", roman: "niu mue", chinese: "手指" },
          { thai: "นิ้วเท้า", roman: "niu thaao", chinese: "脚趾" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "เจ็บนิ้ว", roman: "jep niu", chinese: "手指/脚趾疼" },
      { thai: "ชี้นิ้ว", roman: "chii niu", chinese: "用手指指" },
    ],
    tags: ["body", "health", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "lang",
    thai: "หลัง",
    roman: "lang",
    chinese: "背；后面；之后",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 48,
    senses: [
      {
        id: "body-back",
        chinese: "背；身体后面的部分",
        examples: [
          {
            thai: "ถ้านั่งทำงานบนเก้าอี้นานเกินไป หลังของฉันจะปวดมาก",
            roman: "thaa nang tham-ngaan bon gao-ii naan gern bpai, lang khaawng chan ja bpuat maak",
            chinese: "如果在椅子上坐着工作太久，我的背会很疼。",
          },
        ],
        synonyms: [{ thai: "แผ่นหลัง", roman: "phaen-lang", chinese: "背部" }],
        antonyms: [{ thai: "หน้า", roman: "naa", chinese: "前面；脸" }],
        comparisons: [
          {
            kind: "confusable",
            target: { thai: "หลังอาหาร", roman: "lang aa-haan", chinese: "饭后" },
            distinctionZh: "หลัง 可指身体的背，也可表示“后面/之后”，要看句子结构。",
          },
        ],
        collocations: [
          { thai: "ปวดหลัง", roman: "bpuat lang", chinese: "背疼" },
          { thai: "นวดหลัง", roman: "nuat lang", chinese: "按摩背部" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [{ thai: "แผ่นหลัง", roman: "phaen-lang", chinese: "背部" }],
    antonyms: [{ thai: "หน้า", roman: "naa", chinese: "前面；脸" }],
    comparisons: [],
    collocations: [
      { thai: "หลังบ้าน", roman: "lang baan", chinese: "房子后面" },
      { thai: "หลังเลิกงาน", roman: "lang loek-ngaan", chinese: "下班后" },
    ],
    tags: ["body", "location", "time"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaawng",
    thai: "ท้อง",
    roman: "thaawng",
    chinese: "肚子；腹部",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 49,
    senses: [
      {
        id: "stomach-belly",
        chinese: "肚子；腹部，常用于饿、饱、疼等感觉",
        examples: [
          {
            thai: "ถ้ากินอาหารเผ็ดเกินไป น้องจะปวดท้องและไม่อยากไปเรียน",
            roman: "thaa gin aa-haan phet gern bpai, naawng ja bpuat thaawng lae mai yaak bpai riian",
            chinese: "如果吃太辣的食物，弟弟/妹妹会肚子疼，不想去上课。",
          },
        ],
        synonyms: [
          { thai: "พุง", roman: "phung", chinese: "肚子；肚皮", notesZh: "更口语。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "พุง", roman: "phung", chinese: "肚子；肚皮" },
            distinctionZh: "ท้อง 是较中性的“肚子/腹部”；พุง 更口语，也可带“肚腩”的感觉。",
          },
        ],
        collocations: [
          { thai: "ปวดท้อง", roman: "bpuat thaawng", chinese: "肚子疼" },
          { thai: "หิวท้อง", roman: "hiu thaawng", chinese: "肚子饿" },
        ],
        tags: ["body", "health"],
      },
    ],
    synonyms: [{ thai: "พุง", roman: "phung", chinese: "肚子；肚皮" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ท้องเสีย", roman: "thaawng siia", chinese: "拉肚子" },
      { thai: "อิ่มท้อง", roman: "im thaawng", chinese: "肚子饱" },
    ],
    tags: ["body", "health", "food"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "jai",
    thai: "ใจ",
    roman: "jai",
    chinese: "心；心情",
    partOfSpeech: "noun",
    theme: "body",
    level: "a1",
    priority: 50,
    senses: [
      {
        id: "heart-mind",
        chinese: "心；内心、心情或感受",
        examples: [
          {
            thai: "เมื่อเพื่อนช่วยอธิบายบทเรียนให้เข้าใจง่ายขึ้น ฉันรู้สึกดีใจมาก",
            roman: "muea phuean chuai a-thi-baai bot-riian hai khao-jai ngaai kheun, chan ruu-seuk dii-jai maak",
            chinese: "朋友帮忙把课解释得更容易理解时，我感到非常开心。",
          },
        ],
        synonyms: [
          { thai: "หัวใจ", roman: "hua-jai", chinese: "心脏；心" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "หัวใจ", roman: "hua-jai", chinese: "心脏；心" },
            distinctionZh: "ใจ 偏内心和情绪；หัวใจ 可指心脏，也可引申为心。",
          },
        ],
        collocations: [
          { thai: "ดีใจ", roman: "dii-jai", chinese: "高兴" },
          { thai: "เสียใจ", roman: "siia-jai", chinese: "难过；遗憾" },
        ],
        tags: ["body", "feeling"],
      },
    ],
    synonyms: [{ thai: "หัวใจ", roman: "hua-jai", chinese: "心脏；心" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ใจดี", roman: "jai-dii", chinese: "心地好；善良" },
      { thai: "เข้าใจ", roman: "khao-jai", chinese: "理解" },
    ],
    tags: ["body", "feeling", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "luuk",
    thai: "ลูก",
    roman: "luuk",
    chinese: "孩子；子女",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 51,
    senses: [
      {
        id: "child-offspring",
        chinese: "孩子；某人的儿子或女儿",
        examples: [
          {
            thai: "พ่อแม่พาลูกไปซื้อรองเท้าใหม่ เพราะรองเท้าคู่เก่าเล็กเกินไป",
            roman: "phaaw maae phaa luuk bpai sue raawng-thaao mai phraw raawng-thaao khuu gao lek gern bpai",
            chinese: "父母带孩子去买新鞋，因为旧鞋太小了。",
          },
        ],
        synonyms: [
          { thai: "บุตร", roman: "but", chinese: "子女", notesZh: "正式或书面。" },
        ],
        antonyms: [{ thai: "พ่อแม่", roman: "phaaw maae", chinese: "父母" }],
        comparisons: [
          {
            kind: "register",
            target: { thai: "บุตร", roman: "but", chinese: "子女" },
            distinctionZh: "ลูก 是日常说法；บุตร 更正式，常见于表格或文件。",
          },
        ],
        collocations: [
          { thai: "ลูกชาย", roman: "luuk-chaai", chinese: "儿子" },
          { thai: "ลูกสาว", roman: "luuk-saao", chinese: "女儿" },
        ],
        tags: ["family", "people"],
      },
    ],
    synonyms: [{ thai: "บุตร", roman: "but", chinese: "子女" }],
    antonyms: [{ thai: "พ่อแม่", roman: "phaaw maae", chinese: "父母" }],
    comparisons: [],
    collocations: [
      { thai: "พาลูกไปโรงเรียน", roman: "phaa luuk bpai roong-riian", chinese: "带孩子去学校" },
      { thai: "ลูกเล็ก", roman: "luuk lek", chinese: "小孩；小的孩子" },
    ],
    tags: ["family", "people", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phii-older",
    thai: "พี่",
    roman: "phii",
    chinese: "哥哥；姐姐；年长者",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 52,
    senses: [
      {
        id: "older-sibling-person",
        chinese: "哥哥/姐姐；也可礼貌称呼比自己年长或较亲近的人",
        examples: [
          {
            thai: "พี่ช่วยสอนการบ้านให้น้องทุกคืน เพราะแม่กลับบ้านดึก",
            roman: "phii chuai saawn gaan-baan hai naawng thuk kheun phraw maae glap baan duek",
            chinese: "哥哥/姐姐每天晚上帮弟弟/妹妹教作业，因为妈妈回家晚。",
          },
        ],
        synonyms: [
          { thai: "พี่ชาย", roman: "phii-chaai", chinese: "哥哥" },
          { thai: "พี่สาว", roman: "phii-saao", chinese: "姐姐" },
        ],
        antonyms: [{ thai: "น้อง", roman: "naawng", chinese: "弟弟；妹妹；年幼者" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "น้อง", roman: "naawng", chinese: "弟弟；妹妹" },
            distinctionZh: "พี่ 指比自己年长的同辈；น้อง 指比自己年幼的同辈。",
          },
        ],
        collocations: [
          { thai: "พี่ชาย", roman: "phii-chaai", chinese: "哥哥" },
          { thai: "พี่สาว", roman: "phii-saao", chinese: "姐姐" },
        ],
        tags: ["family", "address"],
      },
    ],
    synonyms: [
      { thai: "พี่ชาย", roman: "phii-chaai", chinese: "哥哥" },
      { thai: "พี่สาว", roman: "phii-saao", chinese: "姐姐" },
    ],
    antonyms: [{ thai: "น้อง", roman: "naawng", chinese: "弟弟；妹妹" }],
    comparisons: [],
    collocations: [
      { thai: "พี่กับน้อง", roman: "phii gap naawng", chinese: "哥哥姐姐和弟弟妹妹" },
      { thai: "เรียกว่าพี่", roman: "riiak waa phii", chinese: "称呼为哥/姐" },
    ],
    tags: ["family", "people", "address"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naawng-younger",
    thai: "น้อง",
    roman: "naawng",
    chinese: "弟弟；妹妹；年幼者",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 53,
    senses: [
      {
        id: "younger-sibling-person",
        chinese: "弟弟/妹妹；也可称呼比自己年轻或服务场景中的年轻人",
        examples: [
          {
            thai: "น้องลืมหนังสือไว้บนโต๊ะ พี่จึงเอาไปให้ที่โรงเรียนตอนเช้า",
            roman: "naawng luuem nang-sue wai bon dto, phii jeung ao bpai hai thii roong-riian dtaawn chaao",
            chinese: "弟弟/妹妹把书忘在桌上了，所以哥哥/姐姐早上拿去学校给他/她。",
          },
        ],
        synonyms: [
          { thai: "น้องชาย", roman: "naawng-chaai", chinese: "弟弟" },
          { thai: "น้องสาว", roman: "naawng-saao", chinese: "妹妹" },
        ],
        antonyms: [{ thai: "พี่", roman: "phii", chinese: "哥哥；姐姐；年长者" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "พี่", roman: "phii", chinese: "哥哥；姐姐" },
            distinctionZh: "น้อง 指更年轻的同辈；พี่ 指更年长的同辈。泰语称呼很重视年龄关系。",
          },
        ],
        collocations: [
          { thai: "น้องชาย", roman: "naawng-chaai", chinese: "弟弟" },
          { thai: "น้องสาว", roman: "naawng-saao", chinese: "妹妹" },
        ],
        tags: ["family", "address"],
      },
    ],
    synonyms: [
      { thai: "น้องชาย", roman: "naawng-chaai", chinese: "弟弟" },
      { thai: "น้องสาว", roman: "naawng-saao", chinese: "妹妹" },
    ],
    antonyms: [{ thai: "พี่", roman: "phii", chinese: "哥哥；姐姐" }],
    comparisons: [],
    collocations: [
      { thai: "ดูแลน้อง", roman: "duu-laae naawng", chinese: "照顾弟弟/妹妹" },
      { thai: "น้องเล็ก", roman: "naawng lek", chinese: "小弟弟/小妹妹" },
    ],
    tags: ["family", "people", "address"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phii-saao",
    thai: "พี่สาว",
    roman: "phii-saao",
    chinese: "姐姐",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 54,
    senses: [
      {
        id: "older-sister",
        chinese: "姐姐；比自己年长的女性同胞",
        examples: [
          {
            thai: "พี่สาวของฉันทำงานใกล้บ้าน จึงกลับมากินข้าวเย็นกับครอบครัวได้บ่อย",
            roman: "phii-saao khaawng chan tham-ngaan glai baan, jeung glap maa gin khaao yen gap khraawp-khrua dai baawy",
            chinese: "我姐姐在家附近工作，所以能常回来和家人吃晚饭。",
          },
        ],
        synonyms: [{ thai: "พี่", roman: "phii", chinese: "哥/姐；年长者" }],
        antonyms: [{ thai: "น้องสาว", roman: "naawng-saao", chinese: "妹妹" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "พี่ชาย", roman: "phii-chaai", chinese: "哥哥" },
            distinctionZh: "พี่สาว 是姐姐；พี่ชาย 是哥哥。",
          },
        ],
        collocations: [
          { thai: "พี่สาวของฉัน", roman: "phii-saao khaawng chan", chinese: "我的姐姐" },
          { thai: "ไปกับพี่สาว", roman: "bpai gap phii-saao", chinese: "和姐姐去" },
        ],
        tags: ["family", "people"],
      },
    ],
    synonyms: [{ thai: "พี่", roman: "phii", chinese: "哥/姐；年长者" }],
    antonyms: [{ thai: "น้องสาว", roman: "naawng-saao", chinese: "妹妹" }],
    comparisons: [],
    collocations: [
      { thai: "พี่สาวคนโต", roman: "phii-saao khon dto", chinese: "大姐" },
      { thai: "บ้านพี่สาว", roman: "baan phii-saao", chinese: "姐姐家" },
    ],
    tags: ["family", "people", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "phii-chaai",
    thai: "พี่ชาย",
    roman: "phii-chaai",
    chinese: "哥哥",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 55,
    senses: [
      {
        id: "older-brother",
        chinese: "哥哥；比自己年长的男性同胞",
        examples: [
          {
            thai: "พี่ชายช่วยยกโต๊ะเข้าห้อง เพราะโต๊ะตัวนี้หนักเกินไปสำหรับแม่",
            roman: "phii-chaai chuai yok dto khao haawng phraw dto dtua nii nak gern bpai sam-rap maae",
            chinese: "哥哥帮忙把桌子搬进房间，因为这张桌子对妈妈来说太重了。",
          },
        ],
        synonyms: [{ thai: "พี่", roman: "phii", chinese: "哥/姐；年长者" }],
        antonyms: [{ thai: "น้องชาย", roman: "naawng-chaai", chinese: "弟弟" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "พี่สาว", roman: "phii-saao", chinese: "姐姐" },
            distinctionZh: "พี่ชาย 是哥哥；พี่สาว 是姐姐。",
          },
        ],
        collocations: [
          { thai: "พี่ชายของเขา", roman: "phii-chaai khaawng khao", chinese: "他/她的哥哥" },
          { thai: "ถามพี่ชาย", roman: "thaam phii-chaai", chinese: "问哥哥" },
        ],
        tags: ["family", "people"],
      },
    ],
    synonyms: [{ thai: "พี่", roman: "phii", chinese: "哥/姐；年长者" }],
    antonyms: [{ thai: "น้องชาย", roman: "naawng-chaai", chinese: "弟弟" }],
    comparisons: [],
    collocations: [
      { thai: "พี่ชายคนโต", roman: "phii-chaai khon dto", chinese: "大哥" },
      { thai: "ไปกับพี่ชาย", roman: "bpai gap phii-chaai", chinese: "和哥哥去" },
    ],
    tags: ["family", "people", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naawng-saao",
    thai: "น้องสาว",
    roman: "naawng-saao",
    chinese: "妹妹",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 56,
    senses: [
      {
        id: "younger-sister",
        chinese: "妹妹；比自己年幼的女性同胞",
        examples: [
          {
            thai: "น้องสาวอยากใส่รองเท้าใหม่ไปโรงเรียน แต่แม่บอกให้ลองเดินในบ้านก่อน",
            roman: "naawng-saao yaak sai raawng-thaao mai bpai roong-riian dtaae maae baawk hai laawng doen nai baan gaawn",
            chinese: "妹妹想穿新鞋去学校，但妈妈让她先在家里试着走走。",
          },
        ],
        synonyms: [{ thai: "น้อง", roman: "naawng", chinese: "弟弟/妹妹；年幼者" }],
        antonyms: [{ thai: "พี่สาว", roman: "phii-saao", chinese: "姐姐" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "น้องชาย", roman: "naawng-chaai", chinese: "弟弟" },
            distinctionZh: "น้องสาว 是妹妹；น้องชาย 是弟弟。",
          },
        ],
        collocations: [
          { thai: "น้องสาวของฉัน", roman: "naawng-saao khaawng chan", chinese: "我的妹妹" },
          { thai: "ดูแลน้องสาว", roman: "duu-laae naawng-saao", chinese: "照顾妹妹" },
        ],
        tags: ["family", "people"],
      },
    ],
    synonyms: [{ thai: "น้อง", roman: "naawng", chinese: "弟弟/妹妹；年幼者" }],
    antonyms: [{ thai: "พี่สาว", roman: "phii-saao", chinese: "姐姐" }],
    comparisons: [],
    collocations: [
      { thai: "น้องสาวคนเล็ก", roman: "naawng-saao khon lek", chinese: "小妹妹" },
      { thai: "ไปกับน้องสาว", roman: "bpai gap naawng-saao", chinese: "和妹妹去" },
    ],
    tags: ["family", "people", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naawng-chaai",
    thai: "น้องชาย",
    roman: "naawng-chaai",
    chinese: "弟弟",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 57,
    senses: [
      {
        id: "younger-brother",
        chinese: "弟弟；比自己年幼的男性同胞",
        examples: [
          {
            thai: "น้องชายตื่นสายและหาถุงเท้าไม่เจอ จึงไปโรงเรียนเกือบไม่ทัน",
            roman: "naawng-chaai dteun saai lae haa thung-thaao mai jooe, jeung bpai roong-riian gueap mai than",
            chinese: "弟弟起晚了，而且找不到袜子，所以差点赶不上去学校。",
          },
        ],
        synonyms: [{ thai: "น้อง", roman: "naawng", chinese: "弟弟/妹妹；年幼者" }],
        antonyms: [{ thai: "พี่ชาย", roman: "phii-chaai", chinese: "哥哥" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "น้องสาว", roman: "naawng-saao", chinese: "妹妹" },
            distinctionZh: "น้องชาย 是弟弟；น้องสาว 是妹妹。",
          },
        ],
        collocations: [
          { thai: "น้องชายของเขา", roman: "naawng-chaai khaawng khao", chinese: "他/她的弟弟" },
          { thai: "ช่วยน้องชาย", roman: "chuai naawng-chaai", chinese: "帮助弟弟" },
        ],
        tags: ["family", "people"],
      },
    ],
    synonyms: [{ thai: "น้อง", roman: "naawng", chinese: "弟弟/妹妹；年幼者" }],
    antonyms: [{ thai: "พี่ชาย", roman: "phii-chaai", chinese: "哥哥" }],
    comparisons: [],
    collocations: [
      { thai: "น้องชายคนเล็ก", roman: "naawng-chaai khon lek", chinese: "小弟弟" },
      { thai: "เล่นกับน้องชาย", roman: "len gap naawng-chaai", chinese: "和弟弟玩" },
    ],
    tags: ["family", "people", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpuu",
    thai: "ปู่",
    roman: "bpuu",
    chinese: "爷爷；祖父",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 58,
    senses: [
      {
        id: "paternal-grandfather",
        chinese: "爷爷；父亲的父亲",
        examples: [
          {
            thai: "วันหยุดพ่อพาลูกไปเยี่ยมปู่ที่บ้านสวน และกินข้าวกับญาติหลายคน",
            roman: "wan-yut phaaw phaa luuk bpai yiiam bpuu thii baan suan lae gin khaao gap yaat laai khon",
            chinese: "假日爸爸带孩子去乡下房子看爷爷，并和许多亲戚吃饭。",
          },
        ],
        synonyms: [
          { thai: "คุณปู่", roman: "khun bpuu", chinese: "爷爷（礼貌/亲切）" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ตา", roman: "dtaa", chinese: "外公；母亲的父亲" },
            distinctionZh: "ปู่ 是父亲的父亲；ตา 是母亲的父亲。",
          },
        ],
        collocations: [
          { thai: "คุณปู่", roman: "khun bpuu", chinese: "爷爷" },
          { thai: "ไปหาปู่", roman: "bpai haa bpuu", chinese: "去看爷爷" },
        ],
        tags: ["family", "kinship"],
      },
    ],
    synonyms: [{ thai: "คุณปู่", roman: "khun bpuu", chinese: "爷爷" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ปู่กับย่า", roman: "bpuu gap yaa", chinese: "爷爷和奶奶" },
      { thai: "บ้านปู่", roman: "baan bpuu", chinese: "爷爷家" },
    ],
    tags: ["family", "people", "kinship"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "yaa-grandmother",
    thai: "ย่า",
    roman: "yaa",
    chinese: "奶奶；祖母",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 59,
    senses: [
      {
        id: "paternal-grandmother",
        chinese: "奶奶；父亲的母亲",
        examples: [
          {
            thai: "ย่าทำขนมให้หลานทุกครั้งที่ครอบครัวกลับไปเยี่ยมบ้านเก่า",
            roman: "yaa tham kha-nom hai laan thuk khrang thii khraawp-khrua glap bpai yiiam baan gao",
            chinese: "每次家人回老家探望时，奶奶都会给孙辈做点心。",
          },
        ],
        synonyms: [
          { thai: "คุณย่า", roman: "khun yaa", chinese: "奶奶（礼貌/亲切）" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ยาย", roman: "yaai", chinese: "外婆；母亲的母亲" },
            distinctionZh: "ย่า 是父亲的母亲；ยาย 是母亲的母亲。",
          },
        ],
        collocations: [
          { thai: "คุณย่า", roman: "khun yaa", chinese: "奶奶" },
          { thai: "ปู่กับย่า", roman: "bpuu gap yaa", chinese: "爷爷和奶奶" },
        ],
        tags: ["family", "kinship"],
      },
    ],
    synonyms: [{ thai: "คุณย่า", roman: "khun yaa", chinese: "奶奶" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ไปหาย่า", roman: "bpai haa yaa", chinese: "去看奶奶" },
      { thai: "บ้านย่า", roman: "baan yaa", chinese: "奶奶家" },
    ],
    tags: ["family", "people", "kinship"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "yaai",
    thai: "ยาย",
    roman: "yaai",
    chinese: "外婆；姥姥",
    partOfSpeech: "noun",
    theme: "family",
    level: "a1",
    priority: 60,
    senses: [
      {
        id: "maternal-grandmother",
        chinese: "外婆；母亲的母亲，也可亲切称呼老年女性",
        examples: [
          {
            thai: "ยายชอบนั่งข้างหน้าต่างตอนเช้าและอ่านหนังสือช้า ๆ",
            roman: "yaai chaawp nang khaang naa-dtaang dtaawn chaao lae aan nang-sue chaa chaa",
            chinese: "外婆喜欢早上坐在窗边，慢慢地读书。",
          },
        ],
        synonyms: [
          { thai: "คุณยาย", roman: "khun yaai", chinese: "外婆（礼貌/亲切）" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ย่า", roman: "yaa", chinese: "奶奶；父亲的母亲" },
            distinctionZh: "ยาย 是母亲的母亲；ย่า 是父亲的母亲。",
          },
        ],
        collocations: [
          { thai: "คุณยาย", roman: "khun yaai", chinese: "外婆" },
          { thai: "ตากับยาย", roman: "dtaa gap yaai", chinese: "外公和外婆" },
        ],
        tags: ["family", "kinship"],
      },
    ],
    synonyms: [{ thai: "คุณยาย", roman: "khun yaai", chinese: "外婆" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ไปหายาย", roman: "bpai haa yaai", chinese: "去看外婆" },
      { thai: "บ้านยาย", roman: "baan yaai", chinese: "外婆家" },
    ],
    tags: ["family", "people", "kinship"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "fon",
    thai: "ฝน",
    roman: "fon",
    chinese: "雨",
    partOfSpeech: "noun",
    theme: "weather",
    level: "a1",
    priority: 61,
    senses: [
      {
        id: "rain-noun",
        chinese: "雨；从天空落下的水",
        examples: [
          {
            thai: "ตอนเช้ามีฝนเล็กน้อย แม่จึงบอกให้ลูกเอาร่มใส่กระเป๋า",
            roman: "dtaawn chaao mii fon lek-naawy, maae jeung baawk hai luuk ao rom sai gra-bpao",
            chinese: "早上有小雨，所以妈妈让孩子把伞放进包里。",
          },
        ],
        synonyms: [],
        antonyms: [{ thai: "แดด", roman: "daaet", chinese: "阳光" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ฝนตก", roman: "fon dtok", chinese: "下雨" },
            distinctionZh: "ฝน 是名词“雨”；ฝนตก 是句子/短语“下雨”。",
          },
        ],
        collocations: [
          { thai: "ฝนตก", roman: "fon dtok", chinese: "下雨" },
          { thai: "ฝนหนัก", roman: "fon nak", chinese: "大雨" },
        ],
        tags: ["weather", "daily-life"],
      },
    ],
    synonyms: [],
    antonyms: [{ thai: "แดด", roman: "daaet", chinese: "阳光" }],
    comparisons: [],
    collocations: [
      { thai: "ฝนเบา", roman: "fon bao", chinese: "小雨" },
      { thai: "หน้าฝน", roman: "naa fon", chinese: "雨季" },
    ],
    tags: ["weather", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "fon-dtok",
    thai: "ฝนตก",
    roman: "fon dtok",
    chinese: "下雨",
    partOfSpeech: "phrase",
    theme: "weather",
    level: "a1",
    priority: 62,
    senses: [
      {
        id: "rain-falls",
        chinese: "下雨；雨正在下或会下",
        examples: [
          {
            thai: "ถ้าฝนตกตอนเย็น เราจะกินข้าวที่บ้านแทนการออกไปตลาด",
            roman: "thaa fon dtok dtaawn yen, rao ja gin khaao thii baan thaaen gaan aawk bpai dta-laat",
            chinese: "如果傍晚下雨，我们会在家吃饭，而不是出去市场。",
          },
        ],
        synonyms: [],
        antonyms: [{ thai: "ฝนหยุด", roman: "fon yut", chinese: "雨停了" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ฝน", roman: "fon", chinese: "雨" },
            distinctionZh: "ฝน 是雨这个名词；ฝนตก 是“雨落下来/下雨”的表达。",
          },
        ],
        collocations: [
          { thai: "ฝนตกหนัก", roman: "fon dtok nak", chinese: "雨下得大" },
          { thai: "ฝนตกทั้งวัน", roman: "fon dtok thang wan", chinese: "下了一整天雨" },
        ],
        tags: ["weather", "sentence"],
      },
    ],
    synonyms: [],
    antonyms: [{ thai: "ฝนหยุด", roman: "fon yut", chinese: "雨停了" }],
    comparisons: [],
    collocations: [
      { thai: "วันนี้ฝนตก", roman: "wan-nii fon dtok", chinese: "今天下雨" },
      { thai: "กลัวฝนตก", roman: "glua fon dtok", chinese: "怕下雨" },
    ],
    tags: ["weather", "daily-life", "phrase"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "daaet",
    thai: "แดด",
    roman: "daaet",
    chinese: "阳光；太阳光",
    partOfSpeech: "noun",
    theme: "weather",
    level: "a1",
    priority: 63,
    senses: [
      {
        id: "sunlight",
        chinese: "阳光；太阳照下来的光和热",
        examples: [
          {
            thai: "แดดตอนบ่ายแรงมาก แม่จึงให้ลูกใส่หมวกก่อนออกจากบ้าน",
            roman: "daaet dtaawn baai raaeng maak, maae jeung hai luuk sai muaak gaawn aawk jaak baan",
            chinese: "下午阳光很强，所以妈妈让孩子出门前戴帽子。",
          },
        ],
        synonyms: [
          { thai: "แสงแดด", roman: "saaeng-daaet", chinese: "阳光" },
        ],
        antonyms: [{ thai: "ฝน", roman: "fon", chinese: "雨" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ฟ้า", roman: "faa", chinese: "天空" },
            distinctionZh: "แดด 是阳光；ฟ้า 是天空。",
          },
        ],
        collocations: [
          { thai: "แดดแรง", roman: "daaet raaeng", chinese: "阳光强" },
          { thai: "กันแดด", roman: "gan daaet", chinese: "防晒；遮阳" },
        ],
        tags: ["weather", "daily-life"],
      },
    ],
    synonyms: [{ thai: "แสงแดด", roman: "saaeng-daaet", chinese: "阳光" }],
    antonyms: [{ thai: "ฝน", roman: "fon", chinese: "雨" }],
    comparisons: [],
    collocations: [
      { thai: "ตากแดด", roman: "dtaak daaet", chinese: "晒太阳；曝晒" },
      { thai: "แดดร้อน", roman: "daaet raawn", chinese: "阳光很热" },
    ],
    tags: ["weather", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "lom",
    thai: "ลม",
    roman: "lom",
    chinese: "风",
    partOfSpeech: "noun",
    theme: "weather",
    level: "a1",
    priority: 64,
    senses: [
      {
        id: "wind",
        chinese: "风；空气流动",
        examples: [
          {
            thai: "ตอนเย็นมีลมเย็นจากหน้าต่าง ทำให้ห้องไม่ร้อนเหมือนตอนบ่าย",
            roman: "dtaawn yen mii lom yen jaak naa-dtaang, tham-hai haawng mai raawn muean dtaawn baai",
            chinese: "傍晚有凉风从窗户进来，让房间不像下午那么热。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "พัดลม", roman: "phat-lom", chinese: "电风扇" },
            distinctionZh: "ลม 是风；พัดลม 是制造风的电风扇。",
          },
        ],
        collocations: [
          { thai: "ลมเย็น", roman: "lom yen", chinese: "凉风" },
          { thai: "ลมแรง", roman: "lom raaeng", chinese: "风大" },
        ],
        tags: ["weather"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "มีลม", roman: "mii lom", chinese: "有风" },
      { thai: "ไม่มีลม", roman: "mai mii lom", chinese: "没有风" },
    ],
    tags: ["weather", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "faa",
    thai: "ฟ้า",
    roman: "faa",
    chinese: "天空；蓝色",
    partOfSpeech: "noun",
    theme: "weather",
    level: "a1",
    priority: 65,
    senses: [
      {
        id: "sky",
        chinese: "天空；头顶上的天空",
        examples: [
          {
            thai: "หลังฝนหยุด ฟ้าสวยมาก เด็ก ๆ จึงออกไปเล่นหน้าบ้าน",
            roman: "lang fon yut, faa suai maak, dek dek jeung aawk bpai len naa baan",
            chinese: "雨停后，天空很美，所以孩子们出去在屋前玩。",
          },
        ],
        synonyms: [
          { thai: "ท้องฟ้า", roman: "thaawng-faa", chinese: "天空" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "สีฟ้า", roman: "sii faa", chinese: "蓝色；天蓝色" },
            distinctionZh: "ฟ้า 可指天空；สีฟ้า 是颜色“蓝色/天蓝色”。",
          },
        ],
        collocations: [
          { thai: "ฟ้าสวย", roman: "faa suai", chinese: "天空很美" },
          { thai: "ฟ้ามืด", roman: "faa mueut", chinese: "天黑" },
        ],
        tags: ["weather", "nature"],
      },
    ],
    synonyms: [{ thai: "ท้องฟ้า", roman: "thaawng-faa", chinese: "天空" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "มองฟ้า", roman: "maawng faa", chinese: "看天空" },
      { thai: "สีฟ้า", roman: "sii faa", chinese: "蓝色；天蓝色" },
    ],
    tags: ["weather", "daily-life", "color"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "meek",
    thai: "เมฆ",
    roman: "meek",
    chinese: "云",
    partOfSpeech: "noun",
    theme: "weather",
    level: "a1",
    priority: 66,
    senses: [
      {
        id: "cloud",
        chinese: "云；天空中的云",
        examples: [
          {
            thai: "เมื่อเห็นเมฆดำบนฟ้า พ่อรีบเก็บเสื้อผ้าก่อนฝนตก",
            roman: "muea hen meek dam bon faa, phaaw riip gep seua-phaa gaawn fon dtok",
            chinese: "看到天上的黑云时，爸爸赶快在下雨前收衣服。",
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ฟ้า", roman: "faa", chinese: "天空" },
            distinctionZh: "เมฆ 是云；ฟ้า 是天空。",
          },
        ],
        collocations: [
          { thai: "เมฆดำ", roman: "meek dam", chinese: "黑云" },
          { thai: "เมฆเยอะ", roman: "meek yoe", chinese: "云多" },
        ],
        tags: ["weather"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "บนฟ้ามีเมฆ", roman: "bon faa mii meek", chinese: "天上有云" },
      { thai: "เมฆสีขาว", roman: "meek sii khaao", chinese: "白云" },
    ],
    tags: ["weather", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "aa-gaat",
    thai: "อากาศ",
    roman: "aa-gaat",
    chinese: "天气；空气",
    partOfSpeech: "noun",
    theme: "weather",
    level: "a1",
    priority: 67,
    senses: [
      {
        id: "weather-air",
        chinese: "天气；空气，日常常用来谈冷热、舒服不舒服",
        examples: [
          {
            thai: "วันนี้อากาศดีมาก ครอบครัวจึงอยากออกไปเดินเล่นหลังอาหารเช้า",
            roman: "wan-nii aa-gaat dii maak, khraawp-khrua jeung yaak aawk bpai doen-len lang aa-haan chaao",
            chinese: "今天天气很好，所以家人想早饭后出去散步。",
          },
        ],
        synonyms: [
          { thai: "สภาพอากาศ", roman: "sa-phaap aa-gaat", chinese: "天气状况", notesZh: "更正式。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "register",
            target: { thai: "สภาพอากาศ", roman: "sa-phaap aa-gaat", chinese: "天气状况" },
            distinctionZh: "อากาศ 是日常说法；สภาพอากาศ 更像天气预报或正式表达。",
          },
        ],
        collocations: [
          { thai: "อากาศดี", roman: "aa-gaat dii", chinese: "天气好" },
          { thai: "อากาศร้อน", roman: "aa-gaat raawn", chinese: "天气热" },
        ],
        tags: ["weather", "daily-life"],
      },
    ],
    synonyms: [{ thai: "สภาพอากาศ", roman: "sa-phaap aa-gaat", chinese: "天气状况" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "อากาศหนาว", roman: "aa-gaat naao", chinese: "天气冷" },
      { thai: "อากาศอบอ้าว", roman: "aa-gaat op-aao", chinese: "天气闷热" },
    ],
    tags: ["weather", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "naao",
    thai: "หนาว",
    roman: "naao",
    chinese: "冷（天气/身体感觉）",
    partOfSpeech: "adjective",
    theme: "weather",
    level: "a1",
    priority: 68,
    senses: [
      {
        id: "cold-weather-feeling",
        chinese: "冷；天气冷或人感觉冷",
        examples: [
          {
            thai: "คืนนี้หนาวกว่าทุกวัน แม่จึงให้ลูกใส่เสื้อแขนยาวและห่มผ้า",
            roman: "kheun nii naao gwaa thuk wan, maae jeung hai luuk sai seua khaaen yaao lae hom phaa",
            chinese: "今晚比平时都冷，所以妈妈让孩子穿长袖并盖毯子。",
          },
        ],
        synonyms: [
          { thai: "เย็น", roman: "yen", chinese: "凉；冷" },
        ],
        antonyms: [{ thai: "ร้อน", roman: "raawn", chinese: "热" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "เย็น", roman: "yen", chinese: "凉；冷" },
            distinctionZh: "หนาว 常用于天气或身体觉得冷；เย็น 可指凉、冷饮或温度低。",
          },
        ],
        collocations: [
          { thai: "อากาศหนาว", roman: "aa-gaat naao", chinese: "天气冷" },
          { thai: "รู้สึกหนาว", roman: "ruu-seuk naao", chinese: "觉得冷" },
        ],
        tags: ["weather", "feeling"],
      },
    ],
    synonyms: [{ thai: "เย็น", roman: "yen", chinese: "凉；冷" }],
    antonyms: [{ thai: "ร้อน", roman: "raawn", chinese: "热" }],
    comparisons: [],
    collocations: [
      { thai: "หนาวมาก", roman: "naao maak", chinese: "很冷" },
      { thai: "ไม่หนาว", roman: "mai naao", chinese: "不冷" },
    ],
    tags: ["weather", "quality", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "op-aao",
    thai: "อบอ้าว",
    roman: "op-aao",
    chinese: "闷热",
    partOfSpeech: "adjective",
    theme: "weather",
    level: "a2",
    priority: 69,
    senses: [
      {
        id: "stuffy-humid",
        chinese: "闷热；空气不流通又热",
        examples: [
          {
            thai: "ห้องครัวอบอ้าวมากหลังทำอาหาร แม่จึงเปิดหน้าต่างและพัดลม",
            roman: "haawng-khrua op-aao maak lang tham aa-haan, maae jeung bpoet naa-dtaang lae phat-lom",
            chinese: "做饭后厨房很闷热，所以妈妈打开窗户和风扇。",
          },
        ],
        synonyms: [
          { thai: "ร้อนชื้น", roman: "raawn cheun", chinese: "湿热" },
        ],
        antonyms: [{ thai: "เย็นสบาย", roman: "yen sa-baai", chinese: "凉爽舒服" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ร้อน", roman: "raawn", chinese: "热" },
            distinctionZh: "ร้อน 只是热；อบอ้าว 强调闷、湿、空气不流通。",
          },
        ],
        collocations: [
          { thai: "อากาศอบอ้าว", roman: "aa-gaat op-aao", chinese: "天气闷热" },
          { thai: "ห้องอบอ้าว", roman: "haawng op-aao", chinese: "房间闷热" },
        ],
        tags: ["weather", "quality"],
      },
    ],
    synonyms: [{ thai: "ร้อนชื้น", roman: "raawn cheun", chinese: "湿热" }],
    antonyms: [{ thai: "เย็นสบาย", roman: "yen sa-baai", chinese: "凉爽舒服" }],
    comparisons: [],
    collocations: [
      { thai: "รู้สึกอบอ้าว", roman: "ruu-seuk op-aao", chinese: "觉得闷热" },
      { thai: "อบอ้าวเกินไป", roman: "op-aao gern bpai", chinese: "太闷热" },
    ],
    tags: ["weather", "quality", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "suai",
    thai: "สวย",
    roman: "suai",
    chinese: "漂亮；美",
    partOfSpeech: "adjective",
    theme: "quality",
    level: "a1",
    priority: 70,
    senses: [
      {
        id: "beautiful-pretty",
        chinese: "漂亮；美，可形容人、衣服、天气、景色等",
        examples: [
          {
            thai: "กระโปรงสีฟ้าตัวนี้สวยมาก แต่น้องสาวบอกว่าราคาแพงเกินไป",
            roman: "gra-bproong sii faa dtua nii suai maak, dtaae naawng-saao baawk waa raa-khaa phaaeng gern bpai",
            chinese: "这条蓝色裙子很漂亮，但妹妹说价格太贵了。",
          },
        ],
        synonyms: [
          { thai: "งาม", roman: "ngaam", chinese: "美丽", notesZh: "较书面或诗意。" },
          { thai: "น่ารัก", roman: "naa-rak", chinese: "可爱" },
        ],
        antonyms: [{ thai: "ไม่สวย", roman: "mai suai", chinese: "不漂亮" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "น่ารัก", roman: "naa-rak", chinese: "可爱" },
            distinctionZh: "สวย 是漂亮、美；น่ารัก 是可爱，语气更亲切。",
          },
        ],
        collocations: [
          { thai: "สวยมาก", roman: "suai maak", chinese: "很漂亮" },
          { thai: "ฟ้าสวย", roman: "faa suai", chinese: "天空很美" },
        ],
        tags: ["quality", "description"],
      },
    ],
    synonyms: [
      { thai: "งาม", roman: "ngaam", chinese: "美丽" },
      { thai: "น่ารัก", roman: "naa-rak", chinese: "可爱" },
    ],
    antonyms: [{ thai: "ไม่สวย", roman: "mai suai", chinese: "不漂亮" }],
    comparisons: [],
    collocations: [
      { thai: "เสื้อสวย", roman: "seua suai", chinese: "漂亮的上衣" },
      { thai: "สวยกว่า", roman: "suai gwaa", chinese: "更漂亮" },
    ],
    tags: ["quality", "adjective", "daily-life"],
    sourceRefs: DAILY_REFS,
    reviewStatus: "candidate-draft",
  },
  {
    id: "dteun",
    thai: "ตื่น",
    roman: "dteun",
    chinese: "醒；起床",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 71,
    senses: [
      {
        id: "wake-up",
        chinese: "醒；从睡眠中醒来，常用于起床时间",
        examples: [
          {
            thai: "พรุ่งนี้ฉันต้องตื่นหกโมงเช้า เพราะมีเรียนภาษาไทยตอนเจ็ดโมง",
            roman: "phrung-nii chan dtawng dteun hok moong chaao phraw mii riian phaa-saa thai dtaawn jet moong",
            chinese: "明天我必须早上六点醒，因为七点有泰语课。",
          },
        ],
        synonyms: [
          { thai: "ตื่นนอน", roman: "dteun naawn", chinese: "睡醒；起床" },
        ],
        antonyms: [{ thai: "นอน", roman: "naawn", chinese: "睡觉；躺" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "นอน", roman: "naawn", chinese: "睡觉" },
            distinctionZh: "ตื่น 是醒来；นอน 是睡觉或躺下。",
          },
        ],
        collocations: [
          { thai: "ตื่นเช้า", roman: "dteun chaao", chinese: "早起" },
          { thai: "ตื่นสาย", roman: "dteun saai", chinese: "起晚" },
        ],
        tags: ["daily-action", "time"],
      },
    ],
    synonyms: [{ thai: "ตื่นนอน", roman: "dteun naawn", chinese: "睡醒；起床" }],
    antonyms: [{ thai: "นอน", roman: "naawn", chinese: "睡觉；躺" }],
    comparisons: [],
    collocations: [
      { thai: "เพิ่งตื่น", roman: "phoeng dteun", chinese: "刚醒" },
      { thai: "นาฬิกาปลุกให้ตื่น", roman: "naa-li-gaa bpluk hai dteun", chinese: "闹钟叫醒" },
    ],
    tags: ["daily-action", "time", "routine"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "naawn",
    thai: "นอน",
    roman: "naawn",
    chinese: "睡觉；躺",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 72,
    senses: [
      {
        id: "sleep-lie-down",
        chinese: "睡觉；躺下休息",
        examples: [
          {
            thai: "หลังอ่านหนังสือเสร็จ เด็ก ๆ ปิดไฟและนอนบนที่นอนของตัวเอง",
            roman: "lang aan nang-sue set, dek dek bpit fai lae naawn bon thii-naawn khaawng dtua-eeng",
            chinese: "读完书后，孩子们关灯并睡在自己的床上。",
          },
        ],
        synonyms: [
          { thai: "พักผ่อน", roman: "phak-phaawn", chinese: "休息" },
        ],
        antonyms: [{ thai: "ตื่น", roman: "dteun", chinese: "醒；起床" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "พักผ่อน", roman: "phak-phaawn", chinese: "休息" },
            distinctionZh: "นอน 是睡觉或躺；พักผ่อน 是休息，不一定睡着。",
          },
        ],
        collocations: [
          { thai: "เข้านอน", roman: "khao naawn", chinese: "上床睡觉" },
          { thai: "นอนหลับ", roman: "naawn lap", chinese: "睡着；睡觉" },
        ],
        tags: ["daily-action", "sleep"],
      },
    ],
    synonyms: [{ thai: "พักผ่อน", roman: "phak-phaawn", chinese: "休息" }],
    antonyms: [{ thai: "ตื่น", roman: "dteun", chinese: "醒；起床" }],
    comparisons: [],
    collocations: [
      { thai: "นอนเร็ว", roman: "naawn reo", chinese: "早睡" },
      { thai: "นอนดึก", roman: "naawn duek", chinese: "晚睡" },
    ],
    tags: ["daily-action", "sleep", "routine"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "aap-naam",
    thai: "อาบน้ำ",
    roman: "aap-naam",
    chinese: "洗澡",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 73,
    senses: [
      {
        id: "bathe-shower",
        chinese: "洗澡；淋浴或沐浴",
        examples: [
          {
            thai: "หลังกลับจากตลาด ลูกอาบน้ำและเปลี่ยนเสื้อผ้าก่อนกินข้าวเย็น",
            roman: "lang glap jaak dta-laat, luuk aap-naam lae bplian seua-phaa gaawn gin khaao yen",
            chinese: "从市场回来后，孩子洗澡并换衣服，然后吃晚饭。",
          },
        ],
        synonyms: [
          { thai: "อาบ", roman: "aap", chinese: "洗；沐浴" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ล้างมือ", roman: "laang mue", chinese: "洗手" },
            distinctionZh: "อาบน้ำ 是洗澡；ล้างมือ 是洗手。",
          },
        ],
        collocations: [
          { thai: "อาบน้ำตอนเช้า", roman: "aap-naam dtaawn chaao", chinese: "早上洗澡" },
          { thai: "อาบน้ำเสร็จ", roman: "aap-naam set", chinese: "洗完澡" },
        ],
        tags: ["daily-action", "hygiene"],
      },
    ],
    synonyms: [{ thai: "อาบ", roman: "aap", chinese: "洗；沐浴" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ไปอาบน้ำ", roman: "bpai aap-naam", chinese: "去洗澡" },
      { thai: "หลังอาบน้ำ", roman: "lang aap-naam", chinese: "洗澡后" },
    ],
    tags: ["daily-action", "hygiene", "routine"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "laang",
    thai: "ล้าง",
    roman: "laang",
    chinese: "洗；冲洗",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 74,
    senses: [
      {
        id: "wash-rinse",
        chinese: "洗；冲洗，多用于手、脸、餐具、蔬果等",
        examples: [
          {
            thai: "ก่อนทำอาหาร แม่ล้างผักและล้างมือด้วยสบู่ให้สะอาด",
            roman: "gaawn tham aa-haan, maae laang phak lae laang mue duai sa-buu hai sa-aat",
            chinese: "做饭前，妈妈洗菜并用肥皂把手洗干净。",
          },
        ],
        synonyms: [
          { thai: "ชำระ", roman: "cham-ra", chinese: "清洗；清洁", notesZh: "较正式，也可用于付款等其他意义。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ซัก", roman: "sak", chinese: "洗（衣物）" },
            distinctionZh: "ล้าง 常洗手、盘子、蔬果；ซัก 常洗衣物。",
          },
        ],
        collocations: [
          { thai: "ล้างมือ", roman: "laang mue", chinese: "洗手" },
          { thai: "ล้างจาน", roman: "laang jaan", chinese: "洗盘子；洗碗" },
        ],
        tags: ["daily-action", "cleaning"],
      },
    ],
    synonyms: [{ thai: "ชำระ", roman: "cham-ra", chinese: "清洗；清洁" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ล้างหน้า", roman: "laang naa", chinese: "洗脸" },
      { thai: "ล้างผัก", roman: "laang phak", chinese: "洗菜" },
    ],
    tags: ["daily-action", "cleaning", "hygiene"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "sak-phaa",
    thai: "ซักผ้า",
    roman: "sak-phaa",
    chinese: "洗衣服",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 75,
    senses: [
      {
        id: "wash-clothes",
        chinese: "洗衣服；清洗衣物",
        examples: [
          {
            thai: "วันเสาร์แม่ซักผ้าทั้งเช้า เพราะฝนตกมาหลายวันและเสื้อผ้าเยอะมาก",
            roman: "wan sao maae sak-phaa thang chaao phraw fon dtok maa laai wan lae seua-phaa yoe maak",
            chinese: "星期六妈妈洗了一整个上午的衣服，因为下了好几天雨，衣服很多。",
          },
        ],
        synonyms: [
          { thai: "ซัก", roman: "sak", chinese: "洗（衣物）" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ล้างจาน", roman: "laang jaan", chinese: "洗盘子" },
            distinctionZh: "ซักผ้า 是洗衣服；ล้างจาน 是洗盘子/洗碗。",
          },
        ],
        collocations: [
          { thai: "เครื่องซักผ้า", roman: "khreuuang-sak-phaa", chinese: "洗衣机" },
          { thai: "ซักเสื้อผ้า", roman: "sak seua-phaa", chinese: "洗衣服" },
        ],
        tags: ["daily-action", "cleaning", "clothing"],
      },
    ],
    synonyms: [{ thai: "ซัก", roman: "sak", chinese: "洗（衣物）" }],
    antonyms: [],
    comparisons: [],
    collocations: [
      { thai: "ต้องซักผ้า", roman: "dtawng sak-phaa", chinese: "得洗衣服" },
      { thai: "ซักผ้าตอนเช้า", roman: "sak-phaa dtaawn chaao", chinese: "早上洗衣服" },
    ],
    tags: ["daily-action", "cleaning", "clothing"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "tham-khwaam-sa-aat",
    thai: "ทำความสะอาด",
    roman: "tham-khwaam-sa-aat",
    chinese: "打扫；清洁",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 76,
    senses: [
      {
        id: "clean",
        chinese: "打扫；清洁房间、物品或地方",
        examples: [
          {
            thai: "ก่อนครอบครัวมาถึง พี่สาวทำความสะอาดห้องรับแขกและเปิดหน้าต่าง",
            roman: "gaawn khraawp-khrua maa thueng, phii-saao tham-khwaam-sa-aat haawng rap-khaaek lae bpoet naa-dtaang",
            chinese: "家人到达前，姐姐打扫客厅并打开窗户。",
          },
        ],
        synonyms: [
          { thai: "ทำความสะอาดบ้าน", roman: "tham-khwaam-sa-aat baan", chinese: "打扫家里" },
        ],
        antonyms: [{ thai: "ทำสกปรก", roman: "tham so-ga-bprok", chinese: "弄脏" }],
        comparisons: [
          {
            kind: "usage",
            target: { thai: "ล้าง", roman: "laang", chinese: "洗；冲洗" },
            distinctionZh: "ทำความสะอาด 范围更大，可打扫房间；ล้าง 更常指用水洗某物。",
          },
        ],
        collocations: [
          { thai: "ทำความสะอาดห้อง", roman: "tham-khwaam-sa-aat haawng", chinese: "打扫房间" },
          { thai: "ทำความสะอาดบ้าน", roman: "tham-khwaam-sa-aat baan", chinese: "打扫家里" },
        ],
        tags: ["daily-action", "cleaning"],
      },
    ],
    synonyms: [{ thai: "เก็บกวาด", roman: "gep-gwaat", chinese: "收拾打扫" }],
    antonyms: [{ thai: "ทำสกปรก", roman: "tham so-ga-bprok", chinese: "弄脏" }],
    comparisons: [],
    collocations: [
      { thai: "ช่วยทำความสะอาด", roman: "chuai tham-khwaam-sa-aat", chinese: "帮忙打扫" },
      { thai: "ทำความสะอาดทุกวัน", roman: "tham-khwaam-sa-aat thuk wan", chinese: "每天打扫" },
    ],
    tags: ["daily-action", "cleaning", "home"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpoet",
    thai: "เปิด",
    roman: "bpoet",
    chinese: "开；打开",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 77,
    senses: [
      {
        id: "open-turn-on",
        chinese: "开；打开门窗、书，或打开电器/灯",
        examples: [
          {
            thai: "ตอนเช้าแม่เปิดประตูและเปิดไฟในครัวก่อนทำอาหารให้ครอบครัว",
            roman: "dtaawn chaao maae bpoet bpra-dtuu lae bpoet fai nai khrua gaawn tham aa-haan hai khraawp-khrua",
            chinese: "早上妈妈先打开门并打开厨房的灯，然后给家人做饭。",
          },
        ],
        synonyms: [],
        antonyms: [{ thai: "ปิด", roman: "bpit", chinese: "关；关闭" }],
        comparisons: [
          {
            kind: "antonym",
            target: { thai: "ปิด", roman: "bpit", chinese: "关；关闭" },
            distinctionZh: "เปิด 是打开/开机；ปิด 是关上/关机。",
          },
        ],
        collocations: [
          { thai: "เปิดประตู", roman: "bpoet bpra-dtuu", chinese: "开门" },
          { thai: "เปิดไฟ", roman: "bpoet fai", chinese: "开灯" },
        ],
        tags: ["daily-action", "core-verb"],
      },
    ],
    synonyms: [],
    antonyms: [{ thai: "ปิด", roman: "bpit", chinese: "关；关闭" }],
    comparisons: [],
    collocations: [
      { thai: "เปิดหน้าต่าง", roman: "bpoet naa-dtaang", chinese: "开窗" },
      { thai: "เปิดหนังสือ", roman: "bpoet nang-sue", chinese: "打开书" },
    ],
    tags: ["daily-action", "home", "core-verb"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "bpit",
    thai: "ปิด",
    roman: "bpit",
    chinese: "关；关闭",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 78,
    senses: [
      {
        id: "close-turn-off",
        chinese: "关；关门窗，或关灯、关电器",
        examples: [
          {
            thai: "ก่อนออกจากห้อง ครูปิดหน้าต่างและปิดพัดลมให้เรียบร้อย",
            roman: "gaawn aawk jaak haawng, khruu bpit naa-dtaang lae bpit phat-lom hai riiap-raawy",
            chinese: "离开房间前，老师把窗户和风扇都关好。",
          },
        ],
        synonyms: [],
        antonyms: [{ thai: "เปิด", roman: "bpoet", chinese: "开；打开" }],
        comparisons: [
          {
            kind: "antonym",
            target: { thai: "เปิด", roman: "bpoet", chinese: "开；打开" },
            distinctionZh: "ปิด 是关；เปิด 是开。两者可用于门窗、灯、电器等。",
          },
        ],
        collocations: [
          { thai: "ปิดประตู", roman: "bpit bpra-dtuu", chinese: "关门" },
          { thai: "ปิดไฟ", roman: "bpit fai", chinese: "关灯" },
        ],
        tags: ["daily-action", "core-verb"],
      },
    ],
    synonyms: [],
    antonyms: [{ thai: "เปิด", roman: "bpoet", chinese: "开；打开" }],
    comparisons: [],
    collocations: [
      { thai: "ปิดหน้าต่าง", roman: "bpit naa-dtaang", chinese: "关窗" },
      { thai: "ปิดโทรศัพท์", roman: "bpit thoo-ra-sap", chinese: "关手机" },
    ],
    tags: ["daily-action", "home", "core-verb"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "sai",
    thai: "ใส่",
    roman: "sai",
    chinese: "穿；戴；放入",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 79,
    senses: [
      {
        id: "wear-put-in",
        chinese: "穿、戴；也可表示把东西放进容器里",
        examples: [
          {
            thai: "ก่อนออกจากบ้าน ลูกใส่รองเท้า ใส่หมวก และใส่หนังสือไว้ในกระเป๋า",
            roman: "gaawn aawk jaak baan, luuk sai raawng-thaao, sai muaak, lae sai nang-sue wai nai gra-bpao",
            chinese: "出门前，孩子穿鞋、戴帽子，并把书放进包里。",
          },
        ],
        synonyms: [
          { thai: "สวม", roman: "suam", chinese: "穿；戴", notesZh: "更正式或书面，常用于穿戴。" },
        ],
        antonyms: [{ thai: "ถอด", roman: "thaawt", chinese: "脱下；摘下" }],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "สวม", roman: "suam", chinese: "穿；戴" },
            distinctionZh: "ใส่ 是日常高频；สวม 更正式，偏穿戴衣物或配件。",
          },
        ],
        collocations: [
          { thai: "ใส่เสื้อ", roman: "sai seua", chinese: "穿上衣" },
          { thai: "ใส่ในกระเป๋า", roman: "sai nai gra-bpao", chinese: "放进包里" },
        ],
        tags: ["daily-action", "clothing"],
      },
    ],
    synonyms: [{ thai: "สวม", roman: "suam", chinese: "穿；戴" }],
    antonyms: [{ thai: "ถอด", roman: "thaawt", chinese: "脱下；摘下" }],
    comparisons: [],
    collocations: [
      { thai: "ใส่แว่นตา", roman: "sai waaen-dtaa", chinese: "戴眼镜" },
      { thai: "ใส่ถุงเท้า", roman: "sai thung-thaao", chinese: "穿袜子" },
    ],
    tags: ["daily-action", "clothing", "core-verb"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
  {
    id: "thaawt",
    thai: "ถอด",
    roman: "thaawt",
    chinese: "脱下；摘下",
    partOfSpeech: "verb",
    theme: "daily-action",
    level: "a1",
    priority: 80,
    senses: [
      {
        id: "take-off-remove",
        chinese: "脱下；摘下衣物、鞋、帽子、眼镜等",
        examples: [
          {
            thai: "เมื่อเข้าบ้านแล้ว เด็ก ๆ ถอดรองเท้าและถอดหมวกก่อนนั่งบนเก้าอี้",
            roman: "muea khao baan laaeo, dek dek thaawt raawng-thaao lae thaawt muaak gaawn nang bon gao-ii",
            chinese: "进屋后，孩子们先脱鞋、摘帽子，然后坐在椅子上。",
          },
        ],
        synonyms: [
          { thai: "เอาออก", roman: "ao aawk", chinese: "拿出；取下" },
        ],
        antonyms: [{ thai: "ใส่", roman: "sai", chinese: "穿；戴；放入" }],
        comparisons: [
          {
            kind: "antonym",
            target: { thai: "ใส่", roman: "sai", chinese: "穿；戴；放入" },
            distinctionZh: "ถอด 是从身上取下；ใส่ 是穿上、戴上或放进去。",
          },
        ],
        collocations: [
          { thai: "ถอดรองเท้า", roman: "thaawt raawng-thaao", chinese: "脱鞋" },
          { thai: "ถอดหมวก", roman: "thaawt muaak", chinese: "摘帽子" },
        ],
        tags: ["daily-action", "clothing"],
      },
    ],
    synonyms: [{ thai: "เอาออก", roman: "ao aawk", chinese: "拿出；取下" }],
    antonyms: [{ thai: "ใส่", roman: "sai", chinese: "穿；戴；放入" }],
    comparisons: [],
    collocations: [
      { thai: "ถอดแว่นตา", roman: "thaawt waaen-dtaa", chinese: "摘眼镜" },
      { thai: "ถอดเสื้อ", roman: "thaawt seua", chinese: "脱上衣" },
    ],
    tags: ["daily-action", "clothing", "core-verb"],
    sourceRefs: [...DAILY_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  },
] satisfies VocabularyExpansionCandidate[];
