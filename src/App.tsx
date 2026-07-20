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
import OwnerDashboard from "./pages/ownerpages/OwnerDashboard";
import OwnerServices from "./pages/ownerpages/OwnerServices";
import OwnerInbox from "./pages/ownerpages/OwnerInbox";
import OwnerOrders from "./pages/ownerpages/OwnerOrders";
import OwnerOrderDetail from "./pages/ownerpages/OwnerOrderDetail";
import OwnerBillings from "./pages/ownerpages/OwnerBillings";
import OwnerPricing from "./pages/ownerpages/OwnerPricing";
import OwnerTeam from "./pages/ownerpages/OwnerTeam";
import OwnerReviews from "./pages/ownerpages/OwnerReviews";
import OwnerProfile from "./pages/ownerpages/OwnerProfile";
import OwnerGallery from "./pages/ownerpages/OwnerGallery";

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
          {/* Owner Dashboard Routes */}
          <Route path="/owner-access" element={<OwnerDashboard />} />
          <Route path="/owner-access/services" element={<OwnerServices />} />
          <Route path="/owner-access/inbox" element={<OwnerInbox />} />
          <Route path="/owner-access/orders" element={<OwnerOrders />} />
          <Route path="/owner-access/orders/:id" element={<OwnerOrderDetail />} />
          <Route path="/owner-access/billings" element={<OwnerBillings />} />
          <Route path="/owner-access/pricing" element={<OwnerPricing />} />
          <Route path="/owner-access/team" element={<OwnerTeam />} />
          <Route path="/owner-access/reviews" element={<OwnerReviews />} />
          <Route path="/owner-access/profile" element={<OwnerProfile />} />
          <Route path="/owner-access/gallery" element={<OwnerGallery />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
