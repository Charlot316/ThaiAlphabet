export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "在家做饭" | "外食请求" | "少糖少辣" | "不要配料" | "加热打包" | "分开结账" | "推荐菜" | "食物状态";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Food = { thai: string; roman: string; chinese: string; id: string };

const COOKING_EATING_OUT_REQUESTS_REFS = ["thai-frequency", "thai-a2-cooking-eating-out-requests-candidate"];

const foods: readonly Food[] = [
  { thai: "ส้มตำ", roman: "som-dtam", chinese: "青木瓜沙拉", id: "som-dtam" },
  { thai: "ผัดกะเพราไก่", roman: "phat ga-phrao gai", chinese: "鸡肉罗勒炒", id: "phat-ga-phrao-gai" },
  { thai: "ข้าวผัดกุ้ง", roman: "khaao phat gung", chinese: "虾仁炒饭", id: "khaao-phat-gung" },
  { thai: "ต้มยำกุ้ง", roman: "dtom-yam gung", chinese: "冬阴功虾汤", id: "dtom-yam-gung" },
  { thai: "แกงเขียวหวาน", roman: "gaaeng khiaao waan", chinese: "绿咖喱", id: "gaaeng-khiaao-waan" },
  { thai: "ก๋วยเตี๋ยวน้ำ", roman: "guai-dtiiao naam", chinese: "汤粉", id: "guai-dtiiao-naam" },
  { thai: "ข้าวมันไก่", roman: "khaao man gai", chinese: "鸡油饭", id: "khaao-man-gai" },
  { thai: "หมูทอดกระเทียม", roman: "muu thaawt gra-thiiam", chinese: "蒜香炸猪肉", id: "muu-thaawt-gra-thiiam" },
  { thai: "ไข่เจียว", roman: "khai jiao", chinese: "煎蛋", id: "khai-jiao" },
  { thai: "ผัดผักรวม", roman: "phat phak ruam", chinese: "炒什锦蔬菜", id: "phat-phak-ruam" },
  { thai: "น้ำแตงโมปั่น", roman: "naam dtaaeng-moo bpan", chinese: "西瓜冰沙", id: "naam-dtaaeng-moo-bpan" },
  { thai: "ชาเย็น", roman: "chaa yen", chinese: "泰式冰茶", id: "chaa-yen" },
  { thai: "กาแฟเย็น", roman: "gaa-faae yen", chinese: "冰咖啡", id: "gaa-faae-yen" },
  { thai: "นมชมพู", roman: "nom chom-phuu", chinese: "粉红奶", id: "nom-chom-phuu" },
  { thai: "ขนมปังปิ้ง", roman: "kha-nom bpang bping", chinese: "烤面包", id: "kha-nom-bpang-bping" },
  { thai: "ข้าวเหนียวมะม่วง", roman: "khaao niao ma-muang", chinese: "芒果糯米饭", id: "khaao-niao-ma-muang" },
];

const homeItems: readonly Food[] = [
  { thai: "ผักสด", roman: "phak sot", chinese: "新鲜蔬菜", id: "phak-sot" },
  { thai: "เนื้อหมู", roman: "neua muu", chinese: "猪肉", id: "neua-muu" },
  { thai: "อกไก่", roman: "ok gai", chinese: "鸡胸肉", id: "ok-gai" },
  { thai: "กุ้งสด", roman: "gung sot", chinese: "鲜虾", id: "gung-sot" },
  { thai: "ไข่ไก่", roman: "khai gai", chinese: "鸡蛋", id: "khai-gai" },
  { thai: "เต้าหู้", roman: "dtao-huu", chinese: "豆腐", id: "dtao-huu" },
  { thai: "ข้าวที่เหลือ", roman: "khaao thii leuua", chinese: "剩饭", id: "khaao-thii-leuua" },
  { thai: "แกงเมื่อวาน", roman: "gaaeng muea-waan", chinese: "昨天的汤菜/咖喱", id: "gaaeng-muea-waan" },
  { thai: "น้ำจิ้ม", roman: "naam jim", chinese: "蘸酱", id: "naam-jim" },
  { thai: "ซุปในหม้อ", roman: "sup nai maaw", chinese: "锅里的汤", id: "sup-nai-maaw" },
  { thai: "เส้นก๋วยเตี๋ยว", roman: "sen guai-dtiiao", chinese: "米粉/面条", id: "sen-guai-dtiiao" },
  { thai: "ผลไม้หั่น", roman: "phon-la-maai han", chinese: "切好的水果", id: "phon-la-maai-han" },
  { thai: "กล่องข้าว", roman: "glaawng khaao", chinese: "饭盒", id: "glaawng-khaao" },
  { thai: "อาหารเช้า", roman: "aa-haan chaao", chinese: "早餐", id: "aa-haan-chaao" },
  { thai: "กับข้าวเย็น", roman: "gap-khaao yen", chinese: "晚饭菜", id: "gap-khaao-yen" },
  { thai: "ผักชี", roman: "phak-chii", chinese: "香菜", id: "phak-chii" },
];

