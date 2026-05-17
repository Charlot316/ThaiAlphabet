export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "安静热闹" | "拥挤空旷" | "干净凌乱" | "明亮昏暗" | "方便不便" | "安全危险" | "舒服状态";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Place = { thai: string; roman: string; chinese: string; id: string };

const SIMPLE_DESCRIPTIONS_SCENES_REFS = ["thai-frequency", "thai-a2-simple-descriptions-scenes-candidate"];

const places: readonly Place[] = [
  { thai: "ห้องนี้", roman: "haawng nii", chinese: "这个房间", id: "haawng-nii" },
  { thai: "ร้านนี้", roman: "raan nii", chinese: "这家店", id: "raan-nii" },
  { thai: "ถนนเส้นนี้", roman: "tha-non sen nii", chinese: "这条路", id: "tha-non-sen-nii" },
  { thai: "ตลาดตอนเช้า", roman: "dta-laat dtaawn chaao", chinese: "早上的市场", id: "dta-laat-dtaawn-chaao" },
  { thai: "สถานีรถไฟ", roman: "sa-thaa-nii rot-fai", chinese: "火车站", id: "sa-thaa-nii-rot-fai" },
  { thai: "ห้องครัวบ้านเรา", roman: "haawng khrua baan rao", chinese: "我们家的厨房", id: "haawng-khrua-baan-rao" },
  { thai: "สวนใกล้บ้าน", roman: "suaan glai baan", chinese: "家附近的公园", id: "suaan-glai-baan" },
  { thai: "ร้านกาแฟมุมถนน", roman: "raan gaa-faae mum tha-non", chinese: "街角咖啡店", id: "raan-gaa-faae-mum-tha-non" },
  { thai: "ห้องน้ำชั้นล่าง", roman: "haawng naam chan laang", chinese: "楼下洗手间", id: "haawng-naam-chan-laang" },
  { thai: "ลิฟต์ตอนเช้า", roman: "lip dtaawn chaao", chinese: "早上的电梯", id: "lip-dtaawn-chaao" },
  { thai: "ป้ายรถเมล์หน้าโรงเรียน", roman: "bpaai rot-mee naa roong-riian", chinese: "学校门口公交站", id: "bpaai-rot-mee-naa-roong-riian" },
  { thai: "ซอยหลังบ้าน", roman: "saawy lang baan", chinese: "家后面的小巷", id: "saawy-lang-baan" },
  { thai: "โต๊ะทำงานของฉัน", roman: "dto tham-ngaan khaawng chan", chinese: "我的书桌/办公桌", id: "dto-tham-ngaan-khaawng-chan" },
  { thai: "ห้องเรียนตอนบ่าย", roman: "haawng-riian dtaawn baai", chinese: "下午的教室", id: "haawng-riian-dtaawn-baai" },
  { thai: "ห้างใกล้บ้าน", roman: "haang glai baan", chinese: "家附近的商场", id: "haang-glai-baan" },
  { thai: "ทางเดินในตึก", roman: "thaang-doeen nai dteuk", chinese: "楼里的走廊", id: "thaang-doeen-nai-dteuk" },
];

