import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import CityHeroParallax from "@/components/CityHeroParallax";
import delhiImg from "@/assets/city-delhi.jpg";
import DelhiCentersSection from "@/components/DelhiCentersExplorer";

const faqItems = [
  {
    question: "Why should I use FitFare instead of taking a gym membership in South Delhi?",
    answer:
      "Most South Delhi gyms push three-month, six-month or annual plans with heavy joining fees. If your work hours change, you travel, or you take a break, that money is locked. With FitFare, you only pay for the individual sessions you book, with zero commitment and full flexibility to train anywhere.",
  },
  {
    question: "Which areas in South Delhi are covered?",
    answer:
      "FitFare has partner gyms across Saket, Green Park, Hauz Khas, Greater Kailash (GK 1 & 2), Defence Colony, Vasant Kunj, Malviya Nagar, Lajpat Nagar and surrounding neighbourhoods.",
  },
  {
    question: "Do South Delhi partner gyms charge extra on arrival?",
    answer:
      "No. The rate displayed when you book is the final amount. Front desk teams check your booking reference digitally and let you in without additional walk-in or locker charges.",
  },
  {
    question: "Can I book high-end or boutique gyms in South Delhi?",
    answer:
      "Yes. Our South Delhi partner list includes strength training centres, functional fitness spaces, boutique cross-training facilities and premium neighbourhood gyms.",
  },
  {
    question: "Is there a limit on how many times I can book?",
    answer:
      "No. You can book a single session, train multiple times a week at the same centre, or alternate between different gyms across South Delhi as your schedule demands.",
  },
];

const SouthDelhiPage = () => {
  const seoJsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "Place",
        name: "FitFare South Delhi",
        description:
          "FitFare helps users book single gym sessions across South Delhi without annual memberships or joining fees.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "South Delhi",
          addressRegion: "Delhi",
          addressCountry: "IN",
        },
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <PageSEO
        title="Best Gym in South Delhi Without Joining Fee | FitFare"
        description="Book a gym session in South Delhi without a joining fee or annual contract. Find the best gym by area and pay only for the session you train."
        canonical="https://fitfare.in/south-delhi"
        jsonLd={seoJsonLd}
      />

      <Navbar />

      <main>
        {/* ═══════════════════ CINEMATIC FULL-SCREEN PARALLAX CITY HERO SECTION ═══════════════════ */}
        <CityHeroParallax
          cityName="South Delhi"
          tagline="Premium Fitness Hubs"
          image={delhiImg}
          accentColor="#F59E0B"
        />

        {/* ═══════════════════ EXPLORE PARTNER FITNESS CENTRES IN DELHI ═══════════════════ */}
        <DelhiCentersSection />
      </main>

      <Footer />
    </div>
  );
};

export default SouthDelhiPage;
