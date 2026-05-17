export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicQuantitiesPricesTheme =
  | "总数"
  | "单价"
  | "折扣"
  | "原价半价"
  | "够不够"
  | "多少一点"
  | "剩下"
  | "加起来"
  | "付款找零"
  | "数量确认";

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
  theme: BasicQuantitiesPricesTheme,
];

const BASIC_QUANTITIES_PRICES_REFS = [
  "worker-a-a2-basic-quantities-prices",
  "basic-thai-quantities-prices",
];

const rows: Row[] = [
  ["ruam", "รวม", "ruam", "合计；รวม在一起", "动词", "总数"],
  ["ruam-thang-mot", "รวมทั้งหมด", "ruam thang mot", "全部合计", "短语", "总数"],
  ["thang-mot", "ทั้งหมด", "thang mot", "全部；一共", "副词", "总数"],
  ["thang-sin", "ทั้งสิ้น", "thang sin", "总共；合计", "副词", "总数"],
  ["ra-khaa-ruam", "ราคารวม", "raa-khaa ruam", "总价", "名词", "总数"],
  ["jam-nuan-ruam", "จำนวนรวม", "jam-nuan ruam", "总数量", "名词", "总数"],
  ["ruam-laew", "รวมแล้ว", "ruam laew", "加起来后；总共", "短语", "总数"],
  ["ruam-bpen", "รวมเป็น", "ruam bpen", "合计为", "句型", "总数"],
  ["khit-ruam", "คิดรวม", "khit ruam", "合并计算", "动词", "总数"],
  ["mai-ruam", "ไม่รวม", "mai ruam", "不包括", "短语", "总数"],
  ["dtaaw-an", "ต่ออัน", "dtaaw an", "每个；按个", "短语", "单价"],
  ["dtaaw-khon", "ต่อคน", "dtaaw khon", "每人", "短语", "单价"],
  ["dtaaw-wan", "ต่อวัน", "dtaaw wan", "每天；按天", "短语", "单价"],
  ["dtaaw-chua-moong", "ต่อชั่วโมง", "dtaaw chua moong", "每小时；按小时", "短语", "单价"],
  ["an-la", "อันละ", "an la", "每个……", "短语", "单价"],
  ["khon-la", "คนละ", "khon la", "每人……", "短语", "单价"],
  ["wan-la", "วันละ", "wan la", "每天……", "短语", "单价"],
  ["chut-la", "ชุดละ", "chut la", "每套……", "短语", "单价"],
  ["ki-lo-la", "กิโลละ", "gi-loo la", "每公斤……", "短语", "单价"],
  ["ra-khaa-dtaaw-nuai", "ราคาต่อหน่วย", "raa-khaa dtaaw nuai", "单价", "名词", "单价"],
  ["lot-raa-khaa", "ลดราคา", "lot raa-khaa", "降价；打折", "动词", "折扣"],
  ["suan-lot", "ส่วนลด", "suan lot", "折扣", "名词", "折扣"],
  ["mi-suan-lot", "มีส่วนลด", "mii suan lot", "有折扣", "句型", "折扣"],
  ["mai-mi-suan-lot", "ไม่มีส่วนลด", "mai mii suan lot", "没有折扣", "句型", "折扣"],
  ["lot-sip-bpoe-sen", "ลดสิบเปอร์เซ็นต์", "lot sip bpoe-sen", "打九折；减百分之十", "短语", "折扣"],
  ["lot-hii-sip-bpoe-sen", "ลดห้าสิบเปอร์เซ็นต์", "lot haa sip bpoe-sen", "减百分之五十", "短语", "折扣"],
  ["sale", "เซล", "seen", "促销；降价卖", "名词", "折扣"],
  ["chuang-lot-raa-khaa", "ช่วงลดราคา", "chuang lot raa-khaa", "打折期间", "名词", "折扣"],
  ["khuen-suan-lot", "คืนส่วนลด", "khuen suan lot", "返还折扣", "动词", "折扣"],
  ["chai-suan-lot", "ใช้ส่วนลด", "chai suan lot", "使用折扣", "动词", "折扣"],
  ["raa-khaa-doem", "ราคาเดิม", "raa-khaa doem", "原价", "名词", "原价半价"],
  ["raa-khaa-mai", "ราคาใหม่", "raa-khaa mai", "新价格", "名词", "原价半价"],
  ["khrueng-raa-khaa", "ครึ่งราคา", "khrueng raa-khaa", "半价", "名词", "原价半价"],
  ["khuen-raa-khaa", "ขึ้นราคา", "khuen raa-khaa", "涨价", "动词", "原价半价"],
  ["raa-khaa-long", "ราคาลง", "raa-khaa long", "价格下降", "句型", "原价半价"],
  ["raa-khaa-khuen", "ราคาขึ้น", "raa-khaa khuen", "价格上涨", "句型", "原价半价"],
  ["phaaeng-khuen", "แพงขึ้น", "phaaeng khuen", "变贵", "短语", "原价半价"],
  ["thuuk-long", "ถูกลง", "thuuk long", "变便宜", "短语", "原价半价"],
  ["jaak-raa-khaa-doem", "จากราคาเดิม", "jaak raa-khaa doem", "从原价算起", "短语", "原价半价"],
  ["mai-chai-raa-khaa-doem", "ไม่ใช่ราคาเดิม", "mai chai raa-khaa doem", "不是原价", "句型", "原价半价"],
  ["phaaw", "พอ", "phaaw", "够；足够", "形容词", "够不够"],
  ["mai-phaaw", "ไม่พอ", "mai phaaw", "不够", "形容词", "够不够"],
  ["phaaw-mai", "พอไหม", "phaaw mai", "够吗", "句型", "够不够"],
  ["pho-dii", "พอดี", "phaaw dii", "正好；刚好", "形容词", "够不够"],
  ["goen", "เกิน", "goen", "超过；多出", "动词", "够不够"],
  ["goen-bpai", "เกินไป", "goen bpai", "太多；过了", "副词", "够不够"],
  ["khaat", "ขาด", "khaat", "缺少", "动词", "够不够"],
  ["khaat-iik", "ขาดอีก", "khaat iik", "还差……", "短语", "够不够"],
  ["dtawng-phoem", "ต้องเพิ่ม", "dtawng phoem", "需要增加", "句型", "够不够"],
  ["mai-dtawng-phoem", "ไม่ต้องเพิ่ม", "mai dtawng phoem", "不用增加", "句型", "够不够"],
  ["maak-noi", "มากน้อย", "maak noi", "多或少；多少程度", "名词", "多少一点"],
  ["maak-khuen", "มากขึ้น", "maak khuen", "更多；变多", "短语", "多少一点"],
  ["noi-long", "น้อยลง", "noi long", "更少；少一点", "短语", "多少一点"],
  ["phoem-iik-noi", "เพิ่มอีกหน่อย", "phoem iik noi", "再加一点", "短语", "多少一点"],
  ["lot-iik-noi", "ลดอีกหน่อย", "lot iik noi", "再少一点；再降一点", "短语", "多少一点"],
  ["ao-noi-noi", "เอาน้อย ๆ", "ao noi noi", "要少一点", "句型", "多少一点"],
  ["ao-yuh-yuh", "เอาเยอะ ๆ", "ao yuh yuh", "要多一点/多一些", "句型", "多少一点"],
  ["iik-nit", "อีกนิด", "iik nit", "再一点", "短语", "多少一点"],
  ["nit-diao", "นิดเดียว", "nit diao", "只有一点", "短语", "多少一点"],
  ["bpra-maan-nii", "ประมาณนี้", "bpra-maan nii", "大约这样多/这样", "短语", "多少一点"],
  ["luea", "เหลือ", "luea", "剩下", "动词", "剩下"],
  ["luea-yuu", "เหลืออยู่", "luea yuu", "还剩着", "句型", "剩下"],
  ["luea-thao-rai", "เหลือเท่าไร", "luea thao rai", "剩多少", "句型", "剩下"],
  ["luea-iik", "เหลืออีก", "luea iik", "还剩……", "短语", "剩下"],
  ["mai-luea", "ไม่เหลือ", "mai luea", "没有剩下", "句型", "剩下"],
  ["khaawng-luea", "ของเหลือ", "khaawng luea", "剩下的东西", "名词", "剩下"],
  ["ngoen-luea", "เงินเหลือ", "ngoen luea", "剩下的钱", "名词", "剩下"],
  ["luea-nit-diao", "เหลือนิดเดียว", "luea nit diao", "只剩一点", "句型", "剩下"],
  ["luea-yuh", "เหลือเยอะ", "luea yuh", "剩很多", "句型", "剩下"],
  ["gep-wai", "เก็บไว้", "gep wai", "留着；存起来", "动词", "剩下"],
  ["buak", "บวก", "buak", "加；加上", "动词", "加起来"],
  ["buak-gan", "บวกกัน", "buak gan", "加在一起", "动词", "加起来"],
  ["ruam-gan", "รวมกัน", "ruam gan", "合在一起", "动词", "加起来"],
  ["ao-maa-ruam-gan", "เอามารวมกัน", "ao maa ruam gan", "拿来合计", "句型", "加起来"],
  ["khit-ruam-gan", "คิดรวมกัน", "khit ruam gan", "一起计算", "动词", "加起来"],
  ["ruam-gan-laew", "รวมกันแล้ว", "ruam gan laew", "加起来后", "短语", "加起来"],
  ["buak-phoem", "บวกเพิ่ม", "buak phoem", "另外加上", "动词", "加起来"],
  ["ruam-khaa-song", "รวมค่าส่ง", "ruam khaa song", "包括运费", "短语", "加起来"],
  ["mai-ruam-khaa-song", "ไม่รวมค่าส่ง", "mai ruam khaa song", "不含运费", "短语", "加起来"],
  ["ruam-phaa-sii", "รวมภาษี", "ruam phaa-sii", "含税", "短语", "加起来"],
  ["jaai-ngoen", "จ่ายเงิน", "jaai ngoen", "付款", "动词", "付款找零"],
  ["khit-ngoen", "คิดเงิน", "khit ngoen", "结账；算钱", "动词", "付款找零"],
  ["rap-ngoen", "รับเงิน", "rap ngoen", "收钱", "动词", "付款找零"],
  ["thawn-ngoen", "ทอนเงิน", "thaawn ngoen", "找钱", "动词", "付款找零"],
  ["ngoen-thawn", "เงินทอน", "ngoen thaawn", "找零", "名词", "付款找零"],
  ["khaaw-bai-set", "ขอใบเสร็จ", "khaaw bai-set", "要收据", "句型", "付款找零"],
  ["bai-set", "ใบเสร็จ", "bai-set", "收据", "名词", "付款找零"],
  ["jaai-sot", "จ่ายสด", "jaai sot", "付现金", "动词", "付款找零"],
  ["jaai-duai-bat", "จ่ายด้วยบัตร", "jaai duai bat", "用卡付款", "短语", "付款找零"],
  ["on-ngoen", "โอนเงิน", "oon ngoen", "转账", "动词", "付款找零"],
  ["gii-an", "กี่อัน", "gii an", "几个", "句型", "数量确认"],
  ["gii-chin", "กี่ชิ้น", "gii chin", "几件/几块", "句型", "数量确认"],
  ["gii-kilo", "กี่กิโล", "gii gi-loo", "几公斤", "句型", "数量确认"],
  ["gii-khon", "กี่คน", "gii khon", "几个人", "句型", "数量确认"],
  ["gii-wan", "กี่วัน", "gii wan", "几天", "句型", "数量确认"],
  ["jam-nuan", "จำนวน", "jam-nuan", "数量", "名词", "数量确认"],
  ["jam-nuan-thuuk-mai", "จำนวนถูกไหม", "jam-nuan thuuk mai", "数量对吗", "句型", "数量确认"],
  ["khrop-mai", "ครบไหม", "khrop mai", "齐了吗；够数吗", "句型", "数量确认"],
  ["khrop-laew", "ครบแล้ว", "khrop laew", "齐了；够数了", "句型", "数量确认"],
  ["mai-khrop", "ไม่ครบ", "mai khrop", "不齐；数量不足", "句型", "数量确认"],
];

