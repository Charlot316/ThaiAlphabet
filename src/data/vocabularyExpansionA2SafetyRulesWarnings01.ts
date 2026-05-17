export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "安全" | "规则" | "禁止" | "注意" | "危险" | "紧急情况" | "报警求助" | "丢失受伤" | "基础警示语";
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

type Warning = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };

const SAFETY_RULES_WARNINGS_REFS = ["thai-frequency", "thai-a2-safety-rules-warnings-candidate"];

const warnings: readonly Warning[] = [
  { thai: "ระวังพื้นเปียก", roman: "ra-wang pheun bpiiak", chinese: "小心地面湿", id: "ra-wang-pheun-bpiiak", theme: "基础警示语" },
  { thai: "ระวังทางลื่น", roman: "ra-wang thaang leun", chinese: "小心路滑", id: "ra-wang-thaang-leun", theme: "基础警示语" },
  { thai: "ระวังบันไดชัน", roman: "ra-wang ban-dai chan", chinese: "小心楼梯陡", id: "ra-wang-ban-dai-chan", theme: "基础警示语" },
  { thai: "ระวังของร้อน", roman: "ra-wang khaawng raawn", chinese: "小心热的东西", id: "ra-wang-khaawng-raawn", theme: "基础警示语" },
  { thai: "ระวังรถเข้าออก", roman: "ra-wang rot khao aawk", chinese: "小心车辆进出", id: "ra-wang-rot-khao-aawk", theme: "基础警示语" },
  { thai: "ระวังสุนัข", roman: "ra-wang su-nak", chinese: "小心狗", id: "ra-wang-su-nak", theme: "基础警示语" },
  { thai: "ห้ามสูบบุหรี่", roman: "haam suup bu-rii", chinese: "禁止吸烟", id: "haam-suup-bu-rii", theme: "禁止" },
  { thai: "ห้ามถ่ายรูป", roman: "haam thaai ruup", chinese: "禁止拍照", id: "haam-thaai-ruup", theme: "禁止" },
  { thai: "ห้ามเข้า", roman: "haam khao", chinese: "禁止进入", id: "haam-khao", theme: "禁止" },
  { thai: "ห้ามจอดรถ", roman: "haam jaawt rot", chinese: "禁止停车", id: "haam-jaawt-rot", theme: "禁止" },
  { thai: "ห้ามวิ่งในอาคาร", roman: "haam wing nai aa-khaan", chinese: "禁止在楼内跑", id: "haam-wing-nai-aa-khaan", theme: "禁止" },
  { thai: "ห้ามจับของจัดแสดง", roman: "haam jap khaawng jat sa-daaeng", chinese: "禁止触摸展品", id: "haam-jap-khaawng-jat-sa-daaeng", theme: "禁止" },
  { thai: "กรุณาปิดประตูเบา ๆ", roman: "ga-ru-naa bpit bpra-dtuu bao bao", chinese: "请轻轻关门", id: "ga-ru-naa-bpit-bpra-dtuu-bao-bao", theme: "规则" },
  { thai: "กรุณาต่อคิว", roman: "ga-ru-naa dtaaw khiu", chinese: "请排队", id: "ga-ru-naa-dtaaw-khiu", theme: "规则" },
  { thai: "กรุณาใส่หน้ากาก", roman: "ga-ru-naa sai naa-gaak", chinese: "请戴口罩", id: "ga-ru-naa-sai-naa-gaak", theme: "规则" },
  { thai: "กรุณาล้างมือก่อนเข้า", roman: "ga-ru-naa laang mue gaawn khao", chinese: "请进门前洗手", id: "ga-ru-naa-laang-mue-gaawn-khao", theme: "规则" },
  { thai: "เดินชิดซ้าย", roman: "doen chit saai", chinese: "靠左走", id: "doen-chit-saai", theme: "规则" },
  { thai: "จับราวบันได", roman: "jap raao ban-dai", chinese: "扶楼梯扶手", id: "jap-raao-ban-dai", theme: "安全" },
  { thai: "คาดเข็มขัดนิรภัย", roman: "khaat khem-khat ni-ra-phai", chinese: "系安全带", id: "khaat-khem-khat-ni-ra-phai", theme: "安全" },
  { thai: "สวมหมวกกันน็อก", roman: "suam muak gan-nok", chinese: "戴头盔", id: "suam-muak-gan-nok", theme: "安全" },
  { thai: "เก็บของมีค่าไว้กับตัว", roman: "gep khaawng mii khaa wai gap dtua", chinese: "贵重物品随身保管", id: "gep-khaawng-mii-khaa-wai-gap-dtua", theme: "安全" },
  { thai: "อย่าทิ้งกระเป๋าไว้คนเดียว", roman: "yaa thing gra-bpao wai khon diao", chinese: "不要把包单独留下", id: "yaa-thing-gra-bpao-wai-khon-diao", theme: "安全" },
  { thai: "อย่าเปิดประตูให้คนแปลกหน้า", roman: "yaa bpoet bpra-dtuu hai khon bplaaek naa", chinese: "不要给陌生人开门", id: "yaa-bpoet-bpra-dtuu-hai-khon-bplaaek-naa", theme: "安全" },
  { thai: "อย่าเล่นใกล้ถนน", roman: "yaa len glai tha-non", chinese: "不要在马路附近玩", id: "yaa-len-glai-tha-non", theme: "安全" },
  { thai: "อย่าแตะสายไฟ", roman: "yaa dtae saai fai", chinese: "不要碰电线", id: "yaa-dtae-saai-fai", theme: "危险" },
  { thai: "ทางออกฉุกเฉินอยู่ด้านซ้าย", roman: "thaang aawk chuk-choen yuu daan saai", chinese: "紧急出口在左边", id: "thaang-aawk-chuk-choen-yuu-daan-saai", theme: "紧急情况" },
  { thai: "จุดรวมพลอยู่หน้าตึก", roman: "jut ruam phon yuu naa dteuk", chinese: "集合点在楼前", id: "jut-ruam-phon-yuu-naa-dteuk", theme: "紧急情况" },
  { thai: "กดปุ่มขอความช่วยเหลือ", roman: "got bpum khaaw khwaam chuai-leuua", chinese: "按求助按钮", id: "got-bpum-khaaw-khwaam-chuai-leuua", theme: "报警求助" },
  { thai: "โทรหาตำรวจทันที", roman: "thoo haa dtam-ruat than-thii", chinese: "马上打电话给警察", id: "thoo-haa-dtam-ruat-than-thii", theme: "报警求助" },
  { thai: "โทรเรียกรถพยาบาล", roman: "thoo riiak rot pha-yaa-baan", chinese: "打电话叫救护车", id: "thoo-riiak-rot-pha-yaa-baan", theme: "报警求助" },
];

