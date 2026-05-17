export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "在家做饭" | "食材处理" | "烹饪动作" | "厨房工具" | "口味调整" | "剩饭保存" | "简单菜名";
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

type FoodItem = { thai: string; roman: string; chinese: string; id: string };
type ToolItem = { thai: string; roman: string; chinese: string; id: string; actionThai: string; actionRoman: string; actionChinese: string };

const FOOD_COOKING_HOME_REFS = ["thai-frequency", "thai-a2-food-cooking-home-candidate"];

const prepItems: readonly FoodItem[] = [
  { thai: "ผักบุ้ง", roman: "phak-bung", chinese: "空心菜", id: "phak-bung" },
  { thai: "คะน้า", roman: "kha-naa", chinese: "芥蓝", id: "kha-naa" },
  { thai: "แตงกวา", roman: "dtaaeng-gwaa", chinese: "黄瓜", id: "dtaaeng-gwaa" },
  { thai: "มะเขือเทศ", roman: "ma-kheua-theet", chinese: "番茄", id: "ma-kheua-theet" },
  { thai: "หัวหอม", roman: "hua-haawm", chinese: "洋葱", id: "hua-haawm" },
  { thai: "กระเทียม", roman: "gra-thiiam", chinese: "蒜", id: "gra-thiiam" },
  { thai: "พริกสด", roman: "phrik sot", chinese: "新鲜辣椒", id: "phrik-sot" },
  { thai: "ขิงสด", roman: "khing sot", chinese: "鲜姜", id: "khing-sot" },
  { thai: "ตะไคร้", roman: "dta-khrai", chinese: "香茅", id: "dta-khrai" },
  { thai: "ใบมะกรูด", roman: "bai ma-gruut", chinese: "青柠叶", id: "bai-ma-gruut" },
  { thai: "เห็ดหอม", roman: "het haawm", chinese: "香菇", id: "het-haawm" },
  { thai: "เห็ดฟาง", roman: "het faang", chinese: "草菇", id: "het-faang" },
  { thai: "ถั่วฝักยาว", roman: "thua-fak-yaao", chinese: "长豆角", id: "thua-fak-yaao" },
  { thai: "แครอต", roman: "khae-raawt", chinese: "胡萝卜", id: "khae-raawt" },
  { thai: "ฟักทอง", roman: "fak-thaawng", chinese: "南瓜", id: "fak-thaawng" },
  { thai: "มันฝรั่ง", roman: "man fa-rang", chinese: "土豆", id: "man-fa-rang" },
  { thai: "อกไก่", roman: "ok gai", chinese: "鸡胸肉", id: "ok-gai" },
  { thai: "เนื้อหมู", roman: "neua muu", chinese: "猪肉", id: "neua-muu" },
  { thai: "กุ้งสด", roman: "gung sot", chinese: "鲜虾", id: "gung-sot" },
  { thai: "ปลาสด", roman: "bplaa sot", chinese: "鲜鱼", id: "bplaa-sot" },
  { thai: "ปลาหมึก", roman: "bplaa-meuk", chinese: "鱿鱼", id: "bplaa-meuk" },
  { thai: "เต้าหู้ขาว", roman: "dtao-huu khaao", chinese: "白豆腐", id: "dtao-huu-khaao" },
  { thai: "ไข่ไก่", roman: "khai gai", chinese: "鸡蛋", id: "khai-gai" },
  { thai: "มะนาว", roman: "ma-naao", chinese: "青柠", id: "ma-naao" },
];

