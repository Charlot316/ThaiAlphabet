type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "发消息" | "确认任务" | "交接协作" | "请求帮忙" | "反馈修改" | "通知同事" | "服务现场" | "时间进度";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2WorkCommunicationCandidate = {
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
  exampleThai: string;
  exampleRoman: string;
  exampleChinese: string;
  tag: string;
};

const SOURCE_REFS = ["thai-frequency", "thai-work-communication-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2WorkCommunicationCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于同事、主管、客户之间的简短工作沟通，可加时间、对象和任务内容。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，工作沟通中要分清通知、确认、请求和反馈。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["和同事说工作时，รับทราบ、ขอเช็กก่อน、ช่วยดูให้หน่อย 都很常用，语气直接但礼貌。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
song-khaaw-khwaam|ส่งข้อความ|song khaaw-khwaam|发消息|动词|发消息|ถ้ามีปัญหาเรื่องงาน กรุณาส่งข้อความมาหาฉันก่อนโทร|thaa mii bpan-haa reuuang ngaan ga-ru-naa song khaaw-khwaam maa haa chan gaawn thoo|如果工作有问题，请先发消息给我再打电话。|消息
dtaawp-khaaw-khwaam|ตอบข้อความ|dtaawp khaaw-khwaam|回复消息|动词|发消息|หัวหน้าตอบข้อความเร็วมากและบอกให้เริ่มงานได้เลย|hua-naa dtaawp khaaw-khwaam reo maak lae baawk hai roem ngaan dai loei|主管很快回复消息，并说可以开始工作了。|消息
aan-khaaw-khwaam-laeo|อ่านข้อความแล้ว|aan khaaw-khwaam laeo|已读消息|短语|发消息|เขาอ่านข้อความแล้ว แต่ยังไม่ได้ตอบเพราะกำลังประชุม|khao aan khaaw-khwaam laeo dtae yang mai dai dtaawp phraw gam-lang bpra-chum|他已读消息了，但还没回复，因为正在开会。|消息
yang-mai-dtaawp|ยังไม่ตอบ|yang mai dtaawp|还没回复|短语|发消息|ลูกค้ายังไม่ตอบ เราจึงยังส่งของไม่ได้|luuk-khaa yang mai dtaawp rao jeung yang song khaawng mai dai|客户还没回复，所以我们还不能发货。|消息
thoo-glap|โทรกลับ|thoo glap|回电话|动词|发消息|ถ้าฉันรับสายไม่ทัน จะโทรกลับหลังเลิกประชุม|thaa chan rap saai mai than ja thoo glap lang loek bpra-chum|如果我没来得及接电话，会在会议结束后回电话。|电话
rap-saai|รับสาย|rap saai|接电话|动词|发消息|ตอนนี้ฉันอยู่หน้างานและอาจรับสายไม่สะดวก|dtaawn-nii chan yuu naa-ngaan lae aat rap saai mai sa-duak|我现在在现场，可能不方便接电话。|电话
mai-sa-duak-rap-saai|ไม่สะดวกรับสาย|mai sa-duak rap saai|不方便接电话|短语|发消息|ขอโทษค่ะ ตอนนี้ไม่สะดวกรับสาย ขอคุยทางข้อความนะคะ|khaaw-thoot kha dtaawn-nii mai sa-duak rap saai khaaw khui thaang khaaw-khwaam na kha|不好意思，现在不方便接电话，请用消息沟通。|电话
song-tam-naeng|ส่งตำแหน่ง|song dtam-naeng|发送位置|动词|服务现场|ก่อนออกไปหน้างาน กรุณาส่งตำแหน่งให้ทีมขับรถ|gaawn aawk bpai naa-ngaan ga-ru-naa song dtam-naeng hai thiim khap rot|去现场前，请把位置发给司机团队。|现场
song-phaen-thii|ส่งแผนที่|song phaen-thii|发送地图|动词|服务现场|ลูกค้าส่งแผนที่มาให้ เราจึงหาทางไปได้ง่ายขึ้น|luuk-khaa song phaen-thii maa hai rao jeung haa thaang bpai dai ngaai kheun|客户把地图发来了，所以我们更容易找到路。|现场
song-ruup|ส่งรูป|song ruup|发送照片|动词|发消息|ช่างส่งรูปเครื่องที่เสียให้หัวหน้าดูก่อนซ่อม|chang song ruup khreuuang thii siia hai hua-naa duu gaawn saawm|师傅维修前把坏机器的照片发给主管看。|图片
thaai-ruup-naa-ngaan|ถ่ายรูปหน้างาน|thaai ruup naa-ngaan|拍现场照片|动词|服务现场|หลังติดตั้งเสร็จแล้ว กรุณาถ่ายรูปหน้างานเก็บไว้|lang dtit-dtang set laeo ga-ru-naa thaai ruup naa-ngaan gep wai|安装完成后，请拍现场照片留存。|现场
song-fai|ส่งไฟล์|song fai|发送文件|动词|发消息|ฉันส่งไฟล์ราคาใหม่ให้ทีมขายเมื่อเช้านี้|chan song fai raa-khaa mai hai thiim khaai meua chaao nii|今天早上我把新价格文件发给销售团队了。|文件
naep-fai|แนบไฟล์|naep fai|附上文件|动词|发消息|เวลาอีเมลหาลูกค้า อย่าลืมแนบไฟล์ใบเสนอราคา|wee-laa ii-meel haa luuk-khaa yaa leum naep fai bai sa-noe raa-khaa|给客户发邮件时，别忘了附上报价单文件。|文件
fai-poet-mai-dai|ไฟล์เปิดไม่ได้|fai bpoet mai dai|文件打不开|短语|发消息|ไฟล์เปิดไม่ได้ รบกวนส่งเป็นรูปภาพอีกครั้งได้ไหม|fai bpoet mai dai rop-guan song bpen ruup-phaap iik khrang dai mai|文件打不开，麻烦再发成图片可以吗？|文件
ling-khao-mai-dai|ลิงก์เข้าไม่ได้|ling khao mai dai|链接进不去|短语|发消息|ลิงก์เข้าไม่ได้ คุณช่วยส่งลิงก์ใหม่ให้หน่อยได้ไหม|ling khao mai dai khun chuai song ling mai hai naawy dai mai|链接进不去，你能帮忙发一个新链接吗？|链接
yaen-yan-ngaan|ยืนยันงาน|yeun-yan ngaan|确认任务|动词|确认任务|ก่อนเริ่มงานทุกครั้ง ทีมต้องยืนยันงานกับหัวหน้า|gaawn roem ngaan thuk khrang thiim dtawng yeun-yan ngaan gap hua-naa|每次开始工作前，团队都要和主管确认任务。|确认
rap-saap|รับทราบ|rap-saap|知悉了|短语|确认任务|หัวหน้าส่งงานมา ฉันตอบว่ารับทราบและจะทำวันนี้|hua-naa song ngaan maa chan dtaawp waa rap-saap lae ja tham wan-nii|主管发来任务，我回复说知悉了，今天会做。|确认
khao-jai-laeo|เข้าใจแล้ว|khao-jai laeo|明白了|短语|确认任务|หลังฟังคำอธิบาย ฉันบอกว่าเข้าใจแล้วและเริ่มทำงาน|lang fang kham a-thi-baai chan baawk waa khao-jai laeo lae roem tham ngaan|听完说明后，我说我明白了并开始工作。|确认
mai-nae-jai|ไม่แน่ใจ|mai nae-jai|不确定|短语|确认任务|ฉันไม่แน่ใจเรื่องเวลาส่งงาน จึงถามหัวหน้าอีกครั้ง|chan mai nae-jai reuuang wee-laa song ngaan jeung thaam hua-naa iik khrang|我不确定交工作的时间，所以又问了主管一次。|确认
khaaw-thaam-iik-khrang|ขอถามอีกครั้ง|khaaw thaam iik khrang|请再问一次|短语|确认任务|ขอถามอีกครั้งนะครับ งานนี้ต้องส่งก่อนเที่ยงใช่ไหม|khaaw thaam iik khrang na khrap ngaan nii dtawng song gaawn thiiang chai mai|我再问一下，这个任务要中午前提交，对吗？|确认
khaaw-ao-mai|ขอเอาใหม่|khaaw ao mai|请求重来|短语|反馈修改|ถ้าข้อมูลผิด ฉันขอเอาใหม่และส่งไฟล์ให้คืนนี้|thaa khaaw-muun phit chan khaaw ao mai lae song fai hai kheun nii|如果资料错了，我请求重做，今晚把文件发给你。|修改
khaaw-phuut-iik-thii|ขอพูดอีกที|khaaw phuut iik thii|请再说一遍|短语|确认任务|เสียงไม่ชัด ขอพูดอีกทีได้ไหมครับ|siiang mai chat khaaw phuut iik thii dai mai khrap|声音不清楚，可以请你再说一遍吗？|确认
saruup-ngaan|สรุปงาน|sa-ruup ngaan|总结任务|动词|确认任务|หลังคุยกับลูกค้าแล้ว ฉันสรุปงานส่งในกลุ่ม|lang khui gap luuk-khaa laeo chan sa-ruup ngaan song nai glum|和客户谈完后，我把任务总结发到群里。|总结
raai-gaan-ngaan|รายการงาน|raai-gaan ngaan|任务清单|名词|确认任务|รายการงานวันนี้มีสามข้อและทุกข้อไม่ยากมาก|raai-gaan ngaan wan-nii mii saam khaaw lae thuk khaaw mai yaak maak|今天的任务清单有三项，每项都不太难。|清单
ngaan-duan|งานด่วน|ngaan duan|紧急任务|名词|时间进度|งานด่วนนี้ต้องทำให้เสร็จก่อนร้านปิด|ngaan duan nii dtawng tham hai set gaawn raan bpit|这个紧急任务必须在店关门前完成。|进度
ngaan-mai-duan|งานไม่ด่วน|ngaan mai duan|不紧急的任务|名词|时间进度|งานไม่ด่วนเก็บไว้ทำพรุ่งนี้ได้ หลังจากส่งรายงานแล้ว|ngaan mai duan gep wai tham phrung-nii dai lang-jaak song raai-ngaan laeo|不紧急的任务可以等明天提交报告后再做。|进度
ngaan-wan-nii|งานวันนี้|ngaan wan-nii|今天的工作|名词|时间进度|งานวันนี้คือจัดของและโทรยืนยันเวลากับลูกค้า|ngaan wan-nii kheu jat khaawng lae thoo yeun-yan wee-laa gap luuk-khaa|今天的工作是整理物品并给客户打电话确认时间。|进度
ngaan-phrung-nii|งานพรุ่งนี้|ngaan phrung-nii|明天的工作|名词|时间进度|หัวหน้าส่งงานพรุ่งนี้มาให้ทีมดูตั้งแต่เย็นนี้|hua-naa song ngaan phrung-nii maa hai thiim duu dtang-dtae yen nii|主管今晚就把明天的工作发给团队看。|进度
gam-not-song|กำหนดส่ง|gam-not song|提交期限|名词|时间进度|กำหนดส่งของไฟล์นี้คือวันศุกร์ก่อนห้าโมงเย็น|gam-not song khaawng fai nii kheu wan-suk gaawn haa moong yen|这个文件的提交期限是星期五下午五点前。|期限
song-ngaan|ส่งงาน|song ngaan|提交工作|动词|时间进度|ฉันจะส่งงานให้หัวหน้าตรวจหลังอาหารกลางวัน|chan ja song ngaan hai hua-naa dtruat lang aa-haan glaang-wan|午饭后我会把工作提交给主管检查。|提交
ngaan-set-laeo|งานเสร็จแล้ว|ngaan set laeo|工作完成了|短语|时间进度|งานเสร็จแล้วครับ ผมส่งรูปและใบเสร็จให้แล้ว|ngaan set laeo khrap phom song ruup lae bai-set hai laeo|工作完成了，我已经把照片和收据发给你了。|进度
ngaan-yang-mai-set|งานยังไม่เสร็จ|ngaan yang mai set|工作还没完成|短语|时间进度|งานยังไม่เสร็จเพราะลูกค้ายังไม่ส่งข้อมูลมา|ngaan yang mai set phraw luuk-khaa yang mai song khaaw-muun maa|工作还没完成，因为客户还没发资料来。|进度
gam-lang-tham|กำลังทำ|gam-lang tham|正在做|短语|时间进度|ตอนนี้ฉันกำลังทำส่วนสุดท้ายและจะส่งก่อนบ่ายสอง|dtaawn-nii chan gam-lang tham suan sut-thaai lae ja song gaawn baai saawng|我现在正在做最后一部分，会在下午两点前提交。|进度
roem-ngaan|เริ่มงาน|roem ngaan|开始工作|动词|时间进度|ทีมเริ่มงานตอนเก้าโมงหลังประชุมสั้น ๆ|thiim roem ngaan dtaawn gaao moong lang bpra-chum san san|团队在简短会议后九点开始工作。|进度
tham-dtaaw|ทำต่อ|tham dtaaw|继续做|动词|时间进度|พักสิบนาทีแล้วเราจะทำต่อจนเสร็จ|phak sip naa-thii laeo rao ja tham dtaaw jon set|休息十分钟后，我们会继续做到完成。|进度
yut-phak|หยุดพัก|yut phak|暂停休息|动词|时间进度|ถ้าเหนื่อยมาก ให้หยุดพักก่อนแล้วค่อยทำต่อ|thaa neuuai maak hai yut phak gaawn laeo khaawy tham dtaaw|如果很累，就先暂停休息，然后再继续做。|进度
dtruat-ngaan|ตรวจงาน|dtruat ngaan|检查工作|动词|反馈修改|ก่อนส่งให้ลูกค้า หัวหน้าต้องตรวจงานรอบสุดท้าย|gaawn song hai luuk-khaa hua-naa dtawng dtruat ngaan raawp sut-thaai|发给客户前，主管需要最后检查一遍工作。|检查
gae-ngaan|แก้งาน|gae ngaan|修改工作|动词|反馈修改|ลูกค้าขอเปลี่ยนสี เราจึงต้องแก้งานเล็กน้อย|luuk-khaa khaaw bplian sii rao jeung dtawng gae ngaan lek naawy|客户要求换颜色，所以我们需要稍微修改工作。|修改
gae-laeo|แก้แล้ว|gae laeo|已经修改|短语|反馈修改|ส่วนที่ผิดฉันแก้แล้ว กรุณาช่วยตรวจอีกครั้ง|suan thii phit chan gae laeo ga-ru-naa chuai dtruat iik khrang|错误的部分我已经修改了，请帮忙再检查一次。|修改
dtawng-gae|ต้องแก้|dtawng gae|需要修改|短语|反馈修改|รูปนี้ยังต้องแก้เพราะชื่อร้านสะกดผิด|ruup nii yang dtawng gae phraw cheu raan sa-got phit|这张图还需要修改，因为店名拼错了。|修改
tham-dai-dii|ทำได้ดี|tham dai dii|做得好|短语|反馈修改|งานรอบนี้ทำได้ดีมาก ลูกค้าชอบและชมทีมเรา|ngaan raawp nii tham dai dii maak luuk-khaa chaawp lae chom thiim rao|这次工作做得很好，客户喜欢并称赞了我们的团队。|反馈
kham-hen|ความเห็น|khwaam-hen|意见|名词|反馈修改|ถ้ามีความเห็นเพิ่มเติม กรุณาส่งมาในกลุ่มก่อนเย็น|thaa mii khwaam-hen phoem-dtoem ga-ru-naa song maa nai glum gaawn yen|如果有补充意见，请在傍晚前发到群里。|反馈
kham-nae-nam|คำแนะนำ|kham-nae-nam|建议|名词|反馈修改|ขอบคุณสำหรับคำแนะนำ ฉันจะเอาไปปรับงาน|khaawp-khun sam-rap kham-nae-nam chan ja ao bpai bprap ngaan|谢谢你的建议，我会拿去调整工作。|反馈
tham-hai-riap-raawy|ทำให้เรียบร้อย|tham hai riap-raawy|处理妥当|动词|反馈修改|กรุณาทำให้เรียบร้อยก่อนส่งให้ลูกค้าตอนบ่าย|ga-ru-naa tham hai riap-raawy gaawn song hai luuk-khaa dtaawn baai|请在下午发给客户前处理妥当。|修改
riap-raawy-laeo|เรียบร้อยแล้ว|riap-raawy laeo|已经好了|短语|时间进度|เอกสารเรียบร้อยแล้ว คุณมารับได้ตั้งแต่บ่ายสาม|eek-ga-saan riap-raawy laeo khun maa rap dai dtang-dtae baai saam|文件已经好了，你下午三点起可以来取。|进度
jaeng-phuean-ruam-ngaan|แจ้งเพื่อนร่วมงาน|jaeng pheuan-ruam-ngaan|通知同事|动词|通知同事|ถ้าเปลี่ยนเวลา กรุณาแจ้งเพื่อนร่วมงานทุกคน|thaa bplian wee-laa ga-ru-naa jaeng pheuan-ruam-ngaan thuk khon|如果改时间，请通知所有同事。|通知
jaeng-hua-naa|แจ้งหัวหน้า|jaeng hua-naa|通知主管|动词|通知同事|เมื่อมีปัญหาที่หน้างาน ต้องแจ้งหัวหน้าก่อนตัดสินใจ|meua mii bpan-haa thii naa-ngaan dtawng jaeng hua-naa gaawn dtat-sin-jai|现场有问题时，决定前要先通知主管。|通知
jaeng-luuk-khaa|แจ้งลูกค้า|jaeng luuk-khaa|通知客户|动词|通知同事|ถ้าช่างไปช้า เราต้องแจ้งลูกค้าล่วงหน้า|thaa chang bpai chaa rao dtawng jaeng luuk-khaa luang-naa|如果师傅会晚到，我们要提前通知客户。|通知
jaeng-thiim|แจ้งทีม|jaeng thiim|通知团队|动词|通知同事|ผู้จัดการแจ้งทีมว่าเริ่มงานพรุ่งนี้ตอนสิบโมง|phuu-jat-gaan jaeng thiim waa roem ngaan phrung-nii dtaawn sip moong|经理通知团队明天十点开始工作。|通知
song-khao-glum|ส่งเข้ากลุ่ม|song khao glum|发到群里|动词|发消息|ข้อมูลนี้สำคัญ กรุณาส่งเข้ากลุ่มให้ทุกคนเห็น|khaaw-muun nii sam-khan ga-ru-naa song khao glum hai thuk khon hen|这个资料很重要，请发到群里让大家看到。|群聊
kui-suan-dtua|คุยส่วนตัว|khui suan-dtua|私聊|动词|发消息|เรื่องเงินเดือนควรคุยส่วนตัว ไม่ควรส่งในกลุ่ม|reuuang ngoen-deuan khuan khui suan-dtua mai khuan song nai glum|工资的事情应该私聊，不应该发到群里。|私聊
khaaw-khwaam-suan-dtua|ข้อความส่วนตัว|khaaw-khwaam suan-dtua|私信|名词|发消息|ฉันส่งเบอร์โทรของลูกค้าไปทางข้อความส่วนตัวแล้ว|chan song ber thoo khaawng luuk-khaa bpai thaang khaaw-khwaam suan-dtua laeo|我已经通过私信把客户电话号码发过去了。|私聊
phim-phit|พิมพ์ผิด|phim phit|打字错误|动词|反馈修改|ฉันพิมพ์ผิดหนึ่งคำในประกาศ จึงส่งข้อความแก้ไข|chan phim phit neung kham nai bpra-gaat jeung song khaaw-khwaam gae-khai|我在通知里打错了一个词，所以发了修改消息。|修改
gae-khai-khaaw-khwaam|แก้ไขข้อความ|gae-khai khaaw-khwaam|修改消息|动词|反馈修改|ถ้าข้อความยังไม่ชัด คุณควรแก้ไขข้อความก่อนส่ง|thaa khaaw-khwaam yang mai chat khun khuan gae-khai khaaw-khwaam gaawn song|如果消息还不清楚，你应该发送前先修改消息。|修改
khaaw-khwaam-mai-chat|ข้อความไม่ชัด|khaaw-khwaam mai chat|消息不清楚|短语|反馈修改|ข้อความไม่ชัด ทำให้ทีมเข้าใจงานไม่ตรงกัน|khaaw-khwaam mai chat tham hai thiim khao-jai ngaan mai dtrong gan|消息不清楚，导致团队对任务理解不一致。|沟通
khao-jai-dtrong-gan|เข้าใจตรงกัน|khao-jai dtrong gan|理解一致|短语|确认任务|ก่อนแยกกันทำงาน เราต้องเข้าใจตรงกันเรื่องเวลา|gaawn yaek gan tham ngaan rao dtawng khao-jai dtrong gan reuuang wee-laa|分开工作前，我们必须对时间理解一致。|确认
khao-jai-mai-dtrong-gan|เข้าใจไม่ตรงกัน|khao-jai mai dtrong gan|理解不一致|短语|确认任务|เมื่อเข้าใจไม่ตรงกัน เราควรคุยใหม่อย่างใจเย็น|meua khao-jai mai dtrong gan rao khuan khui mai yaang jai-yen|理解不一致时，我们应该冷静地重新沟通。|确认
bplian-phaen|เปลี่ยนแผน|bplian phaen|改变计划|动词|确认任务|ฝนตกหนัก เราจึงต้องเปลี่ยนแผนไปทำงานในออฟฟิศก่อน|fon dtok nak rao jeung dtawng bplian phaen bpai tham ngaan nai aawf-fit gaawn|雨下得很大，所以我们需要改计划，先在办公室工作。|计划
yok-loek-ngaan|ยกเลิกงาน|yok-loek ngaan|取消任务|动词|确认任务|ลูกค้าไม่ว่างวันนี้ จึงขอยกเลิกงานตอนบ่าย|luuk-khaa mai waang wan-nii jeung khaaw yok-loek ngaan dtaawn baai|客户今天没空，所以请求取消下午的任务。|计划
phoem-ngaan|เพิ่มงาน|phoem ngaan|增加任务|动词|确认任务|หัวหน้าเพิ่มงานอีกหนึ่งข้อ แต่ให้เวลามากขึ้น|hua-naa phoem ngaan iik neung khaaw dtae hai wee-laa maak kheun|主管又增加了一项任务，但给了更多时间。|计划
lot-ngaan|ลดงาน|lot ngaan|减少任务|动词|确认任务|วันนี้คนน้อย ผู้จัดการจึงลดงานบางส่วนให้ทีม|wan-nii khon naawy phuu-jat-gaan jeung lot ngaan baang suan hai thiim|今天人少，经理给团队减少了一部分任务。|计划
song-dtaaw-ngaan|ส่งต่องาน|song dtaaw ngaan|转交工作|动词|交接协作|ฉันต้องส่งต่องานให้กะเย็นก่อนกลับบ้าน|chan dtawng song dtaaw ngaan hai ga yen gaawn glap baan|回家前，我需要把工作转交给晚班。|交接
rap-chuang-dtaaw|รับช่วงต่อ|rap chuang dtaaw|接手后续|动词|交接协作|พรุ่งนี้น้องจะรับช่วงต่อและโทรหาลูกค้าแทนฉัน|phrung-nii naawng ja rap chuang dtaaw lae thoo haa luuk-khaa thaen chan|明天同事会接手后续，并替我给客户打电话。|交接
song-maawp-ngaan|ส่งมอบงาน|song maawp ngaan|交接工作|动词|交接协作|ก่อนลาออก เขาส่งมอบงานทั้งหมดให้เพื่อนร่วมทีม|gaawn laa-aawk khao song maawp ngaan thang-mot hai pheuan-ruam-thiim|离职前，他把全部工作交接给队友。|交接
faak-ngaan|ฝากงาน|faak ngaan|托付工作|动词|交接协作|ฉันฝากงานนี้กับพี่หนึ่งชั่วโมง เพราะต้องไปพบลูกค้า|chan faak ngaan nii gap phii neung chua-moong phraw dtawng bpai phop luuk-khaa|我把这项工作托给前辈一小时，因为要去见客户。|交接
faak-baawk|ฝากบอก|faak baawk|托人转告|动词|通知同事|ถ้าเจอหัวหน้า ฝากบอกว่าฉันจะเข้าประชุมช้า|thaa joe hua-naa faak baawk waa chan ja khao bpra-chum chaa|如果遇到主管，帮我转告我会晚点进会议。|通知
faak-jaeng|ฝากแจ้ง|faak jaeng|托人通知|动词|通知同事|ฉันไม่อยู่ที่โต๊ะ ฝากแจ้งทีมว่าลูกค้าโทรมาแล้ว|chan mai yuu thii dto faak jaeng thiim waa luuk-khaa thoo maa laeo|我不在座位上，麻烦通知团队客户已经来电了。|通知
plian-ga|เปลี่ยนกะ|bplian ga|换班|动词|交接协作|วันนี้พี่ขอเปลี่ยนกะกับฉันเพราะมีธุระด่วน|wan-nii phii khaaw bplian ga gap chan phraw mii thu-ra duan|今天前辈因为有急事，想和我换班。|排班
dta-raang-ga|ตารางกะ|dtaa-raang ga|班表|名词|交接协作|ตารางกะใหม่อยู่ในกลุ่ม กรุณาเช็กก่อนวันจันทร์|dtaa-raang ga mai yuu nai glum ga-ru-naa chek gaawn wan-jan|新班表在群里，请星期一前查看。|排班
khaaw-chuai|ขอช่วย|khaaw chuai|请求帮助|动词|请求帮忙|งานนี้เยอะมาก ฉันขอช่วยจากทีมอีกสองคน|ngaan nii yoe maak chan khaaw chuai jaak thiim iik saawng khon|这项工作很多，我向团队再请求两个人帮忙。|帮忙
chuai-duu-hai-naawy|ช่วยดูให้หน่อย|chuai duu hai naawy|帮忙看一下|短语|请求帮忙|ช่วยดูให้หน่อยได้ไหมว่าข้อมูลลูกค้าถูกหรือเปล่า|chuai duu hai naawy dai mai waa khaaw-muun luuk-khaa thuuk reu bplaao|能帮忙看一下客户资料对不对吗？|帮忙
chuai-dtruat-hai|ช่วยตรวจให้|chuai dtruat hai|帮忙检查|动词|请求帮忙|ก่อนส่งอีเมล ช่วยตรวจให้ฉันหนึ่งรอบได้ไหม|gaawn song ii-meel chuai dtruat hai chan neung raawp dai mai|发邮件前，可以帮我检查一遍吗？|帮忙
chuai-dtit-dtaaw|ช่วยติดต่อ|chuai dtit-dtaaw|帮忙联系|动词|请求帮忙|คุณช่วยติดต่อลูกค้าแทนฉันได้ไหม วันนี้ฉันติดประชุม|khun chuai dtit-dtaaw luuk-khaa thaen chan dai mai wan-nii chan dtit bpra-chum|你能替我联系客户吗？我今天有会议。|帮忙
chuai-jaeng|ช่วยแจ้ง|chuai jaeng|帮忙通知|动词|请求帮忙|ถ้าฉันไปถึงช้า ช่วยแจ้งหัวหน้าให้หน่อยนะ|thaa chan bpai theung chaa chuai jaeng hua-naa hai naawy na|如果我到得晚，请帮忙通知主管。|帮忙
chuai-song-fai|ช่วยส่งไฟล์|chuai song fai|帮忙发文件|动词|请求帮忙|คอมพิวเตอร์ฉันมีปัญหา ช่วยส่งไฟล์นี้ให้ลูกค้าได้ไหม|khaawm-phiu-dter chan mii bpan-haa chuai song fai nii hai luuk-khaa dai mai|我的电脑有问题，可以帮忙把这个文件发给客户吗？|帮忙
chuai-thaai-ruup|ช่วยถ่ายรูป|chuai thaai ruup|帮忙拍照|动词|请求帮忙|ช่วยถ่ายรูปใบเสร็จให้ชัดหน่อย เดี๋ยวฉันส่งให้บัญชี|chuai thaai ruup bai-set hai chat naawy diao chan song hai ban-chii|请帮忙把收据拍清楚一点，等下我发给财务。|帮忙
dtit-pra-chum|ติดประชุม|dtit bpra-chum|正在开会抽不开身|短语|时间进度|ตอนบ่ายฉันติดประชุม อาจตอบข้อความช้าหน่อย|dtaawn baai chan dtit bpra-chum aat dtaawp khaaw-khwaam chaa naawy|下午我有会议抽不开身，可能回复消息慢一点。|时间
bpra-chum-san-san|ประชุมสั้น ๆ|bpra-chum san san|短会|名词|确认任务|ก่อนเปิดร้าน เรามีประชุมสั้น ๆ เพื่อแบ่งงาน|gaawn bpoet raan rao mii bpra-chum san san phuea baeng ngaan|开店前，我们有个短会来分配工作。|会议
nat-khui|นัดคุย|nat khui|约时间沟通|动词|确认任务|ถ้าเรื่องนี้ยาว เรานัดคุยพรุ่งนี้เช้าดีกว่า|thaa reuuang nii yaao rao nat khui phrung-nii chaao dii gwaa|如果这件事比较长，我们约明早沟通更好。|会议
khaaw-wee-laa-sak-khruu|ขอเวลาสักครู่|khaaw wee-laa sak khruu|请给一点时间|短语|服务现场|ขอเวลาสักครู่ครับ ผมจะเช็กข้อมูลในระบบก่อน|khaaw wee-laa sak khruu khrap phom ja chek khaaw-muun nai ra-bop gaawn|请给我一点时间，我先查一下系统里的资料。|现场
raaw-sak-khruu|รอสักครู่|raaw sak khruu|请稍等|短语|服务现场|ลูกค้ามาถึงแล้ว กรุณารอสักครู่ พนักงานกำลังมา|luuk-khaa maa theung laeo ga-ru-naa raaw sak khruu pha-nak-ngaan gam-lang maa|客户已经到了，请稍等，工作人员正在来。|现场
luuk-khaa-maa-theung-laeo|ลูกค้ามาถึงแล้ว|luuk-khaa maa theung laeo|客户已到|短语|服务现场|ลูกค้ามาถึงแล้วที่หน้าร้าน กรุณาเตรียมเอกสาร|luuk-khaa maa theung laeo thii naa raan ga-ru-naa dtriiam eek-ga-saan|客户已经到店门口了，请准备文件。|现场
luuk-khaa-raw-yuu|ลูกค้ารออยู่|luuk-khaa raaw yuu|客户正在等|短语|服务现场|ลูกค้ารออยู่ที่เคาน์เตอร์ ช่วยไปดูให้หน่อย|luuk-khaa raaw yuu thii khao-dter chuai bpai duu hai naawy|客户正在柜台等着，请帮忙去看一下。|现场
yuu-naa-ngaan|อยู่หน้างาน|yuu naa-ngaan|在现场|短语|服务现场|ตอนนี้ช่างอยู่หน้างานและกำลังตรวจเครื่อง|dtaawn-nii chang yuu naa-ngaan lae gam-lang dtruat khreuuang|现在师傅在现场，正在检查机器。|现场
khao-naa-ngaan|เข้าหน้างาน|khao naa-ngaan|进入现场|动词|服务现场|ทีมติดตั้งจะเข้าหน้างานตอนเก้าโมงครึ่ง|thiim dtit-dtang ja khao naa-ngaan dtaawn gaao moong khreung|安装团队会在九点半进入现场。|现场
aawk-jaak-naa-ngaan|ออกจากหน้างาน|aawk jaak naa-ngaan|离开现场|动词|服务现场|หลังเก็บของเสร็จแล้ว ทีมจึงออกจากหน้างาน|lang gep khaawng set laeo thiim jeung aawk jaak naa-ngaan|收拾完东西后，团队才离开现场。|现场
raai-ngaan-bpan-haa|รายงานปัญหา|raai-ngaan bpan-haa|报告问题|动词|服务现场|ถ้าเครื่องยังเสีย กรุณารายงานปัญหาในกลุ่มทันที|thaa khreuuang yang siia ga-ru-naa raai-ngaan bpan-haa nai glum than-thii|如果机器还坏着，请马上在群里报告问题。|问题
jaeng-bpan-haa|แจ้งปัญหา|jaeng bpan-haa|告知问题|动词|服务现场|ลูกค้าแจ้งปัญหาว่าอินเทอร์เน็ตช้ามากตั้งแต่เช้า|luuk-khaa jaeng bpan-haa waa in-thoe-net chaa maak dtang-dtae chaao|客户告知问题，说从早上开始网速很慢。|问题
gae-bpan-haa|แก้ปัญหา|gae bpan-haa|解决问题|动词|服务现场|ทีมไอทีใช้เวลาหนึ่งชั่วโมงเพื่อแก้ปัญหานี้|thiim ai-thii chai wee-laa neung chua-moong phuea gae bpan-haa nii|IT团队花了一小时解决这个问题。|问题
bpan-haa-gae-laeo|ปัญหาแก้แล้ว|bpan-haa gae laeo|问题已解决|短语|服务现场|ปัญหาแก้แล้ว ลูกค้าลองใช้เครื่องอีกครั้งได้เลย|bpan-haa gae laeo luuk-khaa laawng chai khreuuang iik khrang dai loei|问题已解决，客户可以再试用机器了。|问题
bpan-haa-yang-yuu|ปัญหายังอยู่|bpan-haa yang yuu|问题还存在|短语|服务现场|ปัญหายังอยู่แม้เราเปิดเครื่องใหม่สองครั้งแล้ว|bpan-haa yang yuu mae rao bpoet khreuuang mai saawng khrang laeo|即使我们重启了两次机器，问题还存在。|问题
khaaw-khaaw-muun|ขอข้อมูล|khaaw khaaw-muun|索取资料|动词|确认任务|เพื่อทำใบเสนอราคา ฉันต้องขอข้อมูลจากลูกค้าเพิ่ม|phuea tham bai sa-noe raa-khaa chan dtawng khaaw khaaw-muun jaak luuk-khaa phoem|为了做报价单，我需要向客户再索取资料。|资料
khaaw-ruup-phoem|ขอรูปเพิ่ม|khaaw ruup phoem|再要照片|动词|服务现场|รูปนี้ไม่ชัด ขอรูปเพิ่มจากมุมซ้ายได้ไหม|ruup nii mai chat khaaw ruup phoem jaak mum saai dai mai|这张照片不清楚，可以再要一张左侧角度的照片吗？|图片
khaaw-raai-la-iat|ขอรายละเอียด|khaaw raai-la-iat|询问详情|动词|确认任务|ฉันขอรายละเอียดเวลาและสถานที่จากลูกค้าอีกครั้ง|chan khaaw raai-la-iat wee-laa lae sa-thaan-thii jaak luuk-khaa iik khrang|我再次向客户询问时间和地点的详情。|资料
khaaw-ber-thoo|ขอเบอร์โทร|khaaw ber thoo|要电话号码|动词|服务现场|ถ้าต้องไปหน้างาน กรุณาขอเบอร์โทรของผู้ติดต่อ|thaa dtawng bpai naa-ngaan ga-ru-naa khaaw ber thoo khaawng phuu dtit-dtaaw|如果要去现场，请要联系人的电话号码。|电话
thoo-ha-luuk-khaa|โทรหาลูกค้า|thoo haa luuk-khaa|打给客户|动词|服务现场|ก่อนออกจากบริษัท ฉันโทรหาลูกค้าเพื่อยืนยันเวลา|gaawn aawk jaak baaw-ri-sat chan thoo haa luuk-khaa phuea yeun-yan wee-laa|离开公司前，我打给客户确认时间。|电话
luuk-khaa-mai-rap-saai|ลูกค้าไม่รับสาย|luuk-khaa mai rap saai|客户不接电话|短语|服务现场|ลูกค้าไม่รับสาย เราจึงส่งข้อความไปแทน|luuk-khaa mai rap saai rao jeung song khaaw-khwaam bpai thaen|客户不接电话，所以我们改为发消息过去。|电话
dtit-dtaaw-mai-dai|ติดต่อไม่ได้|dtit-dtaaw mai dai|联系不上|短语|服务现场|ถ้าติดต่อไม่ได้ภายในสิบโมง ให้แจ้งหัวหน้าทันที|thaa dtit-dtaaw mai dai phaai-nai sip moong hai jaeng hua-naa than-thii|如果十点前联系不上，请马上通知主管。|电话
faak-khaaw-khwaam|ฝากข้อความ|faak khaaw-khwaam|留言|动词|发消息|ฉันฝากข้อความไว้แล้วว่าเราจะส่งของพรุ่งนี้|chan faak khaaw-khwaam wai laeo waa rao ja song khaawng phrung-nii|我已经留言说我们明天会送货。|消息
song-naa-jaaw|ส่งหน้าจอ|song naa-jaaw|发送截图|动词|发消息|ถ้าแอปขึ้น error กรุณาส่งหน้าจอให้ทีมดู|thaa aep kheun er-rer ga-ru-naa song naa-jaaw hai thiim duu|如果应用出现错误，请把截图发给团队看。|截图
ruup-naa-jaaw|รูปหน้าจอ|ruup naa-jaaw|截图|名词|发消息|รูปหน้าจอนี้ช่วยให้เราเห็นปัญหาได้ชัดขึ้น|ruup naa-jaaw nii chuai hai rao hen bpan-haa dai chat kheun|这张截图帮助我们更清楚地看到问题。|截图
song-lak-thaan|ส่งหลักฐาน|song lak-thaan|发送证明|动词|发消息|หลังจ่ายเงินแล้ว กรุณาส่งหลักฐานให้ฝ่ายบัญชี|lang jaai ngoen laeo ga-ru-naa song lak-thaan hai faai ban-chii|付款后，请把证明发给财务部门。|证明
khaaw-yam-iik-khrang|ขอย้ำอีกครั้ง|khaaw yam iik khrang|再强调一次|短语|确认任务|ขอย้ำอีกครั้งว่าเราต้องใส่ชื่อร้านให้ถูก|khaaw yam iik khrang waa rao dtawng sai cheu raan hai thuuk|我再强调一次，我们必须把店名写正确。|确认
yaen-yan-iik-khrang|ยืนยันอีกครั้ง|yeun-yan iik khrang|再次确认|动词|确认任务|ก่อนส่งทีมไปหน้างาน กรุณายืนยันอีกครั้งกับลูกค้า|gaawn song thiim bpai naa-ngaan ga-ru-naa yeun-yan iik khrang gap luuk-khaa|派团队去现场前，请再次和客户确认。|确认
wee-laa-nat|เวลานัด|wee-laa nat|预约时间|名词|时间进度|เวลานัดกับลูกค้าคือบ่ายสองโมง อย่าไปสาย|wee-laa nat gap luuk-khaa kheu baai saawng moong yaa bpai saai|和客户的预约时间是下午两点，不要迟到。|时间
bplian-wee-laa|เปลี่ยนเวลา|bplian wee-laa|改时间|动词|时间进度|ลูกค้าขอเปลี่ยนเวลาจากเช้าเป็นบ่าย|luuk-khaa khaaw bplian wee-laa jaak chaao bpen baai|客户请求把时间从上午改到下午。|时间
maa-dtrong-wee-laa|มาตรงเวลา|maa dtrong wee-laa|准时到|动词|时间进度|ทีมติดตั้งมาตรงเวลาและเริ่มงานทันที|thiim dtit-dtang maa dtrong wee-laa lae roem ngaan than-thii|安装团队准时到达并马上开始工作。|时间
maa-saai|มาสาย|maa saai|迟到|动词|时间进度|ขอโทษที่มาสาย รถติดมากกว่าที่คิด|khaaw-thoot thii maa saai rot dtit maak gwaa thii khit|抱歉迟到了，堵车比预想更严重。|时间
khaaw-thoot-thii-chaa|ขอโทษที่ช้า|khaaw-thoot thii chaa|抱歉慢了|短语|时间进度|ขอโทษที่ช้า ตอนนี้ฉันส่งไฟล์ให้แล้วนะครับ|khaaw-thoot thii chaa dtaawn-nii chan song fai hai laeo na khrap|抱歉慢了，我现在已经把文件发给你了。|时间
gaawn-thiiang|ก่อนเที่ยง|gaawn thiiang|中午前|短语|时间进度|กรุณาส่งรายชื่อให้ฉันก่อนเที่ยงวันนี้|ga-ru-naa song raai-cheu hai chan gaawn thiiang wan-nii|请在今天中午前把名单发给我。|时间
lang-aa-haan-glaang-wan|หลังอาหารกลางวัน|lang aa-haan glaang-wan|午饭后|短语|时间进度|หลังอาหารกลางวันเราจะโทรยืนยันกับลูกค้าอีกครั้ง|lang aa-haan glaang-wan rao ja thoo yeun-yan gap luuk-khaa iik khrang|午饭后我们会再次给客户打电话确认。|时间
dtaawn-baai-nii|ตอนบ่ายนี้|dtaawn baai nii|今天下午|短语|时间进度|ตอนบ่ายนี้ฉันต้องไปหน้างานกับทีมช่าง|dtaawn baai nii chan dtawng bpai naa-ngaan gap thiim chang|今天下午我要和技术团队去现场。|时间
phrung-nii-chaao|พรุ่งนี้เช้า|phrung-nii chaao|明天早上|短语|时间进度|พรุ่งนี้เช้าช่วยโทรเตือนลูกค้าอีกครั้งได้ไหม|phrung-nii chaao chuai thoo dteuan luuk-khaa iik khrang dai mai|明天早上可以帮忙再打电话提醒客户吗？|时间
gaawn-glap-baan|ก่อนกลับบ้าน|gaawn glap baan|回家前|短语|时间进度|ก่อนกลับบ้าน กรุณาเก็บโต๊ะและปิดไฟให้เรียบร้อย|gaawn glap baan ga-ru-naa gep dto lae bpit fai hai riap-raawy|回家前，请整理桌子并关好灯。|时间
lang-tham-set|หลังทำเสร็จ|lang tham set|做完以后|短语|时间进度|หลังทำเสร็จ ช่วยส่งรูปให้หัวหน้าดูด้วย|lang tham set chuai song ruup hai hua-naa duu duai|做完以后，也请把照片发给主管看。|时间
meua-bpai-theung|เมื่อไปถึง|meua bpai theung|到达时|短语|时间进度|เมื่อไปถึงหน้างาน กรุณาโทรหาฉันทันที|meua bpai theung naa-ngaan ga-ru-naa thoo haa chan than-thii|到达现场时，请马上给我打电话。|时间
khui-gab-luuk-khaa|คุยกับลูกค้า|khui gap luuk-khaa|和客户沟通|动词|服务现场|ก่อนแก้งานใหญ่ เราควรคุยกับลูกค้าให้ชัด|gaawn gae ngaan yai rao khuan khui gap luuk-khaa hai chat|大幅修改前，我们应该和客户沟通清楚。|客户
khui-gab-thiim|คุยกับทีม|khui gap thiim|和团队沟通|动词|通知同事|ถ้ามีแผนใหม่ เราต้องคุยกับทีมก่อนเริ่มงาน|thaa mii phaen mai rao dtawng khui gap thiim gaawn roem ngaan|如果有新计划，我们开始工作前要和团队沟通。|团队
baeng-ngaan|แบ่งงาน|baeng ngaan|分配工作|动词|交接协作|หัวหน้าแบ่งงานให้ทุกคนตามเวลาที่ว่าง|hua-naa baeng ngaan hai thuk khon dtaam wee-laa thii waang|主管按照大家空闲的时间分配工作。|协作
khrai-rap-phit-chaawp|ใครรับผิดชอบ|khrai rap-phit-chaawp|谁负责|短语|确认任务|ขอถามหน่อย งานส่วนนี้ใครรับผิดชอบคะ|khaaw thaam naawy ngaan suan nii khrai rap-phit-chaawp kha|请问一下，这部分工作谁负责？|责任
rap-phit-chaawp-suan-nii|รับผิดชอบส่วนนี้|rap-phit-chaawp suan nii|负责这一部分|动词|确认任务|ฉันรับผิดชอบส่วนนี้และจะส่งผลให้ทีมพรุ่งนี้|chan rap-phit-chaawp suan nii lae ja song phon hai thiim phrung-nii|我负责这一部分，明天会把结果发给团队。|责任
dtawng-song-hai-khrai|ต้องส่งให้ใคร|dtawng song hai khrai|要交给谁|短语|确认任务|ไฟล์นี้ต้องส่งให้ใคร หลังจากหัวหน้าตรวจแล้ว|fai nii dtawng song hai khrai lang-jaak hua-naa dtruat laeo|这个文件主管检查后要交给谁？|确认
song-hai-khrai-laeo|ส่งให้ใครแล้ว|song hai khrai laeo|已经发给谁了|短语|确认任务|ช่วยบอกหน่อยว่าเอกสารนี้ส่งให้ใครแล้วบ้าง|chuai baawk naawy waa eek-ga-saan nii song hai khrai laeo baang|请告诉我这份文件已经发给哪些人了。|确认
wai-kui-kan|ไว้คุยกัน|wai khui gan|之后再聊|短语|发消息|ตอนนี้ฉันต้องออกไปหน้างาน ไว้คุยกันตอนเย็น|dtaawn-nii chan dtawng aawk bpai naa-ngaan wai khui gan dtaawn yen|我现在要去现场，傍晚之后再聊。|消息
thang-ii-meel|ทางอีเมล|thaang ii-meel|通过电子邮件|短语|发消息|เอกสารทางการควรส่งทางอีเมล ไม่ใช่ทางแชต|eek-ga-saan thaang-gaan khuan song thaang ii-meel mai chai thaang chaet|正式文件应该通过电子邮件发送，不是通过聊天发送。|邮件
thang-chaet|ทางแชต|thaang chaet|通过聊天|短语|发消息|เรื่องเล็ก ๆ คุยทางแชตได้ ไม่ต้องเปิดประชุม|reuuang lek lek khui thaang chaet dai mai dtawng bpoet bpra-chum|小事情可以通过聊天沟通，不用开会。|聊天
khaw-mai-pen-thaang-gaan|ข้อความไม่เป็นทางการ|khaaw-khwaam mai bpen thaang-gaan|非正式消息|名词|发消息|ข้อความไม่เป็นทางการใช้กับเพื่อนร่วมงานที่สนิทได้|khaaw-khwaam mai bpen thaang-gaan chai gap pheuan-ruam-ngaan thii sa-nit dai|非正式消息可以用于关系熟的同事。|消息
khaw-pen-thaang-gaan|ข้อความเป็นทางการ|khaaw-khwaam bpen thaang-gaan|正式消息|名词|发消息|เมื่อติดต่อฝ่ายอื่น ควรเขียนข้อความเป็นทางการมากขึ้น|meua dtit-dtaaw faai eun khuan khiian khaaw-khwaam bpen thaang-gaan maak kheun|联系其他部门时，应该把消息写得更正式一些。|消息
jaeng-laa|แจ้งลา|jaeng laa|通知请假|动词|通知同事|ถ้าไม่สบาย ต้องแจ้งลาหัวหน้าก่อนเวลาเริ่มงาน|thaa mai sa-baai dtawng jaeng laa hua-naa gaawn wee-laa roem ngaan|如果身体不舒服，必须在上班时间前通知主管请假。|通知
jaeng-maa-saai|แจ้งมาสาย|jaeng maa saai|通知会迟到|动词|通知同事|เมื่อรถติดมาก ฉันรีบแจ้งมาสายในกลุ่มงาน|meua rot dtit maak chan riip jaeng maa saai nai glum ngaan|堵车很严重时，我赶紧在工作群里通知会迟到。|通知
jaeng-glap-gaawn|แจ้งกลับก่อน|jaeng glap gaawn|通知提前离开|动词|通知同事|วันนี้ฉันมีนัดหมอ จึงต้องแจ้งกลับก่อนหนึ่งชั่วโมง|wan-nii chan mii nat maaw jeung dtawng jaeng glap gaawn neung chua-moong|今天我有医生预约，所以要通知提前一小时离开。|通知
dtit-ngaan-eun|ติดงานอื่น|dtit ngaan eun|忙其他工作|短语|时间进度|ตอนนี้ฉันติดงานอื่น ขอส่งไฟล์ให้ตอนบ่ายได้ไหม|dtaawn-nii chan dtit ngaan eun khaaw song fai hai dtaawn baai dai mai|我现在忙其他工作，可以下午把文件发给你吗？|时间
waang-mai|ว่างไหม|waang mai|有空吗|短语|请求帮忙|ตอนนี้ว่างไหม ช่วยคุยกับลูกค้าห้านาทีได้ไหม|dtaawn-nii waang mai chuai khui gap luuk-khaa haa naa-thii dai mai|现在有空吗？可以帮忙和客户聊五分钟吗？|帮忙
mi-wee-laa-mai|มีเวลาไหม|mii wee-laa mai|有时间吗|短语|请求帮忙|พรุ่งนี้เช้าคุณมีเวลาไหม ฉันอยากสรุปงานด้วยกัน|phrung-nii chaao khun mii wee-laa mai chan yaak sa-ruup ngaan duai gan|明天早上你有时间吗？我想一起总结任务。|帮忙
khaaw-nueng-naa-thii|ขอหนึ่งนาที|khaaw neung naa-thii|请给一分钟|短语|服务现场|ขอหนึ่งนาทีครับ ผมกำลังเปิดข้อมูลลูกค้า|khaaw neung naa-thii khrap phom gam-lang bpoet khaaw-muun luuk-khaa|请给我一分钟，我正在打开客户资料。|现场
thuk-yaang-bpok-ga-dti|ทุกอย่างปกติ|thuk yaang bpok-ga-dti|一切正常|短语|服务现场|หลังตรวจเครื่องแล้ว ช่างบอกว่าทุกอย่างปกติ|lang dtruat khreuuang laeo chang baawk waa thuk yaang bpok-ga-dti|检查机器后，师傅说一切正常。|现场
mi-bang-yaang-phit|มีบางอย่างผิด|mii baang yaang phit|有些地方不对|短语|服务现场|มีบางอย่างผิดในใบงาน กรุณาเช็กชื่อบริษัทอีกครั้ง|mii baang yaang phit nai bai-ngaan ga-ru-naa chek cheu baaw-ri-sat iik khrang|工作单里有些地方不对，请再次检查公司名称。|问题
chuai-rian-roi|ช่วยเรียงลำดับ|chuai riiang lam-dap|帮忙排序|动词|请求帮忙|ช่วยเรียงลำดับงานตามเวลานัดให้หน่อยได้ไหม|chuai riiang lam-dap ngaan dtaam wee-laa nat hai naawy dai mai|可以帮忙按预约时间给任务排序吗？|帮忙
lam-dap-ngaan|ลำดับงาน|lam-dap ngaan|任务顺序|名词|确认任务|ลำดับงานวันนี้คือโทรลูกค้า ส่งของ แล้วสรุปรายงาน|lam-dap ngaan wan-nii kheu thoo luuk-khaa song khaawng laeo sa-ruup raai-ngaan|今天的任务顺序是打给客户、发货，然后总结报告。|清单
bai-ngaan|ใบงาน|bai-ngaan|工作单|名词|服务现场|ช่างต้องอ่านใบงานก่อนเริ่มซ่อมเครื่องทุกครั้ง|chang dtawng aan bai-ngaan gaawn roem saawm khreuuang thuk khrang|师傅每次开始修机器前都要阅读工作单。|现场
lek-bai-ngaan|เลขใบงาน|lek bai-ngaan|工作单号|名词|服务现场|กรุณาส่งเลขใบงานให้ฉันเพื่อเช็กสถานะ|ga-ru-naa song lek bai-ngaan hai chan phuea chek sa-thaa-na|请把工作单号发给我，以便查询状态。|现场
chek-sa-thaa-na|เช็กสถานะ|chek sa-thaa-na|查看状态|动词|时间进度|ลูกค้าอยากเช็กสถานะงานว่าเสร็จหรือยัง|luuk-khaa yaak chek sa-thaa-na ngaan waa set reu yang|客户想查看工作状态，看看完成了没有。|进度
sa-thaa-na-ngaan|สถานะงาน|sa-thaa-na ngaan|工作状态|名词|时间进度|สถานะงานในระบบขึ้นว่ายังรอข้อมูลลูกค้า|sa-thaa-na ngaan nai ra-bop kheun waa yang raaw khaaw-muun luuk-khaa|系统里的工作状态显示仍在等待客户资料。|进度
raai-ngaan-phon|รายงานผล|raai-ngaan phon|汇报结果|动词|反馈修改|หลังทำงานเสร็จ ทีมต้องรายงานผลให้หัวหน้าฟัง|lang tham ngaan set thiim dtawng raai-ngaan phon hai hua-naa fang|完成工作后，团队需要向主管汇报结果。|反馈
phon-ngaan|ผลงาน|phon-ngaan|工作成果|名词|反馈修改|ลูกค้าดูผลงานแล้วบอกว่าสีสวยและอ่านง่าย|luuk-khaa duu phon-ngaan laeo baawk waa sii suai lae aan ngaai|客户看了工作成果后，说颜色漂亮且容易阅读。|反馈
dtit-dtaam-ngaan|ติดตามงาน|dtit-dtaam ngaan|跟进工作|动词|时间进度|พรุ่งนี้ฉันจะติดตามงานนี้กับฝ่ายขนส่งอีกครั้ง|phrung-nii chan ja dtit-dtaam ngaan nii gap faai khon-song iik khrang|明天我会再和运输部门跟进这项工作。|跟进
thuaang-ngaan|ทวงงาน|thuuang ngaan|催工作|动词|时间进度|ถ้าเลยกำหนดส่ง เราอาจต้องทวงงานอย่างสุภาพ|thaa loei gam-not song rao aat dtawng thuuang ngaan yaang su-phaap|如果过了提交期限，我们可能要礼貌地催工作。|跟进
rem-tham-wan-nii|เริ่มทำวันนี้|roem tham wan-nii|今天开始做|短语|时间进度|งานนี้ไม่ยาก เราเริ่มทำวันนี้และส่งพรุ่งนี้ได้|ngaan nii mai yaak rao roem tham wan-nii lae song phrung-nii dai|这项工作不难，我们今天开始做，明天可以提交。|进度
song-kheun-nii|ส่งคืนนี้|song kheun nii|今晚提交|短语|时间进度|ถ้าทุกอย่างเรียบร้อย ฉันจะส่งคืนนี้ก่อนนอน|thaa thuk yaang riap-raawy chan ja song kheun nii gaawn naawn|如果一切妥当，我今晚睡前会提交。|进度
song-gaawn-hok-moong|ส่งก่อนหกโมง|song gaawn hok moong|六点前提交|短语|时间进度|หัวหน้าขอให้ส่งก่อนหกโมงเพราะลูกค้ารออยู่|hua-naa khaaw hai song gaawn hok moong phraw luuk-khaa raaw yuu|主管要求六点前提交，因为客户在等。|进度
khaaw-bplian-kham|ขอเปลี่ยนคำ|khaaw bplian kham|请求改词|动词|反馈修改|ลูกค้าขอเปลี่ยนคำในป้ายให้สุภาพขึ้น|luuk-khaa khaaw bplian kham nai bpaai hai su-phaap kheun|客户请求把标牌上的词改得更礼貌些。|修改
bprap-si|ปรับสี|bprap sii|调整颜色|动词|反馈修改|ดีไซเนอร์ปรับสีพื้นหลังให้สว่างกว่าเดิม|dii-sai-ner bprap sii pheun-lang hai sa-waang gwaa doem|设计师把背景颜色调得比原来更亮。|修改
bprap-khaaw-khwaam|ปรับข้อความ|bprap khaaw-khwaam|调整文字|动词|反馈修改|เราต้องปรับข้อความให้สั้นลงก่อนส่งประกาศ|rao dtawng bprap khaaw-khwaam hai san long gaawn song bpra-gaat|发送公告前，我们需要把文字调短。|修改
dtit-dtaam-luuk-khaa|ติดตามลูกค้า|dtit-dtaam luuk-khaa|跟进客户|动词|服务现场|หลังส่งราคาแล้ว เซลส์จะติดตามลูกค้าในวันพรุ่งนี้|lang song raa-khaa laeo seel ja dtit-dtaam luuk-khaa nai wan phrung-nii|发出价格后，销售会在明天跟进客户。|客户
khaaw-khwam-ruam-meu|ขอความร่วมมือ|khaaw khwaam-ruam-meu|请求配合|动词|通知同事|ผู้จัดการขอความร่วมมือให้ทุกคนมาประชุมตรงเวลา|phuu-jat-gaan khaaw khwaam-ruam-meu hai thuk khon maa bpra-chum dtrong wee-laa|经理请求大家配合，准时来开会。|通知
khui-hai-chat|คุยให้ชัด|khui hai chat|沟通清楚|动词|确认任务|ก่อนรับงานใหม่ เราควรคุยให้ชัดเรื่องราคาและเวลา|gaawn rap ngaan mai rao khuan khui hai chat reuuang raa-khaa lae wee-laa|接新任务前，我们应该把价格和时间沟通清楚。|沟通
`;

export const VOCABULARY_EXPANSION_A2_WORK_COMMUNICATION_01: VocabularyExpansionA2WorkCommunicationCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
