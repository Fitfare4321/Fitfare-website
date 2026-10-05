import { WorksWheel } from "@/components/ui/works-wheel";
import { ArrowRight } from "lucide-react";

import gymImg from "@/assets/hero-card-gym.jpg";
import yogaImg from "@/assets/yoga.jpg";
import functionalImg from "@/assets/strength.jpg";
import groupImg from "@/assets/cardio.jpg";
import danceImg from "@/assets/zumba.jpg";
import exploreImg from "@/assets/kickboxing.jpg"; // Mock image for explore more

const activitiesData = [
  { id: 1, title: "Gyms", image: gymImg, alt: "Gyms", href: "#" },
  { id: 2, title: "Yoga", image: yogaImg, alt: "Yoga", href: "#" },
  { id: 3, title: "Functional Training", image: functionalImg, alt: "Functional Training", href: "#" },
  { id: 4, title: "Group Fitness", image: groupImg, alt: "Group Fitness", href: "#" },
  { id: 5, title: "Dance & Zumba", image: danceImg, alt: "Dance & Zumba", href: "#" },
  { id: 6, title: "Explore More", image: exploreImg, alt: "Explore More", href: "#" }
];

import { m } from "framer-motion";
import { useState, useEffect } from "react";

const ActivitiesSection = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px), (pointer: coarse)').matches : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.matchMedia('(max-width: 768px), (pointer: coarse)').matches);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <section
      id="activities"
      className="py-24 bg-black global-bg-grid relative overflow-x-clip z-10"
    >
      {/* Background ambient glow - GPU-accelerated radial gradient */}
      <div 
        className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none transform-gpu" 
        style={{ background: "radial-gradient(ellipse at center, rgba(48,92,222,0.14) 0%, rgba(48,92,222,0.03) 50%, transparent 75%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-0 md:mb-20 mt-10">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 leading-[1.1] mb-6"
          style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
        >
          One App. <br className="hidden sm:block" /> More Ways to Move.
        </m.h2>
        
        <m.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto"
        >
          Find the kind of movement that feels right today, all in one place.
        </m.p>
      </div>

      {isMobile ? (
        <div className="w-full relative z-10 pb-4 mt-12">
          {/* Subtle scroll hint text */}
          <div className="px-[9vw] mb-6 flex items-center justify-end text-white/50 text-xs font-semibold uppercase tracking-widest">
            <span className="animate-pulse">Swipe ➔</span>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 px-[10vw] pb-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {activitiesData.map(item => (
              <div 
                key={item.id} 
                className="relative shrink-0 snap-center w-[80vw] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black"
              >
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="absolute inset-0 w-full h-full object-cover opacity-90" 
                />
                
                {/* Deep dramatic gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                
                {/* Text Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-[28px] leading-tight font-black uppercase tracking-[-0.02em] mb-2 drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full relative z-10 h-[400vh]" id="wheel-scroll-track">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <WorksWheel
              items={activitiesData}
              label="Explore"
              action="View"
              className="text-white w-full h-[90vh] min-h-[400px]"
            />
          </div>
        </div>
      )}

    </section>
  );
};

export default ActivitiesSection;
