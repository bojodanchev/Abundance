import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Coins, Scale, MessageCircle, Lightbulb, Heart } from "lucide-react";
import { ArrowRight } from "lucide-react";

const coreCodes = [
  {
    number: "01",
    title: "Mindset & Discipline",
    description: "Master your mind, master your reality",
    icon: Brain,
    color: "primary"
  },
  {
    number: "02",
    title: "Spiritual Alignment",
    description: "Connect to purpose beyond profit",
    icon: Sparkles,
    color: "secondary"
  },
  {
    number: "03",
    title: "Financial Freedom",
    description: "Build systems that generate wealth",
    icon: Coins,
    color: "primary"
  },
  {
    number: "04",
    title: "Masculine & Feminine Balance",
    description: "Integrate strength with wisdom",
    icon: Scale,
    color: "secondary"
  },
  {
    number: "05",
    title: "Communication & Leadership",
    description: "Influence through clarity and vision",
    icon: MessageCircle,
    color: "primary"
  },
  {
    number: "06",
    title: "Creation & Wealth",
    description: "Transform ideas into empire",
    icon: Lightbulb,
    color: "secondary"
  },
  {
    number: "07",
    title: "Service & Legacy",
    description: "Build beyond yourself",
    icon: Heart,
    color: "primary"
  }
];

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-16 md:py-32 bg-gradient-dark relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-block mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <span className="text-xs md:text-sm font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase text-primary/90">
                The Movement
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight px-4">
              The Code of <span className="text-gradient">Abundance</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-12 px-4">
              Seven pillars that transform chaos into power, scarcity into abundance, 
              and potential into legacy.
            </p>
          </div>

          {/* Core Codes Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            {coreCodes.map((code, index) => {
              const Icon = code.icon;
              const isLastOdd = coreCodes.length % 3 === 1 && index === coreCodes.length - 1;
              
              return (
                <div
                  key={index}
                  className={`group relative p-6 md:p-8 rounded-xl md:rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-${code.color}/50 transition-all duration-500 hover:scale-105 hover:shadow-elegant ${
                    isLastOdd ? 'lg:col-start-2' : ''
                  }`}
                >
                  {/* Code Number */}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 font-display text-4xl md:text-6xl font-black text-${code.color}/5 group-hover:text-${code.color}/10 transition-smooth">
                    {code.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-${code.color}/10 mb-4 md:mb-6 group-hover:bg-${code.color}/20 transition-smooth`}>
                    <Icon className={`text-${code.color}`} size={24} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 leading-tight">
                    {code.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {code.description}
                  </p>
                  
                  {/* Hover Line */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-elegant origin-left`}></div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center relative px-4">
            <div className="inline-block p-6 md:p-12 rounded-xl md:rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-sm w-full max-w-2xl">
              <div className="max-w-2xl">
                <p className="font-quote text-lg md:text-xl lg:text-2xl italic text-muted-foreground mb-6 md:mb-8">
                  "The code isn't learned. It's remembered."
                </p>
                
                <Button 
                  variant="premium" 
                  size="xl"
                  className="group shadow-gold w-full sm:w-auto min-h-[48px]"
                  onClick={() => {
                    const element = document.getElementById('programs');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Enter the Code
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
