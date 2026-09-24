import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import mImg from "@/assets/m3.jpg"; // User imagery
import gymOwnerImg from "@/assets/strength.jpg"; // Centre imagery

gsap.registerPlugin(ScrollTrigger);

const PartnerTransitionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(".transition-header", {
      scrollTrigger: { trigger: ".transition-header", start: "top 85%" },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.from(".split-user", {
      scrollTrigger: { trigger: ".transition-split", start: "top 80%" },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".split-partner", {
      scrollTrigger: { trigger: ".transition-split", start: "top 80%" },
      opacity: 0,
      x: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="partners" className="py-24 bg-black relative overflow-hidden text-white">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#305CDE]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="transition-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Built for People Who Train. <br />
            <span className="text-[#305CDE]">And Places That Make It Possible.</span>
          </h2>
        </div>

        {/* Dramatic Split */}
        <div className="transition-split grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_rgba(48,92,222,0.15)] h-auto lg:h-[600px] border border-gray-800">
          
          {/* User Side */}
          <div className="split-user group relative min-h-[400px] lg:min-h-full cursor-pointer overflow-hidden">
            <img src={mImg} alt="Fitness User" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
            
            <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-4 block">For Users</span>
              
              <ul className="space-y-4 mb-8">
                <li className="text-xl md:text-2xl font-bold text-white tracking-tight">Discover fitness.</li>
                <li className="text-xl md:text-2xl font-bold text-white tracking-tight">Book flexibly.</li>
                <li className="text-xl md:text-2xl font-bold text-white tracking-tight">Check in simply.</li>
              </ul>

              <button className="inline-flex items-center gap-3 text-white font-bold group-hover:text-[#305CDE] transition-colors">
                Explore FitFare <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>

          {/* Partner Side */}
          <div className="split-partner group relative min-h-[400px] lg:min-h-full cursor-pointer overflow-hidden">
            <img src={gymOwnerImg} alt="Fitness Centre" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gray-900/80 mix-blend-multiply transition-colors duration-500" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            
            <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#60a5fa] mb-4 block">For Fitness Centres</span>
              
              <ul className="space-y-4 mb-8">
                <li className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">Get discovered by FitFare users.</li>
                <li className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">Manage FitFare bookings and attendance.</li>
                <li className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">Use the partner experience to stay organized.</li>
              </ul>

              <button className="inline-flex items-center gap-3 text-white font-bold group-hover:text-[#60a5fa] transition-colors">
                Partner With FitFare <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnerTransitionSection;
