"use client";

import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-surface-dark/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display font-bold text-lg tracking-tight">
          <span className="text-accent">CODE:</span> ABUNDANCE
        </span>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
