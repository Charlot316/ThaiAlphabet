export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语" | "数词" | "量词";
export type VocabularyExpansionLevel = "a1" | "a2";
export type VocabularyExpansionTheme = "数字" | "序数" | "时间" | "日期" | "星期" | "月份" | "年龄" | "次数" | "频率" | "数量";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";

export type VocabularyExpansionRelated = {
  thai: string;
  roman: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionExample = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionComparison = {
  kind: VocabularyExpansionComparisonKind;
  target: VocabularyExpansionRelated;
  distinctionZh: string;
};

export type VocabularyExpansionCollocation = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionSense = {
  id: string;
  chinese: string;
  examples: VocabularyExpansionExample[];
  synonyms: VocabularyExpansionRelated[];
  antonyms: VocabularyExpansionRelated[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  tags: string[];
};

export type VocabularyExpansionCandidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  theme: VocabularyExpansionTheme;
  level: VocabularyExpansionLevel;
  priority: number;
  senses: VocabularyExpansionSense[];
  synonyms: VocabularyExpansionRelated[];
  antonyms: VocabularyExpansionRelated[];
  comparisons: VocabularyExpansionComparison[];
  collocations: VocabularyExpansionCollocation[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: VocabularyExpansionReviewStatus;
};

type Row = readonly [
  id: string,
  thai: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionPartOfSpeech,
  theme: VocabularyExpansionTheme,
  priority: number,
  exampleThai: string,
  exampleRoman: string,
  exampleChinese: string,
  relatedThai: string,
  relatedRoman: string,
  relatedChinese: string,
  comparisonKind: VocabularyExpansionComparisonKind,
  noteZh: string,
  tag: string,
];

const TIME_NUMBER_REFS = ["worker-a-a1-time-numbers", "basic-thai-time-counting"];

const rows: Row[] = [
  ["nueng", "หนึ่ง", "neung", "一；一个", "数词", "数字", 1, "ฉันมีสมุดหนึ่งเล่มอยู่ในกระเป๋า", "chan mii sa-mut neung lem yuu nai gra-bpao", "我包里有一本本子。", "แรก", "raaek", "第一个；最先", "confusable", "หนึ่ง 表示数量一；แรก 表示顺序最先。", "一"],
  ["song", "สอง", "saawng", "二；两个", "数词", "数字", 2, "พี่ซื้อขนมสองถุงให้เด็ก ๆ หลังเลิกเรียน", "phii sue kha-nom saawng thung hai dek dek lang loek riian", "姐姐放学后给孩子们买了两袋点心。", "คู่", "khuu", "一对；成双", "usage", "สอง 是数字二；คู่ 常表示成对的东西。", "二"],
  ["saam", "สาม", "saam", "三；三个", "数词", "数字", 3, "เรานัดเจอกันตอนสามโมงเย็นที่หน้าร้านกาแฟ", "rao nat joe gan dtaawn saam moong yen thii naa raan gaa-faae", "我们约好下午三点在咖啡店前见。", "หลาย", "laai", "好几个；多个", "confusable", "สาม 是明确数量三；หลาย 只表示不止一个。", "三"],
  ["sii", "สี่", "sii", "四；四个", "数词", "数字", 4, "โต๊ะนี้นั่งได้สี่คน แต่ตอนนี้มีเก้าอี้แค่สามตัว", "dto nii nang dai sii khon dtaae dtaawn-nii mii gao-ii khaae saam dtua", "这张桌子能坐四个人，但现在只有三把椅子。", "สี่ทุ่ม", "sii thum", "晚上十点", "confusable", "สี่ 本身是四；สี่ทุ่ม 是泰语计时说法，表示晚上十点。", "四"],
  ["haa", "ห้า", "haa", "五；五个", "数词", "数字", 5, "วันนี้ครูให้การบ้านห้าข้อและบอกให้ส่งพรุ่งนี้", "wan-nii khruu hai gaan-baan haa khaaw lae baawk hai song phrung-nii", "今天老师布置了五道作业，并说要明天交。", "ครึ่ง", "khreung", "一半", "confusable", "ห้า 是五；ครึ่ง 是二分之一。", "五"],
  ["hok", "หก", "hok", "六；六个", "数词", "数字", 6, "รถเมล์สายหกผ่านหน้าโรงเรียนทุกเช้า", "rot-mee saai hok phaan naa roong-riian thuk chaao", "六路公交每天早上经过学校门口。", "หกโมง", "hok moong", "六点", "usage", "数字 หก 可直接进入时间表达 หกโมง。", "六"],
  ["jet", "เจ็ด", "jet", "七；七个", "数词", "数字", 7, "น้องอายุเจ็ดขวบและเริ่มอ่านภาษาไทยได้แล้ว", "naawng aa-yu jet khuap lae roem aan phaa-saa thai dai laaeo", "弟弟七岁了，已经开始会读泰语了。", "เจ็ดโมง", "jet moong", "七点", "usage", "เจ็ด 可表示数量，也常用于เวลาเจ็ดโมง。", "七"],
  ["bpaaet", "แปด", "bpaaet", "八；八个", "数词", "数字", 8, "ร้านเปิดแปดโมงเช้า คนจึงเริ่มมาต่อแถวตั้งแต่เจ็ดโมงครึ่ง", "raan bpoet bpaaet moong chaao khon jeung roem maa dtaaw thaaeo dtang-dtaae jet moong khreung", "店八点开门，所以人们从七点半就开始排队。", "แปดสิบ", "bpaaet-sip", "八十", "usage", "แปด 是个位八；แปดสิบ 是八十。", "八"],
  ["gao", "เก้า", "gao", "九；九个", "数词", "数字", 9, "เขาอ่านบทที่เก้าเมื่อคืนก่อนนอน", "khao aan bot thii gao muea-khuen gaawn naawn", "他昨晚睡前读了第九课。", "เก้าอี้", "gao-ii", "椅子", "confusable", "เก้า 是数字九；เก้าอี้ 是椅子，发音相近但不是数字。", "九"],
  ["sip", "สิบ", "sip", "十；十个", "数词", "数字", 10, "เด็กสิบคนยืนรอครูอยู่หน้าห้องเรียน", "dek sip khon yuen raaw khruu yuu naa haawng-riian", "十个孩子站在教室前等老师。", "สิบโมง", "sip moong", "十点", "usage", "สิบ 可表示数量十，也可进入เวลา十点的表达。", "十"],
  ["sip-et", "สิบเอ็ด", "sip-et", "十一", "数词", "数字", 11, "ห้องนี้มีนักเรียนสิบเอ็ดคนในวันจันทร์", "haawng nii mii nak-riian sip-et khon nai wan jan", "这个班星期一有十一名学生。", "หนึ่ง", "neung", "一", "confusable", "สิบเอ็ด 中末尾用 เอ็ด，不说สิบหนึ่ง。", "十一"],
  ["sip-saawng", "สิบสอง", "sip-saawng", "十二", "数词", "数字", 12, "หนึ่งปีมีสิบสองเดือน และเดือนนี้เป็นเดือนสุดท้าย", "neung bpii mii sip-saawng duean lae duean nii bpen duean sut-thaai", "一年有十二个月，而这个月是最后一个月。", "เที่ยง", "thiiang", "中午十二点", "usage", "สิบสอง 是数字十二；เที่ยง 常指中午十二点。", "十二"],
  ["sip-ha", "สิบห้า", "sip-haa", "十五", "数词", "数字", 13, "เขารอรถประมาณสิบห้านาทีแล้วจึงโทรหาเพื่อน", "khao raaw rot bpra-maan sip-haa naa-thii laaeo jeung thoo haa phuean", "他等车大约十五分钟后才给朋友打电话。", "ครึ่งชั่วโมง", "khreung chua-moong", "半小时", "confusable", "สิบห้านาที 是十五分钟；ครึ่งชั่วโมง 是三十分钟。", "十五"],
  ["yii-sip", "ยี่สิบ", "yii-sip", "二十", "数词", "数字", 14, "ตั๋วเด็กคนละยี่สิบบาท ส่วนผู้ใหญ่คนละสามสิบบาท", "dtua dek khon la yii-sip baat suan phuu-yai khon la saam-sip baat", "儿童票每人二十泰铢，成人每人三十泰铢。", "สองสิบ", "saawng-sip", "非标准二十说法", "confusable", "二十要说 ยี่สิบ，不说สองสิบ。", "二十"],
  ["saam-sip", "สามสิบ", "saam-sip", "三十", "数词", "数字", 15, "แม่ใช้เวลาสามสิบนาทีทำอาหารเย็น", "maae chai wee-laa saam-sip naa-thii tham aa-haan yen", "妈妈花三十分钟做晚饭。", "ครึ่งชั่วโมง", "khreung chua-moong", "半小时", "near-synonym", "三十分钟和半小时意思接近，但一个是数字表达，一个是时间长度表达。", "三十"],
  ["sii-sip", "สี่สิบ", "sii-sip", "四十", "数词", "数字", 16, "พ่อเดินออกกำลังกายสี่สิบนาทีทุกเย็น", "phaaw doen aawk-gam-lang-gaai sii-sip naa-thii thuk yen", "爸爸每天傍晚散步锻炼四十分钟。", "สี่", "sii", "四", "usage", "สิบ 放在数字后面形成整十数。", "四十"],
  ["haa-sip", "ห้าสิบ", "haa-sip", "五十", "数词", "数字", 17, "เสื้อตัวนี้ลดราคาเหลือห้าสิบบาท", "seua dtua nii lot raa-khaa leuua haa-sip baat", "这件衣服降价到五十泰铢。", "ครึ่งร้อย", "khreung raawy", "半百", "near-synonym", "ห้าสิบ 是日常数字；ครึ่งร้อย 带解释性，不如ห้าสิบ常用。", "五十"],
  ["raawy", "ร้อย", "raawy", "一百；百", "数词", "数字", 18, "หนังสือเล่มนี้ราคาเก้าสิบเก้าบาท ไม่ถึงหนึ่งร้อยบาท", "nang-sue lem nii raa-khaa gao-sip-gao baat mai theung neung raawy baat", "这本书九十九泰铢，不到一百泰铢。", "พัน", "phan", "一千", "confusable", "ร้อย 是百；พัน 是千，数量级不同。", "百"],
  ["phan", "พัน", "phan", "一千；千", "数词", "数字", 19, "ค่าเช่าห้องเดือนละห้าพันบาทสำหรับนักเรียนสองคน", "khaa-chao haawng duean la haa phan baat sam-rap nak-riian saawng khon", "两名学生的房租每月五千泰铢。", "ร้อย", "raawy", "一百", "confusable", "พัน 比ร้อย 大十倍，价格和数量中很常见。", "千"],
  ["meun", "หมื่น", "meun", "一万；万", "数词", "数字", 20, "เงินเก็บของเขาใกล้ถึงหนึ่งหมื่นบาทแล้ว", "ngoen gep khaawng khao glai theung neung meun baat laaeo", "他的存款快到一万泰铢了。", "พัน", "phan", "一千", "usage", "หมื่น 是万，中文学习者要注意泰语有单独的万位词。", "万"],
  ["thi-neung", "ที่หนึ่ง", "thii neung", "第一；一号位置", "数词", "序数", 21, "น้องได้ที่หนึ่งในการอ่านคำศัพท์หน้าชั้นเรียน", "naawng dai thii neung nai gaan aan kham-sap naa chan-riian", "弟弟在课堂词汇朗读中得了第一名。", "หนึ่ง", "neung", "一", "confusable", "ที่หนึ่ง 是序数第一；หนึ่ง 是数量一。", "第一"],
  ["thi-saawng", "ที่สอง", "thii saawng", "第二", "数词", "序数", 22, "ร้านกาแฟอยู่ชั้นที่สองของอาคารสีขาว", "raan gaa-faae yuu chan thii saawng khaawng aa-khaan sii khaao", "咖啡店在白色大楼的二楼。", "สอง", "saawng", "二", "confusable", "序数通常在数字前加 ที่。", "第二"],
  ["thi-saam", "ที่สาม", "thii saam", "第三", "数词", "序数", 23, "เขานั่งแถวที่สามเพราะแถวหน้าเต็มแล้ว", "khao nang thaaeo thii saam phraw thaaeo naa dtem laaeo", "他坐在第三排，因为前排满了。", "สาม", "saam", "三", "usage", "ที่สาม 常用于楼层、排位、顺序。", "第三"],
  ["an-dap-raaek", "อันดับแรก", "an-dap raaek", "首先；第一步", "短语", "序数", 24, "อันดับแรก เราต้องเขียนวันที่ไว้บนกระดาษ", "an-dap raaek rao dtawng khiian wan-thii wai bon gra-daat", "首先，我们要把日期写在纸上。", "สุดท้าย", "sut-thaai", "最后", "antonym", "อันดับแรก 表示第一步；สุดท้าย 表示最后。", "首先"],
  ["sut-thaai", "สุดท้าย", "sut-thaai", "最后；末尾", "副词", "序数", 25, "คำถามสุดท้ายง่ายกว่า แต่ฉันยังอ่านช้า", "kham-thaam sut-thaai ngaai gwaa dtaae chan yang aan chaa", "最后一道题更简单，但我读得还是慢。", "แรก", "raaek", "最先", "antonym", "สุดท้าย 与แรก 在顺序上相反。", "最后"],
  ["dtaawn-chaao", "ตอนเช้า", "dtaawn chaao", "早上；上午", "名词", "时间", 26, "ตอนเช้าฉันกินข้าวที่บ้านก่อนออกไปโรงเรียน", "dtaawn chaao chan gin khaao thii baan gaawn aawk bpai roong-riian", "早上我在家吃饭后去学校。", "ตอนเย็น", "dtaawn yen", "傍晚", "antonym", "ตอนเช้า 是一天早些时候；ตอนเย็น 是傍晚。", "早上"],
  ["dtaawn-saai", "ตอนสาย", "dtaawn saai", "上午晚些时候", "名词", "时间", 27, "วันหยุดเขาตื่นตอนสายและกินข้าวเช้าช้า", "wan-yut khao dteun dtaawn saai lae gin khaao chaao chaa", "假日他上午晚些时候起床，早饭也吃得晚。", "เช้ามืด", "chaao-meut", "清晨天未亮", "confusable", "ตอนสาย 比ตอนเช้า更晚，常接近上午九点到十一点。", "上午"],
  ["dtaawn-baai", "ตอนบ่าย", "dtaawn baai", "下午", "名词", "时间", 28, "ตอนบ่ายครูพานักเรียนไปห้องสมุด", "dtaawn baai khruu phaa nak-riian bpai haawng-sa-mut", "下午老师带学生去图书馆。", "ตอนเช้า", "dtaawn chaao", "早上", "antonym", "ตอนบ่าย 是中午以后到傍晚前。", "下午"],
  ["dtaawn-yen", "ตอนเย็น", "dtaawn yen", "傍晚；晚上早些时候", "名词", "时间", 29, "ตอนเย็นแม่รดน้ำต้นไม้หน้าบ้านทุกวัน", "dtaawn yen maae rot naam dton-maai naa baan thuk wan", "傍晚妈妈每天给家门前的植物浇水。", "ตอนเช้า", "dtaawn chaao", "早上", "antonym", "ตอนเย็น 常指傍晚，不一定是深夜。", "傍晚"],
  ["dtaawn-khuen", "ตอนกลางคืน", "dtaawn glaang khuen", "夜里；晚上", "名词", "时间", 30, "ตอนกลางคืนถนนเงียบกว่าตอนกลางวันมาก", "dtaawn glaang khuen tha-non ngiiap gwaa dtaawn glaang wan maak", "夜里街道比白天安静很多。", "ตอนกลางวัน", "dtaawn glaang wan", "白天", "antonym", "กลางคืน 是夜间；กลางวัน 是白天。", "夜晚"],
  ["wan-nii", "วันนี้", "wan-nii", "今天", "名词", "日期", 31, "วันนี้ฉันมีเรียนภาษาไทยสองชั่วโมง", "wan-nii chan mii riian phaa-saa thai saawng chua-moong", "今天我有两小时泰语课。", "พรุ่งนี้", "phrung-nii", "明天", "confusable", "วันนี้ 是今天；พรุ่งนี้ 是明天，时间差一天。", "今天"],
  ["muea-waan", "เมื่อวาน", "muea-waan", "昨天", "名词", "日期", 32, "เมื่อวานฝนตก แต่วันนี้อากาศดีมาก", "muea-waan fon dtok dtaae wan-nii aa-gaat dii maak", "昨天下雨，但今天天气很好。", "วันนี้", "wan-nii", "今天", "confusable", "เมื่อวาน 是今天以前一天。", "昨天"],
  ["phrung-nii", "พรุ่งนี้", "phrung-nii", "明天", "名词", "日期", 33, "พรุ่งนี้เราจะไปตลาดเช้ากับคุณยาย", "phrung-nii rao ja bpai dta-laat chaao gap khun-yaai", "明天我们要和外婆去早市。", "เมื่อวาน", "muea-waan", "昨天", "antonym", "พรุ่งนี้ 是未来一天；เมื่อวาน 是过去一天。", "明天"],
  ["ma-reun-nii", "มะรืนนี้", "ma-reun-nii", "后天", "名词", "日期", 34, "มะรืนนี้เพื่อนจะมาหาฉันที่บ้านตอนบ่าย", "ma-reun-nii phuean ja maa haa chan thii baan dtaawn baai", "后天朋友下午会来我家找我。", "พรุ่งนี้", "phrung-nii", "明天", "confusable", "มะรืนนี้ 比พรุ่งนี้ 再晚一天。", "后天"],
  ["wan-thii", "วันที่", "wan-thii", "日期；几号", "名词", "日期", 35, "กรุณาเขียนวันที่บนแบบฝึกหัดก่อนส่งครู", "ga-ru-naa khiian wan-thii bon baaep-feuk-hat gaawn song khruu", "请在练习上写日期后再交给老师。", "วัน", "wan", "日子；天", "confusable", "วันที่ 强调几号日期；วัน 可指一天或星期几。", "日期"],
  ["wan-jan", "วันจันทร์", "wan jan", "星期一", "名词", "星期", 36, "วันจันทร์ฉันต้องตื่นเช้ากว่าปกติ", "wan jan chan dtawng dteun chaao gwaa bpa-ga-dti", "星期一我必须比平常起得更早。", "วันอังคาร", "wan ang-khaan", "星期二", "usage", "星期名可直接放句首表示时间。", "星期一"],
  ["wan-ang-khaan", "วันอังคาร", "wan ang-khaan", "星期二", "名词", "星期", 37, "วันอังคารมีเรียนคณิตศาสตร์สองคาบ", "wan ang-khaan mii riian kha-nit-dta-saat saawng khaap", "星期二有两节数学课。", "วันจันทร์", "wan jan", "星期一", "usage", "วันอังคาร 是星期二，常与课程表一起用。", "星期二"],
  ["wan-phut", "วันพุธ", "wan phut", "星期三", "名词", "星期", 38, "วันพุธหลังเลิกเรียนเราจะซ้อมอ่านภาษาไทย", "wan phut lang loek riian rao ja saawm aan phaa-saa thai", "星期三放学后我们会练习读泰语。", "วันพฤหัสบดี", "wan pha-reu-hat-sa-baaw-dii", "星期四", "usage", "วันพุธ 的末音较短，注意不要读成长音。", "星期三"],
  ["wan-pha-reu-hat", "วันพฤหัสบดี", "wan pha-reu-hat-sa-baaw-dii", "星期四", "名词", "星期", 39, "วันพฤหัสบดีแม่กลับบ้านช้ากว่าทุกวัน", "wan pha-reu-hat-sa-baaw-dii maae glap baan chaa gwaa thuk wan", "星期四妈妈比平时更晚回家。", "วันศุกร์", "wan suk", "星期五", "usage", "口语中也常听到较短的 วันพฤหัส。", "星期四"],
  ["wan-suk", "วันศุกร์", "wan suk", "星期五", "名词", "星期", 40, "วันศุกร์นักเรียนหลายคนดีใจเพราะใกล้วันหยุด", "wan suk nak-riian laai khon dii-jai phraw glai wan-yut", "星期五很多学生很开心，因为快到假日了。", "วันเสาร์", "wan sao", "星期六", "usage", "วันศุกร์ 常与周末前的安排一起用。", "星期五"],
  ["wan-sao", "วันเสาร์", "wan sao", "星期六", "名词", "星期", 41, "วันเสาร์ครอบครัวของฉันไปกินข้าวนอกบ้าน", "wan sao khraawp-khrua khaawng chan bpai gin khaao naawk baan", "星期六我家人去外面吃饭。", "วันอาทิตย์", "wan aa-thit", "星期日", "usage", "วันเสาร์ 是周末第一天。", "星期六"],
  ["wan-aa-thit", "วันอาทิตย์", "wan aa-thit", "星期日；星期天", "名词", "星期", 42, "วันอาทิตย์ฉันไม่ไปโรงเรียนและนอนตื่นสายได้", "wan aa-thit chan mai bpai roong-riian lae naawn dteun saai dai", "星期天我不去学校，可以晚起。", "วันจันทร์", "wan jan", "星期一", "confusable", "วันอาทิตย์ 是星期日；วันจันทร์ 是新一周的星期一。", "星期日"],
  ["athiit-nii", "อาทิตย์นี้", "aa-thit nii", "这周；本周", "名词", "星期", 43, "อาทิตย์นี้เรามีสอบคำศัพท์สองครั้ง", "aa-thit nii rao mii saawp kham-sap saawng khrang", "这周我们有两次词汇测试。", "อาทิตย์หน้า", "aa-thit naa", "下周", "confusable", "อาทิตย์นี้ 是本周；อาทิตย์หน้า 是下周。", "本周"],
  ["athiit-naa", "อาทิตย์หน้า", "aa-thit naa", "下周", "名词", "星期", 44, "อาทิตย์หน้าครูจะพาเราไปพิพิธภัณฑ์", "aa-thit naa khruu ja phaa rao bpai phi-phit-tha-phan", "下周老师会带我们去博物馆。", "อาทิตย์ที่แล้ว", "aa-thit thii laaeo", "上周", "antonym", "หน้า 表未来；ที่แล้ว 表过去。", "下周"],
  ["deuan-nii", "เดือนนี้", "duean nii", "这个月；本月", "名词", "月份", 45, "เดือนนี้ค่าไฟแพงกว่าเดือนที่แล้วเล็กน้อย", "duean nii khaa fai phaaeng gwaa duean thii laaeo lek naawy", "这个月电费比上个月稍贵。", "เดือนหน้า", "duean naa", "下个月", "confusable", "เดือนนี้ 是本月；เดือนหน้า 是下月。", "本月"],
  ["deuan-naa", "เดือนหน้า", "duean naa", "下个月", "名词", "月份", 46, "เดือนหน้าเราจะย้ายไปอยู่ใกล้โรงเรียน", "duean naa rao ja yaai bpai yuu glai roong-riian", "下个月我们要搬到学校附近住。", "เดือนที่แล้ว", "duean thii laaeo", "上个月", "antonym", "หน้า 表示接下来的时间。", "下月"],
  ["mak-ga-raa-khom", "มกราคม", "mok-ga-raa-khom", "一月", "名词", "月份", 47, "โรงเรียนเปิดเทอมใหม่ในเดือนมกราคม", "roong-riian bpoet thoem mai nai duean mok-ga-raa-khom", "学校在一月开新学期。", "เดือนหนึ่ง", "duean neung", "一个月", "confusable", "มกราคม 是月份名称；เดือนหนึ่ง 是一个月的时长。", "一月"],
  ["kum-phaa-phan", "กุมภาพันธ์", "gum-phaa-phan", "二月", "名词", "月份", 48, "กุมภาพันธ์ปีนี้มีวันหยุดยาวหนึ่งครั้ง", "gum-phaa-phan bpii nii mii wan-yut yaao neung khrang", "今年二月有一次长假。", "มกราคม", "mok-ga-raa-khom", "一月", "usage", "月份名称前常加 เดือน。", "二月"],
  ["mii-naa-khom", "มีนาคม", "mii-naa-khom", "三月", "名词", "月份", 49, "เดือนมีนาคมอากาศเริ่มร้อนขึ้นทุกวัน", "duean mii-naa-khom aa-gaat roem raawn kheun thuk wan", "三月天气开始一天比一天热。", "เมษายน", "mee-saa-yon", "四月", "usage", "เดือนมีนาคม 可完整说，也可直接说 มีนาคม。", "三月"],
  ["mee-saa-yon", "เมษายน", "mee-saa-yon", "四月", "名词", "月份", 50, "เมษายนเป็นเดือนที่ร้อนมากในประเทศไทย", "mee-saa-yon bpen duean thii raawn maak nai bpra-theet thai", "四月是泰国很热的月份。", "มีนาคม", "mii-naa-khom", "三月", "usage", "เมษายน 常与宋干节、热季相关。", "四月"],
  ["phreut-sa-phaa-khom", "พฤษภาคม", "phreut-sa-phaa-khom", "五月", "名词", "月份", 51, "พฤษภาคมฝนเริ่มตกบ่อยในหลายจังหวัด", "phreut-sa-phaa-khom fon roem dtok baawy nai laai jang-wat", "五月许多府开始经常下雨。", "เมษายน", "mee-saa-yon", "四月", "usage", "月份较长，学习时可分音节记。", "五月"],
  ["mi-thu-naa-yon", "มิถุนายน", "mi-thu-naa-yon", "六月", "名词", "月份", 52, "มิถุนายนเด็ก ๆ กลับมาเรียนตามตารางปกติ", "mi-thu-naa-yon dek dek glap maa riian dtaam dtaa-raang bpa-ga-dti", "六月孩子们按正常课表回来上课。", "กรกฎาคม", "ga-ra-ga-daa-khom", "七月", "usage", "เดือนมิถุนายน 指六月这个月份。", "六月"],
  ["ga-ra-ga-daa-khom", "กรกฎาคม", "ga-ra-ga-daa-khom", "七月", "名词", "月份", 53, "กรกฎาคมปีที่แล้วฉันเริ่มเรียนภาษาไทย", "ga-ra-ga-daa-khom bpii thii laaeo chan roem riian phaa-saa thai", "去年七月我开始学泰语。", "มิถุนายน", "mi-thu-naa-yon", "六月", "usage", "ปีที่แล้ว 可放在月份后表示去年某月。", "七月"],
  ["sing-haa-khom", "สิงหาคม", "sing-haa-khom", "八月", "名词", "月份", 54, "สิงหาคมมีวันแม่ในประเทศไทย", "sing-haa-khom mii wan maae nai bpra-theet thai", "泰国八月有母亲节。", "กันยายน", "gan-yaa-yon", "九月", "usage", "月份名常与节日和日期搭配。", "八月"],
  ["gan-yaa-yon", "กันยายน", "gan-yaa-yon", "九月", "名词", "月份", 55, "กันยายนฝนยังตกบ่อย เราจึงพกร่มทุกวัน", "gan-yaa-yon fon yang dtok baawy rao jeung phok rom thuk wan", "九月雨仍然常下，所以我们每天带伞。", "สิงหาคม", "sing-haa-khom", "八月", "usage", "กันยายน 是九月，注意不是九号。", "九月"],
  ["dtuu-laa-khom", "ตุลาคม", "dtu-laa-khom", "十月", "名词", "月份", 56, "ตุลาคมโรงเรียนของฉันมีสอบปลายภาค", "dtu-laa-khom roong-riian khaawng chan mii saawp bplaai phaak", "十月我的学校有期末考试。", "พฤศจิกายน", "phreut-sa-ji-gaa-yon", "十一月", "usage", "ตุลาคม 可用于日期安排。", "十月"],
  ["phreut-sa-ji-gaa-yon", "พฤศจิกายน", "phreut-sa-ji-gaa-yon", "十一月", "名词", "月份", 57, "พฤศจิกายนอากาศเริ่มเย็นในตอนเช้า", "phreut-sa-ji-gaa-yon aa-gaat roem yen nai dtaawn chaao", "十一月早上天气开始凉。", "ธันวาคม", "than-waa-khom", "十二月", "usage", "ชื่อเดือนยาว，可分段练习发音。", "十一月"],
  ["than-waa-khom", "ธันวาคม", "than-waa-khom", "十二月", "名词", "月份", 58, "ธันวาคมหลายครอบครัววางแผนไปเที่ยว", "than-waa-khom laai khraawp-khrua waang-phaaen bpai thiao", "十二月许多家庭计划去旅行。", "มกราคม", "mok-ga-raa-khom", "一月", "confusable", "ธันวาคม 是年末十二月；มกราคม 是年初一月。", "十二月"],
  ["aa-yu", "อายุ", "aa-yu", "年龄；岁数", "名词", "年龄", 59, "คุณปู่ของฉันอายุเจ็ดสิบปี แต่ยังเดินเร็ว", "khun-bpuu khaawng chan aa-yu jet-sip bpii dtaae yang doen reo", "我爷爷七十岁了，但走路还很快。", "ปี", "bpii", "年；岁", "usage", "ถามอายุ 用 อายุ；回答岁数常说 อายุ...ปี。", "年龄"],
  ["khuap", "ขวบ", "khuap", "岁；多用于小孩年龄", "量词", "年龄", 60, "เด็กคนนี้อายุสามขวบและพูดเก่งมาก", "dek khon nii aa-yu saam khuap lae phuut geng maak", "这个孩子三岁，说话很厉害。", "ปี", "bpii", "年；岁", "confusable", "ขวบ 常用于小孩年龄；ปี 更通用。", "岁"],
  ["bpii", "ปี", "bpii", "年；岁", "量词", "年龄", 61, "ฉันเรียนภาษาไทยมาหนึ่งปีแล้ว", "chan riian phaa-saa thai maa neung bpii laaeo", "我学泰语已经一年了。", "เดือน", "duean", "月", "confusable", "ปี 是年；เดือน 是月。", "年"],
  ["duean", "เดือน", "duean", "月；月份", "量词", "月份", 62, "เด็กคนนี้อยู่เมืองไทยมาหกเดือน", "dek khon nii yuu mueang thai maa hok duean", "这个孩子在泰国住了六个月。", "ปี", "bpii", "年", "confusable", "เดือน 可指月份，也可作“个月”的量词。", "月"],
  ["wan", "วัน", "wan", "天；日子；星期几的“日”", "量词", "日期", 63, "เขาหยุดเรียนสองวันเพราะไม่สบาย", "khao yut riian saawng wan phraw mai sa-baai", "他因为不舒服请假两天。", "คืน", "khuen", "夜；晚", "confusable", "วัน 是日/天；คืน 是夜晚或几晚。", "天"],
  ["khuen", "คืน", "khuen", "夜；晚", "量词", "时间", 64, "เราพักที่โรงแรมนี้สองคืนก่อนกลับบ้าน", "rao phak thii roong-raaem nii saawng khuen gaawn glap baan", "我们在这家酒店住两晚后回家。", "วัน", "wan", "天", "confusable", "住宿常用 คืน 计算晚数。", "晚"],
  ["chua-moong", "ชั่วโมง", "chua-moong", "小时", "量词", "时间", 65, "จากบ้านไปโรงเรียนใช้เวลาครึ่งชั่วโมง", "jaak baan bpai roong-riian chai wee-laa khreung chua-moong", "从家到学校花半小时。", "นาที", "naa-thii", "分钟", "confusable", "ชั่วโมง 比นาที 时间单位更大。", "小时"],
  ["naa-thii", "นาที", "naa-thii", "分钟", "量词", "时间", 66, "ขอรออีกห้านาทีได้ไหม รถใกล้มาถึงแล้ว", "khaaw raaw iik haa naa-thii dai mai rot glai maa theung laaeo", "可以再等五分钟吗？车快到了。", "วินาที", "wi-naa-thii", "秒", "confusable", "นาที 是分钟；วินาที 是秒。", "分钟"],
  ["wi-naa-thii", "วินาที", "wi-naa-thii", "秒", "量词", "时间", 67, "เขาคิดคำตอบอยู่ไม่กี่วินาทีแล้วก็ยิ้ม", "khao khit kham-dtaawp yuu mai gii wi-naa-thii laaeo gaaw yim", "他想了几秒答案，然后笑了。", "นาที", "naa-thii", "分钟", "confusable", "วินาที 是很短的时间单位。", "秒"],
  ["khreung", "ครึ่ง", "khreung", "一半；半", "数词", "数量", 68, "ฉันกินข้าวไปครึ่งจานเพราะยังไม่หิวมาก", "chan gin khaao bpai khreung jaan phraw yang mai hiu maak", "我吃了半盘饭，因为还不是很饿。", "เต็ม", "dtem", "满；完整", "antonym", "ครึ่ง 表示一半；เต็ม 表示满或完整。", "半"],
  ["khreung-chua-moong", "ครึ่งชั่วโมง", "khreung chua-moong", "半小时", "短语", "时间", 69, "รถติดมาก เราจึงมาสายครึ่งชั่วโมง", "rot dtit maak rao jeung maa saai khreung chua-moong", "堵车很严重，所以我们迟到了半小时。", "สามสิบนาที", "saam-sip naa-thii", "三十分钟", "near-synonym", "สอง个表达意思相同，ครึ่งชั่วโมง 更口语。", "半小时"],
  ["thiiang", "เที่ยง", "thiiang", "中午十二点", "名词", "时间", 70, "พวกเรากินข้าวกลางวันตอนเที่ยงที่โรงอาหาร", "phuak rao gin khaao glaang-wan dtaawn thiiang thii roong-aa-haan", "我们中午十二点在食堂吃午饭。", "เที่ยงคืน", "thiiang-khuen", "午夜十二点", "confusable", "เที่ยง 是中午；เที่ยงคืน 是午夜。", "中午"],
  ["thiiang-khuen", "เที่ยงคืน", "thiiang khuen", "午夜十二点", "名词", "时间", 71, "เมื่อคืนเขานอนเกือบเที่ยงคืนเพราะอ่านหนังสือ", "muea-khuen khao naawn geuap thiiang khuen phraw aan nang-sue", "昨晚他差不多午夜才睡，因为在看书。", "เที่ยง", "thiiang", "中午", "confusable", "มีคำว่า คืน จึง表示夜里十二点。", "午夜"],
  ["dtii-nueng", "ตีหนึ่ง", "dtii neung", "凌晨一点", "名词", "时间", 72, "เมื่อคืนฝนตกตอนตีหนึ่ง ฉันจึงตื่นขึ้นมา", "muea-khuen fon dtok dtaawn dtii neung chan jeung dteun kheun maa", "昨晚凌晨一点下雨，所以我醒了。", "บ่ายโมง", "baai moong", "下午一点", "confusable", "ตีหนึ่ง 是凌晨一点；บ่ายโมง 是下午一点。", "凌晨"],
  ["hok-moong-chaao", "หกโมงเช้า", "hok moong chaao", "早上六点", "短语", "时间", 73, "แม่ตื่นหกโมงเช้าเพื่อเตรียมอาหารให้ทุกคน", "maae dteun hok moong chaao phuea dtriiam aa-haan hai thuk khon", "妈妈早上六点起床给大家准备饭。", "หกโมงเย็น", "hok moong yen", "傍晚六点", "confusable", "เช้า 和เย็น 会改变同一个数字对应的时间。", "六点"],
  ["jet-moong-khreung", "เจ็ดโมงครึ่ง", "jet moong khreung", "七点半", "短语", "时间", 74, "เราต้องถึงโรงเรียนก่อนเจ็ดโมงครึ่งทุกวัน", "rao dtawng theung roong-riian gaawn jet moong khreung thuk wan", "我们每天必须在七点半前到学校。", "เจ็ดโมง", "jet moong", "七点", "usage", "ครึ่ง 放在小时后表示半点。", "半点"],
  ["baai-moong", "บ่ายโมง", "baai moong", "下午一点", "名词", "时间", 75, "บ่ายโมงครูเริ่มสอนบทใหม่ในห้องเรียน", "baai moong khruu roem saawn bot mai nai haawng-riian", "下午一点老师开始在教室教新课。", "ตีหนึ่ง", "dtii neung", "凌晨一点", "confusable", "บ่ายโมง 属于下午；ตีหนึ่ง 属于凌晨。", "下午一点"],
  ["saam-moong-yen", "สามโมงเย็น", "saam moong yen", "下午三点；傍晚前", "短语", "时间", 76, "สามโมงเย็นเด็ก ๆ กลับบ้านพร้อมกัน", "saam moong yen dek dek glap baan phraawm gan", "下午三点孩子们一起回家。", "สามทุ่ม", "saam thum", "晚上九点", "confusable", "สามโมงเย็น 是十五点；สามทุ่ม 是二十一点。", "三点"],
  ["song-thum", "สองทุ่ม", "saawng thum", "晚上八点", "短语", "时间", 77, "สองทุ่มแล้ว เด็ก ๆ ควรเตรียมตัวนอน", "saawng thum laaeo dek dek khuan dtriiam dtua naawn", "已经晚上八点了，孩子们该准备睡觉了。", "สองโมง", "saawng moong", "两点", "confusable", "ทุ่ม 是晚上计时单位，สองทุ่ม不是两点。", "晚上八点"],
  ["khrang", "ครั้ง", "khrang", "次；回", "量词", "次数", 78, "ฉันอ่านคำนี้สามครั้งแล้วยังจำไม่ได้", "chan aan kham nii saam khrang laaeo yang jam mai dai", "这个词我读了三次还是记不住。", "รอบ", "raawp", "轮；圈", "confusable", "ครั้ง 是次数；รอบ 常表示一轮或一圈。", "次数"],
  ["nueng-khrang", "หนึ่งครั้ง", "neung khrang", "一次", "短语", "次数", 79, "ลองพูดประโยคนี้อีกหนึ่งครั้งได้ไหม", "laawng phuut bpra-yook nii iik neung khrang dai mai", "可以再试着说一次这个句子吗？", "ครั้งเดียว", "khrang diao", "只一次", "near-synonym", "หนึ่งครั้ง 是数量一次；ครั้งเดียว 常强调只有一次。", "一次"],
  ["laai-khrang", "หลายครั้ง", "laai khrang", "多次；好几次", "短语", "次数", 80, "ครูอธิบายหลายครั้งเพื่อให้นักเรียนเข้าใจ", "khruu a-thi-baai laai khrang phuea hai nak-riian khao-jai", "老师解释了好几次，为了让学生明白。", "ครั้งเดียว", "khrang diao", "只一次", "antonym", "หลายครั้ง 表示多次；ครั้งเดียว 表示一次。", "多次"],
  ["thuk-wan", "ทุกวัน", "thuk wan", "每天", "副词", "频率", 81, "ฉันฝึกฟังภาษาไทยสิบห้านาทีทุกวัน", "chan feuk fang phaa-saa thai sip-haa naa-thii thuk wan", "我每天练习听泰语十五分钟。", "บางวัน", "baang wan", "有些天", "confusable", "ทุกวัน 是每天都做；บางวัน 只是有些天。", "每天"],
  ["thuk-athiit", "ทุกอาทิตย์", "thuk aa-thit", "每周", "副词", "频率", 82, "พ่อไปเยี่ยมคุณย่าทุกอาทิตย์", "phaaw bpai yiiam khun-yaa thuk aa-thit", "爸爸每周去看望奶奶。", "อาทิตย์ละครั้ง", "aa-thit la khrang", "每周一次", "near-synonym", "ทุกอาทิตย์ 表示每周；อาทิตย์ละครั้ง 明确每周一次。", "每周"],
  ["baawy", "บ่อย", "baawy", "常常；频繁", "副词", "频率", 83, "ช่วงนี้ฝนตกบ่อย ฉันจึงพกร่มไปโรงเรียน", "chuang nii fon dtok baawy chan jeung phok rom bpai roong-riian", "最近经常下雨，所以我带伞去学校。", "นาน ๆ ครั้ง", "naan naan khrang", "很少；偶尔", "antonym", "บ่อย 表示频率高；นาน ๆ ครั้ง 表示频率低。", "常常"],
  ["mai-baawy", "ไม่บ่อย", "mai baawy", "不常；不经常", "副词", "频率", 84, "ฉันไม่บ่อยได้กินอาหารเผ็ดมาก", "chan mai baawy dai gin aa-haan phet maak", "我不常吃很辣的食物。", "บ่อย", "baawy", "常常", "antonym", "ไม่ 放在บ่อย前，表示频率不高。", "不常"],
  ["baang-khrang", "บางครั้ง", "baang khrang", "有时候；偶尔", "副词", "频率", 85, "บางครั้งฉันเดินไปโรงเรียนกับเพื่อนบ้าน", "baang khrang chan doen bpai roong-riian gap phuean-baan", "有时候我和邻居朋友走路去学校。", "เสมอ", "sa-moe", "总是；一直", "confusable", "บางครั้ง 频率低于เสมอ。", "有时候"],
  ["sa-moe", "เสมอ", "sa-moe", "总是；一直", "副词", "频率", 86, "คุณยายยิ้มเสมอเมื่อเห็นหลานกลับบ้าน", "khun-yaai yim sa-moe muea hen laan glap baan", "外婆看到孙辈回家时总是微笑。", "บางครั้ง", "baang khrang", "有时候", "antonym", "เสมอ 表示经常且稳定；บางครั้ง 只是偶尔。", "总是"],
  ["khoei", "เคย", "khoei", "曾经；有过经验", "副词", "频率", 87, "ฉันเคยไปเชียงใหม่หนึ่งครั้งกับครอบครัว", "chan khoei bpai chiiang-mai neung khrang gap khraawp-khrua", "我曾经和家人去过一次清迈。", "ไม่เคย", "mai khoei", "从未", "antonym", "เคย 表示有经验；ไม่เคย 表示没有过。", "曾经"],
  ["mai-khoei", "ไม่เคย", "mai khoei", "从未；没有过", "副词", "频率", 88, "เขาไม่เคยขึ้นรถไฟใต้ดินมาก่อน", "khao mai khoei kheun rot-fai-dtai-din maa gaawn", "他以前从没坐过地铁。", "เคย", "khoei", "曾经", "antonym", "ไม่เคย 是 เคย 的否定。", "从未"],
  ["iik", "อีก", "iik", "再；另外", "副词", "数量", 89, "ขอเวลาอีกห้านาที ฉันกำลังเขียนคำตอบ", "khaaw wee-laa iik haa naa-thii chan gam-lang khiian kham-dtaawp", "请再给我五分钟，我正在写答案。", "พอแล้ว", "phaaw laaeo", "够了", "antonym", "อีก 表示还要增加；พอแล้ว 表示已经够。", "再"],
  ["iik-nit", "อีกนิด", "iik nit", "再一点；再稍微", "短语", "数量", 90, "เดินอีกนิดก็จะถึงร้านขายยาแล้ว", "doen iik nit gaaw ja theung raan khaai yaa laaeo", "再走一点就到药店了。", "ไกลมาก", "glai maak", "很远", "confusable", "อีกนิด 表示距离或数量不多。", "一点"],
  ["nit-diaao", "นิดเดียว", "nit diao", "一点点；很少", "短语", "数量", 91, "น้ำตาลในแก้วนี้มีนิดเดียว ไม่หวานมาก", "naam-dtaan nai gaaeow nii mii nit diao mai waan maak", "这个杯子里的糖只有一点点，不太甜。", "เยอะมาก", "yuh maak", "很多", "antonym", "นิดเดียว 强调少；เยอะมาก 强调多。", "一点点"],
  ["laai", "หลาย", "laai", "好几个；许多", "数词", "数量", 92, "หน้าห้องมีรองเท้าหลายคู่เพราะมีแขกมาเยี่ยม", "naa haawng mii raawng-thaao laai khuu phraw mii khaaek maa yiiam", "房间门口有好几双鞋，因为有客人来访。", "สองสาม", "saawng saam", "两三个", "confusable", "หลาย 比สองสาม 数量感更大但不精确。", "许多"],
  ["thuk-khon", "ทุกคน", "thuk khon", "每个人；大家", "短语", "数量", 93, "ทุกคนในบ้านช่วยกันทำความสะอาดวันเสาร์", "thuk khon nai baan chuai gan tham khwaam-sa-aat wan sao", "家里每个人星期六一起打扫。", "บางคน", "baang khon", "有些人", "antonym", "ทุกคน 是全部人；บางคน 是一部分人。", "每个人"],
  ["baang-khon", "บางคน", "baang khon", "有些人", "短语", "数量", 94, "บางคนชอบเรียนตอนเช้า แต่บางคนชอบเรียนตอนเย็น", "baang khon chaawp riian dtaawn chaao dtaae baang khon chaawp riian dtaawn yen", "有些人喜欢早上学习，但有些人喜欢傍晚学习。", "ทุกคน", "thuk khon", "每个人", "antonym", "บางคน 表示部分人，不是全部。", "有些人"],
  ["thang-mot", "ทั้งหมด", "thang mot", "全部；一共", "副词", "数量", 95, "นักเรียนทั้งหมดในห้องนี้มีสามสิบคน", "nak-riian thang mot nai haawng nii mii saam-sip khon", "这个班一共有三十名学生。", "บางส่วน", "baang suan", "一部分", "antonym", "ทั้งหมด 是全部；บางส่วน 是部分。", "全部"],
  ["bpra-maan", "ประมาณ", "bpra-maan", "大约；左右", "副词", "数量", 96, "จากบ้านไปตลาดใช้เวลาประมาณสิบนาที", "jaak baan bpai dta-laat chai wee-laa bpra-maan sip naa-thii", "从家到市场大约花十分钟。", "พอดี", "phaaw-dii", "正好", "confusable", "ประมาณ 表示估计；พอดี 表示刚好。", "大约"],
];

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related: VocabularyExpansionRelated = {
    thai: row[10],
    roman: row[11],
    chinese: row[12],
  };
  const comparison: VocabularyExpansionComparison = {
    kind: row[13],
    target: related,
    distinctionZh: row[14],
  };
  const example = {
    thai: row[7],
    roman: row[8],
    chinese: row[9],
  };
  const collocations = [
    {
      thai: row[1],
      roman: row[2],
      chinese: row[3],
    },
    {
      thai: row[10],
      roman: row[11],
      chinese: row[12],
    },
  ];
  const synonyms = row[13] === "near-synonym" ? [related] : [];
  const antonyms = row[13] === "antonym" ? [related] : [];

  return {
    id: row[0],
    thai: row[1],
    roman: row[2],
    chinese: row[3],
    partOfSpeech: row[4],
    theme: row[5],
    level: "a1",
    priority: row[6],
    senses: [
      {
        id: `${row[0]}-main`,
        chinese: row[3],
        examples: [example],
        synonyms,
        antonyms,
        comparisons: [comparison],
        collocations,
        tags: [row[5], row[15]],
      },
    ],
    synonyms,
    antonyms,
    comparisons: [comparison],
    collocations,
    tags: [row[5], row[15], "A1基础"],
    sourceRefs: TIME_NUMBER_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_TIME_NUMBERS_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
