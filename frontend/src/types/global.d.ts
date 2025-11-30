export {};

declare global {
  interface Window {
    openCookiePreferences?: () => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}
