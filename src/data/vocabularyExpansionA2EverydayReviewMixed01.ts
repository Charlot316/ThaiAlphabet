export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type EverydayReviewMixedTheme =
  | "出门路上"
  | "顺便"
  | "手机消息"
  | "小错误"
  | "缺东西"
  | "支付小事"
  | "等候进度"
  | "简单安排"
  | "安全提醒"
  | "收尾复盘";

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
  theme: EverydayReviewMixedTheme,
];

const EVERYDAY_REVIEW_MIXED_REFS = [
  "worker-a-a2-everyday-review-mixed",
  "basic-thai-everyday-review",
];

const rows: Row[] = [
  ["kamlang-awk-jaak-baan", "กำลังออกจากบ้าน", "gam-lang awk jaak baan", "正在出门", "句型", "出门路上"],
  ["awk-maa-laew", "ออกมาแล้ว", "awk maa laew", "已经出来了", "句型", "出门路上"],
  ["yang-yuu-bon-thaang", "ยังอยู่บนทาง", "yang yuu bon thaang", "还在路上", "句型", "出门路上"],
  ["glai-ja-thueng-laew", "ใกล้จะถึงแล้ว", "glai ja thueng laew", "快到了", "句型", "出门路上"],
  ["thueng-naa-baan-laew", "ถึงหน้าบ้านแล้ว", "thueng naa baan laew", "到家门口了", "句型", "出门路上"],
  ["raw-thii-naa-ran", "รอที่หน้าร้าน", "raaw thii naa raan", "在店门口等", "句型", "出门路上"],
  ["long-thii-bpaai-naa", "ลงที่ป้ายหน้า", "long thii bpaai naa", "在下一站下", "句型", "出门路上"],
  ["doen-bpai-iik-nit", "เดินไปอีกนิด", "doen bpai iik nit", "再走一点", "句型", "出门路上"],
  ["thang-nii-reo-gwaa", "ทางนี้เร็วกว่า", "thaang nii reo gwaa", "这条路更快", "句型", "出门路上"],
  ["doen-glap-thaang-doem", "เดินกลับทางเดิม", "doen glap thaang doem", "按原路走回去", "动词", "出门路上"],
  ["sue-fak-duai", "ซื้อฝากด้วย", "sue faak duai", "顺便买来给别人", "句型", "顺便"],
  ["bpai-thaang-diao-gan", "ไปทางเดียวกัน", "bpai thaang diao gan", "顺路；同一方向", "句型", "顺便"],
  ["khaak-bpai-duai", "แวะไปด้วย", "wae bpai duai", "顺便过去一趟", "动词", "顺便"],
  ["khaak-sue-khaawng", "แวะซื้อของ", "wae sue khaawng", "顺路买东西", "动词", "顺便"],
  ["khaak-rap-khaawng", "แวะรับของ", "wae rap khaawng", "顺路取东西", "动词", "顺便"],
  ["fak-sue-dai-mai", "ฝากซื้อได้ไหม", "faak sue dai mai", "可以帮忙顺便买吗", "句型", "顺便"],
  ["mai-dtawng-bpai-phiset", "ไม่ต้องไปพิเศษ", "mai dtawng bpai phi-seet", "不用特地去", "句型", "顺便"],
  ["thaa-phan-thaang-nan", "ถ้าผ่านทางนั้น", "thaa phaan thaang nan", "如果经过那边", "句型", "顺便"],
  ["ao-glap-maa-duai", "เอากลับมาด้วย", "ao glap maa duai", "顺便带回来", "句型", "顺便"],
  ["mai-lam-baak-go-fak", "ไม่ลำบากก็ฝาก", "mai lam-baak gaw faak", "不麻烦的话就拜托", "句型", "顺便"],
  ["chaat-bat-mue-thue", "ชาร์จแบตมือถือ", "chaat baet mue-thue", "给手机充电", "动词", "手机消息"],
  ["bat-mue-thue-mot", "แบตมือถือหมด", "baet mue-thue mot", "手机没电了", "句型", "手机消息"],
  ["mue-thue-ja-dap", "มือถือจะดับ", "mue-thue ja dap", "手机快关机了", "句型", "手机消息"],
  ["song-location-hai", "ส่งโลเคชันให้", "song loo-khee-chan hai", "把定位发给……", "动词", "手机消息"],
  ["pin-location-wai", "ปักโลเคชันไว้", "bpak loo-khee-chan wai", "标记定位", "动词", "手机消息"],
  ["khaaw-duu-khaaw-khwaam", "ขอดูข้อความ", "khaaw duu khaaw khwaam", "请看一下消息", "句型", "手机消息"],
  ["phim-phit-auto", "พิมพ์ผิดอัตโนมัติ", "phim phit at-dta-no-mat", "自动输入打错", "句型", "手机消息"],
  ["song-ruup-mai-chad", "ส่งรูปไม่ชัด", "song ruup mai chat", "发的照片不清楚", "句型", "手机消息"],
  ["mai-dai-yin-siang-thoo", "ไม่ได้ยินเสียงโทร", "mai dai yin siiang thoo", "没听到电话声", "句型", "手机消息"],
  ["ja-dtaawp-muea-hen", "จะตอบเมื่อเห็น", "ja dtaawp muea hen", "看到后会回复", "句型", "手机消息"],
  ["doen-loei-thaang-khao", "เดินเลยทางเข้า", "doen loei thaang khao", "走过了入口", "动词", "小错误"],
  ["khao-phit-thaang", "เข้าผิดทาง", "khao phit thaang", "进错入口/路", "动词", "小错误"],
  ["dtaaw-phit-thaaeo", "ต่อผิดแถว", "dtaaw phit thaaeo", "排错队", "动词", "小错误"],
  ["yip-phit-aan", "หยิบผิดอัน", "yip phit an", "拿错一个", "动词", "小错误"],
  ["ao-ma-sap-gan", "เอามาสลับกัน", "ao maa sa-lap gan", "拿来后弄反了", "句型", "小错误"],
  ["song-hai-phit-khon", "ส่งให้ผิดคน", "song hai phit khon", "发给错的人", "句型", "小错误"],
  ["jam-wan-nat-phit", "จำวันนัดผิด", "jam wan nat phit", "记错预约日期", "动词", "小错误"],
  ["duu-welaa-phit", "ดูเวลาผิด", "duu we-laa phit", "看错时间", "动词", "小错误"],
  ["khao-jai-khon-la-rueng", "เข้าใจคนละเรื่อง", "khao jai khon la rueang", "理解成两回事", "句型", "小错误"],
  ["khaaw-gae-khwaam-khao-jai", "ขอแก้ความเข้าใจ", "khaaw gaae khwaam khao jai", "请允许纠正理解", "句型", "小错误"],
  ["mai-dai-ao-bat-maa", "ไม่ได้เอาบัตรมา", "mai dai ao bat maa", "没带卡/证件来", "句型", "缺东西"],
  ["mai-dai-ao-ngoen-sot", "ไม่ได้เอาเงินสด", "mai dai ao ngoen sot", "没带现金", "句型", "缺东西"],
  ["mai-dai-ao-rom", "ไม่ได้เอาร่ม", "mai dai ao rom", "没带伞", "句型", "缺东西"],
  ["khaat-ek-ga-saan", "ขาดเอกสาร", "khaat ek-ga-saan", "缺文件", "句型", "缺东西"],
  ["khaat-lak-thaan", "ขาดหลักฐาน", "khaat lak-thaan", "缺证明材料", "句型", "缺东西"],
  ["dtawng-glap-bpai-ao", "ต้องกลับไปเอา", "dtawng glap bpai ao", "必须回去拿", "句型", "缺东西"],
  ["fak-wai-thii-baan", "ฝากไว้ที่บ้าน", "faak wai thii baan", "落/留在家里", "句型", "缺东西"],
  ["ao-maa-mai-khrop", "เอามาไม่ครบ", "ao maa mai khrop", "带来的不全", "句型", "缺东西"],
  ["dtawng-song-thii-lang", "ต้องส่งทีหลัง", "dtawng song thii lang", "需要之后补交", "句型", "缺东西"],
  ["khaaw-song-dtaam-lang", "ขอส่งตามหลัง", "khaaw song dtaam lang", "请求之后补交", "句型", "缺东西"],
  ["scan-mai-khuen", "สแกนไม่ขึ้น", "sa-gaaen mai khuen", "扫码扫不出来", "句型", "支付小事"],
  ["on-ngoen-mai-khao", "โอนเงินไม่เข้า", "oon ngoen mai khao", "转账没到账", "句型", "支付小事"],
  ["yot-ngoen-mai-trong", "ยอดเงินไม่ตรง", "yaawt ngoen mai dtrong", "金额不对", "句型", "支付小事"],
  ["khit-yot-phit", "คิดยอดผิด", "khit yaawt phit", "算错金额", "动词", "支付小事"],
  ["thawn-ngoen-khaat", "ทอนเงินขาด", "thaawn ngoen khaat", "找零少了", "句型", "支付小事"],
  ["thawn-ngoen-goen", "ทอนเงินเกิน", "thaawn ngoen goen", "找零多了", "句型", "支付小事"],
  ["khaaw-jaai-yaek", "ขอจ่ายแยก", "khaaw jaai yaaek", "请求分开付款", "句型", "支付小事"],
  ["khaaw-han-khaa", "ขอหารค่า", "khaaw haan khaa", "请求平摊费用", "句型", "支付小事"],
  ["jaai-thaen-gaawn", "จ่ายแทนก่อน", "jaai thaaen gaawn", "先代付", "动词", "支付小事"],
  ["khaaw-khuen-ngoen-bang-suan", "ขอคืนเงินบางส่วน", "khaaw khuen ngoen baang suan", "请求部分退款", "句型", "支付小事"],
  ["yang-raw-kham-dtaawp", "ยังรอคำตอบ", "yang raaw kham dtaawp", "还在等答复", "句型", "等候进度"],
  ["raw-phon-yuen-yan", "รอผลยืนยัน", "raaw phon yuen yan", "等待确认结果", "动词", "等候进度"],
  ["gamlang-dtruat-hai", "กำลังตรวจให้", "gam-lang dtruat hai", "正在帮忙检查", "句型", "等候进度"],
  ["gamlang-jaeng-phuu-duu-lae", "กำลังแจ้งผู้ดูแล", "gam-lang jaaeng phuu duu laae", "正在通知负责人", "句型", "等候进度"],
  ["iik-sak-phak-ja-ruu", "อีกสักพักจะรู้", "iik sak phak ja ruu", "再过一会儿会知道", "句型", "等候进度"],
  ["khaaw-dtit-dtaam-phon", "ขอติดตามผล", "khaaw dtit dtaam phon", "请求跟进结果", "句型", "等候进度"],
  ["jaeng-phon-glap-maa", "แจ้งผลกลับมา", "jaaeng phon glap maa", "把结果反馈回来", "动词", "等候进度"],
  ["yang-mai-mi-khwaam-khuen-naa", "ยังไม่มีความคืบหน้า", "yang mai mii khwaam khuep naa", "还没有进展", "句型", "等候进度"],
  ["khuep-naa-laew", "คืบหน้าแล้ว", "khuep naa laew", "已经有进展", "句型", "等候进度"],
  ["khaaw-welaa-iik-nit", "ขอเวลาอีกนิด", "khaaw we-laa iik nit", "请再给一点时间", "句型", "等候进度"],
  ["ruam-gan-tham", "รวมกันทำ", "ruam gan tham", "合起来一起做", "动词", "简单安排"],
  ["baeng-bpen-saawng-suan", "แบ่งเป็นสองส่วน", "baeng bpen saawng suan", "分成两部分", "动词", "简单安排"],
  ["tham-thii-la-rueng", "ทำทีละเรื่อง", "tham thii la rueang", "一件一件做", "短语", "简单安排"],
  ["roem-jaak-rueng-ngai", "เริ่มจากเรื่องง่าย", "roem jaak rueang ngaai", "从简单的事开始", "句型", "简单安排"],
  ["wai-tham-ton-yen", "ไว้ทำตอนเย็น", "wai tham dtaawn yen", "留到傍晚做", "句型", "简单安排"],
  ["plian-bpen-phrueng-nii-chao", "เปลี่ยนเป็นพรุ่งนี้เช้า", "bpliian bpen phrung nii chao", "改成明早", "句型", "简单安排"],
  ["phop-gan-krueng-thaang", "พบกันครึ่งทาง", "phop gan khrueng thaang", "在中间地点见", "句型", "简单安排"],
  ["tham-hai-than-gaawn-bai", "ทำให้ทันก่อนบ่าย", "tham hai than gaawn baai", "赶在下午前做完", "句型", "简单安排"],
  ["chuai-dtriiam-khaawng", "ช่วยเตรียมของ", "chuai dtriiam khaawng", "帮忙准备东西", "动词", "简单安排"],
  ["sa-rup-sing-thii-dtawng-tham", "สรุปสิ่งที่ต้องทำ", "sa-rup sing thii dtawng tham", "总结要做的事", "动词", "简单安排"],
  ["rawang-khan-bandai", "ระวังขั้นบันได", "ra-wang khan ban-dai", "小心台阶", "短语", "安全提醒"],
  ["rawang-phuen-dtaek", "ระวังพื้นแตก", "ra-wang phuen dtaaek", "小心地面破裂", "短语", "安全提醒"],
  ["yaa-waang-khwaang-thaang", "อย่าวางขวางทาง", "yaa waang khwaang thaang", "不要挡路摆放", "句型", "安全提醒"],
  ["gep-khaawng-mi-khom", "เก็บของมีคม", "gep khaawng mii khom", "收好尖锐物品", "动词", "安全提醒"],
  ["dtawng-sai-rawng-thao", "ต้องใส่รองเท้า", "dtawng sai raawng thaao", "必须穿鞋", "句型", "安全提醒"],
  ["mue-yaak-jap", "มืออย่าจับ", "mue yaa jap", "手不要碰", "句型", "安全提醒"],
  ["yaa-bpoet-eng", "อย่าเปิดเอง", "yaa bpoet eng", "不要自己打开", "句型", "安全提醒"],
  ["raw-hai-chaang-maa", "รอให้ช่างมา", "raaw hai chaang maa", "等师傅来", "句型", "安全提醒"],
  ["dtit-bpaai-dteuan", "ติดป้ายเตือน", "dtit bpaai dteuan", "贴警示牌", "动词", "安全提醒"],
  ["phuen-thii-nii-mai-bplaawt-phai", "พื้นที่นี้ไม่ปลอดภัย", "phuen thii nii mai bplaawt-phai", "这个区域不安全", "句型", "安全提醒"],
  ["wan-nii-riiap-roi-thuk-yaang", "วันนี้เรียบร้อยทุกอย่าง", "wan nii riiap raawy thuk yaang", "今天一切都办妥了", "句型", "收尾复盘"],
  ["yang-luea-iik-rueng", "ยังเหลืออีกเรื่อง", "yang luea iik rueang", "还剩一件事", "句型", "收尾复盘"],
  ["phrueng-nii-tham-dtaaw", "พรุ่งนี้ทำต่อ", "phrung nii tham dtaaw", "明天继续做", "句型", "收尾复盘"],
  ["jot-wai-gan-luem", "จดไว้กันลืม", "jot wai gan luem", "记下来防止忘记", "动词", "收尾复盘"],
  ["thaai-ruup-gep-wai", "ถ่ายรูปเก็บไว้", "thaai ruup gep wai", "拍照保存", "动词", "收尾复盘"],
  ["song-hai-duu-laew", "ส่งให้ดูแล้ว", "song hai duu laew", "已经发给看了", "句型", "收尾复盘"],
  ["dai-ruu-withi-laew", "ได้รู้วิธีแล้ว", "dai ruu wi-thii laew", "已经知道方法了", "句型", "收尾复盘"],
  ["khrang-naa-ja-ngai-khuen", "ครั้งหน้าจะง่ายขึ้น", "khrang naa ja ngaai khuen", "下次会更容易", "句型", "收尾复盘"],
  ["mai-dtawng-tham-sam", "ไม่ต้องทำซ้ำ", "mai dtawng tham sam", "不用重复做", "句型", "收尾复盘"],
  ["sa-rup-wa-set-laew", "สรุปว่าเสร็จแล้ว", "sa-rup waa set laew", "总结来说已经完成", "句型", "收尾复盘"],
];

