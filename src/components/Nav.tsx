"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  Gamepad2,
  Home,
  Keyboard,
  LibraryBig,
  Settings,
  Target,
  Zap,
} from "lucide-react";
import StatusBar from "./StatusBar";

const TABS = [
  { href: "/", icon: Home, label: "首页" },
  { href: "/overview", icon: LibraryBig, label: "总览" },
  { href: "/course", icon: Target, label: "课程" },
  { href: "/endless-match", icon: Gamepad2, label: "配对" },
  { href: "/srs", icon: Brain, label: "记忆" },
  { href: "/flashcards", icon: Zap, label: "速看" },
  { href: "/spell", icon: Keyboard, label: "拼读" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <header
        className="sticky top-0 z-30"
        style={{
          background: "color-mix(in srgb, var(--duo-bg) 78%, transparent)",
          borderBottom: "1px solid var(--duo-line)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3 md:max-w-3xl lg:max-w-5xl lg:px-6 xl:max-w-6xl">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="thai-big inline-flex h-9 w-9 items-center justify-center rounded-lg text-lg font-semibold"
              style={{
                background: "linear-gradient(180deg, rgba(40, 215, 244, 0.1), rgba(40, 215, 244, 0.025)), var(--surface-solid)",
                border: "1px solid var(--duo-line)",
                color: "var(--duo-text)",
                boxShadow: "0 0 22px rgba(40, 215, 244, 0.08)",
              }}
            >
              ก
            </span>
            <span className="text-sm font-semibold tracking-normal">Thai Alphabet</span>
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
          background: "color-mix(in srgb, var(--duo-bg) 82%, transparent)",
          borderTop: "1px solid var(--duo-line)",
          boxShadow: "0 -18px 42px rgba(0, 6, 10, 0.42)",
          backdropFilter: "blur(18px)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <ul className="mx-auto grid max-w-2xl grid-cols-7 gap-1 px-2 py-2 md:max-w-3xl lg:max-w-5xl lg:px-6 xl:max-w-6xl">
          {TABS.map((t) => {
            const active = pathname === t.href || (t.href !== "/" && pathname?.startsWith(t.href));
            const Icon = t.icon;
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg transition"
                  style={{
                    color: active ? "var(--duo-green-d)" : "var(--duo-muted)",
                    background: active ? "linear-gradient(180deg, rgba(40, 215, 244, 0.13), rgba(40, 215, 244, 0.055))" : "transparent",
                    border: active ? "1px solid rgba(40, 215, 244, 0.18)" : "1px solid transparent",
                    boxShadow: active ? "0 0 22px rgba(40, 215, 244, 0.08)" : "none",
                  }}
                >
                  <Icon size={18} strokeWidth={active ? 2.5 : 2} aria-hidden />
                  <span className="text-[10px] font-semibold">{t.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
