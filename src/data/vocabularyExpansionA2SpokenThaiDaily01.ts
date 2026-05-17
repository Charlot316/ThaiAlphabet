export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "省略表达" | "简短回应" | "确认" | "惊讶" | "轻微抱怨" | "亲切语气";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Phrase = { thai: string; id: string; roman: string; chinese: string; theme: VocabularyExpansionTheme; tag: string };
type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };

const SPOKEN_THAI_DAILY_REFS = ["thai-frequency", "thai-a2-spoken-thai-daily-candidate"];

const spokenPhrases: readonly Phrase[] = [
  { thai: "จริงเหรอเนี่ย", id: "jing-rooe-niia", roman: "jing rooe niia", chinese: "真的吗，这样啊", theme: "惊讶", tag: "惊讶" },
  { thai: "อ้าว อย่างนั้นเหรอ", id: "aao-yaang-nan-rooe", roman: "aao yaang nan rooe", chinese: "啊，是那样吗", theme: "惊讶", tag: "惊讶" },
  { thai: "ใช่ไหมล่ะ", id: "chai-mai-la", roman: "chai mai la", chinese: "是吧/对吧", theme: "确认", tag: "确认" },
  { thai: "ประมาณนั้นแหละ", id: "bpra-maan-nan-lae", roman: "bpra-maan nan lae", chinese: "差不多就是那样", theme: "省略表达", tag: "省略" },
  { thai: "เอางั้นก็ได้", id: "ao-ngan-gaaw-dai", roman: "ao ngan gaaw dai", chinese: "那样也可以", theme: "简短回应", tag: "回应" },
  { thai: "ก็โอเคอยู่นะ", id: "gaaw-oo-khee-yuu-na", roman: "gaaw oo-khee yuu na", chinese: "也还可以啦", theme: "简短回应", tag: "回应" },
  { thai: "เดี๋ยวนะ แป๊บนึง", id: "diaao-na-bpaep-neung", roman: "diaao na bpaep neung", chinese: "等一下，就一会儿", theme: "亲切语气", tag: "缓冲" },
  { thai: "ไม่เป็นไรหรอก", id: "mai-bpen-rai-raawk", roman: "mai bpen rai raawk", chinese: "没关系啦", theme: "亲切语气", tag: "安慰" },
  { thai: "นิดหน่อยเอง", id: "nit-naawy-eeng", roman: "nit naawy eeng", chinese: "只是一点点而已", theme: "省略表达", tag: "省略" },
  { thai: "พอได้อยู่", id: "phaaw-dai-yuu", roman: "phaaw dai yuu", chinese: "还算可以", theme: "简短回应", tag: "评价" },
  { thai: "เหนื่อยนิดหน่อย", id: "neuueai-nit-naawy", roman: "neuueai nit naawy", chinese: "有点累", theme: "轻微抱怨", tag: "抱怨" },
  { thai: "ทำไมเป็นแบบนี้นะ", id: "tham-mai-bpen-baaep-nii-na", roman: "tham-mai bpen baaep nii na", chinese: "怎么会这样呢", theme: "轻微抱怨", tag: "抱怨" },
  { thai: "ไม่ค่อยแน่ใจนะ", id: "mai-khaawy-naae-jai-na", roman: "mai khaawy naae-jai na", chinese: "不太确定呢", theme: "确认", tag: "不确定" },
  { thai: "ลองดูก่อนก็ได้", id: "laawng-duu-gaawn-gaaw-dai", roman: "laawng duu gaawn gaaw dai", chinese: "可以先试试看", theme: "简短回应", tag: "建议" },
  { thai: "ฟังดูดีนะ", id: "fang-duu-dii-na", roman: "fang duu dii na", chinese: "听起来不错", theme: "亲切语气", tag: "回应" },
  { thai: "โอเค ตามนั้นนะ", id: "oo-khee-dtaam-nan-na", roman: "oo-khee dtaam nan na", chinese: "好，就按那样吧", theme: "确认", tag: "确认" },
];

