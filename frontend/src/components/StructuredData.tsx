import { COMPANY_DATA } from '@/lib/company-data';
import { getSiteUrl } from '@/lib/env';

export default function StructuredData() {
  const siteUrl = getSiteUrl();
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": COMPANY_DATA.name,
    "image": `${siteUrl}/skladamy.svg`,
    "description": "Profesjonalny montaż mebli IKEA w Słupsku. Szafy PAX, kuchnie, wieszanie szafek. Gwarancja 30 dni, dojazd w 24h.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": COMPANY_DATA.address.city,
      "addressRegion": COMPANY_DATA.address.region,
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": COMPANY_DATA.address.coordinates.latitude,
      "longitude": COMPANY_DATA.address.coordinates.longitude
    },
    "url": siteUrl,
    "telephone": COMPANY_DATA.phone,
    "email": COMPANY_DATA.email,
    "priceRange": "$$",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": COMPANY_DATA.address.coordinates.latitude,
        "longitude": COMPANY_DATA.address.coordinates.longitude
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
