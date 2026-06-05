"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { X, Phone, Mail, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPhoneForTel } from "@/lib/config";
import { useEffect } from "react";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const listVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            data-testid="mobile-menu-backdrop"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          />

          {/* Menu Panel */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background border-l shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Image
                  src="/layout/skladamy.svg"
                  alt="SkładaMy"
                  width={100}
                  height={25}
                  unoptimized
                  style={{ height: "32px", width: "auto" }}
                />
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
                <span className="sr-only">Zamknij menu</span>
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <motion.ul variants={listVariants} className="space-y-4">
                {navigation.map((item) => (
                  <motion.li key={item.name} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between p-4 text-lg font-medium rounded-xl hover:bg-secondary transition-colors"
                    >
                      <span className="group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                className="mt-8 p-4 bg-secondary/50 rounded-xl space-y-4 border border-border/50"
              >
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Kontakt
                </h4>
                <div className="grid gap-3">
                  <Button
                    asChild
                    variant="default"
                    className="w-full justify-start text-base font-medium h-12 shadow-none"
                  >
                    <a href={`tel:${formatPhoneForTel()}`}>
                      <Phone className="h-4 w-4 mr-3" />
                      Zadzwoń teraz
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start text-base font-medium h-12 bg-background"
                  >
                    <Link href="/kontakt" onClick={onClose}>
                      <Mail className="h-4 w-4 mr-3" />
                      Napisz wiadomość
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-secondary/20">
              <div className="flex justify-center space-x-6 text-muted-foreground">
                {/* Socials placeholder - good for design */}
                <div className="flex items-center space-x-2 text-xs">
                  <span>© {new Date().getFullYear()} SkładaMy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
