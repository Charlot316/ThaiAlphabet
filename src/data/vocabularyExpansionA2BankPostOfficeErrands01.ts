type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "银行柜台" | "转账汇款" | "账户卡片" | "邮局寄件" | "取件追踪" | "地址资料" | "排队办事" | "费用收据";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2BankPostOfficeErrandsCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-bank-post-office-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2BankPostOfficeErrandsCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于银行、邮局和日常办事流程，适合和时间、号码、费用或地址一起说。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，办事时要分清排队、资料、费用和动作。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["在柜台或邮局说话时，可加 ขอ、ช่วย、หน่อยครับ/ค่ะ 让语气更礼貌。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
khao-thaeo-thii-thanaakhaan|เข้าแถวที่ธนาคาร|khao thaeo thii tha-naa-khaan|在银行排队|动词|排队办事|เช้านี้คนเยอะ ฉันต้องเข้าแถวที่ธนาคารเกือบยี่สิบนาที|chaao-nii khon yoe chan dtawng khao thaeo thii tha-naa-khaan geuap yii-sip naa-thii|今天早上人很多，我得在银行排队将近二十分钟。|排队
kot-bat-khiu|กดบัตรคิว|got bat khiu|按号取票|动词|排队办事|พอเข้าธนาคารแล้ว เราต้องกดบัตรคิวก่อนนั่งรอ|phaaw khao tha-naa-khaan laeo rao dtawng got bat khiu gaawn nang raaw|进银行以后，我们要先按号取票再坐下等。|排队
rap-bat-khiu|รับบัตรคิว|rap bat khiu|领取号码票|动词|排队办事|คุณยายรับบัตรคิวแล้วถามพนักงานว่าต้องไปช่องไหน|khun yaai rap bat khiu laeo thaam pha-nak-ngaan waa dtawng bpai chaawng nai|奶奶领了号码票，然后问工作人员要去哪个窗口。|排队
maai-lek-khiu|หมายเลขคิว|maai-lek khiu|排队号码|名词|排队办事|หมายเลขคิวของฉันคือสิบห้า ยังต้องรออีกนาน|maai-lek khiu khaawng chan kheu sip-haa yang dtawng raaw iik naan|我的排队号码是十五，还要再等很久。|号码
riiak-khiu|เรียกคิว|riiak khiu|叫号|动词|排队办事|เมื่อเจ้าหน้าที่เรียกคิว กรุณาไปที่เคาน์เตอร์ทันที|meua jao-naa-thii riiak khiu ga-ru-naa bpai thii khao-dter than-thii|工作人员叫号时，请马上去柜台。|叫号
loei-khiu|เลยคิว|loei khiu|过号|动词|排队办事|ฉันไปเข้าห้องน้ำนาน เลยคิวของฉันไปแล้ว|chan bpai khao haawng-naam naan loei khiu khaawng chan bpai laeo|我去洗手间太久，已经过号了。|叫号
chong-bo-ri-gaan|ช่องบริการ|chaawng baaw-ri-gaan|服务窗口|名词|银行柜台|ช่องบริการหมายเลขสามรับฝากเงินและถอนเงินสด|chaawng baaw-ri-gaan maai-lek saam rap faak ngoen lae thaawn ngoen sot|三号服务窗口办理存现金和取现金。|柜台
khao-dter-thanaakhaan|เคาน์เตอร์ธนาคาร|khao-dter tha-naa-khaan|银行柜台|名词|银行柜台|กรุณาเอาเอกสารทั้งหมดไปยื่นที่เคาน์เตอร์ธนาคาร|ga-ru-naa ao eek-ga-saan thang-mot bpai yeun thii khao-dter tha-naa-khaan|请把全部资料拿到银行柜台提交。|柜台
pha-nak-ngaan-thanaakhaan|พนักงานธนาคาร|pha-nak-ngaan tha-naa-khaan|银行职员|名词|银行柜台|พนักงานธนาคารอธิบายขั้นตอนเปิดบัญชีให้ฉันฟังช้า ๆ|pha-nak-ngaan tha-naa-khaan a-thi-baai khan-dtaawn bpoet ban-chii hai chan fang chaa chaa|银行职员慢慢给我说明开户步骤。|柜台
yeun-ek-ga-saan|ยื่นเอกสาร|yeun eek-ga-saan|提交文件|动词|银行柜台|ก่อนเซ็นชื่อ ลูกค้าต้องยื่นเอกสารให้เจ้าหน้าที่ตรวจ|gaawn sen cheu luuk-khaa dtawng yeun eek-ga-saan hai jao-naa-thii dtruat|签名前，客户要把文件交给工作人员检查。|资料
yeun-bat-pra-chaa-chon|ยื่นบัตรประชาชน|yeun bat bpra-chaa-chon|出示身份证|动词|银行柜台|เวลาถอนเงินจำนวนมาก คุณต้องยื่นบัตรประชาชนด้วย|wee-laa thaawn ngoen jam-nuan maak khun dtawng yeun bat bpra-chaa-chon duai|取较多现金时，你也要出示身份证。|资料
sen-cheu-thii-baep-faawm|เซ็นชื่อที่แบบฟอร์ม|sen cheu thii baep-faawm|在表格上签名|动词|银行柜台|กรุณาเซ็นชื่อที่แบบฟอร์มตรงช่องล่างสุด|ga-ru-naa sen cheu thii baep-faawm dtrong chaawng laang sut|请在表格最下面的栏位签名。|表格
graawk-baep-faawm|กรอกแบบฟอร์ม|graawk baep-faawm|填写表格|动词|银行柜台|ถ้าต้องการโอนเงินที่เคาน์เตอร์ ให้กรอกแบบฟอร์มใบนี้ก่อน|thaa dtawng-gaan oon ngoen thii khao-dter hai graawk baep-faawm bai nii gaawn|如果要在柜台转账，请先填写这张表。|表格
bpoet-ban-chii-mai|เปิดบัญชีใหม่|bpoet ban-chii mai|新开户|动词|账户卡片|นักศึกษาต่างชาติต้องเปิดบัญชีใหม่เพื่อรับเงินเดือน|nak-seuk-saa dtaang-chaat dtawng bpoet ban-chii mai phuea rap ngoen-deuan|外国学生需要新开户来收工资。|账户
bpit-ban-chii|ปิดบัญชี|bpit ban-chii|销户|动词|账户卡片|ถ้าไม่ใช้บัญชีนี้แล้ว คุณสามารถปิดบัญชีได้ที่สาขา|thaa mai chai ban-chii nii laeo khun saa-maat bpit ban-chii dai thii saa-khaa|如果不用这个账户了，你可以在分行销户。|账户
ban-chii-thanaakhaan|บัญชีธนาคาร|ban-chii tha-naa-khaan|银行账户|名词|账户卡片|ฉันมีบัญชีธนาคารหนึ่งบัญชีสำหรับค่าเช่าห้อง|chan mii ban-chii tha-naa-khaan neung ban-chii sam-rap khaa-chao haawng|我有一个银行账户专门用于房租。|账户
lek-ban-chii|เลขบัญชี|lek ban-chii|账号|名词|账户卡片|กรุณาส่งเลขบัญชีให้ฉันทางข้อความก่อนบ่ายสามโมง|ga-ru-naa song lek ban-chii hai chan thaang khaaw-khwaam gaawn baai saam moong|请在下午三点前把账号用消息发给我。|账户
cheu-ban-chii|ชื่อบัญชี|cheu ban-chii|户名|名词|账户卡片|ก่อนโอนเงิน ฉันเช็กชื่อบัญชีว่าใช่ร้านนี้หรือไม่|gaawn oon ngoen chan chek cheu ban-chii waa chai raan nii reu mai|转账前，我确认户名是不是这家店。|账户
sam-mut-ban-chii|สมุดบัญชี|sa-mut ban-chii|存折|名词|账户卡片|แม่เก็บสมุดบัญชีไว้ในลิ้นชักและไม่ให้เด็กเล่น|mae gep sa-mut ban-chii wai nai lin-chak lae mai hai dek len|妈妈把存折放在抽屉里，不让孩子拿来玩。|账户
ap-det-sam-mut|อัปเดตสมุดบัญชี|ap-det sa-mut|更新存折|动词|账户卡片|หลังจากมีเงินเข้า ฉันไปอัปเดตสมุดบัญชีที่ตู้|lang-jaak mii ngoen khao chan bpai ap-det sa-mut ban-chii thii dtuu|钱到账后，我去机器上更新存折。|账户
bat-eee-tii-em|บัตรเอทีเอ็ม|bat ee-thii-em|ATM卡|名词|账户卡片|บัตรเอทีเอ็มใบเก่าของฉันใช้กดเงินไม่ได้แล้ว|bat ee-thii-em bai gao khaawng chan chai got ngoen mai dai laeo|我的旧ATM卡已经不能取钱了。|卡片
ra-hat-phin|รหัสพิน|ra-hat phin|PIN密码|名词|账户卡片|อย่าบอกรหัสพินกับคนอื่น แม้เขาบอกว่าเป็นพนักงาน|yaa baawk ra-hat phin gap khon eun mae khao baawk waa bpen pha-nak-ngaan|不要把PIN密码告诉别人，即使他说自己是工作人员。|密码
leum-ra-hat|ลืมรหัส|leum ra-hat|忘记密码|动词|账户卡片|ฉันลืมรหัสบัตร จึงต้องขอรหัสใหม่ที่ธนาคาร|chan leum ra-hat bat jeung dtawng khaaw ra-hat mai thii tha-naa-khaan|我忘了卡密码，所以要到银行申请新密码。|密码
bat-haai|บัตรหาย|bat haai|卡丢了|短语|账户卡片|ถ้าบัตรหาย คุณควรโทรแจ้งธนาคารทันที|thaa bat haai khun khuan thoo jaeng tha-naa-khaan than-thii|如果卡丢了，你应该马上打电话通知银行。|卡片
aa-yat-bat|อายัดบัตร|aa-yat bat|冻结银行卡|动词|账户卡片|เจ้าหน้าที่ช่วยอายัดบัตรหลังจากฉันทำกระเป๋าหาย|jao-naa-thii chuai aa-yat bat lang-jaak chan tham gra-bpao haai|我弄丢钱包后，工作人员帮我冻结银行卡。|卡片
faak-ngoen-sot|ฝากเงินสด|faak ngoen sot|存现金|动词|银行柜台|คุณพ่อฝากเงินสดสองพันบาทเข้าบัญชีของลูกชาย|khun phaaw faak ngoen sot saawng phan baat khao ban-chii khaawng luuk-chaai|爸爸把两千泰铢现金存进儿子的账户。|现金
thaawn-ngoen-sot|ถอนเงินสด|thaawn ngoen sot|取现金|动词|银行柜台|ฉันต้องถอนเงินสดเล็กน้อยเพื่อจ่ายค่ารถ|chan dtawng thaawn ngoen sot lek naawy phuea jaai khaa rot|我需要取一点现金来付车费。|现金
ngoen-sot-yoi|เงินสดย่อย|ngoen sot yaawy|零钱现金|名词|银行柜台|ร้านขอเงินสดย่อยเพราะต้องทอนเงินให้ลูกค้า|raan khaaw ngoen sot yaawy phraw dtawng thaawn ngoen hai luuk-khaa|店里要换一些零钱现金，因为要找钱给顾客。|现金
thana-bat-yoi|ธนบัตรย่อย|tha-na-bat yaawy|小面额纸币|名词|银行柜台|ฉันขอแลกธนบัตรย่อยสำหรับใช้ขึ้นรถเมล์|chan khaaw laek tha-na-bat yaawy sam-rap chai kheun rot-mee|我想换小面额纸币，用来坐公交。|现金
riap-riang-ngoen|เรียงเงิน|riiang ngoen|整理钞票|动词|银行柜台|ก่อนฝากเงิน พนักงานขอให้ฉันเรียงเงินให้เรียบร้อย|gaawn faak ngoen pha-nak-ngaan khaaw hai chan riiang ngoen hai riap-raawy|存钱前，工作人员请我把钞票整理好。|现金
chek-yot-ngoen|เช็กยอดเงิน|chek yaawt ngoen|查余额|动词|账户卡片|ฉันเช็กยอดเงินในแอปก่อนจ่ายค่าห้อง|chan chek yaawt ngoen nai aep gaawn jaai khaa haawng|我在付房租前先在应用里查余额。|余额
yot-khong-leua|ยอดคงเหลือ|yaawt khong-leua|账户余额|名词|账户卡片|ยอดคงเหลือของบัญชีนี้ไม่พอจ่ายบิลไฟ|yaawt khong-leua khaawng ban-chii nii mai phaaw jaai bin fai|这个账户余额不够付电费账单。|余额
ngoen-khao|เงินเข้า|ngoen khao|钱到账|短语|账户卡片|เมื่อเงินเข้าแล้ว แอปธนาคารจะส่งข้อความแจ้งเตือน|meua ngoen khao laeo aep tha-naa-khaan ja song khaaw-khwaam jaeng-dteuan|钱到账后，银行应用会发送通知。|余额
ngoen-aawk|เงินออก|ngoen aawk|钱支出|短语|账户卡片|เมื่อวานมีเงินออกจากบัญชีสองครั้ง ฉันจึงตรวจสลิป|meua-waan mii ngoen aawk jaak ban-chii saawng khrang chan jeung dtruat sa-lip|昨天账户有两笔支出，所以我检查了凭条。|余额
prap-yot-ban-chii|ปรับยอดบัญชี|bprap yaawt ban-chii|核对账户金额|动词|账户卡片|หลังจ่ายเงินหลายรายการ ฉันต้องปรับยอดบัญชีอีกครั้ง|lang jaai ngoen laai raai-gaan chan dtawng bprap yaawt ban-chii iik khrang|付了多笔款后，我需要再次核对账户金额。|余额
oon-ngoen|โอนเงิน|oon ngoen|转账|动词|转账汇款|ฉันโอนเงินให้เจ้าของห้องทุกวันที่หนึ่งของเดือน|chan oon ngoen hai jao-khaawng haawng thuk wan-thii neung khaawng deuan|我每月一号给房东转账。|转账
oon-thang-aep|โอนทางแอป|oon thaang aep|用应用转账|动词|转账汇款|ถ้าธนาคารยังไม่ปิด คุณก็โอนทางแอปได้เหมือนกัน|thaa tha-naa-khaan yang mai bpit khun gaaw oon thaang aep dai meuan-gan|如果银行还没关，你也可以用应用转账。|转账
oon-khaam-thanaakhaan|โอนข้ามธนาคาร|oon khaam tha-naa-khaan|跨行转账|动词|转账汇款|การโอนข้ามธนาคารบางครั้งมีค่าธรรมเนียมเล็กน้อย|gaan oon khaam tha-naa-khaan baang khrang mii khaa-tham-niiam lek naawy|跨行转账有时会有一点手续费。|转账
rap-ngoen-oon|รับเงินโอน|rap ngoen oon|收转账款|动词|转账汇款|ร้านรับเงินโอนแล้วจะส่งของให้ภายในวันนี้|raan rap ngoen oon laeo ja song khaawng hai phaai-nai wan-nii|店里收到转账后，会在今天内发货。|转账
song-salip-oon|ส่งสลิปโอน|song sa-lip oon|发送转账凭条|动词|转账汇款|หลังโอนเงินแล้ว กรุณาส่งสลิปโอนให้แอดมินตรวจ|lang oon ngoen laeo ga-ru-naa song sa-lip oon hai aed-min dtruat|转账后，请把转账凭条发给管理员核对。|凭条
salip-oon|สลิปโอน|sa-lip oon|转账凭条|名词|转账汇款|สลิปโอนใบนี้มีชื่อบัญชีและเวลาชัดเจน|sa-lip oon bai nii mii cheu ban-chii lae wee-laa chat-jen|这张转账凭条上有清楚的户名和时间。|凭条
yaen-yan-gaan-oon|ยืนยันการโอน|yeun-yan gaan oon|确认转账|动词|转账汇款|ก่อนกดตกลง แอปจะให้ยืนยันการโอนอีกครั้ง|gaawn got dtok-long aep ja hai yeun-yan gaan oon iik khrang|按确认前，应用会让你再次确认转账。|转账
ngoen-yang-mai-khao|เงินยังไม่เข้า|ngoen yang mai khao|钱还没到账|短语|转账汇款|ฉันโอนแล้ว แต่ปลายทางบอกว่าเงินยังไม่เข้า|chan oon laeo dtae bplaai-thaang baawk waa ngoen yang mai khao|我已经转了，但对方说钱还没到账。|转账
plai-thaang|ปลายทาง|bplaai-thaang|收款方|名词|转账汇款|ปลายทางต้องส่งชื่อบัญชีให้ถูกก่อนฉันโอนเงิน|bplaai-thaang dtawng song cheu ban-chii hai thuuk gaawn chan oon ngoen|收款方要先把正确户名发给我，我再转账。|转账
phuu-rap-ngoen|ผู้รับเงิน|phuu rap ngoen|收款人|名词|转账汇款|ชื่อผู้รับเงินในใบโอนต้องตรงกับชื่อบัญชี|cheu phuu rap ngoen nai bai oon dtawng dtrong gap cheu ban-chii|转账单上的收款人姓名必须和户名一致。|转账
phuu-song-ngoen|ผู้ส่งเงิน|phuu song ngoen|付款人|名词|转账汇款|ผู้ส่งเงินควรเก็บสลิปไว้จนกว่าปลายทางจะได้รับเงิน|phuu song ngoen khuan gep sa-lip wai jon gwaa bplaai-thaang ja dai rap ngoen|付款人应该保留凭条，直到收款方收到钱。|转账
song-ngoen-glap-baan|ส่งเงินกลับบ้าน|song ngoen glap baan|汇钱回家|动词|转账汇款|พี่ชายส่งเงินกลับบ้านทุกเดือนให้พ่อแม่ใช้|phii-chaai song ngoen glap baan thuk deuan hai phaaw-mae chai|哥哥每个月汇钱回家给父母用。|汇款
rap-ngoen-jaak-taang-bpra-thet|รับเงินจากต่างประเทศ|rap ngoen jaak dtaang-bpra-thet|收国外汇款|动词|转账汇款|ธนาคารขอเอกสารเมื่อฉันรับเงินจากต่างประเทศ|tha-naa-khaan khaaw eek-ga-saan meua chan rap ngoen jaak dtaang-bpra-thet|我收国外汇款时，银行要求资料。|汇款
khaa-tham-niiam|ค่าธรรมเนียม|khaa-tham-niiam|手续费|名词|费用收据|ค่าธรรมเนียมการโอนครั้งนี้สิบบาท ไม่แพงมาก|khaa-tham-niiam gaan oon khrang nii sip baat mai phaeng maak|这次转账手续费十泰铢，不算太贵。|费用
free-khaa-tham-niiam|ฟรีค่าธรรมเนียม|frii khaa-tham-niiam|免手续费|短语|费用收据|ถ้าโอนในแอปวันนี้ ฟรีค่าธรรมเนียมทุกธนาคาร|thaa oon nai aep wan-nii frii khaa-tham-niiam thuk tha-naa-khaan|如果今天在应用里转账，所有银行都免手续费。|费用
khaa-bo-ri-gaan|ค่าบริการ|khaa baaw-ri-gaan|服务费|名词|费用收据|ไปรษณีย์คิดค่าบริการเพิ่มเมื่อส่งของด่วน|bprai-sa-nii khit khaa baaw-ri-gaan phoem meua song khaawng duan|邮局寄急件时会加收服务费。|费用
bai-set|ใบเสร็จ|bai-set|收据|名词|费用收据|หลังชำระเงินแล้ว กรุณาเก็บใบเสร็จไว้เป็นหลักฐาน|lang cham-ra ngoen laeo ga-ru-naa gep bai-set wai bpen lak-thaan|付款后，请保留收据作为凭证。|收据
khaaw-bai-set|ขอใบเสร็จ|khaaw bai-set|要收据|动词|费用收据|ฉันขอใบเสร็จทุกครั้งเมื่อจ่ายค่าธรรมเนียมที่เคาน์เตอร์|chan khaaw bai-set thuk khrang meua jaai khaa-tham-niiam thii khao-dter|我每次在柜台付手续费都会要收据。|收据
rak-saa-bai-set|รักษาใบเสร็จ|rak-saa bai-set|保管收据|动词|费用收据|คุณควรรักษาใบเสร็จไว้จนกว่าพัสดุจะถึงผู้รับ|khun khuan rak-saa bai-set wai jon gwaa phat-sa-du ja theung phuu rap|你应该保管收据，直到包裹送到收件人那里。|收据
jaai-khaa-song|จ่ายค่าส่ง|jaai khaa song|支付邮费|动词|费用收据|ฉันจ่ายค่าส่งแล้ว พนักงานให้ใบเสร็จหนึ่งใบ|chan jaai khaa song laeo pha-nak-ngaan hai bai-set neung bai|我付了邮费，工作人员给了一张收据。|费用
khaa-song|ค่าส่ง|khaa song|邮费|名词|费用收据|ค่าส่งพัสดุไปเชียงใหม่ไม่ถึงร้อยบาท|khaa song phat-sa-du bpai chiiang-mai mai theung raawy baat|寄包裹到清迈的邮费不到一百泰铢。|费用
bprai-sa-nii|ไปรษณีย์|bprai-sa-nii|邮局|名词|邮局寄件|ตอนบ่ายฉันจะไปไปรษณีย์เพื่อส่งเอกสารสำคัญ|dtaawn baai chan ja bpai bprai-sa-nii phuea song eek-ga-saan sam-khan|下午我要去邮局寄重要文件。|邮局
thii-tham-gaan-bprai-sa-nii|ที่ทำการไปรษณีย์|thii tham-gaan bprai-sa-nii|邮政营业处|名词|邮局寄件|ที่ทำการไปรษณีย์ใกล้บ้านเปิดถึงห้าโมงเย็น|thii tham-gaan bprai-sa-nii glai baan bpoet theung haa moong yen|我家附近的邮政营业处营业到下午五点。|邮局
khao-dter-bprai-sa-nii|เคาน์เตอร์ไปรษณีย์|khao-dter bprai-sa-nii|邮局柜台|名词|邮局寄件|นำกล่องพัสดุไปวางที่เคาน์เตอร์ไปรษณีย์ได้เลย|nam glaawng phat-sa-du bpai waang thii khao-dter bprai-sa-nii dai loei|可以把包裹盒直接放到邮局柜台。|邮局
faak-song|ฝากส่ง|faak song|托寄|动词|邮局寄件|ฉันฝากส่งจดหมายให้เพื่อน เพราะเขาไม่ว่าง|chan faak song jot-maai hai pheuan phraw khao mai waang|我帮朋友托寄信件，因为他没空。|寄件
song-phat-sa-du|ส่งพัสดุ|song phat-sa-du|寄包裹|动词|邮局寄件|เราต้องส่งพัสดุก่อนเที่ยงเพื่อให้ถึงเร็วขึ้น|rao dtawng song phat-sa-du gaawn thiiang phuea hai theung reo kheun|我们要在中午前寄包裹，好让它更快到。|寄件
song-jot-maai|ส่งจดหมาย|song jot-maai|寄信|动词|邮局寄件|คุณตาส่งจดหมายถึงหลานทุกเดือนพร้อมรูปถ่าย|khun dtaa song jot-maai theung laan thuk deuan phraawm ruup-thaai|爷爷每个月给孙辈寄信，还附照片。|寄件
jot-maai-long-tha-biian|จดหมายลงทะเบียน|jot-maai long-tha-biian|挂号信|名词|邮局寄件|เอกสารสำคัญควรส่งเป็นจดหมายลงทะเบียน|eek-ga-saan sam-khan khuan song bpen jot-maai long-tha-biian|重要文件应该寄挂号信。|寄件
phat-sa-du-duan|พัสดุด่วน|phat-sa-du duan|快递包裹|名词|邮局寄件|ถ้าต้องการให้ถึงพรุ่งนี้ เลือกพัสดุด่วนดีกว่า|thaa dtawng-gaan hai theung phrung-nii leuak phat-sa-du duan dii gwaa|如果想明天送到，选快递包裹比较好。|寄件
phat-sa-du-tham-ma-daa|พัสดุธรรมดา|phat-sa-du tham-ma-daa|普通包裹|名词|邮局寄件|พัสดุธรรมดาถูกกว่าแต่ใช้เวลาหลายวัน|phat-sa-du tham-ma-daa thuuk gwaa dtae chai wee-laa laai wan|普通包裹更便宜，但需要好几天。|寄件
glaawng-phat-sa-du|กล่องพัสดุ|glaawng phat-sa-du|包裹盒|名词|邮局寄件|กล่องพัสดุใบนี้เล็กไปสำหรับรองเท้าหนึ่งคู่|glaawng phat-sa-du bai nii lek bpai sam-rap raawng-thaao neung khuu|这个包裹盒对一双鞋来说太小了。|包装
saawng-jot-maai|ซองจดหมาย|saawng jot-maai|信封|名词|邮局寄件|กรุณาเขียนชื่อผู้รับบนซองจดหมายให้ชัดเจน|ga-ru-naa khiian cheu phuu rap bon saawng jot-maai hai chat-jen|请把收件人姓名清楚写在信封上。|包装
sa-dtaem|แสตมป์|sa-dtaem|邮票|名词|邮局寄件|เด็กชายซื้อแสตมป์สองดวงเพื่อส่งโปสต์การ์ด|dek-chaai seu sa-dtaem saawng duang phuea song bpoh-gaat|男孩买了两张邮票来寄明信片。|邮票
dtit-sa-dtaem|ติดแสตมป์|dtit sa-dtaem|贴邮票|动词|邮局寄件|อย่าลืมติดแสตมป์ก่อนหย่อนจดหมายลงตู้|yaa leum dtit sa-dtaem gaawn yaawn jot-maai long dtuu|把信投进信箱前，别忘了贴邮票。|邮票
chan-naam-nak|ชั่งน้ำหนัก|chang nam-nak|称重量|动词|邮局寄件|พนักงานชั่งน้ำหนักกล่องก่อนบอกค่าส่ง|pha-nak-ngaan chang nam-nak glaawng gaawn baawk khaa song|工作人员先称盒子的重量，再告知邮费。|寄件
naam-nak-phat-sa-du|น้ำหนักพัสดุ|nam-nak phat-sa-du|包裹重量|名词|邮局寄件|น้ำหนักพัสดุเกินสองกิโล ค่าส่งจึงแพงขึ้น|nam-nak phat-sa-du gern saawng gi-loo khaa song jeung phaeng kheun|包裹重量超过两公斤，所以邮费变贵了。|寄件
bpai-dtruat-phat-sa-du|ใบตรวจพัสดุ|bai dtruat phat-sa-du|包裹检查单|名词|邮局寄件|บางสาขาให้กรอกใบตรวจพัสดุก่อนส่งของ|baang saa-khaa hai graawk bai dtruat phat-sa-du gaawn song khaawng|有些分行寄东西前会让填写包裹检查单。|寄件
bpit-glaawng|ปิดกล่อง|bpit glaawng|封箱|动词|邮局寄件|กรุณาปิดกล่องให้แน่นก่อนนำไปส่งที่ไปรษณีย์|ga-ru-naa bpit glaawng hai naen gaawn nam bpai song thii bprai-sa-nii|请把箱子封牢后再拿去邮局寄。|包装
theep-gaao|เทปกาว|theep gaao|胶带|名词|邮局寄件|ฉันซื้อเทปกาวที่ไปรษณีย์เพราะลืมเอามาจากบ้าน|chan seu theep gaao thii bprai-sa-nii phraw leum ao maa jaak baan|我在邮局买胶带，因为忘了从家里带。|包装
gan-gra-thaek|กันกระแทก|gan gra-thaek|防震保护|动词|邮局寄件|ของในกล่องเป็นแก้ว ต้องกันกระแทกให้ดี|khaawng nai glaawng bpen gaeo dtawng gan gra-thaek hai dii|盒子里的东西是玻璃，必须做好防震保护。|包装
khaawng-dtaek-ngaai|ของแตกง่าย|khaawng dtaek ngaai|易碎物品|名词|邮局寄件|ถ้าเป็นของแตกง่าย ให้เขียนคำเตือนบนกล่อง|thaa bpen khaawng dtaek ngaai hai khiian kham-dteuan bon glaawng|如果是易碎物品，请在盒子上写提醒。|包装
haam-yon|ห้ามโยน|haam yoon|禁止抛扔|短语|邮局寄件|ฉันติดป้ายห้ามโยนบนกล่องที่มีจานอยู่ข้างใน|chan dtit bpaai haam yoon bon glaawng thii mii jaan yuu khaang-nai|我在装着盘子的盒子上贴了禁止抛扔的标签。|包装
cheu-phuu-rap|ชื่อผู้รับ|cheu phuu rap|收件人姓名|名词|地址资料|ชื่อผู้รับต้องเขียนให้ตรงกับบัตรประชาชน|cheu phuu rap dtawng khiian hai dtrong gap bat bpra-chaa-chon|收件人姓名要写得和身份证一致。|地址
thii-yuu-phuu-rap|ที่อยู่ผู้รับ|thii-yuu phuu rap|收件人地址|名词|地址资料|ที่อยู่ผู้รับยาวมาก ฉันจึงเขียนอย่างช้า ๆ|thii-yuu phuu rap yaao maak chan jeung khiian yaang chaa chaa|收件人地址很长，所以我慢慢写。|地址
ber-phuu-rap|เบอร์ผู้รับ|ber phuu rap|收件人电话|名词|地址资料|ถ้าพัสดุมาถึงแล้ว เจ้าหน้าที่จะโทรหาเบอร์ผู้รับ|thaa phat-sa-du maa theung laeo jao-naa-thii ja thoo haa ber phuu rap|包裹到达后，工作人员会打收件人电话。|电话
cheu-phuu-song|ชื่อผู้ส่ง|cheu phuu song|寄件人姓名|名词|地址资料|กรุณาเขียนชื่อผู้ส่งไว้ที่มุมซ้ายบนของกล่อง|ga-ru-naa khiian cheu phuu song wai thii mum saai bon khaawng glaawng|请把寄件人姓名写在盒子左上角。|地址
thii-yuu-phuu-song|ที่อยู่ผู้ส่ง|thii-yuu phuu song|寄件人地址|名词|地址资料|ถ้าพัสดุตีกลับ เขาจะส่งไปที่ที่อยู่ผู้ส่ง|thaa phat-sa-du dtii glap khao ja song bpai thii thii-yuu phuu song|如果包裹退回，会寄到寄件人地址。|地址
ber-phuu-song|เบอร์ผู้ส่ง|ber phuu song|寄件人电话|名词|地址资料|เบอร์ผู้ส่งต้องติดต่อได้ เผื่อมีปัญหาระหว่างทาง|ber phuu song dtawng dtit-dtaaw dai pheua mii bpan-haa ra-waang thaang|寄件人电话必须能联系上，以防途中有问题。|电话
ra-hat-bprai-sa-nii|รหัสไปรษณีย์|ra-hat bprai-sa-nii|邮政编码|名词|地址资料|ฉันไม่แน่ใจรหัสไปรษณีย์ จึงค้นในโทรศัพท์ก่อนส่ง|chan mai nae-jai ra-hat bprai-sa-nii jeung khon nai thoo-ra-sap gaawn song|我不确定邮政编码，所以寄出前先用手机查询。|地址
graawk-thii-yuu|กรอกที่อยู่|graawk thii-yuu|填写地址|动词|地址资料|กรุณากรอกที่อยู่เป็นภาษาไทยหรือภาษาอังกฤษก็ได้|ga-ru-naa graawk thii-yuu bpen phaa-saa thai reu phaa-saa ang-grit gaaw dai|请填写地址，可以用泰语或英语。|地址
khiian-hai-chat|เขียนให้ชัด|khiian hai chat|写清楚|动词|地址资料|เจ้าหน้าที่บอกให้เขียนให้ชัด เพราะตัวหนังสือเล็กมาก|jao-naa-thii baawk hai khiian hai chat phraw dtua nang-seu lek maak|工作人员让写清楚，因为字太小了。|地址
dtruat-thii-yuu-iik-khrang|ตรวจที่อยู่อีกครั้ง|dtruat thii-yuu iik khrang|再次检查地址|动词|地址资料|ก่อนจ่ายค่าส่ง ฉันตรวจที่อยู่อีกครั้งเพื่อไม่ให้ผิด|gaawn jaai khaa song chan dtruat thii-yuu iik khrang phuea mai hai phit|付邮费前，我再次检查地址，避免写错。|地址
song-phit-thii-yuu|ส่งผิดที่อยู่|song phit thii-yuu|寄错地址|动词|地址资料|ถ้าเขียนบ้านเลขที่ผิด อาจส่งผิดที่อยู่ได้|thaa khiian baan-lek-thii phit aat song phit thii-yuu dai|如果门牌号写错，可能会寄错地址。|地址
haawng-rap-phat-sa-du|ห้องรับพัสดุ|haawng rap phat-sa-du|包裹收发室|名词|取件追踪|คอนโดของฉันมีห้องรับพัสดุอยู่ชั้นล่าง|khaawn-doo khaawng chan mii haawng rap phat-sa-du yuu chan laang|我的公寓楼下有包裹收发室。|取件
rap-phat-sa-du|รับพัสดุ|rap phat-sa-du|取包裹|动词|取件追踪|หลังเลิกงาน ฉันจะไปรับพัสดุที่หน้าตึก|lang loek-ngaan chan ja bpai rap phat-sa-du thii naa dteuk|下班后，我会去楼前取包裹。|取件
bai-rap-phat-sa-du|ใบรับพัสดุ|bai rap phat-sa-du|取件单|名词|取件追踪|กรุณานำใบรับพัสดุและบัตรประชาชนมาด้วย|ga-ru-naa nam bai rap phat-sa-du lae bat bpra-chaa-chon maa duai|请带取件单和身份证来。|取件
maai-lek-phat-sa-du|หมายเลขพัสดุ|maai-lek phat-sa-du|包裹单号|名词|取件追踪|ฉันส่งหมายเลขพัสดุให้แม่ เพื่อให้แม่ติดตามเองได้|chan song maai-lek phat-sa-du hai mae phuea hai mae dtit-dtaam eeng dai|我把包裹单号发给妈妈，让她能自己追踪。|单号
tid-dtaam-phat-sa-du|ติดตามพัสดุ|dtit-dtaam phat-sa-du|追踪包裹|动词|取件追踪|คุณสามารถติดตามพัสดุในเว็บไซต์ของไปรษณีย์|khun saa-maat dtit-dtaam phat-sa-du nai wep-sai khaawng bprai-sa-nii|你可以在邮局网站上追踪包裹。|追踪
phat-sa-du-theung-laeo|พัสดุถึงแล้ว|phat-sa-du theung laeo|包裹已到|短语|取件追踪|แอปแจ้งว่าพัสดุถึงแล้ว แต่ฉันยังไม่ได้ไปรับ|aep jaeng waa phat-sa-du theung laeo dtae chan yang mai dai bpai rap|应用通知包裹已到，但我还没去取。|追踪
phat-sa-du-yang-mai-theung|พัสดุยังไม่ถึง|phat-sa-du yang mai theung|包裹还没到|短语|取件追踪|พัสดุยังไม่ถึงบ้านฉัน อาจมาถึงพรุ่งนี้เช้า|phat-sa-du yang mai theung baan chan aat maa theung phrung-nii chaao|包裹还没到我家，可能明天早上到。|追踪
phat-sa-du-dtii-glap|พัสดุตีกลับ|phat-sa-du dtii glap|包裹退回|短语|取件追踪|เพราะไม่มีคนรับ พัสดุตีกลับไปที่ผู้ส่ง|phraw mai mii khon rap phat-sa-du dtii glap bpai thii phuu song|因为没人收，包裹退回寄件人那里了。|追踪
phat-sa-du-haai|พัสดุหาย|phat-sa-du haai|包裹丢失|短语|取件追踪|ถ้าพัสดุหาย ต้องเอาใบเสร็จไปถามที่สาขา|thaa phat-sa-du haai dtawng ao bai-set bpai thaam thii saa-khaa|如果包裹丢失，要拿收据去分行询问。|追踪
laai-sen-rap-khaawng|ลายเซ็นรับของ|laai-sen rap khaawng|签收签名|名词|取件追踪|ผู้ส่งขอดูรูปถ่ายลายเซ็นรับของหลังพัสดุถึง|phuu song khaaw duu ruup-thaai laai-sen rap khaawng lang phat-sa-du theung|包裹到达后，寄件人要求看签收签名的照片。|签收
phuu-sen-rap|ผู้เซ็นรับ|phuu sen rap|签收人|名词|取件追踪|ในระบบเขียนว่าผู้เซ็นรับคือเจ้าหน้าที่คอนโด|nai ra-bop khiian waa phuu sen rap kheu jao-naa-thii khaawn-doo|系统里写着签收人是公寓工作人员。|签收
song-khaawng-hai-phuean|ส่งของให้เพื่อน|song khaawng hai pheuan|给朋友寄东西|动词|邮局寄件|ฉันส่งของให้เพื่อนที่ภูเก็ตและบอกเลขพัสดุเขาแล้ว|chan song khaawng hai pheuan thii phuu-get lae baawk lek phat-sa-du khao laeo|我给普吉的朋友寄东西，并已经告诉他单号了。|寄件
song-ek-ga-saan-sam-khan|ส่งเอกสารสำคัญ|song eek-ga-saan sam-khan|寄重要文件|动词|邮局寄件|บริษัทส่งเอกสารสำคัญแบบลงทะเบียนทุกครั้ง|baaw-ri-sat song eek-ga-saan sam-khan baep long-tha-biian thuk khrang|公司每次都用挂号方式寄重要文件。|寄件
rap-jot-maai|รับจดหมาย|rap jot-maai|收信|动词|取件追踪|คุณป้ารับจดหมายจากไปรษณีย์ตอนบ่ายสองโมง|khun bpaa rap jot-maai jaak bprai-sa-nii dtaawn baai saawng moong|阿姨下午两点从邮局收到信。|收件
glong-song-jot-maai|กล่องส่งจดหมาย|glaawng song jot-maai|投信箱|名词|邮局寄件|หน้าหมู่บ้านมีกล่องส่งจดหมายสีแดงหนึ่งใบ|naa muu-baan mii glaawng song jot-maai sii daeng neung bai|小区门口有一个红色投信箱。|邮局
yaawn-jot-maai|หย่อนจดหมาย|yaawn jot-maai|投信|动词|邮局寄件|หลังติดแสตมป์แล้ว เขาหย่อนจดหมายลงกล่องสีแดง|lang dtit sa-dtaem laeo khao yaawn jot-maai long glaawng sii daeng|贴好邮票后，他把信投进红色信箱。|邮局
jam-nuan-ngoen|จำนวนเงิน|jam-nuan ngoen|金额|名词|转账汇款|กรุณาตรวจจำนวนเงินก่อนกดยืนยันทุกครั้ง|ga-ru-naa dtruat jam-nuan ngoen gaawn got yeun-yan thuk khrang|每次按确认前，请检查金额。|金额
jam-nuan-phat-sa-du|จำนวนพัสดุ|jam-nuan phat-sa-du|包裹数量|名词|邮局寄件|วันนี้ฉันมีจำนวนพัสดุห้ากล่องที่ต้องส่ง|wan-nii chan mii jam-nuan phat-sa-du haa glaawng thii dtawng song|今天我有五个包裹要寄。|寄件
khan-dtaawn-tham-raai-gaan|ขั้นตอนทำรายการ|khan-dtaawn tham raai-gaan|办理步骤|名词|排队办事|เจ้าหน้าที่อธิบายขั้นตอนทำรายการให้ลูกค้าฟังทีละข้อ|jao-naa-thii a-thi-baai khan-dtaawn tham raai-gaan hai luuk-khaa fang thii-la khaaw|工作人员逐条向客户说明办理步骤。|流程
tham-raai-gaan-sam-ret|ทำรายการสำเร็จ|tham raai-gaan sam-ret|办理成功|短语|排队办事|หน้าจอขึ้นว่าทำรายการสำเร็จแล้ว คุณเก็บสลิปได้เลย|naa-jaaw kheun waa tham raai-gaan sam-ret laeo khun gep sa-lip dai loei|屏幕显示办理成功了，你可以保留凭条。|流程
tham-raai-gaan-mai-sam-ret|ทำรายการไม่สำเร็จ|tham raai-gaan mai sam-ret|办理未成功|短语|排队办事|ถ้าทำรายการไม่สำเร็จ ลองเช็กอินเทอร์เน็ตก่อน|thaa tham raai-gaan mai sam-ret laawng chek in-thoe-net gaawn|如果办理未成功，先试着检查网络。|流程
bpai-saa-khaa|ไปสาขา|bpai saa-khaa|去分行|动词|银行柜台|เรื่องบัตรหายต้องไปสาขาพร้อมบัตรประชาชน|reuuang bat haai dtawng bpai saa-khaa phraawm bat bpra-chaa-chon|银行卡丢失的事需要带身份证去分行办理。|分行
saa-khaa-glai-baan|สาขาใกล้บ้าน|saa-khaa glai baan|家附近分行|名词|银行柜台|สาขาใกล้บ้านของฉันเปิดวันเสาร์ครึ่งวัน|saa-khaa glai baan khaawng chan bpoet wan-sao khreung wan|我家附近的分行星期六营业半天。|分行
we-laa-bpoet-bpit|เวลาเปิดปิด|wee-laa bpoet bpit|营业时间|名词|排队办事|ก่อนออกจากบ้าน ควรเช็กเวลาเปิดปิดของไปรษณีย์|gaawn aawk jaak baan khuan chek wee-laa bpoet bpit khaawng bprai-sa-nii|出门前，应该查一下邮局的营业时间。|流程
mai-mii-ngoen-sot|ไม่มีเงินสด|mai mii ngoen sot|没有现金|短语|银行柜台|วันนี้ฉันไม่มีเงินสด จึงขอโอนเงินแทนได้ไหม|wan-nii chan mai mii ngoen sot jeung khaaw oon ngoen thaen dai mai|今天我没有现金，可以改用转账吗？|现金
khaaw-laek-ngoen|ขอแลกเงิน|khaaw laek ngoen|请求换钱|动词|银行柜台|ฉันขอแลกเงินพันเป็นแบงก์ย่อยที่เคาน์เตอร์|chan khaaw laek ngoen phan bpen baeng yaawy thii khao-dter|我在柜台请求把一千泰铢换成小面额纸币。|现金
laek-rian|แลกเหรียญ|laek riian|换硬币|动词|银行柜台|ร้านซักผ้าต้องแลกเหรียญสิบบาทหลายเหรียญ|raan sak-phaa dtawng laek riian sip baat laai riian|洗衣店需要换很多十泰铢硬币。|现金
baeng-yoi|แบงก์ย่อย|baeng yaawy|小额钞票|名词|银行柜台|แม่ค้าชอบเก็บแบงก์ย่อยไว้ทอนเงินลูกค้า|mae-khaa chaawp gep baeng yaawy wai thaawn ngoen luuk-khaa|女摊主喜欢留小额钞票给顾客找零。|现金
saawng-ek-ga-saan|ซองเอกสาร|saawng eek-ga-saan|文件袋|名词|邮局寄件|ฉันใส่สัญญาเช่าบ้านในซองเอกสารสีน้ำตาล|chan sai san-yaa chao baan nai saawng eek-ga-saan sii naam-dtaan|我把租房合同放进棕色文件袋。|包装
lak-thaan-gaan-song|หลักฐานการส่ง|lak-thaan gaan song|寄件证明|名词|费用收据|ใบเสร็จและเลขพัสดุเป็นหลักฐานการส่งที่สำคัญ|bai-set lae lek phat-sa-du bpen lak-thaan gaan song thii sam-khan|收据和包裹单号是重要的寄件证明。|收据
lak-thaan-gaan-oon|หลักฐานการโอน|lak-thaan gaan oon|转账证明|名词|转账汇款|ร้านขอหลักฐานการโอนก่อนเตรียมของให้ลูกค้า|raan khaaw lak-thaan gaan oon gaawn dtriiam khaawng hai luuk-khaa|店铺要求转账证明后，才为顾客备货。|凭证
tham-sam-nao|ทำสำเนา|tham sam-nao|复印|动词|地址资料|ธนาคารขอให้ทำสำเนาบัตรประชาชนหนึ่งใบ|tha-naa-khaan khaaw hai tham sam-nao bat bpra-chaa-chon neung bai|银行要求复印一张身份证。|资料
sam-nao-ek-ga-saan|สำเนาเอกสาร|sam-nao eek-ga-saan|文件复印件|名词|地址资料|อย่าลืมนำสำเนาเอกสารไปพร้อมตัวจริง|yaa leum nam sam-nao eek-ga-saan bpai phraawm dtua-jing|别忘了带文件复印件和原件一起去。|资料
dtua-jing|ตัวจริง|dtua-jing|原件|名词|地址资料|เจ้าหน้าที่ขอดูตัวจริงของบัตรก่อนรับสำเนา|jao-naa-thii khaaw duu dtua-jing khaawng bat gaawn rap sam-nao|工作人员先查看证件原件，再收复印件。|资料
fang-khan-dtaawn|ฟังขั้นตอน|fang khan-dtaawn|听办理步骤|动词|排队办事|ถ้าไม่เข้าใจ กรุณาฟังขั้นตอนอีกครั้งอย่างใจเย็น|thaa mai khao-jai ga-ru-naa fang khan-dtaawn iik khrang yaang jai-yen|如果不明白，请冷静地再听一遍办理步骤。|流程
tham-dtaam-khan-dtaawn|ทำตามขั้นตอน|tham dtaam khan-dtaawn|按步骤办理|动词|排队办事|เมื่อทำตามขั้นตอนครบแล้ว เจ้าหน้าที่จะตรวจเอกสาร|meua tham dtaam khan-dtaawn khrop laeo jao-naa-thii ja dtruat eek-ga-saan|按步骤办完后，工作人员会检查文件。|流程
tham-raai-gaan-thii-dtuu|ทำรายการที่ตู้|tham raai-gaan thii dtuu|在机器上办理|动词|银行柜台|ถ้าคิวที่เคาน์เตอร์ยาว ลองทำรายการที่ตู้ได้|thaa khiu thii khao-dter yaao laawng tham raai-gaan thii dtuu dai|如果柜台队伍很长，可以试着在机器上办理。|流程
dtuu-at-ee-em|ตู้เอทีเอ็ม|dtuu ee-thii-em|ATM机|名词|账户卡片|ตู้เอทีเอ็มหน้าธนาคารใช้ถอนเงินได้ตลอดคืน|dtuu ee-thii-em naa tha-naa-khaan chai thaawn ngoen dai dta-laawt kheun|银行门口的ATM机整晚都能取钱。|机器
dtuu-faat-ngoen|ตู้ฝากเงิน|dtuu faak ngoen|存款机|名词|账户卡片|ฉันใช้ตู้ฝากเงินเมื่อธนาคารปิดแล้ว|chan chai dtuu faak ngoen meua tha-naa-khaan bpit laeo|银行关门后，我使用存款机。|机器
dtuu-bprap-sam-mut|ตู้ปรับสมุด|dtuu bprap sa-mut|存折更新机|名词|账户卡片|ตู้ปรับสมุดอยู่ข้างประตูทางเข้า|dtuu bprap sa-mut yuu khaang bpra-dtuu thaang-khao|存折更新机在入口门旁边。|机器
jaeng-dteuan-thanaakhaan|แจ้งเตือนธนาคาร|jaeng-dteuan tha-naa-khaan|银行提醒|名词|账户卡片|แจ้งเตือนธนาคารบอกว่ามีเงินออกจากบัญชี|jaeng-dteuan tha-naa-khaan baawk waa mii ngoen aawk jaak ban-chii|银行提醒显示账户有钱支出。|提醒
dtit-dtaaw-saa-khaa|ติดต่อสาขา|dtit-dtaaw saa-khaa|联系分行|动词|银行柜台|ถ้ามีคำถามเรื่องบัญชี กรุณาติดต่อสาขาที่เปิดบัญชี|thaa mii kham-thaam reuuang ban-chii ga-ru-naa dtit-dtaaw saa-khaa thii bpoet ban-chii|如果有账户问题，请联系开户分行。|分行
tham-nai-wan-tham-maa-daa|ทำในวันธรรมดา|tham nai wan tham-maa-daa|在工作日办理|短语|排队办事|เอกสารบางอย่างต้องทำในวันธรรมดาเท่านั้น|eek-ga-saan baang yaang dtawng tham nai wan tham-maa-daa thao-nan|有些文件只能在工作日办理。|时间
glap-maa-rap-wan-lang|กลับมารับวันหลัง|glap maa rap wan lang|改天回来领取|动词|取件追踪|พาสปอร์ตยังไม่เสร็จ เจ้าหน้าที่ให้กลับมารับวันหลัง|phaas-paawt yang mai set jao-naa-thii hai glap maa rap wan lang|护照还没办好，工作人员让改天回来领取。|流程
khian-ber-thoo|เขียนเบอร์โทร|khiian ber thoo|填写电话号码|动词|地址资料|กรุณาเขียนเบอร์โทรใต้ชื่อผู้รับให้ชัดเจน|ga-ru-naa khiian ber thoo dtai cheu phuu rap hai chat-jen|请在收件人姓名下面清楚填写电话号码。|电话
thoo-ha-phuu-rap|โทรหาผู้รับ|thoo haa phuu rap|打给收件人|动词|取件追踪|ถ้าหาบ้านไม่เจอ พนักงานส่งของจะโทรหาผู้รับ|thaa haa baan mai joe pha-nak-ngaan song khaawng ja thoo haa phuu rap|如果找不到房子，派件员会打给收件人。|电话
thoo-ha-phuu-song|โทรหาผู้ส่ง|thoo haa phuu song|打给寄件人|动词|取件追踪|เมื่อที่อยู่ไม่ครบ เจ้าหน้าที่ต้องโทรหาผู้ส่ง|meua thii-yuu mai khrop jao-naa-thii dtawng thoo haa phuu song|地址不完整时，工作人员需要打给寄件人。|电话
song-duan-phiseyt|ส่งด่วนพิเศษ|song duan phi-set|特快寄送|动词|邮局寄件|เอกสารนี้ต้องถึงพรุ่งนี้ จึงต้องส่งด่วนพิเศษ|eek-ga-saan nii dtawng theung phrung-nii jeung dtawng song duan phi-set|这份文件明天必须到，所以要特快寄送。|寄件
song-tham-ma-daa|ส่งธรรมดา|song tham-maa-daa|普通寄送|动词|邮局寄件|ถ้าไม่รีบ เราส่งธรรมดาเพื่อประหยัดค่าส่งได้|thaa mai riip rao song tham-maa-daa phuea bpra-yat khaa song dai|如果不急，我们可以普通寄送来节省邮费。|寄件
waang-phat-sa-du|วางพัสดุ|waang phat-sa-du|放置包裹|动词|邮局寄件|กรุณาวางพัสดุบนโต๊ะชั่งน้ำหนักทีละกล่อง|ga-ru-naa waang phat-sa-du bon dto chang nam-nak thii-la glaawng|请把包裹一箱一箱放到称重台上。|寄件
thaam-khaa-song|ถามค่าส่ง|thaam khaa song|询问邮费|动词|费用收据|ฉันถามค่าส่งก่อนเลือกว่าจะส่งด่วนหรือธรรมดา|chan thaam khaa song gaawn leuak waa ja song duan reu tham-maa-daa|我先询问邮费，再选择寄快递还是普通。|费用
khaaw-kham-nae-nam|ขอคำแนะนำ|khaaw kham-nae-nam|请求建议|动词|排队办事|ถ้าไม่รู้ต้องส่งแบบไหน ขอคำแนะนำจากเจ้าหน้าที่ได้|thaa mai ruu dtawng song baep nai khaaw kham-nae-nam jaak jao-naa-thii dai|如果不知道要怎么寄，可以向工作人员请求建议。|流程
dtuan-salip|ตรวจสลิป|dtruat sa-lip|检查凭条|动词|费用收据|ก่อนออกจากธนาคาร ฉันตรวจสลิปและจำนวนเงินอีกครั้ง|gaawn aawk jaak tha-naa-khaan chan dtruat sa-lip lae jam-nuan ngoen iik khrang|离开银行前，我再次检查凭条和金额。|凭条
gep-salip|เก็บสลิป|gep sa-lip|保留凭条|动词|费用收据|หลังโอนเงินแล้วควรเก็บสลิปไว้ในโทรศัพท์|lang oon ngoen laeo khuan gep sa-lip wai nai thoo-ra-sap|转账后应该把凭条保存在手机里。|凭条
song-ruup-salip|ส่งรูปสลิป|song ruup sa-lip|发送凭条照片|动词|费用收据|ร้านให้ส่งรูปสลิปพร้อมชื่อและที่อยู่ผู้รับ|raan hai song ruup sa-lip phraawm cheu lae thii-yuu phuu rap|店铺要求发送凭条照片以及收件人姓名和地址。|凭条
rao-rap-ek-ga-saan|รอรับเอกสาร|raaw rap eek-ga-saan|等待领取文件|动词|排队办事|หลังยื่นแบบฟอร์มแล้ว คุณต้องรอรับเอกสารประมาณสิบนาที|lang yeun baep-faawm laeo khun dtawng raaw rap eek-ga-saan bpra-maan sip naa-thii|提交表格后，你需要等大约十分钟领取文件。|流程
chong-bpra-thap-traa|ช่องประทับตรา|chaawng bpra-thap dtraa|盖章窗口|名词|银行柜台|เอกสารนี้ต้องไปที่ช่องประทับตราก่อนกลับบ้าน|eek-ga-saan nii dtawng bpai thii chaawng bpra-thap dtraa gaawn glap baan|这份文件回家前需要去盖章窗口办理。|柜台
pra-thap-traa|ประทับตรา|bpra-thap dtraa|盖章|动词|银行柜台|เจ้าหน้าที่ประทับตราบนใบเสร็จหลังรับเงินแล้ว|jao-naa-thii bpra-thap dtraa bon bai-set lang rap ngoen laeo|工作人员收款后在收据上盖章。|柜台
khaw-raai-la-iat|ขอรายละเอียด|khaaw raai-la-iat|询问详情|动词|排队办事|ฉันขอรายละเอียดเรื่องค่าธรรมเนียมก่อนทำรายการ|chan khaaw raai-la-iat reuuang khaa-tham-niiam gaawn tham raai-gaan|办理前，我询问手续费的详情。|流程
mai-khao-jai-khan-dtaawn|ไม่เข้าใจขั้นตอน|mai khao-jai khan-dtaawn|不懂流程|短语|排队办事|ถ้าไม่เข้าใจขั้นตอน อย่าเกรงใจที่จะถามเจ้าหน้าที่|thaa mai khao-jai khan-dtaawn yaa greeng-jai thii ja thaam jao-naa-thii|如果不懂流程，不要不好意思问工作人员。|流程
tham-raai-gaan-thaen|ทำรายการแทน|tham raai-gaan thaen|代办|动词|排队办事|ลูกชายทำรายการแทนแม่ เพราะแม่อ่านหนังสือไม่ชัด|luuk-chaai tham raai-gaan thaen mae phraw mae aan nang-seu mai chat|儿子替妈妈代办，因为妈妈看字不清楚。|流程
maawp-am-naat|มอบอำนาจ|maawp am-naat|授权代办|动词|排队办事|ถ้าคุณมาด้วยตัวเองไม่ได้ ต้องมอบอำนาจเป็นเอกสาร|thaa khun maa duai dtua-eeng mai dai dtawng maawp am-naat bpen eek-ga-saan|如果你本人不能来，必须用文件授权代办。|流程
sam-nao-bat|สำเนาบัตร|sam-nao bat|证件复印件|名词|地址资料|การรับพัสดุบางอย่างต้องใช้สำเนาบัตรของผู้รับ|gaan rap phat-sa-du baang yaang dtawng chai sam-nao bat khaawng phuu rap|领取某些包裹需要收件人的证件复印件。|资料
phraawm-bat-pra-chaa-chon|พร้อมบัตรประชาชน|phraawm bat bpra-chaa-chon|带身份证一起|短语|地址资料|กรุณามารับเงินพร้อมบัตรประชาชนตัวจริง|ga-ru-naa maa rap ngoen phraawm bat bpra-chaa-chon dtua-jing|请带身份证原件来领取款项。|资料
dtraa-rap-ngoen|ตรารับเงิน|dtraa rap ngoen|收款章|名词|费用收据|ใบเสร็จนี้มีตรารับเงินและชื่อสาขาชัดเจน|bai-set nii mii dtraa rap ngoen lae cheu saa-khaa chat-jen|这张收据有清楚的收款章和分行名称。|收据
plaek-rian-bpen-baeng|แลกเหรียญเป็นแบงก์|laek riian bpen baeng|硬币换纸币|动词|银行柜台|ฉันเอาเหรียญจำนวนมากไปแลกเหรียญเป็นแบงก์ที่ธนาคาร|chan ao riian jam-nuan maak bpai laek riian bpen baeng thii tha-naa-khaan|我把很多硬币拿去银行换成纸币。|现金
long-cheu-rap|ลงชื่อรับ|long cheu rap|签名领取|动词|取件追踪|ก่อนรับพัสดุทุกครั้ง ต้องลงชื่อรับในสมุด|gaawn rap phat-sa-du thuk khrang dtawng long cheu rap nai sa-mut|每次领取包裹前，都要在本子上签名领取。|签收
tham-bai-kham-raawng|ทำใบคำร้อง|tham bai kham-raawng|填写申请单|动词|银行柜台|ถ้าต้องการบัตรใหม่ ต้องทำใบคำร้องที่เคาน์เตอร์|thaa dtawng-gaan bat mai dtawng tham bai kham-raawng thii khao-dter|如果需要新卡，要在柜台填写申请单。|表格
rap-raai-gaan-jaai|รับรายการจ่าย|rap raai-gaan jaai|领取付款明细|动词|费用收据|บริษัทขอรับรายการจ่ายจากธนาคารทุกสิ้นเดือน|baaw-ri-sat khaaw rap raai-gaan jaai jaak tha-naa-khaan thuk sin deuan|公司每月底向银行领取付款明细。|收据
chek-raai-gaan|เช็กรายการ|chek raai-gaan|检查交易记录|动词|账户卡片|ฉันเช็กรายการในบัญชีเมื่อเห็นยอดเงินแปลก ๆ|chan chek raai-gaan nai ban-chii meua hen yaawt ngoen bplaek bplaek|看到奇怪的金额时，我检查账户交易记录。|账户
raai-gaan-laa-sut|รายการล่าสุด|raai-gaan laa-sut|最新交易|名词|账户卡片|รายการล่าสุดในแอปคือการจ่ายค่าน้ำเมื่อเช้า|raai-gaan laa-sut nai aep kheu gaan jaai khaa naam meua chaao|应用里的最新交易是今天早上缴水费。|账户
dtit-bpan-haa-ra-waang-tham-raai-gaan|ติดปัญหาระหว่างทำรายการ|dtit bpan-haa ra-waang tham raai-gaan|办理中遇到问题|短语|排队办事|ถ้าติดปัญหาระหว่างทำรายการ ให้เรียกเจ้าหน้าที่ช่วย|thaa dtit bpan-haa ra-waang tham raai-gaan hai riiak jao-naa-thii chuai|如果办理中遇到问题，请叫工作人员帮忙。|流程
plian-ber-thoo-ban-chii|เปลี่ยนเบอร์โทรบัญชี|bplian ber thoo ban-chii|更改账户手机号|动词|账户卡片|ฉันต้องเปลี่ยนเบอร์โทรบัญชีเพราะใช้เบอร์ใหม่แล้ว|chan dtawng bplian ber thoo ban-chii phraw chai ber mai laeo|我需要更改账户手机号，因为已经使用新号码了。|账户
rap-ngoen-nai-chek|รับเงินในเช็ค|rap ngoen nai chek|兑现支票|动词|银行柜台|คุณลุงนำเช็คมารับเงินในเช็คที่ธนาคารตอนเช้า|khun lung nam chek maa rap ngoen nai chek thii tha-naa-khaan dtaawn chaao|叔叔早上带支票到银行兑现。|柜台
chek-cheu-ban-chii|เช็กชื่อบัญชี|chek cheu ban-chii|核对户名|动词|转账汇款|ก่อนส่งสลิป ฉันเช็กชื่อบัญชีและจำนวนเงินอีกครั้ง|gaawn song sa-lip chan chek cheu ban-chii lae jam-nuan ngoen iik khrang|发送凭条前，我再次核对户名和金额。|转账
phae-phong-khaaw-muun|แพ็กข้อมูล|phaek khaaw-muun|整理资料包|动词|地址资料|ก่อนออกไปธนาคาร ฉันแพ็กข้อมูลและเอกสารไว้ในแฟ้ม|gaawn aawk bpai tha-naa-khaan chan phaek khaaw-muun lae eek-ga-saan wai nai faem|出门去银行前，我把资料和文件整理进文件夹。|资料
faem-ek-ga-saan|แฟ้มเอกสาร|faem eek-ga-saan|文件夹|名词|地址资料|เขาเก็บใบเสร็จและสำเนาบัตรไว้ในแฟ้มเอกสาร|khao gep bai-set lae sam-nao bat wai nai faem eek-ga-saan|他把收据和证件复印件放在文件夹里。|资料
bpai-tham-thu-ra|ไปทำธุระ|bpai tham thu-ra|去办事|动词|排队办事|บ่ายนี้ฉันต้องไปทำธุระที่ธนาคารและไปรษณีย์|baai nii chan dtawng bpai tham thu-ra thii tha-naa-khaan lae bprai-sa-nii|今天下午我要去银行和邮局办事。|流程
thu-ra-suan-dtua|ธุระส่วนตัว|thu-ra suan-dtua|个人事务|名词|排队办事|เขาขอลางานครึ่งวันเพื่อจัดการธุระส่วนตัว|khao khaaw laa-ngaan khreung wan phuea jat-gaan thu-ra suan-dtua|他请半天假来处理个人事务。|流程
tham-thu-ra-hai-set|ทำธุระให้เสร็จ|tham thu-ra hai set|把事情办完|动词|排队办事|ถ้าเอกสารครบ เราจะทำธุระให้เสร็จภายในเช้าเดียว|thaa eek-ga-saan khrop rao ja tham thu-ra hai set phaai-nai chaao diao|如果资料齐全，我们会在一个上午内把事情办完。|流程
waan-khon-eun-rap|วานคนอื่นรับ|waan khon eun rap|托别人领取|动词|取件追踪|ถ้าคุณไม่ว่าง สามารถวานคนอื่นรับพัสดุแทนได้|thaa khun mai waang saa-maat waan khon eun rap phat-sa-du thaen dai|如果你没空，可以托别人代领包裹。|取件
rap-thaen|รับแทน|rap thaen|代领|动词|取件追踪|เพื่อนบ้านรับแทนฉัน เพราะฉันยังอยู่ที่ทำงาน|pheuan-baan rap thaen chan phraw chan yang yuu thii tham-ngaan|邻居替我代领，因为我还在上班。|取件
thii-yuu-mai-khrop|ที่อยู่ไม่ครบ|thii-yuu mai khrop|地址不完整|短语|地址资料|พัสดุส่งไม่ได้เพราะที่อยู่ไม่ครบและไม่มีเบอร์โทร|phat-sa-du song mai dai phraw thii-yuu mai khrop lae mai mii ber thoo|包裹无法寄出，因为地址不完整且没有电话号码。|地址
chai-bat-khit|ใช้บัตรผิด|chai bat phit|用错卡|动词|账户卡片|ฉันใช้บัตรผิดตอนกดเงิน จึงต้องเริ่มใหม่|chan chai bat phit dtaawn got ngoen jeung dtawng roem mai|我取钱时用错卡了，所以要重新开始。|卡片
tam-nuae-ng-khao-dter|ตำแหน่งเคาน์เตอร์|dtam-naeng khao-dter|柜台位置|名词|银行柜台|ป้ายบอกตำแหน่งเคาน์เตอร์อยู่เหนือประตู|bpaai baawk dtam-naeng khao-dter yuu nuea bpra-dtuu|柜台位置指示牌在门上方。|柜台
sam-rap-luuk-khaa-mai|สำหรับลูกค้าใหม่|sam-rap luuk-khaa mai|给新客户使用|短语|银行柜台|ช่องนี้สำหรับลูกค้าใหม่ที่ต้องการเปิดบัญชี|chaawng nii sam-rap luuk-khaa mai thii dtawng-gaan bpoet ban-chii|这个窗口给想开户的新客户使用。|柜台
tham-raai-gaan-mai-dai|ทำรายการไม่ได้|tham raai-gaan mai dai|无法办理|短语|排队办事|วันนี้ระบบขัดข้อง จึงทำรายการไม่ได้ชั่วคราว|wan-nii ra-bop khat-khaawng jeung tham raai-gaan mai dai chua-khraao|今天系统故障，所以暂时无法办理。|流程
ra-bop-khat-khaawng|ระบบขัดข้อง|ra-bop khat-khaawng|系统故障|短语|排队办事|เมื่อระบบขัดข้อง เจ้าหน้าที่ขอให้ลูกค้ารอสักครู่|meua ra-bop khat-khaawng jao-naa-thii khaaw hai luuk-khaa raaw sak khruu|系统故障时，工作人员请客户稍等。|流程
maai-het-bon-bai-set|หมายเหตุบนใบเสร็จ|maai-het bon bai-set|收据备注|名词|费用收据|หมายเหตุบนใบเสร็จเขียนว่าชำระเงินครบแล้ว|maai-het bon bai-set khiian waa cham-ra ngoen khrop laeo|收据备注写着款项已付清。|收据
chai-ek-ga-saan-arai|ใช้เอกสารอะไร|chai eek-ga-saan a-rai|需要什么文件|短语|银行柜台|ขอโทษครับ เปิดบัญชีใหม่ต้องใช้เอกสารอะไรบ้าง|khaaw-thoot khrap bpoet ban-chii mai dtawng chai eek-ga-saan a-rai baang|不好意思，新开户需要哪些文件？|询问
song-thii-nai|ส่งที่ไหน|song thii nai|在哪里寄|短语|邮局寄件|ถ้าจะส่งพัสดุไปต่างจังหวัด ต้องส่งที่ไหนคะ|thaa ja song phat-sa-du bpai dtaang-jang-wat dtawng song thii nai kha|如果要寄包裹到外府，要在哪里寄？|询问
rap-khaawng-thii-nai|รับของที่ไหน|rap khaawng thii nai|在哪里取东西|短语|取件追踪|ข้อความบอกว่าพัสดุถึงแล้ว แต่ต้องรับของที่ไหน|khaaw-khwaam baawk waa phat-sa-du theung laeo dtae dtawng rap khaawng thii nai|消息说包裹到了，但要在哪里取？|询问
rao-nok-saa-khaa|รอนอกสาขา|raaw naawk saa-khaa|在分行外等待|动词|排队办事|เพราะคนเยอะมาก ลูกค้าหลายคนต้องรอนอกสาขา|phraw khon yoe maak luuk-khaa laai khon dtawng raaw naawk saa-khaa|因为人很多，许多客户必须在分行外等待。|排队
jaeng-wat-thu-khaang-nai|แจ้งวัตถุข้างใน|jaeng wat-thu khaang-nai|申报内装物品|动词|邮局寄件|ก่อนส่งพัสดุไปต่างประเทศ ต้องแจ้งวัตถุข้างใน|gaawn song phat-sa-du bpai dtaang-bpra-thet dtawng jaeng wat-thu khaang-nai|寄包裹到国外前，必须申报内装物品。|寄件
waen-khian-thii-yuu|แผ่นเขียนที่อยู่|phaen khiian thii-yuu|地址贴纸|名词|地址资料|พนักงานให้แผ่นเขียนที่อยู่มาติดบนกล่อง|pha-nak-ngaan hai phaen khiian thii-yuu maa dtit bon glaawng|工作人员给了地址贴纸，让我贴在盒子上。|地址
dtit-bpaai-thii-yuu|ติดป้ายที่อยู่|dtit bpaai thii-yuu|贴地址标签|动词|地址资料|หลังกรอกครบแล้ว ให้ติดป้ายที่อยู่ด้านบนกล่อง|lang graawk khrop laeo hai dtit bpaai thii-yuu daan bon glaawng|填写完整后，请把地址标签贴在盒子上方。|地址
dtit-dtaam-duai-ber|ติดตามด้วยเบอร์|dtit-dtaam duai ber|用电话追踪|动词|取件追踪|ถ้าไม่มีเลขพัสดุ ลองติดตามด้วยเบอร์ผู้รับ|thaa mai mii lek phat-sa-du laawng dtit-dtaam duai ber phuu rap|如果没有包裹单号，试着用收件人电话追踪。|追踪
waan-jao-naa-thii-chuai|วานเจ้าหน้าที่ช่วย|waan jao-naa-thii chuai|请工作人员帮忙|动词|排队办事|ถ้าเครื่องอ่านบัตรไม่ได้ วานเจ้าหน้าที่ช่วยได้เลย|thaa khreuuang aan bat mai dai waan jao-naa-thii chuai dai loei|如果机器读不了卡，可以请工作人员帮忙。|流程
`;

export const VOCABULARY_EXPANSION_A2_BANK_POST_OFFICE_ERRANDS_01: VocabularyExpansionA2BankPostOfficeErrandsCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
