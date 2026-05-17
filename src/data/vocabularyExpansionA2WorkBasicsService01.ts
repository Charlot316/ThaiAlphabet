export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "基础工作" | "排班" | "请假" | "同事主管" | "服务表达" | "简单汇报" | "工作问题";
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

type WorkPlace = { thai: string; roman: string; chinese: string; id: string };
type Topic = { thai: string; roman: string; chinese: string; id: string };

const WORK_BASICS_SERVICE_REFS = ["thai-frequency", "thai-a2-work-basics-service-candidate"];

const shiftPlaces: readonly WorkPlace[] = [
  { thai: "ร้านกาแฟ", roman: "raan gaa-faae", chinese: "咖啡店", id: "raan-gaa-faae" },
  { thai: "ร้านอาหารเล็ก", roman: "raan aa-haan lek", chinese: "小餐馆", id: "raan-aa-haan-lek" },
  { thai: "ร้านสะดวกซื้อ", roman: "raan sa-duuak seu", chinese: "便利店", id: "raan-sa-duuak-seu" },
  { thai: "เคาน์เตอร์โรงแรม", roman: "khao-dtooe roong-raaem", chinese: "酒店前台", id: "khao-dtooe-roong-raaem" },
  { thai: "จุดรับของ", roman: "jut rap khaawng", chinese: "取货点", id: "jut-rap-khaawng" },
  { thai: "ครัวหลังร้าน", roman: "khrua lang raan", chinese: "后厨", id: "khrua-lang-raan" },
  { thai: "แคชเชียร์", roman: "khaaet-chiia", chinese: "收银台", id: "khaaet-chiia" },
  { thai: "ชั้นวางสินค้า", roman: "chan waang sin-khaa", chinese: "货架区", id: "chan-waang-sin-khaa" },
  { thai: "ประตูทางเข้า", roman: "bpra-dtuu thaang khao", chinese: "入口处", id: "bpra-dtuu-thaang-khao" },
  { thai: "โต๊ะบริการลูกค้า", roman: "dto baw-ri-gaan luuk-khaa", chinese: "客户服务桌", id: "dto-baw-ri-gaan-luuk-khaa" },
  { thai: "ร้านขายเสื้อ", roman: "raan khaai seua", chinese: "服装店", id: "raan-khaai-seua" },
  { thai: "ร้านขายยา", roman: "raan khaai yaa", chinese: "药店", id: "raan-khaai-yaa" },
  { thai: "ร้านหนังสือ", roman: "raan nang-sue", chinese: "书店", id: "raan-nang-sue" },
  { thai: "ร้านเบเกอรี", roman: "raan bee-goo-rii", chinese: "面包店", id: "raan-bee-goo-rii" },
  { thai: "ศูนย์อาหาร", roman: "suun aa-haan", chinese: "美食中心", id: "suun-aa-haan" },
  { thai: "ลานจอดรถ", roman: "laan jaawt rot", chinese: "停车场", id: "laan-jaawt-rot" },
  { thai: "ห้องเก็บของ", roman: "haawng gep khaawng", chinese: "储物间", id: "haawng-gep-khaawng" },
  { thai: "โต๊ะรับออเดอร์", roman: "dto rap aw-dooe", chinese: "点单台", id: "dto-rap-aw-dooe" },
  { thai: "จุดส่งอาหาร", roman: "jut song aa-haan", chinese: "出餐点", id: "jut-song-aa-haan" },
  { thai: "หน้าร้าน", roman: "naa raan", chinese: "店门口", id: "naa-raan" },
  { thai: "หลังร้าน", roman: "lang raan", chinese: "店后方", id: "lang-raan" },
  { thai: "ห้องประชุมเล็ก", roman: "haawng bpra-chum lek", chinese: "小会议室", id: "haawng-bpra-chum-lek" },
  { thai: "โต๊ะทำงานรวม", roman: "dto tham-ngaan ruam", chinese: "共用办公桌", id: "dto-tham-ngaan-ruam" },
  { thai: "จุดตรวจตั๋ว", roman: "jut dtruat dtua", chinese: "检票点", id: "jut-dtruat-dtua" },
];

