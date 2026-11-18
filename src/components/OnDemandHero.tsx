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
  color = "#60a5fa",
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
    style={{ filter: `drop-shadow(0 0 8px ${color})` }}
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
    stroke="#818cf8"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ filter: "drop-shadow(0 0 8px rgba(129,140,248,0.5))" }}
  >
    <path d="M10 22 C 18 42, 38 42, 44 20" />
    <path d="M33 17 L 44 20 L 44 31" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   GEOMETRIC ARTISTIC PHOTO FRAMES
   Matches uploaded screenshots: Sacred geometry arcs, frosted glowing glass,
   specular sheen & ambient aurora halos
   ───────────────────────────────────────────────────────────────────────────── */

// 1. Quatrefoil / 4-Leaf Clover Rosette (Matching Screenshot 1)
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
  const glowId = `q-glow-${id}`;
  const shineId = `q-shine-${id}`;

  return (
    <div className={`relative group cursor-pointer ${className}`}>
      {/* Ambient Magenta/Purple Aurora Halo */}
      <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-[45px] pointer-events-none group-hover:bg-purple-600/45 transition-all duration-700" />

      <svg
        viewBox="0 0 320 320"
        className="w-full h-full overflow-visible transition-transform duration-500 ease-out group-hover:scale-105"
        style={{
          filter:
            "drop-shadow(0 25px 45px rgba(0,0,0,0.85)) drop-shadow(0 0 25px rgba(168,85,247,0.4))",
        }}
      >
        <defs>
          {/* Union of 4 circles creating the Quatrefoil silhouette */}
          <clipPath id={clipId}>
            <circle cx="160" cy="110" r="90" />
            <circle cx="160" cy="210" r="90" />
            <circle cx="110" cy="160" r="90" />
            <circle cx="210" cy="160" r="90" />
          </clipPath>

          {/* Soft bloom glow filter for frosted glass borders */}
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glass gloss sheen */}
          <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.32" />
            <stop offset="45%" stopColor="white" stopOpacity="0.06" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The Clipped Photo (Centered perfectly on yoga posture) */}
        <image
          href={src}
          x="0"
          y="-30"
          width="320"
          height="380"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Specular Glass Sheen Overlay */}
        <rect
          width="320"
          height="320"
          fill={`url(#${shineId})`}
          clipPath={`url(#${clipId})`}
          pointerEvents="none"
        />

        {/* Outer Frosted Glass Rim (Soft glowing backing stroke) */}
        <circle cx="160" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" filter={`url(#${glowId})`} />
        <circle cx="160" cy="210" r="90" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" filter={`url(#${glowId})`} />
        <circle cx="110" cy="160" r="90" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" filter={`url(#${glowId})`} />
        <circle cx="210" cy="160" r="90" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" filter={`url(#${glowId})`} />

        {/* 4 Overlapping Sacred Geometry Circles (Internal Petals & Luminous Rim) */}
        <circle
          cx="160"
          cy="110"
          r="90"
          fill="none"
          stroke="rgba(255,255,255,0.78)"
          strokeWidth="2.4"
          className="transition-colors duration-300 group-hover:stroke-white"
        />
        <circle
          cx="160"
          cy="210"
          r="90"
          fill="none"
          stroke="rgba(255,255,255,0.78)"
          strokeWidth="2.4"
          className="transition-colors duration-300 group-hover:stroke-white"
        />
        <circle
          cx="110"
          cy="160"
          r="90"
          fill="none"
          stroke="rgba(255,255,255,0.78)"
          strokeWidth="2.4"
          className="transition-colors duration-300 group-hover:stroke-white"
        />
        <circle
          cx="210"
          cy="160"
          r="90"
          fill="none"
          stroke="rgba(255,255,255,0.78)"
          strokeWidth="2.4"
          className="transition-colors duration-300 group-hover:stroke-white"
        />

        {/* Center Intersection Crystal Flairs */}
        <circle
          cx="160"
          cy="160"
          r="4"
          fill="white"
          opacity="0.95"
          style={{ filter: "drop-shadow(0 0 8px white)" }}
        />
        <circle
          cx="160"
          cy="160"
          r="1.5"
          fill="#fdf4ff"
        />
      </svg>
    </div>
  );
};

