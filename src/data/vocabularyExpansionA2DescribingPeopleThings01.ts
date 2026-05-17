export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "短语";
export type VocabularyExpansionTheme = "描述人" | "描述物" | "外观" | "性格" | "状态" | "质量" | "颜色形状材质" | "像不像" | "看起来" | "比较描述";
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

type Descriptor = { thai: string; roman: string; chinese: string; id: string; theme: VocabularyExpansionTheme };
type Thing = { thai: string; roman: string; chinese: string; id: string };

const DESCRIBING_PEOPLE_THINGS_REFS = ["thai-frequency", "thai-a2-describing-people-things-candidate"];

const peopleDescriptors: readonly Descriptor[] = [
  { thai: "ใจดีและพูดช้า", roman: "jai-dii lae phuut chaa", chinese: "心地好而且说话慢", id: "jai-dii-lae-phuut-chaa", theme: "性格" },
  { thai: "ขี้อายตอนเจอคนใหม่", roman: "khii-aai dtaawn jooe khon mai", chinese: "见到新人时害羞", id: "khii-aai-dtaawn-jooe-khon-mai", theme: "性格" },
  { thai: "ยิ้มง่ายกับทุกคน", roman: "yim ngaai gap thuk khon", chinese: "对每个人都爱笑", id: "yim-ngaai-gap-thuk-khon", theme: "性格" },
  { thai: "พูดน้อยแต่ตั้งใจฟัง", roman: "phuut naawy dtaae dtang-jai fang", chinese: "话少但认真听", id: "phuut-naawy-dtaae-dtang-jai-fang", theme: "性格" },
  { thai: "ชอบช่วยเพื่อน", roman: "chaawp chuai phuean", chinese: "喜欢帮助朋友", id: "chaawp-chuai-phuean", theme: "性格" },
  { thai: "ทำงานเร็วและเรียบร้อย", roman: "tham-ngaan reo lae riiap-raawy", chinese: "做事快而且整齐", id: "tham-ngaan-reo-lae-riiap-raawy", theme: "性格" },
  { thai: "ใจเย็นเวลามีปัญหา", roman: "jai yen wee-laa mii bpan-haa", chinese: "有问题时冷静", id: "jai-yen-wee-laa-mii-bpan-haa", theme: "性格" },
  { thai: "ใจร้อนนิดหน่อย", roman: "jai raawn nit naawy", chinese: "有点急躁", id: "jai-raawn-nit-naawy", theme: "性格" },
  { thai: "ดูเหนื่อยหลังเลิกงาน", roman: "duu neuuai lang loek ngaan", chinese: "下班后看起来累", id: "duu-neuuai-lang-loek-ngaan", theme: "状态" },
  { thai: "ดูสดชื่นตอนเช้า", roman: "duu sot-cheun dtaawn chaao", chinese: "早上看起来清爽", id: "duu-sot-cheun-dtaawn-chaao", theme: "状态" },
  { thai: "แต่งตัวเรียบร้อย", roman: "dtaeng-dtua riiap-raawy", chinese: "穿着整齐", id: "dtaeng-dtua-riiap-raawy", theme: "外观" },
  { thai: "แต่งตัวสบาย ๆ", roman: "dtaeng-dtua sa-baai sa-baai", chinese: "穿得轻松随意", id: "dtaeng-dtua-sa-baai-sa-baai", theme: "外观" },
  { thai: "ผมสั้นกว่าเดิม", roman: "phom san gwaa doem", chinese: "头发比以前短", id: "phom-san-gwaa-doem", theme: "外观" },
  { thai: "ผมยาวถึงไหล่", roman: "phom yaao theung lai", chinese: "头发长到肩膀", id: "phom-yaao-theung-lai", theme: "外观" },
  { thai: "ใส่แว่นกรอบดำ", roman: "sai waaen graawp dam", chinese: "戴黑框眼镜", id: "sai-waaen-graawp-dam", theme: "外观" },
  { thai: "ตัวสูงกว่าเพื่อน", roman: "dtua suung gwaa phuean", chinese: "个子比朋友高", id: "dtua-suung-gwaa-phuean", theme: "比较描述" },
  { thai: "ตัวเล็กแต่วิ่งเร็ว", roman: "dtua lek dtaae wing reo", chinese: "个子小但跑得快", id: "dtua-lek-dtaae-wing-reo", theme: "外观" },
  { thai: "เสียงเบาและสุภาพ", roman: "siiang bao lae su-phaap", chinese: "声音轻而礼貌", id: "siiang-bao-lae-su-phaap", theme: "描述人" },
  { thai: "หน้าตาคล้ายพ่อ", roman: "naa-dtaa khlaai phaaw", chinese: "长相像爸爸", id: "naa-dtaa-khlaai-phaaw", theme: "像不像" },
  { thai: "นิสัยคล้ายแม่", roman: "ni-sai khlaai maae", chinese: "性格像妈妈", id: "ni-sai-khlaai-maae", theme: "像不像" },
  { thai: "ดูไม่ค่อยสบาย", roman: "duu mai khaawy sa-baai", chinese: "看起来不太舒服", id: "duu-mai-khaawy-sa-baai", theme: "看起来" },
  { thai: "ดูอารมณ์ดีมาก", roman: "duu aa-rom dii maak", chinese: "看起来心情很好", id: "duu-aa-rom-dii-maak", theme: "看起来" },
  { thai: "ดูเด็กกว่าอายุ", roman: "duu dek gwaa aa-yu", chinese: "看起来比年龄年轻", id: "duu-dek-gwaa-aa-yu", theme: "看起来" },
  { thai: "ดูเป็นคนง่าย ๆ", roman: "duu bpen khon ngaai ngaai", chinese: "看起来是随和的人", id: "duu-bpen-khon-ngaai-ngaai", theme: "看起来" },
];

