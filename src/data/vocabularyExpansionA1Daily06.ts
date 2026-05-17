export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";

export type VocabularyExpansionTheme = "身体部位" | "症状" | "诊所药房" | "居家缓解";

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
  ["ใบหน้า", "bai-naa", "bai-naa", "脸部；面部", "名词", "身体部位", "a1", "ล้างใบหน้า", "laang bai-naa", "洗脸部", "หน้าผาก", "naa-phaak", "额头", "用法"],
  ["หน้าผาก", "naa-phaak", "naa-phaak", "额头", "名词", "身体部位", "a1", "แตะหน้าผาก", "dtae naa-phaak", "摸额头", "ใบหน้า", "bai-naa", "脸部", "用法"],
  ["แก้ม", "gaaem", "gaaem", "脸颊", "名词", "身体部位", "a1", "เช็ดแก้ม", "chet gaaem", "擦脸颊", "ปลายคาง", "bplaai-khaang", "下巴尖", "易混"],
  ["ปลายคาง", "bplaai-khaang", "bplaai-khaang", "下巴尖", "名词", "身体部位", "a1", "จับปลายคาง", "jap bplaai-khaang", "摸下巴尖", "แก้ม", "gaaem", "脸颊", "易混"],
  ["ริมฝีปาก", "rim-fii-bpaak", "rim-fii-bpaak", "嘴唇", "名词", "身体部位", "a1", "ทาริมฝีปาก", "thaa rim-fii-bpaak", "涂嘴唇", "ลิ้น", "lin", "舌头", "易混"],
  ["ลิ้น", "lin", "lin", "舌头", "名词", "身体部位", "a1", "กัดลิ้น", "gat lin", "咬到舌头", "ฟันหน้า", "fan-naa", "门牙", "易混"],
  ["ฟันหน้า", "fan-naa", "fan-naa", "门牙", "名词", "身体部位", "a1", "แปรงฟันหน้า", "bpraaeng fan-naa", "刷门牙", "ฟันกราม", "fan-graam", "臼齿", "易混"],
  ["ฟันกราม", "fan-graam", "fan-graam", "臼齿；后槽牙", "名词", "身体部位", "a2", "ปวดฟันกราม", "bpuat fan-graam", "臼齿痛", "ฟันหน้า", "fan-naa", "门牙", "易混"],
  ["เหงือก", "ngueak", "ngueak", "牙龈", "名词", "身体部位", "a2", "เจ็บเหงือก", "jep ngueak", "牙龈痛", "ฟันกราม", "fan-graam", "臼齿", "用法"],
  ["ลำคอ", "lam-khaaw", "lam-khaaw", "喉咙部位；颈喉", "名词", "身体部位", "a2", "ดูแลลำคอ", "duu-laae lam-khaaw", "照顾喉咙", "แสบคอ", "saaep-khaaw", "喉咙灼痛", "用法"],
  ["ไหล่ซ้าย", "lai-saai", "lai-saai", "左肩", "名词", "身体部位", "a1", "ปวดไหล่ซ้าย", "bpuat lai-saai", "左肩痛", "ไหล่ขวา", "lai-khwaa", "右肩", "反义"],
  ["ไหล่ขวา", "lai-khwaa", "lai-khwaa", "右肩", "名词", "身体部位", "a1", "นวดไหล่ขวา", "nuat lai-khwaa", "按摩右肩", "ไหล่ซ้าย", "lai-saai", "左肩", "反义"],
  ["ข้อศอก", "khaaw-saawk", "khaaw-saawk", "肘部", "名词", "身体部位", "a1", "งอข้อศอก", "ngaaw khaaw-saawk", "弯肘", "ข้อมือ", "khaaw-mue", "手腕", "易混"],
  ["ข้อมือ", "khaaw-mue", "khaaw-mue", "手腕", "名词", "身体部位", "a1", "เจ็บข้อมือ", "jep khaaw-mue", "手腕痛", "ข้อเท้า", "khaaw-thaao", "脚踝", "易混"],
  ["นิ้วมือ", "niu-mue", "niu-mue", "手指", "名词", "身体部位", "a1", "ล้างนิ้วมือ", "laang niu-mue", "洗手指", "เล็บมือ", "lep-mue", "手指甲", "用法"],
  ["เล็บมือ", "lep-mue", "lep-mue", "手指甲", "名词", "身体部位", "a1", "ตัดเล็บมือ", "dtat lep-mue", "剪手指甲", "นิ้วมือ", "niu-mue", "手指", "用法"],
  ["หน้าอก", "naa-ok", "naa-ok", "胸口", "名词", "身体部位", "a1", "เจ็บหน้าอก", "jep naa-ok", "胸口痛", "ปอด", "bpaawt", "肺", "用法"],
  ["ช่วงเอว", "chuang-eeo", "chuang-eeo", "腰部一带", "名词", "身体部位", "a2", "ปวดช่วงเอว", "bpuat chuang-eeo", "腰部一带痛", "สะโพก", "sa-phook", "臀部", "易混"],
  ["สะโพก", "sa-phook", "sa-phook", "臀部；髋部", "名词", "身体部位", "a2", "เจ็บสะโพก", "jep sa-phook", "臀/髋部痛", "ช่วงเอว", "chuang-eeo", "腰部一带", "易混"],
  ["หัวเข่า", "hua-khao", "hua-khao", "膝盖", "名词", "身体部位", "a1", "งอหัวเข่า", "ngaaw hua-khao", "弯膝盖", "ข้อเท้า", "khaaw-thaao", "脚踝", "易混"],
  ["ข้อเท้า", "khaaw-thaao", "khaaw-thaao", "脚踝", "名词", "身体部位", "a1", "พลิกข้อเท้า", "phlik khaaw-thaao", "扭到脚踝", "ข้อมือ", "khaaw-mue", "手腕", "易混"],
  ["ส้นเท้า", "son-thaao", "son-thaao", "脚跟", "名词", "身体部位", "a1", "เจ็บส้นเท้า", "jep son-thaao", "脚跟痛", "ข้อเท้า", "khaaw-thaao", "脚踝", "易混"],
  ["ผิวหนัง", "phiu-nang", "phiu-nang", "皮肤", "名词", "身体部位", "a1", "ดูแลผิวหนัง", "duu-laae phiu-nang", "护理皮肤", "ผื่นขึ้น", "pheun-kheun", "起疹子", "用法"],
  ["เส้นผม", "sen-phom", "sen-phom", "发丝；头发", "名词", "身体部位", "a1", "หวีเส้นผม", "wii sen-phom", "梳头发", "ผิวหนัง", "phiu-nang", "皮肤", "易混"],
  ["กระดูกแขน", "gra-duuk-khaaen", "gra-duuk-khaaen", "手臂骨头", "名词", "身体部位", "a2", "เอกซเรย์กระดูกแขน", "ek-sa-ree gra-duuk-khaaen", "拍手臂骨头X光", "กล้ามเนื้อขา", "glaam-nuea-khaa", "腿部肌肉", "易混"],
  ["กล้ามเนื้อขา", "glaam-nuea-khaa", "glaam-nuea-khaa", "腿部肌肉", "名词", "身体部位", "a2", "ยืดกล้ามเนื้อขา", "yeut glaam-nuea-khaa", "拉伸腿部肌肉", "กระดูกแขน", "gra-duuk-khaaen", "手臂骨头", "易混"],
  ["หัวใจ", "hua-jai", "hua-jai", "心脏；心", "名词", "身体部位", "a1", "ตรวจหัวใจ", "dtruat hua-jai", "检查心脏", "ปอด", "bpaawt", "肺", "易混"],
  ["ปอด", "bpaawt", "bpaawt", "肺", "名词", "身体部位", "a2", "ตรวจปอด", "dtruat bpaawt", "检查肺", "หัวใจ", "hua-jai", "心脏", "易混"],
  ["กระเพาะอาหาร", "gra-phaw-aa-haan", "gra-phaw-aa-haan", "胃", "名词", "身体部位", "a2", "ปวดกระเพาะอาหาร", "bpuat gra-phaw-aa-haan", "胃痛", "ลำไส้", "lam-sai", "肠道", "易混"],
  ["ลำไส้", "lam-sai", "lam-sai", "肠道", "名词", "身体部位", "a2", "ตรวจลำไส้", "dtruat lam-sai", "检查肠道", "กระเพาะอาหาร", "gra-phaw-aa-haan", "胃", "易混"],
  ["ปวดฟัน", "bpuat-fan", "bpuat fan", "牙痛", "短语", "症状", "a1", "มีอาการปวดฟัน", "mii aa-gaan bpuat fan", "有牙痛症状", "ปวดฟันกราม", "bpuat fan-graam", "臼齿痛", "近义"],
  ["ปวดหัวมาก", "bpuat-hua-maak", "bpuat hua maak", "头很痛", "短语", "症状", "a1", "ปวดหัวมาก", "bpuat hua maak", "头很痛", "เวียนหัว", "wiian-hua", "头晕", "易混"],
  ["ปวดท้องน้อย", "bpuat-thaawng-naawy", "bpuat thaawng-naawy", "下腹痛", "短语", "症状", "a2", "มีอาการปวดท้องน้อย", "mii aa-gaan bpuat thaawng-naawy", "有下腹痛症状", "ปวดกระเพาะอาหาร", "bpuat gra-phaw-aa-haan", "胃痛", "易混"],
  ["ปวดหลังล่าง", "bpuat-lang-laang", "bpuat lang laang", "下背痛", "短语", "症状", "a2", "ปวดหลังล่าง", "bpuat lang laang", "下背痛", "ปวดช่วงเอว", "bpuat chuang-eeo", "腰部痛", "近义"],
  ["ปวดเข่า", "bpuat-khao", "bpuat khao", "膝盖痛", "短语", "症状", "a1", "มีอาการปวดเข่า", "mii aa-gaan bpuat khao", "有膝盖痛症状", "ปวดข้อเท้า", "bpuat khaaw-thaao", "脚踝痛", "易混"],
  ["เจ็บหน้าอก", "jep-naa-ok", "jep naa-ok", "胸痛；胸口痛", "短语", "症状", "a2", "เจ็บหน้าอก", "jep naa-ok", "胸口痛", "หายใจไม่ออก", "haai-jai-mai-aawk", "喘不过气", "用法"],
  ["แสบคอ", "saaep-khaaw", "saaep khaaw", "喉咙灼痛", "短语", "症状", "a1", "แสบคอมาก", "saaep khaaw maak", "喉咙很刺痛", "เจ็บคอ", "jep khaaw", "喉咙痛", "近义"],
  ["คัดจมูก", "khat-ja-muuk", "khat ja-muuk", "鼻塞", "短语", "症状", "a1", "คัดจมูกตอนกลางคืน", "khat ja-muuk dtaawn glaang-kheun", "晚上鼻塞", "น้ำมูกไหล", "nam-muuk-lai", "流鼻涕", "易混"],
  ["น้ำมูกไหล", "nam-muuk-lai", "nam-muuk lai", "流鼻涕", "短语", "症状", "a1", "น้ำมูกไหลทั้งวัน", "nam-muuk lai thang wan", "一整天流鼻涕", "คัดจมูก", "khat-ja-muuk", "鼻塞", "易混"],
  ["ไอแห้ง", "ai-haaeng", "ai haaeng", "干咳", "短语", "症状", "a1", "ไอแห้งตอนเช้า", "ai haaeng dtaawn chaao", "早上干咳", "ไอมีเสมหะ", "ai-mii-see-ma", "有痰咳嗽", "反义"],
  ["ไอมีเสมหะ", "ai-mii-see-ma", "ai mii see-ma", "有痰咳嗽", "短语", "症状", "a2", "ไอมีเสมหะ", "ai mii see-ma", "有痰咳嗽", "ไอแห้ง", "ai-haaeng", "干咳", "反义"],
  ["มีเสมหะ", "mii-see-ma", "mii see-ma", "有痰", "短语", "症状", "a2", "มีเสมหะในคอ", "mii see-ma nai khaaw", "喉咙里有痰", "ไอมีเสมหะ", "ai-mii-see-ma", "有痰咳嗽", "近义"],
  ["ตัวร้อนจัด", "dtua-raawn-jat", "dtua raawn jat", "身体很烫", "短语", "症状", "a1", "ตัวร้อนจัด", "dtua raawn jat", "身体很烫", "หนาวสั่น", "naao-san", "发冷发抖", "易混"],
  ["หนาวสั่น", "naao-san", "naao san", "发冷发抖", "短语", "症状", "a1", "หนาวสั่นทั้งคืน", "naao san thang kheun", "整晚发冷发抖", "ตัวร้อนจัด", "dtua-raawn-jat", "身体很烫", "易混"],
  ["เวียนหัว", "wiian-hua", "wiian hua", "头晕", "短语", "症状", "a1", "เวียนหัวหลังตื่นนอน", "wiian hua lang dteun-naawn", "醒来后头晕", "ปวดหัวมาก", "bpuat-hua-maak", "头很痛", "易混"],
  ["คลื่นไส้", "khleuun-sai", "khleuun-sai", "恶心", "形容词", "症状", "a1", "รู้สึกคลื่นไส้", "ruu-seuk khleuun-sai", "觉得恶心", "อาเจียน", "aa-jiian", "呕吐", "用法"],
  ["อาเจียน", "aa-jiian", "aa-jiian", "呕吐", "动词", "症状", "a1", "อาเจียนหลังอาหาร", "aa-jiian lang aa-haan", "饭后呕吐", "คลื่นไส้", "khleuun-sai", "恶心", "用法"],
  ["ท้องเสีย", "thaawng-siia", "thaawng siia", "腹泻", "短语", "症状", "a1", "ท้องเสียตั้งแต่เช้า", "thaawng siia dtang-dtaae chaao", "从早上开始腹泻", "ท้องผูก", "thaawng-phuuk", "便秘", "反义"],
  ["ท้องผูก", "thaawng-phuuk", "thaawng phuuk", "便秘", "短语", "症状", "a1", "ท้องผูกหลายวัน", "thaawng phuuk laai wan", "便秘好几天", "ท้องเสีย", "thaawng-siia", "腹泻", "反义"],
  ["ผื่นขึ้น", "pheun-kheun", "pheun kheun", "起疹子", "短语", "症状", "a1", "ผื่นขึ้นที่แขน", "pheun kheun thii khaaen", "手臂上起疹子", "คันผิวหนัง", "khan-phiu-nang", "皮肤痒", "用法"],
  ["คันผิวหนัง", "khan-phiu-nang", "khan phiu-nang", "皮肤痒", "短语", "症状", "a1", "คันผิวหนังหลังโดนยุงกัด", "khan phiu-nang lang doon yung gat", "被蚊子咬后皮肤痒", "ผื่นขึ้น", "pheun-kheun", "起疹子", "用法"],
  ["ขาบวม", "khaa-buaam", "khaa buaam", "腿肿", "短语", "症状", "a2", "ขาบวมหลังเดินนาน", "khaa buaam lang doen naan", "走久了腿肿", "รอยช้ำ", "raawy-cham", "淤青", "易混"],
  ["รอยช้ำ", "raawy-cham", "raawy cham", "淤青", "名词", "症状", "a2", "มีรอยช้ำที่เข่า", "mii raawy cham thii khao", "膝盖上有淤青", "ขาบวม", "khaa-buaam", "腿肿", "易混"],
  ["แผลสด", "phlaae-sot", "phlaae sot", "新伤口；开放性小伤", "名词", "症状", "a2", "ล้างแผลสด", "laang phlaae sot", "清洗新伤口", "แผลพุพอง", "phlaae-phu-phaawng", "水泡/起泡伤", "易混"],
  ["แผลพุพอง", "phlaae-phu-phaawng", "phlaae phu-phaawng", "起泡伤；水泡", "名词", "症状", "a2", "ดูแผลพุพอง", "duu phlaae phu-phaawng", "查看水泡伤", "แผลสด", "phlaae-sot", "新伤口", "易混"],
  ["แพ้ยา", "phaae-yaa", "phaae yaa", "药物过敏", "短语", "症状", "a2", "แพ้ยาบางชนิด", "phaae yaa baang cha-nit", "对某些药过敏", "แพ้อาหาร", "phaae-aa-haan", "食物过敏", "易混"],
  ["แพ้อาหาร", "phaae-aa-haan", "phaae aa-haan", "食物过敏", "短语", "症状", "a2", "แพ้อาหารทะเล", "phaae aa-haan tha-lee", "海鲜过敏", "แพ้ยา", "phaae-yaa", "药物过敏", "易混"],
  ["เป็นหวัด", "bpen-wat", "bpen wat", "感冒", "短语", "症状", "a1", "เป็นหวัดง่าย", "bpen wat ngaai", "容易感冒", "ไข้หวัด", "khai-wat", "感冒病症", "近义"],
  ["ไข้หวัด", "khai-wat", "khai-wat", "感冒；伤风", "名词", "症状", "a1", "เป็นไข้หวัด", "bpen khai-wat", "得了感冒", "ไข้หวัดใหญ่", "khai-wat-yai", "流感", "易混"],
  ["ไข้หวัดใหญ่", "khai-wat-yai", "khai-wat-yai", "流感", "名词", "症状", "a2", "ตรวจไข้หวัดใหญ่", "dtruat khai-wat-yai", "检查流感", "ไข้หวัด", "khai-wat", "普通感冒", "易混"],
  ["ไมเกรน", "mai-green", "mai-green", "偏头痛", "名词", "症状", "a2", "เป็นไมเกรน", "bpen mai-green", "偏头痛发作", "ปวดหัวมาก", "bpuat-hua-maak", "头很痛", "易混"],
  ["นอนไม่หลับ", "naawn-mai-lap", "naawn mai lap", "睡不着；失眠", "短语", "症状", "a1", "นอนไม่หลับทั้งคืน", "naawn mai lap thang kheun", "整晚睡不着", "ง่วงนอน", "nguang naawn", "困得想睡", "反义"],
  ["อ่อนเพลีย", "aawn-phliia", "aawn-phliia", "乏力；虚弱", "形容词", "症状", "a2", "รู้สึกอ่อนเพลีย", "ruu-seuk aawn-phliia", "觉得乏力", "เหนื่อยง่าย", "nueai-ngaai", "容易累", "近义"],
  ["เหนื่อยง่าย", "nueai-ngaai", "nueai ngaai", "容易累", "短语", "症状", "a1", "เหนื่อยง่ายเวลาเดินขึ้นบันได", "nueai ngaai wee-laa doen kheun ban-dai", "上楼梯时容易累", "อ่อนเพลีย", "aawn-phliia", "乏力", "近义"],
  ["หายใจไม่ออก", "haai-jai-mai-aawk", "haai jai mai aawk", "喘不过气；呼吸困难", "短语", "症状", "a2", "หายใจไม่ออกหลังวิ่ง", "haai jai mai aawk lang wing", "跑步后喘不过气", "เจ็บหน้าอก", "jep-naa-ok", "胸痛", "用法"],
  ["คลินิก", "khli-nik", "khli-nik", "诊所", "名词", "诊所药房", "a1", "ไปคลินิก", "bpai khli-nik", "去诊所", "โรงพยาบาล", "roong-pha-yaa-baan", "医院", "易混"],
  ["ห้องตรวจ", "haawng-dtruat", "haawng-dtruat", "诊室；检查室", "名词", "诊所药房", "a1", "เข้าห้องตรวจ", "khao haawng-dtruat", "进诊室", "ห้องรอ", "haawng-raaw", "候诊室", "易混"],
  ["ใบนัดแพทย์", "bai-nat-phaaet", "bai-nat phaaet", "医生预约单", "名词", "诊所药房", "a2", "เก็บใบนัดแพทย์", "gep bai-nat phaaet", "收好医生预约单", "ใบสั่งยา", "bai-sang-yaa", "处方", "易混"],
  ["ใบสั่งยา", "bai-sang-yaa", "bai-sang yaa", "处方；药方", "名词", "诊所药房", "a2", "ยื่นใบสั่งยา", "yeun bai-sang yaa", "递交处方", "ใบนัดแพทย์", "bai-nat-phaaet", "医生预约单", "易混"],
  ["เภสัชกร", "phee-sat-cha-gaawn", "phee-sat-cha-gaawn", "药剂师", "名词", "诊所药房", "a2", "ถามเภสัชกร", "thaam phee-sat-cha-gaawn", "问药剂师", "หมอ", "maaw", "医生", "易混"],
  ["ยาเม็ด", "yaa-met", "yaa-met", "药片", "名词", "诊所药房", "a1", "กินยาเม็ด", "gin yaa-met", "吃药片", "ยาน้ำ", "yaa-naam", "药水", "易混"],
  ["ยาน้ำ", "yaa-naam", "yaa-naam", "药水；液体药", "名词", "诊所药房", "a1", "เขย่ายาน้ำ", "kha-yao yaa-naam", "摇匀药水", "ยาเม็ด", "yaa-met", "药片", "易混"],
  ["ยาทา", "yaa-thaa", "yaa-thaa", "外用涂抹药", "名词", "诊所药房", "a1", "ทายาทา", "thaa yaa-thaa", "涂外用药", "ยาเม็ด", "yaa-met", "药片", "易混"],
  ["ยาหยอดตา", "yaa-yaawt-dtaa", "yaa-yaawt-dtaa", "眼药水", "名词", "诊所药房", "a2", "หยอดยาหยอดตา", "yaawt yaa-yaawt-dtaa", "滴眼药水", "ยาพ่นจมูก", "yaa-phon-ja-muuk", "鼻喷药", "易混"],
  ["ยาพ่นจมูก", "yaa-phon-ja-muuk", "yaa-phon ja-muuk", "鼻喷药", "名词", "诊所药房", "a2", "ใช้ยาพ่นจมูก", "chai yaa-phon ja-muuk", "使用鼻喷药", "ยาหยอดตา", "yaa-yaawt-dtaa", "眼药水", "易混"],
  ["ยาดม", "yaa-dom", "yaa-dom", "嗅闻药；鼻通", "名词", "诊所药房", "a1", "ดมยาดม", "dom yaa-dom", "闻嗅闻药", "ยาพ่นจมูก", "yaa-phon-ja-muuk", "鼻喷药", "易混"],
  ["ยาอม", "yaa-om", "yaa-om", "含片", "名词", "诊所药房", "a1", "อมยาอม", "om yaa-om", "含含片", "ยาแก้ไอ", "yaa-gaae-ai", "止咳药", "用法"],
  ["ยาแก้ไอ", "yaa-gaae-ai", "yaa-gaae-ai", "止咳药", "名词", "诊所药房", "a1", "กินยาแก้ไอ", "gin yaa-gaae-ai", "吃止咳药", "ยาอม", "yaa-om", "含片", "用法"],
  ["ยาแก้แพ้", "yaa-gaae-phaae", "yaa-gaae-phaae", "抗过敏药", "名词", "诊所药房", "a2", "กินยาแก้แพ้", "gin yaa-gaae-phaae", "吃抗过敏药", "แพ้ยา", "phaae-yaa", "药物过敏", "用法"],
  ["ยาลดไข้", "yaa-lot-khai", "yaa-lot-khai", "退烧药", "名词", "诊所药房", "a1", "กินยาลดไข้", "gin yaa-lot-khai", "吃退烧药", "ยาแก้ปวด", "yaa-gaae-bpuat", "止痛药", "易混"],
  ["วิตามินซี", "wi-dtaa-min-sii", "wi-dtaa-min-sii", "维生素C", "名词", "诊所药房", "a1", "กินวิตามินซี", "gin wi-dtaa-min-sii", "吃维生素C", "เกลือแร่", "gleua-raae", "口服补液盐", "易混"],
  ["เกลือแร่", "gleua-raae", "gleua-raae", "口服补液盐；矿物盐", "名词", "诊所药房", "a2", "ชงเกลือแร่", "chong gleua-raae", "冲口服补液盐", "วิตามินซี", "wi-dtaa-min-sii", "维生素C", "易混"],
  ["ปรอทวัดไข้", "bpa-raawt-wat-khai", "bpa-raawt wat khai", "体温计", "名词", "诊所药房", "a1", "ใช้ปรอทวัดไข้", "chai bpa-raawt wat khai", "使用体温计", "เครื่องวัดความดัน", "khreuuang-wat-khwaam-dan", "血压计", "易混"],
  ["เครื่องวัดความดัน", "khreuuang-wat-khwaam-dan", "khreuuang-wat khwaam-dan", "血压计", "名词", "诊所药房", "a2", "ใช้เครื่องวัดความดัน", "chai khreuuang-wat khwaam-dan", "使用血压计", "ปรอทวัดไข้", "bpa-raawt-wat-khai", "体温计", "易混"],
  ["บัตรคิว", "bat-khiu", "bat-khiu", "排队号；叫号票", "名词", "诊所药房", "a1", "รับบัตรคิว", "rap bat-khiu", "取号", "ใบนัดแพทย์", "bai-nat-phaaet", "医生预约单", "易混"],
  ["น้ำอุ่น", "naam-un", "naam un", "温水", "名词", "居家缓解", "a1", "ดื่มน้ำอุ่น", "duuem naam un", "喝温水", "น้ำเย็น", "naam-yen", "冷水", "反义"],
  ["น้ำเกลือ", "naam-gleua", "naam gleua", "盐水；生理盐水", "名词", "居家缓解", "a2", "ล้างด้วยน้ำเกลือ", "laang duai naam gleua", "用盐水清洗", "น้ำอุ่น", "naam-un", "温水", "易混"],
  ["น้ำผึ้ง", "naam-pheung", "naam pheung", "蜂蜜", "名词", "居家缓解", "a1", "ชงน้ำผึ้ง", "chong naam pheung", "冲蜂蜜水", "ขิง", "khing", "姜", "用法"],
  ["ขิง", "khing", "khing", "姜", "名词", "居家缓解", "a1", "ต้มน้ำขิง", "dtom naam khing", "煮姜水", "น้ำผึ้ง", "naam-pheung", "蜂蜜", "用法"],
  ["ยาหม่อง", "yaa-maawng", "yaa-maawng", "药膏；清凉油", "名词", "居家缓解", "a1", "ทายาหม่อง", "thaa yaa-maawng", "涂清凉油", "ยาทา", "yaa-thaa", "外用药", "近义"],
  ["ประคบเย็น", "bpra-khop-yen", "bpra-khop yen", "冷敷", "动词", "居家缓解", "a2", "ประคบเย็นที่ข้อเท้า", "bpra-khop yen thii khaaw-thaao", "在脚踝冷敷", "ประคบร้อน", "bpra-khop-raawn", "热敷", "反义"],
  ["ประคบร้อน", "bpra-khop-raawn", "bpra-khop raawn", "热敷", "动词", "居家缓解", "a2", "ประคบร้อนที่ไหล่", "bpra-khop raawn thii lai", "在肩膀热敷", "ประคบเย็น", "bpra-khop-yen", "冷敷", "反义"],
  ["กลั้วคอ", "glua-khaaw", "glua khaaw", "漱喉；含漱", "动词", "居家缓解", "a2", "กลั้วคอด้วยน้ำเกลือ", "glua khaaw duai naam gleua", "用盐水漱喉", "แสบคอ", "saaep-khaaw", "喉咙灼痛", "用法"],
  ["พักสายตา", "phak-saai-dtaa", "phak saai-dtaa", "让眼睛休息", "短语", "居家缓解", "a1", "พักสายตาห้านาที", "phak saai-dtaa haa naa-thii", "让眼睛休息五分钟", "แสบตา", "saaep-dtaa", "眼睛刺痛", "用法"],
  ["นอนยกหัว", "naawn-yok-hua", "naawn yok hua", "垫高头睡", "短语", "居家缓解", "a2", "นอนยกหัวเล็กน้อย", "naawn yok hua lek-naawy", "稍微垫高头睡", "คัดจมูก", "khat-ja-muuk", "鼻塞", "用法"],
  ["ดื่มน้ำอุ่น", "duuem-naam-un", "duuem naam un", "喝温水", "短语", "居家缓解", "a1", "ดื่มน้ำอุ่นบ่อย ๆ", "duuem naam un baawy baawy", "常喝温水", "น้ำอุ่น", "naam-un", "温水", "用法"],
  ["งดของเย็น", "ngot-khaawng-yen", "ngot khaawng yen", "暂停吃喝冰冷的东西", "短语", "居家缓解", "a1", "งดของเย็นสักสองวัน", "ngot khaawng yen sak saawng wan", "暂停吃喝冰的东西两天", "ดื่มน้ำอุ่น", "duuem-naam-un", "喝温水", "用法"],
  ["ล้างจมูก", "laang-ja-muuk", "laang ja-muuk", "洗鼻", "动词", "居家缓解", "a2", "ล้างจมูกด้วยน้ำเกลือ", "laang ja-muuk duai naam gleua", "用盐水洗鼻", "ยาพ่นจมูก", "yaa-phon-ja-muuk", "鼻喷药", "易混"],
  ["ประคบตา", "bpra-khop-dtaa", "bpra-khop dtaa", "敷眼睛", "动词", "居家缓解", "a2", "ประคบตาเบา ๆ", "bpra-khop dtaa bao bao", "轻轻敷眼睛", "พักสายตา", "phak-saai-dtaa", "让眼睛休息", "用法"],
  ["อมยา", "om-yaa", "om yaa", "含药；含含片", "动词", "居家缓解", "a1", "อมยาหลังอาหาร", "om yaa lang aa-haan", "饭后含药", "ยาอม", "yaa-om", "含片", "用法"],
] as const satisfies readonly Row[];

