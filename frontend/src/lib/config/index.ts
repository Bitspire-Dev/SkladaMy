// ============================================
// CONFIG - Application Configuration
// ============================================
// Centralized configuration exports for easy imports

export { COMPANY_CONFIG, formatPhoneForDisplay, formatPhoneForTel } from "./company";
export type { COMPANY_CONFIG as CompanyConfigType } from "./company";

export { getSiteUrl, getStrapiUrl, isBrowser, getCurrentUrl } from "./environment";
