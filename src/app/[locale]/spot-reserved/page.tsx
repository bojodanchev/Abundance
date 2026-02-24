"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Check, Mail, Clock, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function SpotReservedContent() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const email = searchParams.get("email") ?? "";
  const isBg = locale !== "en";

  const steps = isBg
    ? [
        {
          icon: Check,
          title: "Данните ти са запазени",
          desc: "Цялата информация от диагностиката е записана и готова за обработка.",
        },
        {
          icon: Clock,
          title: "AI анализът ти се подготвя",
          desc: "Нашият AI агент ще обработи твоите данни и ще създаде персонализиран профил с Human Design, нумерология и астрология.",
        },
        {
          icon: Mail,
          title: "Ще получиш всичко по имейл",
          desc: "Персонализираната ти Пътна Карта 2.0 ще бъде изпратена директно на имейла ти веднага щом е готова.",
        },
      ]
    : [
        {
          icon: Check,
          title: "Your data is saved",
          desc: "All information from your diagnostic has been recorded and is ready for processing.",
        },
        {
          icon: Clock,
          title: "Your AI analysis is being prepared",
          desc: "Our AI agent will process your data and create a personalized profile with Human Design, numerology, and astrology.",
        },
        {
          icon: Mail,
          title: "You'll receive everything by email",
          desc: "Your personalized Roadmap 2.0 will be sent directly to your email as soon as it's ready.",
        },
      ];

  return (
    <main className="min-h-screen bg-surface-dark">
      {/* Minimal Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-surface-dark/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-lg tracking-tight">
            <span className="text-accent">CODE:</span> ABUNDANCE
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero section */}
        <motion.section
          className="py-16 sm:py-24 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <div className="max-w-2xl mx-auto text-center space-y-6">
            {/* Animated checkmark */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center"
                >
                  <Check className="w-10 h-10 sm:w-12 sm:h-12 text-accent" strokeWidth={3} />
                </motion.div>
                {/* Subtle ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-accent"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <p className="text-accent font-mono text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
                {isBg ? "МЯСТОТО ТИ Е ЗАПАЗЕНО" : "YOUR SPOT IS RESERVED"}
              </p>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-display font-extrabold text-3xl sm:text-[42px] sm:leading-tight text-text-primary"
            >
              {isBg
                ? "Ти си сред първите!"
                : "You're among the first!"}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-text-secondary text-base sm:text-lg max-w-lg mx-auto"
            >
              {isBg
                ? "Успешно запази мястото си за ранен достъп. Ще получиш персонализирания си анализ веднага щом стартираме."
                : "You've successfully reserved your early access spot. You'll receive your personalized analysis as soon as we launch."}
            </motion.p>

            {email && (
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2.5"
              >
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium text-sm">{email}</span>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Steps section */}
        <motion.section
          className="pb-16 sm:pb-24 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <div className="max-w-2xl mx-auto space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="flex gap-4 p-5 rounded-xl border border-border bg-[#1A1A1A]"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary text-sm sm:text-base">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Early access badge */}
        <motion.section
          className="pb-16 sm:pb-24 px-6"
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
              <Sparkles className="w-7 h-7 text-accent" />
            </div>

            <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary">
              {isBg
                ? "Като ранен потребител получаваш приоритет"
                : "As an early user you get priority"}
            </h3>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              {isBg
                ? "Твоят анализ ще бъде обработен с приоритет и ще получиш допълнителни бонуси, достъпни само за първите потребители."
                : "Your analysis will be processed with priority and you'll receive additional bonuses available only to first users."}
            </p>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-text-secondary text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} CODE: ABUNDANCE. All rights reserved.
            </span>
            <div className="flex items-center gap-6 text-xs sm:text-sm text-text-secondary">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default function SpotReservedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-dark" />}>
      <SpotReservedContent />
    </Suspense>
  );
}
