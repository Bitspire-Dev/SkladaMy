export interface TestimonialData {
  id: number;
  clientName: string;
  content: string;
  rating: number;
  location: string;
  serviceType: string;
  completionDate: string;
  featured: boolean;
  verified: boolean;
}

export const testimonials: TestimonialData[] = [
  {
    id: 1,
    clientName: "Anna Kowalska",
    content:
      "Bardzo profesjonalna obsługa! Szafa PAX 3-drzwiowa została zmontowana w 2,5 godziny. Panowie przyszli punktualnie, pracowali czysto i pozostawili mieszkanie w idealnym porządku. Polecam serdecznie!",
    rating: 5,
    location: "Słupsk - Centrum",
    serviceType: "szafy-pax",
    completionDate: "2024-12-15",
    featured: true,
    verified: true,
  },
  {
    id: 2,
    clientName: "Michał Nowak",
    content:
      "Kompletny montaż kuchni IKEA METOD z AGD. Wszystko dopasowane idealnie, nawet najtrudniejsze fragmenty przy rurach. Fachowa obsługa, uczciwa cena. Zdecydowanie skorzystam ponownie!",
    rating: 5,
    location: "Słupsk - Zatorze",
    serviceType: "kuchnie",
    completionDate: "2024-12-10",
    featured: true,
    verified: true,
  },
  {
    id: 3,
    clientName: "Katarzyna Wiśniewska",
    content:
      "Montaż kompletu mebli łazienkowych GODMORGON. Precyzyjna praca, wszystkie szafki idealnie wypoziomowane. Bardzo miła ekipa, na czasie i w budżecie. Gorąco polecam!",
    rating: 5,
    location: "Słupsk - Akademickie",
    serviceType: "lazienka",
    completionDate: "2024-12-08",
    featured: true,
    verified: true,
  },
  {
    id: 4,
    clientName: "Tomasz Jankowski",
    content:
      "Montaż biurka BEKANT i regałów BILLY. Szybko, sprawnie i bez śmieci. Panowie mają doświadczenie i widać, że wiedzą co robią. Cena uczciwa, jakość na najwyższym poziomie.",
    rating: 5,
    location: "Słupsk - Kobylnica",
    serviceType: "biuro",
    completionDate: "2024-12-05",
    featured: false,
    verified: true,
  },
  {
    id: 5,
    clientName: "Agnieszka Dąbrowska",
    content:
      "Garderoba PAX z lustrem i szufladami. Montaż trwał 4 godziny, ale rezultat jest perfekcyjny. Polecili też jak najlepiej wykorzystać przestrzeń. Bardzo zadowolona!",
    rating: 5,
    location: "Ustka",
    serviceType: "szafy-pax",
    completionDate: "2024-12-01",
    featured: true,
    verified: true,
  },
  {
    id: 6,
    clientName: "Piotr Zieliński",
    content:
      "Montaż mebli dziecięcych STUVA i łóżka KURA. Panowie bardzo cierpliwi, wszystko wytłumaczyli. Dzieci zachwycone nowym pokojem. Serdecznie polecam!",
    rating: 5,
    location: "Słupsk - Młodych",
    serviceType: "sypialnia",
    completionDate: "2024-11-15",
    featured: false,
    verified: true,
  },
];
