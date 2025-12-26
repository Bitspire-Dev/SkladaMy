#!/usr/bin/env node
/**
 * Seed blog posts for SkładaMy - Montaż mebli Słupsk
 * Run: node scripts/seed-blog-content.js
 */

const blogPosts = [
  {
    title: "Jak złożyć szafę PAX z IKEA - Kompletny przewodnik krok po kroku",
    slug: "jak-zlozyc-szafe-pax-ikea-przewodnik",
    excerpt: "Profesjonalny poradnik montażu szafy PAX. Dowiedz się, jak uniknąć najczęstszych błędów i złożyć szafę idealnie w zaledwie kilka godzin.",
    content: `
# Montaż szafy PAX - przewodnik

Szafa PAX to jeden z najpopularniejszych systemów meblowych IKEA. Dzięki modułowej konstrukcji można ją dostosować do każdego pomieszczenia.

## Przygotowanie do montażu

Przed rozpoczęciem montażu upewnij się, że masz:
- Wszystkie elementy z instrukcji
- Odpowiednie narzędzia (poziomicę, śrubokręt, młotek)
- Minimum 2 osoby do montażu
- 3-4 godziny czasu

## Etapy montażu

### 1. Sprawdzenie elementów
Rozłóż wszystkie elementy i sprawdź, czy nic nie brakuje. Uporządkuj śruby i kołki według typu.

### 2. Montaż korpusu
Zacznij od złożenia bocznych ścianek. Używaj poziomnicy, aby upewnić się, że wszystko jest proste.

### 3. Montaż drzwi
Drzwi przesuwne wymagają precyzyjnego ustawienia prowadnic. Poświęć temu czas - to najważniejszy etap.

## Najczęstsze błędy

- Niedokładne wypoziomowanie
- Zbyt mocne dokręcanie śrub
- Montaż bez drugiej osoby

## Podsumowanie

Montaż szafy PAX nie jest trudny, ale wymaga cierpliwości i dokładności. Jeśli nie czujesz się pewnie, skorzystaj z usług profesjonalistów.
`,
    category: "ikea-tips",
    author: "SkładaMy Team",
    readTime: 8,
    tags: [
      { label: "IKEA", color: "#0051BA" },
      { label: "PAX", color: "#FFDB00" },
      { label: "montaż", color: "#2E7D32" },
      { label: "poradnik", color: "#1976D2" }
    ],
    featured: true,
    views: 0
  },
  {
    title: "Ile kosztuje montaż mebli w Słupsku? Cennik 2025",
    slug: "ile-kosztuje-montaz-mebli-slupsk-cennik-2025",
    excerpt: "Aktualny cennik montażu mebli w Słupsku. Sprawdź, ile kosztuje złożenie szafy, kuchni czy biurka. Transparentne ceny bez ukrytych kosztów.",
    content: `
# Cennik montażu mebli Słupsk 2025

## Ceny podstawowe

### Meble IKEA
- Szafa PAX (2-drzwiowa): 250-350 zł
- Szafa PAX (3-drzwiowa): 400-550 zł
- Komoda MALM: 120-180 zł
- Regał KALLAX: 80-150 zł
- Łóżko z szufladami: 200-300 zł

### Meble kuchenne
- Szafka wisząca: 40-60 zł/szt
- Szafka stojąca: 50-80 zł/szt
- Słupek: 100-150 zł
- Blat (montaż): 150-250 zł

### Meble biurowe
- Biurko: 80-150 zł
- Regał/biblioteczka: 100-200 zł
- Szafa biurowa: 180-300 zł

## Co wpływa na cenę?

1. **Wielkość mebla** - większe meble = więcej czasu
2. **Stopień skomplikowania** - systemy przesuwne są droższe
3. **Dojazd** - w centrum Słupska dojazd gratis
4. **Dodatkowe usługi** - montaż na ścianie, likwidacja opakowań

## Darmowy dojazd

Oferujemy darmowy dojazd w Słupsku przy zamówieniu powyżej 200 zł.

## Rezerwacja terminu

Dzwoń: [twój numer]
Piszę: kontakt@skladamy.pl
`,
    category: "cennik",
    author: "SkładaMy Team",
    readTime: 5,
    tags: [
      { label: "cennik", color: "#F57C00" },
      { label: "Słupsk", color: "#D32F2F" },
      { label: "ceny", color: "#7B1FA2" }
    ],
    featured: true,
    views: 0
  },
  {
    title: "Top 5 narzędzi do montażu mebli - Co musisz mieć?",
    slug: "top-5-narzedzi-montaz-mebli",
    excerpt: "Profesjonalne narzędzia znacznie ułatwiają montaż mebli. Zobacz, które narzędzia są absolutnie niezbędne, a które warto mieć.",
    content: `
# Top 5 narzędzi do montażu mebli

## 1. Wkrętak akumulatorowy
To absolutna podstawa. Pozwala na szybki montaż bez męczącego kręcenia ręcznie.

**Polecamy:** Bosch IXO, Makita DF330D

## 2. Poziomnica
Meble muszą być idealnie wypoziomowane. Poziomnica laserowa to najlepsza inwestycja.

## 3. Młotek gumowy
Kołki wbijasz gumowym młotkiem - nie uszkodzi mebla.

## 4. Miara i kątownica
Precyzyjne odmierzanie to klucz do sukcesu.

## 5. Zestaw kluczy imbusowych
IKEA używa głównie kluczy imbusowych. Warto mieć pełen zestaw.

## Bonus: Organizer na śrubki
Uporządkowanie drobnych elementów oszczędza mnóstwo czasu.

## Gdzie kupić?

Większość narzędzi kupisz w Castoramie lub Leroy Merlin w Słupsku.
`,
    category: "narzedzia",
    author: "SkładaMy Team",
    readTime: 4,
    tags: [
      { label: "narzędzia", color: "#455A64" },
      { label: "poradnik", color: "#1976D2" },
      { label: "DIY", color: "#00897B" }
    ],
    featured: false,
    views: 0
  },
  {
    title: "Bezpieczeństwo podczas montażu mebli - Najważniejsze zasady",
    slug: "bezpieczenstwo-montaz-mebli-zasady",
    excerpt: "Montaż mebli wiąże się z ryzykiem kontuzji. Poznaj kluczowe zasady bezpieczeństwa, które ochronią Ciebie i Twoją rodzinę.",
    content: `
# Bezpieczeństwo podczas montażu mebli

## Przygotowanie przestrzeni

### Wyznacz strefę montażu
- Usuń dzieci i zwierzęta z pomieszczenia
- Zabezpiecz dywany i podłogi folią ochronną
- Zapewnij dobre oświetlenie

## Podstawowe zasady

### 1. Nigdy nie montuj sam wysokich mebli
Szafy, regały i wysokie meble zawsze wymagają co najmniej 2 osób.

### 2. Używaj rękawic ochronnych
Ostre krawędzie płyt mogą spowodować skaleczenia.

### 3. Przymocuj meble do ściany
To KLUCZOWE! Każdy wysoki mebel musi być przymocowany specjalnymi uchwytami.

## Montaż szaf - specjalne środki ostrożności

- Nie wchodź na drabinę trzymając ciężkie elementy
- Przy montażu drzwi przesuwnych uważaj na palce
- Sprawdź stabilność przed obciążeniem

## Dzieci w domu

Jeśli masz małe dzieci:
- Zawsze przymocuj meble do ściany
- Nie pozwalaj dzieciom wspinać się na szafy
- Zabezpiecz szuflady blokadami

## Kiedy wezwać profesjonalistów?

- Nie masz odpowiednich narzędzi
- Mebel jest bardzo duży lub ciężki
- Czujesz się niepewnie
- Masz problemy zdrowotne (plecy, serce)

## Kontakt
Zadzwoń do nas - zapewnimy bezpieczny i profesjonalny montaż!
`,
    category: "bezpieczenstwo",
    author: "SkładaMy Team",
    readTime: 6,
    tags: [
      { label: "bezpieczeństwo", color: "#C62828" },
      { label: "poradnik", color: "#1976D2" },
      { label: "dzieci", color: "#E91E63" }
    ],
    featured: false,
    views: 0
  },
  {
    title: "Trendy w meblach 2025 - Co będzie modne?",
    slug: "trendy-meble-2025",
    excerpt: "Poznaj największe trendy w urządzaniu wnętrz i meblach na rok 2025. Minimalizm, naturalne materiały i smart meble.",
    content: `
# Trendy w meblach 2025

## 1. Minimalizm japońskim stylem
Wabi-sabi i estetyka japońska dominują w 2025. Proste linie, naturalne drewno, spokojne kolory.

## 2. Zrównoważony rozwój
Meble z recyklingu, certyfikowane drewno, minimalna ilość plastiku.

## 3. Wielofunkcyjność
W małych mieszkaniach królują meble 2-w-1:
- Łóżka z szafami
- Biurka-konsole
- Rozkładane stoły

## 4. Ciepłe kolory
Wracają beże, brązy, terakota i ciepłe odcienie zieleni.

## 5. Smart meble
- Ładowanie bezprzewodowe w blatach
- Oświetlenie LED wbudowane
- Elektryczne mechanizmy podnoszenia

## Co to znaczy dla Słupska?

IKEA już wdraża te trendy. W naszym portfolio znajdziesz montaż najnowszych kolekcji:
- BESTÅ (modułowe systemy)
- BJÖRKSNÄS (naturalne drewno)
- IDANÄS (klasyka w nowoczesnym wydaniu)

## Inspiracje

Sprawdź nasze portfolio na Instagram: [@skladamy_slupsk](https://instagram.com)
`,
    category: "trendy",
    author: "SkładaMy Team",
    readTime: 5,
    tags: [
      { label: "trendy", color: "#9C27B0" },
      { label: "inspiracje", color: "#FF6F00" },
      { label: "2025", color: "#0097A7" }
    ],
    featured: false,
    views: 0
  },
  {
    title: "Jak urządzić małą sypialnię? 10 sprawdzonych trików",
    slug: "jak-urzadzic-mala-sypialnie-triki",
    excerpt: "Mała sypialnia to wyzwanie, ale nie problem! Zobacz 10 sprawdzonych sposobów na maksymalne wykorzystanie przestrzeni.",
    content: `
# Jak urządzić małą sypialnię?

## Problem małych sypialni w Słupsku
Wiele mieszkań w Słupsku, zwłaszcza w starszych blokach, ma niewielkie sypialnie. Nie oznacza to jednak, że musisz rezygnować z komfortu!

## 10 sprawdzonych trików

### 1. Łóżko z szufladami
IKEA MALM czy BRIMNES z szufladami to dodatkowe 2-3 komody miejsca!

### 2. Szafa do sufitu
Szafa PAX montowana pod sam sufit maksymalizuje przestrzeń pionową.

### 3. Jasne kolory
Biel i jasne beże optycznie powiększają pomieszczenie.

### 4. Lustro
Duże lustro naprzeciwko okna podwaja światło.

### 5. Minimalizm w dekoracjach
Mniej = więcej. Tylko niezbędne dekoracje.

### 6. Półki wiszące
Zamiast szafek nocnych - półki wiszące przy łóżku.

### 7. Multifunkcyjne meble
Stolik/biurko/toaletka 3-w-1.

### 8. Drzwi przesuwne
Szafa z drzwiami przesuwnymi nie zajmuje miejsca.

### 9. Oświetlenie punktowe
Kilka źródeł światła zamiast jednej lampy.

### 10. Schowki pod łóżkiem
Wykorzystaj każdy centymetr!

## Nasze doświadczenie

Montowaliśmy setki sypialni w małych mieszkaniach w Słupsku. Doradzimy najlepsze rozwiązania!

## Umów się na konsultację
Bezpłatna konsultacja przy montażu powyżej 300 zł.
`,
    category: "inspiracje",
    author: "SkładaMy Team",
    readTime: 7,
    tags: [
      { label: "inspiracje", color: "#FF6F00" },
      { label: "sypialnia", color: "#5E35B1" },
      { label: "małe wnętrza", color: "#00897B" }
    ],
    featured: true,
    views: 0
  }
];

