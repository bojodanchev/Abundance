"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Diamond } from "lucide-react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

const NAV_LINKS = [
  { label: "Диагностика", href: "#diagnostic" },
  { label: "Как работи", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Diamond className="w-5 h-5 text-accent transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display font-bold text-lg tracking-wide text-text-primary">
            ABUNDANCE
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-display font-semibold rounded-lg hover:bg-accent-dark transition-all duration-200"
          >
            Започни
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/diagnose"
            className="px-4 py-2 bg-accent text-primary text-sm font-display font-semibold rounded-lg"
          >
            Започни
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-text-primary p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/98 border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-body text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-border">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
