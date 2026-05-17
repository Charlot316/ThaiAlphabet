export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "卫生" | "洗澡刷牙" | "护肤" | "理发美容" | "洗手消毒" | "个人护理用品" | "身体清洁";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string; theme?: VocabularyExpansionTheme };

const HYGIENE_PERSONAL_CARE_REFS = ["thai-frequency", "thai-a2-hygiene-personal-care-candidate"];

const products: readonly Item[] = [
  { thai: "สบู่เหลว", roman: "sa-buu leeo", chinese: "液体皂/沐浴露", id: "sa-buu-leeo", theme: "洗澡刷牙" },
  { thai: "ยาสีฟัน", roman: "yaa sii fan", chinese: "牙膏", id: "yaa-sii-fan", theme: "洗澡刷牙" },
  { thai: "แปรงสีฟัน", roman: "bpraaeng sii fan", chinese: "牙刷", id: "bpraaeng-sii-fan", theme: "洗澡刷牙" },
  { thai: "แชมพู", roman: "chaaem-phuu", chinese: "洗发水", id: "chaaem-phuu", theme: "洗澡刷牙" },
  { thai: "ครีมนวดผม", roman: "khriim nuaat phom", chinese: "护发素", id: "khriim-nuaat-phom", theme: "个人护理用品" },
  { thai: "ผ้าเช็ดตัว", roman: "phaa chet dtua", chinese: "浴巾", id: "phaa-chet-dtua", theme: "身体清洁" },
  { thai: "ครีมทาผิว", roman: "khriim thaa phiu", chinese: "身体乳/护肤霜", id: "khriim-thaa-phiu", theme: "护肤" },
  { thai: "ครีมกันแดด", roman: "khriim gan daaet", chinese: "防晒霜", id: "khriim-gan-daaet", theme: "护肤" },
  { thai: "เจลล้างมือ", roman: "jeen laang meuu", chinese: "洗手凝胶", id: "jeen-laang-meuu", theme: "洗手消毒" },
  { thai: "น้ำยาบ้วนปาก", roman: "naam-yaa buaan bpaak", chinese: "漱口水", id: "naam-yaa-buaan-bpaak", theme: "洗澡刷牙" },
  { thai: "สำลี", roman: "sam-lii", chinese: "棉片/棉花", id: "sam-lii", theme: "个人护理用品" },
  { thai: "ที่ตัดเล็บ", roman: "thii dtat lep", chinese: "指甲刀", id: "thii-dtat-lep", theme: "个人护理用品" },
  { thai: "มีดโกนหนวด", roman: "miit goon nuaat", chinese: "剃须刀", id: "miit-goon-nuaat", theme: "个人护理用品" },
  { thai: "หวี", roman: "wii", chinese: "梳子", id: "wii", theme: "个人护理用品" },
  { thai: "ผ้าเช็ดหน้า", roman: "phaa chet naa", chinese: "手帕/洗脸巾", id: "phaa-chet-naa", theme: "身体清洁" },
  { thai: "หน้ากากอนามัย", roman: "naa-gaak a-naa-mai", chinese: "卫生口罩", id: "naa-gaak-a-naa-mai", theme: "卫生" },
];

