import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import luxuryPenthouse from "@/assets/luxury-penthouse.jpg";

const SevenSteps = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const steps = [
    {
      number: "1",
      title: t('sevenSteps.step1Title'),
      subtitle: t('sevenSteps.step1Subtitle'),
      description: t('sevenSteps.step1Description')
    },
    {
      number: "2",
      title: t('sevenSteps.step2Title'),
      subtitle: t('sevenSteps.step2Subtitle'),
      description: t('sevenSteps.step2Description')
    },
    {
      number: "3",
      title: t('sevenSteps.step3Title'),
      subtitle: t('sevenSteps.step3Subtitle'),
      description: t('sevenSteps.step3Description')
    },
    {
      number: "4",
      title: t('sevenSteps.step4Title'),
      subtitle: t('sevenSteps.step4Subtitle'),
      description: t('sevenSteps.step4Description')
    },
    {
      number: "5",
      title: t('sevenSteps.step5Title'),
      subtitle: t('sevenSteps.step5Subtitle'),
      description: t('sevenSteps.step5Description')
    },
    {
      number: "6",
      title: t('sevenSteps.step6Title'),
      subtitle: t('sevenSteps.step6Subtitle'),
      description: t('sevenSteps.step6Description')
    },
    {
      number: "7",
      title: t('sevenSteps.step7Title'),
      subtitle: t('sevenSteps.step7Subtitle'),
      description: t('sevenSteps.step7Description')
    }
  ];

  const toggleStep = (idx: number) => {
    setExpandedSteps(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="seven-steps" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={luxuryPenthouse} alt="Luxury Penthouse" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="text-gradient">{t('sevenSteps.headline')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary font-black">
              {t('sevenSteps.subheadline')}
            </p>
          </div>

          {/* Steps Accordion */}
          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
              >
                <button
                  onClick={() => toggleStep(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-card/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-black text-xl">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-foreground">{step.title}</h3>
                      <p className="text-sm text-primary font-bold uppercase tracking-wider">({step.subtitle})</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform flex-shrink-0 ${expandedSteps.includes(idx) ? 'rotate-180' : ''}`} />
                </button>

                {expandedSteps.includes(idx) && (
                  <div className="px-6 pb-5 pt-2 border-t border-border/30">
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium pl-16">
                      {step.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button variant="hero" size="xl" onClick={() => navigate('/diagnostic')}>
              {t('sevenSteps.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SevenSteps;
