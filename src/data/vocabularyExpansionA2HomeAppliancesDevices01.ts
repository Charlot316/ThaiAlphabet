export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "家电" | "遥控器" | "空调冰箱洗衣机" | "充电电池" | "开关设置" | "故障" | "使用说明";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string; theme?: VocabularyExpansionTheme };

const HOME_APPLIANCES_DEVICES_REFS = ["thai-frequency", "thai-a2-home-appliances-devices-candidate"];

const devices: readonly Item[] = [
  { thai: "พัดลมตั้งโต๊ะ", roman: "phat-lom dtang dto", chinese: "台式电风扇", id: "phat-lom-dtang-dto", theme: "家电" },
  { thai: "แอร์ห้องนอน", roman: "aae haawng naawn", chinese: "卧室空调", id: "aae-haawng-naawn", theme: "空调冰箱洗衣机" },
  { thai: "ตู้เย็นในครัว", roman: "dtuu-yen nai khrua", chinese: "厨房冰箱", id: "dtuu-yen-nai-khrua", theme: "空调冰箱洗衣机" },
  { thai: "เครื่องซักผ้าฝาหน้า", roman: "khreuuang sak phaa faa naa", chinese: "前开门洗衣机", id: "khreuuang-sak-phaa-faa-naa", theme: "空调冰箱洗衣机" },
  { thai: "ไมโครเวฟเล็ก", roman: "mai-khroo-weef lek", chinese: "小微波炉", id: "mai-khroo-weef-lek", theme: "家电" },
  { thai: "หม้อหุงข้าวไฟฟ้า", roman: "maaw hung khaao fai-faa", chinese: "电饭锅", id: "maaw-hung-khaao-fai-faa", theme: "家电" },
  { thai: "กาต้มน้ำไฟฟ้า", roman: "gaa dtom naam fai-faa", chinese: "电热水壶", id: "gaa-dtom-naam-fai-faa", theme: "家电" },
  { thai: "เครื่องดูดฝุ่น", roman: "khreuuang duut fun", chinese: "吸尘器", id: "khreuuang-duut-fun", theme: "家电" },
  { thai: "ทีวีห้องรับแขก", roman: "thii-wii haawng rap khaaek", chinese: "客厅电视", id: "thii-wii-haawng-rap-khaaek", theme: "家电" },
  { thai: "รีโมตทีวี", roman: "rii-moot thii-wii", chinese: "电视遥控器", id: "rii-moot-thii-wii", theme: "遥控器" },
  { thai: "รีโมตแอร์", roman: "rii-moot aae", chinese: "空调遥控器", id: "rii-moot-aae", theme: "遥控器" },
  { thai: "ปลั๊กพ่วง", roman: "bplak phuang", chinese: "插线板", id: "bplak-phuang", theme: "开关设置" },
  { thai: "สายชาร์จมือถือ", roman: "saai chaat meu-theuu", chinese: "手机充电线", id: "saai-chaat-meu-theuu", theme: "充电电池" },
  { thai: "แบตสำรอง", roman: "baet sam-raawng", chinese: "充电宝", id: "baet-sam-raawng", theme: "充电电池" },
  { thai: "หลอดไฟห้องน้ำ", roman: "laawt fai haawng naam", chinese: "浴室灯泡", id: "laawt-fai-haawng-naam", theme: "开关设置" },
  { thai: "เครื่องทำน้ำอุ่น", roman: "khreuuang tham naam un", chinese: "热水器", id: "khreuuang-tham-naam-un", theme: "家电" },
];

const chargeItems: readonly Item[] = [
  { thai: "มือถือเครื่องนี้", roman: "meu-theuu khreuuang nii", chinese: "这部手机", id: "meu-theuu-khreuuang-nii" },
  { thai: "แท็บเล็ต", roman: "thaep-let", chinese: "平板电脑", id: "thaep-let" },
  { thai: "หูฟังไร้สาย", roman: "huu-fang rai-saai", chinese: "无线耳机", id: "huu-fang-rai-saai" },
  { thai: "แบตสำรอง", roman: "baet sam-raawng", chinese: "充电宝", id: "baet-sam-raawng" },
  { thai: "รีโมตทีวี", roman: "rii-moot thii-wii", chinese: "电视遥控器", id: "rii-moot-thii-wii" },
  { thai: "ลำโพงเล็ก", roman: "lam-phoong lek", chinese: "小音箱", id: "lam-phoong-lek" },
  { thai: "นาฬิกาอัจฉริยะ", roman: "naa-li-gaa at-cha-ri-ya", chinese: "智能手表", id: "naa-li-gaa-at-cha-ri-ya" },
  { thai: "ไฟฉาย", roman: "fai-chaai", chinese: "手电筒", id: "fai-chaai" },
  { thai: "เครื่องโกนหนวด", roman: "khreuuang goon nuaat", chinese: "电动剃须刀", id: "khreuuang-goon-nuaat" },
  { thai: "แปรงสีฟันไฟฟ้า", roman: "bpraaeng sii fan fai-faa", chinese: "电动牙刷", id: "bpraaeng-sii-fan-fai-faa" },
  { thai: "กล้องเล็ก", roman: "glaawng lek", chinese: "小相机", id: "glaawng-lek" },
  { thai: "คอมพิวเตอร์โน้ตบุ๊ก", roman: "khaawm-phiu-dtooe noot-buk", chinese: "笔记本电脑", id: "khaawm-phiu-dtooe-noot-buk" },
];