// 2. Double-Lobed Figure-8 Card (Matching Screenshot 2)
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
  const glowId = `f8-glow-${id}`;
  const shineId = `f8-shine-${id}`;

  return (
    <div className={`relative group cursor-pointer ${className}`}>
      {/* Ambient Electric Blue Aurora Halo */}
      <div className="absolute inset-0 bg-blue-600/28 rounded-full blur-[55px] pointer-events-none group-hover:bg-blue-600/45 transition-all duration-700" />

      <svg
        viewBox="0 0 300 620"
        className="w-full h-full overflow-visible transition-transform duration-500 ease-out group-hover:scale-105"
        style={{
          filter:
            "drop-shadow(0 30px 60px rgba(0,0,0,0.92)) drop-shadow(0 0 35px rgba(59,130,246,0.4))",
        }}
      >
        <defs>
          {/* Union of 2 circles creating the Figure-8 silhouette */}
          <clipPath id={clipId}>
            <circle cx="150" cy="195" r="135" />
            <circle cx="150" cy="415" r="140" />
          </clipPath>

          {/* Soft bloom glow filter for frosted glass borders */}
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glass gloss sheen */}
          <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.28" />
            <stop offset="45%" stopColor="white" stopOpacity="0.05" />
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
          className="transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Specular Glass Sheen Overlay */}
        <rect
          width="300"
          height="620"
          fill={`url(#${shineId})`}
          clipPath={`url(#${clipId})`}
          pointerEvents="none"
        />

        {/* Outer Frosted Glass Rim (Soft glowing backing stroke) */}
        <circle cx="150" cy="195" r="135" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="7" filter={`url(#${glowId})`} />
        <circle cx="150" cy="415" r="140" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="7" filter={`url(#${glowId})`} />

        {/* 2 Overlapping Geometric Circles (Waist Crossover Arcs) */}
        <circle
          cx="150"
          cy="195"
          r="135"
          fill="none"
          stroke="rgba(255,255,255,0.82)"
          strokeWidth="2.8"
          className="transition-colors duration-300 group-hover:stroke-white"
        />
        <circle
          cx="150"
          cy="415"
          r="140"
          fill="none"
          stroke="rgba(255,255,255,0.82)"
          strokeWidth="2.8"
          className="transition-colors duration-300 group-hover:stroke-white"
        />
      </svg>
    </div>
  );
};

// 3. 12-Point Starburst Badge (Docked with Figure-8 as shown in Screenshot 2)
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

  return (
    <div className={`relative group cursor-pointer ${className}`}>
      {/* Cyan/Teal Neon Glow */}
      <div className="absolute inset-0 bg-cyan-400/50 rounded-full blur-[20px] pointer-events-none group-hover:bg-cyan-400/70 transition-all duration-500" />

      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="overflow-visible animate-spin-very-slow transition-transform duration-500 ease-out group-hover:scale-115"
        style={{
          filter:
            "drop-shadow(0 15px 30px rgba(0,0,0,0.85)) drop-shadow(0 0 20px rgba(6,182,212,0.8))",
        }}
      >
        <defs>
          <clipPath id={clipId}>
            <polygon points="50.0,2.0 59.3,15.2 74.0,8.4 75.5,24.5 91.6,26.0 84.8,40.7 98.0,50.0 84.8,59.3 91.6,74.0 75.5,75.5 74.0,91.6 59.3,84.8 50.0,98.0 40.7,84.8 26.0,91.6 24.5,75.5 8.4,74.0 15.2,59.3 2.0,50.0 15.2,40.7 8.4,26.0 24.5,24.5 26.0,8.4 40.7,15.2" />
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

        {/* Frosted Glass Outline Border */}
        <polygon
          points="50.0,2.0 59.3,15.2 74.0,8.4 75.5,24.5 91.6,26.0 84.8,40.7 98.0,50.0 84.8,59.3 91.6,74.0 75.5,75.5 74.0,91.6 59.3,84.8 50.0,98.0 40.7,84.8 26.0,91.6 24.5,75.5 8.4,74.0 15.2,59.3 2.0,50.0 15.2,40.7 8.4,26.0 24.5,24.5 26.0,8.4 40.7,15.2"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2.4"
          className="transition-colors duration-300 group-hover:stroke-white"
        />
      </svg>
    </div>
  );
};

