export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
export type VocabularyExpansionLevel = "a1";
export type VocabularyExpansionTheme = "地点" | "家附近" | "学校" | "商店" | "医院" | "方向" | "远近" | "进出" | "上下左右" | "问路";
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

const PLACE_DIRECTION_REFS = ["worker-a-a1-places-directions", "basic-thai-location"];

const rows: Row[] = [
  ["thii-nii", "ที่นี่", "thii nii", "这里", "副词", "地点", 1, "ที่นี่เงียบและเหมาะสำหรับอ่านหนังสือ", "thii nii ngiiap lae maw sam-rap aan nang-sue", "这里很安静，适合看书。", "ที่นั่น", "thii nan", "那里", "antonym", "ที่นี่ 是说话人所在或指向的这里；ที่นั่น 是那里。", "这里"],
  ["thii-nan", "ที่นั่น", "thii nan", "那里", "副词", "地点", 2, "ที่นั่นมีร้านกาแฟเล็ก ๆ อยู่ข้างโรงเรียน", "thii nan mii raan gaa-faae lek lek yuu khaang roong-riian", "那里有一家小咖啡店在学校旁边。", "ที่นี่", "thii nii", "这里", "antonym", "ที่นั่น 指离说话人较远或已提到的地方。", "那里"],
  ["thii-nai", "ที่ไหน", "thii nai", "哪里", "副词", "问路", 3, "ขอโทษครับ ห้องน้ำอยู่ที่ไหนครับ", "khaaw-thoot khrap haawng-naam yuu thii nai khrap", "不好意思，请问洗手间在哪里？", "ที่นี่", "thii nii", "这里", "usage", "ที่ไหน 用来问地点，常和อยู่连用。", "哪里"],
  ["trong-nii", "ตรงนี้", "dtrong nii", "这儿；这个位置", "副词", "地点", 4, "นั่งตรงนี้ได้ไหม เก้าอี้ตัวนั้นว่างอยู่", "nang dtrong nii dai mai gao-ii dtua nan waang yuu", "可以坐这儿吗？那把椅子空着。", "ที่นี่", "thii nii", "这里", "near-synonym", "ตรงนี้ 更强调具体位置；ที่นี่ 可指较大的这里。", "这儿"],
  ["trong-nan", "ตรงนั้น", "dtrong nan", "那儿；那个位置", "副词", "地点", 5, "กระเป๋าของคุณอยู่ตรงนั้น ใต้โต๊ะสีดำ", "gra-bpao khaawng khun yuu dtrong nan dtai dto sii dam", "你的包在那儿，黑色桌子下面。", "ตรงนี้", "dtrong nii", "这儿", "antonym", "ตรงนั้น 指具体的那个位置。", "那儿"],
  ["baan", "บ้าน", "baan", "家；房子", "名词", "家附近", 6, "บ้านของฉันอยู่ใกล้ตลาดและไกลจากโรงพยาบาล", "baan khaawng chan yuu glai dta-laat lae glai jaak roong-pha-yaa-baan", "我家离市场近，离医院远。", "โรงเรียน", "roong-riian", "学校", "confusable", "บ้าน 是住的地方；โรงเรียน 是学习的地方。", "家"],
  ["naa-baan", "หน้าบ้าน", "naa baan", "家门前；房子前面", "名词", "家附近", 7, "ตอนเช้ามีรถขายผลไม้จอดอยู่หน้าบ้าน", "dtaawn chaao mii rot khaai phon-la-maai jaawt yuu naa baan", "早上有一辆卖水果的车停在家门前。", "หลังบ้าน", "lang baan", "屋后；家后面", "antonym", "หน้า 表前面；หลัง 表后面。", "门前"],
  ["lang-baan", "หลังบ้าน", "lang baan", "屋后；家后面", "名词", "家附近", 8, "แม่ปลูกผักเล็ก ๆ ไว้หลังบ้าน", "maae bpluuk phak lek lek wai lang baan", "妈妈在屋后种了一些小菜。", "หน้าบ้าน", "naa baan", "家门前", "antonym", "หลังบ้าน 是房子后面。", "屋后"],
  ["khaang-baan", "ข้างบ้าน", "khaang baan", "隔壁；家旁边", "名词", "家附近", 9, "คนข้างบ้านเลี้ยงแมวสีขาวหนึ่งตัว", "khon khaang baan liiang maaeo sii khaao neung dtua", "隔壁邻居养了一只白猫。", "ในบ้าน", "nai baan", "家里", "confusable", "ข้างบ้าน 是旁边的家；ในบ้าน 是自己家里面。", "隔壁"],
  ["soi", "ซอย", "saawy", "小巷；巷子", "名词", "家附近", 10, "บ้านฉันอยู่ในซอยเล็ก ๆ หลังตลาด", "baan chan yuu nai saawy lek lek lang dta-laat", "我家在市场后面的一条小巷里。", "ถนนใหญ่", "tha-non yai", "大路", "antonym", "ซอย 通常比ถนนใหญ่小。", "巷子"],
  ["tha-non", "ถนน", "tha-non", "路；街道", "名词", "家附近", 11, "ถนนหน้าบ้านมีรถเยอะในตอนเช้า", "tha-non naa baan mii rot yuh nai dtaawn chaao", "家门前的路早上车很多。", "ทางเดิน", "thaang doen", "走道；步行路", "confusable", "ถนน 可供车行；ทางเดิน 多指人走的路。", "道路"],
  ["thaang-doen", "ทางเดิน", "thaang doen", "走道；人行通道", "名词", "家附近", 12, "อย่าวางกระเป๋ากลางทางเดิน เพราะคนอื่นเดินลำบาก", "yaa waang gra-bpao glaang thaang doen phraw khon euen doen lam-baak", "不要把包放在走道中间，因为别人走路不方便。", "ถนน", "tha-non", "街道", "confusable", "ทางเดิน 强调行走通道，不一定能开车。", "走道"],
  ["dta-laat", "ตลาด", "dta-laat", "市场", "名词", "商店", 13, "ตอนเย็นคุณแม่ซื้อผักสดที่ตลาดใกล้บ้าน", "dtaawn yen khun-maae sue phak sot thii dta-laat glai baan", "傍晚妈妈在家附近的市场买新鲜蔬菜。", "ร้านค้า", "raan khaa", "商店", "confusable", "ตลาด 是市场，常有很多摊位；ร้านค้า 是单个商店。", "市场"],
  ["raan-khaa", "ร้านค้า", "raan khaa", "商店；店铺", "名词", "商店", 14, "ร้านค้าหน้าโรงเรียนขายน้ำและขนม", "raan khaa naa roong-riian khaai naam lae kha-nom", "学校门口的商店卖水和点心。", "ตลาด", "dta-laat", "市场", "confusable", "ร้านค้า 是店铺；ตลาด 是市场区域。", "商店"],
  ["raan-aa-haan", "ร้านอาหาร", "raan aa-haan", "餐馆；饭店", "名词", "商店", 15, "ร้านอาหารนี้อยู่ตรงข้ามธนาคาร", "raan aa-haan nii yuu dtrong-khaam tha-naa-khaan", "这家餐馆在银行对面。", "ร้านกาแฟ", "raan gaa-faae", "咖啡店", "confusable", "ร้านอาหาร 主要吃饭；ร้านกาแฟ 主要喝咖啡或饮料。", "餐馆"],
  ["raan-gaa-faae", "ร้านกาแฟ", "raan gaa-faae", "咖啡店", "名词", "商店", 16, "พี่รอเพื่อนที่ร้านกาแฟข้างห้องสมุด", "phii raaw phuean thii raan gaa-faae khaang haawng-sa-mut", "哥哥在图书馆旁边的咖啡店等朋友。", "ร้านอาหาร", "raan aa-haan", "餐馆", "confusable", "ร้านกาแฟ 不一定提供正餐。", "咖啡店"],
  ["raan-khaai-yaa", "ร้านขายยา", "raan khaai yaa", "药店", "名词", "医院", 17, "ถ้าไม่สบายเล็กน้อย เราไปร้านขายยาใกล้บ้านได้", "thaa mai sa-baai lek naawy rao bpai raan khaai yaa glai baan dai", "如果只是有点不舒服，我们可以去家附近的药店。", "โรงพยาบาล", "roong-pha-yaa-baan", "医院", "confusable", "ร้านขายยา 买药；โรงพยาบาล 看病治疗。", "药店"],
  ["roong-pha-yaa-baan", "โรงพยาบาล", "roong pha-yaa-baan", "医院", "名词", "医院", 18, "โรงพยาบาลอยู่ไกลจากบ้าน แต่มีรถเมล์ผ่าน", "roong pha-yaa-baan yuu glai jaak baan dtaae mii rot-mee phaan", "医院离家远，但有公交经过。", "คลินิก", "khli-nik", "诊所", "confusable", "โรงพยาบาล 比คลินิก规模大。", "医院"],
  ["khli-nik", "คลินิก", "khli-nik", "诊所", "名词", "医院", 19, "คลินิกเล็ก ๆ อยู่ข้างร้านขายยา", "khli-nik lek lek yuu khaang raan khaai yaa", "小诊所在药店旁边。", "โรงพยาบาล", "roong pha-yaa-baan", "医院", "confusable", "คลินิก 常处理较简单的就医需求。", "诊所"],
  ["roong-riian", "โรงเรียน", "roong riian", "学校", "名词", "学校", 20, "โรงเรียนของน้องอยู่ใกล้บ้านมาก", "roong-riian khaawng naawng yuu glai baan maak", "弟弟的学校离家很近。", "มหาวิทยาลัย", "ma-haa-wit-tha-yaa-lai", "大学", "confusable", "โรงเรียน 常指中小学；มหาวิทยาลัย 是大学。", "学校"],
  ["haawng-riian", "ห้องเรียน", "haawng riian", "教室", "名词", "学校", 21, "นักเรียนรอครูอยู่ในห้องเรียนอย่างเงียบ ๆ", "nak-riian raaw khruu yuu nai haawng-riian yaang ngiiap ngiiap", "学生们安静地在教室里等老师。", "โรงเรียน", "roong-riian", "学校", "confusable", "ห้องเรียน 是学校里的教室，不等于整所学校。", "教室"],
  ["haawng-sa-mut", "ห้องสมุด", "haawng sa-mut", "图书馆", "名词", "学校", 22, "ฉันอ่านหนังสือที่ห้องสมุดหลังเลิกเรียน", "chan aan nang-sue thii haawng-sa-mut lang loek riian", "放学后我在图书馆看书。", "ห้องเรียน", "haawng riian", "教室", "confusable", "ห้องสมุด 用来看书借书；ห้องเรียน 用于上课。", "图书馆"],
  ["roong-aa-haan", "โรงอาหาร", "roong aa-haan", "食堂", "名词", "学校", 23, "ตอนเที่ยงนักเรียนกินข้าวที่โรงอาหาร", "dtaawn thiiang nak-riian gin khaao thii roong-aa-haan", "中午学生们在食堂吃饭。", "ร้านอาหาร", "raan aa-haan", "餐馆", "confusable", "โรงอาหาร 常在学校或单位内；ร้านอาหาร 是对外营业的餐馆。", "食堂"],
  ["sanaam", "สนาม", "sa-naam", "操场；场地", "名词", "学校", 24, "เด็ก ๆ วิ่งเล่นที่สนามหลังเลิกเรียน", "dek dek wing len thii sa-naam lang loek riian", "孩子们放学后在操场跑着玩。", "ห้องเรียน", "haawng riian", "教室", "antonym", "สนาม 多在室外；ห้องเรียน 在室内上课。", "操场"],
  ["pratuu-roong-riian", "ประตูโรงเรียน", "bpra-dtuu roong-riian", "校门", "名词", "学校", 25, "พ่อรอน้องอยู่ที่ประตูโรงเรียนตอนสี่โมงเย็น", "phaaw raaw naawng yuu thii bpra-dtuu roong-riian dtaawn sii moong yen", "爸爸下午四点在校门口等弟弟。", "หน้าห้องเรียน", "naa haawng-riian", "教室前", "confusable", "ประตูโรงเรียน 是学校出入口，不是教室门口。", "校门"],
  ["bpai", "ไป", "bpai", "去；往某处", "动词", "方向", 26, "ฉันไปตลาดกับแม่ทุกวันเสาร์", "chan bpai dta-laat gap maae thuk wan sao", "我每周六和妈妈去市场。", "มา", "maa", "来", "antonym", "ไป 常离开说话点；มา 常靠近说话点。", "去"],
  ["maa", "มา", "maa", "来；来到", "动词", "方向", 27, "เพื่อนมาที่บ้านฉันตอนบ่ายสามโมง", "phuean maa thii baan chan dtaawn baai saam moong", "朋友下午三点来到我家。", "ไป", "bpai", "去", "antonym", "มา 的方向通常朝说话人或目标地点。", "来"],
  ["khao", "เข้า", "khao", "进；进入", "动词", "进出", 28, "กรุณาเข้าแถวก่อนเข้าโรงอาหาร", "ga-ru-naa khao thaaeo gaawn khao roong-aa-haan", "进入食堂前请先排队。", "ออก", "aawk", "出；出去", "antonym", "เข้า 表进入；ออก 表出去。", "进"],
  ["aawk", "ออก", "aawk", "出；出去", "动词", "进出", 29, "อย่าออกจากห้องเรียนก่อนครูอนุญาต", "yaa aawk jaak haawng-riian gaawn khruu a-nu-yaat", "老师允许前不要离开教室。", "เข้า", "khao", "进", "antonym", "ออก 表从里面到外面。", "出"],
  ["kheun", "ขึ้น", "kheun", "上；上去；升", "动词", "上下左右", 30, "เราขึ้นบันไดไปชั้นสองของอาคาร", "rao kheun ban-dai bpai chan saawng khaawng aa-khaan", "我们上楼梯去大楼二楼。", "ลง", "long", "下；下来", "antonym", "ขึ้น 表向上；ลง 表向下。", "上"],
  ["long", "ลง", "long", "下；下来", "动词", "上下左右", 31, "ลงจากรถเมล์แล้วเดินตรงไปอีกนิด", "long jaak rot-mee laaeo doen dtrong bpai iik nit", "下公交后再直走一点。", "ขึ้น", "kheun", "上", "antonym", "交通中 ขึ้นรถ 是上车，ลงรถ 是下车。", "下"],
  ["liiao-saai", "เลี้ยวซ้าย", "liaao saai", "左转", "动词", "问路", 32, "ถึงไฟแดงแล้วเลี้ยวซ้าย ร้านอยู่ขวามือ", "theung fai daaeng laaeo liaao saai raan yuu khwaa mue", "到红绿灯后左转，店在右手边。", "เลี้ยวขวา", "liaao khwaa", "右转", "antonym", "ซ้าย 是左；ขวา 是右。", "左转"],
  ["liiao-khwaa", "เลี้ยวขวา", "liaao khwaa", "右转", "动词", "问路", 33, "เลี้ยวขวาที่ป้ายรถเมล์ แล้วจะเห็นโรงพยาบาล", "liaao khwaa thii bpaai rot-mee laaeo ja hen roong-pha-yaa-baan", "在公交站牌右转，然后会看到医院。", "เลี้ยวซ้าย", "liaao saai", "左转", "antonym", "ขวา 是右边，问路时很常用。", "右转"],
  ["doen-dtrong", "เดินตรง", "doen dtrong", "直走", "动词", "问路", 34, "เดินตรงไปประมาณห้านาทีจะถึงสถานี", "doen dtrong bpai bpra-maan haa naa-thii ja theung sa-thaa-nii", "直走大约五分钟就到车站。", "เลี้ยว", "liaao", "转弯", "antonym", "เดินตรง 是不转弯地走。", "直走"],
  ["dtrong-bpai", "ตรงไป", "dtrong bpai", "一直往前", "短语", "问路", 35, "จากร้านขายยาให้ตรงไปจนถึงสี่แยก", "jaak raan khaai yaa hai dtrong bpai jon theung sii-yaaek", "从药店一直往前到十字路口。", "ย้อนกลับ", "yaawn glap", "往回走", "antonym", "ตรงไป 是向前；ย้อนกลับ 是回头。", "往前"],
  ["yaawn-glap", "ย้อนกลับ", "yaawn glap", "往回走；返回原路", "动词", "问路", 36, "ถ้าเดินเลยธนาคารแล้ว ต้องย้อนกลับนิดหนึ่ง", "thaa doen loei tha-naa-khaan laaeo dtawng yaawn glap nit neung", "如果走过银行了，就得往回走一点。", "ตรงไป", "dtrong bpai", "一直往前", "antonym", "ย้อนกลับ 表示反方向回去。", "返回"],
  ["glai", "ใกล้", "glai", "近；靠近", "形容词", "远近", 37, "บ้านฉันใกล้โรงเรียน จึงเดินไปได้ทุกวัน", "baan chan glai roong-riian jeung doen bpai dai thuk wan", "我家离学校近，所以每天能走路去。", "ไกล", "glai", "远", "antonym", "ใกล้ 和ไกล 拼写不同但罗马转写相同，意思相反。", "近"],
  ["glai-far", "ไกล", "glai", "远", "形容词", "远近", 38, "โรงพยาบาลอยู่ไกลจากบ้าน เราจึงต้องนั่งรถ", "roong-pha-yaa-baan yuu glai jaak baan rao jeung dtawng nang rot", "医院离家远，所以我们必须坐车。", "ใกล้", "glai", "近", "antonym", "ไกล 是远；ใกล้ 是近，泰文字形要分清。", "远"],
  ["mai-glai", "ไม่ไกล", "mai glai", "不远", "短语", "远近", 39, "ตลาดไม่ไกลจากที่นี่ เดินไปได้", "dta-laat mai glai jaak thii nii doen bpai dai", "市场离这里不远，可以走过去。", "ไกลมาก", "glai maak", "很远", "antonym", "ไม่ไกล 表示距离可接受。", "不远"],
  ["glai-maak", "ไกลมาก", "glai maak", "很远", "短语", "远近", 40, "บ้านเพื่อนไกลมาก ฉันต้องขึ้นรถเมล์สองต่อ", "baan phuean glai maak chan dtawng kheun rot-mee saawng dtaaw", "朋友家很远，我要换两趟公交。", "ใกล้มาก", "glai maak", "很近", "antonym", "ไกลมาก 表示距离大。", "很远"],
  ["khaang", "ข้าง", "khaang", "旁边；侧边", "名词", "方向", 41, "ร้านน้ำอยู่ข้างโรงอาหาร ไม่ได้อยู่หน้าห้องเรียน", "raan naam yuu khaang roong-aa-haan mai dai yuu naa haawng-riian", "饮料店在食堂旁边，不在教室前面。", "ตรงข้าม", "dtrong khaam", "对面", "confusable", "ข้าง 是旁边；ตรงข้าม 是正对面。", "旁边"],
  ["khaang-saai", "ข้างซ้าย", "khaang saai", "左边", "名词", "上下左右", 42, "ห้องน้ำอยู่ข้างซ้ายของลิฟต์", "haawng-naam yuu khaang saai khaawng lift", "洗手间在电梯左边。", "ข้างขวา", "khaang khwaa", "右边", "antonym", "ซ้าย 是左边。", "左边"],
  ["khaang-khwaa", "ข้างขวา", "khaang khwaa", "右边", "名词", "上下左右", 43, "ร้านหนังสืออยู่ข้างขวาของโรงเรียน", "raan nang-sue yuu khaang khwaa khaawng roong-riian", "书店在学校右边。", "ข้างซ้าย", "khaang saai", "左边", "antonym", "ขวา 是右边。", "右边"],
  ["khwaa-mue", "ขวามือ", "khwaa mue", "右手边", "名词", "上下左右", 44, "เดินตรงไปแล้วร้านกาแฟจะอยู่ขวามือ", "doen dtrong bpai laaeo raan gaa-faae ja yuu khwaa mue", "一直走，咖啡店会在右手边。", "ซ้ายมือ", "saai mue", "左手边", "antonym", "问路时ขวามือ比ข้างขวา更口语自然。", "右手边"],
  ["saai-mue", "ซ้ายมือ", "saai mue", "左手边", "名词", "上下左右", 45, "พอถึงธนาคาร ร้านขายยาจะอยู่ซ้ายมือ", "phaaw theung tha-naa-khaan raan khaai yaa ja yuu saai mue", "一到银行，药店就在左手边。", "ขวามือ", "khwaa mue", "右手边", "antonym", "ซ้ายมือ 是从行走方向看的左手边。", "左手边"],
  ["naa", "หน้า", "naa", "前面；脸；页", "名词", "方向", 46, "รถจอดอยู่หน้าโรงพยาบาล ไม่ได้อยู่หลังตึก", "rot jaawt yuu naa roong-pha-yaa-baan mai dai yuu lang dteuk", "车停在医院前面，不在楼后。", "หลัง", "lang", "后面", "antonym", "หน้า 在地点中表示前面。", "前面"],
  ["lang", "หลัง", "lang", "后面；后方", "名词", "方向", 47, "สวนเล็ก ๆ อยู่หลังโรงเรียน", "suan lek lek yuu lang roong-riian", "小花园在学校后面。", "หน้า", "naa", "前面", "antonym", "หลัง 表示后面，也可作量词用于房屋。", "后面"],
  ["bon", "บน", "bon", "在上面；上方", "名词", "上下左右", 48, "หนังสืออยู่บนโต๊ะใกล้หน้าต่าง", "nang-sue yuu bon dto glai naa-dtaang", "书在靠窗的桌子上。", "ใต้", "dtai", "在下面", "antonym", "บน 是上面；ใต้ 是下面。", "上面"],
  ["dtai", "ใต้", "dtai", "在下面；下方", "名词", "上下左右", 49, "รองเท้าอยู่ใต้เก้าอี้หน้าห้อง", "raawng-thaao yuu dtai gao-ii naa haawng", "鞋在房间前面的椅子下面。", "บน", "bon", "在上面", "antonym", "ใต้ 表示物体下方。", "下面"],
  ["nai", "ใน", "nai", "在里面；内", "名词", "进出", 50, "นักเรียนอยู่ในห้องเรียนตอนฝนตก", "nak-riian yuu nai haawng-riian dtaawn fon dtok", "下雨时学生们在教室里。", "นอก", "naawk", "外面", "antonym", "ใน 是里面；นอก 是外面。", "里面"],
  ["naawk", "นอก", "naawk", "外面；外部", "名词", "进出", 51, "เด็ก ๆ เล่นนอกบ้านหลังทำการบ้านเสร็จ", "dek dek len naawk baan lang tham gaan-baan set", "孩子们做完作业后在屋外玩。", "ใน", "nai", "里面", "antonym", "นอกบ้าน 是家外面。", "外面"],
  ["glaang", "กลาง", "glaang", "中间；中央", "名词", "方向", 52, "อย่ายืนกลางถนน เพราะอันตรายมาก", "yaa yuen glaang tha-non phraw an-dta-raai maak", "不要站在路中间，因为很危险。", "ข้าง", "khaang", "旁边", "confusable", "กลาง 是中间；ข้าง 是旁边。", "中间"],
  ["rim", "ริม", "rim", "边上；沿着", "名词", "方向", 53, "ร้านก๋วยเตี๋ยวอยู่ริมถนนหน้าโรงเรียน", "raan guai-dtiaao yuu rim tha-non naa roong-riian", "面馆在学校前面路边。", "กลาง", "glaang", "中间", "antonym", "ริม 表边缘或旁边，和中央相对。", "边上"],
  ["dtrong-khaam", "ตรงข้าม", "dtrong khaam", "对面", "名词", "方向", 54, "ธนาคารอยู่ตรงข้ามตลาดสด", "tha-naa-khaan yuu dtrong khaam dta-laat sot", "银行在生鲜市场对面。", "ข้าง", "khaang", "旁边", "confusable", "ตรงข้าม 是隔着路或空间相对；ข้าง 是旁边。", "对面"],
  ["rawang", "ระหว่าง", "ra-waang", "在……之间", "名词", "方向", 55, "ร้านขายยาอยู่ระหว่างธนาคารกับร้านกาแฟ", "raan khaai yaa yuu ra-waang tha-naa-khaan gap raan gaa-faae", "药店在银行和咖啡店之间。", "ข้าง", "khaang", "旁边", "usage", "ระหว่าง 常和 A กับ B 连用，表示两者之间。", "之间"],
  ["glai-gap", "ใกล้กับ", "glai gap", "靠近；接近", "短语", "远近", 56, "บ้านใหม่ของเราใกล้กับสถานีรถไฟ", "baan mai khaawng rao glai gap sa-thaa-nii rot-fai", "我们的新家靠近火车站。", "ไกลจาก", "glai jaak", "远离", "antonym", "ใกล้กับ 表靠近；ไกลจาก 表远离。", "靠近"],
  ["glai-jaak", "ไกลจาก", "glai jaak", "离……远", "短语", "远近", 57, "โรงเรียนนี้ไกลจากบ้านฉันประมาณสามกิโลเมตร", "roong-riian nii glai jaak baan chan bpra-maan saam gi-loo-met", "这所学校离我家大约三公里远。", "ใกล้กับ", "glai gap", "靠近", "antonym", "จาก 后面接出发点或参照地点。", "离远"],
  ["theung", "ถึง", "theung", "到；到达", "动词", "问路", 58, "ถ้าเดินเร็ว เราจะถึงตลาดก่อนเที่ยง", "thaa doen reo rao ja theung dta-laat gaawn thiiang", "如果走得快，我们会在中午前到市场。", "ออกจาก", "aawk jaak", "离开", "antonym", "ถึง 表到达；ออกจาก 表离开某地。", "到达"],
  ["aawk-jaak", "ออกจาก", "aawk jaak", "从……出来；离开", "短语", "进出", 59, "เขาออกจากบ้านตอนเจ็ดโมงเช้า", "khao aawk jaak baan dtaawn jet moong chaao", "他早上七点离开家。", "เข้าบ้าน", "khao baan", "进家", "antonym", "ออกจาก 后接离开的地点。", "离开"],
  ["khao-baan", "เข้าบ้าน", "khao baan", "进家；回到屋里", "短语", "进出", 60, "ฝนเริ่มตก เด็ก ๆ จึงรีบเข้าบ้าน", "fon roem dtok dek dek jeung riip khao baan", "开始下雨了，孩子们赶快进屋。", "ออกจากบ้าน", "aawk jaak baan", "出门；离家", "antonym", "เข้าบ้าน 表从外面进入家里。", "进家"],
  ["khaam-tha-non", "ข้ามถนน", "khaam tha-non", "过马路", "动词", "问路", 61, "ข้ามถนนตรงไฟเขียวแล้วเดินไปทางซ้าย", "khaam tha-non dtrong fai khiaao laaeo doen bpai thaang saai", "在绿灯处过马路，然后往左走。", "เดินตามถนน", "doen dtaam tha-non", "沿路走", "confusable", "ข้ามถนน 是横过马路，不是沿路走。", "过马路"],
  ["fai-daaeng", "ไฟแดง", "fai daaeng", "红绿灯；红灯", "名词", "问路", 62, "ถึงไฟแดงแล้วรอข้ามถนนอย่างปลอดภัย", "theung fai daaeng laaeo raaw khaam tha-non yaang bplaawt-phai", "到红绿灯处后，安全地等着过马路。", "ป้ายรถเมล์", "bpaai rot-mee", "公交站牌", "confusable", "ไฟแดง 是交通灯；ป้ายรถเมล์ 是公交站牌。", "红绿灯"],
  ["sii-yaaek", "สี่แยก", "sii yaaek", "十字路口", "名词", "问路", 63, "ร้านอยู่ใกล้สี่แยกใหญ่หน้าโรงพยาบาล", "raan yuu glai sii-yaaek yai naa roong-pha-yaa-baan", "店在医院前面大十字路口附近。", "สามแยก", "saam yaaek", "三岔路口", "confusable", "สี่แยก 有四个方向；สามแยก 有三个方向。", "十字路口"],
  ["saam-yaaek", "สามแยก", "saam yaaek", "三岔路口", "名词", "问路", 64, "จากสามแยกให้เลี้ยวขวาไปทางตลาด", "jaak saam-yaaek hai liaao khwaa bpai thaang dta-laat", "从三岔路口右转往市场方向。", "สี่แยก", "sii yaaek", "十字路口", "confusable", "สามแยก 和สี่แยก 是不同形状的路口。", "三岔路"],
  ["bpaai", "ป้าย", "bpaai", "牌子；标志", "名词", "问路", 65, "ดูป้ายหน้าร้านก่อนเข้าไปถามราคา", "duu bpaai naa raan gaawn khao bpai thaam raa-khaa", "进去问价前先看店门口的牌子。", "ป้ายรถเมล์", "bpaai rot-mee", "公交站牌", "usage", "ป้าย 是泛称牌子；ป้ายรถเมล์ 是公交站牌。", "标志"],
  ["bpaai-rot-mee", "ป้ายรถเมล์", "bpaai rot-mee", "公交站牌；公交站", "名词", "问路", 66, "ป้ายรถเมล์อยู่หน้าตลาด ไม่ไกลจากบ้าน", "bpaai rot-mee yuu naa dta-laat mai glai jaak baan", "公交站在市场前面，离家不远。", "สถานี", "sa-thaa-nii", "车站；站", "confusable", "ป้ายรถเมล์ 通常较小；สถานี 可指较大的站。", "公交站"],
  ["sa-thaa-nii", "สถานี", "sa-thaa-nii", "车站；站", "名词", "问路", 67, "สถานีรถไฟอยู่ใกล้แม่น้ำ", "sa-thaa-nii rot-fai yuu glai maae-naam", "火车站在河附近。", "ป้าย", "bpaai", "牌子；站牌", "confusable", "สถานี 是站点或车站，不只是牌子。", "车站"],
  ["suan-saa-thaa-ra-na", "สวนสาธารณะ", "suan saa-thaa-ra-na", "公园", "名词", "家附近", 68, "ตอนเย็นคนในชุมชนไปเดินเล่นที่สวนสาธารณะ", "dtaawn yen khon nai chum-chon bpai doen len thii suan saa-thaa-ra-na", "傍晚社区里的人去公园散步。", "สนาม", "sa-naam", "场地；操场", "confusable", "สวนสาธารณะ 是公共公园；สนาม 是场地。", "公园"],
  ["than-aa-khaan", "ธนาคาร", "tha-naa-khaan", "银行", "名词", "商店", 69, "ธนาคารอยู่ระหว่างร้านอาหารกับร้านกาแฟ", "tha-naa-khaan yuu ra-waang raan aa-haan gap raan gaa-faae", "银行在餐馆和咖啡店之间。", "ตู้เอทีเอ็ม", "dtuu ee-thii-em", "自动取款机", "confusable", "ธนาคาร 是银行机构；ตู้เอทีเอ็ม 是取款机。", "银行"],
  ["dtuu-ee-thii-em", "ตู้เอทีเอ็ม", "dtuu ee-thii-em", "自动取款机", "名词", "商店", 70, "ตู้เอทีเอ็มอยู่ข้างประตูห้าง", "dtuu ee-thii-em yuu khaang bpra-dtuu haang", "自动取款机在商场门旁边。", "ธนาคาร", "tha-naa-khaan", "银行", "confusable", "取现金可用ตู้เอทีเอ็ม，不一定进银行。", "取款机"],
  ["haang", "ห้าง", "haang", "商场；百货商场", "名词", "商店", 71, "วันอาทิตย์คนเยอะมากที่ห้างใกล้บ้าน", "wan aa-thit khon yuh maak thii haang glai baan", "星期天家附近的商场人很多。", "ตลาด", "dta-laat", "市场", "confusable", "ห้าง 通常是室内商场；ตลาด 常是市场。", "商场"],
  ["sa-thaan-thii", "สถานที่", "sa-thaan-thii", "地点；场所", "名词", "地点", 72, "สถานที่นี้เหมาะสำหรับเด็กและครอบครัว", "sa-thaan-thii nii maw sam-rap dek lae khraawp-khrua", "这个地点适合孩子和家庭。", "ที่อยู่", "thii yuu", "地址；住处", "confusable", "สถานที่ 是场所；ที่อยู่ 是地址。", "场所"],
  ["thii-yuu", "ที่อยู่", "thii yuu", "地址；住址", "名词", "地点", 73, "กรุณาเขียนที่อยู่ให้ชัดเจนบนกล่อง", "ga-ru-naa khiian thii yuu hai chat-jen bon glaawng", "请把地址清楚地写在盒子上。", "สถานที่", "sa-thaan-thii", "地点", "confusable", "ที่อยู่ 是可联系或投递的地址。", "地址"],
  ["laaeo", "แล้ว", "laaeo", "然后；已经", "副词", "问路", 74, "เดินตรงไปแล้วเลี้ยวซ้ายที่สี่แยก", "doen dtrong bpai laaeo liaao saai thii sii-yaaek", "直走，然后在十字路口左转。", "ก่อน", "gaawn", "先；以前", "antonym", "问路中 แล้ว 常连接下一步。", "然后"],
  ["gaawn", "ก่อน", "gaawn", "先；以前；在……之前", "副词", "问路", 75, "ก่อนถึงตลาดจะเห็นร้านขายยาทางขวา", "gaawn theung dta-laat ja hen raan khaai yaa thaang khwaa", "到市场之前会看到右边的药店。", "หลัง", "lang", "之后；后面", "antonym", "ก่อน 表之前；หลัง 表之后或后面。", "之前"],
  ["lang-jaak", "หลังจาก", "lang jaak", "在……之后", "短语", "问路", 76, "หลังจากข้ามถนน ให้เดินตรงไปอีกสองนาที", "lang jaak khaam tha-non hai doen dtrong bpai iik saawng naa-thii", "过马路之后，请再直走两分钟。", "ก่อน", "gaawn", "之前", "antonym", "หลังจาก 后接动作，表示之后。", "之后"],
  ["thaang", "ทาง", "thaang", "路；方向；方面", "名词", "方向", 77, "ทางไปโรงเรียนนี้สั้นกว่าอีกทางหนึ่ง", "thaang bpai roong-riian nii san gwaa iik thaang neung", "去学校的这条路比另一条路短。", "ถนน", "tha-non", "道路；街道", "confusable", "ทาง 可指路线或方向；ถนน 更像具体道路。", "路"],
  ["thaang-nai", "ทางไหน", "thaang nai", "哪条路；哪个方向", "短语", "问路", 78, "ไปโรงพยาบาลต้องไปทางไหนครับ", "bpai roong-pha-yaa-baan dtawng bpai thaang nai khrap", "去医院要走哪条路？", "ที่ไหน", "thii nai", "哪里", "confusable", "ทางไหน 问路线方向；ที่ไหน 问地点在哪里。", "哪条路"],
  ["thaang-nii", "ทางนี้", "thaang nii", "这边；这条路", "短语", "方向", 79, "ทางนี้ไปตลาดได้เร็วกว่า", "thaang nii bpai dta-laat dai reo gwaa", "走这边去市场更快。", "ทางนั้น", "thaang nan", "那边；那条路", "antonym", "ทางนี้ 指靠近说话人的方向或路线。", "这边"],
  ["thaang-nan", "ทางนั้น", "thaang nan", "那边；那条路", "短语", "方向", 80, "อย่าไปทางนั้น ตอนเย็นรถเยอะมาก", "yaa bpai thaang nan dtaawn yen rot yuh maak", "不要走那边，傍晚车很多。", "ทางนี้", "thaang nii", "这边", "antonym", "ทางนั้น 指较远或被指向的路线。", "那边"],
  ["thaang-saai", "ทางซ้าย", "thaang saai", "往左；左边方向", "短语", "方向", 81, "โรงอาหารอยู่ทางซ้ายของสนาม", "roong-aa-haan yuu thaang saai khaawng sa-naam", "食堂在操场左边方向。", "ทางขวา", "thaang khwaa", "往右", "antonym", "ทางซ้าย 是左侧方向。", "往左"],
  ["thaang-khwaa", "ทางขวา", "thaang khwaa", "往右；右边方向", "短语", "方向", 82, "ห้องสมุดอยู่ทางขวาหลังจากขึ้นบันได", "haawng-sa-mut yuu thaang khwaa lang jaak kheun ban-dai", "上楼梯后，图书馆在右边方向。", "ทางซ้าย", "thaang saai", "往左", "antonym", "ทางขวา 是右侧方向。", "往右"],
  ["khaang-naa", "ข้างหน้า", "khaang naa", "前方；前面", "名词", "方向", 83, "ข้างหน้ามีทางม้าลาย ให้เดินช้า ๆ", "khaang naa mii thaang maa-laai hai doen chaa chaa", "前方有人行横道，请慢慢走。", "ข้างหลัง", "khaang lang", "后方", "antonym", "ข้างหน้า 是前方；ข้างหลัง 是后方。", "前方"],
  ["khaang-lang", "ข้างหลัง", "khaang lang", "后方；后面", "名词", "方向", 84, "เขายืนอยู่ข้างหลังครูในรูปถ่าย", "khao yuen yuu khaang lang khruu nai ruup-thaai", "照片里他站在老师后面。", "ข้างหน้า", "khaang naa", "前方", "antonym", "ข้างหลัง 表示后面位置。", "后方"],
  ["chan-neung", "ชั้นหนึ่ง", "chan neung", "一楼；第一层", "名词", "上下左右", 85, "ร้านหนังสืออยู่ชั้นหนึ่งใกล้ประตูหน้า", "raan nang-sue yuu chan neung glai bpra-dtuu naa", "书店在一楼，靠近正门。", "ชั้นสอง", "chan saawng", "二楼", "confusable", "ชั้นหนึ่ง 是楼层第一层。", "一楼"],
  ["chan-saawng", "ชั้นสอง", "chan saawng", "二楼；第二层", "名词", "上下左右", 86, "ห้องเรียนภาษาไทยอยู่ชั้นสองของอาคารนี้", "haawng-riian phaa-saa thai yuu chan saawng khaawng aa-khaan nii", "泰语教室在这栋楼二楼。", "ชั้นหนึ่ง", "chan neung", "一楼", "confusable", "ชั้นสอง 比ชั้นหนึ่ง 高一层。", "二楼"],
  ["ban-dai", "บันได", "ban-dai", "楼梯", "名词", "上下左右", 87, "ขึ้นบันไดไปชั้นสองแล้วเลี้ยวขวา", "kheun ban-dai bpai chan saawng laaeo liaao khwaa", "上楼梯到二楼，然后右转。", "ลิฟต์", "lift", "电梯", "confusable", "บันได 要走；ลิฟต์ 是电梯。", "楼梯"],
  ["lift", "ลิฟต์", "lift", "电梯", "名词", "上下左右", 88, "ลิฟต์อยู่ข้างห้องน้ำชั้นหนึ่ง", "lift yuu khaang haawng-naam chan neung", "电梯在一楼洗手间旁边。", "บันได", "ban-dai", "楼梯", "confusable", "ลิฟต์ 是电梯，常在商场、医院、大楼中用。", "电梯"],
  ["haawng-naam", "ห้องน้ำ", "haawng naam", "洗手间；厕所", "名词", "地点", 89, "ขอโทษค่ะ ห้องน้ำอยู่ทางไหนคะ", "khaaw-thoot kha haawng-naam yuu thaang nai kha", "不好意思，请问洗手间往哪边？", "ห้องอาบน้ำ", "haawng aap naam", "浴室", "confusable", "ห้องน้ำ 在公共场合多指洗手间。", "洗手间"],
  ["haawng-phak", "ห้องพัก", "haawng phak", "房间；休息房；住宿房间", "名词", "地点", 90, "ห้องพักของเราอยู่ชั้นสามและมองเห็นสวน", "haawng phak khaawng rao yuu chan saam lae maawng hen suan", "我们的房间在三楼，看得到花园。", "ห้องเรียน", "haawng riian", "教室", "confusable", "ห้องพัก 用于住宿或休息；ห้องเรียน 用于上课。", "房间"],
  ["aa-khaan", "อาคาร", "aa-khaan", "建筑物；楼", "名词", "地点", 91, "อาคารสีขาวข้างตลาดคือโรงพยาบาล", "aa-khaan sii khaao khaang dta-laat khue roong-pha-yaa-baan", "市场旁边的白色建筑就是医院。", "ห้อง", "haawng", "房间", "confusable", "อาคาร 是整栋建筑；ห้อง 是里面的房间。", "建筑"],
  ["dteuk", "ตึก", "dteuk", "楼；楼房", "名词", "地点", 92, "ตึกนี้มีร้านกาแฟอยู่ชั้นล่าง", "dteuk nii mii raan gaa-faae yuu chan laang", "这栋楼的底层有咖啡店。", "อาคาร", "aa-khaan", "建筑物", "near-synonym", "ตึก 更口语；อาคาร 更正式一些。", "楼"],
  ["chan-laang", "ชั้นล่าง", "chan laang", "楼下；底层", "名词", "上下左右", 93, "พี่รอฉันที่ชั้นล่างใกล้ประตู", "phii raaw chan thii chan laang glai bpra-dtuu", "哥哥在楼下靠近门的地方等我。", "ชั้นบน", "chan bon", "楼上", "antonym", "ชั้นล่าง 是较低楼层；ชั้นบน 是楼上。", "楼下"],
  ["chan-bon", "ชั้นบน", "chan bon", "楼上；上层", "名词", "上下左右", 94, "ห้องสมุดอยู่ชั้นบน ต้องขึ้นบันได", "haawng-sa-mut yuu chan bon dtawng kheun ban-dai", "图书馆在楼上，要上楼梯。", "ชั้นล่าง", "chan laang", "楼下", "antonym", "ชั้นบน 指上面的楼层。", "楼上"],
  ["khaang-nai", "ข้างใน", "khaang nai", "里面；内部", "名词", "进出", 95, "ข้างในร้านมีที่นั่งไม่มาก", "khaang nai raan mii thii-nang mai maak", "店里面座位不多。", "ข้างนอก", "khaang naawk", "外面", "antonym", "ข้างใน 是内部；ข้างนอก 是外部。", "里面"],
  ["khaang-naawk", "ข้างนอก", "khaang naawk", "外面；外部", "名词", "进出", 96, "ข้างนอกฝนตกหนัก เรารอในร้านก่อน", "khaang naawk fon dtok nak rao raaw nai raan gaawn", "外面雨下得很大，我们先在店里等。", "ข้างใน", "khaang nai", "里面", "antonym", "ข้างนอก 常用于建筑或房间外面。", "外面"],
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
    sourceRefs: PLACE_DIRECTION_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_PLACES_DIRECTIONS_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
