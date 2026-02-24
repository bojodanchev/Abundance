import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DiagnosticFormData } from "@/pages/Diagnostic";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DiagnosticContactProps {
  data: DiagnosticFormData;
  onUpdate: (data: Partial<DiagnosticFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const DiagnosticContact = ({
  data,
  onUpdate,
  onSubmit,
  onBack,
  isSubmitting,
}: DiagnosticContactProps) => {
  const handleSubmit = () => {
    if (!data.user_name || !data.user_email || !data.user_phone) {
      toast.error("Моля, попълни задължителните полета");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.user_email)) {
      toast.error("Моля, въведи валиден имейл адрес");
      return;
    }

    if (!data.gdpr_consent) {
      toast.error("Моля, приеми политиката за поверителност");
      return;
    }

    onSubmit();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full text-sm backdrop-blur-sm">
          <span className="text-yellow-600">Стъпка 7 от 7</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">Почти готово!</h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Къде да изпратя твоя персонализиран Abundance Diagnostic™ PDF?
        </p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto px-4">
        <div className="space-y-2">
          <Label htmlFor="user_name">
            Име <span className="text-destructive">*</span>
          </Label>
          <Input
            id="user_name"
            type="text"
            value={data.user_name}
            onChange={(e) => onUpdate({ user_name: e.target.value })}
            placeholder="Иван Петров"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="user_email">
            Имейл адрес <span className="text-destructive">*</span>
          </Label>
          <Input
            id="user_email"
            type="email"
            value={data.user_email}
            onChange={(e) => onUpdate({ user_email: e.target.value })}
            placeholder="ivan@example.com"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="user_phone">
            Телефон <span className="text-destructive">*</span>
          </Label>
          <Input
            id="user_phone"
            type="tel"
            value={data.user_phone}
            onChange={(e) => onUpdate({ user_phone: e.target.value })}
            placeholder="+359 888 123 456"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="gdpr_consent"
            checked={data.gdpr_consent || false}
            onChange={(e) => onUpdate({ gdpr_consent: e.target.checked })}
            disabled={isSubmitting}
            className="mt-1 h-4 w-4 rounded border-yellow-500/30 text-yellow-600 focus:ring-yellow-500"
          />
          <Label htmlFor="gdpr_consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
            Съгласен/а съм данните ми да бъдат обработени за целите на персонализирания анализ.{" "}
            <a href="/bg/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-500 underline">
              Политика за поверителност
            </a>
            <span className="text-destructive"> *</span>
          </Label>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            🔒 Твоите данни са защитени. Използваме ги само за да ти изпратим
            персонализирания анализ.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-8 px-4">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting} className="w-full sm:w-auto order-2 sm:order-1">
          ← Назад
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white disabled:opacity-50 order-1 sm:order-2">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Обработва се...
            </>
          ) : (
            "Получи анализа ✨"
          )}
        </Button>
      </div>
    </div>
  );
};
