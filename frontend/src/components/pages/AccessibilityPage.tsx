import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import BackToTop from "@/components/ui/BackToTop";
import { COMPANY_DATA, formatPhoneForDisplay, formatPhoneForTel, getSiteUrl } from "@/lib/config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Deklaracja dostępności 2025 | SkładaMy",
  description:
    "Deklaracja dostępności cyfrowej SkładaMy Słupsk (2025). Informacje o dostępności strony WWW, alternatywnych formach kontaktu, ułatwieniach oraz zgłaszaniu problemów.",
  keywords: [
    "deklaracja dostępności SkładaMy",
    "dostępność cyfrowa Słupsk",
    "WCAG 2.1 AA",
    "dostępność strony internetowej",
    "zgłaszanie problemów z dostępnością",
    "kontakt alternatywny dostępność",
  ],
  authors: [{ name: "SkładaMy" }],
  alternates: { canonical: `${siteUrl}/deklaracja-dostepnosci` },
  openGraph: {
    title: "Deklaracja dostępności – SkładaMy Słupsk",
    description:
      "Informacje o dostępności serwisu i usług SkładaMy. Jak zgłosić bariery i uzyskać pomoc alternatywnymi kanałami.",
    type: "website",
    url: `${siteUrl}/deklaracja-dostepnosci`,
    siteName: "SkładaMy",
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
  other: {
    "geo.region": "PL-PM",
    "geo.placename": "Słupsk",
    "geo.position": "54.4648;17.0287",
    ICBM: "54.4648, 17.0287",
  },
};

