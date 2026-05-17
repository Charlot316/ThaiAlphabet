export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "担心" | "放心" | "失望" | "满意" | "奇怪" | "正常" | "麻烦" | "值得" | "可惜" | "随便" | "看法";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Topic = { thai: string; roman: string; chinese: string; id: string };

const FEELINGS_OPINIONS_NUANCE_REFS = ["thai-frequency", "thai-a2-feelings-opinions-nuance-candidate"];

const topics: readonly Topic[] = [
  { thai: "เรื่องสอบพรุ่งนี้", roman: "rueang saawp phrung-nii", chinese: "明天考试的事", id: "rueang-saawp-phrung-nii" },
  { thai: "สุขภาพของแม่", roman: "suk-kha-phaap khaawng maae", chinese: "妈妈的健康", id: "suk-kha-phaap-khaawng-maae" },
  { thai: "งานที่ยังไม่เสร็จ", roman: "ngaan thii yang mai set", chinese: "还没完成的工作", id: "ngaan-thii-yang-mai-set" },
  { thai: "เงินที่ต้องจ่าย", roman: "ngoen thii dtawng jaai", chinese: "要付的钱", id: "ngoen-thii-dtawng-jaai" },
  { thai: "อากาศวันเดินทาง", roman: "aa-gaat wan doen-thaang", chinese: "出行那天的天气", id: "aa-gaat-wan-doen-thaang" },
  { thai: "ห้องพักคืนนี้", roman: "haawng-phak kheun-nii", chinese: "今晚的房间", id: "haawng-phak-kheun-nii" },
  { thai: "อาหารจานนี้", roman: "aa-haan jaan nii", chinese: "这道菜", id: "aa-haan-jaan-nii" },
  { thai: "บริการของร้าน", roman: "baw-ri-gaan khaawng raan", chinese: "店里的服务", id: "baw-ri-gaan-khaawng-raan" },
  { thai: "ราคาตั๋ว", roman: "raa-khaa dtua", chinese: "票价", id: "raa-khaa-dtua" },
  { thai: "คำตอบของเพื่อน", roman: "kham-dtaawp khaawng phuean", chinese: "朋友的回答", id: "kham-dtaawp-khaawng-phuean" },
  { thai: "เสียงจากห้องข้าง ๆ", roman: "siiang jaak haawng khaang khaang", chinese: "隔壁房间的声音", id: "siiang-jaak-haawng-khaang-khaang" },
  { thai: "ผลสอบครั้งนี้", roman: "phon saawp khrang nii", chinese: "这次考试结果", id: "phon-saawp-khrang-nii" },
  { thai: "แผนวันเสาร์", roman: "phaaen wan sao", chinese: "周六计划", id: "phaaen-wan-sao" },
  { thai: "ของที่ซื้อมา", roman: "khaawng thii seu maa", chinese: "买来的东西", id: "khaawng-thii-seu-maa" },
  { thai: "การรอคิวนาน", roman: "gaan raaw khiu naan", chinese: "排队等很久", id: "gaan-raaw-khiu-naan" },
  { thai: "ทางเลือกนี้", roman: "thaang leuuak nii", chinese: "这个选择", id: "thaang-leuuak-nii" },
  { thai: "ข้อความเมื่อเช้า", roman: "khaaw-khwaam muea-chaao", chinese: "早上的消息", id: "khaaw-khwaam-muea-chaao" },
  { thai: "รูปที่ส่งมา", roman: "ruup thii song maa", chinese: "发来的照片", id: "ruup-thii-song-maa" },
  { thai: "เรื่องที่เขาเล่า", roman: "rueang thii khao lao", chinese: "他讲的事", id: "rueang-thii-khao-lao" },
  { thai: "งานเลี้ยงเมื่อคืน", roman: "ngaan-liiang muea-kheun", chinese: "昨晚的聚会", id: "ngaan-liiang-muea-kheun" },
];