const directRows: readonly Definition[] = [
  { thai: "ขอแยกบิลสองใบ", id: "khaaw-yaaek-bin-saawng-bai", roman: "khaaw yaaek bin saawng bai", chinese: "请分成两张账单", partOfSpeech: "短语", theme: "分开结账", exampleThai: "เรามากับเพื่อน ขอแยกบิลสองใบได้ไหม", exampleRoman: "rao maa gap phuean, khaaw yaaek bin saawng bai dai mai", exampleChinese: "我们和朋友一起来，可以分成两张账单吗？", tag: "结账" },
  { thai: "ขอจ่ายคนละครึ่ง", id: "khaaw-jaai-khon-la-khreung", roman: "khaaw jaai khon la khreung", chinese: "想各付一半", partOfSpeech: "短语", theme: "分开结账", exampleThai: "มื้อนี้ขอจ่ายคนละครึ่งนะ", exampleRoman: "meu nii khaaw jaai khon la khreung na", exampleChinese: "这顿饭我们各付一半吧。", tag: "结账" },
  { thai: "ขอคิดเงินโต๊ะนี้", id: "khaaw-khit-ngoen-dto-nii", roman: "khaaw khit ngoen dto nii", chinese: "请结这桌的账", partOfSpeech: "短语", theme: "分开结账", exampleThai: "ทานเสร็จแล้ว ขอคิดเงินโต๊ะนี้ค่ะ", exampleRoman: "thaan set laaeo, khaaw khit ngoen dto nii kha", exampleChinese: "吃完了，请结这桌的账。", tag: "结账" },
  { thai: "มีเมนูแนะนำไหม", id: "mii-mee-nuu-nae-nam-mai", roman: "mii mee-nuu nae-nam mai", chinese: "有推荐菜单吗", partOfSpeech: "短语", theme: "推荐菜", exampleThai: "ร้านนี้มาครั้งแรก มีเมนูแนะนำไหมคะ", exampleRoman: "raan nii maa khrang raaek, mii mee-nuu nae-nam mai kha", exampleChinese: "第一次来这家店，有推荐菜单吗？", tag: "推荐" },
  { thai: "จานไหนขายดี", id: "jaan-nai-khaai-dii", roman: "jaan nai khaai dii", chinese: "哪道菜卖得好", partOfSpeech: "短语", theme: "推荐菜", exampleThai: "ขอโทษค่ะ จานไหนขายดีในร้านนี้", exampleRoman: "khaaw-thoot kha, jaan nai khaai dii nai raan nii", exampleChinese: "不好意思，这家店哪道菜卖得好？", tag: "推荐" },
  { thai: "ขอชิมก่อนนิดหนึ่ง", id: "khaaw-chim-gaawn-nit-neung", roman: "khaaw chim gaawn nit neung", chinese: "想先尝一点", partOfSpeech: "短语", theme: "食物状态", exampleThai: "ถ้าได้ ขอชิมก่อนนิดหนึ่งนะคะ", exampleRoman: "thaa dai, khaaw chim gaawn nit neung na kha", exampleChinese: "可以的话，我想先尝一点。", tag: "试吃" },
];

const lessSweetRows = foods.map((food): Definition => ({
  thai: `ขอ${food.thai}หวานน้อย`,
  id: `khaaw-${food.id}-waan-naawy`,
  roman: `khaaw ${food.roman} waan naawy`,
  chinese: `${food.chinese}请少糖/少甜`,
  partOfSpeech: "短语",
  theme: "少糖少辣",
  exampleThai: `ฉันสั่ง${food.thai}และบอกว่าขอ${food.thai}หวานน้อย`,
  exampleRoman: `chan sang ${food.roman} lae baawk waa khaaw ${food.roman} waan naawy`,
  exampleChinese: `我点${food.chinese}时说请少糖/少甜。`,
  tag: "少糖",
}));

