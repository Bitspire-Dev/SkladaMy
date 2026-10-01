import { COMPANY_CONFIG } from "@/lib/config/company";

/**
 * Create Organization structured data (publisher info)
 */
export const createOrganizationStructuredData = () => ({
  "@type": "Organization" as const,
  name: COMPANY_CONFIG.name,
  url: COMPANY_CONFIG.website,
});

// Backward compatibility
export { createOrganizationStructuredData as createPublisherStructuredData };
