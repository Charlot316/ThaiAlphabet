export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "住处周边" | "邻居" | "楼层电梯" | "停车" | "噪音" | "附近设施" | "社区安全" | "找地方" | "居住问题";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionExample[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
};
export type VocabularyExpansionCandidate = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  level: "a2";
  priority: number;
  senses: VocabularyExpansionSense[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

type Definition = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  exampleThai: string;
  exampleRoman: string;
  exampleChinese: string;
  tag: string;
};

type Place = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };
type Issue = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const HOME_NEIGHBORHOOD_REFS = ["thai-frequency", "thai-a2-home-neighborhood-candidate"];

const places: readonly Place[] = [
  { thai: "ร้านสะดวกซื้อหน้าปากซอย", roman: "raan sa-duuak seu naa bpaak saawy", chinese: "巷口便利店", id: "raan-sa-duuak-seu-naa-bpaak-saawy", theme: "附近设施" },
  { thai: "ตลาดเช้าใกล้บ้าน", roman: "dta-laat chaao glai baan", chinese: "家附近早市", id: "dta-laat-chaao-glai-baan", theme: "附近设施" },
  { thai: "ร้านขายยาในซอย", roman: "raan khaai yaa nai saawy", chinese: "巷子里的药店", id: "raan-khaai-yaa-nai-saawy", theme: "附近设施" },
  { thai: "ป้ายรถเมล์หน้าคอนโด", roman: "bpaai rot-mee naa khaawn-doo", chinese: "公寓前公交站牌", id: "bpaai-rot-mee-naa-khaawn-doo", theme: "附近设施" },
  { thai: "สวนเล็กหลังบ้าน", roman: "suan lek lang baan", chinese: "屋后小公园/小花园", id: "suan-lek-lang-baan", theme: "住处周边" },
  { thai: "ลานจอดรถชั้นหนึ่ง", roman: "laan jaawt rot chan neung", chinese: "一楼停车场", id: "laan-jaawt-rot-chan-neung", theme: "停车" },
  { thai: "ห้องซักผ้าชั้นล่าง", roman: "haawng sak phaa chan laang", chinese: "楼下洗衣房", id: "haawng-sak-phaa-chan-laang", theme: "附近设施" },
  { thai: "ตู้รับพัสดุ", roman: "dtuu rap phat-sa-du", chinese: "包裹柜", id: "dtuu-rap-phat-sa-du", theme: "附近设施" },
  { thai: "ประตูหลังหมู่บ้าน", roman: "bpra-dtuu lang muu-baan", chinese: "小区后门", id: "bpra-dtuu-lang-muu-baan", theme: "社区安全" },
  { thai: "ป้อมยามหน้าหมู่บ้าน", roman: "bpaawm yaam naa muu-baan", chinese: "小区门口保安亭", id: "bpaawm-yaam-naa-muu-baan", theme: "社区安全" },
  { thai: "ลิฟต์ตัวกลาง", roman: "lip dtua glaang", chinese: "中间那部电梯", id: "lip-dtua-glaang", theme: "楼层电梯" },
  { thai: "บันไดหนีไฟ", roman: "ban-dai nii fai", chinese: "消防楼梯", id: "ban-dai-nii-fai", theme: "楼层电梯" },
  { thai: "ชั้นสามของตึก", roman: "chan saam khaawng dteuk", chinese: "楼的三层", id: "chan-saam-khaawng-dteuk", theme: "楼层电梯" },
  { thai: "ห้องขยะด้านหลัง", roman: "haawng kha-ya daan lang", chinese: "后面的垃圾房", id: "haawng-kha-ya-daan-lang", theme: "住处周边" },
  { thai: "ทางเดินหน้าห้อง", roman: "thaang doen naa haawng", chinese: "房门前走廊", id: "thaang-doen-naa-haawng", theme: "住处周边" },
  { thai: "กล่องจดหมายชั้นล่าง", roman: "glaawng jot-maai chan laang", chinese: "楼下信箱", id: "glaawng-jot-maai-chan-laang", theme: "附近设施" },
  { thai: "ร้านอาหารหัวมุม", roman: "raan aa-haan hua mum", chinese: "拐角餐馆", id: "raan-aa-haan-hua-mum", theme: "附近设施" },
  { thai: "ร้านกาแฟใต้ตึก", roman: "raan gaa-faae dtai dteuk", chinese: "楼下咖啡店", id: "raan-gaa-faae-dtai-dteuk", theme: "附近设施" },
  { thai: "สนามเด็กเล่นในหมู่บ้าน", roman: "sa-naam dek len nai muu-baan", chinese: "小区儿童游乐场", id: "sa-naam-dek-len-nai-muu-baan", theme: "附近设施" },
  { thai: "จุดทิ้งขยะรีไซเคิล", roman: "jut thing kha-ya rii-sai-khoen", chinese: "可回收垃圾投放点", id: "jut-thing-kha-ya-rii-sai-khoen", theme: "住处周边" },
  { thai: "ซอยข้างบ้าน", roman: "saawy khaang baan", chinese: "家旁边的小巷", id: "saawy-khaang-baan", theme: "找地方" },
  { thai: "ทางเข้าหมู่บ้าน", roman: "thaang khao muu-baan", chinese: "小区入口", id: "thaang-khao-muu-baan", theme: "找地方" },
  { thai: "ตึกสีขาวด้านหน้า", roman: "dteuk sii khaao daan naa", chinese: "前面的白色楼", id: "dteuk-sii-khaao-daan-naa", theme: "找地方" },
  { thai: "สะพานเล็กข้ามคลอง", roman: "sa-phaan lek khaam khlaawng", chinese: "跨คลอง/小河的小桥", id: "sa-phaan-lek-khaam-khlaawng", theme: "找地方" },
];

