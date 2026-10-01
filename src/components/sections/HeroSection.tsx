import { Button } from "@/components/ui/Button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { renderInlineMarkdown } from "@/lib/content/processors/markdown";
import { resolveHref } from "@/components/sections/blocks/resolve";
import { tinaField } from "@/lib/tina-field";
import type { HeroBlock } from "@/components/sections/blocks/blocks";

type HeroCard = NonNullable<HeroBlock["cards"]>[number];

function HeroTrustCards({ cards, data }: { cards: HeroCard[]; data: HeroBlock }) {
  if (cards.length === 0) return null;
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-8">
      {cards.map((card, i) => (
        <div
          key={card.title}
          {...tinaField(data, "cards", i)}
          className="flex flex-col items-center rounded-lg bg-white/95 px-6 py-5 ring-1 ring-black/5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="rounded-full bg-[#FFC400]/20 p-3">
            <div className="h-6 w-6 rounded-full bg-[#FFC400]" />
          </div>
          <h3 {...tinaField(card, "title")} className="mt-3 text-sm font-semibold text-neutral-900">
            {card.title}
          </h3>
          <p {...tinaField(card, "text")} className="mt-1 text-sm text-neutral-700">
            {card.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function HeroBadges({ badges, data }: { badges: string[]; data: HeroBlock }) {
  if (badges.length === 0) return null;
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-neutral-900">
      {badges.map((badge, i) => (
        <span
          key={badge}
          {...tinaField(data, "badges", i)}
          className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 shadow-sm"
          dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(badge) }}
        />
      ))}
    </div>
  );
}

export default function HeroSection({ data }: { data: HeroBlock }) {
  const badges = data.badges ?? [];
  const cards = data.cards ?? [];
  return (
    <section className="relative isolate overflow-hidden bg-neutral-900 min-h-170 sm:min-h-180 flex items-center">
      {/* Background image + overlays */}
      <div className="absolute inset-0 z-0">
        {data.image && (
          <Image
            src={data.image}
            alt={data.heading}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}

        <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/64 to-white/40" />

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

      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center">
          {data.badge && (
            <div
              {...tinaField(data, "badge")}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 mb-4"
            >
              <span className="inline-block size-1.5 rounded-full bg-[#FFC400]" />
              {data.badge}
            </div>
          )}

          {/* Hero headline */}
          <h1
            id="hero-heading"
            {...tinaField(data, "heading")}
            className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
          >
            {data.heading}{" "}
            {data.headingAccent && (
              <span {...tinaField(data, "headingAccent")} className="text-[#FFC400]">
                {data.headingAccent}
              </span>
            )}
            {data.headingSuffix && (
              <span {...tinaField(data, "headingSuffix")}>
                <br className="hidden sm:block" /> {data.headingSuffix}
              </span>
            )}
          </h1>

          {/* Hero subtext */}
          {data.subtext && (
            <p
              {...tinaField(data, "subtext")}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-900"
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(data.subtext) }}
            />
          )}

          {/* Trust indicators inline */}
          <HeroBadges badges={badges} data={data} />

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {data.primaryCta && (
              <Button
                asChild
                size="lg"
                className="text-lg px-8 shadow-md bg-[#FFC400] hover:bg-[#f2b800] text-neutral-900"
              >
                <Link
                  href={resolveHref(data.primaryCta.href)}
                  aria-label={data.primaryCta.label}
                  {...tinaField(data, "primaryCta")}
                >
                  <Phone className="mr-2 h-5 w-5 text-neutral-900" />
                  {data.primaryCta.label}
                </Link>
              </Button>
            )}

            {/* Simplified solid white pill for immediate readability */}
            {data.secondaryCta && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-white/95 text-neutral-900 border-transparent shadow-sm"
              >
                <Link
                  href={resolveHref(data.secondaryCta.href)}
                  aria-label={data.secondaryCta.label}
                  {...tinaField(data, "secondaryCta")}
                >
                  <Mail className="mr-2 h-5 w-5 text-neutral-900" />
                  {data.secondaryCta.label}
                </Link>
              </Button>
            )}
          </div>

          {/* Trust indicator cards */}
          <HeroTrustCards cards={cards} data={data} />

          {/* Service area indicator */}
          {data.areaText && (
            <div className="mt-8 text-center">
              <p {...tinaField(data, "areaText")} className="text-sm text-neutral-900">
                {data.areaText}
                {data.areaLinkHref && (
                  <Link
                    href={data.areaLinkHref}
                    {...tinaField(data, "areaLinkLabel")}
                    className="ml-2 inline-flex items-center font-medium text-[#FFC400] hover:underline"
                  >
                    {data.areaLinkLabel}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
