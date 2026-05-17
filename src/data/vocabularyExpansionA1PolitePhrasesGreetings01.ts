export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "打招呼" | "道谢" | "道歉" | "请" | "没关系" | "再见" | "称呼" | "简单客套" | "礼貌回应" | "句尾小词";
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

type Person = { thai: string; roman: string; chinese: string; id: string };
type PoliteAction = { thai: string; roman: string; chinese: string; id: string };

const POLITE_PHRASES_GREETING_REFS = ["thai-frequency", "thai-a1-polite-phrases-greetings-candidate"];

const people: readonly Person[] = [
  { thai: "คุณครู", roman: "khun khruu", chinese: "老师", id: "khun-khruu" },
  { thai: "คุณหมอ", roman: "khun maaw", chinese: "医生", id: "khun-maaw" },
  { thai: "พี่ชาย", roman: "phii chaai", chinese: "哥哥/年长男性", id: "phii-chaai" },
  { thai: "พี่สาว", roman: "phii saao", chinese: "姐姐/年长女性", id: "phii-saao" },
  { thai: "คุณแม่", roman: "khun maae", chinese: "妈妈", id: "khun-maae" },
  { thai: "คุณพ่อ", roman: "khun phaaw", chinese: "爸爸", id: "khun-phaaw" },
  { thai: "คุณยาย", roman: "khun yaai", chinese: "外婆/奶奶", id: "khun-yaai" },
  { thai: "คุณตา", roman: "khun dtaa", chinese: "外公/爷爷", id: "khun-dtaa" },
  { thai: "เพื่อนใหม่", roman: "phuean mai", chinese: "新朋友", id: "phuean-mai" },
  { thai: "เพื่อนบ้าน", roman: "phuean-baan", chinese: "邻居", id: "phuean-baan" },
  { thai: "พนักงานร้าน", roman: "pha-nak-ngaan raan", chinese: "店员", id: "pha-nak-ngaan-raan" },
  { thai: "คนขับรถ", roman: "khon khap rot", chinese: "司机", id: "khon-khap-rot" },
  { thai: "เจ้าหน้าที่", roman: "jao-naa-thii", chinese: "工作人员", id: "jao-naa-thii" },
  { thai: "คุณลูกค้า", roman: "khun luuk-khaa", chinese: "顾客", id: "khun-luuk-khaa" },
  { thai: "น้องนักเรียน", roman: "naawng nak-riian", chinese: "小同学", id: "naawng-nak-riian" },
  { thai: "เพื่อนร่วมชั้น", roman: "phuean ruam chan", chinese: "同班同学", id: "phuean-ruam-chan" },
  { thai: "ญาติผู้ใหญ่", roman: "yaat phuu-yai", chinese: "长辈亲戚", id: "yaat-phuu-yai" },
  { thai: "แขกที่บ้าน", roman: "khaaek thii baan", chinese: "家里的客人", id: "khaaek-thii-baan" },
  { thai: "คุณป้า", roman: "khun bpaa", chinese: "阿姨/伯母", id: "khun-bpaa" },
  { thai: "คุณลุง", roman: "khun lung", chinese: "叔伯/大叔", id: "khun-lung" },
];

