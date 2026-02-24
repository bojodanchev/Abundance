import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DiagnosticFormData } from "@/pages/Diagnostic";

interface DiagnosticRatingsProps {
  data: DiagnosticFormData;
  onUpdate: (data: Partial<DiagnosticFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const spheres = [
  { key: "rating_finances", label: "Финанси", gradient: "from-emerald-500 to-green-600" },
  { key: "rating_business", label: "Бизнес/Кариера", gradient: "from-blue-500 to-indigo-600" },
  { key: "rating_health", label: "Здраве/Тяло", gradient: "from-rose-500 to-pink-600" },
  { key: "rating_mental", label: "Ментално състояние", gradient: "from-purple-500 to-violet-600" },
  { key: "rating_romantic", label: "Романтични връзки", gradient: "from-pink-500 to-rose-600" },
  { key: "rating_social", label: "Социални връзки", gradient: "from-amber-500 to-orange-600" },
  { key: "rating_mission", label: "Мисия/Цел", gradient: "from-yellow-500 to-amber-600" },
];

export const DiagnosticRatings = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: DiagnosticRatingsProps) => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full text-sm backdrop-blur-sm">
          <span className="text-yellow-600">Стъпка 1 от 7</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
          Оцени всяка от 7-те сфери
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          От 1 (Липса) до 10 (Изобилие) – къде си сега?
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto px-4">
        {spheres.map((sphere, index) => {
          const value = Number(data[sphere.key as keyof DiagnosticFormData]) || 5;
          return (
            <div 
              key={sphere.key} 
              className="group p-4 sm:p-6 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-border hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <label className="text-base sm:text-lg font-semibold">{sphere.label}</label>
                </div>
                <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${sphere.gradient} bg-clip-text text-transparent min-w-[3rem] text-right`}>
                  {value}
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-xs sm:text-sm text-muted-foreground min-w-[3rem] sm:min-w-[4rem] text-center">
                  Липса
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
                  Изобилие
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-8 px-4">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto order-2 sm:order-1">
          ← Назад
        </Button>
        <Button 
          onClick={onNext}
          className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white order-1 sm:order-2"
        >
          Напред →
        </Button>
      </div>
    </div>
  );
};
