type PartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
type Theme = "生活" | "服务" | "学习" | "健康" | "交通" | "家庭" | "日常沟通" | "问题处理";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2CoreFinalReview06Candidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-a2-core-final-review-06", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `ฉันฝึกใช้คำว่า${row.thai}เมื่อเจอสถานการณ์ง่าย ๆ ในชีวิตประจำวัน`,
    roman: `chan feuk chai kham waa ${row.roman} muea joe sa-thaa-na-gaan ngaai ngaai nai chii-wit bpra-jam-wan`,
    chinese: `遇到日常简单场景时，我练习使用“${row.chinese}”。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2CoreFinalReview06Candidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 可用于${row.theme}场景，适合 A2 学习者做表达补漏。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 偏“${row.chinese}”；${related.thai} 偏“${related.chinese}”，放到具体场景里记更自然。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批用于 A2 核心最终复盘第六轮，围绕生活、服务、学习、健康、交通和家庭做遗漏表达补漏。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
poet-faa|เปิดฝา|bpoet faa|打开盖子|动词|生活|动作
bpit-faa|ปิดฝา|bpit faa|盖上盖子|动词|生活|动作
the-nam|เทน้ำ|thee naam|倒水|动词|生活|动作
dteem-nam|เติมน้ำ|dteem naam|加水|动词|生活|动作
dteem-nam-man|เติมน้ำมัน|dteem nam-man|加油|动词|交通|车辆
dteem-bat|เติมบัตร|dteem bat|充值卡|动词|交通|票卡
dteem-ngoen-mue-thue|เติมเงินมือถือ|dteem ngoen mue-theu|给手机充值|动词|生活|手机
chat-baeet|ชาร์จแบต|chaat baet|充电|动词|生活|电子
thot-bplak|ถอดปลั๊ก|thaawt bplak|拔插头|动词|生活|电子
siap-bplak|เสียบปลั๊ก|siiap bplak|插插头|动词|生活|电子
dtid-dtang|ติดตั้ง|dtit-dtang|安装|动词|服务|设备
thaawt-aawk|ถอดออก|thaawt aawk|拆下来|动词|服务|设备
bplian-baeet|เปลี่ยนแบต|bplian baet|换电池|动词|服务|维修
bplian-lod|เปลี่ยนหลอด|bplian laawt|换灯泡|动词|家庭|维修
sai-lom|ใส่ลม|sai lom|充气|动词|服务|维修
suup-lom|สูบลม|suup lom|打气|动词|服务|维修
yang-rai-fun|ยางรั่ว|yaang rua|轮胎漏气|短语|交通|问题
rot-start-mai-dai|รถสตาร์ตไม่ได้|rot sa-dtaat mai dai|车发动不了|短语|交通|问题
rot-dtap|รถดับ|rot dap|车熄火|短语|交通|问题
rot-dtit|รถติด|rot dtit|堵车|短语|交通|路况
thaang-dtan|ทางตัน|thaang dtan|死路|名词|交通|路线
thaang-lat|ทางลัด|thaang lat|近路|名词|交通|路线
thaang-khoong|ทางโค้ง|thaang khoong|弯路|名词|交通|路线
thaang-khaam|ทางข้าม|thaang khaam|过街处|名词|交通|路线
phak-rot|พักรถ|phak rot|停车休息|动词|交通|车辆
joet-rot-chua-khruu|จอดรถชั่วครู่|jaawt rot chua-khruu|临时停车|短语|交通|停车
tham-bat-haai|ทำบัตรหาย|tham bat haai|弄丢卡|短语|服务|证件
bpit-bat|ปิดบัตร|bpit bat|停卡|动词|服务|证件
poet-bat|เปิดบัตร|bpoet bat|开卡|动词|服务|证件
rap-bat-mai|รับบัตรใหม่|rap bat mai|领取新卡|短语|服务|证件
khian-kham-rawng|เขียนคำร้อง|khiian kham raawng|写申请|动词|服务|办事
yuen-kham-rawng|ยื่นคำร้อง|yeun kham raawng|提交申请|动词|服务|办事
raw-phon|รอผล|raaw phon|等结果|动词|服务|办事
rap-phon|รับผล|rap phon|取结果|动词|服务|办事
khaaw-khian-cheu|ขอเขียนชื่อ|khaaw khiian cheu|请写名字|短语|服务|资料
khaaw-bok-ber-tho|ขอบอกเบอร์โทร|khaaw baawk boe thoo|我说一下电话|短语|服务|资料
khaaw-bok-thii-yuu|ขอบอกที่อยู่|khaaw baawk thii-yuu|我说一下地址|短语|服务|资料
tham-sam-nao|ทำสำเนา|tham sam-nao|做复印件|动词|服务|文件
rap-sam-nao|รับสำเนา|rap sam-nao|领取复印件|动词|服务|文件
treuam-eek-saarn|เตรียมเอกสาร|dtriiam eek-ga-saan|准备文件|动词|服务|文件
eek-saarn-khaat|เอกสารขาด|eek-ga-saan khaat|文件缺失|短语|服务|文件
eek-saarn-khrop|เอกสารครบ|eek-ga-saan khrop|文件齐全|短语|服务|文件
rian-yohn|เรียนย้อน|riian yaawn|回头学|动词|学习|学习
thop-thuan-bot|ทบทวนบท|thop-thuan bot|复习课文|动词|学习|复习
tham-baeep-feuk|ทำแบบฝึก|tham baaep feuk|做练习|动词|学习|练习
truat-kham-dtaawp|ตรวจคำตอบ|dtruat kham dtaawp|检查答案|动词|学习|答案
gae-kham-dtaawp|แก้คำตอบ|gae kham dtaawp|改答案|动词|学习|答案
rian-khuu|เรียนคู่|riian khuu|结对学习|动词|学习|合作
rian-duai-kan|เรียนด้วยกัน|riian duai gan|一起学习|动词|学习|合作
thaam-khruu|ถามครู|thaam khruu|问老师|动词|学习|提问
thaam-phuean|ถามเพื่อน|thaam phuean|问同学|动词|学习|提问
song-kham-thaam|ส่งคำถาม|song kham-thaam|发送问题|动词|学习|提问
rap-kham-dtaawp|รับคำตอบ|rap kham dtaawp|收到答案|短语|学习|回答
khaaw-kham-a-thi-baai|ขอคำอธิบาย|khaaw kham a-thi-baai|请求解释|短语|学习|解释
khaaw-rian-chaa-long|ขอเรียนช้าลง|khaaw riian chaa long|请学慢一点|短语|学习|节奏
rian-reo-bpai|เรียนเร็วไป|riian reo bpai|学得太快|短语|学习|节奏
bot-rian-yak|บทเรียนยาก|bot-riian yaak|课程难|短语|学习|难易
bot-rian-ngai|บทเรียนง่าย|bot-riian ngaai|课程简单|短语|学习|难易
tham-khaaw-sop|ทำข้อสอบ|tham khaaw-saawp|做试题|动词|学习|考试
truat-khanaen|ตรวจคะแนน|dtruat kha-naaen|查成绩|动词|学习|成绩
puat-lang|ปวดหลัง|bpuat lang|背疼|短语|健康|症状
puat-ai|ปวดไหล่|bpuat lai|肩膀疼|短语|健康|症状
puat-khao|ปวดเข่า|bpuat khao|膝盖疼|短语|健康|症状
puat-kho|ปวดคอ|bpuat khaw|脖子疼|短语|健康|症状
kho-haeng|คอแห้ง|khaw haaeng|嗓子干|短语|健康|症状
mi-nam-muk|มีน้ำมูก|mii naam-muuk|流鼻涕|短语|健康|症状
jamuk-dtan|จมูกตัน|ja-muuk dtan|鼻塞|短语|健康|症状
ai-haeng|ไอแห้ง|ai haaeng|干咳|短语|健康|症状
ai-mee-sen-ha|ไอมีเสมหะ|ai mii see-ma-ha|有痰咳嗽|短语|健康|症状
khon-luk|ขนลุก|khon luk|起鸡皮疙瘩|短语|健康|感觉
mai-khoi-mi-raeng|ไม่ค่อยมีแรง|mai khaawy mii raaeng|不太有力气|短语|健康|感觉
gin-yaa-kon-aa-haan|กินยาก่อนอาหาร|gin yaa gaawn aa-haan|饭前吃药|短语|健康|用药
gin-yaa-lang-aa-haan|กินยาหลังอาหาร|gin yaa lang aa-haan|饭后吃药|短语|健康|用药
yaa-nawn|ยานอน|yaa naawn|睡前药|名词|健康|用药
yaa-thaa|ยาทา|yaa thaa|外用涂药|名词|健康|用药
thaa-yaa|ทายา|thaa yaa|涂药|动词|健康|用药
dtid-phlaa-sadter|ติดพลาสเตอร์|dtit phlaa-sa-dtoe|贴创可贴|动词|健康|处理
lang-phlaa|ล้างแผล|laang phlaae|清洗伤口|动词|健康|处理
phak-fuen|พักฟื้น|phak feun|休养恢复|动词|健康|恢复
duu-lae-tua-eng|ดูแลตัวเอง|duu-lae dtua-eng|照顾自己|动词|健康|照顾
duu-lae-phuuyai|ดูแลผู้ใหญ่|duu-lae phuu-yai|照顾长辈|动词|家庭|照顾
duu-lae-dek-lek|ดูแลเด็กเล็ก|duu-lae dek lek|照顾小孩|动词|家庭|照顾
pluk-dek|ปลุกเด็ก|bpluk dek|叫醒孩子|动词|家庭|孩子
song-dek-khao-nawn|ส่งเด็กเข้านอน|song dek khao naawn|哄孩子睡觉|短语|家庭|孩子
tam-dek|ตามเด็ก|dtaam dek|去找孩子|动词|家庭|孩子
dtriiam-khaao-glong|เตรียมข้าวกล่อง|dtriiam khaao glaawng|准备盒饭|动词|家庭|做饭
un-aa-haan|อุ่นอาหาร|un aa-haan|热饭菜|动词|家庭|做饭
gaep-aa-haan|เก็บอาหาร|gep aa-haan|收好食物|动词|家庭|收纳
laang-phak|ล้างผัก|laang phak|洗菜|动词|家庭|做饭
han-phak|หั่นผัก|han phak|切菜|动词|家庭|做饭
dtom-nam|ต้มน้ำ|dtom naam|烧水|动词|家庭|做饭
chong-chaa|ชงชา|chong chaa|泡茶|动词|家庭|饮品
chong-gaafae|ชงกาแฟ|chong gaa-faae|冲咖啡|动词|家庭|饮品
bang-welaa|แบ่งเวลา|baeng wee-laa|分配时间|动词|日常沟通|安排
bang-ngan|แบ่งงาน|baeng ngaan|分配工作|动词|日常沟通|安排
bang-hai-khon-la-nit|แบ่งให้คนละนิด|baeng hai khon la nit|每人分一点|短语|日常沟通|分配
pen-wen|เป็นเวร|bpen ween|轮值|动词|日常沟通|安排
dtaw-wen|ต่อเวร|dtaaw ween|接班|动词|日常沟通|安排
bplian-wen|เปลี่ยนเวร|bplian ween|换班|动词|日常沟通|安排
laa-wen|ลาเวร|laa ween|请假不值班|动词|日常沟通|安排
khaaw-kham-choei|ขอคำเฉลย|khaaw kham cha-loei|请求答案解析|短语|学习|答案
khian-mai-hai-aan|เขียนใหม่ให้อ่าน|khiian mai hai aan|重写给人看|短语|问题处理|文字
phuut-mai-hai-fang|พูดใหม่ให้ฟัง|phuut mai hai fang|重新说给人听|短语|问题处理|表达
tham-sam-mai|ทำซ้ำใหม่|tham sam mai|重新再做|动词|问题处理|重做
dtang-kha-mai|ตั้งค่าใหม่|dtang khaa mai|重新设置|动词|问题处理|设置
loet-chai|เลิกใช้|loek chai|停止使用|动词|问题处理|停止
glap-maa-chai|กลับมาใช้|glap maa chai|恢复使用|动词|问题处理|恢复
`;

export const VOCABULARY_EXPANSION_A2_CORE_FINAL_REVIEW_06: VocabularyExpansionA2CoreFinalReview06Candidate[] = parseRows(RAW_ROWS).map(buildCandidate);
