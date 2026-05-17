export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "因为所以" | "导致结果" | "原因" | "影响" | "来不及赶不上" | "解决后果";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Situation = { thai: string; roman: string; chinese: string; id: string; resultThai: string; resultRoman: string; resultChinese: string };

const EVERYDAY_CAUSE_RESULT_REFS = ["thai-frequency", "thai-a2-everyday-cause-result-candidate"];

const situations: readonly Situation[] = [
  { thai: "ฝนตกหนัก", roman: "fon dtok nak", chinese: "雨下得很大", id: "fon-dtok-nak", resultThai: "ถนนรถติด", resultRoman: "tha-non rot dtit", resultChinese: "路上堵车" },
  { thai: "ตื่นสาย", roman: "dteuun saai", chinese: "起晚了", id: "dteuun-saai", resultThai: "ไปเรียนไม่ทัน", resultRoman: "bpai riian mai than", resultChinese: "赶不上上课" },
  { thai: "ลืมตั้งนาฬิกา", roman: "leum dtang naa-li-gaa", chinese: "忘了设闹钟", id: "leum-dtang-naa-li-gaa", resultThai: "ตื่นไม่ทัน", resultRoman: "dteuun mai than", resultChinese: "没能及时起床" },
  { thai: "รถเมล์มาช้า", roman: "rot-mee maa chaa", chinese: "公交车来得慢", id: "rot-mee-maa-chaa", resultThai: "ถึงที่นัดช้า", resultRoman: "theung thii nat chaa", resultChinese: "到约定地点晚了" },
  { thai: "ลืมเอาร่มมา", roman: "leum ao rom maa", chinese: "忘了带伞", id: "leum-ao-rom-maa", resultThai: "เสื้อเปียก", resultRoman: "seua bpiiak", resultChinese: "衣服湿了" },
  { thai: "กินข้าวน้อย", roman: "gin khaao naawy", chinese: "饭吃得少", id: "gin-khaao-naawy", resultThai: "หิวเร็ว", resultRoman: "hiu reo", resultChinese: "很快饿了" },
  { thai: "นอนดึก", roman: "naawn deuk", chinese: "睡得晚", id: "naawn-deuk", resultThai: "ง่วงทั้งวัน", resultRoman: "nguang thang wan", resultChinese: "一整天犯困" },
  { thai: "ดื่มน้ำน้อย", roman: "deum naam naawy", chinese: "水喝得少", id: "deum-naam-naawy", resultThai: "คอแห้ง", resultRoman: "khaaw haaeng", resultChinese: "嗓子干" },
  { thai: "ไม่อ่านป้าย", roman: "mai aan bpaai", chinese: "没看告示牌", id: "mai-aan-bpaai", resultThai: "เดินผิดทาง", resultRoman: "doeen phit thaang", resultChinese: "走错路" },
  { thai: "จำวันผิด", roman: "jam wan phit", chinese: "记错日期", id: "jam-wan-phit", resultThai: "มาผิดวัน", resultRoman: "maa phit wan", resultChinese: "来错日子" },
  { thai: "โทรศัพท์แบตหมด", roman: "thoo-ra-sap baet mot", chinese: "手机没电", id: "thoo-ra-sap-baet-mot", resultThai: "ติดต่อไม่ได้", resultRoman: "dtit-dtaaw mai dai", resultChinese: "联系不上" },
  { thai: "อินเทอร์เน็ตช้า", roman: "in-thoe-net chaa", chinese: "网络慢", id: "in-thoe-net-chaa", resultThai: "ส่งรูปไม่ได้", resultRoman: "song ruup mai dai", resultChinese: "发不了照片" },
  { thai: "ซื้อของเยอะ", roman: "seu khaawng yoe", chinese: "买的东西多", id: "seu-khaawng-yoe", resultThai: "ถือไม่ไหว", resultRoman: "theuu mai wai", resultChinese: "拿不动" },
  { thai: "ไม่ได้จองโต๊ะ", roman: "mai dai jaawng dto", chinese: "没有订桌", id: "mai-dai-jaawng-dto", resultThai: "ต้องรอนาน", resultRoman: "dtawng raaw naan", resultChinese: "要等很久" },
  { thai: "ออกจากบ้านช้า", roman: "aawk jaak baan chaa", chinese: "出门晚", id: "aawk-jaak-baan-chaa", resultThai: "ไม่ทันรถไฟ", resultRoman: "mai than rot-fai", resultChinese: "赶不上火车" },
  { thai: "ลืมเอาบัตรมา", roman: "leum ao bat maa", chinese: "忘了带卡", id: "leum-ao-bat-maa", resultThai: "เข้าไม่ได้", resultRoman: "khao mai dai", resultChinese: "进不去" },
];

