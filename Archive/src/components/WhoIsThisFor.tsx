import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Rocket, Building2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhoIsThisFor = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              За кого е <span className="text-gradient">КОД: ИЗОБИЛИЕ™</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              Независимо на кой етап си, имаме точния път за теб
            </p>
          </div>

          <Tabs defaultValue="beginners" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="beginners" className="text-sm md:text-base">
                Новостартиращи
              </TabsTrigger>
              <TabsTrigger value="experienced" className="text-sm md:text-base">
                Опитни
              </TabsTrigger>
              <TabsTrigger value="creators" className="text-sm md:text-base">
                Създатели
              </TabsTrigger>
            </TabsList>

            <TabsContent value="beginners" className="mt-0">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    Новостартиращи предприемачи
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  Стартирай своя личен път с ясна стратегия и структурирана рамка.
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ✓ Получаваш <strong className="text-foreground">стъпка по стъпка система</strong> за изграждане на първия си бизнес
                  </p>
                  <p>
                    ✓ Учиш се от <strong className="text-foreground">реални примери</strong> и battle-tested методи
                  </p>
                  <p>
                    ✓ Избягваш <strong className="text-foreground">скъпите грешки</strong>, които другите правят
                  </p>
                  <p>
                    ✓ Имаш <strong className="text-foreground">менторска подкрепа</strong> и общност от единомишленици
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experienced" className="mt-0">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    Опитни предприемачи / Основатели
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  Скалирай проектите си до 6-цифрени резултати с battle-tested системи.
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ✓ <strong className="text-foreground">Оптимизирай процесите</strong> си за максимална ефективност
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">Автоматизирай</strong> бизнеса си с AI и системи
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">Скалирай</strong> до следващото ниво с проверени стратегии
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">Изгради екип</strong> и делегирай с увереност
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="creators" className="mt-0">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    Създатели на съдържание и лидери
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  Монетизирай, автоматизирай, изграждай influence и екипи.
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ✓ <strong className="text-foreground">Монетизирай</strong> аудиторията си с дигитални продукти
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">Изгради личен бранд</strong>, който привлича възможности
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">Създай общност</strong>, която те подкрепя и расте с теб
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">Системни доходи</strong> от membership модели
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Button size="lg" variant="hero" onClick={() => navigate('/diagnostic')}>
              Открий Архитектурата на Изобилието
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsThisFor;