const objectDescriptors: readonly Descriptor[] = [
  { thai: "สีฟ้าอ่อน", roman: "sii faa aawn", chinese: "浅蓝色", id: "sii-faa-aawn", theme: "颜色形状材质" },
  { thai: "สีเขียวเข้ม", roman: "sii khiaao khem", chinese: "深绿色", id: "sii-khiaao-khem", theme: "颜色形状材质" },
  { thai: "สีแดงสด", roman: "sii daaeng sot", chinese: "鲜红色", id: "sii-daaeng-sot", theme: "颜色形状材质" },
  { thai: "สีขาวสะอาด", roman: "sii khaao sa-aat", chinese: "干净的白色", id: "sii-khaao-sa-aat", theme: "颜色形状材质" },
  { thai: "ทรงกลมเล็ก", roman: "song glom lek", chinese: "小圆形", id: "song-glom-lek", theme: "颜色形状材质" },
  { thai: "ทรงสี่เหลี่ยมแบน", roman: "song sii-liiam baaen", chinese: "扁方形", id: "song-sii-liiam-baaen", theme: "颜色形状材质" },
  { thai: "ทำจากไม้เบา", roman: "tham jaak maai bao", chinese: "由轻木头做成", id: "tham-jaak-maai-bao", theme: "颜色形状材质" },
  { thai: "ทำจากผ้านุ่ม", roman: "tham jaak phaa num", chinese: "由柔软布料做成", id: "tham-jaak-phaa-num", theme: "颜色形状材质" },
  { thai: "ทำจากพลาสติกแข็ง", roman: "tham jaak phlaat-dtik khaeng", chinese: "由硬塑料做成", id: "tham-jaak-phlaat-dtik-khaeng", theme: "颜色形状材质" },
  { thai: "ทำจากเหล็กหนัก", roman: "tham jaak lek nak", chinese: "由重金属/铁做成", id: "tham-jaak-lek-nak", theme: "颜色形状材质" },
  { thai: "ดูใหม่มาก", roman: "duu mai maak", chinese: "看起来很新", id: "duu-mai-maak", theme: "看起来" },
  { thai: "ดูเก่าแต่ใช้ได้", roman: "duu gao dtaae chai dai", chinese: "看起来旧但能用", id: "duu-gao-dtaae-chai-dai", theme: "质量" },
  { thai: "ดูแข็งแรงดี", roman: "duu khaeng-raaeng dii", chinese: "看起来结实", id: "duu-khaeng-raaeng-dii", theme: "质量" },
  { thai: "ดูบางเกินไป", roman: "duu baang goen bpai", chinese: "看起来太薄", id: "duu-baang-goen-bpai", theme: "质量" },
  { thai: "จับแล้วนุ่ม", roman: "jap laaeo num", chinese: "摸起来软", id: "jap-laaeo-num", theme: "状态" },
  { thai: "จับแล้วลื่น", roman: "jap laaeo leun", chinese: "摸起来滑", id: "jap-laaeo-leun", theme: "状态" },
  { thai: "กลิ่นหอมอ่อน ๆ", roman: "glin haawm aawn aawn", chinese: "淡淡的香味", id: "glin-haawm-aawn-aawn", theme: "状态" },
  { thai: "กลิ่นแรงไป", roman: "glin raaeng bpai", chinese: "味道太重", id: "glin-raaeng-bpai", theme: "状态" },
  { thai: "ขนาดพอดีมือ", roman: "kha-naat phaaw-dii mue", chinese: "大小正好拿在手里", id: "kha-naat-phaaw-dii-mue", theme: "质量" },
  { thai: "ขนาดใหญ่เกินโต๊ะ", roman: "kha-naat yai goen dto", chinese: "尺寸大过桌子", id: "kha-naat-yai-goen-dto", theme: "质量" },
  { thai: "น้ำหนักเบากว่าที่คิด", roman: "nam-nak bao gwaa thii khit", chinese: "重量比想象中轻", id: "nam-nak-bao-gwaa-thii-khit", theme: "比较描述" },
  { thai: "น้ำหนักมากกว่ากล่องเดิม", roman: "nam-nak maak gwaa glaawng doem", chinese: "重量比原来的盒子重", id: "nam-nak-maak-gwaa-glaawng-doem", theme: "比较描述" },
  { thai: "เหมือนของใหม่", roman: "meuuan khaawng mai", chinese: "像新的东西", id: "meuuan-khaawng-mai", theme: "像不像" },
  { thai: "ไม่เหมือนรูปในแอป", roman: "mai meuuan ruup nai aaep", chinese: "不像应用里的图片", id: "mai-meuuan-ruup-nai-aaep", theme: "像不像" },
  { thai: "คล้ายของที่บ้าน", roman: "khlaai khaawng thii baan", chinese: "像家里的东西", id: "khlaai-khaawng-thii-baan", theme: "像不像" },
  { thai: "ต่างจากอันเก่า", roman: "dtaang jaak an gao", chinese: "和旧的不同", id: "dtaang-jaak-an-gao", theme: "比较描述" },
];

