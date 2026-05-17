export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type DailyPreferencesChoicesTheme =
  | "宁愿"
  | "比较喜欢"
  | "随便"
  | "都可以"
  | "选哪个"
  | "换一个"
  | "不一样"
  | "合适不合适"
  | "犹豫决定"
  | "偏好理由";

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
  theme: DailyPreferencesChoicesTheme,
];

const DAILY_PREFERENCES_CHOICES_REFS = [
  "worker-a-a2-daily-preferences-choices-02",
  "basic-thai-preferences-choices",
];

const rows: Row[] = [
  ["yaawm-raw-dii-gwaa", "ยอมรอดีกว่า", "yaawm raaw dii gwaa", "宁愿等比较好", "句型", "宁愿"],
  ["yaawm-doen-dii-gwaa", "ยอมเดินดีกว่า", "yaawm doen dii gwaa", "宁愿走路比较好", "句型", "宁愿"],
  ["yaawm-jaai-phoem", "ยอมจ่ายเพิ่ม", "yaawm jaai phoem", "愿意多付一点", "动词", "宁愿"],
  ["yaawm-tuen-chao", "ยอมตื่นเช้า", "yaawm dteun chao", "宁愿早起", "动词", "宁愿"],
  ["khaaw-yuu-baan-dii-gwaa", "ขออยู่บ้านดีกว่า", "khaaw yuu baan dii gwaa", "我宁愿待在家", "句型", "宁愿"],
  ["khaaw-gin-thii-nii", "ขอกินที่นี่", "khaaw gin thii nii", "我宁愿在这里吃", "句型", "宁愿"],
  ["lueak-thii-ja-raw", "เลือกที่จะรอ", "lueak thii ja raaw", "选择等待", "动词", "宁愿"],
  ["lueak-thii-ja-mai-sue", "เลือกที่จะไม่ซื้อ", "lueak thii ja mai sue", "选择不买", "动词", "宁愿"],
  ["mai-ao-dii-gwaa", "ไม่เอาดีกว่า", "mai ao dii gwaa", "还是不要比较好", "句型", "宁愿"],
  ["bpai-wan-uen-dii-gwaa", "ไปวันอื่นดีกว่า", "bpai wan uen dii gwaa", "改天去比较好", "句型", "宁愿"],
  ["chaawp-baep-nii-maak-gwaa", "ชอบแบบนี้มากกว่า", "chaawp baaep nii maak gwaa", "更喜欢这种", "句型", "比较喜欢"],
  ["chaawp-si-nii-maak-gwaa", "ชอบสีนี้มากกว่า", "chaawp sii nii maak gwaa", "更喜欢这个颜色", "句型", "比较喜欢"],
  ["chaawp-rot-nii-maak-gwaa", "ชอบรสนี้มากกว่า", "chaawp rot nii maak gwaa", "更喜欢这个味道", "句型", "比较喜欢"],
  ["chaawp-thii-ngiap-gwaa", "ชอบที่เงียบกว่า", "chaawp thii ngiiap gwaa", "更喜欢安静一点的地方", "句型", "比较喜欢"],
  ["chaawp-aan-maak-gwaa-duu", "ชอบอ่านมากกว่าดู", "chaawp aan maak gwaa duu", "比起看，更喜欢读", "句型", "比较喜欢"],
  ["chaawp-gin-baan-maak-gwaa", "ชอบกินบ้านมากกว่า", "chaawp gin baan maak gwaa", "更喜欢在家吃", "句型", "比较喜欢"],
  ["thuuak-jai-gaan-dern", "ถูกใจการเดิน", "thuuk jai gaan doen", "喜欢走路这种方式", "句型", "比较喜欢"],
  ["thuuak-jai-baep-nii", "ถูกใจแบบนี้", "thuuk jai baaep nii", "中意这种", "句型", "比较喜欢"],
  ["ruu-suek-chaawp-gwaa", "รู้สึกชอบกว่า", "ruu suek chaawp gwaa", "感觉更喜欢", "句型", "比较喜欢"],
  ["aan-nii-nam-sot-gwaa", "อันนี้น่าสนใจกว่า", "an nii naa son jai gwaa", "这个更有意思", "句型", "比较喜欢"],
  ["ar-ai-gaw-laew-dtae", "อะไรก็แล้วแต่", "a-rai gaw laew dtae", "什么都随便", "句型", "随便"],
  ["ao-thii-khun-saduak", "เอาที่คุณสะดวก", "ao thii khun sa-duak", "按你方便的来", "句型", "随便"],
  ["ao-thii-saduak-samrap-thuk-khon", "เอาที่สะดวกสำหรับทุกคน", "ao thii sa-duak sam-rap thuk khon", "按大家都方便的来", "句型", "随便"],
  ["laew-dtae-phuean", "แล้วแต่เพื่อน", "laew dtae phuean", "看朋友决定", "句型", "随便"],
  ["laew-dtae-khraawp-khrua", "แล้วแต่ครอบครัว", "laew dtae khraawp khrua", "看家人决定", "句型", "随便"],
  ["mai-serious", "ไม่ซีเรียส", "mai sii-riiat", "不太在意；都行", "形容词", "随便"],
  ["mai-tit-arai", "ไม่ติดอะไร", "mai dtit a-rai", "没有特别限制", "句型", "随便"],
  ["ao-baep-ngai-gaw-dai", "เอาแบบไงก็ได้", "ao baaep ngai gaw dai", "怎么都可以", "句型", "随便"],
  ["tam-jai-khun-loei", "ตามใจคุณเลย", "dtaam jai khun loei", "完全随你", "句型", "随便"],
  ["yang-ngai-gaw-dai", "ยังไงก็ได้", "yang ngai gaw dai", "怎样都可以", "句型", "随便"],
  ["baep-nai-gaw-dai", "แบบไหนก็ได้", "baaep nai gaw dai", "哪种都可以", "句型", "都可以"],
  ["si-nai-gaw-dai", "สีไหนก็ได้", "sii nai gaw dai", "哪个颜色都可以", "句型", "都可以"],
  ["wan-nai-gaw-dai", "วันไหนก็ได้", "wan nai gaw dai", "哪天都可以", "句型", "都可以"],
  ["welaa-nai-gaw-dai", "เวลาไหนก็ได้", "we-laa nai gaw dai", "哪个时间都可以", "句型", "都可以"],
  ["raan-nai-gaw-dai", "ร้านไหนก็ได้", "raan nai gaw dai", "哪家店都可以", "句型", "都可以"],
  ["thaang-nai-gaw-dai", "ทางไหนก็ได้", "thaang nai gaw dai", "哪条路都可以", "句型", "都可以"],
  ["khon-nai-gaw-dai", "คนไหนก็ได้", "khon nai gaw dai", "哪个人都可以", "句型", "都可以"],
  ["arai-gaw-ok", "อะไรก็โอเค", "a-rai gaw oo-khee", "什么都可以", "句型", "都可以"],
  ["song-baep-gaw-dai", "สองแบบก็ได้", "saawng baaep gaw dai", "两种都可以", "句型", "都可以"],
  ["thuk-baep-gaw-dai", "ทุกแบบก็ได้", "thuk baaep gaw dai", "每种都可以", "句型", "都可以"],
  ["lueak-aan-nai-dii", "เลือกอันไหนดี", "lueak an nai dii", "选哪个好", "句型", "选哪个"],
  ["ao-aan-nai-dii", "เอาอันไหนดี", "ao an nai dii", "要哪个好", "句型", "选哪个"],
  ["baep-nai-dii-gwaa", "แบบไหนดีกว่า", "baaep nai dii gwaa", "哪种更好", "句型", "选哪个"],
  ["si-nai-moh-gwaa", "สีไหนเหมาะกว่า", "sii nai maw gwaa", "哪个颜色更合适", "句型", "选哪个"],
  ["kha-naat-nai-phaaw-dii", "ขนาดไหนพอดี", "kha-naat nai phaaw dii", "哪个尺寸正好", "句型", "选哪个"],
  ["lueak-thii-thuuk-gwaa", "เลือกที่ถูกกว่า", "lueak thii thuuk gwaa", "选更便宜的", "句型", "选哪个"],
  ["lueak-thii-glai-gwaa", "เลือกที่ใกล้กว่า", "lueak thii glai gwaa", "选更近的", "句型", "选哪个"],
  ["lueak-thii-ngai-gwaa", "เลือกที่ง่ายกว่า", "lueak thii ngaai gwaa", "选更简单的", "句型", "选哪个"],
  ["lueak-thii-khun-chaawp", "เลือกที่คุณชอบ", "lueak thii khun chaawp", "选你喜欢的", "句型", "选哪个"],
  ["lueak-thii-chai-bpen", "เลือกที่ใช้เป็น", "lueak thii chai bpen", "选会用的那个", "句型", "选哪个"],
  ["bplian-aan-uen", "เปลี่ยนอันอื่น", "bpliian an uen", "换别的一个", "动词", "换一个"],
  ["bplian-baep-uen", "เปลี่ยนแบบอื่น", "bpliian baaep uen", "换别的款式", "动词", "换一个"],
  ["bplian-si-uen", "เปลี่ยนสีอื่น", "bpliian sii uen", "换别的颜色", "动词", "换一个"],
  ["bplian-kha-naat-uen", "เปลี่ยนขนาดอื่น", "bpliian kha-naat uen", "换别的尺寸", "动词", "换一个"],
  ["khaaw-bplian-bpen-aan-mai", "ขอเปลี่ยนเป็นอันใหม่", "khaaw bpliian bpen an mai", "请求换成新的", "句型", "换一个"],
  ["bplian-rai-dai-mai", "เปลี่ยนรายได้ไหม", "bpliian raai dai mai", "可以换项目吗", "句型", "换一个"],
  ["mai-ao-baep-nii-laew", "ไม่เอาแบบนี้แล้ว", "mai ao baaep nii laew", "不要这种了", "句型", "换一个"],
  ["ao-baep-uen-thaen", "เอาแบบอื่นแทน", "ao baaep uen thaaen", "改要别的款式", "句型", "换一个"],
  ["bplian-thaang-lueak", "เปลี่ยนทางเลือก", "bpliian thaang lueak", "改变选择", "动词", "换一个"],
  ["laawng-aan-uen", "ลองอันอื่น", "laawng an uen", "试别的一个", "动词", "换一个"],
  ["mai-muean-gan-loei", "ไม่เหมือนกันเลย", "mai muean gan loei", "完全不一样", "句型", "不一样"],
  ["dtaang-gan-nit-noi", "ต่างกันนิดหน่อย", "dtaang gan nit noi", "有点不一样", "句型", "不一样"],
  ["dtaang-gan-maak", "ต่างกันมาก", "dtaang gan maak", "差很多", "句型", "不一样"],
  ["khon-la-baep", "คนละแบบ", "khon la baaep", "不同款/不同类型", "短语", "不一样"],
  ["khon-la-rueng", "คนละเรื่อง", "khon la rueang", "完全是两回事", "短语", "不一样"],
  ["si-mai-muean-gan", "สีไม่เหมือนกัน", "sii mai muean gan", "颜色不一样", "句型", "不一样"],
  ["kha-naat-dtaang-gan", "ขนาดต่างกัน", "kha-naat dtaang gan", "尺寸不同", "句型", "不一样"],
  ["raa-khaa-dtaang-gan", "ราคาต่างกัน", "raa-khaa dtaang gan", "价格不同", "句型", "不一样"],
  ["khun-na-phaap-dtaang-gan", "คุณภาพต่างกัน", "khun-na-phaap dtaang gan", "质量不同", "句型", "不一样"],
  ["chai-ngaan-dtaang-gan", "ใช้งานต่างกัน", "chai ngaan dtaang gan", "用途不同", "句型", "不一样"],
  ["moh-gap-chan-mai", "เหมาะกับฉันไหม", "maw gap chan mai", "适合我吗", "句型", "合适不合适"],
  ["moh-gap-khun", "เหมาะกับคุณ", "maw gap khun", "适合你", "句型", "合适不合适"],
  ["mai-moh-gap-ngaan", "ไม่เหมาะกับงาน", "mai maw gap ngaan", "不适合这个工作/任务", "句型", "合适不合适"],
  ["moh-samrap-dek", "เหมาะสำหรับเด็ก", "maw sam-rap dek", "适合儿童", "句型", "合适不合适"],
  ["mai-moh-samrap-phuu-yai", "ไม่เหมาะสำหรับผู้ใหญ่", "mai maw sam-rap phuu yai", "不适合成人/长辈", "句型", "合适不合适"],
  ["kha-naat-phaaw-dii", "ขนาดพอดี", "kha-naat phaaw dii", "尺寸正好", "句型", "合适不合适"],
  ["kha-naat-mai-phaaw-dii", "ขนาดไม่พอดี", "kha-naat mai phaaw dii", "尺寸不合适", "句型", "合适不合适"],
  ["sai-laew-moh", "ใส่แล้วเหมาะ", "sai laew maw", "穿了合适", "句型", "合适不合适"],
  ["chai-laew-moh", "ใช้แล้วเหมาะ", "chai laew maw", "用了合适", "句型", "合适不合适"],
  ["duu-moh-gwaa", "ดูเหมาะกว่า", "duu maw gwaa", "看起来更合适", "句型", "合适不合适"],
  ["yang-lang-le", "ยังลังเล", "yang lang-lee", "还在犹豫", "句型", "犹豫决定"],
  ["dtat-sin-jai-yang-mai-dai", "ตัดสินใจยังไม่ได้", "dtat sin jai yang mai dai", "还决定不了", "句型", "犹豫决定"],
  ["khaaw-khit-iik-wan", "ขอคิดอีกวัน", "khaaw khit iik wan", "让我再想一天", "句型", "犹豫决定"],
  ["khaaw-bpriap-thiap-gaawn", "ขอเปรียบเทียบก่อน", "khaaw bpriap-thiap gaawn", "请让我先比较", "句型", "犹豫决定"],
  ["yang-mai-riip-lueak", "ยังไม่รีบเลือก", "yang mai riip lueak", "还不急着选", "句型", "犹豫决定"],
  ["lueak-laew", "เลือกแล้ว", "lueak laew", "选好了", "句型", "犹豫决定"],
  ["dtat-sin-jai-laew", "ตัดสินใจแล้ว", "dtat sin jai laew", "已经决定了", "句型", "犹豫决定"],
  ["bpai-dtaam-khwaam-ruu-suek", "ไปตามความรู้สึก", "bpai dtaam khwaam ruu suek", "按感觉来", "短语", "犹豫决定"],
  ["thaam-khwaam-hen-gaawn", "ถามความเห็นก่อน", "thaam khwaam hen gaawn", "先问意见", "动词", "犹豫决定"],
  ["lueak-thii-plawt-phai-gwaa", "เลือกที่ปลอดภัยกว่า", "lueak thii bplaawt-phai gwaa", "选更稳妥/安全的", "句型", "犹豫决定"],
  ["phraw-thuuk-gwaa", "เพราะถูกกว่า", "phraw thuuk gwaa", "因为更便宜", "句型", "偏好理由"],
  ["phraw-saduak-gwaa", "เพราะสะดวกกว่า", "phraw sa-duak gwaa", "因为更方便", "句型", "偏好理由"],
  ["phraw-glai-baan", "เพราะใกล้บ้าน", "phraw glai baan", "因为离家近", "句型", "偏好理由"],
  ["phraw-chai-ngai", "เพราะใช้ง่าย", "phraw chai ngaai", "因为容易用", "句型", "偏好理由"],
  ["phraw-khun-na-phaap-dii", "เพราะคุณภาพดี", "phraw khun-na-phaap dii", "因为质量好", "句型", "偏好理由"],
  ["phraw-moh-gwaa", "เพราะเหมาะกว่า", "phraw maw gwaa", "因为更合适", "句型", "偏好理由"],
  ["phraw-chaawp-si-nii", "เพราะชอบสีนี้", "phraw chaawp sii nii", "因为喜欢这个颜色", "句型", "偏好理由"],
  ["phraw-raw-mai-naan", "เพราะรอไม่นาน", "phraw raaw mai naan", "因为不用等很久", "句型", "偏好理由"],
  ["phraw-khum-gwaa", "เพราะคุ้มกว่า", "phraw khum gwaa", "因为更划算", "句型", "偏好理由"],
  ["phraw-khon-uen-chaawp", "เพราะคนอื่นชอบ", "phraw khon uen chaawp", "因为别人喜欢", "句型", "偏好理由"],
];

