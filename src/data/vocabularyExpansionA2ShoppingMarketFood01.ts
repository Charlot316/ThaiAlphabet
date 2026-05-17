export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "市场" | "超市" | "价格" | "称重" | "砍价" | "付款" | "食材购买" | "商品品质" | "退换货";
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

type Item = { thai: string; roman: string; chinese: string; id: string };

const SHOPPING_MARKET_FOOD_REFS = ["thai-frequency", "thai-a2-shopping-market-food-candidate"];

const marketItems: readonly Item[] = [
  { thai: "ผักบุ้ง", roman: "phak-bung", chinese: "空心菜", id: "phak-bung" },
  { thai: "แตงกวา", roman: "dtaaeng-gwaa", chinese: "黄瓜", id: "dtaaeng-gwaa" },
  { thai: "มะเขือเทศ", roman: "ma-kheua-theet", chinese: "番茄", id: "ma-kheua-theet" },
  { thai: "พริกสด", roman: "phrik sot", chinese: "新鲜辣椒", id: "phrik-sot" },
  { thai: "กระเทียม", roman: "gra-thiiam", chinese: "蒜", id: "gra-thiiam" },
  { thai: "หัวหอม", roman: "hua-haawm", chinese: "洋葱", id: "hua-haawm" },
  { thai: "ขิงสด", roman: "khing sot", chinese: "鲜姜", id: "khing-sot" },
  { thai: "ตะไคร้", roman: "dta-khrai", chinese: "香茅", id: "dta-khrai" },
  { thai: "ใบกะเพรา", roman: "bai ga-phrao", chinese: "圣罗勒叶", id: "bai-ga-phrao" },
  { thai: "เห็ดฟาง", roman: "het faang", chinese: "草菇", id: "het-faang" },
  { thai: "ถั่วฝักยาว", roman: "thua-fak-yaao", chinese: "长豆角", id: "thua-fak-yaao" },
  { thai: "ฟักทอง", roman: "fak-thaawng", chinese: "南瓜", id: "fak-thaawng" },
  { thai: "มะนาว", roman: "ma-naao", chinese: "青柠", id: "ma-naao" },
  { thai: "กล้วยน้ำว้า", roman: "gluai naam waa", chinese: "泰式香蕉", id: "gluai-naam-waa" },
  { thai: "มะม่วงสุก", roman: "ma-muang suk", chinese: "熟芒果", id: "ma-muang-suk" },
  { thai: "สับปะรด", roman: "sap-bpa-rot", chinese: "菠萝", id: "sap-bpa-rot" },
  { thai: "มะละกอดิบ", roman: "ma-la-gaw dip", chinese: "生木瓜", id: "ma-la-gaw-dip" },
  { thai: "เนื้อหมูบด", roman: "neua muu bot", chinese: "猪肉末", id: "neua-muu-bot" },
  { thai: "อกไก่", roman: "ok gai", chinese: "鸡胸肉", id: "ok-gai" },
  { thai: "ปลาสด", roman: "bplaa sot", chinese: "鲜鱼", id: "bplaa-sot" },
  { thai: "กุ้งสด", roman: "gung sot", chinese: "鲜虾", id: "gung-sot" },
  { thai: "ไข่ไก่", roman: "khai gai", chinese: "鸡蛋", id: "khai-gai" },
  { thai: "เต้าหู้ขาว", roman: "dtao-huu khaao", chinese: "白豆腐", id: "dtao-huu-khaao" },
  { thai: "ข้าวสาร", roman: "khaao-saan", chinese: "米", id: "khaao-saan" },
];