const directRows: readonly Definition[] = [
  { thai: "ตอบสั้นๆ ว่าใช่เลย", id: "dtaawp-san-san-waa-chai-looei", roman: "dtaawp san san waa chai looei", chinese: "简短回答“正是”", partOfSpeech: "短语", theme: "简短回应", exampleThai: "ถ้าเห็นด้วย ก็ตอบสั้นๆ ว่าใช่เลยได้", exampleRoman: "thaa hen duuai, gaaw dtaawp san san waa chai looei dai", exampleChinese: "如果同意，可以简短回答“正是”。", tag: "回应" },
  { thai: "พูดเบาๆ ว่าไม่เป็นไร", id: "phuut-bao-bao-waa-mai-bpen-rai", roman: "phuut bao bao waa mai bpen rai", chinese: "轻声说“没关系”", partOfSpeech: "短语", theme: "亲切语气", exampleThai: "เพื่อนขอโทษ ฉันพูดเบาๆ ว่าไม่เป็นไร", exampleRoman: "pheuuan khaaw-thoot, chan phuut bao bao waa mai bpen rai", exampleChinese: "朋友道歉，我轻声说“没关系”。", tag: "安慰" },
  { thai: "ถามกลับว่าแน่ใจไหม", id: "thaam-glap-waa-naae-jai-mai", roman: "thaam glap waa naae-jai mai", chinese: "反问“确定吗”", partOfSpeech: "短语", theme: "确认", exampleThai: "ถ้าข้อมูลดูแปลก ฉันถามกลับว่าแน่ใจไหม", exampleRoman: "thaa khaaw-muun duu bplaaek, chan thaam glap waa naae-jai mai", exampleChinese: "如果信息看起来奇怪，我会反问“确定吗”。", tag: "确认" },
  { thai: "บ่นนิดเดียวว่าเหนื่อยจัง", id: "bon-nit-diaao-waa-neuueai-jang", roman: "bon nit diaao waa neuueai jang", chinese: "轻轻抱怨“好累啊”", partOfSpeech: "短语", theme: "轻微抱怨", exampleThai: "หลังเลิกงาน ฉันบ่นนิดเดียวว่าเหนื่อยจัง", exampleRoman: "lang loeek-ngaan, chan bon nit diaao waa neuueai jang", exampleChinese: "下班后，我轻轻抱怨“好累啊”。", tag: "抱怨" },
  { thai: "พูดเล่นๆ ว่าเอาอีกแล้ว", id: "phuut-len-len-waa-ao-iik-laaeo", roman: "phuut len len waa ao iik laaeo", chinese: "开玩笑说“又来了”", partOfSpeech: "短语", theme: "轻微抱怨", exampleThai: "รถติดอีกแล้ว ฉันพูดเล่นๆ ว่าเอาอีกแล้ว", exampleRoman: "rot dtit iik laaeo, chan phuut len len waa ao iik laaeo", exampleChinese: "又堵车了，我开玩笑说“又来了”。", tag: "抱怨" },
  { thai: "ตอบรับแบบกันเอง", id: "dtaawp-rap-baaep-gan-eeng", roman: "dtaawp rap baaep gan eeng", chinese: "用熟人间的方式回应", partOfSpeech: "短语", theme: "亲切语气", exampleThai: "คุยกับเพื่อนสนิท ฉันตอบรับแบบกันเองได้", exampleRoman: "khui gap pheuuan sa-nit, chan dtaawp rap baaep gan eeng dai", exampleChinese: "和好朋友聊天时，我可以用熟人间的方式回应。", tag: "口语" },
  { thai: "ละคำที่เข้าใจกันอยู่แล้ว", id: "la-kham-thii-khao-jai-gan-yuu-laaeo", roman: "la kham thii khao-jai gan yuu laaeo", chinese: "省略彼此已经明白的词", partOfSpeech: "短语", theme: "省略表达", exampleThai: "ในภาษาพูด เรามักละคำที่เข้าใจกันอยู่แล้ว", exampleRoman: "nai phaa-saa phuut, rao mak la kham thii khao-jai gan yuu laaeo", exampleChinese: "在口语里，我们常省略彼此已经明白的词。", tag: "省略" },
  { thai: "เติมนะให้ฟังนุ่มขึ้น", id: "dtoem-na-hai-fang-num-kheun", roman: "dtoem na hai fang num kheun", chinese: "加นะ让语气听起来更柔和", partOfSpeech: "短语", theme: "亲切语气", exampleThai: "ถ้าขอความช่วยเหลือ เติมนะให้ฟังนุ่มขึ้น", exampleRoman: "thaa khaaw khwaam chuai-leuuea, dtoem na hai fang num kheun", exampleChinese: "请求帮助时，加นะ会让语气听起来更柔和。", tag: "语气" },
];

const sayRows = spokenPhrases.map((phrase): Definition => ({
  thai: `พูดว่า${phrase.thai}กับเพื่อน`,
  id: `phuut-waa-${phrase.id}-gap-pheuuan`,
  roman: `phuut waa ${phrase.roman} gap pheuuan`,
  chinese: `和朋友说“${phrase.chinese}”`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `เวลาคุยกันสบายๆ ฉันพูดว่า${phrase.thai}กับเพื่อนได้`,
  exampleRoman: `wee-laa khui gan sa-baai sa-baai, chan phuut waa ${phrase.roman} gap pheuuan dai`,
  exampleChinese: `轻松聊天时，我可以和朋友说“${phrase.chinese}”。`,
  tag: phrase.tag,
}));

