/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const axios = require('axios');
require('dotenv').config();

// Get configuration from environment - no hardcoded values
const PUBLIC_URL = process.env.PUBLIC_URL;
const API_TOKEN = process.env.STRAPI_ADMIN_TOKEN;

if (!PUBLIC_URL) {
  console.error('❌ Error: PUBLIC_URL environment variable is not set!');
  console.error('Please set PUBLIC_URL in your .env file (e.g., PUBLIC_URL=http://localhost:1337)');
  process.exit(1);
}

if (!API_TOKEN) {
  console.error('❌ Error: STRAPI_ADMIN_TOKEN environment variable is not set!');
  console.error('Generate a token in Strapi Admin → Settings → API Tokens → Create (Full Access)');
  console.error('Then add it to your .env file: STRAPI_ADMIN_TOKEN=your-token-here');
  process.exit(1);
}

const API_URL = `${PUBLIC_URL}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

console.log('🌱 Rozpoczynam seedowanie bazy danych z premium contentem...\n');

// Kategorie dla bloga montażowego
const categories = [
  {
    name: 'Poradniki',
    slug: 'poradniki',
    description: 'Praktyczne porady i instrukcje krok po kroku dotyczące montażu mebli IKEA',
    color: '#3b82f6',
    icon: 'book-open',
    seo: {
      metaTitle: 'Poradniki montażu mebli IKEA',
      metaDescription: 'Praktyczne poradniki i instrukcje montażu mebli IKEA krok po kroku',
      keywords: 'poradniki ikea, instrukcje montażu, jak montować meble',
    },
  },
  {
    name: 'Narzędzia',
    slug: 'narzedzia',
    description: 'Wszystko o narzędziach potrzebnych do montażu mebli',
    color: '#f59e0b',
    icon: 'wrench',
    seo: {
      metaTitle: 'Narzędzia do montażu mebli IKEA',
      metaDescription: 'Przewodnik po narzędziach niezbędnych do montażu mebli IKEA',
      keywords: 'narzędzia montaż, narzędzia ikea, sprzęt do montażu',
    },
  },
  {
    name: 'Bezpieczeństwo',
    slug: 'bezpieczenstwo',
    description: 'Zasady bezpieczeństwa podczas montażu i użytkowania mebli',
    color: '#ef4444',
    icon: 'shield-check',
    seo: {
      metaTitle: 'Bezpieczeństwo montażu mebli IKEA',
      metaDescription: 'Poznaj zasady bezpiecznego montażu i użytkowania mebli IKEA',
      keywords: 'bezpieczeństwo montaż, bezpieczny montaż mebli, zasady bhp',
    },
  },
];

// Tagi dla artykułów
const tags = [
  { name: 'IKEA', slug: 'ikea', color: '#0051ba' },
  { name: 'Montaż', slug: 'montaz', color: '#3b82f6' },
  { name: 'Szafy', slug: 'szafy', color: '#8b5cf6' },
  { name: 'PAX', slug: 'pax', color: '#0051ba' },
  { name: 'Narzędzia', slug: 'narzedzia', color: '#f59e0b' },
  { name: 'DIY', slug: 'diy', color: '#10b981' },
  { name: 'Bezpieczeństwo', slug: 'bezpieczenstwo', color: '#ef4444' },
  { name: 'Czas montażu', slug: 'czas-montazu', color: '#6366f1' },
  { name: 'Instrukcje', slug: 'instrukcje', color: '#3b82f6' },
  { name: 'Wskazówki profesjonalistów', slug: 'wskazowki-profesjonalistow', color: '#8b5cf6' },
];

// Dane autora
const authorData = {
  name: 'Zespół SkładaMy',
  role: 'Certyfikowani monterzy IKEA',
  bio: 'Zespół ekspertów w montażu mebli IKEA z wieloletnim doświadczeniem. Specjalizujemy się w profesjonalnym montażu i doradzamy klientom w wyborze najlepszych rozwiązań.',
  email: 'kontakt@skladamy.pl',
  website: 'https://skladamy.pl',
  linkedin: 'https://linkedin.com/company/skladamy',
  twitter: '@skladamy',
};

// PREMIUM ARTYKUŁ - długi, dopracowany, wartościowy
const premiumArticle = {
  title: 'Kompletny przewodnik po montażu szafy PAX IKEA - Od A do Z [2025]',
  slug: 'kompletny-przewodnik-montaz-szafy-pax-ikea-2025',
  excerpt: 'Poznaj profesjonalne techniki montażu szafy PAX IKEA. Szczegółowy przewodnik krok po kroku z wskazówkami ekspertów, listą narzędzi, oszacowaniem czasu i najczęstszymi błędami do uniknięcia. Wszystko, czego potrzebujesz, aby samodzielnie zmontować szafę PAX.',
  content: `<h2>Wprowadzenie do systemu PAX</h2>

