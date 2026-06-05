import { Button } from "@/components/ui/Button";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import { formatPhoneForTel, COMPANY_DATA } from "@/lib/config";

interface ContactCTAButtonsProps {
  variant?: "default" | "inverted";
  size?: "default" | "lg";
  className?: string;
  showPhone?: boolean;
  showEmail?: boolean;
}

/**
 * Reusable component for call-to-action buttons (phone + contact form)
 * Used in FinalCTASection, page hero sections, and other CTA blocks
 */
export function ContactCTAButtons({
  variant = "default",
  size = "lg",
  className = "",
  showPhone = true,
  showEmail = true,
}: ContactCTAButtonsProps) {
  const isInverted = variant === "inverted";

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}>
      {showPhone && (
        <Button
          asChild
          size={size}
          className={
            isInverted
              ? "bg-white text-neutral-900 hover:bg-neutral-50 border border-neutral-200 shadow-sm"
              : "bg-[#FFC400] text-neutral-900 hover:bg-[#FFD440] shadow-sm"
          }
        >
          <a href={`tel:${formatPhoneForTel()}`} aria-label={`ZadzwoL": ${COMPANY_DATA.phone}`}>
            <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
            {COMPANY_DATA.phone}
          </a>
        </Button>
      )}

      {showEmail && (
        <Button
          asChild
          size={size}
          variant={isInverted ? "outline" : "secondary"}
          className={
            isInverted
              ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              : "bg-transparent text-white hover:bg-white/10 border border-white/20 hover:border-white/20"
          }
        >
          <Link href="/kontakt">
            <Mail className="mr-2 h-5 w-5" />
            Napisz do nas
          </Link>
        </Button>
      )}
    </div>
  );
}
