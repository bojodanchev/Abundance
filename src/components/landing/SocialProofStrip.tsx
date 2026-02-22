"use client";

import { motion } from "framer-motion";
import { Dna, Star, Hash, Brain } from "lucide-react";

const METHODS = [
  { icon: Dna, label: "Human Design" },
  { icon: Star, label: "Астрология" },
  { icon: Hash, label: "Нумерология" },
  { icon: Brain, label: "Психология" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SocialProofStrip() {
  return (
    <section className="bg-white py-12 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-text-dark/60 text-sm font-body tracking-wide uppercase mb-8">
          Методологии, базирани на
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {METHODS.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 group"
            >
              <Icon className="w-6 h-6 text-text-dark/40 group-hover:text-accent transition-colors duration-300" />
              <span className="text-text-dark/70 font-display font-semibold text-base group-hover:text-text-dark transition-colors duration-300">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
