import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccessLevels = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  const levels = [
    // Entry Level (1-4)
    { level: 1, name: "Welcome", description: t('accessLevels.level1Desc'), tier: "entry" },
    { level: 2, name: "Foundation", description: t('accessLevels.level2Desc'), tier: "entry" },
    { level: 3, name: "Awakening", description: t('accessLevels.level3Desc'), tier: "entry" },
    { level: 4, name: "Clarity", description: t('accessLevels.level4Desc'), tier: "entry" },
    // Core Level (5-8)
    { level: 5, name: "Builder", description: t('accessLevels.level5Desc'), tier: "core" },
    { level: 6, name: "Accelerator", description: t('accessLevels.level6Desc'), tier: "core" },
    { level: 7, name: "Authority", description: t('accessLevels.level7Desc'), tier: "core" },
    { level: 8, name: "Mastery", description: t('accessLevels.level8Desc'), tier: "core" },
    // Elite Level (9-12)
    { level: 9, name: "Empire", description: t('accessLevels.level9Desc'), tier: "elite" },
    { level: 10, name: "Legacy", description: t('accessLevels.level10Desc'), tier: "elite" },
    { level: 11, name: "Visionary", description: t('accessLevels.level11Desc'), tier: "elite" },
    { level: 12, name: "Exclusive Partner", description: t('accessLevels.level12Desc'), tier: "elite" }
  ];

  const tierConfig = {
    entry: {
      title: "ENTRY LEVEL",
      gradient: "from-primary/20 to-primary/10",
      textColor: "text-primary"
    },
    core: {
      title: "CORE LEVEL",
      gradient: "from-accent/20 to-accent/10",
      textColor: "text-accent"
    },
    elite: {
      title: "ELITE LEVEL",
      gradient: "from-gold/20 to-gold/10",
      textColor: "text-gold"
    }
  };

  const getTierLevels = (tier: string) => levels.filter(l => l.tier === tier);

  const toggleReveal = (level: number) => {
    setRevealedCards(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const isRevealed = (level: number) => revealedCards.includes(level);

  const renderCard = (item: typeof levels[0], tierKey: keyof typeof tierConfig, indexInTier: number) => {
    const revealed = isRevealed(item.level);
    const config = tierConfig[tierKey];

    return (
      <motion.div
        key={item.level}
        initial={{ filter: "blur(8px)", opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.06, y: -4 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: indexInTier * 0.18,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onMouseEnter={() => setHoveredLevel(item.level)}
        onMouseLeave={() => setHoveredLevel(null)}
        onClick={() => toggleReveal(item.level)}
        className={`relative p-6 rounded-xl border transition-colors duration-300 cursor-pointer ${
          hoveredLevel === item.level || revealed
            ? `bg-gradient-to-br ${config.gradient} border-${tierKey === 'entry' ? 'primary' : tierKey === 'core' ? 'accent' : 'gold'} shadow-elegant`
            : 'bg-card/30 border-border hover:border-' + (tierKey === 'entry' ? 'primary' : tierKey === 'core' ? 'accent' : 'gold') + '/50'
        }`}
      >
        <div className={`text-5xl font-black mb-4 ${config.textColor} opacity-20`}>
          {item.level}
        </div>
        <h4 className="font-display text-xl font-bold mb-2 text-foreground">
          {item.name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {item.description}
        </p>
      </motion.div>
    );
  };

  return (
    <section id="levels" className="py-24 bg-gradient-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {t('accessLevels.headlinePart1')} <span className="text-gradient">{t('accessLevels.headlineHighlight')}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              {t('accessLevels.subheadline')}
            </p>
            <p className="text-muted-foreground">
              {t('accessLevels.arrangement')}
            </p>
          </div>

          {/* Entry Level */}
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-center text-2xl font-bold mb-8 ${tierConfig.entry.textColor}`}
            >
              {tierConfig.entry.title}
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {getTierLevels('entry').map((item, i) => renderCard(item, 'entry', i))}
            </div>
          </div>

          {/* Core Level */}
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-center text-2xl font-bold mb-8 ${tierConfig.core.textColor}`}
            >
              {tierConfig.core.title}
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {getTierLevels('core').map((item, i) => renderCard(item, 'core', i))}
            </div>
          </div>

          {/* Elite Level */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-center text-2xl font-bold mb-8 ${tierConfig.elite.textColor}`}
            >
              {tierConfig.elite.title}
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {getTierLevels('elite').map((item, i) => renderCard(item, 'elite', i))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              variant="hero"
              onClick={() => navigate('/diagnostic')}
            >
              {t('accessLevels.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessLevels;
