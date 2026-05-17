export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type EverydayPoliteMessagesTheme =
  | "收到确认"
  | "感谢提醒"
  | "麻烦确认"
  | "方便回复"
  | "不急稍后"
  | "抱歉晚回"
  | "跟进催促"
  | "改期通知"
  | "文件照片"
  | "付款预约"
  | "情绪关心"
  | "收尾礼貌";

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
  theme: EverydayPoliteMessagesTheme,
];

const EVERYDAY_POLITE_MESSAGES_REFS = [
  "worker-a-a2-everyday-polite-messages",
  "basic-thai-chat-politeness",
];

const rows: Row[] = [
  ["rap-khaaw-khwaam-laew-kha", "รับข้อความแล้วค่ะ", "rap khaaw khwaam laew kha", "已收到消息（女用礼貌）", "句型", "收到确认"],
  ["rap-saap-rueng-nii-laew", "รับทราบเรื่องนี้แล้ว", "rap saap rueang nii laew", "已知悉这件事", "句型", "收到确认"],
  ["hen-khwaam-laew-na", "เห็นข้อความแล้วนะ", "hen khaaw khwaam laew na", "看到消息了", "句型", "收到确认"],
  ["dai-rap-file-laew", "ได้รับไฟล์แล้ว", "dai rap fai laew", "已经收到文件", "句型", "收到确认"],
  ["dai-rap-ruup-laew", "ได้รับรูปแล้ว", "dai rap ruup laew", "已经收到照片", "句型", "收到确认"],
  ["check-hai-laew-kha", "เช็กให้แล้วค่ะ", "chek hai laew kha", "已经帮忙检查了（女用礼貌）", "句型", "收到确认"],
  ["ja-damnoen-gaan-dtaaw", "จะดำเนินการต่อ", "ja dam-noen gaan dtaaw", "会继续处理", "句型", "收到确认"],
  ["diao-jaeng-glap-iik-thii", "เดี๋ยวแจ้งกลับอีกที", "diao jaaeng glap iik thii", "等下再回复通知", "句型", "收到确认"],
  ["khopkhun-thii-dtuean-na", "ขอบคุณที่เตือนนะ", "khaawp khun thii dteuan na", "谢谢提醒", "句型", "感谢提醒"],
  ["khopkhun-thii-bok-luang-na-tangtae-chao", "ขอบคุณที่บอกล่วงหน้าตั้งแต่เช้า", "khaawp khun thii baawk luang naa dtang-dtaae chao", "谢谢一早就提前告知", "句型", "感谢提醒"],
  ["khopkhun-thii-jaeng-raai-la-iat", "ขอบคุณที่แจ้งรายละเอียด", "khaawp khun thii jaaeng raai la-iat", "谢谢告知细节", "句型", "感谢提醒"],
  ["khopkhun-thii-chuai-check", "ขอบคุณที่ช่วยเช็ก", "khaawp khun thii chuai chek", "谢谢帮忙检查", "句型", "感谢提醒"],
  ["khopkhun-thii-song-hai-duu", "ขอบคุณที่ส่งให้ดู", "khaawp khun thii song hai duu", "谢谢发给我看", "句型", "感谢提醒"],
  ["khopkhun-thii-tid-dtaam-hai", "ขอบคุณที่ติดตามให้", "khaawp khun thii dtit dtaam hai", "谢谢帮忙跟进", "句型", "感谢提醒"],
  ["khopkhun-thii-raw-kham-dtaawp", "ขอบคุณที่รอคำตอบ", "khaawp khun thii raaw kham dtaawp", "谢谢等待答复", "句型", "感谢提醒"],
  ["khopkhun-thii-prap-hai", "ขอบคุณที่ปรับให้", "khaawp khun thii bprap hai", "谢谢帮忙调整", "句型", "感谢提醒"],
  ["ropguan-yuenyan-wela", "รบกวนยืนยันเวลา", "rop-guan yuen-yan we-laa", "麻烦确认时间", "句型", "麻烦确认"],
  ["ropguan-yuenyan-sathan-thii", "รบกวนยืนยันสถานที่", "rop-guan yuen-yan sa-thaan thii", "麻烦确认地点", "句型", "麻烦确认"],
  ["ropguan-check-yot-ngoen", "รบกวนเช็กยอดเงิน", "rop-guan chek yaawt ngoen", "麻烦核对金额", "句型", "麻烦确认"],
  ["ropguan-duu-file-na", "รบกวนดูไฟล์นะ", "rop-guan duu fai na", "麻烦看一下文件", "句型", "麻烦确认"],
  ["ropguan-top-sak-nit", "รบกวนตอบสักนิด", "rop-guan dtaawp sak nit", "麻烦回复一下", "句型", "麻烦确认"],
  ["ropguan-jaeng-khwaam-khuep-naa", "รบกวนแจ้งความคืบหน้า", "rop-guan jaaeng khwaam khuep naa", "麻烦告知进展", "句型", "麻烦确认"],
  ["ropguan-song-lakthan", "รบกวนส่งหลักฐาน", "rop-guan song lak-thaan", "麻烦发送凭证", "句型", "麻烦确认"],
  ["ropguan-kae-kham-phit", "รบกวนแก้คำผิด", "rop-guan gaae kham phit", "麻烦修改错字", "句型", "麻烦确认"],
  ["saduak-laew-khoi-top", "สะดวกแล้วค่อยตอบ", "sa-duak laew khaawy dtaawp", "方便时再回复", "句型", "方便回复"],
  ["top-muea-waang-dai", "ตอบเมื่อว่างได้", "dtaawp muea waang dai", "有空时回复即可", "句型", "方便回复"],
  ["thaa-saduak-chuai-duu", "ถ้าสะดวกช่วยดู", "thaa sa-duak chuai duu", "方便的话请帮忙看", "句型", "方便回复"],
  ["mai-dtong-top-than-thii", "ไม่ต้องตอบทันที", "mai dtawng dtaawp than-thii", "不用马上回复", "句型", "方便回复"],
  ["waang-muea-rai-khoi-khui", "ว่างเมื่อไรค่อยคุย", "waang muea rai khaawy khui", "什么时候有空再聊", "句型", "方便回复"],
  ["thaa-yung-yang-mai-dtong-top", "ถ้ายุ่งยังไม่ต้องตอบ", "thaa yung yang mai dtawng dtaawp", "忙的话暂时不用回", "句型", "方便回复"],
  ["saduak-thaang-nai-bok-dai", "สะดวกทางไหนบอกได้", "sa-duak thaang nai baawk dai", "哪种方式方便可以说", "句型", "方便回复"],
  ["top-glap-dai-tam-saduak", "ตอบกลับได้ตามสะดวก", "dtaawp glap dai dtaam sa-duak", "可按方便时间回复", "句型", "方便回复"],
  ["mai-riip-na", "ไม่รีบนะ", "mai riip na", "不急哦", "句型", "不急稍后"],
  ["mai-dtong-riip-maak", "ไม่ต้องรีบมาก", "mai dtawng riip maak", "不用太急", "句型", "不急稍后"],
  ["wai-phrueng-nii-go-dai", "ไว้พรุ่งนี้ก็ได้", "wai phrung nii gaw dai", "留到明天也可以", "句型", "不急稍后"],
  ["khoi-duu-ton-yen", "ค่อยดูตอนเย็น", "khaawy duu dtaawn yen", "傍晚再看", "句型", "不急稍后"],
  ["raw-dai-mai-pen-rai", "รอได้ไม่เป็นไร", "raaw dai mai bpen rai", "可以等，没关系", "句型", "不急稍后"],
  ["muea-phraawm-khoi-song", "เมื่อพร้อมค่อยส่ง", "muea phraawm khaawy song", "准备好再发送", "句型", "不急稍后"],
  ["mai-dtong-fao", "ไม่ต้องเฝ้า", "mai dtawng fao", "不用一直盯着", "句型", "不急稍后"],
  ["ao-thii-saduak-khun", "เอาที่สะดวกคุณ", "ao thii sa-duak khun", "按你方便的来", "句型", "不急稍后"],
  ["kho-thot-thii-top-duek", "ขอโทษที่ตอบดึก", "khaaw thoot thii dtaawp duek", "抱歉这么晚回复", "句型", "抱歉晚回"],
  ["kho-thot-phueng-hen-khwaam", "ขอโทษเพิ่งเห็นข้อความ", "khaaw thoot phoeng hen khaaw khwaam", "抱歉刚看到消息", "句型", "抱歉晚回"],
  ["kho-thot-wan-nii-yung", "ขอโทษวันนี้ยุ่ง", "khaaw thoot wan nii yung", "抱歉今天忙", "句型", "抱歉晚回"],
  ["kho-thot-thii-hai-raw-nan", "ขอโทษที่ให้รอนาน", "khaaw thoot thii hai raaw naan", "抱歉让你久等", "句型", "抱歉晚回"],
  ["kho-thot-mai-dai-rap-sai", "ขอโทษไม่ได้รับสาย", "khaaw thoot mai dai rap saai", "抱歉没接到电话", "句型", "抱歉晚回"],
  ["kho-thot-muea-khuen-mai-waang", "ขอโทษเมื่อคืนไม่ว่าง", "khaaw thoot muea khuen mai waang", "抱歉昨晚没空", "句型", "抱歉晚回"],
  ["kho-thot-thii-jaeng-chaa-pai", "ขอโทษที่แจ้งช้าไป", "khaaw thoot thii jaaeng chaa bpai", "抱歉通知得晚了", "句型", "抱歉晚回"],
  ["kho-thot-ja-top-hai-chad", "ขอโทษจะตอบให้ชัด", "khaaw thoot ja dtaawp hai chat", "抱歉，我会回复清楚", "句型", "抱歉晚回"],
  ["kho-dtit-dtaam-baep-suphap", "ขอติดตามแบบสุภาพ", "khaaw dtit dtaam baaep su-phaap", "礼貌跟进一下", "句型", "跟进催促"],
  ["kho-tham-wa-set-rue-yang", "ขอถามว่าเสร็จหรือยัง", "khaaw thaam waa set rue yang", "请问完成了吗", "句型", "跟进催促"],
  ["kho-kham-dtaawp-wan-nii-dai-mai", "ขอคำตอบวันนี้ได้ไหม", "khaaw kham dtaawp wan nii dai mai", "今天可以给答复吗", "句型", "跟进催促"],
  ["thaa-mii-khwaam-khuep-naa-jaeng-noy", "ถ้ามีความคืบหน้าแจ้งหน่อย", "thaa mii khwaam khuep naa jaaeng naawy", "如果有进展请告知", "句型", "跟进催促"],
  ["glua-ja-loei-gamnot", "กลัวจะเลยกำหนด", "glua ja loei gam-not", "怕会超过期限", "句型", "跟进催促"],
  ["chuai-dtam-rueng-hai-noy", "ช่วยตามเรื่องให้หน่อย", "chuai dtaam rueang hai naawy", "请帮忙跟进这件事", "句型", "跟进催促"],
  ["dtong-chai-kham-dtaawp-gawn-baai", "ต้องใช้คำตอบก่อนบ่าย", "dtawng chai kham dtaawp gaawn baai", "下午前需要答复", "句型", "跟进催促"],
  ["kho-dtuean-iik-khrang-na", "ขอเตือนอีกครั้งนะ", "khaaw dteuan iik khrang na", "再提醒一次哦", "句型", "跟进催促"],
  ["kho-luean-pen-wan-phut", "ขอเลื่อนเป็นวันพุธ", "khaaw luean bpen wan phut", "请求改到星期三", "句型", "改期通知"],
  ["plian-pen-ton-chao-dai-mai", "เปลี่ยนเป็นตอนเช้าได้ไหม", "bpliian bpen dtaawn chao dai mai", "可以改成早上吗", "句型", "改期通知"],
  ["yokloek-nat-wan-nii", "ยกเลิกนัดวันนี้", "yok-loek nat wan nii", "取消今天的约", "动词", "改期通知"],
  ["kho-nat-mai-sapdaa-naa", "ขอนัดใหม่สัปดาห์หน้า", "khaaw nat mai sap-daa naa", "请求下周重新约", "句型", "改期通知"],
  ["wela-doem-yang-dai-mai", "เวลาเดิมยังได้ไหม", "we-laa doem yang dai mai", "原时间还可以吗", "句型", "改期通知"],
  ["thaa-plian-jaeng-luang-na", "ถ้าเปลี่ยนแจ้งล่วงหน้า", "thaa bpliian jaaeng luang naa", "如果更改请提前通知", "句型", "改期通知"],
  ["kho-uean-wela-iik-nit", "ขอเลื่อนเวลาอีกนิด", "khaaw luean we-laa iik nit", "请求稍微延后时间", "句型", "改期通知"],
  ["nat-mai-hai-trong-gan", "นัดใหม่ให้ตรงกัน", "nat mai hai dtrong gan", "重新约到双方时间一致", "动词", "改期通知"],
  ["song-file-hai-duu-laew", "ส่งไฟล์ให้ดูแล้ว", "song fai hai duu laew", "文件已经发给看了", "句型", "文件照片"],
  ["ruup-mai-khoi-chat-na", "รูปไม่ค่อยชัดนะ", "ruup mai khaawy chat na", "照片不太清楚哦", "句型", "文件照片"],
  ["kho-file-baep-pdf", "ขอไฟล์แบบพีดีเอฟ", "khaaw fai baaep phii-dii-ef", "请给 PDF 文件", "句型", "文件照片"],
  ["poet-file-mai-dai-kha", "เปิดไฟล์ไม่ได้ค่ะ", "bpoet fai mai dai kha", "打不开文件（女用礼貌）", "句型", "文件照片"],
  ["song-ruup-mai-iik-khrang", "ส่งรูปใหม่อีกครั้ง", "song ruup mai iik khrang", "重新发一次照片", "动词", "文件照片"],
  ["kho-naa-thii-mii-lai-sen", "ขอหน้าที่มีลายเซ็น", "khaaw naa thii mii laai sen", "请给有签名的那一页", "句型", "文件照片"],
  ["file-yai-goen-pai-song-mai-dai", "ไฟล์ใหญ่เกินไปส่งไม่ได้", "fai yai goen bpai song mai dai", "文件太大发不了", "句型", "文件照片"],
  ["thaai-ruup-hai-chad-khuen", "ถ่ายรูปให้ชัดขึ้น", "thaai ruup hai chat khuen", "把照片拍清楚一点", "动词", "文件照片"],
  ["jaai-laew-jaeng-duai", "จ่ายแล้วแจ้งด้วย", "jaai laew jaaeng duai", "付款后请告知", "句型", "付款预约"],
  ["kho-yuenyan-yot-gawn", "ขอยืนยันยอดก่อน", "khaaw yuen-yan yaawt gaawn", "请先确认金额", "句型", "付款预约"],
  ["oon-laew-song-slip", "โอนแล้วส่งสลิป", "oon laew song sa-lip", "转账后发送截图", "句型", "付款预约"],
  ["kho-jawng-wela-nii", "ขอจองเวลานี้", "khaaw jaawng we-laa nii", "想预约这个时间", "句型", "付款预约"],
  ["dtong-waang-ngoen-gawn-mai", "ต้องวางเงินก่อนไหม", "dtawng waang ngoen gaawn mai", "需要先付定金吗", "句型", "付款预约"],
  ["kho-lek-banchi-iik-khrang", "ขอเลขบัญชีอีกครั้ง", "khaaw leek ban-chii iik khrang", "请再给一次账号", "句型", "付款预约"],
  ["jaai-nangaan-laew", "จ่ายหน้างานแล้ว", "jaai naa ngaan laew", "已现场付款", "句型", "付款预约"],
  ["kho-lakthan-gaan-jaai", "ขอหลักฐานการจ่าย", "khaaw lak-thaan gaan jaai", "请给付款凭证", "句型", "付款预约"],
  ["pen-huang-na", "เป็นห่วงนะ", "bpen huang na", "很关心你哦", "句型", "情绪关心"],
  ["phak-phaawn-duai-na", "พักผ่อนด้วยนะ", "phak phaawn duai na", "也要休息哦", "句型", "情绪关心"],
  ["khoi-khoi-tham-na", "ค่อย ๆ ทำนะ", "khaawy khaawy tham na", "慢慢做哦", "句型", "情绪关心"],
  ["mai-dtong-khriat-na", "ไม่ต้องเครียดนะ", "mai dtawng khriiat na", "不用紧张/压力大哦", "句型", "情绪关心"],
  ["kho-hai-dii-khuen-reo-reo", "ขอให้ดีขึ้นเร็ว ๆ", "khaaw hai dii khuen reo reo", "希望快点好起来", "句型", "情绪关心"],
  ["thaa-nueai-phak-gawn", "ถ้าเหนื่อยพักก่อน", "thaa nueai phak gaawn", "累的话先休息", "句型", "情绪关心"],
  ["mii-arai-hai-chuai-bok", "มีอะไรให้ช่วยบอก", "mii a-rai hai chuai baawk", "有什么需要帮忙就说", "句型", "情绪关心"],
  ["wang-waa-thuk-yaang-ok", "หวังว่าทุกอย่างโอเค", "wang waa thuk yaang oo-khee", "希望一切都还好", "句型", "情绪关心"],
  ["khopkhun-mak-na-kha", "ขอบคุณมากนะคะ", "khaawp khun maak na kha", "非常感谢哦（女用礼貌）", "句型", "收尾礼貌"],
  ["rap-saap-kha-khopkhun", "รับทราบค่ะ ขอบคุณ", "rap saap kha khaawp khun", "知道了，谢谢（女用礼貌）", "句型", "收尾礼貌"],
  ["diao-damnoen-gaan-hai-wan-nii", "เดี๋ยวดำเนินการให้วันนี้", "diao dam-noen gaan hai wan nii", "今天会帮忙处理", "句型", "收尾礼貌"],
  ["laew-jaeng-glap-na", "แล้วแจ้งกลับนะ", "laew jaaeng glap na", "之后会回复告知", "句型", "收尾礼貌"],
  ["kho-hai-wan-nii-rian-roi", "ขอให้วันนี้เรียบร้อย", "khaaw hai wan nii riiap raawy", "愿今天一切顺利", "句型", "收尾礼貌"],
  ["thaa-mii-arai-jaeng-dai", "ถ้ามีอะไรแจ้งได้", "thaa mii a-rai jaaeng dai", "如果有什么可以告知", "句型", "收尾礼貌"],
  ["yin-dii-chuai-na", "ยินดีช่วยนะ", "yin-dii chuai na", "很乐意帮忙哦", "句型", "收尾礼貌"],
  ["khopkhun-lae-kho-thot-iik-khrang", "ขอบคุณและขอโทษอีกครั้ง", "khaawp khun lae khaaw thoot iik khrang", "谢谢，也再次抱歉", "句型", "收尾礼貌"],
];

