export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type SimpleFormalPoliteTheme =
  | "礼貌请求"
  | "方便条件"
  | "请确认"
  | "感谢配合"
  | "收到"
  | "已处理"
  | "稍等"
  | "抱歉打扰"
  | "正式通知"
  | "礼貌收尾";

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
  theme: SimpleFormalPoliteTheme,
];

const SIMPLE_FORMAL_POLITE_REFS = [
  "worker-a-a2-simple-formal-polite",
  "basic-thai-formal-polite",
];

const rows: Row[] = [
  ["khaaw-rop-guan", "ขอรบกวน", "khaaw rop guan", "麻烦您；打扰一下", "短语", "礼貌请求"],
  ["rop-guan", "รบกวน", "rop guan", "麻烦；打扰", "动词", "礼貌请求"],
  ["rop-guan-noi", "รบกวนหน่อย", "rop guan noi", "麻烦一下", "短语", "礼貌请求"],
  ["khaaw-khwaam-ga-ru-naa", "ขอความกรุณา", "khaaw khwaam ga-ru-naa", "恳请；请您帮忙", "短语", "礼貌请求"],
  ["ga-ru-naa", "กรุณา", "ga-ru-naa", "请；请您", "动词", "礼貌请求"],
  ["bproot", "โปรด", "bproot", "请；用于正式提示", "动词", "礼貌请求"],
  ["khaaw-a-nu-yaat", "ขออนุญาต", "khaaw a-nu-yaat", "请允许；请求许可", "短语", "礼貌请求"],
  ["khaaw-thaam", "ขอถาม", "khaaw thaam", "请问；想问", "句型", "礼貌请求"],
  ["khaaw-jaeng", "ขอแจ้ง", "khaaw jaaeng", "特此通知；想说明", "句型", "礼貌请求"],
  ["khaaw-welaa", "ขอเวลา", "khaaw we-laa", "请给一点时间", "句型", "礼貌请求"],
  ["saduak-mai", "สะดวกไหม", "sa-duak mai", "方便吗", "句型", "方便条件"],
  ["thaa-saduak", "ถ้าสะดวก", "thaa sa-duak", "如果方便的话", "句型", "方便条件"],
  ["thaa-mai-rop-guan", "ถ้าไม่รบกวน", "thaa mai rop guan", "如果不打扰的话", "句型", "方便条件"],
  ["thaa-mai-lam-baak", "ถ้าไม่ลำบาก", "thaa mai lam-baak", "如果不麻烦的话", "句型", "方便条件"],
  ["mai-saduak", "ไม่สะดวก", "mai sa-duak", "不方便", "形容词", "方便条件"],
  ["welaa-saduak", "เวลาสะดวก", "we-laa sa-duak", "方便的时间", "名词", "方便条件"],
  ["muea-saduak", "เมื่อสะดวก", "muea sa-duak", "方便时", "短语", "方便条件"],
  ["dtaam-saduak", "ตามสะดวก", "dtaam sa-duak", "按您方便", "短语", "方便条件"],
  ["wan-nii-saduak-mai", "วันนี้สะดวกไหม", "wan nii sa-duak mai", "今天方便吗", "句型", "方便条件"],
  ["phrung-nii-saduak-mai", "พรุ่งนี้สะดวกไหม", "phrung nii sa-duak mai", "明天方便吗", "句型", "方便条件"],
  ["ga-ru-naa-yuen-yan", "กรุณายืนยัน", "ga-ru-naa yuen yan", "请确认", "句型", "请确认"],
  ["khaaw-yuen-yan", "ขอยืนยัน", "khaaw yuen yan", "请确认；我确认", "句型", "请确认"],
  ["yuen-yan-laew", "ยืนยันแล้ว", "yuen yan laew", "已确认", "句型", "请确认"],
  ["yang-mai-yuen-yan", "ยังไม่ยืนยัน", "yang mai yuen yan", "尚未确认", "句型", "请确认"],
  ["khaaw-dtruat-saawp", "ขอตรวจสอบ", "khaaw dtruat saawp", "请允许核查", "句型", "请确认"],
  ["dtruat-saawp-iik-khrang", "ตรวจสอบอีกครั้ง", "dtruat saawp iik khrang", "再次核查", "短语", "请确认"],
  ["khaaw-muun-thuuk-dtawng-mai", "ข้อมูลถูกต้องไหม", "khaaw muun thuuk dtawng mai", "资料正确吗", "句型", "请确认"],
  ["dai-rap-laew-chai-mai", "ได้รับแล้วใช่ไหม", "dai rap laew chai mai", "已经收到了，对吗", "句型", "请确认"],
  ["khao-jai-dtrong-gan", "เข้าใจตรงกัน", "khao jai dtrong gan", "理解一致", "句型", "请确认"],
  ["khaaw-kham-dtaawp", "ขอคำตอบ", "khaaw kham dtaawp", "请求答复", "句型", "请确认"],
  ["khawp-khun", "ขอบคุณ", "khaawp khun", "谢谢", "短语", "感谢配合"],
  ["khawp-khun-maak", "ขอบคุณมาก", "khaawp khun maak", "非常感谢", "短语", "感谢配合"],
  ["khawp-khun-thii-chuai", "ขอบคุณที่ช่วย", "khaawp khun thii chuai", "感谢帮忙", "句型", "感谢配合"],
  ["khawp-khun-thii-jaeng", "ขอบคุณที่แจ้ง", "khaawp khun thii jaaeng", "感谢告知", "句型", "感谢配合"],
  ["khawp-khun-thii-raw", "ขอบคุณที่รอ", "khaawp khun thii raaw", "感谢等待", "句型", "感谢配合"],
  ["khawp-khun-thii-khao-jai", "ขอบคุณที่เข้าใจ", "khaawp khun thii khao jai", "感谢理解", "句型", "感谢配合"],
  ["khawp-khun-luang-naa", "ขอบคุณล่วงหน้า", "khaawp khun luang naa", "提前感谢", "短语", "感谢配合"],
  ["khawp-khun-samrap-khwaam-ruam-mue", "ขอบคุณสำหรับความร่วมมือ", "khaawp khun sam-rap khwaam ruam mue", "感谢配合", "句型", "感谢配合"],
  ["yin-dii", "ยินดี", "yin dii", "乐意；不客气", "形容词", "感谢配合"],
  ["duai-khwaam-yin-dii", "ด้วยความยินดี", "duai khwaam yin dii", "非常乐意；不客气", "短语", "感谢配合"],
  ["rap-thraap", "รับทราบ", "rap saap", "收到；知悉", "动词", "收到"],
  ["rap-thraap-laew", "รับทราบแล้ว", "rap saap laew", "已收到；已知悉", "句型", "收到"],
  ["dai-rap-laew", "ได้รับแล้ว", "dai rap laew", "已经收到", "句型", "收到"],
  ["dai-khaaw-khwaam-laew", "ได้ข้อความแล้ว", "dai khaaw khwaam laew", "已收到消息", "句型", "收到"],
  ["hen-laew", "เห็นแล้ว", "hen laew", "已经看到了", "句型", "收到"],
  ["aan-laew", "อ่านแล้ว", "aan laew", "已经读了", "句型", "收到"],
  ["song-maa-dai-loei", "ส่งมาได้เลย", "song maa dai loei", "可以直接发来", "句型", "收到"],
  ["ja-duu-hai", "จะดูให้", "ja duu hai", "会帮您看", "句型", "收到"],
  ["ja-dtaawp-glap", "จะตอบกลับ", "ja dtaawp glap", "会回复", "句型", "收到"],
  ["jaeng-hai-thraap-laew", "แจ้งให้ทราบแล้ว", "jaaeng hai saap laew", "已通知知悉", "句型", "收到"],
  ["damnoen-gaan-laew", "ดำเนินการแล้ว", "dam-noen gaan laew", "已办理；已处理", "句型", "已处理"],
  ["jat-gaan-laew", "จัดการแล้ว", "jat gaan laew", "已处理好了", "句型", "已处理"],
  ["gae-khai-laew", "แก้ไขแล้ว", "gaae khai laew", "已修改/处理", "句型", "已处理"],
  ["song-dtaaw-laew", "ส่งต่อแล้ว", "song dtaaw laew", "已转交", "句型", "已处理"],
  ["jaeng-laew", "แจ้งแล้ว", "jaaeng laew", "已通知", "句型", "已处理"],
  ["dtruat-laew", "ตรวจแล้ว", "dtruat laew", "已检查", "句型", "已处理"],
  ["set-laew", "เสร็จแล้ว", "set laew", "完成了", "句型", "已处理"],
  ["riiap-raawy-laew", "เรียบร้อยแล้ว", "riiap raawy laew", "已经办妥", "句型", "已处理"],
  ["gamlang-damnoen-gaan", "กำลังดำเนินการ", "gam-lang dam-noen gaan", "正在办理", "句型", "已处理"],
  ["raw-damnoen-gaan", "รอดำเนินการ", "raaw dam-noen gaan", "等待处理", "短语", "已处理"],
  ["raw-sak-khruu", "รอสักครู่", "raaw sak khruu", "请稍等", "短语", "稍等"],
  ["raw-sak-nit", "รอสักนิด", "raaw sak nit", "请等一下下", "短语", "稍等"],
  ["ga-ru-naa-raw", "กรุณารอ", "ga-ru-naa raaw", "请等待", "句型", "稍等"],
  ["khaaw-welaa-sak-khruu", "ขอเวลาสักครู่", "khaaw we-laa sak khruu", "请给一点时间", "句型", "稍等"],
  ["diao-duu-hai", "เดี๋ยวดูให้", "diao duu hai", "等一下帮您看", "句型", "稍等"],
  ["diao-dtruat-hai", "เดี๋ยวตรวจให้", "diao dtruat hai", "等一下帮您检查", "句型", "稍等"],
  ["iik-sak-khruu", "อีกสักครู่", "iik sak khruu", "再过一会儿", "短语", "稍等"],
  ["ga-ru-naa-thue-saai", "กรุณาถือสาย", "ga-ru-naa thue saai", "请不要挂电话", "句型", "稍等"],
  ["yaa-phoeng-waang-saai", "อย่าเพิ่งวางสาย", "yaa phoeng waang saai", "请先别挂电话", "句型", "稍等"],
  ["raw-bpra-maan-haa-naa-thii", "รอประมาณห้านาที", "raaw bpra-maan haa naa-thii", "大约等五分钟", "句型", "稍等"],
  ["khaaw-thoot", "ขอโทษ", "khaaw thoot", "对不起；抱歉", "短语", "抱歉打扰"],
  ["khaaw-a-phai", "ขออภัย", "khaaw a-phai", "抱歉；较正式", "短语", "抱歉打扰"],
  ["khaaw-thoot-thii-rop-guan", "ขอโทษที่รบกวน", "khaaw thoot thii rop guan", "抱歉打扰", "句型", "抱歉打扰"],
  ["khaaw-a-phai-thii-hai-raw", "ขออภัยที่ให้รอ", "khaaw a-phai thii hai raaw", "抱歉让您等待", "句型", "抱歉打扰"],
  ["khaaw-a-phai-nai-khwaam-mai-saduak", "ขออภัยในความไม่สะดวก", "khaaw a-phai nai khwaam mai sa-duak", "对不便表示歉意", "句型", "抱歉打扰"],
  ["khaaw-thoot-thii-dtaawp-chaa", "ขอโทษที่ตอบช้า", "khaaw thoot thii dtaawp chaa", "抱歉回复晚了", "句型", "抱歉打扰"],
  ["khaaw-thoot-thii-song-chaa", "ขอโทษที่ส่งช้า", "khaaw thoot thii song chaa", "抱歉发送晚了", "句型", "抱歉打扰"],
  ["khaaw-thoot-thii-phit-phlaat", "ขอโทษที่ผิดพลาด", "khaaw thoot thii phit phlaat", "抱歉出错了", "句型", "抱歉打扰"],
  ["mai-dai-dtang-jai", "ไม่ได้ตั้งใจ", "mai dai dtang jai", "不是故意的", "句型", "抱歉打扰"],
  ["khaaw-gae-khai", "ขอแก้ไข", "khaaw gaae khai", "请允许更正", "句型", "抱歉打扰"],
  ["khaaw-jaeng-hai-thraap", "ขอแจ้งให้ทราบ", "khaaw jaaeng hai saap", "特此通知", "句型", "正式通知"],
  ["rian-hai-thraap", "เรียนให้ทราบ", "rian hai saap", "敬告知悉", "句型", "正式通知"],
  ["bpra-gaat", "ประกาศ", "bpra-gaat", "公告", "名词", "正式通知"],
  ["khaaw-bpra-gaat", "ขอประกาศ", "khaaw bpra-gaat", "现公告；请求宣布", "句型", "正式通知"],
  ["jaeng-luang-naa", "แจ้งล่วงหน้า", "jaaeng luang naa", "提前通知", "动词", "正式通知"],
  ["jaeng-bplian-welaa", "แจ้งเปลี่ยนเวลา", "jaaeng bpliian we-laa", "通知改时间", "动词", "正式通知"],
  ["mi-phon-wan-nii", "มีผลวันนี้", "mii phon wan nii", "今天生效", "句型", "正式通知"],
  ["roem-chai-wan-phrung-nii", "เริ่มใช้วันพรุ่งนี้", "roem chai wan phrung nii", "明天开始使用/执行", "句型", "正式通知"],
  ["ga-ru-naa-tham-dtaam", "กรุณาทำตาม", "ga-ru-naa tham dtaam", "请遵照执行", "句型", "正式通知"],
  ["khaaw-khwaam-ruam-mue", "ขอความร่วมมือ", "khaaw khwaam ruam mue", "请求配合", "句型", "正式通知"],
  ["khawp-khun-iik-khrang", "ขอบคุณอีกครั้ง", "khaawp khun iik khrang", "再次感谢", "短语", "礼貌收尾"],
  ["duai-khwaam-khao-rop", "ด้วยความเคารพ", "duai khwaam khao rop", "谨致敬意；较正式收尾", "短语", "礼貌收尾"],
  ["laa-gaawn", "ลาก่อน", "laa gaawn", "再见", "短语", "礼貌收尾"],
  ["phop-gan-mai", "พบกันใหม่", "phop gan mai", "下次见", "短语", "礼貌收尾"],
  ["choen-dtit-dtaaw-mai", "เชิญติดต่อใหม่", "choen dtit dtaaw mai", "欢迎再次联系", "句型", "礼貌收尾"],
  ["yin-dii-hai-baaw-ri-gaan", "ยินดีให้บริการ", "yin dii hai baaw-ri-gaan", "乐意为您服务", "句型", "礼貌收尾"],
  ["khaaw-hai-wan-dii", "ขอให้วันดี", "khaaw hai wan dii", "祝您今天愉快", "句型", "礼貌收尾"],
  ["khaaw-hai-doen-thaang-bplaawt-phai", "ขอให้เดินทางปลอดภัย", "khaaw hai doen thaang bplaawt-phai", "祝一路平安", "句型", "礼貌收尾"],
  ["dtit-dtaaw-dai-thuk-welaa", "ติดต่อได้ทุกเวลา", "dtit dtaaw dai thuk we-laa", "随时可以联系", "句型", "礼貌收尾"],
  ["mi-arai-jaeng-dai", "มีอะไรแจ้งได้", "mii a-rai jaaeng dai", "有事可以告知", "句型", "礼貌收尾"],
];

