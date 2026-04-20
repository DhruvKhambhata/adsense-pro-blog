import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/database';

export async function generateMetadata() {
  const settings = await prisma.siteSettings.findFirst();
  const siteName = settings?.siteName || 'FutureEdge Insights';
  const description = settings?.description || 'Deep dives into AI, future tech, and digital evolution.';
  
  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`
    },
    description,
    metadataBase: new URL('http://localhost:3000'),
    openGraph: {
      title: siteName,
      description,
      url: 'http://localhost:3000',
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
        {/* AdSense Comment: Paste your auto-ads script here */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXX" crossorigin="anonymous"></script> */}
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
