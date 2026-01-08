import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "诗歌检索站",
  description: "搜索与浏览经典诗歌，支持关联提示与详情展示",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-white">
          <nav className="border-b bg-white/80 backdrop-blur sticky top-0 z-20">
            <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
              <a href="/" className="font-semibold">诗歌检索站</a>
              <a href="/poems" className="text-blue-600 hover:underline">诗歌列表</a>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