const directRows: readonly Definition[] = [
  { thai: "สบายใจขึ้นเยอะ", id: "sa-baai-jai-kheun-yoe", roman: "sa-baai jai kheun yoe", chinese: "安心多了", partOfSpeech: "短语", theme: "放心", exampleThai: "หลังได้คุยกับแม่ ฉันสบายใจขึ้นเยอะ", exampleRoman: "lang dai khui gap maae, chan sa-baai jai kheun yoe", exampleChinese: "和妈妈聊过后，我安心多了。", tag: "放心" },
  { thai: "ไม่ต้องกังวลมาก", id: "mai-dtawng-gang-won-maak", roman: "mai dtawng gang-won maak", chinese: "不用太担心", partOfSpeech: "短语", theme: "担心", exampleThai: "หมอบอกว่าไม่ต้องกังวลมาก", exampleRoman: "maaw baawk waa mai dtawng gang-won maak", exampleChinese: "医生说不用太担心。", tag: "担心" },
  { thai: "น่าเสียดายนิดหน่อย", id: "naa-sia-daai-nit-naawy", roman: "naa sia-daai nit naawy", chinese: "有点可惜", partOfSpeech: "短语", theme: "可惜", exampleThai: "เราไปไม่ทันรถ น่าเสียดายนิดหน่อย", exampleRoman: "rao bpai mai than rot, naa sia-daai nit naawy", exampleChinese: "我们没赶上车，有点可惜。", tag: "可惜" },
  { thai: "แล้วแต่คุณสะดวก", id: "laaeo-dtaae-khun-sa-duuak", roman: "laaeo dtaae khun sa-duuak", chinese: "随你方便", partOfSpeech: "短语", theme: "随便", exampleThai: "จะเจอกันกี่โมงก็ได้ แล้วแต่คุณสะดวก", exampleRoman: "ja jooe gan gii moong gaw dai, laaeo dtaae khun sa-duuak", exampleChinese: "几点见都可以，随你方便。", tag: "随便" },
  { thai: "แบบไหนก็ได้", id: "baaep-nai-gaw-dai", roman: "baaep nai gaw dai", chinese: "哪种都可以", partOfSpeech: "短语", theme: "随便", exampleThai: "ฉันไม่เรื่องมาก แบบไหนก็ได้", exampleRoman: "chan mai rueang maak, baaep nai gaw dai", exampleChinese: "我不挑，哪种都可以。", tag: "随便" },
  { thai: "คุ้มค่ากับเวลา", id: "khum-khaa-gap-wee-laa", roman: "khum khaa gap wee-laa", chinese: "值得花时间", partOfSpeech: "短语", theme: "值得", exampleThai: "คอร์สนี้คุ้มค่ากับเวลา เพราะได้ฝึกพูดเยอะ", exampleRoman: "khaawt nii khum khaa gap wee-laa, phraw dai feuk phuut yoe", exampleChinese: "这门课值得花时间，因为能大量练习说话。", tag: "值得" },
  { thai: "ไม่ค่อยคุ้มราคา", id: "mai-khaawy-khum-raa-khaa", roman: "mai khaawy khum raa-khaa", chinese: "不太值这个价格", partOfSpeech: "短语", theme: "值得", exampleThai: "อาหารจานนี้เล็กมาก ไม่ค่อยคุ้มราคา", exampleRoman: "aa-haan jaan nii lek maak, mai khaawy khum raa-khaa", exampleChinese: "这道菜很小，不太值这个价格。", tag: "值得" },
  { thai: "เป็นเรื่องปกติ", id: "bpen-rueang-bpa-ga-dti", roman: "bpen rueang bpa-ga-dti", chinese: "是正常的事", partOfSpeech: "短语", theme: "正常", exampleThai: "เรียนภาษาใหม่แล้วพูดผิดเป็นเรื่องปกติ", exampleRoman: "riian phaa-saa mai laaeo phuut phit bpen rueang bpa-ga-dti", exampleChinese: "学新语言时说错是正常的事。", tag: "正常" },
  { thai: "ดูแปลกไปนิดหนึ่ง", id: "duu-bplaaek-bpai-nit-neung", roman: "duu bplaaek bpai nit neung", chinese: "看起来有点奇怪", partOfSpeech: "短语", theme: "奇怪", exampleThai: "สีของรูปนี้ดูแปลกไปนิดหนึ่ง", exampleRoman: "sii khaawng ruup nii duu bplaaek bpai nit neung", exampleChinese: "这张照片的颜色看起来有点奇怪。", tag: "奇怪" },
  { thai: "ยุ่งยากเกินไป", id: "yung-yaak-goen-bpai", roman: "yung-yaak goen bpai", chinese: "太麻烦了", partOfSpeech: "短语", theme: "麻烦", exampleThai: "ถ้าต้องเปลี่ยนรถสามครั้ง มันยุ่งยากเกินไป", exampleRoman: "thaa dtawng bplian rot saam khrang, man yung-yaak goen bpai", exampleChinese: "如果要换三次车，那太麻烦了。", tag: "麻烦" },
];

