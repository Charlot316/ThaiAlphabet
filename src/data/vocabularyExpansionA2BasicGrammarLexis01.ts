export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicGrammarLexisTheme =
  | "关系指代"
  | "时间顺序"
  | "否定限制"
  | "疑问确认"
  | "数量分类"
  | "情态能力"
  | "连接转折"
  | "条件原因"
  | "比较程度"
  | "位置方向"
  | "动作频率"
  | "句型框架";

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
  theme: BasicGrammarLexisTheme,
];

const BASIC_GRAMMAR_LEXIS_REFS = [
  "worker-a-a2-basic-grammar-lexis",
  "basic-thai-grammar-support",
];

const rows: Row[] = [
  ["khon-thii-phuut-duai", "คนที่พูดด้วย", "khon thii phuut duai", "一起说话的人；谈话对象", "短语", "关系指代"],
  ["sing-thii-dtong-chai", "สิ่งที่ต้องใช้", "sing thii dtawng chai", "需要用的东西", "短语", "关系指代"],
  ["rueng-thii-yang-mai-khao-jai", "เรื่องที่ยังไม่เข้าใจ", "rueang thii yang mai khao jai", "还不明白的事情", "短语", "关系指代"],
  ["thi-thii-nat-kan-wai", "ที่ที่นัดกันไว้", "thii thii nat gan wai", "约好的地方", "短语", "关系指代"],
  ["wela-thii-saduak", "เวลาที่สะดวก", "we-laa thii sa-duak", "方便的时间", "短语", "关系指代"],
  ["baep-thii-ngai-gwaa", "แบบที่ง่ายกว่า", "baaep thii ngaai gwaa", "更简单的那种方式", "短语", "关系指代"],
  ["khon-thii-chuai-dai", "คนที่ช่วยได้", "khon thii chuai dai", "能帮忙的人", "短语", "关系指代"],
  ["an-thii-yuu-khang-bon", "อันที่อยู่ข้างบน", "an thii yuu khaang bon", "在上面的那个", "短语", "关系指代"],
  ["gawn-ja-roem-rian", "ก่อนจะเริ่มเรียน", "gaawn ja roem riian", "开始学习之前", "短语", "时间顺序"],
  ["lang-ja-gin-khaao", "หลังจากกินข้าว", "lang jaak gin khaao", "吃完饭之后", "短语", "时间顺序"],
  ["nai-khana-thii-raw", "ในขณะที่รอ", "nai kha-na thii raaw", "等待的时候", "短语", "时间顺序"],
  ["phaw-thueng-baan", "พอถึงบ้าน", "phaaw thueng baan", "一到家就……", "短语", "时间顺序"],
  ["dtawn-thii-fon-tok", "ตอนที่ฝนตก", "dtaawn thii fon dtok", "下雨的时候", "短语", "时间顺序"],
  ["muea-wan-nii-chao", "เมื่อวันนี้เช้า", "muea wan nii chao", "今天早上的时候", "短语", "时间顺序"],
  ["iik-sak-phak-nueng", "อีกสักพักหนึ่ง", "iik sak phak nueng", "再过一会儿", "短语", "时间顺序"],
  ["thang-wan-nii", "ทั้งวันนี้", "thang wan nii", "今天一整天", "副词", "时间顺序"],
  ["mai-khoi-mii-wela-waang", "ไม่ค่อยมีเวลาว่าง", "mai khaawy mii we-laa waang", "不太有空闲时间", "句型", "否定限制"],
  ["yang-mai-dai-lawk-in", "ยังไม่ได้ล็อกอิน", "yang mai dai lawk-in", "还没有登录", "句型", "否定限制"],
  ["mai-chai-rueng-yai", "ไม่ใช่เรื่องใหญ่", "mai chai rueang yai", "不是大事", "句型", "否定限制"],
  ["mai-dtong-song-thuk-wan", "ไม่ต้องส่งทุกวัน", "mai dtawng song thuk wan", "不需要每天发送", "句型", "否定限制"],
  ["mai-khuan-phuut-daeng", "ไม่ควรพูดเสียงดัง", "mai khuan phuut siiang dang", "不应该大声说话", "句型", "否定限制"],
  ["yang-mai-khrup-thuk-khon", "ยังไม่ครบทุกคน", "yang mai khrop thuk khon", "人还没有到齐", "句型", "否定限制"],
  ["mai-mii-arai-dtong-klua", "ไม่มีอะไรต้องกลัว", "mai mii a-rai dtawng glua", "没有什么需要害怕", "句型", "否定限制"],
  ["mai-dai-mai-yaak-chuai", "ไม่ได้ไม่อยากช่วย", "mai dai mai yaak chuai", "并不是不想帮忙", "句型", "否定限制"],
  ["tham-mai-thueng-chaa", "ทำไมถึงช้า", "tham mai thueng chaa", "为什么会慢/迟", "句型", "疑问确认"],
  ["muea-rai-ja-saduak", "เมื่อไรจะสะดวก", "muea rai ja sa-duak", "什么时候会方便", "句型", "疑问确认"],
  ["khrai-pen-khon-rap", "ใครเป็นคนรับ", "khrai bpen khon rap", "谁负责接收", "句型", "疑问确认"],
  ["dtong-chai-an-nai", "ต้องใช้อันไหน", "dtawng chai an nai", "需要用哪一个", "句型", "疑问确认"],
  ["tham-yang-nii-thuuk-mai", "ทำอย่างนี้ถูกไหม", "tham yaang nii thuuk mai", "这样做对吗", "句型", "疑问确认"],
  ["chai-baep-nii-rue-plao", "ใช่แบบนี้หรือเปล่า", "chai baaep nii rue bplaao", "是不是这样", "句型", "疑问确认"],
  ["mee-kham-thaam-phoem-mai", "มีคำถามเพิ่มไหม", "mii kham thaam phoem mai", "还有补充问题吗", "句型", "疑问确认"],
  ["khao-jai-khrueang-mai", "เข้าใจเครื่องหมายไหม", "khao jai khreuuang maai mai", "看懂这个标记吗", "句型", "疑问确认"],
  ["khon-la-nueng-chin", "คนละหนึ่งชิ้น", "khon la nueng chin", "每人一件", "短语", "数量分类"],
  ["wan-la-song-khrang-lang-aahaan", "วันละสองครั้งหลังอาหาร", "wan la saawng khrang lang aa-haan", "每天饭后两次", "短语", "数量分类"],
  ["deuan-la-nueng-khrang-ton-deuan", "เดือนละครั้งตอนต้นเดือน", "duean la nueng khrang dtaawn dton duean", "每月月初一次", "短语", "数量分类"],
  ["thii-la-sam-kham", "ทีละสามคำ", "thii la saam kham", "一次三个词", "短语", "数量分类"],
  ["an-la-haa-baht", "อันละห้าบาท", "an la haa baat", "每个五泰铢", "短语", "数量分类"],
  ["song-glong-khrueng", "สองกล่องครึ่ง", "saawng glaawng khrueng", "两盒半", "短语", "数量分类"],
  ["iik-nueng-khuu", "อีกหนึ่งคู่", "iik nueng khuu", "再一双/一对", "短语", "数量分类"],
  ["khrop-sip-khon-phaw-dii", "ครบสิบคนพอดี", "khrop sip khon phaaw-dii", "刚好十个人齐了", "句型", "数量分类"],
  ["samat-jaai-online-dai", "สามารถจ่ายออนไลน์ได้", "sa-maat jaai awn-lai dai", "可以线上付款", "句型", "情态能力"],
  ["dtong-jaeng-luang-na", "ต้องแจ้งล่วงหน้า", "dtawng jaaeng luang naa", "必须提前通知", "句型", "情态能力"],
  ["khuan-triiam-bat-wai", "ควรเตรียมบัตรไว้", "khuan dtriiam bat wai", "应该准备好卡/证件", "句型", "情态能力"],
  ["aat-ja-plian-wela", "อาจจะเปลี่ยนเวลา", "aat ja bpliian we-laa", "可能会改时间", "句型", "情态能力"],
  ["kho-jao-maa-duu-dai", "ขอเข้ามาดูได้", "khaaw khao maa duu dai", "可以请求进来看", "句型", "情态能力"],
  ["mai-samat-poet-file", "ไม่สามารถเปิดไฟล์", "mai sa-maat bpoet fai", "无法打开文件", "句型", "情态能力"],
  ["na-ja-dtong-raw", "น่าจะต้องรอ", "naa ja dtawng raaw", "大概要等", "句型", "情态能力"],
  ["khae-tham-taam-khan-ton", "แค่ทำตามขั้นตอน", "khaae tham dtaam khan dtaawn", "只要按步骤做", "句型", "情态能力"],
  ["dtae-yang-mai-phraawm", "แต่ยังไม่พร้อม", "dtaae yang mai phraawm", "但是还没准备好", "句型", "连接转折"],
  ["laew-khoi-song-hai", "แล้วค่อยส่งให้", "laew khaawy song hai", "然后再发给……", "句型", "连接转折"],
  ["lae-dtong-long-chue", "และต้องลงชื่อ", "lae dtawng long chue", "并且要签名", "句型", "连接转折"],
  ["ruue-ja-raw-gawn", "หรือจะรอก่อน", "rue ja raaw gaawn", "或者先等", "句型", "连接转折"],
  ["dtae-thaa-mai-than", "แต่ถ้าไม่ทัน", "dtaae thaa mai than", "但如果来不及", "短语", "连接转折"],
  ["soen-nan-jaai-gawn", "ส่วนฉันจ่ายก่อน", "suan chan jaai gaawn", "至于我先付款", "句型", "连接转折"],
  ["dtae-wa-yang-mai-nae-jai", "แต่ว่ายังไม่แน่ใจ", "dtaae waa yang mai naae jai", "不过还不确定", "句型", "连接转折"],
  ["laew-go-mai-dtong-riip", "แล้วก็ไม่ต้องรีบ", "laew gaw mai dtawng riip", "而且不用急", "句型", "连接转折"],
  ["thaa-mi-pan-ha", "ถ้ามีปัญหา", "thaa mii bpan-haa", "如果有问题", "短语", "条件原因"],
  ["phraw-wan-nii-yung", "เพราะวันนี้ยุ่ง", "phraw wan nii yung", "因为今天忙", "短语", "条件原因"],
  ["loei-dtong-luean-nat", "เลยต้องเลื่อนนัด", "loei dtawng luean nat", "所以要改约", "句型", "条件原因"],
  ["thaa-mai-saduak", "ถ้าไม่สะดวก", "thaa mai sa-duak", "如果不方便", "短语", "条件原因"],
  ["phraw-yang-mai-ruu", "เพราะยังไม่รู้", "phraw yang mai ruu", "因为还不知道", "短语", "条件原因"],
  ["go-loei-tham-mai-dai", "ก็เลยทำไม่ได้", "gaw loei tham mai dai", "所以做不了", "句型", "条件原因"],
  ["thaa-phraawm-laew", "ถ้าพร้อมแล้ว", "thaa phraawm laew", "如果准备好了", "短语", "条件原因"],
  ["phraw-het-nii-jueng-dtong-raw", "เพราะเหตุนี้จึงต้องรอ", "phraw heet nii jeung dtawng raaw", "因此必须等待", "句型", "条件原因"],
  ["ngaai-gwaa-thii-khit", "ง่ายกว่าที่คิด", "ngaai gwaa thii khit", "比想的简单", "句型", "比较程度"],
  ["yak-gwaa-muea-wan", "ยากกว่าเมื่อวาน", "yaak gwaa muea waan", "比昨天难", "句型", "比较程度"],
  ["reo-khuen-iik-nit", "เร็วขึ้นอีกนิด", "reo khuen iik nit", "再快一点", "短语", "比较程度"],
  ["chaa-long-mak", "ช้าลงมาก", "chaa long maak", "慢了很多", "短语", "比较程度"],
  ["phaw-di-gamlang-dii", "พอดีกำลังดี", "phaaw-dii gam-lang dii", "刚刚好", "短语", "比较程度"],
  ["mai-khoi-taang-gan", "ไม่ค่อยต่างกัน", "mai khaawy dtaang gan", "不太一样/差别不大", "句型", "比较程度"],
  ["dii-tee-sut-samrap-chan", "ดีที่สุดสำหรับฉัน", "dii thii sut sam-rap chan", "对我来说最好", "句型", "比较程度"],
  ["phaeng-goen-ngop", "แพงเกินงบ", "phaaeng goen ngop", "贵过预算", "短语", "比较程度"],
  ["yuu-trong-khaam-ran", "อยู่ตรงข้ามร้าน", "yuu dtrong khaam raan", "在店对面", "句型", "位置方向"],
  ["yuu-thad-jaak-hawng-nam", "อยู่ถัดจากห้องน้ำ", "yuu that jaak hawng naam", "在厕所旁边下一间", "句型", "位置方向"],
  ["doen-khao-pai-khang-nai", "เดินเข้าไปข้างใน", "doen khao bpai khaang nai", "往里面走进去", "动词", "位置方向"],
  ["awk-maa-khang-nawk", "ออกมาข้างนอก", "awk maa khaang naawk", "出来到外面", "动词", "位置方向"],
  ["khuen-pai-chan-song", "ขึ้นไปชั้นสอง", "khuen bpai chan saawng", "上到二楼", "动词", "位置方向"],
  ["long-maa-chang-laang", "ลงมาชั้นล่าง", "long maa chan laang", "下到楼下", "动词", "位置方向"],
  ["liiao-sai-lang-saphan", "เลี้ยวซ้ายหลังสะพาน", "liaao saai lang sa-phaan", "过桥后左转", "动词", "位置方向"],
  ["trong-pai-john-thueng-sii-yaek", "ตรงไปจนถึงสี่แยก", "dtrong bpai jon thueng sii yaaek", "直走直到十字路口", "动词", "位置方向"],
  ["tham-pen-prajam-ton-chao", "ทำเป็นประจำตอนเช้า", "tham bpen bpra-jam dtaawn chao", "早上固定做", "动词", "动作频率"],
  ["ma-saai-bang-khrang", "มาสายบางครั้ง", "maa saai baang khrang", "有时候迟到", "句型", "动作频率"],
  ["mai-khoi-ok-gamlang", "ไม่ค่อยออกกำลัง", "mai khaawy awk gam-lang", "不太运动", "句型", "动作频率"],
  ["nai-baang-wan", "ในบางวัน", "nai baang wan", "在某些日子", "短语", "动作频率"],
  ["theuk-wan-sao", "ทุกวันเสาร์", "thuk wan sao", "每个星期六", "短语", "动作频率"],
  ["sapdaa-la-song-khrang", "สัปดาห์ละสองครั้ง", "sap-daa la saawng khrang", "每周两次", "短语", "动作频率"],
  ["nan-nan-khrang-chuang-wan-yut", "นาน ๆ ครั้งช่วงวันหยุด", "naan naan khrang chuang wan yut", "假期里偶尔一次", "短语", "动作频率"],
  ["thuk-khrang-thii-ma", "ทุกครั้งที่มา", "thuk khrang thii maa", "每次来时", "短语", "动作频率"],
  ["tham-hai-ruu-suek-dii", "ทำให้รู้สึกดี", "tham hai ruu-suek dii", "让人感觉好", "句型", "句型框架"],
  ["mee-khon-bok-waa", "มีคนบอกว่า", "mii khon baawk waa", "有人说……", "句型", "句型框架"],
  ["yang-mai-ruu-waa", "ยังไม่รู้ว่า", "yang mai ruu waa", "还不知道……", "句型", "句型框架"],
  ["khit-waa-naa-ja-dai", "คิดว่าน่าจะได้", "khit waa naa ja dai", "觉得大概可以", "句型", "句型框架"],
  ["yaak-hai-chuai-duu", "อยากให้ช่วยดู", "yaak hai chuai duu", "想请帮忙看", "句型", "句型框架"],
  ["dtong-rian-ruu-withi", "ต้องเรียนรู้วิธี", "dtawng riian ruu wi-thii", "需要学习方法", "句型", "句型框架"],
  ["phueng-khao-jai-waa", "เพิ่งเข้าใจว่า", "phoeng khao jai waa", "刚明白……", "句型", "句型框架"],
  ["kho-hai-song-mai", "ขอให้ส่งใหม่", "khaaw hai song mai", "请重新发送", "句型", "句型框架"],
];