const issues: readonly Issue[] = [
  { thai: "เสียงเพลงดังจากห้องข้าง ๆ", roman: "siiang phleeng dang jaak haawng khaang khaang", chinese: "隔壁房间音乐声很大", id: "siiang-phleeng-dang-jaak-haawng-khaang-khaang", theme: "噪音" },
  { thai: "เสียงหมาเห่าตอนกลางคืน", roman: "siiang maa hao dtaawn glaang-kheun", chinese: "夜里狗叫声", id: "siiang-maa-hao-dtaawn-glaang-kheun", theme: "噪音" },
  { thai: "เสียงรถดังหน้าบ้าน", roman: "siiang rot dang naa baan", chinese: "家门前车声大", id: "siiang-rot-dang-naa-baan", theme: "噪音" },
  { thai: "ลิฟต์เสียอีกแล้ว", roman: "lip siia iik laaeo", chinese: "电梯又坏了", id: "lip-siia-iik-laaeo", theme: "楼层电梯" },
  { thai: "ไฟทางเดินดับ", roman: "fai thaang doen dap", chinese: "走廊灯灭了", id: "fai-thaang-doen-dap", theme: "社区安全" },
  { thai: "ประตูหน้าตึกปิดไม่สนิท", roman: "bpra-dtuu naa dteuk bpit mai sa-nit", chinese: "楼门关不严", id: "bpra-dtuu-naa-dteuk-bpit-mai-sa-nit", theme: "社区安全" },
  { thai: "ที่จอดรถเต็ม", roman: "thii jaawt rot dtem", chinese: "停车位满了", id: "thii-jaawt-rot-dtem", theme: "停车" },
  { thai: "มีรถจอดขวางทาง", roman: "mii rot jaawt khwaang thaang", chinese: "有车挡路停车", id: "mii-rot-jaawt-khwaang-thaang", theme: "停车" },
  { thai: "น้ำรั่วหน้าห้อง", roman: "naam rua naa haawng", chinese: "房门前漏水", id: "naam-rua-naa-haawng", theme: "居住问题" },
  { thai: "กลิ่นอาหารแรงมาก", roman: "glin aa-haan raaeng maak", chinese: "饭菜味很重", id: "glin-aa-haan-raaeng-maak", theme: "居住问题" },
  { thai: "ขยะเต็มหน้าตึก", roman: "kha-ya dtem naa dteuk", chinese: "楼前垃圾满了", id: "kha-ya-dtem-naa-dteuk", theme: "居住问题" },
  { thai: "ทางเดินเปียกหลังฝนตก", roman: "thaang doen bpiiak lang fon dtok", chinese: "雨后走廊湿", id: "thaang-doen-bpiiak-lang-fon-dtok", theme: "社区安全" },
  { thai: "คนแปลกหน้าเข้ามา", roman: "khon bplaaek naa khao maa", chinese: "陌生人进来了", id: "khon-bplaaek-naa-khao-maa", theme: "社区安全" },
  { thai: "แมวหลงอยู่หน้าบ้าน", roman: "maaeo long yuu naa baan", chinese: "迷路的猫在家门口", id: "maaeo-long-yuu-naa-baan", theme: "住处周边" },
  { thai: "พัสดุวางผิดห้อง", roman: "phat-sa-du waang phit haawng", chinese: "包裹放错房间", id: "phat-sa-du-waang-phit-haawng", theme: "居住问题" },
  { thai: "น้ำไม่ไหลตอนเช้า", roman: "naam mai lai dtaawn chaao", chinese: "早上停水", id: "naam-mai-lai-dtaawn-chaao", theme: "居住问题" },
  { thai: "สัญญาณไวไฟอ่อน", roman: "san-yaan wai-fai aawn", chinese: "Wi-Fi 信号弱", id: "san-yaan-wai-fai-aawn", theme: "居住问题" },
  { thai: "ห้องข้างบนเดินเสียงดัง", roman: "haawng khaang bon doen siiang dang", chinese: "楼上走路声音大", id: "haawng-khaang-bon-doen-siiang-dang", theme: "噪音" },
  { thai: "ฝุ่นเยอะตรงระเบียง", roman: "fun yoe dtrong ra-biiang", chinese: "阳台灰尘多", id: "fun-yoe-dtrong-ra-biiang", theme: "居住问题" },
  { thai: "กล้องวงจรปิดเสีย", roman: "glaawng wong-jaawn bpit siia", chinese: "监控摄像头坏了", id: "glaawng-wong-jaawn-bpit-siia", theme: "社区安全" },
];

