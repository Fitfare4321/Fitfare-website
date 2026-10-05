import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ShapeBlur from "./ui/ShapeBlur";
import { GlassButton, glassButtonStyles } from "@/components/ui/glass-button";

import img1 from "@/assets/bento_get_discovered.png";
import img2 from "@/assets/bento_manage_bookings.png";
import img3 from "@/assets/bento_qr_attendance.png";
import img4 from "@/assets/bento_no_commission.png";

gsap.registerPlugin(ScrollTrigger);

const PartnerTransitionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(".bento-header", {
      scrollTrigger: { trigger: ".bento-header", start: "top 85%" },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.from(".bento-card", {
      scrollTrigger: { trigger: ".bento-grid", start: "top 80%" },
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="partners" className="py-24 bg-black global-bg-grid relative overflow-hidden text-white">
      {/* Background Glow */}
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-[#305CDE]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Partner Proposition Section (Merged) */}
        <div>
          <div className="bento-header text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 max-w-4xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Put your fitness centre in front of more people ready to train.
            </h3>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              FitFare helps participating fitness centres become discoverable to people looking for flexible ways to train.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="w-full max-w-[1200px] mx-auto mb-24 mt-8 px-4 md:px-8">
            <div className="bento-grid grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-6 md:h-[650px]">
              {[
                { 
                  title: "Get Discovered", 
                  desc: "Appear in FitFare when people are looking for a place to train.", 
                  img: img1,
                  className: "col-span-2 md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-0",
                  titleClass: "text-2xl md:text-3xl",
                  descClass: "text-sm md:text-base"
                },
                { 
                  title: "Manage Bookings", 
                  desc: "View and manage FitFare bookings in one place.", 
                  img: img2,
                  className: "col-span-2 md:col-span-2 md:row-span-1 min-h-[220px] md:min-h-0",
                  titleClass: "text-2xl md:text-3xl",
                  descClass: "text-sm md:text-base"
                },
                { 
                  title: "QR Attendance", 
                  desc: "Verify check-ins instantly with integrated QR codes.", 
                  img: img3,
                  className: "col-span-1 md:col-span-1 md:row-span-1 min-h-[220px] md:min-h-0",
                  titleClass: "text-lg md:text-3xl",
                  descClass: "text-xs md:text-base"
                },
                { 
                  title: "No Commission", 
                  desc: "Keep 100% of what you earn on every FitFare session.", 
                  img: img4,
                  className: "col-span-1 md:col-span-1 md:row-span-1 min-h-[220px] md:min-h-0",
                  titleClass: "text-lg md:text-3xl",
                  descClass: "text-xs md:text-base"
                }
              ].map((prop, i) => (
                <div 
                  key={i} 
                  className={`bento-card group relative rounded-[1.5rem] md:rounded-[2rem] border border-white/10 hover:border-white/30 overflow-hidden flex flex-col justify-end p-5 md:p-8 transition-[border-color,box-shadow] duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] ${prop.className}`}
                >
                  <img src={prop.img} alt={prop.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 -z-20" />
                  
                  <ShapeBlur 
                    variation={0} 
                    pixelRatioProp={window.devicePixelRatio || 1}
                    shapeSize={0.99}
                    roundness={0.1}
                    borderSize={0.02}
                    circleSize={0.8}
                    circleEdge={1}
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
                  />

                  {/* Smooth Full-Card Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-500 group-hover:opacity-90 pointer-events-none -z-10"></div>
                  
                  <div className="z-10 mt-auto relative transform transition-all duration-500 group-hover:-translate-y-2">
                    <h4 className={`${prop.titleClass} font-extrabold text-white mb-1 md:mb-2 leading-tight drop-shadow-md`}>{prop.title}</h4>
                    <p className={`text-white/70 group-hover:text-white/100 transition-colors duration-500 font-medium leading-snug max-w-sm drop-shadow-md ${prop.descClass}`}>{prop.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center flex justify-center mt-2 hover:scale-105 active:scale-95 transition-transform duration-300">
            <Link to="/partner-form">
              <style>{glassButtonStyles}</style>
              <GlassButton size="lg" contentClassName="flex items-center gap-2">
                <span>Become a FitFare Partner</span>
                <ArrowRight size={18} className="relative z-10 text-current transition-all duration-300 group-hover:translate-x-1" />
              </GlassButton>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnerTransitionSection;
