export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "我想要" | "我不会" | "请帮我" | "多少钱" | "在哪里" | "可以吗" | "没听懂" | "再说一遍" | "基础回应" | "紧急短句";
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

type PhraseItem = { thai: string; roman: string; chinese: string; id: string };

const ESSENTIAL_PHRASES_SITUATIONS_REFS = ["thai-frequency", "thai-a1-essential-phrases-situations-candidate"];

const wantItems: readonly PhraseItem[] = [
  { thai: "น้ำเปล่าหนึ่งขวด", roman: "naam bplao neung khuat", chinese: "一瓶水", id: "naam-bplao-neung-khuat" },
  { thai: "ข้าวผัดหนึ่งจาน", roman: "khaao phat neung jaan", chinese: "一盘炒饭", id: "khaao-phat-neung-jaan" },
  { thai: "กาแฟเย็นหนึ่งแก้ว", roman: "gaa-faae yen neung gaaeo", chinese: "一杯冰咖啡", id: "gaa-faae-yen-neung-gaaeo" },
  { thai: "ถุงเล็กหนึ่งใบ", roman: "thung lek neung bai", chinese: "一个小袋子", id: "thung-lek-neung-bai" },
  { thai: "ตั๋วเด็กหนึ่งใบ", roman: "dtua dek neung bai", chinese: "一张儿童票", id: "dtua-dek-neung-bai" },
  { thai: "ห้องพักคืนเดียว", roman: "haawng-phak kheun diao", chinese: "住一晚的房间", id: "haawng-phak-kheun-diao" },
  { thai: "ผ้าเช็ดตัวเพิ่ม", roman: "phaa chet dtua phoem", chinese: "额外毛巾", id: "phaa-chet-dtua-phoem" },
  { thai: "ใบเสร็จด้วย", roman: "bai-set duai", chinese: "收据", id: "bai-set-duai" },
  { thai: "ช้อนอีกคัน", roman: "chaawn iik khan", chinese: "再一把勺子", id: "chaawn-iik-khan" },
  { thai: "ที่นั่งใกล้หน้าต่าง", roman: "thii-nang glai naa-dtaang", chinese: "靠窗座位", id: "thii-nang-glai-naa-dtaang" },
  { thai: "แผนที่เมือง", roman: "phaaen-thii mueang", chinese: "城市地图", id: "phaaen-thii-mueang" },
  { thai: "เบอร์โทรร้าน", roman: "booe thoo raan", chinese: "店里的电话号码", id: "booe-thoo-raan" },
  { thai: "ยาแก้ปวด", roman: "yaa gaae bpuat", chinese: "止痛药", id: "yaa-gaae-bpuat" },
  { thai: "ของแบบนี้", roman: "khaawng baaep nii", chinese: "这种东西", id: "khaawng-baaep-nii" },
];

const places: readonly PhraseItem[] = [
  { thai: "ห้องน้ำ", roman: "haawng-naam", chinese: "洗手间", id: "haawng-naam" },
  { thai: "ทางออก", roman: "thaang aawk", chinese: "出口", id: "thaang-aawk" },
  { thai: "สถานีรถไฟฟ้า", roman: "sa-thaa-nii rot-fai-faa", chinese: "轨道交通站", id: "sa-thaa-nii-rot-fai-faa" },
  { thai: "ป้ายรถเมล์", roman: "bpaai rot-mee", chinese: "公交站牌", id: "bpaai-rot-mee" },
  { thai: "เคาน์เตอร์จ่ายเงิน", roman: "khao-dtooe jaai ngoen", chinese: "付款柜台", id: "khao-dtooe-jaai-ngoen" },
  { thai: "ร้านขายยา", roman: "raan khaai yaa", chinese: "药店", id: "raan-khaai-yaa" },
  { thai: "ลิฟต์", roman: "lip", chinese: "电梯", id: "lip" },
  { thai: "ทางไปตลาด", roman: "thaang bpai dta-laat", chinese: "去市场的路", id: "thaang-bpai-dta-laat" },
  { thai: "ประตูขึ้นเครื่อง", roman: "bpra-dtuu kheun khreuuang", chinese: "登机口", id: "bpra-dtuu-kheun-khreuuang" },
  { thai: "ที่ฝากกระเป๋า", roman: "thii faak gra-bpao", chinese: "寄存行李处", id: "thii-faak-gra-bpao" },
  { thai: "ร้านถ่ายเอกสาร", roman: "raan thaai eek-ga-saan", chinese: "复印店", id: "raan-thaai-eek-ga-saan" },
  { thai: "ตู้เอทีเอ็ม", roman: "dtuu ee-thii-em", chinese: "ATM 机", id: "dtuu-ee-thii-em" },
  { thai: "จุดนัดพบ", roman: "jut nat phop", chinese: "集合点", id: "jut-nat-phop" },
  { thai: "ห้องพักของฉัน", roman: "haawng-phak khaawng chan", chinese: "我的房间", id: "haawng-phak-khaawng-chan" },
];

