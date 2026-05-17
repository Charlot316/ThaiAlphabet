export type VocabularyExpansionPartOfSpeech = "noun" | "verb";

export type VocabularyExpansionTheme = "food" | "ingredient" | "cooking-action";

export type VocabularyExpansionExample = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionRelatedWord = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionComparison = {
  kind: "near-synonym" | "antonym" | "confusable" | "usage" | "register-pair";
  target: VocabularyExpansionRelatedWord;
  distinctionZh: string;
};

export type VocabularyExpansionCollocation = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

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
  level: "a1" | "a2";
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

type IngredientRow = readonly [
  thai: string,
  id: string,
  roman: string,
  chinese: string,
  level?: "a1" | "a2",
];

type CookingRow = readonly [
  thai: string,
  id: string,
  roman: string,
  chinese: string,
  objectThai: string,
  objectRoman: string,
  objectChinese: string,
  level?: "a1" | "a2",
];

const FOOD_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];
const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar"];

const ingredients = [
  ["ไข่", "khai-egg", "khai", "鸡蛋"],
  ["ไข่ไก่", "khai-gai", "khai-gai", "鸡蛋"],
  ["ไข่เป็ด", "khai-bpet", "khai-bpet", "鸭蛋", "a2"],
  ["ไก่", "gai", "gai", "鸡肉；鸡"],
  ["หมู", "muu", "muu", "猪肉；猪"],
  ["เนื้อ", "nuea-meat", "nuea", "肉；牛肉"],
  ["เนื้อวัว", "nuea-wua", "nuea-wua", "牛肉"],
  ["ปลา", "bplaa", "bplaa", "鱼"],
  ["กุ้ง", "gung", "gung", "虾"],
  ["ปู", "bpuu-crab", "bpuu", "螃蟹"],
  ["ปลาหมึก", "bplaa-muek", "bplaa-muek", "鱿鱼；墨鱼"],
  ["หอย", "haawy", "haawy", "贝类；蛤蜊"],
  ["ผัก", "phak", "phak", "蔬菜"],
  ["ผักบุ้ง", "phak-bung", "phak-bung", "空心菜"],
  ["กะเพรา", "ga-phrao", "ga-phrao", "圣罗勒"],
  ["โหระพา", "hoo-ra-phaa", "hoo-ra-phaa", "甜罗勒", "a2"],
  ["ผักชี", "phak-chii", "phak-chii", "香菜"],
  ["ต้นหอม", "dton-haawm", "dton-haawm", "葱"],
  ["กระเทียม", "gra-thiiam", "gra-thiiam", "大蒜"],
  ["หอมแดง", "haawm-daaeng", "haawm-daaeng", "红葱头"],
  ["หัวหอม", "hua-haawm", "hua-haawm", "洋葱"],
  ["พริก", "phrik", "phrik", "辣椒"],
  ["พริกไทย", "phrik-thai", "phrik-thai", "胡椒"],
  ["มะเขือเทศ", "ma-kheua-theet", "ma-kheua-theet", "番茄"],
  ["แตงกวา", "dtaaeng-gwaa", "dtaaeng-gwaa", "黄瓜"],
  ["แครอต", "khaae-raawt", "khaae-raawt", "胡萝卜"],
  ["มันฝรั่ง", "man-fa-rang", "man-fa-rang", "土豆"],
  ["ข้าวโพด", "khaao-phoot", "khaao-phoot", "玉米"],
  ["เห็ด", "het", "het", "蘑菇"],
  ["ถั่ว", "thua", "thua", "豆；豆类"],
  ["ถั่วฝักยาว", "thua-fak-yaao", "thua-fak-yaao", "长豆角"],
  ["ถั่วลิสง", "thua-li-song", "thua-li-song", "花生"],
  ["มะนาว", "ma-naao", "ma-naao", "青柠"],
  ["มะพร้าว", "ma-phraao", "ma-phraao", "椰子"],
  ["กล้วย", "gluai", "gluai", "香蕉"],
  ["มะม่วง", "ma-muang", "ma-muang", "芒果"],
  ["ส้ม", "som", "som", "橙子；柑橘"],
  ["แตงโม", "dtaaeng-moo", "dtaaeng-moo", "西瓜"],
  ["สับปะรด", "sap-bpa-rot", "sap-bpa-rot", "菠萝"],
  ["มะละกอ", "ma-la-gaaw", "ma-la-gaaw", "木瓜"],
  ["ขนุน", "kha-nun", "kha-nun", "菠萝蜜", "a2"],
  ["ลำไย", "lam-yai", "lam-yai", "龙眼", "a2"],
  ["นม", "nom", "nom", "牛奶；奶"],
  ["โยเกิร์ต", "yoo-goet", "yoo-goet", "酸奶"],
  ["ชีส", "chiit", "chiit", "奶酪"],
  ["เนย", "noei", "noei", "黄油"],
  ["น้ำตาล", "nam-dtaan", "nam-dtaan", "糖"],
  ["เกลือ", "gleua", "gleua", "盐"],
  ["น้ำปลา", "nam-bplaa", "nam-bplaa", "鱼露"],
  ["ซีอิ๊ว", "sii-iu", "sii-iu", "酱油"],
  ["ซอส", "saawt", "saawt", "酱；酱汁"],
  ["น้ำมัน", "nam-man", "nam-man", "油"],
  ["น้ำมันพืช", "nam-man-phueut", "nam-man-phueut", "植物油"],
  ["กะทิ", "ga-thi", "ga-thi", "椰浆"],
  ["แป้งข้าวเจ้า", "bpaaeng-khaao-jao", "bpaaeng-khaao-jao", "粘米粉", "a2"],
  ["แป้งมัน", "bpaaeng-man", "bpaaeng-man", "木薯粉", "a2"],
  ["ข้าวเหนียว", "khaao-niaao", "khaao-niaao", "糯米"],
  ["เส้นก๋วยเตี๋ยว", "sen-guai-dtiaao", "sen-guai-dtiaao", "河粉；米粉"],
  ["วุ้นเส้น", "wun-sen", "wun-sen", "粉丝"],
  ["ขนมปัง", "kha-nom-bpang", "kha-nom-bpang", "面包"],
  ["ขนม", "kha-nom", "kha-nom", "点心；甜食"],
  ["แกง", "gaaeng", "gaaeng", "咖喱汤；泰式汤菜"],
  ["ซุป", "sup", "sup", "汤"],
  ["ส้มตำ", "som-dtam", "som-dtam", "青木瓜沙拉"],
  ["น้ำจิ้ม", "nam-jim", "nam-jim", "蘸酱"],
  ["อาหารเช้า", "aa-haan-chaao", "aa-haan-chaao", "早餐"],
  ["อาหารกลางวัน", "aa-haan-glaang-wan", "aa-haan-glaang-wan", "午餐"],
  ["อาหารเย็น", "aa-haan-yen", "aa-haan-yen", "晚餐"],
  ["ของหวาน", "khaawng-waan", "khaawng-waan", "甜点"],
  ["ของว่าง", "khaawng-waang", "khaawng-waang", "零食；点心"],
] as const satisfies readonly IngredientRow[];

