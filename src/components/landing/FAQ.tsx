"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const QUESTIONS = [
  {
    question: "Колко време отнема диагностиката?",
    answer:
      "Около 7 минути. Диагностиката е проектирана да бъде бърза и фокусирана — без излишни въпроси. Всяка минута е инвестирана в това да ти дадем възможно най-точен анализ.",
  },
  {
    question: "Безплатна ли е?",
    answer:
      "Да, базовият анализ е напълно безплатен. Получаваш своя профилен тип, оценка в 7 ключови сфери и една ключова прозрение за всяка. За по-детайлен анализ и 90-дневен план има опция за ъпгрейд.",
  },
  {
    question: "Колко точна е AI диагностиката?",
    answer:
      "Нашата методология комбинира Human Design, астрология, нумерология и психологически модели с AI анализ. Резултатът не е магия — това е структуриран инструмент за себепознание, базиран на данните, които предоставяш, и доказани системи.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-6 bg-surface-dark">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-display font-semibold text-sm tracking-[0.25em] uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
            Често задавани въпроси
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          {QUESTIONS.map(({ question, answer }, idx) => (
            <div
              key={idx}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
              >
                <span className="font-display font-semibold text-text-primary text-base md:text-lg pr-4">
                  {question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-text-secondary font-body leading-relaxed">
                      {answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
