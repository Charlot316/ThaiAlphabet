export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "问路" | "入住" | "买票" | "点餐" | "投诉小问题" | "请求推荐" | "确认时间地点";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const SIMPLE_TRAVEL_CONVERSATIONS_REFS = ["thai-frequency", "thai-a2-simple-travel-conversations-candidate"];

const places: readonly Item[] = [
  { thai: "สถานีรถไฟ", roman: "sa-thaa-nii rot-fai", chinese: "火车站", id: "sa-thaa-nii-rot-fai" },
  { thai: "โรงแรมใกล้แม่น้ำ", roman: "roong-raaem glai maae-naam", chinese: "河边的酒店", id: "roong-raaem-glai-maae-naam" },
  { thai: "ตลาดกลางคืน", roman: "dta-laat glaang-kheuun", chinese: "夜市", id: "dta-laat-glaang-kheuun" },
  { thai: "วัดใหญ่", roman: "wat yai", chinese: "大寺庙", id: "wat-yai" },
  { thai: "พิพิธภัณฑ์", roman: "phi-phit-tha-phan", chinese: "博物馆", id: "phi-phit-tha-phan" },
  { thai: "ร้านอาหารริมน้ำ", roman: "raan aa-haan rim naam", chinese: "水边餐厅", id: "raan-aa-haan-rim-naam" },
  { thai: "เคาน์เตอร์ตั๋ว", roman: "khao-dtooe dtuaa", chinese: "售票柜台", id: "khao-dtooe-dtuaa" },
  { thai: "ประตูขึ้นรถ", roman: "bpra-dtuu kheun rot", chinese: "上车口", id: "bpra-dtuu-kheun-rot" },
  { thai: "จุดรับกระเป๋า", roman: "jut rap gra-bpao", chinese: "取行李处", id: "jut-rap-gra-bpao" },
  { thai: "ห้องน้ำใกล้ที่สุด", roman: "haawng naam glai thii-sut", chinese: "最近的洗手间", id: "haawng-naam-glai-thii-sut" },
  { thai: "ป้ายรถเมล์", roman: "bpaai rot-mee", chinese: "公交站牌", id: "bpaai-rot-mee" },
  { thai: "ท่าเรือ", roman: "thaa reuua", chinese: "码头", id: "thaa-reuua" },
  { thai: "ร้านกาแฟเงียบๆ", roman: "raan gaa-faae ngiiap ngiiap", chinese: "安静的咖啡店", id: "raan-gaa-faae-ngiiap-ngiiap" },
  { thai: "จุดถ่ายรูป", roman: "jut thaai ruup", chinese: "拍照点", id: "jut-thaai-ruup" },
  { thai: "ศูนย์ข้อมูลนักท่องเที่ยว", roman: "suun khaaw-muun nak-thaawng-thiaao", chinese: "游客信息中心", id: "suun-khaaw-muun-nak-thaawng-thiaao" },
  { thai: "ถนนคนเดิน", roman: "tha-non khon doeen", chinese: "步行街", id: "tha-non-khon-doeen" },
];

const hotelNeeds: readonly Item[] = [
  { thai: "ห้องที่จองไว้", roman: "haawng thii jaawng wai", chinese: "预订好的房间", id: "haawng-thii-jaawng-wai" },
  { thai: "กุญแจห้อง", roman: "gun-jaae haawng", chinese: "房间钥匙", id: "gun-jaae-haawng" },
  { thai: "ผ้าเช็ดตัวเพิ่ม", roman: "phaa chet dtua phoem", chinese: "额外毛巾", id: "phaa-chet-dtua-phoem" },
  { thai: "น้ำดื่มสองขวด", roman: "naam deum saawng khuaat", chinese: "两瓶饮用水", id: "naam-deum-saawng-khuaat" },
  { thai: "รหัสไวไฟ", roman: "ra-hat wai-fai", chinese: "无线网络密码", id: "ra-hat-wai-fai" },
  { thai: "อาหารเช้า", roman: "aa-haan chaao", chinese: "早餐", id: "aa-haan-chaao" },
  { thai: "เวลาเช็กเอาต์", roman: "wee-laa chek ao", chinese: "退房时间", id: "wee-laa-chek-ao" },
  { thai: "ที่ฝากกระเป๋า", roman: "thii faak gra-bpao", chinese: "寄存行李处", id: "thii-faak-gra-bpao" },
  { thai: "ห้องปลอดบุหรี่", roman: "haawng bplaawt bu-rii", chinese: "无烟房", id: "haawng-bplaawt-bu-rii" },
  { thai: "ใบจองโรงแรม", roman: "bai jaawng roong-raaem", chinese: "酒店预订单", id: "bai-jaawng-roong-raaem" },
  { thai: "แผนที่แถวนี้", roman: "phaaen-thii thaaeo nii", chinese: "附近地图", id: "phaaen-thii-thaaeo-nii" },
  { thai: "รถไปสนามบิน", roman: "rot bpai sa-naam-bin", chinese: "去机场的车", id: "rot-bpai-sa-naam-bin" },
];

