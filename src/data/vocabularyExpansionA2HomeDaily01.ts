export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";

export type VocabularyExpansionTheme =
  | "居住"
  | "房间空间"
  | "家具家电"
  | "清洁家务"
  | "维修问题"
  | "水电设施";

export type VocabularyExpansionExample = {
  thai: string;
  roman: string;
  chinese: string;
};

export type VocabularyExpansionRelatedWord = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

export type VocabularyExpansionComparison = {
  kind: "近义" | "反义" | "易混" | "用法";
  target: VocabularyExpansionRelatedWord;
  distinctionZh: string;
};

export type VocabularyExpansionCollocation = {
  thai: string;
  roman?: string;
  chinese: string;
  notesZh?: string;
};

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

type RelationKind = "近义" | "反义" | "易混" | "用法";

type Row = readonly [
  thai: string,
  id: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionPartOfSpeech,
  theme: VocabularyExpansionTheme,
  priority: number,
  exampleThai: string,
  exampleRoman: string,
  exampleChinese: string,
  collocationThai: string,
  collocationRoman: string,
  collocationChinese: string,
  relatedThai: string,
  relatedRoman: string,
  relatedChinese: string,
  relationKind: RelationKind,
  usageNoteZh: string,
  tag: string,
];

const HOME_REFS = ["thai-frequency", "wiktionary-thai-frequency", "thai-home-daily-candidate"];

