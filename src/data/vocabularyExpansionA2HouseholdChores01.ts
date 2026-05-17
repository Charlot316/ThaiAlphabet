export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语" | "句型";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "家务" | "洗衣晾衣" | "扫拖擦" | "倒垃圾" | "整理房间" | "照顾宠物" | "家庭分工" | "清洁频率";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";
export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };
type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme];
const CHORES_REFS = ["worker-a-a2-household-chores", "basic-thai-home-chores"];

const rows: Row[] = [
  ["ngaan-baan", "งานบ้าน", "ngaan baan", "家务", "名词", "家务"],
  ["tham-ngaan-baan", "ทำงานบ้าน", "tham ngaan baan", "做家务", "动词", "家务"],
  ["chuai-ngaan-baan", "ช่วยงานบ้าน", "chuai ngaan baan", "帮做家务", "动词", "家务"],
  ["baeng-ngaan-baan", "แบ่งงานบ้าน", "baeng ngaan baan", "分配家务", "动词", "家庭分工"],
  ["naa-thii-nai-baan", "หน้าที่ในบ้าน", "naa thii nai baan", "家里的责任", "名词", "家庭分工"],
  ["khon-la-naa-thii", "คนละหน้าที่", "khon la naa thii", "每人一个职责", "短语", "家庭分工"],
  ["wen-gan-tham", "เวรกันทำ", "ween gan tham", "轮流做", "动词", "家庭分工"],
  ["chuai-gan", "ช่วยกัน", "chuai gan", "一起帮忙", "动词", "家庭分工"],
  ["tham-khon-diao", "ทำคนเดียว", "tham khon diao", "一个人做", "动词", "家庭分工"],
  ["tham-duai-gan", "ทำด้วยกัน", "tham duai gan", "一起做", "动词", "家庭分工"],
  ["dtriiam-ngaan-baan", "เตรียมงานบ้าน", "dtriiam ngaan baan", "准备家务事项", "动词", "家务"],
  ["jat-taa-raang-ngaan-baan", "จัดตารางงานบ้าน", "jat dtaa-raang ngaan baan", "安排家务表", "动词", "家庭分工"],
  ["sak-phaa", "ซักผ้า", "sak phaa", "洗衣服", "动词", "洗衣晾衣"],
  ["sak-mue", "ซักมือ", "sak mue", "手洗", "动词", "洗衣晾衣"],
  ["sak-khreuang", "ซักเครื่อง", "sak khreuuang", "机洗", "动词", "洗衣晾衣"],
  ["khreuang-sak-phaa", "เครื่องซักผ้า", "khreuuang sak phaa", "洗衣机", "名词", "洗衣晾衣"],
  ["nam-yaa-sak-phaa", "น้ำยาซักผ้า", "naam yaa sak phaa", "洗衣液", "名词", "洗衣晾衣"],
  ["phong-sak-phaa", "ผงซักฟอก", "phong sak faawk", "洗衣粉", "名词", "洗衣晾衣"],
  ["nam-yaa-bprap-phaa-num", "น้ำยาปรับผ้านุ่ม", "naam yaa bprap phaa num", "柔顺剂", "名词", "洗衣晾衣"],
  ["phaa-sok-ga-bprok", "ผ้าสกปรก", "phaa sok-ga-bprok", "脏衣服", "名词", "洗衣晾衣"],
  ["phaa-sa-aat", "ผ้าสะอาด", "phaa sa-aat", "干净衣服", "名词", "洗衣晾衣"],
  ["phaa-bpiiak", "ผ้าเปียก", "phaa bpiiak", "湿衣服", "名词", "洗衣晾衣"],
  ["phaa-haaeng", "ผ้าแห้ง", "phaa haaeng", "干衣服", "名词", "洗衣晾衣"],
  ["dtaak-phaa", "ตากผ้า", "dtaak phaa", "晾衣服", "动词", "洗衣晾衣"],
  ["rao-taak-phaa", "ราวตากผ้า", "raao dtaak phaa", "晾衣架；晾衣杆", "名词", "洗衣晾衣"],
  ["mai-niip-phaa", "ไม้หนีบผ้า", "mai niip phaa", "衣夹", "名词", "洗衣晾衣"],
  ["gep-phaa", "เก็บผ้า", "gep phaa", "收衣服", "动词", "洗衣晾衣"],
  ["phap-phaa", "พับผ้า", "phap phaa", "叠衣服", "动词", "洗衣晾衣"],
  ["riit-phaa", "รีดผ้า", "riit phaa", "熨衣服", "动词", "洗衣晾衣"],
  ["dtao-riit", "เตารีด", "dtao riit", "熨斗", "名词", "洗衣晾衣"],
  ["gwaat-pheun", "กวาดพื้น", "gwaat pheun", "扫地", "动词", "扫拖擦"],
  ["mai-gwaat", "ไม้กวาด", "mai gwaat", "扫帚", "名词", "扫拖擦"],
  ["thi-gooyaa", "ที่โกยขยะ", "thii gooy kha-ya", "簸箕", "名词", "扫拖擦"],
  ["thu-pheun", "ถูพื้น", "thuu pheun", "拖地", "动词", "扫拖擦"],
  ["mai-thuu-pheun", "ไม้ถูพื้น", "mai thuu pheun", "拖把", "名词", "扫拖擦"],
  ["nam-yaa-thuu-pheun", "น้ำยาถูพื้น", "naam yaa thuu pheun", "地板清洁液", "名词", "扫拖擦"],
  ["chet-to", "เช็ดโต๊ะ", "chet dto", "擦桌子", "动词", "扫拖擦"],
  ["chet-naa-dtaang", "เช็ดหน้าต่าง", "chet naa dtaang", "擦窗户", "动词", "扫拖擦"],
  ["chet-fun", "เช็ดฝุ่น", "chet fun", "擦灰尘", "动词", "扫拖擦"],
  ["pha-chet", "ผ้าเช็ด", "phaa chet", "抹布；擦布", "名词", "扫拖擦"],
  ["pha-chet-to", "ผ้าเช็ดโต๊ะ", "phaa chet dto", "擦桌布", "名词", "扫拖擦"],
  ["fun", "ฝุ่น", "fun", "灰尘", "名词", "扫拖擦"],
  ["sok-ga-bprok", "สกปรก", "sok-ga-bprok", "脏", "形容词", "扫拖擦"],
  ["sa-aat", "สะอาด", "sa-aat", "干净", "形容词", "扫拖擦"],
  ["khat", "ขัด", "khat", "刷；擦洗", "动词", "扫拖擦"],
  ["khat-haawng-naam", "ขัดห้องน้ำ", "khat haawng naam", "刷洗厕所/浴室", "动词", "扫拖擦"],
  ["laang-haawng-naam", "ล้างห้องน้ำ", "laang haawng naam", "清洗卫生间", "动词", "扫拖擦"],
  ["laang-jaan", "ล้างจาน", "laang jaan", "洗碗", "动词", "家务"],
  ["nam-yaa-laang-jaan", "น้ำยาล้างจาน", "naam yaa laang jaan", "洗碗液", "名词", "家务"],
  ["fong-naam", "ฟองน้ำ", "faawng naam", "海绵", "名词", "家务"],
  ["jaan-chaam", "จานชาม", "jaan chaam", "碗盘；餐具", "名词", "家务"],
  ["khep-jaan", "เก็บจาน", "gep jaan", "收盘子", "动词", "家务"],
  ["chet-jaan", "เช็ดจาน", "chet jaan", "擦干盘子", "动词", "家务"],
  ["thing-kha-ya", "ทิ้งขยะ", "thing kha-ya", "扔垃圾", "动词", "倒垃圾"],
  ["the-kha-ya", "เทขยะ", "thee kha-ya", "倒垃圾；清空垃圾", "动词", "倒垃圾"],
  ["ao-kha-ya-bpai-thing", "เอาขยะไปทิ้ง", "ao kha-ya bpai thing", "把垃圾拿去扔", "动词", "倒垃圾"],
  ["thang-kha-ya", "ถังขยะ", "thang kha-ya", "垃圾桶", "名词", "倒垃圾"],
  ["thung-kha-ya", "ถุงขยะ", "thung kha-ya", "垃圾袋", "名词", "倒垃圾"],
  ["yaek-kha-ya", "แยกขยะ", "yaaek kha-ya", "垃圾分类", "动词", "倒垃圾"],
  ["kha-ya-piiak", "ขยะเปียก", "kha-ya bpiiak", "湿垃圾", "名词", "倒垃圾"],
  ["kha-ya-haaeng", "ขยะแห้ง", "kha-ya haaeng", "干垃圾", "名词", "倒垃圾"],
  ["kha-ya-rii-sai-khoen", "ขยะรีไซเคิล", "kha-ya rii-sai-khoen", "可回收垃圾", "名词", "倒垃圾"],
  ["glin-kha-ya", "กลิ่นขยะ", "glin kha-ya", "垃圾味", "名词", "倒垃圾"],
  ["jat-haawng", "จัดห้อง", "jat haawng", "整理房间", "动词", "整理房间"],
  ["gep-haawng", "เก็บห้อง", "gep haawng", "收拾房间", "动词", "整理房间"],
  ["jat-dtuu", "จัดตู้", "jat dtuu", "整理柜子", "动词", "整理房间"],
  ["gep-to", "เก็บโต๊ะ", "gep dto", "收拾桌子", "动词", "整理房间"],
  ["jat-tiiang", "จัดเตียง", "jat dtiiang", "整理床铺", "动词", "整理房间"],
  ["bpuu-tiiang", "ปูเตียง", "bpuu dtiiang", "铺床", "动词", "整理房间"],
  ["phap-phaa-hom", "พับผ้าห่ม", "phap phaa hom", "叠毯子/被子", "动词", "整理房间"],
  ["gep-khaawng", "เก็บของ", "gep khaawng", "收拾东西", "动词", "整理房间"],
  ["khaawng-rak", "ของรก", "khaawng rok", "乱放的东西", "名词", "整理房间"],
  ["rok", "รก", "rok", "乱；杂乱", "形容词", "整理房间"],
  ["riiap-raawy", "เรียบร้อย", "riiap raawy", "整齐；有条理", "形容词", "整理房间"],
  ["duu-laae-sat-liiang", "ดูแลสัตว์เลี้ยง", "duu laae sat liiang", "照顾宠物", "动词", "照顾宠物"],
  ["hai-aa-haan-sat", "ให้อาหารสัตว์", "hai aa-haan sat", "喂宠物/动物", "动词", "照顾宠物"],
  ["hai-naam-sat", "ให้น้ำสัตว์", "hai naam sat", "给动物水喝", "动词", "照顾宠物"],
  ["phaa-maa-doen-len", "พาหมาเดินเล่น", "phaa maa doen len", "遛狗", "动词", "照顾宠物"],
  ["laang-gra-ba-sai", "ล้างกระบะทราย", "laang gra-ba sai", "清洗猫砂盆", "动词", "照顾宠物"],
  ["gra-ba-sai", "กระบะทราย", "gra-ba sai", "猫砂盆", "名词", "照顾宠物"],
  ["aa-haan-maaeo", "อาหารแมว", "aa-haan maaeo", "猫粮", "名词", "照顾宠物"],
  ["aa-haan-maa", "อาหารหมา", "aa-haan maa", "狗粮", "名词", "照顾宠物"],
  ["sat-liiang", "สัตว์เลี้ยง", "sat liiang", "宠物", "名词", "照顾宠物"],
  ["bpra-jam-wan", "ประจำวัน", "bpra-jam wan", "每天的；日常的", "副词", "清洁频率"],
  ["thuk-wan", "ทุกวัน", "thuk wan", "每天", "副词", "清洁频率"],
  ["wan-la-khrang", "วันละครั้ง", "wan la khrang", "每天一次", "短语", "清洁频率"],
  ["athiit-la-khrang", "อาทิตย์ละครั้ง", "aa-thit la khrang", "每周一次", "短语", "清洁频率"],
  ["song-wan-khrang", "สองวันครั้ง", "saawng wan khrang", "两天一次", "短语", "清洁频率"],
  ["baang-khrang", "บางครั้ง", "baang khrang", "有时候", "副词", "清洁频率"],
  ["baawy", "บ่อย", "baawy", "经常", "副词", "清洁频率"],
  ["mai-baawy", "ไม่บ่อย", "mai baawy", "不常", "副词", "清洁频率"],
  ["tham-thuk-sao", "ทำทุกเสาร์", "tham thuk sao", "每周六做", "短语", "清洁频率"],
  ["tham-thuk-chaao", "ทำทุกเช้า", "tham thuk chaao", "每天早上做", "短语", "清洁频率"],
  ["tham-thuk-yen", "ทำทุกเย็น", "tham thuk yen", "每天傍晚做", "短语", "清洁频率"],
  ["wan-nii-wen-khrai", "วันนี้เวรใคร", "wan nii ween khrai", "今天轮到谁", "句型", "家庭分工"],
  ["wen-khaawng-chan", "เวรของฉัน", "ween khaawng chan", "轮到我；我的值日", "短语", "家庭分工"],
];