const relatedByTheme: Record<
  EverydayReviewMixedTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  出门路上: {
    synonym: "ยังอยู่บนทาง / yang yuu bon thaang / 还在路上",
    antonym: "ถึงแล้ว / thueng laew / 已经到了",
    comparison: "ใกล้จะถึงแล้ว 表示快到了，ยังอยู่บนทาง 表示还在路上。",
    collocation: "ใกล้จะถึงแล้ว รอที่หน้าร้าน / glai ja thueng laew raaw thii naa raan / 快到了，在店门口等",
  },
  顺便: {
    synonym: "แวะซื้อของ / wae sue khaawng / 顺路买东西",
    antonym: "ไปพิเศษ / bpai phi-seet / 特地去",
    comparison: "แวะ 表示顺路短暂停留，ฝากซื้อ 是拜托别人买。",
    collocation: "ถ้าผ่านทางนั้น ฝากซื้อได้ไหม / thaa phaan thaang nan faak sue dai mai / 如果经过那边，可以帮忙买吗",
  },
  手机消息: {
    synonym: "ส่งโลเคชันให้ / song loo-khee-chan hai / 发送定位",
    antonym: "ไม่ได้อ่านข้อความ / mai dai aan khaaw khwaam / 没读消息",
    comparison: "ส่งโลเคชัน 是发定位，ปักโลเคชัน 是标记定位。",
    collocation: "แบตมือถือหมดเลยตอบช้า / baet mue-thue mot loei dtaawp chaa / 手机没电所以回复晚了",
  },
  小错误: {
    synonym: "เดินผิดทาง / doen phit thaang / 走错路",
    antonym: "ทำถูกแล้ว / tham thuuk laew / 做对了",
    comparison: "ผิด 放在动词后表示做错，如 เดินผิด、หยิบผิด。",
    collocation: "ต่อผิดแถวเลยต้องเริ่มใหม่ / dtaaw phit thaaeo loei dtawng roem mai / 排错队所以要重新开始",
  },
  缺东西: {
    synonym: "ขาดเอกสาร / khaat ek-ga-saan / 缺文件",
    antonym: "ครบแล้ว / khrop laew / 齐了",
    comparison: "ขาด 是缺少，ไม่ได้เอา...มา 是没有带来。",
    collocation: "ไม่ได้เอาบัตรมา ต้องส่งทีหลัง / mai dai ao bat maa dtawng song thii lang / 没带证件，需要之后补交",
  },
  支付小事: {
    synonym: "ยอดเงินไม่ตรง / yaawt ngoen mai dtrong / 金额不对",
    antonym: "จ่ายเรียบร้อย / jaai riiap raawy / 付款妥当",
    comparison: "เงินไม่เข้า 是没到账，คิดเงินผิด 是算错钱。",
    collocation: "สแกนไม่ขึ้น ขอจ่ายสดได้ไหม / sa-gaaen mai khuen khaaw jaai sot dai mai / 扫码不出来，可以付现金吗",
  },
  等候进度: {
    synonym: "ขอติดตามผล / khaaw dtit dtaam phon / 请求跟进结果",
    antonym: "เสร็จเรียบร้อย / set riiap raawy / 已经完成",
    comparison: "ความคืบหน้า 是进展，ผล 是结果。",
    collocation: "ยังไม่มีความคืบหน้า ขอเวลาอีกนิด / yang mai mii khwaam khuep naa khaaw we-laa iik nit / 还没有进展，请再给一点时间",
  },
  简单安排: {
    synonym: "ทำทีละเรื่อง / tham thii la rueang / 一件一件做",
    antonym: "ทำพร้อมกันหมด / tham phraawm gan mot / 全部同时做",
    comparison: "ทีละเรื่อง 强调按件处理，แบ่งเป็นสองส่วน 强调分成部分。",
    collocation: "สรุปสิ่งที่ต้องทำก่อนเริ่ม / sa-rup sing thii dtawng tham gaawn roem / 开始前总结要做的事",
  },
  安全提醒: {
    synonym: "ระวังขั้นบันได / ra-wang khan ban-dai / 小心台阶",
    antonym: "ไม่ระวัง / mai ra-wang / 不小心",
    comparison: "ระวัง 是提醒小心，อย่า 表示不要做。",
    collocation: "อย่าวางของขวางทาง / yaa waang khaawng khwaang thaang / 不要把东西放着挡路",
  },
  收尾复盘: {
    synonym: "สรุปว่าเสร็จแล้ว / sa-rup waa set laew / 总结来说完成了",
    antonym: "ยังเหลืออีกเรื่อง / yang luea iik rueang / 还剩一件事",
    comparison: "สรุปว่า 用来复盘结论，จดไว้กันลืม 是记录防忘。",
    collocation: "วันนี้เรียบร้อยทุกอย่าง ครั้งหน้าจะง่ายขึ้น / wan nii riiap raawy thuk yaang khrang naa ja ngaai khuen / 今天都办妥了，下次会更容易",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในชีวิตประจำวัน ฉันใช้คำว่า “${row[1]}” เพื่อเล่าเรื่องเล็ก ๆ ที่เกิดขึ้นและจัดการต่อได้ง่ายขึ้น`,
  roman: `nai chii-wit bpra-jam wan chan chai kham waa "${row[2]}" phuea lao rueang lek lek thii goet khuen lae jat-gaan dtaaw dai ngaai khuen`,
  chinese: `在日常生活中，我会用“${row[1]}”来说明发生的小情况，并更容易继续处理。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "日常混合复盘", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 日常混合复盘补漏表达。适合处理出门、顺便、手机消息、小错误、缺东西、支付、进度和收尾复盘；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: EVERYDAY_REVIEW_MIXED_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_REVIEW_MIXED_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