const helpActions: readonly PhraseItem[] = [
  { thai: "เขียนที่อยู่", roman: "khiian thii-yuu", chinese: "写地址", id: "khiian-thii-yuu" },
  { thai: "เรียกแท็กซี่", roman: "riiak thaek-sii", chinese: "叫出租车", id: "riiak-thaek-sii" },
  { thai: "เปิดประตู", roman: "bpoet bpra-dtuu", chinese: "开门", id: "bpoet-bpra-dtuu" },
  { thai: "ดูแผนที่", roman: "duu phaaen-thii", chinese: "看地图", id: "duu-phaaen-thii" },
  { thai: "ถือกระเป๋า", roman: "theu gra-bpao", chinese: "拿包", id: "theu-gra-bpao" },
  { thai: "โทรหาโรงแรม", roman: "thoo haa roong-raaem", chinese: "打给酒店", id: "thoo-haa-roong-raaem" },
  { thai: "อ่านเมนู", roman: "aan mee-nuu", chinese: "读菜单", id: "aan-mee-nuu" },
  { thai: "ถ่ายรูปให้", roman: "thaai ruup hai", chinese: "帮忙拍照", id: "thaai-ruup-hai" },
  { thai: "สแกนจ่าย", roman: "sa-gaan jaai", chinese: "扫码支付", id: "sa-gaan-jaai" },
  { thai: "หาเบอร์โทร", roman: "haa booe thoo", chinese: "找电话号码", id: "haa-booe-thoo" },
  { thai: "พูดกับพนักงาน", roman: "phuut gap pha-nak-ngaan", chinese: "和店员说", id: "phuut-gap-pha-nak-ngaan" },
  { thai: "เปลี่ยนห้อง", roman: "bplian haawng", chinese: "换房间", id: "bplian-haawng" },
  { thai: "ซื้อบัตรโดยสาร", roman: "seu bat dooi-saan", chinese: "买车票", id: "seu-bat-dooi-saan" },
  { thai: "หาทางกลับบ้าน", roman: "haa thaang glap baan", chinese: "找回家的路", id: "haa-thaang-glap-baan" },
];

const canActions: readonly PhraseItem[] = [
  { thai: "นั่งตรงนี้", roman: "nang dtrong nii", chinese: "坐这里", id: "nang-dtrong-nii" },
  { thai: "เข้าห้องน้ำ", roman: "khao haawng-naam", chinese: "去洗手间", id: "khao-haawng-naam" },
  { thai: "จ่ายด้วยบัตร", roman: "jaai duai bat", chinese: "用卡付款", id: "jaai-duai-bat" },
  { thai: "ถ่ายรูปตรงนี้", roman: "thaai ruup dtrong nii", chinese: "在这里拍照", id: "thaai-ruup-dtrong-nii" },
  { thai: "ลองชิมนิดหนึ่ง", roman: "laawng chim nit neung", chinese: "试吃一点", id: "laawng-chim-nit-neung" },
  { thai: "เปิดหน้าต่าง", roman: "bpoet naa-dtaang", chinese: "开窗", id: "bpoet-naa-dtaang" },
  { thai: "ฝากกระเป๋าไว้", roman: "faak gra-bpao wai", chinese: "寄存行李", id: "faak-gra-bpao-wai" },
  { thai: "ใช้ไวไฟ", roman: "chai wai-fai", chinese: "使用 Wi-Fi", id: "chai-wai-fai" },
  { thai: "เปลี่ยนเวลา", roman: "bplian wee-laa", chinese: "改时间", id: "bplian-wee-laa" },
  { thai: "ดูห้องก่อน", roman: "duu haawng gaawn", chinese: "先看房间", id: "duu-haawng-gaawn" },
  { thai: "คืนของ", roman: "kheun khaawng", chinese: "退货", id: "kheun-khaawng" },
  { thai: "ใช้โทรศัพท์", roman: "chai thoo-ra-sap", chinese: "使用电话", id: "chai-thoo-ra-sap" },
  { thai: "กลับมาทีหลัง", roman: "glap maa thii-lang", chinese: "稍后回来", id: "glap-maa-thii-lang" },
  { thai: "ถามอีกครั้ง", roman: "thaam iik khrang", chinese: "再问一次", id: "thaam-iik-khrang" },
];

