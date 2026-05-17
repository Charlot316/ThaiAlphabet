type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "迟到缺勤" | "忘带漏做" | "机器故障" | "客户等待" | "排班冲突" | "交接不清" | "请求主管" | "简单处理";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2SimpleWorkplaceProblemsCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-simple-workplace-problems-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  if (row.tag === "动作") {
    return { thai: `วันนี้ฉันต้อง${row.thai}ก่อนเริ่มงานช่วงบ่าย`, roman: `wan-nii chan dtawng ${row.roman} gaawn roem ngaan chuang baai`, chinese: `今天我必须先“${row.chinese}”，再开始下午的工作。` };
  }
  return { thai: `วันนี้มีปัญหา${row.thai} จึงต้องแจ้งหัวหน้าก่อน`, roman: `wan-nii mii bpan-haa ${row.roman} jeung dtawng jaeng hua-naa gaawn`, chinese: `今天有“${row.chinese}”的问题，所以要先通知主管。` };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2SimpleWorkplaceProblemsCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于说明工作中的小问题、通知同事或请主管协助。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，工作沟通中要说清问题、时间和需要的帮助。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["报告工作小问题时，可用 ขอโทษ、รบกวน、ช่วยดูให้หน่อย、แจ้งหัวหน้า 让语气更自然。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
maa-saai|มาสาย|maa saai|迟到|动词|迟到缺勤|问题
khaaw-thoot-thii-maa-saai|ขอโทษที่มาสาย|khaaw-thoot thii maa saai|抱歉迟到|短语|迟到缺勤|动作
rot-dtit|รถติด|rot dtit|堵车|短语|迟到缺勤|问题
dtuen-saai|ตื่นสาย|dteun saai|起晚了|动词|迟到缺勤|问题
khao-ngaan-chaa|เข้างานช้า|khao ngaan chaa|上班晚到|动词|迟到缺勤|问题
jaeng-maa-saai|แจ้งมาสาย|jaeng maa saai|通知会迟到|动词|迟到缺勤|动作
khaaw-khao-ngaan-chaa|ขอเข้างานช้า|khaaw khao ngaan chaa|请求晚点上班|动词|迟到缺勤|动作
laa-chua-moong|ลาชั่วโมง|laa chua-moong|请小时假|动词|迟到缺勤|动作
laa-khrueng-wan|ลาครึ่งวัน|laa khreung wan|请半天假|动词|迟到缺勤|动作
laa-gathanhan|ลากะทันหัน|laa ga-than-han|临时请假|动词|迟到缺勤|动作
khon-khaat|คนขาด|khon khaat|人手不足|短语|迟到缺勤|问题
khaat-khon|ขาดคน|khaat khon|缺人|短语|迟到缺勤|问题
phuean-mai-maa|เพื่อนไม่มา|pheuan mai maa|同事没来|短语|迟到缺勤|问题
mai-than-roop-ngaan|ไม่ทันรอบงาน|mai than raawp ngaan|赶不上班次|短语|迟到缺勤|问题
leum-bat-pha-nak-ngaan|ลืมบัตรพนักงาน|leum bat pha-nak-ngaan|忘带员工卡|动词|忘带漏做|问题
leum-gunjae|ลืมกุญแจ|leum gun-jae|忘带钥匙|动词|忘带漏做|问题
leum-fai|ลืมไฟล์|leum fai|忘带文件|动词|忘带漏做|问题
leum-ekgasan|ลืมเอกสาร|leum eek-ga-saan|忘带资料|动词|忘带漏做|问题
leum-poet-raan|ลืมเปิดร้าน|leum bpoet raan|忘记开店|动词|忘带漏做|问题
leum-pit-fai|ลืมปิดไฟ|leum bpit fai|忘记关灯|动词|忘带漏做|问题
leum-lock-pratu|ลืมล็อกประตู|leum lok bpra-dtuu|忘记锁门|动词|忘带漏做|问题
leum-song-khaaw-khwaam|ลืมส่งข้อความ|leum song khaaw-khwaam|忘记发消息|动词|忘带漏做|问题
leum-thoo-ha-luuk-khaa|ลืมโทรหาลูกค้า|leum thoo haa luuk-khaa|忘记打给客户|动词|忘带漏做|问题
leum-check-khaawng|ลืมเช็กของ|leum chek khaawng|忘记检查物品|动词|忘带漏做|问题
tham-ngaan-khaam|ทำงานข้าม|tham ngaan khaam|漏做一项工作|动词|忘带漏做|问题
khaawng-mai-khrop|ของไม่ครบ|khaawng mai khrop|物品不齐|短语|忘带漏做|问题
ekgasan-mai-khrop|เอกสารไม่ครบ|eek-ga-saan mai khrop|资料不齐|短语|忘带漏做|问题
khaaw-yuem-bat|ขอยืมบัตร|khaaw yeum bat|请求借用卡|动词|忘带漏做|动作
khaaw-yuem-gunjae|ขอยืมกุญแจ|khaaw yeum gun-jae|请求借钥匙|动词|忘带漏做|动作
khaaw-song-fai-iik-khrang|ขอส่งไฟล์อีกครั้ง|khaaw song fai iik khrang|请求重新发文件|动词|忘带漏做|动作
khreuuang-sia|เครื่องเสีย|khreuuang siia|机器坏了|短语|机器故障|问题
khreuuang-khit-ngoen-sia|เครื่องคิดเงินเสีย|khreuuang khit ngoen siia|收银机坏了|短语|机器故障|问题
khreuuang-phim-sia|เครื่องพิมพ์เสีย|khreuuang phim siia|打印机坏了|短语|机器故障|问题
khawm-khaang|คอมค้าง|khaawm khaang|电脑卡住|短语|机器故障|问题
internet-lut|อินเทอร์เน็ตหลุด|in-thoe-net lut|网络断了|短语|机器故障|问题
wifi-mai-dai|ไวไฟไม่ได้|wai-fai mai dai|无线网不能用|短语|机器故障|问题
rabop-lom|ระบบล่ม|ra-bop lom|系统崩了|短语|机器故障|问题
app-chai-mai-dai|แอปใช้ไม่ได้|aep chai mai dai|应用不能用|短语|机器故障|问题
fai-dap|ไฟดับ|fai dap|停电|短语|机器故障|问题
khreuuang-mai-dtid|เครื่องไม่ติด|khreuuang mai dtit|机器启动不了|短语|机器故障|问题
saai-fai-luam|สายไฟหลวม|saai fai luam|电线松了|短语|机器故障|问题
restart-khreuang|รีสตาร์ตเครื่อง|rii-sa-dtaat khreuuang|重启机器|动词|简单处理|动作
jaeng-faai-it|แจ้งฝ่ายไอที|jaeng faai ai-thii|通知IT部门|动词|简单处理|动作
riiak-chang|เรียกช่าง|riiak chang|叫维修师傅|动词|简单处理|动作
khian-bpaai-sia|เขียนป้ายเสีย|khiian bpaai siia|写故障牌|动词|简单处理|动作
chai-khreuang-samrawng|ใช้เครื่องสำรอง|chai khreuuang sam-raawng|使用备用机器|动词|简单处理|动作
luuk-khaa-raw-naan|ลูกค้ารอนาน|luuk-khaa raaw naan|客户等太久|短语|客户等待|问题
luuk-khaa-bon|ลูกค้าบ่น|luuk-khaa bon|客户抱怨|短语|客户等待|问题
luuk-khaa-rip|ลูกค้ารีบ|luuk-khaa riip|客户赶时间|短语|客户等待|问题
khon-yuea|คนเยอะ|khon yoe|人很多|短语|客户等待|问题
khiu-yaao|คิวยาว|khiu yaao|队伍很长|短语|客户等待|问题
bo-rikaan-chaa|บริการช้า|baaw-ri-gaan chaa|服务慢|短语|客户等待|问题
khaaw-thoot-luuk-khaa|ขอโทษลูกค้า|khaaw-thoot luuk-khaa|向客户道歉|动词|客户等待|动作
jaeng-wee-laa-raw|แจ้งเวลารอ|jaeng wee-laa raaw|告知等待时间|动词|客户等待|动作
hai-luuk-khaa-nang-raw|ให้ลูกค้านั่งรอ|hai luuk-khaa nang raaw|请客户坐着等|动词|客户等待|动作
riiak-khiu|เรียกคิว|riiak khiu|叫号|动词|客户等待|动作
chat-khiu|จัดคิว|jat khiu|安排队列|动词|客户等待|动作
chuai-rap-luuk-khaa|ช่วยรับลูกค้า|chuai rap luuk-khaa|帮忙接待客户|动词|客户等待|动作
ga-chon-gan|กะชนกัน|ga chon gan|班次撞了|短语|排班冲突|问题
dtaraang-ga-phit|ตารางกะผิด|dtaa-raang ga phit|班表错误|短语|排班冲突|问题
mai-mii-khon-thaen|ไม่มีคนแทน|mai mii khon thaen|没有人替班|短语|排班冲突|问题
khaaw-bplian-ga|ขอเปลี่ยนกะ|khaaw bplian ga|请求换班|动词|排班冲突|动作
khaaw-laek-ga|ขอแลกกะ|khaaw laek ga|请求调换班次|动词|排班冲突|动作
rap-ga-thaen|รับกะแทน|rap ga thaen|代替上班|动词|排班冲突|动作
ga-chao|กะเช้า|ga chaao|早班|名词|排班冲突|排班
ga-baai|กะบ่าย|ga baai|下午班|名词|排班冲突|排班
ga-yen|กะเย็น|ga yen|晚班|名词|排班冲突|排班
ga-deuk|กะดึก|ga deuk|夜班|名词|排班冲突|排班
wan-yut-chon-gan|วันหยุดชนกัน|wan yut chon gan|休息日冲突|短语|排班冲突|问题
khaaw-yut|ขอหยุด|khaaw yut|请求休息|动词|排班冲突|动作
khaaw-khao-ga-phoem|ขอเข้ากะเพิ่ม|khaaw khao ga phoem|请求加班次|动词|排班冲突|动作
song-dtaaw-mai-chat|ส่งต่อไม่ชัด|song dtaaw mai chat|交接不清|短语|交接不清|问题
khui-gan-mai-khrop|คุยกันไม่ครบ|khui gan mai khrop|沟通不完整|短语|交接不清|问题
mai-mii-kham-a-thi-baai|ไม่มีคำอธิบาย|mai mii kham a-thi-baai|没有说明|短语|交接不清|问题
mai-ruu-ngaan-dtaaw|ไม่รู้งานต่อ|mai ruu ngaan dtaaw|不知道后续工作|短语|交接不清|问题
fai-mai-dai-song|ไฟล์ไม่ได้ส่ง|fai mai dai song|文件没有发送|短语|交接不清|问题
khaaw-muun-mai-khrop|ข้อมูลไม่ครบ|khaaw-muun mai khrop|资料不完整|短语|交接不清|问题
saruup-ngaan|สรุปงาน|sa-ruup ngaan|总结工作|动词|交接不清|动作
song-dtaaw-ngaan|ส่งต่องาน|song dtaaw ngaan|转交工作|动词|交接不清|动作
rap-chuang-dtaaw|รับช่วงต่อ|rap chuang dtaaw|接手后续|动词|交接不清|动作
khian-note-wai|เขียนโน้ตไว้|khiian noot wai|写备注留下|动词|交接不清|动作
song-raai-la-iat|ส่งรายละเอียด|song raai-la-iat|发送详情|动词|交接不清|动作
thaam-iik-khrang|ถามอีกครั้ง|thaam iik khrang|再问一次|动词|交接不清|动作
yeun-yan-ngaan|ยืนยันงาน|yeun-yan ngaan|确认任务|动词|交接不清|动作
khaaw-hua-naa-chuai|ขอหัวหน้าช่วย|khaaw hua-naa chuai|请主管帮忙|动词|请求主管|动作
jaeng-hua-naa|แจ้งหัวหน้า|jaeng hua-naa|通知主管|动词|请求主管|动作
thaam-hua-naa|ถามหัวหน้า|thaam hua-naa|问主管|动词|请求主管|动作
khaaw-kham-nae-nam|ขอคำแนะนำ|khaaw kham-nae-nam|请求建议|动词|请求主管|动作
khaaw-hua-naa-dtruat|ขอหัวหน้าตรวจ|khaaw hua-naa dtruat|请主管检查|动词|请求主管|动作
khaaw-hua-naa-dtat-sin-jai|ขอหัวหน้าตัดสินใจ|khaaw hua-naa dtat-sin-jai|请主管决定|动词|请求主管|动作
khaaw-khon-phoem|ขอคนเพิ่ม|khaaw khon phoem|请求加人手|动词|请求主管|动作
khaaw-wee-laa-phoem|ขอเวลาเพิ่ม|khaaw wee-laa phoem|请求更多时间|动词|请求主管|动作
khaaw-yok-wen|ขอยกเว้น|khaaw yok-wen|请求例外处理|动词|请求主管|动作
bpanhaa-dtaaw-naa|ปัญหาต่อหน้า|bpan-haa dtaaw naa|现场问题|名词|简单处理|问题
tham-mai-than|ทำไม่ทัน|tham mai than|做不完|短语|简单处理|问题
ngaan-lon-meu|งานล้นมือ|ngaan lon meu|工作忙不过来|短语|简单处理|问题
khwam-khao-jai-phit|ความเข้าใจผิด|khwaam khao-jai phit|误会|名词|简单处理|问题
gae-bpanhaa-chua-khraao|แก้ปัญหาชั่วคราว|gae bpan-haa chua-khraao|临时解决问题|动词|简单处理|动作
tham-dtaam-khan-dtaawn|ทำตามขั้นตอน|tham dtaam khan-dtaawn|按步骤处理|动词|简单处理|动作
jaeng-nai-glum|แจ้งในกลุ่ม|jaeng nai glum|在群里通知|动词|简单处理|动作
song-ruup-bpanhaa|ส่งรูปปัญหา|song ruup bpan-haa|发送问题照片|动词|简单处理|动作
thaai-video|ถ่ายวิดีโอ|thaai wi-dii-oo|拍视频|动词|简单处理|动作
jot-bpanhaa|จดปัญหา|jot bpan-haa|记录问题|动词|简单处理|动作
`;

export const VOCABULARY_EXPANSION_A2_SIMPLE_WORKPLACE_PROBLEMS_01: VocabularyExpansionA2SimpleWorkplaceProblemsCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
