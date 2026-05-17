export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type DailyMoneyTransactionsTheme =
  | "转账凭证"
  | "收款码"
  | "余额不足"
  | "找零零钱"
  | "押金退款"
  | "分摊代付"
  | "记账预算"
  | "付款确认"
  | "退款处理"
  | "费用明细"
  | "付款方式"
  | "票据错误";

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
  theme: DailyMoneyTransactionsTheme,
];

const DAILY_MONEY_TRANSACTIONS_REFS = [
  "worker-a-a2-daily-money-transactions",
  "basic-thai-payments",
];

const rows: Row[] = [
  ["oon-ngoen-laew-na", "โอนเงินแล้วนะ", "oon ngoen laew na", "已经转账了", "句型", "转账凭证"],
  ["song-slip-hai-laew", "ส่งสลิปให้แล้ว", "song sa-lip hai laew", "已经发转账截图了", "句型", "转账凭证"],
  ["kho-song-slip-iik-khrang", "ขอส่งสลิปอีกครั้ง", "khaaw song sa-lip iik khrang", "请允许再发一次截图", "句型", "转账凭证"],
  ["slip-mai-chat", "สลิปไม่ชัด", "sa-lip mai chat", "转账截图不清楚", "句型", "转账凭证"],
  ["slip-yuu-nai-chat", "สลิปอยู่ในแชต", "sa-lip yuu nai chaet", "截图在聊天里", "句型", "转账凭证"],
  ["kho-ruup-slip-noy", "ขอรูปสลิปหน่อย", "khaaw ruup sa-lip naawy", "请给一下截图照片", "句型", "转账凭证"],
  ["check-slip-dai-mai", "เช็กสลิปได้ไหม", "chek sa-lip dai mai", "可以查一下截图吗", "句型", "转账凭证"],
  ["yot-nai-slip-thuuk-mai", "ยอดในสลิปถูกไหม", "yaawt nai sa-lip thuuk mai", "截图里的金额对吗", "句型", "转账凭证"],
  ["kho-scan-qr", "ขอสแกนคิวอาร์", "khaaw sa-gaan khiu-aa", "请求扫二维码付款", "句型", "收款码"],
  ["qr-scan-mai-dai", "คิวอาร์สแกนไม่ได้", "khiu-aa sa-gaan mai dai", "二维码扫不了", "句型", "收款码"],
  ["kho-qr-mai", "ขอคิวอาร์ใหม่", "khaaw khiu-aa mai", "请给新的二维码", "句型", "收款码"],
  ["song-qr-maa-hai-noy", "ส่งคิวอาร์มาให้หน่อย", "song khiu-aa maa hai naawy", "请把二维码发来", "句型", "收款码"],
  ["chai-qr-nii-dai-mai", "ใช้คิวอาร์นี้ได้ไหม", "chai khiu-aa nii dai mai", "可以用这个二维码吗", "句型", "收款码"],
  ["poet-naa-jaw-qr", "เปิดหน้าจอคิวอาร์", "bpoet naa jaaw khiu-aa", "打开二维码页面", "动词", "收款码"],
  ["qr-mot-aayu", "คิวอาร์หมดอายุ", "khiu-aa mot aa-yu", "二维码过期", "句型", "收款码"],
  ["jaai-phaan-qr", "จ่ายผ่านคิวอาร์", "jaai phaan khiu-aa", "通过二维码付款", "动词", "收款码"],
  ["ngoen-nai-banchi-mai-phaw", "เงินในบัญชีไม่พอ", "ngoen nai ban-chii mai phaaw", "账户里的钱不够", "句型", "余额不足"],
  ["yot-khong-luea-mai-phaw", "ยอดคงเหลือไม่พอ", "yaawt khong luea mai phaaw", "余额不足", "句型", "余额不足"],
  ["bat-dtat-mai-phaan", "บัตรตัดไม่ผ่าน", "bat dtat mai phaan", "银行卡扣款没通过", "句型", "余额不足"],
  ["app-thanakhan-lom", "แอปธนาคารล่ม", "aaep tha-naa-khaan lom", "银行应用崩了/出故障", "句型", "余额不足"],
  ["oon-dtawn-nii-mai-dai", "โอนตอนนี้ไม่ได้", "oon dtaawn nii mai dai", "现在不能转账", "句型", "余额不足"],
  ["kho-jaai-thii-lang", "ขอจ่ายทีหลัง", "khaaw jaai thii lang", "请求之后付款", "句型", "余额不足"],
  ["kho-jaai-baang-suan-gawn", "ขอจ่ายบางส่วนก่อน", "khaaw jaai baang suan gaawn", "请求先付一部分", "句型", "余额不足"],
  ["raw-ngoen-khao-banchi", "รอเงินเข้าบัญชี", "raaw ngoen khao ban-chii", "等钱到账", "动词", "余额不足"],
  ["kho-ngoen-thawn-hai-khrop-duai", "ขอเงินทอนให้ครบด้วย", "khaaw ngoen thaawn hai khrop duai", "请把零钱找足", "句型", "找零零钱"],
  ["mai-dtong-thawn-go-dai", "ไม่ต้องทอนก็ได้", "mai dtawng thaawn gaw dai", "不用找零也可以", "句型", "找零零钱"],
  ["thawn-phit-nit-noy", "ทอนผิดนิดหน่อย", "thaawn phit nit naawy", "找零有点错", "句型", "找零零钱"],
  ["thawn-khaat-sip-baht", "ทอนขาดสิบบาท", "thaawn khaat sip baat", "少找了十泰铢", "句型", "找零零钱"],
  ["thawn-goen-haa-baht", "ทอนเกินห้าบาท", "thaawn goen haa baat", "多找了五泰铢", "句型", "找零零钱"],
  ["mii-bank-yoi-mai", "มีแบงก์ย่อยไหม", "mii baaeng yaawy mai", "有小面额纸币吗", "句型", "找零零钱"],
  ["kho-taek-bank", "ขอแตกแบงก์", "khaaw dtaaek baaeng", "想换开纸币", "句型", "找零零钱"],
  ["kho-riian-phoem", "ขอเหรียญเพิ่ม", "khaaw riian phoem", "请多给一些硬币", "句型", "找零零钱"],
  ["jaai-matjam-laew", "จ่ายมัดจำแล้ว", "jaai mat-jam laew", "已经付押金", "句型", "押金退款"],
  ["kho-khuen-matjam", "ขอคืนมัดจำ", "khaaw khuen mat-jam", "请求退押金", "句型", "押金退款"],
  ["matjam-khuen-muea-rai", "มัดจำคืนเมื่อไร", "mat-jam khuen muea rai", "押金什么时候退", "句型", "押金退款"],
  ["hak-jaak-matjam", "หักจากมัดจำ", "hak jaak mat-jam", "从押金里扣", "动词", "押金退款"],
  ["matjam-yang-mai-khao", "มัดจำยังไม่เข้า", "mat-jam yang mai khao", "押金还没到账", "句型", "押金退款"],
  ["gep-lakthan-matjam", "เก็บหลักฐานมัดจำ", "gep lak-thaan mat-jam", "保存押金凭证", "动词", "押金退款"],
  ["dtong-waang-matjam-mai", "ต้องวางมัดจำไหม", "dtawng waang mat-jam mai", "需要交押金吗", "句型", "押金退款"],
  ["khuen-matjam-tem-jamnuan", "คืนมัดจำเต็มจำนวน", "khuen mat-jam dtem jam-nuan", "全额退押金", "动词", "押金退款"],
  ["haan-gan-khon-la-thao-rai", "หารกันคนละเท่าไร", "haan gan khon la thao rai", "每个人平摊多少", "句型", "分摊代付"],
  ["kho-haan-khrueng", "ขอหารครึ่ง", "khaaw haan khrueng", "请求对半分", "句型", "分摊代付"],
  ["chan-awk-gawn-na", "ฉันออกก่อนนะ", "chan awk gaawn na", "我先垫付", "句型", "分摊代付"],
  ["diao-oon-khuen-hai", "เดี๋ยวโอนคืนให้", "diao oon khuen hai", "等下转回给你", "句型", "分摊代付"],
  ["yaek-bin-dai-mai", "แยกบิลได้ไหม", "yaaek bin dai mai", "可以分开账单吗", "句型", "分摊代付"],
  ["ruam-bin-gawn-laew-haan", "รวมบิลก่อนแล้วหาร", "ruam bin gaawn laew haan", "先合并账单再平摊", "句型", "分摊代付"],
  ["khon-la-nueng-roi-phaw-dii", "คนละหนึ่งร้อยพอดี", "khon la nueng raawy phaaw-dii", "每人刚好一百", "句型", "分摊代付"],
  ["khrai-yang-mai-dai-jaai", "ใครยังไม่ได้จ่าย", "khrai yang mai dai jaai", "谁还没付款", "句型", "分摊代付"],
  ["jot-raai-jaai-wai", "จดรายจ่ายไว้", "jot raai jaai wai", "把支出记下来", "动词", "记账预算"],
  ["luem-jot-khaa-taxi", "ลืมจดค่าแท็กซี่", "luem jot khaa thaek-sii", "忘记记出租车费", "句型", "记账预算"],
  ["banthuek-yot-laew", "บันทึกยอดแล้ว", "ban-thuek yaawt laew", "已经记录金额", "句型", "记账预算"],
  ["khaa-aahaan-ruam-thao-rai", "ค่าอาหารรวมเท่าไร", "khaa aa-haan ruam thao rai", "餐费总共多少", "句型", "记账预算"],
  ["wan-nii-chai-ngoen-yoe", "วันนี้ใช้เงินเยอะ", "wan nii chai ngoen yoe", "今天花钱多", "句型", "记账预算"],
  ["luea-ngop-thao-rai", "เหลืองบเท่าไร", "luea ngop thao rai", "预算还剩多少", "句型", "记账预算"],
  ["gep-bai-set-wai", "เก็บใบเสร็จไว้", "gep bai-set wai", "保存收据", "动词", "记账预算"],
  ["check-banchi-dtawn-yen", "เช็กบัญชีตอนเย็น", "chek ban-chii dtaawn yen", "晚上查账", "动词", "记账预算"],
  ["ngoen-khao-laew-mai", "เงินเข้าแล้วไหม", "ngoen khao laew mai", "钱到账了吗", "句型", "付款确认"],
  ["dai-rap-ngoen-laew-chai-mai", "ได้รับเงินแล้วใช่ไหม", "dai rap ngoen laew chai mai", "已经收到钱了对吗", "句型", "付款确认"],
  ["yuenyan-gaan-chamra-ngoen", "ยืนยันการชำระเงิน", "yuen-yan gaan cham-ra ngoen", "确认付款", "动词", "付款确认"],
  ["rabop-khuen-waa-jaai-laew", "ระบบขึ้นว่าจ่ายแล้ว", "ra-bop khuen waa jaai laew", "系统显示已付款", "句型", "付款确认"],
  ["yang-mai-hen-yot", "ยังไม่เห็นยอด", "yang mai hen yaawt", "还没看到金额", "句型", "付款确认"],
  ["kho-welaa-truat-yot", "ขอเวลาตรวจยอด", "khaaw we-laa dtruat yaawt", "请给时间核对金额", "句型", "付款确认"],
  ["jaeng-muea-ngoen-khao", "แจ้งเมื่อเงินเข้า", "jaaeng muea ngoen khao", "到账时通知", "句型", "付款确认"],
  ["chamra-riiap-roi-laew", "ชำระเรียบร้อยแล้ว", "cham-ra riiap raawy laew", "已付款妥当", "句型", "付款确认"],
  ["kho-khuen-ngoen-suan-nii-dai-mai", "ขอคืนเงินส่วนนี้ได้ไหม", "khaaw khuen ngoen suan nii dai mai", "这一部分可以退款吗", "句型", "退款处理"],
  ["khuen-ngoen-khao-banchi", "คืนเงินเข้าบัญชี", "khuen ngoen khao ban-chii", "退款到账户", "动词", "退款处理"],
  ["raw-ngoen-khuen-saam-wan", "รอเงินคืนสามวัน", "raaw ngoen khuen saam wan", "等退款三天", "句型", "退款处理"],
  ["khuen-ngoen-baang-suan-hai-laew", "คืนเงินบางส่วนให้แล้ว", "khuen ngoen baang suan hai laew", "已经退了一部分钱", "句型", "退款处理"],
  ["yokloek-laew-khuen-ngoen", "ยกเลิกแล้วคืนเงิน", "yok-loek laew khuen ngoen", "取消后退款", "句型", "退款处理"],
  ["kho-lakthan-gaan-khuen-ngoen", "ขอหลักฐานการคืนเงิน", "khaaw lak-thaan gaan khuen ngoen", "请求退款凭证", "句型", "退款处理"],
  ["ngoen-khuen-yang-mai-khao", "เงินคืนยังไม่เข้า", "ngoen khuen yang mai khao", "退款还没到账", "句型", "退款处理"],
  ["khuen-khao-bat-doem", "คืนเข้าบัตรเดิม", "khuen khao bat doem", "退回原卡", "动词", "退款处理"],
  ["mii-kha-thamniiam-mai", "มีค่าธรรมเนียมไหม", "mii khaa tham-niiam mai", "有手续费吗", "句型", "费用明细"],
  ["kha-thamniiam-thao-rai", "ค่าธรรมเนียมเท่าไร", "khaa tham-niiam thao rai", "手续费多少", "句型", "费用明细"],
  ["ruam-kha-borikaan-laew", "รวมค่าบริการแล้ว", "ruam khaa baaw-ri-gaan laew", "已包含服务费", "句型", "费用明细"],
  ["yang-mai-ruam-phasi", "ยังไม่รวมภาษี", "yang mai ruam phaa-sii", "还不含税", "句型", "费用明细"],
  ["rakha-nii-sutthi-mai", "ราคานี้สุทธิไหม", "raa-khaa nii sut-thi mai", "这个价格是净价吗", "句型", "费用明细"],
  ["mii-kha-oon-phoem", "มีค่าโอนเพิ่ม", "mii khaa oon phoem", "有额外转账费", "句型", "费用明细"],
  ["jaai-kha-jat-song-tang-haak", "จ่ายค่าจัดส่งต่างหาก", "jaai khaa jat song dtaang haak", "另付运费", "句型", "费用明细"],
  ["kha-chai-jaai-thang-mot", "ค่าใช้จ่ายทั้งหมด", "khaa chai jaai thang mot", "全部费用", "名词", "费用明细"],
  ["jaai-ngoen-sot-saduak-gwaa", "จ่ายเงินสดสะดวกกว่า", "jaai ngoen sot sa-duak gwaa", "付现金更方便", "句型", "付款方式"],
  ["raan-nii-rap-bat-mai", "ร้านนี้รับบัตรไหม", "raan nii rap bat mai", "这家店收银行卡吗", "句型", "付款方式"],
  ["chai-bat-bai-nii", "ใช้บัตรใบนี้", "chai bat bai nii", "用这张卡", "句型", "付款方式"],
  ["ruut-bat-mai-phaan", "รูดบัตรไม่ผ่าน", "ruut bat mai phaan", "刷卡没通过", "句型", "付款方式"],
  ["kho-plian-withi-jaai", "ขอเปลี่ยนวิธีจ่าย", "khaaw bpliian wi-thii jaai", "请求换付款方式", "句型", "付款方式"],
  ["baeng-jaai-dai-mai", "แบ่งจ่ายได้ไหม", "baeng jaai dai mai", "可以分次付款吗", "句型", "付款方式"],
  ["jaai-tem-jamnuan-wan-nii", "จ่ายเต็มจำนวนวันนี้", "jaai dtem jam-nuan wan nii", "今天付全款", "句型", "付款方式"],
  ["jaai-plaai-thaang", "จ่ายปลายทาง", "jaai bplaai thaang", "货到付款/到达后付款", "动词", "付款方式"],
  ["yot-ruam-thao-rai-na", "ยอดรวมเท่าไรนะ", "yaawt ruam thao rai na", "总额是多少来着", "句型", "票据错误"],
  ["kho-bai-set-duai", "ขอใบเสร็จด้วย", "khaaw bai-set duai", "请给收据", "句型", "票据错误"],
  ["sai-chue-nai-bai-set", "ใส่ชื่อในใบเสร็จ", "sai chue nai bai-set", "在收据上写名字", "动词", "票据错误"],
  ["lek-banchi-thuuk-mai", "เลขบัญชีถูกไหม", "leek ban-chii thuuk mai", "账号对吗", "句型", "票据错误"],
  ["oon-phit-banchi", "โอนผิดบัญชี", "oon phit ban-chii", "转错账户", "动词", "票据错误"],
  ["sai-yot-phit", "ใส่ยอดผิด", "sai yaawt phit", "填错金额", "动词", "票据错误"],
  ["kho-kae-yot-gawn-jaai", "ขอแก้ยอดก่อนจ่าย", "khaaw gaae yaawt gaawn jaai", "付款前请求修改金额", "句型", "票据错误"],
  ["check-raai-gaan-iik-khrang", "เช็กรายการอีกครั้ง", "chek raai gaan iik khrang", "再核对项目", "动词", "票据错误"],
];

