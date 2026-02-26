"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";

export default function PendingResults({
  submissionId,
}: {
  submissionId: string;
}) {
  const router = useRouter();
  const [dots, setDots] = useState("...");
  const pollRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // Animate dots
  useEffect(() => {
    const iv = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => clearInterval(iv);
  }, []);

  // Poll for completion then reload
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(
          `/api/submission-status?id=${submissionId}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.ready) {
          if (pollRef.current) clearInterval(pollRef.current);
          router.refresh(); // re-runs the server component, which now has the analysis
        }
      } catch {
        // retry next interval
      }
    };

    check();
    pollRef.current = setInterval(check, 3000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [submissionId, router]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <motion.span
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="inline-block text-accent text-3xl"
        >
          &#9670;
        </motion.span>
        <p className="text-white font-display font-bold text-xl">
          Генерираме твоя анализ{dots}
        </p>
        <p className="text-text-secondary text-sm">
          Това обикновено отнема 30-60 секунди.
        </p>
      </motion.div>
    </div>
  );
}
