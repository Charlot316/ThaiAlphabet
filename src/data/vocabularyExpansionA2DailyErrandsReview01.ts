export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type DailyErrandsReviewTheme =
  | "买"
  | "取"
  | "寄"
  | "修"
  | "预约"
  | "排队"
  | "付款"
  | "确认"
  | "回来"
  | "完成";

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
  theme: DailyErrandsReviewTheme,
];

const DAILY_ERRANDS_REVIEW_REFS = [
  "worker-a-a2-daily-errands-review",
  "basic-thai-daily-errands",
];

const rows: Row[] = [
  ["sue-khaawng", "ซื้อของ", "sue khaawng", "买东西", "动词", "买"],
  ["sue-khaao", "ซื้อข้าว", "sue khaao", "买饭", "动词", "买"],
  ["sue-yaa", "ซื้อยา", "sue yaa", "买药", "动词", "买"],
  ["sue-khaawng-chai", "ซื้อของใช้", "sue khaawng chai", "买日用品", "动词", "买"],
  ["sue-laew", "ซื้อแล้ว", "sue laew", "已经买了", "句型", "买"],
  ["yang-mai-sue", "ยังไม่ซื้อ", "yang mai sue", "还没买", "句型", "买"],
  ["sue-mai-than", "ซื้อไม่ทัน", "sue mai than", "来不及买", "句型", "买"],
  ["sue-phit", "ซื้อผิด", "sue phit", "买错", "动词", "买"],
  ["sue-phoem", "ซื้อเพิ่ม", "sue phoem", "追加购买", "动词", "买"],
  ["sue-klap-baan", "ซื้อกลับบ้าน", "sue glap baan", "买回家", "动词", "买"],
  ["rap-khaawng", "รับของ", "rap khaawng", "取东西；收货", "动词", "取"],
  ["bpai-rap", "ไปรับ", "bpai rap", "去取；去接", "动词", "取"],
  ["rap-phatsadu", "รับพัสดุ", "rap phat-sa-du", "收包裹", "动词", "取"],
  ["rap-ek-ga-saan", "รับเอกสาร", "rap ek-ga-saan", "取文件", "动词", "取"],
  ["rap-yaa", "รับยา", "rap yaa", "取药", "动词", "取"],
  ["rap-bat", "รับบัตร", "rap bat", "取卡/领证件", "动词", "取"],
  ["khaawng-maa-laew", "ของมาแล้ว", "khaawng maa laew", "东西到了", "句型", "取"],
  ["yang-mai-dai-rap", "ยังไม่ได้รับ", "yang mai dai rap", "还没收到", "句型", "取"],
  ["rap-thii-nii", "รับที่นี่", "rap thii nii", "在这里取", "句型", "取"],
  ["rap-thaen", "รับแทน", "rap thaaen", "代领", "动词", "取"],
  ["song-phatsadu", "ส่งพัสดุ", "song phat-sa-du", "寄包裹", "动词", "寄"],
  ["song-jot-maai", "ส่งจดหมาย", "song jot-maai", "寄信", "动词", "寄"],
  ["song-khaawng", "ส่งของ", "song khaawng", "寄东西；送东西", "动词", "寄"],
  ["khaa-song", "ค่าส่ง", "khaa song", "运费；邮费", "名词", "寄"],
  ["thii-yuu-phuu-rap", "ที่อยู่ผู้รับ", "thii yuu phuu rap", "收件人地址", "名词", "寄"],
  ["chue-phuu-rap", "ชื่อผู้รับ", "chue phuu rap", "收件人姓名", "名词", "寄"],
  ["boe-thoo-phuu-rap", "เบอร์โทรผู้รับ", "boe thoo phuu rap", "收件人电话", "名词", "寄"],
  ["lek-phatsadu", "เลขพัสดุ", "leek phat-sa-du", "包裹单号", "名词", "寄"],
  ["song-laew", "ส่งแล้ว", "song laew", "已经寄了/发了", "句型", "寄"],
  ["dtit-dtaam-phatsadu", "ติดตามพัสดุ", "dtit dtaam phat-sa-du", "跟踪包裹", "动词", "寄"],
  ["saawm", "ซ่อม", "saawm", "维修", "动词", "修"],
  ["bpai-saawm", "ไปซ่อม", "bpai saawm", "去修", "动词", "修"],
  ["ao-bpai-saawm", "เอาไปซ่อม", "ao bpai saawm", "拿去修", "动词", "修"],
  ["rap-khaawng-saawm", "รับของซ่อม", "rap khaawng saawm", "取维修好的东西", "动词", "修"],
  ["saawm-laew", "ซ่อมแล้ว", "saawm laew", "已经修了", "句型", "修"],
  ["yang-saawm-mai-set", "ยังซ่อมไม่เสร็จ", "yang saawm mai set", "还没修好", "句型", "修"],
  ["saawm-set-laew", "ซ่อมเสร็จแล้ว", "saawm set laew", "已经修好了", "句型", "修"],
  ["khaa-saawm", "ค่าซ่อม", "khaa saawm", "维修费", "名词", "修"],
  ["bai-rap-saawm", "ใบรับซ่อม", "bai rap saawm", "维修单", "名词", "修"],
  ["dtawng-raw-saawm", "ต้องรอซ่อม", "dtawng raaw saawm", "需要等维修", "句型", "修"],
  ["jaawng", "จอง", "jaawng", "预约；预订", "动词", "预约"],
  ["nat", "นัด", "nat", "约定；预约", "动词", "预约"],
  ["jaawng-khiu", "จองคิว", "jaawng khiu", "预约排号", "动词", "预约"],
  ["nat-welaa", "นัดเวลา", "nat we-laa", "约时间", "动词", "预约"],
  ["mi-nat", "มีนัด", "mii nat", "有预约", "句型", "预约"],
  ["mai-mi-nat", "ไม่มีนัด", "mai mii nat", "没有预约", "句型", "预约"],
  ["luean-nat", "เลื่อนนัด", "leuan nat", "改期；推迟预约", "动词", "预约"],
  ["yok-loek-nat", "ยกเลิกนัด", "yok loek nat", "取消预约", "动词", "预约"],
  ["nat-mai", "นัดใหม่", "nat mai", "重新约", "动词", "预约"],
  ["yuen-yan-nat", "ยืนยันนัด", "yuen yan nat", "确认预约", "动词", "预约"],
  ["dtaaw-thaaeo", "ต่อแถว", "dtaaw thaaeo", "排队", "动词", "排队"],
  ["khao-khiu", "เข้าคิว", "khao khiu", "排队", "动词", "排队"],
  ["raw-khiu", "รอคิว", "raaw khiu", "等号", "动词", "排队"],
  ["rap-bat-khiu", "รับบัตรคิว", "rap bat khiu", "取号", "动词", "排队"],
  ["bat-khiu", "บัตรคิว", "bat khiu", "排队号", "名词", "排队"],
  ["khiu-thueng-laew", "คิวถึงแล้ว", "khiu thueng laew", "轮到号了", "句型", "排队"],
  ["yang-mai-thueng-khiu", "ยังไม่ถึงคิว", "yang mai thueng khiu", "还没轮到", "句型", "排队"],
  ["raw-naan", "รอนาน", "raaw naan", "等很久", "短语", "排队"],
  ["khiu-yaw", "คิวยาว", "khiu yaao", "队伍长", "句型", "排队"],
  ["haam-saaeng-khiu", "ห้ามแซงคิว", "haam saaeng khiu", "禁止插队", "短语", "排队"],
  ["jaai-ngoen", "จ่ายเงิน", "jaai ngoen", "付款", "动词", "付款"],
  ["khit-ngoen", "คิดเงิน", "khit ngoen", "结账；算钱", "动词", "付款"],
  ["jaai-sot", "จ่ายสด", "jaai sot", "付现金", "动词", "付款"],
  ["jaai-duai-bat", "จ่ายด้วยบัตร", "jaai duai bat", "用卡付款", "短语", "付款"],
  ["on-ngoen", "โอนเงิน", "oon ngoen", "转账", "动词", "付款"],
  ["scan-jaai", "สแกนจ่าย", "sa-gaaen jaai", "扫码付款", "动词", "付款"],
  ["ngoen-thawn", "เงินทอน", "ngoen thaawn", "找零", "名词", "付款"],
  ["khaaw-bai-set", "ขอใบเสร็จ", "khaaw bai-set", "要收据", "句型", "付款"],
  ["jaai-laew", "จ่ายแล้ว", "jaai laew", "已经付了", "句型", "付款"],
  ["yang-mai-jaai", "ยังไม่จ่าย", "yang mai jaai", "还没付", "句型", "付款"],
  ["yuen-yan", "ยืนยัน", "yuen yan", "确认", "动词", "确认"],
  ["khaaw-yuen-yan", "ขอยืนยัน", "khaaw yuen yan", "请确认", "句型", "确认"],
  ["chek-iik-khrang", "เช็กอีกครั้ง", "chek iik khrang", "再检查一次", "短语", "确认"],
  ["thuuk-dtawng-mai", "ถูกต้องไหม", "thuuk dtawng mai", "正确吗", "句型", "确认"],
  ["chai-mai", "ใช่ไหม", "chai mai", "对吗；是吗", "句型", "确认"],
  ["dai-rap-laew-mai", "ได้รับแล้วไหม", "dai rap laew mai", "收到了吗", "句型", "确认"],
  ["set-laew-mai", "เสร็จแล้วไหม", "set laew mai", "完成了吗", "句型", "确认"],
  ["khrop-mai", "ครบไหม", "khrop mai", "齐了吗", "句型", "确认"],
  ["yuen-yan-laew", "ยืนยันแล้ว", "yuen yan laew", "已经确认", "句型", "确认"],
  ["yang-mai-yuen-yan", "ยังไม่ยืนยัน", "yang mai yuen yan", "尚未确认", "句型", "确认"],
  ["glap", "กลับ", "glap", "回来；回去", "动词", "回来"],
  ["glap-baan", "กลับบ้าน", "glap baan", "回家", "动词", "回来"],
  ["glap-maa", "กลับมา", "glap maa", "回来", "动词", "回来"],
  ["glap-bpai", "กลับไป", "glap bpai", "回去", "动词", "回来"],
  ["glap-maa-laew", "กลับมาแล้ว", "glap maa laew", "已经回来了", "句型", "回来"],
  ["glap-cha", "กลับช้า", "glap chaa", "回来晚", "句型", "回来"],
  ["glap-reo", "กลับเร็ว", "glap reo", "回来早；快点回", "句型", "回来"],
  ["glap-maa-ao", "กลับมาเอา", "glap maa ao", "回来拿", "动词", "回来"],
  ["glap-maa-duu", "กลับมาดู", "glap maa duu", "回来看看", "动词", "回来"],
  ["doen-thaang-glap", "เดินทางกลับ", "doen thaang glap", "返程", "动词", "回来"],
  ["set", "เสร็จ", "set", "完成；做完", "动词", "完成"],
  ["set-laew", "เสร็จแล้ว", "set laew", "已经完成", "句型", "完成"],
  ["tham-set", "ทำเสร็จ", "tham set", "做完", "动词", "完成"],
  ["yang-mai-set", "ยังไม่เสร็จ", "yang mai set", "还没完成", "句型", "完成"],
  ["glai-set", "ใกล้เสร็จ", "glai set", "快完成了", "短语", "完成"],
  ["set-than-welaa", "เสร็จทันเวลา", "set than we-laa", "按时完成", "短语", "完成"],
  ["set-mai-than", "เสร็จไม่ทัน", "set mai than", "来不及完成", "短语", "完成"],
  ["riiap-raawy", "เรียบร้อย", "riiap raawy", "妥当；整齐", "形容词", "完成"],
  ["riiap-raawy-laew", "เรียบร้อยแล้ว", "riiap raawy laew", "已经办妥", "句型", "完成"],
  ["wan-nii-tham-khrop", "วันนี้ทำครบ", "wan nii tham khrop", "今天做全了", "句型", "完成"],
];