const relatedByTheme: Record<
  SimpleFormalPoliteTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  礼貌请求: {
    synonym: "ขอรบกวน / khaaw rop guan / 麻烦您",
    antonym: "สั่งตรง ๆ / sang dtrong dtrong / 直接命令",
    comparison: "ขอรบกวน 比直接要求更客气；กรุณา、โปรด 更常见于正式通知。",
    collocation: "ขอรบกวนช่วยตรวจสอบ / khaaw rop guan chuai dtruat saawp / 麻烦您帮忙核查",
  },
  方便条件: {
    synonym: "ถ้าสะดวก / thaa sa-duak / 如果方便",
    antonym: "ไม่สะดวก / mai sa-duak / 不方便",
    comparison: "ถ้าสะดวก 给对方选择空间，ตามสะดวก 表示按对方方便来。",
    collocation: "ถ้าสะดวก กรุณาตอบกลับ / thaa sa-duak ga-ru-naa dtaawp glap / 如果方便，请回复",
  },
  请确认: {
    synonym: "กรุณายืนยัน / ga-ru-naa yuen yan / 请确认",
    antonym: "ยังไม่ยืนยัน / yang mai yuen yan / 尚未确认",
    comparison: "ยืนยัน 是确认，ตรวจสอบ 是检查核对，两个动作不同。",
    collocation: "กรุณายืนยันข้อมูล / ga-ru-naa yuen yan khaaw muun / 请确认资料",
  },
  感谢配合: {
    synonym: "ขอบคุณสำหรับความร่วมมือ / khaawp khun sam-rap khwaam ruam mue / 感谢配合",
    antonym: "ไม่ให้ความร่วมมือ / mai hai khwaam ruam mue / 不配合",
    comparison: "ขอบคุณที่... 后接对方做的事，ขอบคุณล่วงหน้า 是提前感谢。",
    collocation: "ขอบคุณที่เข้าใจและให้ความร่วมมือ / khaawp khun thii khao jai lae hai khwaam ruam mue / 感谢理解和配合",
  },
  收到: {
    synonym: "รับทราบ / rap saap / 收到、知悉",
    antonym: "ยังไม่ได้รับ / yang mai dai rap / 尚未收到",
    comparison: "รับทราบ 更像正式“知悉”，เห็นแล้ว 只是看到了。",
    collocation: "รับทราบแล้ว จะตอบกลับ / rap saap laew ja dtaawp glap / 已知悉，会回复",
  },
  已处理: {
    synonym: "ดำเนินการแล้ว / dam-noen gaan laew / 已办理",
    antonym: "รอดำเนินการ / raaw dam-noen gaan / 等待处理",
    comparison: "กำลังดำเนินการ 是正在处理，เรียบร้อยแล้ว 表示处理妥当。",
    collocation: "ดำเนินการเรียบร้อยแล้ว / dam-noen gaan riiap raawy laew / 已办理妥当",
  },
  稍等: {
    synonym: "รอสักครู่ / raaw sak khruu / 请稍等",
    antonym: "ทันที / than thii / 立刻",
    comparison: "รอสักครู่ 比 รอสักนิด 更正式；电话中常说 กรุณาถือสาย。",
    collocation: "กรุณารอสักครู่ / ga-ru-naa raaw sak khruu / 请稍等片刻",
  },
  抱歉打扰: {
    synonym: "ขออภัย / khaaw a-phai / 抱歉",
    antonym: "ไม่เป็นไร / mai bpen rai / 没关系",
    comparison: "ขอโทษ 日常常用，ขออภัย 更正式，适合通知或服务场景。",
    collocation: "ขออภัยในความไม่สะดวก / khaaw a-phai nai khwaam mai sa-duak / 对不便表示歉意",
  },
  正式通知: {
    synonym: "ขอแจ้งให้ทราบ / khaaw jaaeng hai saap / 特此通知",
    antonym: "ไม่แจ้ง / mai jaaeng / 不通知",
    comparison: "แจ้ง 是通知，ประกาศ 是公告；ขอความร่วมมือ 常用于请求大家配合。",
    collocation: "ขอแจ้งให้ทราบล่วงหน้า / khaaw jaaeng hai saap luang naa / 特此提前通知",
  },
  礼貌收尾: {
    synonym: "ขอบคุณอีกครั้ง / khaawp khun iik khrang / 再次感谢",
    antonym: "จบห้วน ๆ / jop huan huan / 生硬结束",
    comparison: "ยินดีให้บริการ 是服务场景收尾，ด้วยความเคารพ 更正式。",
    collocation: "ขอบคุณอีกครั้งและขอให้วันดี / khaawp khun iik khrang lae khaaw hai wan dii / 再次感谢，祝今天愉快",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาติดต่อเรื่องงานหรือบริการ ฉันใช้คำว่า “${row[1]}” เพื่อให้ข้อความสุภาพ ชัดเจน และไม่แข็งเกินไป`,
  roman: `we-laa dtit dtaaw rueang ngaan rue baaw-ri-gaan chan chai kham waa "${row[2]}" phuea hai khaaw khwaam su-phaap chat-jen lae mai khaeng goen bpai`,
  chinese: `联系工作或服务事项时，我会用“${row[1]}”让信息礼貌、清楚，也不显得太生硬。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "简单正式礼貌", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 简单正式和礼貌表达。适合消息、客服、工作沟通和公共通知；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: SIMPLE_FORMAL_POLITE_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_SIMPLE_FORMAL_POLITE_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
