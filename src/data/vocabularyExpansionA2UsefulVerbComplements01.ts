export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type UsefulVerbComplementsTheme =
  | "做完未完"
  | "用光耗尽"
  | "懂和清楚"
  | "找到得到"
  | "及时赶上"
  | "做对做错"
  | "能用不能用"
  | "变化程度"
  | "动作继续"
  | "放置带回"
  | "够不够用"
  | "能不能承受";

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
  theme: UsefulVerbComplementsTheme,
];

const USEFUL_VERB_COMPLEMENTS_REFS = [
  "worker-a-a2-useful-verb-complements",
  "basic-thai-result-phrases",
];

const rows: Row[] = [
  ["tham-ngaan-baan-set", "ทำงานบ้านเสร็จ", "tham ngaan baan set", "家务做完", "动词", "做完未完"],
  ["tham-baep-fuek-hat-set", "ทำแบบฝึกหัดเสร็จ", "tham baaep fuek hat set", "练习做完", "动词", "做完未完"],
  ["tham-raai-ngaan-mai-set", "ทำรายงานไม่เสร็จ", "tham raai ngaan mai set", "报告没做完", "动词", "做完未完"],
  ["khian-chue-set", "เขียนชื่อเสร็จ", "khian chue set", "名字写完", "动词", "做完未完"],
  ["aan-naa-nii-set", "อ่านหน้านี้เสร็จ", "aan naa nii set", "这一页读完", "动词", "做完未完"],
  ["laang-jaan-set", "ล้างจานเสร็จ", "laang jaan set", "碗洗完", "动词", "做完未完"],
  ["jat-hong-set", "จัดห้องเสร็จ", "jat hawng set", "房间整理完", "动词", "做完未完"],
  ["triiam-khaawng-set", "เตรียมของเสร็จ", "dtriiam khaawng set", "东西准备完", "动词", "做完未完"],
  ["gin-khaaw-mot", "กินข้าวหมด", "gin khaao mot", "饭吃完/吃光", "动词", "用光耗尽"],
  ["chai-sabuu-mot", "ใช้สบู่หมด", "chai sa-buu mot", "肥皂用完", "动词", "用光耗尽"],
  ["nam-duem-mot", "น้ำดื่มหมด", "naam duem mot", "饮用水没了", "句型", "用光耗尽"],
  ["ngoen-sot-mot", "เงินสดหมด", "ngoen sot mot", "现金用完", "句型", "用光耗尽"],
  ["bat-mue-thue-mot-laew", "แบตมือถือหมดแล้ว", "baet mue-thue mot laew", "手机电量已经耗尽", "句型", "用光耗尽"],
  ["khong-nai-dtuu-yen-mot", "ของในตู้เย็นหมด", "khaawng nai dtuu yen mot", "冰箱里的东西没了", "句型", "用光耗尽"],
  ["khai-khaawng-mot-wan-nii", "ขายของหมดวันนี้", "khaai khaawng mot wan nii", "今天东西卖完", "动词", "用光耗尽"],
  ["phuut-rueng-nii-mot-laew", "พูดเรื่องนี้หมดแล้ว", "phuut rueang nii mot laew", "这件事已经说完", "动词", "用光耗尽"],
  ["fang-khruu-khao-jai", "ฟังครูเข้าใจ", "fang khruu khao jai", "听老师讲能懂", "动词", "懂和清楚"],
  ["aan-kham-nii-khao-jai", "อ่านคำนี้เข้าใจ", "aan kham nii khao jai", "读这个词能懂", "动词", "懂和清楚"],
  ["duu-withi-nii-khao-jai", "ดูวิธีนี้เข้าใจ", "duu wi-thii nii khao jai", "看这个方法能懂", "动词", "懂和清楚"],
  ["phuut-hai-phuean-khao-jai", "พูดให้เพื่อนเข้าใจ", "phuut hai phuean khao jai", "说到让朋友明白", "动词", "懂和清楚"],
  ["fang-siang-nii-mai-khao-jai", "ฟังเสียงนี้ไม่เข้าใจ", "fang siiang nii mai khao jai", "听这个声音听不懂", "动词", "懂和清楚"],
  ["aan-laai-mue-mai-ok", "อ่านลายมือไม่ออก", "aan laai mue mai awk", "看不出手写字", "动词", "懂和清楚"],
  ["fang-kham-thai-mai-chat", "ฟังคำไทยไม่ชัด", "fang kham thai mai chat", "泰语词听不清", "动词", "懂和清楚"],
  ["hen-tua-lek-mai-chat", "เห็นตัวเลขไม่ชัด", "hen dtua leek mai chat", "看不清数字", "动词", "懂和清楚"],
  ["haa-gunjae-joo", "หากุญแจเจอ", "haa gun-jaae joe", "找到钥匙", "动词", "找到得到"],
  ["haa-bat-mai-joo", "หาบัตรไม่เจอ", "haa bat mai joe", "找不到卡/证件", "动词", "找到得到"],
  ["haa-ekgasaan-mai-phop", "หาเอกสารไม่พบ", "haa ek-ga-saan mai phop", "没找到文件", "动词", "找到得到"],
  ["haa-sue-yaa-dai", "หาซื้อยาได้", "haa sue yaa dai", "买得到药", "动词", "找到得到"],
  ["haa-sue-khaawng-nii-mai-dai", "หาซื้อของนี้ไม่ได้", "haa sue khaawng nii mai dai", "买不到这个东西", "动词", "找到得到"],
  ["jawng-to-dai", "จองโต๊ะได้", "jaawng dto dai", "订得到桌位", "动词", "找到得到"],
  ["jawng-tua-mai-dai", "จองตั๋วไม่ได้", "jaawng dtua mai dai", "订不到票", "动词", "找到得到"],
  ["dtit-dtaaw-jao-naa-thii-dai", "ติดต่อเจ้าหน้าที่ได้", "dtit dtaaw jao naa thii dai", "联系得到工作人员", "动词", "找到得到"],
  ["bpai-tham-rot-fai", "ไปทันรถไฟ", "bpai than rot fai", "赶得上火车", "动词", "及时赶上"],
  ["maa-mai-tham-nat", "มาไม่ทันนัด", "maa mai than nat", "没赶上约定时间", "动词", "及时赶上"],
  ["tham-ngaan-tham-gawn-yen", "ทำงานทันก่อนเย็น", "tham ngaan than gaawn yen", "傍晚前做得完工作", "动词", "及时赶上"],
  ["song-gaan-baan-tham", "ส่งการบ้านทัน", "song gaan baan than", "作业交得及时", "动词", "及时赶上"],
  ["gin-khaaw-chao-tham", "กินข้าวเช้าทัน", "gin khaao chao than", "来得及吃早饭", "动词", "及时赶上"],
  ["sue-khaawng-tham-gawn-bpit", "ซื้อของทันก่อนปิด", "sue khaawng than gaawn bpit", "关门前来得及买东西", "动词", "及时赶上"],
  ["khuen-rot-may-mai-tham", "ขึ้นรถเมล์ไม่ทัน", "khuen rot mee mai than", "没赶上公交", "动词", "及时赶上"],
  ["dtam-bot-rian-mai-tham", "ตามบทเรียนไม่ทัน", "dtaam bot riian mai than", "跟不上课文/课程", "动词", "及时赶上"],
  ["yip-baep-thuuk", "หยิบแบบถูก", "yip baaep thuuk", "拿对款式", "动词", "做对做错"],
  ["yip-si-phit", "หยิบสีผิด", "yip sii phit", "拿错颜色", "动词", "做对做错"],
  ["song-hai-khun-thuuk", "ส่งให้คุณถูก", "song hai khun thuuk", "发给你发对了", "动词", "做对做错"],
  ["song-khon-la-file-phit", "ส่งคนละไฟล์ผิด", "song khon la fai phit", "错发成另一个文件", "动词", "做对做错"],
  ["jam-wela-nat-thuuk", "จำเวลานัดถูก", "jam we-laa nat thuuk", "记对预约时间", "动词", "做对做错"],
  ["jam-baan-lek-thii-phit", "จำบ้านเลขที่ผิด", "jam baan leek thii phit", "记错门牌号", "动词", "做对做错"],
  ["phuut-chue-ran-thuuk", "พูดชื่อร้านถูก", "phuut chue raan thuuk", "说对店名", "动词", "做对做错"],
  ["phuut-rakha-phit", "พูดราคาผิด", "phuut raa-khaa phit", "说错价格", "动词", "做对做错"],
  ["poet-praatu-dai", "เปิดประตูได้", "bpoet bpra-dtuu dai", "门能打开", "动词", "能用不能用"],
  ["poet-fai-mai-dai", "เปิดไฟไม่ได้", "bpoet fai mai dai", "灯打不开", "动词", "能用不能用"],
  ["bpit-naa-taang-dai", "ปิดหน้าต่างได้", "bpit naa dtaang dai", "窗户能关上", "动词", "能用不能用"],
  ["bpit-gok-nam-mai-dai", "ปิดก๊อกน้ำไม่ได้", "bpit gaawk naam mai dai", "水龙头关不上", "动词", "能用不能用"],
  ["chai-wifi-dai", "ใช้ไวไฟได้", "chai wai-fai dai", "Wi-Fi 能用", "动词", "能用不能用"],
  ["chai-printer-mai-dai", "ใช้พรินเตอร์ไม่ได้", "chai phrin-dter mai dai", "打印机不能用", "动词", "能用不能用"],
  ["som-gunjae-dai", "ซ่อมกุญแจได้", "saawm gun-jaae dai", "钥匙能修", "动词", "能用不能用"],
  ["som-khruang-nii-mai-dai", "ซ่อมเครื่องนี้ไม่ได้", "saawm khreuuang nii mai dai", "这台机器修不了", "动词", "能用不能用"],
  ["aa-gaan-puat-dii-khuen", "อาการปวดดีขึ้น", "aa-gaan bpuat dii khuen", "疼痛症状好转", "句型", "变化程度"],
  ["fon-tok-naek-long", "ฝนตกหนักลง", "fon dtok nak long", "雨下得没那么大了", "句型", "变化程度"],
  ["siang-bao-long", "เสียงเบาลง", "siiang bao long", "声音变小", "句型", "变化程度"],
  ["rot-dtit-nak-khuen", "รถติดหนักขึ้น", "rot dtit nak khuen", "堵车更严重", "句型", "变化程度"],
  ["internet-reo-khuen", "อินเทอร์เน็ตเร็วขึ้น", "in-thoe-net reo khuen", "网速变快", "句型", "变化程度"],
  ["dern-thaang-chaa-long", "เดินทางช้าลง", "doen thaang chaa long", "出行变慢", "句型", "变化程度"],
  ["rakha-phaeng-khuen", "ราคาแพงขึ้น", "raa-khaa phaaeng khuen", "价格变贵", "句型", "变化程度"],
  ["rakha-thuuk-long", "ราคาถูกลง", "raa-khaa thuuk long", "价格降低", "句型", "变化程度"],
  ["roem-tham-ton-chao", "เริ่มทำตอนเช้า", "roem tham dtaawn chao", "早上开始做", "动词", "动作继续"],
  ["tham-ngaan-dtaaw-phrueng-nii", "ทำงานต่อพรุ่งนี้", "tham ngaan dtaaw phrung nii", "明天继续工作", "动词", "动作继续"],
  ["yut-phak-sip-naathii", "หยุดพักสิบนาที", "yut phak sip naa-thii", "停下来休息十分钟", "动词", "动作继续"],
  ["lawng-tham-duu-iik-khrang", "ลองทำดูอีกครั้ง", "laawng tham duu iik khrang", "再试着做一次", "动词", "动作继续"],
  ["tham-baep-nii-mai", "ทำแบบนี้ใหม่", "tham baaep nii mai", "重新这样做", "动词", "动作继续"],
  ["tham-sam-song-khrang", "ทำซ้ำสองครั้ง", "tham sam saawng khrang", "重复做两次", "动词", "动作继续"],
  ["tham-dtaam-kham-nae-nam-nai-bai-nii", "ทำตามคำแนะนำในใบนี้", "tham dtaam kham nae nam nai bai nii", "按照这张单子上的建议做", "动词", "动作继续"],
  ["tham-eng-dai-laew", "ทำเองได้แล้ว", "tham eng dai laew", "已经能自己做了", "动词", "动作继续"],
  ["ao-ekgasaan-bpai", "เอาเอกสารไป", "ao ek-ga-saan bpai", "把文件带去", "动词", "放置带回"],
  ["ao-khaawng-kin-maa", "เอาของกินมา", "ao khaawng gin maa", "把吃的带来", "动词", "放置带回"],
  ["ao-rom-glap", "เอาร่มกลับ", "ao rom glap", "把伞带回", "动词", "放置带回"],
  ["waang-bat-wai-bon-to", "วางบัตรไว้บนโต๊ะ", "waang bat wai bon dto", "把卡放在桌上", "动词", "放置带回"],
  ["gep-samphao-wai-nai-hong", "เก็บสัมภาระไว้ในห้อง", "gep sam-phaa-ra wai nai hawng", "把行李放在房间里", "动词", "放置带回"],
  ["luem-khaawng-wai-bon-rot", "ลืมของไว้บนรถ", "luem khaawng wai bon rot", "把东西忘在车上", "动词", "放置带回"],
  ["thing-thung-wai-naa-baan", "ทิ้งถุงไว้หน้าบ้าน", "thing thung wai naa baan", "把袋子留在家门口", "动词", "放置带回"],
  ["song-khaawng-khuen-ran", "ส่งของคืนร้าน", "song khaawng khuen raan", "把东西退还给店家", "动词", "放置带回"],
  ["khaaw-phaw-gin", "ข้าวพอกิน", "khaao phaaw gin", "饭够吃", "句型", "够不够用"],
  ["nam-mai-phaw-duem", "น้ำไม่พอดื่ม", "naam mai phaaw duem", "水不够喝", "句型", "够不够用"],
  ["sabu-phaw-chai", "สบู่พอใช้", "sa-buu phaaw chai", "肥皂够用", "句型", "够不够用"],
  ["wi-fi-mai-phaw-chai", "ไวไฟไม่พอใช้", "wai-fai mai phaaw chai", "Wi-Fi 不够用", "句型", "够不够用"],
  ["thii-nang-phaw-samrap-thuk-khon", "ที่นั่งพอสำหรับทุกคน", "thii nang phaaw sam-rap thuk khon", "座位够所有人坐", "句型", "够不够用"],
  ["thii-jawt-rot-mai-phaw", "ที่จอดรถไม่พอ", "thii jaawt rot mai phaaw", "停车位不够", "句型", "够不够用"],
  ["welaa-mai-phaw-tham", "เวลาไม่พอทำ", "we-laa mai phaaw tham", "时间不够做", "句型", "够不够用"],
  ["ngoen-phaw-jaai", "เงินพอจ่าย", "ngoen phaaw jaai", "钱够付", "句型", "够不够用"],
  ["raw-iik-ha-naathii-wai", "รออีกห้านาทีไหว", "raaw iik haa naa-thii wai", "再等五分钟还可以", "句型", "能不能承受"],
  ["raw-nan-goen-pai-mai-wai", "รอนานเกินไปไม่ไหว", "raaw naan goen bpai mai wai", "等太久受不了", "句型", "能不能承受"],
  ["doen-glai-nit-nueng-wai", "เดินไกลนิดหนึ่งไหว", "doen glai nit nueng wai", "走远一点还能承受", "句型", "能不能承受"],
  ["gin-phet-mai-wai", "กินเผ็ดไม่ไหว", "gin phet mai wai", "吃不了辣", "句型", "能不能承受"],
  ["jam-ber-thoo-dai", "จำเบอร์โทรได้", "jam boe thoo dai", "记得电话号码", "动词", "能不能承受"],
  ["jam-rakha-mai-dai", "จำราคาไม่ได้", "jam raa-khaa mai dai", "记不住价格", "动词", "能不能承受"],
  ["nawn-bon-rot-dai", "นอนบนรถได้", "naawn bon rot dai", "能在车上睡", "动词", "能不能承受"],
  ["nawn-phraw-siang-dang-mai-lap", "นอนเพราะเสียงดังไม่หลับ", "naawn phraw siiang dang mai lap", "因为太吵睡不着", "句型", "能不能承受"],
];