const lessSpicyRows = foods.map((food): Definition => ({
  thai: `ขอ${food.thai}เผ็ดน้อย`,
  id: `khaaw-${food.id}-phet-naawy`,
  roman: `khaaw ${food.roman} phet naawy`,
  chinese: `${food.chinese}请少辣`,
  partOfSpeech: "短语",
  theme: "少糖少辣",
  exampleThai: `เพื่อนกินเผ็ดไม่เก่ง เลยขอ${food.thai}เผ็ดน้อย`,
  exampleRoman: `phuean gin phet mai geng, loei khaaw ${food.roman} phet naawy`,
  exampleChinese: `朋友不太能吃辣，所以${food.chinese}请少辣。`,
  tag: "少辣",
}));

const noCilantroRows = foods.map((food): Definition => ({
  thai: `ขอ${food.thai}ไม่ใส่ผักชี`,
  id: `khaaw-${food.id}-mai-sai-phak-chii`,
  roman: `khaaw ${food.roman} mai sai phak-chii`,
  chinese: `${food.chinese}请不要放香菜`,
  partOfSpeech: "短语",
  theme: "不要配料",
  exampleThai: `ฉันไม่ชอบผักชี จึงขอ${food.thai}ไม่ใส่ผักชี`,
  exampleRoman: `chan mai chaawp phak-chii, jeung khaaw ${food.roman} mai sai phak-chii`,
  exampleChinese: `我不喜欢香菜，所以${food.chinese}请不要放香菜。`,
  tag: "不要配料",
}));

const takeawayRows = foods.map((food): Definition => ({
  thai: `ขอห่อ${food.thai}กลับบ้าน`,
  id: `khaaw-haaw-${food.id}-glap-baan`,
  roman: `khaaw haaw ${food.roman} glap baan`,
  chinese: `请把${food.chinese}打包带走`,
  partOfSpeech: "短语",
  theme: "加热打包",
  exampleThai: `กินไม่หมด ขอห่อ${food.thai}กลับบ้านได้ไหม`,
  exampleRoman: `gin mai mot, khaaw haaw ${food.roman} glap baan dai mai`,
  exampleChinese: `吃不完，可以请把${food.chinese}打包带走吗？`,
  tag: "打包",
}));

const heatRows = homeItems.map((item): Definition => ({
  thai: `ช่วยอุ่น${item.thai}ให้หน่อย`,
  id: `chuai-un-${item.id}-hai-naawy`,
  roman: `chuai un ${item.roman} hai naawy`,
  chinese: `请帮忙加热${item.chinese}`,
  partOfSpeech: "短语",
  theme: "加热打包",
  exampleThai: `ก่อนกิน ช่วยอุ่น${item.thai}ให้หน่อยได้ไหม`,
  exampleRoman: `gaawn gin, chuai un ${item.roman} hai naawy dai mai`,
  exampleChinese: `吃之前，可以请帮忙加热${item.chinese}吗？`,
  tag: "加热",
}));

const cookingRows = homeItems.map((item): Definition => ({
  thai: `เตรียม${item.thai}ไว้ทำอาหาร`,
  id: `dtriiam-${item.id}-wai-tham-aa-haan`,
  roman: `dtriiam ${item.roman} wai tham aa-haan`,
  chinese: `准备${item.chinese}用来做饭`,
  partOfSpeech: "短语",
  theme: "在家做饭",
  exampleThai: `ตอนเย็นแม่เตรียม${item.thai}ไว้ทำอาหาร`,
  exampleRoman: `dtaawn yen maae dtriiam ${item.roman} wai tham aa-haan`,
  exampleChinese: `傍晚妈妈准备${item.chinese}用来做饭。`,
  tag: "做饭",
}));

const stateRows = homeItems.slice(0, 12).map((item): Definition => ({
  thai: `${item.thai}ยังร้อนอยู่`,
  id: `${item.id}-yang-raawn-yuu`,
  roman: `${item.roman} yang raawn yuu`,
  chinese: `${item.chinese}还热着`,
  partOfSpeech: "短语",
  theme: "食物状态",
  exampleThai: `${item.thai}ยังร้อนอยู่ รอสักครู่ก่อนกิน`,
  exampleRoman: `${item.roman} yang raawn yuu, raaw sak khruu gaawn gin`,
  exampleChinese: `${item.chinese}还热着，等一会儿再吃。`,
  tag: "状态",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...lessSweetRows,
  ...lessSpicyRows,
  ...noCilantroRows,
  ...takeawayRows,
  ...heatRows,
  ...cookingRows,
  ...stateRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "做饭外食请求", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段可把“ขอ + 菜名 + 要求”作为外食请求的核心句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于在家做饭、外食请求、少糖少辣、不要香菜、加热打包、分开结账、推荐菜和食物状态。"],
    tags,
    sourceRefs: COOKING_EATING_OUT_REQUESTS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_COOKING_EATING_OUT_REQUESTS_01 = rows.map(toCandidate);
