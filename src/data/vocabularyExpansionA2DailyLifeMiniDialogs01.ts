export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "借东西" | "问情况" | "确认计划" | "临时更改" | "轻微抱怨" | "礼貌收尾" | "日常小对话";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const DAILY_LIFE_MINI_DIALOGS_REFS = ["thai-frequency", "thai-a2-daily-life-mini-dialogs-candidate"];

const borrowItems: readonly Item[] = [
  { thai: "ปากกาสีน้ำเงิน", roman: "bpaak-gaa sii naam-ngoen", chinese: "蓝色笔", id: "bpaak-gaa-sii-naam-ngoen" },
  { thai: "ดินสอแท่งนี้", roman: "din-saaw thaaeng nii", chinese: "这支铅笔", id: "din-saaw-thaaeng-nii" },
  { thai: "ยางลบเล็ก", roman: "yaang-lop lek", chinese: "小橡皮", id: "yaang-lop-lek" },
  { thai: "สายชาร์จมือถือ", roman: "saai chaat mue-theu", chinese: "手机充电线", id: "saai-chaat-mue-theu" },
  { thai: "ร่มพับ", roman: "rom phap", chinese: "折叠伞", id: "rom-phap" },
  { thai: "ถุงผ้า", roman: "thung phaa", chinese: "布袋", id: "thung-phaa" },
  { thai: "หนังสือเรียน", roman: "nang-sue riian", chinese: "课本", id: "nang-sue-riian" },
  { thai: "แก้วน้ำสะอาด", roman: "gaaeo naam sa-aat", chinese: "干净水杯", id: "gaaeo-naam-sa-aat" },
  { thai: "เก้าอี้ตัวนี้", roman: "gao-ii dtua nii", chinese: "这把椅子", id: "gao-ii-dtua-nii" },
  { thai: "โต๊ะเล็ก", roman: "dto lek", chinese: "小桌子", id: "dto-lek" },
  { thai: "บัตรรถไฟฟ้า", roman: "bat rot-fai-faa", chinese: "轨道交通卡", id: "bat-rot-fai-faa" },
  { thai: "กระดาษหนึ่งแผ่น", roman: "gra-daat neung phaen", chinese: "一张纸", id: "gra-daat-neung-phaen" },
  { thai: "หูฟังสำรอง", roman: "huu-fang sam-raawng", chinese: "备用耳机", id: "huu-fang-sam-raawng" },
  { thai: "กล่องข้าว", roman: "glaawng khaao", chinese: "饭盒", id: "glaawng-khaao" },
  { thai: "กุญแจห้อง", roman: "gun-jaae haawng", chinese: "房间钥匙", id: "gun-jaae-haawng" },
  { thai: "หมวกกันแดด", roman: "muak gan daaet", chinese: "遮阳帽", id: "muak-gan-daaet" },
];

