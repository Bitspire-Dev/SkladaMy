import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import BulletList from "@/components/ui/BulletList";
import { getIcon } from "@/components/sections/blocks/icons";
import { renderInlineMarkdown } from "@/lib/content/processors/markdown";
import { tinaField } from "@/lib/tina-field";
import type { ServicesBlock } from "@/components/sections/blocks/blocks";

export default function ServicesSection({ data }: { data: ServicesBlock }) {
  const items = data.items ?? [];
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
          <h2
            {...tinaField(data, "heading")}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6"
          >
            {data.heading}
          </h2>
          {data.subtext && (
            <p
              {...tinaField(data, "subtext")}
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(data.subtext) }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {items.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <article key={service.title} className="h-full" {...tinaField(data, "items", i)}>
                <Card className="h-full transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer border-2 hover:border-[#FFC400]/30 bg-white/95 backdrop-blur-sm group">
                  <CardHeader className="pb-4">
                    {service.icon && (
                      <div
                        {...tinaField(service, "icon")}
                        className="w-16 h-16 bg-linear-to-br from-[#FFC400] to-[#f2b800] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        <Icon
                          className="h-9 w-9 text-neutral-900"
                          aria-hidden="true"
                          strokeWidth={2.5}
                        />
                      </div>
                    )}
                    <CardTitle
                      {...tinaField(service, "title")}
                      className="text-2xl mb-3 group-hover:text-[#FFC400] transition-colors duration-300"
                    >
                      {service.title}
                    </CardTitle>
                    {service.description && (
                      <CardDescription
                        {...tinaField(service, "description")}
                        className="text-lg leading-relaxed"
                      >
                        {service.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  {service.details && service.details.length > 0 && (
                    <CardContent {...tinaField(service, "details")}>
                      <BulletList items={service.details} />
                    </CardContent>
                  )}
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
