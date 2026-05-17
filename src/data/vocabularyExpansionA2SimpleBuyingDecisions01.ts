export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type SimpleBuyingDecisionsTheme =
  | "比较价格"
  | "看评价"
  | "试用"
  | "质量"
  | "预算"
  | "需要不需要"
  | "值得不值得"
  | "换品牌"
  | "购买犹豫"
  | "决定购买";

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
  theme: SimpleBuyingDecisionsTheme,
];

const SIMPLE_BUYING_DECISIONS_REFS = [
  "worker-a-a2-simple-buying-decisions",
  "basic-thai-buying-decisions",
];

const rows: Row[] = [
  ["bpriap-thiap-raa-khaa", "เปรียบเทียบราคา", "bpriap-thiap raa-khaa", "比较价格", "动词", "比较价格"],
  ["raa-khaa-thuuk-gwaa", "ราคาถูกกว่า", "raa-khaa thuuk gwaa", "价格更便宜", "句型", "比较价格"],
  ["raa-khaa-phaaeng-gwaa", "ราคาแพงกว่า", "raa-khaa phaaeng gwaa", "价格更贵", "句型", "比较价格"],
  ["thuuk-gwaa", "ถูกกว่า", "thuuk gwaa", "更便宜", "短语", "比较价格"],
  ["phaaeng-gwaa", "แพงกว่า", "phaaeng gwaa", "更贵", "短语", "比较价格"],
  ["raa-khaa-phaw-rap-dai", "ราคาพอรับได้", "raa-khaa phaaw rap dai", "价格还能接受", "句型", "比较价格"],
  ["raa-khaa-raeng", "ราคาแรง", "raa-khaa raaeng", "价格偏高", "短语", "比较价格"],
  ["raa-khaa-dii", "ราคาดี", "raa-khaa dii", "价格好；价格合适", "短语", "比较价格"],
  ["dii-gwaa-raa-khaa", "ดีกว่าราคา", "dii gwaa raa-khaa", "比价格更重要/更好", "短语", "比较价格"],
  ["sue-thii-nai-thuuk-gwaa", "ซื้อที่ไหนถูกกว่า", "sue thii nai thuuk gwaa", "在哪里买更便宜", "句型", "比较价格"],
  ["duu-riviu", "ดูรีวิว", "duu ri-wiu", "看评价", "动词", "看评价"],
  ["aan-riviu", "อ่านรีวิว", "aan ri-wiu", "读评价", "动词", "看评价"],
  ["riviu-dii", "รีวิวดี", "ri-wiu dii", "评价好", "句型", "看评价"],
  ["riviu-mai-dii", "รีวิวไม่ดี", "ri-wiu mai dii", "评价不好", "句型", "看评价"],
  ["kham-hen-luuk-khaa", "ความเห็นลูกค้า", "khwaam hen luuk khaa", "顾客意见", "名词", "看评价"],
  ["khon-bawk-waa-dii", "คนบอกว่าดี", "khon baawk waa dii", "大家说好", "句型", "看评价"],
  ["khon-bawk-waa-mai-dii", "คนบอกว่าไม่ดี", "khon baawk waa mai dii", "大家说不好", "句型", "看评价"],
  ["kha-naen", "คะแนน", "kha-naaen", "评分", "名词", "看评价"],
  ["ha-dao", "ห้าดาว", "haa daao", "五星", "名词", "看评价"],
  ["duu-khwaam-hen-gaawn", "ดูความเห็นก่อน", "duu khwaam hen gaawn", "先看意见/评价", "动词", "看评价"],
  ["laawng-chai", "ลองใช้", "laawng chai", "试用", "动词", "试用"],
  ["laawng-gaawn", "ลองก่อน", "laawng gaawn", "先试试", "短语", "试用"],
  ["khaaw-laawng-dai-mai", "ขอลองได้ไหม", "khaaw laawng dai mai", "可以试一下吗", "句型", "试用"],
  ["mi-dtua-yaang", "มีตัวอย่าง", "mii dtua yaang", "有样品", "句型", "试用"],
  ["dtua-yaang", "ตัวอย่าง", "dtua yaang", "样品；例子", "名词", "试用"],
  ["dtua-thot-laawng", "ตัวทดลอง", "dtua thot laawng", "试用品", "名词", "试用"],
  ["chai-ngai", "ใช้ง่าย", "chai ngaai", "容易使用", "形容词", "试用"],
  ["chai-yaak", "ใช้ยาก", "chai yaak", "难用", "形容词", "试用"],
  ["laawng-laew-chaawp", "ลองแล้วชอบ", "laawng laew chaawp", "试了之后喜欢", "句型", "试用"],
  ["laawng-laew-mai-chaawp", "ลองแล้วไม่ชอบ", "laawng laew mai chaawp", "试了之后不喜欢", "句型", "试用"],
  ["khun-na-phaap", "คุณภาพ", "khun-na-phaap", "质量", "名词", "质量"],
  ["khun-na-phaap-dii", "คุณภาพดี", "khun-na-phaap dii", "质量好", "句型", "质量"],
  ["khun-na-phaap-mai-dii", "คุณภาพไม่ดี", "khun-na-phaap mai dii", "质量不好", "句型", "质量"],
  ["khong-thon", "ของทน", "khaawng thon", "东西耐用", "句型", "质量"],
  ["chai-dai-naan", "ใช้ได้นาน", "chai dai naan", "能用很久", "句型", "质量"],
  ["sia-ngai", "เสียง่าย", "siia ngaai", "容易坏", "形容词", "质量"],
  ["duu-khaeng-raeng", "ดูแข็งแรง", "duu khaeng raaeng", "看起来结实", "句型", "质量"],
  ["duu-bang", "ดูบาง", "duu baang", "看起来薄/不结实", "句型", "质量"],
  ["gaan-rap-bpra-gan", "การรับประกัน", "gaan rap bpra-gan", "保修；保证", "名词", "质量"],
  ["mi-bpra-gan", "มีประกัน", "mii bpra-gan", "有保修", "句型", "质量"],
  ["ngop", "งบ", "ngop", "预算", "名词", "预算"],
  ["ngop-bpra-maan", "งบประมาณ", "ngop bpra-maan", "预算金额", "名词", "预算"],
  ["mi-ngop", "มีงบ", "mii ngop", "有预算", "句型", "预算"],
  ["ngop-mai-phaaw", "งบไม่พอ", "ngop mai phaaw", "预算不够", "句型", "预算"],
  ["goen-ngop", "เกินงบ", "goen ngop", "超预算", "短语", "预算"],
  ["yuu-nai-ngop", "อยู่ในงบ", "yuu nai ngop", "在预算内", "短语", "预算"],
  ["dtang-ngop", "ตั้งงบ", "dtang ngop", "设预算", "动词", "预算"],
  ["lot-ngop", "ลดงบ", "lot ngop", "降低预算", "动词", "预算"],
  ["ngop-mai-goen", "งบไม่เกิน", "ngop mai goen", "预算不超过", "句型", "预算"],
  ["sue-taam-ngop", "ซื้อตามงบ", "sue dtaam ngop", "按预算购买", "动词", "预算"],
  ["jam-bpen", "จำเป็น", "jam bpen", "必要", "形容词", "需要不需要"],
  ["mai-jam-bpen", "ไม่จำเป็น", "mai jam bpen", "不必要", "形容词", "需要不需要"],
  ["dtawng-gaan", "ต้องการ", "dtawng gaan", "需要；想要", "动词", "需要不需要"],
  ["mai-dtawng-gaan", "ไม่ต้องการ", "mai dtawng gaan", "不需要；不想要", "动词", "需要不需要"],
  ["dtawng-chai", "ต้องใช้", "dtawng chai", "需要用", "句型", "需要不需要"],
  ["mai-dtawng-chai", "ไม่ต้องใช้", "mai dtawng chai", "不需要用", "句型", "需要不需要"],
  ["sue-tham-mai", "ซื้อทำไม", "sue tham-mai", "为什么买", "句型", "需要不需要"],
  ["chai-bpen-bpra-jam", "ใช้เป็นประจำ", "chai bpen bpra-jam", "经常使用", "短语", "需要不需要"],
  ["sue-wai-gaawn", "ซื้อไว้ก่อน", "sue wai gaawn", "先买着备用", "短语", "需要不需要"],
  ["mai-riip-sue", "ไม่รีบซื้อ", "mai riip sue", "不急着买", "句型", "需要不需要"],
  ["khum", "คุ้ม", "khum", "划算；值得", "形容词", "值得不值得"],
  ["mai-khum", "ไม่คุ้ม", "mai khum", "不划算；不值得", "形容词", "值得不值得"],
  ["khum-raa-khaa", "คุ้มราคา", "khum raa-khaa", "值这个价", "形容词", "值得不值得"],
  ["khum-mai", "คุ้มไหม", "khum mai", "值得吗；划算吗", "句型", "值得不值得"],
  ["naa-sue", "น่าซื้อ", "naa sue", "值得买；看起来想买", "形容词", "值得不值得"],
  ["mai-naa-sue", "ไม่น่าซื้อ", "mai naa sue", "不太值得买", "形容词", "值得不值得"],
  ["sue-laew-khum", "ซื้อแล้วคุ้ม", "sue laew khum", "买了划算", "句型", "值得不值得"],
  ["sue-laew-mai-khum", "ซื้อแล้วไม่คุ้ม", "sue laew mai khum", "买了不划算", "句型", "值得不值得"],
  ["raa-khaa-gap-khun-na-phaap", "ราคากับคุณภาพ", "raa-khaa gap khun-na-phaap", "价格和质量", "名词", "值得不值得"],
  ["chai-bpen-bpra-jam-khum-gwaa", "ใช้เป็นประจำคุ้มกว่า", "chai bpen bpra-jam khum gwaa", "经常用就更划算", "句型", "值得不值得"],
  ["bplian-yihaaw", "เปลี่ยนยี่ห้อ", "bpliian yii-haaw", "换品牌", "动词", "换品牌"],
  ["yihaaw", "ยี่ห้อ", "yii-haaw", "品牌", "名词", "换品牌"],
  ["yihaaw-nii", "ยี่ห้อนี้", "yii-haaw nii", "这个品牌", "名词", "换品牌"],
  ["yihaaw-nan", "ยี่ห้อนั้น", "yii-haaw nan", "那个品牌", "名词", "换品牌"],
  ["laawng-yihaaw-mai", "ลองยี่ห้อใหม่", "laawng yii-haaw mai", "试新品牌", "动词", "换品牌"],
  ["yihaaw-doem", "ยี่ห้อเดิม", "yii-haaw doem", "原来的品牌", "名词", "换品牌"],
  ["chai-yihaaw-doem", "ใช้ยี่ห้อเดิม", "chai yii-haaw doem", "用原来的品牌", "动词", "换品牌"],
  ["yihaaw-nii-dii-gwaa", "ยี่ห้อนี้ดีกว่า", "yii-haaw nii dii gwaa", "这个品牌更好", "句型", "换品牌"],
  ["bplian-bpen-yihaaw-uen", "เปลี่ยนเป็นยี่ห้ออื่น", "bpliian bpen yii-haaw uen", "换成别的品牌", "动词", "换品牌"],
  ["mai-yuet-dtit-yihaaw", "ไม่ยึดติดยี่ห้อ", "mai yeut dtit yii-haaw", "不执着品牌", "句型", "换品牌"],
  ["lang-lee", "ลังเล", "lang-lee", "犹豫", "动词", "购买犹豫"],
  ["yang-mai-dtat-sin-jai", "ยังไม่ตัดสินใจ", "yang mai dtat sin jai", "还没决定", "句型", "购买犹豫"],
  ["khaaw-khit-gaawn", "ขอคิดก่อน", "khaaw khit gaawn", "让我先想想", "句型", "购买犹豫"],
  ["duu-iik-thii", "ดูอีกที", "duu iik thii", "再看一下", "短语", "购买犹豫"],
  ["wai-gaawn", "ไว้ก่อน", "wai gaawn", "先放着；以后再说", "短语", "购买犹豫"],
  ["glap-bpai-khit", "กลับไปคิด", "glap bpai khit", "回去想想", "动词", "购买犹豫"],
  ["yaak-bpriap-thiap-gaawn", "อยากเปรียบเทียบก่อน", "yaak bpriap-thiap gaawn", "想先比较一下", "句型", "购买犹豫"],
  ["yang-mai-nae-jai", "ยังไม่แน่ใจ", "yang mai nae jai", "还不确定", "句型", "购买犹豫"],
  ["glua-mai-khum", "กลัวไม่คุ้ม", "glua mai khum", "怕不划算", "句型", "购买犹豫"],
  ["raw-suan-lot", "รอส่วนลด", "raaw suan lot", "等折扣", "动词", "购买犹豫"],
  ["dtat-sin-jai-sue", "ตัดสินใจซื้อ", "dtat sin jai sue", "决定购买", "动词", "决定购买"],
  ["ao-an-nii", "เอาอันนี้", "ao an nii", "要这个", "句型", "决定购买"],
  ["sue-an-nii", "ซื้ออันนี้", "sue an nii", "买这个", "句型", "决定购买"],
  ["sue-loei", "ซื้อเลย", "sue loei", "直接买", "动词", "决定购买"],
  ["ao-baep-nii", "เอาแบบนี้", "ao baaep nii", "要这种", "句型", "决定购买"],
  ["ao-si-nii", "เอาสีนี้", "ao sii nii", "要这个颜色", "句型", "决定购买"],
  ["ao-kha-naat-nii", "เอาขนาดนี้", "ao kha-naat nii", "要这个尺寸", "句型", "决定购买"],
  ["song-hai-duai", "ส่งให้ด้วย", "song hai duai", "请帮我配送", "句型", "决定购买"],
  ["khaaw-bai-set", "ขอใบเสร็จ", "khaaw bai-set", "请给收据", "句型", "决定购买"],
  ["jaai-loei", "จ่ายเลย", "jaai loei", "直接付款", "动词", "决定购买"],
];