const planItems: readonly Item[] = [
  { thai: "เจอกันที่ร้านกาแฟ", roman: "jooe gan thii raan gaa-faae", chinese: "在咖啡店见", id: "jooe-gan-thii-raan-gaa-faae" },
  { thai: "กินข้าวตอนเย็น", roman: "gin khaao dtaawn yen", chinese: "晚上吃饭", id: "gin-khaao-dtaawn-yen" },
  { thai: "ไปตลาดเช้า", roman: "bpai dta-laat chaao", chinese: "去早市", id: "bpai-dta-laat-chaao" },
  { thai: "ดูหนังวันเสาร์", roman: "duu nang wan sao", chinese: "周六看电影", id: "duu-nang-wan-sao" },
  { thai: "โทรคุยคืนนี้", roman: "thoo khui kheun-nii", chinese: "今晚打电话聊", id: "thoo-khui-kheun-nii" },
  { thai: "ทำการบ้านด้วยกัน", roman: "tham gaan-baan duai gan", chinese: "一起做作业", id: "tham-gaan-baan-duai-gan" },
  { thai: "ไปออกกำลังกาย", roman: "bpai aawk-gam-lang-gaai", chinese: "去运动", id: "bpai-aawk-gam-lang-gaai" },
  { thai: "ซื้อของเข้าบ้าน", roman: "seu khaawng khao baan", chinese: "买家用东西", id: "seu-khaawng-khao-baan" },
  { thai: "ไปหาหมอพรุ่งนี้", roman: "bpai haa maaw phrung-nii", chinese: "明天去看医生", id: "bpai-haa-maaw-phrung-nii" },
  { thai: "นัดที่สถานี", roman: "nat thii sa-thaa-nii", chinese: "约在车站", id: "nat-thii-sa-thaa-nii" },
  { thai: "ส่งงานก่อนเที่ยง", roman: "song ngaan gaawn thiiang", chinese: "中午前交工作/作业", id: "song-ngaan-gaawn-thiiang" },
  { thai: "กลับบ้านพร้อมกัน", roman: "glap baan phraawm gan", chinese: "一起回家", id: "glap-baan-phraawm-gan" },
  { thai: "ไปธนาคารตอนบ่าย", roman: "bpai tha-naa-khaan dtaawn baai", chinese: "下午去银行", id: "bpai-tha-naa-khaan-dtaawn-baai" },
  { thai: "คุยเรื่องห้องพัก", roman: "khui rueang haawng-phak", chinese: "聊房间的事", id: "khui-rueang-haawng-phak" },
  { thai: "ถ่ายรูปด้วยกัน", roman: "thaai ruup duai gan", chinese: "一起拍照", id: "thaai-ruup-duai-gan" },
  { thai: "ไปส่งพัสดุ", roman: "bpai song phat-sa-du", chinese: "去寄包裹", id: "bpai-song-phat-sa-du" },
];

const situations: readonly Item[] = [
  { thai: "รถติดมาก", roman: "rot dtit maak", chinese: "很堵车", id: "rot-dtit-maak" },
  { thai: "ฝนตกไม่หยุด", roman: "fon dtok mai yut", chinese: "雨一直不停", id: "fon-dtok-mai-yut" },
  { thai: "ร้านคนเยอะ", roman: "raan khon yoe", chinese: "店里人多", id: "raan-khon-yoe" },
  { thai: "อาหารออกช้า", roman: "aa-haan aawk chaa", chinese: "出餐慢", id: "aa-haan-aawk-chaa" },
  { thai: "ห้องเสียงดัง", roman: "haawng siiang dang", chinese: "房间吵", id: "haawng-siiang-dang" },
  { thai: "เน็ตช้ามาก", roman: "net chaa maak", chinese: "网络很慢", id: "net-chaa-maak" },
  { thai: "ลิฟต์รอนาน", roman: "lip raaw naan", chinese: "电梯等很久", id: "lip-raaw-naan" },
  { thai: "ของหมดเร็ว", roman: "khaawng mot reo", chinese: "东西很快卖完", id: "khaawng-mot-reo" },
  { thai: "เสียงเพลงดังไป", roman: "siiang phleeng dang bpai", chinese: "音乐声太大", id: "siiang-phleeng-dang-bpai" },
  { thai: "โต๊ะยังไม่ว่าง", roman: "dto yang mai waang", chinese: "桌子还没空", id: "dto-yang-mai-waang" },
  { thai: "งานเยอะกว่าที่คิด", roman: "ngaan yoe gwaa thii khit", chinese: "工作比想象中多", id: "ngaan-yoe-gwaa-thii-khit" },
  { thai: "ทางไกลนิดหน่อย", roman: "thaang glai nit naawy", chinese: "路有点远", id: "thaang-glai-nit-naawy" },
  { thai: "อากาศร้อนเกินไป", roman: "aa-gaat raawn goen bpai", chinese: "天气太热", id: "aa-gaat-raawn-goen-bpai" },
  { thai: "คิววันนี้ยาว", roman: "khiu wan-nii yaao", chinese: "今天队很长", id: "khiu-wan-nii-yaao" },
  { thai: "แบตมือถือใกล้หมด", roman: "baaet mue-theu glai mot", chinese: "手机快没电", id: "baaet-mue-theu-glai-mot" },
  { thai: "เสียงโทรศัพท์ไม่ชัด", roman: "siiang thoo-ra-sap mai chat", chinese: "电话声音不清楚", id: "siiang-thoo-ra-sap-mai-chat" },
];

