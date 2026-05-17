export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "天气" | "季节" | "温度" | "雨风太阳" | "自然景物" | "动物植物" | "环境描述";
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

const WEATHER_NATURE_REFS = ["thai-frequency", "thai-a1-weather-nature-candidate"];

const rows = [
  ["อากาศวันนี้", "aa-gaat-wan-nii", "aa-gaat wan-nii", "今天的天气", "名词", "天气", "อากาศวันนี้ดีมาก เราไปเดินเล่นกันเถอะ", "aa-gaat wan-nii dii maak, rao bpai doen len gan thoe", "今天天气很好，我们去散步吧。", "weather"],
  ["อากาศตอนเช้า", "aa-gaat-dtaawn-chaao", "aa-gaat dtaawn chaao", "早上的天气", "名词", "天气", "อากาศตอนเช้าเย็นสบาย", "aa-gaat dtaawn chaao yen sa-baai", "早上的天气凉爽舒服。", "weather"],
  ["อากาศตอนเย็น", "aa-gaat-dtaawn-yen", "aa-gaat dtaawn yen", "傍晚的天气", "名词", "天气", "อากาศตอนเย็นไม่ร้อนมาก", "aa-gaat dtaawn yen mai raawn maak", "傍晚的天气不太热。", "weather"],
  ["อากาศดีมาก", "aa-gaat-dii-maak", "aa-gaat dii maak", "天气很好", "形容词", "天气", "วันนี้อากาศดีมากและท้องฟ้าสวย", "wan-nii aa-gaat dii maak lae thaawng-faa suai", "今天天气很好，天空很漂亮。", "weather"],
  ["อากาศไม่ดี", "aa-gaat-mai-dii", "aa-gaat mai dii", "天气不好", "形容词", "天气", "อากาศไม่ดี เราจึงอยู่บ้าน", "aa-gaat mai dii, rao jeung yuu baan", "天气不好，所以我们待在家。", "weather"],
  ["อากาศเปลี่ยน", "aa-gaat-bplian", "aa-gaat bplian", "天气变了", "短语", "天气", "อากาศเปลี่ยนเร็ว อย่าลืมเอาเสื้อกันฝน", "aa-gaat bplian reo, yaa leum ao seua gan fon", "天气变得快，别忘了带雨衣。", "weather"],
  ["ฟ้าสดใส", "faa-sot-sai", "faa sot-sai", "天空晴朗", "形容词", "天气", "ตอนเช้าฟ้าสดใสและมีแดดอ่อน ๆ", "dtaawn chaao faa sot-sai lae mii daaet aawn aawn", "早上天空晴朗，有柔和的阳光。", "sky"],
  ["ฟ้ามืดแล้ว", "faa-meut-laaeo", "faa meut laaeo", "天已经黑了", "短语", "天气", "ฟ้ามืดแล้ว เราควรกลับบ้าน", "faa meut laaeo, rao khuuan glap baan", "天已经黑了，我们应该回家。", "sky"],
  ["ฟ้าครึ้ม", "faa-khreum", "faa khreum", "天阴；阴沉", "形容词", "天气", "ฟ้าครึ้มตั้งแต่บ่าย", "faa khreum dtang-dtaae baai", "从下午开始天就阴沉。", "sky"],
  ["เมฆสีขาวลอยช้า ๆ", "meek-sii-khaao-laawy-chaa-chaa", "meek sii khaao laawy chaa chaa", "白云慢慢飘", "短语", "天气", "เด็ก ๆ มองเมฆสีขาวลอยช้า ๆ บนท้องฟ้า", "dek dek maawng meek sii khaao laawy chaa chaa bon thaawng-faa", "孩子们看着天空中的白云慢慢飘。", "cloud"],
  ["เมฆสีดำ", "meek-sii-dam", "meek sii dam", "乌云；黑云", "名词", "天气", "มีเมฆสีดำมาก ฝนอาจจะตก", "mii meek sii dam maak, fon aat ja dtok", "乌云很多，可能会下雨。", "cloud"],
  ["ฝนตอนเช้า", "fon-dtaawn-chaao", "fon dtaawn chaao", "早上的雨", "名词", "雨风太阳", "ฝนตอนเช้าทำให้ถนนเปียก", "fon dtaawn chaao tham-hai tha-non bpiiak", "早上的雨让道路湿了。", "rain"],
  ["ฝนตกหนักตอนเย็น", "fon-dtok-nak-dtaawn-yen", "fon dtok nak dtaawn yen", "傍晚雨下得大", "短语", "雨风太阳", "คืนนี้ฝนตกหนักตอนเย็นและถนนเปียก", "khuen-nii fon dtok nak dtaawn yen lae tha-non bpiiak", "今晚傍晚雨下得大，路湿了。", "rain"],
  ["ฝนตกเบา ๆ", "fon-dtok-bao-bao", "fon dtok bao bao", "下小雨", "短语", "雨风太阳", "ตอนเย็นฝนตกเบา ๆ", "dtaawn yen fon dtok bao bao", "傍晚下小雨。", "rain"],
  ["ฝนหยุดแล้ว", "fon-yut-laaeo", "fon yut laaeo", "雨停了", "短语", "雨风太阳", "ฝนหยุดแล้ว เด็ก ๆ ออกไปเล่นได้", "fon yut laaeo, dek dek aawk bpai len dai", "雨停了，孩子们可以出去玩。", "rain"],
  ["หลังฝนตก", "lang-fon-dtok", "lang fon dtok", "下雨后", "短语", "雨风太阳", "หลังฝนตก อากาศเย็นขึ้น", "lang fon dtok, aa-gaat yen kheun", "下雨后，天气凉了一些。", "rain"],
  ["น้ำฝน", "naam-fon", "naam fon", "雨水", "名词", "雨风太阳", "น้ำฝนไหลลงจากหลังคา", "naam fon lai long jaak lang-khaa", "雨水从屋顶流下来。", "rain"],
  ["ถนนเปียก", "tha-non-bpiiak", "tha-non bpiiak", "路湿了", "短语", "环境描述", "ถนนเปียกหลังฝนตก", "tha-non bpiiak lang fon dtok", "下雨后路湿了。", "environment"],
  ["พื้นแห้ง", "pheun-haaeng", "pheun haaeng", "地面干了", "短语", "环境描述", "ตอนบ่ายพื้นแห้งแล้ว", "dtaawn baai pheun haaeng laaeo", "下午地面已经干了。", "environment"],
  ["ลมแรงริมทะเล", "lom-raaeng-rim-tha-lee", "lom raaeng rim tha-lee", "海边风大", "短语", "雨风太阳", "วันนี้ลมแรงริมทะเล อย่าเปิดหน้าต่าง", "wan-nii lom raaeng rim tha-lee, yaa bpoet naa-dtaang", "今天海边风大，不要开窗。", "wind"],
  ["ลมเบา", "lom-bao", "lom bao", "微风；风小", "形容词", "雨风太阳", "ตอนเช้ามีลมเบาและอากาศดี", "dtaawn chaao mii lom bao lae aa-gaat dii", "早上有微风，天气很好。", "wind"],
  ["ลมเย็นตอนเช้า", "lom-yen-dtaawn-chaao", "lom yen dtaawn chaao", "早上的凉风", "名词", "雨风太阳", "ลมเย็นตอนเช้าพัดเข้าห้อง", "lom yen dtaawn chaao phat khao haawng", "早上的凉风吹进房间。", "wind"],
  ["ลมพัด", "lom-phat", "lom phat", "风吹", "动词", "雨风太阳", "ลมพัดใบไม้บนถนน", "lom phat bai-maai bon tha-non", "风吹动路上的树叶。", "wind"],
  ["แดดเช้า", "daaet-chaao", "daaet chaao", "早晨阳光", "名词", "雨风太阳", "แดดเช้าไม่ร้อนมาก", "daaet chaao mai raawn maak", "早晨阳光不太热。", "sun"],
  ["แดดแรงตอนเที่ยง", "daaet-raaeng-dtaawn-thiiang", "daaet raaeng dtaawn thiiang", "中午太阳很晒", "短语", "雨风太阳", "แดดแรงตอนเที่ยงมาก ต้องใส่หมวก", "daaet raaeng dtaawn thiiang maak, dtawng sai muak", "中午太阳很晒，要戴帽子。", "sun"],
  ["แดดอ่อน", "daaet-aawn", "daaet aawn", "阳光柔和", "形容词", "雨风太阳", "ตอนเย็นแดดอ่อนและสวย", "dtaawn yen daaet aawn lae suai", "傍晚阳光柔和又漂亮。", "sun"],
  ["แสงแดดอ่อน ๆ", "saaeng-daaet-aawn-aawn", "saaeng daaet aawn aawn", "柔和的阳光", "名词", "雨风太阳", "แสงแดดอ่อน ๆ เข้ามาทางหน้าต่าง", "saaeng daaet aawn aawn khao maa thaang naa-dtaang", "柔和的阳光从窗户照进来。", "sun"],
  ["พระอาทิตย์ขึ้น", "phra-aa-thit-kheun", "phra-aa-thit kheun", "太阳升起", "短语", "雨风太阳", "พระอาทิตย์ขึ้นตอนหกโมงเช้า", "phra-aa-thit kheun dtaawn hok moong chaao", "太阳早上六点升起。", "sun"],
  ["พระอาทิตย์ตก", "phra-aa-thit-dtok", "phra-aa-thit dtok", "太阳落山", "短语", "雨风太阳", "เราดูพระอาทิตย์ตกที่ทะเล", "rao duu phra-aa-thit dtok thii tha-lee", "我们在海边看太阳落山。", "sun"],
  ["ฟ้าแลบ", "faa-laaep", "faa laaep", "闪电", "动词", "雨风太阳", "เมื่อคืนฟ้าแลบหลายครั้ง", "muea-kheun faa laaep laai khrang", "昨晚闪了好几次电。", "storm"],
  ["ฟ้าร้อง", "faa-raawng", "faa raawng", "打雷", "动词", "雨风太阳", "เด็กกลัวเสียงฟ้าร้อง", "dek glua siiang faa raawng", "孩子害怕雷声。", "storm"],
  ["พายุเข้า", "phaa-yu-khao", "phaa-yu khao", "暴风雨来了", "短语", "天气", "ถ้าพายุเข้า เราควรอยู่ในบ้าน", "thaa phaa-yu khao, rao khuuan yuu nai baan", "如果暴风雨来了，我们应该待在家里。", "storm"],
  ["หมอกตอนเช้า", "maawk-dtaawn-chaao", "maawk dtaawn chaao", "早晨的雾", "名词", "天气", "หมอกตอนเช้าทำให้มองถนนไม่ชัด", "maawk dtaawn chaao tham-hai maawng tha-non mai chat", "早晨的雾让路看不清。", "fog"],
  ["อากาศร้อนจัด", "aa-gaat-raawn-jat", "aa-gaat raawn jat", "天气非常热", "形容词", "温度", "เดือนเมษายนอากาศร้อนจัด", "duean mee-saa-yon aa-gaat raawn jat", "四月天气非常热。", "temperature"],
  ["อากาศเย็นลง", "aa-gaat-yen-long", "aa-gaat yen long", "天气变凉", "短语", "温度", "หลังฝนตกอากาศเย็นลง", "lang fon dtok aa-gaat yen long", "下雨后天气变凉了。", "temperature"],
  ["หนาวตอนเช้า", "naao-dtaawn-chaao", "naao dtaawn chaao", "早上冷", "短语", "温度", "หน้าหนาวหนาวตอนเช้า", "naa-naao naao dtaawn chaao", "凉季早上很冷。", "temperature"],
  ["เย็นนิดหน่อย", "yen-nit-naawy", "yen nit naawy", "有点凉", "形容词", "温度", "ห้องนี้เย็นนิดหน่อย", "haawng nii yen nit naawy", "这个房间有点凉。", "temperature"],
  ["อบอุ่นดี", "op-un-dii", "op-un dii", "暖和得正好", "形容词", "温度", "ผ้าห่มผืนนี้อบอุ่นดี", "phaa-hom pheun nii op-un dii", "这条毯子暖和得正好。", "temperature"],
  ["ฤดูร้อน", "rue-duu-raawn", "rue-duu raawn", "热季；夏季", "名词", "季节", "ฤดูร้อนในไทยอากาศร้อนมาก", "rue-duu raawn nai thai aa-gaat raawn maak", "泰国热季天气很热。", "season"],
  ["ฤดูฝน", "rue-duu-fon", "rue-duu fon", "雨季", "名词", "季节", "ฤดูฝนต้องพกร่มทุกวัน", "rue-duu fon dtawng phok rom thuk wan", "雨季每天都要带伞。", "season"],
  ["ฤดูหนาว", "rue-duu-naao", "rue-duu naao", "凉季；冬季", "名词", "季节", "ฤดูหนาวอากาศเย็นตอนเช้า", "rue-duu naao aa-gaat yen dtaawn chaao", "凉季早上天气凉。", "season"],
  ["หน้าร้อน", "naa-raawn", "naa raawn", "热季；热天", "名词", "季节", "หน้าร้อนเด็ก ๆ ชอบกินไอศกรีม", "naa raawn dek dek chaawp gin ai-sa-griim", "热季孩子们喜欢吃冰淇淋。", "season"],
  ["หน้าฝนปีนี้", "naa-fon-bpii-nii", "naa fon bpii nii", "今年雨季", "名词", "季节", "หน้าฝนปีนี้ถนนเปียกบ่อย", "naa fon bpii nii tha-non bpiiak baawy", "今年雨季道路经常是湿的。", "season"],
  ["หน้าหนาว", "naa-naao", "naa naao", "凉季；冬天", "名词", "季节", "หน้าหนาวฉันชอบดื่มน้ำอุ่น", "naa naao chan chaawp deum naam un", "凉季我喜欢喝温水。", "season"],
  ["วันฝนตก", "wan-fon-dtok", "wan fon dtok", "下雨天", "名词", "季节", "วันฝนตกเราอยู่บ้านและอ่านหนังสือ", "wan fon dtok rao yuu baan lae aan nang-sue", "下雨天我们待在家看书。", "weather"],
  ["วันที่แดดแรง", "wan-thii-daaet-raaeng", "wan thii daaet raaeng", "太阳很晒的日子", "名词", "季节", "วันที่แดดแรงต้องใส่หมวก", "wan thii daaet raaeng dtawng sai muak", "太阳很晒的日子要戴帽子。", "weather"],
  ["ท้องฟ้าสีฟ้า", "thaawng-faa-sii-faa", "thaawng-faa sii faa", "蓝色天空", "名词", "自然景物", "ท้องฟ้าสีฟ้าดูสวยมาก", "thaawng-faa sii faa duu suai maak", "蓝色天空看起来很漂亮。", "sky"],
  ["ดาวบนฟ้า", "daao-bon-faa", "daao bon faa", "天上的星星", "名词", "自然景物", "คืนนี้มีดาวบนฟ้าเยอะ", "khuen-nii mii daao bon faa yoe", "今晚天上的星星很多。", "sky"],
  ["พระจันทร์เต็มดวง", "phra-jan-dtem-duang", "phra-jan dtem duang", "满月", "名词", "自然景物", "คืนนี้พระจันทร์เต็มดวงสวยมาก", "khuen-nii phra-jan dtem duang suai maak", "今晚满月很漂亮。", "sky"],
  ["แม่น้ำกว้าง", "maae-naam-gwaang", "maae-naam gwaang", "宽阔的河", "名词", "自然景物", "บ้านของเขาอยู่ใกล้แม่น้ำกว้าง", "baan khaawng khao yuu glai maae-naam gwaang", "他家在宽阔的河附近。", "nature"],
  ["น้ำในคลอง", "naam-nai-khlaawng", "naam nai khlaawng", "คลอง里的水；运河水", "名词", "自然景物", "น้ำในคลองวันนี้ใสมาก", "naam nai khlaawng wan-nii sai maak", "今天运河里的水很清。", "nature"],
  ["ภูเขาสูง", "phuu-khao-suung", "phuu-khao suung", "高山", "名词", "自然景物", "เราเห็นภูเขาสูงจากหน้าต่าง", "rao hen phuu-khao suung jaak naa-dtaang", "我们从窗户看见高山。", "nature"],
  ["ทะเลสีฟ้า", "tha-lee-sii-faa", "tha-lee sii faa", "蓝色大海", "名词", "自然景物", "ทะเลสีฟ้าสวยมากในตอนเช้า", "tha-lee sii faa suai maak nai dtaawn chaao", "早上的蓝色大海很美。", "nature"],
  ["หาดทรายขาว", "haat-saai-khaao", "haat saai khaao", "白沙滩", "名词", "自然景物", "เด็ก ๆ เล่นบนหาดทรายขาว", "dek dek len bon haat saai khaao", "孩子们在白沙滩上玩。", "nature"],
  ["เกาะเล็ก", "gaw-lek", "gaw lek", "小岛", "名词", "自然景物", "เราเห็นเกาะเล็กอยู่ไกล ๆ", "rao hen gaw lek yuu glai glai", "我们看见远处有一座小岛。", "nature"],
  ["ป่าเขียว", "bpaa-khiaao", "bpaa khiaao", "绿色森林", "名词", "自然景物", "ป่าเขียวหลังฝนตกดูสดชื่น", "bpaa khiaao lang fon dtok duu sot-cheun", "雨后的绿色森林看起来很清新。", "nature"],
  ["ทุ่งนา", "thung-naa", "thung naa", "稻田；田野", "名词", "自然景物", "ทุ่งนาหน้าบ้านเป็นสีเขียว", "thung naa naa baan bpen sii khiaao", "家门前的稻田是绿色的。", "nature"],
  ["สวนดอกไม้", "suan-daawk-maai", "suan daawk-maai", "花园", "名词", "自然景物", "แม่เดินเล่นในสวนดอกไม้", "maae doen len nai suan daawk-maai", "妈妈在花园里散步。", "nature"],
  ["ต้นไม้ใหญ่", "dton-maai-yai", "dton-maai yai", "大树", "名词", "动物植物", "มีต้นไม้ใหญ่อยู่หน้าบ้าน", "mii dton-maai yai yuu naa baan", "家门口有一棵大树。", "plant"],
  ["ต้นไม้เล็ก", "dton-maai-lek", "dton-maai lek", "小树", "名词", "动物植物", "เด็กปลูกต้นไม้เล็กในกระถาง", "dek bpluuk dton-maai lek nai gra-thaang", "孩子在花盆里种小树。", "plant"],
  ["ใบไม้เขียว", "bai-maai-khiaao", "bai-maai khiaao", "绿叶", "名词", "动物植物", "ใบไม้เขียวเต็มต้นไม้", "bai-maai khiaao dtem dton-maai", "树上满是绿叶。", "plant"],
  ["ดอกไม้สีแดง", "daawk-maai-sii-daaeng", "daawk-maai sii daaeng", "红花", "名词", "动物植物", "ดอกไม้สีแดงอยู่ในแก้วน้ำ", "daawk-maai sii daaeng yuu nai gaaeo naam", "红花在水杯里。", "plant"],
  ["หญ้าสีเขียว", "yaa-sii-khiaao", "yaa sii khiaao", "绿草", "名词", "动物植物", "เด็กนั่งบนหญ้าสีเขียว", "dek nang bon yaa sii khiaao", "孩子坐在绿草上。", "plant"],
  ["ดินเปียก", "din-bpiiak", "din bpiiak", "湿土", "名词", "环境描述", "หลังฝนตกดินเปียกมาก", "lang fon dtok din bpiiak maak", "下雨后土很湿。", "environment"],
  ["ทรายร้อน", "saai-raawn", "saai raawn", "热沙子", "名词", "环境描述", "ตอนเที่ยงทรายร้อนจนเดินเท้าเปล่าไม่ได้", "dtaawn thiiang saai raawn jon doen thaao bplao mai dai", "中午沙子很热，不能光脚走。", "environment"],
  ["หินก้อนใหญ่", "hin-gaawn-yai", "hin gaawn yai", "大石头", "名词", "环境描述", "มีหินก้อนใหญ่อยู่ริมทาง", "mii hin gaawn yai yuu rim thaang", "路边有一块大石头。", "environment"],
  ["อากาศสะอาด", "aa-gaat-sa-aat", "aa-gaat sa-aat", "空气干净", "形容词", "环境描述", "บนภูเขาอากาศสะอาดมาก", "bon phuu-khao aa-gaat sa-aat maak", "山上空气很干净。", "environment"],
  ["อากาศไม่สะอาด", "aa-gaat-mai-sa-aat", "aa-gaat mai sa-aat", "空气不干净", "形容词", "环境描述", "ในเมืองใหญ่บางวันอากาศไม่สะอาด", "nai mueang yai baang wan aa-gaat mai sa-aat", "大城市有些天空气不干净。", "environment"],
  ["น้ำใส", "naam-sai", "naam sai", "水清澈", "形容词", "环境描述", "น้ำในแม่น้ำใสและเย็น", "naam nai maae-naam sai lae yen", "河里的水清澈又凉。", "environment"],
  ["น้ำขุ่น", "naam-khun", "naam khun", "水浑浊", "形容词", "环境描述", "หลังฝนตกน้ำในคลองขุ่น", "lang fon dtok naam nai khlaawng khun", "下雨后运河水浑浊。", "environment"],
  ["เสียงนก", "siiang-nok", "siiang nok", "鸟叫声", "名词", "动物植物", "ตอนเช้าฉันได้ยินเสียงนก", "dtaawn chaao chan dai-yin siiang nok", "早上我听见鸟叫声。", "animal"],
  ["นกสีขาว", "nok-sii-khaao", "nok sii khaao", "白色的鸟", "名词", "动物植物", "นกสีขาวบินผ่านบ้าน", "nok sii khaao bin phaan baan", "一只白色的鸟飞过房子。", "animal"],
  ["แมวในสวน", "maaeo-nai-suan", "maaeo nai suan", "花园里的猫", "名词", "动物植物", "แมวในสวนกำลังนอนใต้ต้นไม้", "maaeo nai suan gam-lang naawn dtai dton-maai", "花园里的猫正睡在树下。", "animal"],
  ["หมาหน้าบ้าน", "maa-naa-baan", "maa naa baan", "家门口的狗", "名词", "动物植物", "หมาหน้าบ้านเห่าเมื่อมีคนมา", "maa naa baan hao muea mii khon maa", "有人来时，家门口的狗会叫。", "animal"],
  ["ปลาตัวเล็ก", "bplaa-dtua-lek", "bplaa dtua lek", "小鱼", "名词", "动物植物", "เด็กเห็นปลาตัวเล็กในน้ำใส", "dek hen bplaa dtua lek nai naam sai", "孩子在清水里看见小鱼。", "animal"],
  ["ผีเสื้อสีสวย", "phii-seua-sii-suai", "phii-seua sii suai", "颜色漂亮的蝴蝶", "名词", "动物植物", "ผีเสื้อสีสวยบินใกล้ดอกไม้", "phii-seua sii suai bin glai daawk-maai", "颜色漂亮的蝴蝶在花附近飞。", "animal"],
  ["มดตัวเล็ก", "mot-dtua-lek", "mot dtua lek", "小蚂蚁", "名词", "动物植物", "มดตัวเล็กเดินบนโต๊ะ", "mot dtua lek doen bon dto", "小蚂蚁在桌上爬。", "animal"],
  ["ยุงเยอะ", "yung-yoe", "yung yoe", "蚊子多", "形容词", "动物植物", "ตอนเย็นในสวนมียุงเยอะ", "dtaawn yen nai suan mii yung yoe", "傍晚花园里蚊子很多。", "animal"],
  ["วัวในทุ่ง", "wuua-nai-thung", "wuua nai thung", "田野里的牛", "名词", "动物植物", "วัวในทุ่งกินหญ้า", "wuua nai thung gin yaa", "田野里的牛在吃草。", "animal"],
  ["ควายใกล้นา", "khwaai-glai-naa", "khwaai glai naa", "稻田附近的水牛", "名词", "动物植物", "ควายใกล้นาเดินช้า ๆ", "khwaai glai naa doen chaa chaa", "稻田附近的水牛慢慢走。", "animal"],
  ["ไก่ในบ้าน", "gai-nai-baan", "gai nai baan", "家里的鸡", "名词", "动物植物", "ไก่ในบ้านตื่นเช้ามาก", "gai nai baan dteun chaao maak", "家里的鸡起得很早。", "animal"],
  ["เป็ดในคลอง", "bpet-nai-khlaawng", "bpet nai khlaawng", "คลอง里的鸭子", "名词", "动物植物", "เป็ดในคลองว่ายน้ำช้า ๆ", "bpet nai khlaawng waai naam chaa chaa", "คลอง里的鸭子慢慢游水。", "animal"],
  ["บ้านใกล้สวน", "baan-glai-suan", "baan glai suan", "靠近花园的家", "短语", "环境描述", "บ้านใกล้สวนอากาศดีตอนเช้า", "baan glai suan aa-gaat dii dtaawn chaao", "靠近花园的家早上空气好。", "environment"],
  ["ถนนใกล้ทะเล", "tha-non-glai-tha-lee", "tha-non glai tha-lee", "海边附近的路", "短语", "环境描述", "ถนนใกล้ทะเลมีลมแรง", "tha-non glai tha-lee mii lom raaeng", "海边附近的路风很大。", "environment"],
  ["หมู่บ้านเงียบ", "muu-baan-ngiiap", "muu-baan ngiiap", "安静的村子", "名词", "环境描述", "หมู่บ้านเงียบในตอนกลางคืน", "muu-baan ngiiap nai dtaawn glaang-kheun", "村子夜里很安静。", "environment"],
  ["เมืองร้อน", "mueang-raawn", "mueang raawn", "炎热的城市", "名词", "环境描述", "เมืองร้อนต้องมีต้นไม้เยอะ", "mueang raawn dtawng mii dton-maai yoe", "炎热的城市需要很多树。", "environment"],
  ["สวนสะอาด", "suan-sa-aat", "suan sa-aat", "干净的花园/公园", "名词", "环境描述", "สวนสะอาดมีคนมาเดินเล่นทุกวัน", "suan sa-aat mii khon maa doen len thuk wan", "干净的公园每天都有人来散步。", "environment"],
  ["คลองใกล้บ้าน", "khlaawng-glai-baan", "khlaawng glai baan", "家附近的คลอง/运河", "名词", "自然景物", "คลองใกล้บ้านมีปลาตัวเล็ก", "khlaawng glai baan mii bplaa dtua lek", "家附近的运河里有小鱼。", "nature"],
  ["ทางเดินในสวน", "thaang-doen-nai-suan", "thaang doen nai suan", "花园里的步道", "名词", "环境描述", "ทางเดินในสวนเปียกหลังฝนตก", "thaang doen nai suan bpiiak lang fon dtok", "下雨后花园里的步道湿了。", "environment"],
  ["อากาศใกล้ทะเล", "aa-gaat-glai-tha-lee", "aa-gaat glai tha-lee", "海边附近的空气", "名词", "环境描述", "อากาศใกล้ทะเลเย็นสบาย", "aa-gaat glai tha-lee yen sa-baai", "海边附近的空气凉爽舒服。", "environment"],
  ["ร่มไม้เย็น", "rom-maai-yen", "rom maai yen", "树荫凉快", "名词", "自然景物", "ตอนบ่ายเรานั่งพักใต้ร่มไม้เย็น", "dtaawn baai rao nang phak dtai rom maai yen", "下午我们坐在凉快的树荫下休息。", "nature"],
  ["ลานหน้าบ้าน", "laan-naa-baan", "laan naa baan", "家门前的空地", "名词", "环境描述", "ลานหน้าบ้านแห้งแล้วหลังแดดออก", "laan naa baan haaeng laaeo lang daaet aawk", "太阳出来后，家门前的空地已经干了。", "environment"],
  ["ดอกไม้บาน", "daawk-maai-baan", "daawk-maai baan", "花开了", "短语", "动物植物", "ตอนเช้าดอกไม้บานและมีกลิ่นหอม", "dtaawn chaao daawk-maai baan lae mii glin haawm", "早上花开了，还有香味。", "plant"],
  ["ใบไม้ร่วง", "bai-maai-ruang", "bai-maai ruang", "叶子落下", "短语", "动物植物", "ลมแรงทำให้ใบไม้ร่วงบนถนน", "lom raaeng tham-hai bai-maai ruang bon tha-non", "大风让叶子落在路上。", "plant"],
  ["ดินแห้ง", "din-haaeng", "din haaeng", "土干了", "形容词", "环境描述", "หลายวันไม่มีฝน ดินแห้งมาก", "laai wan mai mii fon, din haaeng maak", "好几天没有下雨，土很干。", "environment"],
  ["เสียงฝนเบา ๆ", "siiang-fon-bao-bao", "siiang fon bao bao", "轻轻的雨声", "名词", "雨风太阳", "คืนนี้ฉันได้ยินเสียงฝนเบา ๆ", "khuen-nii chan dai-yin siiang fon bao bao", "今晚我听见轻轻的雨声。", "rain"],
] as const satisfies readonly Row[];

const toCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = row;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a1", "weather-nature", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a1",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A1 阶段先把天气、自然和环境表达整组记忆，再替换时间或地点。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["适合描述天气、季节、自然景物、动物植物和身边环境。"],
    tags,
    sourceRefs: WEATHER_NATURE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_WEATHER_NATURE_01 = rows.map(toCandidate);