const leaveRows: readonly Definition[] = [
  { thai: "ขอลาหยุดพรุ่งนี้", id: "khaaw-laa-yut-phrung-nii", roman: "khaaw laa yut phrung-nii", chinese: "请明天休假", partOfSpeech: "短语", theme: "请假", exampleThai: "ฉันไม่สบาย จึงขอลาหยุดพรุ่งนี้หนึ่งวัน", exampleRoman: "chan mai sa-baai, jeung khaaw laa yut phrung-nii neung wan", exampleChinese: "我不舒服，所以请明天休假一天。", tag: "请假" },
  { thai: "ขอลาครึ่งวัน", id: "khaaw-laa-khreung-wan", roman: "khaaw laa khreung wan", chinese: "请半天假", partOfSpeech: "短语", theme: "请假", exampleThai: "บ่ายนี้ฉันต้องไปหาหมอ ขอ ลาครึ่งวันได้ไหม", exampleRoman: "baai nii chan dtawng bpai haa maaw, khaaw laa khreung wan dai mai", exampleChinese: "今天下午我要去看医生，可以请半天假吗？", tag: "请假" },
  { thai: "ลาป่วยหนึ่งวัน", id: "laa-bpuai-neung-wan", roman: "laa bpuai neung wan", chinese: "请一天病假", partOfSpeech: "短语", theme: "请假", exampleThai: "เขาเป็นไข้และลาป่วยหนึ่งวัน", exampleRoman: "khao bpen khai lae laa bpuai neung wan", exampleChinese: "他发烧了，请了一天病假。", tag: "请假" },
  { thai: "ลากิจตอนบ่าย", id: "laa-git-dtaawn-baai", roman: "laa git dtaawn baai", chinese: "下午请事假", partOfSpeech: "短语", theme: "请假", exampleThai: "วันนี้พี่ลากิจตอนบ่ายเพื่อไปธนาคาร", exampleRoman: "wan-nii phii laa git dtaawn baai phuea bpai tha-naa-khaan", exampleChinese: "今天哥哥/姐姐下午请事假去银行。", tag: "请假" },
  { thai: "มาทำงานสาย", id: "maa-tham-ngaan-saai", roman: "maa tham-ngaan saai", chinese: "上班迟到", partOfSpeech: "短语", theme: "工作问题", exampleThai: "รถติดมาก ฉันเลยมาทำงานสายสิบห้านาที", exampleRoman: "rot dtit maak, chan loei maa tham-ngaan saai sip-haa naa-thii", exampleChinese: "堵车很厉害，所以我上班迟到了十五分钟。", tag: "迟到" },
  { thai: "ขอโทษที่มาสาย", id: "khaaw-thoot-thii-maa-saai", roman: "khaaw-thoot thii maa saai", chinese: "抱歉迟到了", partOfSpeech: "短语", theme: "工作问题", exampleThai: "ขอโทษที่มาสาย วันนี้รถเมล์มาช้า", exampleRoman: "khaaw-thoot thii maa saai, wan-nii rot-mee maa chaa", exampleChinese: "抱歉迟到了，今天公交车来得晚。", tag: "迟到" },
  { thai: "แจ้งหัวหน้าก่อนลา", id: "jaaeng-hua-naa-gaawn-laa", roman: "jaaeng hua-naa gaawn laa", chinese: "请假前先通知主管", partOfSpeech: "短语", theme: "请假", exampleThai: "ถ้าจะลาหยุด ต้องแจ้งหัวหน้าก่อนลา", exampleRoman: "thaa ja laa yut, dtawng jaaeng hua-naa gaawn laa", exampleChinese: "如果要休假，必须请假前先通知主管。", tag: "请假" },
  { thai: "ส่งข้อความบอกกะ", id: "song-khaaw-khwaam-baawk-ga", roman: "song khaaw-khwaam baawk ga", chinese: "发消息说明班次", partOfSpeech: "短语", theme: "排班", exampleThai: "หัวหน้าส่งข้อความบอกกะของสัปดาห์นี้", exampleRoman: "hua-naa song khaaw-khwaam baawk ga khaawng sap-daa nii", exampleChinese: "主管发消息说明这周的班次。", tag: "排班" },
  { thai: "เปลี่ยนกะกับเพื่อน", id: "bplian-ga-gap-phuean", roman: "bplian ga gap phuean", chinese: "和同事换班", partOfSpeech: "短语", theme: "排班", exampleThai: "ฉันมีธุระ จึงขอเปลี่ยนกะกับเพื่อน", exampleRoman: "chan mii thu-ra, jeung khaaw bplian ga gap phuean", exampleChinese: "我有事，所以请求和同事换班。", tag: "排班" },
  { thai: "ทำกะแทน", id: "tham-ga-thaaen", roman: "tham ga thaaen", chinese: "代班", partOfSpeech: "短语", theme: "排班", exampleThai: "เพื่อนป่วย ฉันจึงทำกะแทนหนึ่งวัน", exampleRoman: "phuean bpuai, chan jeung tham ga thaaen neung wan", exampleChinese: "同事病了，所以我代班一天。", tag: "排班" },
  { thai: "เลิกงานเร็วขึ้น", id: "loek-ngaan-reo-kheun", roman: "loek ngaan reo kheun", chinese: "提前下班", partOfSpeech: "短语", theme: "排班", exampleThai: "วันนี้ลูกค้าน้อย เราเลิกงานเร็วขึ้นได้", exampleRoman: "wan-nii luuk-khaa naawy, rao loek ngaan reo kheun dai", exampleChinese: "今天客人少，我们可以提前下班。", tag: "排班" },
  { thai: "อยู่ต่ออีกชั่วโมง", id: "yuu-dtaaw-iik-chua-moong", roman: "yuu dtaaw iik chua-moong", chinese: "再多留一小时", partOfSpeech: "短语", theme: "排班", exampleThai: "คืนนี้ลูกค้าเยอะ ขอให้อยู่ต่ออีกชั่วโมง", exampleRoman: "khuen-nii luuk-khaa yoe, khaaw hai yuu dtaaw iik chua-moong", exampleChinese: "今晚客人多，请再多留一小时。", tag: "排班" },
  { thai: "ลงเวลาทำงาน", id: "long-wee-laa-tham-ngaan", roman: "long wee-laa tham-ngaan", chinese: "登记上班时间", partOfSpeech: "短语", theme: "基础工作", exampleThai: "ก่อนเริ่มงาน ทุกคนต้องลงเวลาทำงาน", exampleRoman: "gaawn roem ngaan, thuk khon dtawng long wee-laa tham-ngaan", exampleChinese: "开始工作前，每个人都要登记上班时间。", tag: "基础工作" },
  { thai: "ลืมลงเวลา", id: "leum-long-wee-laa", roman: "leum long wee-laa", chinese: "忘记打卡/登记时间", partOfSpeech: "短语", theme: "工作问题", exampleThai: "เมื่อเช้าฉันลืมลงเวลา ต้องแจ้งหัวหน้า", exampleRoman: "muea-chaao chan leum long wee-laa, dtawng jaaeng hua-naa", exampleChinese: "今天早上我忘记打卡/登记时间，必须通知主管。", tag: "基础工作" },
  { thai: "พักกลางวันครึ่งชั่วโมง", id: "phak-glaang-wan-khreung-chua-moong", roman: "phak glaang-wan khreung chua-moong", chinese: "午休半小时", partOfSpeech: "短语", theme: "排班", exampleThai: "วันนี้เราพักกลางวันครึ่งชั่วโมงเท่านั้น", exampleRoman: "wan-nii rao phak glaang-wan khreung chua-moong thao-nan", exampleChinese: "今天我们午休只有半小时。", tag: "排班" },
  { thai: "พักสิบห้านาที", id: "phak-sip-haa-naa-thii", roman: "phak sip-haa naa-thii", chinese: "休息十五分钟", partOfSpeech: "短语", theme: "排班", exampleThai: "หลังทำงานสองชั่วโมง พนักงานพักสิบห้านาที", exampleRoman: "lang tham-ngaan saawng chua-moong, pha-nak-ngaan phak sip-haa naa-thii", exampleChinese: "工作两小时后，员工休息十五分钟。", tag: "排班" },
  { thai: "เข้าประชุมสั้น ๆ", id: "khao-bpra-chum-san-san", roman: "khao bpra-chum san san", chinese: "参加简短会议", partOfSpeech: "短语", theme: "基础工作", exampleThai: "ก่อนเปิดร้าน เราเข้าประชุมสั้น ๆ ทุกเช้า", exampleRoman: "gaawn bpoet raan, rao khao bpra-chum san san thuk chaao", exampleChinese: "开店前，我们每天早上参加简短会议。", tag: "基础工作" },
  { thai: "รับงานจากหัวหน้า", id: "rap-ngaan-jaak-hua-naa", roman: "rap ngaan jaak hua-naa", chinese: "从主管那里接任务", partOfSpeech: "短语", theme: "同事主管", exampleThai: "เช้านี้ฉันรับงานจากหัวหน้าแล้ว", exampleRoman: "chaao nii chan rap ngaan jaak hua-naa laaeo", exampleChinese: "今天早上我已经从主管那里接任务了。", tag: "同事主管" },
  { thai: "ส่งงานก่อนกลับ", id: "song-ngaan-gaawn-glap", roman: "song ngaan gaawn glap", chinese: "回去前交工作", partOfSpeech: "短语", theme: "简单汇报", exampleThai: "หัวหน้าบอกให้ส่งงานก่อนกลับบ้าน", exampleRoman: "hua-naa baawk hai song ngaan gaawn glap baan", exampleChinese: "主管让我回家前交工作。", tag: "汇报" },
  { thai: "งานวันนี้ยังไม่เสร็จ", id: "ngaan-wan-nii-yang-mai-set", roman: "ngaan wan-nii yang mai set", chinese: "今天的工作还没完成", partOfSpeech: "短语", theme: "工作问题", exampleThai: "งานวันนี้ยังไม่เสร็จ ฉันขอเวลาอีกนิด", exampleRoman: "ngaan wan-nii yang mai set, chan khaaw wee-laa iik nit", exampleChinese: "今天的工作还没完成，我想再要一点时间。", tag: "问题" },
];

