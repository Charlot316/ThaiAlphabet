type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "看房租房" | "房租押金" | "水电网费" | "房屋设施" | "邻居物业" | "报修维护" | "搬入搬出" | "房屋规则";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2HousingRentUtilitiesCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-housing-rent-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2HousingRentUtilitiesCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于租房、报修、水电网费或搬家沟通。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，租房沟通时要按费用、设施、规则或维修流程区分。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["和房东、物业沟通时，可用 ขอ...ได้ไหม、ช่วย...หน่อย、เมื่อไร、เท่าไร 来表达请求和确认。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
haa-haawng-chao|หาห้องเช่า|haa haawng chao|找出租房|动词|看房租房|ฉันกำลังหาห้องเช่าใกล้รถไฟฟ้าและตลาด|chan gam-lang haa haawng chao glai rot-fai-faa lae dta-laat|我正在找靠近轻轨和市场的出租房。|找房
haawng-waang|ห้องว่าง|haawng waang|空房|名词|看房租房|อพาร์ตเมนต์นี้ยังมีห้องว่างชั้นสามหนึ่งห้อง|a-phaat-men nii yang mii haawng waang chan saam neung haawng|这栋公寓三楼还有一间空房。|找房
duu-haawng|ดูห้อง|duu haawng|看房|动词|看房租房|พรุ่งนี้ฉันนัดเจ้าของห้องไปดูห้องตอนบ่าย|phrung-nii chan nat jao-khaawng haawng bpai duu haawng dtaawn baai|明天下午我约房东去看房。|看房
nat-duu-haawng|นัดดูห้อง|nat duu haawng|预约看房|动词|看房租房|ขอนัดดูห้องวันเสาร์ได้ไหม ฉันว่างตอนเช้า|khaaw nat duu haawng wan-sao dai mai chan waang dtaawn chaao|可以预约周六看房吗？我早上有空。|看房
jao-khaawng-haawng|เจ้าของห้อง|jao-khaawng haawng|房东；房主|名词|看房租房|เจ้าของห้องบอกว่าค่าเช่ารวมค่าส่วนกลางแล้ว|jao-khaawng haawng baawk waa khaa chao ruam khaa suan-glaang laaeo|房东说房租已经包含公共管理费了。|人物
phuu-chao|ผู้เช่า|phuu chao|租客|名词|看房租房|ผู้เช่าต้องจ่ายค่าเช่าก่อนวันที่ห้าของทุกเดือน|phuu chao dtawng jaai khaa chao gaawn wan thii haa khaawng thuk duean|租客必须每月五号前付房租。|人物
san-yaa-chao|สัญญาเช่า|san-yaa chao|租约；租赁合同|名词|看房租房|ก่อนย้ายเข้า เราต้องอ่านสัญญาเช่าให้เข้าใจ|gaawn yaai khao rao dtawng aan san-yaa chao hai khao-jai|搬入前，我们必须读懂租约。|合同
sen-san-yaa|เซ็นสัญญา|sen san-yaa|签合同|动词|看房租房|ถ้าตกลงเช่า เราจะเซ็นสัญญาและจ่ายมัดจำวันนี้|thaa dtok-long chao rao ja sen san-yaa lae jaai mat-jam wan-nii|如果同意租，我们今天会签合同并付押金。|合同
rawng-san-yaa|ร่างสัญญา|raang san-yaa|合同草稿|名词|看房租房|เจ้าของห้องส่งร่างสัญญาให้ฉันอ่านก่อนเซ็น|jao-khaawng haawng song raang san-yaa hai chan aan gaawn sen|房东把合同草稿发给我签之前看。|合同
chao-raai-duean|เช่ารายเดือน|chao raai duean|按月租|动词|看房租房|ห้องนี้เช่ารายเดือน ไม่รับเช่าแค่สองสามวัน|haawng nii chao raai duean mai rap chao khae saawng saam wan|这个房间按月租，不接受只租两三天。|租期
chao-raai-wan|เช่ารายวัน|chao raai wan|按日租|动词|看房租房|ถ้ามาเที่ยวสั้น ๆ อาจเลือกเช่ารายวันแทนรายเดือน|thaa maa thiao san san aat leuuak chao raai wan thaaen raai duean|如果短期来玩，可以选择按日租而不是按月租。|租期
chao-neung-pii|เช่าหนึ่งปี|chao neung bpii|租一年|短语|看房租房|ถ้าเช่าหนึ่งปี ค่าเช่าจะถูกกว่าเช่าหกเดือน|thaa chao neung bpii khaa chao ja thuuk gwaa chao hok duean|如果租一年，房租会比租六个月便宜。|租期
chao-hok-duean|เช่าหกเดือน|chao hok duean|租六个月|短语|看房租房|ฉันอยากเช่าหกเดือนก่อน ถ้าชอบค่อยต่อสัญญา|chan yaak chao hok duean gaawn thaa chaawp khaawy dtaaw san-yaa|我想先租六个月，如果喜欢再续约。|租期
dtaaw-san-yaa|ต่อสัญญา|dtaaw san-yaa|续约|动词|看房租房|ห้องนี้อยู่สบาย ฉันจึงอยากต่อสัญญาอีกปี|haawng nii yuu sa-baai chan jeung yaak dtaaw san-yaa iik bpii|这房间住得舒服，所以我想再续约一年。|合同
mot-san-yaa|หมดสัญญา|mot san-yaa|合同到期|短语|看房租房|สัญญาจะหมดสัญญาสิ้นเดือนหน้า ฉันต้องตัดสินใจเร็ว ๆ|san-yaa ja mot san-yaa sin duean naa chan dtawng dtat-sin-jai reo reo|合同下月底到期，我必须快点决定。|合同
khaa-chao|ค่าเช่า|khaa chao|房租|名词|房租押金|ค่าเช่าห้องนี้เดือนละแปดพันบาท ไม่รวมค่าน้ำไฟ|khaa chao haawng nii duean la bpaaet phan baat mai ruam khaa naam fai|这个房间月租八千泰铢，不含水电费。|房租
jaai-khaa-chao|จ่ายค่าเช่า|jaai khaa chao|付房租|动词|房租押金|ฉันจ่ายค่าเช่าผ่านแอปธนาคารทุกต้นเดือน|chan jaai khaa chao phaan aaep tha-naa-khaan thuk dton duean|我每月初通过银行应用付房租。|房租
khaang-khaa-chao|ค้างค่าเช่า|khaang khaa chao|拖欠房租|动词|房租押金|ถ้าค้างค่าเช่าเกินเจ็ดวัน ต้องคุยกับเจ้าของห้อง|thaa khaang khaa chao goen jet wan dtawng khui gap jao-khaawng haawng|如果拖欠房租超过七天，必须和房东沟通。|房租
khaa-prap|ค่าปรับ|khaa bprap|罚金；违约费|名词|房租押金|ถ้าจ่ายค่าเช่าช้า อาจมีค่าปรับวันละหนึ่งร้อยบาท|thaa jaai khaa chao chaa aat mii khaa bprap wan la neung raawy baat|如果晚付房租，可能每天有一百泰铢罚金。|费用
ngoen-mat-jam-haawng|เงินมัดจำห้อง|ngoen mat-jam haawng|房屋押金|名词|房租押金|ก่อนย้ายเข้า ฉันต้องจ่ายเงินมัดจำห้องสองเดือน|gaawn yaai khao chan dtawng jaai ngoen mat-jam haawng saawng duean|搬入前，我要付两个月房屋押金。|押金
khuen-mat-jam|คืนมัดจำ|khuen mat-jam|退押金|动词|房租押金|เจ้าของห้องจะคืนมัดจำหลังตรวจห้องเรียบร้อย|jao-khaawng haawng ja khuen mat-jam lang dtruat haawng riiap-raawy|房东检查房间后会退押金。|押金
hak-mat-jam|หักมัดจำ|hak mat-jam|扣押金|动词|房租押金|ถ้าผนังเสียหายมาก เจ้าของห้องอาจหักมัดจำ|thaa pha-nang siia-haai maak jao-khaawng haawng aat hak mat-jam|如果墙面损坏严重，房东可能会扣押金。|押金
khaa-prakan|ค่าประกัน|khaa bpra-gan|保证金；押金|名词|房租押金|ค่าประกันนี้ใช้สำหรับความเสียหายในห้อง|khaa bpra-gan nii chai sam-rap khwaam siia-haai nai haawng|这笔保证金用于房间损坏。|押金
khaa-suan-glaang|ค่าส่วนกลาง|khaa suan-glaang|公共管理费|名词|房租押金|ค่าส่วนกลางรวมค่าดูแลลิฟต์และพื้นที่ส่วนกลาง|khaa suan-glaang ruam khaa duu-laae lif lae phuen-thii suan-glaang|公共管理费包括电梯和公共区域维护费。|费用
ruam-khaa-suan-glaang|รวมค่าส่วนกลาง|ruam khaa suan-glaang|包含公共管理费|短语|房租押金|ค่าเช่านี้รวมค่าส่วนกลางแล้ว แต่ไม่รวมค่าไฟ|khaa chao nii ruam khaa suan-glaang laaeo dtaae mai ruam khaa fai|这个房租已含公共管理费，但不含电费。|费用
mai-ruam-khaa-nam-fai|ไม่รวมค่าน้ำไฟ|mai ruam khaa naam fai|不含水电费|短语|水电网费|ราคาห้องนี้ไม่รวมค่าน้ำไฟ ผู้เช่าจ่ายเอง|raa-khaa haawng nii mai ruam khaa naam fai phuu chao jaai eeng|这个房价不含水电费，租客自己付。|水电
khaa-nam|ค่าน้ำ|khaa naam|水费|名词|水电网费|ค่าน้ำเดือนนี้ถูกกว่าเดือนที่แล้วเพราะเราใช้น้ำน้อยลง|khaa naam duean nii thuuk gwaa duean thii laaeo phraw rao chai naam naawy long|这个月水费比上个月便宜，因为我们用水少了。|水费
khaa-fai|ค่าไฟ|khaa fai|电费|名词|水电网费|หน้าร้อนค่าไฟสูงขึ้นเพราะเปิดแอร์บ่อย|naa raawn khaa fai suung kheun phraw bpoet aae baawy|热季电费升高，因为常开空调。|电费
khaa-net|ค่าเน็ต|khaa net|网费|名词|水电网费|ฉันจ่ายค่าเน็ตผ่านแอปทุกวันที่สิบ|chan jaai khaa net phaan aaep thuk wan thii sip|我每月十号通过应用付网费。|网费
khaa-kha-ya|ค่าขยะ|khaa kha-ya|垃圾费|名词|水电网费|บางอพาร์ตเมนต์เก็บค่าขยะเดือนละห้าสิบบาท|baang a-phaat-men gep khaa kha-ya duean la haa-sip baat|有些公寓每月收五十泰铢垃圾费。|费用
mit-dtoe-nam|มิเตอร์น้ำ|mi-dtooe naam|水表|名词|水电网费|เจ้าหน้าที่มาจดมิเตอร์น้ำทุกสิ้นเดือน|jao-naa-thii maa jot mi-dtooe naam thuk sin duean|工作人员每月底来抄水表。|水电
mit-dtoe-fai|มิเตอร์ไฟ|mi-dtooe fai|电表|名词|水电网费|ก่อนย้ายเข้า ควรถ่ายรูปมิเตอร์ไฟไว้เป็นหลักฐาน|gaawn yaai khao khuuan thaai ruup mi-dtooe fai wai bpen lak-thaan|搬入前，应该拍电表照片作为凭证。|水电
jot-mit-dtoe|จดมิเตอร์|jot mi-dtooe|抄表|动词|水电网费|เจ้าของห้องจดมิเตอร์ไฟแล้วส่งยอดให้ผู้เช่า|jao-khaawng haawng jot mi-dtooe fai laaeo song yaawt hai phuu chao|房东抄电表后把数额发给租客。|水电
nam-mai-lai|น้ำไม่ไหล|naam mai lai|停水；水不流|短语|水电网费|เช้านี้น้ำไม่ไหล ฉันจึงอาบน้ำไม่ได้|chaao nii naam mai lai chan jeung aap naam mai dai|今天早上停水了，所以我不能洗澡。|水电
fai-dap|ไฟดับ|fai dap|停电|短语|水电网费|เมื่อคืนไฟดับประมาณครึ่งชั่วโมง|muea-khuen fai dap bpra-maan khrueng chua-moong|昨晚停电了大约半小时。|水电
net-lom|เน็ตล่ม|net lom|网络断了；网络故障|短语|水电网费|วันนี้เน็ตล่มทั้งตึก ฉันทำงานที่บ้านไม่ได้|wan-nii net lom thang duek chan tham ngaan thii baan mai dai|今天整栋楼网络断了，我不能在家工作。|网络
wifi-cha|ไวไฟช้า|wai-fai chaa|Wi-Fi 慢|短语|水电网费|ไวไฟช้ามากตอนกลางคืน เพราะมีคนใช้เยอะ|wai-fai chaa maak dtaawn glaang-khuen phraw mii khon chai yoe|晚上 Wi-Fi 很慢，因为使用的人多。|网络
dtit-dtang-net|ติดตั้งเน็ต|dtit-dtang net|安装网络|动词|水电网费|ฉันต้องนัดช่างมาติดตั้งเน็ตหลังย้ายเข้า|chan dtawng nat chang maa dtit-dtang net lang yaai khao|搬入后我需要约师傅来安装网络。|网络
chueam-wifi|เชื่อมไวไฟ|chueam wai-fai|连接 Wi-Fi|动词|水电网费|เจ้าของห้องส่งรหัสให้ฉันเชื่อมไวไฟ|jao-khaawng haawng song ra-hat hai chan chueam wai-fai|房东把密码发给我连接 Wi-Fi。|网络
rahat-wifi|รหัสไวไฟ|ra-hat wai-fai|Wi-Fi 密码|名词|水电网费|ขอรหัสไวไฟหน่อยได้ไหม ฉันต้องส่งงานออนไลน์|khaaw ra-hat wai-fai naawy dai mai chan dtawng song ngaan awn-lai|可以给我 Wi-Fi 密码吗？我要在线提交作业。|网络
haawng-nawn|ห้องนอน|haawng naawn|卧室|名词|房屋设施|ห้องนอนนี้มีหน้าต่างใหญ่และแสงดี|haawng naawn nii mii naa-dtaang yai lae saaeng dii|这间卧室有大窗户，采光好。|设施
haawng-nam|ห้องน้ำ|haawng naam|洗手间；浴室|名词|房屋设施|ห้องน้ำมีกลิ่นแปลก ๆ ต้องให้ช่างมาดู|haawng naam mii glin bplaaek bplaaek dtawng hai chang maa duu|洗手间有奇怪气味，需要让师傅来看。|设施
haawng-khruua|ห้องครัว|haawng khruua|厨房|名词|房屋设施|ห้องครัวเล็กแต่มีอ่างล้างจานและตู้เก็บของ|haawng khruua lek dtaae mii aang laang jaan lae dtuu gep khaawng|厨房小，但有洗碗池和储物柜。|设施
ra-biian|ระเบียง|ra-biiang|阳台|名词|房屋设施|ระเบียงห้องนี้ตากผ้าได้แต่ห้ามวางของเยอะ|ra-biiang haawng nii dtaak phaa dai dtaae haam waang khaawng yoe|这间房的阳台可以晾衣服，但禁止放太多东西。|设施
pratuu-haawng|ประตูห้อง|bpra-dtuu haawng|房门|名词|房屋设施|ประตูห้องปิดไม่สนิท ต้องซ่อมก่อนย้ายเข้า|bpra-dtuu haawng bpit mai sa-nit dtawng saawm gaawn yaai khao|房门关不严，搬入前要修。|设施
naa-dtaang-raw|หน้าต่างรั่ว|naa-dtaang rua|窗户漏水|短语|房屋设施|เวลาฝนตกหนัก หน้าต่างรั่วและพื้นเปียก|wee-laa fon dtok nak naa-dtaang rua lae phuen bpiiak|下大雨时，窗户漏水，地板湿了。|设施
phuen-laminate|พื้นลามิเนต|phuen laa-mi-net|复合木地板|名词|房屋设施|พื้นลามิเนตสวย แต่ต้องระวังน้ำหก|phuen laa-mi-net suai dtaae dtawng ra-wang naam hok|复合木地板好看，但要小心水洒。|设施
phuen-gra-beuang|พื้นกระเบื้อง|phuen gra-beuuang|瓷砖地板|名词|房屋设施|พื้นกระเบื้องในห้องน้ำลื่นเมื่อเปียก|phuen gra-beuuang nai haawng naam leuun muea bpiiak|洗手间瓷砖地板湿的时候很滑。|设施
fueni-joe|เฟอร์นิเจอร์|fooe-ni-joe|家具|名词|房屋设施|ห้องนี้มีเฟอร์นิเจอร์ครบ เช่น เตียง โต๊ะ และตู้เสื้อผ้า|haawng nii mii foe-ni-joe khrop chen dtiiang dto lae dtuu suea-phaa|这个房间家具齐全，比如床、桌子和衣柜。|设施
haawng-bplao|ห้องเปล่า|haawng bplao|空房；无家具房|名词|房屋设施|ห้องเปล่าถูกกว่า แต่ต้องซื้อเฟอร์นิเจอร์เอง|haawng bplao thuuk gwaa dtaae dtawng sue foe-ni-joe eeng|无家具房更便宜，但要自己买家具。|设施
khruueang-sak-phaa|เครื่องซักผ้า|khreuuang sak phaa|洗衣机|名词|房屋设施|เครื่องซักผ้าอยู่ชั้นล่างและใช้เหรียญสิบบาท|khreuuang sak phaa yuu chan laang lae chai riian sip baat|洗衣机在楼下，用十泰铢硬币。|设施
khruueang-tam-naam-un|เครื่องทำน้ำอุ่น|khreuuang tham naam un|热水器|名词|房屋设施|เครื่องทำน้ำอุ่นในห้องน้ำยังใช้ได้ดี|khreuuang tham naam un nai haawng naam yang chai dai dii|洗手间里的热水器还很好用。|设施
ae-sia|แอร์เสีย|aae siia|空调坏了|短语|报修维护|แอร์เสียตั้งแต่เมื่อคืน ห้องร้อนมากนอนไม่หลับ|aae siia dtang-dtaae muea-khuen haawng raawn maak naawn mai lap|空调从昨晚坏了，房间很热睡不着。|维修
fai-sia|ไฟเสีย|fai siia|灯坏了；电路坏了|短语|报修维护|ไฟในห้องครัวเสีย ช่วยส่งช่างมาดูได้ไหม|fai nai haawng khruua siia chuai song chang maa duu dai mai|厨房的灯坏了，可以派师傅来看吗？|维修
nam-raw|น้ำรั่ว|naam rua|漏水|短语|报修维护|ใต้อ่างล้างจานมีน้ำรั่วตลอดเวลา|dtai aang laang jaan mii naam rua dta-laawt wee-laa|洗碗池下面一直漏水。|维修
thaaw-nam-dtan|ท่อน้ำตัน|thaaw naam dtan|水管堵了|短语|报修维护|ท่อน้ำตันในห้องน้ำ ทำให้น้ำไหลช้ามาก|thaaw naam dtan nai haawng naam tham hai naam lai chaa maak|洗手间水管堵了，导致排水很慢。|维修
chaang-som|ช่างซ่อม|chang saawm|维修师傅|名词|报修维护|ช่างซ่อมจะมาดูแอร์ตอนบ่ายสามโมง|chang saawm ja maa duu aae dtaawn baai saam moong|维修师傅下午三点会来看空调。|维修
nat-chaang|นัดช่าง|nat chang|约维修师傅|动词|报修维护|ฉันนัดช่างมาซ่อมเครื่องทำน้ำอุ่นวันเสาร์|chan nat chang maa saawm khreuuang tham naam un wan-sao|我约了师傅周六来修热水器。|维修
jaeng-som|แจ้งซ่อม|jaaeng saawm|报修|动词|报修维护|ถ้าไฟเสีย ให้แจ้งซ่อมผ่านแอปของคอนโด|thaa fai siia hai jaaeng saawm phaan aaep khaawng khawn-doo|如果灯坏了，请通过公寓应用报修。|维修
bai-jaeng-som|ใบแจ้งซ่อม|bai jaaeng saawm|报修单|名词|报修维护|พนักงานให้ฉันกรอกใบแจ้งซ่อมและเบอร์โทรศัพท์|pha-nak-ngaan hai chan graawk bai jaaeng saawm lae booe thoo-ra-sap|工作人员让我填写报修单和电话号码。|维修
som-hai-laaeo|ซ่อมให้แล้ว|saawm hai laaeo|已经修好了|短语|报修维护|เจ้าหน้าที่บอกว่าซ่อมให้แล้ว ลองเปิดไฟดูได้เลย|jao-naa-thii baawk waa saawm hai laaeo laawng bpoet fai duu dai loei|工作人员说已经修好了，可以试着开灯看看。|维修
yang-mai-som|ยังไม่ซ่อม|yang mai saawm|还没修|短语|报修维护|แอร์ยังไม่ซ่อม ฉันจึงต้องนอนเปิดพัดลม|aae yang mai saawm chan jeung dtawng naawn bpoet phat-lom|空调还没修，所以我只能开风扇睡。|维修
khaa-som|ค่าซ่อม|khaa saawm|维修费|名词|报修维护|ถ้าเครื่องเสียเพราะผู้เช่า อาจต้องจ่ายค่าซ่อมเอง|thaa khreuuang siia phraw phuu chao aat dtawng jaai khaa saawm eeng|如果设备因租客原因坏了，可能要自己付维修费。|维修
phuu-duu-laae|ผู้ดูแล|phuu duu-laae|管理员；看管人员|名词|邻居物业|ผู้ดูแลตึกช่วยรับพัสดุให้ผู้เช่าตอนกลางวัน|phuu duu-laae duek chuai rap phat-sa-du hai phuu chao dtaawn glaang-wan|楼管白天帮租客收包裹。|物业
nitibukkhon|นิติบุคคล|ni-dti-buk-khon|物业管理处|名词|邻居物业|ถ้ามีปัญหาเสียงดัง ต้องแจ้งนิติบุคคลของคอนโด|thaa mii bpan-haa siiang dang dtawng jaaeng ni-dti-buk-khon khaawng khawn-doo|如果有噪音问题，要通知公寓物业管理处。|物业
phuean-baan|เพื่อนบ้าน|phuean baan|邻居|名词|邻居物业|เพื่อนบ้านห้องข้าง ๆ ใจดีและไม่เสียงดัง|phuean baan haawng khaang khaang jai dii lae mai siiang dang|隔壁邻居人很好，也不吵。|邻居
haawng-khaang-khaang|ห้องข้าง ๆ|haawng khaang khaang|隔壁房间|名词|邻居物业|ห้องข้าง ๆ เปิดเพลงดังหลังเที่ยงคืน|haawng khaang khaang bpoet phleeng dang lang thiiang-khuen|隔壁房间半夜后开音乐很大声。|邻居
siiang-dang|เสียงดัง|siiang dang|声音大；吵|形容词|邻居物业|ถ้าเสียงดังมากตอนดึก ผู้ดูแลจะมาเตือน|thaa siiang dang maak dtaawn duek phuu duu-laae ja maa dteuan|如果深夜很吵，管理员会来提醒。|邻居
ngiiap|เงียบ|ngiiap|安静|形容词|邻居物业|ชั้นนี้เงียบ เหมาะกับคนที่ต้องทำงานที่บ้าน|chan nii ngiiap maw gap khon thii dtawng tham ngaan thii baan|这一层很安静，适合需要在家工作的人。|邻居
dtuean-phuean-baan|เตือนเพื่อนบ้าน|dteuan phuean baan|提醒邻居|动词|邻居物业|ฉันไม่อยากทะเลาะ จึงขอให้ผู้ดูแลเตือนเพื่อนบ้าน|chan mai yaak tha-law jeung khaaw hai phuu duu-laae dteuan phuean baan|我不想吵架，所以请管理员提醒邻居。|邻居
rap-phat-sa-du|รับพัสดุ|rap phat-sa-du|收包裹|动词|邻居物业|ถ้าฉันไม่อยู่ ผู้ดูแลช่วยรับพัสดุไว้ได้ไหม|thaa chan mai yuu phuu duu-laae chuai rap phat-sa-du wai dai mai|如果我不在，管理员可以帮我收包裹吗？|物业
hong-suan-glaang|ห้องส่วนกลาง|haawng suan-glaang|公共房间；公共区域房|名词|邻居物业|ห้องส่วนกลางเปิดถึงสี่ทุ่มสำหรับผู้เช่า|haawng suan-glaang bpoet thueng sii thum sam-rap phuu chao|公共房间对租客开放到晚上十点。|物业
phuen-thii-suan-glaang|พื้นที่ส่วนกลาง|phuen-thii suan-glaang|公共区域|名词|邻居物业|ห้ามวางรองเท้าในพื้นที่ส่วนกลางหน้าลิฟต์|haam waang raawng-thaao nai phuen-thii suan-glaang naa lif|禁止在电梯前公共区域放鞋。|物业
yaai-khao|ย้ายเข้า|yaai khao|搬入|动词|搬入搬出|ฉันจะย้ายเข้าเสาร์นี้ หลังจ่ายมัดจำครบ|chan ja yaai khao sao nii lang jaai mat-jam khrop|我付清押金后，这周六会搬入。|搬家
yaai-aawk|ย้ายออก|yaai aawk|搬出|动词|搬入搬出|ก่อนย้ายออก ต้องแจ้งเจ้าของห้องล่วงหน้าหนึ่งเดือน|gaawn yaai aawk dtawng jaaeng jao-khaawng haawng luang-naa neung duean|搬出前要提前一个月通知房东。|搬家
wan-yaai-khao|วันย้ายเข้า|wan yaai khao|搬入日|名词|搬入搬出|วันย้ายเข้า เจ้าของห้องจะเอากุญแจมาให้|wan yaai khao jao-khaawng haawng ja ao gun-jaae maa hai|搬入日，房东会把钥匙拿来。|搬家
wan-yaai-aawk|วันย้ายออก|wan yaai aawk|搬出日|名词|搬入搬出|วันย้ายออกเราต้องคืนกุญแจและบัตรเข้าตึก|wan yaai aawk rao dtawng khuen gun-jaae lae bat khao duek|搬出日我们要归还钥匙和进楼卡。|搬家
khon-khaawng|ขนของ|khon khaawng|搬东西|动词|搬入搬出|พรุ่งนี้เพื่อนจะมาช่วยฉันขนของขึ้นห้อง|phrung-nii phuean ja maa chuai chan khon khaawng kheun haawng|明天朋友会来帮我把东西搬上房间。|搬家
rot-khon-khaawng|รถขนของ|rot khon khaawng|搬家车；运东西的车|名词|搬入搬出|รถขนของจอดหน้าตึกได้แค่ครึ่งชั่วโมง|rot khon khaawng jaawt naa duek dai khae khrueng chua-moong|搬家车只能在楼前停半小时。|搬家
kep-khaawng|เก็บของ|gep khaawng|收拾东西|动词|搬入搬出|ก่อนย้ายออก ฉันต้องเก็บของใส่กล่องหลายใบ|gaawn yaai aawk chan dtawng gep khaawng sai glaawng laai bai|搬出前，我要把东西收进很多盒子里。|搬家
glong-khon-khaawng|กล่องขนของ|glaawng khon khaawng|搬家箱|名词|搬入搬出|ฉันซื้อกล่องขนของสิบใบสำหรับย้ายห้อง|chan sue glaawng khon khaawng sip bai sam-rap yaai haawng|我买了十个搬家箱用来搬房间。|搬家
khuen-gun-jaae|คืนกุญแจ|khuen gun-jaae|还钥匙|动词|搬入搬出|หลังตรวจห้องแล้ว ฉันคืนกุญแจให้เจ้าของห้อง|lang dtruat haawng laaeo chan khuen gun-jaae hai jao-khaawng haawng|检查房间后，我把钥匙还给房东。|搬家
rap-gun-jaae|รับกุญแจ|rap gun-jaae|拿钥匙；收钥匙|动词|搬入搬出|วันย้ายเข้า ฉันรับกุญแจและบัตรเข้าตึก|wan yaai khao chan rap gun-jaae lae bat khao duek|搬入日，我拿了钥匙和进楼卡。|搬家
bat-khao-duek|บัตรเข้าตึก|bat khao duek|进楼卡|名词|搬入搬出|ถ้าบัตรเข้าตึกหาย ต้องแจ้งนิติบุคคลทันที|thaa bat khao duek haai dtawng jaaeng ni-dti-buk-khon than-thii|如果进楼卡丢了，要马上通知物业。|门禁
yaai-tha-biian-thii-yuu|ย้ายทะเบียนที่อยู่|yaai tha-biian thii-yuu|迁移住址登记|动词|搬入搬出|ถ้าพักอยู่นาน อาจต้องย้ายทะเบียนที่อยู่ตามจริง|thaa phak yuu naan aat dtawng yaai tha-biian thii-yuu dtaam jing|如果长期居住，可能要按实际情况迁移住址登记。|资料
thii-yuu-mai|ที่อยู่ใหม่|thii-yuu mai|新地址|名词|搬入搬出|หลังย้ายบ้าน ฉันส่งที่อยู่ใหม่ให้เพื่อนทุกคน|lang yaai baan chan song thii-yuu mai hai phuean thuk khon|搬家后，我把新地址发给所有朋友。|地址
thii-yuu-gao|ที่อยู่เก่า|thii-yuu gao|旧地址|名词|搬入搬出|พัสดุยังส่งไปที่อยู่เก่า เพราะฉันลืมแก้ข้อมูล|phat-sa-du yang song bpai thii-yuu gao phraw chan luem gaae khaaw-muun|包裹还寄到旧地址，因为我忘了改资料。|地址
kot-haawng|กฎห้อง|got haawng|房屋规则|名词|房屋规则|กฎห้องเขียนว่าห้ามสูบบุหรี่ในห้องและระเบียง|got haawng khiian waa haam suup bu-rii nai haawng lae ra-biiang|房屋规则写着禁止在房间和阳台吸烟。|规则
haam-suup-bu-rii|ห้ามสูบบุหรี่|haam suup bu-rii|禁止吸烟|短语|房屋规则|อาคารนี้ห้ามสูบบุหรี่ทุกชั้น รวมถึงระเบียง|aa-khaan nii haam suup bu-rii thuk chan ruam thueng ra-biiang|这栋楼每层都禁止吸烟，包括阳台。|规则
haam-liang-sat|ห้ามเลี้ยงสัตว์|haam liiang sat|禁止养宠物|短语|房屋规则|ห้องนี้ห้ามเลี้ยงสัตว์ ถ้ามีแมวต้องเลือกที่อื่น|haawng nii haam liiang sat thaa mii maaeo dtawng leuuak thii euen|这个房间禁止养宠物，如果有猫要选别处。|规则
liang-sat-dai|เลี้ยงสัตว์ได้|liiang sat dai|可以养宠物|短语|房屋规则|คอนโดนี้เลี้ยงสัตว์ได้ แต่ต้องลงทะเบียนก่อน|khawn-doo nii liiang sat dai dtaae dtawng long tha-biian gaawn|这个公寓可以养宠物，但要先登记。|规则
haam-siang-dang|ห้ามเสียงดัง|haam siiang dang|禁止吵闹|短语|房屋规则|หลังสี่ทุ่มห้ามเสียงดัง เพราะมีคนพักหลายห้อง|lang sii thum haam siiang dang phraw mii khon phak laai haawng|晚上十点后禁止吵闹，因为有很多住户。|规则
weelaa-ngiiap|เวลาเงียบ|wee-laa ngiiap|安静时间|名词|房屋规则|เวลาเงียบของตึกนี้เริ่มตั้งแต่สี่ทุ่ม|wee-laa ngiiap khaawng duek nii roem dtang-dtaae sii thum|这栋楼的安静时间从晚上十点开始。|规则
haam-jet-pha-nang|ห้ามเจาะผนัง|haam jaw pha-nang|禁止钻墙|短语|房屋规则|สัญญาเช่าบอกว่าห้ามเจาะผนังโดยไม่ขออนุญาต|san-yaa chao baawk waa haam jaw pha-nang dooi mai khaaw a-nu-yaat|租约说未经允许禁止钻墙。|规则
khaaw-a-nu-yaat|ขออนุญาต|khaaw a-nu-yaat|请求许可|动词|房屋规则|ถ้าจะติดชั้นวางของ ต้องขออนุญาตเจ้าของห้องก่อน|thaa ja dtit chan waang khaawng dtawng khaaw a-nu-yaat jao-khaawng haawng gaawn|如果要安装置物架，要先请求房东许可。|规则
haam-dtam-aa-haan-raeng|ห้ามทำอาหารแรง|haam tham aa-haan raaeng|禁止做气味重的饭菜|短语|房屋规则|ห้องเล็กนี้ห้ามทำอาหารแรง เพราะกลิ่นออกไปทางเดิน|haawng lek nii haam tham aa-haan raaeng phraw glin aawk bpai thaang doen|这个小房间禁止做气味重的饭菜，因为气味会到走廊。|规则
haam-waang-khaawng-naa-haawng|ห้ามวางของหน้าห้อง|haam waang khaawng naa haawng|禁止在门口放东西|短语|房屋规则|ห้ามวางของหน้าห้อง เพราะทางเดินต้องโล่ง|haam waang khaawng naa haawng phraw thaang doen dtawng loong|禁止在门口放东西，因为走廊必须畅通。|规则
thang-doen|ทางเดิน|thaang doen|走廊；通道|名词|房屋规则|ทางเดินหน้าห้องต้องสะอาดและไม่มีของกีดขวาง|thaang doen naa haawng dtawng sa-aat lae mai mii khaawng giit-khwaang|房间前走廊要干净且没有东西阻挡。|规则
khon-yiam|คนเยี่ยม|khon yiiam|访客|名词|房屋规则|คนเยี่ยมต้องแลกบัตรที่ล็อบบี้ก่อนขึ้นตึก|khon yiiam dtawng laaek bat thii lawp-bii gaawn kheun duek|访客上楼前要在大厅换证。|规则
laaek-bat|แลกบัตร|laaek bat|换证；押证换访客卡|动词|房屋规则|เพื่อนของฉันต้องแลกบัตรประชาชนก่อนเข้าคอนโด|phuean khaawng chan dtawng laaek bat bpra-chaa-chon gaawn khao khawn-doo|我的朋友进公寓前要用身份证换访客卡。|规则
jaawt-rot|จอดรถ|jaawt rot|停车|动词|房屋规则|ผู้เช่าจอดรถได้หนึ่งคันในที่จอดรถของตึก|phuu chao jaawt rot dai neung khan nai thii jaawt rot khaawng duek|租客可以在楼里的停车场停一辆车。|停车
thii-jaawt-rot|ที่จอดรถ|thii jaawt rot|停车位；停车场|名词|房屋规则|ค่าเช่านี้ไม่รวมที่จอดรถ ต้องจ่ายเพิ่ม|khaa chao nii mai ruam thii jaawt rot dtawng jaai phoem|这个房租不含停车位，要额外付费。|停车
`;

export const VOCABULARY_EXPANSION_A2_HOUSING_RENT_UTILITIES_01: VocabularyExpansionA2HousingRentUtilitiesCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
