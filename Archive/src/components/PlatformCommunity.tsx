import { Button } from "@/components/ui/button";
import { Monitor, RefreshCcw, Users, Lock } from "lucide-react";

const cards = [
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Ексклузивна платформа",
    description: "Достъп до затворена образователна платформа с всички модули, уроци и материали.",
    color: "text-primary",
    borderColor: "border-primary/20"
  },
  {
    icon: <RefreshCcw className="w-8 h-8" />,
    title: "Постоянна еволюция",
    description: "Седмични обновления, нови модули и стратегии, базирани на реални резултати.",
    color: "text-gold",
    borderColor: "border-gold/20"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Подкрепа",
    description: "Активна общност и менторска подкрепа на всяка стъпка от пътя ти.",
    color: "text-violet",
    borderColor: "border-violet/20"
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Ограничени места",
    description: "Лимитиран брой участници за качествено преживяване и персонално внимание.",
    color: "text-accent",
    borderColor: "border-accent/20"
  }
];

const PlatformCommunity = () => {
  return (
    <section className="py-24 bg-gradient-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              С нас <span className="text-gradient">към върха</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Всичко, от което се нуждаеш, на едно място
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <div key={i} className={`p-8 bg-card/30 backdrop-blur-sm border ${card.borderColor} rounded-xl hover:border-opacity-100 transition-all`}>
                <div className={`${card.color} mb-4`}>{card.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${card.color}`}>{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="hero" size="lg" onClick={() => window.open('#', '_blank')}>
              ВИЖ SPACE CIRCLE
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Линкът ще бъде наличен скоро
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformCommunity;