const relationFor = (row: Row): VocabularyExpansionComparison[] => {
  const [, , , , , , , , , , relatedThai, relatedRoman, relatedChinese, relationKind] = row;
  if (!relatedThai || !relatedChinese || !relationKind) return [];

  return [
    {
      kind: relationKind,
      target: { thai: relatedThai, roman: relatedRoman, chinese: relatedChinese },
      distinctionZh: `${row[0]} 和 ${relatedThai} 都常出现在身体、症状或看诊语境中；学习时要连同搭配一起记。`,
    },
  ];
};

const exampleFor = (row: Row): VocabularyExpansionExample => {
  const [thai, , roman, chinese, , theme] = row;
  if (theme === "身体部位") {
    return {
      thai: `หมอถามว่าฉันเจ็บตรง${thai}ไหม เพื่ออธิบายอาการให้ชัดเจน`,
      roman: `maaw thaam waa chan jep dtrong ${roman} mai phuea a-thi-baai aa-gaan hai chat-jeen`,
      chinese: `医生问我${chinese}这个部位会不会痛，好把症状说清楚。`,
    };
  }
  if (theme === "症状") {
    return {
      thai: `ถ้ามีอาการ${thai}หลายวัน ควรพักผ่อนและไปปรึกษาหมอ`,
      roman: `thaa mii aa-gaan ${roman} laai wan khuan phak-phaawn lae bpai bpruek-saa maaw`,
      chinese: `如果${chinese}这个症状持续好几天，应该休息并去咨询医生。`,
    };
  }
  if (theme === "诊所药房") {
    return {
      thai: `ที่คลินิก แม่ถามเจ้าหน้าที่เรื่อง${thai}ก่อนพาลูกเข้าห้องตรวจ`,
      roman: `thii khli-nik maae thaam jao-naa-thii rueang ${roman} gaawn phaa luuk khao haawng-dtruat`,
      chinese: `在诊所，妈妈带孩子进诊室前先向工作人员询问${chinese}相关的事。`,
    };
  }

  return {
    thai: `ยายแนะนำเรื่อง${thai}อย่างระวัง แต่ถ้าอาการไม่ดีขึ้นควรไปหาหมอ`,
    roman: `yaai nae-nam rueang ${roman} yaang ra-wang dtaae thaa aa-gaan mai dii kheun khuan bpai haa maaw`,
    chinese: `外婆谨慎地建议${chinese}，但如果症状没有好转，应该去看医生。`,
  };
};

const candidateFromRow = (row: Row, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, partOfSpeech, theme, level, collocationThai, collocationRoman, collocationChinese] = row;
  const collocations = [{ thai: collocationThai, roman: collocationRoman, chinese: collocationChinese }];
  const comparisons = relationFor(row);
  const antonyms = comparisons.filter((comparison) => comparison.kind === "反义").map((comparison) => comparison.target);
  const synonyms = comparisons.filter((comparison) => comparison.kind === "近义").map((comparison) => comparison.target);
  const tags = [theme, partOfSpeech, "健康", level];
  const usageNotesZh = [
    `${thai} 是日常健康场景里的泰语词项。初学时先和搭配“${collocationThai}”一起记，避免只背孤立词。`,
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
        id: "health-daily-use",
        chinese: `${chinese}；用于描述身体、症状、看诊买药或居家缓解`,
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

export const VOCABULARY_EXPANSION_A1_DAILY_06 = rows.map(candidateFromRow) satisfies VocabularyExpansionCandidate[];