const directRows: readonly Definition[] = [
  { thai: "กดปุ่มสีแดงก่อน", id: "got-bpum-sii-daaeng-gaawn", roman: "got bpum sii daaeng gaawn", chinese: "先按红色按钮", partOfSpeech: "短语", theme: "使用说明", exampleThai: "ถ้าเปิดไม่ได้ ให้กดปุ่มสีแดงก่อน", exampleRoman: "thaa bpoet mai dai, hai got bpum sii daaeng gaawn", exampleChinese: "如果打不开，请先按红色按钮。", tag: "说明" },
  { thai: "ตั้งเวลาไว้สิบนาที", id: "dtang-wee-laa-wai-sip-naa-thii", roman: "dtang wee-laa wai sip naa-thii", chinese: "把时间设为十分钟", partOfSpeech: "短语", theme: "开关设置", exampleThai: "อุ่นข้าวในไมโครเวฟ ตั้งเวลาไว้สิบนาที", exampleRoman: "un khaao nai mai-khroo-weef, dtang wee-laa wai sip naa-thii", exampleChinese: "用微波炉热饭，把时间设为十分钟。", tag: "设置" },
  { thai: "เครื่องนี้กินไฟมาก", id: "khreuuang-nii-gin-fai-maak", roman: "khreuuang nii gin fai maak", chinese: "这台机器很费电", partOfSpeech: "短语", theme: "家电", exampleThai: "เครื่องนี้กินไฟมาก เราใช้ไม่นาน", exampleRoman: "khreuuang nii gin fai maak, rao chai mai naan", exampleChinese: "这台机器很费电，我们不长时间用。", tag: "用电" },
  { thai: "เสียงเครื่องดังเกินไป", id: "siiang-khreuuang-dang-goen-bpai", roman: "siiang khreuuang dang goen bpai", chinese: "机器声音太大", partOfSpeech: "短语", theme: "故障", exampleThai: "เสียงเครื่องดังเกินไป ช่วยปิดก่อนได้ไหม", exampleRoman: "siiang khreuuang dang goen bpai, chuai bpit gaawn dai mai", exampleChinese: "机器声音太大，可以先关掉吗？", tag: "故障" },
  { thai: "ไฟไม่เข้าเครื่อง", id: "fai-mai-khao-khreuuang", roman: "fai mai khao khreuuang", chinese: "机器没有通电", partOfSpeech: "短语", theme: "故障", exampleThai: "เสียบปลั๊กแล้ว แต่ไฟไม่เข้าเครื่อง", exampleRoman: "siiap bplak laaeo, dtaae fai mai khao khreuuang", exampleChinese: "已经插上插头了，但机器没有通电。", tag: "故障" },
  { thai: "ถ่านรีโมตหมด", id: "thaan-rii-moot-mot", roman: "thaan rii-moot mot", chinese: "遥控器电池没电了", partOfSpeech: "短语", theme: "遥控器", exampleThai: "เปลี่ยนช่องไม่ได้ เพราะถ่านรีโมตหมด", exampleRoman: "bpliian chaawng mai dai, phraw thaan rii-moot mot", exampleChinese: "换不了台，因为遥控器电池没电了。", tag: "电池" },
  { thai: "อย่าลืมถอดปลั๊ก", id: "yaa-leum-thaawt-bplak", roman: "yaa leum thaawt bplak", chinese: "别忘了拔插头", partOfSpeech: "短语", theme: "使用说明", exampleThai: "ก่อนออกจากบ้าน อย่าลืมถอดปลั๊กกาต้มน้ำ", exampleRoman: "gaawn aawk jaak baan, yaa leum thaawt bplak gaa dtom naam", exampleChinese: "出门前别忘了拔掉热水壶插头。", tag: "提醒" },
  { thai: "ตั้งความเย็นระดับกลาง", id: "dtang-khwaam-yen-ra-dap-glaang", roman: "dtang khwaam yen ra-dap glaang", chinese: "把冷度设为中档", partOfSpeech: "短语", theme: "开关设置", exampleThai: "กลางคืนเราตั้งความเย็นระดับกลางก็พอ", exampleRoman: "glaang-kheuun rao dtang khwaam yen ra-dap glaang gaaw phaaw", exampleChinese: "晚上我们把冷度设为中档就够了。", tag: "设置" },
];

