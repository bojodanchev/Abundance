"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-text-secondary text-sm">
          &copy; {year} CODE: ABUNDANCE. All rights reserved.
        </span>
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <a href="/privacy" className="hover:text-accent transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-accent transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