const directRows: readonly Definition[] = [
  { thai: "บ้านฉันอยู่ชั้นสี่", id: "baan-chan-yuu-chan-sii", roman: "baan chan yuu chan sii", chinese: "我家在四楼", partOfSpeech: "短语", theme: "楼层电梯", exampleThai: "บ้านฉันอยู่ชั้นสี่ ต้องขึ้นลิฟต์", exampleRoman: "baan chan yuu chan sii, dtawng kheun lip", exampleChinese: "我家在四楼，要坐电梯。", tag: "楼层" },
  { thai: "ห้องฉันอยู่ใกล้ลิฟต์", id: "haawng-chan-yuu-glai-lip", roman: "haawng chan yuu glai lip", chinese: "我的房间靠近电梯", partOfSpeech: "短语", theme: "楼层电梯", exampleThai: "ห้องฉันอยู่ใกล้ลิฟต์ เลยได้ยินเสียงคนเดิน", exampleRoman: "haawng chan yuu glai lip, loei dai-yin siiang khon doen", exampleChinese: "我的房间靠近电梯，所以听得到人走路的声音。", tag: "楼层" },
  { thai: "เพื่อนบ้านห้องข้าง ๆ ใจดี", id: "phuean-baan-haawng-khaang-khaang-jai-dii", roman: "phuean-baan haawng khaang khaang jai-dii", chinese: "隔壁邻居人很好", partOfSpeech: "短语", theme: "邻居", exampleThai: "เพื่อนบ้านห้องข้าง ๆ ใจดีและชอบทักทาย", exampleRoman: "phuean-baan haawng khaang khaang jai-dii lae chaawp thak-thaai", exampleChinese: "隔壁邻居人很好，也喜欢打招呼。", tag: "邻居" },
  { thai: "ขอจอดรถหน้าบ้านได้ไหม", id: "khaaw-jaawt-rot-naa-baan-dai-mai", roman: "khaaw jaawt rot naa baan dai mai", chinese: "可以在家门前停车吗", partOfSpeech: "短语", theme: "停车", exampleThai: "แขกถามว่า ขอจอดรถหน้าบ้านได้ไหม", exampleRoman: "khaaek thaam waa khaaw jaawt rot naa baan dai mai", exampleChinese: "客人问：“可以在家门前停车吗？”", tag: "停车" },
  { thai: "อย่าจอดรถขวางประตู", id: "yaa-jaawt-rot-khwaang-bpra-dtuu", roman: "yaa jaawt rot khwaang bpra-dtuu", chinese: "不要把车停在门口挡路", partOfSpeech: "短语", theme: "停车", exampleThai: "ป้ายหน้าบ้านเขียนว่าอย่าจอดรถขวางประตู", exampleRoman: "bpaai naa baan khiian waa yaa jaawt rot khwaang bpra-dtuu", exampleChinese: "家门口牌子写着不要把车停在门口挡路。", tag: "停车" },
  { thai: "แถวนี้กลางคืนเงียบดี", id: "thaeo-nii-glaang-kheun-ngiiap-dii", roman: "thaeo nii glaang-kheun ngiiap dii", chinese: "这一带夜里挺安静", partOfSpeech: "短语", theme: "住处周边", exampleThai: "ฉันชอบอยู่ที่นี่ เพราะแถวนี้กลางคืนเงียบดี", exampleRoman: "chan chaawp yuu thii-nii, phraw thaeo nii glaang-kheun ngiiap dii", exampleChinese: "我喜欢住这里，因为这一带夜里挺安静。", tag: "周边" },
  { thai: "แถวนี้ของกินเยอะ", id: "thaeo-nii-khaawng-gin-yoe", roman: "thaeo nii khaawng gin yoe", chinese: "这一带吃的很多", partOfSpeech: "短语", theme: "住处周边", exampleThai: "แถวนี้ของกินเยอะ เดินไปตลาดก็ใกล้", exampleRoman: "thaeo nii khaawng gin yoe, doen bpai dta-laat gaw glai", exampleChinese: "这一带吃的很多，走去市场也近。", tag: "周边" },
  { thai: "ทางเข้าบ้านหายากนิดหน่อย", id: "thaang-khao-baan-haa-yaak-nit-naawy", roman: "thaang khao baan haa yaak nit naawy", chinese: "进家的路有点难找", partOfSpeech: "短语", theme: "找地方", exampleThai: "ครั้งแรกทางเข้าบ้านหายากนิดหน่อย", exampleRoman: "khrang raaek thaang khao baan haa yaak nit naawy", exampleChinese: "第一次来时，进家的路有点难找。", tag: "找地方" },
  { thai: "ถ้าหลงให้โทรหาฉัน", id: "thaa-long-hai-thoo-haa-chan", roman: "thaa long hai thoo haa chan", chinese: "如果迷路就打给我", partOfSpeech: "短语", theme: "找地方", exampleThai: "ถ้าหลงให้โทรหาฉัน ฉันจะบอกทาง", exampleRoman: "thaa long hai thoo haa chan, chan ja baawk thaang", exampleChinese: "如果迷路就打给我，我会指路。", tag: "找地方" },
  { thai: "ยามหน้าหมู่บ้านรู้จักฉัน", id: "yaam-naa-muu-baan-ruu-jak-chan", roman: "yaam naa muu-baan ruu-jak chan", chinese: "小区门口保安认识我", partOfSpeech: "短语", theme: "社区安全", exampleThai: "ยามหน้าหมู่บ้านรู้จักฉัน เพราะฉันอยู่ที่นี่นานแล้ว", exampleRoman: "yaam naa muu-baan ruu-jak chan, phraw chan yuu thii-nii naan laaeo", exampleChinese: "小区门口保安认识我，因为我住这里很久了。", tag: "安全" },
];

