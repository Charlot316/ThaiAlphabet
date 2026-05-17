type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "高频动词" | "状态形容" | "功能短语" | "时间顺序" | "数量程度" | "沟通回应" | "生活搭配" | "小事处理";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2CoreReviewGaps04Candidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-a2-core-review-gaps-04", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `วันนี้ฉันฝึกใช้คำว่า${row.thai}ในประโยคสั้น ๆ`,
    roman: `wan-nii chan feuk chai kham waa ${row.roman} nai bpra-yook san san`,
    chinese: `今天我练习在短句里使用“${row.chinese}”。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2CoreReviewGaps04Candidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 是 A2 日常表达中可直接复用的基础搭配。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，复习时注意固定搭配和语气。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批用于 A2 核心查漏补缺，优先补动作、状态、功能短语和生活固定搭配。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
jak-gaan-dai|จัดการได้|jat-gaan dai|能处理|短语|高频动词|能力
jak-gaan-mai-dai|จัดการไม่ได้|jat-gaan mai dai|处理不了|短语|高频动词|能力
tham-hai-set|ทำให้เสร็จ|tham hai set|把它做完|动词|高频动词|完成
tham-khaang-wai|ทำค้างไว้|tham khaang wai|做到一半放着|动词|高频动词|进度
tham-dtaaw-phrung-nii|ทำต่อพรุ่งนี้|tham dtaaw phrung-nii|明天继续做|动词|高频动词|进度
roem-dton-mai|เริ่มต้นใหม่|roem-dton mai|重新开始|动词|高频动词|开始
roem-jaak-trong-nii|เริ่มจากตรงนี้|roem jaak dtrong nii|从这里开始|动词|高频动词|开始
yut-wai-gaawn|หยุดไว้ก่อน|yut wai gaawn|先停一下|动词|高频动词|暂停
phak-wai-gaawn|พักไว้ก่อน|phak wai gaawn|先搁置|动词|高频动词|暂停
kep-wai-chai|เก็บไว้ใช้|gep wai chai|留着使用|动词|高频动词|保留
kep-wai-duu|เก็บไว้ดู|gep wai duu|留着看|动词|高频动词|保留
ao-maa-chai|เอามาใช้|ao maa chai|拿来用|动词|高频动词|使用
ao-bpai-chai|เอาไปใช้|ao bpai chai|拿去用|动词|高频动词|使用
long-pik-duu|ลองปิดดู|laawng bpit duu|试着关掉看看|动词|高频动词|尝试
long-poet-duu|ลองเปิดดู|laawng bpoet duu|试着打开看看|动词|高频动词|尝试
long-bplian-duu|ลองเปลี่ยนดู|laawng bplian duu|试着换一下看看|动词|高频动词|尝试
long-rian-duu|ลองเรียนดู|laawng riian duu|试着学学看|动词|高频动词|尝试
long-fang-duu|ลองฟังดู|laawng fang duu|试着听听看|动词|高频动词|尝试
raw-duu-gaawn|รอดูก่อน|raaw duu gaawn|先等等看|动词|时间顺序|等待
raw-hai-phrom|รอให้พร้อม|raaw hai phraawm|等到准备好|动词|时间顺序|等待
phrom-laeo|พร้อมแล้ว|phraawm laeo|准备好了|短语|状态形容|状态
yang-mai-phrom|ยังไม่พร้อม|yang mai phraawm|还没准备好|短语|状态形容|状态
dtriiam-wai-laeo|เตรียมไว้แล้ว|dtriiam wai laeo|已经准备好了|短语|状态形容|准备
yang-mai-dtriiam|ยังไม่เตรียม|yang mai dtriiam|还没准备|短语|状态形容|准备
ngai-kheun|ง่ายขึ้น|ngaai kheun|变容易了|短语|状态形容|变化
yaak-kheun|ยากขึ้น|yaak kheun|变难了|短语|状态形容|变化
reo-kheun|เร็วขึ้น|reo kheun|变快了|短语|状态形容|变化
chaa-long|ช้าลง|chaa long|变慢了|短语|状态形容|变化
san-long|สั้นลง|san long|变短了|短语|状态形容|变化
yaao-kheun|ยาวขึ้น|yaao kheun|变长了|短语|状态形容|变化
nak-kheun|หนักขึ้น|nak kheun|变重了|短语|状态形容|变化
bao-long|เบาลง|bao long|变轻了|短语|状态形容|变化
naen-kheun|แน่นขึ้น|naen kheun|更紧了|短语|状态形容|变化
luam-long|หลวมลง|luam long|变松了|短语|状态形容|变化
suai-phaw|สวยพอ|suai phaaw|够漂亮|短语|状态形容|程度
dii-phaw|ดีพอ|dii phaaw|够好|短语|状态形容|程度
mai-dii-phaw|ไม่ดีพอ|mai dii phaaw|不够好|短语|状态形容|程度
mai-chat-phaw|ไม่ชัดพอ|mai chat phaaw|不够清楚|短语|状态形容|程度
chat-kheun|ชัดขึ้น|chat kheun|更清楚|短语|状态形容|变化
mai-khaang|ไม่ค้าง|mai khaang|不卡|短语|状态形容|状态
khaang-yuu|ค้างอยู่|khaang yuu|卡着|短语|状态形容|状态
phit-thii|ผิดที่|phit thii|位置错|短语|状态形容|错误
phit-wan|ผิดวัน|phit wan|日期错|短语|状态形容|错误
phit-khon|ผิดคน|phit khon|弄错人|短语|状态形容|错误
phit-an|ผิดอัน|phit an|拿错个|短语|状态形容|错误
thuuk-thii|ถูกที่|thuuk thii|位置正确|短语|状态形容|正确
thuuk-wan|ถูกวัน|thuuk wan|日期正确|短语|状态形容|正确
thuuk-khon|ถูกคน|thuuk khon|人对了|短语|状态形容|正确
thuuk-an|ถูกอัน|thuuk an|选对个|短语|状态形容|正确
mai-thuuk-dtong|ไม่ถูกต้อง|mai thuuk dtawng|不正确|短语|状态形容|正确
thuuk-dtong-laeo|ถูกต้องแล้ว|thuuk dtawng laeo|已经正确了|短语|状态形容|正确
tam-nii|ตามนี้|dtaam nii|就按这个|短语|功能短语|确认
tam-nan|ตามนั้น|dtaam nan|就按那个|短语|功能短语|确认
tam-thii-bawk|ตามที่บอก|dtaam thii baawk|按照说的|短语|功能短语|确认
tam-thii-khian|ตามที่เขียน|dtaam thii khiian|按照写的|短语|功能短语|确认
mai-dtong-riip|ไม่ต้องรีบ|mai dtawng riip|不用急|短语|功能短语|语气
riip-noi|รีบหน่อย|riip naawy|快一点|短语|功能短语|语气
cha-cha-noi|ช้า ๆ หน่อย|chaa chaa naawy|慢一点|短语|功能短语|语气
bao-bao-noi|เบา ๆ หน่อย|bao bao naawy|轻一点|短语|功能短语|语气
dang-noi|ดังหน่อย|dang naawy|大声一点|短语|功能短语|语气
ngiap-noi|เงียบหน่อย|ngiiap naawy|安静一点|短语|功能短语|语气
phaw-dii-laeo|พอดีแล้ว|phaaw-dii laeo|正好了|短语|数量程度|程度
mak-bpai-noi|มากไปหน่อย|maak bpai naawy|有点太多|短语|数量程度|程度
noi-bpai-noi|น้อยไปหน่อย|naawy bpai naawy|有点太少|短语|数量程度|程度
reo-bpai-noi|เร็วไปหน่อย|reo bpai naawy|有点太快|短语|数量程度|程度
chaa-bpai-noi|ช้าไปหน่อย|chaa bpai naawy|有点太慢|短语|数量程度|程度
yaao-bpai-noi|ยาวไปหน่อย|yaao bpai naawy|有点太长|短语|数量程度|程度
san-bpai-noi|สั้นไปหน่อย|san bpai naawy|有点太短|短语|数量程度|程度
yee-sip-gwaa|ยี่สิบกว่า|yii-sip gwaa|二十多|短语|数量程度|数量
saam-sip-gwaa|สามสิบกว่า|saam-sip gwaa|三十多|短语|数量程度|数量
khreung-chua-moong-gwaa|ครึ่งชั่วโมงกว่า|khreung chua-moong gwaa|半个多小时|短语|数量程度|数量
neung-chua-moong-gwaa|หนึ่งชั่วโมงกว่า|neung chua-moong gwaa|一个多小时|短语|数量程度|数量
mai-theung-sip|ไม่ถึงสิบ|mai theung sip|不到十|短语|数量程度|数量
goen-sip|เกินสิบ|goen sip|超过十|短语|数量程度|数量
bpra-maan-nii|ประมาณนี้|bpra-maan nii|大概这样|短语|数量程度|估计
bpra-maan-nan|ประมาณนั้น|bpra-maan nan|大概那样|短语|数量程度|估计
mai-dai-tang-jai|ไม่ได้ตั้งใจ|mai dai dtang-jai|不是故意的|短语|沟通回应|解释
dtang-jai-tham|ตั้งใจทำ|dtang-jai tham|有意做；认真做|动词|沟通回应|解释
khaaw-thoot-jing-jing|ขอโทษจริง ๆ|khaaw-thoot jing jing|真的抱歉|短语|沟通回应|道歉
mai-pen-rai-jing-jing|ไม่เป็นไรจริง ๆ|mai bpen rai jing jing|真的没关系|短语|沟通回应|回应
khaaw-khit-gaawn|ขอคิดก่อน|khaaw khit gaawn|让我先想想|短语|沟通回应|回应
khaaw-thaam-gaawn|ขอถามก่อน|khaaw thaam gaawn|让我先问问|短语|沟通回应|回应
khaaw-check-gaawn|ขอเช็กก่อน|khaaw chek gaawn|让我先查一下|短语|沟通回应|回应
fang-khao-jai|ฟังเข้าใจ|fang khao-jai|听懂|动词|沟通回应|理解
aan-khao-jai|อ่านเข้าใจ|aan khao-jai|看懂|动词|沟通回应|理解
phuut-mai-aawk|พูดไม่ออก|phuut mai aawk|说不出来|短语|沟通回应|表达
nuek-mai-aawk|นึกไม่ออก|neuk mai aawk|想不出来|短语|沟通回应|认知
ha-kham-mai-joe|หาคำไม่เจอ|haa kham mai joe|找不到词|短语|沟通回应|表达
chai-kham-ngai|ใช้คำง่าย|chai kham ngaai|用简单词|动词|沟通回应|表达
khaawng-thii-chai-bawy|ของที่ใช้บ่อย|khaawng thii chai baawy|常用的东西|名词|生活搭配|物品
khaawng-thii-mai-chai|ของที่ไม่ใช้|khaawng thii mai chai|不用的东西|名词|生活搭配|物品
khaawng-thii-luem|ของที่ลืม|khaawng thii leum|忘带的东西|名词|生活搭配|物品
khaawng-thii-haai|ของที่หาย|khaawng thii haai|丢失的东西|名词|生活搭配|物品
thii-wang-khaawng|ที่วางของ|thii waang khaawng|放东西的地方|名词|生活搭配|位置
thii-gep-khaawng|ที่เก็บของ|thii gep khaawng|收纳处|名词|生活搭配|位置
thii-nang-raw|ที่นั่งรอ|thii nang raaw|等候座位|名词|生活搭配|位置
thii-yuen-raw|ที่ยืนรอ|thii yeun raaw|站着等的地方|名词|生活搭配|位置
nam-bpai-duai|นำไปด้วย|nam bpai duai|带去|动词|生活搭配|动作
nam-glap-maa|นำกลับมา|nam glap maa|带回来|动词|生活搭配|动作
nam-khuen-bpai|นำขึ้นไป|nam kheun bpai|带上去|动词|生活搭配|动作
nam-long-maa|นำลงมา|nam long maa|带下来|动词|生活搭配|动作
dtid-wai-bon|ติดไว้บน|dtit wai bon|贴在上面|动词|小事处理|动作
dtid-wai-khang|ติดไว้ข้าง|dtit wai khaang|贴在旁边|动词|小事处理|动作
luut-aawk|หลุดออก|lut aawk|脱落|动词|小事处理|问题
dtid-glap|ติดกลับ|dtit glap|重新贴回去|动词|小事处理|处理
`;

export const VOCABULARY_EXPANSION_A2_CORE_REVIEW_GAPS_04: VocabularyExpansionA2CoreReviewGaps04Candidate[] = parseRows(RAW_ROWS).map(buildCandidate);
