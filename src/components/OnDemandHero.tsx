import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import gymInteriorImg from "@/assets/gym_interior_color_1790323279413.jpg";
import heroYogaImg from "@/assets/hero-card-yoga.jpg";
import zumbaImg from "@/assets/zumba.jpg";
import dumbbellsImg from "@/assets/dumbbells_color_1790323293289.jpg";
import logo from "@/assets/blue-background-logo.png";

// Real current week interface & dynamic calculator
export interface WeekDay {
  day: string;
  date: number;
  month: string;
  isToday: boolean;
  dayIndex: number;
}

export function getRealCurrentWeek(): WeekDay[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday...
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + diffToMonday);

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return dayNames.map((dayName, idx) => {
    const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + idx);
    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
    return {
      day: dayName,
      date: d.getDate(),
      month: d.toLocaleString("en-US", { month: "short" }),
      isToday,
      dayIndex: idx,
    };
  });
}

// Inline SVGs for Apple and Google Play store buttons
const AppleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.66-.99 1.73-.85 2.76 1 .08 2.03-.52 2.55-1.26z" />
  </svg>
);

const GooglePlayIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.37-.306-.61-.774-.61-1.312V3.126c0-.538.24-1.006.609-1.312zm11.234 11.236l2.182-2.183-11.7-6.66 9.518 8.843zm2.182-3.896l2.97 1.691c.78.444.78 1.168 0 1.612l-2.97 1.691-2.473-2.473 2.473-2.521zM5.325 21.793l11.7-6.66-2.182-2.183-9.518 8.843z" />
  </svg>
);

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
  // Dynamically computed real current week (Monday - Sunday)
  const [weekDays] = useState<WeekDay[]>(() => getRealCurrentWeek());
  // Pre-selected workouts (e.g. Tue, Thu, Fri active demo)
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

              {/* Center Action CTA (Matching "Schedule Now" in Reference Image 1) */}
              <div className="ff-fade mt-5 sm:mt-6 flex justify-center">
                <Link
                  href="#download"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-full bg-[#E8F7FC] hover:bg-white text-neutral-950 px-6 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-base font-bold shadow-[0_0_35px_rgba(232,247,252,0.4),0_10px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8F7FC]"
                >
                  <span>Find a workout that fits your day</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
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

          {/* ────── DOCKED BOTTOM BENTO CARD (Matching Reference Image 1 Black Card) ────── */}
          <div className="relative z-20 w-full mt-6 sm:mt-10 mb-2">
            <div className="relative w-full rounded-2xl sm:rounded-3xl md:rounded-[36px] bg-[#070709] border border-white/10 p-4 sm:p-7 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden">
              {/* Subtle Ambient Sparkles inside Card (Matching Reference Image 1) */}
              <SparkleStar size={16} color="#E8F7FC" className="absolute top-4 right-[44%] opacity-40 hidden md:block" />
              <SparkleStar size={12} color="#E8F7FC" className="absolute bottom-4 left-[28%] opacity-30 hidden md:block" />
              <SparkleStar size={14} color="#E8F7FC" className="absolute top-8 left-[14%] opacity-25 hidden md:block" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* ── Left Column: Tag, Headline, Download Now CTA, Android & iOS buttons ── */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    {/* Tag matching "Featured Events" in reference */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E8F7FC] font-semibold mb-2.5">
                      <Bookmark className="w-3.5 h-3.5 text-[#E8F7FC] fill-[#E8F7FC]/30" />
                      <span>FITNESS ON DEMAND</span>
                    </div>

                    {/* Headline in editorial serif */}
                    <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.85rem] text-white font-normal leading-snug tracking-tight">
                      Busy weeks happen. Your fitness spending should fit your routine.
                    </h3>
                  </div>

                  {/* Download Now Button & Underneath Android + iOS Store Buttons */}
                  <div className="mt-5 flex flex-col gap-3">
                    <div>
                      <Link
                        href="#download"
                        id="download"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8F7FC] hover:bg-white text-neutral-950 px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(232,247,252,0.4)] transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        <span>Download Now</span>
                        <span>→</span>
                      </Link>
                    </div>

                    {/* "uske neeche 2 button android and ios ka" */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                      <a
                        href="https://apps.apple.com/in/app/fitfare-pay-per-go-fitness/id6797875405"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 px-3.5 py-1.5 text-xs text-neutral-200 hover:text-white transition-all duration-150 hover:scale-105 active:scale-95"
                        title="Download on Apple App Store"
                      >
                        <AppleIcon className="w-4 h-4 text-white fill-current shrink-0" />
                        <span className="text-[11px] font-semibold">App Store</span>
                      </a>

                      <a
                        href="https://play.google.com/store/apps/details?id=in.fitfare.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 px-3.5 py-1.5 text-xs text-neutral-200 hover:text-white transition-all duration-150 hover:scale-105 active:scale-95"
                        title="Get it on Google Play"
                      >
                        <GooglePlayIcon className="w-3.5 h-3.5 text-white fill-current shrink-0" />
                        <span className="text-[11px] font-semibold">Google Play</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ── Middle Column: Pricing info, Options from ₹14/day to ₹500+.*, disclaimer ── */}
                <div className="lg:col-span-3 flex flex-col justify-center border-t lg:border-t-0 lg:border-l lg:border-r border-white/10 pt-4 lg:pt-0 lg:px-6">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Flexible Workout Passes
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                    Options from <span className="text-[#E8F7FC] font-semibold">₹14/day</span> to <span className="text-neutral-200">₹500+.*</span>
                  </div>
                  <div className="h-px bg-white/10 my-3 w-full" />
                  <p className="text-[10px] sm:text-[11px] text-neutral-400 italic leading-relaxed">
                    *Prices vary by centre, activity and booking. Check the app for current rates and availability.
                  </p>
                </div>

                {/* ── Right Column: Real Current Week Calendar (Where photo was in Image 1) ── */}
                <div className="lg:col-span-4">
                  <div className="relative w-full rounded-2xl sm:rounded-[26px] bg-[#111116] border border-white/10 p-2.5 sm:p-4 text-white shadow-xl">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="flex items-center gap-1.5 sm:gap-2 font-medium text-neutral-200 text-[11px] sm:text-xs">
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="ff-ping absolute inset-0 rounded-full bg-[#E8F7FC] opacity-75" />
                          <span className="relative h-2 w-2 rounded-full bg-[#E8F7FC] shadow-[0_0_8px_rgba(232,247,252,0.7)]" />
                        </span>
                        This week ({weekDays[0]?.month} {weekDays[0]?.date} – {weekDays[6]?.month} {weekDays[6]?.date})
                      </span>
                      <span className="font-bold text-[#E8F7FC] text-[11px] sm:text-xs shrink-0">From ₹14/day</span>
                    </div>

                    {/* 7 Days of the real current week */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-1.5 w-full">
                      {weekDays.map((item, index) => {
                        const on = bookedDays.includes(index);
                        return (
                          <button
                            key={item.day}
                            type="button"
                            onClick={() => toggleDay(index)}
                            title={`${item.day}, ${item.month} ${item.date}${item.isToday ? ' (Today)' : ''} - Click to toggle`}
                            className={`group relative flex flex-col items-center justify-between rounded-lg sm:rounded-2xl h-13 sm:h-16 py-1 sm:py-1.5 min-w-0 px-0.5 sm:px-1 transition-all duration-150 select-none ${
                              on
                                ? "bg-[#E8F7FC] text-neutral-950 font-bold shadow-[0_0_15px_rgba(232,247,252,0.45)] scale-105"
                                : item.isToday
                                ? "bg-white/[0.12] text-white border border-[#E8F7FC]/40 hover:bg-white/[0.18]"
                                : "bg-white/[0.05] text-neutral-300 hover:bg-white/[0.12]"
                            }`}
                          >
                            <span className={`text-[8.5px] sm:text-[10px] uppercase font-semibold ${on ? "text-neutral-800" : item.isToday ? "text-[#E8F7FC]" : "text-neutral-400"}`}>
                              {item.day}
                            </span>
                            <span className={`text-xs sm:text-sm font-bold ${on ? "text-neutral-950" : "text-white"}`}>
                              {item.date}
                            </span>
                            {item.isToday && !on && (
                              <span className="w-1 h-1 rounded-full bg-[#E8F7FC]" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/10 text-[10.5px] sm:text-[11px]">
                      <p className="text-neutral-300">
                        <strong className="text-white font-semibold">{bookedDays.length} workouts</strong> booked. Pay for only those.
                      </p>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E8F7FC]/15 text-[#E8F7FC] border border-[#E8F7FC]/25 shrink-0 ml-1">
                        On Demand
                      </span>
                    </div>
                  </div>
                </div>

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
