import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const levels = [
  // Entry Level (1-4)
  { level: 1, name: "Welcome", description: "Диагностика", tier: "entry" },
  { level: 2, name: "Foundation", description: "Основи и подредба", tier: "entry" },
  { level: 3, name: "Awakening", description: "Пробуждане на потенциала", tier: "entry" },
  { level: 4, name: "Clarity", description: "Ясна визия и цели", tier: "entry" },
  
  // Core Level (5-8)
  { level: 5, name: "Builder", description: "Изграждане на системи", tier: "core" },
  { level: 6, name: "Accelerator", description: "Ускорение и растеж", tier: "core" },
  { level: 7, name: "Authority", description: "Авторитет и влияние", tier: "core" },
  { level: 8, name: "Mastery", description: "Владеене на уменията", tier: "core" },
  
  // Elite Level (9-12)
  { level: 9, name: "Empire", description: "Изграждане на империя", tier: "elite" },
  { level: 10, name: "Legacy", description: "Наследство и мисия", tier: "elite" },
  { level: 11, name: "Visionary", description: "Визионерско лидерство", tier: "elite" },
  { level: 12, name: "Exclusive Partner", description: "Стратегическо партньорство", tier: "elite" }
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

const AccessLevels = () => {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  
  const getTierLevels = (tier: string) => levels.filter(l => l.tier === tier);

  return (
    <section id="levels" className="py-24 bg-gradient-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Нива на <span className="text-gradient">Достъп</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              12 Степенни на еволюция
            </p>
            <p className="text-muted-foreground">
              🔱 Подредено в 3 реда
            </p>
          </div>

          {/* Entry Level */}
          <div className="mb-12">
            <h3 className={`text-center text-2xl font-bold mb-8 ${tierConfig.entry.textColor}`}>
              {tierConfig.entry.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {getTierLevels('entry').map((item) => (
                <motion.div
                  key={item.level}
                  initial={{ filter: "blur(10px)", opacity: 0.3 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.level * 0.1 }}
                  onMouseEnter={() => setHoveredLevel(item.level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    hoveredLevel === item.level
                      ? `bg-gradient-to-br ${tierConfig.entry.gradient} border-primary shadow-elegant`
                      : 'bg-card/30 border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`text-5xl font-black mb-4 ${tierConfig.entry.textColor} opacity-20`}>
                    {item.level}
                  </div>
                  <h4 className="font-display text-xl font-bold mb-2 text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Core Level */}
          <div className="mb-12">
            <h3 className={`text-center text-2xl font-bold mb-8 ${tierConfig.core.textColor}`}>
              {tierConfig.core.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {getTierLevels('core').map((item) => (
                <motion.div
                  key={item.level}
                  initial={{ filter: "blur(10px)", opacity: 0.3 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (item.level - 5) * 0.1 }}
                  onMouseEnter={() => setHoveredLevel(item.level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    hoveredLevel === item.level
                      ? `bg-gradient-to-br ${tierConfig.core.gradient} border-accent shadow-elegant`
                      : 'bg-card/30 border-border hover:border-accent/50'
                  }`}
                >
                  <div className={`text-5xl font-black mb-4 ${tierConfig.core.textColor} opacity-20`}>
                    {item.level}
                  </div>
                  <h4 className="font-display text-xl font-bold mb-2 text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Elite Level */}
          <div>
            <h3 className={`text-center text-2xl font-bold mb-8 ${tierConfig.elite.textColor}`}>
              {tierConfig.elite.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {getTierLevels('elite').map((item) => (
                <motion.div
                  key={item.level}
                  initial={{ filter: "blur(10px)", opacity: 0.3 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (item.level - 9) * 0.1 }}
                  onMouseEnter={() => setHoveredLevel(item.level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    hoveredLevel === item.level
                      ? `bg-gradient-to-br ${tierConfig.elite.gradient} border-gold shadow-elegant`
                      : 'bg-card/30 border-border hover:border-gold/50'
                  }`}
                >
                  <div className={`text-5xl font-black mb-4 ${tierConfig.elite.textColor} opacity-20`}>
                    {item.level}
                  </div>
                  <h4 className="font-display text-xl font-bold mb-2 text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              variant="hero"
              onClick={() => window.location.href = '/archive/diagnostic'}
            >
              СТАРТИРАЙ С НИВО 1 "ДИАГНОСТИКА"
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessLevels;
