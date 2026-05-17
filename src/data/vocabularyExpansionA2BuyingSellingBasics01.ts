type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "买卖询价" | "报价付款" | "库存规格" | "包装袋装" | "送货取货" | "便宜贵" | "质量状态" | "订购售后";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2BuyingSellingBasicsCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-shopping-service-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2BuyingSellingBasicsCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 是 A2 买卖场景常用表达，适合用于市场、小店或网购沟通。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，要按询价、库存、包装、送货或售后场景区分。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["购物时可搭配 ครับ/ค่ะ/หน่อย/ได้ไหม 让询问更自然礼貌。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
sue-khaawng|ซื้อของ|sue khaawng|买东西|动词|买卖询价|เย็นนี้ฉันจะไปซื้อของใช้ในบ้านที่ตลาดใกล้บ้าน|yen nii chan ja bpai sue khaawng chai nai baan thii dta-laat glai baan|今天傍晚我要去家附近市场买家用品。|购物
khaai-khaawng|ขายของ|khaai khaawng|卖东西|动词|买卖询价|แม่ขายของเล็ก ๆ ออนไลน์หลังเลิกงาน|maae khaai khaawng lek lek awn-lai lang loek ngaan|妈妈下班后在网上卖一些小东西。|销售
phuu-khaai|ผู้ขาย|phuu khaai|卖家|名词|买卖询价|ผู้ขายตอบข้อความเร็วและส่งรูปสินค้าให้ดู|phuu khaai dtaawp khaaw-khwaam reo lae song ruup sin-khaa hai duu|卖家回复消息很快，还发商品照片给看。|人物
phuu-sue|ผู้ซื้อ|phuu sue|买家|名词|买卖询价|ผู้ซื้อถามราคาและสีที่ยังมีอยู่ก่อนสั่ง|phuu sue thaam raa-khaa lae sii thii yang mii yuu gaawn sang|买家下单前询问价格和还有的颜色。|人物
luuk-khaa-mai|ลูกค้าใหม่|luuk-khaa mai|新顾客|名词|买卖询价|ร้านนี้มีส่วนลดเล็กน้อยสำหรับลูกค้าใหม่|raan nii mii suan lot lek naawy sam-rap luuk-khaa mai|这家店给新顾客一点折扣。|人物
luuk-khaa-bpra-jam|ลูกค้าประจำ|luuk-khaa bpra-jam|老顾客；常客|名词|买卖询价|ลูกค้าประจำมักรู้ว่าสินค้าสดมาถึงวันไหน|luuk-khaa bpra-jam mak ruu waa sin-khaa sot maa thueng wan nai|常客通常知道新鲜货哪天到。|人物
raan-khaa-lek|ร้านค้าเล็ก|raan khaa lek|小店|名词|买卖询价|ร้านค้าเล็กหน้าปากซอยขายน้ำและของใช้พื้นฐาน|raan khaa lek naa bpaak saawy khaai naam lae khaawng chai phuen-thaan|巷口小店卖水和基础用品。|商店
raan-online|ร้านออนไลน์|raan awn-lai|网店|名词|买卖询价|ฉันสั่งกระเป๋าจากร้านออนไลน์ที่เพื่อนแนะนำ|chan sang gra-bpao jaak raan awn-lai thii phuean nae-nam|我从朋友推荐的网店订了包。|网购
thaam-raa-khaa|ถามราคา|thaam raa-khaa|问价|动词|买卖询价|ก่อนซื้อผลไม้ ฉันถามราคาทุกครั้ง|gaawn sue phon-la-maai chan thaam raa-khaa thuk khrang|买水果前，我每次都会问价。|询价
raa-khaa-thao-rai|ราคาเท่าไร|raa-khaa thao-rai|多少钱|短语|买卖询价|เสื้อตัวนี้ราคาเท่าไร และมีสีอื่นไหม|suea dtua nii raa-khaa thao-rai lae mii sii euen mai|这件衣服多少钱？还有别的颜色吗？|询价
an-la-thao-rai|อันละเท่าไร|an la thao-rai|每个多少钱|短语|买卖询价|กล่องพลาสติกนี้อันละเท่าไร ถ้าซื้อหลายใบ|glaawng phlaat-sa-dtik nii an la thao-rai thaa sue laai bai|这个塑料盒如果买多个，每个多少钱？|询价
khon-la-thao-rai|คนละเท่าไร|khon la thao-rai|每人多少钱|短语|买卖询价|ถ้าเราซื้อด้วยกัน คนละเท่าไรหลังลดราคา|thaa rao sue duai gan khon la thao-rai lang lot raa-khaa|如果我们一起买，打折后每人多少钱？|询价
lot-dai-mai|ลดได้ไหม|lot dai mai|能便宜点吗|短语|便宜贵|ถ้าซื้อสองชิ้น ลดได้ไหมคะ|thaa sue saawng chin lot dai mai kha|如果买两件，可以便宜点吗？|议价
lot-hai-noi|ลดให้หน่อย|lot hai naawy|请便宜一点|短语|便宜贵|ขอลดให้หน่อยได้ไหม ฉันซื้อกลับไปฝากแม่|khaaw lot hai naawy dai mai chan sue glap bpai faak maae|可以便宜一点吗？我买回去送妈妈。|议价
raa-khaa-phiset|ราคาพิเศษ|raa-khaa phi-seet|特别价|名词|便宜贵|วันนี้มีราคาพิเศษเฉพาะลูกค้าประจำ|wan-nii mii raa-khaa phi-seet cha-phaw luuk-khaa bpra-jam|今天有只给老顾客的特别价。|价格
raa-khaa-dtem|ราคาเต็ม|raa-khaa dtem|原价|名词|便宜贵|ถ้าไม่มีบัตรสมาชิก ต้องจ่ายราคาเต็ม|thaa mai mii bat sa-maa-chik dtawng jaai raa-khaa dtem|如果没有会员卡，就要付原价。|价格
raa-khaa-lot|ราคาลด|raa-khaa lot|折后价|名词|便宜贵|ราคาลดนี้ใช้ถึงวันอาทิตย์เท่านั้น|raa-khaa lot nii chai thueng wan-aa-thit thao-nan|这个折后价只到星期天。|价格
thuuk-gwaa|ถูกกว่า|thuuk gwaa|更便宜|形容词|便宜贵|ร้านข้างในตลาดถูกกว่าร้านหน้าถนนนิดหน่อย|raan khaang nai dta-laat thuuk gwaa raan naa tha-non nit naawy|市场里面的店比路边店便宜一点。|价格
phaaeng-gwaa|แพงกว่า|phaaeng gwaa|更贵|形容词|便宜贵|รุ่นใหม่แพงกว่ารุ่นเก่าแต่เบากว่า|run mai phaaeng gwaa run gao dtaae bao gwaa|新款比旧款贵，但更轻。|价格
mai-phaeng|ไม่แพง|mai phaaeng|不贵|形容词|便宜贵|ร้านนี้อาหารไม่แพงและให้เยอะมาก|raan nii aa-haan mai phaaeng lae hai yoe maak|这家店食物不贵，而且给得很多。|价格
phaaeng-goen-bpai|แพงเกินไป|phaaeng goen bpai|太贵|形容词|便宜贵|กระเป๋าใบนี้สวยแต่แพงเกินไปสำหรับฉัน|gra-bpao bai nii suai dtaae phaaeng goen bpai sam-rap chan|这个包好看，但对我来说太贵了。|价格
khuum-khaa|คุ้มค่า|khum khaa|划算；值得|形容词|便宜贵|ถึงราคาสูงนิดหน่อย แต่คุณภาพดีและคุ้มค่า|thueng raa-khaa suung nit naawy dtaae khun-na-phaap dii lae khum khaa|虽然价格稍高，但质量好，很划算。|价格
mai-khuum|ไม่คุ้ม|mai khum|不划算|形容词|便宜贵|ถ้าค่าส่งแพงมาก ซื้อชิ้นเดียวอาจไม่คุ้ม|thaa khaa song phaaeng maak sue chin diao aat mai khum|如果运费很贵，只买一件可能不划算。|价格
song-raa-khaa|ส่งราคา|song raa-khaa|发报价|动词|报价付款|ช่วยส่งราคาและรูปสินค้าให้ฉันทางไลน์ได้ไหม|chuai song raa-khaa lae ruup sin-khaa hai chan thaang lai dai mai|可以通过 Line 把价格和商品照片发给我吗？|报价
raai-gaan-raa-khaa|รายการราคา|raai-gaan raa-khaa|价格清单|名词|报价付款|ผู้ขายส่งรายการราคาให้ดูในแชต|phuu khaai song raai-gaan raa-khaa hai duu nai chaet|卖家在聊天里发价格清单给看。|报价
ruam-khaa-song|รวมค่าส่ง|ruam khaa song|包含运费|短语|报价付款|ราคานี้รวมค่าส่งแล้วหรือยังคะ|raa-khaa nii ruam khaa song laaeo rue yang kha|这个价格已经包含运费了吗？|报价
mai-ruam-khaa-song|ไม่รวมค่าส่ง|mai ruam khaa song|不含运费|短语|报价付款|สินค้าราคาถูก แต่ไม่รวมค่าส่ง|sin-khaa raa-khaa thuuk dtaae mai ruam khaa song|商品价格便宜，但不含运费。|报价
khaa-song|ค่าส่ง|khaa song|运费|名词|报价付款|ถ้าซื้อครบห้าร้อยบาท ร้านไม่คิดค่าส่ง|thaa sue khrop haa raawy baat raan mai khit khaa song|如果买满五百泰铢，店家不收运费。|运费
khaa-song-phoem|ค่าส่งเพิ่ม|khaa song phoem|额外运费|名词|报价付款|ที่อยู่ไกลจากเมืองต้องจ่ายค่าส่งเพิ่ม|thii-yuu glai jaak mueang dtawng jaai khaa song phoem|地址离市区远，需要付额外运费。|运费
jaai-mat-jam|จ่ายมัดจำ|jaai mat-jam|付定金|动词|报价付款|ถ้าต้องการจองสินค้า กรุณาจ่ายมัดจำก่อน|thaa dtawng-gaan jaawng sin-khaa ga-ru-naa jaai mat-jam gaawn|如果想预留商品，请先付定金。|付款
mat-jam|มัดจำ|mat-jam|定金；押金|名词|报价付款|มัดจำนี้จะหักจากราคาสินค้าเมื่อมารับของ|mat-jam nii ja hak jaak raa-khaa sin-khaa muea maa rap khaawng|这笔定金取货时会从商品价格里扣除。|付款
jaai-suan-thii-luea|จ่ายส่วนที่เหลือ|jaai suan thii luea|付尾款|动词|报价付款|ฉันจ่ายมัดจำแล้ว จะจ่ายส่วนที่เหลือวันรับของ|chan jaai mat-jam laaeo ja jaai suan thii luea wan rap khaawng|我已付定金，会在取货当天付尾款。|付款
jaai-khrop|จ่ายครบ|jaai khrop|付清|动词|报价付款|ลูกค้าจ่ายครบแล้ว ร้านจึงเริ่มจัดส่งสินค้า|luuk-khaa jaai khrop laaeo raan jeung roem jat song sin-khaa|顾客已付清，店家于是开始发货。|付款
jaai-ngoen-sot|จ่ายเงินสด|jaai ngoen sot|付现金|动词|报价付款|ถ้ามารับเอง สามารถจ่ายเงินสดที่ร้านได้|thaa maa rap eeng saa-maat jaai ngoen sot thii raan dai|如果自取，可以在店里付现金。|付款
oon-ngoen|โอนเงิน|oon ngoen|转账|动词|报价付款|ฉันโอนเงินให้ร้านแล้วและส่งสลิปไปในแชต|chan oon ngoen hai raan laaeo lae song sa-lip bpai nai chaet|我已经转账给店家，并在聊天里发了凭证。|付款
slip-jaai|สลิปจ่าย|sa-lip jaai|付款凭证|名词|报价付款|หลังโอนเงิน กรุณาส่งสลิปจ่ายเพื่อยืนยันคำสั่งซื้อ|lang oon ngoen ga-ru-naa song sa-lip jaai phuea yuen-yan kham-sang-sue|转账后，请发送付款凭证确认订单。|付款
yuen-yan-jaai|ยืนยันจ่าย|yuen-yan jaai|确认付款|动词|报价付款|ระบบยืนยันจ่ายแล้ว ฉันจึงรอร้านส่งของ|ra-bop yuen-yan jaai laaeo chan jeung raaw raan song khaawng|系统已确认付款，所以我等店家发货。|付款
mii-khaawng|มีของ|mii khaawng|有货|短语|库存规格|สีดำยังมีของไหม ฉันอยากซื้อวันนี้|sii dam yang mii khaawng mai chan yaak sue wan-nii|黑色还有货吗？我今天想买。|库存
khaawng-mot|ของหมด|khaawng mot|没货；售完|短语|库存规格|รุ่นเล็กของหมดแล้ว เหลือแต่รุ่นใหญ่|run lek khaawng mot laaeo luea dtaae run yai|小号没货了，只剩大号。|库存
khaawng-khao-mai|ของเข้าใหม่|khaawng khao mai|新货到|短语|库存规格|ถ้าของเข้าใหม่ ช่วยแจ้งฉันทางข้อความได้ไหม|thaa khaawng khao mai chuai jaaeng chan thaang khaaw-khwaam dai mai|如果新货到了，可以通过消息通知我吗？|库存
khaawng-yang-mii|ของยังมี|khaawng yang mii|货还在；还有货|短语|库存规格|ของยังมีหลายสี แต่สีฟ้าเหลือน้อย|khaawng yang mii laai sii dtaae sii faa luea naawy|货还有多种颜色，但蓝色剩得少。|库存
luea-gii-chin|เหลือกี่ชิ้น|luea gii chin|剩几件|短语|库存规格|เสื้อรุ่นนี้เหลือกี่ชิ้นในไซซ์เอ็ม|suea run nii luea gii chin nai sai em|这款衣服 M 号剩几件？|库存
luea-chin-diao|เหลือชิ้นเดียว|luea chin diao|只剩一件|短语|库存规格|สีนี้เหลือชิ้นเดียว ถ้าชอบควรรีบซื้อ|sii nii luea chin diao thaa chaawp khuuan riip sue|这个颜色只剩一件，如果喜欢应该快买。|库存
mee-sii-uen|มีสีอื่น|mii sii euen|有别的颜色|短语|库存规格|กระเป๋าใบนี้มีสีอื่นไหม เช่น สีเทาหรือสีดำ|gra-bpao bai nii mii sii euen mai chen sii thao rue sii dam|这个包有别的颜色吗？比如灰色或黑色。|规格
mee-size-yai|มีไซซ์ใหญ่|mii sai yai|有大号|短语|库存规格|รองเท้าคู่นี้มีไซซ์ใหญ่กว่านี้ไหม|raawng-thaao khuu nii mii sai yai gwaa nii mai|这双鞋有更大的号吗？|规格
mee-size-lek|มีไซซ์เล็ก|mii sai lek|有小号|短语|库存规格|เสื้อตัวนี้หลวมไป มีไซซ์เล็กไหม|suea dtua nii luam bpai mii sai lek mai|这件衣服太宽松了，有小号吗？|规格
run-mai|รุ่นใหม่|run mai|新款|名词|库存规格|รุ่นใหม่เบากว่าและมีสีให้เลือกมากกว่า|run mai bao gwaa lae mii sii hai leuuak maak gwaa|新款更轻，而且可选颜色更多。|规格
run-gao|รุ่นเก่า|run gao|旧款|名词|库存规格|รุ่นเก่าถูกกว่าแต่ไม่มีประกันร้าน|run gao thuuk gwaa dtaae mai mii bpra-gan raan|旧款更便宜，但没有店铺保修。|规格
dtua-yaang-sin-khaa|ตัวอย่างสินค้า|dtua-yaang sin-khaa|样品|名词|库存规格|ขอดูตัวอย่างสินค้าก่อนสั่งจำนวนมากได้ไหม|khaaw duu dtua-yaang sin-khaa gaawn sang jam-nuan maak dai mai|大量订购前可以先看样品吗？|样品
laawng-chai|ลองใช้|laawng chai|试用|动词|质量状态|ลูกค้าขอลองใช้เครื่องก่อนตัดสินใจซื้อ|luuk-khaa khaaw laawng chai khreuuang gaawn dtat-sin-jai sue|顾客决定购买前要求试用机器。|试用
laawng-sai|ลองใส่|laawng sai|试穿|动词|质量状态|ฉันขอลองใส่รองเท้าคู่นี้ก่อนจ่ายเงิน|chan khaaw laawng sai raawng-thaao khuu nii gaawn jaai ngoen|付款前我想试穿这双鞋。|试穿
khun-na-phaap-dii|คุณภาพดี|khun-na-phaap dii|质量好|形容词|质量状态|ถึงราคาไม่ถูกมาก แต่คุณภาพดีและใช้ได้นาน|thueng raa-khaa mai thuuk maak dtaae khun-na-phaap dii lae chai dai naan|虽然价格不算很便宜，但质量好，可以用很久。|质量
khun-na-phaap-mai-dii|คุณภาพไม่ดี|khun-na-phaap mai dii|质量不好|形容词|质量状态|ถ้าคุณภาพไม่ดี ฉันอยากเปลี่ยนสินค้า|thaa khun-na-phaap mai dii chan yaak bpliian sin-khaa|如果质量不好，我想换货。|质量
khaawng-mai|ของใหม่|khaawng mai|新东西；新品|名词|质量状态|ร้านนี้ขายของใหม่ ไม่ใช่ของมือสอง|raan nii khaai khaawng mai mai chai khaawng mue saawng|这家店卖新品，不是二手货。|状态
khaawng-mue-saawng|ของมือสอง|khaawng mue saawng|二手货|名词|质量状态|ของมือสองราคาถูกกว่า แต่ต้องดูสภาพให้ดี|khaawng mue saawng raa-khaa thuuk gwaa dtaae dtawng duu sa-phaap hai dii|二手货更便宜，但要好好看状态。|状态
saphap-dii|สภาพดี|sa-phaap dii|状态好|形容词|质量状态|จักรยานมือสองคันนี้สภาพดีและไม่มีรอยใหญ่|jak-gra-yaan mue saawng khan nii sa-phaap dii lae mai mii raawy yai|这辆二手自行车状态好，没有大划痕。|质量
mii-rawy|มีรอย|mii raawy|有痕迹；有划痕|短语|质量状态|กล่องสินค้ามีรอยนิดหน่อย แต่ของข้างในไม่เสีย|glaawng sin-khaa mii raawy nit naawy dtaae khaawng khaang nai mai siia|商品盒子有一点痕迹，但里面的东西没坏。|质量
khaawng-sia|ของเสีย|khaawng siia|坏货；坏了的东西|名词|质量状态|ถ้าได้ของเสีย ให้ถ่ายรูปแล้วติดต่อร้านทันที|thaa dai khaawng siia hai thaai ruup laaeo dtit-dtaaw raan than-thii|如果收到坏货，请拍照后马上联系店家。|质量
chai-dai-dii|ใช้ได้ดี|chai dai dii|好用|形容词|质量状态|พัดลมตัวนี้ใช้ได้ดีและเสียงไม่ดัง|phat-lom dtua nii chai dai dii lae siiang mai dang|这个风扇好用，声音也不大。|质量
chai-mai-dai|ใช้ไม่ได้|chai mai dai|不能用|形容词|质量状态|สายชาร์จที่ซื้อมาใช้ไม่ได้กับโทรศัพท์ของฉัน|saai chaat thii sue maa chai mai dai gap thoo-ra-sap khaawng chan|买来的充电线不能用于我的手机。|质量
prakan-raan|ประกันร้าน|bpra-gan raan|店铺保修|名词|订购售后|สินค้าชิ้นนี้มีประกันร้านเจ็ดวัน|sin-khaa chin nii mii bpra-gan raan jet wan|这件商品有七天店铺保修。|售后
mii-prakan|มีประกัน|mii bpra-gan|有保修|短语|订购售后|ถ้ามีประกัน ฉันจะเก็บใบเสร็จไว้|thaa mii bpra-gan chan ja gep bai-set wai|如果有保修，我会把收据收好。|售后
mai-mii-prakan|ไม่มีประกัน|mai mii bpra-gan|没有保修|短语|订购售后|ของลดราคาชิ้นนี้ไม่มีประกันและคืนไม่ได้|khaawng lot raa-khaa chin nii mai mii bpra-gan lae khuen mai dai|这件打折商品没有保修，也不能退。|售后
bplian-sin-khaa|เปลี่ยนสินค้า|bpliian sin-khaa|换货|动词|订购售后|ถ้าไซซ์ไม่พอดี สามารถเปลี่ยนสินค้าได้ภายในเจ็ดวัน|thaa sai mai phaaw-dii saa-maat bpliian sin-khaa dai phaai-nai jet wan|如果尺码不合适，可以在七天内换货。|售后
khuen-sin-khaa|คืนสินค้า|khuen sin-khaa|退货|动词|订购售后|ลูกค้าต้องคืนสินค้าพร้อมใบเสร็จเดิม|luuk-khaa dtawng khuen sin-khaa phraawm bai-set doem|顾客退货时要带原收据。|售后
khaaw-khuen-ngoen|ขอคืนเงิน|khaaw khuen ngoen|申请退款|动词|订购售后|ของมาผิดสี ฉันจึงขอคืนเงินแทนเปลี่ยนสินค้า|khaawng maa phit sii chan jeung khaaw khuen ngoen thaaen bpliian sin-khaa|东西颜色发错了，所以我申请退款而不是换货。|售后
khuen-ngoen|คืนเงิน|khuen ngoen|退款|动词|订购售后|ร้านจะคืนเงินเข้าบัญชีภายในสามวัน|raan ja khuen ngoen khao ban-chii phaai-nai saam wan|店家会在三天内退款到账户。|售后
rab-khuen|รับคืน|rap khuen|接受退回|动词|订购售后|ร้านรับคืนเฉพาะสินค้าที่ไม่ผ่านการใช้|raan rap khuen cha-phaw sin-khaa thii mai phaan gaan chai|店家只接受未使用商品退回。|售后
mai-rab-khuen|ไม่รับคืน|mai rap khuen|不接受退货|短语|订购售后|ของชิ้นเล็กแบบนี้ไม่รับคืนหลังเปิดใช้แล้ว|khaawng chin lek baep nii mai rap khuen lang bpoet chai laaeo|这种小商品打开使用后不接受退货。|售后
jaawng-sin-khaa|จองสินค้า|jaawng sin-khaa|预订商品|动词|订购售后|ฉันอยากจองสินค้าสีดำไว้หนึ่งชิ้น|chan yaak jaawng sin-khaa sii dam wai neung chin|我想预订一件黑色商品。|订购
sang-sue|สั่งซื้อ|sang sue|下单购买|动词|订购售后|ฉันสั่งซื้อรองเท้าผ่านแอปเมื่อวาน|chan sang sue raawng-thaao phaan aaep muea-waan|我昨天通过应用下单买鞋。|订购
kham-sang-sue|คำสั่งซื้อ|kham-sang-sue|订单|名词|订购售后|คำสั่งซื้อของฉันยังไม่ถูกจัดส่ง|kham-sang-sue khaawng chan yang mai thuuk jat song|我的订单还没有发货。|订单
lek-kham-sang-sue|เลขคำสั่งซื้อ|leek kham-sang-sue|订单号|名词|订购售后|กรุณาส่งเลขคำสั่งซื้อให้พนักงานตรวจสอบ|ga-ru-naa song leek kham-sang-sue hai pha-nak-ngaan dtruat-saawp|请把订单号发给工作人员查询。|订单
yuen-yan-kham-sang-sue|ยืนยันคำสั่งซื้อ|yuen-yan kham-sang-sue|确认订单|动词|订购售后|หลังยืนยันคำสั่งซื้อแล้ว จะเปลี่ยนที่อยู่ไม่ได้|lang yuen-yan kham-sang-sue laaeo ja bpliian thii-yuu mai dai|确认订单后就不能改地址。|订单
yok-loek-kham-sang-sue|ยกเลิกคำสั่งซื้อ|yok-loek kham-sang-sue|取消订单|动词|订购售后|ฉันขอยกเลิกคำสั่งซื้อเพราะเลือกไซซ์ผิด|chan khaaw yok-loek kham-sang-sue phraw leuuak sai phit|我想取消订单，因为选错尺码了。|订单
tham-raai-gaan|ทำรายการ|tham raai-gaan|办理交易；操作订单|动词|订购售后|ระบบกำลังทำรายการ กรุณาอย่าปิดหน้าแอป|ra-bop gam-lang tham raai-gaan ga-ru-naa yaa bpit naa aaep|系统正在处理交易，请不要关闭应用页面。|订单
tham-raai-gaan-samret|ทำรายการสำเร็จ|tham raai-gaan sam-ret|交易成功；操作成功|短语|订购售后|เมื่อทำรายการสำเร็จ ร้านจะส่งข้อความยืนยัน|muea tham raai-gaan sam-ret raan ja song khaaw-khwaam yuen-yan|交易成功后，店家会发送确认消息。|订单
tham-raai-gaan-mai-samret|ทำรายการไม่สำเร็จ|tham raai-gaan mai sam-ret|交易不成功|短语|订购售后|ถ้าทำรายการไม่สำเร็จ เงินจะไม่ถูกหัก|thaa tham raai-gaan mai sam-ret ngoen ja mai thuuk hak|如果交易不成功，钱不会被扣。|订单
phrii-aaw-dooe|พรีออเดอร์|phrii-aaw-dooe|预购|名词|订购售后|สินค้าพรีออเดอร์ต้องรอประมาณสองสัปดาห์|sin-khaa phrii-aaw-dooe dtawng raaw bpra-maan saawng sap-daa|预购商品需要等大约两周。|订购
raw-khaawng|รอของ|raaw khaawng|等货|动词|库存规格|ถ้ารอของได้ ร้านจะโทรแจ้งเมื่อสินค้ามาถึง|thaa raaw khaawng dai raan ja thoo jaaeng muea sin-khaa maa thueng|如果可以等货，商品到时店家会电话通知。|库存
khaawng-ma-thueng|ของมาถึง|khaawng maa thueng|货到了|短语|送货取货|เมื่อของมาถึง ร้านจะส่งข้อความบอกลูกค้า|muea khaawng maa thueng raan ja song khaaw-khwaam baawk luuk-khaa|货到时，店家会发消息告诉顾客。|送货
rap-khaawng-eeng|รับของเอง|rap khaawng eeng|自取|动词|送货取货|ฉันจะรับของเองที่ร้านตอนเย็นหลังเลิกงาน|chan ja rap khaawng eeng thii raan dtaawn yen lang loek ngaan|我下班后傍晚会到店自取。|取货
song-hai-thueng-baan|ส่งให้ถึงบ้าน|song hai thueng baan|送到家|动词|送货取货|ถ้าซื้อโต๊ะตัวนี้ ร้านส่งให้ถึงบ้านไหม|thaa sue dto dtua nii raan song hai thueng baan mai|如果买这张桌子，店家送到家吗？|送货
song-duan|ส่งด่วน|song duan|快速配送|动词|送货取货|ฉันต้องการส่งด่วน เพราะจะใช้ของพรุ่งนี้เช้า|chan dtawng-gaan song duan phraw ja chai khaawng phrung-nii chaao|我需要快速配送，因为明天早上要用。|送货
song-thammadaa|ส่งธรรมดา|song tham-ma-daa|普通配送|动词|送货取货|ส่งธรรมดาถูกกว่า แต่ต้องรอสามถึงห้าวัน|song tham-ma-daa thuuk gwaa dtaae dtawng raaw saam thueng haa wan|普通配送更便宜，但要等三到五天。|送货
lek-phat-sa-du|เลขพัสดุ|leek phat-sa-du|快递单号|名词|送货取货|ร้านส่งเลขพัสดุให้ฉันหลังจัดส่งแล้ว|raan song leek phat-sa-du hai chan lang jat song laaeo|店家发货后把快递单号发给我。|快递
dtit-dtaam-phat-sa-du|ติดตามพัสดุ|dtit-dtaam phat-sa-du|追踪包裹|动词|送货取货|ฉันใช้เลขพัสดุติดตามพัสดุในแอป|chan chai leek phat-sa-du dtit-dtaam phat-sa-du nai aaep|我用快递单号在应用里追踪包裹。|快递
phat-sa-du-thueng-laaeo|พัสดุถึงแล้ว|phat-sa-du thueng laaeo|包裹到了|短语|送货取货|แอปแจ้งว่าพัสดุถึงแล้วที่หน้าบ้าน|aaep jaaeng waa phat-sa-du thueng laaeo thii naa baan|应用提示包裹已经到家门口了。|快递
phat-sa-du-yaang-mai-thueng|พัสดุยังไม่ถึง|phat-sa-du yang mai thueng|包裹还没到|短语|送货取货|พัสดุยังไม่ถึง ทั้งที่เลยกำหนดส่งแล้ว|phat-sa-du yang mai thueng thang-thii loei gam-not song laaeo|包裹还没到，虽然已经过了预计送达时间。|快递
ho-khaawng|ห่อของ|haaw khaawng|包东西|动词|包装袋装|ช่วยห่อของให้แน่นหน่อย เพราะต้องส่งไปต่างจังหวัด|chuai haaw khaawng hai naaen naawy phraw dtawng song bpai dtaang jang-wat|请把东西包紧一点，因为要寄到外府。|包装
ho-khwaan|ห่อของขวัญ|haaw khaawng-khwan|包装礼物|动词|包装袋装|ร้านนี้ห่อของขวัญฟรีถ้าซื้อครบสามร้อยบาท|raan nii haaw khaawng-khwan frii thaa sue khrop saam raawy baat|这家店买满三百泰铢免费包装礼物。|包装
sai-thung|ใส่ถุง|sai thung|装袋|动词|包装袋装|ช่วยใส่ถุงผ้าให้หน่อย ไม่เอาถุงพลาสติก|chuai sai thung phaa hai naawy mai ao thung phlaat-sa-dtik|请装进布袋，不要塑料袋。|包装
thung-phlaat-sa-dtik|ถุงพลาสติก|thung phlaat-sa-dtik|塑料袋|名词|包装袋装|ถุงพลาสติกใบเล็กคิดเงินเพิ่มหนึ่งบาท|thung phlaat-sa-dtik bai lek khit ngoen phoem neung baat|小塑料袋额外收一泰铢。|包装
thung-phaa|ถุงผ้า|thung phaa|布袋|名词|包装袋装|ฉันพกถุงผ้าไปตลาดเพื่อลดขยะ|chan phok thung phaa bpai dta-laat phuea lot kha-ya|我带布袋去市场，为了减少垃圾。|包装
glaawng-phat-sa-du|กล่องพัสดุ|glaawng phat-sa-du|快递箱|名词|包装袋装|กล่องพัสดุบุบเล็กน้อยแต่ของข้างในไม่เสีย|glaawng phat-sa-du bup lek naawy dtaae khaawng khaang nai mai siia|快递箱有点凹，但里面的东西没坏。|包装
gan-gra-thaek|กันกระแทก|gan gra-thaaek|防震；防撞包装|动词|包装袋装|ของแก้วต้องใส่กันกระแทกก่อนส่ง|khaawng gaaeo dtawng sai gan gra-thaaek gaawn song|玻璃制品寄出前要放防震包装。|包装
thaep-gaao|เทปกาว|theep gaao|胶带|名词|包装袋装|ใช้เทปกาวปิดกล่องให้แน่นก่อนส่งพัสดุ|chai theep gaao bpit glaawng hai naaen gaawn song phat-sa-du|寄包裹前用胶带把箱子封紧。|包装
bpit-glaawng|ปิดกล่อง|bpit glaawng|封箱|动词|包装袋装|ก่อนปิดกล่อง อย่าลืมใส่ใบเสร็จข้างใน|gaawn bpit glaawng yaa luem sai bai-set khaang nai|封箱前，别忘了把收据放进去。|包装
bpoet-glaawng|เปิดกล่อง|bpoet glaawng|开箱|动词|包装袋装|เมื่อเปิดกล่องแล้ว ควรถ่ายวิดีโอไว้ถ้าของเสีย|muea bpoet glaawng laaeo khuuan thaai wi-dii-oo wai thaa khaawng siia|开箱时，如果东西坏了应该拍视频留存。|包装
`;

export const VOCABULARY_EXPANSION_A2_BUYING_SELLING_BASICS_01: VocabularyExpansionA2BuyingSellingBasicsCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
