import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapPin, Clock, Star, Phone, Mail, CheckCircle, Users, Award, Shield } from "lucide-react";
import Link from "next/link";
import { COMPANY_CONFIG, formatPhoneForTel, getSiteUrl } from "@/lib/config";
import LazyComponent from "@/components/ui/LazyComponent";
import Image from "next/image";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Montaż mebli Słupsk - Składanie mebli IKEA | SkładaMy",
  description:
    "⭐ Montaż mebli w Słupsku ✓ Szafy PAX ✓ Kuchnie IKEA ✓ Gwarancja 30 dni ✓ Doświadczenie 300+ realizacji ✓ Dojazd w 24h ✓ Bezpłatna wycena",
  keywords: [
    "montaż mebli Słupsk",
    "składanie mebli IKEA Słupsk",
    "montaż szafy PAX Słupsk",
    "montaż kuchni Słupsk",
    "monterzy mebli Słupsk",
    "usługi montażowe Słupsk",
    "składanie mebli pomorskie",
    "montaż garderoby Słupsk",
  ],
  openGraph: {
    title: "Montaż mebli Słupsk - Składanie mebli IKEA",
    description:
      "⭐ Najlepsi monterzy mebli w Słupsku. 300+ zadowolonych klientów. Gwarancja 30 dni. Bezpłatna wycena w 24h.",
    url: `${siteUrl}/slupsk`,
    siteName: "SkładaMy",
    locale: "pl_PL",
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/slupsk`,
  },
};

const areas = [
  "Słupsk Centrum",
  "Osiedle Akademickie",
  "Osiedle Zatorze",
  "Osiedle Westerplatte",
  "Osiedle Młodych",
  "Kobylnica",
  "Redzikowo",
  "Ustka",
  "Łeba",
  "Smołdzino",
  "Wicko",
  "Damnicy",
];

const testimonials = [
  {
    name: "Małgorzata K.",
    location: "Słupsk - Centrum",
    rating: 5,
    text: "Szybko, profesjonalnie i w dobrej cenie. Szafa PAX w sypialni wygląda jak z wystawy. Bardzo polecam!",
    service: "Montaż szafy PAX",
  },
  {
    name: "Tomasz W.",
    location: "Słupsk - Zatorze",
    rating: 5,
    text: "Punktualność i fachowość na najwyższym poziomie. Kuchnia zamontowana w rekordowym czasie.",
    service: "Montaż kuchni KNOXHULT",
  },
  {
    name: "Anna M.",
    location: "Słupsk - Akademickie",
    rating: 5,
    text: "Bardzo miła obsługa i świetna jakość wykonania. Meble stoją już rok i działają bez zarzutu.",
    service: "Meble łazienkowe GODMORGON",
  },
];

const stats = [
  { number: "300+", label: "Zadowolonych klientów w Słupsku" },
  { number: "4", label: "Lata doświadczenia w regionie" },
  { number: "24h", label: "Średni czas odpowiedzi na zapytanie" },
  { number: "4.9/5", label: "Średnia ocen od klientów" },
];

const whyUs = [
  {
    icon: Users,
    title: "Lokalni fachowcy",
    description: "Znamy Słupsk i okolice. Szybki dojazd do każdej dzielnicy miasta.",
  },
  {
    icon: Award,
    title: "Doświadczenie",
    description: "Ponad 300 zrealizowanych projektów w Słupsku i powiatach ościennych.",
  },
  {
    icon: Shield,
    title: "Gwarancja jakości",
    description: "30-dniowa gwarancja na wszystkie usługi montażowe. Ubezpieczenie OC.",
  },
  {
    icon: Clock,
    title: "Terminowość",
    description: "Dotrzymujemy ustalonych terminów. Większość montaży w ciągu 1-2 dni.",
  },
];

/* eslint-disable max-lines-per-function */
export default function SlupskPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 border-b border-neutral-200 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/layout/ratusz-slupsk.png"
              alt="Ratusz w Słupsku - tło"
              fill
              priority
              sizes="100vw"
              className="brightness-75"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          {/* semi-transparent white overlay for readability */}
          <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 mb-4">
                <MapPin className="h-4 w-4 text-[#6a4a00]" />
                Słupsk i okolice
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl mb-4">
                Montaż mebli <span className="text-[#6a4a00]">Słupsk</span>
              </h1>

              <p className="text-lg sm:text-xl text-neutral-800 max-w-3xl mx-auto leading-relaxed mb-8">
                ⭐ <strong>Profesjonalny montaż mebli IKEA w Słupsku</strong> - 300+ zadowolonych
                klientów, gwarancja 30 dni, dojazd w 24h. Specjaliści od szaf PAX i kuchni.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FFC400] text-neutral-900 hover:bg-[#f2b800] shadow-sm"
                >
                  <Link href="/kontakt" aria-label="Przejdź do formularza kontaktowego">
                    <Phone className="mr-2 h-5 w-5" />
                    Bezpłatna wycena - 24h
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                >
                  <a href={`tel:${formatPhoneForTel()}`} aria-label="Zadzwoń do nas">
                    Zadzwoń: {COMPANY_CONFIG.phone}
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-700">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Gwarancja 30 dni
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Ubezpieczenie OC
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Dojazd tego samego dnia
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}

        {/* Why Us Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Dlaczego klienci w Słupsku wybierają SkładaMy?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUs.map((item, index) => (
                <Card
                  key={index}
                  className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-200 bg-white">
                      <item.icon className="h-8 w-8 text-[#6a4a00]" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">{item.title}</h3>
                    <p className="text-neutral-800 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                SkładaMy w liczbach - Słupsk
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[#FFC400] mb-1">{stat.number}</div>
                  <div className="text-sm text-neutral-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <LazyComponent threshold={0.1} rootMargin="150px">
          <section className="py-20 bg-neutral-50 border-y border-neutral-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                  Obszar działania - Słupsk i okolice
                </h2>
                <p className="text-neutral-800 max-w-2xl mx-auto">
                  Dojeżdżamy na montaż mebli w całym Słupsku oraz w promieniu 30km od miasta. Dojazd
                  w obrębie miasta jest bezpłatny.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {areas.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-white rounded-lg border border-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <MapPin className="h-4 w-4 text-[#6a4a00] mr-2 shrink-0" />
                    <span className="text-sm text-neutral-800">{area}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-neutral-700">
                  Nie widzisz swojej miejscowości?{" "}
                  <Link href="/kontakt" className="text-[#6a4a00] hover:underline">
                    Zapytaj nas
                  </Link>{" "}
                  - być może również do Ciebie dojedziemy!
                </p>
              </div>
            </div>
          </section>
        </LazyComponent>

        {/* Testimonials */}
        <LazyComponent threshold={0.1} rootMargin="200px">
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                  Opinie klientów ze Słupska
                </h2>
                <p className="text-neutral-800">Sprawdź co mówią o nas mieszkańcy Słupska</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "text-[#FFC400] fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>

                      <blockquote className="text-neutral-800 text-sm mb-4 italic">
                        &ldquo;{testimonial.text}&rdquo;
                      </blockquote>

                      <div className="text-sm">
                        <div className="font-medium text-neutral-900">{testimonial.name}</div>
                        <div className="text-neutral-700">{testimonial.location}</div>
                        <div className="text-[#6a4a00] text-xs mt-1">{testimonial.service}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  asChild
                  variant="outline"
                  className="border-neutral-300 text-neutral-900 hover:bg-neutral-50"
                >
                  <Link href="/portfolio" aria-label="Zobacz realizacje i więcej opinii">
                    Zobacz więcej opinii i realizacji
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </LazyComponent>

        {/* FAQ Section */}
        <LazyComponent threshold={0.1} rootMargin="250px">
          <section className="py-20 bg-neutral-50 border-t border-neutral-200">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                  Najczęściej zadawane pytania - Słupsk
                </h2>
              </div>

              <div className="space-y-6">
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      Czy dojeżdżacie na montaż w całym Słupsku?
                    </h3>
                    <p className="text-neutral-800 text-sm">
                      Tak, obsługujemy wszystkie dzielnice Słupska: Centrum, Akademickie, Zatorze,
                      Westerplatte, Młodych oraz okoliczne miejscowości jak Kobylnica, Redzikowo czy
                      Ustka.
                    </p>
                  </CardContent>
                </Card>

                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      Ile kosztuje dojazd w obrębie Słupska?
                    </h3>
                    <p className="text-neutral-800 text-sm">
                      Dojazd w obrębie miasta jest bezpłatny. Za miejscowości w promieniu do 30km
                      pobieramy dodatkową opłatę 1zł/km w jedną stronę.
                    </p>
                  </CardContent>
                </Card>

                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      Jak szybko możecie przyjechać na montaż w Słupsku?
                    </h3>
                    <p className="text-neutral-800 text-sm">
                      W większości przypadków możemy przyjechać już następnego dnia. W weekendy i
                      sezonie (wrzesień-listopad) może być potrzeba odczekania 2-3 dni.
                    </p>
                  </CardContent>
                </Card>

                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      Czy montujecie meble które nie są z IKEA?
                    </h3>
                    <p className="text-neutral-800 text-sm">
                      Tak, montujemy meble wszystkich marek. IKEA to nasza specjalność, ale chętnie
                      zajmiemy się również meblami z innych sklepów jak Jysk, Black Red White czy
                      BRW.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </LazyComponent>

        {/* Final CTA */}
        <LazyComponent threshold={0.1} rootMargin="300px">
          <section className="py-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="text-center bg-[#FFC400] rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Gotowy na montaż mebli w Słupsku?
                </h2>
                <p className="text-neutral-900/80 mb-6 max-w-2xl mx-auto">
                  Skontaktuj się z nami już dziś i umów bezpłatną wycenę. Odpowiadamy w ciągu 24h,
                  montaż możliwy już jutro!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200"
                  >
                    <Link href="/kontakt" aria-label="Przejdź do formularza kontaktowego">
                      <Mail className="mr-2 h-5 w-5" />
                      Formularz kontaktowy
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/60 text-neutral-900 hover:bg-white/20"
                  >
                    <a href={`tel:${formatPhoneForTel()}`} aria-label="Zadzwoń do nas">
                      <Phone className="mr-2 h-5 w-5" />
                      {COMPANY_CONFIG.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </LazyComponent>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
