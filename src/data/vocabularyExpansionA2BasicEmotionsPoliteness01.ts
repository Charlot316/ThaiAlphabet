export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicEmotionsPolitenessTheme =
  | "担心但客气"
  | "抱歉麻烦"
  | "感谢理解"
  | "礼貌催促"
  | "委婉不满"
  | "安慰回应"
  | "接受拒绝"
  | "请求确认"
  | "情绪说明"
  | "关系维护"
  | "说明问题"
  | "感谢收尾";

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
  theme: BasicEmotionsPolitenessTheme,
];

const BASIC_EMOTIONS_POLITENESS_REFS = [
  "worker-a-a2-basic-emotions-politeness",
  "basic-thai-polite-feelings",
];

const rows: Row[] = [
  ["greng-waa-ja-mai-than", "เกรงว่าจะไม่ทัน", "greng waa ja mai than", "担心会来不及", "句型", "担心但客气"],
  ["greng-waa-ja-ropguan-mak", "เกรงว่าจะรบกวนมาก", "greng waa ja rop-guan maak", "担心会太打扰", "句型", "担心但客气"],
  ["gangwon-nit-nueng", "กังวลนิดหนึ่ง", "gang-won nit nueng", "有点担心", "短语", "担心但客气"],
  ["pen-huang-rueng-nii", "เป็นห่วงเรื่องนี้", "bpen huang rueang nii", "担心这件事", "句型", "担心但客气"],
  ["mai-khoi-sabai-jai", "ไม่ค่อยสบายใจ", "mai khaawy sa-baai jai", "不太安心", "句型", "担心但客气"],
  ["kho-tham-phuea-khwaam-nae-jai", "ขอถามเพื่อความแน่ใจ", "khaaw thaam phuea khwaam naae jai", "为确认而请问", "句型", "担心但客气"],
  ["kho-check-iik-khrang-dai-mai", "ขอเช็กอีกครั้งได้ไหม", "khaaw chek iik khrang dai mai", "可以再确认一次吗", "句型", "担心但客气"],
  ["thaa-mai-lambaak-goen-pai", "ถ้าไม่ลำบากเกินไป", "thaa mai lam-baak goen bpai", "如果不太麻烦的话", "句型", "担心但客气"],
  ["kho-thot-thii-ropguan-iik-khrang", "ขอโทษที่รบกวนอีกครั้ง", "khaaw thoot thii rop-guan iik khrang", "抱歉再次打扰", "句型", "抱歉麻烦"],
  ["kho-thot-thii-tham-bai", "ขอโทษที่ถามบ่อย", "khaaw thoot thii thaam baawy", "抱歉问得频繁", "句型", "抱歉麻烦"],
  ["kho-thot-thii-top-chaa-pai-noy", "ขอโทษที่ตอบช้าไปหน่อย", "khaaw thoot thii dtaawp chaa bpai naawy", "抱歉回复稍微晚了", "句型", "抱歉麻烦"],
  ["kho-thot-thii-tham-hai-raw", "ขอโทษที่ทำให้รอ", "khaaw thoot thii tham hai raaw", "抱歉让你等了", "句型", "抱歉麻烦"],
  ["kho-thot-thii-jaeng-chaa", "ขอโทษที่แจ้งช้า", "khaaw thoot thii jaaeng chaa", "抱歉通知晚了", "句型", "抱歉麻烦"],
  ["kho-thot-thii-plian-wela", "ขอโทษที่เปลี่ยนเวลา", "khaaw thoot thii bpliian we-laa", "抱歉改了时间", "句型", "抱歉麻烦"],
  ["kho-thot-thii-kho-phoem", "ขอโทษที่ขอเพิ่ม", "khaaw thoot thii khaaw phoem", "抱歉又提出增加", "句型", "抱歉麻烦"],
  ["kho-thot-thii-tham-hai-mai-saduak", "ขอโทษที่ทำให้ไม่สะดวก", "khaaw thoot thii tham hai mai sa-duak", "抱歉造成不方便", "句型", "抱歉麻烦"],
  ["khopkhun-thii-khao-jai-sathanakan", "ขอบคุณที่เข้าใจสถานการณ์", "khaawp khun thii khao jai sa-thaa-na-gaan", "谢谢你理解情况", "句型", "感谢理解"],
  ["khopkhun-thii-raw-hai-sak-khru", "ขอบคุณที่รอให้สักครู่", "khaawp khun thii raaw hai sak khruu", "谢谢你稍等", "句型", "感谢理解"],
  ["khopkhun-thii-chuai-duu-rueng-nii", "ขอบคุณที่ช่วยดูเรื่องนี้", "khaawp khun thii chuai duu rueang nii", "谢谢你帮忙看这件事", "句型", "感谢理解"],
  ["khopkhun-thii-jaeng-glap-ma", "ขอบคุณที่แจ้งกลับมา", "khaawp khun thii jaaeng glap maa", "谢谢你回复通知", "句型", "感谢理解"],
  ["khopkhun-thii-kae-hai-laew", "ขอบคุณที่แก้ให้แล้ว", "khaawp khun thii gaae hai laew", "谢谢你已经帮忙修改", "句型", "感谢理解"],
  ["khopkhun-thii-yuet-wela-hai", "ขอบคุณที่ยืดเวลาให้", "khaawp khun thii yuet we-laa hai", "谢谢你延长时间", "句型", "感谢理解"],
  ["khopkhun-thii-athibai-phoem", "ขอบคุณที่อธิบายเพิ่ม", "khaawp khun thii a-thi-baai phoem", "谢谢你补充说明", "句型", "感谢理解"],
  ["khopkhun-thii-chuai-jatgaan", "ขอบคุณที่ช่วยจัดการ", "khaawp khun thii chuai jat-gaan", "谢谢你帮忙处理", "句型", "感谢理解"],
  ["kho-anuyaat-dtit-dtaam-rueng-nii", "ขออนุญาตติดตามเรื่องนี้", "khaaw a-nu-yaat dtit dtaam rueang nii", "请允许我跟进这件事", "句型", "礼貌催促"],
  ["kho-tham-khwaam-khuep-naa", "ขอถามความคืบหน้า", "khaaw thaam khwaam khuep naa", "请问进展", "句型", "礼貌催促"],
  ["ropguan-chuai-jaeng-phon", "รบกวนช่วยแจ้งผล", "rop-guan chuai jaaeng phon", "麻烦帮忙告知结果", "句型", "礼貌催促"],
  ["saduak-top-muea-rai", "สะดวกตอบเมื่อไร", "sa-duak dtaawp muea rai", "什么时候方便回复", "句型", "礼貌催促"],
  ["kho-dtuean-bao-bao", "ขอเตือนเบา ๆ", "khaaw dteuan bao bao", "轻轻提醒一下", "句型", "礼貌催促"],
  ["glua-waa-ja-loei-wela", "กลัวว่าจะเลยเวลา", "glua waa ja loei we-laa", "怕会超过时间", "句型", "礼貌催促"],
  ["thaa-phraawm-laew-jaeng-dai-mai", "ถ้าพร้อมแล้วแจ้งได้ไหม", "thaa phraawm laew jaaeng dai mai", "准备好了可以告知吗", "句型", "礼貌催促"],
  ["kho-check-waa-yang-than-mai", "ขอเช็กว่ายังทันไหม", "khaaw chek waa yang than mai", "请确认还来得及吗", "句型", "礼貌催促"],
  ["an-nii-yang-mai-khoi-ok", "อันนี้ยังไม่ค่อยโอเค", "an nii yang mai khaawy oo-khee", "这个还不太可以", "句型", "委婉不满"],
  ["yang-mii-jut-thii-tit-yuu", "ยังมีจุดที่ติดอยู่", "yang mii jut thii dtit yuu", "还有卡住的地方", "句型", "委婉不满"],
  ["ruusuek-mai-khoi-saduak", "รู้สึกไม่ค่อยสะดวก", "ruu-suek mai khaawy sa-duak", "觉得不太方便", "句型", "委婉不满"],
  ["aat-dtong-kae-iik-nit", "อาจต้องแก้อีกนิด", "aat dtawng gaae iik nit", "可能还需要改一点", "句型", "委婉不满"],
  ["muean-yang-mai-dtrong", "เหมือนยังไม่ตรง", "muean yang mai dtrong", "好像还不符合", "句型", "委婉不满"],
  ["kho-prap-hai-dii-gwaa-nii", "ขอปรับให้ดีกว่านี้", "khaaw bprap hai dii gwaa nii", "希望调整得更好", "句型", "委婉不满"],
  ["kho-plian-withi-dai-mai", "ขอเปลี่ยนวิธีได้ไหม", "khaaw bpliian wi-thii dai mai", "可以换个方法吗", "句型", "委婉不满"],
  ["kho-duu-thaang-lueak-uen", "ขอดูทางเลือกอื่น", "khaaw duu thaang lueak uen", "想看看别的选择", "句型", "委婉不满"],
  ["mai-pen-rai-jing-jing", "ไม่เป็นไรจริง ๆ", "mai bpen rai jing jing", "真的没关系", "句型", "安慰回应"],
  ["khoi-khoi-tham-go-dai", "ค่อย ๆ ทำก็ได้", "khaawy khaawy tham gaw dai", "慢慢做也可以", "句型", "安慰回应"],
  ["diao-chuai-gan-duu", "เดี๋ยวช่วยกันดู", "diao chuai gan duu", "等下我们一起看", "句型", "安慰回应"],
  ["yang-phaw-mii-wela", "ยังพอมีเวลา", "yang phaaw mii we-laa", "还算有时间", "句型", "安慰回应"],
  ["rueng-nii-kae-dai", "เรื่องนี้แก้ได้", "rueang nii gaae dai", "这件事可以解决", "句型", "安慰回应"],
  ["mai-dtong-gangwon-mak-na", "ไม่ต้องกังวลมากนะ", "mai dtawng gang-won maak na", "不用太担心哦", "句型", "安慰回应"],
  ["ao-thao-thii-tham-dai-gawn", "เอาเท่าที่ทำได้ก่อน", "ao thao thii tham dai gaawn", "先做到能做的程度", "句型", "安慰回应"],
  ["phak-gawn-go-dai", "พักก่อนก็ได้", "phak gaawn gaw dai", "先休息也可以", "句型", "安慰回应"],
  ["rap-dai-thaa-plian-wela", "รับได้ถ้าเปลี่ยนเวลา", "rap dai thaa bpliian we-laa", "如果改时间可以接受", "句型", "接受拒绝"],
  ["kho-khit-duu-gawn", "ขอคิดดูก่อน", "khaaw khit duu gaawn", "请让我先想想", "句型", "接受拒绝"],
  ["aat-yang-mai-saduak", "อาจยังไม่สะดวก", "aat yang mai sa-duak", "可能还不方便", "句型", "接受拒绝"],
  ["kho-phan-rawp-nii", "ขอผ่านรอบนี้", "khaaw phaan raawp nii", "这次先不参加/不接受", "句型", "接受拒绝"],
  ["yang-dtatsinjai-mai-dai", "ยังตัดสินใจไม่ได้", "yang dtat-sin-jai mai dai", "还不能决定", "句型", "接受拒绝"],
  ["kho-lueak-baep-ngai-gwaa", "ขอเลือกแบบง่ายกว่า", "khaaw lueak baaep ngaai gwaa", "想选更简单的方式", "句型", "接受拒绝"],
  ["kho-mai-rap-dtawn-nii", "ขอไม่รับตอนนี้", "khaaw mai rap dtaawn nii", "现在先不接受", "句型", "接受拒绝"],
  ["thaa-jampen-go-dai", "ถ้าจำเป็นก็ได้", "thaa jam-bpen gaw dai", "如果有必要也可以", "句型", "接受拒绝"],
  ["chuai-yuenyan-iik-khrang", "ช่วยยืนยันอีกครั้ง", "chuai yuen-yan iik khrang", "请再确认一次", "句型", "请求确认"],
  ["chan-khao-jai-thuuk-mai", "ฉันเข้าใจถูกไหม", "chan khao jai thuuk mai", "我理解得对吗", "句型", "请求确认"],
  ["baep-nii-ok-mai", "แบบนี้โอเคไหม", "baaep nii oo-khee mai", "这样可以吗", "句型", "请求确认"],
  ["dtong-tham-arai-dtaaw", "ต้องทำอะไรต่อ", "dtawng tham a-rai dtaaw", "接下来要做什么", "句型", "请求确认"],
  ["mii-arai-dtong-kae-mai", "มีอะไรต้องแก้ไหม", "mii a-rai dtawng gaae mai", "有什么需要改吗", "句型", "请求确认"],
  ["kho-raai-la-iat-phoem-iik-nit", "ขอรายละเอียดเพิ่มอีกนิด", "khaaw raai la-iat phoem iik nit", "请再补充一点细节", "句型", "请求确认"],
  ["kho-kham-dtop-gawn-yen", "ขอคำตอบก่อนเย็น", "khaaw kham dtaawp gaawn yen", "请傍晚前给答复", "句型", "请求确认"],
  ["jaeng-dai-muea-phraawm", "แจ้งได้เมื่อพร้อม", "jaaeng dai muea phraawm", "准备好时可以告知", "句型", "请求确认"],
  ["diijai-thii-dai-yin-khaao-nii", "ดีใจที่ได้ยินข่าวนี้", "dii jai thii dai yin khaao nii", "很高兴听到这个消息", "句型", "情绪说明"],
  ["siadai-nit-nueng", "เสียดายนิดหนึ่ง", "sia daai nit nueng", "有点可惜", "短语", "情绪说明"],
  ["ruusuek-longjai", "รู้สึกโล่งใจ", "ruu-suek loong jai", "感到放心", "句型", "情绪说明"],
  ["aep-gangwon-yuu", "แอบกังวลอยู่", "aaep gang-won yuu", "其实还有点担心", "句型", "情绪说明"],
  ["khon-khang-grengjai", "ค่อนข้างเกรงใจ", "khaawn khaang greng jai", "比较不好意思/顾及别人", "短语", "情绪说明"],
  ["ruusuek-phit-nit-nit", "รู้สึกผิดนิด ๆ", "ruu-suek phit nit nit", "有点内疚", "句型", "情绪说明"],
  ["noijai-nit-nueng", "น้อยใจนิดหนึ่ง", "naawy jai nit nueng", "有点委屈", "短语", "情绪说明"],
  ["roem-sabai-jai-khuen", "เริ่มสบายใจขึ้น", "roem sa-baai jai khuen", "开始更安心", "句型", "情绪说明"],
  ["wang-waa-mai-pen-rai", "หวังว่าไม่เป็นไร", "wang waa mai bpen rai", "希望没关系", "句型", "关系维护"],
  ["mai-yaak-hai-khao-jai-phit", "ไม่อยากให้เข้าใจผิด", "mai yaak hai khao jai phit", "不想让对方误会", "句型", "关系维护"],
  ["khopkhun-thii-khui-gan-dii-dii", "ขอบคุณที่คุยกันดี ๆ", "khaawp khun thii khui gan dii dii", "谢谢好好沟通", "句型", "关系维护"],
  ["rao-khoi-ha-thaang-gan", "เราค่อยหาทางกัน", "rao khaawy haa thaang gan", "我们慢慢一起想办法", "句型", "关系维护"],
  ["kho-phuut-dtrong-nit-nueng", "ขอพูดตรง ๆ นิดหนึ่ง", "khaaw phuut dtrong nit nueng", "请允许我稍微直接说", "句型", "关系维护"],
  ["mai-dai-dtangjai-ropguan", "ไม่ได้ตั้งใจรบกวน", "mai dai dtang jai rop-guan", "不是故意打扰", "句型", "关系维护"],
  ["yaak-hai-sabai-jai-thang-song-fai", "อยากให้สบายใจทั้งสองฝ่าย", "yaak hai sa-baai jai thang saawng faai", "希望双方都安心", "句型", "关系维护"],
  ["thaa-mii-arai-bok-dai", "ถ้ามีอะไรบอกได้", "thaa mii a-rai baawk dai", "如果有什么可以说", "句型", "关系维护"],
  ["kho-jaeng-pan-ha-nit-nueng", "ขอแจ้งปัญหานิดหนึ่ง", "khaaw jaaeng bpan-haa nit nueng", "请允许我说明一个小问题", "句型", "说明问题"],
  ["yang-mai-dtrong-taam-thii-khui", "ยังไม่ตรงตามที่คุย", "yang mai dtrong dtaam thii khui", "还不符合之前谈的", "句型", "说明问题"],
  ["kho-hai-chuai-duu-mai", "ขอให้ช่วยดูใหม่", "khaaw hai chuai duu mai", "请帮忙重新看一下", "句型", "说明问题"],
  ["aat-mii-khwaam-khao-jai-phit", "อาจมีความเข้าใจผิด", "aat mii khwaam khao jai phit", "可能有误会", "句型", "说明问题"],
  ["kho-athibai-phoem-nit-nueng", "ขออธิบายเพิ่มนิดหนึ่ง", "khaaw a-thi-baai phoem nit nueng", "请允许我补充解释一点", "句型", "说明问题"],
  ["mai-dai-waa-arai-na", "ไม่ได้ว่าอะไรนะ", "mai dai waa a-rai na", "不是在责怪什么", "句型", "说明问题"],
  ["khae-yaak-hai-chat-jen", "แค่อยากให้ชัดเจน", "khaae yaak hai chat jen", "只是想弄清楚", "句型", "说明问题"],
  ["kho-hai-chuai-truat-iik-thii", "ขอให้ช่วยตรวจอีกที", "khaaw hai chuai dtruat iik thii", "请帮忙再检查一下", "句型", "说明问题"],
  ["khopkhun-thii-otthon-raw", "ขอบคุณที่อดทนรอ", "khaawp khun thii ot-thon raaw", "谢谢耐心等待", "句型", "感谢收尾"],
  ["khopkhun-thii-hai-wela-phoem", "ขอบคุณที่ให้เวลาเพิ่ม", "khaawp khun thii hai we-laa phoem", "谢谢多给时间", "句型", "感谢收尾"],
  ["khopkhun-thii-rap-fang-jing-jai", "ขอบคุณที่รับฟังจริงใจ", "khaawp khun thii rap fang jing jai", "谢谢真诚倾听", "句型", "感谢收尾"],
  ["khopkhun-thii-mai-wa-arai", "ขอบคุณที่ไม่ว่าอะไร", "khaawp khun thii mai waa a-rai", "谢谢没有责怪", "句型", "感谢收尾"],
  ["khopkhun-thii-chuai-taam-rueng", "ขอบคุณที่ช่วยตามเรื่อง", "khaawp khun thii chuai dtaam rueang", "谢谢帮忙跟进", "句型", "感谢收尾"],
  ["khopkhun-thii-bok-dtrong-dtrong", "ขอบคุณที่บอกตรง ๆ", "khaawp khun thii baawk dtrong dtrong", "谢谢直说", "句型", "感谢收尾"],
  ["khopkhun-thii-khao-jai-rueng-rawp-nii", "ขอบคุณที่เข้าใจเรื่องรอบนี้", "khaawp khun thii khao jai rueang raawp nii", "谢谢理解这次的事", "句型", "感谢收尾"],
  ["khopkhun-thii-chuai-kae-pan-ha", "ขอบคุณที่ช่วยแก้ปัญหา", "khaawp khun thii chuai gaae bpan-haa", "谢谢帮忙解决问题", "句型", "感谢收尾"],
];

