"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

/* ─── visual timing (cosmetic step reveals) ─── */
const STEP_TIMINGS = [2000, 5000, 9000]; // first 3 steps are cosmetic
const POLL_INTERVAL = 3000; // check API every 3s
const TIP_INTERVAL = 5000;

type StepStatus = "pending" | "active" | "done";

export default function ProcessingPageWrapper() {
  return (
    <Suspense
      fallback={
        <main className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]">
          <span className="text-accent text-2xl">&#9670;</span>
        </main>
      }
    >
      <ProcessingPage />
    </Suspense>
  );
}

function ProcessingPage() {
  const t = useTranslations("processing");
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? searchParams.get("id");

  /* step state */
  const [steps, setSteps] = useState<StepStatus[]>([
    "active",
    "pending",
    "pending",
    "pending",
  ]);
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [analysisReady, setAnalysisReady] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const startTime = useRef(0);
  const rafRef = useRef<number>(0);
  const pollRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const tips = [t("tip1"), t("tip2"), t("tip3")];
  const stepLabels = [t("step1"), t("step2"), t("step3"), t("step4")];

  // Resolve ref to UUID for API polling
  useEffect(() => {
    if (!ref) return;
    fetch(`/api/submission-status?ref=${ref}`)
      .then((r) => r.json())
      .then((d) => { if (d.submissionId) setSubmissionId(d.submissionId); })
      .catch(() => {});
  }, [ref]);

  /* ── orchestrated entrance ── */
  useEffect(() => {
    const t0 = setTimeout(() => setShowLogo(true), 200);
    const t1 = setTimeout(() => setShowTitle(true), 800);
    const t2 = setTimeout(() => setShowSteps(true), 1400);
    const t3 = setTimeout(() => setShowBar(true), 1800);
    const t4 = setTimeout(() => setShowTips(true), 2400);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  /* ── poll submission status ── */
  const checkStatus = useCallback(async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`/api/submission-status?id=${submissionId}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.ready) {
        setAnalysisReady(true);
      }
    } catch {
      // silently retry on next interval
    }
  }, [submissionId]);

  useEffect(() => {
    if (!ref) {
      router.push("/");
      return;
    }
    if (!submissionId) return; // wait for UUID resolution

    // Start polling immediately
    checkStatus();
    pollRef.current = setInterval(checkStatus, POLL_INTERVAL);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [ref, submissionId, checkStatus, router]);

  /* ── when analysis is ready, complete all steps and redirect ── */
  useEffect(() => {
    if (!analysisReady) return;

    // Stop polling
    if (pollRef.current) clearInterval(pollRef.current);

    // Mark all steps done, set progress to 100%
    setSteps(["done", "done", "done", "done"]);
    setProgress(1);

    // Redirect after a brief moment to show 100% state
    const timeout = setTimeout(() => {
      router.push(`/results/${ref}`);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [analysisReady, router, ref]);

  /* ── progress bar + cosmetic step advancement ── */
  useEffect(() => {
    startTime.current = performance.now();

    const tick = () => {
      if (analysisReady) return; // stop cosmetic animation once ready

      const elapsed = performance.now() - startTime.current;
      // Progress moves to ~85% over 60 seconds, never reaching 100% until ready
      const maxCosmetic = 0.85;
      const cosmeticDuration = 60000;
      const pct = Math.min(elapsed / cosmeticDuration, 1) * maxCosmetic;
      setProgress(pct);

      /* advance cosmetic steps (first 3 only — step 4 waits for real data) */
      setSteps((prev) => {
        const next = [...prev];
        for (let i = 0; i < STEP_TIMINGS.length; i++) {
          if (elapsed >= STEP_TIMINGS[i]) {
            next[i] = "done";
            if (i + 1 < next.length && next[i + 1] === "pending") {
              next[i + 1] = "active";
            }
          }
        }
        return next;
      });

      if (pct < maxCosmetic) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [analysisReady]);

  /* ── rotating tips ── */
  useEffect(() => {
    const iv = setInterval(() => {
      setTipIndex((i) => (i + 1) % tips.length);
    }, TIP_INTERVAL);
    return () => clearInterval(iv);
  }, [tips.length]);

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
      {/* subtle radial glow */}
      <div className="absolute inset-0 bg-radial-gold opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-lg w-full">
        {/* ── Logo ── */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <span className="text-accent text-2xl">&#9670;</span>
              <span className="font-display font-bold text-xl tracking-wide text-white">
                ABUNDANCE
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Title ── */}
        <AnimatePresence>
          {showTitle && (
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold text-2xl sm:text-3xl text-white text-center"
            >
              {t("title")}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* ── Steps ── */}
        <AnimatePresence>
          {showSteps && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-4"
            >
              {stepLabels.map((label, i) => (
                <Step key={i} label={label} status={steps[i]} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Progress Bar ── */}
        <AnimatePresence>
          {showBar && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-secondary font-mono">
                  {Math.round(progress * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  style={{
                    width: `${progress * 100}%`,
                    transition: "width 0.3s ease-out",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Rotating Tips ── */}
        <AnimatePresence>
          {showTips && (
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm text-text-secondary text-center max-w-sm leading-relaxed"
                >
                  &ldquo;{tips[tipIndex]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ─── Single processing step row ─── */
function Step({
  label,
  status,
  index,
}: {
  label: string;
  status: StepStatus;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.35 }}
      className="flex items-center gap-3"
    >
      {/* icon */}
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        {status === "done" ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
            }}
          >
            <Check className="w-5 h-5 text-accent" strokeWidth={3} />
          </motion.div>
        ) : status === "active" ? (
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="block w-2.5 h-2.5 rounded-full bg-accent"
          />
        ) : (
          <span className="block w-2 h-2 rounded-full bg-[#333]" />
        )}
      </div>

      {/* label */}
      <span
        className={`text-sm sm:text-base transition-colors duration-300 ${
          status === "done"
            ? "text-white"
            : status === "active"
            ? "text-accent"
            : "text-text-secondary/40"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}