const supermarketItems: readonly Item[] = [
  { thai: "น้ำปลา", roman: "naam bplaa", chinese: "鱼露", id: "naam-bplaa" },
  { thai: "ซีอิ๊วขาว", roman: "sii-iu khaao", chinese: "生抽", id: "sii-iu-khaao" },
  { thai: "น้ำมันพืช", roman: "naam-man pheut", chinese: "植物油", id: "naam-man-pheut" },
  { thai: "กะทิกล่อง", roman: "ga-thi glaawng", chinese: "盒装椰浆", id: "ga-thi-glaawng" },
  { thai: "นมจืด", roman: "nom jeut", chinese: "纯牛奶", id: "nom-jeut" },
  { thai: "โยเกิร์ต", roman: "yoo-goet", chinese: "酸奶", id: "yoo-goet" },
  { thai: "ขนมปังแผ่น", roman: "kha-nom bpang phaen", chinese: "切片面包", id: "kha-nom-bpang-phaen" },
  { thai: "บะหมี่กึ่งสำเร็จรูป", roman: "ba-mii geung sam-ret-ruup", chinese: "方便面", id: "ba-mii-geung-sam-ret-ruup" },
  { thai: "น้ำดื่มแพ็กใหญ่", roman: "naam deum phaaek yai", chinese: "大包装饮用水", id: "naam-deum-phaaek-yai" },
  { thai: "ทิชชู่ม้วน", roman: "thit-chuu muan", chinese: "卷纸", id: "thit-chuu-muan" },
  { thai: "ถุงขยะ", roman: "thung kha-ya", chinese: "垃圾袋", id: "thung-kha-ya" },
  { thai: "สบู่เหลว", roman: "sa-buu leeo", chinese: "沐浴露/液体皂", id: "sa-buu-leeo" },
  { thai: "ยาสีฟัน", roman: "yaa sii fan", chinese: "牙膏", id: "yaa-sii-fan" },
  { thai: "ผงซักฟอก", roman: "phong sak-faawk", chinese: "洗衣粉", id: "phong-sak-faawk" },
  { thai: "น้ำยาล้างจาน", roman: "naam-yaa laang jaan", chinese: "洗洁精", id: "naam-yaa-laang-jaan" },
  { thai: "ถ่านไฟฉาย", roman: "thaan fai-chaai", chinese: "电池", id: "thaan-fai-chaai" },
  { thai: "ถุงผ้า", roman: "thung phaa", chinese: "布袋", id: "thung-phaa" },
  { thai: "กล่องอาหาร", roman: "glaawng aa-haan", chinese: "饭盒", id: "glaawng-aa-haan" },
];

const weighingItems: readonly Item[] = [
  { thai: "มะม่วง", roman: "ma-muang", chinese: "芒果", id: "ma-muang" },
  { thai: "เงาะ", roman: "ngaw", chinese: "红毛丹", id: "ngaw" },
  { thai: "ลำไย", roman: "lam-yai", chinese: "龙眼", id: "lam-yai" },
  { thai: "มังคุด", roman: "mang-khut", chinese: "山竹", id: "mang-khut" },
  { thai: "ส้มเขียวหวาน", roman: "som khiaao-waan", chinese: "橘子", id: "som-khiaao-waan" },
  { thai: "องุ่น", roman: "a-ngun", chinese: "葡萄", id: "a-ngun" },
  { thai: "ชมพู่", roman: "chom-phuu", chinese: "莲雾", id: "chom-phuu" },
  { thai: "ลองกอง", roman: "laawng-gaawng", chinese: "龙贡果", id: "laawng-gaawng" },
  { thai: "กะหล่ำปลี", roman: "ga-lam bplii", chinese: "卷心菜", id: "ga-lam-bplii" },
  { thai: "แครอต", roman: "khae-raawt", chinese: "胡萝卜", id: "khae-raawt" },
  { thai: "มันฝรั่ง", roman: "man fa-rang", chinese: "土豆", id: "man-fa-rang" },
  { thai: "ถั่วงอก", roman: "thua-ngaawk", chinese: "豆芽", id: "thua-ngaawk" },
  { thai: "มะเขือยาว", roman: "ma-kheua yaao", chinese: "长茄子", id: "ma-kheua-yaao" },
  { thai: "ข้าวโพดอ่อน", roman: "khaao-phoot aawn", chinese: "小玉米", id: "khaao-phoot-aawn" },
  { thai: "ปลาหมึกสด", roman: "bplaa-meuk sot", chinese: "鲜鱿鱼", id: "bplaa-meuk-sot" },
  { thai: "หอยลาย", roman: "haawy laai", chinese: "花蛤", id: "haawy-laai" },
];

