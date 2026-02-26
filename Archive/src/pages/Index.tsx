import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TheLabs from "@/components/TheLabs";
import Philosophy from "@/components/Philosophy";
import AccessLevels from "@/components/AccessLevels";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import DreamToReality from "@/components/DreamToReality";
import SevenSteps from "@/components/SevenSteps";
import FounderStory from "@/components/FounderStory";
import ModulesAccordion from "@/components/ModulesAccordion";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Testimonials from "@/components/Testimonials";
import PlatformCommunity from "@/components/PlatformCommunity";
import { TelegramChat } from "@/components/TelegramChat";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { useEffect, useState } from "react";
import { FreeAnalysisDialog } from "@/components/FreeAnalysisDialog";

const Index = () => {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  useEffect(() => {
    // Max 2 popups per user ever
    const popupCount = parseInt(localStorage.getItem("popupShownCount") ?? "0", 10);
    if (popupCount >= 2) return;

    const timer = setTimeout(() => {
      setIsAnalysisOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TheLabs />
        <Philosophy />
        <AccessLevels />
        <WhoIsThisFor />
        <DreamToReality />
        <SevenSteps />
        <FounderStory />
        <ModulesAccordion />
        <FAQ />
        <FinalCTA />
        <Testimonials />
        <PlatformCommunity />
        <TelegramChat />
      </main>
      <Footer />
      <CookieConsent />
      <FreeAnalysisDialog
        isOpen={isAnalysisOpen}
        onOpenChange={(open) => {
          setIsAnalysisOpen(open);
          if (!open) {
            const count = parseInt(localStorage.getItem("popupShownCount") ?? "0", 10);
            localStorage.setItem("popupShownCount", String(count + 1));
          }
        }}
      />
    </div>
  );
};

export default Index;
