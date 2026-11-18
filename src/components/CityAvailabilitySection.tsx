import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, X, Mail, MapPin } from "lucide-react";
import { useCityTransition } from "@/context/CityTransitionContext";

import delhiImg from "@/assets/city-delhi.jpg";
import noidaImg from "@/assets/city-noida.jpg";
import gurugramImg from "@/assets/city-gurugram.jpg";
import mumbaiImg from "@/assets/city-mumbai.jpg";

import heroGymImg from "@/assets/hero-card-gym.jpg";
import heroYogaImg from "@/assets/hero-card-yoga.jpg";
import strengthImg from "@/assets/strength.jpg";
import gymInteriorImg from "@/assets/gym_interior_color_1790323279413.jpg";
import dumbbellsImg from "@/assets/dumbbells_color_1790323293289.jpg";
import yogaColorImg from "@/assets/yoga_color_1790323324020.jpg";
import treadmillImg from "@/assets/treadmill_color_1790323310637.jpg";

interface CityCard {
  id: string;
  image: string;
  title: string;
  isHero?: boolean;
}

interface CityItem {
  id: string;
  name: string;
  places: string;
  studiosCount: string;
  tagline: string;
  hubs: string[];
  accent: string;
  accentRgb: string;
  link: string;
  status: "live" | "soon";
  cards: CityCard[];
}

const cities: CityItem[] = [
  {
    id: "01",
    name: "DELHI",
    places: "50 places",
    studiosCount: "50+ STUDIOS VERIFIED",
    tagline: "The Capital of Fitness",
    hubs: ["Connaught Place", "Saket", "Hauz Khas", "Dwarka"],
    accent: "#F59E0B",
    accentRgb: "245, 158, 11",
    link: "/delhi-ncr",
    status: "live",
    cards: [
      {
        id: "delhi-interior",
        image: gymInteriorImg,
        title: "Strength & Iron Conditioning",
      },
      {
        id: "delhi-wellness",
        image: heroYogaImg,
        title: "Mind & Body Sanctuary",
      },
      {
        id: "delhi-cardio",
        image: treadmillImg,
        title: "Cardio & Endurance Arena",
      },
      {
        id: "delhi-hero",
        image: delhiImg,
        title: "The Capital of Fitness",
        isHero: true,
      },
    ],
  },
  {
    id: "02",
    name: "NOIDA",
    places: "30 places",
    studiosCount: "30+ STUDIOS VERIFIED",
    tagline: "Modern Fitness Corridor",
    hubs: ["Sector 18", "Sector 62", "Sector 137", "Expressway"],
    accent: "#38BDF8",
    accentRgb: "56, 189, 248",
    link: "/noida",
    status: "live",
    cards: [
      {
        id: "noida-combat",
        image: dumbbellsImg,
        title: "CrossFit & Athletic Iron",
      },
      {
        id: "noida-gym",
        image: heroGymImg,
        title: "High-Tech Training Centers",
      },
      {
        id: "noida-interior",
        image: gymInteriorImg,
        title: "Strength & Resistance Labs",
      },
      {
        id: "noida-hero",
        image: noidaImg,
        title: "Modern Fitness Corridor",
        isHero: true,
      },
    ],
  },
  {
    id: "03",
    name: "GURUGRAM",
    places: "40 places",
    studiosCount: "40+ STUDIOS VERIFIED",
    tagline: "Corporate Wellness Capital",
    hubs: ["Cyber Hub", "Golf Course Rd", "Sector 29", "Sohna Rd"],
    accent: "#34D399",
    accentRgb: "52, 211, 153",
    link: "/gurgaon",
    status: "live",
    cards: [
      {
        id: "gurugram-pilates",
        image: yogaColorImg,
        title: "Rehab & Pilates Sanctuary",
      },
      {
        id: "gurugram-strength",
        image: strengthImg,
        title: "High-Performance Clubs",
      },
      {
        id: "gurugram-functional",
        image: dumbbellsImg,
        title: "Functional & Cross-Training",
      },
      {
        id: "gurugram-hero",
        image: gurugramImg,
        title: "Corporate Wellness Capital",
        isHero: true,
      },
    ],
  },
  {
    id: "04",
    name: "MUMBAI",
    places: "25 places",
    studiosCount: "COMING SOON • 25+ HUBS",
    tagline: "Coastal High-Energy Movement",
    hubs: ["Bandra", "BKC", "Andheri", "Lower Parel"],
    accent: "#F43F5E",
    accentRgb: "244, 63, 94",
    link: "#footer",
    status: "soon",
    cards: [
      {
        id: "mumbai-fight",
        image: gymInteriorImg,
        title: "High-Intensity MMA & HIIT",
      },
      {
        id: "mumbai-boutique",
        image: heroGymImg,
        title: "Boutique Strength Centers",
      },
      {
        id: "mumbai-yoga",
        image: yogaColorImg,
        title: "Coastal Yoga & Mobility",
      },
      {
        id: "mumbai-hero",
        image: mumbaiImg,
        title: "Coastal High-Energy Movement",
        isHero: true,
      },
    ],
  },
];

