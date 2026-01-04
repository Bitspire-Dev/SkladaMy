"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Phone, Mail } from "lucide-react";
import { useState, memo, useMemo, useCallback } from "react";
import { faqItems } from "@/data/faq";

// Memoized FAQ Item Component
const FAQItem = memo(({ 
  faq, 
  isOpen, 
  onToggle 
}: { 
  faq: typeof faqItems[0]; 
  isOpen: boolean; 
  onToggle: () => void;
}) => (
  <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
    <CardContent className="p-0">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground pr-4">
            {faq.question}
          </h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden="true" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4" id={`faq-answer-${faq.id}`}>
          <div className="pt-2 border-t border-border">
            <p className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
));

FAQItem.displayName = 'FAQItem';

// Memoized Category Button Component
const CategoryButton = memo(({ 
  category, 
  isSelected, 
  onClick 
}: { 
  category: { key: string; label: string }; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:ring-offset-2 ${
      isSelected
        ? "bg-[#FFC400] text-neutral-900 shadow-sm hover:bg-[#f2b800]"
        : "bg-gray-100 text-neutral-600 hover:bg-gray-200"
    }`}
    aria-pressed={isSelected}
  >
    {category.label}
  </button>
));

CategoryButton.displayName = 'CategoryButton';

const FAQSection = memo(() => {
  // Use static FAQ data, filter for featured items
  const faqData = useMemo(() => faqItems.filter(item => item.featured), []);

  const categories = useMemo(() => [
    { key: "wszystkie", label: "Wszystkie" },
    { key: "montaz", label: "Montaż" },
    { key: "cennik", label: "Cennik" },
    { key: "ogolne", label: "Ogólne" },
    { key: "gwarancja", label: "Gwarancja" },
    { key: "dojazd", label: "Dojazd" }
  ], []);

  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("wszystkie");

  const toggleItem = useCallback((id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const filteredFAQ = useMemo(() => 
    selectedCategory === "wszystkie" 
      ? faqData 
      : faqData.filter(item => item.category === selectedCategory),
    [faqData, selectedCategory]
  );

  return (
    <section
      id="faq"
      className="relative py-16 bg-white overflow-visible"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-20">
        <header className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Najczęściej zadawane pytania
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Wszystko co warto wiedzieć o montażu mebli w Słupsku
          </p>
        </header>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Kategorie pytań">
          {categories.map(category => (
            <CategoryButton
              key={category.key}
              category={category}
              isSelected={selectedCategory === category.key}
              onClick={() => handleCategoryChange(category.key)}
            />
          ))}
        </div>

        {/* FAQ List (semantic) */}
        <ul className="space-y-4 list-none" role="list" aria-label="Lista FAQ">
          {filteredFAQ.map((faq) => (
            <li key={faq.id} role="listitem">
              <FAQItem
                faq={faq}
                isOpen={openItems.includes(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            </li>
          ))}
        </ul>

        {/* Call to action */}
        <footer className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Nie znalazłeś odpowiedzi na swoje pytanie?
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="tel:+48123456789"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-neutral-900 font-semibold shadow-md hover:bg-neutral-50 transition-all focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:ring-offset-2 border border-neutral-200"
              aria-label="Zadzwoń pod numer: +48 123 456 789"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Zadzwoń: +48 123 456 789
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-transparent text-neutral-900 font-medium shadow-sm border border-neutral-900/30 hover:bg-neutral-900/5 transition-all focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:ring-offset-2"
              aria-label="Przejdź do strony kontaktowej"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Wyślij wiadomość
            </Link>
          </div>
        </footer>
      </div>
      {/* Decorative yellow semicircle at bottom */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center translate-y-12">
        <svg className="w-[200vw] h-80 lg:h-105" viewBox="0 0 1200 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="faqArcClip">
              <path d="M0,0 C300,200 900,200 1200,0 L1200,400 L0,400 Z" />
            </clipPath>
            {/* Głębszy pionowy gradient: szybsze wejście koloru i pełne nasycenie wcześniej */}
            <linearGradient id="faqVert" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="22%" stopColor="var(--primary)" stopOpacity="0.28" />
              <stop offset="40%" stopColor="var(--primary)" stopOpacity="0.55" />
              <stop offset="58%" stopColor="var(--primary)" stopOpacity="0.78" />
              <stop offset="72%" stopColor="var(--primary)" stopOpacity="0.92" />
              <stop offset="85%" stopColor="var(--primary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="1" />
            </linearGradient>
            {/* Boczne radialne do wyrównania boków łuku (mocniejsze) */}
            <radialGradient id="faqSide" cx="0" cy="0" r="460" gradientUnits="userSpaceOnUse">
              <stop offset="12%" stopColor="var(--primary)" stopOpacity="0.85" />
              <stop offset="55%" stopColor="var(--primary)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
            {/* Nakładka: płynne przejście od białego do przezroczystego, żeby złagodzić cięcie */}
            <linearGradient id="faqTopFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g clipPath="url(#faqArcClip)">
            {/* Podstawowy pionowy gradient */}
            <rect x="0" y="0" width="1200" height="400" fill="url(#faqVert)" />
            {/* Wzmocnienia boczne */}
            <circle cx="0" cy="0" r="460" fill="url(#faqSide)" />
            <g transform="translate(1200,0) scale(-1,1)">
              <circle cx="0" cy="0" r="460" fill="url(#faqSide)" />
            </g>
            {/* Biała nakładka na górę łuku dla płynnego przejścia z tłem sekcji */}
            <rect x="0" y="0" width="1200" height="220" fill="url(#faqTopFade)" />
          </g>
        </svg>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';

export default FAQSection;