const thankActions: readonly PoliteAction[] = [
  { thai: "ช่วยถือของ", roman: "chuai theu khaawng", chinese: "帮忙拿东西", id: "chuai-theu-khaawng" },
  { thai: "ช่วยเปิดประตู", roman: "chuai bpoet bpra-dtuu", chinese: "帮忙开门", id: "chuai-bpoet-bpra-dtuu" },
  { thai: "ช่วยบอกทาง", roman: "chuai baawk thaang", chinese: "帮忙指路", id: "chuai-baawk-thaang" },
  { thai: "รอฉัน", roman: "raaw chan", chinese: "等我", id: "raaw-chan" },
  { thai: "โทรกลับมา", roman: "thoo glap maa", chinese: "回电话", id: "thoo-glap-maa" },
  { thai: "ส่งข้อความมา", roman: "song khaaw-khwaam maa", chinese: "发消息来", id: "song-khaaw-khwaam-maa" },
  { thai: "ทำอาหารให้", roman: "tham aa-haan hai", chinese: "做饭给我", id: "tham-aa-haan-hai" },
  { thai: "ให้ยืมปากกา", roman: "hai yeum bpaak-gaa", chinese: "借笔给我", id: "hai-yeum-bpaak-gaa" },
  { thai: "ฟังฉันพูด", roman: "fang chan phuut", chinese: "听我说话", id: "fang-chan-phuut" },
  { thai: "มาหาฉัน", roman: "maa haa chan", chinese: "来看我", id: "maa-haa-chan" },
  { thai: "ซื้อขนมมาให้", roman: "seu kha-nom maa hai", chinese: "买点心给我", id: "seu-kha-nom-maa-hai" },
  { thai: "สอนคำนี้", roman: "saawn kham nii", chinese: "教这个词", id: "saawn-kham-nii" },
  { thai: "เก็บที่นั่งไว้", roman: "gep thii-nang wai", chinese: "留座位", id: "gep-thii-nang-wai" },
  { thai: "ช่วยดูของ", roman: "chuai duu khaawng", chinese: "帮忙看东西", id: "chuai-duu-khaawng" },
  { thai: "พาฉันไป", roman: "phaa chan bpai", chinese: "带我去", id: "phaa-chan-bpai" },
  { thai: "อธิบายช้า ๆ", roman: "a-thi-baai chaa chaa", chinese: "慢慢解释", id: "a-thi-baai-chaa-chaa" },
];

const requestActions: readonly PoliteAction[] = [
  { thai: "พูดช้า ๆ", roman: "phuut chaa chaa", chinese: "慢慢说", id: "phuut-chaa-chaa" },
  { thai: "เขียนให้ดู", roman: "khiian hai duu", chinese: "写给我看", id: "khiian-hai-duu" },
  { thai: "เปิดไฟ", roman: "bpoet fai", chinese: "开灯", id: "bpoet-fai" },
  { thai: "ปิดประตู", roman: "bpit bpra-dtuu", chinese: "关门", id: "bpit-bpra-dtuu" },
  { thai: "รอสักครู่", roman: "raaw sak khruu", chinese: "等一会儿", id: "raaw-sak-khruu" },
  { thai: "ช่วยดูหน่อย", roman: "chuai duu naawy", chinese: "帮忙看一下", id: "chuai-duu-naawy" },
  { thai: "ขอทางหน่อย", roman: "khaaw thaang naawy", chinese: "借过一下", id: "khaaw-thaang-naawy" },
  { thai: "ขอน้ำหนึ่งแก้ว", roman: "khaaw naam neung gaaeo", chinese: "要一杯水", id: "khaaw-naam-neung-gaaeo" },
  { thai: "ขอใบเสร็จ", roman: "khaaw bai-set", chinese: "要收据", id: "khaaw-bai-set" },
  { thai: "ขอถุงเล็ก", roman: "khaaw thung lek", chinese: "要小袋子", id: "khaaw-thung-lek" },
  { thai: "นั่งตรงนี้", roman: "nang dtrong nii", chinese: "坐这里", id: "nang-dtrong-nii" },
  { thai: "ถามอีกครั้ง", roman: "thaam iik khrang", chinese: "再问一次", id: "thaam-iik-khrang" },
  { thai: "เข้าห้องน้ำ", roman: "khao haawng-naam", chinese: "去洗手间", id: "khao-haawng-naam" },
  { thai: "ใช้โทรศัพท์", roman: "chai thoo-ra-sap", chinese: "使用电话", id: "chai-thoo-ra-sap" },
  { thai: "ถ่ายรูปด้วยกัน", roman: "thaai ruup duai gan", chinese: "一起拍照", id: "thaai-ruup-duai-gan" },
  { thai: "กินด้วยกัน", roman: "gin duai gan", chinese: "一起吃", id: "gin-duai-gan" },
];