<p>System szaf PAX to jedno z najbardziej wszechstronnych i popularnych rozwiązań do przechowywania oferowanych przez IKEA. Od ponad 40 lat PAX ewoluuje, oferując coraz więcej możliwości personalizacji. W tym kompleksowym przewodniku przeprowadzimy Cię przez cały proces montażu - od przygotowania po finalne detale.</p>

<p><strong>Dlaczego warto przeczytać ten przewodnik?</strong></p>

<ul>
  <li>Zaoszczędzisz czas dzięki profesjonalnym wskazówkom</li>
  <li>Unikniesz najczęstszych błędów popełnianych przez początkujących</li>
  <li>Dowiesz się, kiedy warto zlecić montaż profesjonalistom</li>
  <li>Poznasz triki ułatwiające pracę, których nie znajdziesz w instrukcji IKEA</li>
  <li>Zrozumiesz, jak zaplanować montaż, aby przebiegł sprawnie</li>
</ul>

<h2>Przygotowanie do montażu - klucz do sukcesu</h2>

<h3>Weryfikacja paczek i elementów</h3>

<p>Zanim zaczniesz montaż, <strong>konieczne jest dokładne sprawdzenie wszystkich paczek</strong>. To najważniejszy krok, który zaoszczędzi Ci frustracji w trakcie montażu:</p>

<ol>
  <li><strong>Sprawdź numer zamówienia</strong> - upewnij się, że wszystkie paczki odpowiadają Twojemu zamówieniu</li>
  <li><strong>Policz paczki</strong> - zweryfikuj, czy liczba paczek zgadza się z listą przewozową</li>
  <li><strong>Sprawdź stan paczek</strong> - poszukaj uszkodzeń mechanicznych, przebić, zawilgocenia</li>
  <li><strong>Otwórz wszystkie paczki</strong> - nie czekaj do momentu montażu, sprawdź zawartość od razu</li>
  <li><strong>Posortuj elementy</strong> - pogrupuj płyty, akcesoria metalowe, śruby według typu</li>
</ol>

<p><em>Wskazówka profesjonalisty:</em> Użyj pudełek po jajkach lub małych pojemników na posortowanie śrub i kołków. Uchroni Cię to przed gubienlem drobnych elementów.</p>

<h3>Niezbędne narzędzia</h3>

<p>Choć IKEA dostarcza podstawowe narzędzia (klucz imbusowy), profesjonalny montaż wymaga odpowiedniego wyposażenia:</p>

<p><strong>Narzędzia podstawowe (musisz mieć):</strong></p>

<ul>
  <li><strong>Wkrętarka akumulatorowa</strong> z regulacją momentu obrotowego - najważniejsze narzędzie, oszczędza godziny pracy</li>
  <li><strong>Zestaw bitów</strong> - krzyżakowe (PH2), płaskie, Torx</li>
  <li><strong>Poziomnica</strong> - minimum 60 cm długości, najlepiej z magnesami</li>
  <li><strong>Taśma miernicza</strong> - minimum 3 metry</li>
  <li><strong>Młotek gumowy</strong> - do delikatnego dopasowania elementów</li>
  <li><strong>Ołówek stolarski</strong> - do zaznaczania punktów wiercenia</li>
  <li><strong>Wiertarka udarowa</strong> - do montażu w ścianie betonowej</li>
</ul>

<p><strong>Narzędzia pomocnicze (ułatwiają pracę):</strong></p>