const directRows: readonly Definition[] = [
  { thai: "แป๊บนะ ขอเช็กก่อน", id: "bpaaep-na-khaaw-chek-gaawn", roman: "bpaaep na, khaaw chek gaawn", chinese: "等一下，我先确认一下", partOfSpeech: "短语", theme: "确认计划", exampleThai: "เพื่อนถามเวลา ฉันตอบว่าแป๊บนะ ขอเช็กก่อน", exampleRoman: "phuean thaam wee-laa, chan dtaawp waa bpaaep na, khaaw chek gaawn", exampleChinese: "朋友问时间时，我回答：“等一下，我先确认一下。”", tag: "确认" },
  { thai: "โอเค งั้นตามนี้นะ", id: "oo-khee-ngan-dtaam-nii-na", roman: "oo-khee, ngan dtaam nii na", chinese: "好的，那就这样哦", partOfSpeech: "短语", theme: "礼貌收尾", exampleThai: "หลังตกลงเวลา เราพูดว่าโอเค งั้นตามนี้นะ", exampleRoman: "lang dtok-long wee-laa, rao phuut waa oo-khee, ngan dtaam nii na", exampleChinese: "约好时间后，我们说：“好的，那就这样哦。”", tag: "收尾" },
  { thai: "เดี๋ยวถึงแล้วบอกนะ", id: "diao-theung-laaeo-baawk-na", roman: "diao theung laaeo baawk na", chinese: "到了以后告诉我哦", partOfSpeech: "短语", theme: "礼貌收尾", exampleThai: "ก่อนเพื่อนออกเดินทาง ฉันพูดว่าเดี๋ยวถึงแล้วบอกนะ", exampleRoman: "gaawn phuean aawk doen-thaang, chan phuut waa diao theung laaeo baawk na", exampleChinese: "朋友出发前，我说：“到了以后告诉我哦。”", tag: "收尾" },
  { thai: "ถ้าไม่สะดวกไม่เป็นไร", id: "thaa-mai-sa-duuak-mai-bpen-rai", roman: "thaa mai sa-duuak mai bpen rai", chinese: "如果不方便也没关系", partOfSpeech: "短语", theme: "礼貌收尾", exampleThai: "ฉันชวนเพื่อนแล้วพูดว่าถ้าไม่สะดวกไม่เป็นไร", exampleRoman: "chan chuan phuean laaeo phuut waa thaa mai sa-duuak mai bpen rai", exampleChinese: "我邀请朋友后说：“如果不方便也没关系。”", tag: "收尾" },
  { thai: "ขอบคุณที่บอกล่วงหน้า", id: "khaawp-khun-thii-baawk-luuang-naa", roman: "khaawp-khun thii baawk luuang-naa", chinese: "谢谢你提前告诉我", partOfSpeech: "短语", theme: "礼貌收尾", exampleThai: "เมื่อเพื่อนเปลี่ยนเวลา ฉันพูดว่าขอบคุณที่บอกล่วงหน้า", exampleRoman: "muea phuean bplian wee-laa, chan phuut waa khaawp-khun thii baawk luuang-naa", exampleChinese: "朋友改时间时，我说：“谢谢你提前告诉我。”", tag: "收尾" },
];

const borrowRows = borrowItems.map((item): Definition => ({
  thai: `ขอยืม${item.thai}สักครู่ได้ไหม`,
  id: `khaaw-yeum-${item.id}-sak-khruu-dai-mai`,
  roman: `khaaw yeum ${item.roman} sak khruu dai mai`,
  chinese: `可以借${item.chinese}一会儿吗`,
  partOfSpeech: "短语",
  theme: "借东西",
  exampleThai: `ฉันถามเพื่อนว่า ขอยืม${item.thai}สักครู่ได้ไหม`,
  exampleRoman: `chan thaam phuean waa khaaw yeum ${item.roman} sak khruu dai mai`,
  exampleChinese: `我问朋友：“可以借${item.chinese}一会儿吗？”`,
  tag: "借东西",
}));

