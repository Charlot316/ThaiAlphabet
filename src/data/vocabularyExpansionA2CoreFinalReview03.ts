export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type CoreFinalReview03Theme =
  | "基础动作"
  | "出行确认"
  | "买卖付款"
  | "家务维修"
  | "学习消息"
  | "预约时间"
  | "身体休息"
  | "关系礼貌"
  | "问题处理"
  | "数量比较"
  | "位置环境"
  | "日常复盘";

export interface VocabularyExpansionExample {
  thai: string;
  roman: string;
  chinese: string;
}

export interface VocabularyExpansionSense {
  chinese: string;
  usageNotesZh: string;
  examples: VocabularyExpansionExample[];
}

export interface VocabularyExpansionCandidate {
  id: string;
  headword: string;
  romanization: string;
  level: VocabularyExpansionLevel;
  partOfSpeech: VocabularyExpansionPartOfSpeech;
  tags: string[];
  senses: VocabularyExpansionSense[];
  synonyms?: string[];
  antonyms?: string[];
  comparisons?: string[];
  collocations?: string[];
  sources: string[];
}

type Row = [
  id: string,
  thai: string,
  roman: string,
  chinese: string,
  partOfSpeech: VocabularyExpansionPartOfSpeech,
  theme: CoreFinalReview03Theme,
];

const CORE_FINAL_REVIEW_03_REFS = [
  "worker-a-a2-core-final-review-03",
  "basic-thai-final-review-gaps",
];

