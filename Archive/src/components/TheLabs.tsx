import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import luxuryMansion from "@/assets/luxury-mansion.jpg";

const TheLabs = () => {
  const scrollToPrograms = () => {
    const element = document.getElementById('levels');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="system" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={luxuryMansion} 
          alt="Luxury Mansion" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-10 leading-tight">
              <span className="text-gradient">ГОТОВ ЛИ СИ ЗА ИСТИНАТА?</span>
            </h2>
            <p className="text-2xl md:text-3xl text-foreground font-black mb-6 leading-relaxed max-w-4xl mx-auto">
              Не ти трябват "тайни" нито "хакове" за успех. Нужно е да диагностицираш фундаменталния проблем, който те държи в застой..
            </p>
            <p className="text-xl md:text-2xl text-primary font-black leading-relaxed max-w-4xl mx-auto mb-8">
              Именно хаосът, объркването и разпиляната енергия.
            </p>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-4xl mx-auto font-medium">
              Тук получаваш: <span className="text-gold font-bold">Персонализиран анализ</span>, базиран на твоя Human Design, (система за самопознание, която комбинира древна мъдрост и модерна наука) както и стратегия за 7-те сфери на живота (основните житейски съставни части, за да видим къде има растеж и къде има дупка)
            </p>
          </div>

          {/* Tabs Section */}
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-black mb-8 text-center">За кого е КОД: ИЗОБИЛИЕ?</h3>
            <Tabs defaultValue="beginners" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="beginners" className="text-lg md:text-xl font-black">
                  Новостартиращи
                </TabsTrigger>
                <TabsTrigger value="entrepreneurs" className="text-lg md:text-xl font-black">
                  Опитни предприемачи
                </TabsTrigger>
                <TabsTrigger value="creators" className="text-lg md:text-xl font-black">
                  Създатели
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="beginners" className="mt-8">
                <div className="p-8 md:p-10 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl">
                  <h4 className="text-2xl md:text-3xl font-black mb-5 text-primary leading-tight">Стартирай своя път на личностно развитие и предприемачество</h4>
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-medium">
                    Идеално за хора, които искат да стартират своя бизнес или да подобрят финансовата си ситуация.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="entrepreneurs" className="mt-8">
                <div className="p-8 md:p-10 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-xl">
                  <h4 className="text-2xl md:text-3xl font-black mb-5 text-gold leading-tight">Създай 6-цифрен бизнес и скалирай своите проекти на следващото ниво</h4>
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-medium">
                    За тези, които вече имат бизнес и искат да го скалират към 6-цифрени печалби.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="creators" className="mt-8">
                <div className="p-8 md:p-10 bg-gradient-to-br from-violet/10 to-violet/5 border border-violet/20 rounded-xl">
                  <h4 className="text-2xl md:text-3xl font-black mb-5 text-violet leading-tight">Изгради, монетизирай и автоматизирай своята лоялна аудитория и екипите си</h4>
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-medium">
                    Създатели на съдържание и лидери, които искат да монетизират своята аудитория.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <p className="text-2xl md:text-3xl text-foreground font-black mb-6 leading-tight max-w-4xl mx-auto">
              Открий архитектурата, която подрежда живота ти и изгражда ИЗОБИЛИЕ!
            </p>
            <p className="text-xl md:text-2xl text-primary font-black mb-10">
              ∞ ЛИЧНОСТНО + ФИНАНСОВО + ЕНЕРГИЙНО ∞
            </p>
            <Button variant="hero" size="xl" onClick={scrollToPrograms}>
              ЗАПОЧНИ СЕГА
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheLabs;
