export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "发生" | "开始结束" | "参加" | "取消推迟" | "准备" | "活动" | "人很多" | "气氛";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Event = { thai: string; roman: string; chinese: string; id: string };

const BASIC_EVENT_DESCRIPTIONS_REFS = ["thai-frequency", "thai-a2-basic-event-descriptions-candidate"];

const events: readonly Event[] = [
  { thai: "งานวันเกิด", roman: "ngaan wan-goet", chinese: "生日活动", id: "ngaan-wan-goet" },
  { thai: "งานเลี้ยงเล็กๆ", roman: "ngaan liiang lek lek", chinese: "小聚会", id: "ngaan-liiang-lek-lek" },
  { thai: "กิจกรรมที่โรงเรียน", roman: "git-ja-gam thii roong-riian", chinese: "学校活动", id: "git-ja-gam-thii-roong-riian" },
  { thai: "ตลาดนัดตอนเย็น", roman: "dta-laat nat dtaawn yen", chinese: "傍晚集市", id: "dta-laat-nat-dtaawn-yen" },
  { thai: "คอนเสิร์ตเล็ก", roman: "khaawn-soet lek", chinese: "小演唱会", id: "khaawn-soet-lek" },
  { thai: "งานเปิดร้านใหม่", roman: "ngaan bpoet raan mai", chinese: "新店开业活动", id: "ngaan-bpoet-raan-mai" },
  { thai: "ทริปวันหยุด", roman: "thrip wan-yut", chinese: "假日旅行", id: "thrip-wan-yut" },
  { thai: "นัดกินข้าว", roman: "nat gin khaao", chinese: "约饭", id: "nat-gin-khaao" },
  { thai: "ชั้นเรียนทดลอง", roman: "chan riian thot-laawng", chinese: "试听课", id: "chan-riian-thot-laawng" },
  { thai: "การแข่งขันกีฬา", roman: "gaan khaeng-khan gii-laa", chinese: "体育比赛", id: "gaan-khaeng-khan-gii-laa" },
  { thai: "งานทำบุญที่บ้าน", roman: "ngaan tham-bun thii baan", chinese: "家里的做功德活动", id: "ngaan-tham-bun-thii-baan" },
  { thai: "งานพบเพื่อนเก่า", roman: "ngaan phop pheuuan gao", chinese: "老朋友见面活动", id: "ngaan-phop-pheuuan-gao" },
  { thai: "การประชุมสั้นๆ", roman: "gaan bpra-chum san san", chinese: "短会", id: "gaan-bpra-chum-san-san" },
  { thai: "กิจกรรมทำอาหาร", roman: "git-ja-gam tham aa-haan", chinese: "做饭活动", id: "git-ja-gam-tham-aa-haan" },
  { thai: "งานถ่ายรูป", roman: "ngaan thaai ruup", chinese: "拍照活动", id: "ngaan-thaai-ruup" },
  { thai: "งานช่วยชุมชน", roman: "ngaan chuai chum-chon", chinese: "社区帮忙活动", id: "ngaan-chuai-chum-chon" },
];

