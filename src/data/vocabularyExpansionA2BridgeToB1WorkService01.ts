export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "确认需求" | "说明问题" | "跟进" | "轻度道歉" | "协助" | "交接";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type WorkItem = { thai: string; id: string; roman: string; chinese: string; tag: string };
type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };

const BRIDGE_TO_B1_WORK_SERVICE_REFS = ["thai-frequency", "thai-a2-bridge-to-b1-work-service-candidate"];

const workItems: readonly WorkItem[] = [
  { thai: "สิ่งที่ลูกค้าต้องการ", id: "sing-thii-luuk-khaa-dtawng-gaan", roman: "sing thii luuk-khaa dtawng-gaan", chinese: "客人需要的东西/服务", tag: "需求" },
  { thai: "ปัญหาหน้างาน", id: "bpan-haa-naa-ngaan", roman: "bpan-haa naa-ngaan", chinese: "现场问题", tag: "问题" },
  { thai: "งานที่รับไว้", id: "ngaan-thii-rap-wai", roman: "ngaan thii rap wai", chinese: "已经接下的工作", tag: "任务" },
  { thai: "ข้อความจากลูกค้า", id: "khaaw-khwaam-jaak-luuk-khaa", roman: "khaaw-khwaam jaak luuk-khaa", chinese: "客人发来的消息", tag: "消息" },
  { thai: "เวลานัดหมาย", id: "wee-laa-nat-maai", roman: "wee-laa nat-maai", chinese: "约定时间", tag: "时间" },
  { thai: "ใบเสร็จของวันนี้", id: "bai-set-khaawng-wan-nii", roman: "bai-set khaawng wan-nii", chinese: "今天的收据", tag: "收据" },
  { thai: "ของที่ส่งผิด", id: "khaawng-thii-song-phit", roman: "khaawng thii song phit", chinese: "送错的东西", tag: "错误" },
  { thai: "คิวต่อไป", id: "khiu-dtaaw-bpai", roman: "khiu dtaaw bpai", chinese: "下一位/下一单", tag: "排队" },
  { thai: "งานด่วนเล็กน้อย", id: "ngaan-duan-lek-naawy", roman: "ngaan duan lek naawy", chinese: "有点急的小任务", tag: "任务" },
  { thai: "คำถามซ้ำๆ", id: "kham-thaam-sam-sam", roman: "kham-thaam sam sam", chinese: "反复出现的问题", tag: "问题" },
  { thai: "รายละเอียดที่ขาด", id: "raai-la-iiat-thii-khaat", roman: "raai-la-iiat thii khaat", chinese: "缺少的细节", tag: "细节" },
  { thai: "คนที่รออยู่", id: "khon-thii-raaw-yuu", roman: "khon thii raaw yuu", chinese: "正在等待的人", tag: "等待" },
  { thai: "การโทรกลับ", id: "gaan-thoo-glap", roman: "gaan thoo glap", chinese: "回电话", tag: "跟进" },
  { thai: "ข้อผิดพลาดเล็กน้อย", id: "khaaw-phit-phlaat-lek-naawy", roman: "khaaw phit-phlaat lek naawy", chinese: "小错误", tag: "错误" },
  { thai: "ทางแก้ง่ายๆ", id: "thaang-gaae-ngaai-ngaai", roman: "thaang gaae ngaai ngaai", chinese: "简单的解决办法", tag: "解决" },
  { thai: "สถานะงานวันนี้", id: "sa-thaa-na-ngaan-wan-nii", roman: "sa-thaa-na ngaan wan-nii", chinese: "今天的工作状态", tag: "跟进" },
];

