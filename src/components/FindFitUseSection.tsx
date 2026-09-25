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
gsap.registerPlugin(ScrollTrigger);

import discoverImg from "@/assets/discover.png";
import chooseImg from "@/assets/choose.png";
import bookAndPayImg from "@/assets/book-and-pay.png";
import checkInImg from "@/assets/check-in.png";

/* ── Panel B Data (App Experience) ── */

/* ── Panel B Data (App Experience) ── */
const flowCards = [
  { title: "Discover", desc: "Find the best fitness centres around your current location.", icon: Search, src: discoverImg, alt: "Discover" },
  { title: "Choose", desc: "Pick the perfect gym, class, or sport that fits your mood.", icon: CheckCircle, src: chooseImg, alt: "Choose" },
  { title: "Book & Pay", desc: "Seamlessly pay for exactly what you use. No lock-ins.", icon: CreditCard, src: bookAndPayImg, alt: "Book & Pay" },
  { title: "Check In", desc: "Scan and step right in. Your phone is your all-access pass.", icon: QrCode, src: checkInImg, alt: "Check In" },
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
    <section ref={sectionRef} className="py-24 bg-black relative overflow-hidden text-white">
      {/* Background ambient glow removed for completely dark aesthetic */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div ref={contentRef} className="min-h-[500px]">
          {/* PANEL B: APP EXPERIENCE */}
          <div className="flex flex-col items-center text-center mt-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-[1.1] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Your Fitness Access. <br/> In Your Pocket.
              </h2>
              <p className="text-gray-400 text-base md:text-lg font-medium mb-16 max-w-2xl leading-relaxed mx-auto">
                From finding a place to train to checking in at the centre, FitFare keeps the entire journey in one powerful app.
              </p>

              {/* The Unified Interactive Stepper + Phones */}
              <PhoneCarousel steps={flowCards} />

              <button className="mt-12 group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-black transition-colors duration-300">Get FitFare App</span>
                <ArrowRight size={16} className="relative z-10 text-black group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </div>

        </div>
      </div>
    </section>
  );
};

export default FindFitUseSection;
