"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Target,
  Eye,
  Sparkles,
  Clock,
  Handshake,
  Users,
  TrendingUp,
  Award,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  BarChart3,
  ArrowRight,
  Heart,
  Lightbulb,
  Rocket,
} from "lucide-react";

/* ─────────────────────── DATA ─────────────────────── */

const coreValues = [
  {
    title: "Client-Aligned Execution",
    description:
      "We operate as strategic partners aligning every initiative with measurable outcomes and long-term client success.",
    icon: Target,
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    title: "Precision With Creative Freedom",
    description:
      "We define the strategy with clarity and empower creative excellence in execution where systems meet artistry.",
    icon: Sparkles,
    gradient: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    border: "border-violet-500/20",
  },
  {
    title: "Time & Energy Discipline",
    description:
      "We prioritize ruthlessly. Efficiency is our operating system eliminating waste, maximizing impact.",
    icon: Clock,
    gradient: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    border: "border-amber-500/20",
  },
  {
    title: "Relationship Driven Growth",
    description:
      "We optimize for long-term trust, not short-term transactions. Partnerships built on transparency compound exponentially.",
    icon: Handshake,
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  {
    title: "The Team Is the Brand",
    description:
      "Our people define our reputation, performance, and future. We hire character first, skill second.",
    icon: Users,
    gradient: "from-rose-500/20 to-pink-500/10",
    iconColor: "text-rose-400",
    border: "border-rose-500/20",
  },
  {
    title: "Transparent Execution",
    description:
      "Clarity in communication. Visibility in progress. Accountability in results no surprises, ever.",
    icon: Eye,
    gradient: "from-cyan-500/20 to-sky-500/10",
    iconColor: "text-cyan-400",
    border: "border-cyan-500/20",
  },
];

const stats = [
  { number: "Niche-Focused", label: "Fitness Industry Only", icon: Users },
  { number: "System-Led", label: "Structured Growth Approach", icon: TrendingUp },
  { number: "Performance-Driven", label: "Outcome Oriented Execution", icon: ShieldCheck },
  { number: "Pioneering", label: "Redefining Fitness Brand Growth", icon: Award },
];

const milestones = [
  {
    title: "Vision & Foundation (2025)",
    desc: "FitFare was born from our own experiences in gyms we realized the challenges fitness brands and users face daily. Our purpose became clear: to empower brands to scale with structured strategy and performance driven execution, while creating better experiences for fitness enthusiasts\u00A0everywhere."
  },
  {
    title: "Establishing Core Systems",
    desc: "We built robust operating frameworks, internal workflows, and defined processes that ensure consistency, efficiency, and measurable results."
  },
  {
    title: "Scaling a Remote Team",
    desc: "Assembled a fully remote team of strategists, creatives, technologists, and operators collaborating seamlessly across regions to deliver impactful results."
  },
  {
    title: "First Brand Collaborations",
    desc: "Partnered with emerging fitness brands to enhance marketing clarity, optimize customer funnels, and create scalable growth strategies."
  },

  {
    title: "Operational Excellence",
    desc: "Developed internal playbooks and repeatable workflows, allowing us to maintain high quality outcomes across every project and partnership."
  },
  {
    title: "Future Growth & Impact",
    desc: "Focused on long term partnerships and continuous improvement, FitFare is committed to driving sustainable growth for fitness brands worldwide while enhancing experiences for users everywhere."
  },
];

const teamPrinciples = [
  { icon: Lightbulb, text: "Think strategically, act decisively" },
  { icon: Heart, text: "Put client outcomes above everything" },
  { icon: Rocket, text: "Ship fast, iterate faster" },
  { icon: Globe, text: "Build for global impact, start local" },
  { icon: Zap, text: "Energy and excellence, always" },
  { icon: CheckCircle2, text: "Accountability without blame" },
];

/* ─────────────────────── ANIMATION VARIANTS ─────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────── SECTION COMPONENT ─────────────────────── */

function SectionWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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

export default function AboutFitfare() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(160deg, #070b13 0%, #0c1422 60%, #0d1120 100%)"
          : "linear-gradient(160deg, #ffffff 0%, #f4f6fb 60%, #eef1f8 100%)",
        color: isDark ? "#f1f5f9" : "#1e293b",
      }}
    >
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6 py-14 md:py-32 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[160px]"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(30,80,180,0.12) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(99,179,237,0.18) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px]"
            style={{
              background: isDark
                ? "rgba(109,40,217,0.07)"
                : "rgba(167,139,250,0.1)",
            }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: isDark
                ? "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)"
                : "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>



        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight mb-8"
          >
            Architecting{" "}
            <br className="hidden md:block" />
            <span
              className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent font-extrabold">
              Scalable Fitness Growth
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: isDark ? "#94a3b8" : "#64748b" }}
          >
            FitFare is a performance first growth partner for modern fitness brands.
            We combine strategy, systems, and execution to transform ambition into
            scalable, compounding results.
          </motion.p>


        </div>

      </section>

      {/* ═══════════════ MISSION & VISION ═══════════════ */}
     <section
  className="py-14 md:py-28 px-6"
        style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}
      >
        <SectionWrapper className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 text-center mb-4"
          >
            Our Purpose
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold text-center mb-20 leading-tight"
          >
            Driven by{" "}
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
              Mission & Vision
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                Icon: Target,
                color: "text-blue-400",
                glow: "rgba(96,165,250,0.08)",
                label: "Our Mission",
                text: "To empower fitness businesses with structured growth systems, predictable revenue frameworks, and brand authority positioning  without compromising authenticity or long-term sustainability. We build engines, not campaigns.",
                points: ["Structured growth systems", "Predictable revenue frameworks", "Brand authority positioning"],
              },
              {
                Icon: Eye,
                color: "text-blue-400",
                glow: "rgba(96,165,250,0.08)",
                label: "Our Vision",
                text: "To become the strategic backbone behind high performance fitness brands globally  redefining how digital infrastructure, marketing psychology, and operational excellence combine into a single unified growth system.",
                points: ["Global fitness growth leader", "Digital & operational excellence", "Scalable impact frameworks"],
              },
            ].map(({ Icon, color, glow, label, text, points }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="relative overflow-hidden rounded-3xl p-8 border group transition-all duration-500"
                style={{
                  background: isDark ? `radial-gradient(ellipse at top left, ${glow}, transparent 60%), rgba(255,255,255,0.02)` : `radial-gradient(ellipse at top left, ${glow}, transparent 60%), rgba(0,0,0,0.02)`,
                  borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${color}`}
                  style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)" }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold mb-3">{label}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                  {text}
                </p>
                <ul className="space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
                      <CheckCircle2 size={14} className={color} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section
        className="py-24 px-6"
        style={{
          background: isDark
            ? "linear-gradient(180deg, transparent 0%, rgba(30,58,138,0.06) 50%, transparent 100%)"
            : "linear-gradient(180deg, transparent 0%, rgba(219,234,254,0.4) 50%, transparent 100%)",
        }}
      >
        <SectionWrapper className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl p-6 text-center group transition-all duration-500"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {/* Top glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(ellipse at top, rgba(42,157,143,0.12), transparent 60%)" }}
                  />
                  <Icon size={20} className="mx-auto mb-3 text-blue-400" />
                  <div
  className="text-xl sm:text-2xl font-extrabold mb-1 bg-clip-text text-transparent leading-tight break-words"
  style={{ backgroundImage: "linear-gradient(to right,#60A5FA,#3B82F6,#06B6D4)" }}
>
  {item.number}
</div>
                  <p className="text-sm" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════ OUR STORY / TIMELINE ═══════════════ */}
      <section
        className="py-20 px-6"
        style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}
      >
        <SectionWrapper className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#42A4E6] text-center mb-4"
          >
            Our Journey
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold text-center mb-20"
          >
            Shaping the Next {" "}
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent font-extrabold">
              Era of Fitness Brands
            </span>
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
              style={{ background: isDark ? "linear-gradient(180deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)" : "linear-gradient(180deg, transparent, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.08) 80%, transparent)" }}
            />

            <div className="space-y-10 pl-16 md:pl-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`relative flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-[-2.6rem] md:left-1/2 top-3 w-3 h-3 rounded-full md:-translate-x-1/2"
                    style={{
                      background: "#2a9d8f",
                      boxShadow: `0 0 0 4px ${isDark ? "rgba(42,157,143,0.2)" : "rgba(42,157,143,0.15)"}`,
                    }}
                  />

                  {/* Year */}
                  <div className={`md:w-[calc(50%-2rem)] flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>

                  </div>

                  {/* Card */}
                  <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <div
                      className="rounded-2xl p-5 border transition-all duration-300"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.9)",
                        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                      }}
                    >
                      <h4 className="font-bold mb-1">{m.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </section>


      {/* ═══════════════ CORE VALUES ═══════════════ */}
      <section
        className="py-28 px-6"
        style={{
          borderTop: isDark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(0,0,0,0.06)",
          background: isDark
            ? "linear-gradient(180deg, transparent 0%, rgba(109,40,217,0.04) 50%, transparent 100%)"
            : "linear-gradient(180deg, transparent 0%, rgba(233,213,255,0.2) 50%, transparent 100%)",
        }}
      >
        <SectionWrapper className="max-w-7xl mx-auto">
          <motion.p
            variants={fadeUp}
            className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent font-extrabold justify-center flex text-xl mb-5"
          >
            How We Operate
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold text-center mb-6"
          >
            Our Core Philosophy
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16 text-sm leading-relaxed"
            style={{ color: isDark ? "#64748b" : "#94a3b8" }}
          >
            The operating principles that define how Fitfare executes,
            communicates, and scales impact — every single day.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.9)",
                    borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(ellipse at top left, rgba(42,157,143,0.1), transparent 60%)" }}
                  />

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${item.iconColor}`}
                    style={{
                      background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                      border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <h4 className="font-bold text-sm mb-2 relative z-10">{item.title}</h4>
                  <p className="text-xs leading-relaxed relative z-10" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════ TEAM PRINCIPLES ═══════════════ */}
      <section
        className="py-24 px-6"
        style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}
      >
        <SectionWrapper className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p
                variants={fadeUp}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-[#40B2DF] mb-4"
              >
                Our Team DNA
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
              >
                A Team Built{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent font-extrabold">
                  Differently
                </span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-sm leading-relaxed"
                style={{ color: isDark ? "#94a3b8" : "#64748b" }}
              >
                FitFare is a fully remote team of innovators, thinkers, and doers — united by a passion for performance. We don’t just work together; we elevate each other and our outcomes.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamPrinciples.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 group"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
                      borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#50ACE8]"
                      style={{
                        background: isDark ? "rgba(244,63,94,0.1)" : "rgba(244,63,94,0.07)",
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <span className="text-xs font-medium leading-snug">{p.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      {/* <section
        className="py-32 px-6"
        style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-4xl mx-auto text-center relative">
         
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(ellipse at center, rgba(30,80,180,0.12) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, rgba(99,179,237,0.15) 0%, transparent 70%)",
            }}
          /> */}

      {/* <SectionWrapper>
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4"
            >
              Work With Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Ready to Build a{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #1f6f8b 0%, #2a9d8f 50%, #3db4c7 100%)" }}
              >
                High-Performance Brand?
              </span>
            </motion.h2> */}

      {/* <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed max-w-xl mx-auto mb-12"
              style={{ color: isDark ? "#94a3b8" : "#64748b" }}
            >
              Let's engineer systems that compound growth, strengthen positioning, and
              create long-term leverage. Your ambition, our infrastructure.
            </motion.p> */}



      {/* Trust line */}
      {/* <motion.p
              variants={fadeUp}
              className="mt-8 text-xs"
              style={{ color: isDark ? "#475569" : "#94a3b8" }}
            >
              No long-term contracts · Results-oriented engagement · Cancel anytime
            </motion.p>
          </SectionWrapper> */}
      {/* </div>
      </section> */}
    </div>
  );
}