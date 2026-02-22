"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

/* -------------------------------------------------- */
/*  Life areas (keys used everywhere)                 */
/* -------------------------------------------------- */

export const LIFE_AREAS = [
  { key: "finances", label: "Финанси" },
  { key: "business", label: "Бизнес" },
  { key: "health", label: "Здраве" },
  { key: "mental", label: "Ментално здраве" },
  { key: "romantic", label: "Романтика" },
  { key: "social", label: "Социален живот" },
  { key: "mission", label: "Мисия / Цел" },
] as const;

export type LifeAreaKey = (typeof LIFE_AREAS)[number]["key"];

/* -------------------------------------------------- */
/*  Quiz data shape                                   */
/* -------------------------------------------------- */

export interface QuizData {
  name: string;
  email: string;
  phone: string;
  gdprConsent: boolean;
  scores: Record<LifeAreaKey, number>;
  priorities: LifeAreaKey[];
  goals: Partial<Record<LifeAreaKey, number>>;
  birthDate: string;
  birthTime: string;
  birthTimeUnknown: boolean;
  birthCity: string;
  commitmentLevel: "high" | "medium" | "low" | "";
  incomeLevel: string;
}

const DEFAULT_SCORES: Record<LifeAreaKey, number> = {
  finances: 5,
  business: 5,
  health: 5,
  mental: 5,
  romantic: 5,
  social: 5,
  mission: 5,
};

const INITIAL_DATA: QuizData = {
  name: "",
  email: "",
  phone: "",
  gdprConsent: false,
  scores: { ...DEFAULT_SCORES },
  priorities: [],
  goals: {},
  birthDate: "",
  birthTime: "",
  birthTimeUnknown: false,
  birthCity: "",
  commitmentLevel: "",
  incomeLevel: "",
};

const TOTAL_STEPS = 8;
const STORAGE_KEY = "abundance_quiz_data";
const STEP_KEY = "abundance_quiz_step";

/* -------------------------------------------------- */
/*  Context type                                      */
/* -------------------------------------------------- */

interface QuizContextValue {
  data: QuizData;
  step: number;
  totalSteps: number;
  updateData: (partial: Partial<QuizData>) => void;
  goNext: () => void;
  goBack: () => void;
  goTo: (step: number) => void;
  canProceed: boolean;
  setCanProceed: (v: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (v: boolean) => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

/* -------------------------------------------------- */
/*  Provider                                          */
/* -------------------------------------------------- */

export function QuizProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<QuizData>(INITIAL_DATA);
  const [step, setStep] = useState(1);
  const [canProceed, setCanProceed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /* Restore from localStorage on mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as QuizData;
        setData({ ...INITIAL_DATA, ...parsed });
      }
      const storedStep = localStorage.getItem(STEP_KEY);
      if (storedStep) {
        const n = parseInt(storedStep, 10);
        if (n >= 1 && n <= TOTAL_STEPS) setStep(n);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  /* Persist to localStorage on every change (after hydration) */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(STEP_KEY, String(step));
    } catch {
      /* storage full – non-critical */
    }
  }, [data, step, hydrated]);

  const updateData = useCallback((partial: Partial<QuizData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const goNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const goTo = useCallback((target: number) => {
    setStep(Math.max(1, Math.min(target, TOTAL_STEPS)));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        data,
        step,
        totalSteps: TOTAL_STEPS,
        updateData,
        goNext,
        goBack,
        goTo,
        canProceed,
        setCanProceed,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

/* -------------------------------------------------- */
/*  Hook                                              */
/* -------------------------------------------------- */

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
