export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "取送东西" | "快递自提" | "外卖" | "寄放" | "预约取件" | "送错地址" | "联系骑手" | "确认收货";
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionRelatedWord = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionComparison = { kind: "近义" | "反义" | "易混" | "用法"; target: VocabularyExpansionRelatedWord; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[] };
export type VocabularyExpansionCandidate = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: "a2"; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelatedWord[]; antonyms: VocabularyExpansionRelatedWord[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; usageNotesZh: string[]; tags: string[]; sourceRefs: string[]; reviewStatus: "candidate-draft" };

type Definition = { thai: string; id: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; exampleThai: string; exampleRoman: string; exampleChinese: string; tag: string };
type Item = { thai: string; roman: string; chinese: string; id: string };

const DAILY_LOGISTICS_PICKUP_REFS = ["thai-frequency", "thai-a2-daily-logistics-pickup-candidate"];

const parcels: readonly Item[] = [
  { thai: "พัสดุกล่องเล็ก", roman: "phat-sa-du glaawng lek", chinese: "小箱包裹", id: "phat-sa-du-glaawng-lek" },
  { thai: "พัสดุจากร้านค้า", roman: "phat-sa-du jaak raan khaa", chinese: "店铺寄来的包裹", id: "phat-sa-du-jaak-raan-khaa" },
  { thai: "ของที่สั่งออนไลน์", roman: "khaawng thii sang aawn-lai", chinese: "网购的东西", id: "khaawng-thii-sang-aawn-lai" },
  { thai: "เอกสารสำคัญ", roman: "eek-ga-saan sam-khan", chinese: "重要文件", id: "eek-ga-saan-sam-khan" },
  { thai: "อาหารเดลิเวอรี", roman: "aa-haan dee-li-wooe-rii", chinese: "外卖餐食", id: "aa-haan-dee-li-wooe-rii" },
  { thai: "เครื่องดื่มที่สั่ง", roman: "khreuuang-deum thii sang", chinese: "点的饮料", id: "khreuuang-deum-thii-sang" },
  { thai: "ของฝากให้เพื่อน", roman: "khaawng-faak hai pheuuan", chinese: "给朋友的伴手礼", id: "khaawng-faak-hai-pheuuan" },
  { thai: "เสื้อที่ซักรีดแล้ว", roman: "seua thii sak-riit laaeo", chinese: "洗熨好的衣服", id: "seua-thii-sak-riit-laaeo" },
  { thai: "กุญแจที่ฝากไว้", roman: "gun-jaae thii faak wai", chinese: "寄放的钥匙", id: "gun-jaae-thii-faak-wai" },
  { thai: "กระเป๋าที่ฝากไว้", roman: "gra-bpao thii faak wai", chinese: "寄放的包", id: "gra-bpao-thii-faak-wai" },
  { thai: "ยาในถุงเล็ก", roman: "yaa nai thung lek", chinese: "小袋药", id: "yaa-nai-thung-lek" },
  { thai: "หนังสือที่ยืมมา", roman: "nang-seuu thii yeum maa", chinese: "借来的书", id: "nang-seuu-thii-yeum-maa" },
  { thai: "กล่องอาหารเย็น", roman: "glaawng aa-haan yen", chinese: "晚餐盒", id: "glaawng-aa-haan-yen" },
  { thai: "ของใช้ในบ้าน", roman: "khaawng-chai nai baan", chinese: "家用品", id: "khaawng-chai-nai-baan" },
  { thai: "ถุงผลไม้", roman: "thung phon-la-maai", chinese: "一袋水果", id: "thung-phon-la-maai" },
  { thai: "บัตรที่ลืมไว้", roman: "bat thii leum wai", chinese: "忘下的卡", id: "bat-thii-leum-wai" },
];

const places: readonly Item[] = [
  { thai: "หน้าคอนโด", roman: "naa khaawn-doo", chinese: "公寓门口", id: "naa-khaawn-doo" },
  { thai: "ล็อบบี้ตึก", roman: "lop-bii dteuk", chinese: "楼的大堂", id: "lop-bii-dteuk" },
  { thai: "ร้านสะดวกซื้อ", roman: "raan sa-duuak-seu", chinese: "便利店", id: "raan-sa-duuak-seu" },
  { thai: "จุดรับพัสดุ", roman: "jut rap phat-sa-du", chinese: "包裹领取点", id: "jut-rap-phat-sa-du" },
  { thai: "หน้าออฟฟิศ", roman: "naa aawf-fit", chinese: "办公室门口", id: "naa-aawf-fit" },
  { thai: "ป้อมยาม", roman: "bpaawm yaam", chinese: "保安亭", id: "bpaawm-yaam" },
  { thai: "หน้าบ้านเพื่อน", roman: "naa baan pheuuan", chinese: "朋友家门口", id: "naa-baan-pheuuan" },
  { thai: "เคาน์เตอร์รับของ", roman: "khao-dtooe rap khaawng", chinese: "取货柜台", id: "khao-dtooe-rap-khaawng" },
];

