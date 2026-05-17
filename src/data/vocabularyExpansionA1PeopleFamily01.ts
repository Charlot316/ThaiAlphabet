export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "人和身份" | "家庭成员" | "亲属称呼" | "年龄阶段" | "朋友同学" | "同事邻居" | "称呼介绍" | "基本身份";
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

type Row = readonly [
  thai: string,
  id: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionPartOfSpeech,
  theme: VocabularyExpansionTheme,
  exampleThai: string,
  exampleRoman: string,
  exampleChinese: string,
  tag: string,
];

const PEOPLE_FAMILY_REFS = ["thai-frequency", "thai-a1-people-family-candidate"];

const rows = [
  ["คนในบ้าน", "khon-nai-baan", "khon nai baan", "家里的人；家人", "名词", "家庭成员", "คืนนี้คนในบ้านกินข้าวพร้อมกันที่ห้องครัว", "khuen-nii khon nai baan gin khaao phraawm gan thii haawng-khruua", "今晚家里的人一起在厨房吃饭。", "family"],
  ["สมาชิกครอบครัว", "sa-maa-chik-khraawp-khruua", "sa-maa-chik khraawp-khruua", "家庭成员", "名词", "家庭成员", "สมาชิกครอบครัวของฉันมีห้าคน", "sa-maa-chik khraawp-khruua khaawng chan mii haa khon", "我的家庭成员有五个人。", "family"],
  ["ครอบครัวเล็ก", "khraawp-khruua-lek", "khraawp-khruua lek", "小家庭", "名词", "家庭成员", "เธออยู่กับครอบครัวเล็กใกล้โรงเรียน", "thoe yuu gap khraawp-khruua lek glai roong-riian", "她和小家庭住在学校附近。", "family"],
  ["ครอบครัวขนาดใหญ่", "khraawp-khruua-kha-naat-yai", "khraawp-khruua kha-naat yai", "规模较大的家庭", "名词", "家庭成员", "วันอาทิตย์ครอบครัวใหญ่ของเราไปกินข้าวนอกบ้าน", "wan aa-thit khraawp-khruua yai khaawng rao bpai gin khaao naawk baan", "星期天我们大家庭去外面吃饭。", "family"],
  ["บ้านของเรา", "baan-khaawng-rao", "baan khaawng rao", "我们的家", "短语", "家庭成员", "บ้านของเราอยู่ใกล้ตลาดและสถานีรถไฟ", "baan khaawng rao yuu glai dta-laat lae sa-thaa-nii rot-fai", "我们的家在市场和火车站附近。", "home"],
  ["คุณพ่อของฉัน", "khun-phaaw-khaawng-chan", "khun phaaw khaawng chan", "我的爸爸；较礼貌说法", "名词", "家庭成员", "พ่อของฉันทำอาหารเช้าให้ทุกคน", "phaaw khaawng chan tham aa-haan chaao hai thuk khon", "我的爸爸给大家做早餐。", "father"],
  ["แม่ของฉัน", "maae-khaawng-chan", "maae khaawng chan", "我的妈妈", "名词", "家庭成员", "แม่ของฉันชอบอ่านหนังสือก่อนนอน", "maae khaawng chan chaawp aan nang-sue gaawn naawn", "我的妈妈喜欢睡前看书。", "mother"],
  ["คุณพ่อคุณแม่", "khun-phaaw-khun-maae", "khun phaaw khun maae", "父母；爸爸妈妈", "名词", "家庭成员", "คุณพ่อคุณแม่รอฉันที่หน้าบ้าน", "khun phaaw khun maae raaw chan thii naa baan", "爸爸妈妈在家门口等我。", "parents"],
  ["ลูกชายคนเล็ก", "luuk-chaai-khon-lek", "luuk-chaai khon lek", "小儿子", "名词", "家庭成员", "ลูกชายคนเล็กยังเรียนอยู่ชั้นประถม", "luuk-chaai khon lek yang riian yuu chan bpra-thom", "小儿子还在读小学。", "child"],
  ["ลูกสาวคนโต", "luuk-saao-khon-dtoo", "luuk-saao khon dtoo", "大女儿", "名词", "家庭成员", "ลูกสาวคนโตช่วยแม่ล้างจานทุกเย็น", "luuk-saao khon dtoo chuai maae laang jaan thuk yen", "大女儿每天傍晚帮妈妈洗碗。", "child"],
  ["พี่ชายคนโตของฉัน", "phii-chaai-khon-dtoo-khaawng-chan", "phii-chaai khon dtoo khaawng chan", "我的大哥", "名词", "亲属称呼", "พี่ชายคนโตของฉันทำงานที่กรุงเทพฯ", "phii-chaai khon dtoo khaawng chan tham-ngaan thii grung-theep", "我的大哥在曼谷工作。", "sibling"],
  ["พี่สาวคนกลาง", "phii-saao-khon-glaang", "phii-saao khon glaang", "二姐；中间的姐姐", "名词", "亲属称呼", "พี่สาวคนกลางพูดภาษาไทยชัดมาก", "phii-saao khon glaang phuut phaa-saa thai chat maak", "二姐泰语说得很清楚。", "sibling"],
  ["น้องชายของเรา", "naawng-chaai-khaawng-rao", "naawng-chaai khaawng rao", "我们的弟弟", "名词", "亲属称呼", "น้องชายของเราเล่นฟุตบอลหลังเลิกเรียน", "naawng-chaai khaawng rao len fut-baawn lang loek riian", "我们的弟弟放学后踢足球。", "sibling"],
  ["น้องสาวของเขา", "naawng-saao-khaawng-khao", "naawng-saao khaawng khao", "他的妹妹", "名词", "亲属称呼", "น้องสาวของเขาชอบวาดรูปแมว", "naawng-saao khaawng khao chaawp waat ruup maaeo", "他的妹妹喜欢画猫。", "sibling"],
  ["พี่น้องสองคน", "phii-naawng-saawng-khon", "phii-naawng saawng khon", "两兄弟姐妹", "名词", "亲属称呼", "พี่น้องสองคนนี้เรียนโรงเรียนเดียวกัน", "phii-naawng saawng khon nii riian roong-riian diao gan", "这两个兄弟姐妹在同一所学校读书。", "sibling"],
  ["ตาของฉัน", "dtaa-khaawng-chan", "dtaa khaawng chan", "我的外公/姥爷", "名词", "亲属称呼", "ตาของฉันชอบนั่งดื่มชาในสวน", "dtaa khaawng chan chaawp nang deum chaa nai suan", "我的外公喜欢坐在花园里喝茶。", "grandparent"],
  ["ยายของฉัน", "yaai-khaawng-chan", "yaai khaawng chan", "我的外婆/姥姥", "名词", "亲属称呼", "ยายของฉันทำขนมอร่อยมาก", "yaai khaawng chan tham kha-nom a-raawy maak", "我的外婆做的点心很好吃。", "grandparent"],
  ["ปู่ของเขา", "bpuu-khaawng-khao", "bpuu khaawng khao", "他的爷爷", "名词", "亲属称呼", "ปู่ของเขาเดินเล่นตอนเช้าทุกวัน", "bpuu khaawng khao doen len dtaawn chaao thuk wan", "他的爷爷每天早上散步。", "grandparent"],
  ["ย่าของเธอ", "yaa-khaawng-thoe", "yaa khaawng thoe", "她的奶奶", "名词", "亲属称呼", "ย่าของเธอเล่าเรื่องเก่าให้เด็ก ๆ ฟัง", "yaa khaawng thoe lao rueang gao hai dek dek fang", "她的奶奶给孩子们讲旧故事。", "grandparent"],
  ["หลานชายตัวเล็ก", "laan-chaai-dtua-lek", "laan-chaai dtua lek", "小侄子/外孙男孩", "名词", "亲属称呼", "หลานชายตัวเล็กวิ่งเล่นในบ้าน", "laan-chaai dtua lek wing len nai baan", "小侄子在家里跑着玩。", "relative"],
  ["หลานสาวน่ารัก", "laan-saao-naa-rak", "laan-saao naa-rak", "可爱的侄女/外孙女", "名词", "亲属称呼", "หลานสาวน่ารักยิ้มให้ทุกคน", "laan-saao naa-rak yim hai thuk khon", "可爱的侄女对每个人微笑。", "relative"],
  ["ลุงข้างบ้าน", "lung-khaang-baan", "lung khaang baan", "隔壁叔叔；邻家伯伯", "名词", "亲属称呼", "ลุงข้างบ้านช่วยซ่อมจักรยานให้ฉัน", "lung khaang baan chuai saawm jak-gra-yaan hai chan", "隔壁叔叔帮我修自行车。", "relative"],
  ["ป้าร้านข้าว", "bpaa-raan-khaao", "bpaa raan khaao", "饭店阿姨", "名词", "称呼介绍", "ป้าร้านข้าวจำเมนูที่ฉันชอบได้", "bpaa raan khaao jam mee-nuu thii chan chaawp dai", "饭店阿姨记得我喜欢的菜单。", "address"],
  ["น้าผู้หญิง", "naa-phuu-ying", "naa phuu-ying", "姨/舅妈一类较年轻长辈", "名词", "亲属称呼", "น้าผู้หญิงมารับเด็กที่โรงเรียน", "naa phuu-ying maa rap dek thii roong-riian", "姨妈来学校接孩子。", "relative"],
  ["อาผู้ชาย", "aa-phuu-chaai", "aa phuu-chaai", "叔叔/姑父一类较年轻长辈", "名词", "亲属称呼", "อาผู้ชายพาฉันไปซื้อรองเท้าใหม่", "aa phuu-chaai phaa chan bpai sue raawng-thaao mai", "叔叔带我去买新鞋。", "relative"],
  ["ญาติใกล้ชิด", "yaat-glai-chit", "yaat glai-chit", "近亲；关系近的亲戚", "名词", "亲属称呼", "วันปีใหม่ญาติใกล้ชิดมาที่บ้านเรา", "wan bpii-mai yaat glai-chit maa thii baan rao", "新年时近亲来到我们家。", "relative"],
  ["ญาติห่าง ๆ", "yaat-haang-haang", "yaat haang haang", "远亲", "名词", "亲属称呼", "ฉันไม่ค่อยรู้จักญาติห่าง ๆ หลายคน", "chan mai khaawy ruu-jak yaat haang haang laai khon", "很多远亲我不太认识。", "relative"],
  ["เด็กเล็กในบ้าน", "dek-lek-nai-baan", "dek lek nai baan", "家里的小孩", "名词", "年龄阶段", "เด็กเล็กควรนอนเร็วและกินอาหารอ่อน", "dek lek khuuan naawn reo lae gin aa-haan aawn", "小孩应该早点睡，吃软一点的食物。", "age"],
  ["เด็กโต", "dek-dtoo", "dek dtoo", "大一点的孩子", "名词", "年龄阶段", "เด็กโตช่วยครูเก็บเก้าอี้หลังเรียน", "dek dtoo chuai khruu gep gao-ii lang riian", "大一点的孩子课后帮老师收椅子。", "age"],
  ["วัยรุ่นในบ้าน", "wai-run-nai-baan", "wai run nai baan", "家里的青少年", "名词", "年龄阶段", "วัยรุ่นหลายคนชอบฟังเพลงในโทรศัพท์", "wai-run laai khon chaawp fang phleeng nai thoo-ra-sap", "很多青少年喜欢在手机上听歌。", "age"],
  ["ผู้ใหญ่ที่บ้าน", "phuu-yai-thii-baan", "phuu-yai thii baan", "家里的大人", "名词", "年龄阶段", "ผู้ใหญ่ในบ้านบอกให้เด็ก ๆ ล้างมือก่อนกินข้าว", "phuu-yai nai baan baawk hai dek dek laang mue gaawn gin khaao", "家里的大人让孩子们饭前洗手。", "age"],
  ["คนแก่ใจดี", "khon-gaae-jai-dii", "khon gaae jai dii", "和善的老人", "名词", "年龄阶段", "คนแก่ใจดีคนนั้นยิ้มให้เด็กทุกวัน", "khon gaae jai dii khon nan yim hai dek thuk wan", "那位和善的老人每天对孩子微笑。", "age"],
  ["อายุหนึ่งขวบ", "aa-yu-neung-khuap", "aa-yu nueng khuap", "一岁", "短语", "年龄阶段", "ลูกของพี่สาวอายุหนึ่งขวบแล้ว", "luuk khaawng phii-saao aa-yu nueng khuap laaeo", "姐姐的孩子已经一岁了。", "age"],
  ["อายุครบสิบปี", "aa-yu-khrop-sip-bpii", "aa-yu khrop sip bpii", "满十岁", "短语", "年龄阶段", "น้องชายของฉันอายุสิบปีและชอบอ่านการ์ตูน", "naawng-chaai khaawng chan aa-yu sip bpii lae chaawp aan gaa-tuun", "我的弟弟十岁，喜欢看漫画。", "age"],
  ["อายุเท่าไรแล้ว", "aa-yu-thao-rai-laaeo", "aa-yu thao-rai laaeo", "已经几岁了", "短语", "年龄阶段", "เด็กคนนี้อายุเท่าไร คุณรู้ไหม", "dek khon nii aa-yu thao-rai, khun ruu mai", "这个孩子几岁，你知道吗？", "question"],
  ["แก่กว่า", "gaae-gwaa", "gaae gwaa", "年纪更大", "形容词", "年龄阶段", "พี่ชายแก่กว่าฉันสามปี", "phii-chaai gaae gwaa chan saam bpii", "哥哥比我大三岁。", "comparison"],
  ["เด็กกว่า", "dek-gwaa", "dek gwaa", "年纪更小", "形容词", "年龄阶段", "เธอเด็กกว่าฉันแต่เรียนเก่งมาก", "thoe dek gwaa chan dtaae riian geng maak", "她比我小，但学习很好。", "comparison"],
  ["สูงวัย", "suung-wai", "suung wai", "年长的；高龄的", "形容词", "年龄阶段", "คนสูงวัยควรเดินช้า ๆ บนพื้นเปียก", "khon suung wai khuuan doen chaa chaa bon pheun bpiiak", "年长的人在湿地上应该慢慢走。", "age"],
  ["เพื่อนสนิทที่โรงเรียน", "pheuan-sa-nit-thii-roong-riian", "pheuan sa-nit thii roong-riian", "学校里的好朋友", "名词", "朋友同学", "เพื่อนสนิทของฉันโทรมาหาตอนเย็น", "pheuan sa-nit khaawng chan thoo maa haa dtaawn yen", "我的好朋友傍晚打电话来找我。", "friend"],
  ["เพื่อนใหม่", "pheuan-mai", "pheuan mai", "新朋友", "名词", "朋友同学", "วันนี้ฉันมีเพื่อนใหม่ในห้องเรียน", "wan-nii chan mii pheuan mai nai haawng-riian", "今天我在教室里有了新朋友。", "friend"],
  ["เพื่อนเก่า", "pheuan-gao", "pheuan gao", "老朋友", "名词", "朋友同学", "ฉันเจอเพื่อนเก่าที่ตลาดเมื่อเช้า", "chan joe pheuan gao thii dta-laat muea-chaao", "我今天早上在市场遇见了老朋友。", "friend"],
  ["เพื่อนข้างบ้าน", "pheuan-khaang-baan", "pheuan khaang baan", "邻居朋友", "名词", "朋友同学", "เพื่อนข้างบ้านมาเล่นกับน้องชายฉัน", "pheuan khaang baan maa len gap naawng-chaai chan", "邻居朋友来和我弟弟玩。", "friend"],
  ["เพื่อนในห้องเรียน", "pheuan-nai-haawng-riian", "pheuan nai haawng-riian", "教室里的同学", "名词", "朋友同学", "เพื่อนในห้องช่วยฉันทำแบบฝึกหัด", "pheuan nai haawng chuai chan tham baaep-feuk-hat", "同班朋友帮我做练习。", "classmate"],
  ["เพื่อนร่วมชั้นของฉัน", "pheuan-ruam-chan-khaawng-chan", "pheuan ruam chan khaawng chan", "我的同班同学", "名词", "朋友同学", "เพื่อนร่วมชั้นนั่งข้างฉันในห้องเรียน", "pheuan ruam chan nang khaang chan nai haawng-riian", "同班同学坐在我旁边。", "classmate"],
  ["นักเรียนใหม่ในห้อง", "nak-riian-mai-nai-haawng", "nak-riian mai nai haawng", "班里的新学生", "名词", "朋友同学", "นักเรียนใหม่แนะนำตัวหน้าห้อง", "nak-riian mai nae-nam dtua naa haawng", "新学生在教室前面自我介绍。", "student"],
  ["นักเรียนเก่า", "nak-riian-gao", "nak-riian gao", "老学生；以前的学生", "名词", "朋友同学", "นักเรียนเก่ากลับมาเยี่ยมครูที่โรงเรียน", "nak-riian gao glap maa yiiam khruu thii roong-riian", "老学生回学校看望老师。", "student"],
  ["ครูประจำชั้น", "khruu-bpra-jam-chan", "khruu bpra-jam chan", "班主任；班级老师", "名词", "朋友同学", "ครูประจำชั้นบอกเวลาไปทัศนศึกษา", "khruu bpra-jam chan baawk wee-laa bpai that-sa-na-seuk-saa", "班主任告诉大家去参观学习的时间。", "teacher"],
  ["ครูภาษาไทยของฉัน", "khruu-phaa-saa-thai-khaawng-chan", "khruu phaa-saa thai khaawng chan", "我的泰语老师", "名词", "朋友同学", "ครูภาษาไทยพูดช้าและเขียนคำบนกระดาน", "khruu phaa-saa thai phuut chaa lae khian kham bon gra-daan", "泰语老师说得慢，并把词写在黑板上。", "teacher"],
  ["หัวหน้าห้อง", "hua-naa-haawng", "hua-naa haawng", "班长", "名词", "朋友同学", "หัวหน้าห้องเก็บรายชื่อเพื่อนก่อนเข้าเรียน", "hua-naa haawng gep raai-chue pheuan gaawn khao riian", "班长在上课前收集同学名单。", "classroom"],
  ["เพื่อนร่วมงานของพ่อ", "pheuan-ruam-ngaan-khaawng-phaaw", "pheuan ruam ngaan khaawng phaaw", "爸爸的同事", "名词", "同事邻居", "เพื่อนร่วมงานช่วยฉันเปิดคอมพิวเตอร์", "pheuan ruam ngaan chuai chan bpoet khaawm-phiu-dtoe", "同事帮我打开电脑。", "work"],
  ["หัวหน้าที่ทำงาน", "hua-naa-thii-tham-ngaan", "hua-naa thii tham-ngaan", "工作上的主管", "名词", "同事邻居", "หัวหน้าที่ทำงานให้ฉันกลับบ้านเร็ววันนี้", "hua-naa thii tham-ngaan hai chan glap baan reo wan-nii", "今天工作上的主管让我早点回家。", "work"],
  ["คนที่ทำงาน", "khon-thii-tham-ngaan", "khon thii tham-ngaan", "公司/单位里的人", "名词", "同事邻居", "คนที่ทำงานกินข้าวกลางวันด้วยกัน", "khon thii tham-ngaan gin khaao glaang-wan duai gan", "单位里的人一起吃午饭。", "work"],
  ["คนข้างบ้าน", "khon-khaang-baan", "khon khaang baan", "隔壁的人；邻居", "名词", "同事邻居", "คนข้างบ้านมีหมาตัวใหญ่สีดำ", "khon khaang baan mii maa dtua yai sii dam", "隔壁的人有一只黑色的大狗。", "neighbor"],
  ["เพื่อนบ้านใหม่", "pheuan-baan-mai", "pheuan baan mai", "新邻居", "名词", "同事邻居", "เพื่อนบ้านใหม่ย้ายมาเมื่อวาน", "pheuan baan mai yaai maa muea-waan", "新邻居昨天搬来了。", "neighbor"],
  ["เจ้าของบ้านคนนี้", "jao-khaawng-baan-khon-nii", "jao khaawng baan khon nii", "这位房主", "名词", "同事邻居", "เจ้าของบ้านเปิดประตูให้แขก", "jao khaawng baan bpoet bpra-dtuu hai khaaek", "房主给客人开门。", "identity"],
  ["แขกที่บ้าน", "khaaek-thii-baan", "khaaek thii baan", "家里的客人", "名词", "人和身份", "วันนี้มีแขกที่บ้าน แม่จึงทำอาหารเพิ่ม", "wan-nii mii khaaek thii baan, maae jeung tham aa-haan phoem", "今天家里有客人，所以妈妈多做了饭。", "guest"],
  ["คนไทยคนหนึ่ง", "khon-thai-khon-neung", "khon thai khon neung", "一个泰国人", "名词", "基本身份", "ฉันถามทางจากคนไทยคนหนึ่งที่สถานี", "chan thaam thaang jaak khon thai khon neung thii sa-thaa-nii", "我在车站向一个泰国人问路。", "identity"],
  ["คนจีนคนหนึ่ง", "khon-jiin-khon-neung", "khon jiin khon neung", "一个中国人", "名词", "基本身份", "คนจีนคนหนึ่งเรียนภาษาไทยกับครูคนเดียวกัน", "khon jiin khon neung riian phaa-saa thai gap khruu khon diao gan", "一个中国人和同一位老师学泰语。", "identity"],
  ["ชาวต่างชาติ", "chaao-dtaang-chaat", "chaao dtaang chaat", "外国人；外籍人士", "名词", "基本身份", "ชาวต่างชาติคนนั้นพูดไทยได้นิดหน่อย", "chaao dtaang chaat khon nan phuut thai dai nit naawy", "那个外国人会说一点泰语。", "identity"],
  ["คนท้องถิ่น", "khon-thaawng-thin", "khon thaawng thin", "当地人", "名词", "基本身份", "คนท้องถิ่นแนะนำร้านอาหารใกล้วัด", "khon thaawng thin nae-nam raan aa-haan glai wat", "当地人推荐了寺庙附近的餐馆。", "identity"],
  ["คนแปลกหน้าคนนั้น", "khon-bplaaek-naa-khon-nan", "khon bplaaek naa khon nan", "那个陌生人", "名词", "基本身份", "เด็กไม่ควรไปกับคนแปลกหน้า", "dek mai khuuan bpai gap khon bplaaek naa", "孩子不应该跟陌生人走。", "identity"],
  ["คนรู้จักของแม่", "khon-ruu-jak-khaawng-maae", "khon ruu-jak khaawng maae", "妈妈认识的人", "名词", "基本身份", "ฉันเจอคนรู้จักบนรถไฟฟ้า", "chan joe khon ruu-jak bon rot-fai-faa", "我在轻轨上遇到了熟人。", "identity"],
  ["ผู้ชายเสื้อดำ", "phuu-chaai-seua-dam", "phuu-chaai seua dam", "穿黑衣服的男人", "名词", "人和身份", "ผู้ชายคนนั้นยืนรอรถเมล์อยู่", "phuu-chaai khon nan yuen raaw rot-mee yuu", "那个男人正在站着等公交车。", "person"],
  ["ผู้หญิงเสื้อขาว", "phuu-ying-seua-khaao", "phuu-ying seua khaao", "穿白衣服的女人/女士", "名词", "人和身份", "ผู้หญิงคนนี้เป็นครูของน้องสาวฉัน", "phuu-ying khon nii bpen khruu khaawng naawng-saao chan", "这位女士是我妹妹的老师。", "person"],
  ["เด็กผู้ชายตัวเล็ก", "dek-phuu-chaai-dtua-lek", "dek phuu-chaai dtua lek", "小男孩", "名词", "人和身份", "เด็กผู้ชายใส่เสื้อสีแดง", "dek phuu-chaai sai seua sii daaeng", "男孩穿着红色衣服。", "person"],
  ["เด็กผู้หญิงผมยาว", "dek-phuu-ying-phom-yaao", "dek phuu-ying phom yaao", "长头发女孩", "名词", "人和身份", "เด็กผู้หญิงถือกระเป๋าสีชมพู", "dek phuu-ying thue gra-bpao sii chom-phuu", "女孩拿着粉色书包。", "person"],
  ["คนตัวสูง", "khon-dtua-suung", "khon dtua suung", "高个子的人", "名词", "人和身份", "คนตัวสูงช่วยหยิบของบนชั้นให้ฉัน", "khon dtua suung chuai yip khaawng bon chan hai chan", "高个子的人帮我拿架子上的东西。", "description"],
  ["คนตัวเล็ก", "khon-dtua-lek", "khon dtua lek", "个子小的人", "名词", "人和身份", "คนตัวเล็กนั่งหน้าเพราะมองกระดานไม่เห็น", "khon dtua lek nang naa phraw maawng gra-daan mai hen", "个子小的人坐前面，因为看不见黑板。", "description"],
  ["คนผมยาว", "khon-phom-yaao", "khon phom yaao", "长头发的人", "名词", "人和身份", "คนผมยาวยืนอยู่หน้าร้านกาแฟ", "khon phom yaao yuen yuu naa raan gaa-faae", "长头发的人站在咖啡店前。", "description"],
  ["คนผมสั้น", "khon-phom-san", "khon phom san", "短头发的人", "名词", "人和身份", "คนผมสั้นเป็นเพื่อนร่วมชั้นของฉัน", "khon phom san bpen pheuan ruam chan khaawng chan", "短头发的人是我的同班同学。", "description"],
  ["ชื่อเล่นของฉัน", "chue-len-khaawng-chan", "chue len khaawng chan", "我的昵称", "名词", "称呼介绍", "ชื่อเล่นของฉันสั้นและจำง่าย", "chue len khaawng chan san lae jam ngaai", "我的昵称短，也容易记。", "name"],
  ["ชื่อจริงของเธอ", "chue-jing-khaawng-thoe", "chue jing khaawng thoe", "她的真名", "名词", "称呼介绍", "ชื่อจริงของเธอเขียนยากนิดหน่อย", "chue jing khaawng thoe khian yaak nit naawy", "她的真名有点难写。", "name"],
  ["นามสกุลของเขา", "naam-sa-gun-khaawng-khao", "naam-sa-gun khaawng khao", "他的姓", "名词", "称呼介绍", "นามสกุลของเขายาวมาก", "naam-sa-gun khaawng khao yaao maak", "他的姓很长。", "name"],
  ["เรียกชื่อเล่น", "riiak-chue-len", "riiak chue len", "叫昵称", "动词", "称呼介绍", "เพื่อน ๆ เรียกชื่อเล่นของฉันว่าเมย์", "pheuan pheuan riiak chue len khaawng chan waa mee", "朋友们叫我的昵称“May”。", "name"],
  ["แนะนำตัวเอง", "nae-nam-dtua-eeng", "nae-nam dtua eeng", "自我介绍", "动词", "称呼介绍", "นักเรียนใหม่แนะนำตัวเองเป็นภาษาไทย", "nak-riian mai nae-nam dtua eeng bpen phaa-saa thai", "新学生用泰语自我介绍。", "introduction"],
  ["แนะนำเพื่อน", "nae-nam-pheuan", "nae-nam pheuan", "介绍朋友", "动词", "称呼介绍", "ฉันแนะนำเพื่อนให้แม่รู้จัก", "chan nae-nam pheuan hai maae ruu-jak", "我把朋友介绍给妈妈认识。", "introduction"],
  ["เพิ่งรู้จักกัน", "phoeng-ruu-jak-gan", "phoeng ruu-jak gan", "刚认识", "动词", "称呼介绍", "เราเพิ่งรู้จักกันเมื่อวานนี้", "rao phoeng ruu-jak gan muea-waan nii", "我们昨天才认识。", "relationship"],
  ["ไม่รู้จักกัน", "mai-ruu-jak-gan", "mai ruu-jak gan", "互不认识", "短语", "称呼介绍", "สองคนนั้นนั่งใกล้กันแต่ไม่รู้จักกัน", "saawng khon nan nang glai gan dtaae mai ruu-jak gan", "那两个人坐得很近，但互不认识。", "relationship"],
  ["เป็นเพื่อนกัน", "bpen-pheuan-gan", "bpen pheuan gan", "是朋友", "短语", "朋友同学", "เราเป็นเพื่อนกันตั้งแต่เด็ก", "rao bpen pheuan gan dtang-dtaae dek", "我们从小就是朋友。", "friend"],
  ["เป็นญาติกัน", "bpen-yaat-gan", "bpen yaat gan", "是亲戚", "短语", "亲属称呼", "สองครอบครัวนี้เป็นญาติกัน", "saawng khraawp-khruua nii bpen yaat gan", "这两个家庭是亲戚。", "relative"],
  ["อยู่ด้วยกัน", "yuu-duai-gan", "yuu duai gan", "住在一起；一起生活", "动词", "家庭成员", "พ่อแม่และลูกอยู่ด้วยกันในบ้านหลังเล็ก", "phaaw maae lae luuk yuu duai gan nai baan lang lek", "父母和孩子一起住在小房子里。", "family"],
  ["ดูแลลูก", "duu-laae-luuk", "duu laae luuk", "照顾孩子", "动词", "家庭成员", "พ่อดูแลลูกตอนแม่ไปทำงาน", "phaaw duu-laae luuk dtaawn maae bpai tham-ngaan", "妈妈去上班时，爸爸照顾孩子。", "family"],
  ["ช่วยพ่อแม่", "chuai-phaaw-maae", "chuai phaaw maae", "帮助父母", "动词", "家庭成员", "เด็ก ๆ ช่วยพ่อแม่เก็บโต๊ะหลังอาหารเย็น", "dek dek chuai phaaw maae gep dto lang aa-haan yen", "孩子们晚饭后帮父母收桌子。", "family"],
  ["รักครอบครัว", "rak-khraawp-khruua", "rak khraawp-khruua", "爱家人；爱家庭", "动词", "家庭成员", "เขารักครอบครัวและโทรหาพ่อแม่ทุกวัน", "khao rak khraawp-khruua lae thoo haa phaaw maae thuk wan", "他爱家人，每天给父母打电话。", "family"],
  ["คิดถึงบ้าน", "khit-thueng-baan", "khit thueng baan", "想家", "动词", "家庭成员", "ฉันคิดถึงบ้านเมื่ออยู่ต่างเมือง", "chan khit thueng baan muea yuu dtaang mueang", "我在外地时想家。", "feeling"],
  ["คิดถึงแม่", "khit-thueng-maae", "khit thueng maae", "想妈妈", "动词", "家庭成员", "เด็กน้อยร้องไห้เพราะคิดถึงแม่", "dek naawy raawng-hai phraw khit thueng maae", "小孩因为想妈妈而哭。", "feeling"],
  ["ใจดีกับเด็ก", "jai-dii-gap-dek", "jai dii gap dek", "对孩子好；对孩子和善", "短语", "人和身份", "ครูคนนี้ใจดีกับเด็กทุกคน", "khruu khon nii jai dii gap dek thuk khon", "这位老师对每个孩子都很和善。", "personality"],
  ["ขี้อายนิดหน่อย", "khii-aai-nit-naawy", "khii-aai nit naawy", "有点害羞", "形容词", "人和身份", "น้องสาวของฉันขี้อายนิดหน่อยเมื่อเจอคนใหม่", "naawng-saao khaawng chan khii-aai nit naawy muea joe khon mai", "我妹妹见到新的人时有点害羞。", "personality"],
  ["พูดเก่ง", "phuut-geng", "phuut geng", "会说话；很健谈", "形容词", "人和身份", "เพื่อนคนนี้พูดเก่งและทำให้ทุกคนหัวเราะ", "pheuan khon nii phuut geng lae tham-hai thuk khon hua-raw", "这个朋友很健谈，让大家都笑了。", "personality"],
  ["เรียนเก่ง", "riian-geng", "riian geng", "学习好", "形容词", "朋友同学", "เพื่อนร่วมชั้นของฉันเรียนเก่งมาก", "pheuan ruam chan khaawng chan riian geng maak", "我的同班同学学习很好。", "student"],
  ["ทำงานเก่ง", "tham-ngaan-geng", "tham-ngaan geng", "工作能力强", "形容词", "同事邻居", "เพื่อนร่วมงานคนนี้ทำงานเก่งและมาถึงตรงเวลา", "pheuan ruam ngaan khon nii tham-ngaan geng lae maa thueng dtrong wee-laa", "这位同事工作能力强，而且准时到。", "work"],
  ["คนใจเย็น", "khon-jai-yen", "khon jai yen", "冷静的人；脾气温和的人", "名词", "人和身份", "พ่อเป็นคนใจเย็นและไม่ค่อยโกรธ", "phaaw bpen khon jai yen lae mai khaawy groot", "爸爸是个冷静的人，不太生气。", "personality"],
  ["คนขยัน", "khon-kha-yan", "khon kha-yan", "勤快的人", "名词", "人和身份", "แม่เป็นคนขยันและตื่นเช้ามาก", "maae bpen khon kha-yan lae dteun chaao maak", "妈妈是个勤快的人，起得很早。", "personality"],
  ["คนขี้เกียจ", "khon-khii-giiat", "khon khii-giiat", "懒惰的人", "名词", "人和身份", "อย่าเป็นคนขี้เกียจ ต้องช่วยกันทำความสะอาด", "yaa bpen khon khii-giiat, dtawng chuai gan tham khwaam sa-aat", "不要做懒惰的人，要一起打扫。", "personality"],
  ["คนเงียบ ๆ", "khon-ngiiap-ngiiap", "khon ngiiap ngiiap", "安静的人", "名词", "人和身份", "เขาเป็นคนเงียบ ๆ แต่ใจดีมาก", "khao bpen khon ngiiap ngiiap dtaae jai dii maak", "他是个安静的人，但很善良。", "personality"],
  ["คนพูดมาก", "khon-phuut-maak", "khon phuut maak", "话多的人", "名词", "人和身份", "ฉันนั่งข้างคนพูดมากบนรถเมล์", "chan nang khaang khon phuut maak bon rot-mee", "我在公交车上坐在一个话多的人旁边。", "personality"],
  ["เด็กใหม่ชื่ออะไร", "dek-mai-chue-a-rai", "dek mai chue a-rai", "新来的孩子叫什么名字", "短语", "称呼介绍", "เด็กใหม่ชื่ออะไร ครูถามเบา ๆ", "dek mai chue a-rai, khruu thaam bao bao", "新来的孩子叫什么名字？老师轻声问。", "question"],
  ["คุณมาจากไหนครับ", "khun-maa-jaak-nai-khrap", "khun maa jaak nai khrap", "您从哪里来（男用礼貌说法）", "短语", "称呼介绍", "คุณมาจากไหน ฉันมาจากจีน", "khun maa jaak nai, chan maa jaak jiin", "你从哪里来？我来自中国。", "question"],
  ["อยู่กับใคร", "yuu-gap-khrai", "yuu gap khrai", "和谁住", "短语", "家庭成员", "ตอนนี้เธออยู่กับใครที่กรุงเทพฯ", "dtaawn-nii thoe yuu gap khrai thii grung-theep", "她现在在曼谷和谁住？", "question"],
  ["มีพี่น้องไหม", "mii-phii-naawng-mai", "mii phii-naawng mai", "有没有兄弟姐妹", "短语", "亲属称呼", "คุณมีพี่น้องไหม ฉันมีน้องสาวหนึ่งคน", "khun mii phii-naawng mai, chan mii naawng-saao neung khon", "你有兄弟姐妹吗？我有一个妹妹。", "question"],
  ["แต่งงานแล้ว", "dtaeng-ngaan-laaeo", "dtaeng-ngaan laaeo", "已经结婚", "短语", "基本身份", "พี่ชายของฉันแต่งงานแล้วและมีลูกหนึ่งคน", "phii-chaai khaawng chan dtaeng-ngaan laaeo lae mii luuk neung khon", "我哥哥已经结婚，有一个孩子。", "status"],
  ["ยังไม่แต่งงาน", "yang-mai-dtaeng-ngaan", "yang mai dtaeng-ngaan", "还没结婚", "短语", "基本身份", "เธอยังไม่แต่งงานและอยู่กับพ่อแม่", "thoe yang mai dtaeng-ngaan lae yuu gap phaaw maae", "她还没结婚，和父母住在一起。", "status"],
  ["คนโสด", "khon-soot", "khon soot", "单身的人", "名词", "基本身份", "เขาเป็นคนโสดและอยู่คนเดียว", "khao bpen khon soot lae yuu khon diao", "他是单身，一个人住。", "status"],
  ["สามีของเธอ", "saa-mii-khaawng-thoe", "saa-mii khaawng thoe", "她的丈夫", "名词", "家庭成员", "สามีของเธอทำงานที่โรงพยาบาล", "saa-mii khaawng thoe tham-ngaan thii roong-pha-yaa-baan", "她的丈夫在医院工作。", "spouse"],
  ["ภรรยาของเขา", "phan-ra-yaa-khaawng-khao", "phan-ra-yaa khaawng khao", "他的妻子", "名词", "家庭成员", "ภรรยาของเขาชอบปลูกดอกไม้", "phan-ra-yaa khaawng khao chaawp bpluuk daawk-maai", "他的妻子喜欢种花。", "spouse"],
  ["แฟนของพี่สาว", "faaen-khaawng-phii-saao", "faaen khaawng phii-saao", "姐姐的恋人/对象", "名词", "基本身份", "แฟนของฉันชอบดูหนังไทย", "faaen khaawng chan chaawp duu nang thai", "我的恋人喜欢看泰国电影。", "relationship"],
  ["เพื่อนผู้ชาย", "pheuan-phuu-chaai", "pheuan phuu-chaai", "男性朋友", "名词", "朋友同学", "เพื่อนผู้ชายของฉันเล่นกีตาร์เก่ง", "pheuan phuu-chaai khaawng chan len gii-dtaa geng", "我的男性朋友吉他弹得好。", "friend"],
  ["เพื่อนผู้หญิง", "pheuan-phuu-ying", "pheuan phuu-ying", "女性朋友", "名词", "朋友同学", "เพื่อนผู้หญิงของฉันชอบไปห้องสมุด", "pheuan phuu-ying khaawng chan chaawp bpai haawng-sa-mut", "我的女性朋友喜欢去图书馆。", "friend"],
  ["คนเดียวในบ้าน", "khon-diao-nai-baan", "khon diao nai baan", "家里唯一的人；独自在家的人", "短语", "家庭成员", "วันนี้ฉันอยู่คนเดียวในบ้านเพราะทุกคนไปทำงาน", "wan-nii chan yuu khon diao nai baan phraw thuk khon bpai tham-ngaan", "今天我一个人在家，因为大家都去工作了。", "home"],
  ["หลายคนในครอบครัว", "laai-khon-nai-khraawp-khruua", "laai khon nai khraawp-khruua", "家里的很多人", "短语", "家庭成员", "หลายคนในครอบครัวชอบกินอาหารเผ็ด", "laai khon nai khraawp-khruua chaawp gin aa-haan phet", "家里的很多人喜欢吃辣。", "family"],
  ["ทุกคนในบ้าน", "thuk-khon-nai-baan", "thuk khon nai baan", "家里的每个人", "短语", "家庭成员", "ทุกคนในบ้านตื่นเช้าก่อนเจ็ดโมง", "thuk khon nai baan dteun chaao gaawn jet moong", "家里的每个人七点前起床。", "family"],
  ["คนที่ฉันรัก", "khon-thii-chan-rak", "khon thii chan rak", "我爱的人", "短语", "人和身份", "ฉันอยากทำอาหารให้คนที่ฉันรัก", "chan yaak tham aa-haan hai khon thii chan rak", "我想给我爱的人做饭。", "feeling"],
  ["คนสำคัญ", "khon-sam-khan", "khon sam-khan", "重要的人", "名词", "人和身份", "แม่เป็นคนสำคัญที่สุดในชีวิตฉัน", "maae bpen khon sam-khan thii-sut nai chii-wit chan", "妈妈是我生命中最重要的人。", "person"],
] as const satisfies readonly Row[];

const toCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const [thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = row;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a1", "people-family", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a1",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A1 阶段先把整组表达当作固定搭配记忆，再替换人称或称呼。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["适合在介绍自己、介绍家人或描述身边的人时使用。"],
    tags,
    sourceRefs: PEOPLE_FAMILY_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_PEOPLE_FAMILY_01 = rows.map(toCandidate);