const priceItems: readonly PhraseItem[] = [
  { thai: "น้ำขวดนี้", roman: "naam khuat nii", chinese: "这瓶水", id: "naam-khuat-nii" },
  { thai: "ตั๋วใบนี้", roman: "dtua bai nii", chinese: "这张票", id: "dtua-bai-nii" },
  { thai: "เสื้อตัวนี้", roman: "seua dtua nii", chinese: "这件衣服", id: "seua-dtua-nii" },
  { thai: "ข้าวกล่องนี้", roman: "khaao glaawng nii", chinese: "这盒饭", id: "khaao-glaawng-nii" },
  { thai: "กาแฟแก้วนี้", roman: "gaa-faae gaaeo nii", chinese: "这杯咖啡", id: "gaa-faae-gaaeo-nii" },
  { thai: "ห้องหนึ่งคืน", roman: "haawng neung kheun", chinese: "房间一晚", id: "haawng-neung-kheun" },
  { thai: "แท็กซี่ไปโรงแรม", roman: "thaek-sii bpai roong-raaem", chinese: "出租车去酒店", id: "thaek-sii-bpai-roong-raaem" },
  { thai: "ซิมการ์ดนี้", roman: "sim gaat nii", chinese: "这张电话卡", id: "sim-gaat-nii" },
  { thai: "ยากล่องนี้", roman: "yaa glaawng nii", chinese: "这盒药", id: "yaa-glaawng-nii" },
  { thai: "ผลไม้ถุงนี้", roman: "phon-la-maai thung nii", chinese: "这袋水果", id: "phon-la-maai-thung-nii" },
];

