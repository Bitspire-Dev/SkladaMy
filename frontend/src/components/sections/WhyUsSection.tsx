import { Card, CardContent } from "@/components/ui/card";
import { Clock, Shield, Sparkles, Wrench } from "lucide-react";
import { memo, useMemo } from "react";
import Image from "next/image";
import { designFlags } from "@/lib/design-flags";

const benefits = [
  {
    icon: Clock,
    title: "Szybkie terminy realizacji",
    description: "Większość montaży wykonujemy w ciągu 1-3 dni od kontaktu. Nie czekasz tygodniami jak u konkurencji."
  },
  {
    icon: Shield,
    title: "30 dni gwarancji",
    description: "Każdy montaż objęty jest gwarancją. Jeśli coś się rozłączy przy normalnym użytkowaniu - poprawiamy za darmo."
  },
  {
    icon: Sparkles,
    title: "Porządek po montażu",
    description: "Sprzątamy po sobie, zabieramy opakowania i śmieci. Twoje mieszkanie pozostaje czyste."
  },
  {
    icon: Wrench,
    title: "Doświadczenie z IKEA/PAX",
    description: "Znamy na pamięć instrukcje IKEA. Szafy PAX, kuchnie METOD, garderoby - to nasza codzienność."
  }
];

// Memoized benefit card component
const BenefitCard = memo(({ benefit }: { benefit: typeof benefits[0] }) => (
  <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm text-center h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
    <CardContent className="px-6 pt-6">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <benefit.icon className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3">
        {benefit.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {benefit.description}
      </p>
    </CardContent>
  </Card>
));

BenefitCard.displayName = 'BenefitCard';

const WhyUsSection = memo(() => {
  const benefitCards = useMemo(() => 
    benefits.map((benefit) => (
      <BenefitCard key={benefit.title} benefit={benefit} />
    )), 
    []
  );

  return (
    <section className="relative py-16 bg-white overflow-hidden" aria-labelledby="benefits-heading">
      {/* Industrial dotted + grid background */}
      {designFlags.whyUs.dottedGridTexture && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-100 [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.32)_1px,transparent_0),linear-gradient(rgba(0,0,0,0.12)_1px,transparent_0),linear-gradient(90deg,rgba(0,0,0,0.12)_1px,transparent_0)] [background-size:14px_14px,14px_14px,14px_14px] [background-position:0_0,0_0,0_0]"
        />
      )}
      {/* Decorative wkrętarka (moved inward, full opacity) */}
      {designFlags.whyUs.drillImage && (
        <div className="hidden lg:block pointer-events-none absolute top-8 right-[5%] w-[360px] rotate-6 z-10 select-none opacity-40">
          <Image src="/wkrętarka.svg" alt="" aria-hidden="true" width={360} height={360} />
        </div>
      )}
      {/* Very subtle metallic sheen kept minimal */}
      {designFlags.whyUs.sheen && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 mix-blend-multiply opacity-6 bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_45%)]" />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <header className="text-center mb-12">
          <h2 id="benefits-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dlaczego warto nas wybrać?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            W Słupsku działa wielu monterów, ale my stawiamy na jakość, terminowość i spokój klienta.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 list-none" role="list" aria-label="Korzyści">
          {benefitCards.map((card, idx) => (
            <li key={idx} role="listitem">
              {card}
            </li>
          ))}
        </ul>

        {/* Additional trust signals */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
              <span className="text-sm">Doświadczenie od 2020</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
              <span className="text-sm">Ubezpieczenie OC</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
              <span className="text-sm">Własne narzędzia</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
});

WhyUsSection.displayName = 'WhyUsSection';

export default WhyUsSection;
