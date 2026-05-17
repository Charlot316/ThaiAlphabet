export type VocabularyExpansionPartOfSpeech = "量词" | "名词" | "短语";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "量词" | "单位" | "容器" | "数量搭配" | "买东西数量" | "时间次数" | "分类词";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";

export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };

type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme, string, string, string, string, string, string, VocabularyExpansionComparisonKind, string, string];

const MEASURE_REFS = ["worker-a-a2-measure-classifiers", "basic-thai-classifiers"];

const rows: Row[] = [
  ["khon", "คน", "khon", "人的量词；个人", "量词", "分类词", "ในห้องนี้มีนักเรียนยี่สิบคนและครูหนึ่งคน", "nai haawng nii mii nak-riian yii-sip khon lae khruu neung khon", "这个房间里有二十名学生和一位老师。", "ตัว", "dtua", "动物/衣物量词", "confusable", "คน 用于人；ตัว 用于动物、衣服等。", "人"],
  ["dtua", "ตัว", "dtua", "动物、衣服、椅子等量词", "量词", "分类词", "บ้านคุณยายมีแมวสองตัวและหมาหนึ่งตัว", "baan khun-yaai mii maaeo saawng dtua lae maa neung dtua", "外婆家有两只猫和一只狗。", "คน", "khon", "人的量词", "confusable", "ตัว 不用于正式数人。", "只"],
  ["an", "อัน", "an", "一般物品量词；个", "量词", "分类词", "ฉันซื้อยางลบสามอันที่ร้านหน้าโรงเรียน", "chan sue yaang-lop saam an thii raan naa roong-riian", "我在学校门口的店买了三个橡皮。", "ชิ้น", "chin", "块；件", "confusable", "อัน 很泛用；ชิ้น 更像一块/一件成品。", "个"],
  ["bai", "ใบ", "bai", "张、只、ใบ类物量词", "量词", "分类词", "เขาซื้อตั๋วสองใบให้พ่อกับแม่", "khao sue dtua saawng bai hai phaaw gap maae", "他给爸爸妈妈买了两张票。", "แผ่น", "phaen", "片；张", "confusable", "ใบ 可用于票、包、叶子；แผ่น 更强调扁平片状。", "张"],
  ["lem", "เล่ม", "lem", "书、本子等量词", "量词", "分类词", "ครูให้เราอ่านหนังสือหนึ่งเล่มในเดือนนี้", "khruu hai rao aan nang-sue neung lem nai duean nii", "老师让我们这个月读一本书。", "เล่ม", "lem", "也可用于刀、蜡烛等细长物", "usage", "เล่ม 常见搭配是หนังสือเล่มหนึ่ง。", "本"],
  ["daam", "ด้าม", "daam", "笔、伞、带柄物量词", "量词", "分类词", "นักเรียนทุกคนต้องมีปากกาสองด้าม", "nak-riian thuk khon dtawng mii bpaak-gaa saawng daam", "每个学生都要有两支笔。", "แท่ง", "thaaeng", "条；根", "confusable", "ด้าม 常用于有柄或可握的东西；แท่ง 强调条状。", "支"],
  ["thaaeng", "แท่ง", "thaaeng", "条、根、块状长物量词", "量词", "分类词", "น้องมีดินสอสีห้าแท่งในกล่อง", "naawng mii din-saaw sii haa thaaeng nai glaawng", "弟弟盒子里有五根彩色铅笔。", "ด้าม", "daam", "支；带柄物", "confusable", "แท่ง 看形状；ด้าม 看握柄或工具感。", "根"],
  ["khan", "คัน", "khan", "车辆、伞等量词", "量词", "分类词", "หน้าบ้านมีรถสองคันจอดอยู่", "naa baan mii rot saawng khan jaawt yuu", "家门前停着两辆车。", "ลำ", "lam", "船/飞机量词", "confusable", "รถ ใช้คัน；船和飞机常用ลำ。", "辆"],
  ["lam", "ลำ", "lam", "船、飞机等量词", "量词", "分类词", "สนามบินนี้มีเครื่องบินหลายลำ", "sa-naam-bin nii mii khreuuang-bin laai lam", "这个机场有好几架飞机。", "คัน", "khan", "车辆量词", "confusable", "เครื่องบิน和เรือ常用ลำ。", "架"],
  ["lang", "หลัง", "lang", "房屋量词；后面", "量词", "分类词", "หมู่บ้านนี้มีบ้านประมาณห้าสิบหลัง", "muu-baan nii mii baan bpra-maan haa-sip lang", "这个村子大约有五十栋房子。", "ห้อง", "haawng", "房间量词", "confusable", "หลัง 数房子；ห้อง 数房间。", "栋"],
  ["haawng", "ห้อง", "haawng", "房间量词；房间", "量词", "分类词", "โรงแรมนี้มีห้องว่างสามห้อง", "roong-raaem nii mii haawng waang saam haawng", "这家酒店有三间空房。", "หลัง", "lang", "房屋量词", "confusable", "ห้อง 是一间房；หลัง 是一栋房。", "间"],
  ["baan", "บาน", "baan", "门窗等扇量词", "量词", "分类词", "ห้องนี้มีหน้าต่างสองบานและประตูหนึ่งบาน", "haawng nii mii naa-dtaang saawng baan lae bpra-dtuu neung baan", "这个房间有两扇窗和一扇门。", "ใบ", "bai", "张；ใบ类物", "confusable", "门窗多用บาน，不用ใบ。", "扇"],
  ["duang", "ดวง", "duang", "灯、太阳、月亮等量词", "量词", "分类词", "ห้องเรียนมีไฟสามดวงแต่เสียหนึ่งดวง", "haawng-riian mii fai saam duang dtaae siia neung duang", "教室有三盏灯，但坏了一盏。", "หลอด", "laawt", "管；灯管/吸管", "confusable", "ดวง 数灯光或天体；หลอด 数灯管、吸管。", "盏"],
  ["luuk", "ลูก", "luuk", "球形物、水果、孩子等量词", "量词", "分类词", "แม่ซื้อส้มสี่ลูกให้เด็ก ๆ", "maae sue som sii luuk hai dek dek", "妈妈给孩子们买了四个橙子。", "ผล", "phon", "水果较正式量词", "near-synonym", "ลูก 很口语常用；ผล 数水果更正式。", "个"],
  ["phon", "ผล", "phon", "水果的量词；果实", "量词", "分类词", "คุณยายเก็บมะม่วงห้าผลจากสวน", "khun-yaai gep ma-muang haa phon jaak suan", "外婆从园子里摘了五个芒果。", "ลูก", "luuk", "球形物/水果量词", "near-synonym", "ผล 较书面；ลูก 口语更常见。", "果"],
  ["met", "เม็ด", "met", "小颗粒量词", "量词", "分类词", "หมอบอกให้กินยาสองเม็ดหลังอาหาร", "maaw baawk hai gin yaa saawng met lang aa-haan", "医生说饭后吃两粒药。", "ก้อน", "gaawn", "块", "confusable", "เม็ด 小颗粒；ก้อน 较大块。", "粒"],
  ["gaawn", "ก้อน", "gaawn", "块；团", "量词", "分类词", "ใส่น้ำแข็งสามก้อนในแก้วน้ำ", "sai naam-khaeng saam gaawn nai gaaeow naam", "在水杯里放三块冰。", "เม็ด", "met", "粒", "confusable", "ก้อน 比เม็ด更有块状感。", "块"],
  ["chin", "ชิ้น", "chin", "块；件；片", "量词", "分类词", "เขากินเค้กสองชิ้นหลังอาหารเย็น", "khao gin khek saawng chin lang aa-haan yen", "他晚饭后吃了两块蛋糕。", "อัน", "an", "个", "confusable", "ชิ้น 强调切分或一件成品。", "块"],
  ["phaen", "แผ่น", "phaen", "片；张；薄片量词", "量词", "分类词", "ขอขนมปังสองแผ่นกับนมหนึ่งแก้ว", "khaaw kha-nom-bpang saawng phaen gap nom neung gaaeow", "请给我两片面包和一杯牛奶。", "ใบ", "bai", "张；只", "confusable", "แผ่น 强调扁平薄片。", "片"],
  ["sen", "เส้น", "sen", "线状物量词；条", "量词", "分类词", "ฉันซื้อก๋วยเตี๋ยวเส้นเล็กหนึ่งถุง", "chan sue guai-dtiaao sen lek neung thung", "我买了一袋细米粉。", "สาย", "saai", "线路/带状物量词", "confusable", "เส้น 强调细长线状；สาย 常用于路线、线缆、电话。", "条"],
  ["saai", "สาย", "saai", "线路、线、电话等量词", "量词", "分类词", "รถเมล์สองสายผ่านหน้าโรงเรียน", "rot-mee saawng saai phaan naa roong-riian", "两条公交线路经过学校门口。", "เส้น", "sen", "细长线状量词", "confusable", "สาย 常用于线路和电话。", "线路"],
  ["khuu", "คู่", "khuu", "双；对", "量词", "分类词", "รองเท้าคู่นี้ราคาไม่แพง", "raawng-thaao khuu nii raa-khaa mai phaaeng", "这双鞋不贵。", "ข้าง", "khaang", "一边；一只", "confusable", "คู่ 是一双；ข้าง 是其中一只/一边。", "双"],
  ["khaang", "ข้าง", "khaang", "一边；一只；侧", "量词", "分类词", "รองเท้าข้างซ้ายหายไปหนึ่งข้าง", "raawng-thaao khaang saai haai bpai neung khaang", "左脚那只鞋丢了一只。", "คู่", "khuu", "一双", "confusable", "ข้าง 是单边；คู่ 是成双。", "只"],
  ["chut", "ชุด", "chut", "套；组；一整套", "量词", "分类词", "นักเรียนต้องใส่ชุดนักเรียนหนึ่งชุด", "nak-riian dtawng sai chut nak-riian neung chut", "学生必须穿一套校服。", "ตัว", "dtua", "衣物单件量词", "confusable", "ชุด 是一套；ตัว 可指一件衣服。", "套"],
  ["phuen", "ผืน", "pheun", "布、毯子、地图等量词", "量词", "分类词", "แม่ซื้อผ้าห่มใหม่สองผืน", "maae sue phaa-hom mai saawng pheun", "妈妈买了两条新毯子。", "แผ่น", "phaen", "薄片；张", "confusable", "ผืน 常用于布类、毯子、地图。", "条"],
  ["khap", "คาบ", "khaap", "课时；一节课", "量词", "时间次数", "วันนี้เรามีเรียนภาษาไทยสองคาบ", "wan-nii rao mii riian phaa-saa thai saawng khaap", "今天我们有两节泰语课。", "ชั่วโมง", "chua-moong", "小时", "confusable", "คาบ 是学校课程节次；ชั่วโมง 是小时。", "节课"],
  ["khrang", "ครั้ง", "khrang", "次；回", "量词", "时间次数", "กรุณาอ่านประโยคนี้อีกหนึ่งครั้ง", "ga-ru-naa aan bpra-yook nii iik neung khrang", "请再读一次这个句子。", "รอบ", "raawp", "轮；圈", "confusable", "ครั้ง 是次数；รอบ 常有一轮或一圈的感觉。", "次"],
  ["raawp", "รอบ", "raawp", "轮；圈；场次", "量词", "时间次数", "หนังรอบนี้เริ่มสองทุ่ม", "nang raawp nii roem saawng thum", "这场电影晚上八点开始。", "ครั้ง", "khrang", "次", "confusable", "รอบ 可用于场次、圈数；ครั้ง 更泛指次数。", "轮"],
  ["thiao", "เที่ยว", "thiao", "趟；班次；次旅行", "量词", "时间次数", "รถไฟเที่ยวนี้ออกตรงเวลา", "rot-fai thiao nii aawk dtrong wee-laa", "这趟火车准时出发。", "ครั้ง", "khrang", "次", "confusable", "เที่ยว 常用于交通班次或一趟旅行。", "趟"],
  ["wan", "วัน", "wan", "天；日", "量词", "时间次数", "เขาหยุดเรียนสองวันเพราะไม่สบาย", "khao yut riian saawng wan phraw mai sa-baai", "他因为不舒服请假两天。", "คืน", "khuen", "晚；夜", "confusable", "วัน 数白天/天数；คืน 数夜晚或住宿晚数。", "天"],
  ["khuen", "คืน", "khuen", "晚；夜", "量词", "时间次数", "เราพักที่โรงแรมนี้สามคืน", "rao phak thii roong-raaem nii saam khuen", "我们在这家酒店住三晚。", "วัน", "wan", "天", "confusable", "住宿常按คืน来数。", "晚"],
  ["chua-moong", "ชั่วโมง", "chua-moong", "小时", "量词", "时间次数", "จากบ้านไปสนามบินใช้เวลาหนึ่งชั่วโมง", "jaak baan bpai sa-naam-bin chai wee-laa neung chua-moong", "从家到机场花一小时。", "นาที", "naa-thii", "分钟", "confusable", "ชั่วโมง 比นาที 大。", "小时"],
  ["naa-thii", "นาที", "naa-thii", "分钟", "量词", "时间次数", "รออีกห้านาที รถจะมาถึง", "raaw iik haa naa-thii rot ja maa theung", "再等五分钟，车就会到。", "วินาที", "wi-naa-thii", "秒", "confusable", "นาที 是分钟；วินาที 是秒。", "分钟"],
  ["deuan", "เดือน", "duean", "月；个月", "量词", "时间次数", "ฉันอยู่เมืองไทยมาสามเดือนแล้ว", "chan yuu mueang thai maa saam duean laaeo", "我在泰国住了三个月了。", "ปี", "bpii", "年", "confusable", "เดือน 是月；ปี 是年。", "月"],
  ["bpii", "ปี", "bpii", "年；岁", "量词", "时间次数", "น้องเรียนภาษาไทยมาหนึ่งปี", "naawng riian phaa-saa thai maa neung bpii", "弟弟学泰语一年了。", "เดือน", "duean", "月", "confusable", "ปี 可表示年份长度，也用于年龄。", "年"],
  ["baat", "บาท", "baat", "泰铢；钱的单位", "量词", "单位", "ข้าวกล่องนี้ราคาห้าสิบบาท", "khaao glaawng nii raa-khaa haa-sip baat", "这盒饭五十泰铢。", "สตางค์", "sa-dtaang", "泰铢辅币", "usage", "日常价格最常用บาท。", "泰铢"],
  ["gi-loo", "กิโล", "gi-loo", "公斤；公里的口语省略", "量词", "单位", "แม่ซื้อข้าวสารห้ากิโลที่ตลาด", "maae sue khaao-saan haa gi-loo thii dta-laat", "妈妈在市场买了五公斤米。", "กิโลเมตร", "gi-loo-met", "公里", "confusable", "买东西时กิโล常指公斤；距离要看语境。", "公斤"],
  ["gi-loo-gram", "กิโลกรัม", "gi-loo-gram", "公斤", "量词", "单位", "มะม่วงสองกิโลกรัมราคาแปดสิบบาท", "ma-muang saawng gi-loo-gram raa-khaa bpaaet-sip baat", "两公斤芒果八十泰铢。", "กรัม", "gram", "克", "confusable", "กิโลกรัม 比กรัม 大。", "公斤"],
  ["gram", "กรัม", "gram", "克", "量词", "单位", "ขนมถุงนี้หนักสองร้อยกรัม", "kha-nom thung nii nak saawng raawy gram", "这袋点心重两百克。", "กิโลกรัม", "gi-loo-gram", "公斤", "confusable", "กรัม 适合较小重量。", "克"],
  ["lii-dt", "ลิตร", "lit", "升", "量词", "单位", "น้ำมันหนึ่งลิตรราคาแพงขึ้น", "naam-man neung lit raa-khaa phaaeng kheun", "一升油变贵了。", "มิลลิลิตร", "min-li-lit", "毫升", "confusable", "ลิตร 比มิลลิลิตร 大。", "升"],
  ["min-li-lit", "มิลลิลิตร", "min-li-lit", "毫升", "量词", "单位", "ขวดนี้มีน้ำสองร้อยมิลลิลิตร", "khuat nii mii naam saawng raawy min-li-lit", "这个瓶子里有两百毫升水。", "ลิตร", "lit", "升", "confusable", "มิลลิลิตร 用于小容量。", "毫升"],
  ["met-unit", "เมตร", "met", "米", "量词", "单位", "ร้านอยู่ห่างจากสถานีประมาณร้อยเมตร", "raan yuu haang jaak sa-thaa-nii bpra-maan raawy met", "店离车站大约一百米。", "กิโลเมตร", "gi-loo-met", "公里", "confusable", "เมตร 比กิโลเมตร 短。", "米"],
  ["gi-loo-met", "กิโลเมตร", "gi-loo-met", "公里", "量词", "单位", "จากบ้านไปโรงเรียนประมาณสามกิโลเมตร", "jaak baan bpai roong-riian bpra-maan saam gi-loo-met", "从家到学校大约三公里。", "เมตร", "met", "米", "confusable", "กิโลเมตร 用于较长距离。", "公里"],
  ["sen-dti-met", "เซนติเมตร", "sen-dti-met", "厘米", "量词", "单位", "โต๊ะตัวนี้สูงเจ็ดสิบเซนติเมตร", "dto dtua nii suung jet-sip sen-dti-met", "这张桌子高七十厘米。", "เมตร", "met", "米", "confusable", "เซนติเมตร 比เมตร 小。", "厘米"],
  ["khiit", "ขีด", "khiit", "一百克；刻度", "量词", "单位", "ขอหมูสามขีดสำหรับทำอาหารเย็น", "khaaw muu saam khiit sam-rap tham aa-haan yen", "请给我三两猪肉做晚饭。", "กิโล", "gi-loo", "公斤", "confusable", "ขีด 在泰国买菜常用，十ขีด等于一公斤。", "两"],
  ["doon", "โหล", "lo", "打；十二个", "量词", "买东西数量", "แม่ซื้อไข่หนึ่งโหลที่ตลาด", "maae sue khai neung lo thii dta-laat", "妈妈在市场买了一打鸡蛋。", "แพ็ก", "phaek", "包；组装一包", "confusable", "โหล 固定十二个；แพ็ก 看包装数量。", "打"],
  ["phaek", "แพ็ก", "phaek", "包；组；包装单位", "量词", "买东西数量", "น้ำขวดแพ็กนี้มีหกขวด", "naam khuat phaek nii mii hok khuat", "这包瓶装水有六瓶。", "โหล", "lo", "十二个一打", "confusable", "แพ็ก 是包装单位，不一定十二个。", "包"],
  ["mat", "มัด", "mat", "捆；束", "量词", "买东西数量", "เขาซื้อผักบุ้งสองมัดกลับบ้าน", "khao sue phak-bung saawng mat glap baan", "他买了两捆空心菜回家。", "กำ", "gam", "把；握成一把", "near-synonym", "มัด 是捆好的；กำ 是手抓一把。", "捆"],
  ["gam", "กำ", "gam", "把；一握", "量词", "买东西数量", "คุณยายใส่ผักชีหนึ่งกำในต้มจืด", "khun-yaai sai phak-chii neung gam nai dtom-jeut", "外婆在清汤里放了一把香菜。", "มัด", "mat", "捆", "near-synonym", "กำ 更像手抓的量；มัด 是绑成一捆。", "把"],
  ["haaw", "ห่อ", "haaw", "包；一包", "量词", "容器", "เด็กซื้อข้าวเหนียวหนึ่งห่อก่อนขึ้นรถ", "dek sue khaao-niao neung haaw gaawn kheun rot", "孩子上车前买了一包糯米饭。", "ถุง", "thung", "袋", "confusable", "ห่อ 强调用纸或叶子包；ถุง 是袋子。", "包"],
  ["thung", "ถุง", "thung", "袋；袋子", "量词", "容器", "ขอถุงเล็กสองถุงได้ไหมคะ", "khaaw thung lek saawng thung dai mai kha", "可以给我两个小袋子吗？", "ห่อ", "haaw", "包", "confusable", "ถุง 是袋；ห่อ 是包起来的一份。", "袋"],
  ["glaawng", "กล่อง", "glaawng", "盒；箱", "量词", "容器", "พ่อซื้อข้าวกล่องสามกล่องให้พวกเรา", "phaaw sue khaao-glaawng saam glaawng hai phuak rao", "爸爸给我们买了三盒盒饭。", "ลัง", "lang", "箱；大箱", "confusable", "กล่อง 可大可小；ลัง 常是较大的箱。", "盒"],
  ["lang-box", "ลัง", "lang", "大箱；箱", "量词", "容器", "ร้านสั่งน้ำดื่มสองลังสำหรับงานเลี้ยง", "raan sang naam-deum saawng lang sam-rap ngaan-liiang", "店里为聚会订了两箱饮用水。", "กล่อง", "glaawng", "盒；箱", "confusable", "ลัง 常用于成箱饮料等较大包装。", "箱"],
  ["khuat", "ขวด", "khuat", "瓶", "量词", "容器", "ฉันซื้อน้ำเปล่าสองขวดที่สถานี", "chan sue naam-bplaao saawng khuat thii sa-thaa-nii", "我在车站买了两瓶水。", "แก้ว", "gaaeow", "杯", "confusable", "ขวด 是瓶；แก้ว 是杯。", "瓶"],
  ["gaaeow", "แก้ว", "gaaeow", "杯；玻璃杯", "量词", "容器", "ขอกาแฟเย็นหนึ่งแก้วไม่หวานมาก", "khaaw gaa-faae yen neung gaaeow mai waan maak", "请给我一杯冰咖啡，不要太甜。", "ถ้วย", "thuai", "碗/小杯", "confusable", "แก้ว 常用于饮料杯；ถ้วย 可用于小碗或杯。", "杯"],
  ["thuai", "ถ้วย", "thuai", "碗；杯状容器", "量词", "容器", "ตอนเช้าฉันกินโจ๊กหนึ่งถ้วย", "dtaawn chaao chan gin joke neung thuai", "早上我吃了一碗粥。", "ชาม", "chaam", "碗；大碗", "confusable", "ถ้วย 通常较小；ชาม 常较大。", "碗"],
  ["chaam", "ชาม", "chaam", "碗；大碗", "量词", "容器", "พี่กินก๋วยเตี๋ยวสองชามเพราะหิวมาก", "phii gin guai-dtiaao saawng chaam phraw hiu maak", "哥哥因为很饿吃了两碗面。", "ถ้วย", "thuai", "小碗/杯", "confusable", "ชาม 比ถ้วย更像大碗。", "碗"],
  ["jaan", "จาน", "jaan", "盘；一盘", "量词", "容器", "เราสั่งข้าวผัดหนึ่งจานกับต้มจืดหนึ่งถ้วย", "rao sang khaao-phat neung jaan gap dtom-jeut neung thuai", "我们点了一盘炒饭和一碗清汤。", "ชาม", "chaam", "碗", "confusable", "จาน 是盘；ชาม 是碗。", "盘"],
  ["gra-bpaawng", "กระป๋อง", "gra-bpaawng", "罐；听", "量词", "容器", "เด็กซื้อปลากระป๋องสองกระป๋อง", "dek sue bplaa gra-bpaawng saawng gra-bpaawng", "孩子买了两罐鱼罐头。", "ขวด", "khuat", "瓶", "confusable", "กระป๋อง 是罐；ขวด 是瓶。", "罐"],
  ["chaawn-chaa", "ช้อนชา", "chaawn chaa", "茶匙；小勺量", "量词", "单位", "ใส่น้ำตาลหนึ่งช้อนชาก็พอ", "sai naam-dtaan neung chaawn chaa gaaw phaaw", "放一茶匙糖就够了。", "ช้อนโต๊ะ", "chaawn dto", "汤匙", "confusable", "ช้อนชา 比ช้อนโต๊ะ小。", "茶匙"],
  ["chaawn-dto", "ช้อนโต๊ะ", "chaawn dto", "汤匙；大勺量", "量词", "单位", "ใส่น้ำปลาสองช้อนโต๊ะในแกง", "sai naam-bplaa saawng chaawn dto nai gaaeng", "在咖喱里放两汤匙鱼露。", "ช้อนชา", "chaawn chaa", "茶匙", "confusable", "ช้อนโต๊ะ 比ช้อนชา大。", "汤匙"],
  ["nueng-nit", "หนึ่งนิด", "neung nit", "一点点；少量", "短语", "数量搭配", "ขอพริกหนึ่งนิดพอ ฉันกินเผ็ดไม่เก่ง", "khaaw phrik neung nit phaaw chan gin phet mai geng", "请给一点点辣椒就够了，我不太能吃辣。", "เยอะ", "yuh", "多", "antonym", "หนึ่งนิด/นิดเดียว 都表示少量。", "少量"],
  ["nit-diaao", "นิดเดียว", "nit diao", "一点点；很少", "短语", "数量搭配", "น้ำตาลเหลือนิดเดียว ต้องซื้อเพิ่ม", "naam-dtaan leuua nit diao dtawng sue phoem", "糖只剩一点点了，得再买。", "เยอะมาก", "yuh maak", "很多", "antonym", "นิดเดียว 强调非常少。", "一点点"],
  ["laai-an", "หลายอัน", "laai an", "好几个东西", "短语", "数量搭配", "ในกล่องมีของเล่นหลายอัน", "nai glaawng mii khaawng-len laai an", "盒子里有好几个玩具。", "อันเดียว", "an diao", "一个", "antonym", "หลายอัน 表示多个；อันเดียว 表示一个。", "好几个"],
  ["baang-chin", "บางชิ้น", "baang chin", "有些件；部分块", "短语", "数量搭配", "ขนมบางชิ้นหวานมาก แต่บางชิ้นไม่หวาน", "kha-nom baang chin waan maak dtaae baang chin mai waan", "有些点心很甜，但有些不甜。", "ทุกชิ้น", "thuk chin", "每一件", "antonym", "บางชิ้น 是部分；ทุกชิ้น 是全部每件。", "部分"],
  ["thuk-chin", "ทุกชิ้น", "thuk chin", "每一件；所有件", "短语", "数量搭配", "แม่ตรวจเสื้อทุกชิ้นก่อนใส่กระเป๋า", "maae dtruat seua thuk chin gaawn sai gra-bpao", "妈妈把每件衣服检查后才放进包。", "บางชิ้น", "baang chin", "有些件", "antonym", "ทุกชิ้น 强调每一件都包括。", "每件"],
  ["khon-la", "คนละ", "khon la", "每人各……", "短语", "数量搭配", "ครูแจกดินสอให้นักเรียนคนละหนึ่งด้าม", "khruu jaaek din-saaw hai nak-riian khon la neung daam", "老师给每个学生各发一支铅笔。", "รวมกัน", "ruam gan", "合起来", "confusable", "คนละ 表示每人各自的数量。", "每人"],
  ["chut-la", "ชุดละ", "chut la", "每套……", "短语", "买东西数量", "ชุดนักเรียนชุดละสามร้อยบาท", "chut nak-riian chut la saam raawy baat", "校服每套三百泰铢。", "ทั้งหมด", "thang mot", "全部总共", "confusable", "ชุดละ 表示每套单价。", "每套"],
  ["kilo-la", "กิโลละ", "gi-loo la", "每公斤……", "短语", "买东西数量", "มะม่วงกิโลละหกสิบบาท", "ma-muang gi-loo la hok-sip baat", "芒果每公斤六十泰铢。", "ทั้งหมด", "thang mot", "总共", "confusable", "กิโลละ 是单价，不是总价。", "每公斤"],
  ["bai-la", "ใบละ", "bai la", "每张/每个ใบ类物……", "短语", "买东西数量", "ตั๋วใบละยี่สิบบาทสำหรับเด็ก", "dtua bai la yii-sip baat sam-rap dek", "儿童票每张二十泰铢。", "สองใบ", "saawng bai", "两张", "usage", "ใบละ 后常接价格。", "每张"],
  ["khuat-la", "ขวดละ", "khuat la", "每瓶……", "短语", "买东西数量", "น้ำขวดละสิบบาท ซื้อสองขวดลดราคา", "naam khuat la sip baat sue saawng khuat lot raa-khaa", "水每瓶十泰铢，买两瓶打折。", "แพ็กละ", "phaek la", "每包", "confusable", "ขวดละ 是每瓶；แพ็กละ 是每包。", "每瓶"],
  ["phaek-la", "แพ็กละ", "phaek la", "每包……", "短语", "买东西数量", "นมแพ็กละสี่สิบบาท มีสี่กล่อง", "nom phaek la sii-sip baat mii sii glaawng", "牛奶每包四十泰铢，有四盒。", "ขวดละ", "khuat la", "每瓶", "confusable", "แพ็กละ 看整包包装。", "每包"],
  ["neung-diaao", "หนึ่งเดียว", "neung diao", "唯一一个；只有一个", "短语", "数量搭配", "นี่เป็นทางออกหนึ่งเดียวของอาคารนี้", "nii bpen thaang aawk neung diao khaawng aa-khaan nii", "这是这栋楼唯一的出口。", "หลาย", "laai", "多个", "antonym", "หนึ่งเดียว 强调只有一个。", "唯一"],
  ["diao", "เดียว", "diao", "单一；一个；唯一", "短语", "数量搭配", "ฉันมีกระเป๋าใบเดียวสำหรับเดินทาง", "chan mii gra-bpao bai diao sam-rap doen-thaang", "我只有一个旅行用包。", "หลายใบ", "laai bai", "好几个包/张", "antonym", "เดียว 放在量词后，强调只有一个。", "单个"],
  ["thang-mot", "ทั้งหมด", "thang mot", "全部；总共", "短语", "数量搭配", "ค่าโดยสารทั้งหมดหนึ่งร้อยบาท", "khaa dooi-saan thang mot neung raawy baat", "车费总共一百泰铢。", "บางส่วน", "baang suan", "部分", "antonym", "ทั้งหมด 表示全部或总数。", "总共"],
  ["ruam", "รวม", "ruam", "合计；包括", "短语", "数量搭配", "รวมแล้วเรามีขนมสิบชิ้น", "ruam laaeo rao mii kha-nom sip chin", "合计我们有十块点心。", "แยก", "yaaek", "分开", "antonym", "รวม 是合在一起计算。", "合计"],
  ["bpra-maan", "ประมาณ", "bpra-maan", "大约；左右", "短语", "数量搭配", "จากบ้านถึงตลาดประมาณสองกิโลเมตร", "jaak baan theung dta-laat bpra-maan saawng gi-loo-met", "从家到市场大约两公里。", "พอดี", "phaaw-dii", "正好", "confusable", "ประมาณ 是估计；พอดี 是正好。", "大约"],
  ["goen-bpai", "เกินไป", "goen bpai", "过多；过度", "短语", "数量搭配", "น้ำตาลสามช้อนโต๊ะมากเกินไปสำหรับแก้วนี้", "naam-dtaan saam chaawn dto maak goen bpai sam-rap gaaeow nii", "三汤匙糖对这杯来说太多了。", "พอดี", "phaaw-dii", "刚好", "antonym", "เกินไป 表示超过合适程度。", "太多"],
  ["phaaw-dii", "พอดี", "phaaw-dii", "正好；刚好", "短语", "数量搭配", "ข้าวสองจานพอดีสำหรับพวกเรา", "khaao saawng jaan phaaw-dii sam-rap phuak rao", "两盘饭对我们来说刚好。", "เกินไป", "goen bpai", "过多", "antonym", "พอดี 表示数量或程度正合适。", "刚好"],
  ["mai-phaaw", "ไม่พอ", "mai phaaw", "不够", "短语", "数量搭配", "น้ำสามขวดไม่พอสำหรับสิบคน", "naam saam khuat mai phaaw sam-rap sip khon", "三瓶水不够十个人喝。", "พอ", "phaaw", "够", "antonym", "ไม่พอ 表示数量不足。", "不够"],
  ["phaaw", "พอ", "phaaw", "够；足够", "短语", "数量搭配", "เก้าอี้สิบตัวพอสำหรับนักเรียนทุกคน", "gao-ii sip dtua phaaw sam-rap nak-riian thuk khon", "十把椅子够所有学生坐。", "ไม่พอ", "mai phaaw", "不够", "antonym", "พอ 表示够用。", "够"],
  ["phoem-iik", "เพิ่มอีก", "phoem iik", "再增加", "短语", "数量搭配", "ขอเพิ่มน้ำแข็งอีกสองก้อน", "khaaw phoem naam-khaeng iik saawng gaawn", "请再加两块冰。", "ลดลง", "lot long", "减少", "antonym", "เพิ่มอีก 表示在原有数量上加。", "再加"],
  ["lot-long", "ลดลง", "lot long", "减少；下降", "短语", "数量搭配", "เดือนนี้ค่าไฟลดลงหนึ่งร้อยบาท", "duean nii khaa fai lot long neung raawy baat", "这个月电费减少了一百泰铢。", "เพิ่มขึ้น", "phoem kheun", "增加", "antonym", "ลดลง 是数量变少。", "减少"],
  ["phoem-kheun", "เพิ่มขึ้น", "phoem kheun", "增加；上升", "短语", "数量搭配", "ราคาข้าวกล่องเพิ่มขึ้นห้าบาท", "raa-khaa khaao-glaawng phoem kheun haa baat", "盒饭价格上涨了五泰铢。", "ลดลง", "lot long", "减少", "antonym", "เพิ่มขึ้น 是数量变多。", "增加"],
  ["khrueng", "ครึ่ง", "khreung", "半；一半", "量词", "数量搭配", "ขอน้ำแข็งครึ่งแก้วพอค่ะ", "khaaw naam-khaeng khreung gaaeow phaaw kha", "请给半杯冰就够了。", "เต็ม", "dtem", "满；完整", "antonym", "ครึ่ง 是一半；เต็ม 是满。", "半"],
  ["dtem", "เต็ม", "dtem", "满；完整", "短语", "数量搭配", "รถเมล์เต็มแล้ว เราต้องรอคันต่อไป", "rot-mee dtem laaeo rao dtawng raaw khan dtaaw bpai", "公交已经满了，我们得等下一辆。", "ครึ่ง", "khreung", "半", "antonym", "เต็ม 表示满员或装满。", "满"],
  ["plao", "เปล่า", "bplaao", "空的；没有装东西", "短语", "数量搭配", "ขวดนี้เปล่า ไม่มีน้ำข้างใน", "khuat nii bplaao mai mii naam khaang nai", "这个瓶子是空的，里面没有水。", "เต็ม", "dtem", "满", "antonym", "เปล่า 可表示空，不含东西。", "空"],
  ["yen-neung-gaaeow", "เย็นหนึ่งแก้ว", "yen neung gaaeow", "一杯冰饮", "短语", "容器", "ขอกาแฟเย็นหนึ่งแก้วกลับบ้านค่ะ", "khaaw gaa-faae yen neung gaaeow glap baan kha", "请给我一杯冰咖啡带走。", "ร้อนหนึ่งแก้ว", "raawn neung gaaeow", "一杯热饮", "antonym", "点饮料时可把冷热和数量放在一起。", "点饮料"],
  ["khaao-neung-jaan", "ข้าวหนึ่งจาน", "khaao neung jaan", "一盘饭", "短语", "容器", "ผมสั่งข้าวผัดหนึ่งจานและน้ำหนึ่งขวด", "phom sang khaao-phat neung jaan lae naam neung khuat", "我点了一盘炒饭和一瓶水。", "ก๋วยเตี๋ยวหนึ่งชาม", "guai-dtiaao neung chaam", "一碗面", "confusable", "饭常用จาน，汤面常用ชาม。", "一盘"],
  ["guai-dtiaao-neung-chaam", "ก๋วยเตี๋ยวหนึ่งชาม", "guai-dtiaao neung chaam", "一碗面", "短语", "容器", "น้องกินก๋วยเตี๋ยวหนึ่งชามก่อนกลับบ้าน", "naawng gin guai-dtiaao neung chaam gaawn glap baan", "弟弟回家前吃了一碗面。", "ข้าวหนึ่งจาน", "khaao neung jaan", "一盘饭", "confusable", "ชาม 常用于面汤类。", "一碗"],
  ["naam-neung-khuat", "น้ำหนึ่งขวด", "naam neung khuat", "一瓶水", "短语", "容器", "ซื้อให้น้ำหนึ่งขวดที่ร้านสะดวกซื้อ", "sue hai naam neung khuat thii raan sa-duak sue", "请在便利店买一瓶水。", "น้ำหนึ่งแก้ว", "naam neung gaaeow", "一杯水", "confusable", "ขวด 是瓶装；แก้ว 是杯装。", "一瓶"],
  ["naam-neung-gaaeow", "น้ำหนึ่งแก้ว", "naam neung gaaeow", "一杯水", "短语", "容器", "หลังเดินไกล เขาดื่มน้ำหนึ่งแก้ว", "lang doen glai khao deum naam neung gaaeow", "走了很远后，他喝了一杯水。", "น้ำหนึ่งขวด", "naam neung khuat", "一瓶水", "confusable", "แก้ว 是杯，不一定有瓶子。", "一杯"],
  ["khai-neung-fong", "ไข่หนึ่งฟอง", "khai neung faawng", "一个鸡蛋", "短语", "分类词", "อาหารเช้านี้มีไข่หนึ่งฟองกับขนมปัง", "aa-haan chaao nii mii khai neung faawng gap kha-nom-bpang", "这顿早餐有一个鸡蛋和面包。", "ไข่หนึ่งโหล", "khai neung lo", "一打鸡蛋", "confusable", "ฟอง 数单个蛋；โหล 是十二个。", "鸡蛋"],
  ["faawng", "ฟอง", "faawng", "蛋、泡泡等量词", "量词", "分类词", "เด็กเห็นฟองสบู่หลายฟองในสวน", "dek hen faawng sa-buu laai faawng nai suan", "孩子在花园里看到很多肥皂泡。", "ลูก", "luuk", "球形物量词", "confusable", "ฟอง 用于蛋和泡泡；ลูก 用于水果、球等。", "枚"],
  ["dok", "ดอก", "daawk", "花、钥匙等量词", "量词", "分类词", "พ่อซื้อดอกไม้สามดอกให้แม่", "phaaw sue daawk-maai saam daawk hai maae", "爸爸给妈妈买了三朵花。", "ต้น", "dton", "株；棵", "confusable", "ดอก 数花朵；ต้น 数植物整株。", "朵"],
  ["dton", "ต้น", "dton", "棵；株；ต้น类量词", "量词", "分类词", "หน้าบ้านมีต้นไม้สองต้น", "naa baan mii dton-maai saawng dton", "家门前有两棵树。", "ดอก", "daawk", "花朵量词", "confusable", "ต้น 是整株植物；ดอก 是花朵。", "棵"],
  ["huua", "หัว", "hua", "头、颗；蒜头等量词", "量词", "分类词", "แม่ซื้อกระเทียมสามหัวสำหรับทำกับข้าว", "maae sue gra-thiiam saam hua sam-rap tham gap-khaao", "妈妈买了三头蒜做菜。", "กลีบ", "gliip", "瓣", "confusable", "หัว 是整头；กลีบ 是一瓣。", "头"],
  ["gliip", "กลีบ", "gliip", "瓣；花瓣/蒜瓣量词", "量词", "分类词", "ใส่กระเทียมสองกลีบในผัดผัก", "sai gra-thiiam saawng gliip nai phat phak", "炒菜里放两瓣蒜。", "หัว", "hua", "头；整颗", "confusable", "กลีบ 是瓣，比หัว小。", "瓣"],
  ["khaa", "คู่ละ", "khuu la", "每双……", "短语", "买东西数量", "รองเท้าคู่ละสองร้อยบาท", "raawng-thaao khuu la saawng raawy baat", "鞋每双二百泰铢。", "ข้างละ", "khaang la", "每边/每只", "confusable", "คู่ละ 是每双价格；ข้างละ 是每只或每边。", "每双"],
  ["thang-khuu", "ทั้งคู่", "thang khuu", "两者都；一双都", "短语", "数量搭配", "รองเท้าทั้งคู่เปียกฝน", "raawng-thaao thang khuu bpiiak fon", "这双鞋两只都被雨淋湿了。", "ข้างเดียว", "khaang diao", "一只；一边", "antonym", "ทั้งคู่ 表示两个都包括。", "两者都"],
  ["thang-saam", "ทั้งสาม", "thang saam", "三个都", "短语", "数量搭配", "เด็กทั้งสามคนกลับบ้านพร้อมกัน", "dek thang saam khon glap baan phraawm gan", "三个孩子一起回家。", "หนึ่งในสาม", "neung nai saam", "三分之一；三个中的一个", "confusable", "ทั้งสาม 是三个都；หนึ่งในสาม 是其中一个或三分之一。", "三个都"],
  ["neung-nai-saam", "หนึ่งในสาม", "neung nai saam", "三分之一；三个中的一个", "短语", "数量搭配", "หนึ่งในสามคนนี้เป็นเพื่อนของฉัน", "neung nai saam khon nii bpen phuean khaawng chan", "这三个人中的一个是我的朋友。", "ทั้งสาม", "thang saam", "三个都", "confusable", "หนึ่งในสาม 只取其中一份或一个。", "三分之一"],
  ["song-sam", "สองสาม", "saawng saam", "两三个；几个", "短语", "数量搭配", "รออีกสองสามนาที รถอาจมาถึง", "raaw iik saawng saam naa-thii rot aat maa theung", "再等两三分钟，车可能会到。", "หลาย", "laai", "许多；好几个", "confusable", "สองสาม 数量较少；หลาย 数量感更多。", "两三"],
  ["laai", "หลาย", "laai", "许多；好几个", "短语", "数量搭配", "วันนี้มีนักท่องเที่ยวหลายคนที่สถานี", "wan-nii mii nak-thaawng-thiao laai khon thii sa-thaa-nii", "今天车站有很多游客。", "สองสาม", "saawng saam", "两三个", "confusable", "หลาย 比สองสาม 更不确定且数量更多。", "许多"],
  ["thuk", "ทุก", "thuk", "每；全部每一个", "短语", "数量搭配", "รถไฟฟ้ามาทุกห้านาทีในตอนเช้า", "rot-fai-faa maa thuk haa naa-thii nai dtaawn chaao", "早上轻轨每五分钟来一班。", "บาง", "baang", "有些", "antonym", "ทุก 表示每一个；บาง 表示一部分。", "每"],
  ["baang", "บาง", "baang", "有些；某些", "短语", "数量搭配", "บางร้านรับเงินสดเท่านั้น", "baang raan rap ngoen-sot thao-nan", "有些店只收现金。", "ทุก", "thuk", "每；全部", "antonym", "บาง 表示部分，不是全部。", "有些"],
  ["khraaeng-la", "ครั้งละ", "khrang la", "每次……", "短语", "时间次数", "กินยาครั้งละหนึ่งเม็ดหลังอาหาร", "gin yaa khrang la neung met lang aa-haan", "每次饭后吃一粒药。", "วันละ", "wan la", "每天……", "confusable", "ครั้งละ 是每次剂量；วันละ 是每天次数或数量。", "每次"],
  ["wan-la", "วันละ", "wan la", "每天……", "短语", "时间次数", "เขาอ่านภาษาไทยวันละสามสิบนาที", "khao aan phaa-saa thai wan la saam-sip naa-thii", "他每天读三十分钟泰语。", "ครั้งละ", "khrang la", "每次……", "confusable", "วันละ 按天；ครั้งละ 按次。", "每天"],
  ["athiit-la", "อาทิตย์ละ", "aa-thit la", "每周……", "短语", "时间次数", "ครูให้สอบคำศัพท์อาทิตย์ละครั้ง", "khruu hai saawp kham-sap aa-thit la khrang", "老师每周考一次词汇。", "เดือนละ", "duean la", "每月……", "confusable", "อาทิตย์ละ 是每周；เดือนละ 是每月。", "每周"],
  ["deuan-la", "เดือนละ", "duean la", "每月……", "短语", "时间次数", "ค่าเช่าห้องเดือนละห้าพันบาท", "khaa-chao haawng duean la haa phan baat", "房租每月五千泰铢。", "อาทิตย์ละ", "aa-thit la", "每周", "confusable", "เดือนละ 按月计算。", "每月"],
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
    level: "a2",
    priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [example], synonyms, antonyms, comparisons: [comparison], collocations, tags: [row[5], row[14]] }],
    synonyms,
    antonyms,
    comparisons: [comparison],
    collocations,
    tags: [row[5], row[14], "A2基础"],
    sourceRefs: MEASURE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_MEASURE_CLASSIFIERS_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