const directRows: readonly Definition[] = [
  { thai: "ฉันพูดภาษาไทยได้นิดหน่อย", id: "chan-phuut-phaa-saa-thai-dai-nit-naawy", roman: "chan phuut phaa-saa thai dai nit naawy", chinese: "我会说一点泰语", partOfSpeech: "短语", theme: "基础回应", exampleThai: "ฉันพูดภาษาไทยได้นิดหน่อย กรุณาพูดช้า ๆ", exampleRoman: "chan phuut phaa-saa thai dai nit naawy, ga-ru-naa phuut chaa chaa", exampleChinese: "我会说一点泰语，请慢慢说。", tag: "生存句" },
  { thai: "ฉันยังพูดไม่เก่ง", id: "chan-yang-phuut-mai-geng", roman: "chan yang phuut mai geng", chinese: "我还说得不好", partOfSpeech: "短语", theme: "我不会", exampleThai: "ฉันยังพูดไม่เก่ง แต่ฉันอยากลองพูด", exampleRoman: "chan yang phuut mai geng, dtaae chan yaak laawng phuut", exampleChinese: "我还说得不好，但我想试着说。", tag: "表达能力" },
  { thai: "ฉันอ่านคำนี้ไม่ออก", id: "chan-aan-kham-nii-mai-aawk", roman: "chan aan kham nii mai aawk", chinese: "我读不出这个词", partOfSpeech: "短语", theme: "我不会", exampleThai: "ขอโทษค่ะ ฉันอ่านคำนี้ไม่ออก", exampleRoman: "khaaw-thoot kha, chan aan kham nii mai aawk", exampleChinese: "不好意思，我读不出这个词。", tag: "表达能力" },
  { thai: "ฉันเขียนภาษาไทยไม่ได้", id: "chan-khiian-phaa-saa-thai-mai-dai", roman: "chan khiian phaa-saa thai mai dai", chinese: "我不会写泰语", partOfSpeech: "短语", theme: "我不会", exampleThai: "ฉันเขียนภาษาไทยไม่ได้ ช่วยเขียนให้ดูหน่อย", exampleRoman: "chan khiian phaa-saa thai mai dai, chuai khiian hai duu naawy", exampleChinese: "我不会写泰语，请写给我看一下。", tag: "表达能力" },
  { thai: "ฉันไม่เข้าใจประโยคนี้", id: "chan-mai-khao-jai-bpra-yook-nii", roman: "chan mai khao-jai bpra-yook nii", chinese: "我不懂这个句子", partOfSpeech: "短语", theme: "没听懂", exampleThai: "ฉันไม่เข้าใจประโยคนี้ ช่วยอธิบายอีกครั้ง", exampleRoman: "chan mai khao-jai bpra-yook nii, chuai a-thi-baai iik khrang", exampleChinese: "我不懂这个句子，请再解释一次。", tag: "听不懂" },
  { thai: "เมื่อกี้ฟังไม่ทัน", id: "muea-gii-fang-mai-than", roman: "muea-gii fang mai than", chinese: "刚才没听跟上", partOfSpeech: "短语", theme: "没听懂", exampleThai: "เมื่อกี้ฟังไม่ทัน ช่วยพูดอีกครั้งได้ไหม", exampleRoman: "muea-gii fang mai than, chuai phuut iik khrang dai mai", exampleChinese: "刚才我没听跟上，可以请你再说一次吗？", tag: "听不懂" },
  { thai: "ช่วยพูดช้ากว่านี้หน่อย", id: "chuai-phuut-chaa-gwaa-nii-naawy", roman: "chuai phuut chaa gwaa nii naawy", chinese: "请说得再慢一点", partOfSpeech: "短语", theme: "再说一遍", exampleThai: "ขอโทษค่ะ ช่วยพูดช้ากว่านี้หน่อย", exampleRoman: "khaaw-thoot kha, chuai phuut chaa gwaa nii naawy", exampleChinese: "不好意思，请说得再慢一点。", tag: "请求重复" },
  { thai: "ช่วยพูดอีกทีได้ไหม", id: "chuai-phuut-iik-thii-dai-mai", roman: "chuai phuut iik thii dai mai", chinese: "可以请你再说一次吗", partOfSpeech: "短语", theme: "再说一遍", exampleThai: "เสียงไม่ชัด ช่วยพูดอีกทีได้ไหม", exampleRoman: "siiang mai chat, chuai phuut iik thii dai mai", exampleChinese: "声音不清楚，可以请你再说一次吗？", tag: "请求重复" },
  { thai: "พูดเป็นภาษาอังกฤษได้ไหม", id: "phuut-bpen-phaa-saa-ang-grit-dai-mai", roman: "phuut bpen phaa-saa ang-grit dai mai", chinese: "可以用英语说吗", partOfSpeech: "短语", theme: "可以吗", exampleThai: "ถ้าฉันไม่เข้าใจ พูดเป็นภาษาอังกฤษได้ไหม", exampleRoman: "thaa chan mai khao-jai, phuut bpen phaa-saa ang-grit dai mai", exampleChinese: "如果我不懂，可以用英语说吗？", tag: "请求" },
  { thai: "ฉันต้องการความช่วยเหลือ", id: "chan-dtawng-gaan-khwaam-chuai-leuua", roman: "chan dtawng-gaan khwaam chuai-leuua", chinese: "我需要帮助", partOfSpeech: "短语", theme: "紧急短句", exampleThai: "ขอโทษค่ะ ฉันต้องการความช่วยเหลือ", exampleRoman: "khaaw-thoot kha, chan dtawng-gaan khwaam chuai-leuua", exampleChinese: "不好意思，我需要帮助。", tag: "求助" },
  { thai: "ฉันหลงทางอยู่", id: "chan-long-thaang-yuu", roman: "chan long thaang yuu", chinese: "我迷路了", partOfSpeech: "短语", theme: "紧急短句", exampleThai: "ฉันหลงทางอยู่ ช่วยดูแผนที่ให้หน่อย", exampleRoman: "chan long thaang yuu, chuai duu phaaen-thii hai naawy", exampleChinese: "我迷路了，请帮我看一下地图。", tag: "求助" },
  { thai: "โทรศัพท์ฉันหาย", id: "thoo-ra-sap-chan-haai", roman: "thoo-ra-sap chan haai", chinese: "我的手机丢了", partOfSpeech: "短语", theme: "紧急短句", exampleThai: "โทรศัพท์ฉันหาย ช่วยโทรหาเพื่อนให้หน่อย", exampleRoman: "thoo-ra-sap chan haai, chuai thoo haa phuean hai naawy", exampleChinese: "我的手机丢了，请帮我打给朋友。", tag: "求助" },
  { thai: "ฉันเจ็บตรงนี้", id: "chan-jep-dtrong-nii", roman: "chan jep dtrong nii", chinese: "我这里痛", partOfSpeech: "短语", theme: "紧急短句", exampleThai: "ฉันเจ็บตรงนี้ ช่วยพาไปหาหมอได้ไหม", exampleRoman: "chan jep dtrong nii, chuai phaa bpai haa maaw dai mai", exampleChinese: "我这里痛，可以请你带我去看医生吗？", tag: "求助" },
  { thai: "ไม่เอาเผ็ดนะคะ", id: "mai-ao-phet-na-kha", roman: "mai ao phet na kha", chinese: "不要辣（女性礼貌）", partOfSpeech: "短语", theme: "基础回应", exampleThai: "เวลาสั่งอาหาร ฉันพูดว่าไม่เอาเผ็ดนะคะ", exampleRoman: "wee-laa sang aa-haan, chan phuut waa mai ao phet na kha", exampleChinese: "点餐时，我说“不要辣”。", tag: "点餐" },
  { thai: "เอากลับบ้านค่ะ", id: "ao-glap-baan-kha", roman: "ao glap baan kha", chinese: "打包带走（女性礼貌）", partOfSpeech: "短语", theme: "基础回应", exampleThai: "กินไม่หมด ฉันบอกว่าเอากลับบ้านค่ะ", exampleRoman: "gin mai mot, chan baawk waa ao glap baan kha", exampleChinese: "吃不完时，我说“打包带走”。", tag: "点餐" },
  { thai: "ไม่ต้องใส่ถุงค่ะ", id: "mai-dtawng-sai-thung-kha", roman: "mai dtawng sai thung kha", chinese: "不用装袋（女性礼貌）", partOfSpeech: "短语", theme: "基础回应", exampleThai: "ฉันมีถุงผ้าแล้ว จึงพูดว่าไม่ต้องใส่ถุงค่ะ", exampleRoman: "chan mii thung phaa laaeo, jeung phuut waa mai dtawng sai thung kha", exampleChinese: "我有布袋了，所以说“不用装袋”。", tag: "购物" },
  { thai: "ใช่ค่ะ อันนี้ของฉัน", id: "chai-kha-an-nii-khaawng-chan", roman: "chai kha, an nii khaawng chan", chinese: "是的，这个是我的", partOfSpeech: "短语", theme: "基础回应", exampleThai: "พนักงานถาม ฉันตอบว่าใช่ค่ะ อันนี้ของฉัน", exampleRoman: "pha-nak-ngaan thaam, chan dtaawp waa chai kha, an nii khaawng chan", exampleChinese: "店员问我，我回答“是的，这个是我的”。", tag: "回应" },
  { thai: "ไม่ใช่ค่ะ ฉันไม่ได้สั่ง", id: "mai-chai-kha-chan-mai-dai-sang", roman: "mai chai kha, chan mai dai sang", chinese: "不是，我没有点", partOfSpeech: "短语", theme: "基础回应", exampleThai: "อาหารจานนี้ไม่ใช่ค่ะ ฉันไม่ได้สั่ง", exampleRoman: "aa-haan jaan nii mai chai kha, chan mai dai sang", exampleChinese: "这道菜不是我的，我没有点。", tag: "回应" },
];

