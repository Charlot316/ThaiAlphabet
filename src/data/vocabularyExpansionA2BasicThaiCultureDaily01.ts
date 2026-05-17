export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicThaiCultureDailyTheme =
  | "寺庙"
  | "礼貌"
  | "鞋子"
  | "排队"
  | "送礼"
  | "节日"
  | "家庭称呼"
  | "基本禁忌"
  | "饮食习惯"
  | "日常尊重";

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
  theme: BasicThaiCultureDailyTheme,
];

const BASIC_THAI_CULTURE_DAILY_REFS = [
  "worker-a-a2-basic-thai-culture-daily",
  "basic-thai-daily-culture",
];

const rows: Row[] = [
  ["wat", "วัด", "wat", "寺庙", "名词", "寺庙"],
  ["phra", "พระ", "phra", "僧人；佛像", "名词", "寺庙"],
  ["phra-phut-tha-ruup", "พระพุทธรูป", "phra phut-tha ruup", "佛像", "名词", "寺庙"],
  ["bot", "โบสถ์", "boot", "寺庙里的佛殿", "名词", "寺庙"],
  ["chedii", "เจดีย์", "jee-dii", "佛塔", "名词", "寺庙"],
  ["wai-phra", "ไหว้พระ", "wai phra", "拜佛；礼佛", "动词", "寺庙"],
  ["tham-bun", "ทำบุญ", "tham bun", "做功德；行善布施", "动词", "寺庙"],
  ["sai-baat", "ใส่บาตร", "sai baat", "给僧人布施食物", "动词", "寺庙"],
  ["thawaai-dawk-mai", "ถวายดอกไม้", "tha-waai daawk mai", "献花", "动词", "寺庙"],
  ["joot-thuup", "จุดธูป", "jut thuup", "点香", "动词", "寺庙"],
  ["thian", "เทียน", "thian", "蜡烛", "名词", "寺庙"],
  ["dawk-bua", "ดอกบัว", "daawk bua", "莲花", "名词", "寺庙"],
  ["su-phaap", "สุภาพ", "su-phaap", "礼貌的", "形容词", "礼貌"],
  ["mi-ma-ra-yaat", "มีมารยาท", "mii maa-ra-yaat", "有礼貌；懂礼节", "短语", "礼貌"],
  ["maa-ra-yaat", "มารยาท", "maa-ra-yaat", "礼貌；礼节", "名词", "礼貌"],
  ["phuut-su-phaap", "พูดสุภาพ", "phuut su-phaap", "说话礼貌", "动词", "礼貌"],
  ["khaaw-thoot-khrap-kha", "ขอโทษครับ/ค่ะ", "khaaw thoot khrap/kha", "礼貌地说抱歉", "短语", "礼貌"],
  ["khawp-khun-khrap-kha", "ขอบคุณครับ/ค่ะ", "khaawp khun khrap/kha", "礼貌地说谢谢", "短语", "礼貌"],
  ["khaaw-a-nu-yaat", "ขออนุญาต", "khaaw a-nu-yaat", "请允许；请求许可", "短语", "礼貌"],
  ["khaaw-rab-guuan", "ขอรบกวน", "khaaw rop guan", "麻烦您；打扰一下", "短语", "礼貌"],
  ["na-khrap-kha", "นะครับ/นะคะ", "na khrap/na kha", "柔和礼貌句尾", "短语", "礼貌"],
  ["wai", "ไหว้", "wai", "合十礼；行合十礼", "动词", "礼貌"],
  ["rawng-thao", "รองเท้า", "raawng thaao", "鞋子", "名词", "鞋子"],
  ["thaawt-rawng-thao", "ถอดรองเท้า", "thaawt raawng thaao", "脱鞋", "动词", "鞋子"],
  ["sai-rawng-thao", "ใส่รองเท้า", "sai raawng thaao", "穿鞋", "动词", "鞋子"],
  ["thii-wang-rawng-thao", "ที่วางรองเท้า", "thii waang raawng thaao", "放鞋处", "名词", "鞋子"],
  ["haam-sai-rawng-thao", "ห้ามใส่รองเท้า", "haam sai raawng thaao", "禁止穿鞋进入", "短语", "鞋子"],
  ["thaawt-rawng-thao-gaawn-khao", "ถอดรองเท้าก่อนเข้า", "thaawt raawng thaao gaawn khao", "进入前脱鞋", "句型", "鞋子"],
  ["rawng-thao-dtae", "รองเท้าแตะ", "raawng thaao dtae", "拖鞋；凉拖", "名词", "鞋子"],
  ["rawng-thao-nai-baan", "รองเท้าในบ้าน", "raawng thaao nai baan", "室内鞋", "名词", "鞋子"],
  ["yak-rawng-thao", "แยกรองเท้า", "yaaek raawng thaao", "把鞋分开放", "动词", "鞋子"],
  ["yaa-yiap", "อย่าเหยียบ", "yaa yiap", "不要踩", "句型", "鞋子"],
  ["dtaaw-thaaeo", "ต่อแถว", "dtaaw thaaeo", "排队", "动词", "排队"],
  ["khao-khiu", "เข้าคิว", "khao khiu", "排队；进入队伍", "动词", "排队"],
  ["raw-khiu", "รอคิว", "raaw khiu", "等号；等排队", "动词", "排队"],
  ["bat-khiu", "บัตรคิว", "bat khiu", "排队号", "名词", "排队"],
  ["khiu-khaawng-khun", "คิวของคุณ", "khiu khaawng khun", "您的号码/队列", "名词", "排队"],
  ["haam-saaeng-khiu", "ห้ามแซงคิว", "haam saaeng khiu", "禁止插队", "短语", "排队"],
  ["saaeng-khiu", "แซงคิว", "saaeng khiu", "插队", "动词", "排队"],
  ["dtaaw-thaaeo-thii-nii", "ต่อแถวที่นี่", "dtaaw thaaeo thii nii", "在这里排队", "句型", "排队"],
  ["raw-haai-thueng-khiu", "รอให้ถึงคิว", "raaw hai thueng khiu", "等到轮到自己", "句型", "排队"],
  ["khiu-dtaaw-bpai", "คิวต่อไป", "khiu dtaaw bpai", "下一号", "名词", "排队"],
  ["khaawng-khwan", "ของขวัญ", "khaawng khwan", "礼物", "名词", "送礼"],
  ["hai-khaawng-khwan", "ให้ของขวัญ", "hai khaawng khwan", "送礼物", "动词", "送礼"],
  ["rap-khaawng-khwan", "รับของขวัญ", "rap khaawng khwan", "收礼物", "动词", "送礼"],
  ["sue-khaawng-fak", "ซื้อของฝาก", "sue khaawng faak", "买伴手礼", "动词", "送礼"],
  ["khaawng-fak", "ของฝาก", "khaawng faak", "伴手礼；带回来的礼物", "名词", "送礼"],
  ["hiiw-khaawng-fak", "หิ้วของฝาก", "hiw khaawng faak", "带伴手礼", "动词", "送礼"],
  ["sai-thung", "ใส่ถุง", "sai thung", "装进袋子", "动词", "送礼"],
  ["haw-khaawng-khwan", "ห่อของขวัญ", "haaw khaawng khwan", "包装礼物", "动词", "送礼"],
  ["yaak-hai", "อยากให้", "yaak hai", "想送给；想给", "句型", "送礼"],
  ["khaawp-khun-samrap-khaawng-khwan", "ขอบคุณสำหรับของขวัญ", "khaawp khun sam-rap khaawng khwan", "谢谢你的礼物", "句型", "送礼"],
  ["thee-sa-gaan", "เทศกาล", "thee-sa-gaan", "节日；节庆", "名词", "节日"],
  ["wan-yut", "วันหยุด", "wan yut", "假日；休息日", "名词", "节日"],
  ["song-graan", "สงกรานต์", "song-graan", "宋干节；泰国新年", "名词", "节日"],
  ["loi-gra-thong", "ลอยกระทง", "loi gra-thong", "水灯节", "名词", "节日"],
  ["wan-phra", "วันพระ", "wan phra", "佛日；佛教斋日", "名词", "节日"],
  ["wan-mae", "วันแม่", "wan mae", "母亲节", "名词", "节日"],
  ["wan-phaw", "วันพ่อ", "wan phaaw", "父亲节", "名词", "节日"],
  ["sawat-dii-bpii-mai", "สวัสดีปีใหม่", "sa-wat-dii bpii mai", "新年快乐", "短语", "节日"],
  ["len-naam", "เล่นน้ำ", "len naam", "玩水；泼水", "动词", "节日"],
  ["bpai-thiao-ngaan", "ไปเที่ยวงาน", "bpai thiao ngaan", "去逛节庆活动", "短语", "节日"],
  ["phii", "พี่", "phii", "哥哥/姐姐；称呼年长者", "名词", "家庭称呼"],
  ["naawng", "น้อง", "naawng", "弟弟/妹妹；称呼年幼者", "名词", "家庭称呼"],
  ["lung", "ลุง", "lung", "叔伯；对年长男性的亲切称呼", "名词", "家庭称呼"],
  ["bpaa", "ป้า", "bpaa", "姨/姑；对年长女性的亲切称呼", "名词", "家庭称呼"],
  ["naa-male", "น้า", "naa", "舅/姨；对父母辈较年轻者的称呼", "名词", "家庭称呼"],
  ["aa", "อา", "aa", "叔/姑；父亲弟妹辈称呼", "名词", "家庭称呼"],
  ["phaw-mae", "พ่อแม่", "phaaw mae", "父母", "名词", "家庭称呼"],
  ["puu-yaa", "ปู่ย่า", "bpuu yaa", "爷爷奶奶", "名词", "家庭称呼"],
  ["dtaa-yaai", "ตายาย", "dtaa yaai", "外公外婆", "名词", "家庭称呼"],
  ["khruu", "ครู", "khruu", "老师；也可作尊称", "名词", "家庭称呼"],
  ["haam-jap-hua", "ห้ามจับหัว", "haam jap hua", "不要摸头", "短语", "基本禁忌"],
  ["yaa-chii-naa", "อย่าชี้หน้า", "yaa chii naa", "不要指着别人脸", "句型", "基本禁忌"],
  ["yaa-yiap-ngoen", "อย่าเหยียบเงิน", "yaa yiap ngoen", "不要踩钱", "句型", "基本禁忌"],
  ["yaa-phuut-siang-dang", "อย่าพูดเสียงดัง", "yaa phuut siiang dang", "不要大声说话", "句型", "基本禁忌"],
  ["hai-kiat", "ให้เกียรติ", "hai kiat", "尊重；给面子", "动词", "基本禁忌"],
  ["rak-saa-khwaam-sa-aat", "รักษาความสะอาด", "rak-saa khwaam sa-aat", "保持清洁", "动词", "基本禁忌"],
  ["mai-suup-bu-rii", "ไม่สูบบุหรี่", "mai suup bu-rii", "不吸烟", "短语", "基本禁忌"],
  ["haam-thaai-ruup", "ห้ามถ่ายรูป", "haam thaai ruup", "禁止拍照", "短语", "基本禁忌"],
  ["haam-khao", "ห้ามเข้า", "haam khao", "禁止进入", "短语", "基本禁忌"],
  ["phuen-thii-su-phaap", "พื้นที่สุภาพ", "phuen thii su-phaap", "需要礼貌安静的区域", "名词", "基本禁忌"],
  ["gin-khaao-ruam-gan", "กินข้าวร่วมกัน", "gin khaao ruam gan", "一起吃饭", "动词", "饮食习惯"],
  ["chaawn", "ช้อน", "chaawn", "勺子", "名词", "饮食习惯"],
  ["sawm", "ส้อม", "saawm", "叉子", "名词", "饮食习惯"],
  ["chaawn-glaang", "ช้อนกลาง", "chaawn glaang", "公勺", "名词", "饮食习惯"],
  ["chai-chaawn-glaang", "ใช้ช้อนกลาง", "chai chaawn glaang", "使用公勺", "动词", "饮食习惯"],
  ["gin-phet", "กินเผ็ด", "gin phet", "吃辣", "动词", "饮食习惯"],
  ["mai-gin-phet", "ไม่กินเผ็ด", "mai gin phet", "不吃辣", "句型", "饮食习惯"],
  ["gin-jae", "กินเจ", "gin jee", "吃素斋", "动词", "饮食习惯"],
  ["aa-haan-jae", "อาหารเจ", "aa-haan jee", "素斋食物", "名词", "饮食习惯"],
  ["chuan-gin-khaao", "ชวนกินข้าว", "chuan gin khaao", "邀请一起吃饭", "动词", "饮食习惯"],
  ["khao-rop", "เคารพ", "khao rop", "尊敬；尊重", "动词", "日常尊重"],
  ["phuu-yai", "ผู้ใหญ่", "phuu yai", "长辈；成年人", "名词", "日常尊重"],
  ["dek", "เด็ก", "dek", "孩子；晚辈", "名词", "日常尊重"],
  ["hai-thaang", "ให้ทาง", "hai thaang", "让路", "动词", "日常尊重"],
  ["luuk-hai-phuu-yai", "ลุกให้ผู้ใหญ่", "luk hai phuu yai", "起身让座给长辈", "句型", "日常尊重"],
  ["phuut-gap-phuu-yai", "พูดกับผู้ใหญ่", "phuut gap phuu yai", "和长辈说话", "动词", "日常尊重"],
  ["fang-phuu-yai", "ฟังผู้ใหญ่", "fang phuu yai", "听长辈说话", "动词", "日常尊重"],
  ["tham-dtua-riap-raawy", "ทำตัวเรียบร้อย", "tham dtua riiap raawy", "举止规矩", "短语", "日常尊重"],
  ["geng-jai", "เกรงใจ", "greeng jai", "顾及别人；不好意思麻烦", "动词", "日常尊重"],
  ["mai-rab-guuan", "ไม่รบกวน", "mai rop guan", "不打扰", "短语", "日常尊重"],
];