export default function AccessibilityPage() {
  const sections = [
    { id: "status-zgodnosci", title: "Status zgodności", keywords: "WCAG 2.1 AA, testy, ocena" },
    {
      id: "elementy-ulatwiajace",
      title: "Elementy ułatwiające dostępność",
      keywords: "nawigacja klawiaturą, kontrast, focus",
    },
    {
      id: "tresc-niedostepna",
      title: "Treści niedostępne i wyłączenia",
      keywords: "niedostępne elementy, koszty nieproporcjonalne",
    },
    {
      id: "zglaszanie-problemow",
      title: "Zgłaszanie problemów i wnioski",
      keywords: "kontakt, alternatywne kanały",
    },
    {
      id: "dane-kontaktowe",
      title: "Dane kontaktowe i procedura",
      keywords: "telefon, e-mail, termin odpowiedzi",
    },
  ];

  const a11yStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Deklaracja dostępności – SkładaMy",
    description:
      "Deklaracja dostępności cyfrowej serwisu SkładaMy i oferowanych usług. Informacje o ułatwieniach, niedostępnościach i zgłaszaniu barier.",
    url: `${siteUrl}/deklaracja-dostepnosci`,
    inLanguage: "pl-PL",
    dateModified: new Date().toISOString(),
    isPartOf: { "@type": "WebSite", name: "SkładaMy", url: siteUrl },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Deklaracja dostępności",
          item: `${siteUrl}/deklaracja-dostepnosci`,
        },
      ],
    },
    publisher: { "@type": "Organization", name: COMPANY_DATA.fullName, url: COMPANY_DATA.website },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "accessibility",
        email: COMPANY_DATA.email,
        telephone: COMPANY_DATA.phone,
        areaServed: "PL",
        availableLanguage: ["pl"],
      },
    ],
    keywords: Array.isArray(sections)
      ? sections.map((s) => s.title).join(", ")
      : "Deklaracja dostępności",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(a11yStructuredData) }}
      />
      <Header />
      <main id="top" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
              Deklaracja dostępności
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              SkładaMy – profesjonalny montaż mebli w Słupsku i okolicach
            </p>
            <p className="text-muted-foreground mb-8">
              Ostatnia aktualizacja:{" "}
              {new Date().toLocaleDateString("pl-PL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="bg-muted/50 p-6 rounded-lg mb-12 max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Spis treści</h2>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-left text-muted-foreground hover:text-primary hover:underline transition-colors p-2 rounded hover:bg-background/50"
                    title={`Przejdź do sekcji: ${section.title} - ${section.keywords}`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="space-y-8">
            <Card id="status-zgodnosci">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  Status zgodności
                  <a
                    href="#status-zgodnosci"
                    className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Link do sekcji"
                  >
                    #
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground text-sm">
                <p>
                  Serwis <strong>skladamy.pl</strong> jest częściowo zgodny z wytycznymi{" "}
                  <strong>WCAG 2.1 na poziomie AA</strong> z powodu wymienionych poniżej
                  niezgodności.
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    Niektóre obrazy w starszych wpisach bloga mogą nie posiadać pełnych opisów
                    alternatywnych.
                  </li>
                  <li>
                    Elementy zewnętrznych osadzeń (mapy, wideo) mogą mieć ograniczoną dostępność.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card id="elementy-ulatwiajace">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  Elementy ułatwiające dostępność
                  <a
                    href="#elementy-ulatwiajace"
                    className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Link do sekcji"
                  >
                    #
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground text-sm">
                <ul className="list-disc ml-6 space-y-1">
                  <li>Nawigacja klawiaturą i widoczne stany focus.</li>
                  <li>Kontrast tekstu dostosowany do jasnego tła i brandu.</li>
                  <li>Responsywny layout i skalowanie fontów.</li>
                  <li>Teksty linków zrozumiałe poza kontekstem (gdzie możliwe).</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="tresc-niedostepna">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  Treści niedostępne i uzasadnione wyłączenia
                  <a
                    href="#tresc-niedostepna"
                    className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Link do sekcji"
                  >
                    #
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground text-sm">
                <p>
                  Niektóre treści pochodzą z systemów zewnętrznych (np. CMS). Ich pełne dostosowanie
                  może generować <strong>nieproporcjonalnie wysokie koszty</strong> w stosunku do
                  efektu.
                </p>
              </CardContent>
            </Card>

            <Card id="zglaszanie-problemow">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  Zgłaszanie problemów i wnioski
                  <a
                    href="#zglaszanie-problemow"
                    className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Link do sekcji"
                  >
                    #
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground text-sm">
                <p>
                  Jeśli napotkasz barierę w korzystaniu z serwisu lub potrzebujesz treści w
                  alternatywnym formacie, skontaktuj się z nami:
                </p>
                <ul className="ml-6 space-y-1">
                  <li>
                    📧 E-mail:{" "}
                    <a
                      href={`mailto:${COMPANY_DATA.email}`}
                      className="text-primary hover:underline"
                    >
                      {COMPANY_DATA.email}
                    </a>
                  </li>
                  <li>
                    ☎️ Telefon:{" "}
                    <a href={`tel:${formatPhoneForTel()}`} className="text-primary hover:underline">
                      {formatPhoneForDisplay()}
                    </a>{" "}
                    (pn-nd {COMPANY_DATA.businessHours.weekdays})
                  </li>
                </ul>
                <p>
                  Postaramy się odpowiedzieć w ciągu <strong>7 dni roboczych</strong>. Jeśli sprawa
                  wymaga dłuższego czasu, poinformujemy o nowym terminie.
                </p>
              </CardContent>
            </Card>

            <Card id="dane-kontaktowe">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  Dane kontaktowe i procedura odwoławcza
                  <a
                    href="#dane-kontaktowe"
                    className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Link do sekcji"
                  >
                    #
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground text-sm">
                <p>
                  W przypadku braku satysfakcjonującej odpowiedzi możesz skontaktować się z{" "}
                  <strong>Rzecznikiem Praw Obywatelskich</strong> lub właściwym organem nadzorczym.
                </p>
                <p>
                  Nasze dane: {COMPANY_DATA.fullName}, {COMPANY_DATA.address.city},{" "}
                  {COMPANY_DATA.address.region}, Polska.
                </p>
              </CardContent>
            </Card>
          </div>

          <BackToTop />
        </div>
      </main>
      <StickyCTA />
      <Footer />
    </>
  );
}
