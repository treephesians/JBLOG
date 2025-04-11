import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/provider/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JBLOG",
  description:
    "Frontend Developer Junbeom's Blog - 프론트엔드, 웹 개발, React, Next.js에 대한 기술 블로그",
  keywords: [
    "블로그",
    "프론트엔드",
    "개발",
    "React",
    "Next.js",
    "웹개발",
    "소프트웨어 마에스트로",
  ],
  authors: [{ name: "Junbeom" }],
  creator: "Junbeom",
  publisher: "Junbeom",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://jblog-nine.vercel.app",
    title: "JBLOG",
    description: "Frontend Developer Junbeom의 기술 블로그",
    siteName: "JBLOG",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JBLOG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JBLOG",
    description: "Frontend Developer Junbeom의 기술 블로그",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="pt-15 max-w-3xl w-full flex-grow mx-auto px-4">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
