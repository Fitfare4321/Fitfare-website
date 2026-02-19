import { useRef, useState, useEffect, lazy, Suspense } from "react";
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

/* ---------------- MAIN COMPONENT ---------------- */

const PremiumFeaturesSection = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const sectionDark = !isDark;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const challenges = [
    {
      title: "Rate Of Unused Memberships",
      percentage: 67,
      description: "of gym memberships go completely unused",
      color: isDark ? "#1e40af" : "#3b82f6",
      bgGradient: isDark
        ? "from-blue-100 to-blue-50"
        : "from-blue-500/20 to-blue-600/10",
    },
    {
      percentage: 46,
      title: "Time Constraints",
      description:
        "lack of time due to work or Personal commitments",
      color: isDark ? "#6d28d9" : "#8b5cf6",
      bgGradient: isDark
        ? "from-purple-100 to-purple-50"
        : "from-purple-500/20 to-purple-600/10",
    },
    {
      percentage: 70,
      title: "Traveller Demographics",
      description: "of gym memberships go completely unused",
      color: isDark ? "#0891b2" : "#06b6d4",
      bgGradient: isDark
        ? "from-cyan-100 to-cyan-50"
        : "from-cyan-500/20 to-cyan-600/10",
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
      color: isDark ? "#059669" : "#10b981",
      bgGradient: isDark
        ? "from-emerald-100 to-emerald-50"
        : "from-emerald-500/20 to-emerald-600/10",
    },
    {
      title: "City Growth",
      value: "1.5",
      suffix: "M",
      description:
        "Metropolitan city 20-25% rise in Pune gym footfall compared to Dec 2024",
      icon: Users,
      color: isDark ? "#d97706" : "#f59e0b",
      bgGradient: isDark
        ? "from-amber-100 to-amber-50"
        : "from-amber-500/20 to-amber-600/10",
    },
    {
      title: "Community Interest",
      value: "1500",
      suffix: "+",
      description:
        "strong interest from fitness club owners, trainers, students, working professionals and travellers.",
      icon: Award,
      color: isDark ? "#db2777" : "#ec4899",
      bgGradient: isDark
        ? "from-pink-100 to-pink-50"
        : "from-pink-500/20 to-pink-600/10",
    },
  ];

  const features = [
    {
      icon: DollarSign,
      title: "Dynamic Price Allocation",
      description:
        "AI-powered pricing adapting to demand, weather, and peak hours",
      gradient: isDark
        ? "from-emerald-600 via-teal-600 to-cyan-600"
        : "from-emerald-400 via-teal-500 to-cyan-500",
      iconBg: isDark
        ? "bg-gradient-to-br from-emerald-600 to-teal-700"
        : "bg-gradient-to-br from-emerald-500 to-teal-600",
      particles: 8,
    },
    {
      icon: Heart,
      title: "Period Tracking for Women",
      description:
        "Personalized workout recommendations for every menstrual phase",
      gradient: isDark
        ? "from-pink-600 via-rose-600 to-red-600"
        : "from-pink-400 via-rose-500 to-red-500",
      iconBg: isDark
        ? "bg-gradient-to-br from-pink-600 to-rose-700"
        : "bg-gradient-to-br from-pink-500 to-rose-600",
      particles: 10,
    },
    {
      icon: BarChart3,
      title: "Professional Dashboard",
      description:
        "Real-time analytics, revenue tracking & member management",
      gradient: isDark
        ? "from-blue-600 via-indigo-600 to-purple-600"
        : "from-blue-400 via-indigo-500 to-purple-500",
      iconBg: isDark
        ? "bg-gradient-to-br from-blue-600 to-indigo-700"
        : "bg-gradient-to-br from-blue-500 to-indigo-600",
      particles: 12,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: sectionDark ? "#0f172a" : "#ffffff",
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
                ? "rgba(30, 64, 175, 0.06)"
                : "rgba(96, 165, 250, 0.1)",
              color: sectionDark ? "#1e40af" : "#93c5fd",
              border: `1px solid ${sectionDark ? "rgba(30,64,175,0.12)" : "rgba(96,165,250,0.2)"}`
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sectionDark ? "#1e40af" : "#60a5fa" }} />
            Why We Exist
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl mb-6"
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
          <div className="flex flex-col md:flex-row gap-10 items-stretch">
            {/* left: compact chart card */}
            <motion.div
              className="md:w-5/12 rounded-3xl p-6 md:p-7 relative overflow-hidden"
              style={{
                background: sectionDark
                  ? "radial-gradient(circle at 0% 0%, #22c55e22 0, transparent 55%), rgba(15,23,42,0.95)"
                  : "rgba(255,255,255,0.85)",
                border: sectionDark
                  ? "1px solid rgba(15,118,110,0.25)"
                  : "1px solid rgba(15,23,42,0.12)",
                boxShadow: sectionDark
                  ? "0 24px 60px rgba(0,0,0,0.45)"
                  : "0 10px 30px rgba(2,6,23,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    background: sectionDark
                      ? "linear-gradient(135deg, #22c55e 0%, #16a34a 40%, #0f766e 100%)"
                      : "transparent",
                    boxShadow: sectionDark ? "0 12px 30px rgba(34,197,94,0.45)" : "none",
                    border: sectionDark ? "none" : "1px solid rgba(15,23,42,0.12)",
                  }}
                >
                  <Shield className="w-6 h-6" style={{ color: sectionDark ? "#ffffff" : "#16a34a" }} />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">
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

              <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    className="group rounded-2xl px-3 py-3 flex flex-col items-start gap-1 cursor-default"
                    style={{
                      background: `linear-gradient(to right, ${c.color}18, transparent)`,
                      border: isDark
                        ? "1px solid rgba(148,163,184,0.16)"
                        : "1px solid rgba(148,163,184,0.3)",
                    }}
                  >
                    <span
                      className="text-2xl md:text-3xl font-extrabold group-hover:tracking-tight transition-all duration-200"
                      style={{
                        color: c.color,
                        textShadow: isDark ? "none" : `0 0 18px ${c.color}55`,
                      }}
                    >
                      <AnimatedCounter value={c.percentage} suffix="%" />
                    </span>
                    <p className="text-xs font-semibold text-slate-200/90 uppercase tracking-wide">
                      {c.title}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {c.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* right: friendly story list */}
            <div className="md:w-7/12 space-y-5">
              {challenges.map((challenge, i) => (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.4 + i * 0.12 }}
                  whileHover={{
                    x: 6,
                    scale: 1.02,
                    backgroundColor: sectionDark
                      ? "rgba(15,23,42,0.85)"
                      : "rgba(226,232,240,0.8)",
                  }}
                  className="flex gap-4 items-start rounded-2xl px-4 py-3 transition-colors cursor-default"
                >
                  <div
                    className="mt-1 rounded-full px-3 py-1 text-xs font-semibold text-emerald-900 bg-emerald-100/90 shadow-sm shrink-0"
                  >
                    Pain #{i + 1}
                  </div>
                  <div>
                    <h4
                      className="text-base md:text-lg font-semibold mb-1"
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
                background: sectionDark
                  ? "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)"
                  : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                boxShadow: sectionDark
                  ? "0 10px 40px rgba(37,99,235,0.3)"
                  : "0 10px 40px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.2)",
              }}
            >
              <BarChart3 className="w-10 h-10 text-white" />
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

          <div className="grid md:grid-cols-3 gap-8">
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
                  whileHover={{ scale: 1.08, y: -15 }}
                  className={`relative group rounded-3xl p-8 backdrop-blur-sm bg-gradient-to-br ${stat.bgGradient}`}
                  style={{
                    border: `2px solid ${isDark ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)"}`,
                    boxShadow: isDark
                      ? "0 20px 50px rgba(0,0,0,0.08)"
                      : "0 20px 50px rgba(0,0,0,0.3)",
                  }}
                >
                  <motion.div
                    className="mb-6 inline-flex items-center justify-center p-4 rounded-2xl"
                    style={{
                      background: stat.color,
                      boxShadow: isDark
                        ? `0 10px 25px ${stat.color}30`
                        : `0 10px 30px ${stat.color}40`,
                      transform: "translateZ(0)",
                      transformStyle: "flat",
                      backfaceVisibility: "hidden",
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon size={30} className="text-white" />
                  </motion.div>

                  <motion.div
                    className="text-4xl md:text-5xl font-black mb-4"
                    style={{
                      color: stat.color,
                      textShadow: isDark
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
                    className={`text-xl font-black mb-3 ${isDark ? "text-slate-900" : "text-white"
                      }`}
                  >
                    {stat.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: isDark ? "#475569" : "#cbd5e1", }}
                  >
                    {stat.description}
                  </p>

                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Premium Features – lighter, process-style presentation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, type: "spring", bounce: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="relative">

                <h3
                  className="relative text-3xl md:text-6xl px-8"
                  style={{
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: "1.05",
                    color: sectionDark ? "#e2e8f0" : "#0f172a",
                  }}
                >
                  Our Innovation Arsenal
                </h3>
              </div>
            </motion.div>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: sectionDark ? "#9fb3c8" : "#64748b" }}>
              Three product bets that turn unused memberships into a flexible, data-driven
              fitness ecosystem.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* connector line */}
            <div
              className="hidden md:block absolute top-10 left-4 right-4 h-px"
              style={{
                background: sectionDark
                  ? "linear-gradient(to right, transparent, rgba(148,163,184,0.7), transparent)"
                  : "linear-gradient(to right, transparent, rgba(148,163,184,0.9), transparent)",
              }}
            />

            <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : {}
                  }
                  transition={{
                    duration: 0.9,
                    delay: 0.8 + i * 0.2,
                    type: "spring",
                    bounce: 0.4,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.06,
                    boxShadow: sectionDark
                      ? "0 24px 55px rgba(15,23,42,0.8)"
                      : "0 30px 70px rgba(15,23,42,0.95)",
                  }}
                  className={`relative group flex flex-col items-center md:items-start text-center md:text-left gap-3 ${i > 0 ? "md:pl-8 md:border-l" : ""}`}
                  style={{
                    borderColor: sectionDark ? "rgba(15,23,42,0.1)" : "rgba(226,232,240,0.16)",
                  }}
                >
                  {/* subtle glow background on hover */}
                  <div
                    className="pointer-events-none absolute inset-x-[-18px] inset-y-[-12px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{
                      background:
                        i === 0
                          ? "radial-gradient(circle at 0% 0%, rgba(45,212,191,0.45), transparent 60%)"
                          : i === 1
                          ? "radial-gradient(circle at 0% 0%, rgba(244,63,94,0.45), transparent 60%)"
                          : "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.5), transparent 60%)",
                    }}
                  />
                  <div
                    className="relative flex items-center justify-center rounded-full w-12 h-12 md:w-14 md:h-14"
                    style={{
                      background: "transparent",
                      boxShadow: "none",
                      border: sectionDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,23,42,0.12)",
                    }}
                  >
                    <Icon
                      className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                      style={{ color: sectionDark ? "#ffffff" : "#0f172a" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <h4
                      className={`text-lg md:text-xl font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text`}
                      style={{
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: sectionDark ? "#4b5563" : "#334155",
                      }}
                    >
                      {feature.description}
                    </p>
                    <div
                      className="hidden md:block h-px mt-3"
                      style={{
                        background: sectionDark
                          ? "linear-gradient(to right, transparent, rgba(15,23,42,0.1), transparent)"
                          : "linear-gradient(to right, transparent, rgba(15,23,42,0.12), transparent)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-16 text-center"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumFeaturesSection;
