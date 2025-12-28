import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatPhoneForTel } from "@/lib/company-data";

export default function HeroSection() {
  return (
  <section className="relative isolate overflow-hidden bg-neutral-900 min-h-[680px] sm:min-h-[720px] flex items-center">
      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        {/* LCP background image: AVIF first, fallback do WEBP. Nie używamy <Image> wewnątrz <picture>, aby zachować poprawną strukturę (tylko <source> + <img>). */}
        <picture>
          <source srcSet="/osoby-o-niskim-kacie-pracujace-z-wiertlem.avif" type="image/avif" />
          <source srcSet="/osoby-o-niskim-kacie-pracujace-z-wiertlem.webp" type="image/webp" />
          <img
            src="/osoby-o-niskim-kacie-pracujace-z-wiertlem.webp"
            alt="Montażyści przy pracy z wiertarką - montaż mebli"
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/64 to-white/40" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.25)_100%)] mix-blend-multiply pointer-events-none" />

        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-12"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid-hero" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-hero)" />
        </svg>
      </div>

  <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Hero headline */}
          <h1 id="hero-heading" className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Montaż mebli w <span className="text-[#FFC400]">Słupsku</span>
            <br className="hidden sm:block" /> bez stresu i w terminie
          </h1>
          
          {/* Hero subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-900">
            ⭐ <strong>Profesjonalnie składamy meble IKEA</strong>, wieszamy szafki kuchenne i kotwimy w każdej ścianie. <strong>Gwarancja 30 dni</strong>, porządek po montażu i <strong>bezpłatna wycena</strong> tego samego dnia.
          </p>

          {/* Trust indicators inline */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-neutral-900">
            <span className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 shadow-sm">
              ✓ <strong>300+</strong> zadowolonych klientów
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 shadow-sm">
              ✓ <strong>Gwarancja 30 dni</strong>
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 shadow-sm">
              ✓ <strong>Dojazd w 24h</strong>
            </span>
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="text-lg px-8 shadow-md bg-[#FFC400] hover:bg-[#f2b800] text-neutral-900">
              <a href={`tel:${formatPhoneForTel()}`} aria-label="Zadzwoń i umów bezpłatną wycenę">
                <Phone className="mr-2 h-5 w-5 text-neutral-900" />
                Zadzwoń - bezpłatna wycena
              </a>
            </Button>

            {/* Simplified solid white pill for immediate readability */}
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-white/95 text-neutral-900 border-transparent shadow-sm">
              <Link href="/kontakt" aria-label="Wyślij zapytanie przez formularz kontaktowy">
                <Mail className="mr-2 h-5 w-5 text-neutral-900" />
                Wyślij zapytanie
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center rounded-lg bg-white/95 px-6 py-5 ring-1 ring-black/5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <div className="rounded-full bg-[#FFC400]/20 p-3">
                <div className="h-6 w-6 rounded-full bg-[#FFC400]" />
              </div>
              <h2 className="mt-3 text-sm font-semibold text-neutral-900">Szybkie terminy</h2>
              <p className="mt-1 text-sm text-neutral-700">Najczęściej montujemy w ciągu 1–3 dni</p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-white/95 px-6 py-5 ring-1 ring-black/5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <div className="rounded-full bg-[#FFC400]/20 p-3">
                <div className="h-6 w-6 rounded-full bg-[#FFC400]" />
              </div>
              <h2 className="mt-3 text-sm font-semibold text-neutral-900">Gwarancja 30 dni</h2>
              <p className="mt-1 text-sm text-neutral-700">Poprawki w gwarancji bez dodatkowych kosztów</p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-white/95 px-6 py-5 ring-1 ring-black/5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <div className="rounded-full bg-[#FFC400]/20 p-3">
                <div className="h-6 w-6 rounded-full bg-[#FFC400]" />
              </div>
              <h2 className="mt-3 text-sm font-semibold text-neutral-900">Porządek po montażu</h2>
              <p className="mt-1 text-sm text-neutral-700">Sprzątamy po sobie, zabieramy opakowania</p>
            </div>
          </div>

          {/* Service area indicator */}
          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-900">
              Obsługujemy Słupsk i okolice
              <Link href="/slupsk" className="ml-2 inline-flex items-center font-medium text-[#FFC400] hover:underline">
                Zobacz szczegóły
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
