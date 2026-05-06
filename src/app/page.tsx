import Link from "next/link";

const MODES = [
  { href: "/overview", title: "字母总览", desc: "辅音 / 元音 / 特殊符号 / 声调，分类与发音" },
  { href: "/quiz", title: "选择题训练", desc: "字母↔读音 双向训练，含同音多选" },
  { href: "/srs", title: "Anki 记忆", desc: "知道 / 模糊 / 不知道，按 SRS 自动复习" },
  { href: "/write", title: "书写描红", desc: "看 mnemonic 临摹字母" },
  { href: "/spell", title: "拼读输入", desc: "看泰语音节，输入罗马音，含声调解析" },
];

export default function Home() {
  return (
    <div className="space-y-4">
      <section className="card p-5">
        <h1 className="text-2xl font-bold tracking-tight">学习泰语字母</h1>
        <p className="mt-1 text-sm opacity-70">辅音 · 元音 · 尾辅音 · 声调 · 拼读规则</p>
      </section>
      <ul className="space-y-3">
        {MODES.map((m) => (
          <li key={m.href}>
            <Link href={m.href} className="card block p-4 active:scale-[.99] transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{m.title}</div>
                  <div className="text-sm opacity-70 mt-0.5">{m.desc}</div>
                </div>
                <span aria-hidden className="opacity-40">›</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
