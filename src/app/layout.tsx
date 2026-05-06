import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "泰语字母学习 · Thai Alphabet",
  description: "辅音 · 元音 · 声调 · 拼读 — 移动优先的泰语入门训练工具",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f7f7f8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="antialiased">
        <Nav />
        <main className="mx-auto w-full max-w-2xl px-4 pb-24 pt-4">{children}</main>
      </body>
    </html>
  );
}