const people: readonly Thing[] = [
  { thai: "เพื่อนใหม่ของฉัน", roman: "phuean mai khaawng chan", chinese: "我的新朋友", id: "phuean-mai-khaawng-chan" },
  { thai: "ครูภาษาไทย", roman: "khruu phaa-saa thai", chinese: "泰语老师", id: "khruu-phaa-saa-thai" },
  { thai: "พนักงานร้านกาแฟ", roman: "pha-nak-ngaan raan gaa-faae", chinese: "咖啡店店员", id: "pha-nak-ngaan-raan-gaa-faae" },
  { thai: "คนขับแท็กซี่", roman: "khon khap thaek-sii", chinese: "出租车司机", id: "khon-khap-thaek-sii" },
  { thai: "เด็กข้างบ้าน", roman: "dek khaang baan", chinese: "隔壁小孩", id: "dek-khaang-baan" },
  { thai: "คุณยายของเพื่อน", roman: "khun yaai khaawng phuean", chinese: "朋友的外婆/奶奶", id: "khun-yaai-khaawng-phuean" },
  { thai: "น้องชายในรูป", roman: "naawng-chaai nai ruup", chinese: "照片里的弟弟", id: "naawng-chaai-nai-ruup" },
  { thai: "ผู้หญิงคนนั้น", roman: "phuu-ying khon nan", chinese: "那位女性", id: "phuu-ying-khon-nan" },
  { thai: "ผู้ชายใส่หมวก", roman: "phuu-chaai sai muak", chinese: "戴帽子的男性", id: "phuu-chaai-sai-muak" },
  { thai: "ลูกค้าคนแรก", roman: "luuk-khaa khon raaek", chinese: "第一位顾客", id: "luuk-khaa-khon-raaek" },
  { thai: "นักเรียนแถวหน้า", roman: "nak-riian thaeo naa", chinese: "前排学生", id: "nak-riian-thaeo-naa" },
  { thai: "ญาติที่มาจากต่างจังหวัด", roman: "yaat thii maa jaak dtaang jang-wat", chinese: "从外府来的亲戚", id: "yaat-thii-maa-jaak-dtaang-jang-wat" },
];

