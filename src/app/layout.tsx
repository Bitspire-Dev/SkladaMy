import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import CookieConsentBanner from "@/components/layout/CookieConsentBanner";
import Script from "next/script";
import { SITE_CONFIG, ogImageUrl } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name, url: siteUrl }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: SITE_CONFIG.category,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title.default,
    description: SITE_CONFIG.description,
    images: [
      {
        url: ogImageUrl,
        width: SITE_CONFIG.ogImage.width,
        height: SITE_CONFIG.ogImage.height,
        alt: SITE_CONFIG.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: SITE_CONFIG.twitter.card,
    site: SITE_CONFIG.twitter.site,
    title: SITE_CONFIG.title.default,
    description: SITE_CONFIG.description,
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: SITE_CONFIG.verification.google
    ? { google: SITE_CONFIG.verification.google }
    : undefined,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "geo.region": SITE_CONFIG.geo.region,
    "geo.placename": SITE_CONFIG.geo.placename,
    "geo.position": SITE_CONFIG.geo.position,
    ICBM: SITE_CONFIG.geo.position.replace(";", ", "),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Inline critical CSS: podstawowe zmienne kolorów + body aby zredukować FOUC przy opóźnieniu głównego CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--background:#FFFFFF;--foreground:#111111;--primary:#FFC400;--primary-foreground:#111111;}body{margin:0;background:var(--background);color:var(--foreground);font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}h1,h2,h3,h4,h5,h6{font-weight:600;letter-spacing:-.025em}`,
          }}
        />
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
        {/* GTM <noscript> iframe removed: it loaded tracking unconditionally,
            bypassing cookie consent. The real gtm.js is injected client-side
            by CookieConsentBanner only after the user grants analytics. */}
        <div className="min-h-screen bg-background">{children}</div>
        {/* Cookie consent banner: sole entry point for GTM/analytics scripts.
            Mounted here so it appears on every page and the Footer
            "Preferencje cookies" button (window.openCookiePreferences) works. */}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