const replyRows = spokenPhrases.map((phrase): Definition => ({
  thai: `ตอบกลับสั้นๆ ว่า${phrase.thai}`,
  id: `dtaawp-glap-san-san-waa-${phrase.id}`,
  roman: `dtaawp glap san san waa ${phrase.roman}`,
  chinese: `简短回复“${phrase.chinese}”`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `ถ้าเป็นบทสนทนาง่ายๆ เธอตอบกลับสั้นๆ ว่า${phrase.thai}ได้`,
  exampleRoman: `thaa bpen bot-son-tha-naa ngaai ngaai, thooe dtaawp glap san san waa ${phrase.roman} dai`,
  exampleChinese: `如果是简单对话，她可以简短回复“${phrase.chinese}”。`,
  tag: phrase.tag,
}));

const messageRows = spokenPhrases.map((phrase): Definition => ({
  thai: `พิมพ์${phrase.thai}ในข้อความ`,
  id: `phim-${phrase.id}-nai-khaaw-khwaam`,
  roman: `phim ${phrase.roman} nai khaaw-khwaam`,
  chinese: `在消息里写“${phrase.chinese}”`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `ถ้าไม่โทรหาเพื่อน ฉันพิมพ์${phrase.thai}ในข้อความ`,
  exampleRoman: `thaa mai thoo haa pheuuan, chan phim ${phrase.roman} nai khaaw-khwaam`,
  exampleChinese: `如果不打电话给朋友，我会在消息里写“${phrase.chinese}”。`,
  tag: phrase.tag,
}));

const friendlyRows = spokenPhrases.map((phrase): Definition => ({
  thai: `ใช้${phrase.thai}ให้ฟังเป็นกันเอง`,
  id: `chai-${phrase.id}-hai-fang-bpen-gan-eeng`,
  roman: `chai ${phrase.roman} hai fang bpen gan eeng`,
  chinese: `用“${phrase.chinese}”让语气听起来亲切`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `ประโยคนี้ไม่แข็งเกินไป ใช้${phrase.thai}ให้ฟังเป็นกันเองได้`,
  exampleRoman: `bpra-yook nii mai khaeng goen bpai, chai ${phrase.roman} hai fang bpen gan eeng dai`,
  exampleChinese: `这句话不太生硬，可以用“${phrase.chinese}”让语气听起来亲切。`,
  tag: phrase.tag,
}));

const confirmRows = spokenPhrases.map((phrase): Definition => ({
  thai: `ฝึกฟังคำว่า${phrase.thai}`,
  id: `feuk-fang-kham-waa-${phrase.id}`,
  roman: `feuk fang kham waa ${phrase.roman}`,
  chinese: `练习听懂“${phrase.chinese}”`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `ผู้เรียนควรฝึกฟังคำว่า${phrase.thai}ในบทสนทนาสั้นๆ`,
  exampleRoman: `phuu-riian khuuan feuk fang kham waa ${phrase.roman} nai bot-son-tha-naa san san`,
  exampleChinese: `学习者应该在短对话中练习听懂“${phrase.chinese}”。`,
  tag: phrase.tag,
}));

const compareRows = spokenPhrases.map((phrase): Definition => ({
  thai: `เลือกใช้${phrase.thai}ตามความสนิท`,
  id: `leuuak-chai-${phrase.id}-dtaam-khwaam-sa-nit`,
  roman: `leuuak chai ${phrase.roman} dtaam khwaam sa-nit`,
  chinese: `按熟悉程度选择使用“${phrase.chinese}”`,
  partOfSpeech: "短语",
  theme: phrase.theme,
  exampleThai: `เวลาคุยกับคนต่างกัน เราเลือกใช้${phrase.thai}ตามความสนิท`,
  exampleRoman: `wee-laa khui gap khon dtaang gan, rao leuuak chai ${phrase.roman} dtaam khwaam sa-nit`,
  exampleChinese: `和不同的人说话时，我们按熟悉程度选择使用“${phrase.chinese}”。`,
  tag: phrase.tag,
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...sayRows,
  ...replyRows,
  ...messageRows,
  ...friendlyRows,
  ...confirmRows,
  ...compareRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const comparisons: VocabularyExpansionComparison[] = [{ kind: "用法", target: { thai: "ครับ/ค่ะ", roman: "khrap/kha", chinese: "礼貌句尾" }, distinctionZh: "口语自然表达和礼貌句尾可以一起用；对陌生人或服务人员说话时，加ครับ/ค่ะ更稳妥。" }];
  const tags = ["a2", "日常口语", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons, collocations, usageNotesZh: ["A2 口语表达强调自然、简短和可直接回应；熟人之间可更随意，正式场合要加礼貌句尾。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons,
    collocations,
    usageNotesZh: ["用于朋友聊天、简短回应、确认、惊讶、轻微抱怨和亲切语气。"],
    tags,
    sourceRefs: SPOKEN_THAI_DAILY_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SPOKEN_THAI_DAILY_01 = rows.map(toCandidate);
