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
import { useEffect, useState, useRef } from "react";
import { FreeAnalysisDialog } from "@/components/FreeAnalysisDialog";

const Index = () => {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercentage = (scrollPosition + windowHeight) / documentHeight;

      if (scrollPercentage > 0.4) {
        const lastClosed = localStorage.getItem("popupLastClosed");
        if (lastClosed) {
          const timeSinceClosed = Date.now() - parseInt(lastClosed);
          if (timeSinceClosed < 3600000) {
            return;
          }
        }

        setIsAnalysisOpen(true);
        hasTriggered.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
            localStorage.setItem("popupLastClosed", Date.now().toString());
          }
        }}
      />
    </div>
  );
};

export default Index;
