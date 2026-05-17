export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type PersonalHistoryExperienceTheme =
  | "出生"
  | "长大"
  | "搬家"
  | "学过"
  | "去过"
  | "做过"
  | "第一次"
  | "以前"
  | "最近"
  | "习惯变化";

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
  theme: PersonalHistoryExperienceTheme,
];

const PERSONAL_HISTORY_EXPERIENCE_REFS = [
  "worker-a-a2-personal-history-experience",
  "basic-thai-personal-experience",
];

const rows: Row[] = [
  ["goet", "เกิด", "goet", "出生；发生", "动词", "出生"],
  ["goet-thii", "เกิดที่", "goet thii", "出生在……", "句型", "出生"],
  ["goet-nai", "เกิดใน", "goet nai", "出生于……里面/年份", "句型", "出生"],
  ["wan-goet", "วันเกิด", "wan goet", "生日", "名词", "出生"],
  ["pii-goet", "ปีเกิด", "bpii goet", "出生年份", "名词", "出生"],
  ["mueang-goet", "เมืองเกิด", "mueang goet", "出生城市；故乡城市", "名词", "出生"],
  ["baan-goet", "บ้านเกิด", "baan goet", "家乡；出生地", "名词", "出生"],
  ["goet-laew-dtoo-thii", "เกิดแล้วโตที่", "goet laew dtoo thii", "出生并在……长大", "句型", "出生"],
  ["bpen-khon", "เป็นคน", "bpen khon", "是……地方的人", "句型", "出生"],
  ["maa-jaak", "มาจาก", "maa jaak", "来自……", "句型", "出生"],
  ["dtoo", "โต", "dtoo", "长大；变大", "动词", "长大"],
  ["dtoo-khuen", "โตขึ้น", "dtoo khuen", "长大起来", "动词", "长大"],
  ["dtoo-thii", "โตที่", "dtoo thii", "在……长大", "句型", "长大"],
  ["dtoo-maa-nai", "โตมาใน", "dtoo maa nai", "在……环境中长大", "句型", "长大"],
  ["wai-dek", "วัยเด็ก", "wai dek", "童年；小时候", "名词", "长大"],
  ["dtaawn-dek", "ตอนเด็ก", "dtaawn dek", "小时候", "短语", "长大"],
  ["muea-dek", "เมื่อเด็ก", "muea dek", "小时候；孩提时", "短语", "长大"],
  ["rian-thii", "เรียนที่", "rian thii", "在……上学", "句型", "长大"],
  ["yuu-gap-khraawp-khrua", "อยู่กับครอบครัว", "yuu gap khraawp khrua", "和家人住在一起", "句型", "长大"],
  ["khwaam-song-jam-wai-dek", "ความทรงจำวัยเด็ก", "khwaam song jam wai dek", "童年记忆", "名词", "长大"],
  ["yaai-baan", "ย้ายบ้าน", "yaai baan", "搬家", "动词", "搬家"],
  ["yaai-thii-yuu", "ย้ายที่อยู่", "yaai thii yuu", "搬住所；迁址", "动词", "搬家"],
  ["yaai-bpai", "ย้ายไป", "yaai bpai", "搬去……", "动词", "搬家"],
  ["yaai-maa", "ย้ายมา", "yaai maa", "搬来……", "动词", "搬家"],
  ["yaai-jaak", "ย้ายจาก", "yaai jaak", "从……搬走", "句型", "搬家"],
  ["baan-mai", "บ้านใหม่", "baan mai", "新家", "名词", "搬家"],
  ["baan-gao", "บ้านเก่า", "baan gao", "旧家", "名词", "搬家"],
  ["jam-thii-yuu-mai", "จำที่อยู่ใหม่", "jam thii yuu mai", "记住新地址", "动词", "搬家"],
  ["bplian-thii-yuu", "เปลี่ยนที่อยู่", "bpliian thii yuu", "更改地址", "动词", "搬家"],
  ["yuu-thii-nii-maa", "อยู่ที่นี่มา", "yuu thii nii maa", "在这里住了……", "句型", "搬家"],
  ["khoei-rian", "เคยเรียน", "khoei rian", "学过", "动词", "学过"],
  ["khoei-rian-phaa-saa-thai", "เคยเรียนภาษาไทย", "khoei rian phaa-saa thai", "学过泰语", "句型", "学过"],
  ["rian-maa", "เรียนมา", "rian maa", "学了过来；一直学到现在", "动词", "学过"],
  ["rian-laew", "เรียนแล้ว", "rian laew", "已经学了", "句型", "学过"],
  ["mai-khoei-rian", "ไม่เคยเรียน", "mai khoei rian", "没学过", "句型", "学过"],
  ["rian-dai-nit-noi", "เรียนได้นิดหน่อย", "rian dai nit noi", "学会了一点", "句型", "学过"],
  ["rian-dton-dek", "เรียนตอนเด็ก", "rian dtaawn dek", "小时候学过", "句型", "学过"],
  ["rian-duai-dtua-eng", "เรียนด้วยตัวเอง", "rian duai dtua eng", "自学", "动词", "学过"],
  ["rian-gap-khruu", "เรียนกับครู", "rian gap khruu", "跟老师学", "动词", "学过"],
  ["khoei-fuek", "เคยฝึก", "khoei fuek", "练习过", "动词", "学过"],
  ["khoei-bpai", "เคยไป", "khoei bpai", "去过", "动词", "去过"],
  ["mai-khoei-bpai", "ไม่เคยไป", "mai khoei bpai", "没去过", "句型", "去过"],
  ["bpai-maa-laew", "ไปมาแล้ว", "bpai maa laew", "已经去过了", "句型", "去过"],
  ["khoei-bpai-thiao", "เคยไปเที่ยว", "khoei bpai thiao", "去旅游过", "动词", "去过"],
  ["khoei-bpai-tham-ngaan", "เคยไปทำงาน", "khoei bpai tham ngaan", "去工作过", "句型", "去过"],
  ["khoei-bpai-yiam", "เคยไปเยี่ยม", "khoei bpai yiiam", "去拜访过", "动词", "去过"],
  ["bpai-khrang-raek", "ไปครั้งแรก", "bpai khrang raaek", "第一次去", "短语", "去过"],
  ["bpai-laai-khrang", "ไปหลายครั้ง", "bpai laai khrang", "去过很多次", "短语", "去过"],
  ["bpai-khrang-diao", "ไปครั้งเดียว", "bpai khrang diao", "只去过一次", "短语", "去过"],
  ["yaak-bpai-iik", "อยากไปอีก", "yaak bpai iik", "还想再去", "句型", "去过"],
  ["khoei-tham", "เคยทำ", "khoei tham", "做过", "动词", "做过"],
  ["mai-khoei-tham", "ไม่เคยทำ", "mai khoei tham", "没做过", "句型", "做过"],
  ["tham-maa-laew", "ทำมาแล้ว", "tham maa laew", "已经做过了", "句型", "做过"],
  ["khoei-tham-ngaan", "เคยทำงาน", "khoei tham ngaan", "工作过；做过工作", "动词", "做过"],
  ["khoei-chuai", "เคยช่วย", "khoei chuai", "帮过忙", "动词", "做过"],
  ["khoei-laawng", "เคยลอง", "khoei laawng", "试过", "动词", "做过"],
  ["laawng-tham-laew", "ลองทำแล้ว", "laawng tham laew", "已经试着做过了", "句型", "做过"],
  ["tham-bpen", "ทำเป็น", "tham bpen", "会做", "动词", "做过"],
  ["tham-mai-bpen", "ทำไม่เป็น", "tham mai bpen", "不会做", "句型", "做过"],
  ["mi-bprasopgaan", "มีประสบการณ์", "mii bpra-sop-gaan", "有经验", "句型", "做过"],
  ["khrang-raek", "ครั้งแรก", "khrang raaek", "第一次", "名词", "第一次"],
  ["bpen-khrang-raek", "เป็นครั้งแรก", "bpen khrang raaek", "是第一次", "短语", "第一次"],
  ["khrang-raek-thii", "ครั้งแรกที่", "khrang raaek thii", "第一次……的时候", "句型", "第一次"],
  ["phroeng-laawng-khrang-raek", "เพิ่งลองครั้งแรก", "phoeng laawng khrang raaek", "刚第一次尝试", "句型", "第一次"],
  ["khrang-raek-nai-chiiwit", "ครั้งแรกในชีวิต", "khrang raaek nai chii-wit", "人生第一次", "短语", "第一次"],
  ["ruu-suek-dteun-dten", "รู้สึกตื่นเต้น", "ruu suek dteun dten", "感到兴奋/紧张", "句型", "第一次"],
  ["yang-mai-chin", "ยังไม่ชิน", "yang mai chin", "还不习惯", "句型", "第一次"],
  ["mai-khoei-maa-gaawn", "ไม่เคยมาก่อน", "mai khoei maa gaawn", "以前没来过", "句型", "第一次"],
  ["mai-khoei-hen-gaawn", "ไม่เคยเห็นก่อน", "mai khoei hen gaawn", "以前没见过", "句型", "第一次"],
  ["bprasopgaan-raek", "ประสบการณ์แรก", "bpra-sop-gaan raaek", "第一次经历", "名词", "第一次"],
  ["muea-gaawn", "เมื่อก่อน", "muea gaawn", "以前", "副词", "以前"],
  ["dtae-gaawn", "แต่ก่อน", "dtae gaawn", "从前；以前", "副词", "以前"],
  ["nai-adiit", "ในอดีต", "nai a-diit", "在过去", "短语", "以前"],
  ["samai-gaawn", "สมัยก่อน", "sa-mai gaawn", "以前的时代；从前", "名词", "以前"],
  ["muea-song-bpii-gaawn", "เมื่อสองปีก่อน", "muea saawng bpii gaawn", "两年前", "短语", "以前"],
  ["muea-deuan-gaawn", "เมื่อเดือนก่อน", "muea duean gaawn", "上个月", "短语", "以前"],
  ["muea-aathit-gaawn", "เมื่ออาทิตย์ก่อน", "muea aa-thit gaawn", "上周", "短语", "以前"],
  ["dtaawn-nan", "ตอนนั้น", "dtaawn nan", "那时候", "副词", "以前"],
  ["yang-dek", "ยังเด็ก", "yang dek", "还小的时候", "短语", "以前"],
  ["muea-yuu-thii-baan-gao", "เมื่ออยู่ที่บ้านเก่า", "muea yuu thii baan gao", "住在旧家时", "句型", "以前"],
  ["chawng-nii", "ช่วงนี้", "chuang nii", "最近这段时间", "副词", "最近"],
  ["rew-rew-nii", "เร็ว ๆ นี้", "reo reo nii", "近期；很快", "副词", "最近"],
  ["phak-nii", "พักนี้", "phak nii", "最近这阵子", "副词", "最近"],
  ["mai-naan-maa-nii", "ไม่นานมานี้", "mai naan maa nii", "不久前", "短语", "最近"],
  ["phroeng", "เพิ่ง", "phoeng", "刚刚才", "副词", "最近"],
  ["phroeng-ja", "เพิ่งจะ", "phoeng ja", "刚要；才刚", "副词", "最近"],
  ["phroeng-bplian", "เพิ่งเปลี่ยน", "phoeng bpliian", "刚改变", "动词", "最近"],
  ["phroeng-rian", "เพิ่งเรียน", "phoeng rian", "刚学", "动词", "最近"],
  ["phroeng-bpai", "เพิ่งไป", "phoeng bpai", "刚去过", "动词", "最近"],
  ["phroeng-ruu", "เพิ่งรู้", "phoeng ruu", "刚知道", "动词", "最近"],
  ["bplian-ni-sai", "เปลี่ยนนิสัย", "bpliian ni-sai", "改变习惯", "动词", "习惯变化"],
  ["bprap-dtua", "ปรับตัว", "bprap dtua", "适应；调整自己", "动词", "习惯变化"],
  ["khoei-chin", "เคยชิน", "khoei chin", "习惯了", "动词", "习惯变化"],
  ["mai-khoei-chin", "ไม่เคยชิน", "mai khoei chin", "不习惯", "句型", "习惯变化"],
  ["roem-tham", "เริ่มทำ", "roem tham", "开始做", "动词", "习惯变化"],
  ["loek-tham", "เลิกทำ", "loek tham", "停止做；不再做", "动词", "习惯变化"],
  ["tham-bpen-bpra-jam", "ทำเป็นประจำ", "tham bpen bpra-jam", "经常固定做", "短语", "习惯变化"],
  ["mai-khoi-tham-laew", "ไม่ค่อยทำแล้ว", "mai khoi tham laew", "已经不太做了", "句型", "习惯变化"],
  ["tham-bpen-ni-sai", "ทำเป็นนิสัย", "tham bpen ni-sai", "养成习惯", "短语", "习惯变化"],
  ["di-khuen-gwaa-doem", "ดีขึ้นกว่าเดิม", "dii khuen gwaa doem", "比以前更好了", "句型", "习惯变化"],
];

