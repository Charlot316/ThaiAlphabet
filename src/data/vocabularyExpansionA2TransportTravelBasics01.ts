export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "交通工具" | "打车" | "公交地铁" | "车票" | "机场车站" | "出行安排" | "迟到堵车" | "路线";
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

const TRANSPORT_REFS = ["worker-a-a2-transport-travel-basics", "basic-thai-travel"];

const rows: Row[] = [
  ["gaan-doen-thaang", "การเดินทาง", "gaan doen thaang", "出行；旅行过程", "名词", "出行安排", 1, "การเดินทางครั้งนี้ใช้เวลานานกว่าที่คิด", "gaan doen-thaang khrang nii chai wee-laa naan gwaa thii khit", "这次出行花的时间比想象中长。", "การท่องเที่ยว", "gaan thaawng-thiao", "旅游", "confusable", "การเดินทาง 强调移动过程；การท่องเที่ยว 强调游玩。", "出行"],
  ["waang-phaaen-doen-thaang", "วางแผนเดินทาง", "waang phaaen doen thaang", "规划出行", "动词", "出行安排", 2, "เราวางแผนเดินทางล่วงหน้าเพราะวันหยุดคนเยอะ", "rao waang phaaen doen-thaang luang-naa phraw wan-yut khon yuh", "我们提前规划出行，因为假日人多。", "เดินทางทันที", "doen-thaang than-thii", "马上出发", "confusable", "วางแผน 强调先安排；ทันที 强调立刻。", "规划"],
  ["dtarang-doen-thaang", "ตารางเดินทาง", "dtaa-raang doen thaang", "行程表；出行时间表", "名词", "出行安排", 3, "กรุณาส่งตารางเดินทางให้ทุกคนก่อนวันศุกร์", "ga-ru-naa song dtaa-raang doen-thaang hai thuk khon gaawn wan suk", "请在星期五前把行程表发给大家。", "ตั๋ว", "dtua", "票", "confusable", "ตารางเดินทาง 是安排；ตั๋ว 是乘车或入场凭证。", "行程"],
  ["gam-not-wee-laa", "กำหนดเวลา", "gam-not wee-laa", "规定时间；约定时间", "名词", "出行安排", 4, "รถตู้จะออกตามกำหนดเวลา แม้ว่าบางคนยังมาไม่ถึง", "rot dtuu ja aawk dtaam gam-not wee-laa maae waa baang khon yang maa mai theung", "面包车会按规定时间出发，即使有些人还没到。", "เลื่อนเวลา", "leuan wee-laa", "改时间；延期", "antonym", "กำหนดเวลา 是已定时间；เลื่อนเวลา 是把时间往后或另改。", "时间"],
  ["luang-naa", "ล่วงหน้า", "luang naa", "提前；预先", "副词", "出行安排", 5, "ถ้าจะไปสนามบิน ควรจองรถล่วงหน้า", "thaa ja bpai sa-naam-bin khuan jaawng rot luang-naa", "如果要去机场，应该提前订车。", "นาทีสุดท้าย", "naa-thii sut-thaai", "最后一刻", "antonym", "ล่วงหน้า 表提前准备；นาทีสุดท้าย 表临时到最后。", "提前"],
  ["rot", "รถ", "rot", "车；车辆", "名词", "交通工具", 6, "ถนนนี้มีรถเยอะมากในตอนเช้า", "tha-non nii mii rot yuh maak nai dtaawn chaao", "这条路早上车很多。", "เรือ", "reua", "船", "confusable", "รถ 是陆上车辆；เรือ 在水上。", "车"],
  ["rot-yon", "รถยนต์", "rot yon", "汽车；轿车", "名词", "交通工具", 7, "บ้านนี้มีรถยนต์หนึ่งคันและจักรยานสองคัน", "baan nii mii rot-yon neung khan lae jak-gra-yaan saawng khan", "这家有一辆汽车和两辆自行车。", "รถเมล์", "rot-mee", "公交车", "confusable", "รถยนต์ 多指私家汽车；รถเมล์ 是公交车。", "汽车"],
  ["rot-mee", "รถเมล์", "rot mee", "公交车", "名词", "公交地铁", 8, "ฉันนั่งรถเมล์ไปโรงเรียนเมื่อฝนตก", "chan nang rot-mee bpai roong-riian muea fon dtok", "下雨时我坐公交车去学校。", "แท็กซี่", "thaek-sii", "出租车", "confusable", "รถเมล์ 按线路走；แท็กซี่ 可按目的地走。", "公交"],
  ["rot-fai", "รถไฟ", "rot fai", "火车", "名词", "交通工具", 9, "เราจะนั่งรถไฟไปเชียงใหม่เดือนหน้า", "rao ja nang rot-fai bpai chiiang-mai duean naa", "我们下个月要坐火车去清迈。", "รถไฟฟ้า", "rot-fai-faa", "城市轨道电车/轻轨", "confusable", "รถไฟ 是火车；รถไฟฟ้า 常指城市轨道交通。", "火车"],
  ["rot-fai-faa", "รถไฟฟ้า", "rot fai faa", "电车；城市轨道交通", "名词", "公交地铁", 10, "รถไฟฟ้าเร็วกว่าแท็กซี่ในช่วงรถติด", "rot-fai-faa reo gwaa thaek-sii nai chuang rot dtit", "堵车时轨道交通比出租车快。", "รถไฟ", "rot fai", "火车", "confusable", "รถไฟฟ้า 多在城市内；รถไฟ 常跨城市。", "轨道交通"],
  ["rot-fai-dtai-din", "รถไฟใต้ดิน", "rot fai dtai din", "地铁", "名词", "公交地铁", 11, "สถานีรถไฟใต้ดินอยู่ใต้ห้างใหญ่", "sa-thaa-nii rot-fai-dtai-din yuu dtai haang yai", "地铁站在大商场下面。", "รถไฟฟ้า", "rot fai faa", "城市轨道交通", "confusable", "รถไฟใต้ดิน 强调地下；รถไฟฟ้า 可在地上或地下。", "地铁"],
  ["thaek-sii", "แท็กซี่", "thaek-sii", "出租车", "名词", "打车", 12, "ถ้ามีกระเป๋าเยอะ เรานั่งแท็กซี่ไปโรงแรมดีกว่า", "thaa mii gra-bpao yuh rao nang thaek-sii bpai roong-raaem dii gwaa", "如果行李多，我们坐出租车去酒店比较好。", "รถเมล์", "rot-mee", "公交车", "confusable", "出租车更灵活但通常更贵。", "出租车"],
  ["rot-dtuu", "รถตู้", "rot dtuu", "面包车；厢式客车", "名词", "交通工具", 13, "รถตู้จากกรุงเทพฯ ไปพัทยาออกทุกชั่วโมง", "rot dtuu jaak grung-theep bpai phat-tha-yaa aawk thuk chua-moong", "从曼谷去芭提雅的面包车每小时发车。", "รถบัส", "rot bas", "大巴", "confusable", "รถตู้ 较小；รถบัส 通常较大。", "面包车"],
  ["rot-bas", "รถบัส", "rot bas", "大巴；巴士", "名词", "交通工具", 14, "นักเรียนขึ้นรถบัสไปทัศนศึกษาตอนเช้า", "nak-riian kheun rot-bas bpai that-sa-na-seuk-saa dtaawn chaao", "学生们早上坐大巴去参观学习。", "รถตู้", "rot dtuu", "面包车", "confusable", "รถบัส 座位多，常用于团体出行。", "大巴"],
  ["win-motoesai", "วินมอเตอร์ไซค์", "win maaw-dtooe-sai", "摩托车站；摩的", "名词", "打车", 15, "ถ้ารีบมาก เขาจะเรียกวินมอเตอร์ไซค์ไปหน้าซอย", "thaa riip maak khao ja riiak win maaw-dtooe-sai bpai naa saawy", "如果很赶，他会叫摩的去巷口。", "แท็กซี่", "thaek-sii", "出租车", "confusable", "วินมอเตอร์ไซค์ 快但载物少；แท็กซี่ 更适合行李多。", "摩的"],
  ["reua", "เรือ", "reua", "船", "名词", "交通工具", 16, "บางคนเดินทางไปทำงานด้วยเรือทุกเช้า", "baang khon doen-thaang bpai tham-ngaan duai reua thuk chaao", "有些人每天早上坐船上班。", "รถ", "rot", "车", "confusable", "เรือ 在水上行驶。", "船"],
  ["khreuang-bin", "เครื่องบิน", "khreuuang bin", "飞机", "名词", "交通工具", 17, "เครื่องบินจะออกตอนเก้าโมงเช้า", "khreuuang-bin ja aawk dtaawn gao moong chaao", "飞机将早上九点起飞。", "รถไฟ", "rot fai", "火车", "confusable", "เครื่องบิน 速度快，常用于远距离。", "飞机"],
  ["jak-gra-yaan", "จักรยาน", "jak-gra-yaan", "自行车", "名词", "交通工具", 18, "เด็กหลายคนขี่จักรยานไปโรงเรียน", "dek laai khon khii jak-gra-yaan bpai roong-riian", "很多孩子骑自行车去学校。", "มอเตอร์ไซค์", "maaw-dtooe-sai", "摩托车", "confusable", "จักรยาน 用脚踩；มอเตอร์ไซค์ 有发动机。", "自行车"],
  ["maaw-dtooe-sai", "มอเตอร์ไซค์", "maaw-dtooe-sai", "摩托车", "名词", "交通工具", 19, "พี่ชายขี่มอเตอร์ไซค์ไปทำงานเพราะบ้านอยู่ใกล้", "phii-chaai khii maaw-dtooe-sai bpai tham-ngaan phraw baan yuu glai", "哥哥骑摩托车上班，因为家很近。", "จักรยาน", "jak-gra-yaan", "自行车", "confusable", "มอเตอร์ไซค์ 比จักรยาน 快，但更要注意安全。", "摩托车"],
  ["doen", "เดิน", "doen", "走路；步行", "动词", "路线", 20, "จากโรงแรมไปตลาดเดินประมาณสิบนาที", "jaak roong-raaem bpai dta-laat doen bpra-maan sip naa-thii", "从酒店到市场走路大约十分钟。", "นั่งรถ", "nang rot", "坐车", "confusable", "เดิน 是步行；นั่งรถ 是乘车。", "步行"],
  ["nang-rot", "นั่งรถ", "nang rot", "坐车；乘车", "动词", "交通工具", 21, "วันนี้ร้อนมาก เรานั่งรถไปโรงเรียนดีกว่า", "wan-nii raawn maak rao nang rot bpai roong-riian dii gwaa", "今天很热，我们坐车去学校比较好。", "เดิน", "doen", "走路", "antonym", "นั่งรถ 用交通工具；เดิน 靠步行。", "乘车"],
  ["kheun-rot", "ขึ้นรถ", "kheun rot", "上车", "动词", "公交地铁", 22, "ขึ้นรถเมล์ที่ป้ายหน้าโรงเรียนได้เลย", "kheun rot-mee thii bpaai naa roong-riian dai loei", "可以直接在学校门口站牌上公交。", "ลงรถ", "long rot", "下车", "antonym", "ขึ้นรถ 是上车；ลงรถ 是下车。", "上车"],
  ["long-rot", "ลงรถ", "long rot", "下车", "动词", "公交地铁", 23, "ลงรถที่สถานีหน้าโรงพยาบาลแล้วเดินต่อ", "long rot thii sa-thaa-nii naa roong-pha-yaa-baan laaeo doen dtaaw", "在医院前的站下车后继续走。", "ขึ้นรถ", "kheun rot", "上车", "antonym", "ลงรถ 后常接下车地点。", "下车"],
  ["bplian-rot", "เปลี่ยนรถ", "bpliian rot", "换车；换乘", "动词", "公交地铁", 24, "ไปสนามบินต้องเปลี่ยนรถที่สถานีกลาง", "bpai sa-naam-bin dtawng bpliian rot thii sa-thaa-nii glaang", "去机场要在中央车站换乘。", "นั่งรถต่อเดียว", "nang rot dtaaw diao", "一趟直达", "antonym", "เปลี่ยนรถ 表示中途换乘。", "换乘"],
  ["dtaw-rot", "ต่อรถ", "dtaaw rot", "换乘；接着坐下一趟车", "动词", "公交地铁", 25, "ถ้าพลาดรถไฟฟ้า เราต้องต่อรถเมล์แทน", "thaa phlaat rot-fai-faa rao dtawng dtaaw rot-mee thaaen", "如果错过轻轨，我们得改换公交。", "ตรงไป", "dtrong bpai", "直达；一直走", "confusable", "ต่อรถ 强调接下一段交通；ตรงไป 强调方向不变。", "换车"],
  ["thii-nang", "ที่นั่ง", "thii nang", "座位", "名词", "车票", 26, "บนรถบัสยังมีที่นั่งว่างสามที่", "bon rot-bas yang mii thii-nang waang saam thii", "大巴上还有三个空座位。", "ที่ยืน", "thii yuen", "站位", "antonym", "ที่นั่ง 是坐的位置；ที่ยืน 是站的位置。", "座位"],
  ["thii-yuen", "ที่ยืน", "thii yuen", "站位；站的地方", "名词", "公交地铁", 27, "รถไฟฟ้าแน่นมากจนไม่มีที่ยืนสบาย ๆ", "rot-fai-faa naaen maak jon mai mii thii yuen sa-baai sa-baai", "轻轨很挤，连舒服站的地方都没有。", "ที่นั่ง", "thii nang", "座位", "antonym", "没有座位时可能只能มีที่ยืน。", "站位"],
  ["dtua", "ตั๋ว", "dtua", "票；车票；机票", "名词", "车票", 28, "เก็บตั๋วไว้จนกว่าจะลงรถไฟ", "gep dtua wai jon gwaa ja long rot-fai", "把票留着直到下火车。", "ใบเสร็จ", "bai-set", "收据", "confusable", "ตั๋ว 用来乘坐或入场；ใบเสร็จ 是付款凭证。", "票"],
  ["sue-dtua", "ซื้อตั๋ว", "sue dtua", "买票", "动词", "车票", 29, "เราซื้อตั๋วรถไฟล่วงหน้าหนึ่งอาทิตย์", "rao sue dtua rot-fai luang-naa neung aa-thit", "我们提前一周买了火车票。", "จองตั๋ว", "jaawng dtua", "订票", "confusable", "ซื้อตั๋ว 强调付款拿票；จองตั๋ว 强调预订。", "买票"],
  ["jaawng-dtua", "จองตั๋ว", "jaawng dtua", "订票；预订车票/机票", "动词", "车票", 30, "ควรจองตั๋วเครื่องบินก่อนวันเดินทาง", "khuan jaawng dtua khreuuang-bin gaawn wan doen-thaang", "应该在出行日前预订机票。", "ซื้อตั๋ว", "sue dtua", "买票", "confusable", "จอง อาจยัง未取票；ซื้อ 通常已购买。", "订票"],
  ["dtua-bpai-glap", "ตั๋วไปกลับ", "dtua bpai glap", "往返票", "名词", "车票", 31, "ตั๋วไปกลับถูกกว่าซื้อตั๋วสองใบแยกกัน", "dtua bpai glap thuuk gwaa sue dtua saawng bai yaaek gan", "往返票比分开买两张票便宜。", "ตั๋วเที่ยวเดียว", "dtua thiao diao", "单程票", "antonym", "ไปกลับ 包含去和回；เที่ยวเดียว 只是一程。", "往返票"],
  ["dtua-thiao-diao", "ตั๋วเที่ยวเดียว", "dtua thiao diao", "单程票", "名词", "车票", 32, "ฉันซื้อตั๋วเที่ยวเดียวเพราะยังไม่รู้วันกลับ", "chan sue dtua thiao diao phraw yang mai ruu wan glap", "我买单程票，因为还不知道回程日期。", "ตั๋วไปกลับ", "dtua bpai glap", "往返票", "antonym", "เที่ยวเดียว 表示只去一段。", "单程票"],
  ["khaa-doi-saan", "ค่าโดยสาร", "khaa dooi-saan", "车费；交通费", "名词", "车票", 33, "ค่าโดยสารรถเมล์สายนี้สิบห้าบาท", "khaa dooi-saan rot-mee saai nii sip-haa baat", "这路公交车费十五泰铢。", "ค่าบริการ", "khaa baaw-ri-gaan", "服务费", "confusable", "ค่าโดยสาร 是乘交通工具的费用。", "车费"],
  ["juaai-khaa-doi-saan", "จ่ายค่าโดยสาร", "jaai khaa dooi-saan", "付车费", "动词", "车票", 34, "ขึ้นรถแล้วต้องจ่ายค่าโดยสารให้คนขับ", "kheun rot laaeo dtawng jaai khaa dooi-saan hai khon khap", "上车后要把车费付给司机。", "รับเงินทอน", "rap ngoen thaawn", "收找零", "usage", "จ่าย 是付款；เงินทอน 是找回的钱。", "付费"],
  ["ngoen-thaawn", "เงินทอน", "ngoen thaawn", "找零；找回的钱", "名词", "车票", 35, "อย่าลืมรับเงินทอนก่อนลงจากรถ", "yaa leum rap ngoen thaawn gaawn long jaak rot", "下车前别忘了拿找零。", "ค่าโดยสาร", "khaa dooi-saan", "车费", "confusable", "ค่าโดยสาร 是要付的钱；เงินทอน 是找回的钱。", "找零"],
  ["saai-rot", "สายรถ", "saai rot", "线路；车次线路", "名词", "公交地铁", 36, "สายรถนี้ผ่านตลาดและโรงพยาบาล", "saai rot nii phaan dta-laat lae roong-pha-yaa-baan", "这条线路经过市场和医院。", "เบอร์รถ", "boe rot", "车号；线路号", "confusable", "สายรถ 是线路；เบอร์รถ 是编号。", "线路"],
  ["boe-rot", "เบอร์รถ", "boe rot", "车号；线路号", "名词", "公交地铁", 37, "จำเบอร์รถเมล์ให้ดี ไม่อย่างนั้นอาจขึ้นผิดสาย", "jam boe rot-mee hai dii mai yaang nan aat kheun phit saai", "要记好公交车号，不然可能上错线。", "สายรถ", "saai rot", "线路", "usage", "เบอร์รถ 常指数字编号。", "车号"],
  ["sa-thaa-nii", "สถานี", "sa-thaa-nii", "车站；站点", "名词", "机场车站", 38, "สถานีนี้มีทางออกสี่ทาง", "sa-thaa-nii nii mii thaang aawk sii thaang", "这个车站有四个出口。", "ป้ายรถเมล์", "bpaai rot-mee", "公交站牌", "confusable", "สถานี 通常比ป้ายรถเมล์大。", "车站"],
  ["sa-thaa-nii-rot-fai", "สถานีรถไฟ", "sa-thaa-nii rot fai", "火车站", "名词", "机场车站", 39, "สถานีรถไฟอยู่ไกลจากโรงแรมประมาณสองกิโลเมตร", "sa-thaa-nii rot-fai yuu glai jaak roong-raaem bpra-maan saawng gi-loo-met", "火车站离酒店大约两公里。", "สนามบิน", "sa-naam-bin", "机场", "confusable", "สถานีรถไฟ 乘火车；สนามบิน 乘飞机。", "火车站"],
  ["sa-naam-bin", "สนามบิน", "sa-naam bin", "机场", "名词", "机场车站", 40, "เราต้องไปสนามบินก่อนเครื่องออกสองชั่วโมง", "rao dtawng bpai sa-naam-bin gaawn khreuuang aawk saawng chua-moong", "我们必须在飞机起飞前两小时去机场。", "สถานีรถไฟ", "sa-thaa-nii rot fai", "火车站", "confusable", "สนามบิน 是乘飞机的地方。", "机场"],
  ["aa-khaan-phuu-doi-saan", "อาคารผู้โดยสาร", "aa-khaan phuu dooi-saan", "航站楼；客运楼", "名词", "机场车站", 41, "อาคารผู้โดยสารนี้มีร้านอาหารหลายร้าน", "aa-khaan phuu dooi-saan nii mii raan aa-haan laai raan", "这个航站楼有很多餐馆。", "ประตูขึ้นเครื่อง", "bpra-dtuu kheun khreuuang", "登机口", "confusable", "อาคารผู้โดยสาร 是整栋楼；ประตูขึ้นเครื่อง 是登机口。", "航站楼"],
  ["bpra-dtuu-kheun-khreuuang", "ประตูขึ้นเครื่อง", "bpra-dtuu kheun khreuuang", "登机口", "名词", "机场车站", 42, "ประตูขึ้นเครื่องเปลี่ยนจากเลขสามเป็นเลขห้า", "bpra-dtuu kheun khreuuang bpliian jaak leek saam bpen leek haa", "登机口从三号改成五号。", "เคาน์เตอร์เช็กอิน", "khao-dtoe chek-in", "值机柜台", "confusable", "登机口是上飞机处；值机柜台是办理手续处。", "登机口"],
  ["khao-dtoe-chek-in", "เคาน์เตอร์เช็กอิน", "khao-dtoe chek-in", "值机柜台", "名词", "机场车站", 43, "เราต้องไปเคาน์เตอร์เช็กอินก่อนฝากกระเป๋า", "rao dtawng bpai khao-dtoe chek-in gaawn faak gra-bpao", "我们托运行李前要去值机柜台。", "ประตูขึ้นเครื่อง", "bpra-dtuu kheun khreuuang", "登机口", "confusable", "เช็กอิน 是出发前手续，不是登机。", "值机"],
  ["gra-bpao-doen-thaang", "กระเป๋าเดินทาง", "gra-bpao doen thaang", "行李箱；旅行包", "名词", "出行安排", 44, "กระเป๋าเดินทางใบนี้หนักเกินไปสำหรับเด็ก", "gra-bpao doen-thaang bai nii nak goen bpai sam-rap dek", "这个行李箱对孩子来说太重了。", "กระเป๋าถือ", "gra-bpao theu", "手提包", "confusable", "กระเป๋าเดินทาง 用于旅行；กระเป๋าถือ 较小。", "行李箱"],
  ["faak-gra-bpao", "ฝากกระเป๋า", "faak gra-bpao", "托运行李；寄放包", "动词", "机场车站", 45, "หลังเช็กอินแล้ว เราฝากกระเป๋าใบใหญ่", "lang chek-in laaeo rao faak gra-bpao bai yai", "值机后，我们托运大行李。", "ถือกระเป๋า", "theu gra-bpao", "拿着包", "antonym", "ฝาก 表交给柜台或寄放；ถือ 是自己拿。", "托运"],
  ["theu-gra-bpao", "ถือกระเป๋า", "theu gra-bpao", "拿包；随身提包", "动词", "出行安排", 46, "เขาถือกระเป๋าเล็กขึ้นรถไฟฟ้า", "khao theu gra-bpao lek kheun rot-fai-faa", "他提着小包上了轻轨。", "ฝากกระเป๋า", "faak gra-bpao", "托运/寄放包", "antonym", "ถือ คือ自己拿在手上或身边。", "随身"],
  ["khrueang-aawk", "เครื่องออก", "khreuuang aawk", "飞机起飞；航班出发", "短语", "机场车站", 47, "เครื่องออกสิบโมง แต่เราต้องถึงสนามบินแปดโมง", "khreuuang aawk sip moong dtaae rao dtawng theung sa-naam-bin bpaaet moong", "飞机十点起飞，但我们八点要到机场。", "เครื่องลง", "khreuuang long", "飞机降落", "antonym", "ออก 是出发；ลง 是降落。", "起飞"],
  ["khrueang-long", "เครื่องลง", "khreuuang long", "飞机降落；航班到达", "短语", "机场车站", 48, "เครื่องลงช้ากว่ากำหนดประมาณยี่สิบนาที", "khreuuang long chaa gwaa gam-not bpra-maan yii-sip naa-thii", "飞机比预定时间晚降落大约二十分钟。", "เครื่องออก", "khreuuang aawk", "飞机起飞", "antonym", "เครื่องลง 表到达机场。", "降落"],
  ["check-in", "เช็กอิน", "chek-in", "办理入住/值机；登记", "动词", "机场车站", 49, "เราจะเช็กอินออนไลน์ก่อนออกจากบ้าน", "rao ja chek-in online gaawn aawk jaak baan", "我们会在出门前在线值机。", "เช็กเอาต์", "chek-ao", "退房；离店手续", "antonym", "เช็กอิน 是进入或登记；เช็กเอาต์ 是离开结算。", "登记"],
  ["thaa-rot", "ท่ารถ", "thaa rot", "客运站；发车点", "名词", "机场车站", 50, "ท่ารถตู้ไปพัทยาอยู่ข้างห้างใหญ่", "thaa rot-dtuu bpai phat-tha-yaa yuu khaang haang yai", "去芭提雅的面包车站在大商场旁边。", "ป้ายรถเมล์", "bpaai rot-mee", "公交站牌", "confusable", "ท่ารถ 常是发车集中点；ป้ายรถเมล์ 是路边站。", "客运站"],
  ["thaang-aawk", "ทางออก", "thaang aawk", "出口", "名词", "机场车站", 51, "ทางออกหมายเลขสองใกล้ป้ายแท็กซี่", "thaang aawk maai-leek saawng glai bpaai thaek-sii", "二号出口靠近出租车牌。", "ทางเข้า", "thaang khao", "入口", "antonym", "ทางออก 是出去的路；ทางเข้า 是进入的路。", "出口"],
  ["thaang-khao", "ทางเข้า", "thaang khao", "入口", "名词", "机场车站", 52, "ทางเข้าสถานีอยู่ใต้สะพานลอย", "thaang khao sa-thaa-nii yuu dtai sa-phaan laawy", "车站入口在天桥下面。", "ทางออก", "thaang aawk", "出口", "antonym", "ทางเข้า 是进入的位置。", "入口"],
  ["jot-rot", "จอดรถ", "jaawt rot", "停车", "动词", "路线", 53, "คนขับจอดรถหน้าร้านสะดวกซื้อ", "khon khap jaawt rot naa raan sa-duak sue", "司机把车停在便利店前。", "ขับรถต่อ", "khap rot dtaaw", "继续开车", "antonym", "จอดรถ 是停下车；ขับต่อ 是继续行驶。", "停车"],
  ["khap-rot", "ขับรถ", "khap rot", "开车", "动词", "交通工具", 54, "พ่อขับรถพาเราไปสถานีรถไฟ", "phaaw khap rot phaa rao bpai sa-thaa-nii rot-fai", "爸爸开车带我们去火车站。", "นั่งรถ", "nang rot", "坐车", "confusable", "ขับรถ 是驾驶；นั่งรถ 是乘坐。", "开车"],
  ["khon-khap-rot", "คนขับรถ", "khon khap rot", "司机", "名词", "打车", 55, "คนขับรถบอกว่าเส้นทางนี้รถติดน้อยกว่า", "khon khap rot baawk waa sen-thaang nii rot dtit naawy gwaa", "司机说这条路线堵车更少。", "ผู้โดยสาร", "phuu dooi-saan", "乘客", "antonym", "คนขับรถ 驾驶车辆；ผู้โดยสาร 是乘车的人。", "司机"],
  ["phuu-doi-saan", "ผู้โดยสาร", "phuu dooi-saan", "乘客", "名词", "公交地铁", 56, "ผู้โดยสารควรรอให้คนในรถลงก่อน", "phuu dooi-saan khuan raaw hai khon nai rot long gaawn", "乘客应先等车里的人下车。", "คนขับรถ", "khon khap rot", "司机", "antonym", "ผู้โดยสาร 是被载的人，不是驾驶者。", "乘客"],
  ["riiak-rot", "เรียกรถ", "riiak rot", "叫车；叫出租/网约车", "动词", "打车", 57, "ถ้าฝนตกหนัก เราจะเรียกรถผ่านแอป", "thaa fon dtok nak rao ja riiak rot phaan aaep", "如果雨下得很大，我们会通过应用叫车。", "โบกรถ", "book rot", "招手拦车", "confusable", "เรียกรถ 可通过电话或应用；โบกรถ 是路边招手。", "叫车"],
  ["book-rot", "โบกรถ", "book rot", "招手拦车", "动词", "打车", 58, "เขาโบกรถแท็กซี่หน้าห้างตอนฝนหยุด", "khao book rot thaek-sii naa haang dtaawn fon yut", "雨停时他在商场前招手拦出租车。", "เรียกรถ", "riiak rot", "叫车", "confusable", "โบกรถ 是现场招手，不一定用手机。", "拦车"],
  ["bpoet-mit-dtoe", "เปิดมิเตอร์", "bpoet mit-dtoe", "打表；开计价器", "动词", "打车", 59, "ขึ้นแท็กซี่แล้วควรถามว่าเปิดมิเตอร์ไหม", "kheun thaek-sii laaeo khuan thaam waa bpoet mit-dtoe mai", "上出租车后应问是否打表。", "เหมาจ่าย", "mao jaai", "包价；一口价", "antonym", "เปิดมิเตอร์ 按计价器；เหมาจ่าย 是说定总价。", "打表"],
  ["mao-jaai", "เหมาจ่าย", "mao jaai", "包价；一口价付款", "动词", "打车", 60, "ถ้าไปนอกเมือง คนขับบางคนขอเหมาจ่าย", "thaa bpai naawk mueang khon khap baang khon khaaw mao jaai", "如果去城外，有些司机会要求一口价。", "เปิดมิเตอร์", "bpoet mit-dtoe", "打表", "antonym", "เหมาจ่าย 先谈总价，需问清楚。", "一口价"],
  ["bpai-song", "ไปส่ง", "bpai song", "送到；载去", "动词", "打车", 61, "ช่วยไปส่งฉันที่สถานีรถไฟได้ไหม", "chuai bpai song chan thii sa-thaa-nii rot-fai dai mai", "可以送我到火车站吗？", "ไปรับ", "bpai rap", "去接", "antonym", "ไปส่ง 是送人去；ไปรับ 是去接人。", "送到"],
  ["bpai-rap", "ไปรับ", "bpai rap", "去接；接人", "动词", "出行安排", 62, "พ่อจะไปรับแม่ที่สนามบินตอนเย็น", "phaaw ja bpai rap maae thii sa-naam-bin dtaawn yen", "爸爸傍晚会去机场接妈妈。", "ไปส่ง", "bpai song", "送去", "antonym", "รับ 是接；ส่ง 是送。", "接人"],
  ["rot-dtit", "รถติด", "rot dtit", "堵车；交通拥堵", "形容词", "迟到堵车", 63, "วันนี้รถติดมาก ฉันจึงมาถึงช้า", "wan-nii rot dtit maak chan jeung maa theung chaa", "今天很堵车，所以我到得晚。", "ถนนโล่ง", "tha-non loong", "道路畅通", "antonym", "รถติด 是堵；ถนนโล่ง 是路空畅。", "堵车"],
  ["tha-non-loong", "ถนนโล่ง", "tha-non loong", "道路畅通；车少", "短语", "迟到堵车", 64, "ตอนเช้าวันอาทิตย์ถนนโล่งกว่าวันทำงาน", "dtaawn chaao wan aa-thit tha-non loong gwaa wan tham-ngaan", "星期天早上的路比工作日更畅通。", "รถติด", "rot dtit", "堵车", "antonym", "โล่ง 表示不拥挤、通畅。", "畅通"],
  ["maa-saai", "มาสาย", "maa saai", "来晚；迟到", "动词", "迟到堵车", 65, "ขอโทษที่มาสาย รถเมล์มาช้ากว่าปกติ", "khaaw-thoot thii maa saai rot-mee maa chaa gwaa bpa-ga-dti", "抱歉我来晚了，公交比平常来得慢。", "มาตรงเวลา", "maa dtrong wee-laa", "准时到", "antonym", "มาสาย 是到得晚；มาตรงเวลา 是准时。", "迟到"],
  ["dtrong-wee-laa", "ตรงเวลา", "dtrong wee-laa", "准时；按时", "形容词", "迟到堵车", 66, "รถไฟเที่ยวนี้ออกตรงเวลาทุกวัน", "rot-fai thiao nii aawk dtrong wee-laa thuk wan", "这班火车每天准时出发。", "สาย", "saai", "晚；迟", "antonym", "ตรงเวลา 表示按约定时间。", "准时"],
  ["chaa", "ช้า", "chaa", "慢；晚", "形容词", "迟到堵车", 67, "รถมาเร็ว แต่เดินทางช้าเพราะฝนตก", "rot maa reo dtaae doen-thaang chaa phraw fon dtok", "车来得快，但因为下雨路上慢。", "เร็ว", "reo", "快", "antonym", "ช้า 与เร็ว 相反。", "慢"],
  ["reo", "เร็ว", "reo", "快；早一点", "形容词", "迟到堵车", 68, "ถ้าอยากถึงเร็ว ให้ขึ้นรถไฟฟ้าแทนแท็กซี่", "thaa yaak theung reo hai kheun rot-fai-faa thaaen thaek-sii", "如果想快点到，就坐轻轨代替出租车。", "ช้า", "chaa", "慢", "antonym", "เร็ว 可形容速度快或时间早。", "快"],
  ["than", "ทัน", "than", "赶得上；来得及", "动词", "迟到堵车", 69, "เราออกจากบ้านตอนนี้ยังทันรถไฟเที่ยวแรก", "rao aawk jaak baan dtaawn nii yang than rot-fai thiao raaek", "我们现在出门还赶得上第一班火车。", "ไม่ทัน", "mai than", "来不及", "antonym", "ทัน 表示时间够；ไม่ทัน 表示赶不上。", "来得及"],
  ["mai-than", "ไม่ทัน", "mai than", "来不及；赶不上", "动词", "迟到堵车", 70, "ถ้ารถติดอีกสิบนาที เราอาจไปไม่ทัน", "thaa rot dtit iik sip naa-thii rao aat bpai mai than", "如果再堵十分钟，我们可能来不及。", "ทัน", "than", "赶得上", "antonym", "ไม่ทัน 常用于赶车、赶飞机、赶时间。", "来不及"],
  ["phlaat-rot", "พลาดรถ", "phlaat rot", "错过车；没赶上车", "动词", "迟到堵车", 71, "เขาตื่นสายจึงพลาดรถเมล์เที่ยวแรก", "khao dteun saai jeung phlaat rot-mee thiao raaek", "他起晚了，所以错过了第一班公交。", "ทันรถ", "than rot", "赶上车", "antonym", "พลาดรถ 是没赶上；ทันรถ 是赶上。", "错过车"],
  ["thiao-rot", "เที่ยวรถ", "thiao rot", "班次；一趟车", "名词", "公交地铁", 72, "เที่ยวรถต่อไปจะออกในอีกยี่สิบนาที", "thiao rot dtaaw bpai ja aawk nai iik yii-sip naa-thii", "下一班车将在二十分钟后出发。", "สายรถ", "saai rot", "线路", "confusable", "เที่ยวรถ 是某一班；สายรถ 是线路。", "班次"],
  ["thiao-bin", "เที่ยวบิน", "thiao bin", "航班", "名词", "机场车站", 73, "เที่ยวบินของเราถูกเลื่อนเพราะฝนตกหนัก", "thiao-bin khaawng rao thuuk leuan phraw fon dtok nak", "我们的航班因大雨被推迟。", "เที่ยวรถ", "thiao rot", "车次", "confusable", "เที่ยวบิน 用于飞机；เที่ยวรถ 用于车。", "航班"],
  ["leuan-wee-laa", "เลื่อนเวลา", "leuan wee-laa", "改时间；推迟时间", "动词", "出行安排", 74, "สายการบินเลื่อนเวลาออกไปอีกหนึ่งชั่วโมง", "saai-gaan-bin leuan wee-laa aawk bpai iik neung chua-moong", "航空公司把出发时间推迟了一小时。", "ตรงเวลา", "dtrong wee-laa", "准时", "antonym", "เลื่อนเวลา 表示原时间被改动。", "改时间"],
  ["yok-loek", "ยกเลิก", "yok loek", "取消", "动词", "出行安排", 75, "เขายกเลิกการเดินทางเพราะไม่สบาย", "khao yok-loek gaan doen-thaang phraw mai sa-baai", "他因为不舒服取消了出行。", "ยืนยัน", "yeun-yan", "确认", "antonym", "ยกเลิก 是取消；ยืนยัน 是确认保留。", "取消"],
  ["yeun-yan", "ยืนยัน", "yeun yan", "确认", "动词", "出行安排", 76, "กรุณายืนยันเวลาออกเดินทางอีกครั้ง", "ga-ru-naa yeun-yan wee-laa aawk doen-thaang iik khrang", "请再次确认出发时间。", "ยกเลิก", "yok loek", "取消", "antonym", "ยืนยัน 表示确定无误。", "确认"],
  ["sen-thaang", "เส้นทาง", "sen thaang", "路线", "名词", "路线", 77, "เส้นทางนี้สั้นกว่า แต่มีรถติดบ่อย", "sen-thaang nii san gwaa dtaae mii rot dtit baawy", "这条路线更短，但经常堵车。", "จุดหมาย", "jut maai", "目的地", "confusable", "เส้นทาง 是怎么走；จุดหมาย 是要到哪里。", "路线"],
  ["thaang-lat", "ทางลัด", "thaang lat", "近路；捷径", "名词", "路线", 78, "คนขับรู้ทางลัดไปสนามบิน", "khon khap ruu thaang lat bpai sa-naam-bin", "司机知道去机场的近路。", "ทางอ้อม", "thaang aawm", "绕路", "antonym", "ทางลัด 更短；ทางอ้อม 绕得远。", "近路"],
  ["thaang-aawm", "ทางอ้อม", "thaang aawm", "绕路；弯路", "名词", "路线", 79, "ถนนหลักปิด เราต้องไปทางอ้อม", "tha-non lak bpit rao dtawng bpai thaang aawm", "主路关闭，我们得走绕路。", "ทางลัด", "thaang lat", "近路", "antonym", "ทางอ้อม 通常更远或更慢。", "绕路"],
  ["thaang-lak", "ถนนหลัก", "tha-non lak", "主路；主要道路", "名词", "路线", 80, "ถนนหลักรถติดมากในเวลาเลิกงาน", "tha-non lak rot dtit maak nai wee-laa loek ngaan", "下班时间主路很堵。", "ซอยเล็ก", "saawy lek", "小巷", "antonym", "ถนนหลัก 是主要道路；ซอยเล็ก 是小巷。", "主路"],
  ["phaan", "ผ่าน", "phaan", "经过；通过", "动词", "路线", 81, "รถเมล์สายนี้ผ่านมหาวิทยาลัยและโรงพยาบาล", "rot-mee saai nii phaan ma-haa-wit-tha-yaa-lai lae roong-pha-yaa-baan", "这路公交经过大学和医院。", "ไม่ผ่าน", "mai phaan", "不经过", "antonym", "ผ่าน 表路线经过某地。", "经过"],
  ["bpai-thaang", "ไปทาง", "bpai thaang", "往……方向去", "短语", "路线", 82, "จากสถานีให้ไปทางตลาด แล้วเลี้ยวซ้าย", "jaak sa-thaa-nii hai bpai thaang dta-laat laaeo liaao saai", "从车站往市场方向走，然后左转。", "กลับทางเดิม", "glap thaang doem", "原路返回", "antonym", "ไปทาง 用来说明大方向。", "往方向"],
  ["glap-thaang-doem", "กลับทางเดิม", "glap thaang doem", "原路返回", "短语", "路线", 83, "ถ้าหลงทาง ให้กลับทางเดิมก่อน", "thaa long thaang hai glap thaang doem gaawn", "如果迷路了，先原路返回。", "ไปทางใหม่", "bpai thaang mai", "走新路线", "antonym", "ทางเดิม 是来时或原来的路。", "原路"],
  ["long-thaang", "หลงทาง", "long thaang", "迷路", "动词", "路线", 84, "ฉันหลงทางในตลาดใหญ่และต้องถามทางคนขายของ", "chan long thaang nai dta-laat yai lae dtawng thaam thaang khon khaai khaawng", "我在大市场里迷路了，必须向卖东西的人问路。", "รู้ทาง", "ruu thaang", "认识路", "antonym", "หลงทาง 是不知道怎么走。", "迷路"],
  ["thaam-thaang", "ถามทาง", "thaam thaang", "问路", "动词", "路线", 85, "ถ้าไม่รู้ทาง ให้ถามทางที่ร้านสะดวกซื้อ", "thaa mai ruu thaang hai thaam thaang thii raan sa-duak sue", "如果不认识路，就在便利店问路。", "บอกทาง", "baawk thaang", "指路", "confusable", "ถามทาง 是询问；บอกทาง 是告诉别人怎么走。", "问路"],
  ["baawk-thaang", "บอกทาง", "baawk thaang", "指路；告诉路线", "动词", "路线", 86, "คุณลุงบอกทางไปสถานีรถไฟอย่างละเอียด", "khun-lung baawk thaang bpai sa-thaa-nii rot-fai yaang la-iiat", "叔叔详细地告诉了去火车站的路。", "ถามทาง", "thaam thaang", "问路", "confusable", "บอกทาง 是回答路线。", "指路"],
  ["chaawng-thaang", "ช่องทาง", "chaawng thaang", "通道；渠道", "名词", "路线", 87, "สนามบินมีช่องทางพิเศษสำหรับครอบครัวที่มีเด็กเล็ก", "sa-naam-bin mii chaawng-thaang phi-seet sam-rap khraawp-khrua thii mii dek lek", "机场有给带小孩家庭的特别通道。", "เส้นทาง", "sen thaang", "路线", "confusable", "ช่องทาง 是通道或方式；เส้นทาง 是路线。", "通道"],
  ["saphan-laawy", "สะพานลอย", "sa-phaan laawy", "天桥", "名词", "路线", 88, "ข้ามถนนด้วยสะพานลอยปลอดภัยกว่า", "khaam tha-non duai sa-phaan laawy bplaawt-phai gwaa", "用天桥过马路更安全。", "ทางม้าลาย", "thaang maa-laai", "人行横道", "confusable", "สะพานลอย 在上方过；ทางม้าลาย 在路面过。", "天桥"],
  ["thaang-maa-laai", "ทางม้าลาย", "thaang maa-laai", "人行横道", "名词", "路线", 89, "นักเรียนควรข้ามถนนที่ทางม้าลาย", "nak-riian khuan khaam tha-non thii thaang maa-laai", "学生应该在人行横道过马路。", "สะพานลอย", "sa-phaan laawy", "天桥", "confusable", "ทางม้าลาย 是地面斑马线。", "斑马线"],
  ["phueng-theung", "เพิ่งถึง", "phoeng theung", "刚到", "短语", "迟到堵车", 90, "ขอโทษครับ ผมเพิ่งถึงเพราะรถติดมาก", "khaaw-thoot khrap phom phoeng theung phraw rot dtit maak", "不好意思，我刚到，因为很堵车。", "มาถึงนานแล้ว", "maa theung naan laaeo", "早就到了", "antonym", "เพิ่งถึง 表示刚刚到。", "刚到"],
  ["gam-lang-maa", "กำลังมา", "gam-lang maa", "正在来；在路上", "短语", "迟到堵车", 91, "ฉันกำลังมา อีกประมาณห้านาทีจะถึง", "chan gam-lang maa iik bpra-maan haa naa-thii ja theung", "我正在来，大约再五分钟到。", "ยังไม่ออก", "yang mai aawk", "还没出发", "confusable", "กำลังมา 表示已经在路上；ยังไม่ออก 是还没出门。", "在路上"],
  ["yang-mai-aawk", "ยังไม่ออก", "yang mai aawk", "还没出发", "短语", "出行安排", 92, "เขายังไม่ออกจากบ้านเพราะรอฝนหยุด", "khao yang mai aawk jaak baan phraw raaw fon yut", "他还没出门，因为在等雨停。", "กำลังมา", "gam-lang maa", "正在来", "confusable", "ยังไม่ออก 表示还没开始出行。", "未出发"],
  ["theung-laaeo", "ถึงแล้ว", "theung laaeo", "到了；已经到达", "短语", "迟到堵车", 93, "ฉันถึงแล้ว รออยู่หน้าสถานี", "chan theung laaeo raaw yuu naa sa-thaa-nii", "我到了，在车站前等着。", "ยังไม่ถึง", "yang mai theung", "还没到", "antonym", "ถึงแล้ว 是已经到达。", "到了"],
  ["yang-mai-theung", "ยังไม่ถึง", "yang mai theung", "还没到", "短语", "迟到堵车", 94, "รถยังไม่ถึงสถานี แต่ใกล้มากแล้ว", "rot yang mai theung sa-thaa-nii dtaae glai maak laaeo", "车还没到站，但已经很近了。", "ถึงแล้ว", "theung laaeo", "到了", "antonym", "ยังไม่ถึง 表示尚未到达。", "未到"],
  ["bpra-maan-gii-naa-thii", "ประมาณกี่นาที", "bpra-maan gii naa-thii", "大约几分钟", "短语", "路线", 95, "จากที่นี่ไปสนามบินประมาณกี่นาทีครับ", "jaak thii nii bpai sa-naam-bin bpra-maan gii naa-thii khrap", "从这里到机场大约几分钟？", "กี่กิโลเมตร", "gii gi-loo-met", "多少公里", "confusable", "กี่นาที 问时间；กี่กิโลเมตร 问距离。", "几分钟"],
  ["gii-gi-loo-met", "กี่กิโลเมตร", "gii gi-loo-met", "多少公里", "短语", "路线", 96, "จากโรงแรมไปสถานีรถไฟกี่กิโลเมตรคะ", "jaak roong-raaem bpai sa-thaa-nii rot-fai gii gi-loo-met kha", "从酒店到火车站多少公里？", "ประมาณกี่นาที", "bpra-maan gii naa-thii", "大约几分钟", "confusable", "กี่กิโลเมตร 问距离，不问时间。", "公里"],
];

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related: VocabularyExpansionRelated = { thai: row[10], roman: row[11], chinese: row[12] };
  const comparison: VocabularyExpansionComparison = { kind: row[13], target: related, distinctionZh: row[14] };
  const example: VocabularyExpansionExample = { thai: row[7], roman: row[8], chinese: row[9] };
  const collocations: VocabularyExpansionCollocation[] = [
    { thai: row[1], roman: row[2], chinese: row[3] },
    { thai: row[10], roman: row[11], chinese: row[12] },
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
    level: "a2",
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
    tags: [row[5], row[15], "A2基础"],
    sourceRefs: TRANSPORT_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_TRANSPORT_TRAVEL_BASICS_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