const directRows: readonly Definition[] = [
  { thai: "สวัสดีค่ะตอนเช้า", id: "sa-wat-dii-kha-dtaawn-chaao", roman: "sa-wat-dii kha dtaawn chaao", chinese: "早上好（女性礼貌说法）", partOfSpeech: "短语", theme: "打招呼", exampleThai: "นักเรียนพูดว่า สวัสดีค่ะตอนเช้ากับคุณครู", exampleRoman: "nak-riian phuut waa sa-wat-dii kha dtaawn chaao gap khun khruu", exampleChinese: "学生早上对老师说“早上好”。", tag: "问候" },
  { thai: "สวัสดีครับตอนเย็น", id: "sa-wat-dii-khrap-dtaawn-yen", roman: "sa-wat-dii khrap dtaawn yen", chinese: "傍晚好（男性礼貌说法）", partOfSpeech: "短语", theme: "打招呼", exampleThai: "เขาพูดว่า สวัสดีครับตอนเย็นกับเพื่อนบ้าน", exampleRoman: "khao phuut waa sa-wat-dii khrap dtaawn yen gap phuean-baan", exampleChinese: "他傍晚对邻居说“傍晚好”。", tag: "问候" },
  { thai: "ไปก่อนนะคะ", id: "bpai-gaawn-na-kha", roman: "bpai gaawn na kha", chinese: "我先走了哦（女性礼貌）", partOfSpeech: "短语", theme: "再见", exampleThai: "ฉันพูดว่าไปก่อนนะคะก่อนกลับบ้าน", exampleRoman: "chan phuut waa bpai gaawn na kha gaawn glap baan", exampleChinese: "我回家前说“我先走了哦”。", tag: "告别" },
  { thai: "ไปก่อนนะครับ", id: "bpai-gaawn-na-khrap", roman: "bpai gaawn na khrap", chinese: "我先走了哦（男性礼貌）", partOfSpeech: "短语", theme: "再见", exampleThai: "พ่อพูดว่าไปก่อนนะครับกับคุณลุง", exampleRoman: "phaaw phuut waa bpai gaawn na khrap gap khun lung", exampleChinese: "爸爸对叔伯说“我先走了哦”。", tag: "告别" },
  { thai: "แล้วเจอกันใหม่นะ", id: "laaeo-jooe-gan-mai-na", roman: "laaeo jooe gan mai na", chinese: "那下次再见哦", partOfSpeech: "短语", theme: "再见", exampleThai: "หลังเลิกเรียน เพื่อนพูดว่าแล้วเจอกันใหม่นะ", exampleRoman: "lang loek riian, phuean phuut waa laaeo jooe gan mai na", exampleChinese: "放学后，朋友说“那下次再见哦”。", tag: "告别" },
  { thai: "ไม่เป็นไรค่ะพี่", id: "mai-bpen-rai-kha-phii", roman: "mai bpen rai kha phii", chinese: "没关系，姐姐/哥哥（女性礼貌）", partOfSpeech: "短语", theme: "没关系", exampleThai: "เมื่อพี่ขอโทษ ฉันตอบว่าไม่เป็นไรค่ะพี่", exampleRoman: "muea phii khaaw-thoot, chan dtaawp waa mai bpen rai kha phii", exampleChinese: "哥哥/姐姐道歉时，我回答“没关系”。", tag: "回应" },
  { thai: "ไม่เป็นไรครับครู", id: "mai-bpen-rai-khrap-khruu", roman: "mai bpen rai khrap khruu", chinese: "没关系，老师（男性礼貌）", partOfSpeech: "短语", theme: "没关系", exampleThai: "นักเรียนตอบคุณครูว่าไม่เป็นไรครับครู", exampleRoman: "nak-riian dtaawp khun khruu waa mai bpen rai khrap khruu", exampleChinese: "学生回答老师说“没关系，老师”。", tag: "回应" },
  { thai: "ยินดีค่ะคุณแม่", id: "yin-dii-kha-khun-maae", roman: "yin-dii kha khun maae", chinese: "很乐意，妈妈（女性礼貌）", partOfSpeech: "短语", theme: "礼貌回应", exampleThai: "เมื่อแม่ขอให้ช่วย ฉันตอบว่ายินดีค่ะคุณแม่", exampleRoman: "muea maae khaaw hai chuai, chan dtaawp waa yin-dii kha khun maae", exampleChinese: "妈妈请我帮忙时，我回答“很乐意，妈妈”。", tag: "回应" },
  { thai: "ได้เลยครับคุณพ่อ", id: "dai-loei-khrap-khun-phaaw", roman: "dai loei khrap khun phaaw", chinese: "可以，爸爸（男性礼貌）", partOfSpeech: "短语", theme: "礼貌回应", exampleThai: "พ่อบอกให้ปิดไฟ ลูกตอบว่าได้เลยครับคุณพ่อ", exampleRoman: "phaaw baawk hai bpit fai, luuk dtaawp waa dai loei khrap khun phaaw", exampleChinese: "爸爸让关灯，孩子回答“可以，爸爸”。", tag: "回应" },
  { thai: "ขอโทษนะคะคุณป้า", id: "khaaw-thoot-na-kha-khun-bpaa", roman: "khaaw-thoot na kha khun bpaa", chinese: "不好意思，阿姨（女性礼貌）", partOfSpeech: "短语", theme: "道歉", exampleThai: "ฉันเดินชนคุณป้า จึงพูดว่าขอโทษนะคะคุณป้า", exampleRoman: "chan doen chon khun bpaa, jeung phuut waa khaaw-thoot na kha khun bpaa", exampleChinese: "我走路撞到阿姨，所以说“不好意思，阿姨”。", tag: "道歉" },
  { thai: "ขอโทษครับคุณลุง", id: "khaaw-thoot-khrap-khun-lung", roman: "khaaw-thoot khrap khun lung", chinese: "对不起，叔伯（男性礼貌）", partOfSpeech: "短语", theme: "道歉", exampleThai: "เด็กผู้ชายพูดว่าขอโทษครับคุณลุง", exampleRoman: "dek phuu-chaai phuut waa khaaw-thoot khrap khun lung", exampleChinese: "男孩说“对不起，叔伯”。", tag: "道歉" },
  { thai: "รบกวนหน่อยนะคะ", id: "rop-guan-naawy-na-kha", roman: "rop-guan naawy na kha", chinese: "麻烦一下哦（女性礼貌）", partOfSpeech: "短语", theme: "请", exampleThai: "ฉันพูดว่ารบกวนหน่อยนะคะก่อนถามทาง", exampleRoman: "chan phuut waa rop-guan naawy na kha gaawn thaam thaang", exampleChinese: "我问路前说“麻烦一下哦”。", tag: "请求" },
  { thai: "รบกวนหน่อยครับ", id: "rop-guan-naawy-khrap", roman: "rop-guan naawy khrap", chinese: "麻烦一下（男性礼貌）", partOfSpeech: "短语", theme: "请", exampleThai: "เขาพูดว่ารบกวนหน่อยครับกับพนักงานร้าน", exampleRoman: "khao phuut waa rop-guan naawy khrap gap pha-nak-ngaan raan", exampleChinese: "他对店员说“麻烦一下”。", tag: "请求" },
  { thai: "ขอบใจนะน้อง", id: "khaawp-jai-na-naawng", roman: "khaawp-jai na naawng", chinese: "谢谢你，小朋友/弟妹", partOfSpeech: "短语", theme: "道谢", exampleThai: "พี่พูดว่าขอบใจนะน้องเมื่อได้รับของ", exampleRoman: "phii phuut waa khaawp-jai na naawng muea dai rap khaawng", exampleChinese: "哥哥/姐姐收到东西时说“谢谢你，小朋友/弟妹”。", tag: "道谢" },
  { thai: "เชิญนั่งค่ะ", id: "choen-nang-kha", roman: "choen nang kha", chinese: "请坐（女性礼貌）", partOfSpeech: "短语", theme: "简单客套", exampleThai: "เจ้าของบ้านพูดกับแขกว่าเชิญนั่งค่ะ", exampleRoman: "jao-khaawng baan phuut gap khaaek waa choen nang kha", exampleChinese: "主人对客人说“请坐”。", tag: "客套" },
  { thai: "เชิญเข้ามาครับ", id: "choen-khao-maa-khrap", roman: "choen khao maa khrap", chinese: "请进（男性礼貌）", partOfSpeech: "短语", theme: "简单客套", exampleThai: "คุณพ่อพูดกับแขกว่าเชิญเข้ามาครับ", exampleRoman: "khun phaaw phuut gap khaaek waa choen khao maa khrap", exampleChinese: "爸爸对客人说“请进”。", tag: "客套" },
  { thai: "ทานให้อร่อยนะคะ", id: "thaan-hai-a-raawy-na-kha", roman: "thaan hai a-raawy na kha", chinese: "请慢用/祝吃得开心（女性礼貌）", partOfSpeech: "短语", theme: "简单客套", exampleThai: "แม่พูดว่าทานให้อร่อยนะคะกับแขก", exampleRoman: "maae phuut waa thaan hai a-raawy na kha gap khaaek", exampleChinese: "妈妈对客人说“请慢用”。", tag: "客套" },
  { thai: "ครับผม เข้าใจแล้ว", id: "khrap-phom-khao-jai-laaeo", roman: "khrap phom, khao-jai laaeo", chinese: "好的，我明白了（男性礼貌）", partOfSpeech: "短语", theme: "句尾小词", exampleThai: "เมื่อครูอธิบายจบ เขาพูดว่าครับผม เข้าใจแล้ว", exampleRoman: "muea khruu a-thi-baai jop, khao phuut waa khrap phom, khao-jai laaeo", exampleChinese: "老师解释完后，他说“好的，我明白了”。", tag: "小词" },
  { thai: "ค่ะ เข้าใจแล้ว", id: "kha-khao-jai-laaeo", roman: "kha, khao-jai laaeo", chinese: "好的，明白了（女性礼貌）", partOfSpeech: "短语", theme: "句尾小词", exampleThai: "เมื่อแม่พูดจบ ฉันตอบว่าค่ะ เข้าใจแล้ว", exampleRoman: "muea maae phuut jop, chan dtaawp waa kha, khao-jai laaeo", exampleChinese: "妈妈说完后，我回答“好的，明白了”。", tag: "小词" },
];

