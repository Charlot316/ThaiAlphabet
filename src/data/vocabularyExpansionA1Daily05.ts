export type VocabularyExpansionPartOfSpeech = "名词" | "形容词" | "短语";

export type VocabularyExpansionTheme = "衣物" | "颜色" | "日用品购物" | "尺码合身" | "材质";

export type VocabularyExpansionExample = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionRelatedWord = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionComparison = {
  kind: "近义" | "反义" | "易混" | "用法";
  target: VocabularyExpansionRelatedWord;
  distinctionZh: string;
};

export type VocabularyExpansionCollocation = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

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
  level: "a1" | "a2";
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

type RelationKind = "近义" | "反义" | "易混" | "用法";

type Row = readonly [
  thai: string,
  id: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionPartOfSpeech,
  theme: VocabularyExpansionTheme,
  level: "a1" | "a2",
  collocationThai: string,
  collocationRoman: string,
  collocationChinese: string,
  relatedThai?: string,
  relatedRoman?: string,
  relatedChinese?: string,
  relationKind?: RelationKind,
];

const LEXICON_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thaipod101-core100"];

const rows = [
  ["เสื้อยืด", "suea-yuet", "suea-yuet", "T恤", "名词", "衣物", "a1", "ใส่เสื้อยืด", "sai suea-yuet", "穿T恤", "เสื้อเชิ้ต", "suea-choet", "衬衫", "易混"],
  ["เสื้อเชิ้ต", "suea-choet", "suea-choet", "衬衫", "名词", "衣物", "a1", "รีดเสื้อเชิ้ต", "riit suea-choet", "熨衬衫", "เสื้อยืด", "suea-yuet", "T恤", "易混"],
  ["เสื้อโปโล", "suea-bpoo-loo", "suea-bpoo-loo", "Polo衫", "名词", "衣物", "a2", "ใส่เสื้อโปโล", "sai suea-bpoo-loo", "穿Polo衫", "เสื้อยืด", "suea-yuet", "T恤", "易混"],
  ["เสื้อกันหนาว", "suea-gan-naao", "suea-gan-naao", "保暖外套", "名词", "衣物", "a1", "หยิบเสื้อกันหนาว", "yip suea-gan-naao", "拿保暖外套", "เสื้อกันฝน", "suea-gan-fon", "雨衣", "易混"],
  ["เสื้อคลุม", "suea-khlum", "suea-khlum", "罩衫；外搭", "名词", "衣物", "a2", "ใส่เสื้อคลุม", "sai suea-khlum", "穿外搭", "เสื้อกันหนาว", "suea-gan-naao", "保暖外套", "近义"],
  ["เสื้อแขนยาว", "suea-khaaen-yaao", "suea-khaaen-yaao", "长袖上衣", "名词", "衣物", "a1", "ซื้อเสื้อแขนยาว", "sue suea-khaaen-yaao", "买长袖上衣", "เสื้อแขนสั้น", "suea-khaaen-san", "短袖上衣", "反义"],
  ["เสื้อแขนสั้น", "suea-khaaen-san", "suea-khaaen-san", "短袖上衣", "名词", "衣物", "a1", "ใส่เสื้อแขนสั้น", "sai suea-khaaen-san", "穿短袖上衣", "เสื้อแขนยาว", "suea-khaaen-yaao", "长袖上衣", "反义"],
  ["เสื้อกล้าม", "suea-glaam", "suea-glaam", "背心", "名词", "衣物", "a2", "ใส่เสื้อกล้าม", "sai suea-glaam", "穿背心", "เสื้อยืด", "suea-yuet", "T恤", "易混"],
  ["ชุดนอน", "chut-naawn", "chut-naawn", "睡衣", "名词", "衣物", "a1", "เปลี่ยนชุดนอน", "bplian chut-naawn", "换睡衣", "ชุดทำงาน", "chut-tham-ngaan", "工作服", "反义"],
  ["ชุดนักเรียน", "chut-nak-riian", "chut-nak-riian", "校服", "名词", "衣物", "a1", "ซักชุดนักเรียน", "sak chut-nak-riian", "洗校服", "ชุดทำงาน", "chut-tham-ngaan", "工作服", "易混"],
  ["ชุดทำงาน", "chut-tham-ngaan", "chut-tham-ngaan", "上班穿的衣服", "名词", "衣物", "a1", "เตรียมชุดทำงาน", "dtriiam chut-tham-ngaan", "准备上班衣服", "ชุดนักเรียน", "chut-nak-riian", "校服", "易混"],
  ["ชุดกีฬา", "chut-gii-laa", "chut-gii-laa", "运动服", "名词", "衣物", "a2", "ใส่ชุดกีฬา", "sai chut-gii-laa", "穿运动服", "ชุดทำงาน", "chut-tham-ngaan", "上班衣服", "易混"],
  ["ชุดชั้นใน", "chut-chan-nai", "chut-chan-nai", "内衣套装", "名词", "衣物", "a2", "ซื้อชุดชั้นใน", "sue chut-chan-nai", "买内衣", "เสื้อใน", "suea-nai", "胸衣", "近义"],
  ["เสื้อใน", "suea-nai", "suea-nai", "胸衣；内衣上衣", "名词", "衣物", "a2", "ซักเสื้อใน", "sak suea-nai", "洗胸衣", "ชุดชั้นใน", "chut-chan-nai", "内衣套装", "近义"],
  ["กางเกงใน", "gaang-geeng-nai", "gaang-geeng-nai", "内裤", "名词", "衣物", "a2", "พับกางเกงใน", "phap gaang-geeng-nai", "叠内裤", "กางเกงขาสั้น", "gaang-geeng-khaa-san", "短裤", "易混"],
  ["กางเกงขาสั้น", "gaang-geeng-khaa-san", "gaang-geeng-khaa-san", "短裤", "名词", "衣物", "a1", "ใส่กางเกงขาสั้น", "sai gaang-geeng-khaa-san", "穿短裤", "กางเกงขายาว", "gaang-geeng-khaa-yaao", "长裤", "反义"],
  ["กางเกงขายาว", "gaang-geeng-khaa-yaao", "gaang-geeng-khaa-yaao", "长裤", "名词", "衣物", "a1", "ซื้อกางเกงขายาว", "sue gaang-geeng-khaa-yaao", "买长裤", "กางเกงขาสั้น", "gaang-geeng-khaa-san", "短裤", "反义"],
  ["กางเกงยีนส์", "gaang-geeng-yiin", "gaang-geeng-yiin", "牛仔裤", "名词", "衣物", "a1", "ใส่กางเกงยีนส์", "sai gaang-geeng-yiin", "穿牛仔裤", "กางเกงวอร์ม", "gaang-geeng-waawm", "运动长裤", "易混"],
  ["กางเกงวอร์ม", "gaang-geeng-waawm", "gaang-geeng-waawm", "运动长裤", "名词", "衣物", "a2", "ซักกางเกงวอร์ม", "sak gaang-geeng-waawm", "洗运动长裤", "ชุดกีฬา", "chut-gii-laa", "运动服", "近义"],
  ["กางเกงเล", "gaang-geeng-lee", "gaang-geeng-lee", "宽松渔夫裤", "名词", "衣物", "a2", "ใส่กางเกงเล", "sai gaang-geeng-lee", "穿渔夫裤", "กางเกงยีนส์", "gaang-geeng-yiin", "牛仔裤", "易混"],
  ["กระโปรงยาว", "gra-bproong-yaao", "gra-bproong-yaao", "长裙", "名词", "衣物", "a1", "เลือกกระโปรงยาว", "lueak gra-bproong-yaao", "选长裙", "กระโปรงสั้น", "gra-bproong-san", "短裙", "反义"],
  ["กระโปรงสั้น", "gra-bproong-san", "gra-bproong-san", "短裙", "名词", "衣物", "a1", "ใส่กระโปรงสั้น", "sai gra-bproong-san", "穿短裙", "กระโปรงยาว", "gra-bproong-yaao", "长裙", "反义"],
  ["เดรส", "dreet", "dreet", "连衣裙", "名词", "衣物", "a1", "ลองเดรส", "laawng dreet", "试连衣裙", "กระโปรงยาว", "gra-bproong-yaao", "长裙", "易混"],
  ["ถุงมือ", "thung-mue", "thung-mue", "手套", "名词", "衣物", "a1", "ใส่ถุงมือ", "sai thung-mue", "戴手套", "ถุงเท้า", "thung-thaao", "袜子", "易混"],
  ["ผ้าพันคอ", "phaa-phan-khaaw", "phaa-phan-khaaw", "围巾", "名词", "衣物", "a1", "พันผ้าพันคอ", "phan phaa-phan-khaaw", "围围巾", "เสื้อกันหนาว", "suea-gan-naao", "保暖外套", "近义"],
  ["เข็มขัด", "khem-khat", "khem-khat", "皮带；腰带", "名词", "衣物", "a1", "คาดเข็มขัด", "khaat khem-khat", "系皮带", "กระเป๋าสตางค์", "gra-bpao-sa-dtaang", "钱包", "用法"],
  ["กระเป๋าสตางค์", "gra-bpao-sa-dtaang", "gra-bpao-sa-dtaang", "钱包", "名词", "衣物", "a1", "พกกระเป๋าสตางค์", "phok gra-bpao-sa-dtaang", "带钱包", "กระเป๋าผ้า", "gra-bpao-phaa", "布包", "易混"],
  ["นาฬิกาข้อมือ", "naa-li-gaa-khaaw-mue", "naa-li-gaa-khaaw-mue", "手表", "名词", "衣物", "a1", "ใส่นาฬิกาข้อมือ", "sai naa-li-gaa-khaaw-mue", "戴手表", "กำไล", "gam-lai", "手镯", "易混"],
  ["สร้อยคอ", "saawy-khaaw", "saawy-khaaw", "项链", "名词", "衣物", "a1", "ใส่สร้อยคอ", "sai saawy-khaaw", "戴项链", "กำไล", "gam-lai", "手镯", "易混"],
  ["ต่างหู", "dtaang-huu", "dtaang-huu", "耳环", "名词", "衣物", "a1", "ใส่ต่างหู", "sai dtaang-huu", "戴耳环", "แหวน", "waaen", "戒指", "易混"],
  ["แหวน", "waaen", "waaen", "戒指", "名词", "衣物", "a1", "ใส่แหวน", "sai waaen", "戴戒指", "ต่างหู", "dtaang-huu", "耳环", "易混"],
  ["กำไล", "gam-lai", "gam-lai", "手镯；手链", "名词", "衣物", "a2", "ใส่กำไล", "sai gam-lai", "戴手镯", "นาฬิกาข้อมือ", "naa-li-gaa-khaaw-mue", "手表", "易混"],
  ["หน้ากากอนามัย", "naa-gaak-a-naa-mai", "naa-gaak-a-naa-mai", "医用口罩", "名词", "衣物", "a1", "ใส่หน้ากากอนามัย", "sai naa-gaak-a-naa-mai", "戴医用口罩", "ยาดม", "yaa-dom", "嗅闻药", "用法"],
  ["ผ้ากันเปื้อน", "phaa-gan-bpeuan", "phaa-gan-bpeuan", "围裙", "名词", "衣物", "a2", "ใส่ผ้ากันเปื้อน", "sai phaa-gan-bpeuan", "穿围裙", "ชุดทำงาน", "chut-tham-ngaan", "工作服", "用法"],
  ["ชุดว่ายน้ำ", "chut-waai-naam", "chut-waai-naam", "泳衣", "名词", "衣物", "a2", "เตรียมชุดว่ายน้ำ", "dtriiam chut-waai-naam", "准备泳衣", "ชุดกีฬา", "chut-gii-laa", "运动服", "近义"],
  ["เสื้อกันฝน", "suea-gan-fon", "suea-gan-fon", "雨衣", "名词", "衣物", "a1", "หยิบเสื้อกันฝน", "yip suea-gan-fon", "拿雨衣", "เสื้อกันหนาว", "suea-gan-naao", "保暖外套", "易混"],
  ["รองเท้าแตะ", "raawng-thaao-dtae", "raawng-thaao-dtae", "拖鞋；凉拖", "名词", "衣物", "a1", "ใส่รองเท้าแตะ", "sai raawng-thaao-dtae", "穿拖鞋", "รองเท้าผ้าใบ", "raawng-thaao-phaa-bai", "运动鞋", "易混"],
  ["รองเท้าผ้าใบ", "raawng-thaao-phaa-bai", "raawng-thaao-phaa-bai", "运动鞋", "名词", "衣物", "a1", "ซักรองเท้าผ้าใบ", "sak raawng-thaao-phaa-bai", "洗运动鞋", "รองเท้าหนัง", "raawng-thaao-nang", "皮鞋", "易混"],
  ["รองเท้าหนัง", "raawng-thaao-nang", "raawng-thaao-nang", "皮鞋", "名词", "衣物", "a2", "ขัดรองเท้าหนัง", "khat raawng-thaao-nang", "擦皮鞋", "รองเท้าผ้าใบ", "raawng-thaao-phaa-bai", "运动鞋", "易混"],
  ["รองเท้าส้นสูง", "raawng-thaao-son-sung", "raawng-thaao-son-sung", "高跟鞋", "名词", "衣物", "a2", "ลองรองเท้าส้นสูง", "laawng raawng-thaao-son-sung", "试高跟鞋", "รองเท้าแตะ", "raawng-thaao-dtae", "拖鞋", "易混"],
  ["สีแดง", "sii-daaeng", "sii-daaeng", "红色", "名词", "颜色", "a1", "เสื้อสีแดง", "suea sii-daaeng", "红色上衣", "สีชมพู", "sii-chom-phuu", "粉色", "易混"],
  ["สีขาว", "sii-khaao", "sii-khaao", "白色", "名词", "颜色", "a1", "รองเท้าสีขาว", "raawng-thaao sii-khaao", "白色鞋子", "สีดำ", "sii-dam", "黑色", "反义"],
  ["สีดำ", "sii-dam", "sii-dam", "黑色", "名词", "颜色", "a1", "กระเป๋าสีดำ", "gra-bpao sii-dam", "黑色包", "สีขาว", "sii-khaao", "白色", "反义"],
  ["สีเขียว", "sii-khiaao", "sii-khiaao", "绿色", "名词", "颜色", "a1", "กระโปรงสีเขียว", "gra-bproong sii-khiaao", "绿色裙子", "สีฟ้า", "sii-faa", "浅蓝色", "易混"],
  ["สีเหลือง", "sii-lueang", "sii-lueang", "黄色", "名词", "颜色", "a1", "เสื้อสีเหลือง", "suea sii-lueang", "黄色上衣", "สีทอง", "sii-thaawng", "金色", "易混"],
  ["สีชมพู", "sii-chom-phuu", "sii-chom-phuu", "粉色", "名词", "颜色", "a1", "เดรสสีชมพู", "dreet sii-chom-phuu", "粉色连衣裙", "สีแดง", "sii-daaeng", "红色", "易混"],
  ["สีม่วง", "sii-muang", "sii-muang", "紫色", "名词", "颜色", "a1", "ผ้าพันคอสีม่วง", "phaa-phan-khaaw sii-muang", "紫色围巾", "สีน้ำเงิน", "sii-nam-ngern", "深蓝色", "易混"],
  ["สีน้ำเงิน", "sii-nam-ngern", "sii-nam-ngern", "深蓝色", "名词", "颜色", "a1", "กางเกงสีน้ำเงิน", "gaang-geeng sii-nam-ngern", "深蓝色裤子", "สีฟ้า", "sii-faa", "浅蓝色", "易混"],
  ["สีฟ้า", "sii-faa", "sii-faa", "浅蓝色；天蓝色", "名词", "颜色", "a1", "เสื้อสีฟ้า", "suea sii-faa", "浅蓝色上衣", "สีน้ำเงิน", "sii-nam-ngern", "深蓝色", "易混"],
  ["สีส้ม", "sii-som", "sii-som", "橙色", "名词", "颜色", "a1", "ถุงผ้าสีส้ม", "thung-phaa sii-som", "橙色布袋", "สีเหลือง", "sii-lueang", "黄色", "易混"],
  ["สีน้ำตาล", "sii-nam-dtaan", "sii-nam-dtaan", "棕色", "名词", "颜色", "a1", "รองเท้าสีน้ำตาล", "raawng-thaao sii-nam-dtaan", "棕色鞋子", "สีดำ", "sii-dam", "黑色", "易混"],
  ["สีเทา", "sii-thao", "sii-thao", "灰色", "名词", "颜色", "a1", "เสื้อคลุมสีเทา", "suea-khlum sii-thao", "灰色外搭", "สีดำ", "sii-dam", "黑色", "易混"],
  ["สีทอง", "sii-thaawng", "sii-thaawng", "金色", "名词", "颜色", "a2", "แหวนสีทอง", "waaen sii-thaawng", "金色戒指", "สีเงิน", "sii-ngern", "银色", "易混"],
  ["สีเงิน", "sii-ngern", "sii-ngern", "银色", "名词", "颜色", "a2", "นาฬิกาสีเงิน", "naa-li-gaa sii-ngern", "银色手表", "สีทอง", "sii-thaawng", "金色", "易混"],
  ["ลายดอก", "laai-daawk", "laai-daawk", "花纹；花朵图案", "名词", "颜色", "a2", "เสื้อลายดอก", "suea laai-daawk", "花纹上衣", "สีพื้น", "sii-phuen", "纯色", "反义"],
  ["กระดาษชำระ", "gra-daat-cham-ra", "gra-daat-cham-ra", "卫生纸", "名词", "日用品购物", "a1", "ซื้อกระดาษชำระ", "sue gra-daat-cham-ra", "买卫生纸", "กระดาษทิชชู่", "gra-daat-thit-chuu", "纸巾", "近义"],
  ["ถุงพลาสติก", "thung-phlaat-dtik", "thung-phlaat-dtik", "塑料袋", "名词", "日用品购物", "a1", "ใช้ถุงพลาสติก", "chai thung-phlaat-dtik", "使用塑料袋", "ถุงผ้า", "thung-phaa", "布袋", "易混"],
  ["ถุงผ้า", "thung-phaa", "thung-phaa", "布袋", "名词", "日用品购物", "a1", "พกถุงผ้า", "phok thung-phaa", "带布袋", "ถุงพลาสติก", "thung-phlaat-dtik", "塑料袋", "反义"],
  ["กล่องกระดาษ", "glaawng-gra-daat", "glaawng-gra-daat", "纸盒", "名词", "日用品购物", "a2", "เก็บกล่องกระดาษ", "gep glaawng-gra-daat", "收纸盒", "ขวดพลาสติก", "khuat-phlaat-dtik", "塑料瓶", "易混"],
  ["ขวดพลาสติก", "khuat-phlaat-dtik", "khuat-phlaat-dtik", "塑料瓶", "名词", "日用品购物", "a1", "ทิ้งขวดพลาสติก", "thing khuat-phlaat-dtik", "扔塑料瓶", "กระป๋องน้ำ", "gra-bpaawng-naam", "饮料罐", "易混"],
  ["กระป๋องน้ำ", "gra-bpaawng-naam", "gra-bpaawng-naam", "饮料罐", "名词", "日用品购物", "a2", "เปิดกระป๋องน้ำ", "bpoet gra-bpaawng-naam", "打开饮料罐", "ขวดพลาสติก", "khuat-phlaat-dtik", "塑料瓶", "易混"],
  ["แพ็กน้ำดื่ม", "phaek-naam-deum", "phaek-naam-deum", "一提饮用水", "名词", "日用品购物", "a1", "ยกแพ็กน้ำดื่ม", "yok phaek-naam-deum", "搬一提饮用水", "ขวดน้ำ", "khuat-naam", "水瓶", "用法"],
  ["ซองพลาสติก", "saawng-phlaat-dtik", "saawng-phlaat-dtik", "塑料小袋；包装袋", "名词", "日用品购物", "a2", "ฉีกซองพลาสติก", "chiik saawng-phlaat-dtik", "撕开塑料袋", "ถุงพลาสติก", "thung-phlaat-dtik", "塑料袋", "易混"],
  ["หลอดดูด", "laawt-duut", "laawt-duut", "吸管", "名词", "日用品购物", "a1", "หยิบหลอดดูด", "yip laawt-duut", "拿吸管", "ช้อน", "chaawn", "勺子", "易混"],
  ["เชือกฟาง", "cheuak-faang", "cheuak-faang", "塑料捆绳", "名词", "日用品购物", "a2", "มัดของด้วยเชือกฟาง", "mat khaawng duai cheuak-faang", "用塑料绳捆东西", "เทปกาว", "theep-gaao", "胶带", "用法"],
  ["เทปกาว", "theep-gaao", "theep-gaao", "胶带", "名词", "日用品购物", "a1", "ติดเทปกาว", "dtit theep-gaao", "贴胶带", "กาวแท่ง", "gaao-thaeng", "固体胶", "易混"],
  ["กาวแท่ง", "gaao-thaeng", "gaao-thaeng", "固体胶", "名词", "日用品购物", "a1", "ใช้กาวแท่ง", "chai gaao-thaeng", "使用固体胶", "เทปกาว", "theep-gaao", "胶带", "易混"],
  ["กรรไกรตัดผ้า", "gan-grai-dtat-phaa", "gan-grai-dtat-phaa", "剪布剪刀", "名词", "日用品购物", "a2", "ใช้กรรไกรตัดผ้า", "chai gan-grai-dtat-phaa", "用剪布剪刀", "กรรไกร", "gan-grai", "剪刀", "近义"],
  ["เข็มเย็บผ้า", "khem-yep-phaa", "khem-yep-phaa", "缝衣针", "名词", "日用品购物", "a2", "เก็บเข็มเย็บผ้า", "gep khem-yep-phaa", "收好缝衣针", "ด้ายเย็บผ้า", "daai-yep-phaa", "缝纫线", "用法"],
  ["ด้ายเย็บผ้า", "daai-yep-phaa", "daai-yep-phaa", "缝纫线", "名词", "日用品购物", "a2", "ซื้อด้ายเย็บผ้า", "sue daai-yep-phaa", "买缝纫线", "เข็มเย็บผ้า", "khem-yep-phaa", "缝衣针", "用法"],
  ["กระดุมเสื้อ", "gra-dum-suea", "gra-dum-suea", "衣服纽扣", "名词", "日用品购物", "a2", "เย็บกระดุมเสื้อ", "yep gra-dum-suea", "缝衣服纽扣", "ซิปเสื้อ", "sip-suea", "衣服拉链", "易混"],
  ["ซิปเสื้อ", "sip-suea", "sip-suea", "衣服拉链", "名词", "日用品购物", "a2", "รูดซิปเสื้อ", "ruut sip-suea", "拉衣服拉链", "กระดุมเสื้อ", "gra-dum-suea", "衣服纽扣", "易混"],
  ["ร่มพับ", "rom-phap", "rom-phap", "折叠伞", "名词", "日用品购物", "a1", "พกร่มพับ", "phok rom-phap", "带折叠伞", "เสื้อกันฝน", "suea-gan-fon", "雨衣", "近义"],
  ["พวงกุญแจ", "phuang-gun-jaae", "phuang-gun-jaae", "钥匙圈", "名词", "日用品购物", "a1", "ห้อยพวงกุญแจ", "haawy phuang-gun-jaae", "挂钥匙圈", "กุญแจ", "gun-jaae", "钥匙", "用法"],
  ["ไฟฉายเล็ก", "fai-chaai-lek", "fai-chaai-lek", "小手电筒", "名词", "日用品购物", "a1", "เปิดไฟฉายเล็ก", "bpoet fai-chaai-lek", "打开小手电筒", "ถ่านไฟฉาย", "thaan-fai-chaai", "电池", "用法"],
  ["ถ่านไฟฉาย", "thaan-fai-chaai", "thaan-fai-chaai", "电池", "名词", "日用品购物", "a1", "เปลี่ยนถ่านไฟฉาย", "bplian thaan-fai-chaai", "换电池", "ไฟฉายเล็ก", "fai-chaai-lek", "小手电筒", "用法"],
  ["สมุดโน้ต", "sa-mut-noot", "sa-mut-noot", "笔记本", "名词", "日用品购物", "a1", "จดในสมุดโน้ต", "jot nai sa-mut-noot", "记在笔记本里", "สมุด", "sa-mut", "本子", "近义"],
  ["ปฏิทินตั้งโต๊ะ", "bpa-dti-thin-dtang-dto", "bpa-dti-thin-dtang-dto", "台历", "名词", "日用品购物", "a2", "ดูปฏิทินตั้งโต๊ะ", "duu bpa-dti-thin-dtang-dto", "看台历", "ปฏิทิน", "bpa-dti-thin", "日历", "近义"],
  ["ซองจดหมาย", "saawng-jot-maai", "saawng-jot-maai", "信封", "名词", "日用品购物", "a1", "ใส่จดหมายในซองจดหมาย", "sai jot-maai nai saawng-jot-maai", "把信放进信封里", "แสตมป์", "sa-dtaaem", "邮票", "用法"],
  ["แสตมป์", "sa-dtaaem", "sa-dtaaem", "邮票", "名词", "日用品购物", "a2", "ติดแสตมป์", "dtit sa-dtaaem", "贴邮票", "ซองจดหมาย", "saawng-jot-maai", "信封", "用法"],
  ["ไซซ์เล็ก", "sai-lek", "sai-lek", "小号", "短语", "尺码合身", "a1", "เลือกไซซ์เล็ก", "lueak sai-lek", "选小号", "ไซซ์ใหญ่", "sai-yai", "大号", "反义"],
  ["ไซซ์กลาง", "sai-glaang", "sai-glaang", "中号", "短语", "尺码合身", "a1", "ลองไซซ์กลาง", "laawng sai-glaang", "试中号", "ไซซ์เล็ก", "sai-lek", "小号", "易混"],
  ["ไซซ์ใหญ่", "sai-yai", "sai-yai", "大号", "短语", "尺码合身", "a1", "ถามหาไซซ์ใหญ่", "thaam haa sai-yai", "问有没有大号", "ไซซ์เล็ก", "sai-lek", "小号", "反义"],
  ["พอดีตัว", "phaaw-dii-dtua", "phaaw-dii-dtua", "合身", "形容词", "尺码合身", "a1", "ใส่พอดีตัว", "sai phaaw-dii-dtua", "穿着合身", "หลวม", "luaam", "松", "反义"],
  ["หลวม", "luaam", "luaam", "松；宽", "形容词", "尺码合身", "a1", "ใส่หลวม", "sai luaam", "穿着宽松", "คับ", "khap", "紧", "反义"],
  ["คับ", "khap-tight", "khap", "紧；穿着小", "形容词", "尺码合身", "a1", "ใส่คับ", "sai khap", "穿着紧", "หลวม", "luaam", "松", "反义"],
  ["ยาวเกินไป", "yaao-goen-bpai", "yaao goen bpai", "太长", "短语", "尺码合身", "a1", "ยาวเกินไป", "yaao goen bpai", "太长", "สั้นเกินไป", "san-goen-bpai", "太短", "反义"],
  ["สั้นเกินไป", "san-goen-bpai", "san goen bpai", "太短", "短语", "尺码合身", "a1", "สั้นเกินไป", "san goen bpai", "太短", "ยาวเกินไป", "yaao-goen-bpai", "太长", "反义"],
  ["หนา", "naa-thick", "naa", "厚", "形容词", "材质", "a1", "ผ้าหนา", "phaa naa", "厚布", "ผ้าบาง", "phaa-baang", "薄布", "反义"],
  ["ผ้าบาง", "phaa-baang", "phaa-baang", "薄布；布料薄", "短语", "材质", "a1", "เสื้อผ้าบาง", "suea phaa-baang", "薄布上衣", "หนา", "naa-thick", "厚", "反义"],
  ["นุ่ม", "num", "num", "柔软", "形容词", "材质", "a1", "ผ้านุ่ม", "phaa num", "柔软的布", "แข็งแรง", "khaeng-raaeng", "结实", "易混"],
  ["แข็งแรง", "khaeng-raaeng", "khaeng-raaeng", "结实；耐用", "形容词", "材质", "a1", "กระเป๋าแข็งแรง", "gra-bpao khaeng-raaeng", "结实的包", "นุ่ม", "num", "柔软", "易混"],
  ["ผ้าฝ้าย", "phaa-faai", "phaa-faai", "棉布", "名词", "材质", "a2", "เสื้อผ้าฝ้าย", "suea phaa-faai", "棉布上衣", "ผ้าไหม", "phaa-mai", "丝绸", "易混"],
  ["ผ้าไหม", "phaa-mai", "phaa-mai", "丝绸", "名词", "材质", "a2", "ผ้าพันคอผ้าไหม", "phaa-phan-khaaw phaa-mai", "丝绸围巾", "ผ้าฝ้าย", "phaa-faai", "棉布", "易混"],
  ["ผ้ายีนส์", "phaa-yiin", "phaa-yiin", "牛仔布", "名词", "材质", "a2", "กางเกงผ้ายีนส์", "gaang-geeng phaa-yiin", "牛仔布裤子", "ผ้าฝ้าย", "phaa-faai", "棉布", "易混"],
  ["หนังแท้", "nang-thaae", "nang-thaae", "真皮", "名词", "材质", "a2", "กระเป๋าหนังแท้", "gra-bpao nang-thaae", "真皮包", "พลาสติก", "phlaat-dtik", "塑料", "易混"],
  ["พลาสติก", "phlaat-dtik", "phlaat-dtik", "塑料", "名词", "材质", "a1", "กล่องพลาสติก", "glaawng phlaat-dtik", "塑料盒", "โลหะ", "loo-ha", "金属", "易混"],
  ["ยาง", "yaang-rubber", "yaang", "橡胶", "名词", "材质", "a1", "รองเท้ายาง", "raawng-thaao yaang", "橡胶鞋", "พลาสติก", "phlaat-dtik", "塑料", "易混"],
  ["โลหะ", "loo-ha", "loo-ha", "金属", "名词", "材质", "a2", "กล่องโลหะ", "glaawng loo-ha", "金属盒", "พลาสติก", "phlaat-dtik", "塑料", "易混"],
  ["ไม้", "mai-wood", "mai", "木头；木质", "名词", "材质", "a1", "กล่องไม้", "glaawng mai", "木盒", "โลหะ", "loo-ha", "金属", "易混"],
] as const satisfies readonly Row[];

