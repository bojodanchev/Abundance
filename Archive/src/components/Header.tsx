import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TELEGRAM_URL = `https://t.me/alexshon7?text=${encodeURIComponent(
  "Здравейте! Интересувам се от CODE: ABUNDANCE™ и искам да разбера повече за персонализираната диагностика и 90-дневния план. Кога мога да говоря с вас?"
)}`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
              Философия
            </button>
            <button onClick={() => scrollToSection('levels')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              Нива
            </button>
            <button onClick={() => scrollToSection('system')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              Програма
            </button>
            <button onClick={() => scrollToSection('founder')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              Основател
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              FAQ
            </button>
            <button onClick={() => { window.open(TELEGRAM_URL, "_blank"); setIsMenuOpen(false); }} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              Контакти
            </button>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg" onClick={() => navigate('/diagnostic')}>
              БЕЗПЛАТЕН АНАЛИЗ
            </Button>
          </div>

          {/* Mobile: CTA + Hamburger always visible */}
          <div className="flex items-center gap-3 md:hidden">
            <Button variant="hero" size="sm" onClick={() => navigate('/diagnostic')}>
              БЕЗПЛАТЕН АНАЛИЗ
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
              Философия
            </button>
            <button onClick={() => scrollToSection('levels')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              Нива
            </button>
            <button onClick={() => scrollToSection('system')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              Програма
            </button>
            <button onClick={() => scrollToSection('founder')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              Основател
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              FAQ
            </button>
            <button onClick={() => { window.open(TELEGRAM_URL, "_blank"); setIsMenuOpen(false); }} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              Контакти
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
