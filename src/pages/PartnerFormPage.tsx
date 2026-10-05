import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ParticleText from "@/components/ui/ParticleText";
import { GlassButton, glassButtonStyles } from "@/components/ui/glass-button";

import bg1 from "@/assets/hero-card-gym.jpg";
import bg2 from "@/assets/hero-card-yoga.jpg";
import bg3 from "@/assets/strength.jpg";
import bg4 from "@/assets/cardio.jpg";

const sections = [
  {
    id: "01",
    title: "FACILITY",
    bg: bg1,
    content: (
      <div className="space-y-6 mt-6 w-full max-w-[350px]">
        <p className="text-white text-lg font-normal tracking-wide">Tell us about your centre.</p>
        <div className="space-y-5">
          <input 
            type="text" 
            placeholder="Gym / Facility Name"
            className="glass-button w-full px-6 py-4 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-base"
          />
          <input 
            type="text" 
            placeholder="City / Location"
            className="glass-button w-full px-6 py-4 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-base"
          />
        </div>
      </div>
    )
  },
  {
    id: "02",
    title: "CONTACT",
    bg: bg2,
    content: (
      <div className="space-y-6 mt-6 w-full max-w-[350px]">
        <p className="text-white text-lg font-normal tracking-wide drop-shadow-md">Who should we reach out to?</p>
        <div className="space-y-5">
          <input 
            type="text" 
            placeholder="Your Full Name"
            className="glass-button w-full px-6 py-4 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-base"
          />
          <input 
            type="email" 
            placeholder="Email Address"
            className="glass-button w-full px-6 py-4 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-base"
          />
        </div>
      </div>
    )
  },
  {
    id: "03",
    title: "DETAILS",
    bg: bg3,
    content: (
      <div className="space-y-6 mt-6 w-full max-w-[350px]">
        <p className="text-white text-lg font-normal tracking-wide drop-shadow-md">A bit more about your services.</p>
        <div className="space-y-5">
          <input 
            type="tel" 
            placeholder="Phone Number"
            className="glass-button w-full px-6 py-4 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-base"
          />
          <textarea 
            placeholder="What type of fitness services do you offer?"
            rows={3}
            className="glass-button w-full px-6 py-4 rounded-3xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-base resize-none"
          ></textarea>
        </div>
      </div>
    )
  },
  {
    id: "04",
    title: "SEND",
    bg: bg4,
    content: (
      <div className="space-y-6 mt-6 w-full max-w-[350px]">
        <p className="text-white text-lg font-normal tracking-wide">Ready to join the network?</p>
        <GlassButton 
          className="w-full group" 
          contentClassName="flex h-full w-full items-center justify-center gap-4 font-bold tracking-widest text-xl py-4"
        >
          <span>APPLY NOW</span>
          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </GlassButton>
      </div>
    )
  }
];