const directRows: readonly Definition[] = [
  { thai: "บรรยากาศเงียบดี", id: "ban-yaa-gaat-ngiiap-dii", roman: "ban-yaa-gaat ngiiap dii", chinese: "气氛很安静", partOfSpeech: "短语", theme: "安静热闹", exampleThai: "ร้านนี้บรรยากาศเงียบดี เหมาะกับการอ่านหนังสือ", exampleRoman: "raan nii ban-yaa-gaat ngiiap dii, maw gap gaan aan nang-seuu", exampleChinese: "这家店气氛很安静，适合看书。", tag: "安静" },
  { thai: "คนเยอะจนเดินยาก", id: "khon-yoe-jon-doeen-yaak", roman: "khon yoe jon doeen yaak", chinese: "人多到很难走", partOfSpeech: "短语", theme: "拥挤空旷", exampleThai: "วันนี้ตลาดคนเยอะจนเดินยาก", exampleRoman: "wan-nii dta-laat khon yoe jon doeen yaak", exampleChinese: "今天市场人多到很难走。", tag: "拥挤" },
  { thai: "สะอาดแต่ไม่กว้าง", id: "sa-aat-dtaae-mai-gwaang", roman: "sa-aat dtaae mai gwaang", chinese: "干净但不宽敞", partOfSpeech: "短语", theme: "干净凌乱", exampleThai: "ห้องพักสะอาดแต่ไม่กว้าง อยู่คนเดียวพอดี", exampleRoman: "haawng phak sa-aat dtaae mai gwaang, yuu khon diaao phaaw dii", exampleChinese: "房间干净但不宽敞，一个人住正好。", tag: "干净" },
  { thai: "แสงในห้องพอดี", id: "saaeng-nai-haawng-phaaw-dii", roman: "saaeng nai haawng phaaw dii", chinese: "房间里的光线正好", partOfSpeech: "短语", theme: "明亮昏暗", exampleThai: "แสงในห้องพอดี ไม่สว่างเกินไป", exampleRoman: "saaeng nai haawng phaaw dii, mai sa-waang goen bpai", exampleChinese: "房间里的光线正好，不会太亮。", tag: "光线" },
  { thai: "เดินทางสะดวกมาก", id: "doeen-thaang-sa-duuak-maak", roman: "doeen-thaang sa-duuak maak", chinese: "交通很方便", partOfSpeech: "短语", theme: "方便不便", exampleThai: "บ้านใหม่เดินทางสะดวกมาก ใกล้รถไฟฟ้า", exampleRoman: "baan mai doeen-thaang sa-duuak maak, glai rot-fai-faa", exampleChinese: "新家交通很方便，离轻轨近。", tag: "方便" },
  { thai: "ดูไม่ค่อยปลอดภัย", id: "duu-mai-khaawy-bplaawt-phai", roman: "duu mai khaawy bplaawt-phai", chinese: "看起来不太安全", partOfSpeech: "短语", theme: "安全危险", exampleThai: "ซอยนี้มืดมาก ดูไม่ค่อยปลอดภัย", exampleRoman: "saawy nii meuut maak, duu mai khaawy bplaawt-phai", exampleChinese: "这条巷子很暗，看起来不太安全。", tag: "安全" },
  { thai: "นั่งแล้วสบายมาก", id: "nang-laaeo-sa-baai-maak", roman: "nang laaeo sa-baai maak", chinese: "坐起来很舒服", partOfSpeech: "短语", theme: "舒服状态", exampleThai: "เก้าอี้ตัวนี้นั่งแล้วสบายมาก", exampleRoman: "gao-ii dtua nii nang laaeo sa-baai maak", exampleChinese: "这把椅子坐起来很舒服。", tag: "舒服" },
  { thai: "ของวางรกไปหมด", id: "khaawng-waang-rok-bpai-mot", roman: "khaawng waang rok bpai mot", chinese: "东西放得到处乱", partOfSpeech: "短语", theme: "干净凌乱", exampleThai: "โต๊ะทำงานของฉันของวางรกไปหมด", exampleRoman: "dto tham-ngaan khaawng chan khaawng waang rok bpai mot", exampleChinese: "我的办公桌东西放得到处乱。", tag: "凌乱" },
];

const quietRows = places.map((place): Definition => ({
  thai: `${place.thai}ค่อนข้างเงียบ`,
  id: `${place.id}-khaawn-khaang-ngiiap`,
  roman: `${place.roman} khaawn-khaang ngiiap`,
  chinese: `${place.chinese}比较安静`,
  partOfSpeech: "短语",
  theme: "安静热闹",
  exampleThai: `ตอนเช้า${place.thai}ค่อนข้างเงียบ ฉันชอบไปเวลาแบบนี้`,
  exampleRoman: `dtaawn chaao ${place.roman} khaawn-khaang ngiiap, chan chaawp bpai wee-laa baaep nii`,
  exampleChinese: `早上${place.chinese}比较安静，我喜欢这个时间去。`,
  tag: "安静",
}));

const livelyRows = places.map((place): Definition => ({
  thai: `${place.thai}ดูคึกคัก`,
  id: `${place.id}-duu-kheuk-khak`,
  roman: `${place.roman} duu kheuk-khak`,
  chinese: `${place.chinese}看起来很热闹`,
  partOfSpeech: "短语",
  theme: "安静热闹",
  exampleThai: `ตอนเย็น${place.thai}ดูคึกคัก มีคนเดินเยอะ`,
  exampleRoman: `dtaawn yen ${place.roman} duu kheuk-khak, mii khon doeen yoe`,
  exampleChinese: `傍晚${place.chinese}看起来很热闹，有很多人走动。`,
  tag: "热闹",
}));

