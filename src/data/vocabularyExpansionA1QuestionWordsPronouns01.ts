export type VocabularyExpansionPartOfSpeech = "代词" | "疑问词" | "指示词" | "副词" | "短语";
export type VocabularyExpansionLevel = "a1";
export type VocabularyExpansionTheme = "疑问词" | "人称代词" | "指示词" | "基础回答" | "问句框架";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";

export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
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

const QUESTION_PRONOUN_REFS = ["worker-a-a1-question-pronoun", "basic-thai-dialogue"];

const rows: Row[] = [
  ["chan", "ฉัน", "chan", "我；常用于女性或普通自称", "代词", "人称代词", "ฉันชื่อหลิน และฉันเรียนภาษาไทยทุกวัน", "chan chue lin lae chan riian phaa-saa thai thuk wan", "我叫林，我每天学泰语。", "ผม", "phom", "我；男性礼貌自称", "confusable", "ฉัน 较通用，女性常用；ผม 是男性礼貌自称。", "我"],
  ["phom", "ผม", "phom", "我；男性礼貌自称", "代词", "人称代词", "ผมมาจากจีน และตอนนี้ผมอยู่กรุงเทพฯ", "phom maa jaak jiin lae dtaawn-nii phom yuu grung-theep", "我来自中国，现在我在曼谷。", "ดิฉัน", "di-chan", "我；女性正式自称", "confusable", "ผม 男性常用；ดิฉัน 女性正式场合常用。", "我"],
  ["di-chan", "ดิฉัน", "di-chan", "我；女性正式自称", "代词", "人称代词", "ดิฉันขอถามทางไปสถานีรถไฟค่ะ", "di-chan khaaw thaam thaang bpai sa-thaa-nii rot-fai kha", "我想请问去火车站的路。", "ฉัน", "chan", "我；较普通", "usage", "ดิฉัน 比ฉัน 更正式礼貌。", "正式自称"],
  ["rao", "เรา", "rao", "我们；也可作亲近的“我”", "代词", "人称代词", "เราไปตลาดด้วยกันหลังเลิกเรียน", "rao bpai dta-laat duai gan lang loek riian", "我们放学后一起去市场。", "พวกเรา", "phuak rao", "我们大家", "near-synonym", "เรา 可指我们；พวกเรา 更强调一群我们。", "我们"],
  ["phuak-rao", "พวกเรา", "phuak rao", "我们；我们这一群", "代词", "人称代词", "พวกเรารอครูอยู่หน้าห้องเรียน", "phuak rao raaw khruu yuu naa haawng-riian", "我们在教室前等老师。", "เรา", "rao", "我们", "near-synonym", "พวกเรา 比เรา 更明确是一群人。", "我们"],
  ["khun", "คุณ", "khun", "你；您；礼貌称呼", "代词", "人称代词", "คุณชื่ออะไรครับ ผมชื่อหมิงครับ", "khun chue a-rai khrap phom chue ming khrap", "您叫什么名字？我叫明。", "เธอ", "thoe", "你；她", "confusable", "คุณ 礼貌中性；เธอ 常用于熟人，也可指她。", "你"],
  ["thoe", "เธอ", "thoe", "你；她", "代词", "人称代词", "เธออยู่ที่ไหน ฉันรออยู่หน้าร้านกาแฟ", "thoe yuu thii nai chan raaw yuu naa raan gaa-faae", "你在哪里？我在咖啡店前等。", "คุณ", "khun", "你；您", "usage", "เธอ 适合熟人；对不熟的人用คุณ更稳妥。", "你"],
  ["khao", "เขา", "khao", "他；她；那个人", "代词", "人称代词", "เขาเป็นเพื่อนใหม่ของฉันในห้องเรียน", "khao bpen phuean mai khaawng chan nai haawng-riian", "他/她是我班里的新朋友。", "มัน", "man", "它；也可口语指事物", "confusable", "เขา 指人较礼貌；มัน 常指动物、东西或很随意的人称。", "他她"],
  ["man", "มัน", "man", "它；这个东西；很随意的他/她", "代词", "人称代词", "มันอยู่ใต้โต๊ะ ไม่ได้อยู่ในกระเป๋า", "man yuu dtai dto mai dai yuu nai gra-bpao", "它在桌子下面，不在包里。", "เขา", "khao", "他；她", "confusable", "指人时มัน很随意，初学者对人用เขา更安全。", "它"],
  ["phuak-khun", "พวกคุณ", "phuak khun", "你们；各位", "代词", "人称代词", "พวกคุณจะไปที่ไหนหลังเลิกเรียน", "phuak khun ja bpai thii nai lang loek riian", "你们放学后要去哪里？", "คุณ", "khun", "你；您", "usage", "พวกคุณ 是复数你们；คุณ 可单数也可礼貌称呼。", "你们"],
  ["phuak-khao", "พวกเขา", "phuak khao", "他们；她们", "代词", "人称代词", "พวกเขานั่งรถเมล์ไปโรงเรียนทุกเช้า", "phuak khao nang rot-mee bpai roong-riian thuk chaao", "他们每天早上坐公交去学校。", "เขา", "khao", "他；她", "usage", "พวกเขา 是复数；เขา 可单数。", "他们"],
  ["khon-nii", "คนนี้", "khon nii", "这个人", "指示词", "指示词", "คนนี้คือครูภาษาไทยของเรา", "khon nii khue khruu phaa-saa thai khaawng rao", "这个人是我们的泰语老师。", "คนนั้น", "khon nan", "那个人", "antonym", "นี้ 指近处；นั้น 指较远处或已提到的人。", "这个人"],
  ["khon-nan", "คนนั้น", "khon nan", "那个人", "指示词", "指示词", "คนนั้นรอแท็กซี่อยู่หน้าห้าง", "khon nan raaw thaek-sii yuu naa haang", "那个人在商场前等出租车。", "คนนี้", "khon nii", "这个人", "antonym", "คนนั้น 比คนนี้ 距离感更远。", "那个人"],
  ["arai", "อะไร", "a-rai", "什么", "疑问词", "疑问词", "คุณอยากกินอะไรตอนเย็น", "khun yaak gin a-rai dtaawn yen", "你傍晚想吃什么？", "ใคร", "khrai", "谁", "confusable", "อะไร 问东西或事情；ใคร 问人。", "什么"],
  ["khrai", "ใคร", "khrai", "谁", "疑问词", "疑问词", "ใครโทรมาหาคุณเมื่อกี้", "khrai thoo maa haa khun muea-gii", "刚才谁给你打电话？", "อะไร", "a-rai", "什么", "confusable", "ใคร 专门问人。", "谁"],
  ["thii-nai", "ที่ไหน", "thii nai", "哪里；什么地方", "疑问词", "疑问词", "ห้องน้ำอยู่ที่ไหนคะ", "haawng-naam yuu thii nai kha", "洗手间在哪里？", "ทางไหน", "thaang nai", "哪条路", "confusable", "ที่ไหน 问地点；ทางไหน 问方向路线。", "哪里"],
  ["muea-rai", "เมื่อไร", "muea rai", "什么时候", "疑问词", "疑问词", "คุณจะกลับบ้านเมื่อไร", "khun ja glap baan muea rai", "你什么时候回家？", "กี่โมง", "gii moong", "几点", "confusable", "เมื่อไร 问较宽的时间；กี่โมง 问几点。", "什么时候"],
  ["gii-moong", "กี่โมง", "gii moong", "几点钟", "疑问词", "疑问词", "รถไฟออกกี่โมงครับ", "rot-fai aawk gii moong khrap", "火车几点出发？", "เมื่อไร", "muea rai", "什么时候", "confusable", "กี่โมง 用于具体钟点。", "几点"],
  ["wan-nai", "วันไหน", "wan nai", "哪一天；星期几", "疑问词", "疑问词", "เราจะไปโรงพยาบาลวันไหน", "rao ja bpai roong-pha-yaa-baan wan nai", "我们哪一天去医院？", "กี่โมง", "gii moong", "几点", "confusable", "วันไหน 问日期或星期；กี่โมง 问钟点。", "哪天"],
  ["tham-mai", "ทำไม", "tham-mai", "为什么", "疑问词", "疑问词", "ทำไมวันนี้คุณมาสาย", "tham-mai wan-nii khun maa saai", "你今天为什么迟到？", "เพราะอะไร", "phraw a-rai", "因为什么", "near-synonym", "ทำไม 更口语常用；เพราะอะไร 更直接问原因。", "为什么"],
  ["phraw-arai", "เพราะอะไร", "phraw a-rai", "因为什么；为什么原因", "疑问词", "疑问词", "รถเมล์มาช้าเพราะอะไร", "rot-mee maa chaa phraw a-rai", "公交为什么来得晚？", "ทำไม", "tham-mai", "为什么", "near-synonym", "เพราะอะไร 强调原因本身。", "原因"],
  ["yang-ngai", "ยังไง", "yang ngai", "怎么；怎么样", "疑问词", "疑问词", "คำนี้อ่านยังไงครับ", "kham nii aan yang ngai khrap", "这个词怎么读？", "อย่างไร", "yaang rai", "如何；怎样", "near-synonym", "ยังไง 更口语；อย่างไร 更正式。", "怎么"],
  ["yaang-rai", "อย่างไร", "yaang rai", "如何；怎样", "疑问词", "疑问词", "เราควรเดินทางไปสนามบินอย่างไร", "rao khuan doen-thaang bpai sa-naam-bin yaang rai", "我们应该如何去机场？", "ยังไง", "yang ngai", "怎么", "near-synonym", "อย่างไร 比ยังไง更正式。", "如何"],
  ["thao-rai", "เท่าไร", "thao rai", "多少；多少钱", "疑问词", "疑问词", "เสื้อตัวนี้ราคาเท่าไรคะ", "seua dtua nii raa-khaa thao rai kha", "这件衣服多少钱？", "กี่", "gii", "几；多少", "confusable", "เท่าไร 常问价格、年龄、数量整体；กี่ 后常接量词。", "多少"],
  ["gii", "กี่", "gii", "几；多少", "疑问词", "疑问词", "คุณมีปากกากี่ด้าม", "khun mii bpaak-gaa gii daam", "你有几支笔？", "เท่าไร", "thao rai", "多少；多少钱", "confusable", "กี่ 后面常接量词，如กี่คน、กี่เล่ม。", "几"],
  ["gii-khon", "กี่คน", "gii khon", "几个人", "疑问词", "问句框架", "ในห้องนี้มีนักเรียนกี่คน", "nai haawng nii mii nak-riian gii khon", "这个房间里有几个学生？", "กี่อัน", "gii an", "几个东西", "confusable", "คน 是人的量词；อัน 常用于一般物品。", "几个人"],
  ["gii-an", "กี่อัน", "gii an", "几个；几件", "疑问词", "问句框架", "คุณต้องการถุงกี่อัน", "khun dtawng-gaan thung gii an", "你需要几个袋子？", "กี่คน", "gii khon", "几个人", "confusable", "อัน 用于一般东西，不用于人。", "几个"],
  ["gii-lem", "กี่เล่ม", "gii lem", "几本", "疑问词", "问句框架", "คุณยืมหนังสือกี่เล่มจากห้องสมุด", "khun yeum nang-sue gii lem jaak haawng-sa-mut", "你从图书馆借了几本书？", "กี่ใบ", "gii bai", "几张；几个容器", "confusable", "เล่ม 常用于书本；ใบ 常用于纸张、票、包等。", "几本"],
  ["gii-bai", "กี่ใบ", "gii bai", "几张；几个", "疑问词", "问句框架", "คุณซื้อตั๋วกี่ใบให้ครอบครัว", "khun sue dtua gii bai hai khraawp-khrua", "你给家人买了几张票？", "กี่เล่ม", "gii lem", "几本", "confusable", "ใบ 常搭配票、纸、包、叶子等。", "几张"],
  ["nai", "ไหน", "nai", "哪；哪个", "疑问词", "疑问词", "คุณชอบสีไหนมากที่สุด", "khun chaawp sii nai maak thii-sut", "你最喜欢哪种颜色？", "ที่ไหน", "thii nai", "哪里", "confusable", "ไหน 问选择；ที่ไหน 问地点。", "哪个"],
  ["an-nai", "อันไหน", "an nai", "哪一个；哪个东西", "疑问词", "问句框架", "อันไหนเป็นกระเป๋าของคุณ", "an nai bpen gra-bpao khaawng khun", "哪一个是你的包？", "คนไหน", "khon nai", "哪个人", "confusable", "อันไหน 问物；คนไหน 问人。", "哪一个"],
  ["khon-nai", "คนไหน", "khon nai", "哪个人", "疑问词", "问句框架", "คนไหนเป็นครูภาษาไทยของคุณ", "khon nai bpen khruu phaa-saa thai khaawng khun", "哪个人是你的泰语老师？", "อันไหน", "an nai", "哪一个东西", "confusable", "คนไหน 用于人。", "哪个人"],
  ["tua-nai", "ตัวไหน", "dtua nai", "哪只；哪个件", "疑问词", "问句框架", "แมวตัวไหนเป็นของคุณยาย", "maaeo dtua nai bpen khaawng khun-yaai", "哪只猫是外婆的？", "เล่มไหน", "lem nai", "哪本", "confusable", "ตัว 常用于动物、衣服等；เล่ม 用于书。", "哪只"],
  ["lem-nai", "เล่มไหน", "lem nai", "哪本", "疑问词", "问句框架", "หนังสือเล่มไหนอ่านง่ายสำหรับเด็ก", "nang-sue lem nai aan ngaai sam-rap dek", "哪本书适合孩子读？", "ตัวไหน", "dtua nai", "哪只；哪件", "confusable", "เล่ม 用于书、册子。", "哪本"],
  ["bai-nai", "ใบไหน", "bai nai", "哪张；哪个包/ใบ类物", "疑问词", "问句框架", "ตั๋วใบไหนเป็นของฉัน", "dtua bai nai bpen khaawng chan", "哪张票是我的？", "เล่มไหน", "lem nai", "哪本", "confusable", "ใบ 与票、纸、包等搭配。", "哪张"],
  ["baan-nai", "บ้านไหน", "baan nai", "哪一家；哪栋房子", "疑问词", "问句框架", "คุณอยู่บ้านไหนในซอยนี้", "khun yuu baan nai nai saawy nii", "你住这条巷子的哪一家？", "ห้องไหน", "haawng nai", "哪个房间", "confusable", "บ้านไหน 问房子或家；ห้องไหน 问房间。", "哪家"],
  ["haawng-nai", "ห้องไหน", "haawng nai", "哪个房间", "疑问词", "问句框架", "เราต้องเรียนภาษาไทยที่ห้องไหน", "rao dtawng riian phaa-saa thai thii haawng nai", "我们要在哪个房间学泰语？", "บ้านไหน", "baan nai", "哪一家", "confusable", "ห้อง 是房间，范围小于บ้าน。", "哪个房间"],
  ["nii", "นี่", "nii", "这；这里这个；口语指近处", "指示词", "指示词", "นี่คือสมุดของฉัน ไม่ใช่ของครู", "nii khue sa-mut khaawng chan mai chai khaawng khruu", "这是我的本子，不是老师的。", "นั่น", "nan", "那", "antonym", "นี่ 指近处；นั่น 指远一点。", "这"],
  ["nan", "นั่น", "nan", "那；那里那个", "指示词", "指示词", "นั่นคือรถเมล์ที่เราต้องขึ้น", "nan khue rot-mee thii rao dtawng kheun", "那就是我们要坐的公交车。", "นี่", "nii", "这", "antonym", "นั่น 比นี่离说话人远。", "那"],
  ["noon", "โน่น", "noon", "那边很远处", "指示词", "指示词", "โรงพยาบาลอยู่โน่น หลังตลาดใหญ่", "roong-pha-yaa-baan yuu noon lang dta-laat yai", "医院在那边很远处，在大市场后面。", "นี่", "nii", "这", "antonym", "โน่น 指更远的那边。", "那边"],
  ["nii-form", "นี้", "nii", "这个；这类后置指示词", "指示词", "指示词", "หนังสือเล่มนี้อ่านง่ายมาก", "nang-sue lem nii aan ngaai maak", "这本书很容易读。", "นั้น", "nan", "那个；那类", "antonym", "นี้ 放在名词后，表示这个。", "这个"],
  ["nan-form", "นั้น", "nan", "那个；那类后置指示词", "指示词", "指示词", "ร้านนั้นขายกาแฟอร่อย", "raan nan khaai gaa-faae a-raawy", "那家店卖的咖啡好喝。", "นี้", "nii", "这个", "antonym", "นั้น 放在名词后，表示那个。", "那个"],
  ["noon-form", "โน้น", "noon", "远处那个；那边那个", "指示词", "指示词", "บ้านหลังโน้นเป็นบ้านของคุณยาย", "baan lang noon bpen baan khaawng khun-yaai", "那边远处那栋房子是外婆家。", "นี้", "nii", "这个", "antonym", "โน้น 比นั้น距离感更远。", "远处那个"],
  ["an-nii", "อันนี้", "an nii", "这个东西；这一件", "指示词", "指示词", "อันนี้ราคาเท่าไรคะ", "an nii raa-khaa thao rai kha", "这个多少钱？", "อันนั้น", "an nan", "那个东西", "antonym", "อันนี้ 指近处物品；อันนั้น 指较远物品。", "这个东西"],
  ["an-nan", "อันนั้น", "an nan", "那个东西；那一件", "指示词", "指示词", "อันนั้นแพงกว่าอันนี้นิดหน่อย", "an nan phaaeng gwaa an nii nit naawy", "那个比这个贵一点。", "อันนี้", "an nii", "这个东西", "antonym", "อันนั้น 指较远或已提到的物品。", "那个东西"],
  ["baep-nii", "แบบนี้", "baaep nii", "这样；这种样子", "指示词", "指示词", "เขียนชื่อแบบนี้ถูกไหมครับ", "khiian chue baaep nii thuuk mai khrap", "这样写名字对吗？", "แบบนั้น", "baaep nan", "那样", "antonym", "แบบนี้ 指眼前或刚示范的方式。", "这样"],
  ["baep-nan", "แบบนั้น", "baaep nan", "那样；那种方式", "指示词", "指示词", "อย่าพูดแบบนั้นกับผู้ใหญ่", "yaa phuut baaep nan gap phuu-yai", "不要那样对长辈说话。", "แบบนี้", "baaep nii", "这样", "antonym", "แบบนั้น 指较远或对方提到的方式。", "那样"],
  ["yaang-nii", "อย่างนี้", "yaang nii", "这样；如此", "指示词", "指示词", "ถ้าทำอย่างนี้ งานจะเสร็จเร็วขึ้น", "thaa tham yaang nii ngaan ja set reo kheun", "如果这样做，工作会更快完成。", "อย่างนั้น", "yaang nan", "那样", "near-synonym", "อย่างนี้ 与แบบนี้意思接近，常用于方式。", "这样"],
  ["yaang-nan", "อย่างนั้น", "yaang nan", "那样；如此", "指示词", "指示词", "ถ้าฝนตกอย่างนั้น เราควรรอในร้านก่อน", "thaa fon dtok yaang nan rao khuan raaw nai raan gaawn", "如果雨那样下，我们应该先在店里等。", "อย่างนี้", "yaang nii", "这样", "antonym", "อย่างนั้น 指对方说的或较远的情况。", "那样"],
  ["chai-mai", "ใช่ไหม", "chai mai", "是吗；对吗", "疑问词", "问句框架", "คุณเป็นนักเรียนใหม่ใช่ไหม", "khun bpen nak-riian mai chai mai", "你是新学生，对吗？", "หรือเปล่า", "rue bplaao", "是不是；是否", "near-synonym", "ใช่ไหม 多用于确认自己猜测；หรือเปล่า 更开放一点。", "确认"],
  ["rue-bplaao", "หรือเปล่า", "rue bplaao", "是否；是不是", "疑问词", "问句框架", "วันนี้คุณไปตลาดหรือเปล่า", "wan-nii khun bpai dta-laat rue bplaao", "你今天去市场吗？", "ไหม", "mai", "吗", "near-synonym", "หรือเปล่า 常放句末问是否发生。", "是否"],
  ["mai-question", "ไหม", "mai", "吗；用于是非问句", "疑问词", "问句框架", "ร้านนี้เปิดไหมตอนเช้า", "raan nii bpoet mai dtaawn chaao", "这家店早上开门吗？", "หรือเปล่า", "rue bplaao", "是不是", "near-synonym", "ไหม 是常见句末问词，语气自然。", "吗"],
  ["rue", "หรือ", "rue", "或者；还是；疑问语气", "疑问词", "问句框架", "คุณจะดื่มน้ำหรือกาแฟ", "khun ja deum naam rue gaa-faae", "你要喝水还是咖啡？", "และ", "lae", "和", "confusable", "หรือ 表选择；และ 表并列都包括。", "还是"],
  ["chai", "ใช่", "chai", "是；对", "短语", "基础回答", "ใช่ นี่คือกระเป๋าของฉัน", "chai nii khue gra-bpao khaawng chan", "是的，这是我的包。", "ไม่ใช่", "mai chai", "不是", "antonym", "ใช่ 肯定；ไม่ใช่ 否定身份或判断。", "是"],
  ["mai-chai", "ไม่ใช่", "mai chai", "不是；不对", "短语", "基础回答", "ไม่ใช่ครับ ผมไม่ได้อยู่บ้านนี้", "mai chai khrap phom mai dai yuu baan nii", "不是的，我不住这家。", "ใช่", "chai", "是；对", "antonym", "ไม่ใช่ 用于否定“是”。", "不是"],
  ["chai-laaeo", "ใช่แล้ว", "chai laaeo", "对了；是的", "短语", "基础回答", "ใช่แล้ว ร้านขายยาอยู่ข้างธนาคาร", "chai laaeo raan khaai yaa yuu khaang tha-naa-khaan", "对了，药店在银行旁边。", "ไม่ใช่", "mai chai", "不是", "antonym", "ใช่แล้ว 比ใช่更有确认感。", "对了"],
  ["mai-ruu", "ไม่รู้", "mai ruu", "不知道", "短语", "基础回答", "ขอโทษค่ะ ฉันไม่รู้ว่าห้องน้ำอยู่ที่ไหน", "khaaw-thoot kha chan mai ruu waa haawng-naam yuu thii nai", "不好意思，我不知道洗手间在哪里。", "รู้", "ruu", "知道", "antonym", "ไม่รู้ 是不知道，不等于ไม่เข้าใจ。", "不知道"],
  ["mai-khao-jai", "ไม่เข้าใจ", "mai khao jai", "不明白", "短语", "基础回答", "ผมไม่เข้าใจคำถามนี้ ช่วยพูดช้า ๆ ได้ไหม", "phom mai khao-jai kham-thaam nii chuai phuut chaa chaa dai mai", "我不明白这个问题，可以说慢一点吗？", "เข้าใจ", "khao jai", "明白", "antonym", "ไม่เข้าใจ 强调理解不了；ไม่รู้ 强调不知道信息。", "不明白"],
  ["jam-mai-dai", "จำไม่ได้", "jam mai dai", "记不住；想不起来", "短语", "基础回答", "ฉันจำไม่ได้ว่าเขาชื่ออะไร", "chan jam mai dai waa khao chue a-rai", "我想不起来他叫什么名字。", "จำได้", "jam dai", "记得", "antonym", "จำไม่ได้ 是记忆问题，不一定是不知道。", "想不起来"],
  ["mai-mii", "ไม่มี", "mai mii", "没有", "短语", "基础回答", "วันนี้ฉันไม่มีเงินทอนในกระเป๋า", "wan-nii chan mai mii ngoen thaawn nai gra-bpao", "今天我包里没有零钱。", "มี", "mii", "有", "antonym", "ไม่มี 是否定“有”。", "没有"],
  ["mii", "มี", "mii", "有；存在", "短语", "基础回答", "ในห้องนี้มีเก้าอี้สิบตัว", "nai haawng nii mii gao-ii sip dtua", "这个房间里有十把椅子。", "ไม่มี", "mai mii", "没有", "antonym", "มี 表示有或存在。", "有"],
  ["ao", "เอา", "ao", "要；拿；选择", "短语", "基础回答", "ผมเอาอันนี้ครับ ราคาเท่าไร", "phom ao an nii khrap raa-khaa thao rai", "我要这个，多少钱？", "ไม่เอา", "mai ao", "不要", "antonym", "买东西时เอา可表示“要这个”。", "要"],
  ["mai-ao", "ไม่เอา", "mai ao", "不要", "短语", "基础回答", "ไม่เอาถุงค่ะ ฉันมีกระเป๋าแล้ว", "mai ao thung kha chan mii gra-bpao laaeo", "不要袋子，我已经有包了。", "เอา", "ao", "要", "antonym", "ไม่เอา 是拒绝某物，语气可加ค่ะ/ครับ更礼貌。", "不要"],
  ["chue-arai", "ชื่ออะไร", "chue a-rai", "叫什么名字", "短语", "问句框架", "น้องชายของคุณชื่ออะไร", "naawng-chaai khaawng khun chue a-rai", "你弟弟叫什么名字？", "ชื่อ...", "chue", "叫……名字", "usage", "ถามชื่อ用ชื่ออะไร，回答可说ชื่อ加名字。", "名字"],
  ["aa-yu-thao-rai", "อายุเท่าไร", "aa-yu thao rai", "多大；几岁", "短语", "问句框架", "คุณยายของคุณอายุเท่าไร", "khun-yaai khaawng khun aa-yu thao rai", "你外婆多大年纪？", "กี่ขวบ", "gii khuap", "几岁；多用于小孩", "confusable", "อายุเท่าไร 通用；กี่ขวบ 常问小孩。", "年龄"],
  ["maa-jaak-nai", "มาจากไหน", "maa jaak nai", "从哪里来；来自哪里", "短语", "问句框架", "คุณมาจากไหนครับ ผมมาจากเซี่ยงไฮ้", "khun maa jaak nai khrap phom maa jaak siiang-hai", "你来自哪里？我来自上海。", "ไปไหน", "bpai nai", "去哪里", "antonym", "มาจากไหน 问来源；ไปไหน 问去向。", "来自哪里"],
  ["bpai-nai", "ไปไหน", "bpai nai", "去哪里", "短语", "问句框架", "ตอนเย็นคุณจะไปไหนกับเพื่อน", "dtaawn yen khun ja bpai nai gap phuean", "傍晚你要和朋友去哪里？", "มาจากไหน", "maa jaak nai", "从哪里来", "antonym", "ไปไหน 问目的地。", "去哪里"],
  ["gap-khrai", "กับใคร", "gap khrai", "和谁", "短语", "问句框架", "คุณไปตลาดกับใครเมื่อวาน", "khun bpai dta-laat gap khrai muea-waan", "你昨天和谁去市场？", "ของใคร", "khaawng khrai", "谁的", "confusable", "กับใคร 问一起的人；ของใคร 问所属。", "和谁"],
  ["khaawng-khrai", "ของใคร", "khaawng khrai", "谁的", "短语", "问句框架", "รองเท้าคู่นี้เป็นของใคร", "raawng-thaao khuu nii bpen khaawng khrai", "这双鞋是谁的？", "กับใคร", "gap khrai", "和谁", "confusable", "ของใคร 问所有者。", "谁的"],
  ["tham-arai", "ทำอะไร", "tham a-rai", "做什么", "短语", "问句框架", "ตอนนี้คุณกำลังทำอะไรอยู่", "dtaawn-nii khun gam-lang tham a-rai yuu", "你现在正在做什么？", "กินอะไร", "gin a-rai", "吃什么", "confusable", "ทำอะไร 问动作范围更广。", "做什么"],
  ["gin-arai", "กินอะไร", "gin a-rai", "吃什么", "短语", "问句框架", "วันนี้เราไปกินอะไรดี", "wan-nii rao bpai gin a-rai dii", "今天我们去吃什么好？", "ดื่มอะไร", "deum a-rai", "喝什么", "confusable", "กิน 问吃的；ดื่ม 问喝的。", "吃什么"],
  ["deum-arai", "ดื่มอะไร", "deum a-rai", "喝什么", "短语", "问句框架", "คุณอยากดื่มอะไร น้ำหรือชา", "khun yaak deum a-rai naam rue chaa", "你想喝什么，水还是茶？", "กินอะไร", "gin a-rai", "吃什么", "confusable", "ดื่ม 用于饮料。", "喝什么"],
  ["ao-arai", "เอาอะไร", "ao a-rai", "要什么", "短语", "问句框架", "รับอะไรดีคะ คุณเอาอะไร", "rap a-rai dii kha khun ao a-rai", "要点什么好呢？您要什么？", "อยากได้อะไร", "yaak dai a-rai", "想要什么", "near-synonym", "เอาอะไร 更直接；อยากได้อะไร 更像询问愿望。", "要什么"],
  ["yaak-dai-arai", "อยากได้อะไร", "yaak dai a-rai", "想要什么", "短语", "问句框架", "วันเกิดปีนี้คุณอยากได้อะไร", "wan-goet bpii nii khun yaak dai a-rai", "今年生日你想要什么？", "เอาอะไร", "ao a-rai", "要什么", "near-synonym", "อยากได้อะไร 常用于愿望或购物选择。", "想要什么"],
  ["hen-khrai", "เห็นใคร", "hen khrai", "看见谁", "短语", "问句框架", "เมื่อเช้าคุณเห็นใครที่หน้าบ้าน", "muea chaao khun hen khrai thii naa baan", "今天早上你在家门前看见谁？", "รอใคร", "raaw khrai", "等谁", "confusable", "เห็นใคร 问看见的人；รอใคร 问等待的人。", "看见谁"],
  ["raaw-khrai", "รอใคร", "raaw khrai", "等谁", "短语", "问句框架", "เธอรอใครอยู่ที่สถานี", "thoe raaw khrai yuu thii sa-thaa-nii", "你在车站等谁？", "เห็นใคร", "hen khrai", "看见谁", "confusable", "รอใคร 与等待动作连用。", "等谁"],
  ["phuut-gap-khrai", "พูดกับใคร", "phuut gap khrai", "和谁说话", "短语", "问句框架", "ครูกำลังพูดกับใครอยู่หน้าห้อง", "khruu gam-lang phuut gap khrai yuu naa haawng", "老师正在教室前和谁说话？", "พูดอะไร", "phuut a-rai", "说什么", "confusable", "กับใคร 问对象；อะไร 问内容。", "和谁说"],
  ["phuut-arai", "พูดอะไร", "phuut a-rai", "说什么", "短语", "问句框架", "เมื่อกี้เขาพูดอะไร ฉันฟังไม่ทัน", "muea-gii khao phuut a-rai chan fang mai than", "刚才他说了什么？我没听上。", "พูดกับใคร", "phuut gap khrai", "和谁说", "confusable", "พูดอะไร 问说话内容。", "说什么"],
  ["yuu-nai", "อยู่ไหน", "yuu nai", "在哪里", "短语", "问句框架", "กระเป๋าของฉันอยู่ไหน คุณเห็นไหม", "gra-bpao khaawng chan yuu nai khun hen mai", "我的包在哪里？你看见了吗？", "อยู่ที่ไหน", "yuu thii nai", "在哪里；较完整", "near-synonym", "อยู่ไหน 更口语；อยู่ที่ไหน 更完整。", "在哪"],
  ["yuu-thii-nai", "อยู่ที่ไหน", "yuu thii nai", "在哪里；位于哪里", "短语", "问句框架", "โรงพยาบาลอยู่ที่ไหนครับ", "roong-pha-yaa-baan yuu thii nai khrap", "医院在哪里？", "อยู่ไหน", "yuu nai", "在哪里；口语", "near-synonym", "อยู่ที่ไหน 较完整，问路时很安全。", "在哪里"],
  ["nii-khrai", "นี่ใคร", "nii khrai", "这是谁", "短语", "问句框架", "นี่ใครครับ ใช่เพื่อนของคุณไหม", "nii khrai khrap chai phuean khaawng khun mai", "这是谁？是你的朋友吗？", "นั่นอะไร", "nan a-rai", "那是什么", "confusable", "นี่ใคร 问人；นั่นอะไร 问东西或事情。", "这是谁"],
  ["nan-arai", "นั่นอะไร", "nan a-rai", "那是什么", "短语", "问句框架", "นั่นอะไรอยู่ใต้โต๊ะ", "nan a-rai yuu dtai dto", "桌子下面那个是什么？", "นี่ใคร", "nii khrai", "这是谁", "confusable", "อะไร 问物或事情。", "那是什么"],
  ["muea-gii", "เมื่อกี้", "muea-gii", "刚才", "副词", "指示词", "เมื่อกี้ใครโทรมาหาคุณ", "muea-gii khrai thoo maa haa khun", "刚才谁给你打电话？", "ตอนนี้", "dtaawn-nii", "现在", "confusable", "เมื่อกี้ 是刚刚过去；ตอนนี้ 是现在。", "刚才"],
  ["dtaawn-nii", "ตอนนี้", "dtaawn-nii", "现在；这时候", "副词", "指示词", "ตอนนี้ฉันอยู่ที่สถานีรถไฟ", "dtaawn-nii chan yuu thii sa-thaa-nii rot-fai", "现在我在火车站。", "เมื่อกี้", "muea-gii", "刚才", "confusable", "ตอนนี้ 指现在。", "现在"],
  ["diaao-nii", "เดี๋ยวนี้", "diaao nii", "现在；如今", "副词", "指示词", "เดี๋ยวนี้ฉันอ่านภาษาไทยได้เร็วขึ้น", "diaao nii chan aan phaa-saa thai dai reo kheun", "现在我读泰语读得更快了。", "ตอนนี้", "dtaawn-nii", "现在这一刻", "confusable", "เดี๋ยวนี้ 可表示如今一段时期；ตอนนี้ 更像此刻。", "如今"],
  ["laaeo-rue-yang", "แล้วหรือยัง", "laaeo rue yang", "已经……了吗", "短语", "问句框架", "คุณกินข้าวเช้าแล้วหรือยัง", "khun gin khaao chaao laaeo rue yang", "你吃早饭了吗？", "ยังไม่ได้", "yang mai dai", "还没有", "usage", "回答可用แล้ว或ยังไม่ได้。", "已经了吗"],
  ["yang", "ยัง", "yang", "还；仍然；还没时的回答开头", "副词", "基础回答", "ยังครับ ผมยังไม่ได้ซื้อตั๋ว", "yang khrap phom yang mai dai sue dtua", "还没有，我还没买票。", "แล้ว", "laaeo", "已经了", "antonym", "ยัง 表未完成或仍然；แล้ว 表已经完成。", "还没"],
  ["laaeo", "แล้ว", "laaeo", "已经；了", "副词", "基础回答", "ฉันทำการบ้านเสร็จแล้ว", "chan tham gaan-baan set laaeo", "我已经做完作业了。", "ยัง", "yang", "还；还没", "antonym", "แล้ว 表完成或变化。", "已经"],
  ["khrai-gaaw-dai", "ใครก็ได้", "khrai gaaw dai", "谁都可以", "短语", "基础回答", "ใครก็ได้ช่วยเปิดประตูหน่อย", "khrai gaaw dai chuai bpoet bpra-dtuu naawy", "谁都可以，帮忙开一下门。", "คนนี้เท่านั้น", "khon nii thao-nan", "只有这个人", "antonym", "ก็ได้ 表示都可以、不限定。", "谁都行"],
  ["arai-gaaw-dai", "อะไรก็ได้", "a-rai gaaw dai", "什么都可以", "短语", "基础回答", "มื้อเย็นกินอะไรก็ได้ ฉันไม่หิวมาก", "meu yen gin a-rai gaaw dai chan mai hiu maak", "晚饭吃什么都可以，我不是很饿。", "อันนี้เท่านั้น", "an nii thao-nan", "只能这个", "antonym", "อะไรก็ได้ 表示没有特别选择。", "什么都行"],
  ["thii-nai-gaaw-dai", "ที่ไหนก็ได้", "thii nai gaaw dai", "哪里都可以", "短语", "基础回答", "เรานั่งที่ไหนก็ได้ถ้าห้องไม่เต็ม", "rao nang thii nai gaaw dai thaa haawng mai dtem", "如果房间没满，我们坐哪里都可以。", "ที่นี่เท่านั้น", "thii nii thao-nan", "只能这里", "antonym", "ที่ไหนก็ได้ 表示地点不限定。", "哪里都行"],
  ["muea-rai-gaaw-dai", "เมื่อไรก็ได้", "muea rai gaaw dai", "什么时候都可以", "短语", "基础回答", "คุณโทรมาหาฉันเมื่อไรก็ได้หลังหกโมง", "khun thoo maa haa chan muea rai gaaw dai lang hok moong", "六点以后你什么时候给我打电话都可以。", "ตอนนี้เท่านั้น", "dtaawn-nii thao-nan", "只能现在", "antonym", "เมื่อไรก็ได้ 表示时间灵活。", "随时"],
  ["mai-bpen-rai", "ไม่เป็นไร", "mai bpen rai", "没关系；不用了；没事", "短语", "基础回答", "ไม่เป็นไรค่ะ ฉันเดินไปเองได้", "mai bpen rai kha chan doen bpai eeng dai", "没关系，我可以自己走过去。", "เป็นไรไหม", "bpen rai mai", "怎么了；有事吗", "confusable", "ไม่เป็นไร 是回答；เป็นไรไหม 是询问。", "没关系"],
  ["dai", "ได้", "dai", "可以；能", "短语", "基础回答", "ได้ครับ ผมช่วยถือกระเป๋าให้", "dai khrap phom chuai theu gra-bpao hai", "可以，我帮你拿包。", "ไม่ได้", "mai dai", "不可以；不能", "antonym", "ได้ 表示允许或能力。", "可以"],
  ["mai-dai", "ไม่ได้", "mai dai", "不可以；不能；没有做成", "短语", "基础回答", "ขอโทษค่ะ วันนี้ฉันไปไม่ได้", "khaaw-thoot kha wan-nii chan bpai mai dai", "不好意思，我今天去不了。", "ได้", "dai", "可以；能", "antonym", "ไม่ได้ 是否定ได้，可表示不能或不被允许。", "不可以"],
  ["dai-mai", "ได้ไหม", "dai mai", "可以吗；能不能", "短语", "问句框架", "ขอรอที่นี่ได้ไหมครับ", "khaaw raaw thii nii dai mai khrap", "我可以在这里等吗？", "ได้", "dai", "可以", "usage", "ได้ไหม 用来礼貌请求允许。", "可以吗"],
  ["khaaw-dai-mai", "ขอได้ไหม", "khaaw dai mai", "可以要/请求……吗", "短语", "问句框架", "ขอน้ำหนึ่งแก้วได้ไหมคะ", "khaaw naam neung gaaeow dai mai kha", "可以给我一杯水吗？", "เอาได้ไหม", "ao dai mai", "可以要这个吗", "near-synonym", "ขอ 比เอา 更像礼貌请求。", "请求"],
  ["chuai-dai-mai", "ช่วยได้ไหม", "chuai dai mai", "能帮忙吗", "短语", "问句框架", "ช่วยบอกทางไปโรงพยาบาลได้ไหมครับ", "chuai baawk thaang bpai roong-pha-yaa-baan dai mai khrap", "能帮我指一下去医院的路吗？", "ทำเองได้ไหม", "tham eeng dai mai", "能自己做吗", "confusable", "ช่วยได้ไหม 是请求别人帮忙。", "能帮忙吗"],
  ["tham-mai-theung", "ทำไมถึง", "tham-mai theung", "为什么会……；为什么到……程度", "短语", "问句框架", "ทำไมถึงรถติดมากขนาดนี้", "tham-mai theung rot dtit maak kha-naat nii", "为什么会堵成这样？", "เพราะอะไร", "phraw a-rai", "因为什么", "near-synonym", "ทำไมถึง 常接结果，语气自然。", "为什么会"],
  ["khue-arai", "คืออะไร", "khue a-rai", "是什么", "短语", "问句框架", "คำว่า สถานี คืออะไรครับ", "kham waa sa-thaa-nii khue a-rai khrap", "“สถานี”这个词是什么意思？", "แปลว่าอะไร", "bplaae waa a-rai", "翻译成什么", "near-synonym", "คืออะไร 问本质或意思；แปลว่าอะไร 问翻译。", "是什么"],
  ["bplaae-waa-arai", "แปลว่าอะไร", "bplaae waa a-rai", "翻译成什么；是什么意思", "短语", "问句框架", "คำนี้แปลว่าอะไรในภาษาจีน", "kham nii bplaae waa a-rai nai phaa-saa jiin", "这个词用中文是什么意思？", "คืออะไร", "khue a-rai", "是什么", "near-synonym", "学习语言时แปลว่าอะไร非常常用。", "什么意思"],
];

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related: VocabularyExpansionRelated = { thai: row[9], roman: row[10], chinese: row[11] };
  const comparison: VocabularyExpansionComparison = { kind: row[12], target: related, distinctionZh: row[13] };
  const example: VocabularyExpansionExample = { thai: row[6], roman: row[7], chinese: row[8] };
  const collocations: VocabularyExpansionCollocation[] = [
    { thai: row[1], roman: row[2], chinese: row[3] },
    { thai: row[9], roman: row[10], chinese: row[11] },
  ];
  const synonyms = row[12] === "near-synonym" ? [related] : [];
  const antonyms = row[12] === "antonym" ? [related] : [];

  return {
    id: row[0],
    thai: row[1],
    roman: row[2],
    chinese: row[3],
    partOfSpeech: row[4],
    theme: row[5],
    level: "a1",
    priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [example], synonyms, antonyms, comparisons: [comparison], collocations, tags: [row[5], row[14]] }],
    synonyms,
    antonyms,
    comparisons: [comparison],
    collocations,
    tags: [row[5], row[14], "A1基础"],
    sourceRefs: QUESTION_PRONOUN_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_QUESTION_WORDS_PRONOUNS_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