const relatedByTheme: Record<
  SimpleBuyingDecisionsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  比较价格: {
    synonym: "เปรียบเทียบราคา / bpriap-thiap raa-khaa / 比较价格",
    antonym: "ไม่ดูราคา / mai duu raa-khaa / 不看价格",
    comparison: "ถูกกว่า 是更便宜，ราคาดี 是价格合适，不一定最低。",
    collocation: "เปรียบเทียบราคาก่อนซื้อ / bpriap-thiap raa-khaa gaawn sue / 购买前比较价格",
  },
  看评价: {
    synonym: "ดูรีวิว / duu ri-wiu / 看评价",
    antonym: "ไม่อ่านรีวิว / mai aan ri-wiu / 不读评价",
    comparison: "รีวิว 是评价，คะแนน 是评分；两者常一起看。",
    collocation: "อ่านรีวิวลูกค้าก่อนตัดสินใจ / aan ri-wiu luuk khaa gaawn dtat sin jai / 决定前读顾客评价",
  },
  试用: {
    synonym: "ลองใช้ / laawng chai / 试用",
    antonym: "ไม่ลอง / mai laawng / 不试",
    comparison: "ลองก่อน 是先试试，ตัวอย่าง 是样品或例子。",
    collocation: "ขอลองใช้ก่อนซื้อ / khaaw laawng chai gaawn sue / 购买前请求试用",
  },
  质量: {
    synonym: "คุณภาพดี / khun-na-phaap dii / 质量好",
    antonym: "คุณภาพไม่ดี / khun-na-phaap mai dii / 质量不好",
    comparison: "ทน 强调耐用，ประกัน 强调保修或保证。",
    collocation: "คุณภาพดีกับราคาพอรับได้ / khun-na-phaap dii gap raa-khaa phaaw rap dai / 质量好且价格能接受",
  },
  预算: {
    synonym: "งบประมาณ / ngop bpra-maan / 预算",
    antonym: "เกินงบ / goen ngop / 超预算",
    comparison: "อยู่ในงบ 是在预算内，งบไม่พอ 是预算不够。",
    collocation: "ซื้อของให้อยู่ในงบ / sue khaawng hai yuu nai ngop / 买东西控制在预算内",
  },
  需要不需要: {
    synonym: "จำเป็น / jam bpen / 必要",
    antonym: "ไม่จำเป็น / mai jam bpen / 不必要",
    comparison: "ต้องการ 是想要/需要，จำเป็น 更强调必要性。",
    collocation: "ถ้าไม่จำเป็นก็ยังไม่ซื้อ / thaa mai jam bpen gaw yang mai sue / 如果不必要就先不买",
  },
  值得不值得: {
    synonym: "คุ้มราคา / khum raa-khaa / 值这个价",
    antonym: "ไม่คุ้ม / mai khum / 不划算",
    comparison: "คุ้ม 是综合价格和用途觉得值得，ไม่ใช่แค่ถูก。",
    collocation: "ใช้บ่อยก็ซื้อแล้วคุ้ม / chai baawy gaw sue laew khum / 常用的话买了就划算",
  },
  换品牌: {
    synonym: "เปลี่ยนยี่ห้อ / bpliian yii-haaw / 换品牌",
    antonym: "ใช้ยี่ห้อเดิม / chai yii-haaw doem / 用原品牌",
    comparison: "ยี่ห้อ 是品牌，แบบ 是款式，二者不要混。",
    collocation: "ลองเปลี่ยนเป็นยี่ห้ออื่น / laawng bpliian bpen yii-haaw uen / 试着换成别的品牌",
  },
  购买犹豫: {
    synonym: "ลังเล / lang-lee / 犹豫",
    antonym: "ตัดสินใจแล้ว / dtat sin jai laew / 已经决定",
    comparison: "ขอคิดก่อน 是委婉拖延决定，ยังไม่แน่ใจ 是还不确定。",
    collocation: "ขอคิดก่อนเพราะยังไม่แน่ใจ / khaaw khit gaawn phraw yang mai nae jai / 因为还不确定，请让我先想想",
  },
  决定购买: {
    synonym: "ตัดสินใจซื้อ / dtat sin jai sue / 决定购买",
    antonym: "ไม่ซื้อ / mai sue / 不买",
    comparison: "เอาอันนี้ 是口语购买决定，ตัดสินใจซื้อ 更明确说决定买。",
    collocation: "เอาอันนี้แล้วจ่ายเลย / ao an nii laew jaai loei / 要这个，然后直接付款",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ก่อนซื้อของ ฉันใช้คำว่า “${row[1]}” เพื่อคิดเรื่องราคา คุณภาพ งบประมาณ และความจำเป็นให้ชัดเจน`,
  roman: `gaawn sue khaawng chan chai kham waa "${row[2]}" phuea khit rueang raa-khaa khun-na-phaap ngop-bpra-maan lae khwaam jam-bpen hai chat-jen`,
  chinese: `买东西前，我会用“${row[1]}”来把价格、质量、预算和必要性想清楚。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "购买决策", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 购买决策表达。适合比较价格、看评价、试用、判断质量和预算、决定是否值得买；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: SIMPLE_BUYING_DECISIONS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_BUYING_DECISIONS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
