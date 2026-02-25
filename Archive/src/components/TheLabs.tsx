import { Button } from "@/components/ui/button";
import { DollarSign, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import luxuryMansion from "@/assets/luxury-mansion.jpg";

const labs = [
  {
    icon: <DollarSign className="w-10 h-10" />,
    title: "Wealth Systems Lab",
    subtitle: "Финансови системи и бизнес архитектура",
    description: "Изгради фундамента на финансовата си свобода с доказани бизнес модели, маркетинг стратегии и AI автоматизации.",
    color: "text-gold",
    borderColor: "border-gold/30",
    bgGradient: "from-gold/10 to-gold/5",
    hoverBorder: "hover:border-gold"
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: "Health Systems Lab",
    subtitle: "Здраве, енергия и био-оптимизация",
    description: "Оптимизирай физическото и менталното си здраве за максимална производителност и енергия.",
    color: "text-primary",
    borderColor: "border-primary/30",
    bgGradient: "from-primary/10 to-primary/5",
    hoverBorder: "hover:border-primary"
  },
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: "Prosperity Lab",
    subtitle: "Личностно развитие и духовен растеж",
    description: "Познай себе си чрез Human Design, развий лидерски умения и създай живот с цел и посока.",
    color: "text-violet",
    borderColor: "border-violet/30",
    bgGradient: "from-violet/10 to-violet/5",
    hoverBorder: "hover:border-violet"
  }
];

const TheLabs = () => {
  const scrollToModules = () => {
    const element = document.getElementById('modules');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="system" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={luxuryMansion} alt="Luxury Mansion" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="text-gradient">3 СФЕРИ → 90 ДНИ → НОВА РЕАЛНОСТ</span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 font-medium max-w-3xl mx-auto">
              Три лаборатории, всяка фокусирана върху критична сфера от живота ти
            </p>
          </div>

          {/* Lab Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {labs.map((lab, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                onClick={scrollToModules}
                className={`group relative p-8 rounded-xl border ${lab.borderColor} ${lab.hoverBorder} bg-gradient-to-br ${lab.bgGradient} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-elegant`}
              >
                <div className={`${lab.color} mb-6`}>{lab.icon}</div>
                <h3 className={`text-2xl font-black mb-2 ${lab.color}`}>{lab.title}</h3>
                <p className="text-base text-foreground font-semibold mb-4">{lab.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{lab.description}</p>
                <div className={`mt-6 text-sm font-bold ${lab.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Виж модулите →
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="hero" size="xl" onClick={scrollToModules}>
              Виж всички модули
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheLabs;