const tickets: readonly Item[] = [
  { thai: "ตั๋วรถไฟไปเชียงใหม่", roman: "dtuaa rot-fai bpai chiiang mai", chinese: "去清迈的火车票", id: "dtuaa-rot-fai-bpai-chiiang-mai" },
  { thai: "ตั๋วรถบัสรอบเช้า", roman: "dtuaa rot-bas raawp chaao", chinese: "早班巴士票", id: "dtuaa-rot-bas-raawp-chaao" },
  { thai: "ตั๋วเรือเที่ยวเดียว", roman: "dtuaa reuua thiaao diaao", chinese: "单程船票", id: "dtuaa-reuua-thiaao-diaao" },
  { thai: "ตั๋วเข้าวัด", roman: "dtuaa khao wat", chinese: "寺庙门票", id: "dtuaa-khao-wat" },
  { thai: "ตั๋วเข้าพิพิธภัณฑ์", roman: "dtuaa khao phi-phit-tha-phan", chinese: "博物馆门票", id: "dtuaa-khao-phi-phit-tha-phan" },
  { thai: "บัตรโดยสารรายวัน", roman: "bat dooi-saan raai wan", chinese: "一日交通票", id: "bat-dooi-saan-raai-wan" },
  { thai: "ที่นั่งริมหน้าต่าง", roman: "thii nang rim naa-dtaang", chinese: "靠窗座位", id: "thii-nang-rim-naa-dtaang" },
  { thai: "รอบบ่ายสอง", roman: "raawp baai saawng", chinese: "下午两点场/班次", id: "raawp-baai-saawng" },
  { thai: "ตั๋วสำหรับเด็ก", roman: "dtuaa sam-rap dek", chinese: "儿童票", id: "dtuaa-sam-rap-dek" },
  { thai: "ตั๋วสำหรับผู้ใหญ่", roman: "dtuaa sam-rap phuu-yai", chinese: "成人票", id: "dtuaa-sam-rap-phuu-yai" },
  { thai: "ใบเสร็จค่าตั๋ว", roman: "bai-set khaa dtuaa", chinese: "票款收据", id: "bai-set-khaa-dtuaa" },
  { thai: "ตั๋วไปกลับ", roman: "dtuaa bpai glap", chinese: "往返票", id: "dtuaa-bpai-glap" },
];

const foods: readonly Item[] = [
  { thai: "ข้าวผัดไม่เผ็ด", roman: "khaao phat mai phet", chinese: "不辣炒饭", id: "khaao-phat-mai-phet" },
  { thai: "ต้มยำกุ้งถ้วยเล็ก", roman: "dtom-yam gung thuai lek", chinese: "小碗冬阴功虾汤", id: "dtom-yam-gung-thuai-lek" },
  { thai: "น้ำมะพร้าวเย็น", roman: "naam ma-phraao yen", chinese: "冰椰子水", id: "naam-ma-phraao-yen" },
  { thai: "กาแฟหวานน้อย", roman: "gaa-faae waan naawy", chinese: "少甜咖啡", id: "gaa-faae-waan-naawy" },
  { thai: "ผัดไทยไม่ใส่ถั่ว", roman: "phat thai mai sai thuaa", chinese: "不放花生的泰式炒粉", id: "phat-thai-mai-sai-thuaa" },
  { thai: "น้ำแข็งแก้วหนึ่ง", roman: "naam-khaeng gaew neung", chinese: "一杯冰块", id: "naam-khaeng-gaaeo-neung" },
  { thai: "จานแบ่งสองใบ", roman: "jaan baeng saawng bai", chinese: "两个分餐盘", id: "jaan-baeng-saawng-bai" },
  { thai: "เมนูภาษาไทย", roman: "mee-nuu phaa-saa thai", chinese: "泰文菜单", id: "mee-nuu-phaa-saa-thai" },
  { thai: "ของหวานแนะนำ", roman: "khaawng waan nae-nam", chinese: "推荐甜点", id: "khaawng-waan-nae-nam" },
  { thai: "น้ำเปล่าไม่เย็น", roman: "naam bplaao mai yen", chinese: "不冰的白水", id: "naam-bplaao-mai-yen" },
  { thai: "ข้าวสวยหนึ่งจาน", roman: "khaao suai neung jaan", chinese: "一盘白米饭", id: "khaao-suai-neung-jaan" },
  { thai: "อาหารเจง่ายๆ", roman: "aa-haan jee ngaai ngaai", chinese: "简单素食", id: "aa-haan-jee-ngaai-ngaai" },
];

