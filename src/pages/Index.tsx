import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import WhyFitFareSection from "@/components/WhyFitFareSection";
import FindFitUseSection from "@/components/FindFitUseSection";
import FindBookTrainSection from "@/components/FindBookTrainSection";
import PayAsYouGoSection from "@/components/PayAsYouGoSection";
import PersonalizationSection from "@/components/PersonalizationSection";
import PartnerTransitionSection from "@/components/PartnerTransitionSection";
import PartnerPropositionSection from "@/components/PartnerPropositionSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
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
      <Preloader />
      
      {/* 01. Navbar */}
      <Navbar />
      
      <main>
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

        {/* 05. FindBookTrain (4-Step Pin, Credits, Old Way vs FitFare) */}
        <FindBookTrainSection />

        {/* 06. Pay As You Go */}
        <PayAsYouGoSection />

        {/* 07. Personalization (Coming Soon) */}
        <PersonalizationSection />

        {/* 08. Partner Transition */}
        <PartnerTransitionSection />

        {/* 09. Partner Proposition */}
        <PartnerPropositionSection />

        {/* 10. FAQ */}
        <FAQSection />

        {/* 11. Final CTA */}
        <FinalCTASection />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
};

export default Index;
