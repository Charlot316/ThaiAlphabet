export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "城市服务" | "办事" | "邮局" | "银行柜台" | "理发" | "修手机" | "打印复印" | "排队取号" | "营业时间";
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

type ServicePlace = {
  thai: string;
  roman: string;
  chinese: string;
  id: string;
  actionThai: string;
  actionRoman: string;
  actionChinese: string;
  theme: VocabularyExpansionTheme;
};

const CITY_SERVICES_ERRANDS_REFS = ["thai-frequency", "thai-a2-city-services-errands-candidate"];

const servicePlaces: readonly ServicePlace[] = [
  { thai: "ไปรษณีย์ใกล้บ้าน", roman: "bprai-sa-nii glai baan", chinese: "家附近的邮局", id: "bprai-sa-nii-glai-baan", actionThai: "ส่งพัสดุ", actionRoman: "song phat-sa-du", actionChinese: "寄包裹", theme: "邮局" },
  { thai: "ไปรษณีย์สาขาใหญ่", roman: "bprai-sa-nii saa-khaa yai", chinese: "邮局大分行", id: "bprai-sa-nii-saa-khaa-yai", actionThai: "รับพัสดุ", actionRoman: "rap phat-sa-du", actionChinese: "取包裹", theme: "邮局" },
  { thai: "เคาน์เตอร์ธนาคาร", roman: "khao-dtooe tha-naa-khaan", chinese: "银行柜台", id: "khao-dtooe-tha-naa-khaan", actionThai: "ฝากเงิน", actionRoman: "faak ngoen", actionChinese: "存钱", theme: "银行柜台" },
  { thai: "ธนาคารใกล้ตลาด", roman: "tha-naa-khaan glai dta-laat", chinese: "市场附近的银行", id: "tha-naa-khaan-glai-dta-laat", actionThai: "ถอนเงิน", actionRoman: "thaawn ngoen", actionChinese: "取钱", theme: "银行柜台" },
  { thai: "ร้านตัดผมชาย", roman: "raan dtat phom chaai", chinese: "男士理发店", id: "raan-dtat-phom-chaai", actionThai: "ตัดผมสั้น", actionRoman: "dtat phom san", actionChinese: "剪短发", theme: "理发" },
  { thai: "ร้านทำผมผู้หญิง", roman: "raan tham phom phuu-ying", chinese: "女士美发店", id: "raan-tham-phom-phuu-ying", actionThai: "สระและไดร์ผม", actionRoman: "sa lae drai phom", actionChinese: "洗头吹发", theme: "理发" },
  { thai: "ร้านซ่อมมือถือ", roman: "raan saawm mue-theu", chinese: "手机维修店", id: "raan-saawm-mue-theu", actionThai: "เปลี่ยนฟิล์มหน้าจอ", actionRoman: "bplian fim naa-jaaw", actionChinese: "换屏幕膜", theme: "修手机" },
  { thai: "ศูนย์บริการมือถือ", roman: "suun baw-ri-gaan mue-theu", chinese: "手机服务中心", id: "suun-baw-ri-gaan-mue-theu", actionThai: "เช็กเครื่อง", actionRoman: "chek khreuuang", actionChinese: "检查机器", theme: "修手机" },
  { thai: "ร้านถ่ายเอกสาร", roman: "raan thaai eek-ga-saan", chinese: "复印店", id: "raan-thaai-eek-ga-saan", actionThai: "ถ่ายสำเนาบัตร", actionRoman: "thaai sam-nao bat", actionChinese: "复印证件", theme: "打印复印" },
  { thai: "ร้านพิมพ์งาน", roman: "raan phim ngaan", chinese: "打印店", id: "raan-phim-ngaan", actionThai: "พิมพ์เอกสาร", actionRoman: "phim eek-ga-saan", actionChinese: "打印文件", theme: "打印复印" },
  { thai: "ร้านถ่ายรูปด่วน", roman: "raan thaai ruup duan", chinese: "快照店", id: "raan-thaai-ruup-duan", actionThai: "ถ่ายรูปติดบัตร", actionRoman: "thaai ruup dtit bat", actionChinese: "拍证件照", theme: "城市服务" },
  { thai: "ร้านซักรีด", roman: "raan sak-riit", chinese: "洗衣熨衣店", id: "raan-sak-riit", actionThai: "ส่งเสื้อไปรีด", actionRoman: "song seua bpai riit", actionChinese: "送衣服去熨", theme: "城市服务" },
  { thai: "ร้านซ่อมรองเท้า", roman: "raan saawm raawng-thaao", chinese: "修鞋店", id: "raan-saawm-raawng-thaao", actionThai: "ซ่อมส้นรองเท้า", actionRoman: "saawm son raawng-thaao", actionChinese: "修鞋跟", theme: "城市服务" },
  { thai: "ร้านทำกุญแจ", roman: "raan tham gun-jaae", chinese: "配钥匙店", id: "raan-tham-gun-jaae", actionThai: "ทำกุญแจสำรอง", actionRoman: "tham gun-jaae sam-raawng", actionChinese: "配备用钥匙", theme: "城市服务" },
  { thai: "ร้านซ่อมนาฬิกา", roman: "raan saawm naa-li-gaa", chinese: "修表店", id: "raan-saawm-naa-li-gaa", actionThai: "เปลี่ยนถ่านนาฬิกา", actionRoman: "bplian thaan naa-li-gaa", actionChinese: "换手表电池", theme: "城市服务" },
  { thai: "ร้านแว่นตา", roman: "raan waaen-dtaa", chinese: "眼镜店", id: "raan-waaen-dtaa", actionThai: "ปรับขาแว่น", actionRoman: "bprap khaa waaen", actionChinese: "调整眼镜腿", theme: "城市服务" },
  { thai: "สำนักงานเขต", roman: "sam-nak-ngaan kheet", chinese: "区办公室", id: "sam-nak-ngaan-kheet", actionThai: "ยื่นเอกสาร", actionRoman: "yeun eek-ga-saan", actionChinese: "提交文件", theme: "办事" },
  { thai: "ที่ว่าการอำเภอ", roman: "thii-waa-gaan am-phoe", chinese: "县/区行政办事处", id: "thii-waa-gaan-am-phoe", actionThai: "ขอเอกสารรับรอง", actionRoman: "khaaw eek-ga-saan rap-raawng", actionChinese: "申请证明文件", theme: "办事" },
  { thai: "สถานีตำรวจใกล้บ้าน", roman: "sa-thaa-nii dtam-ruat glai baan", chinese: "家附近的警察局", id: "sa-thaa-nii-dtam-ruat-glai-baan", actionThai: "แจ้งของหาย", actionRoman: "jaaeng khaawng haai", actionChinese: "报失物", theme: "城市服务" },
  { thai: "สำนักงานไฟฟ้า", roman: "sam-nak-ngaan fai-faa", chinese: "电力办公室", id: "sam-nak-ngaan-fai-faa", actionThai: "จ่ายค่าไฟ", actionRoman: "jaai khaa fai", actionChinese: "交电费", theme: "城市服务" },
  { thai: "สำนักงานประปา", roman: "sam-nak-ngaan bpra-bpaa", chinese: "自来水办公室", id: "sam-nak-ngaan-bpra-bpaa", actionThai: "จ่ายค่าน้ำ", actionRoman: "jaai khaa naam", actionChinese: "交水费", theme: "城市服务" },
  { thai: "จุดบริการประชาชน", roman: "jut baw-ri-gaan bpra-chaa-chon", chinese: "便民服务点", id: "jut-baw-ri-gaan-bpra-chaa-chon", actionThai: "ถามข้อมูล", actionRoman: "thaam khaaw-muun", actionChinese: "咨询信息", theme: "城市服务" },
  { thai: "เคาน์เตอร์ส่งของ", roman: "khao-dtooe song khaawng", chinese: "寄件柜台", id: "khao-dtooe-song-khaawng", actionThai: "ส่งของด่วน", actionRoman: "song khaawng duan", actionChinese: "寄急件", theme: "邮局" },
  { thai: "ร้านรับพิมพ์รูป", roman: "raan rap phim ruup", chinese: "照片打印店", id: "raan-rap-phim-ruup", actionThai: "พิมพ์รูปจากมือถือ", actionRoman: "phim ruup jaak mue-theu", actionChinese: "从手机打印照片", theme: "打印复印" },
  { thai: "ร้านซ่อมคอมพิวเตอร์", roman: "raan saawm khaawm-phiu-dtooe", chinese: "电脑维修店", id: "raan-saawm-khaawm-phiu-dtooe", actionThai: "ลงโปรแกรมใหม่", actionRoman: "long bproo-graaem mai", actionChinese: "重装程序", theme: "城市服务" },
];

