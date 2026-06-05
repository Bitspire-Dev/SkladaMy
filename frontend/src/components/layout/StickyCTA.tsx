"use client";

import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { formatPhoneForTel } from "@/lib/config";

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
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "call_click", {
        event_category: "engagement",
        event_label: "sticky_cta",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <Button
        asChild
        size="lg"
        className="rounded-full shadow-lg bg-[#FFC400] hover:bg-[#f2b800] text-neutral-900 px-6"
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
