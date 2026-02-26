import { Button } from "@/components/ui/button";
import { Users, MessageCircle, TrendingUp, Award } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { useTranslation } from 'react-i18next';

const Community = () => {
  const { t } = useTranslation();

  const highlights = [
    { icon: Users, stat: "500+", label: t('community.stat1Label'), description: t('community.stat1Desc') },
    { icon: TrendingUp, stat: "€2M+", label: t('community.stat2Label'), description: t('community.stat2Desc') },
    { icon: Award, stat: "47", label: t('community.stat3Label'), description: t('community.stat3Desc') },
    { icon: MessageCircle, stat: t('community.stat4Value'), label: t('community.stat4Label'), description: t('community.stat4Desc') }
  ];

  const testimonials = [
    { quote: t('community.testimonial1Quote'), author: "Stefan K.", achievement: t('community.testimonial1Achievement') },
    { quote: t('community.testimonial2Quote'), author: "Maria D.", achievement: t('community.testimonial2Achievement') },
    { quote: t('community.testimonial3Quote'), author: "Ivan P.", achievement: t('community.testimonial3Achievement') }
  ];

  const handleJoinClick = () => {
    trackEvent('cta_click', {
      cta_name: 'join_community',
      cta_location: 'community_section'
    });

    // Replace with actual Skool/Telegram link
    window.open('YOUR_COMMUNITY_LINK', '_blank');
  };

  return (
    <section id="community" className="py-32 bg-gradient-dark relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-secondary/20 bg-card/30 backdrop-blur-sm">
              <Users className="text-secondary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-secondary/90">
                {t('community.badge')}
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Code Abundance™ <span className="text-gradient">{t('community.headingHighlight')}</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('community.subheading')}
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
              >
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-secondary">
                    {testimonial.achievement}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-block p-8 rounded-2xl border border-secondary/30 bg-card/50 backdrop-blur-sm">
              <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                {t('community.ctaText')}
              </p>

              <Button
                variant="premium"
                size="xl"
                onClick={handleJoinClick}
                className="shadow-violet"
              >
                {t('community.ctaButton')}
                <Users className="ml-2" size={20} />
              </Button>

              <p className="text-sm text-muted-foreground/60 mt-4">
                {t('community.ctaSubtext')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