// 4. Stadium Capsule Pill
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
    {/* Sapphire-Blue Ambient Halo */}
    <div className="absolute inset-0 bg-blue-600/30 rounded-full blur-[35px] pointer-events-none group-hover:bg-blue-600/45 transition-all duration-700" />

    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(59,130,246,0.4)] transition-transform duration-500 ease-out group-hover:scale-105">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* Specular Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
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
    <section className="ff relative bg-[#060608] p-2 text-white sm:p-3 lg:p-4 overflow-hidden">
      {/* ── Global Styles & Keyframe Animations ── */}
      <style>{`
        @keyframes ff-rise {
          from { transform: translateY(110%); }
          to { transform: none; }
        }
        @keyframes ff-pop {
          from { opacity: 0; transform: scale(.97); }
          to { opacity: 1; transform: none; }
        }
        @keyframes ff-fade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes ff-ping {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes ff-marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes ff-float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.6deg); }
        }
        @keyframes ff-float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-0.8deg); }
        }
        @keyframes ff-float-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes ff-spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ff-pulse-glow {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.08); }
        }

        .ff-pop { animation: ff-pop .9s cubic-bezier(.2,.8,.2,1) both; }
        .ff-fade { animation: ff-fade .9s cubic-bezier(.2,.8,.2,1) both; }
        .ff-rise { animation: ff-rise 1s cubic-bezier(.2,.8,.2,1) both; }
        .ff-ping { animation: ff-ping 2s cubic-bezier(0,0,.2,1) infinite; }
        .ff-marquee-ltr { animation: ff-marquee-ltr 32s linear infinite; }
        .ff-marquee-ltr:hover { animation-play-state: paused; }
        .animate-float-slow { animation: ff-float-slow 6.5s ease-in-out infinite; }
        .animate-float-delayed { animation: ff-float-delayed 7.5s ease-in-out infinite; animation-delay: -2.5s; }
        .animate-float-reverse { animation: ff-float-reverse 6s ease-in-out infinite; animation-delay: -1.5s; }
        .animate-spin-very-slow { animation: ff-spin-very-slow 35s linear infinite; }
        .animate-pulse-glow { animation: ff-pulse-glow 5s ease-in-out infinite alternate; }

        @media (prefers-reduced-motion: reduce) {
          .ff * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="relative max-w-[1440px] mx-auto">
        {/* ───────── Main Hero Board (Curved Luxury Dark Tile) ───────── */}
        <div className="ff-pop relative flex min-h-[calc(100svh-1rem)] sm:min-h-[calc(100svh-1.5rem)] flex-col justify-between overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#07090e] border border-white/[0.08] shadow-[0_25px_70px_rgba(0,0,0,0.85)] px-4 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:px-10 lg:pb-8 lg:pt-6">
          
          {/* ── Background: Topographic Contour Waves & Radiant Glow Orbs ── */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Ambient Aurora Orbs */}
            <div className="absolute top-1/4 -left-20 w-[460px] h-[460px] bg-blue-600/15 rounded-full blur-[130px] animate-pulse-glow" />
            <div className="absolute top-1/6 right-0 w-[420px] h-[420px] bg-purple-600/15 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: "-2.5s" }} />
            <div className="absolute bottom-10 left-1/3 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-[150px]" />

            {/* Subtle Diagonal Topographic Contour Lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35"
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
            >
              <path d="M-100 150 C320 280, 680 80, 1540 380" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
              <path d="M-100 210 C340 340, 700 140, 1540 440" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
              <path d="M-100 270 C360 400, 720 200, 1540 500" stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" />
              <path d="M-100 330 C380 460, 740 260, 1540 560" stroke="rgba(255,255,255,0.04)" strokeWidth="1.2" />
              <path d="M-100 390 C400 520, 760 320, 1540 620" stroke="rgba(255,255,255,0.04)" strokeWidth="1.2" />
            </svg>
          </div>

          {/* ────── TOP ROW: Brand Header & Left-to-Right Category Marquee ────── */}
          <div className="relative z-20 w-full flex flex-col gap-3.5">
            {/* Top Bar with Brand Logo and Action */}
            <div className="flex items-center justify-between">
              <Link href="/" className="group flex items-center gap-2.5">
                <img
                  src={logo}
                  alt="FitFare Logo"
                  className="h-8 w-auto rounded-lg shadow-md group-hover:scale-105 transition-transform"
                />
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                  Fit<span className="text-blue-500">Fare</span>
                  <span className="text-blue-400">.</span>
                </span>
              </Link>

              {/* Minimalist Header Action / Tag */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-xs font-semibold text-neutral-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Fitness On Demand
                </span>
              </div>
            </div>

            {/* Auto-moving Category Pills (Left to Right Marquee) */}
            <div className="relative w-full overflow-hidden py-1 -mx-4 sm:-mx-8 lg:-mx-10 px-4 sm:px-8 lg:px-10 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <div className="ff-marquee-ltr flex w-max items-center py-0.5 will-change-transform">
                {[...ALL_CATEGORIES, ...ALL_CATEGORIES].map((c, idx) => (
                  <Link
                    key={`${c}-${idx}`}
                    href="#download"
                    className="rounded-full bg-black/45 hover:bg-white hover:text-black border border-white/15 px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-semibold text-neutral-200 transition-all duration-200 backdrop-blur-md whitespace-nowrap mr-2.5 sm:mr-3.5 shrink-0 cursor-pointer select-none shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
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

            {/* ── Floating Sparkle Stars & Doodle Arrow (Matches Reference) ── */}
            <SparkleStar size={24} color="#38bdf8" className="hidden lg:block absolute left-[19%] top-[8%] animate-pulse-glow" />
            <SparkleStar size={18} color="#c084fc" className="hidden lg:block absolute right-[32%] top-[10%] animate-pulse-glow" />
            <SparkleStar size={22} color="#60a5fa" className="hidden lg:block absolute right-[34%] bottom-[46%] animate-pulse-glow" />
            <SparkleStar size={16} color="#38bdf8" className="hidden lg:block absolute left-[28%] bottom-[16%] opacity-60" />
            
            {/* Curved Hand-Drawn Doodle Arrow */}
            <DoodleArrow className="hidden lg:block absolute right-[185px] xl:right-[230px] bottom-[125px] xl:bottom-[155px] rotate-[8deg]" />

            {/* ── Core Editorial Typography ── */}
            <div className="relative z-20 text-center max-w-2xl xl:max-w-3xl mx-auto px-2">
              <h1 className="font-serif tracking-tight text-center leading-[1.05] sm:leading-[1.02] select-none">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] font-normal text-white">
                  Paying for a full month.
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] font-normal text-neutral-300 italic mt-1 sm:mt-2">
                  Showing up for a few days?
                </span>
              </h1>

              <p className="ff-fade mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed">
                Busy weeks happen. Your fitness spending should fit your routine.
              </p>

              {/* Main Pill CTA & Pricing Subtext */}
              <div className="ff-fade mt-4 sm:mt-5 flex flex-col items-center gap-2">
                <Link
                  href="#download"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-7 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-bold shadow-[0_0_35px_rgba(37,99,235,0.5),0_10px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span>Find a workout that fits your day</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>

                <div className="text-center">
                  <span className="text-xs sm:text-sm font-medium text-neutral-300">
                    Options from ₹14/day to ₹500+.*
                  </span>
                  <p className="mt-0.5 text-[10.5px] text-neutral-400 italic">
                    *Prices vary by centre, activity and booking. Check the app for current rates and availability.
                  </p>
                </div>
              </div>

              {/* ── Interactive Week Workout Capsule Selector (Fully Responsive) ── */}
              <div className="ff-fade mt-4 sm:mt-5 w-full max-w-sm sm:max-w-md mx-auto rounded-3xl border border-white/10 bg-neutral-950/85 backdrop-blur-xl p-3 text-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-2 font-medium text-neutral-300">
                    <span className="relative flex h-2 w-2">
                      <span className="ff-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    </span>
                    This week
                  </span>
                  <span className="font-semibold text-white">From ₹14/day</span>
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
                        className={`group relative flex flex-col items-center justify-between rounded-full w-9 sm:w-10 h-13 sm:h-14 py-1.5 transition-all duration-300 select-none ${
                          on
                            ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] scale-[1.04]"
                            : "bg-white/[0.06] text-neutral-300 hover:bg-white/[0.12] hover:scale-[1.02]"
                        }`}
                      >
                        <span className={`text-[10px] sm:text-[11px] tracking-tight ${on ? "text-white/90 font-medium" : "text-neutral-400"}`}>
                          {item.day}
                        </span>
                        <span className={`text-xs sm:text-sm tracking-tight ${on ? "text-white font-bold" : "text-neutral-200"}`}>
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

          {/* ────── BOTTOM SUBTLE FOOTER BAR ────── */}
          <div className="relative z-10 w-full pt-2 flex items-center justify-between text-[11px] text-neutral-500 border-t border-white/[0.06]">
            <span>© 2026 FitFare • Fitness On Demand</span>
            <span className="hidden sm:inline">Prepaid Fit Credits • No Lock-in</span>
          </div>

        </div>
      </div>
    </section>
  );
}