const things: readonly Thing[] = [
  { thai: "กระเป๋าใบนี้", roman: "gra-bpao bai nii", chinese: "这个包", id: "gra-bpao-bai-nii" },
  { thai: "รองเท้าคู่นั้น", roman: "raawng-thaao khuu nan", chinese: "那双鞋", id: "raawng-thaao-khuu-nan" },
  { thai: "โต๊ะทำงานใหม่", roman: "dto tham-ngaan mai", chinese: "新办公桌", id: "dto-tham-ngaan-mai" },
  { thai: "เก้าอี้ในครัว", roman: "gao-ii nai khrua", chinese: "厨房里的椅子", id: "gao-ii-nai-khrua" },
  { thai: "เสื้อสีขาว", roman: "seua sii khaao", chinese: "白色衣服", id: "seua-sii-khaao" },
  { thai: "แก้วน้ำใบเล็ก", roman: "gaaeo naam bai lek", chinese: "小水杯", id: "gaaeo-naam-bai-lek" },
  { thai: "กล่องอาหารกลางวัน", roman: "glaawng aa-haan glaang-wan", chinese: "午餐盒", id: "glaawng-aa-haan-glaang-wan" },
  { thai: "โทรศัพท์เครื่องเก่า", roman: "thoo-ra-sap khreuuang gao", chinese: "旧手机", id: "thoo-ra-sap-khreuuang-gao" },
  { thai: "ผ้าห่มผืนนี้", roman: "phaa-hom pheun nii", chinese: "这条毯子", id: "phaa-hom-pheun-nii" },
  { thai: "หนังสือเล่มหนา", roman: "nang-sue lem naa", chinese: "厚书", id: "nang-sue-lem-naa" },
  { thai: "บ้านหลังเล็ก", roman: "baan lang lek", chinese: "小房子", id: "baan-lang-lek" },
  { thai: "รถคันสีแดง", roman: "rot khan sii daaeng", chinese: "红色车", id: "rot-khan-sii-daaeng" },
];