const nearRows = places.map((place): Definition => ({
  thai: `บ้านฉันอยู่ใกล้${place.thai}`,
  id: `baan-chan-yuu-glai-${place.id}`,
  roman: `baan chan yuu glai ${place.roman}`,
  chinese: `我家靠近${place.chinese}`,
  partOfSpeech: "短语",
  theme: place.theme,
  exampleThai: `บ้านฉันอยู่ใกล้${place.thai} เดินไปไม่ไกล`,
  exampleRoman: `baan chan yuu glai ${place.roman}, doen bpai mai glai`,
  exampleChinese: `我家靠近${place.chinese}，走过去不远。`,
  tag: "附近",
}));

const askRows = places.map((place): Definition => ({
  thai: `${place.thai}ไปทางไหนคะ`,
  id: `${place.id}-bpai-thaang-nai-kha`,
  roman: `${place.roman} bpai thaang nai kha`,
  chinese: `${place.chinese}往哪边走`,
  partOfSpeech: "短语",
  theme: "找地方",
  exampleThai: `ขอโทษค่ะ ${place.thai}ไปทางไหนคะ`,
  exampleRoman: `khaaw-thoot kha, ${place.roman} bpai thaang nai kha`,
  exampleChinese: `不好意思，${place.chinese}往哪边走？`,
  tag: "找地方",
}));

