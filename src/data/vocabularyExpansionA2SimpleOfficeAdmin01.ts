export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type SimpleOfficeAdminTheme =
  | "打印复印"
  | "填表"
  | "登记"
  | "预约会议"
  | "发送文件"
  | "确认收到"
  | "请假"
  | "排班"
  | "办公用品"
  | "行政沟通";

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
  theme: SimpleOfficeAdminTheme,
];

const SIMPLE_OFFICE_ADMIN_REFS = [
  "worker-a-a2-simple-office-admin",
  "basic-thai-office-admin",
];

const rows: Row[] = [
  ["phim", "พิมพ์", "phim", "打印；打字", "动词", "打印复印"],
  ["phim-ek-ga-saan", "พิมพ์เอกสาร", "phim ek-ga-saan", "打印文件", "动词", "打印复印"],
  ["phim-song-naa", "พิมพ์สองหน้า", "phim saawng naa", "双面打印", "动词", "打印复印"],
  ["phim-si", "พิมพ์สี", "phim sii", "彩色打印", "动词", "打印复印"],
  ["phim-khao-dam", "พิมพ์ขาวดำ", "phim khaao dam", "黑白打印", "动词", "打印复印"],
  ["copy", "ถ่ายเอกสาร", "thaai ek-ga-saan", "复印文件", "动词", "打印复印"],
  ["sam-nao", "สำเนา", "sam-nao", "复印件；副本", "名词", "打印复印"],
  ["khreuang-phim", "เครื่องพิมพ์", "khreuuang phim", "打印机", "名词", "打印复印"],
  ["khreuang-thaai-ek-ga-saan", "เครื่องถ่ายเอกสาร", "khreuuang thaai ek-ga-saan", "复印机", "名词", "打印复印"],
  ["gradat-mot", "กระดาษหมด", "gra-daat mot", "纸用完了", "句型", "打印复印"],
  ["graawk-baep-faawm", "กรอกแบบฟอร์ม", "graawk baaep faawm", "填表", "动词", "填表"],
  ["baep-faawm", "แบบฟอร์ม", "baaep faawm", "表格", "名词", "填表"],
  ["graawk-chue", "กรอกชื่อ", "graawk chue", "填写姓名", "动词", "填表"],
  ["graawk-boe-thoo", "กรอกเบอร์โทร", "graawk boe thoo", "填写电话号码", "动词", "填表"],
  ["graawk-thii-yuu", "กรอกที่อยู่", "graawk thii yuu", "填写地址", "动词", "填表"],
  ["long-laai-mue-chue", "ลงลายมือชื่อ", "long laai mue chue", "签名", "动词", "填表"],
  ["chong-waang", "ช่องว่าง", "chaawng waang", "空格；空栏", "名词", "填表"],
  ["khaaw-muun", "ข้อมูล", "khaaw muun", "资料；信息", "名词", "填表"],
  ["khaaw-muun-mai-khrop", "ข้อมูลไม่ครบ", "khaaw muun mai khrop", "资料不完整", "句型", "填表"],
  ["gae-khaaw-muun", "แก้ข้อมูล", "gaae khaaw muun", "修改资料", "动词", "填表"],
  ["long-tha-biian", "ลงทะเบียน", "long tha-biian", "登记；注册", "动词", "登记"],
  ["long-chue", "ลงชื่อ", "long chue", "签名登记", "动词", "登记"],
  ["samnak-ngaan", "สำนักงาน", "sam-nak-ngaan", "办公室；办事处", "名词", "登记"],
  ["phu-maa-dtit-dtaaw", "ผู้มาติดต่อ", "phuu maa dtit dtaaw", "来访办理人员", "名词", "登记"],
  ["rap-bat-khiu", "รับบัตรคิว", "rap bat khiu", "取号", "动词", "登记"],
  ["bat-khiu", "บัตรคิว", "bat khiu", "排队号", "名词", "登记"],
  ["khaaw-bat-bpra-jam-dtua", "ขอบัตรประจำตัว", "khaaw bat bpra-jam dtua", "请出示身份证件", "句型", "登记"],
  ["dtruat-khaaw-muun", "ตรวจข้อมูล", "dtruat khaaw muun", "检查资料", "动词", "登记"],
  ["ban-thuek-khaaw-muun", "บันทึกข้อมูล", "ban-thuek khaaw muun", "记录资料", "动词", "登记"],
  ["long-tha-biian-laew", "ลงทะเบียนแล้ว", "long tha-biian laew", "已经登记", "句型", "登记"],
  ["nat-pra-chum", "นัดประชุม", "nat bpra-chum", "预约会议", "动词", "预约会议"],
  ["jaawng-hong-pra-chum", "จองห้องประชุม", "jaawng haawng bpra-chum", "预订会议室", "动词", "预约会议"],
  ["hong-pra-chum", "ห้องประชุม", "haawng bpra-chum", "会议室", "名词", "预约会议"],
  ["welaa-pra-chum", "เวลาประชุม", "we-laa bpra-chum", "会议时间", "名词", "预约会议"],
  ["wan-pra-chum", "วันประชุม", "wan bpra-chum", "会议日期", "名词", "预约会议"],
  ["luean-pra-chum", "เลื่อนประชุม", "leuan bpra-chum", "推迟会议", "动词", "预约会议"],
  ["yok-loek-pra-chum", "ยกเลิกประชุม", "yok loek bpra-chum", "取消会议", "动词", "预约会议"],
  ["khaaw-yuen-yan-welaa", "ขอยืนยันเวลา", "khaaw yuen yan we-laa", "请确认时间", "句型", "预约会议"],
  ["khao-pra-chum", "เข้าประชุม", "khao bpra-chum", "参加会议", "动词", "预约会议"],
  ["pra-chum-online", "ประชุมออนไลน์", "bpra-chum awn-lai", "线上会议", "动词", "预约会议"],
  ["song-file", "ส่งไฟล์", "song fai", "发送文件", "动词", "发送文件"],
  ["song-ek-ga-saan", "ส่งเอกสาร", "song ek-ga-saan", "发送/提交文件", "动词", "发送文件"],
  ["nae-p-file", "แนบไฟล์", "naaep fai", "附上文件", "动词", "发送文件"],
  ["song-thaang-email", "ส่งทางอีเมล", "song thaang ii-meel", "通过邮件发送", "短语", "发送文件"],
  ["song-thaang-line", "ส่งทางไลน์", "song thaang lai", "通过 LINE 发送", "短语", "发送文件"],
  ["download-file", "ดาวน์โหลดไฟล์", "daao-loot fai", "下载文件", "动词", "发送文件"],
  ["upload-file", "อัปโหลดไฟล์", "ap-loot fai", "上传文件", "动词", "发送文件"],
  ["file-yai-goen-bpai", "ไฟล์ใหญ่เกินไป", "fai yai goen bpai", "文件太大", "句型", "发送文件"],
  ["bpoet-file-mai-dai", "เปิดไฟล์ไม่ได้", "bpoet fai mai dai", "打不开文件", "句型", "发送文件"],
  ["song-mai-iik-khrang", "ส่งใหม่อีกครั้ง", "song mai iik khrang", "再发送一次", "动词", "发送文件"],
  ["dai-rap-laew", "ได้รับแล้ว", "dai rap laew", "已经收到", "句型", "确认收到"],
  ["rap-thraap", "รับทราบ", "rap saap", "收到；知悉", "动词", "确认收到"],
  ["rap-thraap-laew", "รับทราบแล้ว", "rap saap laew", "已收到/知悉", "句型", "确认收到"],
  ["hen-laew", "เห็นแล้ว", "hen laew", "已经看到了", "句型", "确认收到"],
  ["aan-laew", "อ่านแล้ว", "aan laew", "已经读了", "句型", "确认收到"],
  ["dai-file-laew", "ได้ไฟล์แล้ว", "dai fai laew", "已经收到文件", "句型", "确认收到"],
  ["yang-mai-dai-rap", "ยังไม่ได้รับ", "yang mai dai rap", "还没有收到", "句型", "确认收到"],
  ["khaaw-yuen-yan", "ขอยืนยัน", "khaaw yuen yan", "请确认", "句型", "确认收到"],
  ["dtaawp-glap-laew", "ตอบกลับแล้ว", "dtaawp glap laew", "已经回复", "句型", "确认收到"],
  ["ja-dtaawp-glap", "จะตอบกลับ", "ja dtaawp glap", "会回复", "句型", "确认收到"],
  ["laa", "ลา", "laa", "请假；告别", "动词", "请假"],
  ["laa-bpuai", "ลาป่วย", "laa bpuai", "请病假", "动词", "请假"],
  ["laa-git", "ลากิจ", "laa git", "请事假", "动词", "请假"],
  ["khaaw-laa", "ขอลา", "khaaw laa", "请求请假", "句型", "请假"],
  ["bai-laa", "ใบลา", "bai laa", "请假单", "名词", "请假"],
  ["laa-khrueng-wan", "ลาครึ่งวัน", "laa khrueng wan", "请半天假", "动词", "请假"],
  ["laa-nueng-wan", "ลาหนึ่งวัน", "laa nueng wan", "请一天假", "动词", "请假"],
  ["a-nu-mat-gaan-laa", "อนุมัติการลา", "a-nu-mat gaan laa", "批准请假", "动词", "请假"],
  ["yang-mai-a-nu-mat", "ยังไม่อนุมัติ", "yang mai a-nu-mat", "尚未批准", "句型", "请假"],
  ["glap-maa-tham-ngaan", "กลับมาทำงาน", "glap maa tham ngaan", "回来上班", "动词", "请假"],
  ["jad-ga", "จัดกะ", "jat ga", "排班", "动词", "排班"],
  ["dtarang-ga", "ตารางกะ", "dtaa-raang ga", "班次表", "名词", "排班"],
  ["ga-chao", "กะเช้า", "ga chao", "早班", "名词", "排班"],
  ["ga-baai", "กะบ่าย", "ga baai", "下午班", "名词", "排班"],
  ["ga-duek", "กะดึก", "ga duek", "夜班", "名词", "排班"],
  ["bplian-ga", "เปลี่ยนกะ", "bpliian ga", "换班", "动词", "排班"],
  ["laek-ga", "แลกกะ", "laaek ga", "调换班次", "动词", "排班"],
  ["khao-ga", "เข้ากะ", "khao ga", "上班次", "动词", "排班"],
  ["awk-ga", "ออกกะ", "awk ga", "下班次", "动词", "排班"],
  ["wan-yut", "วันหยุด", "wan yut", "休息日", "名词", "排班"],
  ["bpaak-gaa", "ปากกา", "bpaak-gaa", "笔", "名词", "办公用品"],
  ["din-saaw", "ดินสอ", "din-saaw", "铅笔", "名词", "办公用品"],
  ["gradat", "กระดาษ", "gra-daat", "纸", "名词", "办公用品"],
  ["laaen-file", "แฟ้ม", "faaem", "文件夹", "名词", "办公用品"],
  ["clip", "คลิปหนีบกระดาษ", "khlip niip gra-daat", "回形针/纸夹", "名词", "办公用品"],
  ["stapler", "ที่เย็บกระดาษ", "thii yep gra-daat", "订书机", "名词", "办公用品"],
  ["teep-gaao", "เทปกาว", "theep gaao", "胶带", "名词", "办公用品"],
  ["song-ek-ga-saan", "ซองเอกสาร", "saawng ek-ga-saan", "文件袋", "名词", "办公用品"],
  ["muek-phim", "หมึกพิมพ์", "muek phim", "打印墨", "名词", "办公用品"],
  ["khaawng-samnak-ngaan", "ของสำนักงาน", "khaawng sam-nak-ngaan", "办公室用品", "名词", "办公用品"],
  ["khaaw-rop-guan", "ขอรบกวน", "khaaw rop guan", "麻烦您", "短语", "行政沟通"],
  ["ga-ru-naa", "กรุณา", "ga-ru-naa", "请；请您", "动词", "行政沟通"],
  ["khaaw-dtruat-saawp", "ขอตรวจสอบ", "khaaw dtruat saawp", "请允许核查", "句型", "行政沟通"],
  ["khaaw-raai-la-iat", "ขอรายละเอียด", "khaaw raai la-iat", "请提供细节", "句型", "行政沟通"],
  ["jaeng-hai-thraap", "แจ้งให้ทราบ", "jaaeng hai saap", "通知知悉", "动词", "行政沟通"],
  ["jaeng-luang-naa", "แจ้งล่วงหน้า", "jaaeng luang naa", "提前通知", "动词", "行政沟通"],
  ["damnoen-gaan", "ดำเนินการ", "dam-noen gaan", "办理；处理", "动词", "行政沟通"],
  ["damnoen-gaan-laew", "ดำเนินการแล้ว", "dam-noen gaan laew", "已经办理", "句型", "行政沟通"],
  ["raw-damnoen-gaan", "รอดำเนินการ", "raaw dam-noen gaan", "等待办理", "短语", "行政沟通"],
  ["khawp-khun-thii-hai-khwaam-ruam-mue", "ขอบคุณที่ให้ความร่วมมือ", "khaawp khun thii hai khwaam ruam mue", "感谢配合", "句型", "行政沟通"],
];

