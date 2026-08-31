import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("COMPANY_CONFIG module load tests", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    // Restore clean environment for each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should load successfully when all required environment variables are set", async () => {
    const { COMPANY_CONFIG, formatPhoneForDisplay, formatPhoneForTel } =
      await import("../config/company");
    expect(COMPANY_CONFIG.name).toBe("SkładaMy");
    expect(COMPANY_CONFIG.fullName).toBe("SkładaMy Sp. z o.o.");
    expect(COMPANY_CONFIG.address.coordinates.latitude).toBe(54.4641);
    expect(COMPANY_CONFIG.address.coordinates.longitude).toBe(17.0289);

    // Test formatting helpers
    expect(formatPhoneForDisplay("+48780926993")).toBe("+48 780 926 993");
    // formatPhoneForDisplay normalizes the default phone (strips non-digits,
    // then reformats) so the result has single spaces, not the raw input.
    expect(formatPhoneForDisplay()).toBe("+48 780 926 993");
    expect(formatPhoneForTel("+48780926993")).toBe("+48780926993");
    // formatPhoneForTel strips spaces — tel: URIs must contain only digits and +
    expect(formatPhoneForTel()).toBe("+48780926993"); // defaults to COMPANY_CONFIG.phone
  });

  it("should throw error if a required environment variable is missing", async () => {
    // Temporarily delete a required env var
    delete process.env.NEXT_PUBLIC_COMPANY_NAME;

    await expect(import("../config/company")).rejects.toThrow(
      /Missing required environment variables: NEXT_PUBLIC_COMPANY_NAME/
    );
  });

  it("should throw error if coordinates are not numbers", async () => {
    process.env.NEXT_PUBLIC_COMPANY_LATITUDE = "not-a-number";

    await expect(import("../config/company")).rejects.toThrow(/Invalid company coordinates/);
  });
});
