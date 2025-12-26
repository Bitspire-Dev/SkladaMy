"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { formatPhoneForTel } from "@/lib/company-data";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleCall = () => {
    // Analytics event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'call_click', {
        event_category: 'engagement',
        event_label: 'sticky_cta'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Button
        asChild
        size="lg"
        className="rounded-full shadow-premium-hover hover:shadow-premium bg-gradient-to-r from-primary to-[#FF8A00] text-neutral-900 px-8 py-6 font-bold transition-smooth hover:scale-105"
        onClick={handleCall}
      >
        <a href={`tel:${formatPhoneForTel()}`}>
          <Phone className="h-5 w-5 mr-2 text-neutral-900" />
          Zadzwoń
        </a>
      </Button>
    </div>
  );
}
