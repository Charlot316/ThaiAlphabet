type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "预约时间" | "理发美甲" | "维修服务" | "诊所预约" | "餐厅订位" | "取消改期" | "确认信息" | "服务项目";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2DailyServiceBookingCandidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-daily-service-booking-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `ฉันโทรไปถามเรื่อง${row.thai}ก่อนออกจากบ้าน`,
    roman: `chan thoo bpai thaam reuuang ${row.roman} gaawn aawk jaak baan`,
    chinese: `我出门前打电话询问“${row.chinese}”的事。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2DailyServiceBookingCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于预约、改期、取消、确认服务时间或询问服务项目。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，预约服务时要说明项目、时间、人数和联系方式。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["预约服务常用 ขอจอง、มีคิวไหม、ขอเลื่อน、ยืนยันเวลา、ยกเลิกนัด。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
jaawng-khiu|จองคิว|jaawng khiu|预约排号|动词|预约时间|预约
nat-wee-laa|นัดเวลา|nat wee-laa|约时间|动词|预约时间|预约
khaaw-jaawng|ขอจอง|khaaw jaawng|请求预约|动词|预约时间|预约
mii-khiu-mai|มีคิวไหม|mii khiu mai|有号吗|短语|预约时间|询问
khiu-waang|คิวว่าง|khiu waang|有空号|名词|预约时间|预约
khiu-dtem|คิวเต็ม|khiu dtem|预约满了|短语|预约时间|预约
khiu-raaek|คิวแรก|khiu raek|第一个号|名词|预约时间|预约
khiu-sut-thaai|คิวสุดท้าย|khiu sut-thaai|最后一个号|名词|预约时间|预约
khaaw-khiu-reo|ขอคิวเร็ว|khaaw khiu reo|请求早点的号|动词|预约时间|预约
khaaw-khiu-baai|ขอคิวบ่าย|khaaw khiu baai|请求下午的号|动词|预约时间|预约
wee-laa-waang|เวลาว่าง|wee-laa waang|空闲时间|名词|预约时间|时间
wee-laa-saduak|เวลาสะดวก|wee-laa sa-duak|方便时间|名词|预约时间|时间
dtaawn-chao-dai-mai|ตอนเช้าได้ไหม|dtaawn chaao dai mai|上午可以吗|短语|预约时间|时间
dtaawn-baai-dai-mai|ตอนบ่ายได้ไหม|dtaawn baai dai mai|下午可以吗|短语|预约时间|时间
lang-lerk-ngaan|หลังเลิกงาน|lang loek ngaan|下班后|短语|预约时间|时间
gawn-thiang|ก่อนเที่ยง|gaawn thiiang|中午前|短语|预约时间|时间
jaawng-tat-phom|จองตัดผม|jaawng dtat phom|预约理发|动词|理发美甲|理发
raan-tat-phom|ร้านตัดผม|raan dtat phom|理发店|名词|理发美甲|理发
chang-tat-phom|ช่างตัดผม|chang dtat phom|理发师|名词|理发美甲|理发
sa-phom|สระผม|sa phom|洗头|动词|理发美甲|理发
dtat-phom-san|ตัดผมสั้น|dtat phom san|剪短发|动词|理发美甲|理发
dtat-plaai-phom|ตัดปลายผม|dtat bplaai phom|修发尾|动词|理发美甲|理发
som-phom|ซอยผม|saawy phom|打薄头发|动词|理发美甲|理发
yom-phom|ย้อมผม|yaawm phom|染发|动词|理发美甲|理发
op-phom|อบผม|op phom|焗发；护理头发|动词|理发美甲|理发
set-phom|เซ็ตผม|set phom|做发型|动词|理发美甲|理发
jaawng-tham-lep|จองทำเล็บ|jaawng tham lep|预约美甲|动词|理发美甲|美甲
raan-tham-lep|ร้านทำเล็บ|raan tham lep|美甲店|名词|理发美甲|美甲
chang-tham-lep|ช่างทำเล็บ|chang tham lep|美甲师|名词|理发美甲|美甲
dtat-lep|ตัดเล็บ|dtat lep|剪指甲|动词|理发美甲|美甲
thaa-sii-lep|ทาสีเล็บ|thaa sii lep|涂指甲油|动词|理发美甲|美甲
laang-sii-lep|ล้างสีเล็บ|laang sii lep|卸指甲油|动词|理发美甲|美甲
dtid-lep|ติดเล็บ|dtit lep|贴甲片|动词|理发美甲|美甲
laai-ngai-ngai|ลายง่าย ๆ|laai ngaai ngaai|简单图案|名词|理发美甲|美甲
khaaw-duu-baep|ขอดูแบบ|khaaw duu baep|请求看样式|动词|理发美甲|美甲
jaawng-saawm|จองซ่อม|jaawng saawm|预约维修|动词|维修服务|维修
jaeng-saawm|แจ้งซ่อม|jaeng saawm|报修|动词|维修服务|维修
chang-saawm|ช่างซ่อม|chang saawm|维修师傅|名词|维修服务|维修
saawm-air|ซ่อมแอร์|saawm aae|修空调|动词|维修服务|维修
saawm-fai|ซ่อมไฟ|saawm fai|修电|动词|维修服务|维修
saawm-thaw-naam|ซ่อมท่อน้ำ|saawm thaaw naam|修水管|动词|维修服务|维修
saawm-pratu|ซ่อมประตู|saawm bpra-dtuu|修门|动词|维修服务|维修
saawm-khreuang-sak-phaa|ซ่อมเครื่องซักผ้า|saawm khreuuang sak phaa|修洗衣机|动词|维修服务|维修
saawm-dtuu-yen|ซ่อมตู้เย็น|saawm dtuu-yen|修冰箱|动词|维修服务|维修
hai-chang-maa-duu|ให้ช่างมาดู|hai chang maa duu|让师傅来看|动词|维修服务|维修
khaa-duu-ngaan|ค่าดูงาน|khaa duu ngaan|上门检查费|名词|维修服务|费用
khaa-saawm|ค่าซ่อม|khaa saawm|维修费|名词|维修服务|费用
jaawng-khlinik|จองคลินิก|jaawng khli-nik|预约诊所|动词|诊所预约|诊所
nat-maaw|นัดหมอ|nat maaw|约医生|动词|诊所预约|诊所
khaaw-phop-maaw|ขอพบหมอ|khaaw phop maaw|请求见医生|动词|诊所预约|诊所
khiu-maaw|คิวหมอ|khiu maaw|医生号|名词|诊所预约|诊所
dtro-hai-khlinik|โทรให้คลินิก|thoo hai khli-nik|打给诊所|动词|诊所预约|诊所
jaeng-aa-gaan|แจ้งอาการ|jaeng aa-gaan|说明症状|动词|诊所预约|诊所
bpra-wat-phuu-bpuai|ประวัติผู้ป่วย|bpra-wat phuu-bpuai|病人资料|名词|诊所预约|资料
yaai-nat-maaw|ย้ายนัดหมอ|yaai nat maaw|改医生预约|动词|诊所预约|改期
jaawng-to-aa-haan|จองโต๊ะอาหาร|jaawng dto aa-haan|订餐桌|动词|餐厅订位|订位
jaawng-to-song-khon|จองโต๊ะสองคน|jaawng dto saawng khon|订两人桌|动词|餐厅订位|订位
jaawng-to-si-khon|จองโต๊ะสี่คน|jaawng dto sii khon|订四人桌|动词|餐厅订位|订位
raan-aa-haan|ร้านอาหาร|raan aa-haan|餐厅|名词|餐厅订位|订位
mee-to-waang-mai|มีโต๊ะว่างไหม|mii dto waang mai|有空桌吗|短语|餐厅订位|询问
to-rim-naa-taang|โต๊ะริมหน้าต่าง|dto rim naa-dtaang|窗边桌|名词|餐厅订位|订位
to-khaang-nai|โต๊ะข้างใน|dto khaang nai|里面的桌子|名词|餐厅订位|订位
to-khaang-naawk|โต๊ะข้างนอก|dto khaang naawk|外面的桌子|名词|餐厅订位|订位
phuu-yai-song-dek-neung|ผู้ใหญ่สองเด็กหนึ่ง|phuu-yai saawng dek neung|两个大人一个孩子|短语|餐厅订位|人数
khaaw-gao-ii-dek|ขอเก้าอี้เด็ก|khaaw gao-ii dek|请求儿童椅|动词|餐厅订位|需求
yok-loek-nat|ยกเลิกนัด|yok-loek nat|取消预约|动词|取消改期|取消
khaaw-yok-loek|ขอยกเลิก|khaaw yok-loek|请求取消|动词|取消改期|取消
leuan-nat|เลื่อนนัด|leuan nat|改期|动词|取消改期|改期
khaaw-leuan-wee-laa|ขอเลื่อนเวลา|khaaw leuan wee-laa|请求改时间|动词|取消改期|改期
khaaw-bplian-wan|ขอเปลี่ยนวัน|khaaw bplian wan|请求改日期|动词|取消改期|改期
khaaw-bplian-khiu|ขอเปลี่ยนคิว|khaaw bplian khiu|请求换号|动词|取消改期|改期
maa-mai-than|มาไม่ทัน|maa mai than|来不及到|短语|取消改期|迟到
khaaw-thoot-thii-chaa|ขอโทษที่ช้า|khaaw-thoot thii chaa|抱歉晚了|短语|取消改期|迟到
jaeng-gawn-yok-loek|แจ้งก่อนยกเลิก|jaeng gaawn yok-loek|取消前提前通知|动词|取消改期|取消
khaa-yok-loek|ค่ายกเลิก|khaa yok-loek|取消费|名词|取消改期|费用
yeun-yan-wee-laa|ยืนยันเวลา|yeun-yan wee-laa|确认时间|动词|确认信息|确认
yeun-yan-wan|ยืนยันวัน|yeun-yan wan|确认日期|动词|确认信息|确认
yeun-yan-cheu|ยืนยันชื่อ|yeun-yan cheu|确认姓名|动词|确认信息|确认
yeun-yan-ber-thoo|ยืนยันเบอร์โทร|yeun-yan ber thoo|确认电话|动词|确认信息|确认
song-khaaw-khwaam-yeun-yan|ส่งข้อความยืนยัน|song khaaw-khwaam yeun-yan|发送确认消息|动词|确认信息|确认
rap-khaaw-khwaam-yeun-yan|รับข้อความยืนยัน|rap khaaw-khwaam yeun-yan|收到确认消息|动词|确认信息|确认
lek-gaan-jaawng|เลขการจอง|lek gaan jaawng|预约号码|名词|确认信息|确认
cheu-phuu-jaawng|ชื่อผู้จอง|cheu phuu jaawng|预约人姓名|名词|确认信息|确认
ber-phuu-jaawng|เบอร์ผู้จอง|ber phuu jaawng|预约人电话|名词|确认信息|确认
raai-gaan-bo-rikaan|รายการบริการ|raai-gaan baaw-ri-gaan|服务项目清单|名词|服务项目|项目
bo-rikaan-phuen-thaan|บริการพื้นฐาน|baaw-ri-gaan pheun-thaan|基础服务|名词|服务项目|项目
bo-rikaan-phoem|บริการเพิ่ม|baaw-ri-gaan phoem|额外服务|名词|服务项目|项目
khaa-bo-rikaan|ค่าบริการ|khaa baaw-ri-gaan|服务费|名词|服务项目|费用
raakhaa-roem-dton|ราคาเริ่มต้น|raa-khaa roem-dton|起价|名词|服务项目|费用
chai-wee-laa-thao-rai|ใช้เวลาเท่าไร|chai wee-laa thao-rai|需要多久|短语|服务项目|询问
set-gii-mong|เสร็จกี่โมง|set gii moong|几点完成|短语|服务项目|询问
raw-thii-raan|รอที่ร้าน|raaw thii raan|在店里等|动词|服务项目|等待
maa-dtrong-wee-laa|มาตรงเวลา|maa dtrong wee-laa|准时来|动词|预约时间|时间
maa-gawn-wee-laa|มาก่อนเวลา|maa gaawn wee-laa|提前来|动词|预约时间|时间
maa-chaa|มาช้า|maa chaa|来晚|动词|取消改期|迟到
jaeng-maa-chaa|แจ้งมาช้า|jaeng maa chaa|通知会晚到|动词|取消改期|迟到
raw-khiu-thii-raan|รอคิวที่ร้าน|raaw khiu thii raan|在店里等号|动词|预约时间|等待
rap-khiu-naa-raan|รับคิวหน้าร้าน|rap khiu naa raan|到店取号|动词|预约时间|预约
khaaw-baep-thii-yaak-dai|ขอแบบที่อยากได้|khaaw baep thii yaak dai|说明想要的样式|动词|服务项目|需求
`;

export const VOCABULARY_EXPANSION_A2_DAILY_SERVICE_BOOKING_01: VocabularyExpansionA2DailyServiceBookingCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