const relatedByTheme: Record<
  UsefulVerbComplementsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  做完未完: {
    synonym: "ทำงานบ้านเสร็จ / tham ngaan baan set / 家务做完",
    antonym: "ทำไม่เสร็จ / tham mai set / 没做完",
    comparison: "เสร็จ 放在动作后表示完成，ไม่เสร็จ 表示未完成。",
    collocation: "ล้างจานเสร็จแล้วค่อยพัก / laang jaan set laew khaawy phak / 洗完碗再休息",
  },
  用光耗尽: {
    synonym: "ใช้สบู่หมด / chai sa-buu mot / 肥皂用完",
    antonym: "ยังเหลือ / yang luea / 还剩",
    comparison: "หมด 表示用完、吃完、卖完或耗尽，常放在名词或动词后。",
    collocation: "น้ำดื่มหมด ต้องไปซื้อเพิ่ม / naam duem mot dtawng bpai sue phoem / 饮用水没了，要去再买",
  },
  懂和清楚: {
    synonym: "ฟังครูเข้าใจ / fang khruu khao jai / 听老师讲能懂",
    antonym: "ฟังไม่เข้าใจ / fang mai khao jai / 听不懂",
    comparison: "เข้าใจ 是理解，ชัด 是清楚；听懂和听清不完全一样。",
    collocation: "ฟังคำไทยไม่ชัด เลยไม่เข้าใจ / fang kham thai mai chat loei mai khao jai / 泰语词听不清，所以不懂",
  },
  找到得到: {
    synonym: "หากุญแจเจอ / haa gun-jaae joe / 找到钥匙",
    antonym: "หาไม่เจอ / haa mai joe / 找不到",
    comparison: "หาเจอ 强调找到了，หาซื้อได้ 强调买得到。",
    collocation: "หาบัตรไม่เจอ ต้องกลับไปดูที่บ้าน / haa bat mai joe dtawng glap bpai duu thii baan / 找不到卡，得回家看看",
  },
  及时赶上: {
    synonym: "ไปทันรถไฟ / bpai than rot fai / 赶得上火车",
    antonym: "ไม่ทัน / mai than / 来不及",
    comparison: "ทัน 表示来得及或赶上，ตามไม่ทัน 表示跟不上进度。",
    collocation: "ขึ้นรถเมล์ไม่ทัน เพราะออกจากบ้านช้า / khuen rot mee mai than phraw awk jaak baan chaa / 没赶上公交，因为出门晚",
  },
  做对做错: {
    synonym: "จำเวลานัดถูก / jam we-laa nat thuuk / 记对预约时间",
    antonym: "จำผิด / jam phit / 记错",
    comparison: "ถูก 表示正确，ผิด 表示错误，常接在动作后说明结果。",
    collocation: "พูดราคาผิด ต้องแก้ใหม่ / phuut raa-khaa phit dtawng gaae mai / 说错价格，需要重新改",
  },
  能用不能用: {
    synonym: "ใช้ไวไฟได้ / chai wai-fai dai / Wi-Fi 能用",
    antonym: "ใช้ไม่ได้ / chai mai dai / 不能用",
    comparison: "ได้ / ไม่ได้ 放在动词后，表示能不能完成该动作。",
    collocation: "เปิดไฟไม่ได้ เลยต้องเรียกช่าง / bpoet fai mai dai loei dtawng riiak chang / 灯打不开，所以要叫师傅",
  },
  变化程度: {
    synonym: "อาการดีขึ้น / aa-gaan dii khuen / 症状好转",
    antonym: "แย่ลง / yaae long / 变差",
    comparison: "ขึ้น 常表示增加或变得更强，ลง 常表示减少或变弱。",
    collocation: "อินเทอร์เน็ตเร็วขึ้น แต่ราคาแพงขึ้นด้วย / in-thoe-net reo khuen dtaae raa-khaa phaaeng khuen duai / 网速变快了，但价格也变贵了",
  },
  动作继续: {
    synonym: "ทำงานต่อพรุ่งนี้ / tham ngaan dtaaw phrung nii / 明天继续工作",
    antonym: "หยุดทำ / yut tham / 停止做",
    comparison: "ต่อ 表示继续，ใหม่ 表示重新，ซ้ำ 表示重复。",
    collocation: "ลองทำดูอีกครั้ง ถ้ายังไม่ได้ค่อยถาม / laawng tham duu iik khrang thaa yang mai dai khaawy thaam / 再试着做一次，如果还不行再问",
  },
  放置带回: {
    synonym: "วางบัตรไว้บนโต๊ะ / waang bat wai bon dto / 把卡放在桌上",
    antonym: "เอากลับ / ao glap / 带回",
    comparison: "ไว้ 表示放着或保留，ไป/มา/กลับ 表示动作方向。",
    collocation: "ลืมของไว้บนรถ ต้องติดต่อคนขับ / luem khaawng wai bon rot dtawng dtit dtaaw khon khap / 把东西忘在车上，需要联系司机",
  },
  够不够用: {
    synonym: "เงินพอจ่าย / ngoen phaaw jaai / 钱够付",
    antonym: "ไม่พอ / mai phaaw / 不够",
    comparison: "พอ 放在名词或动作前后，表示数量或条件够不够。",
    collocation: "เวลาไม่พอทำ เลยต้องขอเลื่อน / we-laa mai phaaw tham loei dtawng khaaw luean / 时间不够做，所以要请求延期",
  },
  能不能承受: {
    synonym: "รออีกห้านาทีไหว / raaw iik haa naa-thii wai / 再等五分钟还能承受",
    antonym: "ไม่ไหว / mai wai / 承受不了",
    comparison: "ไหว 表示身体或心理承受得住，ไม่ได้ 表示做不到或不允许。",
    collocation: "กินเผ็ดไม่ไหว ขอแบบไม่เผ็ด / gin phet mai wai khaaw baaep mai phet / 吃不了辣，请要不辣的",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในประโยคง่าย ๆ ฉันใช้ “${row[1]}” เพื่อบอกผลของการกระทำให้ชัดว่าเสร็จ ได้ หรือยังไม่ได้`,
  roman: `nai bpra-yook ngaai ngaai chan chai "${row[2]}" phuea baawk phon khaawng gaan gra-tham hai chat waa set dai rue yang mai dai`,
  chinese: `在简单句里，我用“${row[1]}”说明动作结果，讲清楚是完成了、做得到，还是还做不到。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "动词结果表达", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 实用动词补语/结果表达。适合说明完成、用完、听懂、找不到、来得及、做错、能不能用和够不够；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: USEFUL_VERB_COMPLEMENTS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_USEFUL_VERB_COMPLEMENTS_01: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