const directRows: readonly Definition[] = [
  { thai: "มารับของเองได้ไหม", id: "maa-rap-khaawng-eeng-dai-mai", roman: "maa rap khaawng eeng dai mai", chinese: "可以自己来取东西吗", partOfSpeech: "短语", theme: "快递自提", exampleThai: "ถ้าส่งไม่ทัน มารับของเองได้ไหม", exampleRoman: "thaa song mai than, maa rap khaawng eeng dai mai", exampleChinese: "如果送不及时，可以自己来取东西吗？", tag: "自提" },
  { thai: "ช่วยฝากของไว้ที่ล็อบบี้", id: "chuai-faak-khaawng-wai-thii-lop-bii", roman: "chuai faak khaawng wai thii lop-bii", chinese: "请把东西寄放在大堂", partOfSpeech: "短语", theme: "寄放", exampleThai: "ฉันยังไม่ถึง ช่วยฝากของไว้ที่ล็อบบี้ได้ไหม", exampleRoman: "chan yang mai theung, chuai faak khaawng wai thii lop-bii dai mai", exampleChinese: "我还没到，可以请把东西寄放在大堂吗？", tag: "寄放" },
  { thai: "นัดรับของตอนเย็น", id: "nat-rap-khaawng-dtaawn-yen", roman: "nat rap khaawng dtaawn yen", chinese: "约傍晚取东西", partOfSpeech: "短语", theme: "预约取件", exampleThai: "วันนี้ฉันสะดวกนัดรับของตอนเย็น", exampleRoman: "wan-nii chan sa-duuak nat rap khaawng dtaawn yen", exampleChinese: "今天我方便约傍晚取东西。", tag: "预约取件" },
  { thai: "ส่งผิดที่อยู่", id: "song-phit-thii-yuu", roman: "song phit thii-yuu", chinese: "送错地址", partOfSpeech: "短语", theme: "送错地址", exampleThai: "พัสดุชิ้นนี้ส่งผิดที่อยู่ ต้องติดต่อร้าน", exampleRoman: "phat-sa-du chin nii song phit thii-yuu, dtawng dtit-dtaaw raan", exampleChinese: "这个包裹送错地址了，要联系店家。", tag: "错地址" },
  { thai: "โทรหาคนส่งอาหาร", id: "thoo-haa-khon-song-aa-haan", roman: "thoo haa khon song aa-haan", chinese: "给送餐员打电话", partOfSpeech: "短语", theme: "联系骑手", exampleThai: "ถ้าอาหารยังไม่มา โทรหาคนส่งอาหารได้ไหม", exampleRoman: "thaa aa-haan yang mai maa, thoo haa khon song aa-haan dai mai", exampleChinese: "如果外卖还没来，可以给送餐员打电话吗？", tag: "联系骑手" },
  { thai: "กดยืนยันรับของแล้ว", id: "got-yeuun-yan-rap-khaawng-laaeo", roman: "got yeuun-yan rap khaawng laaeo", chinese: "已经点击确认收货了", partOfSpeech: "短语", theme: "确认收货", exampleThai: "ของมาถึงแล้ว ฉันกดยืนยันรับของแล้ว", exampleRoman: "khaawng maa theung laaeo, chan got yeuun-yan rap khaawng laaeo", exampleChinese: "东西到了，我已经点击确认收货了。", tag: "确认收货" },
  { thai: "ฝากไว้กับยามได้ไหม", id: "faak-wai-gap-yaam-dai-mai", roman: "faak wai gap yaam dai mai", chinese: "可以寄放在保安那里吗", partOfSpeech: "短语", theme: "寄放", exampleThai: "ฉันไม่อยู่บ้าน ฝากไว้กับยามได้ไหม", exampleRoman: "chan mai yuu baan, faak wai gap yaam dai mai", exampleChinese: "我不在家，可以寄放在保安那里吗？", tag: "寄放" },
  { thai: "ขอเลขพัสดุหน่อย", id: "khaaw-leek-phat-sa-du-naawy", roman: "khaaw leek phat-sa-du naawy", chinese: "请给我快递单号", partOfSpeech: "短语", theme: "快递自提", exampleThai: "จะเช็กสถานะ ขอเลขพัสดุหน่อย", exampleRoman: "ja chek sa-thaa-na, khaaw leek phat-sa-du naawy", exampleChinese: "要查状态，请给我快递单号。", tag: "快递" },
];

const pickupRows = parcels.map((item): Definition => ({
  thai: `ไปรับ${item.thai}เอง`,
  id: `bpai-rap-${item.id}-eeng`,
  roman: `bpai rap ${item.roman} eeng`,
  chinese: `自己去取${item.chinese}`,
  partOfSpeech: "短语",
  theme: "快递自提",
  exampleThai: `ถ้าส่งช้า ฉันจะไปรับ${item.thai}เอง`,
  exampleRoman: `thaa song chaa, chan ja bpai rap ${item.roman} eeng`,
  exampleChinese: `如果送得慢，我会自己去取${item.chinese}。`,
  tag: "自提",
}));

