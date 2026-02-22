"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  return (
    <section
      id="diagnostic"
      className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden"
    >
      {/* Animated gold radial gradient background */}
      <div className="absolute inset-0 bg-radial-gold opacity-60 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201, 168, 76, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Gold label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-accent font-display font-semibold text-sm tracking-[0.25em] uppercase mb-6"
        >
          ДИАГНОСТИКА
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] text-text-primary mb-6"
        >
          Открий Кода Си
          <br />
          Към Изобилието.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 font-body leading-relaxed"
        >
          7-минутна диагностика, която разкрива какво те спира
          и как да го преодолееш.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary text-base font-display font-semibold rounded-lg hover:bg-accent-dark transition-all duration-200"
          >
            Започни Диагностиката
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-accent text-accent text-base font-display font-semibold rounded-lg hover:bg-accent hover:text-primary transition-all duration-200"
          >
            Научи повече
          </a>
        </motion.div>

        {/* Social proof counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-2 text-text-secondary text-sm font-body"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span>
            Вече <span className="text-accent font-mono font-bold">1,200+</span> анализа
          </span>
        </motion.div>
      </div>
    </section>
  );
}
