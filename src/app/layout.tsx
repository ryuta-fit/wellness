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
  title: "The Wellness Leaders | 医療従事者向けクイズアプリ",
  description: "理学療法士・アスレティックトレーナー向けの学習クイズアプリ。解剖学、生理学、栄養学など6分野1800問以上の専門問題で知識をレベルアップ！",
  keywords: "理学療法士, PT, アスレティックトレーナー, AT, 医療クイズ, 解剖学, 生理学, リハビリテーション",
  authors: [{ name: "The Wellness Leaders Team" }],
  creator: "The Wellness Leaders",
  publisher: "The Wellness Leaders",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wellness-leaders.vercel.app'),
  openGraph: {
    title: "The Wellness Leaders | 医療従事者向けクイズアプリ",
    description: "理学療法士・アスレティックトレーナー向けの学習クイズアプリ。解剖学、生理学、栄養学など6分野1800問以上の専門問題で知識をレベルアップ！",
    url: 'https://wellness-leaders.vercel.app',
    siteName: 'The Wellness Leaders',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Wellness Leaders - 医療従事者向けクイズアプリ',
      }
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Wellness Leaders | 医療従事者向けクイズアプリ',
    description: 'PT・AT向けの学習クイズアプリ。6分野1800問以上の専門問題で知識をレベルアップ！',
    images: ['/og-image.png'],
    creator: '@wellness_leaders',
  },
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'The Wellness Leaders',
    description: '理学療法士・アスレティックトレーナー向けの学習クイズアプリケーション',
    url: 'https://wellness-leaders.vercel.app',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1234',
    },
    author: {
      '@type': 'Organization',
      name: 'The Wellness Leaders Team',
    },
    educationalLevel: 'Professional',
    inLanguage: 'ja',
  }

  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
