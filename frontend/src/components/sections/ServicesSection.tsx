import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Home, Anchor } from "lucide-react";
import BulletList from "@/components/ui/BulletList";
import { designFlags } from "@/lib/design-flags";

const services = [
  {
    icon: Wrench,
    title: "Montaż mebli IKEA",
    description: "Profesjonalne składanie wszystkich typów mebli skręcanych",
    details: [
      "Szafy PAX i garderoby (BRIMNES, HEMNES, IVAR)",
      "Komody, stoliki nocne, regały BILLY",
      "Łóżka z ramami i zagłówkami MALM, HEMNES",
      "Stoły, krzesła, biurka LINNMON, BEKANT",
      "Szafki RTV BESTÅ i biblioteczki"
    ]
  },
  {
    icon: Home,
    title: "Wieszanie szafek kuchennych",
    description: "Bezpieczny montaż szafek na ścianie z kotwieniem",
    details: [
      "Szafki kuchenne KNOXHULT, ENHET górne i dolne",
      "Szafki łazienkowe GODMORGON z umywalkami",
      "Regały ścienne LACK i półki BERGSHULT",
      "Lustra NISSEDAL i elementy dekoracyjne",
      "Telewizory na wspornikach ściennych"
    ]
  },
  {
    icon: Anchor,
    title: "Kotwienie w każdej ścianie",
    description: "Dobór odpowiednich kotew dla bezpiecznego mocowania",
    details: [
      "Ściany z płyt gipsowo-kartonowych (kotwy molly)",
      "Ściany betonowe i żelbetowe (wiertła i kotwy)",
      "Ściany ceglane pełne i pustaki ceramiczne",
      "Poziomowanie laserowe i regulacja wysokości",
      "Gwarancja bezpieczeństwa mocowania"
    ]
  }
];

export default function ServicesSection() {
  return (
    <section id="uslugi" className="py-16 bg-muted relative overflow-hidden">
      {/* decorative grid background (non-interactive) */}
      {(designFlags.services.fineGrid || designFlags.services.coarseGrid) && (
        <svg
          className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-70"
          aria-hidden="true"
        >
          <defs>
            {designFlags.services.fineGrid && (
              <pattern id="grid-services-fine" width="5mm" height="5mm" patternUnits="userSpaceOnUse">
                <path d="M5 0 L5 5 M0 5 L5 5" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
              </pattern>
            )}
            {designFlags.services.coarseGrid && (
              <pattern id="grid-services-coarse" width="128" height="128" patternUnits="userSpaceOnUse">
                <path d="M128 0 L128 128 M0 128 L128 128" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
              </pattern>
            )}
          </defs>
          {designFlags.services.coarseGrid && <rect width="100%" height="100%" fill="url(#grid-services-coarse)" />}
          {designFlags.services.fineGrid && <rect width="100%" height="100%" fill="url(#grid-services-fine)" />}
        </svg>
      )}

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Zakres naszych usług montażowych
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            <strong>Specjalizujemy się w montażu mebli IKEA</strong>, wieszaniu szafek kuchennych i kotwieniu w każdym typie ściany. 
            Pracujemy głównie z meblami IKEA, ale składamy również inne marki.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="h-full">
              <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BulletList items={service.details} />
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        {/* Exclusions */}
      </div>
    </section>
  );
}
