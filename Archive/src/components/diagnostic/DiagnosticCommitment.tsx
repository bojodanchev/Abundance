import { Button } from "@/components/ui/button";
import { DiagnosticFormData } from "@/pages/Diagnostic";
import { toast } from "sonner";
import { Flame, Lightbulb, Search, Check } from "lucide-react";

interface DiagnosticCommitmentProps {
  data: DiagnosticFormData;
  onUpdate: (data: Partial<DiagnosticFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const commitmentLevels = [
  { value: "High", label: "Готов на 100%", description: "Готов съм да се ангажирам напълно с 90-дневния план", Icon: Flame, gradient: "from-orange-500 to-red-600" },
  { value: "Medium", label: "Имам нужда от насоки", description: "Искам да започна, но ми трябва подкрепа и структура", Icon: Lightbulb, gradient: "from-yellow-500 to-amber-600" },
  { value: "Low", label: "Проучвам", description: "Все още събирам информация и разглеждам опциите си", Icon: Search, gradient: "from-blue-500 to-indigo-600" },
];

export const DiagnosticCommitment = ({ data, onUpdate, onNext, onBack }: DiagnosticCommitmentProps) => {
  const handleNext = () => {
    if (!data.commitment_level) {
      toast.error("Моля, избери ниво на ангажираност");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full text-sm backdrop-blur-sm">
          <span className="text-yellow-600">Стъпка 5 от 7</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
          Колко си готов да се ангажираш?
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">Да изпълниш 90-дневния план, който ще ти дам</p>
      </div>

      <div className="grid gap-3 sm:gap-4 max-w-3xl mx-auto px-4">
        {commitmentLevels.map((level, index) => {
          const isSelected = data.commitment_level === level.value;
          const Icon = level.Icon;
          return (
            <div key={level.value} className={`group relative p-4 sm:p-6 rounded-xl border-2 transition-all cursor-pointer animate-fade-in hover:scale-[1.02] ${isSelected ? "border-yellow-500 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 shadow-lg shadow-yellow-500/20" : "border-border hover:border-yellow-500/50 bg-background"}`} style={{ animationDelay: `${index * 100}ms` }} onClick={() => onUpdate({ commitment_level: level.value })}>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${level.gradient} ${isSelected ? 'scale-110' : 'group-hover:scale-105'} transition-transform`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{level.label}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{level.description}</p>
                </div>
                {isSelected && <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center animate-scale-in"><Check className="w-3 h-3 text-white" /></div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-8 px-4">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto order-2 sm:order-1">← Назад</Button>
        <Button onClick={handleNext} disabled={!data.commitment_level} className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2">Напред →</Button>
      </div>
    </div>
  );
};