const relatedByTheme: Record<
  DailyPreferencesChoicesTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  宁愿: {
    synonym: "ดีกว่า / dii gwaa / ……比较好",
    antonym: "ไม่อยากเลือก / mai yaak lueak / 不想选",
    comparison: "ยอม + 动词 表示愿意接受某种选择；ดีกว่า 常用于“还是……比较好”。",
    collocation: "ขออยู่บ้านดีกว่า / khaaw yuu baan dii gwaa / 我宁愿待在家",
  },
  比较喜欢: {
    synonym: "ชอบมากกว่า / chaawp maak gwaa / 更喜欢",
    antonym: "ไม่ค่อยชอบ / mai khoi chaawp / 不太喜欢",
    comparison: "ชอบ...มากกว่า 可直接比较两种偏好；ถูกใจ 表示中意。",
    collocation: "ชอบสีนี้มากกว่า / chaawp sii nii maak gwaa / 更喜欢这个颜色",
  },
  随便: {
    synonym: "ตามใจคุณเลย / dtaam jai khun loei / 完全随你",
    antonym: "ฉันเลือกเอง / chan lueak eng / 我自己选",
    comparison: "แล้วแต่คุณ 是随你，เอาที่สะดวก 更强调按方便来。",
    collocation: "เอาที่คุณสะดวก / ao thii khun sa-duak / 按你方便的来",
  },
  都可以: {
    synonym: "อะไรก็โอเค / a-rai gaw oo-khee / 什么都可以",
    antonym: "ไม่ได้ทุกแบบ / mai dai thuk baaep / 不是每种都可以",
    comparison: "ไหนก็ได้ 表示不挑具体哪一个，语气比随便更明确。",
    collocation: "เวลาไหนก็ได้ / we-laa nai gaw dai / 哪个时间都可以",
  },
  选哪个: {
    synonym: "เลือกอันไหนดี / lueak an nai dii / 选哪个好",
    antonym: "ไม่เลือก / mai lueak / 不选",
    comparison: "อันไหน 问哪个东西，แบบไหน 问哪种类型。",
    collocation: "เลือกที่ถูกกว่า / lueak thii thuuk gwaa / 选更便宜的",
  },
  换一个: {
    synonym: "เปลี่ยนอันอื่น / bpliian an uen / 换别的一个",
    antonym: "ใช้อันเดิม / chai an doem / 用原来的",
    comparison: "เปลี่ยน 是换，ลองอันอื่น 是试别的。",
    collocation: "ขอเปลี่ยนเป็นอันใหม่ / khaaw bpliian bpen an mai / 请求换成新的",
  },
  不一样: {
    synonym: "ต่างกัน / dtaang gan / 不同",
    antonym: "เหมือนกัน / muean gan / 一样",
    comparison: "คนละแบบ 是不同款，คนละเรื่อง 是完全两回事。",
    collocation: "ราคาและคุณภาพต่างกัน / raa-khaa lae khun-na-phaap dtaang gan / 价格和质量不同",
  },
  合适不合适: {
    synonym: "เหมาะ / maw / 合适",
    antonym: "ไม่เหมาะ / mai maw / 不合适",
    comparison: "เหมาะกับ 接对象，เหมาะสำหรับ 接适用人群或用途。",
    collocation: "เหมาะกับฉันไหม / maw gap chan mai / 适合我吗",
  },
  犹豫决定: {
    synonym: "ยังลังเล / yang lang-lee / 还在犹豫",
    antonym: "ตัดสินใจแล้ว / dtat sin jai laew / 已经决定",
    comparison: "ขอคิดก่อน 是先想想，ขอเปรียบเทียบก่อน 是先比较。",
    collocation: "ยังไม่รีบเลือก / yang mai riip lueak / 还不急着选",
  },
  偏好理由: {
    synonym: "เพราะสะดวกกว่า / phraw sa-duak gwaa / 因为更方便",
    antonym: "ไม่มีเหตุผล / mai mii heet phon / 没有理由",
    comparison: "用 เพราะ + 原因，可以把选择理由说得很清楚。",
    collocation: "เลือกอันนี้เพราะคุ้มกว่า / lueak an nii phraw khum gwaa / 选这个因为更划算",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาต้องเลือกของหรือแผน ฉันใช้คำว่า “${row[1]}” เพื่อบอกความชอบ เหตุผล หรือสิ่งที่เหมาะกว่า`,
  roman: `we-laa dtawng lueak khaawng rue phaaen chan chai kham waa "${row[2]}" phuea baawk khwaam chaawp heet phon rue sing thii maw gwaa`,
  chinese: `需要选择东西或计划时，我会用“${row[1]}”来说明偏好、理由或更合适的选项。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "选择偏好", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 选择偏好表达。适合说明宁愿、比较喜欢、都可以、选哪个、换一个、不一样和合适不合适；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: DAILY_PREFERENCES_CHOICES_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_PREFERENCES_CHOICES_02: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
