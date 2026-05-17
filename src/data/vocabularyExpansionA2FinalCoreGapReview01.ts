type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "功能短语" | "高频动作" | "状态形容" | "生活搭配" | "沟通回应" | "时间顺序" | "数量范围" | "小事处理";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2FinalCoreGapReviewCandidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-a2-final-core-gap-review", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `ครูให้ฝึกใช้คำว่า${row.thai}ในประโยคง่าย ๆ วันนี้`,
    roman: `khruu hai feuk chai kham waa ${row.roman} nai bpra-yook ngaai ngaai wan-nii`,
    chinese: `老师让今天练习在简单句里使用“${row.chinese}”。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2FinalCoreGapReviewCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 是 A2 核心复盘中适合补强的日常表达。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，使用时注意前后搭配。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批是 A2 高频缺口复盘，适合放进基础口语、生活办事、课堂练习中反复使用。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
khit-wa|คิดว่า|khit waa|觉得；认为|动词|功能短语|想法
hen-wa|เห็นว่า|hen waa|认为；看出|动词|功能短语|想法
ruu-wa|รู้ว่า|ruu waa|知道……|动词|功能短语|认知
mai-ruu-wa|ไม่รู้ว่า|mai ruu waa|不知道……|短语|功能短语|认知
yaak-ruu-wa|อยากรู้ว่า|yaak ruu waa|想知道……|短语|功能短语|认知
jam-bpen-dtong|จำเป็นต้อง|jam-bpen dtawng|有必要必须|短语|功能短语|必要
mai-jam-bpen|ไม่จำเป็น|mai jam-bpen|没必要|短语|功能短语|必要
khun-dtong|คุณต้อง|khun dtawng|你需要；你必须|短语|功能短语|必要
rao-khuan|เราควร|rao khuan|我们应该|短语|功能短语|建议
mai-khuan|ไม่ควร|mai khuan|不应该|短语|功能短语|建议
tham-dai|ทำได้|tham dai|做得到|短语|高频动作|能力
tham-mai-dai|ทำไม่ได้|tham mai dai|做不到|短语|高频动作|能力
chai-dai|ใช้ได้|chai dai|可以用|短语|高频动作|能力
chai-mai-dai|ใช้ไม่ได้|chai mai dai|不能用|短语|高频动作|能力
ao-dai|เอาได้|ao dai|可以拿；可以要|短语|高频动作|能力
ao-mai-dai|เอาไม่ได้|ao mai dai|不能拿；不行|短语|高频动作|能力
khaaw-ao|ขอเอา|khaaw ao|请求拿；想要|动词|沟通回应|请求
khaaw-plian|ขอเปลี่ยน|khaaw bplian|请求更换|动词|沟通回应|请求
khaaw-laawng|ขอลอง|khaaw laawng|请求试试|动词|沟通回应|请求
khaaw-gep-wai|ขอเก็บไว้|khaaw gep wai|请求保留|动词|沟通回应|请求
fang-duu|ฟังดู|fang duu|听起来|动词|沟通回应|感觉
duu-meuan|ดูเหมือน|duu meuan|看起来像|短语|沟通回应|感觉
meuan-wa|เหมือนว่า|meuan waa|好像是|短语|沟通回应|感觉
aaj-ja|อาจจะ|aat ja|可能会|短语|功能短语|可能
khong-ja|คงจะ|khong ja|大概会|短语|功能短语|可能
mai-naa-ja|ไม่น่าจะ|mai naa ja|应该不会|短语|功能短语|可能
naa-ja|น่าจะ|naa ja|应该；可能|短语|功能短语|可能
tam-la-dap|ตามลำดับ|dtaam lam-dap|按顺序|短语|时间顺序|顺序
ti-la-khan|ทีละขั้น|thii-la khan|一步一步|短语|时间顺序|顺序
khan-raek|ขั้นแรก|khan raek|第一步|名词|时间顺序|顺序
khan-dtaaw-bpai|ขั้นต่อไป|khan dtaaw bpai|下一步|名词|时间顺序|顺序
khan-sut-thaai|ขั้นสุดท้าย|khan sut-thaai|最后一步|名词|时间顺序|顺序
gawn-nan|ก่อนนั้น|gaawn nan|在那之前|短语|时间顺序|时间
lang-nan|หลังนั้น|lang nan|在那之后|短语|时间顺序|时间
dtaawn-nan|ตอนนั้น|dtaawn nan|那时候|名词|时间顺序|时间
dtaawn-nii|ตอนนี้|dtaawn nii|现在|名词|时间顺序|时间
dtaawn-lang|ตอนหลัง|dtaawn lang|后来|名词|时间顺序|时间
dtrong-wee-laa|ตรงเวลา|dtrong wee-laa|准时|形容词|时间顺序|时间
mai-dtrong-wee-laa|ไม่ตรงเวลา|mai dtrong wee-laa|不准时|短语|时间顺序|时间
khon-la|คนละ|khon la|每人……|短语|数量范围|数量
an-la|อันละ|an la|每个……|短语|数量范围|数量
chut-la|ชุดละ|chut la|每套……|短语|数量范围|数量
wan-la|วันละ|wan la|每天……|短语|数量范围|数量
deuan-la|เดือนละ|deuan la|每月……|短语|数量范围|数量
khreung-nueng|ครึ่งหนึ่ง|khreung neung|一半|名词|数量范围|数量
suan-yai|ส่วนใหญ่|suan yai|大部分|名词|数量范围|数量
suan-noi|ส่วนน้อย|suan naawy|小部分|名词|数量范围|数量
pramaan|ประมาณ|bpra-maan|大约|短语|数量范围|数量
geuap|เกือบ|geuap|差不多；将近|短语|数量范围|数量
kwaa|กว่า|gwaa|多于；比……更|短语|数量范围|比较
taam|ต่ำ|dtam|低|形容词|状态形容|状态
suung|สูง|suung|高|形容词|状态形容|状态
dtuen|ตื้น|dteun|浅|形容词|状态形容|状态
leuk|ลึก|leuk|深|形容词|状态形容|状态
gwaang|กว้าง|gwaang|宽|形容词|状态形容|状态
khaep|แคบ|khaep|窄|形容词|状态形容|状态
na|หนา|naa|厚|形容词|状态形容|状态
baang|บาง|baang|薄|形容词|状态形容|状态
luam|หลวม|luam|松|形容词|状态形容|状态
khab|คับ|khap|紧|形容词|状态形容|状态
riap|เรียบ|riiap|平整|形容词|状态形容|状态
khru-khra|ขรุขระ|khru khra|凹凸不平|形容词|状态形容|状态
luean|ลื่น|leuun|滑|形容词|状态形容|状态
sa-dut|สะดุด|sa-dut|绊到|动词|高频动作|动作
lap|หลับ|lap|睡着|动词|高频动作|动作
dteun|ตื่น|dteun|醒来|动词|高频动作|动作
chao|เช่า|chao|租|动词|高频动作|生活
hai-chao|ให้เช่า|hai chao|出租|动词|高频动作|生活
yeum|ยืม|yeum|借入|动词|高频动作|动作
hai-yeum|ให้ยืม|hai yeum|借给别人|动词|高频动作|动作
kheun-khaawng|คืนของ|kheun khaawng|归还东西|动词|高频动作|动作
rap-kheun|รับคืน|rap kheun|收回|动词|高频动作|动作
phang|พัง|phang|坏掉|动词|小事处理|问题
haai|หาย|haai|不见；痊愈|动词|小事处理|变化
phaad|พลาด|phlaat|错过；失误|动词|小事处理|问题
phit|ผิด|phit|错|形容词|小事处理|问题
thuuk|ถูก|thuuk|对；被；便宜|形容词|小事处理|状态
din|ดิ้น|din|扭动；挣扎|动词|高频动作|动作
dueng|ดึง|deung|拉|动词|高频动作|动作
phlak|ผลัก|phlak|推|动词|高频动作|动作
bit|บิด|bit|扭；拧|动词|高频动作|动作
khwan|ขวาง|khwaang|挡住|动词|高频动作|动作
khwam|คว่ำ|khwam|倒扣|动词|高频动作|动作
ngai|หงาย|ngaai|仰放|动词|高频动作|动作
pup|พับ|phap|折叠|动词|高频动作|动作
klii|คลี่|khlii|展开|动词|高频动作|动作
phuk|ผูก|phuuk|系；绑|动词|高频动作|动作
kae-phuk|แก้ผูก|gae phuuk|解开绑结|动词|高频动作|动作
phen|เป็น|bpen|会；是；成为|动词|功能短语|功能
mai-phen|ไม่เป็น|mai bpen|不会；没事|短语|功能短语|功能
bpen-arai|เป็นอะไร|bpen a-rai|怎么了|短语|沟通回应|询问
mai-bpen-arai|ไม่เป็นอะไร|mai bpen a-rai|没什么事|短语|沟通回应|回应
yaang-ngan|อย่างนั้น|yaang nan|那样|短语|功能短语|指代
yaang-nii|อย่างนี้|yaang nii|这样|短语|功能短语|指代
baep-nan|แบบนั้น|baep nan|那种样子|短语|功能短语|指代
baep-nii|แบบนี้|baep nii|这种样子|短语|功能短语|指代
phaw-laeo|พอแล้ว|phaaw laeo|够了|短语|沟通回应|回应
yang-mai-phaw|ยังไม่พอ|yang mai phaaw|还不够|短语|沟通回应|回应
loei|เลย|loei|就；完全；所以|短语|功能短语|语气
duai-sam|ด้วยซ้ำ|duai sam|甚至还|短语|功能短语|语气
jing-jing-laeo|จริง ๆ แล้ว|jing jing laeo|其实|短语|功能短语|语气
thammadaa|ธรรมดา|tham-ma-daa|普通；平常|形容词|状态形容|状态
phiset|พิเศษ|phi-set|特别|形容词|状态形容|状态
`;

export const VOCABULARY_EXPANSION_A2_FINAL_CORE_GAP_REVIEW_01: VocabularyExpansionA2FinalCoreGapReviewCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
