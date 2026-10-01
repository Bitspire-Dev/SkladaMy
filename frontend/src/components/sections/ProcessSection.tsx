import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import BulletList from "@/components/ui/BulletList";
import { MessageCircle } from "lucide-react";
import { memo } from "react";
import Image from "next/image";
import { getIcon } from "@/components/sections/blocks/icons";
import { resolveHref } from "@/components/sections/blocks/resolve";
import { tinaField } from "@/lib/tina-field";
import type { ProcessBlock } from "@/components/sections/blocks/blocks";

type Step = NonNullable<ProcessBlock["steps"]>[number];

// Memoized step card component for better performance
const ProcessStepCard = memo(
  ({ step, stepNumber, isLast }: { step: Step; stepNumber: number; isLast: boolean }) => {
    const Icon = getIcon(step.icon);
    return (
      <div className="relative">
        {/* Connector line */}
        {!isLast && (
          <div className="hidden lg:block absolute top-20 left-full w-full h-1 bg-linear-to-r from-[#FFC400] to-[#FFC400]/30 z-0">
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFC400] rounded-full shadow-md"></div>
          </div>
        )}

        <Card className="relative z-10 h-full transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl border-2 hover:border-[#FFC400]/30 bg-white/95 backdrop-blur-sm group">
          <CardContent className="pt-8 px-8">
            {/* Step number and icon */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-linear-to-br from-[#FFC400] to-[#f2b800] rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    className="h-10 w-10 text-neutral-900"
                    aria-hidden="true"
                    strokeWidth={2.5}
                  />
                </div>
                <div
                  className="absolute -top-3 -right-3 w-9 h-9 bg-neutral-900 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
                  aria-label={`Krok ${stepNumber}`}
                >
                  {stepNumber}
                </div>
              </div>
            </div>

            {/* Step content */}
            <div className="text-center mb-8">
              <h3
                {...tinaField(step, "title")}
                className="text-2xl font-bold text-foreground mb-4 group-hover:text-[#FFC400] transition-colors duration-300"
              >
                {step.title}
              </h3>
              {step.description && (
                <p
                  {...tinaField(step, "description")}
                  className="text-muted-foreground text-base leading-relaxed"
                >
                  {step.description}
                </p>
              )}
            </div>

            {/* Step details */}
            {step.details && step.details.length > 0 && (
              <div {...tinaField(step, "details")}>
                <BulletList items={step.details} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);

ProcessStepCard.displayName = "ProcessStepCard";

const ProcessSection = memo(({ data }: { data: ProcessBlock }) => {
  const steps = data.steps ?? [];
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
      {/* Decorative młotek (moved inward, full opacity) */}
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
            {...tinaField(data, "heading")}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6"
          >
            {data.heading}
          </h2>
          {data.subtext && (
            <p
              {...tinaField(data, "subtext")}
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {data.subtext}
            </p>
          )}
        </header>

        <ul
          className="grid grid-cols-1 gap-10 lg:grid-cols-3 list-none"
          role="list"
          aria-label="Kroki współpracy"
        >
          {steps.map((step, index) => (
            <li key={index} role="listitem" {...tinaField(data, "steps", index)}>
              <ProcessStepCard
                step={step}
                stepNumber={index + 1}
                isLast={index === steps.length - 1}
              />
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        {(data.ctaText || data.ctaPrimary || data.ctaSecondary) && (
          <footer className="mt-12 text-center">
            {data.ctaText && (
              <p {...tinaField(data, "ctaText")} className="text-lg text-muted-foreground mb-4">
                {data.ctaText}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {data.ctaPrimary && (
                <a
                  href={resolveHref(data.ctaPrimary.href)}
                  {...tinaField(data, "ctaPrimary")}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={data.ctaPrimary.label}
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  {data.ctaPrimary.label}
                </a>
              )}
              {data.ctaSecondary && (
                <Link
                  href={resolveHref(data.ctaSecondary.href)}
                  {...tinaField(data, "ctaSecondary")}
                  className="inline-flex items-center px-6 py-3 border border-input text-base font-medium rounded-xl text-foreground bg-background hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={data.ctaSecondary.label}
                >
                  {data.ctaSecondary.label}
                </Link>
              )}
            </div>
          </footer>
        )}
      </div>
    </section>
  );
});

ProcessSection.displayName = "ProcessSection";

export default ProcessSection;