const greetingRows = people.map((person): Definition => ({
  thai: `สวัสดีค่ะ${person.thai}`,
  id: `sa-wat-dii-kha-${person.id}`,
  roman: `sa-wat-dii kha ${person.roman}`,
  chinese: `你好，${person.chinese}（女性礼貌）`,
  partOfSpeech: "短语",
  theme: "打招呼",
  exampleThai: `ตอนเช้าฉันพูดว่า สวัสดีค่ะ${person.thai}`,
  exampleRoman: `dtaawn chaao chan phuut waa sa-wat-dii kha ${person.roman}`,
  exampleChinese: `早上我说“你好，${person.chinese}”。`,
  tag: "问候",
}));

const maleGreetingRows = people.slice(0, 12).map((person): Definition => ({
  thai: `สวัสดีครับ${person.thai}`,
  id: `sa-wat-dii-khrap-${person.id}`,
  roman: `sa-wat-dii khrap ${person.roman}`,
  chinese: `你好，${person.chinese}（男性礼貌）`,
  partOfSpeech: "短语",
  theme: "打招呼",
  exampleThai: `เขาพูดว่า สวัสดีครับ${person.thai}อย่างสุภาพ`,
  exampleRoman: `khao phuut waa sa-wat-dii khrap ${person.roman} yaang su-phaap`,
  exampleChinese: `他礼貌地说“你好，${person.chinese}”。`,
  tag: "问候",
}));