const relatedByTheme: Record<VocabularyExpansionTheme, VocabularyExpansionRelated> = {
  家务: { thai: "งานบ้าน", roman: "ngaan baan", chinese: "家务" },
  洗衣晾衣: { thai: "ซักผ้า", roman: "sak phaa", chinese: "洗衣服" },
  扫拖擦: { thai: "ทำความสะอาด", roman: "tham khwaam-sa-aat", chinese: "打扫清洁" },
  倒垃圾: { thai: "ทิ้งขยะ", roman: "thing kha-ya", chinese: "扔垃圾" },
  整理房间: { thai: "จัดห้อง", roman: "jat haawng", chinese: "整理房间" },
  照顾宠物: { thai: "สัตว์เลี้ยง", roman: "sat liiang", chinese: "宠物" },
  家庭分工: { thai: "แบ่งงานบ้าน", roman: "baeng ngaan baan", chinese: "分配家务" },
  清洁频率: { thai: "ทุกวัน", roman: "thuk wan", chinese: "每天" },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ที่บ้าน แม่เขียนรายการว่า “${row[1]}” เพื่อแบ่งงานบ้านให้ทุกคนทำตามได้ง่าย`,
  roman: `thii baan maae khiian raai-gaan waa "${row[2]}" phuea baeng ngaan-baan hai thuk khon tham dtaam dai ngaai`,
  chinese: `在家里，妈妈把“${row[1]}”写进清单，方便给大家分配家务。`,
});

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];
  const comparison: VocabularyExpansionComparison = { kind: "usage", target: related, distinctionZh: `${row[1]} 属于“${row[5]}”场景；和 ${related.thai} 对照记，可以区分清洁动作、工具、频率和家庭分工。` };
  const collocations = [{ thai: row[1], roman: row[2], chinese: row[3] }, related];
  return {
    id: row[0], thai: row[1], roman: row[2], chinese: row[3], partOfSpeech: row[4], theme: row[5], level: "a2", priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [exampleFor(row)], synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5]] }],
    synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5], "A2基础", "家务"], sourceRefs: CHORES_REFS, reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_HOUSEHOLD_CHORES_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
