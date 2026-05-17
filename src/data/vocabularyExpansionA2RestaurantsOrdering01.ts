type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "餐厅入座" | "菜单点餐" | "口味要求" | "过敏忌口" | "加减配料" | "上菜服务" | "结账付款" | "打包外带";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2RestaurantsOrderingCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-restaurant-ordering-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2RestaurantsOrderingCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于餐厅点餐、服务沟通或结账外带场景。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，在餐厅里要按点餐步骤和服务需求区分。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["餐厅沟通中可加 ครับ/ค่ะ/หน่อย/ได้ไหม 让语气更礼貌。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
to-samrap-song-khon|โต๊ะสำหรับสองคน|dto sam-rap saawng khon|两人桌|短语|餐厅入座|ขอโต๊ะสำหรับสองคนใกล้หน้าต่างได้ไหมคะ|khaaw dto sam-rap saawng khon glai naa-dtaang dai mai kha|请问可以给我们靠窗的两人桌吗？|入座
to-rim-naa-dtaang|โต๊ะริมหน้าต่าง|dto rim naa-dtaang|靠窗桌|名词|餐厅入座|ถ้ามีโต๊ะริมหน้าต่าง เราอยากนั่งตรงนั้น|thaa mii dto rim naa-dtaang rao yaak nang dtrong nan|如果有靠窗桌，我们想坐那里。|入座
to-waang|โต๊ะว่าง|dto waang|空桌|名词|餐厅入座|ตอนนี้มีโต๊ะว่างไหม พวกเรายังไม่ได้จอง|dtaawn-nii mii dto waang mai phuak rao yang mai dai jaawng|现在有空桌吗？我们还没有预订。|入座
jaawng-to|จองโต๊ะ|jaawng dto|订桌|动词|餐厅入座|ฉันโทรจองโต๊ะตอนหกโมงเย็นสำหรับครอบครัว|chan thoo jaawng dto dtaawn hok moong yen sam-rap khraawp-khruua|我打电话为家人订了晚上六点的桌。|预订
mii-jaawng-wai|มีจองไว้|mii jaawng wai|有预订|短语|餐厅入座|เรามีจองไว้ชื่อหลี่ตอนหนึ่งทุ่มค่ะ|rao mii jaawng wai chue lii dtaawn neung thum kha|我们以李的名字预订了晚上七点。|预订
mai-dai-jaawng|ไม่ได้จอง|mai dai jaawng|没有预订|短语|餐厅入座|เราไม่ได้จอง แต่รอคิวได้ถ้าไม่นานมาก|rao mai dai jaawng dtaae raaw khiu dai thaa mai naan maak|我们没有预订，但如果不太久可以排队。|预订
raaw-khiu-raan|รอคิวร้าน|raaw khiu raan|在餐厅排队等位|动词|餐厅入座|ร้านนี้คนเยอะ เราต้องรอคิวร้านประมาณยี่สิบนาที|raan nii khon yoe rao dtawng raaw khiu raan bpra-maan yii-sip naa-thii|这家店人多，我们要等位大约二十分钟。|排队
khiu-thao-rai|คิวเท่าไร|khiu thao-rai|排到几号；等位号码多少|短语|餐厅入座|ขอโทษค่ะ ตอนนี้คิวเท่าไรแล้วคะ|khaaw-thoot kha dtaawn-nii khiu thao-rai laaeo kha|不好意思，请问现在排到几号了？|排队
nang-dtrong-nii|นั่งตรงนี้|nang dtrong nii|坐这里|动词|餐厅入座|เรานั่งตรงนี้ได้ไหม หรือโต๊ะนี้มีคนจองแล้ว|rao nang dtrong nii dai mai rue dto nii mii khon jaawng laaeo|我们可以坐这里吗？还是这桌已经有人订了？|入座
yaai-to|ย้ายโต๊ะ|yaai dto|换桌|动词|餐厅入座|โต๊ะนี้ใกล้ครัวเกินไป เราขอย้ายโต๊ะได้ไหม|dto nii glai khruua goen bpai rao khaaw yaai dto dai mai|这桌离厨房太近，我们可以换桌吗？|入座
menu-ruup|เมนูรูปภาพ|mee-nuu ruup-phaap|图片菜单|名词|菜单点餐|มีเมนูรูปภาพไหม ฉันอ่านชื่ออาหารไทยยังไม่เก่ง|mii mee-nuu ruup-phaap mai chan aan chue aa-haan thai yang mai geng|有图片菜单吗？我读泰国菜名还不太熟。|菜单
menu-phaa-saa-jiin|เมนูภาษาจีน|mee-nuu phaa-saa jiin|中文菜单|名词|菜单点餐|ถ้ามีเมนูภาษาจีน ช่วยเอามาให้หน่อยค่ะ|thaa mii mee-nuu phaa-saa jiin chuai ao maa hai naawy kha|如果有中文菜单，请拿给我一下。|菜单
duu-menu-gaawn|ดูเมนูก่อน|duu mee-nuu gaawn|先看菜单|动词|菜单点餐|ขอดูเมนูก่อนสักครู่ แล้วค่อยสั่งอาหาร|khaaw duu mee-nuu gaawn sak khruu laaeo khaawy sang aa-haan|请让我先看一会儿菜单，然后再点菜。|菜单
naenam-menu|แนะนำเมนู|nae-nam mee-nuu|推荐菜品|动词|菜单点餐|ช่วยแนะนำเมนูที่ไม่เผ็ดมากให้หน่อยได้ไหม|chuai nae-nam mee-nuu thii mai phet maak hai naawy dai mai|可以帮我推荐不太辣的菜吗？|推荐
menu-khaai-dii|เมนูขายดี|mee-nuu khaai dii|畅销菜|名词|菜单点餐|เมนูขายดีของร้านนี้คือข้าวหมูทอดกับชาเย็น|mee-nuu khaai dii khaawng raan nii khue khaao muu thaawt gap chaa yen|这家店的畅销菜是炸猪肉饭和冰奶茶。|推荐
menu-wan-nii|เมนูวันนี้|mee-nuu wan-nii|今日菜品|名词|菜单点餐|เมนูวันนี้มีแกงจืดเต้าหู้และปลาทอด|mee-nuu wan-nii mii gaaeng jeut dtao-huu lae bplaa thaawt|今日菜品有豆腐清汤和炸鱼。|菜单
raan-naenam|ร้านแนะนำ|raan nae-nam|店家推荐|名词|菜单点餐|จานไหนเป็นร้านแนะนำสำหรับคนกินเผ็ดไม่เก่ง|jaan nai bpen raan nae-nam sam-rap khon gin phet mai geng|哪道是店家推荐给不太能吃辣的人的？|推荐
aan-menu-mai-ok|อ่านเมนูไม่ออก|aan mee-nuu mai aawk|看不懂菜单|短语|菜单点餐|ฉันอ่านเมนูไม่ออก ช่วยบอกว่าจานนี้มีอะไรบ้าง|chan aan mee-nuu mai aawk chuai baawk waa jaan nii mii a-rai baang|我看不懂菜单，请告诉我这道菜里有什么。|菜单
sang-aa-haan|สั่งอาหาร|sang aa-haan|点菜|动词|菜单点餐|เราพร้อมสั่งอาหารแล้ว ขอเรียกพนักงานได้ไหม|rao phraawm sang aa-haan laaeo khaaw riiak pha-nak-ngaan dai mai|我们准备好点菜了，可以叫服务员吗？|点餐
sang-khruueang-duuem|สั่งเครื่องดื่ม|sang khreuuang duem|点饮料|动词|菜单点餐|ก่อนอาหารมา เราขอสั่งเครื่องดื่มสองแก้ว|gaawn aa-haan maa rao khaaw sang khreuuang duem saawng gaaeo|上菜前，我们想点两杯饮料。|点餐
ao-an-nii|เอาอันนี้|ao an nii|要这个|短语|菜单点餐|ฉันเอาอันนี้หนึ่งจาน และข้าวสวยเพิ่มหนึ่งถ้วย|chan ao an nii neung jaan lae khaao suai phoem neung thuai|我要这个一盘，再加一碗白米饭。|点餐
khaaw-jaan-nii|ขอจานนี้|khaaw jaan nii|请给这道菜|短语|菜单点餐|ขอจานนี้แต่ไม่ใส่พริกนะคะ|khaaw jaan nii dtaae mai sai phrik na kha|请给我这道菜，但不要放辣椒。|点餐
neung-jaan|หนึ่งจาน|neung jaan|一盘|短语|菜单点餐|ข้าวผัดไก่หนึ่งจานกับน้ำเปล่าสองแก้วค่ะ|khaao phat gai neung jaan gap naam bplao saawng gaaeo kha|一盘鸡肉炒饭和两杯白水。|数量
saawng-thuai|สองถ้วย|saawng thuai|两碗；两杯|短语|菜单点餐|ขอซุปไก่สองถ้วยสำหรับเด็ก ๆ ครับ|khaaw sup gai saawng thuai sam-rap dek dek khrap|请给孩子们两碗鸡汤。|数量
phoem-khaao|เพิ่มข้าว|phoem khaao|加饭|动词|加减配料|ถ้าข้าวไม่พอ เราขอเพิ่มข้าวอีกหนึ่งถ้วยได้ไหม|thaa khaao mai phaaw rao khaaw phoem khaao iik neung thuai dai mai|如果饭不够，我们可以再加一碗饭吗？|加配料
phoem-khai-daao|เพิ่มไข่ดาว|phoem khai daao|加煎蛋|动词|加减配料|ข้าวกะเพราจานนี้ขอเพิ่มไข่ดาวหนึ่งฟอง|khaao ga-phrao jaan nii khaaw phoem khai daao neung faawng|这盘打抛饭请加一个煎蛋。|加配料
phoem-phak|เพิ่มผัก|phoem phak|加蔬菜|动词|加减配料|ฉันอยากเพิ่มผักในก๋วยเตี๋ยวให้เยอะหน่อย|chan yaak phoem phak nai guai-dtiaao hai yoe naawy|我想在面里多加一点蔬菜。|加配料
phoem-nam-jim|เพิ่มน้ำจิ้ม|phoem naam-jim|加蘸酱|动词|加减配料|น้ำจิ้มอร่อยมาก ขอเพิ่มน้ำจิ้มอีกถ้วยได้ไหม|naam-jim a-raawy maak khaaw phoem naam-jim iik thuai dai mai|蘸酱很好吃，可以再加一小碗吗？|加配料
mai-sai-phrik|ไม่ใส่พริก|mai sai phrik|不放辣椒|短语|口味要求|จานของเด็กไม่ใส่พริกนะคะ เขากินเผ็ดไม่ได้|jaan khaawng dek mai sai phrik na kha khao gin phet mai dai|孩子的那盘不要放辣椒，他不能吃辣。|忌口
mai-sai-hawm|ไม่ใส่หอม|mai sai haawm|不放葱蒜类香料|短语|加减配料|ฉันไม่ชอบกลิ่นหอม ขอไม่ใส่หอมได้ไหม|chan mai chaawp glin haawm khaaw mai sai haawm dai mai|我不喜欢葱蒜味，可以不放葱蒜吗？|忌口
mai-sai-phak-chii|ไม่ใส่ผักชี|mai sai phak-chii|不放香菜|短语|加减配料|ก๋วยเตี๋ยวของฉันไม่ใส่ผักชี แต่ใส่ต้นหอมได้|guai-dtiaao khaawng chan mai sai phak-chii dtaae sai dton-haawm dai|我的面不放香菜，但可以放葱。|忌口
mai-sai-nam-dtaan|ไม่ใส่น้ำตาล|mai sai naam-dtaan|不加糖|短语|口味要求|น้ำส้มแก้วนี้ขอไม่ใส่น้ำตาลค่ะ|naam som gaaeo nii khaaw mai sai naam-dtaan kha|这杯橙汁请不要加糖。|口味
waan-naawy|หวานน้อย|waan naawy|少糖|形容词|口味要求|ชาเย็นแก้วนี้ขอหวานน้อยและใส่น้ำแข็งเยอะ|chaa yen gaaeo nii khaaw waan naawy lae sai naam-khaeng yoe|这杯冰奶茶请少糖，多加冰。|口味
mai-waan|ไม่หวาน|mai waan|不甜|形容词|口味要求|ฉันอยากได้กาแฟเย็นไม่หวานเลย|chan yaak dai gaa-faae yen mai waan loei|我想要完全不甜的冰咖啡。|口味
phet-noi|เผ็ดน้อย|phet naawy|少辣|形容词|口味要求|ส้มตำจานนี้ขอเผ็ดน้อย เพราะเพื่อนกินเผ็ดไม่เก่ง|som-dtam jaan nii khaaw phet naawy phraw phuean gin phet mai geng|这盘木瓜沙拉请少辣，因为朋友不太能吃辣。|口味
mai-phet|ไม่เผ็ด|mai phet|不辣|形容词|口味要求|มีเมนูไหนไม่เผ็ดและเหมาะกับเด็กไหม|mii mee-nuu nai mai phet lae maw gap dek mai|有没有不辣、适合孩子的菜？|口味
phet-glang|เผ็ดกลาง|phet glaang|中辣|形容词|口味要求|ถ้าเผ็ดกลางไม่เผ็ดเกินไป ฉันขอลองจานนี้|thaa phet glaang mai phet goen bpai chan khaaw laawng jaan nii|如果中辣不会太辣，我想试这道菜。|口味
khem-noi|เค็มน้อย|khem naawy|少盐；少咸|形容词|口味要求|คุณแม่กินเค็มไม่ได้ ขอทำเค็มน้อยได้ไหม|khun maae gin khem mai dai khaaw tham khem naawy dai mai|我妈妈不能吃咸，可以做少盐吗？|口味
mai-man|ไม่มัน|mai man|不油腻|形容词|口味要求|หลังออกกำลังกาย ฉันอยากกินอะไรที่ไม่มันมาก|lang aawk-gam-lang-gaai chan yaak gin a-rai thii mai man maak|运动后，我想吃不太油腻的东西。|口味
man-noi|มันน้อย|man naawy|少油|形容词|口味要求|ผัดผักจานนี้ขอมันน้อยและใส่กระเทียมนิดหน่อย|phat phak jaan nii khaaw man naawy lae sai gra-thiiam nit naawy|这盘炒菜请少油，放一点蒜。|口味
bpriao-waan|เปรี้ยวหวาน|bpriao waan|酸甜|形容词|口味要求|น้ำจิ้มแบบเปรี้ยวหวานเหมาะกับเด็กมากกว่าแบบเผ็ด|naam-jim baep bpriao waan maw gap dek maak gwaa baep phet|酸甜蘸酱比辣味更适合孩子。|口味
rot-chaat-orn|รสชาติอ่อน|rot-chaat aawn|味道淡|形容词|口味要求|คนป่วยอยากกินอาหารรสชาติอ่อนและไม่เผ็ด|khon bpuai yaak gin aa-haan rot-chaat aawn lae mai phet|病人想吃味道淡、不辣的食物。|口味
rot-chaat-jat|รสชาติจัด|rot-chaat jat|味道重|形容词|口味要求|อาหารใต้หลายอย่างรสชาติจัด ต้องถามก่อนสั่ง|aa-haan dtai laai yaang rot-chaat jat dtawng thaam gaawn sang|很多南部菜味道重，点之前要先问。|口味
phaae-thua|แพ้ถั่ว|phaae thua|坚果/花生过敏|短语|过敏忌口|ฉันแพ้ถั่ว กรุณาอย่าใส่ถั่วในอาหารจานนี้|chan phaae thua ga-ru-naa yaa sai thua nai aa-haan jaan nii|我对坚果过敏，请不要在这道菜里放坚果。|过敏
phaae-aa-haan-tha-lee|แพ้อาหารทะเล|phaae aa-haan tha-lee|海鲜过敏|短语|过敏忌口|เพื่อนฉันแพ้อาหารทะเล จึงสั่งเมนูไก่แทน|phuean chan phaae aa-haan tha-lee jeung sang mee-nuu gai thaaen|我朋友海鲜过敏，所以改点鸡肉菜。|过敏
phaae-nom|แพ้นม|phaae nom|牛奶过敏|短语|过敏忌口|เด็กคนนี้แพ้นม มีเครื่องดื่มที่ไม่ใส่นมไหม|dek khon nii phaae nom mii khreuuang-duem thii mai sai nom mai|这个孩子牛奶过敏，有不加奶的饮料吗？|过敏
phaae-khai|แพ้ไข่|phaae khai|鸡蛋过敏|短语|过敏忌口|ถ้าแพ้ไข่ ไม่ควรสั่งข้าวไข่เจียว|thaa phaae khai mai khuuan sang khaao khai-jiaao|如果鸡蛋过敏，就不应该点煎蛋饭。|过敏
gin-je|กินเจ|gin jee|吃素斋|动词|过敏忌口|ช่วงนี้ฉันกินเจ มีอาหารที่ไม่ใส่เนื้อสัตว์ไหม|chuang nii chan gin jee mii aa-haan thii mai sai nuea-sat mai|这段时间我吃素斋，有不放肉的食物吗？|素食
mang-sa-wi-rat|มังสวิรัติ|mang-sa-wi-rat|素食的；素食者|形容词|过敏忌口|เมนูมังสวิรัติจานนี้มีเต้าหู้และผักหลายอย่าง|mee-nuu mang-sa-wi-rat jaan nii mii dtao-huu lae phak laai yaang|这道素食菜有豆腐和多种蔬菜。|素食
mai-gin-muu|ไม่กินหมู|mai gin muu|不吃猪肉|短语|过敏忌口|ฉันไม่กินหมู ขอเปลี่ยนเป็นไก่ได้ไหม|chan mai gin muu khaaw bpliian bpen gai dai mai|我不吃猪肉，可以换成鸡肉吗？|忌口
mai-gin-nuea|ไม่กินเนื้อ|mai gin nuea|不吃牛肉|短语|过敏忌口|โต๊ะเรามีคนไม่กินเนื้อ ช่วยแยกจานนี้ให้หน่อย|dto rao mii khon mai gin nuea chuai yaaek jaan nii hai naawy|我们这桌有人不吃牛肉，请把这盘分开。|忌口
mai-gin-kung|ไม่กินกุ้ง|mai gin gung|不吃虾|短语|过敏忌口|ฉันไม่กินกุ้ง แต่กินปลาได้|chan mai gin gung dtaae gin bplaa dai|我不吃虾，但可以吃鱼。|忌口
mee-thua-mai|มีถั่วไหม|mii thua mai|有坚果吗|短语|过敏忌口|จานนี้มีถั่วไหม เพราะลูกฉันแพ้ถั่ว|jaan nii mii thua mai phraw luuk chan phaae thua|这道菜有坚果吗？因为我的孩子坚果过敏。|过敏
mee-nom-mai|มีนมไหม|mii nom mai|有牛奶吗|短语|过敏忌口|ขนมนี้มีนมไหม ฉันต้องถามก่อนซื้อ|kha-nom nii mii nom mai chan dtawng thaam gaawn sue|这个点心有牛奶吗？我买之前必须问。|过敏
mee-krueang-prung|มีเครื่องปรุง|mii khreuuang-bprung|有调料|短语|加减配料|บนโต๊ะมีเครื่องปรุงหลายอย่าง เช่น น้ำปลาและพริก|bon dto mii khreuuang-bprung laai yaang chen naam-bplaa lae phrik|桌上有很多调料，比如鱼露和辣椒。|调料
khaaw-nam-plaa|ขอน้ำปลา|khaaw naam-bplaa|要鱼露|短语|加减配料|ขอน้ำปลาหน่อยค่ะ จานนี้ยังจืดนิดหน่อย|khaaw naam-bplaa naawy kha jaan nii yang jeut nit naawy|请给一点鱼露，这道菜还有点淡。|调料
khaaw-phrik-pon|ขอพริกป่น|khaaw phrik bpon|要辣椒粉|短语|加减配料|เพื่อนฉันชอบเผ็ด ขอพริกป่นเพิ่มได้ไหม|phuean chan chaawp phet khaaw phrik bpon phoem dai mai|我朋友喜欢辣，可以再要点辣椒粉吗？|调料
khaaw-manao|ขอมะนาว|khaaw ma-naao|要青柠|短语|加减配料|ก๋วยเตี๋ยวชามนี้ขอมะนาวเพิ่มครึ่งลูก|guai-dtiaao chaam nii khaaw ma-naao phoem khrueng luuk|这碗面请再加半个青柠。|调料
khaaw-nam-khaeng|ขอน้ำแข็ง|khaaw naam-khaeng|要冰块|短语|加减配料|น้ำแก้วนี้ไม่เย็น ขอ น้ำแข็งเพิ่มได้ไหม|naam gaaeo nii mai yen khaaw naam-khaeng phoem dai mai|这杯水不凉，可以加冰块吗？|饮料
mai-sai-nam-khaeng|ไม่ใส่น้ำแข็ง|mai sai naam-khaeng|不加冰|短语|口味要求|กาแฟเย็นของฉันขอไม่ใส่น้ำแข็งเยอะ|gaa-faae yen khaawng chan khaaw mai sai naam-khaeng yoe|我的冰咖啡请不要加太多冰。|饮料
nam-khaeng-noi|น้ำแข็งน้อย|naam-khaeng naawy|少冰|形容词|口味要求|ชาเย็นแก้วนี้ขอน้ำแข็งน้อยและหวานน้อย|chaa yen gaaeo nii khaaw naam-khaeng naawy lae waan naawy|这杯冰奶茶请少冰少糖。|饮料
nam-khaeng-yoe|น้ำแข็งเยอะ|naam-khaeng yoe|多冰|形容词|口味要求|วันนี้ร้อนมาก ฉันขอน้ำส้มใส่น้ำแข็งเยอะ|wan-nii raawn maak chan khaaw naam som sai naam-khaeng yoe|今天很热，我要橙汁多加冰。|饮料
aa-haan-maa-laaeo|อาหารมาแล้ว|aa-haan maa laaeo|菜上来了|短语|上菜服务|อาหารมาแล้ว แต่เรายังไม่ได้ช้อนส้อม|aa-haan maa laaeo dtaae rao yang mai dai chaawn saawm|菜上来了，但我们还没拿到勺叉。|上菜
aa-haan-yang-mai-maa|อาหารยังไม่มา|aa-haan yang mai maa|菜还没上|短语|上菜服务|อาหารยังไม่มาเลย ช่วยเช็กให้หน่อยได้ไหม|aa-haan yang mai maa loei chuai chek hai naawy dai mai|菜还没上，可以帮忙查一下吗？|上菜
chek-aa-haan|เช็กอาหาร|chek aa-haan|查菜；确认菜品|动词|上菜服务|ช่วยเช็กอาหารโต๊ะเราให้หน่อย สั่งไปนานแล้ว|chuai chek aa-haan dto rao hai naawy sang bpai naan laaeo|请帮我们这桌查一下菜，已经点了很久了。|服务
sang-phit|สั่งผิด|sang phit|点错|动词|上菜服务|ขอโทษค่ะ ฉันอาจสั่งผิด ขอเปลี่ยนได้ไหม|khaaw-thoot kha chan aat sang phit khaaw bpliian dai mai|不好意思，我可能点错了，可以换吗？|服务
maa-phit|มาผิด|maa phit|上错了|短语|上菜服务|จานนี้มาผิด โต๊ะเราสั่งก๋วยเตี๋ยวน้ำค่ะ|jaan nii maa phit dto rao sang guai-dtiaao naam kha|这道上错了，我们这桌点的是汤面。|服务
khaat-neung-jaan|ขาดหนึ่งจาน|khaat neung jaan|少了一道菜|短语|上菜服务|อาหารโต๊ะเราขาดหนึ่งจาน คือผัดผักไม่มา|aa-haan dto rao khaat neung jaan khue phat phak mai maa|我们这桌少了一道菜，就是炒菜没上。|服务
jaawng-jaan|จานรอง|jaan raawng|小碟；垫盘|名词|上菜服务|ขอจานรองสำหรับแบ่งอาหารให้เด็กหน่อยค่ะ|khaaw jaan raawng sam-rap baeng aa-haan hai dek naawy kha|请给一个小碟给孩子分菜。|餐具
chaawn-saawm|ช้อนส้อม|chaawn saawm|勺叉|名词|上菜服务|โต๊ะนี้ยังไม่มีช้อนส้อม ช่วยเอามาให้หน่อย|dto nii yang mai mii chaawn saawm chuai ao maa hai naawy|这桌还没有勺叉，请拿来一下。|餐具
dta-giap|ตะเกียบ|dta-giiap|筷子|名词|上菜服务|ขอตะเกียบสองคู่สำหรับก๋วยเตี๋ยวได้ไหม|khaaw dta-giiap saawng khuu sam-rap guai-dtiaao dai mai|可以给两双筷子吃面吗？|餐具
thit-chuu|ทิชชู|thit-chuu|纸巾|名词|上菜服务|ขอทิชชูเพิ่มหน่อยค่ะ น้ำหกบนโต๊ะ|khaaw thit-chuu phoem naawy kha naam hok bon dto|请再给点纸巾，水洒在桌上了。|服务
nam-hok|น้ำหก|naam hok|水洒了|短语|上菜服务|น้ำหกบนพื้น ระวังลื่นนะครับ|naam hok bon phuen ra-wang leuun na khrap|水洒在地上了，小心滑倒。|服务
kep-to|เก็บโต๊ะ|gep dto|收拾桌子|动词|上菜服务|หลังลูกค้ากลับ พนักงานรีบเก็บโต๊ะให้สะอาด|lang luuk-khaa glap pha-nak-ngaan riip gep dto hai sa-aat|客人离开后，服务员赶快把桌子收拾干净。|服务
khaaw-bill|ขอบิล|khaaw bin|要账单|短语|结账付款|ขอบิลได้ไหมคะ เราต้องรีบไปทำงานต่อ|khaaw bin dai mai kha rao dtawng riip bpai tham ngaan dtaaw|可以给账单吗？我们要赶去继续工作。|结账
check-bin|เช็กบิล|chek bin|结账|动词|结账付款|หลังดื่มกาแฟเสร็จ เราเช็กบิลที่เคาน์เตอร์|lang duem gaa-faae set rao chek bin thii khao-dtooe|喝完咖啡后，我们在柜台结账。|结账
bin-to-nii|บิลโต๊ะนี้|bin dto nii|这桌账单|名词|结账付款|บิลโต๊ะนี้รวมเครื่องดื่มแล้วหรือยัง|bin dto nii ruam khreuuang-duem laaeo rue yang|这桌账单已经包含饮料了吗？|结账
jaai-yaek|จ่ายแยก|jaai yaaek|分开付款|动词|结账付款|พวกเราขอจ่ายแยกคนละบิลได้ไหม|phuak rao khaaw jaai yaaek khon la bin dai mai|我们可以分开付款、每人一张账单吗？|付款
jaai-ruam|จ่ายรวม|jaai ruam|合并付款|动词|结账付款|วันนี้ฉันจ่ายรวมก่อน แล้วเพื่อนค่อยโอนให้|wan-nii chan jaai ruam gaawn laaeo phuean khaawy oon hai|今天我先合并付款，然后朋友再转给我。|付款
haan-khaa-aa-haan|หารค่าอาหาร|haan khaa aa-haan|平摊餐费|动词|结账付款|มื้อนี้เราหารค่าอาหารเท่ากันทุกคน|mue nii rao haan khaa aa-haan thao gan thuk khon|这顿饭我们所有人平均分摊餐费。|付款
khon-la-thao-rai|คนละเท่าไร|khon la thao-rai|每人多少钱|短语|结账付款|ถ้าหารกัน คนละเท่าไร ช่วยคิดให้หน่อย|thaa haan gan khon la thao-rai chuai khit hai naawy|如果平摊，每人多少钱？请帮忙算一下。|付款
ruam-khaa-borikaan|รวมค่าบริการ|ruam khaa baaw-ri-gaan|包含服务费|短语|结账付款|ราคานี้รวมค่าบริการแล้วหรือยังคะ|raa-khaa nii ruam khaa baaw-ri-gaan laaeo rue yang kha|这个价格已经包含服务费了吗？|结账
khaa-borikaan|ค่าบริการ|khaa baaw-ri-gaan|服务费|名词|结账付款|ร้านนี้มีค่าบริการสิบเปอร์เซ็นต์ในบิล|raan nii mii khaa baaw-ri-gaan sip bpooe-sen nai bin|这家店账单里有百分之十服务费。|结账
phaa-sii-muun-khaa-phoem|ภาษีมูลค่าเพิ่ม|phaa-sii muun-khaa phoem|增值税|名词|结账付款|ในบิลมีภาษีมูลค่าเพิ่มเจ็ดเปอร์เซ็นต์|nai bin mii phaa-sii muun-khaa phoem jet bpooe-sen|账单里有百分之七增值税。|结账
khaaw-bai-set|ขอใบเสร็จ|khaaw bai-set|要收据|动词|结账付款|หลังจ่ายเงินแล้ว ฉันขอใบเสร็จเก็บไว้|lang jaai ngoen laaeo chan khaaw bai-set gep wai|付款后，我要收据留着。|收据
mai-ao-bai-set|ไม่เอาใบเสร็จ|mai ao bai-set|不要收据|短语|结账付款|ถ้าไม่ต้องใช้ใบเสร็จ คุณบอกว่าไม่เอาใบเสร็จได้|thaa mai dtawng chai bai-set khun baawk waa mai ao bai-set dai|如果不需要收据，你可以说不要收据。|收据
jaai-ngoen-sot|จ่ายเงินสด|jaai ngoen sot|付现金|动词|结账付款|คุณยายจ่ายเงินสดเพราะไม่ใช้แอปธนาคาร|khun yaai jaai ngoen sot phraw mai chai aaep tha-naa-khaan|奶奶付现金，因为不用银行应用。|付款
sa-gaan-jaai|สแกนจ่าย|sa-gaaen jaai|扫码支付|动词|结账付款|โต๊ะเราจะสแกนจ่าย ช่วยเอาคิวอาร์โค้ดมาให้หน่อย|dto rao ja sa-gaaen jaai chuai ao khiu-aa khoot maa hai naawy|我们这桌要扫码支付，请把二维码拿来。|付款
jaai-duai-bat|จ่ายด้วยบัตร|jaai duai bat|用卡付款|动词|结账付款|ร้านนี้จ่ายด้วยบัตรได้ไหม หรือรับเงินสดเท่านั้น|raan nii jaai duai bat dai mai rue rap ngoen sot thao-nan|这家店可以用卡付款吗？还是只收现金？|付款
ngoen-thawn-khrop|เงินทอนครบ|ngoen thaawn khrop|找零齐了|短语|结账付款|ฉันนับเงินทอนแล้ว เงินทอนครบค่ะ|chan nap ngoen thaawn laaeo ngoen thaawn khrop kha|我数了找零，找零齐了。|现金
ngoen-thawn-mai-khrop|เงินทอนไม่ครบ|ngoen thaawn mai khrop|找零不够|短语|结账付款|ขอโทษค่ะ เงินทอนไม่ครบ ขาดไปยี่สิบบาท|khaaw-thoot kha ngoen thaawn mai khrop khaat bpai yii-sip baat|不好意思，找零不够，少了二十泰铢。|现金
ao-glap-baan|เอากลับบ้าน|ao glap baan|带回家|动词|打包外带|อาหารที่เหลือขอเอากลับบ้านได้ไหม|aa-haan thii luea khaaw ao glap baan dai mai|剩下的食物可以打包带回家吗？|打包
khaaw-glong|ขอกล่อง|khaaw glaawng|要盒子|短语|打包外带|ขอกล่องใส่อาหารที่เหลือหนึ่งใบค่ะ|khaaw glaawng sai aa-haan thii luea neung bai kha|请给一个盒子装剩菜。|打包
sai-thung|ใส่ถุง|sai thung|装袋|动词|打包外带|ช่วยใส่ถุงแยกน้ำซุปกับเส้นให้หน่อย|chuai sai thung yaaek naam sup gap sen hai naawy|请帮忙把汤和面分开装袋。|打包
yaaek-nam-sup|แยกน้ำซุป|yaaek naam sup|汤分开装|动词|打包外带|ก๋วยเตี๋ยวกลับบ้านขอแยกน้ำซุปนะคะ|guai-dtiaao glap baan khaaw yaaek naam sup na kha|外带面请把汤分开装。|打包
yaaek-nam-jim|แยกน้ำจิ้ม|yaaek naam-jim|蘸酱分开装|动词|打包外带|หมูย่างจานนี้ขอแยกน้ำจิ้มใส่ถุงเล็ก|muu yaang jaan nii khaaw yaaek naam-jim sai thung lek|这盘烤猪肉请把蘸酱分开装小袋。|打包
kin-thii-raan|กินที่ร้าน|gin thii raan|堂食|动词|打包外带|วันนี้เรากินที่ร้าน ไม่ต้องใส่กล่อง|wan-nii rao gin thii raan mai dtawng sai glaawng|今天我们堂食，不用装盒。|堂食
glap-baan|กลับบ้าน|glap baan|外带回家|短语|打包外带|ข้าวผัดสองกล่องกลับบ้าน รอประมาณกี่นาที|khaao phat saawng glaawng glap baan raaw bpra-maan gii naa-thii|两盒炒饭外带回家，大概要等几分钟？|外带
rab-ao-eeng|รับเอาเอง|rap ao eeng|自取|动词|打包外带|ฉันสั่งอาหารทางโทรศัพท์และจะไปรับเอาเอง|chan sang aa-haan thaang thoo-ra-sap lae ja bpai rap ao eeng|我通过电话点餐，会自己去取。|外带
song-aa-haan|ส่งอาหาร|song aa-haan|送餐|动词|打包外带|ร้านนี้ส่งอาหารถึงบ้านถ้าอยู่ไม่ไกลมาก|raan nii song aa-haan thueng baan thaa yuu mai glai maak|这家店如果住得不太远，可以送餐到家。|外送
khaa-song|ค่าส่ง|khaa song|配送费|名词|打包外带|ถ้าสั่งไม่ถึงสองร้อยบาท ต้องจ่ายค่าส่งเพิ่ม|thaa sang mai thueng saawng raawy baat dtawng jaai khaa song phoem|如果点不到两百泰铢，要额外付配送费。|外送
aa-haan-luea|อาหารเหลือ|aa-haan luea|剩菜；剩下的食物|名词|打包外带|อาหารเหลือเยอะมาก เราควรเอากลับบ้าน|aa-haan luea yoe maak rao khuuan ao glap baan|剩菜很多，我们应该打包回家。|打包
raw-naan|รอนาน|raaw naan|等很久|动词|上菜服务|วันนี้คนเยอะมาก เราอาจต้องรอนานหน่อย|wan-nii khon yoe maak rao aat dtawng raaw naan naawy|今天人很多，我们可能要等久一点。|服务
raw-mai-naan|รอไม่นาน|raaw mai naan|等不久|动词|上菜服务|อาหารจานเดียวรอไม่นาน ประมาณสิบนาที|aa-haan jaan diao raaw mai naan bpra-maan sip naa-thii|盖饭等不久，大约十分钟。|服务
tham-reo|ทำเร็ว|tham reo|做得快|动词|上菜服务|ถ้ารีบไปเรียน มีเมนูไหนทำเร็วไหม|thaa riip bpai riian mii mee-nuu nai tham reo mai|如果赶着去上课，有什么做得快的菜吗？|服务
tham-nan|ทำนาน|tham naan|做得久|动词|上菜服务|เมนูนี้ทำนานประมาณครึ่งชั่วโมง คุณรอได้ไหม|mee-nuu nii tham naan bpra-maan khrueng chua-moong khun raaw dai mai|这道菜要做大约半小时，你能等吗？|服务
riip-noi|รีบหน่อย|riip naawy|请快一点|短语|服务沟通|ช่วยรีบหน่อยได้ไหม เราต้องไปขึ้นรถ|chuai riip naawy dai mai rao dtawng bpai kheun rot|可以请快一点吗？我们要去坐车。|服务
mai-riip|ไม่รีบ|mai riip|不急|短语|服务沟通|เราไม่รีบ ทำตามคิวได้เลยค่ะ|rao mai riip tham dtaam khiu dai loei kha|我们不急，按顺序做就可以。|服务
riiak-pha-nak-ngaan|เรียกพนักงาน|riiak pha-nak-ngaan|叫服务员|动词|服务沟通|ถ้าต้องการน้ำเพิ่ม ให้เรียกพนักงานได้เลย|thaa dtawng-gaan naam phoem hai riiak pha-nak-ngaan dai loei|如果需要加水，可以直接叫服务员。|服务
pha-nak-ngaan-waan|พนักงานว่าง|pha-nak-ngaan waang|服务员有空|短语|服务沟通|ตอนพนักงานว่าง ช่วยขอบิลให้ฉันหน่อย|dtaawn pha-nak-ngaan waang chuai khaaw bin hai chan naawy|服务员有空时，请帮我叫账单。|服务
khaw-thoot-raan|ขอโทษร้าน|khaaw-thoot raan|向店家道歉；不好意思|短语|服务沟通|ขอโทษค่ะ ฉันทำแก้วตกโดยไม่ตั้งใจ|khaaw-thoot kha chan tham gaaeo dtok dooi mai dtang-jai|不好意思，我不是故意把杯子弄掉的。|礼貌
khawp-khun-borikaan|ขอบคุณบริการ|khaawp-khun baaw-ri-gaan|感谢服务|短语|服务沟通|อาหารอร่อยมาก ขอบคุณบริการดี ๆ นะคะ|aa-haan a-raawy maak khaawp-khun baaw-ri-gaan dii dii na kha|饭菜很好吃，谢谢你们好的服务。|礼貌
`;

export const VOCABULARY_EXPANSION_A2_RESTAURANTS_ORDERING_01: VocabularyExpansionA2RestaurantsOrderingCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
