import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackToTop from "@/components/ui/BackToTop";
import { getSiteUrl } from "@/lib/env";
import { COMPANY_DATA } from "@/lib/company-data";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Regulamin usług montażu mebli 2025 | SkładaMy Słupsk – IKEA, PAX, kuchnie",
  description: "Aktualny (2025) regulamin świadczenia usług montażu mebli IKEA i innych marek – SkładaMy Słupsk. Warunki współpracy, gwarancja 12 miesięcy, reklamacje, odpowiedzialność, RODO.",
  keywords: [
    "regulamin montaż mebli Słupsk",
    "regulamin montaż IKEA 2025",
    "warunki usługi montażu mebli",
    "gwarancja montażu mebli PAX",
    "reklamacje montaż mebli",
    "odpowiedzialność montaż mebli",
    "SkładaMy regulamin",
    "montaż kuchni IKEA Słupsk"
  ],
  authors: [{ name: "SkładaMy" }],
  alternates: { canonical: `${siteUrl}/regulamin` },
  openGraph: {
    title: "Regulamin usług montażu mebli 2025 | SkładaMy Słupsk",
    description: "Warunki współpracy z firmą montażową SkładaMy: zakres usług, gwarancja 12 miesięcy, reklamacje, RODO, odpowiedzialność – aktualizacja 2025.",
    type: "website",
    url: `${siteUrl}/regulamin`,
    siteName: "SkładaMy"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  other: {
    "geo.region": "PL-PM",
    "geo.placename": "Słupsk",
    "geo.position": "54.4648;17.0287",
    ICBM: "54.4648, 17.0287"
  }
};

