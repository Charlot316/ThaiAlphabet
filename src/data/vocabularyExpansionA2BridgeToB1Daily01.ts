type PartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语";
type Theme = "因果" | "安排" | "解释" | "建议" | "协商" | "意见" | "条件" | "轻度让步";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2BridgeToB1DailyCandidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-a2-bridge-to-b1-daily-01", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `เมื่ออยากอธิบายให้ชัดขึ้น ฉันใช้คำว่า${row.thai}ได้`,
    roman: `muea yaak a-thi-baai hai chat kheun chan chai kham waa ${row.roman} dai`,
    chinese: `想解释得更清楚时，我可以使用“${row.chinese}”。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2BridgeToB1DailyCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 是 A2 到 B1 过渡阶段可先掌握的日常表达。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "用法", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表达“${row.chinese}”；${related.thai} 表达“${related.chinese}”，都可用于稍复杂的日常说明。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批是 A2 到 B1 的日常过渡表达，稍微加强因果、安排、解释、建议和轻度协商，但仍保持基础可用。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
phraw-het-nii|เพราะเหตุนี้|phraw heet nii|因为这个原因|短语|因果|原因
phraw-ruueang-nii|เพราะเรื่องนี้|phraw rueang nii|因为这件事|短语|因果|原因
phraw-welaa-mai-phaw|เพราะเวลาไม่พอ|phraw wee-laa mai phaaw|因为时间不够|短语|因果|原因
phraw-khaawng-mai-phaw|เพราะของไม่พอ|phraw khaawng mai phaaw|因为东西不够|短语|因果|原因
phraw-khon-mai-phaw|เพราะคนไม่พอ|phraw khon mai phaaw|因为人手不够|短语|因果|原因
phraw-khaaw-mun-mai-khrop|เพราะข้อมูลไม่ครบ|phraw khaaw-muun mai khrop|因为资料不完整|短语|因果|原因
phraw-yang-mai-phrom|เพราะยังไม่พร้อม|phraw yang mai phraawm|因为还没准备好|短语|因果|原因
phraw-dtong-raw|เพราะต้องรอ|phraw dtawng raaw|因为需要等|短语|因果|原因
phraw-dtong-check|เพราะต้องเช็ก|phraw dtawng chek|因为需要检查|短语|因果|原因
phraw-dtong-dtriiam|เพราะต้องเตรียม|phraw dtawng dtriiam|因为需要准备|短语|因果|原因
loei-cha-long|เลยช้าลง|loei chaa long|所以慢了下来|短语|因果|结果
loei-dtong-leuan|เลยต้องเลื่อน|loei dtawng leuan|所以必须改期|短语|因果|结果
loei-dtong-plian|เลยต้องเปลี่ยน|loei dtawng bplian|所以必须更换|短语|因果|结果
loei-dtong-raw-gaawn|เลยต้องรอก่อน|loei dtawng raaw gaawn|所以得先等|短语|因果|结果
loei-yang-mai-set|เลยยังไม่เสร็จ|loei yang mai set|所以还没完成|短语|因果|结果
loei-mai-than|เลยไม่ทัน|loei mai than|所以来不及|短语|因果|结果
loei-mai-saduak|เลยไม่สะดวก|loei mai sa-duak|所以不方便|短语|因果|结果
loei-khaaw-plian|เลยขอเปลี่ยน|loei khaaw bplian|所以想更改|短语|因果|结果
tham-hai-dii-kheun|ทำให้ดีขึ้น|tham hai dii kheun|让它变好|短语|因果|结果
tham-hai-sa-duak-kheun|ทำให้สะดวกขึ้น|tham hai sa-duak kheun|让它更方便|短语|因果|结果
tham-hai-khao-jai-ngai-kheun|ทำให้เข้าใจง่ายขึ้น|tham hai khao-jai ngaai kheun|让它更容易懂|短语|因果|结果
tham-hai-prayat-welaa|ทำให้ประหยัดเวลา|tham hai bpra-yat wee-laa|节省时间|短语|因果|结果
tham-hai-sia-welaa|ทำให้เสียเวลา|tham hai siia wee-laa|浪费时间|短语|因果|结果
tham-hai-sapson|ทำให้สับสน|tham hai sap-son|让人混乱|短语|因果|结果
tham-hai-khao-jai-phit|ทำให้เข้าใจผิด|tham hai khao-jai phit|造成误会|短语|因果|结果
jad-welaa-mai|จัดเวลาใหม่|jat wee-laa mai|重新安排时间|动词|安排|时间
jad-khon-mai|จัดคนใหม่|jat khon mai|重新安排人员|动词|安排|人员
jad-khaawng-mai|จัดของใหม่|jat khaawng mai|重新整理东西|动词|安排|物品
jad-lam-dap|จัดลำดับ|jat lam-dap|安排顺序|动词|安排|顺序
lam-dap-raek|ลำดับแรก|lam-dap raaek|第一步|名词|安排|顺序
lam-dap-that-bpai|ลำดับถัดไป|lam-dap that bpai|下一步|名词|安排|顺序
khan-dtaawn-raek|ขั้นตอนแรก|khan-dtaawn raaek|第一个步骤|名词|安排|步骤
khan-dtaawn-that-bpai|ขั้นตอนถัดไป|khan-dtaawn that bpai|下一步骤|名词|安排|步骤
baeng-pen-saam-suan|แบ่งเป็นสามส่วน|baeng bpen saam suan|分成三部分|短语|安排|分配
baeng-pen-song-khrang|แบ่งเป็นสองครั้ง|baeng bpen saawng khrang|分成两次|短语|安排|分配
tham-pen-khrueng|ทำเป็นครึ่ง|tham bpen khreung|做一半|短语|安排|进度
tham-pen-suan-suan|ทำเป็นส่วน ๆ|tham bpen suan suan|分部分做|短语|安排|进度
dtriiam-luang-naa|เตรียมล่วงหน้า|dtriiam luang-naa|提前准备|动词|安排|准备
baawk-luang-naa|บอกล่วงหน้า|baawk luang-naa|提前告知|动词|安排|通知
nat-luang-naa|นัดล่วงหน้า|nat luang-naa|提前预约|动词|安排|预约
tham-luang-naa|ทำล่วงหน้า|tham luang-naa|提前做|动词|安排|准备
gan-welaa-wai|กันเวลาไว้|gan wee-laa wai|预留时间|动词|安排|时间
gan-thii-wai|กันที่ไว้|gan thii wai|预留位置|动词|安排|位置
gan-khaawng-wai|กันของไว้|gan khaawng wai|预留物品|动词|安排|物品
jam-bpen-dtong|จำเป็นต้อง|jam-bpen dtawng|有必要必须|短语|解释|必要
mai-jam-bpen-dtong|ไม่จำเป็นต้อง|mai jam-bpen dtawng|没必要必须|短语|解释|必要
jam-bpen-samrap|จำเป็นสำหรับ|jam-bpen sam-rap|对……有必要|短语|解释|必要
mai-jam-bpen-samrap|ไม่จำเป็นสำหรับ|mai jam-bpen sam-rap|对……没必要|短语|解释|必要
mi-het-phon|มีเหตุผล|mii heet-phon|有理由；合理|短语|解释|理由
mai-mi-het-phon|ไม่มีเหตุผล|mai mii heet-phon|没有理由；不合理|短语|解释|理由
het-phon-samkhan|เหตุผลสำคัญ|heet-phon sam-khan|重要原因|名词|解释|理由
het-phon-ngai-ngai|เหตุผลง่าย ๆ|heet-phon ngaai ngaai|简单原因|名词|解释|理由
ruueang-samkhan-kheu|เรื่องสำคัญคือ|rueang sam-khan kheu|重要的是|短语|解释|重点
jut-samkhan-kheu|จุดสำคัญคือ|jut sam-khan kheu|重点是|短语|解释|重点
sing-thii-dtong-ruu|สิ่งที่ต้องรู้|sing thii dtawng ruu|需要知道的事|名词|解释|重点
sing-thii-dtong-tham|สิ่งที่ต้องทำ|sing thii dtawng tham|需要做的事|名词|解释|重点
sing-thii-khuan-raw|สิ่งที่ควรรอ|sing thii khuan raaw|应该等待的事|名词|解释|重点
sing-thii-khuan-check|สิ่งที่ควรเช็ก|sing thii khuan chek|应该检查的事|名词|解释|重点
naae-nam-hai-tham|แนะนำให้ทำ|nae-nam hai tham|建议去做|短语|建议|建议
naae-nam-hai-raw|แนะนำให้รอ|nae-nam hai raaw|建议等待|短语|建议|建议
naae-nam-hai-check|แนะนำให้เช็ก|nae-nam hai chek|建议检查|短语|建议|建议
naae-nam-hai-phak|แนะนำให้พัก|nae-nam hai phak|建议休息|短语|建议|建议
naae-nam-hai-thaam|แนะนำให้ถาม|nae-nam hai thaam|建议询问|短语|建议|建议
naae-nam-hai-bplian|แนะนำให้เปลี่ยน|nae-nam hai bplian|建议更换|短语|建议|建议
khuan-laawng-gaawn|ควรลองก่อน|khuan laawng gaawn|应该先试试|短语|建议|建议
khuan-bplian-gaawn|ควรเปลี่ยนก่อน|khuan bplian gaawn|应该先更换|短语|建议|建议
khuan-check-gaawn|ควรเช็กก่อน|khuan chek gaawn|应该先检查|短语|建议|建议
khuan-thaam-gaawn|ควรถามก่อน|khuan thaam gaawn|应该先问|短语|建议|建议
khuan-baawk-gaawn|ควรบอกก่อน|khuan baawk gaawn|应该先告知|短语|建议|建议
khuan-dtriiam-gaawn|ควรเตรียมก่อน|khuan dtriiam gaawn|应该先准备|短语|建议|建议
laawng-tham-thii-baan|ลองทำที่บ้าน|laawng tham thii baan|试着在家做|短语|建议|尝试
laawng-tham-thii-rian|ลองทำที่เรียน|laawng tham thii riian|试着在学校做|短语|建议|尝试
laawng-tham-thii-ngan|ลองทำที่งาน|laawng tham thii ngaan|试着在工作处做|短语|建议|尝试
laawng-fang-kham-nae-nam|ลองฟังคำแนะนำ|laawng fang kham nae-nam|试着听建议|短语|建议|建议
dtok-long-kan-gaawn|ตกลงกันก่อน|dtok-long gan gaawn|先商量好|短语|协商|协商
khui-kan-gaawn|คุยกันก่อน|khui gan gaawn|先聊一聊|短语|协商|协商
tham-khwaam-khao-jai-kan|ทำความเข้าใจกัน|tham khwaam khao-jai gan|互相理解一下|短语|协商|协商
ha-thaang-aawk|หาทางออก|haa thaang aawk|找解决办法|动词|协商|解决
ha-thaang-klang|หาทางกลาง|haa thaang glaang|找折中方法|动词|协商|折中
khon-la-khrueng|คนละครึ่ง|khon la khreung|各一半|短语|协商|分担
chuai-kan-ook|ช่วยกันออก|chuai gan aawk|一起出钱|短语|协商|分担
chuai-kan-tham|ช่วยกันทำ|chuai gan tham|一起做|短语|协商|分担
baeng-kan-rap-phit-chop|แบ่งกันรับผิดชอบ|baeng gan rap-phit-chaawp|分担责任|短语|协商|责任
dtaang-khon-dtaang-tham|ต่างคนต่างทำ|dtaang khon dtaang tham|各做各的|短语|协商|分工
hai-chan-tham-suan-nii|ให้ฉันทำส่วนนี้|hai chan tham suan nii|让我做这一部分|短语|协商|分工
hai-khun-tham-suan-nan|ให้คุณทำส่วนนั้น|hai khun tham suan nan|你做那一部分|短语|协商|分工
rap-dai-thao-nii|รับได้เท่านี้|rap dai thao nii|只能接受到这样|短语|协商|范围
lot-dai-thao-nii|ลดได้เท่านี้|lot dai thao nii|只能降到这样|短语|协商|价格
phoem-dai-nit-noi|เพิ่มได้นิดหน่อย|phoem dai nit naawy|可以增加一点点|短语|协商|数量
lot-dai-nit-noi|ลดได้นิดหน่อย|lot dai nit naawy|可以减少一点点|短语|协商|数量
khit-wa-maw|คิดว่าเหมาะ|khit waa maw|觉得合适|短语|意见|看法
khit-wa-mai-maw|คิดว่าไม่เหมาะ|khit waa mai maw|觉得不合适|短语|意见|看法
khit-wa-khum|คิดว่าคุ้ม|khit waa khum|觉得划算|短语|意见|看法
khit-wa-mai-khum|คิดว่าไม่คุ้ม|khit waa mai khum|觉得不划算|短语|意见|看法
khit-wa-phaw|คิดว่าพอ|khit waa phaaw|觉得够了|短语|意见|看法
khit-wa-yang-mai-phaw|คิดว่ายังไม่พอ|khit waa yang mai phaaw|觉得还不够|短语|意见|看法
samrap-ruueang-nii|สำหรับเรื่องนี้|sam-rap rueang nii|关于这件事|短语|意见|角度
nai-mum-khaawng-chan|ในมุมของฉัน|nai mum khaawng chan|从我的角度|短语|意见|角度
chan-mong-wa|ฉันมองว่า|chan maawng waa|我看作是|短语|意见|看法
duu-laeo-khit-wa|ดูแล้วคิดว่า|duu laeo khit waa|看了以后觉得|短语|意见|看法
thaa-pen-bpai-dai|ถ้าเป็นไปได้|thaa bpen bpai dai|如果可以的话|短语|条件|条件
thaa-mai-lam-baak|ถ้าไม่ลำบาก|thaa mai lam-baak|如果不麻烦的话|短语|条件|礼貌
thaa-mai-chaa-goen-bpai|ถ้าไม่ช้าเกินไป|thaa mai chaa goen bpai|如果不太晚的话|短语|条件|时间
thaa-yang-than|ถ้ายังทัน|thaa yang than|如果还来得及|短语|条件|时间
thaa-yang-mee-khaawng|ถ้ายังมีของ|thaa yang mii khaawng|如果还有货|短语|条件|库存
thaa-yang-mee-thii|ถ้ายังมีที่|thaa yang mii thii|如果还有位置|短语|条件|位置
thaa-raw-dai|ถ้ารอได้|thaa raaw dai|如果能等|短语|条件|等待
thaa-plian-dai|ถ้าเปลี่ยนได้|thaa bplian dai|如果能换|短语|条件|更换
thaa-khuen-ngoen-dai|ถ้าคืนเงินได้|thaa kheun ngoen dai|如果能退款|短语|条件|退款
thaa-song-mai-dai|ถ้าส่งใหม่ได้|thaa song mai dai|如果能重发|短语|条件|发送
theung-ja-cha|ถึงจะช้า|theung ja chaa|虽然会慢|短语|轻度让步|让步
theung-ja-phaeng|ถึงจะแพง|theung ja phaaeng|虽然会贵|短语|轻度让步|让步
theung-ja-yak|ถึงจะยาก|theung ja yaak|虽然会难|短语|轻度让步|让步
theung-ja-nueai|ถึงจะเหนื่อย|theung ja nueai|虽然会累|短语|轻度让步|让步
tae-yang-dii|แต่ยังดี|dtaae yang dii|但还好|短语|轻度让步|转折
tae-yang-tham-dai|แต่ยังทำได้|dtaae yang tham dai|但还能做|短语|轻度让步|转折
tae-dtong-chai-welaa|แต่ต้องใช้เวลา|dtaae dtawng chai wee-laa|但需要时间|短语|轻度让步|转折
tae-dtong-raw-noi|แต่ต้องรอหน่อย|dtaae dtawng raaw naawy|但需要等一下|短语|轻度让步|转折
tae-mai-pen-pan-ha|แต่ไม่เป็นปัญหา|dtaae mai bpen bpan-haa|但不是问题|短语|轻度让步|转折
tae-dtong-check-iik|แต่ต้องเช็กอีก|dtaae dtawng chek iik|但还要再查|短语|轻度让步|转折
`;

export const VOCABULARY_EXPANSION_A2_BRIDGE_TO_B1_DAILY_01: VocabularyExpansionA2BridgeToB1DailyCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
