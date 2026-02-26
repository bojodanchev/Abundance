import { Trophy, Waves, Target, Dumbbell } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Sports = () => {
  const { t } = useTranslation();

  const achievements = [
    {
      sport: t('sports.sport1Name'),
      role: t('sports.sport1Role'),
      achievement: t('sports.sport1Achievement'),
      values: [t('sports.sport1Value1'), t('sports.sport1Value2'), t('sports.sport1Value3')],
      icon: Target,
      year: "2010-2015"
    },
    {
      sport: t('sports.sport2Name'),
      role: t('sports.sport2Role'),
      achievement: t('sports.sport2Achievement'),
      values: [t('sports.sport2Value1'), t('sports.sport2Value2'), t('sports.sport2Value3')],
      icon: Waves,
      year: "2012-2016"
    },
    {
      sport: t('sports.sport3Name'),
      role: t('sports.sport3Role'),
      achievement: t('sports.sport3Achievement'),
      values: [t('sports.sport3Value1'), t('sports.sport3Value2'), t('sports.sport3Value3')],
      icon: Trophy,
      year: "2008-2014"
    },
    {
      sport: t('sports.sport4Name'),
      role: t('sports.sport4Role'),
      achievement: t('sports.sport4Achievement'),
      values: [t('sports.sport4Value1'), t('sports.sport4Value2'), t('sports.sport4Value3')],
      icon: Dumbbell,
      year: "2009-2013"
    }
  ];

  return (
    <section id="sports" className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-secondary/20 bg-card/30 backdrop-blur-sm">
              <Trophy className="text-secondary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-secondary/90">
                {t('sports.badge')}
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight"
              dangerouslySetInnerHTML={{ __html: t('sports.heading') }}
            />

            <div className="relative inline-block">
              <p className="font-quote text-3xl md:text-4xl italic text-foreground relative z-10">
                {t('sports.quote')}
              </p>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-primary"></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20"></div>

            <div className="space-y-16">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative grid md:grid-cols-2 gap-8 items-center ${
                      isLeft ? '' : 'md:text-right'
                    }`}
                  >
                    {/* Content */}
                    <div className={`${isLeft ? 'md:pr-12' : 'md:pl-12 md:col-start-2'}`}>
                      <div className="relative p-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-elegant hover:shadow-violet group">
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary/10 mb-6 group-hover:bg-secondary/20 transition-smooth ${
                          isLeft ? '' : 'md:ml-auto'
                        }`}>
                          <Icon className="text-secondary" size={32} />
                        </div>

                        {/* Sport Info */}
                        <div className="mb-4">
                          <div className="text-sm font-semibold text-secondary mb-2 tracking-widest">
                            {achievement.year}
                          </div>
                          <h3 className="font-display text-3xl font-bold mb-2">
                            {achievement.sport}
                          </h3>
                          <div className="text-lg text-muted-foreground mb-1">
                            {achievement.role}
                          </div>
                          <div className="text-primary font-semibold">
                            {achievement.achievement}
                          </div>
                        </div>

                        {/* Values */}
                        <div className={`flex flex-wrap gap-2 ${isLeft ? '' : 'md:justify-end'}`}>
                          {achievement.values.map((value, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 rounded-full"
                            >
                              {value}
                            </span>
                          ))}
                        </div>

                        {/* Decorative Element */}
                        <div className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} w-1 h-full bg-gradient-to-b from-secondary to-transparent opacity-50`}></div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background shadow-violet"></div>

                    {/* Medal/Photo Placeholder */}
                    <div className={`${isLeft ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}>
                      <div className={`aspect-square rounded-xl overflow-hidden border border-border/50 bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center ${
                        isLeft ? 'md:pl-12' : 'md:pr-12'
                      }`}>
                        <div className="text-center">
                          <Icon className="text-secondary/30 mx-auto mb-4" size={80} />
                          <div className="text-6xl font-display font-black text-secondary/20">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sports;
