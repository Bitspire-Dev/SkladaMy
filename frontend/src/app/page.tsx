import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import BelowFold from "@/components/sections/BelowFold";

export const metadata: Metadata = {
  title: "SkładaMy - Profesjonalny montaż mebli IKEA w Słupsku | Gwarancja 30 dni",
  description: "⭐ Najlepszy montaż mebli IKEA w Słupsku ✓ Szafy PAX ✓ Kuchnie ✓ Gwarancja 30 dni ✓ 300+ zadowolonych klientów ✓ Dojazd w 24h ✓ Bezpłatna wycena",
  keywords: [
    "montaż mebli Słupsk",
    "składanie mebli IKEA Słupsk", 
    "montaż szafy PAX Słupsk",
    "montaż kuchni IKEA Słupsk",
    "wieszanie szafek Słupsk",
    "kotwienie ściany Słupsk",
    "monterzy mebli Słupsk",
    "usługi montażowe Słupsk"
  ],
  alternates: {
    canonical: "https://skladamy.pl"
  },
  openGraph: {
    title: "SkładaMy - Profesjonalny montaż mebli IKEA w Słupsku",
    description: "⭐ Najlepszy montaż mebli IKEA w Słupsku ✓ 300+ zadowolonych klientów ✓ Gwarancja 30 dni ✓ Dojazd w 24h",
    url: "https://skladamy.pl",
    siteName: "SkładaMy",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/SkładaMy.svg",
        width: 160,
        height: 40,
        alt: "SkładaMy - Montaż mebli Słupsk",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkładaMy - Profesjonalny montaż mebli IKEA w Słupsku",
    description: "⭐ Najlepszy montaż mebli IKEA w Słupsku ✓ 300+ zadowolonych klientów ✓ Gwarancja 30 dni",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <BelowFold />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
