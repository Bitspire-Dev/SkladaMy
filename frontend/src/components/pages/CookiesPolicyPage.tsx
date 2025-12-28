import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackToTop from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "Polityka cookies 2025 | SkładaMy Słupsk – Pliki cookie i preferencje prywatności",
  description: "Polityka plików cookies SkładaMy (Słupsk). Jak wykorzystujemy niezbędne, analityczne i marketingowe cookies. Zasady przechowywania, zarządzania i zmiany zgody.",
  keywords: [
    "polityka cookies Słupsk",
    "cookies montaż mebli",
    "preferencje prywatności",
    "zarządzanie zgodą cookies",
    "anonimowa analityka",
    "pliki cookie RODO",
    "SkładaMy cookies"
  ],
  alternates: { canonical: "https://skladamy.pl/polityka-cookies" },
  openGraph: {
    title: "Polityka cookies 2025 | SkładaMy",
    description: "Poznaj zasady dotyczące plików cookies – rodzaje, cele, zarządzanie zgodą, bezpieczeństwo.",
    type: "website",
    url: "https://skladamy.pl/polityka-cookies",
    siteName: "SkładaMy"
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "PL-PM",
    "geo.placename": "Słupsk",
    "geo.position": "54.4648;17.0287",
    ICBM: "54.4648, 17.0287"
  }
};

