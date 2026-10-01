import { COMPANY_CONFIG } from "@/lib/config/company";

/**
 * Create ContactPoint structured data for customer support
 */
export const createContactPointStructuredData = () => ({
  "@type": "ContactPoint" as const,
  contactType: "customer support",
  email: COMPANY_CONFIG.email,
  telephone: COMPANY_CONFIG.phone,
  areaServed: "PL",
  availableLanguage: ["pl"],
});
