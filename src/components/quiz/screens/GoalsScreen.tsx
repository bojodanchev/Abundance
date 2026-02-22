"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight as ArrowIcon } from "lucide-react";
import { useQuiz, LIFE_AREAS, type LifeAreaKey } from "../QuizContext";

/* -------------------------------------------------- */
/*  Goal slider for a single priority area            */
/* -------------------------------------------------- */

function GoalSlider({
  areaKey,
  currentScore,
  goalScore,
  onChange,
  delay,
}: {
  areaKey: LifeAreaKey;
  currentScore: number;
  goalScore: number;
  onChange: (v: number) => void;
  delay: number;
}) {
  const area = LIFE_AREAS.find((a) => a.key === areaKey)!;
  const pct = ((goalScore - 1) / 9) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-3 p-5 rounded-xl border border-border bg-surface-muted"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-base text-text-primary">
          {area.label}
        </h3>

        {/* Current → Goal display */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-text-secondary tabular-nums">
            {currentScore}
          </span>
          <ArrowIcon size={14} className="text-accent" />
          <span className="font-mono text-sm font-bold text-accent tabular-nums">
            {goalScore}
          </span>
        </div>
      </div>

      <p className="text-xs text-text-secondary">
        Каква е целта ти за <span className="text-text-primary">{area.label}</span> след 90 дни?
      </p>

      {/* Slider */}
      <div className="relative h-10 flex items-center">
        {/* Track */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-border" />
        {/* Current score marker */}
        <div
          className="absolute h-3 w-0.5 bg-text-secondary/30 rounded"
          style={{ left: `${((currentScore - 1) / 9) * 100}%` }}
        />
        {/* Active fill */}
        <div
          className="absolute left-0 h-1.5 rounded-full bg-accent transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={goalScore}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-accent-light
            [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(201,168,76,0.4)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-accent
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-accent-light
            [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(201,168,76,0.4)]
            [&::-moz-range-track]:bg-transparent
          "
        />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------- */
/*  Screen                                            */
/* -------------------------------------------------- */

export default function GoalsScreen() {
  const { data, updateData, setCanProceed } = useQuiz();
  const { priorities, scores, goals } = data;

  /* Initialize goals for newly-selected priorities */
  useEffect(() => {
    const updated = { ...goals };
    let changed = false;
    for (const key of priorities) {
      if (updated[key] === undefined) {
        updated[key] = Math.min(scores[key] + 2, 10);
        changed = true;
      }
    }
    if (changed) updateData({ goals: updated });
  }, [priorities, scores, goals, updateData]);

  /* All three priorities have goals → valid */
  useEffect(() => {
    const allSet = priorities.every((k) => goals[k] !== undefined);
    setCanProceed(allSet);
  }, [priorities, goals, setCanProceed]);

  function handleChange(key: LifeAreaKey, value: number) {
    updateData({ goals: { ...goals, [key]: value } });
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
          Цели
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
          Къде искаш да бъдеш след 90 дни?
        </h2>
        <p className="text-text-secondary text-sm">
          Задай целеви резултат за всяка от избраните сфери.
        </p>
      </motion.div>

      <div className="space-y-4">
        {priorities.map((key, i) => (
          <GoalSlider
            key={key}
            areaKey={key}
            currentScore={scores[key]}
            goalScore={goals[key] ?? scores[key]}
            onChange={(v) => handleChange(key, v)}
            delay={0.08 * i}
          />
        ))}
      </div>
    </div>
  );
}
