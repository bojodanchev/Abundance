import { ArrowRight } from "lucide-react";
import luxuryPenthouse from "@/assets/luxury-penthouse.jpg";

const SevenSteps = () => {
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

  return (
    <section id="seven-steps" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={luxuryPenthouse} 
          alt="Luxury Penthouse" 
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
              <span className="text-gradient">90 ДНИ: ТВОЯТ СТРАТЕГИЧЕСКИ ПЪТ ОТ ХАОС КЪМ ИЗОБИЛНА СИСТЕМА</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary font-black">
              (Твоят Боен План)
            </p>
          </div>

          {/* Steps Flow */}
          <div className="space-y-6 md:space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="group p-6 md:p-8 bg-gradient-to-br from-primary/5 to-violet/5 border-l-4 border-primary rounded-r-xl hover:border-gold transition-all hover-scale">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  <div className="flex-shrink-0">
                      <div className="text-5xl md:text-6xl font-black text-primary">{step.number}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-3xl md:text-4xl font-black mb-2">{step.title}</h3>
                        <p className="text-lg md:text-xl text-primary font-black uppercase tracking-wider">
                          ({step.subtitle})
                        </p>
                      </div>
                      <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>

                    {idx < steps.length - 1 && (
                      <div className="hidden md:flex items-center">
                        <ArrowRight className="w-6 h-6 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Arrow */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-2">
                    <ArrowRight className="w-6 h-6 text-primary/50 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button
              onClick={() => window.location.href = '/bg/diagnose'}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-black bg-gradient-to-r from-primary to-gold text-background rounded-lg hover:scale-105 transition-transform shadow-glow"
            >
              НАПРАВИ АНАЛИЗ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SevenSteps;
