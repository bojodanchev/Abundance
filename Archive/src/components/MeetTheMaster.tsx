import { Quote, ArrowRight } from "lucide-react";
import masterFerrari from "@/assets/master-ferrari.png";
import masterProfessional from "@/assets/master-professional.png";
import masterBefore from "@/assets/master-before.png";
import masterEmpire from "@/assets/master-empire.png";

const MeetTheMaster = () => {
  return (
    <section id="meet-the-master" className="py-16 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-3 border border-primary/30 bg-card/40 backdrop-blur-md rounded-full shadow-elegant">
              <Quote className="text-primary" size={18} />
              <span className="text-xs md:text-sm font-medium tracking-[0.2em] md:tracking-[0.25em] uppercase text-primary">
                Meet the Master
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight px-4">
              Know who you're <span className="text-gradient">involved with</span>
            </h2>
          </div>

          {/* Before/After Transformation */}
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 px-4 leading-tight">
                From the boy selling books to survive to <span className="text-gradient">eccentric multi-millionaire</span>
              </h3>
              <div className="flex items-center justify-center gap-3 md:gap-4 text-muted-foreground">
                <span className="text-sm md:text-lg font-semibold">BEFORE</span>
                <ArrowRight className="text-primary" size={24} strokeWidth={3} />
                <span className="text-sm md:text-lg font-semibold">AFTER</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Before */}
              <div className="relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-background border-2 border-primary/30 px-8 py-3 rounded-full shadow-glow">
                    <span className="font-display text-xl font-bold text-primary">BEFORE</span>
                  </div>
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-primary/20 shadow-elegant">
                  <img 
                    src={masterBefore} 
                    alt="Young entrepreneur selling educational books" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    The Beginning: Hustling door-to-door, building character through struggle
                  </p>
                </div>
              </div>
              
              {/* After */}
              <div className="relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-primary to-accent border-2 border-primary px-8 py-3 rounded-full shadow-glow">
                    <span className="font-display text-xl font-bold text-primary-foreground">AFTER</span>
                  </div>
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-primary shadow-glow">
                  <img 
                    src={masterFerrari} 
                    alt="CYANISA with Ferrari - symbol of success" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                <div className="mt-6 text-center">
                  <p className="text-foreground text-lg leading-relaxed font-medium">
                    The Transformation: Building empires, leading movements, living abundantly
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Biography with Side Images */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
            {/* Left Image Space */}
            <div className="space-y-6">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-primary/20 shadow-elegant group">
                <img 
                  src={masterProfessional} 
                  alt="CYANISA - Professional Leadership" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Biography Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="bg-card/60 backdrop-blur-md border-2 border-border/50 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-14 shadow-elegant">
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 mb-6 md:mb-8">
                  I'm not your typical entrepreneur. My journey didn't start with privilege or a trust fund — it started with <strong className="text-primary">discipline</strong>, earned through years of competitive sports at the national level. Ice hockey taught me precision. Canoe kayak taught me balance. Basketball and swimming taught me perseverance.
                </p>
                
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 mb-6 md:mb-8">
                  At 17, I was already building teams in MLM, learning the fundamentals of leadership and duplication. While most teenagers were finding themselves, I was finding my <strong className="text-primary">purpose</strong> — creating systems, leading people, and refusing to accept mediocrity.
                </p>
                
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 mb-6 md:mb-8">
                  But success didn't come from one path. I invested tens of thousands in mentorships, traveled internationally for masterminds, and studied under the best. I didn't just learn theory — I built <strong className="text-primary">empires</strong>. From financial services to wellness brands, from learning platforms to marketing agencies, each venture was a layer of mastery.
                </p>
                
              </div>
            </div>
          </div>

          {/* Truth Statement Section */}
          <div className="mb-16 md:mb-20">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-4 md:space-y-8 px-4">
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                  I didn't make my money selling courses
                </h3>
                <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed font-medium">
                  I partnered with the right people, worked 15h per day and built an empire
                </p>
              </div>

              {/* Image Space */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-primary/20 shadow-elegant">
                <img 
                  src={masterEmpire} 
                  alt="CYANISA building empire - luxury lifestyle" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mb-16 md:mb-20">
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/30 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-glow backdrop-blur-sm">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight px-4">
                I didn't make my money selling courses
              </h3>
              <div className="h-px w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-4 md:mb-6" />
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                I partnered with the right people, worked 15h per day and built an empire
              </p>
              <button
                onClick={() => {
                  document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-base md:text-lg rounded-full hover:shadow-glow hover:scale-105 transition-all duration-300 w-full sm:w-auto min-h-[48px]"
              >
                Let's Talk Strategy
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-20">
            <div className="bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-md border-2 border-primary/30 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary/50 hover:shadow-glow transition-elegant">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">Warrior Mindset</h3>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed">Forged through national-level competition and refined through business battles.</p>
            </div>
            
            <div className="bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-md border-2 border-primary/30 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary/50 hover:shadow-glow transition-elegant">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">Systems Thinker</h3>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed">Built multiple 6-7 figure businesses by creating scalable, duplicable frameworks.</p>
            </div>
            
            <div className="bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-md border-2 border-primary/30 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary/50 hover:shadow-glow transition-elegant sm:col-span-2 md:col-span-1">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">Legacy Builder</h3>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed">Not just building wealth — building movements that transform generations.</p>
            </div>
          </div>

          {/* Quote Block */}
          <div className="relative px-4">
            <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border-2 border-primary/30 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-glow backdrop-blur-sm">
              <Quote className="mx-auto mb-6 md:mb-8 text-primary" size={48} />
              <p className="font-quote text-xl sm:text-2xl md:text-3xl lg:text-5xl italic text-foreground mb-4 md:mb-6 leading-tight">
                "You don't rise by luck.<br />You rise by code."
              </p>
              <div className="h-px w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-4 md:mb-6" />
              <p className="text-primary text-base md:text-xl font-bold tracking-wider">— CYANISA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheMaster;
