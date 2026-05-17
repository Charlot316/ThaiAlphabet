type PartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
type Theme = "高频动词" | "功能短语" | "句框" | "时间安排" | "动作结果" | "沟通确认" | "生活处理" | "状态变化";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2CoreFinalReview05Candidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: PartOfSpeech;
  theme: Theme;
  level: "a2";
  priority: number;
  senses: Sense[];
  synonyms: Related[];
  antonyms: Related[];
  comparisons: Comparison[];
  collocations: Collocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

type Row = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: PartOfSpeech; theme: Theme; tag: string };
const SOURCE_REFS = ["thai-frequency", "thai-a2-core-final-review-05", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `เวลาพูดเรื่องทั่วไป ฉันใช้คำว่า${row.thai}ในประโยคง่าย ๆ ได้`,
    roman: `wee-laa phuut rueang thua-bpai chan chai kham waa ${row.roman} nai bpra-yook ngaai ngaai dai`,
    chinese: `谈普通事情时，我可以把“${row.chinese}”用在简单句子里。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2CoreFinalReview05Candidate {
  const related = rows[(index + 1) % rows.length];
  return {
    id: row.id,
    thai: row.thai,
    roman: row.roman,
    chinese: row.chinese,
    partOfSpeech: row.partOfSpeech,
    theme: row.theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 是 A2 核心复盘里适合补充的高频日常表达。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "用法", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，注意固定搭配和语气差别。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批用于 A2 核心最终复盘第五轮，专补高频日常动词、短语和句框。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
tham-hai-rian-roi|ทำให้เรียบร้อย|tham hai riiap-raawy|把它弄妥当|动词|动作结果|完成
tham-hai-trong|ทำให้ตรง|tham hai dtrong|弄直；弄对齐|动词|动作结果|整理
tham-hai-luang|ทำให้หลวม|tham hai luam|弄松一点|动词|动作结果|调整
tham-hai-naen|ทำให้แน่น|tham hai naen|弄紧一点|动词|动作结果|调整
tham-hai-bao|ทำให้เบา|tham hai bao|弄轻一点|动词|动作结果|调整
tham-hai-khaeng|ทำให้แข็ง|tham hai khaeng|弄硬一点|动词|动作结果|调整
tham-hai-nim|ทำให้นิ่ม|tham hai nim|弄软一点|动词|动作结果|调整
tham-hai-ngai|ทำให้ง่าย|tham hai ngaai|让它变简单|动词|动作结果|调整
tham-hai-yak|ทำให้ยาก|tham hai yaak|让它变难|动词|动作结果|变化
tham-hai-reo|ทำให้เร็ว|tham hai reo|让它快一点|动词|动作结果|调整
tham-hai-cha|ทำให้ช้า|tham hai chaa|让它慢一点|动词|动作结果|调整
tham-hai-ngiap|ทำให้เงียบ|tham hai ngiiap|让它安静|动词|动作结果|状态
tham-hai-dang|ทำให้ดัง|tham hai dang|让它大声|动词|动作结果|状态
tham-hai-sawan|ทำให้สว่าง|tham hai sa-waang|让它明亮|动词|动作结果|状态
tham-hai-muet|ทำให้มืด|tham hai muet|让它变暗|动词|动作结果|状态
tham-hai-lot-long|ทำให้ลดลง|tham hai lot long|让它减少|动词|动作结果|变化
tham-hai-phoem-kheun|ทำให้เพิ่มขึ้น|tham hai phoem kheun|让它增加|动词|动作结果|变化
dueng-wai|ดึงไว้|deung wai|拉住|动词|生活处理|动作
dan-wai|ดันไว้|dan wai|顶住；推住|动词|生活处理|动作
chap-wai|จับไว้|jap wai|抓住|动词|生活处理|动作
tham-wai|ทำไว้|tham wai|先做好|动词|生活处理|准备
dtriiam-wai-hai|เตรียมไว้ให้|dtriiam wai hai|帮忙准备好|短语|生活处理|准备
chong-wai-hai|จองไว้ให้|jaawng wai hai|帮忙预留好|短语|生活处理|预留
geep-wai-hai|เก็บไว้ให้|gep wai hai|帮忙留着|短语|生活处理|保留
rap-wai-hai|รับไว้ให้|rap wai hai|帮忙收下|短语|生活处理|接收
song-wai-hai|ส่งไว้ให้|song wai hai|先发给你|短语|生活处理|发送
khian-wai-hai|เขียนไว้ให้|khiian wai hai|帮忙写好|短语|生活处理|文字
jot-wai-hai|จดไว้ให้|jot wai hai|帮忙记下|短语|生活处理|记录
bpen-khrang-raek|เป็นครั้งแรก|bpen khrang raaek|是第一次|短语|句框|经历
bpen-khrang-sut-thai|เป็นครั้งสุดท้าย|bpen khrang sut-thaai|是最后一次|短语|句框|经历
mai-chai-khrang-raek|ไม่ใช่ครั้งแรก|mai chai khrang raaek|不是第一次|短语|句框|经历
khrang-naa-ja|ครั้งหน้าจะ|khrang naa ja|下次会|短语|句框|将来
khrang-nii-khaaw|ครั้งนี้ขอ|khrang nii khaaw|这次请允许|短语|句框|请求
rawk-naa-khaaw|รอบหน้าขอ|raawp naa khaaw|下一轮想要|短语|句框|将来
rawk-nii-ao|รอบนี้เอา|raawp nii ao|这一轮要|短语|句框|选择
thii-la-khrang|ทีละครั้ง|thii la khrang|一次一次地|副词|句框|顺序
thii-la-ruueang|ทีละเรื่อง|thii la rueang|一件一件事|副词|句框|顺序
thii-la-an|ทีละอัน|thii la an|一个一个地|副词|句框|顺序
thii-la-khon|ทีละคน|thii la khon|一个人一个人地|副词|句框|顺序
lang-jaak-nii|หลังจากนี้|lang jaak nii|从现在以后|短语|时间安排|时间
gaawn-naa-nii|ก่อนหน้านี้|gaawn naa nii|在这之前|短语|时间安排|时间
raw-welaa-nii|รอเวลานี้|raaw wee-laa nii|等这个时间|短语|时间安排|等待
raw-jang-wa|รอจังหวะ|raaw jang-wa|等时机|短语|时间安排|等待
mai-than-welaa|ไม่ทันเวลา|mai than wee-laa|赶不上时间|短语|时间安排|时间
than-phaa-dii|ทันพอดี|than phaaw-dii|刚好赶上|短语|时间安排|时间
goen-welaa|เกินเวลา|goen wee-laa|超过时间|短语|时间安排|时间
dtaw-welaa|ต่อเวลา|dtaaw wee-laa|延长时间|动词|时间安排|时间
leuan-welaa|เลื่อนเวลา|leuan wee-laa|改时间|动词|时间安排|时间
leuan-wan|เลื่อนวัน|leuan wan|改日期|动词|时间安排|日期
rak-sa-welaa|รักษาเวลา|rak-saa wee-laa|守时|动词|时间安排|时间
mai-rak-sa-welaa|ไม่รักษาเวลา|mai rak-saa wee-laa|不守时|短语|时间安排|时间
bpai-than|ไปทัน|bpai than|去得及|动词|时间安排|时间
glap-than|กลับทัน|glap than|回得及|动词|时间安排|时间
kin-than|กินทัน|gin than|来得及吃|动词|时间安排|时间
rian-than|เรียนทัน|riian than|跟得上学习|动词|时间安排|时间
tham-than|ทำทัน|tham than|做得及|动词|时间安排|时间
mai-than-tham|ไม่ทันทำ|mai than tham|来不及做|短语|时间安排|时间
mai-than-duu|ไม่ทันดู|mai than duu|来不及看|短语|时间安排|时间
mai-than-fang|ไม่ทันฟัง|mai than fang|来不及听|短语|时间安排|时间
dtong-riip-tham|ต้องรีบทำ|dtawng riip tham|得赶紧做|短语|功能短语|催促
dtong-riip-bpai|ต้องรีบไป|dtawng riip bpai|得赶紧去|短语|功能短语|催促
mai-dtong-riip-tham|ไม่ต้องรีบทำ|mai dtawng riip tham|不用急着做|短语|功能短语|语气
mai-dtong-riip-dtaawp|ไม่ต้องรีบตอบ|mai dtawng riip dtaawp|不用急着回复|短语|功能短语|语气
khaaw-duu-gaawn-na|ขอดูก่อนนะ|khaaw duu gaawn na|我先看看哦|短语|功能短语|缓冲
khaaw-thaam-gaawn-na|ขอถามก่อนนะ|khaaw thaam gaawn na|我先问一下哦|短语|功能短语|缓冲
khaaw-tham-gaawn-na|ขอทำก่อนนะ|khaaw tham gaawn na|我先做一下哦|短语|功能短语|缓冲
khaaw-khit-iik-noi|ขอคิดอีกหน่อย|khaaw khit iik naawy|让我再想一下|短语|功能短语|缓冲
diaao-baawk-iik-thii|เดี๋ยวบอกอีกที|diaao baawk iik thii|等会儿再告诉你|短语|功能短语|缓冲
diaao-song-hai|เดี๋ยวส่งให้|diaao song hai|等会儿发给你|短语|功能短语|缓冲
diaao-tham-hai|เดี๋ยวทำให้|diaao tham hai|等会儿帮你做|短语|功能短语|缓冲
diaao-check-hai|เดี๋ยวเช็กให้|diaao chek hai|等会儿帮你查|短语|功能短语|缓冲
diaao-glap-maa|เดี๋ยวกลับมา|diaao glap maa|等会儿回来|短语|功能短语|时间
diaao-tho-glap|เดี๋ยวโทรกลับ|diaao thoo glap|等会儿回电话|短语|功能短语|联系
thuk-dtong-mai|ถูกต้องไหม|thuuk dtawng mai|正确吗|短语|沟通确认|确认
trong-nii-mai|ตรงนี้ไหม|dtrong nii mai|是这里吗|短语|沟通确认|确认
baep-nii-mai|แบบนี้ไหม|baaep nii mai|是这样吗|短语|沟通确认|确认
khanaat-nii-mai|ขนาดนี้ไหม|kha-naat nii mai|这个尺寸吗|短语|沟通确认|确认
sii-nii-mai|สีนี้ไหม|sii nii mai|这个颜色吗|短语|沟通确认|确认
jamnuan-nii-mai|จำนวนนี้ไหม|jam-nuan nii mai|这个数量吗|短语|沟通确认|确认
khon-nii-mai|คนนี้ไหม|khon nii mai|这个人吗|短语|沟通确认|确认
wan-nii-mai|วันนี้ไหม|wan nii mai|今天吗|短语|沟通确认|确认
phrung-nii-mai|พรุ่งนี้ไหม|phrung-nii mai|明天吗|短语|沟通确认|确认
ao-thuk-mai|เอาถูกไหม|ao thuuk mai|拿对了吗|短语|沟通确认|确认
tham-thuk-mai|ทำถูกไหม|tham thuuk mai|做对了吗|短语|沟通确认|确认
song-thuk-mai|ส่งถูกไหม|song thuuk mai|发对了吗|短语|沟通确认|确认
khian-thuk-laeo|เขียนถูกแล้ว|khiian thuuk laeo|已经写对了|短语|沟通确认|确认
aan-thuk-laeo|อ่านถูกแล้ว|aan thuuk laeo|已经读对了|短语|沟通确认|确认
khao-jai-trong-kan-laeo|เข้าใจตรงกันแล้ว|khao-jai dtrong gan laeo|理解已经一致了|短语|沟通确认|确认
yang-mai-trong-kan|ยังไม่ตรงกัน|yang mai dtrong gan|还不一致|短语|沟通确认|确认
yang-khaat-yuu|ยังขาดอยู่|yang khaat yuu|还缺着|短语|状态变化|缺少
khaat-iik-neung|ขาดอีกหนึ่ง|khaat iik neung|还差一个|短语|状态变化|缺少
khaat-nit-noi|ขาดนิดหน่อย|khaat nit naawy|差一点点|短语|状态变化|缺少
goen-nit-noi|เกินนิดหน่อย|goen nit naawy|多一点点|短语|状态变化|数量
phaw-laeo-na|พอแล้วนะ|phaaw laeo na|够了哦|短语|状态变化|数量
yang-mai-phaw-na|ยังไม่พอนะ|yang mai phaaw na|还不够哦|短语|状态变化|数量
khrop-laeo-na|ครบแล้วนะ|khrop laeo na|齐了哦|短语|状态变化|数量
yang-mai-khrop-na|ยังไม่ครบนะ|yang mai khrop na|还没齐哦|短语|状态变化|数量
`;

export const VOCABULARY_EXPANSION_A2_CORE_FINAL_REVIEW_05: VocabularyExpansionA2CoreFinalReview05Candidate[] = parseRows(RAW_ROWS).map(buildCandidate);
