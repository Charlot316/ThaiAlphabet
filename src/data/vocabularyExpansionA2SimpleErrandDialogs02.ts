type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "取号等候" | "柜台办理" | "文件资料" | "补交修改" | "办理结果" | "再次办理" | "询问确认" | "礼貌沟通";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2SimpleErrandDialogs02Candidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-simple-errand-dialogs-02", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `ตอนทำธุระที่เคาน์เตอร์ ฉันใช้คำว่า${row.thai}เพื่อถามเจ้าหน้าที่`,
    roman: `dtaawn tham-thu-ra thii khao-dter chan chai kham waa ${row.roman} phuea thaam jao-naa-thii`,
    chinese: `在柜台办事时，我用“${row.chinese}”来询问工作人员。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2SimpleErrandDialogs02Candidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于银行、邮局、政府窗口、诊所或物业等日常办事对话。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，办事时要分清排队、资料、步骤和结果。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["办事对话中，ขอ、กรุณา、ช่วย、ได้ไหม 能让请求更礼貌；同时要说清文件、号码和时间。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
kot-bat-khiu|กดบัตรคิว|got bat khiu|按号取票|动词|取号等候|取号
rap-bat-khiu|รับบัตรคิว|rap bat khiu|领取号码票|动词|取号等候|取号
maai-lek-khiu|หมายเลขคิว|maai-lek khiu|排队号码|名词|取号等候|取号
riiak-khiu|เรียกคิว|riiak khiu|叫号|动词|取号等候|叫号
thueng-khiu-laeo|ถึงคิวแล้ว|theung khiu laeo|轮到了|短语|取号等候|叫号
yang-mai-thueng-khiu|ยังไม่ถึงคิว|yang mai theung khiu|还没轮到|短语|取号等候|等候
loei-khiu|เลยคิว|loei khiu|过号|动词|取号等候|叫号
khiu-nai-laeo|คิวไหนแล้ว|khiu nai laeo|现在到几号了|短语|取号等候|询问
raw-khiu|รอคิว|raaw khiu|排队等候|动词|取号等候|等候
raw-sak-khruu|รอสักครู่|raaw sak khruu|请稍等|短语|取号等候|等候
raw-nan-mai|รอนานไหม|raaw naan mai|要等很久吗|短语|取号等候|询问
raw-pramaan-gii-naa-thii|รอประมาณกี่นาที|raaw bpra-maan gii naa-thii|大概要等几分钟|短语|取号等候|询问
nang-raw|นั่งรอ|nang raaw|坐着等|动词|取号等候|等候
yuen-raw|ยืนรอ|yeun raaw|站着等|动词|取号等候|等候
khao-thaeo|เข้าแถว|khao thaeo|排队|动词|取号等候|排队
haang-thaeo|หางแถว|haang thaeo|队尾|名词|取号等候|排队
hua-thaeo|หัวแถว|hua thaeo|队首|名词|取号等候|排队
chong-bo-rikaan|ช่องบริการ|chaawng baaw-ri-gaan|服务窗口|名词|柜台办理|柜台
khao-dter|เคาน์เตอร์|khao-dter|柜台|名词|柜台办理|柜台
bpai-chong-nai|ไปช่องไหน|bpai chaawng nai|去哪个窗口|短语|柜台办理|询问
chong-nii-dai-mai|ช่องนี้ได้ไหม|chaawng nii dai mai|这个窗口可以吗|短语|柜台办理|询问
yeun-ekgasan|ยื่นเอกสาร|yeun eek-ga-saan|提交文件|动词|文件资料|资料
song-ekgasan|ส่งเอกสาร|song eek-ga-saan|交文件|动词|文件资料|资料
rap-ekgasan|รับเอกสาร|rap eek-ga-saan|领取文件|动词|文件资料|资料
khaaw-ekgasan-khuen|ขอเอกสารคืน|khaaw eek-ga-saan kheun|请求拿回文件|动词|文件资料|资料
dtong-chai-ekgasan-arai|ต้องใช้เอกสารอะไร|dtawng chai eek-ga-saan a-rai|需要什么文件|短语|文件资料|询问
chai-sam-nao-mai|ใช้สำเนาไหม|chai sam-nao mai|需要复印件吗|短语|文件资料|询问
chai-dtua-jing-mai|ใช้ตัวจริงไหม|chai dtua-jing mai|需要原件吗|短语|文件资料|询问
ekgasan-mai-khrop|เอกสารไม่ครบ|eek-ga-saan mai khrop|文件不齐|短语|文件资料|缺资料
khaat-ekgasan|ขาดเอกสาร|khaat eek-ga-saan|缺文件|动词|文件资料|缺资料
khaat-sam-nao|ขาดสำเนา|khaat sam-nao|缺复印件|动词|文件资料|缺资料
khaat-laai-sen|ขาดลายเซ็น|khaat laai-sen|缺签名|动词|文件资料|缺资料
khaat-ruup-thaai|ขาดรูปถ่าย|khaat ruup-thaai|缺照片|动词|文件资料|缺资料
khaat-bat|ขาดบัตร|khaat bat|缺证件|动词|文件资料|缺资料
graawk-baep-faawm|กรอกแบบฟอร์ม|graawk baep-faawm|填写表格|动词|文件资料|表格
graawk-hai-khrop|กรอกให้ครบ|graawk hai khrop|填写完整|短语|文件资料|表格
graawk-phit|กรอกผิด|graawk phit|填错|动词|补交修改|修改
graawk-mai|กรอกใหม่|graawk mai|重新填写|动词|再次办理|重做
gae-khaaw-muun|แก้ข้อมูล|gae khaaw-muun|修改资料|动词|补交修改|修改
khaaw-gae-khaaw-muun|ขอแก้ข้อมูล|khaaw gae khaaw-muun|请求修改资料|动词|补交修改|修改
khaaw-muun-phit|ข้อมูลผิด|khaaw-muun phit|资料错误|短语|补交修改|修改
khaaw-muun-mai-khrop|ข้อมูลไม่ครบ|khaaw-muun mai khrop|资料不完整|短语|补交修改|缺资料
dtruat-khaaw-muun|ตรวจข้อมูล|dtruat khaaw-muun|检查资料|动词|询问确认|确认
yeun-yan-khaaw-muun|ยืนยันข้อมูล|yeun-yan khaaw-muun|确认资料|动词|询问确认|确认
long-cheu|ลงชื่อ|long cheu|签名|动词|文件资料|签名
sen-cheu|เซ็นชื่อ|sen cheu|签名|动词|文件资料|签名
khaaw-laai-sen|ขอลายเซ็น|khaaw laai-sen|请求签名|动词|文件资料|签名
tham-sam-nao|ทำสำเนา|tham sam-nao|复印|动词|文件资料|复印
bpai-thaai-ekgasan|ไปถ่ายเอกสาร|bpai thaai eek-ga-saan|去复印文件|动词|文件资料|复印
dtit-ruup|ติดรูป|dtit ruup|贴照片|动词|文件资料|照片
thaai-ruup-mai|ถ่ายรูปใหม่|thaai ruup mai|重新拍照|动词|再次办理|照片
maa-iik-khrang|มาอีกครั้ง|maa iik khrang|再来一次|动词|再次办理|重来
glap-maa-mai|กลับมาใหม่|glap maa mai|改天再来|动词|再次办理|重来
tham-iik-khrang|ทำอีกครั้ง|tham iik khrang|再做一次|动词|再次办理|重来
song-phoem|ส่งเพิ่ม|song phoem|补交|动词|补交修改|补交
nam-maa-phoem|นำมาเพิ่ม|nam maa phoem|补带来|动词|补交修改|补交
dtong-song-phoem|ต้องส่งเพิ่ม|dtawng song phoem|需要补交|短语|补交修改|补交
dtong-maa-wan-nai|ต้องมาวันไหน|dtawng maa wan nai|需要哪天来|短语|再次办理|询问
maa-phrung-nii-dai-mai|มาพรุ่งนี้ได้ไหม|maa phrung-nii dai mai|明天来可以吗|短语|再次办理|询问
tham-set-laeo|ทำเสร็จแล้ว|tham set laeo|办好了|短语|办理结果|完成
riap-raawy-laeo|เรียบร้อยแล้ว|riap-raawy laeo|已经好了|短语|办理结果|完成
yang-mai-set|ยังไม่เสร็จ|yang mai set|还没办完|短语|办理结果|未完成
raw-phon|รอผล|raaw phon|等待结果|动词|办理结果|结果
phon-aawk-laeo|ผลออกแล้ว|phon aawk laeo|结果出来了|短语|办理结果|结果
rap-phon|รับผล|rap phon|领取结果|动词|办理结果|结果
rap-bai-rap-rawng|รับใบรับรอง|rap bai rap-raawng|领取证明|动词|办理结果|领取
rap-bai-set|รับใบเสร็จ|rap bai-set|领取收据|动词|办理结果|领取
khaaw-bai-set|ขอใบเสร็จ|khaaw bai-set|索要收据|动词|办理结果|收据
khaa-tham-niiam|ค่าธรรมเนียม|khaa-tham-niiam|手续费|名词|柜台办理|费用
jaai-khaa-tham-niiam|จ่ายค่าธรรมเนียม|jaai khaa-tham-niiam|支付手续费|动词|柜台办理|费用
free-khaa-tham-niiam|ฟรีค่าธรรมเนียม|frii khaa-tham-niiam|免手续费|短语|柜台办理|费用
dtong-jaai-ngoen-mai|ต้องจ่ายเงินไหม|dtawng jaai ngoen mai|需要付钱吗|短语|柜台办理|询问
jaai-thii-nai|จ่ายที่ไหน|jaai thii nai|在哪里付款|短语|柜台办理|询问
rap-thii-nai|รับที่ไหน|rap thii nai|在哪里领取|短语|办理结果|询问
song-thii-nai|ส่งที่ไหน|song thii nai|在哪里提交|短语|柜台办理|询问
dtit-dtaaw-khrai|ติดต่อใคร|dtit-dtaaw khrai|联系谁|短语|询问确认|询问
tham-raai-gaan|ทำรายการ|tham raai-gaan|办理业务|动词|柜台办理|办理
tham-raai-gaan-mai-dai|ทำรายการไม่ได้|tham raai-gaan mai dai|无法办理|短语|办理结果|失败
tham-raai-gaan-sam-ret|ทำรายการสำเร็จ|tham raai-gaan sam-ret|办理成功|短语|办理结果|完成
ra-bop-khat-khaawng|ระบบขัดข้อง|ra-bop khat-khaawng|系统故障|短语|办理结果|故障
khaaw-rian-jao-naa-thii|ขอเรียนเจ้าหน้าที่|khaaw riian jao-naa-thii|请告知工作人员|短语|礼貌沟通|礼貌
khaaw-thaam-noi|ขอถามหน่อย|khaaw thaam naawy|请问一下|短语|礼貌沟通|礼貌
rop-guan-chuai-duu|รบกวนช่วยดู|rop-guan chuai duu|麻烦帮忙看一下|短语|礼貌沟通|礼貌
chuai-a-thi-baai|ช่วยอธิบาย|chuai a-thi-baai|请帮忙说明|动词|礼貌沟通|礼貌
phuut-chaa-chaa|พูดช้า ๆ|phuut chaa chaa|请慢点说|动词|礼貌沟通|礼貌
mai-khao-jai|ไม่เข้าใจ|mai khao-jai|不明白|短语|礼貌沟通|理解
khao-jai-laeo|เข้าใจแล้ว|khao-jai laeo|明白了|短语|礼貌沟通|理解
khop-khun-mak|ขอบคุณมาก|khaawp-khun maak|非常感谢|短语|礼貌沟通|礼貌
dtong-ao-arai-maa|ต้องเอาอะไรมา|dtawng ao a-rai maa|需要带什么来|短语|文件资料|询问
ao-maa-khrop-laeo|เอามาครบแล้ว|ao maa khrop laeo|已经带齐了|短语|文件资料|资料
khaaw-dtruat-iik-thii|ขอตรวจอีกที|khaaw dtruat iik thii|请求再检查一次|动词|询问确认|确认
dtong-raw-phon-gii-wan|ต้องรอผลกี่วัน|dtawng raaw phon gii wan|要等几天出结果|短语|办理结果|询问
rap-phon-wan-nai|รับผลวันไหน|rap phon wan nai|哪天领取结果|短语|办理结果|询问
jaeng-thaang-thoo-rasap|แจ้งทางโทรศัพท์|jaeng thaang thoo-ra-sap|通过电话通知|动词|办理结果|通知
jaeng-thaang-khaaw-khwaam|แจ้งทางข้อความ|jaeng thaang khaaw-khwaam|通过短信通知|动词|办理结果|通知
dtong-nam-bat-maa|ต้องนำบัตรมา|dtawng nam bat maa|必须带证件来|短语|文件资料|资料
`;

export const VOCABULARY_EXPANSION_A2_SIMPLE_ERRAND_DIALOGS_02: VocabularyExpansionA2SimpleErrandDialogs02Candidate[] = parseRows(RAW_ROWS).map(buildCandidate);
