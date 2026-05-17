export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "短信通知" | "群消息" | "公告" | "提醒" | "确认取消" | "临时变更" | "请回复" | "已读未读";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Topic = { thai: string; roman: string; chinese: string; id: string };

const SIMPLE_MESSAGES_NOTICES_REFS = ["thai-frequency", "thai-a2-simple-messages-notices-candidate"];

const topics: readonly Topic[] = [
  { thai: "เวลานัดพรุ่งนี้", roman: "wee-laa nat phrung-nii", chinese: "明天约定的时间", id: "wee-laa-nat-phrung-nii" },
  { thai: "สถานที่เจอกัน", roman: "sa-thaan-thii jooe gan", chinese: "见面的地点", id: "sa-thaan-thii-jooe-gan" },
  { thai: "รายการซื้อของ", roman: "raai-gaan seu khaawng", chinese: "购物清单", id: "raai-gaan-seu-khaawng" },
  { thai: "งานบ้านวันนี้", roman: "ngaan-baan wan-nii", chinese: "今天的家务", id: "ngaan-baan-wan-nii" },
  { thai: "เวลาเปิดร้าน", roman: "wee-laa bpoet raan", chinese: "店铺营业时间", id: "wee-laa-bpoet-raan" },
  { thai: "การจองห้อง", roman: "gaan jaawng haawng", chinese: "订房", id: "gaan-jaawng-haawng" },
  { thai: "การส่งพัสดุ", roman: "gaan song phat-sa-du", chinese: "寄包裹", id: "gaan-song-phat-sa-du" },
  { thai: "การชำระเงิน", roman: "gaan cham-ra ngoen", chinese: "付款", id: "gaan-cham-ra-ngoen" },
  { thai: "ตารางเรียน", roman: "dtaa-raang riian", chinese: "课程表", id: "dtaa-raang-riian" },
  { thai: "รอบรถบัส", roman: "raawp rot-bas", chinese: "巴士班次", id: "raawp-rot-bas" },
  { thai: "นัดหมอ", roman: "nat maaw", chinese: "看医生预约", id: "nat-maaw" },
  { thai: "รหัสผ่านใหม่", roman: "ra-hat phaan mai", chinese: "新密码", id: "ra-hat-phaan-mai" },
  { thai: "เบอร์โทรติดต่อ", roman: "booe thoo dtit-dtaaw", chinese: "联系电话", id: "booe-thoo-dtit-dtaaw" },
  { thai: "ห้องประชุม", roman: "haawng bpra-chum", chinese: "会议室", id: "haawng-bpra-chum" },
  { thai: "เวลาปิดประตู", roman: "wee-laa bpit bpra-dtuu", chinese: "关门时间", id: "wee-laa-bpit-bpra-dtuu" },
  { thai: "ของที่ลืมไว้", roman: "khaawng thii leum wai", chinese: "忘下的东西", id: "khaawng-thii-leum-wai" },
];

