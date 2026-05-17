type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "经过绕过" | "靠近远离" | "离开到达" | "搬动移动" | "停放放置" | "上下楼" | "对面旁边" | "日常位置";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2EverydayLocationMovementCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-everyday-location-movement-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  if (row.partOfSpeech === "名词") {
    return {
      thai: `เขาใช้${row.thai}ตามที่บอกไว้ในข้อความ`,
      roman: `khao chai ${row.roman} dtaam thii baawk wai nai khaaw-khwaam`,
      chinese: `他按照消息里说的使用“${row.chinese}”。`,
    };
  }
  if (row.thai.startsWith("ห้าม")) {
    return {
      thai: `เขาเห็นป้าย${row.thai}ตามที่บอกไว้ในข้อความ`,
      roman: `khao hen bpaai ${row.roman} dtaam thii baawk wai nai khaaw-khwaam`,
      chinese: `他按照消息里说的看到了“${row.chinese}”的牌子。`,
    };
  }
  return {
    thai: `เขา${row.thai}ตามที่บอกไว้ในข้อความ`,
    roman: `khao ${row.roman} dtaam thii baawk wai nai khaaw-khwaam`,
    chinese: `他按照消息里说的“${row.chinese}”。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2EverydayLocationMovementCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于说明位置、移动路线、放置物品或上下楼。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，说位置和路线时要注意方向和参照物。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["说位置移动时，可搭配 ไป、มา、อยู่、วาง、ย้าย、ผ่าน、ใกล้、ตรงข้าม 来表达路线和地点。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
doen-phan|เดินผ่าน|doen phaan|走过；经过|动词|经过绕过|路线
phan-naa-raan|ผ่านหน้าร้าน|phaan naa raan|经过店门口|动词|经过绕过|路线
phan-sathanii|ผ่านสถานี|phaan sa-thaa-nii|经过车站|动词|经过绕过|路线
phan-saphan|ผ่านสะพาน|phaan sa-phaan|经过桥|动词|经过绕过|路线
phan-talaat|ผ่านตลาด|phaan dta-laat|经过市场|动词|经过绕过|路线
doen-aawm|เดินอ้อม|doen aawm|绕路走|动词|经过绕过|路线
aawm-tuek|อ้อมตึก|aawm dteuk|绕过楼|动词|经过绕过|路线
aawm-lan-jawt-rot|อ้อมลานจอดรถ|aawm laan jaawt rot|绕过停车场|动词|经过绕过|路线
aawm-khaang-lang|อ้อมข้างหลัง|aawm khaang lang|绕到后面|动词|经过绕过|路线
doen-lat|เดินลัด|doen lat|走近路|动词|经过绕过|路线
thaang-lat|ทางลัด|thaang lat|近路|名词|经过绕过|路线
thaang-aawm|ทางอ้อม|thaang aawm|绕路|名词|经过绕过|路线
doen-dtrong-bpai|เดินตรงไป|doen dtrong bpai|一直走|动词|经过绕过|方向
liao-saai|เลี้ยวซ้าย|liao saai|左转|动词|经过绕过|方向
liao-khwaa|เลี้ยวขวา|liao khwaa|右转|动词|经过绕过|方向
glap-lang|กลับหลัง|glap lang|往回走|动词|经过绕过|方向
doen-khaam-thanon|เดินข้ามถนน|doen khaam tha-non|过马路|动词|对面旁边|移动
khaam-saphan|ข้ามสะพาน|khaam sa-phaan|过桥|动词|对面旁边|移动
khaam-bpai-fang-noon|ข้ามไปฝั่งโน้น|khaam bpai fang noon|过到那边|动词|对面旁边|移动
yuu-trong-khaam|อยู่ตรงข้าม|yuu dtrong khaam|在对面|短语|对面旁边|位置
bpai-fang-trong-khaam|ไปฝั่งตรงข้าม|bpai fang dtrong khaam|去对面|动词|对面旁边|移动
raw-yuu-fang-nii|รออยู่ฝั่งนี้|raaw yuu fang nii|在这边等|动词|对面旁边|位置
yuu-khaang-khaang|อยู่ข้าง ๆ|yuu khaang khaang|在旁边|短语|对面旁边|位置
yuu-khaang-naa|อยู่ข้างหน้า|yuu khaang naa|在前面|短语|日常位置|位置
yuu-khaang-lang|อยู่ข้างหลัง|yuu khaang lang|在后面|短语|日常位置|位置
yuu-daan-sai|อยู่ด้านซ้าย|yuu daan saai|在左边|短语|日常位置|位置
yuu-daan-khwaa|อยู่ด้านขวา|yuu daan khwaa|在右边|短语|日常位置|位置
yuu-trong-glaang|อยู่ตรงกลาง|yuu dtrong glaang|在中间|短语|日常位置|位置
yuu-rim-thaang|อยู่ริมทาง|yuu rim thaang|在路边|短语|日常位置|位置
yuu-mum-haawng|อยู่มุมห้อง|yuu mum haawng|在房间角落|短语|日常位置|位置
yuu-glai-pratu|อยู่ใกล้ประตู|yuu glai bpra-dtuu|在门附近|短语|靠近远离|位置
yuu-glai-lift|อยู่ใกล้ลิฟต์|yuu glai lif|在电梯附近|短语|靠近远离|位置
yuu-glai-hong-naam|อยู่ใกล้ห้องน้ำ|yuu glai haawng-naam|在洗手间附近|短语|靠近远离|位置
yuu-glai-baan|อยู่ใกล้บ้าน|yuu glai baan|离家近|短语|靠近远离|位置
yuu-glai-gaan|อยู่ใกล้กัน|yuu glai gan|彼此靠近|短语|靠近远离|位置
khao-glai|เข้าใกล้|khao glai|靠近|动词|靠近远离|移动
yao-khao-glai|อย่าเข้าใกล้|yaa khao glai|不要靠近|短语|靠近远离|提醒
haang-jaak|ห่างจาก|haang jaak|离……远|短语|靠近远离|位置
yuu-haang|อยู่ห่าง|yuu haang|距离远|短语|靠近远离|位置
thoi-aawk-maa|ถอยออกมา|thaawy aawk maa|退出来|动词|靠近远离|移动
khayap-khao-maa|ขยับเข้ามา|kha-yap khao maa|靠近一点|动词|靠近远离|移动
khayap-aawk-bpai|ขยับออกไป|kha-yap aawk bpai|移远一点|动词|靠近远离|移动
aawk-jaak-baan|ออกจากบ้าน|aawk jaak baan|离开家|动词|离开到达|移动
aawk-jaak-raan|ออกจากร้าน|aawk jaak raan|离开店|动词|离开到达|移动
aawk-jaak-hong|ออกจากห้อง|aawk jaak haawng|离开房间|动词|离开到达|移动
aawk-jaak-lift|ออกจากลิฟต์|aawk jaak lif|走出电梯|动词|离开到达|移动
khao-bpai-nai-hong|เข้าไปในห้อง|khao bpai nai haawng|进房间里|动词|离开到达|移动
khao-bpai-nai-raan|เข้าไปในร้าน|khao bpai nai raan|进店里|动词|离开到达|移动
khao-bpai-khaang-nai|เข้าไปข้างใน|khao bpai khaang nai|进去里面|动词|离开到达|移动
aawk-maa-khaang-naawk|ออกมาข้างนอก|aawk maa khaang naawk|出来外面|动词|离开到达|移动
maa-thung|มาถึง|maa theung|到达|动词|离开到达|到达
bpai-thung|ไปถึง|bpai theung|到那里|动词|离开到达|到达
thung-laeo|ถึงแล้ว|theung laeo|已经到了|短语|离开到达|到达
yang-mai-thung|ยังไม่ถึง|yang mai theung|还没到|短语|离开到达|到达
glap-maa|กลับมา|glap maa|回来|动词|离开到达|移动
glap-bpai|กลับไป|glap bpai|回去|动词|离开到达|移动
yaai-bpai|ย้ายไป|yaai bpai|搬去；移到|动词|搬动移动|移动
yaai-maa|ย้ายมา|yaai maa|搬来；移来|动词|搬动移动|移动
yaai-baan|ย้ายบ้าน|yaai baan|搬家|动词|搬动移动|移动
yaai-hong|ย้ายห้อง|yaai haawng|换房间|动词|搬动移动|移动
yaai-to|ย้ายโต๊ะ|yaai dto|搬桌子|动词|搬动移动|物品
yaai-gao-ii|ย้ายเก้าอี้|yaai gao-ii|搬椅子|动词|搬动移动|物品
yaai-khaawng|ย้ายของ|yaai khaawng|搬东西|动词|搬动移动|物品
khon-khaawng|ขนของ|khon khaawng|搬运东西|动词|搬动移动|物品
yok-khaawng|ยกของ|yok khaawng|抬东西|动词|搬动移动|物品
laak-khaawng|ลากของ|laak khaawng|拖东西|动词|搬动移动|物品
duen-khaawng|ดันของ|dan khaawng|推东西|动词|搬动移动|物品
wang-khaawng|วางของ|waang khaawng|放东西|动词|停放放置|放置
wang-bon-to|วางบนโต๊ะ|waang bon dto|放在桌上|动词|停放放置|放置
wang-bon-chan|วางบนชั้น|waang bon chan|放在架子上|动词|停放放置|放置
wang-nai-dtuu|วางในตู้|waang nai dtuu|放在柜子里|动词|停放放置|放置
wang-khaang-pratu|วางข้างประตู|waang khaang bpra-dtuu|放在门旁边|动词|停放放置|放置
wang-naa-hong|วางหน้าห้อง|waang naa haawng|放在房门口|动词|停放放置|放置
ao-wai-trong-nii|เอาไว้ตรงนี้|ao wai dtrong nii|放在这里|动词|停放放置|放置
ao-bpai-wai-trong-noon|เอาไปไว้ตรงโน้น|ao bpai wai dtrong noon|拿去放那边|动词|停放放置|放置
gep-khaawng|เก็บของ|gep khaawng|收东西|动词|停放放置|收拾
gep-khao-dtuu|เก็บเข้าตู้|gep khao dtuu|收进柜子|动词|停放放置|收拾
dtang-wai|ตั้งไว้|dtang wai|摆放着|动词|停放放置|放置
dtid-wai|ติดไว้|dtit wai|贴着；固定着|动词|停放放置|放置
jawt-rot|จอดรถ|jaawt rot|停车|动词|停放放置|停车
jawt-trong-nii|จอดตรงนี้|jaawt dtrong nii|停在这里|动词|停放放置|停车
jawt-naa-baan|จอดหน้าบ้าน|jaawt naa baan|停在家门口|动词|停放放置|停车
jawt-naa-raan|จอดหน้าร้าน|jaawt naa raan|停在店门口|动词|停放放置|停车
ham-jawt|ห้ามจอด|haam jaawt|禁止停车|短语|停放放置|停车
khun-bpai|ขึ้นไป|kheun bpai|上去|动词|上下楼|移动
long-maa|ลงมา|long maa|下来|动词|上下楼|移动
kheun-chan-song|ขึ้นชั้นสอง|kheun chan saawng|上二楼|动词|上下楼|楼层
long-chan-laang|ลงชั้นล่าง|long chan laang|下一楼|动词|上下楼|楼层
ao-kheun-bpai|เอาขึ้นไป|ao kheun bpai|拿上去|动词|上下楼|搬动
ao-long-maa|เอาลงมา|ao long maa|拿下来|动词|上下楼|搬动
ao-kheun-chan-bon|เอาขึ้นชั้นบน|ao kheun chan bon|拿到楼上|动词|上下楼|搬动
ao-long-chan-laang|เอาลงชั้นล่าง|ao long chan laang|拿到楼下|动词|上下楼|搬动
yok-kheun-bpai|ยกขึ้นไป|yok kheun bpai|抬上去|动词|上下楼|搬动
yok-long-maa|ยกลงมา|yok long maa|抬下来|动词|上下楼|搬动
chai-lift|ใช้ลิฟต์|chai lif|乘电梯|动词|上下楼|移动
chai-bandai|ใช้บันได|chai ban-dai|走楼梯|动词|上下楼|移动
kheun-lift|ขึ้นลิฟต์|kheun lif|上电梯|动词|上下楼|移动
long-lift|ลงลิฟต์|long lif|下电梯|动词|上下楼|移动
yuu-chan-bon|อยู่ชั้นบน|yuu chan bon|在楼上|短语|上下楼|位置
yuu-chan-laang|อยู่ชั้นล่าง|yuu chan laang|在楼下|短语|上下楼|位置
dern-bpai-trong-khaam|เดินไปตรงข้าม|doen bpai dtrong khaam|走到对面|动词|对面旁边|移动
dern-bpai-khaang-raan|เดินไปข้างร้าน|doen bpai khaang raan|走到店旁边|动词|对面旁边|移动
dern-bpai-naa-tuek|เดินไปหน้าตึก|doen bpai naa dteuk|走到楼前|动词|对面旁边|移动
dern-bpai-lang-tuek|เดินไปหลังตึก|doen bpai lang dteuk|走到楼后|动词|对面旁边|移动
dern-klap-maa|เดินกลับมา|doen glap maa|走回来|动词|离开到达|移动
dern-klap-bpai|เดินกลับไป|doen glap bpai|走回去|动词|离开到达|移动
`;

export const VOCABULARY_EXPANSION_A2_EVERYDAY_LOCATION_MOVEMENT_01: VocabularyExpansionA2EverydayLocationMovementCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