const directRows: readonly Definition[] = [
  { thai: "ขอเช็กความต้องการก่อน", id: "khaaw-chek-khwaam-dtawng-gaan-gaawn", roman: "khaaw chek khwaam dtawng-gaan gaawn", chinese: "请先确认需求", partOfSpeech: "短语", theme: "确认需求", exampleThai: "ก่อนเริ่มงาน ขอเช็กความต้องการก่อนนะครับ", exampleRoman: "gaawn roem ngaan, khaaw chek khwaam dtawng-gaan gaawn na khrap", exampleChinese: "开始工作前，请先确认一下需求。", tag: "需求" },
  { thai: "ขออธิบายปัญหาสั้นๆ", id: "khaaw-a-thi-baai-bpan-haa-san-san", roman: "khaaw a-thi-baai bpan-haa san san", chinese: "请简短说明问题", partOfSpeech: "短语", theme: "说明问题", exampleThai: "ลูกค้ารออยู่ ขออธิบายปัญหาสั้นๆ ได้ไหม", exampleRoman: "luuk-khaa raaw yuu, khaaw a-thi-baai bpan-haa san san dai mai", exampleChinese: "客人在等，可以请简短说明问题吗？", tag: "说明" },
  { thai: "เดี๋ยวตามเรื่องให้อีกที", id: "diaao-dtaam-reuuang-hai-iik-thii", roman: "diaao dtaam reuuang hai iik thii", chinese: "一会儿再帮你跟进", partOfSpeech: "短语", theme: "跟进", exampleThai: "ถ้ายังไม่ได้คำตอบ เดี๋ยวตามเรื่องให้อีกที", exampleRoman: "thaa yang mai dai kham-dtaawp, diaao dtaam reuuang hai iik thii", exampleChinese: "如果还没有答复，一会儿再帮你跟进。", tag: "跟进" },
  { thai: "ขอโทษที่ให้รอนาน", id: "khaaw-thoot-thii-hai-raaw-naan", roman: "khaaw-thoot thii hai raaw naan", chinese: "抱歉让您久等", partOfSpeech: "短语", theme: "轻度道歉", exampleThai: "ขอโทษที่ให้รอนานครับ ตอนนี้จัดการให้แล้ว", exampleRoman: "khaaw-thoot thii hai raaw naan khrap, dtaawn nii jat-gaan hai laaeo", exampleChinese: "抱歉让您久等，现在已经为您处理了。", tag: "道歉" },
  { thai: "ให้ฉันช่วยดูไหม", id: "hai-chan-chuai-duu-mai", roman: "hai chan chuai duu mai", chinese: "要我帮忙看一下吗", partOfSpeech: "短语", theme: "协助", exampleThai: "ถ้าระบบใช้ไม่ได้ ให้ฉันช่วยดูไหม", exampleRoman: "thaa ra-bop chai mai dai, hai chan chuai duu mai", exampleChinese: "如果系统用不了，要我帮忙看一下吗？", tag: "协助" },
  { thai: "ฝากงานนี้ให้เพื่อนร่วมงาน", id: "faak-ngaan-nii-hai-pheuuan-ruam-ngaan", roman: "faak ngaan nii hai pheuuan ruam ngaan", chinese: "把这件工作交给同事", partOfSpeech: "短语", theme: "交接", exampleThai: "พรุ่งนี้ฉันไม่อยู่ จึงฝากงานนี้ให้เพื่อนร่วมงาน", exampleRoman: "phrung-nii chan mai yuu, jeung faak ngaan nii hai pheuuan ruam ngaan", exampleChinese: "明天我不在，所以把这件工作交给同事。", tag: "交接" },
  { thai: "แจ้งผลให้ทราบแล้ว", id: "jaaeng-phon-hai-saap-laaeo", roman: "jaaeng phon hai saap laaeo", chinese: "已经告知结果", partOfSpeech: "短语", theme: "跟进", exampleThai: "เรื่องการซ่อม เราแจ้งผลให้ทราบแล้ว", exampleRoman: "reuuang gaan saawm, rao jaaeng phon hai saap laaeo", exampleChinese: "关于维修的事，我们已经告知结果了。", tag: "跟进" },
  { thai: "ขอโทษที่ตอบช้า", id: "khaaw-thoot-thii-dtaawp-chaa", roman: "khaaw-thoot thii dtaawp chaa", chinese: "抱歉回复晚了", partOfSpeech: "短语", theme: "轻度道歉", exampleThai: "ขอโทษที่ตอบช้า วันนี้งานค่อนข้างเยอะ", exampleRoman: "khaaw-thoot thii dtaawp chaa, wan-nii ngaan khaawn-khaang yoe", exampleChinese: "抱歉回复晚了，今天工作比较多。", tag: "道歉" },
];

const confirmRows = workItems.map((item): Definition => ({
  thai: `ยืนยัน${item.thai}ให้ชัด`,
  id: `yeuun-yan-${item.id}-hai-chat`,
  roman: `yeuun-yan ${item.roman} hai chat`,
  chinese: `把${item.chinese}确认清楚`,
  partOfSpeech: "短语",
  theme: "确认需求",
  exampleThai: `ก่อนตอบลูกค้า เราควรยืนยัน${item.thai}ให้ชัด`,
  exampleRoman: `gaawn dtaawp luuk-khaa, rao khuuan yeuun-yan ${item.roman} hai chat`,
  exampleChinese: `回复客人前，我们应该把${item.chinese}确认清楚。`,
  tag: item.tag,
}));