const openRows = devices.map((device): Definition => ({
  thai: `เปิด${device.thai}ก่อนใช้`,
  id: `bpoet-${device.id}-gaawn-chai`,
  roman: `bpoet ${device.roman} gaawn chai`,
  chinese: `使用前打开${device.chinese}`,
  partOfSpeech: "短语",
  theme: device.theme ?? "家电",
  exampleThai: `ก่อนใช้ ให้เปิด${device.thai}ก่อน`,
  exampleRoman: `gaawn chai, hai bpoet ${device.roman} gaawn`,
  exampleChinese: `使用前，请先打开${device.chinese}。`,
  tag: "打开",
}));

const closeRows = devices.map((device): Definition => ({
  thai: `ปิด${device.thai}หลังใช้`,
  id: `bpit-${device.id}-lang-chai`,
  roman: `bpit ${device.roman} lang chai`,
  chinese: `用后关闭${device.chinese}`,
  partOfSpeech: "短语",
  theme: device.theme ?? "家电",
  exampleThai: `หลังใช้เสร็จ กรุณาปิด${device.thai}ด้วย`,
  exampleRoman: `lang chai set, ga-ru-naa bpit ${device.roman} duai`,
  exampleChinese: `用完后，请也把${device.chinese}关上。`,
  tag: "关闭",
}));

const setRows = devices.map((device): Definition => ({
  thai: `ตั้งค่า${device.thai}ใหม่`,
  id: `dtang-khaa-${device.id}-mai`,
  roman: `dtang khaa ${device.roman} mai`,
  chinese: `重新设置${device.chinese}`,
  partOfSpeech: "短语",
  theme: "开关设置",
  exampleThai: `เครื่องทำงานแปลกๆ เราลองตั้งค่า${device.thai}ใหม่`,
  exampleRoman: `khreuuang tham-ngaan bplaaek bplaaek, rao laawng dtang khaa ${device.roman} mai`,
  exampleChinese: `机器运行有点奇怪，我们试着重新设置${device.chinese}。`,
  tag: "设置",
}));

const problemRows = devices.map((device): Definition => ({
  thai: `${device.thai}ใช้ไม่ได้`,
  id: `${device.id}-chai-mai-dai`,
  roman: `${device.roman} chai mai dai`,
  chinese: `${device.chinese}不能用了`,
  partOfSpeech: "短语",
  theme: "故障",
  exampleThai: `วันนี้${device.thai}ใช้ไม่ได้ ต้องขอให้ช่างดู`,
  exampleRoman: `wan-nii ${device.roman} chai mai dai, dtawng khaaw hai chang duu`,
  exampleChinese: `今天${device.chinese}不能用了，要请师傅看一下。`,
  tag: "故障",
}));

const chargeRows = chargeItems.map((item): Definition => ({
  thai: `ชาร์จ${item.thai}ให้เต็ม`,
  id: `chaat-${item.id}-hai-dtem`,
  roman: `chaat ${item.roman} hai dtem`,
  chinese: `把${item.chinese}充满电`,
  partOfSpeech: "短语",
  theme: "充电电池",
  exampleThai: `ก่อนออกไปข้างนอก ฉันชาร์จ${item.thai}ให้เต็ม`,
  exampleRoman: `gaawn aawk bpai khaang naawk, chan chaat ${item.roman} hai dtem`,
  exampleChinese: `出门前，我把${item.chinese}充满电。`,
  tag: "充电",
}));

const batteryRows = chargeItems.map((item): Definition => ({
  thai: `แบต${item.thai}ใกล้หมด`,
  id: `baet-${item.id}-glai-mot`,
  roman: `baet ${item.roman} glai mot`,
  chinese: `${item.chinese}快没电了`,
  partOfSpeech: "短语",
  theme: "充电电池",
  exampleThai: `แบต${item.thai}ใกล้หมด ช่วยเอาสายชาร์จมาให้หน่อย`,
  exampleRoman: `baet ${item.roman} glai mot, chuai ao saai chaat maa hai naawy`,
  exampleChinese: `${item.chinese}快没电了，请帮我拿一下充电线。`,
  tag: "电量",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...openRows,
  ...closeRows,
  ...setRows,
  ...problemRows,
  ...chargeRows,
  ...batteryRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "家电设备", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 家电场景常用“เปิด、ปิด、ตั้งค่า、ใช้ไม่ได้、ชาร์จ、แบตใกล้หมด”等说法。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于家里使用电器、遥控器、充电、电池、开关设置、故障和简单说明。"],
    tags,
    sourceRefs: HOME_APPLIANCES_DEVICES_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_HOME_APPLIANCES_DEVICES_01 = rows.map(toCandidate);
