export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "手机" | "网络" | "应用" | "账号密码" | "扫码" | "拍照发送" | "导航" | "线上支付" | "基础故障";
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
  level: "a2";
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

type AppItem = { thai: string; roman: string; chinese: string; id: string };
type TaskItem = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const INTERNET_PHONE_APPS_REFS = ["thai-frequency", "thai-a2-internet-phone-apps-candidate"];

const apps: readonly AppItem[] = [
  { thai: "แอปธนาคาร", roman: "aaep tha-naa-khaan", chinese: "银行应用", id: "aaep-tha-naa-khaan" },
  { thai: "แอปแชต", roman: "aaep chaet", chinese: "聊天应用", id: "aaep-chaet" },
  { thai: "แอปแผนที่", roman: "aaep phaaen-thii", chinese: "地图应用", id: "aaep-phaaen-thii" },
  { thai: "แอปสั่งอาหาร", roman: "aaep sang aa-haan", chinese: "点餐应用", id: "aaep-sang-aa-haan" },
  { thai: "แอปเรียกรถ", roman: "aaep riiak rot", chinese: "叫车应用", id: "aaep-riiak-rot" },
  { thai: "แอปซื้อของ", roman: "aaep seu khaawng", chinese: "购物应用", id: "aaep-seu-khaawng" },
  { thai: "แอปเรียนภาษา", roman: "aaep riian phaa-saa", chinese: "语言学习应用", id: "aaep-riian-phaa-saa" },
  { thai: "แอปฟังเพลง", roman: "aaep fang phleeng", chinese: "听歌应用", id: "aaep-fang-phleeng" },
  { thai: "แอปดูวิดีโอ", roman: "aaep duu wi-dii-oo", chinese: "看视频应用", id: "aaep-duu-wi-dii-oo" },
  { thai: "แอปถ่ายรูป", roman: "aaep thaai ruup", chinese: "拍照应用", id: "aaep-thaai-ruup" },
  { thai: "แอปจดโน้ต", roman: "aaep jot noot", chinese: "记事应用", id: "aaep-jot-noot" },
  { thai: "แอปปฏิทิน", roman: "aaep bpa-dti-thin", chinese: "日历应用", id: "aaep-bpa-dti-thin" },
  { thai: "แอปอีเมล", roman: "aaep ii-meeo", chinese: "邮箱应用", id: "aaep-ii-meeo" },
  { thai: "แอปแปลภาษา", roman: "aaep bplaae phaa-saa", chinese: "翻译应用", id: "aaep-bplaae-phaa-saa" },
  { thai: "แอปโรงแรม", roman: "aaep roong-raaem", chinese: "酒店应用", id: "aaep-roong-raaem" },
  { thai: "แอปรถไฟฟ้า", roman: "aaep rot-fai-faa", chinese: "轨道交通应用", id: "aaep-rot-fai-faa" },
  { thai: "แอปส่งพัสดุ", roman: "aaep song phat-sa-du", chinese: "寄包裹应用", id: "aaep-song-phat-sa-du" },
  { thai: "แอปจ่ายบิล", roman: "aaep jaai bin", chinese: "缴费应用", id: "aaep-jaai-bin" },
  { thai: "แอปกล้อง", roman: "aaep glaawng", chinese: "相机应用", id: "aaep-glaawng" },
  { thai: "แอปสุขภาพ", roman: "aaep suk-kha-phaap", chinese: "健康应用", id: "aaep-suk-kha-phaap" },
  { thai: "แอปพยากรณ์อากาศ", roman: "aaep pha-yaa-gaawn aa-gaat", chinese: "天气应用", id: "aaep-pha-yaa-gaawn-aa-gaat" },
  { thai: "แอปเก็บรูป", roman: "aaep gep ruup", chinese: "照片存储应用", id: "aaep-gep-ruup" },
  { thai: "แอปอ่านข่าว", roman: "aaep aan khaao", chinese: "看新闻应用", id: "aaep-aan-khaao" },
  { thai: "แอปนาฬิกาปลุก", roman: "aaep naa-li-gaa bpluk", chinese: "闹钟应用", id: "aaep-naa-li-gaa-bpluk" },
];

