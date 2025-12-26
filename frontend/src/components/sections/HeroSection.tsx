import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatPhoneForTel } from "@/lib/company-data";
import { designFlags } from "@/lib/design-flags";

export default function HeroSection() {
  return (
  <section className={`relative isolate overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 ${designFlags.hero.minHeights ? 'min-h-[700px] sm:min-h-[750px]' : ''} flex items-center`}>
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

        {designFlags.hero.whiteGradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/70 to-white/50" />
        )}

        {designFlags.hero.vignette && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.25)_100%)] mix-blend-multiply pointer-events-none" />
        )}

        {designFlags.hero.gridOverlay && (
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
        )}
      </div>

  <div className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Hero headline */}
          <h1 id="hero-heading" className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-tight">
            Montaż mebli w <span className="gradient-text">Słupsku</span>
            <br className="hidden sm:block" /> bez stresu i w terminie
          </h1>
          
          {/* Hero subtext */}
          <p className="mx-auto mt-7 max-w-2xl text-xl leading-relaxed text-neutral-800 font-medium">
            ⭐ <strong className="font-bold">Profesjonalnie składamy meble IKEA</strong>, wieszamy szafki kuchenne i kotwimy w każdej ścianie. <strong className="font-bold">Gwarancja 30 dni</strong>, porządek po montażu i <strong className="font-bold">bezpłatna wycena</strong> tego samego dnia.
          </p>

          {/* Trust indicators inline */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-neutral-900">
            <span className="flex items-center gap-2 rounded-full glass-effect px-4 py-2 shadow-premium font-semibold">
              ✓ <strong>300+</strong> zadowolonych klientów
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 shadow-sm">
              ✓ <strong>Gwarancja 30 dni</strong>
            </span>
            <span className="flex items-center gap-2 rounded-full glass-effect px-4 py-2 shadow-premium font-semibold">
              ✓ <strong>Dojazd w 24h</strong>
            </span>
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="text-lg px-10 py-6 shadow-premium hover:shadow-premium-hover bg-gradient-to-r from-primary to-[#FF8A00] text-neutral-900 font-bold transition-smooth">
              <a href={`tel:${formatPhoneForTel()}`} aria-label="Zadzwoń i umów bezpłatną wycenę">
                <Phone className="mr-2 h-5 w-5 text-neutral-900" />
                Zadzwoń - bezpłatna wycena
              </a>
            </Button>

            {/* Simplified solid white pill for immediate readability */}
            <Button asChild variant="outline" size="lg" className="text-lg px-10 py-6 glass-effect text-neutral-900 border-white/30 shadow-premium hover:shadow-premium-hover transition-smooth font-semibold">
              <Link href="/kontakt" aria-label="Wyślij zapytanie przez formularz kontaktowy">
                <Mail className="mr-2 h-5 w-5 text-neutral-900" />
                Wyślij zapytanie
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center rounded-2xl glass-effect px-6 py-6 ring-1 ring-white/20 shadow-premium transition-smooth hover:-translate-y-3 hover:shadow-premium-hover cursor-pointer">
              <div className="rounded-full bg-gradient-to-br from-primary/30 to-[#FF8A00]/20 p-4">
                <div className="h-7 w-7 rounded-full bg-gradient-to-r from-primary to-[#FF8A00]" />
              </div>
              <h2 className="mt-4 text-base font-bold text-neutral-900">Szybkie terminy</h2>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">Najczęściej montujemy w ciągu 1–3 dni</p>
            </div>

            <div className="flex flex-col items-center rounded-2xl glass-effect px-6 py-6 ring-1 ring-white/20 shadow-premium transition-smooth hover:-translate-y-3 hover:shadow-premium-hover cursor-pointer">
              <div className="rounded-full bg-gradient-to-br from-primary/30 to-[#FF8A00]/20 p-4">
                <div className="h-7 w-7 rounded-full bg-gradient-to-r from-primary to-[#FF8A00]" />
              </div>
              <h2 className="mt-4 text-base font-bold text-neutral-900">Gwarancja 30 dni</h2>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">Poprawki w gwarancji bez dodatkowych kosztów</p>
            </div>

            <div className="flex flex-col items-center rounded-2xl glass-effect px-6 py-6 ring-1 ring-white/20 shadow-premium transition-smooth hover:-translate-y-3 hover:shadow-premium-hover cursor-pointer">
              <div className="rounded-full bg-gradient-to-br from-primary/30 to-[#FF8A00]/20 p-4">
                <div className="h-7 w-7 rounded-full bg-gradient-to-r from-primary to-[#FF8A00]" />
              </div>
              <h2 className="mt-4 text-base font-bold text-neutral-900">Porządek po montażu</h2>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">Sprzątamy po sobie, zabieramy opakowania</p>
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
