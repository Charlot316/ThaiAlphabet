export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "连词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicReasonExcusesTheme =
  | "原因"
  | "堵车"
  | "生病"
  | "忘记"
  | "太忙"
  | "不方便"
  | "临时有事"
  | "所以不能"
  | "需要改期"
  | "道歉补救";

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
  theme: BasicReasonExcusesTheme,
];

const BASIC_REASON_EXCUSES_REFS = [
  "worker-a-a2-basic-reason-excuses",
  "basic-thai-reasons-excuses",
];

const rows: Row[] = [
  ["phraw", "เพราะ", "phraw", "因为", "连词", "原因"],
  ["phraw-waa", "เพราะว่า", "phraw waa", "因为……", "连词", "原因"],
  ["sa-het", "สาเหตุ", "saa-heet", "原因", "名词", "原因"],
  ["het-phon", "เหตุผล", "heet phon", "理由", "名词", "原因"],
  ["bpen-phraw", "เป็นเพราะ", "bpen phraw", "是因为", "句型", "原因"],
  ["thii-maa-mai-dai-phraw", "ที่มาไม่ได้เพราะ", "thii maa mai dai phraw", "不能来是因为……", "句型", "原因"],
  ["khue-waa", "คือว่า", "khue waa", "是这样的；就是说", "句型", "原因"],
  ["mi-rueng", "มีเรื่อง", "mii rueang", "有事；有情况", "句型", "原因"],
  ["mi-het-phon", "มีเหตุผล", "mii heet phon", "有理由", "句型", "原因"],
  ["mai-mi-het-phon", "ไม่มีเหตุผล", "mai mii heet phon", "没有理由", "句型", "原因"],
  ["rot-dtit", "รถติด", "rot dtit", "堵车", "形容词", "堵车"],
  ["rot-dtit-mak", "รถติดมาก", "rot dtit maak", "很堵车", "句型", "堵车"],
  ["jaraajon-dtit", "จราจรติด", "ja-raa-jaawn dtit", "交通堵塞", "句型", "堵车"],
  ["thang-dtit", "ทางติด", "thaang dtit", "路堵", "句型", "堵车"],
  ["rot-yuh", "รถเยอะ", "rot yuh", "车很多", "句型", "堵车"],
  ["fang-dtong-khaam-dtit", "ฝั่งตรงข้ามติด", "fang dtrong khaam dtit", "对面方向堵", "句型", "堵车"],
  ["awk-maa-chaa", "ออกมาช้า", "awk maa chaa", "出门晚了", "句型", "堵车"],
  ["maa-chaa-phraw-rot-dtit", "มาช้าเพราะรถติด", "maa chaa phraw rot dtit", "因为堵车来晚了", "句型", "堵车"],
  ["doen-thaang-naan", "เดินทางนาน", "doen thaang naan", "路上花很久", "句型", "堵车"],
  ["thang-uen-gaw-dtit", "ทางอื่นก็ติด", "thaang uen gaw dtit", "别的路也堵", "句型", "堵车"],
  ["bpuai", "ป่วย", "bpuai", "生病", "形容词", "生病"],
  ["mai-sabai", "ไม่สบาย", "mai sa-baai", "不舒服；生病", "形容词", "生病"],
  ["bpuai-nit-noi", "ป่วยนิดหน่อย", "bpuai nit noi", "有点生病", "句型", "生病"],
  ["bpuat-hua", "ปวดหัว", "bpuat hua", "头痛", "动词", "生病"],
  ["jeb-khaaw", "เจ็บคอ", "jep khaaw", "喉咙痛", "动词", "生病"],
  ["mi-khai", "มีไข้", "mii khai", "发烧", "句型", "生病"],
  ["dtawng-bpai-haa-moo", "ต้องไปหาหมอ", "dtawng bpai haa maaw", "需要去看医生", "句型", "生病"],
  ["phak-phaawn", "พักผ่อน", "phak phaawn", "休息", "动词", "生病"],
  ["laa-bpuai", "ลาป่วย", "laa bpuai", "请病假", "动词", "生病"],
  ["maa-mai-dai-phraw-bpuai", "มาไม่ได้เพราะป่วย", "maa mai dai phraw bpuai", "因为生病不能来", "句型", "生病"],
  ["luem", "ลืม", "luem", "忘记", "动词", "忘记"],
  ["luem-laew", "ลืมแล้ว", "luem laew", "已经忘了", "句型", "忘记"],
  ["luem-welaa", "ลืมเวลา", "luem we-laa", "忘了时间", "动词", "忘记"],
  ["luem-nat", "ลืมนัด", "luem nat", "忘了预约/约定", "动词", "忘记"],
  ["luem-song", "ลืมส่ง", "luem song", "忘了提交/发送", "动词", "忘记"],
  ["luem-ao-maa", "ลืมเอามา", "luem ao maa", "忘了带来", "动词", "忘记"],
  ["luem-tham", "ลืมทำ", "luem tham", "忘了做", "动词", "忘记"],
  ["jam-mai-dai", "จำไม่ได้", "jam mai dai", "记不起来", "句型", "忘记"],
  ["khaaw-thoot-thii-luem", "ขอโทษที่ลืม", "khaaw thoot thii luem", "抱歉忘了", "句型", "忘记"],
  ["diao-tham-hai-mai", "เดี๋ยวทำให้ใหม่", "diao tham hai mai", "等一下重新帮你做", "句型", "忘记"],
  ["yung", "ยุ่ง", "yung", "忙；事情多", "形容词", "太忙"],
  ["yung-mak", "ยุ่งมาก", "yung maak", "很忙", "句型", "太忙"],
  ["mai-waang", "ไม่ว่าง", "mai waang", "没空", "形容词", "太忙"],
  ["ngaan-yuh", "งานเยอะ", "ngaan yuh", "工作/任务很多", "句型", "太忙"],
  ["mi-ngaan-duan", "มีงานด่วน", "mii ngaan duan", "有急事/急活", "句型", "太忙"],
  ["dtaawn-nii-yung", "ตอนนี้ยุ่ง", "dtaawn nii yung", "现在忙", "句型", "太忙"],
  ["wan-nii-mai-waang", "วันนี้ไม่ว่าง", "wan nii mai waang", "今天没空", "句型", "太忙"],
  ["tham-mai-than", "ทำไม่ทัน", "tham mai than", "来不及做", "句型", "太忙"],
  ["dtawng-tham-ngaan", "ต้องทำงาน", "dtawng tham ngaan", "得工作", "句型", "太忙"],
  ["yung-jon-luem", "ยุ่งจนลืม", "yung jon luem", "忙到忘了", "句型", "太忙"],
  ["mai-saduak", "ไม่สะดวก", "mai sa-duak", "不方便", "形容词", "不方便"],
  ["dtaawn-nii-mai-saduak", "ตอนนี้ไม่สะดวก", "dtaawn nii mai sa-duak", "现在不方便", "句型", "不方便"],
  ["wan-nii-mai-saduak", "วันนี้ไม่สะดวก", "wan nii mai sa-duak", "今天不方便", "句型", "不方便"],
  ["mai-saduak-bpai", "ไม่สะดวกไป", "mai sa-duak bpai", "不方便去", "句型", "不方便"],
  ["mai-saduak-phuut", "ไม่สะดวกพูด", "mai sa-duak phuut", "不方便说话", "句型", "不方便"],
  ["mai-saduak-rap-saai", "ไม่สะดวกรับสาย", "mai sa-duak rap saai", "不方便接电话", "句型", "不方便"],
  ["thaa-saduak-ja-dtaawp", "ถ้าสะดวกจะตอบ", "thaa sa-duak ja dtaawp", "方便时会回复", "句型", "不方便"],
  ["khaaw-tit-dtaaw-glap", "ขอติดต่อกลับ", "khaaw dtit dtaaw glap", "请求稍后再联系", "句型", "不方便"],
  ["mai-saduak-jing-jing", "ไม่สะดวกจริง ๆ", "mai sa-duak jing jing", "真的不方便", "句型", "不方便"],
  ["khaaw-aphai-thii-mai-saduak", "ขออภัยที่ไม่สะดวก", "khaaw a-phai thii mai sa-duak", "抱歉不方便", "句型", "不方便"],
  ["mi-thura", "มีธุระ", "mii thu-ra", "有事；有私事", "句型", "临时有事"],
  ["mi-thura-duan", "มีธุระด่วน", "mii thu-ra duan", "有急事", "句型", "临时有事"],
  ["mi-rueng-duan", "มีเรื่องด่วน", "mii rueang duan", "有急事", "句型", "临时有事"],
  ["gathanhang", "กะทันหัน", "ga-than-han", "突然；临时", "副词", "临时有事"],
  ["mi-ngaan-khao-maa", "มีงานเข้ามา", "mii ngaan khao maa", "临时来了工作", "句型", "临时有事"],
  ["dtawng-bpai-thura", "ต้องไปธุระ", "dtawng bpai thu-ra", "得去办事", "句型", "临时有事"],
  ["thura-thii-baan", "ธุระที่บ้าน", "thu-ra thii baan", "家里有事", "名词", "临时有事"],
  ["plian-phaaen-gathanhan", "เปลี่ยนแผนกะทันหัน", "bpliian phaaen ga-than-han", "临时改计划", "句型", "临时有事"],
  ["maa-mai-than-phraw-mi-thura", "มาไม่ทันเพราะมีธุระ", "maa mai than phraw mii thu-ra", "因为有事来不及", "句型", "临时有事"],
  ["khaaw-jaeng-luang-naa-mai-than", "ขอแจ้งล่วงหน้าไม่ทัน", "khaaw jaaeng luang naa mai than", "来不及提前通知", "句型", "临时有事"],
  ["loei", "เลย", "loei", "所以；于是", "副词", "所以不能"],
  ["dang-nan", "ดังนั้น", "dang nan", "因此；所以", "副词", "所以不能"],
  ["go-loei", "ก็เลย", "gaw loei", "所以就……", "句型", "所以不能"],
  ["tham-hai", "ทำให้", "tham hai", "导致；让……", "动词", "所以不能"],
  ["bpai-mai-dai", "ไปไม่ได้", "bpai mai dai", "不能去", "句型", "所以不能"],
  ["maa-mai-dai", "มาไม่ได้", "maa mai dai", "不能来", "句型", "所以不能"],
  ["tham-mai-dai", "ทำไม่ได้", "tham mai dai", "不能做", "句型", "所以不能"],
  ["song-mai-than", "ส่งไม่ทัน", "song mai than", "来不及提交", "句型", "所以不能"],
  ["dtaawp-mai-than", "ตอบไม่ทัน", "dtaawp mai than", "来不及回复", "句型", "所以不能"],
  ["dtawng-yok-loek", "ต้องยกเลิก", "dtawng yok loek", "必须取消", "句型", "所以不能"],
  ["luean-nat", "เลื่อนนัด", "leuan nat", "改期；推迟预约", "动词", "需要改期"],
  ["plian-welaa", "เปลี่ยนเวลา", "bpliian we-laa", "改时间", "动词", "需要改期"],
  ["plian-wan", "เปลี่ยนวัน", "bpliian wan", "改日期", "动词", "需要改期"],
  ["khaaw-luean-nat", "ขอเลื่อนนัด", "khaaw leuan nat", "请求改期", "句型", "需要改期"],
  ["luean-bpen-phrung-nii", "เลื่อนเป็นพรุ่งนี้", "leuan bpen phrung nii", "改到明天", "句型", "需要改期"],
  ["luean-bpen-wan-uen", "เลื่อนเป็นวันอื่น", "leuan bpen wan uen", "改到别的日子", "句型", "需要改期"],
  ["nat-mai", "นัดใหม่", "nat mai", "重新约", "动词", "需要改期"],
  ["jaawng-mai", "จองใหม่", "jaawng mai", "重新预约", "动词", "需要改期"],
  ["wan-uen-dai-mai", "วันอื่นได้ไหม", "wan uen dai mai", "别的日子可以吗", "句型", "需要改期"],
  ["welaa-uen-dai-mai", "เวลาอื่นได้ไหม", "we-laa uen dai mai", "别的时间可以吗", "句型", "需要改期"],
  ["khaaw-thoot", "ขอโทษ", "khaaw thoot", "对不起；抱歉", "短语", "道歉补救"],
  ["khaaw-aphai", "ขออภัย", "khaaw a-phai", "抱歉；较正式", "短语", "道歉补救"],
  ["khaaw-thoot-jing-jing", "ขอโทษจริง ๆ", "khaaw thoot jing jing", "真的很抱歉", "句型", "道歉补救"],
  ["khaaw-aphai-nai-khwaam-mai-saduak", "ขออภัยในความไม่สะดวก", "khaaw a-phai nai khwaam mai sa-duak", "对不便表示歉意", "句型", "道歉补救"],
  ["ja-reeb-tham", "จะรีบทำ", "ja riip tham", "会赶快做", "句型", "道歉补救"],
  ["ja-song-hai-wai-thii-sut", "จะส่งให้ไวที่สุด", "ja song hai wai thii sut", "会尽快发给你", "句型", "道歉补救"],
  ["ja-dtaawp-glap", "จะตอบกลับ", "ja dtaawp glap", "会回复", "句型", "道歉补救"],
  ["ja-jaeng-iik-khrang", "จะแจ้งอีกครั้ง", "ja jaaeng iik khrang", "会再次通知", "句型", "道歉补救"],
  ["khaaw-ookaat-iik-khrang", "ขอโอกาสอีกครั้ง", "khaaw oo-gaat iik khrang", "请求再给一次机会", "句型", "道歉补救"],
  ["khawp-khun-thii-khao-jai", "ขอบคุณที่เข้าใจ", "khaawp khun thii khao jai", "感谢理解", "句型", "道歉补救"],
];

