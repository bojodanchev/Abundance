import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import luxuryOffice from "@/assets/luxury-office.jpg";

const SocialProof = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      text: t('socialProof.testimonial1'),
      rating: 5
    },
    {
      id: 2,
      text: t('socialProof.testimonial2'),
      rating: 5
    },
    {
      id: 3,
      text: t('socialProof.testimonial3'),
      rating: 5,
      highlight: true
    },
    {
      id: 4,
      text: t('socialProof.testimonial4'),
      rating: 5
    }
  ];

  return (
    <section id="proof" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={luxuryOffice}
          alt="Luxury Office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-gradient">{t('socialProof.headlinePart1')}</span>
              <br />
              {t('socialProof.headlinePart2')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-semibold">
              {t('socialProof.subheadline')}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`p-6 md:p-8 bg-gradient-to-br from-primary/5 to-violet/5 border rounded-xl hover-scale transition-all ${
                  testimonial.highlight
                    ? 'border-gold/50 shadow-glow'
                    : 'border-primary/20 hover:border-primary/40'
                }`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium">
                  {testimonial.text}
                </p>

                {testimonial.highlight && (
                  <div className="mt-4 pt-4 border-t border-gold/20">
                    <p className="text-xs text-gold font-semibold">
                      {t('socialProof.heroStoryLabel')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tech Update */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-violet/10 to-primary/10 border border-primary/30 rounded-xl mb-12">
            <h3 className="text-xl md:text-2xl font-black mb-4 text-center">
              {t('socialProof.techUpdateTitle')}
            </h3>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground">
              <p>
                <span className="font-semibold text-primary">{t('socialProof.exclusivePlatformLabel')}</span> {t('socialProof.exclusivePlatformText')}
              </p>
              <p>
                <span className="font-semibold text-violet">{t('socialProof.constantEvolutionLabel')}</span> {t('socialProof.constantEvolutionText')}
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black mb-6 text-center">
              {t('socialProof.videoHeadlinePart1')} <span className="text-gradient">{t('socialProof.videoHeadlinePart2')}</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-gradient-to-br from-primary/20 to-violet/20 rounded-xl border-2 border-primary/30 flex items-center justify-center cursor-pointer hover:border-primary/60 transition-all hover-scale"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{t('socialProof.videoEmoji')}</div>
                    <p className="text-xs text-muted-foreground px-4">
                      {t('socialProof.videoStory', { number: i })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              {t('socialProof.watchVideoStories')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