const relatedByTheme: Record<
  EverydayPoliteMessagesTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  收到确认: {
    synonym: "รับทราบเรื่องนี้แล้ว / rap saap rueang nii laew / 已知悉这件事",
    antonym: "ยังไม่ได้รับ / yang mai dai rap / 还没收到",
    comparison: "รับทราบ 比 เห็นข้อความ 更正式，适合工作或服务消息。",
    collocation: "ได้รับไฟล์แล้ว เดี๋ยวแจ้งกลับอีกที / dai rap fai laew diao jaaeng glap iik thii / 已收到文件，等下再回复",
  },
  感谢提醒: {
    synonym: "ขอบคุณที่เตือนนะ / khaawp khun thii dteuan na / 谢谢提醒",
    antonym: "ลืมขอบคุณ / luem khaawp khun / 忘了感谢",
    comparison: "ขอบคุณที่... 后面接具体行为，礼貌且清楚。",
    collocation: "ขอบคุณที่บอกล่วงหน้า ฉันจะเตรียมไว้ / khaawp khun thii baawk luang naa chan ja dtriiam wai / 谢谢提前告知，我会准备好",
  },
  麻烦确认: {
    synonym: "รบกวนยืนยันเวลา / rop-guan yuen-yan we-laa / 麻烦确认时间",
    antonym: "ไม่ต้องยืนยัน / mai dtawng yuen-yan / 不用确认",
    comparison: "รบกวน 放在请求前，可把要求说得更客气。",
    collocation: "รบกวนเช็กยอดเงินก่อนจ่าย / rop-guan chek yaawt ngoen gaawn jaai / 麻烦付款前核对金额",
  },
  方便回复: {
    synonym: "สะดวกแล้วค่อยตอบ / sa-duak laew khaawy dtaawp / 方便时再回",
    antonym: "ต้องตอบทันที / dtawng dtaawp than-thii / 必须马上回",
    comparison: "ตามสะดวก 表示按对方方便，语气很柔和。",
    collocation: "ถ้ายุ่งยังไม่ต้องตอบ ตอบกลับได้ตามสะดวก / thaa yung yang mai dtawng dtaawp dtaawp glap dai dtaam sa-duak / 忙的话暂时不用回，按方便时间回复",
  },
  不急稍后: {
    synonym: "ไม่ต้องรีบมาก / mai dtawng riip maak / 不用太急",
    antonym: "รีบหน่อย / riip naawy / 请快一点",
    comparison: "ไม่รีบนะ 比 不说更能减少对方压力。",
    collocation: "เมื่อพร้อมค่อยส่ง ไม่ต้องรีบมาก / muea phraawm khaawy song mai dtawng riip maak / 准备好再发，不用太急",
  },
  抱歉晚回: {
    synonym: "ขอโทษเพิ่งเห็นข้อความ / khaaw thoot phoeng hen khaaw khwaam / 抱歉刚看到消息",
    antonym: "ตอบทันที / dtaawp than-thii / 立刻回复",
    comparison: "เพิ่ง 表示刚刚，常用于解释晚回原因。",
    collocation: "ขอโทษที่ให้รอนาน วันนี้ยุ่งมาก / khaaw thoot thii hai raaw naan wan nii yung maak / 抱歉让你久等，今天很忙",
  },
  跟进催促: {
    synonym: "ขอถามว่าเสร็จหรือยัง / khaaw thaam waa set rue yang / 请问完成了吗",
    antonym: "ไม่ต้องตาม / mai dtawng dtaam / 不用跟进",
    comparison: "ขอติดตาม 比直接催促更礼貌，适合消息里使用。",
    collocation: "ถ้ามีความคืบหน้าแจ้งหน่อย เพราะกลัวจะเลยกำหนด / thaa mii khwaam khuep naa jaaeng naawy phraw glua ja loei gam-not / 如果有进展请告知，因为怕超过期限",
  },
  改期通知: {
    synonym: "ขอเลื่อนเป็นวันพุธ / khaaw luean bpen wan phut / 请求改到星期三",
    antonym: "เวลาเดิม / we-laa doem / 原时间",
    comparison: "เลื่อน 表示改期或延后，ยกเลิก 表示取消。",
    collocation: "ถ้าเปลี่ยนแจ้งล่วงหน้า จะได้นัดใหม่ให้ตรงกัน / thaa bpliian jaaeng luang naa ja dai nat mai hai dtrong gan / 如果更改请提前通知，好重新约到双方时间一致",
  },
  文件照片: {
    synonym: "ส่งไฟล์ให้ดูแล้ว / song fai hai duu laew / 文件已发给看",
    antonym: "ยังไม่ได้ส่งไฟล์ / yang mai dai song fai / 还没发文件",
    comparison: "ไฟล์ 是文件，รูป 是照片；ไม่ชัด 用于看不清。",
    collocation: "รูปไม่ค่อยชัด ช่วยถ่ายรูปให้ชัดขึ้นได้ไหม / ruup mai khaawy chat chuai thaai ruup hai chat khuen dai mai / 照片不太清楚，可以拍清楚一点吗",
  },
  付款预约: {
    synonym: "โอนแล้วส่งสลิป / oon laew song sa-lip / 转账后发截图",
    antonym: "ยังไม่จ่าย / yang mai jaai / 还没付款",
    comparison: "จ่ายแล้วแจ้งด้วย 常用于请对方付款后通知；预约场景也可搭配 ขอจอง。",
    collocation: "ขอจองเวลานี้ จ่ายแล้วจะแจ้งด้วย / khaaw jaawng we-laa nii jaai laew ja jaaeng duai / 想预约这个时间，付款后会告知",
  },
  情绪关心: {
    synonym: "พักผ่อนด้วยนะ / phak phaawn duai na / 也要休息哦",
    antonym: "ไม่สนใจ / mai son jai / 不关心",
    comparison: "นะ 放在关心句末，语气更柔和亲近。",
    collocation: "ถ้าเหนื่อยพักก่อน มีอะไรให้ช่วยบอก / thaa nueai phak gaawn mii a-rai hai chuai baawk / 累的话先休息，有什么需要帮忙就说",
  },
  收尾礼貌: {
    synonym: "ถ้ามีอะไรแจ้งได้ / thaa mii a-rai jaaeng dai / 有什么可以告知",
    antonym: "ไม่ตอบกลับ / mai dtaawp glap / 不回复",
    comparison: "收尾礼貌语常用于结束消息，给对方继续沟通的空间。",
    collocation: "รับทราบค่ะ ขอบคุณ แล้วแจ้งกลับนะ / rap saap kha khaawp khun laew jaaeng glap na / 知道了，谢谢，之后会回复告知",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาส่งข้อความสุภาพ ฉันใช้ “${row[1]}” เพื่อให้ผู้รับรู้สึกสบายใจและเข้าใจสิ่งที่ต้องทำต่อ`,
  roman: `wee-laa song khaaw khwaam su-phaap chan chai "${row[2]}" phuea hai phuu rap ruu-suek sa-baai jai lae khao jai sing thii dtawng tham dtaaw`,
  chinese: `发送礼貌消息时，我用“${row[1]}”，让对方感觉舒服，也明白接下来要做什么。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "日常礼貌消息", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 日常礼貌消息表达。适合收到确认、感谢提醒、麻烦确认、方便回复、不急、晚回道歉和消息收尾；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: EVERYDAY_POLITE_MESSAGES_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_POLITE_MESSAGES_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
