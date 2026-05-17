export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicServiceComplaintsTheme =
  | "等太久"
  | "错单"
  | "坏了"
  | "不满意"
  | "换一个"
  | "退款"
  | "请经理"
  | "礼貌表达问题"
  | "补救"
  | "记录跟进";

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
  theme: BasicServiceComplaintsTheme,
];

const BASIC_SERVICE_COMPLAINTS_REFS = [
  "worker-a-a2-basic-service-complaints",
  "basic-thai-service-problems",
];

const rows: Row[] = [
  ["raw-naan", "รอนาน", "raaw naan", "等很久", "短语", "等太久"],
  ["raw-naan-mak", "รอนานมาก", "raaw naan maak", "等太久了", "句型", "等太久"],
  ["raw-maa-naan-laew", "รอมานานแล้ว", "raaw maa naan laew", "已经等很久了", "句型", "等太久"],
  ["chai-welaa-naan-goen-bpai", "ใช้เวลานานเกินไป", "chai we-laa naan goen bpai", "花太久了", "句型", "等太久"],
  ["yang-mai-dai-rap", "ยังไม่ได้รับ", "yang mai dai rap", "还没有收到", "句型", "等太久"],
  ["yang-mai-maa", "ยังไม่มา", "yang mai maa", "还没来", "句型", "等太久"],
  ["khiu-naan", "คิวนาน", "khiu naan", "队等得久", "句型", "等太久"],
  ["raw-khiu-naan", "รอคิวนาน", "raaw khiu naan", "排队等很久", "短语", "等太久"],
  ["ja-dai-muea-rai", "จะได้เมื่อไร", "ja dai muea rai", "什么时候能拿到", "句型", "等太久"],
  ["chuai-chek-hai-noi", "ช่วยเช็กให้หน่อย", "chuai chek hai noi", "请帮我查一下", "句型", "等太久"],
  ["an-nii-phit", "อันนี้ผิด", "an nii phit", "这个错了", "句型", "错单"],
  ["sang-phit", "สั่งผิด", "sang phit", "点错；下错单", "动词", "错单"],
  ["tham-phit", "ทำผิด", "tham phit", "做错", "动词", "错单"],
  ["song-phit", "ส่งผิด", "song phit", "送错；发错", "动词", "错单"],
  ["ao-maa-phit", "เอามาผิด", "ao maa phit", "拿错来了", "句型", "错单"],
  ["mai-chai-thii-sang", "ไม่ใช่ที่สั่ง", "mai chai thii sang", "不是我点/订的", "句型", "错单"],
  ["khaat-nueng-yaang", "ขาดหนึ่งอย่าง", "khaat nueng yaang", "少了一样", "句型", "错单"],
  ["dai-mai-khrop", "ได้ไม่ครบ", "dai mai khrop", "没有拿全", "句型", "错单"],
  ["si-phit", "สีผิด", "sii phit", "颜色错了", "句型", "错单"],
  ["kha-naat-phit", "ขนาดผิด", "kha-naat phit", "尺寸错了", "句型", "错单"],
  ["laai-phit", "ลายผิด", "laai phit", "款式/图案错了", "句型", "错单"],
  ["bin-phit", "บิลผิด", "bin phit", "账单错了", "句型", "错单"],
  ["sia", "เสีย", "siia", "坏了；不能用", "形容词", "坏了"],
  ["phang", "พัง", "phang", "坏掉；损坏", "动词", "坏了"],
  ["chai-mai-dai", "ใช้ไม่ได้", "chai mai dai", "不能使用", "句型", "坏了"],
  ["mai-tham-ngaan", "ไม่ทำงาน", "mai tham ngaan", "不运行；不起作用", "句型", "坏了"],
  ["bpoet-mai-dai", "เปิดไม่ได้", "bpoet mai dai", "打不开", "句型", "坏了"],
  ["bpit-mai-dai", "ปิดไม่ได้", "bpit mai dai", "关不上", "句型", "坏了"],
  ["taek", "แตก", "dtaaek", "破裂；碎了", "动词", "坏了"],
  ["rua", "รั่ว", "rua", "漏水；泄漏", "动词", "坏了"],
  ["mi-siang-dang", "มีเสียงดัง", "mii siiang dang", "有噪音；声音很大", "句型", "坏了"],
  ["saawng-dai-mai", "ซ่อมได้ไหม", "saawm dai mai", "可以修吗", "句型", "坏了"],
  ["mai-phaaw-jai", "ไม่พอใจ", "mai phaaw jai", "不满意", "形容词", "不满意"],
  ["mai-okhee", "ไม่โอเค", "mai oo-khee", "不行；不太满意", "形容词", "不满意"],
  ["mai-di", "ไม่ดี", "mai dii", "不好", "形容词", "不满意"],
  ["khun-na-phaap-mai-di", "คุณภาพไม่ดี", "khun-na-phaap mai dii", "质量不好", "句型", "不满意"],
  ["mai-trong-bpok", "ไม่ตรงปก", "mai dtrong bpok", "和图片/说明不符", "句型", "不满意"],
  ["mai-muean-thii-baawk", "ไม่เหมือนที่บอก", "mai muean thii baawk", "不像说明的那样", "句型", "不满意"],
  ["mai-saduak", "ไม่สะดวก", "mai sa-duak", "不方便", "形容词", "不满意"],
  ["baaw-ri-gaan-mai-di", "บริการไม่ดี", "baaw-ri-gaan mai dii", "服务不好", "句型", "不满意"],
  ["khawng-mai-sombuun", "ของไม่สมบูรณ์", "khaawng mai som-buun", "东西不完整", "句型", "不满意"],
  ["yak-hai-bprap-bprung", "อยากให้ปรับปรุง", "yaak hai bprap-bprung", "希望改进", "句型", "不满意"],
  ["bplian", "เปลี่ยน", "bpliian", "换；改变", "动词", "换一个"],
  ["khaaw-bplian", "ขอเปลี่ยน", "khaaw bpliian", "请求更换", "句型", "换一个"],
  ["bplian-dai-mai", "เปลี่ยนได้ไหม", "bpliian dai mai", "可以换吗", "句型", "换一个"],
  ["khaaw-bplian-an-mai", "ขอเปลี่ยนอันใหม่", "khaaw bpliian an mai", "请换一个新的", "句型", "换一个"],
  ["ao-an-uen", "เอาอันอื่น", "ao an uen", "要别的那个", "句型", "换一个"],
  ["bplian-si", "เปลี่ยนสี", "bpliian sii", "换颜色", "短语", "换一个"],
  ["bplian-kha-naat", "เปลี่ยนขนาด", "bpliian kha-naat", "换尺寸", "短语", "换一个"],
  ["bplian-baep", "เปลี่ยนแบบ", "bpliian baaep", "换款式", "短语", "换一个"],
  ["khaaw-an-mai", "ขออันใหม่", "khaaw an mai", "请给新的一个", "句型", "换一个"],
  ["mi-an-uen-mai", "มีอันอื่นไหม", "mii an uen mai", "有别的吗", "句型", "换一个"],
  ["khuen-ngoen", "คืนเงิน", "khuen ngoen", "退款；退钱", "动词", "退款"],
  ["khaaw-khuen-ngoen", "ขอคืนเงิน", "khaaw khuen ngoen", "请求退款", "句型", "退款"],
  ["khuen-ngoen-dai-mai", "คืนเงินได้ไหม", "khuen ngoen dai mai", "可以退款吗", "句型", "退款"],
  ["ngoen-khuen", "เงินคืน", "ngoen khuen", "退款金额；退回的钱", "名词", "退款"],
  ["rap-ngoen-khuen", "รับเงินคืน", "rap ngoen khuen", "收到退款", "动词", "退款"],
  ["khaaw-yok-loek", "ขอยกเลิก", "khaaw yok loek", "请求取消", "句型", "退款"],
  ["yok-loek-raai-gaan", "ยกเลิกรายการ", "yok loek raai-gaan", "取消项目/订单", "短语", "退款"],
  ["khaaw-bai-set", "ขอใบเสร็จ", "khaaw bai-set", "请给收据", "句型", "退款"],
  ["mii-bai-set", "มีใบเสร็จ", "mii bai-set", "有收据", "句型", "退款"],
  ["mai-mii-bai-set", "ไม่มีใบเสร็จ", "mai mii bai-set", "没有收据", "句型", "退款"],
  ["phu-jat-gaan", "ผู้จัดการ", "phuu jat-gaan", "经理；负责人", "名词", "请经理"],
  ["khaaw-phop-phu-jat-gaan", "ขอพบผู้จัดการ", "khaaw phop phuu jat-gaan", "请求见经理", "句型", "请经理"],
  ["riiak-phu-jat-gaan-dai-mai", "เรียกผู้จัดการได้ไหม", "riiak phuu jat-gaan dai mai", "可以叫经理吗", "句型", "请经理"],
  ["phu-rap-phit-chaawp", "ผู้รับผิดชอบ", "phuu rap phit chaawp", "负责人", "名词", "请经理"],
  ["jao-naa-thii", "เจ้าหน้าที่", "jao naa thii", "工作人员", "名词", "请经理"],
  ["khaaw-khui-gap-jao-naa-thii", "ขอคุยกับเจ้าหน้าที่", "khaaw khui gap jao naa thii", "想和工作人员谈", "句型", "请经理"],
  ["khrai-duu-laae", "ใครดูแล", "khrai duu laae", "谁负责", "句型", "请经理"],
  ["khrai-rap-phit-chaawp", "ใครรับผิดชอบ", "khrai rap phit chaawp", "谁承担负责", "句型", "请经理"],
  ["khaaw-boe-dtit-dtaaw", "ขอเบอร์ติดต่อ", "khaaw boe dtit dtaaw", "请给联系电话", "句型", "请经理"],
  ["dtit-dtaaw-phu-duu-laae", "ติดต่อผู้ดูแล", "dtit dtaaw phuu duu laae", "联系管理员/负责人", "短语", "请经理"],
  ["khaaw-thoot", "ขอโทษ", "khaaw thoot", "对不起；抱歉", "短语", "礼貌表达问题"],
  ["khaaw-aphai", "ขออภัย", "khaaw a-phai", "抱歉；正式道歉", "短语", "礼貌表达问题"],
  ["khaaw-rab-guuan", "ขอรบกวน", "khaaw rop guan", "麻烦您", "短语", "礼貌表达问题"],
  ["mai-saap-waa", "ไม่ทราบว่า", "mai saap waa", "不知道是否……", "句型", "礼貌表达问题"],
  ["chuai-duu-hai-noi", "ช่วยดูให้หน่อย", "chuai duu hai noi", "请帮忙看一下", "句型", "礼貌表达问题"],
  ["chuai-gae-hai-noi", "ช่วยแก้ให้หน่อย", "chuai gaae hai noi", "请帮忙改一下", "句型", "礼貌表达问题"],
  ["mi-pan-haa-nit-noi", "มีปัญหานิดหน่อย", "mii bpan-haa nit noi", "有一点问题", "句型", "礼貌表达问题"],
  ["khaaw-jaeng-pan-haa", "ขอแจ้งปัญหา", "khaaw jaaeng bpan-haa", "想反馈问题", "句型", "礼貌表达问题"],
  ["mai-dai-dtoh-waa", "ไม่ได้ต่อว่า", "mai dai dtaaw waa", "不是在责怪", "句型", "礼貌表达问题"],
  ["yaak-hai-chuai-gae", "อยากให้ช่วยแก้", "yaak hai chuai gaae", "希望帮忙解决", "句型", "礼貌表达问题"],
  ["gae-pan-haa", "แก้ปัญหา", "gaae bpan-haa", "解决问题", "动词", "补救"],
  ["saawm-hai", "ซ่อมให้", "saawm hai", "帮忙修好", "动词", "补救"],
  ["bplian-hai", "เปลี่ยนให้", "bpliian hai", "帮忙更换", "动词", "补救"],
  ["song-mai", "ส่งใหม่", "song mai", "重新发送/配送", "动词", "补救"],
  ["tham-mai", "ทำใหม่", "tham mai", "重做", "动词", "补救"],
  ["lot-raa-khaa", "ลดราคา", "lot raa-khaa", "降价；打折补偿", "动词", "补救"],
  ["chot-choei", "ชดเชย", "chot choei", "补偿", "动词", "补救"],
  ["hai-suan-lot", "ให้ส่วนลด", "hai suan lot", "给折扣", "短语", "补救"],
  ["rap-phit-chaawp", "รับผิดชอบ", "rap phit chaawp", "负责；承担责任", "动词", "补救"],
  ["diao-ja-gae-hai", "เดี๋ยวจะแก้ให้", "diao ja gaae hai", "等一下会帮您处理", "句型", "补救"],
  ["jaeng", "แจ้ง", "jaaeng", "通知；反馈", "动词", "记录跟进"],
  ["jaeng-raai-la-iat", "แจ้งรายละเอียด", "jaaeng raai la-iat", "说明细节", "动词", "记录跟进"],
  ["jam-wai", "จำไว้", "jam wai", "记下；记住", "动词", "记录跟进"],
  ["jot-wai", "จดไว้", "jot wai", "记下来", "动词", "记录跟进"],
  ["thaai-ruup-wai", "ถ่ายรูปไว้", "thaai ruup wai", "拍照留存", "动词", "记录跟进"],
  ["song-khaaw-khwaam-wai", "ส่งข้อความไว้", "song khaaw khwaam wai", "留言；发消息留存", "动词", "记录跟进"],
  ["dtruat-saawp", "ตรวจสอบ", "dtruat saawp", "检查；核查", "动词", "记录跟进"],
  ["dtit-dtaam", "ติดตาม", "dtit dtaam", "跟进", "动词", "记录跟进"],
  ["jaeng-glap", "แจ้งกลับ", "jaaeng glap", "回告；反馈回来", "动词", "记录跟进"],
  ["khaaw-kham-dtaawp", "ขอคำตอบ", "khaaw kham dtaawp", "请求答复", "句型", "记录跟进"],
];

