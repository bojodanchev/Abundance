"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuiz } from "../QuizContext";

const OPTIONS = [
  {
    value: "high" as const,
    emoji: "\uD83D\uDD25",
    title: "Готов съм да действам",
    description: "100% фокусиран и готов за промяна.",
  },
  {
    value: "medium" as const,
    emoji: "\u26A1",
    title: "Нужда от насоки",
    description: "Мотивиран съм, но ми трябва план.",
  },
  {
    value: "low" as const,
    emoji: "\uD83D\uDD0D",
    title: "Проучвам",
    description: "Още не съм решил, искам да видя какво предлагате.",
  },
];

export default function CommitmentScreen() {
  const { data, updateData, setCanProceed } = useQuiz();

  useEffect(() => {
    setCanProceed(data.commitmentLevel !== "");
  }, [data.commitmentLevel, setCanProceed]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
          Готовност
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
          Колко си готов да изпълниш плана?
        </h2>
      </motion.div>

      <div className="space-y-3">
        {OPTIONS.map((opt, i) => {
          const selected = data.commitmentLevel === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              onClick={() => updateData({ commitmentLevel: opt.value })}
              className={`
                w-full text-left px-5 py-5 rounded-xl border-2 transition-all duration-200 cursor-pointer
                ${
                  selected
                    ? "border-accent bg-accent/5 shadow-[0_0_24px_rgba(201,168,76,0.1)]"
                    : "border-border bg-surface-muted hover:border-border/80"
                }
              `}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{opt.emoji}</span>
                <div>
                  <p className="font-display font-semibold text-base text-text-primary">
                    {opt.title}
                  </p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {opt.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
