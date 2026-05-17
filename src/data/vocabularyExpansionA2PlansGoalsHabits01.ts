export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type PlansGoalsHabitsTheme =
  | "计划"
  | "目标"
  | "习惯"
  | "打算"
  | "准备"
  | "继续"
  | "开始结束"
  | "改变习惯"
  | "坚持放弃"
  | "未来安排";

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
  theme: PlansGoalsHabitsTheme,
];

const PLANS_GOALS_HABITS_REFS = [
  "worker-a-a2-plans-goals-habits",
  "basic-thai-plans-goals",
];

const rows: Row[] = [
  ["phaaen", "แผน", "phaaen", "计划；安排", "名词", "计划"],
  ["waang-phaaen", "วางแผน", "waang phaaen", "制定计划；安排", "动词", "计划"],
  ["phaaen-wan-nii", "แผนวันนี้", "phaaen wan nii", "今天的计划", "短语", "计划"],
  ["phaaen-phrung-nii", "แผนพรุ่งนี้", "phaaen phrung nii", "明天的计划", "短语", "计划"],
  ["phaaen-sut-sapdaa", "แผนสุดสัปดาห์", "phaaen sut sap-daa", "周末计划", "短语", "计划"],
  ["phaaen-doen-thaang", "แผนเดินทาง", "phaaen doen thaang", "出行计划", "短语", "计划"],
  ["phaaen-rian", "แผนเรียน", "phaaen rian", "学习计划", "短语", "计划"],
  ["phaaen-ngaan", "แผนงาน", "phaaen ngaan", "工作计划；任务安排", "名词", "计划"],
  ["tham-dtaam-phaaen", "ทำตามแผน", "tham dtaam phaaen", "按计划做", "短语", "计划"],
  ["bplian-phaaen", "เปลี่ยนแผน", "bplian phaaen", "改变计划", "短语", "计划"],
  ["mai-mii-phaaen", "ไม่มีแผน", "mai mii phaaen", "没有计划", "短语", "计划"],
  ["phaaen-sam-raawng", "แผนสำรอง", "phaaen sam-raawng", "备用计划", "名词", "计划"],
  ["bpao-maai", "เป้าหมาย", "bpao maai", "目标", "名词", "目标"],
  ["dtang-bpao-maai", "ตั้งเป้าหมาย", "dtang bpao maai", "设定目标", "动词", "目标"],
  ["bpao-maai-lek-lek", "เป้าหมายเล็ก ๆ", "bpao maai lek lek", "小目标", "短语", "目标"],
  ["bpao-maai-yai", "เป้าหมายใหญ่", "bpao maai yai", "大目标", "短语", "目标"],
  ["bpai-hai-thueng-bpao-maai", "ไปให้ถึงเป้าหมาย", "bpai hai thueng bpao maai", "达到目标", "短语", "目标"],
  ["tham-dai-dtaam-bpao-maai", "ทำได้ตามเป้าหมาย", "tham dai dtaam bpao maai", "做到目标要求", "短语", "目标"],
  ["yang-mai-thueng-bpao-maai", "ยังไม่ถึงเป้าหมาย", "yang mai thueng bpao maai", "还没达到目标", "短语", "目标"],
  ["dtang-jai-hai-sam-ret", "ตั้งใจให้สำเร็จ", "dtang jai hai sam-ret", "下定决心做成功", "短语", "目标"],
  ["khwaam-sam-ret", "ความสำเร็จ", "khwaam sam-ret", "成功；成果", "名词", "目标"],
  ["sam-ret", "สำเร็จ", "sam-ret", "成功；完成", "动词", "目标"],
  ["mai-sam-ret", "ไม่สำเร็จ", "mai sam-ret", "没有成功；未完成", "短语", "目标"],
  ["ni-sai", "นิสัย", "ni-sai", "习惯；性格上的习惯", "名词", "习惯"],
  ["khwaam-khoei-chin", "ความเคยชิน", "khwaam khoei chin", "习惯了的状态；惯性", "名词", "习惯"],
  ["tham-bpen-bpra-jam", "ทำเป็นประจำ", "tham bpen bpra-jam", "经常做；固定做", "短语", "习惯"],
  ["tham-thuk-wan", "ทำทุกวัน", "tham thuk wan", "每天做", "短语", "习惯"],
  ["tham-baawy", "ทำบ่อย", "tham baawy", "常常做", "短语", "习惯"],
  ["mai-khoi-tham", "ไม่ค่อยทำ", "mai khoi tham", "不太常做", "短语", "习惯"],
  ["khoei-chin", "เคยชิน", "khoei chin", "习惯于；习惯了", "动词", "习惯"],
  ["mai-khoei-chin", "ไม่เคยชิน", "mai khoei chin", "不习惯", "短语", "习惯"],
  ["dteun-chao", "ตื่นเช้า", "dteun chao", "早起", "短语", "习惯"],
  ["naawn-duek", "นอนดึก", "naawn duek", "晚睡", "短语", "习惯"],
  ["naawn-hai-phaaw", "นอนให้พอ", "naawn hai phaaw", "睡够", "短语", "习惯"],
  ["gin-hai-dtrong-welaa", "กินให้ตรงเวลา", "gin hai dtrong we-laa", "按时吃饭", "短语", "习惯"],
  ["aan-nang-sue-thuk-wan", "อ่านหนังสือทุกวัน", "aan nang-sue thuk wan", "每天读书", "短语", "习惯"],
  ["awk-gam-lang-gaai-thuk-chao", "ออกกำลังกายทุกเช้า", "awk gam-lang gaai thuk chao", "每天早上运动", "短语", "习惯"],
  ["dtang-jai", "ตั้งใจ", "dtang jai", "用心；有意", "动词", "打算"],
  ["dtang-jai-ja", "ตั้งใจจะ", "dtang jai ja", "打算要……", "句型", "打算"],
  ["khit-ja", "คิดจะ", "khit ja", "想要；考虑要……", "句型", "打算"],
  ["yaak-ja", "อยากจะ", "yaak ja", "想要……", "句型", "打算"],
  ["dtang-jai-rian", "ตั้งใจเรียน", "dtang jai rian", "认真学习", "短语", "打算"],
  ["dtang-jai-tham-ngaan", "ตั้งใจทำงาน", "dtang jai tham ngaan", "认真工作", "短语", "打算"],
  ["dtang-jai-fang", "ตั้งใจฟัง", "dtang jai fang", "认真听", "短语", "打算"],
  ["dtang-jai-fuek", "ตั้งใจฝึก", "dtang jai fuek", "认真练习", "短语", "打算"],
  ["dtang-jai-geb-ngoen", "ตั้งใจเก็บเงิน", "dtang jai gep ngoen", "打算存钱", "短语", "打算"],
  ["dtriiam", "เตรียม", "dtriiam", "准备", "动词", "准备"],
  ["dtriiam-dtua", "เตรียมตัว", "dtriiam dtua", "做准备；准备自己", "动词", "准备"],
  ["dtriiam-khaawng", "เตรียมของ", "dtriiam khaawng", "准备东西", "短语", "准备"],
  ["dtriiam-ek-ga-saan", "เตรียมเอกสาร", "dtriiam ek-ga-saan", "准备文件", "短语", "准备"],
  ["dtriiam-aa-haan", "เตรียมอาหาร", "dtriiam aa-haan", "准备饭菜", "短语", "准备"],
  ["dtriiam-dtua-luang-naa", "เตรียมตัวล่วงหน้า", "dtriiam dtua luang naa", "提前准备", "短语", "准备"],
  ["phraawm", "พร้อม", "phraawm", "准备好了；就绪", "形容词", "准备"],
  ["yang-mai-phraawm", "ยังไม่พร้อม", "yang mai phraawm", "还没准备好", "短语", "准备"],
  ["phraawm-laew", "พร้อมแล้ว", "phraawm laew", "已经准备好了", "短语", "准备"],
  ["dtriiam-wai", "เตรียมไว้", "dtriiam wai", "预先准备好放着", "短语", "准备"],
  ["dtaaw", "ต่อ", "dtaaw", "继续；接着", "副词", "继续"],
  ["tham-dtaaw", "ทำต่อ", "tham dtaaw", "继续做", "短语", "继续"],
  ["rian-dtaaw", "เรียนต่อ", "rian dtaaw", "继续学习；升学", "短语", "继续"],
  ["aan-dtaaw", "อ่านต่อ", "aan dtaaw", "继续读", "短语", "继续"],
  ["doen-dtaaw", "เดินต่อ", "doen dtaaw", "继续走", "短语", "继续"],
  ["fuek-dtaaw", "ฝึกต่อ", "fuek dtaaw", "继续练习", "短语", "继续"],
  ["tham-dtaaw-bpai", "ทำต่อไป", "tham dtaaw bpai", "继续做下去", "短语", "继续"],
  ["dtaaw-neuang", "ต่อเนื่อง", "dtaaw neuuang", "连续的；持续的", "形容词", "继续"],
  ["rueai-rueai", "เรื่อย ๆ", "rueai rueai", "一直；慢慢持续", "副词", "继续"],
  ["mai-yut", "ไม่หยุด", "mai yut", "不停；不停止", "短语", "继续"],
  ["roem", "เริ่ม", "roem", "开始", "动词", "开始结束"],
  ["roem-dton", "เริ่มต้น", "roem dton", "开始；起步", "动词", "开始结束"],
  ["roem-rian", "เริ่มเรียน", "roem rian", "开始学习", "短语", "开始结束"],
  ["roem-tham", "เริ่มทำ", "roem tham", "开始做", "短语", "开始结束"],
  ["roem-mai", "เริ่มใหม่", "roem mai", "重新开始", "短语", "开始结束"],
  ["jop", "จบ", "jop", "结束；完成", "动词", "开始结束"],
  ["jop-laew", "จบแล้ว", "jop laew", "已经结束了", "短语", "开始结束"],
  ["loek", "เลิก", "loek", "停止；结束某活动", "动词", "开始结束"],
  ["loek-tham", "เลิกทำ", "loek tham", "不再做；停止做", "短语", "开始结束"],
  ["yut", "หยุด", "yut", "停止；停下", "动词", "开始结束"],
  ["yut-phak", "หยุดพัก", "yut phak", "停下来休息", "动词", "开始结束"],
  ["sin-sut", "สิ้นสุด", "sin sut", "结束；终止", "动词", "开始结束"],
  ["bplian-ni-sai", "เปลี่ยนนิสัย", "bplian ni-sai", "改变习惯", "短语", "改变习惯"],
  ["bprap-ni-sai", "ปรับนิสัย", "bprap ni-sai", "调整习惯", "短语", "改变习惯"],
  ["lot", "ลด", "lot", "减少；降低", "动词", "改变习惯"],
  ["lot-long", "ลดลง", "lot long", "变少；下降", "动词", "改变习惯"],
  ["lot-welaa-len-mue-thue", "ลดเวลาเล่นมือถือ", "lot we-laa len mue-thue", "减少玩手机的时间", "短语", "改变习惯"],
  ["phoem", "เพิ่ม", "phoem", "增加", "动词", "改变习惯"],
  ["phoem-welaa-aan", "เพิ่มเวลาอ่าน", "phoem we-laa aan", "增加阅读时间", "短语", "改变习惯"],
  ["loek-naawn-duek", "เลิกนอนดึก", "loek naawn duek", "不再晚睡", "短语", "改变习惯"],
  ["hat", "หัด", "hat", "学着做；练习养成", "动词", "改变习惯"],
  ["fuek-ni-sai-mai", "ฝึกนิสัยใหม่", "fuek ni-sai mai", "培养新习惯", "短语", "改变习惯"],
  ["tham-hai-dii-khuen", "ทำให้ดีขึ้น", "tham hai dii khuen", "让它变得更好", "短语", "改变习惯"],
  ["pha-yaa-yaam", "พยายาม", "pha-yaa-yaam", "努力；尝试", "动词", "坚持放弃"],
  ["pha-yaa-yaam-dtaaw", "พยายามต่อ", "pha-yaa-yaam dtaaw", "继续努力", "短语", "坚持放弃"],
  ["ot-thon", "อดทน", "ot thon", "忍耐；坚持", "动词", "坚持放弃"],
  ["mai-yaawm-phae", "ไม่ยอมแพ้", "mai yaawm phaae", "不认输；不放弃", "短语", "坚持放弃"],
  ["yaawm-phae", "ยอมแพ้", "yaawm phaae", "认输；放弃", "动词", "坚持放弃"],
  ["thaaw", "ท้อ", "thaaw", "灰心；泄气", "动词", "坚持放弃"],
  ["neuuai-dtae-yang-tham", "เหนื่อยแต่ยังทำ", "neuuai dtae yang tham", "虽然累但还在做", "句型", "坚持放弃"],
  ["tham-jon-sam-ret", "ทำจนสำเร็จ", "tham jon sam-ret", "做到成功为止", "短语", "坚持放弃"],
  ["tham-mai-dai", "ทำไม่ได้", "tham mai dai", "做不了；做不到", "短语", "坚持放弃"],
  ["laawng-mai", "ลองใหม่", "laawng mai", "再试一次", "短语", "坚持放弃"],
  ["phrung-nii-ja", "พรุ่งนี้จะ", "phrung nii ja", "明天将要……", "句型", "未来安排"],
  ["duean-naa-ja", "เดือนหน้าจะ", "duean naa ja", "下个月将要……", "句型", "未来安排"],
  ["bpii-naa-ja", "ปีหน้าจะ", "bpii naa ja", "明年将要……", "句型", "未来安排"],
  ["lang-jaak-nii", "หลังจากนี้", "lang jaak nii", "从今以后；之后", "短语", "未来安排"],
  ["dtaaw-bpai", "ต่อไป", "dtaaw bpai", "以后；接下来", "副词", "未来安排"],
  ["nai-a-naa-khot", "ในอนาคต", "nai a-naa-khot", "在未来；将来", "短语", "未来安排"],
  ["reo-reo-nii", "เร็ว ๆ นี้", "reo reo nii", "很快；近期", "副词", "未来安排"],
  ["iik-mai-naan", "อีกไม่นาน", "iik mai naan", "不久以后", "短语", "未来安排"],
  ["dtang-dtae-wan-nii", "ตั้งแต่วันนี้", "dtang dtae wan nii", "从今天起", "短语", "未来安排"],
  ["gaawn-sin-duean", "ก่อนสิ้นเดือน", "gaawn sin duean", "月底以前", "短语", "未来安排"],
  ["phaai-nai-bpii-nii", "ภายในปีนี้", "phaai nai bpii nii", "今年以内", "短语", "未来安排"],
];

