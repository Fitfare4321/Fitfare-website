import React, { useState } from "react";
import gymInteriorImg from "@/assets/gym_interior_color_1790323279413.jpg";
import heroYogaImg from "@/assets/hero-card-yoga.jpg";
import zumbaImg from "@/assets/zumba.jpg";
import dumbbellsImg from "@/assets/dumbbells_color_1790323293289.jpg";
import logo from "@/assets/blue-background-logo.png";

// Week days & dates matching calendar capsule design
const WEEK_DAYS = [
  { day: "Mon", date: 10 },
  { day: "Tue", date: 11 },
  { day: "Wed", date: 12 },
  { day: "Thu", date: 13 },
  { day: "Fri", date: 14 },
  { day: "Sat", date: 15 },
  { day: "Sun", date: 16 },
];

const ALL_CATEGORIES = [
  "Gyms",
  "Yoga",
  "Pilates",
  "Zumba",
  "Calisthenics",
  "CrossFit",
  "Boxing",
  "Swimming",
  "HIIT",
  "Functional Training",
  "Strength",
  "Cardio",
  "Kickboxing",
  "Dance Fitness",
  "Aerobics",
  "MMA",
];

// React Link adapter matching Next.js Link interface
const Link = ({
  href,
  children,
  className,
  style,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}) => (
  <a href={href} className={className} style={style} {...props}>
    {children}
  </a>
);

// 4-point sparkle star SVG
const SparkleStar = ({
  className = "",
  size = 20,
  color = "#E8F7FC",
}: {
  className?: string;
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
  >
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

// Curved hand-drawn doodle arrow SVG
const DoodleArrow = ({ className = "" }: { className?: string }) => (
  <svg
    width="54"
    height="54"
    viewBox="0 0 54 54"
    fill="none"
    stroke="#E8F7FC"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 22 C 18 42, 38 42, 44 20" />
    <path d="M33 17 L 44 20 L 44 31" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MODERN GEOMETRIC PHOTO FRAMES (HARDWARE ACCELERATED & SILKY SMOOTH)
   Continuous vector silhouettes, crisp hairline rims, GPU composited layers
   ───────────────────────────────────────────────────────────────────────────── */

// 1. Quatrefoil / 4-Leaf Clover Rosette (Clean Modern Luxury Shape)
const QuatrefoilCard = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const rawId = React.useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `q-clip-${id}`;
  const shineId = `q-shine-${id}`;

  // Continuous outer perimeter path of the 4-leaf rosette (no internal cross lines)
  const perimeterPath =
    "M 76.5 76.5 A 90 90 0 1 1 243.5 76.5 A 90 90 0 1 1 243.5 243.5 A 90 90 0 1 1 76.5 243.5 A 90 90 0 1 1 76.5 76.5 Z";

  return (
    <div className={`relative group cursor-pointer ${className}`}>
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full overflow-visible transition-transform duration-300 ease-out group-hover:scale-[1.04]"
      >
        <defs>
          {/* Continuous outer silhouette path tilted 15 degrees to the left */}
          <clipPath id={clipId}>
            <path d={perimeterPath} transform="rotate(-15 160 160)" />
          </clipPath>

          {/* Subtle luxury glass sheen */}
          <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.14" />
            <stop offset="35%" stopColor="white" stopOpacity="0.02" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The Clipped Photo (Centered perfectly on yoga posture, filling shape completely) */}
        <image
          href={src}
          x="-30"
          y="-30"
          width="380"
          height="380"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          className="transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Subtle Specular Glass Sheen Overlay */}
        <rect
          width="320"
          height="320"
          fill={`url(#${shineId})`}
          clipPath={`url(#${clipId})`}
          pointerEvents="none"
        />

        {/* Hairline Luxury Rim Highlight (Tilted 15 degrees to match outer perimeter) */}
        <path
          d={perimeterPath}
          transform="rotate(-15 160 160)"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.2"
          className="transition-colors duration-300 group-hover:stroke-white/35"
        />
      </svg>
    </div>
  );
};

// 2. Double-Lobed Figure-8 Card (Clean Modern Luxury Shape)
const Figure8Card = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const rawId = React.useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `f8-clip-${id}`;
  const shineId = `f8-shine-${id}`;

  // Continuous outer perimeter path of the double-lobed figure-8 (no internal cross lines)
  const perimeterPath =
    "M 67.5 301.9 A 135 135 0 1 1 232.5 301.9 A 140 140 0 1 1 67.5 301.9 Z";

  return (
    <div className={`relative group cursor-pointer ${className}`}>
      <svg
        viewBox="0 0 300 620"
        className="w-full h-full overflow-visible transition-transform duration-300 ease-out group-hover:scale-[1.03]"
      >
        <defs>
          {/* Continuous outer silhouette path */}
          <clipPath id={clipId}>
            <path d={perimeterPath} />
          </clipPath>

          {/* Subtle luxury glass sheen */}
          <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.12" />
            <stop offset="30%" stopColor="white" stopOpacity="0.02" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The Clipped Photo (Centered perfectly displaying the gym depth) */}
        <image
          href={src}
          x="0"
          y="0"
          width="300"
          height="620"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          className="transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Subtle Specular Glass Sheen Overlay */}
        <rect
          width="300"
          height="620"
          fill={`url(#${shineId})`}
          clipPath={`url(#${clipId})`}
          pointerEvents="none"
        />

        {/* Hairline Luxury Rim Highlight (Only along the outer perimeter) */}
        <path
          d={perimeterPath}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.2"
          className="transition-colors duration-300 group-hover:stroke-white/35"
        />
      </svg>
    </div>
  );
};

