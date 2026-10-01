import { describe, it, expect } from "vitest";
import { COMPANY_CONFIG, formatPhoneForDisplay, formatPhoneForTel } from "../config/company";

describe("COMPANY_CONFIG", () => {
  it("should expose company identity constants", () => {
    expect(COMPANY_CONFIG.name).toBe("SkładaMy");
    expect(COMPANY_CONFIG.fullName).toBe("SkładaMy - Montaż Mebli Słupsk");
    expect(COMPANY_CONFIG.address.city).toBe("Słupsk");
    expect(COMPANY_CONFIG.address.coordinates.latitude).toBeCloseTo(54.464);
    expect(COMPANY_CONFIG.address.coordinates.longitude).toBeCloseTo(17.029);
    expect(COMPANY_CONFIG.social.facebook).toContain("facebook.com");
  });
});

describe("formatPhoneForDisplay", () => {
  it("should format a raw number as +48 XXX XXX XXX", () => {
    expect(formatPhoneForDisplay("+48780926993")).toBe("+48 780 926 993");
  });

  it("should normalize the default phone", () => {
    // formatPhoneForDisplay normalizes the default phone (strips non-digits,
    // then reformats) so the result has single spaces, not the raw input.
    expect(formatPhoneForDisplay()).toBe("+48 780 926 993");
  });
});

describe("formatPhoneForTel", () => {
  it("should keep digits and leading + only", () => {
    expect(formatPhoneForTel("+48 780 926 993")).toBe("+48780926993");
    expect(formatPhoneForTel("780 926 993")).toBe("+48780926993");
  });

  it("should normalize the default phone", () => {
    expect(formatPhoneForTel()).toBe("+48780926993");
  });
});
