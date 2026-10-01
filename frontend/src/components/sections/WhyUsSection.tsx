import { Card, CardContent } from "@/components/ui/Card";
import { memo } from "react";
import Image from "next/image";
import { getIcon } from "@/components/sections/blocks/icons";
import { tinaField } from "@/lib/tina-field";
import type { FeaturesBlock } from "@/components/sections/blocks/blocks";

type Benefit = NonNullable<FeaturesBlock["items"]>[number];

// Memoized benefit card component
const BenefitCard = memo(({ benefit }: { benefit: Benefit }) => {
  const Icon = getIcon(benefit.icon);
  return (
    <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm text-center h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      <CardContent className="px-6 pt-6">
        <div
          {...tinaField(benefit, "icon")}
          className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <h3 {...tinaField(benefit, "title")} className="text-lg font-semibold text-foreground mb-3">
          {benefit.title}
        </h3>
        {benefit.description && (
          <p
            {...tinaField(benefit, "description")}
            className="text-muted-foreground text-sm leading-relaxed"
          >
            {benefit.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
});

BenefitCard.displayName = "BenefitCard";

const WhyUsSection = memo(({ data }: { data: FeaturesBlock }) => {
  const items = data.items ?? [];
  return (
    <section className="relative py-16 bg-white overflow-hidden" aria-labelledby="benefits-heading">
      {/* Industrial dotted + grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-100 [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.32)_1px,transparent_0),linear-gradient(rgba(0,0,0,0.12)_1px,transparent_0),linear-gradient(90deg,rgba(0,0,0,0.12)_1px,transparent_0)] bg-size-[14px_14px,14px_14px,14px_14px] bg-position-[0_0,0_0,0_0]"
      />
      {/* Decorative wkrętarka (moved inward, full opacity) */}
      <div className="hidden lg:block pointer-events-none absolute top-8 right-[5%] w-90 rotate-6 z-10 select-none opacity-40">
        <Image
          src="/layout/wkretarka.svg"
          alt=""
          aria-hidden="true"
          width={360}
          height={360}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      {/* Very subtle metallic sheen kept minimal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 mix-blend-multiply opacity-6 bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_45%)]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <header className="text-center mb-12">
          <h2
            id="benefits-heading"
            {...tinaField(data, "heading")}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {data.heading}
          </h2>
          {data.subtext && (
            <p
              {...tinaField(data, "subtext")}
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {data.subtext}
            </p>
          )}
        </header>

        <ul
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 list-none"
          role="list"
          aria-label="Korzyści"
        >
          {items.map((benefit, i) => (
            <li key={benefit.title} role="listitem" {...tinaField(data, "items", i)}>
              <BenefitCard benefit={benefit} />
            </li>
          ))}
        </ul>

        {/* Additional trust signals */}
        {data.footerNotes && data.footerNotes.length > 0 && (
          <footer className="mt-12 text-center">
            <div className="inline-flex items-center justify-center space-x-8 text-muted-foreground">
              {data.footerNotes.map((note, i) => (
                <div key={note} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
                  <span {...tinaField(data, "footerNotes", i)} className="text-sm">
                    {note}
                  </span>
                </div>
              ))}
            </div>
          </footer>
        )}
      </div>
    </section>
  );
});

WhyUsSection.displayName = "WhyUsSection";

export default WhyUsSection;
