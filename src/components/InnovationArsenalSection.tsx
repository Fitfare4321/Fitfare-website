import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import {
  DollarSign,
  Heart,
  BarChart3,
} from "lucide-react";
import { Globe, Clock, Wallet } from "lucide-react";

/* ---------------- FLOATING ANIMATION ---------------- */
const floatingAnimation = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: [-8, 8, -8],
    transition: {
      duration: 6 + custom,
      repeat: Infinity,
      ease: "easeInOut",
      delay: custom * 0.5,
    },
  }),
};

/* ---------------- FEATURE CARD ---------------- */

const ConnectedNodeFeature = ({ feature, index, isDark }: any) => {
  const Icon = feature.icon;
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      className={`relative z-10 w-full sm:w-[280px] md:w-[280px] lg:w-[280px] xl:w-[280px]`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
        onClick={() => navigate(`/features/${feature.slug}`)}
        className="relative group w-full rounded-[16px] px-5 py-4 cursor-pointer overflow-hidden"
        style={{
          background: isDark ? 'rgba(10, 5, 25, 0.65)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1.2px solid ${feature.accent}`,
          boxShadow: isDark
            ? `0 0 25px ${feature.accent}60, inset 0 0 15px ${feature.accent}30`
            : `0 10px 30px ${feature.accent}40, inset 0 0 10px ${feature.accent}20`,
        }}
      >
        {/* 🔥 HOVER OVERLAY */}
        {/* <div
          className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
          style={{
            background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent)"
          }}
        /> */}
        <div className="flex items-start gap-3 relative z-10">

          {/* ICON CONTAINER */}
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.6)",
              border: `1px solid ${feature.accent}55`,
              boxShadow: `0 0 12px ${feature.accent}30`,
            }}
          >
            <Icon
              className="w-5 h-5"
              strokeWidth={1.7}
              style={{
                color: feature.accent,
              }}
            />
          </div>
          <div className="flex-1 text-left">
            <h4
              className="text-[13px] font-bold leading-tight tracking-wide"
              style={{
                color: isDark ? '#ffffff' : '#0f172a',
                textShadow: isDark ? `0 0 10px ${feature.accent}80` : 'none',
              }}
            >
              {feature.title}
            </h4>
            <p
              className="text-[11px] leading-snug mt-1.5 opacity-80"
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
            >
              {feature.description}
            </p>
            <div className="flex items-center gap-1 mt-3 text-[10px] font-semibold opacity-70 group-hover:opacity-100 transition">
              <span>View Details</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ---------------- SVG CONNECTING LINES (Desktop Only) ---------------- */
// Renders the branching circuit-board-like lines from the center

