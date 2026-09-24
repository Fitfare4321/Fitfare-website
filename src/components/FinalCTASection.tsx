import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FinalCTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(".cta-content > *", {
      scrollTrigger: { trigger: el, start: "top 75%" },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-black relative overflow-hidden text-white border-t border-gray-900">
      <div className="absolute inset-0 bg-[#305CDE]/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#305CDE]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center cta-content">
        <h2 
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Move on your terms.
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">
          Get the FitFare app and discover a new way to access fitness.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300 shadow-xl shadow-[#305CDE]/20">
            <Apple size={24} />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-black/70 font-bold leading-none mb-1">Download on the</div>
              <div className="text-lg font-bold leading-none">App Store</div>
            </div>
          </button>
          
          <button className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300 shadow-xl shadow-[#305CDE]/20">
            <Play size={24} />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-black/70 font-bold leading-none mb-1">Get it on</div>
              <div className="text-lg font-bold leading-none">Google Play</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
