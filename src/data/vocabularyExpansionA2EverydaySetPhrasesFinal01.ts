export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type EverydaySetPhrasesFinalTheme =
  | "真实口语"
  | "礼貌收尾"
  | "轻微拒绝"
  | "确认理解"
  | "请求帮忙"
  | "等待稍后"
  | "建议选择"
  | "解释原因"
  | "聊天回应"
  | "改口修正"
  | "放心安慰"
  | "结束安排";

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
  theme: EverydaySetPhrasesFinalTheme,
];

const EVERYDAY_SET_PHRASES_FINAL_REFS = [
  "worker-a-a2-everyday-set-phrases-final",
  "basic-thai-real-life-phrases",
];

const rows: Row[] = [
  ["ao-baep-nii-laew-gan", "เอาแบบนี้แล้วกัน", "ao baaep nii laew gan", "那就这样吧", "句型", "真实口语"],
  ["ngan-ao-baep-ngai-dii", "งั้นเอาแบบไหนดี", "ngan ao baaep ngai dii", "那选哪种好呢", "句型", "真实口语"],
  ["diao-khoi-waa-gan-iik-thii", "เดี๋ยวค่อยว่ากันอีกที", "diao khaawy waa gan iik thii", "等下再说/再决定", "句型", "真实口语"],
  ["chai-baep-thii-khit-loei", "ใช่แบบที่คิดเลย", "chai baaep thii khit loei", "正是我想的那样", "句型", "真实口语"],
  ["mai-chai-baep-nan-thi-diao", "ไม่ใช่แบบนั้นทีเดียว", "mai chai baaep nan thii diao", "不完全是那样", "句型", "真实口语"],
  ["ao-ngai-go-ao", "เอาไงก็เอา", "ao ngai gaw ao", "怎么都行；就那样吧", "句型", "真实口语"],
  ["khae-nii-go-phaw-laew", "แค่นี้ก็พอแล้ว", "khaae nii gaw phaaw laew", "这样就够了", "句型", "真实口语"],
  ["yang-ngai-go-dai-na", "ยังไงก็ได้นะ", "yang ngai gaw dai na", "怎样都可以哦", "句型", "真实口语"],
  ["khopkhun-laew-jaeng-glap-na", "ขอบคุณ แล้วแจ้งกลับนะ", "khaawp khun laew jaaeng glap na", "谢谢，之后会回复告知", "句型", "礼貌收尾"],
  ["rap-saap-laew-ja-damnoen-gaan", "รับทราบแล้วจะดำเนินการ", "rap saap laew ja dam-noen gaan", "已知悉，会处理", "句型", "礼貌收尾"],
  ["khopkhun-thii-chuai-dtam-rueng-wan-nii", "ขอบคุณที่ช่วยตามเรื่องวันนี้", "khaawp khun thii chuai dtaam rueang wan nii", "谢谢今天帮忙跟进", "句型", "礼貌收尾"],
  ["thaa-mii-arai-jaeng-glap-dai", "ถ้ามีอะไรแจ้งกลับได้", "thaa mii a-rai jaaeng glap dai", "如果有情况可以回复告知", "句型", "礼貌收尾"],
  ["kho-hai-wan-nii-pai-dai-dii", "ขอให้วันนี้ไปได้ดี", "khaaw hai wan nii bpai dai dii", "祝今天顺利", "句型", "礼貌收尾"],
  ["wai-khui-gan-mai-na", "ไว้คุยกันใหม่นะ", "wai khui gan mai na", "之后再聊哦", "句型", "礼貌收尾"],
  ["khopkhun-samrap-wela-wan-nii", "ขอบคุณสำหรับเวลาวันนี้", "khaawp khun sam-rap we-laa wan nii", "谢谢今天抽时间", "句型", "礼貌收尾"],
  ["ja-song-sa-rup-hai-thii-lang", "จะส่งสรุปให้ทีหลัง", "ja song sa-rup hai thii lang", "之后会把总结发给你", "句型", "礼貌收尾"],
  ["kho-rawp-naa-dii-gwaa", "ขอรอบหน้าดีกว่า", "khaaw raawp naa dii gwaa", "下次再说比较好", "句型", "轻微拒绝"],
  ["dtawn-nii-yang-mai-saduak-rap", "ตอนนี้ยังไม่สะดวกรับ", "dtaawn nii yang mai sa-duak rap", "现在还不方便接受", "句型", "轻微拒绝"],
  ["kho-khit-iik-khuen", "ขอคิดอีกคืน", "khaaw khit iik khuen", "请让我再想一晚", "句型", "轻微拒绝"],
  ["yang-mai-phraawm-dtat-sin-jai", "ยังไม่พร้อมตัดสินใจ", "yang mai phraawm dtat-sin-jai", "还没准备好决定", "句型", "轻微拒绝"],
  ["kho-mai-ao-baep-nii-gawn", "ขอไม่เอาแบบนี้ก่อน", "khaaw mai ao baaep nii gaawn", "这种先不要", "句型", "轻微拒绝"],
  ["aat-ja-mai-muean-thii-dtong-gaan", "อาจจะไม่เหมือนที่ต้องการ", "aat ja mai muean thii dtawng gaan", "可能不太符合需要", "句型", "轻微拒绝"],
  ["kho-lop-rueng-nii-ok-gawn", "ขอลบเรื่องนี้ออกก่อน", "khaaw lop rueang nii awk gaawn", "先把这件事删掉/拿掉", "句型", "轻微拒绝"],
  ["khong-dtong-phaak-wai-gawn", "คงต้องฝากไว้ก่อน", "khong dtawng faak wai gaawn", "恐怕要先搁置", "句型", "轻微拒绝"],
  ["khao-jai-trong-kan-rueng-wela-laew", "เข้าใจตรงกันเรื่องเวลาแล้ว", "khao jai dtrong gan rueang we-laa laew", "关于时间已经理解一致了", "句型", "确认理解"],
  ["kho-thuan-iik-rawp", "ขอทวนอีกรอบ", "khaaw thuan iik raawp", "请再复述/核对一遍", "句型", "确认理解"],
  ["thii-khun-mean-khue-baep-nii", "ที่คุณหมายถึงคือแบบนี้", "thii khun maai thueng khue baaep nii", "你的意思是这样", "句型", "确认理解"],
  ["chan-khao-jai-wa-dtong-raw", "ฉันเข้าใจว่าต้องรอ", "chan khao jai waa dtawng raaw", "我理解是需要等", "句型", "确认理解"],
  ["dtrong-nii-thuuk-laew-chai-mai", "ตรงนี้ถูกแล้วใช่ไหม", "dtrong nii thuuk laew chai mai", "这里已经对了是吗", "句型", "确认理解"],
  ["kho-yuenyan-kham-sutthai", "ขอยืนยันคำสุดท้าย", "khaaw yuen-yan kham sut-thaai", "请确认最后一句/最终说法", "句型", "确认理解"],
  ["khaaw-khwaam-nii-mean-wa-yang-ngai", "ข้อความนี้หมายว่ายังไง", "khaaw khwaam nii maai waa yang ngai", "这条消息是什么意思", "句型", "确认理解"],
  ["thaa-khao-jai-phit-chuai-kae", "ถ้าเข้าใจผิดช่วยแก้", "thaa khao jai phit chuai gaae", "如果我理解错了请纠正", "句型", "确认理解"],
  ["chuai-yip-hai-sak-khru", "ช่วยหยิบให้สักครู่", "chuai yip hai sak khruu", "请帮忙拿一下", "句型", "请求帮忙"],
  ["ropguan-duu-hai-nit-nueng", "รบกวนดูให้นิดหนึ่ง", "rop-guan duu hai nit nueng", "麻烦帮忙看一点", "句型", "请求帮忙"],
  ["kho-yuem-chai-saam-naathii", "ขอยืมใช้สามนาที", "khaaw yuem chai saam naa-thii", "借用三分钟", "句型", "请求帮忙"],
  ["chuai-song-dtaaw-hai-phuean", "ช่วยส่งต่อให้เพื่อน", "chuai song dtaaw hai phuean", "请转发给朋友", "句型", "请求帮忙"],
  ["kho-chuai-plian-pen-baep-nii", "ขอช่วยเปลี่ยนเป็นแบบนี้", "khaaw chuai bpliian bpen baaep nii", "请帮忙改成这种", "句型", "请求帮忙"],
  ["chuai-fak-bok-khao-duai", "ช่วยฝากบอกเขาด้วย", "chuai faak baawk khao duai", "请帮我转告他/她", "句型", "请求帮忙"],
  ["ropguan-thaai-ruup-hai-duu", "รบกวนถ่ายรูปให้ดู", "rop-guan thaai ruup hai duu", "麻烦拍照给我看", "句型", "请求帮忙"],
  ["chuai-kep-wai-hai-noy", "ช่วยเก็บไว้ให้หน่อย", "chuai gep wai hai naawy", "请帮我留着", "句型", "请求帮忙"],
  ["raw-saep-nueng-na", "รอแป๊บหนึ่งนะ", "raaw bpaaep nueng na", "等一下哦", "句型", "等待稍后"],
  ["diao-glap-maa-top", "เดี๋ยวกลับมาตอบ", "diao glap maa dtaawp", "等下回来回复", "句型", "等待稍后"],
  ["kho-welaa-duu-gawn", "ขอเวลาดูก่อน", "khaaw we-laa duu gaawn", "请给时间先看一下", "句型", "等待稍后"],
  ["yang-mai-than-duu-loei", "ยังไม่ทันดูเลย", "yang mai than duu loei", "还没来得及看", "句型", "等待稍后"],
  ["raw-hai-khrop-khon-gawn", "รอให้ครบคนก่อน", "raaw hai khrop khon gaawn", "先等人到齐", "句型", "等待稍后"],
  ["khoi-dtam-dtaam-ton-baai", "ค่อยติดตามตอนบ่าย", "khaawy dtit dtaam dtaawn baai", "下午再跟进", "句型", "等待稍后"],
  ["diao-ja-check-hai-laew-bok", "เดี๋ยวจะเช็กให้แล้วบอก", "diao ja chek hai laew baawk", "等下帮你查了再说", "句型", "等待稍后"],
  ["phak-rueng-nii-wai-gawn", "พักเรื่องนี้ไว้ก่อน", "phak rueang nii wai gaawn", "这件事先暂停/放一放", "句型", "等待稍后"],
  ["lueak-an-thii-ngai-gawn", "เลือกอันที่ง่ายก่อน", "lueak an thii ngaai gaawn", "先选简单的那个", "句型", "建议选择"],
  ["ao-thii-phaw-dii-gwaa", "เอาที่พอดีกว่า", "ao thii phaaw-dii gwaa", "选刚刚好的更好", "句型", "建议选择"],
  ["laawng-baep-nii-gawn-mai", "ลองแบบนี้ก่อนไหม", "laawng baaep nii gaawn mai", "要不要先试这种", "句型", "建议选择"],
  ["thaa-phaeng-go-plian-ran", "ถ้าแพงก็เปลี่ยนร้าน", "thaa phaaeng gaw bpliian raan", "贵的话就换店", "句型", "建议选择"],
  ["khit-wa-an-nii-khum-gwaa", "คิดว่าอันนี้คุ้มกว่า", "khit waa an nii khum gwaa", "觉得这个更划算", "句型", "建议选择"],
  ["ao-baep-thii-chai-ngai", "เอาแบบที่ใช้ง่าย", "ao baaep thii chai ngaai", "选好用的那种", "句型", "建议选择"],
  ["mai-dtong-lueak-thii-sut", "ไม่ต้องเลือกที่สุด", "mai dtawng lueak thii sut", "不用选最极端/最好的", "句型", "建议选择"],
  ["duu-rakha-gawn-dtat-sin-jai", "ดูราคาก่อนตัดสินใจ", "duu raa-khaa gaawn dtat-sin-jai", "决定前先看价格", "句型", "建议选择"],
  ["phraw-meua-khuen-non-duek", "เพราะเมื่อคืนนอนดึก", "phraw muea khuen naawn duek", "因为昨晚睡得晚", "短语", "解释原因"],
  ["loei-top-chaa-pai-noy", "เลยตอบช้าไปหน่อย", "loei dtaawp chaa bpai naawy", "所以回复稍晚了一点", "句型", "解释原因"],
  ["phraw-mai-hen-jaeng-dtuean", "เพราะไม่เห็นแจ้งเตือน", "phraw mai hen jaaeng dteuan", "因为没看到通知", "短语", "解释原因"],
  ["loei-mai-dai-rap-sai", "เลยไม่ได้รับสาย", "loei mai dai rap saai", "所以没接到电话", "句型", "解释原因"],
  ["phraw-tid-thura-kra-than-han", "เพราะติดธุระกะทันหัน", "phraw dtit thu-ra ga-than-han", "因为临时有事", "短语", "解释原因"],
  ["loei-dtong-plian-phaen", "เลยต้องเปลี่ยนแผน", "loei dtawng bpliian phaaen", "所以必须改计划", "句型", "解释原因"],
  ["phraw-khaawng-yang-mai-khrop", "เพราะของยังไม่ครบ", "phraw khaawng yang mai khrop", "因为东西还不齐", "短语", "解释原因"],
  ["loei-kho-welaa-phoem", "เลยขอเวลาเพิ่ม", "loei khaaw we-laa phoem", "所以请求多一点时间", "句型", "解释原因"],
  ["jing-duai-chai-mai", "จริงด้วยใช่ไหม", "jing duai chai mai", "确实是这样，对吗", "句型", "聊天回应"],
  ["fang-duu-ok-na", "ฟังดูโอเคนะ", "fang duu oo-khee na", "听起来可以哦", "句型", "聊天回应"],
  ["naasonjai-yuu-na", "น่าสนใจอยู่นะ", "naa son jai yuu na", "还挺有意思的", "句型", "聊天回应"],
  ["muean-ja-yak-nit-nueng", "เหมือนจะยากนิดหนึ่ง", "muean ja yaak nit nueng", "好像有点难", "句型", "聊天回应"],
  ["dii-thii-bok-gawn", "ดีที่บอกก่อน", "dii thii baawk gaawn", "幸好提前说了", "句型", "聊天回应"],
  ["khao-jai-laew-wa-tham-mai", "เข้าใจแล้วว่าทำไม", "khao jai laew waa tham mai", "明白为什么了", "句型", "聊天回应"],
  ["mai-nae-jai-tae-laawng-dai", "ไม่แน่ใจแต่ลองได้", "mai naae jai dtaae laawng dai", "不确定但可以试", "句型", "聊天回应"],
  ["mii-hetphon-dii-na", "มีเหตุผลดีนะ", "mii heet phon dii na", "理由挺合理", "句型", "聊天回应"],
  ["phuut-mai-hai-chat", "พูดใหม่ให้ชัด", "phuut mai hai chat", "重新说清楚", "动词", "改口修正"],
  ["kae-pen-kham-nii", "แก้เป็นคำนี้", "gaae bpen kham nii", "改成这个词", "动词", "改口修正"],
  ["maai-thueng-iik-baep", "หมายถึงอีกแบบ", "maai thueng iik baaep", "指的是另一种", "句型", "改口修正"],
  ["mai-chai-an-nan-tae-pen-an-nii", "ไม่ใช่อันนั้นแต่เป็นอันนี้", "mai chai an nan dtaae bpen an nii", "不是那个，是这个", "句型", "改口修正"],
  ["kho-kae-khwaam-khao-jai-noy", "ขอแก้ความเข้าใจหน่อย", "khaaw gaae khwaam khao jai naawy", "请允许纠正一下理解", "句型", "改口修正"],
  ["muea-kii-phuut-chue-phit", "เมื่อกี้พูดชื่อผิด", "muea gii phuut chue phit", "刚才把名字说错了", "句型", "改口修正"],
  ["dtong-pen-wan-phut-mai-chai-wan-phat", "ต้องเป็นวันพุธไม่ใช่วันพฤหัส", "dtawng bpen wan phut mai chai wan pha-rue-hat", "应该是星期三，不是星期四", "句型", "改口修正"],
  ["kho-phim-mai-iik-khrang", "ขอพิมพ์ใหม่อีกครั้ง", "khaaw phim mai iik khrang", "请让我重新打一遍", "句型", "改口修正"],
  ["mai-dtong-khit-mak-na", "ไม่ต้องคิดมากนะ", "mai dtawng khit maak na", "别想太多哦", "句型", "放心安慰"],
  ["mai-pen-pan-ha-yai", "ไม่เป็นปัญหาใหญ่", "mai bpen bpan-haa yai", "不是什么大问题", "句型", "放心安慰"],
  ["kae-dai-yuu-laew", "แก้ได้อยู่แล้ว", "gaae dai yuu laew", "肯定能解决", "句型", "放心安慰"],
  ["khai-khai-go-khoei-phit", "ใคร ๆ ก็เคยผิด", "khrai khrai gaw khoei phit", "谁都犯过错", "句型", "放心安慰"],
  ["rao-khoi-tham-thii-la-khan", "เราค่อยทำทีละขั้น", "rao khaawy tham thii la khan", "我们一步一步做", "句型", "放心安慰"],
  ["yang-mii-welaa-kae", "ยังมีเวลาแก้", "yang mii we-laa gaae", "还有时间修改", "句型", "放心安慰"],
  ["phit-nit-diao-mai-pen-rai", "ผิดนิดเดียวไม่เป็นไร", "phit nit diao mai bpen rai", "错一点没关系", "句型", "放心安慰"],
  ["thuk-yaang-ja-dii-khuen", "ทุกอย่างจะดีขึ้น", "thuk yaang ja dii khuen", "一切会好起来", "句型", "放心安慰"],
  ["wan-nii-ao-khae-nii-gawn", "วันนี้เอาแค่นี้ก่อน", "wan nii ao khaae nii gaawn", "今天先到这里", "句型", "结束安排"],
  ["phrueng-nii-khoi-dtaaw", "พรุ่งนี้ค่อยต่อ", "phrung nii khaawy dtaaw", "明天再继续", "句型", "结束安排"],
  ["thii-luea-wai-tham-thii-lang", "ที่เหลือไว้ทำทีหลัง", "thii luea wai tham thii lang", "剩下的留到之后做", "句型", "结束安排"],
  ["diao-sa-rup-song-hai", "เดี๋ยวสรุปส่งให้", "diao sa-rup song hai", "等下总结后发给你", "句型", "结束安排"],
  ["thuk-khon-ok-laew", "ทุกคนโอเคแล้ว", "thuk khon oo-khee laew", "大家都可以了", "句型", "结束安排"],
  ["kho-bpit-rueng-nii-gawn", "ขอปิดเรื่องนี้ก่อน", "khaaw bpit rueang nii gaawn", "先结束这件事", "句型", "结束安排"],
  ["raw-dtam-phon-phrueng-nii", "รอตามผลพรุ่งนี้", "raaw dtaam phon phrung nii", "等明天跟进结果", "句型", "结束安排"],
  ["jop-laew-khoi-phak", "จบแล้วค่อยพัก", "jop laew khaawy phak", "结束后再休息", "句型", "结束安排"],
];