const situations: readonly Warning[] = [
  { thai: "กระเป๋าสตางค์หาย", roman: "gra-bpao sa-dtaang haai", chinese: "钱包丢了", id: "gra-bpao-sa-dtaang-haai", theme: "丢失受伤" },
  { thai: "มือถือหาย", roman: "mue-theu haai", chinese: "手机丢了", id: "mue-theu-haai", theme: "丢失受伤" },
  { thai: "บัตรห้องหาย", roman: "bat haawng haai", chinese: "房卡丢了", id: "bat-haawng-haai", theme: "丢失受伤" },
  { thai: "หนังสือเดินทางหาย", roman: "nang-sue doen-thaang haai", chinese: "护照丢了", id: "nang-sue-doen-thaang-haai", theme: "丢失受伤" },
  { thai: "เด็กหลงทาง", roman: "dek long thaang", chinese: "孩子迷路了", id: "dek-long-thaang", theme: "报警求助" },
  { thai: "เพื่อนหายไปในตลาด", roman: "phuean haai bpai nai dta-laat", chinese: "朋友在市场里走散了", id: "phuean-haai-bpai-nai-dta-laat", theme: "报警求助" },
  { thai: "ลื่นล้มที่บันได", roman: "leun lom thii ban-dai", chinese: "在楼梯滑倒", id: "leun-lom-thii-ban-dai", theme: "丢失受伤" },
  { thai: "มือโดนของร้อน", roman: "mue doon khaawng raawn", chinese: "手碰到热东西", id: "mue-doon-khaawng-raawn", theme: "丢失受伤" },
  { thai: "เท้าเจ็บจากเดินนาน", roman: "thaao jep jaak doen naan", chinese: "走久了脚痛", id: "thaao-jep-jaak-doen-naan", theme: "丢失受伤" },
  { thai: "มีคนเป็นลม", roman: "mii khon bpen lom", chinese: "有人晕倒", id: "mii-khon-bpen-lom", theme: "紧急情况" },
  { thai: "ไฟดับในอาคาร", roman: "fai dap nai aa-khaan", chinese: "楼里停电", id: "fai-dap-nai-aa-khaan", theme: "紧急情况" },
  { thai: "มีควันในครัว", roman: "mii khwan nai khrua", chinese: "厨房有烟", id: "mii-khwan-nai-khrua", theme: "紧急情况" },
  { thai: "น้ำรั่วบนพื้น", roman: "naam rua bon pheun", chinese: "地上漏水", id: "naam-rua-bon-pheun", theme: "危险" },
  { thai: "ประตูเปิดไม่ได้", roman: "bpra-dtuu bpoet mai dai", chinese: "门打不开", id: "bpra-dtuu-bpoet-mai-dai", theme: "紧急情况" },
  { thai: "ลิฟต์หยุดกลางทาง", roman: "lip yut glaang thaang", chinese: "电梯半路停住", id: "lip-yut-glaang-thaang", theme: "紧急情况" },
  { thai: "รถชนเบา ๆ", roman: "rot chon bao bao", chinese: "轻微撞车", id: "rot-chon-bao-bao", theme: "报警求助" },
  { thai: "ยางรถแบน", roman: "yaang rot baaen", chinese: "车胎瘪了", id: "yaang-rot-baaen", theme: "紧急情况" },
  { thai: "ฝนตกหนักจนมองไม่เห็นทาง", roman: "fon dtok nak jon maawng mai hen thaang", chinese: "雨大到看不清路", id: "fon-dtok-nak-jon-maawng-mai-hen-thaang", theme: "危险" },
  { thai: "ทางมืดมาก", roman: "thaang meut maak", chinese: "路很黑", id: "thaang-meut-maak", theme: "危险" },
  { thai: "สุนัขวิ่งตาม", roman: "su-nak wing dtaam", chinese: "狗追过来", id: "su-nak-wing-dtaam", theme: "危险" },
  { thai: "คนแปลกหน้าตามมา", roman: "khon bplaaek naa dtaam maa", chinese: "陌生人跟过来", id: "khon-bplaaek-naa-dtaam-maa", theme: "危险" },
  { thai: "ของตกจากชั้นสูง", roman: "khaawng dtok jaak chan suung", chinese: "东西从高处掉下", id: "khaawng-dtok-jaak-chan-suung", theme: "危险" },
  { thai: "กระจกแตกบนพื้น", roman: "gra-jok dtaaek bon pheun", chinese: "地上有碎玻璃", id: "gra-jok-dtaaek-bon-pheun", theme: "危险" },
  { thai: "อาหารทำให้แพ้", roman: "aa-haan tham-hai phaae", chinese: "食物引起过敏", id: "aa-haan-tham-hai-phae", theme: "紧急情况" },
];

