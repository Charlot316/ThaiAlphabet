export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type DailyEnvironmentUtilitiesTheme =
  | "水"
  | "电"
  | "网络"
  | "温度"
  | "噪音"
  | "空气"
  | "垃圾"
  | "卫生"
  | "设施故障"
  | "环境描述";

export interface VocabularyExpansionExample {
  thai: string;
  roman: string;
  chinese: string;
}

export interface VocabularyExpansionSense {
  chinese: string;
  usageNotesZh: string;
  examples: VocabularyExpansionExample[];
}

export interface VocabularyExpansionCandidate {
  id: string;
  headword: string;
  romanization: string;
  level: VocabularyExpansionLevel;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  tags: string[];
  senses: VocabularyExpansionSense[];
  synonyms?: string[];
  antonyms?: string[];
  comparisons?: string[];
  collocations?: string[];
  sources: string[];
}

type Row = [
  id: string,
  thai: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionPartOfSpeech,
  theme: DailyEnvironmentUtilitiesTheme,
];

const DAILY_ENVIRONMENT_UTILITIES_REFS = [
  "worker-a-a2-daily-environment-utilities",
  "basic-thai-environment-utilities",
];

const rows: Row[] = [
  ["naam-bpra-paa", "น้ำประปา", "naam bpra-bpaa", "自来水", "名词", "水"],
  ["naam-mai-lai", "น้ำไม่ไหล", "naam mai lai", "停水；水不流", "句型", "水"],
  ["naam-lai-baao", "น้ำไหลเบา", "naam lai bao", "水流很小", "句型", "水"],
  ["naam-lai-raeng", "น้ำไหลแรง", "naam lai raaeng", "水流很大", "句型", "水"],
  ["gawk-naam", "ก๊อกน้ำ", "gaawk naam", "水龙头", "名词", "水"],
  ["bpit-gawk-naam", "ปิดก๊อกน้ำ", "bpit gaawk naam", "关水龙头", "动词", "水"],
  ["bpoet-gawk-naam", "เปิดก๊อกน้ำ", "bpoet gaawk naam", "开水龙头", "动词", "水"],
  ["naam-rua", "น้ำรั่ว", "naam rua", "漏水", "句型", "水"],
  ["naam-khun", "น้ำขุ่น", "naam khun", "水浑浊", "句型", "水"],
  ["bpra-yat-naam", "ประหยัดน้ำ", "bpra-yat naam", "节约用水", "动词", "水"],
  ["fai-faa", "ไฟฟ้า", "fai faa", "电；电力", "名词", "电"],
  ["fai-dap", "ไฟดับ", "fai dap", "停电", "动词", "电"],
  ["fai-dtit", "ไฟติด", "fai dtit", "灯亮；有电", "句型", "电"],
  ["fai-mai-dtit", "ไฟไม่ติด", "fai mai dtit", "灯不亮", "句型", "电"],
  ["bpit-fai", "ปิดไฟ", "bpit fai", "关灯", "动词", "电"],
  ["bpoet-fai", "เปิดไฟ", "bpoet fai", "开灯", "动词", "电"],
  ["bplak-fai", "ปลั๊กไฟ", "bplak fai", "插座；电源插头", "名词", "电"],
  ["sai-fai", "สายไฟ", "saai fai", "电线", "名词", "电"],
  ["fai-ruap", "ไฟรั่ว", "fai rua", "漏电", "句型", "电"],
  ["bpra-yat-fai", "ประหยัดไฟ", "bpra-yat fai", "节约用电", "动词", "电"],
  ["internet", "อินเทอร์เน็ต", "in-thoe-net", "互联网", "名词", "网络"],
  ["wifi", "ไวไฟ", "wai-fai", "无线网络", "名词", "网络"],
  ["san-yaan", "สัญญาณ", "san-yaan", "信号", "名词", "网络"],
  ["san-yaan-mai-dii", "สัญญาณไม่ดี", "san-yaan mai dii", "信号不好", "句型", "网络"],
  ["net-chaa", "เน็ตช้า", "net chaa", "网速慢", "句型", "网络"],
  ["net-lom", "เน็ตล่ม", "net lom", "网络断了/崩了", "句型", "网络"],
  ["dtaw-wifi", "ต่อไวไฟ", "dtaaw wai-fai", "连接无线网络", "动词", "网络"],
  ["rat-wifi", "รหัสไวไฟ", "ra-hat wai-fai", "无线网密码", "名词", "网络"],
  ["mai-mi-internet", "ไม่มีอินเทอร์เน็ต", "mai mii in-thoe-net", "没有网络", "句型", "网络"],
  ["router", "เราเตอร์", "rao-toe", "路由器", "名词", "网络"],
  ["un-ha-phuum", "อุณหภูมิ", "un-ha-phuum", "温度", "名词", "温度"],
  ["raawn", "ร้อน", "raawn", "热", "形容词", "温度"],
  ["yen", "เย็น", "yen", "凉；冷", "形容词", "温度"],
  ["aop-aao", "อบอ้าว", "op aao", "闷热", "形容词", "温度"],
  ["nuaw", "หนาว", "naao", "冷", "形容词", "温度"],
  ["aagaad-raawn", "อากาศร้อน", "aa-gaat raawn", "天气热", "句型", "温度"],
  ["aagaad-yen", "อากาศเย็น", "aa-gaat yen", "天气凉", "句型", "温度"],
  ["prap-air", "ปรับแอร์", "bprap ae", "调空调", "动词", "温度"],
  ["bpoet-air", "เปิดแอร์", "bpoet ae", "开空调", "动词", "温度"],
  ["bpit-air", "ปิดแอร์", "bpit ae", "关空调", "动词", "温度"],
  ["siang-dang", "เสียงดัง", "siiang dang", "声音大；吵", "形容词", "噪音"],
  ["mi-siang-dang", "มีเสียงดัง", "mii siiang dang", "有噪音", "句型", "噪音"],
  ["nuaak-huu", "หนวกหู", "nuak huu", "吵耳朵；很吵", "形容词", "噪音"],
  ["siang-rot", "เสียงรถ", "siiang rot", "车辆声音", "名词", "噪音"],
  ["siang-khaang-baan", "เสียงข้างบ้าน", "siiang khaang baan", "邻居家的声音", "名词", "噪音"],
  ["lot-siang", "ลดเสียง", "lot siiang", "调小声音", "动词", "噪音"],
  ["bao-siang", "เบาเสียง", "bao siiang", "放低声音", "动词", "噪音"],
  ["yaa-song-siang-dang", "อย่าส่งเสียงดัง", "yaa song siiang dang", "不要大声喧哗", "句型", "噪音"],
  ["ngiap", "เงียบ", "ngiiap", "安静", "形容词", "噪音"],
  ["khwaam-ngiap", "ความเงียบ", "khwaam ngiiap", "安静；寂静", "名词", "噪音"],
  ["aagaad", "อากาศ", "aa-gaat", "空气；天气", "名词", "空气"],
  ["aagaad-dii", "อากาศดี", "aa-gaat dii", "空气/天气好", "句型", "空气"],
  ["aagaad-mai-dii", "อากาศไม่ดี", "aa-gaat mai dii", "空气/天气不好", "句型", "空气"],
  ["fun", "ฝุ่น", "fun", "灰尘；粉尘", "名词", "空气"],
  ["khwan", "ควัน", "khwan", "烟", "名词", "空气"],
  ["klin", "กลิ่น", "glin", "气味", "名词", "空气"],
  ["klin-mai-dii", "กลิ่นไม่ดี", "glin mai dii", "气味不好", "句型", "空气"],
  ["aap", "อับ", "ap", "闷；不通风", "形容词", "空气"],
  ["thaai-thee", "ถ่ายเท", "thaai thee", "通风；流通", "动词", "空气"],
  ["bpoet-naa-taang", "เปิดหน้าต่าง", "bpoet naa-dtaang", "开窗", "动词", "空气"],
  ["kha-ya", "ขยะ", "kha-ya", "垃圾", "名词", "垃圾"],
  ["thang-kha-ya", "ถังขยะ", "thang kha-ya", "垃圾桶", "名词", "垃圾"],
  ["thung-kha-ya", "ถุงขยะ", "thung kha-ya", "垃圾袋", "名词", "垃圾"],
  ["thing-kha-ya", "ทิ้งขยะ", "thing kha-ya", "扔垃圾", "动词", "垃圾"],
  ["kep-kha-ya", "เก็บขยะ", "gep kha-ya", "收垃圾；捡垃圾", "动词", "垃圾"],
  ["yaek-kha-ya", "แยกขยะ", "yaaek kha-ya", "垃圾分类", "动词", "垃圾"],
  ["kha-ya-piiak", "ขยะเปียก", "kha-ya bpiiak", "湿垃圾", "名词", "垃圾"],
  ["kha-ya-haeng", "ขยะแห้ง", "kha-ya haaeng", "干垃圾", "名词", "垃圾"],
  ["kha-ya-riisai-khoen", "ขยะรีไซเคิล", "kha-ya rii-sai-khoen", "可回收垃圾", "名词", "垃圾"],
  ["lot-kha-ya", "ลดขยะ", "lot kha-ya", "减少垃圾", "动词", "垃圾"],
  ["sa-aat", "สะอาด", "sa-aat", "干净", "形容词", "卫生"],
  ["sok-ga-bprok", "สกปรก", "sok-ga-bprok", "脏", "形容词", "卫生"],
  ["tham-khwaam-sa-aat", "ทำความสะอาด", "tham khwaam sa-aat", "打扫；清洁", "动词", "卫生"],
  ["laang-mue", "ล้างมือ", "laang mue", "洗手", "动词", "卫生"],
  ["sa-buu", "สบู่", "sa-buu", "肥皂", "名词", "卫生"],
  ["nam-yaa-tham-khwaam-sa-aat", "น้ำยาทำความสะอาด", "naam yaa tham khwaam sa-aat", "清洁剂", "名词", "卫生"],
  ["pha-chet", "ผ้าเช็ด", "phaa chet", "擦布", "名词", "卫生"],
  ["cheet-khaa-chuea", "ฉีดฆ่าเชื้อ", "chiit khaa chuea", "喷洒消毒", "动词", "卫生"],
  ["rak-saa-khwaam-sa-aat", "รักษาความสะอาด", "rak-saa khwaam sa-aat", "保持清洁", "动词", "卫生"],
  ["hong-naam-sa-aat", "ห้องน้ำสะอาด", "haawng naam sa-aat", "厕所干净", "句型", "卫生"],
  ["cham-rut", "ชำรุด", "cham-rut", "损坏；故障", "形容词", "设施故障"],
  ["phang", "พัง", "phang", "坏掉", "动词", "设施故障"],
  ["chai-mai-dai", "ใช้ไม่ได้", "chai mai dai", "不能用", "句型", "设施故障"],
  ["dtawng-saawm", "ต้องซ่อม", "dtawng saawm", "需要维修", "句型", "设施故障"],
  ["jaeng-saawm", "แจ้งซ่อม", "jaaeng saawm", "报修", "动词", "设施故障"],
  ["gamlang-saawm", "กำลังซ่อม", "gam-lang saawm", "正在维修", "句型", "设施故障"],
  ["bpit-chua-khraao", "ปิดชั่วคราว", "bpit chua-khraao", "临时关闭", "短语", "设施故障"],
  ["bprap-bprung", "ปรับปรุง", "bprap bprung", "整修；改善", "动词", "设施故障"],
  ["an-ta-raai", "อันตราย", "an-dta-raai", "危险", "形容词", "设施故障"],
  ["rawang-luen", "ระวังลื่น", "ra-wang leun", "小心地滑", "短语", "设施故障"],
  ["sabaai", "สบาย", "sa-baai", "舒服", "形容词", "环境描述"],
  ["na-yuu", "น่าอยู่", "naa yuu", "适合居住；宜居", "形容词", "环境描述"],
  ["mai-na-yuu", "ไม่น่าอยู่", "mai naa yuu", "不太适合居住", "形容词", "环境描述"],
  ["sangop", "สงบ", "sa-ngop", "安静平和", "形容词", "环境描述"],
  ["wun-waai", "วุ่นวาย", "wun waai", "混乱；吵闹忙乱", "形容词", "环境描述"],
  ["sa-waang", "สว่าง", "sa-waang", "明亮", "形容词", "环境描述"],
  ["muet", "มืด", "muet", "暗", "形容词", "环境描述"],
  ["guang", "กว้าง", "gwaang", "宽敞", "形容词", "环境描述"],
  ["khaep", "แคบ", "khaaep", "狭窄", "形容词", "环境描述"],
  ["bplaawt-phai", "ปลอดภัย", "bplaawt-phai", "安全", "形容词", "环境描述"],
];