const paymentRows: readonly Definition[] = [
  { thai: "ถามราคาก่อนซื้อ", id: "thaam-raa-khaa-gaawn-seu", roman: "thaam raa-khaa gaawn seu", chinese: "买之前先问价格", partOfSpeech: "短语", theme: "价格", exampleThai: "ฉันถามราคาก่อนซื้อ เพราะบางร้านไม่ติดป้าย", exampleRoman: "chan thaam raa-khaa gaawn seu, phraw baang raan mai dtit bpaai", exampleChinese: "我买之前先问价格，因为有些店没有贴价签。", tag: "问价" },
  { thai: "ราคานี้ลดได้ไหม", id: "raa-khaa-nii-lot-dai-mai", roman: "raa-khaa nii lot dai mai", chinese: "这个价格能便宜吗", partOfSpeech: "短语", theme: "砍价", exampleThai: "ถ้าซื้อสองถุง ราคานี้ลดได้ไหมคะ", exampleRoman: "thaa seu saawng thung, raa-khaa nii lot dai mai kha", exampleChinese: "如果买两袋，这个价格能便宜吗？", tag: "砍价" },
  { thai: "ขอถูกกว่านี้หน่อย", id: "khaaw-thuuk-gwaa-nii-naawy", roman: "khaaw thuuk gwaa nii naawy", chinese: "请再便宜一点", partOfSpeech: "短语", theme: "砍价", exampleThai: "ขอถูกกว่านี้หน่อยได้ไหม ฉันซื้อหลายอย่าง", exampleRoman: "khaaw thuuk gwaa nii naawy dai mai, chan seu laai yaang", exampleChinese: "可以再便宜一点吗？我买好几样。", tag: "砍价" },
  { thai: "ลดให้ห้าบาท", id: "lot-hai-haa-baat", roman: "lot hai haa baat", chinese: "便宜五铢", partOfSpeech: "短语", theme: "砍价", exampleThai: "แม่ค้าลดให้ห้าบาท เพราะฉันซื้อประจำ", exampleRoman: "maae-khaa lot hai haa baat, phraw chan seu bpra-jam", exampleChinese: "摊主便宜了五铢，因为我常买。", tag: "砍价" },
  { thai: "ราคาสุทธิแล้ว", id: "raa-khaa-sut-thi-laaeo", roman: "raa-khaa sut-thi laaeo", chinese: "已经是实价了", partOfSpeech: "短语", theme: "价格", exampleThai: "คนขายบอกว่าราคาสุทธิแล้ว ลดไม่ได้", exampleRoman: "khon khaai baawk waa raa-khaa sut-thi laaeo, lot mai dai", exampleChinese: "卖家说已经是实价了，不能便宜。", tag: "价格" },
  { thai: "จ่ายเงินสดที่ตลาดเช้า", id: "jaai-ngoen-sot-thii-dta-laat-chaao", roman: "jaai ngoen sot thii dta-laat chaao", chinese: "在早市付现金", partOfSpeech: "短语", theme: "付款", exampleThai: "ร้านเล็กในตลาดรับเฉพาะจ่ายเงินสดที่ตลาดเช้า", exampleRoman: "raan lek nai dta-laat rap cha-phaw jaai ngoen sot thii dta-laat chaao", exampleChinese: "市场里的小店在早市只收现金。", tag: "付款" },
  { thai: "จ่ายผ่านมือถือ", id: "jaai-phaan-mue-theu", roman: "jaai phaan mue-theu", chinese: "用手机付款", partOfSpeech: "短语", theme: "付款", exampleThai: "ที่ซูเปอร์ฉันจ่ายผ่านมือถือได้สะดวกมาก", exampleRoman: "thii suu-bpooe chan jaai phaan mue-theu dai sa-duuak maak", exampleChinese: "在超市我可以用手机付款，很方便。", tag: "付款" },
  { thai: "สแกนจ่ายที่ร้านผลไม้", id: "sa-gaan-jaai-thii-raan-phon-la-maai", roman: "sa-gaan jaai thii raan phon-la-maai", chinese: "在水果店扫码支付", partOfSpeech: "短语", theme: "付款", exampleThai: "ร้านผลไม้ให้ลูกค้าสแกนจ่ายที่ร้านผลไม้ได้", exampleRoman: "raan phon-la-maai hai luuk-khaa sa-gaan jaai thii raan phon-la-maai dai", exampleChinese: "水果店让顾客可以在水果店扫码支付。", tag: "付款" },
  { thai: "รับบัตรไหม", id: "rap-bat-mai", roman: "rap bat mai", chinese: "收卡吗", partOfSpeech: "短语", theme: "付款", exampleThai: "ขอโทษค่ะ ร้านนี้รับบัตรไหม", exampleRoman: "khaaw-thoot kha, raan nii rap bat mai", exampleChinese: "不好意思，这家店收卡吗？", tag: "付款" },
  { thai: "เงินทอนไม่ครบ", id: "ngoen-thaawn-mai-khrop", roman: "ngoen thaawn mai khrop", chinese: "找零不够", partOfSpeech: "短语", theme: "付款", exampleThai: "ขอโทษครับ เงินทอนไม่ครบ ขาดไปสิบบาท", exampleRoman: "khaaw-thoot khrap, ngoen thaawn mai khrop, khaat bpai sip baat", exampleChinese: "不好意思，找零不够，少了十铢。", tag: "找零" },
  { thai: "ขอเงินทอนด้วย", id: "khaaw-ngoen-thaawn-duai", roman: "khaaw ngoen thaawn duai", chinese: "请找零", partOfSpeech: "短语", theme: "付款", exampleThai: "ฉันจ่ายแบงก์ร้อยและขอเงินทอนด้วย", exampleRoman: "chan jaai baaeng raawy lae khaaw ngoen thaawn duai", exampleChinese: "我付一百铢纸币，并请对方找零。", tag: "找零" },
  { thai: "ไม่มีเงินย่อย", id: "mai-mii-ngoen-yaawy", roman: "mai mii ngoen yaawy", chinese: "没有零钱", partOfSpeech: "短语", theme: "付款", exampleThai: "วันนี้ฉันไม่มีเงินย่อย จึงจ่ายผ่านมือถือ", exampleRoman: "wan-nii chan mai mii ngoen yaawy, jeung jaai phaan mue-theu", exampleChinese: "今天我没有零钱，所以用手机付款。", tag: "找零" },
  { thai: "รวมทั้งหมดเท่าไร", id: "ruam-thang-mot-thao-rai", roman: "ruam thang mot thao-rai", chinese: "一共多少钱", partOfSpeech: "短语", theme: "价格", exampleThai: "ผักกับไข่รวมทั้งหมดเท่าไรคะ", exampleRoman: "phak gap khai ruam thang mot thao-rai kha", exampleChinese: "蔬菜和鸡蛋一共多少钱？", tag: "价格" },
  { thai: "คิดเงินผิด", id: "khit-ngoen-phit", roman: "khit ngoen phit", chinese: "算错钱", partOfSpeech: "短语", theme: "付款", exampleThai: "พนักงานคิดเงินผิด จึงคืนเงินให้ฉัน", exampleRoman: "pha-nak-ngaan khit ngoen phit, jeung kheun ngoen hai chan", exampleChinese: "店员算错钱，所以把钱退给我。", tag: "付款" },
  { thai: "ขอใบเสร็จหน่อย", id: "khaaw-bai-set-naawy", roman: "khaaw bai-set naawy", chinese: "请给我收据", partOfSpeech: "短语", theme: "付款", exampleThai: "หลังจ่ายเงิน ฉันขอใบเสร็จหน่อย", exampleRoman: "lang jaai ngoen, chan khaaw bai-set naawy", exampleChinese: "付款后，我请对方给我收据。", tag: "收据" },
  { thai: "ใส่ถุงแยกกัน", id: "sai-thung-yaaek-gan", roman: "sai thung yaaek gan", chinese: "分开装袋", partOfSpeech: "短语", theme: "食材购买", exampleThai: "ช่วยใส่เนื้อกับผักถุงแยกกันได้ไหม", exampleRoman: "chuai sai neua gap phak thung yaaek gan dai mai", exampleChinese: "可以请你把肉和菜分开装袋吗？", tag: "装袋" },
  { thai: "ไม่เอาถุงพลาสติก", id: "mai-ao-thung-phlaat-dtik", roman: "mai ao thung phlaat-dtik", chinese: "不要塑料袋", partOfSpeech: "短语", theme: "食材购买", exampleThai: "ฉันมีถุงผ้าแล้ว ไม่เอาถุงพลาสติกค่ะ", exampleRoman: "chan mii thung phaa laaeo, mai ao thung phlaat-dtik kha", exampleChinese: "我有布袋了，不要塑料袋。", tag: "装袋" },
  { thai: "ของหมดแล้ว", id: "khaawng-mot-laaeo", roman: "khaawng mot laaeo", chinese: "东西卖完了", partOfSpeech: "短语", theme: "市场", exampleThai: "วันนี้ปลาสดของหมดแล้ว ต้องมาพรุ่งนี้", exampleRoman: "wan-nii bplaa sot khaawng mot laaeo, dtawng maa phrung-nii", exampleChinese: "今天鲜鱼卖完了，得明天来。", tag: "缺货" },
  { thai: "เหลือถุงสุดท้าย", id: "leuua-thung-sut-thaai", roman: "leuua thung sut-thaai", chinese: "只剩最后一袋", partOfSpeech: "短语", theme: "市场", exampleThai: "มะม่วงหวานเหลือถุงสุดท้ายแล้ว", exampleRoman: "ma-muang waan leuua thung sut-thaai laaeo", exampleChinese: "甜芒果只剩最后一袋了。", tag: "库存" },
  { thai: "จองไว้ก่อน", id: "jaawng-wai-gaawn", roman: "jaawng wai gaawn", chinese: "先预留", partOfSpeech: "短语", theme: "市场", exampleThai: "ถ้ายังไม่กลับบ้าน ขอจองไว้ก่อนหนึ่งถุง", exampleRoman: "thaa yang mai glap baan, khaaw jaawng wai gaawn neung thung", exampleChinese: "如果还不回家，我想先预留一袋。", tag: "预留" },
];