const directRows: readonly Definition[] = [
  { thai: "ดูเหมือนจะฝนตก", id: "duu-meuuan-ja-fon-dtok", roman: "duu meuuan ja fon dtok", chinese: "看起来像要下雨", partOfSpeech: "短语", theme: "看起来", exampleThai: "ท้องฟ้ามืดมาก ดูเหมือนจะฝนตก", exampleRoman: "thaawng-faa meut maak, duu meuuan ja fon dtok", exampleChinese: "天空很暗，看起来像要下雨。", tag: "看起来" },
  { thai: "ดูเหมือนของจริง", id: "duu-meuuan-khaawng-jing", roman: "duu meuuan khaawng jing", chinese: "看起来像真的", partOfSpeech: "短语", theme: "像不像", exampleThai: "ดอกไม้ปลอมนี้ดูเหมือนของจริงมาก", exampleRoman: "daawk-maai bplaawm nii duu meuuan khaawng jing maak", exampleChinese: "这朵假花看起来很像真的。", tag: "像不像" },
  { thai: "ไม่เหมาะกับเด็กเล็ก", id: "mai-maw-gap-dek-lek", roman: "mai maw gap dek lek", chinese: "不适合小孩", partOfSpeech: "短语", theme: "质量", exampleThai: "ของเล่นชิ้นนี้เล็กมาก ไม่เหมาะกับเด็กเล็ก", exampleRoman: "khaawng-len chin nii lek maak, mai maw gap dek lek", exampleChinese: "这个玩具很小，不适合小孩。", tag: "质量" },
  { thai: "เหมาะกับอากาศร้อน", id: "maw-gap-aa-gaat-raawn", roman: "maw gap aa-gaat raawn", chinese: "适合热天气", partOfSpeech: "短语", theme: "质量", exampleThai: "เสื้อผ้าบาง ๆ เหมาะกับอากาศร้อน", exampleRoman: "seua-phaa baang baang maw gap aa-gaat raawn", exampleChinese: "薄衣服适合热天气。", tag: "质量" },
  { thai: "สีเข้ากับห้อง", id: "sii-khao-gap-haawng", roman: "sii khao gap haawng", chinese: "颜色和房间搭配", partOfSpeech: "短语", theme: "颜色形状材质", exampleThai: "ผ้าม่านสีนี้เข้ากับห้องมาก", exampleRoman: "phaa-maan sii nii khao gap haawng maak", exampleChinese: "这个颜色的窗帘和房间很搭。", tag: "颜色" },
  { thai: "ขนาดไม่พอดีกับโต๊ะ", id: "kha-naat-mai-phaaw-dii-gap-dto", roman: "kha-naat mai phaaw-dii gap dto", chinese: "尺寸和桌子不合适", partOfSpeech: "短语", theme: "质量", exampleThai: "ผ้าปูโต๊ะผืนนี้ขนาดไม่พอดีกับโต๊ะ", exampleRoman: "phaa bpuu dto pheun nii kha-naat mai phaaw-dii gap dto", exampleChinese: "这块桌布尺寸和桌子不合适。", tag: "尺寸" },
];

const peopleRows = people.flatMap((person, index) => {
  const descriptor = peopleDescriptors[index % peopleDescriptors.length];
  const descriptorTwo = peopleDescriptors[(index + 8) % peopleDescriptors.length];
  return [
    {
      thai: `${person.thai}ดู${descriptor.thai}`,
      id: `${person.id}-duu-${descriptor.id}`,
      roman: `${person.roman} duu ${descriptor.roman}`,
      chinese: `${person.chinese}看起来${descriptor.chinese}`,
      partOfSpeech: "短语" as const,
      theme: "看起来" as const,
      exampleThai: `วันนี้${person.thai}ดู${descriptor.thai}`,
      exampleRoman: `wan-nii ${person.roman} duu ${descriptor.roman}`,
      exampleChinese: `今天${person.chinese}看起来${descriptor.chinese}。`,
      tag: "描述人",
    },
    {
      thai: `${person.thai}ค่อนข้าง${descriptorTwo.thai}`,
      id: `${person.id}-khaawn-khaang-${descriptorTwo.id}`,
      roman: `${person.roman} khaawn-khaang ${descriptorTwo.roman}`,
      chinese: `${person.chinese}比较${descriptorTwo.chinese}`,
      partOfSpeech: "短语" as const,
      theme: "比较描述" as const,
      exampleThai: `จากที่คุยกัน ${person.thai}ค่อนข้าง${descriptorTwo.thai}`,
      exampleRoman: `jaak thii khui gan, ${person.roman} khaawn-khaang ${descriptorTwo.roman}`,
      exampleChinese: `从聊天来看，${person.chinese}比较${descriptorTwo.chinese}。`,
      tag: "比较",
    },
  ];
});

