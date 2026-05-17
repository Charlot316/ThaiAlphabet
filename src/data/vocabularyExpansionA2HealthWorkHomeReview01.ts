export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "请假" | "照顾家人" | "居家办公" | "身体不适" | "家务安排" | "复盘";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Situation = { thai: string; roman: string; chinese: string; id: string };

const HEALTH_WORK_HOME_REVIEW_REFS = ["thai-frequency", "thai-a2-health-work-home-review-candidate"];

const situations: readonly Situation[] = [
  { thai: "ปวดหัวตอนเช้า", roman: "bpuat hua dtaawn chaao", chinese: "早上头痛", id: "bpuat-hua-dtaawn-chaao" },
  { thai: "เจ็บคอเล็กน้อย", roman: "jep khaaw lek naawy", chinese: "喉咙有点痛", id: "jep-khaaw-lek-naawy" },
  { thai: "นอนไม่พอเมื่อคืน", roman: "naawn mai phaaw meuua-kheuun", chinese: "昨晚没睡够", id: "naawn-mai-phaaw-meuua-kheuun" },
  { thai: "ลูกไม่สบาย", roman: "luuk mai sa-baai", chinese: "孩子不舒服", id: "luuk-mai-sa-baai" },
  { thai: "แม่ต้องไปหาหมอ", roman: "maae dtawng bpai haa maaw", chinese: "妈妈要去看医生", id: "maae-dtawng-bpai-haa-maaw" },
  { thai: "พ่อกลับบ้านช้า", roman: "phaaw glap baan chaa", chinese: "爸爸回家晚", id: "phaaw-glap-baan-chaa" },
  { thai: "ต้องประชุมออนไลน์", roman: "dtawng bpra-chum aawn-lai", chinese: "要开线上会议", id: "dtawng-bpra-chum-aawn-lai" },
  { thai: "อินเทอร์เน็ตที่บ้านช้า", roman: "in-thoe-net thii baan chaa", chinese: "家里网络慢", id: "in-thoe-net-thii-baan-chaa" },
  { thai: "งานบ้านยังไม่เสร็จ", roman: "ngaan-baan yang mai set", chinese: "家务还没做完", id: "ngaan-baan-yang-mai-set" },
  { thai: "ต้องทำกับข้าวเย็น", roman: "dtawng tham gap-khaao yen", chinese: "要做晚饭", id: "dtawng-tham-gap-khaao-yen" },
  { thai: "บ้านรกมาก", roman: "baan rok maak", chinese: "家里很乱", id: "baan-rok-maak" },
  { thai: "มีงานด่วนจากหัวหน้า", roman: "mii ngaan duan jaak hua-naa", chinese: "主管有紧急任务", id: "mii-ngaan-duan-jaak-hua-naa" },
  { thai: "ต้องดูแลคุณยาย", roman: "dtawng duu-laae khun yaai", chinese: "要照顾奶奶/外婆", id: "dtawng-duu-laae-khun-yaai" },
  { thai: "ต้องพาเด็กไปโรงเรียน", roman: "dtawng phaa dek bpai roong-riian", chinese: "要送孩子上学", id: "dtawng-phaa-dek-bpai-roong-riian" },
  { thai: "มีไข้นิดหน่อย", roman: "mii khai nit naawy", chinese: "有点发烧", id: "mii-khai-nit-naawy" },
  { thai: "ต้องพักสายตา", roman: "dtawng phak saai-dtaa", chinese: "要休息眼睛", id: "dtawng-phak-saai-dtaa" },
];

