export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "家庭照顾" | "孩子老人" | "生活用品" | "家里缺东西" | "照看" | "提醒" | "准备" | "家庭需求";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const FAMILY_CARE_HOUSEHOLD_NEEDS_REFS = ["thai-frequency", "thai-a2-family-care-household-needs-candidate"];

const familyMembers: readonly Item[] = [
  { thai: "ลูกคนเล็ก", roman: "luuk khon lek", chinese: "小儿子/小女儿", id: "luuk-khon-lek" },
  { thai: "ลูกคนโต", roman: "luuk khon dtoo", chinese: "大儿子/大女儿", id: "luuk-khon-dtoo" },
  { thai: "น้องชาย", roman: "naawng-chaai", chinese: "弟弟", id: "naawng-chaai" },
  { thai: "น้องสาว", roman: "naawng-saao", chinese: "妹妹", id: "naawng-saao" },
  { thai: "หลานตัวเล็ก", roman: "laan dtua lek", chinese: "小侄甥/孙辈", id: "laan-dtua-lek" },
  { thai: "คุณยาย", roman: "khun yaai", chinese: "外婆/奶奶", id: "khun-yaai" },
  { thai: "คุณตา", roman: "khun dtaa", chinese: "外公/爷爷", id: "khun-dtaa" },
  { thai: "คุณพ่อ", roman: "khun phaaw", chinese: "爸爸", id: "khun-phaaw" },
  { thai: "คุณแม่", roman: "khun maae", chinese: "妈妈", id: "khun-maae" },
  { thai: "พี่สาว", roman: "phii saao", chinese: "姐姐", id: "phii-saao" },
  { thai: "พี่ชาย", roman: "phii chaai", chinese: "哥哥", id: "phii-chaai" },
  { thai: "ญาติที่มาเยี่ยม", roman: "yaat thii maa yiiam", chinese: "来探望的亲戚", id: "yaat-thii-maa-yiiam" },
  { thai: "เด็กที่บ้าน", roman: "dek thii baan", chinese: "家里的孩子", id: "dek-thii-baan" },
  { thai: "ผู้ใหญ่ในบ้าน", roman: "phuu-yai nai baan", chinese: "家里的长辈", id: "phuu-yai-nai-baan" },
  { thai: "คนป่วยในบ้าน", roman: "khon bpuai nai baan", chinese: "家里的病人", id: "khon-bpuai-nai-baan" },
  { thai: "แขกของครอบครัว", roman: "khaaek khaawng khraawp-khrua", chinese: "家里的客人", id: "khaaek-khaawng-khraawp-khrua" },
];

const supplies: readonly Item[] = [
  { thai: "ข้าวสาร", roman: "khaao-saan", chinese: "米", id: "khaao-saan" },
  { thai: "น้ำดื่ม", roman: "naam deum", chinese: "饮用水", id: "naam-deum" },
  { thai: "นมกล่อง", roman: "nom glaawng", chinese: "盒装牛奶", id: "nom-glaawng" },
  { thai: "ไข่ไก่", roman: "khai gai", chinese: "鸡蛋", id: "khai-gai" },
  { thai: "ผักสด", roman: "phak sot", chinese: "新鲜蔬菜", id: "phak-sot" },
  { thai: "ผลไม้", roman: "phon-la-maai", chinese: "水果", id: "phon-la-maai" },
  { thai: "กระดาษทิชชู่", roman: "gra-daat thit-chuu", chinese: "纸巾", id: "gra-daat-thit-chuu" },
  { thai: "น้ำยาล้างจาน", roman: "naam-yaa laang jaan", chinese: "洗洁精", id: "naam-yaa-laang-jaan" },
  { thai: "ผงซักฟอก", roman: "phong sak-faawk", chinese: "洗衣粉", id: "phong-sak-faawk" },
  { thai: "สบู่เหลว", roman: "sa-buu leeo", chinese: "液体皂/沐浴露", id: "sa-buu-leeo" },
  { thai: "ยาสีฟัน", roman: "yaa sii fan", chinese: "牙膏", id: "yaa-sii-fan" },
  { thai: "ถุงขยะ", roman: "thung kha-ya", chinese: "垃圾袋", id: "thung-kha-ya" },
  { thai: "หน้ากากสำรอง", roman: "naa-gaak sam-raawng", chinese: "备用口罩", id: "naa-gaak-sam-raawng" },
  { thai: "ยาแก้ปวด", roman: "yaa gaae bpuat", chinese: "止痛药", id: "yaa-gaae-bpuat" },
  { thai: "ผ้าอ้อมเด็ก", roman: "phaa-aawm dek", chinese: "婴儿尿布", id: "phaa-aawm-dek" },
  { thai: "อาหารแมว", roman: "aa-haan maaeo", chinese: "猫粮", id: "aa-haan-maaeo" },
];

