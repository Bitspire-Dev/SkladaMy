import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import BulletList from "@/components/ui/BulletList";
import { MessageCircle, Calendar, CheckCircle } from "lucide-react";
import { memo, useMemo } from "react";
import Image from "next/image";

const steps = [
  {
    step: 1,
    icon: MessageCircle,
    title: "Kontakt i szczegóły",
    description: "Dzwonisz lub wysyłasz zapytanie z opisem mebli do montażu",
    details: [
      "Opisujesz co chcesz zmontować",
      "Wysyłasz zdjęcia paczek lub pomieszczenia",
      "Podajesz preferowany termin",
      "Otrzymujesz bezpłatną wycenę",
    ],
  },
  {
    step: 2,
    icon: Calendar,
    title: "Ustalenie terminu",
    description: "Potwierdzamy termin i szczegóły montażu",
    details: [
      "Ustalamy dokładny dzień i godzinę",
      "Informujemy co przygotować",
      "Potwierdzamy telefonicznie",
      "Przyjeżdżamy punktualnie",
    ],
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Montaż i odbiór",
    description: "Profesjonalnie montujemy i sprzątamy po sobie",
    details: [
      "Składamy meble według instrukcji",
      "Kotwimy bezpiecznie w ścianie",
      "Sprawdzamy stabilność",
      "Sprzątamy i odbieramy pracę",
    ],
  },
];

// Memoized step card component for better performance
const ProcessStepCard = memo(({ step, isLast }: { step: (typeof steps)[0]; isLast: boolean }) => (
  <div className="relative">
    {/* Connector line */}
    {!isLast && (
      <div className="hidden lg:block absolute top-20 left-full w-full h-1 bg-linear-to-r from-[#FFC400] to-[#FFC400]/30 z-0">
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFC400] rounded-full shadow-md"></div>
      </div>
    )}

    <Card className="relative z-10 h-full transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer border-2 hover:border-[#FFC400]/30 bg-white/95 backdrop-blur-sm group">
      <CardContent className="pt-8 px-8">
        {/* Step number and icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-linear-to-br from-[#FFC400] to-[#f2b800] rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <step.icon
                className="h-10 w-10 text-neutral-900"
                aria-hidden="true"
                strokeWidth={2.5}
              />
            </div>
            <div
              className="absolute -top-3 -right-3 w-9 h-9 bg-neutral-900 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
              aria-label={`Krok ${step.step}`}
            >
              {step.step}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-[#FFC400] transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed">{step.description}</p>
        </div>

        {/* Step details */}
        <BulletList items={step.details} />
      </CardContent>
    </Card>
  </div>
));

ProcessStepCard.displayName = "ProcessStepCard";

const ProcessSection = memo(() => {
  const stepCards = useMemo(
    () =>
      steps.map((step, index) => (
        <ProcessStepCard key={step.step} step={step} isLast={index === steps.length - 1} />
      )),
    []
  );

  return (
    <section
      className="py-20 sm:py-24 bg-linear-to-b from-white to-muted relative overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Decorative dotted background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-35">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 600"
        >
          <defs>
            <pattern
              id="dotsProcess"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="2" fill="rgba(0,0,0,0.05)" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#dotsProcess)" />
        </svg>
      </div>
      {/* Decorative mL,otek (moved inward, full opacity) */}
      <div className="hidden lg:block pointer-events-none absolute left-[2%] top-24 w-95 -rotate-6 z-10 select-none opacity-30">
        <Image
          src="/layout/mlotek.svg"
          alt=""
          aria-hidden="true"
          width={380}
          height={380}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 relative z-10">
        <header className="text-center mb-16">
          <h2
            id="process-heading"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6"
          >
            Jak wygląda współpraca?
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cały proces od kontaktu do montażu jest prosty i przewidywalny. Nie ma niespodzianek,
            wszystko ustalamy wcześniej.
          </p>
        </header>

        <ul
          className="grid grid-cols-1 gap-10 lg:grid-cols-3 list-none"
          role="list"
          aria-label="Kroki współpracy"
        >
          {stepCards.map((card, idx) => (
            <li key={idx} role="listitem">
              {card}
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <footer className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">Gotowy na montaż bez stresu?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+48XXXXXXXXX"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Zadzwoń teraz, aby umówić montaż mebli"
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              Zadzwoń teraz
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 border border-input text-base font-medium rounded-xl text-foreground bg-background hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Przejdź do formularza kontaktowego"
            >
              Wyślij zapytanie
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
});

ProcessSection.displayName = "ProcessSection";

export default ProcessSection;
