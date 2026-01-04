// ============================================
// COMPANY DATA - Environment-based configuration
// ============================================
// All data comes from environment variables - NO HARDCODED FALLBACKS!

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_COMPANY_NAME',
  'NEXT_PUBLIC_COMPANY_PHONE',
  'NEXT_PUBLIC_COMPANY_EMAIL',
  'NEXT_PUBLIC_COMPANY_WEBSITE',
  'NEXT_PUBLIC_COMPANY_CITY',
  'NEXT_PUBLIC_COMPANY_REGION',
  'NEXT_PUBLIC_COMPANY_COUNTRY',
] as const;

// Check for missing required variables
const missingVars = requiredEnvVars.filter(
  varName => !process.env[varName]
);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}\n` +
    `Please check your .env file and ensure all NEXT_PUBLIC_COMPANY_* variables are set.`
  );
}

// Non-null assertions are safe here because we validate above
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const COMPANY_DATA = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME!,
  fullName: process.env.NEXT_PUBLIC_COMPANY_FULL_NAME!,
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE!,
  phoneRaw: process.env.NEXT_PUBLIC_COMPANY_PHONE_RAW!,
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL!,
  website: process.env.NEXT_PUBLIC_COMPANY_WEBSITE!,
  address: {
    city: process.env.NEXT_PUBLIC_COMPANY_CITY!,
    region: process.env.NEXT_PUBLIC_COMPANY_REGION!,
    country: process.env.NEXT_PUBLIC_COMPANY_COUNTRY!,
    coordinates: {
      latitude: parseFloat(process.env.NEXT_PUBLIC_COMPANY_LATITUDE || '54.464'),
      longitude: parseFloat(process.env.NEXT_PUBLIC_COMPANY_LONGITUDE || '17.029')
    }
  },
  serviceArea: process.env.NEXT_PUBLIC_COMPANY_SERVICE_AREA || 'Słupsk i okolice',
  businessHours: {
    weekdays: process.env.NEXT_PUBLIC_COMPANY_HOURS_WEEKDAYS || '8:00-20:00',
    weekend: process.env.NEXT_PUBLIC_COMPANY_HOURS_WEEKEND || '9:00-18:00'
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || '',
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || ''
  }
} as const;

// Helper functions
export const formatPhoneForDisplay = (phone: string = COMPANY_DATA.phone): string => {
  return phone.replace("+48", "+48 ").replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
};

export const formatPhoneForTel = (phone: string = COMPANY_DATA.phone): string => {
  return phone;
};
