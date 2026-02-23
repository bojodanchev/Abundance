import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Diagnostic from "./pages/Diagnostic";
import VSL from "./pages/VSL";
import AbundanceLanding from "./pages/AbundanceLanding";
import { initializeTracking } from "./lib/tracking";
import { initUTMTracking } from "./lib/utm";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize tracking and UTM on app load
    initializeTracking();
    initUTMTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/archive">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diagnostic" element={<Diagnostic />} />
            <Route path="/vsl" element={<VSL />} />
            <Route path="/abundance" element={<AbundanceLanding />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
