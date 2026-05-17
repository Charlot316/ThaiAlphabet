export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "材质" | "质量" | "新旧真假" | "耐用" | "颜色深浅" | "大小尺寸" | "试用试穿" | "购物评价";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const SHOPPING_MATERIALS_QUALITY_REFS = ["thai-frequency", "thai-a2-shopping-materials-quality-candidate"];

const products: readonly Item[] = [
  { thai: "เสื้อยืดตัวนี้", roman: "seua-yeut dtua nii", chinese: "这件 T 恤", id: "seua-yeut-dtua-nii" },
  { thai: "กางเกงตัวนี้", roman: "gaang-geeng dtua nii", chinese: "这条裤子", id: "gaang-geeng-dtua-nii" },
  { thai: "รองเท้าคู่นี้", roman: "raawng-thaao khuu nii", chinese: "这双鞋", id: "raawng-thaao-khuu-nii" },
  { thai: "กระเป๋าใบนี้", roman: "gra-bpao bai nii", chinese: "这个包", id: "gra-bpao-bai-nii" },
  { thai: "หมวกใบนี้", roman: "muaak bai nii", chinese: "这顶帽子", id: "muaak-bai-nii" },
  { thai: "แก้วน้ำใบนี้", roman: "gaaeo naam bai nii", chinese: "这个水杯", id: "gaaeo-naam-bai-nii" },
  { thai: "กล่องข้าวใบนี้", roman: "glaawng khaao bai nii", chinese: "这个饭盒", id: "glaawng-khaao-bai-nii" },
  { thai: "ผ้าขนหนูผืนนี้", roman: "phaa khon-nuu pheuun nii", chinese: "这条毛巾", id: "phaa-khon-nuu-pheuun-nii" },
  { thai: "ร่มคันนี้", roman: "rom khan nii", chinese: "这把伞", id: "rom-khan-nii" },
  { thai: "กระทะใบนี้", roman: "gra-tha bai nii", chinese: "这个锅/平底锅", id: "gra-tha-bai-nii" },
  { thai: "จานใบนี้", roman: "jaan bai nii", chinese: "这个盘子", id: "jaan-bai-nii" },
  { thai: "ช้อนคันนี้", roman: "chaawn khan nii", chinese: "这把勺子", id: "chaawn-khan-nii" },
  { thai: "ผ้าปูที่นอนผืนนี้", roman: "phaa bpuu thii-naawn pheuun nii", chinese: "这条床单", id: "phaa-bpuu-thii-naawn-pheuun-nii" },
  { thai: "โต๊ะตัวนี้", roman: "dto dtua nii", chinese: "这张桌子", id: "dto-dtua-nii" },
  { thai: "เก้าอี้ตัวนี้", roman: "gao-ii dtua nii", chinese: "这把椅子", id: "gao-ii-dtua-nii" },
  { thai: "ปลอกหมอนใบนี้", roman: "bplaawk maawn bai nii", chinese: "这个枕套", id: "bplaawk-maawn-bai-nii" },
];

const materials: readonly Item[] = [
  { thai: "ผ้าฝ้าย", roman: "phaa faai", chinese: "棉布", id: "phaa-faai" },
  { thai: "ผ้าลินิน", roman: "phaa li-nin", chinese: "亚麻布", id: "phaa-li-nin" },
  { thai: "หนังเทียม", roman: "nang thiiam", chinese: "人造皮", id: "nang-thiiam" },
  { thai: "หนังแท้", roman: "nang thaae", chinese: "真皮", id: "nang-thaae" },
  { thai: "พลาสติกหนา", roman: "phlaat-dtik naa", chinese: "厚塑料", id: "phlaat-dtik-naa" },
  { thai: "สแตนเลส", roman: "sa-dtaaen-leet", chinese: "不锈钢", id: "sa-dtaaen-leet" },
  { thai: "แก้วใส", roman: "gaaeo sai", chinese: "透明玻璃", id: "gaaeo-sai" },
  { thai: "ไม้สีอ่อน", roman: "maai sii aawn", chinese: "浅色木材", id: "maai-sii-aawn" },
  { thai: "ยางนิ่ม", roman: "yaang nim", chinese: "软橡胶", id: "yaang-nim" },
  { thai: "ผ้าบาง", roman: "phaa baang", chinese: "薄布", id: "phaa-baang" },
  { thai: "ผ้าหนา", roman: "phaa naa", chinese: "厚布", id: "phaa-naa" },
  { thai: "กระดาษแข็ง", roman: "gra-daat khaeng", chinese: "硬纸板", id: "gra-daat-khaeng" },
];