const CityAvailabilitySection = () => {
  const { activeTransitionCity, startTransition } = useCityTransition();
  const isTransitionActive = !!activeTransitionCity;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoveredStack, setIsHoveredStack] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [isMumbaiModalOpen, setIsMumbaiModalOpen] = useState(false);
  const [mumbaiEmail, setMumbaiEmail] = useState("");
  const [mumbaiSubmitted, setMumbaiSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const activeCity = cities[activeIndex];

  const handleTriggerCityAction = (cityIdx: number) => {
    const targetCity = cities[cityIdx];

    if (targetCity.status === "soon") {
      setIsMumbaiModalOpen(true);
      return;
    }

    if (isTransitionActive) return;

    setActiveIndex(cityIdx);
    startTransition(targetCity);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitionActive) return;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % cities.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + cities.length) % cities.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleTriggerCityAction(activeIndex);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, isTransitionActive]);


  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || isTransitionActive) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        setActiveIndex((prev) => (prev + 1) % cities.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + cities.length) % cities.length);
      }
    }
    touchStartXRef.current = null;
  };


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTransitionActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHoveredStack(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handleMumbaiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mumbaiEmail.trim()) return;
    setMumbaiSubmitted(true);
    setTimeout(() => {
      setMumbaiSubmitted(false);
      setIsMumbaiModalOpen(false);
      setMumbaiEmail("");
    }, 2400);
  };

  return (
    <section
      ref={containerRef}
      id="available-cities"
      className="relative w-full bg-[#000000] global-bg-grid text-white overflow-hidden py-10 sm:py-16 lg:py-24 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between">
        
        {/* Section Header with 'We are available in' styled as Image 2 */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 sm:pb-8 lg:pb-12 pt-1 sm:pt-2 border-b border-white/[0.08]">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 leading-[1.08]"
            style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
          >
            We are <br /> available in
          </h2>

          <div className="flex items-center gap-2 pb-1 sm:pb-2">
            <span
              className="text-xs sm:text-base font-normal tracking-wide text-white/85 select-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Choose your place
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full transition-colors duration-500 animate-pulse ml-0.5 sm:ml-1"
              style={{
                backgroundColor: activeCity.accent,
                boxShadow: `0 0 10px ${activeCity.accent}`,
              }}
            />
          </div>
        </header>


        <div className="flex md:hidden items-center justify-between gap-1.5 pt-5 pb-3 overflow-x-auto scrollbar-none">
          {cities.map((city, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={`mobile-tab-${city.name}`}
                onClick={() => handleTriggerCityAction(idx)}
                className={`flex-1 py-2 px-2.5 rounded-xl text-center transition-all duration-300 relative cursor-pointer ${
                  isActive
                    ? "bg-white/[0.08] border border-white/20 text-white font-bold"
                    : "bg-transparent text-white/40 hover:text-white/70"
                }`}
              >
                <div className="text-[11px] font-black tracking-wider uppercase truncate">
                  {city.name}
                </div>
                <div className="text-[9px] font-normal text-white/40 mt-0.5 truncate">
                  {city.places}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTabIndicator"
                    className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full"
                    style={{ backgroundColor: city.accent }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>


        <div className="relative pt-4 sm:pt-8 lg:pt-12 pb-6 sm:pb-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-14">
          

          <div className="hidden md:flex flex-1 flex-col justify-start space-y-6 lg:space-y-9 z-20 min-w-0">
            {cities.map((city, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={city.name}
                  onClick={() => handleTriggerCityAction(idx)}
                  onMouseEnter={() => {
                    if (!isTransitionActive) setActiveIndex(idx);
                  }}
                  className="group relative cursor-pointer flex flex-col items-start transition-all duration-300 min-w-0"
                >
                  {/* City Name Heading */}
                  <div className="relative flex items-center min-w-0 w-full">
                    <motion.h3
                      animate={{
                        color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.22)",
                        x: isActive ? 6 : 0,
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="font-black uppercase tracking-[-0.035em] leading-[0.88] select-none text-4xl md:text-5xl lg:text-7xl xl:text-8xl transition-colors duration-300 group-hover:text-white truncate"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        textShadow: isActive ? "0 4px 30px rgba(0, 0, 0, 0.7)" : "none",
                      }}
                    >
                      {city.name}
                    </motion.h3>


                    {isActive && (
                      <motion.div
                        layoutId="activeCityIndicatorDot"
                        className="w-2.5 h-2.5 rounded-full ml-3.5 shadow-lg shrink-0"
                        style={{
                          backgroundColor: city.accent,
                          boxShadow: `0 0 16px ${city.accent}`,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      />
                    )}
                  </div>


                  <motion.div
                    animate={{
                      color: isActive ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.18)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 mt-1 sm:mt-1.5"
                  >
                    <span
                      className="text-xs sm:text-sm lg:text-base font-normal tracking-wide transition-colors duration-300 group-hover:text-white/60"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {city.places}
                    </span>

                    {city.status === "soon" && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Soon
                      </span>
                    )}
                  </motion.div>


                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="flex flex-col items-start mt-3"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTriggerCityAction(idx);
                        }}
                        className="group/cta relative inline-flex items-center gap-3 py-2 pl-4 sm:pl-5 pr-2 rounded-full text-xs sm:text-[13px] font-bold tracking-wider uppercase text-white transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-2xl border border-white/20 hover:border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.6)] hover:scale-[1.03] active:scale-[0.98]"
                        style={{
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%)",
                        }}
                      >
                        {/* Ambient glow accent behind glass */}
                        <div
                          className="absolute -inset-1 rounded-full opacity-30 group-hover/cta:opacity-75 blur-md transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at 75% 50%, ${city.accent}, transparent 70%)`,
                          }}
                        />

                        {/* Top specular highlight */}
                        <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                        {/* Shimmer sweep effect on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                        {/* Label text */}
                        <span className="relative z-10 text-white/95 group-hover/cta:text-white drop-shadow-sm font-black tracking-wider text-[11px] sm:text-xs">
                          {city.status === "live" ? `Explore ${city.name}` : "Join Waitlist"}
                        </span>

                        {/* Circular jewel arrow badge */}
                        <div
                          className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover/cta:scale-110 group-hover/cta:translate-x-0.5 shadow-md"
                          style={{
                            backgroundColor: city.accent,
                            color: "#000000",
                            boxShadow: `0 0 14px ${city.accent}`,
                          }}
                        >
                          <ArrowRight size={13} className="stroke-[2.5]" />
                        </div>
                      </button>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>


          <div
            className={`relative w-full md:w-[48%] lg:w-[45%] xl:w-[42%] shrink-0 flex flex-col items-center justify-center overflow-visible my-2 sm:my-0 transition-all ${
              isTransitionActive ? "z-50" : "z-30"
            }`}
            onMouseEnter={() => setIsHoveredStack(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >

            <div
              onClick={() => handleTriggerCityAction(activeIndex)}
              className="relative w-[280px] xs:w-[310px] sm:w-[350px] lg:w-[380px] aspect-[3.2/4.3] flex items-center justify-center overflow-visible cursor-pointer"
              style={{ perspective: "1200px" }}
            >

              <motion.div
                animate={{
                  rotateY: isTransitionActive ? 0 : mousePos.x * 8,
                  rotateX: isTransitionActive ? 0 : -mousePos.y * 6,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full flex items-center justify-center overflow-visible"
              >

                {activeCity.cards.map((card, i) => {
                  const isHero = !!card.isHero || i === 3;

                  let targetX = 0;
                  let targetY = 0;
                  let targetRotate = 0;
                  let targetScale = 1;
                  let targetZIndex = 30;
                  let targetOpacity = 1;
                  let targetFilter = "brightness(1)";

                  if (isHoveredStack) {

                    if (i === 0) {
                      // Far Left
                      targetX = -84;
                      targetY = -22;
                      targetRotate = -18;
                      targetScale = 0.92;
                      targetZIndex = 10;
                      targetOpacity = 0.94;
                      targetFilter = "brightness(0.85)";
                    } else if (i === 1) {
                      // Mid Left
                      targetX = -28;
                      targetY = -10;
                      targetRotate = -6;
                      targetScale = 0.96;
                      targetZIndex = 18;
                      targetOpacity = 0.97;
                      targetFilter = "brightness(0.92)";
                    } else if (i === 2) {
                      // Mid Right
                      targetX = 28;
                      targetY = -10;
                      targetRotate = 6;
                      targetScale = 0.98;
                      targetZIndex = 24;
                      targetOpacity = 0.98;
                      targetFilter = "brightness(0.96)";
                    } else {

                      targetX = 84;
                      targetY = -22;
                      targetRotate = 18;
                      targetScale = 1.02;
                      targetZIndex = 32;
                      targetOpacity = 1;
                      targetFilter = "brightness(1)";
                    }
                  } else {

                    if (i === 0) {
                      targetX = -12;
                      targetY = -8;
                      targetRotate = -4.5;
                      targetScale = 0.93;
                      targetZIndex = 10;
                      targetOpacity = 0.82;
                      targetFilter = "brightness(0.82)";
                    } else if (i === 1) {
                      targetX = -4;
                      targetY = -4;
                      targetRotate = -1.5;
                      targetScale = 0.96;
                      targetZIndex = 16;
                      targetOpacity = 0.88;
                      targetFilter = "brightness(0.88)";
                    } else if (i === 2) {
                      targetX = 6;
                      targetY = -1;
                      targetRotate = 2;
                      targetScale = 0.98;
                      targetZIndex = 22;
                      targetOpacity = 0.94;
                      targetFilter = "brightness(0.94)";
                    } else {
                      targetX = 0;
                      targetY = 0;
                      targetRotate = 0;
                      targetScale = 1.0;
                      targetZIndex = 30;
                      targetOpacity = 1;
                      targetFilter = "brightness(1)";
                    }
                  }

                  return (
                    <motion.div
                      key={`card-${card.id}`}
                      layout
                      animate={{
                        x: targetX,
                        y: targetY,
                        rotate: targetRotate,
                        scale: targetScale,
                        zIndex: targetZIndex,
                        opacity: targetOpacity,
                        filter: targetFilter,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 22,
                        mass: 0.85,
                      }}
                      whileTap={{ scale: isHero ? 0.99 : 0.95 }}
                      className={`absolute inset-0 w-full h-full rounded-[28px] sm:rounded-[36px] overflow-hidden border-[2.5px] sm:border-[3px] border-white cursor-pointer select-none transition-shadow duration-300 bg-zinc-950 ${
                        isHero
                          ? "shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                          : i === 2
                          ? "shadow-[16px_20px_45px_rgba(0,0,0,0.85)]"
                          : "shadow-[-16px_20px_45px_rgba(0,0,0,0.85)]"
                      }`}
                      style={{
                        boxShadow: isHero
                          ? "0 25px 60px rgba(0, 0, 0, 0.95)"
                          : undefined,
                      }}
                    >

                      <img
                        src={card.image}
                        alt={card.title}
                        loading="eager"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 pointer-events-none select-none"
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Mobile-only CTA displayed neatly under the cards */}
            <div className="flex md:hidden flex-col items-center mt-5 w-full max-w-xs">
              <button
                type="button"
                onClick={() => handleTriggerCityAction(activeIndex)}
                className="group/cta relative w-full inline-flex items-center justify-between py-2.5 pl-5 pr-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-white transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-2xl border border-white/20 hover:border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%)",
                }}
              >
                {/* Ambient glow accent behind glass */}
                <div
                  className="absolute -inset-1 rounded-full opacity-35 blur-md pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 80% 50%, ${activeCity.accent}, transparent 70%)`,
                  }}
                />

                {/* Top specular highlight */}
                <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                {/* Label text */}
                <span className="relative z-10 text-white/95 drop-shadow-sm font-black tracking-wider text-[11px]">
                  {activeCity.status === "live" ? `Explore ${activeCity.name}` : "Join Waitlist"}
                </span>

                {/* Circular jewel arrow badge */}
                <div
                  className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                  style={{
                    backgroundColor: activeCity.accent,
                    color: "#000000",
                    boxShadow: `0 0 14px ${activeCity.accent}`,
                  }}
                >
                  <ArrowRight size={13} className="stroke-[2.5]" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════════ FOOTER INTERACTION HINT & CLEARANCE ═══════════════════ */}
        <footer className="pt-4 pb-36 sm:pb-40 lg:pb-8 flex items-center justify-between text-white/35 border-t border-white/[0.08]">
          <span
            className="text-[10px] sm:text-xs font-normal tracking-[0.2em] uppercase select-none"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Click cards or city to explore • 0{activeIndex + 1} / 0{cities.length}
          </span>

          <div className="flex items-center gap-2">
            {cities.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isTransitionActive) setActiveIndex(i);
                }}
                aria-label={`Select city ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    : "bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </footer>

      </div>

      {/* ═══════════════════ MUMBAI WAITLIST MODAL ═══════════════════ */}
      <AnimatePresence>
        {isMumbaiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md rounded-[32px] p-6 sm:p-8 bg-zinc-950 border border-white/20 shadow-2xl text-white overflow-hidden"
              style={{
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95), 0 0 50px rgba(244, 63, 94, 0.25)",
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsMumbaiModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 text-rose-400 mb-2">
                <MapPin size={16} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">
                  Mumbai • Coming Soon
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                Be the First to Access Mumbai Gyms
              </h3>

              <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                We're onboarding 25+ top verified gyms & boutique studios across Bandra, BKC, Andheri, and Lower Parel. Join our VIP launch list for 2 free workout credits at launch.
              </p>

              {mumbaiSubmitted ? (
                <div className="mt-6 py-6 px-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-black mb-2">
                    <Check size={20} className="stroke-[3]" />
                  </div>
                  <p className="text-sm font-bold text-white">You're on the Mumbai VIP list!</p>
                  <p className="text-xs text-white/60 mt-1">We'll notify you as soon as bookings go live.</p>
                </div>
              ) : (
                <form onSubmit={handleMumbaiSubmit} className="mt-6 flex flex-col gap-3">
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={mumbaiEmail}
                      onChange={(e) => setMumbaiEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.07] border border-white/20 text-sm text-white placeholder-white/35 focus:outline-none focus:border-rose-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-full font-bold text-sm bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white shadow-lg shadow-rose-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} />
                    <span>Get Priority Launch Access</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CityAvailabilitySection;
