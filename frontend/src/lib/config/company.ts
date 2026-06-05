// ============================================
// COMPANY CONFIG - Environment-based configuration
// ============================================
// All data comes from environment variables - NO HARDCODED FALLBACKS!

// IMPORTANT:
// In Next.js/Turbopack, `process.env.NEXT_PUBLIC_*` is replaced at build time.
// Dynamic access like `process.env[varName]` is NOT statically analyzable and
// will be `undefined` in the browser even if .env is correct.

const REQUIRED_PUBLIC_ENV = {
  NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME,
  NEXT_PUBLIC_COMPANY_FULL_NAME: process.env.NEXT_PUBLIC_COMPANY_FULL_NAME,
  NEXT_PUBLIC_COMPANY_PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE,
  NEXT_PUBLIC_COMPANY_PHONE_RAW: process.env.NEXT_PUBLIC_COMPANY_PHONE_RAW,
  NEXT_PUBLIC_COMPANY_EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL,
  NEXT_PUBLIC_COMPANY_WEBSITE: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
  NEXT_PUBLIC_COMPANY_CITY: process.env.NEXT_PUBLIC_COMPANY_CITY,
  NEXT_PUBLIC_COMPANY_REGION: process.env.NEXT_PUBLIC_COMPANY_REGION,
  NEXT_PUBLIC_COMPANY_COUNTRY: process.env.NEXT_PUBLIC_COMPANY_COUNTRY,
  NEXT_PUBLIC_COMPANY_LATITUDE: process.env.NEXT_PUBLIC_COMPANY_LATITUDE,
  NEXT_PUBLIC_COMPANY_LONGITUDE: process.env.NEXT_PUBLIC_COMPANY_LONGITUDE,
  NEXT_PUBLIC_COMPANY_SERVICE_AREA: process.env.NEXT_PUBLIC_COMPANY_SERVICE_AREA,
  NEXT_PUBLIC_COMPANY_HOURS_WEEKDAYS: process.env.NEXT_PUBLIC_COMPANY_HOURS_WEEKDAYS,
  NEXT_PUBLIC_COMPANY_HOURS_WEEKEND: process.env.NEXT_PUBLIC_COMPANY_HOURS_WEEKEND,
} as const;

const missingVars = Object.entries(REQUIRED_PUBLIC_ENV)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}\n` +
      `Please check your .env file and ensure all required NEXT_PUBLIC_COMPANY_* variables are set.`
  );
}

const latitude = Number(REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_LATITUDE);
const longitude = Number(REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_LONGITUDE);

if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
  throw new Error(
    `Invalid company coordinates. NEXT_PUBLIC_COMPANY_LATITUDE and NEXT_PUBLIC_COMPANY_LONGITUDE must be valid numbers.`
  );
}

// Non-null assertions are safe here because we validate above
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const COMPANY_CONFIG = {
  name: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_NAME!,
  fullName: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_FULL_NAME!,
  phone: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_PHONE!,
  phoneRaw: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_PHONE_RAW!,
  email: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_EMAIL!,
  website: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_WEBSITE!,
  address: {
    city: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_CITY!,
    region: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_REGION!,
    country: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_COUNTRY!,
    coordinates: {
      latitude,
      longitude,
    },
  },
  serviceArea: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_SERVICE_AREA!,
  businessHours: {
    weekdays: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_HOURS_WEEKDAYS!,
    weekend: REQUIRED_PUBLIC_ENV.NEXT_PUBLIC_COMPANY_HOURS_WEEKEND!,
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
  },
} as const;

// Helper functions
export const formatPhoneForDisplay = (phone: string = COMPANY_CONFIG.phone): string => {
  return phone.replace("+48", "+48 ").replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
};

export const formatPhoneForTel = (phone: string = COMPANY_CONFIG.phone): string => {
  return phone;
};

// Backward compatibility - re-export with old name
/** @deprecated Use COMPANY_CONFIG instead */
export const COMPANY_DATA = COMPANY_CONFIG;
