import { useState } from "react";
import { ChevronDown, DollarSign, Heart, Sparkles, Users } from "lucide-react";
import { useTranslation } from 'react-i18next';

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

const ModulesAccordion = () => {
  const { t } = useTranslation();
  const [openLabs, setOpenLabs] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const labs: Lab[] = [
    {
      id: "wealth",
      icon: <DollarSign className="w-6 h-6" />,
      title: "Wealth Systems Lab",
      color: "text-gold",
      borderColor: "border-gold/30",
      categories: [
        { name: t('modules.wealthCat1'), items: [t('modules.wealthCat1Item1'), t('modules.wealthCat1Item2'), t('modules.wealthCat1Item3'), t('modules.wealthCat1Item4')] },
        { name: t('modules.wealthCat2'), items: [t('modules.wealthCat2Item1'), t('modules.wealthCat2Item2'), t('modules.wealthCat2Item3'), t('modules.wealthCat2Item4')] },
        { name: t('modules.wealthCat3'), items: [t('modules.wealthCat3Item1'), t('modules.wealthCat3Item2'), t('modules.wealthCat3Item3'), t('modules.wealthCat3Item4')] },
        { name: t('modules.wealthCat4'), items: [t('modules.wealthCat4Item1'), t('modules.wealthCat4Item2'), t('modules.wealthCat4Item3'), t('modules.wealthCat4Item4')] }
      ]
    },
    {
      id: "health",
      icon: <Heart className="w-6 h-6" />,
      title: "Health Systems Lab",
      color: "text-primary",
      borderColor: "border-primary/30",
      categories: [
        { name: t('modules.healthCat1'), items: [t('modules.healthCat1Item1'), t('modules.healthCat1Item2'), t('modules.healthCat1Item3')] },
        { name: t('modules.healthCat2'), items: [t('modules.healthCat2Item1'), t('modules.healthCat2Item2'), t('modules.healthCat2Item3')] },
        { name: t('modules.healthCat3'), items: [t('modules.healthCat3Item1'), t('modules.healthCat3Item2'), t('modules.healthCat3Item3')] }
      ]
    },
    {
      id: "prosperity",
      icon: <Sparkles className="w-6 h-6" />,
      title: "Prosperity Lab",
      color: "text-violet",
      borderColor: "border-violet/30",
      categories: [
        { name: t('modules.prosperityCat1'), items: [t('modules.prosperityCat1Item1'), t('modules.prosperityCat1Item2'), t('modules.prosperityCat1Item3')] },
        { name: t('modules.prosperityCat2'), items: [t('modules.prosperityCat2Item1'), t('modules.prosperityCat2Item2'), t('modules.prosperityCat2Item3')] },
        { name: t('modules.prosperityCat3'), items: [t('modules.prosperityCat3Item1'), t('modules.prosperityCat3Item2'), t('modules.prosperityCat3Item3')] }
      ]
    },
    {
      id: "relationships",
      icon: <Users className="w-6 h-6" />,
      title: "Relationship Lab",
      color: "text-accent",
      borderColor: "border-accent/30",
      categories: [
        { name: t('modules.relCat1'), items: [t('modules.relCat1Item1'), t('modules.relCat1Item2'), t('modules.relCat1Item3')] },
        { name: t('modules.relCat2'), items: [t('modules.relCat2Item1'), t('modules.relCat2Item2'), t('modules.relCat2Item3')] },
        { name: t('modules.relCat3'), items: [t('modules.relCat3Item1'), t('modules.relCat3Item2'), t('modules.relCat3Item3')] }
      ]
    }
  ];

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
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6"
              dangerouslySetInnerHTML={{ __html: t('modules.heading') }}
            />
            <p className="text-lg text-muted-foreground mb-8">
              {t('modules.subheading')}
            </p>
          </div>

          {/* Bonus Banner */}
          <div className="mb-10 p-4 md:p-6 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-xl text-center">
            <p className="text-base md:text-lg text-gold font-bold">
              {t('modules.bonusBanner')}
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
                    <span className="text-sm text-muted-foreground">({lab.categories.length} {t('modules.categories')})</span>
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