const directRows: readonly Definition[] = [
  { thai: "กดบัตรคิวก่อนนั่งรอ", id: "got-bat-khiu-gaawn-nang-raaw", roman: "got bat khiu gaawn nang raaw", chinese: "先取号再坐下等", partOfSpeech: "短语", theme: "排队取号", exampleThai: "ที่ธนาคารต้องกดบัตรคิวก่อนนั่งรอ", exampleRoman: "thii tha-naa-khaan dtawng got bat khiu gaawn nang raaw", exampleChinese: "在银行要先取号再坐下等。", tag: "取号" },
  { thai: "รอเรียกหมายเลข", id: "raaw-riiak-maai-leek", roman: "raaw riiak maai-leek", chinese: "等叫号码", partOfSpeech: "短语", theme: "排队取号", exampleThai: "หลังได้บัตรคิว ฉันรอเรียกหมายเลขหน้าจอ", exampleRoman: "lang dai bat khiu, chan raaw riiak maai-leek naa-jaaw", exampleChinese: "拿到号码后，我等屏幕叫号码。", tag: "取号" },
  { thai: "คิววันนี้ยาวมาก", id: "khiu-wan-nii-yaao-maak", roman: "khiu wan-nii yaao maak", chinese: "今天队很长", partOfSpeech: "短语", theme: "排队取号", exampleThai: "คิววันนี้ยาวมาก เราอาจต้องรอครึ่งชั่วโมง", exampleRoman: "khiu wan-nii yaao maak, rao aat dtawng raaw khreung chua-moong", exampleChinese: "今天队很长，我们可能要等半小时。", tag: "排队" },
  { thai: "ต่อคิวช่องสอง", id: "dtaaw-khiu-chaawng-saawng", roman: "dtaaw khiu chaawng saawng", chinese: "在二号窗口排队", partOfSpeech: "短语", theme: "排队取号", exampleThai: "เจ้าหน้าที่บอกให้ต่อคิวช่องสอง", exampleRoman: "jao-naa-thii baawk hai dtaaw khiu chaawng saawng", exampleChinese: "工作人员让在二号窗口排队。", tag: "排队" },
  { thai: "ช่องบริการปิดพักเที่ยง", id: "chaawng-baw-ri-gaan-bpit-phak-thiiang", roman: "chaawng baw-ri-gaan bpit phak thiiang", chinese: "服务窗口午休关闭", partOfSpeech: "短语", theme: "营业时间", exampleThai: "ช่องบริการปิดพักเที่ยงตั้งแต่สิบสองโมง", exampleRoman: "chaawng baw-ri-gaan bpit phak thiiang dtang-dtaae sip-saawng moong", exampleChinese: "服务窗口从十二点开始午休关闭。", tag: "时间" },
  { thai: "เปิดบริการแปดโมงครึ่ง", id: "bpoet-baw-ri-gaan-bpaaet-moong-khreung", roman: "bpoet baw-ri-gaan bpaaet moong khreung", chinese: "八点半开始服务", partOfSpeech: "短语", theme: "营业时间", exampleThai: "ไปรษณีย์เปิดบริการแปดโมงครึ่ง", exampleRoman: "bprai-sa-nii bpoet baw-ri-gaan bpaaet moong khreung", exampleChinese: "邮局八点半开始服务。", tag: "时间" },
  { thai: "ปิดบริการห้าโมงเย็น", id: "bpit-baw-ri-gaan-haa-moong-yen", roman: "bpit baw-ri-gaan haa moong yen", chinese: "下午五点停止服务", partOfSpeech: "短语", theme: "营业时间", exampleThai: "ธนาคารสาขานี้ปิดบริการห้าโมงเย็น", exampleRoman: "tha-naa-khaan saa-khaa nii bpit baw-ri-gaan haa moong yen", exampleChinese: "这家银行分行下午五点停止服务。", tag: "时间" },
  { thai: "หยุดวันอาทิตย์", id: "yut-wan-aa-thit", roman: "yut wan aa-thit", chinese: "星期日休息", partOfSpeech: "短语", theme: "营业时间", exampleThai: "ร้านซ่อมมือถือร้านนี้หยุดวันอาทิตย์", exampleRoman: "raan saawm mue-theu raan nii yut wan aa-thit", exampleChinese: "这家手机维修店星期日休息。", tag: "时间" },
  { thai: "เปิดทุกวันไม่เว้นวันหยุด", id: "bpoet-thuk-wan-mai-wen-wan-yut", roman: "bpoet thuk wan mai wen wan yut", chinese: "每天营业，节假日不休", partOfSpeech: "短语", theme: "营业时间", exampleThai: "ร้านถ่ายเอกสารใกล้โรงเรียนเปิดทุกวันไม่เว้นวันหยุด", exampleRoman: "raan thaai eek-ga-saan glai roong-riian bpoet thuk wan mai wen wan yut", exampleChinese: "学校附近的复印店每天营业，节假日不休。", tag: "时间" },
  { thai: "เช็กเวลาทำการก่อนออกไป", id: "chek-wee-laa-tham-gaan-gaawn-aawk-bpai", roman: "chek wee-laa tham-gaan gaawn aawk bpai", chinese: "出门前查营业时间", partOfSpeech: "短语", theme: "营业时间", exampleThai: "ก่อนออกไปทำธุระ ฉันเช็กเวลาทำการก่อนออกไป", exampleRoman: "gaawn aawk bpai tham thu-ra, chan chek wee-laa tham-gaan gaawn aawk bpai", exampleChinese: "出门办事前，我先查营业时间。", tag: "时间" },
  { thai: "เตรียมบัตรประชาชน", id: "dtriiam-bat-bpra-chaa-chon", roman: "dtriiam bat bpra-chaa-chon", chinese: "准备身份证", partOfSpeech: "短语", theme: "办事", exampleThai: "ไปธนาคารต้องเตรียมบัตรประชาชน", exampleRoman: "bpai tha-naa-khaan dtawng dtriiam bat bpra-chaa-chon", exampleChinese: "去银行要准备身份证。", tag: "证件" },
  { thai: "กรอกแบบฟอร์มสั้น ๆ", id: "graawk-baaep-faawm-san-san", roman: "graawk baaep-faawm san san", chinese: "填写简短表格", partOfSpeech: "短语", theme: "办事", exampleThai: "เจ้าหน้าที่ให้กรอกแบบฟอร์มสั้น ๆ ก่อนยื่นเอกสาร", exampleRoman: "jao-naa-thii hai graawk baaep-faawm san san gaawn yeun eek-ga-saan", exampleChinese: "工作人员让先填写简短表格再提交文件。", tag: "表格" },
  { thai: "เซ็นชื่อในช่องนี้", id: "sen-cheu-nai-chaawng-nii", roman: "sen cheu nai chaawng nii", chinese: "在这一栏签名", partOfSpeech: "短语", theme: "办事", exampleThai: "กรุณาเซ็นชื่อในช่องนี้ก่อนส่งเอกสาร", exampleRoman: "ga-ru-naa sen cheu nai chaawng nii gaawn song eek-ga-saan", exampleChinese: "请在这一栏签名后再交文件。", tag: "表格" },
  { thai: "ถ่ายสำเนาหนึ่งชุด", id: "thaai-sam-nao-neung-chut", roman: "thaai sam-nao neung chut", chinese: "复印一份", partOfSpeech: "短语", theme: "打印复印", exampleThai: "เอกสารนี้ต้องถ่ายสำเนาหนึ่งชุด", exampleRoman: "eek-ga-saan nii dtawng thaai sam-nao neung chut", exampleChinese: "这份文件需要复印一份。", tag: "复印" },
  { thai: "พิมพ์เอกสารสี", id: "phim-eek-ga-saan-sii", roman: "phim eek-ga-saan sii", chinese: "彩色打印文件", partOfSpeech: "短语", theme: "打印复印", exampleThai: "ใบสมัครนี้ต้องพิมพ์เอกสารสี", exampleRoman: "bai sa-mak nii dtawng phim eek-ga-saan sii", exampleChinese: "这份申请表需要彩色打印。", tag: "打印" },
  { thai: "สแกนเอกสารเป็นไฟล์", id: "sa-gaan-eek-ga-saan-bpen-fai", roman: "sa-gaan eek-ga-saan bpen fai", chinese: "把文件扫描成文件", partOfSpeech: "短语", theme: "打印复印", exampleThai: "ร้านพิมพ์งานช่วยสแกนเอกสารเป็นไฟล์ให้ฉัน", exampleRoman: "raan phim ngaan chuai sa-gaan eek-ga-saan bpen fai hai chan", exampleChinese: "打印店帮我把文件扫描成文件。", tag: "扫描" },
  { thai: "ส่งพัสดุแบบด่วน", id: "song-phat-sa-du-baaep-duan", roman: "song phat-sa-du baaep duan", chinese: "寄快递急件", partOfSpeech: "短语", theme: "邮局", exampleThai: "ฉันต้องส่งพัสดุแบบด่วนให้พี่วันนี้", exampleRoman: "chan dtawng song phat-sa-du baaep duan hai phii wan-nii", exampleChinese: "我今天要给哥哥/姐姐寄快递急件。", tag: "邮寄" },
  { thai: "เขียนที่อยู่ผู้รับ", id: "khiian-thii-yuu-phuu-rap", roman: "khiian thii-yuu phuu-rap", chinese: "写收件人地址", partOfSpeech: "短语", theme: "邮局", exampleThai: "ก่อนส่งของ ต้องเขียนที่อยู่ผู้รับให้ชัด", exampleRoman: "gaawn song khaawng, dtawng khiian thii-yuu phuu-rap hai chat", exampleChinese: "寄东西前，要把收件人地址写清楚。", tag: "邮寄" },
  { thai: "ติดแสตมป์ให้พอ", id: "dtit-sa-dtaaem-hai-phaaw", roman: "dtit sa-dtaaem hai phaaw", chinese: "贴足邮票", partOfSpeech: "短语", theme: "邮局", exampleThai: "จดหมายไปต่างจังหวัดต้องติดแสตมป์ให้พอ", exampleRoman: "jot-maai bpai dtaang jang-wat dtawng dtit sa-dtaaem hai phaaw", exampleChinese: "寄到外府的信要贴足邮票。", tag: "邮寄" },
  { thai: "ถามค่าจัดส่งก่อน", id: "thaam-khaa-jat-song-gaawn", roman: "thaam khaa jat-song gaawn", chinese: "先问运费", partOfSpeech: "短语", theme: "邮局", exampleThai: "ฉันถามค่าจัดส่งก่อนเลือกแบบส่ง", exampleRoman: "chan thaam khaa jat-song gaawn leuuak baaep song", exampleChinese: "我先问运费，再选择寄送方式。", tag: "邮寄" },
  { thai: "ถอนเงินที่เคาน์เตอร์", id: "thaawn-ngoen-thii-khao-dtooe", roman: "thaawn ngoen thii khao-dtooe", chinese: "在柜台取钱", partOfSpeech: "短语", theme: "银行柜台", exampleThai: "ยายถอนเงินที่เคาน์เตอร์ เพราะไม่ใช้ตู้เอทีเอ็ม", exampleRoman: "yaai thaawn ngoen thii khao-dtooe, phraw mai chai dtuu ee-thii-em", exampleChinese: "外婆/奶奶在柜台取钱，因为不用自动取款机。", tag: "银行" },
  { thai: "ฝากเงินเข้าบัญชี", id: "faak-ngoen-khao-ban-chii", roman: "faak ngoen khao ban-chii", chinese: "把钱存入账户", partOfSpeech: "短语", theme: "银行柜台", exampleThai: "พ่อฝากเงินเข้าบัญชีให้ลูกทุกเดือน", exampleRoman: "phaaw faak ngoen khao ban-chii hai luuk thuk duean", exampleChinese: "爸爸每个月把钱存入孩子账户。", tag: "银行" },
  { thai: "ถามยอดเงินคงเหลือ", id: "thaam-yaawt-ngoen-khong-leuua", roman: "thaam yaawt ngoen khong leuua", chinese: "询问余额", partOfSpeech: "短语", theme: "银行柜台", exampleThai: "ฉันถามยอดเงินคงเหลือกับพนักงานธนาคาร", exampleRoman: "chan thaam yaawt ngoen khong leuua gap pha-nak-ngaan tha-naa-khaan", exampleChinese: "我向银行工作人员询问余额。", tag: "银行" },
  { thai: "ตัดผมแค่ปลาย", id: "dtat-phom-khaae-bplaai", roman: "dtat phom khaae bplaai", chinese: "只剪发尾", partOfSpeech: "短语", theme: "理发", exampleThai: "วันนี้ฉันอยากตัดผมแค่ปลาย ไม่เอาสั้นมาก", exampleRoman: "wan-nii chan yaak dtat phom khaae bplaai, mai ao san maak", exampleChinese: "今天我想只剪发尾，不要太短。", tag: "理发" },
  { thai: "ตัดผมสั้นกว่านี้นิดหนึ่ง", id: "dtat-phom-san-gwaa-nii-nit-neung", roman: "dtat phom san gwaa nii nit neung", chinese: "再剪短一点", partOfSpeech: "短语", theme: "理发", exampleThai: "ช่างถามว่าให้ตัดผมสั้นกว่านี้นิดหนึ่งไหม", exampleRoman: "chaang thaam waa hai dtat phom san gwaa nii nit neung mai", exampleChinese: "理发师问要不要再剪短一点。", tag: "理发" },
  { thai: "มือถือชาร์จไม่เข้า", id: "mue-theu-chaat-mai-khao", roman: "mue-theu chaat mai khao", chinese: "手机充不进电", partOfSpeech: "短语", theme: "修手机", exampleThai: "มือถือชาร์จไม่เข้า ฉันจึงเอาไปให้ร้านดู", exampleRoman: "mue-theu chaat mai khao, chan jeung ao bpai hai raan duu", exampleChinese: "手机充不进电，所以我拿去店里看。", tag: "修手机" },
  { thai: "หน้าจอแตกนิดหน่อย", id: "naa-jaaw-dtaaek-nit-naawy", roman: "naa-jaaw dtaaek nit naawy", chinese: "屏幕有点裂", partOfSpeech: "短语", theme: "修手机", exampleThai: "หน้าจอแตกนิดหน่อย แต่ยังใช้ได้", exampleRoman: "naa-jaaw dtaaek nit naawy, dtaae yang chai dai", exampleChinese: "屏幕有点裂，但还能用。", tag: "修手机" },
  { thai: "ถามราคาซ่อมก่อน", id: "thaam-raa-khaa-saawm-gaawn", roman: "thaam raa-khaa saawm gaawn", chinese: "先问维修价格", partOfSpeech: "短语", theme: "修手机", exampleThai: "ก่อนซ่อมมือถือ ฉันถามราคาซ่อมก่อน", exampleRoman: "gaawn saawm mue-theu, chan thaam raa-khaa saawm gaawn", exampleChinese: "修手机前，我先问维修价格。", tag: "修手机" },
];

