import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { FreeAnalysisDialog } from "./FreeAnalysisDialog";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-display text-xl font-black text-gradient cursor-pointer tracking-tight" onClick={() => scrollToSection('hero')}>
            CODE: ABUNDANCE™
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollToSection('about')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
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
            <button onClick={() => scrollToSection('contact')} className="text-sm text-muted-foreground/70 hover:text-foreground transition-smooth font-medium tracking-wide">
              Контакти
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg" onClick={() => setIsAnalysisOpen(true)}>
              Безплатен Анализ
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <button onClick={() => scrollToSection('about')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
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
            <button onClick={() => scrollToSection('contact')} className="text-left text-muted-foreground hover:text-foreground transition-smooth">
              Контакти
            </button>
            <Button variant="hero" size="lg" onClick={() => {
              setIsAnalysisOpen(true);
              setIsMenuOpen(false);
            }} className="w-full">
              Безплатен Анализ
            </Button>
          </nav>
        )}
      </div>
      <FreeAnalysisDialog isOpen={isAnalysisOpen} onOpenChange={setIsAnalysisOpen} />
    </header>
  );
};

export default Header;