const directRows: readonly Definition[] = [
  { thai: "เพราะอย่างนี้เอง", id: "phraw-yaang-nii-eeng", roman: "phraw yaang nii eeng", chinese: "原来是因为这样", partOfSpeech: "短语", theme: "原因", exampleThai: "อ๋อ เพราะอย่างนี้เอง ฉันถึงไม่เข้าใจ", exampleRoman: "aaw, phraw yaang nii eeng, chan theung mai khao-jai", exampleChinese: "哦，原来是因为这样，我才不明白。", tag: "原因" },
  { thai: "ก็เลยเป็นแบบนี้", id: "gaaw-looei-bpen-baaep-nii", roman: "gaaw looei bpen baaep nii", chinese: "所以就变成这样", partOfSpeech: "短语", theme: "导致结果", exampleThai: "เรารีบเกินไป ก็เลยเป็นแบบนี้", exampleRoman: "rao riip goen bpai, gaaw looei bpen baaep nii", exampleChinese: "我们太着急了，所以就变成这样。", tag: "结果" },
  { thai: "สาเหตุหลักคืออะไร", id: "saa-heet-lak-kheuu-a-rai", roman: "saa-heet lak kheuu a-rai", chinese: "主要原因是什么", partOfSpeech: "短语", theme: "原因", exampleThai: "ถ้าอยากแก้ปัญหา ต้องรู้ว่าสาเหตุหลักคืออะไร", exampleRoman: "thaa yaak gaae bpan-haa, dtawng ruu waa saa-heet lak kheuu a-rai", exampleChinese: "如果想解决问题，就要知道主要原因是什么。", tag: "原因" },
  { thai: "มีผลกับแผนวันนี้", id: "mii-phon-gap-phaaen-wan-nii", roman: "mii phon gap phaaen wan-nii", chinese: "对今天的计划有影响", partOfSpeech: "短语", theme: "影响", exampleThai: "ฝนตกนาน มีผลกับแผนวันนี้แน่นอน", exampleRoman: "fon dtok naan, mii phon gap phaaen wan-nii naae-naawn", exampleChinese: "雨下很久，肯定对今天的计划有影响。", tag: "影响" },
  { thai: "แก้แล้วก็จบ", id: "gaae-laaeo-gaaw-jop", roman: "gaae laaeo gaaw jop", chinese: "解决了就结束", partOfSpeech: "短语", theme: "解决后果", exampleThai: "เรื่องนี้ไม่ใหญ่ แก้แล้วก็จบ", exampleRoman: "reuuang nii mai yai, gaae laaeo gaaw jop", exampleChinese: "这件事不大，解决了就结束。", tag: "解决" },
  { thai: "ต้องรับผลที่ตามมา", id: "dtawng-rap-phon-thii-dtaam-maa", roman: "dtawng rap phon thii dtaam maa", chinese: "必须接受后果", partOfSpeech: "短语", theme: "解决后果", exampleThai: "ถ้าเราตัดสินใจแล้ว ก็ต้องรับผลที่ตามมา", exampleRoman: "thaa rao dtat-sin-jai laaeo, gaaw dtawng rap phon thii dtaam maa", exampleChinese: "如果我们已经决定了，就必须接受后果。", tag: "后果" },
  { thai: "มาไม่ทันจริงๆ", id: "maa-mai-than-jing-jing", roman: "maa mai than jing jing", chinese: "真的来不及到", partOfSpeech: "短语", theme: "来不及赶不上", exampleThai: "รถติดมาก ฉันมาไม่ทันจริงๆ", exampleRoman: "rot dtit maak, chan maa mai than jing jing", exampleChinese: "堵车很严重，我真的来不及到。", tag: "来不及" },
  { thai: "ไม่ทันรอบนี้", id: "mai-than-raawp-nii", roman: "mai than raawp nii", chinese: "赶不上这一班/这一轮", partOfSpeech: "短语", theme: "来不及赶不上", exampleThai: "ถ้าออกช้ากว่านี้ เราจะไม่ทันรอบนี้", exampleRoman: "thaa aawk chaa gwaa nii, rao ja mai than raawp nii", exampleChinese: "如果再晚出发，我们会赶不上这一班。", tag: "赶不上" },
];

const becauseRows = situations.map((situation): Definition => ({
  thai: `เพราะ${situation.thai}ก็เลย${situation.resultThai}`,
  id: `phraw-${situation.id}-gaaw-looei-${situation.resultRoman.split(" ").join("-")}`,
  roman: `phraw ${situation.roman} gaaw looei ${situation.resultRoman}`,
  chinese: `因为${situation.chinese}，所以${situation.resultChinese}`,
  partOfSpeech: "短语",
  theme: "因为所以",
  exampleThai: `วันนี้เพราะ${situation.thai}ก็เลย${situation.resultThai}`,
  exampleRoman: `wan-nii phraw ${situation.roman} gaaw looei ${situation.resultRoman}`,
  exampleChinese: `今天因为${situation.chinese}，所以${situation.resultChinese}。`,
  tag: "因为所以",
}));

