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
  return (
    <div className="min-h-screen bg-background text-foreground">
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
