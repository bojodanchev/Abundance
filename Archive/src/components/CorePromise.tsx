import { TrendingUp, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import luxuryBuilding from "@/assets/luxury-building.jpg";
const CorePromise = () => {
  const scrollToPrograms = () => {
    const element = document.getElementById('programs');
    if (element) element.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section id="core-promise" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-gradient">90 ДНИ. 3 СФЕРИ. 1 НОВА РЕАЛНОСТ.</span>
            </h2>
            <p className="text-2xl md:text-3xl text-primary mb-8 font-black">
              (Твоят План за УСПЕХ)
            </p>
            <p className="text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto leading-relaxed font-bold">
              CODE: ABUNDANCE™ връчва контрола над трите стълба, определящи съдбата ти. <span className="text-primary">Не просто "обучение"</span>, а <span className="text-gold">директно внедряване</span> на персонализирани решения в твоя БИЗНЕС, ЗДРАВЕ и ЛИЧНОСТ.
            </p>
            <p className="text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium mt-4">
              Това е арсенал от специализирана структура, която превръща общите съвети в индивидуална стратегия. Вместо да се луташ в хаоса, ти получаваш точното "ниширане", нужно за твоите конкретни цели в живота.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Pillar 1: Finances */}
            <div className="group p-6 md:p-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl hover:border-primary/40 transition-all hover-scale">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <div className="text-5xl md:text-6xl font-black text-primary mb-4">1</div>
              <h3 className="text-3xl md:text-4xl font-black mb-5 md:mb-6">ФИНАНСИ</h3>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-bold">
                От хаотични доходи, зависими от случайния късмет {'—>'} към <span className="text-primary font-black">Непоклатими Системи за Богатство</span>, които работят автоматично и безотказно.
              </p>
            </div>

            {/* Pillar 2: Energy */}
            <div className="group p-6 md:p-8 bg-gradient-to-br from-violet/10 to-violet/5 border border-violet/20 rounded-xl hover:border-violet/40 transition-all hover-scale">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-violet/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-violet" />
              </div>
              <div className="text-5xl md:text-6xl font-black text-violet mb-4">2</div>
              <h3 className="text-3xl md:text-4xl font-black mb-5 md:mb-6">ЕНЕРГИЯ</h3>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-bold">
                От хронична умора и смазващо "прегаряне" {'—>'} към <span className="text-violet font-black">Дисциплиниран Биологичен Двигател</span>, който захранва мащабните ти амбиции без прекъсване.
              </p>
            </div>

            {/* Pillar 3: Identity */}
            <div className="group p-6 md:p-8 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-xl hover:border-gold/40 transition-all hover-scale">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-gold" />
              </div>
              <div className="text-5xl md:text-6xl font-black text-gold mb-4">3</div>
              <h3 className="text-3xl md:text-4xl font-black mb-5 md:mb-6">ЛИЧНОСТ</h3>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-bold">
                От парализиращо объркване и страх {'—>'} към <span className="text-gold font-black">Ясна, Магнетична Идентичност</span>, която взима стратегически решения и печели всеки ден.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="hero" size="xl" onClick={scrollToPrograms} className="group">
              Започни Своята Трансформация
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default CorePromise;