const relatedByTheme: Record<
  SimpleOfficeAdminTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  打印复印: {
    synonym: "พิมพ์เอกสาร / phim ek-ga-saan / 打印文件",
    antonym: "ไม่พิมพ์ / mai phim / 不打印",
    comparison: "พิมพ์ 可指打字或打印，ถ่ายเอกสาร 是复印。",
    collocation: "พิมพ์เอกสารสองหน้า / phim ek-ga-saan saawng naa / 双面打印文件",
  },
  填表: {
    synonym: "กรอกแบบฟอร์ม / graawk baaep faawm / 填表",
    antonym: "ข้อมูลไม่ครบ / khaaw muun mai khrop / 资料不完整",
    comparison: "กรอก 是填写，ลงลายมือชื่อ 是签名。",
    collocation: "กรอกข้อมูลให้ครบ / graawk khaaw muun hai khrop / 把资料填完整",
  },
  登记: {
    synonym: "ลงทะเบียน / long tha-biian / 登记",
    antonym: "ยังไม่ลงทะเบียน / yang mai long tha-biian / 尚未登记",
    comparison: "ลงทะเบียน 是登记注册，รับบัตรคิว 是取排队号。",
    collocation: "ลงทะเบียนแล้วรับบัตรคิว / long tha-biian laew rap bat khiu / 登记后取号",
  },
  预约会议: {
    synonym: "นัดประชุม / nat bpra-chum / 预约会议",
    antonym: "ยกเลิกประชุม / yok loek bpra-chum / 取消会议",
    comparison: "นัดประชุม 是约会议，จองห้องประชุม 是订会议室。",
    collocation: "ขอยืนยันเวลาประชุม / khaaw yuen yan we-laa bpra-chum / 请确认会议时间",
  },
  发送文件: {
    synonym: "ส่งไฟล์ / song fai / 发送文件",
    antonym: "ยังไม่ส่ง / yang mai song / 还没发送",
    comparison: "แนบไฟล์ 是附上文件，อัปโหลดไฟล์ 是上传文件。",
    collocation: "แนบไฟล์แล้วส่งทางอีเมล / naaep fai laew song thaang ii-meel / 附上文件后通过邮件发送",
  },
  确认收到: {
    synonym: "รับทราบ / rap saap / 收到、知悉",
    antonym: "ยังไม่ได้รับ / yang mai dai rap / 还没收到",
    comparison: "ได้รับแล้ว 是收到，รับทราบ 是已知悉，语气更正式。",
    collocation: "ได้รับไฟล์แล้ว จะตอบกลับ / dai rap fai laew ja dtaawp glap / 已收到文件，会回复",
  },
  请假: {
    synonym: "ขอลา / khaaw laa / 请求请假",
    antonym: "มาทำงาน / maa tham ngaan / 来上班",
    comparison: "ลาป่วย 是病假，ลากิจ 是事假。",
    collocation: "ขอลาป่วยหนึ่งวัน / khaaw laa bpuai nueng wan / 请一天病假",
  },
  排班: {
    synonym: "จัดกะ / jat ga / 排班",
    antonym: "วันหยุด / wan yut / 休息日",
    comparison: "เปลี่ยนกะ 是换班，แลกกะ 是和别人调换班次。",
    collocation: "แลกกะกับเพื่อนร่วมงาน / laaek ga gap phuean ruam ngaan / 和同事调班",
  },
  办公用品: {
    synonym: "ของสำนักงาน / khaawng sam-nak-ngaan / 办公用品",
    antonym: "ของส่วนตัว / khaawng suan dtua / 私人物品",
    comparison: "แฟ้ม 是文件夹，ซองเอกสาร 是文件袋。",
    collocation: "ขอกระดาษกับปากกา / khaaw gra-daat gap bpaak-gaa / 要纸和笔",
  },
  行政沟通: {
    synonym: "ดำเนินการ / dam-noen gaan / 办理、处理",
    antonym: "รอดำเนินการ / raaw dam-noen gaan / 等待办理",
    comparison: "แจ้งให้ทราบ 是通知知悉，ขอตรวจสอบ 是请求核查。",
    collocation: "ขอรบกวนตรวจสอบรายละเอียด / khaaw rop guan dtruat saawp raai la-iat / 麻烦核查细节",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในงานสำนักงานง่าย ๆ ฉันใช้คำว่า “${row[1]}” เพื่อจัดการเอกสาร นัดหมาย หรือสื่อสารกับเพื่อนร่วมงาน`,
  roman: `nai ngaan sam-nak-ngaan ngaai ngaai chan chai kham waa "${row[2]}" phuea jat-gaan ek-ga-saan nat-maai rue sue-saan gap phuean ruam ngaan`,
  chinese: `在简单办公室事务中，我会用“${row[1]}”来处理文件、预约或和同事沟通。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "办公室行政", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 简单办公室行政表达。适合打印复印、填表登记、预约会议、发送文件、确认收到、请假和排班；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: SIMPLE_OFFICE_ADMIN_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_OFFICE_ADMIN_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
