"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuiz } from "../QuizContext";

const INCOME_OPTIONS = [
  "Под €1,000",
  "€1,000 – €3,000",
  "€3,000 – €6,000",
  "€6,000 – €10,000",
  "Над €10,000",
];

export default function IncomeScreen() {
  const { data, updateData, setCanProceed } = useQuiz();

  useEffect(() => {
    setCanProceed(data.incomeLevel !== "");
  }, [data.incomeLevel, setCanProceed]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
          Ресурси
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
          Какъв е месечният ти доход?
        </h2>
        <p className="text-text-secondary text-sm">
          Това ни помага да калибрираме плана спрямо твоята ситуация.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3">
        {INCOME_OPTIONS.map((opt, i) => {
          const selected = data.incomeLevel === opt;
          return (
            <motion.button
              key={opt}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => updateData({ incomeLevel: opt })}
              className={`
                px-5 py-3 rounded-full border-2 text-sm font-display font-semibold
                transition-all duration-200 cursor-pointer whitespace-nowrap
                ${
                  selected
                    ? "border-accent bg-accent/10 text-accent shadow-[0_0_16px_rgba(201,168,76,0.12)]"
                    : "border-border bg-surface-muted text-text-secondary hover:border-border/80 hover:text-text-primary"
                }
              `}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
