"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Menu, X } from "lucide-react";
import { useState, memo, useCallback, useMemo } from "react";
import { formatPhoneForTel } from "@/lib/company-data";

const Header = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = useMemo(() => [
    { name: "Home", href: "/" },
    { name: "O nas", href: "/o-nas" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Słupsk", href: "/slupsk" },
    { name: "Kontakt", href: "/kontakt" },
  ], []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="glass-effect border-b border-neutral-200/50 sticky top-0 z-50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/SkładaMy.svg"
                alt="SkładaMy"
                width={160}
                height={40}
                priority
                style={{ height: '40px', width: 'auto' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-smooth relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Contact CTAs */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              <Button asChild variant="outline" size="sm" className="bg-white/80 text-neutral-900 border-neutral-300 hover:bg-white hover:shadow-md transition-smooth">
                <a href={`tel:${formatPhoneForTel()}`}>
                  <Phone className="h-4 w-4 mr-2 text-neutral-900" />
                  Zadzwoń
                </a>
              </Button>
              <Button asChild size="sm" className="bg-gradient-to-r from-primary to-[#FF8A00] hover:shadow-premium-hover text-neutral-900 font-semibold transition-smooth">
                <Link href="/kontakt">
                  <Mail className="h-4 w-4 mr-2 text-neutral-900" />
                  Zapytanie
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-base font-medium text-neutral-700 hover:text-neutral-900"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button asChild variant="outline" size="sm" className="w-full bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50">
                  <a href={`tel:${formatPhoneForTel()}`}>
                    <Phone className="h-4 w-4 mr-2 text-neutral-900" />
                    Zadzwoń
                  </a>
                </Button>
                <Button asChild size="sm" className="w-full bg-[#FFC400] hover:bg-[#f2b800] text-neutral-900">
                  <Link href="/kontakt">
                    <Mail className="h-4 w-4 mr-2 text-neutral-900" />
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

Header.displayName = 'Header';

export default Header;
