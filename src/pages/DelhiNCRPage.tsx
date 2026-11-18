import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import CityHeroParallax from "@/components/CityHeroParallax";
import delhiImg from "@/assets/city-delhi.jpg";
import DelhiCentersSection from "@/components/DelhiCentersExplorer";

const faqItems = [
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

const DelhiNCRPage = () => {
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
        name: "FitFare Delhi NCR",
        description:
          "FitFare helps users book gym sessions across Delhi, Gurgaon, Noida, Ghaziabad and Faridabad without long-term memberships.",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Delhi NCR",
          addressCountry: "IN",
        },
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <PageSEO
        title="Best Gym in Delhi NCR | FitFare"
        description="Book a gym session across Delhi NCR without annual membership. Find the best workout centre near your office, home, or metro and pay only for the session you train."
        canonical="https://fitfare.in/delhi-ncr"
        jsonLd={seoJsonLd}
      />

      <Navbar />

      <main>
        {/* ═══════════════════ CINEMATIC FULL-SCREEN PARALLAX CITY HERO SECTION ═══════════════════ */}
        <CityHeroParallax
          cityName="Delhi NCR"
          tagline="The Capital of Fitness"
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

export default DelhiNCRPage;
