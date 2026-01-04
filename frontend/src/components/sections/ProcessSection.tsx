import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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
      "Otrzymujesz bezpłatną wycenę"
    ]
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
      "Przyjeżdżamy punktualnie"
    ]
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
      "Sprzątamy i odbieramy pracę"
    ]
  }
];

// Memoized step card component for better performance
const ProcessStepCard = memo(({ step, isLast }: { 
  step: typeof steps[0]; 
  isLast: boolean;
}) => (
  <div className="relative">
    {/* Connector line */}
    {!isLast && (
      <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-border z-0">
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
      </div>
    )}
    
    <Card className="relative z-10 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
      <CardContent className="pt-6">
        {/* Step number and icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <step.icon className="h-8 w-8 text-primary-foreground" aria-hidden="true" />
            </div>
            <div 
              className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-white rounded-full flex items-center justify-center text-sm font-bold"
              aria-label={`Krok ${step.step}`}
            >
              {step.step}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {step.title}
          </h3>
          <p className="text-muted-foreground">
            {step.description}
          </p>
        </div>

        {/* Step details */}
        <BulletList items={step.details} />
      </CardContent>
    </Card>
  </div>
));

ProcessStepCard.displayName = 'ProcessStepCard';

const ProcessSection = memo(() => {
  const stepCards = useMemo(() => 
    steps.map((step, index) => (
      <ProcessStepCard 
        key={step.step} 
        step={step} 
        isLast={index === steps.length - 1}
      />
    )), 
    []
  );

  return (
    <section className="py-16 bg-muted relative overflow-hidden" aria-labelledby="process-heading">
      {/* Decorative dotted background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-45">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 600">
          <defs>
            <pattern id="dotsProcess" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="rgba(0,0,0,0.05)" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#dotsProcess)" />
        </svg>
      </div>
      {/* Decorative młotek (moved inward, full opacity) */}
      <div className="hidden lg:block pointer-events-none absolute left-[2%] top-24 w-95 -rotate-6 z-10 select-none opacity-40">
        <Image src="/młotek.svg" alt="" aria-hidden="true" width={95 * 4} height={95 * 4} />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-12">
          <h2 id="process-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Jak wygląda współpraca?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Cały proces od kontaktu do montażu jest prosty i przewidywalny. 
            Nie ma niespodzianek, wszystko ustalamy wcześniej.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3 list-none" role="list" aria-label="Kroki współpracy">
          {stepCards.map((card, idx) => (
            <li key={idx} role="listitem">
              {card}
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <footer className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Gotowy na montaż bez stresu?
          </p>
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

ProcessSection.displayName = 'ProcessSection';

export default ProcessSection;
