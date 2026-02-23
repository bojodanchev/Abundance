"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Check, Lock, ArrowRight } from "lucide-react";

const TIMER_DURATION = 10 * 60; // 10 minutes in seconds

export default function BumpOfferPageWrapper() {
  return (
    <Suspense
      fallback={
        <main className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]">
          <span className="text-accent text-2xl">&#9670;</span>
        </main>
      }
    >
      <BumpOfferPage />
    </Suspense>
  );
}

function BumpOfferPage() {
  const t = useTranslations("bumpOffer");
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [secondsLeft, setSecondsLeft] = useState(TIMER_DURATION);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Redirect if no id
  useEffect(() => {
    if (!id) {
      router.push("/");
    }
  }, [id, router]);

  // Countdown timer persisted in sessionStorage
  useEffect(() => {
    if (!id) return;

    const storageKey = `bump_timer_${id}`;
    const stored = sessionStorage.getItem(storageKey);

    let endTime: number;
    if (stored) {
      endTime = parseInt(stored, 10);
    } else {
      endTime = Date.now() + TIMER_DURATION * 1000;
      sessionStorage.setItem(storageKey, endTime.toString());
    }

    const tick = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        sessionStorage.removeItem(storageKey);
        router.push(`/processing?id=${id}`);
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id, router]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const handleBuy = useCallback(async () => {
    if (isLoading || !id) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/create-bump-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submission_id: id, locale }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const data = await res.json();
      window.location.href = data.url;
    } catch {
      setIsLoading(false);
    }
  }, [id, isLoading, locale]);

  const handleSkip = useCallback(() => {
    if (!id) return;
    router.push(`/processing?id=${id}`);
  }, [id, router]);

  if (!id) return null;

  const benefits = [t("benefit1"), t("benefit2"), t("benefit3")];

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] overflow-y-auto">
      {/* radial gold glow */}
      <div className="absolute inset-0 bg-radial-gold opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-6 py-12 max-w-lg w-full">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 space-y-8"
        >
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-accent font-mono text-xs tracking-[0.25em] uppercase text-center"
          >
            {t("label")}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="font-display font-bold text-2xl sm:text-3xl text-white text-center"
          >
            {t("title")}
          </motion.h1>

          {/* Timer */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-text-secondary text-xs font-mono uppercase tracking-wider">
              {t("timerLabel")}
            </span>
            <span className="text-accent text-4xl font-bold font-mono tabular-nums">
              {timerDisplay}
            </span>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="space-y-3"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="text-sm text-white">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="text-text-secondary line-through text-lg">
              {t("originalPrice")}
            </span>
            <span className="text-accent text-4xl font-bold">
              {t("price")}
            </span>
            <span className="bg-accent/15 text-accent text-xs font-mono font-bold px-2.5 py-1 rounded-full">
              {t("discount")}
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <button
              onClick={handleBuy}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-display font-bold text-base bg-accent text-[#0A0A0A] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 cursor-pointer"
            >
              {isLoading ? (
                <span className="animate-pulse">{t("cta")}</span>
              ) : (
                <>
                  {t("cta")}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </motion.div>

          {/* Skip link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.4 }}
            className="text-center"
          >
            <button
              onClick={handleSkip}
              className="text-text-secondary text-sm underline underline-offset-4 hover:text-white transition-colors cursor-pointer"
            >
              {t("skip")}
            </button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-text-secondary" />
            <span className="text-text-secondary text-xs">{t("trust")}</span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