<ul>
  <li><strong>Kątownica</strong> - do sprawdzania kątów prostych</li>
  <li><strong>Detektor przewodów</strong> - KONIECZNY do bezpiecznego wiercenia w ścianie</li>
  <li><strong>Szczypce</strong> - do ewentualnych korekt</li>
  <li><strong>Nóż lub nożyce</strong> - do otwierania paczek</li>
  <li><strong>Kolanki budowlane</strong> - chronią kolana podczas pracy przy podłodze</li>
  <li><strong>Podkładki kartonowe</strong> - do ochrony podłogi przed zarysowaniem</li>
</ul>

<h2>Ile czasu zajmuje montaż PAX? Realistyczne szacunki</h2>

<p>Czas montażu zależy od wielu czynników. Oto szczegółowe zestawienie:</p>

<h3>Podstawowa szafa PAX 100x58x236 cm</h3>

<ul>
  <li><strong>Pierwsza szafa (bez doświadczenia):</strong> 3-5 godzin</li>
  <li><strong>Z pomocą drugiej osoby:</strong> 2-3 godziny</li>
  <li><strong>Doświadczony monter:</strong> 1-1.5 godziny</li>
</ul>

<h3>Duży system PAX (np. 300 cm szerokości, 3 korpusy)</h3>

<ul>
  <li><strong>Amatorzy:</strong> 8-12 godzin (zwykle 2 dni)</li>
  <li><strong>Z pomocą:</strong> 6-8 godzin</li>
  <li><strong>Profesjonaliści:</strong> 3-4 godziny</li>
</ul>

<p><strong>Co wpływa na czas montażu?</strong></p>

<ul>
  <li>Doświadczenie w montażu mebli (+/- 40% czasu)</li>
  <li>Liczba wewnętrznych akcesoriów (szuflady, półki, drążki) (+30-50% czasu)</li>
  <li>Typ drzwi (przesuwne vs. uchylne - przesuwne +50% czasu)</li>
  <li>Konieczność montażu w ścianie (+20-30% czasu)</li>
  <li>Praca w pojedynkę vs. z pomocnikiem (różnica 40-60%)</li>
</ul>

<h2>Instrukcja montażu krok po kroku - profesjonalna technika</h2>

<h3>Krok 1: Przygotowanie przestrzeni roboczej</h3>

<p>Właściwe przygotowanie to połowa sukcesu:</p>

<ol>
  <li><strong>Opróżnij pomieszczenie</strong> - potrzebujesz minimum 2-3 metry wolnej przestrzeni przed miejscem montażu</li>
  <li><strong>Zabezpiecz podłogę</strong> - rozłóż tekturę lub stary dywan, aby nie zarysować parkietu/paneli</li>
  <li><strong>Zapewnij dobre oświetlenie</strong> - lampa robocza lub silna latarka to must-have</li>
  <li><strong>Przygotuj miejsce na śmieci</strong> - otwarte paczki IKEA generują dużo kartonu i folii</li>
</ol>

<h3>Krok 2: Montaż pierwszego korpusu (boczne ściany)</h3>

<p>To fundamentalny etap - od niego zależy stabilność całej szafy:</p>

<ol>
  <li><strong>Połóż boczną ścianę płasko na podłodze</strong> - otworami do kołków w górę</li>
  <li><strong>Wbij kołki drewniane</strong> - użyj młotka gumowego, wbijaj równomiernie</li>
  <li><strong>Przygotuj tylną ściankę</strong> - NIE mocuj jej jeszcze, odłóż na bok</li>
  <li><strong>Zamontuj górę i dół korpusu</strong> - użyj śrub z kołkami, najpierw wkręć ręcznie, potem dokręć wkrętarką</li>
  <li><strong>Sprawdź kąty proste</strong> - użyj kątownicy lub zmierz przekątne (muszą być równe!)</li>
</ol>

<p><em>Częsty błąd:</em> Zbyt mocne dokręcanie śrub w płycie wiórowej. Ustaw moment obrotowy wkrętarki na niskie wartości (8-10 Nm).</p>

<h3>Krok 3: Montaż drugiej bocznej ściany</h3>

<p><strong>To najtrudniejszy moment montażu</strong> - potrzebujesz drugiej pary rąk:</p>