const issues: readonly Item[] = [
  { thai: "แอร์ไม่เย็น", roman: "aae mai yen", chinese: "空调不冷", id: "aae-mai-yen" },
  { thai: "น้ำอุ่นไม่ทำงาน", roman: "naam un mai tham-ngaan", chinese: "热水不能用", id: "naam-un-mai-tham-ngaan" },
  { thai: "ห้องมีกลิ่นบุหรี่", roman: "haawng mii glin bu-rii", chinese: "房间有烟味", id: "haawng-mii-glin-bu-rii" },
  { thai: "ไวไฟช้ามาก", roman: "wai-fai chaa maak", chinese: "无线网络很慢", id: "wai-fai-chaa-maak" },
  { thai: "กุญแจห้องใช้ไม่ได้", roman: "gun-jaae haawng chai mai dai", chinese: "房间钥匙不能用", id: "gun-jaae-haawng-chai-mai-dai" },
  { thai: "เสียงข้างห้องดัง", roman: "siiang khaang haawng dang", chinese: "隔壁房间声音很大", id: "siiang-khaang-haawng-dang" },
  { thai: "อาหารมาช้า", roman: "aa-haan maa chaa", chinese: "菜上得慢", id: "aa-haan-maa-chaa" },
  { thai: "คิดเงินผิด", roman: "khit ngoen phit", chinese: "算错钱", id: "khit-ngoen-phit" },
  { thai: "ตั๋วพิมพ์ชื่อผิด", roman: "dtuaa phim cheuu phit", chinese: "票上名字打印错了", id: "dtuaa-phim-cheuu-phit" },
  { thai: "รถมาช้ากว่ากำหนด", roman: "rot maa chaa gwaa gam-not", chinese: "车比规定时间来得晚", id: "rot-maa-chaa-gwaa-gam-not" },
  { thai: "กระเป๋ายังไม่มา", roman: "gra-bpao yang mai maa", chinese: "行李还没到", id: "gra-bpao-yang-mai-maa" },
  { thai: "ห้องไม่ตรงกับที่จอง", roman: "haawng mai dtrong gap thii jaawng", chinese: "房间和预订的不一致", id: "haawng-mai-dtrong-gap-thii-jaawng" },
];

