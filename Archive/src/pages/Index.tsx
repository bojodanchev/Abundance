import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import TheLabs from "@/components/TheLabs";
import TheWhy from "@/components/TheWhy";
import AccessLevels from "@/components/AccessLevels";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import TheChaos from "@/components/TheChaos";
import SevenSteps from "@/components/SevenSteps";
import FounderStory from "@/components/FounderStory";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
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
          if (timeSinceClosed < 3600000) { // 1 hour in milliseconds
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
        <VideoSection />
        <TheLabs />
        <TheWhy />
        <AccessLevels />
        <WhoIsThisFor />
        <TheChaos />
        <SevenSteps />
        <FounderStory />
        <FAQ />
        <FinalCTA />
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
