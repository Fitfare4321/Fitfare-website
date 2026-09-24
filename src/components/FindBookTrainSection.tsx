import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wallet, Info, PlusCircle, CalendarCheck, Zap, X, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NESTED_TABS = ["Credits", "Old Way vs FitFare"];

const steps = [
  { step: "01", title: "Discover", desc: "Explore participating fitness centres and available activities." },
  { step: "02", title: "Book", desc: "Choose where and when you want to train." },
  { step: "03", title: "Check In", desc: "Reach the centre and complete your FitFare QR check-in." },
  { step: "04", title: "Move", desc: "Start your workout. That's it." },
];

const FindBookTrainSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const stepsWrapperRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Pinned scroll animation for the 4 steps
  useGSAP(() => {
    if (!pinContainerRef.current || !stepsWrapperRef.current) return;

    const cards = gsap.utils.toArray('.scroll-step-card') as HTMLElement[];
    const totalScroll = cards.length * window.innerHeight * 0.8;

    // Pin the container
    ScrollTrigger.create({
      trigger: pinContainerRef.current,
      start: "top top",
      end: `+=${totalScroll}`,
      pin: true,
      anticipatePin: 1,
    });

    // Animate cards based on scroll position
    cards.forEach((card, i) => {
      if (i === 0) return; // First card is already visible
      
      gsap.fromTo(card,
        { y: window.innerHeight, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: `top+=${(i - 1) * window.innerHeight * 0.8} top`,
            end: `top+=${i * window.innerHeight * 0.8} top`,
            scrub: true,
          }
        }
      );
    });

  }, { scope: sectionRef });

  // Tab content animation
  const contentRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", clearProps: "transform" }
    );
    
    // Parallax split screen effect (if on tab 1)
    if (activeTab === 1) {
      gsap.to('.split-traditional', {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to('.split-fitfare', {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="bg-black relative z-10 text-white">
      
      {/* ── PINNED 4-STEP SEQUENCE ── */}
      <div ref={pinContainerRef} className="h-screen w-full relative overflow-hidden flex items-center bg-black">
        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
          <h1 className="text-[20vw] font-black leading-none whitespace-nowrap text-white">FIND FIT USE</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left side fixed text */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#305CDE]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">
                  How It Works
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Find It. <br />
                Book It. <br />
                <span className="text-[#305CDE]">Train.</span>
              </h2>
              <p className="text-gray-400 font-medium">
                Discover → Book → Check in → Train.
              </p>
            </div>

            {/* Right side scrolling cards container */}
            <div ref={stepsWrapperRef} className="relative h-[400px] w-full">
              {steps.map((step, i) => (
                <div 
                  key={step.step}
                  className="scroll-step-card absolute inset-0 bg-gray-900 rounded-[2.5rem] p-10 border border-gray-800 shadow-2xl flex flex-col justify-center"
                  style={{ zIndex: i + 1 }}
                >
                  <div className="text-[100px] font-black text-gray-800 leading-none absolute top-4 right-8 select-none">
                    {step.step}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
                  <p className="text-gray-400 text-lg font-medium relative z-10 leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>

      {/* ── NESTED TABS (Continuing below the pin) ── */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 bg-black">
        
        <div className="flex justify-center mb-16">
          <div className="segment-control relative overflow-hidden bg-white/5 border border-white/10 rounded-full p-1 flex">
            <div 
              className="absolute top-1 bottom-1 bg-[#305CDE] rounded-full transition-all duration-300 ease-in-out z-0"
              style={{
                width: `calc(${100 / NESTED_TABS.length}% - 4px)`,
                left: `calc(${(activeTab * 100) / NESTED_TABS.length}% + 2px)`
              }}
            />
            {NESTED_TABS.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`segment-btn relative z-10 w-48 py-2.5 text-center text-sm font-semibold transition-colors duration-300 ${activeTab === idx ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div ref={contentRef}>
          {/* TAB 1: CREDITS */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  One Balance. <br/>More Ways to Train.
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-medium mb-10 max-w-md">
                  Add FitFare credits and use them toward eligible bookings across participating centres. Your balance travels with your FitFare experience.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#305CDE]/20 flex items-center justify-center shrink-0">
                      <PlusCircle size={18} className="text-[#305CDE]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Add</h4>
                      <p className="text-gray-400 text-xs">Keep credits in your FitFare balance.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#305CDE]/20 flex items-center justify-center shrink-0">
                      <CalendarCheck size={18} className="text-[#305CDE]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Book</h4>
                      <p className="text-gray-400 text-xs">Apply eligible credits to a booking.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#305CDE]/20 flex items-center justify-center shrink-0">
                      <Zap size={18} className="text-[#305CDE]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Move</h4>
                      <p className="text-gray-400 text-xs">Use FitFare across participating centres.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 inline-flex items-center gap-2 bg-[#305CDE]/10 text-[#305CDE] px-4 py-3 rounded-xl text-xs font-bold border border-[#305CDE]/20">
                  <Info size={14} />
                  30-Day Validity — Credits currently follow FitFare's 30-day validity policy.
                </div>
              </div>

              {/* Wallet UI Visual */}
              <div className="relative h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[#305CDE]/10 rounded-full blur-[100px]" />
                <div className="relative z-10 w-full max-w-sm bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-800">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-sm font-bold text-gray-400">FitFare Wallet</span>
                    <Wallet size={20} className="text-[#305CDE]" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Available Balance</div>
                  <div className="text-5xl font-bold text-white tracking-tight mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="text-3xl text-gray-500">₹</span>1,500
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-white text-black py-3.5 rounded-xl text-sm font-bold hover:bg-[#305CDE] hover:text-white transition-colors">
                      Add Credits
                    </button>
                    <button className="w-full bg-gray-800 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-700 transition-colors">
                      View History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OLD WAY VS FITFARE */}
          {activeTab === 1 && (
            <div className="pt-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  One Gym Was the Old Way.
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-medium">
                  Traditional fitness access often starts with committing to one place for a fixed period. FitFare starts with a different question: where do you want to train today?
                </p>
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                {/* Center Divider */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent" />

                {/* Traditional Pane (Parallax up) */}
                <div className="split-traditional space-y-6">
                  <h3 className="text-xl font-bold text-gray-500 text-center md:text-right mb-8">Traditional Model</h3>
                  {[
                    "Longer commitment",
                    "Primarily one location",
                    "Pay through low-use periods",
                    "Routine follows the membership"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center md:justify-end gap-4 p-4 rounded-2xl bg-white/5 border border-transparent">
                      <span className="font-medium text-gray-400 order-2 md:order-1">{item}</span>
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 order-1 md:order-2">
                        <X size={14} className="text-red-500" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* FitFare Pane (Parallax down) */}
                <div className="split-fitfare space-y-6">
                  <h3 className="text-xl font-bold text-[#305CDE] text-center md:text-left mb-8">FitFare</h3>
                  {[
                    "Flexible access",
                    "Participating centres in one app",
                    "Pay based on bookings",
                    "Fitness follows your routine"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center md:justify-start gap-4 p-4 rounded-2xl bg-[#305CDE]/5 border border-[#305CDE]/30 shadow-[0_0_15px_rgba(48,92,222,0.1)]">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-green-400" />
                      </div>
                      <span className="font-bold text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-20">
                <p className="text-lg md:text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Don't build your life around a gym membership. <br className="hidden md:block" />
                  <span className="text-[#305CDE]">Build fitness around your life.</span>
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default FindBookTrainSection;