// 3. 12-Point Starburst Badge (Clean Modern Silhouette)
const StarburstBadge = ({
  src,
  alt,
  className = "",
  size = 96,
}: {
  src: string;
  alt: string;
  className?: string;
  size?: number;
}) => {
  const rawId = React.useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `star-clip-${id}`;

  const starPoints =
    "50.0,2.0 59.3,15.2 74.0,8.4 75.5,24.5 91.6,26.0 84.8,40.7 98.0,50.0 84.8,59.3 91.6,74.0 75.5,75.5 74.0,91.6 59.3,84.8 50.0,98.0 40.7,84.8 26.0,91.6 24.5,75.5 8.4,74.0 15.2,59.3 2.0,50.0 15.2,40.7 8.4,26.0 24.5,24.5 26.0,8.4 40.7,15.2";

  return (
    <div className={`relative group cursor-pointer ${className}`}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="overflow-visible animate-spin-very-slow transition-transform duration-300 ease-out group-hover:scale-110"
      >
        <defs>
          <clipPath id={clipId}>
            <polygon points={starPoints} />
          </clipPath>
        </defs>

        {/* The Clipped Photo (Dumbbells) */}
        <image
          href={src}
          width="100"
          height="100"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />

        {/* Hairline Luxury Rim Highlight */}
        <polygon
          points={starPoints}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.2"
          className="transition-colors duration-300 group-hover:stroke-white/40"
        />
      </svg>
    </div>
  );
};