const tasks: readonly TaskItem[] = [
  { thai: "รูปบัตรประชาชน", roman: "ruup bat bpra-chaa-chon", chinese: "身份证照片", id: "ruup-bat-bpra-chaa-chon", theme: "拍照发送" },
  { thai: "รูปใบเสร็จ", roman: "ruup bai-set", chinese: "收据照片", id: "ruup-bai-set", theme: "拍照发送" },
  { thai: "รูปหน้าร้าน", roman: "ruup naa raan", chinese: "店门口照片", id: "ruup-naa-raan", theme: "拍照发送" },
  { thai: "รูปอาหาร", roman: "ruup aa-haan", chinese: "食物照片", id: "ruup-aa-haan", theme: "拍照发送" },
  { thai: "รูปสินค้า", roman: "ruup sin-khaa", chinese: "商品照片", id: "ruup-sin-khaa", theme: "拍照发送" },
  { thai: "รูปหน้าจอ", roman: "ruup naa-jaaw", chinese: "屏幕截图", id: "ruup-naa-jaaw", theme: "拍照发送" },
  { thai: "ตำแหน่งบ้าน", roman: "dtam-naeng baan", chinese: "家的位置", id: "dtam-naeng-baan", theme: "导航" },
  { thai: "ตำแหน่งร้านกาแฟ", roman: "dtam-naeng raan gaa-faae", chinese: "咖啡店位置", id: "dtam-naeng-raan-gaa-faae", theme: "导航" },
  { thai: "ทางไปรถไฟฟ้า", roman: "thaang bpai rot-fai-faa", chinese: "去轨道交通的路", id: "thaang-bpai-rot-fai-faa", theme: "导航" },
  { thai: "เส้นทางกลับบ้าน", roman: "sen-thaang glap baan", chinese: "回家的路线", id: "sen-thaang-glap-baan", theme: "导航" },
  { thai: "คิวอาร์โค้ดร้าน", roman: "khiu-aa khoot raan", chinese: "店里的二维码", id: "khiu-aa-khoot-raan", theme: "扫码" },
  { thai: "คิวอาร์โค้ดจ่ายเงิน", roman: "khiu-aa khoot jaai ngoen", chinese: "付款二维码", id: "khiu-aa-khoot-jaai-ngoen", theme: "扫码" },
  { thai: "คิวอาร์โค้ดเมนู", roman: "khiu-aa khoot mee-nuu", chinese: "菜单二维码", id: "khiu-aa-khoot-mee-nuu", theme: "扫码" },
  { thai: "คิวอาร์โค้ดลงทะเบียน", roman: "khiu-aa khoot long-tha-biian", chinese: "登记二维码", id: "khiu-aa-khoot-long-tha-biian", theme: "扫码" },
  { thai: "ค่าอาหาร", roman: "khaa aa-haan", chinese: "餐费", id: "khaa-aa-haan", theme: "线上支付" },
  { thai: "ค่ากาแฟ", roman: "khaa gaa-faae", chinese: "咖啡钱", id: "khaa-gaa-faae", theme: "线上支付" },
  { thai: "ค่าไฟเดือนนี้", roman: "khaa fai duean nii", chinese: "这个月电费", id: "khaa-fai-duean-nii", theme: "线上支付" },
  { thai: "ค่าน้ำเดือนนี้", roman: "khaa naam duean nii", chinese: "这个月水费", id: "khaa-naam-duean-nii", theme: "线上支付" },
  { thai: "ค่ารถ", roman: "khaa rot", chinese: "车费", id: "khaa-rot", theme: "线上支付" },
  { thai: "ค่าของออนไลน์", roman: "khaa khaawng awn-lai", chinese: "网购物品费用", id: "khaa-khaawng-awn-lai", theme: "线上支付" },
];

