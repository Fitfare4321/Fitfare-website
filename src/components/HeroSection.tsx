import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Card images
import heroCardGym from "@/assets/hero-card-gym.jpg";
import heroCardYoga from "@/assets/hero-card-yoga.jpg";
import strengthImg from "@/assets/strength.jpg";
import cardioImg from "@/assets/cardio.jpg";
import kickboxingImg from "@/assets/kickboxing.jpg";
import yogaImg from "@/assets/yoga.jpg";
import zumbaImg from "@/assets/zumba.jpg";

// ── 4 Columns: outer = small, inner = big ──
// Col 1 (far left — smallest)
const col1Cards = [
  { src: cardioImg, label: "CARDIO" },
  { src: yogaImg, label: "WELLNESS" },
  { src: zumbaImg, label: "ZUMBA" },
];

// Col 2 (inner left — biggest)
const col2Cards = [
  { src: heroCardGym, label: "GYM" },
  { src: strengthImg, label: "STRENGTH" },
  { src: kickboxingImg, label: "KICKBOXING" },
  { src: heroCardYoga, label: "YOGA" },
];

// Col 3 (inner right — biggest)
const col3Cards = [
  { src: heroCardYoga, label: "YOGA" },
  { src: heroCardGym, label: "FITNESS" },
  { src: zumbaImg, label: "MOVEMENT" },
  { src: strengthImg, label: "POWER" },
];

// Col 4 (far right — smallest)
const col4Cards = [
  { src: kickboxingImg, label: "BOXING" },
  { src: cardioImg, label: "HIIT" },
  { src: yogaImg, label: "STRETCH" },
];

const marqueeItems = [
  "FITNESS EXPERTS",
  "ELITE COACHES",
  "PERSONAL TRAINERS",
  "SPORTS INSTRUCTORS",
];

// ── Size config per column ──
type CardSize = "xs" | "sm" | "lg";

const sizeClasses: Record<CardSize, { card: string; radius: string }> = {
  xs: {
    card: "w-[120px] sm:w-[150px] md:w-[180px]",
    radius: "rounded-[1rem] sm:rounded-[1.3rem]",
  },
  sm: {
    card: "w-[150px] sm:w-[190px] md:w-[220px]",
    radius: "rounded-[1.2rem] sm:rounded-[1.5rem]",
  },
  lg: {
    card: "w-[220px] sm:w-[280px] md:w-[340px]",
    radius: "rounded-[1.5rem] sm:rounded-[2rem]",
  },
};

// ── Card Component ──
const FloatingCard = ({
  src,
  label,
  size,
}: {
  src: string;
  label: string;
  size: CardSize;
}) => {
  const s = sizeClasses[size];
  return (
    <div
      className={`relative overflow-hidden flex-shrink-0 group ${s.card} ${s.radius}`}
      style={{ aspectRatio: "3/4" }}
    >
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        loading="eager"
      />
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />



      {/* Inner ring */}
      <div
        className={`absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none ${s.radius}`}
      />

      {/* Glass sheen */}
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
    </div>
  );
};

// ── Column wrapper with vertical scroll ──
const ScrollColumn = ({
  cards,
  size,
  speed,
  offsetY = 0,
  direction = "up",
}: {
  cards: { src: string; label: string }[];
  size: CardSize;
  speed: number;
  offsetY?: number;
  direction?: "up" | "down";
}) => {
  const animName = direction === "up" ? "scrollUp" : "scrollDown";

  return (
    <div
      className="relative overflow-hidden"
      style={{
        marginTop: `${offsetY}px`,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div
        className="flex flex-col gap-5 sm:gap-7"
        style={{
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        {/* Duplicate cards for seamless loop */}
        {[...cards, ...cards].map((card, i) => (
          <FloatingCard key={`${card.label}-${i}`} src={card.src} label={card.label} size={size} />
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="home"
      className="sticky top-0 h-screen w-full overflow-hidden bg-[#eceef1] dark:bg-[#060608] transition-colors duration-500 z-0"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#00000006_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#ffffff04_1px,transparent_1px)] [background-size:26px_26px]" />

        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, -15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#305CDE]/[0.05] dark:bg-[#305CDE]/[0.07] blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -35, 0], y: [0, 20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] dark:bg-cyan-400/[0.05] blur-[130px]"
        />
      </div>

      {/* ── 4 CARD COLUMNS ── */}
      {/* 3D perspective: bottom = further (smaller), top = closer (bigger) → zoom-toward-screen */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-end pr-4 sm:pr-10 md:pr-16 pointer-events-none"
        style={{ perspective: "1400px" }}
      >
        <div
          className="flex gap-3 sm:gap-5 md:gap-6 items-start"
          style={{
            transform: "rotateX(-4deg)",
            transformStyle: "preserve-3d",
            transformOrigin: "50% 55%",
            height: "140%",
          }}
        >
          {/* Col 1 — Far Left — Smallest */}
          <ScrollColumn
            cards={col1Cards}
            size="xs"
            speed={32}
            offsetY={60}
            direction="up"
          />

          {/* Col 2 — Inner Left — Biggest */}
          <ScrollColumn
            cards={col2Cards}
            size="lg"
            speed={26}
            offsetY={0}
            direction="down"
          />

          {/* Col 3 — Inner Right — Biggest */}
          <ScrollColumn
            cards={col3Cards}
            size="lg"
            speed={28}
            offsetY={40}
            direction="up"
          />

          {/* Col 4 — Far Right — Smallest */}
          <ScrollColumn
            cards={col4Cards}
            size="xs"
            speed={34}
            offsetY={80}
            direction="down"
          />
        </div>
      </div>

      {/* ── LEFT GRADIENT SCRIM (ensures FITFARE readability) ── */}
      <div className="absolute inset-y-0 left-0 w-[45%] z-20 pointer-events-none bg-gradient-to-r from-[#eceef1] via-[#eceef1]/80 to-transparent dark:from-[#060608] dark:via-[#060608]/80 dark:to-transparent" />

      {/* ── FITFARE TEXT (Bottom-Left — rises and STAYS) ── */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute bottom-20 sm:bottom-16 left-6 sm:left-10 md:left-14 z-30 pointer-events-none select-none"
      >
        <h1
          className="text-[clamp(4rem,14vw,12rem)] font-black tracking-[-0.06em] leading-[0.82] text-black dark:text-white"
          style={{
            fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
            textShadow: "0 2px 40px rgba(0,0,0,0.08)",
          }}
        >
          FIT
          <br />
          FARE
        </h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-3 sm:mt-5 text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-black dark:text-gray-400"
        >
          FITNESS, YOUR WAY
        </motion.p>
      </motion.div>


      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
