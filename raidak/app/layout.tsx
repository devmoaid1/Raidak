import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo, Tajawal } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

import { AuthProvider } from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "ريدك | التقييم العقاري الذكي",
  description: "المنصة الرائدة للتقييم العقاري الذكي في المملكة العربية السعودية",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
