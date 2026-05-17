export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type EverydayComparisonDegreeTheme =
  | "比较"
  | "程度"
  | "最高"
  | "一样更"
  | "好坏"
  | "多少"
  | "快慢远近"
  | "偏向"
  | "日常评价"
  | "选择比较";

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
  theme: EverydayComparisonDegreeTheme,
];

const COMPARISON_DEGREE_REFS = [
  "worker-a-a2-everyday-comparison-degree",
  "basic-thai-comparison-degree",
];

const rows: Row[] = [
  ["gwaa", "กว่า", "gwaa", "比……更；用于比较", "副词", "比较"],
  ["maak-gwaa", "มากกว่า", "maak gwaa", "更多；比……多", "短语", "比较"],
  ["noi-gwaa", "น้อยกว่า", "noi gwaa", "更少；比……少", "短语", "比较"],
  ["dii-gwaa", "ดีกว่า", "dii gwaa", "更好；比较好", "短语", "比较"],
  ["yae-gwaa", "แย่กว่า", "yae gwaa", "更差；更不好", "短语", "比较"],
  ["thuuk-gwaa", "ถูกกว่า", "thuuk gwaa", "更便宜", "短语", "比较"],
  ["phaaeng-gwaa", "แพงกว่า", "phaaeng gwaa", "更贵", "短语", "比较"],
  ["glai-gwaa", "ไกลกว่า", "glai gwaa", "更远", "短语", "比较"],
  ["glai-near-gwaa", "ใกล้กว่า", "glai gwaa", "更近", "短语", "比较"],
  ["reo-gwaa", "เร็วกว่า", "reo gwaa", "更快", "短语", "比较"],
  ["chaa-gwaa", "ช้ากว่า", "chaa gwaa", "更慢", "短语", "比较"],
  ["yai-gwaa", "ใหญ่กว่า", "yai gwaa", "更大", "短语", "比较"],
  ["lek-gwaa", "เล็กกว่า", "lek gwaa", "更小", "短语", "比较"],
  ["sabai-gwaa", "สบายกว่า", "sa-baai gwaa", "更舒服", "短语", "比较"],
  ["ngai-gwaa", "ง่ายกว่า", "ngaai gwaa", "更容易", "短语", "比较"],
  ["yaak-gwaa", "ยากกว่า", "yaak gwaa", "更难", "短语", "比较"],
  ["maak", "มาก", "maak", "很；多", "副词", "程度"],
  ["maak-maak", "มาก ๆ", "maak maak", "非常；很多", "副词", "程度"],
  ["nit-noi", "นิดหน่อย", "nit noi", "一点点", "副词", "程度"],
  ["nit-diao", "นิดเดียว", "nit diao", "一点儿；只有一点", "短语", "程度"],
  ["khon-khaang", "ค่อนข้าง", "khon khaang", "比较；相当", "副词", "程度"],
  ["phaaw-som-khuan", "พอสมควร", "phaaw som khuan", "相当；还算", "副词", "程度"],
  ["goen-bpai", "เกินไป", "goen bpai", "太……；过于", "副词", "程度"],
  ["mai-khoi", "ไม่ค่อย", "mai khoi", "不太……", "副词", "程度"],
  ["thaep-mai", "แทบไม่", "thaep mai", "几乎不", "副词", "程度"],
  ["bpra-maan", "ประมาณ", "bpra-maan", "大约；差不多", "副词", "程度"],
  ["phaaw-phaaw", "พอ ๆ", "phaaw phaaw", "差不多；程度相近", "副词", "程度"],
  ["radap-glaang", "ระดับกลาง", "ra-dap glaang", "中等水平", "名词", "程度"],
  ["mai-maak-mai-noi", "ไม่มากไม่น้อย", "mai maak mai noi", "不多不少", "短语", "程度"],
  ["dtid-noi", "ติดนิดหน่อย", "dtit nit noi", "稍微有点；略微", "短语", "程度"],
  ["thii-sut", "ที่สุด", "thii sut", "最……", "副词", "最高"],
  ["dii-thii-sut", "ดีที่สุด", "dii thii sut", "最好", "短语", "最高"],
  ["phaaeng-thii-sut", "แพงที่สุด", "phaaeng thii sut", "最贵", "短语", "最高"],
  ["thuuk-thii-sut", "ถูกที่สุด", "thuuk thii sut", "最便宜", "短语", "最高"],
  ["glai-near-thii-sut", "ใกล้ที่สุด", "glai thii sut", "最近", "短语", "最高"],
  ["glai-thii-sut", "ไกลที่สุด", "glai thii sut", "最远", "短语", "最高"],
  ["reo-thii-sut", "เร็วที่สุด", "reo thii sut", "最快", "短语", "最高"],
  ["chaa-thii-sut", "ช้าที่สุด", "chaa thii sut", "最慢", "短语", "最高"],
  ["chaawp-thii-sut", "ชอบที่สุด", "chaawp thii sut", "最喜欢", "短语", "最高"],
  ["mo-thii-sut", "เหมาะที่สุด", "maw thii sut", "最合适", "短语", "最高"],
  ["muean-gan", "เหมือนกัน", "muean gan", "一样；相同", "短语", "一样更"],
  ["thao-gan", "เท่ากัน", "thao gan", "一样多；相等", "短语", "一样更"],
  ["phaaw-phaaw-gan", "พอ ๆ กัน", "phaaw phaaw gan", "差不多一样", "短语", "一样更"],
  ["mai-thao-gan", "ไม่เท่ากัน", "mai thao gan", "不相等；不一样多", "短语", "一样更"],
  ["phoem-khuen", "เพิ่มขึ้น", "phoem khuen", "增加；变多", "动词", "一样更"],
  ["lot-long", "ลดลง", "lot long", "减少；变少", "动词", "一样更"],
  ["maak-khuen", "มากขึ้น", "maak khuen", "更多；更……", "短语", "一样更"],
  ["noi-long", "น้อยลง", "noi long", "更少；少一些", "短语", "一样更"],
  ["dii-khuen", "ดีขึ้น", "dii khuen", "变好；好一些", "短语", "一样更"],
  ["yae-long", "แย่ลง", "yae long", "变差", "短语", "一样更"],
  ["reo-khuen", "เร็วขึ้น", "reo khuen", "变快", "短语", "一样更"],
  ["chaa-long", "ช้าลง", "chaa long", "变慢", "短语", "一样更"],
  ["dii", "ดี", "dii", "好；不错", "形容词", "好坏"],
  ["mai-dii", "ไม่ดี", "mai dii", "不好", "短语", "好坏"],
  ["yae", "แย่", "yae", "差；糟", "形容词", "好坏"],
  ["phaaw-chai", "พอใช้", "phaaw chai", "还可以；勉强可用", "形容词", "好坏"],
  ["o-khee", "โอเค", "oo-khee", "可以；还行", "形容词", "好坏"],
  ["saduak", "สะดวก", "sa-duak", "方便", "形容词", "好坏"],
  ["mai-saduak", "ไม่สะดวก", "mai sa-duak", "不方便", "短语", "好坏"],
  ["khum", "คุ้ม", "khum", "划算；值得", "形容词", "好坏"],
  ["mai-khum", "ไม่คุ้ม", "mai khum", "不划算；不值得", "短语", "好坏"],
  ["mo", "เหมาะ", "maw", "合适", "形容词", "好坏"],
  ["mai-mo", "ไม่เหมาะ", "mai maw", "不合适", "短语", "好坏"],
  ["yiam", "เยี่ยม", "yiiam", "很棒；优秀", "形容词", "好坏"],
  ["yuh", "เยอะ", "yuh", "多；很多", "形容词", "多少"],
  ["maak-maai", "มากมาย", "maak maai", "许多；大量", "形容词", "多少"],
  ["noi", "น้อย", "noi", "少", "形容词", "多少"],
  ["noi-maak", "น้อยมาก", "noi maak", "很少", "短语", "多少"],
  ["laai", "หลาย", "laai", "好几个；许多", "形容词", "多少"],
  ["saawng-saam", "สองสาม", "saawng saam", "两三个；几", "短语", "多少"],
  ["mai-phaaw", "ไม่พอ", "mai phaaw", "不够", "短语", "多少"],
  ["phaaw", "พอ", "phaaw", "够；足够", "形容词", "多少"],
  ["luea", "เหลือ", "luea", "剩下", "动词", "多少"],
  ["khaat", "ขาด", "khaat", "缺少；不够", "动词", "多少"],
  ["reo", "เร็ว", "reo", "快；早", "形容词", "快慢远近"],
  ["chaa", "ช้า", "chaa", "慢；晚", "形容词", "快慢远近"],
  ["wai", "ไว", "wai", "快；反应快", "形容词", "快慢远近"],
  ["naan", "นาน", "naan", "久；时间长", "形容词", "快慢远近"],
  ["glai-near", "ใกล้", "glai", "近", "形容词", "快慢远近"],
  ["glai", "ไกล", "glai", "远", "形容词", "快慢远近"],
  ["thaang-glai", "ทางไกล", "thaang glai", "远路；长途", "名词", "快慢远近"],
  ["thaang-glai-near", "ทางใกล้", "thaang glai", "近路；短途", "名词", "快慢远近"],
  ["chai-welaa-noi", "ใช้เวลาน้อย", "chai we-laa noi", "花的时间少", "短语", "快慢远近"],
  ["chai-welaa-naan", "ใช้เวลานาน", "chai we-laa naan", "花的时间长", "短语", "快慢远近"],
  ["khon-khaang-phaaeng", "ค่อนข้างแพง", "khon khaang phaaeng", "偏贵；比较贵", "短语", "偏向"],
  ["khon-khaang-glai", "ค่อนข้างไกล", "khon khaang glai", "偏远；比较远", "短语", "偏向"],
  ["khon-khaang-yaak", "ค่อนข้างยาก", "khon khaang yaak", "偏难；比较难", "短语", "偏向"],
  ["khon-khaang-ngaai", "ค่อนข้างง่าย", "khon khaang ngaai", "偏容易；比较容易", "短语", "偏向"],
  ["awk-ja-raawn", "ออกจะร้อน", "awk ja raawn", "有点热；偏热", "短语", "偏向"],
  ["awk-ja-phaaeng", "ออกจะแพง", "awk ja phaaeng", "有点贵；偏贵", "短语", "偏向"],
  ["duu-dii-gwaa", "ดูดีกว่า", "duu dii gwaa", "看起来更好", "短语", "偏向"],
  ["duu-mai-gwaa", "ดูใหม่กว่า", "duu mai gwaa", "看起来更新", "短语", "偏向"],
  ["duu-gao-gwaa", "ดูเก่ากว่า", "duu gao gwaa", "看起来更旧", "短语", "偏向"],
  ["raa-khaa-raeng", "ราคาแรง", "raa-khaa raaeng", "价格偏高；口语说贵", "短语", "偏向"],
  ["naa-chai", "น่าใช้", "naa chai", "看起来好用；值得用", "形容词", "日常评价"],
  ["naa-sue", "น่าซื้อ", "naa sue", "值得买；想买", "形容词", "日常评价"],
  ["naa-gin", "น่ากิน", "naa gin", "看起来好吃", "形容词", "日常评价"],
  ["naa-bpai", "น่าไป", "naa bpai", "值得去；想去", "形容词", "日常评价"],
  ["mai-naa-chai", "ไม่น่าใช้", "mai naa chai", "看起来不好用", "短语", "日常评价"],
  ["thamma-daa", "ธรรมดา", "tham-ma-daa", "普通；一般", "形容词", "日常评价"],
  ["phi-seet", "พิเศษ", "phi-seet", "特别", "形容词", "日常评价"],
  ["neuuai-gwaa", "เหนื่อยกว่า", "neuuai gwaa", "更累", "短语", "日常评价"],
  ["sa-nuk-gwaa", "สนุกกว่า", "sa-nuk gwaa", "更有趣", "短语", "日常评价"],
  ["naa-buea-gwaa", "น่าเบื่อกว่า", "naa buea gwaa", "更无聊", "短语", "日常评价"],
  ["lueak-aan-nii", "เลือกอันนี้", "lueak an nii", "选这个", "句型", "选择比较"],
  ["lueak-aan-nan", "เลือกอันนั้น", "lueak an nan", "选那个", "句型", "选择比较"],
  ["aan-nii-dii-gwaa", "อันนี้ดีกว่า", "an nii dii gwaa", "这个更好", "句型", "选择比较"],
  ["aan-nan-thuuk-gwaa", "อันนั้นถูกกว่า", "an nan thuuk gwaa", "那个更便宜", "句型", "选择比较"],
  ["aan-nai-khum-gwaa", "อันไหนคุ้มกว่า", "an nai khum gwaa", "哪一个更划算", "句型", "选择比较"],
  ["baep-nii-mo-gwaa", "แบบนี้เหมาะกว่า", "baaep nii maw gwaa", "这样更合适", "句型", "选择比较"],
];