const rows: Row[] = [
  ["yok-khaawng-khuen-chan-bon", "ยกของขึ้นชั้นบน", "yok khaawng khuen chan bon", "把东西搬上楼", "动词", "基础动作"],
  ["yaai-to-ok-nit-nueng", "ย้ายโต๊ะออกนิดหนึ่ง", "yaai dto awk nit nueng", "把桌子移出去一点", "动词", "基础动作"],
  ["dung-lin-chak-awk-ma", "ดึงลิ้นชักออกมา", "dueng lin-chak awk maa", "把抽屉拉出来", "动词", "基础动作"],
  ["phan-thung-hai-naen", "พันถุงให้แน่น", "phan thung hai naaen", "把袋子缠/包紧", "动词", "基础动作"],
  ["thop-phaa-hai-riiap", "ทบผ้าให้เรียบ", "thop phaa hai riiap", "把布折平整", "动词", "基础动作"],
  ["raeng-pratu-bao-bao", "แง้มประตูเบา ๆ", "ngaaem bpra-dtuu bao bao", "轻轻把门开一道缝", "动词", "基础动作"],
  ["dun-gao-ii-khao-pai", "ดันเก้าอี้เข้าไป", "dan gao-ii khao bpai", "把椅子推进去", "动词", "基础动作"],
  ["khaen-khaawng-wai-khaang-dtua", "แขวนของไว้ข้างตัว", "khwaaen khaawng wai khaang dtua", "把东西挂在身边", "动词", "基础动作"],
  ["check-thaang-gawn-awk", "เช็กทางก่อนออก", "chek thaang gaawn awk", "出门前查路线", "动词", "出行确认"],
  ["nang-rot-khan-thii-thuuk", "นั่งรถคันที่ถูก", "nang rot khan thii thuuk", "坐对那辆车", "动词", "出行确认"],
  ["long-bpaai-thii-saam", "ลงป้ายที่สาม", "long bpaai thii saam", "在第三站下车", "动词", "出行确认"],
  ["kho-thaang-lat-thii-plawt-phai", "ขอทางลัดที่ปลอดภัย", "khaaw thaang lat thii bplaawt-phai", "询问安全的近路", "句型", "出行确认"],
  ["thoo-ha-khon-khap-gawn-thueng", "โทรหาคนขับก่อนถึง", "thoo haa khon khap gaawn thueng", "到达前给司机打电话", "动词", "出行确认"],
  ["dtruat-chue-sathanii", "ตรวจชื่อสถานี", "dtruat chue sa-thaa-nii", "核对车站名", "动词", "出行确认"],
  ["raw-nai-jut-thii-mii-fai", "รอในจุดที่มีไฟ", "raaw nai jut thii mii fai", "在有灯的地方等", "动词", "出行确认"],
  ["bpai-phit-tae-glap-dai", "ไปผิดแต่กลับได้", "bpai phit dtaae glap dai", "走错了但能返回", "句型", "出行确认"],
  ["kho-rakha-sutthai", "ขอราคาสุดท้าย", "khaaw raa-khaa sut-thaai", "请给最终价格", "句型", "买卖付款"],
  ["dtruat-khaawng-gawn-jaai", "ตรวจของก่อนจ่าย", "dtruat khaawng gaawn jaai", "付款前检查商品", "动词", "买卖付款"],
  ["kho-lot-kha-song", "ขอลดค่าส่ง", "khaaw lot khaa song", "请求减运费", "句型", "买卖付款"],
  ["yuenyan-yot-gawn-oon", "ยืนยันยอดก่อนโอน", "yuen-yan yaawt gaawn oon", "转账前确认金额", "动词", "买卖付款"],
  ["rap-prakan-jed-wan", "รับประกันเจ็ดวัน", "rap bpra-gan jet wan", "保修七天", "句型", "买卖付款"],
  ["plian-si-dai-phai-nai-wan-nii", "เปลี่ยนสีได้ภายในวันนี้", "bpliian sii dai phaai nai wan nii", "今天内可以换颜色", "句型", "买卖付款"],
  ["kho-bai-rap-ngoen-lek", "ขอใบรับเงินเล็ก", "khaaw bai rap ngoen lek", "请给小收据/收款单", "句型", "买卖付款"],
  ["jaai-dtang-thaa-ngoen-mai-phaw", "จ่ายตังถ้าเงินไม่พอ", "jaai dtang thaa ngoen mai phaaw", "钱不够时付现金/零钱", "句型", "买卖付款"],
  ["som-kha-tuu-hai-naen", "ซ่อมขาตู้ให้แน่น", "saawm khaa dtuu hai naaen", "把柜脚修牢", "动词", "家务维修"],
  ["thot-plak-khruang-awk", "ถอดปลั๊กเครื่องออก", "thaawt bplak khreuuang awk", "把机器插头拔掉", "动词", "家务维修"],
  ["khaen-phaa-hai-haeng", "แขวนผ้าให้แห้ง", "khwaaen phaa hai haaeng", "把衣服挂干", "动词", "家务维修"],
  ["fa-khrop-bpuean", "ฝาครอบเปื้อน", "faa khraawp bpuean", "盖子/罩子脏了", "句型", "家务维修"],
  ["khruang-sak-pha-siang-dang", "เครื่องซักผ้าเสียงดัง", "khreuuang sak phaa siiang dang", "洗衣机声音大", "句型", "家务维修"],
  ["gok-nam-yot-dtalot", "ก๊อกน้ำหยดตลอด", "gaawk naam yot dta-laawt", "水龙头一直滴水", "句型", "家务维修"],
  ["thaang-naam-mii-klin", "ท่อน้ำมีกลิ่น", "thaaw naam mii glin", "下水管有味道", "句型", "家务维修"],
  ["check-khaawng-gawn-thing", "เช็กของก่อนทิ้ง", "chek khaawng gaawn thing", "丢掉前检查东西", "动词", "家务维修"],
  ["song-kham-thaam-nai-chat", "ส่งคำถามในแชต", "song kham thaam nai chaet", "在聊天里发送问题", "动词", "学习消息"],
  ["kho-tuayang-prayok", "ขอตัวอย่างประโยค", "khaaw dtua yaang bpra-yook", "请求例句", "句型", "学习消息"],
  ["rian-yon-lang-duai-clip", "เรียนย้อนหลังด้วยคลิป", "riian yaawn lang duai khlip", "用视频补课/回看学习", "动词", "学习消息"],
  ["jot-kham-mai-long-samut", "จดคำใหม่ลงสมุด", "jot kham mai long sa-mut", "把新词记到本子里", "动词", "学习消息"],
  ["thuan-siang-wannayuk", "ทวนเสียงวรรณยุกต์", "thuan siiang wan-na-yuk", "复习声调", "动词", "学习消息"],
  ["tham-bai-ngaan-song-naa", "ทำใบงานสองหน้า", "tham bai ngaan saawng naa", "做两页练习单", "动词", "学习消息"],
  ["kae-kham-dtaawp-si-dti", "แก้คำตอบสี่ข้อ", "gaae kham dtaawp sii khaaw", "改四道答案", "动词", "学习消息"],
  ["song-link-hai-khruu", "ส่งลิงก์ให้ครู", "song ling hai khruu", "把链接发给老师", "动词", "学习消息"],
  ["nat-rawp-thii-saduak-gwaa", "นัดรอบที่สะดวกกว่า", "nat raawp thii sa-duak gwaa", "约更方便的时段", "动词", "预约时间"],
  ["dtuean-gawn-nueng-chuamong", "เตือนก่อนหนึ่งชั่วโมง", "dteuan gaawn nueng chua-moong", "提前一小时提醒", "动词", "预约时间"],
  ["luean-awk-bpai-saam-wan", "เลื่อนออกไปสามวัน", "luean awk bpai saam wan", "往后推三天", "动词", "预约时间"],
  ["kho-chuang-rawp-baai", "ขอช่วงรอบบ่าย", "khaaw chuang raawp baai", "请求下午时段", "句型", "预约时间"],
  ["raw-khon-khaat-iik-song-khon", "รอคนขาดอีกสองคน", "raaw khon khaat iik saawng khon", "等还缺的两个人", "句型", "预约时间"],
  ["gamnot-sutthai-khuen-nii", "กำหนดสุดท้ายคืนนี้", "gam-not sut-thaai khuen nii", "截止时间是今晚", "句型", "预约时间"],
  ["triiam-tua-sip-naathii", "เตรียมตัวสิบนาที", "dtriiam dtua sip naa-thii", "准备十分钟", "动词", "预约时间"],
  ["kho-kae-wan-nat-hai-thuuk", "ขอแก้วันนัดให้ถูก", "khaaw gaae wan nat hai thuuk", "请求把预约日期改正确", "句型", "预约时间"],
  ["wian-hua-lang-nang-nan", "เวียนหัวหลังนั่งนาน", "wiian hua lang nang naan", "坐久后头晕", "句型", "身体休息"],
  ["thong-mai-khoi-sabai-wan-nii", "ท้องไม่ค่อยสบายวันนี้", "thawng mai khaawy sa-baai wan nii", "今天肚子不太舒服", "句型", "身体休息"],
  ["gin-khaaw-on-on", "กินข้าวอ่อน ๆ", "gin khaao awn awn", "吃清淡软一点的饭", "动词", "身体休息"],
  ["ngop-siang-phuea-phak", "งดเสียงเพื่อพัก", "ngot siiang phuea phak", "为了休息减少声音", "动词", "身体休息"],
  ["nawn-ngip-sip-ha-naathii", "นอนงีบสิบห้านาที", "naawn ngiip sip haa naa-thii", "小睡十五分钟", "动词", "身体休息"],
  ["dtruat-khwam-dan-thii-ran-yaa", "ตรวจความดันที่ร้านยา", "dtruat khwaam dan thii raan yaa", "在药店量血压", "动词", "身体休息"],
  ["chai-yaa-thaa-bao-bao", "ใช้ยาทาเบา ๆ", "chai yaa thaa bao bao", "轻轻涂外用药", "动词", "身体休息"],
  ["kho-laa-phak-khrueng-wan", "ขอลาพักครึ่งวัน", "khaaw laa phak khrueng wan", "请半天假休息", "句型", "身体休息"],
  ["thak-thaai-khruu-gawn-rian", "ทักทายครูก่อนเรียน", "thak-thaai khruu gaawn riian", "上课前问候老师", "动词", "关系礼貌"],
  ["fak-khwaam-pen-huang", "ฝากความเป็นห่วง", "faak khwaam bpen huang", "代为表达关心", "动词", "关系礼貌"],
  ["khopkhun-thii-chuai-rawn", "ขอบคุณที่ช่วยรอ", "khaawp khun thii chuai raaw", "谢谢帮忙等待", "句型", "关系礼貌"],
  ["kho-thot-thii-tham-hai-ngong", "ขอโทษที่ทำให้งง", "khaaw thoot thii tham hai ngong", "抱歉让你困惑", "句型", "关系礼貌"],
  ["phuut-bao-long-nit-nueng", "พูดเบาลงนิดหนึ่ง", "phuut bao long nit nueng", "说小声一点", "动词", "关系礼貌"],
  ["mai-yaak-hai-lambaak", "ไม่อยากให้ลำบาก", "mai yaak hai lam-baak", "不想让对方麻烦", "句型", "关系礼貌"],
  ["jaeng-gawn-thaa-mai-saduak", "แจ้งก่อนถ้าไม่สะดวก", "jaaeng gaawn thaa mai sa-duak", "不方便的话先告知", "句型", "关系礼貌"],
  ["chuai-khao-jai-rawp-nii", "ช่วยเข้าใจรอบนี้", "chuai khao jai raawp nii", "这次请理解一下", "句型", "关系礼貌"],
  ["pan-ha-yuu-thii-rabop", "ปัญหาอยู่ที่ระบบ", "bpan-haa yuu thii ra-bop", "问题在系统", "句型", "问题处理"],
  ["maichai-pan-ha-khaawng-khun", "ไม่ใช่ปัญหาของคุณ", "mai chai bpan-haa khaawng khun", "不是你的问题", "句型", "问题处理"],
  ["long-bpit-laew-poet-mai", "ลองปิดแล้วเปิดใหม่", "laawng bpit laew bpoet mai", "试着关掉再打开", "句型", "问题处理"],
  ["thaa-yang-mai-dai-jaeng-raw", "ถ้ายังไม่ได้แจ้งเรา", "thaa yang mai dai jaaeng rao", "如果还不行请告知我们", "句型", "问题处理"],
  ["kae-thii-ton-het", "แก้ที่ต้นเหตุ", "gaae thii dton heet", "从根本原因处理", "动词", "问题处理"],
  ["long-iik-withi-nueng", "ลองอีกวิธีหนึ่ง", "laawng iik wi-thii nueng", "试另一种方法", "动词", "问题处理"],
  ["dtruat-jut-thii-phit", "ตรวจจุดที่ผิด", "dtruat jut thii phit", "检查出错的点", "动词", "问题处理"],
  ["kho-khuen-pen-khredi", "ขอคืนเป็นเครดิต", "khaaw khuen bpen khree-dit", "请求以余额/额度形式退回", "句型", "问题处理"],
  ["maak-gwaa-sip-khon", "มากกว่าสิบคน", "maak gwaa sip khon", "超过十个人", "短语", "数量比较"],
  ["noi-gwaa-khrueng-chuamong", "น้อยกว่าครึ่งชั่วโมง", "naawy gwaa khrueng chua-moong", "少于半小时", "短语", "数量比较"],
  ["phaw-samrap-song-wan", "พอสำหรับสองวัน", "phaaw sam-rap saawng wan", "够两天用", "短语", "数量比较"],
  ["mai-phaw-haai-khon", "ไม่พอห้าคน", "mai phaaw haa khon", "不够五个人用", "短语", "数量比较"],
  ["phoem-iik-saam-baht", "เพิ่มอีกสามบาท", "phoem iik saam baat", "再加三泰铢", "短语", "数量比较"],
  ["lot-long-sip-bpersen", "ลดลงสิบเปอร์เซ็นต์", "lot long sip bpoe-sen", "减少百分之十", "短语", "数量比较"],
  ["krueng-nueng-khaawng-ra-kha", "ครึ่งหนึ่งของราคา", "khrueng nueng khaawng raa-khaa", "价格的一半", "短语", "数量比较"],
  ["tua-lek-mai-trong", "ตัวเลขไม่ตรง", "dtua leek mai dtrong", "数字对不上", "句型", "数量比较"],
  ["rim-naa-taang-mii-daaet", "ริมหน้าต่างมีแดด", "rim naa dtaang mii daaet", "窗边有阳光", "句型", "位置环境"],
  ["khaang-lang-tuu-yen", "ข้างหลังตู้เย็น", "khaang lang dtuu yen", "冰箱后面", "短语", "位置环境"],
  ["tai-chan-wang-mii-fun", "ใต้ชั้นวางมีฝุ่น", "dtai chan waang mii fun", "置物架下面有灰尘", "句型", "位置环境"],
  ["bon-chan-wang-khaawng-daan-saai", "บนชั้นวางของด้านซ้าย", "bon chan waang khaawng daan saai", "在左侧置物架上", "短语", "位置环境"],
  ["klang-hawng-siang-dang", "กลางห้องเสียงดัง", "glaang hawng siiang dang", "房间中间很吵", "句型", "位置环境"],
  ["rawp-baan-mii-nam-khang", "รอบบ้านมีน้ำขัง", "raawp baan mii naam khang", "房子周围有积水", "句型", "位置环境"],
  ["thii-jawt-rot-daan-khaang", "ที่จอดรถด้านข้าง", "thii jaawt rot daan khaang", "侧边停车位", "短语", "位置环境"],
  ["mum-nii-aagaat-dii", "มุมนี้อากาศดี", "mum nii aa-gaat dii", "这个角落空气好", "句型", "位置环境"],
  ["wan-nii-rian-ruu-arai", "วันนี้เรียนรู้อะไร", "wan nii riian ruu a-rai", "今天学到了什么", "句型", "日常复盘"],
  ["sing-thii-tham-dai-dii-wan-nii", "สิ่งที่ทำได้ดีวันนี้", "sing thii tham dai dii wan nii", "今天做得好的地方", "短语", "日常复盘"],
  ["sing-thii-yang-dtong-fuek", "สิ่งที่ยังต้องฝึก", "sing thii yang dtawng fuek", "还需要练习的地方", "短语", "日常复盘"],
  ["jot-bot-rian-samkhan", "จดบทเรียนสำคัญ", "jot bot riian sam-khan", "记下重要经验/课文重点", "动词", "日常复盘"],
  ["prap-phaen-khrang-naa", "ปรับแผนคราวหน้า", "bprap phaaen khraao naa", "下次调整计划", "动词", "日常复盘"],
  ["tham-dii-khuen-gwaa-doem", "ทำดีขึ้นกว่าเดิม", "tham dii khuen gwaa doem", "比以前做得更好", "句型", "日常复盘"],
  ["yang-dtong-khoi-khoi-fuek", "ยังต้องค่อย ๆ ฝึก", "yang dtawng khaawy khaawy fuek", "还需要慢慢练", "句型", "日常复盘"],
  ["sa-rup-pen-kham-ngai", "สรุปเป็นคำง่าย ๆ", "sa-rup bpen kham ngaai ngaai", "用简单的话总结", "动词", "日常复盘"],
];

