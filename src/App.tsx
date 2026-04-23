import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThrivethonPage from "./pages/Thrivethon";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import ScrollToTop from "./components/ScrollToTop";
import CareerPage from "./pages/CareerPage";
import AboutPage from "./pages/AboutPage";
import EventPage from "./pages/EventPage";
import ServicesPage from "./pages/ServicePage";
import Blog from "./pages/Blog";
import WebappDemo from "./pages/WebappDemo";
import FeatureDetailPage from "./pages/FeatureDetailPage";
import JobDetailPage from "./pages/JobDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/thrivethon" element={<ThrivethonPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/careers/:jobId" element={<JobDetailPage />} />
          <Route path="/about-FitFare" element={<AboutPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/webapp-demo" element={<WebappDemo />} />
          <Route path="/features/:slug" element={<FeatureDetailPage />} />
          <Route path="/blog/:slug" element={<Blog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