const tools: readonly ToolItem[] = [
  { thai: "มีดเล่มเล็ก", roman: "miit lem lek", chinese: "小刀", id: "miit-lem-lek", actionThai: "หั่นผัก", actionRoman: "han phak", actionChinese: "切菜" },
  { thai: "เขียงไม้", roman: "khiiang maai", chinese: "木砧板", id: "khiiang-maai", actionThai: "หั่นเนื้อ", actionRoman: "han neua", actionChinese: "切肉" },
  { thai: "กระทะก้นลึก", roman: "gra-tha gon leuk", chinese: "深锅/炒锅", id: "gra-tha-gon-leuk", actionThai: "ผัดผัก", actionRoman: "phat phak", actionChinese: "炒菜" },
  { thai: "หม้อใบกลาง", roman: "maaw bai glaang", chinese: "中号锅", id: "maaw-bai-glaang", actionThai: "ต้มซุป", actionRoman: "dtom sup", actionChinese: "煮汤" },
  { thai: "ตะหลิวไม้", roman: "dta-liu maai", chinese: "木锅铲", id: "dta-liu-maai", actionThai: "คนข้าวผัด", actionRoman: "khon khaao phat", actionChinese: "翻炒炒饭" },
  { thai: "ทัพพีตักแกง", roman: "thap-phii dtak gaaeng", chinese: "舀汤勺", id: "thap-phii-dtak-gaaeng", actionThai: "ตักแกง", actionRoman: "dtak gaaeng", actionChinese: "盛咖喱/汤菜" },
  { thai: "ตะแกรงล้างผัก", roman: "dta-graaeng laang phak", chinese: "洗菜篮", id: "dta-graaeng-laang-phak", actionThai: "พักผักให้สะเด็ดน้ำ", actionRoman: "phak phak hai sa-det naam", actionChinese: "把菜沥干" },
  { thai: "ครกกับสาก", roman: "khrok gap saak", chinese: "臼和杵", id: "khrok-gap-saak", actionThai: "ตำพริก", actionRoman: "dtam phrik", actionChinese: "捣辣椒" },
  { thai: "ช้อนตวง", roman: "chaawn dtuang", chinese: "量勺", id: "chaawn-dtuang", actionThai: "ตวงน้ำปลา", actionRoman: "dtuang naam bplaa", actionChinese: "量鱼露" },
  { thai: "ถ้วยใบเล็ก", roman: "thuai bai lek", chinese: "小碗", id: "thuai-bai-lek", actionThai: "ผสมน้ำจิ้ม", actionRoman: "pha-som naam jim", actionChinese: "调蘸酱" },
  { thai: "กล่องใส่อาหาร", roman: "glaawng sai aa-haan", chinese: "饭盒", id: "glaawng-sai-aa-haan", actionThai: "เก็บข้าวที่เหลือ", actionRoman: "gep khaao thii leuua", actionChinese: "保存剩饭" },
  { thai: "ถุงซิป", roman: "thung sip", chinese: "密封袋", id: "thung-sip", actionThai: "เก็บผักสด", actionRoman: "gep phak sot", actionChinese: "保存新鲜蔬菜" },
  { thai: "ผ้ากันเปื้อน", roman: "phaa gan bpeuuan", chinese: "围裙", id: "phaa-gan-bpeuuan", actionThai: "กันเสื้อเปื้อน", actionRoman: "gan seua bpeuuan", actionChinese: "防止衣服弄脏" },
  { thai: "ฝาหม้อ", roman: "faa maaw", chinese: "锅盖", id: "faa-maaw", actionThai: "ปิดหม้อ", actionRoman: "bpit maaw", actionChinese: "盖锅" },
  { thai: "เตาแก๊ส", roman: "dtao gaaet", chinese: "燃气灶", id: "dtao-gaaet", actionThai: "ตั้งไฟกลาง", actionRoman: "dtang fai glaang", actionChinese: "开中火" },
  { thai: "เตาไฟฟ้า", roman: "dtao fai-faa", chinese: "电炉", id: "dtao-fai-faa", actionThai: "อุ่นอาหาร", actionRoman: "un aa-haan", actionChinese: "热饭菜" },
  { thai: "ไมโครเวฟ", roman: "mai-khroo-weep", chinese: "微波炉", id: "mai-khroo-weep", actionThai: "อุ่นข้าวที่เหลือ", actionRoman: "un khaao thii leuua", actionChinese: "加热剩饭" },
  { thai: "หม้อหุงข้าว", roman: "maaw hung khaao", chinese: "电饭锅", id: "maaw-hung-khaao", actionThai: "หุงข้าวเย็น", actionRoman: "hung khaao yen", actionChinese: "煮晚饭的米饭" },
  { thai: "ขวดน้ำมัน", roman: "khuat naam-man", chinese: "油瓶", id: "khuat-naam-man", actionThai: "ใส่น้ำมันนิดเดียว", actionRoman: "sai naam-man nit diao", actionChinese: "只放一点油" },
  { thai: "กระชอนเล็ก", roman: "gra-chaawn lek", chinese: "小滤网", id: "gra-chaawn-lek", actionThai: "กรองน้ำซุป", actionRoman: "graawng naam sup", actionChinese: "过滤汤" },
];

