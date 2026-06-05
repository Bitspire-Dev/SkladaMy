"use client";
import dynamic from "next/dynamic";
import LazyComponent from "@/components/ui/LazyComponent";

// Sekcje ładowane dopiero po wejściu w viewport (brak SSR aby zmniejszyć initial HTML/JS)
const ProcessSection = dynamic(() => import("./ProcessSection"), { ssr: false });
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), { ssr: false });
const FAQSection = dynamic(() => import("./FAQSection"), { ssr: false });
const FinalCTASection = dynamic(() => import("./FinalCTASection"), { ssr: false });

export default function BelowFold() {
  return (
    <>
      <LazyComponent threshold={0.15} rootMargin="180px">
        <ProcessSection />
      </LazyComponent>
      <LazyComponent threshold={0.15} rootMargin="200px">
        <TestimonialsSection />
      </LazyComponent>
      <LazyComponent threshold={0.2} rootMargin="240px">
        <FAQSection />
      </LazyComponent>
      <LazyComponent threshold={0.2} rootMargin="300px">
        <FinalCTASection />
      </LazyComponent>
    </>
  );
}
