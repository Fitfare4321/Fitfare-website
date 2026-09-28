import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import WhyFitFareSection from "@/components/WhyFitFareSection";
import FindFitUseSection from "@/components/FindFitUseSection";
import FindBookTrainSection from "@/components/FindBookTrainSection";
import PersonalizationSection from "@/components/PersonalizationSection";
import PartnerTransitionSection from "@/components/PartnerTransitionSection";
import FAQSection from "@/components/FAQSection";
import { CinematicFooter } from "@/components/ui/motion-footer";
import PageSEO from "@/components/PageSEO";

const HOMEPAGE_TITLE = "FitFare | Wellbeing, Rebuilt for Fitness";
const HOMEPAGE_DESCRIPTION =
  "Find gyms and fitness centres with pay-per-session, pay-per-use, and flexible memberships. Book instantly and work out on your schedule.";
const HOMEPAGE_CANONICAL = "https://fitfare.in/";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FitFare",
  url: "https://fitfare.in/",
  logo: "https://fitfare.in/logo.png",
  email: "info@fitfare.in",
  telephone: "+91 7666400518",
  sameAs: [
    "https://www.instagram.com/fitfare.official/",
    "https://www.linkedin.com/company/firfare/",
    "https://x.com/fit_fare22291",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "WeWork Atrium Place, 6th Floor, Tower 3, Vanijya Nikunj, Phase V, Udyog Vihar",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122006",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: "+91 7666400518",
    email: "info@fitfare.in",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

const Index = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "auto" });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1c]">
      <PageSEO
        title={HOMEPAGE_TITLE}
        description={HOMEPAGE_DESCRIPTION}
        canonical={HOMEPAGE_CANONICAL}
        jsonLd={[organizationSchema]}
      />
      
      {/* 01. Navbar */}
      <Navbar />
      
      <main className="relative z-10 w-full bg-white dark:bg-[#0a0f1c] shadow-2xl rounded-b-[40px] border-b border-black/10 dark:border-white/10">
        <div className="relative z-0">
          {/* 02. Hero */}
          <HeroSection />

          {/* 03. Activities */}
          <ActivitiesSection />
        </div>

        {/* 04. Why FitFare */}
        <WhyFitFareSection />

        {/* 05. FindFitUse (Nearby Discovery, App Experience) */}
        <FindFitUseSection />



        {/* 07. Personalization (Coming Soon) */}
        <PersonalizationSection />

        {/* 08. Partner Section (Transition + Proposition Merged) */}
        <PartnerTransitionSection />

        {/* 09. FAQ */}
        <FAQSection />
      </main>

      {/* 12. Cinematic Footer */}
      <CinematicFooter />
    </div>
  );
};

export default Index;
