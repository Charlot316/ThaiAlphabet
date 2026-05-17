export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "尺码不合" | "坏了" | "收据凭证" | "保修" | "换颜色" | "退款" | "客服解释";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const DAILY_SHOPPING_RETURNS_REFS = ["thai-frequency", "thai-a2-daily-shopping-returns-candidate"];

const products: readonly Item[] = [
  { thai: "เสื้อตัวนี้", roman: "seua dtua nii", chinese: "这件衣服", id: "seua-dtua-nii" },
  { thai: "กางเกงตัวนี้", roman: "gaang-geeng dtua nii", chinese: "这条裤子", id: "gaang-geeng-dtua-nii" },
  { thai: "รองเท้าคู่นี้", roman: "raawng-thaao khuu nii", chinese: "这双鞋", id: "raawng-thaao-khuu-nii" },
  { thai: "กระเป๋าใบนี้", roman: "gra-bpao bai nii", chinese: "这个包", id: "gra-bpao-bai-nii" },
  { thai: "หมวกใบนี้", roman: "muaak bai nii", chinese: "这顶帽子", id: "muaak-bai-nii" },
  { thai: "แก้วน้ำใบนี้", roman: "gaaeo naam bai nii", chinese: "这个水杯", id: "gaaeo-naam-bai-nii" },
  { thai: "กล่องข้าวใบนี้", roman: "glaawng khaao bai nii", chinese: "这个饭盒", id: "glaawng-khaao-bai-nii" },
  { thai: "หูฟังอันนี้", roman: "huu-fang an nii", chinese: "这个耳机", id: "huu-fang-an-nii" },
  { thai: "สายชาร์จเส้นนี้", roman: "saai chaat sen nii", chinese: "这根充电线", id: "saai-chaat-sen-nii" },
  { thai: "โคมไฟเล็ก", roman: "khoom fai lek", chinese: "小台灯", id: "khoom-fai-lek" },
  { thai: "ผ้าขนหนูผืนนี้", roman: "phaa khon-nuu pheuun nii", chinese: "这条毛巾", id: "phaa-khon-nuu-pheuun-nii" },
  { thai: "ร่มคันนี้", roman: "rom khan nii", chinese: "这把伞", id: "rom-khan-nii" },
  { thai: "ของเล่นชิ้นนี้", roman: "khaawng-len chin nii", chinese: "这个玩具", id: "khaawng-len-chin-nii" },
  { thai: "นาฬิกาเรือนนี้", roman: "naa-li-gaa reuuan nii", chinese: "这块表", id: "naa-li-gaa-reuuan-nii" },
  { thai: "ปลั๊กพ่วงอันนี้", roman: "bplak phuang an nii", chinese: "这个插线板", id: "bplak-phuang-an-nii" },
  { thai: "กระทะใบนี้", roman: "gra-tha bai nii", chinese: "这个锅", id: "gra-tha-bai-nii" },
];

const proofs: readonly Item[] = [
  { thai: "ใบเสร็จ", roman: "bai-set", chinese: "收据", id: "bai-set" },
  { thai: "ใบรับประกัน", roman: "bai rap-bpra-gan", chinese: "保修单", id: "bai-rap-bpra-gan" },
  { thai: "กล่องสินค้า", roman: "glaawng sin-khaa", chinese: "商品盒子", id: "glaawng-sin-khaa" },
  { thai: "ป้ายราคา", roman: "bpaai raa-khaa", chinese: "价签", id: "bpaai-raa-khaa" },
  { thai: "รูปถ่ายสินค้า", roman: "ruup-thaai sin-khaa", chinese: "商品照片", id: "ruup-thaai-sin-khaa" },
  { thai: "หลักฐานการจ่ายเงิน", roman: "lak-thaan gaan jaai ngoen", chinese: "付款凭证", id: "lak-thaan-gaan-jaai-ngoen" },
  { thai: "เลขคำสั่งซื้อ", roman: "leek kham-sang-seu", chinese: "订单号", id: "leek-kham-sang-seu" },
  { thai: "ข้อความจากร้าน", roman: "khaaw-khwaam jaak raan", chinese: "店家的消息", id: "khaaw-khwaam-jaak-raan" },
];

