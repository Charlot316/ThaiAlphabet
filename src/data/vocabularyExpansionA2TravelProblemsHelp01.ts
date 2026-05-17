type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "迷路问路" | "预订错误" | "行李问题" | "延误取消" | "换票改签" | "服务台帮助" | "请求帮助" | "行程调整";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2TravelProblemsHelpCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-travel-problems-help-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2TravelProblemsHelpCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于旅行中迷路、改票、行李、延误或向服务人员求助的基础沟通。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，旅行求助时要分清问题、地点、票务和行程动作。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["遇到旅行问题时，可用 ขอโทษครับ/ค่ะ、ช่วย、หน่อย、ได้ไหม 让求助更礼貌清楚。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
long-thaang|หลงทาง|long thaang|迷路|动词|迷路问路|ฉันหลงทางในเมืองเก่าและหาโรงแรมไม่เจอ|chan long thaang nai meuuang gao lae haa roong-raem mai joe|我在老城区迷路了，找不到酒店。|迷路
haa-thaang-mai-joe|หาทางไม่เจอ|haa thaang mai joe|找不到路|动词|迷路问路|เราเดินมานานแล้วแต่ยังหาทางไม่เจอ|rao doen maa naan laeo dtae yang haa thaang mai joe|我们走了很久，但还是找不到路。|迷路
doen-phit-thaang|เดินผิดทาง|doen phit thaang|走错路|动词|迷路问路|ฉันเดินผิดทางเพราะอ่านป้ายไม่ทัน|chan doen phit thaang phraw aan bpaai mai than|我因为没来得及看牌子走错路了。|迷路
kheun-rot-phit-saai|ขึ้นรถผิดสาย|kheun rot phit saai|坐错线路|动词|迷路问路|เมื่อเช้าฉันขึ้นรถผิดสายเลยไปถึงช้า|meua chaao chan kheun rot phit saai loei bpai theung chaa|今天早上我坐错线路，所以到得晚。|交通
long-phit-sa-thaa-nii|ลงผิดสถานี|long phit sa-thaa-nii|下错站|动词|迷路问路|เขาลงผิดสถานีและต้องนั่งรถกลับมาอีกสองป้าย|khao long phit sa-thaa-nii lae dtawng nang rot glap maa iik saawng bpaai|他下错站了，需要坐车回来两站。|交通
paai-bawk-thaang|ป้ายบอกทาง|bpaai baawk thaang|指路牌|名词|迷路问路|ป้ายบอกทางตรงนี้เล็กมากและอ่านยากตอนกลางคืน|bpaai baawk thaang dtrong nii lek maak lae aan yaak dtaawn glaang-kheun|这里的指路牌很小，晚上很难看清。|标识
phaen-thii-chai-mai-dai|แผนที่ใช้ไม่ได้|phaen-thii chai mai dai|地图不能用|短语|迷路问路|แผนที่ใช้ไม่ได้เพราะโทรศัพท์ไม่มีอินเทอร์เน็ต|phaen-thii chai mai dai phraw thoo-ra-sap mai mii in-thoe-net|地图不能用，因为手机没有网络。|地图
song-dtam-naeng|ส่งตำแหน่ง|song dtam-naeng|发送位置|动词|迷路问路|ช่วยส่งตำแหน่งร้านให้ฉันอีกครั้งได้ไหม|chuai song dtam-naeng raan hai chan iik khrang dai mai|可以再把店的位置发给我一次吗？|地图
dtam-naeng-bpat-ju-ban|ตำแหน่งปัจจุบัน|dtam-naeng bpat-ju-ban|当前位置|名词|迷路问路|ฉันส่งตำแหน่งปัจจุบันให้เพื่อนเพื่อให้เขามารับ|chan song dtam-naeng bpat-ju-ban hai pheuan phuea hai khao maa rap|我把当前位置发给朋友，让他来接。|地图
jud-nat-phop|จุดนัดพบ|jut nat phop|集合点|名词|迷路问路|ถ้าเราหลงกัน ให้กลับไปที่จุดนัดพบหน้าโรงแรม|thaa rao long gan hai glap bpai thii jut nat phop naa roong-raem|如果我们走散，就回酒店前面的集合点。|地点
bpai-thaang-nai|ไปทางไหน|bpai thaang nai|往哪边走|短语|迷路问路|ขอโทษค่ะ สถานีรถไฟไปทางไหนคะ|khaaw-thoot kha sa-thaa-nii rot-fai bpai thaang nai kha|不好意思，火车站往哪边走？|问路
glai-thii-nii-mai|ใกล้ที่นี่ไหม|glai thii nii mai|离这里近吗|短语|迷路问路|ตลาดกลางคืนใกล้ที่นี่ไหม หรือเราต้องนั่งรถ|dta-laat glaang-kheun glai thii nii mai reu rao dtawng nang rot|夜市离这里近吗，还是我们要坐车？|问路
doen-bpai-dai-mai|เดินไปได้ไหม|doen bpai dai mai|能走过去吗|短语|迷路问路|จากโรงแรมไปท่าเรือเดินไปได้ไหมครับ|jaak roong-raem bpai thaa-reua doen bpai dai mai khrap|从酒店到码头能走过去吗？|问路
tong-khaam-tha-non|ต้องข้ามถนน|dtawng khaam tha-non|需要过马路|短语|迷路问路|ถ้าจะไปพิพิธภัณฑ์ ต้องข้ามถนนตรงไฟแดง|thaa ja bpai phi-phit-tha-phan dtawng khaam tha-non dtrong fai-daeng|如果要去博物馆，需要在红绿灯那里过马路。|问路
liao-saai|เลี้ยวซ้าย|liao saai|左转|动词|迷路问路|เดินตรงไปแล้วเลี้ยวซ้ายที่ร้านกาแฟ|doen dtrong bpai laeo liao saai thii raan gaa-fae|一直走，然后在咖啡店那里左转。|方向
liao-khwaa|เลี้ยวขวา|liao khwaa|右转|动词|迷路问路|จากป้ายรถเมล์ให้เลี้ยวขวาแล้วจะเห็นวัด|jaak bpaai rot-mee hai liao khwaa laeo ja hen wat|从公交站右转，就会看到寺庙。|方向
doen-dtrong-bpai|เดินตรงไป|doen dtrong bpai|一直走|动词|迷路问路|เดินตรงไปประมาณห้านาทีแล้วถามคนแถวนั้นอีกที|doen dtrong bpai bpra-maan haa naa-thii laeo thaam khon thaeo nan iik thii|一直走大约五分钟，再问那附近的人。|方向
yuu-trong-khaam|อยู่ตรงข้าม|yuu dtrong khaam|在对面|短语|迷路问路|โรงแรมอยู่ตรงข้ามร้านขายยา ไม่ไกลจากสถานี|roong-raem yuu dtrong khaam raan khaai yaa mai glai jaak sa-thaa-nii|酒店在药店对面，离车站不远。|地点
sa-thaan-thii-phit|สถานที่ผิด|sa-thaan-thii phit|地点错了|短语|预订错误|ฉันจองสถานที่ผิดและต้องเปลี่ยนโรงแรมคืนนี้|chan jaawng sa-thaan-thii phit lae dtawng bplian roong-raem kheun nii|我订错地点了，今晚必须换酒店。|预订
jaawng-phit-wan|จองผิดวัน|jaawng phit wan|订错日期|动词|预订错误|ฉันจองผิดวันจากวันเสาร์เป็นวันอาทิตย์|chan jaawng phit wan jaak wan-sao bpen wan-aa-thit|我把星期六订成星期天了。|预订
jaawng-phit-cheu|จองผิดชื่อ|jaawng phit cheu|订错姓名|动词|预订错误|ตั๋วเครื่องบินจองผิดชื่อ ต้องติดต่อสายการบิน|dtua khreuuang-bin jaawng phit cheu dtawng dtit-dtaaw saai-gaan-bin|机票订错姓名，需要联系航空公司。|预订
jaawng-phit-haawng|จองผิดห้อง|jaawng phit haawng|订错房型|动词|预订错误|เราอยากได้ห้องเตียงคู่แต่จองผิดห้อง|rao yaak dai haawng dtiiang khuu dtae jaawng phit haawng|我们想要双床房，但订错房型了。|预订
khaaw-gae-gaan-jaawng|ขอแก้การจอง|khaaw gae gaan jaawng|请求修改预订|动词|预订错误|ฉันขอแก้การจองจากสองคืนเป็นสามคืนได้ไหม|chan khaaw gae gaan jaawng jaak saawng kheun bpen saam kheun dai mai|我可以请求把预订从两晚改成三晚吗？|预订
khaaw-yuen-yan-gaan-jaawng|ขอยืนยันการจอง|khaaw yeun-yan gaan jaawng|请求确认预订|动词|预订错误|ขอยืนยันการจองห้องพักสำหรับคืนนี้อีกครั้งครับ|khaaw yeun-yan gaan jaawng haawng-phak sam-rap kheun nii iik khrang khrap|我想再次确认今晚的房间预订。|预订
bai-jaawng|ใบจอง|bai jaawng|预订单|名词|预订错误|พนักงานขอดูใบจองก่อนให้กุญแจห้อง|pha-nak-ngaan khaaw duu bai jaawng gaawn hai gun-jae haawng|工作人员发房间钥匙前要求看预订单。|预订
lek-gaan-jaawng|เลขการจอง|lek gaan jaawng|预订号码|名词|预订错误|กรุณาส่งเลขการจองให้โรงแรมตรวจในระบบ|ga-ru-naa song lek gaan jaawng hai roong-raem dtruat nai ra-bop|请把预订号码发给酒店在系统里查询。|预订
mai-phop-gaan-jaawng|ไม่พบการจอง|mai phop gaan jaawng|查不到预订|短语|预订错误|พนักงานบอกว่าไม่พบการจองในชื่อของฉัน|pha-nak-ngaan baawk waa mai phop gaan jaawng nai cheu khaawng chan|工作人员说查不到我名字下的预订。|预订
gaan-jaawng-yang-yuu|การจองยังอยู่|gaan jaawng yang yuu|预订仍有效|短语|预订错误|โรงแรมยืนยันว่าการจองยังอยู่และเช็กอินได้|roong-raem yeun-yan waa gaan jaawng yang yuu lae chek-in dai|酒店确认预订仍有效，可以入住。|预订
gra-bpao-haai|กระเป๋าหาย|gra-bpao haai|包丢了|短语|行李问题|กระเป๋าหายที่สถานีรถไฟตอนคนเยอะมาก|gra-bpao haai thii sa-thaa-nii rot-fai dtaawn khon yoe maak|人很多的时候，包在火车站丢了。|行李
gra-bpao-doen-thaang-haai|กระเป๋าเดินทางหาย|gra-bpao doen-thaang haai|行李箱丢失|短语|行李问题|กระเป๋าเดินทางหายหลังลงจากเครื่องบิน|gra-bpao doen-thaang haai lang long jaak khreuuang-bin|下飞机后行李箱丢失了。|行李
gra-bpao-yang-mai-maa|กระเป๋ายังไม่มา|gra-bpao yang mai maa|行李还没到|短语|行李问题|กระเป๋ายังไม่มาแต่เที่ยวบินของเราถึงแล้ว|gra-bpao yang mai maa dtae thiao-bin khaawng rao theung laeo|我们的航班到了，但行李还没到。|行李
gra-bpao-phit-bai|กระเป๋าผิดใบ|gra-bpao phit bai|拿错行李|短语|行李问题|ผู้โดยสารหยิบกระเป๋าผิดใบเพราะสีเหมือนกัน|phuu-dooi-saan yip gra-bpao phit bai phraw sii meuan gan|乘客因为颜色一样拿错行李了。|行李
bai-rap-gra-bpao|ใบรับกระเป๋า|bai rap gra-bpao|行李托运凭条|名词|行李问题|เจ้าหน้าที่ขอดูใบรับกระเป๋าก่อนตามหาให้|jao-naa-thii khaaw duu bai rap gra-bpao gaawn dtaam haa hai|工作人员先要求看行李托运凭条再帮忙寻找。|行李
dtaam-haa-gra-bpao|ตามหากระเป๋า|dtaam haa gra-bpao|寻找行李|动词|行李问题|เราต้องไปที่เคาน์เตอร์เพื่อตามหากระเป๋า|rao dtawng bpai thii khao-dter phuea dtaam haa gra-bpao|我们需要去柜台寻找行李。|行李
jaeng-gra-bpao-haai|แจ้งกระเป๋าหาย|jaeng gra-bpao haai|申报行李丢失|动词|行李问题|ฉันแจ้งกระเป๋าหายที่สนามบินและกรอกแบบฟอร์ม|chan jaeng gra-bpao haai thii sa-naam-bin lae graawk baep-faawm|我在机场申报行李丢失，并填写表格。|行李
gra-bpao-cham-rut|กระเป๋าชำรุด|gra-bpao cham-rut|行李损坏|短语|行李问题|กระเป๋าชำรุดตรงล้อหลังรับจากสายพาน|gra-bpao cham-rut dtrong laaw lang rap jaak saai-phaan|从传送带取行李后，行李箱轮子处损坏了。|行李
saai-phaan-gra-bpao|สายพานกระเป๋า|saai-phaan gra-bpao|行李传送带|名词|行李问题|สายพานกระเป๋าหมายเลขห้ายังไม่เริ่มทำงาน|saai-phaan gra-bpao maai-lek haa yang mai roem tham-ngaan|五号行李传送带还没开始运行。|行李
khong-sam-khan-haai|ของสำคัญหาย|khaawng sam-khan haai|重要物品丢失|短语|行李问题|ของสำคัญหายในรถแท็กซี่และฉันจำทะเบียนไม่ได้|khaawng sam-khan haai nai rot thaek-sii lae chan jam tha-biian mai dai|重要物品丢在出租车上了，我记不住车牌。|丢失
fohn-haai|โทรศัพท์หาย|thoo-ra-sap haai|手机丢了|短语|行李问题|โทรศัพท์หายในตลาด ฉันต้องขอให้เพื่อนช่วยโทรหา|thoo-ra-sap haai nai dta-laat chan dtawng khaaw hai pheuan chuai thoo haa|手机在市场丢了，我得请朋友帮忙拨打。|丢失
eek-ga-saan-haai|เอกสารหาย|eek-ga-saan haai|证件文件丢失|短语|行李问题|ถ้าเอกสารหาย ต้องติดต่อสถานทูตโดยเร็ว|thaa eek-ga-saan haai dtawng dtit-dtaaw sa-thaan-thuut dooi reo|如果证件文件丢失，要尽快联系大使馆。|丢失
theiao-bin-laa-chaa|เที่ยวบินล่าช้า|thiao-bin laa-chaa|航班延误|短语|延误取消|เที่ยวบินล่าช้าสองชั่วโมงเพราะฝนตกหนัก|thiao-bin laa-chaa saawng chua-moong phraw fon dtok nak|航班因为大雨延误两小时。|延误
rot-fai-laa-chaa|รถไฟล่าช้า|rot-fai laa-chaa|火车晚点|短语|延误取消|รถไฟล่าช้า เราจึงต้องเปลี่ยนแผนอาหารเย็น|rot-fai laa-chaa rao jeung dtawng bplian phaen aa-haan yen|火车晚点，所以我们需要改变晚餐计划。|延误
rot-theua-laa-chaa|รถเที่ยวล่าช้า|rot thiao laa-chaa|班车延误|短语|延误取消|รถเที่ยวนี้ล่าช้าเพราะถนนมีอุบัติเหตุ|rot thiao nii laa-chaa phraw tha-non mii u-bat-dti-het|这班车因为路上有事故而延误。|延误
bpra-gaat-laa-chaa|ประกาศล่าช้า|bpra-gaat laa-chaa|延误通知|名词|延误取消|สนามบินมีประกาศล่าช้าเป็นภาษาไทยและอังกฤษ|sa-naam-bin mii bpra-gaat laa-chaa bpen phaa-saa thai lae ang-grit|机场有泰语和英语的延误通知。|通知
theiao-bin-yok-loek|เที่ยวบินยกเลิก|thiao-bin yok-loek|航班取消|短语|延误取消|เที่ยวบินยกเลิกและสายการบินให้เปลี่ยนตั๋วฟรี|thiao-bin yok-loek lae saai-gaan-bin hai bplian dtua frii|航班取消，航空公司让免费改票。|取消
rot-yok-loek|รถยกเลิก|rot yok-loek|车次取消|短语|延误取消|รถยกเลิกตอนเช้า เราต้องหารถเที่ยวใหม่|rot yok-loek dtaawn chaao rao dtawng haa rot thiao mai|早上的车次取消了，我们要找新的班车。|取消
gaan-jaawng-yok-loek|การจองยกเลิก|gaan jaawng yok-loek|预订取消|短语|延误取消|การจองยกเลิกเองในระบบเพราะไม่ได้จ่ายเงิน|gaan jaawng yok-loek eeng nai ra-bop phraw mai dai jaai ngoen|因为没付款，预订在系统里自动取消了。|取消
khaaw-yok-loek|ขอยกเลิก|khaaw yok-loek|请求取消|动词|延误取消|ฉันขอยกเลิกทัวร์เพราะป่วยกะทันหัน|chan khaaw yok-loek thua phraw bpuai ga-than-han|我因为突然生病请求取消旅行团。|取消
ngen-kheun-khaa-dtua|เงินคืนค่าตั๋ว|ngoen kheun khaa dtua|票款退款|名词|延误取消|ถ้ารถยกเลิก ลูกค้าจะได้รับเงินคืนค่าตั๋ว|thaa rot yok-loek luuk-khaa ja dai rap ngoen kheun khaa dtua|如果车次取消，客户会收到票款退款。|退款
raaw-khaao-mai|รอข่าวใหม่|raaw khaao mai|等待新消息|动词|延误取消|เรานั่งรอข่าวใหม่ที่ประตูขึ้นเครื่อง|rao nang raaw khaao mai thii bpra-dtuu kheun khreuuang|我们坐在登机口等待新消息。|等待
bplian-dtua|เปลี่ยนตั๋ว|bplian dtua|换票|动词|换票改签|ฉันต้องเปลี่ยนตั๋วจากรอบเช้าเป็นรอบบ่าย|chan dtawng bplian dtua jaak raawp chaao bpen raawp baai|我需要把早上的票换成下午的票。|改签
leuan-dtua|เลื่อนตั๋ว|leuan dtua|改签延期|动词|换票改签|ถ้าไม่ทันรถไฟ สามารถเลื่อนตั๋วได้ไหม|thaa mai than rot-fai saa-maat leuan dtua dai mai|如果赶不上火车，可以改签延期吗？|改签
khaaw-bplian-roop|ขอเปลี่ยนรอบ|khaaw bplian raawp|请求换班次|动词|换票改签|ขอเปลี่ยนรอบเรือจากบ่ายสองเป็นบ่ายสี่ได้ไหม|khaaw bplian raawp reua jaak baai saawng bpen baai sii dai mai|可以请求把船班从下午两点改到四点吗？|改签
roop-dtaw-bpai|รอบต่อไป|raawp dtaaw bpai|下一班|名词|换票改签|รอบต่อไปออกตอนห้าโมงเย็นและยังมีที่นั่ง|raawp dtaaw bpai aawk dtaawn haa moong yen lae yang mii thii-nang|下一班下午五点出发，还有座位。|班次
mii-thii-naang-mai|มีที่นั่งไหม|mii thii-nang mai|有座位吗|短语|换票改签|รอบเย็นยังมีที่นั่งไหมครับสำหรับสองคน|raawp yen yang mii thii-nang mai khrap sam-rap saawng khon|晚班还有两个座位吗？|座位
thii-naang-dtem|ที่นั่งเต็ม|thii-nang dtem|座位满了|短语|换票改签|ที่นั่งเต็มแล้ว เราต้องรอรอบต่อไป|thii-nang dtem laeo rao dtawng raaw raawp dtaaw bpai|座位满了，我们要等下一班。|座位
khaa-bplian-dtua|ค่าเปลี่ยนตั๋ว|khaa bplian dtua|改票费|名词|换票改签|พนักงานบอกว่าค่าเปลี่ยนตั๋วคือหนึ่งร้อยบาท|pha-nak-ngaan baawk waa khaa bplian dtua kheu neung raawy baat|工作人员说改票费是一百泰铢。|费用
dtua-mai|ตั๋วใหม่|dtua mai|新票|名词|换票改签|หลังเปลี่ยนเวลาแล้ว กรุณาเก็บตั๋วใหม่ไว้|lang bplian wee-laa laeo ga-ru-naa gep dtua mai wai|改时间后，请保留新票。|票务
dtua-doem|ตั๋วเดิม|dtua doem|原票|名词|换票改签|ต้องยื่นตั๋วเดิมก่อนรับตั๋วใหม่|dtawng yeun dtua doem gaawn rap dtua mai|领取新票前需要提交原票。|票务
dtua-chai-mai-dai|ตั๋วใช้ไม่ได้|dtua chai mai dai|票不能使用|短语|换票改签|ตั๋วใช้ไม่ได้เพราะวันที่ในระบบไม่ตรง|dtua chai mai dai phraw wan-thii nai ra-bop mai dtrong|票不能使用，因为系统里的日期不一致。|票务
bpai-dto-baw-ri-gaan|ไปโต๊ะบริการ|bpai dto baaw-ri-gaan|去服务台|动词|服务台帮助|ถ้ามีปัญหาเรื่องตั๋ว ให้ไปโต๊ะบริการด้านหน้า|thaa mii bpan-haa reuuang dtua hai bpai dto baaw-ri-gaan daan naa|如果票务有问题，请去前面的服务台。|服务台
khao-dter-chuai-leua|เคาน์เตอร์ช่วยเหลือ|khao-dter chuai-leua|帮助柜台|名词|服务台帮助|เคาน์เตอร์ช่วยเหลืออยู่ใกล้ประตูทางออก|khao-dter chuai-leua yuu glai bpra-dtuu thaang-aawk|帮助柜台在出口门附近。|服务台
suun-bo-ri-gaan|ศูนย์บริการ|suun baaw-ri-gaan|服务中心|名词|服务台帮助|ศูนย์บริการนักท่องเที่ยวเปิดถึงหกโมงเย็น|suun baaw-ri-gaan nak-thaawng-thiao bpoet theung hok moong yen|游客服务中心开到下午六点。|服务台
pha-nak-ngaan-chuai-leua|พนักงานช่วยเหลือ|pha-nak-ngaan chuai-leua|协助人员|名词|服务台帮助|พนักงานช่วยเหลือพาเราไปที่ประตูขึ้นรถ|pha-nak-ngaan chuai-leua phaa rao bpai thii bpra-dtuu kheun rot|协助人员带我们去乘车口。|服务
thaam-pha-nak-ngaan|ถามพนักงาน|thaam pha-nak-ngaan|询问工作人员|动词|服务台帮助|ถ้าอ่านป้ายไม่เข้าใจ ให้ถามพนักงานได้เลย|thaa aan bpaai mai khao-jai hai thaam pha-nak-ngaan dai loei|如果看不懂牌子，可以直接问工作人员。|服务
khaaw-khwaam-chuai-leua|ขอความช่วยเหลือ|khaaw khwaam chuai-leua|请求帮助|动词|请求帮助|ฉันขอความช่วยเหลือเพราะหาประตูขึ้นเครื่องไม่เจอ|chan khaaw khwaam chuai-leua phraw haa bpra-dtuu kheun khreuuang mai joe|我请求帮助，因为找不到登机口。|求助
chuai-duu-hai-naawy|ช่วยดูให้หน่อย|chuai duu hai naawy|请帮忙看一下|短语|请求帮助|ช่วยดูให้หน่อยได้ไหมว่าตั๋วนี้ขึ้นรถที่ไหน|chuai duu hai naawy dai mai waa dtua nii kheun rot thii nai|可以帮忙看一下这张票在哪里上车吗？|求助
chuai-thoo-hai|ช่วยโทรให้|chuai thoo hai|请帮忙打电话|动词|请求帮助|โทรศัพท์ฉันไม่มีสัญญาณ ช่วยโทรให้โรงแรมได้ไหม|thoo-ra-sap chan mai mii san-yaan chuai thoo hai roong-raem dai mai|我的手机没有信号，可以帮忙给酒店打电话吗？|求助
chuai-plae-hai|ช่วยแปลให้|chuai bplae hai|请帮忙翻译|动词|请求帮助|ช่วยแปลให้หน่อยได้ไหม ฉันไม่เข้าใจประกาศนี้|chuai bplae hai naawy dai mai chan mai khao-jai bpra-gaat nii|可以帮忙翻译一下吗？我不懂这个通知。|求助
chuai-khian-hai|ช่วยเขียนให้|chuai khiian hai|请帮忙填写|动词|请求帮助|ฉันเขียนภาษาไทยไม่เก่ง ช่วยเขียนที่อยู่ให้ได้ไหม|chan khiian phaa-saa thai mai geng chuai khiian thii-yuu hai dai mai|我泰语写得不好，可以帮忙写地址吗？|求助
chuai-phaa-bpai|ช่วยพาไป|chuai phaa bpai|请带我去|动词|请求帮助|ช่วยพาไปเคาน์เตอร์สายการบินได้ไหมครับ|chuai phaa bpai khao-dter saai-gaan-bin dai mai khrap|可以请你带我去航空公司柜台吗？|求助
dtit-dtaaw-khrai|ติดต่อใคร|dtit-dtaaw khrai|联系谁|短语|请求帮助|ถ้ากระเป๋าหาย ฉันควรติดต่อใครก่อน|thaa gra-bpao haai chan khuan dtit-dtaaw khrai gaawn|如果行李丢了，我应该先联系谁？|求助
ber-chuk-chern|เบอร์ฉุกเฉิน|ber chuk-chern|紧急电话|名词|请求帮助|กรุณาเก็บเบอร์ฉุกเฉินไว้ในโทรศัพท์ระหว่างเที่ยว|ga-ru-naa gep ber chuk-chern wai nai thoo-ra-sap ra-waang thiao|旅行期间请把紧急电话存在手机里。|求助
mai-mii-internet|ไม่มีอินเทอร์เน็ต|mai mii in-thoe-net|没有网络|短语|请求帮助|ฉันไม่มีอินเทอร์เน็ต จึงเปิดแผนที่ไม่ได้|chan mai mii in-thoe-net jeung bpoet phaen-thii mai dai|我没有网络，所以打不开地图。|网络
bhaet-mot|แบตหมด|baet mot|电池没电|短语|请求帮助|โทรศัพท์แบตหมด ฉันจึงติดต่อเพื่อนไม่ได้|thoo-ra-sap baet mot chan jeung dtit-dtaaw pheuan mai dai|手机没电了，所以我联系不上朋友。|手机
khaaw-yuem-thoo-ra-sap|ขอยืมโทรศัพท์|khaaw yeum thoo-ra-sap|借用电话|动词|请求帮助|ขอยืมโทรศัพท์โทรหาโรงแรมสักครู่ได้ไหม|khaaw yeum thoo-ra-sap thoo haa roong-raem sak khruu dai mai|可以借用电话给酒店打一下吗？|求助
khaaw-yuem-sai-chaat|ขอยืมสายชาร์จ|khaaw yeum saai chaat|借充电线|动词|请求帮助|ขอยืมสายชาร์จได้ไหม แบตฉันเหลือสองเปอร์เซ็นต์|khaaw yeum saai chaat dai mai baet chan leua saawng poe-sen|可以借充电线吗？我的电只剩百分之二。|手机
haawng-chaa-rj|ห้องชาร์จ|haawng chaat|充电区|名词|请求帮助|สนามบินมีห้องชาร์จใกล้ประตูหมายเลขสิบ|sa-naam-bin mii haawng chaat glai bpra-dtuu maai-lek sip|机场在十号门附近有充电区。|手机
phaen-doen-thaang|แผนเดินทาง|phaen doen-thaang|行程计划|名词|行程调整|แผนเดินทางวันนี้ต้องเปลี่ยนเพราะฝนตกหนัก|phaen doen-thaang wan-nii dtawng bplian phraw fon dtok nak|今天的行程计划因为大雨必须改变。|行程
bplian-phaen|เปลี่ยนแผน|bplian phaen|改变计划|动词|行程调整|เราต้องเปลี่ยนแผนและพักที่เมืองนี้อีกหนึ่งคืน|rao dtawng bplian phaen lae phak thii meuuang nii iik neung kheun|我们需要改变计划，在这个城市再住一晚。|行程
leuan-wan-doen-thaang|เลื่อนวันเดินทาง|leuan wan doen-thaang|推迟出行日期|动词|行程调整|ฉันเลื่อนวันเดินทางเพราะยังไม่หายป่วย|chan leuan wan doen-thaang phraw yang mai haai bpuai|我因为病还没好而推迟出行日期。|行程
roet-wan-doen-thaang|เร่งวันเดินทาง|reng wan doen-thaang|提前出行日期|动词|行程调整|เราต้องเร่งวันเดินทางกลับเพราะมีธุระด่วน|rao dtawng reng wan doen-thaang glap phraw mii thu-ra duan|我们因为有急事必须提前返程日期。|行程
phak-iik-neung-khuen|พักอีกหนึ่งคืน|phak iik neung kheun|再住一晚|动词|行程调整|ถ้ารถไฟยกเลิก เราอาจต้องพักอีกหนึ่งคืน|thaa rot-fai yok-loek rao aat dtawng phak iik neung kheun|如果火车取消，我们可能要再住一晚。|住宿
ha-roong-raem-mai|หาโรงแรมใหม่|haa roong-raem mai|找新酒店|动词|行程调整|โรงแรมเดิมเต็มแล้ว เราต้องหาโรงแรมใหม่ใกล้สถานี|roong-raem doem dtem laeo rao dtawng haa roong-raem mai glai sa-thaa-nii|原来的酒店满了，我们要找车站附近的新酒店。|住宿
dtat-bprograam|ตัดโปรแกรม|dtat bproo-graem|删减行程|动词|行程调整|เพราะเวลาน้อย เราต้องตัดโปรแกรมไปวัดหนึ่งแห่ง|phraw wee-laa naawy rao dtawng dtat bproo-graem bpai wat neung haeng|因为时间少，我们要删减一个寺庙行程。|行程
phoem-bprograam|เพิ่มโปรแกรม|phoem bproo-graem|增加行程|动词|行程调整|ถ้าพรุ่งนี้อากาศดี เราอยากเพิ่มโปรแกรมไปทะเล|thaa phrung-nii aa-gaat dii rao yaak phoem bproo-graem bpai tha-lee|如果明天天气好，我们想增加去海边的行程。|行程
glap-reo-kheun|กลับเร็วขึ้น|glap reo kheun|早点回去|动词|行程调整|ฉันต้องกลับเร็วขึ้นเพราะที่บ้านมีเรื่องด่วน|chan dtawng glap reo kheun phraw thii baan mii reuuang duan|我因为家里有急事必须早点回去。|行程
glap-chaa-long|กลับช้าลง|glap chaa long|晚点回去|动词|行程调整|เราอาจกลับช้าลงถ้าฝนยังตกไม่หยุด|rao aat glap chaa long thaa fon yang dtok mai yut|如果雨还不停，我们可能晚点回去。|行程
roop-thaai-eek-ga-saan|รูปถ่ายเอกสาร|ruup-thaai eek-ga-saan|证件照片|名词|请求帮助|ควรมีรูปถ่ายเอกสารไว้ในโทรศัพท์เวลาเดินทาง|khuan mii ruup-thaai eek-ga-saan wai nai thoo-ra-sap wee-laa doen-thaang|旅行时手机里应该有证件照片。|证件
sam-nao-eek-ga-saan|สำเนาเอกสาร|sam-nao eek-ga-saan|文件复印件|名词|请求帮助|ถ้าเอกสารจริงหาย สำเนาเอกสารอาจช่วยได้|thaa eek-ga-saan jing haai sam-nao eek-ga-saan aat chuai dai|如果原件丢失，文件复印件可能有帮助。|证件
bpai-sathaan-thuut|ไปสถานทูต|bpai sa-thaan-thuut|去大使馆|动词|请求帮助|เมื่อพาสปอร์ตหาย เราต้องไปสถานทูตตอนเช้า|meua phaas-paawt haai rao dtawng bpai sa-thaan-thuut dtaawn chaao|护照丢失时，我们早上要去大使馆。|证件
paspot-haai|พาสปอร์ตหาย|phaas-paawt haai|护照丢失|短语|请求帮助|พาสปอร์ตหายเป็นเรื่องใหญ่ ต้องรีบแจ้งตำรวจ|phaas-paawt haai bpen reuuang yai dtawng riip jaeng dtam-ruat|护照丢失是大事，必须赶紧报警。|证件
jaeng-dtam-ruat|แจ้งตำรวจ|jaeng dtam-ruat|报警|动词|请求帮助|ถ้าถูกขโมยของ ให้แจ้งตำรวจและขอใบแจ้งความ|thaa thuuk kha-mooi khaawng hai jaeng dtam-ruat lae khaaw bai jaeng-khwaam|如果东西被偷，请报警并申请报案单。|报警
bai-jaeng-khwaam|ใบแจ้งความ|bai jaeng-khwaam|报案单|名词|请求帮助|โรงแรมขอใบแจ้งความเมื่อฉันทำเอกสารหาย|roong-raem khaaw bai jaeng-khwaam meua chan tham eek-ga-saan haai|我弄丢证件时，酒店要求报案单。|报警
thuuk-kha-mooi|ถูกขโมย|thuuk kha-mooi|被偷|短语|请求帮助|กระเป๋าสตางค์ถูกขโมยตอนขึ้นรถไฟฟ้า|gra-bpao sa-dtaang thuuk kha-mooi dtaawn kheun rot-fai-faa|钱包在坐轻轨时被偷了。|报警
mai-bplot-phai|ไม่ปลอดภัย|mai bplaawt-phai|不安全|短语|请求帮助|ถนนนี้มืดมากและดูไม่ปลอดภัยสำหรับนักท่องเที่ยว|tha-non nii meut maak lae duu mai bplaawt-phai sam-rap nak-thaawng-thiao|这条路很黑，对游客来说看起来不安全。|安全
phaa-bpai-thii-bplot-phai|พาไปที่ปลอดภัย|phaa bpai thii bplaawt-phai|带到安全地方|动词|请求帮助|ช่วยพาฉันไปที่ปลอดภัยและเรียกรถแท็กซี่ได้ไหม|chuai phaa chan bpai thii bplaawt-phai lae riiak rot thaek-sii dai mai|可以带我去安全的地方并叫出租车吗？|安全
phuu-doen-thaang|ผู้เดินทาง|phuu doen-thaang|旅客|名词|服务台帮助|ผู้เดินทางควรมาถึงสนามบินก่อนเวลาสองชั่วโมง|phuu doen-thaang khuan maa theung sa-naam-bin gaawn wee-laa saawng chua-moong|旅客应该提前两小时到达机场。|旅客
khon-thaawng-thiao|คนท่องเที่ยว|khon thaawng-thiao|游客|名词|服务台帮助|คนท่องเที่ยวหลายคนถามทางไปวัดใหญ่|khon thaawng-thiao laai khon thaam thaang bpai wat yai|很多游客询问去大寺庙的路。|游客
bai-kham-raawng|ใบคำร้อง|bai kham-raawng|申请表|名词|服务台帮助|พนักงานให้กรอกใบคำร้องเรื่องกระเป๋าหาย|pha-nak-ngaan hai graawk bai kham-raawng reuuang gra-bpao haai|工作人员让填写行李丢失申请表。|表格
graawk-khaaw-muun|กรอกข้อมูล|graawk khaaw-muun|填写资料|动词|服务台帮助|กรุณากรอกข้อมูลชื่อ เบอร์โทร และที่พัก|ga-ru-naa graawk khaaw-muun cheu ber thoo lae thii-phak|请填写姓名、电话和住宿地点。|表格
song-khaaw-muun|ส่งข้อมูล|song khaaw-muun|提交资料|动词|服务台帮助|หลังกรอกแบบฟอร์มแล้ว ส่งข้อมูลให้เจ้าหน้าที่ตรวจ|lang graawk baep-faawm laeo song khaaw-muun hai jao-naa-thii dtruat|填完表格后，把资料交给工作人员检查。|表格
jaeng-ber-thoo|แจ้งเบอร์โทร|jaeng ber thoo|告知电话号码|动词|服务台帮助|กรุณาแจ้งเบอร์โทรที่ติดต่อได้ให้สายการบิน|ga-ru-naa jaeng ber thoo thii dtit-dtaaw dai hai saai-gaan-bin|请把能联系上的电话号码告知航空公司。|电话
rap-khaao-jaak-jao-naa-thii|รับข่าวจากเจ้าหน้าที่|rap khaao jaak jao-naa-thii|接收工作人员消息|动词|服务台帮助|เรานั่งรอรับข่าวจากเจ้าหน้าที่เรื่องกระเป๋า|rao nang raaw rap khaao jaak jao-naa-thii reuuang gra-bpao|我们坐着等待工作人员关于行李的消息。|服务
bpra-dtuu-kheun-khreuuang-bplian|ประตูขึ้นเครื่องเปลี่ยน|bpra-dtuu kheun khreuuang bplian|登机口改变|短语|延误取消|ประตูขึ้นเครื่องเปลี่ยนจากสิบสองเป็นสิบห้า|bpra-dtuu kheun khreuuang bplian jaak sip-saawng bpen sip-haa|登机口从十二号改为十五号。|机场
dtok-khreuuang|ตกเครื่อง|dtok khreuuang|误机|动词|延误取消|ถ้าออกจากโรงแรมช้าเกินไป อาจตกเครื่องได้|thaa aawk jaak roong-raem chaa goen bpai aat dtok khreuuang dai|如果离开酒店太晚，可能会误机。|机场
dtok-rot|ตกรถ|dtok rot|误车|动词|延误取消|เราเกือบตกรถเพราะหาชานชาลาไม่เจอ|rao geuap dtok rot phraw haa chaan-chaa-laa mai joe|我们差点误车，因为找不到站台。|交通
chaan-chaa-laa-phit|ชานชาลาผิด|chaan-chaa-laa phit|站台错了|短语|迷路问路|ฉันรอที่ชานชาลาผิดจึงพลาดรถเที่ยวแรก|chan raaw thii chaan-chaa-laa phit jeung phlaat rot thiao raek|我在错的站台等，所以错过了第一班车。|交通
phlaat-rot|พลาดรถ|phlaat rot|错过车|动词|延误取消|ถ้าพลาดรถรอบนี้ ต้องซื้อตั๋วใหม่|thaa phlaat rot raawp nii dtawng seu dtua mai|如果错过这班车，就要买新票。|交通
phlaat-theiao-bin|พลาดเที่ยวบิน|phlaat thiao-bin|错过航班|动词|延误取消|เขาพลาดเที่ยวบินเพราะรถติดระหว่างทาง|khao phlaat thiao-bin phraw rot dtit ra-waang thaang|他因为路上堵车错过航班。|机场
thii-phak-dtem|ที่พักเต็ม|thii-phak dtem|住宿满了|短语|行程调整|ที่พักเต็มทุกที่เพราะเป็นวันหยุดยาว|thii-phak dtem thuk thii phraw bpen wan-yut yaao|因为是长假，所有住宿都满了。|住宿
khaaw-ha-thii-phak|ขอหาที่พัก|khaaw haa thii-phak|请求帮找住宿|动词|请求帮助|ช่วยขอหาที่พักใกล้สถานีให้หน่อยได้ไหม|chuai khaaw haa thii-phak glai sa-thaa-nii hai naawy dai mai|可以帮忙找车站附近的住宿吗？|住宿
khaaw-rian-taek-sii|ขอเรียกแท็กซี่|khaaw riiak thaek-sii|请求叫出租车|动词|请求帮助|ฝนตกหนักมาก ขอเรียกแท็กซี่ไปโรงแรมได้ไหม|fon dtok nak maak khaaw riiak thaek-sii bpai roong-raem dai mai|雨下得很大，可以请求叫出租车去酒店吗？|交通
rot-mai-maa|รถไม่มา|rot mai maa|车没来|短语|延误取消|รถไม่มาตามเวลา เราจึงโทรถามบริษัททัวร์|rot mai maa dtaam wee-laa rao jeung thoo thaam baaw-ri-sat thua|车没有按时来，所以我们打电话问旅行社。|交通
khon-khap-mai-joe|คนขับไม่เจอ|khon khap mai joe|找不到司机|短语|请求帮助|ฉันหาคนขับไม่เจอที่ประตูทางออกสาม|chan haa khon khap mai joe thii bpra-dtuu thaang-aawk saam|我在三号出口找不到司机。|交通
jao-naa-thii-bok|เจ้าหน้าที่บอก|jao-naa-thii baawk|工作人员告知|短语|服务台帮助|เจ้าหน้าที่บอกให้รอที่ประตูใหม่อีกสิบนาที|jao-naa-thii baawk hai raaw thii bpra-dtuu mai iik sip naa-thii|工作人员告知在新的门再等十分钟。|服务
khaaw-baep-faawm|ขอแบบฟอร์ม|khaaw baep-faawm|索取表格|动词|服务台帮助|ฉันขอแบบฟอร์มสำหรับแจ้งของหายที่เคาน์เตอร์|chan khaaw baep-faawm sam-rap jaeng khaawng haai thii khao-dter|我在柜台索取申报失物的表格。|表格
dtit-dtaaw-bor-risat-thua|ติดต่อบริษัททัวร์|dtit-dtaaw baaw-ri-sat thua|联系旅行社|动词|行程调整|เมื่อรถไม่มา เราติดต่อบริษัททัวร์ทันที|meua rot mai maa rao dtit-dtaaw baaw-ri-sat thua than-thii|车没来时，我们马上联系旅行社。|旅行社
hua-naa-thua|หัวหน้าทัวร์|hua-naa thua|导游领队|名词|服务台帮助|หัวหน้าทัวร์นับคนก่อนขึ้นรถไปสนามบิน|hua-naa thua nap khon gaawn kheun rot bpai sa-naam-bin|导游领队在上车去机场前清点人数。|旅行社
dtok-glum|ตกกลุ่ม|dtok glum|掉队|动词|请求帮助|ฉันตกกลุ่มตอนถ่ายรูปและไม่รู้ว่าต้องไปทางไหน|chan dtok glum dtaawn thaai ruup lae mai ruu waa dtawng bpai thaang nai|我拍照时掉队了，不知道该往哪边走。|团队
phuean-haai|เพื่อนหาย|pheuan haai|同伴走散|短语|请求帮助|เพื่อนหายในตลาดกลางคืนแต่เรามีจุดนัดพบ|pheuan haai nai dta-laat glaang-kheun dtae rao mii jut nat phop|同伴在夜市走散了，但我们有集合点。|团队
raw-phuean|รอเพื่อน|raaw pheuan|等同伴|动词|行程调整|เราต้องรอเพื่อนที่ล็อบบี้ก่อนออกไปท่าเรือ|rao dtawng raaw pheuan thii lawp-bii gaawn aawk bpai thaa-reua|我们要在大堂等同伴，再去码头。|团队
rian-phaen-mai|เรียงแผนใหม่|riiang phaen mai|重新安排计划|动词|行程调整|หลังรถไฟล่าช้า เราต้องเรียงแผนใหม่ทั้งหมด|lang rot-fai laa-chaa rao dtawng riiang phaen mai thang-mot|火车晚点后，我们必须重新安排全部计划。|行程
khaaw-kham-nae-nam|ขอคำแนะนำ|khaaw kham-nae-nam|请求建议|动词|请求帮助|ขอคำแนะนำหน่อยครับ ถ้าจะไปสนามบินควรไปทางไหน|khaaw kham-nae-nam naawy khrap thaa ja bpai sa-naam-bin khuan bpai thaang nai|请给点建议，如果去机场应该走哪条路？|求助
tham-arai-dii|ทำอะไรดี|tham a-rai dii|怎么办好|短语|请求帮助|ตั๋วใช้ไม่ได้แล้ว เราควรทำอะไรดีคะ|dtua chai mai dai laeo rao khuan tham a-rai dii kha|票不能用了，我们该怎么办好？|求助
`;

export const VOCABULARY_EXPANSION_A2_TRAVEL_PROBLEMS_HELP_01: VocabularyExpansionA2TravelProblemsHelpCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
