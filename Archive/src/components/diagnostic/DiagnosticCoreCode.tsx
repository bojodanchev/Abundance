import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DiagnosticFormData } from "@/pages/Diagnostic";
import { toast } from "sonner";

interface DiagnosticCoreCodeProps {
  data: DiagnosticFormData;
  onUpdate: (data: Partial<DiagnosticFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DiagnosticCoreCode = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: DiagnosticCoreCodeProps) => {
  const handleNext = () => {
    if (!data.birth_date || !data.birth_city || !data.birth_country) {
      toast.error("Моля, попълни всички задължителни полета");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full text-sm backdrop-blur-sm">
          <span className="text-yellow-600">Стъпка 4 от 7</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">Core Code Анализ</h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Въведи данните за раждане за персонализиран анализ базиран на Human
          Design, Нумерология и Астрология
        </p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto px-4">
        <div className="space-y-2">
          <Label htmlFor="birth_date">
            Дата на раждане <span className="text-destructive">*</span>
          </Label>
          <Input
            id="birth_date"
            type="date"
            value={data.birth_date}
            onChange={(e) => onUpdate({ birth_date: e.target.value })}
            placeholder="ДД.ММ.ГГГГ"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth_time">
            Час на раждане{" "}
            <span className="text-sm text-muted-foreground">
              (Ако не знаеш, остави празно)
            </span>
          </Label>
          <Input
            id="birth_time"
            type="time"
            value={data.birth_time}
            onChange={(e) => onUpdate({ birth_time: e.target.value })}
            placeholder="ЧЧ:ММ"
          />
          <p className="text-xs text-muted-foreground">
            Ако не знаеш точния час, анализът ще бъде без Асцендент
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth_city">
            Град на раждане <span className="text-destructive">*</span>
          </Label>
          <Input
            id="birth_city"
            type="text"
            value={data.birth_city}
            onChange={(e) => onUpdate({ birth_city: e.target.value })}
            placeholder="София"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth_country">
            Държава на раждане <span className="text-destructive">*</span>
          </Label>
          <Input
            id="birth_country"
            type="text"
            value={data.birth_country}
            onChange={(e) => onUpdate({ birth_country: e.target.value })}
            placeholder="България"
            required
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-8 px-4">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto order-2 sm:order-1">
          ← Назад
        </Button>
        <Button onClick={handleNext} className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white order-1 sm:order-2">Напред →</Button>
      </div>
    </div>
  );
};
