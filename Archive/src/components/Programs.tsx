import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Zap } from "lucide-react";

const programs = [
  {
    tier: "Foundation",
    name: "The Transition Call",
    price: "49",
    currency: "BGN",
    icon: Zap,
    description: "A focused strategy session to identify your blocks and map your path forward.",
    features: [
      "60-minute deep-dive session",
      "Personalized transition roadmap",
      "Clarity on your next steps",
      "Action plan to implement immediately"
    ],
    cta: "Book Your Call",
    highlight: false
  },
  {
    tier: "Transformation",
    name: "Abundance Path™",
    price: "499-999",
    currency: "BGN",
    icon: Star,
    description: "Complete digital framework with proven systems for wealth and power creation.",
    features: [
      "7-step transformation framework",
      "Video training & implementation guides",
      "Private community access",
      "Weekly group coaching calls",
      "Lifetime updates & resources",
      "Direct messaging support"
    ],
    cta: "Enter The Path",
    highlight: true
  },
  {
    tier: "Mastery",
    name: "1:1 Mentorship",
    price: "Custom",
    currency: "",
    icon: Crown,
    description: "Personalized high-touch mentorship for those committed to total transformation.",
    features: [
      "Direct 1:1 access to Sean",
      "Custom strategy & implementation",
      "Weekly accountability sessions",
      "Emergency support line",
      "Network & partnership opportunities",
      "Lifetime advisory relationship"
    ],
    cta: "Apply Now",
    highlight: false
  }
];

const Programs = () => {
  return (
    <section id="programs" className="py-16 md:py-20 bg-gradient-dark relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-4">
              Choose Your <span className="text-gradient">Path</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Whether you're just beginning or ready for complete transformation, 
              there's a program designed for your current stage.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div 
                  key={index}
                  className={`relative p-6 md:p-8 rounded-xl md:rounded-2xl border transition-elegant ${
                    program.highlight 
                      ? 'bg-gradient-primary border-primary shadow-elegant md:scale-105' 
                      : 'bg-card border-border hover:border-primary/50 hover:shadow-gold'
                  }`}
                >
                  {/* Highlight Badge */}
                  {program.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 ${
                    program.highlight ? 'bg-background/20' : 'bg-primary/10'
                  }`}>
                    <Icon className={program.highlight ? 'text-background' : 'text-primary'} size={24} />
                  </div>

                  {/* Tier & Name */}
                  <div className="mb-4 md:mb-6">
                    <div className={`text-xs md:text-sm font-semibold mb-1 md:mb-2 ${
                      program.highlight ? 'text-background/70' : 'text-primary'
                    }`}>
                      {program.tier.toUpperCase()}
                    </div>
                    <h3 className={`font-display text-xl md:text-2xl font-bold mb-2 ${
                      program.highlight ? 'text-background' : 'text-foreground'
                    }`}>
                      {program.name}
                    </h3>
                    <p className={`text-xs md:text-sm ${
                      program.highlight ? 'text-background/80' : 'text-muted-foreground'
                    }`}>
                      {program.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b border-current/10">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl md:text-4xl font-display font-bold ${
                        program.highlight ? 'text-background' : 'text-foreground'
                      }`}>
                        {program.price}
                      </span>
                      {program.currency && (
                        <span className={`text-base md:text-lg ${
                          program.highlight ? 'text-background/70' : 'text-muted-foreground'
                        }`}>
                          {program.currency}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 md:gap-3">
                        <Check 
                          className={`flex-shrink-0 mt-0.5 ${
                            program.highlight ? 'text-background' : 'text-primary'
                          }`} 
                          size={18} 
                        />
                        <span className={`text-xs md:text-sm ${
                          program.highlight ? 'text-background/90' : 'text-muted-foreground'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    className={`w-full min-h-[48px] ${
                      program.highlight 
                        ? 'bg-background text-primary hover:bg-background/90' 
                        : ''
                    }`}
                    variant={program.highlight ? 'default' : 'premium'}
                    size="lg"
                  >
                    {program.cta}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              All programs include a satisfaction guarantee. Your transformation starts now.
            </p>
            <p className="text-sm text-muted-foreground">
              Questions? <button className="text-primary hover:underline">Schedule a clarity call</button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
