export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "性格" | "习惯" | "外貌" | "工作状态" | "可靠细心" | "害羞开朗" | "严格温柔";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Person = { thai: string; roman: string; chinese: string; id: string };

const SIMPLE_DESCRIPTIONS_PEOPLE_REFS = ["thai-frequency", "thai-a2-simple-descriptions-people-candidate"];

const people: readonly Person[] = [
  { thai: "เพื่อนคนนี้", roman: "pheuuan khon nii", chinese: "这个朋友", id: "pheuuan-khon-nii" },
  { thai: "เพื่อนร่วมงานใหม่", roman: "pheuuan ruam-ngaan mai", chinese: "新同事", id: "pheuuan-ruam-ngaan-mai" },
  { thai: "ครูภาษาไทย", roman: "khruu phaa-saa thai", chinese: "泰语老师", id: "khruu-phaa-saa-thai" },
  { thai: "พี่สาวของฉัน", roman: "phii-saao khaawng chan", chinese: "我的姐姐", id: "phii-saao-khaawng-chan" },
  { thai: "น้องชายของเขา", roman: "naawng-chaai khaawng khao", chinese: "他的弟弟", id: "naawng-chaai-khaawng-khao" },
  { thai: "หัวหน้าร้าน", roman: "hua-naa raan", chinese: "店长", id: "hua-naa-raan" },
  { thai: "พนักงานคนนั้น", roman: "pha-nak-ngaan khon nan", chinese: "那位员工", id: "pha-nak-ngaan-khon-nan" },
  { thai: "เจ้าของบ้าน", roman: "jao-khaawng baan", chinese: "房东/屋主", id: "jao-khaawng-baan" },
  { thai: "เพื่อนบ้านข้างๆ", roman: "pheuuan-baan khaang khaang", chinese: "隔壁邻居", id: "pheuuan-baan-khaang-khaang" },
  { thai: "เด็กผู้หญิงคนนั้น", roman: "dek phuu-ying khon nan", chinese: "那个女孩", id: "dek-phuu-ying-khon-nan" },
  { thai: "เด็กผู้ชายคนนี้", roman: "dek phuu-chaai khon nii", chinese: "这个男孩", id: "dek-phuu-chaai-khon-nii" },
  { thai: "คุณป้าที่ตลาด", roman: "khun bpaa thii dta-laat", chinese: "市场里的阿姨", id: "khun-bpaa-thii-dta-laat" },
  { thai: "คุณลุงขับแท็กซี่", roman: "khun lung khap thaek-sii", chinese: "开出租车的叔叔", id: "khun-lung-khap-thaek-sii" },
  { thai: "นักเรียนในห้อง", roman: "nak-riian nai haawng", chinese: "班里的学生", id: "nak-riian-nai-haawng" },
  { thai: "คนที่นั่งข้างฉัน", roman: "khon thii nang khaang chan", chinese: "坐在我旁边的人", id: "khon-thii-nang-khaang-chan" },
  { thai: "เพื่อนเก่าสมัยเรียน", roman: "pheuuan gao sa-mai riian", chinese: "学生时代的老朋友", id: "pheuuan-gao-sa-mai-riian" },
];

