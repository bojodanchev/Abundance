"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuiz } from "../QuizContext";

export default function BirthDataScreen() {
  const { data, updateData, setCanProceed } = useQuiz();

  const valid = data.birthDate.trim().length > 0 && data.birthCity.trim().length > 0;

  useEffect(() => {
    setCanProceed(valid);
  }, [valid, setCanProceed]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
          Core Code
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
          Разкрий Core Code-а си.
        </h2>
        <p className="text-text-secondary text-sm">
          Рождените ти данни позволяват по-дълбок и по-точен анализ.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-5"
      >
        {/* Birth date */}
        <div>
          <label htmlFor="birth-date" className="block text-sm text-text-secondary mb-1.5">
            Дата на раждане <span className="text-accent">*</span>
          </label>
          <input
            id="birth-date"
            type="date"
            value={data.birthDate}
            onChange={(e) => updateData({ birthDate: e.target.value })}
            className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors
              [&::-webkit-calendar-picker-indicator]:invert
              [&::-webkit-calendar-picker-indicator]:opacity-50
              [&::-webkit-calendar-picker-indicator]:hover:opacity-100
            "
          />
        </div>

        {/* Birth time */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="birth-time" className="text-sm text-text-secondary">
              Час на раждане
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs text-text-secondary">Не знам</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={data.birthTimeUnknown}
                  onChange={(e) =>
                    updateData({
                      birthTimeUnknown: e.target.checked,
                      birthTime: e.target.checked ? "" : data.birthTime,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 rounded-full bg-border peer-checked:bg-accent transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
              </div>
            </label>
          </div>
          <input
            id="birth-time"
            type="time"
            value={data.birthTime}
            onChange={(e) => updateData({ birthTime: e.target.value })}
            disabled={data.birthTimeUnknown}
            className={`
              w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-text-primary
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all
              [&::-webkit-calendar-picker-indicator]:invert
              [&::-webkit-calendar-picker-indicator]:opacity-50
              ${data.birthTimeUnknown ? "opacity-30 cursor-not-allowed" : ""}
            `}
          />
        </div>

        {/* Birth city */}
        <div>
          <label htmlFor="birth-city" className="block text-sm text-text-secondary mb-1.5">
            Град на раждане <span className="text-accent">*</span>
          </label>
          <input
            id="birth-city"
            type="text"
            value={data.birthCity}
            onChange={(e) => updateData({ birthCity: e.target.value })}
            placeholder="напр. София"
            autoComplete="address-level2"
            className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>
      </motion.div>
    </div>
  );
}
