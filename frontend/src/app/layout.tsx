import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import CookieConsentBanner from "@/components/layout/CookieConsentBanner";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skladamy.pl';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SkładaMy - Profesjonalny montaż mebli w Słupsku | Gwarancja 30 dni",
    template: "%s | SkładaMy"
  },
  description: "⭐ Montaż mebli IKEA w Słupsku ✓ Szafy PAX ✓ Kuchnie ✓ Gwarancja 30 dni ✓ 300+ zadowolonych klientów ✓ Dojazd w 24h ✓ Bezpłatna wycena",
  keywords: [
    "montaż mebli Słupsk", 
    "składanie mebli IKEA Słupsk", 
    "montaż szafy PAX Słupsk",
    "montaż kuchni IKEA Słupsk",
    "monterzy mebli Słupsk",
    "wieszanie szafek Słupsk",
    "kotwienie ściany Słupsk",
    "usługi montażowe Słupsk",
    "montaż garderoby Słupsk"
  ],
  authors: [{ name: "SkładaMy", url: "https://skladamy.pl" }],
  creator: "SkładaMy",
  publisher: "SkładaMy",
  category: "Usługi montażowe",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteUrl,
    siteName: "SkładaMy",
    title: "SkładaMy - Profesjonalny montaż mebli w Słupsku | Gwarancja 30 dni",
    description: "⭐ Montaż mebli IKEA w Słupsku ✓ 300+ zadowolonych klientów ✓ Gwarancja 30 dni ✓ Dojazd w 24h ✓ Bezpłatna wycena",
    images: [
      {
        url: `${siteUrl}/SkładaMy.svg`,
        width: 160,
        height: 40,
        alt: "SkładaMy - Montaż mebli Słupsk",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@skladamy_pl",
    title: "SkładaMy - Profesjonalny montaż mebli w Słupsku",
    description: "⭐ Montaż mebli IKEA w Słupsku ✓ 300+ zadowolonych klientów ✓ Gwarancja 30 dni",
    images: [`${siteUrl}/SkładaMy.svg`],
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
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
  icons: {
    icon: '/ikona.ico',
    shortcut: '/ikona.ico',
    apple: '/ikona.ico',
  },
  other: {
    'geo.region': 'PL-PM',
    'geo.placename': 'Słupsk',
    'geo.position': '54.464;17.029',
    'ICBM': '54.464, 17.029'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={inter.variable}>
      <head>
        <link rel="icon" href="/ikona.ico" />
        <link rel="shortcut icon" href="/ikona.ico" />
        <link rel="apple-touch-icon" href="/ikona.ico" />
        {/* Inline critical CSS: podstawowe zmienne kolorów + body aby zredukować FOUC przy opóźnieniu głównego CSS */}
        <style dangerouslySetInnerHTML={{ __html: `:root{--background:#FFFFFF;--foreground:#111111;--primary:#FFC400;--primary-foreground:#111111;}body{margin:0;background:var(--background);color:var(--foreground);font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}h1,h2,h3,h4,h5,h6{font-weight:600;letter-spacing:-.025em}` }} />
        {/* Preload głównego arkusza Next bez zmiany jego media (bezpieczne dla designu) */}
        <Script id="preload-main-css" strategy="beforeInteractive">
          {`
            (function(){
              try{
                var head=document.head; if(!head) return;
                var link=head.querySelector('link[rel="stylesheet"][href*="/_next/static/css/"]');
                if(!link) return;
                var href=link.getAttribute('href');
                if(!href) return;
                var exists=head.querySelector('link[rel="preload"][as="style"][href="'+href+'"]');
                if(!exists){
                  var pl=document.createElement('link');
                  pl.rel='preload'; pl.as='style'; pl.href=href; pl.crossOrigin=link.crossOrigin||'';
                  head.insertBefore(pl, link);
                }
              }catch(_){}
            })();
          `}
        </Script>
        <StructuredData />
        {/* Google Tag Manager stub (dataLayer init only; real loader after consent) */}
        <Script id="gtm-datalayer" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'gtm.placeholder'});`}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) - wyświetli się dopiero gdy gtm.js zostanie doładowany po zgodzie */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-56KC6N53"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <div className="min-h-screen bg-background">
          {children}
        </div>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
