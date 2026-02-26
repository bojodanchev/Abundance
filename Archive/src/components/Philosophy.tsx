import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Book, Crown, Heart } from "lucide-react";
import luxuryBoardroom from "@/assets/luxury-boardroom.jpg";

const Philosophy = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section id="philosophy" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={luxuryBoardroom} alt="Luxury Boardroom" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-10 leading-tight">
              <span className="text-gradient">{t('philosophy.headline')}</span>
            </h2>
            <p className="text-2xl md:text-3xl text-foreground font-black mb-6 leading-relaxed max-w-4xl mx-auto">
              {t('philosophy.subheadline')}
            </p>
            <p className="text-xl md:text-2xl text-primary font-black leading-relaxed max-w-4xl mx-auto mb-8">
              {t('philosophy.chaosLine')}
            </p>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-4xl mx-auto font-medium">
              {t('philosophy.descriptionPart1')} <span className="text-gold font-bold">{t('philosophy.descriptionHighlight')}</span>{t('philosophy.descriptionPart2')}
            </p>
          </div>

          {/* Quotes Grid */}
          <div className="p-8 md:p-10 bg-gradient-to-br from-primary/5 to-violet/5 border border-primary/20 rounded-xl mb-8">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6">
              <div className="flex gap-4">
                <Book className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-bold">
                  {t('philosophy.greekQuotePart1')} <span className="font-black text-primary">{t('philosophy.greekQuoteHighlight')}</span> {t('philosophy.greekQuotePart2')}
                </p>
              </div>
              <div className="flex gap-4">
                <Crown className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-bold">
                  {t('philosophy.solomonQuotePart1')} <span className="font-black text-gold">{t('philosophy.solomonQuoteHighlight')}</span>
                </p>
              </div>
            </div>

            <div className="p-6 bg-background/50 rounded-lg border border-primary/10">
              <div className="flex gap-3 mb-3">
                <Heart className="w-6 h-6 text-primary flex-shrink-0" />
                <h3 className="text-xl md:text-2xl font-black">{t('philosophy.keyTakeawayTitle')}</h3>
              </div>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium">
                {t('philosophy.keyTakeawayText')}
              </p>
            </div>
          </div>

          {/* Blockquote */}
          <div className="text-center mb-12">
            <p className="text-2xl md:text-3xl text-gold/90 italic font-bold">
              {t('philosophy.blockquote')}
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="hero" size="xl" onClick={() => navigate('/diagnostic')} className="group">
              {t('philosophy.cta')}
            </Button>
            <p className="text-xs md:text-sm text-muted-foreground mt-4">
              {t('philosophy.ctaSubtext')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
