import { Button } from "@/components/ui/Button";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { formatPhoneForTel } from "@/lib/config";

const FinalCTASection = memo(() => {
  return (
    <section className="py-16 bg-[#FFC400]" aria-labelledby="final-cta-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="final-cta-heading"
          className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-6"
        >
          Gotowy na montaż bez stresu?
        </h2>
        <p className="text-xl text-neutral-900/90 mb-8 max-w-2xl mx-auto">
          Skontaktuj się z nami już dziś i otrzymaj bezpłatną wycenę. Odpowiadamy tego samego dnia,
          montujemy w ciągu 1-3 dni.
        </p>

        {/* Main CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-4 bg-white text-neutral-900 hover:bg-neutral-50 rounded-md border border-neutral-200 shadow-sm"
          >
            <a
              href={`tel:${formatPhoneForTel()}`}
              aria-label={`Zadzwoń teraz pod numer ${formatPhoneForTel()}`}
            >
              <Phone className="mr-2 h-5 w-5 text-neutral-900" aria-hidden="true" />
              Zadzwoń: 780 926 993
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-4 bg-transparent text-neutral-900 hover:bg-neutral-900/5 rounded-md border border-neutral-900/30"
          >
            <Link href="/kontakt" aria-label="Przejdź do formularza kontaktowego">
              <Mail className="mr-2 h-5 w-5 text-neutral-900" aria-hidden="true" />
              Formularz kontaktowy
            </Link>
          </Button>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto text-neutral-900/80">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Odpowiedź tego samego dnia</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Słupsk i okolice</span>
          </div>
        </div>

        {/* Trust signals */}
        <footer className="mt-8 pt-8 border-t border-neutral-900/20">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-neutral-900/80">
            <span>✓ Gwarancja 30 dni</span>
            <span>✓ Ubezpieczenie OC</span>
            <span>✓ Bezpłatny dojazd</span>
            <span>✓ Porządek po montażu</span>
          </div>
        </footer>
      </div>
    </section>
  );
});

FinalCTASection.displayName = "FinalCTASection";

export default FinalCTASection;
