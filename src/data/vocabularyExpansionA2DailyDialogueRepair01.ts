type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "没听懂" | "说错纠正" | "重新解释" | "换种说法" | "确认意思" | "避免误会" | "请求重复" | "礼貌修复";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2DailyDialogueRepairCandidate = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: PartOfSpeech;
  theme: Theme;
  level: "a2";
  priority: number;
  senses: Sense[];
  synonyms: Related[];
  antonyms: Related[];
  comparisons: Comparison[];
  collocations: Collocation[];
  usageNotesZh: string[];
  tags: string[];
  sourceRefs: string[];
  reviewStatus: "candidate-draft";
};

type Row = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: PartOfSpeech; theme: Theme; tag: string };
const SOURCE_REFS = ["thai-frequency", "thai-a2-daily-dialogue-repair", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `เวลาคุยกัน ฉันใช้คำว่า${row.thai}เพื่อแก้ความเข้าใจผิด`,
    roman: `wee-laa khui gan chan chai kham waa ${row.roman} phuea gae khwaam khao-jai phit`,
    chinese: `聊天时，我用“${row.chinese}”来修正误会。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2DailyDialogueRepairCandidate {
  const related = rows[(index + 1) % rows.length];
  return {
    id: row.id,
    thai: row.thai,
    roman: row.roman,
    chinese: row.chinese,
    partOfSpeech: row.partOfSpeech,
    theme: row.theme,
    level: "a2",
    priority: index + 1,
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 适合在日常对话中修正、确认或请求对方再说明。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 偏“${row.chinese}”；${related.thai} 偏“${related.chinese}”，可按对话卡住的位置选择。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批用于 A2 对话修复，重点是没听懂、说错、换说法、确认意思和避免误会。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
mai-khao-jai|ไม่เข้าใจ|mai khao-jai|没听懂|短语|没听懂|理解
yang-mai-khao-jai|ยังไม่เข้าใจ|yang mai khao-jai|还没明白|短语|没听懂|理解
khao-jai-nit-noi|เข้าใจนิดหน่อย|khao-jai nit naawy|懂一点点|短语|没听懂|理解
khao-jai-maak-kheun|เข้าใจมากขึ้น|khao-jai maak kheun|更明白了|短语|没听懂|理解
fang-mai-than|ฟังไม่ทัน|fang mai than|没听跟上|短语|没听懂|听
fang-mai-khoi-than|ฟังไม่ค่อยทัน|fang mai khaawy than|有点跟不上听|短语|没听懂|听
dai-yin-mai-chat|ได้ยินไม่ชัด|dai-yin mai chat|听不清楚|短语|没听懂|听
siiang-mai-chat|เสียงไม่ชัด|siiang mai chat|声音不清楚|短语|没听懂|听
siiang-khaat-khaat|เสียงขาด ๆ|siiang khaat khaat|声音断断续续|短语|没听懂|听
phuut-reo-goen-bpai|พูดเร็วเกินไป|phuut reo goen bpai|说得太快|短语|没听懂|速度
phuut-chaa-noi|พูดช้าหน่อย|phuut chaa naawy|请说慢一点|短语|请求重复|速度
phuut-dang-noi|พูดดังหน่อย|phuut dang naawy|请说大声一点|短语|请求重复|音量
phuut-hai-chat|พูดให้ชัด|phuut hai chat|说清楚一点|短语|请求重复|清楚
baawk-iik-thii|บอกอีกที|baawk iik thii|再说一遍|短语|请求重复|重复
phuut-iik-thii|พูดอีกที|phuut iik thii|再讲一次|短语|请求重复|重复
tham-iik-thii|ทำอีกที|tham iik thii|再做一次|短语|请求重复|重复
song-iik-thii|ส่งอีกที|song iik thii|再发一次|短语|请求重复|信息
khian-iik-thii|เขียนอีกที|khiian iik thii|再写一次|短语|请求重复|文字
khaaw-fang-iik-khrang|ขอฟังอีกครั้ง|khaaw fang iik khrang|我想再听一次|短语|请求重复|礼貌
khaaw-thaam-iik-khrang|ขอถามอีกครั้ง|khaaw thaam iik khrang|我想再问一次|短语|请求重复|礼貌
khaaw-duu-iik-thii|ขอดูอีกที|khaaw duu iik thii|请让我再看一次|短语|请求重复|礼貌
khaaw-khian-hai-duu|ขอเขียนให้ดู|khaaw khiian hai duu|请写给我看|短语|请求重复|文字
khaaw-song-khaaw-khwaam-iik|ขอส่งข้อความอีก|khaaw song khaaw-khwaam iik|请再发消息|短语|请求重复|信息
kham-nii-waa-arai|คำนี้ว่าอะไร|kham nii waa a-rai|这个词怎么说|短语|没听懂|词语
plae-waa-arai|แปลว่าอะไร|bplae waa a-rai|是什么意思|短语|没听懂|词义
kham-nii-plae-waa-arai|คำนี้แปลว่าอะไร|kham nii bplae waa a-rai|这个词是什么意思|短语|没听懂|词义
mai-ruu-kham-nii|ไม่รู้คำนี้|mai ruu kham nii|不认识这个词|短语|没听懂|词语
chai-kham-nii-dai-mai|ใช้คำนี้ได้ไหม|chai kham nii dai mai|可以用这个词吗|短语|确认意思|词语
chai-kham-ngai|ใช้คำง่าย|chai kham ngaai|用简单词|短语|换种说法|词语
phuut-ngai-ngai|พูดง่าย ๆ|phuut ngaai ngaai|简单地说|短语|换种说法|表达
phuut-iik-baep|พูดอีกแบบ|phuut iik baaep|换一种说法|短语|换种说法|表达
phuut-baep-uen|พูดแบบอื่น|phuut baaep uen|用别的说法说|短语|换种说法|表达
chai-kham-uen|ใช้คำอื่น|chai kham uen|用别的词|短语|换种说法|词语
bplian-kham|เปลี่ยนคำ|bplian kham|换个词|动词|换种说法|词语
a-thi-baai-iik-khrang|อธิบายอีกครั้ง|a-thi-baai iik khrang|再解释一次|短语|重新解释|解释
a-thi-baai-ngai-ngai|อธิบายง่าย ๆ|a-thi-baai ngaai ngaai|简单解释|短语|重新解释|解释
a-thi-baai-chaa-chaa|อธิบายช้า ๆ|a-thi-baai chaa chaa|慢慢解释|短语|重新解释|解释
a-thi-baai-san-san|อธิบายสั้น ๆ|a-thi-baai san san|简短解释|短语|重新解释|解释
baawk-hai-chat|บอกให้ชัด|baawk hai chat|说清楚|短语|重新解释|清楚
baawk-tem-prayok|บอกเต็มประโยค|baawk dtem bpra-yook|说完整句子|短语|重新解释|句子
phuut-tem-prayok|พูดเต็มประโยค|phuut dtem bpra-yook|讲完整句子|短语|重新解释|句子
yok-tua-yaang|ยกตัวอย่าง|yok dtua-yaang|举例子|动词|重新解释|例子
khaaw-tua-yaang|ขอตัวอย่าง|khaaw dtua-yaang|请给例子|短语|重新解释|例子
tua-yaang-ngai|ตัวอย่างไง|dtua-yaang ngai|例子是什么样|短语|重新解释|例子
phuut-phit|พูดผิด|phuut phit|说错了|短语|说错纠正|错误
phuut-phit-kham|พูดผิดคำ|phuut phit kham|说错词|短语|说错纠正|错误
phuut-phit-cheu|พูดผิดชื่อ|phuut phit cheu|说错名字|短语|说错纠正|错误
phuut-phit-wan|พูดผิดวัน|phuut phit wan|说错日期|短语|说错纠正|错误
khian-phit|เขียนผิด|khiian phit|写错了|短语|说错纠正|文字
aan-phit|อ่านผิด|aan phit|读错了|短语|说错纠正|读
song-phit|ส่งผิด|song phit|发错了|短语|说错纠正|信息
yip-phit|หยิบผิด|yip phit|拿错了|短语|说错纠正|错误
khaaw-gae-kham|ขอแก้คำ|khaaw gae kham|我改一下词|短语|说错纠正|纠正
khaaw-gae-mai|ขอแก้ใหม่|khaaw gae mai|我重新改一下|短语|说错纠正|纠正
khaaw-phuut-mai|ขอพูดใหม่|khaaw phuut mai|我重新说|短语|说错纠正|纠正
khaaw-khian-mai|ขอเขียนใหม่|khaaw khiian mai|我重新写|短语|说错纠正|纠正
meua-kii-phuut-phit|เมื่อกี้พูดผิด|meua-gii phuut phit|刚才说错了|短语|说错纠正|纠正
meua-kii-khian-phit|เมื่อกี้เขียนผิด|meua-gii khiian phit|刚才写错了|短语|说错纠正|纠正
khwam-maai-kheu|ความหมายคือ|khwaam-maai kheu|意思是|短语|确认意思|意思
khun-maai-thueng|คุณหมายถึง|khun maai-theung|你的意思是|短语|确认意思|意思
maai-thueng-baep-nii|หมายถึงแบบนี้|maai-theung baaep nii|意思是这样|短语|确认意思|意思
chai-mai|ใช่ไหม|chai mai|是吗|短语|确认意思|确认
chai-ruue-mai|ใช่หรือไม่|chai rue mai|是不是|短语|确认意思|确认
mai-chai-yaa|ไม่ใช่เหรอ|mai chai roe|不是吗|短语|确认意思|确认
yang-ngai-na|ยังไงนะ|yang ngai na|是怎样来着|短语|确认意思|确认
arai-na|อะไรนะ|a-rai na|什么来着|短语|确认意思|确认
dtok-long-kheu|ตกลงคือ|dtok-long kheu|所以就是|短语|确认意思|总结
sarup-wa|สรุปว่า|sa-rup waa|总结是|短语|确认意思|总结
khaaw-sarup|ขอสรุป|khaaw sa-rup|我总结一下|短语|确认意思|总结
khao-jai-wa|เข้าใจว่า|khao-jai waa|我理解为|短语|确认意思|理解
khao-jai-thuuk-mai|เข้าใจถูกไหม|khao-jai thuuk mai|我理解得对吗|短语|确认意思|理解
khao-jai-phit|เข้าใจผิด|khao-jai phit|理解错|短语|避免误会|误会
mai-trong-gan|ไม่ตรงกัน|mai dtrong gan|不一致|短语|避免误会|误会
khwam-khao-jai-trong-gan|ความเข้าใจตรงกัน|khwaam khao-jai dtrong gan|理解一致|短语|避免误会|确认
khaaw-yeun-yan|ขอยืนยัน|khaaw yeun-yan|请确认|短语|确认意思|确认
yeun-yan-iik-thii|ยืนยันอีกที|yeun-yan iik thii|再确认一次|短语|确认意思|确认
phuea-mai-hai-khao-jai-phit|เพื่อไม่ให้เข้าใจผิด|phuea mai hai khao-jai phit|为了不误会|短语|避免误会|误会
yaa-khao-jai-phit|อย่าเข้าใจผิด|yaa khao-jai phit|别误会|短语|避免误会|误会
mai-dai-maai-thueng-baep-nan|ไม่ได้หมายถึงแบบนั้น|mai dai maai-theung baaep nan|不是那个意思|短语|避免误会|意思
chan-maai-thueng|ฉันหมายถึง|chan maai-theung|我的意思是|短语|避免误会|意思
maai-thueng-khon-nii|หมายถึงคนนี้|maai-theung khon nii|指这个人|短语|避免误会|指代
maai-thueng-an-nii|หมายถึงอันนี้|maai-theung an nii|指这个东西|短语|避免误会|指代
maai-thueng-thii-nii|หมายถึงที่นี่|maai-theung thii nii|指这里|短语|避免误会|指代
khaaw-thoot-thii-phuut-phit|ขอโทษที่พูดผิด|khaaw-thoot thii phuut phit|抱歉我说错了|短语|礼貌修复|道歉
khaaw-thoot-thii-khao-jai-phit|ขอโทษที่เข้าใจผิด|khaaw-thoot thii khao-jai phit|抱歉我理解错了|短语|礼貌修复|道歉
khaaw-thoot-thii-song-phit|ขอโทษที่ส่งผิด|khaaw-thoot thii song phit|抱歉我发错了|短语|礼貌修复|道歉
mai-pen-rai|ไม่เป็นไร|mai bpen rai|没关系|短语|礼貌修复|回应
khop-khun-thii-a-thi-baai|ขอบคุณที่อธิบาย|khaawp-khun thii a-thi-baai|谢谢你解释|短语|礼貌修复|感谢
khop-khun-thii-baawk|ขอบคุณที่บอก|khaawp-khun thii baawk|谢谢你告诉我|短语|礼貌修复|感谢
fang-khao-jai-laeo|ฟังเข้าใจแล้ว|fang khao-jai laeo|已经听懂了|短语|礼貌修复|理解
khao-jai-laeo|เข้าใจแล้ว|khao-jai laeo|明白了|短语|礼貌修复|理解
yang-ngong-yuu|ยังงงอยู่|yang ngong yuu|还糊涂着|短语|没听懂|理解
ngong-nit-noi|งงนิดหน่อย|ngong nit naawy|有点糊涂|短语|没听懂|理解
mai-khoi-nae-jai|ไม่ค่อยแน่ใจ|mai khaawy nae-jai|不太确定|短语|确认意思|确认
nae-jai-laeo|แน่ใจแล้ว|nae-jai laeo|已经确定了|短语|确认意思|确认
phuut-thuk-mai|พูดถูกไหม|phuut thuuk mai|说得对吗|短语|确认意思|正确
khian-thuk-mai|เขียนถูกไหม|khiian thuuk mai|写得对吗|短语|确认意思|正确
cheu-nii-thuk-mai|ชื่อนี้ถูกไหม|cheu nii thuuk mai|这个名字对吗|短语|确认意思|正确
wan-nii-thuk-mai|วันนี้ถูกไหม|wan nii thuuk mai|这个日期对吗|短语|确认意思|正确
wen-wak-noi|เว้นวรรคหน่อย|wen-wak naawy|请空格一下|短语|重新解释|文字
dtit-sap|ติดศัพท์|dtit sap|卡在词上|短语|没听懂|词语
kham-sap-mai-khun|คำศัพท์ไม่คุ้น|kham-sap mai khun|词不熟|短语|没听懂|词语
kham-sap-ngaai|คำศัพท์ง่าย|kham-sap ngaai|简单词汇|名词|换种说法|词语
kham-sap-yak|คำศัพท์ยาก|kham-sap yaak|难词|名词|换种说法|词语
phasa-thai-yang-mai-keng|ภาษาไทยยังไม่เก่ง|phaa-saa thai yang mai geng|泰语还不太好|短语|礼貌修复|说明
phuut-thai-mai-keng|พูดไทยไม่เก่ง|phuut thai mai geng|泰语说得不好|短语|礼貌修复|说明
chuai-phuut-chaa|ช่วยพูดช้า|chuai phuut chaa|请帮忙说慢点|短语|请求重复|礼貌
chuai-khian-pen-thai|ช่วยเขียนเป็นไทย|chuai khiian bpen thai|请写成泰语|短语|请求重复|文字
mai-dtong-riip|ไม่ต้องรีบ|mai dtawng riip|不用急|短语|礼貌修复|语气
ao-mai|เอาใหม่|ao mai|重新来一次|短语|说错纠正|重来
rop-guan-sarup|รบกวนสรุป|rop-guan sa-rup|麻烦总结一下|短语|礼貌修复|请求
`;

export const VOCABULARY_EXPANSION_A2_DAILY_DIALOGUE_REPAIR_01: VocabularyExpansionA2DailyDialogueRepairCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
