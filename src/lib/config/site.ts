// ============================================
// SITE CONFIG - SEO & identity constants
// ============================================
// Single source of truth for site-wide metadata: layout.tsx metadata,
// JSON-LD structured data, sitemap, robots.
// Per-environment values (URL) still come from env - see environment.ts.

import { getSiteUrl } from "./environment";

export const SITE_CONFIG = {
  name: "SkładaMy",
  url: getSiteUrl(),

  title: {
    default: "Montaż mebli w Słupsku - SkładaMy | Gwarancja 30 dni",
    template: "%s | SkładaMy",
  },
  description:
    "⭐ Montaż mebli IKEA w Słupsku ✓ Szafy PAX ✓ Kuchnie ✓ Gwarancja 30 dni ✓ 300+ zadowolonych klientów ✓ Dojazd w 24h ✓ Bezpłatna wycena",
  keywords: [
    "montaż mebli Słupsk",
    "składanie mebli IKEA Słupsk",
    "montaż szafy PAX Słupsk",
    "montaż kuchni IKEA Słupsk",
    "monterzy mebli Słupsk",
    "wieszanie szafek Słupsk",
    "kotwienie ściany Słupsk",
    "usługi montażowe Słupsk",
    "montaż garderoby Słupsk",
  ],

  locale: "pl_PL",
  category: "Usługi montażowe",

  ogImage: {
    path: "/layout/skladamy-og.png",
    width: 1200,
    height: 630,
    alt: "SkładaMy - Montaż mebli Słupsk",
  },

  twitter: {
    site: "@skladamy_com",
    card: "summary_large_image",
  },

  socials: {
    facebook: "https://facebook.com/skladamy",
    instagram: "https://instagram.com/skladamy",
  },

  geo: {
    region: "PL-PM",
    placename: "Słupsk",
    position: "54.464;17.029",
  },

  // Google Search Console verification token (content of the meta tag).
  // Leave empty to omit the tag.
  verification: {
    google: "",
  },

  // Google Tag Manager container ID. Loaded only after cookie consent.
  // Leave empty to disable analytics entirely.
  analytics: {
    gtmId: "GTM-WRT8NDXN",
  },
} as const;

export const ogImageUrl = `${SITE_CONFIG.url}${SITE_CONFIG.ogImage.path}`;
