"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_DATA, formatPhoneForDisplay, formatPhoneForTel } from "@/lib/company-data";

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
    <footer className="bg-muted mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/SkładaMy.svg" alt="SkładaMy" width={40} height={40} className="w-auto" />
              <span className="sr-only">SkładaMy</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Profesjonalny montaż mebli w Słupsku i okolicach. 
              Szybkie terminy, gwarancja jakości, porządek po montażu.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Słupsk i okolice</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href={`tel:${formatPhoneForTel()}`} className="hover:text-foreground">
                  {formatPhoneForDisplay()}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${COMPANY_DATA.email}`} className="hover:text-foreground">
                  {COMPANY_DATA.email}
                </a>
              </div>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} SkładaMy. Wszystkie prawa zastrzeżone.
            </p>
            <div className="mt-4 sm:mt-0 flex items-center space-x-6">
              <Link
                href="/polityka-prywatnosci"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Polityka prywatności
              </Link>
              <Link
                href="/regulamin"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Regulamin
              </Link>
              <Link
                href="/polityka-cookies"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Cookies
              </Link>
              <Link
                href="/deklaracja-dostepnosci"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Deklaracja dostępności
              </Link>
              <button
                type="button"
                onClick={() => window.openCookiePreferences?.()}
                className="text-muted-foreground hover:text-foreground text-sm underline decoration-dotted"
                aria-label="Otwórz ustawienia cookies"
              >
                Preferencje cookies
              </button>
            </div>
            {/* Watermark by Bitspire */}
            <div className="mt-4 sm:mt-0 ml-4">
              <a
                href="https://www.bitspire.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-xs opacity-70"
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
