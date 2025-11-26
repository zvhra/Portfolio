import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MouseLightEffect from '@/components/MouseLightEffect';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Zahra | Full Stack Developer Portfolio',
    template: '%s | Zahra',
  },
  description:
    'Portfolio of Zahra, a Full Stack Developer specializing in C#, Python, React, and Next.js. Showcasing projects, skills, and experience in software development.',
  keywords: [
    'Zahra',
    'Full Stack Developer',
    'Software Developer',
    'React Developer',
    'Next.js Developer',
    'C# Developer',
    'Python Developer',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Zahra' }],
  creator: 'Zahra',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://zahraahmed.dev',
    siteName: 'Zahra Portfolio',
    title: 'Zahra | Full Stack Developer',
    description:
      'Portfolio of Zahra, a Full Stack Developer specializing in C#, Python, React, and Next.js.',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zahra | Full Stack Developer',
    description:
      'Portfolio of Zahra, a Full Stack Developer specializing in C#, Python, React, and Next.js.',
    creator: '@zahraahmed',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MouseLightEffect />
        {children}
      </body>
    </html>
  );
}
