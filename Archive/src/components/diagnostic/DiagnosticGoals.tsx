import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DiagnosticFormData } from "@/pages/Diagnostic";
import { useEffect } from "react";
import { Target } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface DiagnosticGoalsProps {
  data: DiagnosticFormData;
  onUpdate: (data: Partial<DiagnosticFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const emojiMap: Record<string, { gradient: string }> = {
  Финанси: { gradient: "from-emerald-500 to-green-600" },
  Бизнес: { gradient: "from-blue-500 to-indigo-600" },
  Здраве: { gradient: "from-rose-500 to-pink-600" },
  Ментално: { gradient: "from-purple-500 to-violet-600" },
  Романтика: { gradient: "from-pink-500 to-rose-600" },
  Социални: { gradient: "from-amber-500 to-orange-600" },
  Мисия: { gradient: "from-yellow-500 to-amber-600" },
};

export const DiagnosticGoals = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: DiagnosticGoalsProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (data.priority_top3 && data.priority_top3.length === 3) {
      if (!data.goal_sphere_values || data.goal_sphere_values.length !== 3) {
        onUpdate({
          goal_sphere_values: data.priority_top3.map((sphere) => ({
            sphere,
            goal: 8,
          })),
        });
      }
    }
  }, [data.priority_top3]);

  const updateGoal = (index: number, value: number) => {
    const updated = [...(data.goal_sphere_values || [])];
    updated[index] = { ...updated[index], goal: value };
    onUpdate({ goal_sphere_values: updated });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full text-sm backdrop-blur-sm">
          <span className="text-yellow-600">{t('diagnosticGoals.step')}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
          {t('diagnosticGoals.title')}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          {t('diagnosticGoals.subtitle')}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto px-4">
        {data.goal_sphere_values?.map((item, index) => {
          const sphereData = emojiMap[item.sphere];
          return (
            <div
              key={item.sphere}
              className="group p-4 sm:p-6 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-border hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <label className="text-base sm:text-lg font-semibold">{item.sphere}</label>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                  <span className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${sphereData?.gradient} bg-clip-text text-transparent min-w-[3rem] text-right`}>
                    {item.goal}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-xs sm:text-sm text-muted-foreground min-w-[2rem]">1</span>
                <div className="flex-1 relative">
                  <Slider
                    value={[item.goal]}
                    onValueChange={(value) => updateGoal(index, value[0])}
                    min={1}
                    max={10}
                    step={1}
                    className={`[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:${sphereData?.gradient} [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg hover:[&_[role=slider]]:scale-110 [&_[role=slider]]:transition-transform`}
                  />
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground min-w-[2rem] text-right">10</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-8 px-4">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto order-2 sm:order-1">
          {t('common.back')}
        </Button>
        <Button onClick={onNext} className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white order-1 sm:order-2">
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
