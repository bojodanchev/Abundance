"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  {
    id: "beginners",
    label: "Начинаещи",
    description:
      "Тепърва започваш пътя си към личностно развитие и искаш ясна отправна точка, вместо да губиш месеци в проби и грешки.",
    bullets: [
      "Получаваш ясна картина къде си в момента",
      "Разбираш кои сфери от живота ти имат най-голям потенциал",
      "Стартираш с конкретен план, а не с общи съвети",
    ],
  },
  {
    id: "experienced",
    label: "Опитни",
    description:
      "Вече си инвестирал в развитието си, но чувстваш, че нещо липсва. Имаш нужда от по-дълбок, персонализиран анализ.",
    bullets: [
      "Откриваш скрити блокажи, които ти пречат",
      "Получаваш стратегия, базирана на твоя уникален профил",
      "Оптимизираш усилията си за максимален резултат",
    ],
  },
  {
    id: "creators",
    label: "Криейтъри",
    description:
      "Създаваш съдържание, бизнес или влияние и искаш да разбереш как да монетизираш силните си страни по-ефективно.",
    bullets: [
      "Разбираш кой е твоят уникален архетип и стратегия",
      "Научаваш кога и как да действаш за максимален ефект",
      "Получаваш 90-дневен план за растеж",
    ],
  },
  {
    id: "ready",
    label: "Готови за промяна",
    description:
      "Стигнал си до точката, в която знаеш, че нещо трябва да се промени. Нужна ти е само правилната посока.",
    bullets: [
      "Трансформираш неяснотата в конкретни действия",
      "Получаваш подкрепа от AI-базиран анализ и план",
      "Започваш промяната още днес — не утре",
    ],
  },
];

export default function ForWho() {
  const [activeTab, setActiveTab] = useState("beginners");
  const active = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="for-who" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-display font-semibold text-sm tracking-[0.25em] uppercase mb-4">
            ЗА КОГО Е
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-dark">
            За теб ли е тази диагностика?
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 rounded-lg text-sm font-display font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-accent text-primary"
                  : "bg-transparent text-text-dark/60 hover:text-text-dark border border-border-light"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto bg-surface-dark rounded-2xl p-8 md:p-10 border border-border"
          >
            <p className="text-text-secondary font-body leading-relaxed mb-6">
              {active.description}
            </p>
            <ul className="space-y-3 mb-8">
              {active.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                  <span className="text-text-primary font-body">{bullet}</span>
                </li>
              ))}
            </ul>
            <a
              href="#diagnostic"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary text-sm font-display font-semibold rounded-lg hover:bg-accent-dark transition-all duration-200"
            >
              Започни Диагностиката
              <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
