type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "吃饭问候" | "回家时间" | "买东西" | "照顾家人" | "家里安排" | "亲属问候" | "家务帮忙" | "日常提醒";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2BasicFamilyConversationsCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-basic-family-conversations-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw.trim().split("\n").map((line) => {
    const [id, thai, roman, chinese, partOfSpeech, theme, tag] = line.split("|").map((part) => part.trim());
    return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, tag };
  });
}

function makeExample(row: Row): Example {
  return {
    thai: `ที่บ้านเราคุยเรื่อง${row.thai}หลังอาหารเย็น`,
    roman: `thii baan rao khui reuuang ${row.roman} lang aa-haan yen`,
    chinese: `在家里，我们晚饭后会聊“${row.chinese}”。`,
  };
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2BasicFamilyConversationsCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [makeExample(row)], usageNotesZh: [`${row.thai} 常用于家庭日常对话、问候、安排家务或照顾家人。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，家庭对话中要注意对象、时间和语气。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["家人之间说话可短一些，但请求帮忙时加 ช่วย、หน่อย、ได้ไหม 会更自然。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
gin-khaao-ruu-yang|กินข้าวหรือยัง|gin khaao reu yang|吃饭了吗|短语|吃饭问候|问候
gin-khaao-laeo|กินข้าวแล้ว|gin khaao laeo|已经吃饭了|短语|吃饭问候|回应
yang-mai-dai-gin|ยังไม่ได้กิน|yang mai dai gin|还没吃|短语|吃饭问候|回应
gin-arai-maa|กินอะไรมา|gin a-rai maa|吃了什么|短语|吃饭问候|询问
gin-khaao-thii-baan|กินข้าวที่บ้าน|gin khaao thii baan|在家吃饭|动词|吃饭问候|吃饭
gin-khaao-nok-baan|กินข้าวนอกบ้าน|gin khaao naawk baan|在外面吃饭|动词|吃饭问候|吃饭
tham-aa-haan-yen|ทำอาหารเย็น|tham aa-haan yen|做晚饭|动词|吃饭问候|做饭
aa-haan-phrom-laeo|อาหารพร้อมแล้ว|aa-haan phraawm laeo|饭好了|短语|吃饭问候|吃饭
maa-gin-khaao|มากินข้าว|maa gin khaao|来吃饭|短语|吃饭问候|提醒
gai-gin-khaao|ใกล้กินข้าว|glai gin khaao|快到吃饭时间|短语|吃饭问候|提醒
gep-khaao-wai|เก็บข้าวไว้|gep khaao wai|留饭|动词|吃饭问候|吃饭
un-khaao-hai|อุ่นข้าวให้|un khaao hai|帮忙热饭|动词|吃饭问候|帮忙
laang-jaan|ล้างจาน|laang jaan|洗碗|动词|家务帮忙|家务
chuai-laang-jaan|ช่วยล้างจาน|chuai laang jaan|帮忙洗碗|动词|家务帮忙|帮忙
gep-to-aa-haan|เก็บโต๊ะอาหาร|gep dto aa-haan|收拾餐桌|动词|家务帮忙|家务
ja-glap-gii-mong|จะกลับกี่โมง|ja glap gii moong|几点回来|短语|回家时间|询问
glap-baan-gii-mong|กลับบ้านกี่โมง|glap baan gii moong|几点回家|短语|回家时间|询问
glap-reo|กลับเร็ว|glap reo|早回|动词|回家时间|时间
glap-chaa|กลับช้า|glap chaa|晚回|动词|回家时间|时间
glap-deuk|กลับดึก|glap deuk|很晚回家|动词|回家时间|时间
thung-baan-laeo|ถึงบ้านแล้ว|theung baan laeo|到家了|短语|回家时间|报平安
yang-mai-thung-baan|ยังไม่ถึงบ้าน|yang mai theung baan|还没到家|短语|回家时间|报平安
gamlang-glap|กำลังกลับ|gam-lang glap|正在回来|短语|回家时间|路上
rot-dtit|รถติด|rot dtit|堵车|短语|回家时间|路上
raw-thii-baan|รอที่บ้าน|raaw thii baan|在家等|动词|回家时间|等待
thoo-maa-muea-thung|โทรมาเมื่อถึง|thoo maa meua theung|到了打电话|短语|回家时间|提醒
song-khaaw-khwaam-maa|ส่งข้อความมา|song khaaw-khwaam maa|发消息来|动词|回家时间|提醒
chuai-seu-khaawng|ช่วยซื้อของ|chuai seu khaawng|帮忙买东西|动词|买东西|帮忙
seu-khaao|ซื้อข้าว|seu khaao|买饭|动词|买东西|购物
seu-nom|ซื้อนม|seu nom|买牛奶|动词|买东西|购物
seu-khai|ซื้อไข่|seu khai|买鸡蛋|动词|买东西|购物
seu-phak|ซื้อผัก|seu phak|买蔬菜|动词|买东西|购物
seu-phonlamai|ซื้อผลไม้|seu phon-la-maai|买水果|动词|买东西|购物
seu-yaa|ซื้อยา|seu yaa|买药|动词|买东西|购物
seu-khaawng-chai|ซื้อของใช้|seu khaawng-chai|买日用品|动词|买东西|购物
seu-khaawng-khao-baan|ซื้อของเข้าบ้าน|seu khaawng khao baan|买家用东西|动词|买东西|购物
ao-a-rai-mai|เอาอะไรไหม|ao a-rai mai|要带什么吗|短语|买东西|询问
khaat-a-rai|ขาดอะไร|khaat a-rai|缺什么|短语|买东西|询问
mee-a-rai-tong-seu|มีอะไรต้องซื้อ|mii a-rai dtawng seu|有什么要买吗|短语|买东西|询问
jaai-ngoen-hai|จ่ายเงินให้|jaai ngoen hai|帮忙付钱|动词|买东西|帮忙
kheun-ngoen|คืนเงิน|kheun ngoen|还钱|动词|买东西|钱
du-lae-luuk|ดูแลลูก|duu-laae luuk|照顾孩子|动词|照顾家人|照顾
du-lae-dek|ดูแลเด็ก|duu-laae dek|照看小孩|动词|照顾家人|照顾
du-lae-phuu-yai|ดูแลผู้ใหญ่|duu-laae phuu-yai|照顾长辈|动词|照顾家人|照顾
du-lae-khun-yaa|ดูแลคุณยาย|duu-laae khun yaai|照顾外婆/奶奶|动词|照顾家人|照顾
du-lae-khun-dtaa|ดูแลคุณตา|duu-laae khun dtaa|照顾外公/爷爷|动词|照顾家人|照顾
phaa-luuk-bpai-rian|พาลูกไปเรียน|phaa luuk bpai riian|带孩子去上课|动词|照顾家人|孩子
rap-luuk|รับลูก|rap luuk|接孩子|动词|照顾家人|孩子
song-luuk|ส่งลูก|song luuk|送孩子|动词|照顾家人|孩子
hai-luuk-gin-khaao|ให้ลูกกินข้าว|hai luuk gin khaao|让孩子吃饭|动词|照顾家人|孩子
hai-luuk-naawn|ให้ลูกนอน|hai luuk naawn|让孩子睡觉|动词|照顾家人|孩子
bpawn-yaa|ป้อนยา|bpaawn yaa|喂药|动词|照顾家人|照顾
wat-khai|วัดไข้|wat khai|量体温|动词|照顾家人|健康
phaa-bpai-haa-maaw|พาไปหาหมอ|phaa bpai haa maaw|带去看医生|动词|照顾家人|健康
tham-gaan-baan-gab-luuk|ทำการบ้านกับลูก|tham gaan-baan gap luuk|陪孩子做作业|动词|照顾家人|孩子
aan-nangseu-hai-luuk|อ่านหนังสือให้ลูก|aan nang-seu hai luuk|读书给孩子听|动词|照顾家人|孩子
wang-phaen-khrawp-khrua|วางแผนครอบครัว|waang phaen khraawp-khrua|安排家庭计划|动词|家里安排|安排
ngaan-baan|งานบ้าน|ngaan baan|家务|名词|家务帮忙|家务
baeng-ngaan-baan|แบ่งงานบ้าน|baeng ngaan baan|分配家务|动词|家务帮忙|家务
tham-khwaam-sa-aat-baan|ทำความสะอาดบ้าน|tham khwaam-sa-aat baan|打扫家里|动词|家务帮忙|家务
sak-phaa|ซักผ้า|sak phaa|洗衣服|动词|家务帮忙|家务
dtaak-phaa|ตากผ้า|dtaak phaa|晾衣服|动词|家务帮忙|家务
gep-phaa|เก็บผ้า|gep phaa|收衣服|动词|家务帮忙|家务
reet-phaa|รีดผ้า|riit phaa|熨衣服|动词|家务帮忙|家务
thuu-baan|ถูบ้าน|thuu baan|拖地|动词|家务帮忙|家务
gwaat-baan|กวาดบ้าน|gwaat baan|扫地|动词|家务帮忙|家务
thing-kha-ya|ทิ้งขยะ|thing kha-ya|倒垃圾|动词|家务帮忙|家务
pit-fai|ปิดไฟ|bpit fai|关灯|动词|日常提醒|提醒
pit-pratu|ปิดประตู|bpit bpra-dtuu|关门|动词|日常提醒|提醒
lock-pratu|ล็อกประตู|lok bpra-dtuu|锁门|动词|日常提醒|提醒
poet-naa-taang|เปิดหน้าต่าง|bpoet naa-dtaang|开窗|动词|日常提醒|提醒
pit-naa-taang|ปิดหน้าต่าง|bpit naa-dtaang|关窗|动词|日常提醒|提醒
ya-leum|อย่าลืม|yaa leum|别忘了|短语|日常提醒|提醒
dtuean-duai|เตือนด้วย|dteuan duai|提醒一下|短语|日常提醒|提醒
phuk-phawn-baang|พักผ่อนบ้าง|phak-phaawn baang|休息一下|短语|亲属问候|关心
neuuai-mai|เหนื่อยไหม|neuuai mai|累不累|短语|亲属问候|关心
sa-bai-dii-mai|สบายดีไหม|sa-baai dii mai|身体好吗|短语|亲属问候|问候
khun-mae-pen-yang-rai|คุณแม่เป็นอย่างไร|khun mae bpen yaang-rai|妈妈怎么样|短语|亲属问候|问候
khun-phaw-pen-yang-rai|คุณพ่อเป็นอย่างไร|khun phaaw bpen yaang-rai|爸爸怎么样|短语|亲属问候|问候
khun-yaa-sabai-dii-mai|คุณยายสบายดีไหม|khun yaai sa-baai dii mai|外婆/奶奶身体好吗|短语|亲属问候|问候
khit-theung-baan|คิดถึงบ้าน|khit-theung baan|想家|动词|亲属问候|情感
thoo-haa-mae|โทรหาแม่|thoo haa mae|打给妈妈|动词|亲属问候|电话
thoo-haa-phaw|โทรหาพ่อ|thoo haa phaaw|打给爸爸|动词|亲属问候|电话
song-ruup-hai-khrawp-khrua|ส่งรูปให้ครอบครัว|song ruup hai khraawp-khrua|发照片给家人|动词|亲属问候|消息
bpai-yiam-yaat|ไปเยี่ยมญาติ|bpai yiiam yaat|去看亲戚|动词|亲属问候|亲属
yaat-phii-naawng|ญาติพี่น้อง|yaat phii naawng|亲戚家人|名词|亲属问候|亲属
wan-yut-khrawp-khrua|วันหยุดครอบครัว|wan yut khraawp-khrua|家庭休息日|名词|家里安排|安排
gin-khaao-phraawm-gan|กินข้าวพร้อมกัน|gin khaao phraawm gan|一起吃饭|动词|吃饭问候|家庭
duu-thii-wii-duai-gan|ดูทีวีด้วยกัน|duu thii-wii duai gan|一起看电视|动词|家里安排|家庭
bpai-talaat-duai-gan|ไปตลาดด้วยกัน|bpai dta-laat duai gan|一起去市场|动词|买东西|家庭
tham-aa-haan-duai-gan|ทำอาหารด้วยกัน|tham aa-haan duai gan|一起做饭|动词|吃饭问候|家庭
chuai-mae-tham-kap-khaao|ช่วยแม่ทำกับข้าว|chuai mae tham gap-khaao|帮妈妈做菜|动词|家务帮忙|帮忙
chuai-phaw-yok-khaawng|ช่วยพ่อยกของ|chuai phaaw yok khaawng|帮爸爸搬东西|动词|家务帮忙|帮忙
phaa-yaa-bpai-talaat|พายายไปตลาด|phaa yaai bpai dta-laat|带外婆/奶奶去市场|动词|照顾家人|照顾
phaa-dtaa-bpai-dern-len|พาตาไปเดินเล่น|phaa dtaa bpai doen len|带外公/爷爷去散步|动词|照顾家人|照顾
thoo-thaam-aa-gaan|โทรถามอาการ|thoo thaam aa-gaan|打电话问身体情况|动词|亲属问候|问候
song-khaaw-khwaam-ha-yaat|ส่งข้อความหาญาติ|song khaaw-khwaam haa yaat|发消息给亲戚|动词|亲属问候|消息
gin-yaa-ruu-yang|กินยาหรือยัง|gin yaa reu yang|吃药了吗|短语|照顾家人|健康
phak-phaw-mai|พักพอไหม|phak phaaw mai|休息够吗|短语|亲属问候|关心
mee-a-rai-hai-chuai-mai|มีอะไรให้ช่วยไหม|mii a-rai hai chuai mai|有什么要帮忙吗|短语|家务帮忙|帮忙
`;

export const VOCABULARY_EXPANSION_A2_BASIC_FAMILY_CONVERSATIONS_01: VocabularyExpansionA2BasicFamilyConversationsCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
