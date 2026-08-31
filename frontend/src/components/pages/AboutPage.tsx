import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import BulletList from "@/components/ui/BulletList";
import { Button } from "@/components/ui/Button";
import { Shield, Clock, Users, Award, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { COMPANY_CONFIG, formatPhoneForTel, getSiteUrl } from "@/lib/config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "O nas - Doświadczeni monterzy mebli Słupsk | SkładaMy",
  description:
    "⭐ Poznaj zespół SkładaMy ✓ 4 lata doświadczenia ✓ 300+ zadowolonych klientów ✓ Gwarancja 30 dni ✓ Ubezpieczenie OC ✓ Specjaliści od mebli IKEA",
  keywords: [
    "o firmie SkładaMy Słupsk",
    "monterzy mebli IKEA Słupsk",
    "doświadczenie montaż mebli",
    "gwarancja montażu Słupsk",
    "ubezpieczenie monterzy",
    "zespół SkładaMy",
  ],
  alternates: {
    canonical: `${siteUrl}/o-nas`,
  },
  openGraph: {
    title: "O nas - Doświadczeni monterzy mebli Słupsk | SkładaMy",
    description:
      "⭐ Poznaj zespół SkładaMy ✓ 4 lata doświadczenia ✓ 300+ zadowolonych klientów ✓ Gwarancja 30 dni",
    url: `${siteUrl}/o-nas`,
    siteName: "SkładaMy",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O nas - Doświadczeni monterzy mebli Słupsk | SkładaMy",
    description: "⭐ Poznaj zespół SkładaMy ✓ 4 lata doświadczenia ✓ 300+ zadowolonych klientów",
  },
};

const teamValues = [
  {
    icon: Shield,
    title: "Gwarancja i bezpieczeństwo",
    description:
      "Każdy montaż objęty 30-dniową gwarancją. Pracujemy z ubezpieczeniem OC na kwotę 100 000 zł.",
  },
  {
    icon: Clock,
    title: "Punktualność",
    description:
      "Szanujemy Państwa czas. Przyjeżdżamy punktualnie w umówionym terminie i kończymy zgodnie z planem.",
  },
  {
    icon: Users,
    title: "Zaufanie klientów",
    description:
      "Ponad 300 zadowolonych klientów w Słupsku i okolicach. Większość zleceń to polecenia od znajomych.",
  },
  {
    icon: Award,
    title: "Doświadczenie",
    description:
      "Od 2020 roku specjalizujemy się w montażu mebli IKEA. Znamy wszystkie ich systemy na pamięć.",
  },
];

const guaranteeDetails = [
  {
    title: "Gwarancja 30 dni",
    description: "Jeśli coś się rozluzuje przy normalnym użytkowaniu - naprawiamy za darmo",
    included: [
      "Ponowne dokręcenie śrub",
      "Wymiana uszkodzonych elementów",
      "Sprawdzenie stabilności",
      "Regulacja frontów i szuflad",
    ],
  },
  {
    title: "Wykluczenia gwarancyjne",
    description: "Gwarancja nie obejmuje sytuacji poza normalnym użytkowaniem",
    included: [
      "Uszkodzenia mechaniczne",
      "Przeciążenia ponad normę",
      "Przeróbki przez inne osoby",
      "Zalania czy zawilgocenia",
    ],
  },
];

