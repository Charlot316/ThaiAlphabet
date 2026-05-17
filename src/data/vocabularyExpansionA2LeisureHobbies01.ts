export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "兴趣" | "娱乐" | "运动" | "音乐电影" | "游戏" | "周末活动" | "约朋友" | "放松休闲";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";
export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };

type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme, string, string, string];

const LEISURE_REFS = ["worker-a-a2-leisure-hobbies", "basic-thai-leisure"];

const rows: Row[] = [
  ["khwaam-sa-nai", "ความสนใจ", "khwaam son-jai", "兴趣；关注点", "名词", "兴趣", "วันหยุดฉันชอบคุยเรื่องความสนใจกับเพื่อน", "wan-yut chan chaawp khui rueang khwaam son-jai gap phuean", "周末我喜欢和朋友聊兴趣。"],
  ["ngaan-a-di-reek", "งานอดิเรก", "ngaan a-di-reek", "爱好；业余兴趣", "名词", "兴趣", "งานอดิเรกของฉันคืออ่านหนังสือและฟังเพลง", "ngaan a-di-reek khaawng chan khue aan nang-sue lae fang phleeng", "我的爱好是看书和听歌。"],
  ["chaawp", "ชอบ", "chaawp", "喜欢", "动词", "兴趣", "ฉันชอบเล่นกีฬาเบา ๆ หลังเลิกเรียน", "chan chaawp len gii-laa bao bao lang loek riian", "我喜欢放学后做轻松的运动。"],
  ["mai-chaawp", "ไม่ชอบ", "mai chaawp", "不喜欢", "短语", "兴趣", "เขาไม่ชอบเกมที่เสียงดังเกินไป", "khao mai chaawp geem thii siiang dang goen bpai", "他不喜欢声音太大的游戏。"],
  ["son-jai", "สนใจ", "son-jai", "感兴趣；关注", "动词", "兴趣", "น้องสนใจดนตรีไทยตั้งแต่เด็ก", "naawng son-jai don-dtrii thai dtang-dtaae dek", "弟弟从小就对泰国音乐感兴趣。"],
  ["mai-son-jai", "ไม่สนใจ", "mai son-jai", "不感兴趣；不关注", "短语", "兴趣", "ฉันไม่สนใจเกมนี้เพราะเล่นยาก", "chan mai son-jai geem nii phraw len yaak", "我对这个游戏不感兴趣，因为很难玩。"],
  ["sa-nuk", "สนุก", "sa-nuk", "有趣；好玩", "形容词", "娱乐", "หนังเรื่องนี้สนุกและเข้าใจง่าย", "nang rueang nii sa-nuk lae khao-jai ngaai", "这部电影有趣，也容易看懂。"],
  ["mai-sa-nuk", "ไม่สนุก", "mai sa-nuk", "不好玩；没意思", "短语", "娱乐", "เกมนี้ไม่สนุกถ้าเล่นคนเดียว", "geem nii mai sa-nuk thaa len khon diao", "这个游戏一个人玩不好玩。"],
  ["phak-phaawn", "พักผ่อน", "phak phaawn", "休息；放松", "动词", "放松休闲", "วันอาทิตย์ฉันพักผ่อนที่บ้านกับครอบครัว", "wan aa-thit chan phak-phaawn thii baan gap khraawp-khrua", "星期天我在家和家人休息放松。"],
  ["phaawn-khlaai", "ผ่อนคลาย", "phaawn khlaai", "放松；缓解紧张", "动词", "放松休闲", "ฟังเพลงเบา ๆ ช่วยให้ฉันผ่อนคลาย", "fang phleeng bao bao chuai hai chan phaawn-khlaai", "听轻音乐能让我放松。"],
  ["wang", "ว่าง", "waang", "有空；空闲", "形容词", "约朋友", "เย็นนี้คุณว่างไปเดินเล่นไหม", "yen nii khun waang bpai doen len mai", "今天傍晚你有空去散步吗？"],
  ["mai-wang", "ไม่ว่าง", "mai waang", "没空", "短语", "约朋友", "วันนี้ฉันไม่ว่างเพราะต้องช่วยแม่", "wan-nii chan mai waang phraw dtawng chuai maae", "今天我没空，因为要帮妈妈。"],
  ["nat-phuean", "นัดเพื่อน", "nat phuean", "约朋友", "动词", "约朋友", "ฉันนัดเพื่อนไปดูหนังวันเสาร์", "chan nat phuean bpai duu nang wan sao", "我约朋友星期六去看电影。"],
  ["nat-gan", "นัดกัน", "nat gan", "互相约好；约定", "动词", "约朋友", "เรานัดกันที่ร้านกาแฟตอนบ่ายสาม", "rao nat gan thii raan gaa-faae dtaawn baai saam", "我们约好下午三点在咖啡店见。"],
  ["chuan", "ชวน", "chuan", "邀请；约", "动词", "约朋友", "เธอชวนฉันไปเล่นแบดมินตันหลังเลิกงาน", "thoe chuan chan bpai len baet-min-dtan lang loek ngaan", "她约我下班后去打羽毛球。"],
  ["bpai-duai-gan", "ไปด้วยกัน", "bpai duai gan", "一起去", "短语", "约朋友", "ถ้าคุณว่าง เราไปด้วยกันได้ไหม", "thaa khun waang rao bpai duai gan dai mai", "如果你有空，我们可以一起去吗？"],
  ["jer-gan", "เจอกัน", "joe gan", "见面；相见", "动词", "约朋友", "พรุ่งนี้เราเจอกันหน้าสถานีได้ไหม", "phrung-nii rao joe gan naa sa-thaa-nii dai mai", "明天我们能在车站前见面吗？"],
  ["bpai-thiao", "ไปเที่ยว", "bpai thiao", "去玩；去旅行", "动词", "周末活动", "วันหยุดพวกเราไปเที่ยวสวนสาธารณะ", "wan-yut phuak rao bpai thiao suan saa-thaa-ra-na", "假日我们去公园玩。"],
  ["doen-len", "เดินเล่น", "doen len", "散步；闲逛", "动词", "周末活动", "ตอนเย็นฉันเดินเล่นกับพ่อที่ริมแม่น้ำ", "dtaawn yen chan doen len gap phaaw thii rim maae-naam", "傍晚我和爸爸在河边散步。"],
  ["bpai-suan", "ไปสวน", "bpai suan", "去公园/花园", "短语", "周末活动", "เด็ก ๆ อยากไปสวนหลังทำการบ้านเสร็จ", "dek dek yaak bpai suan lang tham gaan-baan set", "孩子们做完作业后想去公园。"],
  ["bpai-talaat", "ไปตลาด", "bpai dta-laat", "去市场；逛市场", "短语", "周末活动", "เช้าวันเสาร์ฉันไปตลาดกับคุณยาย", "chaao wan sao chan bpai dta-laat gap khun-yaai", "星期六早上我和外婆去市场。"],
  ["dern-haang", "เดินห้าง", "doen haang", "逛商场", "动词", "周末活动", "วันอาทิตย์เพื่อนชวนฉันไปเดินห้าง", "wan aa-thit phuean chuan chan bpai doen haang", "星期天朋友约我去逛商场。"],
  ["thin-laep", "ปิกนิก", "bpik-nik", "野餐", "名词", "周末活动", "ครอบครัวเราจะไปปิกนิกที่สวนวันหยุด", "khraawp-khrua rao ja bpai bpik-nik thii suan wan-yut", "我们家假日要去公园野餐。"],
  ["thai-ruup", "ถ่ายรูป", "thaai ruup", "拍照", "动词", "娱乐", "เธอชอบถ่ายรูปอาหารก่อนกิน", "thoe chaawp thaai ruup aa-haan gaawn gin", "她喜欢吃饭前给食物拍照。"],
  ["duu-ruup", "ดูรูป", "duu ruup", "看照片", "动词", "娱乐", "หลังเที่ยวทะเล เราดูรูปด้วยกันที่บ้าน", "lang thiao tha-lee rao duu ruup duai gan thii baan", "海边旅行后，我们在家一起看照片。"],
  ["aan-nang-sue", "อ่านหนังสือ", "aan nang-sue", "看书；读书", "动词", "兴趣", "ก่อนนอนฉันอ่านหนังสือไทยง่าย ๆ", "gaawn naawn chan aan nang-sue thai ngaai ngaai", "睡前我读简单的泰语书。"],
  ["nang-sue", "หนังสือ", "nang-sue", "书", "名词", "兴趣", "หนังสือเล่มนี้เหมาะกับคนเริ่มเรียนไทย", "nang-sue lem nii maw gap khon roem riian thai", "这本书适合刚开始学泰语的人。"],
  ["nithaan", "นิทาน", "ni-thaan", "故事；童话", "名词", "兴趣", "คุณแม่อ่านนิทานให้ลูกฟังก่อนนอน", "khun-maae aan ni-thaan hai luuk fang gaawn naawn", "妈妈睡前给孩子读故事。"],
  ["waat-ruup", "วาดรูป", "waat ruup", "画画", "动词", "兴趣", "น้องชอบวาดรูปสัตว์ในสมุด", "naawng chaawp waat ruup sat nai sa-mut", "弟弟喜欢在本子里画动物。"],
  ["phaa-raai-sii", "ระบายสี", "ra-baai sii", "涂色；上色", "动词", "兴趣", "เด็ก ๆ ระบายสีรูปดอกไม้ในห้องเรียน", "dek dek ra-baai sii ruup daawk-maai nai haawng-riian", "孩子们在教室里给花的图画涂色。"],
  ["tham-ngaan-fii-mue", "ทำงานฝีมือ", "tham ngaan fii-mue", "做手工", "动词", "兴趣", "วันหยุดเธอทำงานฝีมือกับน้องสาว", "wan-yut thoe tham ngaan fii-mue gap naawng-saao", "假日她和妹妹做手工。"],
  ["tham-aa-haan", "ทำอาหาร", "tham aa-haan", "做饭；烹饪", "动词", "兴趣", "เขาชอบทำอาหารไทยง่าย ๆ ตอนเย็น", "khao chaawp tham aa-haan thai ngaai ngaai dtaawn yen", "他喜欢傍晚做简单的泰国菜。"],
  ["tham-kha-nom", "ทำขนม", "tham kha-nom", "做点心；做甜品", "动词", "兴趣", "แม่สอนฉันทำขนมในวันเสาร์", "maae saawn chan tham kha-nom nai wan sao", "妈妈星期六教我做点心。"],
  ["pluuk-dton-maai", "ปลูกต้นไม้", "bpluuk dton-maai", "种植物；种树", "动词", "兴趣", "คุณตาชอบปลูกต้นไม้หลังบ้าน", "khun-dtaa chaawp bpluuk dton-maai lang baan", "外公喜欢在屋后种植物。"],
  ["duu-laae-sat-liiang", "ดูแลสัตว์เลี้ยง", "duu laae sat liiang", "照顾宠物", "动词", "兴趣", "น้องดูแลสัตว์เลี้ยงทุกเช้าก่อนไปเรียน", "naawng duu laae sat liiang thuk chaao gaawn bpai riian", "弟弟每天上学前照顾宠物。"],
  ["liiang-maaeo", "เลี้ยงแมว", "liiang maaeo", "养猫", "动词", "兴趣", "เพื่อนของฉันเลี้ยงแมวสีขาวหนึ่งตัว", "phuean khaawng chan liiang maaeo sii khaao neung dtua", "我的朋友养了一只白猫。"],
  ["liiang-maa", "เลี้ยงหมา", "liiang maa", "养狗", "动词", "兴趣", "บ้านข้าง ๆ เลี้ยงหมาน่ารักสองตัว", "baan khaang khaang liiang maa naa-rak saawng dtua", "隔壁家养了两只可爱的狗。"],
  ["len-gii-laa", "เล่นกีฬา", "len gii-laa", "运动；做体育", "动词", "运动", "หลังเลิกเรียนเด็ก ๆ เล่นกีฬาที่สนาม", "lang loek riian dek dek len gii-laa thii sa-naam", "放学后孩子们在操场运动。"],
  ["gii-laa", "กีฬา", "gii-laa", "运动；体育", "名词", "运动", "กีฬาโปรดของพ่อคือฟุตบอล", "gii-laa bproot khaawng phaaw khue foot-baawn", "爸爸最喜欢的运动是足球。"],
  ["wing", "วิ่ง", "wing", "跑步", "动词", "运动", "ตอนเช้าฉันวิ่งรอบสวนสามรอบ", "dtaawn chaao chan wing raawp suan saam raawp", "早上我绕公园跑三圈。"],
  ["doen-awk-gam-lang", "เดินออกกำลังกาย", "doen aawk-gam-lang", "走路锻炼", "动词", "运动", "คุณยายเดินออกกำลังกายทุกเย็น", "khun-yaai doen aawk-gam-lang thuk yen", "外婆每天傍晚走路锻炼。"],
  ["waai-naam", "ว่ายน้ำ", "waai naam", "游泳", "动词", "运动", "วันหยุดเด็ก ๆ ไปว่ายน้ำกับพ่อ", "wan-yut dek dek bpai waai naam gap phaaw", "假日孩子们和爸爸去游泳。"],
  ["khi jak-gra-yaan", "ขี่จักรยาน", "khii jak-gra-yaan", "骑自行车", "动词", "运动", "เขาขี่จักรยานไปสวนสาธารณะ", "khao khii jak-gra-yaan bpai suan saa-thaa-ra-na", "他骑自行车去公园。"],
  ["yoo-kha", "โยคะ", "yoo-kha", "瑜伽", "名词", "运动", "แม่เล่นโยคะที่บ้านสามครั้งต่ออาทิตย์", "maae len yoo-kha thii baan saam khrang dtaaw aa-thit", "妈妈每周在家练三次瑜伽。"],
  ["foot-baawn", "ฟุตบอล", "foot-baawn", "足球", "名词", "运动", "เด็กผู้ชายเล่นฟุตบอลหลังเลิกเรียน", "dek phuu-chaai len foot-baawn lang loek riian", "男孩子们放学后踢足球。"],
  ["baet-min-dtan", "แบดมินตัน", "baet-min-dtan", "羽毛球", "名词", "运动", "เรานัดกันเล่นแบดมินตันวันเสาร์", "rao nat gan len baet-min-dtan wan sao", "我们约好星期六打羽毛球。"],
  ["bas-get-baawn", "บาสเกตบอล", "baas-get-baawn", "篮球", "名词", "运动", "พี่ชายชอบเล่นบาสเกตบอลกับเพื่อน", "phii-chaai chaawp len baas-get-baawn gap phuean", "哥哥喜欢和朋友打篮球。"],
  ["bping-bpaawng", "ปิงปอง", "bping-bpaawng", "乒乓球", "名词", "运动", "ปิงปองเป็นกีฬาที่เล่นในบ้านได้", "bping-bpaawng bpen gii-laa thii len nai baan dai", "乒乓球是可以在室内玩的运动。"],
  ["dtak-graaw", "ตะกร้อ", "dta-graaw", "藤球", "名词", "运动", "นักเรียนไทยหลายคนเล่นตะกร้อเก่ง", "nak-riian thai laai khon len dta-graaw geng", "很多泰国学生藤球踢得很好。"],
  ["fang-phleeng", "ฟังเพลง", "fang phleeng", "听歌；听音乐", "动词", "音乐电影", "ฉันฟังเพลงไทยระหว่างเดินทาง", "chan fang phleeng thai ra-waang doen-thaang", "我出行路上听泰语歌。"],
  ["phleeng", "เพลง", "phleeng", "歌曲；音乐", "名词", "音乐电影", "เพลงนี้ฟังง่ายและคำไม่ยาก", "phleeng nii fang ngaai lae kham mai yaak", "这首歌容易听，词也不难。"],
  ["raawng-phleeng", "ร้องเพลง", "raawng phleeng", "唱歌", "动词", "音乐电影", "เด็ก ๆ ร้องเพลงวันเกิดให้คุณแม่", "dek dek raawng phleeng wan-goet hai khun-maae", "孩子们给妈妈唱生日歌。"],
  ["len-don-dtrii", "เล่นดนตรี", "len don-dtrii", "演奏音乐；玩乐器", "动词", "音乐电影", "พี่สาวเล่นดนตรีในงานโรงเรียน", "phii-saao len don-dtrii nai ngaan roong-riian", "姐姐在学校活动中演奏音乐。"],
  ["don-dtrii", "ดนตรี", "don-dtrii", "音乐", "名词", "音乐电影", "ดนตรีเบา ๆ ทำให้ฉันผ่อนคลาย", "don-dtrii bao bao tham hai chan phaawn-khlaai", "轻音乐让我放松。"],
  ["gii-dtaa", "กีตาร์", "gii-dtaa", "吉他", "名词", "音乐电影", "เขาฝึกเล่นกีตาร์ทุกคืน", "khao feuk len gii-dtaa thuk khuen", "他每天晚上练吉他。"],
  ["bpia-noo", "เปียโน", "bpia-noo", "钢琴", "名词", "音乐电影", "น้องเรียนเปียโนสัปดาห์ละครั้ง", "naawng riian bpia-noo sap-daa la khrang", "弟弟每周学一次钢琴。"],
  ["duu-nang", "ดูหนัง", "duu nang", "看电影", "动词", "音乐电影", "คืนวันศุกร์เราดูหนังที่บ้าน", "khuen wan suk rao duu nang thii baan", "星期五晚上我们在家看电影。"],
  ["nang", "หนัง", "nang", "电影；皮革", "名词", "音乐电影", "หนังเรื่องนี้เหมาะกับเด็กและครอบครัว", "nang rueang nii maw gap dek lae khraawp-khrua", "这部电影适合孩子和家庭。"],
  ["roong-nang", "โรงหนัง", "roong nang", "电影院", "名词", "音乐电影", "โรงหนังใกล้บ้านมีหนังใหม่ทุกอาทิตย์", "roong nang glai baan mii nang mai thuk aa-thit", "家附近的电影院每周都有新电影。"],
  ["dui-sii-rii", "ดูซีรีส์", "duu sii-rii", "看剧；看连续剧", "动词", "音乐电影", "วันหยุดฉันดูซีรีส์ไทยกับเพื่อน", "wan-yut chan duu sii-rii thai gap phuean", "假日我和朋友看泰剧。"],
  ["la-khaawn", "ละคร", "la-khaawn", "电视剧；戏剧", "名词", "音乐电影", "คุณยายชอบดูละครตอนเย็น", "khun-yaai chaawp duu la-khaawn dtaawn yen", "外婆喜欢傍晚看电视剧。"],
  ["raaai-gaan-thii-wii", "รายการทีวี", "raaai-gaan thii-wii", "电视节目", "名词", "娱乐", "รายการทีวีนี้สอนทำอาหารง่าย ๆ", "raaai-gaan thii-wii nii saawn tham aa-haan ngaai ngaai", "这个电视节目教做简单的饭菜。"],
  ["duu-thii-wii", "ดูทีวี", "duu thii-wii", "看电视", "动词", "娱乐", "หลังอาหารเย็นพ่อดูทีวีกับลูก", "lang aa-haan yen phaaw duu thii-wii gap luuk", "晚饭后爸爸和孩子看电视。"],
  ["duu-yuu-thuup", "ดูยูทูบ", "duu yuu-thuup", "看视频平台", "动词", "娱乐", "ฉันดูยูทูบเพื่อฝึกฟังภาษาไทยง่าย ๆ", "chan duu yuu-thuup phuea feuk fang phaa-saa thai ngaai ngaai", "我看视频平台来练习听简单泰语。"],
  ["len-geem", "เล่นเกม", "len geem", "玩游戏", "动词", "游戏", "น้องเล่นเกมหลังทำการบ้านเสร็จ", "naawng len geem lang tham gaan-baan set", "弟弟做完作业后玩游戏。"],
  ["geem", "เกม", "geem", "游戏", "名词", "游戏", "เกมนี้เล่นง่ายแต่ต้องคิดเร็ว", "geem nii len ngaai dtaae dtawng khit reo", "这个游戏容易玩，但要反应快。"],
  ["geem-gra-daan", "เกมกระดาน", "geem gra-daan", "桌游；棋盘游戏", "名词", "游戏", "ครอบครัวเราเล่นเกมกระดานคืนวันเสาร์", "khraawp-khrua rao len geem gra-daan khuen wan sao", "我们家星期六晚上玩桌游。"],
  ["geem-mue-thue", "เกมมือถือ", "geem mue-theu", "手机游戏", "名词", "游戏", "เด็กไม่ควรเล่นเกมมือถือก่อนนอนนานเกินไป", "dek mai khuan len geem mue-theu gaawn naawn naan goen bpai", "孩子睡前不应该玩手机游戏太久。"],
  ["len-kaat", "เล่นไพ่", "len phai", "打牌", "动词", "游戏", "ผู้ใหญ่เล่นไพ่กันเบา ๆ หลังอาหาร", "phuu-yai len phai gan bao bao lang aa-haan", "大人们饭后轻松地打牌。"],
  ["len-mak-ruk", "เล่นหมากรุก", "len maak-ruk", "下棋", "动词", "游戏", "คุณตาสอนฉันเล่นหมากรุกวันอาทิตย์", "khun-dtaa saawn chan len maak-ruk wan aa-thit", "外公星期天教我下棋。"],
  ["chan-khana", "ชนะ", "cha-na", "赢；获胜", "动词", "游戏", "วันนี้น้องชนะเกมกระดานเป็นครั้งแรก", "wan-nii naawng cha-na geem gra-daan bpen khrang raaek", "今天弟弟第一次赢了桌游。"],
  ["phaae", "แพ้", "phaae", "输", "动词", "游戏", "ถึงจะแพ้ เขาก็ยังสนุกกับเกม", "theung ja phaae khao gaaw yang sa-nuk gap geem", "虽然输了，他还是玩得很开心。"],
  ["khanaen", "คะแนน", "kha-naaen", "分数", "名词", "游戏", "ทีมของเรามีคะแนนมากกว่าทีมเพื่อน", "thiim khaawng rao mii kha-naaen maak gwaa thiim phuean", "我们队的分数比朋友队高。"],
  ["thiim", "ทีม", "thiim", "队；团队", "名词", "运动", "เกมนี้ต้องเล่นเป็นทีมสี่คน", "geem nii dtawng len bpen thiim sii khon", "这个游戏要四个人一队玩。"],
  ["khon-diao", "คนเดียว", "khon diao", "一个人；独自", "短语", "放松休闲", "บางครั้งฉันอยากพักผ่อนคนเดียวที่บ้าน", "baang khrang chan yaak phak-phaawn khon diao thii baan", "有时候我想一个人在家休息。"],
  ["duai-gan", "ด้วยกัน", "duai gan", "一起", "副词", "约朋友", "เราอ่านหนังสือด้วยกันที่ห้องสมุด", "rao aan nang-sue duai gan thii haawng-sa-mut", "我们一起在图书馆看书。"],
  ["sa-baai-sa-baai", "สบาย ๆ", "sa-baai sa-baai", "轻松地；随意地", "副词", "放松休闲", "วันหยุดฉันอยากอยู่บ้านสบาย ๆ", "wan-yut chan yaak yuu baan sa-baai sa-baai", "假日我想在家轻松待着。"],
  ["ngiap-ngiap", "เงียบ ๆ", "ngiiap ngiiap", "安静地；静静地", "副词", "放松休闲", "ตอนเย็นเขาชอบอ่านหนังสือเงียบ ๆ", "dtaawn yen khao chaawp aan nang-sue ngiiap ngiiap", "傍晚他喜欢安静地看书。"],
  ["khruek-khrueun", "ครึกครื้น", "khreuk-khreun", "热闹；气氛活跃", "形容词", "娱乐", "งานดนตรีคืนนี้ครึกครื้นมาก", "ngaan don-dtrii kheun nii khreuk-khreun maak", "今晚的音乐活动很热闹。"],
  ["ngiap", "เงียบ", "ngiiap", "安静", "形容词", "放松休闲", "ร้านกาแฟนี้เงียบและเหมาะกับการอ่านหนังสือ", "raan gaa-faae nii ngiiap lae maw gap gaan aan nang-sue", "这家咖啡店安静，适合看书。"],
  ["neuuai", "เหนื่อย", "neuuai", "累", "形容词", "放松休闲", "หลังเล่นกีฬาเขาเหนื่อยแต่มีความสุข", "lang len gii-laa khao neuuai dtaae mii khwaam-suk", "运动后他很累，但很开心。"],
  ["mii-khwaam-suk", "มีความสุข", "mii khwaam-suk", "开心；幸福", "短语", "放松休闲", "ฉันมีความสุขเมื่อได้ทำงานอดิเรก", "chan mii khwaam-suk muea dai tham ngaan a-di-reek", "做爱好时我很开心。"],
  ["yaaek-wee-laa", "แบ่งเวลา", "baeng wee-laa", "分配时间", "动词", "兴趣", "เราควรแบ่งเวลาเรียนและพักผ่อนให้ดี", "rao khuan baeng wee-laa riian lae phak-phaawn hai dii", "我们应该好好分配学习和休息时间。"],
  ["mee-wee-laa-waang", "มีเวลาว่าง", "mii wee-laa waang", "有空闲时间", "短语", "放松休闲", "ถ้ามีเวลาว่าง ฉันจะอ่านนิทานไทย", "thaa mii wee-laa waang chan ja aan ni-thaan thai", "如果有空闲时间，我会读泰语故事。"],
  ["chai-wee-laa-waang", "ใช้เวลาว่าง", "chai wee-laa waang", "利用空闲时间", "短语", "兴趣", "เขาใช้เวลาว่างฝึกเล่นกีตาร์", "khao chai wee-laa waang feuk len gii-dtaa", "他利用空闲时间练吉他。"],
  ["long-tham", "ลองทำ", "laawng tham", "试着做", "动词", "兴趣", "ฉันอยากลองทำขนมไทยง่าย ๆ", "chan yaak laawng tham kha-nom thai ngaai ngaai", "我想试着做简单的泰国点心。"],
  ["feuk", "ฝึก", "feuk", "练习", "动词", "兴趣", "เขาฝึกร้องเพลงไทยวันละสิบห้านาที", "khao feuk raawng phleeng thai wan la sip-haa naa-thii", "他每天练习唱泰语歌十五分钟。"],
  ["rian-phiset", "เรียนพิเศษ", "riian phi-seet", "上补习课；学课外班", "动词", "兴趣", "วันเสาร์น้องเรียนพิเศษดนตรี", "wan sao naawng riian phi-seet don-dtrii", "星期六弟弟上音乐课外班。"],
  ["khruu-phiset", "ครูพิเศษ", "khruu phi-seet", "课外老师；私教", "名词", "兴趣", "ครูพิเศษสอนกีตาร์ให้ฉันที่บ้าน", "khruu phi-seet saawn gii-dtaa hai chan thii baan", "课外老师在家教我吉他。"],
  ["khlaas", "คลาส", "khlaat", "课程；班课", "名词", "兴趣", "คลาสโยคะเริ่มตอนหกโมงเย็น", "khlaat yoo-kha roem dtaawn hok moong yen", "瑜伽课晚上六点开始。"],
  ["bai-samak", "ใบสมัคร", "bai sa-mak", "报名表", "名词", "兴趣", "ฉันกรอกใบสมัครคลาสวาดรูป", "chan graawk bai sa-mak khlaat waat ruup", "我填写了绘画课报名表。"],
  ["sa-mak", "สมัคร", "sa-mak", "报名；申请加入", "动词", "兴趣", "เพื่อนชวนฉันสมัครเรียนว่ายน้ำ", "phuean chuan chan sa-mak riian waai naam", "朋友邀请我报名学游泳。"],
  ["klum", "กลุ่ม", "glum", "小组；群组", "名词", "约朋友", "เรามีกลุ่มอ่านหนังสือทุกวันพุธ", "rao mii glum aan nang-sue thuk wan phut", "我们每周三有读书小组。"],
  ["phuean-ruam-klum", "เพื่อนร่วมกลุ่ม", "phuean ruam glum", "同组朋友", "名词", "约朋友", "เพื่อนร่วมกลุ่มช่วยฉันฝึกพูดไทย", "phuean ruam glum chuai chan feuk phuut thai", "同组朋友帮我练习说泰语。"],
  ["tham-git-ja-gam", "ทำกิจกรรม", "tham git-ja-gam", "做活动；参加活动", "动词", "周末活动", "เด็ก ๆ ทำกิจกรรมที่โรงเรียนในวันหยุด", "dek dek tham git-ja-gam thii roong-riian nai wan-yut", "孩子们假日在学校参加活动。"],
  ["git-ja-gam", "กิจกรรม", "git-ja-gam", "活动", "名词", "周末活动", "กิจกรรมวันนี้สนุกและไม่ยาก", "git-ja-gam wan-nii sa-nuk lae mai yaak", "今天的活动有趣，也不难。"],
  ["ngaan-wat", "งานวัด", "ngaan wat", "寺庙集市；庙会", "名词", "娱乐", "คืนนี้ครอบครัวเราไปงานวัดใกล้บ้าน", "khuen nii khraawp-khrua rao bpai ngaan wat glai baan", "今晚我们家去家附近的庙会。"],
  ["laa-sut", "ล่าสุด", "laa sut", "最新的；最近的", "形容词", "娱乐", "คุณดูหนังเรื่องล่าสุดของนักแสดงคนนี้หรือยัง", "khun duu nang rueang laa sut khaawng nak-sa-daaeng khon nii rue yang", "你看过这位演员最新的电影了吗？"],
  ["bproot", "โปรด", "bproot", "最喜欢的；心爱的", "形容词", "兴趣", "เพลงโปรดของฉันเปิดในร้านกาแฟ", "phleeng bproot khaawng chan bpoet nai raan gaa-faae", "我最喜欢的歌在咖啡店里播放。"],
  ["bpen-phiset", "เป็นพิเศษ", "bpen phi-seet", "特别地；格外", "副词", "兴趣", "ฉันชอบหนังตลกเป็นพิเศษ", "chan chaawp nang dta-lok bpen phi-seet", "我特别喜欢喜剧电影。"],
  ["mai-khoei", "ไม่เคย", "mai khoei", "从未；没有过", "副词", "兴趣", "ฉันไม่เคยเล่นตะกร้อมาก่อน", "chan mai khoei len dta-graaw maa gaawn", "我以前从没玩过藤球。"],
  ["khoei", "เคย", "khoei", "曾经；有过经验", "副词", "兴趣", "เขาเคยเรียนเปียโนตอนเด็ก", "khao khoei riian bpia-noo dtaawn dek", "他小时候曾经学过钢琴。"],
  ["yang-len-yuu", "ยังเล่นอยู่", "yang len yuu", "还在玩；仍然继续玩", "短语", "游戏", "ถึงจะดึกแล้ว เด็ก ๆ ยังเล่นเกมอยู่", "theung ja deuk laaeo dek dek yang len geem yuu", "虽然已经晚了，孩子们还在玩游戏。"],
  ["yut-len", "หยุดเล่น", "yut len", "停止玩；不再玩", "动词", "游戏", "แม่บอกให้น้องหยุดเล่นเกมแล้วไปนอน", "maae baawk hai naawng yut len geem laaeo bpai naawn", "妈妈叫弟弟停止玩游戏去睡觉。"],
];