const directRows: readonly Definition[] = [
  { thai: "ลืมรหัสผ่านอีกแล้ว", id: "leum-ra-hat-phaan-iik-laaeo", roman: "leum ra-hat phaan iik laaeo", chinese: "又忘记密码了", partOfSpeech: "短语", theme: "账号密码", exampleThai: "ฉันลืมรหัสผ่านอีกแล้ว ต้องตั้งใหม่", exampleRoman: "chan leum ra-hat phaan iik laaeo, dtawng dtang mai", exampleChinese: "我又忘记密码了，得重新设置。", tag: "密码" },
  { thai: "ตั้งรหัสผ่านใหม่", id: "dtang-ra-hat-phaan-mai", roman: "dtang ra-hat phaan mai", chinese: "设置新密码", partOfSpeech: "短语", theme: "账号密码", exampleThai: "แอปให้ฉันตั้งรหัสผ่านใหม่ก่อนเข้าใช้", exampleRoman: "aaep hai chan dtang ra-hat phaan mai gaawn khao chai", exampleChinese: "应用让我先设置新密码再使用。", tag: "密码" },
  { thai: "พิมพ์รหัสผิดสามครั้ง", id: "phim-ra-hat-phit-saam-khrang", roman: "phim ra-hat phit saam khrang", chinese: "输错三次密码", partOfSpeech: "短语", theme: "账号密码", exampleThai: "เขาพิมพ์รหัสผิดสามครั้ง แอปจึงล็อกชั่วคราว", exampleRoman: "khao phim ra-hat phit saam khrang, aaep jeung lok chua-khraao", exampleChinese: "他输错三次密码，所以应用暂时锁住。", tag: "密码" },
  { thai: "บันทึกรหัสไว้ที่ปลอดภัย", id: "ban-theuk-ra-hat-wai-thii-bplaawt-phai", roman: "ban-theuk ra-hat wai thii bplaawt-phai", chinese: "把密码记在安全的地方", partOfSpeech: "短语", theme: "账号密码", exampleThai: "แม่บอกให้บันทึกรหัสไว้ที่ปลอดภัย", exampleRoman: "maae baawk hai ban-theuk ra-hat wai thii bplaawt-phai", exampleChinese: "妈妈说把密码记在安全的地方。", tag: "密码" },
  { thai: "ออกจากระบบทุกครั้ง", id: "aawk-jaak-ra-bop-thuk-khrang", roman: "aawk jaak ra-bop thuk khrang", chinese: "每次都退出登录", partOfSpeech: "短语", theme: "账号密码", exampleThai: "ถ้าใช้เครื่องคนอื่น ควรออกจากระบบทุกครั้ง", exampleRoman: "thaa chai khreuuang khon euen, khuuan aawk jaak ra-bop thuk khrang", exampleChinese: "如果用别人的设备，应该每次都退出登录。", tag: "账号" },
  { thai: "เข้าแอปไม่ได้", id: "khao-aaep-mai-dai", roman: "khao aaep mai dai", chinese: "进不了应用", partOfSpeech: "短语", theme: "基础故障", exampleThai: "วันนี้ฉันเข้าแอปไม่ได้ เพราะอินเทอร์เน็ตช้ามาก", exampleRoman: "wan-nii chan khao aaep mai dai, phraw in-thoe-net chaa maak", exampleChinese: "今天我进不了应用，因为网络很慢。", tag: "故障" },
  { thai: "แอปค้างบ่อย", id: "aaep-khaang-baawy", roman: "aaep khaang baawy", chinese: "应用经常卡住", partOfSpeech: "短语", theme: "基础故障", exampleThai: "แอปค้างบ่อย ฉันจึงปิดแล้วเปิดใหม่", exampleRoman: "aaep khaang baawy, chan jeung bpit laaeo bpoet mai", exampleChinese: "应用经常卡住，所以我关掉再打开。", tag: "故障" },
  { thai: "ปิดแล้วเปิดใหม่", id: "bpit-laaeo-bpoet-mai", roman: "bpit laaeo bpoet mai", chinese: "关掉再打开", partOfSpeech: "短语", theme: "基础故障", exampleThai: "ถ้าเครื่องช้า ลองปิดแล้วเปิดใหม่", exampleRoman: "thaa khreuuang chaa, laawng bpit laaeo bpoet mai", exampleChinese: "如果设备慢，试着关掉再打开。", tag: "故障" },
  { thai: "มือถือแบตใกล้หมด", id: "mue-theu-baaet-glai-mot", roman: "mue-theu baaet glai mot", chinese: "手机快没电了", partOfSpeech: "短语", theme: "手机", exampleThai: "มือถือแบตใกล้หมด ขอชาร์จหน่อยได้ไหม", exampleRoman: "mue-theu baaet glai mot, khaaw chaat naawy dai mai", exampleChinese: "手机快没电了，可以让我充一下电吗？", tag: "手机" },
  { thai: "ชาร์จแบตไม่เข้า", id: "chaat-baaet-mai-khao", roman: "chaat baaet mai khao", chinese: "电充不进去", partOfSpeech: "短语", theme: "基础故障", exampleThai: "สายชาร์จนี้เสีย ชาร์จแบตไม่เข้า", exampleRoman: "saai chaat nii siia, chaat baaet mai khao", exampleChinese: "这根充电线坏了，电充不进去。", tag: "故障" },
  { thai: "สัญญาณอินเทอร์เน็ตอ่อน", id: "san-yaan-in-thoe-net-aawn", roman: "san-yaan in-thoe-net aawn", chinese: "网络信号弱", partOfSpeech: "短语", theme: "网络", exampleThai: "ในห้องนี้สัญญาณอินเทอร์เน็ตอ่อน", exampleRoman: "nai haawng nii san-yaan in-thoe-net aawn", exampleChinese: "这个房间网络信号弱。", tag: "网络" },
  { thai: "เน็ตหลุดระหว่างทาง", id: "net-lut-ra-waang-thaang", roman: "net lut ra-waang thaang", chinese: "路上网络断了", partOfSpeech: "短语", theme: "网络", exampleThai: "ตอนอยู่บนรถ เน็ตหลุดระหว่างทาง", exampleRoman: "dtaawn yuu bon rot, net lut ra-waang thaang", exampleChinese: "在车上时，路上网络断了。", tag: "网络" },
  { thai: "ต่อไวไฟที่บ้าน", id: "dtaaw-wai-fai-thii-baan", roman: "dtaaw wai-fai thii baan", chinese: "连接家里的 Wi-Fi", partOfSpeech: "短语", theme: "网络", exampleThai: "กลับถึงบ้านแล้ว ฉันต่อไวไฟที่บ้านทันที", exampleRoman: "glap theung baan laaeo, chan dtaaw wai-fai thii baan than-thii", exampleChinese: "到家后，我马上连接家里的 Wi-Fi。", tag: "网络" },
  { thai: "เปิดข้อมูลมือถือ", id: "bpoet-khaaw-muun-mue-theu", roman: "bpoet khaaw-muun mue-theu", chinese: "打开手机流量", partOfSpeech: "短语", theme: "手机", exampleThai: "ถ้าไม่มีไวไฟ ให้เปิดข้อมูลมือถือก่อน", exampleRoman: "thaa mai mii wai-fai, hai bpoet khaaw-muun mue-theu gaawn", exampleChinese: "如果没有 Wi-Fi，就先打开手机流量。", tag: "手机" },
  { thai: "ปิดแจ้งเตือนตอนนอน", id: "bpit-jaaeng-dteuuan-dtaawn-naawn", roman: "bpit jaaeng-dteuuan dtaawn naawn", chinese: "睡觉时关闭通知", partOfSpeech: "短语", theme: "手机", exampleThai: "ฉันปิดแจ้งเตือนตอนนอนเพื่อพักผ่อน", exampleRoman: "chan bpit jaaeng-dteuuan dtaawn naawn phuea phak-phaawn", exampleChinese: "我睡觉时关闭通知以便休息。", tag: "手机" },
  { thai: "เปิดโหมดเงียบ", id: "bpoet-moot-ngiiap", roman: "bpoet moot ngiiap", chinese: "开启静音模式", partOfSpeech: "短语", theme: "手机", exampleThai: "ก่อนเข้าประชุม เขาเปิดโหมดเงียบ", exampleRoman: "gaawn khao bpra-chum, khao bpoet moot ngiiap", exampleChinese: "进会议前，他开启静音模式。", tag: "手机" },
  { thai: "เพิ่มเสียงโทรศัพท์", id: "phoem-siiang-thoo-ra-sap", roman: "phoem siiang thoo-ra-sap", chinese: "调大手机音量", partOfSpeech: "短语", theme: "手机", exampleThai: "ในที่เสียงดัง ฉันเพิ่มเสียงโทรศัพท์", exampleRoman: "nai thii siiang dang, chan phoem siiang thoo-ra-sap", exampleChinese: "在很吵的地方，我调大手机音量。", tag: "手机" },
  { thai: "ลดแสงหน้าจอ", id: "lot-saaeng-naa-jaaw", roman: "lot saaeng naa-jaaw", chinese: "调低屏幕亮度", partOfSpeech: "短语", theme: "手机", exampleThai: "ตอนกลางคืนควรลดแสงหน้าจอ", exampleRoman: "dtaawn glaang-kheun khuuan lot saaeng naa-jaaw", exampleChinese: "晚上应该调低屏幕亮度。", tag: "手机" },
  { thai: "ส่งตำแหน่งให้คนขับ", id: "song-dtam-naeng-hai-khon-khap", roman: "song dtam-naeng hai khon khap", chinese: "把位置发给司机", partOfSpeech: "短语", theme: "导航", exampleThai: "ฉันส่งตำแหน่งให้คนขับเพราะเขาหาบ้านไม่เจอ", exampleRoman: "chan song dtam-naeng hai khon khap phraw khao haa baan mai jooe", exampleChinese: "我把位置发给司机，因为他找不到家。", tag: "导航" },
  { thai: "ดูทางในแผนที่", id: "duu-thaang-nai-phaaen-thii", roman: "duu thaang nai phaaen-thii", chinese: "在地图里看路线", partOfSpeech: "短语", theme: "导航", exampleThai: "ก่อนไปตลาดใหม่ ฉันดูทางในแผนที่", exampleRoman: "gaawn bpai dta-laat mai, chan duu thaang nai phaaen-thii", exampleChinese: "去新市场前，我在地图里看路线。", tag: "导航" },
  { thai: "เดินตามแผนที่", id: "doen-dtaam-phaaen-thii", roman: "doen dtaam phaaen-thii", chinese: "按照地图走", partOfSpeech: "短语", theme: "导航", exampleThai: "ถ้าไม่รู้ทาง ให้เดินตามแผนที่ในมือถือ", exampleRoman: "thaa mai ruu thaang, hai doen dtaam phaaen-thii nai mue-theu", exampleChinese: "如果不认识路，就按照手机里的地图走。", tag: "导航" },
  { thai: "จ่ายเงินออนไลน์ไม่สำเร็จ", id: "jaai-ngoen-awn-lai-mai-sam-ret", roman: "jaai ngoen awn-lai mai sam-ret", chinese: "线上付款没有成功", partOfSpeech: "短语", theme: "线上支付", exampleThai: "เมื่อกี้จ่ายเงินออนไลน์ไม่สำเร็จ ขอทำอีกครั้ง", exampleRoman: "muea-gii jaai ngoen awn-lai mai sam-ret, khaaw tham iik khrang", exampleChinese: "刚才线上付款没有成功，我想再做一次。", tag: "支付" },
  { thai: "เช็กยอดก่อนโอน", id: "chek-yaawt-gaawn-oon", roman: "chek yaawt gaawn oon", chinese: "转账前核对金额", partOfSpeech: "短语", theme: "线上支付", exampleThai: "ก่อนโอนเงิน ต้องเช็กยอดก่อนโอนทุกครั้ง", exampleRoman: "gaawn oon ngoen, dtawng chek yaawt gaawn oon thuk khrang", exampleChinese: "转账前，每次都要核对金额。", tag: "支付" },
  { thai: "ส่งสลิปให้ร้าน", id: "song-sa-lip-hai-raan", roman: "song sa-lip hai raan", chinese: "把付款凭证发给店家", partOfSpeech: "短语", theme: "线上支付", exampleThai: "หลังโอนเงิน ฉันส่งสลิปให้ร้านในแชต", exampleRoman: "lang oon ngoen, chan song sa-lip hai raan nai chaet", exampleChinese: "转账后，我在聊天里把付款凭证发给店家。", tag: "支付" },
  { thai: "รอข้อความยืนยัน", id: "raaw-khaaw-khwaam-yeun-yan", roman: "raaw khaaw-khwaam yeun-yan", chinese: "等待确认消息", partOfSpeech: "短语", theme: "应用", exampleThai: "หลังสมัครบัญชี ต้องรอข้อความยืนยัน", exampleRoman: "lang sa-mak ban-chii, dtawng raaw khaaw-khwaam yeun-yan", exampleChinese: "注册账号后，要等待确认消息。", tag: "应用" },
  { thai: "เพิ่มบัญชีอีเมล", id: "phoem-ban-chii-ii-meeo", roman: "phoem ban-chii ii-meeo", chinese: "添加邮箱账号", partOfSpeech: "短语", theme: "账号密码", exampleThai: "ฉันเพิ่มบัญชีอีเมลในมือถือเครื่องใหม่", exampleRoman: "chan phoem ban-chii ii-meeo nai mue-theu khreuuang mai", exampleChinese: "我在新手机里添加邮箱账号。", tag: "账号" },
  { thai: "ลบบัญชีเก่าออก", id: "lop-ban-chii-gao-aawk", roman: "lop ban-chii gao aawk", chinese: "删除旧账号", partOfSpeech: "短语", theme: "账号密码", exampleThai: "ก่อนขายมือถือ เขาลบบัญชีเก่าออก", exampleRoman: "gaawn khaai mue-theu, khao lop ban-chii gao aawk", exampleChinese: "卖手机前，他删除旧账号。", tag: "账号" },
  { thai: "ตั้งชื่อผู้ใช้ใหม่", id: "dtang-cheu-phuu-chai-mai", roman: "dtang cheu phuu-chai mai", chinese: "设置新的用户名", partOfSpeech: "短语", theme: "账号密码", exampleThai: "แอปนี้ให้ตั้งชื่อผู้ใช้ใหม่ก่อนเริ่ม", exampleRoman: "aaep nii hai dtang cheu phuu-chai mai gaawn roem", exampleChinese: "这个应用让先设置新的用户名再开始。", tag: "账号" },
  { thai: "ยืนยันเบอร์โทร", id: "yeun-yan-booe-thoo", roman: "yeun-yan booe thoo", chinese: "确认电话号码", partOfSpeech: "短语", theme: "账号密码", exampleThai: "หลังสมัครแอป ต้องยืนยันเบอร์โทร", exampleRoman: "lang sa-mak aaep, dtawng yeun-yan booe thoo", exampleChinese: "注册应用后，要确认电话号码。", tag: "账号" },
  { thai: "รับรหัสทางข้อความ", id: "rap-ra-hat-thaang-khaaw-khwaam", roman: "rap ra-hat thaang khaaw-khwaam", chinese: "通过短信接收验证码", partOfSpeech: "短语", theme: "账号密码", exampleThai: "ฉันรับรหัสทางข้อความแล้วพิมพ์ลงในแอป", exampleRoman: "chan rap ra-hat thaang khaaw-khwaam laaeo phim long nai aaep", exampleChinese: "我通过短信收到验证码后输入到应用里。", tag: "账号" },
  { thai: "เปิดกล้องเพื่อสแกน", id: "bpoet-glaawng-phuea-sa-gaan", roman: "bpoet glaawng phuea sa-gaan", chinese: "打开相机来扫描", partOfSpeech: "短语", theme: "扫码", exampleThai: "เวลาจ่ายเงิน ให้เปิดกล้องเพื่อสแกนคิวอาร์โค้ด", exampleRoman: "wee-laa jaai ngoen, hai bpoet glaawng phuea sa-gaan khiu-aa khoot", exampleChinese: "付款时，打开相机来扫描二维码。", tag: "扫码" },
  { thai: "สแกนไม่ติด", id: "sa-gaan-mai-dtit", roman: "sa-gaan mai dtit", chinese: "扫描不上", partOfSpeech: "短语", theme: "扫码", exampleThai: "หน้าจอมืดไป เลยสแกนไม่ติด", exampleRoman: "naa-jaaw meut bpai, loei sa-gaan mai dtit", exampleChinese: "屏幕太暗，所以扫描不上。", tag: "扫码" },
  { thai: "ถ่ายรูปใหม่อีกครั้ง", id: "thaai-ruup-mai-iik-khrang", roman: "thaai ruup mai iik khrang", chinese: "重新拍一张照片", partOfSpeech: "短语", theme: "拍照发送", exampleThai: "รูปไม่ชัด ขอถ่ายรูปใหม่อีกครั้ง", exampleRoman: "ruup mai chat, khaaw thaai ruup mai iik khrang", exampleChinese: "照片不清楚，请重新拍一张。", tag: "拍照" },
  { thai: "ลบรูปที่ไม่ชัด", id: "lop-ruup-thii-mai-chat", roman: "lop ruup thii mai chat", chinese: "删除不清楚的照片", partOfSpeech: "短语", theme: "拍照发送", exampleThai: "ฉันลบรูปที่ไม่ชัดก่อนส่งให้เพื่อน", exampleRoman: "chan lop ruup thii mai chat gaawn song hai phuean", exampleChinese: "发给朋友前，我删除不清楚的照片。", tag: "拍照" },
  { thai: "เปิดไฟล์ที่ดาวน์โหลด", id: "bpoet-fai-thii-daao-loot", roman: "bpoet fai thii daao-loot", chinese: "打开下载的文件", partOfSpeech: "短语", theme: "应用", exampleThai: "หลังดาวน์โหลดเสร็จ ฉันเปิดไฟล์ที่ดาวน์โหลด", exampleRoman: "lang daao-loot set, chan bpoet fai thii daao-loot", exampleChinese: "下载完成后，我打开下载的文件。", tag: "应用" },
];