const ConnectionLines = ({ isDark }: { isDark: boolean }) => {
  const lineColor = isDark ? "rgba(168,85,247,0.4)" : "rgba(168,85,247,0.6)";
  const dotColor = isDark ? "#c084fc" : "#9333ea"; // Purple accent for dots
  const pulseColor = isDark ? "#e879f9" : "#a855f7"; // Brighter pulse color
  const strokeW = 1.5;

const paths = [
  { id: "tl", d: "M 450 360 L 450 240 L 380 240", length: 180, delay: 0 },
  // Extended to reach further up
  { id: "tc", d: "M 600 360 L 600 180", length: 180, delay: 0.5 },
  { id: "tr", d: "M 750 360 L 750 240 L 820 240", length: 180, delay: 1 },
  { id: "bl", d: "M 450 440 L 450 560 L 380 560", length: 180, delay: 1.5 },
  // Extended to reach further down
  { id: "bc", d: "M 600 440 L 600 620", length: 180, delay: 2 },
  { id: "br", d: "M 750 440 L 750 560 L 820 560", length: 180, delay: 2.5 },
];
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex justify-center items-center">
      <svg className="w-full h-full max-w-[1200px]" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glowDark" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter={isDark ? "url(#glowDark)" : ""} stroke={lineColor} strokeLinejoin="round" strokeWidth={strokeW} fill="none">
          {/* Base Static Paths */}
          {paths.map((p) => (
            <path key={p.id} d={p.d} />
          ))}

          {/* Animated Pulsing Lines overlay */}
          {paths.map((p) => (
            <motion.path
              key={`pulse-${p.id}`}
              d={p.d}
              stroke={pulseColor}
              strokeWidth={strokeW * 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#intenseGlow)"
              initial={{ strokeDasharray: `0 ${p.length}`, strokeDashoffset: 0, opacity: 0 }}
              animate={{
                strokeDasharray: [`0 ${p.length}`, `${p.length * 0.4} ${p.length}`, `0 ${p.length}`],
                strokeDashoffset: [0, -p.length * 0.6, -p.length],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Nodes/Dots at Connections */}
          <circle cx="380" cy="240" r="4" fill={dotColor} stroke="none" />
          <circle cx="600" cy="180" r="4" fill={dotColor} stroke="none" />
          <circle cx="820" cy="240" r="4" fill={dotColor} stroke="none" />
          <circle cx="380" cy="560" r="4" fill={dotColor} stroke="none" />
          <circle cx="600" cy="620" r="4" fill={dotColor} stroke="none" />
          <circle cx="820" cy="560" r="4" fill={dotColor} stroke="none" />
        </g>
      </svg>
    </div>
  );
};
const MobileConnectionLines = ({ isDark }: { isDark: boolean }) => {
  const lineColor = isDark
    ? "rgba(168,85,247,0.3)"
    : "rgba(168,85,247,0.5)";
  const pulseColor = isDark ? "#e879f9" : "#a855f7";

  return (
    <div className="absolute top-[80px] bottom-[50px] left-[50%] w-[2px] -translate-x-1/2 pointer-events-none" style={{ background: lineColor }}>
      {/* Container for the pulsing light, hidden overflow so it clips gracefully at top and bottom */}
      <div className="absolute inset-0 overflow-hidden w-full h-full">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[200px] rounded-full"
          style={{
            background: pulseColor,
            boxShadow: `0 0 15px 3px ${pulseColor}`,
            top: 0
          }}
          animate={{
            top: ["-200px", "100%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};


/* ---------------- MAIN COMPONENT ---------------- */
const InnovationArsenal = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

const features = [
    {
      id: "dynamic-price",
      slug: "dynamic-price-allocation",
      icon: DollarSign,
      title: "Dynamic Price Allocation",
      description:
        "AI-powered pricing that adapts to demand, time slots, and peak gym hours.",
      accent: "#a855f7",
    },
    {
      id: "period-tracking",
      slug: "period-tracking-for-women",
      icon: Heart,
      title: "Period Tracking for Women",
      description:
        "Personalized workout and recovery plans aligned with each menstrual phase.",
      accent: "#ec4899",
    },
    {
      id: "professional-dashboard",
      slug: "professional-dashboard-for-club-owners",
      icon: BarChart3,
      title: "Professional Dashboard for Fitness Center Owners",
      description:
        "Advanced analytics, revenue insights, attendance trends, and member management tools.",
      accent: "#3b82f6",
    },
    {
      id: "multiple-clubs",
      slug: "access-to-multiple-clubs-across-cities",
      icon: Globe,
      title: "Access to Multiple Fitness Centers Across Cities",
      description:
        "Train anywhere with seamless check-ins across partnered gyms nationwide.",
      accent: "#06b6d4",
    },
    {
      id: "no-contracts",
      slug: "no-long-term-contracts",
      icon: Clock,
      title: "No Long-Term Contracts",
      description:
        "Complete flexibility with zero lock-ins, cancellation fees, or commitments.",
      accent: "#10b981",
    },
    {
      id: "pay-as-you-go",
      slug: "pay-as-you-go-pricing",
      icon: Wallet,
      title: "Pay-As-You-Go Pricing",
      description:
        "Pay only for sessions you attend — transparent billing with no hidden charges.",
      accent: "#eab308",
    },
  ];

  return (
   <section id="innovation-arsenal" ref={ref} className="py-10 md:py-14 relative">
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.7 }}
    className="relative mt-8 md:mt-8 mb-8 w-full"
  >
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">

      {/* ---------------- DESKTOP ---------------- */}
     <div className="hidden lg:flex relative w-full h-[800px] items-center justify-center -translate-y-20">

        <ConnectionLines isDark={isDark} />

        {/* CENTER TITLE CARD */}
        <div
          className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[440px] rounded-[24px]"
          style={{
            background: isDark ? 'rgba(20, 10, 40, 0.7)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(24px)',
            border: `1.5px solid #a855f7`,
            boxShadow: isDark
              ? '0 0 40px rgba(168,85,247,0.3), inset 0 0 20px rgba(168,85,247,0.2)'
              : '0 15px 40px rgba(168,85,247,0.2)',
          }}
        >
          <div className="w-full p-4 text-center flex flex-col items-center">
            <h3
              className="text-3xl xl:text-4xl font-black mb-2 tracking-tight"
              style={{
                color: isDark ? '#ffffff' : '#0f172a',
                textShadow: isDark ? '0 0 20px rgba(255,255,255,0.4)' : 'none',
              }}
            >
              OUR INNOVATION
              <br />
              ARSENAL
            </h3>
            <p
              className="text-sm font-medium mt-2"
              style={{ color: isDark ? '#e2e8f0' : '#475569' }}
            >
              The Future of Modern Fitness Ecosystems
            </p>
          </div>
        </div>

        {/* TOP ROW */}
        <div className="absolute top-[200px] left-[50%] -translate-x-[500px]">
          <ConnectedNodeFeature feature={features[0]} index={0} isDark={isDark} />
        </div>
        <div className="absolute top-[118px] left-[50%] -translate-x-[140px]">
          <ConnectedNodeFeature feature={features[1]} index={1} isDark={isDark} />
        </div>
        <div className="absolute top-[200px] left-[50%] translate-x-[220px]">
          <ConnectedNodeFeature feature={features[2]} index={2} isDark={isDark} />
        </div>

        {/* BOTTOM ROW */}
        <div className="absolute top-[500px] left-[50%] -translate-x-[500px]">
          <ConnectedNodeFeature feature={features[3]} index={3} isDark={isDark} />
        </div>
        <div className="absolute top-[554px] left-[50%] -translate-x-[140px]">
          <ConnectedNodeFeature feature={features[4]} index={4} isDark={isDark} />
        </div>
        <div className="absolute top-[500px] left-[50%] translate-x-[220px]">
          <ConnectedNodeFeature feature={features[5]} index={5} isDark={isDark} />
        </div>
      </div>

      {/* ---------------- MOBILE ---------------- */}
      <div className="relative flex lg:hidden flex-col items-center w-full px-4 py-12">

        <MobileConnectionLines isDark={isDark} />

        <div className="relative z-10 flex flex-col items-center w-full gap-14">

          {/* TITLE */}
          <div
            className="w-full max-w-[400px] rounded-[24px] p-8 text-center"
            style={{
              background: isDark
                ? "rgba(20, 10, 40, 0.7)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              border: `1.5px solid #a855f7`,
              boxShadow: isDark
                ? "0 0 30px rgba(168,85,247,0.2)"
                : "0 10px 30px rgba(168,85,247,0.1)",
            }}
          >
            <h3
              className="text-3xl font-black tracking-tight leading-[1.1] mb-2"
              style={{ color: isDark ? "#ffffff" : "#0f172a" }}
            >
              OUR INNOVATION
              <br />
              ARSENAL
            </h3>
            <p
              className="text-sm font-medium opacity-80"
              style={{ color: isDark ? "#cbd5e1" : "#475569" }}
            >
              The Future of Modern Fitness Ecosystems
            </p>
          </div>

          {/* FEATURES */}
          {features.map((feature, i) => (
            <div key={feature.title} className="relative flex flex-col items-center">

              <div
                className="w-3 h-3 rounded-full mb-3 translate-y-2"
                style={{
                  background: feature.accent,
                  boxShadow: `0 0 15px ${feature.accent}`,
                }}
              />

              <ConnectedNodeFeature
                feature={feature}
                index={i}
                isDark={isDark}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
</section>
  );
};

export default InnovationArsenal;