const directRows: readonly Definition[] = [
  { thai: "ขอเปลี่ยนไซซ์ได้ไหม", id: "khaaw-bpliian-sai-dai-mai", roman: "khaaw bpliian sai dai mai", chinese: "可以换尺码吗", partOfSpeech: "短语", theme: "尺码不合", exampleThai: "รองเท้าคู่นี้คับ ขอเปลี่ยนไซซ์ได้ไหม", exampleRoman: "raawng-thaao khuu nii khap, khaaw bpliian sai dai mai", exampleChinese: "这双鞋紧，可以换尺码吗？", tag: "换尺码" },
  { thai: "สินค้ามีปัญหาตั้งแต่วันแรก", id: "sin-khaa-mii-bpan-haa-dtang-dtaae-wan-raaek", roman: "sin-khaa mii bpan-haa dtang-dtaae wan raaek", chinese: "商品第一天就有问题", partOfSpeech: "短语", theme: "坏了", exampleThai: "สินค้ามีปัญหาตั้งแต่วันแรก ขอให้ร้านช่วยดูได้ไหม", exampleRoman: "sin-khaa mii bpan-haa dtang-dtaae wan raaek, khaaw hai raan chuai duu dai mai", exampleChinese: "商品第一天就有问题，可以请店里帮忙看一下吗？", tag: "坏了" },
  { thai: "ยังมีใบเสร็จอยู่", id: "yang-mii-bai-set-yuu", roman: "yang mii bai-set yuu", chinese: "收据还在", partOfSpeech: "短语", theme: "收据凭证", exampleThai: "ฉันยังมีใบเสร็จอยู่ สามารถคืนได้ไหม", exampleRoman: "chan yang mii bai-set yuu, saa-maat kheuun dai mai", exampleChinese: "我收据还在，可以退吗？", tag: "收据" },
  { thai: "อยู่ในช่วงรับประกัน", id: "yuu-nai-chuuang-rap-bpra-gan", roman: "yuu nai chuuang rap-bpra-gan", chinese: "还在保修期内", partOfSpeech: "短语", theme: "保修", exampleThai: "เครื่องนี้ยังอยู่ในช่วงรับประกัน", exampleRoman: "khreuuang nii yang yuu nai chuuang rap-bpra-gan", exampleChinese: "这台机器还在保修期内。", tag: "保修" },
  { thai: "อยากเปลี่ยนเป็นสีดำ", id: "yaak-bpliian-bpen-sii-dam", roman: "yaak bpliian bpen sii dam", chinese: "想换成黑色", partOfSpeech: "短语", theme: "换颜色", exampleThai: "สีนี้ไม่เหมาะ อยากเปลี่ยนเป็นสีดำ", exampleRoman: "sii nii mai maw, yaak bpliian bpen sii dam", exampleChinese: "这个颜色不合适，想换成黑色。", tag: "换颜色" },
  { thai: "ขอคืนเงินได้ไหม", id: "khaaw-kheuun-ngoen-dai-mai", roman: "khaaw kheuun ngoen dai mai", chinese: "可以退款吗", partOfSpeech: "短语", theme: "退款", exampleThai: "ถ้าไม่มีของเปลี่ยน ขอคืนเงินได้ไหม", exampleRoman: "thaa mai mii khaawng bpliian, khaaw kheuun ngoen dai mai", exampleChinese: "如果没有可换的商品，可以退款吗？", tag: "退款" },
  { thai: "ฝ่ายบริการลูกค้าอธิบายแล้ว", id: "faai-baaw-ri-gaan-luuk-khaa-a-thi-baai-laaeo", roman: "faai baaw-ri-gaan luuk-khaa a-thi-baai laaeo", chinese: "客服已经解释了", partOfSpeech: "短语", theme: "客服解释", exampleThai: "ฝ่ายบริการลูกค้าอธิบายแล้วว่าต้องใช้ใบเสร็จ", exampleRoman: "faai baaw-ri-gaan luuk-khaa a-thi-baai laaeo waa dtawng chai bai-set", exampleChinese: "客服已经解释了需要用收据。", tag: "客服" },
  { thai: "ต้องใช้หลักฐานการซื้อ", id: "dtawng-chai-lak-thaan-gaan-seu", roman: "dtawng chai lak-thaan gaan seu", chinese: "需要购物凭证", partOfSpeech: "短语", theme: "收据凭证", exampleThai: "ถ้าจะเปลี่ยนสินค้า ต้องใช้หลักฐานการซื้อ", exampleRoman: "thaa ja bpliian sin-khaa, dtawng chai lak-thaan gaan seu", exampleChinese: "如果要换商品，需要购物凭证。", tag: "凭证" },
];

const sizeRows = products.map((product): Definition => ({
  thai: `${product.thai}ไซซ์ไม่พอดี`,
  id: `${product.id}-sai-mai-phaaw-dii`,
  roman: `${product.roman} sai mai phaaw dii`,
  chinese: `${product.chinese}尺码不合适`,
  partOfSpeech: "短语",
  theme: "尺码不合",
  exampleThai: `${product.thai}ไซซ์ไม่พอดี ขอเปลี่ยนได้ไหม`,
  exampleRoman: `${product.roman} sai mai phaaw dii, khaaw bpliian dai mai`,
  exampleChinese: `${product.chinese}尺码不合适，可以换吗？`,
  tag: "尺码",
}));