const PartnerFormPage = () => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full min-h-screen lg:h-screen bg-black overflow-y-auto overflow-x-hidden lg:overflow-hidden relative font-sans select-none">
      <style>{glassButtonStyles}</style>
      
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 lg:top-8 lg:left-[4vw] z-[100] text-gray-500 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md p-3 rounded-full flex items-center justify-center border border-white/10"
      >
        <ArrowLeft size={20} />
      </Link>

      {/* Main Container - Adjusted to prevent right-side cutoff */}
      <div className="flex flex-col lg:flex-row w-full lg:w-[110vw] h-full lg:-ml-[5vw] lg:skew-x-[-12deg] bg-[#111]">
        
        {/* Static Left/Top Pane */}
        {/* We use a pseudo-element to infinitely extend the left background on desktop. It overlaps by 5vw to prevent sub-pixel rendering gaps. */}
        <div className="w-full min-h-[300px] md:min-h-[400px] lg:w-[32vw] lg:h-full bg-[#F4F4F5] relative z-50 border-b lg:border-b-0 lg:border-r border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.15)] lg:shadow-[20px_0_40px_rgba(0,0,0,0.15)] lg:before:absolute lg:before:inset-y-0 lg:before:-left-[50vw] lg:before:w-[55vw] lg:before:bg-[#F4F4F5]">
          
          {/* Un-skew content inside */}
          <div className="w-full h-full lg:skew-x-[12deg] flex flex-col justify-center absolute right-0 items-center lg:items-start">
            
            <div className="lg:ml-[5vw] flex flex-col items-center lg:items-start w-full lg:w-[120%] z-50 mt-8 lg:mt-[-15vh]">
              
              {/* "PARTNER" text: Below on mobile, Above on desktop */}
              <div className="order-last lg:order-first mt-4 lg:mt-0 mb-2 lg:mb-6 text-[#111] z-[100] text-center lg:text-left">
                <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-widest uppercase opacity-90">PARTNER</h2>
              </div>
              
              <div className="relative h-[80px] md:h-[150px] lg:h-[200px] w-full">
                <ParticleText 
                  text="FIT" 
                  particleSize={2.5} 
                  density={3} 
                  color="#111111" 
                  highlightColor="#111111" 
                  trigger="mount" 
                  fontSize="clamp(4rem, 9vw, 130px)" 
                  fontWeight={900} 
                  glow={false} 
                  textAlign={isMobile ? "center" : "left"} 
                />
              </div>
              <div className="relative h-[80px] md:h-[150px] lg:h-[200px] w-full -mt-2 md:-mt-6 lg:-mt-10">
                <ParticleText 
                  text="FARE" 
                  particleSize={2.5} 
                  density={3} 
                  color="#111111" 
                  highlightColor="#111111" 
                  trigger="mount" 
                  fontSize="clamp(4rem, 9vw, 130px)" 
                  fontWeight={900} 
                  glow={false} 
                  textAlign={isMobile ? "center" : "left"} 
                />
              </div>
            </div>

          </div>
        </div>

        {/* Accordion Container */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-[850px] md:min-h-[900px] lg:min-h-0 lg:h-full lg:pr-[3vw]">
          {sections.map((sec, i) => {
            const isActive = active === i;
            return (
              <div 
                key={sec.id}
                onMouseEnter={() => { if(window.innerWidth >= 1024) setActive(i) }}
                onClick={() => setActive(i)}
                className={`relative w-full lg:w-auto transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden cursor-pointer group shadow-2xl ${isActive ? 'flex-[4] lg:flex-[2.8]' : 'flex-[1] lg:flex-[1.2]'}`}
              >
                {/* INACTIVE STATE */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-[800ms] ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'} flex items-center justify-center lg:block`}
                >
                  {/* Mobile Horizontal Number & Title */}
                  <div className="flex lg:hidden items-center justify-between w-full px-6">
                    <span className="text-4xl font-extralight text-[#D9A84E] leading-none">{sec.id}</span>
                    <h2 className="text-3xl font-bold text-white uppercase tracking-[0.1em] opacity-80">{sec.title}</h2>
                  </div>

                  {/* Desktop Horizontal Number at the top */}
                  <div className="hidden lg:block absolute top-20 left-[40px] lg:left-[60px]">
                    <span 
                      className="absolute block text-[70px] lg:text-[100px] font-extralight text-[#D9A84E] leading-none"
                      style={{ 
                        transform: 'translate(-50%, -50%) skewX(12deg)',
                        left: 0,
                        top: 0
                      }}
                    >
                      {sec.id}
                    </span>
                  </div>
                  
                  {/* Desktop Vertical Slanted Text */}
                  <div className="hidden lg:block absolute top-1/2 left-[40px] lg:left-[60px] w-full">
                    <h2 
                      className="absolute text-[70px] lg:text-[100px] font-bold text-white uppercase tracking-[0.1em] opacity-80 whitespace-nowrap"
                      style={{ 
                        transform: 'translate(-50%, -50%) rotate(-90deg) skewX(12deg)',
                        transformOrigin: 'center center',
                        left: 0,
                        top: 0
                      }}
                    >
                      {sec.title}
                    </h2>
                  </div>
                </div>

                {/* Background Image Container - Un-skewed on desktop */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full lg:w-[60vw] lg:skew-x-[12deg]">
                  
                  {/* Background Image */}
                  <img 
                    src={sec.bg} 
                    alt={sec.title} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out origin-center ${isActive ? 'opacity-50 grayscale-0 scale-100' : 'opacity-20 grayscale scale-110 group-hover:opacity-40'}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-1000"></div>
                  
                  {/* Content Container */}
                  <div className="absolute inset-0">
                    
                    {/* ACTIVE STATE */}
                    <div 
                      className={`absolute inset-0 flex flex-col justify-start pt-10 lg:justify-center lg:pt-0 items-center px-4 transition-opacity duration-[800ms] ${isActive ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}
                    >
                      <div className={`relative z-10 w-full max-w-[450px] flex flex-col items-center lg:items-start transition-transform duration-[800ms]`}>
                        
                        {/* Header Section */}
                        <div className="flex items-baseline gap-3 md:gap-4 whitespace-nowrap mb-4 md:mb-6">
                          <span className="text-[50px] md:text-[80px] lg:text-[120px] leading-none font-extralight text-white">
                            {sec.id}
                          </span>
                          <h2 className="text-xl md:text-2xl lg:text-4xl font-light tracking-[0.15em] uppercase text-[#D9A84E]">
                            {sec.title}
                          </h2>
                        </div>
                        
                        {/* Form Content - Smooth reveal */}
                        <div 
                          className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-full overflow-hidden flex flex-col items-center lg:items-start ${isActive ? 'max-h-[600px] translate-y-0' : 'max-h-0 translate-y-4'}`}
                        >
                          {sec.content}
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PartnerFormPage;
