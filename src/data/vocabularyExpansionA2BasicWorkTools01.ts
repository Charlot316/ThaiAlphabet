type PartOfSpeech = "名词" | "动词" | "形容词" | "短语";
type Theme = "电脑设备" | "文件表格" | "打印复印" | "电话沟通" | "制服用品" | "收银付款" | "清单钥匙" | "工作用品";
type Example = { thai: string; roman: string; chinese: string };
type Related = { thai: string; roman?: string; chinese?: string; notesZh?: string };
type Comparison = { kind: "近义" | "反义" | "易混" | "用法"; target: Related; distinctionZh: string };
type Collocation = { thai: string; roman?: string; chinese: string; notesZh?: string };
type Sense = { id: string; chinese: string; examples: Example[]; usageNotesZh?: string[] };

export type VocabularyExpansionA2BasicWorkToolsCandidate = {
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

const SOURCE_REFS = ["thai-frequency", "thai-basic-work-tools-candidate", "pythainlp-corpus"];

function parseRows(raw: string): Row[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [id, thai, roman, chinese, partOfSpeech, theme, exampleThai, exampleRoman, exampleChinese, tag] = line.split("|").map((part) => part.trim());
      return { id, thai, roman, chinese, partOfSpeech: partOfSpeech as PartOfSpeech, theme: theme as Theme, exampleThai, exampleRoman, exampleChinese, tag };
    });
}

function buildCandidate(row: Row, index: number, rows: Row[]): VocabularyExpansionA2BasicWorkToolsCandidate {
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
    senses: [{ id: "main", chinese: row.chinese, examples: [{ thai: row.exampleThai, roman: row.exampleRoman, chinese: row.exampleChinese }], usageNotesZh: [`${row.thai} 常用于办公室、商店、服务现场或学校行政中的基础工作工具和动作。`] }],
    synonyms: [{ thai: related.thai, roman: related.roman, chinese: related.chinese }],
    antonyms: [],
    comparisons: [{ kind: "易混", target: { thai: related.thai, roman: related.roman, chinese: related.chinese }, distinctionZh: `${row.thai} 表示“${row.chinese}”；${related.thai} 表示“${related.chinese}”，工作场景中要分清工具、文件、设备和操作动作。` }],
    collocations: [{ thai: row.thai, roman: row.roman, chinese: row.chinese }],
    usageNotesZh: ["描述工作工具时，常搭配 ใช้、เปิด、ปิด、ส่ง、พิมพ์、เช็ก、เก็บ 等基础动词。"],
    tags: [row.theme, row.tag],
    sourceRefs: SOURCE_REFS,
    reviewStatus: "candidate-draft",
  };
}

