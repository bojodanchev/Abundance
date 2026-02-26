import { TrendingUp, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import luxuryBuilding from "@/assets/luxury-building.jpg";
const CorePromise = () => {
  const { t } = useTranslation();
  const scrollToPrograms = () => {
    const element = document.getElementById('programs');
    if (element) element.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section id="core-promise" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">

        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>


      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-gradient">{t('corePromise.headline')}</span>
            </h2>
            <p className="text-2xl md:text-3xl text-primary mb-8 font-black">
              {t('corePromise.subheadline')}
            </p>
            <p className="text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto leading-relaxed font-bold">
              {t('corePromise.descriptionPart1')} <span className="text-primary">{t('corePromise.descriptionHighlight1')}</span>{t('corePromise.descriptionPart2')} <span className="text-gold">{t('corePromise.descriptionHighlight2')}</span> {t('corePromise.descriptionPart3')}
            </p>
            <p className="text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium mt-4">
              {t('corePromise.arsenalText')}
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Pillar 1: Finances */}
            <div className="group p-6 md:p-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl hover:border-primary/40 transition-all hover-scale">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <div className="text-5xl md:text-6xl font-black text-primary mb-4">1</div>
              <h3 className="text-3xl md:text-4xl font-black mb-5 md:mb-6">{t('corePromise.pillar1Title')}</h3>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-bold">
                {t('corePromise.pillar1TextPart1')} <span className="text-primary font-black">{t('corePromise.pillar1Highlight')}</span>{t('corePromise.pillar1TextPart2')}
              </p>
            </div>

            {/* Pillar 2: Energy */}
            <div className="group p-6 md:p-8 bg-gradient-to-br from-violet/10 to-violet/5 border border-violet/20 rounded-xl hover:border-violet/40 transition-all hover-scale">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-violet/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-violet" />
              </div>
              <div className="text-5xl md:text-6xl font-black text-violet mb-4">2</div>
              <h3 className="text-3xl md:text-4xl font-black mb-5 md:mb-6">{t('corePromise.pillar2Title')}</h3>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-bold">
                {t('corePromise.pillar2TextPart1')} <span className="text-violet font-black">{t('corePromise.pillar2Highlight')}</span>{t('corePromise.pillar2TextPart2')}
              </p>
            </div>

            {/* Pillar 3: Identity */}
            <div className="group p-6 md:p-8 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-xl hover:border-gold/40 transition-all hover-scale">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-gold" />
              </div>
              <div className="text-5xl md:text-6xl font-black text-gold mb-4">3</div>
              <h3 className="text-3xl md:text-4xl font-black mb-5 md:mb-6">{t('corePromise.pillar3Title')}</h3>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-bold">
                {t('corePromise.pillar3TextPart1')} <span className="text-gold font-black">{t('corePromise.pillar3Highlight')}</span>{t('corePromise.pillar3TextPart2')}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="hero" size="xl" onClick={scrollToPrograms} className="group">
              {t('corePromise.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default CorePromise;
