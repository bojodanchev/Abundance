import { AlertCircle, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import luxuryYacht from "@/assets/luxury-yacht.jpg";

const TheChaos = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleDiagnostic = () => {
    navigate('/diagnostic');
  };

  return (
    <section id="the-chaos" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={luxuryYacht}
          alt="Luxury Yacht"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-background to-primary/5"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/20 flex items-center justify-center animate-pulse">
                <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              </div>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-gradient">{t('theChaos.headline')}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground/80 uppercase tracking-wider font-bold">
              {t('theChaos.subtitle')}
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8 mb-12">
            {/* Truth Bombs */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-gold/10 to-primary/10 border-2 border-gold/30 rounded-xl">
              <div className="space-y-8">
                <p className="text-2xl md:text-4xl font-black text-foreground leading-relaxed">
                  {t('theChaos.notLazy')}
                </p>

                <p className="text-xl md:text-3xl text-foreground font-black leading-relaxed">
                  {t('theChaos.youArePart1')} <span className="text-primary">{t('theChaos.youAreHighlight')}</span>{t('theChaos.youArePart2')}
                </p>

                <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent my-6"></div>

                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium">
                  {t('theChaos.blockageExplanation')}
                </p>
              </div>
            </div>

            {/* Wake Up Call */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-violet/5 border border-primary/20 rounded-xl">
              <div className="flex gap-4 mb-4">
                <Unlock className="w-8 h-8 text-primary flex-shrink-0" />
                <h3 className="text-xl md:text-2xl font-black">{t('theChaos.brutalTruthTitle')}</h3>
              </div>
              <p className="text-lg md:text-xl text-foreground font-bold leading-relaxed mb-4">
                {t('theChaos.brutalTruthLine1')}
              </p>
              <p className="text-base md:text-lg text-gold font-bold leading-relaxed">
                {t('theChaos.brutalTruthLine2')}
              </p>
            </div>

            {/* Tooltip Info */}
            <div className="p-6 bg-background/80 border border-border/50 rounded-lg">
              <p className="text-sm md:text-base text-muted-foreground italic">
                {t('theChaos.tooltipEmoji')} <span className="font-bold">{t('theChaos.tooltipTitle')}</span> {t('theChaos.tooltipText')}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              variant="hero"
              size="xl"
              onClick={handleDiagnostic}
              className="group"
            >
              {t('theChaos.cta')}
            </Button>
            <p className="text-xs md:text-sm text-muted-foreground mt-4">
              {t('theChaos.ctaSubtext')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheChaos;