const directRows: readonly Definition[] = [
  { thai: "ขอความช่วยเหลือจากเจ้าหน้าที่", id: "khaaw-khwaam-chuai-leuua-jaak-jao-naa-thii", roman: "khaaw khwaam chuai-leuua jaak jao-naa-thii", chinese: "向工作人员求助", partOfSpeech: "短语", theme: "报警求助", exampleThai: "ถ้ามีปัญหา ให้ขอความช่วยเหลือจากเจ้าหน้าที่", exampleRoman: "thaa mii bpan-haa, hai khaaw khwaam chuai-leuua jaak jao-naa-thii", exampleChinese: "如果有问题，就向工作人员求助。", tag: "求助" },
  { thai: "ช่วยโทรหาครอบครัวให้หน่อย", id: "chuai-thoo-haa-khraawp-khrua-hai-naawy", roman: "chuai thoo haa khraawp-khrua hai naawy", chinese: "请帮我打给家人", partOfSpeech: "短语", theme: "报警求助", exampleThai: "มือถือฉันหาย ช่วยโทรหาครอบครัวให้หน่อยได้ไหม", exampleRoman: "mue-theu chan haai, chuai thoo haa khraawp-khrua hai naawy dai mai", exampleChinese: "我的手机丢了，可以请你帮我打给家人吗？", tag: "求助" },
  { thai: "อย่าเดินคนเดียวตอนดึก", id: "yaa-doen-khon-diao-dtaawn-deuk", roman: "yaa doen khon diao dtaawn deuk", chinese: "深夜不要一个人走", partOfSpeech: "短语", theme: "安全", exampleThai: "แม่เตือนว่าอย่าเดินคนเดียวตอนดึก", exampleRoman: "maae dteuuan waa yaa doen khon diao dtaawn deuk", exampleChinese: "妈妈提醒说深夜不要一个人走。", tag: "安全" },
  { thai: "เก็บเบอร์ฉุกเฉินไว้", id: "gep-booe-chuk-choen-wai", roman: "gep booe chuk-choen wai", chinese: "保存紧急电话号码", partOfSpeech: "短语", theme: "紧急情况", exampleThai: "ก่อนเดินทาง ควรเก็บเบอร์ฉุกเฉินไว้ในมือถือ", exampleRoman: "gaawn doen-thaang, khuuan gep booe chuk-choen wai nai mue-theu", exampleChinese: "出行前，应该把紧急电话号码存在手机里。", tag: "紧急" },
  { thai: "บอกที่อยู่ให้ชัด", id: "baawk-thii-yuu-hai-chat", roman: "baawk thii-yuu hai chat", chinese: "把地址说清楚", partOfSpeech: "短语", theme: "报警求助", exampleThai: "เวลาโทรขอความช่วยเหลือ ต้องบอกที่อยู่ให้ชัด", exampleRoman: "wee-laa thoo khaaw khwaam chuai-leuua, dtawng baawk thii-yuu hai chat", exampleChinese: "打电话求助时，要把地址说清楚。", tag: "求助" },
  { thai: "นั่งรอในที่ปลอดภัย", id: "nang-raaw-nai-thii-bplaawt-phai", roman: "nang raaw nai thii bplaawt-phai", chinese: "在安全的地方坐着等", partOfSpeech: "短语", theme: "安全", exampleThai: "ถ้าหลงทาง ให้นั่งรอในที่ปลอดภัย", exampleRoman: "thaa long thaang, hai nang raaw nai thii bplaawt-phai", exampleChinese: "如果迷路了，就在安全的地方坐着等。", tag: "安全" },
  { thai: "อย่าขยับคนเจ็บเอง", id: "yaa-kha-yap-khon-jep-eeng", roman: "yaa kha-yap khon jep eeng", chinese: "不要自己移动伤者", partOfSpeech: "短语", theme: "丢失受伤", exampleThai: "ถ้าไม่แน่ใจ อย่าขยับคนเจ็บเอง", exampleRoman: "thaa mai naae-jai, yaa kha-yap khon jep eeng", exampleChinese: "如果不确定，不要自己移动伤者。", tag: "受伤" },
  { thai: "ล้างแผลด้วยน้ำสะอาด", id: "laang-phlaae-duai-naam-sa-aat", roman: "laang phlaae duai naam sa-aat", chinese: "用清水洗伤口", partOfSpeech: "短语", theme: "丢失受伤", exampleThai: "ถ้าแผลเล็ก ให้ล้างแผลด้วยน้ำสะอาดก่อน", exampleRoman: "thaa phlaae lek, hai laang phlaae duai naam sa-aat gaawn", exampleChinese: "如果是小伤口，先用清水洗伤口。", tag: "受伤" },
  { thai: "ติดพลาสเตอร์ที่นิ้ว", id: "dtit-phlaat-dtooe-thii-niu", roman: "dtit phlaat-dtooe thii niu", chinese: "在手指上贴创可贴", partOfSpeech: "短语", theme: "丢失受伤", exampleThai: "น้องมีแผลเล็ก แม่ติดพลาสเตอร์ที่นิ้วให้", exampleRoman: "naawng mii phlaae lek, maae dtit phlaat-dtooe thii niu hai", exampleChinese: "弟弟/妹妹有小伤口，妈妈给他/她在手指上贴创可贴。", tag: "受伤" },
  { thai: "จดชื่อสถานที่ไว้", id: "jot-cheu-sa-thaan-thii-wai", roman: "jot cheu sa-thaan-thii wai", chinese: "把地点名称记下来", partOfSpeech: "短语", theme: "安全", exampleThai: "เวลาไปที่ใหม่ ควรจดชื่อสถานที่ไว้", exampleRoman: "wee-laa bpai thii mai, khuuan jot cheu sa-thaan-thii wai", exampleChinese: "去新地方时，应该把地点名称记下来。", tag: "安全" },
];