<ol>
  <li><strong>Poproś kogoś o pomoc</strong> - jedna osoba przytrzymuje korpus, druga montuje drugą ścianę</li>
  <li><strong>Postaw korpus pionowo</strong> - oprzyj o ścianę lub o stabilny mebel</li>
  <li><strong>Nałóż drugą boczną ścianę</strong> - wyrównaj otwory z kołkami</li>
  <li><strong>Delikatnie wbij młotkiem gumowym</strong> - równomiernie, małymi uderzeniami</li>
  <li><strong>Sprawdź poziom</strong> - korpus musi stać pionowo</li>
</ol>

<h3>Krok 4: Zamocowanie tylnej ścianki</h3>

<p>Tylna ścianka (płyta HDF) to element stabilizujący:</p>

<ol>
  <li><strong>Przyłóż tylną ściankę</strong> - zwróć uwagę na kierunek (strona z nadrukiem do wewnątrz)</li>
  <li><strong>Wyrównaj po przekątnych</strong> - to ostatni moment na korektę kątów prostych</li>
  <li><strong>Przybij małymi gwoździkami</strong> - co 10-15 cm wzdłuż krawędzi</li>
  <li><strong>Sprawdź stabilność</strong> - korpus nie powinien się kręcić</li>
</ol>

<h3>Krok 5: Montaż wewnętrznych akcesoriów</h3>

<p>Kolejność ma znaczenie - montuj od góry do dołu:</p>

<ol>
  <li><strong>Górne drążki na wieszaki</strong> - montuj jako pierwsze</li>
  <li><strong>Półki</strong> - zacznij od najwyższych</li>
  <li><strong>Szuflady</strong> - zostawiaj na koniec, są najbardziej czasochłonne</li>
  <li><strong>Akcesoria dodatkowe</strong> - koszyki, uchwyty na spodnie itp.</li>
</ol>

<p><em>Wskazówka:</em> Zrób zdjęcie swojego planowania wnętrza z konfiguratora IKEA - przyspieszy to montaż akcesoriów.</p>

<h3>Krok 6: Montaż systemu prowadnic do szuflad</h3>

<p>Szuflady w PAX to system KOMPLEMENT - precyzyjny, ale wymagający:</p>

<ol>
  <li><strong>Zmierz dokładnie wysokości</strong> - używaj szablonu kartonowego z paczki</li>
  <li><strong>Przywierć prowadnice</strong> - użyj poziomnicy, muszą być idealnie równoległe</li>
  <li><strong>Zamontuj szuflady na prowadnicach</strong> - usłyszysz kliknięcie</li>
  <li><strong>Sprawdź płynność wysuwania</strong> - szuflada powinna chodzić lekko</li>
</ol>

<h3>Krok 7: Montaż drzwi</h3>

<p><strong>Drzwi przesuwne (system HASVIK/AULI):</strong></p>

<ol>
  <li>Zamontuj górną i dolną prowadnicę</li>
  <li>Wsadź najpierw tylne drzwi do górnej prowadnicy</li>
  <li>Opuść drzwi i włóż w dolną prowadnicę</li>
  <li>Powtórz z przednimi drzwiami</li>
  <li>Wyreguluj wysokość śrubami regulacyjnymi</li>
</ol>

<p><strong>Drzwi uchylne (zawiasy):</strong></p>

<ol>
  <li>Zamontuj zawiasy w drzwiach (jeśli nie są już fabrycznie zamontowane)</li>
  <li>Przywierć płytki montażowe zawiasów do korpusu</li>
  <li>Zakładaj drzwi od góry - kliknięcie oznacza zamocowanie</li>
  <li>Wyreguluj poziomo i pionowo śrubami na zawiasach</li>
</ol>

<h3>Krok 8: Montaż w ścianie (OBOWIĄZKOWY!)</h3>

<p><strong>To najważniejszy krok bezpieczeństwa - IKEA wymaga zamocowania PAX do ściany!</strong></p>

<ol>
  <li><strong>Wykryj instalacje</strong> - użyj detektora przewodów/rur</li>
  <li><strong>Zaznacz punkty wiercenia</strong> - według instrukcji, zwykle 2 punkty na korpus</li>
  <li><strong>Wywierć otwory</strong> - wiertarka udarowa, wiertło do betonu 8mm lub 10mm</li>
  <li><strong>Włóż kołki rozporowe</strong> - mocne, dedykowane do ścian</li>
  <li><strong>Przykręć szafę</strong> - użyj wkrętów z zestawu PATRULL (dołączonych do PAX)</li>
  <li><strong>Sprawdź mocowanie</strong> - pociągnij szafę - musi być stabilna</li>
