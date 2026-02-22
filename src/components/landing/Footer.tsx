import { Diamond, Instagram, Facebook, Youtube } from "lucide-react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

const FOOTER_COLUMNS = [
  {
    title: "Продукт",
    links: [
      { label: "Диагностика", href: "#diagnostic" },
      { label: "Как работи", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Ресурси",
    links: [
      { label: "Блог", href: "#" },
      { label: "Методология", href: "#" },
      { label: "Партньори", href: "#" },
    ],
  },
  {
    title: "Правна информация",
    links: [
      { label: "Условия за ползване", href: "#" },
      { label: "Политика за поверителност", href: "#" },
      { label: "Бисквитки", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-border pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <Diamond className="w-5 h-5 text-accent transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-display font-bold text-lg tracking-wide text-text-primary">
                ABUNDANCE
              </span>
            </a>
            <p className="text-text-secondary text-sm font-body leading-relaxed max-w-xs mb-6">
              Персонализирана AI диагностика, която разкрива твоя уникален код към изобилието.
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-text-secondary hover:text-accent transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm text-text-primary mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 font-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-text-secondary text-xs font-body">
              &copy; {new Date().getFullYear()} Code: Abundance. Всички права запазени.
            </p>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-muted border border-border text-[10px] text-text-secondary font-mono">
              Powered by AI
            </span>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
