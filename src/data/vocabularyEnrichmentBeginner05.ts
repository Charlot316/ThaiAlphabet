import type { VocabularyEnrichment } from "./types";

const CORE_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];
const GRAMMAR_REFS = ["complete-thai-a1", "into-asia-grammar"];
const SHOPPING_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100", "loecsen-thai"];
const TRAVEL_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100", "loecsen-thai"];

export const VOCABULARY_ENRICHMENT_BEGINNER_05 = [
  {
    id: "enrich-duem",
    vocabularyId: "duem",
    thai: "ดื่ม",
    roman: "duuem",
    chinese: "喝",
    english: "drink",
    senses: [
      {
        id: "drink-liquid",
        chinese: "喝；把水、咖啡、茶等液体喝下去",
        english: "to drink a liquid such as water, coffee, or tea",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "ตอนเช้าฉันดื่มน้ำหนึ่งแก้วก่อนดื่มกาแฟ เพราะไม่อยากปวดท้อง",
            roman: "dtaawn-chaao chan duuem naam nueng gaaeow gaawn duuem gaa-faae, phraw mai yaak bpuat-thaawng",
            chinese: "早上我先喝一杯水再喝咖啡，因为不想肚子疼。",
            english: "In the morning I drink a glass of water before drinking coffee because I do not want a stomachache.",
            grammarIds: ["classifier-measure-words", "condition-time-clauses", "conjunction-contrast-reason", "want-like-preference"],
          },
        ],
        synonyms: [
          { thai: "กิน", roman: "gin", chinese: "吃；喝", notesZh: "口语里也可用于喝水、喝药，但 ดื่ม 更明确是喝液体。" },
          { thai: "จิบ", roman: "jip", chinese: "小口喝；啜饮", notesZh: "强调一小口一小口喝。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { vocabularyId: "gin", thai: "กิน", roman: "gin", chinese: "吃" },
            distinctionZh: "ดื่ม 专指喝液体；กิน 更宽，可表示吃，也可口语说 กินน้ำ、กินยา。",
          },
        ],
        collocations: [
          { thai: "ดื่มน้ำ", roman: "duuem naam", chinese: "喝水", english: "drink water" },
          { thai: "ดื่มกาแฟ", roman: "duuem gaa-faae", chinese: "喝咖啡", english: "drink coffee" },
          { thai: "เครื่องดื่ม", roman: "khreuuang-duuem", chinese: "饮料", english: "beverage" },
        ],
        grammarIds: ["verb-transitivity-transitive", "classifier-measure-words"],
        tags: ["drink", "food", "daily-action"],
      },
    ],
    synonyms: [
      { thai: "กิน", roman: "gin", chinese: "吃；喝" },
      { thai: "จิบ", roman: "jip", chinese: "小口喝" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { vocabularyId: "gin", thai: "กิน", roman: "gin", chinese: "吃" },
        distinctionZh: "点饮料或说喝水时 ดื่ม 更精准；日常闲聊中也常听到 กินน้ำ。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ดื่มน้ำหนึ่งแก้ว", roman: "duuem naam nueng gaaeow", chinese: "喝一杯水", english: "drink one glass of water" },
      { thai: "อยากดื่มอะไร", roman: "yaak duuem a-rai", chinese: "想喝什么", english: "what would you like to drink" },
    ],
    learningNotesZh: ["ดื่ม 是初学者表达“喝”的安全词；饮品名常直接放在后面，不需要介词。"],
    sourceRefs: CORE_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-sue",
    vocabularyId: "sue",
    thai: "ซื้อ",
    roman: "sue",
    chinese: "买",
    english: "buy",
    senses: [
      {
        id: "buy-pay-for",
        chinese: "买；付钱取得商品或服务",
        english: "to buy; to pay money to get goods or a service",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "เย็นนี้ฉันจะไปตลาดเพื่อซื้อผลไม้สดให้แม่ แต่ถ้าฝนตกจะซื้อที่ร้านใกล้บ้าน",
            roman: "yen-nii chan ja bpai dta-laat phuea sue phon-la-maai sot hai maae, dtaae thaa fon dtok ja sue thii raan glai baan",
            chinese: "今晚我会去市场给妈妈买新鲜水果，但如果下雨，就在家附近的店买。",
            english: "This evening I will go to the market to buy fresh fruit for my mother, but if it rains, I will buy it at the shop near home.",
            grammarIds: ["future-ja", "purpose-phuea", "benefactive-hai", "condition-time-clauses"],
          },
        ],
        synonyms: [
          { thai: "ซื้อหา", roman: "sue-haa", chinese: "购置；买到", notesZh: "比 ซื้อ 稍书面，常有“设法买来”的感觉。" },
          { thai: "เอา", roman: "ao", chinese: "要；拿", notesZh: "购物口语里可说 เอาอันนี้，但它本义更宽。" },
        ],
        antonyms: [
          { vocabularyId: "khaai", thai: "ขาย", roman: "khaai", chinese: "卖" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "เอา", roman: "ao", chinese: "要；拿" },
            distinctionZh: "ซื้อ 明确表示花钱买；เอา 在店里像“我要这个”，但不一定强调付款动作。",
          },
          {
            kind: "grammar-pair",
            target: { vocabularyId: "khaai", thai: "ขาย", roman: "khaai", chinese: "卖" },
            distinctionZh: "ซื้อ 是买方动作；ขาย 是卖方动作，交易方向相反。",
          },
        ],
        collocations: [
          { thai: "ซื้อของ", roman: "sue khaawng", chinese: "买东西", english: "buy things; shop" },
          { thai: "ซื้อให้แม่", roman: "sue hai maae", chinese: "买给妈妈", english: "buy for mother" },
          { thai: "ไปซื้อ", roman: "bpai sue", chinese: "去买", english: "go buy" },
        ],
        grammarIds: ["verb-transitivity-transitive", "benefactive-hai", "serial-verbs-basic"],
        tags: ["shopping", "transaction"],
      },
    ],
    synonyms: [
      { thai: "ซื้อหา", roman: "sue-haa", chinese: "购置；买到" },
      { thai: "เอา", roman: "ao", chinese: "要；拿", notesZh: "购物点选时很常见。" },
    ],
    antonyms: [
      { vocabularyId: "khaai", thai: "ขาย", roman: "khaai", chinese: "卖", english: "sell" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "khaai", thai: "ขาย", roman: "khaai", chinese: "卖" },
        distinctionZh: "记成一对交易动词：ลูกค้า ซื้อ，ร้านค้า ขาย。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ซื้อผลไม้", roman: "sue phon-la-maai", chinese: "买水果", english: "buy fruit" },
      { thai: "ซื้อสองอัน", roman: "sue saawng an", chinese: "买两个", english: "buy two pieces" },
      { thai: "ซื้อที่ตลาด", roman: "sue thii dta-laat", chinese: "在市场买", english: "buy at the market" },
    ],
    learningNotesZh: ["ซื้อ 后面直接接要买的东西；“买给某人”常用 ซื้อ + 东西 + ให้ + 人。"],
    sourceRefs: SHOPPING_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-khaai",
    vocabularyId: "khaai",
    thai: "ขาย",
    roman: "khaai",
    chinese: "卖",
    english: "sell",
    senses: [
      {
        id: "sell-offer-for-money",
        chinese: "卖；把商品或服务提供给别人并收钱",
        english: "to sell; to offer goods or services in exchange for money",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "ร้านเล็กหน้าตลาดขายกาแฟและชาเย็นตั้งแต่เจ็ดโมงเช้าถึงบ่ายสามโมง",
            roman: "raan lek naa dta-laat khaai gaa-faae lae chaa yen dtang-dtaae jet moong chaao thueng baai saam moong",
            chinese: "市场前面的小店从早上七点到下午三点卖咖啡和冰茶。",
            english: "The small shop in front of the market sells coffee and iced tea from seven in the morning until three in the afternoon.",
            grammarIds: ["conjunction-and-with", "time-words-context", "location-prepositions"],
          },
        ],
        synonyms: [
          { thai: "จำหน่าย", roman: "jam-naai", chinese: "销售；出售", notesZh: "较正式，常见于告示、商店说明。" },
          { thai: "ค้าขาย", roman: "khaa-khaai", chinese: "做买卖；经商", notesZh: "强调经营买卖这个活动。" },
        ],
        antonyms: [
          { vocabularyId: "sue", thai: "ซื้อ", roman: "sue", chinese: "买" },
        ],
        comparisons: [
          {
            kind: "register-pair",
            target: { thai: "จำหน่าย", roman: "jam-naai", chinese: "销售；出售" },
            distinctionZh: "ขาย 是日常核心词；จำหน่าย 更像正式标牌或商品说明。",
          },
          {
            kind: "grammar-pair",
            target: { vocabularyId: "sue", thai: "ซื้อ", roman: "sue", chinese: "买" },
            distinctionZh: "ขาย 从卖家角度说；ซื้อ 从买家角度说。",
          },
        ],
        collocations: [
          { thai: "ขายของ", roman: "khaai khaawng", chinese: "卖东西；做小买卖", english: "sell things" },
          { thai: "ขายดี", roman: "khaai dii", chinese: "卖得好；畅销", english: "sell well" },
          { thai: "ไม่ขาย", roman: "mai khaai", chinese: "不卖", english: "not sell" },
        ],
        grammarIds: ["verb-transitivity-transitive", "negation-mai"],
        tags: ["shopping", "transaction"],
      },
    ],
    synonyms: [
      { thai: "จำหน่าย", roman: "jam-naai", chinese: "销售；出售" },
      { thai: "ค้าขาย", roman: "khaa-khaai", chinese: "做买卖；经商" },
    ],
    antonyms: [
      { vocabularyId: "sue", thai: "ซื้อ", roman: "sue", chinese: "买", english: "buy" },
    ],
    comparisons: [
      {
        kind: "register-pair",
        target: { thai: "จำหน่าย", roman: "jam-naai", chinese: "销售；出售" },
        distinctionZh: "日常口语和初级句子用 ขาย 最自然；正式商品标签可见 จำหน่าย。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ร้านนี้ขายอะไร", roman: "raan nii khaai a-rai", chinese: "这家店卖什么", english: "what does this shop sell" },
      { thai: "ขายกาแฟ", roman: "khaai gaa-faae", chinese: "卖咖啡", english: "sell coffee" },
      { thai: "ขายหมดแล้ว", roman: "khaai mot laaeo", chinese: "卖完了", english: "sold out" },
    ],
    learningNotesZh: ["ขาย 可以直接接商品；ขายดี 是常见固定搭配，表示“卖得好”。"],
    sourceRefs: SHOPPING_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-dta-laat",
    vocabularyId: "dta-laat",
    thai: "ตลาด",
    roman: "dta-laat",
    chinese: "市场",
    english: "market",
    senses: [
      {
        id: "physical-market",
        chinese: "市场；买卖食物、日用品等的地方",
        english: "a market; a place where food, goods, and daily items are bought and sold",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "ตลาดเช้าใกล้โรงแรมนี้มีผลไม้สดหลายอย่าง และราคาไม่แพงมาก",
            roman: "dta-laat chaao glai roong-raem nii mii phon-la-maai sot laai yaang, lae raa-khaa mai phaaeng maak",
            chinese: "这家酒店附近的早市有很多种新鲜水果，而且价格不太贵。",
            english: "The morning market near this hotel has many kinds of fresh fruit, and the prices are not very expensive.",
            grammarIds: ["core-have-exist-mii", "demonstratives-nii-nan-noon", "conjunction-and-with", "negation-mai"],
          },
        ],
        synonyms: [
          { thai: "ตลาดสด", roman: "dta-laat sot", chinese: "生鲜市场", notesZh: "常卖新鲜食材。" },
          { thai: "ตลาดนัด", roman: "dta-laat nat", chinese: "集市；临时市场", notesZh: "通常按固定日期或时段开。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ร้าน", roman: "raan", chinese: "商店；店" },
            distinctionZh: "ตลาด 是有很多摊位或店家的市场；ร้าน 是单个店或餐馆。",
          },
          {
            kind: "near-synonym",
            target: { thai: "ห้าง", roman: "haang", chinese: "商场" },
            distinctionZh: "ตลาด 更生活化、开放；ห้าง 是室内商场或百货商场。",
          },
        ],
        collocations: [
          { thai: "ไปตลาด", roman: "bpai dta-laat", chinese: "去市场", english: "go to the market" },
          { thai: "ตลาดเช้า", roman: "dta-laat chaao", chinese: "早市", english: "morning market" },
          { thai: "ในตลาด", roman: "nai dta-laat", chinese: "在市场里", english: "in the market" },
        ],
        grammarIds: ["location-prepositions", "core-have-exist-mii"],
        tags: ["place", "shopping"],
      },
    ],
    synonyms: [
      { thai: "ตลาดสด", roman: "dta-laat sot", chinese: "生鲜市场" },
      { thai: "ตลาดนัด", roman: "dta-laat nat", chinese: "集市；临时市场" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ร้าน", roman: "raan", chinese: "店" },
        distinctionZh: "ตลาด 是地点集合；ร้าน 是单个商店、摊位或餐馆。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ซื้อของที่ตลาด", roman: "sue khaawng thii dta-laat", chinese: "在市场买东西", english: "shop at the market" },
      { thai: "ตลาดใกล้บ้าน", roman: "dta-laat glai baan", chinese: "家附近的市场", english: "market near home" },
      { thai: "ตลาดใหญ่", roman: "dta-laat yai", chinese: "大市场", english: "big market" },
    ],
    learningNotesZh: ["ตลาด 常和 去、在、附近 等位置表达一起用：ไปตลาด、ที่ตลาด、ใกล้ตลาด。"],
    sourceRefs: SHOPPING_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-rong-raem",
    vocabularyId: "rong-raem",
    thai: "โรงแรม",
    roman: "roong-raem",
    chinese: "酒店",
    english: "hotel",
    senses: [
      {
        id: "hotel-lodging-place",
        chinese: "酒店；旅途中付费住宿的地方",
        english: "a hotel; a paid place to stay while traveling",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "ครอบครัวของเราจองโรงแรมใกล้สถานีรถไฟสองคืน เพราะเดินไปตลาดได้ง่าย",
            roman: "khraawp-khruua khaawng rao jaawng roong-raem glai sa-thaa-nii rot-fai saawng kheun, phraw doen bpai dta-laat dai ngaai",
            chinese: "我们家预订了火车站附近的酒店两晚，因为走去市场很方便。",
            english: "Our family booked a hotel near the train station for two nights because it is easy to walk to the market.",
            grammarIds: ["possession-khaawng", "classifiers-basic-counting", "conjunction-contrast-reason", "modal-dai-samart"],
          },
        ],
        synonyms: [
          { thai: "ที่พัก", roman: "thii-phak", chinese: "住宿处；住处", notesZh: "范围更广，可指酒店、民宿、旅馆等。" },
          { thai: "เกสต์เฮาส์", roman: "get-hao", chinese: "客栈；家庭旅馆", notesZh: "外来词，常指较小、较便宜的旅宿。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ที่พัก", roman: "thii-phak", chinese: "住宿处" },
            distinctionZh: "โรงแรม 是“酒店”；ที่พัก 是更宽泛的“住的地方”。",
          },
          {
            kind: "near-synonym",
            target: { vocabularyId: "baan", thai: "บ้าน", roman: "baan", chinese: "家；房子" },
            distinctionZh: "บ้าน 是家或房子；โรงแรม 是旅行时付费住宿的商业场所。",
          },
        ],
        collocations: [
          { thai: "จองโรงแรม", roman: "jaawng roong-raem", chinese: "订酒店", english: "book a hotel" },
          { thai: "พักที่โรงแรม", roman: "phak thii roong-raem", chinese: "住在酒店", english: "stay at a hotel" },
          { thai: "โรงแรมใกล้สถานี", roman: "roong-raem glai sa-thaa-nii", chinese: "车站附近的酒店", english: "hotel near the station" },
        ],
        grammarIds: ["location-prepositions", "classifier-inanimate-function"],
        tags: ["travel", "place", "lodging"],
      },
    ],
    synonyms: [
      { thai: "ที่พัก", roman: "thii-phak", chinese: "住宿处；住处" },
      { thai: "เกสต์เฮาส์", roman: "get-hao", chinese: "客栈；家庭旅馆" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ที่พัก", roman: "thii-phak", chinese: "住宿处" },
        distinctionZh: "订房、入住时说 โรงแรม 很具体；不知道住宿类型时可用 ที่พัก。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "โรงแรมนี้", roman: "roong-raem nii", chinese: "这家酒店", english: "this hotel" },
      { thai: "หน้าโรงแรม", roman: "naa roong-raem", chinese: "酒店前面", english: "in front of the hotel" },
      { thai: "พนักงานโรงแรม", roman: "pha-nak-ngaan roong-raem", chinese: "酒店员工", english: "hotel staff" },
    ],
    learningNotesZh: ["โรงแรม 的量词常用 แห่ง；说“住在酒店”常用 พักที่โรงแรม。"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-rot",
    vocabularyId: "rot",
    thai: "รถ",
    roman: "rot",
    chinese: "车",
    english: "car; vehicle",
    senses: [
      {
        id: "car-vehicle",
        chinese: "车；汽车或一般车辆",
        english: "a car or vehicle",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "ตอนเช้ารถติดมาก ผมเลยนั่งรถไฟไปทำงานแทนการขับรถ",
            roman: "dtaawn-chaao rot dtit maak, phom loei nang rot-fai bpai tham-ngaan thaaen gaan khap rot",
            chinese: "早上堵车很严重，所以我坐火车去上班，而不是开车。",
            english: "Traffic was very bad in the morning, so I took the train to work instead of driving.",
            grammarIds: ["conjunction-contrast-reason", "motion-direction-verbs", "nominalization-gaan-khwaam"],
          },
        ],
        synonyms: [
          { thai: "รถยนต์", roman: "rot-yon", chinese: "汽车", notesZh: "更明确指汽车。" },
          { thai: "ยานพาหนะ", roman: "yaan-pha-ha-na", chinese: "交通工具；车辆", notesZh: "较正式、范围更广。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "รถยนต์", roman: "rot-yon", chinese: "汽车" },
            distinctionZh: "รถ 可泛指车或交通工具；รถยนต์ 更明确是汽车。",
          },
        ],
        collocations: [
          { thai: "ขับรถ", roman: "khap rot", chinese: "开车", english: "drive a car" },
          { thai: "รถติด", roman: "rot dtit", chinese: "堵车", english: "traffic is jammed" },
          { thai: "รถสองคัน", roman: "rot saawng khan", chinese: "两辆车", english: "two cars" },
        ],
        grammarIds: ["classifier-inanimate-function", "classifier-measure-words"],
        tags: ["travel", "vehicle"],
      },
      {
        id: "transport-compound",
        chinese: "交通工具名称中的“车”；和别的词组成รถเมล์、รถไฟ等",
        english: "vehicle in transport compounds such as bus and train",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "จากโรงแรมไปตลาด คุณนั่งรถเมล์หรือรถแท็กซี่ก็ได้ แต่รถไฟไม่ผ่านที่นี่",
            roman: "jaak roong-raem bpai dta-laat, khun nang rot-mee rue rot thaek-sii gaw dai, dtaae rot-fai mai phaan thii-nii",
            chinese: "从酒店去市场，你可以坐公交车或出租车，但火车不到这里。",
            english: "From the hotel to the market, you can take a bus or a taxi, but the train does not pass here.",
            grammarIds: ["alternative-rue-rueplao", "modal-dai-samart", "conjunction-contrast-reason", "location-prepositions"],
          },
        ],
        synonyms: [
          { thai: "รถโดยสาร", roman: "rot-dooi-saan", chinese: "公共交通车辆；公交车", notesZh: "比 รถเมล์ 更正式。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "confusable",
            target: { thai: "รส", roman: "rot", chinese: "味道" },
            distinctionZh: "รถ（车）和 รส（味道）罗马音相同但拼写、意义不同；看泰文字母区分。",
          },
        ],
        collocations: [
          { thai: "รถเมล์", roman: "rot-mee", chinese: "公交车", english: "bus" },
          { thai: "รถไฟ", roman: "rot-fai", chinese: "火车", english: "train" },
          { thai: "รถแท็กซี่", roman: "rot thaek-sii", chinese: "出租车", english: "taxi" },
        ],
        grammarIds: ["compound-nouns", "motion-direction-verbs"],
        tags: ["travel", "compound"],
      },
    ],
    synonyms: [
      { thai: "รถยนต์", roman: "rot-yon", chinese: "汽车" },
      { thai: "ยานพาหนะ", roman: "yaan-pha-ha-na", chinese: "交通工具；车辆" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "confusable",
        target: { thai: "รส", roman: "rot", chinese: "味道" },
        distinctionZh: "รถ 是“车”，รส 是“味道”；初学时容易因罗马音相同而混淆。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "นั่งรถ", roman: "nang rot", chinese: "坐车", english: "ride in a vehicle" },
      { thai: "ขึ้นรถ", roman: "kheun rot", chinese: "上车", english: "get on a vehicle" },
      { thai: "ลงรถ", roman: "long rot", chinese: "下车", english: "get off a vehicle" },
    ],
    learningNotesZh: ["รถ 是高频构词词根：รถไฟ、รถเมล์、รถแท็กซี่ 都是交通工具名。"],
    sourceRefs: TRAVEL_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-thii-nii",
    vocabularyId: "thii-nii",
    thai: "ที่นี่",
    roman: "thii-nii",
    chinese: "这里",
    english: "here",
    senses: [
      {
        id: "speaker-location-here",
        chinese: "这里；说话者所在或正在指的这个地方",
        english: "here; the place where the speaker is or the place being indicated",
        level: "pre-a1",
        register: "neutral",
        examples: [
          {
            thai: "ที่นี่มีห้องน้ำสะอาด และคุณสามารถนั่งรอเพื่อนได้ข้างใน",
            roman: "thii-nii mii haawng-naam sa-aat, lae khun saa-maat nang raaw phuean dai khaang-nai",
            chinese: "这里有干净的洗手间，而且你可以在里面坐着等朋友。",
            english: "There is a clean bathroom here, and you can sit inside and wait for your friend.",
            grammarIds: ["core-have-exist-mii", "conjunction-and-with", "modal-dai-samart", "location-prepositions"],
          },
        ],
        synonyms: [
          { thai: "ตรงนี้", roman: "dtrong-nii", chinese: "这儿；这个位置", notesZh: "更强调具体点位。" },
          { thai: "ที่ตรงนี้", roman: "thii dtrong-nii", chinese: "这个地方", notesZh: "比 ที่นี่ 更强调“这个具体位置”。" },
        ],
        antonyms: [
          { vocabularyId: "thii-nan", thai: "ที่นั่น", roman: "thii-nan", chinese: "那里" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "นี่", roman: "nii", chinese: "这个；这" },
            distinctionZh: "นี่ 指“这个/这”；ที่นี่ 是地点副词/名词，表示“这里”。",
          },
          {
            kind: "near-synonym",
            target: { vocabularyId: "thii-nan", thai: "ที่นั่น", roman: "thii-nan", chinese: "那里" },
            distinctionZh: "ที่นี่ 靠近说话者或当前场景；ที่นั่น 指离开说话者的那个地方。",
          },
        ],
        collocations: [
          { thai: "อยู่ที่นี่", roman: "yuu thii-nii", chinese: "在这里；住在这里", english: "be here; live here" },
          { thai: "จากที่นี่", roman: "jaak thii-nii", chinese: "从这里", english: "from here" },
          { thai: "ที่นี่มี...", roman: "thii-nii mii...", chinese: "这里有……", english: "there is/are ... here" },
        ],
        grammarIds: ["demonstratives-nii-nan-noon", "core-location-yuu", "core-have-exist-mii"],
        tags: ["place", "deictic"],
      },
    ],
    synonyms: [
      { thai: "ตรงนี้", roman: "dtrong-nii", chinese: "这儿；这个位置" },
      { thai: "ที่ตรงนี้", roman: "thii dtrong-nii", chinese: "这个地方" },
    ],
    antonyms: [
      { vocabularyId: "thii-nan", thai: "ที่นั่น", roman: "thii-nan", chinese: "那里", english: "there" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "thii-nan", thai: "ที่นั่น", roman: "thii-nan", chinese: "那里" },
        distinctionZh: "ที่นี่ 对应当前地点；ที่นั่น 对应远一点或已经提到的地点。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ที่นี่คือที่ไหน", roman: "thii-nii khue thii nai", chinese: "这里是哪里", english: "what place is this" },
      { thai: "ที่นี่ใกล้ตลาด", roman: "thii-nii glai dta-laat", chinese: "这里离市场近", english: "this place is near the market" },
      { thai: "รอที่นี่", roman: "raaw thii-nii", chinese: "在这里等", english: "wait here" },
    ],
    learningNotesZh: ["ที่นี่、ที่นั่น、ที่โน่น 是一组地点指示词；先把 ที่นี่=这里 牢牢记住。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-thii-nan",
    vocabularyId: "thii-nan",
    thai: "ที่นั่น",
    roman: "thii-nan",
    chinese: "那里",
    english: "there",
    senses: [
      {
        id: "that-location-there",
        chinese: "那里；离说话者较远、靠近听者或前文提到的地方",
        english: "there; a place away from the speaker, near the listener, or previously mentioned",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "พรุ่งนี้เราจะไปที่นั่นหลังอาหารเช้า เพราะตลาดเปิดตอนแปดโมง",
            roman: "phrung-nii rao ja bpai thii-nan lang aa-haan chaao, phraw dta-laat bpoet dtaawn bpaaet moong",
            chinese: "明天我们早餐后会去那里，因为市场八点开门。",
            english: "Tomorrow we will go there after breakfast because the market opens at eight.",
            grammarIds: ["future-ja", "condition-time-clauses", "conjunction-contrast-reason", "time-words-context"],
          },
        ],
        synonyms: [
          { thai: "ตรงนั้น", roman: "dtrong-nan", chinese: "那儿；那个位置", notesZh: "更强调具体点位。" },
          { thai: "ที่โน่น", roman: "thii-noon", chinese: "那边；远处那里", notesZh: "通常比 ที่นั่น 更远。" },
        ],
        antonyms: [
          { vocabularyId: "thii-nii", thai: "ที่นี่", roman: "thii-nii", chinese: "这里" },
        ],
        comparisons: [
          {
            kind: "near-synonym",
            target: { thai: "ที่โน่น", roman: "thii-noon", chinese: "远处那里" },
            distinctionZh: "ที่นั่น 是“那里”；ที่โน่น 往往指更远、更明显远离双方的地方。",
          },
          {
            kind: "grammar-pair",
            target: { thai: "นั่น", roman: "nan", chinese: "那个；那" },
            distinctionZh: "นั่น 指物或情况“那个”；ที่นั่น 指地点“那里”。",
          },
        ],
        collocations: [
          { thai: "ไปที่นั่น", roman: "bpai thii-nan", chinese: "去那里", english: "go there" },
          { thai: "อยู่ที่นั่น", roman: "yuu thii-nan", chinese: "在那里；住在那里", english: "be there; live there" },
          { thai: "จากที่นั่น", roman: "jaak thii-nan", chinese: "从那里", english: "from there" },
        ],
        grammarIds: ["demonstratives-nii-nan-noon", "core-location-yuu", "motion-direction-verbs"],
        tags: ["place", "deictic"],
      },
    ],
    synonyms: [
      { thai: "ตรงนั้น", roman: "dtrong-nan", chinese: "那儿；那个位置" },
      { thai: "ที่โน่น", roman: "thii-noon", chinese: "那边；远处那里" },
    ],
    antonyms: [
      { vocabularyId: "thii-nii", thai: "ที่นี่", roman: "thii-nii", chinese: "这里", english: "here" },
    ],
    comparisons: [
      {
        kind: "near-synonym",
        target: { thai: "ที่โน่น", roman: "thii-noon", chinese: "远处那里" },
        distinctionZh: "ที่นั่น 可指听者附近或已提地点；ที่โน่น 更有“远在那边”的感觉。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ที่นั่นไกลไหม", roman: "thii-nan glai mai", chinese: "那里远吗", english: "is it far there" },
      { thai: "รอที่นั่น", roman: "raaw thii-nan", chinese: "在那里等", english: "wait there" },
      { thai: "ตลาดที่นั่น", roman: "dta-laat thii-nan", chinese: "那里的市场", english: "the market there" },
    ],
    learningNotesZh: ["ที่นั่น 可以指听者附近的“那里”，也可指前文已经提到的地方；与 ที่นี่ 形成基本对照。"],
    sourceRefs: [...CORE_REFS, ...GRAMMAR_REFS],
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-gap",
    vocabularyId: "gap",
    thai: "กับ",
    roman: "gap",
    chinese: "和；跟；与",
    english: "with; and",
    senses: [
      {
        id: "with-accompaniment",
        chinese: "和；跟，表示一起做某事或伴随某人",
        english: "with; indicating accompaniment or doing something together with someone",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "เย็นนี้ฉันจะกินข้าวกับเพื่อนที่ร้านใกล้ตลาด และกลับบ้านก่อนสองทุ่ม",
            roman: "yen-nii chan ja gin khaao gap phuean thii raan glai dta-laat, lae glap baan gaawn saawng thum",
            chinese: "今晚我要和朋友在市场附近的店吃饭，然后晚上八点以前回家。",
            english: "This evening I will eat with a friend at a shop near the market and return home before eight p.m.",
            grammarIds: ["future-ja", "conjunction-and-with", "location-prepositions", "time-words-context"],
          },
        ],
        synonyms: [
          { thai: "พร้อมกับ", roman: "phraawm-gap", chinese: "和……一起；同时和", notesZh: "更强调同时或一起。" },
          { thai: "ด้วย", roman: "duai", chinese: "也；一起；用", notesZh: "功能更宽，位置和 กับ 不完全一样。" },
        ],
        antonyms: [
          { thai: "คนเดียว", roman: "khon-diaao", chinese: "一个人；独自" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "lae", thai: "และ", roman: "lae", chinese: "和；以及" },
            distinctionZh: "กับ 常接人表示“跟某人一起”；และ 更常用于并列列举。",
          },
        ],
        collocations: [
          { thai: "ไปกับเพื่อน", roman: "bpai gap phuean", chinese: "和朋友一起去", english: "go with a friend" },
          { thai: "กินข้าวกับครอบครัว", roman: "gin khaao gap khraawp-khruua", chinese: "和家人吃饭", english: "eat with family" },
        ],
        grammarIds: ["conjunction-and-with", "verb-preposition-collocations"],
        tags: ["with", "accompaniment"],
      },
      {
        id: "and-between-nouns",
        chinese: "和；连接两个名词，尤其在口语列举中",
        english: "and; connecting two nouns, especially in spoken lists",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "ในตลาดมีชาเย็นกับกาแฟร้อน แต่ร้านนี้ไม่ขายน้ำผลไม้",
            roman: "nai dta-laat mii chaa yen gap gaa-faae raawn, dtaae raan nii mai khaai naam phon-la-maai",
            chinese: "市场里有冰茶和热咖啡，但这家店不卖果汁。",
            english: "In the market there is iced tea and hot coffee, but this shop does not sell fruit juice.",
            grammarIds: ["core-have-exist-mii", "conjunction-and-with", "conjunction-contrast-reason", "negation-mai"],
          },
        ],
        synonyms: [
          { vocabularyId: "lae", thai: "และ", roman: "lae", chinese: "和；以及" },
        ],
        antonyms: [
          { vocabularyId: "tae", thai: "แต่", roman: "dtaae", chinese: "但是", notesZh: "不是严格反义，但在连接关系上表示转折而非并列。" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "lae", thai: "และ", roman: "lae", chinese: "和；以及" },
            distinctionZh: "กับ 连接两个名词时很自然；正式列举或连接更长成分时 และ 更清楚。",
          },
        ],
        collocations: [
          { thai: "ชา กับ กาแฟ", roman: "chaa gap gaa-faae", chinese: "茶和咖啡", english: "tea and coffee" },
          { thai: "แม่กับพ่อ", roman: "maae gap phaaw", chinese: "妈妈和爸爸", english: "mother and father" },
        ],
        grammarIds: ["conjunction-and-with"],
        tags: ["and", "noun-linking"],
      },
    ],
    synonyms: [
      { vocabularyId: "lae", thai: "และ", roman: "lae", chinese: "和；以及" },
      { thai: "พร้อมกับ", roman: "phraawm-gap", chinese: "和……一起" },
    ],
    antonyms: [
      { thai: "คนเดียว", roman: "khon-diaao", chinese: "一个人；独自" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "lae", thai: "และ", roman: "lae", chinese: "和；以及" },
        distinctionZh: "กับ 更有“跟/和某人一起”的用法；และ 更像书面或清晰列举的“以及”。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "กับเพื่อน", roman: "gap phuean", chinese: "和朋友；跟朋友", english: "with a friend" },
      { thai: "ไปกับ...", roman: "bpai gap...", chinese: "和……一起去", english: "go with ..." },
      { thai: "A กับ B", roman: "A gap B", chinese: "A 和 B", english: "A and B" },
    ],
    learningNotesZh: ["กับ 很适合表达“跟某人一起”；列举两个名词时也常用，但正式列举可优先用 และ。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-lae",
    vocabularyId: "lae",
    thai: "และ",
    roman: "lae",
    chinese: "和；以及",
    english: "and",
    senses: [
      {
        id: "and-coordinate",
        chinese: "和；以及，用来连接并列的词、短语或句子",
        english: "and; used to connect parallel words, phrases, or clauses",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "ฉันซื้อข้าว น้ำ และผลไม้ที่ตลาดก่อนกลับโรงแรม",
            roman: "chan sue khaao, naam, lae phon-la-maai thii dta-laat gaawn glap roong-raem",
            chinese: "我回酒店前在市场买了米饭、水和水果。",
            english: "I bought rice, water, and fruit at the market before returning to the hotel.",
            grammarIds: ["conjunction-and-with", "location-prepositions", "condition-time-clauses"],
          },
        ],
        synonyms: [
          { vocabularyId: "gap", thai: "กับ", roman: "gap", chinese: "和；跟" },
          { thai: "แล้วก็", roman: "laaeo-gaw", chinese: "然后也；还有", notesZh: "口语中常用于追加信息或动作顺序。" },
        ],
        antonyms: [
          { vocabularyId: "tae", thai: "แต่", roman: "dtaae", chinese: "但是", notesZh: "连接关系从并列变为转折。" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "gap", thai: "กับ", roman: "gap", chinese: "和；跟" },
            distinctionZh: "และ 更适合清晰列举；กับ 常用于“跟某人一起”或两个名词之间。",
          },
          {
            kind: "near-synonym",
            target: { thai: "แล้วก็", roman: "laaeo-gaw", chinese: "然后；还有" },
            distinctionZh: "และ 较中性、书面；แล้วก็ 更口语，常带顺序或补充感。",
          },
        ],
        collocations: [
          { thai: "A และ B", roman: "A lae B", chinese: "A 和 B", english: "A and B" },
          { thai: "ทั้ง A และ B", roman: "thang A lae B", chinese: "A 和 B 都", english: "both A and B" },
        ],
        grammarIds: ["conjunction-and-with"],
        tags: ["and", "coordination"],
      },
    ],
    synonyms: [
      { vocabularyId: "gap", thai: "กับ", roman: "gap", chinese: "和；跟" },
      { thai: "แล้วก็", roman: "laaeo-gaw", chinese: "然后也；还有" },
    ],
    antonyms: [
      { vocabularyId: "tae", thai: "แต่", roman: "dtaae", chinese: "但是", english: "but" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "gap", thai: "กับ", roman: "gap", chinese: "和；跟" },
        distinctionZh: "写完整句子或列清单时 และ 很稳；说“和朋友一起”时通常用 กับ。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ชาและกาแฟ", roman: "chaa lae gaa-faae", chinese: "茶和咖啡", english: "tea and coffee" },
      { thai: "พ่อและแม่", roman: "phaaw lae maae", chinese: "爸爸和妈妈", english: "father and mother" },
      { thai: "และอื่น ๆ", roman: "lae euen euen", chinese: "等等；以及其他", english: "and others; etc." },
    ],
    learningNotesZh: ["และ 是最标准的“和/以及”；口语里两个名词之间也常听到 กับ。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-tae",
    vocabularyId: "tae",
    thai: "แต่",
    roman: "dtaae",
    chinese: "但是",
    english: "but",
    senses: [
      {
        id: "but-contrast",
        chinese: "但是；连接两个意思有转折或对比的部分",
        english: "but; connecting two parts with contrast or opposition",
        level: "a1",
        register: "neutral",
        examples: [
          {
            thai: "ร้านนี้ขายกาแฟอร่อย แต่ราคาแพงกว่าร้านในตลาดนิดหน่อย",
            roman: "raan nii khaai gaa-faae a-raawy, dtaae raa-khaa phaaeng gwaa raan nai dta-laat nit-naawy",
            chinese: "这家店卖的咖啡好喝，但是价格比市场里的店贵一点。",
            english: "This shop sells tasty coffee, but the price is a little higher than the shops in the market.",
            grammarIds: ["conjunction-contrast-reason", "comparison-gwaa", "demonstratives-nii-nan-noon"],
          },
        ],
        synonyms: [
          { thai: "แต่ว่า", roman: "dtaae waa", chinese: "但是；不过", notesZh: "比 แต่ 稍完整，口语和书面都常见。" },
          { thai: "แต่ก็", roman: "dtaae gaw", chinese: "但是也；不过仍然", notesZh: "常表示虽然转折但结果仍继续。" },
        ],
        antonyms: [
          { vocabularyId: "lae", thai: "และ", roman: "lae", chinese: "和；以及", notesZh: "不是严格反义，但表示并列而非转折。" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { vocabularyId: "phro", thai: "เพราะ", roman: "phraw", chinese: "因为" },
            distinctionZh: "แต่ 表示对比；เพราะ 表示原因，不要把“但是”和“因为”的连接关系混在一起。",
          },
          {
            kind: "near-synonym",
            target: { thai: "แต่ว่า", roman: "dtaae waa", chinese: "但是；不过" },
            distinctionZh: "แต่ 更短更核心；แต่ว่า 听起来更完整，有时语气更缓。",
          },
        ],
        collocations: [
          { thai: "แต่ไม่...", roman: "dtaae mai...", chinese: "但是不……", english: "but not ..." },
          { thai: "แต่ก็...", roman: "dtaae gaw...", chinese: "但是也/仍然……", english: "but still ..." },
        ],
        grammarIds: ["conjunction-contrast-reason"],
        tags: ["but", "contrast"],
      },
    ],
    synonyms: [
      { thai: "แต่ว่า", roman: "dtaae waa", chinese: "但是；不过" },
      { thai: "แต่ก็", roman: "dtaae gaw", chinese: "但是也；不过仍然" },
    ],
    antonyms: [
      { vocabularyId: "lae", thai: "และ", roman: "lae", chinese: "和；以及", english: "and" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { vocabularyId: "lae", thai: "และ", roman: "lae", chinese: "和；以及" },
        distinctionZh: "และ 增加并列信息；แต่ 转向相反或意外的信息。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ดีแต่แพง", roman: "dii dtaae phaaeng", chinese: "好但是贵", english: "good but expensive" },
      { thai: "อยากไปแต่ไม่มีเวลา", roman: "yaak bpai dtaae mai mii wee-laa", chinese: "想去但是没有时间", english: "want to go but have no time" },
      { thai: "แต่ถ้า...", roman: "dtaae thaa...", chinese: "但是如果……", english: "but if ..." },
    ],
    learningNotesZh: ["แต่ 前后通常都是可以独立理解的部分；初学时先用它连接两个短句。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-phro",
    vocabularyId: "phro",
    thai: "เพราะ",
    roman: "phraw",
    chinese: "因为",
    english: "because",
    senses: [
      {
        id: "because-reason",
        chinese: "因为；引出原因或理由",
        english: "because; introducing a reason or cause",
        level: "a1-plus",
        register: "neutral",
        examples: [
          {
            thai: "วันนี้เราไม่ไปตลาด เพราะฝนตกหนักและรถติดมาก",
            roman: "wan-nii rao mai bpai dta-laat, phraw fon dtok nak lae rot dtit maak",
            chinese: "今天我们不去市场，因为雨下得很大，而且堵车很严重。",
            english: "Today we are not going to the market because it is raining hard and traffic is very bad.",
            grammarIds: ["negation-mai", "conjunction-contrast-reason", "conjunction-and-with"],
          },
        ],
        synonyms: [
          { thai: "เพราะว่า", roman: "phraw waa", chinese: "因为", notesZh: "比 เพราะ 多一个 ว่า，口语中很常见。" },
          { thai: "เนื่องจาก", roman: "nueang-jaak", chinese: "由于；因为", notesZh: "较正式，常用于公告或书面说明。" },
        ],
        antonyms: [
          { thai: "ดังนั้น", roman: "dang-nan", chinese: "因此；所以", notesZh: "不是反义词，而是从原因转向结果。" },
        ],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "ก็เลย", roman: "gaw loei", chinese: "所以就" },
            distinctionZh: "เพราะ 后面给原因；ก็เลย 后面给结果：เพราะฝนตก ก็เลยไม่ไป。",
          },
          {
            kind: "register-pair",
            target: { thai: "เนื่องจาก", roman: "nueang-jaak", chinese: "由于" },
            distinctionZh: "เพราะ 是日常核心词；เนื่องจาก 更正式、更书面。",
          },
        ],
        collocations: [
          { thai: "เพราะว่า...", roman: "phraw waa...", chinese: "因为……", english: "because ..." },
          { thai: "เพราะฝนตก", roman: "phraw fon dtok", chinese: "因为下雨", english: "because it rains" },
          { thai: "เพราะฉะนั้น", roman: "phraw-cha-nan", chinese: "因此；所以", english: "therefore" },
        ],
        grammarIds: ["conjunction-contrast-reason", "cause-result-discourse"],
        tags: ["because", "reason"],
      },
    ],
    synonyms: [
      { thai: "เพราะว่า", roman: "phraw waa", chinese: "因为" },
      { thai: "เนื่องจาก", roman: "nueang-jaak", chinese: "由于；因为" },
    ],
    antonyms: [
      { thai: "ดังนั้น", roman: "dang-nan", chinese: "因此；所以", notesZh: "结果连接词，不是严格反义。" },
    ],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { thai: "ก็เลย", roman: "gaw loei", chinese: "所以就" },
        distinctionZh: "ถามว่า“为什么”时用 เพราะ 回答原因；讲结果时常用 ก็เลย。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ทำไม... เพราะ...", roman: "tham-mai... phraw...", chinese: "为什么……因为……", english: "why ... because ..." },
      { thai: "เพราะไม่มีเวลา", roman: "phraw mai mii wee-laa", chinese: "因为没有时间", english: "because there is no time" },
      { thai: "เพราะรถติด", roman: "phraw rot dtit", chinese: "因为堵车", english: "because of traffic" },
    ],
    learningNotesZh: ["เพราะ 引出原因；中文习惯说“因为……所以……”，泰语常可只用 เพราะ 或用 เพราะ...ก็เลย...。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
  {
    id: "enrich-thaa",
    vocabularyId: "thaa",
    thai: "ถ้า",
    roman: "thaa",
    chinese: "如果",
    english: "if",
    senses: [
      {
        id: "if-condition",
        chinese: "如果；引出条件，说明在某种情况下会怎样",
        english: "if; introducing a condition and what happens under that condition",
        level: "a1-plus",
        register: "neutral",
        examples: [
          {
            thai: "ถ้าคุณจะซื้อผลไม้ที่ตลาดเช้า ควรไปก่อนสิบโมงเพราะของสดกว่า",
            roman: "thaa khun ja sue phon-la-maai thii dta-laat chaao, khuuan bpai gaawn sip moong phraw khaawng sot gwaa",
            chinese: "如果你要在早市买水果，应该十点以前去，因为东西更新鲜。",
            english: "If you are going to buy fruit at the morning market, you should go before ten because the goods are fresher.",
            grammarIds: ["condition-time-clauses", "future-ja", "modal-need-should", "comparison-gwaa"],
          },
        ],
        synonyms: [
          { thai: "หาก", roman: "haak", chinese: "如果", notesZh: "更正式，常见于书面或公告。" },
          { thai: "ถ้าหาก", roman: "thaa-haak", chinese: "如果；假如", notesZh: "比 ถ้า 更强调条件，语气稍完整。" },
        ],
        antonyms: [],
        comparisons: [
          {
            kind: "grammar-pair",
            target: { thai: "เมื่อ", roman: "muea", chinese: "当……时候" },
            distinctionZh: "ถ้า 表示条件不一定发生；เมื่อ 表示某个时间或已知会发生的情况。",
          },
          {
            kind: "register-pair",
            target: { thai: "หาก", roman: "haak", chinese: "如果" },
            distinctionZh: "ถ้า 是日常口语和初级句子的核心词；หาก 更正式。",
          },
        ],
        collocations: [
          { thai: "ถ้า...ก็...", roman: "thaa... gaw...", chinese: "如果……就……", english: "if ... then ..." },
          { thai: "ถ้ามีเวลา", roman: "thaa mii wee-laa", chinese: "如果有时间", english: "if there is time" },
          { thai: "ถ้าไม่...", roman: "thaa mai...", chinese: "如果不……", english: "if not ..." },
        ],
        grammarIds: ["condition-time-clauses"],
        tags: ["if", "condition"],
      },
    ],
    synonyms: [
      { thai: "หาก", roman: "haak", chinese: "如果" },
      { thai: "ถ้าหาก", roman: "thaa-haak", chinese: "如果；假如" },
    ],
    antonyms: [],
    comparisons: [
      {
        kind: "grammar-pair",
        target: { thai: "เมื่อ", roman: "muea", chinese: "当……时候" },
        distinctionZh: "ถ้า 强调条件；เมื่อ 强调时间背景。不要把“如果”和“当……时候”完全混用。",
      },
    ],
    registers: ["neutral"],
    collocations: [
      { thai: "ถ้าฝนตก", roman: "thaa fon dtok", chinese: "如果下雨", english: "if it rains" },
      { thai: "ถ้าอยากไป", roman: "thaa yaak bpai", chinese: "如果想去", english: "if you want to go" },
      { thai: "แต่ถ้า", roman: "dtaae thaa", chinese: "但是如果", english: "but if" },
    ],
    learningNotesZh: ["ถ้า 从句可以放在句首；主句里常见 ก็，但初学时也可以先用 ถ้า + 条件 + 主句。"],
    sourceRefs: GRAMMAR_REFS,
    reviewStatus: "human-draft",
  },
] satisfies VocabularyEnrichment[];
