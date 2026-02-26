import { Quote } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Investment = () => {
  const { t } = useTranslation();

  const coreQuotes = [
    t('investment.quote1'),
    t('investment.quote2'),
    t('investment.quote3')
  ];

  return (
    <section id="investment" className="py-32 bg-gradient-dark relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <Quote className="text-primary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary/90">
                {t('investment.badge')}
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-7xl font-black mb-8 leading-tight"
              dangerouslySetInnerHTML={{ __html: t('investment.heading') }}
            />

            <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              {t('investment.subheading')}
            </p>
          </div>

          {/* Environment Quote */}
          <div className="text-center mb-12 py-10 border-y border-border/30">
            <p className="font-quote text-3xl md:text-4xl italic text-muted-foreground font-semibold">
              {t('investment.environmentQuote')}
            </p>
          </div>

          {/* Core Lessons - Rotating Quotes */}
          <div className="grid md:grid-cols-3 gap-8">
            {coreQuotes.map((quote, index) => (
              <div
                key={index}
                className="relative p-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-elegant group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-elegant origin-left"></div>

                <Quote className="text-primary/30 mb-6" size={48} />

                <p className="font-display text-3xl md:text-4xl font-black leading-tight">
                  {quote}
                </p>

                <div className="absolute bottom-8 right-8 text-7xl font-display font-black text-primary/5">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investment;
