import { Briefcase } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { t } = useTranslation();

  const experiences = [
    { title: t('experience.exp1Title'), description: t('experience.exp1Desc'), period: t('experience.exp1Period') },
    { title: t('experience.exp2Title'), description: t('experience.exp2Desc'), period: t('experience.exp2Period') },
    { title: t('experience.exp3Title'), description: t('experience.exp3Desc'), period: t('experience.exp3Period') },
    { title: t('experience.exp4Title'), description: t('experience.exp4Desc'), period: t('experience.exp4Period') },
    { title: t('experience.exp5Title'), description: t('experience.exp5Desc'), period: t('experience.exp5Period') },
    { title: t('experience.exp6Title'), description: t('experience.exp6Desc'), period: t('experience.exp6Period') },
    { title: t('experience.exp7Title'), description: t('experience.exp7Desc'), period: t('experience.exp7Period') }
  ];

  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <Briefcase className="text-primary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary/90">
                {t('experience.badge')}
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: t('experience.heading') }}
            />

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('experience.subheading')}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 hidden md:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-gold"></div>

                  {/* Content card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="inline-block p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-elegant group">
                      <div className="mb-2">
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary/60">
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-smooth">
                        {exp.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