</ol>

<h2>Najczęstsze błędy i jak ich unikać</h2>

<h3>1. Pominięcie sprawdzenia zawartości paczek</h3>

<p><strong>Konsekwencje:</strong> Brak elementu w trakcie montażu oznacza przerwę, reklamację, czekanie na część zamienną.</p>

<p><strong>Rozwiązanie:</strong> Zawsze sprawdzaj wszystkie paczki przed rozpoczęciem montażu. Zrób to w dniu dostawy, aby móc natychmiast zgłosić reklamację.</p>

<h3>2. Montaż bez drugiej osoby</h3>

<p><strong>Konsekwencje:</strong> Ryzyko uszkodzenia elementów, przewrócenia korpusu, urazu.</p>

<p><strong>Rozwiązanie:</strong> Poproś kogoś o pomoc przynajmniej na etapie łączenia bocznych ścian i montażu drzwi. Nawet niewprawna osoba jest lepszym wsparciem niż praca w pojedynkę.</p>

<h3>3. Zbyt mocne dokręcanie śrub</h3>

<p><strong>Konsekwencje:</strong> Pęknięta płyta wiórowa, urwany gwint, niemożność rozkręcenia w przyszłości.</p>

<p><strong>Rozwiązanie:</strong> Używaj wkrętarki z regulacją momentu. Dokręcaj do oporu, ale nie "podkręcaj" na siłę.</p>

<h3>4. Brak sprawdzenia kątów prostych</h3>

<p><strong>Konsekwencje:</strong> Szafa "rombem", problemy z montażem drzwi, szuflady nie domykają się.</p>

<p><strong>Rozwiązanie:</strong> Zmierzaj przekątne korpusu przed przybiciem tylnej ścianki. Obie przekątne muszą być równe (+/- 2mm).</p>

<h3>5. Montaż bez zamocowania do ściany</h3>

<p><strong>Konsekwencje:</strong> ŚMIERTELNE ZAGROŻENIE! Każdego roku giną dzieci przygniecione przez nieprzymocowane meble.</p>

<p><strong>Rozwiązanie:</strong> ZAWSZE mocuj PAX do ściany zestawem PATRULL. To nie opcja, to obowiązek!</p>

<h2>Kiedy warto zatrudnić profesjonalny zespół montażowy?</h2>

<p>Montaż PAX przez profesjonalistów to inwestycja, która się opłaca w następujących sytuacjach:</p>

<h3>Zdecydowanie warto wynająć monterów, gdy:</h3>

<ul>
  <li><strong>Montujesz duży system PAX</strong> (powyżej 300 cm szerokości) - oszczędzisz cały dzień i nerwy</li>
  <li><strong>Masz drzwi przesuwne</strong> - wymagają precyzji i doświadczenia</li>
  <li><strong>Brakuje Ci narzędzi</strong> - zakup pełnego zestawu może kosztować więcej niż usługa monterska</li>
  <li><strong>Nie masz pomocy</strong> - montaż w pojedynkę to bardzo trudne zadanie</li>
  <li><strong>Masz małe dzieci</strong> - montaż zajmuje cały dzień, trudno jednocześnie pilnować dzieci</li>
  <li><strong>Szafa ma być w nowej lokalizacji</strong> - profesjonaliści rozłożą i złożą bez uszkodzeń</li>
</ul>

<h3>Możesz zmontować sam, jeśli:</h3>

<ul>
  <li>Montujesz prostą szafę PAX do 200 cm szerokości</li>
  <li>Masz podstawowe narzędzia i doświadczenie w montażu mebli</li>
  <li>Masz pomoc drugiej osoby</li>
  <li>Dysponujesz czasem (cały dzień) i cierpliwością</li>
</ul>

<p><strong>Koszt montażu przez profesjonalistów:</strong> W SkładaMy montaż PAX kosztuje od 150 zł za prosty korpus do 600 zł za duży system z szufladami i drzwiami przesuwnymi. Uwzględniając wartość Twojego czasu i ryzyko błędów, często to opłacalna inwestycja.</p>