const directRows: readonly Definition[] = [
  { thai: "เกิดอะไรขึ้นเมื่อวาน", id: "goet-a-rai-kheun-meuua-waan", roman: "goet a-rai kheun meuua-waan", chinese: "昨天发生了什么", partOfSpeech: "短语", theme: "发生", exampleThai: "ฉันไม่อยู่บ้าน เกิดอะไรขึ้นเมื่อวาน", exampleRoman: "chan mai yuu baan, goet a-rai kheun meuua-waan", exampleChinese: "我不在家，昨天发生了什么？", tag: "发生" },
  { thai: "งานเริ่มตรงเวลา", id: "ngaan-roem-dtrong-wee-laa", roman: "ngaan roem dtrong wee-laa", chinese: "活动准时开始", partOfSpeech: "短语", theme: "开始结束", exampleThai: "วันนี้งานเริ่มตรงเวลา ทุกคนมาทัน", exampleRoman: "wan-nii ngaan roem dtrong wee-laa, thuk khon maa than", exampleChinese: "今天活动准时开始，大家都赶上了。", tag: "开始" },
  { thai: "จบเร็วกว่าที่คิด", id: "jop-reo-gwaa-thii-khit", roman: "jop reo gwaa thii khit", chinese: "比想象中结束得早", partOfSpeech: "短语", theme: "开始结束", exampleThai: "การประชุมจบเร็วกว่าที่คิด", exampleRoman: "gaan bpra-chum jop reo gwaa thii khit", exampleChinese: "会议比想象中结束得早。", tag: "结束" },
  { thai: "ฉันอยากเข้าร่วมด้วย", id: "chan-yaak-khao-ruam-duai", roman: "chan yaak khao-ruam duai", chinese: "我也想参加", partOfSpeech: "短语", theme: "参加", exampleThai: "ถ้ายังมีที่ว่าง ฉันอยากเข้าร่วมด้วย", exampleRoman: "thaa yang mii thii waang, chan yaak khao-ruam duai", exampleChinese: "如果还有空位，我也想参加。", tag: "参加" },
  { thai: "ต้องเลื่อนไปก่อน", id: "dtawng-leuuan-bpai-gaawn", roman: "dtawng leuuan bpai gaawn", chinese: "必须先推迟", partOfSpeech: "短语", theme: "取消推迟", exampleThai: "ฝนตกหนัก งานวันนี้ต้องเลื่อนไปก่อน", exampleRoman: "fon dtok nak, ngaan wan-nii dtawng leuuan bpai gaawn", exampleChinese: "雨下得很大，今天的活动必须先推迟。", tag: "推迟" },
  { thai: "เตรียมของเกือบครบแล้ว", id: "dtriiam-khaawng-geuap-khrop-laaeo", roman: "dtriiam khaawng geuap khrop laaeo", chinese: "东西差不多准备齐了", partOfSpeech: "短语", theme: "准备", exampleThai: "ก่อนงานเริ่ม เราเตรียมของเกือบครบแล้ว", exampleRoman: "gaawn ngaan roem, rao dtriiam khaawng geuap khrop laaeo", exampleChinese: "活动开始前，我们东西差不多准备齐了。", tag: "准备" },
  { thai: "คนเยอะจนไม่มีที่นั่ง", id: "khon-yoe-jon-mai-mii-thii-nang", roman: "khon yoe jon mai mii thii nang", chinese: "人多到没有座位", partOfSpeech: "短语", theme: "人很多", exampleThai: "งานนี้คนเยอะจนไม่มีที่นั่ง", exampleRoman: "ngaan nii khon yoe jon mai mii thii nang", exampleChinese: "这个活动人多到没有座位。", tag: "人多" },
  { thai: "บรรยากาศสนุกมาก", id: "ban-yaa-gaat-sa-nuk-maak", roman: "ban-yaa-gaat sa-nuk maak", chinese: "气氛很开心", partOfSpeech: "短语", theme: "气氛", exampleThai: "เมื่อคืนบรรยากาศสนุกมาก ทุกคนหัวเราะ", exampleRoman: "meuua-kheuun ban-yaa-gaat sa-nuk maak, thuk khon hua-raw", exampleChinese: "昨晚气氛很开心，大家都在笑。", tag: "气氛" },
];

const happenRows = events.map((event): Definition => ({
  thai: `${event.thai}เกิดขึ้นเมื่อวาน`,
  id: `${event.id}-goet-kheun-meuua-waan`,
  roman: `${event.roman} goet kheun meuua-waan`,
  chinese: `${event.chinese}昨天发生/举行`,
  partOfSpeech: "短语",
  theme: "发生",
  exampleThai: `${event.thai}เกิดขึ้นเมื่อวาน คนในซอยพูดถึงกันเยอะ`,
  exampleRoman: `${event.roman} goet kheun meuua-waan, khon nai saawy phuut theung gan yoe`,
  exampleChinese: `${event.chinese}昨天举行，巷子里的人聊了很多。`,
  tag: "发生",
}));

const startRows = events.map((event): Definition => ({
  thai: `${event.thai}เริ่มตอนเย็น`,
  id: `${event.id}-roem-dtaawn-yen`,
  roman: `${event.roman} roem dtaawn yen`,
  chinese: `${event.chinese}傍晚开始`,
  partOfSpeech: "短语",
  theme: "开始结束",
  exampleThai: `${event.thai}เริ่มตอนเย็น เราควรไปก่อนเวลา`,
  exampleRoman: `${event.roman} roem dtaawn yen, rao khuuan bpai gaawn wee-laa`,
  exampleChinese: `${event.chinese}傍晚开始，我们应该提前去。`,
  tag: "开始",
}));

