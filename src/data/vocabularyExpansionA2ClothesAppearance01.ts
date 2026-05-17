export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "衣服" | "鞋帽" | "穿戴" | "颜色尺码" | "外貌" | "身高体型" | "打扮" | "洗衣" | "买衣服";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";

export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };

type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme, string, string, string];

const CLOTHES_REFS = ["worker-a-a2-clothes-appearance", "basic-thai-clothing"];

const rows: Row[] = [
  ["seua-yeut", "เสื้อยืด", "seua yeut", "T恤；短袖上衣", "名词", "衣服", "วันนี้ฉันใส่เสื้อยืดสีฟ้าไปเรียนภาษาไทย", "wan-nii chan sai seua-yeut sii faa bpai riian phaa-saa thai", "今天我穿蓝色T恤去上泰语课。"],
  ["seua-choet", "เสื้อเชิ้ต", "seua choet", "衬衫", "名词", "衣服", "พี่ใส่เสื้อเชิ้ตสีขาวไปทำงานทุกวันจันทร์", "phii sai seua-choet sii khaao bpai tham-ngaan thuk wan jan", "哥哥每周一穿白衬衫去上班。"],
  ["seua-khaen-yaao", "เสื้อแขนยาว", "seua khaaen yaao", "长袖上衣", "名词", "衣服", "ตอนเช้าอากาศเย็น ฉันจึงใส่เสื้อแขนยาว", "dtaawn chaao aa-gaat yen chan jeung sai seua khaaen yaao", "早上天气凉，所以我穿长袖上衣。"],
  ["seua-khaen-san", "เสื้อแขนสั้น", "seua khaaen san", "短袖上衣", "名词", "衣服", "เสื้อแขนสั้นตัวนี้เหมาะกับอากาศร้อน", "seua khaaen san dtua nii maw gap aa-gaat raawn", "这件短袖上衣适合热天。"],
  ["seua-gam", "เสื้อกล้าม", "seua glaam", "背心；无袖上衣", "名词", "衣服", "เขาใส่เสื้อกล้ามออกกำลังกายที่บ้าน", "khao sai seua-glaam aawk-gam-lang-gaai thii baan", "他在家穿背心锻炼。"],
  ["seua-kan-naao", "เสื้อกันหนาว", "seua gan naao", "保暖外套；冬衣", "名词", "衣服", "แม่เตรียมเสื้อกันหนาวให้ฉันก่อนไปเชียงใหม่", "maae dtriiam seua gan naao hai chan gaawn bpai chiiang-mai", "去清迈前妈妈给我准备了保暖外套。"],
  ["seua-khlum", "เสื้อคลุม", "seua khlum", "外套；罩衫", "名词", "衣服", "เธอใส่เสื้อคลุมบาง ๆ เพราะร้านเปิดแอร์เย็น", "thoe sai seua khlum baang baang phraw raan bpoet aae yen", "她穿了一件薄外套，因为店里空调很冷。"],
  ["seua-fon", "เสื้อกันฝน", "seua gan fon", "雨衣", "名词", "衣服", "ถ้าฝนตกหนัก ควรใส่เสื้อกันฝนก่อนออกไป", "thaa fon dtok nak khuan sai seua gan fon gaawn aawk bpai", "如果雨下得大，出门前应该穿雨衣。"],
  ["seua-phaa", "เสื้อผ้า", "seua phaa", "衣服；衣物总称", "名词", "衣服", "วันอาทิตย์ฉันจัดเสื้อผ้าในตู้ให้เรียบร้อย", "wan aa-thit chan jat seua-phaa nai dtuu hai riiap-raawy", "星期天我把衣柜里的衣服整理好。"],
  ["seua-nak-riian", "เสื้อนักเรียน", "seua nak-riian", "校服上衣", "名词", "衣服", "เสื้อนักเรียนตัวนี้เล็กเกินไปสำหรับน้อง", "seua nak-riian dtua nii lek goen bpai sam-rap naawng", "这件校服上衣对弟弟来说太小了。"],
  ["seua-phaa-mai", "เสื้อผ้าใหม่", "seua phaa mai", "新衣服", "短语", "衣服", "เด็ก ๆ ดีใจเมื่อได้เสื้อผ้าใหม่ในวันปีใหม่", "dek dek dii-jai muea dai seua-phaa mai nai wan bpii mai", "孩子们新年拿到新衣服时很高兴。"],
  ["seua-phaa-gao", "เสื้อผ้าเก่า", "seua phaa gao", "旧衣服", "短语", "衣服", "แม่แยกเสื้อผ้าเก่าไว้บริจาคให้คนอื่น", "maae yaaek seua-phaa gao wai baaw-ri-jaak hai khon euen", "妈妈把旧衣服分出来捐给别人。"],
  ["gaang-geeng", "กางเกง", "gaang-geeng", "裤子", "名词", "衣服", "กางเกงตัวนี้ใส่สบายและซักง่าย", "gaang-geeng dtua nii sai sa-baai lae sak ngaai", "这条裤子穿着舒服，也容易洗。"],
  ["gaang-geeng-khaai-yaao", "กางเกงขายาว", "gaang-geeng khaa yaao", "长裤", "名词", "衣服", "ไปวัดควรใส่กางเกงขายาวที่สุภาพ", "bpai wat khuan sai gaang-geeng khaa yaao thii su-phaap", "去寺庙应该穿得体的长裤。"],
  ["gaang-geeng-khaa-san", "กางเกงขาสั้น", "gaang-geeng khaa san", "短裤", "名词", "衣服", "วันหยุดเขาชอบใส่กางเกงขาสั้นอยู่บ้าน", "wan-yut khao chaawp sai gaang-geeng khaa san yuu baan", "假日他喜欢在家穿短裤。"],
  ["gaang-geeng-yiin", "กางเกงยีนส์", "gaang-geeng yiin", "牛仔裤", "名词", "衣服", "กางเกงยีนส์ตัวนี้พอดีกับฉันมาก", "gaang-geeng yiin dtua nii phaaw-dii gap chan maak", "这条牛仔裤很合我身。"],
  ["gra-bproong", "กระโปรง", "gra-bproong", "裙子", "名词", "衣服", "น้องใส่กระโปรงสีชมพูไปงานวันเกิด", "naawng sai gra-bproong sii chom-phuu bpai ngaan wan-goet", "妹妹穿粉色裙子去生日会。"],
  ["gra-bproong-yaao", "กระโปรงยาว", "gra-bproong yaao", "长裙", "名词", "衣服", "กระโปรงยาวตัวนี้ดูสุภาพสำหรับงานโรงเรียน", "gra-bproong yaao dtua nii duu su-phaap sam-rap ngaan roong-riian", "这条长裙看起来适合学校活动。"],
  ["chut", "ชุด", "chut", "套装；一套衣服", "名词", "衣服", "เธอเลือกชุดสีขาวสำหรับงานครอบครัว", "thoe leuak chut sii khaao sam-rap ngaan khraawp-khrua", "她为家庭活动选了一套白色衣服。"],
  ["chut-nak-riian", "ชุดนักเรียน", "chut nak-riian", "校服", "名词", "衣服", "ชุดนักเรียนต้องสะอาดก่อนใส่ไปโรงเรียน", "chut nak-riian dtawng sa-aat gaawn sai bpai roong-riian", "校服去学校前必须干净。"],
  ["chut-tham-ngaan", "ชุดทำงาน", "chut tham-ngaan", "工作服；上班穿的衣服", "名词", "衣服", "พ่อรีดชุดทำงานไว้ตั้งแต่เมื่อคืน", "phaaw riit chut tham-ngaan wai dtang-dtaae muea-khuen", "爸爸昨晚就把上班衣服熨好了。"],
  ["chut-non", "ชุดนอน", "chut naawn", "睡衣", "名词", "衣服", "ก่อนนอนเด็ก ๆ เปลี่ยนเป็นชุดนอน", "gaawn naawn dek dek bpliian bpen chut naawn", "睡觉前孩子们换上睡衣。"],
  ["chut-gii-laa", "ชุดกีฬา", "chut gii-laa", "运动服", "名词", "衣服", "เขาใส่ชุดกีฬาไปวิ่งที่สวนตอนเย็น", "khao sai chut gii-laa bpai wing thii suan dtaawn yen", "他傍晚穿运动服去公园跑步。"],
  ["chut-wai-naam", "ชุดว่ายน้ำ", "chut waai naam", "泳衣", "名词", "衣服", "อย่าลืมเอาชุดว่ายน้ำไปทะเลด้วย", "yaa leum ao chut waai naam bpai tha-lee duai", "别忘了带泳衣去海边。"],
  ["pha-khaao-maa", "ผ้าขาวม้า", "phaa khaao maa", "泰式格布；围布", "名词", "衣服", "คุณตาใช้ผ้าขาวม้าหลังอาบน้ำ", "khun-dtaa chai phaa khaao maa lang aap naam", "外公洗澡后用泰式格布。"],
  ["pha-phan-khaaw", "ผ้าพันคอ", "phaa phan khaaw", "围巾", "名词", "衣服", "อากาศเย็นมาก เธอจึงใส่ผ้าพันคอ", "aa-gaat yen maak thoe jeung sai phaa phan khaaw", "天气很冷，所以她戴围巾。"],
  ["pha-khlum-lai", "ผ้าคลุมไหล่", "phaa khlum lai", "披肩", "名词", "衣服", "แม่ใช้ผ้าคลุมไหล่ในห้องประชุมที่เย็น", "maae chai phaa khlum lai nai haawng bpra-chum thii yen", "妈妈在冷的会议室里用披肩。"],
  ["raawng-thaao", "รองเท้า", "raawng-thaao", "鞋", "名词", "鞋帽", "รองเท้าคู่นี้เดินสบายแต่สีสกปรกง่าย", "raawng-thaao khuu nii doen sa-baai dtaae sii sok-ga-bprok ngaai", "这双鞋走路舒服，但颜色容易脏。"],
  ["raawng-thaao-phaa-bai", "รองเท้าผ้าใบ", "raawng-thaao phaa bai", "帆布鞋；运动休闲鞋", "名词", "鞋帽", "ฉันใส่รองเท้าผ้าใบไปเดินเล่นที่สวน", "chan sai raawng-thaao phaa bai bpai doen len thii suan", "我穿帆布鞋去公园散步。"],
  ["raawng-thaao-dtaae", "รองเท้าแตะ", "raawng-thaao dtae", "拖鞋；凉拖", "名词", "鞋帽", "อย่าใส่รองเท้าแตะไปงานที่เป็นทางการ", "yaa sai raawng-thaao dtae bpai ngaan thii bpen thaang-gaan", "不要穿拖鞋去正式活动。"],
  ["raawng-thaao-nang", "รองเท้าหนัง", "raawng-thaao nang", "皮鞋", "名词", "鞋帽", "พี่ใส่รองเท้าหนังสีดำไปสัมภาษณ์งาน", "phii sai raawng-thaao nang sii dam bpai sam-phaat ngaan", "哥哥穿黑皮鞋去面试。"],
  ["raawng-thaao-san-suung", "รองเท้าส้นสูง", "raawng-thaao son suung", "高跟鞋", "名词", "鞋帽", "เธอไม่อยากใส่รองเท้าส้นสูงเพราะเดินนาน", "thoe mai yaak sai raawng-thaao son suung phraw doen naan", "她不想穿高跟鞋，因为要走很久。"],
  ["thung-thaao", "ถุงเท้า", "thung-thaao", "袜子", "名词", "鞋帽", "ถุงเท้าคู่นี้เปียกฝน ต้องซักคืนนี้", "thung-thaao khuu nii bpiiak fon dtawng sak kheun-nii", "这双袜子被雨淋湿了，今晚要洗。"],
  ["muak", "หมวก", "muak", "帽子", "名词", "鞋帽", "แดดแรงมาก ควรใส่หมวกก่อนออกไป", "daaet raaeng maak khuan sai muak gaawn aawk bpai", "太阳很晒，出门前应该戴帽子。"],
  ["muak-gaeep", "หมวกแก๊ป", "muak gaaep", "棒球帽；鸭舌帽", "名词", "鞋帽", "น้องใส่หมวกแก๊ปสีแดงไปเที่ยว", "naawng sai muak gaaep sii daaeng bpai thiao", "弟弟戴红色棒球帽去玩。"],
  ["waen-dtaa", "แว่นตา", "waaen dtaa", "眼镜", "名词", "鞋帽", "เขาใส่แว่นตาเวลาอ่านหนังสือ", "khao sai waaen dtaa wee-laa aan nang-sue", "他看书时戴眼镜。"],
  ["waen-gan-daaet", "แว่นกันแดด", "waaen gan daaet", "太阳镜", "名词", "鞋帽", "ไปทะเลควรเอาแว่นกันแดดไปด้วย", "bpai tha-lee khuan ao waaen gan daaet bpai duai", "去海边应该带太阳镜。"],
  ["gra-bpao", "กระเป๋า", "gra-bpao", "包；袋", "名词", "鞋帽", "กระเป๋าใบนี้ใส่หนังสือได้หลายเล่ม", "gra-bpao bai nii sai nang-sue dai laai lem", "这个包能装好几本书。"],
  ["gra-bpao-saphai", "กระเป๋าสะพาย", "gra-bpao sa-phaai", "挎包；背包", "名词", "鞋帽", "เธอใช้กระเป๋าสะพายไปเรียนทุกวัน", "thoe chai gra-bpao sa-phaai bpai riian thuk wan", "她每天用挎包去上课。"],
  ["gra-bpao-doen-thaang", "กระเป๋าเดินทาง", "gra-bpao doen thaang", "行李箱；旅行包", "名词", "鞋帽", "กระเป๋าเดินทางใบใหญ่หนักเกินไป", "gra-bpao doen-thaang bai yai nak goen bpai", "大行李箱太重了。"],
  ["khem-khat", "เข็มขัด", "khem khat", "皮带；腰带", "名词", "鞋帽", "กางเกงตัวนี้หลวม ต้องใส่เข็มขัด", "gaang-geeng dtua nii luam dtawng sai khem khat", "这条裤子松，要系腰带。"],
  ["naalikaa", "นาฬิกา", "naa-li-gaa", "手表；钟表", "名词", "鞋帽", "นาฬิกาเรือนนี้เป็นของขวัญจากแม่", "naa-li-gaa reuan nii bpen khaawng-khwan jaak maae", "这块手表是妈妈送的礼物。"],
  ["saai-khaaw", "สายคอ", "saai khaaw", "项链；挂在脖子上的链子", "名词", "打扮", "เธอใส่สายคอเล็ก ๆ กับชุดสีดำ", "thoe sai saai khaaw lek lek gap chut sii dam", "她配黑色衣服戴了一条小项链。"],
  ["gam-lai", "กำไล", "gam-lai", "手镯；手环", "名词", "打扮", "เด็กซื้อกำไลสีฟ้าให้เพื่อน", "dek sue gam-lai sii faa hai phuean", "孩子给朋友买了蓝色手环。"],
  ["dtum-huu", "ต่างหู", "dtaang huu", "耳环", "名词", "打扮", "ต่างหูคู่นี้เล็กและดูสุภาพ", "dtaang huu khuu nii lek lae duu su-phaap", "这对耳环小巧，看起来得体。"],
  ["sai", "ใส่", "sai", "穿；戴；放入", "动词", "穿戴", "ก่อนออกจากบ้าน ฉันใส่รองเท้าและหยิบกระเป๋า", "gaawn aawk jaak baan chan sai raawng-thaao lae yip gra-bpao", "出门前我穿鞋并拿包。"],
  ["sai-seua", "ใส่เสื้อ", "sai seua", "穿上衣", "短语", "穿戴", "วันนี้อากาศเย็น ควรใส่เสื้อแขนยาว", "wan-nii aa-gaat yen khuan sai seua khaaen yaao", "今天天气凉，应该穿长袖上衣。"],
  ["sai-raawng-thaao", "ใส่รองเท้า", "sai raawng-thaao", "穿鞋", "短语", "穿戴", "อย่าลืมใส่รองเท้าก่อนออกจากบ้าน", "yaa leum sai raawng-thaao gaawn aawk jaak baan", "出门前别忘了穿鞋。"],
  ["sai-muak", "ใส่หมวก", "sai muak", "戴帽子", "短语", "穿戴", "เด็ก ๆ ใส่หมวกเมื่อเดินกลางแดด", "dek dek sai muak muea doen glaang daaet", "孩子们在太阳下走路时戴帽子。"],
  ["sai-waen", "ใส่แว่น", "sai waaen", "戴眼镜", "短语", "穿戴", "คุณตาใส่แว่นก่อนอ่านหนังสือพิมพ์", "khun-dtaa sai waaen gaawn aan nang-sue-phim", "外公看报纸前戴眼镜。"],
  ["thaawt", "ถอด", "thaawt", "脱下；摘下", "动词", "穿戴", "เข้าบ้านแล้วควรถอดรองเท้าไว้หน้าประตู", "khao baan laaeo khuan thaawt raawng-thaao wai naa bpra-dtuu", "进家后应该把鞋脱在门口。"],
  ["bpliian-seua", "เปลี่ยนเสื้อ", "bpliian seua", "换衣服；换上衣", "短语", "穿戴", "เขาเปลี่ยนเสื้อหลังเล่นกีฬาเสร็จ", "khao bpliian seua lang len gii-laa set", "运动完后他换了衣服。"],
  ["laawng-sai", "ลองใส่", "laawng sai", "试穿；试戴", "动词", "买衣服", "ขอลองใส่เสื้อตัวนี้ได้ไหมคะ", "khaaw laawng sai seua dtua nii dai mai kha", "可以试穿这件上衣吗？"],
  ["kha-naat", "ขนาด", "kha-naat", "尺码；大小", "名词", "颜色尺码", "ร้านนี้มีรองเท้าหลายขนาดให้ลอง", "raan nii mii raawng-thaao laai kha-naat hai laawng", "这家店有很多尺码的鞋可以试。"],
  ["sai-es", "ไซซ์เอส", "sai es", "S码；小号", "名词", "颜色尺码", "เสื้อตัวนี้ไซซ์เอสเล็กไปสำหรับฉัน", "seua dtua nii sai es lek bpai sam-rap chan", "这件上衣S码对我来说小了。"],
  ["sai-em", "ไซซ์เอ็ม", "sai em", "M码；中号", "名词", "颜色尺码", "ปกติฉันใส่เสื้อไซซ์เอ็ม", "bpa-ga-dti chan sai seua sai em", "我平常穿M码上衣。"],
  ["sai-el", "ไซซ์แอล", "sai el", "L码；大号", "名词", "颜色尺码", "พี่ชายเลือกเสื้อไซซ์แอลเพราะไหล่กว้าง", "phii-chaai leuak seua sai el phraw lai gwaang", "哥哥选L码上衣，因为肩膀宽。"],
  ["lek-bpai", "เล็กไป", "lek bpai", "太小", "形容词", "颜色尺码", "รองเท้าคู่นี้เล็กไป ฉันเดินไม่สบาย", "raawng-thaao khuu nii lek bpai chan doen mai sa-baai", "这双鞋太小，我走路不舒服。"],
  ["yai-bpai", "ใหญ่ไป", "yai bpai", "太大", "形容词", "颜色尺码", "กางเกงตัวนี้ใหญ่ไป ต้องเปลี่ยนไซซ์", "gaang-geeng dtua nii yai bpai dtawng bpliian sai", "这条裤子太大，得换尺码。"],
  ["phaaw-dii", "พอดี", "phaaw-dii", "正合适；刚好", "形容词", "颜色尺码", "เสื้อตัวนี้พอดีกับฉันมาก", "seua dtua nii phaaw-dii gap chan maak", "这件上衣很合我。"],
  ["luam", "หลวม", "luam", "宽松；松", "形容词", "颜色尺码", "กระโปรงตัวนี้หลวม ต้องใส่เข็มขัด", "gra-bproong dtua nii luam dtawng sai khem-khat", "这条裙子松，要系腰带。"],
  ["khap", "คับ", "khap", "紧；小得勒", "形容词", "颜色尺码", "รองเท้าหนังคู่นี้คับนิดหน่อย", "raawng-thaao nang khuu nii khap nit naawy", "这双皮鞋有点紧。"],
  ["sii-khaao", "สีขาว", "sii khaao", "白色", "名词", "颜色尺码", "ชุดสีขาวดูสะอาดและสุภาพ", "chut sii khaao duu sa-aat lae su-phaap", "白色衣服看起来干净得体。"],
  ["sii-dam", "สีดำ", "sii dam", "黑色", "名词", "颜色尺码", "เขาใส่รองเท้าสีดำไปทำงาน", "khao sai raawng-thaao sii dam bpai tham-ngaan", "他穿黑色鞋子去上班。"],
  ["sii-daaeng", "สีแดง", "sii daaeng", "红色", "名词", "颜色尺码", "หมวกสีแดงของน้องหาง่ายมาก", "muak sii daaeng khaawng naawng haa ngaai maak", "弟弟的红帽子很容易找。"],
  ["sii-faa", "สีฟ้า", "sii faa", "浅蓝色；天蓝色", "名词", "颜色尺码", "ฉันชอบเสื้อสีฟ้าเพราะดูสบายตา", "chan chaawp seua sii faa phraw duu sa-baai dtaa", "我喜欢浅蓝色上衣，因为看着舒服。"],
  ["sii-nam-ngoen", "สีน้ำเงิน", "sii nam ngoen", "深蓝色；蓝色", "名词", "颜色尺码", "กางเกงยีนส์สีน้ำเงินใส่กับเสื้อขาวได้", "gaang-geeng yiin sii nam ngoen sai gap seua khaao dai", "蓝色牛仔裤可以配白上衣。"],
  ["sii-khiaao", "สีเขียว", "sii khiaao", "绿色", "名词", "颜色尺码", "กระเป๋าสีเขียวใบนี้เป็นของใคร", "gra-bpao sii khiaao bai nii bpen khaawng khrai", "这个绿色包是谁的？"],
  ["sii-lueang", "สีเหลือง", "sii lueang", "黄色", "名词", "颜色尺码", "เสื้อสีเหลืองทำให้หน้าดูสว่างขึ้น", "seua sii lueang tham hai naa duu sa-waang kheun", "黄色上衣让脸看起来更亮。"],
  ["sii-chom-phuu", "สีชมพู", "sii chom-phuu", "粉色", "名词", "颜色尺码", "เด็กหญิงเลือกกระโปรงสีชมพู", "dek-ying leuak gra-bproong sii chom-phuu", "小女孩选了粉色裙子。"],
  ["sii-thao", "สีเทา", "sii thao", "灰色", "名词", "颜色尺码", "เสื้อคลุมสีเทาเข้ากับกางเกงสีดำ", "seua khlum sii thao khao gap gaang-geeng sii dam", "灰色外套配黑裤子。"],
  ["sii-nam-dtaan", "สีน้ำตาล", "sii nam dtaan", "棕色", "名词", "颜色尺码", "รองเท้าหนังสีน้ำตาลคู่นี้ดูดี", "raawng-thaao nang sii nam-dtaan khuu nii duu dii", "这双棕色皮鞋看起来不错。"],
  ["sii-on", "สีอ่อน", "sii aawn", "浅色", "名词", "颜色尺码", "หน้าร้อนฉันชอบใส่เสื้อสีอ่อน", "naa raawn chan chaawp sai seua sii aawn", "热季我喜欢穿浅色衣服。"],
  ["sii-khem", "สีเข้ม", "sii khem", "深色", "名词", "颜色尺码", "สีเข้มทำให้เสื้อตัวนี้ดูสุภาพ", "sii khem tham hai seua dtua nii duu su-phaap", "深色让这件上衣看起来得体。"],
  ["laai", "ลาย", "laai", "花纹；图案", "名词", "颜色尺码", "ฉันชอบเสื้อลายเล็ก ๆ มากกว่าลายใหญ่", "chan chaawp seua laai lek lek maak gwaa laai yai", "比起大花纹，我更喜欢小花纹上衣。"],
  ["laai-dok", "ลายดอก", "laai daawk", "花朵图案", "名词", "颜色尺码", "ชุดลายดอกเหมาะกับวันหยุดที่ทะเล", "chut laai daawk maw gap wan-yut thii tha-lee", "花朵图案的衣服适合海边假日。"],
  ["laai-thaap", "ลายทาง", "laai thaang", "条纹", "名词", "颜色尺码", "เสื้อลายทางตัวนี้ดูเรียบง่าย", "seua laai thaang dtua nii duu riiap ngaai", "这件条纹上衣看起来简洁。"],
  ["naa", "หน้า", "naa", "脸；面部", "名词", "外貌", "วันนี้หน้าเขาดูเหนื่อยเพราะนอนน้อย", "wan-nii naa khao duu neuuai phraw naawn naawy", "今天他的脸看起来累，因为睡得少。"],
  ["phom", "ผม", "phom", "头发", "名词", "外貌", "ผมของเธอยาวและสีดำมาก", "phom khaawng thoe yaao lae sii dam maak", "她的头发很长，也很黑。"],
  ["phom-san", "ผมสั้น", "phom san", "短发", "短语", "外貌", "หลังตัดผม เขาดูเด็กลงเพราะผมสั้น", "lang dtat phom khao duu dek long phraw phom san", "剪头发后，他因为短发看起来更年轻。"],
  ["phom-yaao", "ผมยาว", "phom yaao", "长发", "短语", "外貌", "เธอมีผมยาวและชอบมัดผมเวลาเรียน", "thoe mii phom yaao lae chaawp mat phom wee-laa riian", "她有长发，上课时喜欢扎头发。"],
  ["dtat-phom", "ตัดผม", "dtat phom", "剪头发；理发", "动词", "打扮", "พรุ่งนี้ฉันจะไปตัดผมที่ร้านใกล้บ้าน", "phrung-nii chan ja bpai dtat phom thii raan glai baan", "明天我要去家附近的店理发。"],
  ["mat-phom", "มัดผม", "mat phom", "扎头发", "动词", "打扮", "เวลาอากาศร้อน เธอชอบมัดผม", "wee-laa aa-gaat raawn thoe chaawp mat phom", "天气热的时候，她喜欢扎头发。"],
  ["plao-phom", "ปล่อยผม", "bplaawy phom", "披着头发；不扎头发", "动词", "打扮", "วันนี้เธอปล่อยผมและใส่ชุดสีฟ้า", "wan-nii thoe bplaawy phom lae sai chut sii faa", "今天她披着头发，穿蓝色衣服。"],
  ["suung", "สูง", "suung", "高；身高高", "形容词", "身高体型", "พี่ชายของฉันสูงกว่าพ่อเล็กน้อย", "phii-chaai khaawng chan suung gwaa phaaw lek naawy", "我哥哥比爸爸稍高一点。"],
  ["dtia", "เตี้ย", "dtia", "矮；身高低", "形容词", "身高体型", "ฉันเตี้ยกว่าเพื่อน แต่เดินเร็วกว่า", "chan dtia gwaa phuean dtaae doen reo gwaa", "我比朋友矮，但走得更快。"],
  ["phawm", "ผอม", "phaawm", "瘦", "形容词", "身高体型", "เขาผอมลงเพราะออกกำลังกายทุกวัน", "khao phaawm long phraw aawk-gam-lang-gaai thuk wan", "他因为每天运动变瘦了。"],
  ["uan", "อ้วน", "uan", "胖", "形容词", "身高体型", "แมวตัวนี้อ้วนขึ้นเพราะกินเก่ง", "maaeo dtua nii uan kheun phraw gin geng", "这只猫因为很会吃变胖了。"],
  ["ruup-raang", "รูปร่าง", "ruup raang", "体型；身材", "名词", "身高体型", "เสื้อแบบนี้เหมาะกับรูปร่างของเธอ", "seua baaep nii maw gap ruup-raang khaawng thoe", "这种上衣适合她的体型。"],
  ["huun", "หุ่น", "hun", "身材；体态", "名词", "身高体型", "เขามีหุ่นแข็งแรงเพราะเล่นกีฬา", "khao mii hun khaeng-raaeng phraw len gii-laa", "他因为运动身材强健。"],
  ["naarak", "น่ารัก", "naa-rak", "可爱", "形容词", "外貌", "เด็กคนนั้นใส่หมวกแล้วดูน่ารักมาก", "dek khon nan sai muak laaeo duu naa-rak maak", "那个孩子戴上帽子后看起来很可爱。"],
  ["suai", "สวย", "suai", "漂亮；美", "形容词", "外貌", "ชุดนี้สวยและเหมาะกับงานวันเกิด", "chut nii suai lae maw gap ngaan wan-goet", "这套衣服漂亮，也适合生日会。"],
  ["laaw", "หล่อ", "laaw", "帅；英俊", "形容词", "外貌", "พี่ชายใส่เสื้อเชิ้ตแล้วดูหล่อขึ้น", "phii-chaai sai seua-choet laaeo duu laaw kheun", "哥哥穿衬衫后看起来更帅。"],
  ["duu-dii", "ดูดี", "duu dii", "好看；看起来不错", "形容词", "外貌", "รองเท้าคู่นี้ดูดีกับกางเกงยีนส์", "raawng-thaao khuu nii duu dii gap gaang-geeng yiin", "这双鞋配牛仔裤很好看。"],
  ["riiap-raawy", "เรียบร้อย", "riiap-raawy", "整齐；得体", "形容词", "打扮", "ก่อนไปโรงเรียน เด็ก ๆ แต่งตัวให้เรียบร้อย", "gaawn bpai roong-riian dek dek dtaeng-dtua hai riiap-raawy", "去学校前，孩子们把自己穿戴整齐。"],
  ["su-phaap", "สุภาพ", "su-phaap", "得体；礼貌正式", "形容词", "打扮", "ไปงานผู้ใหญ่ควรใส่เสื้อผ้าที่สุภาพ", "bpai ngaan phuu-yai khuan sai seua-phaa thii su-phaap", "去长辈的活动应该穿得体的衣服。"],
  ["dtaeng-dtua", "แต่งตัว", "dtaeng dtua", "打扮；穿衣整理", "动词", "打扮", "เธอแต่งตัวเร็วเพราะกลัวไปสาย", "thoe dtaeng-dtua reo phraw glua bpai saai", "她打扮得很快，因为怕迟到。"],
  ["dtaeng-naa", "แต่งหน้า", "dtaeng naa", "化妆", "动词", "打扮", "แม่แต่งหน้าเล็กน้อยก่อนไปงานเลี้ยง", "maae dtaeng naa lek naawy gaawn bpai ngaan-liiang", "妈妈去聚会前稍微化了妆。"],
  ["mai-dtaeng-naa", "ไม่แต่งหน้า", "mai dtaeng naa", "不化妆；素颜", "短语", "打扮", "วันหยุดเธอมักไม่แต่งหน้าและใส่เสื้อสบาย ๆ", "wan-yut thoe mak mai dtaeng naa lae sai seua sa-baai sa-baai", "假日她常不化妆，穿舒服的衣服。"],
  ["khrueang-sam-aang", "เครื่องสำอาง", "khreuuang sam-aang", "化妆品", "名词", "打扮", "เธอเก็บเครื่องสำอางไว้ในกระเป๋าเล็ก", "thoe gep khreuuang sam-aang wai nai gra-bpao lek", "她把化妆品放在小包里。"],
  ["nam-haawm", "น้ำหอม", "naam haawm", "香水", "名词", "打扮", "อย่าใส่น้ำหอมมากเกินไปในห้องเรียน", "yaa sai naam haawm maak goen bpai nai haawng-riian", "在教室里不要喷太多香水。"],
  ["sak-phaa", "ซักผ้า", "sak phaa", "洗衣服", "动词", "洗衣", "วันเสาร์ฉันซักผ้าและตากผ้าหลังบ้าน", "wan sao chan sak phaa lae dtaak phaa lang baan", "星期六我洗衣服并在屋后晾衣服。"],
  ["dtaak-phaa", "ตากผ้า", "dtaak phaa", "晾衣服", "动词", "洗衣", "ฝนหยุดแล้ว แม่จึงตากผ้าที่ระเบียง", "fon yut laaeo maae jeung dtaak phaa thii ra-biiang", "雨停了，妈妈就在阳台晾衣服。"],
  ["gep-phaa", "เก็บผ้า", "gep phaa", "收衣服", "动词", "洗衣", "เมฆดำมาแล้ว รีบเก็บผ้าก่อนฝนตก", "meek dam maa laaeo riip gep phaa gaawn fon dtok", "乌云来了，快在下雨前收衣服。"],
  ["riit-phaa", "รีดผ้า", "riit phaa", "熨衣服", "动词", "洗衣", "พ่อรีดผ้าก่อนใส่เสื้อเชิ้ตไปทำงาน", "phaaw riit phaa gaawn sai seua-choet bpai tham-ngaan", "爸爸穿衬衫去上班前熨衣服。"],
  ["phap-phaa", "พับผ้า", "phap phaa", "叠衣服", "动词", "洗衣", "เด็ก ๆ ช่วยแม่พับผ้าหลังตากแห้ง", "dek dek chuai maae phap phaa lang dtaak haaeng", "衣服晾干后，孩子们帮妈妈叠衣服。"],
  ["pha-sok-ga-bprok", "ผ้าสกปรก", "phaa sok-ga-bprok", "脏衣服", "名词", "洗衣", "อย่าเอาผ้าสกปรกวางบนเตียง", "yaa ao phaa sok-ga-bprok waang bon dtiiang", "不要把脏衣服放在床上。"],
  ["phaa-saat", "ผ้าสะอาด", "phaa sa-aat", "干净衣服", "名词", "洗衣", "ผ้าสะอาดอยู่ในตู้ด้านซ้าย", "phaa sa-aat yuu nai dtuu daan saai", "干净衣服在左边的柜子里。"],
  ["khrueang-sak-phaa", "เครื่องซักผ้า", "khreuuang sak phaa", "洗衣机", "名词", "洗衣", "เครื่องซักผ้าเสีย เราจึงต้องซักมือ", "khreuuang sak phaa siia rao jeung dtawng sak mue", "洗衣机坏了，所以我们得手洗。"],
  ["nam-yaa-sak-phaa", "น้ำยาซักผ้า", "naam-yaa sak phaa", "洗衣液", "名词", "洗衣", "น้ำยาซักผ้าขวดนี้กลิ่นหอมอ่อน ๆ", "naam-yaa sak phaa khuat nii glin haawm aawn aawn", "这瓶洗衣液有淡淡的香味。"],
  ["raan-khaai-seua-phaa", "ร้านขายเสื้อผ้า", "raan khaai seua phaa", "服装店", "名词", "买衣服", "ร้านขายเสื้อผ้านี้มีไซซ์ให้เลือกเยอะ", "raan khaai seua-phaa nii mii sai hai leuak yuh", "这家服装店有很多尺码可选。"],
  ["haawng-laawng-seua", "ห้องลองเสื้อ", "haawng laawng seua", "试衣间", "名词", "买衣服", "ห้องลองเสื้ออยู่ด้านหลังร้าน", "haawng laawng seua yuu daan lang raan", "试衣间在店后面。"],
  ["bpaai-raa-khaa", "ป้ายราคา", "bpaai raa-khaa", "价格标签", "名词", "买衣服", "ดูป้ายราคาก่อนเอาเสื้อไปจ่ายเงิน", "duu bpaai raa-khaa gaawn ao seua bpai jaai ngoen", "拿衣服去付款前先看价格标签。"],
  ["lot-raa-khaa", "ลดราคา", "lot raa-khaa", "降价；打折", "动词", "买衣服", "รองเท้าคู่นี้ลดราคาเหลือห้าร้อยบาท", "raawng-thaao khuu nii lot raa-khaa leuua haa raawy baat", "这双鞋打折后剩五百泰铢。"],
  ["phaeng", "แพง", "phaaeng", "贵", "形容词", "买衣服", "เสื้อคลุมตัวนี้สวยแต่แพงเกินไป", "seua khlum dtua nii suai dtaae phaaeng goen bpai", "这件外套漂亮，但太贵了。"],
  ["thuuk", "ถูก", "thuuk", "便宜；正确", "形容词", "买衣服", "กระเป๋าใบนี้ถูกกว่าใบสีดำ", "gra-bpao bai nii thuuk gwaa bai sii dam", "这个包比黑色那个便宜。"],
  ["khaw-bpliian", "ขอเปลี่ยน", "khaaw bpliian", "请求更换；想换", "短语", "买衣服", "เสื้อตัวนี้เล็กไป ขอเปลี่ยนไซซ์ได้ไหม", "seua dtua nii lek bpai khaaw bpliian sai dai mai", "这件衣服太小，可以换尺码吗？"],
  ["khaw-khuen", "ขอคืน", "khaaw kheun", "请求退回；想退货", "短语", "买衣服", "ถ้าใส่ไม่ได้ ขอคืนสินค้าได้ไหมคะ", "thaa sai mai dai khaaw kheun sin-khaa dai mai kha", "如果穿不了，可以退货吗？"],
];

