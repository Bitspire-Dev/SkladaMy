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
  if (typeof document === "undefined") return null;
  try {
    // Parse cookies from document.cookie
    const cookies = document.cookie.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        if (key) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

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
  const initialConsent = readConsent();
  const [open, setOpen] = useState(() => !initialConsent);
  const [analytics, setAnalytics] = useState(() => initialConsent?.analytics ?? false);
  const [marketing, setMarketing] = useState(() => initialConsent?.marketing ?? false);
  const gtmId = "GTM-56KC6N53";
  const acceptBtnRef = useRef<HTMLButtonElement | null>(null);
  const isMounted = useRef(false);

  const loadGTM = () => {
    if (document.getElementById("gtm-script-loader")) return; // prevent duplicates
    const s = document.createElement("script");
    s.id = "gtm-script-loader";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    const first = document.getElementsByTagName("script")[0];
    if (first && first.parentNode) {
      first.parentNode.insertBefore(s, first);
    } else {
      document.head.appendChild(s);
    }
  };

  // Sync open state with actual consent after hydration (runs once)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      const consent = readConsent();
      setOpen(!consent);
    }
  }, []);

  // Load GTM if consent was already granted
  useEffect(() => {
    if (initialConsent?.analytics) {
      loadGTM();
    }
  }, [initialConsent?.analytics]);

  // Allow external trigger to reopen banner
  useEffect(() => {
    window.openCookiePreferences = () => {
      setOpen(true);
      const consent = readConsent();
      if (consent) {
        setAnalytics(consent.analytics ?? false);
        setMarketing(consent.marketing ?? false);
      }
    };
  }, []);

  // Focus primary action when banner opens for accessibility
  useEffect(() => {
    if (open) {
      acceptBtnRef.current?.focus();
    }
  }, [open]);

  const pushConsentEvent = (a: boolean, m: boolean) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consent_update",
      consent: { analytics: a, marketing: m, necessary: true },
    });
  };

  const save = (a: boolean, m: boolean) => {
    try {
      const consent: ConsentState = {
        necessary: true,
        analytics: a,
        marketing: m,
        timestamp: new Date().toISOString(),
      };
      writeConsent(consent);
      pushConsentEvent(a, m);
      if (a) loadGTM();
    } catch (err) {
      console.warn("Failed to save cookie consent:", err);
    }
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
      className="fixed inset-x-0 bottom-0 z-50 px-6 pb-6 sm:px-8 lg:px-10"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      aria-modal="true"
    >
      <div className="mx-auto max-w-5xl rounded-2xl border-2 border-neutral-200 bg-white shadow-2xl p-8 md:p-10">
        <h2 id="cookie-consent-title" className="text-2xl font-bold mb-4 text-neutral-900">
          🍪 Pliki cookies i Twoja prywatność
        </h2>
        <p id="cookie-consent-desc" className="text-base text-neutral-700 mb-6 leading-relaxed">
          Używamy niezbędnych plików cookies zapewniających działanie serwisu. Za Twoją zgodą możemy
          uruchomić anonimową analitykę odwiedzin (Google Analytics, Microsoft Clarity) lub
          narzędzia marketingowe (Google Ads, Meta Pixel). Szczegóły w
          <Link
            href="/polityka-cookies"
            className="text-[#FFC400] hover:underline font-semibold ml-1"
          >
            Polityce cookies
          </Link>{" "}
          oraz
          <Link
            href="/polityka-prywatnosci"
            className="text-[#FFC400] hover:underline font-semibold ml-1"
          >
            Polityce prywatności
          </Link>
          .
        </p>
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-linear-to-br from-[#FFC400]/10 to-[#FFC400]/5 rounded-xl p-5 border-2 border-[#FFC400]/30">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 mt-0.5 text-[#FFC400]" aria-hidden="true" />
              <div>
                <p className="font-bold text-base mb-1">Niezbędne</p>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  Zapewniają podstawowe funkcje (nawigacja, bezpieczeństwo). Zawsze aktywne.
                </p>
              </div>
            </div>
          </div>
          <label className="bg-white rounded-xl p-5 cursor-pointer flex gap-4 items-start border-2 border-neutral-200 hover:border-[#FFC400]/30 hover:bg-neutral-50 transition-all duration-200 group">
            <input
              type="checkbox"
              className="mt-1.5 w-5 h-5 accent-[#FFC400] cursor-pointer"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            <span>
              <span className="font-bold text-base flex items-center gap-2 mb-1 group-hover:text-[#FFC400] transition-colors">
                <LineChart className="h-5 w-5 text-[#FFC400]" aria-hidden="true" /> Analityczne
              </span>
              <span className="text-sm text-neutral-700 leading-relaxed block">
                Google Analytics 4, Microsoft Clarity - statystyki odwiedzin. Brak śledzenia
                marketingowego.
              </span>
            </span>
          </label>
          <label className="bg-white rounded-xl p-5 cursor-pointer flex gap-4 items-start border-2 border-neutral-200 hover:border-[#FFC400]/30 hover:bg-neutral-50 transition-all duration-200 group">
            <input
              type="checkbox"
              className="mt-1.5 w-5 h-5 accent-[#FFC400] cursor-pointer"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            <span>
              <span className="font-bold text-base flex items-center gap-2 mb-1 group-hover:text-[#FFC400] transition-colors">
                <Megaphone className="h-5 w-5 text-[#FFC400]" aria-hidden="true" /> Marketingowe
              </span>
              <span className="text-sm text-neutral-700 leading-relaxed block">
                Google Ads, Meta Pixel - personalizacja i kampanie remarketingowe.
              </span>
            </span>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-end">
          <button
            type="button"
            onClick={rejectAll}
            className="px-6 py-3.5 text-base font-semibold rounded-xl border-2 border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            Odrzuć wszystkie
          </button>
          <button
            type="button"
            onClick={savePreferences}
            className="px-6 py-3.5 text-base font-semibold rounded-xl border-2 border-[#FFC400] bg-white text-neutral-900 hover:bg-[#FFC400]/10 transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            Zapisz wybór
          </button>
          <button
            ref={acceptBtnRef}
            type="button"
            onClick={acceptAll}
            className="px-6 py-3.5 text-base font-bold rounded-xl bg-[#FFC400] text-neutral-900 hover:bg-[#f2b800] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            Akceptuj wszystko
          </button>
        </div>
        <p className="mt-5 text-sm text-neutral-600 leading-relaxed">
          Twoje preferencje zostaną zapisane na 6 miesięcy. Możesz je zmienić w każdej chwili
          klikając „Preferencje cookies” w stopce strony.
        </p>
      </div>
    </div>
  );
}