const relatedByTheme: Record<
  EverydaySetPhrasesFinalTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  真实口语: {
    synonym: "เอาแบบนี้แล้วกัน / ao baaep nii laew gan / 那就这样吧",
    antonym: "ยังไม่เอา / yang mai ao / 还不要",
    comparison: "แล้วกัน 常用于轻松做决定，语气比命令柔和。",
    collocation: "งั้นเอาแบบไหนดี เอาแบบนี้แล้วกัน / ngan ao baaep ngai dii ao baaep nii laew gan / 那选哪种好呢？那就这样吧",
  },
  礼貌收尾: {
    synonym: "ขอบคุณ แล้วแจ้งกลับนะ / khaawp khun laew jaaeng glap na / 谢谢，之后回复",
    antonym: "ไม่ตอบกลับ / mai dtaawp glap / 不回复",
    comparison: "礼貌收尾常用 แล้ว、ไว้、ถ้ามีอะไร 来留下后续空间。",
    collocation: "ขอบคุณสำหรับเวลาวันนี้ จะส่งสรุปให้ทีหลัง / khaawp khun sam-rap we-laa wan nii ja song sa-rup hai thii lang / 谢谢今天抽时间，之后会发总结",
  },
  轻微拒绝: {
    synonym: "ขอรอบหน้าดีกว่า / khaaw raawp naa dii gwaa / 下次比较好",
    antonym: "ตกลงทันที / dtoh-long than-thii / 立刻同意",
    comparison: "ขอ...ก่อน 可把拒绝说得较轻，避免太直接。",
    collocation: "ตอนนี้ยังไม่สะดวกรับ ขอรอบหน้าดีกว่า / dtaawn nii yang mai sa-duak rap khaaw raawp naa dii gwaa / 现在不方便接受，下次吧",
  },
  确认理解: {
    synonym: "ขอทวนอีกรอบ / khaaw thuan iik raawp / 请再核对一遍",
    antonym: "เข้าใจไม่ตรงกัน / khao jai mai dtrong gan / 理解不一致",
    comparison: "ทวน 是复述核对，ยืนยัน 是确认结果。",
    collocation: "ขอทวนอีกรอบ ถ้าเข้าใจผิดช่วยแก้ / khaaw thuan iik raawp thaa khao jai phit chuai gaae / 请再核对一遍，如果理解错请纠正",
  },
  请求帮忙: {
    synonym: "รบกวนดูให้นิดหนึ่ง / rop-guan duu hai nit nueng / 麻烦看一下",
    antonym: "ทำเองทั้งหมด / tham eng thang mot / 全部自己做",
    comparison: "ช่วย...หน่อย 偏口语，รบกวน... 更礼貌。",
    collocation: "รบกวนถ่ายรูปให้ดู แล้วช่วยเก็บไว้ให้หน่อย / rop-guan thaai ruup hai duu laew chuai gep wai hai naawy / 麻烦拍照给我看，然后帮我留着",
  },
  等待稍后: {
    synonym: "รอแป๊บหนึ่งนะ / raaw bpaaep nueng na / 等一下哦",
    antonym: "ตอนนี้เลย / dtaawn nii loei / 现在马上",
    comparison: "เดี๋ยว 表示等下，ค่อย 表示稍后再做。",
    collocation: "ยังไม่ทันดูเลย เดี๋ยวจะเช็กให้แล้วบอก / yang mai than duu loei diao ja chek hai laew baawk / 还没来得及看，等下查了再说",
  },
  建议选择: {
    synonym: "ลองแบบนี้ก่อนไหม / laawng baaep nii gaawn mai / 要不要先试这种",
    antonym: "ไม่ลองเลย / mai laawng loei / 完全不试",
    comparison: "ลอง...ก่อนไหม 是柔和建议，不像命令。",
    collocation: "ดูราคาก่อนตัดสินใจ ถ้าแพงก็เปลี่ยนร้าน / duu raa-khaa gaawn dtat-sin-jai thaa phaaeng gaw bpliian raan / 决定前先看价格，贵的话换店",
  },
  解释原因: {
    synonym: "เพราะติดธุระกะทันหัน / phraw dtit thu-ra ga-than-han / 因为临时有事",
    antonym: "ไม่มีเหตุผล / mai mii heet phon / 没有理由",
    comparison: "เพราะ 说原因，เลย 说结果，A2 口语里常连用。",
    collocation: "เพราะไม่เห็นแจ้งเตือน เลยตอบช้าไปหน่อย / phraw mai hen jaaeng dteuan loei dtaawp chaa bpai naawy / 因为没看到通知，所以回复稍晚",
  },
  聊天回应: {
    synonym: "ฟังดูโอเคนะ / fang duu oo-khee na / 听起来可以",
    antonym: "ฟังดูไม่โอเค / fang duu mai oo-khee / 听起来不行",
    comparison: "ดู 在这里表示“看起来/听起来”，不是只表示看。",
    collocation: "น่าสนใจอยู่นะ แต่เหมือนจะยากนิดหนึ่ง / naa son jai yuu na dtaae muean ja yaak nit nueng / 还挺有意思，但好像有点难",
  },
  改口修正: {
    synonym: "เมื่อกี้พูดผิด / muea gii phuut phit / 刚才说错了",
    antonym: "พูดถูกแล้ว / phuut thuuk laew / 已经说对",
    comparison: "ไม่ใช่...แต่เป็น... 是基础纠错框架。",
    collocation: "เมื่อกี้พูดผิด ต้องเป็นวันพุธไม่ใช่วันพฤหัส / muea gii phuut phit dtawng bpen wan phut mai chai wan pha-rue-hat / 刚才说错了，应该是周三不是周四",
  },
  放心安慰: {
    synonym: "ไม่ต้องคิดมากนะ / mai dtawng khit maak na / 别想太多",
    antonym: "กังวลมาก / gang-won maak / 很担心",
    comparison: "นะ 可让安慰语更温和，适合熟人或友好场景。",
    collocation: "ผิดนิดเดียวไม่เป็นไร ยังมีเวลาแก้ / phit nit diao mai bpen rai yang mii we-laa gaae / 错一点没关系，还有时间改",
  },
  结束安排: {
    synonym: "วันนี้เอาแค่นี้ก่อน / wan nii ao khaae nii gaawn / 今天先到这里",
    antonym: "ทำต่อทันที / tham dtaaw than-thii / 立刻继续做",
    comparison: "เอาแค่นี้ก่อน 用来暂停或收尾，不一定表示全部结束。",
    collocation: "วันนี้เอาแค่นี้ก่อน พรุ่งนี้ค่อยต่อ / wan nii ao khaae nii gaawn phrung nii khaawy dtaaw / 今天先到这里，明天再继续",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในบทสนทนาจริง ฉันใช้ “${row[1]}” เพื่อพูดให้เป็นธรรมชาติ สุภาพ และเข้าใจกันง่าย`,
  roman: `nai bot-son-tha-naa jing chan chai "${row[2]}" phuea phuut hai bpen tham-ma-chaat su-phaap lae khao jai gan ngaai`,
  chinese: `在真实对话中，我用“${row[1]}”让表达更自然、更礼貌，也更容易互相理解。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "日常固定表达最终补漏", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 日常固定表达最终补漏。适合真实口语、礼貌收尾、轻微拒绝、确认、请求、解释和结束安排；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: EVERYDAY_SET_PHRASES_FINAL_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_EVERYDAY_SET_PHRASES_FINAL_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