const relatedByTheme: Record<VocabularyExpansionTheme, VocabularyExpansionRelated> = {
  衣服: { thai: "เสื้อผ้า", roman: "seua phaa", chinese: "衣物总称" },
  鞋帽: { thai: "เครื่องแต่งกาย", roman: "khreuuang dtaeng gaai", chinese: "穿戴用品" },
  穿戴: { thai: "ถอด", roman: "thaawt", chinese: "脱下；摘下" },
  颜色尺码: { thai: "พอดี", roman: "phaaw-dii", chinese: "正合适" },
  外貌: { thai: "ดูดี", roman: "duu dii", chinese: "好看" },
  身高体型: { thai: "รูปร่าง", roman: "ruup raang", chinese: "体型" },
  打扮: { thai: "เรียบร้อย", roman: "riiap-raawy", chinese: "整齐得体" },
  洗衣: { thai: "ผ้าสะอาด", roman: "phaa sa-aat", chinese: "干净衣服" },
  买衣服: { thai: "ขนาด", roman: "kha-naat", chinese: "尺码" },
};

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];
  const comparison: VocabularyExpansionComparison = {
    kind: row[1] === related.thai ? "usage" : "confusable",
    target: related,
    distinctionZh: `${row[1]} 用在“${row[5]}”场景；学习时要和 ${related.thai} 的搭配分开记，注意是衣物、动作、颜色尺码还是外貌描述。`,
  };
  const example = { thai: row[6], roman: row[7], chinese: row[8] };
  const collocations = [
    { thai: row[1], roman: row[2], chinese: row[3] },
    { thai: related.thai, roman: related.roman, chinese: related.chinese },
  ];

  return {
    id: row[0],
    thai: row[1],
    roman: row[2],
    chinese: row[3],
    partOfSpeech: row[4],
    theme: row[5],
    level: "a2",
    priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [example], synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5]] }],
    synonyms: [],
    antonyms: [],
    comparisons: [comparison],
    collocations,
    tags: [row[5], "A2基础"],
    sourceRefs: CLOTHES_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_CLOTHES_APPEARANCE_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
