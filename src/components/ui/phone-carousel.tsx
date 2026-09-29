import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import ParticleText from "./ParticleText";

export type AppStep = {
  title: string;
  desc: string;
  icon: React.ElementType;
  src: string;
  alt: string;
};

export function PhoneCarousel({ steps, children }: { steps: AppStep[], children?: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % steps.length);
  }, [steps.length]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("phone-carousel-step", { detail: activeIndex }));
  }, [activeIndex]);

  useEffect(() => {
    const handleSet = (e: any) => {
      if (e.detail !== undefined) {
        setActiveIndex(e.detail);
      }
    };
    window.addEventListener("phone-carousel-set", handleSet);
    return () => window.removeEventListener("phone-carousel-set", handleSet);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Grid Layout for Text and Carousel */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center mt-4 md:mt-8 min-h-[700px]">
        
        {/* Left Side: Particle Text Title and Description */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-4 lg:pl-4 lg:pr-12 z-50">
          <div className="relative h-[150px] md:h-[500px] w-full md:w-[140%] ml-0 md:-ml-[25%] my-0 md:-my-[150px] z-10">
            <ParticleText
              text={steps[activeIndex].title}
              particleSize={3}
              density={5}
              color="#ffffff"
              highlightColor="#ffffff"
              scatter={150}
              gatherDuration={1200}
              stagger={300}
              trigger="mount"
              fontSize="clamp(5rem, 8vw, 9rem)"
              fontWeight={800}
              glow={false}
              pointerRepel={80}
              repelRadius={200}
            />
          </div>
          <div className="relative h-[80px] md:h-[120px] w-full md:w-[110%] ml-0 md:-ml-[5%] mt-4 md:mt-12 z-20 text-center md:text-left px-4 md:px-0">
            {steps.map((step, idx) => (
              <p
                key={idx}
                className={cn(
                  "absolute text-gray-300 text-lg md:text-xl font-medium leading-relaxed drop-shadow-xl transition-all duration-700 w-full",
                  activeIndex === idx ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-4 pointer-events-none"
                )}
              >
                {step.desc}
              </p>
            ))}
          </div>
          {children && (
            <div className="mt-2 md:mt-8 ml-0 md:-ml-[5%] text-center md:text-left z-20 hidden lg:block">
              {children}
            </div>
          )}
        </div>

        {/* Right Side: Stacked Phone Carousel */}
        <div className="w-full lg:w-[60%] relative h-[500px] md:h-[700px] flex items-center justify-center lg:justify-start perspective-[2000px] pl-0 lg:pl-12 mt-4 lg:mt-0">
          {steps.map((step, index) => {
            let offset = index - activeIndex;
            if (offset < 0) offset += steps.length;
            
            const isCenter = offset === 0;
            const isStack1 = offset === 1;
            const isStack2 = offset === 2;
            const isStack3 = offset === 3;

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "absolute w-[260px] md:w-[320px] h-[540px] md:h-[660px] rounded-[3rem] p-[2px] transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer origin-center",
                  isCenter ? "z-40 scale-100 translate-x-[-15%] lg:translate-x-[15%] opacity-100 shadow-[0_0_60px_rgba(255,255,255,0.05),-30px_0_80px_rgba(0,0,0,0.6)] bg-gradient-to-b from-white/40 via-white/5 to-black/50" : "",
                  isStack1 ? "z-30 scale-[0.95] translate-x-[15%] lg:translate-x-[50%] opacity-80 brightness-[0.8] shadow-[-20px_0_40px_rgba(0,0,0,0.6)] bg-gradient-to-b from-white/10 to-black/50 hover:translate-x-[20%] lg:hover:translate-x-[55%]" : "",
                  isStack2 ? "z-20 scale-[0.9] translate-x-[45%] lg:translate-x-[85%] opacity-60 brightness-[0.6] shadow-[-20px_0_40px_rgba(0,0,0,0.6)] bg-gradient-to-b from-white/5 to-black/50 hover:translate-x-[50%] lg:hover:translate-x-[90%]" : "",
                  isStack3 ? "z-10 scale-[0.85] translate-x-[75%] lg:translate-x-[120%] opacity-30 brightness-[0.4] shadow-[-20px_0_40px_rgba(0,0,0,0.6)] bg-gradient-to-b from-white/5 to-black/50 hover:translate-x-[80%] lg:hover:translate-x-[125%]" : ""
                )}
                style={{
                   pointerEvents: 'auto'
                }}
              >
                {/* Inner Phone Body */}
                <div className="relative w-full h-full rounded-[2.9rem] overflow-hidden bg-black flex flex-col justify-between p-2.5 border border-white/10">
                  {/* Dynamic Island */}
                  <div className={cn(
                    "absolute top-4 left-1/2 -translate-x-1/2 h-7 rounded-full z-30 flex justify-center items-center transition-colors",
                    isCenter ? "w-28 bg-black shadow-inner" : "w-28 bg-black/80"
                  )}>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10 ml-12" />
                  </div>
                  
                  {/* Screen Content */}
                  <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-black">
                    <img
                      src={step.src}
                      alt={step.alt}
                      className="w-full h-full object-cover transition-transform duration-1000"
                      style={{ transform: isCenter ? 'scale(1)' : 'scale(1.05)' }}
                    />
                    {/* Subtle Overlay for background phones to increase depth */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/20" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {children && (
          <div className="w-full mt-8 md:mt-12 text-center lg:hidden z-20 relative">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
