import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const VSL = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            КАК CODE: ABUNDANCE™ ЩЕ РАБОТИ ЗА ТЕБ
          </h1>
          <p className="text-lg text-muted-foreground">
            Гледай това кратко видео за да разбереш как системата превръща Себепознанието в Изобилие
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="aspect-video bg-muted rounded-lg mb-8 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
          <div className="relative z-10 text-center space-y-4">
            <PlayCircle className="w-24 h-24 text-primary mx-auto" />
            <p className="text-muted-foreground">
              [Тук ще бъде вграденото VSL видео]
            </p>
            <p className="text-sm text-muted-foreground">
              Добави твоето видео URL в този компонент
            </p>
          </div>
        </div>

        {/* Key Points */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Какво ще научиш от видеото:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold mb-1">Архитектурата на Изобилието</h3>
                <p className="text-sm text-muted-foreground">
                  Как CODE: ABUNDANCE™ използва твоя Core Code за изграждане на персонализирана система
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-semibold mb-1">Wealth + Health + Prosperity</h3>
                <p className="text-sm text-muted-foreground">
                  Как 3-те стълба работят заедно за максимални резултати
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-2xl">🚀</span>
              <div>
                <h3 className="font-semibold mb-1">90-Дневната Трансформация</h3>
                <p className="text-sm text-muted-foreground">
                  Точно какво ще се случи през следващите 90 дни с теб
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-2xl">👥</span>
              <div>
                <h3 className="font-semibold mb-1">Success Stories</h3>
                <p className="text-sm text-muted-foreground">
                  Реални резултати от хора, които са преминали през системата
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Готов ли си за следващата стъпка?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ако още не си попълнил диагностиката, започни оттук. Ако вече си я получил в имейла, 
            запази място за 1:1 диагностичен разговор.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/diagnostic">
                Получи безплатната диагностика
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="/diagnostic">
                Запази 1:1 разговор
              </a>
            </Button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-center">
            Какво казват нашите members:
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-muted/30 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10" />
                  <div>
                    <p className="font-semibold">Member {i}</p>
                    <p className="text-sm text-muted-foreground">Entrepreneur</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "CODE: ABUNDANCE™ ми даде яснота и структура. За 90 дни удвоих бизнеса си и най-важното - намерих баланс."
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-500">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSL;
