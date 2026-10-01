// ============================================
// COMPANY CONFIG - Business identity constants
// ============================================
// Per-site constants - NOT secrets, NOT per-environment values.
// Lives in code, same as SITE_CONFIG (src/lib/config/site.ts).

import { SITE_CONFIG } from "./site";

export const COMPANY_CONFIG = {
  name: "SkładaMy",
  fullName: "SkładaMy - Montaż Mebli Słupsk",
  phone: "+48 780 926 993",
  phoneRaw: "780926993",
  email: "kontakt@skladamy.com",
  website: "https://skladamy.com",
  address: {
    city: "Słupsk",
    region: "Pomorskie",
    country: "Polska",
    coordinates: {
      latitude: 54.464,
      longitude: 17.029,
    },
  },
  serviceArea: "Słupsk i okolice",
  businessHours: {
    weekdays: "8:00-20:00",
    weekend: "9:00-18:00",
  },
  social: SITE_CONFIG.socials,
} as const;

// Helper functions
export const formatPhoneForDisplay = (phone: string = COMPANY_CONFIG.phone): string => {
  // Strip everything but digits, then format as +48 XXX XXX XXX. Handles input
  // that already contains spaces or other separators.
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 0) return phone;
  if (digits.startsWith("48") && digits.length === 11) {
    return `+48 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`;
  }
  if (digits.length === 9) {
    return `+48 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }
  return phone;
};

export const formatPhoneForTel = (phone: string = COMPANY_CONFIG.phone): string => {
  // tel: URIs must contain only digits and an optional leading +. Spaces and
  // other separators break dialing on most platforms.
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 0) return phone;
  if (digits.startsWith("48")) return `+${digits}`;
  return `+48${digits}`;
};