const thankRows = thankActions.map((action): Definition => ({
  thai: `ขอบคุณค่ะที่${action.thai}`,
  id: `khaawp-khun-kha-thii-${action.id}`,
  roman: `khaawp-khun kha thii ${action.roman}`,
  chinese: `谢谢你${action.chinese}（女性礼貌）`,
  partOfSpeech: "短语",
  theme: "道谢",
  exampleThai: `ฉันพูดว่า ขอบคุณค่ะที่${action.thai}`,
  exampleRoman: `chan phuut waa khaawp-khun kha thii ${action.roman}`,
  exampleChinese: `我说“谢谢你${action.chinese}”。`,
  tag: "道谢",
}));

const requestRows = requestActions.map((action): Definition => ({
  thai: `ช่วย${action.thai}ได้ไหมคะ`,
  id: `chuai-${action.id}-dai-mai-kha`,
  roman: `chuai ${action.roman} dai mai kha`,
  chinese: `可以请你${action.chinese}吗（女性礼貌）`,
  partOfSpeech: "短语",
  theme: "请",
  exampleThai: `ถ้าต้องการความช่วยเหลือ ฉันพูดว่า ช่วย${action.thai}ได้ไหมคะ`,
  exampleRoman: `thaa dtawng-gaan khwaam chuai-leuua, chan phuut waa chuai ${action.roman} dai mai kha`,
  exampleChinese: `需要帮助时，我说“可以请你${action.chinese}吗？”`,
  tag: "请求",
}));

