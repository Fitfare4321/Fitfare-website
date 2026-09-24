import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import aboutBg from "@/assets/m.jpg"; // Using existing image for background
import strengthImg from "@/assets/strength.jpg"; // Small image for the card

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Main Card Entrance
    gsap.from(".about-card", {
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out"
    });

    // Content Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-card",
        start: "top 60%",
      }
    });

    tl.from(".about-tag", {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".about-title", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(".about-desc", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(".about-btn", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(".about-floating-card", {
      opacity: 0,
      scale: 0.9,
      x: 20,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.4");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-white dark:bg-[#0a0f1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Bento Card */}
        <div 
          className="about-card relative w-full min-h-[500px] rounded-[3rem] overflow-hidden"
        >
          {/* Background Image */}
          <img 
            src={aboutBg} 
            alt="Motivation" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          <div className="relative h-full flex flex-col md:flex-row items-center justify-between p-10 md:p-16 lg:p-24">
            
            {/* Left Content */}
            <div className="max-w-xl mb-12 md:mb-0">
              <div 
                className="about-tag flex items-center gap-2 mb-6"
              >
                <div className="w-8 h-px bg-white/50" />
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                  Motivation
                </span>
              </div>

              <h2 
                className="about-title text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.05] mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Because Every <br /> Goal Matters to Us
              </h2>

              <p 
                className="about-desc text-white/70 text-sm md:text-base font-medium max-w-md mb-10"
              >
                An expert-crafted fitness framework built to adapt to your schedule and improve along with your results.
              </p>

              <button 
                className="about-btn bg-white text-black px-8 py-3 rounded-full text-sm font-bold flex items-center gap-3 hover:bg-gray-100 transition-colors"
              >
                View Plans
                <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center">
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>

            {/* Right Floating Card */}
            <div 
              className="about-floating-card w-full max-w-[320px] bg-[#305CDE] rounded-[2rem] p-4 shadow-2xl relative"
            >
              <div className="relative rounded-2xl overflow-hidden mb-4">
                <img src={strengthImg} alt="Strength" className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3 bg-white text-[#305CDE] text-[10px] font-bold px-3 py-1 rounded-full">
                  Included
                </div>
              </div>
              
              <div className="px-2 pb-2">
                <h4 className="font-bold text-white text-lg mb-1">Strength Training</h4>
                <p className="text-xs text-white/70 font-medium mb-4">Personalize your Daily Activity.</p>
                
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle2 size={16} className="text-white" />
                  <span className="text-xs font-bold text-white">1.2M+ ACTIVE USERS</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Explore plan</span>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#305CDE] shadow-sm">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;