const relatedByTheme: Record<
  EverydayComparisonDegreeTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  比较: {
    synonym: "มากกว่า / maak gwaa / 更多",
    antonym: "น้อยกว่า / noi gwaa / 更少",
    comparison: "กว่า 放在形容词后表示“更……”，如 ดี + กว่า = ดีกว่า。",
    collocation: "ดีกว่าอันนั้น / dii gwaa an nan / 比那个好",
  },
  程度: {
    synonym: "ค่อนข้าง / khon khaang / 比较、相当",
    antonym: "ไม่ค่อย / mai khoi / 不太",
    comparison: "มาก 表示“很”，เกินไป 表示“太过了”，语气更强。",
    collocation: "ค่อนข้างดี / khon khaang dii / 比较好",
  },
  最高: {
    synonym: "ที่สุด / thii sut / 最",
    antonym: "ธรรมดา / tham-ma-daa / 普通",
    comparison: "ที่สุด 通常放在形容词后，如 ถูกที่สุด 表示最便宜。",
    collocation: "ชอบที่สุด / chaawp thii sut / 最喜欢",
  },
  一样更: {
    synonym: "เท่ากัน / thao gan / 相等",
    antonym: "ไม่เท่ากัน / mai thao gan / 不相等",
    comparison: "เท่ากัน 偏数量或程度相等，เหมือนกัน 偏样子、情况相同。",
    collocation: "ราคาเท่ากัน / raa-khaa thao gan / 价格一样",
  },
  好坏: {
    synonym: "โอเค / oo-khee / 还行",
    antonym: "แย่ / yae / 差、糟",
    comparison: "ดี 是普通的好，คุ้ม 强调值不值得、划不划算。",
    collocation: "คุณภาพดี / khun-na-phaap dii / 质量好",
  },
  多少: {
    synonym: "เยอะ / yuh / 很多",
    antonym: "น้อย / noi / 少",
    comparison: "มาก 更中性，เยอะ 更口语；พอ 表示够，不一定很多。",
    collocation: "คนเยอะมาก / khon yuh maak / 人很多",
  },
  快慢远近: {
    synonym: "เร็ว / reo / 快",
    antonym: "ช้า / chaa / 慢",
    comparison: "ใกล้ 和 ไกล 发音相近，意思相反，学习时要靠语境分清。",
    collocation: "ใช้เวลานาน / chai we-laa naan / 花很久",
  },
  偏向: {
    synonym: "ค่อนข้าง / khon khaang / 偏、比较",
    antonym: "ไม่ค่อย / mai khoi / 不太",
    comparison: "ค่อนข้าง 比 มาก 语气轻，适合说“偏贵、偏远”。",
    collocation: "ค่อนข้างแพงแต่คุณภาพดี / khon khaang phaaeng dtae khun-na-phaap dii / 偏贵但质量好",
  },
  日常评价: {
    synonym: "น่าใช้ / naa chai / 值得用",
    antonym: "ไม่น่าใช้ / mai naa chai / 看起来不好用",
    comparison: "น่า + 动词 表示“看起来值得……/让人想……”，常用于评价。",
    collocation: "ร้านนี้น่าไป / raan nii naa bpai / 这家店值得去",
  },
  选择比较: {
    synonym: "เลือก / lueak / 选择",
    antonym: "ไม่เลือก / mai lueak / 不选",
    comparison: "อันนี้ 指这个，อันนั้น 指那个；加 กว่า 可以说哪个更好。",
    collocation: "เลือกอันที่ถูกกว่า / lueak an thii thuuk gwaa / 选更便宜的那个",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาซื้อของ ฉันใช้คำว่า “${row[1]}” เพื่อเปรียบเทียบราคา คุณภาพ หรือความสะดวกก่อนตัดสินใจ`,
  roman: `we-laa sue khaawng chan chai kham waa "${row[2]}" phuea bpriap-thiap raa-khaa khun-na-phaap rue khwaam sa-duak gaawn dtat-sin-jai`,
  chinese: `买东西时，我会用“${row[1]}”来比较价格、质量或方便程度，然后再决定。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "比较程度", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 日常比较和评价表达。可用于买东西、选路线、评价服务或说明程度；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: COMPARISON_DEGREE_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_COMPARISON_DEGREE_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