const relatedByTheme: Record<
  DailyEnvironmentUtilitiesTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  水: {
    synonym: "น้ำประปา / naam bpra-bpaa / 自来水",
    antonym: "น้ำไม่ไหล / naam mai lai / 停水",
    comparison: "น้ำรั่ว 是漏水，น้ำไม่ไหล 是停水或水不流。",
    collocation: "แจ้งว่าน้ำรั่ว / jaaeng waa naam rua / 报告漏水",
  },
  电: {
    synonym: "ไฟฟ้า / fai faa / 电力",
    antonym: "ไฟดับ / fai dap / 停电",
    comparison: "ไฟ 可指电或灯；ไฟดับ 常说停电或灯灭了。",
    collocation: "ปิดไฟเพื่อประหยัดไฟ / bpit fai phuea bpra-yat fai / 关灯省电",
  },
  网络: {
    synonym: "ไวไฟ / wai-fai / 无线网络",
    antonym: "ไม่มีอินเทอร์เน็ต / mai mii in-thoe-net / 没有网络",
    comparison: "เน็ตช้า 是网速慢，เน็ตล่ม 是网络断了。",
    collocation: "ขอรหัสไวไฟได้ไหม / khaaw ra-hat wai-fai dai mai / 可以要无线网密码吗",
  },
  温度: {
    synonym: "อุณหภูมิ / un-ha-phuum / 温度",
    antonym: "เย็น / yen / 凉、冷",
    comparison: "ร้อน 是热，อบอ้าว 是闷热，หนาว 是冷。",
    collocation: "ปรับแอร์ให้เย็นขึ้น / bprap ae hai yen khuen / 把空调调凉一点",
  },
  噪音: {
    synonym: "เสียงดัง / siiang dang / 声音大、吵",
    antonym: "เงียบ / ngiiap / 安静",
    comparison: "เสียงดัง 是声音大，หนวกหู 更强调吵得烦。",
    collocation: "กรุณาเบาเสียง / ga-ru-naa bao siiang / 请放低声音",
  },
  空气: {
    synonym: "อากาศ / aa-gaat / 空气、天气",
    antonym: "อากาศไม่ดี / aa-gaat mai dii / 空气不好",
    comparison: "กลิ่น 是气味，ควัน 是烟，ฝุ่น 是灰尘。",
    collocation: "เปิดหน้าต่างให้อากาศถ่ายเท / bpoet naa-dtaang hai aa-gaat thaai thee / 开窗通风",
  },
  垃圾: {
    synonym: "แยกขยะ / yaaek kha-ya / 垃圾分类",
    antonym: "ทิ้งขยะผิดที่ / thing kha-ya phit thii / 垃圾丢错地方",
    comparison: "ขยะเปียก 是湿垃圾，ขยะรีไซเคิล 是可回收垃圾。",
    collocation: "ทิ้งขยะลงถังขยะ / thing kha-ya long thang kha-ya / 把垃圾丢进垃圾桶",
  },
  卫生: {
    synonym: "สะอาด / sa-aat / 干净",
    antonym: "สกปรก / sok-ga-bprok / 脏",
    comparison: "ทำความสะอาด 是打扫动作，รักษาความสะอาด 是保持清洁。",
    collocation: "ล้างมือด้วยสบู่ / laang mue duai sa-buu / 用肥皂洗手",
  },
  设施故障: {
    synonym: "ชำรุด / cham-rut / 损坏、故障",
    antonym: "ใช้ได้ / chai dai / 能用",
    comparison: "ชำรุด 常见于告示，พัง 更口语。",
    collocation: "แจ้งซ่อมเพราะใช้ไม่ได้ / jaaeng saawm phraw chai mai dai / 因不能用而报修",
  },
  环境描述: {
    synonym: "น่าอยู่ / naa yuu / 宜居",
    antonym: "ไม่น่าอยู่ / mai naa yuu / 不宜居",
    comparison: "สงบ 强调安静平和，วุ่นวาย 强调乱和吵。",
    collocation: "ห้องกว้าง สว่าง และปลอดภัย / haawng gwaang sa-waang lae bplaawt-phai / 房间宽敞、明亮且安全",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เมื่อพูดเรื่องที่อยู่หรือบริการพื้นฐาน ฉันใช้คำว่า “${row[1]}” เพื่ออธิบายสภาพแวดล้อมให้ชัดเจน`,
  roman: `muea phuut rueang thii yuu rue baaw-ri-gaan phuen-thaan chan chai kham waa "${row[2]}" phuea a-thi-baai sa-phaap waet-laawm hai chat-jen`,
  chinese: `谈住处或基础服务时，我会用“${row[1]}”把生活环境情况说明清楚。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "生活环境水电网", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 生活环境和基础设施表达。适合描述水电网、温度、噪音、空气、垃圾、卫生和设施故障；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: DAILY_ENVIRONMENT_UTILITIES_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_ENVIRONMENT_UTILITIES_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
