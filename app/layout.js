import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma-db';

export async function generateMetadata() {
  const siteName = 'PulseEdge Intelligence';
  const description = 'Real-time AI market updates, IT job trends, and industry intelligence.';
  
  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`
    },
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pulseedge-intel.vercel.app'),
    openGraph: {
      title: siteName,
      description,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pulseedge-intel.vercel.app',
      siteName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense Official Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXX" crossOrigin="anonymous"></script>
      </head>
      <body>
        <Header />
        <main style={{ minHeight: '100vh', padding: '2rem 0' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