const bodyParts: readonly Item[] = [
  { thai: "มือ", roman: "meuu", chinese: "手", id: "meuu", theme: "洗手消毒" },
  { thai: "หน้า", roman: "naa", chinese: "脸", id: "naa", theme: "身体清洁" },
  { thai: "ผม", roman: "phom", chinese: "头发", id: "phom", theme: "洗澡刷牙" },
  { thai: "ฟัน", roman: "fan", chinese: "牙齿", id: "fan", theme: "洗澡刷牙" },
  { thai: "เท้า", roman: "thaao", chinese: "脚", id: "thaao", theme: "身体清洁" },
  { thai: "เล็บ", roman: "lep", chinese: "指甲", id: "lep", theme: "身体清洁" },
  { thai: "ตัว", roman: "dtua", chinese: "身体", id: "dtua", theme: "身体清洁" },
  { thai: "ปาก", roman: "bpaak", chinese: "嘴", id: "bpaak", theme: "洗澡刷牙" },
  { thai: "แขน", roman: "khaaen", chinese: "手臂", id: "khaaen", theme: "身体清洁" },
  { thai: "ขา", roman: "khaa", chinese: "腿", id: "khaa", theme: "身体清洁" },
  { thai: "คอ", roman: "khaaw", chinese: "脖子", id: "khaaw", theme: "身体清洁" },
  { thai: "หลัง", roman: "lang", chinese: "背", id: "lang", theme: "身体清洁" },
  { thai: "หู", roman: "huu", chinese: "耳朵", id: "huu", theme: "身体清洁" },
  { thai: "จมูก", roman: "ja-muuk", chinese: "鼻子", id: "ja-muuk", theme: "卫生" },
  { thai: "ผิว", roman: "phiu", chinese: "皮肤", id: "phiu", theme: "护肤" },
  { thai: "ศีรษะ", roman: "sii-sa", chinese: "头部", id: "sii-sa", theme: "身体清洁" },
];

const careActions: readonly Item[] = [
  { thai: "ล้างมือก่อนกินข้าว", roman: "laang meuu gaawn gin khaao", chinese: "饭前洗手", id: "laang-meuu-gaawn-gin-khaao", theme: "洗手消毒" },
  { thai: "แปรงฟันหลังอาหาร", roman: "bpraaeng fan lang aa-haan", chinese: "饭后刷牙", id: "bpraaeng-fan-lang-aa-haan", theme: "洗澡刷牙" },
  { thai: "อาบน้ำตอนเย็น", roman: "aap naam dtaawn yen", chinese: "傍晚洗澡", id: "aap-naam-dtaawn-yen", theme: "洗澡刷牙" },
  { thai: "สระผมวันเว้นวัน", roman: "sa phom wan wen wan", chinese: "隔一天洗一次头", id: "sa-phom-wan-wen-wan", theme: "洗澡刷牙" },
  { thai: "ตัดเล็บให้สั้น", roman: "dtat lep hai san", chinese: "把指甲剪短", id: "dtat-lep-hai-san", theme: "身体清洁" },
  { thai: "เช็ดตัวให้แห้ง", roman: "chet dtua hai haaeng", chinese: "把身体擦干", id: "chet-dtua-hai-haaeng", theme: "身体清洁" },
  { thai: "ล้างหน้าเบาๆ", roman: "laang naa bao bao", chinese: "轻轻洗脸", id: "laang-naa-bao-bao", theme: "身体清洁" },
  { thai: "ทาครีมกันแดด", roman: "thaa khriim gan daaet", chinese: "涂防晒霜", id: "thaa-khriim-gan-daaet", theme: "护肤" },
  { thai: "ทาครีมบำรุง", roman: "thaa khriim bam-rung", chinese: "涂保养霜", id: "thaa-khriim-bam-rung", theme: "护肤" },
  { thai: "ใช้สบู่เหลว", roman: "chai sa-buu leeo", chinese: "用液体皂/沐浴露", id: "chai-sa-buu-leeo", theme: "洗澡刷牙" },
  { thai: "ใช้ยาสีฟันนิดเดียว", roman: "chai yaa sii fan nit diaao", chinese: "只用一点牙膏", id: "chai-yaa-sii-fan-nit-diaao", theme: "洗澡刷牙" },
  { thai: "ใช้ผ้าเช็ดตัวสะอาด", roman: "chai phaa chet dtua sa-aat", chinese: "使用干净浴巾", id: "chai-phaa-chet-dtua-sa-aat", theme: "身体清洁" },
  { thai: "เปลี่ยนเสื้อผ้าทุกวัน", roman: "bpliian seua-phaa thuk wan", chinese: "每天换衣服", id: "bpliian-seua-phaa-thuk-wan", theme: "卫生" },
  { thai: "ล้างเท้าก่อนเข้าบ้าน", roman: "laang thaao gaawn khao baan", chinese: "进屋前洗脚", id: "laang-thaao-gaawn-khao-baan", theme: "身体清洁" },
  { thai: "บ้วนปากหลังแปรงฟัน", roman: "buaan bpaak lang bpraaeng fan", chinese: "刷牙后漱口", id: "buaan-bpaak-lang-bpraaeng-fan", theme: "洗澡刷牙" },
  { thai: "ฉีดสเปรย์ฆ่าเชื้อ", roman: "chiit sa-bpree khaa cheuua", chinese: "喷消毒喷雾", id: "chiit-sa-bpree-khaa-cheuua", theme: "洗手消毒" },
];

