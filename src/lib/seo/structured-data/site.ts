import { COMPANY_CONFIG, SITE_CONFIG } from "@/lib/config";

const siteUrl = SITE_CONFIG.url;
const businessId = `${siteUrl}/#business`;

/**
 * LocalBusiness JSON-LD — main entity describing SkładaMy.
 * Rich results require a raster `image` (SVG unsupported).
 */
export const createLocalBusinessStructuredData = () => ({
  "@type": "LocalBusiness" as const,
  "@id": businessId,
  name: COMPANY_CONFIG.name,
  image: `${siteUrl}${SITE_CONFIG.ogImage.path}`,
  description:
    "Profesjonalny montaż mebli IKEA w Słupsku. Szafy PAX, kuchnie, wieszanie szafek. Gwarancja 30 dni, dojazd w 24h.",
  address: {
    "@type": "PostalAddress" as const,
    addressLocality: COMPANY_CONFIG.address.city,
    addressRegion: COMPANY_CONFIG.address.region,
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates" as const,
    latitude: COMPANY_CONFIG.address.coordinates.latitude,
    longitude: COMPANY_CONFIG.address.coordinates.longitude,
  },
  url: siteUrl,
  telephone: COMPANY_CONFIG.phone,
  email: COMPANY_CONFIG.email,
  priceRange: "$$",
  sameAs: Object.values(SITE_CONFIG.socials).filter(Boolean),
  contactPoint: {
    "@type": "ContactPoint" as const,
    contactType: "customer support",
    telephone: COMPANY_CONFIG.phone,
    email: COMPANY_CONFIG.email,
    areaServed: "PL",
    availableLanguage: ["pl"],
  },
  serviceArea: {
    "@type": "GeoCircle" as const,
    geoMidpoint: {
      "@type": "GeoCoordinates" as const,
      latitude: COMPANY_CONFIG.address.coordinates.latitude,
      longitude: COMPANY_CONFIG.address.coordinates.longitude,
    },
    geoRadius: "50000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog" as const,
    name: "Usługi montażowe",
    itemListElement: [
      {
        "@type": "OfferCatalog" as const,
        name: "Montaż mebli IKEA",
        itemListElement: [
          {
            "@type": "Offer" as const,
            itemOffered: { "@type": "Service" as const, name: "Montaż szafy PAX" },
          },
          {
            "@type": "Offer" as const,
            itemOffered: { "@type": "Service" as const, name: "Montaż kuchni IKEA" },
          },
        ],
      },
      {
        "@type": "OfferCatalog" as const,
        name: "Wieszanie szafek",
        itemListElement: [
          {
            "@type": "Offer" as const,
            itemOffered: { "@type": "Service" as const, name: "Wieszanie szafek kuchennych" },
          },
        ],
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating" as const,
    ratingValue: "4.9",
    reviewCount: "300",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
  ],
});

/**
 * WebSite JSON-LD — links the site to the LocalBusiness entity via @id.
 */
export const createWebSiteStructuredData = () => ({
  "@type": "WebSite" as const,
  "@id": `${siteUrl}/#website`,
  name: SITE_CONFIG.name,
  url: siteUrl,
  inLanguage: "pl-PL",
  publisher: { "@id": businessId },
});

/**
 * Service JSON-LD — flagship offer, provider references the LocalBusiness.
 */
export const createServiceStructuredData = () => ({
  "@type": "Service" as const,
  name: "Montaż mebli IKEA Słupsk",
  description:
    "Profesjonalny montaż mebli IKEA w Słupsku i okolicach. Szafy PAX, kuchnie, wieszanie szafek.",
  provider: { "@id": businessId },
  areaServed: {
    "@type": "City" as const,
    name: "Słupsk",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog" as const,
    name: "Montaż mebli",
    itemListElement: [
      {
        "@type": "Offer" as const,
        itemOffered: { "@type": "Service" as const, name: "Montaż szafy PAX IKEA" },
      },
    ],
  },
});
