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
    question: "What is FitFare?",
    answer:
      "FitFare is a flexible fitness platform that lets you discover and access partnered gyms and fitness centres without committing to a traditional long-term membership. Find a centre that suits you, book your workout, and pay based on the fitness services you actually use.",
  },
  {
    question: "How does FitFare work?",
    answer:
      "Simply create your FitFare account, explore available fitness centres near you, choose the service or session you want, complete your booking, and check in at the centre using FitFare. Your bookings and visits can all be managed through the app.",
  },
  {
    question: "Do I need to buy a monthly or yearly gym membership?",
    answer:
      "No. FitFare is built around flexibility rather than long-term commitments. You can access participating fitness centres without locking yourself into a conventional monthly or annual gym membership.",
  },
  {
    question: "Can I use different gyms with FitFare?",
    answer:
      "Yes. FitFare is designed to give you access to multiple partnered fitness centres instead of restricting you to one location. This makes it especially useful when your routine, workplace, home location, or travel schedule changes.",
  },
  {
    question: "What are Fit Credits?",
    answer:
      "Fit Credits are prepaid credits that can be used to book eligible physical fitness services at FitFare partner gyms and studios. Your available balance and transactions can be managed directly through your FitFare account.",
  },
  {
    question: "How do I check in at a fitness centre?",
    answer:
      "Once you arrive at the centre for your booking, you can use the FitFare app to complete the QR-based check-in process. Your visit is then recorded digitally, making the experience simple for both you and the fitness centre.",
  },
  {
    question: "What types of fitness activities can I find on FitFare?",
    answer:
      "Depending on availability in your location, FitFare can help you discover different fitness experiences, including gyms, strength training, cardio, yoga, meditation, calisthenics, kickboxing, Zumba and other activities offered by participating centres.",
  },
  {
    question: "Can I find fitness centres near my location?",
    answer:
      "Yes. With your permission, FitFare can use your location while you’re using the app to show nearby fitness centres and their distance from you. Location access is optional, so you can still make bookings without enabling it.",
  },
  {
    question: "Is FitFare suitable for people with irregular schedules or frequent travel?",
    answer:
      "Yes. FitFare is designed for people whose fitness routine doesn’t always fit a fixed membership—whether because of work, travel, college, changing schedules, or simply wanting the freedom to train at different locations.",
  },
  {
    question: "Why should I use FitFare instead of a traditional gym membership?",
    answer:
      "A traditional membership usually ties you to one centre and a fixed membership period. FitFare is built around choice and actual usage: discover different fitness centres, book according to your schedule, access multiple locations, and avoid being locked into a long-term membership you may not fully use.",
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
