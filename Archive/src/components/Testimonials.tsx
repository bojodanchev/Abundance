import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t('testimonials.person1Name'),
      role: t('testimonials.person1Role'),
      quote: t('testimonials.person1Quote'),
      rating: 5
    },
    {
      name: t('testimonials.person2Name'),
      role: t('testimonials.person2Role'),
      quote: t('testimonials.person2Quote'),
      rating: 5
    },
    {
      name: t('testimonials.person3Name'),
      role: t('testimonials.person3Role'),
      quote: t('testimonials.person3Quote'),
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {t('testimonials.headlinePart1')} <span className="text-gradient">{t('testimonials.headlineHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('testimonials.subheadline')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonialItem, i) => (
              <div key={i} className="p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{testimonialItem.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonialItem.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonialItem.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonialItem.quote}"
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: testimonialItem.rating }).map((_, idx) => (
                    <span key={idx} className="text-yellow-500">{'\u2605'}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {t('testimonials.moreComingSoon')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
