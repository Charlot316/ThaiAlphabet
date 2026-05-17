type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "打不开" | "连不上" | "没电电源" | "漏水潮湿" | "声音异常" | "重启更换" | "请人检查" | "基础排查";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2EverydayRepairsTroubleshootingCandidate = {
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

type Row = {
  id: string;
  thai: string;
  roman: string;
  chinese: string;
  partOfSpeech: PartOfSpeech;
  theme: Theme;
  tag: string;
};

const SOURCE_REFS = ["thai-frequency", "thai-everyday-repairs-troubleshooting-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
    });
}

function makeExample(row: Row): Example {
  if (row.tag === "动作") {
    return {
      thai: `กรุณา${row.thai}ก่อนแจ้งช่างอีกครั้ง`,
      roman: `ga-ru-naa ${row.roman} gaawn jaeng chang iik khrang`,
      chinese: `请先“${row.chinese}”，再通知维修人员。`,
    };
  }
  return {
    thai: `ถ้ามีปัญหา${row.thai} ให้แจ้งคนดูแลทันที`,
    roman: `thaa mii bpan-haa ${row.roman} hai jaeng khon duu-laae than-thii`,
    chinese: `如果出现“${row.chinese}”的问题，请马上通知负责人。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2EverydayRepairsTroubleshootingCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于说明日常故障、排查步骤、维修沟通或请人检查。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，报修时要说清楚故障现象和已经做过的步骤。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["报修时常说 เปิดไม่ได้、ต่อไม่ได้、ลองรีสตาร์ต、ช่วยเช็กให้หน่อย，句子越具体越容易处理。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
poet-mai-dai|เปิดไม่ได้|bpoet mai dai|打不开|短语|打不开|故障
pit-mai-dai|ปิดไม่ได้|bpit mai dai|关不上|短语|打不开|故障
khaang|ค้าง|khaang|卡住|短语|打不开|故障
khaang-yuu-naa-nii|ค้างอยู่หน้านี้|khaang yuu naa nii|卡在这个页面|短语|打不开|故障
khreuang-dap|เครื่องดับ|khreuuang dap|机器关机了|短语|没电电源|故障
khreuang-mai-dtid|เครื่องไม่ติด|khreuuang mai dtit|机器启动不了|短语|没电电源|故障
khreuang-ron|เครื่องร้อน|khreuuang raawn|机器发热|短语|基础排查|故障
khreuang-ron-goen-bpai|เครื่องร้อนเกินไป|khreuuang raawn goen bpai|机器过热|短语|基础排查|故障
khreuang-chaa|เครื่องช้า|khreuuang chaa|机器很慢|短语|基础排查|故障
naa-jaaw-dam|หน้าจอดำ|naa-jaaw dam|黑屏|短语|打不开|故障
naa-jaaw-mai-kheun|หน้าจอไม่ขึ้น|naa-jaaw mai kheun|屏幕不显示|短语|打不开|故障
naa-jaaw-dtaek|หน้าจอแตก|naa-jaaw dtaek|屏幕破裂|短语|基础排查|故障
naa-jaaw-khaang|หน้าจอค้าง|naa-jaaw khaang|屏幕卡住|短语|打不开|故障
bpum-sia|ปุ่มเสีย|bpum siia|按钮坏了|短语|基础排查|故障
bpum-got-mai-dai|ปุ่มกดไม่ได้|bpum got mai dai|按钮按不了|短语|基础排查|故障
pratu-poet-mai-aawk|ประตูเปิดไม่ออก|bpra-dtuu bpoet mai aawk|门打不开|短语|打不开|故障
pratu-pit-mai-sanit|ประตูปิดไม่สนิท|bpra-dtuu bpit mai sa-nit|门关不严|短语|打不开|故障
gunjae-tid|กุญแจติด|gun-jae dtit|钥匙卡住|短语|打不开|故障
lok-mai-dai|ล็อกไม่ได้|lok mai dai|锁不上|短语|打不开|故障
plak-luam|ปลั๊กหลวม|bplak luam|插头松|短语|没电电源|故障
saai-fai-khaat|สายไฟขาด|saai fai khaat|电线断了|短语|没电电源|故障
fai-mai-khao|ไฟไม่เข้า|fai mai khao|没通电|短语|没电电源|故障
fai-dap|ไฟดับ|fai dap|停电|短语|没电电源|故障
fai-kraphrip|ไฟกะพริบ|fai ga-phrip|灯闪烁|短语|没电电源|故障
fai-mai-dtid|ไฟไม่ติด|fai mai dtit|灯不亮|短语|没电电源|故障
baeet-mot|แบตหมด|baet mot|电池没电|短语|没电电源|故障
baeet-mot-reo|แบตหมดเร็ว|baet mot reo|电很快耗尽|短语|没电电源|故障
chaat-mai-khao|ชาร์จไม่เข้า|chaat mai khao|充不进电|短语|没电电源|故障
saai-chaat-sia|สายชาร์จเสีย|saai chaat siia|充电线坏了|短语|没电电源|故障
thaan-mot|ถ่านหมด|thaan mot|电池用完|短语|没电电源|故障
plian-thaan|เปลี่ยนถ่าน|bplian thaan|更换电池|动词|重启更换|动作
plian-saai-chaat|เปลี่ยนสายชาร์จ|bplian saai chaat|更换充电线|动词|重启更换|动作
plian-plak|เปลี่ยนปลั๊ก|bplian bplak|换插头|动词|重启更换|动作
siap-plak-mai|เสียบปลั๊กใหม่|siap bplak mai|重新插插头|动词|重启更换|动作
thot-saawp-fai|ทดสอบไฟ|thot-saawp fai|测试电源|动词|基础排查|动作
dtid-wifi-mai-dai|ติดไวไฟไม่ได้|dtit wai-fai mai dai|连不上无线网|短语|连不上|故障
internet-lut|อินเทอร์เน็ตหลุด|in-thoe-net lut|网络断开|短语|连不上|故障
sanyaan-on|สัญญาณอ่อน|san-yaan aawn|信号弱|短语|连不上|故障
sanyaaan-mai-mii|สัญญาณไม่มี|san-yaan mai mii|没有信号|短语|连不上|故障
rahat-wifi-phit|รหัสไวไฟผิด|ra-hat wai-fai phit|无线网密码错|短语|连不上|故障
app-khao-mai-dai|แอปเข้าไม่ได้|aep khao mai dai|应用进不去|短语|连不上|故障
website-poet-mai-dai|เว็บไซต์เปิดไม่ได้|wep-sai bpoet mai dai|网站打不开|短语|连不上|故障
rabop-lom|ระบบล่ม|ra-bop lom|系统崩了|短语|连不上|故障
rabop-chaa|ระบบช้า|ra-bop chaa|系统很慢|短语|连不上|故障
khaw-khwaam-mai-song|ข้อความไม่ส่ง|khaaw-khwaam mai song|消息发不出去|短语|连不上|故障
fai-upload-mai-dai|ไฟล์อัปโหลดไม่ได้|fai ap-loot mai dai|文件上传不了|短语|连不上|故障
fai-download-mai-dai|ไฟล์ดาวน์โหลดไม่ได้|fai daao-loot mai dai|文件下载不了|短语|连不上|故障
long-dtid-mai|ลองติดใหม่|laawng dtit mai|重新连接试试|动词|基础排查|动作
long-khao-mai|ลองเข้าใหม่|laawng khao mai|重新进入试试|动词|基础排查|动作
long-song-mai|ลองส่งใหม่|laawng song mai|重新发送试试|动词|基础排查|动作
dtat-wifi-laeo-dtid-mai|ตัดไวไฟแล้วติดใหม่|dtat wai-fai laeo dtit mai|断开无线网再重连|动词|基础排查|动作
restart-khreuang|รีสตาร์ตเครื่อง|rii-sa-dtaat khreuuang|重启机器|动词|重启更换|动作
poet-pit-mai|เปิดปิดใหม่|bpoet bpit mai|重新开关一次|动词|重启更换|动作
pit-laeo-poet|ปิดแล้วเปิด|bpit laeo bpoet|关掉再打开|动词|重启更换|动作
reset-khaa|รีเซ็ตค่า|rii-set khaa|重置设置|动词|重启更换|动作
dtang-khaa-mai|ตั้งค่าใหม่|dtang khaa mai|重新设置|动词|重启更换|动作
update-rabop|อัปเดตระบบ|ap-det ra-bop|更新系统|动词|重启更换|动作
laang-khreuang|ล้างเครื่อง|laang khreuuang|清理机器|动词|基础排查|动作
tham-khwaam-sa-aat|ทำความสะอาด|tham khwaam-sa-aat|清洁|动词|基础排查|动作
naam-rua|น้ำรั่ว|naam rua|漏水|短语|漏水潮湿|故障
thaaw-naam-rua|ท่อน้ำรั่ว|thaaw naam rua|水管漏水|短语|漏水潮湿|故障
gok-naam-rua|ก๊อกน้ำรั่ว|gaawk naam rua|水龙头漏水|短语|漏水潮湿|故障
naam-yot|น้ำหยด|naam yot|滴水|短语|漏水潮湿|故障
naam-mai-lai|น้ำไม่ไหล|naam mai lai|水不流|短语|漏水潮湿|故障
naam-lai-cha|น้ำไหลช้า|naam lai chaa|水流很慢|短语|漏水潮湿|故障
thaaw-dtan|ท่อตัน|thaaw dtan|管道堵塞|短语|漏水潮湿|故障
sink-dtan|ซิงก์ตัน|sing dtan|水槽堵了|短语|漏水潮湿|故障
hong-naam-dtan|ห้องน้ำตัน|haawng-naam dtan|厕所堵了|短语|漏水潮湿|故障
pheun-bpiak|พื้นเปียก|pheun bpiiak|地面湿了|短语|漏水潮湿|故障
phanang-chuen|ผนังชื้น|pha-nang cheun|墙潮湿|短语|漏水潮湿|故障
mee-glin-ap|มีกลิ่นอับ|mii glin ap|有霉味|短语|漏水潮湿|故障
chao-kheun|เชื้อราขึ้น|cheua-raa kheun|长霉了|短语|漏水潮湿|故障
chet-naam|เช็ดน้ำ|chet naam|擦水|动词|基础排查|动作
pit-gok-naam|ปิดก๊อกน้ำ|bpit gaawk naam|关水龙头|动词|基础排查|动作
pit-waen-naam|ปิดวาล์วน้ำ|bpit waan naam|关水阀|动词|基础排查|动作
riiak-chang-bprapaa|เรียกช่างประปา|riiak chang bpra-bpaa|叫水管工|动词|请人检查|动作
siiang-dang|เสียงดัง|siiang dang|声音很大|短语|声音异常|故障
siiang-bplaek|เสียงแปลก|siiang bplaek|奇怪声音|短语|声音异常|故障
siiang-dang-goen-bpai|เสียงดังเกินไป|siiang dang goen bpai|声音太大|短语|声音异常|故障
siiang-khrang-khraang|เสียงคราง ๆ|siiang khraang khraang|嗡嗡声|短语|声音异常|故障
siiang-grik-grik|เสียงกริ๊ก ๆ|siiang grik grik|咔哒声|短语|声音异常|故障
siiang-nam-yot|เสียงน้ำหยด|siiang naam yot|滴水声|短语|声音异常|故障
air-mai-yen|แอร์ไม่เย็น|aae mai yen|空调不冷|短语|基础排查|故障
air-mee-siiang|แอร์มีเสียง|aae mii siiang|空调有声音|短语|声音异常|故障
phat-lom-mai-mun|พัดลมไม่หมุน|phat-lom mai mun|风扇不转|短语|基础排查|故障
fai-duang-nii-sia|ไฟดวงนี้เสีย|fai duang nii siia|这盏灯坏了|短语|没电电源|故障
lom-aawk-noi|ลมออกน้อย|lom aawk naawy|出风少|短语|基础排查|故障
rin-mai-sanit|ลิ้นชักไม่สนิท|lin-chak mai sa-nit|抽屉关不严|短语|基础排查|故障
gao-ii-yoog|เก้าอี้โยก|gao-ii yoog|椅子摇晃|短语|基础排查|故障
dto-luam|โต๊ะหลวม|dto luam|桌子松动|短语|基础排查|故障
khan-not|ขันน็อต|khan not|拧螺丝|动词|重启更换|动作
plian-lot-fai|เปลี่ยนหลอดไฟ|bplian laawt fai|换灯泡|动词|重启更换|动作
plian-aa-lai|เปลี่ยนอะไหล่|bplian a-lai|更换零件|动词|重启更换|动作
sue-aa-lai-mai|ซื้ออะไหล่ใหม่|seu a-lai mai|买新零件|动词|重启更换|动作
song-saawm|ส่งซ่อม|song saawm|送修|动词|请人检查|动作
riiak-chang|เรียกช่าง|riiak chang|叫维修师傅|动词|请人检查|动作
riiak-khon-duu|เรียกคนดู|riiak khon duu|叫人来看|动词|请人检查|动作
hai-chang-dtruat|ให้ช่างตรวจ|hai chang dtruat|让师傅检查|动词|请人检查|动作
khaaw-hai-chuai-dtruat|ขอให้ช่วยตรวจ|khaaw hai chuai dtruat|请求帮忙检查|动词|请人检查|动作
jaeng-bpanhaa|แจ้งปัญหา|jaeng bpan-haa|报告问题|动词|请人检查|动作
thaai-ruup-bpanhaa|ถ่ายรูปปัญหา|thaai ruup bpan-haa|拍下问题照片|动词|请人检查|动作
song-video|ส่งวิดีโอ|song wi-dii-oo|发送视频|动词|请人检查|动作
jot-aa-gaan|จดอาการ|jot aa-gaan|记录现象|动词|请人检查|动作
chek-kaan-rap-bpragan|เช็กการรับประกัน|chek gaan rap-bpra-gan|查看保修|动词|请人检查|动作
yu-nai-bpragan|อยู่ในประกัน|yuu nai bpra-gan|在保修期内|短语|请人检查|故障
mot-bpragan|หมดประกัน|mot bpra-gan|过保|短语|请人检查|故障
khaa-saawm|ค่าซ่อม|khaa saawm|维修费|名词|请人检查|故障
saawm-laeo|ซ่อมแล้ว|saawm laeo|已经修好|短语|请人检查|故障
yang-mai-haai|ยังไม่หาย|yang mai haai|还没好|短语|请人检查|故障
chai-dai-bpokgati|ใช้ได้ปกติ|chai dai bpok-ga-dti|可以正常使用|短语|基础排查|故障
`;

export const VOCABULARY_EXPANSION_A2_EVERYDAY_REPAIRS_TROUBLESHOOTING_01: VocabularyExpansionA2EverydayRepairsTroubleshootingCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