const directRows: readonly Definition[] = [
  { thai: "ล้างผักสองน้ำ", id: "laang-phak-saawng-naam", roman: "laang phak saawng naam", chinese: "把蔬菜洗两遍", partOfSpeech: "短语", theme: "食材处理", exampleThai: "ก่อนทำกับข้าว แม่ล้างผักสองน้ำ", exampleRoman: "gaawn tham gap-khaao, maae laang phak saawng naam", exampleChinese: "做菜前，妈妈把蔬菜洗两遍。", tag: "处理" },
  { thai: "แช่ผักในน้ำเกลือ", id: "chaae-phak-nai-naam-gleuua", roman: "chaae phak nai naam gleuua", chinese: "把菜泡在盐水里", partOfSpeech: "短语", theme: "食材处理", exampleThai: "ฉันแช่ผักในน้ำเกลือก่อนล้างอีกครั้ง", exampleRoman: "chan chaae phak nai naam gleuua gaawn laang iik khrang", exampleChinese: "我先把菜泡在盐水里，再洗一遍。", tag: "处理" },
  { thai: "ต้มไข่เจ็ดนาที", id: "dtom-khai-jet-naa-thii", roman: "dtom khai jet naa-thii", chinese: "煮鸡蛋七分钟", partOfSpeech: "短语", theme: "烹饪动作", exampleThai: "ถ้าอยากได้ไข่ไม่แข็งมาก ให้ต้มไข่เจ็ดนาที", exampleRoman: "thaa yaak dai khai mai khaeng maak, hai dtom khai jet naa-thii", exampleChinese: "如果想要鸡蛋不太硬，就煮七分钟。", tag: "煮" },
  { thai: "ทอดไข่ไฟอ่อน", id: "thaawt-khai-fai-aawn", roman: "thaawt khai fai aawn", chinese: "小火煎蛋", partOfSpeech: "短语", theme: "烹饪动作", exampleThai: "ตอนเช้าฉันทอดไข่ไฟอ่อนให้ลูก", exampleRoman: "dtaawn chaao chan thaawt khai fai aawn hai luuk", exampleChinese: "早上我用小火给孩子煎蛋。", tag: "煎炸" },
  { thai: "ผัดผักใส่น้ำมันน้อย", id: "phat-phak-sai-naam-man-naawy", roman: "phat phak sai naam-man naawy", chinese: "少油炒蔬菜", partOfSpeech: "短语", theme: "烹饪动作", exampleThai: "มื้อเย็นนี้เราผัดผักใส่น้ำมันน้อย", exampleRoman: "meu yen nii rao phat phak sai naam-man naawy", exampleChinese: "今天晚饭我们少油炒蔬菜。", tag: "炒" },
  { thai: "ต้มซุปให้เดือด", id: "dtom-sup-hai-deuuat", roman: "dtom sup hai deuuat", chinese: "把汤煮开", partOfSpeech: "短语", theme: "烹饪动作", exampleThai: "ต้องต้มซุปให้เดือดก่อนใส่ผัก", exampleRoman: "dtawng dtom sup hai deuuat gaawn sai phak", exampleChinese: "要先把汤煮开再放菜。", tag: "煮" },
  { thai: "ลดไฟหลังน้ำเดือด", id: "lot-fai-lang-naam-deuuat", roman: "lot fai lang naam deuuat", chinese: "水开后调小火", partOfSpeech: "短语", theme: "烹饪动作", exampleThai: "หลังน้ำเดือด ให้ลดไฟหลังน้ำเดือด", exampleRoman: "lang naam deuuat, hai lot fai lang naam deuuat", exampleChinese: "水开后，要把火调小。", tag: "火候" },
  { thai: "ปิดฝาหม้อไว้", id: "bpit-faa-maaw-wai", roman: "bpit faa maaw wai", chinese: "把锅盖盖上", partOfSpeech: "短语", theme: "厨房工具", exampleThai: "เวลาต้มแกง แม่ปิดฝาหม้อไว้", exampleRoman: "wee-laa dtom gaaeng, maae bpit faa maaw wai", exampleChinese: "煮汤菜时，妈妈把锅盖盖上。", tag: "工具" },
  { thai: "คนแกงเบา ๆ", id: "khon-gaaeng-bao-bao", roman: "khon gaaeng bao bao", chinese: "轻轻搅汤菜/咖喱", partOfSpeech: "短语", theme: "烹饪动作", exampleThai: "อย่าคนแรง ให้คนแกงเบา ๆ", exampleRoman: "yaa khon raaeng, hai khon gaaeng bao bao", exampleChinese: "不要用力搅，要轻轻搅汤菜/咖喱。", tag: "搅拌" },
  { thai: "ชิมรสก่อนเสิร์ฟ", id: "chim-rot-gaawn-soep", roman: "chim rot gaawn soep", chinese: "上桌前尝味道", partOfSpeech: "短语", theme: "口味调整", exampleThai: "แม่ชิมรสก่อนเสิร์ฟทุกครั้ง", exampleRoman: "maae chim rot gaawn soep thuk khrang", exampleChinese: "妈妈每次上桌前都尝味道。", tag: "调味" },
  { thai: "เติมน้ำปลานิดเดียว", id: "dteem-naam-bplaa-nit-diao", roman: "dteem naam bplaa nit diao", chinese: "加一点点鱼露", partOfSpeech: "短语", theme: "口味调整", exampleThai: "ถ้ารสอ่อน ให้เติมน้ำปลานิดเดียว", exampleRoman: "thaa rot aawn, hai dteem naam bplaa nit diao", exampleChinese: "如果味道淡，就加一点点鱼露。", tag: "调味" },
  { thai: "บีบมะนาวเพิ่ม", id: "biip-ma-naao-phoem", roman: "biip ma-naao phoem", chinese: "再挤点青柠", partOfSpeech: "短语", theme: "口味调整", exampleThai: "ต้มยำถ้วยนี้ยังไม่เปรี้ยว ต้องบีบมะนาวเพิ่ม", exampleRoman: "dtom-yam thuai nii yang mai bpriaao, dtawng biip ma-naao phoem", exampleChinese: "这碗冬阴功还不酸，要再挤点青柠。", tag: "调味" },
  { thai: "ใส่น้ำตาลน้อยลง", id: "sai-naam-dtaan-naawy-long", roman: "sai naam-dtaan naawy long", chinese: "少放糖", partOfSpeech: "短语", theme: "口味调整", exampleThai: "ครั้งหน้าใส่น้ำตาลน้อยลงจะดีกว่า", exampleRoman: "khrang naa sai naam-dtaan naawy long ja dii gwaa", exampleChinese: "下次少放糖会更好。", tag: "调味" },
  { thai: "ลดพริกลงหน่อย", id: "lot-phrik-long-naawy", roman: "lot phrik long naawy", chinese: "少放点辣椒", partOfSpeech: "短语", theme: "口味调整", exampleThai: "เด็กกินด้วย ช่วยลดพริกลงหน่อย", exampleRoman: "dek gin duai, chuai lot phrik long naawy", exampleChinese: "孩子也要吃，请少放点辣椒。", tag: "调味" },
  { thai: "เก็บแกงในตู้เย็น", id: "gep-gaaeng-nai-dtuu-yen", roman: "gep gaaeng nai dtuu-yen", chinese: "把汤菜/咖喱放进冰箱", partOfSpeech: "短语", theme: "剩饭保存", exampleThai: "ถ้ากินไม่หมด ให้เก็บแกงในตู้เย็น", exampleRoman: "thaa gin mai mot, hai gep gaaeng nai dtuu-yen", exampleChinese: "如果吃不完，就把汤菜/咖喱放进冰箱。", tag: "保存" },
  { thai: "แช่ข้าวที่เหลือ", id: "chaae-khaao-thii-leuua", roman: "chaae khaao thii leuua", chinese: "冷藏剩饭", partOfSpeech: "短语", theme: "剩饭保存", exampleThai: "ก่อนนอน แม่แช่ข้าวที่เหลือไว้ในกล่อง", exampleRoman: "gaawn naawn, maae chaae khaao thii leuua wai nai glaawng", exampleChinese: "睡前，妈妈把剩饭装盒冷藏。", tag: "保存" },
  { thai: "อุ่นกับข้าวเมื่อวาน", id: "un-gap-khaao-muea-waan", roman: "un gap-khaao muea-waan", chinese: "加热昨天的菜", partOfSpeech: "短语", theme: "剩饭保存", exampleThai: "มื้อเช้านี้ฉันอุ่นกับข้าวเมื่อวาน", exampleRoman: "meu chaao nii chan un gap-khaao muea-waan", exampleChinese: "今天早饭我加热昨天的菜。", tag: "保存" },
  { thai: "อย่าเก็บอาหารร้อนทันที", id: "yaa-gep-aa-haan-raawn-than-thii", roman: "yaa gep aa-haan raawn than-thii", chinese: "不要马上保存热食", partOfSpeech: "短语", theme: "剩饭保存", exampleThai: "อย่าเก็บอาหารร้อนทันที รอให้เย็นก่อน", exampleRoman: "yaa gep aa-haan raawn than-thii, raaw hai yen gaawn", exampleChinese: "不要马上保存热食，先等它凉。", tag: "保存" },
  { thai: "ข้าวผัดไข่ใส่ผัก", id: "khaao-phat-khai-sai-phak", roman: "khaao phat khai sai phak", chinese: "加蔬菜的鸡蛋炒饭", partOfSpeech: "名词", theme: "简单菜名", exampleThai: "คืนนี้ฉันทำข้าวผัดไข่ใส่ผักง่าย ๆ", exampleRoman: "khuen-nii chan tham khaao phat khai sai phak ngaai ngaai", exampleChinese: "今晚我做简单的加蔬菜鸡蛋炒饭。", tag: "菜名" },
  { thai: "ไข่เจียวหมูสับทำเอง", id: "khai-jiao-muu-sap-tham-eeng", roman: "khai jiao muu sap tham eeng", chinese: "自己做的猪肉末煎蛋", partOfSpeech: "名词", theme: "简单菜名", exampleThai: "เด็ก ๆ ชอบกินไข่เจียวหมูสับทำเองกับข้าวสวย", exampleRoman: "dek dek chaawp gin khai jiao muu sap tham eeng gap khaao suai", exampleChinese: "孩子们喜欢吃自己做的猪肉末煎蛋配米饭。", tag: "菜名" },
  { thai: "ต้มจืดเต้าหู้", id: "dtom-jeut-dtao-huu", roman: "dtom jeut dtao-huu", chinese: "豆腐清汤", partOfSpeech: "名词", theme: "简单菜名", exampleThai: "แม่ทำต้มจืดเต้าหู้รสอ่อนให้ยาย", exampleRoman: "maae tham dtom jeut dtao-huu rot aawn hai yaai", exampleChinese: "妈妈给外婆/奶奶做了味道清淡的豆腐清汤。", tag: "菜名" },
  { thai: "ผัดกะเพราไก่ไม่เผ็ด", id: "phat-ga-phrao-gai-mai-phet", roman: "phat ga-phrao gai mai phet", chinese: "不辣鸡肉罗勒炒", partOfSpeech: "名词", theme: "简单菜名", exampleThai: "ลูกขอผัดกะเพราไก่ไม่เผ็ดหนึ่งจาน", exampleRoman: "luuk khaaw phat ga-phrao gai mai phet neung jaan", exampleChinese: "孩子要一盘不辣的鸡肉罗勒炒。", tag: "菜名" },
  { thai: "แกงจืดผักกาดขาว", id: "gaaeng-jeut-phak-gaat-khaao", roman: "gaaeng jeut phak-gaat khaao", chinese: "白菜清汤", partOfSpeech: "名词", theme: "简单菜名", exampleThai: "ตอนเย็นเรากินแกงจืดผักกาดขาวกับปลา", exampleRoman: "dtaawn yen rao gin gaaeng jeut phak-gaat khaao gap bplaa", exampleChinese: "傍晚我们吃白菜清汤配鱼。", tag: "菜名" },
  { thai: "ล้างหม้อทันทีหลังใช้", id: "laang-maaw-than-thii-lang-chai", roman: "laang maaw than-thii lang chai", chinese: "用完后马上洗锅", partOfSpeech: "短语", theme: "厨房工具", exampleThai: "หลังทำแกงเสร็จ แม่ล้างหม้อทันทีหลังใช้", exampleRoman: "lang tham gaaeng set, maae laang maaw than-thii lang chai", exampleChinese: "做完汤菜后，妈妈用完锅就马上洗。", tag: "工具" },
  { thai: "เช็ดเขียงให้แห้ง", id: "chet-khiiang-hai-haaeng", roman: "chet khiiang hai haaeng", chinese: "把砧板擦干", partOfSpeech: "短语", theme: "厨房工具", exampleThai: "หลังล้างเขียง ต้องเช็ดเขียงให้แห้ง", exampleRoman: "lang laang khiiang, dtawng chet khiiang hai haaeng", exampleChinese: "洗完砧板后，要把砧板擦干。", tag: "工具" },
  { thai: "แยกเขียงผักกับเนื้อ", id: "yaaek-khiiang-phak-gap-neua", roman: "yaaek khiiang phak gap neua", chinese: "蔬菜和肉分开用砧板", partOfSpeech: "短语", theme: "食材处理", exampleThai: "เพื่อความสะอาด ควรแยกเขียงผักกับเนื้อ", exampleRoman: "phuea khwaam sa-aat, khuuan yaaek khiiang phak gap neua", exampleChinese: "为了干净，蔬菜和肉应该分开用砧板。", tag: "处理" },
  { thai: "ล้างมือก่อนทำอาหาร", id: "laang-mue-gaawn-tham-aa-haan", roman: "laang mue gaawn tham aa-haan", chinese: "做饭前洗手", partOfSpeech: "短语", theme: "在家做饭", exampleThai: "เด็ก ๆ ต้องล้างมือก่อนทำอาหารกับแม่", exampleRoman: "dek dek dtawng laang mue gaawn tham aa-haan gap maae", exampleChinese: "孩子们和妈妈做饭前要洗手。", tag: "做饭" },
  { thai: "เตรียมของก่อนเปิดไฟ", id: "dtriiam-khaawng-gaawn-bpoet-fai", roman: "dtriiam khaawng gaawn bpoet fai", chinese: "开火前先备料", partOfSpeech: "短语", theme: "在家做饭", exampleThai: "ก่อนผัดผัก ควรเตรียมของก่อนเปิดไฟ", exampleRoman: "gaawn phat phak, khuuan dtriiam khaawng gaawn bpoet fai", exampleChinese: "炒菜前，应该开火前先备料。", tag: "做饭" },
  { thai: "ตั้งกระทะให้ร้อน", id: "dtang-gra-tha-hai-raawn", roman: "dtang gra-tha hai raawn", chinese: "把锅烧热", partOfSpeech: "短语", theme: "烹饪动作", exampleThai: "ก่อนใส่น้ำมัน ให้ตั้งกระทะให้ร้อนก่อน", exampleRoman: "gaawn sai naam-man, hai dtang gra-tha hai raawn gaawn", exampleChinese: "放油前，先把锅烧热。", tag: "火候" },
  { thai: "ใส่ผักทีหลัง", id: "sai-phak-thii-lang", roman: "sai phak thii lang", chinese: "后放蔬菜", partOfSpeech: "短语", theme: "烹饪动作", exampleThai: "ถ้ากลัวผักนิ่มเกินไป ให้ใส่ผักทีหลัง", exampleRoman: "thaa glua phak nim goen bpai, hai sai phak thii lang", exampleChinese: "如果怕蔬菜太软，就后放蔬菜。", tag: "烹饪" },
  { thai: "ตักอาหารใส่จานกลาง", id: "dtak-aa-haan-sai-jaan-glaang", roman: "dtak aa-haan sai jaan glaang", chinese: "把菜盛到公用盘里", partOfSpeech: "短语", theme: "在家做饭", exampleThai: "หลังทำเสร็จ แม่ตักอาหารใส่จานกลาง", exampleRoman: "lang tham set, maae dtak aa-haan sai jaan glaang", exampleChinese: "做好后，妈妈把菜盛到公用盘里。", tag: "上桌" },
];

