import {
  createLocalBusinessStructuredData,
  createServiceStructuredData,
  createWebSiteStructuredData,
} from "@/lib/seo/structured-data";

const serialize = (schema: object) => JSON.stringify(schema).replace(/</g, "\\u003c");

export default function StructuredData() {
  const schemas = [
    {
      "@context": "https://schema.org",
      ...createLocalBusinessStructuredData(),
    },
    {
      "@context": "https://schema.org",
      ...createWebSiteStructuredData(),
    },
    {
      "@context": "https://schema.org",
      ...createServiceStructuredData(),
    },
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(schema) }}
        />
      ))}
    </>
  );
}