const rows = [
  ["คอนโด", "khaawn-doo", "khaawn-doo", "公寓楼里的产权公寓；泰国常说的 condo", "名词", "居住", 1, "คอนโดของฉันอยู่ใกล้รถไฟฟ้า จึงเดินทางไปทำงานสะดวกมาก", "khaawn-doo khaawng chan yuu glai rot-fai-faa, jeung doen-thaang bpai tham-ngaan sa-duak maak", "我的公寓离轻轨很近，所以去上班很方便。", "เช่าคอนโด", "chao khaawn-doo", "租公寓", "อพาร์ตเมนต์", "a-phaat-dta-men", "公寓；出租公寓楼", "易混", "คอนโด 常指带公共设施的产权公寓；租住时也可说 เช่าคอนโด。", "housing"],
  ["อพาร์ตเมนต์", "a-phaat-dta-men", "a-phaat-dta-men", "公寓；出租公寓楼", "名词", "居住", 2, "อพาร์ตเมนต์นี้ไม่มีครัวใหญ่ แต่มีร้านอาหารหลายร้านอยู่ข้างล่าง", "a-phaat-dta-men nii mai mii khrua yai, dtaae mii raan aa-haan laai raan yuu khaang laang", "这栋公寓没有大厨房，但楼下有很多餐馆。", "อยู่ในอพาร์ตเมนต์", "yuu nai a-phaat-dta-men", "住在公寓里", "คอนโด", "khaawn-doo", "产权公寓；condo", "易混", "อพาร์ตเมนต์ 更常用于出租公寓楼，口语里外来词发音可能略有差异。", "housing"],
  ["บ้านเช่า", "baan-chao", "baan-chao", "出租房；租来的房子", "名词", "居住", 3, "บ้านเช่าหลังนี้มีสนามเล็ก ๆ เด็กจึงเล่นหน้าบ้านได้", "baan-chao lang nii mii sa-naam lek lek, dek jeung len naa baan dai", "这套出租房有一个小院子，所以孩子可以在屋前玩。", "หาบ้านเช่า", "haa baan-chao", "找出租房", "ห้องเช่า", "haawng-chao", "出租房间", "易混", "บ้านเช่า 通常是一整套房子；ห้องเช่า 多指一个房间或小套间。", "housing"],
  ["ห้องเช่า", "haawng-chao", "haawng-chao", "出租房间；租来的单间", "名词", "居住", 4, "เขาย้ายเข้าห้องเช่าใหม่เมื่อวาน เพราะที่ทำงานอยู่ไกลจากบ้านเดิม", "khao yaai khao haawng-chao mai muea-waan, phraw thii tham-ngaan yuu glai jaak baan doem", "他昨天搬进新的出租房间，因为工作地点离原来的家很远。", "ย้ายเข้าห้องเช่า", "yaai khao haawng-chao", "搬进出租房间", "บ้านเช่า", "baan-chao", "出租房", "易混", "ห้องเช่า 的范围比 บ้านเช่า 小，常见于学生或刚工作的人租住。", "housing"],
  ["เจ้าของบ้าน", "jao-khaawng-baan", "jao-khaawng-baan", "房东；屋主", "名词", "居住", 5, "ถ้าก๊อกน้ำเสีย ฉันจะโทรหาเจ้าของบ้านก่อนเรียกช่าง", "thaa gaawk-naam sia, chan ja tho haa jao-khaawng-baan gaawn riiak chang", "如果水龙头坏了，我会先打电话给房东，再叫维修师傅。", "โทรหาเจ้าของบ้าน", "tho haa jao-khaawng-baan", "打电话给房东", "ผู้เช่า", "phuu-chao", "租客", "反义", "เจ้าของบ้าน 是拥有或管理房子的人；与租客 ผู้เช่า 相对。", "housing"],
  ["ผู้เช่า", "phuu-chao", "phuu-chao", "租客；承租人", "名词", "居住", 6, "ผู้เช่าต้องจ่ายค่าเช่าตรงเวลาและดูแลห้องให้สะอาด", "phuu-chao dtawng jaai khaa-chao dtrong wee-laa lae duu-laae haawng hai sa-aat", "租客需要按时付房租，并把房间照顾得干净。", "ผู้เช่ารายใหม่", "phuu-chao raai mai", "新租客", "เจ้าของบ้าน", "jao-khaawng-baan", "房东；屋主", "反义", "正式语境可说 ผู้เช่า，日常对话也会直接说 คนเช่า。", "housing"],
  ["ค่าเช่า", "khaa-chao", "khaa-chao", "房租；租金", "名词", "居住", 7, "เดือนนี้ค่าเช่าเพิ่มขึ้นเล็กน้อย แต่ยังรวมค่าน้ำไว้แล้ว", "duean nii khaa-chao phoem kheun lek naawy, dtaae yang ruaam khaa-naam wai laaeo", "这个月房租稍微涨了一点，但已经包含水费。", "จ่ายค่าเช่า", "jaai khaa-chao", "付房租", "ค่าน้ำค่าไฟ", "khaa-naam khaa-fai", "水电费", "用法", "ค่าเช่า 是租金；水费电费常另说 ค่าน้ำค่าไฟ。", "housing"],
  ["สัญญาเช่า", "san-yaa-chao", "san-yaa-chao", "租赁合同", "名词", "居住", 8, "ก่อนเซ็นสัญญาเช่า เราควรอ่านเรื่องเงินมัดจำให้ชัดเจน", "gaawn sen san-yaa-chao, rao khuan aan rueang ngoen-mat-jam hai chat-jen", "签租赁合同前，我们应该把押金条款读清楚。", "เซ็นสัญญาเช่า", "sen san-yaa-chao", "签租赁合同", "เงินมัดจำ", "ngoen-mat-jam", "押金", "用法", "สัญญาเช่า 是文件或约定；里面常写ค่าเช่า、เงินมัดจำ、วันย้ายออก。", "housing"],
  ["เงินมัดจำ", "ngoen-mat-jam", "ngoen-mat-jam", "押金；定金", "名词", "居住", 9, "ตอนย้ายออก เจ้าของบ้านคืนเงินมัดจำหลังจากตรวจห้องแล้ว", "dtaawn yaai aawk, jao-khaawng-baan kheun ngoen-mat-jam lang jaak dtruat haawng laaeo", "搬走时，房东检查房间后退还了押金。", "คืนเงินมัดจำ", "kheun ngoen-mat-jam", "退押金", "ค่าเช่า", "khaa-chao", "房租", "易混", "เงินมัดจำ 是保证金，通常可退；ค่าเช่า 是每月或每期的租金。", "housing"],
  ["ที่อยู่", "thii-yuu", "thii-yuu", "地址；住址", "名词", "居住", 10, "เวลาสั่งของออนไลน์ ฉันตรวจที่อยู่ให้ถูกก่อนกดจ่ายเงิน", "wee-laa sang khaawng awn-lai, chan dtruat thii-yuu hai thuuk gaawn got jaai ngoen", "网购下单时，我会先检查地址是否正确再付款。", "เขียนที่อยู่", "khian thii-yuu", "写地址", "บ้านเลขที่", "baan-leek-thii", "门牌号；房号", "用法", "ที่อยู่ 是完整地址；บ้านเลขที่ 是地址中的门牌号或房号。", "housing"],
  ["เพื่อนบ้าน", "pheuan-baan", "pheuan-baan", "邻居", "名词", "居住", 11, "เพื่อนบ้านช่วยรับพัสดุให้ฉันตอนที่ไม่มีใครอยู่บ้าน", "pheuan-baan chuai rap phat-sa-du hai chan dtaawn thii mai mii khrai yuu baan", "家里没人时，邻居帮我收了快递。", "ทักเพื่อนบ้าน", "thak pheuan-baan", "和邻居打招呼", "คนในบ้าน", "khon nai baan", "家里人", "易混", "เพื่อนบ้าน 是住在附近的人，不一定是朋友；คนในบ้าน 是同住的家人或室友。", "housing"],
  ["นิติบุคคล", "ni-dti-buk-khon", "ni-dti-buk-khon", "物业管理处；公寓法人管理方", "名词", "居住", 12, "ถ้าคีย์การ์ดหาย ต้องติดต่อสำนักงานนิติบุคคลที่ชั้นล่าง", "thaa khii-gaat haai, dtawng dtit-dtaaw sam-nak-ngaan ni-dti-buk-khon thii chan laang", "如果门禁卡丢了，需要联系楼下的物业办公室。", "ติดต่อนิติบุคคล", "dtit-dtaaw ni-dti-buk-khon", "联系物业", "เจ้าของบ้าน", "jao-khaawng-baan", "房东；屋主", "易混", "在泰国公寓语境中 นิติบุคคล 常指物业管理方，不等于个人房东。", "housing"],
  ["ลิฟต์", "lif", "lif", "电梯", "名词", "房间空间", 13, "ลิฟต์เสียตอนเช้า ทุกคนจึงต้องเดินขึ้นบันไดไปทำงาน", "lif sia dtaawn chaao, thuk khon jeung dtawng doen kheun ban-dai bpai tham-ngaan", "早上电梯坏了，所以大家都得走楼梯去上班。", "ขึ้นลิฟต์", "kheun lif", "坐电梯上去", "บันได", "ban-dai", "楼梯", "易混", "ขึ้นลิฟต์/ลงลิฟต์ 表示坐电梯上/下；走楼梯用 เดินขึ้นบันได。", "building"],
  ["บันได", "ban-dai", "ban-dai", "楼梯", "名词", "房间空间", 14, "หลังออกกำลังกาย ฉันเดินขึ้นบันไดแทนการใช้ลิฟต์", "lang aawk-gam-lang-gaai, chan doen kheun ban-dai thaaen gaan chai lif", "运动后，我走楼梯而不是坐电梯。", "เดินลงบันได", "doen long ban-dai", "走下楼梯", "ลิฟต์", "lif", "电梯", "易混", "บันได 是楼梯；若说梯子、扶梯等要看具体词，不要都用一个词代替。", "building"],
  ["ระเบียง", "ra-biiang", "ra-biiang", "阳台", "名词", "房间空间", 15, "แม่ตากผ้าไว้ที่ระเบียง เพราะวันนี้แดดดีและลมแรง", "maae dtaak phaa wai thii ra-biiang, phraw wan-nii daaet dii lae lom raaeng", "妈妈把衣服晾在阳台，因为今天阳光好、风也大。", "ระเบียงห้อง", "ra-biiang haawng", "房间阳台", "หน้าต่าง", "naa-dtaang", "窗户", "易混", "ระเบียง 是可站人的室外或半室外区域；หน้าต่าง 只是窗。", "building"],
  ["ทางเดิน", "thaang-doen", "thaang-doen", "走廊；通道", "名词", "房间空间", 16, "อย่าวางรองเท้าเต็มทางเดิน เพราะคนอื่นอาจเดินไม่สะดวก", "yaa waang raawng-thaao dtem thaang-doen, phraw khon euen aat doen mai sa-duak", "不要把鞋子摆满走廊，因为别人可能不好走。", "ทางเดินหน้าห้อง", "thaang-doen naa haawng", "房门前的走廊", "ถนน", "tha-non", "道路；马路", "易混", "ทางเดิน 多指建筑内外供人走的小通道；ถนน 是车辆也走的大路。", "building"],
  ["ชั้นบน", "chan-bon", "chan-bon", "楼上；上层", "名词", "房间空间", 17, "ห้องนอนอยู่ชั้นบน ส่วนห้องครัวและห้องนั่งเล่นอยู่ชั้นล่าง", "haawng-naawn yuu chan-bon, suan haawng-khrua lae haawng-nang-len yuu chan-laang", "卧室在楼上，厨房和客厅在楼下。", "ขึ้นไปชั้นบน", "kheun bpai chan-bon", "上到楼上", "ชั้นล่าง", "chan-laang", "楼下；下层", "反义", "ชั้นบน 与 ชั้นล่าง 相对，既可指家里上下层，也可指建筑楼层。", "building"],
  ["ชั้นล่าง", "chan-laang", "chan-laang", "楼下；下层", "名词", "房间空间", 18, "ตอนกลางคืนพ่อปิดไฟชั้นล่างก่อนขึ้นไปนอน", "dtaawn glaang-kheun phaaw bpit fai chan-laang gaawn kheun bpai naawn", "晚上爸爸上楼睡觉前先关掉楼下的灯。", "อยู่ชั้นล่าง", "yuu chan-laang", "在楼下", "ชั้นบน", "chan-bon", "楼上；上层", "反义", "ชั้นล่าง 可指一楼或下层，具体含义要看建筑和说话位置。", "building"],
  ["ห้องนั่งเล่น", "haawng-nang-len", "haawng-nang-len", "客厅；起居室", "名词", "房间空间", 19, "หลังอาหารเย็น ครอบครัวนั่งดูข่าวด้วยกันในห้องนั่งเล่น", "lang aa-haan yen, khraawp-khrua nang duu khaao duai gan nai haawng-nang-len", "晚饭后，一家人在客厅一起看新闻。", "โซฟาห้องนั่งเล่น", "soo-faa haawng-nang-len", "客厅沙发", "ห้องรับแขก", "haawng-rap-khaaek", "会客室；客厅", "近义", "ห้องนั่งเล่น 强调日常休息；ห้องรับแขก 更强调接待客人。", "room"],
  ["ห้องครัว", "haawng-khrua", "haawng-khrua", "厨房", "名词", "房间空间", 20, "หลังทำกับข้าวเสร็จ เราต้องเช็ดโต๊ะและล้างจานในห้องครัว", "lang tham gap-khaao set, rao dtawng chet dto lae laang jaan nai haawng-khrua", "做完饭后，我们要在厨房擦桌子、洗碗。", "ทำอาหารในห้องครัว", "tham aa-haan nai haawng-khrua", "在厨房做饭", "ห้องกินข้าว", "haawng-gin-khaao", "餐厅；吃饭的房间", "易混", "ห้องครัว 用来做饭；ห้องกินข้าว 用来吃饭，有些家会合在一起。", "room"],
  ["ห้องน้ำ", "haawng-naam", "haawng-naam", "卫生间；浴室", "名词", "房间空间", 21, "เด็ก ๆ ต้องล้างมือในห้องน้ำก่อนกลับมากินข้าว", "dek dek dtawng laang mue nai haawng-naam gaawn glap maa gin khaao", "孩子们回来吃饭前要先在卫生间洗手。", "ทำความสะอาดห้องน้ำ", "tham-khwaam-sa-aat haawng-naam", "打扫卫生间", "ห้องอาบน้ำ", "haawng-aap-naam", "浴室；洗澡间", "近义", "ห้องน้ำ 日常可指厕所或浴室；若强调洗澡空间可说 ห้องอาบน้ำ。", "room"],
  ["ห้องเก็บของ", "haawng-gep-khaawng", "haawng-gep-khaawng", "储物间", "名词", "房间空间", 22, "ของที่ไม่ค่อยใช้ควรเก็บไว้ในห้องเก็บของ ไม่ใช่วางเต็มบ้าน", "khaawng thii mai khaawy chai khuan gep wai nai haawng-gep-khaawng, mai chai waang dtem baan", "不常用的东西应该放在储物间，不要堆满家里。", "จัดห้องเก็บของ", "jat haawng-gep-khaawng", "整理储物间", "ห้องนอน", "haawng-naawn", "卧室", "易混", "ห้องเก็บของ 用来放杂物，不是睡觉或接待客人的主要空间。", "room"],
  ["ที่จอดรถ", "thii-jaawt-rot", "thii-jaawt-rot", "停车位；停车处", "名词", "房间空间", 23, "คอนโดนี้มีที่จอดรถไม่พอ ตอนเย็นจึงหาที่จอดยาก", "khaawn-doo nii mii thii-jaawt-rot mai phaaw, dtaawn yen jeung haa thii-jaawt yaak", "这栋公寓停车位不够，所以傍晚很难找车位。", "จองที่จอดรถ", "jaawng thii-jaawt-rot", "预约停车位", "โรงรถ", "roong-rot", "车库", "易混", "ที่จอดรถ 是停车位或地点；โรงรถ 是有遮挡或独立空间的车库。", "building"],
  ["โซฟา", "soo-faa", "soo-faa", "沙发", "名词", "家具家电", 24, "ฉันวางหมอนเล็ก ๆ บนโซฟา เพื่อให้นั่งอ่านหนังสือสบายขึ้น", "chan waang maawn lek lek bon soo-faa, phuea hai nang aan nang-sue sa-baai kheun", "我把小靠枕放在沙发上，这样坐着看书更舒服。", "นั่งบนโซฟา", "nang bon soo-faa", "坐在沙发上", "เก้าอี้", "gao-ii", "椅子", "易混", "โซฟา 通常较大，可多人坐或半躺；เก้าอี้ 多是一人一把的椅子。", "furniture"],
  ["ชั้นวางของ", "chan-waang-khaawng", "chan-waang-khaawng", "置物架；架子", "名词", "家具家电", 25, "พี่ชายซื้อชั้นวางของใหม่มาเก็บหนังสือและกล่องเล็ก ๆ", "phii-chaai sue chan-waang-khaawng mai maa gep nang-sue lae glaawng lek lek", "哥哥买了新的置物架来放书和小盒子。", "จัดชั้นวางของ", "jat chan-waang-khaawng", "整理置物架", "ตู้", "dtuu", "柜子", "易混", "ชั้นวางของ 多是开放式架子；ตู้ 通常有柜门或封闭空间。", "furniture"],
  ["ตู้เสื้อผ้า", "dtuu-suea-phaa", "dtuu-suea-phaa", "衣柜", "名词", "家具家电", 26, "ก่อนฤดูฝน เราควรเปิดตู้เสื้อผ้าให้อากาศเข้าและกันกลิ่นอับ", "gaawn rue-duu fon, rao khuan bpoet dtuu-suea-phaa hai aa-gaat khao lae gan glin ap", "雨季前，我们应该打开衣柜通风，避免霉闷味。", "เก็บเสื้อผ้าในตู้เสื้อผ้า", "gep suea-phaa nai dtuu-suea-phaa", "把衣服收进衣柜", "ลิ้นชัก", "lin-chak", "抽屉", "易混", "ตู้เสื้อผ้า 是放衣服的大柜；ลิ้นชัก 是可拉出的抽屉。", "furniture"],
  ["ตู้เย็น", "dtuu-yen", "dtuu-yen", "冰箱", "名词", "家具家电", 27, "อย่าลืมปิดประตูตู้เย็นให้สนิท ไม่อย่างนั้นอาหารจะเสียเร็ว", "yaa leum bpit bpra-dtuu dtuu-yen hai sa-nit, mai yaang nan aa-haan ja sia reo", "别忘了把冰箱门关严，不然食物会很快变坏。", "แช่อาหารในตู้เย็น", "chaae aa-haan nai dtuu-yen", "把食物冷藏在冰箱里", "ช่องแช่แข็ง", "chaawng-chaae-khaeng", "冷冻室", "用法", "ตู้เย็น 是整台冰箱；冷冻格可说 ช่องแช่แข็ง。", "appliance"],
  ["ไมโครเวฟ", "mai-khroo-weep", "mai-khroo-weep", "微波炉", "名词", "家具家电", 28, "ฉันอุ่นข้าวกล่องในไมโครเวฟสองนาที แล้วค่อยกินตอนพักเที่ยง", "chan un khaao-glaawng nai mai-khroo-weep saawng naa-thii, laaeo khaawy gin dtaawn phak-thiiang", "我把盒饭放进微波炉热两分钟，然后午休时再吃。", "อุ่นอาหารด้วยไมโครเวฟ", "un aa-haan duai mai-khroo-weep", "用微波炉热饭", "เตาอบ", "dtao-op", "烤箱", "易混", "ไมโครเวฟ 常用于快速加热；เตาอบ 更常用于烘烤。", "appliance"],
  ["เครื่องซักผ้า", "khreuuang-sak-phaa", "khreuuang-sak-phaa", "洗衣机", "名词", "家具家电", 29, "เครื่องซักผ้าทำงานเสียงดังมาก ฉันจึงหยุดเครื่องและดูว่าผ้าอยู่ข้างในมากไปไหม", "khreuuang-sak-phaa tham-ngaan siiang dang maak, chan jeung yut khreuuang lae duu waa phaa yuu khaang-nai maak bpai mai", "洗衣机运转声音很大，所以我停下来看看里面衣服是不是太多。", "ใช้เครื่องซักผ้า", "chai khreuuang-sak-phaa", "使用洗衣机", "น้ำยาซักผ้า", "nam-yaa-sak-phaa", "洗衣液", "用法", "เครื่องซักผ้า 是机器；น้ำยาซักผ้า 是洗衣用的清洁剂。", "appliance"],
  ["เครื่องปรับอากาศ", "khreuuang-bprap-aa-gaat", "khreuuang-bprap-aa-gaat", "空调；正式说法", "名词", "家具家电", 30, "ห้องนี้เปิดเครื่องปรับอากาศทั้งวัน ค่าไฟจึงสูงกว่าปกติ", "haawng nii bpoet khreuuang-bprap-aa-gaat thang wan, khaa-fai jeung suung gwaa bpa-ga-dti", "这个房间整天开空调，所以电费比平时高。", "ล้างเครื่องปรับอากาศ", "laang khreuuang-bprap-aa-gaat", "清洗空调", "แอร์", "aae", "空调；口语", "近义", "เครื่องปรับอากาศ 较正式；日常口语更常说 แอร์。", "appliance"],
  ["พัดลม", "phat-lom", "phat-lom", "电风扇", "名词", "家具家电", 31, "ถ้าอากาศไม่ร้อนมาก เราเปิดพัดลมแทนแอร์เพื่อประหยัดไฟ", "thaa aa-gaat mai raawn maak, rao bpoet phat-lom thaaen aae phuea bpra-yat fai", "如果天气不是很热，我们开电风扇代替空调来省电。", "เปิดพัดลม", "bpoet phat-lom", "开电风扇", "แอร์", "aae", "空调", "易混", "พัดลม 只是送风；แอร์ 会制冷，耗电通常更多。", "appliance"],
  ["ปลั๊กไฟ", "bplak-fai", "bplak-fai", "插座；插头", "名词", "水电设施", 32, "อย่าเสียบปลั๊กไฟหลายอันในที่เดียว เพราะอาจไม่ปลอดภัย", "yaa siap bplak-fai laai an nai thii diao, phraw aat mai bplaawt-phai", "不要在同一个地方插很多插头，因为可能不安全。", "เสียบปลั๊กไฟ", "siap bplak-fai", "插上插头", "สวิตช์ไฟ", "sa-wit-fai", "电灯开关", "易混", "ปลั๊กไฟ 与插电有关；สวิตช์ไฟ 是开关，不一定能插电。", "electric"],
  ["สายไฟ", "saai-fai", "saai-fai", "电线；电源线", "名词", "水电设施", 33, "สายไฟหลังตู้ดูเก่าแล้ว เราจึงไม่ควรจับตอนมือเปียก", "saai-fai lang dtuu duu gao laaeo, rao jeung mai khuan jap dtaawn mue bpiiak", "柜子后面的电线看起来旧了，所以手湿的时候不应该碰。", "เก็บสายไฟ", "gep saai-fai", "收电线", "ปลั๊กไฟ", "bplak-fai", "插座；插头", "易混", "สายไฟ 是线；ปลั๊กไฟ 是插头或插座，中文学习者要看搭配。", "electric"],
  ["หลอดไฟ", "laawt-fai", "laawt-fai", "灯泡；灯管", "名词", "水电设施", 34, "หลอดไฟในห้องน้ำกะพริบหลายครั้ง พ่อจึงซื้อหลอดใหม่มาเปลี่ยน", "laawt-fai nai haawng-naam ga-phrit laai khrang, phaaw jeung sue laawt mai maa bplian", "卫生间的灯泡闪了好几次，所以爸爸买了新的来换。", "เปลี่ยนหลอดไฟ", "bplian laawt-fai", "换灯泡", "โคมไฟ", "khoom-fai", "灯具；台灯", "易混", "หลอดไฟ 是发光的灯泡/灯管；โคมไฟ 是灯具本身。", "electric"],
  ["สวิตช์ไฟ", "sa-wit-fai", "sa-wit-fai", "电灯开关", "名词", "水电设施", 35, "ก่อนออกจากห้อง กรุณาปิดสวิตช์ไฟทุกครั้งเพื่อประหยัดไฟ", "gaawn aawk jaak haawng, ga-ru-naa bpit sa-wit-fai thuk khrang phuea bpra-yat fai", "离开房间前请每次都关灯开关，以便省电。", "กดสวิตช์ไฟ", "got sa-wit-fai", "按电灯开关", "ปลั๊กไฟ", "bplak-fai", "插座；插头", "易混", "กดสวิตช์ไฟ 是按开关；เสียบปลั๊กไฟ 是插电。", "electric"],
  ["ถังขยะ", "thang-kha-ya", "thang-kha-ya", "垃圾桶", "名词", "清洁家务", 36, "ถังขยะในครัวเต็มแล้ว ช่วยเอาไปทิ้งก่อนมีกลิ่นได้ไหม", "thang-kha-ya nai khrua dtem laaeo, chuai ao bpai thing gaawn mii glin dai mai", "厨房里的垃圾桶满了，可以帮忙在有味道前拿去倒掉吗？", "เทถังขยะ", "thee thang-kha-ya", "倒垃圾桶", "ถุงขยะ", "thung-kha-ya", "垃圾袋", "易混", "ถังขยะ 是桶；ถุงขยะ 是套在桶里或装垃圾的袋子。", "cleaning"],
  ["ตะกร้าผ้า", "dta-graa-phaa", "dta-graa-phaa", "洗衣篮；衣物篮", "名词", "清洁家务", 37, "เสื้อผ้าสกปรกควรใส่ตะกร้าผ้า ไม่ควรวางไว้บนพื้น", "suea-phaa sok-ga-bprok khuan sai dta-graa-phaa, mai khuan waang wai bon pheun", "脏衣服应该放进洗衣篮，不应该放在地上。", "ใส่ผ้าในตะกร้าผ้า", "sai phaa nai dta-graa-phaa", "把衣服放进洗衣篮", "ตะกร้า", "dta-graa", "篮子", "近义", "ตะกร้าผ้า 专指放衣物的篮子；ตะกร้า 是更泛的篮子。", "laundry"],
  ["ไม้แขวนเสื้อ", "mai-khwaaen-suea", "mai-khwaaen-suea", "衣架", "名词", "清洁家务", 38, "หลังซักเสื้อเชิ้ต ฉันใช้ไม้แขวนเสื้อแขวนไว้ไม่ให้ยับ", "lang sak suea-choet, chan chai mai-khwaaen-suea khwaaen wai mai hai yap", "洗完衬衫后，我用衣架挂起来，避免起皱。", "แขวนเสื้อบนไม้แขวนเสื้อ", "khwaaen suea bon mai-khwaaen-suea", "把衣服挂在衣架上", "ราวตากผ้า", "raao-dtaak-phaa", "晾衣杆", "易混", "ไม้แขวนเสื้อ 是单个衣架；ราวตากผ้า 是挂很多衣物的杆或架。", "laundry"],
  ["ผ้าม่าน", "phaa-maan", "phaa-maan", "窗帘", "名词", "家具家电", 39, "ตอนบ่ายแดดแรงมาก ฉันจึงปิดผ้าม่านในห้องนั่งเล่น", "dtaawn baai daaet raaeng maak, chan jeung bpit phaa-maan nai haawng-nang-len", "下午太阳很强，所以我拉上了客厅的窗帘。", "เปิดผ้าม่าน", "bpoet phaa-maan", "拉开窗帘", "มุ้งลวด", "mung-luat", "纱窗；防蚊网", "易混", "ผ้าม่าน 用来遮光遮视线；มุ้งลวด 用来挡蚊虫并通风。", "furniture"],
  ["มุ้งลวด", "mung-luat", "mung-luat", "纱窗；防蚊网", "名词", "家具家电", 40, "มุ้งลวดขาดนิดหน่อย ยุงจึงบินเข้าห้องตอนกลางคืน", "mung-luat khaat nit naawy, yung jeung bin khao haawng dtaawn glaang-kheun", "纱窗破了一点，所以晚上蚊子飞进了房间。", "ซ่อมมุ้งลวด", "saawm mung-luat", "修纱窗", "ผ้าม่าน", "phaa-maan", "窗帘", "易混", "มุ้งลวด 是网状防虫设施，不负责遮光；遮光用 ผ้าม่าน。", "repair"],
  ["ที่นอน", "thii-naawn", "thii-naawn", "床垫；睡觉的地方", "名词", "家具家电", 41, "วันหยุดฉันเอาที่นอนไปตากแดด เพื่อให้แห้งและไม่มีกลิ่นอับ", "wan-yut chan ao thii-naawn bpai dtaak daaet, phuea hai haaeng lae mai mii glin ap", "休息日我把床垫拿去晒太阳，让它变干且没有霉闷味。", "ปูที่นอน", "bpuu thii-naawn", "铺床垫；铺床", "เตียง", "dtiiang", "床架；床", "易混", "ที่นอน 常指床垫；เตียง 更偏床或床架，口语中有时会重叠。", "furniture"],
  ["หมอน", "maawn", "maawn", "枕头", "名词", "家具家电", 42, "หมอนใบนี้สูงเกินไป ฉันนอนแล้วปวดคอทุกเช้า", "maawn bai nii suung goen bpai, chan naawn laaeo bpuat khaaw thuk chaao", "这个枕头太高了，我睡完每天早上都脖子疼。", "ปลอกหมอน", "bplaawk maawn", "枕套", "ผ้าห่ม", "phaa-hom", "被子；毯子", "易混", "หมอน 用来垫头；ผ้าห่ม 用来盖身体。", "furniture"],
  ["ผ้าห่ม", "phaa-hom", "phaa-hom", "被子；毯子", "名词", "家具家电", 43, "อากาศเย็นลงตอนดึก แม่จึงเอาผ้าห่มอีกผืนมาให้ลูก", "aa-gaat yen long dtaawn duek, maae jeung ao phaa-hom iik pheun maa hai luuk", "深夜天气变凉，妈妈又拿了一条被子给孩子。", "พับผ้าห่ม", "phap phaa-hom", "叠被子", "ผ้าปูที่นอน", "phaa-bpuu-thii-naawn", "床单", "易混", "ผ้าห่ม 是盖的；ผ้าปูที่นอน 是铺在床垫上的床单。", "furniture"],
  ["ไม้กวาด", "mai-gwaat", "mai-gwaat", "扫帚", "名词", "清洁家务", 44, "หลังเด็กกินขนม แม่ใช้ไม้กวาดกวาดเศษขนมใต้โต๊ะ", "lang dek gin kha-nom, maae chai mai-gwaat gwaat seet kha-nom dtai dto", "孩子吃完零食后，妈妈用扫帚扫桌子下面的碎屑。", "กวาดบ้านด้วยไม้กวาด", "gwaat baan duai mai-gwaat", "用扫帚扫家里", "ไม้ถูพื้น", "mai-thuu-pheun", "拖把", "易混", "ไม้กวาด 用来扫干的灰尘和碎屑；ไม้ถูพื้น 用来拖地。", "cleaning"],
  ["ที่โกยผง", "thii-gooi-phong", "thii-gooi-phong", "簸箕", "名词", "清洁家务", 45, "กวาดเศษกระดาษแล้วอย่าลืมใช้ที่โกยผงเก็บไปทิ้ง", "gwaat seet gra-daat laaeo yaa leum chai thii-gooi-phong gep bpai thing", "扫完纸屑后别忘了用簸箕收起来倒掉。", "ใช้ที่โกยผง", "chai thii-gooi-phong", "使用簸箕", "ไม้กวาด", "mai-gwaat", "扫帚", "用法", "ที่โกยผง 常和 ไม้กวาด 一起使用，一个扫，一个收。", "cleaning"],
  ["ไม้ถูพื้น", "mai-thuu-pheun", "mai-thuu-pheun", "拖把", "名词", "清洁家务", 46, "พื้นครัวเปื้อนน้ำมันนิดหน่อย ฉันจึงใช้ไม้ถูพื้นถูซ้ำอีกครั้ง", "pheun khrua bpeuan nam-man nit naawy, chan jeung chai mai-thuu-pheun thuu sam iik khrang", "厨房地板沾了一点油，所以我用拖把又拖了一遍。", "ถูพื้นด้วยไม้ถูพื้น", "thuu pheun duai mai-thuu-pheun", "用拖把拖地", "ไม้กวาด", "mai-gwaat", "扫帚", "易混", "拖地说 ถูพื้น；扫地说 กวาดพื้น/กวาดบ้าน。", "cleaning"],
  ["ถังน้ำ", "thang-naam", "thang-naam", "水桶", "名词", "清洁家务", 47, "เวลาถูพื้น ป้าจะใส่น้ำสะอาดในถังน้ำแล้วค่อยผสมน้ำยาถูพื้น", "wee-laa thuu pheun, bpaa ja sai naam sa-aat nai thang-naam laaeo khaawy pha-som nam-yaa-thuu-pheun", "拖地时，阿姨会先在水桶里装清水，然后再混入地板清洁剂。", "ใส่น้ำในถังน้ำ", "sai naam nai thang-naam", "往水桶里装水", "ถังขยะ", "thang-kha-ya", "垃圾桶", "易混", "ถังน้ำ 装水；ถังขยะ 装垃圾，两个词只差后半部分。", "cleaning"],
  ["ผ้าขี้ริ้ว", "phaa-khii-riu", "phaa-khii-riu", "抹布；旧布", "名词", "清洁家务", 48, "ผ้าขี้ริ้วผืนนี้ใช้เช็ดพื้นเท่านั้น อย่านำไปเช็ดโต๊ะอาหาร", "phaa-khii-riu pheun nii chai chet pheun thao-nan, yaa nam bpai chet dto aa-haan", "这块抹布只用来擦地，不要拿去擦餐桌。", "ซักผ้าขี้ริ้ว", "sak phaa-khii-riu", "洗抹布", "ผ้าเช็ดโต๊ะ", "phaa-chet-dto", "擦桌布", "易混", "ผ้าขี้ริ้ว 常用于较脏的清洁；擦餐桌可说 ผ้าเช็ดโต๊ะ。", "cleaning"],
  ["น้ำยาล้างจาน", "nam-yaa-laang-jaan", "nam-yaa-laang-jaan", "洗洁精", "名词", "清洁家务", 49, "ถ้าน้ำยาล้างจานหมด จานจะมันและล้างออกยากกว่าเดิม", "thaa nam-yaa-laang-jaan mot, jaan ja man lae laang aawk yaak gwaa doem", "如果洗洁精用完了，盘子会油油的，更难洗干净。", "เติมน้ำยาล้างจาน", "dterm nam-yaa-laang-jaan", "补充洗洁精", "น้ำยาซักผ้า", "nam-yaa-sak-phaa", "洗衣液", "易混", "น้ำยาล้างจาน 用来洗碗；น้ำยาซักผ้า 用来洗衣服。", "cleaning"],
  ["น้ำยาถูพื้น", "nam-yaa-thuu-pheun", "nam-yaa-thuu-pheun", "地板清洁剂", "名词", "清洁家务", 50, "แม่ผสมน้ำยาถูพื้นกับน้ำในถัง เพื่อให้บ้านหอมและสะอาด", "maae pha-som nam-yaa-thuu-pheun gap naam nai thang, phuea hai baan haawm lae sa-aat", "妈妈把地板清洁剂和水在桶里混合，让家里又香又干净。", "ใช้น้ำยาถูพื้น", "chai nam-yaa-thuu-pheun", "使用地板清洁剂", "น้ำยาล้างห้องน้ำ", "nam-yaa-laang-haawng-naam", "浴厕清洁剂", "易混", "不同清洁剂用途不同；น้ำยาถูพื้น 不一定适合清洁马桶或浴室污垢。", "cleaning"],
  ["น้ำยาซักผ้า", "nam-yaa-sak-phaa", "nam-yaa-sak-phaa", "洗衣液", "名词", "清洁家务", 51, "เสื้อผ้าของเด็กควรใช้น้ำยาซักผ้าที่กลิ่นไม่แรงเกินไป", "suea-phaa khaawng dek khuan chai nam-yaa-sak-phaa thii glin mai raaeng goen bpai", "孩子的衣服应该用气味不要太重的洗衣液。", "เทน้ำยาซักผ้า", "thee nam-yaa-sak-phaa", "倒洗衣液", "ผงซักฟอก", "phong-sak-faawk", "洗衣粉", "近义", "น้ำยาซักผ้า 是液体；ผงซักฟอก 是粉状洗涤剂。", "laundry"],
  ["น้ำยาปรับผ้านุ่ม", "nam-yaa-bprap-phaa-num", "nam-yaa-bprap-phaa-num", "柔顺剂", "名词", "清洁家务", 52, "ฉันใช้น้ำยาปรับผ้านุ่มนิดเดียว เพราะไม่อยากให้กลิ่นติดเสื้อแรงมาก", "chan chai nam-yaa-bprap-phaa-num nit diao, phraw mai yaak hai glin dtit suea raaeng maak", "我只用一点柔顺剂，因为不想让衣服上的味道太浓。", "ใส่น้ำยาปรับผ้านุ่ม", "sai nam-yaa-bprap-phaa-num", "加入柔顺剂", "น้ำยาซักผ้า", "nam-yaa-sak-phaa", "洗衣液", "易混", "洗衣液负责清洁；柔顺剂主要让衣物更柔软、有香味。", "laundry"],
  ["ฟองน้ำ", "faawng-naam", "faawng-naam", "海绵", "名词", "清洁家务", 53, "ฟองน้ำล้างจานเริ่มมีกลิ่นแล้ว เราควรเปลี่ยนอันใหม่", "faawng-naam laang-jaan roem mii glin laaeo, rao khuan bplian an mai", "洗碗海绵开始有味道了，我们应该换新的。", "ฟองน้ำล้างจาน", "faawng-naam laang-jaan", "洗碗海绵", "แปรงล้างจาน", "bpraaeng-laang-jaan", "洗碗刷", "近义", "ฟองน้ำ 较软；แปรง 有刷毛，适合刷较硬的污渍。", "cleaning"],
  ["แปรงขัดห้องน้ำ", "bpraaeng-khat-haawng-naam", "bpraaeng-khat-haawng-naam", "浴厕刷；卫生间刷子", "名词", "清洁家务", 54, "หลังใช้น้ำยาล้างห้องน้ำ พ่อใช้แปรงขัดห้องน้ำขัดพื้นอีกครั้ง", "lang chai nam-yaa-laang-haawng-naam, phaaw chai bpraaeng-khat-haawng-naam khat pheun iik khrang", "用了浴厕清洁剂后，爸爸又用卫生间刷子刷了一遍地面。", "ใช้แปรงขัดห้องน้ำ", "chai bpraaeng-khat-haawng-naam", "使用浴厕刷", "ฟองน้ำ", "faawng-naam", "海绵", "易混", "แปรงขัดห้องน้ำ 通常较硬，别和洗碗海绵混用。", "cleaning"],
  ["ถุงขยะ", "thung-kha-ya", "thung-kha-ya", "垃圾袋", "名词", "清洁家务", 55, "ก่อนใส่ถุงขยะใบใหม่ ควรเช็ดถังขยะให้แห้งก่อน", "gaawn sai thung-kha-ya bai mai, khuan chet thang-kha-ya hai haaeng gaawn", "套新垃圾袋之前，应该先把垃圾桶擦干。", "เปลี่ยนถุงขยะ", "bplian thung-kha-ya", "换垃圾袋", "ถังขยะ", "thang-kha-ya", "垃圾桶", "易混", "ถุงขยะ 是袋子；ถังขยะ 是桶，两者常搭配使用。", "cleaning"],
  ["ดูดฝุ่น", "duut-fun", "duut-fun", "吸尘", "动词", "清洁家务", 56, "ก่อนแขกมา ฉันดูดฝุ่นพรมในห้องนั่งเล่นจนสะอาด", "gaawn khaaek maa, chan duut-fun phrom nai haawng-nang-len jon sa-aat", "客人来之前，我把客厅地毯吸尘吸到干净。", "ดูดฝุ่นพรม", "duut-fun phrom", "给地毯吸尘", "กวาดบ้าน", "gwaat-baan", "扫家里", "易混", "ดูดฝุ่น 用吸尘器；กวาดบ้าน 用扫帚。", "chore"],
  ["เช็ดฝุ่น", "chet-fun", "chet-fun", "擦灰；除尘", "动词", "清洁家务", 57, "โต๊ะข้างหน้าต่างมีฝุ่นเยอะ ฉันจึงใช้ผ้าแห้งเช็ดฝุ่นก่อนวางหนังสือ", "dto khaang naa-dtaang mii fun yoe, chan jeung chai phaa haaeng chet-fun gaawn waang nang-sue", "窗边的桌子灰尘很多，所以我先用干布擦灰再放书。", "เช็ดฝุ่นบนโต๊ะ", "chet-fun bon dto", "擦桌上的灰", "ถูพื้น", "thuu-pheun", "拖地", "易混", "เช็ดฝุ่น 多用于家具表面；ถูพื้น 用于地面。", "chore"],
  ["ล้างจาน", "laang-jaan", "laang-jaan", "洗碗；洗盘子", "动词", "清洁家务", 58, "หลังมื้อเย็น น้องล้างจาน ส่วนฉันเช็ดโต๊ะและเก็บของเข้าตู้", "lang mue yen, naawng laang-jaan, suan chan chet dto lae gep khaawng khao dtuu", "晚饭后，弟弟/妹妹洗碗，我擦桌子并把东西收进柜子。", "ช่วยล้างจาน", "chuai laang-jaan", "帮忙洗碗", "ทำกับข้าว", "tham-gap-khaao", "做饭", "用法", "做饭和洗碗常成对出现：คนหนึ่งทำกับข้าว อีกคนล้างจาน。", "chore"],
  ["ตากผ้า", "dtaak-phaa", "dtaak-phaa", "晾衣服；晒衣服", "动词", "清洁家务", 59, "ฝนกำลังจะตก รีบเก็บผ้าที่ตากไว้ตรงระเบียงเข้าห้องก่อน", "fon gam-lang ja dtok, riip gep phaa thii dtaak wai dtrong ra-biiang khao haawng gaawn", "快要下雨了，赶快先把晾在阳台的衣服收进房间。", "ตากผ้าที่ระเบียง", "dtaak phaa thii ra-biiang", "在阳台晾衣服", "อบผ้า", "op-phaa", "烘衣服", "易混", "ตากผ้า 靠阳光或空气晾干；อบผ้า 用烘干机或热风。", "laundry"],
  ["พับผ้า", "phap-phaa", "phap-phaa", "叠衣服；叠布", "动词", "清洁家务", 60, "หลังผ้าแห้งแล้ว เรานั่งพับผ้าด้วยกันหน้าทีวี", "lang phaa haaeng laaeo, rao nang phap-phaa duai gan naa thii-wii", "衣服干了以后，我们坐在电视前一起叠衣服。", "พับผ้าให้เรียบร้อย", "phap phaa hai riiap-raawy", "把衣服叠整齐", "แขวนเสื้อ", "khwaaen-suea", "挂衣服", "易混", "可折的衣物常 พับผ้า；容易皱的衬衫常 แขวนเสื้อ。", "laundry"],
  ["รีดผ้า", "riit-phaa", "riit-phaa", "熨衣服", "动词", "清洁家务", 61, "พรุ่งนี้มีประชุมเช้า ฉันจึงรีดผ้าไว้ตั้งแต่คืนนี้", "phrung-nii mii bpra-chum chaao, chan jeung riit-phaa wai dtang-dtaae kheun-nii", "明天早上有会议，所以我今晚就把衣服熨好了。", "รีดเสื้อเชิ้ต", "riit suea-choet", "熨衬衫", "พับผ้า", "phap-phaa", "叠衣服", "易混", "รีดผ้า 是用熨斗处理皱褶；พับผ้า 是把衣物折好收纳。", "laundry"],
  ["เก็บห้อง", "gep-haawng", "gep-haawng", "收拾房间", "动词", "清洁家务", 62, "ก่อนเพื่อนมาเล่นที่บ้าน ลูกต้องเก็บห้องและเอาของเล่นเข้ากล่อง", "gaawn pheuan maa len thii baan, luuk dtawng gep-haawng lae ao khaawng-len khao glaawng", "朋友来家里玩之前，孩子要收拾房间并把玩具放进盒子。", "เก็บห้องให้เรียบร้อย", "gep haawng hai riiap-raawy", "把房间收拾整齐", "ทำความสะอาด", "tham-khwaam-sa-aat", "打扫；清洁", "近义", "เก็บห้อง 强调整理物品；ทำความสะอาด 强调清洁干净。", "chore"],
  ["ทำความสะอาด", "tham-khwaam-sa-aat", "tham-khwaam-sa-aat", "打扫；清洁", "动词", "清洁家务", 63, "วันเสาร์ทั้งบ้านช่วยกันทำความสะอาด ตั้งแต่ห้องครัวจนถึงห้องน้ำ", "wan sao thang baan chuai gan tham-khwaam-sa-aat, dtang-dtaae haawng-khrua jon theung haawng-naam", "星期六全家一起打扫，从厨房到卫生间都清理。", "ทำความสะอาดบ้าน", "tham-khwaam-sa-aat baan", "打扫家里", "เก็บห้อง", "gep-haawng", "收拾房间", "近义", "ทำความสะอาด 范围更广，可包括扫、拖、擦、洗。", "chore"],
  ["ซ่อม", "saawm", "saawm", "修理；维修", "动词", "维修问题", 64, "ถ้าประตูปิดไม่สนิท เราอาจต้องซ่อมบานพับหรือเรียกช่างมาดู", "thaa bpra-dtuu bpit mai sa-nit, rao aat dtawng saawm baan-phap rue riiak chang maa duu", "如果门关不严，我们可能要修铰链，或叫师傅来看。", "ซ่อมประตู", "saawm bpra-dtuu", "修门", "เปลี่ยน", "bplian", "更换", "易混", "ซ่อม 是让坏的东西恢复可用；เปลี่ยน 是换成新的。", "repair"],
  ["ช่าง", "chang", "chang", "维修师傅；工匠", "名词", "维修问题", 65, "ช่างบอกว่าแอร์ไม่ได้เสีย แค่ต้องล้างแผ่นกรองเท่านั้น", "chang baawk waa aae mai dai sia, khaae dtawng laang phaen-graawng thao-nan", "维修师傅说空调没有坏，只是需要清洗滤网而已。", "เรียกช่าง", "riiak chang", "叫维修师傅", "เจ้าของบ้าน", "jao-khaawng-baan", "房东；屋主", "用法", "租房时常先แจ้งเจ้าของบ้าน，再ให้เจ้าของบ้านเรียกช่าง。", "repair"],
  ["เครื่องมือ", "khreuuang-mue", "khreuuang-mue", "工具", "名词", "维修问题", 66, "กล่องเครื่องมืออยู่ในห้องเก็บของ แต่เด็กไม่ควรหยิบมาเล่น", "glaawng khreuuang-mue yuu nai haawng-gep-khaawng, dtaae dek mai khuan yip maa len", "工具箱在储物间，但孩子不应该拿来玩。", "กล่องเครื่องมือ", "glaawng khreuuang-mue", "工具箱", "อุปกรณ์", "u-bpa-gaawn", "设备；用品", "近义", "เครื่องมือ 多指可用来修理或制作的工具；อุปกรณ์ 范围更泛。", "repair"],
  ["ไขควง", "khai-khuaang", "khai-khuaang", "螺丝刀", "名词", "维修问题", 67, "พ่อใช้ไขควงขันสกรูใต้โต๊ะให้แน่นกว่าเดิม", "phaaw chai khai-khuaang khan sa-gruu dtai dto hai naaen gwaa doem", "爸爸用螺丝刀把桌子下面的螺丝拧得比之前更紧。", "ใช้ไขควง", "chai khai-khuaang", "使用螺丝刀", "ค้อน", "khaawn", "锤子", "易混", "ไขควง 用来拧螺丝；ค้อน 用来敲钉子或敲打。", "tool"],
  ["ค้อน", "khaawn", "khaawn", "锤子", "名词", "维修问题", 68, "อย่าวางค้อนบนพื้น เพราะอาจมีคนเดินเตะแล้วเจ็บเท้า", "yaa waang khaawn bon pheun, phraw aat mii khon doen dte laaeo jep thaao", "不要把锤子放在地上，因为可能有人走路踢到而脚疼。", "ตอกตะปูด้วยค้อน", "dtaawk dta-bpuu duai khaawn", "用锤子钉钉子", "ไขควง", "khai-khuaang", "螺丝刀", "易混", "ค้อน 常和 ตะปู 搭配；ไขควง 常和 สกรู 搭配。", "tool"],
  ["ตะปู", "dta-bpuu", "dta-bpuu", "钉子", "名词", "维修问题", 69, "ตะปูบนกำแพงหลวมแล้ว รูปจึงเอียงไปข้างหนึ่ง", "dta-bpuu bon gam-phaaeng luaam laaeo, ruup jeung iiang bpai khaang neung", "墙上的钉子松了，所以照片歪向一边。", "ตอกตะปู", "dtaawk dta-bpuu", "钉钉子", "สกรู", "sa-gruu", "螺丝", "易混", "ตะปู 通常用锤子敲进去；สกรู 通常用螺丝刀拧进去。", "tool"],
  ["สกรู", "sa-gruu", "sa-gruu", "螺丝", "名词", "维修问题", 70, "สกรูที่เก้าอี้หลุดไปหนึ่งตัว ทำให้นั่งแล้วโยกนิดหน่อย", "sa-gruu thii gao-ii lut bpai neung dtua, tham-hai nang laaeo yook nit naawy", "椅子上掉了一颗螺丝，所以坐上去会有点晃。", "ขันสกรู", "khan sa-gruu", "拧螺丝", "ตะปู", "dta-bpuu", "钉子", "易混", "สกรู 的量词常可用 ตัว；动作常说 ขันสกรู。", "tool"],
  ["กาว", "gaao", "gaao", "胶水；胶", "名词", "维修问题", 71, "ขอบกล่องหลุดนิดหน่อย ฉันใช้กาวติดไว้ชั่วคราว", "khaawp glaawng lut nit naawy, chan chai gaao dtit wai chua-khraao", "盒子的边有点脱开，我用胶水临时粘住。", "ทากาว", "thaa gaao", "涂胶水", "เทปกาว", "theep-gaao", "胶带", "近义", "กาว 是胶本身；เทปกาว 是带状胶带，使用方式不同。", "tool"],
  ["รั่ว", "rua", "rua", "漏；渗漏", "形容词", "维修问题", 72, "หลังฝนตกหนัก หลังคารั่วจนมีน้ำหยดลงบนพื้นห้องนั่งเล่น", "lang fon dtok nak, lang-khaa rua jon mii naam yot long bon pheun haawng-nang-len", "大雨过后，屋顶漏水，水滴到了客厅地板上。", "หลังคารั่ว", "lang-khaa rua", "屋顶漏水", "ตัน", "dtan", "堵塞", "易混", "รั่ว 是本来不该流出的东西漏出来；ตัน 是通道堵住。", "problem"],
  ["ตัน", "dtan", "dtan", "堵塞；不通", "形容词", "维修问题", 73, "ท่อน้ำในครัวตัน น้ำจึงไหลลงช้ามากหลังล้างจาน", "thaaw-naam nai khrua dtan, naam jeung lai long chaa maak lang laang-jaan", "厨房水管堵了，所以洗碗后水流下去很慢。", "ท่อตัน", "thaaw dtan", "管道堵塞", "รั่ว", "rua", "漏；渗漏", "易混", "ตัน 表示堵住不通；รั่ว 表示漏出来，维修时要描述清楚。", "problem"],
  ["เสีย", "sia", "sia", "坏了；不能正常使用", "形容词", "维修问题", 74, "เครื่องซักผ้าเสียตั้งแต่เมื่อคืน วันนี้เราต้องเอาผ้าไปซักที่ร้าน", "khreuuang-sak-phaa sia dtang-dtaae muea-kheun, wan-nii rao dtawng ao phaa bpai sak thii raan", "洗衣机从昨晚就坏了，今天我们得把衣服拿去店里洗。", "แอร์เสีย", "aae sia", "空调坏了", "ใช้ได้", "chai-dai", "能用；可使用", "反义", "เสีย 可说机器坏、东西坏；反义可用 ใช้ได้ 或 ไม่เสีย。", "problem"],
  ["ไฟดับ", "fai-dap", "fai-dap", "停电", "短语", "水电设施", 75, "เมื่อคืนไฟดับเกือบหนึ่งชั่วโมง เราจึงจุดเทียนและปิดตู้เย็นไว้", "muea-kheun fai-dap gueap neung chua-moong, rao jeung jut thian lae bpit dtuu-yen wai", "昨晚停电将近一个小时，所以我们点了蜡烛并把冰箱关着。", "ไฟดับทั้งตึก", "fai-dap thang dteuk", "整栋楼停电", "ไฟติด", "fai-dtit", "灯亮；通电", "反义", "ไฟดับ 是停电或灯灭；若只是某盏灯不亮，要说明 หลอดไฟเสีย。", "electric"],
  ["น้ำไม่ไหล", "naam-mai-lai", "naam mai lai", "没水；水不流", "短语", "水电设施", 76, "ตอนเช้าน้ำไม่ไหล ทุกคนจึงต้องรออาบน้ำก่อนออกจากบ้าน", "dtaawn chaao naam mai lai, thuk khon jeung dtawng raaw aap-naam gaawn aawk jaak baan", "早上没水，所以大家出门前都得等着洗澡。", "น้ำไม่ไหลทั้งตึก", "naam mai lai thang dteuk", "整栋楼没水", "น้ำไหล", "naam lai", "水流；有水", "反义", "น้ำไม่ไหล 描述没有水或水出不来；น้ำไหล คือ 水在流。", "water"],
  ["น้ำหยด", "naam-yot", "naam-yot", "水滴；滴水", "短语", "水电设施", 77, "ก๊อกน้ำปิดแล้วแต่น้ำหยดตลอดคืน ทำให้พื้นเปียก", "gaawk-naam bpit laaeo dtaae naam-yot dta-laawt kheun, tham-hai pheun bpiiak", "水龙头关了但整晚滴水，导致地板湿了。", "น้ำหยดจากก๊อก", "naam-yot jaak gaawk", "水从水龙头滴下来", "น้ำรั่ว", "naam-rua", "漏水", "近义", "น้ำหยด 强调一滴一滴；น้ำรั่ว 可泛指漏水，程度可大可小。", "water"],
  ["ท่อ", "thaaw", "thaaw", "管子；管道", "名词", "水电设施", 78, "ช่างตรวจท่อใต้อ่างล้างหน้า เพราะมีกลิ่นแปลก ๆ ออกมา", "chang dtruat thaaw dtai aang-laang-naa, phraw mii glin bplaaek bplaaek aawk maa", "师傅检查洗脸池下面的管道，因为有奇怪的味道出来。", "ท่อน้ำ", "thaaw-naam", "水管", "สายไฟ", "saai-fai", "电线", "易混", "ท่อ 是水、气等流动的管道；สายไฟ 是电线。", "water"],
  ["ก๊อกน้ำ", "gaawk-naam", "gaawk-naam", "水龙头", "名词", "水电设施", 79, "อย่าลืมปิดก๊อกน้ำหลังแปรงฟัน เพื่อไม่ให้เปลืองน้ำ", "yaa leum bpit gaawk-naam lang bpraaeng-fan, phuea mai hai bpleuang naam", "刷牙后别忘了关水龙头，以免浪费水。", "เปิดก๊อกน้ำ", "bpoet gaawk-naam", "打开水龙头", "ฝักบัว", "fak-bua", "淋浴喷头", "易混", "ก๊อกน้ำ 是水龙头；ฝักบัว 是淋浴喷头。", "water"],
  ["อ่างล้างหน้า", "aang-laang-naa", "aang-laang-naa", "洗脸池；盥洗盆", "名词", "水电设施", 80, "อย่าวางผมที่หลุดในอ่างล้างหน้า เพราะอาจทำให้ท่อตัน", "yaa waang phom thii lut nai aang-laang-naa, phraw aat tham-hai thaaw dtan", "不要把掉落的头发留在洗脸池里，因为可能会让管道堵住。", "ล้างมือที่อ่างล้างหน้า", "laang mue thii aang-laang-naa", "在洗脸池洗手", "อ่างล้างจาน", "aang-laang-jaan", "洗碗池", "易混", "อ่างล้างหน้า 在卫生间洗脸洗手；อ่างล้างจาน 在厨房洗碗。", "water"],
  ["ชักโครก", "chak-khrook", "chak-khrook", "抽水马桶", "名词", "水电设施", 81, "หลังใช้ชักโครกแล้ว ควรกดน้ำและตรวจว่าห้องน้ำสะอาดหรือไม่", "lang chai chak-khrook laaeo, khuan got naam lae dtruat waa haawng-naam sa-aat rue mai", "用完马桶后，应该冲水并检查卫生间是否干净。", "กดชักโครก", "got chak-khrook", "冲马桶", "โถส้วม", "thoo-suam", "便器；马桶", "近义", "ชักโครก 是日常常见的抽水马桶说法；โถส้วม 较泛。", "bathroom"],
  ["ฝักบัว", "fak-bua", "fak-bua", "淋浴喷头；花洒", "名词", "水电设施", 82, "ฝักบัวในห้องน้ำไหลเบามาก อาจต้องถอดมาล้างคราบหินปูน", "fak-bua nai haawng-naam lai bao maak, aat dtawng thaawt maa laang khraap hin-bpuun", "浴室里的花洒水流很小，可能需要拆下来清洗水垢。", "เปิดฝักบัว", "bpoet fak-bua", "打开花洒", "ก๊อกน้ำ", "gaawk-naam", "水龙头", "易混", "ฝักบัว 用于淋浴；ก๊อกน้ำ 是更一般的水龙头。", "bathroom"],
  ["ท่อน้ำ", "thaaw-naam", "thaaw-naam", "水管", "名词", "水电设施", 83, "ท่อน้ำหลังบ้านแตกตอนกลางคืน ทำให้น้ำไหลเต็มพื้น", "thaaw-naam lang baan dtaaek dtaawn glaang-kheun, tham-hai naam lai dtem pheun", "屋后的水管半夜破了，导致水流满地。", "ซ่อมท่อน้ำ", "saawm thaaw-naam", "修水管", "ท่อระบายน้ำ", "thaaw-ra-baai-naam", "排水管", "易混", "ท่อน้ำ 可泛指供水管；ท่อระบายน้ำ 更强调排水。", "water"],
  ["เปลี่ยนหลอดไฟ", "bplian-laawt-fai", "bplian laawt-fai", "换灯泡", "短语", "维修问题", 84, "หลอดไฟตรงทางเดินมืดมาก พรุ่งนี้ฉันจะซื้อหลอดใหม่มาเปลี่ยนหลอดไฟ", "laawt-fai dtrong thaang-doen meuet maak, phrung-nii chan ja sue laawt mai maa bplian laawt-fai", "走廊那里的灯泡很暗，明天我会买新灯泡来换。", "ช่วยเปลี่ยนหลอดไฟ", "chuai bplian laawt-fai", "帮忙换灯泡", "ซ่อมไฟ", "saawm fai", "修电灯；修电路", "易混", "เปลี่ยนหลอดไฟ 是换灯泡；如果线路有问题才更适合说 ซ่อมไฟ。", "repair"],
  ["ขันให้แน่น", "khan-hai-naaen", "khan hai naaen", "拧紧", "短语", "维修问题", 85, "เก้าอี้โยกนิดหน่อย พ่อจึงใช้ไขควงขันให้แน่นก่อนให้ลูกนั่ง", "gao-ii yook nit naawy, phaaw jeung chai khai-khuaang khan hai naaen gaawn hai luuk nang", "椅子有点晃，爸爸先用螺丝刀拧紧再让孩子坐。", "ขันสกรูให้แน่น", "khan sa-gruu hai naaen", "把螺丝拧紧", "คลายออก", "khlaai aawk", "松开", "反义", "ขันให้แน่น 常接螺丝、盖子等；反方向可说 คลายออก。", "repair"],
  ["เปิดแอร์", "bpoet-aae", "bpoet aae", "开空调", "短语", "家具家电", 86, "ถ้าห้องร้อนมาก เปิดแอร์สักพักแล้วค่อยปิดเพื่อประหยัดไฟ", "thaa haawng raawn maak, bpoet aae sak phak laaeo khaawy bpit phuea bpra-yat fai", "如果房间很热，开一会儿空调再关，以便省电。", "เปิดแอร์เบา ๆ", "bpoet aae bao bao", "把空调开小一点", "เปิดพัดลม", "bpoet phat-lom", "开风扇", "易混", "แอร์ 是口语空调；正式词是 เครื่องปรับอากาศ。", "appliance"],
  ["ปิดน้ำ", "bpit-naam", "bpit naam", "关水；关闭水源", "短语", "水电设施", 87, "ก่อนซ่อมก๊อกน้ำ ช่างขอให้เราปิดน้ำตรงวาล์วก่อน", "gaawn saawm gaawk-naam, chang khaaw hai rao bpit naam dtrong waan gaawn", "修水龙头前，师傅请我们先在阀门那里关水。", "ปิดน้ำก่อนซ่อม", "bpit naam gaawn saawm", "维修前关水", "เปิดน้ำ", "bpoet naam", "开水；打开水源", "反义", "ปิดน้ำ 可以指关水龙头，也可以指关闭总水阀，具体要看语境。", "water"],
  ["จัดของ", "jat-khaawng", "jat khaawng", "整理东西；摆放物品", "动词", "清洁家务", 88, "วันหยุดนี้ฉันอยากจัดของในตู้เสื้อผ้าและเอาของที่ไม่ใช้ไปบริจาค", "wan-yut nii chan yaak jat khaawng nai dtuu-suea-phaa lae ao khaawng thii mai chai bpai baaw-ri-jaak", "这个休息日我想整理衣柜里的东西，把不用的物品拿去捐。", "จัดของเข้าตู้", "jat khaawng khao dtuu", "把东西整理进柜子", "วางของ", "waang-khaawng", "放东西", "近义", "จัดของ 强调有顺序地整理；วางของ 只是把东西放下。", "chore"],
  ["แยกขยะ", "yaaek-kha-ya", "yaaek kha-ya", "垃圾分类；分开垃圾", "动词", "清洁家务", 89, "คอนโดของเราขอให้ทุกห้องแยกขยะก่อนนำไปทิ้งชั้นล่าง", "khaawn-doo khaawng rao khaaw hai thuk haawng yaaek kha-ya gaawn nam bpai thing chan-laang", "我们公寓要求每户在拿到楼下丢之前先进行垃圾分类。", "แยกขยะรีไซเคิล", "yaaek kha-ya rii-sai-khoen", "分出可回收垃圾", "ทิ้งขยะ", "thing-kha-ya", "扔垃圾", "用法", "แยกขยะ 是分类；ทิ้งขยะ 是丢弃，顺序上可先分再丢。", "cleaning"],
  ["ล้างถังขยะ", "laang-thang-kha-ya", "laang thang-kha-ya", "清洗垃圾桶", "短语", "清洁家务", 90, "ถังขยะมีกลิ่นแรงมาก พ่อจึงล้างถังขยะและตากแดดไว้หลังบ้าน", "thang-kha-ya mii glin raaeng maak, phaaw jeung laang thang-kha-ya lae dtaak daaet wai lang baan", "垃圾桶味道很重，所以爸爸清洗垃圾桶并把它放在屋后晒太阳。", "ล้างถังขยะให้สะอาด", "laang thang-kha-ya hai sa-aat", "把垃圾桶洗干净", "เทถังขยะ", "thee thang-kha-ya", "倒垃圾桶", "易混", "เทถังขยะ 是倒掉里面的垃圾；ล้างถังขยะ 是清洗桶本身。", "cleaning"],
  ["กวาดบ้าน", "gwaat-baan", "gwaat baan", "扫家里；打扫地面", "动词", "清洁家务", 91, "ทุกเช้าคุณยายกวาดบ้านก่อนเปิดประตูรับลมเย็น", "thuk chaao khun-yaai gwaat baan gaawn bpoet bpra-dtuu rap lom yen", "每天早上奶奶先扫家里，再开门迎接凉风。", "กวาดบ้านตอนเช้า", "gwaat baan dtaawn chaao", "早上扫家里", "ถูพื้น", "thuu-pheun", "拖地", "易混", "กวาดบ้าน 用扫帚清除灰尘碎屑；ถูพื้น 用水或拖把清洁地面。", "chore"],
  ["ถูพื้น", "thuu-pheun", "thuu pheun", "拖地；擦地", "动词", "清洁家务", 92, "หลังเด็กทำน้ำหก แม่รีบถูพื้นเพื่อไม่ให้ใครลื่นล้ม", "lang dek tham naam hok, maae riip thuu pheun phuea mai hai khrai luen lom", "孩子把水洒了以后，妈妈赶快拖地，免得有人滑倒。", "ถูพื้นให้แห้ง", "thuu pheun hai haaeng", "把地拖干", "กวาดบ้าน", "gwaat-baan", "扫家里", "易混", "ถูพื้น 可用湿拖把或抹布；若只有干灰尘，先 กวาดบ้าน 更自然。", "chore"],
] as const satisfies readonly Row[];

