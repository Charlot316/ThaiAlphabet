export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "酒店入住退房" | "订房" | "旅游景点" | "门票" | "行李" | "问服务" | "投诉小问题" | "旅行计划";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionExample[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
};
export type VocabularyExpansionCandidate = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  level: "a2";
  priority: number;
  senses: VocabularyExpansionSense[];
  synonyms: VocabularyExpansionRelatedWord[];
  antonyms: VocabularyExpansionRelatedWord[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

type Definition = {
  thai: string;
  id: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  exampleThai: string;
  exampleRoman: string;
  exampleChinese: string;
  tag: string;
};

type Topic = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const TRAVEL_HOTEL_TOURISM_REFS = ["thai-frequency", "thai-a2-travel-hotel-tourism-candidate"];

const hotelTopics: readonly Topic[] = [
  { thai: "ห้องพักสองคน", roman: "haawng-phak saawng khon", chinese: "双人房", id: "haawng-phak-saawng-khon", theme: "订房" },
  { thai: "ห้องพักชั้นล่าง", roman: "haawng-phak chan laang", chinese: "低楼层房间", id: "haawng-phak-chan-laang", theme: "订房" },
  { thai: "ห้องไม่สูบบุหรี่", roman: "haawng mai suup bu-rii", chinese: "无烟房", id: "haawng-mai-suup-bu-rii", theme: "订房" },
  { thai: "ห้องวิวทะเล", roman: "haawng wiu tha-lee", chinese: "海景房", id: "haawng-wiu-tha-lee", theme: "订房" },
  { thai: "ห้องสำหรับครอบครัว", roman: "haawng sam-rap khraawp-khrua", chinese: "家庭房", id: "haawng-sam-rap-khraawp-khrua", theme: "订房" },
  { thai: "เตียงเสริม", roman: "dtiiang soem", chinese: "加床", id: "dtiiang-soem", theme: "问服务" },
  { thai: "อาหารเช้าในโรงแรม", roman: "aa-haan chaao nai roong-raaem", chinese: "酒店早餐", id: "aa-haan-chaao-nai-roong-raaem", theme: "问服务" },
  { thai: "กุญแจห้องสำรอง", roman: "gun-jaae haawng sam-raawng", chinese: "备用房间钥匙", id: "gun-jaae-haawng-sam-raawng", theme: "酒店入住退房" },
  { thai: "บัตรห้องใหม่", roman: "bat haawng mai", chinese: "新的房卡", id: "bat-haawng-mai", theme: "酒店入住退房" },
  { thai: "ผ้าเช็ดตัวเพิ่ม", roman: "phaa chet dtua phoem", chinese: "额外毛巾", id: "phaa-chet-dtua-phoem", theme: "问服务" },
  { thai: "หมอนเพิ่ม", roman: "maawn phoem", chinese: "额外枕头", id: "maawn-phoem", theme: "问服务" },
  { thai: "น้ำดื่มในห้อง", roman: "naam deum nai haawng", chinese: "房间里的饮用水", id: "naam-deum-nai-haawng", theme: "问服务" },
  { thai: "ไวไฟโรงแรม", roman: "wai-fai roong-raaem", chinese: "酒店 Wi-Fi", id: "wai-fai-roong-raaem", theme: "问服务" },
  { thai: "ที่จอดรถโรงแรม", roman: "thii jaawt rot roong-raaem", chinese: "酒店停车位", id: "thii-jaawt-rot-roong-raaem", theme: "问服务" },
  { thai: "บริการซักผ้า", roman: "baw-ri-gaan sak phaa", chinese: "洗衣服务", id: "baw-ri-gaan-sak-phaa", theme: "问服务" },
  { thai: "รถรับส่งสนามบิน", roman: "rot rap-song sa-naam-bin", chinese: "机场接送车", id: "rot-rap-song-sa-naam-bin", theme: "问服务" },
  { thai: "เวลาเช็กอิน", roman: "wee-laa chek-in", chinese: "入住时间", id: "wee-laa-chek-in", theme: "酒店入住退房" },
  { thai: "เวลาเช็กเอาต์", roman: "wee-laa chek-ao", chinese: "退房时间", id: "wee-laa-chek-ao", theme: "酒店入住退房" },
  { thai: "กระเป๋าเดินทางใบใหญ่", roman: "gra-bpao doen-thaang bai yai", chinese: "大行李箱", id: "gra-bpao-doen-thaang-bai-yai", theme: "行李" },
  { thai: "แผนที่เมือง", roman: "phaaen-thii mueang", chinese: "城市地图", id: "phaaen-thii-mueang", theme: "旅行计划" },
  { thai: "ใบจองห้องพัก", roman: "bai jaawng haawng-phak", chinese: "订房单", id: "bai-jaawng-haawng-phak", theme: "订房" },
  { thai: "ใบเสร็จโรงแรม", roman: "bai-set roong-raaem", chinese: "酒店收据", id: "bai-set-roong-raaem", theme: "酒店入住退房" },
  { thai: "ห้องเงียบด้านหลัง", roman: "haawng ngiiap daan lang", chinese: "后侧安静房间", id: "haawng-ngiiap-daan-lang", theme: "订房" },
  { thai: "โต๊ะทัวร์ในล็อบบี้", roman: "dto thua nai lawp-bii", chinese: "大堂旅游咨询台", id: "dto-thua-nai-lawp-bii", theme: "问服务" },
];

const touristPlaces: readonly Topic[] = [
  { thai: "วัดเก่าในเมือง", roman: "wat gao nai mueang", chinese: "城里的古寺", id: "wat-gao-nai-mueang", theme: "旅游景点" },
  { thai: "ตลาดน้ำตอนเช้า", roman: "dta-laat naam dtaawn chaao", chinese: "早上的水上市场", id: "dta-laat-naam-dtaawn-chaao", theme: "旅游景点" },
  { thai: "พิพิธภัณฑ์ท้องถิ่น", roman: "phi-phit-tha-phan thaawng-thin", chinese: "本地博物馆", id: "phi-phit-tha-phan-thaawng-thin", theme: "旅游景点" },
  { thai: "สวนสาธารณะใหญ่", roman: "suan saa-thaa-ra-na yai", chinese: "大公园", id: "suan-saa-thaa-ra-na-yai", theme: "旅游景点" },
  { thai: "หาดทรายใกล้โรงแรม", roman: "haat saai glai roong-raaem", chinese: "酒店附近的沙滩", id: "haat-saai-glai-roong-raaem", theme: "旅游景点" },
  { thai: "จุดชมวิวบนเขา", roman: "jut chom wiu bon khao", chinese: "山上观景点", id: "jut-chom-wiu-bon-khao", theme: "旅游景点" },
  { thai: "ถนนคนเดินคืนวันเสาร์", roman: "tha-non khon doen kheun wan sao", chinese: "周六夜市步行街", id: "tha-non-khon-doen-kheun-wan-sao", theme: "旅游景点" },
  { thai: "หมู่บ้านชาวประมง", roman: "muu-baan chaao bpra-mong", chinese: "渔村", id: "muu-baan-chaao-bpra-mong", theme: "旅游景点" },
  { thai: "เกาะเล็กใกล้ฝั่ง", roman: "gaw lek glai fang", chinese: "近岸小岛", id: "gaw-lek-glai-fang", theme: "旅游景点" },
  { thai: "น้ำตกชั้นแรก", roman: "naam-dtok chan raaek", chinese: "第一层瀑布", id: "naam-dtok-chan-raaek", theme: "旅游景点" },
  { thai: "สวนดอกไม้บนดอย", roman: "suan daawk-maai bon daawy", chinese: "山上的花园", id: "suan-daawk-maai-bon-daawy", theme: "旅游景点" },
  { thai: "คาเฟ่ริมแม่น้ำ", roman: "khaa-fee rim maae-naam", chinese: "河边咖啡馆", id: "khaa-fee-rim-maae-naam", theme: "旅游景点" },
  { thai: "ศูนย์อาหารใกล้สถานี", roman: "suun aa-haan glai sa-thaa-nii", chinese: "车站附近的美食中心", id: "suun-aa-haan-glai-sa-thaa-nii", theme: "旅游景点" },
  { thai: "ย่านเมืองเก่า", roman: "yaan mueang gao", chinese: "老城区", id: "yaan-mueang-gao", theme: "旅游景点" },
  { thai: "ท่าเรือท่องเที่ยว", roman: "thaa-reuua thaawng-thiao", chinese: "旅游码头", id: "thaa-reuua-thaawng-thiao", theme: "旅游景点" },
  { thai: "ฟาร์มผลไม้", roman: "faam phon-la-maai", chinese: "水果农场", id: "faam-phon-la-maai", theme: "旅游景点" },
  { thai: "ไร่ชาเล็ก ๆ", roman: "rai chaa lek lek", chinese: "小茶园", id: "rai-chaa-lek-lek", theme: "旅游景点" },
  { thai: "สถานีรถไฟเก่า", roman: "sa-thaa-nii rot-fai gao", chinese: "老火车站", id: "sa-thaa-nii-rot-fai-gao", theme: "旅游景点" },
  { thai: "สะพานไม้ริมทะเล", roman: "sa-phaan maai rim tha-lee", chinese: "海边木桥", id: "sa-phaan-maai-rim-tha-lee", theme: "旅游景点" },
  { thai: "ชุมชนทำขนม", roman: "chum-chon tham kha-nom", chinese: "做点心的社区", id: "chum-chon-tham-kha-nom", theme: "旅游景点" },
  { thai: "ตลาดกลางคืนใกล้โรงแรม", roman: "dta-laat glaang-kheun glai roong-raaem", chinese: "酒店附近夜市", id: "dta-laat-glaang-kheun-glai-roong-raaem", theme: "旅游景点" },
  { thai: "สวนสัตว์เล็ก", roman: "suan sat lek", chinese: "小动物园", id: "suan-sat-lek", theme: "旅游景点" },
  { thai: "พิพิธภัณฑ์เด็ก", roman: "phi-phit-tha-phan dek", chinese: "儿童博物馆", id: "phi-phit-tha-phan-dek", theme: "旅游景点" },
  { thai: "วัดบนภูเขา", roman: "wat bon phuu-khao", chinese: "山上的寺庙", id: "wat-bon-phuu-khao", theme: "旅游景点" },
];

const hotelIssues: readonly Topic[] = [
  { thai: "แอร์ไม่เย็น", roman: "aae mai yen", chinese: "空调不凉", id: "aae-mai-yen", theme: "投诉小问题" },
  { thai: "ห้องมีกลิ่นอับ", roman: "haawng mii glin ap", chinese: "房间有闷味", id: "haawng-mii-glin-ap", theme: "投诉小问题" },
  { thai: "น้ำอุ่นไม่ทำงาน", roman: "naam un mai tham-ngaan", chinese: "热水不能用", id: "naam-un-mai-tham-ngaan", theme: "投诉小问题" },
  { thai: "ไวไฟช้ามาก", roman: "wai-fai chaa maak", chinese: "Wi-Fi 很慢", id: "wai-fai-chaa-maak", theme: "投诉小问题" },
  { thai: "ห้องเสียงดัง", roman: "haawng siiang dang", chinese: "房间吵", id: "haawng-siiang-dang", theme: "投诉小问题" },
  { thai: "ผ้าเช็ดตัวไม่พอ", roman: "phaa chet dtua mai phaaw", chinese: "毛巾不够", id: "phaa-chet-dtua-mai-phaaw", theme: "投诉小问题" },
  { thai: "ไฟห้องน้ำเสีย", roman: "fai haawng naam siia", chinese: "浴室灯坏了", id: "fai-haawng-naam-siia", theme: "投诉小问题" },
  { thai: "ประตูระเบียงเปิดยาก", roman: "bpra-dtuu ra-biiang bpoet yaak", chinese: "阳台门难开", id: "bpra-dtuu-ra-biiang-bpoet-yaak", theme: "投诉小问题" },
  { thai: "บัตรห้องใช้ไม่ได้", roman: "bat haawng chai mai dai", chinese: "房卡不能用", id: "bat-haawng-chai-mai-dai", theme: "投诉小问题" },
  { thai: "น้ำไหลเบา", roman: "naam lai bao", chinese: "水流小", id: "naam-lai-bao", theme: "投诉小问题" },
  { thai: "เตียงแข็งไป", roman: "dtiiang khaeng bpai", chinese: "床太硬", id: "dtiiang-khaeng-bpai", theme: "投诉小问题" },
  { thai: "ห้องยังไม่สะอาด", roman: "haawng yang mai sa-aat", chinese: "房间还不干净", id: "haawng-yang-mai-sa-aat", theme: "投诉小问题" },
  { thai: "ตู้เย็นมีเสียงดัง", roman: "dtuu-yen mii siiang dang", chinese: "冰箱声音大", id: "dtuu-yen-mii-siiang-dang", theme: "投诉小问题" },
  { thai: "หน้าต่างปิดไม่สนิท", roman: "naa-dtaang bpit mai sa-nit", chinese: "窗户关不严", id: "naa-dtaang-bpit-mai-sa-nit", theme: "投诉小问题" },
  { thai: "ลิฟต์รอนาน", roman: "lip raaw naan", chinese: "电梯等很久", id: "lip-raaw-naan", theme: "投诉小问题" },
  { thai: "อาหารเช้าหมดเร็ว", roman: "aa-haan chaao mot reo", chinese: "早餐很快没了", id: "aa-haan-chaao-mot-reo", theme: "投诉小问题" },
  { thai: "เสียงรถดังตอนกลางคืน", roman: "siiang rot dang dtaawn glaang-kheun", chinese: "夜里车声大", id: "siiang-rot-dang-dtaawn-glaang-kheun", theme: "投诉小问题" },
  { thai: "เครื่องเป่าผมใช้ไม่ได้", roman: "khreuuang bpao phom chai mai dai", chinese: "吹风机不能用", id: "khreuuang-bpao-phom-chai-mai-dai", theme: "投诉小问题" },
  { thai: "น้ำในห้องไม่พอ", roman: "naam nai haawng mai phaaw", chinese: "房间里的水不够", id: "naam-nai-haawng-mai-phaaw", theme: "投诉小问题" },
  { thai: "ปลั๊กไฟอยู่ไกลเตียง", roman: "bplak fai yuu glai dtiiang", chinese: "插座离床远", id: "bplak-fai-yuu-glai-dtiiang", theme: "投诉小问题" },
];

const directRows: readonly Definition[] = [
  { thai: "เช็กอินก่อนบ่ายสองได้ไหม", id: "chek-in-gaawn-baai-saawng-dai-mai", roman: "chek-in gaawn baai saawng dai mai", chinese: "可以下午两点前入住吗", partOfSpeech: "短语", theme: "酒店入住退房", exampleThai: "ถ้าห้องว่าง เช็กอินก่อนบ่ายสองได้ไหมคะ", exampleRoman: "thaa haawng waang, chek-in gaawn baai saawng dai mai kha", exampleChinese: "如果有空房，可以下午两点前入住吗？", tag: "入住" },
  { thai: "ขอเช็กเอาต์ช้าหน่อย", id: "khaaw-chek-ao-chaa-naawy", roman: "khaaw chek-ao chaa naawy", chinese: "请求晚一点退房", partOfSpeech: "短语", theme: "酒店入住退房", exampleThai: "เครื่องบินออกเย็น ขอเช็กเอาต์ช้าหน่อยได้ไหม", exampleRoman: "khreuuang-bin aawk yen, khaaw chek-ao chaa naawy dai mai", exampleChinese: "飞机傍晚起飞，可以请求晚一点退房吗？", tag: "退房" },
  { thai: "ฝากกระเป๋าไว้ที่ล็อบบี้", id: "faak-gra-bpao-wai-thii-lawp-bii", roman: "faak gra-bpao wai thii lawp-bii", chinese: "把行李寄存在大堂", partOfSpeech: "短语", theme: "行李", exampleThai: "หลังเช็กเอาต์ เราฝากกระเป๋าไว้ที่ล็อบบี้", exampleRoman: "lang chek-ao, rao faak gra-bpao wai thii lawp-bii", exampleChinese: "退房后，我们把行李寄存在大堂。", tag: "行李" },
  { thai: "ขอใบเสร็จตอนเช็กเอาต์", id: "khaaw-bai-set-dtaawn-chek-ao", roman: "khaaw bai-set dtaawn chek-ao", chinese: "退房时要收据", partOfSpeech: "短语", theme: "酒店入住退房", exampleThai: "ตอนเช็กเอาต์ ฉันขอใบเสร็จตอนเช็กเอาต์ด้วย", exampleRoman: "dtaawn chek-ao, chan khaaw bai-set dtaawn chek-ao duai", exampleChinese: "退房时，我也要了收据。", tag: "退房" },
  { thai: "แผนเที่ยวสามวัน", id: "phaaen-thiao-saam-wan", roman: "phaaen thiao saam wan", chinese: "三天旅行计划", partOfSpeech: "名词", theme: "旅行计划", exampleThai: "เราทำแผนเที่ยวสามวันก่อนเดินทาง", exampleRoman: "rao tham phaaen thiao saam wan gaawn doen-thaang", exampleChinese: "我们出发前做了三天旅行计划。", tag: "计划" },
  { thai: "จองห้องผ่านแอป", id: "jaawng-haawng-phaan-aaep", roman: "jaawng haawng phaan aaep", chinese: "通过应用订房", partOfSpeech: "短语", theme: "订房", exampleThai: "ฉันจองห้องผ่านแอปและได้รับใบจองแล้ว", exampleRoman: "chan jaawng haawng phaan aaep lae dai rap bai jaawng laaeo", exampleChinese: "我通过应用订房，并已经收到订房单。", tag: "订房" },
  { thai: "ยืนยันการจองอีกครั้ง", id: "yeun-yan-gaan-jaawng-iik-khrang", roman: "yeun-yan gaan jaawng iik khrang", chinese: "再次确认预订", partOfSpeech: "短语", theme: "订房", exampleThai: "ก่อนเดินทาง ฉันโทรไปยืนยันการจองอีกครั้ง", exampleRoman: "gaawn doen-thaang, chan thoo bpai yeun-yan gaan jaawng iik khrang", exampleChinese: "出发前，我打电话再次确认预订。", tag: "订房" },
  { thai: "ซื้อตั๋วออนไลน์ล่วงหน้า", id: "seu-dtua-awn-lai-luuang-naa", roman: "seu dtua awn-lai luuang-naa", chinese: "提前在线买票", partOfSpeech: "短语", theme: "门票", exampleThai: "ที่เที่ยวยอดนิยมควรซื้อตั๋วออนไลน์ล่วงหน้า", exampleRoman: "thii thiao yaawt-ni-yom khuuan seu dtua awn-lai luuang-naa", exampleChinese: "热门景点应该提前在线买票。", tag: "门票" },
  { thai: "ตั๋วเด็กถูกกว่า", id: "dtua-dek-thuuk-gwaa", roman: "dtua dek thuuk gwaa", chinese: "儿童票更便宜", partOfSpeech: "短语", theme: "门票", exampleThai: "พิพิธภัณฑ์นี้ตั๋วเด็กถูกกว่าตั๋วผู้ใหญ่", exampleRoman: "phi-phit-tha-phan nii dtua dek thuuk gwaa dtua phuu-yai", exampleChinese: "这个博物馆儿童票比成人票便宜。", tag: "门票" },
  { thai: "ถามทางกลับโรงแรม", id: "thaam-thaang-glap-roong-raaem", roman: "thaam thaang glap roong-raaem", chinese: "问回酒店的路", partOfSpeech: "短语", theme: "旅行计划", exampleThai: "ตอนเย็นเราถามทางกลับโรงแรมกับคนแถวนั้น", exampleRoman: "dtaawn yen rao thaam thaang glap roong-raaem gap khon thaeo nan", exampleChinese: "傍晚我们向附近的人问回酒店的路。", tag: "问路" },
];

const serviceRows = hotelTopics.map((topic): Definition => ({
  thai: `ถามพนักงานเรื่อง${topic.thai}`,
  id: `thaam-pha-nak-ngaan-rueang-${topic.id}`,
  roman: `thaam pha-nak-ngaan rueang ${topic.roman}`,
  chinese: `向员工询问${topic.chinese}`,
  partOfSpeech: "短语",
  theme: topic.theme,
  exampleThai: `ถ้าไม่แน่ใจ ฉันจะถามพนักงานเรื่อง${topic.thai}`,
  exampleRoman: `thaa mai naae-jai, chan ja thaam pha-nak-ngaan rueang ${topic.roman}`,
  exampleChinese: `如果不确定，我会向员工询问${topic.chinese}。`,
  tag: "问服务",
}));

const issueRows = hotelIssues.map((issue): Definition => ({
  thai: `แจ้งโรงแรมว่า${issue.thai}`,
  id: `jaaeng-roong-raaem-waa-${issue.id}`,
  roman: `jaaeng roong-raaem waa ${issue.roman}`,
  chinese: `告知酒店${issue.chinese}`,
  partOfSpeech: "短语",
  theme: "投诉小问题",
  exampleThai: `ฉันแจ้งโรงแรมว่า${issue.thai} ขอให้ช่วยดูหน่อย`,
  exampleRoman: `chan jaaeng roong-raaem waa ${issue.roman}, khaaw hai chuai duu naawy`,
  exampleChinese: `我告知酒店${issue.chinese}，请他们帮忙看一下。`,
  tag: "小投诉",
}));

const planRows = touristPlaces.map((place): Definition => ({
  thai: `วางแผนไปเที่ยว${place.thai}`,
  id: `waang-phaaen-bpai-thiao-${place.id}`,
  roman: `waang phaaen bpai thiao ${place.roman}`,
  chinese: `计划去${place.chinese}游玩`,
  partOfSpeech: "短语",
  theme: "旅行计划",
  exampleThai: `พรุ่งนี้เราวางแผนไปเที่ยว${place.thai}ตั้งแต่เช้า`,
  exampleRoman: `phrung-nii rao waang phaaen bpai thiao ${place.roman} dtang-dtaae chaao`,
  exampleChinese: `明天我们计划从早上开始去${place.chinese}游玩。`,
  tag: "计划",
}));

const ticketRows = touristPlaces.slice(0, 20).map((place): Definition => ({
  thai: `ซื้อตั๋วเข้า${place.thai}`,
  id: `seu-dtua-khao-${place.id}`,
  roman: `seu dtua khao ${place.roman}`,
  chinese: `买进入${place.chinese}的门票`,
  partOfSpeech: "短语",
  theme: "门票",
  exampleThai: `เราซื้อตั๋วเข้า${place.thai}ที่หน้าประตู`,
  exampleRoman: `rao seu dtua khao ${place.roman} thii naa bpra-dtuu`,
  exampleChinese: `我们在门口买进入${place.chinese}的门票。`,
  tag: "门票",
}));

const rows: readonly Definition[] = [
  ...serviceRows,
  ...issueRows,
  ...planRows,
  ...ticketRows,
  ...directRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "旅行酒店旅游", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段适合把酒店入住、询问服务、买门票和旅行计划整句记忆，实际旅行时替换地点或物品。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于酒店入住退房、订房、旅游景点、门票、行李、问服务、投诉小问题和旅行计划。"],
    tags,
    sourceRefs: TRAVEL_HOTEL_TOURISM_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_TRAVEL_HOTEL_TOURISM_01 = rows.map(toCandidate);
