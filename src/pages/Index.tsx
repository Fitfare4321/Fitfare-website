import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CitiesSection from "@/components/CitiesSection";
import ProgramsSection from "@/components/ProgramsSection";
import AboutSection from "@/components/AboutSection";
import PremiumFeaturesSection from "@/components/PremiumFeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";

const Index = () => {
  // When arriving from another page with a hash (e.g. /#about),
  // scroll to the target section after the page has rendered.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    // Small delay lets React finish rendering all sections
    const timer = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <CitiesSection />
      <ProgramsSection />
      <AboutSection />
      <PremiumFeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
