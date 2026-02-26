import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DiagnosticFormData } from "@/pages/Diagnostic";
import { useTranslation } from 'react-i18next';

interface DiagnosticRatingsProps {
  data: DiagnosticFormData;
  onUpdate: (data: Partial<DiagnosticFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const sphereKeys = [
  { key: "rating_finances", labelKey: "diagnosticRatings.sphereFinances", gradient: "from-emerald-500 to-green-600" },
  { key: "rating_business", labelKey: "diagnosticRatings.sphereBusiness", gradient: "from-blue-500 to-indigo-600" },
  { key: "rating_health", labelKey: "diagnosticRatings.sphereHealth", gradient: "from-rose-500 to-pink-600" },
  { key: "rating_mental", labelKey: "diagnosticRatings.sphereMental", gradient: "from-purple-500 to-violet-600" },
  { key: "rating_romantic", labelKey: "diagnosticRatings.sphereRomantic", gradient: "from-pink-500 to-rose-600" },
  { key: "rating_social", labelKey: "diagnosticRatings.sphereSocial", gradient: "from-amber-500 to-orange-600" },
  { key: "rating_mission", labelKey: "diagnosticRatings.sphereMission", gradient: "from-yellow-500 to-amber-600" },
];

export const DiagnosticRatings = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: DiagnosticRatingsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full text-sm backdrop-blur-sm">
          <span className="text-yellow-600">{t('diagnosticRatings.step')}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
          {t('diagnosticRatings.title')}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          {t('diagnosticRatings.subtitle')}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto px-4">
        {sphereKeys.map((sphere, index) => {
          const value = Number(data[sphere.key as keyof DiagnosticFormData]) || 5;
          return (
            <div
              key={sphere.key}
              className="group p-4 sm:p-6 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-border hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <label className="text-base sm:text-lg font-semibold">{t(sphere.labelKey)}</label>
                </div>
                <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${sphere.gradient} bg-clip-text text-transparent min-w-[3rem] text-right`}>
                  {value}
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-xs sm:text-sm text-muted-foreground min-w-[3rem] sm:min-w-[4rem] text-center">
                  {t('diagnosticRatings.scaleMin')}
                </span>
                <div className="flex-1 relative">
                  <Slider
                    value={[value]}
                    onValueChange={(val) =>
                      onUpdate({ [sphere.key]: val[0] } as Partial<DiagnosticFormData>)
                    }
                    min={1}
                    max={10}
                    step={1}
                    className={`[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:${sphere.gradient} [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg hover:[&_[role=slider]]:scale-110 [&_[role=slider]]:transition-transform`}
                  />
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] sm:text-xs text-muted-foreground/60 px-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground min-w-[3rem] sm:min-w-[4rem] text-center">
                  {t('diagnosticRatings.scaleMax')}
                </span>
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
          onClick={onNext}
          className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white order-1 sm:order-2"
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
