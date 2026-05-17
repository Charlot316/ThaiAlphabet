export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "移动动作" | "日常动作" | "看听说" | "买卖使用" | "开关动作" | "冷热大小" | "快慢喜好";
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

const DAILY_VERBS_ADJECTIVES_REFS = ["thai-frequency", "thai-a1-daily-verbs-adjectives-candidate"];

const rows = [
  ["ไปโรงเรียนตอนเช้า", "bpai-roong-riian-dtaawn-chaao", "bpai roong-riian dtaawn chaao", "早上去学校", "动词", "移动动作", "เด็ก ๆ ไปโรงเรียนตอนเจ็ดโมง", "dek dek bpai roong-riian dtaawn jet moong", "孩子们七点去学校。", "go"],
  ["ไปตลาดตอนเช้า", "bpai-dta-laat-dtaawn-chaao", "bpai dta-laat dtaawn chaao", "早上去市场", "动词", "移动动作", "แม่ไปตลาดเพื่อซื้อผัก", "maae bpai dta-laat phuea sue phak", "妈妈去市场买菜。", "go"],
  ["ไปทำงาน", "bpai-tham-ngaan", "bpai tham-ngaan", "去上班", "动词", "移动动作", "พ่อไปทำงานแต่เช้า", "phaaw bpai tham-ngaan dtaae chaao", "爸爸一大早去上班。", "go"],
  ["ไปบ้านเพื่อน", "bpai-baan-pheuan", "bpai baan pheuan", "去朋友家", "动词", "移动动作", "วันเสาร์ฉันไปบ้านเพื่อน", "wan sao chan bpai baan pheuan", "星期六我去朋友家。", "go"],
  ["ไปหาหมอตอนเช้า", "bpai-haa-maaw-dtaawn-chaao", "bpai haa maaw dtaawn chaao", "早上去看医生", "动词", "移动动作", "เขาไม่สบายจึงไปหาหมอ", "khao mai sa-baai jeung bpai haa maaw", "他不舒服，所以去看医生。", "go"],
  ["ไปซื้อของ", "bpai-sue-khaawng", "bpai sue khaawng", "去买东西", "动词", "移动动作", "เราจะไปซื้อของหลังเลิกเรียน", "rao ja bpai sue khaawng lang loek riian", "我们放学后要去买东西。", "go"],
  ["พรุ่งนี้ไปด้วยกัน", "phrung-nii-bpai-duai-gan", "phrung-nii bpai duai gan", "明天一起去", "动词", "移动动作", "พรุ่งนี้เราไปด้วยกันไหม", "phrung-nii rao bpai duai gan mai", "明天我们一起去吗？", "go"],
  ["มาที่นี่", "maa-thii-nii", "maa thii nii", "来这里", "动词", "移动动作", "คุณมาที่นี่กี่โมง", "khun maa thii nii gii moong", "你几点来这里？", "come"],
  ["มาบ้านฉัน", "maa-baan-chan", "maa baan chan", "来我家", "动词", "移动动作", "เพื่อนมาบ้านฉันตอนบ่าย", "pheuan maa baan chan dtaawn baai", "朋友下午来我家。", "come"],
  ["มาช้า", "maa-chaa", "maa chaa", "来晚", "动词", "移动动作", "วันนี้รถติด เขาจึงมาช้า", "wan-nii rot dtit, khao jeung maa chaa", "今天堵车，所以他来晚了。", "come"],
  ["มาเร็ว", "maa-reo", "maa reo", "来得早/快来", "动词", "移动动作", "ครูบอกให้นักเรียนมาเร็วพรุ่งนี้", "khruu baawk hai nak-riian maa reo phrung-nii", "老师让学生们明天早点来。", "come"],
  ["กลับบ้านทันที", "glap-baan-than-thii", "glap baan than-thii", "马上回家", "动词", "移动动作", "หลังเลิกงานแม่กลับบ้านทันที", "lang loek ngaan maae glap baan than-thii", "下班后妈妈马上回家。", "go"],
  ["กลับช้า", "glap-chaa", "glap chaa", "回得晚", "动词", "移动动作", "วันนี้พ่อกลับช้าเพราะมีประชุม", "wan-nii phaaw glap chaa phraw mii bpra-chum", "今天爸爸回得晚，因为有会议。", "go"],
  ["กลับเร็ว", "glap-reo", "glap reo", "回得早", "动词", "移动动作", "เด็ก ๆ กลับเร็วเพราะฝนจะตก", "dek dek glap reo phraw fon ja dtok", "孩子们回得早，因为快下雨了。", "go"],
  ["เดินไป", "doen-bpai", "doen bpai", "走过去", "动词", "移动动作", "ฉันเดินไปโรงเรียนทุกเช้า", "chan doen bpai roong-riian thuk chaao", "我每天早上走路去学校。", "move"],
  ["เดินกลับ", "doen-glap", "doen glap", "走回去；走回来", "动词", "移动动作", "เราเดินกลับบ้านหลังอาหารเย็น", "rao doen glap baan lang aa-haan yen", "晚饭后我们走回家。", "move"],
  ["นั่งลง", "nang-long", "nang long", "坐下", "动词", "日常动作", "ครูบอกให้นักเรียนนั่งลง", "khruu baawk hai nak-riian nang long", "老师让学生坐下。", "body"],
  ["ยืนขึ้น", "yuen-kheun", "yuen kheun", "站起来", "动词", "日常动作", "เด็ก ๆ ยืนขึ้นเมื่อครูเข้าห้อง", "dek dek yuen kheun muea khruu khao haawng", "老师进教室时孩子们站起来。", "body"],
  ["คืนนี้นอนเร็ว", "khuen-nii-naawn-reo", "khuen-nii naawn reo", "今晚早睡", "动词", "日常动作", "คืนนี้ฉันจะนอนเร็ว", "khuen-nii chan ja naawn reo", "今晚我要早睡。", "daily"],
  ["พรุ่งนี้ตื่นเช้า", "phrung-nii-dteun-chaao", "phrung-nii dteun chaao", "明天早起", "动词", "日常动作", "พรุ่งนี้เราต้องตื่นเช้า", "phrung-nii rao dtawng dteun chaao", "明天我们必须早起。", "daily"],
  ["อาบน้ำก่อนกินข้าว", "aap-naam-gaawn-gin-khaao", "aap naam gaawn gin khaao", "吃饭前洗澡", "动词", "日常动作", "ฉันอาบน้ำก่อนกินข้าวเย็น", "chan aap naam gaawn gin khaao yen", "我晚饭前洗澡。", "daily"],
  ["ล้างหน้าตอนเช้า", "laang-naa-dtaawn-chaao", "laang naa dtaawn chaao", "早上洗脸", "动词", "日常动作", "ตอนเช้าฉันล้างหน้าและแปรงฟัน", "dtaawn chaao chan laang naa lae bpraaeng fan", "早上我洗脸刷牙。", "daily"],
  ["แปรงฟันก่อนนอน", "bpraaeng-fan-gaawn-naawn", "bpraaeng fan gaawn naawn", "睡前刷牙", "动词", "日常动作", "เด็กควรแปรงฟันก่อนนอน", "dek khuuan bpraaeng fan gaawn naawn", "孩子睡前应该刷牙。", "daily"],
  ["ใส่เสื้อสีฟ้า", "sai-seua-sii-faa", "sai seua sii faa", "穿蓝色衣服", "动词", "日常动作", "น้องใส่เสื้อสีฟ้าไปโรงเรียน", "naawng sai seua sii faa bpai roong-riian", "弟弟穿蓝色衣服去学校。", "daily"],
  ["ถอดรองเท้าก่อนเข้าบ้าน", "thaawt-raawng-thaao-gaawn-khao-baan", "thaawt raawng-thaao gaawn khao baan", "进家门前脱鞋", "动词", "日常动作", "ก่อนเข้าบ้านต้องถอดรองเท้า", "gaawn khao baan dtawng thaawt raawng-thaao", "进家门前必须脱鞋。", "daily"],
  ["ทำการบ้านหลังอาหาร", "tham-gaan-baan-lang-aa-haan", "tham gaan-baan lang aa-haan", "饭后做作业", "动词", "日常动作", "ฉันทำการบ้านหลังอาหารเย็น", "chan tham gaan-baan lang aa-haan yen", "我晚饭后做作业。", "study"],
  ["ทำงานบ้าน", "tham-ngaan-baan", "tham ngaan-baan", "做家务", "动词", "日常动作", "วันอาทิตย์ทุกคนช่วยกันทำงานบ้าน", "wan aa-thit thuk khon chuai gan tham ngaan-baan", "星期天大家一起做家务。", "daily"],
  ["ทำอาหารเช้า", "tham-aa-haan-chaao", "tham aa-haan chaao", "做早餐", "动词", "日常动作", "พ่อทำอาหารเช้าให้ลูก", "phaaw tham aa-haan chaao hai luuk", "爸爸给孩子做早餐。", "cook"],
  ["ทำความสะอาดห้องวันเสาร์", "tham-khwaam-sa-aat-haawng-wan-sao", "tham khwaam sa-aat haawng wan sao", "星期六打扫房间", "动词", "日常动作", "เราทำความสะอาดห้องทุกวันเสาร์", "rao tham khwaam sa-aat haawng thuk wan sao", "我们每周六打扫房间。", "daily"],
  ["ดูทีวี", "duu-thii-wii", "duu thii-wii", "看电视", "动词", "看听说", "คุณยายดูทีวีหลังอาหารเย็น", "khun-yaai duu thii-wii lang aa-haan yen", "奶奶晚饭后看电视。", "see"],
  ["ดูหนังที่บ้าน", "duu-nang-thii-baan", "duu nang thii baan", "在家看电影", "动词", "看听说", "วันศุกร์เราดูหนังที่บ้าน", "wan suk rao duu nang thii baan", "星期五我们在家看电影。", "see"],
  ["ดูรูปในโทรศัพท์", "duu-ruup-nai-thoo-ra-sap", "duu ruup nai thoo-ra-sap", "看手机里的照片", "动词", "看听说", "แม่ดูรูปในโทรศัพท์", "maae duu ruup nai thoo-ra-sap", "妈妈看手机里的照片。", "see"],
  ["ดูทาง", "duu-thaang", "duu thaang", "看路；注意路", "动词", "看听说", "เวลาเดินข้ามถนนต้องดูทาง", "wee-laa doen khaam tha-non dtawng duu thaang", "过马路时必须看路。", "see"],
  ["มองออกไป", "maawng-aawk-bpai", "maawng aawk bpai", "向外看", "动词", "看听说", "เด็กมองออกไปนอกหน้าต่าง", "dek maawng aawk bpai naawk naa-dtaang", "孩子向窗外看。", "see"],
  ["เห็นชัด", "hen-chat", "hen chat", "看得清楚", "动词", "看听说", "ฉันนั่งหน้าเพราะเห็นชัดกว่า", "chan nang naa phraw hen chat gwaa", "我坐前面，因为看得更清楚。", "see"],
  ["ฟังเพลง", "fang-phleeng", "fang phleeng", "听音乐", "动词", "看听说", "พี่สาวฟังเพลงตอนทำงาน", "phii-saao fang phleeng dtaawn tham-ngaan", "姐姐工作时听音乐。", "listen"],
  ["ฟังครู", "fang-khruu", "fang khruu", "听老师讲", "动词", "看听说", "นักเรียนฟังครูและเขียนคำใหม่", "nak-riian fang khruu lae khian kham mai", "学生听老师讲，并写新词。", "listen"],
  ["ได้ยินเสียง", "dai-yin-siiang", "dai yin siiang", "听见声音", "动词", "看听说", "ฉันได้ยินเสียงฝนตอนกลางคืน", "chan dai yin siiang fon dtaawn glaang-kheun", "我夜里听见雨声。", "listen"],
  ["พูดภาษาไทยได้นิดหน่อย", "phuut-phaa-saa-thai-dai-nit-naawy", "phuut phaa-saa thai dai nit naawy", "会说一点泰语", "动词", "看听说", "ฉันพูดภาษาไทยได้นิดหน่อย", "chan phuut phaa-saa thai dai nit naawy", "我会说一点泰语。", "speak"],
  ["กรุณาพูดช้า ๆ", "ga-ru-naa-phuut-chaa-chaa", "ga-ru-naa phuut chaa chaa", "请慢慢说", "短语", "看听说", "กรุณาพูดช้า ๆ ได้ไหม", "ga-ru-naa phuut chaa chaa dai mai", "请慢慢说，可以吗？", "speak"],
  ["พูดดัง", "phuut-dang", "phuut dang", "大声说", "动词", "看听说", "อย่าพูดดังในห้องสมุด", "yaa phuut dang nai haawng-sa-mut", "不要在图书馆大声说话。", "speak"],
  ["บอกแม่", "baawk-maae", "baawk maae", "告诉妈妈", "动词", "看听说", "ถ้าไม่สบายให้บอกแม่", "thaa mai sa-baai hai baawk maae", "如果不舒服，就告诉妈妈。", "speak"],
  ["ไม่เข้าใจให้ถามครู", "mai-khao-jai-hai-thaam-khruu", "mai khao-jai hai thaam khruu", "不懂就问老师", "短语", "看听说", "ถ้าไม่เข้าใจให้ถามครู", "thaa mai khao-jai hai thaam khruu", "如果不懂，就问老师。", "speak"],
  ["ตอบคำถามได้ดี", "dtaawp-kham-thaam-dai-dii", "dtaawp kham-thaam dai dii", "问题回答得好", "动词", "看听说", "เด็กคนนั้นตอบคำถามได้ดี", "dek khon nan dtaawp kham-thaam dai dii", "那个孩子问题回答得很好。", "speak"],
  ["อ่านหนังสือก่อนนอน", "aan-nang-sue-gaawn-naawn", "aan nang-sue gaawn naawn", "睡前看书", "动词", "看听说", "ฉันอ่านหนังสือก่อนนอน", "chan aan nang-sue gaawn naawn", "我睡前看书。", "read"],
  ["เขียนชื่อ", "khian-chue", "khian chue", "写名字", "动词", "看听说", "กรุณาเขียนชื่อบนกระดาษ", "ga-ru-naa khian chue bon gra-daat", "请把名字写在纸上。", "write"],
  ["ซื้อข้าว", "sue-khaao", "sue khaao", "买饭", "动词", "买卖使用", "ตอนเที่ยงฉันไปซื้อข้าวที่ร้านหน้าโรงเรียน", "dtaawn thiiang chan bpai sue khaao thii raan naa roong-riian", "中午我去学校门口的店买饭。", "buy"],
  ["ซื้อเสื้อใหม่", "sue-seua-mai", "sue seua mai", "买新衣服", "动词", "买卖使用", "แม่ซื้อเสื้อใหม่ให้ลูกสาว", "maae sue seua mai hai luuk-saao", "妈妈给女儿买新衣服。", "buy"],
  ["ซื้อของออนไลน์", "sue-khaawng-awn-lai", "sue khaawng awn-lai", "网购；在线买东西", "动词", "买卖使用", "พี่ชายซื้อของออนไลน์บ่อยมาก", "phii-chaai sue khaawng awn-lai baawy maak", "哥哥很常网购。", "buy"],
  ["ขายผลไม้", "khaai-phon-la-maai", "khaai phon-la-maai", "卖水果", "动词", "买卖使用", "ป้าขายผลไม้ที่ตลาดตอนเช้า", "bpaa khaai phon-la-maai thii dta-laat dtaawn chaao", "阿姨早上在市场卖水果。", "sell"],
  ["ขายข้าวแกง", "khaai-khaao-gaaeng", "khaai khaao gaaeng", "卖盖饭/咖喱饭", "动词", "买卖使用", "ร้านนี้ขายข้าวแกงราคาถูก", "raan nii khaai khaao gaaeng raa-khaa thuuk", "这家店卖的盖饭价格便宜。", "sell"],
  ["ขายหมด", "khaai-mot", "khaai mot", "卖完", "动词", "买卖使用", "ขนมปังร้านนี้ขายหมดเร็ว", "kha-nom bpang raan nii khaai mot reo", "这家店的面包很快卖完。", "sell"],
  ["ใช้โทรศัพท์", "chai-thoo-ra-sap", "chai thoo-ra-sap", "使用电话/手机", "动词", "买卖使用", "อย่าใช้โทรศัพท์ตอนกินข้าว", "yaa chai thoo-ra-sap dtaawn gin khaao", "吃饭时不要用手机。", "use"],
  ["ใช้คอมพิวเตอร์เปิดรูป", "chai-khaawm-phiu-dtoe-bpoet-ruup", "chai khaawm-phiu-dtoe bpoet ruup", "用电脑打开图片", "动词", "买卖使用", "ครูใช้คอมพิวเตอร์เปิดรูปภาพ", "khruu chai khaawm-phiu-dtoe bpoet ruup-phaap", "老师用电脑打开图片。", "use"],
  ["ใช้เงินสด", "chai-ngoen-sot", "chai ngoen sot", "使用现金", "动词", "买卖使用", "ร้านเล็ก ๆ นี้ใช้เงินสดเท่านั้น", "raan lek lek nii chai ngoen sot thao-nan", "这家小店只收现金。", "use"],
  ["เปิดไฟในครัว", "bpoet-fai-nai-khruua", "bpoet fai nai khruua", "打开厨房的灯", "动词", "开关动作", "ตอนเย็นแม่เปิดไฟในห้องครัว", "dtaawn yen maae bpoet fai nai haawng-khruua", "傍晚妈妈打开厨房的灯。", "open"],
  ["ปิดไฟก่อนนอน", "bpit-fai-gaawn-naawn", "bpit fai gaawn naawn", "睡前关灯", "动词", "开关动作", "ก่อนนอนอย่าลืมปิดไฟ", "gaawn naawn yaa leum bpit fai", "睡前别忘了关灯。", "close"],
  ["เปิดประตูให้แขก", "bpoet-bpra-dtuu-hai-khaaek", "bpoet bpra-dtuu hai khaaek", "给客人开门", "动词", "开关动作", "พ่อเปิดประตูให้แขก", "phaaw bpoet bpra-dtuu hai khaaek", "爸爸给客人开门。", "open"],
  ["กรุณาปิดประตู", "ga-ru-naa-bpit-bpra-dtuu", "ga-ru-naa bpit bpra-dtuu", "请关门", "短语", "开关动作", "ลมแรงมาก กรุณาปิดประตู", "lom raaeng maak, ga-ru-naa bpit bpra-dtuu", "风很大，请关门。", "close"],
  ["เปิดหน้าต่างรับลม", "bpoet-naa-dtaang-rap-lom", "bpoet naa-dtaang rap lom", "开窗通风", "动词", "开关动作", "ตอนเช้าฉันเปิดหน้าต่างรับลม", "dtaawn chaao chan bpoet naa-dtaang rap lom", "早上我打开窗户通风。", "open"],
  ["ปิดหน้าต่างเร็ว", "bpit-naa-dtaang-reo", "bpit naa-dtaang reo", "快关窗", "短语", "开关动作", "ฝนจะตกแล้ว ปิดหน้าต่างเร็ว", "fon ja dtok laaeo, bpit naa-dtaang reo", "快下雨了，快关窗。", "close"],
  ["เปิดน้ำ", "bpoet-naam", "bpoet naam", "打开水龙头", "动词", "开关动作", "อย่าเปิดน้ำทิ้งไว้นาน", "yaa bpoet naam thing wai naan", "不要把水龙头开着太久。", "open"],
  ["ล้างมือแล้วปิดน้ำ", "laang-mue-laaeo-bpit-naam", "laang mue laaeo bpit naam", "洗手后关水", "短语", "开关动作", "หลังล้างมือแล้วต้องปิดน้ำ", "lang laang mue laaeo dtawng bpit naam", "洗手后必须关水龙头。", "close"],
  ["ขอเปิดแอร์", "khaaw-bpoet-ae", "khaaw bpoet ae", "请求开空调", "短语", "开关动作", "ห้องร้อนมาก ขอเปิดแอร์ได้ไหม", "haawng raawn maak, khaaw bpoet ae dai mai", "房间很热，可以开空调吗？", "open"],
  ["ปิดแอร์ก่อนออก", "bpit-ae-gaawn-aawk", "bpit ae gaawn aawk", "离开前关空调", "动词", "开关动作", "ก่อนออกจากห้องให้ปิดแอร์", "gaawn aawk jaak haawng hai bpit ae", "离开房间前请关空调。", "close"],
  ["อากาศร้อนมาก", "aa-gaat-raawn-maak", "aa-gaat raawn maak", "天气很热", "形容词", "冷热大小", "วันนี้อากาศร้อนมาก", "wan-nii aa-gaat raawn maak", "今天天气很热。", "temperature"],
  ["ลมเย็นสบาย", "lom-yen-sa-baai", "lom yen sa-baai", "风凉爽舒服", "形容词", "冷热大小", "ตอนเย็นลมเย็นสบาย", "dtaawn yen lom yen sa-baai", "傍晚的风凉爽舒服。", "temperature"],
  ["หนาวนิดหน่อย", "naao-nit-naawy", "naao nit naawy", "有点冷", "形容词", "冷热大小", "ตอนเช้าวันนี้หนาวนิดหน่อย", "dtaawn chaao wan-nii naao nit naawy", "今天早上有点冷。", "temperature"],
  ["อุ่นดี", "un-dii", "un dii", "温暖正好", "形容词", "冷热大小", "น้ำแก้วนี้อุ่นดี ไม่ร้อนเกินไป", "naam gaaeo nii un dii, mai raawn goen bpai", "这杯水温度正好，不太烫。", "temperature"],
  ["ใหญ่เกินไป", "yai-goen-bpai", "yai goen bpai", "太大", "形容词", "冷热大小", "รองเท้าคู่นี้ใหญ่เกินไปสำหรับฉัน", "raawng-thaao khuu nii yai goen bpai sam-rap chan", "这双鞋对我来说太大。", "size"],
  ["เล็กเกินไป", "lek-goen-bpai", "lek goen bpai", "太小", "形容词", "冷热大小", "เสื้อตัวนี้เล็กเกินไป", "seua dtua nii lek goen bpai", "这件衣服太小。", "size"],
  ["ยาวมาก", "yaao-maak", "yaao maak", "很长", "形容词", "冷热大小", "กระโปรงตัวนี้ยาวมาก", "gra-bproong dtua nii yaao maak", "这条裙子很长。", "size"],
  ["สั้นนิดหน่อย", "san-nit-naawy", "san nit naawy", "有点短", "形容词", "冷热大小", "กางเกงตัวนี้สั้นนิดหน่อย", "gaang-geeng dtua nii san nit naawy", "这条裤子有点短。", "size"],
  ["หนักมาก", "nak-maak", "nak maak", "很重", "形容词", "冷热大小", "กระเป๋าใบนี้หนักมาก", "gra-bpao bai nii nak maak", "这个包很重。", "size"],
  ["เบามาก", "bao-maak", "bao maak", "很轻", "形容词", "冷热大小", "กระเป๋าใบใหม่เบามาก", "gra-bpao bai mai bao maak", "新包很轻。", "size"],
  ["เร็วมาก", "reo-maak", "reo maak", "很快", "形容词", "快慢喜好", "รถไฟขบวนนี้เร็วมาก", "rot-fai kha-buan nii reo maak", "这趟火车很快。", "speed"],
  ["ช้ามาก", "chaa-maak", "chaa maak", "很慢", "形容词", "快慢喜好", "อินเทอร์เน็ตวันนี้ช้ามาก", "in-thoe-net wan-nii chaa maak", "今天网络很慢。", "speed"],
  ["เร็วหน่อย", "reo-naawy", "reo naawy", "快一点", "短语", "快慢喜好", "ช่วยเดินเร็วหน่อยได้ไหม", "chuai doen reo naawy dai mai", "可以走快一点吗？", "speed"],
  ["ช้าหน่อย", "chaa-naawy", "chaa naawy", "慢一点", "短语", "快慢喜好", "กรุณาพูดช้าหน่อย", "ga-ru-naa phuut chaa naawy", "请说慢一点。", "speed"],
  ["ชอบกินผลไม้", "chaawp-gin-phon-la-maai", "chaawp gin phon-la-maai", "喜欢吃水果", "动词", "快慢喜好", "ฉันชอบกินผลไม้หลังอาหาร", "chan chaawp gin phon-la-maai lang aa-haan", "我喜欢饭后吃水果。", "like"],
  ["ชอบดื่ม", "chaawp-deum", "chaawp deum", "喜欢喝", "动词", "快慢喜好", "พ่อชอบดื่มกาแฟร้อน", "phaaw chaawp deum gaa-faae raawn", "爸爸喜欢喝热咖啡。", "like"],
  ["ชอบอ่าน", "chaawp-aan", "chaawp aan", "喜欢读；喜欢看书", "动词", "快慢喜好", "น้องสาวชอบอ่านนิทานก่อนนอน", "naawng-saao chaawp aan ni-thaan gaawn naawn", "妹妹喜欢睡前读故事。", "like"],
  ["ชอบเล่น", "chaawp-len", "chaawp len", "喜欢玩", "动词", "快慢喜好", "เด็ก ๆ ชอบเล่นในสวน", "dek dek chaawp len nai suan", "孩子们喜欢在花园里玩。", "like"],
  ["ไม่ชอบร้อน", "mai-chaawp-raawn", "mai chaawp raawn", "不喜欢热", "短语", "快慢喜好", "ฉันไม่ชอบร้อน จึงนั่งใกล้พัดลม", "chan mai chaawp raawn jeung nang glai phat-lom", "我不喜欢热，所以坐在电风扇旁。", "like"],
  ["ไม่ชอบเผ็ด", "mai-chaawp-phet", "mai chaawp phet", "不喜欢辣", "短语", "快慢喜好", "แม่ไม่ชอบเผ็ดมาก", "maae mai chaawp phet maak", "妈妈不喜欢很辣。", "like"],
  ["อยากกินข้าวผัด", "yaak-gin-khaao-phat", "yaak gin khaao phat", "想吃炒饭", "动词", "快慢喜好", "ตอนนี้ฉันอยากกินข้าวผัด", "dtaawn-nii chan yaak gin khaao phat", "现在我想吃炒饭。", "want"],
  ["อยากดื่มน้ำ", "yaak-deum-naam", "yaak deum naam", "想喝水", "动词", "快慢喜好", "อากาศร้อน ฉันอยากดื่มน้ำ", "aa-gaat raawn, chan yaak deum naam", "天气热，我想喝水。", "want"],
  ["อยากกลับบ้าน", "yaak-glap-baan", "yaak glap baan", "想回家", "动词", "快慢喜好", "เด็กเหนื่อยและอยากกลับบ้าน", "dek nueai lae yaak glap baan", "孩子累了，想回家。", "want"],
  ["ต้องการน้ำ", "dtawng-gaan-naam", "dtawng gaan naam", "需要水", "动词", "快慢喜好", "ต้นไม้ต้องการน้ำทุกวัน", "dton-maai dtawng gaan naam thuk wan", "树每天需要水。", "need"],
  ["ต้องการเวลา", "dtawng-gaan-wee-laa", "dtawng gaan wee-laa", "需要时间", "动词", "快慢喜好", "ฉันต้องการเวลาอีกสิบนาที", "chan dtawng gaan wee-laa iik sip naa-thii", "我还需要十分钟。", "need"],
  ["ต้องการความช่วยเหลือ", "dtawng-gaan-khwaam-chuai-leuua", "dtawng gaan khwaam chuai-leuua", "需要帮助", "动词", "快慢喜好", "ถ้าคุณต้องการความช่วยเหลือ กรุณาบอกครู", "thaa khun dtawng gaan khwaam chuai-leuua, ga-ru-naa baawk khruu", "如果你需要帮助，请告诉老师。", "need"],
  ["ไม่ต้องการ", "mai-dtawng-gaan", "mai dtawng gaan", "不需要；不想要", "短语", "快慢喜好", "ฉันไม่ต้องการถุงพลาสติก", "chan mai dtawng gaan thung phlaat-sa-dtik", "我不需要塑料袋。", "need"],
  ["ต้องไปโรงเรียน", "dtawng-bpai-roong-riian", "dtawng bpai roong-riian", "必须去学校", "短语", "移动动作", "พรุ่งนี้ฉันต้องไปโรงเรียนแต่เช้า", "phrung-nii chan dtawng bpai roong-riian dtaae chaao", "明天我必须一早去学校。", "modal"],
  ["ต้องทำการบ้าน", "dtawng-tham-gaan-baan", "dtawng tham gaan-baan", "必须做作业", "短语", "日常动作", "คืนนี้ฉันต้องทำการบ้าน", "khuen-nii chan dtawng tham gaan-baan", "今晚我必须做作业。", "modal"],
  ["ไม่ต้องทำ", "mai-dtawng-tham", "mai dtawng tham", "不用做；不必做", "短语", "日常动作", "วันนี้ไม่ต้องทำงานบ้าน", "wan-nii mai dtawng tham ngaan-baan", "今天不用做家务。", "modal"],
  ["ช่วยเปิดไฟ", "chuai-bpoet-fai", "chuai bpoet fai", "请帮忙开灯", "短语", "开关动作", "มืดแล้ว ช่วยเปิดไฟหน่อย", "meut laaeo, chuai bpoet fai naawy", "天黑了，请帮忙开灯。", "request"],
  ["ช่วยปิดประตู", "chuai-bpit-bpra-dtuu", "chuai bpit bpra-dtuu", "请帮忙关门", "短语", "开关动作", "ลมแรง ช่วยปิดประตูหน่อย", "lom raaeng, chuai bpit bpra-dtuu naawy", "风大，请帮忙关门。", "request"],
  ["ช่วยพูดอีกครั้ง", "chuai-phuut-iik-khrang", "chuai phuut iik khrang", "请再说一次", "短语", "看听说", "ฉันฟังไม่ทัน ช่วยพูดอีกครั้งได้ไหม", "chan fang mai than, chuai phuut iik khrang dai mai", "我没听上，请再说一次可以吗？", "request"],
  ["ช่วยดูหน่อย", "chuai-duu-naawy", "chuai duu naawy", "请帮忙看一下", "短语", "看听说", "คำนี้อ่านยาก ช่วยดูหน่อยได้ไหม", "kham nii aan yaak, chuai duu naawy dai mai", "这个词难读，可以帮我看一下吗？", "request"],
] as const satisfies readonly Row[];

const toCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = row;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a1", "daily-verbs-adjectives", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a1",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: [ "A1 阶段可先整组记忆，再替换地点、物品或人称。" ], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["适合日常动作、简单请求、描述冷热大小快慢和表达喜好需要。"],
    tags,
    sourceRefs: DAILY_VERBS_ADJECTIVES_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_DAILY_VERBS_ADJECTIVES_01 = rows.map(toCandidate);
