import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingChat } from "@/components/FloatingChat";
import { Toaster } from "@/components/ui/sonner";
import { getImageUrl } from "@/lib/image-helper";

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cmsbvq.com";

  try {
    const res = await api.general.settings();
    const settings = (res as any).data || res;

    const title = settings.title || "CMSBVQ.COM - Chuyên thiết kế website Bán Code, Mã nguồn chất lượng cao";
    const description = settings.description || settings.mota || "Chúng tôi cung cấp kho mã nguồn chất lượng cao, hạ tầng Cloud ổn định và các công cụ hỗ trợ để giúp dự án của bạn vận hành mạnh mẽ nhất.";
    const keywords = settings.keywords || settings.tukhoa || "mua bán source code, mã nguồn website, code marketplace, vps vietnam, cloud hosting, source code chất lượng";
    const logo = getImageUrl(settings.logo) || `${siteUrl}/logo.png`;
    const ogImage = getImageUrl(settings.og_image || settings.logo) || `${siteUrl}/og-image.png`;

    return {
      metadataBase: new URL(siteUrl),

      title: {
        default: title,
        template: `%s | CMSBVQ.COM`,
      },

      description,
      keywords,

      authors: [
        { name: "CMSBVQ.COM" },
        { name: settings.author || "CMSBVQ Team" }
      ],

      creator: "CMSBVQ.COM",
      publisher: "CMSBVQ.COM",

      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },

      icons: {
        icon: settings.favicon || '/favicon.ico',
        apple: settings.favicon || '/favicon.ico',
      },

      openGraph: {
        type: 'website',
        locale: 'vi_VN',
        url: siteUrl,
        siteName: 'CMSBVQ.COM',
        title,
        description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },

      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
        creator: '@cmsbvq',
        site: '@cmsbvq',
      },

      alternates: {
        canonical: siteUrl,
      },

      verification: {
        google: settings.google_verification || '',
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);

    const defaultTitle = "CMSBVQ.COM - Chuyên thiết kế website Bán Code, Mã nguồn chất lượng cao";
    const defaultDescription = "Chúng tôi cung cấp kho mã nguồn chất lượng cao, hạ tầng Cloud ổn định và các công cụ hỗ trợ để giúp dự án của bạn vận hành mạnh mẽ nhất.";
    const defaultImage = `${siteUrl}/og-image.png`;

    return {
      metadataBase: new URL(siteUrl),

      title: {
        default: defaultTitle,
        template: `%s | CMSBVQ.COM`,
      },

      description: defaultDescription,

      keywords: "mua bán source code, mã nguồn website, code marketplace, vps vietnam, cloud hosting",

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: 'website',
        locale: 'vi_VN',
        url: siteUrl,
        siteName: 'CMSBVQ.COM',
        title: defaultTitle,
        description: defaultDescription,
        images: [
          {
            url: defaultImage,
            width: 1200,
            height: 630,
            alt: defaultTitle,
          },
        ],
      },

      twitter: {
        card: 'summary_large_image',
        title: defaultTitle,
        description: defaultDescription,
        images: [defaultImage],
      },
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