const salonActions: readonly Item[] = [
  { thai: "ตัดผมสั้นลง", roman: "dtat phom san long", chinese: "把头发剪短一点", id: "dtat-phom-san-long" },
  { thai: "สระผมที่ร้าน", roman: "sa phom thii raan", chinese: "在店里洗头", id: "sa-phom-thii-raan" },
  { thai: "ไดร์ผมให้แห้ง", roman: "drai phom hai haaeng", chinese: "把头发吹干", id: "drai-phom-hai-haaeng" },
  { thai: "เล็มผมข้างหน้า", roman: "lem phom khaang naa", chinese: "修一下前面的头发", id: "lem-phom-khaang-naa" },
  { thai: "กันคิ้วเบาๆ", roman: "gan khiu bao bao", chinese: "轻轻修眉", id: "gan-khiu-bao-bao" },
  { thai: "ล้างหน้าในร้าน", roman: "laang naa nai raan", chinese: "在店里洗脸", id: "laang-naa-nai-raan" },
  { thai: "โกนหนวดให้เรียบร้อย", roman: "goon nuaat hai riiap-raawy", chinese: "把胡子刮整齐", id: "goon-nuaat-hai-riiap-raawy" },
  { thai: "ตัดเล็บที่ร้าน", roman: "dtat lep thii raan", chinese: "在店里剪指甲", id: "dtat-lep-thii-raan" },
  { thai: "ทำผมง่ายๆ", roman: "tham phom ngaai ngaai", chinese: "简单做头发", id: "tham-phom-ngaai-ngaai" },
  { thai: "นัดช่างตัดผม", roman: "nat chang dtat phom", chinese: "预约理发师", id: "nat-chang-dtat-phom" },
  { thai: "เปลี่ยนทรงผมนิดหน่อย", roman: "bpliian song phom nit naawy", chinese: "稍微换一下发型", id: "bpliian-song-phom-nit-naawy" },
  { thai: "ถามราคาก่อนทำ", roman: "thaam raa-khaa gaawn tham", chinese: "做之前先问价格", id: "thaam-raa-khaa-gaawn-tham" },
];

