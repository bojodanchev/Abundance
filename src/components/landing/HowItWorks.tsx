"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Диагностика",
    description: "Попълни 7-минутната диагностика за живота си в 7 ключови сфери. Честно и бързо.",
  },
  {
    number: "02",
    title: "AI Анализ",
    description:
      "Нашият AI създава твоя уникален профил, комбинирайки Human Design, астрология и нумерология.",
  },
  {
    number: "03",
    title: "Твоят План",
    description:
      "Получаваш персонализиран 90-дневен план с конкретни стъпки, базирани на твоите силни страни.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 bg-surface-dark">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-display font-semibold text-sm tracking-[0.25em] uppercase mb-4">
            КАК РАБОТИ
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary">
            3 Стъпки Към Яснота
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Gold connecting line (desktop) */}
          <div className="hidden md:block absolute left-[39px] top-8 bottom-8 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent" />

          <div className="flex flex-col gap-12 md:gap-16">
            {STEPS.map(({ number, title, description }, idx) => (
              <motion.div
                key={number}
                variants={stepVariants}
                className="flex items-start gap-6 md:gap-8"
              >
                {/* Step number */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="font-mono text-2xl font-bold text-accent">
                      {number}
                    </span>
                  </div>
                  {/* Glow dot on the line (desktop) */}
                  {idx < STEPS.length - 1 && (
                    <div className="hidden md:block absolute -bottom-10 left-[39px] w-1.5 h-1.5 rounded-full bg-accent/60" />
                  )}
                </div>

                {/* Step content */}
                <div className="pt-2">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-text-primary mb-2">
                    {title}
                  </h3>
                  <p className="text-text-secondary font-body leading-relaxed max-w-lg">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