console.log(`
╔════════════════════════════════════════╗
║   Blog Posts Seed - SkładaMy Słupsk   ║
╚════════════════════════════════════════╝

Utworzy ${blogPosts.length} artykułów blogowych.

Skopiuj i wklej te dane do Strapi CMS:
1. Otwórz: http://localhost:1337/admin
2. Przejdź do: Content Manager > Blog Posts
3. Kliknij: Create new entry
4. Wklej dane z każdego artykułu

════════════════════════════════════════
`);

blogPosts.forEach((post, index) => {
  console.log(`\n📝 ARTYKUŁ ${index + 1}: ${post.title}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Slug: ${post.slug}`);
  console.log(`Kategoria: ${post.category}`);
  console.log(`Czas czytania: ${post.readTime} min`);
  console.log(`Wyróżniony: ${post.featured ? 'TAK' : 'NIE'}`);
  console.log(`\nTagi:`);
  post.tags.forEach(tag => console.log(`  - ${tag.label} (${tag.color})`));
  console.log(`\nExcerpt:\n${post.excerpt}`);
  console.log(`\nContent:\n${post.content.substring(0, 200)}...`);
  console.log(`\n${'═'.repeat(60)}\n`);
});

console.log(`
✅ Gotowe! Dane artykułów są powyżej.

INSTRUKCJA IMPORTU:
1. Zaloguj się do CMS: http://localhost:1337/admin
2. Content Manager > Blog Posts > Create new entry
3. Dla każdego artykułu:
   - Wklej tytuł (slug wygeneruje się automatycznie)
   - Wklej excerpt
   - Wklej content
   - Wybierz kategorię
   - Ustaw readTime
   - Dodaj tagi (każdy tag osobno)
   - Zaznacz "featured" jeśli TAK
   - Kliknij "Publish"

📧 Potrzebujesz pomocy? kontakt@skladamy.pl
`);

// Export for programmatic use
module.exports = { blogPosts };
