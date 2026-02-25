const testimonials = [
  {
    name: "Георги К.",
    role: "Предприемач",
    quote: "CODE: ABUNDANCE™ ми даде яснота и структура. За 90 дни удвоих бизнеса си и най-важното - намерих баланс.",
    rating: 5
  },
  {
    name: "Мария С.",
    role: "Създател на съдържание",
    quote: "Персонализираният анализ промени изцяло подхода ми към бизнеса. Системата работи.",
    rating: 5
  },
  {
    name: "Александър П.",
    role: "Стартиращ бизнес",
    quote: "Най-доброто решение, което взех тази година. Средата и менторството са безценни.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Какво казват <span className="text-gradient">нашите members</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Реални резултати от реални хора
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <span key={idx} className="text-yellow-500">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Повече отзиви скоро...
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
