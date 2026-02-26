import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DiagnosticIntro } from "@/components/diagnostic/DiagnosticIntro";
import { DiagnosticRatings } from "@/components/diagnostic/DiagnosticRatings";
import { DiagnosticPriorities } from "@/components/diagnostic/DiagnosticPriorities";
import { DiagnosticGoals } from "@/components/diagnostic/DiagnosticGoals";
import { DiagnosticCoreCode } from "@/components/diagnostic/DiagnosticCoreCode";
import { DiagnosticCommitment } from "@/components/diagnostic/DiagnosticCommitment";
import { DiagnosticIncome } from "@/components/diagnostic/DiagnosticIncome";
import { DiagnosticContact } from "@/components/diagnostic/DiagnosticContact";
import { DiagnosticFinal } from "@/components/diagnostic/DiagnosticFinal";
import { mapDiagnosticToQuiz } from "@/lib/mapDiagnosticToQuiz";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

export interface DiagnosticFormData {
  // Ratings (Screen 2)
  rating_finances: number;
  rating_business: number;
  rating_health: number;
  rating_mental: number;
  rating_romantic: number;
  rating_social: number;
  rating_mission: number;
  // Priorities (Screen 3)
  priority_top3: string[];
  // Goals (Screen 4)
  goal_sphere_values: Array<{ sphere: string; goal: number }>;
  // Core Code (Screen 5)
  birth_date: string;
  birth_time: string;
  birth_city: string;
  birth_country: string;
  // Commitment (Screen 6)
  commitment_level: string;
  // Income (Screen 7)
  income_level: string;
  // Contact (Screen 8)
  user_name: string;
  user_email: string;
  user_phone: string;
  gdpr_consent: boolean;
  diagnostic_result?: any;
}

const Diagnostic = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ submissionId: string; prelaunch: boolean } | null>(null);
  const [formData, setFormData] = useState<DiagnosticFormData>({
    rating_finances: 5,
    rating_business: 5,
    rating_health: 5,
    rating_mental: 5,
    rating_romantic: 5,
    rating_social: 5,
    rating_mission: 5,
    priority_top3: [],
    goal_sphere_values: [],
    birth_date: "",
    birth_time: "",
    birth_city: "",
    birth_country: "",
    commitment_level: "",
    income_level: "",
    user_name: "",
    user_email: "",
    user_phone: "",
    gdpr_consent: false,
  });

  const updateFormData = (data: Partial<DiagnosticFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem("freeAnalysisData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.name || parsed.email) {
          setFormData(prev => ({
            ...prev,
            user_name: parsed.name || prev.user_name,
            user_email: parsed.email || prev.user_email,
            user_phone: parsed.phone || prev.user_phone,
          }));
          // Optional: Clear storage so it doesn't persist forever?
          // Keeping it for now in case they refresh.
        }
      } catch (e) {
        console.error("Error parsing free analysis data", e);
      }
    }
  }, []);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const payload = mapDiagnosticToQuiz(formData);
      const res = await fetch("/api/webhook/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Submission failed");
      }

      setSubmissionResult({ submissionId: result.submissionId, prelaunch: result.prelaunch });
      toast.success(t('diagnostic.submitSuccess'));
      handleNext();
    } catch (error) {
      console.error("Error submitting diagnostic:", error);
      toast.error(t('diagnostic.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    <DiagnosticIntro key="intro" onNext={handleNext} />,
    <DiagnosticRatings
      key="ratings"
      data={formData}
      onUpdate={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <DiagnosticPriorities
      key="priorities"
      data={formData}
      onUpdate={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <DiagnosticGoals
      key="goals"
      data={formData}
      onUpdate={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <DiagnosticCoreCode
      key="corecode"
      data={formData}
      onUpdate={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <DiagnosticCommitment
      key="commitment"
      data={formData}
      onUpdate={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <DiagnosticIncome
      key="income"
      data={formData}
      onUpdate={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <DiagnosticContact
      key="contact"
      data={formData}
      onUpdate={updateFormData}
      onSubmit={handleSubmit}
      onBack={handleBack}
      isSubmitting={isSubmitting}
    />,
    <DiagnosticFinal key="final" submissionResult={submissionResult} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Progress Indicator */}
        {currentStep > 0 && currentStep < 8 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                {t('diagnostic.stepOf', { current: currentStep, total: 7 })}
              </span>
              <span className="text-sm font-medium">
                {Math.round((currentStep / 7) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Current Step */}
        {steps[currentStep]}
      </div>
    </div>
  );
};

export default Diagnostic;
