import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import AuthGuard from "@/components/AuthGuard";
import AppMain from "@/components/AppMain";

export const metadata: Metadata = {
  title: "Thai · 泰语学习",
  description: "从字母、拼读到语法和词汇的移动优先泰语学习工具",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#131f24" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('thai-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}else{document.documentElement.removeAttribute('data-theme')}}catch(e){}",
          }}
        />
      </head>
      <body className="antialiased flex flex-col">
        <AuthGuard>
          <Nav />
          <AppMain>{children}</AppMain>
        </AuthGuard>
      </body>
    </html>
  );
}
