import { Sparkles, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import originBooks from "@/assets/origin-books.png";
import originSpeaking from "@/assets/origin-speaking.png";
import originHockey from "@/assets/origin-hockey-2.png";
import originEmpire from "@/assets/origin-empire.png";

const stages = [
  {
    title: "The Grind Begins",
    description: "Started from nothing. No handouts, no shortcuts. Just raw determination and a refusal to quit.",
    visual: "from-primary/20 to-secondary/20",
    image: originBooks,
    hasDialog: true
  },
  {
    title: "Athletic Discipline",
    description: "National-level competition in multiple sports. Built the foundation of discipline that money can't buy.",
    visual: "from-secondary/20 to-primary/20",
    image: originHockey,
    hasDialog: true,
    dialogTitle: "The Warrior Mindset",
    dialogContent: (
      <>
        <p>
          Ice hockey. Canoe kayak. Basketball. Swimming. I didn't just play sports — I competed at the national level. This wasn't about trophies or glory. It was about <strong className="text-primary">forging discipline through pain</strong>.
        </p>
        <p>
          Every early morning practice when my body screamed to stay in bed. Every loss that crushed my ego. Every coach who pushed me beyond my limits. That's where I learned the most important lesson: <strong className="text-primary">discipline beats talent</strong>.
        </p>
        <p>
          The ice rink taught me precision. The water taught me balance. The court taught me strategy. But most importantly, competitive sports taught me that <strong className="text-primary">winners are built, not born</strong>.
        </p>
        <p>
          When everyone else quit, I kept going. When it hurt too much, I pushed harder. That mindset carried over to everything else — business, leadership, building empires.
        </p>
        <p>
          You can't buy that kind of foundation. You earn it through blood, sweat, and refusing to quit when it gets hard.
        </p>
      </>
    )
  },
  {
    title: "First Ventures",
    description: "Started at 17 building MLM teams. Learned leadership fast. Made mistakes faster.",
    visual: "from-primary/20 to-accent/20",
    image: originSpeaking,
    hasDialog: true,
    dialogTitle: "Learning to Lead",
    dialogContent: (
      <>
        <p>
          At 17, I wasn't just building teams — I was learning what real leadership meant. MLM wasn't glamorous. It was brutal. But it taught me something schools never could: <strong className="text-primary">how to inspire action</strong>.
        </p>
        <p>
          I stood in front of rooms full of people older than me, more experienced than me, and convinced them to follow my vision. Not because I had all the answers, but because I had conviction.
        </p>
        <p>
          I learned to speak with authority. To command a stage. To sell dreams and deliver systems. Every presentation, every team meeting, every late-night strategy session was building the foundation of who I'd become.
        </p>
        <p>
          <strong className="text-primary">Leadership isn't taught in a classroom</strong>. It's forged in the fire of real decisions, real consequences, and real results.
        </p>
      </>
    )
  },
  {
    title: "Empire Building",
    description: "Scaled multiple 6-7 figure businesses. Built systems, hired teams, dominated markets.",
    visual: "from-accent/20 to-primary/20",
    image: originEmpire,
    hasDialog: true,
    dialogTitle: "The Right Circle",
    dialogContent: (
      <>
        <p>
          You don't build empires alone. You build them with <strong className="text-primary">the right people</strong> in the right rooms having the right conversations.
        </p>
        <p>
          I didn't get here by accident. I surrounded myself with winners. People who think bigger, move faster, and refuse to settle. Every mastermind, every late-night strategy session, every cigar and whiskey conversation — that's where real deals get made.
        </p>
        <p>
          Most people network. I build alliances. Strategic partnerships with people who see the vision and have the capacity to execute. When you're in rooms like this, <strong className="text-primary">opportunity finds you</strong>.
        </p>
        <p>
          I invested tens of thousands in mentorships. Traveled internationally to learn from the best. Built multiple 6-7 figure brands across different industries. Not because I got lucky — because I chose the right circle.
        </p>
        <p>
          Show me your friends, I'll show you your future. That's not a cliché. That's a fact.
        </p>
      </>
    )
  }
];

const OriginStory = () => {
  return (
    <section id="origin" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <Sparkles className="text-primary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary/90">
                The Origin Story
              </span>
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Steps I Took to <span className="text-gradient">Change My Life</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From selling books door-to-door to building million-dollar systems. Every scar tells a story.
            </p>
          </div>

          {/* Storytelling Stages */}
          <div className="grid md:grid-cols-2 gap-8">
            {stages.map((stage, index) => (
              <div 
                key={index}
                className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-elegant group overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stage.visual} opacity-0 group-hover:opacity-100 transition-elegant`}></div>
                
                {/* Image Space */}
                <div className="relative h-96 bg-muted/20 border-b border-border/30 overflow-hidden">
                  {stage.image ? (
                    <img 
                      src={stage.image} 
                      alt={stage.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-primary/30 flex items-center justify-center font-display text-2xl font-bold text-primary">
                          {index + 1}
                        </div>
                        <p className="text-sm text-muted-foreground">Image placeholder</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  <h3 className="font-display text-2xl font-bold mb-4">
                    {stage.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                    {stage.description}
                  </p>

                  {stage.hasDialog && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="group">
                          Tell me more
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="font-display text-3xl mb-4">
                            {stage.dialogTitle || "The Streets of Sofia"}
                          </DialogTitle>
                          <DialogDescription className="text-base leading-relaxed space-y-4">
                            {stage.dialogContent || (
                              <>
                                <p>
                                  At 16, I was out on the streets of Sofia every single day. Not for fun. Not because I wanted to. Because I had to.
                                </p>
                                <p>
                                  I sold educational books door-to-door, approaching complete strangers with nothing but a pitch and determination. Most people slammed doors in my face. Some laughed. Others told me to get a "real job."
                                </p>
                                <p>
                                  But I learned something those people never could: <strong className="text-primary">rejection doesn't kill you</strong>. It builds you. Every "no" made the next conversation easier. Every door that closed taught me how to open the next one faster.
                                </p>
                                <p>
                                  I wasn't selling books. I was selling myself. My conviction. My belief that what I had was worth their time and money. That's when I realized — <strong className="text-primary">sales isn't about the product. It's about the person</strong>.
                                </p>
                                <p>
                                  Those streets turned a kid into a closer. And that closer became an empire builder.
                                </p>
                              </>
                            )}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-elegant origin-left"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default OriginStory;