const relatedByTheme: Record<
  DailyErrandsReviewTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  买: {
    synonym: "ซื้อของ / sue khaawng / 买东西",
    antonym: "ยังไม่ซื้อ / yang mai sue / 还没买",
    comparison: "ซื้อแล้ว 是已经买了，ซื้อผิด 是买错了。",
    collocation: "ซื้อของใช้กลับบ้าน / sue khaawng chai glap baan / 买日用品回家",
  },
  取: {
    synonym: "รับของ / rap khaawng / 取东西、收货",
    antonym: "ยังไม่ได้รับ / yang mai dai rap / 还没收到",
    comparison: "รับของ 是取/收东西，รับแทน 是代领。",
    collocation: "ไปรับพัสดุที่ร้าน / bpai rap phat-sa-du thii raan / 去店里取包裹",
  },
  寄: {
    synonym: "ส่งพัสดุ / song phat-sa-du / 寄包裹",
    antonym: "ยังไม่ส่ง / yang mai song / 还没寄",
    comparison: "ส่ง 可表示寄、送、发送，พัสดุ 是包裹。",
    collocation: "ส่งพัสดุแล้วติดตามเลข / song phat-sa-du laew dtit dtaam leek / 寄出包裹后跟踪单号",
  },
  修: {
    synonym: "ซ่อม / saawm / 维修",
    antonym: "ใช้ได้ / chai dai / 能用",
    comparison: "เอาไปซ่อม 是拿去修，รับของซ่อม 是取修好的东西。",
    collocation: "ซ่อมเสร็จแล้วไปรับของ / saawm set laew bpai rap khaawng / 修好后去取东西",
  },
  预约: {
    synonym: "จองคิว / jaawng khiu / 预约排号",
    antonym: "ไม่มีนัด / mai mii nat / 没有预约",
    comparison: "จอง 偏预订，นัด 偏约定时间或预约。",
    collocation: "ยืนยันนัดก่อนออกจากบ้าน / yuen yan nat gaawn awk jaak baan / 出门前确认预约",
  },
  排队: {
    synonym: "เข้าคิว / khao khiu / 排队",
    antonym: "แซงคิว / saaeng khiu / 插队",
    comparison: "รับบัตรคิว 是取号，รอคิว 是等号。",
    collocation: "รับบัตรคิวแล้วรอคิว / rap bat khiu laew raaw khiu / 取号后等号",
  },
  付款: {
    synonym: "จ่ายเงิน / jaai ngoen / 付款",
    antonym: "ยังไม่จ่าย / yang mai jaai / 还没付",
    comparison: "คิดเงิน 是结账算钱，จ่ายเงิน 是付款。",
    collocation: "จ่ายเงินแล้วขอใบเสร็จ / jaai ngoen laew khaaw bai-set / 付款后要收据",
  },
  确认: {
    synonym: "ยืนยัน / yuen yan / 确认",
    antonym: "ยังไม่ยืนยัน / yang mai yuen yan / 尚未确认",
    comparison: "เช็ก 是检查，ยืนยัน 是确认结果。",
    collocation: "เช็กอีกครั้งว่าถูกต้องไหม / chek iik khrang waa thuuk dtawng mai / 再检查一次是否正确",
  },
  回来: {
    synonym: "กลับมา / glap maa / 回来",
    antonym: "ออกไป / awk bpai / 出去",
    comparison: "กลับมา 是回来，กลับไป 是回去，方向不同。",
    collocation: "กลับบ้านหลังทำธุระเสร็จ / glap baan lang tham thu-ra set / 办完事后回家",
  },
  完成: {
    synonym: "เรียบร้อยแล้ว / riiap raawy laew / 已经办妥",
    antonym: "ยังไม่เสร็จ / yang mai set / 还没完成",
    comparison: "เสร็จ 是完成，เรียบร้อยแล้ว 更像事情办妥了。",
    collocation: "วันนี้ทำธุระครบแล้ว / wan nii tham thu-ra khrop laew / 今天的事都办完了",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `หลังจากทำธุระนอกบ้าน ฉันใช้คำว่า “${row[1]}” เพื่อเล่าว่าซื้อ รับ ส่ง จ่าย หรือทำเสร็จแล้วหรือยัง`,
  roman: `lang jaak tham thu-ra naawk baan chan chai kham waa "${row[2]}" phuea lao waa sue rap song jaai rue tham set laew rue yang`,
  chinese: `外出办事后，我会用“${row[1]}”来复盘买了、取了、寄了、付了，或事情是否完成。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "日常办事复盘", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 日常办事复盘表达。适合说明买、取、寄、修、预约、排队、付款、确认、回来和完成；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: DAILY_ERRANDS_REVIEW_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_ERRANDS_REVIEW_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