const joinRows = events.map((event): Definition => ({
  thai: `เข้าร่วม${event.thai}`,
  id: `khao-ruam-${event.id}`,
  roman: `khao-ruam ${event.roman}`,
  chinese: `参加${event.chinese}`,
  partOfSpeech: "短语",
  theme: "参加",
  exampleThai: `ถ้ามีเวลา ฉันอยากเข้าร่วม${event.thai}`,
  exampleRoman: `thaa mii wee-laa, chan yaak khao-ruam ${event.roman}`,
  exampleChinese: `如果有时间，我想参加${event.chinese}。`,
  tag: "参加",
}));

const cancelRows = events.map((event): Definition => ({
  thai: `ยกเลิก${event.thai}ชั่วคราว`,
  id: `yok-loek-${event.id}-chua-khraao`,
  roman: `yok-loek ${event.roman} chua-khraao`,
  chinese: `临时取消${event.chinese}`,
  partOfSpeech: "短语",
  theme: "取消推迟",
  exampleThai: `เพราะฝนตกหนัก ต้องยกเลิก${event.thai}ชั่วคราว`,
  exampleRoman: `phraw fon dtok nak, dtawng yok-loek ${event.roman} chua-khraao`,
  exampleChinese: `因为雨下得很大，必须临时取消${event.chinese}。`,
  tag: "取消",
}));

const prepareRows = events.map((event): Definition => ({
  thai: `เตรียมตัวสำหรับ${event.thai}`,
  id: `dtriiam-dtua-sam-rap-${event.id}`,
  roman: `dtriiam dtua sam-rap ${event.roman}`,
  chinese: `为${event.chinese}做准备`,
  partOfSpeech: "短语",
  theme: "准备",
  exampleThai: `คืนนี้เราต้องเตรียมตัวสำหรับ${event.thai}`,
  exampleRoman: `kheuun nii rao dtawng dtriiam dtua sam-rap ${event.roman}`,
  exampleChinese: `今晚我们要为${event.chinese}做准备。`,
  tag: "准备",
}));

const crowdRows = events.map((event): Definition => ({
  thai: `${event.thai}คนเยอะมาก`,
  id: `${event.id}-khon-yoe-maak`,
  roman: `${event.roman} khon yoe maak`,
  chinese: `${event.chinese}人很多`,
  partOfSpeech: "短语",
  theme: "人很多",
  exampleThai: `ปีนี้${event.thai}คนเยอะมาก ต้องไปเร็วหน่อย`,
  exampleRoman: `bpii nii ${event.roman} khon yoe maak, dtawng bpai reo naawy`,
  exampleChinese: `今年${event.chinese}人很多，要早点去。`,
  tag: "人多",
}));

const moodRows = events.map((event): Definition => ({
  thai: `บรรยากาศของ${event.thai}ดีมาก`,
  id: `ban-yaa-gaat-khaawng-${event.id}-dii-maak`,
  roman: `ban-yaa-gaat khaawng ${event.roman} dii maak`,
  chinese: `${event.chinese}的气氛很好`,
  partOfSpeech: "短语",
  theme: "气氛",
  exampleThai: `ทุกคนยิ้มแย้ม บรรยากาศของ${event.thai}ดีมาก`,
  exampleRoman: `thuk khon yim yaaem, ban-yaa-gaat khaawng ${event.roman} dii maak`,
  exampleChinese: `大家都笑眯眯的，${event.chinese}的气氛很好。`,
  tag: "气氛",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...happenRows,
  ...startRows,
  ...joinRows,
  ...cancelRows,
  ...prepareRows,
  ...crowdRows,
  ...moodRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "事件描述", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 事件描述常用“เกิดขึ้น、เริ่ม、จบ、เข้าร่วม、ยกเลิก、เลื่อน、เตรียมตัว、คนเยอะ、บรรยากาศ...”等表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于描述事件发生、开始、结束、参加、取消、推迟、准备、活动、人很多和气氛。"],
    tags,
    sourceRefs: BASIC_EVENT_DESCRIPTIONS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_EVENT_DESCRIPTIONS_01 = rows.map(toCandidate);