const resultRows = situations.map((situation): Definition => ({
  thai: `${situation.thai}ผลคือ${situation.resultThai}`,
  id: `${situation.id}-phon-kheuu-${situation.resultRoman.split(" ").join("-")}`,
  roman: `${situation.roman} phon kheuu ${situation.resultRoman}`,
  chinese: `${situation.chinese}，结果是${situation.resultChinese}`,
  partOfSpeech: "短语",
  theme: "导致结果",
  exampleThai: `${situation.thai} ผลคือ${situation.resultThai}`,
  exampleRoman: `${situation.roman}, phon kheuu ${situation.resultRoman}`,
  exampleChinese: `${situation.chinese}，结果是${situation.resultChinese}。`,
  tag: "结果",
}));

const causeRows = situations.map((situation): Definition => ({
  thai: `สาเหตุคือ${situation.thai}`,
  id: `saa-heet-kheuu-${situation.id}`,
  roman: `saa-heet kheuu ${situation.roman}`,
  chinese: `原因是${situation.chinese}`,
  partOfSpeech: "短语",
  theme: "原因",
  exampleThai: `เราเข้าใจแล้วว่าสาเหตุคือ${situation.thai}`,
  exampleRoman: `rao khao-jai laaeo waa saa-heet kheuu ${situation.roman}`,
  exampleChinese: `我们明白了，原因是${situation.chinese}。`,
  tag: "原因",
}));

const affectRows = situations.map((situation): Definition => ({
  thai: `${situation.thai}มีผลต่อวันนี้`,
  id: `${situation.id}-mii-phon-dtaaw-wan-nii`,
  roman: `${situation.roman} mii phon dtaaw wan-nii`,
  chinese: `${situation.chinese}对今天有影响`,
  partOfSpeech: "短语",
  theme: "影响",
  exampleThai: `${situation.thai}มีผลต่อวันนี้ เราอาจต้องเปลี่ยนแผน`,
  exampleRoman: `${situation.roman} mii phon dtaaw wan-nii, rao aat dtawng bpliian phaaen`,
  exampleChinese: `${situation.chinese}对今天有影响，我们可能要改变计划。`,
  tag: "影响",
}));

const tooLateRows = situations.map((situation): Definition => ({
  thai: `${situation.thai}เลยไม่ทัน`,
  id: `${situation.id}-looei-mai-than`,
  roman: `${situation.roman} looei mai than`,
  chinese: `因为${situation.chinese}所以来不及/赶不上`,
  partOfSpeech: "短语",
  theme: "来不及赶不上",
  exampleThai: `เมื่อเช้า${situation.thai}เลยไม่ทันตามแผน`,
  exampleRoman: `meuua chaao ${situation.roman} looei mai than dtaam phaaen`,
  exampleChinese: `今天早上因为${situation.chinese}，所以没能按计划赶上。`,
  tag: "来不及",
}));

const solveRows = situations.map((situation): Definition => ({
  thai: `แก้ปัญหาเรื่อง${situation.resultThai}`,
  id: `gaae-bpan-haa-reuuang-${situation.resultRoman.split(" ").join("-")}`,
  roman: `gaae bpan-haa reuuang ${situation.resultRoman}`,
  chinese: `解决${situation.resultChinese}的问题`,
  partOfSpeech: "短语",
  theme: "解决后果",
  exampleThai: `หลังจากรู้สาเหตุ เราช่วยกันแก้ปัญหาเรื่อง${situation.resultThai}`,
  exampleRoman: `lang jaak ruu saa-heet, rao chuai gan gaae bpan-haa reuuang ${situation.resultRoman}`,
  exampleChinese: `知道原因后，我们一起解决${situation.resultChinese}的问题。`,
  tag: "解决",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...becauseRows,
  ...resultRows,
  ...causeRows,
  ...affectRows,
  ...tooLateRows,
  ...solveRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "日常因果", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 因果表达常用“เพราะ...ก็เลย...、ผลคือ、สาเหตุคือ、มีผลต่อ、ไม่ทัน、แก้ปัญหาเรื่อง...”连接日常原因和结果。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于说明因为、所以、导致、结果、原因、影响、来不及、赶不上和解决后果。"],
    tags,
    sourceRefs: EVERYDAY_CAUSE_RESULT_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_CAUSE_RESULT_01 = rows.map(toCandidate);
