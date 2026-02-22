"use client";

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuiz } from "./QuizContext";
import WelcomeScreen from "./screens/WelcomeScreen";
import LifeAuditScreen from "./screens/LifeAuditScreen";
import PriorityScreen from "./screens/PriorityScreen";
import GoalsScreen from "./screens/GoalsScreen";
import BirthDataScreen from "./screens/BirthDataScreen";
import CommitmentScreen from "./screens/CommitmentScreen";
import IncomeScreen from "./screens/IncomeScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";

/* -------------------------------------------------- */
/*  Screen registry                                   */
/* -------------------------------------------------- */

const SCREENS: Record<number, React.ComponentType> = {
  1: WelcomeScreen,
  2: LifeAuditScreen,
  3: PriorityScreen,
  4: GoalsScreen,
  5: BirthDataScreen,
  6: CommitmentScreen,
  7: IncomeScreen,
  8: ConfirmationScreen,
};

/* -------------------------------------------------- */
/*  Animation variants                                */
/* -------------------------------------------------- */

const screenVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
  mass: 0.8,
};

/* -------------------------------------------------- */
/*  QuizShell                                         */
/* -------------------------------------------------- */

export default function QuizShell() {
  const { step, totalSteps, goNext, goBack, canProceed, isSubmitting } =
    useQuiz();
  const router = useRouter();

  /* Track animation direction */
  const direction =
    typeof window !== "undefined"
      ? Number(sessionStorage.getItem("quiz_dir") ?? "1")
      : 1;

  const handleNext = useCallback(() => {
    if (!canProceed || isSubmitting) return;
    sessionStorage.setItem("quiz_dir", "1");
    goNext();
  }, [canProceed, isSubmitting, goNext]);

  const handleBack = useCallback(() => {
    if (step <= 1) return;
    sessionStorage.setItem("quiz_dir", "-1");
    goBack();
  }, [step, goBack]);

  const handleClose = useCallback(() => {
    if (window.confirm("Сигурен ли си, че искаш да излезеш? Напредъкът ти е запазен.")) {
      router.push("/");
    }
  }, [router]);

  /* Keyboard shortcuts */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && !e.shiftKey && step < totalSteps) {
        e.preventDefault();
        handleNext();
      }
      if (e.key === "Escape") {
        if (step > 1) handleBack();
        else handleClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handleBack, handleClose, step, totalSteps]);

  const ActiveScreen = SCREENS[step];
  const progressPct = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="fixed inset-0 bg-surface-dark flex flex-col overflow-hidden">
      {/* -------- Top bar: progress + close -------- */}
      <div className="relative z-10 flex-shrink-0">
        {/* Gold progress bar */}
        <div className="h-1 w-full bg-border">
          <motion.div
            className="h-full bg-accent"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Step indicator */}
          <span className="font-mono text-xs text-text-secondary tracking-widest">
            {step}/{totalSteps}
          </span>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Затвори"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* -------- Screen content (animated) -------- */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={springTransition}
            className="min-h-full flex flex-col items-center justify-center px-5 sm:px-6 py-8"
          >
            <div className="w-full max-w-xl">
              <ActiveScreen />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* -------- Bottom navigation -------- */}
      <div className="relative z-10 flex-shrink-0 border-t border-border">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 max-w-xl mx-auto w-full">
          {/* Back */}
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Назад</span>
            </button>
          ) : (
            <div />
          )}

          {/* Continue (hidden on screen 1 which has its own CTA, and screen 8 which has submit) */}
          {step > 1 && step < totalSteps && (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-display font-semibold bg-accent text-primary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-light cursor-pointer"
            >
              Продължи
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
