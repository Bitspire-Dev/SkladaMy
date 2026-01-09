"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck, LineChart, Megaphone } from "lucide-react";

type ConsentState = {
  necessary: true; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const CONSENT_COOKIE = "cookie_consent";
const CONSENT_MAX_AGE_DAYS = 180; // 6 months

function readConsent(): ConsentState | null {
  try {
    // Parse cookies from document.cookie
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    
    const value = cookies[CONSENT_COOKIE];
    if (!value) return null;
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}

function writeConsent(consent: ConsentState) {
  const expires = new Date();
  expires.setDate(expires.getDate() + CONSENT_MAX_AGE_DAYS);
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Path=/; SameSite=Lax; Expires=${expires.toUTCString()}`;
}

export default function CookieConsentBanner() {
  const [initialConsent] = useState<ConsentState | null>(() => readConsent());
  const [open, setOpen] = useState(!initialConsent);
  const [analytics, setAnalytics] = useState(initialConsent?.analytics ?? false);
  const [marketing, setMarketing] = useState(initialConsent?.marketing ?? false);
  const gtmId = 'GTM-56KC6N53';
  const acceptBtnRef = useRef<HTMLButtonElement | null>(null);

  const loadGTM = () => {
    if (document.getElementById('gtm-script-loader')) return; // prevent duplicates
    const s = document.createElement('script');
    s.id = 'gtm-script-loader';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    const first = document.getElementsByTagName('script')[0];
    first.parentNode?.insertBefore(s, first);
  };

  // Allow external trigger to reopen banner
  useEffect(() => {
    window.openCookiePreferences = () => setOpen(true);
  }, []);

  useEffect(() => {
    if (initialConsent?.analytics) {
      loadGTM();
    }
  }, [initialConsent]);

  // Focus primary action when banner opens for accessibility
  useEffect(() => {
    if (open) {
      acceptBtnRef.current?.focus();
    }
  }, [open]);

  const pushConsentEvent = (a: boolean, m: boolean) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consent_update',
      consent: { analytics: a, marketing: m, necessary: true }
    });
  };

  const save = (a: boolean, m: boolean) => {
    const consent: ConsentState = { necessary: true, analytics: a, marketing: m, timestamp: new Date().toISOString() };
    writeConsent(consent);
    pushConsentEvent(a, m);
    if (a) loadGTM();
  };

  const acceptAll = () => {
    save(true, true);
    setOpen(false);
  };

  const rejectAll = () => {
    save(false, false);
    setOpen(false);
  };

  const savePreferences = () => {
    save(analytics, marketing);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 lg:px-8"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      aria-modal="true"
    >
      <div className="mx-auto max-w-4xl rounded-md border border-neutral-200 bg-white shadow-xl p-6 md:p-7">
        <h2 id="cookie-consent-title" className="text-xl font-semibold mb-2">Pliki cookies i Twoja prywatność</h2>
  <p id="cookie-consent-desc" className="text-sm text-neutral-800 mb-4">
          Używamy niezbędnych plików cookies zapewniających działanie serwisu. Za Twoją zgodą możemy uruchomić anonimową
          analitykę odwiedzin lub narzędzia marketingowe. Szczegóły w
          <Link href="/polityka-cookies" className="text-[#6a4a00] hover:underline font-medium ml-1">Polityce cookies</Link> oraz
          <Link href="/polityka-prywatnosci" className="text-[#6a4a00] hover:underline font-medium ml-1">Polityce prywatności</Link>.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-5 text-sm">
          <div className="bg-neutral-50 rounded-md p-3 border border-neutral-200">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 mt-0.5 text-[#FFC400]" aria-hidden="true" />
              <div>
                <p className="font-medium">Niezbędne</p>
                <p className="text-neutral-700 text-xs">Zapewniają podstawowe funkcje (nawigacja, bezpieczeństwo). Zawsze aktywne.</p>
              </div>
            </div>
          </div>
          <label className="bg-white rounded-md p-3 cursor-pointer flex gap-3 items-start border border-neutral-200 hover:bg-neutral-50">
            <input
              type="checkbox"
              className="mt-1 accent-[#FFC400]"
              checked={analytics}
              onChange={e => setAnalytics(e.target.checked)}
            />
            <span>
              <span className="font-medium flex items-center gap-2"><LineChart className="h-4 w-4 text-[#FFC400]" aria-hidden="true" /> Analityczne (opcjonalne)</span>
              <span className="text-xs text-neutral-700">Pomagają nam zrozumieć statystyki odwiedzin. Brak śledzenia marketingowego.</span>
            </span>
          </label>
          <label className="bg-white rounded-md p-3 cursor-pointer flex gap-3 items-start border border-neutral-200 hover:bg-neutral-50">
            <input
              type="checkbox"
              className="mt-1 accent-[#FFC400]"
              checked={marketing}
              onChange={e => setMarketing(e.target.checked)}
            />
            <span>
              <span className="font-medium flex items-center gap-2"><Megaphone className="h-4 w-4 text-[#FFC400]" aria-hidden="true" /> Marketingowe (opcjonalne)</span>
              <span className="text-xs text-neutral-700">Personalizacja i możliwe kampanie remarketingowe w przyszłości.</span>
            </span>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-end">
          <button
            onClick={rejectAll}
            className="px-4 py-2.5 text-sm rounded-md border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 transition"
          >
            Odrzuć wszystkie
          </button>
          <button
            onClick={savePreferences}
            className="px-4 py-2.5 text-sm rounded-md border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 transition"
          >
            Zapisz wybór
          </button>
          <button
            ref={acceptBtnRef}
            onClick={acceptAll}
            className="px-4 py-2.5 text-sm rounded-md bg-[#FFC400] text-neutral-900 hover:bg-[#f2b800] transition shadow-sm"
          >
            Akceptuj wszystko
          </button>
        </div>
  <p className="mt-3 text-[11px] text-neutral-700 tracking-wide">
          Twoje preferencje zostaną zapisane na 6 miesięcy. Możesz je zmienić w każdej chwili w „Preferencje cookies”.
        </p>
      </div>
    </div>
  );
}