const apologyRows = thankActions.slice(0, 16).map((action): Definition => ({
  thai: `ขอโทษค่ะที่ไม่ได้${action.thai}`,
  id: `khaaw-thoot-kha-thii-mai-dai-${action.id}`,
  roman: `khaaw-thoot kha thii mai dai ${action.roman}`,
  chinese: `抱歉没能${action.chinese}`,
  partOfSpeech: "短语",
  theme: "道歉",
  exampleThai: `เมื่อทำไม่ได้ ฉันพูดว่า ขอโทษค่ะที่ไม่ได้${action.thai}`,
  exampleRoman: `muea tham mai dai, chan phuut waa khaaw-thoot kha thii mai dai ${action.roman}`,
  exampleChinese: `做不到时，我说“抱歉没能${action.chinese}”。`,
  tag: "道歉",
}));

const responseRows = requestActions.slice(0, 16).map((action): Definition => ({
  thai: `ได้ค่ะ เดี๋ยว${action.thai}`,
  id: `dai-kha-diao-${action.id}`,
  roman: `dai kha, diao ${action.roman}`,
  chinese: `可以，我等下${action.chinese}（女性礼貌回应）`,
  partOfSpeech: "短语",
  theme: "礼貌回应",
  exampleThai: `เมื่อเพื่อนขอ ฉันตอบว่า ได้ค่ะ เดี๋ยว${action.thai}`,
  exampleRoman: `muea phuean khaaw, chan dtaawp waa dai kha, diao ${action.roman}`,
  exampleChinese: `朋友请求时，我回答“可以，我等下${action.chinese}”。`,
  tag: "回应",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...greetingRows,
  ...maleGreetingRows,
  ...thankRows,
  ...requestRows,
  ...apologyRows,
  ...responseRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a1", "礼貌问候", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a1",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A1 阶段优先把礼貌小词 ค่ะ/ครับ/นะ 放在完整句块里记，开口更自然。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于打招呼、道谢、道歉、请求、回应、再见、称呼和常用礼貌句尾小词搭配。"],
    tags,
    sourceRefs: POLITE_PHRASES_GREETING_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A1_POLITE_PHRASES_GREETINGS_01 = rows.map(toCandidate);
