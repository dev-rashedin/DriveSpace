import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'DriveSpace – Secure Cloud Storage',
  description:
    'Upload, organize, and manage your files with DriveSpace. Built with Next.js 15 and Appwrite.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} bg-lime font-inter antialiased `}>{children}</body>
    </html>
  );
}