const directRows: readonly Definition[] = [
  { thai: "ขอลาป่วยครึ่งวัน", id: "khaaw-laa-bpuai-khreung-wan", roman: "khaaw laa bpuai khreung wan", chinese: "想请半天病假", partOfSpeech: "短语", theme: "请假", exampleThai: "วันนี้ฉันมีไข้ ขอลาป่วยครึ่งวันได้ไหม", exampleRoman: "wan-nii chan mii khai, khaaw laa bpuai khreung wan dai mai", exampleChinese: "今天我发烧，可以请半天病假吗？", tag: "请假" },
  { thai: "ต้องอยู่บ้านดูแลลูก", id: "dtawng-yuu-baan-duu-laae-luuk", roman: "dtawng yuu baan duu-laae luuk", chinese: "必须在家照顾孩子", partOfSpeech: "短语", theme: "照顾家人", exampleThai: "ลูกไม่สบาย ฉันต้องอยู่บ้านดูแลลูก", exampleRoman: "luuk mai sa-baai, chan dtawng yuu baan duu-laae luuk", exampleChinese: "孩子不舒服，我必须在家照顾孩子。", tag: "照顾家人" },
  { thai: "ทำงานที่บ้านวันนี้", id: "tham-ngaan-thii-baan-wan-nii", roman: "tham-ngaan thii baan wan-nii", chinese: "今天在家工作", partOfSpeech: "短语", theme: "居家办公", exampleThai: "ฝนตกหนัก ฉันทำงานที่บ้านวันนี้", exampleRoman: "fon dtok nak, chan tham-ngaan thii baan wan-nii", exampleChinese: "雨下得很大，我今天在家工作。", tag: "居家办公" },
  { thai: "ร่างกายไม่ค่อยไหว", id: "raang-gaai-mai-khaawy-wai", roman: "raang-gaai mai khaawy wai", chinese: "身体有点撑不住", partOfSpeech: "短语", theme: "身体不适", exampleThai: "นอนน้อยหลายวัน ร่างกายไม่ค่อยไหว", exampleRoman: "naawn naawy laai wan, raang-gaai mai khaawy wai", exampleChinese: "好几天睡得少，身体有点撑不住。", tag: "不适" },
  { thai: "แบ่งงานบ้านกับพี่", id: "baeng-ngaan-baan-gap-phii", roman: "baeng ngaan-baan gap phii", chinese: "和哥哥/姐姐分担家务", partOfSpeech: "短语", theme: "家务安排", exampleThai: "ช่วงนี้งานเยอะ ฉันแบ่งงานบ้านกับพี่", exampleRoman: "chuuang nii ngaan yoe, chan baeng ngaan-baan gap phii", exampleChinese: "最近事情多，我和哥哥/姐姐分担家务。", tag: "家务" },
  { thai: "วันนี้จัดการได้ไม่ครบ", id: "wan-nii-jat-gaan-dai-mai-khrop", roman: "wan-nii jat-gaan dai mai khrop", chinese: "今天没能全部处理完", partOfSpeech: "短语", theme: "复盘", exampleThai: "ทั้งงานทั้งบ้าน วันนี้จัดการได้ไม่ครบ", exampleRoman: "thang ngaan thang baan, wan-nii jat-gaan dai mai khrop", exampleChinese: "工作和家里的事都有，今天没能全部处理完。", tag: "复盘" },
  { thai: "พรุ่งนี้ต้องปรับแผนใหม่", id: "phrung-nii-dtawng-bprap-phaaen-mai", roman: "phrung-nii dtawng bprap phaaen mai", chinese: "明天必须重新调整计划", partOfSpeech: "短语", theme: "复盘", exampleThai: "วันนี้เหนื่อยเกินไป พรุ่งนี้ต้องปรับแผนใหม่", exampleRoman: "wan-nii neuueai goen bpai, phrung-nii dtawng bprap phaaen mai", exampleChinese: "今天太累了，明天必须重新调整计划。", tag: "复盘" },
  { thai: "ขอพักก่อนเริ่มงานต่อ", id: "khaaw-phak-gaawn-roem-ngaan-dtaaw", roman: "khaaw phak gaawn roem ngaan dtaaw", chinese: "继续工作前想先休息", partOfSpeech: "短语", theme: "身体不适", exampleThai: "ฉันปวดตา ขอพักก่อนเริ่มงานต่อ", exampleRoman: "chan bpuat dtaa, khaaw phak gaawn roem ngaan dtaaw", exampleChinese: "我眼睛痛，继续工作前想先休息。", tag: "休息" },
];

const leaveRows = situations.map((situation): Definition => ({
  thai: `ขอลาเพราะ${situation.thai}`,
  id: `khaaw-laa-phraw-${situation.id}`,
  roman: `khaaw laa phraw ${situation.roman}`,
  chinese: `因为${situation.chinese}请假`,
  partOfSpeech: "短语",
  theme: "请假",
  exampleThai: `วันนี้ฉันขอลาเพราะ${situation.thai}ได้ไหม`,
  exampleRoman: `wan-nii chan khaaw laa phraw ${situation.roman} dai mai`,
  exampleChinese: `今天我可以因为${situation.chinese}请假吗？`,
  tag: "请假",
}));

