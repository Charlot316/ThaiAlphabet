export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type CommonMistakePairsTheme =
  | "มา/ไป"
  | "อยู่/มี"
  | "ได้/เป็น"
  | "ดู/เห็น"
  | "ฟัง/ได้ยิน"
  | "เอา/พา"
  | "ให้/ขอ"
  | "ใส่/สวม"
  | "รู้/รู้จัก"
  | "พูด/บอก"
  | "จำ/จำได้"
  | "เปิด/ปิด";

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
  theme: CommonMistakePairsTheme,
];

const COMMON_MISTAKE_PAIRS_REFS = [
  "worker-a-a2-common-mistake-pairs",
  "basic-thai-confusable-verbs",
];

const rows: Row[] = [
  ["maa-haa-thii-baan", "มาหาที่บ้าน", "maa haa thii baan", "来家里找……", "动词", "มา/ไป"],
  ["bpai-haa-thii-ran", "ไปหาที่ร้าน", "bpai haa thii raan", "去店里找……", "动词", "มา/ไป"],
  ["ao-khaawng-maa-hai", "เอาของมาให้", "ao khaawng maa hai", "把东西拿来给……", "动词", "มา/ไป"],
  ["ao-khaawng-bpai-hai-khao", "เอาของไปให้เขา", "ao khaawng bpai hai khao", "把东西拿去给他/她", "动词", "มา/ไป"],
  ["glap-maa-laew-thoo", "กลับมาแล้วโทร", "glap maa laew thoo", "回来后打电话", "句型", "มา/ไป"],
  ["glap-bpai-ao-bat", "กลับไปเอาบัตร", "glap bpai ao bat", "回去拿卡/证件", "动词", "มา/ไป"],
  ["dern-maa-thaang-nii", "เดินมาทางนี้", "doen maa thaang nii", "往这边走来", "动词", "มา/ไป"],
  ["dern-bpai-thaang-nan", "เดินไปทางนั้น", "doen bpai thaang nan", "往那边走去", "动词", "มา/ไป"],
  ["yuu-thii-hawng-rian", "อยู่ที่ห้องเรียน", "yuu thii hawng riian", "在教室", "句型", "อยู่/มี"],
  ["mii-hawng-rian-song-hawng", "มีห้องเรียนสองห้อง", "mii hawng riian saawng hawng", "有两间教室", "句型", "อยู่/มี"],
  ["yuu-bon-to-laew", "อยู่บนโต๊ะแล้ว", "yuu bon dto laew", "已经在桌上", "句型", "อยู่/มี"],
  ["mii-bon-to-sam-an", "มีบนโต๊ะสามอัน", "mii bon dto saam an", "桌上有三个", "句型", "อยู่/มี"],
  ["khun-yuu-thii-nai", "คุณอยู่ที่ไหน", "khun yuu thii nai", "你在哪里", "句型", "อยู่/มี"],
  ["khun-mii-welaa-waang-mai", "คุณมีเวลาว่างไหม", "khun mii we-laa waang mai", "你有空闲时间吗", "句型", "อยู่/มี"],
  ["yuu-nai-grapao-khaang-sai", "อยู่ในกระเป๋าข้างซ้าย", "yuu nai gra-bpao khaang saai", "在左边的包里", "句型", "อยู่/มี"],
  ["mii-nai-grapao-laai-an", "มีในกระเป๋าหลายอัน", "mii nai gra-bpao laai an", "包里有好几个", "句型", "อยู่/มี"],
  ["tham-aahaan-dai", "ทำอาหารได้", "tham aa-haan dai", "会做饭/能做饭", "动词", "ได้/เป็น"],
  ["pen-khruu-phasaa-thai", "เป็นครูภาษาไทย", "bpen khruu phaa-saa thai", "是泰语老师", "句型", "ได้/เป็น"],
  ["waai-nam-dai-nit-noy", "ว่ายน้ำได้นิดหน่อย", "waai naam dai nit naawy", "会游一点泳", "动词", "ได้/เป็น"],
  ["pen-khon-khui-ngai", "เป็นคนคุยง่าย", "bpen khon khui ngaai", "是容易沟通的人", "句型", "ได้/เป็น"],
  ["chai-khruang-nii-dai", "ใช้เครื่องนี้ได้", "chai khreuuang nii dai", "能用这台机器", "动词", "ได้/เป็น"],
  ["pen-khwaam-khit-thii-dii-samrap-wan-nii", "เป็นความคิดที่ดีสำหรับวันนี้", "bpen khwaam khit thii dii sam-rap wan nii", "对今天来说是个好想法", "句型", "ได้/เป็น"],
  ["bpai-duai-gan-dai", "ไปด้วยกันได้", "bpai duai gan dai", "可以一起去", "句型", "ได้/เป็น"],
  ["pen-rueng-thii-dtong-check", "เป็นเรื่องที่ต้องเช็ก", "bpen rueang thii dtawng chek", "是需要检查的事", "句型", "ได้/เป็น"],
  ["duu-ruup-nai-mue-thue", "ดูรูปในมือถือ", "duu ruup nai mue-thue", "看手机里的照片", "动词", "ดู/เห็น"],
  ["hen-ruup-nai-chat", "เห็นรูปในแชต", "hen ruup nai chaet", "看到聊天里的照片", "动词", "ดู/เห็น"],
  ["duu-tarang-gawn-ok", "ดูตารางก่อนออก", "duu dtaa-raang gaawn awk", "出门前看日程表", "动词", "ดู/เห็น"],
  ["hen-khwaam-phit-nai-tarang", "เห็นความผิดในตาราง", "hen khwaam phit nai dtaa-raang", "看见日程表里的错误", "动词", "ดู/เห็น"],
  ["duu-sen-thaang-nai-map", "ดูเส้นทางในแผนที่", "duu sen thaang nai phaaen thii", "在地图上看路线", "动词", "ดู/เห็น"],
  ["hen-ran-yuu-sai-mue", "เห็นร้านอยู่ซ้ายมือ", "hen raan yuu saai mue", "看到店在左手边", "动词", "ดู/เห็น"],
  ["duu-aakaan-gawn", "ดูอาการก่อน", "duu aa-gaan gaawn", "先观察症状", "动词", "ดู/เห็น"],
  ["hen-jaaeng-dtuean-laew", "เห็นแจ้งเตือนแล้ว", "hen jaaeng dteuan laew", "已经看到通知", "动词", "ดู/เห็น"],
  ["fang-khruu-athibai", "ฟังครูอธิบาย", "fang khruu a-thi-baai", "听老师解释", "动词", "ฟัง/ได้ยิน"],
  ["dai-yin-siang-khruu", "ได้ยินเสียงครู", "dai yin siiang khruu", "听见老师的声音", "动词", "ฟัง/ได้ยิน"],
  ["fang-phleng-bao-bao", "ฟังเพลงเบา ๆ", "fang phleeng bao bao", "轻轻听音乐", "动词", "ฟัง/ได้ยิน"],
  ["dai-yin-phleng-jaak-ran", "ได้ยินเพลงจากร้าน", "dai yin phleeng jaak raan", "听见店里传来的音乐", "动词", "ฟัง/ได้ยิน"],
  ["fang-kham-thaam-hai-jop", "ฟังคำถามให้จบ", "fang kham thaam hai jop", "把问题听完", "动词", "ฟัง/ได้ยิน"],
  ["mai-dai-yin-kham-sutthai", "ไม่ได้ยินคำสุดท้าย", "mai dai yin kham sut-thaai", "没听见最后一个词", "动词", "ฟัง/ได้ยิน"],
  ["fang-laew-khao-jai", "ฟังแล้วเข้าใจ", "fang laew khao jai", "听后明白", "句型", "ฟัง/ได้ยิน"],
  ["dai-yin-tae-mai-chat", "ได้ยินแต่ไม่ชัด", "dai yin dtaae mai chat", "听见了但不清楚", "句型", "ฟัง/ได้ยิน"],
  ["ao-rom-bpai-duai-ton-awk-baan", "เอาร่มไปด้วยตอนออกบ้าน", "ao rom bpai duai dtaawn awk baan", "出门时把伞带去", "动词", "เอา/พา"],
  ["pha-phuean-bpai-duai", "พาเพื่อนไปด้วย", "phaa phuean bpai duai", "带朋友一起去", "动词", "เอา/พา"],
  ["ao-khaawng-klap-baan", "เอาของกลับบ้าน", "ao khaawng glap baan", "把东西带回家", "动词", "เอา/พา"],
  ["pha-luk-klap-baan", "พาลูกกลับบ้าน", "phaa luuk glap baan", "带孩子回家", "动词", "เอา/พา"],
  ["ao-ekgasaan-maa-hai", "เอาเอกสารมาให้", "ao ek-ga-saan maa hai", "把文件拿来给……", "动词", "เอา/พา"],
  ["pha-khun-mae-maa-ha-mor", "พาคุณแม่มาหาหมอ", "phaa khun maae maa haa maaw", "带妈妈来看医生", "动词", "เอา/พา"],
  ["ao-tua-bpai-check", "เอาตั๋วไปเช็ก", "ao dtua bpai chek", "把票拿去检查", "动词", "เอา/พา"],
  ["pha-khaek-bpai-thii-nang", "พาแขกไปที่นั่ง", "phaa khaaek bpai thii nang", "带客人到座位", "动词", "เอา/พา"],
  ["hai-ngoen-kha-khaawng", "ให้เงินค่าของ", "hai ngoen khaa khaawng", "给买东西的钱", "动词", "ให้/ขอ"],
  ["kho-ngoen-kha-dern-thaang", "ขอเงินค่าเดินทาง", "khaaw ngoen khaa doen thaang", "请求交通费", "句型", "ให้/ขอ"],
  ["hai-welaa-phoem", "ให้เวลาเพิ่ม", "hai we-laa phoem", "给更多时间", "动词", "ให้/ขอ"],
  ["kho-welaa-phoem-nit-nueng", "ขอเวลาเพิ่มนิดหนึ่ง", "khaaw we-laa phoem nit nueng", "请求多一点时间", "句型", "ให้/ขอ"],
  ["hai-kham-nae-nam-ngai", "ให้คำแนะนำง่าย ๆ", "hai kham nae nam ngaai ngaai", "给简单建议", "动词", "ให้/ขอ"],
  ["kho-kham-nae-nam-jaak-khruu", "ขอคำแนะนำจากครู", "khaaw kham nae nam jaak khruu", "向老师请求建议", "句型", "ให้/ขอ"],
  ["hai-boe-dtit-dtaaw", "ให้เบอร์ติดต่อ", "hai boe dtit dtaaw", "给联系电话", "动词", "ให้/ขอ"],
  ["kho-boe-dtit-dtaaw-khaawng-ran", "ขอเบอร์ติดต่อของร้าน", "khaaw boe dtit dtaaw khaawng raan", "请求店家的联系电话", "句型", "ให้/ขอ"],
  ["sai-kep-khaawng-nai-thung", "ใส่เก็บของในถุง", "sai gep khaawng nai thung", "把东西放进袋子里", "动词", "ใส่/สวม"],
  ["suam-suea-khan-yai", "สวมเสื้อกันหนาว", "suam suea gan naao", "穿外套/毛衣", "动词", "ใส่/สวม"],
  ["sai-nam-tan-noy", "ใส่น้ำตาลน้อย", "sai nam dtaan naawy", "少放糖", "动词", "ใส่/สวม"],
  ["suam-naa-gaak-gawn-khao", "สวมหน้ากากก่อนเข้า", "suam naa-gaak gaawn khao", "进入前戴口罩", "动词", "ใส่/สวม"],
  ["sai-chue-nai-baep-fawm", "ใส่ชื่อในแบบฟอร์ม", "sai chue nai baaep faawm", "在表格里填名字", "动词", "ใส่/สวม"],
  ["suam-raawng-thaao-awk-jaak-baan", "สวมรองเท้าออกจากบ้าน", "suam raawng thaao awk jaak baan", "穿鞋出门", "动词", "ใส่/สวม"],
  ["sai-rakha-phit", "ใส่ราคาผิด", "sai raa-khaa phit", "填错价格", "动词", "ใส่/สวม"],
  ["suam-waen-duu-nang", "สวมแว่นดูหนัง", "suam waaen duu nang", "戴眼镜看电影", "动词", "ใส่/สวม"],
  ["ruu-withi-chai", "รู้วิธีใช้", "ruu wi-thii chai", "知道使用方法", "动词", "รู้/รู้จัก"],
  ["ruu-jak-khon-khai-yaa", "รู้จักคนขายยา", "ruu jak khon khaai yaa", "认识卖药的人", "动词", "รู้/รู้จัก"],
  ["ruu-waa-dtong-jaai", "รู้ว่าต้องจ่าย", "ruu waa dtawng jaai", "知道需要付款", "句型", "รู้/รู้จัก"],
  ["ruu-jak-ran-nii-mai", "รู้จักร้านนี้ไหม", "ruu jak raan nii mai", "认识/知道这家店吗", "句型", "รู้/รู้จัก"],
  ["ruu-kham-dtaawp-laew", "รู้คำตอบแล้ว", "ruu kham dtaawp laew", "已经知道答案", "句型", "รู้/รู้จัก"],
  ["ruu-jak-thaang-lat", "รู้จักทางลัด", "ruu jak thaang lat", "知道一条近路", "动词", "รู้/รู้จัก"],
  ["mai-ruu-het-phon", "ไม่รู้เหตุผล", "mai ruu heet phon", "不知道原因", "句型", "รู้/รู้จัก"],
  ["mai-ruu-jak-phuu-duu-lae", "ไม่รู้จักผู้ดูแล", "mai ruu jak phuu duu laae", "不认识负责人", "句型", "รู้/รู้จัก"],
  ["phuut-kab-khruu-bao-bao", "พูดกับครูเบา ๆ", "phuut gap khruu bao bao", "轻声和老师说话", "动词", "พูด/บอก"],
  ["bok-khruu-wa-mai-khao-jai", "บอกครูว่าไม่เข้าใจ", "baawk khruu waa mai khao jai", "告诉老师不明白", "动词", "พูด/บอก"],
  ["phuut-phasaa-thai-nit-noy", "พูดภาษาไทยนิดหน่อย", "phuut phaa-saa thai nit naawy", "说一点泰语", "动词", "พูด/บอก"],
  ["bok-welaa-thii-saduak", "บอกเวลาที่สะดวก", "baawk we-laa thii sa-duak", "告知方便时间", "动词", "พูด/บอก"],
  ["phuut-rueng-ngaan-baan", "พูดเรื่องงานบ้าน", "phuut rueang ngaan baan", "谈家务的事", "动词", "พูด/บอก"],
  ["bok-thaang-hai-khaek", "บอกทางให้แขก", "baawk thaang hai khaaek", "给客人指路", "动词", "พูด/บอก"],
  ["phuut-siang-mai-chat", "พูดเสียงไม่ชัด", "phuut siiang mai chat", "说话声音不清楚", "句型", "พูด/บอก"],
  ["bok-hai-tham-mai", "บอกให้ทำใหม่", "baawk hai tham mai", "叫/告诉对方重新做", "动词", "พูด/บอก"],
  ["jam-chue-ran-dai", "จำชื่อร้านได้", "jam chue raan dai", "记得店名", "动词", "จำ/จำได้"],
  ["jam-ber-mai-dai", "จำเบอร์ไม่ได้", "jam boe mai dai", "记不住号码", "动词", "จำ/จำได้"],
  ["jam-welaa-nat-wai", "จำเวลานัดไว้", "jam we-laa nat wai", "记住预约时间", "动词", "จำ/จำได้"],
  ["jam-dai-wa-khoei-maa", "จำได้ว่าเคยมา", "jam dai waa khoei maa", "记得曾经来过", "句型", "จำ/จำได้"],
  ["jam-naa-khao-dai", "จำหน้าเขาได้", "jam naa khao dai", "认得他/她的脸", "动词", "จำ/จำได้"],
  ["jam-mai-dai-wa-wang-wai-nai", "จำไม่ได้ว่าวางไว้ไหน", "jam mai dai waa waang wai nai", "不记得放在哪里", "句型", "จำ/จำได้"],
  ["jam-kham-nii-hai-dai", "จำคำนี้ให้ได้", "jam kham nii hai dai", "要把这个词记住", "句型", "จำ/จำได้"],
  ["jam-dai-mai-wa-khrai-bok", "จำได้ไหมว่าใครบอก", "jam dai mai waa khrai baawk", "记得是谁说的吗", "句型", "จำ/จำได้"],
  ["poet-fai-nai-hong", "เปิดไฟในห้อง", "bpoet fai nai hawng", "打开房间灯", "动词", "เปิด/ปิด"],
  ["bpit-fai-gawn-awk", "ปิดไฟก่อนออก", "bpit fai gaawn awk", "出门前关灯", "动词", "เปิด/ปิด"],
  ["poet-naa-taang-hai-lom-khao", "เปิดหน้าต่างให้ลมเข้า", "bpoet naa dtaang hai lom khao", "开窗让风进来", "动词", "เปิด/ปิด"],
  ["bpit-pratu-hai-sanit", "ปิดประตูให้สนิท", "bpit bpra-dtuu hai sa-nit", "把门关严", "动词", "เปิด/ปิด"],
  ["poet-app-thanakhan-naa-oon-ngoen", "เปิดแอปธนาคารหน้าโอนเงิน", "bpoet aaep tha-naa-khaan naa oon ngoen", "打开银行应用的转账页面", "动词", "เปิด/ปิด"],
  ["bpit-siang-mue-thue", "ปิดเสียงมือถือ", "bpit siiang mue-thue", "关闭手机声音", "动词", "เปิด/ปิด"],
  ["poet-klaawng-thaai-ruup", "เปิดกล้องถ่ายรูป", "bpoet glaawng thaai ruup", "打开相机拍照", "动词", "เปิด/ปิด"],
  ["bpit-naa-jaw-gawn-nawn", "ปิดหน้าจอก่อนนอน", "bpit naa jaaw gaawn naawn", "睡前关屏幕", "动词", "เปิด/ปิด"],
];