const returnRows = borrowItems.map((item): Definition => ({
  thai: `เดี๋ยวคืน${item.thai}ให้นะ`,
  id: `diao-kheun-${item.id}-hai-na`,
  roman: `diao kheun ${item.roman} hai na`,
  chinese: `等下把${item.chinese}还给你`,
  partOfSpeech: "短语",
  theme: "借东西",
  exampleThai: `หลังยืมของ ฉันพูดว่าเดี๋ยวคืน${item.thai}ให้นะ`,
  exampleRoman: `lang yeum khaawng, chan phuut waa diao kheun ${item.roman} hai na`,
  exampleChinese: `借东西后，我说：“等下把${item.chinese}还给你。”`,
  tag: "归还",
}));

const confirmRows = planItems.map((plan): Definition => ({
  thai: `เรายัง${plan.thai}เหมือนเดิมไหม`,
  id: `rao-yang-${plan.id}-meuuan-doem-mai`,
  roman: `rao yang ${plan.roman} meuuan doem mai`,
  chinese: `我们还是照原计划${plan.chinese}吗`,
  partOfSpeech: "短语",
  theme: "确认计划",
  exampleThai: `ก่อนออกจากบ้าน ฉันถามว่า เรายัง${plan.thai}เหมือนเดิมไหม`,
  exampleRoman: `gaawn aawk jaak baan, chan thaam waa rao yang ${plan.roman} meuuan doem mai`,
  exampleChinese: `出门前，我问：“我们还是照原计划${plan.chinese}吗？”`,
  tag: "确认",
}));

const changeRows = planItems.map((plan): Definition => ({
  thai: `ขอเปลี่ยนจาก${plan.thai}เป็นพรุ่งนี้ได้ไหม`,
  id: `khaaw-bplian-jaak-${plan.id}-bpen-phrung-nii-dai-mai`,
  roman: `khaaw bplian jaak ${plan.roman} bpen phrung-nii dai mai`,
  chinese: `可以把${plan.chinese}改到明天吗`,
  partOfSpeech: "短语",
  theme: "临时更改",
  exampleThai: `วันนี้ฉันไม่สะดวก ขอเปลี่ยนจาก${plan.thai}เป็นพรุ่งนี้ได้ไหม`,
  exampleRoman: `wan-nii chan mai sa-duuak, khaaw bplian jaak ${plan.roman} bpen phrung-nii dai mai`,
  exampleChinese: `今天我不方便，可以把${plan.chinese}改到明天吗？`,
  tag: "改计划",
}));

const complaintRows = situations.map((situation): Definition => ({
  thai: `วันนี้${situation.thai}นิดหน่อย`,
  id: `wan-nii-${situation.id}-nit-naawy`,
  roman: `wan-nii ${situation.roman} nit naawy`,
  chinese: `今天有点${situation.chinese}`,
  partOfSpeech: "短语",
  theme: "轻微抱怨",
  exampleThai: `ฉันบอกเพื่อนว่า วันนี้${situation.thai}นิดหน่อย`,
  exampleRoman: `chan baawk phuean waa wan-nii ${situation.roman} nit naawy`,
  exampleChinese: `我告诉朋友：“今天有点${situation.chinese}。”`,
  tag: "抱怨",
}));

const askRows = situations.map((situation): Definition => ({
  thai: `เรื่อง${situation.thai}เป็นอย่างไรบ้าง`,
  id: `rueang-${situation.id}-bpen-yaang-rai-baang`,
  roman: `rueang ${situation.roman} bpen yaang-rai baang`,
  chinese: `${situation.chinese}这件事怎么样了`,
  partOfSpeech: "短语",
  theme: "问情况",
  exampleThai: `ฉันถามว่า เรื่อง${situation.thai}เป็นอย่างไรบ้าง`,
  exampleRoman: `chan thaam waa rueang ${situation.roman} bpen yaang-rai baang`,
  exampleChinese: `我问：“${situation.chinese}这件事怎么样了？”`,
  tag: "问情况",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...borrowRows,
  ...returnRows,
  ...confirmRows,
  ...changeRows,
  ...complaintRows,
  ...askRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "日常小对话", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 小对话可先掌握借东西、确认、改计划、轻微抱怨和礼貌收尾这些固定框架。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于日常小对话：借东西、问情况、确认计划、临时更改、轻微抱怨和礼貌收尾。"],
    tags,
    sourceRefs: DAILY_LIFE_MINI_DIALOGS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_LIFE_MINI_DIALOGS_01 = rows.map(toCandidate);