const thingRows = things.flatMap((thing, index) => {
  const descriptor = objectDescriptors[index % objectDescriptors.length];
  const descriptorTwo = objectDescriptors[(index + 10) % objectDescriptors.length];
  return [
    {
      thai: `${thing.thai}ดู${descriptor.thai}`,
      id: `${thing.id}-duu-${descriptor.id}`,
      roman: `${thing.roman} duu ${descriptor.roman}`,
      chinese: `${thing.chinese}看起来${descriptor.chinese}`,
      partOfSpeech: "短语" as const,
      theme: descriptor.theme,
      exampleThai: `ฉันคิดว่า${thing.thai}ดู${descriptor.thai}`,
      exampleRoman: `chan khit waa ${thing.roman} duu ${descriptor.roman}`,
      exampleChinese: `我觉得${thing.chinese}看起来${descriptor.chinese}。`,
      tag: "描述物",
    },
    {
      thai: `${thing.thai}ค่อนข้าง${descriptorTwo.thai}`,
      id: `${thing.id}-khaawn-khaang-${descriptorTwo.id}`,
      roman: `${thing.roman} khaawn-khaang ${descriptorTwo.roman}`,
      chinese: `${thing.chinese}比较${descriptorTwo.chinese}`,
      partOfSpeech: "短语" as const,
      theme: "比较描述" as const,
      exampleThai: `เมื่อเทียบกับอันเก่า ${thing.thai}ค่อนข้าง${descriptorTwo.thai}`,
      exampleRoman: `muea thiiap gap an gao, ${thing.roman} khaawn-khaang ${descriptorTwo.roman}`,
      exampleChinese: `和旧的相比，${thing.chinese}比较${descriptorTwo.chinese}。`,
      tag: "比较",
    },
  ];
});

const descriptorRows = [...peopleDescriptors, ...objectDescriptors].map((descriptor): Definition => ({
  thai: `คำว่า${descriptor.thai}ใช้บรรยายได้`,
  id: `kham-waa-${descriptor.id}-chai-ban-yaai-dai`,
  roman: `kham waa ${descriptor.roman} chai ban-yaai dai`,
  chinese: `“${descriptor.chinese}”可以用来描述`,
  partOfSpeech: "短语",
  theme: descriptor.theme,
  exampleThai: `คำว่า${descriptor.thai}ใช้บรรยายคนหรือของในประโยคง่าย ๆ ได้`,
  exampleRoman: `kham waa ${descriptor.roman} chai ban-yaai khon reu khaawng nai bpra-yook ngaai ngaai dai`,
  exampleChinese: `“${descriptor.chinese}”可以在简单句中描述人或物。`,
  tag: "描述词",
}));

const rows: readonly Definition[] = [
  ...directRows,
  ...peopleRows,
  ...thingRows,
  ...descriptorRows,
];

const toCandidate = (definition: Definition, index: number): VocabularyExpansionCandidate => {
  const { thai, id, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag } = definition;
  const collocations = [{ thai, roman, chinese }];
  const tags = ["a2", "描述人和物", tag, theme];
  return {
    thai,
    id,
    roman,
    chinese,
    partOfSpeech,
    theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese, examples: [{ thai: exampleThai, roman: exampleRoman, chinese: exampleChinese }], synonyms: [], antonyms: [], comparisons: [], collocations, usageNotesZh: ["A2 阶段可用 ดู、ค่อนข้าง、เหมือน、คล้าย、กว่า 来做自然描述。"], tags }],
    synonyms: [],
    antonyms: [],
    comparisons: [],
    collocations,
    usageNotesZh: ["用于描述人和物、外观、性格、状态、质量、颜色形状材质，以及像不像和比较。"],
    tags,
    sourceRefs: DESCRIBING_PEOPLE_THINGS_REFS,
    reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_DESCRIBING_PEOPLE_THINGS_01 = rows.map(toCandidate);
