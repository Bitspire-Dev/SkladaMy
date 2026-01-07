import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import Image from "next/image";

// Memoized StarRating component
const StarRating = React.memo(function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1" aria-label={`Ocena: ${rating} z 5 gwiazdek`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
});

// Memoized TestimonialCard component
const TestimonialCard = React.memo(function TestimonialCard({ 
  testimonial 
}: { 
  testimonial: typeof testimonials[0] 
}) {
  return (
    <article>
      <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <CardContent className="p-6">
          {/* Rating */}
          <div className="flex items-center justify-between mb-4">
            <StarRating rating={testimonial.rating} />
            <span className="text-sm text-muted-foreground">
              {testimonial.location}
            </span>
          </div>

          {/* Testimonial text */}
          <blockquote className="mb-4">
            <p className="text-foreground leading-relaxed">
              &ldquo;{testimonial.content}&rdquo;
            </p>
          </blockquote>

          {/* Service info */}
          <div className="mb-3">
            <p className="text-sm text-muted-foreground">
              Usługa: <span className="font-medium">{testimonial.serviceType}</span>
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center">
            <div>
              <p className="font-semibold text-foreground">
                {testimonial.clientName}
              </p>
              {testimonial.verified && (
                <p className="text-xs text-green-600 font-medium">
                  ✓ Zweryfikowana opinia
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
});

export default React.memo(function TestimonialsSection() {
  // Use static testimonials data - memoized to prevent recalculation
  const testimonialsData = React.useMemo(
    () => testimonials.filter(t => t.featured),
    []
  );

  return (
    <section className="py-16 bg-muted relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Decorative dotted background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-50">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 600">
          <defs>
            <pattern id="dotsTestimonials" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="rgba(0,0,0,0.05)" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#dotsTestimonials)" />
        </svg>
      </div>
      {/* Decorative śrubokręt (moved inward, full opacity) */}
         <div className="hidden xl:block pointer-events-none absolute right-[5%] top-132 w-85 rotate-3 z-10 select-none opacity-40">
        <Image src="/srubokret.svg" alt="" aria-hidden="true" width={340} height={340} />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Co mówią nasi klienci?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Zadowoleni klienci to nasza najlepsza rekomendacja. Przeczytaj opinie o naszych usługach montażowych w Słupsku.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 list-none" role="list" aria-label="Opinie klientów">
          {testimonialsData.map((testimonial) => (
            <li key={testimonial.id} role="listitem">
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" aria-hidden="true" />
              <span className="text-sm font-medium">4.9/5 średnia ocen</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
              <span className="text-sm">300+ zadowolonych klientów</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
              <span className="text-sm">4 lata doświadczenia</span>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            * Opinie pochodzą od rzeczywistych klientów z terenu Słupska i okolic
          </p>
        </div>
      </div>
    </section>
  );
});