const careRows = situations.map((situation): Definition => ({
  thai: `ต้องดูแลบ้านเพราะ${situation.thai}`,
  id: `dtawng-duu-laae-baan-phraw-${situation.id}`,
  roman: `dtawng duu-laae baan phraw ${situation.roman}`,
  chinese: `因为${situation.chinese}要照顾家里`,
  partOfSpeech: "短语",
  theme: "照顾家人",
  exampleThai: `ช่วงนี้ฉันต้องดูแลบ้านเพราะ${situation.thai}`,
  exampleRoman: `chuuang nii chan dtawng duu-laae baan phraw ${situation.roman}`,
  exampleChinese: `最近我因为${situation.chinese}要照顾家里。`,
  tag: "照顾家人",
}));

const homeWorkRows = situations.map((situation): Definition => ({
  thai: `ทำงานที่บ้านเพราะ${situation.thai}`,
  id: `tham-ngaan-thii-baan-phraw-${situation.id}`,
  roman: `tham-ngaan thii baan phraw ${situation.roman}`,
  chinese: `因为${situation.chinese}在家工作`,
  partOfSpeech: "短语",
  theme: "居家办公",
  exampleThai: `วันนี้ฉันทำงานที่บ้านเพราะ${situation.thai}`,
  exampleRoman: `wan-nii chan tham-ngaan thii baan phraw ${situation.roman}`,
  exampleChinese: `今天我因为${situation.chinese}在家工作。`,
  tag: "居家办公",
}));

const sickRows = situations.map((situation): Definition => ({
  thai: `รู้สึกไม่สบายเพราะ${situation.thai}`,
  id: `ruu-seuk-mai-sa-baai-phraw-${situation.id}`,
  roman: `ruu-seuk mai sa-baai phraw ${situation.roman}`,
  chinese: `因为${situation.chinese}感觉不舒服`,
  partOfSpeech: "短语",
  theme: "身体不适",
  exampleThai: `ตอนบ่ายฉันรู้สึกไม่สบายเพราะ${situation.thai}`,
  exampleRoman: `dtaawn baai chan ruu-seuk mai sa-baai phraw ${situation.roman}`,
  exampleChinese: `下午我因为${situation.chinese}感觉不舒服。`,
  tag: "不适",
}));

const choreRows = situations.map((situation): Definition => ({
  thai: `จัดงานบ้านหลัง${situation.thai}`,
  id: `jat-ngaan-baan-lang-${situation.id}`,
  roman: `jat ngaan-baan lang ${situation.roman}`,
  chinese: `在${situation.chinese}后安排家务`,
  partOfSpeech: "短语",
  theme: "家务安排",
  exampleThai: `เย็นนี้เราจะจัดงานบ้านหลัง${situation.thai}`,
  exampleRoman: `yen nii rao ja jat ngaan-baan lang ${situation.roman}`,
  exampleChinese: `今晚我们会在${situation.chinese}后安排家务。`,
  tag: "家务",
}));

const reviewRows = situations.map((situation): Definition => ({
  thai: `ทบทวนวันนี้เรื่อง${situation.thai}`,
  id: `thop-thuan-wan-nii-reuuang-${situation.id}`,
  roman: `thop-thuan wan-nii reuuang ${situation.roman}`,
  chinese: `复盘今天关于${situation.chinese}的事`,
  partOfSpeech: "短语",
  theme: "复盘",
  exampleThai: `ก่อนนอน ฉันทบทวนวันนี้เรื่อง${situation.thai}`,
  exampleRoman: `gaawn naawn, chan thop-thuan wan-nii reuuang ${situation.roman}`,
  exampleChinese: `睡前，我复盘今天关于${situation.chinese}的事。`,
  tag: "复盘",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...leaveRows,
  ...careRows,
  ...homeWorkRows,
  ...sickRows,
  ...choreRows,
  ...reviewRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "健康工作家庭复盘", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 健康、工作、家庭交叉复盘常用“ขอลาเพราะ、ต้องดูแลบ้าน、ทำงานที่บ้าน、รู้สึกไม่สบาย、จัดงานบ้าน、ทบทวนวันนี้เรื่อง...”等句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于请假、照顾家人、居家办公、身体不适、家务安排和日常复盘。"],
    tags,
    sourceRefs: HEALTH_WORK_HOME_REVIEW_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_HEALTH_WORK_HOME_REVIEW_01 = rows.map(toCandidate);
