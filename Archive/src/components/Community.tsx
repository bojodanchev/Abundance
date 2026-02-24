import { Button } from "@/components/ui/button";
import { Users, MessageCircle, TrendingUp, Award } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const highlights = [
  {
    icon: Users,
    stat: "500+",
    label: "Active Members",
    description: "Building wealth together"
  },
  {
    icon: TrendingUp,
    stat: "€2M+",
    label: "Generated Revenue",
    description: "Collective member success"
  },
  {
    icon: Award,
    stat: "47",
    label: "Success Stories",
    description: "Documented transformations"
  },
  {
    icon: MessageCircle,
    stat: "Daily",
    label: "Live Support",
    description: "Direct community access"
  }
];

const testimonials = [
  {
    quote: "The community alone is worth 10x the investment. Real people, real results.",
    author: "Stefan K.",
    achievement: "€50K in 90 days"
  },
  {
    quote: "Finally found a tribe that operates on my level. No fluff, just execution.",
    author: "Maria D.",
    achievement: "Scaled to 7 figures"
  },
  {
    quote: "The daily challenges and accountability changed everything for me.",
    author: "Ivan P.",
    achievement: "3x revenue growth"
  }
];

const Community = () => {
  const handleJoinClick = () => {
    trackEvent('cta_click', {
      cta_name: 'join_community',
      cta_location: 'community_section'
    });
    
    // Replace with actual Skool/Telegram link
    window.open('YOUR_COMMUNITY_LINK', '_blank');
  };

  return (
    <section id="community" className="py-32 bg-gradient-dark relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-secondary/20 bg-card/30 backdrop-blur-sm">
              <Users className="text-secondary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-secondary/90">
                Join the Movement
              </span>
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Code Abundance™ <span className="text-gradient">Community</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A tribe of ambitious individuals transforming their reality through 
              disciplined action and systematic wealth creation.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
              >
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-secondary">
                    {testimonial.achievement}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-block p-8 rounded-2xl border border-secondary/30 bg-card/50 backdrop-blur-sm">
              <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                Join hundreds of high-performers who refuse to settle for average.
              </p>
              
              <Button 
                variant="premium" 
                size="xl"
                onClick={handleJoinClick}
                className="shadow-violet"
              >
                Join for Free
                <Users className="ml-2" size={20} />
              </Button>
              
              <p className="text-sm text-muted-foreground/60 mt-4">
                Free access • No credit card required • Instant entry
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
