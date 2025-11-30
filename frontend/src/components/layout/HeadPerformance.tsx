"use client";
import { useEffect } from 'react';

/**
 * HeadPerformance dynamicznie wyszukuje główny arkusz Tailwind (hash *.css) i:
 * 1. Wstawia <link rel="preload" as="style"> zanim zacznie pobierać (przy pierwszym ticku clienta)
 * 2. Zmienia istniejący <link rel="stylesheet"> na media="print" onload pattern => nie blokuje renderu
 * 3. Po onload ustawia media="all"
 *
 * Uwaga: W trybie static export Next generuje link w <head>. Ten pattern minimalizuje blokowanie LCP.
 */
export default function HeadPerformance() {
  useEffect(() => {
    const head = document.head;
    const links = Array.from(head.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
    const mainCss = links.find(l => /_next\/static\/css\/.*\.css/.test(l.href));
    if (!mainCss) return;

    // Jeśli już zastosowano pattern - pomijamy
    if (mainCss.dataset.optimizedCss === '1') return;

    // Preload jeśli jeszcze nie ma
    const existingPreload = head.querySelector(`link[rel="preload"][as="style"][href="${mainCss.href}"]`);
    if (!existingPreload) {
      const preload = document.createElement('link');
      preload.rel = 'preload';
      preload.as = 'style';
      preload.href = mainCss.href;
      preload.crossOrigin = mainCss.crossOrigin || '';
      head.prepend(preload);
    }

    // Non‑blocking load pattern
    mainCss.media = 'print';
    mainCss.onload = () => { mainCss.media = 'all'; };
    mainCss.dataset.optimizedCss = '1';
  }, []);
  return null;
}
