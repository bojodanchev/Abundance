import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalMessage = () => {
  const navigate = useNavigate();
  const handleStrategyCall = () => {
    navigate('/diagnostic');
  };

  const handleJoinMovement = () => {
    navigate('/diagnostic');
  };

  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-glow opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Message */}
          <div className="text-center mb-16">
            <div className="inline-block mb-8">
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto mb-8"></div>
            </div>

            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95]">
              This Is Just the
              <br />
              <span className="text-gradient">Beginning</span>
            </h2>

            <div className="max-w-3xl mx-auto mb-12">
              <p className="font-quote text-3xl md:text-4xl italic text-muted-foreground mb-8">
                "You don't rise by luck. You rise by code."
              </p>
              
              <div className="w-32 h-1 bg-gradient-primary mx-auto mb-8"></div>
              
              <p className="text-lg text-muted-foreground/80 leading-relaxed">
                Every transformation starts with a decision. Every empire begins with a single choice. 
                Every legend is written by those who refuse to settle for ordinary.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              variant="premium" 
              size="xl"
              onClick={handleStrategyCall}
              className="group shadow-gold min-w-[280px]"
            >
              <Calendar className="mr-2" size={20} />
              Book a Strategy Call
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              onClick={handleJoinMovement}
              className="group min-w-[280px]"
            >
              <Users className="mr-2" size={20} />
              Join the Movement
            </Button>
          </div>

          {/* Project Links */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground/60">
              <span className="hover:text-primary transition-smooth">Code Abundance</span>
              <span>•</span>
              <span className="hover:text-primary transition-smooth">CircleSpace</span>
              <span>•</span>
              <span className="hover:text-primary transition-smooth">Guaranteed Rent</span>
              <span>•</span>
              <span className="hover:text-primary transition-smooth">Elite Coaching</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
};

export default FinalMessage;
