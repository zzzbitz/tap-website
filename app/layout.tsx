import { sitePath } from '@/lib/site-path';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteFooter, SiteHeader } from '@/components/tap/site-chrome';
import { PageMotion } from '@/components/tap/page-motion';
import { siteOrigin } from '@/lib/tap-content';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: 'TAP — Trust AI to Prepare Your Data',
    template: '%s | TAP',
  },
  description:
    'A research initiative building and evaluating AI systems for reliable data preparation. Explore PrepBench and CleanAgent.',
  icons: { icon: sitePath('/favicon.svg') },
  openGraph: {
    type: 'website',
    siteName: 'TAP',
    title: 'TAP — Trust AI to Prepare Your Data',
    description:
      'Human intent. Prepared data. Research toward AI systems people can trust with data preparation.',
    url: siteOrigin,
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <PageMotion />
      </body>
    </html>
  );
}