/* eslint-disable max-lines-per-function */
export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="relative py-20 overflow-hidden bg-neutral-50 isolate">
        {/* Decorative background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(600px circle at 90% -10%, rgba(255,196,0,0.18), rgba(255,196,0,0) 60%), radial-gradient(700px circle at -10% 110%, rgba(255,196,0,0.16), rgba(255,196,0,0) 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0",
            maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 z-0"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0))",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 mb-4">
              <span className="inline-block size-1.5 rounded-full bg-[#FFC400]" />
              Poznaj nas lepiej
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl mb-4">
              O firmie SkładaMy
            </h1>
            <p className="text-lg sm:text-xl text-neutral-800 max-w-3xl mx-auto leading-relaxed">
              Jesteśmy zespołem doświadczonych monterów specjalizujących się w montażu mebli w
              Słupsku i okolicach. Naszą pasją jest tworzenie funkcjonalnych przestrzeni bez stresu
              dla naszych klientów.
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Nasza historia</h2>
                <div className="space-y-4 text-neutral-800">
                  <p>
                    SkładaMy powstało w 2020 roku z prostej obserwacji - coraz więcej osób kupuje
                    meble do samodzielnego montażu, ale nie każdy ma czas, narzędzia czy ochotę na
                    wielogodzinne zmagania z instrukcjami.
                  </p>
                  <p>
                    Zaczęliśmy od pomagania znajomym w montażu szaf PAX z IKEA. Szybko okazało się,
                    że nasze doświadczenie i podejście do jakości są bardzo cenione. W naturalny
                    sposób przekształciliśmy hobby w profesjonalną działalność.
                  </p>
                  <p>
                    Dziś montujemy wszystkie typy mebli, ale IKEA pozostaje naszą specjalnością.
                    Znamy każdy system, każdy typ śruby i każdą sztuczkę, która przyspiesza pracę
                    bez kompromisów w jakości.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl p-8 border border-neutral-200 bg-white shadow-sm">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">SkładaMy w liczbach</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FFC400] mb-1">300+</div>
                    <div className="text-sm text-neutral-700">Zadowolonych klientów</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FFC400] mb-1">4</div>
                    <div className="text-sm text-neutral-700">Lata doświadczenia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FFC400] mb-1">4.9</div>
                    <div className="text-sm text-neutral-700">Średnia ocen (5.0)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FFC400] mb-1">1-3</div>
                    <div className="text-sm text-neutral-700">Dni realizacji</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              Dlaczego warto nam zaufać?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamValues.map((value, index) => (
                <Card
                  key={index}
                  className="text-center h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-200 bg-white">
                      <value.icon className="h-8 w-8 text-[#6a4a00]" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">{value.title}</h3>
                    <p className="text-neutral-800 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Guarantee Section */}
          <div className="mb-20" id="gwarancja">
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              Gwarancja i warunki świadczenia usług
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {guaranteeDetails.map((section, index) => (
                <Card
                  key={index}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <p className="text-neutral-700">{section.description}</p>
                  </CardHeader>
                  <CardContent>
                    <BulletList items={section.included} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              Jak pracujemy?
            </h2>
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FFC400] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-neutral-900 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Przygotowanie</h3>
                  <p className="text-sm text-neutral-700">
                    Sprawdzamy kompletność paczek, planujemy kolejność montażu, przygotowujemy
                    narzędzia
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FFC400] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-neutral-900 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Montaż</h3>
                  <p className="text-sm text-neutral-700">
                    Składamy meble zgodnie z instrukcją, kotwimy do ściany, sprawdzamy stabilność i
                    funkcjonalność
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FFC400] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-neutral-900 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Odbiór</h3>
                  <p className="text-sm text-neutral-700">
                    Sprzątamy po sobie, odbieramy pracę z klientem, udzielamy wskazówek dotyczących
                    użytkowania
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center bg-[#FFC400] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Gotowy na montaż bez stresu?
            </h2>
            <p className="text-neutral-900/80 mb-6 max-w-2xl mx-auto">
              Skontaktuj się z nami już dziś. Odpowiadamy tego samego dnia z bezpłatną wyceną
              dostosowaną do Twoich potrzeb.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200"
              >
                <a href={`tel:${formatPhoneForTel()}`} aria-label="Zadzwoń do nas">
                  <Phone className="mr-2 h-5 w-5" />
                  {COMPANY_CONFIG.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 text-neutral-900 hover:bg-white/20"
              >
                <Link href="/kontakt" aria-label="Przejdź do formularza kontaktowego">
                  <Mail className="mr-2 h-5 w-5" />
                  Formularz kontaktowy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
