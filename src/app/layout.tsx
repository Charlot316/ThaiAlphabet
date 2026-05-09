import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import AuthGuard from "@/components/AuthGuard";

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
      <body className="antialiased flex flex-col">
        <AuthGuard>
          <Nav />
          {/* main 铺满整个宽度让两侧空白也能接收滚动事件，内层 div 才负责把内容居中。 */}
          <main className="w-full flex-1 overflow-y-auto">
            <div
              className="mx-auto h-full w-full max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl px-4 py-4"
              style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }}
            >
              {children}
            </div>
          </main>
        </AuthGuard>
      </body>
    </html>
  );
}