const directRows: readonly Definition[] = [
  { thai: "นิสัยดีและคุยง่าย", id: "ni-sai-dii-lae-khui-ngaai", roman: "ni-sai dii lae khui ngaai", chinese: "性格好，容易聊天", partOfSpeech: "短语", theme: "性格", exampleThai: "เพื่อนใหม่ของฉันนิสัยดีและคุยง่าย", exampleRoman: "pheuuan mai khaawng chan ni-sai dii lae khui ngaai", exampleChinese: "我的新朋友性格好，也容易聊天。", tag: "性格" },
  { thai: "ชอบมาถึงก่อนเวลา", id: "chaawp-maa-theung-gaawn-wee-laa", roman: "chaawp maa theung gaawn wee-laa", chinese: "习惯提前到", partOfSpeech: "短语", theme: "习惯", exampleThai: "เขาชอบมาถึงก่อนเวลาเสมอ", exampleRoman: "khao chaawp maa theung gaawn wee-laa sa-moe", exampleChinese: "他总是习惯提前到。", tag: "习惯" },
  { thai: "แต่งตัวเรียบร้อยตอนทำงาน", id: "dtaeng-dtua-riiap-raawy-dtaawn-tham-ngaan", roman: "dtaeng dtua riiap-raawy dtaawn tham-ngaan", chinese: "上班时穿着整洁", partOfSpeech: "短语", theme: "外貌", exampleThai: "พนักงานคนนั้นแต่งตัวเรียบร้อยตอนทำงานทุกวัน", exampleRoman: "pha-nak-ngaan khon nan dtaeng dtua riiap-raawy dtaawn tham-ngaan thuk wan", exampleChinese: "那位员工每天上班时穿着都很整洁。", tag: "外貌" },
  { thai: "ดูเหนื่อยจากงาน", id: "duu-neuueai-jaak-ngaan", roman: "duu neuueai jaak ngaan", chinese: "看起来因工作而累", partOfSpeech: "短语", theme: "工作状态", exampleThai: "วันนี้หัวหน้าดูเหนื่อยจากงานมาก", exampleRoman: "wan-nii hua-naa duu neuueai jaak ngaan maak", exampleChinese: "今天主管看起来工作累得很。", tag: "工作状态" },
  { thai: "ไว้ใจได้และตรงเวลา", id: "wai-jai-dai-lae-dtrong-wee-laa", roman: "wai-jai dai lae dtrong wee-laa", chinese: "可靠而且守时", partOfSpeech: "短语", theme: "可靠细心", exampleThai: "เพื่อนคนนี้ไว้ใจได้และตรงเวลา", exampleRoman: "pheuuan khon nii wai-jai dai lae dtrong wee-laa", exampleChinese: "这个朋友可靠，而且守时。", tag: "可靠" },
  { thai: "ขี้อายแต่ใจดี", id: "khii-aai-dtaae-jai-dii", roman: "khii-aai dtaae jai dii", chinese: "害羞但心地好", partOfSpeech: "短语", theme: "害羞开朗", exampleThai: "น้องชายของเขาขี้อายแต่ใจดีมาก", exampleRoman: "naawng-chaai khaawng khao khii-aai dtaae jai dii maak", exampleChinese: "他的弟弟害羞但心地很好。", tag: "害羞" },
  { thai: "พูดเก่งและร่าเริง", id: "phuut-geng-lae-raa-roeng", roman: "phuut geng lae raa-roeng", chinese: "会说话而且开朗", partOfSpeech: "短语", theme: "害羞开朗", exampleThai: "เธอพูดเก่งและร่าเริง ทุกคนชอบคุยด้วย", exampleRoman: "thoe phuut geng lae raa-roeng, thuk khon chaawp khui duai", exampleChinese: "她会说话而且开朗，大家都喜欢和她聊。", tag: "开朗" },
  { thai: "เข้มงวดแต่หวังดี", id: "khem-nguat-dtaae-wang-dii", roman: "khem-nguat dtaae wang dii", chinese: "严格但出于好意", partOfSpeech: "短语", theme: "严格温柔", exampleThai: "ครูคนนี้เข้มงวดแต่หวังดี", exampleRoman: "khruu khon nii khem-nguat dtaae wang dii", exampleChinese: "这位老师严格但出于好意。", tag: "严格" },
];

const personalityRows = people.map((person): Definition => ({
  thai: `${person.thai}นิสัยใจเย็น`,
  id: `${person.id}-ni-sai-jai-yen`,
  roman: `${person.roman} ni-sai jai-yen`,
  chinese: `${person.chinese}性格冷静/温和`,
  partOfSpeech: "短语",
  theme: "性格",
  exampleThai: `${person.thai}นิสัยใจเย็น ไม่ค่อยโกรธใคร`,
  exampleRoman: `${person.roman} ni-sai jai-yen, mai khaawy groot khrai`,
  exampleChinese: `${person.chinese}性格冷静，不太对人生气。`,
  tag: "性格",
}));

const habitRows = people.map((person): Definition => ({
  thai: `${person.thai}ชอบช่วยคนอื่น`,
  id: `${person.id}-chaawp-chuai-khon-euun`,
  roman: `${person.roman} chaawp chuai khon euun`,
  chinese: `${person.chinese}习惯/喜欢帮助别人`,
  partOfSpeech: "短语",
  theme: "习惯",
  exampleThai: `${person.thai}ชอบช่วยคนอื่น เวลาใครมีปัญหา`,
  exampleRoman: `${person.roman} chaawp chuai khon euun wee-laa khrai mii bpan-haa`,
  exampleChinese: `别人有问题时，${person.chinese}喜欢帮助别人。`,
  tag: "习惯",
}));