const relatedByTheme: Record<
  DailyMoneyTransactionsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  转账凭证: {
    synonym: "ส่งสลิปให้แล้ว / song sa-lip hai laew / 已经发转账截图",
    antonym: "ยังไม่ได้โอน / yang mai dai oon / 还没转账",
    comparison: "สลิป 在日常泰语里常指转账截图或付款凭证。",
    collocation: "โอนเงินแล้วนะ ส่งสลิปให้แล้ว / oon ngoen laew na song sa-lip hai laew / 已经转账了，也发截图了",
  },
  收款码: {
    synonym: "ขอสแกนคิวอาร์ / khaaw sa-gaan khiu-aa / 请求扫码",
    antonym: "จ่ายเงินสด / jaai ngoen sot / 付现金",
    comparison: "คิวอาร์ 是二维码，สแกน 是扫码，二者常一起使用。",
    collocation: "คิวอาร์สแกนไม่ได้ ขอคิวอาร์ใหม่ / khiu-aa sa-gaan mai dai khaaw khiu-aa mai / 二维码扫不了，请给新的二维码",
  },
  余额不足: {
    synonym: "ยอดคงเหลือไม่พอ / yaawt khong luea mai phaaw / 余额不足",
    antonym: "เงินพอ / ngoen phaaw / 钱够",
    comparison: "เงินในบัญชีไม่พอ 更口语，ยอดคงเหลือไม่พอ 更像系统提示。",
    collocation: "เงินในบัญชีไม่พอ ขอจ่ายบางส่วนก่อน / ngoen nai ban-chii mai phaaw khaaw jaai baang suan gaawn / 账户里钱不够，请先付一部分",
  },
  找零零钱: {
    synonym: "ขอเงินทอนด้วย / khaaw ngoen thaawn duai / 请找零",
    antonym: "ไม่ต้องทอน / mai dtawng thaawn / 不用找零",
    comparison: "ทอน 是找零，แบงก์ย่อย 是小面额纸币。",
    collocation: "ทอนขาดสิบบาท ช่วยเช็กอีกครั้งได้ไหม / thaawn khaat sip baat chuai chek iik khrang dai mai / 少找了十泰铢，可以再查一下吗",
  },
  押金退款: {
    synonym: "ขอคืนมัดจำ / khaaw khuen mat-jam / 请求退押金",
    antonym: "วางมัดจำ / waang mat-jam / 交押金",
    comparison: "มัดจำ 是押金，คืนมัดจำ 是退押金，หักจากมัดจำ 是从押金扣。",
    collocation: "จ่ายมัดจำแล้ว เก็บหลักฐานมัดจำไว้ / jaai mat-jam laew gep lak-thaan mat-jam wai / 已经付押金，要保存凭证",
  },
  分摊代付: {
    synonym: "หารกันคนละเท่าไร / haan gan khon la thao rai / 每人分摊多少",
    antonym: "จ่ายคนเดียว / jaai khon diao / 一个人付",
    comparison: "หารกัน 是一起平摊，ออกก่อน 是先垫付。",
    collocation: "ฉันออกก่อนนะ เดี๋ยวโอนคืนให้ / chan awk gaawn na diao oon khuen hai / 我先垫付，等下转回给我",
  },
  记账预算: {
    synonym: "จดรายจ่ายไว้ / jot raai jaai wai / 记下支出",
    antonym: "ไม่จดรายจ่าย / mai jot raai jaai / 不记支出",
    comparison: "รายจ่าย 是支出，งบ 是预算，日常记账常一起出现。",
    collocation: "วันนี้ใช้เงินเยอะ เลยต้องจดรายจ่ายไว้ / wan nii chai ngoen yoe loei dtawng jot raai jaai wai / 今天花钱多，所以要记下支出",
  },
  付款确认: {
    synonym: "ยืนยันการชำระเงิน / yuen-yan gaan cham-ra ngoen / 确认付款",
    antonym: "ยังไม่ชำระ / yang mai cham-ra / 还未付款",
    comparison: "เงินเข้าแล้วไหม 问是否到账，ระบบขึ้นว่าจ่ายแล้ว 说明系统显示已付。",
    collocation: "ระบบขึ้นว่าจ่ายแล้ว แต่ยังไม่เห็นยอด / ra-bop khuen waa jaai laew dtaae yang mai hen yaawt / 系统显示已付，但还没看到金额",
  },
  退款处理: {
    synonym: "ขอคืนเงินได้ไหม / khaaw khuen ngoen dai mai / 可以退款吗",
    antonym: "ไม่คืนเงิน / mai khuen ngoen / 不退款",
    comparison: "คืนเงิน 是退款，คืนเงินบางส่วน 是部分退款。",
    collocation: "ยกเลิกแล้วคืนเงินเข้าบัญชีเดิม / yok-loek laew khuen ngoen khao ban-chii doem / 取消后退款到原账户",
  },
  费用明细: {
    synonym: "ค่าใช้จ่ายทั้งหมด / khaa chai jaai thang mot / 全部费用",
    antonym: "ฟรี / frii / 免费",
    comparison: "ค่าธรรมเนียม 是手续费，ค่าบริการ 是服务费，ภาษี 是税。",
    collocation: "ราคานี้รวมค่าบริการแล้วหรือยัง / raa-khaa nii ruam khaa baaw-ri-gaan laew rue yang / 这个价格已经含服务费了吗",
  },
  付款方式: {
    synonym: "ขอเปลี่ยนวิธีจ่าย / khaaw bpliian wi-thii jaai / 请求换付款方式",
    antonym: "จ่ายแบบเดิม / jaai baaep doem / 用原方式付款",
    comparison: "เงินสด 是现金，บัตร 是卡，ปลายทาง 是到达后/货到付款。",
    collocation: "รูดบัตรไม่ผ่าน ขอเปลี่ยนวิธีจ่าย / ruut bat mai phaan khaaw bpliian wi-thii jaai / 刷卡没通过，请换付款方式",
  },
  票据错误: {
    synonym: "เช็กรายการอีกครั้ง / chek raai gaan iik khrang / 再核对项目",
    antonym: "รายการถูกต้อง / raai gaan thuuk dtawng / 项目正确",
    comparison: "ยอด 是金额，รายการ 是项目，เลขบัญชี 是账号。",
    collocation: "ใส่ยอดผิด ขอแก้ยอดก่อนจ่าย / sai yaawt phit khaaw gaae yaawt gaawn jaai / 填错金额，请付款前修改",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาจ่ายเงินในชีวิตประจำวัน ฉันพูดว่า “${row[1]}” เพื่อให้ร้านหรือเพื่อนตรวจยอดได้ชัดเจน`,
  roman: `wee-laa jaai ngoen nai chii-wit bpra-jam wan chan phuut waa "${row[2]}" phuea hai raan rue phuean dtruat yaawt dai chat jen`,
  chinese: `日常付款时，我会说“${row[1]}”，让店家或朋友能清楚核对金额。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "日常交易", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 日常交易补漏表达。适合转账、收款码、找零、押金、分摊、记账、退款和付款确认；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: DAILY_MONEY_TRANSACTIONS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_MONEY_TRANSACTIONS_02: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
