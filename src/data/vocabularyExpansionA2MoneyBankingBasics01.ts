type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "现金零钱" | "银行卡账户" | "转账支付" | "账单收据" | "余额记录" | "押金退款" | "个人预算" | "银行服务";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2MoneyBankingBasicsCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-banking-basic-context", "pythainlp-corpus", "kaikki-wiktionary-thai"];

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
  collocationThai: string;
  collocationRoman: string;
  collocationChinese: string;
  relatedThai: string;
  relatedRoman: string;
  relatedChinese: string;
  tag: string;
};

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      const [
        id,
        thai,
        roman,
        chinese,
        partOfSpeech,
        theme,
        exampleThai,
        exampleRoman,
        exampleChinese,
        collocationThai,
        collocationRoman,
        collocationChinese,
        relatedThai,
        relatedRoman,
        relatedChinese,
        tag,
      ] = parts;
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, collocationThai, collocationRoman, collocationChinese, relatedThai, relatedRoman, relatedChinese, tag };
    });
}

function buildCandidate(row: Row, index: number): VocabularyExpansionA2MoneyBankingBasicsCandidate {
  return {
    id: row.id,
    thai: row.thai,
    roman: row.roman,
    chinese: row.chinese,
    partOfSpeech: row.partOfSpeech,
    theme: row.theme,
    level: "a2",
    priority: index + 1,
    senses: [
      {
        id: "main",
        chinese: row.chinese,
        examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }],
        usageNotesZh: [`${row.thai} 是基础个人钱款或银行服务表达，常用于付款、转账、查账和日常预算。`],
      },
    ],
    synonyms: [{ thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese }],
    antonyms: [],
    comparisons: [
      {
        kind: "易混",
        target: { thai: row.relatedThai, roman: row.relatedRoman, chinese: row.relatedChinese },
        distinctionZh: `${row.thai} 表示“${row.chinese}”；${row.relatedThai} 表示“${row.relatedChinese}”，要分清现金、账户、支付动作和凭证。`,
      },
    ],
    collocations: [{ thai: row.collocationThai, roman: row.collocationRoman, chinese: row.collocationChinese }],
    usageNotesZh: ["A2 阶段可先掌握固定句：จ่ายด้วย..., โอนให้..., ขอใบเสร็จ..., ยอดเงินเหลือ...。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
ngoen-sot|เงินสด|ngoen sot|现金|名词|现金零钱|ร้านเล็กนี้รับเงินสดเท่านั้น ยังสแกนจ่ายไม่ได้|raan lek nii rap ngoen sot thao-nan yang sa-gaaen jaai mai dai|这家小店只收现金，还不能扫码支付。|จ่ายเงินสด|jaai ngoen sot|付现金|เงินโอน|ngoen oon|转账的钱|现金
ngoen-thawn|เงินทอน|ngoen thaawn|找零；零钱找回|名词|现金零钱|แม่ตรวจเงินทอนก่อนเดินออกจากร้านค้า|maae dtruat ngoen thaawn gaawn doen aawk jaak raan khaa|妈妈走出商店前检查找零。|รับเงินทอน|rap ngoen thaawn|收找零|จ่ายพอดี|jaai phaaw-dii|付正好|现金
jaai-phaaw-dii|จ่ายพอดี|jaai phaaw-dii|付正好|动词|现金零钱|ถ้ามีเหรียญพอ ฉันจะจ่ายพอดีไม่ต้องรอเงินทอน|thaa mii riian phaaw chan ja jaai phaaw-dii mai dtawng raaw ngoen thaawn|如果硬币够，我会付正好，不用等找零。|จ่ายเงินพอดี|jaai ngoen phaaw-dii|付正好的钱|เงินทอน|ngoen thaawn|找零|现金
thanabat|ธนบัตร|tha-na-bat|纸币|名词|现金零钱|ธนบัตรห้าร้อยบาทอยู่ในกระเป๋าสตางค์ของพ่อ|tha-na-bat haa raawy baat yuu nai gra-bpao sa-dtaang khaawng phaaw|五百泰铢纸币在爸爸的钱包里。|ใช้ธนบัตรใหญ่|chai tha-na-bat yai|用大面额纸币|เหรียญ|riian|硬币|现金
riian|เหรียญ|riian|硬币|名词|现金零钱|ฉันเก็บเหรียญไว้จ่ายค่ารถเมล์ตอนเช้า|chan gep riian wai jaai khaa rot-mee dtaawn chaao|我留着硬币早上付公交费。|เหรียญสิบบาท|riian sip baat|十泰铢硬币|ธนบัตร|tha-na-bat|纸币|现金
gra-bpao-sa-dtaang|กระเป๋าสตางค์|gra-bpao sa-dtaang|钱包|名词|现金零钱|กระเป๋าสตางค์ของฉันมีเงินสดและบัตรเอทีเอ็ม|gra-bpao sa-dtaang khaawng chan mii ngoen sot lae bat ee-thii-em|我的钱包里有现金和 ATM 卡。|เปิดกระเป๋าสตางค์|bpoet gra-bpao sa-dtaang|打开钱包|แอปธนาคาร|aaep tha-naa-khaan|银行应用|现金
tham-ngoen-haai|ทำเงินหาย|tham ngoen haai|把钱弄丢|动词|现金零钱|เขาทำเงินหายในตลาด จึงต้องกลับไปหาอีกครั้ง|khao tham ngoen haai nai dta-laat jeung dtawng glap bpai haa iik khrang|他在市场把钱弄丢了，所以要回去再找。|ทำเงินสดหาย|tham ngoen sot haai|弄丢现金|เก็บเงินได้|gep ngoen dai|捡到钱|现金
gep-ngoen-dai|เก็บเงินได้|gep ngoen dai|捡到钱|动词|现金零钱|ถ้าเก็บเงินได้ ควรส่งให้เจ้าหน้าที่ ไม่ควรเก็บไว้เอง|thaa gep ngoen dai khuuan song hai jao-naa-thii mai khuuan gep wai eeng|如果捡到钱，应该交给工作人员，不应该自己留着。|เก็บเงินได้ในร้าน|gep ngoen dai nai raan|在店里捡到钱|ทำเงินหาย|tham ngoen haai|把钱弄丢|现金
ban-chii-tha-naa-khaan|บัญชีธนาคาร|ban-chii tha-naa-khaan|银行账户|名词|银行卡账户|ฉันใช้บัญชีธนาคารนี้รับเงินเดือนทุกเดือน|chan chai ban-chii tha-naa-khaan nii rap ngoen-deuan thuk duean|我用这个银行账户每个月收工资。|เปิดบัญชีธนาคาร|bpoet ban-chii tha-naa-khaan|开银行账户|กระเป๋าสตางค์|gra-bpao sa-dtaang|钱包|账户
lek-ban-chii|เลขบัญชี|leek ban-chii|账号|名词|银行卡账户|ก่อนโอนเงิน ต้องตรวจเลขบัญชีให้ถูกต้อง|gaawn oon ngoen dtawng dtruat leek ban-chii hai thuuk-dtawng|转账前，必须检查账号是否正确。|ส่งเลขบัญชี|song leek ban-chii|发送账号|ชื่อบัญชี|chue ban-chii|账户名|账户
chue-ban-chii|ชื่อบัญชี|chue ban-chii|账户名|名词|银行卡账户|ชื่อบัญชีต้องตรงกับชื่อคนที่เราจะโอนเงินให้|chue ban-chii dtawng dtrong gap chue khon thii rao ja oon ngoen hai|账户名必须和我们要转账给的人名一致。|ตรวจชื่อบัญชี|dtruat chue ban-chii|核对账户名|เลขบัญชี|leek ban-chii|账号|账户
bpoet-ban-chii|เปิดบัญชี|bpoet ban-chii|开户|动词|银行卡账户|นักเรียนต่างชาติเปิดบัญชีได้ที่สาขาธนาคารใกล้มหาวิทยาลัย|nak-riian dtaang-chaat bpoet ban-chii dai thii saa-khaa tha-naa-khaan glai ma-haa-wit-tha-yaa-lai|外国学生可以在大学附近的银行网点开户。|เปิดบัญชีใหม่|bpoet ban-chii mai|开新账户|ปิดบัญชี|bpit ban-chii|销户|账户
bpit-ban-chii|ปิดบัญชี|bpit ban-chii|销户；关闭账户|动词|银行卡账户|ถ้าไม่ใช้บัญชีนี้แล้ว คุณสามารถปิดบัญชีได้|thaa mai chai ban-chii nii laaeo khun saa-maat bpit ban-chii dai|如果不再用这个账户了，你可以销户。|ปิดบัญชีเก่า|bpit ban-chii gao|关闭旧账户|เปิดบัญชี|bpoet ban-chii|开户|账户
bat-ee-thii-em|บัตรเอทีเอ็ม|bat ee-thii-em|ATM 卡|名词|银行卡账户|บัตรเอทีเอ็มของฉันอยู่ในกระเป๋าสตางค์ใบเล็ก|bat ee-thii-em khaawng chan yuu nai gra-bpao sa-dtaang bai lek|我的 ATM 卡在小钱包里。|ใช้บัตรเอทีเอ็ม|chai bat ee-thii-em|使用 ATM 卡|บัตรเดบิต|bat dee-bit|借记卡|卡
bat-dee-bit|บัตรเดบิต|bat dee-bit|借记卡|名词|银行卡账户|ฉันใช้บัตรเดบิตจ่ายค่าของในซูเปอร์มาร์เก็ต|chan chai bat dee-bit jaai khaa khaawng nai suu-bpooe-maa-get|我用借记卡在超市付款。|จ่ายด้วยบัตรเดบิต|jaai duai bat dee-bit|用借记卡付款|บัตรเครดิต|bat khree-dit|信用卡|卡
bat-khree-dit|บัตรเครดิต|bat khree-dit|信用卡|名词|银行卡账户|พ่อใช้บัตรเครดิตเฉพาะตอนซื้อของชิ้นใหญ่|phaaw chai bat khree-dit cha-phaw dtaawn sue khaawng chin yai|爸爸只在买大件东西时用信用卡。|รูดบัตรเครดิต|ruut bat khree-dit|刷信用卡|บัตรเดบิต|bat dee-bit|借记卡|卡
rat-phin|รหัสพิน|ra-hat phin|PIN 码|名词|银行卡账户|อย่าบอกรหัสพินให้คนอื่น แม้เป็นเพื่อนสนิท|yaa baawk ra-hat phin hai khon euen maae bpen phuean sa-nit|不要把 PIN 码告诉别人，即使是好朋友。|กดรหัสพิน|got ra-hat phin|输入 PIN 码|รหัสผ่าน|ra-hat phaan|密码|安全
rat-phaan|รหัสผ่าน|ra-hat phaan|密码|名词|银行卡账户|ฉันเปลี่ยนรหัสผ่านแอปธนาคารทุกสามเดือน|chan bpliian ra-hat phaan aaep tha-naa-khaan thuk saam duean|我每三个月更换银行应用密码。|ลืมรหัสผ่าน|luem ra-hat phaan|忘记密码|รหัสพิน|ra-hat phin|PIN 码|安全
luem-rat|ลืมรหัส|luem ra-hat|忘记密码；忘记代码|动词|银行卡账户|ถ้าลืมรหัส ต้องติดต่อธนาคารเพื่อเปลี่ยนใหม่|thaa luem ra-hat dtawng dtit-dtaaw tha-naa-khaan phuea bpliian mai|如果忘记密码，必须联系银行更换新的。|ลืมรหัสพิน|luem ra-hat phin|忘记 PIN 码|จำรหัสได้|jam ra-hat dai|记得密码|安全
bplian-rat|เปลี่ยนรหัส|bpliian ra-hat|更改密码|动词|银行卡账户|หลังใช้เครื่องสาธารณะ ฉันเปลี่ยนรหัสเพื่อความปลอดภัย|lang chai khreuuang saa-thaa-ra-na chan bpliian ra-hat phuea khwaam bplaawt-phai|使用公共设备后，我为了安全更改密码。|เปลี่ยนรหัสผ่าน|bpliian ra-hat phaan|更改密码|ลืมรหัส|luem ra-hat|忘记密码|安全
tuu-ee-thii-em|ตู้เอทีเอ็ม|dtuu ee-thii-em|ATM 机|名词|银行服务|ตู้เอทีเอ็มหน้าธนาคารใช้ได้ตลอดยี่สิบสี่ชั่วโมง|dtuu ee-thii-em naa tha-naa-khaan chai dai dta-laawt yii-sip-sii chua-moong|银行前的 ATM 机二十四小时可用。|ใช้ตู้เอทีเอ็ม|chai dtuu ee-thii-em|使用 ATM 机|สาขาธนาคาร|saa-khaa tha-naa-khaan|银行网点|服务
got-ngoen|กดเงิน|got ngoen|取钱；从 ATM 取款|动词|银行服务|ฉันกดเงินห้าร้อยบาทจากตู้เอทีเอ็มก่อนขึ้นรถ|chan got ngoen haa raawy baat jaak dtuu ee-thii-em gaawn kheun rot|上车前，我从 ATM 取了五百泰铢。|กดเงินสด|got ngoen sot|取现金|ฝากเงิน|faak ngoen|存钱|服务
faak-ngoen|ฝากเงิน|faak ngoen|存钱|动词|银行服务|ทุกต้นเดือนฉันฝากเงินออมเข้าบัญชีแยก|thuk dton duean chan faak ngoen aawm khao ban-chii yaaek|每个月初我把储蓄存进单独账户。|ฝากเงินเข้าบัญชี|faak ngoen khao ban-chii|把钱存进账户|ถอนเงิน|thaawn ngoen|取款|服务
thaawn-ngoen|ถอนเงิน|thaawn ngoen|取款；提现|动词|银行服务|ถ้าจะจ่ายค่าเช่าเป็นเงินสด ต้องถอนเงินก่อน|thaa ja jaai khaa chao bpen ngoen sot dtawng thaawn ngoen gaawn|如果要用现金付房租，必须先取款。|ถอนเงินจากบัญชี|thaawn ngoen jaak ban-chii|从账户取钱|ฝากเงิน|faak ngoen|存钱|服务
saa-khaa-tha-naa-khaan|สาขาธนาคาร|saa-khaa tha-naa-khaan|银行网点；分行|名词|银行服务|สาขาธนาคารนี้เปิดถึงสามโมงครึ่ง|saa-khaa tha-naa-khaan nii bpoet thueng saam moong khrueng|这个银行网点开到三点半。|ไปสาขาธนาคาร|bpai saa-khaa tha-naa-khaan|去银行网点|ตู้เอทีเอ็ม|dtuu ee-thii-em|ATM 机|服务
khao-dtooe-tha-naa-khaan|เคาน์เตอร์ธนาคาร|khao-dtooe tha-naa-khaan|银行柜台|名词|银行服务|ถ้าบัตรหาย ให้ติดต่อเคาน์เตอร์ธนาคารทันที|thaa bat haai hai dtit-dtaaw khao-dtooe tha-naa-khaan than-thii|如果卡丢了，请马上联系银行柜台。|ถามที่เคาน์เตอร์ธนาคาร|thaam thii khao-dtooe tha-naa-khaan|在银行柜台询问|ตู้เอทีเอ็ม|dtuu ee-thii-em|ATM 机|服务
bat-haai|บัตรหาย|bat haai|卡丢了|短语|银行卡账户|เมื่อรู้ว่าบัตรหาย ฉันรีบโทรหาธนาคาร|muea ruu waa bat haai chan riip thoo haa tha-naa-khaan|知道卡丢了时，我赶快给银行打电话。|แจ้งบัตรหาย|jaaeng bat haai|报告卡丢失|บัตรอยู่|bat yuu|卡还在|安全
awk-bat-mai|ออกบัตรใหม่|aawk bat mai|补办新卡；发新卡|动词|银行卡账户|ธนาคารออกบัตรใหม่ให้ฉันหลังบัตรเดิมหาย|tha-naa-khaan aawk bat mai hai chan lang bat doem haai|旧卡丢失后，银行给我补办了新卡。|ขอออกบัตรใหม่|khaaw aawk bat mai|申请新卡|ใช้บัตรเดิม|chai bat doem|用原来的卡|卡
oon-ngoen|โอนเงิน|oon ngoen|转账|动词|转账支付|ฉันโอนเงินค่าเช่าให้เจ้าของห้องทุกสิ้นเดือน|chan oon ngoen khaa chao hai jao-khaawng haawng thuk sin duean|我每个月底把房租转给房东。|โอนเงินผ่านแอป|oon ngoen phaan aaep|通过应用转账|รับเงินโอน|rap ngoen oon|收转账|转账
rap-ngoen-oon|รับเงินโอน|rap ngoen oon|收转账|动词|转账支付|ร้านนี้รับเงินโอนและสแกนจ่ายได้|raan nii rap ngoen oon lae sa-gaaen jaai dai|这家店收转账，也可以扫码支付。|รับเงินโอนเข้าบัญชี|rap ngoen oon khao ban-chii|收转账到账户|โอนเงิน|oon ngoen|转账|转账
oon-phit|โอนผิด|oon phit|转错账|动词|转账支付|ถ้าโอนผิดบัญชี ต้องรีบติดต่อธนาคารและผู้รับเงิน|thaa oon phit ban-chii dtawng riip dtit-dtaaw tha-naa-khaan lae phuu rap ngoen|如果转错账户，必须赶快联系银行和收款人。|โอนเงินผิด|oon ngoen phit|转账转错|โอนถูก|oon thuuk|转对|转账
oon-glap|โอนกลับ|oon glap|转回；退回转账|动词|转账支付|เขาโอนกลับให้ฉันทันทีหลังรู้ว่าได้รับเงินเกิน|khao oon glap hai chan than-thii lang ruu waa dai rap ngoen goen|他知道多收钱后，马上转回给我。|โอนเงินกลับ|oon ngoen glap|把钱转回|รับไว้|rap wai|收下|转账
slip-oon|สลิปโอน|sa-lip oon|转账凭证截图；转账单|名词|转账支付|หลังโอนเงินแล้ว กรุณาส่งสลิปโอนให้ร้านดู|lang oon ngoen laaeo ga-ru-naa song sa-lip oon hai raan duu|转账后，请把转账凭证发给店家看。|ส่งสลิปโอน|song sa-lip oon|发送转账凭证|ใบเสร็จ|bai-set|收据|凭证
phrom-phen|พร้อมเพย์|phraawm-phee|PromptPay；泰国快捷转账|名词|转账支付|ฉันใช้พร้อมเพย์รับเงินจากเพื่อนง่ายมาก|chan chai phraawm-phee rap ngoen jaak phuean ngaai maak|我用 PromptPay 从朋友那里收钱很方便。|โอนผ่านพร้อมเพย์|oon phaan phraawm-phee|通过 PromptPay 转账|เลขบัญชี|leek ban-chii|账号|转账
lek-phrom-phen|เลขพร้อมเพย์|leek phraawm-phee|PromptPay 号码|名词|转账支付|ขอเลขพร้อมเพย์หน่อย ฉันจะโอนค่าข้าวให้|khaaw leek phraawm-phee naawy chan ja oon khaa khaao hai|请给我 PromptPay 号码，我转饭钱给你。|ส่งเลขพร้อมเพย์|song leek phraawm-phee|发送 PromptPay 号码|เลขบัญชี|leek ban-chii|账号|转账
sa-gaan-jaai|สแกนจ่าย|sa-gaaen jaai|扫码支付|动词|转账支付|ร้านกาแฟนี้สแกนจ่ายได้ ไม่ต้องใช้เงินสด|raan gaa-faae nii sa-gaaen jaai dai mai dtawng chai ngoen sot|这家咖啡店可以扫码支付，不用现金。|สแกนจ่ายด้วยมือถือ|sa-gaaen jaai duai mue-thue|用手机扫码支付|จ่ายเงินสด|jaai ngoen sot|付现金|支付
khiu-aa-khoot|คิวอาร์โค้ด|khiu-aa khoot|二维码|名词|转账支付|คิวอาร์โค้ดอยู่ข้างเครื่องคิดเงิน|khiu-aa khoot yuu khaang khreuuang khit ngoen|二维码在收银机旁边。|สแกนคิวอาร์โค้ด|sa-gaaen khiu-aa khoot|扫描二维码|เลขบัญชี|leek ban-chii|账号|支付
jaai-phaan-aaep|จ่ายผ่านแอป|jaai phaan aaep|通过应用付款|动词|转账支付|ฉันจ่ายผ่านแอปธนาคารแล้วและมีสลิปโอน|chan jaai phaan aaep tha-naa-khaan laaeo lae mii sa-lip oon|我已经通过银行应用付款了，并有转账凭证。|จ่ายผ่านแอปมือถือ|jaai phaan aaep mue-thue|通过手机应用付款|จ่ายที่เคาน์เตอร์|jaai thii khao-dtooe|在柜台付款|支付
aaep-tha-naa-khaan|แอปธนาคาร|aaep tha-naa-khaan|银行应用|名词|转账支付|แอปธนาคารแจ้งเตือนเมื่อมีเงินเข้า|aaep tha-naa-khaan jaaeng-dteuan muea mii ngoen khao|有钱到账时，银行应用会提醒。|เปิดแอปธนาคาร|bpoet aaep tha-naa-khaan|打开银行应用|สาขาธนาคาร|saa-khaa tha-naa-khaan|银行网点|支付
jaeng-dteuan-ngoen-khao|แจ้งเตือนเงินเข้า|jaaeng-dteuan ngoen khao|到账提醒|名词|余额记录|เมื่อเงินเดือนเข้า ฉันได้รับแจ้งเตือนเงินเข้าทันที|muea ngoen-deuan khao chan dai rap jaaeng-dteuan ngoen khao than-thii|工资到账时，我马上收到到账提醒。|เปิดแจ้งเตือนเงินเข้า|bpoet jaaeng-dteuan ngoen khao|开启到账提醒|ประวัติรายการ|bpra-wat raai-gaan|交易记录|记录
yawt-ngoen|ยอดเงิน|yaawt ngoen|金额；账户金额|名词|余额记录|กรุณาตรวจยอดเงินก่อนกดยืนยันโอน|ga-ru-naa dtruat yaawt ngoen gaawn got yuen-yan oon|请在按确认转账前检查金额。|ตรวจยอดเงิน|dtruat yaawt ngoen|检查金额|ยอดคงเหลือ|yaawt khong-luea|余额|记录
yawt-khong-luea|ยอดคงเหลือ|yaawt khong-luea|余额|名词|余额记录|ยอดคงเหลือในบัญชีของฉันยังพอจ่ายบิลเดือนนี้|yaawt khong-luea nai ban-chii khaawng chan yang phaaw jaai bin duean nii|我账户里的余额还够付这个月账单。|เช็กยอดคงเหลือ|chek yaawt khong-luea|查余额|ยอดเงิน|yaawt ngoen|金额|记录
check-yawt|เช็กยอด|chek yaawt|查余额；核对金额|动词|余额记录|ก่อนซื้อของชิ้นใหญ่ ฉันเช็กยอดในบัญชีก่อน|gaawn sue khaawng chin yai chan chek yaawt nai ban-chii gaawn|买大件东西前，我先查账户余额。|เช็กยอดในแอป|chek yaawt nai aaep|在应用里查余额|ถอนเงิน|thaawn ngoen|取款|记录
ngoen-khao|เงินเข้า|ngoen khao|钱进账；到账|名词|余额记录|วันนี้มีเงินเข้าเพราะลูกค้าจ่ายค่าของแล้ว|wan-nii mii ngoen khao phraw luuk-khaa jaai khaa khaawng laaeo|今天有钱到账，因为客户已经付货款了。|เงินเข้าบัญชี|ngoen khao ban-chii|钱到账户|เงินออก|ngoen aawk|钱支出|记录
ngoen-aawk|เงินออก|ngoen aawk|钱支出；扣款|名词|余额记录|แอปแจ้งว่าเงินออกตอนฉันจ่ายบิลค่าไฟ|aaep jaaeng waa ngoen aawk dtaawn chan jaai bin khaa fai|应用提示我付电费账单时有钱支出。|ดูเงินออก|duu ngoen aawk|看支出|เงินเข้า|ngoen khao|钱进账|记录
raai-rap|รายรับ|raai-rap|收入|名词|个人预算|รายรับเดือนนี้มาจากเงินเดือนและงานพิเศษเล็กน้อย|raai-rap duean nii maa jaak ngoen-deuan lae ngaan phi-seet lek naawy|这个月收入来自工资和一点兼职。|บันทึกรายรับ|ban-thuek raai-rap|记录收入|รายจ่าย|raai-jaai|支出|预算
raai-jaai|รายจ่าย|raai-jaai|支出|名词|个人预算|ฉันจดรายจ่ายทุกวันเพื่อดูว่าใช้เงินกับอะไร|chan jot raai-jaai thuk wan phuea duu waa chai ngoen gap a-rai|我每天记支出，看看钱花在什么上。|บันทึกรายจ่าย|ban-thuek raai-jaai|记录支出|รายรับ|raai-rap|收入|预算
khaa-chai-jaai|ค่าใช้จ่าย|khaa chai-jaai|费用；开销|名词|个人预算|ค่าใช้จ่ายเดือนนี้สูงเพราะต้องซ่อมโทรศัพท์|khaa chai-jaai duean nii suung phraw dtawng saawm thoo-ra-sap|这个月开销高，因为要修手机。|ลดค่าใช้จ่าย|lot khaa chai-jaai|减少开销|รายรับ|raai-rap|收入|预算
ban-thuek-raai-jaai|บันทึกรายจ่าย|ban-thuek raai-jaai|记录支出|动词|个人预算|ฉันบันทึกรายจ่ายในมือถือหลังซื้อของทุกครั้ง|chan ban-thuek raai-jaai nai mue-thue lang sue khaawng thuk khrang|我每次买东西后都在手机里记录支出。|บันทึกรายจ่ายประจำวัน|ban-thuek raai-jaai bpra-jam wan|记录每日支出|ลืมจด|luem jot|忘记记|预算
ngop-suan-dtua|งบส่วนตัว|ngop suan-dtua|个人预算|名词|个人预算|เดือนนี้งบส่วนตัวของฉันสำหรับอาหารคือสามพันบาท|duean nii ngop suan-dtua khaawng chan sam-rap aa-haan khue saam phan baat|这个月我的餐饮个人预算是三千泰铢。|ตั้งงบส่วนตัว|dtang ngop suan-dtua|设定个人预算|ใช้เกินงบ|chai goen ngop|超预算|预算
chai-goen-ngop|ใช้เกินงบ|chai goen ngop|超预算|动词|个人预算|ถ้าซื้อเสื้ออีกตัว ฉันจะใช้เกินงบเดือนนี้|thaa sue suea iik dtua chan ja chai goen ngop duean nii|如果再买一件衣服，我这个月会超预算。|ใช้เงินเกินงบ|chai ngoen goen ngop|花钱超预算|อยู่ในงบ|yuu nai ngop|在预算内|预算
yuu-nai-ngop|อยู่ในงบ|yuu nai ngop|在预算内|短语|个人预算|ร้านนี้ราคาอยู่ในงบ เราจึงกินที่นี่ได้|raan nii raa-khaa yuu nai ngop rao jeung gin thii nii dai|这家店价格在预算内，所以我们可以在这里吃。|เลือกของที่อยู่ในงบ|leuuak khaawng thii yuu nai ngop|选择预算内的东西|ใช้เกินงบ|chai goen ngop|超预算|预算
aawm-ngoen|ออมเงิน|aawm ngoen|存钱；储蓄|动词|个人预算|ฉันออมเงินเดือนละหนึ่งพันบาทเพื่อซื้อคอมพิวเตอร์ใหม่|chan aawm ngoen duean la neung phan baat phuea sue khawm-phiu-dtooe mai|我每月存一千泰铢，为了买新电脑。|ออมเงินทุกเดือน|aawm ngoen thuk duean|每月存钱|ใช้เงินหมด|chai ngoen mot|把钱花完|储蓄
ngoen-aawm|เงินออม|ngoen aawm|储蓄；存款|名词|个人预算|เงินออมก้อนเล็กช่วยให้ฉันไม่กังวลตอนป่วย|ngoen aawm gaawn lek chuai hai chan mai gang-won dtaawn bpuai|一小笔储蓄让我生病时不担心。|มีเงินออม|mii ngoen aawm|有储蓄|หนี้|nii|债务|储蓄
bpra-yat-ngoen|ประหยัดเงิน|bpra-yat ngoen|省钱|动词|个人预算|ฉันทำอาหารเองเพื่อประหยัดเงินตอนปลายเดือน|chan tham aa-haan eeng phuea bpra-yat ngoen dtaawn bplaai duean|我月底自己做饭来省钱。|ประหยัดเงินค่าอาหาร|bpra-yat ngoen khaa aa-haan|节省餐费|ใช้เงินเยอะ|chai ngoen yoe|花很多钱|预算
chai-ngoen|ใช้เงิน|chai ngoen|花钱；用钱|动词|个人预算|วันหยุดนี้ฉันไม่อยากใช้เงินเยอะ|wan-yut nii chan mai yaak chai ngoen yoe|这个假日我不想花很多钱。|ใช้เงินอย่างระวัง|chai ngoen yaang ra-wang|谨慎花钱|ออมเงิน|aawm ngoen|存钱|预算
ngoen-phaaw|เงินพอ|ngoen phaaw|钱够|短语|余额记录|เงินพอจ่ายค่าเช่าเดือนนี้ แต่ไม่พอซื้อโทรศัพท์ใหม่|ngoen phaaw jaai khaa chao duean nii dtaae mai phaaw sue thoo-ra-sap mai|钱够付这个月房租，但不够买新手机。|มีเงินพอ|mii ngoen phaaw|有足够的钱|เงินไม่พอ|ngoen mai phaaw|钱不够|余额
ngoen-mai-phaaw|เงินไม่พอ|ngoen mai phaaw|钱不够|短语|余额记录|ถ้าเงินไม่พอ เราควรเลือกของที่ถูกกว่า|thaa ngoen mai phaaw rao khuuan leuuak khaawng thii thuuk gwaa|如果钱不够，我们应该选更便宜的东西。|เงินไม่พอจ่าย|ngoen mai phaaw jaai|钱不够付|เงินพอ|ngoen phaaw|钱够|余额
ngoen-mot|เงินหมด|ngoen mot|钱花完了|短语|余额记录|ก่อนสิ้นเดือนฉันเงินหมด เพราะใช้เกินงบ|gaawn sin duean chan ngoen mot phraw chai goen ngop|月底前我钱花完了，因为超预算。|เงินสดหมด|ngoen sot mot|现金用完|เงินเหลือ|ngoen luea|剩钱|余额
ngoen-luea|เงินเหลือ|ngoen luea|剩钱|短语|余额记录|หลังจ่ายบิลทั้งหมด ฉันยังมีเงินเหลือห้าร้อยบาท|lang jaai bin thang-mot chan yang mii ngoen luea haa raawy baat|付完所有账单后，我还剩五百泰铢。|เงินเหลือปลายเดือน|ngoen luea bplaai duean|月底有剩钱|เงินหมด|ngoen mot|钱花完|余额
ngoen-deuan|เงินเดือน|ngoen-deuan|工资；月薪|名词|个人预算|เงินเดือนเข้าบัญชีทุกวันที่ยี่สิบห้า|ngoen-deuan khao ban-chii thuk wan thii yii-sip-haa|工资每月二十五号进账户。|รับเงินเดือน|rap ngoen-deuan|领工资|รายจ่าย|raai-jaai|支出|收入
rap-ngoen-deuan|รับเงินเดือน|rap ngoen-deuan|领工资；收到工资|动词|个人预算|เมื่อรับเงินเดือนแล้ว ฉันจ่ายบิลก่อนออมเงิน|muea rap ngoen-deuan laaeo chan jaai bin gaawn aawm ngoen|收到工资后，我先付账单再存钱。|รับเงินเดือนปลายเดือน|rap ngoen-deuan bplaai duean|月底领工资|จ่ายรายเดือน|jaai raai duean|按月支付|收入
dton-duean|ต้นเดือน|dton duean|月初|名词|个人预算|ต้นเดือนฉันตั้งงบอาหารและค่าเดินทาง|dton duean chan dtang ngop aa-haan lae khaa doen-thaang|月初我设定餐饮和交通预算。|จ่ายต้นเดือน|jaai dton duean|月初付款|ปลายเดือน|bplaai duean|月底|时间
bplaai-duean|ปลายเดือน|bplaai duean|月底|名词|个人预算|ปลายเดือนต้องประหยัดเงินมากขึ้นเพราะเงินเหลือน้อย|bplaai duean dtawng bpra-yat ngoen maak kheun phraw ngoen luea naawy|月底要更省钱，因为剩的钱少。|เงินปลายเดือน|ngoen bplaai duean|月底的钱|ต้นเดือน|dton duean|月初|时间
sin-duean|สิ้นเดือน|sin duean|月底；月末|名词|个人预算|สิ้นเดือนฉันต้องโอนค่าเช่าให้เจ้าของห้อง|sin duean chan dtawng oon khaa chao hai jao-khaawng haawng|月末我必须把房租转给房东。|จ่ายสิ้นเดือน|jaai sin duean|月末付款|ต้นเดือน|dton duean|月初|时间
bin|บิล|bin|账单|名词|账单收据|บิลค่าไฟวางอยู่บนโต๊ะใกล้ประตู|bin khaa fai waang yuu bon dto glai bpra-dtuu|电费账单放在门旁边的桌上。|ดูบิล|duu bin|看账单|ใบเสร็จ|bai-set|收据|账单
jaai-bin|จ่ายบิล|jaai bin|付账单|动词|账单收据|ฉันจ่ายบิลค่าน้ำผ่านแอปธนาคารเมื่อคืน|chan jaai bin khaa naam phaan aaep tha-naa-khaan muea-khuen|我昨晚通过银行应用付了水费账单。|จ่ายบิลออนไลน์|jaai bin awn-lai|线上付账单|ค้างจ่าย|khaang jaai|拖欠未付|账单
bin-khaang|บิลค้าง|bin khaang|未付账单|名词|账单收据|ถ้ามีบิลค้างหลายใบ ควรจ่ายใบที่สำคัญก่อน|thaa mii bin khaang laai bai khuuan jaai bai thii sam-khan gaawn|如果有好几张未付账单，应该先付重要的那张。|ตรวจบิลค้าง|dtruat bin khaang|检查未付账单|บิลที่จ่ายแล้ว|bin thii jaai laaeo|已付账单|账单
khaang-jaai|ค้างจ่าย|khaang jaai|拖欠未付|动词|账单收据|ฉันไม่อยากค้างจ่ายค่าเช่า จึงโอนก่อนสิ้นเดือน|chan mai yaak khaang jaai khaa chao jeung oon gaawn sin duean|我不想拖欠房租，所以月底前转账。|ค้างจ่ายสองเดือน|khaang jaai saawng duean|拖欠两个月|จ่ายครบ|jaai khrop|付清|账单
jaai-khrop|จ่ายครบ|jaai khrop|付清；付齐|动词|账单收据|เดือนนี้ฉันจ่ายครบทุกบิลแล้ว|duean nii chan jaai khrop thuk bin laaeo|这个月我所有账单都付清了。|จ่ายครบจำนวน|jaai khrop jam-nuan|金额付齐|ค้างจ่าย|khaang jaai|拖欠未付|账单
bai-set|ใบเสร็จ|bai-set|收据|名词|账单收据|หลังจ่ายเงินแล้ว อย่าลืมขอใบเสร็จ|lang jaai ngoen laaeo yaa luem khaaw bai-set|付款后，别忘了要收据。|เก็บใบเสร็จ|gep bai-set|保存收据|สลิปโอน|sa-lip oon|转账凭证|凭证
khaaw-bai-set|ขอใบเสร็จ|khaaw bai-set|要收据|动词|账单收据|ฉันขอใบเสร็จเพื่อเก็บไว้เช็กค่าใช้จ่าย|chan khaaw bai-set phuea gep wai chek khaa chai-jaai|我要收据，以便留着核对开销。|ขอใบเสร็จหน่อย|khaaw bai-set naawy|请给收据|ไม่รับใบเสร็จ|mai rap bai-set|不收收据|凭证
gep-bai-set|เก็บใบเสร็จ|gep bai-set|保存收据|动词|账单收据|แม่เก็บใบเสร็จทุกใบไว้ในกล่องเล็ก|maae gep bai-set thuk bai wai nai glaawng lek|妈妈把每张收据都保存在小盒子里。|เก็บใบเสร็จซื้อของ|gep bai-set sue khaawng|保存购物收据|ทิ้งใบเสร็จ|thing bai-set|扔收据|凭证
khaa-fai|ค่าไฟ|khaa fai|电费|名词|账单收据|เดือนนี้ค่าไฟแพงขึ้นเพราะเปิดแอร์บ่อย|duean nii khaa fai phaaeng kheun phraw bpoet aae baawy|这个月电费更贵，因为常开空调。|จ่ายค่าไฟ|jaai khaa fai|付电费|ค่าน้ำ|khaa naam|水费|账单
khaa-naam|ค่าน้ำ|khaa naam|水费|名词|账单收据|ค่าน้ำเดือนนี้ไม่แพงเท่าเดือนที่แล้ว|khaa naam duean nii mai phaaeng thao duean thii laaeo|这个月水费没有上个月贵。|จ่ายค่าน้ำ|jaai khaa naam|付水费|ค่าไฟ|khaa fai|电费|账单
khaa-thoo-ra-sap|ค่าโทรศัพท์|khaa thoo-ra-sap|电话费；手机费|名词|账单收据|ฉันจ่ายค่าโทรศัพท์ผ่านแอปทุกต้นเดือน|chan jaai khaa thoo-ra-sap phaan aaep thuk dton duean|我每个月初通过应用付手机费。|บิลค่าโทรศัพท์|bin khaa thoo-ra-sap|电话费账单|ค่าเน็ต|khaa net|网费|账单
khaa-net|ค่าเน็ต|khaa net|网费|名词|账单收据|ถ้าค้างจ่ายค่าเน็ต อินเทอร์เน็ตอาจใช้ไม่ได้|thaa khaang jaai khaa net in-thoe-net aat chai mai dai|如果拖欠网费，互联网可能不能用。|จ่ายค่าเน็ต|jaai khaa net|付网费|ค่าโทรศัพท์|khaa thoo-ra-sap|电话费|账单
khaa-chao|ค่าเช่า|khaa chao|租金；房租|名词|账单收据|ค่าเช่าห้องต้องโอนให้เจ้าของห้องก่อนวันที่ห้า|khaa chao haawng dtawng oon hai jao-khaawng haawng gaawn wan thii haa|房租必须在五号前转给房东。|จ่ายค่าเช่า|jaai khaa chao|付房租|เงินมัดจำ|ngoen mat-jam|押金|账单
ngoen-mat-jam|เงินมัดจำ|ngoen mat-jam|押金；订金|名词|押金退款|ก่อนเข้าห้องเช่า ฉันต้องจ่ายเงินมัดจำหนึ่งเดือน|gaawn khao haawng chao chan dtawng jaai ngoen mat-jam neung duean|入住出租房前，我要付一个月押金。|จ่ายเงินมัดจำ|jaai ngoen mat-jam|付押金|ค่าเช่า|khaa chao|房租|押金
mat-jam|มัดจำ|mat-jam|付押金；预付订金|动词|押金退款|ฉันมัดจำโต๊ะอาหารไว้แล้ว จะไปรับวันเสาร์|chan mat-jam dto aa-haan wai laaeo ja bpai rap wan-sao|我已经给餐桌付了订金，周六去取。|มัดจำของไว้|mat-jam khaawng wai|给东西付订金|จ่ายเต็ม|jaai dtem|付全款|押金
khuen-mat-jam|คืนมัดจำ|khuen mat-jam|退押金|动词|押金退款|เมื่อย้ายออก เจ้าของห้องจะคืนมัดจำหลังตรวจห้อง|muea yaai aawk jao-khaawng haawng ja khuen mat-jam lang dtruat haawng|搬出时，房东检查房间后会退押金。|ขอคืนมัดจำ|khaaw khuen mat-jam|申请退押金|จ่ายมัดจำ|jaai mat-jam|付押金|押金
khaaw-khuen-ngoen|ขอคืนเงิน|khaaw khuen ngoen|要求退款|动词|押金退款|สินค้าชิ้นนี้เสีย ฉันจึงขอคืนเงินที่ร้าน|sin-khaa chin nii siia chan jeung khaaw khuen ngoen thii raan|这个商品坏了，所以我在店里要求退款。|ขอคืนเงินเต็มจำนวน|khaaw khuen ngoen dtem jam-nuan|要求全额退款|เปลี่ยนสินค้า|bpliian sin-khaa|换货|退款
khuen-ngoen|คืนเงิน|khuen ngoen|退款；还钱|动词|押金退款|ร้านคืนเงินให้ฉันภายในสามวันทำการ|raan khuen ngoen hai chan phaai-nai saam wan tham gaan|商店在三个工作日内给我退款。|คืนเงินเข้าบัญชี|khuen ngoen khao ban-chii|退款到账户|รับเงิน|rap ngoen|收钱|退款
ngoen-khuen|เงินคืน|ngoen khuen|退款金额；返还的钱|名词|押金退款|เงินคืนเข้าบัญชีแล้วเมื่อเช้านี้|ngoen khuen khao ban-chii laaeo muea chaao nii|退款今天早上已经到账了。|รอเงินคืน|raaw ngoen khuen|等退款|เงินจ่าย|ngoen jaai|支付的钱|退款
jaai-dtem|จ่ายเต็ม|jaai dtem|付全款；付全额|动词|转账支付|ถ้าจ่ายเต็มวันนี้ ร้านจะลดราคาให้เล็กน้อย|thaa jaai dtem wan-nii raan ja lot raa-khaa hai lek naawy|如果今天付全款，店家会稍微降价。|จ่ายเต็มจำนวน|jaai dtem jam-nuan|付全额|แบ่งจ่าย|baeng jaai|分开付款|支付
baeng-jaai|แบ่งจ่าย|baeng jaai|分开付款；分摊付款|动词|转账支付|มื้อนี้เราแบ่งจ่ายคนละครึ่งได้ไหม|mue nii rao baeng jaai khon la khrueng dai mai|这顿饭我们可以每人一半分摊付款吗？|แบ่งจ่ายกับเพื่อน|baeng jaai gap phuean|和朋友分摊付款|จ่ายเต็ม|jaai dtem|付全款|支付
haan-gan|หารกัน|haan gan|平摊；AA|动词|转账支付|หลังดูหนัง เราหารกันค่าขนมและค่าแท็กซี่|lang duu nang rao haan gan khaa kha-nom lae khaa thaek-sii|看完电影后，我们平摊点心费和出租车费。|หารกันคนละเท่า ๆ กัน|haan gan khon la thao thao gan|每人平均分摊|เลี้ยงเอง|liiang eeng|自己请客|支付
khon-la-khrueng|คนละครึ่ง|khon la khrueng|每人一半|短语|转账支付|ค่าอาหารหกร้อยบาท เราจ่ายคนละครึ่ง|khaa aa-haan hok raawy baat rao jaai khon la khrueng|饭钱六百泰铢，我们每人付一半。|แบ่งคนละครึ่ง|baeng khon la khrueng|每人分一半|คนเดียวจ่าย|khon diao jaai|一个人付|支付
ruut-bat|รูดบัตร|ruut bat|刷卡|动词|转账支付|ร้านนี้รูดบัตรได้ แต่มีขั้นต่ำสามร้อยบาท|raan nii ruut bat dai dtaae mii khan-dtam saam raawy baat|这家店可以刷卡，但最低三百泰铢。|รูดบัตรเดบิต|ruut bat dee-bit|刷借记卡|จ่ายเงินสด|jaai ngoen sot|付现金|支付
dtae-bat|แตะบัตร|dtae bat|感应刷卡；碰卡支付|动词|转账支付|ขึ้นรถไฟฟ้าแค่แตะบัตรที่ประตูทางเข้า|kheun rot-fai-faa khae dtae bat thii bpra-dtuu thaang khao|坐轻轨只要在入口闸门感应刷卡。|แตะบัตรจ่ายเงิน|dtae bat jaai ngoen|碰卡付款|รูดบัตร|ruut bat|刷卡|支付
jaai-duai-bat|จ่ายด้วยบัตร|jaai duai bat|用卡付款|动词|转账支付|วันนี้ฉันจ่ายด้วยบัตรเพราะเงินสดไม่พอ|wan-nii chan jaai duai bat phraw ngoen sot mai phaaw|今天我用卡付款，因为现金不够。|จ่ายด้วยบัตรเดบิต|jaai duai bat dee-bit|用借记卡付款|จ่ายเงินสด|jaai ngoen sot|付现金|支付
yuen-yan|ยืนยัน|yuen-yan|确认|动词|转账支付|ก่อนยืนยันโอนเงิน ต้องดูชื่อบัญชีอีกครั้ง|gaawn yuen-yan oon ngoen dtawng duu chue ban-chii iik khrang|确认转账前，必须再看一次账户名。|กดยืนยัน|got yuen-yan|按确认|ยกเลิก|yok-loek|取消|支付
yok-loek|ยกเลิก|yok-loek|取消|动词|转账支付|ถ้ายอดเงินผิด ให้ยกเลิกก่อนกดยืนยัน|thaa yaawt ngoen phit hai yok-loek gaawn got yuen-yan|如果金额错了，在按确认前取消。|ยกเลิกรายการ|yok-loek raai-gaan|取消交易|ยืนยัน|yuen-yan|确认|支付
raai-gaan|รายการ|raai-gaan|交易；项目|名词|余额记录|ในแอปมีรายการโอนเงินล่าสุดสามรายการ|nai aaep mii raai-gaan oon ngoen laa-sut saam raai-gaan|应用里有最近三笔转账交易。|ดูรายการล่าสุด|duu raai-gaan laa-sut|看最新交易|ยอดเงิน|yaawt ngoen|金额|记录
bpra-wat-raai-gaan|ประวัติรายการ|bpra-wat raai-gaan|交易记录|名词|余额记录|ฉันเปิดประวัติรายการเพื่อดูว่าเงินออกเมื่อไร|chan bpoet bpra-wat raai-gaan phuea duu waa ngoen aawk muea-rai|我打开交易记录来看钱什么时候支出。|ตรวจประวัติรายการ|dtruat bpra-wat raai-gaan|检查交易记录|แจ้งเตือน|jaaeng-dteuan|提醒|记录
raai-gaan-laa-sut|รายการล่าสุด|raai-gaan laa-sut|最新交易；最近一项|名词|余额记录|รายการล่าสุดคือค่าไฟที่ฉันจ่ายเมื่อเช้า|raai-gaan laa-sut khue khaa fai thii chan jaai muea chaao|最新交易是我早上付的电费。|ดูรายการล่าสุด|duu raai-gaan laa-sut|看最新交易|ประวัติรายการ|bpra-wat raai-gaan|交易记录|记录
wong-ngoen|วงเงิน|wong ngoen|额度|名词|银行卡账户|บัตรเครดิตใบนี้มีวงเงินไม่สูงมาก|bat khree-dit bai nii mii wong ngoen mai suung maak|这张信用卡额度不太高。|ดูวงเงินบัตร|duu wong ngoen bat|看卡额度|ยอดคงเหลือ|yaawt khong-luea|余额|卡
jam-gat-wong-ngoen|จำกัดวงเงิน|jam-gat wong ngoen|限制额度|动词|银行卡账户|ฉันจำกัดวงเงินบัตรเพื่อไม่ให้ใช้เกินงบ|chan jam-gat wong ngoen bat phuea mai hai chai goen ngop|我限制卡额度，以免超预算。|จำกัดวงเงินต่อวัน|jam-gat wong ngoen dtaaw wan|限制每日额度|เพิ่มวงเงิน|phoem wong ngoen|提高额度|卡
khaa-tham-niiam|ค่าธรรมเนียม|khaa tham-niiam|手续费|名词|银行服务|โอนต่างธนาคารบางครั้งมีค่าธรรมเนียมเล็กน้อย|oon dtaang tha-naa-khaan baang khrang mii khaa tham-niiam lek naawy|跨行转账有时有一点手续费。|เสียค่าธรรมเนียม|siia khaa tham-niiam|支付手续费|ฟรีค่าธรรมเนียม|frii khaa tham-niiam|免手续费|费用
frii-khaa-tham-niiam|ฟรีค่าธรรมเนียม|frii khaa tham-niiam|免手续费|短语|银行服务|แอปนี้โอนเงินให้เพื่อนฟรีค่าธรรมเนียม|aaep nii oon ngoen hai phuean frii khaa tham-niiam|这个应用给朋友转账免手续费。|โอนฟรีค่าธรรมเนียม|oon frii khaa tham-niiam|转账免手续费|มีค่าธรรมเนียม|mii khaa tham-niiam|有手续费|费用
dawk-biia|ดอกเบี้ย|daawk-biia|利息|名词|个人预算|บัญชีออมทรัพย์มีดอกเบี้ยเล็กน้อยทุกปี|ban-chii aawm-sap mii daawk-biia lek naawy thuk bpii|储蓄账户每年有一点利息。|ได้ดอกเบี้ย|dai daawk-biia|获得利息|ค่าธรรมเนียม|khaa tham-niiam|手续费|储蓄
ban-chii-aawm-sap|บัญชีออมทรัพย์|ban-chii aawm-sap|储蓄账户|名词|银行卡账户|ฉันแยกบัญชีออมทรัพย์ไว้สำหรับเงินเก็บ|chan yaaek ban-chii aawm-sap wai sam-rap ngoen gep|我把储蓄账户单独留作存钱用。|เปิดบัญชีออมทรัพย์|bpoet ban-chii aawm-sap|开储蓄账户|บัญชีใช้จ่าย|ban-chii chai-jaai|消费账户|账户
ban-chii-chai-jaai|บัญชีใช้จ่าย|ban-chii chai-jaai|消费账户；日常支出账户|名词|银行卡账户|บัญชีใช้จ่ายมีไว้จ่ายอาหาร ค่าเดินทาง และบิล|ban-chii chai-jaai mii wai jaai aa-haan khaa doen-thaang lae bin|消费账户用来付食物、交通费和账单。|แยกบัญชีใช้จ่าย|yaaek ban-chii chai-jaai|分开消费账户|บัญชีออมทรัพย์|ban-chii aawm-sap|储蓄账户|账户
yaaek-ban-chii|แยกบัญชี|yaaek ban-chii|分开账户|动词|个人预算|ฉันแยกบัญชีออมเงินกับบัญชีใช้จ่ายเพื่อดูเงินง่ายขึ้น|chan yaaek ban-chii aawm ngoen gap ban-chii chai-jaai phuea duu ngoen ngaai kheun|我把储蓄账户和消费账户分开，方便看钱。|แยกบัญชีสองใบ|yaaek ban-chii saawng bai|分开两个账户|ใช้บัญชีเดียว|chai ban-chii diao|用一个账户|预算
ngoen-gep|เงินเก็บ|ngoen gep|积蓄；存下的钱|名词|个人预算|เงินเก็บก้อนนี้จะใช้ตอนฉุกเฉินเท่านั้น|ngoen gep gaawn nii ja chai dtaawn chuk-choen thao-nan|这笔积蓄只在紧急时使用。|มีเงินเก็บ|mii ngoen gep|有积蓄|เงินใช้จ่าย|ngoen chai-jaai|消费的钱|储蓄
chuk-choen|ฉุกเฉิน|chuk-choen|紧急；应急|形容词|个人预算|ฉันเก็บเงินไว้สำหรับเรื่องฉุกเฉิน เช่น ป่วยหรือซ่อมรถ|chan gep ngoen wai sam-rap rueang chuk-choen chen bpuai rue saawm rot|我存钱用于紧急情况，比如生病或修车。|เงินฉุกเฉิน|ngoen chuk-choen|应急钱|เงินเที่ยว|ngoen thiao|旅游钱|预算
yuem-ngoen|ยืมเงิน|yuem ngoen|借钱|动词|个人预算|ถ้าต้องยืมเงินเพื่อน ควรบอกวันคืนให้ชัดเจน|thaa dtawng yuem ngoen phuean khuuan baawk wan khuen hai chat-jen|如果要向朋友借钱，应该把还钱日期说清楚。|ยืมเงินเล็กน้อย|yuem ngoen lek naawy|借一点钱|คืนเงิน|khuen ngoen|还钱|借还
khuen-ngoen-loan|คืนเงิน|khuen ngoen|还钱|动词|个人预算|ฉันคืนเงินให้เพื่อนแล้วผ่านพร้อมเพย์|chan khuen ngoen hai phuean laaeo phaan phraawm-phee|我已经通过 PromptPay 把钱还给朋友了。|คืนเงินที่ยืม|khuen ngoen thii yuem|还借的钱|ยืมเงิน|yuem ngoen|借钱|借还
nii|หนี้|nii|债务；欠的钱|名词|个人预算|เขาไม่อยากมีหนี้ จึงไม่ซื้อของเกินงบ|khao mai yaak mii nii jeung mai sue khaawng goen ngop|他不想有债务，所以不买超预算的东西。|จ่ายหนี้|jaai nii|还债|เงินออม|ngoen aawm|储蓄|预算
tid-ngoen|ติดเงิน|dtit ngoen|欠钱|动词|个人预算|ฉันติดเงินเพื่อนห้าสิบบาทและจะคืนพรุ่งนี้|chan dtit ngoen phuean haa-sip baat lae ja khuen phrung-nii|我欠朋友五十泰铢，明天会还。|ติดเงินเล็กน้อย|dtit ngoen lek naawy|欠一点钱|คืนเงิน|khuen ngoen|还钱|借还
khit-ngoen|คิดเงิน|khit ngoen|结账；算钱|动词|转账支付|พนักงานคิดเงินที่หน้าเคาน์เตอร์หลังเรากินเสร็จ|pha-nak-ngaan khit ngoen thii naa khao-dtooe lang rao gin set|我们吃完后，工作人员在柜台结账。|คิดเงินรวม|khit ngoen ruam|合计结账|จ่ายเงิน|jaai ngoen|付款|支付
khreuuang-khit-ngoen|เครื่องคิดเงิน|khreuuang khit ngoen|收银机|名词|转账支付|เครื่องคิดเงินแสดงยอดรวมสามร้อยบาท|khreuuang khit ngoen sa-daaeng yaawt ruam saam raawy baat|收银机显示总额三百泰铢。|ดูเครื่องคิดเงิน|duu khreuuang khit ngoen|看收银机|คิวอาร์โค้ด|khiu-aa khoot|二维码|支付
yawt-ruam|ยอดรวม|yaawt ruam|总额|名词|余额记录|ยอดรวมของอาหารและน้ำคือสองร้อยห้าสิบบาท|yaawt ruam khaawng aa-haan lae naam khue saawng raawy haa-sip baat|食物和水的总额是二百五十泰铢。|ดูยอดรวม|duu yaawt ruam|看总额|ยอดย่อย|yaawt yaawy|小计|记录
yawt-yaawy|ยอดย่อย|yaawt yaawy|小计|名词|余额记录|ใบเสร็จมีราคาสินค้า ยอดย่อย และยอดรวม|bai-set mii raa-khaa sin-khaa yaawt yaawy lae yaawt ruam|收据上有商品价格、小计和总额。|ดูยอดย่อย|duu yaawt yaawy|看小计|ยอดรวม|yaawt ruam|总额|记录
lot-raa-khaa|ลดราคา|lot raa-khaa|降价；打折|动词|个人预算|ร้านนี้ลดราคาผลไม้ตอนเย็น ฉันจึงซื้อเพิ่ม|raan nii lot raa-khaa phon-la-maai dtaawn yen chan jeung sue phoem|这家店傍晚水果打折，所以我多买了。|ลดราคาสิบเปอร์เซ็นต์|lot raa-khaa sip bpooe-sen|打九折|ราคาเต็ม|raa-khaa dtem|原价|价格
suun-lot|ส่วนลด|suan lot|折扣|名词|个人预算|ถ้ามีบัตรสมาชิก จะได้ส่วนลดห้าเปอร์เซ็นต์|thaa mii bat sa-maa-chik ja dai suan lot haa bpooe-sen|如果有会员卡，会得到百分之五折扣。|ใช้ส่วนลด|chai suan lot|使用折扣|ราคาเต็ม|raa-khaa dtem|原价|价格
raa-khaa-dtem|ราคาเต็ม|raa-khaa dtem|原价；全价|名词|个人预算|ถ้าไม่มีส่วนลด เราต้องจ่ายราคาเต็ม|thaa mai mii suan lot rao dtawng jaai raa-khaa dtem|如果没有折扣，我们要付原价。|จ่ายราคาเต็ม|jaai raa-khaa dtem|付原价|ส่วนลด|suan lot|折扣|价格
khaa-doen-thaang|ค่าเดินทาง|khaa doen-thaang|交通费|名词|个人预算|ค่าเดินทางไปทำงานเดือนนี้สูงขึ้นเพราะขึ้นแท็กซี่บ่อย|khaa doen-thaang bpai tham ngaan duean nii suung kheun phraw kheun thaek-sii baawy|这个月上班交通费更高，因为常坐出租车。|บันทึกค่าเดินทาง|ban-thuek khaa doen-thaang|记录交通费|ค่าอาหาร|khaa aa-haan|餐费|预算
khaa-aa-haan|ค่าอาหาร|khaa aa-haan|餐费|名词|个人预算|ฉันตั้งงบค่าอาหารวันละสองร้อยบาท|chan dtang ngop khaa aa-haan wan la saawng raawy baat|我设定餐费预算每天两百泰铢。|ลดค่าอาหาร|lot khaa aa-haan|减少餐费|ค่าเดินทาง|khaa doen-thaang|交通费|预算
ngoen-thiao|เงินเที่ยว|ngoen thiao|旅游钱；娱乐预算|名词|个人预算|เดือนนี้ฉันเก็บเงินเที่ยวไว้ไปทะเลกับเพื่อน|duean nii chan gep ngoen thiao wai bpai tha-lee gap phuean|这个月我存旅游钱，准备和朋友去海边。|แยกเงินเที่ยว|yaaek ngoen thiao|分开旅游钱|เงินฉุกเฉิน|ngoen chuk-choen|应急钱|预算
raai-duuean|รายเดือน|raai duean|按月；月付|短语|账单收据|ค่าโทรศัพท์ของฉันเป็นแบบรายเดือน|khaa thoo-ra-sap khaawng chan bpen baep raai duean|我的手机费是月付类型。|จ่ายรายเดือน|jaai raai duean|按月支付|รายวัน|raai wan|按天|账单
raai-wan|รายวัน|raai wan|按天；每日|短语|个人预算|ฉันเขียนรายจ่ายรายวันไว้ในสมุดเล่มเล็ก|chan khiian raai-jaai raai wan wai nai sa-mut lem lek|我把每日支出写在小本子里。|บันทึกรายวัน|ban-thuek raai wan|每日记录|รายเดือน|raai duean|按月|记录
phuu-rap-ngoen|ผู้รับเงิน|phuu rap ngoen|收款人|名词|转账支付|ก่อนโอนต้องดูว่าผู้รับเงินเป็นชื่อเพื่อนจริงไหม|gaawn oon dtawng duu waa phuu rap ngoen bpen chue phuean jing mai|转账前要看收款人是不是朋友的真实姓名。|ตรวจผู้รับเงิน|dtruat phuu rap ngoen|核对收款人|ผู้โอนเงิน|phuu oon ngoen|转账人|转账
phuu-oon-ngoen|ผู้โอนเงิน|phuu oon ngoen|转账人|名词|转账支付|ในสลิปโอนมีชื่อผู้โอนเงินและผู้รับเงิน|nai sa-lip oon mii chue phuu oon ngoen lae phuu rap ngoen|转账凭证里有转账人和收款人的名字。|ชื่อผู้โอนเงิน|chue phuu oon ngoen|转账人姓名|ผู้รับเงิน|phuu rap ngoen|收款人|转账
dtit-dtaaw-tha-naa-khaan|ติดต่อธนาคาร|dtit-dtaaw tha-naa-khaan|联系银行|动词|银行服务|ถ้าแอปเข้าไม่ได้ ฉันจะติดต่อธนาคารตอนเช้า|thaa aaep khao mai dai chan ja dtit-dtaaw tha-naa-khaan dtaawn chaao|如果应用进不去，我早上会联系银行。|ติดต่อธนาคารทางโทรศัพท์|dtit-dtaaw tha-naa-khaan thaang thoo-ra-sap|电话联系银行|ถามร้านค้า|thaam raan khaa|问店家|服务
aaep-khao-mai-dai|แอปเข้าไม่ได้|aaep khao mai dai|应用登录不了|短语|银行服务|วันนี้แอปเข้าไม่ได้ ฉันจึงยังโอนเงินไม่ได้|wan-nii aaep khao mai dai chan jeung yang oon ngoen mai dai|今天应用登录不了，所以我还不能转账。|แอปธนาคารเข้าไม่ได้|aaep tha-naa-khaan khao mai dai|银行应用登录不了|แอปใช้ได้|aaep chai dai|应用可用|服务
ban-chii-thuuk-lok|บัญชีถูกล็อก|ban-chii thuuk lok|账户被锁|短语|银行服务|บัญชีถูกล็อกเพราะใส่รหัสผิดหลายครั้ง|ban-chii thuuk lok phraw sai ra-hat phit laai khrang|账户因为多次输错密码被锁。|แก้บัญชีถูกล็อก|gaae ban-chii thuuk lok|处理账户被锁|บัญชีใช้ได้|ban-chii chai dai|账户可用|安全
sai-rat-phit|ใส่รหัสผิด|sai ra-hat phit|输错密码|动词|银行服务|ถ้าใส่รหัสผิดสามครั้ง บัตรอาจใช้ไม่ได้|thaa sai ra-hat phit saam khrang bat aat chai mai dai|如果输错密码三次，卡可能不能用。|ใส่รหัสผิดหลายครั้ง|sai ra-hat phit laai khrang|多次输错密码|ใส่รหัสถูก|sai ra-hat thuuk|输对密码|安全
chai-mai-dai|ใช้ไม่ได้|chai mai dai|不能用|形容词|银行服务|บัตรใบนี้ใช้ไม่ได้แล้ว ต้องออกบัตรใหม่|bat bai nii chai mai dai laaeo dtawng aawk bat mai|这张卡已经不能用了，必须补办新卡。|แอปใช้ไม่ได้|aaep chai mai dai|应用不能用|ใช้ได้|chai dai|能用|服务
chai-dai|ใช้ได้|chai dai|能用；可使用|形容词|银行服务|คิวอาร์โค้ดนี้ยังใช้ได้ คุณสแกนจ่ายได้เลย|khiu-aa khoot nii yang chai dai khun sa-gaaen jaai dai loei|这个二维码还可以用，你可以直接扫码支付。|บัตรยังใช้ได้|bat yang chai dai|卡还能用|ใช้ไม่ได้|chai mai dai|不能用|服务
`;

export const VOCABULARY_EXPANSION_A2_MONEY_BANKING_BASICS_01: VocabularyExpansionA2MoneyBankingBasicsCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
