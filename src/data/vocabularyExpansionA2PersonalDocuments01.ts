type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "身份证件" | "表格填写" | "个人信息" | "签名复印" | "护照签证" | "申请材料" | "办事流程" | "资料状态";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2PersonalDocumentsCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-personal-documents-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2PersonalDocumentsCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于填写表格、提交材料、办理证件或说明个人信息。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，办事时要分清证件、复印件、原件和填写项目。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["办事资料表达常和 กรอก、เซ็น、แนบ、ถ่ายสำเนา、ยื่น 搭配。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
bat-bpra-chaa-chon|บัตรประชาชน|bat bpra-chaa-chon|身份证|名词|身份证件|กรุณานำบัตรประชาชนตัวจริงมาด้วยในวันสมัคร|ga-ru-naa nam bat bpra-chaa-chon dtua jing maa duai nai wan sa-mak|申请当天请带身份证原件。|证件
samnao-bat-bpra-chaa-chon|สำเนาบัตรประชาชน|sam-nao bat bpra-chaa-chon|身份证复印件|名词|身份证件|เอกสารนี้ต้องใช้สำเนาบัตรประชาชนหนึ่งชุด|eek-ga-saan nii dtawng chai sam-nao bat bpra-chaa-chon neung chut|这份材料需要一套身份证复印件。|证件
bat-nak-riian|บัตรนักเรียน|bat nak-riian|学生证|名词|身份证件|นักเรียนต้องแสดงบัตรนักเรียนก่อนเข้าห้องสอบ|nak-riian dtawng sa-daaeng bat nak-riian gaawn khao haawng saawp|学生进考场前必须出示学生证。|证件
bat-nak-sueksaa|บัตรนักศึกษา|bat nak-seuk-saa|大学学生证|名词|身份证件|บัตรนักศึกษาช่วยลดราคาค่าเข้าพิพิธภัณฑ์ได้|bat nak-seuk-saa chuai lot raa-khaa khaa khao phi-phit-tha-phan dai|大学学生证可以帮助博物馆门票打折。|证件
bat-tham-ngaan|บัตรทำงาน|bat tham ngaan|工作证|名词|身份证件|พนักงานใหม่ได้รับบัตรทำงานหลังถ่ายรูป|pha-nak-ngaan mai dai rap bat tham ngaan lang thaai ruup|新员工拍照后拿到工作证。|证件
bat-khao-aakhaan|บัตรเข้าอาคาร|bat khao aa-khaan|进楼证；门禁卡|名词|身份证件|ถ้าลืมบัตรเข้าอาคาร ต้องแลกบัตรที่ล็อบบี้|thaa luem bat khao aa-khaan dtawng laaek bat thii lawp-bii|如果忘带进楼证，必须在大厅换证。|证件
bat-khon-khai|บัตรคนไข้|bat khon-khai|病人卡；就诊卡|名词|身份证件|คลินิกให้บัตรคนไข้ใหม่กับฉันหลังลงทะเบียน|khli-nik hai bat khon-khai mai gap chan lang long tha-biian|诊所登记后给我新的病人卡。|证件
bat-haai|บัตรหาย|bat haai|证件/卡丢了|短语|身份证件|ถ้าบัตรหาย ควรแจ้งเจ้าหน้าที่ทันที|thaa bat haai khuuan jaaeng jao-naa-thii than-thii|如果证件丢了，应该马上通知工作人员。|证件
bat-mot-aa-yu|บัตรหมดอายุ|bat mot aa-yu|证件过期|短语|身份证件|บัตรใบนี้หมดอายุแล้ว ต้องทำบัตรใหม่|bat bai nii mot aa-yu laaeo dtawng tham bat mai|这张证件已经过期了，要办新卡。|证件
tham-bat-mai|ทำบัตรใหม่|tham bat mai|办新卡；补办证件|动词|身份证件|ฉันต้องทำบัตรใหม่เพราะบัตรเก่าหาย|chan dtawng tham bat mai phraw bat gao haai|我必须补办证件，因为旧卡丢了。|证件
eek-ga-saan-dtua-jing|เอกสารตัวจริง|eek-ga-saan dtua jing|文件原件|名词|申请材料|เจ้าหน้าที่ขอดูเอกสารตัวจริงก่อนรับสำเนา|jao-naa-thii khaaw duu eek-ga-saan dtua jing gaawn rap sam-nao|工作人员收复印件前要求看文件原件。|材料
samnao-eek-ga-saan|สำเนาเอกสาร|sam-nao eek-ga-saan|文件复印件|名词|申请材料|กรุณาแนบสำเนาเอกสารทุกหน้าให้ครบ|ga-ru-naa naaep sam-nao eek-ga-saan thuk naa hai khrop|请附上每一页文件复印件。|材料
chut-eek-ga-saan|ชุดเอกสาร|chut eek-ga-saan|一套材料|名词|申请材料|ฉันเตรียมชุดเอกสารสำหรับยื่นสมัครงานแล้ว|chan dtriiam chut eek-ga-saan sam-rap yeun sa-mak ngaan laaeo|我已经准备好一套求职申请材料了。|材料
eek-ga-saan-khrop|เอกสารครบ|eek-ga-saan khrop|材料齐全|短语|资料状态|ถ้าเอกสารครบ วันนี้สามารถยื่นคำขอได้เลย|thaa eek-ga-saan khrop wan-nii saa-maat yeun kham-khaaw dai loei|如果材料齐全，今天就可以提交申请。|状态
eek-ga-saan-mai-khrop|เอกสารไม่ครบ|eek-ga-saan mai khrop|材料不齐|短语|资料状态|เอกสารไม่ครบเพราะฉันลืมสำเนาทะเบียนบ้าน|eek-ga-saan mai khrop phraw chan luem sam-nao tha-biian baan|材料不齐，因为我忘了户口本复印件。|状态
eek-ga-saan-phaai-lang|เอกสารภายหลัง|eek-ga-saan phaai-lang|后补材料|名词|申请材料|เจ้าหน้าที่อนุญาตให้ส่งเอกสารภายหลังภายในสามวัน|jao-naa-thii a-nu-yaat hai song eek-ga-saan phaai-lang phaai-nai saam wan|工作人员允许三天内后补材料。|材料
song-eek-ga-saan|ส่งเอกสาร|song eek-ga-saan|提交材料|动词|办事流程|ฉันส่งเอกสารทางอีเมลและรอคำตอบจากเจ้าหน้าที่|chan song eek-ga-saan thaang ii-meel lae raaw kham-dtaawp jaak jao-naa-thii|我通过邮件提交材料，并等待工作人员回复。|流程
yeun-kham-khaaw|ยื่นคำขอ|yeun kham-khaaw|提交申请|动词|办事流程|ถ้ากรอกแบบฟอร์มเสร็จแล้ว ให้ยื่นคำขอที่ช่องสอง|thaa graawk baep-faawm set laaeo hai yeun kham-khaaw thii chaawng saawng|如果表格填好了，请在二号窗口提交申请。|流程
rap-eek-ga-saan|รับเอกสาร|rap eek-ga-saan|领取文件；接收材料|动词|办事流程|คุณสามารถมารับเอกสารได้ในวันศุกร์หน้า|khun saa-maat maa rap eek-ga-saan dai nai wan-suk naa|你可以下周五来领取文件。|流程
dtruat-eek-ga-saan|ตรวจเอกสาร|dtruat eek-ga-saan|检查材料|动词|办事流程|เจ้าหน้าที่ตรวจเอกสารและบอกว่าขาดลายเซ็น|jao-naa-thii dtruat eek-ga-saan lae baawk waa khaat laai-sen|工作人员检查材料后说缺签名。|流程
graawk-baep-faawm|กรอกแบบฟอร์ม|graawk baep-faawm|填写表格|动词|表格填写|กรุณากรอกแบบฟอร์มด้วยตัวบรรจงและอ่านง่าย|ga-ru-naa graawk baep-faawm duai dtua ban-jong lae aan ngaai|请用工整、易读的字填写表格。|表格
baep-faawm-sa-mak|แบบฟอร์มสมัคร|baep-faawm sa-mak|申请表|名词|表格填写|แบบฟอร์มสมัครนี้ต้องกรอกชื่อ ที่อยู่ และเบอร์โทรศัพท์|baep-faawm sa-mak nii dtawng graawk chue thii-yuu lae booe thoo-ra-sap|这张申请表需要填写姓名、地址和电话号码。|表格
baep-faawm-online|แบบฟอร์มออนไลน์|baep-faawm awn-lai|线上表格|名词|表格填写|ฉันกรอกแบบฟอร์มออนไลน์ในโทรศัพท์มือถือ|chan graawk baep-faawm awn-lai nai thoo-ra-sap mue-thue|我在手机里填写线上表格。|表格
chaawng-graawk|ช่องกรอก|chaawng graawk|填写栏|名词|表格填写|ช่องกรอกที่อยู่มีพื้นที่ไม่พอสำหรับที่อยู่ยาว|chaawng graawk thii-yuu mii phuen-thii mai phaaw sam-rap thii-yuu yaao|地址填写栏空间不够写长地址。|表格
dtua-ban-jong|ตัวบรรจง|dtua ban-jong|工整字迹|名词|表格填写|ครูขอให้เขียนชื่อด้วยตัวบรรจงในเอกสาร|khruu khaaw hai khiian chue duai dtua ban-jong nai eek-ga-saan|老师要求在文件里用工整字迹写姓名。|表格
khian-hai-chat|เขียนให้ชัด|khiian hai chat|写清楚|动词|表格填写|กรุณาเขียนให้ชัด เพราะเจ้าหน้าที่ต้องอ่านข้อมูล|ga-ru-naa khiian hai chat phraw jao-naa-thii dtawng aan khaaw-muun|请写清楚，因为工作人员要读取资料。|表格
graawk-phit|กรอกผิด|graawk phit|填错|动词|表格填写|ถ้ากรอกผิด ให้ขีดฆ่าและเซ็นชื่อกำกับ|thaa graawk phit hai khiit khaa lae sen chue gam-gap|如果填错，请划掉并签名确认。|表格
gaae-khaaw-muun|แก้ข้อมูล|gaae khaaw-muun|修改资料|动词|表格填写|ฉันต้องแก้ข้อมูลที่อยู่ใหม่ในระบบ|chan dtawng gaae khaaw-muun thii-yuu mai nai ra-bop|我需要在系统里修改新地址资料。|表格
khaaw-muun-suan-dtua|ข้อมูลส่วนตัว|khaaw-muun suan-dtua|个人信息|名词|个人信息|อย่าให้ข้อมูลส่วนตัวกับคนที่ไม่รู้จัก|yaa hai khaaw-muun suan-dtua gap khon thii mai ruu-jak|不要把个人信息给不认识的人。|信息
chue-jing|ชื่อจริง|chue jing|真实名字；名|名词|个人信息|กรุณาเขียนชื่อจริงตามหนังสือเดินทาง|ga-ru-naa khiian chue jing dtaam nang-sue doen-thaang|请按护照填写真实名字。|姓名
naam-sa-gun|นามสกุล|naam-sa-gun|姓氏|名词|个人信息|นามสกุลในแบบฟอร์มต้องตรงกับบัตรประชาชน|naam-sa-gun nai baep-faawm dtawng dtrong gap bat bpra-chaa-chon|表格里的姓氏必须和身份证一致。|姓名
chue-len|ชื่อเล่น|chue len|昵称；小名|名词|个人信息|ในช่องชื่อเล่นจะกรอกหรือไม่กรอกก็ได้|nai chaawng chue len ja graawk rue mai graawk gaw dai|昵称栏可填也可不填。|姓名
wan-geut|วันเกิด|wan geut|生日；出生日期|名词|个人信息|วันเกิดต้องเขียนเป็นวัน เดือน และปีให้ครบ|wan geut dtawng khiian bpen wan duean lae bpii hai khrop|出生日期要把日、月、年写完整。|信息
sanchaat|สัญชาติ|san-chaat|国籍|名词|个人信息|ในแบบฟอร์มนี้ ฉันกรอกสัญชาติว่าจีน|nai baep-faawm nii chan graawk san-chaat waa jiin|在这张表格里，我填写国籍为中国。|信息
phum-lam-nao|ภูมิลำเนา|phuum-lam-nao|户籍地；籍贯|名词|个人信息|เจ้าหน้าที่ถามภูมิลำเนาเดิมของฉัน|jao-naa-thii thaam phuum-lam-nao doem khaawng chan|工作人员问我的原户籍地。|信息
thii-yuu-bpat-ju-ban|ที่อยู่ปัจจุบัน|thii-yuu bpat-ju-ban|现住址|名词|个人信息|กรุณาเขียนที่อยู่ปัจจุบันที่สามารถรับจดหมายได้|ga-ru-naa khiian thii-yuu bpat-ju-ban thii saa-maat rap jot-maai dai|请填写可以收信的现住址。|地址
thii-yuu-dtaam-bat|ที่อยู่ตามบัตร|thii-yuu dtaam bat|证件地址|名词|个人信息|ที่อยู่ตามบัตรไม่เหมือนที่อยู่ปัจจุบันของฉัน|thii-yuu dtaam bat mai muean thii-yuu bpat-ju-ban khaawng chan|证件地址和我的现住址不同。|地址
lek-thii-baan|เลขที่บ้าน|leek thii baan|门牌号|名词|个人信息|อย่าลืมกรอกเลขที่บ้านและชื่อถนนให้ครบ|yaa luem graawk leek thii baan lae chue tha-non hai khrop|别忘了填写门牌号和街道名。|地址
chue-tha-non|ชื่อถนน|chue tha-non|街道名|名词|个人信息|ชื่อถนนนี้สะกดยาก ฉันจึงดูจากแผนที่|chue tha-non nii sa-got yaak chan jeung duu jaak phaaen-thii|这条街名拼写难，所以我从地图上看。|地址
jangwat|จังหวัด|jang-wat|府；省级行政区|名词|个人信息|จังหวัดในที่อยู่ของฉันคือเชียงใหม่|jang-wat nai thii-yuu khaawng chan khue chiiang-mai|我地址里的府是清迈。|地址
rat-sa-bprai-sa-nii|รหัสไปรษณีย์|ra-hat bprai-sa-nii|邮政编码|名词|个人信息|ถ้าไม่รู้รหัสไปรษณีย์ สามารถค้นหาในอินเทอร์เน็ตได้|thaa mai ruu ra-hat bprai-sa-nii saa-maat khon haa nai in-thoe-net dai|如果不知道邮政编码，可以在网上查找。|地址
boe-thoo|เบอร์โทร|booe thoo|电话号码|名词|个人信息|กรุณาเขียนเบอร์โทรที่ติดต่อได้ในเวลาทำงาน|ga-ru-naa khiian booe thoo thii dtit-dtaaw dai nai wee-laa tham ngaan|请填写工作时间能联系到的电话号码。|电话
boe-sam-raawng|เบอร์สำรอง|booe sam-raawng|备用电话号码|名词|个人信息|ถ้าโทรเบอร์หลักไม่ได้ เจ้าหน้าที่จะโทรเบอร์สำรอง|thaa thoo booe lak mai dai jao-naa-thii ja thoo booe sam-raawng|如果主号码打不通，工作人员会打备用电话。|电话
ii-meel|อีเมล|ii-meel|电子邮箱|名词|个人信息|ผลการสมัครจะส่งไปทางอีเมลภายในสามวัน|phon gaan sa-mak ja song bpai thaang ii-meel phaai-nai saam wan|申请结果会在三天内通过邮箱发送。|邮箱
laai-sen|ลายเซ็น|laai-sen|签名|名词|签名复印|ลายเซ็นในเอกสารต้องเหมือนกับในหนังสือเดินทาง|laai-sen nai eek-ga-saan dtawng muean gap nai nang-sue doen-thaang|文件里的签名必须和护照里的一样。|签名
sen-chue|เซ็นชื่อ|sen chue|签名|动词|签名复印|กรุณาเซ็นชื่อที่มุมล่างขวาของแบบฟอร์ม|ga-ru-naa sen chue thii mum laang khwaa khaawng baep-faawm|请在表格右下角签名。|签名
sen-gam-gap|เซ็นกำกับ|sen gam-gap|签名确认；签在旁边|动词|签名复印|ถ้าแก้คำผิด ต้องเซ็นกำกับข้างข้อความที่แก้|thaa gaae kham phit dtawng sen gam-gap khaang khaaw-khwaam thii gaae|如果改错字，必须在修改文字旁签名确认。|签名
trappra-thap|ตราประทับ|dtraa bpra-thap|印章；盖章|名词|签名复印|เอกสารจากบริษัทต้องมีตราประทับและลายเซ็น|eek-ga-saan jaak baaw-ri-sat dtawng mii dtraa bpra-thap lae laai-sen|公司的文件必须有印章和签名。|盖章
bprathap-traa|ประทับตรา|bpra-thap dtraa|盖章|动词|签名复印|เจ้าหน้าที่ประทับตราบนสำเนาเพื่อรับรองเอกสาร|jao-naa-thii bpra-thap dtraa bon sam-nao phuea rap-raawng eek-ga-saan|工作人员在复印件上盖章以认证文件。|盖章
thaai-samnao|ถ่ายสำเนา|thaai sam-nao|复印|动词|签名复印|ฉันต้องถ่ายสำเนาหนังสือเดินทางสองชุด|chan dtawng thaai sam-nao nang-sue doen-thaang saawng chut|我需要复印两套护照。|复印
samnao-sii|สำเนาสี|sam-nao sii|彩色复印件|名词|签名复印|สถานทูตขอสำเนาสีของหน้าหนังสือเดินทาง|sa-thaan-thuut khaaw sam-nao sii khaawng naa nang-sue doen-thaang|大使馆要求护照页彩色复印件。|复印
samnao-dam-khaao|สำเนาดำขาว|sam-nao dam khaao|黑白复印件|名词|签名复印|เอกสารทั่วไปใช้สำเนาดำขาวได้ ไม่ต้องเป็นสี|eek-ga-saan thua-bpai chai sam-nao dam khaao dai mai dtawng bpen sii|一般文件可以用黑白复印件，不必彩色。|复印
sa-gaan-eek-ga-saan|สแกนเอกสาร|sa-gaaen eek-ga-saan|扫描文件|动词|签名复印|ฉันสแกนเอกสารเป็นไฟล์และส่งทางอีเมล|chan sa-gaaen eek-ga-saan bpen faai lae song thaang ii-meel|我把文件扫描成文件并通过邮件发送。|扫描
faai-pdf|ไฟล์พีดีเอฟ|faai phii-dii-ef|PDF 文件|名词|签名复印|กรุณาส่งไฟล์พีดีเอฟขนาดไม่เกินห้าเมกะไบต์|ga-ru-naa song faai phii-dii-ef kha-naat mai goen haa mee-ga-bai|请发送大小不超过五兆的 PDF 文件。|文件
ruup-thaai|รูปถ่าย|ruup thaai|照片|名词|申请材料|ใบสมัครนี้ต้องใช้รูปถ่ายหน้าตรงสองรูป|bai sa-mak nii dtawng chai ruup thaai naa dtrong saawng ruup|这份申请需要两张正面照片。|照片
ruup-thaai-naa-dtrong|รูปถ่ายหน้าตรง|ruup thaai naa dtrong|正面照片|名词|申请材料|รูปถ่ายหน้าตรงต้องเห็นหน้าและพื้นหลังสีขาว|ruup thaai naa dtrong dtawng hen naa lae phuen-lang sii khaao|正面照片必须看得见脸，背景是白色。|照片
phuen-lang-sii-khaao|พื้นหลังสีขาว|phuen-lang sii khaao|白色背景|名词|申请材料|รูปสำหรับวีซ่าต้องใช้พื้นหลังสีขาว|ruup sam-rap wii-saa dtawng chai phuen-lang sii khaao|签证照片要用白色背景。|照片
kha-naat-ruup|ขนาดรูป|kha-naat ruup|照片尺寸|名词|申请材料|กรุณาตรวจขนาดรูปก่อนอัปโหลดในระบบ|ga-ru-naa dtruat kha-naat ruup gaawn ap-loot nai ra-bop|上传到系统前请检查照片尺寸。|照片
nang-sue-doen-thaang|หนังสือเดินทาง|nang-sue doen-thaang|护照|名词|护照签证|หนังสือเดินทางของฉันหมดอายุปีหน้า|nang-sue doen-thaang khaawng chan mot aa-yu bpii naa|我的护照明年到期。|护照
samnao-nang-sue-doen-thaang|สำเนาหนังสือเดินทาง|sam-nao nang-sue doen-thaang|护照复印件|名词|护照签证|โรงแรมขอสำเนาหนังสือเดินทางตอนเช็กอิน|roong-raaem khaaw sam-nao nang-sue doen-thaang dtaawn chek-in|酒店入住时要求护照复印件。|护照
naa-raek-passport|หน้าแรกหนังสือเดินทาง|naa raaek nang-sue doen-thaang|护照首页|名词|护照签证|กรุณาถ่ายสำเนาหน้าแรกหนังสือเดินทางให้ชัด|ga-ru-naa thaai sam-nao naa raaek nang-sue doen-thaang hai chat|请清楚复印护照首页。|护照
lek-passport|เลขหนังสือเดินทาง|leek nang-sue doen-thaang|护照号码|名词|护照签证|เลขหนังสือเดินทางต้องกรอกให้ตรงกับเล่มจริง|leek nang-sue doen-thaang dtawng graawk hai dtrong gap lem jing|护照号码必须按原件填写一致。|护照
wan-mot-aa-yu-passport|วันหมดอายุหนังสือเดินทาง|wan mot aa-yu nang-sue doen-thaang|护照有效期截止日|名词|护照签证|สายการบินถามวันหมดอายุหนังสือเดินทางก่อนออกตั๋ว|saai gaan-bin thaam wan mot aa-yu nang-sue doen-thaang gaawn aawk dtua|航空公司出票前询问护照有效期截止日。|护照
wii-saa|วีซ่า|wii-saa|签证|名词|护照签证|ฉันต้องขอวีซ่าก่อนเดินทางไปประเทศนั้น|chan dtawng khaaw wii-saa gaawn doen-thaang bpai bpra-theet nan|我去那个国家前必须申请签证。|签证
khaaw-wii-saa|ขอวีซ่า|khaaw wii-saa|申请签证|动词|护照签证|การขอวีซ่าต้องใช้รูปถ่ายและเอกสารการเงิน|gaan khaaw wii-saa dtawng chai ruup thaai lae eek-ga-saan gaan-ngoen|申请签证需要照片和财务材料。|签证
baep-faawm-wii-saa|แบบฟอร์มวีซ่า|baep-faawm wii-saa|签证申请表|名词|护照签证|แบบฟอร์มวีซ่าต้องกรอกเป็นภาษาอังกฤษทั้งหมด|baep-faawm wii-saa dtawng graawk bpen phaa-saa ang-grit thang-mot|签证申请表要全部用英文填写。|签证
visa-mot-aa-yu|วีซ่าหมดอายุ|wii-saa mot aa-yu|签证过期|短语|护照签证|ถ้าวีซ่าหมดอายุ จะอยู่ต่อไม่ได้ตามกฎหมาย|thaa wii-saa mot aa-yu ja yuu dtaaw mai dai dtaam got-maai|如果签证过期，就不能依法继续停留。|签证
dtaaw-wii-saa|ต่อวีซ่า|dtaaw wii-saa|续签；延长签证|动词|护照签证|ฉันต้องต่อวีซ่าก่อนสิ้นเดือนนี้|chan dtawng dtaaw wii-saa gaawn sin duean nii|我必须在这个月底前续签。|签证
tam-mai-passport|ทำหนังสือเดินทางใหม่|tham nang-sue doen-thaang mai|办理新护照|动词|护照签证|ถ้าหนังสือเดินทางหาย ต้องทำหนังสือเดินทางใหม่|thaa nang-sue doen-thaang haai dtawng tham nang-sue doen-thaang mai|如果护照丢失，必须办理新护照。|护照
passport-haai|หนังสือเดินทางหาย|nang-sue doen-thaang haai|护照丢了|短语|护照签证|เมื่อหนังสือเดินทางหาย เขารีบไปแจ้งตำรวจ|muea nang-sue doen-thaang haai khao riip bpai jaaeng dtam-ruat|护照丢失时，他赶快去报警。|护照
jaeng-tam-ruat|แจ้งตำรวจ|jaaeng dtam-ruat|报警；向警方报告|动词|办事流程|ถ้าเอกสารสำคัญหาย ควรแจ้งตำรวจและขอใบแจ้งความ|thaa eek-ga-saan sam-khan haai khuuan jaaeng dtam-ruat lae khaaw bai jaaeng-khwaam|如果重要文件丢了，应该报警并申请报案证明。|流程
bai-jaeng-khwaam|ใบแจ้งความ|bai jaaeng-khwaam|报案证明|名词|申请材料|สถานทูตขอใบแจ้งความเมื่อหนังสือเดินทางหาย|sa-thaan-thuut khaaw bai jaaeng-khwaam muea nang-sue doen-thaang haai|护照丢失时，大使馆要求报案证明。|材料
sa-thaan-thuut|สถานทูต|sa-thaan-thuut|大使馆|名词|办事流程|ฉันต้องไปสถานทูตเพื่อถามเรื่องวีซ่า|chan dtawng bpai sa-thaan-thuut phuea thaam rueang wii-saa|我需要去大使馆询问签证的事。|机构
sam-nak-ngaan|สำนักงาน|sam-nak-ngaan|办公室；办事处|名词|办事流程|สำนักงานนี้เปิดให้บริการถึงสี่โมงเย็น|sam-nak-ngaan nii bpoet hai baaw-ri-gaan thueng sii moong yen|这个办事处服务到下午四点。|机构
chaawng-borikaan|ช่องบริการ|chaawng baaw-ri-gaan|服务窗口|名词|办事流程|กรุณายื่นเอกสารที่ช่องบริการหมายเลขสาม|ga-ru-naa yeun eek-ga-saan thii chaawng baaw-ri-gaan maai-leek saam|请在三号服务窗口提交材料。|窗口
rap-bat-khiu|รับบัตรคิว|rap bat khiu|取号|动词|办事流程|มาถึงแล้วต้องรับบัตรคิวก่อนนั่งรอ|maa thueng laaeo dtawng rap bat khiu gaawn nang raaw|到了以后要先取号再坐着等。|流程
raaw-khiu|รอคิว|raaw khiu|排队等候|动词|办事流程|วันนี้คนเยอะมาก ฉันรอคิวเกือบหนึ่งชั่วโมง|wan-nii khon yoe maak chan raaw khiu geuuap neung chua-moong|今天人很多，我排队等了将近一小时。|流程
thueng-khiu|ถึงคิว|thueng khiu|轮到号|短语|办事流程|เมื่อถึงคิว เจ้าหน้าที่เรียกชื่อฉันผ่านลำโพง|muea thueng khiu jao-naa-thii riiak chue chan phaan lam-phoong|轮到号时，工作人员通过喇叭叫我的名字。|流程
khiu-loei|คิวเลย|khiu loei|过号|短语|办事流程|ฉันไปเข้าห้องน้ำแล้วคิวเลย ต้องรับบัตรคิวใหม่|chan bpai khao haawng-naam laaeo khiu loei dtawng rap bat khiu mai|我去了洗手间然后过号了，必须重新取号。|流程
jao-naa-thii|เจ้าหน้าที่|jao-naa-thii|工作人员|名词|办事流程|เจ้าหน้าที่ช่วยตรวจแบบฟอร์มก่อนให้ฉันยื่นคำขอ|jao-naa-thii chuai dtruat baep-faawm gaawn hai chan yeun kham-khaaw|工作人员帮忙检查表格后让我提交申请。|人物
kham-nae-nam-jao-naa-thii|คำแนะนำเจ้าหน้าที่|kham-nae-nam jao-naa-thii|工作人员建议|名词|办事流程|ฉันทำตามคำแนะนำเจ้าหน้าที่และเตรียมเอกสารเพิ่ม|chan tham dtaam kham-nae-nam jao-naa-thii lae dtriiam eek-ga-saan phoem|我按照工作人员建议，补充准备材料。|流程
thaam-khaaw-muun|ถามข้อมูล|thaam khaaw-muun|询问信息|动词|办事流程|ถ้าไม่เข้าใจช่องนี้ ให้ถามข้อมูลจากเจ้าหน้าที่|thaa mai khao-jai chaawng nii hai thaam khaaw-muun jaak jao-naa-thii|如果不理解这一栏，请向工作人员询问信息。|流程
khaw-khwam-chuai-luea|ขอความช่วยเหลือ|khaaw khwaam chuai-luea|请求帮助|动词|办事流程|ฉันขอความช่วยเหลือเพราะอ่านภาษาไทยในแบบฟอร์มไม่ออก|chan khaaw khwaam chuai-luea phraw aan phaa-saa thai nai baep-faawm mai aawk|我请求帮助，因为看不懂表格里的泰语。|流程
khrai-pen-phuu-dtid-dtaaw|ใครเป็นผู้ติดต่อ|khrai bpen phuu dtit-dtaaw|谁是联系人|短语|个人信息|ในแบบฟอร์มถามว่าใครเป็นผู้ติดต่อกรณีฉุกเฉิน|nai baep-faawm thaam waa khrai bpen phuu dtit-dtaaw ga-ra-nii chuk-choen|表格问谁是紧急联系人。|联系人
phuu-dtid-dtaaw|ผู้ติดต่อ|phuu dtit-dtaaw|联系人|名词|个人信息|ผู้ติดต่อของฉันคือพี่สาวและมีเบอร์โทรในแบบฟอร์ม|phuu dtit-dtaaw khaawng chan khue phii-saao lae mii booe thoo nai baep-faawm|我的联系人是姐姐，表格里有电话号码。|联系人
phuu-dtid-dtaaw-chuk-choen|ผู้ติดต่อฉุกเฉิน|phuu dtit-dtaaw chuk-choen|紧急联系人|名词|个人信息|โรงเรียนขอชื่อผู้ติดต่อฉุกเฉินของนักเรียนทุกคน|roong-riian khaaw chue phuu dtit-dtaaw chuk-choen khaawng nak-riian thuk khon|学校要求所有学生填写紧急联系人姓名。|联系人
khwam-samphan|ความสัมพันธ์|khwaam-sam-phan|关系|名词|个人信息|ช่องนี้ให้กรอกความสัมพันธ์ เช่น แม่ พ่อ หรือเพื่อน|chaawng nii hai graawk khwaam-sam-phan chen maae phaaw rue phuean|这一栏要填写关系，例如母亲、父亲或朋友。|联系人
rup-baep-wan-thii|รูปแบบวันที่|ruup-baep wan-thii|日期格式|名词|表格填写|รูปแบบวันที่ในเอกสารนี้คือวัน เดือน ปี|ruup-baep wan-thii nai eek-ga-saan nii khue wan duean bpii|这份文件的日期格式是日、月、年。|表格
wan-thii-sa-mak|วันที่สมัคร|wan-thii sa-mak|申请日期|名词|表格填写|อย่าลืมเขียนวันที่สมัครที่ด้านบนของแบบฟอร์ม|yaa luem khiian wan-thii sa-mak thii daan bon khaawng baep-faawm|别忘了在表格上方写申请日期。|表格
laai-mue-chue|ลายมือชื่อ|laai-mue chue|手写签名|名词|签名复印|ลายมือชื่อของผู้สมัครต้องอยู่ในช่องนี้|laai-mue chue khaawng phuu sa-mak dtawng yuu nai chaawng nii|申请人的手写签名必须在这一栏。|签名
phuu-sa-mak|ผู้สมัคร|phuu sa-mak|申请人|名词|申请材料|ผู้สมัครต้องเตรียมเอกสารตัวจริงและสำเนา|phuu sa-mak dtawng dtriiam eek-ga-saan dtua jing lae sam-nao|申请人必须准备文件原件和复印件。|人物
khwam-prasong|ความประสงค์|khwaam bpra-song|申请目的；意愿|名词|表格填写|กรุณาเขียนความประสงค์สั้น ๆ ในช่องนี้|ga-ru-naa khiian khwaam bpra-song san san nai chaawng nii|请在这一栏简短填写申请目的。|表格
het-phon|เหตุผล|het-phon|理由|名词|表格填写|ฉันต้องเขียนเหตุผลที่ขอเปลี่ยนที่อยู่|chan dtawng khiian het-phon thii khaaw bpliian thii-yuu|我必须写明申请更改地址的理由。|表格
lak-thaan|หลักฐาน|lak-thaan|证明；证据材料|名词|申请材料|หลักฐานที่อยู่ต้องเป็นบิลค่าน้ำหรือค่าไฟล่าสุด|lak-thaan thii-yuu dtawng bpen bin khaa naam rue khaa fai laa-sut|住址证明必须是最新水费或电费账单。|材料
lak-thaan-thii-yuu|หลักฐานที่อยู่|lak-thaan thii-yuu|住址证明|名词|申请材料|ธนาคารขอหลักฐานที่อยู่ก่อนเปิดบัญชีใหม่|tha-naa-khaan khaaw lak-thaan thii-yuu gaawn bpoet ban-chii mai|银行开户前要求住址证明。|材料
bai-rap-rawng|ใบรับรอง|bai rap-raawng|证明书；证明文件|名词|申请材料|โรงเรียนออกใบรับรองให้นักเรียนภายในสามวัน|roong-riian aawk bai rap-raawng hai nak-riian phaai-nai saam wan|学校会在三天内给学生出具证明。|材料
bai-rap-rawng-gaan-riian|ใบรับรองการเรียน|bai rap-raawng gaan riian|在学证明|名词|申请材料|ฉันต้องใช้ใบรับรองการเรียนเพื่อขอวีซ่า|chan dtawng chai bai rap-raawng gaan riian phuea khaaw wii-saa|我申请签证需要在学证明。|材料
bai-rap-rawng-gaan-tham-ngaan|ใบรับรองการทำงาน|bai rap-raawng gaan tham ngaan|在职证明|名词|申请材料|บริษัทออกใบรับรองการทำงานให้ฉันเป็นภาษาอังกฤษ|baaw-ri-sat aawk bai rap-raawng gaan tham ngaan hai chan bpen phaa-saa ang-grit|公司给我开了英文在职证明。|材料
eek-ga-saan-gaan-ngoen|เอกสารการเงิน|eek-ga-saan gaan-ngoen|财务材料|名词|申请材料|การขอวีซ่าบางประเภทต้องใช้เอกสารการเงิน|gaan khaaw wii-saa baang bpra-pheet dtawng chai eek-ga-saan gaan-ngoen|申请某些类型签证需要财务材料。|材料
samnao-banchi|สำเนาบัญชี|sam-nao ban-chii|账户复印件；存折复印件|名词|申请材料|เจ้าหน้าที่ขอสำเนาบัญชีสามเดือนล่าสุด|jao-naa-thii khaaw sam-nao ban-chii saam duean laa-sut|工作人员要求最近三个月账户复印件。|材料
eek-ga-saan-laa-sut|เอกสารล่าสุด|eek-ga-saan laa-sut|最新文件|名词|资料状态|กรุณาใช้เอกสารล่าสุด ไม่ใช่สำเนาเก่าปีที่แล้ว|ga-ru-naa chai eek-ga-saan laa-sut mai chai sam-nao gao bpii thii laaeo|请使用最新文件，不要用去年的旧复印件。|状态
eek-ga-saan-gao|เอกสารเก่า|eek-ga-saan gao|旧文件|名词|资料状态|เอกสารเก่านี้ใช้ไม่ได้ เพราะข้อมูลที่อยู่เปลี่ยนแล้ว|eek-ga-saan gao nii chai mai dai phraw khaaw-muun thii-yuu bpliian laaeo|这份旧文件不能用，因为地址信息已经变了。|状态
chai-dai|ใช้ได้|chai dai|可以用；有效|形容词|资料状态|สำเนาชุดนี้ยังใช้ได้ เพราะถ่ายชัดและข้อมูลครบ|sam-nao chut nii yang chai dai phraw thaai chat lae khaaw-muun khrop|这套复印件还可以用，因为复印清楚且资料完整。|状态
chai-mai-dai|ใช้ไม่ได้|chai mai dai|不能用；无效|形容词|资料状态|รูปถ่ายนี้ใช้ไม่ได้ เพราะพื้นหลังไม่ใช่สีขาว|ruup thaai nii chai mai dai phraw phuen-lang mai chai sii khaao|这张照片不能用，因为背景不是白色。|状态
khrop-thuan|ครบถ้วน|khrop-thuan|完整齐全|形容词|资料状态|ข้อมูลในแบบฟอร์มต้องครบถ้วนก่อนยื่นคำขอ|khaaw-muun nai baep-faawm dtawng khrop-thuan gaawn yeun kham-khaaw|表格里的信息必须完整齐全后再提交申请。|状态
khaat|ขาด|khaat|缺少|动词|资料状态|เอกสารของฉันขาดรูปถ่ายหนึ่งใบ|eek-ga-saan khaawng chan khaat ruup thaai neung bai|我的材料缺少一张照片。|状态
dtong-phoem|ต้องเพิ่ม|dtawng phoem|需要补充|短语|资料状态|เจ้าหน้าที่บอกว่าต้องเพิ่มสำเนาบัตรประชาชนอีกหนึ่งชุด|jao-naa-thii baawk waa dtawng phoem sam-nao bat bpra-chaa-chon iik neung chut|工作人员说需要再补一套身份证复印件。|状态
naaep-eek-ga-saan|แนบเอกสาร|naaep eek-ga-saan|附上文件|动词|申请材料|กรุณาแนบเอกสารทั้งหมดก่อนกดส่งแบบฟอร์ม|ga-ru-naa naaep eek-ga-saan thang-mot gaawn got song baep-faawm|请在点击提交表格前附上所有文件。|材料
ap-loot-eek-ga-saan|อัปโหลดเอกสาร|ap-loot eek-ga-saan|上传文件|动词|办事流程|ระบบให้ฉันอัปโหลดเอกสารเป็นไฟล์พีดีเอฟ|ra-bop hai chan ap-loot eek-ga-saan bpen faai phii-dii-ef|系统让我把文件上传为 PDF 文件。|流程
got-song|กดส่ง|got song|点击提交|动词|办事流程|ก่อนกดส่ง กรุณาตรวจข้อมูลทุกช่องอีกครั้ง|gaawn got song ga-ru-naa dtruat khaaw-muun thuk chaawng iik khrang|点击提交前，请再检查每一栏信息。|流程
ra-bop-khaaw-muun|ระบบข้อมูล|ra-bop khaaw-muun|资料系统；信息系统|名词|办事流程|ระบบข้อมูลปิดปรับปรุงตอนเที่ยงคืน|ra-bop khaaw-muun bpit bprap-bprung dtaawn thiiang-khuen|资料系统半夜关闭维护。|流程
bpit-bprap-bprung|ปิดปรับปรุง|bpit bprap-bprung|关闭维护|动词|办事流程|เว็บไซต์ปิดปรับปรุงคืนนี้ จึงยื่นออนไลน์ไม่ได้|wep-sai bpit bprap-bprung khuen-nii jeung yeun awn-lai mai dai|网站今晚关闭维护，所以不能在线提交。|流程
yeun-online|ยื่นออนไลน์|yeun awn-lai|线上提交|动词|办事流程|ถ้าไม่สะดวกไปสำนักงาน สามารถยื่นออนไลน์ได้|thaa mai sa-duak bpai sam-nak-ngaan saa-maat yeun awn-lai dai|如果不方便去办事处，可以线上提交。|流程
yeun-thii-sam-nak-ngaan|ยื่นที่สำนักงาน|yeun thii sam-nak-ngaan|到办事处提交|动词|办事流程|เอกสารตัวจริงต้องยื่นที่สำนักงานเท่านั้น|eek-ga-saan dtua jing dtawng yeun thii sam-nak-ngaan thao-nan|文件原件只能到办事处提交。|流程
rap-phon|รับผล|rap phon|领取结果|动词|办事流程|คุณสามารถรับผลได้หลังจากยื่นเอกสารเจ็ดวัน|khun saa-maat rap phon dai lang jaak yeun eek-ga-saan jet wan|提交材料七天后可以领取结果。|流程
phon-gaan-sa-mak|ผลการสมัคร|phon gaan sa-mak|申请结果|名词|办事流程|ผลการสมัครจะส่งให้ทางอีเมลในสัปดาห์หน้า|phon gaan sa-mak ja song hai thaang ii-meel nai sap-daa naa|申请结果会在下周通过邮件发送。|流程
mai-phaan|ไม่ผ่าน|mai phaan|未通过|动词|资料状态|ถ้าเอกสารไม่ครบ การสมัครอาจไม่ผ่าน|thaa eek-ga-saan mai khrop gaan sa-mak aat mai phaan|如果材料不齐，申请可能未通过。|状态
phaan|ผ่าน|phaan|通过|动词|资料状态|คำขอของฉันผ่านแล้ว และสามารถรับเอกสารพรุ่งนี้|kham-khaaw khaawng chan phaan laaeo lae saa-maat rap eek-ga-saan phrung-nii|我的申请已经通过，明天可以领取文件。|状态
dtit-dtaam-phon|ติดตามผล|dtit-dtaam phon|跟进结果|动词|办事流程|ถ้ายังไม่ได้อีเมล คุณควรโทรติดตามผลกับเจ้าหน้าที่|thaa yang mai dai ii-meel khun khuuan thoo dtit-dtaam phon gap jao-naa-thii|如果还没收到邮件，你应该打电话向工作人员跟进结果。|流程
`;

export const VOCABULARY_EXPANSION_A2_PERSONAL_DOCUMENTS_01: VocabularyExpansionA2PersonalDocumentsCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
