import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackToTop from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "Polityka prywatności RODO 2025 | SkładaMy Montaż Mebli Słupsk - Pełna ochrona danych",
  description: "📋 Kompleksowa polityka prywatności SkładaMy (Słupsk, Ustka, Bytów) zgodna z RODO 2025. Dowiedz się jak bezpiecznie przetwarzamy dane przy montażu mebli IKEA i innych marek.",
  keywords: [
    "polityka prywatności Słupsk 2025",
    "RODO montaż mebli IKEA",
    "ochrona danych osobowych Słupsk",
    "bezpieczeństwo danych montaż mebli",
    "przetwarzanie danych klienta",
    "GDPR compliance Pomorskie",
    "prawa RODO klient Słupsk",
    "cookies montaż mebli"
  ],
  authors: [{ name: "SkładaMy" }],
  alternates: { canonical: "https://skladamy.pl/polityka-prywatnosci" },
  openGraph: {
    title: "Polityka prywatności RODO 2025 | SkładaMy - Bezpieczny montaż mebli Słupsk",
    description: "🔒 Jak chronimy Twoje dane w procesie montażu mebli. Transparentność, minimalizacja, bezpieczeństwo i prawa użytkownika.",
    type: "website",
    url: "https://skladamy.pl/polityka-prywatnosci",
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

export default function PolitykaPrywatnosciPage() {
  const sections = [
    { id: "administrator-danych", title: "§1 Administrator danych osobowych", keywords: "administrator RODO, kontakt" },
    { id: "cele-podstawy", title: "§2 Cele i podstawy prawne przetwarzania", keywords: "art. 6 RODO, podstawy" },
    { id: "rodzaje-danych", title: "§3 Kategorie i zakres danych", keywords: "dane osobowe, kategorie" },
    { id: "prawa-rodo", title: "§4 Prawa osób, których dane dotyczą", keywords: "prawa RODO, dostęp, usunięcie" },
    { id: "cookies-analityka", title: "§5 Pliki cookies i analityka", keywords: "cookies, analityka" },
    { id: "bezpieczenstwo", title: "§6 Bezpieczeństwo danych i retencja", keywords: "zabezpieczenia, retencja" },
    { id: "kontakt-rodo", title: "§7 Kontakt w sprawach RODO i skargi", keywords: "kontakt, UODO" }
  ];

  const privacyStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Polityka prywatności RODO 2025 - SkładaMy Słupsk",
    description: "Aktualna polityka prywatności SkładaMy (Słupsk i okolice) – zasady gromadzenia, przetwarzania i ochrony danych osobowych przy usługach montażu mebli.",
    url: "https://skladamy.pl/polityka-prywatnosci",
    inLanguage: "pl-PL",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "LegalDocument",
      name: "Polityka Prywatności SkładaMy (RODO)",
      description: "Dokument informujący o zasadach przetwarzania danych osobowych klientów usług montażu mebli.",
      dateModified: new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: "SkładaMy",
        url: "https://skladamy.pl",
        address: { "@type": "PostalAddress", addressLocality: "Słupsk", addressCountry: "PL" }
      },
      publisher: { "@type": "Organization", name: "SkładaMy", url: "https://skladamy.pl" },
      about: [
        { "@type": "Service", name: "Montaż mebli IKEA", provider: { "@type": "Organization", name: "SkładaMy" } },
        { "@type": "Service", name: "Montaż szaf PAX", provider: { "@type": "Organization", name: "SkładaMy" } }
      ],
      legislationApplies: "RODO; Ustawa o świadczeniu usług drogą elektroniczną; Ustawa o prawach konsumenta"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://skladamy.pl" },
        { "@type": "ListItem", position: 2, name: "Polityka prywatności", item: "https://skladamy.pl/polityka-prywatnosci" }
      ]
    },
    hasPart: sections.map((s, i) => ({ "@type": "WebPageElement", position: i + 1, name: s.title, url: `https://skladamy.pl/polityka-prywatnosci#${s.id}` })),
    significantLink: sections.map(section => `https://skladamy.pl/polityka-prywatnosci#${section.id}`),
    publisher: { "@type": "Organization", name: "SkładaMy", url: "https://skladamy.pl" },
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: "kontakt@skladamy.pl", telephone: "+48 884 938 490", areaServed: "PL", availableLanguage: ["pl"] }],
    keywords: (Array.isArray(metadata.keywords) ? metadata.keywords : (metadata.keywords || "")).toString()
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyStructuredData) }}
      />
      <Header />
      <main id="top" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
              Polityka prywatności i ochrona danych osobowych (RODO 2025)
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              🔒 SkładaMy - Transparentne i bezpieczne przetwarzanie danych w usługach montażu mebli IKEA
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
            <Card id="administrator-danych">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §1 Administrator danych osobowych w SkładaMy Słupsk
                  <a href="#administrator-danych" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  1. <strong>Administratorem danych osobowych</strong> w rozumieniu art. 4 pkt 7 RODO, 
                  przetwarzanych w ramach działalności gospodarczej SkładaMy - profesjonalnych usług montażu 
                  mebli IKEA w Słupsku i okolicach - jest właściciel firmy.
                </p>
                
                <div className="bg-primary/10 p-6 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">📞 Dane kontaktowe Administratora RODO:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-muted-foreground text-sm space-y-2">
                      <li>• <strong>Nazwa firmy:</strong> SkładaMy - Montaż Mebli IKEA</li>
                      <li>• <strong>E-mail RODO:</strong> <a href="mailto:kontakt@skladamy.pl" className="text-primary hover:underline">kontakt@skladamy.pl</a></li>
                      <li>• <strong>Telefon:</strong> <a href="tel:+48884938490" className="text-primary hover:underline">+48 884 938 490</a> (pn-nd 8:00-20:00)</li>
                      <li>• <strong>Strona WWW:</strong> <a href="https://skladamy.pl" className="text-primary hover:underline">https://skladamy.pl</a></li>
                    </ul>
                    <ul className="text-muted-foreground text-sm space-y-2">
                      <li>• <strong>Główny obszar:</strong> Słupsk (miasto i powiat)</li>
                      <li>• <strong>Zasięg usług:</strong> Ustka, Bytów, Miastko, Lębork</li>
                      <li>• <strong>Specjalizacja:</strong> Montaż mebli IKEA, szafy PAX</li>
                      <li>• <strong>Branża:</strong> Usługi montażowe dla domu</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-foreground mb-2">⚖️ Zobowiązania prawne Administratora:</h5>
                  <ul className="text-muted-foreground text-sm space-y-1 ml-4">
                    <li>• Przetwarzanie danych zgodnie z <strong>RODO (Rozporządzenie UE 2016/679)</strong></li>
                    <li>• Przestrzeganie polskiego prawa ochrony danych osobowych</li>
                    <li>• Stosowanie zasad <em>Privacy by Design</em> i <em>Privacy by Default</em></li>
                    <li>• Zapewnienie transparentności przetwarzania danych klientów z regionu Słupska</li>
                  </ul>
                </div>

                <p className="text-muted-foreground text-sm">
                  2. W sprawach dotyczących ochrony danych osobowych podczas korzystania z usług montażu mebli 
                  SkładaMy, klienci mogą kontaktować się bezpośrednio z Administratorem używając powyższych 
                  danych kontaktowych. <strong>Gwarantujemy odpowiedź w ciągu 30 dni</strong> zgodnie z RODO. 
                  W przypadku pytań zapoznaj się z naszym 
                  <Link href="/#faq" className="text-primary hover:underline ml-1">działem FAQ</Link> 
                  lub skontaktuj się bezpośrednio.
                </p>
              </CardContent>
            </Card>

            <Card id="cele-podstawy">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §2 Cele i podstawy prawne przetwarzania danych
                  <a href="#cele-podstawy" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p><strong>1. Cele przetwarzania.</strong> Dane osobowe klientów przetwarzamy wyłącznie w zakresie niezbędnym do: (a) przygotowania wyceny montażu mebli, (b) realizacji usługi montażu, (c) kontaktu organizacyjnego (ustalenie terminu, doprecyzowanie szczegółów), (d) wystawienia dokumentów księgowych, (e) obsługi ewentualnych reklamacji i zgłoszeń gwarancyjnych, (f) realizacji obowiązków podatkowych i rachunkowych, (g) obrony lub dochodzenia roszczeń.</p>
                <p><strong>2. Podstawy prawne (art. 6 ust. 1 RODO).</strong> a) lit. b – niezbędność do wykonania umowy lub działań przed jej zawarciem (wycena, realizacja montażu), b) lit. c – obowiązek prawny (podatki, rachunkowość), c) lit. f – uzasadniony interes administratora (zabezpieczenie roszczeń, dowodowanie jakości usługi), d) lit. a – zgoda (np. dobrowolne przesłanie zdjęć pomieszczenia, zgoda marketingowa – jeżeli zostanie wyrażona).</p>
                <p><strong>3. Brak profilowania.</strong> Nie wykorzystujemy danych do zautomatyzowanego podejmowania decyzji ani profilowania w rozumieniu art. 22 RODO.</p>
                <p><strong>4. Minimalizacja.</strong> Zbieramy wyłącznie dane adekwatne do celu. Nie wymagamy informacji, które nie są potrzebne do montażu lub rozliczenia usługi.</p>
                <p><strong>5. Konsekwencje niepodania danych.</strong> Brak podania danych kontaktowych uniemożliwi przygotowanie wyceny oraz wykonanie usługi.</p>
              </CardContent>
            </Card>

            <Card id="rodzaje-danych">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §3 Kategorie i zakres przetwarzanych danych
                  <a href="#rodzaje-danych" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p><strong>1. Dane identyfikacyjne:</strong> imię, (opcjonalnie) nazwisko – do kontaktu i identyfikacji zlecenia.</p>
                <p><strong>2. Dane kontaktowe:</strong> numer telefonu, adres e-mail – do ustaleń organizacyjnych i przekazywania informacji.</p>
                <p><strong>3. Dane adresowe:</strong> adres montażu (ulica, miejscowość) – wyłącznie do realizacji usługi i dojazdu.</p>
                <p><strong>4. Dane rozliczeniowe:</strong> w przypadku faktury: nazwa firmy, NIP, adres siedziby.</p>
                <p><strong>5. Dane dodatkowe przekazane dobrowolnie:</strong> zdjęcia wnętrza / mebli (jeśli użytkownik sam wyśle w celu rzetelnej wyceny) – przetwarzane na podstawie zgody (art. 6 ust. 1 lit. a).</p>
                <p><strong>6. Dane techniczne serwera:</strong> logi HTTP (IP skracane/anonymizowane, znaczniki czasowe, user-agent) wykorzystywane wyłącznie do zapewnienia bezpieczeństwa i diagnostyki incydentów.</p>
                <p><strong>7. Dane z komunikacji:</strong> treść wiadomości e-mail / formularza – wyłącznie w ramach korespondencji związanej ze zleceniem.</p>
                <p className="bg-muted/50 p-4 rounded"><strong>Nie zbieramy</strong> szczególnych kategorii danych (art. 9 RODO) ani danych dzieci – usługi kierujemy do osób dorosłych.</p>
              </CardContent>
            </Card>

            <Card id="prawa-rodo">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §4 Prawa osób, których dane dotyczą
                  <a href="#prawa-rodo" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p><strong>1. Prawo dostępu</strong> (art. 15 RODO) – możesz uzyskać informację, czy i jakie dane przetwarzamy.</p>
                <p><strong>2. Prawo sprostowania</strong> (art. 16) – poprawimy nieaktualne lub błędne dane.</p>
                <p><strong>3. Prawo usunięcia</strong> (art. 17) – gdy dane nie są już potrzebne lub cofnięto zgodę (jeśli była podstawą).</p>
                <p><strong>4. Prawo ograniczenia</strong> (art. 18) – na czas sporu lub weryfikacji sprzeciwu.</p>
                <p><strong>5. Prawo przenoszenia</strong> (art. 20) – otrzymasz dane w ustrukturyzowanym formacie (jeżeli podstawą była zgoda lub umowa i przetwarzanie ma charakter zautomatyzowany – u nas tylko podstawowy zakres).</p>
                <p><strong>6. Prawo sprzeciwu</strong> (art. 21) – wobec przetwarzania opartego na uzasadnionym interesie.</p>
                <p><strong>7. Prawo cofnięcia zgody</strong> – w dowolnym momencie (nie wpływa to na zgodność wcześniejszego przetwarzania).</p>
                <p><strong>8. Prawo skargi do UODO</strong> – Prezes Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.</p>
                <div className="bg-primary/10 p-4 rounded">
                  <p><strong>Jak złożyć wniosek?</strong> Wyślij e‑mail na: <a href="mailto:kontakt@skladamy.pl" className="text-primary hover:underline">kontakt@skladamy.pl</a>. Odpowiadamy maksymalnie w 30 dni.</p>
                </div>
              </CardContent>
            </Card>

            <Card id="cookies-analityka">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §5 Pliki cookies i analityka
                  <a href="#cookies-analityka" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p><strong>1. Cookies własne (first-party)</strong> – stosowane wyłącznie do zapewnienia podstawowych funkcji strony (np. zapamiętanie nawigacji). Nie przechowujemy w nich danych wrażliwych.</p>
                <p><strong>2. Brak cookies marketingowych podmiotów trzecich</strong> – aktualnie nie korzystamy z pikseli reklamowych ani remarketingu.</p>
                <p><strong>3. Analityka uproszczona</strong> – możemy stosować lekkie, niezależne rozwiązanie statystyk wizyt (self‑hosted) z anonimizacją IP – dane nie są przekazywane dalej.</p>
                <p><strong>4. Zarządzanie cookies.</strong> Z poziomu przeglądarki możesz usuwać lub blokować pliki. Ograniczenie cookies może wpłynąć na komfort przeglądania.</p>
                <p><strong>5. Logi serwera.</strong> Zapisywane automatycznie przy odwiedzinach (skrócone IP, nagłówek user-agent, czas) – wyłącznie w celach bezpieczeństwa i diagnostyki nadużyć; usuwane/anonimizowane cyklicznie.</p>
                <div className="bg-muted/50 p-4 rounded space-y-2">
                  <p><strong>Google Tag Manager</strong> – kontener jest zainstalowany w serwisie; tagi analityczne / marketingowe (jeśli zostaną dodane) uruchamiają się dopiero po wyrażeniu właściwej zgody w banerze.</p>
                  <p><strong>Brak profilowania marketingowego bez zgody</strong> – przed akceptacją zgody nie aktywujemy żadnych narzędzi marketingowych.</p>
                  <p>Pełne szczegóły znajdziesz w dedykowanej <Link href="/polityka-cookies" className="text-primary hover:underline">Polityce cookies</Link>, gdzie opisano kategorie, cele oraz sposób zarządzania zgodą.</p>
                </div>
              </CardContent>
            </Card>

            <Card id="bezpieczenstwo">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §6 Bezpieczeństwo danych i okresy przechowywania
                  <a href="#bezpieczenstwo" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p><strong>1. Zabezpieczenia organizacyjne:</strong> ograniczony dostęp do skrzynki e‑mail i urządzeń, stosowanie silnych haseł i aktualizacji.</p>
                <p><strong>2. Zabezpieczenia techniczne:</strong> szyfrowanie transmisji (HTTPS), kopie zapasowe konfiguracji strony, bieżące aktualizacje komponentów.</p>
                <p><strong>3. Retencja danych:</strong> (a) dane kontaktowe: do zakończenia realizacji usługi + maks. 12 miesięcy na cele dowodowe; (b) dokumenty księgowe: zgodnie z obowiązkiem prawnym (zwykle 5 lat podatkowych); (c) korespondencja reklamacyjna: do czasu przedawnienia roszczeń.</p>
                <p><strong>4. Udostępnianie danych:</strong> wyłącznie gdy wymagają tego przepisy prawa (organy skarbowe) lub jest to niezbędne do rozliczeń księgowych (biuro rachunkowe – jeśli współpracujemy, działa jako odrębny administrator / podmiot przetwarzający wg umowy).</p>
                <p><strong>5. Transfer poza EOG:</strong> nie występuje – dane przetwarzane są wyłącznie w infrastrukturze w UE/PL.</p>
                <p><strong>6. Naruszenia ochrony danych:</strong> w razie wystąpienia incydentu dokonujemy analizy, stosujemy środki naprawcze i – gdy wymagane – zgłaszamy organowi nadzorczemu oraz zawiadamiamy osoby, których dotyczy naruszenie.</p>
                <div className="bg-primary/10 p-4 rounded"><p><strong>Najważniejsza zasada:</strong> nie gromadzimy danych ponad niezbędny zakres. Każda prośba o dodatkowe informacje ma uzasadnienie funkcjonalne.</p></div>
              </CardContent>
            </Card>

            <Card id="kontakt-rodo">
              <CardHeader>
                <CardTitle className="group scroll-mt-24">
                  §7 Kontakt w sprawach RODO i skargi
                  <a href="#kontakt-rodo" className="ml-2 text-muted-foreground hover:text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Link do paragrafu">#</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p><strong>1. Kontakt podstawowy:</strong> e‑mail: <a href="mailto:kontakt@skladamy.pl" className="text-primary hover:underline">kontakt@skladamy.pl</a>, tel.: <a href="tel:+48884938490" className="text-primary hover:underline">+48 884 938 490</a>.</p>
                <p><strong>2. Forma zgłoszeń:</strong> Wnioski dotyczące praw RODO prosimy kierować w tytule wiadomości wpisując: &quot;RODO – [prawo]&quot; (np. RODO – dostęp).</p>
                <p><strong>3. Skarga do organu nadzorczego:</strong> Prezes UODO, ul. Stawki 2, 00-193 Warszawa, <a href="https://uodo.gov.pl" className="text-primary hover:underline" rel="nofollow">uodo.gov.pl</a>.</p>
                <p><strong>4. Inne dokumenty:</strong> Zobacz również <Link href="/regulamin" className="text-primary hover:underline">Regulamin świadczenia usług</Link> (warunki montażu) aby poznać zasady wykonania usługi.</p>
                <div className="bg-muted/50 p-4 rounded">
                  <p><strong>Aktualizacja:</strong> Niniejsza polityka może być zmieniana w celu dostosowania do zmian prawa lub usług. Nowa wersja zawsze będzie oznaczona datą aktualizacji na górze strony.</p>
                </div>
                <div className="text-center mt-6"><BackToTop /></div>
                <p className="text-muted-foreground text-xs text-center mt-6 pt-4 border-t border-border">
                  Ostatnia aktualizacja polityki: {new Date().toLocaleDateString('pl-PL')} | <Link href="/" className="text-primary hover:underline mx-1">SkładaMy</Link> – Montaż mebli IKEA Słupsk | <Link href="/#uslugi" className="text-primary hover:underline mx-1">Zakres usług</Link>
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