const coworkerTopics: readonly Topic[] = [
  { thai: "ตารางงานวันนี้", roman: "dtaa-raang ngaan wan-nii", chinese: "今天的工作表", id: "dtaa-raang-ngaan-wan-nii" },
  { thai: "งานช่วงเช้า", roman: "ngaan chuuang chaao", chinese: "早上的工作", id: "ngaan-chuuang-chaao" },
  { thai: "งานช่วงเย็น", roman: "ngaan chuuang yen", chinese: "傍晚的工作", id: "ngaan-chuuang-yen" },
  { thai: "ของที่ต้องเติม", roman: "khaawng thii dtawng dteem", chinese: "需要补的货", id: "khaawng-thii-dtawng-dteem" },
  { thai: "โต๊ะที่ต้องเช็ด", roman: "dto thii dtawng chet", chinese: "需要擦的桌子", id: "dto-thii-dtawng-chet" },
  { thai: "ลูกค้าที่รออยู่", roman: "luuk-khaa thii raaw yuu", chinese: "正在等的客人", id: "luuk-khaa-thii-raaw-yuu" },
  { thai: "ออเดอร์ที่ผิด", roman: "aw-dooe thii phit", chinese: "出错的订单", id: "aw-dooe-thii-phit" },
  { thai: "ใบเสร็จที่หาย", roman: "bai-set thii haai", chinese: "丢失的收据", id: "bai-set-thii-haai" },
  { thai: "เครื่องคิดเงิน", roman: "khreuuang khit ngoen", chinese: "收银机", id: "khreuuang-khit-ngoen" },
  { thai: "กล่องสินค้าใหม่", roman: "glaawng sin-khaa mai", chinese: "新商品箱", id: "glaawng-sin-khaa-mai" },
  { thai: "ห้องเก็บของ", roman: "haawng gep khaawng", chinese: "储物间", id: "haawng-gep-khaawng" },
  { thai: "ป้ายราคา", roman: "bpaai raa-khaa", chinese: "价签", id: "bpaai-raa-khaa" },
  { thai: "เวลาปิดร้าน", roman: "wee-laa bpit raan", chinese: "关店时间", id: "wee-laa-bpit-raan" },
  { thai: "งานที่เหลือ", roman: "ngaan thii leuua", chinese: "剩下的工作", id: "ngaan-thii-leuua" },
  { thai: "ลูกค้าประจำ", roman: "luuk-khaa bpra-jam", chinese: "常客", id: "luuk-khaa-bpra-jam" },
  { thai: "จุดรับสินค้า", roman: "jut rap sin-khaa", chinese: "取货处", id: "jut-rap-sin-khaa" },
  { thai: "โทรศัพท์ร้าน", roman: "thoo-ra-sap raan", chinese: "店里电话", id: "thoo-ra-sap-raan" },
  { thai: "เอกสารส่งของ", roman: "eek-ga-saan song khaawng", chinese: "送货文件", id: "eek-ga-saan-song-khaawng" },
  { thai: "รายชื่อพนักงาน", roman: "raai-cheu pha-nak-ngaan", chinese: "员工名单", id: "raai-cheu-pha-nak-ngaan" },
  { thai: "กุญแจร้าน", roman: "gun-jaae raan", chinese: "店钥匙", id: "gun-jaae-raan" },
];