const serviceRows = servicePlaces.map((place): Definition => ({
  thai: `ไป${place.thai}เพื่อ${place.actionThai}`,
  id: `bpai-${place.id}-phuea-${place.actionRoman.replace(/ /g, "-")}`,
  roman: `bpai ${place.roman} phuea ${place.actionRoman}`,
  chinese: `去${place.chinese}${place.actionChinese}`,
  partOfSpeech: "短语",
  theme: place.theme,
  exampleThai: `เช้านี้ฉันไป${place.thai}เพื่อ${place.actionThai}`,
  exampleRoman: `chaao nii chan bpai ${place.roman} phuea ${place.actionRoman}`,
  exampleChinese: `今天早上我去${place.chinese}${place.actionChinese}。`,
  tag: "办事",
}));

const queueRows = servicePlaces.slice(0, 24).map((place): Definition => ({
  thai: `กดบัตรคิวที่${place.thai}`,
  id: `got-bat-khiu-thii-${place.id}`,
  roman: `got bat khiu thii ${place.roman}`,
  chinese: `在${place.chinese}取号`,
  partOfSpeech: "短语",
  theme: "排队取号",
  exampleThai: `ถ้ามีคนเยอะ ต้องกดบัตรคิวที่${place.thai}ก่อน`,
  exampleRoman: `thaa mii khon yoe, dtawng got bat khiu thii ${place.roman} gaawn`,
  exampleChinese: `如果人多，要先在${place.chinese}取号。`,
  tag: "取号",
}));

