"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuiz, LIFE_AREAS, type LifeAreaKey } from "../QuizContext";

export default function PriorityScreen() {
  const { data, updateData, setCanProceed } = useQuiz();
  const { priorities, scores } = data;

  useEffect(() => {
    setCanProceed(priorities.length === 3);
  }, [priorities, setCanProceed]);

  function toggle(key: LifeAreaKey) {
    if (priorities.includes(key)) {
      updateData({ priorities: priorities.filter((k) => k !== key) });
    } else if (priorities.length < 3) {
      updateData({ priorities: [...priorities, key] });
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
          Приоритети
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
          Кои са ТОП 3 сфери за фокус?
        </h2>
        <p className="text-text-secondary text-sm">
          Избери точно 3 области, в които искаш промяна.
        </p>
      </motion.div>

      {/* Counter */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-bold text-accent">
          {priorities.length}/3
        </span>
        <span className="text-sm text-text-secondary">избрани</span>
      </div>

      {/* Cards */}
      <div className="grid gap-3">
        {LIFE_AREAS.map((area, i) => {
          const selected = priorities.includes(area.key);
          const disabled = !selected && priorities.length >= 3;

          return (
            <motion.button
              key={area.key}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              onClick={() => toggle(area.key)}
              disabled={disabled}
              className={`
                relative flex items-center justify-between px-5 py-4 rounded-xl
                border-2 transition-all duration-200 text-left cursor-pointer
                ${
                  selected
                    ? "border-accent bg-accent/5 shadow-[0_0_20px_rgba(201,168,76,0.12)]"
                    : "border-border bg-surface-muted hover:border-border/80"
                }
                ${disabled ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              <div className="flex items-center gap-4">
                {/* Selection indicator */}
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    transition-colors duration-200 flex-shrink-0
                    ${selected ? "border-accent bg-accent" : "border-border"}
                  `}
                >
                  {selected && (
                    <svg
                      className="w-3 h-3 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <span className="font-display font-semibold text-base text-text-primary">
                  {area.label}
                </span>
              </div>

              {/* Current score badge */}
              <span className="font-mono text-sm font-bold text-accent tabular-nums">
                {scores[area.key]}/10
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