const serviceTopics: readonly Topic[] = [
  { thai: "ลูกค้าที่เข้าร้าน", roman: "luuk-khaa thii khao raan", chinese: "进店的客人", id: "luuk-khaa-thii-khao-raan" },
  { thai: "ลูกค้าที่โทรมา", roman: "luuk-khaa thii thoo maa", chinese: "打电话来的客人", id: "luuk-khaa-thii-thoo-maa" },
  { thai: "แขกที่โรงแรม", roman: "khaaek thii roong-raaem", chinese: "酒店客人", id: "khaaek-thii-roong-raaem" },
  { thai: "คนที่มารับของ", roman: "khon thii maa rap khaawng", chinese: "来取货的人", id: "khon-thii-maa-rap-khaawng" },
  { thai: "คนที่ถามทาง", roman: "khon thii thaam thaang", chinese: "问路的人", id: "khon-thii-thaam-thaang" },
  { thai: "ลูกค้าที่รอคิว", roman: "luuk-khaa thii raaw khiu", chinese: "排队等候的客人", id: "luuk-khaa-thii-raaw-khiu" },
  { thai: "ลูกค้าที่ต้องการใบเสร็จ", roman: "luuk-khaa thii dtawng-gaan bai-set", chinese: "需要收据的客人", id: "luuk-khaa-thii-dtawng-gaan-bai-set" },
  { thai: "ลูกค้าที่ขอเปลี่ยนของ", roman: "luuk-khaa thii khaaw bplian khaawng", chinese: "要求换货的客人", id: "luuk-khaa-thii-khaaw-bplian-khaawng" },
  { thai: "เด็กที่หลงทาง", roman: "dek thii long thaang", chinese: "迷路的孩子", id: "dek-thii-long-thaang" },
  { thai: "ผู้สูงอายุ", roman: "phuu-suung-aa-yu", chinese: "老人", id: "phuu-suung-aa-yu" },
  { thai: "คนถือของหนัก", roman: "khon theu khaawng nak", chinese: "拿重物的人", id: "khon-theu-khaawng-nak" },
  { thai: "ลูกค้าที่พูดเร็ว", roman: "luuk-khaa thii phuut reo", chinese: "说话快的客人", id: "luuk-khaa-thii-phuut-reo" },
  { thai: "ลูกค้าต่างชาติ", roman: "luuk-khaa dtaang-chaat", chinese: "外国客人", id: "luuk-khaa-dtaang-chaat" },
  { thai: "คนส่งของ", roman: "khon song khaawng", chinese: "送货员", id: "khon-song-khaawng" },
  { thai: "ลูกค้าที่โกรธ", roman: "luuk-khaa thii groot", chinese: "生气的客人", id: "luuk-khaa-thii-groot" },
  { thai: "ลูกค้าที่ลืมของ", roman: "luuk-khaa thii leum khaawng", chinese: "忘东西的客人", id: "luuk-khaa-thii-leum-khaawng" },
  { thai: "ลูกค้าที่จ่ายเงินแล้ว", roman: "luuk-khaa thii jaai ngoen laaeo", chinese: "已经付款的客人", id: "luuk-khaa-thii-jaai-ngoen-laaeo" },
  { thai: "ลูกค้าที่หาไซซ์", roman: "luuk-khaa thii haa sai", chinese: "找尺码的客人", id: "luuk-khaa-thii-haa-sai" },
  { thai: "ลูกค้าที่ถามราคา", roman: "luuk-khaa thii thaam raa-khaa", chinese: "问价格的客人", id: "luuk-khaa-thii-thaam-raa-khaa" },
  { thai: "ลูกค้าที่รออาหาร", roman: "luuk-khaa thii raaw aa-haan", chinese: "等餐的客人", id: "luuk-khaa-thii-raaw-aa-haan" },
  { thai: "ลูกค้าที่สั่งกลับบ้าน", roman: "luuk-khaa thii sang glap baan", chinese: "点外带的客人", id: "luuk-khaa-thii-sang-glap-baan" },
  { thai: "ลูกค้าที่ขอถุง", roman: "luuk-khaa thii khaaw thung", chinese: "要袋子的客人", id: "luuk-khaa-thii-khaaw-thung" },
  { thai: "ลูกค้าที่จองโต๊ะ", roman: "luuk-khaa thii jaawng dto", chinese: "订桌的客人", id: "luuk-khaa-thii-jaawng-dto" },
  { thai: "ลูกค้าที่มาครั้งแรก", roman: "luuk-khaa thii maa khrang raaek", chinese: "第一次来的客人", id: "luuk-khaa-thii-maa-khrang-raaek" },
];