const relatedFor = (row: Row): VocabularyExpansionRelatedWord => ({
  thai: row[13],
  roman: row[14],
  chinese: row[15],
});

const comparisonFor = (row: Row): VocabularyExpansionComparison => ({
  kind: row[16],
  target: relatedFor(row),
  distinctionZh: `${row[0]} 和 ${row[13]} 在家居、居住、清洁或维修场景中容易一起出现；学习时重点看搭配、对象和动作是否相同。`,
});

const synonymsFor = (row: Row): VocabularyExpansionRelatedWord[] =>
  row[16] === "近义" ? [relatedFor(row)] : [];

const antonymsFor = (row: Row): VocabularyExpansionRelatedWord[] =>
  row[16] === "反义" ? [relatedFor(row)] : [];

const toCandidate = (row: Row): VocabularyExpansionCandidate => {
  const [
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    priority,
    exampleThai,
    exampleRoman,
    exampleChinese,
    collocationThai,
    collocationRoman,
    collocationChinese,
    ,
    ,
    ,
    ,
    usageNoteZh,
    tag,
  ] = row;
  const synonyms = synonymsFor(row);
  const antonyms = antonymsFor(row);
  const comparisons = [comparisonFor(row)];
  const collocations = [{ thai: collocationThai, roman: collocationRoman, chinese: collocationChinese }];
  const tags = ["a2", "home", tag, theme];

  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority,
    senses: [
      {
        id: "main",
        chinese,
        examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }],
        synonyms,
        antonyms,
        comparisons,
        collocations,
        usageNotesZh: [usageNoteZh],
        tags,
      },
    ],
    synonyms,
    antonyms,
    comparisons,
    collocations,
    usageNotesZh: [usageNoteZh],
    tags,
    sourceRefs: HOME_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_HOME_DAILY_01 = rows.map(toCandidate);
