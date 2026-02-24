import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Together Academy Internship",
    description: "Learned fundamentals of business, teamwork, and leadership.",
    period: "Foundation"
  },
  {
    title: "TOGETHER Financial & Insurance Broker",
    description: "Guided clients in financial planning and budgeting; built confidence in sales and emotional communication.",
    period: "Early Growth"
  },
  {
    title: "Direct Sales & Educational Books",
    description: "Presented door-to-door and in schools, mastering presentation and persuasion.",
    period: "Skills Development"
  },
  {
    title: "Personal Development Seminars",
    description: "Invested heavily in education and private mentorship worldwide.",
    period: "Self-Investment"
  },
  {
    title: "MLM Leadership (Forever Living, Awavera)",
    description: "Became fast-growing supervisor at 17; led teams, managed duplication and momentum.",
    period: "Leadership Formation"
  },
  {
    title: "Cashback Merchant Program",
    description: "Connected merchants and clients for daily cashback operations; early exposure to fintech principles.",
    period: "Systems Thinking"
  },
  {
    title: "A-to-Z Marketing Agency",
    description: "Built and operated full-stack marketing systems: from content creation and planning to client fulfillment, sales teams, and distribution networks — mastering the full marketing lifecycle from strategy to execution.",
    period: "Mastery"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <Briefcase className="text-primary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary/90">
                Experience & Growth
              </span>
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Where the Foundation <span className="text-gradient">Was Built</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every stage was a layer of mastery — each system built on the previous one.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 hidden md:block"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-gold"></div>
                  
                  {/* Content card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="inline-block p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-elegant group">
                      <div className="mb-2">
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary/60">
                          {exp.period}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-smooth">
                        {exp.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Spacer for alignment */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;