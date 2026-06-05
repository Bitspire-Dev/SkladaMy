import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Wrench, Home, Anchor } from "lucide-react";
import BulletList from "@/components/ui/BulletList";

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
      "Szafki RTV BESTA. i biblioteczki",
    ],
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
      "Telewizory na wspornikach ściennych",
    ],
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
      "Gwarancja bezpieczeństwa mocowania",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="uslugi"
      className="py-20 sm:py-24 bg-linear-to-b from-muted to-white relative overflow-hidden"
    >
      {/* decorative grid background (non-interactive) */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid-services-fine" width="5mm" height="5mm" patternUnits="userSpaceOnUse">
            <path d="M5 0 L5 5 M0 5 L5 5" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          </pattern>
          <pattern id="grid-services-coarse" width="128" height="128" patternUnits="userSpaceOnUse">
            <path
              d="M128 0 L128 128 M0 128 L128 128"
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-services-coarse)" />
        <rect width="100%" height="100%" fill="url(#grid-services-fine)" />
      </svg>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Zakres naszych usług montażowych
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <strong>Specjalizujemy się w montażu mebli IKEA</strong>, wieszaniu szafek kuchennych i
            kotwieniu w każdym typie ściany. Pracujemy głównie z meblami IKEA, ale składamy również
            inne marki.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {services.map((service) => (
            <article key={service.title} className="h-full">
              <Card className="h-full transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer border-2 hover:border-[#FFC400]/30 bg-white/95 backdrop-blur-sm group">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-linear-to-br from-[#FFC400] to-[#f2b800] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <service.icon
                      className="h-9 w-9 text-neutral-900"
                      aria-hidden="true"
                      strokeWidth={2.5}
                    />
                  </div>
                  <CardTitle className="text-2xl mb-3 group-hover:text-[#FFC400] transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
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
