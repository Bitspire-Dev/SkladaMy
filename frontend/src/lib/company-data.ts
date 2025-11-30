export const COMPANY_DATA = {
  name: "SkładaMy",
  fullName: "SkładaMy - Montaż Mebli Słupsk",
  phone: "+48884938490",
  phoneRaw: "884938490",
  email: "kontakt@skladamy.pl",
  website: "https://skladamy.pl",
  address: {
    city: "Słupsk",
    region: "Pomorskie",
    country: "Polska",
    coordinates: {
      latitude: 54.464,
      longitude: 17.029
    }
  },
  serviceArea: "Słupsk i okolice",
  businessHours: {
    weekdays: "8:00-20:00",
    weekend: "9:00-18:00"
  },
  social: {
    facebook: "https://facebook.com/skladamy",
    instagram: "https://instagram.com/skladamy"
  }
} as const;

// Helper functions
export const formatPhoneForDisplay = (phone: string = COMPANY_DATA.phone): string => {
  return phone.replace("+48", "+48 ").replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
};

export const formatPhoneForTel = (phone: string = COMPANY_DATA.phone): string => {
  return phone;
};