const RAW_ROWS = `
khawm-phiu-dter-tham-ngaan|คอมพิวเตอร์ทำงาน|khaawm-phiu-dter tham-ngaan|工作电脑|名词|电脑设备|คอมพิวเตอร์ทำงานของฉันเปิดช้ามากตอนเช้า|khaawm-phiu-dter tham-ngaan khaawng chan bpoet chaa maak dtaawn chaao|我的工作电脑早上开机很慢。|电脑
noot-buk|โน้ตบุ๊ก|noot-buk|笔记本电脑|名词|电脑设备|พนักงานใหม่ได้โน้ตบุ๊กหนึ่งเครื่องสำหรับทำงาน|pha-nak-ngaan mai dai noot-buk neung khreuuang sam-rap tham-ngaan|新员工得到一台笔记本电脑用于工作。|电脑
naa-jaaw|หน้าจอ|naa-jaaw|屏幕|名词|电脑设备|หน้าจอของเครื่องนี้สว่างเกินไป ต้องปรับลง|naa-jaaw khaawng khreuuang nii sa-waang goen bpai dtawng bprap long|这台机器的屏幕太亮了，需要调低。|电脑
khii-baawd|คีย์บอร์ด|khii-baawd|键盘|名词|电脑设备|คีย์บอร์ดเปียกน้ำจึงพิมพ์ตัวอักษรไม่ได้|khii-baawd bpiiak naam jeung phim dtua-ak-saawn mai dai|键盘进水了，所以打不了字母。|电脑
maao|เมาส์|mao|鼠标|名词|电脑设备|เมาส์ไม่ขยับ ฉันจึงลองเปลี่ยนถ่านใหม่|mao mai kha-yap chan jeung laawng bplian thaan mai|鼠标不动，所以我试着换新电池。|电脑
saai-chaat|สายชาร์จ|saai chaat|充电线|名词|电脑设备|อย่าลืมเอาสายชาร์จโน้ตบุ๊กไปประชุม|yaa leum ao saai chaat noot-buk bpai bpra-chum|别忘了带笔记本电脑充电线去开会。|电脑
plak-fai|ปลั๊กไฟ|bplak fai|插座|名词|电脑设备|โต๊ะประชุมมีปลั๊กไฟสองจุดใต้โต๊ะ|dto bpra-chum mii bplak fai saawng jut dtai dto|会议桌下面有两个插座。|电脑
saai-fai|สายไฟ|saai fai|电线|名词|电脑设备|กรุณาเก็บสายไฟให้เรียบร้อยเพื่อไม่ให้สะดุด|ga-ru-naa gep saai fai hai riap-raawy phuea mai hai sa-dut|请把电线收好，避免绊倒。|安全
wi-fai-tham-ngaan|ไวไฟทำงาน|wai-fai tham-ngaan|工作网络|名词|电脑设备|ไวไฟทำงานหลุดบ่อย ทำให้ส่งไฟล์ไม่ได้|wai-fai tham-ngaan lut baawy tham hai song fai mai dai|工作网络经常断，导致不能发文件。|网络
ra-hat-wai-fai|รหัสไวไฟ|ra-hat wai-fai|无线网密码|名词|电脑设备|หัวหน้าเขียนรหัสไวไฟไว้บนกระดานเล็ก|hua-naa khiian ra-hat wai-fai wai bon gra-daan lek|主管把无线网密码写在小白板上。|网络
poet-khreuang|เปิดเครื่อง|bpoet khreuuang|开机|动词|电脑设备|ก่อนเริ่มงาน กรุณาเปิดเครื่องและเช็กอีเมล|gaawn roem ngaan ga-ru-naa bpoet khreuuang lae chek ii-meel|开始工作前，请开机并查看邮件。|电脑
bpit-khreuang|ปิดเครื่อง|bpit khreuuang|关机|动词|电脑设备|หลังเลิกงานต้องปิดเครื่องและปิดไฟโต๊ะ|lang loek-ngaan dtawng bpit khreuuang lae bpit fai dto|下班后要关机并关桌灯。|电脑
khao-ra-bop|เข้าระบบ|khao ra-bop|登录系统|动词|电脑设备|ฉันเข้าระบบไม่ได้เพราะลืมรหัสผ่าน|chan khao ra-bop mai dai phraw leum ra-hat phaan|我登录不了系统，因为忘了密码。|系统
aawk-jaak-ra-bop|ออกจากระบบ|aawk jaak ra-bop|退出系统|动词|电脑设备|เมื่อใช้คอมพิวเตอร์ร่วมกัน ต้องออกจากระบบทุกครั้ง|meua chai khaawm-phiu-dter ruam gan dtawng aawk jaak ra-bop thuk khrang|共用电脑时，每次都要退出系统。|系统
ra-hat-phaan|รหัสผ่าน|ra-hat phaan|密码|名词|电脑设备|อย่าบอกรหัสผ่านให้เพื่อนร่วมงานคนอื่น|yaa baawk ra-hat phaan hai pheuan-ruam-ngaan khon eun|不要把密码告诉其他同事。|系统
leum-ra-hat-phaan|ลืมรหัสผ่าน|leum ra-hat phaan|忘记密码|动词|电脑设备|ถ้าลืมรหัสผ่าน ให้ติดต่อฝ่ายไอที|thaa leum ra-hat phaan hai dtit-dtaaw faai ai-thii|如果忘记密码，请联系IT部门。|系统
fai-ngaan|ไฟล์งาน|fai ngaan|工作文件|名词|文件表格|ไฟล์งานอยู่ในโฟลเดอร์ชื่อเดือนพฤษภาคม|fai ngaan yuu nai foon-doe cheu deuan phreut-sa-phaa-khom|工作文件在名为五月的文件夹里。|文件
foon-doe|โฟลเดอร์|foon-doe|文件夹|名词|文件表格|กรุณาเก็บรูปทั้งหมดไว้ในโฟลเดอร์เดียวกัน|ga-ru-naa gep ruup thang-mot wai nai foon-doe diao gan|请把所有图片放在同一个文件夹里。|文件
cheu-fai|ชื่อไฟล์|cheu fai|文件名|名词|文件表格|ชื่อไฟล์ควรมีวันที่เพื่อให้หาได้ง่าย|cheu fai khuan mii wan-thii phuea hai haa dai ngaai|文件名应该有日期，方便查找。|文件
bpoet-fai|เปิดไฟล์|bpoet fai|打开文件|动词|文件表格|ฉันเปิดไฟล์ไม่ได้เพราะโปรแกรมเก่าเกินไป|chan bpoet fai mai dai phraw bproo-graem gao goen bpai|我打不开文件，因为程序太旧了。|文件
pit-fai|ปิดไฟล์|bpit fai|关闭文件|动词|文件表格|ก่อนปิดไฟล์ อย่าลืมบันทึกงานก่อน|gaawn bpit fai yaa leum ban-theuk ngaan gaawn|关闭文件前，别忘了先保存工作。|文件
ban-theuk-ngaan|บันทึกงาน|ban-theuk ngaan|保存工作|动词|文件表格|ควรบันทึกงานทุกสิบนาทีเพื่อกันไฟล์หาย|khuan ban-theuk ngaan thuk sip naa-thii phuea gan fai haai|应该每十分钟保存工作，防止文件丢失。|文件
song-fai|ส่งไฟล์|song fai|发送文件|动词|文件表格|หลังแก้เสร็จแล้ว กรุณาส่งไฟล์ให้หัวหน้า|lang gae set laeo ga-ru-naa song fai hai hua-naa|修改完成后，请把文件发给主管。|文件
naep-fai|แนบไฟล์|naep fai|附上文件|动词|文件表格|เวลาอีเมลหาลูกค้า ต้องแนบไฟล์ใบเสนอราคา|wee-laa ii-meel haa luuk-khaa dtawng naep fai bai sa-noe raa-khaa|给客户发邮件时，必须附上报价单文件。|文件
fai-haai|ไฟล์หาย|fai haai|文件丢失|短语|文件表格|ไฟล์หายจากเครื่องหลังคอมพิวเตอร์ดับเอง|fai haai jaak khreuuang lang khaawm-phiu-dter dap eeng|电脑自动关机后，文件从机器里丢了。|文件
fai-sam-nao|ไฟล์สำเนา|fai sam-nao|文件副本|名词|文件表格|ฉันเก็บไฟล์สำเนาไว้ในไดรฟ์กลาง|chan gep fai sam-nao wai nai drai glaang|我把文件副本保存在公共云盘里。|文件
ek-ga-saan|เอกสาร|eek-ga-saan|文件资料|名词|文件表格|เอกสารชุดนี้ต้องส่งให้แผนกบัญชีวันนี้|eek-ga-saan chut nii dtawng song hai pha-naek ban-chii wan-nii|这套文件资料今天要交给财务部门。|文件
baep-faawm|แบบฟอร์ม|baep-faawm|表格|名词|文件表格|พนักงานใหม่ต้องกรอกแบบฟอร์มข้อมูลส่วนตัว|pha-nak-ngaan mai dtawng graawk baep-faawm khaaw-muun suan-dtua|新员工需要填写个人资料表格。|表格
graawk-baep-faawm|กรอกแบบฟอร์ม|graawk baep-faawm|填写表格|动词|文件表格|กรุณากรอกแบบฟอร์มด้วยตัวบรรจงและอ่านง่าย|ga-ru-naa graawk baep-faawm duai dtua ban-jong lae aan ngaai|请用工整且易读的字填写表格。|表格
chaawng-wang|ช่องว่าง|chaawng waang|空格栏|名词|文件表格|ถ้าไม่มีข้อมูล ให้ขีดเส้นในช่องว่างนั้น|thaa mai mii khaaw-muun hai khiit sen nai chaawng waang nan|如果没有资料，请在那个空格栏画线。|表格
long-cheu|ลงชื่อ|long cheu|签名|动词|文件表格|ก่อนส่งเอกสาร ต้องลงชื่อที่มุมล่างขวา|gaawn song eek-ga-saan dtawng long cheu thii mum laang khwaa|提交文件前，要在右下角签名。|签名
laai-sen|ลายเซ็น|laai-sen|签名笔迹|名词|文件表格|ลายเซ็นในเอกสารต้องเหมือนกับในบัตร|laai-sen nai eek-ga-saan dtawng meuan gap nai bat|文件里的签名必须和证件上的一致。|签名
dtet-ek-ga-saan|ตรวจเอกสาร|dtruat eek-ga-saan|检查文件|动词|文件表格|หัวหน้าตรวจเอกสารก่อนส่งให้ลูกค้า|hua-naa dtruat eek-ga-saan gaawn song hai luuk-khaa|主管在发给客户前检查文件。|文件
faem-ek-ga-saan|แฟ้มเอกสาร|faem eek-ga-saan|文件夹册|名词|文件表格|แฟ้มเอกสารสีฟ้าวางอยู่บนชั้นหลังโต๊ะ|faem eek-ga-saan sii faa waang yuu bon chan lang dto|蓝色文件夹册放在桌子后面的架子上。|文件
gra-daat|กระดาษ|gra-daat|纸|名词|打印复印|เครื่องพิมพ์ไม่มีกระดาษจึงพิมพ์ไม่ได้|khreuuang phim mai mii gra-daat jeung phim mai dai|打印机没有纸，所以不能打印。|打印
gra-daat-a-sii|กระดาษเอสี่|gra-daat ee-sii|A4纸|名词|打印复印|ออฟฟิศสั่งกระดาษเอสี่เพิ่มอีกห้ากล่อง|aawf-fit sang gra-daat ee-sii phoem iik haa glaawng|办公室又订了五箱A4纸。|打印
khreuuang-phim|เครื่องพิมพ์|khreuuang phim|打印机|名词|打印复印|เครื่องพิมพ์อยู่ข้างห้องประชุมเล็ก|khreuuang phim yuu khaang haawng bpra-chum lek|打印机在小会议室旁边。|打印
phim-ek-ga-saan|พิมพ์เอกสาร|phim eek-ga-saan|打印文件|动词|打印复印|ช่วยพิมพ์เอกสารนี้สามชุดให้หน่อย|chuai phim eek-ga-saan nii saam chut hai naawy|请帮忙打印这份文件三份。|打印
khreuuang-phim-sia|เครื่องพิมพ์เสีย|khreuuang phim siia|打印机坏了|短语|打印复印|เครื่องพิมพ์เสียตอนเช้า ต้องเรียกฝ่ายไอที|khreuuang phim siia dtaawn chaao dtawng riiak faai ai-thii|打印机早上坏了，需要叫IT部门。|打印
muek-phim|หมึกพิมพ์|meuk phim|打印墨水|名词|打印复印|หมึกพิมพ์สีดำใกล้หมดแล้ว ต้องเปลี่ยนตลับ|meuk phim sii dam glai mot laeo dtawng bplian dta-lap|黑色打印墨水快用完了，需要换墨盒。|打印
dta-lap-muek|ตลับหมึก|dta-lap meuk|墨盒|名词|打印复印|ตลับหมึกใหม่อยู่ในตู้เก็บของสำนักงาน|dta-lap meuk mai yuu nai dtuu gep khaawng sam-nak-ngaan|新墨盒在办公室储物柜里。|打印
khreuuang-thaai-ek-ga-saan|เครื่องถ่ายเอกสาร|khreuuang thaai eek-ga-saan|复印机|名词|打印复印|เครื่องถ่ายเอกสารใช้บัตรพนักงานก่อนเริ่มงาน|khreuuang thaai eek-ga-saan chai bat pha-nak-ngaan gaawn roem ngaan|复印机开始使用前要用员工卡。|复印
thaai-ek-ga-saan|ถ่ายเอกสาร|thaai eek-ga-saan|复印文件|动词|打印复印|กรุณาถ่ายเอกสารบัตรประชาชนสองชุด|ga-ru-naa thaai eek-ga-saan bat bpra-chaa-chon saawng chut|请复印两份身份证。|复印
sam-nao|สำเนา|sam-nao|复印件|名词|打印复印|ต้องแนบสำเนาหนังสือเดินทางกับแบบฟอร์ม|dtawng naep sam-nao nang-seu doen-thaang gap baep-faawm|必须把护照复印件附在表格上。|复印
stapler|ที่เย็บกระดาษ|thii yep gra-daat|订书机|名词|工作用品|ที่เย็บกระดาษอยู่ในลิ้นชักโต๊ะหน้า|thii yep gra-daat yuu nai lin-chak dto naa|订书机在前台桌子的抽屉里。|用品
luk-yep|ลูกเย็บ|luuk yep|订书钉|名词|工作用品|ลูกเย็บหมดแล้ว ช่วยหยิบกล่องใหม่ให้หน่อย|luuk yep mot laeo chuai yip glaawng mai hai naawy|订书钉用完了，请帮忙拿一盒新的。|用品
clip-nip-gra-daat|คลิปหนีบกระดาษ|khlip niip gra-daat|回形针|名词|工作用品|ใช้คลิปหนีบกระดาษรวมใบเสร็จไว้ด้วยกัน|chai khlip niip gra-daat ruam bai-set wai duai gan|用回形针把收据夹在一起。|用品
sa-got-thep|สกอตช์เทป|sa-got theep|透明胶带|名词|工作用品|ฉันใช้สกอตช์เทปติดป้ายชื่อบนกล่อง|chan chai sa-got theep dtit bpaai cheu bon glaawng|我用透明胶带把姓名标签贴在盒子上。|用品
gao|กาว|gaao|胶水|名词|工作用品|กาวแท่งนี้ใช้ติดรูปในรายงานได้ดี|gaao thaeng nii chai dtit ruup nai raai-ngaan dai dii|这支胶水适合把图片粘在报告里。|用品
gan-grai|กรรไกร|gan-grai|剪刀|名词|工作用品|กรรไกรคมมาก กรุณาเก็บให้ห่างจากเด็ก|gan-grai khom maak ga-ru-naa gep hai haang jaak dek|剪刀很锋利，请放在远离孩子的地方。|用品
miit-griit|มีดกรีด|miit griit|美工刀|名词|工作用品|ใช้มีดกรีดเปิดกล่องอย่างระวัง|chai miit griit bpoet glaawng yaang ra-wang|用美工刀小心打开箱子。|用品
bpaa-gaa-khian|ปากกาเขียน|bpaa-gaa khiian|书写笔|名词|工作用品|ปากกาเขียนไม่ติดแล้ว ขอแท่งใหม่ได้ไหม|bpaa-gaa khiian mai dtit laeo khaaw thaeng mai dai mai|书写笔写不出来了，可以要一支新的吗？|用品
din-saw|ดินสอ|din-saaw|铅笔|名词|工作用品|ใช้ดินสอจดจำนวนของก่อนลงในระบบ|chai din-saaw jot jam-nuan khaawng gaawn long nai ra-bop|先用铅笔记录物品数量，再录入系统。|用品
yaa-lop|ยางลบ|yaa-lop|橡皮|名词|工作用品|ยางลบอยู่ในกล่องเครื่องเขียนข้างเครื่องพิมพ์|yaa-lop yuu nai glaawng khreuuang-khiian khaang khreuuang phim|橡皮在打印机旁边的文具盒里。|用品
sa-mut-jot|สมุดจด|sa-mut jot|笔记本|名词|工作用品|ฉันพกสมุดจดเล่มเล็กไว้จดคำสั่งลูกค้า|chan phok sa-mut jot lem lek wai jot kham-sang luuk-khaa|我带一本小笔记本记录客户要求。|用品
gra-daan-khaao|กระดานขาว|gra-daan khaao|白板|名词|工作用品|หัวหน้าเขียนรายการงานวันนี้บนกระดานขาว|hua-naa khiian raai-gaan ngaan wan-nii bon gra-daan khaao|主管把今天的任务清单写在白板上。|用品
bpaa-gaa-gra-daan|ปากกากระดาน|bpaa-gaa gra-daan|白板笔|名词|工作用品|ปากกากระดานสีดำหมดหมึกแล้ว|bpaa-gaa gra-daan sii dam mot meuk laeo|黑色白板笔没墨了。|用品
yaang-lop-gra-daan|ยางลบกระดาน|yaa-lop gra-daan|白板擦|名词|工作用品|ช่วยเอายางลบกระดานมาให้ที่ห้องประชุมหน่อย|chuai ao yaa-lop gra-daan maa hai thii haawng bpra-chum naawy|请把白板擦拿到会议室来。|用品
thoo-ra-sap-sam-nak-ngaan|โทรศัพท์สำนักงาน|thoo-ra-sap sam-nak-ngaan|办公室电话|名词|电话沟通|โทรศัพท์สำนักงานดังหลายครั้งแต่ไม่มีคนรับ|thoo-ra-sap sam-nak-ngaan dang laai khrang dtae mai mii khon rap|办公室电话响了很多次，但没人接。|电话
rap-saai|รับสาย|rap saai|接电话|动词|电话沟通|ถ้าฉันไม่อยู่ ช่วยรับสายลูกค้าให้หน่อย|thaa chan mai yuu chuai rap saai luuk-khaa hai naawy|如果我不在，请帮我接客户电话。|电话
thoo-ha-luuk-khaa|โทรหาลูกค้า|thoo haa luuk-khaa|打给客户|动词|电话沟通|พนักงานโทรหาลูกค้าเพื่อยืนยันเวลาส่งของ|pha-nak-ngaan thoo haa luuk-khaa phuea yeun-yan wee-laa song khaawng|员工打给客户确认送货时间。|电话
thoo-glap|โทรกลับ|thoo glap|回电话|动词|电话沟通|ลูกค้าขอให้โทรกลับหลังบ่ายสามโมง|luuk-khaa khaaw hai thoo glap lang baai saam moong|客户要求下午三点后回电话。|电话
fak-khaaw-khwaam|ฝากข้อความ|faak khaaw-khwaam|留言|动词|电话沟通|ถ้าเขาไม่รับสาย กรุณาฝากข้อความไว้|thaa khao mai rap saai ga-ru-naa faak khaaw-khwaam wai|如果他不接电话，请留言。|电话
ber-dtaaw|เบอร์ต่อ|ber dtaaw|分机号|名词|电话沟通|ฝ่ายบัญชีอยู่เบอร์ต่อหนึ่งศูนย์สอง|faai ban-chii yuu ber dtaaw neung suun saawng|财务部门是102分机。|电话
sam-mut-ber-thoo|สมุดเบอร์โทร|sa-mut ber thoo|电话簿|名词|电话沟通|สมุดเบอร์โทรลูกค้าวางอยู่ที่หน้าเคาน์เตอร์|sa-mut ber thoo luuk-khaa waang yuu thii naa khao-dter|客户电话簿放在柜台前面。|电话
fai-chaai|ไฟฉาย|fai-chaai|手电筒|名词|工作用品|ยามใช้ไฟฉายตรวจประตูหลังร้านตอนกลางคืน|yaam chai fai-chaai dtruat bpra-dtuu lang raan dtaawn glaang-kheun|保安晚上用手电筒检查店后门。|用品
chut-yuu-ni-faawm|ชุดยูนิฟอร์ม|chut yuu-ni-faawm|制服|名词|制服用品|พนักงานต้องใส่ชุดยูนิฟอร์มสะอาดทุกวัน|pha-nak-ngaan dtawng sai chut yuu-ni-faawm sa-aat thuk wan|员工每天要穿干净制服。|制服
seua-tham-ngaan|เสื้อทำงาน|seua tham-ngaan|工作上衣|名词|制服用品|เสื้อทำงานสีฟ้าต้องรีดก่อนใส่|seua tham-ngaan sii faa dtawng riit gaawn sai|蓝色工作上衣穿前要熨。|制服
bpai-cheu|ป้ายชื่อ|bpaai cheu|姓名牌|名词|制服用品|ป้ายชื่อติดอยู่ด้านซ้ายของเสื้อทำงาน|bpaai cheu dtit yuu daan saai khaawng seua tham-ngaan|姓名牌贴在工作上衣左侧。|制服
bat-pha-nak-ngaan|บัตรพนักงาน|bat pha-nak-ngaan|员工卡|名词|制服用品|ต้องใช้บัตรพนักงานเข้าออฟฟิศตอนเช้า|dtawng chai bat pha-nak-ngaan khao aawf-fit dtaawn chaao|早上进入办公室需要使用员工卡。|证件
saai-khlaawng-bat|สายคล้องบัตร|saai khlaawng bat|证件挂绳|名词|制服用品|สายคล้องบัตรของฉันขาด ต้องขอเส้นใหม่|saai khlaawng bat khaawng chan khaat dtawng khaaw sen mai|我的证件挂绳断了，需要要一条新的。|证件
pha-kan-bpeuan|ผ้ากันเปื้อน|phaa gan bpeuan|围裙|名词|制服用品|พนักงานครัวใส่ผ้ากันเปื้อนก่อนเริ่มทำอาหาร|pha-nak-ngaan khrua sai phaa gan bpeuan gaawn roem tham aa-haan|厨房员工开始做饭前穿围裙。|制服
thuung-meu|ถุงมือ|thung meu|手套|名词|制服用品|เวลาจับอาหารควรใส่ถุงมือให้สะอาด|wee-laa jap aa-haan khuan sai thung meu hai sa-aat|接触食物时应该戴干净手套。|卫生
naa-gaak|หน้ากาก|naa-gaak|口罩|名词|制服用品|ถ้าไม่สบาย ควรใส่หน้ากากตอนคุยกับลูกค้า|thaa mai sa-baai khuan sai naa-gaak dtaawn khui gap luuk-khaa|如果不舒服，和客户说话时应该戴口罩。|卫生
khreuuang-khit-ngoen|เครื่องคิดเงิน|khreuuang khit ngoen|收银机|名词|收银付款|เครื่องคิดเงินเปิดไม่ได้ตอนร้านเพิ่งเปิด|khreuuang khit ngoen bpoet mai dai dtaawn raan phoeng bpoet|店刚开门时收银机打不开。|收银
lin-chak-ngoen|ลิ้นชักเงิน|lin-chak ngoen|钱箱抽屉|名词|收银付款|ลิ้นชักเงินต้องปิดทุกครั้งหลังทอนเงิน|lin-chak ngoen dtawng bpit thuk khrang lang thaawn ngoen|每次找钱后都要关上钱箱抽屉。|收银
khit-ngoen|คิดเงิน|khit ngoen|结账算钱|动词|收银付款|ลูกค้ารอคิดเงินที่เคาน์เตอร์หน้าร้าน|luuk-khaa raaw khit ngoen thii khao-dter naa raan|客户在店前柜台等结账。|收银
rap-ngoen-sot|รับเงินสด|rap ngoen sot|收现金|动词|收银付款|ร้านยังรับเงินสดและโอนผ่านแอปได้|raan yang rap ngoen sot lae oon phaan aep dai|店里仍然可以收现金，也可以通过应用转账。|付款
thaawn-ngoen|ทอนเงิน|thaawn ngoen|找钱|动词|收银付款|พนักงานทอนเงินให้ลูกค้าครบทุกบาท|pha-nak-ngaan thaawn ngoen hai luuk-khaa khrop thuk baat|员工给客户每一泰铢都找齐了。|收银
ngoen-thaawn|เงินทอน|ngoen thaawn|找零|名词|收银付款|กรุณานับเงินทอนก่อนออกจากร้าน|ga-ru-naa nap ngoen thaawn gaawn aawk jaak raan|离开店前请数一下找零。|收银
bai-set|ใบเสร็จ|bai-set|收据|名词|收银付款|หลังจ่ายเงิน ลูกค้าขอใบเสร็จหนึ่งใบ|lang jaai ngoen luuk-khaa khaaw bai-set neung bai|付款后，客户要一张收据。|收据
phim-bai-set|พิมพ์ใบเสร็จ|phim bai-set|打印收据|动词|收银付款|เครื่องคิดเงินพิมพ์ใบเสร็จช้ากว่าปกติ|khreuuang khit ngoen phim bai-set chaa gwaa bpok-ga-dti|收银机打印收据比平常慢。|收据
sa-gaan-khio-aar|สแกนคิวอาร์|sa-gaan khiu-aa|扫码|动词|收银付款|ลูกค้าสแกนคิวอาร์เพื่อจ่ายค่าอาหาร|luuk-khaa sa-gaan khiu-aa phuea jaai khaa aa-haan|客户扫码支付餐费。|付款
khreuuang-ruut-bat|เครื่องรูดบัตร|khreuuang ruut bat|刷卡机|名词|收银付款|เครื่องรูดบัตรใช้ไม่ได้ ต้องรับเงินสดแทน|khreuuang ruut bat chai mai dai dtawng rap ngoen sot thaen|刷卡机不能用，必须改收现金。|付款
chai-bat|ใช้บัตร|chai bat|用卡支付|动词|收银付款|ถ้าลูกค้าใช้บัตร ต้องให้เซ็นชื่อบนสลิป|thaa luuk-khaa chai bat dtawng hai sen cheu bon sa-lip|如果客户用卡支付，要让他在凭条上签名。|付款
sa-lip|สลิป|sa-lip|凭条|名词|收银付款|เก็บสลิปไว้จนกว่าระบบจะตัดเงินสำเร็จ|gep sa-lip wai jon gwaa ra-bop ja dtat ngoen sam-ret|保留凭条，直到系统扣款成功。|付款
raai-gaan-ngaan|รายการงาน|raai-gaan ngaan|工作清单|名词|清单钥匙|รายการงานวันนี้มีเปิดร้าน เช็กของ และรับลูกค้า|raai-gaan ngaan wan-nii mii bpoet raan chek khaawng lae rap luuk-khaa|今天的工作清单有开店、查货和接待客户。|清单
check-list|เช็กลิสต์|chek-lit|检查清单|名词|清单钥匙|ก่อนปิดร้านต้องทำเช็กลิสต์ให้ครบทุกข้อ|gaawn bpit raan dtawng tham chek-lit hai khrop thuk khaaw|关店前必须完成每一项检查清单。|清单
check-khaawng|เช็กของ|chek khaawng|检查物品|动词|清单钥匙|พนักงานเช็กของบนชั้นก่อนเปิดร้าน|pha-nak-ngaan chek khaawng bon chan gaawn bpoet raan|员工开店前检查货架上的物品。|清单
nap-khaawng|นับของ|nap khaawng|清点物品|动词|清单钥匙|เรานับของในสต็อกทุกวันศุกร์ตอนบ่าย|rao nap khaawng nai sa-dtok thuk wan-suk dtaawn baai|我们每周五下午清点库存物品。|清单
jut-khaawng|จุดของ|jut khaawng|物品位置点|名词|清单钥匙|จุดของทำความสะอาดอยู่หลังประตูครัว|jut khaawng tham khwaam-sa-aat yuu lang bpra-dtuu khrua|清洁用品位置点在厨房门后。|位置
gun-jae|กุญแจ|gun-jae|钥匙|名词|清单钥匙|กุญแจห้องเก็บของอยู่กับหัวหน้ากะ|gun-jae haawng gep khaawng yuu gap hua-naa ga|储物间钥匙在班组长那里。|钥匙
phuang-gun-jae|พวงกุญแจ|phuang gun-jae|钥匙串|名词|清单钥匙|พวงกุญแจมีป้ายชื่อห้องติดไว้ทุกดอก|phuang gun-jae mii bpaai cheu haawng dtit wai thuk daawk|钥匙串上每把钥匙都贴着房间名牌。|钥匙
long-cheu-yuem-gun-jae|ลงชื่อยืมกุญแจ|long cheu yeum gun-jae|签名借钥匙|动词|清单钥匙|ก่อนเอากุญแจไป ต้องลงชื่อยืมกุญแจในสมุด|gaawn ao gun-jae bpai dtawng long cheu yeum gun-jae nai sa-mut|拿钥匙前，要在本子上签名借钥匙。|钥匙
kheun-gun-jae|คืนกุญแจ|kheun gun-jae|归还钥匙|动词|清单钥匙|หลังปิดห้องแล้ว กรุณาคืนกุญแจที่เคาน์เตอร์|lang bpit haawng laeo ga-ru-naa kheun gun-jae thii khao-dter|关好房间后，请把钥匙归还到柜台。|钥匙
gun-jae-haai|กุญแจหาย|gun-jae haai|钥匙丢了|短语|清单钥匙|ถ้ากุญแจหาย ต้องแจ้งหัวหน้าทันที|thaa gun-jae haai dtawng jaeng hua-naa than-thii|如果钥匙丢了，必须马上通知主管。|钥匙
haawng-gep-khaawng|ห้องเก็บของ|haawng gep khaawng|储物间|名词|清单钥匙|ห้องเก็บของอยู่หลังร้านและต้องล็อกตลอดเวลา|haawng gep khaawng yuu lang raan lae dtawng lok dta-laawt wee-laa|储物间在店后面，必须一直上锁。|储物
dtuu-gep-khaawng|ตู้เก็บของ|dtuu gep khaawng|储物柜|名词|清单钥匙|ตู้เก็บของสำหรับพนักงานอยู่ข้างห้องพัก|dtuu gep khaawng sam-rap pha-nak-ngaan yuu khaang haawng phak|员工储物柜在休息室旁边。|储物
chan-wang-khaawng|ชั้นวางของ|chan waang khaawng|货架；置物架|名词|清单钥匙|ชั้นวางของแถวหน้าใกล้เครื่องคิดเงิน|chan waang khaawng thaeo naa glai khreuuang khit ngoen|前排货架靠近收银机。|储物
bpai-rakaa|ป้ายราคา|bpaai raa-khaa|价格标签|名词|工作用品|อย่าลืมเปลี่ยนป้ายราคาก่อนเปิดร้าน|yaa leum bplian bpaai raa-khaa gaawn bpoet raan|开店前别忘了更换价格标签。|标签
bpaai-chue|ป้ายชื่อ|bpaai cheu|名称标签|名词|工作用品|กล่องเอกสารทุกกล่องควรมีป้ายชื่อชัดเจน|glaawng eek-ga-saan thuk glaawng khuan mii bpaai cheu chat-jen|每个文件箱都应该有清楚的名称标签。|标签
dtit-bpaai|ติดป้าย|dtit bpaai|贴标签|动词|工作用品|พนักงานติดป้ายราคาบนสินค้าใหม่ทุกชิ้น|pha-nak-ngaan dtit bpaai raa-khaa bon sin-khaa mai thuk chin|员工给每件新品贴价格标签。|标签
khian-bpaai|เขียนป้าย|khiian bpaai|写标牌|动词|工作用品|ช่วยเขียนป้ายว่าห้องนี้กำลังทำความสะอาด|chuai khiian bpaai waa haawng nii gam-lang tham khwaam-sa-aat|请写个标牌，说明这个房间正在清洁。|标签
glaawng-ek-ga-saan|กล่องเอกสาร|glaawng eek-ga-saan|文件箱|名词|文件表格|กล่องเอกสารเก่าเก็บไว้ใต้โต๊ะทำงาน|glaawng eek-ga-saan gao gep wai dtai dto tham-ngaan|旧文件箱放在办公桌下面。|文件
song-ek-ga-saan|ซองเอกสาร|saawng eek-ga-saan|文件袋|名词|文件表格|ใบสมัครอยู่ในซองเอกสารสีน้ำตาล|bai sa-mak yuu nai saawng eek-ga-saan sii naam-dtaan|申请表在棕色文件袋里。|文件
song-jot-maai|ซองจดหมาย|saawng jot-maai|信封|名词|文件表格|กรุณาใส่ใบเสร็จในซองจดหมายให้ลูกค้า|ga-ru-naa sai bai-set nai saawng jot-maai hai luuk-khaa|请把收据放进信封给客户。|文件
dtat-gra-daat|ตัดกระดาษ|dtat gra-daat|裁纸|动词|工作用品|ใช้กรรไกรตัดกระดาษตามเส้นสีดำ|chai gan-grai dtat gra-daat dtaam sen sii dam|用剪刀沿黑线裁纸。|用品
yep-gra-daat|เย็บกระดาษ|yep gra-daat|订纸|动词|工作用品|ช่วยเย็บกระดาษรายงานสามแผ่นนี้เข้าด้วยกัน|chuai yep gra-daat raai-ngaan saam phaen nii khao duai gan|请把这三页报告订在一起。|用品
niip-gra-daat|หนีบกระดาษ|niip gra-daat|夹纸|动词|工作用品|ใช้คลิปหนีบกระดาษใบเสร็จไว้กับใบงาน|chai khlip niip gra-daat bai-set wai gap bai-ngaan|用回形针把收据夹在工作单上。|用品
saai-wat|สายวัด|saai wat|卷尺|名词|工作用品|ช่างใช้สายวัดวัดขนาดโต๊ะก่อนย้าย|chang chai saai wat wat kha-naat dto gaawn yaai|师傅搬桌子前用卷尺量尺寸。|工具
khreuuang-meu|เครื่องมือ|khreuuang-meu|工具|名词|工作用品|เครื่องมือซ่อมเล็ก ๆ อยู่ในกล่องสีแดง|khreuuang-meu saawm lek lek yuu nai glaawng sii daeng|小维修工具在红色盒子里。|工具
glaawng-khreuuang-meu|กล่องเครื่องมือ|glaawng khreuuang-meu|工具箱|名词|工作用品|หลังใช้เสร็จต้องเก็บไขควงไว้ในกล่องเครื่องมือ|lang chai set dtawng gep khai-khuang wai nai glaawng khreuuang-meu|用完后要把螺丝刀放回工具箱。|工具
khai-khuang|ไขควง|khai-khuang|螺丝刀|名词|工作用品|ขอไขควงเล็กหน่อย ฉันจะขันน็อตเก้าอี้|khaaw khai-khuang lek naawy chan ja khan not gao-ii|请给我小螺丝刀，我要拧椅子的螺丝。|工具
not|น็อต|not|螺丝|名词|工作用品|น็อตใต้โต๊ะหลวม ต้องขันให้แน่น|not dtai dto luam dtawng khan hai naen|桌子下面的螺丝松了，需要拧紧。|工具
khian-raai-ngaan|เขียนรายงาน|khiian raai-ngaan|写报告|动词|文件表格|หลังตรวจร้านเสร็จ ฉันต้องเขียนรายงานสั้น ๆ|lang dtruat raan set chan dtawng khiian raai-ngaan san san|检查店铺后，我需要写一份简短报告。|文件
raai-ngaan-san-san|รายงานสั้น ๆ|raai-ngaan san san|简短报告|名词|文件表格|รายงานสั้น ๆ นี้มีรูปถ่ายและรายการปัญหา|raai-ngaan san san nii mii ruup-thaai lae raai-gaan bpan-haa|这份简短报告有照片和问题清单。|文件
bai-ngaan|ใบงาน|bai-ngaan|工作单|名词|文件表格|ช่างอ่านใบงานก่อนออกไปหน้างานทุกครั้ง|chang aan bai-ngaan gaawn aawk bpai naa-ngaan thuk khrang|师傅每次去现场前都会读工作单。|文件
lek-bai-ngaan|เลขใบงาน|lek bai-ngaan|工作单号|名词|文件表格|กรุณาบอกเลขใบงานเมื่อโทรหาฝ่ายบริการ|ga-ru-naa baawk lek bai-ngaan meua thoo haa faai baaw-ri-gaan|打给服务部门时，请告知工作单号。|文件
dtua-yang-ngaan|ตัวอย่างงาน|dtua-yaang ngaan|工作样例|名词|文件表格|หัวหน้าให้ดูตัวอย่างงานก่อนเริ่มทำจริง|hua-naa hai duu dtua-yaang ngaan gaawn roem tham jing|主管让先看工作样例再正式开始。|文件
tham-sam-nao-fai|ทำสำเนาไฟล์|tham sam-nao fai|复制文件|动词|文件表格|ก่อนแก้ไฟล์สำคัญ ควรทำสำเนาไฟล์ไว้ก่อน|gaawn gae fai sam-khan khuan tham sam-nao fai wai gaawn|修改重要文件前，应该先复制文件。|文件
yok-loek-gaan-phim|ยกเลิกการพิมพ์|yok-loek gaan phim|取消打印|动词|打印复印|ถ้าสั่งผิดหน้า ให้ยกเลิกการพิมพ์ทันที|thaa sang phit naa hai yok-loek gaan phim than-thii|如果选错页数，请马上取消打印。|打印
phim-phit-naa|พิมพ์ผิดหน้า|phim phit naa|打印错页|短语|打印复印|ฉันพิมพ์ผิดหน้าและต้องพิมพ์ใหม่อีกครั้ง|chan phim phit naa lae dtawng phim mai iik khrang|我打印错页了，必须重新打印。|打印
phim-song-daan|พิมพ์สองด้าน|phim saawng daan|双面打印|动词|打印复印|เพื่อประหยัดกระดาษ เราพิมพ์สองด้านได้|phuea bpra-yat gra-daat rao phim saawng daan dai|为了节省纸张，我们可以双面打印。|打印
phim-sii|พิมพ์สี|phim sii|彩色打印|动词|打印复印|โปสเตอร์นี้ต้องพิมพ์สีเพราะมีรูปสินค้า|bpoo-dter nii dtawng phim sii phraw mii ruup sin-khaa|这张海报有商品图片，所以要彩色打印。|打印
phim-khao-dam|พิมพ์ขาวดำ|phim khaao dam|黑白打印|动词|打印复印|เอกสารภายในใช้พิมพ์ขาวดำก็พอ|eek-ga-saan phaai-nai chai phim khaao dam gaaw phaaw|内部文件用黑白打印就够了。|打印
thang-ek-ga-saan|ถังเอกสาร|thang eek-ga-saan|文件回收桶|名词|文件表格|กระดาษที่ไม่ใช้แล้วใส่ถังเอกสารรีไซเคิล|gra-daat thii mai chai laeo sai thang eek-ga-saan rii-sai-khoen|不用的纸放进文件回收桶。|文件
tham-laai-ek-ga-saan|ทำลายเอกสาร|tham-laai eek-ga-saan|销毁文件|动词|文件表格|เอกสารที่มีข้อมูลลูกค้าต้องทำลายเอกสารให้ถูกวิธี|eek-ga-saan thii mii khaaw-muun luuk-khaa dtawng tham-laai eek-ga-saan hai thuuk wi-thii|含客户资料的文件必须用正确方式销毁。|文件
khreuuang-yoi-gra-daat|เครื่องย่อยกระดาษ|khreuuang yaawy gra-daat|碎纸机|名词|文件表格|เครื่องย่อยกระดาษเสียงดังแต่ใช้งานได้ปกติ|khreuuang yaawy gra-daat siiang dang dtae chai-ngaan dai bpok-ga-dti|碎纸机声音很大，但能正常使用。|文件
pha-chet-to|ผ้าเช็ดโต๊ะ|phaa chet dto|擦桌布|名词|工作用品|หลังลูกค้าออกไป ใช้ผ้าเช็ดโต๊ะให้สะอาด|lang luuk-khaa aawk bpai chai phaa chet dto hai sa-aat|客户离开后，用擦桌布把桌子擦干净。|清洁
nam-yaa-tham-khwaam-sa-aat|น้ำยาทำความสะอาด|nam-yaa tham khwaam-sa-aat|清洁剂|名词|工作用品|น้ำยาทำความสะอาดอยู่ใต้เคาน์เตอร์ครัว|nam-yaa tham khwaam-sa-aat yuu dtai khao-dter khrua|清洁剂在厨房柜台下面。|清洁
thang-kha-ya|ถังขยะ|thang kha-ya|垃圾桶|名词|工作用品|ถังขยะหน้าออฟฟิศเต็มแล้ว ต้องเอาไปทิ้ง|thang kha-ya naa aawf-fit dtem laeo dtawng ao bpai thing|办公室前的垃圾桶满了，需要拿去倒。|清洁
mai-gwaat|ไม้กวาด|maai gwaat|扫帚|名词|工作用品|ไม้กวาดและที่ตักผงอยู่หลังประตู|maai gwaat lae thii dtak phong yuu lang bpra-dtuu|扫帚和簸箕在门后。|清洁
thii-dtak-phong|ที่ตักผง|thii dtak phong|簸箕|名词|工作用品|ใช้ที่ตักผงเก็บเศษกระดาษใต้โต๊ะ|chai thii dtak phong gep set gra-daat dtai dto|用簸箕收桌子下面的碎纸。|清洁
mai-thuu-pheun|ไม้ถูพื้น|maai thuu pheun|拖把|名词|工作用品|ถ้าพื้นเปียก ให้ใช้ไม้ถูพื้นเช็ดทันที|thaa pheun bpiiak hai chai maai thuu pheun chet than-thii|如果地面湿了，请马上用拖把擦。|清洁
bpai-dteuan|ป้ายเตือน|bpaai dteuan|警示牌|名词|工作用品|ตอนถูพื้นต้องวางป้ายเตือนว่าพื้นเปียก|dtaawn thuu pheun dtawng waang bpaai dteuan waa pheun bpiiak|拖地时要放警示牌，说明地面湿滑。|安全
glaawng-phat-sa-du|กล่องพัสดุ|glaawng phat-sa-du|包裹箱|名词|工作用品|กล่องพัสดุเปล่าเก็บไว้บนชั้นหลังร้าน|glaawng phat-sa-du bplaao gep wai bon chan lang raan|空包裹箱放在店后面的架子上。|打包
theep-gaao|เทปกาว|theep gaao|胶带|名词|工作用品|ใช้เทปกาวปิดกล่องก่อนส่งให้ลูกค้า|chai theep gaao bpit glaawng gaawn song hai luuk-khaa|发给客户前用胶带封箱。|打包
saawng-phat-sa-du|ซองพัสดุ|saawng phat-sa-du|快递袋|名词|工作用品|เสื้อหนึ่งตัวใส่ซองพัสดุได้พอดี|seua neung dtua sai saawng phat-sa-du dai phaaw-dii|一件衣服正好可以放进快递袋。|打包
chat-raai-gaan|จัดรายการ|jat raai-gaan|整理清单|动词|清单钥匙|ก่อนสั่งของใหม่ ต้องจัดรายการของที่เหลือ|gaawn sang khaawng mai dtawng jat raai-gaan khaawng thii leua|订新货前，必须整理剩余物品清单。|清单
khong-khaang|ของค้าง|khaawng khaang|未处理物品|名词|清单钥匙|ของค้างจากเมื่อวานต้องทำให้เสร็จเช้านี้|khaawng khaang jaak meua-waan dtawng tham hai set chaao nii|昨天未处理的物品今天早上必须完成。|清单
khong-phrom-chai|ของพร้อมใช้|khaawng phraawm chai|可用物品|名词|清单钥匙|เช็กว่าของพร้อมใช้พอสำหรับกะเย็นหรือไม่|chek waa khaawng phraawm chai phaaw sam-rap ga yen reu mai|检查可用物品是否足够晚班使用。|清单
khong-mot|ของหมด|khaawng mot|物品用完|短语|清单钥匙|ถ้าของหมด ให้เขียนในสมุดสั่งซื้อทันที|thaa khaawng mot hai khiian nai sa-mut sang-seu than-thii|如果物品用完，请马上写进订购本。|清单
sa-mut-sang-seu|สมุดสั่งซื้อ|sa-mut sang-seu|订购记录本|名词|清单钥匙|สมุดสั่งซื้ออยู่ข้างเครื่องคิดเงิน|sa-mut sang-seu yuu khaang khreuuang khit ngoen|订购记录本在收银机旁边。|清单
`;

export const VOCABULARY_EXPANSION_A2_BASIC_WORK_TOOLS_01: VocabularyExpansionA2BasicWorkToolsCandidate[] = parseRows(RAW_ROWS).map(buildCandidate);