const directRows: readonly Definition[] = [
  { thai: "รักษาความสะอาดทุกวัน", id: "rak-saa-khwaam-sa-aat-thuk-wan", roman: "rak-saa khwaam sa-aat thuk wan", chinese: "每天保持清洁", partOfSpeech: "短语", theme: "卫生", exampleThai: "เด็กๆ ควรรักษาความสะอาดทุกวัน", exampleRoman: "dek dek khuuan rak-saa khwaam sa-aat thuk wan", exampleChinese: "孩子们应该每天保持清洁。", tag: "卫生" },
  { thai: "มือสกปรกต้องล้าง", id: "meuu-sohk-ga-bprok-dtawng-laang", roman: "meuu sohk-ga-bprok dtawng laang", chinese: "手脏了要洗", partOfSpeech: "短语", theme: "洗手消毒", exampleThai: "มือสกปรกต้องล้างก่อนจับอาหาร", exampleRoman: "meuu sohk-ga-bprok dtawng laang gaawn jap aa-haan", exampleChinese: "手脏了要先洗再碰食物。", tag: "洗手" },
  { thai: "อาบน้ำให้สบายตัว", id: "aap-naam-hai-sa-baai-dtua", roman: "aap naam hai sa-baai dtua", chinese: "洗个澡让身体舒服", partOfSpeech: "短语", theme: "洗澡刷牙", exampleThai: "กลับจากข้างนอกแล้ว อาบน้ำให้สบายตัว", exampleRoman: "glap jaak khaang naawk laaeo, aap naam hai sa-baai dtua", exampleChinese: "从外面回来后，洗个澡让身体舒服。", tag: "洗澡" },
  { thai: "ผิวแห้งต้องทาครีม", id: "phiu-haaeng-dtawng-thaa-khriim", roman: "phiu haaeng dtawng thaa khriim", chinese: "皮肤干要涂霜", partOfSpeech: "短语", theme: "护肤", exampleThai: "หน้าหนาวผิวแห้งต้องทาครีมทุกวัน", exampleRoman: "naa naao phiu haaeng dtawng thaa khriim thuk wan", exampleChinese: "冷季皮肤干，要每天涂霜。", tag: "护肤" },
  { thai: "อย่าใช้ผ้าเช็ดตัวร่วมกัน", id: "yaa-chai-phaa-chet-dtua-ruam-gan", roman: "yaa chai phaa chet dtua ruam gan", chinese: "不要共用浴巾", partOfSpeech: "短语", theme: "卫生", exampleThai: "เพื่อความสะอาด อย่าใช้ผ้าเช็ดตัวร่วมกัน", exampleRoman: "pheuua khwaam sa-aat, yaa chai phaa chet dtua ruam gan", exampleChinese: "为了卫生，不要共用浴巾。", tag: "卫生" },
  { thai: "ตัดผมให้ดูเรียบร้อย", id: "dtat-phom-hai-duu-riiap-raawy", roman: "dtat phom hai duu riiap-raawy", chinese: "把头发剪得整齐些", partOfSpeech: "短语", theme: "理发美容", exampleThai: "พรุ่งนี้มีงาน ฉันอยากตัดผมให้ดูเรียบร้อย", exampleRoman: "phrung-nii mii ngaan, chan yaak dtat phom hai duu riiap-raawy", exampleChinese: "明天有事，我想把头发剪得整齐些。", tag: "理发" },
  { thai: "พกเจลล้างมือไว้", id: "phok-jeen-laang-meuu-wai", roman: "phok jeen laang meuu wai", chinese: "随身带洗手凝胶", partOfSpeech: "短语", theme: "洗手消毒", exampleThai: "เวลาออกไปข้างนอก ฉันพกเจลล้างมือไว้", exampleRoman: "wee-laa aawk bpai khaang naawk, chan phok jeen laang meuu wai", exampleChinese: "出门的时候，我随身带洗手凝胶。", tag: "消毒" },
  { thai: "ใช้ของส่วนตัวของตัวเอง", id: "chai-khaawng-suan-dtua-khaawng-dtua-eeng", roman: "chai khaawng suan dtua khaawng dtua eeng", chinese: "使用自己的个人用品", partOfSpeech: "短语", theme: "个人护理用品", exampleThai: "ที่บ้านเราใช้ของส่วนตัวของตัวเอง", exampleRoman: "thii baan rao chai khaawng suan dtua khaawng dtua eeng", exampleChinese: "在家里我们使用自己的个人用品。", tag: "个人用品" },
];

const actionRows = careActions.map((action): Definition => ({
  thai: `อย่าลืม${action.thai}`,
  id: `yaa-leum-${action.id}`,
  roman: `yaa leum ${action.roman}`,
  chinese: `别忘了${action.chinese}`,
  partOfSpeech: "短语",
  theme: action.theme ?? "卫生",
  exampleThai: `แม่บอกว่าอย่าลืม${action.thai}`,
  exampleRoman: `maae baawk waa yaa leum ${action.roman}`,
  exampleChinese: `妈妈说别忘了${action.chinese}。`,
  tag: "提醒",
}));

