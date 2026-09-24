import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MapPin, 
  Briefcase, 
  Compass, 
  Heart,
  Unlock,
  Wallet,
  Grid,
  Sparkles,
  Search,
  CheckCircle,
  CreditCard,
  QrCode,
  ArrowRight
} from "lucide-react";
import delhiImg from "@/assets/delhi.jpg";
import mumbaiImg from "@/assets/mumbai.jpg";
import beglImg from "@/assets/begluru.jpg";
import hyImg from "@/assets/hydrabad.jpg";

gsap.registerPlugin(ScrollTrigger);

const TABS = ["Nearby", "In Your Pocket"];

/* ── Panel A Data ── */
const nearbyCards = [
  { title: "Near Home", image: delhiImg, icon: MapPin },
  { title: "Near Work", image: mumbaiImg, icon: Briefcase },
  { title: "Somewhere New", image: beglImg, icon: Compass },
  { title: "Your Choice", image: hyImg, icon: Heart },
];

/* ── Panel B Data (App Experience) ── */
const flowCards = [
  { title: "Discover", icon: Search },
  { title: "Choose", icon: CheckCircle },
  { title: "Book & Pay", icon: CreditCard },
  { title: "Check In", icon: QrCode },
];

const FindFitUseSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [prevTab, setPrevTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Initial scroll reveal for the section container
  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 80%" },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: sectionRef });

  // Tab Transition Animation
  useGSAP(() => {
    if (!contentRef.current) return;
    
    const direction = activeTab > prevTab ? 1 : -1;
    
    // Animate old content out (if any)
    gsap.fromTo(contentRef.current, 
      { opacity: 0, x: 20 * direction },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", clearProps: "transform" }
    );
    
    setPrevTab(activeTab);
  }, [activeTab]);

  // Orbiting float animation for App Experience cards
  useEffect(() => {
    if (activeTab === 1 && phoneRef.current) {
      const cards = phoneRef.current.querySelectorAll('.orbit-card');
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: "random(-15, 15)",
          x: "random(-10, 10)",
          rotation: "random(-5, 5)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });
    }
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="py-24 bg-black relative overflow-hidden text-white">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#305CDE]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sub-nav / Segmented Control */}
        <div className="flex justify-center mb-16">
          <div className="segment-control relative overflow-hidden bg-white/5 border border-white/10 rounded-full p-1 flex">
            <div 
              className="absolute top-1 bottom-1 bg-[#305CDE] rounded-full transition-all duration-300 ease-in-out z-0"
              style={{
                width: `calc(${100 / TABS.length}% - 4px)`,
                left: `calc(${(activeTab * 100) / TABS.length}% + 2px)`
              }}
            />
            {TABS.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`segment-btn relative z-10 w-36 py-2.5 text-center text-sm font-semibold transition-colors duration-300 ${activeTab === idx ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div ref={contentRef} className="min-h-[500px]">
          
          {/* PANEL A: NEARBY DISCOVERY */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Where Do You Want to Train Today?
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-medium mb-8">
                  Open FitFare and discover participating fitness centres around you. Choose what fits your location, your schedule and your day.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {nearbyCards.map((card, i) => (
                    <div key={card.title} className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#305CDE]/50 hover:bg-[#305CDE]/10 transition-all cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-[#305CDE]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <card.icon size={18} className="text-[#305CDE]" />
                      </div>
                      <span className="text-sm font-bold text-white">{card.title}</span>
                    </div>
                  ))}
                </div>
                
                <button className="text-[#305CDE] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Find Centres <ArrowRight size={16} />
                </button>
              </div>
              
              {/* Map/Visual */}
              <div ref={mapRef} className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden bg-gray-900 border border-gray-800">
                <div className="absolute inset-0 bg-[#305CDE]/10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
                
                {/* Simulated Map Pins */}
                {[
                  { top: "30%", left: "40%", img: delhiImg },
                  { top: "60%", left: "65%", img: mumbaiImg },
                  { top: "45%", left: "20%", img: beglImg }
                ].map((pin, i) => (
                  <div key={i} className="absolute flex flex-col items-center group cursor-pointer" style={{ top: pin.top, left: pin.left }}>
                    <div className="bg-gray-800 p-1 rounded-xl shadow-2xl border border-gray-700 mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <img src={pin.img} className="w-16 h-12 object-cover rounded-lg" alt="Partner Centre" />
                    </div>
                    <div className="w-4 h-4 rounded-full bg-[#305CDE] shadow-[0_0_0_4px_rgba(48,92,222,0.3)] animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PANEL B: APP EXPERIENCE */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Your Fitness Access. In Your Pocket.
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-medium mb-8 max-w-md">
                  From finding a place to train to checking in at the centre, FitFare keeps the journey in one app.
                </p>

                <div className="space-y-4 mb-8 max-w-md">
                  {flowCards.map((card, i) => (
                    <div key={card.title} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[#305CDE]/20 flex items-center justify-center shrink-0">
                        <card.icon size={18} className="text-[#305CDE]" />
                      </div>
                      <span className="font-bold text-white">{card.title}</span>
                    </div>
                  ))}
                </div>

                <button className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-3 hover:bg-[#305CDE] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300">
                  Get FitFare <ArrowRight size={16} />
                </button>
              </div>

              {/* Phone Mockup */}
              <div ref={phoneRef} className="order-1 lg:order-2 relative flex justify-center py-10">
                <div className="w-[280px] h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-[0_0_50px_rgba(48,92,222,0.15)] border border-gray-800 relative z-10 animate-float-card" style={{ animationDuration: "8s" }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />
                  <div className="w-full h-full bg-[#050914] rounded-[2.5rem] overflow-hidden border border-gray-800/50 flex flex-col p-6">
                    <div className="mt-8 space-y-4">
                      <div className="w-full h-32 bg-gray-800/50 rounded-2xl animate-pulse" />
                      <div className="w-3/4 h-6 bg-gray-800/50 rounded-lg animate-pulse" />
                      <div className="w-1/2 h-4 bg-gray-800/50 rounded-lg animate-pulse" />
                      <div className="w-full h-20 bg-gray-800/50 rounded-2xl mt-8 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Orbiting UI Cards */}
                <div className="orbit-card absolute top-20 right-0 lg:-right-10 bg-gray-900 p-3 rounded-2xl shadow-xl border border-gray-800 z-20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <QrCode size={14} className="text-green-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Check-in Ready</div>
                </div>

                <div className="orbit-card absolute bottom-32 left-0 lg:-left-10 bg-gray-900 p-3 rounded-2xl shadow-xl border border-gray-800 z-20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#305CDE]/20 flex items-center justify-center">
                    <Search size={14} className="text-[#305CDE]" />
                  </div>
                  <div className="text-xs font-bold text-white">Found 12 Gyms</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default FindFitUseSection;
