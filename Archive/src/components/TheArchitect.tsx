import { Book, Trophy, Flame, TrendingDown, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import luxuryPattern from "@/assets/luxury-pattern.jpg";

const TheArchitect = () => {
  const timeline = [
    {
      icon: Book,
      age: "НА 15",
      title: "УЛИЦАТА БЕШЕ МОЯТ ОФИС",
      detail: "Докато другите играеха игри, аз продавах книги на улицата. Там научих урок за изобилието: Ако не можеш да продаваш, си мъртъв. Отхвърлянето не ме спря, то ме каляваше всеки ден.",
      color: "primary"
    },
    {
      icon: Trophy,
      age: "НАЦИОНАЛНО НИВО",
      title: "ДИСЦИПЛИНАТА",
      detail: "Спортът ме научи, че тялото е машина. Няма 'не мога', има 'не искам'. Тази дисциплина сега е в основата модулите.",
      color: "gold"
    },
    {
      icon: Flame,
      age: "НА 17",
      title: "ЛИДЕРСТВО ПОД ОГЪН",
      detail: "Ръководих екипи от хора, по-възрастни от мен. Научих се да нося отговорност не само за себе си, а за резултатите на другите.",
      color: "violet"
    },
    {
      icon: TrendingDown,
      age: "ПАДАНЕ И ВЪЗХОД",
      title: "ЦЕНАТА НА ХАОСА",
      detail: "Инвестирах. Печелих много. Губих всичко. Падах и ставах. Разбрах по трудния начин, че парите без структура са просто пясък който се изплъзва между пръстите.",
      color: "gold"
    },
    {
      icon: Building,
      age: "СЕГА",
      title: "СЪЗДАТЕЛ",
      detail: "Побеждавах себе си отново и отново, за да създам този Код.",
      color: "primary"
    }
  ];

  return (
    <section id="architect" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={luxuryPattern} 
          alt="Luxury Pattern" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              НЕ СЪМ РОДЕН С <span className="text-gradient">ПРЕДИМСТВА.</span>
              <br />
              ИЗГРАДИХ ВСИЧКО САМ.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-semibold">
              ШОН. Архитектът зад CODE: ABUNDANCE™.
            </p>
          </div>

          {/* Intro */}
          <div className="mb-12 p-8 md:p-10 bg-gradient-to-br from-primary/10 to-violet/10 border border-primary/30 rounded-xl text-center">
            <p className="text-lg md:text-2xl text-foreground/90 leading-relaxed font-semibold">
              "Аз не съм теоретик от университет. Аз съм продукт на собствената си система. Всичко, което виждаш в CODE: ABUNDANCE™, е тествано не в лаборатория, а на бойното поле на живота."
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-black mb-8 text-center">THE TIMELINE</h3>
            
            <Accordion type="single" collapsible className="space-y-4">
              {timeline.map((item, idx) => {
                const Icon = item.icon;
                const colorClass = item.color === "gold" ? "gold" : item.color === "violet" ? "violet" : "primary";
                
                return (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className={`border-2 border-${colorClass}/30 rounded-xl overflow-hidden bg-gradient-to-br from-${colorClass}/5 to-${colorClass}/10`}
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left w-full">
                        <div className={`w-12 h-12 rounded-full bg-${colorClass}/20 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-6 h-6 text-${colorClass}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-semibold text-${colorClass} mb-1`}>
                            {item.age}
                          </div>
                          <div className="text-base md:text-lg font-black">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-16">
                        <span className="font-semibold">Детайл:</span> {item.detail}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Key Message */}
          <div className="p-6 md:p-10 bg-gradient-to-br from-primary/10 to-gold/10 border-2 border-primary/30 rounded-xl text-center mb-8">
            <h3 className="text-xl md:text-2xl font-black mb-4">KEY MESSAGE:</h3>
            <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4">
              CODE: ABUNDANCE™ е структурираният резултат от тези уроци. Аз вече платих цената с години време, грешки и болка.
            </p>
            <p className="text-base md:text-lg font-bold text-primary">
              Ти не трябва да плащаш тази цена. Ти можеш да вземеш готовия план сега.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ВИЖ КАК ЩЕ РАБОТИ ЗА ТЕБ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheArchitect;