const relationFor = (row: Row): VocabularyExpansionComparison[] => {
  const [, , , , , , , , , , relatedThai, relatedRoman, relatedChinese, relationKind] = row;
  if (!relatedThai || !relatedChinese || !relationKind) return [];

  return [
    {
      kind: relationKind,
      target: { thai: relatedThai, roman: relatedRoman, chinese: relatedChinese },
      distinctionZh: `${row[0]} 和 ${relatedThai} 常在衣物、颜色或日用品语境中一起比较，学习时要看实际搭配和使用场合。`,
    },
  ];
};

const exampleFor = (row: Row): VocabularyExpansionExample => {
  const [thai, , roman, chinese, , theme] = row;
  if (theme === "颜色") {
    return {
      thai: `พี่สาวชอบ${thai} เพราะเข้ากับเสื้อผ้าที่ใส่ไปทำงาน`,
      roman: `phii-saao chaawp ${roman} phraw khao gap suea-phaa thii sai bpai tham-ngaan`,
      chinese: `姐姐喜欢${chinese}，因为它和上班穿的衣服很搭。`,
    };
  }
  if (theme === "日用品购物") {
    return {
      thai: `พ่อซื้อ${thai}ที่ร้านใกล้บ้านหลังเลิกงาน`,
      roman: `phaaw sue ${roman} thii raan glai baan lang loek-ngaan`,
      chinese: `爸爸下班后在家附近的店买${chinese}。`,
    };
  }
  if (theme === "尺码合身") {
    return {
      thai: `เสื้อตัวนี้${thai}สำหรับฉัน จึงต้องลองอีกตัวก่อนซื้อ`,
      roman: `suea dtua nii ${roman} sam-rap chan jeung dtawng laawng iik dtua gaawn sue`,
      chinese: `这件上衣对我来说${chinese}，所以买之前还要再试另一件。`,
    };
  }
  if (theme === "材质") {
    return {
      thai: `ฉันเลือก${thai}เพราะใช้ได้นานและดูแลง่าย`,
      roman: `chan lueak ${roman} phraw chai dai naan lae duu-laae ngaai`,
      chinese: `我选${chinese}，因为耐用而且容易打理。`,
    };
  }

  return {
    thai: `ร้านนี้มี${thai}หลายแบบ และฉันลองดูขนาดก่อนซื้อ`,
    roman: `raan nii mii ${roman} laai baaep lae chan laawng duu kha-naat gaawn sue`,
    chinese: `这家店有很多种${chinese}，我买之前先试试看尺码。`,
  };
};

