import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/luxury-office.jpg";
const Hero = () => {
  const scrollToPrograms = () => {
    window.location.href = '/bg/diagnose';
  };
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Luxury Office Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-40"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Limited Places Badge */}
          <div className="inline-block mb-8">
            <div className="px-6 py-3 bg-gold/20 border border-gold/40 rounded-full">
              <p className="text-sm md:text-base font-black text-gold uppercase tracking-wider">
                ЛИМИТИРАНИ МЕСТА
              </p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black mb-8 leading-tight tracking-tight lg:text-6xl">
            <span className="text-foreground">Как да </span>
            <span className="text-gradient">пренапишеш финансовата си реалност</span>
            <br />
            <span className="text-foreground">и да активираш вътрешния си </span>
            <span className="text-gradient">потенциал за 90 дни</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-foreground/90 mb-10 md:mb-12 max-w-5xl mx-auto leading-relaxed font-bold">
            Това е двигателят за предприемачество през 2026-та година. <span className="text-primary">Доказаната обучителна система</span> за личностно и бизнес развитие в България, която ти дава инструментите и средата да <span className="text-gold">трансформираш живота си на следващото ниво</span>
          </p>

          {/* CTA Button */}
          <Button variant="hero" size="xl" onClick={scrollToPrograms} className="group shadow-glow text-lg px-10 py-7 md:px-14 md:py-9">
            ПОЛУЧИ БЕЗПЛАТНИЯ АНАЛИЗ НА УСПЕХА
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>;
};
export default Hero;