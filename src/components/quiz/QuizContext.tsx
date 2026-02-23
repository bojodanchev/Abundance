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

export const INCOME_LEVEL_OPTIONS = [
  { value: "under_1000", label: "Под €1,000" },
  { value: "1000_3000", label: "€1,000 – €3,000" },
  { value: "3000_6000", label: "€3,000 – €6,000" },
  { value: "6000_10000", label: "€6,000 – €10,000" },
  { value: "over_10000", label: "Над €10,000" },
] as const;

export type IncomeLevel = (typeof INCOME_LEVEL_OPTIONS)[number]["value"];

const LEGACY_INCOME_MAP: Record<string, IncomeLevel> = {
  "Под €1,000": "under_1000",
  "€1,000 – €3,000": "1000_3000",
  "€3,000 – €6,000": "3000_6000",
  "€6,000 – €10,000": "6000_10000",
  "Над €10,000": "over_10000",
};

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
  incomeLevel: IncomeLevel | "";
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

function normalizeStoredData(parsed: unknown): QuizData {
  if (!parsed || typeof parsed !== "object") return INITIAL_DATA;
  const partial = parsed as Partial<QuizData>;
  const rawIncomeLevel = partial.incomeLevel ?? "";
  const incomeLevel =
    rawIncomeLevel in LEGACY_INCOME_MAP
      ? LEGACY_INCOME_MAP[rawIncomeLevel as string]
      : rawIncomeLevel;

  return {
    ...INITIAL_DATA,
    ...partial,
    incomeLevel: (incomeLevel ?? "") as IncomeLevel | "",
  };
}

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
  const [data, setData] = useState<QuizData>(() => {
    if (typeof window === "undefined") return INITIAL_DATA;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return INITIAL_DATA;
      return normalizeStoredData(JSON.parse(stored));
    } catch {
      return INITIAL_DATA;
    }
  });
  const [step, setStep] = useState(() => {
    if (typeof window === "undefined") return 1;
    try {
      const storedStep = localStorage.getItem(STEP_KEY);
      if (!storedStep) return 1;
      const n = parseInt(storedStep, 10);
      return n >= 1 && n <= TOTAL_STEPS ? n : 1;
    } catch {
      return 1;
    }
  });
  const [canProceed, setCanProceed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Persist to localStorage on every change (after hydration) */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(STEP_KEY, String(step));
    } catch {
      /* storage full – non-critical */
    }
  }, [data, step]);

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