const wantRows = wantItems.map((item): Definition => ({
  thai: `ฉันอยากได้${item.thai}ค่ะ`,
  id: `chan-yaak-dai-${item.id}-kha`,
  roman: `chan yaak dai ${item.roman} kha`,
  chinese: `我想要${item.chinese}`,
  partOfSpeech: "短语",
  theme: "我想要",
  exampleThai: `ที่ร้าน ฉันพูดว่า ฉันอยากได้${item.thai}ค่ะ`,
  exampleRoman: `thii raan, chan phuut waa chan yaak dai ${item.roman} kha`,
  exampleChinese: `在店里，我说“我想要${item.chinese}”。`,
  tag: "我想要",
}));

const whereRows = places.map((place): Definition => ({
  thai: `${place.thai}อยู่ตรงไหนคะ`,
  id: `${place.id}-yuu-dtrong-nai-kha`,
  roman: `${place.roman} yuu dtrong nai kha`,
  chinese: `${place.chinese}在哪里`,
  partOfSpeech: "短语",
  theme: "在哪里",
  exampleThai: `ขอโทษค่ะ ${place.thai}อยู่ตรงไหนคะ`,
  exampleRoman: `khaaw-thoot kha, ${place.roman} yuu dtrong nai kha`,
  exampleChinese: `不好意思，${place.chinese}在哪里？`,
  tag: "问地点",
}));

