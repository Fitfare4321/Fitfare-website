"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Activity,
  Heart,
  Music,
  Shield,
  Flame,
  Dumbbell,
  Bike,
  StretchHorizontal,
  Timer,
  Zap,
  Crosshair,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Target,
} from "lucide-react";

/* ─────────────────────── DATA ─────────────────────── */

const services = [
  {
    id: "cardio",
    name: "Cardio Elevate",
    icon: Activity,
    color: "from-blue-400 to-cyan-400",
    bgGlow: "rgba(56,189,248,0.15)",
    tag: "Endurance",
    description: "High-energy cardiovascular conditioning designed to maximize caloric burn, improve heart health, and build stamina. Features state-of-the-art treadmills, ellipticals, and guided HIIT sprints.",
    benefits: ["Increased stamina", "Heart health", "Caloric burn"],
  },
  {
    id: "strength",
    name: "Pure Strength",
    icon: Dumbbell,
    color: "from-emerald-400 to-teal-400",
    bgGlow: "rgba(52,211,153,0.15)",
    tag: "Power",
    description: "Progressive resistance training focused on hypertrophy and raw power. Full access to free weights, olympic lifting platforms, and pin-loaded isolation machines.",
    benefits: ["Muscle building", "Bone density", "Metabolic boost"],
  },
  {
    id: "yoga",
    name: "Mind & Flow Yoga",
    icon: Heart,
    color: "from-rose-400 to-pink-400",
    bgGlow: "rgba(244,113,133,0.15)",
    tag: "Recovery",
    description: "Vinyasa, Hatha, and restorative yoga sessions led by expert instructors. Designed to improve flexibility, reduce stress, and enhance mind-body connection in a completely immersive environment.",
    benefits: ["Core stability", "Mental clarity"],
  },
  {
    id: "hiit",
    name: "HIIT Performance",
    icon: Timer,
    color: "from-amber-400 to-orange-400",
    bgGlow: "rgba(251,191,36,0.15)",
    tag: "Intensity",
    description: "High-Intensity Interval Training that pushes your lactate threshold. Quick, explosive bursts of exercise followed by short recovery periods for maximum efficiency.",
    benefits: ["Time efficient", "Athletic power"],
  },
  {
    id: "calisthenics",
    name: "Urban Calisthenics",
    icon: Flame,
    color: "from-red-400 to-rose-400",
    bgGlow: "rgba(248,113,113,0.15)",
    tag: "Bodyweight",
    description: "Master your own bodyweight with progressive calisthenics. From basic pull-ups and dips to advanced static holds like muscle-ups and front levers on custom rigging.",
    benefits: ["Functional strength", "Body control", "Joint health"],
  },
  {
    id: "kickboxing",
    name: "Combat & Striking",
    icon: Shield,
    color: "from-violet-400 to-purple-400",
    bgGlow: "rgba(167,139,250,0.15)",
    tag: "Combat",
    description: "High-octane kickboxing and striking classes. Learn proper technique, footwork, and combinations while getting one of the most intense full-body workouts available.",
    benefits: ["Coordination", "Stress relief", "Agility"],
  },
  {
    id: "cycling",
    name: "Rhythm Cycling",
    icon: Bike,
    color: "from-sky-400 to-blue-400",
    bgGlow: "rgba(56,189,248,0.15)",
    tag: "Endurance",
    description: "Immersive indoor cycling driven by high-BPM playlists and dynamic lighting. Climb hills, hit sprints, and ride to the rhythm in our dedicated spin studios.",
    benefits: ["Lower body strength", "Low impact", "Cardio capacity"],
  },
  {
    id: "zumba",
    name: "Zumba Energy",
    icon: Music,
    color: "from-fuchsia-400 to-pink-400",
    bgGlow: "rgba(232,121,249,0.15)",
    tag: "Dance",
    description: "Dance your way to fitness with energetic, Latin-inspired choreography. A perfect blend of aerobic conditioning and pure fun that feels more like a party than a workout.",
    benefits: ["Cardiovascular health", "Coordination", "Mood elevation"],
  },
  {
    id: "stretching",
    name: "Mobility & Stretch",
    icon: StretchHorizontal,
    color: "from-teal-400 to-emerald-400",
    bgGlow: "rgba(45,212,191,0.15)",
    tag: "Recovery",
    description: "Dedicated mobility work and deep fascial stretching to improve range of motion, prevent injuries, and accelerate recovery between intense training days.",
    benefits: ["Injury prevention", "Posture correction", "Muscle recovery"],
  },
];