const deliverRows = parcels.map((item): Definition => ({
  thai: `ช่วยส่ง${item.thai}ให้หน่อย`,
  id: `chuai-song-${item.id}-hai-naawy`,
  roman: `chuai song ${item.roman} hai naawy`,
  chinese: `请帮忙送${item.chinese}`,
  partOfSpeech: "短语",
  theme: "取送东西",
  exampleThai: `ถ้าผ่านทางนี้ ช่วยส่ง${item.thai}ให้หน่อยได้ไหม`,
  exampleRoman: `thaa phaan thaang nii, chuai song ${item.roman} hai naawy dai mai`,
  exampleChinese: `如果经过这边，可以请帮忙送${item.chinese}吗？`,
  tag: "送东西",
}));

const keepRows = parcels.map((item): Definition => ({
  thai: `ฝาก${item.thai}ไว้ก่อน`,
  id: `faak-${item.id}-wai-gaawn`,
  roman: `faak ${item.roman} wai gaawn`,
  chinese: `先寄放${item.chinese}`,
  partOfSpeech: "短语",
  theme: "寄放",
  exampleThai: `ฉันยังไม่ว่าง ฝาก${item.thai}ไว้ก่อนนะ`,
  exampleRoman: `chan yang mai waang, faak ${item.roman} wai gaawn na`,
  exampleChinese: `我还没空，先寄放${item.chinese}哦。`,
  tag: "寄放",
}));

const wrongRows = parcels.map((item): Definition => ({
  thai: `${item.thai}ส่งผิดที่`,
  id: `${item.id}-song-phit-thii`,
  roman: `${item.roman} song phit thii`,
  chinese: `${item.chinese}送错地方`,
  partOfSpeech: "短语",
  theme: "送错地址",
  exampleThai: `วันนี้${item.thai}ส่งผิดที่ ต้องแจ้งคนส่ง`,
  exampleRoman: `wan-nii ${item.roman} song phit thii, dtawng jaaeng khon song`,
  exampleChinese: `今天${item.chinese}送错地方了，要通知配送员。`,
  tag: "错送",
}));

const confirmRows = parcels.map((item): Definition => ({
  thai: `ยืนยันว่าได้รับ${item.thai}แล้ว`,
  id: `yeuun-yan-waa-dai-rap-${item.id}-laaeo`,
  roman: `yeuun-yan waa dai rap ${item.roman} laaeo`,
  chinese: `确认已经收到${item.chinese}`,
  partOfSpeech: "短语",
  theme: "确认收货",
  exampleThai: `ถ้าของครบแล้ว กรุณายืนยันว่าได้รับ${item.thai}แล้ว`,
  exampleRoman: `thaa khaawng khrop laaeo, ga-ru-naa yeuun-yan waa dai rap ${item.roman} laaeo`,
  exampleChinese: `如果东西齐了，请确认已经收到${item.chinese}。`,
  tag: "确认收货",
}));

const placeRows = places.map((place): Definition => ({
  thai: `นัดรับของที่${place.thai}`,
  id: `nat-rap-khaawng-thii-${place.id}`,
  roman: `nat rap khaawng thii ${place.roman}`,
  chinese: `约在${place.chinese}取东西`,
  partOfSpeech: "短语",
  theme: "预约取件",
  exampleThai: `สะดวกไหมถ้านัดรับของที่${place.thai}`,
  exampleRoman: `sa-duuak mai thaa nat rap khaawng thii ${place.roman}`,
  exampleChinese: `约在${place.chinese}取东西方便吗？`,
  tag: "预约取件",
}));

const riderRows = places.map((place): Definition => ({
  thai: `ติดต่อไรเดอร์ที่${place.thai}`,
  id: `dtit-dtaaw-rai-dooe-thii-${place.id}`,
  roman: `dtit-dtaaw rai-dooe thii ${place.roman}`,
  chinese: `联系在${place.chinese}的骑手`,
  partOfSpeech: "短语",
  theme: "联系骑手",
  exampleThai: `ถ้าไม่เจออาหาร ช่วยติดต่อไรเดอร์ที่${place.thai}`,
  exampleRoman: `thaa mai jooe aa-haan, chuai dtit-dtaaw rai-dooe thii ${place.roman}`,
  exampleChinese: `如果没看到外卖，请联系在${place.chinese}的骑手。`,
  tag: "联系骑手",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...pickupRows,
  ...deliverRows,
  ...keepRows,
  ...wrongRows,
  ...confirmRows,
  ...placeRows,
  ...riderRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "取送物流", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 取送物流常用“ไปรับ...เอง、ช่วยส่ง...、ฝาก...ไว้、นัดรับของ、ส่งผิดที่、ติดต่อไรเดอร์、ยืนยันว่าได้รับ...แล้ว”等表达。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于取送东西、快递自提、外卖、寄放、预约取件、送错地址、联系骑手和确认收货。"],
    tags,
    sourceRefs: DAILY_LOGISTICS_PICKUP_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_DAILY_LOGISTICS_PICKUP_01 = rows.map(toCandidate);
