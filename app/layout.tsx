import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingChat } from "@/components/FloatingChat";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { api } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://cmsbvq.com";

  try {
    const res = await api.general.settings();
    const settings = (res as any).data || res;

    return {
      metadataBase: new URL(siteUrl),

      title: settings.title || "CMSBVQ.COM - Code Marketplace",
      description: settings.description || settings.mota || "",
      keywords: settings.keywords || settings.tukhoa,

      icons: {
        icon: settings.favicon,
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);

    return {
      metadataBase: new URL(siteUrl),

      title: "CMSBVQ.COM - Code Marketplace",
      description: "Buy and sell source code securely.",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingChat />
        <Toaster />
      </body>
    </html>
  );
}
