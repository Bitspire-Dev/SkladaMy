import { COMPANY_CONFIG, getSiteUrl } from "@/lib/config";

export default function StructuredData() {
  const siteUrl = getSiteUrl();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_CONFIG.name,
    // 1200x630 PNG — Google rich results require a raster image (SVG not
    // supported). Generated from skladamy.svg via sharp.
    image: `${siteUrl}/layout/skladamy-og.png`,
    description:
      "Profesjonalny montaż mebli IKEA w Słupsku. Szafy PAX, kuchnie, wieszanie szafek. Gwarancja 30 dni, dojazd w 24h.",
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY_CONFIG.address.city,
      addressRegion: COMPANY_CONFIG.address.region,
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_CONFIG.address.coordinates.latitude,
      longitude: COMPANY_CONFIG.address.coordinates.longitude,
    },
    url: siteUrl,
    telephone: COMPANY_CONFIG.phone,
    email: COMPANY_CONFIG.email,
    priceRange: "$$",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: COMPANY_CONFIG.address.coordinates.latitude,
        longitude: COMPANY_CONFIG.address.coordinates.longitude,
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usługi montażowe",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Montaż mebli IKEA",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Montaż szafy PAX",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Montaż kuchni IKEA",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Wieszanie szafek",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Wieszanie szafek kuchennych",
              },
            },
          ],
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "300",
    },
    openingHours: "Mo-Sa 08:00-20:00",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Montaż mebli IKEA Słupsk",
    description:
      "Profesjonalny montaż mebli IKEA w Słupsku i okolicach. Szafy PAX, kuchnie, wieszanie szafek.",
    provider: {
      "@type": "LocalBusiness",
      name: "SkładaMy",
    },
    areaServed: {
      "@type": "City",
      name: "Słupsk",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Montaż mebli",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Montaż szafy PAX IKEA",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