const signRows = warnings.map((warning): Definition => ({
  thai: `ป้ายเขียนว่า${warning.thai}`,
  id: `bpaai-khiian-waa-${warning.id}`,
  roman: `bpaai khiian waa ${warning.roman}`,
  chinese: `牌子写着“${warning.chinese}”`,
  partOfSpeech: "短语",
  theme: warning.theme,
  exampleThai: `ตรงหน้าประตูมีป้ายเขียนว่า${warning.thai}`,
  exampleRoman: `dtrong naa bpra-dtuu mii bpaai khiian waa ${warning.roman}`,
  exampleChinese: `门口有牌子写着“${warning.chinese}”。`,
  tag: "警示牌",
}));

const remindRows = warnings.slice(0, 22).map((warning): Definition => ({
  thai: `เตือนเด็กว่า${warning.thai}`,
  id: `dteuuan-dek-waa-${warning.id}`,
  roman: `dteuuan dek waa ${warning.roman}`,
  chinese: `提醒孩子“${warning.chinese}”`,
  partOfSpeech: "短语",
  theme: warning.theme,
  exampleThai: `ครูเตือนเด็กว่า${warning.thai}ก่อนออกไปเล่น`,
  exampleRoman: `khruu dteuuan dek waa ${warning.roman} gaawn aawk bpai len`,
  exampleChinese: `老师在孩子们出去玩前提醒他们“${warning.chinese}”。`,
  tag: "提醒",
}));

