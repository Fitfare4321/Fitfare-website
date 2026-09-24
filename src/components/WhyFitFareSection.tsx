import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Unlock, Wallet, Grid, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const whyCards = [
  { title: "No Long-Term Lock-In", icon: Unlock, delay: 0 },
  { title: "Pay for What You Use", icon: Wallet, delay: 0.1 },
  { title: "More Choice", icon: Grid, delay: 0.05 },
  { title: "One Experience", icon: Sparkles, delay: 0.15 },
];

const WhyFitFareSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      }
    });

    tl.from(".why-fitfare-title", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out"
    })
    .fromTo(".why-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      },
      "-=0.6" // start slightly before the title finishes
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-black relative overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#305CDE]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          <div className="why-fitfare-title text-center max-w-2xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Fitness Should Fit Your Life.
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium">
              Your schedule changes. Your location changes. Your workout might change too. FitFare gives you a more flexible way to keep moving.
            </p>
          </div>

          {/* Asymmetric Grid */}
          <div className="why-card-container grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {whyCards.map((card, i) => (
              <div 
                key={card.title} 
                className={`why-card group bg-gray-900/60 p-8 rounded-[2rem] border border-gray-800 hover:border-[#305CDE]/50 hover:shadow-[0_0_30px_rgba(48,92,222,0.15)] transition-colors transition-shadow duration-300 ${i % 2 !== 0 ? 'md:mt-8' : ''}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#305CDE]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#305CDE]/20 transition-all duration-300">
                  <card.icon size={24} className="text-[#305CDE]" />
                </div>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFitFareSection;
