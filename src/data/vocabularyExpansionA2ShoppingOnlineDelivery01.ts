type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "网购下单" | "配送快递" | "收货取件" | "退换售后" | "优惠付款" | "评价反馈" | "联系客服" | "物流状态";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2ShoppingOnlineDeliveryCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-online-shopping-delivery-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2ShoppingOnlineDeliveryCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于网购、下单、配送、退货、评价或联系客服的基础沟通。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，网购时要分清下单、付款、物流和售后状态。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["联系客服时常用 รบกวน、ช่วยเช็ก、ขอคืนสินค้า、ยังไม่ได้รับของ 等表达，语气简单礼貌。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
seu-khaawng-online|ซื้อของออนไลน์|seu khaawng aawn-lai|网上购物|动词|网购下单|ฉันซื้อของออนไลน์เดือนละสองสามครั้งเท่านั้น|chan seu khaawng aawn-lai deuan la saawng saam khrang thao-nan|我每个月只网上购物两三次。|网购
raan-online|ร้านออนไลน์|raan aawn-lai|网店|名词|网购下单|ร้านออนไลน์นี้ตอบแชตเร็วและส่งของไว|raan aawn-lai nii dtaawp chaet reo lae song khaawng wai|这家网店回复聊天快，发货也快。|店铺
naa-raa-khaa|หน้าราคา|naa raa-khaa|价格页面|名词|网购下单|ก่อนสั่งซื้อ ฉันดูหน้าราคาและค่าส่งก่อน|gaawn sang-seu chan duu naa raa-khaa lae khaa song gaawn|下单前，我先看价格页面和运费。|价格
leuak-sin-khaa|เลือกสินค้า|leuak sin-khaa|选择商品|动词|网购下单|แม่เลือกสินค้าหลายชิ้นแล้วใส่ตะกร้าไว้|mae leuak sin-khaa laai chin laeo sai dta-graa wai|妈妈选择了好几件商品并放进购物车。|下单
sai-dta-graa|ใส่ตะกร้า|sai dta-graa|加入购物车|动词|网购下单|ถ้ายังไม่ซื้อทันที ให้ใส่ตะกร้าไว้ก่อน|thaa yang mai seu than-thii hai sai dta-graa wai gaawn|如果还不马上买，就先加入购物车。|购物车
dta-graa-sin-khaa|ตะกร้าสินค้า|dta-graa sin-khaa|购物车|名词|网购下单|ในตะกร้าสินค้ามีเสื้อสองตัวและถุงเท้าหนึ่งคู่|nai dta-graa sin-khaa mii seua saawng dtua lae thung-thaao neung khuu|购物车里有两件衣服和一双袜子。|购物车
got-sang-seu|กดสั่งซื้อ|got sang-seu|点击下单|动词|网购下单|หลังเช็กที่อยู่แล้ว ฉันกดสั่งซื้อทันที|lang chek thii-yuu laeo chan got sang-seu than-thii|检查地址后，我立刻点击下单。|下单
sang-seu-laeo|สั่งซื้อแล้ว|sang-seu laeo|已下单|短语|网购下单|ฉันสั่งซื้อแล้ว แต่ยังไม่ได้จ่ายเงิน|chan sang-seu laeo dtae yang mai dai jaai ngoen|我已经下单了，但还没有付款。|下单
lek-kham-sang-seu|เลขคำสั่งซื้อ|lek kham-sang-seu|订单号|名词|网购下单|กรุณาส่งเลขคำสั่งซื้อให้แอดมินตรวจ|ga-ru-naa song lek kham-sang-seu hai aed-min dtruat|请把订单号发给管理员核对。|订单
raai-la-iat-sin-khaa|รายละเอียดสินค้า|raai-la-iat sin-khaa|商品详情|名词|网购下单|อ่านรายละเอียดสินค้าให้ดีก่อนเลือกขนาด|aan raai-la-iat sin-khaa hai dii gaawn leuak kha-naat|选择尺码前要仔细阅读商品详情。|商品
ruup-sin-khaa|รูปสินค้า|ruup sin-khaa|商品图片|名词|网购下单|รูปสินค้าดูสวย แต่ฉันอยากอ่านรีวิวก่อน|ruup sin-khaa duu suai dtae chan yaak aan rii-wiu gaawn|商品图片看起来漂亮，但我想先看评价。|商品
kha-naat-sin-khaa|ขนาดสินค้า|kha-naat sin-khaa|商品尺寸|名词|网购下单|ขนาดสินค้าในตารางช่วยให้เลือกเสื้อได้ง่ายขึ้น|kha-naat sin-khaa nai dtaa-raang chuai hai leuak seua dai ngaai kheun|表格里的商品尺寸让选衣服更容易。|尺寸
seu-phit-kha-naat|ซื้อผิดขนาด|seu phit kha-naat|买错尺寸|动词|退换售后|ฉันซื้อผิดขนาด จึงอยากเปลี่ยนเป็นไซซ์ใหญ่กว่า|chan seu phit kha-naat jeung yaak bplian bpen sai yai gwaa|我买错尺寸了，所以想换成大一号。|尺码
leuak-sii|เลือกสี|leuak sii|选择颜色|动词|网购下单|ลูกค้าเลือกสีฟ้าและขอส่งของพรุ่งนี้|luuk-khaa leuak sii faa lae khaaw song khaawng phrung-nii|客户选择蓝色，并请求明天发货。|颜色
sii-mai-dtrong|สีไม่ตรง|sii mai dtrong|颜色不一致|短语|退换售后|สีไม่ตรงกับรูปในแอป ฉันจึงทักร้าน|sii mai dtrong gap ruup nai aep chan jeung thak raan|颜色和应用里的图片不一致，所以我联系店铺。|售后
sin-khaa-mot|สินค้าหมด|sin-khaa mot|商品售罄|短语|网购下单|รองเท้าสีขาวสินค้าหมด เหลือแต่สีดำ|raawng-thaao sii khaao sin-khaa mot leua dtae sii dam|白色鞋子售罄了，只剩黑色。|库存
mii-khaawng|มีของ|mii khaawng|有货|短语|网购下单|ร้านบอกว่ายังมีของและส่งได้วันนี้|raan baawk waa yang mii khaawng lae song dai wan-nii|店铺说还有货，今天可以发。|库存
khaawng-khao-mai|ของเข้าใหม่|khaawng khao mai|新到货|短语|网购下单|ถ้าของเข้าใหม่ ร้านจะแจ้งลูกค้าในแชต|thaa khaawng khao mai raan ja jaeng luuk-khaa nai chaet|如果新到货，店铺会在聊天里通知客户。|库存
jong-sin-khaa|จองสินค้า|jaawng sin-khaa|预订商品|动词|网购下单|ฉันจองสินค้าชิ้นนี้ไว้และจะจ่ายเงินคืนนี้|chan jaawng sin-khaa chin nii wai lae ja jaai ngoen kheun nii|我预订了这件商品，今晚会付款。|预订
jaai-ngoen-online|จ่ายเงินออนไลน์|jaai ngoen aawn-lai|线上付款|动词|优惠付款|หลังใส่ที่อยู่แล้ว ระบบให้จ่ายเงินออนไลน์|lang sai thii-yuu laeo ra-bop hai jaai ngoen aawn-lai|填写地址后，系统让线上付款。|付款
jaai-bplaai-thaang|จ่ายปลายทาง|jaai bplaai-thaang|货到付款|动词|优惠付款|แม่ชอบจ่ายปลายทางเพราะอยากเห็นของก่อน|mae chaawp jaai bplaai-thaang phraw yaak hen khaawng gaawn|妈妈喜欢货到付款，因为想先看到东西。|付款
leuak-wi-thii-jaai|เลือกวิธีจ่าย|leuak wi-thii jaai|选择付款方式|动词|优惠付款|คุณสามารถเลือกวิธีจ่ายก่อนยืนยันคำสั่งซื้อ|khun saa-maat leuak wi-thii jaai gaawn yeun-yan kham-sang-seu|你可以在确认订单前选择付款方式。|付款
rabop-jaai-ngoen|ระบบจ่ายเงิน|ra-bop jaai ngoen|支付系统|名词|优惠付款|ระบบจ่ายเงินช้าชั่วคราว กรุณาลองใหม่อีกครั้ง|ra-bop jaai ngoen chaa chua-khraao ga-ru-naa laawng mai iik khrang|支付系统暂时很慢，请再试一次。|付款
jaai-ngoen-mai-sam-ret|จ่ายเงินไม่สำเร็จ|jaai ngoen mai sam-ret|付款失败|短语|优惠付款|จ่ายเงินไม่สำเร็จเพราะอินเทอร์เน็ตหลุด|jaai ngoen mai sam-ret phraw in-thoe-net lut|付款失败，因为网络断了。|付款
jaai-ngoen-sam-ret|จ่ายเงินสำเร็จ|jaai ngoen sam-ret|付款成功|短语|优惠付款|หน้าจอขึ้นว่าจ่ายเงินสำเร็จและรอร้านส่งของ|naa-jaaw kheun waa jaai ngoen sam-ret lae raaw raan song khaawng|屏幕显示付款成功，并等待店铺发货。|付款
song-salip-hai-raan|ส่งสลิปให้ร้าน|song sa-lip hai raan|把付款凭条发给店铺|动词|优惠付款|หลังโอนเงินแล้ว กรุณาส่งสลิปให้ร้านในแชต|lang oon ngoen laeo ga-ru-naa song sa-lip hai raan nai chaet|转账后，请在聊天里把凭条发给店铺。|付款
khuu-bpaawng|คูปอง|khuu-bpaawng|优惠券|名词|优惠付款|ฉันใช้คูปองลดค่าส่งได้สามสิบบาท|chan chai khuu-bpaawng lot khaa song dai saam-sip baat|我使用优惠券减了三十泰铢运费。|优惠
chai-khuu-bpaawng|ใช้คูปอง|chai khuu-bpaawng|使用优惠券|动词|优惠付款|ก่อนกดจ่ายเงิน อย่าลืมใช้คูปองของร้าน|gaawn got jaai ngoen yaa leum chai khuu-bpaawng khaawng raan|点击付款前，别忘了使用店铺优惠券。|优惠
lot-raa-khaa|ลดราคา|lot raa-khaa|降价|动词|优惠付款|เสื้อตัวนี้ลดราคาเหลือหนึ่งร้อยบาท|seua dtua nii lot raa-khaa leua neung raawy baat|这件衣服降价到一百泰铢。|优惠
song-frii|ส่งฟรี|song frii|免运费|短语|优惠付款|ถ้าซื้อครบห้าร้อยบาท ร้านส่งฟรีทั่วประเทศ|thaa seu khrop haa raawy baat raan song frii thua bpra-thet|如果买满五百泰铢，店铺全国免运费。|运费
khaa-song|ค่าส่ง|khaa song|运费|名词|配送快递|ค่าส่งแพงกว่าราคาของ ฉันเลยยังไม่ซื้อ|khaa song phaeng gwaa raa-khaa khaawng chan loei yang mai seu|运费比商品价格还贵，所以我还没买。|运费
leuak-khon-song|เลือกขนส่ง|leuak khon-song|选择物流公司|动词|配送快递|ร้านให้ลูกค้าเลือกขนส่งได้สองบริษัท|raan hai luuk-khaa leuak khon-song dai saawng baaw-ri-sat|店铺让客户可以选择两家物流公司。|物流
borisat-khon-song|บริษัทขนส่ง|baaw-ri-sat khon-song|物流公司|名词|配送快递|บริษัทขนส่งโทรมาก่อนเข้ามาส่งของ|baaw-ri-sat khon-song thoo maa gaawn khao maa song khaawng|物流公司来送货前打了电话。|物流
phat-sa-du|พัสดุ|phat-sa-du|包裹|名词|配送快递|พัสดุของฉันมาถึงหน้าบ้านตอนบ่าย|phat-sa-du khaawng chan maa theung naa baan dtaawn baai|我的包裹下午到了家门口。|包裹
song-phat-sa-du|ส่งพัสดุ|song phat-sa-du|寄出包裹|动词|配送快递|ร้านส่งพัสดุหลังได้รับเงินประมาณหนึ่งชั่วโมง|raan song phat-sa-du lang dai rap ngoen bpra-maan neung chua-moong|店铺收到钱后大约一小时寄出包裹。|发货
song-khaawng|ส่งของ|song khaawng|发货|动词|配送快递|ร้านบอกว่าจะส่งของให้ก่อนหกโมงเย็น|raan baawk waa ja song khaawng hai gaawn hok moong yen|店铺说会在下午六点前发货。|发货
raaw-song-khaawng|รอส่งของ|raaw song khaawng|等待发货|短语|物流状态|คำสั่งซื้อยังอยู่ในสถานะรอส่งของ|kham-sang-seu yang yuu nai sa-thaa-na raaw song khaawng|订单仍处于等待发货状态。|状态
song-khaawng-laeo|ส่งของแล้ว|song khaawng laeo|已发货|短语|物流状态|แอปแจ้งว่าส่งของแล้วและมีเลขพัสดุ|aep jaeng waa song khaawng laeo lae mii lek phat-sa-du|应用通知已发货，并有包裹单号。|状态
lek-phat-sa-du|เลขพัสดุ|lek phat-sa-du|快递单号|名词|物流状态|ฉันส่งเลขพัสดุให้แม่เพื่อติดตามของ|chan song lek phat-sa-du hai mae phuea dtit-dtaam khaawng|我把快递单号发给妈妈，用来追踪东西。|单号
tid-dtaam-phat-sa-du|ติดตามพัสดุ|dtit-dtaam phat-sa-du|追踪包裹|动词|物流状态|ลูกค้าสามารถติดตามพัสดุในแอปได้ตลอดเวลา|luuk-khaa saa-maat dtit-dtaam phat-sa-du nai aep dai dta-laawt wee-laa|客户可以随时在应用里追踪包裹。|物流
sa-thaa-na-phat-sa-du|สถานะพัสดุ|sa-thaa-na phat-sa-du|包裹状态|名词|物流状态|สถานะพัสดุขึ้นว่ากำลังนำส่ง|sa-thaa-na phat-sa-du kheun waa gam-lang nam song|包裹状态显示正在派送。|状态
gam-lang-nam-song|กำลังนำส่ง|gam-lang nam song|正在派送|短语|物流状态|พัสดุกำลังนำส่ง อาจถึงบ้านก่อนเย็น|phat-sa-du gam-lang nam song aat theung baan gaawn yen|包裹正在派送，可能傍晚前到家。|派送
khao-ra-bop-laeo|เข้าระบบแล้ว|khao ra-bop laeo|已录入系统|短语|物流状态|เลขพัสดุเพิ่งเข้าระบบแล้วเมื่อเช้านี้|lek phat-sa-du phoeng khao ra-bop laeo meua chaao nii|快递单号今天早上刚录入系统。|状态
yuu-ra-waang-thaang|อยู่ระหว่างทาง|yuu ra-waang thaang|在途中|短语|物流状态|ของอยู่ระหว่างทางจากกรุงเทพไปเชียงใหม่|khaawng yuu ra-waang thaang jaak grung-theep bpai chiiang-mai|东西正在从曼谷去清迈的途中。|状态
theung-saa-khaa|ถึงสาขา|theung saa-khaa|到达网点|短语|物流状态|พัสดุถึงสาขาใกล้บ้านแล้วและรอคนนำส่ง|phat-sa-du theung saa-khaa glai baan laeo lae raaw khon nam song|包裹已到达家附近网点，等待派送员送出。|状态
phat-sa-du-dtii-glap|พัสดุตีกลับ|phat-sa-du dtii glap|包裹退回|短语|物流状态|พัสดุตีกลับเพราะที่อยู่ไม่ครบและโทรไม่ติด|phat-sa-du dtii glap phraw thii-yuu mai khrop lae thoo mai dtit|包裹退回了，因为地址不完整且电话打不通。|状态
phat-sa-du-khaang|พัสดุค้าง|phat-sa-du khaang|包裹滞留|短语|物流状态|พัสดุค้างที่สาขาสองวันแล้ว ฉันจึงถามขนส่ง|phat-sa-du khaang thii saa-khaa saawng wan laeo chan jeung thaam khon-song|包裹在网点滞留两天了，所以我询问物流。|状态
khaawng-theung-laeo|ของถึงแล้ว|khaawng theung laeo|货到了|短语|收货取件|ของถึงแล้วแต่ฉันยังไม่ว่างลงไปรับ|khaawng theung laeo dtae chan yang mai waang long bpai rap|货到了，但我还没空下去取。|收货
yang-mai-dai-rap-khaawng|ยังไม่ได้รับของ|yang mai dai rap khaawng|还没收到货|短语|收货取件|แอปขึ้นว่าส่งแล้ว แต่ฉันยังไม่ได้รับของ|aep kheun waa song laeo dtae chan yang mai dai rap khaawng|应用显示已送达，但我还没收到货。|收货
rap-khaawng|รับของ|rap khaawng|收货|动词|收货取件|น้องชายช่วยรับของแทนฉันตอนฉันไม่อยู่บ้าน|naawng-chaai chuai rap khaawng thaen chan dtaawn chan mai yuu baan|我不在家时，弟弟帮我代收货。|收货
sen-rap-khaawng|เซ็นรับของ|sen rap khaawng|签收货物|动词|收货取件|บางบริษัทขนส่งต้องให้ลูกค้าเซ็นรับของ|baang baaw-ri-sat khon-song dtawng hai luuk-khaa sen rap khaawng|有些物流公司需要客户签收货物。|签收
rap-thaen|รับแทน|rap thaen|代收|动词|收货取件|เพื่อนบ้านรับแทนและวางกล่องไว้หน้าห้อง|pheuan-baan rap thaen lae waang glaawng wai naa haawng|邻居代收，并把盒子放在房门前。|代收
waang-naa-haawng|วางหน้าห้อง|waang naa haawng|放在房门口|动词|收货取件|คนส่งของโทรถามว่าวางหน้าห้องได้ไหม|khon song khaawng thoo thaam waa waang naa haawng dai mai|派送员打电话问能不能放在房门口。|收货
waang-naa-baan|วางหน้าบ้าน|waang naa baan|放在家门口|动词|收货取件|ถ้าไม่มีคนอยู่ กรุณาวางหน้าบ้านใต้หลังคา|thaa mai mii khon yuu ga-ru-naa waang naa baan dtai lang-khaa|如果没人，请放在家门口屋檐下。|收货
khon-song-khaawng|คนส่งของ|khon song khaawng|派送员|名词|配送快递|คนส่งของโทรมาเมื่อถึงหน้าหมู่บ้าน|khon song khaawng thoo maa meua theung naa muu-baan|派送员到小区门口时打电话来。|派送
thoo-maa-gaawn-song|โทรมาก่อนส่ง|thoo maa gaawn song|派送前打电话|动词|配送快递|กรุณาโทรมาก่อนส่ง เพราะฉันอาจอยู่ที่ทำงาน|ga-ru-naa thoo maa gaawn song phraw chan aat yuu thii tham-ngaan|请派送前打电话，因为我可能在上班。|派送
bplian-thii-yuu-song|เปลี่ยนที่อยู่ส่ง|bplian thii-yuu song|更改收货地址|动词|配送快递|ฉันอยากเปลี่ยนที่อยู่ส่งก่อนร้านส่งของ|chan yaak bplian thii-yuu song gaawn raan song khaawng|我想在店铺发货前更改收货地址。|地址
thii-yuu-song-khaawng|ที่อยู่ส่งของ|thii-yuu song khaawng|收货地址|名词|配送快递|ที่อยู่ส่งของต้องมีบ้านเลขที่และเบอร์โทร|thii-yuu song khaawng dtawng mii baan-lek-thii lae ber thoo|收货地址必须有门牌号和电话。|地址
ber-rap-khaawng|เบอร์รับของ|ber rap khaawng|收货电话|名词|配送快递|เบอร์รับของผิด ทำให้คนส่งของโทรไม่ติด|ber rap khaawng phit tham hai khon song khaawng thoo mai dtit|收货电话错了，导致派送员打不通。|电话
phuu-rap-khaawng|ผู้รับของ|phuu rap khaawng|收货人|名词|配送快递|ชื่อผู้รับของต้องตรงกับข้อมูลในคำสั่งซื้อ|cheu phuu rap khaawng dtawng dtrong gap khaaw-muun nai kham-sang-seu|收货人姓名必须和订单资料一致。|收货
jaeng-thii-yuu-phit|แจ้งที่อยู่ผิด|jaeng thii-yuu phit|填错地址|动词|配送快递|ฉันแจ้งที่อยู่ผิดและรีบทักแอดมินให้แก้|chan jaeng thii-yuu phit lae riip thak aed-min hai gae|我填错地址了，赶紧联系管理员修改。|地址
khaaw-gae-thii-yuu|ขอแก้ที่อยู่|khaaw gae thii-yuu|请求改地址|动词|联系客服|ขอแก้ที่อยู่ได้ไหมคะ ร้านยังไม่ได้ส่งของใช่ไหม|khaaw gae thii-yuu dai mai kha raan yang mai dai song khaawng chai mai|可以请求改地址吗？店铺还没发货，对吗？|客服
thak-raan|ทักร้าน|thak raan|联系店铺|动词|联系客服|ถ้ามีคำถามเรื่องสี ให้ทักร้านก่อนสั่งซื้อ|thaa mii kham-thaam reuuang sii hai thak raan gaawn sang-seu|如果有颜色问题，请下单前联系店铺。|客服
thak-aed-min|ทักแอดมิน|thak aed-min|联系管理员|动词|联系客服|ฉันทักแอดมินเพื่อถามว่าสินค้าพร้อมส่งไหม|chan thak aed-min phuea thaam waa sin-khaa phraawm song mai|我联系管理员询问商品是否现货可发。|客服
khui-gab-aed-min|คุยกับแอดมิน|khui gap aed-min|和客服沟通|动词|联系客服|คุยกับแอดมินแล้ว เขาบอกว่าจะเช็กให้|khui gap aed-min laeo khao baawk waa ja chek hai|和客服沟通过了，他说会帮忙查。|客服
haawng-chaet|ห้องแชต|haawng chaet|聊天窗口|名词|联系客服|ส่งรูปสินค้าเสียในห้องแชตให้ร้านดู|song ruup sin-khaa siia nai haawng chaet hai raan duu|在聊天窗口发送损坏商品照片给店铺看。|客服
khaaw-chek-hai|ขอเช็กให้|khaaw chek hai|请求帮忙查询|动词|联系客服|รบกวนขอเช็กให้หน่อยว่าพัสดุอยู่ที่ไหน|rop-guan khaaw chek hai naawy waa phat-sa-du yuu thii nai|麻烦帮忙查询一下包裹在哪里。|客服
raaw-aed-min-dtaawp|รอแอดมินตอบ|raaw aed-min dtaawp|等待客服回复|动词|联系客服|ฉันรอแอดมินตอบเรื่องการคืนสินค้า|chan raaw aed-min dtaawp reuuang gaan kheun sin-khaa|我在等待客服回复退货的事情。|客服
aed-min-dtaawp-laeo|แอดมินตอบแล้ว|aed-min dtaawp laeo|客服已回复|短语|联系客服|แอดมินตอบแล้วว่าร้านจะส่งของใหม่ให้|aed-min dtaawp laeo waa raan ja song khaawng mai hai|客服已回复说店铺会寄新的给我。|客服
song-ruup-hai-raan|ส่งรูปให้ร้าน|song ruup hai raan|发照片给店铺|动词|联系客服|ถ้าของแตก กรุณาส่งรูปให้ร้านภายในวันนี้|thaa khaawng dtaek ga-ru-naa song ruup hai raan phaai-nai wan-nii|如果东西破了，请今天内把照片发给店铺。|客服
sin-khaa-siia|สินค้าเสีย|sin-khaa siia|商品损坏|短语|退换售后|สินค้าเสียตั้งแต่เปิดกล่อง ฉันจึงขอคืน|sin-khaa siia dtang-dtae bpoet glaawng chan jeung khaaw kheun|商品一打开盒子就是坏的，所以我请求退货。|售后
khaawng-dtaek|ของแตก|khaawng dtaek|东西破碎|短语|退换售后|ของแตกในกล่องเพราะไม่มีวัสดุกันกระแทก|khaawng dtaek nai glaawng phraw mai mii wat-sa-du gan gra-thaek|东西在盒子里碎了，因为没有防震材料。|售后
khaawng-mai-khrop|ของไม่ครบ|khaawng mai khrop|东西不全|短语|退换售后|ของไม่ครบ ขาดสายชาร์จหนึ่งเส้นในกล่อง|khaawng mai khrop khaat saai chaat neung sen nai glaawng|东西不全，盒子里少了一根充电线。|售后
khaawng-phit|ของผิด|khaawng phit|发错货|短语|退换售后|ร้านส่งของผิด ฉันสั่งสีดำแต่ได้สีขาว|raan song khaawng phit chan sang sii dam dtae dai sii khaao|店铺发错货，我订的是黑色却收到白色。|售后
khaaw-kheun-sin-khaa|ขอคืนสินค้า|khaaw kheun sin-khaa|申请退货|动词|退换售后|ถ้าสินค้าเสีย ลูกค้าสามารถขอคืนสินค้าได้|thaa sin-khaa siia luuk-khaa saa-maat khaaw kheun sin-khaa dai|如果商品损坏，客户可以申请退货。|退货
kheun-sin-khaa|คืนสินค้า|kheun sin-khaa|退货|动词|退换售后|ฉันต้องคืนสินค้าเพราะขนาดเล็กเกินไป|chan dtawng kheun sin-khaa phraw kha-naat lek goen bpai|我必须退货，因为尺寸太小。|退货
khaaw-bplian-sin-khaa|ขอเปลี่ยนสินค้า|khaaw bplian sin-khaa|申请换货|动词|退换售后|ลูกค้าขอเปลี่ยนสินค้าเป็นสีฟ้าแทนสีเขียว|luuk-khaa khaaw bplian sin-khaa bpen sii faa thaen sii khiao|客户申请把商品换成蓝色而不是绿色。|换货
bplian-kha-naat|เปลี่ยนขนาด|bplian kha-naat|换尺寸|动词|退换售后|รองเท้าคู่นี้คับไป ฉันอยากเปลี่ยนขนาด|raawng-thaao khuu nii khap bpai chan yaak bplian kha-naat|这双鞋太紧了，我想换尺寸。|换货
kheun-ngoen|คืนเงิน|kheun ngoen|退款|动词|退换售后|ร้านจะคืนเงินภายในสามวันหลังได้รับของคืน|raan ja kheun ngoen phaai-nai saam wan lang dai rap khaawng kheun|店铺收到退货后会在三天内退款。|退款
raaw-kheun-ngoen|รอคืนเงิน|raaw kheun ngoen|等待退款|动词|退换售后|ฉันรอคืนเงินจากร้านมาเกือบหนึ่งสัปดาห์|chan raaw kheun ngoen jaak raan maa geuap neung sap-daa|我等店铺退款已经将近一周了。|退款
ngoen-kheun-laeo|เงินคืนแล้ว|ngoen kheun laeo|钱已退回|短语|退换售后|เงินคืนแล้วเข้าบัญชีเมื่อเช้านี้|ngoen kheun laeo khao ban-chii meua chaao nii|退款今天早上已经回到账户。|退款
nguean-khai-kheun-khaawng|เงื่อนไขคืนของ|ngeuan-khai kheun khaawng|退货条件|名词|退换售后|ก่อนซื้อควรอ่านเงื่อนไขคืนของให้ดี|gaawn seu khuan aan ngeuan-khai kheun khaawng hai dii|购买前应该仔细阅读退货条件。|售后
phai-nai-jet-wan|ภายในเจ็ดวัน|phaai-nai jet wan|七天内|短语|退换售后|ร้านรับเปลี่ยนสินค้าภายในเจ็ดวันหลังได้รับของ|raan rap bplian sin-khaa phaai-nai jet wan lang dai rap khaawng|店铺收到货后七天内接受换货。|期限
glawng-doem|กล่องเดิม|glaawng doem|原包装盒|名词|退换售后|ถ้าจะคืนสินค้า ต้องเก็บกล่องเดิมไว้ด้วย|thaa ja kheun sin-khaa dtawng gep glaawng doem wai duai|如果要退货，也要保留原包装盒。|包装
bai-set-online|ใบเสร็จออนไลน์|bai-set aawn-lai|电子收据|名词|优惠付款|ใบเสร็จออนไลน์อยู่ในอีเมลหลังจ่ายเงิน|bai-set aawn-lai yuu nai ii-meel lang jaai ngoen|付款后电子收据在邮件里。|收据
lak-thaan-gaan-jaai|หลักฐานการจ่าย|lak-thaan gaan jaai|付款证明|名词|优惠付款|แอดมินขอหลักฐานการจ่ายเพื่อเช็กคำสั่งซื้อ|aed-min khaaw lak-thaan gaan jaai phuea chek kham-sang-seu|客服要求付款证明来核对订单。|付款
song-kheun-raan|ส่งคืนร้าน|song kheun raan|寄回店铺|动词|退换售后|ฉันต้องส่งคืนร้านโดยใช้บริษัทขนส่งเดิม|chan dtawng song kheun raan dooi chai baaw-ri-sat khon-song doem|我需要用原来的物流公司寄回店铺。|退货
khaa-song-kheun|ค่าส่งคืน|khaa song kheun|退货运费|名词|退换售后|ค่าส่งคืนครั้งนี้ลูกค้าต้องจ่ายเอง|khaa song kheun khrang nii luuk-khaa dtawng jaai eeng|这次退货运费需要客户自己支付。|退货
bpai-song-kheun|ไปส่งคืน|bpai song kheun|去寄回|动词|退换售后|เย็นนี้ฉันจะไปส่งคืนที่สาขาขนส่งใกล้บ้าน|yen nii chan ja bpai song kheun thii saa-khaa khon-song glai baan|今晚我要去家附近物流网点寄回。|退货
phim-bai-song|พิมพ์ใบส่ง|phim bai song|打印寄件单|动词|退换售后|ก่อนส่งคืนสินค้า ต้องพิมพ์ใบส่งจากแอป|gaawn song kheun sin-khaa dtawng phim bai song jaak aep|退货寄回前，需要从应用打印寄件单。|退货
dtit-bpaai-song|ติดป้ายส่ง|dtit bpaai song|贴寄件标签|动词|退换售后|กรุณาติดป้ายส่งบนกล่องให้เห็นชัด|ga-ru-naa dtit bpaai song bon glaawng hai hen chat|请把寄件标签清楚贴在盒子上。|退货
rii-wiu|รีวิว|rii-wiu|评价|名词|评价反馈|รีวิวของร้านนี้ส่วนใหญ่บอกว่าส่งของเร็ว|rii-wiu khaawng raan nii suan-yai baawk waa song khaawng reo|这家店的评价大多说发货快。|评价
aan-rii-wiu|อ่านรีวิว|aan rii-wiu|看评价|动词|评价反馈|ก่อนซื้อของแพง ฉันชอบอ่านรีวิวหลาย ๆ อัน|gaawn seu khaawng phaeng chan chaawp aan rii-wiu laai laai an|买贵的东西前，我喜欢看很多评价。|评价
khian-rii-wiu|เขียนรีวิว|khiian rii-wiu|写评价|动词|评价反馈|หลังได้รับของแล้ว ลูกค้าสามารถเขียนรีวิวได้|lang dai rap khaawng laeo luuk-khaa saa-maat khiian rii-wiu dai|收到货后，客户可以写评价。|评价
hai-dao|ให้ดาว|hai daao|给星级|动词|评价反馈|ฉันให้ดาวห้าดวงเพราะสินค้าดีและส่งเร็ว|chan hai daao haa duang phraw sin-khaa dii lae song reo|我给五星，因为商品好且发货快。|评价
dao-ha-duang|ดาวห้าดวง|daao haa duang|五星|名词|评价反馈|ร้านนี้มีดาวห้าดวงจากลูกค้าหลายคน|raan nii mii daao haa duang jaak luuk-khaa laai khon|这家店有很多客户给的五星。|评价
khwam-hen-luuk-khaa|ความคิดเห็นลูกค้า|khwaam-hen luuk-khaa|客户意见|名词|评价反馈|ร้านอ่านความคิดเห็นลูกค้าแล้วปรับการแพ็กของ|raan aan khwaam-hen luuk-khaa laeo bprap gaan phaek khaawng|店铺阅读客户意见后调整包装。|评价
chom-raan|ชมร้าน|chom raan|称赞店铺|动词|评价反馈|ลูกค้าชมร้านว่าส่งเร็วและตอบคำถามดี|luuk-khaa chom raan waa song reo lae dtaawp kham-thaam dii|客户称赞店铺发货快且回答问题好。|评价
dtam-ni-raan|ตำหนิร้าน|dtam-ni raan|批评店铺|动词|评价反馈|บางคนตำหนิร้านเพราะตอบช้าในช่วงลดราคา|baang khon dtam-ni raan phraw dtaawp chaa nai chuang lot raa-khaa|有些人批评店铺在打折期间回复慢。|评价
sin-khaa-dii|สินค้าดี|sin-khaa dii|商品好|短语|评价反馈|สินค้าดีมาก ผ้านุ่มและสีตรงกับรูป|sin-khaa dii maak phaa num lae sii dtrong gap ruup|商品很好，布料柔软，颜色和图片一致。|评价
song-reo|ส่งเร็ว|song reo|发货快|短语|评价反馈|ร้านนี้ส่งเร็ว ฉันสั่งเมื่อวานและได้วันนี้|raan nii song reo chan sang meua-waan lae dai wan-nii|这家店发货快，我昨天订，今天就到了。|评价
phaek-dii|แพ็กดี|phaek dii|包装好|短语|评价反馈|แก้วไม่แตกเพราะร้านแพ็กดีและใส่กันกระแทก|gaeo mai dtaek phraw raan phaek dii lae sai gan gra-thaek|杯子没碎，因为店铺包装好并放了防震材料。|包装
phaek-mai-dii|แพ็กไม่ดี|phaek mai dii|包装不好|短语|评价反馈|สินค้าเสียหายเพราะแพ็กไม่ดีและกล่องบาง|sin-khaa siia-haai phraw phaek mai dii lae glaawng baang|商品受损，因为包装不好，盒子也薄。|包装
gan-gra-thaek|กันกระแทก|gan gra-thaek|防震保护|名词|配送快递|ของแตกง่ายควรใส่กันกระแทกหลายชั้น|khaawng dtaek ngaai khuan sai gan gra-thaek laai chan|易碎物品应该放多层防震保护。|包装
glaawng-buup|กล่องบุบ|glaawng buup|盒子压瘪|短语|收货取件|กล่องบุบเล็กน้อย แต่ของข้างในไม่เสีย|glaawng buup lek naawy dtae khaawng khaang-nai mai siia|盒子有点压瘪，但里面的东西没坏。|包装
bpoet-glaawng|เปิดกล่อง|bpoet glaawng|开箱|动词|收货取件|ฉันเปิดกล่องถ่ายวิดีโอไว้เป็นหลักฐาน|chan bpoet glaawng thaai wi-dii-oo wai bpen lak-thaan|我开箱时拍视频作为证明。|收货
thaai-wi-dii-oo-bpoet-glaawng|ถ่ายวิดีโอเปิดกล่อง|thaai wi-dii-oo bpoet glaawng|拍开箱视频|动词|收货取件|ร้านแนะนำให้ถ่ายวิดีโอเปิดกล่องเมื่อได้รับของ|raan nae-nam hai thaai wi-dii-oo bpoet glaawng meua dai rap khaawng|店铺建议收到货时拍开箱视频。|证明
dtruat-khaawng|ตรวจของ|dtruat khaawng|检查货物|动词|收货取件|หลังรับของควรตรวจของก่อนทิ้งกล่อง|lang rap khaawng khuan dtruat khaawng gaawn thing glaawng|收货后应该先检查货物再丢盒子。|收货
khaawng-khrop|ของครบ|khaawng khrop|东西齐全|短语|收货取件|ของครบทุกชิ้นและไม่มีอะไรเสียหาย|khaawng khrop thuk chin lae mai mii a-rai siia-haai|东西每件都齐全，也没有任何损坏。|收货
meuan-nai-ruup|เหมือนในรูป|meuan nai ruup|和图片一样|短语|评价反馈|เสื้อจริงเหมือนในรูปและสีสวยมาก|seua jing meuan nai ruup lae sii suai maak|实物衣服和图片一样，颜色很漂亮。|评价
mai-meuan-nai-ruup|ไม่เหมือนในรูป|mai meuan nai ruup|和图片不一样|短语|评价反馈|ของจริงไม่เหมือนในรูป ฉันจึงให้รีวิวสามดาว|khaawng jing mai meuan nai ruup chan jeung hai rii-wiu saam daao|实物和图片不一样，所以我给了三星评价。|评价
phraawm-song|พร้อมส่ง|phraawm song|现货可发|短语|网购下单|แอดมินบอกว่าสินค้าพร้อมส่งทุกสี|aed-min baawk waa sin-khaa phraawm song thuk sii|客服说所有颜色都现货可发。|库存
dtriiam-song|เตรียมส่ง|dtriiam song|准备发货|动词|物流状态|ร้านกำลังเตรียมส่งและจะให้เลขพัสดุคืนนี้|raan gam-lang dtriiam song lae ja hai lek phat-sa-du kheun nii|店铺正在准备发货，今晚会给快递单号。|发货
dtat-raawp-song|ตัดรอบส่ง|dtat raawp song|截单发货|动词|配送快递|ร้านตัดรอบส่งตอนบ่ายสามโมงทุกวัน|raan dtat raawp song dtaawn baai saam moong thuk wan|店铺每天三点截单发货。|发货
song-wan-nii|ส่งวันนี้|song wan-nii|今天发货|短语|配送快递|ถ้าจ่ายก่อนเที่ยง ร้านส่งวันนี้ได้เลย|thaa jaai gaawn thiiang raan song wan-nii dai loei|如果中午前付款，店铺今天就能发货。|发货
song-phrung-nii|ส่งพรุ่งนี้|song phrung-nii|明天发货|短语|配送快递|คำสั่งซื้อหลังห้าโมงจะส่งพรุ่งนี้เช้า|kham-sang-seu lang haa moong ja song phrung-nii chaao|五点后的订单会明天早上发货。|发货
song-chaa|ส่งช้า|song chaa|发货慢|短语|评价反馈|ช่วงโปรโมชันร้านส่งช้าแต่แจ้งลูกค้าก่อน|chuang bproo-moo-chan raan song chaa dtae jaeng luuk-khaa gaawn|促销期间店铺发货慢，但提前通知客户。|评价
song-phit-thii-yuu|ส่งผิดที่อยู่|song phit thii-yuu|送错地址|动词|配送快递|พัสดุส่งผิดที่อยู่เพราะบ้านเลขที่ไม่ชัด|phat-sa-du song phit thii-yuu phraw baan-lek-thii mai chat|包裹送错地址，因为门牌号不清楚。|物流
khaaw-song-mai|ขอส่งใหม่|khaaw song mai|请求重新寄送|动词|退换售后|ของตีกลับแล้ว ฉันขอส่งใหม่ไปที่อยู่เดิม|khaawng dtii glap laeo chan khaaw song mai bpai thii-yuu doem|货退回了，我请求重新寄到原地址。|售后
song-mai|ส่งใหม่|song mai|重新寄送|动词|退换售后|ร้านจะส่งใหม่ให้พรุ่งนี้โดยไม่คิดค่าส่ง|raan ja song mai hai phrung-nii dooi mai khit khaa song|店铺明天会重新寄送，不收运费。|售后
song-khaawng-thaen|ส่งของแทน|song khaawng thaen|寄替换品|动词|退换售后|สินค้าเสีย ร้านจึงส่งของแทนมาให้หนึ่งชิ้น|sin-khaa siia raan jeung song khaawng thaen maa hai neung chin|商品坏了，所以店铺寄了一个替换品来。|售后
khaawng-thaen|ของแทน|khaawng thaen|替换品|名词|退换售后|ของแทนมาถึงแล้วและใช้ได้ปกติ|khaawng thaen maa theung laeo lae chai dai bpok-ga-dti|替换品已经到了，并且可以正常使用。|售后
rap-bpra-gan|รับประกัน|rap bpra-gan|保修|动词|退换售后|สินค้านี้รับประกันหนึ่งปีถ้าไม่ตกน้ำ|sin-khaa nii rap bpra-gan neung bpii thaa mai dtok naam|这个商品保修一年，如果没有进水。|保修
yu-nai-bpra-gan|อยู่ในประกัน|yuu nai bpra-gan|在保修期内|短语|退换售后|เครื่องยังอยู่ในประกัน ร้านจึงซ่อมให้ฟรี|khreuuang yang yuu nai bpra-gan raan jeung saawm hai frii|机器还在保修期内，所以店铺免费维修。|保修
mot-bpra-gan|หมดประกัน|mot bpra-gan|过保|短语|退换售后|ถ้าหมดประกันแล้ว ลูกค้าต้องจ่ายค่าซ่อมเอง|thaa mot bpra-gan laeo luuk-khaa dtawng jaai khaa saawm eeng|如果过保了，客户需要自己付维修费。|保修
khaaw-rian-khuu-meu|ขอคู่มือ|khaaw khuu-meu|索要说明书|动词|联系客服|ฉันขอคู่มือภาษาไทยเพราะอ่านวิธีใช้ไม่เข้าใจ|chan khaaw khuu-meu phaa-saa thai phraw aan wi-thii chai mai khao-jai|我索要泰语说明书，因为看不懂使用方法。|客服
wi-thii-chai|วิธีใช้|wi-thii chai|使用方法|名词|网购下单|ก่อนใช้เครื่องใหม่ ควรอ่านวิธีใช้ให้ครบ|gaawn chai khreuuang mai khuan aan wi-thii chai hai khrop|使用新机器前，应该完整阅读使用方法。|说明
tham-dtaam-khuu-meu|ทำตามคู่มือ|tham dtaam khuu-meu|按说明书操作|动词|网购下单|ถ้าทำตามคู่มือแล้วยังใช้ไม่ได้ ให้ทักร้าน|thaa tham dtaam khuu-meu laeo yang chai mai dai hai thak raan|如果按说明书操作后还是不能用，就联系店铺。|说明
pra-gawp-khaawng|ประกอบของ|bpra-gaawp khaawng|组装物品|动词|网购下单|โต๊ะตัวนี้ต้องประกอบของเองหลังได้รับ|dto dtua nii dtawng bpra-gaawp khaawng eeng lang dai rap|这张桌子收到后需要自己组装。|说明
chai-mai-dai|ใช้ไม่ได้|chai mai dai|不能使用|短语|退换售后|เครื่องเปิดติดแต่ใช้ไม่ได้หลังชาร์จเต็มแล้ว|khreuuang bpoet dtit dtae chai mai dai lang chaat dtem laeo|机器能开机，但充满电后不能使用。|售后
chai-dai-bpok-ga-dti|ใช้ได้ปกติ|chai dai bpok-ga-dti|可以正常使用|短语|评价反馈|หลังเปลี่ยนสายชาร์จ เครื่องใช้ได้ปกติแล้ว|lang bplian saai chaat khreuuang chai dai bpok-ga-dti laeo|换充电线后，机器已经可以正常使用。|评价
dtawng-chaat|ต้องชาร์จ|dtawng chaat|需要充电|短语|网购下单|ไฟฉายใหม่ต้องชาร์จก่อนใช้ครั้งแรก|fai-chaai mai dtawng chaat gaawn chai khrang raek|新手电筒第一次使用前需要充电。|说明
maai-mee-hua-chaat|ไม่มีหัวชาร์จ|mai mii hua chaat|没有充电头|短语|退换售后|ในกล่องไม่มีหัวชาร์จ มีแค่สายชาร์จหนึ่งเส้น|nai glaawng mai mii hua chaat mii khaae saai chaat neung sen|盒子里没有充电头，只有一根充电线。|售后
khaat-chin-suan|ขาดชิ้นส่วน|khaat chin-suan|缺少零件|短语|退换售后|เก้าอี้ขาดชิ้นส่วนสองชิ้น จึงประกอบไม่ได้|gao-ii khaat chin-suan saawng chin jeung bpra-gaawp mai dai|椅子少了两个零件，所以不能组装。|售后
chin-suan|ชิ้นส่วน|chin-suan|零件|名词|网购下单|ชิ้นส่วนทุกชิ้นอยู่ในถุงเล็ก ๆ พร้อมคู่มือ|chin-suan thuk chin yuu nai thung lek lek phraawm khuu-meu|所有零件都在小袋子里，并附说明书。|说明
song-khaaw-khwaam-ha-raan|ส่งข้อความหาร้าน|song khaaw-khwaam haa raan|给店铺发消息|动词|联系客服|ฉันส่งข้อความหาร้านเมื่อคืน แต่ยังไม่มีใครตอบ|chan song khaaw-khwaam haa raan meua-kheun dtae yang mai mii khrai dtaawp|我昨晚给店铺发消息，但还没人回复。|客服
khaaw-raai-la-iat-phoem|ขอรายละเอียดเพิ่ม|khaaw raai-la-iat phoem|索要更多详情|动词|联系客服|ก่อนซื้อโทรศัพท์ ฉันขอรายละเอียดเพิ่มเรื่องประกัน|gaawn seu thoo-ra-sap chan khaaw raai-la-iat phoem reuuang bpra-gan|买手机前，我索要更多保修详情。|客服
thaam-khaa-song|ถามค่าส่ง|thaam khaa song|询问运费|动词|联系客服|ฉันถามค่าส่งไปต่างจังหวัดก่อนสั่งซื้อ|chan thaam khaa song bpai dtaang-jang-wat gaawn sang-seu|下单前我询问寄到外府的运费。|客服
thaam-wan-theung|ถามวันถึง|thaam wan theung|询问到货日期|动词|联系客服|ลูกค้าถามวันถึงเพราะต้องใช้ของวันศุกร์|luuk-khaa thaam wan theung phraw dtawng chai khaawng wan-suk|客户询问到货日期，因为星期五要用东西。|客服
khaaw-song-duean|ขอส่งด่วน|khaaw song duan|请求加急配送|动词|配送快递|ถ้าต้องใช้พรุ่งนี้ สามารถขอส่งด่วนได้ไหม|thaa dtawng chai phrung-nii saa-maat khaaw song duan dai mai|如果明天要用，可以请求加急配送吗？|配送
song-duan|ส่งด่วน|song duan|加急配送|动词|配送快递|ร้านส่งด่วนให้แต่ค่าส่งสูงกว่าปกติ|raan song duan hai dtae khaa song suung gwaa bpok-ga-dti|店铺可以加急配送，但运费比平常高。|配送
song-tham-ma-daa|ส่งธรรมดา|song tham-maa-daa|普通配送|动词|配送快递|ถ้าไม่รีบ เลือกส่งธรรมดาจะประหยัดกว่า|thaa mai riip leuak song tham-maa-daa ja bpra-yat gwaa|如果不急，选择普通配送会更省。|配送
khon-song-yai|ขนส่งใหญ่|khon-song yai|大件物流|名词|配送快递|ตู้เสื้อผ้าต้องใช้ขนส่งใหญ่และนัดวันส่ง|dtuu seua-phaa dtawng chai khon-song yai lae nat wan song|衣柜需要大件物流，并预约送货日期。|物流
khaawng-yai|ของใหญ่|khaawng yai|大件物品|名词|配送快递|ของใหญ่ต้องมีคนช่วยยกตอนรับของ|khaawng yai dtawng mii khon chuai yok dtaawn rap khaawng|大件物品收货时需要有人帮忙搬。|大件
khaawng-nak|ของหนัก|khaawng nak|重物|名词|配送快递|ของหนักชิ้นนี้ส่งถึงหน้าบ้านเท่านั้น|khaawng nak chin nii song theung naa baan thao-nan|这件重物只送到家门口。|大件
yok-kheun-chan|ยกขึ้นชั้น|yok kheun chan|搬上楼|动词|配送快递|ถ้าต้องยกขึ้นชั้นสอง มีค่าบริการเพิ่ม|thaa dtawng yok kheun chan saawng mii khaa baaw-ri-gaan phoem|如果需要搬上二楼，会加收服务费。|大件
bpra-tuu-rap-khaawng|ประตูรับของ|bpra-dtuu rap khaawng|收货门口|名词|收货取件|คอนโดให้รับพัสดุที่ประตูรับของด้านหลัง|khaawn-doo hai rap phat-sa-du thii bpra-dtuu rap khaawng daan lang|公寓让在后面的收货门口取包裹。|收货
haawng-phat-sa-du|ห้องพัสดุ|haawng phat-sa-du|包裹室|名词|收货取件|พัสดุของฉันอยู่ที่ห้องพัสดุของคอนโด|phat-sa-du khaawng chan yuu thii haawng phat-sa-du khaawng khaawn-doo|我的包裹在公寓的包裹室。|取件
ra-hat-rap-khaawng|รหัสรับของ|ra-hat rap khaawng|取件码|名词|收货取件|ต้องใช้รหัสรับของสี่หลักเพื่อเปิดตู้พัสดุ|dtawng chai ra-hat rap khaawng sii lak phuea bpoet dtuu phat-sa-du|需要用四位取件码打开包裹柜。|取件
dtuu-phat-sa-du|ตู้พัสดุ|dtuu phat-sa-du|包裹柜|名词|收货取件|ตู้พัสดุอยู่ชั้นล่างใกล้ลิฟต์|dtuu phat-sa-du yuu chan laang glai lif|包裹柜在一楼电梯附近。|取件
bpai-rap-thii-dtuu|ไปรับที่ตู้|bpai rap thii dtuu|去柜子取件|动词|收货取件|หลังเลิกงานฉันจะไปรับที่ตู้พัสดุ|lang loek-ngaan chan ja bpai rap thii dtuu phat-sa-du|下班后我会去包裹柜取件。|取件
mot-we-laa-rap|หมดเวลารับ|mot wee-laa rap|超过取件时间|短语|收货取件|ถ้าหมดเวลารับ ต้องติดต่อเจ้าหน้าที่คอนโด|thaa mot wee-laa rap dtawng dtit-dtaaw jao-naa-thii khaawn-doo|如果超过取件时间，需要联系公寓工作人员。|取件
bpai-rap-thii-saa-khaa|ไปรับที่สาขา|bpai rap thii saa-khaa|去网点自取|动词|收货取件|ถ้าส่งไม่สำเร็จ ลูกค้าสามารถไปรับที่สาขาได้|thaa song mai sam-ret luuk-khaa saa-maat bpai rap thii saa-khaa dai|如果派送失败，客户可以去网点自取。|取件
song-mai-sam-ret|ส่งไม่สำเร็จ|song mai sam-ret|派送失败|短语|物流状态|วันนี้ส่งไม่สำเร็จเพราะไม่มีคนรับโทรศัพท์|wan-nii song mai sam-ret phraw mai mii khon rap thoo-ra-sap|今天派送失败，因为没人接电话。|状态
song-sam-ret|ส่งสำเร็จ|song sam-ret|派送成功|短语|物流状态|สถานะขึ้นว่าส่งสำเร็จตอนบ่ายสองโมง|sa-thaa-na kheun waa song sam-ret dtaawn baai saawng moong|状态显示下午两点派送成功。|状态
bai-jaeng-rap-khaawng|ใบแจ้งรับของ|bai jaeng rap khaawng|取件通知单|名词|收货取件|มีใบแจ้งรับของติดอยู่ที่กล่องจดหมาย|mii bai jaeng rap khaawng dtit yuu thii glaawng jot-maai|邮箱上贴着取件通知单。|取件
jaeng-dteuan-phat-sa-du|แจ้งเตือนพัสดุ|jaeng-dteuan phat-sa-du|包裹提醒|名词|物流状态|แอปส่งแจ้งเตือนพัสดุเมื่อของใกล้ถึง|aep song jaeng-dteuan phat-sa-du meua khaawng glai theung|东西快到时，应用发送包裹提醒。|通知
`;

export const VOCABULARY_EXPANSION_A2_SHOPPING_ONLINE_DELIVERY_01: VocabularyExpansionA2ShoppingOnlineDeliveryCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
