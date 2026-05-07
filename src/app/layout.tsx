import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import SyncProvider from "@/components/SyncProvider";

export const metadata: Metadata = {
  title: "泰语字母学习 · Thai Alphabet",
  description: "辅音 · 元音 · 声调 · 拼读 — 移动优先的泰语入门训练工具",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fff7e9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="antialiased">
        <SyncProvider />
        <Nav />
        <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-4">{children}</main>
      </body>
    </html>
  );
}
