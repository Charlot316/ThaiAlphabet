type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "约朋友" | "改约取消" | "吃饭电影" | "谁来不来" | "时间地点" | "等待碰面" | "邀请回应" | "简单安排";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2SimpleSocialPlansCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-simple-social-plans-candidate", "pythainlp-corpus"];

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
  return {
    thai: `เราคุยเรื่อง${row.thai}ในแชตก่อนออกจากบ้าน`,
    roman: `rao khui reuuang ${row.roman} nai chaet gaawn aawk jaak baan`,
    chinese: `我们出门前会在聊天里沟通“${row.chinese}”。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2SimpleSocialPlansCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于约朋友、改时间、确认地点、回应邀请或简单社交安排。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，约人时要分清时间、地点、人数和回应。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["和朋友约时间时，常用 ว่างไหม、ไปด้วยกันไหม、เจอกันกี่โมง、เลื่อนได้ไหม。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
nat-phuean|นัดเพื่อน|nat pheuan|约朋友|动词|约朋友|约人
chuan-phuean|ชวนเพื่อน|chuan pheuan|邀请朋友|动词|约朋友|邀请
chuan-bpai-gin-khaao|ชวนไปกินข้าว|chuan bpai gin khaao|邀请去吃饭|动词|吃饭电影|邀请
chuan-bpai-duu-nang|ชวนไปดูหนัง|chuan bpai duu nang|邀请去看电影|动词|吃饭电影|邀请
chuan-bpai-duem-gafae|ชวนไปดื่มกาแฟ|chuan bpai duem gaa-fae|邀请去喝咖啡|动词|约朋友|邀请
chuan-bpai-dern-len|ชวนไปเดินเล่น|chuan bpai doen len|邀请去散步|动词|约朋友|邀请
chuan-bpai-talaat|ชวนไปตลาด|chuan bpai dta-laat|邀请去市场|动词|简单安排|邀请
chuan-bpai-thiao|ชวนไปเที่ยว|chuan bpai thiao|邀请出去玩|动词|约朋友|邀请
pai-duai-gan|ไปด้วยกัน|bpai duai gan|一起去|动词|约朋友|一起
gin-duai-gan|กินด้วยกัน|gin duai gan|一起吃|动词|吃饭电影|一起
duu-nang-duai-gan|ดูหนังด้วยกัน|duu nang duai gan|一起看电影|动词|吃饭电影|一起
dern-len-duai-gan|เดินเล่นด้วยกัน|doen len duai gan|一起散步|动词|约朋友|一起
wan-nii-waang-mai|วันนี้ว่างไหม|wan-nii waang mai|今天有空吗|短语|邀请回应|询问
phrung-nii-waang-mai|พรุ่งนี้ว่างไหม|phrung-nii waang mai|明天有空吗|短语|邀请回应|询问
saao-aa-thit-nii-waang-mai|เสาร์อาทิตย์นี้ว่างไหม|sao aa-thit nii waang mai|这周末有空吗|短语|邀请回应|询问
mee-wee-laa-mai|มีเวลาไหม|mii wee-laa mai|有时间吗|短语|邀请回应|询问
bpai-dai-mai|ไปได้ไหม|bpai dai mai|能去吗|短语|邀请回应|询问
maa-dai-mai|มาได้ไหม|maa dai mai|能来吗|短语|邀请回应|询问
san-jai-mai|สนใจไหม|son-jai mai|感兴趣吗|短语|邀请回应|询问
yaak-bpai-mai|อยากไปไหม|yaak bpai mai|想去吗|短语|邀请回应|询问
yaak-gin-arai|อยากกินอะไร|yaak gin a-rai|想吃什么|短语|吃饭电影|询问
yaak-duu-nang-arai|อยากดูหนังอะไร|yaak duu nang a-rai|想看什么电影|短语|吃饭电影|询问
dtok-long|ตกลง|dtok-long|同意；说定|短语|邀请回应|回应
bpai-dai|ไปได้|bpai dai|可以去|短语|邀请回应|回应
maa-dai|มาได้|maa dai|可以来|短语|邀请回应|回应
bpai-mai-dai|ไปไม่ได้|bpai mai dai|不能去|短语|邀请回应|回应
maa-mai-dai|มาไม่ได้|maa mai dai|不能来|短语|邀请回应|回应
yang-mai-nae-jai|ยังไม่แน่ใจ|yang mai nae-jai|还不确定|短语|邀请回应|回应
khaaw-duu-gaawn|ขอดูก่อน|khaaw duu gaawn|先看看再说|短语|邀请回应|回应
khaaw-thaam-khon-uen-gaawn|ขอถามคนอื่นก่อน|khaaw thaam khon eun gaawn|先问别人|短语|邀请回应|回应
dtok-long-laeo|ตกลงแล้ว|dtok-long laeo|已经说定了|短语|邀请回应|回应
jer-gan|เจอกัน|joe gan|见面|动词|等待碰面|见面
jer-gan-gii-mong|เจอกันกี่โมง|joe gan gii moong|几点见|短语|时间地点|时间
jer-gan-thii-nai|เจอกันที่ไหน|joe gan thii nai|在哪里见|短语|时间地点|地点
jer-gan-dton-yen|เจอกันตอนเย็น|joe gan dtaawn yen|傍晚见|短语|时间地点|时间
jer-gan-dton-thiang|เจอกันตอนเที่ยง|joe gan dtaawn thiiang|中午见|短语|时间地点|时间
jer-gan-naa-raan|เจอกันหน้าร้าน|joe gan naa raan|在店门口见|短语|时间地点|地点
jer-gan-naa-roon-nang|เจอกันหน้าโรงหนัง|joe gan naa roong nang|在电影院前见|短语|吃饭电影|地点
jer-gan-thii-sathanii|เจอกันที่สถานี|joe gan thii sa-thaa-nii|在车站见|短语|时间地点|地点
raw-thii-nai|รอที่ไหน|raaw thii nai|在哪里等|短语|等待碰面|等待
raw-naa-raan|รอหน้าร้าน|raaw naa raan|在店门口等|动词|等待碰面|等待
raw-nai-raan|รอในร้าน|raaw nai raan|在店里等|动词|等待碰面|等待
raw-thii-lobby|รอที่ล็อบบี้|raaw thii lawp-bii|在大堂等|动词|等待碰面|等待
raw-sak-khruu|รอสักครู่|raaw sak khruu|等一下|动词|等待碰面|等待
raw-iik-sip-naa-thii|รออีกสิบนาที|raaw iik sip naa-thii|再等十分钟|短语|等待碰面|等待
maa-theung-laeo|มาถึงแล้ว|maa theung laeo|已经到了|短语|等待碰面|到达
yang-mai-theung|ยังไม่ถึง|yang mai theung|还没到|短语|等待碰面|到达
gam-lang-bpai|กำลังไป|gam-lang bpai|正在去|短语|等待碰面|路上
glai-theung-laeo|ใกล้ถึงแล้ว|glai theung laeo|快到了|短语|等待碰面|路上
rot-dtit|รถติด|rot dtit|堵车|短语|改约取消|迟到
maa-saai|มาสาย|maa saai|迟到|动词|改约取消|迟到
khaaw-thoot-thii-saai|ขอโทษที่สาย|khaaw-thoot thii saai|抱歉迟到|短语|改约取消|迟到
cha-bpra-maan-sip-naa-thii|ช้าประมาณสิบนาที|chaa bpra-maan sip naa-thii|大约晚十分钟|短语|改约取消|迟到
bplian-wee-laa|เปลี่ยนเวลา|bplian wee-laa|改时间|动词|改约取消|改约
leuan-nat|เลื่อนนัด|leuan nat|改约延期|动词|改约取消|改约
khaaw-leuan-pen-phrung-nii|ขอเลื่อนเป็นพรุ่งนี้|khaaw leuan bpen phrung-nii|请求改到明天|短语|改约取消|改约
khaaw-bplian-wan|ขอเปลี่ยนวัน|khaaw bplian wan|请求改日期|动词|改约取消|改约
khaaw-bplian-thii|ขอเปลี่ยนที่|khaaw bplian thii|请求改地点|动词|改约取消|改约
yok-loek-nat|ยกเลิกนัด|yok-loek nat|取消约定|动词|改约取消|取消
bpai-khrang-naa|ไปครั้งหน้า|bpai khrang naa|下次去|短语|改约取消|改约
wai-khrang-naa|ไว้ครั้งหน้า|wai khrang naa|留到下次|短语|改约取消|改约
wan-nii-mai-saduak|วันนี้ไม่สะดวก|wan-nii mai sa-duak|今天不方便|短语|改约取消|回应
mee-thu-ra|มีธุระ|mii thu-ra|有事|短语|改约取消|回应
mai-sabai|ไม่สบาย|mai sa-baai|不舒服|短语|改约取消|回应
tid-ngaan|ติดงาน|dtit ngaan|工作抽不开身|短语|改约取消|回应
phuean-maa-dai|เพื่อนมาได้|pheuan maa dai|朋友能来|短语|谁来不来|人数
phuean-maa-mai-dai|เพื่อนมาไม่ได้|pheuan maa mai dai|朋友不能来|短语|谁来不来|人数
khrai-maa-baang|ใครมาบ้าง|khrai maa baang|谁会来|短语|谁来不来|人数
khrai-mai-maa|ใครไม่มา|khrai mai maa|谁不来|短语|谁来不来|人数
maa-gii-khon|มากี่คน|maa gii khon|来几个人|短语|谁来不来|人数
saawng-khon|สองคน|saawng khon|两个人|名词|谁来不来|人数
laai-khon|หลายคน|laai khon|好几个人|名词|谁来不来|人数
maa-duai-gan|มาด้วยกัน|maa duai gan|一起来|动词|谁来不来|一起
maa-khon-diao|มาคนเดียว|maa khon diao|一个人来|动词|谁来不来|人数
phaa-phuean-maa|พาเพื่อนมา|phaa pheuan maa|带朋友来|动词|谁来不来|人数
chuan-khon-uen|ชวนคนอื่น|chuan khon eun|邀请别人|动词|谁来不来|邀请
jang-to|จองโต๊ะ|jaawng dto|订桌|动词|吃饭电影|吃饭
jong-tua-nang|จองตั๋วหนัง|jaawng dtua nang|订电影票|动词|吃饭电影|电影
seu-tua-nang|ซื้อตั๋วหนัง|seu dtua nang|买电影票|动词|吃饭电影|电影
roop-nang|รอบหนัง|raawp nang|电影场次|名词|吃饭电影|电影
nang-roop-yen|หนังรอบเย็น|nang raawp yen|晚场电影|名词|吃饭电影|电影
raan-aa-haan|ร้านอาหาร|raan aa-haan|餐厅|名词|吃饭电影|吃饭
raan-gafae|ร้านกาแฟ|raan gaa-fae|咖啡店|名词|约朋友|地点
raan-cha|ร้านชา|raan chaa|茶店|名词|约朋友|地点
thii-nang-nai-raan|ที่นั่งในร้าน|thii-nang nai raan|店内座位|名词|吃饭电影|地点
raan-dtem|ร้านเต็ม|raan dtem|店满座|短语|吃饭电影|吃饭
dtong-raw-khiu|ต้องรอคิว|dtawng raaw khiu|需要排队|短语|吃饭电影|吃饭
gin-arai-dii|กินอะไรดี|gin a-rai dii|吃什么好|短语|吃饭电影|询问
du-nang-arai-dii|ดูหนังอะไรดี|duu nang a-rai dii|看什么电影好|短语|吃饭电影|询问
bpai-tee-nai-dii|ไปที่ไหนดี|bpai thii nai dii|去哪儿好|短语|简单安排|询问
tham-arai-dii|ทำอะไรดี|tham a-rai dii|做什么好|短语|简单安排|询问
waang-laeo|ว่างแล้ว|waang laeo|已经有空了|短语|邀请回应|回应
yang-tid-yuu|ยังติดอยู่|yang dtit yuu|还抽不开身|短语|邀请回应|回应
mai-bpen-rai|ไม่เป็นไร|mai bpen rai|没关系|短语|邀请回应|回应
yin-dii|ยินดี|yin-dii|乐意|形容词|邀请回应|回应
khop-khun-thii-chuan|ขอบคุณที่ชวน|khaawp-khun thii chuan|谢谢邀请|短语|邀请回应|回应
sia-dai|เสียดาย|siia-daai|可惜|形容词|邀请回应|回应
nat-kan-mai|นัดกันใหม่|nat gan mai|重新约|动词|改约取消|改约
sum-up-nat|สรุปนัด|sa-ruup nat|总结约定|动词|简单安排|确认
yeun-yan-nat|ยืนยันนัด|yeun-yan nat|确认约定|动词|简单安排|确认
jaeng-nai-glum|แจ้งในกลุ่ม|jaeng nai glum|在群里通知|动词|简单安排|通知
song-dtam-naeng|ส่งตำแหน่ง|song dtam-naeng|发送位置|动词|时间地点|地点
song-phaen-thii|ส่งแผนที่|song phaen-thii|发送地图|动词|时间地点|地点
thii-jawt-rot|ที่จอดรถ|thii jaawt rot|停车处|名词|时间地点|地点
bpra-dtuu-thaang-khao|ประตูทางเข้า|bpra-dtuu thaang-khao|入口|名词|时间地点|地点
bpra-dtuu-thaang-aawk|ประตูทางออก|bpra-dtuu thaang-aawk|出口|名词|时间地点|地点
naa-hang|หน้าห้าง|naa haang|商场门口|名词|时间地点|地点
nai-hang|ในห้าง|nai haang|商场里|名词|时间地点|地点
chan-nueng|ชั้นหนึ่ง|chan neung|一楼|名词|时间地点|地点
chan-saawng|ชั้นสอง|chan saawng|二楼|名词|时间地点|地点
dtong-thoo-haa|ต้องโทรหา|dtawng thoo haa|需要打电话给|短语|简单安排|电话
dtong-song-khaaw-khwaam|ต้องส่งข้อความ|dtawng song khaaw-khwaam|需要发消息|短语|简单安排|消息
kui-kan-gaawn|คุยกันก่อน|khui gan gaawn|先商量|动词|简单安排|商量
waang-phaen-gan|วางแผนกัน|waang phaen gan|一起计划|动词|简单安排|计划
`;

export const VOCABULARY_EXPANSION_A2_SIMPLE_SOCIAL_PLANS_01: VocabularyExpansionA2SimpleSocialPlansCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
