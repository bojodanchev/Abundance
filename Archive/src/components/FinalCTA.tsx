import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import luxuryBuilding from "@/assets/luxury-building.jpg";

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={luxuryBuilding} 
          alt="Luxury Building" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
              <AlertCircle className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-10 leading-tight">
            <span className="text-gradient">ЛИПСАТА Е ИЗБОР.</span>
            <br />
            <span className="text-foreground">ИЗОБИЛИЕТО СЪЩО.</span>
          </h2>

          {/* Copy */}
          <div className="mb-12 space-y-8">
            <p className="text-2xl md:text-3xl text-foreground font-black leading-relaxed">
              Ти вече видя СИСТЕМАТА. Нямаш повече оправдания. Време е да вземеш твоя стратегически самоанализ.
            </p>
            
            <div className="p-8 md:p-10 bg-gradient-to-br from-gold/10 to-primary/10 border border-gold/30 rounded-xl">
              <p className="text-xl md:text-2xl text-foreground font-black leading-relaxed mb-4">
                Помни математиката на успеха:
              </p>
              <p className="text-2xl md:text-4xl text-primary font-black mt-2 leading-tight">
                Всеки ден колебание днес = 1 седмица изгубен потенциал утре.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => navigate('/diagnostic')}
            className="group shadow-glow text-lg px-8 py-6 md:px-12 md:py-8"
          >
            СТАРТИРАЙ СВОЯТА БЕЗПЛАТНА ДИАГНОСТИКА НА УСПЕХА
          </Button>

          <p className="text-sm text-muted-foreground/60 mt-4 italic">(или остани на същото място където си)</p>

          <p className="text-sm md:text-base text-muted-foreground mt-6 font-medium">
            Abundance Diagnostic™ — твоят пръв шаг от хаоса към структурата
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-gradient-to-br from-primary/5 to-violet/5 border border-primary/20 rounded-lg">
              <div className="text-2xl md:text-3xl font-black text-primary mb-1">∞</div>
              <div className="text-xs text-muted-foreground uppercase">Потенциал</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-gold/5 to-primary/5 border border-gold/20 rounded-lg">
              <div className="text-2xl md:text-3xl font-black text-gold mb-1">90</div>
              <div className="text-xs text-muted-foreground uppercase">Дни</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-violet/5 to-primary/5 border border-violet/20 rounded-lg">
              <div className="text-2xl md:text-3xl font-black text-violet mb-1">1</div>
              <div className="text-xs text-muted-foreground uppercase">Решение</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
