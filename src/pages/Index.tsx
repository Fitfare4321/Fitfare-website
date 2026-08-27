import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CitiesSection from "@/components/CitiesSection";
import ProgramsSection from "@/components/ProgramsSection";
import AboutSection from "@/components/AboutSection";
import InnovationArsenalSection from "@/components/InnovationArsenalSection";
import PremiumFeaturesSection from "@/components/PremiumFeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import PageSEO from "@/components/PageSEO";

const HOMEPAGE_TITLE = "Gym and Fitness Centre with Flexible Membership | FitFare";
const HOMEPAGE_DESCRIPTION =
  "Find gyms and fitness centres with pay-per-session, pay-per-use, and flexible memberships. Book instantly and work out on your schedule.";
const HOMEPAGE_CANONICAL = "https://fitfare.in/";

const homepageFaqs = [
  {
    question: "How does the AI-powered workout system work?",
    answer:
      "Our AI analyzes your fitness level, goals, available equipment, time constraints, and progress to create personalized workout plans. It continuously adapts based on your performance and feedback.",
  },
  {
    question: "Can I use FitFare without any equipment?",
    answer:
      "Absolutely! FitFare offers bodyweight workout programs that require no equipment. You can also specify the equipment you have, and the AI will customize workouts accordingly.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! All plans include a 7-day free trial so you can explore the features and see if FitFare is right for you.",
  },
  {
    question: "Do you offer nutrition guidance?",
    answer:
      "Yes. Pro and Elite plans include personalized nutrition recommendations, meal planning support, and macro tracking to complement your fitness routine.",
  },
  {
    question: "Is FitFare suitable for beginners?",
    answer:
      "Definitely! FitFare is designed for all fitness levels, and the AI creates beginner-friendly progressions that scale as you improve.",
  },
];

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const Index = () => {
  // When arriving from another page with a hash (e.g. /#about),
  // scroll to the target section after the page has rendered.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    // Small delay lets React finish rendering all sections
    const timer = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "auto" });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>
      <PageSEO
        title={HOMEPAGE_TITLE}
        description={HOMEPAGE_DESCRIPTION}
        canonical={HOMEPAGE_CANONICAL}
        jsonLd={[organizationSchema, faqSchema]}
      />
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <ProgramsSection />
      <CitiesSection />
      <InnovationArsenalSection />
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
