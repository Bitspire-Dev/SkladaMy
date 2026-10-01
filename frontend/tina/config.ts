import { defineConfig, type TinaField } from "tinacms";

// Branch is only used when connecting to TinaCloud. For local development
// (`tinacms dev`) content is read/written straight to the filesystem.
const branch =
  process.env.TINA_BRANCH ||
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

const seoFields: TinaField[] = [
  {
    name: "metaTitle",
    label: "Meta tytuł",
    type: "string",
    description: "Tytuł meta (max 60 znaków)",
  },
  {
    name: "metaDescription",
    label: "Meta opis",
    type: "string",
    ui: { component: "textarea" },
    description: "Opis meta (max 160 znaków)",
  },
  {
    name: "keywords",
    label: "Słowa kluczowe",
    type: "string",
    description: "Słowa kluczowe rozdzielone przecinkami",
  },
  {
    name: "canonicalUrl",
    label: "URL kanoniczny",
    type: "string",
  },
  {
    name: "ogTitle",
    label: "Tytuł Open Graph",
    type: "string",
  },
  {
    name: "ogDescription",
    label: "Opis Open Graph",
    type: "string",
    ui: { component: "textarea" },
  },
  {
    name: "ogImage",
    label: "Obraz Open Graph",
    type: "image",
    description: "Obraz 1200x630px",
  },
  {
    name: "ogType",
    label: "Typ Open Graph",
    type: "string",
    options: [
      { value: "website", label: "website" },
      { value: "article", label: "article" },
      { value: "product", label: "product" },
    ],
  },
  {
    name: "twitterCard",
    label: "Karta Twitter/X",
    type: "string",
    options: [
      { value: "summary", label: "summary" },
      { value: "summary_large_image", label: "summary_large_image" },
    ],
  },
  {
    name: "noindex",
    label: "Noindex",
    type: "boolean",
    description: "Blokuj indeksowanie przez wyszukiwarki",
  },
  {
    name: "nofollow",
    label: "Nofollow",
    type: "boolean",
    description: "Nie śledź linków na stronie",
  },
  {
    name: "structuredData",
    label: "Dane strukturalne (JSON-LD)",
    type: "string",
    ui: { component: "textarea" },
    description: "Schema.org JSON-LD jako tekst JSON",
  },
  {
    name: "lastmod",
    label: "Ostatnia modyfikacja",
    type: "datetime",
  },
];

const imageFields: TinaField[] = [
  {
    name: "src",
    label: "Obraz",
    type: "image",
    required: true,
  },
  {
    name: "alt",
    label: "Tekst alternatywny",
    type: "string",
    description: "Opis obrazu dla SEO i dostępności",
  },
  {
    name: "caption",
    label: "Podpis",
    type: "string",
  },
];

// ---------------------------------------------------------------------------
// Page "sections" block templates — each block maps 1:1 to a site section.
// `_template` in the markdown frontmatter selects the layout.
// ---------------------------------------------------------------------------

const ctaFields: TinaField[] = [
  { name: "label", label: "Etykieta", type: "string", required: true },
  { name: "href", label: "Link", type: "string", required: true },
];

const cardItemFields: TinaField[] = [
  {
    name: "icon",
    label: "Ikona (nazwa lucide)",
    type: "string",
    description: "np. Shield, Clock, Users, Award, Phone, Mail, MapPin, Wrench, Sparkles",
  },
  { name: "title", label: "Tytuł", type: "string", required: true },
  { name: "description", label: "Opis", type: "string", ui: { component: "textarea" } },
  { name: "details", label: "Punkty", type: "string", list: true },
];

