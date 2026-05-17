type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "安静规则" | "宠物访客" | "清洁卫生" | "房租费用" | "公共空间" | "钥匙门禁" | "维修安全" | "日常规定";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2SimpleHouseRulesCandidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-simple-house-rules-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `เจ้าของบ้านบอกว่า${row.thai}เป็นกฎสำคัญของที่นี่`,
    roman: `jao-khaawng baan baawk waa ${row.roman} bpen got sam-khan khaawng thii nii`,
    chinese: `房东说“${row.chinese}”是这里的重要规则。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2SimpleHouseRulesCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于家中、合租、宿舍或租房规则说明。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，租房规则中要分清禁止、允许、费用和公共空间。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["说规则时常用 ห้าม、ต้อง、กรุณา、ไม่ควร；语气从强到弱略有差别。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
got-khaawng-baan|กฎของบ้าน|got khaawng baan|家规|名词|日常规定|规则
got-khaawng-hawng|กฎของห้อง|got khaawng haawng|房间规则|名词|日常规定|规则
got-khaawng-kondo|กฎของคอนโด|got khaawng khaawn-doo|公寓规则|名词|日常规定|规则
tham-dtaam-got|ทำตามกฎ|tham dtaam got|遵守规则|动词|日常规定|规则
mai-tham-phit-got|ไม่ทำผิดกฎ|mai tham phit got|不违反规则|短语|日常规定|规则
haam-siang-dang|ห้ามเสียงดัง|haam siiang dang|禁止大声喧哗|短语|安静规则|安静
haam-song-siang-dang|ห้ามส่งเสียงดัง|haam song siiang dang|禁止发出大声|短语|安静规则|安静
haam-bpoet-phleng-dang|ห้ามเปิดเพลงดัง|haam bpoet phleeng dang|禁止大声放音乐|短语|安静规则|安静
haam-jat-ngaan-liang|ห้ามจัดงานเลี้ยง|haam jat ngaan liiang|禁止办聚会|短语|安静规则|聚会
haam-chuan-khon-yoe|ห้ามชวนคนเยอะ|haam chuan khon yoe|禁止邀请很多人|短语|宠物访客|访客
haam-rong-phleng-dang|ห้ามร้องเพลงดัง|haam raawng phleeng dang|禁止大声唱歌|短语|安静规则|安静
haam-dtawng-len-dontrii|ห้ามเล่นดนตรี|haam len don-dtrii|禁止演奏乐器|短语|安静规则|安静
haam-dang-lang-sip-thum|ห้ามดังหลังสี่ทุ่ม|haam dang lang sii thum|晚上十点后禁止吵闹|短语|安静规则|时间
wee-laa-ngiiap|เวลาเงียบ|wee-laa ngiiap|安静时段|名词|安静规则|时间
phak-phawn-khaawng-khon-uen|พักผ่อนของคนอื่น|phak-phaawn khaawng khon eun|别人的休息|名词|安静规则|礼貌
haam-liang-sat|ห้ามเลี้ยงสัตว์|haam liiang sat|禁止养宠物|短语|宠物访客|宠物
haam-liang-maa|ห้ามเลี้ยงหมา|haam liiang maa|禁止养狗|短语|宠物访客|宠物
haam-liang-maeo|ห้ามเลี้ยงแมว|haam liiang maeo|禁止养猫|短语|宠物访客|宠物
liang-sat-dai|เลี้ยงสัตว์ได้|liiang sat dai|可以养宠物|短语|宠物访客|宠物
dtawng-jaeng-gawn-liang-sat|ต้องแจ้งก่อนเลี้ยงสัตว์|dtawng jaeng gaawn liiang sat|养宠物前必须告知|短语|宠物访客|宠物
khaa-sat-liiang|ค่าสัตว์เลี้ยง|khaa sat liiang|宠物费用|名词|宠物访客|费用
phuu-ma-yiam|ผู้มาเยี่ยม|phuu maa yiiam|访客|名词|宠物访客|访客
haam-phuu-ma-yiam-khaang-khuen|ห้ามผู้มาเยี่ยมค้างคืน|haam phuu maa yiiam khaang kheun|访客禁止过夜|短语|宠物访客|访客
jaeng-phuu-ma-yiam|แจ้งผู้มาเยี่ยม|jaeng phuu maa yiiam|告知访客信息|动词|宠物访客|访客
long-cheu-phuu-ma-yiam|ลงชื่อผู้มาเยี่ยม|long cheu phuu maa yiiam|登记访客姓名|动词|宠物访客|访客
rap-khaek-thii-lobby|รับแขกที่ล็อบบี้|rap khaek thii lawp-bii|在大堂接待客人|动词|宠物访客|访客
haam-khaek-khao-hawng|ห้ามแขกเข้าห้อง|haam khaek khao haawng|禁止客人进房间|短语|宠物访客|访客
rak-saa-khwaam-sa-aat|รักษาความสะอาด|rak-saa khwaam sa-aat|保持干净|动词|清洁卫生|清洁
tham-khwaam-sa-aat-lang-chai|ทำความสะอาดหลังใช้|tham khwaam sa-aat lang chai|使用后清洁|动词|清洁卫生|清洁
haam-thing-kha-ya|ห้ามทิ้งขยะ|haam thing kha-ya|禁止乱扔垃圾|短语|清洁卫生|垃圾
thing-kha-ya-hai-thuuk-thii|ทิ้งขยะให้ถูกที่|thing kha-ya hai thuuk thii|把垃圾丢到正确地方|动词|清洁卫生|垃圾
yaek-kha-ya|แยกขยะ|yaek kha-ya|垃圾分类|动词|清洁卫生|垃圾
kha-ya-bpiak|ขยะเปียก|kha-ya bpiiak|湿垃圾|名词|清洁卫生|垃圾
kha-ya-haeng|ขยะแห้ง|kha-ya haaeng|干垃圾|名词|清洁卫生|垃圾
the-kha-ya-dtawn-chao|เทขยะตอนเช้า|the kha-ya dtaawn chaao|早上倒垃圾|动词|清洁卫生|垃圾
haam-wang-khaawng-naa-hong|ห้ามวางของหน้าห้อง|haam waang khaawng naa haawng|禁止在房门口放东西|短语|清洁卫生|公共
haam-wang-rongthao-naa-hong|ห้ามวางรองเท้าหน้าห้อง|haam waang raawng-thaao naa haawng|禁止在门口放鞋|短语|清洁卫生|公共
haam-suu-buri|ห้ามสูบบุหรี่|haam suup bu-rii|禁止吸烟|短语|清洁卫生|安全
suup-buri-dai-thii-nai|สูบบุหรี่ได้ที่ไหน|suup bu-rii dai thii nai|哪里可以吸烟|短语|清洁卫生|询问
haam-yang-aa-haan-nai-hawng|ห้ามย่างอาหารในห้อง|haam yaang aa-haan nai haawng|禁止在房间烤食物|短语|日常规定|厨房
haam-tham-aa-haan-glin-raeng|ห้ามทำอาหารกลิ่นแรง|haam tham aa-haan glin raaeng|禁止做味道重的食物|短语|日常规定|厨房
chai-khrua-ruam|ใช้ครัวรวม|chai khrua ruam|使用公共厨房|动词|公共空间|厨房
laang-jaan-lang-chai|ล้างจานหลังใช้|laang jaan lang chai|使用后洗碗|动词|清洁卫生|厨房
jaai-khaa-chao-trong-weelaa|จ่ายค่าเช่าตรงเวลา|jaai khaa chao dtrong wee-laa|按时交租|动词|房租费用|房租
jaai-khaa-chao-gawn-wan-thii-haa|จ่ายค่าเช่าก่อนวันที่ห้า|jaai khaa chao gaawn wan thii haa|五号前交租|短语|房租费用|房租
khaa-chao-khaang|ค่าเช่าค้าง|khaa chao khaang|拖欠房租|名词|房租费用|房租
bai-set-khaa-chao|ใบเสร็จค่าเช่า|bai-set khaa chao|房租收据|名词|房租费用|收据
khaa-nam-khaa-fai|ค่าน้ำค่าไฟ|khaa naam khaa fai|水电费|名词|房租费用|费用
jaai-khaa-nam-khaa-fai|จ่ายค่าน้ำค่าไฟ|jaai khaa naam khaa fai|交水电费|动词|房租费用|费用
khaa-internet|ค่าอินเทอร์เน็ต|khaa in-thoe-net|网费|名词|房租费用|费用
khaa-suan-glang|ค่าส่วนกลาง|khaa suan glaang|物业公共费|名词|房租费用|费用
ngen-pragan|เงินประกัน|ngoen bpra-gan|押金|名词|房租费用|押金
kheun-ngen-pragan|คืนเงินประกัน|kheun ngoen bpra-gan|退押金|动词|房租费用|押金
dtong-jaeng-gawn-yai-aawk|ต้องแจ้งก่อนย้ายออก|dtawng jaeng gaawn yaai aawk|搬出前必须通知|短语|房租费用|搬家
jaeng-yai-aawk|แจ้งย้ายออก|jaeng yaai aawk|通知搬出|动词|房租费用|搬家
phuen-thii-ruam|พื้นที่รวม|pheun-thii ruam|公共区域|名词|公共空间|公共
hong-nang-len-ruam|ห้องนั่งเล่นรวม|haawng nang len ruam|公共客厅|名词|公共空间|公共
khrua-ruam|ครัวรวม|khrua ruam|公共厨房|名词|公共空间|公共
hong-sak-phaa|ห้องซักผ้า|haawng sak phaa|洗衣房|名词|公共空间|公共
chai-hong-sak-phaa|ใช้ห้องซักผ้า|chai haawng sak phaa|使用洗衣房|动词|公共空间|公共
haam-yuet-phuen-thii-ruam|ห้ามยึดพื้นที่รวม|haam yeut pheun-thii ruam|禁止占用公共区域|短语|公共空间|公共
gep-khaawng-khaawng-tua-eng|เก็บของของตัวเอง|gep khaawng khaawng dtua eeng|收好自己的东西|动词|公共空间|公共
mai-ginn-khaawng-khon-uen|ไม่กินของคนอื่น|mai gin khaawng khon eun|不吃别人的东西|短语|公共空间|礼貌
dtid-cheu-bon-khaawng|ติดชื่อบนของ|dtit cheu bon khaawng|在物品上贴名字|动词|公共空间|礼貌
gunjae-hawng|กุญแจห้อง|gun-jae haawng|房间钥匙|名词|钥匙门禁|钥匙
bat-khao-tuek|บัตรเข้าตึก|bat khao dteuk|大楼门禁卡|名词|钥匙门禁|门禁
rahat-pratu|รหัสประตู|ra-hat bpra-dtuu|门禁密码|名词|钥匙门禁|门禁
haam-bok-rahat|ห้ามบอกรหัส|haam baawk ra-hat|禁止告诉密码|短语|钥匙门禁|门禁
haam-hai-gunjae-khon-uen|ห้ามให้กุญแจคนอื่น|haam hai gun-jae khon eun|禁止把钥匙给别人|短语|钥匙门禁|钥匙
gunjae-haai|กุญแจหาย|gun-jae haai|钥匙丢失|短语|钥匙门禁|钥匙
bat-khao-tuek-haai|บัตรเข้าตึกหาย|bat khao dteuk haai|门禁卡丢失|短语|钥匙门禁|门禁
khaa-tham-bat-mai|ค่าทำบัตรใหม่|khaa tham bat mai|补办卡费用|名词|钥匙门禁|费用
lock-pratu-thuk-khrang|ล็อกประตูทุกครั้ง|lok bpra-dtuu thuk khrang|每次锁门|动词|钥匙门禁|安全
pit-pratu-hai-sanit|ปิดประตูให้สนิท|bpit bpra-dtuu hai sa-nit|把门关严|动词|钥匙门禁|安全
haam-poet-pratu-hai-khon-plaek-naa|ห้ามเปิดประตูให้คนแปลกหน้า|haam bpoet bpra-dtuu hai khon bplaek naa|禁止给陌生人开门|短语|钥匙门禁|安全
jaeng-sia-haai|แจ้งเสียหาย|jaeng siia-haai|报告损坏|动词|维修安全|维修
jaeng-saawm|แจ้งซ่อม|jaeng saawm|报修|动词|维修安全|维修
haam-saawm-eeng|ห้ามซ่อมเอง|haam saawm eeng|禁止自己维修|短语|维修安全|维修
riiak-chang|เรียกช่าง|riiak chang|叫维修师傅|动词|维修安全|维修
thaaw-naam-rua|ท่อน้ำรั่ว|thaaw naam rua|水管漏水|短语|维修安全|维修
fai-sia|ไฟเสีย|fai siia|电路/灯坏了|短语|维修安全|维修
pratu-sia|ประตูเสีย|bpra-dtuu siia|门坏了|短语|维修安全|维修
haam-chai-fai-goen|ห้ามใช้ไฟเกิน|haam chai fai goen|禁止超负荷用电|短语|维修安全|安全
haam-dtang-khreuang-yai|ห้ามตั้งเครื่องใหญ่|haam dtang khreuuang yai|禁止放大型机器|短语|日常规定|设备
haam-kwang-thaang-doen|ห้ามขวางทางเดิน|haam khwaang thaang doen|禁止堵住走道|短语|公共空间|安全
haam-dak-khaawng-naa-pratu|ห้ามดักของหน้าประตู|haam dak khaawng naa bpra-dtuu|禁止把东西堆在门前|短语|公共空间|安全
dtong-rak-saa-khwaam-bplotphai|ต้องรักษาความปลอดภัย|dtawng rak-saa khwaam bplaawt-phai|必须保持安全|短语|维修安全|安全
haam-poet-gas-thip|ห้ามเปิดแก๊สทิ้ง|haam bpoet gaet thing|禁止开着燃气不管|短语|维修安全|安全
pit-gas-lang-chai|ปิดแก๊สหลังใช้|bpit gaet lang chai|使用后关闭燃气|动词|维修安全|安全
haam-dtua-khaawng-naa-lift|ห้ามกองของหน้าลิฟต์|haam gaawng khaawng naa lif|禁止在电梯前堆物|短语|公共空间|公共
haam-len-nai-thaang-doen|ห้ามเล่นในทางเดิน|haam len nai thaang doen|禁止在走道玩耍|短语|公共空间|公共
haam-sak-phaa-lang-sip-thum|ห้ามซักผ้าหลังสี่ทุ่ม|haam sak phaa lang sii thum|晚上十点后禁止洗衣|短语|安静规则|时间
dtong-gep-phaa-hai-riapraawy|ต้องเก็บผ้าให้เรียบร้อย|dtawng gep phaa hai riap-raawy|必须把衣服收整齐|短语|清洁卫生|清洁
haam-dtaak-phaa-naa-hong|ห้ามตากผ้าหน้าห้อง|haam dtaak phaa naa haawng|禁止在房门口晾衣服|短语|清洁卫生|清洁
haam-bplian-lock-eeng|ห้ามเปลี่ยนล็อกเอง|haam bplian lok eeng|禁止自行换锁|短语|钥匙门禁|钥匙
jaeng-gawn-bplian-khaawng|แจ้งก่อนเปลี่ยนของ|jaeng gaawn bplian khaawng|更换物品前先告知|动词|日常规定|规则
dtong-kheun-hawng-sa-aat|ต้องคืนห้องสะอาด|dtawng kheun haawng sa-aat|退房时必须保持房间干净|短语|清洁卫生|搬家
`;

export const VOCABULARY_EXPANSION_A2_SIMPLE_HOUSE_RULES_01: VocabularyExpansionA2SimpleHouseRulesCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
