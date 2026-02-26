import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TELEGRAM_MESSAGES: Record<string, string> = {
  bg: "Здравейте! Интересувам се от CODE: ABUNDANCE™ и искам да разбера повече за персонализираната диагностика и 90-дневния план. Кога мога да говоря с вас?",
  en: "Hello! I'm interested in CODE: ABUNDANCE™ and want to learn more about the personalized diagnostic and 90-day plan. When can I speak with you?",
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'bg';

  const telegramUrl = `https://t.me/alexshon7?text=${encodeURIComponent(
    TELEGRAM_MESSAGES[currentLang] || TELEGRAM_MESSAGES.bg
  )}`;

  const toggleLanguage = () => {
    const newLang = currentLang === 'bg' ? 'en' : 'bg';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const LanguageToggle = () => (
    <div className="flex items-center rounded-full border border-border/50 overflow-hidden text-xs font-medium">
      <button
        onClick={toggleLanguage}
        className={`px-2.5 py-1 transition-all duration-200 ${
          currentLang === 'bg'
            ? 'bg-accent text-[#0A0A0A]'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        BG
      </button>
      <button
        onClick={toggleLanguage}
        className={`px-2.5 py-1 transition-all duration-200 ${
          currentLang === 'en'
            ? 'bg-accent text-[#0A0A0A]'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-display text-xl font-black text-gradient cursor-pointer tracking-tight" onClick={() => scrollToSection('hero')}>
            CODE: ABUNDANCE™
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollToSection('philosophy')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              {t('header.philosophy')}
            </button>
            <button onClick={() => scrollToSection('levels')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              {t('header.levels')}
            </button>
            <button onClick={() => scrollToSection('system')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              {t('header.program')}
            </button>
            <button onClick={() => scrollToSection('founder')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              {t('header.founder')}
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              FAQ
            </button>
            <button onClick={() => { window.open(telegramUrl, "_blank"); setIsMenuOpen(false); }} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              {t('header.contact')}
            </button>
          </nav>

          {/* Desktop: Language Toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <Button variant="hero" size="lg" onClick={() => navigate('/diagnostic')}>
              {t('header.cta')}
            </Button>
          </div>

          {/* Mobile: Language Toggle + CTA + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <Button variant="hero" size="sm" onClick={() => navigate('/diagnostic')}>
              {t('header.cta')}
            </Button>
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <button onClick={() => scrollToSection('philosophy')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              {t('header.philosophy')}
            </button>
            <button onClick={() => scrollToSection('levels')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              {t('header.levels')}
            </button>
            <button onClick={() => scrollToSection('system')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              {t('header.program')}
            </button>
            <button onClick={() => scrollToSection('founder')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              {t('header.founder')}
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              FAQ
            </button>
            <button onClick={() => { window.open(telegramUrl, "_blank"); setIsMenuOpen(false); }} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              {t('header.contact')}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