const directRows: readonly Definition[] = [
  { thai: "สีเข้มกว่านิดหน่อย", id: "sii-khem-gwaa-nit-naawy", roman: "sii khem gwaa nit naawy", chinese: "颜色深一点", partOfSpeech: "短语", theme: "颜色深浅", exampleThai: "มีสีเข้มกว่านิดหน่อยไหม ฉันอยากดูอีกแบบ", exampleRoman: "mii sii khem gwaa nit naawy mai, chan yaak duu iik baaep", exampleChinese: "有没有颜色深一点的？我想看另一种。", tag: "颜色" },
  { thai: "สีอ่อนกว่านี้", id: "sii-aawn-gwaa-nii", roman: "sii aawn gwaa nii", chinese: "比这个颜色浅", partOfSpeech: "短语", theme: "颜色深浅", exampleThai: "ฉันชอบสีอ่อนกว่านี้ ใส่แล้วดูสบายตา", exampleRoman: "chan chaawp sii aawn gwaa nii, sai laaeo duu sa-baai dtaa", exampleChinese: "我喜欢比这个颜色浅的，穿起来看着舒服。", tag: "颜色" },
  { thai: "มีไซซ์ใหญ่กว่านี้ไหม", id: "mii-sai-yai-gwaa-nii-mai", roman: "mii sai yai gwaa nii mai", chinese: "有大一点的尺码吗", partOfSpeech: "短语", theme: "大小尺寸", exampleThai: "รองเท้าคู่นี้คับ มีไซซ์ใหญ่กว่านี้ไหม", exampleRoman: "raawng-thaao khuu nii khap, mii sai yai gwaa nii mai", exampleChinese: "这双鞋紧，有大一点的尺码吗？", tag: "尺寸" },
  { thai: "ขอลองใส่ได้ไหม", id: "khaaw-laawng-sai-dai-mai", roman: "khaaw laawng sai dai mai", chinese: "可以试穿吗", partOfSpeech: "短语", theme: "试用试穿", exampleThai: "เสื้อตัวนี้สวย ขอลองใส่ได้ไหม", exampleRoman: "seua dtua nii suai, khaaw laawng sai dai mai", exampleChinese: "这件衣服漂亮，可以试穿吗？", tag: "试穿" },
  { thai: "ขอลองใช้ก่อน", id: "khaaw-laawng-chai-gaawn", roman: "khaaw laawng chai gaawn", chinese: "请让我先试用", partOfSpeech: "短语", theme: "试用试穿", exampleThai: "ถ้าเป็นเครื่องเล็ก ขอลองใช้ก่อนนะ", exampleRoman: "thaa bpen khreuuang lek, khaaw laawng chai gaawn na", exampleChinese: "如果是小机器，请让我先试用一下。", tag: "试用" },
  { thai: "ของแท้หรือของปลอม", id: "khaawng-thaae-reuu-khaawng-bplaawm", roman: "khaawng thaae reuu khaawng bplaawm", chinese: "是真货还是假货", partOfSpeech: "短语", theme: "新旧真假", exampleThai: "ลูกค้าถามว่าอันนี้เป็นของแท้หรือของปลอม", exampleRoman: "luuk-khaa thaam waa an nii bpen khaawng thaae reuu khaawng bplaawm", exampleChinese: "顾客问这个是真货还是假货。", tag: "真假" },
  { thai: "ใช้ได้นานไหม", id: "chai-dai-naan-mai", roman: "chai dai naan mai", chinese: "能用很久吗", partOfSpeech: "短语", theme: "耐用", exampleThai: "ของชิ้นนี้แพงหน่อย ใช้ได้นานไหม", exampleRoman: "khaawng chin nii phaaeng naawy, chai dai naan mai", exampleChinese: "这个东西有点贵，能用很久吗？", tag: "耐用" },
  { thai: "คุณภาพสมราคา", id: "khun-na-phaap-som-raa-khaa", roman: "khun-na-phaap som raa-khaa", chinese: "质量配得上价格", partOfSpeech: "短语", theme: "购物评价", exampleThai: "ถึงไม่ถูกมาก แต่คุณภาพสมราคา", exampleRoman: "theung mai thuuk maak, dtaae khun-na-phaap som raa-khaa", exampleChinese: "虽然不算很便宜，但质量配得上价格。", tag: "评价" },
];

const materialRows = products.map((product, index): Definition => {
  const material = materials[index % materials.length];
  return {
    thai: `${product.thai}ทำจาก${material.thai}`,
    id: `${product.id}-tham-jaak-${material.id}`,
    roman: `${product.roman} tham jaak ${material.roman}`,
    chinese: `${product.chinese}是${material.chinese}做的`,
    partOfSpeech: "短语",
    theme: "材质",
    exampleThai: `พนักงานบอกว่า${product.thai}ทำจาก${material.thai}`,
    exampleRoman: `pha-nak-ngaan baawk waa ${product.roman} tham jaak ${material.roman}`,
    exampleChinese: `店员说${product.chinese}是${material.chinese}做的。`,
    tag: "材质",
  };
});

