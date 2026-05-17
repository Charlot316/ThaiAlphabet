type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "更合适" | "更方便" | "差不多" | "比不上" | "哪个更好" | "选错更换" | "换方案" | "决定犹豫";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2SimpleComparisonsChoices03Candidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-a2-simple-comparisons-choices-03", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `ก่อนตัดสินใจ ฉันใช้คำว่า${row.thai}เพื่อเปรียบเทียบตัวเลือก`,
    roman: `gaawn dtat-sin-jai chan chai kham waa ${row.roman} phuea bpriap-thiiap dtua-leuak`,
    chinese: `决定前，我用“${row.chinese}”来比较选择。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2SimpleComparisonsChoices03Candidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于在两个或多个日常选项之间做简单比较。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 侧重“${row.chinese}”；${related.thai} 侧重“${related.chinese}”，比较时注意形容词或选择对象。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批用于 A2 比较选择补漏，覆盖更合适、更方便、差不多、不如、选错和换方案。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
maw-gwaa|เหมาะกว่า|maw gwaa|更合适|短语|更合适|合适
maw-sut|เหมาะสุด|maw sut|最合适|短语|更合适|合适
maw-gap-chan-gwaa|เหมาะกับฉันกว่า|maw gap chan gwaa|更适合我|短语|更合适|合适
maw-gap-welaa-gwaa|เหมาะกับเวลากว่า|maw gap wee-laa gwaa|时间上更合适|短语|更合适|时间
maw-gap-ngan-gwaa|เหมาะกับงานกว่า|maw gap ngaan gwaa|更适合这件事|短语|更合适|工作
maw-gap-dek-gwaa|เหมาะกับเด็กกว่า|maw gap dek gwaa|更适合孩子|短语|更合适|对象
maw-gap-phuu-yai-gwaa|เหมาะกับผู้ใหญ่กว่า|maw gap phuu-yai gwaa|更适合大人|短语|更合适|对象
dii-gwaa|ดีกว่า|dii gwaa|更好|短语|更合适|评价
dii-sut|ดีที่สุด|dii sut|最好|短语|更合适|评价
dii-phaw-laeo|ดีพอแล้ว|dii phaaw laeo|已经够好了|短语|更合适|程度
mai-dii-phaw|ไม่ดีพอ|mai dii phaaw|不够好|短语|比不上|程度
sabai-gwaa|สบายกว่า|sa-baai gwaa|更舒服|短语|更合适|感受
bplot-phai-gwaa|ปลอดภัยกว่า|bplaawt-phai gwaa|更安全|短语|更合适|安全
sa-aat-gwaa|สะอาดกว่า|sa-aat gwaa|更干净|短语|更合适|状态
riap-roi-gwaa|เรียบร้อยกว่า|riiap-raawy gwaa|更整齐|短语|更合适|状态
chat-gwaa|ชัดกว่า|chat gwaa|更清楚|短语|更合适|清楚
ngai-gwaa|ง่ายกว่า|ngaai gwaa|更容易|短语|更方便|难易
yaak-gwaa|ยากกว่า|yaak gwaa|更难|短语|更方便|难易
sa-duak-gwaa|สะดวกกว่า|sa-duak gwaa|更方便|短语|更方便|方便
mai-sa-duak-thao|ไม่สะดวกเท่า|mai sa-duak thao|没有那么方便|短语|比不上|方便
sa-duak-sut|สะดวกสุด|sa-duak sut|最方便|短语|更方便|方便
reo-gwaa|เร็วกว่า|reo gwaa|更快|短语|更方便|速度
chaa-gwaa|ช้ากว่า|chaa gwaa|更慢|短语|更方便|速度
reo-sut|เร็วสุด|reo sut|最快|短语|更方便|速度
mai-reo-thao|ไม่เร็วเท่า|mai reo thao|没有那么快|短语|比不上|速度
thuuk-gwaa|ถูกกว่า|thuuk gwaa|更便宜|短语|更方便|价格
phaeng-gwaa|แพงกว่า|phaeng gwaa|更贵|短语|更方便|价格
thuuk-sut|ถูกสุด|thuuk sut|最便宜|短语|更方便|价格
phaeng-sut|แพงสุด|phaeng sut|最贵|短语|更方便|价格
mai-thuuk-thao|ไม่ถูกเท่า|mai thuuk thao|没有那么便宜|短语|比不上|价格
khum-gwaa|คุ้มกว่า|khum gwaa|更划算|短语|更方便|价值
khum-sut|คุ้มสุด|khum sut|最划算|短语|更方便|价值
mai-khum|ไม่คุ้ม|mai khum|不划算|短语|比不上|价值
mai-khum-thao|ไม่คุ้มเท่า|mai khum thao|没那么划算|短语|比不上|价值
khum-gwaa-mai|คุ้มกว่าไหม|khum gwaa mai|更划算吗|短语|哪个更好|价值
dii-gwaa-mai|ดีกว่าไหม|dii gwaa mai|更好吗|短语|哪个更好|询问
an-nai-dii-gwaa|อันไหนดีกว่า|an nai dii gwaa|哪个更好|短语|哪个更好|询问
baep-nai-dii-gwaa|แบบไหนดีกว่า|baaep nai dii gwaa|哪种更好|短语|哪个更好|询问
thii-nai-dii-gwaa|ที่ไหนดีกว่า|thii nai dii gwaa|哪里更好|短语|哪个更好|询问
wan-nai-dii-gwaa|วันไหนดีกว่า|wan nai dii gwaa|哪天更好|短语|哪个更好|询问
welaa-nai-dii-gwaa|เวลาไหนดีกว่า|wee-laa nai dii gwaa|哪个时间更好|短语|哪个更好|时间
leuak-an-nai|เลือกอันไหน|leuak an nai|选哪个|短语|哪个更好|选择
leuak-baep-nai|เลือกแบบไหน|leuak baaep nai|选哪种|短语|哪个更好|选择
ao-an-nii-dii-mai|เอาอันนี้ดีไหม|ao an nii dii mai|要这个好吗|短语|哪个更好|选择
ao-an-nan-dii-mai|เอาอันนั้นดีไหม|ao an nan dii mai|要那个好吗|短语|哪个更好|选择
ao-baep-nii|เอาแบบนี้|ao baaep nii|要这种|短语|哪个更好|选择
ao-baep-nan|เอาแบบนั้น|ao baaep nan|要那种|短语|哪个更好|选择
ao-sii-nii|เอาสีนี้|ao sii nii|要这个颜色|短语|哪个更好|颜色
ao-khanaat-nii|เอาขนาดนี้|ao kha-naat nii|要这个尺寸|短语|哪个更好|尺寸
yai-gwaa|ใหญ่กว่า|yai gwaa|更大|短语|更合适|尺寸
lek-gwaa|เล็กกว่า|lek gwaa|更小|短语|更合适|尺寸
yai-bpai|ใหญ่ไป|yai bpai|太大|短语|比不上|尺寸
lek-bpai|เล็กไป|lek bpai|太小|短语|比不上|尺寸
san-gwaa|สั้นกว่า|san gwaa|更短|短语|更合适|长度
yaao-gwaa|ยาวกว่า|yaao gwaa|更长|短语|更合适|长度
san-bpai|สั้นไป|san bpai|太短|短语|比不上|长度
yaao-bpai|ยาวไป|yaao bpai|太长|短语|比不上|长度
bao-gwaa|เบากว่า|bao gwaa|更轻|短语|更方便|重量
nak-gwaa|หนักกว่า|nak gwaa|更重|短语|更方便|重量
bao-bpai|เบาไป|bao bpai|太轻|短语|比不上|重量
nak-bpai|หนักไป|nak bpai|太重|短语|比不上|重量
glai-gwaa|ใกล้กว่า|glai gwaa|更近|短语|更方便|距离
glai-sut|ใกล้สุด|glai sut|最近|短语|更方便|距离
glai-gwaa-far|ไกลกว่า|glai gwaa|更远|短语|更方便|距离
glai-goen-bpai|ไกลเกินไป|glai goen bpai|太远|短语|比不上|距离
mai-glai-thao|ไม่ใกล้เท่า|mai glai thao|没有那么近|短语|比不上|距离
yen-gwaa|เย็นกว่า|yen gwaa|更凉|短语|更合适|温度
raawn-gwaa|ร้อนกว่า|raawn gwaa|更热|短语|更合适|温度
yen-bpai|เย็นไป|yen bpai|太凉|短语|比不上|温度
raawn-bpai|ร้อนไป|raawn bpai|太热|短语|比不上|温度
mai-dtaang-gan|ไม่ต่างกัน|mai dtaang gan|没区别|短语|差不多|相似
phaw-phaw-gan|พอ ๆ กัน|phaaw phaaw gan|差不多一样|短语|差不多|相似
klai-khiang-gan|ใกล้เคียงกัน|glai-khiiang gan|很接近|短语|差不多|相似
geuap-meuan|เกือบเหมือน|geuap meuan|几乎一样|短语|差不多|相似
meuan-gan-geuap-mot|เหมือนกันเกือบหมด|meuan gan geuap mot|几乎都一样|短语|差不多|相似
dtaang-gan-nit-noi|ต่างกันนิดหน่อย|dtaang gan nit naawy|有一点不同|短语|差不多|相似
mai-khoi-dtaang|ไม่ค่อยต่าง|mai khaawy dtaang|不太不同|短语|差不多|相似
klai-gan|คล้ายกัน|khlaai gan|相似|短语|差不多|相似
meuan-gan|เหมือนกัน|meuan gan|一样|短语|差不多|相似
mai-meuan-gan|ไม่เหมือนกัน|mai meuan gan|不一样|短语|差不多|相似
suu-mai-dai|สู้ไม่ได้|suu mai dai|比不上|短语|比不上|比较
thiiap-mai-dai|เทียบไม่ได้|thiiap mai dai|不能相比|短语|比不上|比较
mai-dii-thao|ไม่ดีเท่า|mai dii thao|没有那么好|短语|比不上|评价
mai-sabai-thao|ไม่สบายเท่า|mai sa-baai thao|没那么舒服|短语|比不上|感受
mai-sa-aat-thao|ไม่สะอาดเท่า|mai sa-aat thao|没那么干净|短语|比不上|状态
mai-chat-thao|ไม่ชัดเท่า|mai chat thao|没那么清楚|短语|比不上|清楚
leuak-phit|เลือกผิด|leuak phit|选错了|短语|选错更换|错误
seu-phit|ซื้อผิด|seu phit|买错了|短语|选错更换|错误
jaawng-phit|จองผิด|jaawng phit|订错了|短语|选错更换|错误
khit-phit|คิดผิด|khit phit|想错了|短语|选错更换|错误
dtat-sin-jai-phit|ตัดสินใจผิด|dtat-sin-jai phit|决定错了|短语|选错更换|错误
leuak-thuuk|เลือกถูก|leuak thuuk|选对了|短语|选错更换|正确
leuak-mai|เลือกใหม่|leuak mai|重新选|动词|选错更换|更换
bplian-dtua-leuak|เปลี่ยนตัวเลือก|bplian dtua-leuak|更换选项|动词|选错更换|更换
bplian-phaen|เปลี่ยนแผน|bplian phaaen|换计划|动词|换方案|计划
bplian-baep|เปลี่ยนแบบ|bplian baaep|换款式|动词|换方案|更换
bplian-withi|เปลี่ยนวิธี|bplian wi-thii|换方法|动词|换方案|方法
bplian-pen-an-uen|เปลี่ยนเป็นอันอื่น|bplian bpen an uen|换成别的|动词|换方案|更换
yok-loek-phaen-doem|ยกเลิกแผนเดิม|yok-loek phaaen doem|取消原计划|短语|换方案|计划
chai-phaen-mai|ใช้แผนใหม่|chai phaaen mai|用新计划|短语|换方案|计划
phaen-sam-rawng|แผนสำรอง|phaaen sam-raawng|备用计划|名词|换方案|计划
thaang-leuak-uen|ทางเลือกอื่น|thaang-leuak uen|其他选择|名词|换方案|选择
dtua-leuak-raek|ตัวเลือกแรก|dtua-leuak raaek|第一个选项|名词|决定犹豫|选择
dtua-leuak-thii-saawng|ตัวเลือกที่สอง|dtua-leuak thii saawng|第二个选项|名词|决定犹豫|选择
dtua-leuak-sut-thaai|ตัวเลือกสุดท้าย|dtua-leuak sut-thaai|最后一个选项|名词|决定犹豫|选择
yang-leuak-mai-dai|ยังเลือกไม่ได้|yang leuak mai dai|还选不了|短语|决定犹豫|犹豫
leuak-yaak|เลือกยาก|leuak yaak|很难选|短语|决定犹豫|犹豫
dtat-sin-jai-yaak|ตัดสินใจยาก|dtat-sin-jai yaak|很难决定|短语|决定犹豫|犹豫
dtong-khit-gaawn|ต้องคิดก่อน|dtawng khit gaawn|得先想想|短语|决定犹豫|思考
khaaw-khit-gaawn|ขอคิดก่อน|khaaw khit gaawn|让我先想想|短语|决定犹豫|思考
laawng-thiiap-gaawn|ลองเทียบก่อน|laawng thiiap gaawn|先比较看看|短语|决定犹豫|比较
thiiap-raa-khaa|เทียบราคา|thiiap raa-khaa|比较价格|动词|决定犹豫|比较
thiiap-welaa|เทียบเวลา|thiiap wee-laa|比较时间|动词|决定犹豫|比较
thiiap-ra-ya-thaang|เทียบระยะทาง|thiiap ra-ya-thaang|比较距离|动词|决定犹豫|比较
thiiap-khanaat|เทียบขนาด|thiiap kha-naat|比较尺寸|动词|决定犹豫|比较
thiiap-khun-na-phap|เทียบคุณภาพ|thiiap khun-na-phap|比较质量|动词|决定犹豫|比较
`;

export const VOCABULARY_EXPANSION_A2_SIMPLE_COMPARISONS_CHOICES_03: VocabularyExpansionA2SimpleComparisonsChoices03Candidate[] = parseRows(RAW_ROWS).map(buildCandidate);