const directRows: readonly Definition[] = [
  { thai: "ได้รับข้อความแล้ว", id: "dai-rap-khaaw-khwaam-laaeo", roman: "dai rap khaaw-khwaam laaeo", chinese: "已经收到消息了", partOfSpeech: "短语", theme: "短信通知", exampleThai: "ไม่ต้องส่งซ้ำ ฉันได้รับข้อความแล้ว", exampleRoman: "mai dtawng song sam, chan dai rap khaaw-khwaam laaeo", exampleChinese: "不用重复发，我已经收到消息了。", tag: "消息" },
  { thai: "ช่วยดูข้อความในกลุ่ม", id: "chuai-duu-khaaw-khwaam-nai-glum", roman: "chuai duu khaaw-khwaam nai glum", chinese: "请看群里的消息", partOfSpeech: "短语", theme: "群消息", exampleThai: "มีเรื่องสำคัญ ช่วยดูข้อความในกลุ่มหน่อย", exampleRoman: "mii reuuang sam-khan, chuai duu khaaw-khwaam nai glum naawy", exampleChinese: "有重要的事，请看一下群里的消息。", tag: "群消息" },
  { thai: "ประกาศใหม่อยู่หน้าเว็บ", id: "bpra-gaat-mai-yuu-naa-web", roman: "bpra-gaat mai yuu naa web", chinese: "新公告在网页首页", partOfSpeech: "短语", theme: "公告", exampleThai: "ประกาศใหม่อยู่หน้าเว็บ อ่านได้เลย", exampleRoman: "bpra-gaat mai yuu naa web, aan dai looei", exampleChinese: "新公告在网页首页，可以直接读。", tag: "公告" },
  { thai: "เตือนฉันอีกครั้ง", id: "dteuuan-chan-iik-khrang", roman: "dteuuan chan iik khrang", chinese: "再提醒我一次", partOfSpeech: "短语", theme: "提醒", exampleThai: "กลัวลืม ช่วยเตือนฉันอีกครั้งตอนเย็น", exampleRoman: "glua leum, chuai dteuuan chan iik khrang dtaawn yen", exampleChinese: "怕忘了，请傍晚再提醒我一次。", tag: "提醒" },
  { thai: "ยืนยันแล้วใช่ไหม", id: "yeuun-yan-laaeo-chai-mai", roman: "yeuun-yan laaeo chai mai", chinese: "已经确认了对吗", partOfSpeech: "短语", theme: "确认取消", exampleThai: "เรื่องห้องพักยืนยันแล้วใช่ไหม", exampleRoman: "reuuang haawng phak yeuun-yan laaeo chai mai", exampleChinese: "房间的事已经确认了对吗？", tag: "确认" },
  { thai: "ขอยกเลิกนัดวันนี้", id: "khaaw-yok-loek-nat-wan-nii", roman: "khaaw yok-loek nat wan-nii", chinese: "想取消今天的预约/约定", partOfSpeech: "短语", theme: "确认取消", exampleThai: "ฉันไม่สบาย ขอยกเลิกนัดวันนี้ก่อน", exampleRoman: "chan mai sa-baai, khaaw yok-loek nat wan-nii gaawn", exampleChinese: "我不舒服，想先取消今天的约定。", tag: "取消" },
  { thai: "มีการเปลี่ยนแปลงกะทันหัน", id: "mii-gaan-bpliian-bplaaeng-ga-than-han", roman: "mii gaan bpliian-bplaaeng ga-than-han", chinese: "有临时变更", partOfSpeech: "短语", theme: "临时变更", exampleThai: "วันนี้มีการเปลี่ยนแปลงกะทันหัน กรุณาอ่านประกาศ", exampleRoman: "wan-nii mii gaan bpliian-bplaaeng ga-than-han, ga-ru-naa aan bpra-gaat", exampleChinese: "今天有临时变更，请阅读公告。", tag: "变更" },
  { thai: "อ่านแล้วแต่ยังไม่ได้ตอบ", id: "aan-laaeo-dtaae-yang-mai-dai-dtaawp", roman: "aan laaeo dtaae yang mai dai dtaawp", chinese: "已读但还没回复", partOfSpeech: "短语", theme: "已读未读", exampleThai: "ขอโทษนะ ฉันอ่านแล้วแต่ยังไม่ได้ตอบ", exampleRoman: "khaaw-thoot na, chan aan laaeo dtaae yang mai dai dtaawp", exampleChinese: "不好意思，我已读但还没回复。", tag: "已读" },
];