const prepRows = prepItems.map((item): Definition => ({
  thai: `หั่น${item.thai}เป็นชิ้นเล็ก`,
  id: `han-${item.id}-bpen-chin-lek`,
  roman: `han ${item.roman} bpen chin lek`,
  chinese: `把${item.chinese}切成小块`,
  partOfSpeech: "短语",
  theme: "食材处理",
  exampleThai: `ก่อนทำอาหาร ฉันหั่น${item.thai}เป็นชิ้นเล็ก`,
  exampleRoman: `gaawn tham aa-haan, chan han ${item.roman} bpen chin lek`,
  exampleChinese: `做饭前，我把${item.chinese}切成小块。`,
  tag: "切菜",
}));

const washRows = prepItems.slice(0, 22).map((item): Definition => ({
  thai: `ล้าง${item.thai}ให้สะอาด`,
  id: `laang-${item.id}-hai-sa-aat`,
  roman: `laang ${item.roman} hai sa-aat`,
  chinese: `把${item.chinese}洗干净`,
  partOfSpeech: "短语",
  theme: "食材处理",
  exampleThai: `แม่บอกให้ล้าง${item.thai}ให้สะอาดก่อนใส่จาน`,
  exampleRoman: `maae baawk hai laang ${item.roman} hai sa-aat gaawn sai jaan`,
  exampleChinese: `妈妈说把${item.chinese}洗干净后再放进盘子。`,
  tag: "清洗",
}));

const toolRows = tools.map((tool): Definition => ({
  thai: `ใช้${tool.thai}${tool.actionThai}`,
  id: `chai-${tool.id}-${tool.actionRoman.replace(/ /g, "-")}`,
  roman: `chai ${tool.roman} ${tool.actionRoman}`,
  chinese: `用${tool.chinese}${tool.actionChinese}`,
  partOfSpeech: "短语",
  theme: "厨房工具",
  exampleThai: `วันนี้ฉันใช้${tool.thai}${tool.actionThai}ในครัว`,
  exampleRoman: `wan-nii chan chai ${tool.roman} ${tool.actionRoman} nai khrua`,
  exampleChinese: `今天我在厨房用${tool.chinese}${tool.actionChinese}。`,
  tag: "工具",
}));

const rows: readonly Definition[] = [
  ...prepRows,
  ...washRows,
  ...toolRows,
  ...directRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "家庭做饭", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段可把“洗、切、炒、煮、调味、保存”与具体食材一起记，做饭时能直接套用。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于在家做饭、处理食材、使用厨房工具、调整口味、保存剩饭和说简单菜名。"],
    tags,
    sourceRefs: FOOD_COOKING_HOME_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_FOOD_COOKING_HOME_01 = rows.map(toCandidate);