const tasks: readonly Item[] = [
  { thai: "กินข้าวเช้า", roman: "gin khaao chaao", chinese: "吃早饭", id: "gin-khaao-chaao" },
  { thai: "กินยาให้ตรงเวลา", roman: "gin yaa hai dtrong wee-laa", chinese: "按时吃药", id: "gin-yaa-hai-dtrong-wee-laa" },
  { thai: "ดื่มน้ำให้พอ", roman: "deum naam hai phaaw", chinese: "喝够水", id: "deum-naam-hai-phaaw" },
  { thai: "พักผ่อนให้มาก", roman: "phak-phaawn hai maak", chinese: "多休息", id: "phak-phaawn-hai-maak" },
  { thai: "ใส่เสื้อกันหนาว", roman: "sai seua gan naao", chinese: "穿外套", id: "sai-seua-gan-naao" },
  { thai: "เอาร่มไปด้วย", roman: "ao rom bpai duai", chinese: "带伞", id: "ao-rom-bpai-duai" },
  { thai: "ปิดไฟก่อนนอน", roman: "bpit fai gaawn naawn", chinese: "睡前关灯", id: "bpit-fai-gaawn-naawn" },
  { thai: "ล็อกประตูบ้าน", roman: "lok bpra-dtuu baan", chinese: "锁家门", id: "lok-bpra-dtuu-baan" },
  { thai: "ทำการบ้านให้เสร็จ", roman: "tham gaan-baan hai set", chinese: "做完作业", id: "tham-gaan-baan-hai-set" },
  { thai: "อาบน้ำก่อนนอน", roman: "aap naam gaawn naawn", chinese: "睡前洗澡", id: "aap-naam-gaawn-naawn" },
  { thai: "โทรบอกแม่", roman: "thoo baawk maae", chinese: "打电话告诉妈妈", id: "thoo-baawk-maae" },
  { thai: "เก็บของเล่นเข้ากล่อง", roman: "gep khaawng-len khao glaawng", chinese: "把玩具收进盒子", id: "gep-khaawng-len-khao-glaawng" },
];