const relatedByTheme: Record<
  CommonMistakePairsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  "มา/ไป": {
    synonym: "เอาของมาให้ / ao khaawng maa hai / 拿来给",
    antonym: "เอาของไปให้ / ao khaawng bpai hai / 拿去给",
    comparison: "มา 朝说话人或当前地点来，ไป 离开说话人或往别处去。",
    collocation: "กลับมาแล้วโทร ถ้าต้องกลับไปเอาบัตรบอกก่อน / glap maa laew thoo thaa dtawng glap bpai ao bat baawk gaawn / 回来后打电话，如果要回去拿卡先说",
  },
  "อยู่/มี": {
    synonym: "อยู่ที่ห้องเรียน / yuu thii hawng riian / 在教室",
    antonym: "ไม่มีในห้อง / mai mii nai hawng / 房间里没有",
    comparison: "อยู่ 说明位置，มี 说明有无或存在数量。",
    collocation: "ของอยู่บนโต๊ะ แต่มีบนโต๊ะหลายอัน / khaawng yuu bon dto dtaae mii bon dto laai an / 东西在桌上，但桌上有好几个",
  },
  "ได้/เป็น": {
    synonym: "ทำอาหารได้ / tham aa-haan dai / 会做饭",
    antonym: "ทำไม่ได้ / tham mai dai / 做不了",
    comparison: "ได้ 表示能做或允许，เป็น 表示身份、性质或成为。",
    collocation: "ใช้เครื่องนี้ได้ แต่ไม่เป็นคนซ่อม / chai khreuuang nii dai dtaae mai bpen khon saawm / 能用这台机器，但不是修理的人",
  },
  "ดู/เห็น": {
    synonym: "ดูรูปในมือถือ / duu ruup nai mue-thue / 看手机照片",
    antonym: "ไม่เห็นรูป / mai hen ruup / 没看见照片",
    comparison: "ดู 是有意识地看，เห็น 是视觉上看见。",
    collocation: "ดูตารางก่อนออก ถ้าเห็นความผิดให้แก้ / duu dtaa-raang gaawn awk thaa hen khwaam phit hai gaae / 出门前看日程表，如果看见错误就改",
  },
  "ฟัง/ได้ยิน": {
    synonym: "ฟังครูอธิบาย / fang khruu a-thi-baai / 听老师解释",
    antonym: "ไม่ได้ยินคำสุดท้าย / mai dai yin kham sut-thaai / 没听见最后一个词",
    comparison: "ฟัง 是主动听，ได้ยิน 是听见声音。",
    collocation: "ฟังคำถามให้จบ แม้ได้ยินแต่ไม่ชัด / fang kham thaam hai jop maae dai yin dtaae mai chat / 把问题听完，哪怕听见了但不清楚",
  },
  "เอา/พา": {
    synonym: "เอาร่มไปด้วย / ao rom bpai duai / 带伞去",
    antonym: "พาเพื่อนไปด้วย / phaa phuean bpai duai / 带朋友去",
    comparison: "เอา 带物品，พา 带人或动物。",
    collocation: "เอาเอกสารมาให้ แล้วพาแขกไปที่นั่ง / ao ek-ga-saan maa hai laew phaa khaaek bpai thii nang / 把文件拿来，然后带客人到座位",
  },
  "ให้/ขอ": {
    synonym: "ให้เวลาเพิ่ม / hai we-laa phoem / 给更多时间",
    antonym: "ขอเวลาเพิ่ม / khaaw we-laa phoem / 请求更多时间",
    comparison: "ให้ 是给出，ขอ 是请求得到。",
    collocation: "ขอคำแนะนำจากครู แล้วครูให้คำแนะนำง่าย ๆ / khaaw kham nae nam jaak khruu laew khruu hai kham nae nam ngaai ngaai / 向老师请求建议，老师给了简单建议",
  },
  "ใส่/สวม": {
    synonym: "ใส่น้ำตาลน้อย / sai nam dtaan naawy / 少放糖",
    antonym: "ไม่ใส่น้ำตาล / mai sai nam dtaan / 不放糖",
    comparison: "ใส่ 可表示放入、填写、穿戴；สวม 更偏正式地表示穿戴。",
    collocation: "ใส่ชื่อในแบบฟอร์ม และสวมหน้ากากก่อนเข้า / sai chue nai baaep faawm lae suam naa-gaak gaawn khao / 在表格填名字，并进入前戴口罩",
  },
  "รู้/รู้จัก": {
    synonym: "รู้วิธีใช้ / ruu wi-thii chai / 知道使用方法",
    antonym: "ไม่รู้จักผู้ดูแล / mai ruu jak phuu duu laae / 不认识负责人",
    comparison: "รู้ 知道事实或内容，รู้จัก 认识人、地方或熟悉事物。",
    collocation: "รู้ว่าต้องจ่าย แต่ไม่รู้จักร้านนี้ / ruu waa dtawng jaai dtaae mai ruu jak raan nii / 知道要付款，但不认识这家店",
  },
  "พูด/บอก": {
    synonym: "พูดภาษาไทยนิดหน่อย / phuut phaa-saa thai nit naawy / 说一点泰语",
    antonym: "ไม่บอกใคร / mai baawk khrai / 不告诉任何人",
    comparison: "พูด 是说话或谈论，บอก 是告诉具体信息。",
    collocation: "พูดไม่ชัด เลยต้องบอกครูว่าไม่เข้าใจ / phuut mai chat loei dtawng baawk khruu waa mai khao jai / 说得不清楚，所以要告诉老师不明白",
  },
  "จำ/จำได้": {
    synonym: "จำชื่อร้านได้ / jam chue raan dai / 记得店名",
    antonym: "จำไม่ได้ / jam mai dai / 不记得",
    comparison: "จำ 是记，จำได้ 强调已经记得或认得出来。",
    collocation: "จำไม่ได้ว่าวางไว้ไหน แต่จำได้ว่าเคยมา / jam mai dai waa waang wai nai dtaae jam dai waa khoei maa / 不记得放在哪，但记得来过",
  },
  "เปิด/ปิด": {
    synonym: "เปิดไฟในห้อง / bpoet fai nai hawng / 开房间灯",
    antonym: "ปิดไฟก่อนออก / bpit fai gaawn awk / 出门前关灯",
    comparison: "เปิด 是打开或开启，ปิด 是关闭或关上。",
    collocation: "เปิดหน้าต่างให้ลมเข้า แล้วปิดประตูให้สนิท / bpoet naa dtaang hai lom khao laew bpit bpra-dtuu hai sa-nit / 开窗让风进来，然后把门关严",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `คำว่า “${row[1]}” ช่วยให้แยกคำที่มักสับสนได้ชัดขึ้น และใช้ในประโยคง่าย ๆ ได้ถูกต้อง`,
  roman: `kham waa "${row[2]}" chuai hai yaaek kham thii mak sap-son dai chat khuen lae chai nai bpra-yook ngaai ngaai dai thuuk dtawng`,
  chinese: `“${row[1]}”可以帮助区分常混淆的词，并在简单句里更准确地使用。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "易混词近义对照", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 易混词/近义对照。重点区分基础动词和结构在真实句子里的用法；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: COMMON_MISTAKE_PAIRS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_COMMON_MISTAKE_PAIRS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
