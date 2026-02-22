"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuiz, LIFE_AREAS, type LifeAreaKey } from "../QuizContext";

/* -------------------------------------------------- */
/*  Custom gold slider                                */
/* -------------------------------------------------- */

function GoldSlider({
  label,
  value,
  onChange,
  delay,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  delay: number;
}) {
  const pct = ((value - 1) / 9) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
          {label}
        </span>
        <span className="font-mono text-sm font-bold text-accent tabular-nums w-6 text-right">
          {value}
        </span>
      </div>

      <div className="relative h-10 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-border" />
        {/* Active fill */}
        <div
          className="absolute left-0 h-1.5 rounded-full bg-accent transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        {/* Native range (styled) */}
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
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

export default function LifeAuditScreen() {
  const { data, updateData, setCanProceed } = useQuiz();

  /* Always valid — sliders default to 5 */
  useEffect(() => {
    setCanProceed(true);
  }, [setCanProceed]);

  function handleChange(key: LifeAreaKey, value: number) {
    updateData({ scores: { ...data.scores, [key]: value } });
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
          Оценка
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
          Оцени живота си в тези 7 сфери.
        </h2>
        <p className="text-text-secondary text-sm">
          1 = критично &nbsp;&middot;&nbsp; 10 = отлично
        </p>
      </motion.div>

      <div className="space-y-5">
        {LIFE_AREAS.map((area, i) => (
          <GoldSlider
            key={area.key}
            label={area.label}
            value={data.scores[area.key]}
            onChange={(v) => handleChange(area.key, v)}
            delay={0.05 * i}
          />
        ))}
      </div>
    </div>
  );
}
