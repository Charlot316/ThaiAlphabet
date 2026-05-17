export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type WorkStudyTasksTheme =
  | "完成"
  | "提交"
  | "修改"
  | "检查"
  | "打印"
  | "下载上传"
  | "讨论"
  | "练习"
  | "复习"
  | "任务安排";

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
  theme: WorkStudyTasksTheme,
];

const WORK_STUDY_TASKS_REFS = [
  "worker-a-a2-work-study-tasks",
  "basic-thai-work-study-tasks",
];

const rows: Row[] = [
  ["tham-set", "ทำเสร็จ", "tham set", "做完", "动词", "完成"],
  ["set-laew", "เสร็จแล้ว", "set laew", "完成了", "句型", "完成"],
  ["yang-mai-set", "ยังไม่เสร็จ", "yang mai set", "还没完成", "句型", "完成"],
  ["glai-set", "ใกล้เสร็จ", "glai set", "快完成了", "短语", "完成"],
  ["tham-hai-set", "ทำให้เสร็จ", "tham hai set", "把它做完", "短语", "完成"],
  ["tham-jon-set", "ทำจนเสร็จ", "tham jon set", "做到完成为止", "短语", "完成"],
  ["ngaan-set", "งานเสร็จ", "ngaan set", "工作完成", "句型", "完成"],
  ["rian-set", "เรียนเสร็จ", "rian set", "课上完；学习完成", "句型", "完成"],
  ["set-than-welaa", "เสร็จทันเวลา", "set than we-laa", "按时完成", "短语", "完成"],
  ["set-mai-than", "เสร็จไม่ทัน", "set mai than", "来不及完成", "短语", "完成"],
  ["song", "ส่ง", "song", "提交；发送", "动词", "提交"],
  ["song-ngaan", "ส่งงาน", "song ngaan", "交作业/交工作", "动词", "提交"],
  ["song-gaan-baan", "ส่งการบ้าน", "song gaan baan", "交作业", "动词", "提交"],
  ["song-raai-ngaan", "ส่งรายงาน", "song raai ngaan", "提交报告", "动词", "提交"],
  ["song-ek-ga-saan", "ส่งเอกสาร", "song ek-ga-saan", "提交文件", "动词", "提交"],
  ["song-thaang-email", "ส่งทางอีเมล", "song thaang ii-meel", "通过邮件发送", "短语", "提交"],
  ["song-nai-line", "ส่งในไลน์", "song nai lai", "在 LINE 里发送", "短语", "提交"],
  ["song-gaawn-welaa", "ส่งก่อนเวลา", "song gaawn we-laa", "提前提交", "短语", "提交"],
  ["song-chaa", "ส่งช้า", "song chaa", "提交晚了", "短语", "提交"],
  ["song-mai", "ส่งใหม่", "song mai", "重新发送/提交", "动词", "提交"],
  ["gae", "แก้", "gaae", "改；纠正", "动词", "修改"],
  ["gae-khai", "แก้ไข", "gaae khai", "修改；修正", "动词", "修改"],
  ["gae-ngaan", "แก้งาน", "gaae ngaan", "修改作业/工作", "动词", "修改"],
  ["gae-kham-phit", "แก้คำผิด", "gaae kham phit", "改错字", "动词", "修改"],
  ["bprap", "ปรับ", "bprap", "调整", "动词", "修改"],
  ["bprap-bprung", "ปรับปรุง", "bprap bprung", "改进", "动词", "修改"],
  ["bplian-khaaw-muun", "เปลี่ยนข้อมูล", "bpliian khaaw muun", "更改资料", "动词", "修改"],
  ["khian-mai", "เขียนใหม่", "khian mai", "重写", "动词", "修改"],
  ["tham-mai", "ทำใหม่", "tham mai", "重做", "动词", "修改"],
  ["chabap-mai", "ฉบับใหม่", "cha-bap mai", "新版；新版本", "名词", "修改"],
  ["chek", "เช็ก", "chek", "检查；核对", "动词", "检查"],
  ["dtruat", "ตรวจ", "dtruat", "检查", "动词", "检查"],
  ["dtruat-saawp", "ตรวจสอบ", "dtruat saawp", "核查；检查确认", "动词", "检查"],
  ["chek-kham-phit", "เช็กคำผิด", "chek kham phit", "检查错字", "动词", "检查"],
  ["chek-khwaam-thuuk", "เช็กความถูก", "chek khwaam thuuk", "检查正确性", "动词", "检查"],
  ["chek-iik-khrang", "เช็กอีกครั้ง", "chek iik khrang", "再检查一次", "短语", "检查"],
  ["duu-raai-la-iat", "ดูรายละเอียด", "duu raai la-iat", "看细节", "动词", "检查"],
  ["duu-kham-dtaawp", "ดูคำตอบ", "duu kham dtaawp", "看答案", "动词", "检查"],
  ["dtruat-ngaan", "ตรวจงาน", "dtruat ngaan", "检查作业/工作", "动词", "检查"],
  ["hai-khruu-dtruat", "ให้ครูตรวจ", "hai khruu dtruat", "让老师检查", "句型", "检查"],
  ["phim", "พิมพ์", "phim", "打印；打字", "动词", "打印"],
  ["phim-ek-ga-saan", "พิมพ์เอกสาร", "phim ek-ga-saan", "打印文件", "动词", "打印"],
  ["phim-ngaan", "พิมพ์งาน", "phim ngaan", "打字做文档/打印工作", "动词", "打印"],
  ["khreuang-phim", "เครื่องพิมพ์", "khreuuang phim", "打印机", "名词", "打印"],
  ["gradat", "กระดาษ", "gra-daat", "纸", "名词", "打印"],
  ["muek-phim", "หมึกพิมพ์", "muek phim", "墨水；打印墨", "名词", "打印"],
  ["phim-si", "พิมพ์สี", "phim sii", "彩色打印", "动词", "打印"],
  ["phim-khao-dam", "พิมพ์ขาวดำ", "phim khaao dam", "黑白打印", "动词", "打印"],
  ["phim-song-naa", "พิมพ์สองหน้า", "phim saawng naa", "双面打印", "动词", "打印"],
  ["phim-mai-dai", "พิมพ์ไม่ได้", "phim mai dai", "打印不了", "句型", "打印"],
  ["download", "ดาวน์โหลด", "daao-loot", "下载", "动词", "下载上传"],
  ["upload", "อัปโหลด", "ap-loot", "上传", "动词", "下载上传"],
  ["load-file", "โหลดไฟล์", "loot fai", "加载/下载文件", "动词", "下载上传"],
  ["file", "ไฟล์", "fai", "文件", "名词", "下载上传"],
  ["file-ngaan", "ไฟล์งาน", "fai ngaan", "工作/作业文件", "名词", "下载上传"],
  ["nae-p-file", "แนบไฟล์", "naaep fai", "附上文件", "动词", "下载上传"],
  ["song-file", "ส่งไฟล์", "song fai", "发送文件", "动词", "下载上传"],
  ["bpoet-file", "เปิดไฟล์", "bpoet fai", "打开文件", "动词", "下载上传"],
  ["save-file", "บันทึกไฟล์", "ban-thuek fai", "保存文件", "动词", "下载上传"],
  ["file-yai-goen-bpai", "ไฟล์ใหญ่เกินไป", "fai yai goen bpai", "文件太大", "句型", "下载上传"],
  ["khui-gan", "คุยกัน", "khui gan", "互相聊；讨论", "动词", "讨论"],
  ["phuut-khui", "พูดคุย", "phuut khui", "交谈；讨论", "动词", "讨论"],
  ["prueksa", "ปรึกษา", "bpruek-saa", "商量；请教", "动词", "讨论"],
  ["ophipraai", "อภิปราย", "a-phi-praai", "讨论；发表看法", "动词", "讨论"],
  ["pra-chum", "ประชุม", "bpra-chum", "开会", "动词", "讨论"],
  ["pra-chum-glum", "ประชุมกลุ่ม", "bpra-chum glum", "小组开会", "动词", "讨论"],
  ["khui-rueng-ngaan", "คุยเรื่องงาน", "khui rueang ngaan", "谈工作", "动词", "讨论"],
  ["thaam-khwaam-hen", "ถามความเห็น", "thaam khwaam hen", "询问意见", "动词", "讨论"],
  ["sanoe-khwaam-khit", "เสนอความคิด", "sa-noe khwaam khit", "提出想法", "动词", "讨论"],
  ["dtok-long-gan", "ตกลงกัน", "dtok long gan", "互相商定", "动词", "讨论"],
  ["fuek", "ฝึก", "fuek", "练习", "动词", "练习"],
  ["fuek-hat", "ฝึกหัด", "fuek hat", "练习；训练", "动词", "练习"],
  ["tham-baep-fuek-hat", "ทำแบบฝึกหัด", "tham baaep fuek hat", "做练习题", "动词", "练习"],
  ["fuek-phuut", "ฝึกพูด", "fuek phuut", "练习说", "动词", "练习"],
  ["fuek-fang", "ฝึกฟัง", "fuek fang", "练习听", "动词", "练习"],
  ["fuek-aan", "ฝึกอ่าน", "fuek aan", "练习读", "动词", "练习"],
  ["fuek-khian", "ฝึกเขียน", "fuek khian", "练习写", "动词", "练习"],
  ["fuek-thuk-wan", "ฝึกทุกวัน", "fuek thuk wan", "每天练习", "短语", "练习"],
  ["laawng-tham", "ลองทำ", "laawng tham", "试着做", "动词", "练习"],
  ["fuek-iik-khrang", "ฝึกอีกครั้ง", "fuek iik khrang", "再练一次", "短语", "练习"],
  ["thop-thuan", "ทบทวน", "thop thuan", "复习；回顾", "动词", "复习"],
  ["thop-thuan-bot-rian", "ทบทวนบทเรียน", "thop thuan bot rian", "复习课文", "动词", "复习"],
  ["aan-thuan", "อ่านทวน", "aan thuan", "再读复查", "动词", "复习"],
  ["duu-iik-khrang", "ดูอีกครั้ง", "duu iik khrang", "再看一次", "短语", "复习"],
  ["jam-kham-sap", "จำคำศัพท์", "jam kham sap", "记单词", "动词", "复习"],
  ["thuan-kham-sap", "ทวนคำศัพท์", "thuan kham sap", "复习单词", "动词", "复习"],
  ["dtriiam-sop", "เตรียมสอบ", "dtriiam saawp", "准备考试", "动词", "复习"],
  ["saawp-yaawy", "สอบย่อย", "saawp yaawy", "小测验", "名词", "复习"],
  ["kham-dtaawp", "คำตอบ", "kham dtaawp", "答案", "名词", "复习"],
  ["khaaw-sop", "ข้อสอบ", "khaaw saawp", "考题；试卷", "名词", "复习"],
  ["naa-thii", "หน้าที่", "naa thii", "职责；任务", "名词", "任务安排"],
  ["ngaan-thii-dtawng-tham", "งานที่ต้องทำ", "ngaan thii dtawng tham", "要做的任务", "名词", "任务安排"],
  ["raai-gaan-ngaan", "รายการงาน", "raai-gaan ngaan", "任务清单", "名词", "任务安排"],
  ["baeng-ngaan", "แบ่งงาน", "baeng ngaan", "分配工作", "动词", "任务安排"],
  ["rap-ngaan", "รับงาน", "rap ngaan", "接任务", "动词", "任务安排"],
  ["hai-ngaan", "ให้งาน", "hai ngaan", "布置任务", "动词", "任务安排"],
  ["gam-not-welaa", "กำหนดเวลา", "gam-not we-laa", "规定时间；截止时间", "名词", "任务安排"],
  ["wan-song-ngaan", "วันส่งงาน", "wan song ngaan", "交作业/交任务的日期", "名词", "任务安排"],
  ["dtit-dtaam-ngaan", "ติดตามงาน", "dtit dtaam ngaan", "跟进任务", "动词", "任务安排"],
  ["sa-rup-ngaan", "สรุปงาน", "sa-rup ngaan", "总结任务/工作", "动词", "任务安排"],
];