export default function CookiesPolicyPage() {
  const sections = [
    { id: "wstep", title: "§1 Wstęp i zakres" },
    { id: "rodzaje", title: "§2 Rodzaje wykorzystywanych plików cookies" },
    { id: "cele", title: "§3 Cele stosowania" },
    { id: "podstawy", title: "§4 Podstawy prawne" },
    { id: "zarzadzanie", title: "§5 Zarządzanie zgodą i preferencjami" },
    { id: "retencja", title: "§6 Okres przechowywania i bezpieczeństwo" },
    { id: "zmiany", title: "§7 Aktualizacje dokumentu" },
    { id: "kontakt", title: "§8 Kontakt" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Polityka cookies SkładaMy",
    description: "Zasady dotyczące plików cookies stosowanych na stronie SkładaMy – rodzaje, cele, zarządzanie zgodą użytkownika.",
    url: "https://skladamy.pl/polityka-cookies",
    dateModified: new Date().toISOString(),
    inLanguage: "pl-PL",
    mainEntity: {
      "@type": "LegalDocument",
      name: "Polityka Cookies SkładaMy",
      legislationApplies: "RODO; ePrivacy; Ustawa Prawo telekomunikacyjne",
      dateModified: new Date().toISOString(),
      publisher: { "@type": "Organization", name: "SkładaMy", url: "https://skladamy.pl" }
    },
    hasPart: sections.map((s, i) => ({ "@type": "WebPageElement", position: i + 1, name: s.title, url: `https://skladamy.pl/polityka-cookies#${s.id}` })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://skladamy.pl" },
        { "@type": "ListItem", position: 2, name: "Polityka cookies", item: "https://skladamy.pl/polityka-cookies" }
      ]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main className="py-16" id="top">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-6">Polityka plików cookies (2025)</h1>
            <p className="text-muted-foreground text-lg mb-4">Transparentne zasady wykorzystywania plików cookie w serwisie SkładaMy.</p>
            <p className="text-muted-foreground mb-8">Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="bg-muted/50 p-6 rounded-lg mb-10 max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold mb-4">Spis treści</h2>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className="text-muted-foreground hover:text-primary hover:underline p-2 rounded hover:bg-background/50">{s.title}</a>
                ))}
              </nav>
            </div>
          </div>

          <div className="space-y-8">
            <Card id="wstep">
              <CardHeader><CardTitle className="group scroll-mt-24">§1 Wstęp i zakres<a href="#wstep" className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-sm">#</a></CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Dokument określa zasady stosowania plików cookies na stronie <strong>skladamy.pl</strong> prowadzonej przez firmę SkładaMy świadczącą usługi montażu mebli w regionie Słupska.</p>
                <p>Polityka cookies jest uzupełnieniem <Link href="/polityka-prywatnosci" className="text-primary hover:underline">Polityki prywatności</Link> i należy ją czytać łącznie.</p>
              </CardContent>
            </Card>

            <Card id="rodzaje">
              <CardHeader><CardTitle className="group scroll-mt-24">§2 Rodzaje wykorzystywanych plików cookies<a href="#rodzaje" className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-sm">#</a></CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <ul className="list-disc ml-5 space-y-1">
                  <li><strong>Niezbędne techniczne</strong> – zapewniają podstawowe działanie serwisu (nawigacja, sesyjna pamięć preferencji). Nie wymagają zgody użytkownika.</li>
                  <li><strong>Analityczne (opcjonalne)</strong> – służą do anonimowej agregacji statystyk odwiedzin. Aktywowane wyłącznie po wyrażeniu zgody.</li>
                  <li><strong>Marketingowe (opcjonalne)</strong> – potencjalnie wykorzystywane w przyszłości do personalizacji treści lub kampanii reklamowych; domyślnie wyłączone.</li>
                  <li><strong>Kontener Google Tag Manager</strong> – umożliwia zarządzanie skryptami. Sam kontener nie śledzi użytkownika; tagi analityczne/marketingowe uruchamiane są dopiero po zgodzie.</li>
                </ul>
                <p>Aktualnie (data powyżej) strona może działać wyłącznie w oparciu o cookies niezbędne – brak aktywnych cookies marketingowych bez zgody.</p>
              </CardContent>
            </Card>

            <Card id="cele">
              <CardHeader><CardTitle className="group scroll-mt-24">§3 Cele stosowania<a href="#cele" className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-sm">#</a></CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Główne cele stosowania plików cookies:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Zapewnienie ciągłości sesji i poprawnego wyświetlania komponentów UI.</li>
                  <li>Przechowanie tymczasowych preferencji użytkownika (np. wybory zgód).</li>
                  <li>(Opcjonalnie po zgodzie) agregacja statystyk dotyczących nawigacji.</li>
                  <li>Ładowanie tagów zarządzanych w Google Tag Manager dopiero po uzyskaniu odpowiedniej zgody.</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="podstawy">
              <CardHeader><CardTitle className="group scroll-mt-24">§4 Podstawy prawne<a href="#podstawy" className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-sm">#</a></CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Przetwarzanie danych w ramach cookies opiera się na:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li><strong>Art. 173 i 174 Prawa telekomunikacyjnego</strong> – regulującego zasady przechowywania i uzyskiwania dostępu do informacji.</li>
                  <li><strong>Art. 6 ust. 1 lit. f RODO</strong> (uzasadniony interes) – dla niezbędnych technicznie cookies.</li>
                  <li><strong>Art. 6 ust. 1 lit. a RODO</strong> – zgoda dla analitycznych i marketingowych.</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="zarzadzanie">
              <CardHeader><CardTitle className="group scroll-mt-24">§5 Zarządzanie zgodą i preferencjami<a href="#zarzadzanie" className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-sm">#</a></CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Zgoda zbierana jest poprzez baner wyświetlany przy pierwszej wizycie. Użytkownik może:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Zaakceptować wszystkie kategorie.</li>
                  <li>Odrzucić wszystkie opcjonalne.</li>
                  <li>Wybrać granularnie (Analityczne / Marketingowe).</li>
                </ul>
                <p>Aby zmienić wybór – wyczyść cookies przeglądarki dla domeny <strong>skladamy.pl</strong>; w wersji kolejnej planujemy panel preferencji.</p>
              </CardContent>
            </Card>

            <Card id="retencja">
              <CardHeader><CardTitle className="group scroll-mt-24">§6 Okres przechowywania i bezpieczeństwo<a href="#retencja" className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-sm">#</a></CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Zgoda na cookies opcjonalne przechowywana jest przez 6 miesięcy, po czym system ponownie poprosi o odnowienie wyboru.</p>
                <p>Pliki niezbędne są usuwane po zakończeniu sesji lub krótkim okresie technicznym. Nie stosujemy fingerprintingu ani śledzenia cross-site.</p>
              </CardContent>
            </Card>

            <Card id="zmiany">
              <CardHeader><CardTitle className="group scroll-mt-24">§7 Aktualizacje dokumentu<a href="#zmiany" className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-sm">#</a></CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Polityka może ulec zmianie w przypadku wdrożenia nowych narzędzi analitycznych lub marketingowych. Nowa wersja będzie oznaczona datą aktualizacji i opublikowana w tym samym adresie URL.</p>
              </CardContent>
            </Card>

            <Card id="kontakt">
              <CardHeader><CardTitle className="group scroll-mt-24">§8 Kontakt<a href="#kontakt" className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-sm">#</a></CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>W sprawach dotyczących cookies lub prywatności: <a href="mailto:kontakt@skladamy.pl" className="text-primary hover:underline">kontakt@skladamy.pl</a>, tel. <a href="tel:+48884938490" className="text-primary hover:underline">+48 884 938 490</a>.</p>
                <p>Sprawdź także: <Link href="/polityka-prywatnosci" className="text-primary hover:underline">Polityka prywatności</Link> • <Link href="/regulamin" className="text-primary hover:underline">Regulamin</Link></p>
                <div className="text-center mt-6"><BackToTop /></div>
                <p className="text-muted-foreground text-xs text-center mt-6 pt-4 border-t border-border">Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')} | SkładaMy</p>
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