const pageSectionTemplates = [
  {
    name: "pageHeader",
    label: "Nagłówek strony",
    fields: [
      { name: "badge", label: "Plakietka", type: "string" },
      { name: "title", label: "Tytuł", type: "string", required: true },
      { name: "subtitle", label: "Podtytuł", type: "string", ui: { component: "textarea" } },
      { name: "badges", label: "Odznaki", type: "string", list: true },
      {
        name: "bare",
        label: "Bez białego paska (goły nagłówek)",
        type: "boolean",
      },
    ] as TinaField[],
  },
  {
    name: "hero",
    label: "Hero (strona główna)",
    fields: [
      { name: "badge", label: "Plakietka", type: "string" },
      { name: "image", label: "Obraz tła", type: "image" },
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      { name: "headingAccent", label: "Akcent nagłówka", type: "string" },
      { name: "headingSuffix", label: "Druga linia nagłówka", type: "string" },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      { name: "badges", label: "Odznaki zaufania", type: "string", list: true },
      {
        name: "cards",
        label: "Karty zaufania",
        type: "object",
        list: true,
        fields: [
          { name: "title", label: "Tytuł", type: "string", required: true },
          { name: "text", label: "Tekst", type: "string", required: true },
        ] as TinaField[],
      },
      { name: "primaryCta", label: "Główne CTA", type: "object", fields: ctaFields },
      { name: "secondaryCta", label: "Drugie CTA", type: "object", fields: ctaFields },
      { name: "areaText", label: "Tekst obszaru", type: "string" },
      { name: "areaLinkLabel", label: "Etykieta linku obszaru", type: "string" },
      { name: "areaLinkHref", label: "Link obszaru", type: "string" },
    ] as TinaField[],
  },
  {
    name: "services",
    label: "Usługi",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "items",
        label: "Usługi",
        type: "object",
        list: true,
        fields: cardItemFields,
        ui: { itemProps: (item) => ({ label: item?.title }) },
      },
    ] as TinaField[],
  },
  {
    name: "features",
    label: "Zalety (siatka kart)",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "items",
        label: "Karty",
        type: "object",
        list: true,
        fields: cardItemFields,
        ui: { itemProps: (item) => ({ label: item?.title }) },
      },
      { name: "footerNotes", label: "Notki pod siatką", type: "string", list: true },
    ] as TinaField[],
  },
  {
    name: "process",
    label: "Proces (kroki)",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "steps",
        label: "Kroki",
        type: "object",
        list: true,
        fields: cardItemFields,
        ui: { itemProps: (item) => ({ label: item?.title }) },
      },
      { name: "ctaText", label: "Tekst nad CTA", type: "string" },
      { name: "ctaPrimary", label: "CTA główne", type: "object", fields: ctaFields },
      { name: "ctaSecondary", label: "CTA drugie", type: "object", fields: ctaFields },
    ] as TinaField[],
  },
  {
    name: "testimonials",
    label: "Opinie",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "items",
        label: "Opinie",
        type: "object",
        list: true,
        fields: [
          { name: "name", label: "Klient", type: "string", required: true },
          { name: "content", label: "Treść", type: "string", ui: { component: "textarea" } },
          { name: "rating", label: "Ocena (1-5)", type: "number" },
          { name: "location", label: "Lokalizacja", type: "string" },
          { name: "service", label: "Usługa", type: "string" },
          { name: "date", label: "Data", type: "datetime" },
          { name: "verified", label: "Zweryfikowana", type: "boolean" },
        ] as TinaField[],
        ui: { itemProps: (item) => ({ label: item?.name }) },
      },
      { name: "footnotes", label: "Stopka / notki", type: "string", list: true },
      { name: "note", label: "Notka na dole", type: "string" },
    ] as TinaField[],
  },
  {
    name: "faq",
    label: "FAQ (rozwijane)",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      {
        name: "categories",
        label: "Kategorie pytań",
        type: "object",
        list: true,
        fields: [
          { name: "key", label: "Klucz", type: "string", required: true },
          { name: "label", label: "Etykieta", type: "string", required: true },
        ] as TinaField[],
      },
      {
        name: "items",
        label: "Pytania",
        type: "object",
        list: true,
        fields: [
          { name: "question", label: "Pytanie", type: "string", required: true },
          { name: "answer", label: "Odpowiedź", type: "string", ui: { component: "textarea" } },
          {
            name: "category",
            label: "Kategoria (klucz)",
            type: "string",
            description: "Musi pasować do klucza kategorii powyżej",
          },
          { name: "featured", label: "Wyróżnione", type: "boolean" },
        ] as TinaField[],
        ui: { itemProps: (item) => ({ label: item?.question }) },
      },
      { name: "ctaText", label: "Tekst nad CTA", type: "string" },
      { name: "ctaPrimary", label: "CTA główne", type: "object", fields: ctaFields },
      { name: "ctaSecondary", label: "CTA drugie", type: "object", fields: ctaFields },
    ] as TinaField[],
  },
  {
    name: "qa",
    label: "Pytania i odpowiedzi (płaskie)",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      {
        name: "items",
        label: "Pytania",
        type: "object",
        list: true,
        fields: [
          { name: "question", label: "Pytanie", type: "string", required: true },
          { name: "answer", label: "Odpowiedź", type: "string", ui: { component: "textarea" } },
        ] as TinaField[],
        ui: { itemProps: (item) => ({ label: item?.question }) },
      },
    ] as TinaField[],
  },
  {
    name: "cta",
    label: "Wezwanie do działania",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      { name: "text", label: "Tekst", type: "string", ui: { component: "textarea" } },
      { name: "primaryCta", label: "CTA główne", type: "object", fields: ctaFields },
      { name: "secondaryCta", label: "CTA drugie", type: "object", fields: ctaFields },
      { name: "infoItems", label: "Elementy info", type: "string", list: true },
      { name: "trustItems", label: "Elementy zaufania", type: "string", list: true },
    ] as TinaField[],
  },
  {
    name: "stats",
    label: "Statystyki",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      {
        name: "items",
        label: "Statystyki",
        type: "object",
        list: true,
        fields: [
          { name: "value", label: "Wartość", type: "string", required: true },
          { name: "label", label: "Etykieta", type: "string", required: true },
        ] as TinaField[],
        ui: { itemProps: (item) => ({ label: `${item?.value ?? ""} ${item?.label ?? ""}` }) },
      },
    ] as TinaField[],
  },
  {
    name: "listGrid",
    label: "Lista obszarów/elementów",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      { name: "subtext", label: "Podtekst", type: "string", ui: { component: "textarea" } },
      { name: "entries", label: "Elementy", type: "string", list: true },
      { name: "note", label: "Notka", type: "string", ui: { component: "textarea" } },
    ] as TinaField[],
  },
  {
    name: "richText",
    label: "Blok tekstu (proza)",
    fields: [
      { name: "heading", label: "Nagłówek", type: "string", required: true },
      {
        name: "content",
        label: "Treść",
        type: "string",
        ui: { component: "textarea" },
        description: "Markdown lub HTML",
      },
    ] as TinaField[],
  },
  {
    name: "contactPanel",
    label: "Panel kontaktowy + formularz",
    fields: [
      { name: "infoHeading", label: "Nagłówek info", type: "string" },
      {
        name: "contacts",
        label: "Informacje kontaktowe",
        type: "object",
        list: true,
        fields: [
          { name: "icon", label: "Ikona", type: "string" },
          { name: "title", label: "Tytuł", type: "string", required: true },
          { name: "text", label: "Tekst", type: "string" },
          { name: "note", label: "Notka", type: "string" },
          { name: "href", label: "Link (opcjonalnie)", type: "string" },
        ] as TinaField[],
        ui: { itemProps: (item) => ({ label: item?.title }) },
      },
      { name: "prepTitle", label: "Tytuł „przygotuj”", type: "string" },
      { name: "prepItems", label: "Punkty „przygotuj”", type: "string", list: true },
      { name: "formHeading", label: "Nagłówek formularza", type: "string" },
    ] as TinaField[],
  },
];