const openAppRows = apps.map((app): Definition => ({
  thai: `เปิด${app.thai}ตอนเช้า`,
  id: `bpoet-${app.id}-dtaawn-chaao`,
  roman: `bpoet ${app.roman} dtaawn chaao`,
  chinese: `早上打开${app.chinese}`,
  partOfSpeech: "短语",
  theme: "应用",
  exampleThai: `ทุกเช้าฉันเปิด${app.thai}ตอนเช้าเพื่อเช็กข้อมูล`,
  exampleRoman: `thuk chaao chan bpoet ${app.roman} dtaawn chaao phuea chek khaaw-muun`,
  exampleChinese: `每天早上我打开${app.chinese}查看信息。`,
  tag: "应用",
}));

const updateRows = apps.slice(0, 20).map((app): Definition => ({
  thai: `อัปเดต${app.thai}ก่อนใช้`,
  id: `ap-deet-${app.id}-gaawn-chai`,
  roman: `ap-deet ${app.roman} gaawn chai`,
  chinese: `使用前更新${app.chinese}`,
  partOfSpeech: "短语",
  theme: "应用",
  exampleThai: `ถ้า${app.thai}เปิดช้า ให้ลองอัปเดต${app.thai}ก่อนใช้`,
  exampleRoman: `thaa ${app.roman} bpoet chaa, hai laawng ap-deet ${app.roman} gaawn chai`,
  exampleChinese: `如果${app.chinese}打开慢，试着使用前更新它。`,
  tag: "应用",
}));