const relatedByTheme: Record<
  WorkStudyTasksTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  完成: {
    synonym: "เสร็จแล้ว / set laew / 完成了",
    antonym: "ยังไม่เสร็จ / yang mai set / 还没完成",
    comparison: "เสร็จ 表示完成，ทันเวลา 表示赶得上时间。",
    collocation: "ทำงานให้เสร็จทันเวลา / tham ngaan hai set than we-laa / 按时把工作做完",
  },
  提交: {
    synonym: "ส่งงาน / song ngaan / 交任务",
    antonym: "ยังไม่ส่ง / yang mai song / 还没交",
    comparison: "ส่ง 可指发送也可指提交，具体看后面的对象。",
    collocation: "ส่งรายงานทางอีเมล / song raai ngaan thaang ii-meel / 通过邮件提交报告",
  },
  修改: {
    synonym: "แก้ไข / gaae khai / 修改",
    antonym: "ไม่แก้ / mai gaae / 不改",
    comparison: "แก้ 更口语，แก้ไข 更完整；ปรับปรุง 强调改进。",
    collocation: "แก้คำผิดแล้วส่งใหม่ / gaae kham phit laew song mai / 改完错字后重新提交",
  },
  检查: {
    synonym: "ตรวจสอบ / dtruat saawp / 核查",
    antonym: "ไม่เช็ก / mai chek / 不检查",
    comparison: "เช็ก 偏口语检查，ตรวจสอบ 更正式一点但 A2 场景常见。",
    collocation: "เช็กงานอีกครั้งก่อนส่ง / chek ngaan iik khrang gaawn song / 提交前再检查一次",
  },
  打印: {
    synonym: "พิมพ์เอกสาร / phim ek-ga-saan / 打印文件",
    antonym: "ไม่พิมพ์ / mai phim / 不打印",
    comparison: "พิมพ์ 可指打字也可指打印，เครื่องพิมพ์ 是打印机。",
    collocation: "พิมพ์สองหน้าเพื่อประหยัดกระดาษ / phim saawng naa phuea bpra-yat gra-daat / 双面打印以节省纸",
  },
  下载上传: {
    synonym: "ดาวน์โหลด / daao-loot / 下载",
    antonym: "อัปโหลด / ap-loot / 上传",
    comparison: "ดาวน์โหลด 是把文件下载下来，อัปโหลด 是把文件传上去。",
    collocation: "แนบไฟล์แล้วอัปโหลด / naaep fai laew ap-loot / 附上文件后上传",
  },
  讨论: {
    synonym: "ปรึกษา / bpruek-saa / 商量、请教",
    antonym: "ทำคนเดียว / tham khon diao / 一个人做",
    comparison: "คุยกัน 偏日常聊天讨论，ประชุม 是开会。",
    collocation: "ประชุมกลุ่มเพื่อแบ่งงาน / bpra-chum glum phuea baeng ngaan / 小组开会分工",
  },
  练习: {
    synonym: "ฝึก / fuek / 练习",
    antonym: "ไม่ฝึก / mai fuek / 不练",
    comparison: "ฝึก 是练习动作，แบบฝึกหัด 是练习题。",
    collocation: "ฝึกพูดภาษาไทยทุกวัน / fuek phuut phaa-saa thai thuk wan / 每天练习说泰语",
  },
  复习: {
    synonym: "ทบทวน / thop thuan / 复习",
    antonym: "ลืม / luem / 忘记",
    comparison: "ทบทวน 是复习回顾，จำ 是记住。",
    collocation: "ทบทวนบทเรียนก่อนสอบ / thop thuan bot rian gaawn saawp / 考试前复习课文",
  },
  任务安排: {
    synonym: "งานที่ต้องทำ / ngaan thii dtawng tham / 要做的任务",
    antonym: "ไม่มีงาน / mai mii ngaan / 没有任务",
    comparison: "หน้าที่ 强调职责，งานที่ต้องทำ 强调具体要完成的事。",
    collocation: "แบ่งงานและกำหนดเวลา / baeng ngaan lae gam-not we-laa / 分配任务并规定时间",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาเรียนหรือทำงาน ฉันใช้คำว่า “${row[1]}” เพื่อบอกงานที่ต้องทำและติดตามผลให้ชัดเจน`,
  roman: `we-laa rian rue tham ngaan chan chai kham waa "${row[2]}" phuea baawk ngaan thii dtawng tham lae dtit dtaam phon hai chat-jen`,
  chinese: `学习或工作时，我会用“${row[1]}”来说明要做的任务，并清楚跟进结果。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "工作学习任务", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 工作学习任务表达。适合说完成、提交、修改、检查、打印、下载上传、讨论、练习和复习；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: WORK_STUDY_TASKS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_WORK_STUDY_TASKS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
