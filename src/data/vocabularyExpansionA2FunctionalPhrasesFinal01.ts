type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "请求" | "道歉" | "解释" | "确认" | "建议" | "拒绝" | "表达意见" | "不确定";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2FunctionalPhrasesFinalCandidate = {
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
const SOURCE_REFS = ["thai-frequency", "thai-a2-functional-phrases-final-01", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `ถ้าต้องคุยอย่างสุภาพ ฉันพูดว่า${row.thai}ได้`,
    roman: `thaa dtawng khui yaang su-phaap chan phuut waa ${row.roman} dai`,
    chinese: `如果需要礼貌沟通，我可以说“${row.chinese}”。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2FunctionalPhrasesFinalCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 是 A2 对话中用于${row.theme}的礼貌功能短语。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "用法", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，语气和用途不同。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["本批用于 A2 功能短语最终补漏，覆盖请求、道歉、解释、确认、建议、拒绝、表达意见和不确定。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
khaaw-rap-ruu-noi|ขอรับรู้หน่อย|khaaw rap-ruu naawy|请让我了解一下|短语|请求|了解
khaaw-ruu-raai-la-iat|ขอรู้รายละเอียด|khaaw ruu raai-la-iiat|想知道细节|短语|请求|了解
khaaw-ruu-gaawn|ขอรู้ก่อน|khaaw ruu gaawn|想先知道|短语|请求|了解
khaaw-duu-khaaw-muun|ขอดูข้อมูล|khaaw duu khaaw-muun|请让我看资料|短语|请求|资料
khaaw-duu-raai-gaan|ขอดูรายการ|khaaw duu raai-gaan|请让我看清单|短语|请求|资料
khaaw-duu-tua-yaang|ขอดูตัวอย่าง|khaaw duu dtua-yaang|请让我看例子|短语|请求|例子
khaaw-tham-duai-tua-eng|ขอทำด้วยตัวเอง|khaaw tham duai dtua-eng|请让我自己做|短语|请求|动作
khaaw-laawng-gaawn|ขอลองก่อน|khaaw laawng gaawn|请让我先试试|短语|请求|尝试
khaaw-laawng-iik-thii|ขอลองอีกที|khaaw laawng iik thii|请让我再试一次|短语|请求|尝试
khaaw-welaa-noi|ขอเวลาหน่อย|khaaw wee-laa naawy|请给我一点时间|短语|请求|时间
khaaw-welaa-khit|ขอเวลาคิด|khaaw wee-laa khit|请给我时间想想|短语|请求|思考
khaaw-welaa-dtriiam|ขอเวลาเตรียม|khaaw wee-laa dtriiam|请给我时间准备|短语|请求|准备
khaaw-khuam-chuai-luea|ขอความช่วยเหลือ|khaaw khwaam chuai-luea|请求帮助|短语|请求|帮助
khaaw-kham-nae-nam|ขอคำแนะนำ|khaaw kham nae-nam|请求建议|短语|请求|建议
khaaw-kham-dtaawp|ขอคำตอบ|khaaw kham dtaawp|请求答复|短语|请求|回答
khaaw-saap|ขอทราบ|khaaw saap|想请问|短语|请求|礼貌
rop-guan-baawk-noi|รบกวนบอกหน่อย|rop-guan baawk naawy|麻烦告诉我一下|短语|请求|礼貌
rop-guan-chuai-noi|รบกวนช่วยหน่อย|rop-guan chuai naawy|麻烦帮忙一下|短语|请求|礼貌
rop-guan-raw-noi|รบกวนรอหน่อย|rop-guan raaw naawy|麻烦等一下|短语|请求|礼貌
rop-guan-song-hai|รบกวนส่งให้|rop-guan song hai|麻烦发给我|短语|请求|礼貌
khaaw-anuyaat-khao|ขออนุญาตเข้า|khaaw a-nu-yaat khao|请允许我进去|短语|请求|许可
khaaw-anuyaat-aawk|ขออนุญาตออก|khaaw a-nu-yaat aawk|请允许我出去|短语|请求|许可
khaaw-anuyaat-thaam|ขออนุญาตถาม|khaaw a-nu-yaat thaam|请允许我问一下|短语|请求|许可
khaaw-anuyaat-thai-ruup|ขออนุญาตถ่ายรูป|khaaw a-nu-yaat thaai ruup|请允许我拍照|短语|请求|许可
khaaw-thoot-thii-maa-sai|ขอโทษที่มาสาย|khaaw-thoot thii maa saai|抱歉来晚了|短语|道歉|迟到
khaaw-thoot-thii-hai-raw|ขอโทษที่ให้รอ|khaaw-thoot thii hai raaw|抱歉让你等|短语|道歉|等待
khaaw-thoot-thii-rop-guan|ขอโทษที่รบกวน|khaaw-thoot thii rop-guan|抱歉打扰了|短语|道歉|打扰
khaaw-thoot-thii-tham-phit|ขอโทษที่ทำผิด|khaaw-thoot thii tham phit|抱歉做错了|短语|道歉|错误
khaaw-thoot-thii-luem|ขอโทษที่ลืม|khaaw-thoot thii leum|抱歉忘了|短语|道歉|遗忘
khaaw-thoot-thii-song-chaa|ขอโทษที่ส่งช้า|khaaw-thoot thii song chaa|抱歉发晚了|短语|道歉|延迟
khaaw-thoot-thii-dtaawp-chaa|ขอโทษที่ตอบช้า|khaaw-thoot thii dtaawp chaa|抱歉回复晚了|短语|道歉|回复
khaaw-thoot-thii-mai-saduak|ขอโทษที่ไม่สะดวก|khaaw-thoot thii mai sa-duak|抱歉不方便|短语|道歉|不便
khaaw-thoot-thii-mai-mee-welaa|ขอโทษที่ไม่มีเวลา|khaaw-thoot thii mai mii wee-laa|抱歉没时间|短语|道歉|时间
khaaw-thoot-thii-tham-hai-yung|ขอโทษที่ทำให้ยุ่ง|khaaw-thoot thii tham hai yung|抱歉给你添麻烦|短语|道歉|麻烦
khaaw-phuut-dtrong-dtrong|ขอพูดตรง ๆ|khaaw phuut dtrong dtrong|我直说一下|短语|解释|开场
khaaw-a-thi-baai-san-san|ขออธิบายสั้น ๆ|khaaw a-thi-baai san san|我简短解释一下|短语|解释|解释
khaaw-a-thi-baai-ngai-ngai|ขออธิบายง่าย ๆ|khaaw a-thi-baai ngaai ngaai|我简单解释一下|短语|解释|解释
ruueang-kheu-baep-nii|เรื่องคือแบบนี้|rueang kheu baaep nii|事情是这样的|短语|解释|说明
het-phon-kheu|เหตุผลคือ|heet-phon kheu|原因是|短语|解释|原因
phraw-waa-wan-nii|เพราะว่าวันนี้|phraw waa wan nii|因为今天|短语|解释|原因
phraw-waa-mai-wang|เพราะว่าไม่ว่าง|phraw waa mai waang|因为没空|短语|解释|原因
phraw-waa-mai-sabai|เพราะว่าไม่สบาย|phraw waa mai sa-baai|因为身体不舒服|短语|解释|原因
mai-dai-loem|ไม่ได้ลืม|mai dai leum|不是忘了|短语|解释|澄清
mai-dai-jong-jai|ไม่ได้จงใจ|mai dai jong-jai|不是故意的|短语|解释|澄清
mai-dai-bpen-baep-nan|ไม่ได้เป็นแบบนั้น|mai dai bpen baaep nan|不是那样的|短语|解释|澄清
khwam-jing-kheu|ความจริงคือ|khwaam jing kheu|实际情况是|短语|解释|澄清
dtawng-baawk-gaawn-wa|ต้องบอกก่อนว่า|dtawng baawk gaawn waa|要先说明的是|短语|解释|开场
yang-mai-samret|ยังไม่สำเร็จ|yang mai sam-ret|还没完成|短语|解释|进度
tham-dai-khae-nii|ทำได้แค่นี้|tham dai khae nii|只能做到这里|短语|解释|限制
tham-dai-thao-nii|ทำได้เท่านี้|tham dai thao nii|只能做到这些|短语|解释|限制
khaaw-yeun-yan-wa|ขอยืนยันว่า|khaaw yeun-yan waa|我确认一下|短语|确认|确认
khaaw-check-iik-thii|ขอเช็กอีกที|khaaw chek iik thii|我再查一次|短语|确认|核对
khaaw-thuan-iik-thii|ขอทวนอีกที|khaaw thuan iik thii|我再复述一次|短语|确认|复述
thuan-hai-fang|ทวนให้ฟัง|thuan hai fang|复述给你听|短语|确认|复述
dtrong-nii-thuk-mai|ตรงนี้ถูกไหม|dtrong nii thuuk mai|这里对吗|短语|确认|核对
khaw-mun-thuk-mai|ข้อมูลถูกไหม|khaaw-muun thuuk mai|资料对吗|短语|确认|核对
welaa-nii-thuk-mai|เวลานี้ถูกไหม|wee-laa nii thuuk mai|这个时间对吗|短语|确认|时间
jamnuan-nii-thuk-mai|จำนวนนี้ถูกไหม|jam-nuan nii thuuk mai|这个数量对吗|短语|确认|数量
chue-nii-thuk-mai|ชื่อนี้ถูกไหม|cheu nii thuuk mai|这个名字对吗|短语|确认|名字
thii-yuu-nii-thuk-mai|ที่อยู่นี้ถูกไหม|thii-yuu nii thuuk mai|这个地址对吗|短语|确认|地址
dtrong-gan-laeo|ตรงกันแล้ว|dtrong gan laeo|已经一致了|短语|确认|一致
mai-dtrong-kan-yuu|ไม่ตรงกันอยู่|mai dtrong gan yuu|还是不一致|短语|确认|一致
khue-baep-nii-chai-mai|คือแบบนี้ใช่ไหม|kheu baaep nii chai mai|是这样对吗|短语|确认|确认
ao-baep-nii-chai-mai|เอาแบบนี้ใช่ไหม|ao baaep nii chai mai|就这样可以吗|短语|确认|确认
laawng-tham-baep-nii|ลองทำแบบนี้|laawng tham baaep nii|试着这样做|短语|建议|建议
laawng-duu-iik-thii|ลองดูอีกที|laawng duu iik thii|再试试看|短语|建议|尝试
laawng-check-gaawn|ลองเช็กก่อน|laawng chek gaawn|先查查看|短语|建议|核对
laawng-thaam-khon-uen|ลองถามคนอื่น|laawng thaam khon uen|试着问别人|短语|建议|询问
laawng-bplian-withi|ลองเปลี่ยนวิธี|laawng bplian wi-thii|试着换方法|短语|建议|方法
laawng-bplian-welaa|ลองเปลี่ยนเวลา|laawng bplian wee-laa|试着换时间|短语|建议|时间
khuan-phak-gaawn|ควรพักก่อน|khuan phak gaawn|应该先休息|短语|建议|建议
khuan-tham-thii-la-khan|ควรทำทีละขั้น|khuan tham thii la khan|应该一步一步做|短语|建议|方法
khuan-thaam-hai-chat|ควรถามให้ชัด|khuan thaam hai chat|应该问清楚|短语|建议|沟通
khuan-jot-wai|ควรจดไว้|khuan jot wai|应该记下来|短语|建议|记录
bpai-duai-gan-dii-mai|ไปด้วยกันดีไหม|bpai duai gan dii mai|一起去好吗|短语|建议|邀请
tham-phrueng-nii-dii-mai|ทำพรุ่งนี้ดีไหม|tham phrung-nii dii mai|明天做好吗|短语|建议|时间
phak-sak-khruu-dii-mai|พักสักครู่ดีไหม|phak sak khruu dii mai|休息一会儿好吗|短语|建议|休息
mai-saduak-jing-jing|ไม่สะดวกจริง ๆ|mai sa-duak jing jing|真的不方便|短语|拒绝|拒绝
tham-mai-dai-jing-jing|ทำไม่ได้จริง ๆ|tham mai dai jing jing|真的做不了|短语|拒绝|拒绝
bpai-mai-dai|ไปไม่ได้|bpai mai dai|去不了|短语|拒绝|拒绝
rap-mai-dai|รับไม่ได้|rap mai dai|接不了|短语|拒绝|拒绝
yang-rap-mai-dai|ยังรับไม่ได้|yang rap mai dai|暂时接不了|短语|拒绝|拒绝
khong-mai-dai|คงไม่ได้|khong mai dai|可能不行|短语|拒绝|委婉
khong-mai-saduak|คงไม่สะดวก|khong mai sa-duak|可能不方便|短语|拒绝|委婉
khaaw-mai-ao-gaawn|ขอไม่เอาก่อน|khaaw mai ao gaawn|先不要|短语|拒绝|委婉
khaaw-mai-rap-gaawn|ขอไม่รับก่อน|khaaw mai rap gaawn|先不接受|短语|拒绝|委婉
khaaw-khit-duu-gaawn|ขอคิดดูก่อน|khaaw khit duu gaawn|让我先考虑看看|短语|拒绝|缓冲
khit-waa-dii|คิดว่าดี|khit waa dii|觉得好|短语|表达意见|意见
khit-waa-yang-mai-dii|คิดว่ายังไม่ดี|khit waa yang mai dii|觉得还不够好|短语|表达意见|意见
khit-waa-sa-duak|คิดว่าสะดวก|khit waa sa-duak|觉得方便|短语|表达意见|意见
khit-waa-mai-saduak|คิดว่าไม่สะดวก|khit waa mai sa-duak|觉得不方便|短语|表达意见|意见
duu-muean-oke|ดูเหมือนโอเค|duu meuan o-khee|看起来可以|短语|表达意见|看法
duu-muean-yang-mai-phrom|ดูเหมือนยังไม่พร้อม|duu meuan yang mai phraawm|看起来还没准备好|短语|表达意见|看法
samrap-chan|สำหรับฉัน|sam-rap chan|对我来说|短语|表达意见|角度
thaam-chan-na|ถามฉันนะ|thaam chan na|如果问我的话|短语|表达意见|角度
chan-hen-waa|ฉันเห็นว่า|chan hen waa|我认为|短语|表达意见|意见
chan-khit-baep-nii|ฉันคิดแบบนี้|chan khit baaep nii|我是这样想的|短语|表达意见|意见
mai-nae-jai-loei|ไม่แน่ใจเลย|mai nae-jai loei|完全不确定|短语|不确定|不确定
yang-mai-nae-jai|ยังไม่แน่ใจ|yang mai nae-jai|还不确定|短语|不确定|不确定
mai-khoi-nae-jai|ไม่ค่อยแน่ใจ|mai khaawy nae-jai|不太确定|短语|不确定|不确定
at-ja-chai|อาจจะใช่|aat ja chai|可能是|短语|不确定|可能
at-ja-mai-chai|อาจจะไม่ใช่|aat ja mai chai|可能不是|短语|不确定|可能
khong-chai|คงใช่|khong chai|应该是|短语|不确定|推测
khong-mai-chai|คงไม่ใช่|khong mai chai|应该不是|短语|不确定|推测
yang-bawk-mai-dai|ยังบอกไม่ได้|yang baawk mai dai|还不能说|短语|不确定|未知
yang-dtaawp-mai-dai|ยังตอบไม่ได้|yang dtaawp mai dai|还不能回答|短语|不确定|未知
dtong-duu-gaawn|ต้องดูก่อน|dtawng duu gaawn|得先看看|短语|不确定|观察
`;

export const VOCABULARY_EXPANSION_A2_FUNCTIONAL_PHRASES_FINAL_01: VocabularyExpansionA2FunctionalPhrasesFinalCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
