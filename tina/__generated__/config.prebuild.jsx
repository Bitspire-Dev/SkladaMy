// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.TINA_BRANCH || process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
var seoFields = [
  {
    name: "metaTitle",
    label: "Meta tytu\u0142",
    type: "string",
    description: "Tytu\u0142 meta (max 60 znak\xF3w)"
  },
  {
    name: "metaDescription",
    label: "Meta opis",
    type: "string",
    ui: { component: "textarea" },
    description: "Opis meta (max 160 znak\xF3w)"
  },
  {
    name: "keywords",
    label: "S\u0142owa kluczowe",
    type: "string",
    description: "S\u0142owa kluczowe rozdzielone przecinkami"
  },
  {
    name: "canonicalUrl",
    label: "URL kanoniczny",
    type: "string"
  },
  {
    name: "ogTitle",
    label: "Tytu\u0142 Open Graph",
    type: "string"
  },
  {
    name: "ogDescription",
    label: "Opis Open Graph",
    type: "string",
    ui: { component: "textarea" }
  },
  {
    name: "ogImage",
    label: "Obraz Open Graph",
    type: "image",
    description: "Obraz 1200x630px"
  },
  {
    name: "ogType",
    label: "Typ Open Graph",
    type: "string",
    options: [
      { value: "website", label: "website" },
      { value: "article", label: "article" },
      { value: "product", label: "product" }
    ]
  },
  {
    name: "twitterCard",
    label: "Karta Twitter/X",
    type: "string",
    options: [
      { value: "summary", label: "summary" },
      { value: "summary_large_image", label: "summary_large_image" }
    ]
  },
  {
    name: "noindex",
    label: "Noindex",
    type: "boolean",
    description: "Blokuj indeksowanie przez wyszukiwarki"
  },
  {
    name: "nofollow",
    label: "Nofollow",
    type: "boolean",
    description: "Nie \u015Bled\u017A link\xF3w na stronie"
  },
  {
    name: "structuredData",
    label: "Dane strukturalne (JSON-LD)",
    type: "string",
    ui: { component: "textarea" },
    description: "Schema.org JSON-LD jako tekst JSON"
  },
  {
    name: "lastmod",
    label: "Ostatnia modyfikacja",
    type: "datetime"
  }
];
var imageFields = [
  {
    name: "src",
    label: "Obraz",
    type: "image",
    required: true
  },
  {
    name: "alt",
    label: "Tekst alternatywny",
    type: "string",
    description: "Opis obrazu dla SEO i dost\u0119pno\u015Bci"
  },
  {
    name: "caption",
    label: "Podpis",
    type: "string"
  }
];
var ctaFields = [
  { name: "label", label: "Etykieta", type: "string", required: true },
  { name: "href", label: "Link", type: "string", required: true }
];
var cardItemFields = [
  {
    name: "icon",
    label: "Ikona (nazwa lucide)",
    type: "string",
    description: "np. Shield, Clock, Users, Award, Phone, Mail, MapPin, Wrench, Sparkles"
  },
  { name: "title", label: "Tytu\u0142", type: "string", required: true },
  { name: "description", label: "Opis", type: "string", ui: { component: "textarea" } },
  { name: "details", label: "Punkty", type: "string", list: true }
];
var pageSectionTemplates = [
  {
    name: "pageHeader",
    label: "Nag\u0142\xF3wek strony",
    fields: [
      { name: "badge", label: "Plakietka", type: "string" },
      { name: "title", label: "Tytu\u0142", type: "string", required: true },
      { name: "subtitle", label: "Podtytu\u0142", type: "string", ui: { component: "textarea" } },
      { name: "badges", label: "Odznaki", type: "string", list: true },
      {
        name: "bare",
        label: "Bez bia\u0142ego paska (go\u0142y nag\u0142\xF3wek)",
        type: "boolean"
      }
    ]
  },
  {
    name: "hero",
    label: "Hero (strona g\u0142\xF3wna)",
    fields: [
      { name: "badge", label: "Plakietka", type: "string" },
      { name: "image", label: "Obraz t\u0142a", type: "image" },
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      { name: "headingAccent", label: "Akcent nag\u0142\xF3wka", type: "string" },
      { name: "headingSuffix", label: "Druga linia nag\u0142\xF3wka", type: "string" },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      { name: "badges", label: "Odznaki zaufania", type: "string", list: true },
      {
        name: "cards",
        label: "Karty zaufania",
        type: "object",
        list: true,
        fields: [
          { name: "title", label: "Tytu\u0142", type: "string", required: true },
          { name: "text", label: "Tekst", type: "string", required: true }
        ]
      },
      { name: "primaryCta", label: "G\u0142\xF3wne CTA", type: "object", fields: ctaFields },
      { name: "secondaryCta", label: "Drugie CTA", type: "object", fields: ctaFields },
      { name: "areaText", label: "Tekst obszaru", type: "string" },
      { name: "areaLinkLabel", label: "Etykieta linku obszaru", type: "string" },
      { name: "areaLinkHref", label: "Link obszaru", type: "string" }
    ]
  },
  {
    name: "services",
    label: "Us\u0142ugi",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "items",
        label: "Us\u0142ugi",
        type: "object",
        list: true,
        fields: cardItemFields,
        ui: { itemProps: (item) => ({ label: item?.title }) }
      }
    ]
  },
  {
    name: "features",
    label: "Zalety (siatka kart)",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "items",
        label: "Karty",
        type: "object",
        list: true,
        fields: cardItemFields,
        ui: { itemProps: (item) => ({ label: item?.title }) }
      },
      { name: "footerNotes", label: "Notki pod siatk\u0105", type: "string", list: true }
    ]
  },
  {
    name: "process",
    label: "Proces (kroki)",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "steps",
        label: "Kroki",
        type: "object",
        list: true,
        fields: cardItemFields,
        ui: { itemProps: (item) => ({ label: item?.title }) }
      },
      { name: "ctaText", label: "Tekst nad CTA", type: "string" },
      { name: "ctaPrimary", label: "CTA g\u0142\xF3wne", type: "object", fields: ctaFields },
      { name: "ctaSecondary", label: "CTA drugie", type: "object", fields: ctaFields }
    ]
  },
  {
    name: "testimonials",
    label: "Opinie",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "items",
        label: "Opinie",
        type: "object",
        list: true,
        fields: [
          { name: "name", label: "Klient", type: "string", required: true },
          { name: "content", label: "Tre\u015B\u0107", type: "string", ui: { component: "textarea" } },
          { name: "rating", label: "Ocena (1-5)", type: "number" },
          { name: "location", label: "Lokalizacja", type: "string" },
          { name: "service", label: "Us\u0142uga", type: "string" },
          { name: "date", label: "Data", type: "datetime" },
          { name: "verified", label: "Zweryfikowana", type: "boolean" }
        ],
        ui: { itemProps: (item) => ({ label: item?.name }) }
      },
      { name: "footnotes", label: "Stopka / notki", type: "string", list: true },
      { name: "note", label: "Notka na dole", type: "string" }
    ]
  },
  {
    name: "faq",
    label: "FAQ (rozwijane)",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "categories",
        label: "Kategorie pyta\u0144",
        type: "object",
        list: true,
        fields: [
          { name: "key", label: "Klucz", type: "string", required: true },
          { name: "label", label: "Etykieta", type: "string", required: true }
        ]
      },
      {
        name: "items",
        label: "Pytania",
        type: "object",
        list: true,
        fields: [
          { name: "question", label: "Pytanie", type: "string", required: true },
          { name: "answer", label: "Odpowied\u017A", type: "string", ui: { component: "textarea" } },
          {
            name: "category",
            label: "Kategoria (klucz)",
            type: "string",
            description: "Musi pasowa\u0107 do klucza kategorii powy\u017Cej"
          },
          { name: "featured", label: "Wyr\xF3\u017Cnione", type: "boolean" }
        ],
        ui: { itemProps: (item) => ({ label: item?.question }) }
      },
      { name: "ctaText", label: "Tekst nad CTA", type: "string" },
      { name: "ctaPrimary", label: "CTA g\u0142\xF3wne", type: "object", fields: ctaFields },
      { name: "ctaSecondary", label: "CTA drugie", type: "object", fields: ctaFields }
    ]
  },
  {
    name: "qa",
    label: "Pytania i odpowiedzi (p\u0142askie)",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      {
        name: "items",
        label: "Pytania",
        type: "object",
        list: true,
        fields: [
          { name: "question", label: "Pytanie", type: "string", required: true },
          { name: "answer", label: "Odpowied\u017A", type: "string", ui: { component: "textarea" } }
        ],
        ui: { itemProps: (item) => ({ label: item?.question }) }
      }
    ]
  },
  {
    name: "cta",
    label: "Wezwanie do dzia\u0142ania",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      { name: "text", label: "Tekst", type: "string", ui: { component: "textarea" } },
      { name: "primaryCta", label: "CTA g\u0142\xF3wne", type: "object", fields: ctaFields },
      { name: "secondaryCta", label: "CTA drugie", type: "object", fields: ctaFields },
      { name: "infoItems", label: "Elementy info", type: "string", list: true },
      { name: "trustItems", label: "Elementy zaufania", type: "string", list: true }
    ]
  },
  {
    name: "stats",
    label: "Statystyki",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      {
        name: "items",
        label: "Statystyki",
        type: "object",
        list: true,
        fields: [
          { name: "value", label: "Warto\u015B\u0107", type: "string", required: true },
          { name: "label", label: "Etykieta", type: "string", required: true }
        ],
        ui: { itemProps: (item) => ({ label: `${item?.value ?? ""} ${item?.label ?? ""}` }) }
      }
    ]
  },
  {
    name: "listGrid",
    label: "Lista obszar\xF3w/element\xF3w",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      { name: "entries", label: "Elementy", type: "string", list: true },
      { name: "note", label: "Notka", type: "string", ui: { component: "textarea" } }
    ]
  },
  {
    name: "richText",
    label: "Blok tekstu (proza)",
    fields: [
      { name: "heading", label: "Nag\u0142\xF3wek", type: "string", required: true },
      {
        name: "content",
        label: "Tre\u015B\u0107",
        type: "string",
        ui: { component: "textarea" },
        description: "Markdown lub HTML"
      }
    ]
  },
  {
    name: "contactPanel",
    label: "Panel kontaktowy + formularz",
    fields: [
      { name: "infoHeading", label: "Nag\u0142\xF3wek info", type: "string" },
      {
        name: "contacts",
        label: "Informacje kontaktowe",
        type: "object",
        list: true,
        fields: [
          { name: "icon", label: "Ikona", type: "string" },
          { name: "title", label: "Tytu\u0142", type: "string", required: true },
          { name: "text", label: "Tekst", type: "string" },
          { name: "note", label: "Notka", type: "string" },
          { name: "href", label: "Link (opcjonalnie)", type: "string" }
        ],
        ui: { itemProps: (item) => ({ label: item?.title }) }
      },
      { name: "prepTitle", label: "Tytu\u0142 \u201Eprzygotuj\u201D", type: "string" },
      { name: "prepItems", label: "Punkty \u201Eprzygotuj\u201D", type: "string", list: true },
      { name: "formHeading", label: "Nag\u0142\xF3wek formularza", type: "string" }
    ]
  }
];
var authorFields = [
  {
    name: "name",
    label: "Imi\u0119 i nazwisko / zesp\xF3\u0142",
    type: "string",
    required: true
  },
  { name: "role", label: "Rola / stanowisko", type: "string" },
  {
    name: "bio",
    label: "Biografia",
    type: "string",
    ui: { component: "textarea" }
  },
  { name: "avatar", label: "Avatar", type: "image" },
  { name: "email", label: "E-mail", type: "string" },
  { name: "website", label: "Strona www", type: "string" },
  { name: "linkedin", label: "LinkedIn", type: "string" },
  { name: "twitter", label: "Twitter / X", type: "string" }
];
var config_default = defineConfig({
  branch,
  // Optional: set NEXT_PUBLIC_TINA_CLIENT_ID + TINA_TOKEN to use TinaCloud.
  // Without them, TinaCMS runs fully locally via `tinacms dev` (git-based).
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Artyku\u0142y bloga",
        path: "content/posts",
        format: "md",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename.replace(/\.md$/, "")}`
        },
        defaultItem: () => ({
          publishDate: (/* @__PURE__ */ new Date()).toISOString(),
          readTime: 5,
          featured: false
        }),
        fields: [
          {
            name: "title",
            label: "Tytu\u0142",
            type: "string",
            isTitle: true,
            required: true
          },
          {
            name: "slug",
            label: "Slug (URL)",
            type: "string",
            required: true,
            description: "Adres URL artyku\u0142u: /blog/<slug>"
          },
          {
            name: "excerpt",
            label: "Zajawka",
            type: "string",
            ui: { component: "textarea" },
            required: true,
            description: "Kr\xF3tki opis artyku\u0142u (wy\u015Bwietlany na li\u015Bcie)"
          },
          {
            name: "publishDate",
            label: "Data publikacji",
            type: "datetime",
            required: true
          },
          {
            name: "readTime",
            label: "Czas czytania (min)",
            type: "number",
            required: true
          },
          {
            name: "views",
            label: "Wy\u015Bwietlenia",
            type: "number"
          },
          {
            name: "featured",
            label: "Wyr\xF3\u017Cniony",
            type: "boolean",
            description: "Artyku\u0142 wyr\xF3\u017Cniony (wy\u015Bwietlany na g\xF3rze)"
          },
          {
            name: "featuredImage",
            label: "Obraz wyr\xF3\u017Cniaj\u0105cy",
            type: "object",
            fields: imageFields
          },
          {
            name: "gallery",
            label: "Galeria zdj\u0119\u0107",
            type: "object",
            list: true,
            fields: imageFields,
            ui: {
              itemProps: (item) => ({ label: item?.alt || "Zdj\u0119cie" })
            }
          },
          {
            name: "category",
            label: "Kategoria",
            type: "reference",
            collections: ["category"],
            required: true
          },
          {
            name: "tags",
            label: "Tagi",
            type: "string",
            list: true,
            ui: { component: "tags" },
            description: "Slugi tag\xF3w z kolekcji Tagi (np. ikea, montaz)"
          },
          {
            name: "author",
            label: "Autor",
            type: "object",
            required: true,
            fields: authorFields
          },
          {
            name: "relatedPosts",
            label: "Powi\u0105zane artyku\u0142y",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.post || "Artyku\u0142" })
            },
            fields: [
              {
                name: "post",
                label: "Artyku\u0142",
                type: "reference",
                collections: ["post"],
                required: true
              }
            ]
          },
          {
            name: "faq",
            label: "FAQ",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.question || "Pytanie" })
            },
            fields: [
              {
                name: "question",
                label: "Pytanie",
                type: "string",
                required: true
              },
              {
                name: "answer",
                label: "Odpowied\u017A",
                type: "string",
                ui: { component: "textarea" },
                required: true
              }
            ]
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: seoFields
          },
          {
            name: "body",
            label: "Tre\u015B\u0107",
            type: "rich-text",
            isBody: true,
            description: "G\u0142\xF3wna tre\u015B\u0107 artyku\u0142u"
          }
        ]
      },
      {
        name: "category",
        label: "Kategorie",
        path: "content/categories",
        format: "md",
        ui: { router: () => "/blog" },
        fields: [
          {
            name: "name",
            label: "Nazwa",
            type: "string",
            isTitle: true,
            required: true
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
            required: true
          },
          {
            name: "description",
            label: "Opis",
            type: "string",
            ui: { component: "textarea" }
          },
          {
            name: "color",
            label: "Kolor",
            type: "string",
            ui: { component: "color" },
            description: "Kolor kategorii (hex)"
          },
          {
            name: "icon",
            label: "Ikona",
            type: "string",
            description: "Nazwa ikony (opcjonalnie)"
          },
          {
            name: "order",
            label: "Kolejno\u015B\u0107",
            type: "number"
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: seoFields
          }
        ]
      },
      {
        name: "tag",
        label: "Tagi",
        path: "content/tags",
        format: "md",
        ui: { router: () => "/blog" },
        fields: [
          {
            name: "name",
            label: "Nazwa",
            type: "string",
            isTitle: true,
            required: true
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
            required: true
          },
          {
            name: "color",
            label: "Kolor",
            type: "string",
            ui: { component: "color" }
          }
        ]
      },
      {
        name: "gallery",
        label: "Galeria portfolio",
        path: "content/gallery",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          router: () => "/portfolio"
        },
        fields: [
          {
            name: "images",
            label: "Zdj\u0119cia galerii",
            type: "object",
            list: true,
            fields: imageFields,
            ui: {
              itemProps: (item) => ({ label: item?.alt || item?.src || "Zdj\u0119cie" })
            }
          },
          {
            name: "featuredImages",
            label: "Zdj\u0119cia wyr\xF3\u017Cnione",
            type: "object",
            list: true,
            fields: imageFields,
            description: "Zdj\u0119cia pokazywane na stronie g\u0142\xF3wnej",
            ui: {
              itemProps: (item) => ({ label: item?.alt || item?.src || "Zdj\u0119cie" })
            }
          }
        ]
      },
      {
        name: "page",
        label: "Podstrony",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => {
            const { route } = document;
            return route && route.startsWith("/") ? route : `/${route || document._sys.filename}`;
          }
        },
        fields: [
          {
            name: "title",
            label: "Tytu\u0142 strony",
            type: "string",
            isTitle: true,
            required: true
          },
          {
            name: "route",
            label: "Adres URL",
            type: "string",
            required: true,
            description: "\u015Acie\u017Cka strony, np. /o-nas (dla strony g\u0142\xF3wnej: /)"
          },
          {
            name: "sections",
            label: "Sekcje strony",
            type: "object",
            list: true,
            templates: pageSectionTemplates
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: seoFields
          },
          {
            name: "body",
            label: "Tre\u015B\u0107 strony",
            type: "rich-text",
            isBody: true,
            description: "G\u0142\xF3wna tre\u015B\u0107 (strony informacyjne/prawne)"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
