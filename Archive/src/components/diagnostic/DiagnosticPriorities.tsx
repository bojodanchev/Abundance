import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DiagnosticFormData } from "@/pages/Diagnostic";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface DiagnosticPrioritiesProps {
  data: DiagnosticFormData;
  onUpdate: (data: Partial<DiagnosticFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const spheres = [
  { value: "Финанси", labelKey: "diagnosticPriorities.sphereFinances", gradient: "from-emerald-500 to-green-600" },
  { value: "Бизнес", labelKey: "diagnosticPriorities.sphereBusiness", gradient: "from-blue-500 to-indigo-600" },
  { value: "Здраве", labelKey: "diagnosticPriorities.sphereHealth", gradient: "from-rose-500 to-pink-600" },
  { value: "Ментално", labelKey: "diagnosticPriorities.sphereMental", gradient: "from-purple-500 to-violet-600" },
  { value: "Романтика", labelKey: "diagnosticPriorities.sphereRomantic", gradient: "from-pink-500 to-rose-600" },
  { value: "Социални", labelKey: "diagnosticPriorities.sphereSocial", gradient: "from-amber-500 to-orange-600" },
  { value: "Мисия", labelKey: "diagnosticPriorities.sphereMission", gradient: "from-yellow-500 to-amber-600" },
];

export const DiagnosticPriorities = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: DiagnosticPrioritiesProps) => {
  const { t } = useTranslation();

  const handleToggle = (value: string) => {
    const current = data.priority_top3 || [];
    let updated: string[];

    if (current.includes(value)) {
      updated = current.filter((v) => v !== value);
    } else {
      if (current.length >= 3) {
        toast.error(t('diagnosticPriorities.maxError'));
        return;
      }
      updated = [...current, value];
    }

    onUpdate({ priority_top3: updated });
  };

  const handleNext = () => {
    if (!data.priority_top3 || data.priority_top3.length !== 3) {
      toast.error(t('diagnosticPriorities.exactError'));
      return;
    }
    onNext();
  };

  const selectedCount = data.priority_top3?.length || 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full text-sm backdrop-blur-sm">
          <span className="text-yellow-600">{t('diagnosticPriorities.step')}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
          {t('diagnosticPriorities.title')}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          {t('diagnosticPriorities.subtitle')}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
          <span className="text-sm font-medium">
            {t('diagnosticPriorities.selected')}: <span className={`font-bold ${selectedCount === 3 ? 'text-green-600' : 'text-yellow-600'}`}>{selectedCount}</span> / 3
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 max-w-3xl mx-auto px-4">
        {spheres.map((sphere, index) => {
          const isSelected = data.priority_top3?.includes(sphere.value);
          return (
            <div
              key={sphere.value}
              className={`group relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer animate-fade-in hover:scale-[1.02] ${
                isSelected
                  ? `border-yellow-500 bg-gradient-to-br ${sphere.gradient} bg-opacity-5 shadow-lg shadow-yellow-500/20`
                  : "border-border hover:border-yellow-500/50 bg-background"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleToggle(sphere.value)}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center animate-scale-in">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">{t(sphere.labelKey)}</h3>
                  {isSelected && (
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {t('diagnosticPriorities.selectedForFocus')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-8 px-4">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto order-2 sm:order-1">
          {t('common.back')}
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedCount !== 3}
          className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