const relatedByTheme: Record<
  BasicReasonExcusesTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  原因: {
    synonym: "เหตุผล / heet phon / 理由",
    antonym: "ไม่มีเหตุผล / mai mii heet phon / 没有理由",
    comparison: "เพราะว่า 接原因，ดังนั้น 接结果；不要把顺序混掉。",
    collocation: "ขออธิบายเหตุผล / khaaw a-thi-baai heet phon / 请允许解释理由",
  },
  堵车: {
    synonym: "รถติด / rot dtit / 堵车",
    antonym: "ทางโล่ง / thaang loong / 路况通畅",
    comparison: "รถติด 是常见口语，จราจรติด 更像说交通堵塞。",
    collocation: "มาช้าเพราะรถติด / maa chaa phraw rot dtit / 因为堵车来晚了",
  },
  生病: {
    synonym: "ไม่สบาย / mai sa-baai / 不舒服、生病",
    antonym: "สบายดี / sa-baai dii / 身体好",
    comparison: "ป่วย 直接说生病，ไม่สบาย 语气更日常。",
    collocation: "ลาป่วยเพราะมีไข้ / laa bpuai phraw mii khai / 因为发烧请病假",
  },
  忘记: {
    synonym: "ลืม / luem / 忘记",
    antonym: "จำได้ / jam dai / 记得",
    comparison: "ลืม 是忘了做或带，จำไม่ได้ 是想不起来。",
    collocation: "ขอโทษที่ลืมส่งงาน / khaaw thoot thii luem song ngaan / 抱歉忘了提交作业",
  },
  太忙: {
    synonym: "ยุ่งมาก / yung maak / 很忙",
    antonym: "ว่าง / waang / 有空",
    comparison: "ยุ่ง 是忙，ไม่ว่าง 是没空；两者都可解释不能赴约。",
    collocation: "ช่วงนี้งานเยอะมาก / chuang nii ngaan yuh maak / 最近工作很多",
  },
  不方便: {
    synonym: "ไม่สะดวก / mai sa-duak / 不方便",
    antonym: "สะดวก / sa-duak / 方便",
    comparison: "不想明说原因时，ไม่สะดวก 是比较礼貌的说法。",
    collocation: "ตอนนี้ไม่สะดวกรับสาย / dtaawn nii mai sa-duak rap saai / 现在不方便接电话",
  },
  临时有事: {
    synonym: "มีธุระด่วน / mii thu-ra duan / 有急事",
    antonym: "ไม่มีธุระ / mai mii thu-ra / 没有事",
    comparison: "ธุระ 常指要处理的私事或事务，กะทันหัน 表示突然发生。",
    collocation: "มีธุระด่วนกะทันหัน / mii thu-ra duan ga-than-han / 突然有急事",
  },
  所以不能: {
    synonym: "ก็เลย / gaw loei / 所以就",
    antonym: "ยังทำได้ / yang tham dai / 还能做",
    comparison: "เลย 常接自然结果；ดังนั้น 更书面一点。",
    collocation: "ป่วยก็เลยมาไม่ได้ / bpuai gaw loei maa mai dai / 生病所以不能来",
  },
  需要改期: {
    synonym: "ขอเลื่อนนัด / khaaw leuan nat / 请求改期",
    antonym: "ตามนัดเดิม / dtaam nat doem / 按原约定",
    comparison: "เลื่อนนัด 是改预约，เปลี่ยนเวลา 是改时间。",
    collocation: "ขอเลื่อนนัดเป็นวันอื่น / khaaw leuan nat bpen wan uen / 请求改到别的日子",
  },
  道歉补救: {
    synonym: "ขอโทษจริง ๆ / khaaw thoot jing jing / 真的很抱歉",
    antonym: "ไม่ขอโทษ / mai khaaw thoot / 不道歉",
    comparison: "ขอโทษ 偏日常，ขออภัย 更正式；道歉后最好说明补救。",
    collocation: "ขอโทษจริง ๆ จะรีบทำให้ / khaaw thoot jing jing ja riip tham hai / 真的抱歉，会赶快帮你做",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เมื่ออธิบายเหตุผลที่ทำไม่ได้ ฉันใช้คำว่า “${row[1]}” แล้วบอกทางแก้หรือเวลาที่สะดวกใหม่`,
  roman: `muea a-thi-baai heet phon thii tham mai dai chan chai kham waa "${row[2]}" laew baawk thaang gaae rue we-laa thii sa-duak mai`,
  chinese: `解释为什么做不到时，我会用“${row[1]}”，然后说明补救办法或新的方便时间。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "原因借口改期", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 解释原因和借口表达。适合说明堵车、生病、忘记、太忙、不方便、临时有事，以及请求改期；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_REASON_EXCUSES_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_REASON_EXCUSES_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
