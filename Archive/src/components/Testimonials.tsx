import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alexander M.",
    role: "Entrepreneur",
    content: "Sean's framework completely transformed how I approach business and life. Within 3 months, I doubled my revenue and found clarity I never thought possible.",
    rating: 5
  },
  {
    name: "Maria K.",
    role: "Executive Coach",
    content: "The Abundance Path isn't just another course—it's a complete system for reality itself. The mindset shifts alone were worth 10x the investment.",
    rating: 5
  },
  {
    name: "David R.",
    role: "Investor",
    content: "I've invested in many programs. This is the only one that actually delivered results. Sean's mentorship changed everything for me.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Proven <span className="text-gradient">Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real transformations from individuals who committed to the system.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-smooth hover:shadow-gold relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote size={48} className="text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="font-quote text-muted-foreground mb-6 leading-relaxed relative z-10 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