// 4. Stadium Capsule Pill (Clean Modern Silhouette)
const StadiumCapsuleCard = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className={`relative group cursor-pointer ${className}`}>
    <div className="relative w-full h-full rounded-full overflow-hidden border border-white/[0.14] transition-transform duration-300 ease-out group-hover:scale-105">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08] transition-transform duration-500 ease-out group-hover:scale-106"
      />
      {/* Specular Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12] pointer-events-none" />
    </div>
  </div>
);

export default function OnDemandHero() {
  // Tue (1), Thu (3), Fri (4 - highlighted active day like in reference screenshot)
  const [bookedDays, setBookedDays] = useState<number[]>([1, 3, 4]);

  const toggleDay = (index: number) => {
    setBookedDays((prev) =>
      prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index].sort()
    );
  };

  return (
    <section className="ff relative bg-black text-white overflow-hidden min-h-screen flex flex-col justify-between">
      {/* ── Global Styles & Keyframe Animations (Hardware-Accelerated & 60/120fps Optimized) ── */}
      <style>{`
        @keyframes ff-rise {
          from { transform: translate3d(0, 100%, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        @keyframes ff-pop {
          from { opacity: 0; transform: scale(.98); }
          to { opacity: 1; transform: none; }
        }
        @keyframes ff-fade {
          from { opacity: 0; transform: translate3d(0, 10px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes ff-ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes ff-marquee-ltr {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        @keyframes ff-float-slow {
          0%, 100% { transform: translate3d(0, 0px, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }
        @keyframes ff-float-delayed {
          0%, 100% { transform: translate3d(0, 0px, 0); }
          50% { transform: translate3d(0, 8px, 0); }
        }
        @keyframes ff-float-reverse {
          0%, 100% { transform: translate3d(0, 0px, 0); }
          50% { transform: translate3d(0, -7px, 0); }
        }
        @keyframes ff-spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ff-pulse-glow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.95; }
        }

        .ff-pop { animation: ff-pop .6s cubic-bezier(.2,.8,.2,1) both; }
        .ff-fade { animation: ff-fade .6s cubic-bezier(.2,.8,.2,1) both; }
        .ff-rise { animation: ff-rise .7s cubic-bezier(.2,.8,.2,1) both; }
        .ff-ping { animation: ff-ping 2s cubic-bezier(0,0,.2,1) infinite; }
        .ff-marquee-ltr {
          animation: ff-marquee-ltr 32s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .ff-marquee-ltr:hover { animation-play-state: paused; }
        .animate-float-slow {
          animation: ff-float-slow 6.5s ease-in-out infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .animate-float-delayed {
          animation: ff-float-delayed 7.5s ease-in-out infinite;
          animation-delay: -2.5s;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .animate-float-reverse {
          animation: ff-float-reverse 6s ease-in-out infinite;
          animation-delay: -1.5s;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .animate-spin-very-slow {
          animation: ff-spin-very-slow 35s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .animate-pulse-glow { animation: ff-pulse-glow 4s ease-in-out infinite alternate; }

        @media (prefers-reduced-motion: reduce) {
          .ff * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ── Background: Neutral Topographic Contour Lines (Pure Black, No Blue) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path d="M-100 150 C320 280, 680 80, 1540 380" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
          <path d="M-100 210 C340 340, 700 140, 1540 440" stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" />
          <path d="M-100 270 C360 400, 720 200, 1540 500" stroke="rgba(255,255,255,0.04)" strokeWidth="1.2" />
          <path d="M-100 330 C380 460, 740 260, 1540 560" stroke="rgba(255,255,255,0.03)" strokeWidth="1.2" />
          <path d="M-100 390 C400 520, 760 320, 1540 620" stroke="rgba(255,255,255,0.03)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* ────── Main Hero Content Container (Full Bleed Edge-to-Edge Hero, No Inner Card) ────── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-4 flex flex-col justify-between flex-1">
        
        {/* ────── TOP ROW: Brand Header ────── */}
        <div className="relative z-20 w-full flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <img
              src={logo}
              alt="FitFare Logo"
              className="h-8 w-auto rounded-lg shadow-md group-hover:scale-105 transition-transform"
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              Fit<span className="text-[#E8F7FC]">Fare</span>
              <span className="text-[#E8F7FC]">.</span>
            </span>
          </Link>
        </div>

          {/* ────── CENTER COMPOSITION: Headline + Floating Geometric Photo Frames ────── */}
          <div className="relative z-10 my-auto py-2 sm:py-3 lg:py-4 flex flex-col items-center justify-center">
            
            {/* ── 1. Left Geometric Frame: Double-Lobed Figure-8 (Desktop/Tablet) ── */}
            <div className="hidden lg:block absolute left-0 xl:left-2 top-1 xl:top-3 w-[205px] xl:w-[245px] h-[425px] xl:h-[505px] z-10 animate-float-slow pointer-events-auto">
              <Figure8Card src={gymInteriorImg} alt="Fitness Gym Facility" className="w-full h-full" />
              {/* Starburst Badge Docked at Lower-Right of Figure-8 (Matching Screenshot 2) */}
              <div className="absolute bottom-5 -right-4 z-20">
                <StarburstBadge src={dumbbellsImg} alt="Strength" size={88} />
              </div>
            </div>

            {/* ── 2. Top-Right Geometric Frame: Quatrefoil Rosette (Matching Screenshot 1) ── */}
            <div className="hidden lg:block absolute right-2 xl:right-8 top-0 xl:top-1 w-[185px] xl:w-[220px] h-[185px] xl:h-[220px] z-10 animate-float-delayed pointer-events-auto">
              <QuatrefoilCard src={heroYogaImg} alt="Yoga and Mindfulness Session" className="w-full h-full" />
            </div>

            {/* ── 3. Bottom-Right Geometric Frame: Stadium Capsule Pill ── */}
            <div className="hidden lg:block absolute right-2 xl:right-6 bottom-1 xl:bottom-4 w-[220px] xl:w-[270px] h-[120px] xl:h-[148px] z-10 animate-float-reverse pointer-events-auto">
              <StadiumCapsuleCard src={zumbaImg} alt="Zumba and Energy Group Fitness" className="w-full h-full" />
            </div>

            {/* ── Floating Sparkle Stars & Doodle Arrow (Frost Blue #E8F7FC Accent) ── */}
            <SparkleStar size={24} color="#E8F7FC" className="hidden lg:block absolute left-[19%] top-[8%] animate-pulse-glow" />
            <SparkleStar size={18} color="#E8F7FC" className="hidden lg:block absolute right-[32%] top-[10%] animate-pulse-glow" />
            <SparkleStar size={22} color="#E8F7FC" className="hidden lg:block absolute right-[34%] bottom-[46%] animate-pulse-glow" />
            <SparkleStar size={16} color="#E8F7FC" className="hidden lg:block absolute left-[28%] bottom-[16%] opacity-60" />
            
            {/* Curved Hand-Drawn Doodle Arrow */}
            <DoodleArrow className="hidden lg:block absolute right-[185px] xl:right-[230px] bottom-[125px] xl:bottom-[155px] rotate-[8deg]" />

            {/* ── Core Editorial Typography ── */}
            <div className="relative z-20 text-center max-w-2xl xl:max-w-3xl mx-auto px-2">
              <h1 className="font-serif tracking-tight text-center leading-[1.1] sm:leading-[1.02] select-none">
                <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.25rem] font-normal text-white">
                  Paying for a full month.
                </span>
                <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.25rem] font-normal text-neutral-300 italic mt-1 sm:mt-2">
                  Showing up for a few days?
                </span>
              </h1>

              <p className="ff-fade mt-3 sm:mt-4 max-w-lg mx-auto text-xs sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed">
                Busy weeks happen. Your fitness spending should fit your routine.
              </p>

              {/* Main Pill CTA & Pricing Subtext */}
              <div className="ff-fade mt-4 sm:mt-5 flex flex-col items-center gap-2">
                <Link
                  href="#download"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-full bg-[#E8F7FC] hover:bg-white text-neutral-950 px-5 sm:px-10 py-2.5 sm:py-3.5 text-xs sm:text-base font-bold shadow-[0_0_35px_rgba(232,247,252,0.5),0_10px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8F7FC]"
                >
                  <span>Find a workout that fits your day</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>

                <div className="text-center">
                  <span className="text-[11px] sm:text-sm font-medium text-neutral-300">
                    Options from ₹14/day to ₹500+.*
                  </span>
                  <p className="mt-0.5 text-[9.5px] sm:text-[10.5px] text-neutral-400 italic">
                    *Prices vary by centre, activity and booking. Check the app for current rates and availability.
                  </p>
                </div>
              </div>

              {/* ── Interactive Week Workout Capsule Selector (Fully Responsive) ── */}
              <div className="ff-fade mt-4 sm:mt-5 w-full max-w-[335px] sm:max-w-md mx-auto rounded-3xl border border-white/10 bg-[#0c0c0e]/90 backdrop-blur-xl p-2.5 sm:p-3 text-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-2 font-medium text-neutral-300 text-[11px] sm:text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="ff-ping absolute inset-0 rounded-full bg-[#E8F7FC] opacity-75" />
                      <span className="relative h-2 w-2 rounded-full bg-[#E8F7FC] shadow-[0_0_8px_rgba(232,247,252,0.7)]" />
                    </span>
                    This week
                  </span>
                  <span className="font-semibold text-white text-[11px] sm:text-xs">From ₹14/day</span>
                </div>

                <div className="flex items-center justify-between gap-1 sm:gap-1.5">
                  {WEEK_DAYS.map((item, index) => {
                    const on = bookedDays.includes(index);
                    return (
                      <button
                        key={item.day}
                        type="button"
                        onClick={() => toggleDay(index)}
                        title={`Click to book ${item.day}`}
                        className={`group relative flex flex-col items-center justify-between rounded-full w-8 sm:w-10 h-12 sm:h-14 py-1.5 transition-colors duration-150 select-none ${
                          on
                            ? "bg-[#E8F7FC] text-neutral-950 shadow-[0_0_15px_rgba(232,247,252,0.45)]"
                            : "bg-white/[0.06] text-neutral-300 hover:bg-white/[0.12]"
                        }`}
                      >
                        <span className={`text-[9px] sm:text-[11px] tracking-tight ${on ? "text-neutral-800 font-semibold" : "text-neutral-400"}`}>
                          {item.day}
                        </span>
                        <span className={`text-[11px] sm:text-sm tracking-tight ${on ? "text-neutral-950 font-bold" : "text-neutral-200"}`}>
                          {item.date}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-white/10 text-[11px]">
                  <p className="text-neutral-400">
                    <strong className="text-white font-semibold">{bookedDays.length} workouts</strong> booked. Pay for only those.
                  </p>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.08] text-neutral-300">
                    On demand
                  </span>
                </div>
              </div>
            </div>

            {/* ── Mobile/Tablet Geometric Frames Row (< lg) ── */}
            <div className="lg:hidden mt-6 w-full flex items-center justify-center gap-3 sm:gap-5 overflow-x-auto py-2 px-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              {/* Mini Figure-8 with Starburst */}
              <div className="relative w-20 h-36 shrink-0">
                <Figure8Card src={gymInteriorImg} alt="Gym" className="w-full h-full" />
                <div className="absolute -bottom-2 -right-2">
                  <StarburstBadge src={dumbbellsImg} alt="Strength" size={38} />
                </div>
              </div>

              {/* Mini Quatrefoil */}
              <div className="w-24 h-24 shrink-0">
                <QuatrefoilCard src={heroYogaImg} alt="Yoga" className="w-full h-full" />
              </div>

              {/* Mini Stadium Capsule */}
              <div className="w-28 h-16 shrink-0">
                <StadiumCapsuleCard src={zumbaImg} alt="Zumba" className="w-full h-full" />
              </div>
            </div>

          </div>
        </div>

      {/* ────── BOTTOM ROW: Auto-moving Category Pills (Full-bleed Left to Right Marquee, Hardware Accelerated) ────── */}
      <div className="relative z-20 w-full overflow-hidden py-3 border-t border-white/[0.08] bg-black">
        {/* Hardware-accelerated fade gradient masks on left & right */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="ff-marquee-ltr flex w-max items-center py-0.5">
          {[...ALL_CATEGORIES, ...ALL_CATEGORIES].map((c, idx) => (
            <Link
              key={`${c}-${idx}`}
              href="#download"
              className="rounded-full bg-neutral-900/90 hover:bg-white hover:text-black border border-white/10 px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-semibold text-neutral-200 transition-colors duration-150 whitespace-nowrap mr-2.5 sm:mr-3.5 shrink-0 cursor-pointer select-none hover:scale-105 active:scale-95"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
