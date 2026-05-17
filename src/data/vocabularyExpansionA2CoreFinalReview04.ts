type PartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
type Theme = "高频动词" | "状态形容" | "副词程度" | "句框" | "时间顺序" | "位置方向" | "生活动作" | "沟通功能" | "不确定";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2CoreFinalReview04Candidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-a2-core-final-review-04", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `ในชีวิตประจำวัน ฉันใช้คำว่า${row.thai}กับเรื่องง่าย ๆ ได้`,
    roman: `nai chii-wit bpra-jam-wan chan chai kham waa ${row.roman} gap rueang ngaai ngaai dai`,
    chinese: `在日常生活中，我可以把“${row.chinese}”用在简单事情上。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2CoreFinalReview04Candidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 是 A2 核心复盘中适合补入的日常高频表达。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，注意动作、状态或句框的搭配。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批用于 A2 核心最终复盘第四轮，补高频动词、形容词、副词和句框。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
dtruat-duu|ตรวจดู|dtruat duu|检查看看|动词|高频动词|检查
check-duu-iik|เช็กดูอีก|chek duu iik|再查查看|动词|高频动词|检查
rian-ruu|เรียนรู้|riian ruu|学习了解|动词|高频动词|学习
tham-khwaam-khao-jai|ทำความเข้าใจ|tham khwaam khao-jai|弄明白|动词|高频动词|理解
jam-wai|จำไว้|jam wai|记住|动词|高频动词|记忆
luem-wai|ลืมไว้|leum wai|忘在某处|动词|高频动词|遗忘
nuek-theung|นึกถึง|neuk theung|想到|动词|高频动词|思考
nuek-dai|นึกได้|neuk dai|想起来|动词|高频动词|思考
ha-joe-laeo|หาเจอแล้ว|haa joe laeo|已经找到了|短语|高频动词|寻找
ha-yang-mai-joe|หายังไม่เจอ|haa yang mai joe|还没找到|短语|高频动词|寻找
yip-maa|หยิบมา|yip maa|拿过来|动词|生活动作|拿放
yip-bpai|หยิบไป|yip bpai|拿走|动词|生活动作|拿放
waang-glap|วางกลับ|waang glap|放回去|动词|生活动作|拿放
waang-khaang-laang|วางไว้ข้างล่าง|waang wai khaang laang|放在下面|动词|位置方向|拿放
waang-khaang-bon|วางไว้ข้างบน|waang wai khaang bon|放在上面|动词|位置方向|拿放
waang-klai|วางใกล้|waang glai|放近一点|动词|位置方向|拿放
waang-hai-hang|วางให้ห่าง|waang hai haang|放远一点|动词|位置方向|拿放
yaai-khao|ย้ายเข้า|yaai khao|搬进去|动词|位置方向|移动
yaai-aawk|ย้ายออก|yaai aawk|搬出去|动词|位置方向|移动
yaai-khuen|ย้ายขึ้น|yaai kheun|搬上去|动词|位置方向|移动
yaai-long|ย้ายลง|yaai long|搬下来|动词|位置方向|移动
dueng-khao|ดึงเข้า|deung khao|拉进去|动词|位置方向|动作
dueng-aawk|ดึงออก|deung aawk|拉出来|动词|位置方向|动作
dan-khao|ดันเข้า|dan khao|推进去|动词|位置方向|动作
dan-aawk|ดันออก|dan aawk|推出来|动词|位置方向|动作
ruam-gan|รวมกัน|ruam gan|合在一起|动词|高频动词|整理
yaek-gan|แยกกัน|yaaek gan|分开|动词|高频动词|整理
yaek-wai|แยกไว้|yaaek wai|分开放着|动词|生活动作|整理
ruam-wai|รวมไว้|ruam wai|合放在一起|动词|生活动作|整理
jad-hai-pen-ra-biap|จัดให้เป็นระเบียบ|jat hai bpen ra-biiap|整理有序|动词|生活动作|整理
tham-hai-sa-aat|ทำให้สะอาด|tham hai sa-aat|弄干净|动词|生活动作|清洁
tham-hai-haeng|ทำให้แห้ง|tham hai haaeng|弄干|动词|生活动作|清洁
tham-hai-yen|ทำให้เย็น|tham hai yen|弄凉|动词|生活动作|温度
tham-hai-rorn|ทำให้ร้อน|tham hai raawn|弄热|动词|生活动作|温度
poet-khaang-wai|เปิดค้างไว้|bpoet khaang wai|开着没关|动词|生活动作|开关
bpit-khaang-wai|ปิดค้างไว้|bpit khaang wai|关着没开|动词|生活动作|开关
plian-thii|เปลี่ยนที่|bplian thii|换地方|动词|高频动词|更换
plian-welaa|เปลี่ยนเวลา|bplian wee-laa|换时间|动词|高频动词|更换
plian-khanaat|เปลี่ยนขนาด|bplian kha-naat|换尺寸|动词|高频动词|更换
plian-sii|เปลี่ยนสี|bplian sii|换颜色|动词|高频动词|更换
song-dtaaw|ส่งต่อ|song dtaaw|转发；交给下一人|动词|沟通功能|传递
rap-dtaaw|รับต่อ|rap dtaaw|接着接收|动词|沟通功能|传递
baawk-dtaaw|บอกต่อ|baawk dtaaw|转告|动词|沟通功能|传递
tham-dtaaw|ทำต่อ|tham dtaaw|继续做|动词|时间顺序|继续
rian-dtaaw|เรียนต่อ|riian dtaaw|继续学习|动词|时间顺序|继续
phak-dtaaw|พักต่อ|phak dtaaw|继续休息|动词|时间顺序|继续
raw-dtaaw|รอต่อ|raaw dtaaw|继续等|动词|时间顺序|继续
tid-dtam|ติดตาม|dtit-dtaam|跟进|动词|高频动词|跟进
tid-dtaaw-glap|ติดต่อกลับ|dtit-dtaaw glap|回头联系|动词|沟通功能|联系
dtaawp-glap|ตอบกลับ|dtaawp glap|回复|动词|沟通功能|回复
song-glap|ส่งกลับ|song glap|寄回；发回|动词|沟通功能|返回
riap-ngai|เรียบง่าย|riiap ngaai|简单朴素|形容词|状态形容|评价
chai-dai-ngai|ใช้ได้ง่าย|chai dai ngaai|容易使用|短语|状态形容|评价
chai-dai-dii|ใช้ได้ดี|chai dai dii|用得不错|短语|状态形容|评价
phaw-chai-dai|พอใช้ได้|phaaw chai dai|还可以用|短语|状态形容|评价
na-chai|น่าใช้|naa chai|值得用|形容词|状态形容|评价
na-gin|น่ากิน|naa gin|看起来好吃|形容词|状态形容|评价
na-duu|น่าดู|naa duu|值得看|形容词|状态形容|评价
na-rian|น่าเรียน|naa riian|值得学|形容词|状态形容|评价
na-seu|น่าซื้อ|naa seu|值得买|形容词|状态形容|评价
mai-na-seu|ไม่น่าซื้อ|mai naa seu|不太值得买|形容词|状态形容|评价
sa-duak-dii|สะดวกดี|sa-duak dii|挺方便|短语|状态形容|方便
mai-saduak-loei|ไม่สะดวกเลย|mai sa-duak loei|一点也不方便|短语|状态形容|方便
phrom-chai|พร้อมใช้|phraawm chai|可直接使用|形容词|状态形容|状态
phrom-gin|พร้อมกิน|phraawm gin|可以直接吃|形容词|状态形容|状态
phrom-song|พร้อมส่ง|phraawm song|可直接发送|形容词|状态形容|状态
tem-mot|เต็มหมด|dtem mot|全满了|短语|状态形容|数量
wang-mot|ว่างหมด|waang mot|全空着|短语|状态形容|数量
luea-noi|เหลือน้อย|leua naawy|剩得少|短语|状态形容|数量
luea-ye|เหลือเยอะ|leua yoe|剩得多|短语|状态形容|数量
mai-phaw-loei|ไม่พอเลย|mai phaaw loei|完全不够|短语|状态形容|数量
glai-phrom|ใกล้พร้อม|glai phraawm|快准备好了|短语|状态形容|准备
glai-mue|ใกล้มือ|glai mue|随手可拿|形容词|位置方向|位置
glai-dtua|ใกล้ตัว|glai dtua|身边的|形容词|位置方向|位置
klai-dtua|ไกลตัว|glai dtua|离自己远的|形容词|位置方向|位置
dtrong-glang|ตรงกลาง|dtrong glaang|正中间|名词|位置方向|位置
rim-sut|ริมสุด|rim sut|最边上|名词|位置方向|位置
khaang-nai-sut|ข้างในสุด|khaang nai sut|最里面|名词|位置方向|位置
khaang-naawk-sut|ข้างนอกสุด|khaang naawk sut|最外面|名词|位置方向|位置
mai-khoi|ไม่ค่อย|mai khaawy|不太|副词|副词程度|程度
khaawn-khaang|ค่อนข้าง|khaawn-khaang|比较；相当|副词|副词程度|程度
geuap-ja|เกือบจะ|geuap ja|差点；快要|副词|副词程度|程度
phueng-ja|เพิ่งจะ|phoeng ja|刚刚才|副词|时间顺序|时间
gamlang-ja|กำลังจะ|gam-lang ja|正要|副词|时间顺序|时间
ja-dtong|จะต้อง|ja dtawng|将必须|短语|句框|句框
na-ja|น่าจะ|naa ja|应该会；可能会|副词|不确定|推测
khong-ja|คงจะ|khong ja|大概会|副词|不确定|推测
at-ja|อาจจะ|aat ja|也许会|副词|不确定|推测
yang-khong|ยังคง|yang khong|仍然|副词|副词程度|持续
mai-khoei-loei|ไม่เคยเลย|mai khoei loei|从来没有|副词|副词程度|经历
khoei-baang|เคยบ้าง|khoei baang|有时经历过|短语|副词程度|经历
bpen-baang-khrang|เป็นบางครั้ง|bpen baang khrang|有时候会|副词|副词程度|频率
thuk-khrang-thii|ทุกครั้งที่|thuk khrang thii|每次当|短语|句框|句框
thaa-mii-welaa|ถ้ามีเวลา|thaa mii wee-laa|如果有时间|短语|句框|条件
thaa-mai-saduak|ถ้าไม่สะดวก|thaa mai sa-duak|如果不方便|短语|句框|条件
thaa-tham-dai|ถ้าทำได้|thaa tham dai|如果能做|短语|句框|条件
thaa-mai-dai|ถ้าไม่ได้|thaa mai dai|如果不行|短语|句框|条件
phraw-baep-nii|เพราะแบบนี้|phraw baaep nii|因为这样|短语|句框|原因
loei-dtong|เลยต้อง|loei dtawng|所以必须|短语|句框|结果
loei-mai-dai|เลยไม่ได้|loei mai dai|所以没能|短语|句框|结果
laeo-khaawy|แล้วค่อย|laeo khaawy|然后再|短语|时间顺序|顺序
gaawn-laeo-khaawy|ก่อนแล้วค่อย|gaawn laeo khaawy|先做再说|短语|时间顺序|顺序
diaao-khaawy|เดี๋ยวค่อย|diaao khaawy|等会儿再|短语|时间顺序|顺序
wan-lang-khaawy|วันหลังค่อย|wan lang khaawy|改天再|短语|时间顺序|顺序
khoei-khit-wa|เคยคิดว่า|khoei khit waa|曾经以为|短语|句框|想法
khit-yuu-wa|คิดอยู่ว่า|khit yuu waa|正在想|短语|句框|想法
yang-khit-mai-aawk|ยังคิดไม่ออก|yang khit mai aawk|还想不出来|短语|沟通功能|表达
phuut-thueng|พูดถึง|phuut theung|提到|动词|沟通功能|表达
thaam-thueng|ถามถึง|thaam theung|问到|动词|沟通功能|表达
khian-thueng|เขียนถึง|khiian theung|写到|动词|沟通功能|表达
`;

export const VOCABULARY_EXPANSION_A2_CORE_FINAL_REVIEW_04: VocabularyExpansionA2CoreFinalReview04Candidate[] = parseRows(RAW_ROWS).map(buildCandidate);
