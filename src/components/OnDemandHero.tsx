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

// 2. Double-Lobed Figure-8 Card (BlooZoom Slanted Organic Silhouette)
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

  // Exact BlooZoom organic silhouette: two slanted capsules with deep right notch and smooth left waist
  const perimeterPath =
    "M 219.0 0.0 C 220.8 -0.1, 222.1 0.0, 224.4 0.0 C 226.6 0.0, 229.7 -0.1, 232.4 0.0 C 235.1 0.1, 237.8 0.1, 240.4 0.4 C 243.1 0.7, 245.8 1.2, 248.5 1.8 C 251.2 2.4, 253.9 3.2, 256.5 4.2 C 259.2 5.2, 261.9 6.5, 264.6 7.9 C 267.2 9.3, 270.0 11.1, 272.5 12.8 C 274.9 14.5, 277.1 16.2, 279.3 18.2 C 281.5 20.1, 283.7 22.3, 285.6 24.4 C 287.5 26.6, 289.1 28.7, 290.8 31.1 C 292.5 33.6, 294.3 36.4, 295.7 39.0 C 297.2 41.7, 298.3 44.4, 299.4 47.1 C 300.5 49.8, 301.5 52.5, 302.3 55.3 C 303.0 58.0, 303.6 60.9, 304.1 63.5 C 304.5 66.1, 304.8 68.4, 305.0 70.9 C 305.1 73.4, 305.2 75.9, 305.1 78.4 C 305.0 80.8, 304.8 83.2, 304.4 85.8 C 304.0 88.4, 303.4 91.2, 302.7 93.9 C 302.0 96.5, 301.2 99.1, 300.2 101.6 C 299.2 104.1, 298.1 106.6, 296.9 109.1 C 295.7 111.5, 294.5 113.7, 293.0 116.1 C 291.5 118.4, 289.8 120.9, 287.8 123.2 C 285.9 125.5, 283.7 127.9, 281.4 130.1 C 279.1 132.2, 276.6 134.3, 274.1 136.2 C 271.6 138.0, 269.1 139.6, 266.5 141.1 C 264.0 142.5, 261.4 143.7, 258.8 145.0 C 256.1 146.2, 253.4 147.5, 250.7 148.4 C 248.1 149.0, 245.4 149.6, 242.7 150.2 C 243.9 151.1, 245.0 151.9, 246.3 152.8 C 247.9 153.6, 250.3 154.0, 252.5 154.8 C 254.7 155.6, 257.0 156.4, 259.5 157.5 C 262.0 158.6, 264.9 160.0, 267.4 161.5 C 270.0 163.0, 272.4 164.7, 274.9 166.6 C 277.3 168.4, 279.9 170.6, 282.2 172.8 C 284.4 175.0, 286.5 177.5, 288.4 180.0 C 290.4 182.4, 292.3 185.1, 293.9 187.7 C 295.5 190.4, 296.8 193.2, 298.1 195.9 C 299.4 198.6, 300.6 201.4, 301.5 204.1 C 302.5 206.8, 303.2 209.6, 303.8 212.3 C 304.3 215.0, 304.7 217.7, 305.0 220.3 C 305.2 223.0, 305.2 225.7, 305.1 228.4 C 305.0 231.1, 304.9 233.7, 304.5 236.4 C 304.2 239.1, 303.7 241.8, 303.0 244.5 C 302.3 247.2, 301.5 249.8, 300.5 252.5 C 299.5 255.2, 298.4 257.9, 297.1 260.6 C 295.7 263.2, 294.2 265.9, 292.4 268.6 C 290.7 271.3, 288.6 274.1, 286.3 276.6 C 284.1 279.2, 281.5 281.7, 278.9 283.9 C 276.3 286.2, 273.5 288.2, 270.8 290.1 C 268.1 291.9, 265.4 293.4, 262.6 294.8 C 259.9 296.2, 257.2 297.3, 254.5 298.4 C 251.7 299.5, 249.0 300.4, 246.3 301.2 C 243.6 302.1, 240.9 302.7, 238.2 303.5 C 235.5 304.2, 232.8 304.8, 230.2 305.5 C 227.5 306.3, 224.8 307.1, 222.1 307.8 C 219.4 308.5, 216.8 309.1, 214.1 309.9 C 211.4 310.6, 208.7 311.4, 206.0 312.1 C 203.4 312.8, 200.7 313.5, 198.0 314.2 C 195.3 314.9, 192.6 315.6, 189.9 316.3 C 187.3 317.0, 184.6 317.8, 181.9 318.5 C 179.2 319.2, 176.5 319.9, 173.9 320.6 C 171.2 321.3, 168.5 322.1, 165.8 322.8 C 163.1 323.6, 160.3 324.2, 157.6 324.9 C 154.9 325.6, 152.2 326.4, 149.4 327.2 C 146.7 327.9, 143.9 328.7, 141.2 329.4 C 138.5 330.1, 135.9 330.8, 133.2 331.5 C 130.5 332.2, 127.8 332.9, 125.1 333.6 C 122.5 334.2, 119.8 334.8, 117.1 335.3 C 114.4 335.9, 111.7 336.4, 109.1 336.7 C 106.4 337.0, 103.7 337.1, 101.0 337.1 C 98.3 337.1, 95.6 337.0, 93.0 336.7 C 90.3 336.4, 87.6 336.0, 84.9 335.3 C 82.2 334.7, 79.6 333.9, 76.9 333.0 C 74.2 332.0, 71.5 331.0, 68.8 329.7 C 66.1 328.4, 63.4 326.8, 60.8 325.1 C 58.2 323.4, 55.5 321.5, 53.0 319.4 C 50.5 317.3, 48.0 314.8, 45.7 312.4 C 43.5 310.0, 41.4 307.4, 39.5 304.8 C 37.6 302.2, 35.9 299.4, 34.4 296.8 C 33.0 294.1, 31.9 291.3, 30.8 288.7 C 29.8 286.1, 29.0 283.6, 28.3 281.0 C 27.6 278.4, 27.1 275.8, 26.7 273.2 C 26.2 270.6, 25.9 268.1, 25.8 265.5 C 25.6 262.9, 25.6 260.3, 25.8 257.7 C 25.9 255.1, 26.1 252.6, 26.5 250.0 C 26.9 247.4, 27.5 244.9, 28.2 242.2 C 28.9 239.6, 29.7 236.8, 30.7 234.2 C 31.7 231.6, 32.8 229.0, 34.1 226.4 C 35.5 223.9, 37.0 221.2, 38.7 218.7 C 40.4 216.2, 42.4 213.7, 44.4 211.4 C 46.4 209.1, 48.7 206.8, 50.9 204.7 C 53.2 202.6, 55.6 200.7, 58.1 199.0 C 60.6 197.3, 63.1 195.8, 65.7 194.4 C 68.3 193.0, 71.1 191.7, 73.7 190.7 C 76.4 189.6, 79.7 188.9, 81.8 188.2 C 83.8 187.4, 85.6 186.7, 86.1 186.1 C 86.7 185.4, 86.3 184.9, 85.1 184.1 C 83.8 183.4, 81.0 182.6, 78.7 181.8 C 76.3 180.9, 73.4 179.8, 70.9 178.8 C 68.4 177.8, 66.1 176.9, 63.8 175.6 C 61.4 174.4, 59.1 172.8, 56.9 171.2 C 54.7 169.6, 52.5 168.0, 50.4 166.1 C 48.2 164.2, 46.0 161.9, 44.1 159.7 C 42.2 157.5, 40.3 155.3, 38.7 152.8 C 37.1 150.4, 35.7 147.9, 34.4 145.3 C 33.1 142.6, 32.0 139.7, 31.0 137.2 C 30.0 134.7, 29.1 132.5, 28.5 130.2 C 27.8 127.9, 27.2 125.5, 26.8 123.2 C 26.4 120.9, 26.1 118.7, 25.9 116.2 C 25.7 113.7, 25.7 110.8, 25.8 108.2 C 25.8 105.5, 25.9 102.8, 26.2 100.1 C 26.5 97.4, 26.9 94.8, 27.6 92.1 C 28.2 89.4, 29.0 86.6, 29.9 83.9 C 30.9 81.1, 32.2 78.4, 33.5 75.7 C 34.9 73.0, 36.6 70.2, 38.1 67.8 C 39.7 65.4, 41.2 63.3, 42.9 61.2 C 44.6 59.1, 46.4 57.2, 48.4 55.3 C 50.4 53.4, 52.5 51.7, 54.8 49.9 C 57.2 48.1, 59.9 46.2, 62.6 44.5 C 65.2 42.9, 67.9 41.5, 70.6 40.2 C 73.3 39.0, 76.0 37.9, 78.7 36.9 C 81.3 36.0, 84.0 35.3, 86.7 34.6 C 89.4 33.8, 92.1 33.2, 94.7 32.5 C 97.4 31.8, 100.1 31.1, 102.8 30.4 C 105.5 29.7, 108.1 28.9, 110.8 28.2 C 113.5 27.4, 116.3 26.7, 119.0 25.9 C 121.8 25.2, 124.5 24.5, 127.2 23.7 C 129.9 22.9, 132.7 22.0, 135.1 21.3 C 137.5 20.6, 139.5 20.1, 141.7 19.5 C 143.9 18.9, 146.0 18.3, 148.2 17.7 C 150.5 17.2, 152.6 16.8, 155.1 16.2 C 157.6 15.6, 160.4 14.8, 163.1 14.2 C 165.8 13.5, 168.7 12.8, 171.2 12.1 C 173.7 11.3, 175.7 10.5, 178.0 9.8 C 180.3 9.1, 182.6 8.5, 184.9 7.9 C 187.2 7.3, 189.2 6.6, 191.7 6.0 C 194.2 5.3, 197.1 4.8, 199.8 4.2 C 202.5 3.5, 205.7 2.7, 208.0 2.1 C 210.3 1.5, 211.6 1.1, 213.5 0.7 C 215.3 0.4, 217.2 0.1, 219.0 0.0 Z";

  return (
    <div className={`relative group cursor-pointer ${className}`}>
      <svg
        viewBox="0 0 320 338"
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
          width="320"
          height="338"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          className="transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Subtle Specular Glass Sheen Overlay */}
        <rect
          width="320"
          height="338"
          fill={`url(#${shineId})`}
          clipPath={`url(#${clipId})`}
          pointerEvents="none"
        />

        {/* Hairline Luxury Rim Highlight (Only along the outer perimeter) */}
        <path
          d={perimeterPath}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
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
            <div className="hidden lg:block absolute left-0 xl:left-2 top-2 xl:top-4 w-[265px] xl:w-[310px] h-[280px] xl:h-[328px] z-10 animate-float-slow pointer-events-auto">
              <Figure8Card src={gymInteriorImg} alt="Fitness Gym Facility" className="w-full h-full" />
              {/* Starburst Badge Docked at Lower-Right of Figure-8 (Matching BlooZoom Reference) */}
              <div className="absolute -bottom-16 right-3 xl:-bottom-20 xl:right-6 z-20">
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
              <div className="relative w-24 h-[101px] shrink-0">
                <Figure8Card src={gymInteriorImg} alt="Gym" className="w-full h-full" />
                <div className="absolute -bottom-5 -right-1">
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

                  {/* Download Now as text + Large App Store & Google Play Buttons */}
                  <div className="mt-5 flex flex-col gap-2.5">
                    <div id="download" className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span>Download Now</span>
                      <span className="text-xs text-neutral-400 font-normal">for iOS & Android</span>
                    </div>

                    {/* Increased size App Store & Play Store buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-0.5">
                      <a
                        href="https://apps.apple.com/in/app/fitfare-pay-per-go-fitness/id6797875405"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 hover:border-white/40 px-4 sm:px-5 py-2.5 sm:py-3 text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                        title="Download on Apple App Store"
                      >
                        <AppleIcon className="w-6 h-6 text-white fill-current shrink-0 transition-transform group-hover:scale-110" />
                        <div className="text-left leading-none">
                          <span className="text-[9.5px] block uppercase tracking-wider text-neutral-400 font-medium mb-1">
                            Download on the
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                            App Store
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://play.google.com/store/apps/details?id=in.fitfare.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 hover:border-white/40 px-4 sm:px-5 py-2.5 sm:py-3 text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                        title="Get it on Google Play"
                      >
                        <GooglePlayIcon className="w-5 h-5 text-white fill-current shrink-0 transition-transform group-hover:scale-110" />
                        <div className="text-left leading-none">
                          <span className="text-[9.5px] block uppercase tracking-wider text-neutral-400 font-medium mb-1">
                            Get it on
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                            Google Play
                          </span>
                        </div>
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