const sendRows = tasks.slice(0, 10).map((task): Definition => ({
  thai: `ถ่าย${task.thai}แล้วส่งให้เพื่อน`,
  id: `thaai-${task.id}-laaeo-song-hai-phuean`,
  roman: `thaai ${task.roman} laaeo song hai phuean`,
  chinese: `拍${task.chinese}后发给朋友`,
  partOfSpeech: "短语",
  theme: task.theme,
  exampleThai: `ฉันถ่าย${task.thai}แล้วส่งให้เพื่อนในแชต`,
  exampleRoman: `chan thaai ${task.roman} laaeo song hai phuean nai chaet`,
  exampleChinese: `我拍${task.chinese}后在聊天里发给朋友。`,
  tag: "发送",
}));

const scanRows = tasks.slice(10, 14).map((task): Definition => ({
  thai: `สแกน${task.thai}ด้วยมือถือ`,
  id: `sa-gaan-${task.id}-duai-mue-theu`,
  roman: `sa-gaan ${task.roman} duai mue-theu`,
  chinese: `用手机扫描${task.chinese}`,
  partOfSpeech: "短语",
  theme: "扫码",
  exampleThai: `ที่ร้านนี้ต้องสแกน${task.thai}ด้วยมือถือ`,
  exampleRoman: `thii raan nii dtawng sa-gaan ${task.roman} duai mue-theu`,
  exampleChinese: `在这家店要用手机扫描${task.chinese}。`,
  tag: "扫码",
}));