const authorFields: TinaField[] = [
  {
    name: "name",
    label: "Imię i nazwisko / zespół",
    type: "string",
    required: true,
  },
  { name: "role", label: "Rola / stanowisko", type: "string" },
  {
    name: "bio",
    label: "Biografia",
    type: "string",
    ui: { component: "textarea" },
  },
  { name: "avatar", label: "Avatar", type: "image" },
  { name: "email", label: "E-mail", type: "string" },
  { name: "website", label: "Strona www", type: "string" },
  { name: "linkedin", label: "LinkedIn", type: "string" },
  { name: "twitter", label: "Twitter / X", type: "string" },
];

export default defineConfig({
  branch,
  // Optional: set NEXT_PUBLIC_TINA_CLIENT_ID + TINA_TOKEN to use TinaCloud.
  // Without them, TinaCMS runs fully locally via `tinacms dev` (git-based).
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Artykuły bloga",
        path: "content/posts",
        format: "md",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename.replace(/\.md$/, "")}`,
        },
        defaultItem: () => ({
          publishDate: new Date().toISOString(),
          readTime: 5,
          featured: false,
        }),
        fields: [
          {
            name: "title",
            label: "Tytuł",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "slug",
            label: "Slug (URL)",
            type: "string",
            required: true,
            description: "Adres URL artykułu: /blog/<slug>",
          },
          {
            name: "excerpt",
            label: "Zajawka",
            type: "string",
            ui: { component: "textarea" },
            required: true,
            description: "Krótki opis artykułu (wyświetlany na liście)",
          },
          {
            name: "publishDate",
            label: "Data publikacji",
            type: "datetime",
            required: true,
          },
          {
            name: "readTime",
            label: "Czas czytania (min)",
            type: "number",
            required: true,
          },
          {
            name: "views",
            label: "Wyświetlenia",
            type: "number",
          },
          {
            name: "featured",
            label: "Wyróżniony",
            type: "boolean",
            description: "Artykuł wyróżniony (wyświetlany na górze)",
          },
          {
            name: "featuredImage",
            label: "Obraz wyróżniający",
            type: "object",
            fields: imageFields,
          },
          {
            name: "gallery",
            label: "Galeria zdjęć",
            type: "object",
            list: true,
            fields: imageFields,
            ui: {
              itemProps: (item) => ({ label: item?.alt || "Zdjęcie" }),
            },
          },
          {
            name: "category",
            label: "Kategoria",
            type: "reference",
            collections: ["category"],
            required: true,
          },
          {
            name: "tags",
            label: "Tagi",
            type: "string",
            list: true,
            ui: { component: "tags" },
            description: "Slugi tagów z kolekcji Tagi (np. ikea, montaz)",
          },
          {
            name: "author",
            label: "Autor",
            type: "object",
            required: true,
            fields: authorFields,
          },
          {
            name: "relatedPosts",
            label: "Powiązane artykuły",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.post || "Artykuł" }),
            },
            fields: [
              {
                name: "post",
                label: "Artykuł",
                type: "reference",
                collections: ["post"],
                required: true,
              },
            ],
          },
          {
            name: "faq",
            label: "FAQ",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.question || "Pytanie" }),
            },
            fields: [
              {
                name: "question",
                label: "Pytanie",
                type: "string",
                required: true,
              },
              {
                name: "answer",
                label: "Odpowiedź",
                type: "string",
                ui: { component: "textarea" },
                required: true,
              },
            ],
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: seoFields,
          },
          {
            name: "body",
            label: "Treść",
            type: "rich-text",
            isBody: true,
            description: "Główna treść artykułu",
          },
        ],
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
            required: true,
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
            required: true,
          },
          {
            name: "description",
            label: "Opis",
            type: "string",
            ui: { component: "textarea" },
          },
          {
            name: "color",
            label: "Kolor",
            type: "string",
            ui: { component: "color" },
            description: "Kolor kategorii (hex)",
          },
          {
            name: "icon",
            label: "Ikona",
            type: "string",
            description: "Nazwa ikony (opcjonalnie)",
          },
          {
            name: "order",
            label: "Kolejność",
            type: "number",
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: seoFields,
          },
        ],
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
            required: true,
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
            required: true,
          },
          {
            name: "color",
            label: "Kolor",
            type: "string",
            ui: { component: "color" },
          },
        ],
      },
      {
        name: "gallery",
        label: "Galeria portfolio",
        path: "content/gallery",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/portfolio",
        },
        fields: [
          {
            name: "images",
            label: "Zdjęcia galerii",
            type: "object",
            list: true,
            fields: imageFields,
            ui: {
              itemProps: (item) => ({ label: item?.alt || item?.src || "Zdjęcie" }),
            },
          },
          {
            name: "featuredImages",
            label: "Zdjęcia wyróżnione",
            type: "object",
            list: true,
            fields: imageFields,
            description: "Zdjęcia pokazywane na stronie głównej",
            ui: {
              itemProps: (item) => ({ label: item?.alt || item?.src || "Zdjęcie" }),
            },
          },
        ],
      },
      {
        name: "page",
        label: "Podstrony",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => {
            const { route } = document as { route?: string };
            return route && route.startsWith("/") ? route : `/${route || document._sys.filename}`;
          },
        },
        fields: [
          {
            name: "title",
            label: "Tytuł strony",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "route",
            label: "Adres URL",
            type: "string",
            required: true,
            description: "Ścieżka strony, np. /o-nas (dla strony głównej: /)",
          },
          {
            name: "sections",
            label: "Sekcje strony",
            type: "object",
            list: true,
            templates: pageSectionTemplates,
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: seoFields,
          },
          {
            name: "body",
            label: "Treść strony",
            type: "rich-text",
            isBody: true,
            description: "Główna treść (strony informacyjne/prawne)",
          },
        ],
      },
    ],
  },
});
