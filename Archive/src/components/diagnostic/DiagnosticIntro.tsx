import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Gift } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface DiagnosticIntroProps {
  onNext: () => void;
}

export const DiagnosticIntro = ({ onNext }: DiagnosticIntroProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center space-y-8 px-4 py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-amber-500/10 to-orange-500/5 animate-gradient -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,191,36,0.1),transparent)] -z-10" />

      {/* Floating Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full text-sm font-medium animate-fade-in backdrop-blur-sm">
        <Sparkles className="w-4 h-4 text-yellow-600" />
        <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
          {t('diagnosticIntro.badge')}
        </span>
      </div>

      <div className="space-y-6 max-w-3xl animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          {t('diagnosticIntro.titlePart1')}{" "}
          <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            {t('diagnosticIntro.titleHighlight')}
          </span>
          ?
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
          {t('diagnosticIntro.descPart1')}{" "}
          <span className="font-semibold text-yellow-600">{t('diagnosticIntro.descMinutes')}</span> {t('diagnosticIntro.descPart2')}{" "}
          <span className="font-semibold text-foreground">
            {t('diagnosticIntro.descPlan')}
          </span>
          {t('diagnosticIntro.descPart3')}{" "}
          <span className="font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            {t('diagnosticIntro.descAbundance')}
          </span>{" "}
          {t('diagnosticIntro.descPart4')}
        </p>
      </div>

      <Button
        size="lg"
        className="group relative overflow-hidden text-lg px-8 sm:px-12 py-6 sm:py-8 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 text-white shadow-xl hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 animate-fade-in hover:scale-105 hover:brightness-110"
        onClick={onNext}
      >
        <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
        {t('diagnosticIntro.startButton')}
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 max-w-2xl w-full px-4 animate-fade-in">
        <div className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-muted/50 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors backdrop-blur-sm">
          <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <span className="text-sm font-medium">{t('diagnosticIntro.featureTime')}</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-muted/50 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors backdrop-blur-sm">
          <Gift className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <span className="text-sm font-medium">{t('diagnosticIntro.featurePdf')}</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-muted/50 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <span className="text-sm font-medium">{t('diagnosticIntro.featureAi')}</span>
        </div>
      </div>
    </div>
  );
};