const qualityItems: readonly Item[] = [
  { thai: "มะม่วงลูกนี้", roman: "ma-muang luuk nii", chinese: "这个芒果", id: "ma-muang-luuk-nii" },
  { thai: "ปลาตัวนี้", roman: "bplaa dtua nii", chinese: "这条鱼", id: "bplaa-dtua-nii" },
  { thai: "กุ้งถุงนี้", roman: "gung thung nii", chinese: "这袋虾", id: "gung-thung-nii" },
  { thai: "ผักกำนี้", roman: "phak gam nii", chinese: "这把菜", id: "phak-gam-nii" },
  { thai: "ไข่กล่องนี้", roman: "khai glaawng nii", chinese: "这盒鸡蛋", id: "khai-glaawng-nii" },
  { thai: "นมขวดนี้", roman: "nom khuat nii", chinese: "这瓶牛奶", id: "nom-khuat-nii" },
  { thai: "ขนมถุงนี้", roman: "kha-nom thung nii", chinese: "这袋零食", id: "kha-nom-thung-nii" },
  { thai: "ข้าวสารถุงนี้", roman: "khaao-saan thung nii", chinese: "这袋米", id: "khaao-saan-thung-nii" },
  { thai: "น้ำมันขวดนี้", roman: "naam-man khuat nii", chinese: "这瓶油", id: "naam-man-khuat-nii" },
  { thai: "กล่องอาหารใบนี้", roman: "glaawng aa-haan bai nii", chinese: "这个饭盒", id: "glaawng-aa-haan-bai-nii" },
  { thai: "ถุงผ้าใบนี้", roman: "thung phaa bai nii", chinese: "这个布袋", id: "thung-phaa-bai-nii" },
  { thai: "กระป๋องนี้", roman: "gra-bpaawng nii", chinese: "这个罐头", id: "gra-bpaawng-nii" },
  { thai: "ซอสขวดนี้", roman: "saawt khuat nii", chinese: "这瓶酱", id: "saawt-khuat-nii" },
  { thai: "ข้าวกล่องนี้", roman: "khaao glaawng nii", chinese: "这盒饭", id: "khaao-glaawng-nii" },
  { thai: "แตงโมลูกนี้", roman: "dtaaeng-moo luuk nii", chinese: "这个西瓜", id: "dtaaeng-moo-luuk-nii" },
  { thai: "หมูชิ้นนี้", roman: "muu chin nii", chinese: "这块猪肉", id: "muu-chin-nii" },
  { thai: "ไก่แพ็กนี้", roman: "gai phaaek nii", chinese: "这盒鸡肉", id: "gai-phaaek-nii" },
  { thai: "ขวดน้ำใบนี้", roman: "khuat naam bai nii", chinese: "这个水瓶", id: "khuat-naam-bai-nii" },
];

