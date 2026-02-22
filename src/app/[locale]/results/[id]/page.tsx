"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lock, Eye } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Link } from "@/i18n/navigation";

/* ─── Mock data (no real API yet) ─── */
const mockResults = {
  name: "Иван",
  hdType: "Генератор 5/1",
  hdStrategy: "Да Откликваш",
  lifePathNumber: "8",
  scores: {
    finances: 7,
    business: 5,
    health: 8,
    mental: 4,
    romantic: 6,
    social: 7,
    mission: 3,
  } as Record<string, number>,
  priorities: ["finances", "mental", "mission"],
  teaserInsights: {
    finances: "Финансовият ти потенциал е свързан с...",
    mental: "Менталната ти устойчивост крие...",
    mission: "Мисията ти е свързана с...",
  } as Record<string, string>,
};

const AREA_LABELS: Record<string, string> = {
  finances: "Финанси",
  business: "Бизнес",
  health: "Здраве",
  mental: "Ментално",
  romantic: "Романтика",
  social: "Социален",
  mission: "Мисия",
};

/* ─── Animation presets ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ResultsPage() {
  const t = useTranslations("results");
  const [chartVisible, setChartVisible] = useState(false);
  const [viewerCount] = useState(
    () => 30 + Math.floor(Math.random() * 15),
  );

  useEffect(() => {
    const timer = setTimeout(() => setChartVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  /* Build radar data */
  const radarData = Object.entries(mockResults.scores).map(([key, value]) => ({
    area: AREA_LABELS[key] ?? key,
    value,
    fullMark: 10,
  }));

  const allAreas = Object.keys(mockResults.scores);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* ─── Minimal nav ─── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-black/90 backdrop-blur-md border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-accent text-xl">&#9670;</span>
          <span className="font-display font-bold text-lg tracking-wide text-white">
            ABUNDANCE
          </span>
        </Link>
        {/* placeholder language switcher spot */}
        <div className="text-xs text-text-secondary font-mono">BG / EN</div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
        {/* ═══════════════ A. PROFILE HEADER ═══════════════ */}
        <motion.section
          initial="hidden"
          animate="visible"
          className="text-center space-y-6"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-accent text-xs sm:text-sm font-display font-semibold tracking-[0.25em] uppercase"
          >
            {t("label")}
          </motion.p>

          <motion.p
            custom={1}
            variants={fadeUp}
            className="text-text-secondary text-lg sm:text-xl"
          >
            {t("youAre", { name: mockResults.name })}
          </motion.p>

          {/* HD Type badge */}
          <motion.div
            custom={2}
            variants={fadeUp}
            className="inline-block"
          >
            <div className="relative px-8 py-5 rounded-xl border-2 border-accent/60 bg-[#0F0F0F]">
              {/* subtle glow */}
              <div className="absolute inset-0 rounded-xl bg-accent/5 pointer-events-none" />
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white relative">
                {mockResults.hdType}
              </h2>
            </div>
          </motion.div>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="font-mono font-bold text-lg text-accent tracking-wider"
          >
            {t("lifePath", { number: mockResults.lifePathNumber })}
          </motion.p>

          <motion.p
            custom={4}
            variants={fadeUp}
            className="text-text-secondary text-sm"
          >
            {mockResults.hdStrategy}
          </motion.p>
        </motion.section>

        {/* ═══════════════ B. RADAR CHART ═══════════════ */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: chartVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-md aspect-square">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
                <PolarGrid
                  stroke="rgba(201, 168, 76, 0.15)"
                  strokeWidth={1}
                />
                <PolarAngleAxis
                  dataKey="area"
                  tick={{
                    fill: "#C9A84C",
                    fontSize: 12,
                    fontFamily:
                      "var(--font-plus-jakarta-sans), Plus Jakarta Sans, sans-serif",
                  }}
                />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#C9A84C"
                  strokeWidth={2}
                  fill="#C9A84C"
                  fillOpacity={0.15}
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* ═══════════════ C. KEY INSIGHTS ═══════════════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-accent text-xs sm:text-sm font-display font-semibold tracking-[0.25em] uppercase text-center"
          >
            {t("insightsLabel")}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAreas.map((areaKey, i) => {
              const isPriority = mockResults.priorities.includes(areaKey);
              const score = mockResults.scores[areaKey];
              const label =
                AREA_LABELS[areaKey] ?? areaKey;

              return (
                <motion.div
                  key={areaKey}
                  custom={i + 1}
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-xl bg-[#1A1A1A] border border-border p-5 flex flex-col gap-3"
                >
                  {/* header row */}
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-white text-sm">
                      {label}
                    </span>
                    <span className="font-mono font-bold text-accent text-sm">
                      {score}/10
                    </span>
                  </div>

                  {isPriority ? (
                    /* ── Unlocked teaser ── */
                    <div className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {mockResults.teaserInsights[areaKey] ??
                          "Прозрение за тази сфера..."}
                      </p>
                    </div>
                  ) : (
                    /* ── Locked state ── */
                    <div className="relative">
                      <p className="text-sm text-text-secondary leading-relaxed blur-[6px] select-none pointer-events-none">
                        Тази сфера крие важни прозрения за твоя профил и
                        потенциал за растеж, които ще разкрием в пълния доклад.
                      </p>
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                        <Lock className="w-5 h-5 text-accent/70" />
                        <span className="text-xs text-accent/70 font-medium">
                          {t("locked")}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══════════════ D. UPGRADE SECTION ═══════════════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="space-y-8"
        >
          {/* gold divider */}
          <motion.div
            custom={0}
            variants={fadeUp}
            className="w-full h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          />

          <motion.div
            custom={1}
            variants={fadeUp}
            className="text-center space-y-4"
          >
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">
              &#128275; {t("upgradeTitle")}
            </p>
            <p className="text-text-secondary text-base sm:text-lg">
              {t("upgradeDesc")}
            </p>
            <p className="text-accent font-display font-extrabold text-3xl sm:text-4xl">
              {t("upgradePrice")}
            </p>
          </motion.div>

          {/* CTA button */}
          <motion.div
            custom={2}
            variants={fadeUp}
            className="flex flex-col items-center gap-4"
          >
            <button className="px-8 py-4 rounded-lg bg-accent text-black font-display font-bold text-base sm:text-lg transition-all duration-200 hover:bg-accent-dark hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98]">
              {t("upgradeCta")}
            </button>

            <Link
              href="/thank-you"
              className="text-sm text-accent/70 hover:text-accent transition-colors underline underline-offset-4"
            >
              {t("continueFree")}
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={3}
            variants={fadeUp}
            className="flex items-center justify-center gap-2 pt-4"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-xs text-text-secondary">
              <span className="font-mono text-white">{viewerCount}</span> души
              гледат тази страница
            </span>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