const lookRows = people.map((person): Definition => ({
  thai: `${person.thai}ดูสะอาดเรียบร้อย`,
  id: `${person.id}-duu-sa-aat-riiap-raawy`,
  roman: `${person.roman} duu sa-aat riiap-raawy`,
  chinese: `${person.chinese}看起来干净整洁`,
  partOfSpeech: "短语",
  theme: "外貌",
  exampleThai: `${person.thai}ดูสะอาดเรียบร้อย เหมาะกับงานบริการ`,
  exampleRoman: `${person.roman} duu sa-aat riiap-raawy, maw gap ngaan baaw-ri-gaan`,
  exampleChinese: `${person.chinese}看起来干净整洁，适合服务类工作。`,
  tag: "外貌",
}));

const workRows = people.map((person): Definition => ({
  thai: `${person.thai}งานยุ่งมาก`,
  id: `${person.id}-ngaan-yung-maak`,
  roman: `${person.roman} ngaan yung maak`,
  chinese: `${person.chinese}工作很忙`,
  partOfSpeech: "短语",
  theme: "工作状态",
  exampleThai: `ช่วงนี้${person.thai}งานยุ่งมาก เลยพักน้อย`,
  exampleRoman: `chuuang nii ${person.roman} ngaan yung maak, looei phak naawy`,
  exampleChinese: `最近${person.chinese}工作很忙，所以休息少。`,
  tag: "工作状态",
}));

const reliableRows = people.map((person): Definition => ({
  thai: `${person.thai}ละเอียดรอบคอบ`,
  id: `${person.id}-la-iiat-raawp-khaawp`,
  roman: `${person.roman} la-iiat raawp-khaawp`,
  chinese: `${person.chinese}细心周到`,
  partOfSpeech: "短语",
  theme: "可靠细心",
  exampleThai: `${person.thai}ละเอียดรอบคอบ ทำงานไม่ค่อยพลาด`,
  exampleRoman: `${person.roman} la-iiat raawp-khaawp, tham-ngaan mai khaawy phlaat`,
  exampleChinese: `${person.chinese}细心周到，工作不太出错。`,
  tag: "细心",
}));

const shyRows = people.map((person): Definition => ({
  thai: `${person.thai}ค่อนข้างขี้อาย`,
  id: `${person.id}-khaawn-khaang-khii-aai`,
  roman: `${person.roman} khaawn-khaang khii-aai`,
  chinese: `${person.chinese}比较害羞`,
  partOfSpeech: "短语",
  theme: "害羞开朗",
  exampleThai: `${person.thai}ค่อนข้างขี้อาย แต่พูดดีมาก`,
  exampleRoman: `${person.roman} khaawn-khaang khii-aai, dtaae phuut dii maak`,
  exampleChinese: `${person.chinese}比较害羞，但说话很好。`,
  tag: "害羞",
}));

const strictRows = people.map((person): Definition => ({
  thai: `${person.thai}เข้มงวดเรื่องเวลา`,
  id: `${person.id}-khem-nguat-reuuang-wee-laa`,
  roman: `${person.roman} khem-nguat reuuang wee-laa`,
  chinese: `${person.chinese}对时间很严格`,
  partOfSpeech: "短语",
  theme: "严格温柔",
  exampleThai: `${person.thai}เข้มงวดเรื่องเวลา ทุกคนต้องมาตรงเวลา`,
  exampleRoman: `${person.roman} khem-nguat reuuang wee-laa, thuk khon dtawng maa dtrong wee-laa`,
  exampleChinese: `${person.chinese}对时间很严格，大家必须准时来。`,
  tag: "严格",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...personalityRows,
  ...habitRows,
  ...lookRows,
  ...workRows,
  ...reliableRows,
  ...shyRows,
  ...strictRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "人物描述", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 描述人物常用“นิสัย、ชอบ、ดู、งานยุ่ง、ละเอียดรอบคอบ、ขี้อาย、ร่าเริง、เข้มงวด”等词搭配具体人物。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于描述人物性格、习惯、外貌、工作状态、可靠、细心、害羞、开朗、严格和温柔。"],
    tags,
    sourceRefs: SIMPLE_DESCRIPTIONS_PEOPLE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_DESCRIPTIONS_PEOPLE_01 = rows.map(toCandidate);
