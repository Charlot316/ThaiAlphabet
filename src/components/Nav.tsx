"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StatusBar from "./StatusBar";

const TABS = [
  { href: "/", icon: "🏠", label: "首页" },
  { href: "/overview", icon: "📚", label: "总览" },
  { href: "/course", icon: "🎯", label: "课程" },
  { href: "/flashcards", icon: "⚡", label: "速看" },
  { href: "/quiz", icon: "❓", label: "选择" },
  { href: "/srs", icon: "🧠", label: "记忆" },
  { href: "/write", icon: "✍️", label: "书写" },
  { href: "/spell", icon: "🔤", label: "拼读" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <header
        className="sticky top-0 z-20 backdrop-blur"
        style={{
          background: "color-mix(in srgb, var(--duo-bg) 88%, transparent)",
          borderBottom: "2px solid var(--duo-line)",
        }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="thai-big inline-flex h-9 w-9 items-center justify-center rounded-full text-base text-white"
              style={{ background: "var(--duo-green)", boxShadow: "0 3px 0 var(--duo-green-shadow)" }}
            >
              ก
            </span>
            <span className="text-sm font-extrabold uppercase tracking-wide">Thai</span>
          </Link>
          <StatusBar />
        </div>
      </header>

      <nav
        className="fixed bottom-0 left-0 right-0 z-20 backdrop-blur"
        style={{
          background: "color-mix(in srgb, var(--duo-card) 92%, transparent)",
          borderTop: "2px solid var(--duo-line)",
        }}
      >
        <ul className="mx-auto grid max-w-2xl grid-cols-8">
          {TABS.map((t) => {
            const active = pathname === t.href || (t.href !== "/" && pathname?.startsWith(t.href));
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="flex h-16 flex-col items-center justify-center gap-0.5 transition-colors"
                  style={{ color: active ? "var(--duo-green)" : "var(--duo-muted)" }}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    {t.icon}
                  </span>
                  <span className="text-[10px] font-extrabold tracking-wide">{t.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
