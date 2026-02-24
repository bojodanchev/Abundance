import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const AbundanceLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />
        
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              КЛЮЧЪТ КЪМ ИЗОБИЛИЕТО<br />
              Е{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                СЕБЕПОЗНАНИЕТО
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Аз не продавам "тайни". Аз ти давам{" "}
              <span className="font-semibold text-foreground">
                персонализирана диагностика
              </span>{" "}
              (базирана на твоя Human Design, Нумерология и 7-те Сфери на живота), за да
              "познаеш себе си" и 90-дневна{" "}
              <span className="font-semibold text-foreground">система</span>, за да
              "изградиш изобилие".
            </p>
          </div>

          {/* Hook / Body */}
          <div className="max-w-3xl mx-auto space-y-6 py-8">
            <p className="text-lg md:text-xl leading-relaxed">
              Ти си <span className="font-bold">ВСИЧКО</span>. Но оперираш в{" "}
              <span className="font-bold text-destructive">Хаос</span>.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              За да отключиш Кода, първо трябва да разбереш{" "}
              <span className="font-bold italic">своята</span> архитектура.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              <span className="font-bold">CODE: ABUNDANCE™</span> е системата, която
              ти показва истинския ти "Аз" и ти дава структурата да се усъвършенстваш в
              бизнеса и в личен план.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <Button
              size="lg"
              className="text-xl px-12 py-8 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all"
              onClick={() => window.location.href = '/archive/diagnostic'}
            >
              <Sparkles className="mr-3 h-6 w-6" />
              ДАЙ МИ МОЯТА ДИАГНОСТИКА (БЕЗПЛАТНО)
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Безплатна диагностика
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Персонализиран 90-дневен план
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Отнема само 3 минути
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Доверени от хиляди успешни предприемачи
            </p>
            <div className="flex justify-center items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm font-medium ml-2">+2,500 members</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Какво ще получиш?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg border">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Core Code Анализ</h3>
              <p className="text-muted-foreground">
                Персонализиран анализ базиран на Human Design, Нумерология и
                Астрология - познай истинската си архитектура.
              </p>
            </div>

            <div className="p-6 bg-background rounded-lg border">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Life Audit</h3>
              <p className="text-muted-foreground">
                Диагностика на 7-те сфери на живота ти - идентифицирай къде си
                сега и къде искаш да стигнеш.
              </p>
            </div>

            <div className="p-6 bg-background rounded-lg border">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">90-Дневен План</h3>
              <p className="text-muted-foreground">
                Персонализирана 3-фазна система, която те води от Липса към
                Изобилие в избраните от теб сфери.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            Готов ли си да познаеш себе си?
          </h2>
          <p className="text-lg text-muted-foreground">
            Започни с безплатната диагностика и получи персонализиран план за
            следващите 90 дни.
          </p>
          <Button
            size="lg"
            className="text-xl px-12 py-8 bg-primary hover:bg-primary/90"
            onClick={() => window.location.href = '/archive/diagnostic'}
          >
            <Sparkles className="mr-3 h-6 w-6" />
            ЗАПОЧНИ СЕГА
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AbundanceLanding;