const problemTopics: readonly Topic[] = [
  { thai: "เครื่องคิดเงินไม่ทำงาน", roman: "khreuuang khit ngoen mai tham-ngaan", chinese: "收银机不工作", id: "khreuuang-khit-ngoen-mai-tham-ngaan" },
  { thai: "ออเดอร์หายไป", roman: "aw-dooe haai bpai", chinese: "订单不见了", id: "aw-dooe-haai-bpai" },
  { thai: "ของในสต็อกไม่พอ", roman: "khaawng nai sa-dtok mai phaaw", chinese: "库存不够", id: "khaawng-nai-sa-dtok-mai-phaaw" },
  { thai: "ลูกค้ารอนาน", roman: "luuk-khaa raaw naan", chinese: "客人等太久", id: "luuk-khaa-raaw-naan" },
  { thai: "ราคาในระบบผิด", roman: "raa-khaa nai ra-bop phit", chinese: "系统里的价格错了", id: "raa-khaa-nai-ra-bop-phit" },
  { thai: "ใบเสร็จพิมพ์ไม่ออก", roman: "bai-set phim mai aawk", chinese: "收据打印不出来", id: "bai-set-phim-mai-aawk" },
  { thai: "โต๊ะยังไม่ว่าง", roman: "dto yang mai waang", chinese: "桌子还没空", id: "dto-yang-mai-waang" },
  { thai: "อาหารออกช้า", roman: "aa-haan aawk chaa", chinese: "出餐慢", id: "aa-haan-aawk-chaa" },
  { thai: "สินค้าแตกในกล่อง", roman: "sin-khaa dtaaek nai glaawng", chinese: "商品在盒子里碎了", id: "sin-khaa-dtaaek-nai-glaawng" },
  { thai: "ป้ายราคาหล่น", roman: "bpaai raa-khaa lon", chinese: "价签掉了", id: "bpaai-raa-khaa-lon" },
  { thai: "คนไม่พอช่วงเย็น", roman: "khon mai phaaw chuuang yen", chinese: "傍晚人手不够", id: "khon-mai-phaaw-chuuang-yen" },
  { thai: "งานค้างจากเมื่อวาน", roman: "ngaan khaang jaak muea-waan", chinese: "昨天留下的工作", id: "ngaan-khaang-jaak-muea-waan" },
];

