import { beforeAll, afterEach, afterAll } from "vitest";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// Set required env vars for tests
process.env.NEXT_PUBLIC_SITE_URL = "https://skladamy.com";
process.env.NEXT_PUBLIC_STRAPI_URL = "http://localhost:1337";
process.env.NEXT_PUBLIC_COMPANY_NAME = "SkładaMy";
process.env.NEXT_PUBLIC_COMPANY_FULL_NAME = "SkładaMy Sp. z o.o.";
process.env.NEXT_PUBLIC_COMPANY_PHONE = "+48 780 926 993";
process.env.NEXT_PUBLIC_COMPANY_PHONE_RAW = "+48780926993";
process.env.NEXT_PUBLIC_COMPANY_EMAIL = "kontakt@skladamy.com";
process.env.NEXT_PUBLIC_COMPANY_WEBSITE = "https://skladamy.com";
process.env.NEXT_PUBLIC_COMPANY_CITY = "Słupsk";
process.env.NEXT_PUBLIC_COMPANY_REGION = "pomorskie";
process.env.NEXT_PUBLIC_COMPANY_COUNTRY = "Polska";
process.env.NEXT_PUBLIC_COMPANY_LATITUDE = "54.4641";
process.env.NEXT_PUBLIC_COMPANY_LONGITUDE = "17.0289";
process.env.NEXT_PUBLIC_COMPANY_SERVICE_AREA = "Słupsk, Ustka, Główczyce";
process.env.NEXT_PUBLIC_COMPANY_HOURS_WEEKDAYS = "Pn-Pt: 8:00-18:00";
process.env.NEXT_PUBLIC_COMPANY_HOURS_WEEKEND = "Sob: 9:00-14:00";
process.env.NEXT_PUBLIC_GTM_ID = "GTM-TESTID";

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());
