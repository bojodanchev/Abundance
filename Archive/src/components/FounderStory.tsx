import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, TrendingUp, Users, Briefcase, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import seanPortrait from "@/assets/sean-portrait.jpg";

const FounderStory = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  const timelineData = [
    {
      id: 1,
      phase: t('founderStory.timeline1Phase'),
      title: t('founderStory.timeline1Title'),
      points: [
        t('founderStory.timeline1Point1'),
        t('founderStory.timeline1Point2'),
        t('founderStory.timeline1Point3')
      ]
    },
    {
      id: 2,
      phase: t('founderStory.timeline2Phase'),
      title: t('founderStory.timeline2Title'),
      points: [
        t('founderStory.timeline2Point1'),
        t('founderStory.timeline2Point2'),
        t('founderStory.timeline2Point3')
      ]
    },
    {
      id: 3,
      phase: t('founderStory.timeline3Phase'),
      title: t('founderStory.timeline3Title'),
      points: [
        t('founderStory.timeline3Point1'),
        t('founderStory.timeline3Point2'),
        t('founderStory.timeline3Point3')
      ]
    },
    {
      id: 4,
      phase: t('founderStory.timeline4Phase'),
      title: t('founderStory.timeline4Title'),
      points: [
        t('founderStory.timeline4Point1'),
        t('founderStory.timeline4Point2'),
        t('founderStory.timeline4Point3')
      ]
    },
    {
      id: 5,
      phase: t('founderStory.timeline5Phase'),
      title: t('founderStory.timeline5Title'),
      points: [
        t('founderStory.timeline5Point1'),
        t('founderStory.timeline5Point2'),
        t('founderStory.timeline5Point3')
      ]
    },
    {
      id: 6,
      phase: t('founderStory.timeline6Phase'),
      title: t('founderStory.timeline6Title'),
      points: [
        t('founderStory.timeline6Point1'),
        t('founderStory.timeline6Point2'),
        t('founderStory.timeline6Point3')
      ]
    },
    {
      id: 7,
      phase: t('founderStory.timeline7Phase'),
      title: t('founderStory.timeline7Title'),
      points: [
        t('founderStory.timeline7Point1'),
        t('founderStory.timeline7Point2'),
        t('founderStory.timeline7Point3')
      ]
    },
    {
      id: 8,
      phase: t('founderStory.timeline8Phase'),
      title: t('founderStory.timeline8Title'),
      points: [
        t('founderStory.timeline8Point1'),
        t('founderStory.timeline8Point2')
      ]
    },
    {
      id: 9,
      phase: t('founderStory.timeline9Phase'),
      title: t('founderStory.timeline9Title'),
      points: [
        t('founderStory.timeline9Point1'),
        t('founderStory.timeline9Point2'),
        t('founderStory.timeline9Point3')
      ]
    },
    {
      id: 10,
      phase: t('founderStory.timeline10Phase'),
      title: t('founderStory.timeline10Title'),
      points: [
        t('founderStory.timeline10Point1'),
        t('founderStory.timeline10Point2'),
        t('founderStory.timeline10Point3'),
        t('founderStory.timeline10Point4')
      ]
    },
    {
      id: 11,
      phase: t('founderStory.timeline11Phase'),
      title: t('founderStory.timeline11Title'),
      points: [
        t('founderStory.timeline11Point1'),
        t('founderStory.timeline11Point2'),
        t('founderStory.timeline11Point3')
      ]
    },
    {
      id: 12,
      phase: t('founderStory.timeline12Phase'),
      title: t('founderStory.timeline12Title'),
      points: [
        t('founderStory.timeline12Point1'),
        t('founderStory.timeline12Point2'),
        t('founderStory.timeline12Point3')
      ]
    },
    {
      id: 13,
      phase: t('founderStory.timeline13Phase'),
      title: t('founderStory.timeline13Title'),
      points: [
        t('founderStory.timeline13Point1'),
        t('founderStory.timeline13Point2'),
        t('founderStory.timeline13Point3')
      ]
    },
    {
      id: 14,
      phase: t('founderStory.timeline14Phase'),
      title: t('founderStory.timeline14Title'),
      points: [
        t('founderStory.timeline14Point1'),
        t('founderStory.timeline14Point2'),
        t('founderStory.timeline14Point3')
      ]
    },
    {
      id: 15,
      phase: t('founderStory.timeline15Phase'),
      title: t('founderStory.timeline15Title'),
      points: [
        t('founderStory.timeline15Point1'),
        t('founderStory.timeline15Point2'),
        t('founderStory.timeline15Point3')
      ]
    }
  ];

  const toggleItem = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="founder" className="py-24 bg-gradient-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
              <span className="text-gradient">{t('founderStory.heading')}</span>
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4 max-w-4xl mx-auto leading-relaxed">
              {t('founderStory.quote')}
            </p>
            <p className="text-xl text-primary font-semibold mb-12">
              {t('founderStory.subtitle')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient mb-2">9+</div>
                <div className="text-sm text-muted-foreground">{t('founderStory.statYears')}</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <Users className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient mb-2">120+</div>
                <div className="text-sm text-muted-foreground">{t('founderStory.statTeam')}</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <Briefcase className="w-8 h-8 text-gold mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient mb-2">7+</div>
                <div className="text-sm text-muted-foreground">{t('founderStory.statBusiness')}</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient mb-2">7</div>
                <div className="text-sm text-muted-foreground">{t('founderStory.statRevenue')}</div>
              </div>
            </div>

            {/* Portrait and Intro */}
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 rounded-xl overflow-hidden border-4 border-primary/30 flex-shrink-0">
                  <img
                    src={seanPortrait}
                    alt={t('founderStory.portraitAlt')}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: t('founderStory.introText') }}
                  />
                  <p className="text-lg text-primary font-semibold">
                    {t('founderStory.introHighlight')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h3 className="font-display text-3xl font-bold text-center mb-12"
              dangerouslySetInnerHTML={{ __html: t('founderStory.timelineHeading') }}
            />

            {(() => {
              const visibleItems = showAll ? timelineData : timelineData.slice(0, 5);
              return (
                <div className="space-y-4">
                  {visibleItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-card/50 transition-all"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-black text-lg">{item.id}</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-primary font-semibold mb-1">{item.phase}</div>
                            <div className="text-base md:text-lg font-bold text-foreground">{item.title}</div>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-6 h-6 text-muted-foreground transition-transform flex-shrink-0 ${expandedItems.includes(item.id) ? 'rotate-180' : ''
                            }`}
                        />
                      </button>

                      {expandedItems.includes(item.id) && (
                        <div className="px-6 pb-6 pt-2 border-t border-border/50">
                          <ul className="space-y-3">
                            {item.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-muted-foreground leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}

                  {!showAll && timelineData.length > 5 && (
                    <div className="text-center mt-6">
                      <button
                        onClick={() => setShowAll(true)}
                        className="text-primary font-bold hover:underline transition-all"
                      >
                        {t('founderStory.showMore', { count: timelineData.length - 5 })}
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-primary rounded-2xl p-8 md:p-12">
              <p className="text-sm text-background/80 mb-2 uppercase tracking-wider font-semibold">
                {t('founderStory.ctaLabel')}
              </p>
              <p className="text-2xl md:text-3xl font-black text-background mb-6">
                {t('founderStory.ctaTitle')}
              </p>
              <p className="text-background/90 mb-8 max-w-2xl mx-auto">
                {t('founderStory.ctaDescription')}
              </p>
              <Button
                size="lg"
                variant="default"
                className="bg-background text-primary hover:bg-background/90"
                onClick={() => navigate('/diagnostic')}
              >
                {t('founderStory.ctaButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
