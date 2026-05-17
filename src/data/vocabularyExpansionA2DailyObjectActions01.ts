export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "拿放递" | "借还" | "丢捡" | "装拆" | "修换" | "清理保存";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const DAILY_OBJECT_ACTIONS_REFS = ["thai-frequency", "thai-a2-daily-object-actions-candidate"];

const objects: readonly Item[] = [
  { thai: "กุญแจบ้าน", roman: "gun-jaae baan", chinese: "家门钥匙", id: "gun-jaae-baan" },
  { thai: "แก้วน้ำใบนี้", roman: "gaaeo naam bai nii", chinese: "这个水杯", id: "gaaeo-naam-bai-nii" },
  { thai: "ถุงผ้า", roman: "thung phaa", chinese: "布袋", id: "thung-phaa" },
  { thai: "กล่องข้าว", roman: "glaawng khaao", chinese: "饭盒", id: "glaawng-khaao" },
  { thai: "หนังสือเรียน", roman: "nang-seuu riian", chinese: "课本", id: "nang-seuu-riian" },
  { thai: "สายชาร์จ", roman: "saai chaat", chinese: "充电线", id: "saai-chaat" },
  { thai: "ร่มคันเล็ก", roman: "rom khan lek", chinese: "小雨伞", id: "rom-khan-lek" },
  { thai: "รองเท้าคู่เก่า", roman: "raawng-thaao khuu gao", chinese: "旧鞋", id: "raawng-thaao-khuu-gao" },
  { thai: "เสื้อกันหนาว", roman: "seua gan naao", chinese: "外套", id: "seua-gan-naao" },
  { thai: "เอกสารสำคัญ", roman: "eek-ga-saan sam-khan", chinese: "重要文件", id: "eek-ga-saan-sam-khan" },
  { thai: "กล่องพัสดุ", roman: "glaawng phat-sa-du", chinese: "包裹盒", id: "glaawng-phat-sa-du" },
  { thai: "ขวดน้ำเปล่า", roman: "khuat naam bplaao", chinese: "空水瓶", id: "khuat-naam-bplaao" },
  { thai: "รีโมตทีวี", roman: "rii-moot thii-wii", chinese: "电视遥控器", id: "rii-moot-thii-wii" },
  { thai: "ของเล่นเด็ก", roman: "khaawng-len dek", chinese: "儿童玩具", id: "khaawng-len-dek" },
  { thai: "กระเป๋าใบเล็ก", roman: "gra-bpao bai lek", chinese: "小包", id: "gra-bpao-bai-lek" },
  { thai: "แฟ้มเอกสาร", roman: "faaem eek-ga-saan", chinese: "文件夹", id: "faaem-eek-ga-saan" },
];

const fixItems: readonly Item[] = [
  { thai: "หลอดไฟห้องน้ำ", roman: "laawt fai haawng naam", chinese: "浴室灯泡", id: "laawt-fai-haawng-naam" },
  { thai: "สายชาร์จเก่า", roman: "saai chaat gao", chinese: "旧充电线", id: "saai-chaat-gao" },
  { thai: "ล้อกระเป๋า", roman: "laaw gra-bpao", chinese: "行李箱轮子", id: "laaw-gra-bpao" },
  { thai: "ปุ่มรีโมต", roman: "bpum rii-moot", chinese: "遥控器按钮", id: "bpum-rii-moot" },
  { thai: "ซิปกระเป๋า", roman: "sip gra-bpao", chinese: "包的拉链", id: "sip-gra-bpao" },
  { thai: "ฝาขวดน้ำ", roman: "faa khuat naam", chinese: "水瓶盖", id: "faa-khuat-naam" },
  { thai: "ขาเก้าอี้", roman: "khaa gao-ii", chinese: "椅子腿", id: "khaa-gao-ii" },
  { thai: "ที่จับประตู", roman: "thii jap bpra-dtuu", chinese: "门把手", id: "thii-jap-bpra-dtuu" },
  { thai: "หน้าจอมือถือ", roman: "naa-jaaw meuu-theuu", chinese: "手机屏幕", id: "naa-jaaw-meu-theuu" },
  { thai: "กล่องใส่อาหาร", roman: "glaawng sai aa-haan", chinese: "食物盒", id: "glaawng-sai-aa-haan" },
  { thai: "ฝาหม้อ", roman: "faa maaw", chinese: "锅盖", id: "faa-maaw" },
  { thai: "ปลั๊กไฟ", roman: "bplak fai", chinese: "电源插头", id: "bplak-fai" },
];

