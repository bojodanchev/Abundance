import { Book, Crown, Heart } from "lucide-react";
import luxuryBoardroom from "@/assets/luxury-boardroom.jpg";

const TheWhy = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={luxuryBoardroom} 
          alt="Luxury Boardroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-base md:text-lg text-primary font-bold mb-4 uppercase tracking-wider">
              Философията
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              от <span className="text-gradient">МЕЧТА</span> до <span className="text-gradient">РЕАЛНОСТ</span>
            </h2>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-12 md:mb-16">
            <div className="p-8 md:p-10 bg-gradient-to-br from-primary/5 to-violet/5 border border-primary/20 rounded-xl">
              <p className="text-xl md:text-2xl text-foreground font-black mb-10 leading-relaxed">
                Истината е непоклатима. Тя е вечният, невидим мост, който превръща абстрактната идея в измерима реалност.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6">
                <div className="flex gap-4">
                  <Book className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-bold">
                      Древните гърци са казали: <span className="font-black text-primary">"Познай себе си."</span> (Това е фундаментът на всяко величие).
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Crown className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-bold">
                      Цар Соломон е добавил: <span className="font-black text-gold">"Пази сърцето си, защото от него са изворите на живота (Изобилието)."</span> (Това е механизмът на твоя успех).
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-background/50 rounded-lg border border-primary/10">
                <div className="flex gap-3 mb-3">
                  <Heart className="w-6 h-6 text-primary flex-shrink-0" />
                  <h3 className="text-xl md:text-2xl font-black">Ключов Извод:</h3>
                </div>
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium">
                  Твоите непреодолими трудности всъщност не са проблеми. Те са алармиращ симптом, че не познаваш своя автентичен Аз. Системата на CODE ABUNDANCE не е просто "съвет". Тя е безкомпромисно прилагане на един вечно работещ закон.
                </p>
              </div>
            </div>
          </div>

          {/* Deep Truth - Expandable */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-violet/5 to-primary/5 border border-violet/20 rounded-xl">
            <h3 className="text-2xl md:text-3xl font-black mb-5 text-center">Истината има своя железна структура</h3>
            <p className="text-base md:text-lg text-foreground/90 text-center leading-relaxed max-w-3xl mx-auto font-medium">
              Материалното богатство и Духовната сила не са врагове. Те са двете страни на една и съща монета. Всичко се нарежда в съвършен синхрон в момента, в който ти вземеш осъзнато решение.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheWhy;