const directRows: readonly Definition[] = [
  { thai: "ขอถามทางหน่อยได้ไหม", id: "khaaw-thaam-thaang-naawy-dai-mai", roman: "khaaw thaam thaang naawy dai mai", chinese: "可以问一下路吗", partOfSpeech: "短语", theme: "问路", exampleThai: "ขอโทษครับ ขอถามทางหน่อยได้ไหม", exampleRoman: "khaaw-thoot khrap, khaaw thaam thaang naawy dai mai", exampleChinese: "不好意思，可以问一下路吗？", tag: "问路" },
  { thai: "ฉันจองห้องไว้แล้ว", id: "chan-jaawng-haawng-wai-laaeo", roman: "chan jaawng haawng wai laaeo", chinese: "我已经订好房间了", partOfSpeech: "短语", theme: "入住", exampleThai: "สวัสดีค่ะ ฉันจองห้องไว้แล้วในชื่อหลิน", exampleRoman: "sa-wat-dii kha, chan jaawng haawng wai laaeo nai cheuu lin", exampleChinese: "你好，我已经用 Lin 的名字订好房间了。", tag: "入住" },
  { thai: "ซื้อตั๋วตรงไหน", id: "seu-dtuaa-dtrong-nai", roman: "seu dtuaa dtrong nai", chinese: "在哪里买票", partOfSpeech: "短语", theme: "买票", exampleThai: "ขอโทษครับ ซื้อตั๋วตรงไหน", exampleRoman: "khaaw-thoot khrap, seu dtuaa dtrong nai", exampleChinese: "不好意思，在哪里买票？", tag: "买票" },
  { thai: "ขอเมนูภาษาไทยหน่อย", id: "khaaw-mee-nuu-phaa-saa-thai-naawy", roman: "khaaw mee-nuu phaa-saa thai naawy", chinese: "请给我泰文菜单", partOfSpeech: "短语", theme: "点餐", exampleThai: "พนักงานครับ ขอเมนูภาษาไทยหน่อย", exampleRoman: "pha-nak-ngaan khrap, khaaw mee-nuu phaa-saa thai naawy", exampleChinese: "服务员，请给我泰文菜单。", tag: "点餐" },
  { thai: "ช่วยดูให้หน่อยได้ไหม", id: "chuai-duu-hai-naawy-dai-mai", roman: "chuai duu hai naawy dai mai", chinese: "可以帮我看一下吗", partOfSpeech: "短语", theme: "投诉小问题", exampleThai: "กุญแจห้องใช้ไม่ได้ ช่วยดูให้หน่อยได้ไหม", exampleRoman: "gun-jaae haawng chai mai dai, chuai duu hai naawy dai mai", exampleChinese: "房间钥匙不能用，可以帮我看一下吗？", tag: "小问题" },
  { thai: "มีที่ไหนน่าไปบ้าง", id: "mii-thii-nai-naa-bpai-baang", roman: "mii thii nai naa bpai baang", chinese: "有什么地方值得去吗", partOfSpeech: "短语", theme: "请求推荐", exampleThai: "แถวนี้มีที่ไหนน่าไปบ้าง", exampleRoman: "thaaeo nii mii thii nai naa bpai baang", exampleChinese: "这附近有什么地方值得去吗？", tag: "推荐" },
  { thai: "นัดเจอกันกี่โมง", id: "nat-jooe-gan-gii-moong", roman: "nat jooe gan gii moong", chinese: "约几点见面", partOfSpeech: "短语", theme: "确认时间地点", exampleThai: "พรุ่งนี้เรานัดเจอกันกี่โมง", exampleRoman: "phrung-nii rao nat jooe gan gii moong", exampleChinese: "明天我们约几点见面？", tag: "确认" },
  { thai: "เจอกันที่ล็อบบี้ได้ไหม", id: "jooe-gan-thii-lop-bii-dai-mai", roman: "jooe gan thii lop-bii dai mai", chinese: "可以在大堂见吗", partOfSpeech: "短语", theme: "确认时间地点", exampleThai: "ก่อนออกไปเที่ยว เจอกันที่ล็อบบี้ได้ไหม", exampleRoman: "gaawn aawk bpai thiaao, jooe gan thii lop-bii dai mai", exampleChinese: "出发去玩之前，可以在大堂见吗？", tag: "地点" },
];

const askWayRows = places.map((place): Definition => ({
  thai: `ขอถามทางไป${place.thai}`,
  id: `khaaw-thaam-thaang-bpai-${place.id}`,
  roman: `khaaw thaam thaang bpai ${place.roman}`,
  chinese: `请问去${place.chinese}的路`,
  partOfSpeech: "短语",
  theme: "问路",
  exampleThai: `ขอโทษค่ะ ขอถามทางไป${place.thai}หน่อย`,
  exampleRoman: `khaaw-thoot kha, khaaw thaam thaang bpai ${place.roman} naawy`,
  exampleChinese: `不好意思，请问去${place.chinese}怎么走？`,
  tag: "问路",
}));

const recommendRows = places.map((place): Definition => ({
  thai: `แนะนำ${place.thai}ได้ไหม`,
  id: `nae-nam-${place.id}-dai-mai`,
  roman: `nae-nam ${place.roman} dai mai`,
  chinese: `可以推荐${place.chinese}吗`,
  partOfSpeech: "短语",
  theme: "请求推荐",
  exampleThai: `ถ้ามีเวลาไม่มาก แนะนำ${place.thai}ได้ไหม`,
  exampleRoman: `thaa mii wee-laa mai maak, nae-nam ${place.roman} dai mai`,
  exampleChinese: `如果时间不多，可以推荐${place.chinese}吗？`,
  tag: "推荐",
}));

