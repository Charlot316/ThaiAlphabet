export type VocabularyExpansionPartOfSpeech = "名词" | "动词" | "形容词" | "副词" | "短语" | "句型";
export type VocabularyExpansionLevel = "a2";
export type VocabularyExpansionTheme = "预约" | "日程" | "改期取消" | "准时迟到" | "空闲忙碌" | "提醒" | "截止时间" | "安排见面";
export type VocabularyExpansionReviewStatus = "candidate-draft";
export type VocabularyExpansionComparisonKind = "near-synonym" | "antonym" | "confusable" | "usage";
export type VocabularyExpansionRelated = { thai: string; roman: string; chinese: string; notesZh?: string };
export type VocabularyExpansionExample = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionComparison = { kind: VocabularyExpansionComparisonKind; target: VocabularyExpansionRelated; distinctionZh: string };
export type VocabularyExpansionCollocation = { thai: string; roman: string; chinese: string };
export type VocabularyExpansionSense = { id: string; chinese: string; examples: VocabularyExpansionExample[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[] };
export type VocabularyExpansionCandidate = { id: string; thai: string; roman: string; chinese: string; partOfSpeech: VocabularyExpansionPartOfSpeech; theme: VocabularyExpansionTheme; level: VocabularyExpansionLevel; priority: number; senses: VocabularyExpansionSense[]; synonyms: VocabularyExpansionRelated[]; antonyms: VocabularyExpansionRelated[]; comparisons: VocabularyExpansionComparison[]; collocations: VocabularyExpansionCollocation[]; tags: string[]; sourceRefs: string[]; reviewStatus: VocabularyExpansionReviewStatus };
type Row = readonly [string, string, string, string, VocabularyExpansionPartOfSpeech, VocabularyExpansionTheme];
const APPOINTMENT_REFS = ["worker-a-a2-appointments-schedules", "basic-thai-scheduling"];

const rows: Row[] = [
  ["nat", "นัด", "nat", "约；预约；约定", "动词", "预约"],
  ["gaan-nat", "การนัด", "gaan nat", "预约；约定这件事", "名词", "预约"],
  ["nat-maai", "นัดหมาย", "nat maai", "预约；正式约定", "动词", "预约"],
  ["tham-nat", "ทำนัด", "tham nat", "做预约；安排预约", "动词", "预约"],
  ["jaawng-wee-laa", "จองเวลา", "jaawng wee-laa", "预约时间", "动词", "预约"],
  ["jaawng-khiu", "จองคิว", "jaawng khiu", "预约排队；取号", "动词", "预约"],
  ["khiu", "คิว", "khiu", "队列；排号", "名词", "预约"],
  ["rap-khiu", "รับคิว", "rap khiu", "取号；拿排队号", "动词", "预约"],
  ["nat-maaw", "นัดหมอ", "nat maaw", "预约医生", "动词", "预约"],
  ["nat-tham-fan", "นัดทำฟัน", "nat tham fan", "预约看牙", "动词", "预约"],
  ["nat-dtat-phom", "นัดตัดผม", "nat dtat phom", "预约理发", "动词", "预约"],
  ["nat-rian", "นัดเรียน", "nat riian", "约上课；预约课程", "动词", "预约"],
  ["bai-nat", "ใบนัด", "bai nat", "预约单", "名词", "预约"],
  ["sam-rap-nat", "สำหรับนัด", "sam-rap nat", "用于预约", "短语", "预约"],
  ["dtarang", "ตาราง", "dtaa-raang", "日程表；表格", "名词", "日程"],
  ["dtarang-wela", "ตารางเวลา", "dtaa-raang wee-laa", "时间表", "名词", "日程"],
  ["dtarang-riian", "ตารางเรียน", "dtaa-raang riian", "课程表", "名词", "日程"],
  ["dtarang-ngaan", "ตารางงาน", "dtaa-raang ngaan", "工作日程", "名词", "日程"],
  ["dtarang-wan-nii", "ตารางวันนี้", "dtaa-raang wan nii", "今天的日程", "名词", "日程"],
  ["raai-gaan", "รายการ", "raai gaan", "清单；项目", "名词", "日程"],
  ["raai-gaan-tham", "รายการที่ต้องทำ", "raai gaan thii dtawng tham", "待办事项", "名词", "日程"],
  ["phaaen", "แผน", "phaaen", "计划", "名词", "日程"],
  ["waang-phaaen", "วางแผน", "waang phaaen", "计划；安排", "动词", "日程"],
  ["gam-not-gaan", "กำหนดการ", "gam-not gaan", "活动安排；日程安排", "名词", "日程"],
  ["gam-not-wela", "กำหนดเวลา", "gam-not wee-laa", "规定时间；约定时间", "名词", "日程"],
  ["wela-nat", "เวลานัด", "wee-laa nat", "约定时间", "名词", "日程"],
  ["wan-nat", "วันนัด", "wan nat", "预约日期；约定日", "名词", "日程"],
  ["sathaan-thii-nat", "สถานที่นัด", "sa-thaan-thii nat", "约定地点", "名词", "日程"],
  ["leuan-nat", "เลื่อนนัด", "leuan nat", "改约；推迟预约", "动词", "改期取消"],
  ["leuan-wela", "เลื่อนเวลา", "leuan wee-laa", "改时间；推迟时间", "动词", "改期取消"],
  ["leuan-bpai-wan-eun", "เลื่อนไปวันอื่น", "leuan bpai wan euen", "改到别的日子", "短语", "改期取消"],
  ["bplian-wan", "เปลี่ยนวัน", "bpliian wan", "改日期", "动词", "改期取消"],
  ["bplian-wela", "เปลี่ยนเวลา", "bpliian wee-laa", "改时间", "动词", "改期取消"],
  ["bplian-sathaan-thii", "เปลี่ยนสถานที่", "bpliian sa-thaan-thii", "改地点", "动词", "改期取消"],
  ["yok-loek-nat", "ยกเลิกนัด", "yok loek nat", "取消预约/约定", "动词", "改期取消"],
  ["yok-loek", "ยกเลิก", "yok loek", "取消", "动词", "改期取消"],
  ["mai-bpai-laaeo", "ไม่ไปแล้ว", "mai bpai laaeo", "不去了", "短语", "改期取消"],
  ["bpai-mai-dai", "ไปไม่ได้", "bpai mai dai", "去不了", "短语", "改期取消"],
  ["khaaw-bplian", "ขอเปลี่ยน", "khaaw bpliian", "请求更改", "动词", "改期取消"],
  ["khaaw-leuan", "ขอเลื่อน", "khaaw leuan", "请求推迟/改期", "动词", "改期取消"],
  ["dtrong-wela", "ตรงเวลา", "dtrong wee-laa", "准时", "形容词", "准时迟到"],
  ["maa-dtrong-wela", "มาตรงเวลา", "maa dtrong wee-laa", "准时来", "动词", "准时迟到"],
  ["bpai-dtrong-wela", "ไปตรงเวลา", "bpai dtrong wee-laa", "准时去", "动词", "准时迟到"],
  ["maa-saai", "มาสาย", "maa saai", "来晚；迟到", "动词", "准时迟到"],
  ["bpai-saai", "ไปสาย", "bpai saai", "去晚；迟到", "动词", "准时迟到"],
  ["chaak-waa-gam-not", "ช้ากว่ากำหนด", "chaa gwaa gam-not", "比规定时间晚", "短语", "准时迟到"],
  ["gaawn-wela", "ก่อนเวลา", "gaawn wee-laa", "提前；在时间前", "副词", "准时迟到"],
  ["theung-gaawn", "ถึงก่อน", "theung gaawn", "先到；提前到", "动词", "准时迟到"],
  ["theung-laaeo", "ถึงแล้ว", "theung laaeo", "到了", "短语", "准时迟到"],
  ["yang-mai-theung", "ยังไม่ถึง", "yang mai theung", "还没到", "短语", "准时迟到"],
  ["gam-lang-maa", "กำลังมา", "gam-lang maa", "正在来；在路上", "短语", "准时迟到"],
  ["raw-sak-khruu", "รอสักครู่", "raaw sak khruu", "请稍等一会儿", "短语", "准时迟到"],
  ["wang", "ว่าง", "waang", "有空", "形容词", "空闲忙碌"],
  ["mai-wang", "ไม่ว่าง", "mai waang", "没空", "短语", "空闲忙碌"],
  ["yung", "ยุ่ง", "yung", "忙；事情多", "形容词", "空闲忙碌"],
  ["yung-maak", "ยุ่งมาก", "yung maak", "很忙", "短语", "空闲忙碌"],
  ["mii-thura", "มีธุระ", "mii thu-ra", "有事；有事务", "短语", "空闲忙碌"],
  ["mai-mii-thura", "ไม่มีธุระ", "mai mii thu-ra", "没事；没有安排", "短语", "空闲忙碌"],
  ["mii-wela", "มีเวลา", "mii wee-laa", "有时间", "短语", "空闲忙碌"],
  ["mai-mii-wela", "ไม่มีเวลา", "mai mii wee-laa", "没有时间", "短语", "空闲忙碌"],
  ["wela-waang", "เวลาว่าง", "wee-laa waang", "空闲时间", "名词", "空闲忙碌"],
  ["wan-waang", "วันว่าง", "wan waang", "有空的日子", "名词", "空闲忙碌"],
  ["chaawng-waang", "ช่องว่าง", "chaawng waang", "空档；空隙", "名词", "空闲忙碌"],
  ["dtruat-dtuu-dtarang", "ตรวจดูตาราง", "dtruat duu dtaa-raang", "查看日程表", "动词", "空闲忙碌"],
  ["dteuan", "เตือน", "dteuan", "提醒", "动词", "提醒"],
  ["dteuan-chan-duai", "เตือนฉันด้วย", "dteuan chan duai", "也提醒我一下", "句型", "提醒"],
  ["tang-dteuan", "ตั้งเตือน", "dtang dteuan", "设置提醒", "动词", "提醒"],
  ["khaaw-khwaam-dteuan", "ข้อความเตือน", "khaaw-khwaam dteuan", "提醒消息", "名词", "提醒"],
  ["seeyang-dteuan", "เสียงเตือน", "siiang dteuan", "提示音；提醒声音", "名词", "提醒"],
  ["ya-leum", "อย่าลืม", "yaa leum", "别忘了", "短语", "提醒"],
  ["jam-wai", "จำไว้", "jam wai", "记住", "动词", "提醒"],
  ["jot-wai", "จดไว้", "jot wai", "记下来", "动词", "提醒"],
  ["jot-nai-dtarang", "จดในตาราง", "jot nai dtaa-raang", "记在日程表里", "动词", "提醒"],
  ["song-khwaam-dteuan", "ส่งข้อความเตือน", "song khaaw-khwaam dteuan", "发送提醒消息", "动词", "提醒"],
  ["gam-not-song", "กำหนดส่ง", "gam-not song", "提交期限；交付时间", "名词", "截止时间"],
  ["wan-sut-thaai", "วันสุดท้าย", "wan sut-thaai", "最后一天", "名词", "截止时间"],
  ["wela-sut-thaai", "เวลาสุดท้าย", "wee-laa sut-thaai", "最后时间", "名词", "截止时间"],
  ["gaawn-thii-ja-mut", "ก่อนที่จะหมด", "gaawn thii ja mot", "在结束/到期前", "短语", "截止时间"],
  ["mot-wela", "หมดเวลา", "mot wee-laa", "时间到了；没时间了", "动词", "截止时间"],
  ["mai-than-gam-not", "ไม่ทันกำหนด", "mai than gam-not", "赶不上期限", "短语", "截止时间"],
  ["than-gam-not", "ทันกำหนด", "than gam-not", "赶得上期限", "短语", "截止时间"],
  ["song-gaawn-gam-not", "ส่งก่อนกำหนด", "song gaawn gam-not", "提前提交", "动词", "截止时间"],
  ["song-saai", "ส่งสาย", "song saai", "迟交", "动词", "截止时间"],
  ["khaaw-wela-phoem", "ขอเวลาเพิ่ม", "khaaw wee-laa phoem", "请求更多时间", "动词", "截止时间"],
  ["nat-jer", "นัดเจอ", "nat joe", "约见面", "动词", "安排见面"],
  ["nat-gan-thii", "นัดกันที่", "nat gan thii", "约在……", "句型", "安排见面"],
  ["jer-gan-thii", "เจอกันที่", "joe gan thii", "在……见", "句型", "安排见面"],
  ["jer-gan-gii-moong", "เจอกันกี่โมง", "joe gan gii moong", "几点见面", "句型", "安排见面"],
  ["jer-gan-wan-nai", "เจอกันวันไหน", "joe gan wan nai", "哪天见面", "句型", "安排见面"],
  ["phop-gan", "พบกัน", "phop gan", "见面；相见", "动词", "安排见面"],
  ["phop-gan-thii", "พบกันที่", "phop gan thii", "在……见面", "句型", "安排见面"],
  ["bpai-phop", "ไปพบ", "bpai phop", "去见", "动词", "安排见面"],
  ["maa-phop", "มาพบ", "maa phop", "来见", "动词", "安排见面"],
  ["raw-thii", "รอที่", "raaw thii", "在……等", "句型", "安排见面"],
  ["raw-naa", "รอหน้า", "raaw naa", "在……前等", "句型", "安排见面"],
  ["bpai-phraawm-gan", "ไปพร้อมกัน", "bpai phraawm gan", "一起去", "动词", "安排见面"],
  ["maa-phraawm-gan", "มาพร้อมกัน", "maa phraawm gan", "一起来", "动词", "安排见面"],
];

const relatedByTheme: Record<VocabularyExpansionTheme, VocabularyExpansionRelated> = {
  预约: { thai: "นัด", roman: "nat", chinese: "预约；约定" },
  日程: { thai: "ตาราง", roman: "dtaa-raang", chinese: "日程表" },
  改期取消: { thai: "เลื่อนนัด", roman: "leuan nat", chinese: "改约" },
  准时迟到: { thai: "ตรงเวลา", roman: "dtrong wee-laa", chinese: "准时" },
  空闲忙碌: { thai: "ว่าง", roman: "waang", chinese: "有空" },
  提醒: { thai: "เตือน", roman: "dteuan", chinese: "提醒" },
  截止时间: { thai: "กำหนดส่ง", roman: "gam-not song", chinese: "提交期限" },
  安排见面: { thai: "นัดเจอ", roman: "nat joe", chinese: "约见面" },
};

const exampleFor = (row: Row): VocabularyExpansionExample => ({
  thai: `ในตารางวันนี้มีคำว่า “${row[1]}” เพื่อเตือนเวลาและช่วยให้เราไม่ลืมนัด`,
  roman: `nai dtaa-raang wan-nii mii kham waa "${row[2]}" phuea dteuan wee-laa lae chuai hai rao mai leum nat`,
  chinese: `今天的日程表里有“${row[1]}”这个表达，用来提醒时间并帮助我们不忘记预约。`,
});

const buildCandidate = (row: Row, index: number): VocabularyExpansionCandidate => {
  const related = relatedByTheme[row[5]];
  const comparison: VocabularyExpansionComparison = { kind: "usage", target: related, distinctionZh: `${row[1]} 属于“${row[5]}”场景；和 ${related.thai} 对照记，可以区分预约、改期、准时迟到、提醒和安排见面。` };
  const collocations = [{ thai: row[1], roman: row[2], chinese: row[3] }, related];
  return {
    id: row[0], thai: row[1], roman: row[2], chinese: row[3], partOfSpeech: row[4], theme: row[5], level: "a2", priority: index + 1,
    senses: [{ id: `${row[0]}-main`, chinese: row[3], examples: [exampleFor(row)], synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5]] }],
    synonyms: [], antonyms: [], comparisons: [comparison], collocations, tags: [row[5], "A2基础", "日程"], sourceRefs: APPOINTMENT_REFS, reviewStatus: "candidate-draft",
  };
};

export const VOCABULARY_EXPANSION_A2_APPOINTMENTS_SCHEDULES_01: VocabularyExpansionCandidate[] = rows.map(buildCandidate);