const marketPurchaseRows = marketItems.map((item): Definition => ({
  thai: `ซื้อ${item.thai}ที่ตลาดเช้า`,
  id: `seu-${item.id}-thii-dta-laat-chaao`,
  roman: `seu ${item.roman} thii dta-laat chaao`,
  chinese: `在早市买${item.chinese}`,
  partOfSpeech: "短语",
  theme: "食材购买",
  exampleThai: `แม่ซื้อ${item.thai}ที่ตลาดเช้า เพราะวันนี้ของสดมาก`,
  exampleRoman: `maae seu ${item.roman} thii dta-laat chaao, phraw wan-nii khaawng sot maak`,
  exampleChinese: `妈妈在早市买${item.chinese}，因为今天东西很新鲜。`,
  tag: "食材",
}));

const supermarketRows = supermarketItems.map((item): Definition => ({
  thai: `เช็กราคา${item.thai}ในซูเปอร์`,
  id: `chek-raa-khaa-${item.id}-nai-suu-bpooe`,
  roman: `chek raa-khaa ${item.roman} nai suu-bpooe`,
  chinese: `在超市查${item.chinese}价格`,
  partOfSpeech: "短语",
  theme: "超市",
  exampleThai: `ก่อนซื้อ ฉันเช็กราคา${item.thai}ในซูเปอร์ก่อน`,
  exampleRoman: `gaawn seu, chan chek raa-khaa ${item.roman} nai suu-bpooe gaawn`,
  exampleChinese: `购买前，我先在超市查${item.chinese}的价格。`,
  tag: "超市",
}));

