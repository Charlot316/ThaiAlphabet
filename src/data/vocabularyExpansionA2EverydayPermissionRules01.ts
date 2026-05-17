export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type EverydayPermissionRulesTheme =
  | "允许"
  | "禁止"
  | "可以不可以"
  | "需要登记"
  | "必须遵守"
  | "规则"
  | "罚款"
  | "例外"
  | "申请许可"
  | "公共提醒";

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
  theme: EverydayPermissionRulesTheme,
];

const EVERYDAY_PERMISSION_RULES_REFS = [
  "worker-a-a2-everyday-permission-rules",
  "basic-thai-permission-rules",
];

const rows: Row[] = [
  ["a-nu-yaat", "อนุญาต", "a-nu-yaat", "允许；许可", "动词", "允许"],
  ["dai-rap-a-nu-yaat", "ได้รับอนุญาต", "dai rap a-nu-yaat", "得到允许", "句型", "允许"],
  ["a-nu-yaat-hai-khao", "อนุญาตให้เข้า", "a-nu-yaat hai khao", "允许进入", "短语", "允许"],
  ["a-nu-yaat-hai-chai", "อนุญาตให้ใช้", "a-nu-yaat hai chai", "允许使用", "短语", "允许"],
  ["chai-dai", "ใช้ได้", "chai dai", "可以使用", "短语", "允许"],
  ["khao-dai", "เข้าได้", "khao dai", "可以进入", "短语", "允许"],
  ["tham-dai", "ทำได้", "tham dai", "可以做", "句型", "允许"],
  ["phaa-khao-dai", "พาเข้าได้", "phaa khao dai", "可以带入", "句型", "允许"],
  ["tham-dai-thaa-mi-bat", "ทำได้ถ้ามีบัตร", "tham dai thaa mii bat", "有卡的话可以做", "句型", "允许"],
  ["bpoet-hai-chai", "เปิดให้ใช้", "bpoet hai chai", "开放使用", "短语", "允许"],
  ["haam", "ห้าม", "haam", "禁止", "动词", "禁止"],
  ["haam-khao", "ห้ามเข้า", "haam khao", "禁止进入", "短语", "禁止"],
  ["haam-jawt-rot", "ห้ามจอดรถ", "haam jaawt rot", "禁止停车", "短语", "禁止"],
  ["haam-suup-bu-rii", "ห้ามสูบบุหรี่", "haam suup bu-rii", "禁止吸烟", "短语", "禁止"],
  ["haam-thaai-ruup", "ห้ามถ่ายรูป", "haam thaai ruup", "禁止拍照", "短语", "禁止"],
  ["haam-song-siang-dang", "ห้ามส่งเสียงดัง", "haam song siiang dang", "禁止大声喧哗", "短语", "禁止"],
  ["haam-naa-sat-liang-khao", "ห้ามนำสัตว์เลี้ยงเข้า", "haam nam sat liiang khao", "禁止带宠物进入", "短语", "禁止"],
  ["haam-chai-mue-thue", "ห้ามใช้มือถือ", "haam chai mue-thue", "禁止使用手机", "短语", "禁止"],
  ["haam-thing-kha-ya", "ห้ามทิ้งขยะ", "haam thing kha-ya", "禁止乱丢垃圾", "短语", "禁止"],
  ["khet-haam-khao", "เขตห้ามเข้า", "kheet haam khao", "禁止进入区域", "名词", "禁止"],
  ["dai-mai", "ได้ไหม", "dai mai", "可以吗", "句型", "可以不可以"],
  ["dai-rue-plao", "ได้หรือเปล่า", "dai rue bplao", "可不可以", "句型", "可以不可以"],
  ["tham-dai-mai", "ทำได้ไหม", "tham dai mai", "可以做吗", "句型", "可以不可以"],
  ["chai-dai-mai", "ใช้ได้ไหม", "chai dai mai", "可以用吗", "句型", "可以不可以"],
  ["khao-dai-mai", "เข้าได้ไหม", "khao dai mai", "可以进去吗", "句型", "可以不可以"],
  ["phaa-khao-dai-mai", "พาเข้าได้ไหม", "phaa khao dai mai", "可以带进去吗", "句型", "可以不可以"],
  ["mai-dai", "ไม่ได้", "mai dai", "不可以；不能", "句型", "可以不可以"],
  ["chai-mai-dai", "ใช้ไม่ได้", "chai mai dai", "不能用", "句型", "可以不可以"],
  ["khao-mai-dai", "เข้าไม่ได้", "khao mai dai", "不能进去", "句型", "可以不可以"],
  ["dai-khae", "ได้แค่", "dai khae", "只能……", "句型", "可以不可以"],
  ["long-tha-biian", "ลงทะเบียน", "long tha-biian", "登记；注册", "动词", "需要登记"],
  ["dtawng-long-tha-biian", "ต้องลงทะเบียน", "dtawng long tha-biian", "需要登记", "句型", "需要登记"],
  ["long-chue", "ลงชื่อ", "long chue", "签名登记", "动词", "需要登记"],
  ["khaaw-chue", "ขอชื่อ", "khaaw chue", "请提供姓名", "句型", "需要登记"],
  ["khaaw-boe-thoo", "ขอเบอร์โทร", "khaaw boe thoo", "请提供电话号码", "句型", "需要登记"],
  ["graawk-baep-faawm", "กรอกแบบฟอร์ม", "graawk baaep faawm", "填写表格", "动词", "需要登记"],
  ["baep-faawm", "แบบฟอร์ม", "baaep faawm", "表格", "名词", "需要登记"],
  ["bat-bpra-jam-dtua", "บัตรประจำตัว", "bat bpra-jam dtua", "身份证件", "名词", "需要登记"],
  ["khaaw-bat", "ขอบัตร", "khaaw bat", "请出示证件/卡", "句型", "需要登记"],
  ["rap-bat-khiu", "รับบัตรคิว", "rap bat khiu", "取号", "动词", "需要登记"],
  ["dtawng", "ต้อง", "dtawng", "必须；需要", "动词", "必须遵守"],
  ["jam-bpen-dtawng", "จำเป็นต้อง", "jam bpen dtawng", "有必要必须……", "句型", "必须遵守"],
  ["dtawng-tham-dtaam", "ต้องทำตาม", "dtawng tham dtaam", "必须遵照", "句型", "必须遵守"],
  ["dtawng-bpa-dti-bat-dtaam", "ต้องปฏิบัติตาม", "dtawng bpa-dti-bat dtaam", "必须遵守执行", "句型", "必须遵守"],
  ["bpa-dti-bat-dtaam", "ปฏิบัติตาม", "bpa-dti-bat dtaam", "遵守；执行", "动词", "必须遵守"],
  ["tham-dtaam-got", "ทำตามกฎ", "tham dtaam got", "按规则做", "动词", "必须遵守"],
  ["rak-saa-got", "รักษากฎ", "rak-saa got", "维护/遵守规则", "动词", "必须遵守"],
  ["dtawng-sai-naa-gaak", "ต้องใส่หน้ากาก", "dtawng sai naa-gaak", "必须戴口罩", "句型", "必须遵守"],
  ["dtawng-thaawt-rawng-thao", "ต้องถอดรองเท้า", "dtawng thaawt raawng thaao", "必须脱鞋", "句型", "必须遵守"],
  ["dtawng-rak-saa-khwaam-sa-aat", "ต้องรักษาความสะอาด", "dtawng rak-saa khwaam sa-aat", "必须保持清洁", "句型", "必须遵守"],
  ["got", "กฎ", "got", "规则", "名词", "规则"],
  ["got-rabiap", "กฎระเบียบ", "got ra-biiap", "规章制度", "名词", "规则"],
  ["khaaw-bang-khap", "ข้อบังคับ", "khaaw bang-khap", "规定；强制条款", "名词", "规则"],
  ["khaaw-gam-not", "ข้อกำหนด", "khaaw gam-not", "规定事项", "名词", "规则"],
  ["kham-nae-nam", "คำแนะนำ", "kham nae nam", "指引；建议", "名词", "规则"],
  ["kham-dteuan", "คำเตือน", "kham dteuan", "警告；提醒", "名词", "规则"],
  ["bpaai-got", "ป้ายกฎ", "bpaai got", "规则标识", "名词", "规则"],
  ["got-khaawng-thii-nii", "กฎของที่นี่", "got khaawng thii nii", "这里的规则", "名词", "规则"],
  ["phit-got", "ผิดกฎ", "phit got", "违反规则", "短语", "规则"],
  ["mai-tham-dtaam-got", "ไม่ทำตามกฎ", "mai tham dtaam got", "不遵守规则", "句型", "规则"],
  ["bprap", "ปรับ", "bprap", "罚款；调整", "动词", "罚款"],
  ["khaa-bprap", "ค่าปรับ", "khaa bprap", "罚款", "名词", "罚款"],
  ["dtawng-sia-khaa-bprap", "ต้องเสียค่าปรับ", "dtawng siia khaa bprap", "必须缴罚款", "句型", "罚款"],
  ["mai-sia-khaa-bprap", "ไม่เสียค่าปรับ", "mai siia khaa bprap", "不罚款", "句型", "罚款"],
  ["bprap-taam-got", "ปรับตามกฎ", "bprap dtaam got", "按规则罚款", "动词", "罚款"],
  ["khaa-bprap-nueng-roi-baat", "ค่าปรับหนึ่งร้อยบาท", "khaa bprap nueng roi baat", "罚款一百泰铢", "名词", "罚款"],
  ["dteuan-gaawn", "เตือนก่อน", "dteuan gaawn", "先警告", "动词", "罚款"],
  ["thaa-tham-phit", "ถ้าทำผิด", "thaa tham phit", "如果违规", "句型", "罚款"],
  ["bai-dteuan", "ใบเตือน", "bai dteuan", "警告单", "名词", "罚款"],
  ["bai-bprap", "ใบปรับ", "bai bprap", "罚单", "名词", "罚款"],
  ["yok-wen", "ยกเว้น", "yok wen", "除外；例外", "动词", "例外"],
  ["khaaw-yok-wen", "ข้อยกเว้น", "khaaw yok wen", "例外条款", "名词", "例外"],
  ["yok-wen-dek", "ยกเว้นเด็ก", "yok wen dek", "儿童除外", "短语", "例外"],
  ["yok-wen-phuu-suung-aayu", "ยกเว้นผู้สูงอายุ", "yok wen phuu suung aa-yu", "老人除外", "短语", "例外"],
  ["nai-gra-nii-phiset", "ในกรณีพิเศษ", "nai ga-ra-nii phi-seet", "在特殊情况下", "短语", "例外"],
  ["thaa-jam-bpen", "ถ้าจำเป็น", "thaa jam bpen", "如果必要", "句型", "例外"],
  ["dai-bang-gra-nii", "ได้บางกรณี", "dai baang ga-ra-nii", "某些情况可以", "句型", "例外"],
  ["mai-dai-thuk-gra-nii", "ไม่ได้ทุกกรณี", "mai dai thuk ga-ra-nii", "不是所有情况都可以", "句型", "例外"],
  ["khae-bang-khon", "แค่บางคน", "khae baang khon", "只有某些人", "短语", "例外"],
  ["dtawng-thaam-gaawn", "ต้องถามก่อน", "dtawng thaam gaawn", "必须先问", "句型", "例外"],
  ["khaaw-a-nu-yaat", "ขออนุญาต", "khaaw a-nu-yaat", "请求许可", "动词", "申请许可"],
  ["yuen-kham-khaaw", "ยื่นคำขอ", "yuen kham khaaw", "提交申请", "动词", "申请许可"],
  ["kham-khaaw", "คำขอ", "kham khaaw", "申请；请求", "名词", "申请许可"],
  ["baep-faawm-kham-khaaw", "แบบฟอร์มคำขอ", "baaep faawm kham khaaw", "申请表", "名词", "申请许可"],
  ["raw-a-nu-mat", "รออนุมัติ", "raaw a-nu-mat", "等待批准", "动词", "申请许可"],
  ["a-nu-mat", "อนุมัติ", "a-nu-mat", "批准", "动词", "申请许可"],
  ["mai-a-nu-mat", "ไม่อนุมัติ", "mai a-nu-mat", "不批准", "句型", "申请许可"],
  ["dai-rap-a-nu-mat", "ได้รับอนุมัติ", "dai rap a-nu-mat", "得到批准", "句型", "申请许可"],
  ["khaaw-ek-ga-saan", "ขอเอกสาร", "khaaw ek-ga-saan", "请求文件", "句型", "申请许可"],
  ["dtit-dtaaw-jao-naa-thii", "ติดต่อเจ้าหน้าที่", "dtit dtaaw jao naa thii", "联系工作人员", "动词", "申请许可"],
  ["bproot-aan-got", "โปรดอ่านกฎ", "bproot aan got", "请阅读规则", "句型", "公共提醒"],
  ["ga-ru-naa-tham-dtaam", "กรุณาทำตาม", "ga-ru-naa tham dtaam", "请遵照执行", "句型", "公共提醒"],
  ["ga-ru-naa-rak-saa-khwaam-sa-aat", "กรุณารักษาความสะอาด", "ga-ru-naa rak-saa khwaam sa-aat", "请保持清洁", "句型", "公共提醒"],
  ["ga-ru-naa-ngaep-siang", "กรุณาเงียบเสียง", "ga-ru-naa ngiiap siiang", "请保持安静", "句型", "公共提醒"],
  ["ga-ru-naa-dtaaw-thaaeo", "กรุณาต่อแถว", "ga-ru-naa dtaaw thaaeo", "请排队", "句型", "公共提醒"],
  ["bproot-rawang", "โปรดระวัง", "bproot ra-wang", "请注意；请小心", "短语", "公共提醒"],
  ["aan-bpaai-gaawn-khao", "อ่านป้ายก่อนเข้า", "aan bpaai gaawn khao", "进入前阅读标识", "句型", "公共提醒"],
  ["thaam-jao-naa-thii", "ถามเจ้าหน้าที่", "thaam jao naa thii", "询问工作人员", "动词", "公共提醒"],
  ["thaa-mai-nae-jai", "ถ้าไม่แน่ใจ", "thaa mai nae jai", "如果不确定", "句型", "公共提醒"],
  ["tham-dtaam-kham-nae-nam", "ทำตามคำแนะนำ", "tham dtaam kham nae nam", "按照指引做", "动词", "公共提醒"],
];