const relatedByTheme: Record<
  PersonalHistoryExperienceTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  出生: {
    synonym: "บ้านเกิด / baan goet / 家乡、出生地",
    antonym: "ที่อยู่ตอนนี้ / thii yuu dtaawn nii / 现在住处",
    comparison: "เกิดที่ 说出生地点，มาจาก 说来自哪里，不一定是出生地。",
    collocation: "เกิดที่กรุงเทพฯ / goet thii grung-theep / 出生在曼谷",
  },
  长大: {
    synonym: "โตที่ / dtoo thii / 在……长大",
    antonym: "ตอนเด็ก / dtaawn dek / 小时候",
    comparison: "โต 是长大，โตมาใน 更强调成长环境。",
    collocation: "โตมากับครอบครัว / dtoo maa gap khraawp khrua / 和家人一起长大",
  },
  搬家: {
    synonym: "ย้ายบ้าน / yaai baan / 搬家",
    antonym: "อยู่ที่เดิม / yuu thii doem / 住在原处",
    comparison: "ย้ายมา 是搬来，ย้ายไป 是搬去，方向不同。",
    collocation: "ย้ายมาที่นี่เมื่อปีที่แล้ว / yaai maa thii nii muea bpii thii laew / 去年搬来这里",
  },
  学过: {
    synonym: "เคยเรียน / khoei rian / 学过",
    antonym: "ไม่เคยเรียน / mai khoei rian / 没学过",
    comparison: "เคย + 动词 表示过去有过经验；เรียนแล้ว 只是已经学了。",
    collocation: "เคยเรียนภาษาไทยนิดหน่อย / khoei rian phaa-saa thai nit noi / 学过一点泰语",
  },
  去过: {
    synonym: "เคยไป / khoei bpai / 去过",
    antonym: "ไม่เคยไป / mai khoei bpai / 没去过",
    comparison: "ไปมาแล้ว 强调已经去过回来；เคยไป 强调有这个经历。",
    collocation: "เคยไปเชียงใหม่สองครั้ง / khoei bpai chiang mai saawng khrang / 去过清迈两次",
  },
  做过: {
    synonym: "เคยทำ / khoei tham / 做过",
    antonym: "ไม่เคยทำ / mai khoei tham / 没做过",
    comparison: "ทำเป็น 是会做，เคยทำ 是做过，不一定现在熟练。",
    collocation: "เคยทำงานร้านอาหาร / khoei tham ngaan raan aa-haan / 在餐厅工作过",
  },
  第一次: {
    synonym: "ครั้งแรก / khrang raaek / 第一次",
    antonym: "หลายครั้ง / laai khrang / 很多次",
    comparison: "ครั้งแรก 是第一次，ครั้งเดียว 是只有一次。",
    collocation: "เป็นครั้งแรกในชีวิต / bpen khrang raaek nai chii-wit / 人生第一次",
  },
  以前: {
    synonym: "เมื่อก่อน / muea gaawn / 以前",
    antonym: "ตอนนี้ / dtaawn nii / 现在",
    comparison: "เมื่อก่อน 说过去习惯或状态，ตอนนั้น 指某个具体时候。",
    collocation: "เมื่อก่อนฉันอยู่บ้านเก่า / muea gaawn chan yuu baan gao / 以前我住在旧家",
  },
  最近: {
    synonym: "ช่วงนี้ / chuang nii / 最近这段时间",
    antonym: "เมื่อก่อน / muea gaawn / 以前",
    comparison: "เพิ่ง 表示刚刚才，ช่วงนี้ 表示最近一段时间。",
    collocation: "ช่วงนี้เพิ่งเริ่มเรียน / chuang nii phoeng roem rian / 最近刚开始学习",
  },
  习惯变化: {
    synonym: "เปลี่ยนนิสัย / bpliian ni-sai / 改变习惯",
    antonym: "ทำเหมือนเดิม / tham muean doem / 像以前一样做",
    comparison: "เคยชิน 是已经习惯，ปรับตัว 是为了适应而调整。",
    collocation: "เริ่มทำเป็นประจำ / roem tham bpen bpra-jam / 开始经常固定做",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ตอนเล่าเรื่องชีวิตของตัวเอง ฉันใช้คำว่า “${row[1]}” เพื่อบอกประสบการณ์ เวลา หรือการเปลี่ยนแปลงง่าย ๆ`,
  roman: `dtaawn lao rueang chii-wit khaawng dtua eng chan chai kham waa "${row[2]}" phuea baawk bpra-sop-gaan we-laa rue gaan bpliian-bplaeng ngaai ngaai`,
  chinese: `讲自己的生活经历时，我会用“${row[1]}”来说明经历、时间或简单变化。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "个人经历", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 个人经历表达。适合说明出生、成长、搬家、学过、去过、做过、第一次、以前、最近和习惯变化；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: PERSONAL_HISTORY_EXPERIENCE_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_PERSONAL_HISTORY_EXPERIENCE_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