<h2>Pielęgnacja i konserwacja PAX po montażu</h2>

<p>Aby szafa PAX służyła przez lata:</p>

<ul>
  <li><strong>Regularnie sprawdzaj mocowania do ściany</strong> - co 6 miesięcy dokręć śruby</li>
  <li><strong>Nie przeciążaj półek</strong> - maksymalne obciążenie to zwykle 20 kg na półkę</li>
  <li><strong>Czyść powierzchnie delikatnym środkiem</strong> - unikaj szorstkich gąbek</li>
  <li><strong>Smaruj prowadnice szuflad</strong> - raz w roku sprejem silikonowym</li>
  <li><strong>Sprawdzaj zawiasy drzwi</strong> - reguluj je w razie potrzeby</li>
</ul>

<h2>Podsumowanie - Twój plan działania</h2>

<p>Montaż szafy PAX IKEA to projekt, który wymaga przygotowania, ale jest całkowicie wykonalny dla ambitnego majsterkowicza. Kluczem do sukcesu jest:</p>

<ol>
  <li><strong>Dokładne sprawdzenie wszystkich elementów</strong> przed rozpoczęciem</li>
  <li><strong>Odpowiednie narzędzia</strong> - zwłaszcza wkrętarka akumulatorowa</li>
  <li><strong>Pomoc drugiej osoby</strong> - przynajmniej na kluczowe etapy</li>
  <li><strong>Spokój i metodyczność</strong> - nie spiesz się, podążaj za instrukcją</li>
  <li><strong>OBOWIĄZKOWE zamocowanie do ściany</strong> - Twoje i Twoich bliskich bezpieczeństwo</li>
</ol>

<p>Jeśli czujesz się niepewnie, nie ma wstydu w zatrudnieniu profesjonalistów. W SkładaMy specjalizujemy się w montażu PAX i zapewniamy szybką, bezstresową usługę z gwarancją. <a href="/kontakt">Skontaktuj się z nami</a> i otrzymaj bezpłatną wycenę!</p>

