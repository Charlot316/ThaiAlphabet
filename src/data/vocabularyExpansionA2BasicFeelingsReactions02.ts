export type VocabularyExpansionPartOfSpeech =
  | "名词"
  | "动词"
  | "形容词"
  | "副词"
  | "短语"
  | "句型";

export type VocabularyExpansionLevel = "a2";

type BasicFeelingsReactionsTheme =
  | "惊讶"
  | "尴尬"
  | "放心"
  | "紧张"
  | "羡慕"
  | "烦"
  | "感动"
  | "无聊"
  | "期待"
  | "反应表达";

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
  theme: BasicFeelingsReactionsTheme,
];

const BASIC_FEELINGS_REACTIONS_REFS = [
  "worker-a-a2-basic-feelings-reactions-02",
  "basic-thai-feelings-reactions",
];

const rows: Row[] = [
  ["bplaaek-jai", "แปลกใจ", "bplaaek jai", "惊讶；觉得奇怪", "动词", "惊讶"],
  ["dtok-jai", "ตกใจ", "dtok jai", "吓一跳；吃惊", "动词", "惊讶"],
  ["dtuen-dten", "ตื่นเต้น", "dteun dten", "兴奋；紧张激动", "形容词", "惊讶"],
  ["mai-khit-waa", "ไม่คิดว่า", "mai khit waa", "没想到", "句型", "惊讶"],
  ["jing-ree", "จริงเหรอ", "jing roe", "真的吗", "短语", "惊讶"],
  ["bpen-bpai-dai-yaang-rai", "เป็นไปได้อย่างไร", "bpen bpai dai yaang rai", "怎么可能", "句型", "惊讶"],
  ["na-dtok-jai", "น่าตกใจ", "naa dtok jai", "令人吃惊", "形容词", "惊讶"],
  ["ruu-suek-bplaaek", "รู้สึกแปลก", "ruu suek bplaaek", "觉得奇怪", "句型", "惊讶"],
  ["phit-khaat", "ผิดคาด", "phit khaat", "出乎意料", "形容词", "惊讶"],
  ["dtok-jai-mak", "ตกใจมาก", "dtok jai maak", "非常吃惊", "句型", "惊讶"],
  ["khaoen", "เขิน", "khoen", "害羞；不好意思", "形容词", "尴尬"],
  ["aaai", "อาย", "aai", "害羞；羞愧", "形容词", "尴尬"],
  ["kae", "แก้เขิน", "gaae khoen", "化解尴尬", "动词", "尴尬"],
  ["awk-dtua-mai-thuuk", "ออกตัวไม่ถูก", "awk dtua mai thuuk", "不知道怎么反应", "句型", "尴尬"],
  ["tham-dtua-mai-thuuk", "ทำตัวไม่ถูก", "tham dtua mai thuuk", "不知所措", "句型", "尴尬"],
  ["awk-yaa", "อึดอัด", "uet at", "不自在；别扭", "形容词", "尴尬"],
  ["ruu-suek-awk-yaa", "รู้สึกอึดอัด", "ruu suek uet at", "觉得不自在", "句型", "尴尬"],
  ["phuut-mai-awk", "พูดไม่ออก", "phuut mai awk", "说不出话", "句型", "尴尬"],
  ["khaaw-thoot-thii-tham-hai-awk-yaa", "ขอโทษที่ทำให้อึดอัด", "khaaw thoot thii tham hai uet at", "抱歉让你不自在", "句型", "尴尬"],
  ["bpen-rueng-naa-aai", "เป็นเรื่องน่าอาย", "bpen rueang naa aai", "是件尴尬/丢脸的事", "句型", "尴尬"],
  ["sa-baai-jai", "สบายใจ", "sa-baai jai", "安心；放心", "形容词", "放心"],
  ["kloong-jai", "คล่องใจ", "khlaawng jai", "心里顺畅；放心", "形容词", "放心"],
  ["loong-jai", "โล่งใจ", "loong jai", "松了一口气", "形容词", "放心"],
  ["mai-dtawng-huang", "ไม่ต้องห่วง", "mai dtawng huang", "不用担心", "句型", "放心"],
  ["huang-noi-long", "ห่วงน้อยลง", "huang noi long", "少担心了", "句型", "放心"],
  ["dii-khuen-laew", "ดีขึ้นแล้ว", "dii khuen laew", "已经好些了", "句型", "放心"],
  ["riiap-roi-laew", "เรียบร้อยแล้ว", "riiap raawy laew", "已经妥当了", "句型", "放心"],
  ["mai-pen-arai-laew", "ไม่เป็นอะไรแล้ว", "mai bpen a-rai laew", "已经没事了", "句型", "放心"],
  ["ruu-suek-plawt-phai", "รู้สึกปลอดภัย", "ruu suek bplaawt-phai", "觉得安全", "句型", "放心"],
  ["hen-laew-sa-baai-jai", "เห็นแล้วสบายใจ", "hen laew sa-baai jai", "看了就放心", "句型", "放心"],
  ["kriiat", "เครียด", "khriiat", "压力大；紧张", "形容词", "紧张"],
  ["dtuen-dten-mak", "ตื่นเต้นมาก", "dteun dten maak", "很紧张/激动", "句型", "紧张"],
  ["klua", "กลัว", "glua", "害怕", "动词", "紧张"],
  ["mai-nae-jai", "ไม่แน่ใจ", "mai nae jai", "不确定", "形容词", "紧张"],
  ["jai-dten", "ใจเต้น", "jai dten", "心跳快", "句型", "紧张"],
  ["mue-san", "มือสั่น", "mue san", "手抖", "句型", "紧张"],
  ["phuut-phit-phuut-thuuk", "พูดผิดพูดถูก", "phuut phit phuut thuuk", "紧张到说话乱", "句型", "紧张"],
  ["glaaw-glaaw", "กลัว ๆ", "glua glua", "有点害怕", "短语", "紧张"],
  ["khaaw-welaa-tham-jai", "ขอเวลาทำใจ", "khaaw we-laa tham jai", "给我点时间调整心情", "句型", "紧张"],
  ["hai-gam-lang-jai-dtua-eng", "ให้กำลังใจตัวเอง", "hai gam-lang jai dtua eng", "给自己打气", "动词", "紧张"],
  ["it-chaa", "อิจฉา", "it-chaa", "羡慕；嫉妒", "动词", "羡慕"],
  ["na-it-chaa", "น่าอิจฉา", "naa it-chaa", "令人羡慕", "形容词", "羡慕"],
  ["it-chaa-nit-noi", "อิจฉานิดหน่อย", "it-chaa nit noi", "有点羡慕", "句型", "羡慕"],
  ["yaak-dai-baang", "อยากได้บ้าง", "yaak dai baang", "也想要", "句型", "羡慕"],
  ["yaak-bpen-baang", "อยากเป็นบ้าง", "yaak bpen baang", "也想成为那样", "句型", "羡慕"],
  ["dii-jai-duai", "ดีใจด้วย", "dii jai duai", "替你高兴", "短语", "羡慕"],
  ["chuen-chom", "ชื่นชม", "chuen chom", "欣赏；称赞", "动词", "羡慕"],
  ["hen-laew-yaak-tham-baang", "เห็นแล้วอยากทำบ้าง", "hen laew yaak tham baang", "看了也想做", "句型", "羡慕"],
  ["khun-chok-dii-mak", "คุณโชคดีมาก", "khun chook dii maak", "你很幸运", "句型", "羡慕"],
  ["mai-chai-it-chaa-raeng", "ไม่ใช่อิจฉาแรง", "mai chai it-chaa raaeng", "不是强烈嫉妒", "句型", "羡慕"],
  ["ram-khaan", "รำคาญ", "ram-khaan", "烦；觉得烦人", "形容词", "烦"],
  ["na-ram-khaan", "น่ารำคาญ", "naa ram-khaan", "令人烦", "形容词", "烦"],
  ["beua", "เบื่อ", "buea", "厌烦；腻了", "形容词", "烦"],
  ["huu-cha", "หงุดหงิด", "ngut-ngit", "烦躁", "形容词", "烦"],
  ["mai-sabai-jai", "ไม่สบายใจ", "mai sa-baai jai", "心里不舒服", "形容词", "烦"],
  ["yak-phak", "อยากพัก", "yaak phak", "想休息", "句型", "烦"],
  ["phaw-laew", "พอแล้ว", "phaaw laew", "够了", "短语", "烦"],
  ["mai-ao-laew", "ไม่เอาแล้ว", "mai ao laew", "不要了；受够了", "句型", "烦"],
  ["yaa-phuut-sam", "อย่าพูดซ้ำ", "yaa phuut sam", "别重复说", "句型", "烦"],
  ["khaaw-yuu-ngiap-ngiap", "ขออยู่เงียบ ๆ", "khaaw yuu ngiiap ngiiap", "想安静待着", "句型", "烦"],
  ["sap-sueng", "ซาบซึ้ง", "saap seung", "感动；感激", "形容词", "感动"],
  ["bprap-jai", "ประทับใจ", "bpra-thap jai", "印象深刻；感动", "动词", "感动"],
  ["ruu-suek-dii-jai", "รู้สึกดีใจ", "ruu suek dii jai", "感到高兴", "句型", "感动"],
  ["tham-hai-sap-sueng", "ทำให้ซาบซึ้ง", "tham hai saap seung", "让人感动", "句型", "感动"],
  ["nam-dtaa-ja-lai", "น้ำตาจะไหล", "naam dtaa ja lai", "感动到快流泪", "句型", "感动"],
  ["khawp-khun-jing-jing", "ขอบคุณจริง ๆ", "khaawp khun jing jing", "真的谢谢", "短语", "感动"],
  ["mi-khwaam-maai-mak", "มีความหมายมาก", "mii khwaam maai maak", "很有意义", "句型", "感动"],
  ["ruu-suek-op-un", "รู้สึกอบอุ่น", "ruu suek op-un", "觉得温暖", "句型", "感动"],
  ["jam-mai-luem", "จำไม่ลืม", "jam mai luem", "难忘", "句型", "感动"],
  ["bpen-rueng-dii-dii", "เป็นเรื่องดี ๆ", "bpen rueang dii dii", "是件美好的事", "句型", "感动"],
  ["naa-buea", "น่าเบื่อ", "naa buea", "无聊；令人厌烦", "形容词", "无聊"],
  ["buea-mak", "เบื่อมาก", "buea maak", "很无聊/很腻", "句型", "无聊"],
  ["mai-mi-arai-tham", "ไม่มีอะไรทำ", "mai mii a-rai tham", "没事可做", "句型", "无聊"],
  ["wang", "ว่าง", "waang", "空闲；有空", "形容词", "无聊"],
  ["wang-goen-bpai", "ว่างเกินไป", "waang goen bpai", "太闲了", "句型", "无聊"],
  ["ruu-suek-buea", "รู้สึกเบื่อ", "ruu suek buea", "觉得无聊", "句型", "无聊"],
  ["tham-arai-dii", "ทำอะไรดี", "tham a-rai dii", "做点什么好呢", "句型", "无聊"],
  ["yaa-yuu-chueai-chueai", "อยู่นิ่ง ๆ", "yuu ning ning", "干待着；静静待着", "短语", "无聊"],
  ["ha-arai-tham", "หาอะไรทำ", "haa a-rai tham", "找点事做", "动词", "无聊"],
  ["buea-rueng-doem", "เบื่อเรื่องเดิม", "buea rueang doem", "厌烦同样的事", "句型", "无聊"],
  ["raw-khoi", "รอคอย", "raaw khaawy", "等待；期待", "动词", "期待"],
  ["khaat-wang", "คาดหวัง", "khaat wang", "期待；期望", "动词", "期待"],
  ["dtuen-dten-thii-ja", "ตื่นเต้นที่จะ", "dteun dten thii ja", "很期待要……", "句型", "期待"],
  ["raw-wan-nii", "รอวันนี้", "raaw wan nii", "期待这一天", "动词", "期待"],
  ["raw-maa-naan", "รอมานาน", "raaw maa naan", "等了很久", "句型", "期待"],
  ["yaak-hen", "อยากเห็น", "yaak hen", "想看到", "动词", "期待"],
  ["yaak-jer", "อยากเจอ", "yaak joe", "想见到", "动词", "期待"],
  ["raw-mai-wai", "รอไม่ไหว", "raaw mai wai", "等不及", "句型", "期待"],
  ["khit-waa-ja-dii", "คิดว่าจะดี", "khit waa ja dii", "觉得会很好", "句型", "期待"],
  ["wang-waa-ja-sam-ret", "หวังว่าจะสำเร็จ", "wang waa ja sam-ret", "希望会成功", "句型", "期待"],
  ["yim", "ยิ้ม", "yim", "笑；微笑", "动词", "反应表达"],
  ["hua-raw", "หัวเราะ", "hua raw", "笑出声", "动词", "反应表达"],
  ["raawng-hai", "ร้องไห้", "raawng hai", "哭", "动词", "反应表达"],
  ["ngiap", "เงียบ", "ngiiap", "安静；沉默", "形容词", "反应表达"],
  ["phuut-mai-awk", "พูดไม่ออก", "phuut mai awk", "说不出话", "句型", "反应表达"],
  ["tham-naa-bplaaek", "ทำหน้าแปลก", "tham naa bplaaek", "表情奇怪", "句型", "反应表达"],
  ["sai-naa", "สีหน้า", "sii naa", "脸色；表情", "名词", "反应表达"],
  ["sadaeng-arom", "แสดงอารมณ์", "sa-daaeng aa-rom", "表达情绪", "动词", "反应表达"],
  ["gep-arom", "เก็บอารมณ์", "gep aa-rom", "控制/收住情绪", "动词", "反应表达"],
  ["phuut-dtrong-dtrong", "พูดตรง ๆ", "phuut dtrong dtrong", "直接说", "动词", "反应表达"],
];