const hoursRows = servicePlaces.slice(0, 24).map((place): Definition => ({
  thai: `เช็กเวลาทำการของ${place.thai}`,
  id: `chek-wee-laa-tham-gaan-khaawng-${place.id}`,
  roman: `chek wee-laa tham-gaan khaawng ${place.roman}`,
  chinese: `查询${place.chinese}的营业时间`,
  partOfSpeech: "短语",
  theme: "营业时间",
  exampleThai: `ก่อนออกจากบ้าน ฉันเช็กเวลาทำการของ${place.thai}`,
  exampleRoman: `gaawn aawk jaak baan, chan chek wee-laa tham-gaan khaawng ${place.roman}`,
  exampleChinese: `出门前，我查询${place.chinese}的营业时间。`,
  tag: "时间",
}));

const rows: readonly Definition[] = [
  ...serviceRows,
  ...queueRows,
  ...hoursRows,
  ...directRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "城市办事服务", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段先掌握“去某处办事、取号、查营业时间、准备证件”等城市生活句块。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于城市服务、邮局、银行柜台、理发、修手机、打印复印、排队取号和营业时间。"],
    tags,
    sourceRefs: CITY_SERVICES_ERRANDS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_CITY_SERVICES_ERRANDS_01 = rows.map(toCandidate);
