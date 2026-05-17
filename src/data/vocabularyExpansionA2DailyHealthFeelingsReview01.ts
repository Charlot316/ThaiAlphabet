type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "轻微疼痛" | "不舒服" | "疲惫压力" | "睡眠休息" | "好转未愈" | "需要照顾" | "情绪感觉" | "日常健康";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2DailyHealthFeelingsReviewCandidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-daily-health-feelings-review", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `วันนี้ฉันรู้สึก${row.thai} เลยอยากพักผ่อนให้มากขึ้น`,
    roman: `wan-nii chan ruu-seuk ${row.roman} loei yaak phak-phaawn hai maak kheun`,
    chinese: `今天我感觉“${row.chinese}”，所以想多休息。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2DailyHealthFeelingsReviewCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于说明身体感觉、轻微症状、压力、休息和恢复情况。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，描述健康时要说明程度、时间和是否好转。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["描述身体状况时可加 นิดหน่อย、มาก、ยัง、ดีขึ้น、ไม่หาย 来表达程度和变化。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
bpuat-hua-nit-noi|ปวดหัวนิดหน่อย|bpuat hua nit naawy|有点头痛|短语|轻微疼痛|头痛
bpuat-hua-mak|ปวดหัวมาก|bpuat hua maak|头很痛|短语|轻微疼痛|头痛
bpuat-thaawng-nit-noi|ปวดท้องนิดหน่อย|bpuat thaawng nit naawy|有点肚子痛|短语|轻微疼痛|肚子
bpuat-thaawng-mak|ปวดท้องมาก|bpuat thaawng maak|肚子很痛|短语|轻微疼痛|肚子
bpuat-lang|ปวดหลัง|bpuat lang|背痛|短语|轻微疼痛|疼痛
bpuat-khaa|ปวดขา|bpuat khaa|腿痛|短语|轻微疼痛|疼痛
bpuat-khaeng|ปวดแขน|bpuat khaen|胳膊痛|短语|轻微疼痛|疼痛
bpuat-khaw|ปวดคอ|bpuat khaaw|脖子痛|短语|轻微疼痛|疼痛
jep-khaw|เจ็บคอ|jep khaaw|喉咙痛|短语|轻微疼痛|喉咙
jep-fan|เจ็บฟัน|jep fan|牙痛|短语|轻微疼痛|牙
jep-dtaa|เจ็บตา|jep dtaa|眼睛痛|短语|轻微疼痛|眼
jep-huu|เจ็บหู|jep huu|耳朵痛|短语|轻微疼痛|耳
meuua-dtua|เมื่อยตัว|meuai dtua|身体酸|短语|轻微疼痛|酸痛
meuua-khaa|เมื่อยขา|meuai khaa|腿酸|短语|轻微疼痛|酸痛
meuua-lang|เมื่อยหลัง|meuai lang|背酸|短语|轻微疼痛|酸痛
aa-gaan-bao-bao|อาการเบา ๆ|aa-gaan bao bao|症状轻微|名词|不舒服|症状
mai-sabai|ไม่สบาย|mai sa-baai|不舒服；生病|短语|不舒服|状态
mai-khoi-sabai|ไม่ค่อยสบาย|mai khaawy sa-baai|不太舒服|短语|不舒服|状态
ruu-seuk-mai-dii|รู้สึกไม่ดี|ruu-seuk mai dii|感觉不好|短语|不舒服|感觉
ruu-seuk-wean-hua|รู้สึกเวียนหัว|ruu-seuk wiian hua|感觉头晕|短语|不舒服|头晕
wean-hua|เวียนหัว|wiian hua|头晕|动词|不舒服|头晕
khluen-sai|คลื่นไส้|khleun-sai|恶心|动词|不舒服|胃
aa-jiian|อาเจียน|aa-jiian|呕吐|动词|不舒服|胃
thaawng-siia|ท้องเสีย|thaawng siia|拉肚子|动词|不舒服|胃
thaawng-phuuk|ท้องผูก|thaawng phuuk|便秘|动词|不舒服|胃
mee-khai|มีไข้|mii khai|发烧|短语|不舒服|发烧
khai-dtam|ไข้ต่ำ|khai dtam|低烧|名词|不舒服|发烧
khai-suung|ไข้สูง|khai suung|高烧|名词|不舒服|发烧
dtua-ron|ตัวร้อน|dtua raawn|身体发热|短语|不舒服|发烧
dtua-yen|ตัวเย็น|dtua yen|身体发冷|短语|不舒服|发冷
naao-san|หนาวสั่น|naao san|发冷发抖|动词|不舒服|发冷
ai-nit-noi|ไอนิดหน่อย|ai nit naawy|有点咳嗽|短语|不舒服|咳嗽
jamuk-dtan|จมูกตัน|ja-muuk dtan|鼻塞|短语|不舒服|鼻子
nam-muuk-lai|น้ำมูกไหล|naam-muuk lai|流鼻涕|短语|不舒服|鼻子
jam|จาม|jaam|打喷嚏|动词|不舒服|鼻子
phrae-fun|แพ้ฝุ่น|phaae fun|灰尘过敏|动词|不舒服|过敏
phrae-aa-gaat|แพ้อากาศ|phaae aa-gaat|空气/天气过敏|动词|不舒服|过敏
khun-khaw|คันคอ|khan khaaw|嗓子痒|短语|不舒服|喉咙
khun-dtaa|คันตา|khan dtaa|眼睛痒|短语|不舒服|眼
neuuai|เหนื่อย|neuuai|累|形容词|疲惫压力|疲惫
neuuai-mak|เหนื่อยมาก|neuuai maak|很累|短语|疲惫压力|疲惫
laa|ล้า|laa|疲乏|形容词|疲惫压力|疲惫
on-pha-liia|อ่อนเพลีย|aawn-phliia|乏力|形容词|疲惫压力|疲惫
mai-mii-raeng|ไม่มีแรง|mai mii raaeng|没力气|短语|疲惫压力|疲惫
nguang|ง่วง|nguang|困|形容词|疲惫压力|困
nguang-mak|ง่วงมาก|nguang maak|很困|短语|疲惫压力|困
khriat|เครียด|khriiat|压力大|形容词|疲惫压力|压力
khriat-nit-noi|เครียดนิดหน่อย|khriiat nit naawy|有点压力|短语|疲惫压力|压力
kit-mak|คิดมาก|khit maak|想太多|动词|疲惫压力|压力
mai-sabaai-jai|ไม่สบายใจ|mai sa-baai jai|心里不舒服|短语|疲惫压力|情绪
fang-sabson|ฟังสับสน|fang sap-son|听得混乱|短语|疲惫压力|认知
samathi-mai-dii|สมาธิไม่ดี|sa-maa-thi mai dii|注意力不好|短语|疲惫压力|认知
naawn-mai-lap|นอนไม่หลับ|naawn mai lap|睡不着|动词|睡眠休息|睡眠
naawn-mai-phaw|นอนไม่พอ|naawn mai phaaw|睡不够|短语|睡眠休息|睡眠
naawn-deuk|นอนดึก|naawn deuk|晚睡|动词|睡眠休息|睡眠
dteun-baw-y|ตื่นบ่อย|dteun baawy|经常醒|动词|睡眠休息|睡眠
fan-raai|ฝันร้าย|fan raai|做噩梦|动词|睡眠休息|睡眠
naawn-laap|นอนหลับ|naawn lap|睡着|动词|睡眠休息|睡眠
phak-sak-khruu|พักสักครู่|phak sak khruu|休息一下|动词|睡眠休息|休息
dtawng-phak|ต้องพัก|dtawng phak|需要休息|短语|睡眠休息|休息
phak-hai-phaw|พักให้พอ|phak hai phaaw|休息够|动词|睡眠休息|休息
yut-phak|หยุดพัก|yut phak|暂停休息|动词|睡眠休息|休息
noi-long|น้อยลง|naawy long|减少了|短语|好转未愈|变化
maak-kheun|มากขึ้น|maak kheun|增加了|短语|好转未愈|变化
dii-kheun|ดีขึ้น|dii kheun|好转了|短语|好转未愈|好转
dii-kheun-mak|ดีขึ้นมาก|dii kheun maak|好多了|短语|好转未愈|好转
dii-kheun-nit-noi|ดีขึ้นนิดหน่อย|dii kheun nit naawy|好了一点|短语|好转未愈|好转
yang-mai-haai|ยังไม่หาย|yang mai haai|还没好|短语|好转未愈|未愈
yang-bpuai-yuu|ยังป่วยอยู่|yang bpuai yuu|还在生病|短语|好转未愈|未愈
aa-gaan-yang-yuu|อาการยังอยู่|aa-gaan yang yuu|症状还在|短语|好转未愈|未愈
aa-gaan-glap-maa|อาการกลับมา|aa-gaan glap maa|症状又回来了|短语|好转未愈|复发
aa-gaan-nak-kheun|อาการหนักขึ้น|aa-gaan nak kheun|症状加重|短语|好转未愈|加重
haai-laeo|หายแล้ว|haai laeo|已经好了|短语|好转未愈|好转
klai-haai|ใกล้หาย|glai haai|快好了|短语|好转未愈|好转
duu-aa-gaan|ดูอาการ|duu aa-gaan|观察症状|动词|需要照顾|照顾
gin-yaa|กินยา|gin yaa|吃药|动词|需要照顾|用药
gin-yaa-hai-dtrong-weelaa|กินยาให้ตรงเวลา|gin yaa hai dtrong wee-laa|按时吃药|动词|需要照顾|用药
duem-naam-un|ดื่มน้ำอุ่น|duem naam un|喝温水|动词|需要照顾|照顾
duem-naam-mak-kheun|ดื่มน้ำมากขึ้น|duem naam maak kheun|多喝水|动词|需要照顾|照顾
gin-aa-haan-aawn|กินอาหารอ่อน|gin aa-haan aawn|吃软食|动词|需要照顾|饮食
ya-gin-khaawng-yen|อย่ากินของเย็น|yaa gin khaawng yen|不要吃冰冷食物|短语|需要照顾|饮食
ya-aawk-gamlang-mak|อย่าออกกำลังมาก|yaa aawk-gam-lang maak|不要剧烈运动|短语|需要照顾|休息
bpai-haa-maaw|ไปหาหมอ|bpai haa maaw|去看医生|动词|需要照顾|就医
khaaw-laa-bpuai|ขอลาป่วย|khaaw laa bpuai|请病假|动词|需要照顾|请假
ruu-seuk-ngao|รู้สึกเหงา|ruu-seuk ngao|感到孤单|短语|情绪感觉|情绪
ruu-seuk-glua|รู้สึกกลัว|ruu-seuk glua|感到害怕|短语|情绪感觉|情绪
ruu-seuk-gaan-won|รู้สึกกังวล|ruu-seuk gang-won|感到担心|短语|情绪感觉|情绪
ruu-seuk-sabaai-jai|รู้สึกสบายใจ|ruu-seuk sa-baai jai|感到安心|短语|情绪感觉|情绪
ruu-seuk-dii-jai|รู้สึกดีใจ|ruu-seuk dii-jai|感到高兴|短语|情绪感觉|情绪
ruu-seuk-sia-jai|รู้สึกเสียใจ|ruu-seuk siia-jai|感到难过|短语|情绪感觉|情绪
jai-yen-long|ใจเย็นลง|jai yen long|冷静下来|动词|情绪感觉|情绪
dtok-jai|ตกใจ|dtok-jai|吓一跳|动词|情绪感觉|情绪
ruu-seuk-buea|รู้สึกเบื่อ|ruu-seuk beua|感到无聊；厌烦|短语|情绪感觉|情绪
mai-yaak-tham-arai|ไม่อยากทำอะไร|mai yaak tham a-rai|什么都不想做|短语|疲惫压力|情绪
khaaw-phak-neung-wan|ขอพักหนึ่งวัน|khaaw phak neung wan|请求休息一天|短语|睡眠休息|休息
dtong-naawn-reo|ต้องนอนเร็ว|dtawng naawn reo|需要早睡|短语|睡眠休息|睡眠
`;

export const VOCABULARY_EXPANSION_A2_DAILY_HEALTH_FEELINGS_REVIEW_01: VocabularyExpansionA2DailyHealthFeelingsReviewCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