const explainRows = workItems.map((item): Definition => ({
  thai: `อธิบายเรื่อง${item.thai}แบบง่ายๆ`,
  id: `a-thi-baai-reuuang-${item.id}-baaep-ngaai-ngaai`,
  roman: `a-thi-baai reuuang ${item.roman} baaep ngaai ngaai`,
  chinese: `简单说明关于${item.chinese}的事`,
  partOfSpeech: "短语",
  theme: "说明问题",
  exampleThai: `ถ้าลูกค้าไม่เข้าใจ ให้อธิบายเรื่อง${item.thai}แบบง่ายๆ`,
  exampleRoman: `thaa luuk-khaa mai khao-jai, hai a-thi-baai reuuang ${item.roman} baaep ngaai ngaai`,
  exampleChinese: `如果客人不明白，就简单说明关于${item.chinese}的事。`,
  tag: item.tag,
}));

const followRows = workItems.map((item): Definition => ({
  thai: `ตามต่อเรื่อง${item.thai}`,
  id: `dtaam-dtaaw-reuuang-${item.id}`,
  roman: `dtaam dtaaw reuuang ${item.roman}`,
  chinese: `继续跟进${item.chinese}`,
  partOfSpeech: "短语",
  theme: "跟进",
  exampleThai: `ช่วงบ่ายฉันจะตามต่อเรื่อง${item.thai}ให้`,
  exampleRoman: `chuuang baai chan ja dtaam dtaaw reuuang ${item.roman} hai`,
  exampleChinese: `下午我会继续帮忙跟进${item.chinese}。`,
  tag: item.tag,
}));

const apologyRows = workItems.map((item): Definition => ({
  thai: `ขอโทษเรื่อง${item.thai}`,
  id: `khaaw-thoot-reuuang-${item.id}`,
  roman: `khaaw-thoot reuuang ${item.roman}`,
  chinese: `为${item.chinese}道歉`,
  partOfSpeech: "短语",
  theme: "轻度道歉",
  exampleThai: `ถ้ามีความไม่สะดวก เราควรขอโทษเรื่อง${item.thai}`,
  exampleRoman: `thaa mii khwaam mai sa-duuak, rao khuuan khaaw-thoot reuuang ${item.roman}`,
  exampleChinese: `如果造成不方便，我们应该为${item.chinese}道歉。`,
  tag: item.tag,
}));

const helpRows = workItems.map((item): Definition => ({
  thai: `ช่วยจัดการ${item.thai}`,
  id: `chuai-jat-gaan-${item.id}`,
  roman: `chuai jat-gaan ${item.roman}`,
  chinese: `帮忙处理${item.chinese}`,
  partOfSpeech: "短语",
  theme: "协助",
  exampleThai: `ถ้าเพื่อนยุ่ง ฉันช่วยจัดการ${item.thai}ได้`,
  exampleRoman: `thaa pheuuan yung, chan chuai jat-gaan ${item.roman} dai`,
  exampleChinese: `如果同事忙，我可以帮忙处理${item.chinese}。`,
  tag: item.tag,
}));

const handoffRows = workItems.map((item): Definition => ({
  thai: `ส่งต่อข้อมูลเรื่อง${item.thai}`,
  id: `song-dtaaw-khaaw-muun-reuuang-${item.id}`,
  roman: `song dtaaw khaaw-muun reuuang ${item.roman}`,
  chinese: `转交关于${item.chinese}的信息`,
  partOfSpeech: "短语",
  theme: "交接",
  exampleThai: `ก่อนเลิกงาน ควรส่งต่อข้อมูลเรื่อง${item.thai}ให้ทีม`,
  exampleRoman: `gaawn loeek-ngaan, khuuan song dtaaw khaaw-muun reuuang ${item.roman} hai thiim`,
  exampleChinese: `下班前，应该把关于${item.chinese}的信息转交给团队。`,
  tag: item.tag,
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...confirmRows,
  ...explainRows,
  ...followRows,
  ...apologyRows,
  ...helpRows,
  ...handoffRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const comparisons: VocabularyExpansionComparison[] = [{ kind: "用法", target: { thai: "ขอโทษ", roman: "khaaw-thoot", chinese: "对不起/抱歉" }, distinctionZh: "轻度工作服务场景中可用“ขอโทษเรื่อง...”或“ขอโทษที่...”说明原因，不需要使用正式高阶公文表达。" }];
  const tags = ["a2", "低阶工作服务过渡", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons, collocations, usageNotesZh: ["A2 到 B1 过渡工作服务表达以确认、说明、跟进、轻度道歉为主，语气清楚即可。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons,
    collocations,
    usageNotesZh: ["用于基础工作、服务柜台、客服聊天和同事交接，不涉及高阶商务术语。"],
    tags,
    sourceRefs: BRIDGE_TO_B1_WORK_SERVICE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_BRIDGE_TO_B1_WORK_SERVICE_01 = rows.map(toCandidate);
