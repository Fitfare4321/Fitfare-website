import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import {
  DollarSign,
  BarChart3,
  TrendingUp,
  Users,
  Heart,
  Shield,
  Award,
} from "lucide-react";
import {
  Sparkles,
  Activity,
  Globe,
  Clock,
  Wallet,
  Zap,
} from "lucide-react";

const NetworkBackground3D = lazy(() => import("./NetworkBackground3D"));

/* ---------------- ANIMATED COUNTER ---------------- */

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter = ({
  value,
  duration = 2.5,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0.2,
  });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(latest.toFixed(decimals));
    });
  }, [springValue, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

/* ---------------- FLOATING ANIMATION VARIANTS ---------------- */
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

/* ---------------- CONNECTED NODE FEATURE COMPONENT ---------------- */

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
    { id: "tc", d: "M 600 360 L 600 250", length: 110, delay: 0.5 },
    { id: "tr", d: "M 750 360 L 750 240 L 820 240", length: 180, delay: 1 },

    { id: "bl", d: "M 450 440 L 450 560 L 380 560", length: 180, delay: 1.5 },
    { id: "bc", d: "M 600 440 L 600 550", length: 110, delay: 2 },
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
          <circle cx="600" cy="250" r="4" fill={dotColor} stroke="none" />
          <circle cx="820" cy="240" r="4" fill={dotColor} stroke="none" />
          <circle cx="380" cy="560" r="4" fill={dotColor} stroke="none" />
          <circle cx="600" cy="550" r="4" fill={dotColor} stroke="none" />
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

const PremiumFeaturesSection = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const sectionDark = isDark; // Match theme - dark in dark mode, light in light mode
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const challenges = [
    {
      title: "Rate Of Unused Memberships",
      percentage: 67,
      description: "of gym memberships go completely unused",
      color: sectionDark ? "#3b82f6" : "#1e40af",
      bgGradient: sectionDark
        ? "from-blue-500/20 to-blue-600/10"
        : "from-blue-100 to-blue-50",
    },
    {
      percentage: 46,
      title: "Time Constraints",
      description:
        "lack of time due to work or Personal commitments",
      color: sectionDark ? "#8b5cf6" : "#6d28d9",
      bgGradient: sectionDark
        ? "from-purple-500/20 to-purple-600/10"
        : "from-purple-100 to-purple-50",
    },
    {
      percentage: 70,
      title: "Traveller Demographics",
      description: "of gym memberships go completely unused",
      color: sectionDark ? "#06b6d4" : "#0891b2",
      bgGradient: sectionDark
        ? "from-cyan-500/20 to-cyan-600/10"
        : "from-cyan-100 to-cyan-50",
    },
  ];

  const analysis = [
    {
      title: "Market Size",
      value: "6.7",
      suffix: "B",
      prefix: "$",
      description:
        "Indian fitness industry growing at a CAGR of 12.93% by 2029",
      icon: TrendingUp,
      color: sectionDark ? "#10b981" : "#059669",
      bgGradient: sectionDark
        ? "from-emerald-500/20 to-emerald-600/10"
        : "from-emerald-100 to-emerald-50",
    },
    {
      title: "City Growth",
      value: "1.5",
      suffix: "M",
      description:
        "Metropolitan city 20-25% rise in Pune gym footfall compared to Dec 2024",
      icon: Users,
      color: sectionDark ? "#f59e0b" : "#d97706",
      bgGradient: sectionDark
        ? "from-amber-500/20 to-amber-600/10"
        : "from-amber-100 to-amber-50",
    },
    {
      title: "Community Interest",
      value: "1500",
      suffix: "+",
      description:
        "strong interest from fitness club owners, trainers, students, working professionals and travellers.",
      icon: Award,
      color: sectionDark ? "#ec4899" : "#db2777",
      bgGradient: sectionDark
        ? "from-pink-500/20 to-pink-600/10"
        : "from-pink-100 to-pink-50",
    },
  ];

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
    <section
      id="features"
      ref={sectionRef}
      className="relative pt-16 pb-24 md:py-32 overflow-hidden"
      style={{
        background: sectionDark ? "#0a0514" : "#ffffff",
      }}
    >
      <Suspense fallback={null}>
        <NetworkBackground3D isDark={sectionDark} />
      </Suspense>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: sectionDark
              ? "radial-gradient(circle, #3b82f6 0%, transparent 70%)"
              : "radial-gradient(circle, #93c5fd 0%, transparent 70%)",
            top: "10%",
            left: "5%",
          }}
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: sectionDark
              ? "radial-gradient(circle, #8b5cf6 0%, transparent 70%)"
              : "radial-gradient(circle, #c4b5fd 0%, transparent 70%)",
            bottom: "10%",
            right: "5%",
          }}
          animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{
              background: sectionDark
                ? "rgba(96, 165, 250, 0.1)"
                : "rgba(30, 64, 175, 0.06)",
              color: sectionDark ? "#93c5fd" : "#1e40af",
              border: `1px solid ${sectionDark ? "rgba(96,165,250,0.2)" : "rgba(30,64,175,0.12)"}`
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sectionDark ? "#60a5fa" : "#1e40af" }} />
            Why We Exist
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl mb-5"
            style={{
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: "1.05",
              color: sectionDark ? "#e2e8f0" : "#0f172a",
            }}
          >
            What Makes Us
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Truly Different
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
            style={{
              color: sectionDark ? "#9fb3c8" : "#64748b",
              lineHeight: "1.8",
            }}
          >
            Data-driven innovation meets cutting-edge technology
          </motion.p>
        </motion.div>

        {/* Challenges Section – narrative + mini chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-28"
        >
          <div className="flex flex-col md:flex-row gap-10 items-stretch ">
            {/* left: compact chart card */}
            <motion.div

              className="md:w-5/12 -mt-14 md:-mt-16 rounded-3xl p-6 md:p-7 relative overflow-hidden backdrop-blur-xl"
              style={{
                background: sectionDark ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.6)",
                border: sectionDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(255,255,255,0.3)",
                boxShadow: sectionDark
                  ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              <div className="flex items-center gap-3 mb-4 mt-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    background: "transparent",
                    boxShadow: "none",
                    border: sectionDark
                      ? "1px solid rgba(148,163,184,0.45)"
                      : "1px solid rgba(148,163,184,0.3)",
                  }}
                >
                  <Shield className="w-6 h-6" style={{ color: sectionDark ? "#ffffff" : "#60A5FA" }} />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-[0.25em] text-blue-500">
                    Problem Lens
                  </p>
                  <h3
                    className="text-lg font-semibold mt-1"
                    style={{ color: sectionDark ? "#e2e8f0" : "#0f172a" }}
                  >
                    Why memberships fail in practice
                  </h3>
                </div>
              </div>

              <p
                className="text-sm mb-5"
                style={{ color: sectionDark ? "#cbd5e1" : "#475569" }}
              >
                Three numbers that instantly show why a fixed monthly membership
                doesn&apos;t fit modern lives.
              </p>
              <div className="mt-1 space-y-4 md:hidden">
                {challenges.map((c, idx) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.3 + idx * 0.12 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="flex flex-col items-center pt-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          background: c.color,
                          boxShadow: `0 0 12px ${c.color}88`,
                        }}
                      />
                      {idx < challenges.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1"
                          style={{
                            background: `linear-gradient(to bottom, ${c.color}80, transparent)`,
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-2xl font-extrabold"
                          style={{
                            color: c.color,
                            textShadow: sectionDark ? "none" : `0 0 18px ${c.color}55`,
                          }}
                        >
                          <AnimatedCounter value={c.percentage} suffix="%" />
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                           Key Insight  {idx + 1}
                        </span>
                      </div>
                      <p
                        className="text-xs font-semibold mt-1"
                        style={{ color: sectionDark ? "#e2e8f0" : "#0f172a" }}
                      >
                        {c.title}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        {c.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-1 hidden md:grid md:grid-cols-3 gap-3">
                {challenges.map((c, idx) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + idx * 0.12 }}
                    whileHover={{
                      y: -6,
                      scale: 1.04,
                      boxShadow: `0 22px 40px ${c.color}33`,
                    }}
                    className="group rounded-2xl px-3 py-3 flex flex-col items-start gap-1 cursor-default backdrop-blur-md"
                    style={{
                      background: sectionDark
                        ? `linear-gradient(to right, rgba(15,23,42,0.4), rgba(15,23,42,0.2))`
                        : `linear-gradient(to right, rgba(255,255,255,0.6), rgba(255,255,255,0.3))`,
                      border: sectionDark
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(255,255,255,0.3)",
                      boxShadow: sectionDark
                        ? "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
                        : "0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.4)",
                    }}
                  >
                    <span
                      className="text-3xl font-extrabold group-hover:tracking-tight transition-all duration-200"
                      style={{
                        color: c.color,
                        textShadow: sectionDark ? "none" : `0 0 18px ${c.color}55`,
                      }}
                    >
                      <AnimatedCounter value={c.percentage} suffix="%" />
                    </span>
                    <p className={`text-xs font-semibold uppercase tracking-wide ${sectionDark ? "text-slate-200/90" : "text-slate-700"
                      }`}>
                      {c.title}
                    </p>
                    <p className={`text-[11px] leading-snug ${sectionDark ? "text-slate-400" : "text-slate-600"
                      }`}>
                      {c.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* right: friendly story list */}
            <div className="hidden md:block md:w-7/12 space-y-5 md-4">
              {challenges.map((challenge, i) => (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.4 + i * 0.12 }}
                  className="flex items-center gap-5"
                >
                  <div
                    className="rounded-full px-3 py-1 text-xs font-semibold text-emerald-900 bg-emerald-100/90 shadow-sm shrink-0"
                  >
                    Key Insight #{i + 1}
                  </div>
                  <div className="space-y-1">
                    <h4
                      className="text-base md:text-lg font-semibold"
                      style={{
                        color: sectionDark ? "#e2e8f0" : "#0f172a",
                      }}
                    >
                      {challenge.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: sectionDark ? "#94a3b8" : "#475569",
                      }}
                    >
                      {challenge.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-28"
        >
          <div className="flex items-center gap-6 mb-12">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: "transparent",
                boxShadow: "none",
              }}
            >
              <BarChart3 className="w-10 h-10" style={{ color: sectionDark ? "#38bdf8" : "#2563eb" }} />
            </div>
            <div>
              <h3
                className="text-2xl md:text-3xl"
                style={{
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  // High-contrast heading for both themes
                  color: sectionDark ? "#f9fafb" : "#0f172a",
                }}
              >
                Statistics to strengthen our solution
              </h3>
              <p
                className="text-base mt-2 tracking-wide font-light"
                style={{ color: sectionDark ? "#94a3b8" : "#475569" }}
              >
                Numbers that validate our vision
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {analysis.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  animate={
                    isInView ? { opacity: 1, y: 0, scale: 1 } : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.6 + i * 0.15,
                    type: "spring",
                  }}
                  whileHover={{ scale: 1.06, y: -10 }}
                  className={`relative group rounded-2xl md:rounded-3xl p-3 md:p-6 backdrop-blur-xl overflow-hidden`}
                  style={{
                    background: sectionDark
                      ? "rgba(15, 23, 42, 0.4)"
                      : "rgba(255, 255, 255, 0.6)",
                    border: `1px solid ${sectionDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)"}`,
                    boxShadow: sectionDark
                      ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                      : "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
                  }}
                >
                  <motion.div
                    className="mb-3 md:mb-5 inline-flex items-center justify-center p-2.5 md:p-3 rounded-2xl backdrop-blur-md"
                    style={{
                      background: sectionDark
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.3)",
                      border: `1px solid ${sectionDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.4)"}`,
                      boxShadow: sectionDark
                        ? "0 4px 16px rgba(0,0,0,0.2)"
                        : "0 4px 16px rgba(0,0,0,0.05)",
                      transform: "translateZ(0)",
                      transformStyle: "flat",
                      backfaceVisibility: "hidden",
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon size={30} style={{ color: stat.color }} />
                  </motion.div>

                  <motion.div
                    className="text-2xl md:text-4xl font-black mb-2.5 md:mb-3.5"
                    style={{
                      color: stat.color,
                      textShadow: sectionDark
                        ? "none"
                        : `0 0 30px ${stat.color}60`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <AnimatedCounter
                      value={parseFloat(stat.value)}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      decimals={stat.value.includes(".") ? 1 : 0}
                    />
                  </motion.div>
                  <h4
                    className={`text-base md:text-lg font-black mb-1.5 md:mb-2.5 ${sectionDark ? "text-white" : "text-slate-900"
                      }`}
                  >
                    {stat.title}
                  </h4>
                  <p
                    className="text-xs md:text-sm leading-relaxed mb-3 md:mb-4"
                    style={{ color: sectionDark ? "#cbd5e1" : "#475569" }}
                  >
                    {stat.description}
                  </p>

                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Premium Features – Connected Nodes Circuit Layout */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative mt-20 md:mt-32 mb-16 w-full"
        >
          <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">

            {/* --- DESKTOP VIEW (Connected Nodes Layout) --- */}
            <div className="hidden lg:flex relative w-full h-[800px] items-center justify-center">

              <ConnectionLines isDark={sectionDark} />

              {/* Center Title Card (Absolute Center) */}
              <div
                className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[440px] rounded-[24px]"
                style={{
                  background: sectionDark ? 'rgba(20, 10, 40, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(24px)',
                  border: `1.5px solid #a855f7`,
                  boxShadow: sectionDark
                    ? '0 0 40px rgba(168,85,247,0.3), inset 0 0 20px rgba(168,85,247,0.2)'
                    : '0 15px 40px rgba(168,85,247,0.2)',
                }}
              >
                <div className="w-full h-auto p-4 text-center flex flex-col items-center justify-center">
                  <h3
                    className="text-3xl xl:text-4xl font-black mb-2 tracking-tight"
                    style={{
                      color: sectionDark ? '#ffffff' : '#0f172a',
                      textShadow: sectionDark ? '0 0 20px rgba(255,255,255,0.4)' : 'none',
                    }}
                  >
                    OUR INNOVATION
                    <br />
                    ARSENAL
                  </h3>
                  <p
                    className="text-sm font-medium mt-2"
                    style={{ color: sectionDark ? '#e2e8f0' : '#475569' }}
                  >
                    The Future of Modern Fitness Ecosystems
                  </p>
                </div>
              </div>

              {/* Positioned Feature Cards */}

              {/* TOP ROW */}
              <div className="absolute top-[200px] left-[50%] -translate-x-[500px]">
                <ConnectedNodeFeature feature={features[0]} index={0} isDark={sectionDark} />
              </div>
              <div className="absolute top-[145px] left-[50%] -translate-x-[140px]">
                <ConnectedNodeFeature feature={features[1]} index={1} isDark={sectionDark} />
              </div>
              <div className="absolute top-[200px] left-[50%] translate-x-[220px]">
                <ConnectedNodeFeature feature={features[2]} index={2} isDark={sectionDark} />
              </div>

              {/* BOTTOM ROW */}
              <div className="absolute top-[500px] left-[50%] -translate-x-[500px]">
                <ConnectedNodeFeature feature={features[3]} index={3} isDark={sectionDark} />
              </div>
              <div className="absolute top-[550px] left-[50%] -translate-x-[140px]">
                <ConnectedNodeFeature feature={features[4]} index={4} isDark={sectionDark} />
              </div>
              <div className="absolute top-[500px] left-[50%] translate-x-[220px]">
                <ConnectedNodeFeature feature={features[5]} index={5} isDark={sectionDark} />
              </div>

            </div>

            <div className="relative flex lg:hidden flex-col items-center w-full px-4 py-12">

              <MobileConnectionLines isDark={sectionDark} />

              {/* Content Wrapper */}
              <div className="relative z-10 flex flex-col items-center w-full gap-14">

                {/* Title Card */}
                <div
                  className="w-full max-w-[400px] rounded-[24px] p-8 text-center"
                  style={{
                    background: sectionDark
                      ? "rgba(20, 10, 40, 0.7)"
                      : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(20px)",
                    border: `1.5px solid #a855f7`,
                    boxShadow: sectionDark
                      ? "0 0 30px rgba(168,85,247,0.2)"
                      : "0 10px 30px rgba(168,85,247,0.1)",
                  }}
                >
                  <h3
                    className="text-3xl font-black tracking-tight leading-[1.1] mb-2"
                    style={{ color: sectionDark ? "#ffffff" : "#0f172a" }}
                  >
                    OUR INNOVATION
                    <br />
                    ARSENAL
                  </h3>
                  <p
                    className="text-sm font-medium opacity-80"
                    style={{ color: sectionDark ? "#cbd5e1" : "#475569" }}
                  >
                    The Future of Modern Fitness Ecosystems
                  </p>
                </div>

                {/* Connected Features */}
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
                      isDark={sectionDark}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumFeaturesSection;