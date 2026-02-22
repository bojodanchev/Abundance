"use client";

import { motion } from "framer-motion";
import { Frown, BookOpen, Compass } from "lucide-react";

const PAIN_POINTS = [
  {
    icon: Frown,
    title: "Усещаш се заседнал",
    description:
      "Знаеш, че нещо не е наред, но не можеш да го назовеш. Всеки ден е един и същ и усещаш, че животът ти минава покрай теб.",
  },
  {
    icon: BookOpen,
    title: "Пробвал си всичко",
    description:
      "Курсове, книги, ментори — вложил си време и пари, но все още нямаш резултата, който искаш. Нищо не работи достатъчно.",
  },
  {
    icon: Compass,
    title: "Нямаш ясна посока",
    description:
      "Нямаш персонализирана карта за ТВОЯТА ситуация. Общите съвети не вършат работа, защото ти не си общ случай.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProblemSection() {
  return (
    <section id="problem" className="py-20 md:py-28 px-6 bg-surface-dark">
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
            ПРОБЛЕМЪТ
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-tight">
            Живееш в хаос и не знаеш
            <br className="hidden md:block" /> откъде да започнеш.
          </h2>
        </motion.div>

        {/* Pain point cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PAIN_POINTS.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="p-8 rounded-2xl border border-border bg-[#1A1A1A] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(201,168,76,0.06)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                {title}
              </h3>
              <p className="text-text-secondary font-body leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
