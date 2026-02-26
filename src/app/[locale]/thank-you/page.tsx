"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Play, Check, Star, ArrowRight, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

/* -------------------------------------------------- */
/*  Animation helpers                                  */
/* -------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardHover = {
  rest: { scale: 1, boxShadow: "0 0 0 rgba(201,168,76,0)" },
  hover: {
    scale: 1.03,
    boxShadow: "0 8px 32px rgba(201,168,76,0.15)",
    transition: { duration: 0.25, ease: [0, 0, 0.58, 1] as const },
  },
};

const popularCardHover = {
  rest: { scale: 1.02, boxShadow: "0 4px 24px rgba(201,168,76,0.12)" },
  hover: {
    scale: 1.05,
    boxShadow: "0 12px 48px rgba(201,168,76,0.25)",
    transition: { duration: 0.25, ease: [0, 0, 0.58, 1] as const },
  },
};

/* -------------------------------------------------- */
/*  Data                                               */
/* -------------------------------------------------- */

type CheckoutTier = "low" | "mid" | "high";

type PricingTier = {
  id: string;
  checkoutTier?: CheckoutTier;
  header: string;
  price: string;
  originalPrice?: string;
  priceSuffix?: string;
  badge?: string;
  badgeStyle?: "included" | "popular" | "limited";
  features: string[];
  buttonLabel: string;
  buttonVariant: "ghost" | "primary" | "secondary";
  highlighted?: boolean;
};

const tiers: PricingTier[] = [
  {
    id: "free",
    header: "Безплатен",
    price: "€0",
    originalPrice: "€9.99",
    badge: "Включен",
    badgeStyle: "included",
    features: [
      "Teaser PDF доклад",
      "Профилен тип",
      "1 прозрение на сфера",
    ],
    buttonLabel: "Вече включен",
    buttonVariant: "ghost",
  },
  {
    id: "full",
    checkoutTier: "low",
    header: "Пълен Доклад",
    price: "€35",
    originalPrice: "€99",
    badge: "Най-популярен",
    badgeStyle: "popular",
    features: [
      "Всичко от безплатния",
      "Пълен Human Design анализ",
      "Детайлна нумерология",
      "Астрологичен профил",
      "90-дневен план за действие",
      "Персонализирани стратегии",
    ],
    buttonLabel: "Отключи Пълния Доклад",
    buttonVariant: "primary",
    highlighted: true,
  },
  {
    id: "vip",
    checkoutTier: "high",
    header: "VIP Coaching",
    price: "€395",
    originalPrice: "€999",
    badge: "Ограничени места",
    badgeStyle: "limited",
    features: [
      "Всичко от пълния доклад",
      "4x 1-on-1 coaching сесии",
      "Персонализиран roadmap",
      "Седмичен check-in",
      "Директен достъп до ментор",
      "90 дни подкрепа",
    ],
    buttonLabel: "Запиши се за Coaching",
    buttonVariant: "secondary",
  },
];

/* -------------------------------------------------- */
/*  Sub-components                                     */
/* -------------------------------------------------- */

function GoldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-accent font-mono text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
      {children}
    </p>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-text-secondary">
      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" strokeWidth={3} />
      <span>{text}</span>
    </li>
  );
}