const worryRows = topics.map((topic): Definition => ({
  thai: `ฉันกังวลเรื่อง${topic.thai}นิดหน่อย`,
  id: `chan-gang-won-rueang-${topic.id}-nit-naawy`,
  roman: `chan gang-won rueang ${topic.roman} nit naawy`,
  chinese: `我有点担心${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "担心",
  exampleThai: `วันนี้ฉันกังวลเรื่อง${topic.thai}นิดหน่อย`,
  exampleRoman: `wan-nii chan gang-won rueang ${topic.roman} nit naawy`,
  exampleChinese: `今天我有点担心${topic.chinese}。`,
  tag: "担心",
}));

const relievedRows = topics.map((topic): Definition => ({
  thai: `พอรู้เรื่อง${topic.thai}แล้วก็โล่งใจ`,
  id: `phaaw-ruu-rueang-${topic.id}-laaeo-gaw-loong-jai`,
  roman: `phaaw ruu rueang ${topic.roman} laaeo gaw loong-jai`,
  chinese: `知道${topic.chinese}后就放心了`,
  partOfSpeech: "短语",
  theme: "放心",
  exampleThai: `พอรู้เรื่อง${topic.thai}แล้วก็โล่งใจมาก`,
  exampleRoman: `phaaw ruu rueang ${topic.roman} laaeo gaw loong-jai maak`,
  exampleChinese: `知道${topic.chinese}后就很放心了。`,
  tag: "放心",
}));

const disappointedRows = topics.map((topic): Definition => ({
  thai: `ผิดหวังกับ${topic.thai}นิดหน่อย`,
  id: `phit-wang-gap-${topic.id}-nit-naawy`,
  roman: `phit-wang gap ${topic.roman} nit naawy`,
  chinese: `对${topic.chinese}有点失望`,
  partOfSpeech: "短语",
  theme: "失望",
  exampleThai: `ฉันผิดหวังกับ${topic.thai}นิดหน่อย แต่ไม่เป็นไร`,
  exampleRoman: `chan phit-wang gap ${topic.roman} nit naawy, dtaae mai bpen rai`,
  exampleChinese: `我对${topic.chinese}有点失望，但没关系。`,
  tag: "失望",
}));

const satisfiedRows = topics.map((topic): Definition => ({
  thai: `พอใจกับ${topic.thai}มาก`,
  id: `phaaw-jai-gap-${topic.id}-maak`,
  roman: `phaaw-jai gap ${topic.roman} maak`,
  chinese: `对${topic.chinese}很满意`,
  partOfSpeech: "短语",
  theme: "满意",
  exampleThai: `ครั้งนี้ฉันพอใจกับ${topic.thai}มาก`,
  exampleRoman: `khrang nii chan phaaw-jai gap ${topic.roman} maak`,
  exampleChinese: `这次我对${topic.chinese}很满意。`,
  tag: "满意",
}));

const strangeRows = topics.slice(0, 16).map((topic): Definition => ({
  thai: `${topic.thai}ฟังดูแปลกนิดหน่อย`,
  id: `${topic.id}-fang-duu-bplaaek-nit-naawy`,
  roman: `${topic.roman} fang duu bplaaek nit naawy`,
  chinese: `${topic.chinese}听起来有点奇怪`,
  partOfSpeech: "短语",
  theme: "奇怪",
  exampleThai: `สำหรับฉัน ${topic.thai}ฟังดูแปลกนิดหน่อย`,
  exampleRoman: `sam-rap chan, ${topic.roman} fang duu bplaaek nit naawy`,
  exampleChinese: `对我来说，${topic.chinese}听起来有点奇怪。`,
  tag: "奇怪",
}));

const worthRows = topics.slice(0, 16).map((topic): Definition => ({
  thai: `${topic.thai}น่าจะคุ้ม`,
  id: `${topic.id}-naa-ja-khum`,
  roman: `${topic.roman} naa ja khum`,
  chinese: `${topic.chinese}应该值得`,
  partOfSpeech: "短语",
  theme: "值得",
  exampleThai: `ถ้าไม่แพงมาก ${topic.thai}น่าจะคุ้ม`,
  exampleRoman: `thaa mai phaaeng maak, ${topic.roman} naa ja khum`,
  exampleChinese: `如果不太贵，${topic.chinese}应该值得。`,
  tag: "值得",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...worryRows,
  ...relievedRows,
  ...disappointedRows,
  ...satisfiedRows,
  ...strangeRows,
  ...worthRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "情绪看法语气", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段可用这些句块表达轻微情绪和看法，语气比单词更自然。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于担心、放心、失望、满意、奇怪、正常、麻烦、值得、可惜、随便等情绪和看法补漏。"],
    tags,
    sourceRefs: FEELINGS_OPINIONS_NUANCE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_FEELINGS_OPINIONS_NUANCE_01 = rows.map(toCandidate);
