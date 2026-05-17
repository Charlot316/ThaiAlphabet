export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "睡眠" | "喝水" | "运动" | "饮食" | "压力休息" | "检查" | "避免" | "改善保持";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Habit = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const SIMPLE_HEALTH_HABITS_REFS = ["thai-frequency", "thai-a2-simple-health-habits-candidate"];

const habits: readonly Habit[] = [
  { thai: "นอนให้พอ", roman: "naawn hai phaaw", chinese: "睡够", id: "naawn-hai-phaaw", theme: "睡眠" },
  { thai: "เข้านอนให้เป็นเวลา", roman: "khao naawn hai bpen wee-laa", chinese: "按时睡觉", id: "khao-naawn-hai-bpen-wee-laa", theme: "睡眠" },
  { thai: "ดื่มน้ำบ่อยๆ", roman: "deum naam baawy baawy", chinese: "经常喝水", id: "deum-naam-baawy-baawy", theme: "喝水" },
  { thai: "พกน้ำติดตัว", roman: "phok naam dtit dtua", chinese: "随身带水", id: "phok-naam-dtit-dtua", theme: "喝水" },
  { thai: "เดินเล่นหลังอาหาร", roman: "doeen len lang aa-haan", chinese: "饭后散步", id: "doeen-len-lang-aa-haan", theme: "运动" },
  { thai: "ออกกำลังกายเบาๆ", roman: "aawk gam-lang-gaai bao bao", chinese: "轻松运动", id: "aawk-gam-lang-gaai-bao-bao", theme: "运动" },
  { thai: "กินผักมากขึ้น", roman: "gin phak maak kheun", chinese: "多吃蔬菜", id: "gin-phak-maak-kheun", theme: "饮食" },
  { thai: "กินหวานให้น้อยลง", roman: "gin waan hai naawy long", chinese: "少吃甜食", id: "gin-waan-hai-naawy-long", theme: "饮食" },
  { thai: "พักสายตาเป็นพักๆ", roman: "phak saai-dtaa bpen phak phak", chinese: "时不时休息眼睛", id: "phak-saai-dtaa-bpen-phak-phak", theme: "压力休息" },
  { thai: "พักเมื่องานเยอะ", roman: "phak meuua ngaan yoe", chinese: "工作多时休息", id: "phak-meuua-ngaan-yoe", theme: "压力休息" },
  { thai: "ตรวจสุขภาพทุกปี", roman: "dtruaat suk-kha-phaap thuk bpii", chinese: "每年体检", id: "dtruaat-suk-kha-phaap-thuk-bpii", theme: "检查" },
  { thai: "วัดไข้เมื่อไม่สบาย", roman: "wat khai meuua mai sa-baai", chinese: "不舒服时量体温", id: "wat-khai-meuua-mai-sa-baai", theme: "检查" },
  { thai: "หลีกเลี่ยงควันบุหรี่", roman: "liik-liiang khwan bu-rii", chinese: "避免香烟烟雾", id: "liik-liiang-khwan-bu-rii", theme: "避免" },
  { thai: "หลีกเลี่ยงอาหารมัน", roman: "liik-liiang aa-haan man", chinese: "避免油腻食物", id: "liik-liiang-aa-haan-man", theme: "避免" },
  { thai: "ปรับเวลาพักผ่อน", roman: "bprap wee-laa phak-phaawn", chinese: "调整休息时间", id: "bprap-wee-laa-phak-phaawn", theme: "改善保持" },
  { thai: "รักษาสุขภาพให้ดี", roman: "rak-saa suk-kha-phaap hai dii", chinese: "保持身体健康", id: "rak-saa-suk-kha-phaap-hai-dii", theme: "改善保持" },
];