const relatedByTheme: Record<
  BasicServiceComplaintsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  等太久: {
    synonym: "รอนาน / raaw naan / 等很久",
    antonym: "ได้ทันที / dai than thii / 立刻得到",
    comparison: "รอนาน 说等很久，ใช้เวลานานเกินไป 更强调过程花太久。",
    collocation: "รอมานานแล้ว ช่วยเช็กให้หน่อย / raaw maa naan laew chuai chek hai noi / 已经等很久了，请查一下",
  },
  错单: {
    synonym: "ผิด / phit / 错",
    antonym: "ถูกต้อง / thuuk dtawng / 正确",
    comparison: "สั่งผิด 是点错，ส่งผิด 是送错，บิลผิด 是账单错。",
    collocation: "ไม่ใช่ที่สั่ง / mai chai thii sang / 不是我点的",
  },
  坏了: {
    synonym: "เสีย / siia / 坏了",
    antonym: "ใช้ได้ / chai dai / 能用",
    comparison: "เสีย 偏不能用，พัง 偏损坏比较明显或严重。",
    collocation: "เปิดไม่ได้ ช่วยดูให้หน่อย / bpoet mai dai chuai duu hai noi / 打不开，请帮忙看一下",
  },
  不满意: {
    synonym: "ไม่พอใจ / mai phaaw jai / 不满意",
    antonym: "พอใจ / phaaw jai / 满意",
    comparison: "ไม่โอเค 更口语，ไม่พอใจ 更直接，投诉时可加 ขอแจ้งปัญหา 缓和语气。",
    collocation: "คุณภาพไม่ดี อยากให้ปรับปรุง / khun-na-phaap mai dii yaak hai bprap-bprung / 质量不好，希望改进",
  },
  换一个: {
    synonym: "เปลี่ยน / bpliian / 换",
    antonym: "ใช้อันเดิม / chai an doem / 用原来的",
    comparison: "ขอเปลี่ยน 是请求更换；เอาอันอื่น 是说想要别的那个。",
    collocation: "ขอเปลี่ยนอันใหม่ได้ไหม / khaaw bpliian an mai dai mai / 可以换一个新的吗",
  },
  退款: {
    synonym: "คืนเงิน / khuen ngoen / 退款",
    antonym: "จ่ายเงินเพิ่ม / jaai ngoen phoem / 追加付款",
    comparison: "คืนเงิน 是退款动作，เงินคืน 是退回来的钱。",
    collocation: "ขอคืนเงินพร้อมใบเสร็จ / khaaw khuen ngoen phraawm bai-set / 凭收据请求退款",
  },
  请经理: {
    synonym: "ผู้จัดการ / phuu jat-gaan / 经理",
    antonym: "ลูกค้า / luuk khaa / 顾客",
    comparison: "ผู้จัดการ 是经理，ผู้รับผิดชอบ 是负责处理这件事的人。",
    collocation: "ขอพบผู้จัดการได้ไหม / khaaw phop phuu jat-gaan dai mai / 可以见经理吗",
  },
  礼貌表达问题: {
    synonym: "ขอแจ้งปัญหา / khaaw jaaeng bpan-haa / 想反馈问题",
    antonym: "พูดแรง / phuut raaeng / 说话很冲",
    comparison: "投诉时先说 ขอรบกวน 或 มีปัญหานิดหน่อย，语气会更礼貌。",
    collocation: "มีปัญหานิดหน่อย ช่วยดูให้หน่อย / mii bpan-haa nit noi chuai duu hai noi / 有点问题，请帮忙看一下",
  },
  补救: {
    synonym: "แก้ปัญหา / gaae bpan-haa / 解决问题",
    antonym: "ไม่รับผิดชอบ / mai rap phit chaawp / 不负责",
    comparison: "ซ่อมให้ 是修好，เปลี่ยนให้ 是换一个，ชดเชย 是补偿。",
    collocation: "เดี๋ยวจะแก้ให้ / diao ja gaae hai / 等一下会帮您处理",
  },
  记录跟进: {
    synonym: "ติดตาม / dtit dtaam / 跟进",
    antonym: "ปล่อยไว้ / bplaawy wai / 放着不管",
    comparison: "แจ้ง 是通知或反馈，ติดตาม 是之后继续问进度。",
    collocation: "จดรายละเอียดไว้แล้วติดตาม / jot raai la-iat wai laew dtit dtaam / 记下细节后跟进",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เมื่อใช้บริการแล้วมีปัญหา ฉันพูดว่า “${row[1]}” อย่างสุภาพและบอกสิ่งที่อยากให้ช่วยแก้`,
  roman: `muea chai baaw-ri-gaan laew mii bpan-haa chan phuut waa "${row[2]}" yaang su-phaap lae baawk sing thii yaak hai chuai gaae`,
  chinese: `使用服务后遇到问题时，我会礼貌地说“${row[1]}”，并说明希望对方帮忙解决什么。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "基础服务投诉", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 服务投诉和问题反馈表达。适合在商店、餐厅、客服或维修场景礼貌说明问题；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_SERVICE_COMPLAINTS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_SERVICE_COMPLAINTS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
