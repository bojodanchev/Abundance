import { Book, Trophy, Flame, TrendingDown, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from 'react-i18next';
import luxuryPattern from "@/assets/luxury-pattern.jpg";

const TheArchitect = () => {
  const { t } = useTranslation();

  const timeline = [
    {
      icon: Book,
      age: t('theArchitect.age1'),
      title: t('theArchitect.title1'),
      detail: t('theArchitect.detail1'),
      color: "primary"
    },
    {
      icon: Trophy,
      age: t('theArchitect.age2'),
      title: t('theArchitect.title2'),
      detail: t('theArchitect.detail2'),
      color: "gold"
    },
    {
      icon: Flame,
      age: t('theArchitect.age3'),
      title: t('theArchitect.title3'),
      detail: t('theArchitect.detail3'),
      color: "violet"
    },
    {
      icon: TrendingDown,
      age: t('theArchitect.age4'),
      title: t('theArchitect.title4'),
      detail: t('theArchitect.detail4'),
      color: "gold"
    },
    {
      icon: Building,
      age: t('theArchitect.age5'),
      title: t('theArchitect.title5'),
      detail: t('theArchitect.detail5'),
      color: "primary"
    }
  ];

  return (
    <section id="architect" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={luxuryPattern}
          alt="Luxury Pattern"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
              dangerouslySetInnerHTML={{ __html: t('theArchitect.heading') }}
            />
            <p className="text-xl md:text-2xl text-muted-foreground font-semibold">
              {t('theArchitect.subtitle')}
            </p>
          </div>

          {/* Intro */}
          <div className="mb-12 p-8 md:p-10 bg-gradient-to-br from-primary/10 to-violet/10 border border-primary/30 rounded-xl text-center">
            <p className="text-lg md:text-2xl text-foreground/90 leading-relaxed font-semibold">
              {t('theArchitect.introQuote')}
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-black mb-8 text-center">{t('theArchitect.timelineTitle')}</h3>

            <Accordion type="single" collapsible className="space-y-4">
              {timeline.map((item, idx) => {
                const Icon = item.icon;
                const colorClass = item.color === "gold" ? "gold" : item.color === "violet" ? "violet" : "primary";

                return (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className={`border-2 border-${colorClass}/30 rounded-xl overflow-hidden bg-gradient-to-br from-${colorClass}/5 to-${colorClass}/10`}
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left w-full">
                        <div className={`w-12 h-12 rounded-full bg-${colorClass}/20 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-6 h-6 text-${colorClass}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-semibold text-${colorClass} mb-1`}>
                            {item.age}
                          </div>
                          <div className="text-base md:text-lg font-black">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-16">
                        <span className="font-semibold">{t('theArchitect.detailLabel')}:</span> {item.detail}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Key Message */}
          <div className="p-6 md:p-10 bg-gradient-to-br from-primary/10 to-gold/10 border-2 border-primary/30 rounded-xl text-center mb-8">
            <h3 className="text-xl md:text-2xl font-black mb-4">{t('theArchitect.keyMessageTitle')}</h3>
            <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4">
              {t('theArchitect.keyMessageText')}
            </p>
            <p className="text-base md:text-lg font-bold text-primary">
              {t('theArchitect.keyMessageHighlight')}
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              variant="hero"
              size="xl"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('theArchitect.ctaButton')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheArchitect;