const directRows: readonly Definition[] = [
  { thai: "พักผ่อนให้เพียงพอ", id: "phak-phaawn-hai-phiiang-phaaw", roman: "phak-phaawn hai phiiang phaaw", chinese: "充分休息", partOfSpeech: "短语", theme: "压力休息", exampleThai: "ถ้าช่วงนี้เหนื่อย ควรพักผ่อนให้เพียงพอ", exampleRoman: "thaa chuuang nii neuueai, khuuan phak-phaawn hai phiiang phaaw", exampleChinese: "如果最近累，应该充分休息。", tag: "休息" },
  { thai: "ดื่มน้ำอุ่นตอนเช้า", id: "deum-naam-un-dtaawn-chaao", roman: "deum naam un dtaawn chaao", chinese: "早上喝温水", partOfSpeech: "短语", theme: "喝水", exampleThai: "แม่ชอบดื่มน้ำอุ่นตอนเช้า", exampleRoman: "maae chaawp deum naam un dtaawn chaao", exampleChinese: "妈妈喜欢早上喝温水。", tag: "喝水" },
  { thai: "นอนดึกบ่อยไม่ดี", id: "naawn-deuk-baawy-mai-dii", roman: "naawn deuk baawy mai dii", chinese: "经常晚睡不好", partOfSpeech: "短语", theme: "睡眠", exampleThai: "นอนดึกบ่อยไม่ดี พรุ่งนี้ลองนอนเร็วขึ้น", exampleRoman: "naawn deuk baawy mai dii, phrung-nii laawng naawn reo kheun", exampleChinese: "经常晚睡不好，明天试着早点睡。", tag: "睡眠" },
  { thai: "ลดความเครียดทีละนิด", id: "lot-khwaam-khriiat-thii-la-nit", roman: "lot khwaam khriiat thii la nit", chinese: "一点点减少压力", partOfSpeech: "短语", theme: "压力休息", exampleThai: "ถ้างานเยอะ เราควรลดความเครียดทีละนิด", exampleRoman: "thaa ngaan yoe, rao khuuan lot khwaam khriiat thii la nit", exampleChinese: "如果工作多，我们应该一点点减少压力。", tag: "压力" },
  { thai: "กินอาหารให้ตรงเวลา", id: "gin-aa-haan-hai-dtrong-wee-laa", roman: "gin aa-haan hai dtrong wee-laa", chinese: "按时吃饭", partOfSpeech: "短语", theme: "饮食", exampleThai: "เด็กๆ ควรกินอาหารให้ตรงเวลา", exampleRoman: "dek dek khuuan gin aa-haan hai dtrong wee-laa", exampleChinese: "孩子们应该按时吃饭。", tag: "饮食" },
  { thai: "ตรวจอาการก่อนกินยา", id: "dtruaat-aa-gaan-gaawn-gin-yaa", roman: "dtruaat aa-gaan gaawn gin yaa", chinese: "吃药前先确认症状", partOfSpeech: "短语", theme: "检查", exampleThai: "ถ้าไม่สบาย ควรตรวจอาการก่อนกินยา", exampleRoman: "thaa mai sa-baai, khuuan dtruaat aa-gaan gaawn gin yaa", exampleChinese: "如果不舒服，应该吃药前先确认症状。", tag: "检查" },
  { thai: "หลีกเลี่ยงของเย็นจัด", id: "liik-liiang-khaawng-yen-jat", roman: "liik-liiang khaawng yen jat", chinese: "避免太冰的东西", partOfSpeech: "短语", theme: "避免", exampleThai: "ถ้าเจ็บคอ ควรหลีกเลี่ยงของเย็นจัด", exampleRoman: "thaa jep khaaw, khuuan liik-liiang khaawng yen jat", exampleChinese: "如果喉咙痛，应该避免太冰的东西。", tag: "避免" },
  { thai: "สุขภาพดีขึ้นเรื่อยๆ", id: "suk-kha-phaap-dii-kheun-reuuai-reuuai", roman: "suk-kha-phaap dii kheun reuuai reuuai", chinese: "健康一点点变好", partOfSpeech: "短语", theme: "改善保持", exampleThai: "ถ้าทำทุกวัน สุขภาพจะดีขึ้นเรื่อยๆ", exampleRoman: "thaa tham thuk wan, suk-kha-phaap ja dii kheun reuuai reuuai", exampleChinese: "如果每天做，健康会一点点变好。", tag: "改善" },
];

const shouldRows = habits.map((habit): Definition => ({
  thai: `ควร${habit.thai}ทุกวัน`,
  id: `khuuan-${habit.id}-thuk-wan`,
  roman: `khuuan ${habit.roman} thuk wan`,
  chinese: `应该每天${habit.chinese}`,
  partOfSpeech: "短语",
  theme: habit.theme,
  exampleThai: `ถ้าอยากสุขภาพดี ควร${habit.thai}ทุกวัน`,
  exampleRoman: `thaa yaak suk-kha-phaap dii, khuuan ${habit.roman} thuk wan`,
  exampleChinese: `如果想健康，应该每天${habit.chinese}。`,
  tag: "建议",
}));