const crowdedRows = places.map((place): Definition => ({
  thai: `${place.thai}แออัดนิดหน่อย`,
  id: `${place.id}-aae-at-nit-naawy`,
  roman: `${place.roman} aae-at nit naawy`,
  chinese: `${place.chinese}有点拥挤`,
  partOfSpeech: "短语",
  theme: "拥挤空旷",
  exampleThai: `วันนี้${place.thai}แออัดนิดหน่อย เพราะคนมาเยอะ`,
  exampleRoman: `wan-nii ${place.roman} aae-at nit naawy, phraw khon maa yoe`,
  exampleChinese: `今天${place.chinese}有点拥挤，因为来的人很多。`,
  tag: "拥挤",
}));

const cleanRows = places.map((place): Definition => ({
  thai: `${place.thai}สะอาดเรียบร้อย`,
  id: `${place.id}-sa-aat-riiap-raawy`,
  roman: `${place.roman} sa-aat riiap-raawy`,
  chinese: `${place.chinese}干净整齐`,
  partOfSpeech: "短语",
  theme: "干净凌乱",
  exampleThai: `ฉันชอบ${place.thai} เพราะสะอาดเรียบร้อย`,
  exampleRoman: `chan chaawp ${place.roman}, phraw sa-aat riiap-raawy`,
  exampleChinese: `我喜欢${place.chinese}，因为干净整齐。`,
  tag: "干净",
}));

const brightRows = places.map((place): Definition => ({
  thai: `${place.thai}สว่างพอดี`,
  id: `${place.id}-sa-waang-phaaw-dii`,
  roman: `${place.roman} sa-waang phaaw dii`,
  chinese: `${place.chinese}亮度正好`,
  partOfSpeech: "短语",
  theme: "明亮昏暗",
  exampleThai: `${place.thai}สว่างพอดี อ่านหนังสือได้สบาย`,
  exampleRoman: `${place.roman} sa-waang phaaw dii, aan nang-seuu dai sa-baai`,
  exampleChinese: `${place.chinese}亮度正好，可以舒服地看书。`,
  tag: "明亮",
}));

const convenientRows = places.map((place): Definition => ({
  thai: `${place.thai}สะดวกสำหรับฉัน`,
  id: `${place.id}-sa-duuak-sam-rap-chan`,
  roman: `${place.roman} sa-duuak sam-rap chan`,
  chinese: `${place.chinese}对我来说很方便`,
  partOfSpeech: "短语",
  theme: "方便不便",
  exampleThai: `${place.thai}สะดวกสำหรับฉัน เพราะอยู่ไม่ไกล`,
  exampleRoman: `${place.roman} sa-duuak sam-rap chan, phraw yuu mai glai`,
  exampleChinese: `${place.chinese}对我来说很方便，因为不远。`,
  tag: "方便",
}));

const safeRows = places.map((place): Definition => ({
  thai: `${place.thai}ดูปลอดภัย`,
  id: `${place.id}-duu-bplaawt-phai`,
  roman: `${place.roman} duu bplaawt-phai`,
  chinese: `${place.chinese}看起来安全`,
  partOfSpeech: "短语",
  theme: "安全危险",
  exampleThai: `ตอนกลางคืน${place.thai}ดูปลอดภัย เพราะมีไฟและมีคน`,
  exampleRoman: `dtaawn glaang-kheuun ${place.roman} duu bplaawt-phai, phraw mii fai lae mii khon`,
  exampleChinese: `晚上${place.chinese}看起来安全，因为有灯也有人。`,
  tag: "安全",
}));

const comfortableRows = places.map((place): Definition => ({
  thai: `${place.thai}อยู่แล้วสบาย`,
  id: `${place.id}-yuu-laaeo-sa-baai`,
  roman: `${place.roman} yuu laaeo sa-baai`,
  chinese: `待在${place.chinese}很舒服`,
  partOfSpeech: "短语",
  theme: "舒服状态",
  exampleThai: `${place.thai}อยู่แล้วสบาย ฉันอยากอยู่นานหน่อย`,
  exampleRoman: `${place.roman} yuu laaeo sa-baai, chan yaak yuu naan naawy`,
  exampleChinese: `待在${place.chinese}很舒服，我想多待一会儿。`,
  tag: "舒服",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...quietRows,
  ...livelyRows,
  ...crowdedRows,
  ...cleanRows,
  ...brightRows,
  ...convenientRows,
  ...safeRows,
  ...comfortableRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "场景描述", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 场景描述常用“ค่อนข้าง、ดู、นิดหน่อย、สะอาด、สว่าง、สะดวก、ปลอดภัย、สบาย”等词说明环境状态。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于描述日常地点和状态，如安静、热闹、拥挤、干净、明亮、方便、安全、危险和舒服。"],
    tags,
    sourceRefs: SIMPLE_DESCRIPTIONS_SCENES_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_DESCRIPTIONS_SCENES_01 = rows.map(toCandidate);
