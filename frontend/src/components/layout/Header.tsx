"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, Menu, X } from "lucide-react";
import { useState, memo, useCallback, useMemo } from "react";
import { formatPhoneForTel } from "@/lib/config";

const Header = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = useMemo(
    () => [
      { name: "Home", href: "/" },
      { name: "O nas", href: "/o-nas" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Blog", href: "/blog" },
      { name: "Słupsk", href: "/slupsk" },
      { name: "Kontakt", href: "/kontakt" },
    ],
    []
  );

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="bg-white/98 backdrop-blur-md supports-backdrop-filter:bg-white/95 border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10" aria-label="Top">
        <div className="flex w-full items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/layout/skladamy.svg"
                alt="SkładaMy"
                width={180}
                height={45}
                priority
                unoptimized
                style={{ height: "45px", width: "auto" }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-semibold text-neutral-700 hover:text-[#FFC400] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FFC400] after:transition-all after:duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact CTAs */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-3">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white text-neutral-900 border-2 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 font-semibold transition-all duration-200 hover:scale-105"
              >
                <a href={`tel:${formatPhoneForTel()}`}>
                  <Phone className="h-5 w-5 mr-2 text-neutral-900" />
                  Zadzwoń
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[#FFC400] hover:bg-[#f2b800] text-neutral-900 font-bold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Link href="/kontakt">
                  <Mail className="h-5 w-5 mr-2 text-neutral-900" />
                  Zapytanie
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="lg"
              className="lg:hidden p-3"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="h-7 w-7" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-2 pb-5 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-lg font-semibold text-neutral-700 hover:text-[#FFC400] hover:bg-neutral-50 rounded-lg transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full bg-white text-neutral-900 border-2 border-neutral-300 hover:bg-neutral-50 font-semibold text-lg py-6"
                >
                  <a href={`tel:${formatPhoneForTel()}`}>
                    <Phone className="h-5 w-5 mr-3 text-neutral-900" />
                    Zadzwoń
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#FFC400] hover:bg-[#f2b800] text-neutral-900 font-bold text-lg py-6 shadow-md"
                >
                  <Link href="/kontakt">
                    <Mail className="h-5 w-5 mr-3 text-neutral-900" />
                    Wyślij zapytanie
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
