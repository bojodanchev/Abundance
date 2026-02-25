import { useState } from "react";
import { ChevronDown, DollarSign, Heart, Sparkles, Users } from "lucide-react";

interface Topic {
  name: string;
  items: string[];
}

interface Lab {
  id: string;
  icon: React.ReactNode;
  title: string;
  color: string;
  borderColor: string;
  categories: Topic[];
}

const labs: Lab[] = [
  {
    id: "wealth",
    icon: <DollarSign className="w-6 h-6" />,
    title: "Wealth Systems Lab",
    color: "text-gold",
    borderColor: "border-gold/30",
    categories: [
      {
        name: "Финансова грамотност",
        items: ["Бюджетиране и финансово планиране", "Инвестиционни стратегии", "Данъчна оптимизация", "Крипто основи и DeFi"]
      },
      {
        name: "Бизнес архитектура",
        items: ["Бизнес модели и валидация", "Продуктизация на услуги", "Ценообразуване и позициониране", "Скалиране и растеж"]
      },
      {
        name: "Маркетинг и продажби",
        items: ["Дигитален маркетинг", "Копирайтинг и persuasion", "Фунел стратегии", "UGC и платени реклами"]
      },
      {
        name: "AI и автоматизация",
        items: ["ChatGPT за бизнес", "Автоматизирани процеси", "AI маркетинг инструменти", "No-code автоматизации"]
      }
    ]
  },
  {
    id: "health",
    icon: <Heart className="w-6 h-6" />,
    title: "Health Systems Lab",
    color: "text-primary",
    borderColor: "border-primary/30",
    categories: [
      {
        name: "Физическо здраве",
        items: ["Тренировъчни програми", "Хранене и суплементи", "Сън и възстановяване"]
      },
      {
        name: "Ментално здраве",
        items: ["Медитация и mindfulness", "Стрес мениджмънт", "Фокус и продуктивност"]
      },
      {
        name: "Енергиен мениджмънт",
        items: ["Bio-hacking техники", "Циркадни ритми", "Енергийни практики"]
      }
    ]
  },
  {
    id: "prosperity",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Prosperity Lab",
    color: "text-violet",
    borderColor: "border-violet/30",
    categories: [
      {
        name: "Личностно развитие",
        items: ["Human Design анализ", "Нумерология", "Себепознание и идентичност"]
      },
      {
        name: "Лидерство",
        items: ["Комуникация и влияние", "Екипно управление", "Стратегическо мислене"]
      },
      {
        name: "Духовен растеж",
        items: ["Медитативни практики", "Визуализация", "Манифестация и намерение"]
      }
    ]
  },
  {
    id: "relationships",
    icon: <Users className="w-6 h-6" />,
    title: "Relationship Lab",
    color: "text-accent",
    borderColor: "border-accent/30",
    categories: [
      {
        name: "Социален капитал",
        items: ["Нетуъркинг стратегии", "Стратегически партньорства", "Общност и принадлежност"]
      },
      {
        name: "Личен бранд",
        items: ["Позициониране и авторитет", "Съдържание и storytelling", "Онлайн присъствие"]
      },
      {
        name: "Менторство",
        items: ["1:1 менторски сесии", "Групов коучинг", "Peer learning мрежа"]
      }
    ]
  }
];

const ModulesAccordion = () => {
  const [openLabs, setOpenLabs] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleLab = (id: string) => {
    setOpenLabs(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  };

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  return (
    <section id="modules" className="py-24 bg-gradient-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Пълна <span className="text-gradient">Учебна Програма</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              4 лаборатории, десетки модули, стотици практически уроци
            </p>
          </div>

          {/* Bonus Banner */}
          <div className="mb-10 p-4 md:p-6 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-xl text-center">
            <p className="text-base md:text-lg text-gold font-bold">
              БОНУС: Всяко обучение дава възможност за реализация и приход от работа с клиенти в същия домейн.
            </p>
          </div>

          {/* Labs Accordion */}
          <div className="space-y-4">
            {labs.map((lab) => (
              <div key={lab.id} className={`bg-card/30 backdrop-blur-sm border ${lab.borderColor} rounded-xl overflow-hidden`}>
                {/* Lab Header */}
                <button
                  onClick={() => toggleLab(lab.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-card/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${lab.color}`}>{lab.icon}</div>
                    <h3 className={`text-xl md:text-2xl font-bold ${lab.color}`}>{lab.title}</h3>
                    <span className="text-sm text-muted-foreground">({lab.categories.length} категории)</span>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform ${openLabs.includes(lab.id) ? 'rotate-180' : ''}`} />
                </button>

                {/* Categories */}
                {openLabs.includes(lab.id) && (
                  <div className="px-6 pb-4 space-y-2">
                    {lab.categories.map((category, catIdx) => {
                      const catId = `${lab.id}-${catIdx}`;
                      return (
                        <div key={catId} className="bg-background/30 border border-border/30 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleCategory(catId)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-background/50 transition-all"
                          >
                            <span className="font-semibold text-foreground">{category.name}</span>
                            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openCategories.includes(catId) ? 'rotate-180' : ''}`} />
                          </button>
                          {openCategories.includes(catId) && (
                            <div className="px-4 pb-3">
                              <ul className="space-y-2">
                                {category.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesAccordion;
