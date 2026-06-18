import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
// import Header from "@/app/components/Header"; // ancienne nav conservée
import Header from '@/app/components/Header';
import { PageTransitionProvider } from '@/app/components/ui/PageTransition';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Metal AXS x WordPress',
  description: 'Front Next.js connecte a WordPress via WPGraphQL.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`h-full antialiased ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col noisebg-black/[0.16] ">
        <PageTransitionProvider>
          <Header />
          <div className="">{children}</div>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