const candidateFromRow = (row: Row, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, partOfSpeech, theme, level, collocationThai, collocationRoman, collocationChinese] = row;
  const collocations = [{ thai: collocationThai, roman: collocationRoman, chinese: collocationChinese }];
  const comparisons = relationFor(row);
  const antonyms = comparisons.filter((comparison) => comparison.kind === "反义").map((comparison) => comparison.target);
  const synonyms = comparisons.filter((comparison) => comparison.kind === "近义").map((comparison) => comparison.target);
  const tags = [theme, partOfSpeech, "日常购物", level];
  const usageNotesZh = [
    `${thai} 是泰语日常购物和穿着场景里的真实词项，先记住搭配“${collocationThai}”，再扩展到颜色、尺码和材质表达。`,
  ];

  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level,
    priority: index + 1,
    senses: [
      {
        id: "daily-use",
        chinese: `${chinese}；用于穿衣、颜色描述、购买日用品或说明材质/尺码`,
        examples: [exampleFor(row)],
        synonyms,
        antonyms,
        comparisons,
        collocations,
        usageNotesZh,
        tags,
      },
    ],
    synonyms,
    antonyms,
    comparisons,
    collocations,
    usageNotesZh,
    tags,
    sourceRefs: LEXICON_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_DAILY_05 = rows.map(candidateFromRow) satisfies VocabularyExpansionCandidate[];