const relatedByTheme: Record<
  EverydayPermissionRulesTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  允许: {
    synonym: "อนุญาต / a-nu-yaat / 允许",
    antonym: "ห้าม / haam / 禁止",
    comparison: "อนุญาต 是允许，ได้รับอนุญาต 是已经得到允许。",
    collocation: "อนุญาตให้ใช้ได้ / a-nu-yaat hai chai dai / 允许使用",
  },
  禁止: {
    synonym: "ห้าม / haam / 禁止",
    antonym: "อนุญาต / a-nu-yaat / 允许",
    comparison: "ห้าม 常用于规则和标识，比 อย่า 更像正式禁止。",
    collocation: "ห้ามส่งเสียงดังในห้องสมุด / haam song siiang dang nai haawng sa-mut / 图书馆禁止大声喧哗",
  },
  可以不可以: {
    synonym: "ได้ไหม / dai mai / 可以吗",
    antonym: "ไม่ได้ / mai dai / 不可以",
    comparison: "ได้ไหม 是礼貌询问能否做，ใช้ได้ไหม 专问能否使用。",
    collocation: "เข้าได้ไหม / khao dai mai / 可以进去吗",
  },
  需要登记: {
    synonym: "ลงทะเบียน / long tha-biian / 登记",
    antonym: "ไม่ต้องลงทะเบียน / mai dtawng long tha-biian / 不用登记",
    comparison: "ลงทะเบียน 是登记注册，ลงชื่อ 更像签名登记。",
    collocation: "ต้องลงทะเบียนก่อนเข้า / dtawng long tha-biian gaawn khao / 进入前需要登记",
  },
  必须遵守: {
    synonym: "ต้องทำตาม / dtawng tham dtaam / 必须遵照",
    antonym: "ไม่ทำตาม / mai tham dtaam / 不遵守",
    comparison: "ต้อง 是必须，จำเป็นต้อง 语气更像“有必要必须”。",
    collocation: "ต้องทำตามกฎของที่นี่ / dtawng tham dtaam got khaawng thii nii / 必须遵守这里的规则",
  },
  规则: {
    synonym: "กฎระเบียบ / got ra-biiap / 规章制度",
    antonym: "ผิดกฎ / phit got / 违规",
    comparison: "กฎ 是规则，ข้อบังคับ 更像强制规定。",
    collocation: "อ่านกฎก่อนใช้บริการ / aan got gaawn chai baaw-ri-gaan / 使用服务前阅读规则",
  },
  罚款: {
    synonym: "ค่าปรับ / khaa bprap / 罚款",
    antonym: "ไม่เสียค่าปรับ / mai siia khaa bprap / 不罚款",
    comparison: "ปรับ 可作动词“罚款”，ค่าปรับ 是罚款金额。",
    collocation: "ทำผิดกฎต้องเสียค่าปรับ / tham phit got dtawng siia khaa bprap / 违规必须罚款",
  },
  例外: {
    synonym: "ยกเว้น / yok wen / 除外",
    antonym: "ทุกกรณี / thuk ga-ra-nii / 所有情况",
    comparison: "ยกเว้น 表示不包括某人或某情况，กรณีพิเศษ 是特殊情况。",
    collocation: "ยกเว้นเด็กอายุต่ำกว่าสิบปี / yok wen dek aa-yu dtam gwaa sip bpii / 十岁以下儿童除外",
  },
  申请许可: {
    synonym: "ขออนุญาต / khaaw a-nu-yaat / 申请许可",
    antonym: "ไม่อนุมัติ / mai a-nu-mat / 不批准",
    comparison: "ขออนุญาต 是请求允许，อนุมัติ 是正式批准。",
    collocation: "ยื่นคำขอแล้วรออนุมัติ / yuen kham khaaw laew raaw a-nu-mat / 提交申请后等待批准",
  },
  公共提醒: {
    synonym: "กรุณา / ga-ru-naa / 请",
    antonym: "ไม่ทำตามคำแนะนำ / mai tham dtaam kham nae nam / 不按指引做",
    comparison: "กรุณา 和 โปรด 都可用于公共提醒，โปรด 更常见于标识。",
    collocation: "กรุณาทำตามคำแนะนำ / ga-ru-naa tham dtaam kham nae nam / 请按照指引做",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เมื่อเห็นป้ายหรือกฎในที่สาธารณะ ฉันใช้คำว่า “${row[1]}” เพื่อรู้ว่าสิ่งไหนทำได้หรือทำไม่ได้`,
  roman: `muea hen bpaai rue got nai thii saa-thaa-ra-na chan chai kham waa "${row[2]}" phuea ruu waa sing nai tham dai rue tham mai dai`,
  chinese: `在公共场所看到标识或规则时，我会用“${row[1]}”来判断哪些事可以做、哪些事不可以做。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "允许规则许可", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 日常规则和许可表达。适合理解允许、禁止、登记、遵守、罚款、例外和申请许可；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: EVERYDAY_PERMISSION_RULES_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_PERMISSION_RULES_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
