"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_DATA, formatPhoneForDisplay, formatPhoneForTel } from "@/lib/config";

const footerSections = [
  {
    title: "Usługi",
    links: [
      { name: "Montaż mebli IKEA", href: "/#uslugi" },
      { name: "Wieszanie szafek", href: "/#uslugi" },
      { name: "Kotwienie w ścianie", href: "/#uslugi" },
      { name: "Portfolio realizacji", href: "/portfolio" },
    ],
  },
  {
    title: "Informacje",
    links: [
      { name: "O nas", href: "/o-nas" },
      { name: "Blog", href: "/blog" },
      { name: "Najczęstsze pytania", href: "/#faq" },
      { name: "Gwarancja i poprawki", href: "/o-nas#gwarancja" },
      // moved policy links to legal footer row
    ],
  },
  {
    title: "Montaż w Słupsku",
    links: [
      { name: "Montaż mebli Słupsk", href: "/slupsk" },
      { name: "Składanie PAX Słupsk", href: "/slupsk" },
      { name: "Kuchnie IKEA Słupsk", href: "/slupsk" },
      { name: "Biura i firmy", href: "/slupsk" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-muted to-neutral-100 mt-auto border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/layout/skladamy.svg"
                alt="SkładaMy"
                width={50}
                height={50}
                style={{ width: "auto", height: "auto" }}
              />
              <span className="sr-only">SkładaMy</span>
            </div>
            <p className="text-muted-foreground mb-6 text-base leading-relaxed">
              Profesjonalny montaż mebli w Słupsku i okolicach. Szybkie terminy, gwarancja jakości,
              porządek po montażu.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-[#FFC400] transition-colors">
                <MapPin className="h-5 w-5" />
                <span className="text-base">Słupsk i okolice</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-[#FFC400] transition-colors">
                <Phone className="h-5 w-5" />
                <a href={`tel:${formatPhoneForTel()}`} className="text-base font-semibold">
                  {formatPhoneForDisplay()}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-[#FFC400] transition-colors">
                <Mail className="h-5 w-5" />
                <a href={`mailto:${COMPANY_DATA.email}`} className="text-base">
                  {COMPANY_DATA.email}
                </a>
              </div>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-[#FFC400] transition-colors text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="mt-16 border-t-2 border-neutral-300 pt-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-base font-medium">
              © {new Date().getFullYear()} SkładaMy. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <Link
                href="/polityka-prywatnosci"
                className="text-muted-foreground hover:text-[#FFC400] text-base transition-colors font-medium"
              >
                Polityka prywatności
              </Link>
              <Link
                href="/regulamin"
                className="text-muted-foreground hover:text-[#FFC400] text-base transition-colors font-medium"
              >
                Regulamin
              </Link>
              <Link
                href="/polityka-cookies"
                className="text-muted-foreground hover:text-[#FFC400] text-base transition-colors font-medium"
              >
                Cookies
              </Link>
              <Link
                href="/deklaracja-dostepnosci"
                className="text-muted-foreground hover:text-[#FFC400] text-base transition-colors font-medium"
              >
                Deklaracja dostępności
              </Link>
              <button
                type="button"
                onClick={() => window.openCookiePreferences?.()}
                className="text-muted-foreground hover:text-[#FFC400] text-base underline decoration-dotted transition-colors font-medium"
                aria-label="Otwórz ustawienia cookies"
              >
                Preferencje cookies
              </button>
            </div>
            {/* Watermark by Bitspire */}
            <div className="">
              <a
                href="https://www.bitspire.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#FFC400] text-sm opacity-80 hover:opacity-100 transition-all"
                aria-label="Made by Bitspire"
              >
                made by bitspire
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