const cookingActions = [
  ["ตำ", "dtam", "dtam", "捣；舂", "พริก", "phrik", "辣椒"],
  ["ยำ", "yam", "yam", "拌成酸辣沙拉", "วุ้นเส้น", "wun-sen", "粉丝"],
  ["คลุก", "khluk", "khluk", "拌匀", "ข้าวกับไข่", "khaao gap khai", "米饭和鸡蛋"],
  ["คนส่วนผสม", "khon-suan-pha-som", "khon suan-pha-som", "搅拌材料", "ให้เข้ากัน", "hai khao gan", "均匀"],
  ["ตวง", "dtuang", "dtuang", "量取", "น้ำตาล", "nam-dtaan", "糖"],
  ["ชั่ง", "chang-weigh", "chang", "称重", "แป้ง", "bpaaeng", "粉"],
  ["แช่", "chaae", "chaae", "浸泡", "ข้าวเหนียว", "khaao-niaao", "糯米"],
  ["ลวก", "luak", "luak", "焯；烫熟", "ผัก", "phak", "蔬菜"],
  ["เคี่ยว", "khiaao", "khiaao", "小火熬煮", "แกง", "gaaeng", "咖喱汤菜"],
  ["หมัก", "mak", "mak", "腌制", "หมู", "muu", "猪肉"],
  ["ปรุง", "bprung", "bprung", "调味；烹调", "ซุป", "sup", "汤"],
  ["เติม", "dterm", "dterm", "添加；补充", "น้ำ", "naam", "水"],
  ["โรย", "rooi", "rooi", "撒", "พริกไทย", "phrik-thai", "胡椒"],
  ["ราด", "raat", "raat", "浇；淋", "น้ำจิ้ม", "nam-jim", "蘸酱"],
  ["บด", "bot", "bot", "压碎；磨碎", "มันฝรั่ง", "man-fa-rang", "土豆"],
  ["คั้น", "khan", "khan", "挤汁", "มะนาว", "ma-naao", "青柠"],
  ["คั่ว", "khua", "khua", "干炒；烘炒", "ถั่วลิสง", "thua-li-song", "花生"],
  ["กรอง", "graawng", "graawng", "过滤", "น้ำซุป", "naam sup", "汤汁"],
  ["ละลาย", "la-laai", "la-laai", "溶解", "น้ำตาล", "nam-dtaan", "糖"],
  ["แกะ", "gae", "gae", "剥；拆", "กุ้ง", "gung", "虾"],
  ["เด็ด", "det", "det", "摘；掐下", "ใบกะเพรา", "bai ga-phrao", "圣罗勒叶"],
  ["ซาวข้าว", "saao-khaao", "saao khaao", "淘米", "ข้าวสาร", "khaao-saan", "生米"],
  ["เจียว", "jiaao", "jiaao", "煎；炸香", "ไข่", "khai", "鸡蛋"],
  ["ตัก", "dtak", "dtak", "舀；盛", "ข้าว", "khaao", "米饭"],
  ["เสิร์ฟ", "soef", "soef", "上菜；端上", "อาหาร", "aa-haan", "食物"],
  ["อบ", "op", "op", "烤；烘焙", "ขนมปัง", "kha-nom-bpang", "面包"],
  ["ผสม", "pha-som", "pha-som", "混合", "แป้งกับน้ำ", "bpaaeng gap naam", "粉和水"],
  ["ปั่น", "bpan", "bpan", "搅打；用搅拌机打", "ผลไม้", "phon-la-maai", "水果"],
  ["บีบ", "biip", "biip", "挤", "มะนาว", "ma-naao", "青柠"],
  ["แต่งหน้าอาหาร", "dtaeng-naa-aa-haan", "dtaeng naa aa-haan", "摆盘；装饰菜面", "จานอาหาร", "jaan aa-haan", "一盘菜", "a2"],
] as const satisfies readonly CookingRow[];

