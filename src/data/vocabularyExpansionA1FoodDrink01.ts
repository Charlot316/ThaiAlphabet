export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "三餐" | "主食菜品" | "饮料" | "味道" | "点餐" | "餐具" | "厨房基础" | "厨房动作";
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
  level: "a1";
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

type Row = readonly [thai: string, id: string, roman: string, chinese: string, partOfSpeech: VocabularyExpansionPartOfSpeech, theme: VocabularyExpansionTheme, exampleThai: string, exampleRoman: string, exampleChinese: string, tag: string];

const FOOD_DRINK_REFS = ["thai-frequency", "thai-a1-food-drink-candidate"];

const rows = [
  ["ข้าวเช้าร้อน ๆ", "khaao-chaao-raawn-raawn", "khaao chaao raawn raawn", "热乎乎的早餐", "名词", "三餐", "แม่ทำข้าวเช้าร้อน ๆ ให้ทุกคน", "maae tham khaao chaao raawn raawn hai thuk khon", "妈妈给大家做热乎乎的早餐。", "meal"],
  ["ข้าวกลางวันง่าย ๆ", "khaao-glaang-wan-ngaai-ngaai", "khaao glaang-wan ngaai ngaai", "简单午饭", "名词", "三餐", "วันนี้ฉันกินข้าวกลางวันง่าย ๆ ที่โรงเรียน", "wan-nii chan gin khaao glaang-wan ngaai ngaai thii roong-riian", "今天我在学校吃简单午饭。", "meal"],
  ["ข้าวเย็นที่บ้าน", "khaao-yen-thii-baan", "khaao yen thii baan", "在家的晚饭", "名词", "三餐", "เรากินข้าวเย็นที่บ้านตอนหกโมง", "rao gin khaao yen thii baan dtaawn hok moong", "我们六点在家吃晚饭。", "meal"],
  ["มื้อเช้า", "mue-chaao", "mue chaao", "早餐这一餐", "名词", "三餐", "มื้อเช้าวันนี้มีไข่และนม", "mue chaao wan-nii mii khai lae nom", "今天早餐有鸡蛋和牛奶。", "meal"],
  ["มื้อกลางวัน", "mue-glaang-wan", "mue glaang-wan", "午餐这一餐", "名词", "三餐", "มื้อกลางวันของฉันเป็นข้าวผัด", "mue glaang-wan khaawng chan bpen khaao phat", "我的午餐是炒饭。", "meal"],
  ["มื้อเย็น", "mue-yen", "mue yen", "晚餐这一餐", "名词", "三餐", "มื้อเย็นวันนี้เผ็ดนิดหน่อย", "mue yen wan-nii phet nit naawy", "今天晚餐有点辣。", "meal"],
  ["ข้าวสวยร้อน", "khaao-suai-raawn", "khaao suai raawn", "热白米饭", "名词", "主食菜品", "ฉันอยากได้ข้าวสวยร้อนหนึ่งจาน", "chan yaak dai khaao suai raawn neung jaan", "我想要一盘热白米饭。", "rice"],
  ["ข้าวผัดไข่", "khaao-phat-khai", "khaao phat khai", "鸡蛋炒饭", "名词", "主食菜品", "เด็ก ๆ ชอบกินข้าวผัดไข่", "dek dek chaawp gin khaao phat khai", "孩子们喜欢吃鸡蛋炒饭。", "rice"],
  ["ข้าวผัดไก่", "khaao-phat-gai", "khaao phat gai", "鸡肉炒饭", "名词", "主食菜品", "พ่อสั่งข้าวผัดไก่ให้ฉัน", "phaaw sang khaao phat gai hai chan", "爸爸给我点了鸡肉炒饭。", "rice"],
  ["ข้าวไข่เจียว", "khaao-khai-jiaao", "khaao khai jiaao", "煎蛋盖饭", "名词", "主食菜品", "ข้าวไข่เจียวจานนี้หอมมาก", "khaao khai jiaao jaan nii haawm maak", "这盘煎蛋盖饭很香。", "rice"],
  ["ข้าวไข่ดาว", "khaao-khai-daao", "khaao khai daao", "煎蛋盖饭；太阳蛋饭", "名词", "主食菜品", "น้องชายกินข้าวไข่ดาวก่อนเข้าเรียน", "naawng-chaai gin khaao khai daao gaawn khao riian", "弟弟上课前吃煎蛋盖饭。", "rice"],
  ["ข้าวมันไก่", "khaao-man-gai", "khaao man gai", "海南鸡饭；鸡油饭", "名词", "主食菜品", "ร้านนี้ขายข้าวมันไก่ตอนเช้า", "raan nii khaai khaao man gai dtaawn chaao", "这家店早上卖鸡油饭。", "rice"],
  ["ข้าวหมูทอด", "khaao-muu-thaawt", "khaao muu thaawt", "炸猪肉饭", "名词", "主食菜品", "ฉันซื้อข้าวหมูทอดกลับบ้าน", "chan sue khaao muu thaawt glap baan", "我买炸猪肉饭回家。", "rice"],
  ["ข้าวไก่ย่าง", "khaao-gai-yaang", "khaao gai yaang", "烤鸡饭", "名词", "主食菜品", "ข้าวไก่ย่างไม่เผ็ดมาก", "khaao gai yaang mai phet maak", "烤鸡饭不太辣。", "rice"],
  ["ข้าวต้มปลา", "khaao-dtom-bplaa", "khaao dtom bplaa", "鱼粥；鱼泡饭", "名词", "主食菜品", "ตอนป่วยฉันกินข้าวต้มปลา", "dtaawn bpuai chan gin khaao dtom bplaa", "生病时我吃鱼粥。", "rice"],
  ["โจ๊กหมู", "jook-muu", "jook muu", "猪肉粥", "名词", "主食菜品", "ตอนเช้าคุณยายชอบกินโจ๊กหมู", "dtaawn chaao khun-yaai chaawp gin jook muu", "早上外婆喜欢吃猪肉粥。", "rice"],
  ["ก๋วยเตี๋ยวน้ำ", "guai-dtiaao-naam", "guai-dtiaao naam", "汤面", "名词", "主食菜品", "ฉันสั่งก๋วยเตี๋ยวน้ำหนึ่งชาม", "chan sang guai-dtiaao naam neung chaam", "我点了一碗汤面。", "noodle"],
  ["ก๋วยเตี๋ยวแห้ง", "guai-dtiaao-haaeng", "guai-dtiaao haaeng", "干拌面", "名词", "主食菜品", "พี่ชายชอบก๋วยเตี๋ยวแห้งมากกว่าแบบน้ำ", "phii-chaai chaawp guai-dtiaao haaeng maak-gwaa baaep naam", "哥哥更喜欢干拌面，不太喜欢汤面。", "noodle"],
  ["บะหมี่หมูแดง", "ba-mii-muu-daaeng", "ba-mii muu daaeng", "叉烧蛋面", "名词", "主食菜品", "บะหมี่หมูแดงชามนี้อร่อย", "ba-mii muu daaeng chaam nii a-raawy", "这碗叉烧蛋面很好吃。", "noodle"],
  ["ผัดไทยกุ้ง", "phat-thai-gung", "phat thai gung", "虾仁泰式炒河粉", "名词", "主食菜品", "นักท่องเที่ยวหลายคนอยากลองผัดไทยกุ้ง", "nak-thaawng-thiaao laai khon yaak laawng phat thai gung", "很多游客想尝虾仁泰式炒河粉。", "noodle"],
  ["ส้มตำไทย", "som-dtam-thai", "som dtam thai", "泰式青木瓜沙拉", "名词", "主食菜品", "ส้มตำไทยจานนี้เปรี้ยวหวานดี", "som dtam thai jaan nii bpriao waan dii", "这盘泰式青木瓜沙拉酸甜正好。", "dish"],
  ["ต้มยำกุ้ง", "dtom-yam-gung", "dtom yam gung", "冬阴功虾汤", "名词", "主食菜品", "ต้มยำกุ้งร้อน ๆ มีกลิ่นหอม", "dtom yam gung raawn raawn mii glin haawm", "热腾腾的冬阴功虾汤很香。", "soup"],
  ["แกงเขียวหวานไก่", "gaaeng-khiaao-waan-gai", "gaaeng khiaao waan gai", "绿咖喱鸡", "名词", "主食菜品", "แกงเขียวหวานไก่กินกับข้าวสวยอร่อย", "gaaeng khiaao waan gai gin gap khaao suai a-raawy", "绿咖喱鸡配白米饭很好吃。", "curry"],
  ["แกงจืดเต้าหู้", "gaaeng-jeut-dtao-huu", "gaaeng jeut dtao-huu", "豆腐清汤", "名词", "主食菜品", "เด็กเล็กกินแกงจืดเต้าหู้ได้", "dek lek gin gaaeng jeut dtao-huu dai", "小孩可以吃豆腐清汤。", "soup"],
  ["ซุปไก่", "sup-gai", "sup gai", "鸡汤", "名词", "主食菜品", "แม่ทำซุปไก่ให้คนป่วย", "maae tham sup gai hai khon bpuai", "妈妈给病人做鸡汤。", "soup"],
  ["ไข่ต้ม", "khai-dtom", "khai dtom", "煮鸡蛋", "名词", "主食菜品", "มื้อเช้ามีไข่ต้มสองฟอง", "mue chaao mii khai dtom saawng faawng", "早餐有两个煮鸡蛋。", "egg"],
  ["ไข่เจียวหมูสับ", "khai-jiaao-muu-sap", "khai jiaao muu sap", "猪肉末煎蛋", "名词", "主食菜品", "ไข่เจียวหมูสับกินกับข้าวร้อน ๆ", "khai jiaao muu sap gin gap khaao raawn raawn", "猪肉末煎蛋配热米饭吃。", "egg"],
  ["ไข่ดาวไม่สุก", "khai-daao-mai-suk", "khai daao mai suk", "半熟煎蛋", "名词", "主食菜品", "เขาชอบไข่ดาวไม่สุกบนข้าวผัด", "khao chaawp khai daao mai suk bon khaao phat", "他喜欢炒饭上的半熟煎蛋。", "egg"],
  ["ไก่ทอดกรอบ", "gai-thaawt-graawp", "gai thaawt graawp", "酥脆炸鸡", "名词", "主食菜品", "ไก่ทอดกรอบจานนี้ร้อนมาก", "gai thaawt graawp jaan nii raawn maak", "这盘酥脆炸鸡很烫。", "meat"],
  ["ปลาเผาเกลือ", "bplaa-phao-gluea", "bplaa phao gluea", "盐烤鱼", "名词", "主食菜品", "พ่อซื้อปลาเผาเกลือจากตลาด", "phaaw sue bplaa phao gluea jaak dta-laat", "爸爸从市场买了盐烤鱼。", "fish"],
  ["หมูย่างนุ่ม", "muu-yaang-num", "muu yaang num", "软嫩烤猪肉", "名词", "主食菜品", "หมูย่างนุ่มกินกับน้ำจิ้มอร่อย", "muu yaang num gin gap naam-jim a-raawy", "软嫩烤猪肉蘸酱很好吃。", "meat"],
  ["ผักสด", "phak-sot", "phak sot", "新鲜蔬菜", "名词", "主食菜品", "ร้านนี้ให้ผักสดฟรีหนึ่งจาน", "raan nii hai phak sot frii neung jaan", "这家店免费给一盘新鲜蔬菜。", "vegetable"],
  ["ผักต้ม", "phak-dtom", "phak dtom", "煮蔬菜", "名词", "主食菜品", "คุณยายกินผักต้มกับน้ำพริก", "khun-yaai gin phak dtom gap naam-phrik", "外婆吃煮蔬菜配辣酱。", "vegetable"],
  ["แตงกวาเย็น", "dtaaeng-gwaa-yen", "dtaaeng-gwaa yen", "凉黄瓜", "名词", "主食菜品", "แตงกวาเย็นช่วยให้ข้าวมันไก่อร่อยขึ้น", "dtaaeng-gwaa yen chuai hai khaao man gai a-raawy kheun", "凉黄瓜让鸡油饭更好吃。", "vegetable"],
  ["ผลไม้สด", "phon-la-maai-sot", "phon-la-maai sot", "新鲜水果", "名词", "主食菜品", "หลังอาหารเย็นเรากินผลไม้สด", "lang aa-haan yen rao gin phon-la-maai sot", "晚饭后我们吃新鲜水果。", "fruit"],
  ["กล้วยหอม", "gluai-haawm", "gluai haawm", "香 banana；香甜香蕉", "名词", "主食菜品", "ฉันกินกล้วยหอมหนึ่งลูกตอนเช้า", "chan gin gluai haawm neung luuk dtaawn chaao", "我早上吃一根香甜香蕉。", "fruit"],
  ["แตงโมเย็น", "dtaaeng-moo-yen", "dtaaeng-moo yen", "冰凉西瓜", "名词", "主食菜品", "แตงโมเย็นหวานมากในวันที่ร้อน", "dtaaeng-moo yen waan maak nai wan thii raawn", "热天里冰凉西瓜很甜。", "fruit"],
  ["มะม่วงสุก", "ma-muang-suk", "ma-muang suk", "熟芒果", "名词", "主食菜品", "มะม่วงสุกลูกนี้สีเหลืองสวย", "ma-muang suk luuk nii sii leuang suai", "这个熟芒果黄色很好看。", "fruit"],
  ["สับปะรดหวาน", "sap-bpa-rot-waan", "sap-bpa-rot waan", "甜菠萝", "名词", "主食菜品", "สับปะรดหวานอยู่ในจานสีขาว", "sap-bpa-rot waan yuu nai jaan sii khaao", "甜菠萝在白盘子里。", "fruit"],
  ["น้ำเปล่าเย็น", "naam-bplao-yen", "naam bplao yen", "冰水；冷白水", "名词", "饮料", "ขอน้ำเปล่าเย็นหนึ่งแก้วค่ะ", "khaaw naam bplao yen neung gaaeo kha", "请给我一杯冰水。", "drink"],
  ["น้ำอุ่นหนึ่งแก้ว", "naam-un-neung-gaaeo", "naam un neung gaaeo", "一杯温水", "名词", "饮料", "ตอนเช้าฉันดื่มน้ำอุ่นหนึ่งแก้ว", "dtaawn chaao chan deum naam un neung gaaeo", "早上我喝一杯温水。", "drink"],
  ["น้ำแข็งเปล่า", "naam-khaeng-bplao", "naam khaeng bplao", "纯冰块；不加饮料的冰", "名词", "饮料", "ร้านนี้ให้น้ำแข็งเปล่าฟรี", "raan nii hai naam khaeng bplao frii", "这家店免费给冰块。", "drink"],
  ["ชาเย็นหวานน้อย", "chaa-yen-waan-naawy", "chaa yen waan naawy", "少糖冰奶茶", "名词", "饮料", "ฉันสั่งชาเย็นหวานน้อยหนึ่งแก้ว", "chan sang chaa yen waan naawy neung gaaeo", "我点了一杯少糖冰奶茶。", "drink"],
  ["กาแฟร้อนแก้วเล็ก", "gaa-faae-raawn-gaaeo-lek", "gaa-faae raawn gaaeo lek", "一小杯热咖啡", "名词", "饮料", "พ่อดื่มกาแฟร้อนตอนเช้า", "phaaw deum gaa-faae raawn dtaawn chaao", "爸爸早上喝热咖啡。", "drink"],
  ["กาแฟเย็นแก้วนี้", "gaa-faae-yen-gaaeo-nii", "gaa-faae yen gaaeo nii", "这杯冰咖啡", "名词", "饮料", "กาแฟเย็นแก้วนี้หวานมาก", "gaa-faae yen gaaeo nii waan maak", "这杯冰咖啡很甜。", "drink"],
  ["นมสดเย็น", "nom-sot-yen", "nom sot yen", "冰鲜奶", "名词", "饮料", "เด็ก ๆ ชอบดื่มนมสดเย็น", "dek dek chaawp deum nom sot yen", "孩子们喜欢喝冰鲜奶。", "drink"],
  ["น้ำส้มคั้น", "naam-som-khan", "naam som khan", "鲜榨橙汁", "名词", "饮料", "น้ำส้มคั้นแก้วนี้ไม่ใส่น้ำตาล", "naam som khan gaaeo nii mai sai naam-dtaan", "这杯鲜榨橙汁不加糖。", "drink"],
  ["น้ำผลไม้รวม", "naam-phon-la-maai-ruam", "naam phon-la-maai ruam", "混合果汁", "名词", "饮料", "เธอสั่งน้ำผลไม้รวมหลังอาหาร", "thoe sang naam phon-la-maai ruam lang aa-haan", "她饭后点了混合果汁。", "drink"],
  ["น้ำมะพร้าวสด", "naam-ma-phraao-sot", "naam ma-phraao sot", "新鲜椰子水", "名词", "饮料", "น้ำมะพร้าวสดเย็นและหอม", "naam ma-phraao sot yen lae haawm", "新鲜椰子水冰凉又香。", "drink"],
  ["ของหวานไทย", "khaawng-waan-thai", "khaawng waan thai", "泰式甜点", "名词", "主食菜品", "หลังมื้อเย็นเรากินของหวานไทย", "lang mue yen rao gin khaawng waan thai", "晚餐后我们吃泰式甜点。", "dessert"],
  ["ขนมปังปิ้ง", "kha-nom-bpang-bping", "kha-nom bpang bping", "烤面包", "名词", "主食菜品", "ขนมปังปิ้งกับนมเป็นมื้อเช้าง่าย ๆ", "kha-nom bpang bping gap nom bpen mue chaao ngaai ngaai", "烤面包配牛奶是一顿简单早餐。", "bread"],
  ["ขนมหวาน", "kha-nom-waan", "kha-nom waan", "甜点；甜食", "名词", "主食菜品", "อย่ากินขนมหวานมากเกินไป", "yaa gin kha-nom waan maak goen bpai", "不要吃太多甜食。", "dessert"],
  ["ไอศกรีมกะทิ", "ai-sa-griim-ga-thi", "ai-sa-griim ga-thi", "椰奶冰淇淋", "名词", "主食菜品", "ไอศกรีมกะทิเย็นและหวาน", "ai-sa-griim ga-thi yen lae waan", "椰奶冰淇淋冰凉又甜。", "dessert"],
  ["รสหวาน", "rot-waan", "rot waan", "甜味", "名词", "味道", "เด็กหลายคนชอบรสหวาน", "dek laai khon chaawp rot waan", "很多孩子喜欢甜味。", "taste"],
  ["รสเปรี้ยว", "rot-bpriao", "rot bpriao", "酸味", "名词", "味道", "มะนาวมีรสเปรี้ยวมาก", "ma-naao mii rot bpriao maak", "青柠味道很酸。", "taste"],
  ["รสเค็ม", "rot-khem", "rot khem", "咸味", "名词", "味道", "ซุปนี้มีรสเค็มนิดหน่อย", "sup nii mii rot khem nit naawy", "这汤有点咸。", "taste"],
  ["รสเผ็ด", "rot-phet", "rot phet", "辣味", "名词", "味道", "ฉันกินรสเผ็ดได้นิดหน่อย", "chan gin rot phet dai nit naawy", "我能吃一点辣味。", "taste"],
  ["รสจืด", "rot-jeut", "rot jeut", "淡味；清淡", "名词", "味道", "แกงจืดมีรสจืดและกินง่าย", "gaaeng jeut mii rot jeut lae gin ngaai", "清汤味道清淡，容易吃。", "taste"],
  ["หวานน้อย", "waan-naawy", "waan naawy", "少甜；少糖", "形容词", "味道", "ขอชาเย็นหวานน้อยได้ไหม", "khaaw chaa yen waan naawy dai mai", "可以要少糖冰奶茶吗？", "taste"],
  ["ไม่ใส่น้ำตาล", "mai-sai-naam-dtaan", "mai sai naam-dtaan", "不加糖", "短语", "点餐", "กาแฟแก้วนี้ไม่ใส่น้ำตาล", "gaa-faae gaaeo nii mai sai naam-dtaan", "这杯咖啡不加糖。", "order"],
  ["ไม่ใส่น้ำแข็ง", "mai-sai-naam-khaeng", "mai sai naam khaeng", "不加冰", "短语", "点餐", "ขอน้ำส้มไม่ใส่น้ำแข็งค่ะ", "khaaw naam som mai sai naam khaeng kha", "请给我不加冰的橙汁。", "order"],
  ["ใส่พริกน้อย", "sai-phrik-naawy", "sai phrik naawy", "少放辣椒", "短语", "点餐", "ส้มตำจานนี้ใส่พริกน้อยนะคะ", "som-dtam jaan nii sai phrik naawy na kha", "这盘青木瓜沙拉请少放辣椒。", "order"],
  ["ไม่เผ็ด", "mai-phet", "mai phet", "不辣", "形容词", "味道", "ขอเมนูไม่เผ็ดสำหรับเด็ก", "khaaw mee-nuu mai phet sam-rap dek", "请给孩子不辣的菜单。", "taste"],
  ["เผ็ดมาก", "phet-maak", "phet maak", "很辣", "形容词", "味道", "แกงถ้วยนี้เผ็ดมาก ฉันดื่มน้ำเยอะ", "gaaeng thuai nii phet maak, chan deum naam yoe", "这碗咖喱很辣，我喝很多水。", "taste"],
  ["อร่อยมาก", "a-raawy-maak", "a-raawy maak", "很好吃", "形容词", "味道", "ข้าวผัดร้านนี้อร่อยมาก", "khaao phat raan nii a-raawy maak", "这家店的炒饭很好吃。", "taste"],
  ["ไม่อร่อย", "mai-a-raawy", "mai a-raawy", "不好吃", "形容词", "味道", "ซุปนี้เย็นแล้วและไม่อร่อย", "sup nii yen laaeo lae mai a-raawy", "这汤已经凉了，不好吃。", "taste"],
  ["หอมดี", "haawm-dii", "haawm dii", "很香；香得不错", "形容词", "味道", "กาแฟร้อนแก้วนี้หอมดี", "gaa-faae raawn gaaeo nii haawm dii", "这杯热咖啡很香。", "taste"],
  ["จานข้าว", "jaan-khaao", "jaan khaao", "饭盘；餐盘", "名词", "餐具", "จานข้าวอยู่บนโต๊ะอาหาร", "jaan khaao yuu bon dto aa-haan", "餐盘在餐桌上。", "tableware"],
  ["ชามก๋วยเตี๋ยว", "chaam-guai-dtiaao", "chaam guai-dtiaao", "面碗", "名词", "餐具", "ชามก๋วยเตี๋ยวร้อนมาก อย่าจับ", "chaam guai-dtiaao raawn maak, yaa jap", "面碗很烫，不要碰。", "tableware"],
  ["แก้วน้ำของฉัน", "gaaeo-naam-khaawng-chan", "gaaeo naam khaawng chan", "我的水杯", "名词", "餐具", "แก้วน้ำของฉันอยู่ข้างจาน", "gaaeo naam khaawng chan yuu khaang jaan", "我的水杯在盘子旁边。", "tableware"],
  ["ช้อนส้อม", "chaawn-saawm", "chaawn saawm", "勺叉；餐具", "名词", "餐具", "ร้านนี้วางช้อนส้อมไว้บนโต๊ะ", "raan nii waang chaawn saawm wai bon dto", "这家店把勺叉放在桌上。", "tableware"],
  ["ตะเกียบไม้", "dta-giiap-mai", "dta-giiap mai", "木筷子", "名词", "餐具", "ฉันใช้ตะเกียบไม้กินก๋วยเตี๋ยว", "chan chai dta-giiap mai gin guai-dtiaao", "我用木筷子吃面。", "tableware"],
  ["มีดเล็ก", "miit-lek", "miit lek", "小刀", "名词", "餐具", "แม่ใช้มีดเล็กหั่นมะม่วง", "maae chai miit lek han ma-muang", "妈妈用小刀切芒果。", "kitchen"],
  ["เขียงไม้", "khiiang-mai", "khiiang mai", "木砧板", "名词", "厨房基础", "เขียงไม้อยู่ข้างอ่างล้างจาน", "khiiang mai yuu khaang aang laang jaan", "木砧板在洗碗池旁边。", "kitchen"],
  ["หม้อใบเล็ก", "maaw-bai-lek", "maaw bai lek", "小锅", "名词", "厨房基础", "ฉันต้มไข่ในหม้อใบเล็ก", "chan dtom khai nai maaw bai lek", "我在小锅里煮鸡蛋。", "kitchen"],
  ["กระทะใบใหญ่", "gra-tha-bai-yai", "gra-tha bai yai", "大锅；大平底锅", "名词", "厨房基础", "พ่อผัดข้าวในกระทะใบใหญ่", "phaaw phat khaao nai gra-tha bai yai", "爸爸在大锅里炒饭。", "kitchen"],
  ["เตาแก๊สในครัว", "dtao-gaet-nai-khruua", "dtao gaet nai khruua", "厨房里的燃气灶", "名词", "厨房基础", "ก่อนออกจากบ้านต้องปิดเตาแก๊ส", "gaawn aawk jaak baan dtawng bpit dtao gaet", "出门前必须关燃气灶。", "kitchen"],
  ["ตู้เย็นในครัว", "dtuu-yen-nai-khruua", "dtuu yen nai khruua", "厨房里的冰箱", "名词", "厨房基础", "นมสดอยู่ในตู้เย็นในครัว", "nom sot yuu nai dtuu yen nai khruua", "鲜奶在厨房里的冰箱里。", "kitchen"],
  ["ล้างผักสด", "laang-phak-sot", "laang phak sot", "洗新鲜蔬菜", "动词", "厨房动作", "แม่ล้างผักก่อนทำส้มตำ", "maae laang phak gaawn tham som-dtam", "妈妈做青木瓜沙拉前洗蔬菜。", "cook"],
  ["หั่นผักเป็นชิ้น", "han-phak-bpen-chin", "han phak bpen chin", "把蔬菜切成块", "动词", "厨房动作", "พี่สาวหั่นผักเป็นชิ้นเล็ก", "phii-saao han phak bpen chin lek", "姐姐把蔬菜切成小块。", "cook"],
  ["ต้มไข่สองฟอง", "dtom-khai-saawng-faawng", "dtom khai saawng faawng", "煮两个鸡蛋", "动词", "厨房动作", "ฉันต้มไข่สองฟองตอนเช้า", "chan dtom khai saawng faawng dtaawn chaao", "我早上煮两个鸡蛋。", "cook"],
  ["ทอดไก่", "thaawt-gai", "thaawt gai", "炸鸡", "动词", "厨房动作", "พ่อทอดไก่ให้เด็ก ๆ กิน", "phaaw thaawt gai hai dek dek gin", "爸爸炸鸡给孩子们吃。", "cook"],
  ["ผัดข้าว", "phat-khaao", "phat khaao", "炒饭", "动词", "厨房动作", "แม่ผัดข้าวกับไข่ในกระทะ", "maae phat khaao gap khai nai gra-tha", "妈妈在锅里用鸡蛋炒饭。", "cook"],
  ["ย่างปลา", "yaang-bplaa", "yaang bplaa", "烤鱼", "动词", "厨房动作", "ลุงย่างปลาหน้าบ้านตอนเย็น", "lung yaang bplaa naa baan dtaawn yen", "叔叔傍晚在家门口烤鱼。", "cook"],
  ["อุ่นอาหารเย็น", "un-aa-haan-yen", "un aa-haan yen", "热晚饭；加热晚餐", "动词", "厨房动作", "ฉันอุ่นอาหารในไมโครเวฟ", "chan un aa-haan nai mai-khroo-weep", "我用微波炉热饭菜。", "cook"],
  ["ชิมซุป", "chim-sup", "chim sup", "尝汤", "动词", "厨房动作", "แม่ชิมซุปแล้วเติมเกลือนิดหน่อย", "maae chim sup laaeo dterm gluea nit naawy", "妈妈尝了汤，然后加了一点盐。", "cook"],
  ["เติมน้ำปลา", "dterm-naam-bplaa", "dterm naam bplaa", "加鱼露", "动词", "厨房动作", "พ่อเติมน้ำปลานิดหน่อยในแกง", "phaaw dterm naam bplaa nit naawy nai gaaeng", "爸爸在咖喱里加了一点鱼露。", "cook"],
  ["ใส่น้ำตาล", "sai-naam-dtaan", "sai naam-dtaan", "加糖", "动词", "厨房动作", "อย่าใส่น้ำตาลมากในกาแฟ", "yaa sai naam-dtaan maak nai gaa-faae", "咖啡里不要加太多糖。", "cook"],
  ["สั่งอาหารสามอย่าง", "sang-aa-haan-saam-yaang", "sang aa-haan saam yaang", "点三样菜", "动词", "点餐", "เราสั่งอาหารสามอย่างสำหรับมื้อเย็น", "rao sang aa-haan saam yaang sam-rap mue yen", "我们为晚餐点了三样菜。", "order"],
  ["ขอเมนูหน่อย", "khaaw-mee-nuu-naawy", "khaaw mee-nuu naawy", "请给菜单；要一下菜单", "短语", "点餐", "ขอเมนูหน่อยค่ะ ฉันอยากสั่งอาหาร", "khaaw mee-nuu naawy kha, chan yaak sang aa-haan", "请给我菜单，我想点餐。", "order"],
  ["จ่ายค่าอาหาร", "jaai-khaa-aa-haan", "jaai khaa aa-haan", "付餐费", "动词", "点餐", "หลังอาหารเย็นพ่อจ่ายค่าอาหาร", "lang aa-haan yen phaaw jaai khaa aa-haan", "晚饭后爸爸付餐费。", "order"],
  ["ห่อกลับบ้าน", "haaw-glap-baan", "haaw glap baan", "打包带回家", "短语", "点餐", "กินไม่หมด ขอห่อกลับบ้านได้ไหม", "gin mai mot, khaaw haaw glap baan dai mai", "吃不完，可以打包带回家吗？", "order"],
  ["ข้าวเหนียวหมูย่าง", "khaao-niaao-muu-yaang", "khaao niaao muu yaang", "糯米配烤猪肉", "名词", "主食菜品", "ตอนเช้าฉันซื้อข้าวเหนียวหมูย่างหน้าบ้าน", "dtaawn chaao chan sue khaao niaao muu yaang naa baan", "早上我在家门口买糯米配烤猪肉。", "rice"],
  ["จานผลไม้", "jaan-phon-la-maai", "jaan phon-la-maai", "水果盘", "名词", "主食菜品", "แม่วางจานผลไม้ไว้บนโต๊ะ", "maae waang jaan phon-la-maai wai bon dto", "妈妈把水果盘放在桌上。", "fruit"],
  ["ชาร้อนอุ่น ๆ", "chaa-raawn-un-un", "chaa raawn un un", "温热的茶", "名词", "饮料", "คุณยายดื่มชาร้อนอุ่น ๆ ตอนเช้า", "khun-yaai deum chaa raawn un un dtaawn chaao", "外婆早上喝温热的茶。", "drink"],
] as const satisfies readonly Row[];

const toCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = row;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a1", "food-drink", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a1",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A1 阶段可把这个表达整组用于点餐、描述味道或厨房动作。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["适合餐厅点餐、家庭吃饭和描述简单食物饮料时使用。"],
    tags,
    sourceRefs: FOOD_DRINK_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_FOOD_DRINK_01 = rows.map(toCandidate);
