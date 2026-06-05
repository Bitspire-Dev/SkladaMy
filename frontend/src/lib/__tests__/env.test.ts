import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isBrowser, getCurrentUrl, getSiteUrl, getStrapiUrl } from "../config/environment";

describe("isBrowser", () => {
  afterEach(() => {
    // Cleanup any window mock
    // @ts-expect-error Cleanup
    delete global.window;
  });

  it("should return true in jsdom environment (window is defined)", () => {
    // In jsdom, window is always defined
    expect(isBrowser()).toBe(true);
  });
});

describe("getCurrentUrl", () => {
  const originalEnv = process.env;
  const originalWindow = global.window;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    // Ensure window is always available for most tests
    if (!global.window) {
      global.window = originalWindow;
    }
  });

  afterEach(() => {
    process.env = originalEnv;
    global.window = originalWindow;
  });

  it("should return window.location.href when in browser", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://skladamy.pl";
    const result = getCurrentUrl();
    expect(result).toBe(window.location.href);
  });

  it("should use window.location.href when in browser (jsdom)", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://skladamy.pl";
    // In jsdom, isBrowser() returns true, so window.location.href is used
    // even with empty path
    const result = getCurrentUrl();
    expect(result).toBe(window.location.href);
  });

  it("should return window.location.href ignoring path in browser", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://skladamy.pl";
    const result = getCurrentUrl("kontakt");
    // In browser mode, path is ignored and full window.location.href is returned
    expect(result).toBe(window.location.href);
  });

  it("should return fallback URL when window is not available", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://skladamy.pl";
    // Temporarily remove window to test fallback
    // @ts-expect-error Removing window for test
    delete global.window;

    const result = getCurrentUrl("/blog");
    expect(result).toBe("https://skladamy.pl/blog");
  });
});

describe("getSiteUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should return NEXT_PUBLIC_SITE_URL when defined", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    expect(getSiteUrl()).toBe("https://example.com");
  });

  it("should throw an error when NEXT_PUBLIC_SITE_URL is not defined", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(() => getSiteUrl()).toThrow("NEXT_PUBLIC_SITE_URL must be set in .env file!");
  });
});

describe("getStrapiUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should return NEXT_PUBLIC_STRAPI_URL when defined", () => {
    process.env.NEXT_PUBLIC_STRAPI_URL = "http://strapi.example.com";
    expect(getStrapiUrl()).toBe("http://strapi.example.com");
  });

  it("should throw an error when NEXT_PUBLIC_STRAPI_URL is not defined", () => {
    delete process.env.NEXT_PUBLIC_STRAPI_URL;
    expect(() => getStrapiUrl()).toThrow("NEXT_PUBLIC_STRAPI_URL must be set in .env file!");
  });
});