const relatedByTheme: Record<
  CoreFinalReview03Theme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  基础动作: {
    synonym: "ยกของขึ้นชั้นบน / yok khaawng khuen chan bon / 把东西搬上楼",
    antonym: "วางไว้ที่เดิม / waang wai thii doem / 放在原处",
    comparison: "ขึ้น/ลง/เข้า/ออก 常放在动词后说明方向。",
    collocation: "ย้ายโต๊ะออกนิดหนึ่ง แล้วดันเก้าอี้เข้าไป / yaai dto awk nit nueng laew dan gao-ii khao bpai / 把桌子移出去一点，再把椅子推进去",
  },
  出行确认: {
    synonym: "เช็กทางก่อนออก / chek thaang gaawn awk / 出门前查路",
    antonym: "ไปโดยไม่เช็ก / bpai dooi mai chek / 不查就去",
    comparison: "确认出行常搭配 เช็ก、ตรวจ、รอ、โทรหา。",
    collocation: "ตรวจชื่อสถานีแล้วลงป้ายที่สาม / dtruat chue sa-thaa-nii laew long bpaai thii saam / 核对站名后在第三站下",
  },
  买卖付款: {
    synonym: "ยืนยันยอดก่อนโอน / yuen-yan yaawt gaawn oon / 转账前确认金额",
    antonym: "จ่ายโดยไม่ตรวจ / jaai dooi mai dtruat / 不检查就付款",
    comparison: "ยอด 是金额，ราคา 是价格，ค่าส่ง 是运费。",
    collocation: "ตรวจของก่อนจ่าย แล้วขอราคาสุดท้าย / dtruat khaawng gaawn jaai laew khaaw raa-khaa sut-thaai / 付款前检查商品，然后问最终价格",
  },
  家务维修: {
    synonym: "ก๊อกน้ำหยดตลอด / gaawk naam yot dta-laawt / 水龙头一直滴水",
    antonym: "ใช้งานได้ปกติ / chai ngaan dai bpa-ga-dti / 正常使用",
    comparison: "维修场景常用 ซ่อม 修、เช็ก 检查、หยด 滴水。",
    collocation: "เครื่องซักผ้าเสียงดัง ต้องเช็กของก่อนทิ้ง / khreuuang sak phaa siiang dang dtawng chek khaawng gaawn thing / 洗衣机声音大，丢东西前要检查",
  },
  学习消息: {
    synonym: "ขอตัวอย่างประโยค / khaaw dtua yaang bpra-yook / 请求例句",
    antonym: "ไม่ถามเพิ่ม / mai thaam phoem / 不再问",
    comparison: "学习消息里 ขอ ใช于请求资料，ส่ง ใช于发送内容。",
    collocation: "จดคำใหม่ลงสมุด แล้วทวนเสียงวรรณยุกต์ / jot kham mai long sa-mut laew thuan siiang wan-na-yuk / 把新词记到本子里，再复习声调",
  },
  预约时间: {
    synonym: "เลื่อนออกไปสามวัน / luean awk bpai saam wan / 往后推三天",
    antonym: "ไม่เลื่อนนัด / mai luean nat / 不改约",
    comparison: "เลื่อนออกไป 表示往后推，เตือนก่อน 表示提前提醒。",
    collocation: "เตือนก่อนหนึ่งชั่วโมง ถ้าต้องเลื่อนออกไปสามวันให้แจ้ง / dteuan gaawn nueng chua-moong thaa dtawng luean awk bpai saam wan hai jaaeng / 提前一小时提醒，如果要往后推三天请告知",
  },
  身体休息: {
    synonym: "นอนงีบสิบห้านาที / naawn ngiip sip haa naa-thii / 小睡十五分钟",
    antonym: "ฝืนทำต่อ / fuen tham dtaaw / 硬撑继续做",
    comparison: "ไม่ไหว 表示撑不住，พัก 表示休息。",
    collocation: "เวียนหัวหลังนั่งนาน เลยขอลาพักครึ่งวัน / wiian hua lang nang naan loei khaaw laa phak khrueng wan / 坐久后头晕，所以请半天假休息",
  },
  关系礼貌: {
    synonym: "ขอโทษที่ทำให้งง / khaaw thoot thii tham hai ngong / 抱歉让你困惑",
    antonym: "พูดไม่สุภาพ / phuut mai su-phaap / 说话不礼貌",
    comparison: "礼貌关系表达常用 ขอโทษที่、ขอบคุณที่、ช่วย。",
    collocation: "ไม่อยากให้ลำบาก ถ้าไม่สะดวกแจ้งก่อน / mai yaak hai lam-baak thaa mai sa-duak jaaeng gaawn / 不想让你麻烦，不方便请先告知",
  },
  问题处理: {
    synonym: "ลองปิดแล้วเปิดใหม่ / laawng bpit laew bpoet mai / 试着关掉再打开",
    antonym: "ปล่อยไว้ไม่แก้ / bplaawy wai mai gaae / 放着不解决",
    comparison: "แก้ที่ต้นเหตุ 比只临时处理更强调原因。",
    collocation: "ปัญหาอยู่ที่ระบบ ถ้ายังไม่ได้แจ้งเรา / bpan-haa yuu thii ra-bop thaa yang mai dai jaaeng rao / 问题在系统，如果还不行请告知我们",
  },
  数量比较: {
    synonym: "มากกว่าสิบคน / maak gwaa sip khon / 超过十个人",
    antonym: "น้อยกว่าสิบคน / naawy gwaa sip khon / 少于十个人",
    comparison: "มากกว่า/น้อยกว่า 表示多于/少于，พอ 表示够。",
    collocation: "ไม่พอห้าคน ต้องเพิ่มอีกสามบาท / mai phaaw haa khon dtawng phoem iik saam baat / 不够五个人用，需要再加三泰铢",
  },
  位置环境: {
    synonym: "ข้างหลังตู้เย็น / khaang lang dtuu yen / 冰箱后面",
    antonym: "ข้างหน้าตู้เย็น / khaang naa dtuu yen / 冰箱前面",
    comparison: "ริม、ข้างหลัง、ใต้、บน、กลาง 都是 A2 常用位置词。",
    collocation: "รอบบ้านมีน้ำขัง และมุมนี้อากาศดี / raawp baan mii naam khang lae mum nii aa-gaat dii / 房子周围有积水，这个角落空气好",
  },
  日常复盘: {
    synonym: "สิ่งที่ทำได้ดี / sing thii tham dai dii / 做得好的地方",
    antonym: "สิ่งที่ยังทำไม่ได้ / sing thii yang tham mai dai / 还做不到的地方",
    comparison: "复盘常用 สิ่งที่...、สรุป、ปรับ、ครั้งหน้า。",
    collocation: "วันนี้เรียนรู้อะไร สรุปเป็นคำง่าย ๆ / wan nii riian ruu a-rai sa-rup bpen kham ngaai ngaai / 今天学到了什么，用简单的话总结",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในการทบทวนรอบสุดท้าย ฉันใช้ “${row[1]}” เพื่อเติมคำที่เจอบ่อยและพูดเรื่องประจำวันได้ชัดขึ้น`,
  roman: `nai gaan thop-thuan raawp sut-thaai chan chai "${row[2]}" phuea dterm kham thii joe baawy lae phuut rueang bpra-jam wan dai chat khuen`,
  chinese: `在最终复盘中，我用“${row[1]}”补上常遇到的词块，让日常表达更清楚。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "核心最终复盘第三轮", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 核心最终复盘第三轮。只补高频可用词块和搭配，避免重复裸词；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: CORE_FINAL_REVIEW_03_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_CORE_FINAL_REVIEW_03: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
