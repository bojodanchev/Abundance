import type { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBg = locale === "bg";

  return {
    title: isBg ? "Резултати — Твоят Профил" : "Results — Your Profile",
    description: isBg
      ? "Преглед на твоя персонализиран анализ — Human Design, нумерология и астрология."
      : "View your personalized analysis — Human Design, numerology, and astrology.",
    robots: { index: false, follow: false },
  };
}

export default function ResultsLayout({ children }: { children: ReactNode }) {
  return children;
}
