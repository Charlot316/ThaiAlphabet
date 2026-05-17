type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "公交地铁船" | "车站站台" | "路线换乘" | "票价买票" | "上下车船" | "导航问路" | "走路距离" | "确认提醒";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2PublicTransportNavigationCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-transport-navigation-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2PublicTransportNavigationCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于公共交通、导航问路或确认路线。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，出行时要按交通工具、站点、方向和换乘动作区分。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["问路时常用 ไป...ยังไง、ต้องลงที่ไหน、อีกกี่ป้าย、ไกลไหม 等句型。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
rot-mee|รถเมล์|rot-mee|公交车|名词|公交地铁船|ฉันนั่งรถเมล์ไปตลาดทุกวันเสาร์|chan nang rot-mee bpai dta-laat thuk wan-sao|我每周六坐公交去市场。|公交
rot-mee-sai-nii|รถเมล์สายนี้|rot-mee saai nii|这路公交|名词|公交地铁船|รถเมล์สายนี้ผ่านโรงพยาบาลไหมครับ|rot-mee saai nii phaan roong-pha-yaa-baan mai khrap|这路公交经过医院吗？|公交
rot-mee-sai-nai|รถเมล์สายไหน|rot-mee saai nai|哪路公交|短语|导航问路|ไปสถานีรถไฟฟ้าต้องขึ้นรถเมล์สายไหน|bpai sa-thaa-nii rot-fai-faa dtawng kheun rot-mee saai nai|去轻轨站要坐哪路公交？|问路
bpaai-rot-mee|ป้ายรถเมล์|bpaai rot-mee|公交站牌；公交站|名词|车站站台|ป้ายรถเมล์อยู่หน้าร้านขายยาใกล้ตลาด|bpaai rot-mee yuu naa raan khaai yaa glai dta-laat|公交站在市场附近药店前面。|车站
raw-rot-mee|รอรถเมล์|raaw rot-mee|等公交|动词|公交地铁船|เรารอรถเมล์มาสิบนาทีแล้ว แต่รถยังไม่มา|rao raaw rot-mee maa sip naa-thii laaeo dtaae rot yang mai maa|我们等公交已经十分钟了，但车还没来。|公交
kheun-rot-mee|ขึ้นรถเมล์|kheun rot-mee|上公交|动词|上下车船|ขึ้นรถเมล์ตรงประตูหน้าแล้วจ่ายเงินกับคนเก็บเงิน|kheun rot-mee dtrong bpra-dtuu naa laaeo jaai ngoen gap khon gep ngoen|从前门上公交，然后向售票员付钱。|上下车
long-rot-mee|ลงรถเมล์|long rot-mee|下公交|动词|上下车船|ถ้าถึงโรงเรียนแล้ว ต้องกดกริ่งก่อนลงรถเมล์|thaa thueng roong-riian laaeo dtawng got gring gaawn long rot-mee|如果到学校了，下公交前要按铃。|上下车
got-gring|กดกริ่ง|got gring|按铃|动词|上下车船|อย่าลืมกดกริ่งก่อนถึงป้ายหน้า|yaa luem got gring gaawn thueng bpaai naa|到下一站前别忘了按铃。|公交
khon-gep-ngoen|คนเก็บเงิน|khon gep ngoen|公交售票员；收钱的人|名词|票价买票|คนเก็บเงินบอกว่าค่าโดยสารสิบห้าบาท|khon gep ngoen baawk waa khaa-dooi-saan sip-haa baat|售票员说车费十五泰铢。|票价
khaa-dooi-saan|ค่าโดยสาร|khaa-dooi-saan|车费；交通费|名词|票价买票|ค่าโดยสารเรือถูกกว่ารถไฟฟ้านิดหน่อย|khaa-dooi-saan ruea thuuk gwaa rot-fai-faa nit naawy|船费比轻轨便宜一点。|票价
dtua-dooi-saan|ตั๋วโดยสาร|dtua dooi-saan|车票；乘车票|名词|票价买票|เก็บตั๋วโดยสารไว้จนกว่าจะลงรถ|gep dtua dooi-saan wai jon gwaa ja long rot|请保留车票直到下车。|票
sue-dtua|ซื้อตั๋ว|sue dtua|买票|动词|票价买票|เราต้องซื้อตั๋วก่อนเข้าชานชาลา|rao dtawng sue dtua gaawn khao chaan-chaa-laa|我们进站台前要买票。|票
dtuu-sue-dtua|ตู้ซื้อตั๋ว|dtuu sue dtua|售票机|名词|票价买票|ตู้ซื้อตั๋วรับเหรียญและธนบัตรย่อย|dtuu sue dtua rap riian lae tha-na-bat yaawy|售票机收硬币和小面额纸币。|票
bat-dooi-saan|บัตรโดยสาร|bat dooi-saan|交通卡；乘车卡|名词|票价买票|บัตรโดยสารใบนี้ใช้ขึ้นรถไฟฟ้าได้หลายสาย|bat dooi-saan bai nii chai kheun rot-fai-faa dai laai saai|这张交通卡可以乘坐多条轻轨线路。|票
dtae-bat|แตะบัตร|dtae bat|刷卡进出站|动词|票价买票|แตะบัตรที่ประตูก่อนเข้าและออกจากสถานี|dtae bat thii bpra-dtuu gaawn khao lae aawk jaak sa-thaa-nii|进出车站前在闸门刷卡。|票
dterm-ngoen-bat|เติมเงินบัตร|dterm ngoen bat|给卡充值|动词|票价买票|ก่อนขึ้นรถไฟฟ้า ฉันต้องเติมเงินบัตรอีกหนึ่งร้อยบาท|gaawn kheun rot-fai-faa chan dtawng dterm ngoen bat iik neung raawy baat|坐轻轨前，我要再给卡充值一百泰铢。|票
yawt-bat|ยอดบัตร|yaawt bat|卡内余额|名词|票价买票|ยอดบัตรไม่พอ ต้องเติมเงินก่อนเข้าเครื่องกั้น|yaawt bat mai phaaw dtawng dterm ngoen gaawn khao khreuuang gan|卡内余额不够，进闸机前要充值。|票
khreuuang-gan|เครื่องกั้น|khreuuang gan|闸机|名词|车站站台|เครื่องกั้นไม่เปิดเพราะฉันแตะบัตรเร็วเกินไป|khreuuang gan mai bpoet phraw chan dtae bat reo goen bpai|闸机没开，因为我刷卡太快了。|车站
sa-thaa-nii|สถานี|sa-thaa-nii|车站|名词|车站站台|สถานีนี้มีทางออกไปห้างและโรงพยาบาล|sa-thaa-nii nii mii thaang aawk bpai haang lae roong-pha-yaa-baan|这个车站有通往商场和医院的出口。|车站
sa-thaa-nii-dton-thaang|สถานีต้นทาง|sa-thaa-nii dton-thaang|始发站|名词|路线换乘|สถานีต้นทางมีที่นั่งว่างมากกว่าสถานีกลางทาง|sa-thaa-nii dton-thaang mii thii-nang waang maak gwaa sa-thaa-nii glaang-thaang|始发站比中途站有更多空座位。|车站
sa-thaa-nii-bplaai-thaang|สถานีปลายทาง|sa-thaa-nii bplaai-thaang|终点站|名词|路线换乘|รถไฟขบวนนี้ไปสถานีปลายทางที่สนามกีฬา|rot-fai kha-buan nii bpai sa-thaa-nii bplaai-thaang thii sa-naam gii-laa|这班列车去体育场终点站。|车站
chaan-chaa-laa|ชานชาลา|chaan-chaa-laa|站台|名词|车站站台|กรุณายืนหลังเส้นเหลืองบนชานชาลา|ga-ru-naa yuen lang sen lueang bon chaan-chaa-laa|请站在站台黄线后。|站台
chaan-chaa-laa-nai|ชานชาลาไหน|chaan-chaa-laa nai|哪个站台|短语|车站站台|รถไฟไปสนามบินต้องขึ้นชานชาลาไหน|rot-fai bpai sa-naam-bin dtawng kheun chaan-chaa-laa nai|去机场的列车要在哪个站台上？|站台
thaang-khao|ทางเข้า|thaang khao|入口|名词|车站站台|ทางเข้าสถานีอยู่ข้างร้านกาแฟ|thaang khao sa-thaa-nii yuu khaang raan gaa-faae|车站入口在咖啡店旁边。|车站
thaang-aawk|ทางออก|thaang aawk|出口|名词|车站站台|ถ้าจะไปตลาด ให้ใช้ทางออกสอง|thaa ja bpai dta-laat hai chai thaang aawk saawng|如果要去市场，请走二号出口。|车站
thaang-aawk-nai|ทางออกไหน|thaang aawk nai|哪个出口|短语|导航问路|ไปพิพิธภัณฑ์ต้องออกทางออกไหนครับ|bpai phi-phit-tha-phan dtawng aawk thaang aawk nai khrap|去博物馆要从哪个出口出？|问路
thaang-aawk-song|ทางออกสอง|thaang aawk saawng|二号出口|名词|车站站台|เจอกันที่ทางออกสองหลังเลิกเรียน|joe gan thii thaang aawk saawng lang loek riian|放学后在二号出口见。|车站
bpaai-bawk-thaang|ป้ายบอกทาง|bpaai baawk thaang|指路牌|名词|导航问路|ถ้าหาทางออกไม่เจอ ให้ดูป้ายบอกทางสีเขียว|thaa haa thaang aawk mai joe hai duu bpaai baawk thaang sii khiaao|如果找不到出口，就看绿色指路牌。|导航
phaaen-thii-sa-thaa-nii|แผนที่สถานี|phaaen-thii sa-thaa-nii|车站地图|名词|导航问路|แผนที่สถานีแสดงห้องน้ำ ลิฟต์ และทางออกทั้งหมด|phaaen-thii sa-thaa-nii sa-daaeng haawng-naam lif lae thaang aawk thang-mot|车站地图显示洗手间、电梯和所有出口。|导航
phaaen-thii-rot|แผนที่รถ|phaaen-thii rot|公交/线路图|名词|路线换乘|ฉันดูแผนที่รถก่อนเลือกว่าจะขึ้นสายไหน|chan duu phaaen-thii rot gaawn leuuak waa ja kheun saai nai|我先看线路图，再选择坐哪路车。|路线
sen-thaang|เส้นทาง|sen-thaang|路线|名词|路线换乘|เส้นทางนี้ผ่านแม่น้ำและตลาดเก่า|sen-thaang nii phaan maae-naam lae dta-laat gao|这条路线经过河和旧市场。|路线
saai-rot|สายรถ|saai rot|车线；线路|名词|路线换乘|สายรถนี้วิ่งจากตลาดไปมหาวิทยาลัย|saai rot nii wing jaak dta-laat bpai ma-haa-wit-tha-yaa-lai|这条线路从市场开到大学。|路线
saai-thii-thuuk|สายที่ถูก|saai thii thuuk|正确线路|名词|确认提醒|ช่วยดูให้หน่อยว่านี่คือสายที่ถูกไหม|chuai duu hai naawy waa nii khue saai thii thuuk mai|请帮我看一下这是不是正确线路。|确认
kheun-phit-saai|ขึ้นผิดสาย|kheun phit saai|坐错线路|动词|确认提醒|ฉันขึ้นผิดสายจึงต้องลงป้ายหน้าและกลับรถ|chan kheun phit saai jeung dtawng long bpaai naa lae glap rot|我坐错线路，所以要下一站下车再换方向。|提醒
bpai-phit-thaang|ไปผิดทาง|bpai phit thaang|走错方向|动词|确认提醒|ถ้าไปผิดทาง ให้ถามเจ้าหน้าที่ที่สถานี|thaa bpai phit thaang hai thaam jao-naa-thii thii sa-thaa-nii|如果走错方向，就问车站工作人员。|提醒
glap-thaang|กลับทาง|glap thaang|反方向；掉头方向|动词|路线换乘|เราขึ้นรถผิดฝั่ง ต้องกลับทางไปอีกด้าน|rao kheun rot phit fang dtawng glap thaang bpai iik daan|我们在错的一侧上车了，要去另一边反方向。|路线
khon-la-fang|คนละฝั่ง|khon la fang|另一侧；不同边|短语|路线换乘|ป้ายรถเมล์ขากลับอยู่คนละฝั่งถนน|bpaai rot-mee khaa glap yuu khon la fang tha-non|回程公交站在马路另一侧。|路线
fang-trong-khaam|ฝั่งตรงข้าม|fang dtrong khaam|对面一侧|名词|导航问路|ร้านสะดวกซื้ออยู่ฝั่งตรงข้ามสถานี|raan sa-duak-sue yuu fang dtrong khaam sa-thaa-nii|便利店在车站对面。|导航
khaam-tha-non|ข้ามถนน|khaam tha-non|过马路|动词|走路距离|ต้องข้ามถนนที่ไฟแดงก่อนถึงป้ายรถเมล์|dtawng khaam tha-non thii fai daaeng gaawn thueng bpaai rot-mee|到公交站前要在红绿灯处过马路。|步行
fai-daeng|ไฟแดง|fai daaeng|红绿灯；红灯|名词|走路距离|เลี้ยวซ้ายที่ไฟแดงแล้วเดินตรงไปอีกนิด|liaao saai thii fai daaeng laaeo doen dtrong bpai iik nit|在红绿灯左转，然后再直走一点。|导航
thaang-maa-laai|ทางม้าลาย|thaang maa-laai|斑马线|名词|走路距离|กรุณาข้ามถนนตรงทางม้าลายเพื่อความปลอดภัย|ga-ru-naa khaam tha-non dtrong thaang maa-laai phuea khwaam bplaawt-phai|为了安全，请在斑马线过马路。|步行
doen-dtrong-bpai|เดินตรงไป|doen dtrong bpai|直走|动词|导航问路|จากสถานีเดินตรงไปประมาณห้านาทีจะเห็นร้านยา|jaak sa-thaa-nii doen dtrong bpai bpra-maan haa naa-thii ja hen raan yaa|从车站直走大约五分钟会看到药店。|问路
liaao-saai|เลี้ยวซ้าย|liaao saai|左转|动词|导航问路|ถึงธนาคารแล้วเลี้ยวซ้ายไปทางท่าเรือ|thueng tha-naa-khaan laaeo liaao saai bpai thaang thaa-ruea|到银行后左转往码头方向走。|问路
liaao-khwaa|เลี้ยวขวา|liaao khwaa|右转|动词|导航问路|ออกจากทางออกสามแล้วเลี้ยวขวา|aawk jaak thaang aawk saam laaeo liaao khwaa|从三号出口出来后右转。|问路
doen-yawn-glap|เดินย้อนกลับ|doen yaawn glap|往回走|动词|导航问路|คุณเดินเลยแล้ว ต้องเดินย้อนกลับไปสองร้อยเมตร|khun doen loei laaeo dtawng doen yaawn glap bpai saawng raawy met|你走过了，要往回走两百米。|问路
doen-loei|เดินเลย|doen loei|走过头|动词|确认提醒|ถ้าเดินเลยร้านกาแฟ แสดงว่าคุณไปไกลเกินไป|thaa doen loei raan gaa-faae sa-daaeng waa khun bpai glai goen bpai|如果走过咖啡店，说明你走太远了。|提醒
glai-mai|ไกลไหม|glai mai|远吗|短语|走路距离|จากสถานีไปโรงแรมไกลไหม หรือเดินได้|jaak sa-thaa-nii bpai roong-raaem glai mai rue doen dai|从车站到酒店远吗？还是可以走路？|距离
mai-glai|ไม่ไกล|mai glai|不远|形容词|走路距离|ตลาดไม่ไกลจากป้ายรถเมล์ เดินไปแค่สามนาที|dta-laat mai glai jaak bpaai rot-mee doen bpai khae saam naa-thii|市场离公交站不远，走路只要三分钟。|距离
glai-maak|ไกลมาก|glai maak|很远|形容词|走路距离|ถ้าเดินจะไกลมาก ควรต่อรถเมล์อีกสาย|thaa doen ja glai maak khuuan dtaaw rot-mee iik saai|如果走路会很远，应该再换一条公交。|距离
doen-dai|เดินได้|doen dai|可以走路到|短语|走路距离|จากท่าเรือไปวัดเดินได้ประมาณสิบนาที|jaak thaa-ruea bpai wat doen dai bpra-maan sip naa-thii|从码头到寺庙可以走路到，大约十分钟。|距离
doen-mai-wai|เดินไม่ไหว|doen mai wai|走不动；走不了|短语|走路距离|วันนี้ร้อนมาก ฉันเดินไม่ไหว ขอเรียกแท็กซี่ได้ไหม|wan-nii raawn maak chan doen mai wai khaaw riiak thaek-sii dai mai|今天很热，我走不动了，可以叫出租车吗？|距离
bpra-maan-haa-naa-thii|ประมาณห้านาที|bpra-maan haa naa-thii|大约五分钟|短语|走路距离|เดินจากสถานีถึงร้านอาหารประมาณห้านาที|doen jaak sa-thaa-nii thueng raan aa-haan bpra-maan haa naa-thii|从车站走到餐厅大约五分钟。|距离
bpra-maan-neung-gilo|ประมาณหนึ่งกิโล|bpra-maan neung gi-loo|大约一公里|短语|走路距离|จากที่นี่ถึงโรงพยาบาลประมาณหนึ่งกิโล|jaak thii nii thueng roong-pha-yaa-baan bpra-maan neung gi-loo|从这里到医院大约一公里。|距离
thaa-ruea|ท่าเรือ|thaa-ruea|码头|名词|公交地铁船|ท่าเรืออยู่หลังตลาดและมีป้ายบอกทางชัดเจน|thaa-ruea yuu lang dta-laat lae mii bpaai baawk thaang chat-jen|码头在市场后面，有清楚的指路牌。|船
ruea-dooi-saan|เรือโดยสาร|ruea dooi-saan|客船；渡船|名词|公交地铁船|เรือโดยสารไปฝั่งตรงข้ามออกทุกสิบห้านาที|ruea dooi-saan bpai fang dtrong khaam aawk thuk sip-haa naa-thii|去对岸的客船每十五分钟一班。|船
kheun-ruea|ขึ้นเรือ|kheun ruea|上船|动词|上下车船|ต้องขึ้นเรือที่ท่านี้และลงที่ท่าต่อไป|dtawng kheun ruea thii thaa nii lae long thii thaa dtaaw bpai|要在这个码头上船，在下一个码头下。|船
long-ruea|ลงเรือ|long ruea|下船|动词|上下车船|เมื่อถึงท่าสะพาน ให้เตรียมตัวลงเรือ|muea thueng thaa sa-phaan hai dtriiam dtua long ruea|到桥码头时，请准备下船。|船
thaa-dtaaw-bpai|ท่าต่อไป|thaa dtaaw bpai|下一码头|名词|公交地铁船|ท่าต่อไปคือท่าวัดใหญ่ อย่าลืมลงนะ|thaa dtaaw bpai khue thaa wat yai yaa luem long na|下一码头是大寺码头，别忘了下。|船
rot-fai-faa|รถไฟฟ้า|rot-fai-faa|轻轨；城市轨道|名词|公交地铁船|รถไฟฟ้าเร็วกว่าแท็กซี่ตอนรถติด|rot-fai-faa reo gwaa thaek-sii dtaawn rot dtit|堵车时轻轨比出租车快。|地铁
rot-fai-dtai-din|รถไฟใต้ดิน|rot-fai dtai din|地铁|名词|公交地铁船|รถไฟใต้ดินสายนี้ไปสถานีหัวลำโพง|rot-fai dtai din saai nii bpai sa-thaa-nii hua-lam-phoong|这条地铁线去华南蓬站。|地铁
kheun-rot-fai-faa|ขึ้นรถไฟฟ้า|kheun rot-fai-faa|坐轻轨|动词|上下车船|ฉันขึ้นรถไฟฟ้าไปทำงานทุกเช้า|chan kheun rot-fai-faa bpai tham ngaan thuk chaao|我每天早上坐轻轨上班。|地铁
long-sa-thaa-nii|ลงสถานี|long sa-thaa-nii|在某站下|动词|上下车船|ไปห้างนี้ต้องลงสถานีสยามแล้วเดินต่อ|bpai haang nii dtawng long sa-thaa-nii sa-yaam laaeo doen dtaaw|去这个商场要在暹罗站下，然后继续走。|地铁
dtaaw-rot|ต่อรถ|dtaaw rot|换车|动词|路线换乘|จากบ้านฉันต้องต่อรถหนึ่งครั้งถึงโรงเรียน|jaak baan chan dtawng dtaaw rot neung khrang thueng roong-riian|从我家到学校要换一次车。|换乘
dtaaw-rot-fai-faa|ต่อรถไฟฟ้า|dtaaw rot-fai-faa|换乘轻轨|动词|路线换乘|เราต้องต่อรถไฟฟ้าที่สถานีกลางเมือง|rao dtawng dtaaw rot-fai-faa thii sa-thaa-nii glaang mueang|我们要在市中心站换乘轻轨。|换乘
bplian-saai|เปลี่ยนสาย|bpliian saai|换线|动词|路线换乘|ถ้าจะไปสนามบิน ต้องเปลี่ยนสายที่สถานีนี้|thaa ja bpai sa-naam-bin dtawng bpliian saai thii sa-thaa-nii nii|如果要去机场，要在这一站换线。|换乘
sa-thaa-nii-bplian-saai|สถานีเปลี่ยนสาย|sa-thaa-nii bpliian saai|换乘站|名词|路线换乘|สถานีเปลี่ยนสายนี้คนเยอะมากตอนเย็น|sa-thaa-nii bpliian saai nii khon yoe maak dtaawn yen|这个换乘站傍晚人很多。|换乘
mai-dtawng-dtaaw|ไม่ต้องต่อ|mai dtawng dtaaw|不用换乘|短语|路线换乘|สายนี้ไปถึงมหาวิทยาลัยเลย ไม่ต้องต่อ|saai nii bpai thueng ma-haa-wit-tha-yaa-lai loei mai dtawng dtaaw|这条线直接到大学，不用换乘。|换乘
dtaaw-gii-khrang|ต่อกี่ครั้ง|dtaaw gii khrang|换几次|短语|路线换乘|จากสนามบินไปโรงแรมต้องต่อกี่ครั้ง|jaak sa-naam-bin bpai roong-raaem dtawng dtaaw gii khrang|从机场到酒店要换几次？|问路
bpai-yang-ngai|ไปยังไง|bpai yang ngai|怎么去|短语|导航问路|จากที่นี่ไปสถานีรถไฟฟ้าไปยังไงคะ|jaak thii nii bpai sa-thaa-nii rot-fai-faa bpai yang ngai kha|从这里到轻轨站怎么去？|问路
thaang-nai-reo-gwaa|ทางไหนเร็วกว่า|thaang nai reo gwaa|哪条路更快|短语|导航问路|ตอนนี้รถติด ทางไหนเร็วกว่าไปโรงพยาบาล|dtaawn-nii rot dtit thaang nai reo gwaa bpai roong-pha-yaa-baan|现在堵车，去医院哪条路更快？|问路
thaang-nii-thuuk-mai|ทางนี้ถูกไหม|thaang nii thuuk mai|这条路对吗|短语|确认提醒|ขอโทษครับ ทางนี้ถูกไหมถ้าจะไปท่าเรือ|khaaw-thoot khrap thaang nii thuuk mai thaa ja bpai thaa-ruea|不好意思，如果去码头，走这条路对吗？|确认
thueng-laaeo-mai|ถึงแล้วไหม|thueng laaeo mai|到了吗|短语|确认提醒|นี่ถึงสถานีที่ต้องลงแล้วไหมคะ|nii thueng sa-thaa-nii thii dtawng long laaeo mai kha|这是已经到该下的站了吗？|确认
long-thii-nai|ลงที่ไหน|long thii nai|在哪里下|短语|确认提醒|ไปพิพิธภัณฑ์ต้องลงที่ไหนครับ|bpai phi-phit-tha-phan dtawng long thii nai khrap|去博物馆要在哪里下？|确认
long-bpaai-naa|ลงป้ายหน้า|long bpaai naa|下一站下|短语|上下车船|ถ้าจะไปตลาด ให้ลงป้ายหน้าแล้วเดินกลับนิดหน่อย|thaa ja bpai dta-laat hai long bpaai naa laaeo doen glap nit naawy|如果要去市场，在下一站下，然后往回走一点。|上下车
iik-gii-bpaai|อีกกี่ป้าย|iik gii bpaai|还有几站|短语|确认提醒|จากที่นี่ถึงโรงเรียนอีกกี่ป้ายคะ|jaak thii nii thueng roong-riian iik gii bpaai kha|从这里到学校还有几站？|确认
iik-saawng-bpaai|อีกสองป้าย|iik saawng bpaai|还有两站|短语|确认提醒|อีกสองป้ายถึงโรงพยาบาล เตรียมตัวลงได้แล้ว|iik saawng bpaai thueng roong-pha-yaa-baan dtriiam dtua long dai laaeo|还有两站到医院，可以准备下车了。|提醒
dtriiam-dtua-long|เตรียมตัวลง|dtriiam dtua long|准备下车|动词|上下车船|เมื่อเห็นห้างใหญ่ ให้เตรียมตัวลงป้ายถัดไป|muea hen haang yai hai dtriiam dtua long bpaai that bpai|看到大商场时，准备在下一站下车。|上下车
long-phit-bpaai|ลงผิดป้าย|long phit bpaai|下错站|动词|确认提醒|ฉันลงผิดป้าย จึงต้องเดินย้อนกลับไปไกลมาก|chan long phit bpaai jeung dtawng doen yaawn glap bpai glai maak|我下错站了，所以要往回走很远。|提醒
chaa|ช้า|chaa|慢；晚|形容词|确认提醒|รถเมล์วันนี้ช้ามาก เพราะฝนตกหนัก|rot-mee wan-nii chaa maak phraw fon dtok nak|今天公交很慢，因为雨下得很大。|状态
reo|เร็ว|reo|快|形容词|确认提醒|รถไฟฟ้าเร็วและตรงเวลากว่ารถเมล์|rot-fai-faa reo lae dtrong wee-laa gwaa rot-mee|轻轨比公交快，也更准时。|状态
dtrong-wee-laa|ตรงเวลา|dtrong wee-laa|准时|形容词|确认提醒|เรือเที่ยวเช้าวันนี้มาตรงเวลาพอดี|ruea thiaao chaao wan-nii maa dtrong wee-laa phaaw-dii|今天早上的船正好准时到。|状态
maa-sai|มาสาย|maa saai|来晚；晚点|动词|确认提醒|รถเมล์มาสายสิบห้านาที ฉันเลยไปเรียนเกือบไม่ทัน|rot-mee maa saai sip-haa naa-thii chan loei bpai riian geuuap mai than|公交晚来十五分钟，所以我差点上课迟到。|状态
rot-dtit|รถติด|rot dtit|堵车|短语|确认提醒|ถ้ารถติดมาก เราเปลี่ยนไปขึ้นรถไฟฟ้าดีกว่า|thaa rot dtit maak rao bpliian bpai kheun rot-fai-faa dii gwaa|如果很堵车，我们换去坐轻轨比较好。|状态
khon-yoe|คนเยอะ|khon yoe|人多|短语|确认提醒|ตอนเลิกงานสถานีนี้คนเยอะมาก ต้องเดินช้า ๆ|dtaawn loek ngaan sa-thaa-nii nii khon yoe maak dtawng doen chaa chaa|下班时这个车站人很多，要慢慢走。|状态
thii-nang-waang|ที่นั่งว่าง|thii-nang waang|空座位|名词|公交地铁船|รถเมล์คันนี้ยังมีที่นั่งว่างด้านหลัง|rot-mee khan nii yang mii thii-nang waang daan lang|这辆公交后面还有空座位。|座位
yuen-bon-rot|ยืนบนรถ|yuen bon rot|在车上站着|动词|公交地铁船|ถ้าไม่มีที่นั่งว่าง ฉันยืนบนรถได้|thaa mai mii thii-nang waang chan yuen bon rot dai|如果没有空座位，我可以在车上站着。|座位
hai-thii-nang|ให้ที่นั่ง|hai thii-nang|让座|动词|公交地铁船|เด็กนักเรียนให้ที่นั่งกับคุณยายบนรถไฟฟ้า|dek nak-riian hai thii-nang gap khun yaai bon rot-fai-faa|学生在轻轨上给奶奶让座。|座位
thue-raao|ถือราว|thue raao|扶扶手|动词|公交地铁船|เวลารถเมล์เบรกแรง ควรถือราวให้แน่น|wee-laa rot-mee breek raaeng khuuan thue raao hai naaen|公交急刹时，应该紧紧扶住扶手。|安全
rawang-pratuu|ระวังประตู|ra-wang bpra-dtuu|小心车门|短语|确认提醒|กรุณาระวังประตู รถไฟกำลังจะออก|ga-ru-naa ra-wang bpra-dtuu rot-fai gam-lang ja aawk|请小心车门，列车即将开出。|安全
pratuu-bpit|ประตูปิด|bpra-dtuu bpit|门关闭|短语|确认提醒|เมื่อประตูปิดแล้ว ห้ามพยายามขึ้นรถ|muea bpra-dtuu bpit laaeo haam pha-yaa-yaam kheun rot|车门关了以后，禁止试图上车。|安全
rot-ja-aawk|รถจะออก|rot ja aawk|车要开了|短语|确认提醒|รถจะออกในอีกสองนาที รีบขึ้นเถอะ|rot ja aawk nai iik saawng naa-thii riip kheun thoe|车两分钟后要开了，快上吧。|提醒
thiaao-sut-thaai|เที่ยวสุดท้าย|thiaao sut-thaai|末班车；最后一班|名词|确认提醒|เที่ยวสุดท้ายออกจากสถานีตอนเที่ยงคืน|thiaao sut-thaai aawk jaak sa-thaa-nii dtaawn thiiang-khuen|末班车午夜从车站开出。|时间
thiaao-raaek|เที่ยวแรก|thiaao raaek|首班车；第一班|名词|确认提醒|เที่ยวแรกของเรือออกตอนหกโมงเช้า|thiaao raaek khaawng ruea aawk dtaawn hok moong chaao|船的首班早上六点开。|时间
dtaraaang-rot|ตารางรถ|dtaa-raang rot|车次表|名词|确认提醒|ตารางรถบอกว่ารถเมล์มาทุกยี่สิบนาที|dtaa-raang rot baawk waa rot-mee maa thuk yii-sip naa-thii|车次表说公交每二十分钟一班。|时间
maa-thuk-sip-naa-thii|มาทุกสิบนาที|maa thuk sip naa-thii|每十分钟来一班|短语|确认提醒|รถไฟฟ้าสายนี้มาทุกสิบนาทีในวันหยุด|rot-fai-faa saai nii maa thuk sip naa-thii nai wan-yut|这条轻轨线假日每十分钟一班。|时间
bpai-mai-than|ไปไม่ทัน|bpai mai than|赶不上；来不及去|短语|确认提醒|ถ้ารถเมล์ยังไม่มา เราจะไปไม่ทันสอบ|thaa rot-mee yang mai maa rao ja bpai mai than saawp|如果公交还不来，我们会赶不上考试。|提醒
than-wee-laa|ทันเวลา|than wee-laa|来得及；准时赶上|短语|确认提醒|ถ้าออกตอนนี้ น่าจะถึงสถานีทันเวลา|thaa aawk dtaawn-nii naa ja thueng sa-thaa-nii than wee-laa|如果现在出发，应该能准时到车站。|提醒
`;

export const VOCABULARY_EXPANSION_A2_PUBLIC_TRANSPORT_NAVIGATION_01: VocabularyExpansionA2PublicTransportNavigationCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