const shiftRows = shiftPlaces.map((place): Definition => ({
  thai: `เข้ากะเช้าที่${place.thai}`,
  id: `khao-ga-chaao-thii-${place.id}`,
  roman: `khao ga chaao thii ${place.roman}`,
  chinese: `在${place.chinese}上早班`,
  partOfSpeech: "短语",
  theme: "排班",
  exampleThai: `พรุ่งนี้ฉันเข้ากะเช้าที่${place.thai}ตั้งแต่เจ็ดโมง`,
  exampleRoman: `phrung-nii chan khao ga chaao thii ${place.roman} dtang-dtaae jet moong`,
  exampleChinese: `明天我从七点开始在${place.chinese}上早班。`,
  tag: "排班",
}));

const coworkerRows = coworkerTopics.map((topic): Definition => ({
  thai: `ถามหัวหน้าเรื่อง${topic.thai}`,
  id: `thaam-hua-naa-rueang-${topic.id}`,
  roman: `thaam hua-naa rueang ${topic.roman}`,
  chinese: `向主管询问${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "同事主管",
  exampleThai: `ถ้าไม่แน่ใจ ฉันจะถามหัวหน้าเรื่อง${topic.thai}ก่อน`,
  exampleRoman: `thaa mai naae-jai, chan ja thaam hua-naa rueang ${topic.roman} gaawn`,
  exampleChinese: `如果不确定，我会先向主管询问${topic.chinese}。`,
  tag: "同事主管",
}));

const serviceRows = serviceTopics.map((topic): Definition => ({
  thai: `ช่วยดูแล${topic.thai}`,
  id: `chuai-duu-laae-${topic.id}`,
  roman: `chuai duu-laae ${topic.roman}`,
  chinese: `帮忙照看/接待${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "服务表达",
  exampleThai: `พนักงานใหม่ช่วยดูแล${topic.thai}อย่างสุภาพ`,
  exampleRoman: `pha-nak-ngaan mai chuai duu-laae ${topic.roman} yaang su-phaap`,
  exampleChinese: `新员工礼貌地帮忙照看/接待${topic.chinese}。`,
  tag: "服务",
}));

const problemRows = problemTopics.map((topic): Definition => ({
  thai: `รายงานว่า${topic.thai}`,
  id: `raai-ngaan-waa-${topic.id}`,
  roman: `raai-ngaan waa ${topic.roman}`,
  chinese: `汇报说${topic.chinese}`,
  partOfSpeech: "短语",
  theme: "简单汇报",
  exampleThai: `ฉันรายงานว่า${topic.thai}ให้หัวหน้าทราบแล้ว`,
  exampleRoman: `chan raai-ngaan waa ${topic.roman} hai hua-naa saap laaeo`,
  exampleChinese: `我已经向主管汇报说${topic.chinese}。`,
  tag: "汇报",
}));

const rows: readonly Definition[] = [
  ...shiftRows,
  ...leaveRows,
  ...coworkerRows,
  ...serviceRows,
  ...problemRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "基础工作服务", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段可先掌握排班、请假、询问主管、照看客人和简单汇报这几类常用工作句块。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于基础工作、排班请假、同事主管沟通、服务业接待和简单问题汇报。"],
    tags,
    sourceRefs: WORK_BASICS_SERVICE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_WORK_BASICS_SERVICE_01 = rows.map(toCandidate);