const ingredientCandidate = (row: IngredientRow, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, level = "a1"] = row;
  const collocations = [
    { thai: `ซื้อ${thai}`, roman: `sue ${roman}`, chinese: `买${chinese}` },
    { thai: `เตรียม${thai}`, roman: `dtriiam ${roman}`, chinese: `准备${chinese}` },
  ];
  const usageNotesZh = [`${thai} 是真实泰语食材/食品词，先按“${chinese}”理解，再通过菜单和家庭做饭语境积累搭配。`];

  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech: "noun",
    theme: "ingredient",
    level,
    priority: index + 1,
    senses: [
      {
        id: "ingredient-or-food",
        chinese: `${chinese}；日常做饭、点餐或买菜时常见的食材/食品`,
        examples: [
          {
            thai: `แม่เตรียม${thai}ไว้ในครัวก่อนทำอาหารเย็นให้ครอบครัว`,
            roman: `maae dtriiam ${roman} wai nai khrua gaawn tham aa-haan yen hai khraawp-khrua`,
            chinese: `妈妈在厨房里准备${chinese}，然后给家人做晚饭。`,
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [],
        collocations,
        usageNotesZh,
        tags: ["food", "ingredient"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh,
    tags: ["food", "ingredient", "daily-life"],
    sourceRefs: FOOD_REFS,
    reviewStatus: "candidate-draft",
  };
};

const cookingCandidate = (row: CookingRow, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, objectThai, objectRoman, objectChinese, level = "a1"] = row;
  const collocations = [
    { thai: `${thai}${objectThai}`, roman: `${roman} ${objectRoman}`, chinese: `${chinese}${objectChinese}` },
  ];
  const usageNotesZh = [`${thai} 是厨房动作词，常直接接食材或菜名；先记搭配“${thai}${objectThai}”。`];

  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech: "verb",
    theme: "cooking-action",
    level,
    priority: ingredients.length + index + 1,
    senses: [
      {
        id: "cooking-action",
        chinese: `${chinese}；厨房和做饭流程中的常见动作`,
        examples: [
          {
            thai: `แม่${thai}${objectThai}ในครัวตอนเย็น เพราะครอบครัวจะกินข้าวด้วยกัน`,
            roman: `maae ${roman} ${objectRoman} nai khrua dtaawn yen phraw khraawp-khrua ja gin khaao duai gan`,
            chinese: `妈妈傍晚在厨房${chinese}${objectChinese}，因为家人要一起吃饭。`,
          },
        ],
        synonyms: [],
        antonyms: [],
        comparisons: [],
        collocations,
        usageNotesZh,
        tags: ["cooking", "verb"],
      },
    ],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh,
    tags: ["cooking", "daily-action", "kitchen"],
    sourceRefs: [...FOOD_REFS, ...GRAMMAR_REFS],
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_DAILY_04 = [
  ...ingredients.map(ingredientCandidate),
  ...cookingActions.map(cookingCandidate),
] satisfies VocabularyExpansionCandidate[];
