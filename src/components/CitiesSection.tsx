import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ChevronRight } from "lucide-react";
import guyImg from "@/assets/m1.jpg"; // Mock image for the right card

gsap.registerPlugin(ScrollTrigger);

const CitiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(".city-card", {
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-12 bg-white dark:bg-[#0a0f1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Left: Lime Green Pricing Card */}
          <div 
            className="city-card bg-[#305CDE] rounded-[2.5rem] p-8 md:p-12 relative flex flex-col justify-between"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Single Session
              </h3>
              
              <ul className="space-y-3 mb-12">
                {[
                  "All Club Access",
                  "No commitments",
                  "Cancel Anytime"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium text-sm">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <Check size={12} className="text-[#305CDE]" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 flex items-center justify-between relative shadow-sm">
              <div className="absolute -top-4 right-4 bg-orange-400 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>
              
              <div className="flex items-baseline gap-1 pl-4">
                <span className="text-3xl font-bold text-black dark:text-white">$39</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">/ Session</span>
              </div>
              
              <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Book Now
                <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center ml-2">
                  <ChevronRight size={14} />
                </div>
              </button>
            </div>
          </div>

          {/* Right: Image Card */}
          <div 
            className="city-card rounded-[2.5rem] overflow-hidden relative min-h-[400px]"
          >
            <img src={guyImg} alt="Training" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 border border-white/50 dark:border-slate-800">
                <h4 className="font-bold text-black dark:text-white text-lg mb-1">Whole-Body Strength Training</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Training • Mindfulness • Expert Instructors</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CitiesSection;