const weighingRows = weighingItems.map((item): Definition => ({
  thai: `ชั่ง${item.thai}ครึ่งกิโล`,
  id: `chang-${item.id}-khreung-gi-loo`,
  roman: `chang ${item.roman} khreung gi-loo`,
  chinese: `称半公斤${item.chinese}`,
  partOfSpeech: "短语",
  theme: "称重",
  exampleThai: `ช่วยชั่ง${item.thai}ครึ่งกิโลให้หน่อยค่ะ`,
  exampleRoman: `chuai chang ${item.roman} khreung gi-loo hai naawy kha`,
  exampleChinese: `请帮我称半公斤${item.chinese}。`,
  tag: "称重",
}));

const qualityRows = qualityItems.map((item): Definition => ({
  thai: `ขอเปลี่ยน${item.thai}`,
  id: `khaaw-bplian-${item.id}`,
  roman: `khaaw bplian ${item.roman}`,
  chinese: `请求换${item.chinese}`,
  partOfSpeech: "短语",
  theme: "退换货",
  exampleThai: `${item.thai}มีปัญหา ขอเปลี่ยน${item.thai}ได้ไหม`,
  exampleRoman: `${item.roman} mii bpan-haa, khaaw bplian ${item.roman} dai mai`,
  exampleChinese: `${item.chinese}有问题，可以请求换一下吗？`,
  tag: "退换",
}));

const rows: readonly Definition[] = [
  ...marketPurchaseRows,
  ...supermarketRows,
  ...weighingRows,
  ...paymentRows,
  ...qualityRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "购物市场食材", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段适合把购物动作和具体食材、价格、重量、付款方式一起记忆。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于市场、超市、称重、问价、砍价、付款、找零和基础退换货场景。"],
    tags,
    sourceRefs: SHOPPING_MARKET_FOOD_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SHOPPING_MARKET_FOOD_01 = rows.map(toCandidate);