const helpRows = situations.map((situation): Definition => ({
  thai: `ขอความช่วยเหลือเพราะ${situation.thai}`,
  id: `khaaw-khwaam-chuai-leuua-phraw-${situation.id}`,
  roman: `khaaw khwaam chuai-leuua phraw ${situation.roman}`,
  chinese: `因为${situation.chinese}而求助`,
  partOfSpeech: "短语",
  theme: situation.theme,
  exampleThai: `เขาขอความช่วยเหลือเพราะ${situation.thai}`,
  exampleRoman: `khao khaaw khwaam chuai-leuua phraw ${situation.roman}`,
  exampleChinese: `他因为${situation.chinese}而求助。`,
  tag: "求助",
}));

const reportRows = situations.slice(0, 20).map((situation): Definition => ({
  thai: `แจ้งเจ้าหน้าที่ว่า${situation.thai}`,
  id: `jaaeng-jao-naa-thii-waa-${situation.id}`,
  roman: `jaaeng jao-naa-thii waa ${situation.roman}`,
  chinese: `向工作人员说明${situation.chinese}`,
  partOfSpeech: "短语",
  theme: situation.theme,
  exampleThai: `ฉันแจ้งเจ้าหน้าที่ว่า${situation.thai}และขอให้ช่วย`,
  exampleRoman: `chan jaaeng jao-naa-thii waa ${situation.roman} lae khaaw hai chuai`,
  exampleChinese: `我向工作人员说明${situation.chinese}，并请求帮忙。`,
  tag: "说明",
}));

const rows: readonly Definition[] = [
  ...signRows,
  ...remindRows,
  ...helpRows,
  ...reportRows,
  ...directRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "安全规则警示", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段可先记“牌子写着、提醒、求助、向工作人员说明”等安全场景句块。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于安全、规则、禁止、注意、危险、紧急情况、报警求助、丢失受伤和基础警示语。"],
    tags,
    sourceRefs: SAFETY_RULES_WARNINGS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_SAFETY_RULES_WARNINGS_01 = rows.map(toCandidate);
