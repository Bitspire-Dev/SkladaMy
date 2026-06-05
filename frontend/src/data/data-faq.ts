export interface FAQData {
  id: number;
  question: string;
  answer: string;
  category: "cennik" | "montaz" | "ogolne" | "gwarancja" | "dojazd";
  order: number;
  featured: boolean;
}

export const faqItems: FAQData[] = [
  {
    id: 1,
    question: "Ile kosztuje montaż szafy PAX z IKEA?",
    answer:
      "Ceny zaczynają się od 150 zł za prostą szafę 2-drzwiową PAX. Szafy 3-drzwiowe to koszt od 200-250 zł, a duże garderoby z wieloma akcesoriami od 300-400 zł. Wycena jest zawsze bezpłatna i ustalana przed montażem.",
    category: "cennik",
    order: 1,
    featured: true,
  },
  {
    id: 2,
    question: "Ile czasu zajmuje montaż szafy PAX?",
    answer:
      "Standardowa szafa PAX 2-drzwiowa to około 2-3 godziny montażu wraz z kotwieniem. Większe szafy 3-4 drzwiowe to 4-5 godzin. Czas zależy od ilości półek, szuflad i dodatkowych elementów jak KOMPLEMENT.",
    category: "montaz",
    order: 2,
    featured: true,
  },
  {
    id: 3,
    question: "Czy montujecie kuchnie IKEA?",
    answer:
      "Tak, specjalizujemy się w montażu kuchni IKEA - METOD, KNOXHULT, BODARP i inne. Montujemy szafki, blaty, fronty, uchwyty oraz AGD. Ceny kuchni od 400 zł w zależności od rozmiaru i skomplikowania.",
    category: "montaz",
    order: 3,
    featured: true,
  },
  {
    id: 4,
    question: "Jak przygotować mieszkanie przed montażem?",
    answer:
      "Przed naszym przyjazdem: rozpakuj wszystkie elementy i sprawdź kompletność, przygotuj miejsce do pracy (około 3m² na mebl), zapewnij dostęp do gniazdka i oczyść ścianę do kotwienia.",
    category: "ogolne",
    order: 4,
    featured: true,
  },
  {
    id: 5,
    question: "W jakich ścianach można kotwić ciężkie szafy?",
    answer:
      "Kotwię w ścianach betonowych, ceglanych pełnych, z pustaków ceramicznych oraz w ścianach z płyt GK (z wzmocnieniem). Zawsze sprawdzamy nośność podłoża i dobieramy odpowiednie kotwy.",
    category: "montaz",
    order: 5,
    featured: false,
  },
  {
    id: 6,
    question: "Czy dojazd w Słupsku jest bezpłatny?",
    answer:
      "Tak, dojazd w obrębie Słupska i najbliższych okolic (do 15km) jest bezpłatny. Dla dalszych miejscowości ustalamy indywidualnie, ale zawsze uczciwie.",
    category: "dojazd",
    order: 6,
    featured: true,
  },
  {
    id: 7,
    question: "Jaką gwarancję oferujecie na montaż?",
    answer:
      "Oferujemy 30-dniową gwarancję na wszystkie nasze usługi montażowe. Jeśli coś się poluzuje lub nie będzie działać prawidłowo, poprawimy to bezpłatnie. Posiadamy również ubezpieczenie OC.",
    category: "gwarancja",
    order: 7,
    featured: true,
  },
  {
    id: 8,
    question: "Czy montujecie mangle i pralki w zabudowie?",
    answer:
      "Nie montujemy AGD bezpośrednio, ale przygotowujemy zabudowę kuchenną pod pralki, zmywarki i inne urządzenia. Samo podłączenie AGD zostaw fachowcom od instalacji.",
    category: "montaz",
    order: 8,
    featured: false,
  },
  {
    id: 9,
    question: "Jak szybko można umówić się na montaż?",
    answer:
      "Zazwyczaj jesteśmy dostępni w ciągu 1-3 dni roboczych. W weekendy też pracujemy. Najszybciej umów się telefonicznie - odpowiadamy w ciągu kilku godzin.",
    category: "ogolne",
    order: 9,
    featured: false,
  },
  {
    id: 10,
    question: "Czy sprzątacie po montażu?",
    answer:
      "Tak, zawsze sprzątamy po sobie. Wynosimy opakowania, odkurzamy wióry i zostawiamy mieszkanie w czystości. To standard naszej pracy - nie musisz się o to martwić.",
    category: "ogolne",
    order: 10,
    featured: false,
  },
];