const qualityRows = products.map((product): Definition => ({
  thai: `${product.thai}คุณภาพดี`,
  id: `${product.id}-khun-na-phaap-dii`,
  roman: `${product.roman} khun-na-phaap dii`,
  chinese: `${product.chinese}质量好`,
  partOfSpeech: "短语",
  theme: "质量",
  exampleThai: `ฉันคิดว่า${product.thai}คุณภาพดีและราคาไม่แรง`,
  exampleRoman: `chan khit waa ${product.roman} khun-na-phaap dii lae raa-khaa mai raaeng`,
  exampleChinese: `我觉得${product.chinese}质量好，价格也不贵得离谱。`,
  tag: "质量",
}));

const durableRows = products.map((product): Definition => ({
  thai: `${product.thai}ดูทนดี`,
  id: `${product.id}-duu-thon-dii`,
  roman: `${product.roman} duu thon dii`,
  chinese: `${product.chinese}看起来挺耐用`,
  partOfSpeech: "短语",
  theme: "耐用",
  exampleThai: `${product.thai}ดูทนดี ถ้าไม่แพงมากฉันจะซื้อ`,
  exampleRoman: `${product.roman} duu thon dii, thaa mai phaaeng maak chan ja seu`,
  exampleChinese: `${product.chinese}看起来挺耐用，如果不太贵我会买。`,
  tag: "耐用",
}));

const oldNewRows = products.map((product): Definition => ({
  thai: `${product.thai}เหมือนของใหม่`,
  id: `${product.id}-meuuan-khaawng-mai`,
  roman: `${product.roman} meuuan khaawng mai`,
  chinese: `${product.chinese}像新的一样`,
  partOfSpeech: "短语",
  theme: "新旧真假",
  exampleThai: `แม้เป็นของมือสอง แต่${product.thai}เหมือนของใหม่`,
  exampleRoman: `maae bpen khaawng meuu saawng, dtaae ${product.roman} meuuan khaawng mai`,
  exampleChinese: `虽然是二手的，但${product.chinese}像新的一样。`,
  tag: "新旧",
}));

const colorRows = products.map((product): Definition => ({
  thai: `${product.thai}สีเข้มไป`,
  id: `${product.id}-sii-khem-bpai`,
  roman: `${product.roman} sii khem bpai`,
  chinese: `${product.chinese}颜色太深`,
  partOfSpeech: "短语",
  theme: "颜色深浅",
  exampleThai: `สำหรับฉัน ${product.thai}สีเข้มไป อยากได้สีอ่อนกว่า`,
  exampleRoman: `sam-rap chan, ${product.roman} sii khem bpai, yaak dai sii aawn gwaa`,
  exampleChinese: `对我来说，${product.chinese}颜色太深，想要浅一点的。`,
  tag: "颜色",
}));

const sizeRows = products.map((product): Definition => ({
  thai: `${product.thai}ขนาดพอดี`,
  id: `${product.id}-kha-naat-phaaw-dii`,
  roman: `${product.roman} kha-naat phaaw dii`,
  chinese: `${product.chinese}尺寸正好`,
  partOfSpeech: "短语",
  theme: "大小尺寸",
  exampleThai: `ฉันลองแล้ว ${product.thai}ขนาดพอดี`,
  exampleRoman: `chan laawng laaeo, ${product.roman} kha-naat phaaw dii`,
  exampleChinese: `我试过了，${product.chinese}尺寸正好。`,
  tag: "尺寸",
}));

const tryRows = products.map((product): Definition => ({
  thai: `ขอลอง${product.thai}ก่อนซื้อ`,
  id: `khaaw-laawng-${product.id}-gaawn-seu`,
  roman: `khaaw laawng ${product.roman} gaawn seu`,
  chinese: `购买前想试一下${product.chinese}`,
  partOfSpeech: "短语",
  theme: "试用试穿",
  exampleThai: `ถ้าได้ ฉันขอลอง${product.thai}ก่อนซื้อ`,
  exampleRoman: `thaa dai, chan khaaw laawng ${product.roman} gaawn seu`,
  exampleChinese: `如果可以，我想购买前试一下${product.chinese}。`,
  tag: "试用试穿",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...materialRows,
  ...qualityRows,
  ...durableRows,
  ...oldNewRows,
  ...colorRows,
  ...sizeRows,
  ...tryRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "购物材质质量", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 购物评价常用“ทำจาก、คุณภาพดี、ดูทนดี、เหมือนของใหม่、สีเข้มไป、ขนาดพอดี、ขอลอง...”等表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于询问材质、质量、新旧真假、耐用程度、颜色深浅、大小尺寸、试穿试用和购物评价。"],
    tags,
    sourceRefs: SHOPPING_MATERIALS_QUALITY_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SHOPPING_MATERIALS_QUALITY_01 = rows.map(toCandidate);
