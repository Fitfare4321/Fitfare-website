import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Search,
  QrCode,
  CreditCard,
} from "lucide-react";

import PageSEO from "@/components/PageSEO";
import { GlassButton } from "@/components/ui/glass-button";
import OnDemandHero from "@/components/OnDemandHero";
import { PhoneCarousel } from "@/components/ui/phone-carousel";
import { CinematicFooter } from "@/components/ui/motion-footer";

// Flow / In-App Mockup Images
import bookAndPayImg from "@/assets/book-and-pay.png";
import chooseImg from "@/assets/choose.png";
import discoverImg from "@/assets/discover.png";
import checkInImg from "@/assets/check-in.png";

/* ═══════════════════════════════════════════════════════════════════════════
   FitFare — Fitness On Demand (Compact Landing Page)
   Matches Landing Page Design System & Cinematic Footer
   ═══════════════════════════════════════════════════════════════════════════ */

// ── Fade-in animation helper ──
const FadeIn = ({
  children,
  delay = 0,
  className = "",
  direction = "up"
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const offsets = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── App Experience & Fit Credits Flow (Matching Reference Image 2) ──
const flowCards = [
  {
    title: "DISCOVER",
    desc: "Add Fit Credits — Top up your FitFare wallet in the app. Find participating fitness centres near you.",
    icon: Search,
    src: discoverImg,
    alt: "Discover",
  },
  {
    title: "CHOOSE",
    desc: "Find your activity — Choose a fitness centre and the activity you want to try across 650+ centres.",
    icon: CheckCircle,
    src: chooseImg,
    alt: "Choose",
  },
  {
    title: "BOOK & PAY",
    desc: "Book on demand — Use credits for your chosen workout. Fit Credits expire after 60 days.",
    icon: CreditCard,
    src: bookAndPayImg,
    alt: "Book & Pay",
  },
  {
    title: "CHECK IN",
    desc: "Instant QR check-in — Follow the in-app instructions when you arrive at the centre.",
    icon: QrCode,
    src: checkInImg,
    alt: "Check In",
  },
];

const CompactLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-blue-600/30 selection:text-white font-sans antialiased overflow-x-clip relative">
      <PageSEO
        title="Fitness On Demand | FitFare — Pay Only When You Train"
        description="Paying for a full month but showing up for a few days? Meet FitFare. Use prepaid Fit Credits to book individual workouts at 650+ fitness centres. Options from ₹14/day."
        canonical="https://fitfare.in/on-demand"
      />

      {/* Main page content wrapped with rounded bottom for curtain reveal footer */}
      <main className="relative z-10 w-full bg-[#060608] shadow-2xl rounded-b-[40px] border-b border-white/10 overflow-hidden">
        {/* ── Background Grid & Dynamic Glows ── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-blue-600/15 via-cyan-500/5 to-transparent blur-[140px] rounded-full" />
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-700/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 blur-[160px] rounded-full" />
        </div>

        {/* ───────────────────────────────────────────────────────────────────
            1. HERO SECTION — Notched Bento Grid (Reference Layout Matched)
            ─────────────────────────────────────────────────────────────────── */}
        <OnDemandHero />



        {/* ───────────────────────────────────────────────────────────────────
            2. HOW FIT CREDITS WORK / APP EXPERIENCE (Phone Carousel from Image 2)
            ─────────────────────────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-24 bg-black relative overflow-hidden text-white border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="min-h-[500px]">
              <div className="flex flex-col items-center text-center mt-4">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>HOW FIT CREDITS WORK</span>
                  </div>
                  <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-[1.1] mb-4 md:mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Your Fitness Access. <br /> In Your Pocket.
                  </h2>
                  <p className="text-gray-400 text-base md:text-lg font-medium mb-4 md:mb-16 max-w-2xl leading-relaxed mx-auto">
                    From finding a place to train to checking in at the centre, FitFare brings your fitness journey into one app.
                  </p>
                </FadeIn>

                {/* The Unified Interactive Stepper + Phones (Matching Image 2) */}
                <div id="phone-carousel-track" className="w-full mt-6">
                  <PhoneCarousel steps={flowCards}>
                    <div className="scale-100 md:scale-110 mt-2 hover:scale-105 active:scale-95 transition-transform duration-300 inline-block">
                      <GlassButton
                        size="lg"
                        href="#footer"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          const footerEl = document.getElementById("footer");
                          if (footerEl) {
                            footerEl.scrollIntoView({ behavior: "smooth" });
                          } else {
                            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                          }
                        }}
                        contentClassName="flex items-center gap-2"
                      >
                        <span>Get the FitFare App</span>
                        <ArrowRight size={18} className="relative z-10 text-current transition-all duration-300" />
                      </GlassButton>
                    </div>
                  </PhoneCarousel>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ───────────────────────────────────────────────────────────────────
          3. CINEMATIC FOOTER (Identical to Main Landing Page)
          ─────────────────────────────────────────────────────────────────── */}
      <div id="download" />
      <CinematicFooter />
    </div>
  );
};

export default CompactLandingPage;
