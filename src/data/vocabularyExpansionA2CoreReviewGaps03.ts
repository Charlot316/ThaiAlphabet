type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "时间频率" | "数量程度" | "感受状态" | "日常动作" | "基础沟通" | "选择比较" | "生活物品" | "小事处理";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2CoreReviewGaps03Candidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-a2-core-review-gaps-03", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `ประโยคนี้ใช้คำว่า${row.thai}ในชีวิตประจำวันได้บ่อย`,
    roman: `bpra-yook nii chai kham waa ${row.roman} nai chii-wit bpra-jam-wan dai baawy`,
    chinese: `这个句子里的“${row.chinese}”在日常生活中很常用。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2CoreReviewGaps03Candidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 是 A2 日常沟通中值得补强的高频表达或搭配。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，复习时注意语境和搭配。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批用于查漏补缺，优先保留日常句子里能直接复用的短语和搭配。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
thee-la-nit|ทีละนิด|thii-la nit|一点一点地|短语|数量程度|程度
thee-la-khrang|ทีละครั้ง|thii-la khrang|一次一个地|短语|数量程度|程度
thee-la-khon|ทีละคน|thii-la khon|一个人一个人地|短语|数量程度|程度
thee-la-yaang|ทีละอย่าง|thii-la yaang|一样一样地|短语|数量程度|程度
phaw-som-khuan|พอสมควร|phaaw som-khuan|相当；还算|短语|数量程度|程度
mai-khoi|ไม่ค่อย|mai khaawy|不太|短语|数量程度|程度
khaawn-khaang|ค่อนข้าง|khaawn-khaang|比较；有点|短语|数量程度|程度
goen-bpai|เกินไป|goen bpai|过于|短语|数量程度|程度
khanaat-nii|ขนาดนี้|kha-naat nii|到这种程度|短语|数量程度|程度
khanaat-nan|ขนาดนั้น|kha-naat nan|到那种程度|短语|数量程度|程度
laai-yaang|หลายอย่าง|laai yaang|很多种东西|名词|数量程度|数量
baang-yaang|บางอย่าง|baang yaang|某些东西|名词|数量程度|数量
yaang-diaw|อย่างเดียว|yaang diao|只有一种；只要这个|短语|数量程度|数量
khrop-thuk-yaang|ครบทุกอย่าง|khrop thuk yaang|样样齐全|短语|数量程度|数量
khaat-baang-yaang|ขาดบางอย่าง|khaat baang yaang|缺少某些东西|短语|数量程度|数量
dtaawn-nii-leei|ตอนนี้เลย|dtaawn-nii loei|现在就|短语|时间频率|时间
diao-nii|เดี๋ยวนี้|diao nii|现在；立刻|短语|时间频率|时间
diao-khaawy|เดี๋ยวค่อย|diao khaawy|等一下再|短语|时间频率|时间
iik-sak-phak|อีกสักพัก|iik sak phak|再过一会儿|短语|时间频率|时间
mai-naan|ไม่นาน|mai naan|不久|短语|时间频率|时间
naan-laeo|นานแล้ว|naan laeo|已经很久了|短语|时间频率|时间
baang-khrang|บางครั้ง|baang khrang|有时候|短语|时间频率|频率
baang-wan|บางวัน|baang wan|有些天|短语|时间频率|频率
thuk-sapdaa|ทุกสัปดาห์|thuk sap-daa|每周|短语|时间频率|频率
thuk-sin-deuan|ทุกสิ้นเดือน|thuk sin deuan|每月底|短语|时间频率|频率
ton-deuan|ต้นเดือน|dton deuan|月初|名词|时间频率|时间
glaang-deuan|กลางเดือน|glaang deuan|月中|名词|时间频率|时间
sin-deuan|สิ้นเดือน|sin deuan|月底|名词|时间频率|时间
khraaw-naa|คราวหน้า|khraao naa|下次|名词|时间频率|时间
khraaw-nii|คราวนี้|khraao nii|这次|名词|时间频率|时间
ruu-seuk-dii|รู้สึกดี|ruu-seuk dii|感觉好|短语|感受状态|感受
ruu-seuk-mai-dii|รู้สึกไม่ดี|ruu-seuk mai dii|感觉不好|短语|感受状态|感受
mai-khoi-sabaai|ไม่ค่อยสบาย|mai khaawy sa-baai|不太舒服|短语|感受状态|健康
sa-bai-kheun|สบายขึ้น|sa-baai kheun|舒服些了|短语|感受状态|健康
nguang-mak|ง่วงมาก|nguang maak|很困|短语|感受状态|感受
neuuai-mak|เหนื่อยมาก|neuuai maak|很累|短语|感受状态|感受
mai-mii-raeng|ไม่มีแรง|mai mii raaeng|没力气|短语|感受状态|感受
jam-mai-dai|จำไม่ได้|jam mai dai|记不住；想不起来|短语|感受状态|认知
jam-dai-laeo|จำได้แล้ว|jam dai laeo|已经想起来了|短语|感受状态|认知
mai-khao-jai-loei|ไม่เข้าใจเลย|mai khao-jai loei|完全不明白|短语|感受状态|认知
khao-jai-kheun|เข้าใจขึ้น|khao-jai kheun|更明白了|短语|感受状态|认知
suai-kheun|สวยขึ้น|suai kheun|更漂亮了|短语|感受状态|变化
dii-kheun|ดีขึ้น|dii kheun|变好了|短语|感受状态|变化
yaae-long|แย่ลง|yae long|变差了|短语|感受状态|变化
reuay-reuay|เรื่อย ๆ|reuuai reuuai|一直；随便慢慢来|短语|时间频率|状态
tham-reuay-reuay|ทำเรื่อย ๆ|tham reuuai reuuai|慢慢做下去|动词|日常动作|动作
rian-reuay-reuay|เรียนเรื่อย ๆ|riian reuuai reuuai|持续学习|动词|日常动作|学习
long-tham-duu|ลองทำดู|laawng tham duu|试着做看|动词|日常动作|尝试
long-chai-duu|ลองใช้ดู|laawng chai duu|试着用看|动词|日常动作|尝试
long-gin-duu|ลองกินดู|laawng gin duu|试着吃看|动词|日常动作|尝试
long-thaam-duu|ลองถามดู|laawng thaam duu|试着问问|动词|基础沟通|尝试
khaaw-duu-noi|ขอดูหน่อย|khaaw duu naawy|请看一下|短语|基础沟通|请求
khaaw-fang-noi|ขอฟังหน่อย|khaaw fang naawy|请听一下|短语|基础沟通|请求
khaaw-yuem-noi|ขอยืมหน่อย|khaaw yeum naawy|请借一下|短语|基础沟通|请求
khaaw-chai-noi|ขอใช้หน่อย|khaaw chai naawy|请用一下|短语|基础沟通|请求
chuai-yip-hai|ช่วยหยิบให้|chuai yip hai|帮忙拿给我|动词|基础沟通|请求
chuai-song-hai|ช่วยส่งให้|chuai song hai|帮忙递给我；发给我|动词|基础沟通|请求
chuai-gep-hai|ช่วยเก็บให้|chuai gep hai|帮忙收起来|动词|基础沟通|请求
chuai-dtruat-hai|ช่วยตรวจให้|chuai dtruat hai|帮忙检查|动词|基础沟通|请求
baawk-iik-thii|บอกอีกที|baawk iik thii|再说一遍|动词|基础沟通|请求
phuut-chaa-chaa|พูดช้า ๆ|phuut chaa chaa|慢慢说|动词|基础沟通|请求
khian-hai-duu|เขียนให้ดู|khiian hai duu|写给我看|动词|基础沟通|请求
ao-an-nii|เอาอันนี้|ao an nii|要这个|短语|选择比较|选择
mai-ao-an-nan|ไม่เอาอันนั้น|mai ao an nan|不要那个|短语|选择比较|选择
leuak-an-nai|เลือกอันไหน|leuak an nai|选哪一个|短语|选择比较|选择
an-nai-dii-gwaa|อันไหนดีกว่า|an nai dii gwaa|哪个更好|短语|选择比较|比较
an-nii-gaw-dai|อันนี้ก็ได้|an nii gaaw dai|这个也可以|短语|选择比较|选择
an-nan-gaw-dai|อันนั้นก็ได้|an nan gaaw dai|那个也可以|短语|选择比较|选择
mai-dtaang-gan-mak|ไม่ต่างกันมาก|mai dtaang gan maak|差不多|短语|选择比较|比较
meuan-gan-loei|เหมือนกันเลย|meuan gan loei|完全一样|短语|选择比较|比较
dtaang-gan-nit-noi|ต่างกันนิดหน่อย|dtaang gan nit naawy|稍微不同|短语|选择比较|比较
thuuk-gwaa-nit-noi|ถูกกว่านิดหน่อย|thuuk gwaa nit naawy|便宜一点点|短语|选择比较|比较
phaeng-gwaa-nit-noi|แพงกว่านิดหน่อย|phaeng gwaa nit naawy|贵一点点|短语|选择比较|比较
khaawng-lek-lek|ของเล็ก ๆ|khaawng lek lek|小东西|名词|生活物品|物品
khaawng-chin-nii|ของชิ้นนี้|khaawng chin nii|这件东西|名词|生活物品|物品
khaawng-chin-nan|ของชิ้นนั้น|khaawng chin nan|那件东西|名词|生活物品|物品
khaawng-suan-dtua|ของส่วนตัว|khaawng suan-dtua|个人物品|名词|生活物品|物品
khaawng-chai-ruam|ของใช้ร่วม|khaawng chai ruam|共用物品|名词|生活物品|物品
khaawng-samkhan|ของสำคัญ|khaawng sam-khan|重要物品|名词|生活物品|物品
thung-pha|ถุงผ้า|thung phaa|布袋|名词|生活物品|物品
thung-plastic|ถุงพลาสติก|thung phlaat-dtik|塑料袋|名词|生活物品|物品
khaawng-yuu-nai-thung|ของอยู่ในถุง|khaawng yuu nai thung|东西在袋子里|短语|生活物品|位置
fang-paaidii|ฝั่งปลายดี|fang bplaai dii|尾端那边|名词|生活物品|位置
dtua-klip|ตัวคลิป|dtua khlip|夹子|名词|生活物品|物品
saai-rat|สายรัด|saai rat|绑带|名词|生活物品|物品
bplaawk|ปลอก|bplaawk|套子；外套|名词|生活物品|物品
fuuang|ฝุ่น|fun|灰尘|名词|小事处理|清洁
chet-fun|เช็ดฝุ่น|chet fun|擦灰|动词|小事处理|清洁
khruap|คราบ|khraap|污渍|名词|小事处理|清洁
chet-khraap|เช็ดคราบ|chet khraap|擦污渍|动词|小事处理|清洁
laang-aawk|ล้างออก|laang aawk|洗掉|动词|小事处理|清洁
sak-aawk|ซักออก|sak aawk|洗得掉|动词|小事处理|清洁
mai-aawk|ไม่ออก|mai aawk|弄不掉；洗不掉|短语|小事处理|清洁
phang-lek-noi|พังเล็กน้อย|phang lek naawy|轻微坏了|短语|小事处理|问题
chai-dai-yuu|ใช้ได้อยู่|chai dai yuu|还能用|短语|小事处理|状态
chai-mai-khoi-dai|ใช้ไม่ค่อยได้|chai mai khaawy dai|不太能用|短语|小事处理|状态
ao-bpai-ting|เอาไปทิ้ง|ao bpai thing|拿去扔掉|动词|小事处理|处理
ao-bpai-gep|เอาไปเก็บ|ao bpai gep|拿去收好|动词|小事处理|处理
ao-bpai-laang|เอาไปล้าง|ao bpai laang|拿去洗|动词|小事处理|处理
ao-bpai-saawm|เอาไปซ่อม|ao bpai saawm|拿去修|动词|小事处理|处理
khaawng-nii-khaawng-khrai|ของนี้ของใคร|khaawng nii khaawng khrai|这是谁的东西|短语|基础沟通|询问
khrai-ao-bpai|ใครเอาไป|khrai ao bpai|谁拿走了|短语|基础沟通|询问
ao-maa-khuen|เอามาคืน|ao maa kheun|拿回来归还|动词|小事处理|处理
fang-nii|ฝั่งนี้|fang nii|这边|名词|生活物品|位置
fang-noon|ฝั่งโน้น|fang noon|那边|名词|生活物品|位置
trong-nan|ตรงนั้น|dtrong nan|那里|名词|生活物品|位置
trong-nii|ตรงนี้|dtrong nii|这里|名词|生活物品|位置
`;

export const VOCABULARY_EXPANSION_A2_CORE_REVIEW_GAPS_03: VocabularyExpansionA2CoreReviewGaps03Candidate[] = parseRows(RAW_ROWS).map(buildCandidate);
