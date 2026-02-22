"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section
      className="py-20 md:py-28 px-6"
      style={{
        background: "linear-gradient(135deg, #C9A84C, #8B7235)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-tight mb-6">
          Готов ли си да откриеш кода си?
        </h2>
        <p className="text-primary/80 font-body text-lg mb-10 max-w-xl mx-auto">
          Започни безплатната диагностика и получи персонализиран анализ на живота си.
        </p>
        <a
          href="#diagnostic"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-base font-display font-semibold rounded-lg hover:opacity-90 transition-all duration-200 mb-4"
        >
          Започни Безплатната Диагностика
        </a>
        <p className="text-primary/60 text-sm font-body">
          Безплатно &bull; 7 минути &bull; Без ангажимент
        </p>
      </motion.div>
    </section>
  );
}