const relatedByTheme: Record<
  BasicFeelingsReactionsTheme,
  { synonym: string; antonym: string; comparison: string; collocation: string }
> = {
  惊讶: {
    synonym: "แปลกใจ / bplaaek jai / 惊讶",
    antonym: "รู้อยู่แล้ว / ruu yuu laew / 早就知道",
    comparison: "ตกใจ 更像被吓一跳，แปลกใจ 更像觉得意外。",
    collocation: "ตกใจมากเพราะไม่คิดว่า / dtok jai maak phraw mai khit waa / 很吃惊，因为没想到",
  },
  尴尬: {
    synonym: "เขิน / khoen / 害羞、尴尬",
    antonym: "สบายใจ / sa-baai jai / 自在安心",
    comparison: "เขิน 偏害羞，อึดอัด 偏不自在、别扭。",
    collocation: "ทำตัวไม่ถูกเวลาเจอคนใหม่ / tham dtua mai thuuk we-laa joe khon mai / 见新朋友时不知所措",
  },
  放心: {
    synonym: "โล่งใจ / loong jai / 松了一口气",
    antonym: "เป็นห่วง / bpen huang / 担心",
    comparison: "สบายใจ 是安心，โล่งใจ 是担心之后松一口气。",
    collocation: "เห็นว่าเรียบร้อยแล้วก็สบายใจ / hen waa riiap raawy laew gaw sa-baai jai / 看到办妥了就放心",
  },
  紧张: {
    synonym: "เครียด / khriiat / 压力大、紧张",
    antonym: "ใจเย็น / jai yen / 冷静",
    comparison: "ตื่นเต้น 可正面兴奋也可紧张，เครียด 更偏压力大。",
    collocation: "ตื่นเต้นก่อนสอบ / dteun dten gaawn saawp / 考试前紧张",
  },
  羡慕: {
    synonym: "อิจฉา / it-chaa / 羡慕、嫉妒",
    antonym: "ดีใจด้วย / dii jai duai / 替你高兴",
    comparison: "อิจฉา 可轻可重，น่าอิจฉา 常是轻松地说令人羡慕。",
    collocation: "เห็นแล้วอิจฉานิดหน่อย / hen laew it-chaa nit noi / 看了有点羡慕",
  },
  烦: {
    synonym: "รำคาญ / ram-khaan / 觉得烦",
    antonym: "สบายใจ / sa-baai jai / 舒心",
    comparison: "เบื่อ 是腻了/无聊，รำคาญ 是被打扰而烦。",
    collocation: "เสียงดังมากจนรำคาญ / siiang dang maak jon ram-khaan / 声音太大所以觉得烦",
  },
  感动: {
    synonym: "ซาบซึ้ง / saap seung / 感动、感激",
    antonym: "ไม่รู้สึกอะไร / mai ruu suek a-rai / 没什么感觉",
    comparison: "ประทับใจ 是留下好印象，ซาบซึ้ง 更像被情意打动。",
    collocation: "ขอบคุณจริง ๆ ฉันซาบซึ้งมาก / khaawp khun jing jing chan saap seung maak / 真的谢谢，我很感动",
  },
  无聊: {
    synonym: "น่าเบื่อ / naa buea / 无聊",
    antonym: "สนุก / sa-nuk / 有趣",
    comparison: "เบื่อ 是自己觉得腻或无聊，น่าเบื่อ 是某事令人无聊。",
    collocation: "ไม่มีอะไรทำเลยรู้สึกเบื่อ / mai mii a-rai tham loei ruu suek buea / 没事做所以觉得无聊",
  },
  期待: {
    synonym: "รอคอย / raaw khaawy / 等待、期待",
    antonym: "ไม่หวัง / mai wang / 不期待",
    comparison: "คาดหวัง 偏期望结果，รอคอย 偏等待某事到来。",
    collocation: "รอคอยวันนี้มานาน / raaw khaawy wan nii maa naan / 期待这一天很久了",
  },
  反应表达: {
    synonym: "แสดงอารมณ์ / sa-daaeng aa-rom / 表达情绪",
    antonym: "เก็บอารมณ์ / gep aa-rom / 收住情绪",
    comparison: "ยิ้ม 是微笑，หัวเราะ 是笑出声，ร้องไห้ 是哭。",
    collocation: "พูดไม่ออกเพราะตกใจ / phuut mai awk phraw dtok jai / 因为吃惊而说不出话",
  },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `เวลาเล่าอารมณ์ของตัวเอง ฉันใช้คำว่า “${row[1]}” เพื่อบอกว่ารู้สึกอย่างไรและตอบสนองอย่างไร`,
  roman: `we-laa lao aa-rom khaawng dtua eng chan chai kham waa "${row[2]}" phuea baawk waa ruu suek yaang rai lae dtaawp-sa-naawng yaang rai`,
  chinese: `描述自己的情绪时，我会用“${row[1]}”来说明感受如何、反应如何。`,
});

const buildCandidate = (row: Row): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];

  return {
    id: row[0],
    headword: row[1],
    romanization: row[2],
    level: "a2",
    partOfSpeech: row[4],
    tags: ["A2", "感受反应", row[5]],
    senses: [
      {
        chinese: row[3],
        usageNotesZh: `A2 感受和反应表达。适合描述惊讶、尴尬、放心、紧张、羡慕、烦、感动、无聊和期待；${related.comparison}`,
        examples: [exampleFor(row)],
      },
    ],
    synonyms: [related.synonym],
    antonyms: [related.antonym],
    comparisons: [related.comparison],
    collocations: [related.collocation],
    sources: BASIC_FEELINGS_REACTIONS_REFS,
  };
};

export const VOCABULARY_EXPANSION_A2_BASIC_FEELINGS_REACTIONS_02: VocabularyExpansionCandidate[] =
  rows.map(buildCandidate);
