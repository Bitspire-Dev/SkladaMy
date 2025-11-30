'use client';

import { COMPANY_DATA } from '@/lib/company-data';

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SkładaMy",
    "image": "https://skladamy.pl/SkładaMy.svg",
    "description": "Profesjonalny montaż mebli IKEA w Słupsku. Szafy PAX, kuchnie, wieszanie szafek. Gwarancja 30 dni, dojazd w 24h.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Słupsk",
      "addressRegion": "Pomorskie",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 54.464,
      "longitude": 17.029
    },
    "url": "https://skladamy.pl",
    "telephone": COMPANY_DATA.phone,
    "email": COMPANY_DATA.email,
    "priceRange": "$$",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 54.464,
        "longitude": 17.029
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Usługi montażowe",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Montaż mebli IKEA",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Montaż szafy PAX"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Montaż kuchni IKEA"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Wieszanie szafek",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Wieszanie szafek kuchennych"
              }
            }
          ]
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "300"
    },
    "openingHours": "Mo-Sa 08:00-20:00"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Montaż mebli IKEA Słupsk",
    "description": "Profesjonalny montaż mebli IKEA w Słupsku i okolicach. Szafy PAX, kuchnie, wieszanie szafek.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "SkładaMy"
    },
    "areaServed": {
      "@type": "City",
      "name": "Słupsk"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Montaż mebli",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Montaż szafy PAX IKEA"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}