const directRows: readonly Definition[] = [
  { thai: "วันนี้บ้านเราขาดของหลายอย่าง", id: "wan-nii-baan-rao-khaat-khaawng-laai-yaang", roman: "wan-nii baan rao khaat khaawng laai yaang", chinese: "今天家里缺好几样东西", partOfSpeech: "短语", theme: "家里缺东西", exampleThai: "วันนี้บ้านเราขาดของหลายอย่าง ต้องไปซูเปอร์", exampleRoman: "wan-nii baan rao khaat khaawng laai yaang, dtawng bpai suu-bpooe", exampleChinese: "今天家里缺好几样东西，要去超市。", tag: "缺东西" },
  { thai: "ช่วยดูเด็กสักครู่", id: "chuai-duu-dek-sak-khruu", roman: "chuai duu dek sak khruu", chinese: "帮忙看孩子一会儿", partOfSpeech: "短语", theme: "照看", exampleThai: "แม่ขอให้พี่ช่วยดูเด็กสักครู่", exampleRoman: "maae khaaw hai phii chuai duu dek sak khruu", exampleChinese: "妈妈请哥哥/姐姐帮忙看孩子一会儿。", tag: "照看" },
  { thai: "เตรียมอาหารให้ผู้ใหญ่", id: "dtriiam-aa-haan-hai-phuu-yai", roman: "dtriiam aa-haan hai phuu-yai", chinese: "给长辈准备饭菜", partOfSpeech: "短语", theme: "准备", exampleThai: "ตอนเย็นฉันเตรียมอาหารให้ผู้ใหญ่ในบ้าน", exampleRoman: "dtaawn yen chan dtriiam aa-haan hai phuu-yai nai baan", exampleChinese: "傍晚我给家里的长辈准备饭菜。", tag: "准备" },
  { thai: "อย่าลืมซื้อของเข้าบ้าน", id: "yaa-leum-seu-khaawng-khao-baan", roman: "yaa leum seu khaawng khao baan", chinese: "别忘了买家用东西", partOfSpeech: "短语", theme: "提醒", exampleThai: "แม่ส่งข้อความว่าอย่าลืมซื้อของเข้าบ้าน", exampleRoman: "maae song khaaw-khwaam waa yaa leum seu khaawng khao baan", exampleChinese: "妈妈发消息说别忘了买家用东西。", tag: "提醒" },
  { thai: "บ้านนี้ต้องใช้ของเยอะ", id: "baan-nii-dtawng-chai-khaawng-yoe", roman: "baan nii dtawng chai khaawng yoe", chinese: "这个家需要用很多东西", partOfSpeech: "短语", theme: "家庭需求", exampleThai: "บ้านนี้มีหลายคน บ้านนี้ต้องใช้ของเยอะ", exampleRoman: "baan nii mii laai khon, baan nii dtawng chai khaawng yoe", exampleChinese: "这个家人多，需要用很多东西。", tag: "需求" },
  { thai: "ที่บ้านเหลือของใช้นิดเดียว", id: "thii-baan-leua-khaawng-chai-nit-diaao", roman: "thii baan leua khaawng chai nit diaao", chinese: "家里日用品只剩一点了", partOfSpeech: "短语", theme: "生活用品", exampleThai: "ที่บ้านเหลือของใช้นิดเดียว พรุ่งนี้ต้องไปซื้อเพิ่ม", exampleRoman: "thii baan leua khaawng chai nit diaao, phrung-nii dtawng bpai seu phoem", exampleChinese: "家里日用品只剩一点了，明天要再去买。", tag: "生活用品" },
  { thai: "ช่วยเตรียมของให้ลูก", id: "chuai-dtriiam-khaawng-hai-luuk", roman: "chuai dtriiam khaawng hai luuk", chinese: "帮孩子准备东西", partOfSpeech: "短语", theme: "准备", exampleThai: "ตอนเช้าแม่ช่วยเตรียมของให้ลูกไปโรงเรียน", exampleRoman: "dtaawn chaao maae chuai dtriiam khaawng hai luuk bpai roong-riian", exampleChinese: "早上妈妈帮孩子准备去学校的东西。", tag: "准备" },
  { thai: "ต้องซื้อของใช้ให้ผู้สูงอายุ", id: "dtawng-seu-khaawng-chai-hai-phuu-sung-aa-yu", roman: "dtawng seu khaawng chai hai phuu suung aa-yu", chinese: "要给老人买日用品", partOfSpeech: "短语", theme: "孩子老人", exampleThai: "สุดสัปดาห์นี้เราต้องซื้อของใช้ให้ผู้สูงอายุที่บ้าน", exampleRoman: "sut sap-daa nii rao dtawng seu khaawng chai hai phuu suung aa-yu thii baan", exampleChinese: "这个周末我们要给家里的老人买日用品。", tag: "老人照顾" },
  { thai: "เตือนเด็กให้กินข้าว", id: "dteuan-dek-hai-gin-khaao", roman: "dteuan dek hai gin khaao", chinese: "提醒孩子吃饭", partOfSpeech: "短语", theme: "提醒", exampleThai: "ยายเตือนเด็กให้กินข้าวก่อนเล่น", exampleRoman: "yaai dteuan dek hai gin khaao gaawn len", exampleChinese: "外婆提醒孩子先吃饭再玩。", tag: "提醒" },
];

const careRows = familyMembers.map((member): Definition => ({
  thai: `ดูแล${member.thai}ตอนเย็น`,
  id: `duu-laae-${member.id}-dtaawn-yen`,
  roman: `duu-laae ${member.roman} dtaawn yen`,
  chinese: `傍晚照顾${member.chinese}`,
  partOfSpeech: "短语",
  theme: "家庭照顾",
  exampleThai: `หลังเลิกงาน ฉันช่วยดูแล${member.thai}ตอนเย็น`,
  exampleRoman: `lang loek ngaan, chan chuai duu-laae ${member.roman} dtaawn yen`,
  exampleChinese: `下班后，我帮忙傍晚照顾${member.chinese}。`,
  tag: "照顾",
}));