const buyRows = products.map((product): Definition => ({
  thai: `ต้องซื้อ${product.thai}ใหม่`,
  id: `dtawng-seu-${product.id}-mai`,
  roman: `dtawng seu ${product.roman} mai`,
  chinese: `要买新的${product.chinese}`,
  partOfSpeech: "短语",
  theme: product.theme ?? "个人护理用品",
  exampleThai: `${product.thai}ใกล้หมดแล้ว ต้องซื้อ${product.thai}ใหม่`,
  exampleRoman: `${product.roman} glai mot laaeo, dtawng seu ${product.roman} mai`,
  exampleChinese: `${product.chinese}快用完了，要买新的。`,
  tag: "购买",
}));

const runOutRows = products.map((product): Definition => ({
  thai: `${product.thai}ใกล้หมดแล้ว`,
  id: `${product.id}-glai-mot-laaeo`,
  roman: `${product.roman} glai mot laaeo`,
  chinese: `${product.chinese}快用完了`,
  partOfSpeech: "短语",
  theme: product.theme ?? "个人护理用品",
  exampleThai: `เช้านี้ฉันเห็นว่า${product.thai}ใกล้หมดแล้ว`,
  exampleRoman: `chaao nii chan hen waa ${product.roman} glai mot laaeo`,
  exampleChinese: `今天早上我看到${product.chinese}快用完了。`,
  tag: "用品",
}));

const cleanRows = bodyParts.map((part): Definition => ({
  thai: `ทำความสะอาด${part.thai}ให้ดี`,
  id: `tham-khwaam-sa-aat-${part.id}-hai-dii`,
  roman: `tham khwaam sa-aat ${part.roman} hai dii`,
  chinese: `好好清洁${part.chinese}`,
  partOfSpeech: "短语",
  theme: part.theme ?? "身体清洁",
  exampleThai: `หลังกลับจากข้างนอก ควรทำความสะอาด${part.thai}ให้ดี`,
  exampleRoman: `lang glap jaak khaang naawk, khuuan tham khwaam sa-aat ${part.roman} hai dii`,
  exampleChinese: `从外面回来后，应该好好清洁${part.chinese}。`,
  tag: "清洁",
}));

const careRows = bodyParts.map((part): Definition => ({
  thai: `ดูแล${part.thai}ให้สะอาด`,
  id: `duu-laae-${part.id}-hai-sa-aat`,
  roman: `duu-laae ${part.roman} hai sa-aat`,
  chinese: `把${part.chinese}护理得干净`,
  partOfSpeech: "短语",
  theme: part.theme ?? "身体清洁",
  exampleThai: `ถ้าอยากรู้สึกดี ต้องดูแล${part.thai}ให้สะอาด`,
  exampleRoman: `thaa yaak ruu-seuk dii, dtawng duu-laae ${part.roman} hai sa-aat`,
  exampleChinese: `如果想感觉舒服，就要把${part.chinese}护理得干净。`,
  tag: "护理",
}));

const salonRows = salonActions.map((action): Definition => ({
  thai: `อยาก${action.thai}`,
  id: `yaak-${action.id}`,
  roman: `yaak ${action.roman}`,
  chinese: `想${action.chinese}`,
  partOfSpeech: "短语",
  theme: "理发美容",
  exampleThai: `วันนี้ฉันว่างและอยาก${action.thai}`,
  exampleRoman: `wan-nii chan waang lae yaak ${action.roman}`,
  exampleChinese: `今天我有空，想${action.chinese}。`,
  tag: "理发美容",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...actionRows,
  ...buyRows,
  ...runOutRows,
  ...cleanRows,
  ...careRows,
  ...salonRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "卫生个人护理", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 个人护理场景常用“ล้าง、อาบน้ำ、แปรงฟัน、ทาครีม、ทำความสะอาด、อย่าลืม”等表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于卫生、洗澡刷牙、护肤、理发美容、洗手消毒、个人护理用品和身体清洁。"],
    tags,
    sourceRefs: HYGIENE_PERSONAL_CARE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_HYGIENE_PERSONAL_CARE_01 = rows.map(toCandidate);