<p><strong>Powodzenia w montażu!</strong> 🛠️</p>`,
  readTime: 18,
  featured: true,
  publishDate: '2025-12-28T09:00:00.000Z',
  categorySlug: 'poradniki',
  tagSlugs: ['ikea', 'montaz', 'szafy', 'pax', 'narzedzia', 'diy', 'bezpieczenstwo', 'czas-montazu', 'instrukcje', 'wskazowki-profesjonalistow'],
  seo: {
    metaTitle: 'Przewodnik montażu szafy PAX IKEA 2025 | SkładaMy',
    metaDescription: 'Profesjonalny przewodnik: jak zmontować szafę PAX IKEA. Czas, narzędzia, błędy i wskazówki ekspertów. 18 min czytania.',
    keywords: 'montaż pax ikea, jak zmontować szafę pax, instrukcja pax, przewodnik pax, czas montażu pax, narzędzia do pax, błędy montaż pax',
    ogTitle: 'Kompletny przewodnik po montażu szafy PAX IKEA [2025]',
    ogDescription: 'Dowiedz się wszystkiego o montażu szafy PAX - od przygotowania po finalne detale. Przewodnik dla amatorów i profesjonalistów.',
    ogType: 'article',
    canonicalUrl: 'https://skladamy.pl/blog/kompletny-przewodnik-montaz-szafy-pax-ikea-2025',
    noindex: false,
    nofollow: false,
    twitterCard: 'summary_large_image',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Kompletny przewodnik po montażu szafy PAX IKEA - Od A do Z [2025]",
      "description": "Poznaj profesjonalne techniki montażu szafy PAX IKEA. Szczegółowy przewodnik krok po kroku z wskazówkami ekspertów, listą narzędzi, oszacowaniem czasu i najczęstszymi błędami do uniknięcia.",
      "image": "https://skladamy.pl/uploads/pax-assembly-guide.jpg",
      "datePublished": "2025-12-28T09:00:00+01:00",
      "dateModified": "2025-12-28T09:00:00+01:00",
      "author": {
        "@type": "Person",
        "name": "Zespół SkładaMy",
        "url": "https://skladamy.pl"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SkładaMy",
        "url": "https://skladamy.pl",
        "logo": {
          "@type": "ImageObject",
          "url": "https://skladamy.pl/logo.png",
          "width": 250,
          "height": 60
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://skladamy.pl/blog/kompletny-przewodnik-montaz-szafy-pax-ikea-2025"
      },
      "wordCount": 3000,
      "articleBody": "Kompletny przewodnik po montażu szafy PAX IKEA...",
      "inLanguage": "pl-PL",
      "about": {
        "@type": "Thing",
        "name": "Montaż mebli IKEA"
      },
      "mentions": [
        {
          "@type": "Product",
          "name": "Szafa PAX IKEA",
          "brand": {
            "@type": "Brand",
            "name": "IKEA"
          }
        }
      ]
    },
    lastmod: new Date().toISOString(),
  },
};

async function seedDatabase() {
  const createdCategories = {};
  const createdTags = {};

  try {
    // 1. Tworzenie kategorii
    console.log('📁 Tworzenie kategorii...\n');
    for (const category of categories) {
      try {
        const response = await axiosInstance.post('/categories', { data: category });
        createdCategories[category.slug] = response.data.data.id;
        console.log(`✅ Utworzono kategorię: ${category.name}`);
      } catch (error) {
        console.error(`❌ Błąd podczas tworzenia kategorii ${category.name}:`, error.response?.data?.error?.message || error.message);
      }
    }

    console.log('\n🏷️  Tworzenie tagów...\n');
    // 2. Tworzenie tagów
    for (const tag of tags) {
      try {
        const response = await axiosInstance.post('/tags', { data: tag });
        createdTags[tag.slug] = response.data.data.id;
        console.log(`✅ Utworzono tag: ${tag.name}`);
      } catch (error) {
        console.error(`❌ Błąd podczas tworzenia tagu ${tag.name}:`, error.response?.data?.error?.message || error.message);
      }
    }

    console.log('\n📝 Tworzenie premium artykułu...\n');
    // 3. Tworzenie artykułu
    try {
      const categoryId = createdCategories[premiumArticle.categorySlug];
      const tagIds = premiumArticle.tagSlugs
        .map((slug) => createdTags[slug])
        .filter((id) => id !== undefined);

      const articleData = {
        title: premiumArticle.title,
        slug: premiumArticle.slug,
        excerpt: premiumArticle.excerpt,
        content: premiumArticle.content,
        readTime: premiumArticle.readTime,
        featured: premiumArticle.featured,
        publishDate: premiumArticle.publishDate,
        category: categoryId,
        tags: tagIds,
        author: authorData,
        seo: premiumArticle.seo,
      };

      const response = await axiosInstance.post('/blog-posts', { data: articleData });
      console.log(`✅ Utworzono premium artykuł: ${premiumArticle.title}`);
      console.log(`   📊 Czas czytania: ${premiumArticle.readTime} minut`);
      console.log(`   🏷️  Tagów: ${tagIds.length}`);
      console.log(`   📝 Długość: ~${premiumArticle.content.length} znaków`);
    } catch (error) {
      console.error(`❌ Błąd podczas tworzenia artykułu ${premiumArticle.title}:`, error.response?.data);
      if (error.response?.data?.error?.details) {
        console.log('Szczegóły błędu:', JSON.stringify(error.response.data.error.details, null, 2));
      }
    }

    console.log('\n✨ Seedowanie zakończone!\n');
    console.log('📊 Utworzono:');
    console.log(`   - ${Object.keys(createdCategories).length} kategorii`);
    console.log(`   - ${Object.keys(createdTags).length} tagów`);
    console.log(`   - 1 premium artykuł`);
    console.log('\n💡 Następne kroki:');
    console.log('   1. Zaloguj się do panelu Strapi (http://localhost:1337/admin)');
    console.log('   2. Opublikuj utworzony artykuł (jeśli jest w drafcie)');
    console.log('   3. Sprawdź frontend (http://localhost:3000/blog)');
    console.log('\n🎉 Gotowe! Możesz teraz testować blog.\n');
  } catch (error) {
    console.error('❌ Krytyczny błąd podczas seedowania:', error.message);
    process.exit(1);
  }
}

seedDatabase();