/* eslint-disable max-lines-per-function */
export default function TermsPage() {
  const sections = [
    { id: "postanowienia-ogolne", title: "§1 Postanowienia ogólne", keywords: "zakres usług, kontakt, Słupsk" },
    { id: "zakres-uslug", title: "§2 Zakres usług montażowych", keywords: "IKEA, PAX, montaż mebli" },
    { id: "zamawianie-uslug", title: "§3 Zamawianie usług i wyceny", keywords: "wycena, terminy, kontakt" },
    { id: "realizacja-uslug", title: "§4 Realizacja usług", keywords: "montaż, warunki pracy" },
    { id: "platnosci", title: "§5 Płatności", keywords: "ceny, faktura, płatność" },
    { id: "gwarancja", title: "§6 Gwarancja jakości montażu", keywords: "12 miesięcy, gwarancja, jakość" },
    { id: "odpowiedzialnosc", title: "§7 Odpowiedzialność", keywords: "ubezpieczenie, szkody" },
    { id: "reklamacje", title: "§8 Reklamacje", keywords: "zgłoszenia, procedury" },
    { id: "rodo", title: "§9 Ochrona danych osobowych", keywords: "RODO, dane osobowe" },
    { id: "postanowienia-koncowe", title: "§10 Postanowienia końcowe", keywords: "prawo, zmiany" },
    { id: "kontakt", title: "§11 Kontakt i informacje", keywords: "telefon, email, adres" }
  ];

  const regulaminStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Regulamin usług montażu mebli – SkładaMy Słupsk (2025)",
    description: "Aktualny regulamin świadczenia usług montażu mebli (IKEA, PAX, kuchnie) – warunki współpracy, gwarancja, reklamacje, odpowiedzialność, RODO.",
    url: `${siteUrl}/regulamin`,
    inLanguage: "pl-PL",
    dateModified: new Date().toISOString(),
    isPartOf: { "@type": "WebSite", name: COMPANY_DATA.name, url: siteUrl },
    mainEntity: {
      "@type": "LegalDocument",
      name: "Regulamin świadczenia usług montażu mebli SkładaMy",
      description: "Dokument określający zasady świadczenia usług montażu mebli dla klientów w regionie Słupska.",
      dateModified: new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: COMPANY_DATA.name,
        url: COMPANY_DATA.website,
        address: { "@type": "PostalAddress", addressLocality: COMPANY_DATA.address.city, addressCountry: "PL" }
      },
      publisher: { "@type": "Organization", name: COMPANY_DATA.name, url: COMPANY_DATA.website },
      about: [
        { "@type": "Service", name: "Montaż mebli IKEA", provider: { "@type": "Organization", name: COMPANY_DATA.name } },
        { "@type": "Service", name: "Montaż szaf PAX", provider: { "@type": "Organization", name: COMPANY_DATA.name } },
        { "@type": "Service", name: "Montaż kuchni IKEA", provider: { "@type": "Organization", name: COMPANY_DATA.name } }
      ],
      legislationApplies: "Kodeks cywilny; Ustawa o prawach konsumenta; Ustawa o świadczeniu usług drogą elektroniczną; RODO"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Regulamin", item: `${siteUrl}/regulamin` }
      ]
    },
    hasPart: sections.map((s, i) => ({ "@type": "WebPageElement", position: i + 1, name: s.title, url: `${siteUrl}/regulamin#${s.id}` })),
    significantLink: sections.map(section => `${siteUrl}/regulamin#${section.id}`),
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: COMPANY_DATA.email, telephone: COMPANY_DATA.phone, areaServed: "PL", availableLanguage: ["pl"] }],
    publisher: { "@type": "Organization", name: COMPANY_DATA.name, url: COMPANY_DATA.website },
    keywords: (Array.isArray(metadata.keywords) ? metadata.keywords : (metadata.keywords || "")).toString()
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(regulaminStructuredData) }}
      />
      <Header />
      <main id="top" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
              Regulamin świadczenia usług montażu mebli IKEA
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              SkładaMy - Profesjonalny montaż mebli w Słupsku i okolicach
            </p>
            <p className="text-muted-foreground mb-8">
              Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            
            {/* Spis treści z anchor linkami */}
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
            <Card id="postanowienia-ogolne">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §1 Postanowienia ogólne
                  <a href="#postanowienia-ogolne" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. Niniejszy regulamin określa zasady świadczenia usług montażu mebli przez 
                  SkładaMy (dalej: &quot;Usługodawca&quot;, &quot;Firma&quot;).
                </p>
                <p className="text-muted-foreground text-sm">
                  2. Firma specjalizuje się w profesjonalnym montażu mebli wszystkich marek, 
                  ze szczególnym uwzględnieniem mebli IKEA, w Słupsku i okolicach.
                </p>
                <p className="text-muted-foreground text-sm">
                  3. Kontakt z Usługodawcą możliwy jest poprzez:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• <strong>E-mail:</strong> {COMPANY_DATA.email}</li>
                  <li>• <strong>Telefon:</strong> {COMPANY_DATA.phone} (codziennie 8:00-20:00)</li>
                  <li>• <strong>Formularz kontaktowy:</strong> {COMPANY_DATA.website}</li>
                  <li>• <strong>Obszar działania:</strong> Słupsk i okolice (promień 50 km)</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  4. Akceptacja niniejszego regulaminu następuje z chwilą złożenia zamówienia 
                  na usługi montażu mebli. W przypadku pytań zapoznaj się z naszym 
                  <Link href="/#faq" className="text-primary hover:underline ml-1">działem FAQ</Link> 
                  lub skontaktuj się bezpośrednio.
                </p>
              </CardContent>
            </Card>

            <Card id="zakres-uslug">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §2 Zakres usług montażowych
                  <a href="#zakres-uslug" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. Usługodawca świadczy profesjonalne usługi montażu mebli obejmujące:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• <strong>Montaż mebli IKEA:</strong> szafy PAX, kuchnie, łóżka, komody, regały BILLY</li>
                  <li>• <strong>Składanie mebli innych marek:</strong> Black Red White, Agata Meble, Jysk</li>
                  <li>• <strong>Montaż mebli łazienkowych:</strong> szafki, lustrzane fronty, oświetlenie</li>
                  <li>• <strong>Instalacja mebli kuchennych:</strong> szafki, blaty, zlewozmywaki</li>
                  <li>• <strong>Montaż systemów przechowywania:</strong> szafy wnękowe, garderoby</li>
                  <li>• <strong>Wieszanie elementów ściennych:</strong> półki, uchwyty TV, lustra</li>
                  <li>• <strong>Kotwienie mebli:</strong> zabezpieczenie antyporadowe, mocowanie do ściany</li>
                  <li>• <strong>Regulacja i dokręcanie:</strong> zawiasów, szuflad, drzwiczek</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  2. Wycena każdego zlecenia jest indywidualna i zależy od:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Rodzaju i ilości mebli do montażu</li>
                  <li>• Stopnia skomplikowania instalacji</li>
                  <li>• Lokalizacji (Słupsk centrum - bez dopłaty, okolice - dojazd wliczony)</li>
                  <li>• Dodatkowych usług (wywóz opakowań, sprzątanie)</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  3. Usługodawca <strong>nie wykonuje</strong> instalacji wykraczających poza standardowy 
                  montaż mebli:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Prace elektryczne wymagające uprawnień SEP</li>
                  <li>• Instalacje hydrauliczne i gazowe</li>
                  <li>• Prace budowlane (kucie, tynkowanie, malowanie)</li>
                  <li>• Montaż AGD wymagający specjalistycznej instalacji</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="zamawianie-uslug">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §3 Zamawianie usług i wyceny
                  <a href="#zamawianie-uslug" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. Zamówienia na montaż mebli przyjmowane są:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• <strong>Telefonicznie:</strong> {COMPANY_DATA.phone} (8:00-20:00, 7 dni w tygodniu)</li>
                  <li>• <strong>Online:</strong> formularz kontaktowy na {COMPANY_DATA.website}</li>
                  <li>• <strong>E-mail:</strong> {COMPANY_DATA.email} (odpowiedź do 24h)</li>
                  <li>• <strong>Wizyta w domu:</strong> wycena na miejscu (Słupsk i okolice)</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  2. <strong>Bezpłatna wycena</strong> obejmuje:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Konsultację telefoniczną lub mailową</li>
                  <li>• Wyczerpującą informację o kosztach montażu</li>
                  <li>• Oszacowanie czasu pracy</li>
                  <li>• Ustalenie terminu realizacji</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  3. Wycena może ulec zmianie gdy:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Stan mebli nie odpowiada opisowi klienta</li>
                  <li>• Brakuje elementów lub instrukcji montażu</li>
                  <li>• Wymagane są dodatkowe prace (kotwienie, regulacja)</li>
                  <li>• Warunki montażu różnią się od uzgodnionych</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  4. <strong>Terminy montażu:</strong> standardowo 1-3 dni robocze w Słupsku, 
                  pilne zlecenia możliwe tego samego dnia (dopłata 20%). Zobacz więcej o naszej 
                  <Link href="/o-nas" className="text-primary hover:underline">firmie i doświadczeniu</Link>.
                </p>
              </CardContent>
            </Card>

            <Card id="realizacja-uslug">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §4 Realizacja usług
                  <a href="#realizacja-uslug" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. Termin realizacji ustalany jest indywidualnie z każdym Klientem.
                </p>
                <p className="text-muted-foreground text-sm">
                  2. Usługodawca dołoży wszelkich starań, aby dotrzymać ustalonego terminu.
                </p>
                <p className="text-muted-foreground text-sm">
                  3. Klient zobowiązany jest do:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Zapewnienia dostępu do miejsca montażu</li>
                  <li>• Przygotowania przestrzeni roboczej</li>
                  <li>• Zapewnienia kompletności mebli i akcesoriów</li>
                  <li>• Obecności podczas montażu lub wyznaczenia osoby upoważnionej</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  4. Usługodawca ma prawo odmówić wykonania usługi w przypadku:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Braku bezpiecznych warunków pracy</li>
                  <li>• Niekompletności mebli lub instrukcji</li>
                  <li>• Niemożności technicznych (np. zbyt małe pomieszczenie)</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="platnosci">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §5 Płatności
                  <a href="#platnosci" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. Płatność za usługi następuje po ich wykonaniu.
                </p>
                <p className="text-muted-foreground text-sm">
                  2. Akceptowane formy płatności:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Gotówka</li>
                  <li>• Przelew bankowy</li>
                  <li>• Płatność kartą (na życzenie Klienta)</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  3. Faktura VAT wystawiana jest na życzenie Klienta.
                </p>
                <p className="text-muted-foreground text-sm">
                  4. W przypadku płatności przelewem, termin płatności wynosi 7 dni od daty wystawienia faktury.
                </p>
              </CardContent>
            </Card>

            <Card id="gwarancja">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §6 Gwarancja jakości montażu
                  <a href="#gwarancja" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. <strong>Gwarancja montażu:</strong> Usługodawca udziela 12-miesięcznej gwarancji 
                  na jakość wykonanego montażu mebli.
                </p>
                <p className="text-muted-foreground text-sm">
                  2. <strong>Zakres gwarancji obejmuje:</strong>
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Poprawność montażu zgodnie z instrukcją producenta</li>
                  <li>• Stabilność konstrukcji i bezpieczeństwo użytkowania</li>
                  <li>• Prawidłowe funkcjonowanie mechanizmów (szuflady, zawiasy, prowadnice)</li>
                  <li>• Dokręcenie elementów złącznych</li>
                  <li>• Poziomowanie i regulację mebli</li>
                  <li>• Bezpłatną naprawę defektów wynikających z błędów montażu</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  3. <strong>Gwarancja dodatkowa na kotwienia:</strong> 24 miesiące gwarancji 
                  na mocowanie mebli do ściany i instalacje antyporadowe.
                </p>
                <p className="text-muted-foreground text-sm">
                  4. <strong>Wyłączenia gwarancji:</strong>
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Uszkodzenia mechaniczne powstałe po odbiorze prac</li>
                  <li>• Wady materiałowe elementów dostarczonych przez klienta</li>
                  <li>• Skutki nieprawidłowego użytkowania lub przeładowania</li>
                  <li>• Modyfikacje dokonane przez osoby nieupoważnione</li>
                  <li>• Uszkodzenia spowodowane działaniem sił zewnętrznych</li>
                  <li>• Naturalne zużycie eksploatacyjne po roku użytkowania</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  5. <strong>Procedura gwarancyjna:</strong> Zgłoszenia przyjmowane telefonicznie lub 
                  mailowo, czas realizacji: do 7 dni roboczych od zgłoszenia. 
                  Szczegóły procedury reklamacyjnej znajdziesz w <a href="#reklamacje" className="text-primary hover:underline">§8 Reklamacje</a>.
                </p>
              </CardContent>
            </Card>

            <Card id="odpowiedzialnosc">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §7 Odpowiedzialność
                  <a href="#odpowiedzialnosc" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. Usługodawca posiada ubezpieczenie odpowiedzialności cywilnej na kwotę 100 000 zł.
                </p>
                <p className="text-muted-foreground text-sm">
                  2. Odpowiedzialność Usługodawcy ograniczona jest do wysokości szkody, 
                  nie więcej jednak niż wartość wykonanej usługi.
                </p>
                <p className="text-muted-foreground text-sm">
                  3. Usługodawca nie ponosi odpowiedzialności za:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Wady ukryte w elementach dostarczonych przez Klienta</li>
                  <li>• Szkody wynikające z nieprzestrzegania zaleceń Usługodawcy</li>
                  <li>• Utratę zysków lub szkody pośrednie</li>
                  <li>• Opóźnienia wynikające z przyczyn niezależnych od Usługodawcy</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="reklamacje">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §8 Reklamacje
                  <a href="#reklamacje" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. Reklamacje można zgłaszać:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Telefonicznie: {COMPANY_DATA.phone}</li>
                  <li>• E-mail: {COMPANY_DATA.email}</li>
                  <li>• Listownie na adres siedziby</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  2. Reklamacja powinna zawierać:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                  <li>• Dane kontaktowe Klienta</li>
                  <li>• Datę wykonania usługi</li>
                  <li>• Opis problemu</li>
                  <li>• Oczekiwany sposób rozpatrzenia reklamacji</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  3. Reklamacje rozpatrywane są w terminie do 14 dni roboczych.
                </p>
                <p className="text-muted-foreground text-sm">
                  4. Odpowiedź na reklamację przekazywana jest w formie pisemnej lub elektronicznej.
                </p>
              </CardContent>
            </Card>

            <Card id="rodo">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §9 Ochrona danych osobowych (RODO)
                  <a href="#rodo" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. <strong>Administrator danych:</strong> {COMPANY_DATA.fullName}, kontakt: {COMPANY_DATA.email}
                </p>
                <p className="text-muted-foreground text-sm">
                  2. <strong>Cel przetwarzania:</strong> realizacja usług montażu mebli, kontakt z klientem, 
                  wystawienie dokumentów księgowych.
                </p>
                <p className="text-muted-foreground text-sm">
                  3. <strong>Podstawa prawna:</strong> wykonanie umowy, realizacja obowiązków prawnych, 
                  uzasadniony interes administratora.
                </p>
                <p className="text-muted-foreground text-sm">
                  4. <strong>Zakres danych:</strong> imię, nazwisko, adres, telefon, e-mail, 
                  dane do faktury (w przypadku firm: NIP, REGON).
                </p>
                <p className="text-muted-foreground text-sm">
                  5. <strong>Okres przechowywania:</strong> przez czas realizacji usługi oraz 
                  przez okres wymagany prawem (rachunkowość: 5 lat).
                </p>
                <p className="text-muted-foreground text-sm">
                  6. <strong>Prawa klienta:</strong> dostęp, sprostowanie, usunięcie, ograniczenie, 
                  przenośność danych, sprzeciw, cofnięcie zgody. Szczegółowe informacje znajdziesz w naszej 
                  <Link href="/polityka-prywatnosci" className="text-primary hover:underline ml-1">Polityce prywatności</Link>.
                </p>
              </CardContent>
            </Card>

            <Card id="postanowienia-koncowe">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §10 Postanowienia końcowe
                  <a href="#postanowienia-koncowe" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. W sprawach nieuregulowanych niniejszym regulaminem stosuje się przepisy 
                  Kodeksu cywilnego oraz innych właściwych ustaw.
                </p>
                <p className="text-muted-foreground text-sm">
                  2. <strong>Rozstrzyganie sporów:</strong> strony będą dążyć do polubownego 
                  rozwiązania sporów. W przypadku braku porozumienia właściwy jest sąd dla 
                  miejsca wykonywania usługi.
                </p>
                <p className="text-muted-foreground text-sm">
                  3. <strong>Zmiany regulaminu:</strong> Usługodawca może zmieniać regulamin 
                  z 14-dniowym wyprzedzeniem. Zmiany publikowane są na stronie {COMPANY_DATA.website}.
                </p>
                <p className="text-muted-foreground text-sm">
                  4. <strong>Klauzula salvatoria:</strong> w przypadku nieważności któregokolwiek 
                  z postanowień, pozostałe zachowują moc obowiązującą.
                </p>
                <p className="text-muted-foreground text-sm">
                  5. Regulamin wchodzi w życie z dniem publikacji i ma zastosowanie do 
                  wszystkich zleceń złożonych po tej dacie.
                </p>
              </CardContent>
            </Card>

            <Card id="kontakt">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §11 Kontakt i informacje
                  <a href="#kontakt" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do tego paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-muted-foreground text-sm font-medium mb-2">
                    Wszelkie pytania dotyczące regulaminu i usług kieruj na:
                  </p>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• <strong>Telefon:</strong> {COMPANY_DATA.phone}</li>
                    <li>• <strong>E-mail:</strong> {COMPANY_DATA.email}</li>
                    <li>• <strong>Strona WWW:</strong> {COMPANY_DATA.website}</li>
                    <li>• <strong>Obszar działania:</strong> Słupsk i okolice</li>
                  </ul>
                </div>
                <p className="text-muted-foreground text-sm">
                  Aktualny regulamin dostępny jest pod adresem: 
                  <Link href={`${siteUrl}/regulamin`} className="text-primary hover:underline ml-1">
                    {siteUrl}/regulamin
                  </Link>
                </p>
                <div className="text-center mt-6">
                  <BackToTop />
                </div>
                <p className="text-muted-foreground text-xs text-center mt-6 pt-4 border-t border-border">
                  Ostatnia aktualizacja regulaminu: {new Date().toLocaleDateString('pl-PL')} | 
                  <Link href="/" className="text-primary hover:underline mx-1">SkładaMy</Link> - 
                  Profesjonalny montaż mebli IKEA w Słupsku | 
                  <Link href="/#uslugi" className="text-primary hover:underline mx-1">Nasze usługi</Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
