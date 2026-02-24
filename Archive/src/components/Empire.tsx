import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, ExternalLink, CheckCircle2 } from "lucide-react";
import srLogo from "@/assets/sr-holding-logo.png";

const projects = [
  {
    name: "Code Abundance™",
    description: "Global community of transformation and power.",
    color: "from-primary to-secondary"
  },
  {
    name: "CircleSpace™",
    description: "Learning platform for creators and mentors.",
    color: "from-secondary to-accent"
  },
  {
    name: "GoodWeeds™",
    description: "Revolutionizing wellness through natural bio-products.",
    color: "from-accent to-primary"
  },
  {
    name: "BioEmpire™",
    description: "Next-gen health innovation.",
    color: "from-primary to-accent"
  },
  {
    name: "MoodHe™",
    description: "Emotional balance through modern psychology and spirituality.",
    color: "from-secondary to-primary"
  },
  {
    name: "Guaranteed Rent™",
    description: "Financial stability through property systems.",
    color: "from-accent to-secondary"
  },
  {
    name: "Space Group International™",
    description: "Strategic investment and development powerhouse.",
    color: "from-primary to-secondary"
  },
  {
    name: "Abundance Marketing™",
    description: "Full-service A-to-Z marketing agency for content creation, planning, client fulfillment, sales systems, and distribution.",
    color: "from-secondary to-accent"
  }
];

const Empire = () => {
  return (
    <section id="empire" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <Building2 className="text-primary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary/90">
                The Rise
              </span>
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Well... What businesses <span className="text-gradient">you own?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each project is a branch of the empire tree — multidimensional strength through systematic execution.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-elegant group overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-elegant`}></div>
                
                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-bold mb-3 flex items-center gap-2">
                    {project.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="group/btn"
                  >
                    Explore Project
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-5 rounded-full blur-2xl"></div>
              </div>
            ))}
          </div>

          {/* Verified Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Badge variant="outline" className="px-4 py-2 text-sm bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-elegant">
              <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
              CircleSpace
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-elegant">
              <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
              MoodHe
            </Badge>
            <Badge variant="outline" className="px-6 py-2 text-sm bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-elegant flex items-center gap-2">
              <img src={srLogo} alt="SR Holding" className="w-5 h-5 object-contain" />
              Partnership with SR Holding
            </Badge>
          </div>

          {/* Tagline */}
          <div className="text-center">
            <p className="font-quote text-2xl md:text-3xl italic text-muted-foreground">
              "Each project is a layer of mastery — each system built on the previous one."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Empire;