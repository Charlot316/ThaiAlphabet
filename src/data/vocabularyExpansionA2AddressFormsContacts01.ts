type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "地址楼层" | "联系方式" | "表格填写" | "紧急联系人" | "收件信息" | "电话邮箱" | "资料确认" | "个人资料";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2AddressFormsContactsCandidate = {
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

type Row = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: PartOfSpeech;
  theme: Theme;
  tag: string;
};

const SOURCE_REFS = ["thai-frequency", "thai-address-forms-contacts-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
    });
}

function makeExample(row: Row): Example {
  if (row.partOfSpeech === "动词") {
    return {
      thai: `กรุณา${row.thai}ก่อนส่งแบบฟอร์มให้เจ้าหน้าที่`,
      roman: `ga-ru-naa ${row.roman} gaawn song baep-faawm hai jao-naa-thii`,
      chinese: `请先“${row.chinese}”，再把表格交给工作人员。`,
    };
  }
  if (row.tag === "关系") {
    return {
      thai: `ถ้าใช้${row.thai}เป็นผู้ติดต่อฉุกเฉิน กรุณาใส่เบอร์โทรด้วย`,
      roman: `thaa chai ${row.roman} bpen phuu dtit-dtaaw chuk-chern ga-ru-naa sai ber thoo duai`,
      chinese: `如果把“${row.chinese}”作为紧急联系人，请也填写电话号码。`,
    };
  }
  return {
    thai: `กรุณากรอกช่อง${row.thai}ให้ถูกต้องก่อนส่งแบบฟอร์ม`,
    roman: `ga-ru-naa graawk chaawng ${row.roman} hai thuuk dtawng gaawn song baep-faawm`,
    chinese: `请在提交表格前正确填写“${row.chinese}”这一栏。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2AddressFormsContactsCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于地址、联系方式、收件资料或个人资料确认。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，填写资料时要逐项核对。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["填写地址和联系方式时，常搭配 กรอก、เขียน、ตรวจ、ยืนยัน、แก้ไข。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
cheu-jing|ชื่อจริง|cheu jing|真实名字|名词|个人资料|姓名
na-sakun|นามสกุล|naa-ma-sa-gun|姓氏|名词|个人资料|姓名
cheu-len|ชื่อเล่น|cheu len|昵称|名词|个人资料|姓名
cheu-phasa-thai|ชื่อภาษาไทย|cheu phaa-saa thai|泰文姓名|名词|个人资料|姓名
cheu-phasa-angkrit|ชื่อภาษาอังกฤษ|cheu phaa-saa ang-grit|英文姓名|名词|个人资料|姓名
wan-koet|วันเกิด|wan goet|出生日期|名词|个人资料|生日
aa-yu|อายุ|aa-yu|年龄|名词|个人资料|年龄
phhet|เพศ|phet|性别|名词|个人资料|性别
sat-chaaat|สัญชาติ|san-chaat|国籍|名词|个人资料|国籍
lek-bat-prachachon|เลขบัตรประชาชน|lek bat bpra-chaa-chon|身份证号码|名词|个人资料|证件
lek-nangseu-doenthaang|เลขหนังสือเดินทาง|lek nang-seu doen-thaang|护照号码|名词|个人资料|证件
wan-mot-aayu-bat|วันหมดอายุบัตร|wan mot aa-yu bat|证件到期日|名词|个人资料|证件
thii-yuu-patjuban|ที่อยู่ปัจจุบัน|thii-yuu bpat-ju-ban|现住地址|名词|地址楼层|地址
thii-yuu-tam-bat|ที่อยู่ตามบัตร|thii-yuu dtaam bat|证件地址|名词|地址楼层|地址
thii-yuu-song-ekgasan|ที่อยู่ส่งเอกสาร|thii-yuu song eek-ga-saan|文件邮寄地址|名词|收件信息|地址
thii-yuu-rap-khaawng|ที่อยู่รับของ|thii-yuu rap khaawng|收货地址|名词|收件信息|地址
baan-lek-thii|บ้านเลขที่|baan lek thii|门牌号|名词|地址楼层|门牌
moo-baan|หมู่บ้าน|muu-baan|村；小区|名词|地址楼层|地址
soi|ซอย|saawy|巷|名词|地址楼层|地址
thanon|ถนน|tha-non|路|名词|地址楼层|地址
tam-bon|ตำบล|dtam-bon|区；乡|名词|地址楼层|地址
am-phoe|อำเภอ|am-phoe|县；区|名词|地址楼层|地址
jang-wat|จังหวัด|jang-wat|府；省|名词|地址楼层|地址
rahat-bpraisanii|รหัสไปรษณีย์|ra-hat bprai-sa-nii|邮政编码|名词|地址楼层|邮编
chan-thii|ชั้นที่|chan thii|楼层|名词|地址楼层|楼层
haawng-lek-thii|ห้องเลขที่|haawng lek thii|房间号|名词|地址楼层|门牌
aa-khaan|อาคาร|aa-khaan|楼栋；建筑|名词|地址楼层|楼栋
taek|ตึก|dteuk|楼；楼栋|名词|地址楼层|楼栋
kondo-cheu|ชื่อคอนโด|cheu khaawn-doo|公寓名称|名词|地址楼层|住址
mooban-cheu|ชื่อหมู่บ้าน|cheu muu-baan|小区名称|名词|地址楼层|住址
pratu-thaang-khao|ประตูทางเข้า|bpra-dtuu thaang-khao|入口门|名词|地址楼层|位置
pratu-thaang-aawk|ประตูทางออก|bpra-dtuu thaang-aawk|出口门|名词|地址楼层|位置
jud-sangket|จุดสังเกต|jut sang-geet|地标；辨认点|名词|地址楼层|位置
glai-sathaanii|ใกล้สถานี|glai sa-thaa-nii|靠近车站|短语|地址楼层|位置
trong-khaam|ตรงข้าม|dtrong khaam|在对面|短语|地址楼层|位置
khaang-khaang|ข้าง ๆ|khaang khaang|在旁边|短语|地址楼层|位置
ber-thoo-rap|เบอร์โทรรับ|ber thoo rap|收件电话|名词|电话邮箱|电话
ber-thoo-mue-thue|เบอร์โทรมือถือ|ber thoo meu-theu|手机号码|名词|电话邮箱|电话
ber-thoo-baan|เบอร์โทรบ้าน|ber thoo baan|住宅电话|名词|电话邮箱|电话
ber-thoo-tham-ngaan|เบอร์โทรที่ทำงาน|ber thoo thii tham-ngaan|工作电话|名词|电话邮箱|电话
ber-sam-rawng|เบอร์สำรอง|ber sam-raawng|备用电话|名词|电话邮箱|电话
ii-meel|อีเมล|ii-meel|邮箱|名词|电话邮箱|邮箱
ii-meel-suan-dtua|อีเมลส่วนตัว|ii-meel suan-dtua|个人邮箱|名词|电话邮箱|邮箱
ii-meel-tham-ngaan|อีเมลที่ทำงาน|ii-meel thii tham-ngaan|工作邮箱|名词|电话邮箱|邮箱
line-id|ไลน์ไอดี|lai ai-dii|Line账号|名词|联系方式|社交
cheu-line|ชื่อไลน์|cheu lai|Line显示名|名词|联系方式|社交
wechat-id|วีแชตไอดี|wii-chaet ai-dii|微信账号|名词|联系方式|社交
thaang-dtitdtaaw|ช่องทางติดต่อ|chaawng-thaang dtit-dtaaw|联系方式渠道|名词|联系方式|联系
weelaa-saduak|เวลาสะดวก|wee-laa sa-duak|方便联系时间|名词|联系方式|联系
dtitdtaaw-dai|ติดต่อได้|dtit-dtaaw dai|可以联系到|短语|联系方式|联系
dtitdtaaw-mai-dai|ติดต่อไม่ได้|dtit-dtaaw mai dai|联系不上|短语|联系方式|联系
phuu-dtitdtaaw|ผู้ติดต่อ|phuu dtit-dtaaw|联系人|名词|联系方式|联系
phuu-rap-ekgasan|ผู้รับเอกสาร|phuu rap eek-ga-saan|文件收件人|名词|收件信息|收件
phuu-rap-phatsadu|ผู้รับพัสดุ|phuu rap phat-sa-du|包裹收件人|名词|收件信息|收件
cheu-phuu-rap|ชื่อผู้รับ|cheu phuu rap|收件人姓名|名词|收件信息|收件
ber-phuu-rap|เบอร์ผู้รับ|ber phuu rap|收件人电话|名词|收件信息|收件
thii-yuu-phuu-rap|ที่อยู่ผู้รับ|thii-yuu phuu rap|收件人地址|名词|收件信息|收件
phuu-song|ผู้ส่ง|phuu song|寄件人|名词|收件信息|寄件
cheu-phuu-song|ชื่อผู้ส่ง|cheu phuu song|寄件人姓名|名词|收件信息|寄件
ber-phuu-song|เบอร์ผู้ส่ง|ber phuu song|寄件人电话|名词|收件信息|寄件
thii-yuu-phuu-song|ที่อยู่ผู้ส่ง|thii-yuu phuu song|寄件人地址|名词|收件信息|寄件
khon-rap-thaen|คนรับแทน|khon rap thaen|代收人|名词|收件信息|代收
anuyat-hai-rap-thaen|อนุญาตให้รับแทน|a-nu-yaat hai rap thaen|允许代收|短语|收件信息|代收
phuu-dtitdtaaw-chukchoen|ผู้ติดต่อฉุกเฉิน|phuu dtit-dtaaw chuk-chern|紧急联系人|名词|紧急联系人|紧急
ber-chukchoen|เบอร์ฉุกเฉิน|ber chuk-chern|紧急电话|名词|紧急联系人|紧急
khwam-samphan|ความสัมพันธ์|khwaam-sam-phan|关系|名词|紧急联系人|关系
phaw-mae|พ่อแม่|phaaw mae|父母|名词|紧急联系人|关系
khruu-suan-dtua|ครูส่วนตัว|khruu suan-dtua|私人老师|名词|紧急联系人|关系
hua-naa-ngaan|หัวหน้างาน|hua-naa ngaan|工作主管|名词|紧急联系人|关系
phuean-sanit|เพื่อนสนิท|pheuan sa-nit|亲近朋友|名词|紧急联系人|关系
khon-nai-khraawp-khrua|คนในครอบครัว|khon nai khraawp-khrua|家人|名词|紧急联系人|关系
graawk-khaaw-muun|กรอกข้อมูล|graawk khaaw-muun|填写资料|动词|表格填写|表格
graawk-hai-khrop|กรอกให้ครบ|graawk hai khrop|填写完整|短语|表格填写|表格
graawk-hai-thuuk|กรอกให้ถูก|graawk hai thuuk|填写正确|短语|表格填写|表格
khian-tua-ban-jong|เขียนตัวบรรจง|khiian dtua ban-jong|工整书写|动词|表格填写|书写
long-cheu|ลงชื่อ|long cheu|签名|动词|表格填写|签名
laai-sen|ลายเซ็น|laai-sen|签名笔迹|名词|表格填写|签名
wan-thii-graawk|วันที่กรอก|wan-thii graawk|填写日期|名词|表格填写|日期
chaawng-wang|ช่องว่าง|chaawng waang|空格栏|名词|表格填写|表格
chaawng-bang-khap|ช่องบังคับ|chaawng bang-khap|必填栏|名词|表格填写|表格
chaawng-mai-bang-khap|ช่องไม่บังคับ|chaawng mai bang-khap|非必填栏|名词|表格填写|表格
khit-khreuang-maai|ขีดเครื่องหมาย|khiit khreuuang-maai|打勾标记|动词|表格填写|表格
leuak-kham-dtaawp|เลือกคำตอบ|leuak kham-dtaawp|选择答案|动词|表格填写|表格
baep-faawm-online|แบบฟอร์มออนไลน์|baep-faawm aawn-lai|线上表格|名词|表格填写|表格
baep-faawm-gra-daat|แบบฟอร์มกระดาษ|baep-faawm gra-daat|纸质表格|名词|表格填写|表格
song-baep-faawm|ส่งแบบฟอร์ม|song baep-faawm|提交表格|动词|表格填写|表格
rap-baep-faawm|รับแบบฟอร์ม|rap baep-faawm|领取表格|动词|表格填写|表格
gae-khaaw-muun|แก้ข้อมูล|gae khaaw-muun|修改资料|动词|资料确认|修改
khaaw-muun-phit|ข้อมูลผิด|khaaw-muun phit|资料错误|短语|资料确认|修改
khaaw-muun-thuuk|ข้อมูลถูก|khaaw-muun thuuk|资料正确|短语|资料确认|确认
khaaw-muun-mai-khrop|ข้อมูลไม่ครบ|khaaw-muun mai khrop|资料不完整|短语|资料确认|确认
truat-khaaw-muun|ตรวจข้อมูล|dtruat khaaw-muun|检查资料|动词|资料确认|确认
yeun-yan-khaaw-muun|ยืนยันข้อมูล|yeun-yan khaaw-muun|确认资料|动词|资料确认|确认
khaaw-yeun-yan|ขอยืนยัน|khaaw yeun-yan|请求确认|短语|资料确认|确认
sam-nao-bat|สำเนาบัตร|sam-nao bat|证件复印件|名词|个人资料|证件
ruup-thaai-bat|รูปถ่ายบัตร|ruup-thaai bat|证件照片|名词|个人资料|证件
ekgasan-pragawp|เอกสารประกอบ|eek-ga-saan bpra-gaawp|附加材料|名词|个人资料|材料
bai-kham-raawng|ใบคำร้อง|bai kham-raawng|申请单|名词|表格填写|表格
lak-thaan-thii-yuu|หลักฐานที่อยู่|lak-thaan thii-yuu|地址证明|名词|个人资料|证明
bai-rap-raawng|ใบรับรอง|bai rap-raawng|证明书|名词|个人资料|证明
khaaw-sam-nao|ขอสำเนา|khaaw sam-nao|申请复印件|动词|个人资料|复印
song-ekgasan-phoem|ส่งเอกสารเพิ่ม|song eek-ga-saan phoem|补交文件|动词|个人资料|材料
`;

export const VOCABULARY_EXPANSION_A2_ADDRESS_FORMS_CONTACTS_01: VocabularyExpansionA2AddressFormsContactsCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