const relatedByTheme: Record<
  BasicEmotionsPolitenessTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  担心但客气: {
    synonym: "กังวลนิดหนึ่ง / gang-won nit nueng / 有点担心",
    antonym: "สบายใจแล้ว / sa-baai jai laew / 已经安心",
    comparison: "เกรงว่า 比 กลัวว่า 更客气，适合怕麻烦别人或怕来不及。",
    collocation: "เกรงว่าจะรบกวนมาก ขอถามเพื่อความแน่ใจ / greng waa ja rop-guan maak khaaw thaam phuea khwaam naae jai / 担心太打扰，所以请问确认一下",
  },
  抱歉麻烦: {
    synonym: "ขอโทษที่รบกวนอีกครั้ง / khaaw thoot thii rop-guan iik khrang / 抱歉再次打扰",
    antonym: "ไม่เป็นไร / mai bpen rai / 没关系",
    comparison: "ขอโทษที่... 后接造成麻烦的事，比单说 ขอโทษ 信息更完整。",
    collocation: "ขอโทษที่ตอบช้า ขอบคุณที่รอให้สักครู่ / khaaw thoot thii dtaawp chaa khaawp khun thii raaw hai sak khruu / 抱歉回复晚了，谢谢稍等",
  },
  感谢理解: {
    synonym: "ขอบคุณที่ช่วยดูเรื่องนี้ / khaawp khun thii chuai duu rueang nii / 谢谢帮忙看这件事",
    antonym: "ไม่ขอบคุณ / mai khaawp khun / 不感谢",
    comparison: "ขอบคุณที่... 用来感谢具体行为，比只说 ขอบคุณ 更有礼貌。",
    collocation: "ขอบคุณที่เข้าใจสถานการณ์และช่วยจัดการ / khaawp khun thii khao jai sa-thaa-na-gaan lae chuai jat-gaan / 谢谢理解情况并帮忙处理",
  },
  礼貌催促: {
    synonym: "ขอถามความคืบหน้า / khaaw thaam khwaam khuep naa / 请问进展",
    antonym: "ไม่ต้องรีบ / mai dtawng riip / 不用急",
    comparison: "ขออนุญาตติดตาม 是礼貌跟进，催促感比 รีบหน่อย 温和。",
    collocation: "ขออนุญาตติดตามเรื่องนี้ ถ้าพร้อมแล้วแจ้งได้ไหม / khaaw a-nu-yaat dtit dtaam rueang nii thaa phraawm laew jaaeng dai mai / 请允许跟进这件事，准备好了可以告知吗",
  },
  委婉不满: {
    synonym: "ยังไม่ค่อยโอเค / yang mai khaawy oo-khee / 还不太可以",
    antonym: "โอเคแล้ว / oo-khee laew / 已经可以",
    comparison: "ไม่ค่อย ช่วย降低语气，表达不满意但不显得太冲。",
    collocation: "อันนี้ยังไม่ค่อยโอเค ขอปรับให้ดีกว่านี้ / an nii yang mai khaawy oo-khee khaaw bprap hai dii gwaa nii / 这个还不太可以，希望调得更好",
  },
  安慰回应: {
    synonym: "ไม่ต้องกังวลมาก / mai dtawng gang-won maak / 不用太担心",
    antonym: "กังวลมาก / gang-won maak / 很担心",
    comparison: "ไม่เป็นไรจริง ๆ 用来安慰，ค่อย ๆ ทำก็ได้ 用来降低对方压力。",
    collocation: "ไม่ต้องกังวลมาก เรื่องนี้แก้ได้ / mai dtawng gang-won maak rueang nii gaae dai / 不用太担心，这件事可以解决",
  },
  接受拒绝: {
    synonym: "ขอคิดดูก่อน / khaaw khit duu gaawn / 请让我先想想",
    antonym: "ตกลงทันที / dtoh-long than-thii / 立刻同意",
    comparison: "ขอผ่านรอบนี้ 是委婉拒绝，ยังตัดสินใจไม่ได้ 是暂时不能决定。",
    collocation: "อาจยังไม่สะดวก ขอคิดดูก่อน / aat yang mai sa-duak khaaw khit duu gaawn / 可能还不方便，请让我先想想",
  },
  请求确认: {
    synonym: "ช่วยยืนยันอีกครั้ง / chuai yuen-yan iik khrang / 请再确认一次",
    antonym: "ไม่ต้องยืนยัน / mai dtawng yuen-yan / 不用确认",
    comparison: "เข้าใจถูกไหม 问自己的理解是否正确，แบบนี้โอเคไหม 问安排是否可以。",
    collocation: "เข้าใจถูกไหม ถ้ามีอะไรต้องแก้บอกได้ / khao jai thuuk mai thaa mii a-rai dtawng gaae baawk dai / 我理解得对吗，如果有要改的可以说",
  },
  情绪说明: {
    synonym: "รู้สึกโล่งใจ / ruu-suek loong jai / 感到放心",
    antonym: "รู้สึกกังวล / ruu-suek gang-won / 感到担心",
    comparison: "รู้สึก... 直接说明感受，นิดหนึ่ง / นิด ๆ 让情绪表达更柔和。",
    collocation: "เสียดายนิดหนึ่งแต่เริ่มสบายใจขึ้น / sia daai nit nueng dtaae roem sa-baai jai khuen / 有点可惜，但开始安心了",
  },
  关系维护: {
    synonym: "ไม่อยากให้เข้าใจผิด / mai yaak hai khao jai phit / 不想让对方误会",
    antonym: "ปล่อยให้เข้าใจผิด / bplaawy hai khao jai phit / 任由误会",
    comparison: "ขอพูดตรง ๆ นิดหนึ่ง 用来铺垫直接意见，减少冒犯感。",
    collocation: "ไม่อยากให้เข้าใจผิด เราค่อยหาทางกัน / mai yaak hai khao jai phit rao khaawy haa thaang gan / 不想让对方误会，我们慢慢一起想办法",
  },
  说明问题: {
    synonym: "ขอแจ้งปัญหานิดหนึ่ง / khaaw jaaeng bpan-haa nit nueng / 请允许说明小问题",
    antonym: "ไม่มีปัญหา / mai mii bpan-haa / 没问题",
    comparison: "ขอแจ้งปัญหา 是礼貌提出问题，ไม่ได้ว่าอะไรนะ 用来说明不是责怪。",
    collocation: "ขอแจ้งปัญหานิดหนึ่ง อาจมีความเข้าใจผิด / khaaw jaaeng bpan-haa nit nueng aat mii khwaam khao jai phit / 请允许说明一个小问题，可能有误会",
  },
  感谢收尾: {
    synonym: "ขอบคุณที่อดทนรอ / khaawp khun thii ot-thon raaw / 谢谢耐心等待",
    antonym: "ไม่รับฟัง / mai rap fang / 不倾听",
    comparison: "收尾感谢常搭配具体原因，能让一次不顺的沟通更好结束。",
    collocation: "ขอบคุณที่รับฟังจริงใจและช่วยแก้ปัญหา / khaawp khun thii rap fang jing jai lae chuai gaae bpan-haa / 谢谢真诚倾听并帮忙解决问题",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เมื่อคุยกับคนอื่น ฉันใช้คำว่า “${row[1]}” เพื่อบอกความรู้สึกอย่างสุภาพและทำให้คุยกันต่อได้ดี`,
  roman: `muea khui gap khon uen chan chai kham waa "${row[2]}" phuea baawk khwaam ruu-suek yaang su-phaap lae tham hai khui gan dtaaw dai dii`,
  chinese: `和别人沟通时，我用“${row[1]}”礼貌表达感受，让对话能继续顺利进行。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "情绪礼貌", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 情绪和礼貌表达。适合在担心、道歉、感谢、催促、委婉不满和关系维护时使用；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_EMOTIONS_POLITENESS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_EMOTIONS_POLITENESS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