const relatedByTheme: Record<
  BasicGrammarLexisTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  关系指代: {
    synonym: "สิ่งที่ต้องใช้ / sing thii dtawng chai / 需要用的东西",
    antonym: "สิ่งที่ไม่ต้องใช้ / sing thii mai dtawng chai / 不需要用的东西",
    comparison: "ที่ 可连接名词和说明内容，相当于“……的”。",
    collocation: "เวลาที่สะดวกและที่ที่นัดกันไว้ / we-laa thii sa-duak lae thii thii nat gan wai / 方便的时间和约好的地方",
  },
  时间顺序: {
    synonym: "หลังจากกินข้าว / lang jaak gin khaao / 吃饭之后",
    antonym: "ก่อนจะเริ่ม / gaawn ja roem / 开始之前",
    comparison: "ก่อน 表示之前，หลังจาก 表示之后，ตอนที่ 表示当……时。",
    collocation: "ก่อนจะเริ่มเรียน ขอเช็กชื่อก่อน / gaawn ja roem riian khaaw chek chue gaawn / 开始上课前，请先点名",
  },
  否定限制: {
    synonym: "ไม่ค่อยมีเวลา / mai khaawy mii we-laa / 不太有时间",
    antonym: "มีเวลาพอ / mii we-laa phaaw / 时间够",
    comparison: "ไม่ค่อย 表示“不太”，ยังไม่ได้ 表示“还没有”。",
    collocation: "ยังไม่ได้ล็อกอิน เลยส่งไม่ได้ / yang mai dai lawk-in loei song mai dai / 还没登录，所以不能发送",
  },
  疑问确认: {
    synonym: "ใช่แบบนี้หรือเปล่า / chai baaep nii rue bplaao / 是不是这样",
    antonym: "ไม่ต้องถาม / mai dtawng thaam / 不用问",
    comparison: "ไหม 是一般疑问，หรือเปล่า 常用于确认是否如此。",
    collocation: "ทำอย่างนี้ถูกไหม ถ้าไม่ถูกช่วยบอกหน่อย / tham yaang nii thuuk mai thaa mai thuuk chuai baawk naawy / 这样做对吗，不对请告诉我",
  },
  数量分类: {
    synonym: "คนละหนึ่งชิ้น / khon la nueng chin / 每人一件",
    antonym: "ไม่ครบจำนวน / mai khrop jam-nuan / 数量不齐",
    comparison: "ละ 表示“每……”，ทีละ 表示“一次……”。",
    collocation: "วันละสองครั้ง ครั้งละหนึ่งเม็ด / wan la saawng khrang khrang la nueng met / 每天两次，每次一片",
  },
  情态能力: {
    synonym: "สามารถจ่ายออนไลน์ได้ / sa-maat jaai awn-lai dai / 可以线上付款",
    antonym: "ไม่สามารถเปิดไฟล์ / mai sa-maat bpoet fai / 无法打开文件",
    comparison: "สามารถ...ได้ 比 ...ได้ 稍正式；ควร 表示应该，ต้อง 表示必须。",
    collocation: "ต้องแจ้งล่วงหน้า เพราะอาจจะเปลี่ยนเวลา / dtawng jaaeng luang naa phraw aat ja bpliian we-laa / 必须提前通知，因为可能改时间",
  },
  连接转折: {
    synonym: "แต่ว่ายังไม่แน่ใจ / dtaae waa yang mai naae jai / 不过还不确定",
    antonym: "ไม่มีแต่ / mai mii dtaae / 没有但是",
    comparison: "แต่ 表示转折，แล้วค่อย 表示之后再做，หรือ 表示或者。",
    collocation: "ส่งให้แล้วค่อยโทรบอก / song hai laew khaawy thoo baawk / 发过去之后再打电话说",
  },
  条件原因: {
    synonym: "ถ้ามีปัญหา / thaa mii bpan-haa / 如果有问题",
    antonym: "ไม่มีเหตุผล / mai mii heet phon / 没有原因",
    comparison: "ถ้า 表示条件，เพราะ 表示原因，เลย 表示结果。",
    collocation: "ถ้าไม่สะดวกก็เลยต้องเลื่อนนัด / thaa mai sa-duak gaw loei dtawng luean nat / 如果不方便，所以要改约",
  },
  比较程度: {
    synonym: "ง่ายกว่าที่คิด / ngaai gwaa thii khit / 比想的简单",
    antonym: "ยากกว่าที่คิด / yaak gwaa thii khit / 比想的难",
    comparison: "กว่า 表示比较，ขึ้น/ลง 表示程度变化。",
    collocation: "เร็วขึ้นอีกนิดก็จะทัน / reo khuen iik nit gaw ja than / 再快一点就赶得上",
  },
  位置方向: {
    synonym: "อยู่ตรงข้ามร้าน / yuu dtrong khaam raan / 在店对面",
    antonym: "อยู่ไกลจากร้าน / yuu glai jaak raan / 离店远",
    comparison: "เข้าไป 表示向里面去，ออกมา 表示向外出来。",
    collocation: "เดินเข้าไปข้างในแล้วเลี้ยวซ้าย / doen khao bpai khaang nai laew liaao saai / 往里面走进去然后左转",
  },
  动作频率: {
    synonym: "ทำเป็นประจำ / tham bpen bpra-jam / 经常做",
    antonym: "ไม่เคยทำ / mai khoei tham / 从没做过",
    comparison: "ทุก 表示每，บางครั้ง 表示有时，นาน ๆ ครั้ง 表示偶尔。",
    collocation: "สัปดาห์ละสองครั้งแต่ไม่ค่อยออกกำลัง / sap-daa la saawng khrang dtaae mai khaawy awk gam-lang / 每周两次，但不太运动",
  },
  句型框架: {
    synonym: "คิดว่าน่าจะได้ / khit waa naa ja dai / 觉得大概可以",
    antonym: "คิดว่าไม่ได้ / khit waa mai dai / 觉得不行",
    comparison: "ว่า 用来引出想法或内容，ให้ 常引出希望别人做的动作。",
    collocation: "อยากให้ช่วยดู เพราะยังไม่รู้ว่าแก้ยังไง / yaak hai chuai duu phraw yang mai ruu waa gaae yang ngai / 想请帮忙看，因为还不知道怎么改",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาเรียนไวยากรณ์พื้นฐาน ฉันใช้ “${row[1]}” เพื่อแต่งประโยคให้ชัดและเข้าใจง่ายขึ้น`,
  roman: `wee-laa riian wai-yaa-gaawn phuen-thaan chan chai "${row[2]}" phuea dtaeng bpra-yook hai chat lae khao jai ngaai khuen`,
  chinese: `学习基础语法时，我用“${row[1]}”来造句，让句子更清楚、更容易理解。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "基础语法词汇", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `支撑 A2 基础语法课程的常用搭配。可用于关系词、时间、否定、疑问、数量、情态和连接表达；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_GRAMMAR_LEXIS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_GRAMMAR_LEXIS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