const directRows: readonly Definition[] = [
  { thai: "ส่งของมาให้หน่อย", id: "song-khaawng-maa-hai-naawy", roman: "song khaawng maa hai naawy", chinese: "请把东西递过来", partOfSpeech: "短语", theme: "拿放递", exampleThai: "ของอยู่ใกล้คุณ ช่วยส่งของมาให้หน่อย", exampleRoman: "khaawng yuu glai khun, chuai song khaawng maa hai naawy", exampleChinese: "东西在你旁边，请把东西递过来。", tag: "递" },
  { thai: "วางไว้ข้างประตู", id: "waang-wai-khaang-bpra-dtuu", roman: "waang wai khaang bpra-dtuu", chinese: "放在门旁边", partOfSpeech: "短语", theme: "拿放递", exampleThai: "ถุงนี้หนัก วางไว้ข้างประตูก่อน", exampleRoman: "thung nii nak, waang wai khaang bpra-dtuu gaawn", exampleChinese: "这个袋子重，先放在门旁边。", tag: "放" },
  { thai: "ยืมใช้แป๊บเดียว", id: "yeum-chai-bpaep-diaao", roman: "yeum chai bpaep diaao", chinese: "借用一下下", partOfSpeech: "短语", theme: "借还", exampleThai: "ขอยืมใช้แป๊บเดียว แล้วจะคืนทันที", exampleRoman: "khaaw yeum chai bpaep diaao, laaeo ja kheuun than-thii", exampleChinese: "我借用一下下，然后马上还。", tag: "借" },
  { thai: "เก็บของที่ตกพื้น", id: "gep-khaawng-thii-dtok-pheuun", roman: "gep khaawng thii dtok pheuun", chinese: "捡起掉在地上的东西", partOfSpeech: "短语", theme: "丢捡", exampleThai: "เด็กช่วยเก็บของที่ตกพื้นให้แม่", exampleRoman: "dek chuai gep khaawng thii dtok pheuun hai maae", exampleChinese: "孩子帮妈妈捡起掉在地上的东西。", tag: "捡" },
  { thai: "ใส่ของลงกล่อง", id: "sai-khaawng-long-glaawng", roman: "sai khaawng long glaawng", chinese: "把东西装进盒子", partOfSpeech: "短语", theme: "装拆", exampleThai: "ก่อนส่งพัสดุ ต้องใส่ของลงกล่องให้ดี", exampleRoman: "gaawn song phat-sa-du, dtawng sai khaawng long glaawng hai dii", exampleChinese: "寄包裹前，要把东西好好装进盒子。", tag: "装" },
  { thai: "แกะกล่องอย่างระวัง", id: "gae-glaawng-yaang-ra-wang", roman: "gae glaawng yaang ra-wang", chinese: "小心拆盒子", partOfSpeech: "短语", theme: "装拆", exampleThai: "ของข้างในแตกง่าย ต้องแกะกล่องอย่างระวัง", exampleRoman: "khaawng khaang nai dtaaek ngaai, dtawng gae glaawng yaang ra-wang", exampleChinese: "里面的东西容易碎，要小心拆盒子。", tag: "拆" },
  { thai: "เปลี่ยนอันใหม่แทน", id: "bpliian-an-mai-thaaen", roman: "bpliian an mai thaaen", chinese: "换一个新的代替", partOfSpeech: "短语", theme: "修换", exampleThai: "ถ้าซ่อมไม่ได้ เราเปลี่ยนอันใหม่แทน", exampleRoman: "thaa saawm mai dai, rao bpliian an mai thaaen", exampleChinese: "如果修不了，我们换一个新的代替。", tag: "换" },
  { thai: "เช็ดให้สะอาดก่อนเก็บ", id: "chet-hai-sa-aat-gaawn-gep", roman: "chet hai sa-aat gaawn gep", chinese: "收起来前擦干净", partOfSpeech: "短语", theme: "清理保存", exampleThai: "หลังใช้เสร็จ เช็ดให้สะอาดก่อนเก็บ", exampleRoman: "lang chai set, chet hai sa-aat gaawn gep", exampleChinese: "用完后，收起来前擦干净。", tag: "清理" },
];

const takeRows = objects.map((item): Definition => ({
  thai: `หยิบ${item.thai}มา`,
  id: `yip-${item.id}-maa`,
  roman: `yip ${item.roman} maa`,
  chinese: `把${item.chinese}拿过来`,
  partOfSpeech: "短语",
  theme: "拿放递",
  exampleThai: `ถ้าคุณเห็น ช่วยหยิบ${item.thai}มาให้หน่อย`,
  exampleRoman: `thaa khun hen, chuai yip ${item.roman} maa hai naawy`,
  exampleChinese: `如果你看见，请帮我把${item.chinese}拿过来。`,
  tag: "拿",
}));

const lendRows = objects.map((item): Definition => ({
  thai: `ขอยืม${item.thai}ได้ไหม`,
  id: `khaaw-yeum-${item.id}-dai-mai`,
  roman: `khaaw yeum ${item.roman} dai mai`,
  chinese: `可以借${item.chinese}吗`,
  partOfSpeech: "短语",
  theme: "借还",
  exampleThai: `วันนี้ฉันลืมของ ขอยืม${item.thai}ได้ไหม`,
  exampleRoman: `wan-nii chan leum khaawng, khaaw yeum ${item.roman} dai mai`,
  exampleChinese: `今天我忘带东西了，可以借${item.chinese}吗？`,
  tag: "借",
}));

