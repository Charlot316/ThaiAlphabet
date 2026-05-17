type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "餐厅" | "交通" | "诊所" | "购物" | "家庭" | "学校工作" | "办事" | "日常求助";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2DailyScenarioReviewCandidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-a2-daily-scenario-review-01", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `เวลาออกไปข้างนอก ฉันใช้คำว่า${row.thai}ในสถานการณ์จริง`,
    roman: `wee-laa aawk bpai khaang-naawk chan chai kham waa ${row.roman} nai sa-thaa-na-gaan jing`,
    chinese: `出门在外时，我会在真实场景里使用“${row.chinese}”。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2DailyScenarioReviewCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 是 A2 日常场景中可直接套用的基础表达。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 用来表达“${row.chinese}”；${related.thai} 用来表达“${related.chinese}”，复习时注意场景不同。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批用于 A2 场景复盘，混合餐厅、交通、诊所、购物、家庭、学校和工作里的高频表达。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
khaaw-jaan-lek|ขอจานเล็ก|khaaw jaan lek|请给小盘子|短语|餐厅|餐具
khaaw-thuai-noi|ขอถ้วยหน่อย|khaaw thuai naawy|请给个碗|短语|餐厅|餐具
khaaw-chon-noi|ขอช้อนหน่อย|khaaw chaawn naawy|请给勺子|短语|餐厅|餐具
khaaw-gaeo-nam|ขอแก้วน้ำ|khaaw gaeo naam|请给水杯|短语|餐厅|餐具
khaaw-nam-plao|ขอน้ำเปล่า|khaaw naam bplaao|请给白水|短语|餐厅|饮品
khaaw-nam-khaeng|ขอน้ำแข็ง|khaaw naam khaeng|请加冰|短语|餐厅|饮品
mai-sai-nam-khaeng|ไม่ใส่น้ำแข็ง|mai sai naam khaeng|不要加冰|短语|餐厅|饮品
sai-phak-noi|ใส่ผักน้อย|sai phak naawy|少放菜|短语|餐厅|要求
mai-sai-phrik|ไม่ใส่พริก|mai sai phrik|不要放辣椒|短语|餐厅|忌口
phrik-yaek|พริกแยก|phrik yaaek|辣椒分开放|短语|餐厅|要求
naam-jim-yaek|น้ำจิ้มแยก|naam jim yaaek|蘸酱分开放|短语|餐厅|要求
khaaw-chim-gaawn|ขอชิมก่อน|khaaw chim gaawn|想先尝一下|短语|餐厅|点餐
khaaw-muu-suk|ขอหมูสุก|khaaw muu suk|猪肉要熟的|短语|餐厅|熟度
mai-ao-khruang-nai|ไม่เอาเครื่องใน|mai ao khreuuang nai|不要内脏|短语|餐厅|忌口
ao-baep-rorn|เอาแบบร้อน|ao baaep raawn|要热的|短语|餐厅|温度
ao-baep-yen|เอาแบบเย็น|ao baaep yen|要冷的|短语|餐厅|温度
kep-ngoen-duai|เก็บเงินด้วย|gep ngoen duai|请结账|短语|餐厅|结账
chuai-haan-duai|ช่วยหารด้วย|chuai haan duai|请帮忙分开算|短语|餐厅|结账
rakha-ruam-laeo|ราคารวมแล้ว|raa-khaa ruam laeo|价格已经合计了|短语|餐厅|结账
ao-glap-baan|เอากลับบ้าน|ao glap baan|带回家|短语|餐厅|打包
rot-thii-bpai|รถที่ไป|rot thii bpai|去那里的车|名词|交通|路线
rot-ma-thuk-wan|รถมาทุกวัน|rot maa thuk wan|车每天来|短语|交通|班次
rot-ma-thuk-sip-na-thii|รถมาทุกสิบนาที|rot maa thuk sip naa-thii|车每十分钟来|短语|交通|班次
long-paai-naa|ลงป้ายหน้า|long bpaai naa|下一站下|短语|交通|下车
kheun-thii-paai-nii|ขึ้นที่ป้ายนี้|kheun thii bpaai nii|在这一站上车|短语|交通|上车
dtaw-rot-thii-nai|ต่อรถที่ไหน|dtaaw rot thii nai|在哪里换车|短语|交通|换乘
dtrong-bpai-laeo-liiao|ตรงไปแล้วเลี้ยว|dtrong bpai laeo liaao|直走后转弯|短语|交通|问路
dern-khaam-thanon|เดินข้ามถนน|doen khaam tha-non|过马路|动词|交通|步行
thaang-nai|ทางไหน|thaang nai|哪条路|短语|交通|问路
thang-khao-sathanii|ทางเข้าสถานี|thaang khao sa-thaa-nii|车站入口|名词|交通|位置
thang-aawk-sathanii|ทางออกสถานี|thaang aawk sa-thaa-nii|车站出口|名词|交通|位置
dtong-chai-kaat-mai|ต้องใช้การ์ดไหม|dtawng chai gaat mai|需要用卡吗|短语|交通|票卡
ngoen-nai-kaat-mai-phaw|เงินในการ์ดไม่พอ|ngoen nai gaat mai phaaw|卡里的钱不够|短语|交通|票卡
khaaw-duu-phaen-thii|ขอดูแผนที่|khaaw duu phaaen-thii|请让我看地图|短语|交通|导航
bpai-thaang-nii-dai|ไปทางนี้ได้|bpai thaang nii dai|可以走这边|短语|交通|导航
mai-ruu-thaang|ไม่รู้ทาง|mai ruu thaang|不认识路|短语|交通|求助
rong-phaya-baan-glai|โรงพยาบาลใกล้|roong pha-yaa-baan glai|医院近|短语|诊所|位置
khli-nik-bpoet-mai|คลินิกเปิดไหม|khli-nik bpoet mai|诊所开门吗|短语|诊所|咨询
mor-yuu-mai|หมออยู่ไหม|maw yuu mai|医生在吗|短语|诊所|咨询
khaaw-phop-mor|ขอพบหมอ|khaaw phop maw|想见医生|短语|诊所|就诊
mee-nat-laeo|มีนัดแล้ว|mii nat laeo|已经预约了|短语|诊所|预约
yang-mai-mee-nat|ยังไม่มีนัด|yang mai mii nat|还没有预约|短语|诊所|预约
khaaw-nat-mai|ขอนัดใหม่|khaaw nat mai|想重新预约|短语|诊所|预约
bpai-rap-yaa|ไปรับยา|bpai rap yaa|去取药|动词|诊所|药品
kin-yaa-laeo|กินยาแล้ว|gin yaa laeo|已经吃药了|短语|诊所|用药
yang-mai-kin-yaa|ยังไม่กินยา|yang mai gin yaa|还没吃药|短语|诊所|用药
puat-nit-noi|ปวดนิดหน่อย|bpuat nit naawy|有点疼|短语|诊所|症状
mai-sabai-maak|ไม่สบายมาก|mai sa-baai maak|很不舒服|短语|诊所|症状
dtua-rorn-nit-noi|ตัวร้อนนิดหน่อย|dtua raawn nit naawy|有点发热|短语|诊所|症状
khaaw-bai-rap-raawng|ขอใบรับรอง|khaaw bai rap-raawng|请开证明|短语|诊所|证明
dtong-phak-geun|ต้องพักกี่คืน|dtawng phak gii kheun|需要休息几晚|短语|诊所|休息
mee-khaawng-mai|มีของไหม|mii khaawng mai|有货吗|短语|购物|库存
khaaw-duu-khaawng|ขอดูของ|khaaw duu khaawng|想看看商品|短语|购物|询问
long-jap-dai-mai|ลองจับได้ไหม|laawng jap dai mai|可以摸一下吗|短语|购物|试看
long-sai-dai-mai|ลองใส่ได้ไหม|laawng sai dai mai|可以试穿吗|短语|购物|试穿
mee-sii-uen-mai|มีสีอื่นไหม|mii sii uen mai|有别的颜色吗|短语|购物|选择
mee-khanaat-uen-mai|มีขนาดอื่นไหม|mii kha-naat uen mai|有别的尺寸吗|短语|购物|选择
lot-dai-nit-noi|ลดได้นิดหน่อย|lot dai nit naawy|可以便宜一点|短语|购物|砍价
mai-lot-laeo|ไม่ลดแล้ว|mai lot laeo|不能再便宜了|短语|购物|砍价
khun-na-phap-dii|คุณภาพดี|khun-na-phap dii|质量好|短语|购物|质量
chai-ngan-ngai|ใช้งานง่าย|chai-ngaan ngaai|使用简单|短语|购物|质量
khong-thon|คงทน|khong thon|耐用|形容词|购物|质量
khaaw-bai-set|ขอใบเสร็จ|khaaw bai-set|请给收据|短语|购物|收据
khaaw-thung-noi|ขอถุงหน่อย|khaaw thung naawy|请给袋子|短语|购物|包装
paek-hai-naen|แพ็กให้แน่น|phaek hai naen|请包紧一点|短语|购物|包装
song-theung-baan|ส่งถึงบ้าน|song theung baan|送到家|短语|购物|送货
waan-nai-baan|วางในบ้าน|waang nai baan|放在家里|短语|家庭|位置
gep-bon-chan|เก็บบนชั้น|gep bon chan|收在架子上|短语|家庭|收纳
yaai-bpai-hong-nawn|ย้ายไปห้องนอน|yaai bpai hawng naawn|搬到卧室|短语|家庭|房间
ao-maa-wai-khrua|เอามาไว้ครัว|ao maa wai khrua|拿来放厨房|短语|家庭|厨房
chuai-bpit-fai|ช่วยปิดไฟ|chuai bpit fai|帮忙关灯|短语|家庭|家务
chuai-bpoet-naa-taang|ช่วยเปิดหน้าต่าง|chuai bpoet naa-dtaang|帮忙开窗|短语|家庭|家务
ya-luem-lock-pratuu|อย่าลืมล็อกประตู|yaa leum lawk bpra-dtuu|别忘了锁门|短语|家庭|提醒
sak-phaa-laeo|ซักผ้าแล้ว|sak phaa laeo|衣服洗好了|短语|家庭|家务
tak-phaa-wai|ตากผ้าไว้|dtaak phaa wai|把衣服晾着|短语|家庭|家务
lang-jaan-set|ล้างจานเสร็จ|laang jaan set|洗完碗了|短语|家庭|家务
tham-khaaw-yen|ทำข้าวเย็น|tham khaao yen|做晚饭|动词|家庭|做饭
duu-lae-khon-puai|ดูแลคนป่วย|duu-lae khon bpuai|照顾病人|动词|家庭|照顾
rap-dek-glap|รับเด็กกลับ|rap dek glap|接孩子回来|动词|家庭|接送
song-dek-bpai-rian|ส่งเด็กไปเรียน|song dek bpai riian|送孩子上学|动词|家庭|接送
mee-gaan-baan|มีการบ้าน|mii gaan-baan|有作业|短语|学校工作|作业
song-gaan-baan-laeo|ส่งการบ้านแล้ว|song gaan-baan laeo|作业交了|短语|学校工作|作业
yang-mai-song-ngan|ยังไม่ส่งงาน|yang mai song ngaan|还没交工作|短语|学校工作|任务
tham-ngan-khuu|ทำงานคู่|tham ngaan khuu|两人合作做|动词|学校工作|合作
tham-ngan-klum|ทำงานกลุ่ม|tham ngaan glum|小组合作|动词|学校工作|合作
khaaw-fai-ngan|ขอไฟล์งาน|khaaw fai ngaan|请给工作文件|短语|学校工作|文件
song-fai-hai-laeo|ส่งไฟล์ให้แล้ว|song fai hai laeo|文件已经发给你了|短语|学校工作|文件
print-eek-saarn|พิมพ์เอกสาร|phim eek-ga-saan|打印文件|动词|学校工作|文件
copy-naa-nii|ก๊อปปี้หน้านี้|gop-bpii naa nii|复印这一页|动词|学校工作|文件
khaaw-duu-tarang|ขอดูตาราง|khaaw duu dtaa-raang|请看一下表格|短语|学校工作|表格
tham-tarang-ngai|ทำตารางง่าย|tham dtaa-raang ngaai|做简单表格|短语|学校工作|表格
pra-chum-san-san|ประชุมสั้น ๆ|bpra-chum san san|开个短会|短语|学校工作|会议
khaaw-laa-khrueng-wan|ขอลาครึ่งวัน|khaaw laa khreung wan|请半天假|短语|学校工作|请假
ma-sai-nit-noi|มาสายนิดหน่อย|maa saai nit naawy|来晚一点|短语|学校工作|迟到
toa-mai-phaw|โต๊ะไม่พอ|dtoh mai phaaw|桌子不够|短语|学校工作|物品
khaaw-rap-bat-khiu|ขอรับบัตรคิว|khaaw rap bat khiu|请取号码牌|短语|办事|排队
theung-khiu-chan|ถึงคิวฉัน|theung khiu chan|轮到我了|短语|办事|排队
raw-iik-sak-khruu|รออีกสักครู่|raaw iik sak khruu|请再等一会儿|短语|办事|等待
dtong-dteem-baep-fawm|ต้องเติมแบบฟอร์ม|dtawng dteem baaep-faawm|需要填表|短语|办事|表格
khian-thii-yuu-hai-chat|เขียนที่อยู่ให้ชัด|khiian thii-yuu hai chat|地址写清楚|短语|办事|资料
sen-cheu-trong-nii|เซ็นชื่อตรงนี้|sen cheu dtrong nii|在这里签名|短语|办事|签名
thuai-ruup-bat|ถ่ายรูปบัตร|thaai ruup bat|拍证件照片|动词|办事|证件
thuai-eek-saarn|ถ่ายเอกสาร|thaai eek-ga-saan|复印文件|动词|办事|文件
khomun-mai-khrop|ข้อมูลไม่ครบ|khaaw-muun mai khrop|资料不全|短语|办事|资料
maa-mai-phrung-nii|มาใหม่พรุ่งนี้|maa mai phrung-nii|明天再来|短语|办事|时间
chuai-duu-hai-noi|ช่วยดูให้หน่อย|chuai duu hai naawy|请帮我看一下|短语|日常求助|求助
chuai-check-hai-noi|ช่วยเช็กให้หน่อย|chuai chek hai naawy|请帮我查一下|短语|日常求助|求助
chuai-thue-hai-noi|ช่วยถือให้หน่อย|chuai theu hai naawy|请帮我拿一下|短语|日常求助|求助
chuai-bplae-hai-noi|ช่วยแปลให้หน่อย|chuai bplae hai naawy|请帮我翻译一下|短语|日常求助|求助
mai-mee-sanyan|ไม่มีสัญญาณ|mai mii san-yaan|没有信号|短语|日常求助|问题
tho-mai-dai|โทรไม่ได้|thoo mai dai|打不了电话|短语|日常求助|问题
ha-wifi-mai-joe|หาไวไฟไม่เจอ|haa wai-fai mai joe|找不到无线网|短语|日常求助|问题
tham-haai|ทำหาย|tham haai|弄丢了|动词|日常求助|问题
luem-wai-thii-nan|ลืมไว้ที่นั่น|leum wai thii nan|忘在那里了|短语|日常求助|遗忘
dtit-dtaw-khrai-dai|ติดต่อใครได้|dtit-dtaaw khrai dai|可以联系谁|短语|日常求助|联系
`;

export const VOCABULARY_EXPANSION_A2_DAILY_SCENARIO_REVIEW_01: VocabularyExpansionA2DailyScenarioReviewCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
