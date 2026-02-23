"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useQuiz, LIFE_AREAS } from "../QuizContext";

export default function ConfirmationScreen() {
  const { data, updateData, setCanProceed, isSubmitting, setIsSubmitting } =
    useQuiz();
  const router = useRouter();
  const locale = useLocale();
  const [error, setError] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const formValid =
    data.name.trim().length > 0 &&
    emailValid &&
    data.gdprConsent &&
    data.birthDate.trim().length > 0 &&
    data.birthCity.trim().length > 0 &&
    data.commitmentLevel !== "" &&
    data.incomeLevel !== "" &&
    data.priorities.length === 3;

  useEffect(() => {
    setCanProceed(false); // hide the shell's Continue button
  }, [setCanProceed]);

  const handleSubmit = useCallback(async () => {
    if (!formValid || isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      const payload = {
        user_name: data.name.trim(),
        user_email: data.email.trim(),
        user_phone: data.phone.trim() || undefined,
        locale: locale === "en" ? "en" : "bg",
        scores: data.scores,
        priority_top3: data.priorities,
        goals: data.goals,
        birth_date: data.birthDate,
        birth_time: data.birthTimeUnknown ? undefined : data.birthTime || undefined,
        birth_time_unknown: data.birthTimeUnknown,
        birth_city: data.birthCity.trim() || undefined,
        birth_country: undefined,
        commitment_level: data.commitmentLevel,
        income_level: data.incomeLevel,
        gdpr_consent: data.gdprConsent,
      };

      const res = await fetch("/api/webhook/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Нещо се обърка. Опитай отново.");
      }

      const { submissionId } = await res.json();

      // Clear localStorage on success
      try {
        localStorage.removeItem("abundance_quiz_data");
        localStorage.removeItem("abundance_quiz_step");
      } catch {
        /* ignore */
      }

      router.push(`/processing?id=${submissionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Нещо се обърка.");
      setIsSubmitting(false);
    }
  }, [data, formValid, isSubmitting, locale, router, setIsSubmitting]);

  /* Priorities labels */
  const priorityLabels = data.priorities.map(
    (k) => LIFE_AREAS.find((a) => a.key === k)!.label
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
          Потвърждение
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
          Потвърди информацията си.
        </h2>
      </motion.div>

      {/* Editable fields */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="confirm-name" className="block text-sm text-text-secondary mb-1.5">
            Име
          </label>
          <input
            id="confirm-name"
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="confirm-email" className="block text-sm text-text-secondary mb-1.5">
            Имейл
          </label>
          <input
            id="confirm-email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-5 rounded-xl border border-border bg-surface-muted space-y-3"
      >
        <h3 className="font-display font-semibold text-sm text-text-primary">
          Какво ще получиш:
        </h3>
        <ul className="space-y-2">
          {[
            "Персонализиран профил базиран на твоите данни",
            `Анализ на приоритетите ти: ${priorityLabels.join(", ")}`,
            "Безплатен тийзър PDF с ключови прозрения",
            "90-дневна пътна карта за действие",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Delivery note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-text-secondary text-center"
      >
        Диагностиката ще бъде изпратена на:{" "}
        <span className="text-accent">{data.email}</span>
      </motion.p>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}

      {/* Submit CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <button
          onClick={handleSubmit}
          disabled={!formValid || isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-display font-bold text-base bg-accent text-primary transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent-light cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Обработване...
            </>
          ) : (
            <>
              Генерирай Моя Анализ
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