const relatedByTheme: Record<
  BasicQuantitiesPricesTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  总数: {
    synonym: "รวมทั้งหมด / ruam thang mot / 全部合计",
    antonym: "ไม่รวม / mai ruam / 不包括",
    comparison: "รวม 强调合在一起，ทั้งหมด 强调全部。",
    collocation: "รวมทั้งหมดกี่บาท / ruam thang mot gii baat / 一共多少泰铢",
  },
  单价: {
    synonym: "ต่ออัน / dtaaw an / 每个",
    antonym: "ราคารวม / raa-khaa ruam / 总价",
    comparison: "ต่อ... 和 ...ละ 都能表示“每……”，如 ต่อคน、คนละ。",
    collocation: "อันละยี่สิบบาท / an la yii sip baat / 每个二十泰铢",
  },
  折扣: {
    synonym: "ส่วนลด / suan lot / 折扣",
    antonym: "ราคาเต็ม / raa-khaa dtem / 全价",
    comparison: "ลดราคา 是打折/降价动作，ส่วนลด 是折扣本身。",
    collocation: "ใช้ส่วนลดได้ไหม / chai suan lot dai mai / 可以使用折扣吗",
  },
  原价半价: {
    synonym: "ราคาเดิม / raa-khaa doem / 原价",
    antonym: "ราคาใหม่ / raa-khaa mai / 新价格",
    comparison: "ครึ่งราคา 是半价，ขึ้นราคา 是涨价，ราคาลง 是价格下降。",
    collocation: "ลดจากราคาเดิมครึ่งราคา / lot jaak raa-khaa doem khrueng raa-khaa / 从原价降到半价",
  },
  够不够: {
    synonym: "พอ / phaaw / 够",
    antonym: "ไม่พอ / mai phaaw / 不够",
    comparison: "พอดี 是刚刚好，เกินไป 是过多或过度。",
    collocation: "เงินพอไหม / ngoen phaaw mai / 钱够吗",
  },
  多少一点: {
    synonym: "อีกนิด / iik nit / 再一点",
    antonym: "เยอะเกินไป / yuh goen bpai / 太多",
    comparison: "เพิ่ม 是增加，ลด 是减少；หน่อย 让表达更柔和。",
    collocation: "ลดอีกหน่อยได้ไหม / lot iik noi dai mai / 可以再少一点吗",
  },
  剩下: {
    synonym: "เหลือ / luea / 剩下",
    antonym: "หมด / mot / 没了、用完",
    comparison: "เหลืออยู่ 强调还剩着，ไม่เหลือ 是一点不剩。",
    collocation: "เหลืออีกสองอัน / luea iik saawng an / 还剩两个",
  },
  加起来: {
    synonym: "รวมกัน / ruam gan / 合在一起",
    antonym: "แยกกัน / yaaek gan / 分开",
    comparison: "บวก 是数学上的加，รวมกัน 更常说东西或金额合起来。",
    collocation: "รวมค่าส่งแล้วเท่าไร / ruam khaa song laew thao rai / 加上运费后一共多少",
  },
  付款找零: {
    synonym: "คิดเงิน / khit ngoen / 结账",
    antonym: "ยังไม่จ่าย / yang mai jaai / 还没付款",
    comparison: "จ่ายเงิน 是付款，ทอนเงิน 是找钱，เงินทอน 是找零的钱。",
    collocation: "จ่ายเงินแล้วขอใบเสร็จ / jaai ngoen laew khaaw bai-set / 付款后要收据",
  },
  数量确认: {
    synonym: "จำนวน / jam-nuan / 数量",
    antonym: "ไม่ครบ / mai khrop / 不齐",
    comparison: "กี่ + 量词用来问数量，如 กี่อัน、กี่คน、กี่วัน。",
    collocation: "จำนวนถูกไหม / jam-nuan thuuk mai / 数量对吗",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาซื้อของ ฉันใช้คำว่า “${row[1]}” เพื่อถามจำนวน ราคา หรือส่วนลดให้ชัดเจนก่อนจ่ายเงิน`,
  roman: `we-laa sue khaawng chan chai kham waa "${row[2]}" phuea thaam jam-nuan raa-khaa rue suan lot hai chat-jen gaawn jaai ngoen`,
  chinese: `买东西时，我会用“${row[1]}”把数量、价格或折扣问清楚后再付款。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "数量价格", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 数量和价格表达。适合购物、结账、问单价、算总数、确认折扣和数量；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_QUANTITIES_PRICES_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_QUANTITIES_PRICES_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