const smsRows = topics.map((topic): Definition => ({
  thai: `ส่งข้อความแจ้งเรื่อง${topic.thai}`,
  id: `song-khaaw-khwaam-jaaeng-reuuang-${topic.id}`,
  roman: `song khaaw-khwaam jaaeng reuuang ${topic.roman}`,
  chinese: `发短信通知${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "短信通知",
  exampleThai: `ถ้ามีอะไรเปลี่ยน ช่วยส่งข้อความแจ้งเรื่อง${topic.thai}`,
  exampleRoman: `thaa mii a-rai bpliian, chuai song khaaw-khwaam jaaeng reuuang ${topic.roman}`,
  exampleChinese: `如果有什么变化，请发短信通知${topic.chinese}。`,
  tag: "短信",
}));

const groupRows = topics.map((topic): Definition => ({
  thai: `แจ้ง${topic.thai}ในกลุ่ม`,
  id: `jaaeng-${topic.id}-nai-glum`,
  roman: `jaaeng ${topic.roman} nai glum`,
  chinese: `在群里通知${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "群消息",
  exampleThai: `ถ้าทุกคนต้องรู้ กรุณาแจ้ง${topic.thai}ในกลุ่ม`,
  exampleRoman: `thaa thuk khon dtawng ruu, ga-ru-naa jaaeng ${topic.roman} nai glum`,
  exampleChinese: `如果大家都需要知道，请在群里通知${topic.chinese}。`,
  tag: "群消息",
}));

const noticeRows = topics.map((topic): Definition => ({
  thai: `ประกาศเรื่อง${topic.thai}`,
  id: `bpra-gaat-reuuang-${topic.id}`,
  roman: `bpra-gaat reuuang ${topic.roman}`,
  chinese: `公告${topic.chinese}的事`,
  partOfSpeech: "短语",
  theme: "公告",
  exampleThai: `หน้าอาคารมีประกาศเรื่อง${topic.thai}`,
  exampleRoman: `naa aa-khaan mii bpra-gaat reuuang ${topic.roman}`,
  exampleChinese: `楼前有关于${topic.chinese}的公告。`,
  tag: "公告",
}));

const remindRows = topics.map((topic): Definition => ({
  thai: `เตือนเรื่อง${topic.thai}อีกที`,
  id: `dteuuan-reuuang-${topic.id}-iik-thii`,
  roman: `dteuuan reuuang ${topic.roman} iik thii`,
  chinese: `再提醒一次${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "提醒",
  exampleThai: `ก่อนนอนช่วยเตือนเรื่อง${topic.thai}อีกที`,
  exampleRoman: `gaawn naawn chuai dteuuan reuuang ${topic.roman} iik thii`,
  exampleChinese: `睡前请再提醒一次${topic.chinese}。`,
  tag: "提醒",
}));

const changeRows = topics.map((topic): Definition => ({
  thai: `เปลี่ยน${topic.thai}ชั่วคราว`,
  id: `bpliian-${topic.id}-chua-khraao`,
  roman: `bpliian ${topic.roman} chua-khraao`,
  chinese: `临时更改${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "临时变更",
  exampleThai: `วันนี้ต้องเปลี่ยน${topic.thai}ชั่วคราว ขอโทษด้วย`,
  exampleRoman: `wan-nii dtawng bpliian ${topic.roman} chua-khraao, khaaw-thoot duai`,
  exampleChinese: `今天必须临时更改${topic.chinese}，抱歉。`,
  tag: "变更",
}));

const replyRows = topics.map((topic): Definition => ({
  thai: `กรุณาตอบเรื่อง${topic.thai}`,
  id: `ga-ru-naa-dtaawp-reuuang-${topic.id}`,
  roman: `ga-ru-naa dtaawp reuuang ${topic.roman}`,
  chinese: `请回复${topic.chinese}的事`,
  partOfSpeech: "短语",
  theme: "请回复",
  exampleThai: `ถ้าอ่านแล้ว กรุณาตอบเรื่อง${topic.thai}`,
  exampleRoman: `thaa aan laaeo, ga-ru-naa dtaawp reuuang ${topic.roman}`,
  exampleChinese: `如果读到了，请回复${topic.chinese}的事。`,
  tag: "回复",
}));

const readRows = topics.map((topic): Definition => ({
  thai: `ยังไม่ได้อ่านข้อความเรื่อง${topic.thai}`,
  id: `yang-mai-dai-aan-khaaw-khwaam-reuuang-${topic.id}`,
  roman: `yang mai dai aan khaaw-khwaam reuuang ${topic.roman}`,
  chinese: `还没读关于${topic.chinese}的消息`,
  partOfSpeech: "短语",
  theme: "已读未读",
  exampleThai: `ขอโทษ ฉันยังไม่ได้อ่านข้อความเรื่อง${topic.thai}`,
  exampleRoman: `khaaw-thoot, chan yang mai dai aan khaaw-khwaam reuuang ${topic.roman}`,
  exampleChinese: `不好意思，我还没读关于${topic.chinese}的消息。`,
  tag: "未读",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...smsRows,
  ...groupRows,
  ...noticeRows,
  ...remindRows,
  ...changeRows,
  ...replyRows,
  ...readRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "消息通知", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 消息通知场景常用“ส่งข้อความแจ้ง、แจ้ง...ในกลุ่ม、ประกาศเรื่อง、เตือนเรื่อง、เปลี่ยน...ชั่วคราว、กรุณาตอบ、ยังไม่ได้อ่าน”等表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于短信通知、群消息、公告、提醒、确认、取消、临时变更、请回复、已读未读。"],
    tags,
    sourceRefs: SIMPLE_MESSAGES_NOTICES_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_MESSAGES_NOTICES_01 = rows.map(toCandidate);