const relatedByTheme: Record<
  PlansGoalsHabitsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  计划: {
    synonym: "แผนงาน / phaaen ngaan / 工作计划、任务安排",
    antonym: "ไม่มีแผน / mai mii phaaen / 没有计划",
    comparison: "แผน 偏“计划”，เป้าหมาย 偏“目标”，学习时要分清想做什么和要达到什么。",
    collocation: "วางแผนล่วงหน้า / waang phaaen luang naa / 提前做计划",
  },
  目标: {
    synonym: "จุดหมาย / jut maai / 目的地、目标点",
    antonym: "ไม่สำเร็จ / mai sam-ret / 没有成功",
    comparison: "เป้าหมาย 是要达到的目标，แผน 是实现目标的步骤。",
    collocation: "ตั้งเป้าหมายเล็ก ๆ / dtang bpao maai lek lek / 设定小目标",
  },
  习惯: {
    synonym: "ความเคยชิน / khwaam khoei chin / 习惯了的状态",
    antonym: "ไม่เคยชิน / mai khoei chin / 不习惯",
    comparison: "นิสัย 可指习惯或性格，ความเคยชิน 更强调因为常做而习惯。",
    collocation: "ทำเป็นประจำ / tham bpen bpra-jam / 经常固定做",
  },
  打算: {
    synonym: "คิดจะ / khit ja / 想要、考虑要",
    antonym: "ยังไม่คิดจะ / yang mai khit ja / 还没打算",
    comparison: "ตั้งใจจะ 比 อยากจะ 更有决心；อยากจะ 只是想要。",
    collocation: "ตั้งใจจะเรียนภาษาไทย / dtang jai ja rian phaa-saa thai / 打算学泰语",
  },
  准备: {
    synonym: "เตรียมตัว / dtriiam dtua / 做准备",
    antonym: "ยังไม่พร้อม / yang mai phraawm / 还没准备好",
    comparison: "เตรียม 是准备动作，พร้อม 是准备好的状态。",
    collocation: "เตรียมของไว้ก่อน / dtriiam khaawng wai gaawn / 先把东西准备好",
  },
  继续: {
    synonym: "ทำต่อไป / tham dtaaw bpai / 继续做下去",
    antonym: "หยุด / yut / 停止",
    comparison: "ต่อ 放在动词后表示继续，如 อ่านต่อ；ต่อไป 表示接下来、以后。",
    collocation: "ฝึกต่อทุกวัน / fuek dtaaw thuk wan / 每天继续练习",
  },
  开始结束: {
    synonym: "เริ่มต้น / roem dton / 开始、起步",
    antonym: "จบ / jop / 结束",
    comparison: "เลิก 常用于停止某个活动或习惯，หยุด 更像动作停下或暂停。",
    collocation: "เริ่มใหม่อีกครั้ง / roem mai iik khrang / 再重新开始一次",
  },
  改变习惯: {
    synonym: "ปรับนิสัย / bprap ni-sai / 调整习惯",
    antonym: "ทำเหมือนเดิม / tham muean doem / 像以前一样做",
    comparison: "เปลี่ยน 强调改变，ปรับ 强调慢慢调整。",
    collocation: "ลดเวลาเล่นมือถือ / lot we-laa len mue-thue / 减少玩手机的时间",
  },
  坚持放弃: {
    synonym: "ไม่ยอมแพ้ / mai yaawm phaae / 不放弃",
    antonym: "ยอมแพ้ / yaawm phaae / 放弃、认输",
    comparison: "พยายาม 是努力尝试，อดทน 是忍耐坚持，两者常一起用。",
    collocation: "พยายามต่อจนสำเร็จ / pha-yaa-yaam dtaaw jon sam-ret / 继续努力直到成功",
  },
  未来安排: {
    synonym: "ในอนาคต / nai a-naa-khot / 将来",
    antonym: "ตอนนี้ / dtaawn nii / 现在",
    comparison: "เร็ว ๆ นี้ 表示近期，ในอนาคต 范围更大、更远。",
    collocation: "เดือนหน้าจะเริ่มเรียน / duean naa ja roem rian / 下个月将开始学习",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในสมุดแผนของฉันมีคำว่า “${row[1]}” เพื่อเตือนให้ทำตามเป้าหมายทีละขั้น`,
  roman: `nai sa-mut phaaen khaawng chan mii kham waa "${row[2]}" phuea dteuan hai tham dtaam bpao maai thii la khan`,
  chinese: `我的计划本里有“${row[1]}”这个表达，用来提醒自己一步一步按目标去做。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "计划目标习惯", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 ${row[5]}场景常用表达。可以用在说计划、目标、日常习惯或未来安排时，注意和相关表达区分：${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: PLANS_GOALS_HABITS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_PLANS_GOALS_HABITS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
