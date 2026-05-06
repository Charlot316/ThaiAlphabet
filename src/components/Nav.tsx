"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "首页" },
  { href: "/overview", label: "总览" },
  { href: "/course", label: "课程" },
  { href: "/flashcards", label: "速看" },
  { href: "/quiz", label: "选择题" },
  { href: "/srs", label: "记忆" },
  { href: "/write", label: "书写" },
  { href: "/spell", label: "拼读" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-black/5 dark:border-white/10 bg-[#f7f7f8]/80 dark:bg-[#0e0f12]/80 backdrop-blur">
        <div className="mx-auto max-w-2xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            <span className="thai-big text-xl mr-1">ไทย</span>
            <span className="text-sm opacity-70">Alphabet</span>
          </Link>
          <span className="text-xs opacity-60">学习工具</span>
        </div>
      </header>
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#15171b]/95 backdrop-blur">
        <ul className="mx-auto grid max-w-2xl grid-cols-8">
          {TABS.map((t) => {
            const active = pathname === t.href || (t.href !== "/" && pathname?.startsWith(t.href));
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className={`flex h-14 items-center justify-center text-xs ${
                    active ? "font-semibold text-black dark:text-white" : "text-black/60 dark:text-white/60"
                  }`}
                >
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
