import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProofStrip from "@/components/landing/SocialProofStrip";
import ProblemSection from "@/components/landing/ProblemSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ForWho from "@/components/landing/ForWho";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBg = locale === "bg";

  return {
    title: isBg
      ? "CODE: ABUNDANCE — Открий Кода Си Към Изобилието"
      : "CODE: ABUNDANCE — Crack Your Abundance Code",
    description: isBg
      ? "7-минутна AI диагностика базирана на Human Design, астрология и нумерология. Разкрий какво те спира и получи персонализиран план."
      : "A 7-minute AI diagnostic based on Human Design, astrology, and numerology. Discover what's blocking you and get a personalized plan.",
    openGraph: {
      title: isBg
        ? "CODE: ABUNDANCE — Открий Кода Си Към Изобилието"
        : "CODE: ABUNDANCE — Crack Your Abundance Code",
      description: isBg
        ? "Персонализирана AI диагностика, която разкрива твоя уникален код към изобилието."
        : "A personalized AI diagnostic that reveals your unique abundance code.",
    },
  };
}

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProofStrip />
      <ProblemSection />
      <HowItWorks />
      <ForWho />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