const tryRows = habits.map((habit): Definition => ({
  thai: `ลอง${habit.thai}ดู`,
  id: `laawng-${habit.id}-duu`,
  roman: `laawng ${habit.roman} duu`,
  chinese: `试着${habit.chinese}`,
  partOfSpeech: "短语",
  theme: habit.theme,
  exampleThai: `ช่วงนี้คุณเหนื่อย ลอง${habit.thai}ดูนะ`,
  exampleRoman: `chuuang nii khun neuueai, laawng ${habit.roman} duu na`,
  exampleChinese: `你最近累，试着${habit.chinese}吧。`,
  tag: "尝试",
}));

const avoidRows = habits.map((habit): Definition => ({
  thai: `อย่า${habit.thai}มากเกินไป`,
  id: `yaa-${habit.id}-maak-goen-bpai`,
  roman: `yaa ${habit.roman} maak goen bpai`,
  chinese: `不要过度${habit.chinese}`,
  partOfSpeech: "短语",
  theme: habit.theme === "检查" ? "避免" : habit.theme,
  exampleThai: `ทำได้ แต่อย่า${habit.thai}มากเกินไป`,
  exampleRoman: `tham dai, dtaae yaa ${habit.roman} maak goen bpai`,
  exampleChinese: `可以做，但不要过度${habit.chinese}。`,
  tag: "避免过度",
}));

const improveRows = habits.map((habit): Definition => ({
  thai: `${habit.thai}ช่วยให้ดีขึ้น`,
  id: `${habit.id}-chuai-hai-dii-kheun`,
  roman: `${habit.roman} chuai hai dii kheun`,
  chinese: `${habit.chinese}有助于变好`,
  partOfSpeech: "短语",
  theme: "改善保持",
  exampleThai: `สำหรับฉัน ${habit.thai}ช่วยให้ดีขึ้นจริงๆ`,
  exampleRoman: `sam-rap chan, ${habit.roman} chuai hai dii kheun jing jing`,
  exampleChinese: `对我来说，${habit.chinese}真的有助于变好。`,
  tag: "改善",
}));

const keepRows = habits.map((habit): Definition => ({
  thai: `รักษานิสัย${habit.thai}`,
  id: `rak-saa-ni-sai-${habit.id}`,
  roman: `rak-saa ni-sai ${habit.roman}`,
  chinese: `保持${habit.chinese}的习惯`,
  partOfSpeech: "短语",
  theme: "改善保持",
  exampleThai: `ถ้าทำได้ ควรรักษานิสัย${habit.thai}ต่อไป`,
  exampleRoman: `thaa tham dai, khuuan rak-saa ni-sai ${habit.roman} dtaaw bpai`,
  exampleChinese: `如果做得到，应该继续保持${habit.chinese}的习惯。`,
  tag: "保持",
}));

const checkRows = habits.map((habit): Definition => ({
  thai: `สังเกตผลหลัง${habit.thai}`,
  id: `sang-get-phon-lang-${habit.id}`,
  roman: `sang-get phon lang ${habit.roman}`,
  chinese: `观察${habit.chinese}后的效果`,
  partOfSpeech: "短语",
  theme: "检查",
  exampleThai: `ลองทำหนึ่งสัปดาห์ แล้วสังเกตผลหลัง${habit.thai}`,
  exampleRoman: `laawng tham neung sap-daa, laaeo sang-get phon lang ${habit.roman}`,
  exampleChinese: `试着做一周，然后观察${habit.chinese}后的效果。`,
  tag: "检查",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...shouldRows,
  ...tryRows,
  ...avoidRows,
  ...improveRows,
  ...keepRows,
  ...checkRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "健康习惯", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 健康习惯常用“ควร、ลอง、อย่า...มากเกินไป、ช่วยให้ดีขึ้น、รักษานิสัย、สังเกตผล”等表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于睡眠、喝水、运动、饮食、压力、休息、检查、避免、改善和保持健康。"],
    tags,
    sourceRefs: SIMPLE_HEALTH_HABITS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_HEALTH_HABITS_01 = rows.map(toCandidate);