const returnRows = objects.map((item): Definition => ({
  thai: `คืน${item.thai}ให้เจ้าของ`,
  id: `kheuun-${item.id}-hai-jao-khaawng`,
  roman: `kheuun ${item.roman} hai jao-khaawng`,
  chinese: `把${item.chinese}还给主人`,
  partOfSpeech: "短语",
  theme: "借还",
  exampleThai: `ใช้เสร็จแล้ว ต้องคืน${item.thai}ให้เจ้าของ`,
  exampleRoman: `chai set laaeo, dtawng kheuun ${item.roman} hai jao-khaawng`,
  exampleChinese: `用完后，要把${item.chinese}还给主人。`,
  tag: "还",
}));

const lostRows = objects.map((item): Definition => ({
  thai: `ทำ${item.thai}หาย`,
  id: `tham-${item.id}-haai`,
  roman: `tham ${item.roman} haai`,
  chinese: `把${item.chinese}弄丢了`,
  partOfSpeech: "短语",
  theme: "丢捡",
  exampleThai: `เมื่อวานฉันทำ${item.thai}หาย ต้องหาใหม่`,
  exampleRoman: `meuua-waan chan tham ${item.roman} haai, dtawng haa mai`,
  exampleChinese: `昨天我把${item.chinese}弄丢了，得重新找。`,
  tag: "丢",
}));

const packRows = objects.map((item): Definition => ({
  thai: `ใส่${item.thai}ในกระเป๋า`,
  id: `sai-${item.id}-nai-gra-bpao`,
  roman: `sai ${item.roman} nai gra-bpao`,
  chinese: `把${item.chinese}装进包里`,
  partOfSpeech: "短语",
  theme: "装拆",
  exampleThai: `ก่อนออกไป อย่าลืมใส่${item.thai}ในกระเป๋า`,
  exampleRoman: `gaawn aawk bpai, yaa leum sai ${item.roman} nai gra-bpao`,
  exampleChinese: `出门前，别忘了把${item.chinese}装进包里。`,
  tag: "装",
}));

const cleanRows = objects.map((item): Definition => ({
  thai: `ทำความสะอาด${item.thai}`,
  id: `tham-khwaam-sa-aat-${item.id}`,
  roman: `tham khwaam sa-aat ${item.roman}`,
  chinese: `清理${item.chinese}`,
  partOfSpeech: "短语",
  theme: "清理保存",
  exampleThai: `หลังใช้เสร็จ ฉันทำความสะอาด${item.thai}`,
  exampleRoman: `lang chai set, chan tham khwaam sa-aat ${item.roman}`,
  exampleChinese: `用完后，我清理${item.chinese}。`,
  tag: "清理",
}));

const repairRows = fixItems.map((item): Definition => ({
  thai: `ซ่อม${item.thai}ได้ไหม`,
  id: `saawm-${item.id}-dai-mai`,
  roman: `saawm ${item.roman} dai mai`,
  chinese: `可以修${item.chinese}吗`,
  partOfSpeech: "短语",
  theme: "修换",
  exampleThai: `ขอโทษครับ ซ่อม${item.thai}ได้ไหม`,
  exampleRoman: `khaaw-thoot khrap, saawm ${item.roman} dai mai`,
  exampleChinese: `不好意思，可以修${item.chinese}吗？`,
  tag: "修",
}));

const replaceRows = fixItems.map((item): Definition => ({
  thai: `เปลี่ยน${item.thai}ใหม่`,
  id: `bpliian-${item.id}-mai`,
  roman: `bpliian ${item.roman} mai`,
  chinese: `更换新的${item.chinese}`,
  partOfSpeech: "短语",
  theme: "修换",
  exampleThai: `ถ้าเก่าแล้ว ควรเปลี่ยน${item.thai}ใหม่`,
  exampleRoman: `thaa gao laaeo, khuuan bpliian ${item.roman} mai`,
  exampleChinese: `如果旧了，应该更换新的${item.chinese}。`,
  tag: "换",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...takeRows,
  ...lendRows,
  ...returnRows,
  ...lostRows,
  ...packRows,
  ...cleanRows,
  ...repairRows,
  ...replaceRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "日常物品动作", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 日常物品动作常用“หยิบ、วาง、ส่ง、ยืม、คืน、ทำ...หาย、เก็บ、ใส่、แกะ、ซ่อม、เปลี่ยน、ทำความสะอาด”等动词搭配具体物品。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于拿、放、递、借、还、丢、捡、装、拆、修、换、清理和保存物品。"],
    tags,
    sourceRefs: DAILY_OBJECT_ACTIONS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_OBJECT_ACTIONS_01 = rows.map(toCandidate);
