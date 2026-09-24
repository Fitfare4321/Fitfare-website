import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ArrowUpRight, Play } from "lucide-react";
import mindBodyImg from "@/assets/m2.jpg"; // Mock image for the hover state

gsap.registerPlugin(Flip);

const programs = [
  { id: "001", title: "Fat Loss", subtitle: "Cardiovascular • Conditioning • High Intensity" },
  { id: "002", title: "Strength", subtitle: "Weight training with expert instructions" },
  { id: "003", title: "Mind & Body", subtitle: "Yoga, pilates, and meditation sessions" },
  { id: "004", title: "Recovery", subtitle: "Mobility, stretching, and injury prevention" },
  { id: "005", title: "Athlete Mode", subtitle: "Sports conditioning and performance enhancement" },
];

const InnovationArsenalSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(2); // Default to Mind & Body
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Flip animation for the active background
  useLayoutEffect(() => {
    const state = Flip.getState(".active-bg-pill");
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: "power3.out",
        absolute: true,
      });
    });
  }, [hoveredIndex]);

  // Entrance animation for the floating image
  useLayoutEffect(() => {
    if (hoveredIndex !== null && imageRefs.current[hoveredIndex]) {
      const imgContainer = imageRefs.current[hoveredIndex];
      gsap.fromTo(imgContainer, 
        { opacity: 0, scale: 0.8, rotation: -5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [hoveredIndex]);

  return (
    <section className="py-12 bg-white dark:bg-[#0a0f1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#111827] dark:bg-slate-800/80 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Featured Fitness Programs
            </h2>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#305CDE]" />
              Through 10,000+ Coaching
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col relative z-10">
            {programs.map((program, i) => {
              const isHovered = hoveredIndex === i;
              
              return (
                <div
                  key={program.id}
                  onMouseEnter={() => setHoveredIndex(i)}
                  className={`group relative flex items-center justify-between py-6 md:py-8 border-t transition-all duration-500 cursor-pointer ${
                    isHovered ? "border-transparent" : "border-gray-800"
                  }`}
                >
                  {/* Active White Background */}
                  {isHovered && (
                    <div
                      data-flip-id="activeProgramBg"
                      className="active-bg-pill absolute inset-0 bg-white dark:bg-slate-700 rounded-[2rem] -z-10"
                    />
                  )}

                  <div className="flex items-center gap-6 md:gap-12 pl-4 md:pl-8">
                    <span className={`text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border transition-colors ${
                      isHovered ? "border-gray-200 dark:border-gray-500 text-gray-500 dark:text-gray-300" : "border-gray-800 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                    }`}>
                      {program.id}
                    </span>
                    
                    <div>
                      <h4 className={`text-xl md:text-2xl font-bold mb-1 transition-colors ${
                        isHovered ? "text-black dark:text-white" : "text-white"
                      }`}>
                        {program.title}
                      </h4>
                      <p className={`text-xs md:text-sm transition-colors ${
                        isHovered ? "text-gray-500 dark:text-gray-300 font-medium" : "text-gray-400 dark:text-gray-400"
                      }`}>
                        {program.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="pr-4 md:pr-8">
                    <ArrowUpRight 
                      size={24} 
                      className={`transition-all duration-300 ${
                        isHovered ? "text-black dark:text-white rotate-12 scale-110" : "text-gray-600 dark:text-gray-500"
                      }`} 
                    />
                  </div>

                  {/* Floating Image for active state */}
                  {isHovered && (
                    <div
                      ref={(el) => (imageRefs.current[i] = el)}
                      className="absolute right-[15%] md:right-[20%] hidden md:block pointer-events-none"
                    >
                      <div className="relative w-48 h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                        <img src={mindBodyImg} alt={program.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 right-2 bg-white dark:bg-slate-800 rounded-full px-3 py-1 text-[10px] font-bold flex items-center gap-1 dark:text-white">
                          Explore
                          <Play size={10} className="text-black dark:text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default InnovationArsenalSection;