const relatedByTheme: Record<
  BasicThaiCultureDailyTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  寺庙: {
    synonym: "วัด / wat / 寺庙",
    antonym: "นอกวัด / naawk wat / 寺外",
    comparison: "วัด 是寺庙，พระ 可指僧人或佛像，需看语境。",
    collocation: "ไปวัดทำบุญ / bpai wat tham bun / 去寺庙做功德",
  },
  礼貌: {
    synonym: "สุภาพ / su-phaap / 礼貌",
    antonym: "ไม่สุภาพ / mai su-phaap / 不礼貌",
    comparison: "นะครับ/นะคะ 能让句子更柔和，ครับ/ค่ะ 是基础礼貌句尾。",
    collocation: "พูดสุภาพกับทุกคน / phuut su-phaap gap thuk khon / 对大家礼貌说话",
  },
  鞋子: {
    synonym: "ถอดรองเท้า / thaawt raawng thaao / 脱鞋",
    antonym: "ใส่รองเท้า / sai raawng thaao / 穿鞋",
    comparison: "进入寺庙、家或部分店铺前，常会看到脱鞋提示。",
    collocation: "ถอดรองเท้าก่อนเข้า / thaawt raawng thaao gaawn khao / 进入前脱鞋",
  },
  排队: {
    synonym: "เข้าคิว / khao khiu / 排队",
    antonym: "แซงคิว / saaeng khiu / 插队",
    comparison: "ต่อแถว 和 เข้าคิว 都是排队，บัตรคิว 是号码牌。",
    collocation: "รอให้ถึงคิว / raaw hai thueng khiu / 等到轮到自己",
  },
  送礼: {
    synonym: "ของฝาก / khaawng faak / 伴手礼",
    antonym: "ไม่รับของขวัญ / mai rap khaawng khwan / 不收礼物",
    comparison: "ของขวัญ 是礼物，ของฝาก 是旅行或拜访时带的伴手礼。",
    collocation: "ซื้อของฝากให้ครอบครัว / sue khaawng faak hai khraawp khrua / 买伴手礼给家人",
  },
  节日: {
    synonym: "เทศกาล / thee-sa-gaan / 节日",
    antonym: "วันธรรมดา / wan tham-ma-daa / 平日",
    comparison: "สงกรานต์ 是泰国新年，ลอยกระทง 是水灯节。",
    collocation: "ไปเที่ยวงานสงกรานต์ / bpai thiao ngaan song-graan / 去逛宋干节活动",
  },
  家庭称呼: {
    synonym: "พี่ / phii / 年长哥哥姐姐式称呼",
    antonym: "น้อง / naawng / 年幼弟妹式称呼",
    comparison: "พี่ 和 น้อง 也常用于非亲属，表示年龄关系和亲切感。",
    collocation: "เรียกพี่ที่ร้าน / riiak phii thii raan / 在店里称呼对方为哥哥/姐姐",
  },
  基本禁忌: {
    synonym: "ห้าม / haam / 禁止",
    antonym: "อนุญาต / a-nu-yaat / 允许",
    comparison: "อย่า 是劝对方不要做，ห้าม 更像规则或标识里的禁止。",
    collocation: "อย่าพูดเสียงดังในวัด / yaa phuut siiang dang nai wat / 在寺庙不要大声说话",
  },
  饮食习惯: {
    synonym: "ช้อนกลาง / chaawn glaang / 公勺",
    antonym: "กินคนเดียว / gin khon diao / 一个人吃",
    comparison: "กินข้าว 可指吃饭，不一定只吃米饭；ช้อนกลาง 是共享菜时常用公勺。",
    collocation: "ใช้ช้อนกลางเมื่อกินข้าวร่วมกัน / chai chaawn glaang muea gin khaao ruam gan / 一起吃饭时使用公勺",
  },
  日常尊重: {
    synonym: "เคารพ / khao rop / 尊重",
    antonym: "ไม่ให้เกียรติ / mai hai kiat / 不尊重",
    comparison: "เกรงใจ 强调顾及别人、不好意思麻烦；เคารพ 更直接表示尊敬。",
    collocation: "พูดสุภาพกับผู้ใหญ่ / phuut su-phaap gap phuu yai / 和长辈礼貌说话",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เมื่ออยู่ในไทย ฉันใช้คำว่า “${row[1]}” เพื่อเข้าใจมารยาทง่าย ๆ และทำตัวให้เหมาะกับสถานที่`,
  roman: `muea yuu nai thai chan chai kham waa "${row[2]}" phuea khao-jai maa-ra-yaat ngaai ngaai lae tham dtua hai maw gap sa-thaan-thii`,
  chinese: `在泰国时，我会用“${row[1]}”来理解简单礼貌习惯，并让自己的行为适合场所。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "泰国日常文化", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 泰国日常文化表达。适合理解寺庙、礼貌、排队、送礼、家庭称呼和基本禁忌；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_THAI_CULTURE_DAILY_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_THAI_CULTURE_DAILY_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