const helpRows = helpActions.map((action): Definition => ({
  thai: `ช่วย${action.thai}ให้หน่อยได้ไหมคะ`,
  id: `chuai-${action.id}-hai-naawy-dai-mai-kha`,
  roman: `chuai ${action.roman} hai naawy dai mai kha`,
  chinese: `可以请你帮我${action.chinese}吗`,
  partOfSpeech: "短语",
  theme: "请帮我",
  exampleThai: `ฉันถามว่า ช่วย${action.thai}ให้หน่อยได้ไหมคะ`,
  exampleRoman: `chan thaam waa chuai ${action.roman} hai naawy dai mai kha`,
  exampleChinese: `我问“可以请你帮我${action.chinese}吗？”`,
  tag: "求助",
}));

const canRows = canActions.map((action): Definition => ({
  thai: `ฉัน${action.thai}ได้ไหมคะ`,
  id: `chan-${action.id}-dai-mai-kha`,
  roman: `chan ${action.roman} dai mai kha`,
  chinese: `我可以${action.chinese}吗`,
  partOfSpeech: "短语",
  theme: "可以吗",
  exampleThai: `ก่อนทำ ฉันถามว่า ฉัน${action.thai}ได้ไหมคะ`,
  exampleRoman: `gaawn tham, chan thaam waa chan ${action.roman} dai mai kha`,
  exampleChinese: `做之前，我问“我可以${action.chinese}吗？”`,
  tag: "询问许可",
}));

const priceRows = priceItems.map((item): Definition => ({
  thai: `${item.thai}ราคาเท่าไรคะ`,
  id: `${item.id}-raa-khaa-thao-rai-kha`,
  roman: `${item.roman} raa-khaa thao-rai kha`,
  chinese: `${item.chinese}多少钱`,
  partOfSpeech: "短语",
  theme: "多少钱",
  exampleThai: `ฉันถามแม่ค้าว่า ${item.thai}ราคาเท่าไรคะ`,
  exampleRoman: `chan thaam maae-khaa waa ${item.roman} raa-khaa thao-rai kha`,
  exampleChinese: `我问女摊主：“${item.chinese}多少钱？”`,
  tag: "问价",
}));

const cannotRows = canActions.slice(0, 14).map((action): Definition => ({
  thai: `ฉัน${action.thai}ไม่เป็นค่ะ`,
  id: `chan-${action.id}-mai-bpen-kha`,
  roman: `chan ${action.roman} mai bpen kha`,
  chinese: `我不会${action.chinese}`,
  partOfSpeech: "短语",
  theme: "我不会",
  exampleThai: `ฉัน${action.thai}ไม่เป็นค่ะ ช่วยสอนหน่อยได้ไหม`,
  exampleRoman: `chan ${action.roman} mai bpen kha, chuai saawn naawy dai mai`,
  exampleChinese: `我不会${action.chinese}，可以请你教一下吗？`,
  tag: "我不会",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...wantRows,
  ...whereRows,
  ...helpRows,
  ...canRows,
  ...priceRows,
  ...cannotRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a1", "生存短句", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a1",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A1 阶段先把这些短句整句背熟，在真实场景里替换物品、地点或动作。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于 A1 生存沟通：想要、不会、请帮忙、问价、问地点、询问许可、没听懂和紧急求助。"],
    tags,
    sourceRefs: ESSENTIAL_PHRASES_SITUATIONS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_ESSENTIAL_PHRASES_SITUATIONS_01 = rows.map(toCandidate);
