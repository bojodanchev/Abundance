import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/luxury-office.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Countdown: start at 20, decrement 1 per day from Feb 25 2026, min 1
  const spotsLeft = Math.max(1, 20 - Math.floor((Date.now() - new Date('2026-02-25').getTime()) / 86400000));

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Luxury Office Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Limited Places Badge with Counter */}
          <div className="inline-block mb-8">
            <div className="px-6 py-3 bg-gold/20 border border-gold/40 rounded-full flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/30 flex items-center justify-center">
                <span className="text-gold font-black text-sm">{spotsLeft}</span>
              </div>
              <p className="text-sm md:text-base font-black text-gold uppercase tracking-wider">
                {t('hero.limitedSpots')}
              </p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-gradient">{t('hero.headlinePart1')}</span>
            <br />
            <span className="text-foreground">{t('hero.headlinePart2')} </span>
            <span className="text-gradient">{t('hero.headlinePart3')}</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-2xl sm:text-3xl md:text-4xl text-foreground/90 mb-6 max-w-4xl mx-auto leading-relaxed font-bold">
            {t('hero.subheadline')}
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-foreground/80 mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            {t('hero.descriptionPart1')} <span className="text-primary">{t('hero.descriptionHighlight1')}</span> {t('hero.descriptionPart2')} <span className="text-gold">{t('hero.descriptionHighlight2')}</span>
          </p>

          {/* CTA Button */}
          <Button variant="hero" size="xl" onClick={() => navigate('/diagnostic')} className="group shadow-glow text-lg px-10 py-7 md:px-14 md:py-9">
            {t('hero.cta')}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-sm md:text-base text-muted-foreground mt-4 font-medium">
            {t('hero.ctaSubtext')}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