const payRows = tasks.slice(14).map((task): Definition => ({
  thai: `จ่าย${task.thai}ผ่านแอป`,
  id: `jaai-${task.id}-phaan-aaep`,
  roman: `jaai ${task.roman} phaan aaep`,
  chinese: `通过应用支付${task.chinese}`,
  partOfSpeech: "短语",
  theme: "线上支付",
  exampleThai: `วันนี้ฉันจ่าย${task.thai}ผ่านแอป ไม่ได้ใช้เงินสด`,
  exampleRoman: `wan-nii chan jaai ${task.roman} phaan aaep, mai dai chai ngoen sot`,
  exampleChinese: `今天我通过应用支付${task.chinese}，没有用现金。`,
  tag: "支付",
}));

const rows: readonly Definition[] = [
  ...openAppRows,
  ...updateRows,
  ...sendRows,
  ...scanRows,
  ...payRows,
  ...directRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "手机网络应用", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段先掌握手机生活里的常用动作：打开应用、更新、扫码、发送照片、导航和线上付款。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于手机、网络、应用、账号密码、扫码、拍照发送、导航、线上支付和基础故障。"],
    tags,
    sourceRefs: INTERNET_PHONE_APPS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_INTERNET_PHONE_APPS_01 = rows.map(toCandidate);
