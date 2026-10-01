// ============================================
// STRUCTURED DATA - JSON-LD schema.org helpers
// ============================================

export { createContactPointStructuredData } from "./contact-point";
export { createOrganizationStructuredData, createPublisherStructuredData } from "./organization";
export { createBreadcrumbStructuredData } from "./breadcrumb";

// Re-export with original names for backward compatibility
export { createOrganizationStructuredData as createPublisher } from "./organization";
