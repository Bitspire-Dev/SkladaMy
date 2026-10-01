import { Button } from "@/components/ui/Button";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { COMPANY_CONFIG } from "@/lib/config";
import { resolveHref } from "@/components/sections/blocks/resolve";
import { tinaField } from "@/lib/tina-field";
import type { CtaBlock } from "@/components/sections/blocks/blocks";

const FinalCTASection = memo(({ data }: { data: CtaBlock }) => {
  const infoItems = data.infoItems ?? [];
  const trustItems = data.trustItems ?? [];
  return (
    <section className="py-16 bg-[#FFC400]" aria-labelledby="final-cta-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="final-cta-heading"
          {...tinaField(data, "heading")}
          className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-6"
        >
          {data.heading}
        </h2>
        {data.text && (
          <p
            {...tinaField(data, "text")}
            className="text-xl text-neutral-900/90 mb-8 max-w-2xl mx-auto"
          >
            {data.text}
          </p>
        )}

        {/* Main CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {data.primaryCta && (
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-4 bg-white text-neutral-900 hover:bg-neutral-50 rounded-md border border-neutral-200 shadow-sm"
            >
              <a
                href={resolveHref(data.primaryCta.href)}
                aria-label={data.primaryCta.label}
                {...tinaField(data, "primaryCta")}
              >
                <Phone className="mr-2 h-5 w-5 text-neutral-900" aria-hidden="true" />
                {data.primaryCta.label}
                {data.primaryCta.href === "tel:" && `: ${COMPANY_CONFIG.phone}`}
              </a>
            </Button>
          )}
          {data.secondaryCta && (
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-4 bg-transparent text-neutral-900 hover:bg-neutral-900/5 rounded-md border border-neutral-900/30"
            >
              <Link
                href={resolveHref(data.secondaryCta.href)}
                aria-label={data.secondaryCta.label}
                {...tinaField(data, "secondaryCta")}
              >
                <Mail className="mr-2 h-5 w-5 text-neutral-900" aria-hidden="true" />
                {data.secondaryCta.label}
              </Link>
            </Button>
          )}
        </div>

        {/* Contact info */}
        {infoItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto text-neutral-900/80">
            {infoItems.map((item, index) => (
              <div key={index} className="flex items-center justify-center space-x-2">
                {index === 0 ? (
                  <Clock className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                )}
                <span {...tinaField(data, "infoItems", index)} className="text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Trust signals */}
        {trustItems.length > 0 && (
          <footer className="mt-8 pt-8 border-t border-neutral-900/20">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-neutral-900/80">
              {trustItems.map((item, index) => (
                <span key={item} {...tinaField(data, "trustItems", index)}>
                  {item}
                </span>
              ))}
            </div>
          </footer>
        )}
      </div>
    </section>
  );
});

FinalCTASection.displayName = "FinalCTASection";

export default FinalCTASection;