const relatedByTheme: Record<VocabularyExpansionTheme, VocabularyExpansionRelated> = {
  兴趣: { thai: "งานอดิเรก", roman: "ngaan a-di-reek", chinese: "爱好" },
  娱乐: { thai: "สนุก", roman: "sa-nuk", chinese: "有趣；好玩" },
  运动: { thai: "กีฬา", roman: "gii-laa", chinese: "运动" },
  音乐电影: { thai: "ฟังเพลง", roman: "fang phleeng", chinese: "听歌" },
  游戏: { thai: "เล่นเกม", roman: "len geem", chinese: "玩游戏" },
  周末活动: { thai: "วันหยุด", roman: "wan-yut", chinese: "假日" },
  约朋友: { thai: "นัดกัน", roman: "nat gan", chinese: "约好" },
  放松休闲: { thai: "พักผ่อน", roman: "phak phaawn", chinese: "休息放松" },
};

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];
  const comparison = { kind: "usage" as const, target: related, distinctionZh: `${row[1]} 属于“${row[5]}”场景；和 ${related.thai} 一起记，可以帮助区分兴趣、活动、邀请朋友和放松休闲的表达。` };
  const example = { thai: row[6], roman: row[7], chinese: row[8] };
  const collocations = [{ thai: row[1], roman: row[2], chinese: row[3] }, { thai: related.thai, roman: related.roman, chinese: related.chinese }];
  return {
    id: row[0],
    thai: row[1],
    roman: row[2],
    chinese: row[3],
    partOfSpeech: row[4],
    theme: row[5],
    level: "a2",
    priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [example], synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5]] }],
    synonyms: [],
    antonyms: [],
    comparisons: [comparison],
    collocations,
    tags: [row[5], "A2基础"],
    sourceRefs: LEISURE_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_LEISURE_HOBBIES_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