const brokenRows = products.map((product): Definition => ({
  thai: `${product.thai}เสียแล้ว`,
  id: `${product.id}-siia-laaeo`,
  roman: `${product.roman} siia laaeo`,
  chinese: `${product.chinese}坏了`,
  partOfSpeech: "短语",
  theme: "坏了",
  exampleThai: `เพิ่งซื้อเมื่อวาน แต่${product.thai}เสียแล้ว`,
  exampleRoman: `phoeng seu meuua-waan, dtaae ${product.roman} siia laaeo`,
  exampleChinese: `昨天刚买，但${product.chinese}已经坏了。`,
  tag: "坏了",
}));

const colorRows = products.map((product): Definition => ({
  thai: `ขอเปลี่ยนสี${product.thai}`,
  id: `khaaw-bpliian-sii-${product.id}`,
  roman: `khaaw bpliian sii ${product.roman}`,
  chinese: `想给${product.chinese}换颜色`,
  partOfSpeech: "短语",
  theme: "换颜色",
  exampleThai: `สีนี้เข้มไป ขอเปลี่ยนสี${product.thai}ได้ไหม`,
  exampleRoman: `sii nii khem bpai, khaaw bpliian sii ${product.roman} dai mai`,
  exampleChinese: `这个颜色太深，可以给${product.chinese}换颜色吗？`,
  tag: "换颜色",
}));

const refundRows = products.map((product): Definition => ({
  thai: `ขอคืนเงินค่า${product.thai}`,
  id: `khaaw-kheuun-ngoen-khaa-${product.id}`,
  roman: `khaaw kheuun ngoen khaa ${product.roman}`,
  chinese: `想退${product.chinese}的钱`,
  partOfSpeech: "短语",
  theme: "退款",
  exampleThai: `ถ้าเปลี่ยนไม่ได้ ขอคืนเงินค่า${product.thai}`,
  exampleRoman: `thaa bpliian mai dai, khaaw kheuun ngoen khaa ${product.roman}`,
  exampleChinese: `如果不能换，想退${product.chinese}的钱。`,
  tag: "退款",
}));

const warrantyRows = products.map((product): Definition => ({
  thai: `${product.thai}มีประกันไหม`,
  id: `${product.id}-mii-bpra-gan-mai`,
  roman: `${product.roman} mii bpra-gan mai`,
  chinese: `${product.chinese}有保修吗`,
  partOfSpeech: "短语",
  theme: "保修",
  exampleThai: `ก่อนซื้อ ฉันถามว่า${product.thai}มีประกันไหม`,
  exampleRoman: `gaawn seu, chan thaam waa ${product.roman} mii bpra-gan mai`,
  exampleChinese: `购买前，我问${product.chinese}有没有保修。`,
  tag: "保修",
}));

const proofRows = proofs.map((proof): Definition => ({
  thai: `ต้องแสดง${proof.thai}`,
  id: `dtawng-sa-daaeng-${proof.id}`,
  roman: `dtawng sa-daaeng ${proof.roman}`,
  chinese: `需要出示${proof.chinese}`,
  partOfSpeech: "短语",
  theme: "收据凭证",
  exampleThai: `ถ้าจะคืนสินค้า ต้องแสดง${proof.thai}`,
  exampleRoman: `thaa ja kheuun sin-khaa, dtawng sa-daaeng ${proof.roman}`,
  exampleChinese: `如果要退货，需要出示${proof.chinese}。`,
  tag: "凭证",
}));

const serviceRows = proofs.map((proof): Definition => ({
  thai: `ฝ่ายบริการลูกค้าขอดู${proof.thai}`,
  id: `cs-khaaw-duu-${proof.id}`,
  roman: `baaw-ri-gaan luuk-khaa khaaw duu ${proof.roman}`,
  chinese: `客服要求看${proof.chinese}`,
  partOfSpeech: "短语",
  theme: "客服解释",
  exampleThai: `ฝ่ายบริการลูกค้าขอดู${proof.thai}ก่อนอธิบายวิธีคืนของ`,
  exampleRoman: `baaw-ri-gaan luuk-khaa khaaw duu ${proof.roman} gaawn a-thi-baai wi-thii kheuun khaawng`,
  exampleChinese: `客服要求先看${proof.chinese}，再解释退货方法。`,
  tag: "客服",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...sizeRows,
  ...brokenRows,
  ...colorRows,
  ...refundRows,
  ...warrantyRows,
  ...proofRows,
  ...serviceRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "购物退换货", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 退换货常用“ขอเปลี่ยน、เสียแล้ว、มีใบเสร็จ、มีประกันไหม、ขอคืนเงิน、ต้องแสดง...”等句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于购物退换货、尺码不合、坏了、收据、保修、换颜色、退款、客服解释和购物凭证。"],
    tags,
    sourceRefs: DAILY_SHOPPING_RETURNS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_SHOPPING_RETURNS_01 = rows.map(toCandidate);