/* ─────────────────────── ANIMATION VARIANTS ─────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────── SECTION WRAPPER ─────────────────────── */

function SectionWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── MAIN COMPONENT ─────────────────────── */

export default function Services() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <div
      className="overflow-hidden min-h-screen"
      style={{
        background: isDark
          ? "linear-gradient(160deg, #070b13 0%, #0c1422 60%, #0d1120 100%)"
          : "linear-gradient(160deg, #ffffff 0%, #f4f6fb 60%, #eef1f8 100%)",
        color: isDark ? "#f1f5f9" : "#1e293b",
      }}
    >
      {/* ═══════════════ HERO HEADER ═══════════════ */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(42,157,143,0.15) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(42,157,143,0.2) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: isDark
                ? "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)"
                : "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <SectionWrapper className="relative z-10 max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border"
              style={{
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                borderColor: isDark ? "rgba(42,157,143,0.3)" : "rgba(42,157,143,0.2)",
                color: isDark ? "#5eead4" : "#0f766e",
              }}
            >
              <Activity size={12} /> Elite Programming
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8"
          >
            Train Without <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #1f6f8b 0%, #2a9d8f 50%, #3db4c7 100%)",
              }}
            >
              Limits.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: isDark ? "#94a3b8" : "#64748b" }}
          >
            Access a comprehensive ecosystem of specialized training modalities.
            From hypertrophy block-training to immersive flow state yoga, your
            body dictates the demand, we provide the supply.
          </motion.p>
        </SectionWrapper>
      </section>

      {/* ═══════════════ DYNAMIC SERVICE GRID ═══════════════ */}
      <section className="py-10 px-6 pb-32">
        <SectionWrapper className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;

              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ease-out border cursor-pointer ${isActive ? "scale-[1.02]" : "scale-100"
                    }`}
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(255,255,255,0.9)",
                    borderColor: isDark
                      ? isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"
                      : isActive ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.08)",
                    boxShadow: isActive
                      ? isDark ? `0 20px 40px -10px ${service.bgGlow}` : "0 20px 40px -10px rgba(0,0,0,0.1)"
                      : "none",
                  }}
                >
                  {/* Hover ambient core */}
                  <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500"
                    style={{
                      background: service.bgGlow,
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  <div className="p-8 relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500"
                        style={{
                          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)",
                          transform: isActive ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0)",
                        }}
                      >
                        <Icon size={26} className={`bg-clip-text text-transparent bg-gradient-to-br ${service.color}`} style={{ color: "currentColor" }} />
                      </div>
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-colors duration-300"
                        style={{
                          background: isActive ? "transparent" : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                          color: isDark ? "#cbd5e1" : "#475569",
                        }}
                      >
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3">{service.name}</h3>

                    <p
                      className="text-sm leading-relaxed mb-8 flex-1"
                      style={{ color: isDark ? "#94a3b8" : "#64748b" }}
                    >
                      {service.description}
                    </p>

                    {/* Benefit Pills */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-lg transition-colors duration-300 flex items-center gap-1.5"
                          style={{
                            background: isActive
                              ? isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"
                              : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                            color: isDark ? "#cbd5e1" : "#475569",
                          }}
                        >
                          <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`} />
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Action Arrow (Animated on hover) */}
                    <div className="absolute bottom-8 right-8 overflow-hidden rounded-full">
                      <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: isActive ? 0 : -40, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr ${service.color} text-white shadow-lg`}
                      >
                        <ChevronRight size={20} strokeWidth={3} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionWrapper>
      </section>



      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-28 px-6 pb-40 text-center relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at bottom, rgba(42,157,143,0.1) 0%, transparent 60%)"
              : "radial-gradient(ellipse at bottom, rgba(42,157,143,0.15) 0%, transparent 60%)",
          }}
        />
    
      </section>
    </div>
  );
}