import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MapPin, 
  Briefcase, 
  Compass, 
  Heart,
  Unlock,
  Wallet,
  Grid,
  Sparkles,
  Search,
  CheckCircle,
  CreditCard,
  QrCode,
  ArrowRight
} from "lucide-react";
import { PhoneCarousel } from "@/components/ui/phone-carousel";
import { GlassButton } from "@/components/ui/glass-button";
gsap.registerPlugin(ScrollTrigger);

import discoverImg from "@/assets/discover.png";
import chooseImg from "@/assets/choose.png";
import bookAndPayImg from "@/assets/book-and-pay.png";
import checkInImg from "@/assets/check-in.png";

/* ── Panel B Data (App Experience) ── */

/* ── Panel B Data (App Experience) ── */
const flowCards = [
  { title: "DISCOVER", desc: "Find participating fitness centres near you.", icon: Search, src: discoverImg, alt: "Discover" },
  { title: "CHOOSE", desc: "Pick a gym, class, or activity that fits your day.", icon: CheckCircle, src: chooseImg, alt: "Choose" },
  { title: "BOOK & PAY", desc: "Review the details, then book your session.", icon: CreditCard, src: bookAndPayImg, alt: "Book & Pay" },
  { title: "CHECK IN", desc: "Follow the in-app check-in instructions when you arrive.", icon: QrCode, src: checkInImg, alt: "Check In" },
];

const FindFitUseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Initial scroll reveal for the section container
  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 80%" },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: sectionRef });


  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-black relative overflow-hidden text-white">
      {/* Background ambient glow removed for completely dark aesthetic */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div ref={contentRef} className="min-h-[500px]">
          {/* PANEL B: APP EXPERIENCE */}
          <div className="flex flex-col items-center text-center mt-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-[1.1] mb-4 md:mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Your Fitness Access. <br/> In Your Pocket.
              </h2>
              <p className="text-gray-400 text-base md:text-lg font-medium mb-4 md:mb-16 max-w-2xl leading-relaxed mx-auto">
                From finding a place to train to checking in at the centre, FitFare brings your fitness journey into one app.
              </p>

              {/* The Unified Interactive Stepper + Phones */}
              <div id="phone-carousel-track">
                <PhoneCarousel steps={flowCards}>
                  <div className="scale-100 md:scale-110 mt-2 hover:scale-105 active:scale-95 transition-transform duration-300">
                    <GlassButton size="lg" contentClassName="flex items-center gap-2">
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
  );
};

export default FindFitUseSection;