const issueRows = issues.map((issue): Definition => ({
  thai: `แจ้งนิติว่า${issue.thai}`,
  id: `jaaeng-ni-ti-waa-${issue.id}`,
  roman: `jaaeng ni-ti waa ${issue.roman}`,
  chinese: `向物业说明${issue.chinese}`,
  partOfSpeech: "短语",
  theme: issue.theme,
  exampleThai: `ฉันแจ้งนิติว่า${issue.thai}และขอให้ช่วยดู`,
  exampleRoman: `chan jaaeng ni-ti waa ${issue.roman} lae khaaw hai chuai duu`,
  exampleChinese: `我向物业说明${issue.chinese}，并请他们帮忙看。`,
  tag: "物业",
}));

const neighborRows = issues.slice(0, 20).map((issue): Definition => ({
  thai: `คุยกับเพื่อนบ้านเรื่อง${issue.thai}`,
  id: `khui-gap-phuean-baan-rueang-${issue.id}`,
  roman: `khui gap phuean-baan rueang ${issue.roman}`,
  chinese: `和邻居谈${issue.chinese}的事`,
  partOfSpeech: "短语",
  theme: "邻居",
  exampleThai: `ตอนเย็นฉันคุยกับเพื่อนบ้านเรื่อง${issue.thai}`,
  exampleRoman: `dtaawn yen chan khui gap phuean-baan rueang ${issue.roman}`,
  exampleChinese: `傍晚我和邻居谈${issue.chinese}的事。`,
  tag: "邻居",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...nearRows,
  ...askRows,
  ...issueRows,
  ...neighborRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "住处周边", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段可用“住在……附近、……往哪边、向物业说明……”处理住处周边沟通。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于住处周边、邻居、楼层电梯、停车、噪音、附近设施、社区安全和找地方。"],
    tags,
    sourceRefs: HOME_NEIGHBORHOOD_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_HOME_NEIGHBORHOOD_01 = rows.map(toCandidate);
