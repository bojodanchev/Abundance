import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import luxuryPenthouse from "@/assets/luxury-penthouse.jpg";

const steps = [
  {
    number: "1",
    title: "РАДИКАЛНО ПРОБУЖДАНЕ",
    subtitle: "Диагноза",
    description: "Край на посредствеността. Безмилостен одит на твоята идентичност, финанси и дефицити."
  },
  {
    number: "2",
    title: "СТРАТЕГИЧЕСКО ПОДРЕЖДАНЕ",
    subtitle: "Системи",
    description: "Премахване на парализиращия хаос и страхове. Инсталиране на нови, железни навици и продуктивно мислене."
  },
  {
    number: "3",
    title: "ЕЛИТНИ УМЕНИЯ",
    subtitle: "Инструменти",
    description: "Овладяване на високодоходни механизми като финанси, продажби, дисциплина и влияние."
  },
  {
    number: "4",
    title: "АГРЕСИВНО ПРИЛОЖЕНИЕ",
    subtitle: "Действие",
    description: "Преход от теория към масирани реални действия и измерим, видим растеж."
  },
  {
    number: "5",
    title: "СИСТЕМНА ИНТЕГРАЦИЯ",
    subtitle: "Автоматизация",
    description: "Новият висок стандарт става твой автоматичен режим. Усилието изчезва, резултатът остава."
  },
  {
    number: "6",
    title: "МАЩАБНО РАЗШИРЯВАНЕ",
    subtitle: "Влияние",
    description: "Тук играта се променя. Вече не говорим за оцеляване, а за доминантна пазарна позиция."
  },
  {
    number: "7",
    title: "АБСОЛЮТНО ИЗДИГАНЕ",
    subtitle: "Изобилие",
    description: "Реалността е пренаписана. Достигаш ниво на авторитет, за което другите само мечтаят."
  }
];

const SevenSteps = () => {
  const navigate = useNavigate();
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleStep = (idx: number) => {
    setExpandedSteps(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="seven-steps" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={luxuryPenthouse} alt="Luxury Penthouse" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="text-gradient">Последователност на 90-дневната трансформация</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary font-black">
              (Твоят Боен План)
            </p>
          </div>

          {/* Steps Accordion */}
          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
              >
                <button
                  onClick={() => toggleStep(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-card/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-black text-xl">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-foreground">{step.title}</h3>
                      <p className="text-sm text-primary font-bold uppercase tracking-wider">({step.subtitle})</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform flex-shrink-0 ${expandedSteps.includes(idx) ? 'rotate-180' : ''}`} />
                </button>

                {expandedSteps.includes(idx) && (
                  <div className="px-6 pb-5 pt-2 border-t border-border/30">
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium pl-16">
                      {step.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button variant="hero" size="xl" onClick={() => navigate('/diagnostic')}>
              НАПРАВИ ДИАГНОСТИКАТА
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SevenSteps;
