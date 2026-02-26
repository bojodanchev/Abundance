import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DiagnosticFormData } from "@/pages/Diagnostic";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const handleNext = () => {
    if (!data.birth_date || !data.birth_city || !data.birth_country) {
      toast.error(t('diagnosticCoreCode.requiredError'));
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full text-sm backdrop-blur-sm">
          <span className="text-yellow-600">{t('diagnosticCoreCode.step')}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">{t('diagnosticCoreCode.title')}</h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          {t('diagnosticCoreCode.subtitle')}
        </p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto px-4">
        <div className="space-y-2">
          <Label htmlFor="birth_date">
            {t('diagnosticCoreCode.birthDateLabel')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="birth_date"
            type="date"
            value={data.birth_date}
            onChange={(e) => onUpdate({ birth_date: e.target.value })}
            placeholder={t('diagnosticCoreCode.birthDatePlaceholder')}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth_time">
            {t('diagnosticCoreCode.birthTimeLabel')}{" "}
            <span className="text-sm text-muted-foreground">
              ({t('diagnosticCoreCode.birthTimeOptional')})
            </span>
          </Label>
          <Input
            id="birth_time"
            type="time"
            value={data.birth_time}
            onChange={(e) => onUpdate({ birth_time: e.target.value })}
            placeholder={t('diagnosticCoreCode.birthTimePlaceholder')}
          />
          <p className="text-xs text-muted-foreground">
            {t('diagnosticCoreCode.birthTimeHint')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth_city">
            {t('diagnosticCoreCode.birthCityLabel')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="birth_city"
            type="text"
            value={data.birth_city}
            onChange={(e) => onUpdate({ birth_city: e.target.value })}
            placeholder={t('diagnosticCoreCode.birthCityPlaceholder')}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth_country">
            {t('diagnosticCoreCode.birthCountryLabel')} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="birth_country"
            type="text"
            value={data.birth_country}
            onChange={(e) => onUpdate({ birth_country: e.target.value })}
            placeholder={t('diagnosticCoreCode.birthCountryPlaceholder')}
            required
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-8 px-4">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto order-2 sm:order-1">
          {t('common.back')}
        </Button>
        <Button onClick={handleNext} className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white order-1 sm:order-2">{t('common.next')}</Button>
      </div>
    </div>
  );
};
