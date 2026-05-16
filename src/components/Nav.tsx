"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  GraduationCap,
  Home,
  Languages,
  Settings,
} from "lucide-react";
import StatusBar from "./StatusBar";

const TABS = [
  { href: "/", icon: Home, label: "首页", match: ["/"] },
  {
    href: "/alphabet",
    icon: GraduationCap,
    label: "字母",
    match: ["/alphabet", "/overview", "/course", "/endless-match", "/srs", "/flashcards", "/spell", "/quiz"],
  },
  { href: "/grammar", icon: BookOpenText, label: "语法", match: ["/grammar"] },
  { href: "/vocabulary", icon: Languages, label: "词汇", match: ["/vocabulary"] },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <header
        className="sticky top-0 z-30"
        style={{
          background: "color-mix(in srgb, var(--duo-card) 94%, transparent)",
          borderBottom: "1px solid var(--duo-line)",
          boxShadow: "0 2px 0 color-mix(in srgb, var(--duo-line) 70%, transparent)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3 md:max-w-3xl lg:max-w-5xl lg:px-6 xl:max-w-6xl">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="thai-big inline-flex h-9 w-9 items-center justify-center rounded-lg text-lg font-semibold"
              style={{
                background: "var(--surface-subtle)",
                border: "1px solid var(--duo-line)",
                color: "var(--duo-green-d)",
                boxShadow: "0 2px 0 var(--surface-raised-edge)",
              }}
            >
              ก
            </span>
            <span className="text-sm font-semibold tracking-normal">Thai</span>
          </Link>
          <div className="flex items-center gap-3">
            <StatusBar />
            <Link
              href="/settings"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition"
              style={{
                border: "1px solid var(--duo-line)",
                background: "var(--surface-solid)",
                color: "var(--duo-muted)",
              }}
              aria-label="设置"
              title="同步设置"
            >
              <Settings size={17} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </header>

      <nav
        className="fixed bottom-0 left-0 right-0 z-30"
        style={{
          background: "color-mix(in srgb, var(--duo-card) 94%, transparent)",
          borderTop: "1px solid var(--duo-line)",
          boxShadow: "0 -2px 0 color-mix(in srgb, var(--duo-line) 70%, transparent)",
          backdropFilter: "blur(14px)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <ul className="mx-auto grid max-w-2xl grid-cols-5 gap-1 px-2 py-2 md:max-w-3xl lg:max-w-5xl lg:px-6 xl:max-w-6xl">
          {TABS.map((t) => {
            const active =
              t.label === "首页"
                ? pathname === "/"
                : t.match.some((prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`));
            const Icon = t.icon;
            return (
              <li key={t.label}>
                <Link
                  href={t.href}
                  className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg transition"
                  style={{
                    color: active ? "var(--duo-green-d)" : "var(--duo-muted)",
                    background: active ? "var(--surface-subtle)" : "transparent",
                    border: active ? "1px solid var(--duo-line-d)" : "1px solid transparent",
                    boxShadow: active ? "0 2px 0 var(--surface-raised-edge)" : "none",
                  }}
                >
                  <Icon size={18} strokeWidth={active ? 2.5 : 2} aria-hidden />
                  <span className="text-[10px] font-semibold">{t.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/settings"
              className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg transition"
              style={{
                color: pathname === "/settings" ? "var(--duo-green-d)" : "var(--duo-muted)",
                background: pathname === "/settings" ? "var(--surface-subtle)" : "transparent",
                border: pathname === "/settings" ? "1px solid var(--duo-line-d)" : "1px solid transparent",
                boxShadow: pathname === "/settings" ? "0 2px 0 var(--surface-raised-edge)" : "none",
              }}
            >
              <Settings size={18} strokeWidth={pathname === "/settings" ? 2.5 : 2} aria-hidden />
              <span className="text-[10px] font-semibold">设置</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