const watchRows = familyMembers.map((member): Definition => ({
  thai: `ช่วยดู${member.thai}ให้หน่อย`,
  id: `chuai-duu-${member.id}-hai-naawy`,
  roman: `chuai duu ${member.roman} hai naawy`,
  chinese: `请帮忙照看${member.chinese}`,
  partOfSpeech: "短语",
  theme: "照看",
  exampleThai: `แม่ยุ่งอยู่ ช่วยดู${member.thai}ให้หน่อยได้ไหม`,
  exampleRoman: `maae yung yuu, chuai duu ${member.roman} hai naawy dai mai`,
  exampleChinese: `妈妈正在忙，可以请帮忙照看${member.chinese}吗？`,
  tag: "照看",
}));

const buyRows = supplies.map((item): Definition => ({
  thai: `ต้องซื้อ${item.thai}เข้าบ้าน`,
  id: `dtawng-seu-${item.id}-khao-baan`,
  roman: `dtawng seu ${item.roman} khao baan`,
  chinese: `需要买${item.chinese}放家里`,
  partOfSpeech: "短语",
  theme: "生活用品",
  exampleThai: `ของใกล้หมดแล้ว ต้องซื้อ${item.thai}เข้าบ้าน`,
  exampleRoman: `khaawng glai mot laaeo, dtawng seu ${item.roman} khao baan`,
  exampleChinese: `东西快用完了，需要买${item.chinese}放家里。`,
  tag: "采购",
}));

const lackRows = supplies.map((item): Definition => ({
  thai: `ที่บ้านไม่มี${item.thai}แล้ว`,
  id: `thii-baan-mai-mii-${item.id}-laaeo`,
  roman: `thii baan mai mii ${item.roman} laaeo`,
  chinese: `家里已经没有${item.chinese}了`,
  partOfSpeech: "短语",
  theme: "家里缺东西",
  exampleThai: `ก่อนทำอาหาร แม่บอกว่าที่บ้านไม่มี${item.thai}แล้ว`,
  exampleRoman: `gaawn tham aa-haan, maae baawk waa thii baan mai mii ${item.roman} laaeo`,
  exampleChinese: `做饭前，妈妈说家里已经没有${item.chinese}了。`,
  tag: "缺东西",
}));

const remindRows = tasks.map((task): Definition => ({
  thai: `เตือนเด็กให้${task.thai}`,
  id: `dteuuan-dek-hai-${task.id}`,
  roman: `dteuuan dek hai ${task.roman}`,
  chinese: `提醒孩子${task.chinese}`,
  partOfSpeech: "短语",
  theme: "提醒",
  exampleThai: `ตอนเย็นแม่เตือนเด็กให้${task.thai}`,
  exampleRoman: `dtaawn yen maae dteuuan dek hai ${task.roman}`,
  exampleChinese: `傍晚妈妈提醒孩子${task.chinese}。`,
  tag: "提醒",
}));

const prepareRows = tasks.map((task): Definition => ({
  thai: `เตรียมให้${task.thai}ก่อนออกไป`,
  id: `dtriiam-hai-${task.id}-gaawn-aawk-bpai`,
  roman: `dtriiam hai ${task.roman} gaawn aawk bpai`,
  chinese: `出门前准备好${task.chinese}`,
  partOfSpeech: "短语",
  theme: "准备",
  exampleThai: `ก่อนออกไปโรงเรียน เราเตรียมให้${task.thai}ก่อนออกไป`,
  exampleRoman: `gaawn aawk bpai roong-riian, rao dtriiam hai ${task.roman} gaawn aawk bpai`,
  exampleChinese: `去学校前，我们准备好${task.chinese}。`,
  tag: "准备",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...careRows,
  ...watchRows,
  ...buyRows,
  ...lackRows,
  ...remindRows,
  ...prepareRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "家庭照顾需求", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 家庭场景常用“ดูแล、ช่วยดู、ต้องซื้อ、ไม่มีแล้ว、เตือน、เตรียม”这些句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于家庭照顾、孩子老人、买生活用品、家里缺东西、照看、提醒、准备和家庭需求。"],
    tags,
    sourceRefs: FAMILY_CARE_HOUSEHOLD_NEEDS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_FAMILY_CARE_HOUSEHOLD_NEEDS_01 = rows.map(toCandidate);