const confirmRows = places.map((place): Definition => ({
  thai: `ยืนยันเวลาไป${place.thai}`,
  id: `yeuun-yan-wee-laa-bpai-${place.id}`,
  roman: `yeuun-yan wee-laa bpai ${place.roman}`,
  chinese: `确认去${place.chinese}的时间`,
  partOfSpeech: "短语",
  theme: "确认时间地点",
  exampleThai: `ก่อนออกเดินทาง ขอช่วยยืนยันเวลาไป${place.thai}อีกครั้ง`,
  exampleRoman: `gaawn aawk dooen-thaang, khaaw chuai yeuun-yan wee-laa bpai ${place.roman} iik khrang`,
  exampleChinese: `出发前，请帮忙再确认一次去${place.chinese}的时间。`,
  tag: "确认",
}));

const hotelRows = hotelNeeds.map((need): Definition => ({
  thai: `ขอ${need.thai}ได้ไหม`,
  id: `khaaw-${need.id}-dai-mai`,
  roman: `khaaw ${need.roman} dai mai`,
  chinese: `可以要${need.chinese}吗`,
  partOfSpeech: "短语",
  theme: "入住",
  exampleThai: `สวัสดีค่ะ ขอ${need.thai}ได้ไหม`,
  exampleRoman: `sa-wat-dii kha, khaaw ${need.roman} dai mai`,
  exampleChinese: `你好，可以要${need.chinese}吗？`,
  tag: "入住",
}));

const ticketRows = tickets.map((ticket): Definition => ({
  thai: `ขอซื้อ${ticket.thai}หนึ่งใบ`,
  id: `khaaw-seu-${ticket.id}-neung-bai`,
  roman: `khaaw seu ${ticket.roman} neung bai`,
  chinese: `想买一张${ticket.chinese}`,
  partOfSpeech: "短语",
  theme: "买票",
  exampleThai: `ขอซื้อ${ticket.thai}หนึ่งใบ จ่ายเงินสดได้ไหม`,
  exampleRoman: `khaaw seu ${ticket.roman} neung bai, jaai ngoen sot dai mai`,
  exampleChinese: `想买一张${ticket.chinese}，可以付现金吗？`,
  tag: "买票",
}));

const foodRows = foods.map((food): Definition => ({
  thai: `ขอสั่ง${food.thai}`,
  id: `khaaw-sang-${food.id}`,
  roman: `khaaw sang ${food.roman}`,
  chinese: `想点${food.chinese}`,
  partOfSpeech: "短语",
  theme: "点餐",
  exampleThai: `ขอสั่ง${food.thai} แล้วก็ขอน้ำเปล่าด้วย`,
  exampleRoman: `khaaw sang ${food.roman}, laaeo gaaw khaaw naam bplaao duai`,
  exampleChinese: `想点${food.chinese}，还要白水。`,
  tag: "点餐",
}));

const issueRows = issues.map((issue): Definition => ({
  thai: `มีปัญหาเรื่อง${issue.thai}`,
  id: `mii-bpan-haa-reuuang-${issue.id}`,
  roman: `mii bpan-haa reuuang ${issue.roman}`,
  chinese: `有${issue.chinese}的问题`,
  partOfSpeech: "短语",
  theme: "投诉小问题",
  exampleThai: `ขอโทษนะครับ มีปัญหาเรื่อง${issue.thai} ช่วยดูให้หน่อยได้ไหม`,
  exampleRoman: `khaaw-thoot na khrap, mii bpan-haa reuuang ${issue.roman}, chuai duu hai naawy dai mai`,
  exampleChinese: `不好意思，有${issue.chinese}的问题，可以帮忙看一下吗？`,
  tag: "小投诉",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...askWayRows,
  ...recommendRows,
  ...confirmRows,
  ...hotelRows,
  ...ticketRows,
  ...foodRows,
  ...issueRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "旅行口语对话", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 旅行对话常用“ขอถามทาง、ขอซื้อ、ขอสั่ง、ช่วยดูให้หน่อย、แนะนำ...ได้ไหม、ยืนยันเวลา”等句框。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于问路、入住、买票、点餐、投诉小问题、请求推荐和确认时间地点。"],
    tags,
    sourceRefs: SIMPLE_TRAVEL_CONVERSATIONS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_TRAVEL_CONVERSATIONS_01 = rows.map(toCandidate);
