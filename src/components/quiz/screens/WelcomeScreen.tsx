"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuiz } from "../QuizContext";

export default function WelcomeScreen() {
  const { data, updateData, goNext, setCanProceed } = useQuiz();

  const emailValid = useMemo(() => {
    if (!data.email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  }, [data.email]);

  const formValid = data.name.trim().length > 0 && emailValid && data.gdprConsent;

  useEffect(() => {
    setCanProceed(formValid);
  }, [formValid, setCanProceed]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;
    sessionStorage.setItem("quiz_dir", "1");
    goNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Logo mark */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2"
      >
        <span className="text-accent text-xl">&#9670;</span>
        <span className="font-display font-bold text-sm tracking-[0.2em] text-text-primary uppercase">
          Abundance
        </span>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-2"
      >
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary leading-tight">
          Добре дошъл в<br />
          твоята диагностика.
        </h1>
        <p className="text-text-secondary text-base">
          Попълни данните си, за да получиш персонализиран анализ.
        </p>
      </motion.div>

      {/* Fields */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {/* Name */}
        <div>
          <label htmlFor="quiz-name" className="block text-sm text-text-secondary mb-1.5">
            Име <span className="text-accent">*</span>
          </label>
          <input
            id="quiz-name"
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Твоето име"
            autoComplete="given-name"
            className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="quiz-email" className="block text-sm text-text-secondary mb-1.5">
            Имейл <span className="text-accent">*</span>
          </label>
          <input
            id="quiz-email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="email@example.com"
            autoComplete="email"
            className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
          />
          {data.email && !emailValid && (
            <p className="mt-1 text-xs text-red-400">
              Моля, въведи валиден имейл адрес.
            </p>
          )}
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="quiz-phone" className="block text-sm text-text-secondary mb-1.5">
            Телефон <span className="text-text-secondary/50 text-xs">(по избор)</span>
          </label>
          <input
            id="quiz-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="+359 ..."
            autoComplete="tel"
            className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>

        {/* GDPR */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={data.gdprConsent}
              onChange={(e) => updateData({ gdprConsent: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-5 h-5 border border-border rounded bg-surface-muted peer-checked:bg-accent peer-checked:border-accent transition-colors" />
            {data.gdprConsent && (
              <svg
                className="absolute inset-0 w-5 h-5 text-primary pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm text-text-secondary leading-snug">
            Съгласен/а съм с обработката на личните ми данни съгласно{" "}
            <span className="text-accent underline">Политиката за поверителност</span>.
          </span>
        </label>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          type="submit"
          disabled={!formValid}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-display font-semibold text-base bg-accent text-primary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-light cursor-pointer"
        >
          Започни
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </form>
  );
}