function PricingCard({
  tier,
  onCheckout,
  loading,
}: {
  tier: PricingTier;
  onCheckout?: (checkoutTier: CheckoutTier) => void;
  loading?: boolean;
}) {
  const isPopular = tier.highlighted;

  return (
    <motion.div
      variants={fadeUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative"
    >
      {/* Popular badge - floats above card */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 bg-accent text-primary text-xs font-display font-bold px-4 py-1.5 rounded-full shadow-lg">
            <Star className="w-3 h-3" fill="currentColor" />
            {tier.badge}
          </span>
        </div>
      )}

      <motion.div
        variants={isPopular ? popularCardHover : cardHover}
        className={`
          relative flex flex-col h-full rounded-2xl p-6 sm:p-8
          ${isPopular
            ? "border-2 border-accent bg-[#1A1A1A] ring-1 ring-accent/20"
            : "border border-border bg-[#1A1A1A]"
          }
        `}
      >
        {/* Non-popular badges */}
        {!isPopular && tier.badge && (
          <span
            className={`
              inline-flex self-start items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4
              ${tier.badgeStyle === "included"
                ? "bg-accent/10 text-accent"
                : "bg-white/5 text-text-secondary border border-border"
              }
            `}
          >
            {tier.badgeStyle === "included" && <Check className="w-3 h-3" />}
            {tier.badge}
          </span>
        )}

        {/* Header */}
        <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary mt-1">
          {tier.header}
        </h3>

        {/* Price */}
        <div className="mt-4 mb-6">
          <div className="flex items-baseline gap-3">
            <span
              className={`font-display font-extrabold text-4xl sm:text-5xl tracking-tight ${
                isPopular ? "text-accent" : "text-text-primary"
              }`}
            >
              {tier.price}
            </span>
            {tier.originalPrice && (
              <span className="text-text-secondary/50 text-lg sm:text-xl font-semibold line-through decoration-red-500/70 decoration-2">
                {tier.originalPrice}
              </span>
            )}
          </div>
          {tier.originalPrice && (
            <span className="inline-block mt-2 text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded bg-accent/10 text-accent border border-accent/20">
              Launch цена
            </span>
          )}
          {tier.priceSuffix && (
            <span className="text-text-secondary text-sm ml-1">
              {tier.priceSuffix}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className={`h-px mb-6 ${isPopular ? "bg-accent/30" : "bg-border"}`} />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {tier.features.map((f) => (
            <FeatureItem key={f} text={f} />
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-8">
          {tier.buttonVariant === "primary" && (
            <button
              onClick={() => tier.checkoutTier && onCheckout?.(tier.checkoutTier)}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-accent text-primary font-display font-bold rounded-lg px-6 py-3.5 text-sm transition-all duration-300 hover:bg-accent-light cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {tier.buttonLabel}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          )}
          {tier.buttonVariant === "secondary" && (
            <button
              onClick={() => tier.checkoutTier && onCheckout?.(tier.checkoutTier)}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 border-2 border-accent text-accent font-display font-bold rounded-lg px-6 py-3.5 text-sm transition-all duration-300 hover:bg-accent/10 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {tier.buttonLabel}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          )}
          {tier.buttonVariant === "ghost" && (
            <button
              disabled
              className="w-full inline-flex items-center justify-center gap-2 text-text-secondary font-display font-semibold rounded-lg px-6 py-3.5 text-sm border border-border/50 cursor-default opacity-60"
            >
              <Check className="w-4 h-4" />
              {tier.buttonLabel}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------- */
/*  Page                                               */
/* -------------------------------------------------- */

export default function ThankYouPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-dark" />}>
      <ThankYouPage />
    </Suspense>
  );
}

function ThankYouPage() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const email = searchParams.get("email") ?? "";
  const submissionId = searchParams.get("id") ?? "";
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  async function handleCheckout(tier: CheckoutTier) {
    if (!submissionId || checkoutLoading) return;
    setCheckoutLoading(tier);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: submissionId,
          tier,
          locale,
        }),
      });
      const json = await res.json();
      if (json.success && json.url) {
        window.location.href = json.url;
      } else {
        console.error("Checkout error:", json.error);
        setCheckoutLoading(null);
      }
    } catch (err) {
      console.error("Checkout fetch error:", err);
      setCheckoutLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-surface-dark">
      {/* ---- Minimal Navbar ---- */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-surface-dark/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-accent">CODE:</span> ABUNDANCE
          </span>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="pt-16">
        {/* ================================================
            A. Congratulations Header
            ================================================ */}
        <motion.section
          className="py-16 sm:py-24 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <GoldLabel>ПОЗДРАВЛЕНИЯ</GoldLabel>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-display font-extrabold text-3xl sm:text-[40px] sm:leading-tight text-text-primary"
            >
              Диагностиката ти е на път към теб.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-text-secondary text-base sm:text-lg"
            >
              Провери inbox-а си за{" "}
              <span className="text-accent font-medium">{email || "..."}</span>
            </motion.p>
          </div>
        </motion.section>

        {/* ================================================
            B. VSL Video Section
            ================================================ */}
        <motion.section
          className="pb-16 sm:pb-24 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              {/* Video container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-black transition-shadow duration-500 group-hover:shadow-[0_0_40px_rgba(201,168,76,0.12)]">
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-[#0a0a0a] to-black">
                  {/* Play button */}
                  <button className="relative z-10 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/10 border-2 border-accent transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110 cursor-pointer">
                    <Play
                      className="w-8 h-8 sm:w-10 sm:h-10 text-accent ml-1"
                      fill="currentColor"
                    />
                  </button>

                  {/* Subtle rings animation */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-accent/10 animate-ping [animation-duration:3s]" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-center text-sm sm:text-base text-text-secondary"
            >
              Гледай видеото за да разбереш{" "}
              <span className="text-accent font-medium">
                пълната сила на твоя код.
              </span>
            </motion.p>
          </div>
        </motion.section>

        {/* ================================================
            C. Value Ladder Pricing Section
            ================================================ */}
        <motion.section
          className="py-16 sm:py-24 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <GoldLabel>ИСКАШ ПОВЕЧЕ?</GoldLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="font-display font-bold text-2xl sm:text-4xl text-text-primary"
              >
                Избери нивото на твоя анализ
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-text-secondary max-w-xl mx-auto"
              >
                От безплатен преглед до VIP coaching — избери пътя, който
                отговаря на амбициите ти.
              </motion.p>
            </div>

            {/* Pricing grid */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
            >
              {tiers.map((tier) => (
                <PricingCard
                  key={tier.id}
                  tier={tier}
                  onCheckout={handleCheckout}
                  loading={checkoutLoading === tier.checkoutTier}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ================================================
            D. Guarantee Section
            ================================================ */}
        <motion.section
          className="py-12 sm:py-16 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 border border-accent/20">
              <Shield className="w-7 h-7 text-accent" />
            </div>

            <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary">
              30-дневна гаранция за връщане на парите
            </h3>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Ако не си доволен от анализа, връщаме 100% от сумата.
              <br />
              Без въпроси, без усложнения.
            </p>
          </motion.div>
        </motion.section>

        {/* ================================================
            E. Mini Footer
            ================================================ */}
        <footer className="border-t border-border py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-text-secondary text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} CODE: ABUNDANCE. All rights
              reserved.
            </span>
            <div className="flex items-center gap-6 text-xs sm:text-sm text-text-secondary">
              <Link
                href="/privacy"
                className="hover:text-accent transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-accent transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
