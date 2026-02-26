import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Mail, Video, Sparkles } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface DiagnosticFinalProps {
  submissionResult?: { submissionId: string; prelaunch: boolean } | null;
}

export const DiagnosticFinal = ({ submissionResult }: DiagnosticFinalProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!submissionResult) return;
    if (submissionResult.prelaunch) {
      window.location.href = `/bg/spot-reserved?id=${submissionResult.submissionId}`;
    } else {
      window.location.href = `/bg/bump-offer?id=${submissionResult.submissionId}`;
    }
  }, [submissionResult]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center space-y-8 px-4 py-8 animate-fade-in">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/10 to-teal-500/5 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent)] -z-10" />

      {/* Success Icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 blur-2xl opacity-30 animate-pulse" />
        <CheckCircle2 className="relative w-20 h-20 sm:w-24 sm:h-24 text-green-500 animate-scale-in" />
      </div>

      <div className="space-y-4 sm:space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full text-sm font-medium backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-4 h-4 text-green-600" />
          <span className="text-green-600">{t('diagnosticFinal.successBadge')}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent leading-tight">
          {t('diagnosticFinal.title')}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
          {t('diagnosticFinal.descPart1')}{" "}
          <span className="font-bold text-yellow-600">Abundance Diagnostic™ PDF</span>{" "}
          {t('diagnosticFinal.descPart2')}{" "}
          <span className="font-bold text-foreground">{t('diagnosticFinal.descMinutes')}</span>.
        </p>
      </div>

      <div className="w-full max-w-md space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="group p-6 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all hover:shadow-lg hover:shadow-green-500/10">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-lg">{t('diagnosticFinal.checkEmailTitle')}</h3>
          </div>
          <p className="text-sm text-muted-foreground text-left">
            {t('diagnosticFinal.checkEmailDesc')}
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="p-6 bg-gradient-to-br from-yellow-500/5 via-amber-500/10 to-orange-500/5 rounded-xl border border-yellow-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            {t('diagnosticFinal.nextStepTitle')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('diagnosticFinal.nextStepDescPart1')}{" "}
            <span className="font-bold text-yellow-600">CODE: ABUNDANCE™</span> {t('diagnosticFinal.nextStepDescPart2')}
          </p>
          <Button
            size="lg"
            className="w-full sm:w-auto group relative text-lg px-8 py-6 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-500 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            onClick={() => navigate("/vsl")}
          >
            <Video className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            {t('diagnosticFinal.watchVideoButton')}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
        </div>
      </div>

      <div className="pt-8 animate-fade-in" style={{ animationDelay: "600ms" }}>
        <Button
          variant="link"
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground"
        >
          {t('diagnosticFinal.backToHome')}
        </Button>
      </div>
    </div>
  );
};
