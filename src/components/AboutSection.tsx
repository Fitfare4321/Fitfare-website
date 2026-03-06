import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "next-themes";
import {
  Dumbbell,
  Users,
  Heart,
  Trophy,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Megaphone,
  ActivitySquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


/* ─────────────────────────── PREMIUM BUBBLES ─────────────────────────── */

const PremiumBubbles = () => {
  const [particles, setParticles] = useState<{ id: number; size: number; x: number; y: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-emerald-400/60 via-cyan-400/40 to-purple-400/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};




const features = [
  {
    icon: Dumbbell,
    title: "Flexible Gym Access",
    desc: "Train at any partner gym, anytime — with zero lock-in contracts or long-term commitments.",
    iconColor: "text-emerald-500",
  },
  {
    icon: Users,
    title: "Expert Trainers",
    desc: "150+ certified professionals across strength, yoga, cardio, and rehabilitation disciplines.",
    iconColor: "text-cyan-500",
  },
  {
    icon: Heart,
    title: "Nutrition Guidance",
    desc: "Personalized meal plans crafted by registered dietitians to complement your fitness journey.",
    iconColor: "text-rose-500",
  },
  {
    icon: Trophy,
    title: "Progress Tracking",
    desc: "Advanced analytics and goal-setting tools to monitor performance and celebrate milestones.",
    iconColor: "text-amber-500",
  },
];

const whyChoose = [
  {
    icon: TrendingUp,
    title: "Commission That Scales With You",
    desc: "Our revenue model is designed to grow with your business — your commission shrinks as your volume grows, letting you keep more of what you earn.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: BarChart3,
    title: "Demand-Driven Dynamic Pricing",
    desc: "AI-powered pricing adapts in real time to demand signals, weather patterns, and local trends — maximising your revenue per slot automatically.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Business Dashboard",
    desc: "Real-time insights into bookings, revenue, and user behaviour — giving you the data you need to make smarter operational decisions every day.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Megaphone,
    title: "Zero-Risk Organic Marketing",
    desc: "FitFare promotes your gym to thousands of active users at no upfront cost. Pay only for the footfall we actually deliver.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: ActivitySquare,
    title: "Higher Footfall, Happier Members",
    desc: "Flexible access attracts a wider user base and maintains consistent gym utilisation, converting drop-in users into loyal, returning members.",
    color: "from-amber-500 to-orange-600",
  },
];

const trustStats = [
  { value: "2M+", label: "Active Members", sub: "and growing every month" },
  { value: "150+", label: "Partner Gyms", sub: "across major Indian cities" },
  { value: "95%", label: "Retention Rate", sub: "users who stay month-on-month" },
  { value: "4.9★", label: "Average Rating", sub: "across all platform reviews" },
];



const Section1 = ({ isDark }: { isDark: boolean }) => (
  <motion.div
    key="s1"
    initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    exit={{ opacity: 0, y: -60, filter: "blur(8px)" }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    className="grid md:grid-cols-2 gap-16 items-center w-full"
  >
    {/* LEFT */}
    <div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
        <Sparkles size={14} className="text-emerald-500" />
        <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">Innovation First</span>
      </div>

      <h2
        className={`text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 ${isDark ? "text-white" : "text-gray-900"
          }`}
      >
        Built For
        <br />
        <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent font-extrabold">
          Results.
        </span>
      </h2>
      <p
        className={`text-base sm:text-lg leading-relaxed mb-8 max-w-md ${isDark ? "text-gray-400" : "text-gray-500"
          }`}
      >
        FitFare combines flexible gym access, expert guidance, and intelligent
        progress tracking — so every session counts and every goal is
        achievable.
      </p>


    </div>

    {/* RIGHT — Feature List */}
    <div className="grid grid-cols-1 gap-4">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="group flex items-start gap-4"
        >
          <div
            className={`
    relative flex items-center justify-center 
    w-12 h-12 shrink-0 rounded-2xl
    border
    ${isDark
                ? "border-white/10 bg-white/[0.06]"
                : "border-gray-200 bg-white/70"}
    backdrop-blur-xl
    shadow-[0_4px_20px_rgba(0,0,0,0.08)]
    transition-all duration-500
    group-hover:scale-110
  `}
          >
            {/* Subtle inner light reflection */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-40 pointer-events-none" />

            {/* Icon */}
            <f.icon
              size={22}
              className={`
      ${f.iconColor}
      relative z-10
      transition-all duration-300
      group-hover:scale-110
    `}
            />
          </div>
          <div>
            <h4
              className={`font-semibold mb-0.5 text-sm ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              {f.title}
            </h4>
            <p
              className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"
                }`}
            >
              {f.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Section 2 — Our Story
const Section2 = ({ isDark }: { isDark: boolean }) => (
  <motion.div
    key="s2"
    initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    exit={{ opacity: 0, y: -60, filter: "blur(8px)" }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    className="w-full max-w-6xl mx-auto"
  >
    {/* Label */}
    <p className="text-xs uppercase tracking-[0.35em] text-blue-400 mb-5 text-center">
      Our Story
    </p>

    {/* Headline */}
    <h2
      className={`text-4xl md:text-6xl font-extrabold leading-tight text-center mb-16 mt-10 ${isDark ? "text-white" : "text-gray-900"
        }`}
    >
      Redefining Access to{" "}
      <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
        Flexible Fitness
      </span>
    </h2>


    {/* Two-column story */}
    <div className="grid md:grid-cols-2 gap-8">
      {/* Card 1 */}
      <div
        className={`relative overflow-hidden rounded-3xl p-8 border ${isDark
          ? "bg-white/[0.03] border-white/8 backdrop-blur-xl"
          : "bg-gray-50 border-gray-200"
          }`}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-4 block">
          The Problem
        </span>
        <p
          className={`text-base md:text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"
            }`}
        >
          Traditional gym memberships force users into rigid, long-term
          contracts that don't fit modern, dynamic lifestyles. People pay
          for full months even when they travel, work late, or simply want
          variety — a fundamentally broken model.
        </p>
      </div>

      {/* Card 2 */}
      <div
        className={`relative overflow-hidden rounded-3xl p-8 border ${isDark
          ? "bg-white/[0.03] border-white/8 backdrop-blur-xl"
          : "bg-gray-50 border-gray-200"
          }`}
      >
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-4 block">
          Our Solution
        </span>
        <p
          className={`text-base md:text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"
            }`}
        >
          FitFare is a fully integrated digital platform where gym discovery,
          bookings, and access management happen seamlessly in one ecosystem.
          Pay per session. Train anywhere. No commitments — just results.
        </p>
      </div>
    </div>

    {/* Bottom insight bar */}
    <div
      className={`mt-8 flex flex-wrap items-center justify-center gap-10 py-6 border-t ${isDark ? "border-white/8 text-gray-400" : "border-gray-200 text-gray-500"
        }`}
    >
      {["Founded in 2025", "Fully Remote Team", "India-First Vision"].map(
        (tag) => (
          <span key={tag} className="flex items-center gap-2 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {tag}
          </span>
        )
      )}
    </div>
  </motion.div>
);

// Section 3 — Why Partner
const Section3 = ({ isDark }: { isDark: boolean }) => (
  <motion.div
    key="s3"
    initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    exit={{ opacity: 0, y: -60, filter: "blur(8px)" }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    className="w-full max-w-6xl mx-auto"
  >
    {/* Label */}
    <p className="text-xs uppercase tracking-[0.35em] text-violet-400 mb-2 mt-14 text-center">
      Partnership Opportunities
    </p>

    {/* Headline */}
    <h2
      className={`text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-5 mt-5 ${isDark ? "text-white" : "text-gray-900"
        }`}
    >
      Grow Your Gym With{" "}
      <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
        FitFare
      </span>
    </h2>

    {/* Cards — Horizontal Scroll with Arrows on Mobile, Grid on Desktop */}
    <div className="relative group/carousel">

      {/* Cards */}
      <div
        id="s3-carousel"
        className="flex flex-nowrap md:flex-wrap md:justify-center gap-6 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {whyChoose.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
            className={`group relative overflow-hidden rounded-xl p-4 border transition-all duration-500
            min-w-[85vw] md:min-w-0 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center
            ${isDark
                ? "bg-white/[0.04] border-white/10 hover:border-blue-500/40 backdrop-blur-2xl"
                : "bg-white/80 border-gray-200 hover:shadow-2xl hover:border-blue-400"
              }`}
          >
            {/* Ambient hover glow */}
            <div
              className={`absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-25 blur-3xl transition-opacity duration-700 pointer-events-none`}
            />

            <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-blue-500 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <item.icon size={28} strokeWidth={1.5} />
            </div>

            <h4
              className={`font-bold text-xl mb-4 ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              {item.title}
            </h4>

            <p
              className={`text-sm leading-relaxed opacity-80 ${isDark ? "text-gray-400" : "text-gray-500"
                }`}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows (Mobile Only - BELOW BOXES) */}
      <div className="flex md:hidden justify-center gap-6 mt-4">
        <button
          onClick={() => {
            const el = document.getElementById("s3-carousel");
            if (el) el.scrollBy({ left: -280, behavior: "smooth" });
          }}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform shadow-lg"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => {
            const el = document.getElementById("s3-carousel");
            if (el) el.scrollBy({ left: 280, behavior: "smooth" });
          }}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform shadow-lg"
        >
          <ChevronRight size={22} />
        </button>
      </div>

    </div>
  </motion.div>
);

// Section 4 — Goals / Stats
const Section4 = ({ isDark }: { isDark: boolean }) => (
  <motion.div
    key="s4"
    initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    exit={{ opacity: 0, y: -60, filter: "blur(8px)" }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    className="w-full max-w-6xl mx-auto text-center"
  >
    {/* Label */}
    <p
      className={`text-xs uppercase tracking-[0.35em] mb-5 ${isDark ? "text-white/70" : "text-gray-700"
        }`}
    >
      Where We're Headed
    </p>

    {/* Headline */}
    <h2
      className={`text-4xl md:text-6xl font-extrabold mb-4 ${isDark ? "text-white" : "text-gray-900"
        }`}
    >
      Ambitious{" "}
      <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent font-extrabold">
        Goals.
      </span>
    </h2>

    <p
      className={`mb-16 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-500"
        }`}
    >
      These are the milestones we're racing toward as we scale FitFare across
      India's fastest-growing cities.
    </p>

    {/* Stats grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {trustStats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className={`relative overflow-hidden rounded-3xl p-8 border group transition-all duration-500 ${isDark
            ? "bg-white/[0.06] border-white/15 backdrop-blur-2xl"
            : "bg-white/70 border-gray-200 backdrop-blur-xl"
            }`}
        >
          {/* Glass Reflection Layer */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/25 via-white/10 to-transparent opacity-40 pointer-events-none" />

          {/* Soft Teal Glow on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#2a9d8f]/20 blur-[80px]" />
          </div>

          {/* Subtle Bottom Light */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent opacity-30 pointer-events-none" />

          {/* Premium Gradient Stat Value */}
          <div className="relative z-10 text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-[#1f6f8b] via-[#2a9d8f] to-[#3db4c7] bg-clip-text text-transparent">
            {s.value}
          </div>

          {/* Label */}
          <div
            className={`relative z-10 text-sm font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"
              }`}
          >
            {s.label}
          </div>

          {/* Subtext */}
          <div
            className={`relative z-10 text-xs ${isDark ? "text-gray-400" : "text-gray-500"
              }`}
          >
            {s.sub}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
/* ─────────────────────── MAIN COMPONENT ─────────────────────── */

const AboutSection = () => {
  const { theme, resolvedTheme } = useTheme();

  const isDark = (resolvedTheme ?? theme) === "dark";

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
  });

  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      if (v < 0.25) setActiveSection(0);
      else if (v < 0.5) setActiveSection(1);
      else if (v < 0.75) setActiveSection(2);
      else setActiveSection(3);
    });
  }, [smoothProgress]);



  return (
    <section id="about" ref={containerRef} className="relative md:h-[400vh]">

      {/* ── Mobile View (Natural Smooth Scroll) ── */}
      <div className="md:hidden relative w-full overflow-hidden">
        {/* Base Gradient */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: isDark
              ? "linear-gradient(160deg, #070b13 0%, #0c1422 60%, #0d1120 100%)"
              : "linear-gradient(160deg, #ffffff 0%, #f4f6fb 60%, #eef1f8 100%)",
          }}
        />

        {/* Ambient Orbs */}
        <div
          className={`absolute top-0 right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none ${isDark ? "bg-blue-600/8" : "bg-blue-400/12"
            }`}
        />
        <div
          className={`absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none ${isDark ? "bg-purple-600/8" : "bg-purple-400/8"
            }`}
        />

        <PremiumBubbles />

        <div className="relative z-10 w-full px-5 py-16 flex flex-col gap-20">
          <Section1 isDark={isDark} />
          <Section2 isDark={isDark} />
          <Section3 isDark={isDark} />
          <Section4 isDark={isDark} />
        </div>
      </div>
      {/* ── Desktop View (Sticky Scroll) ── */}
      <div className="hidden md:flex sticky top-0 h-screen w-full items-center overflow-hidden">

        {/* Base Gradient */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: isDark
              ? "linear-gradient(160deg, #070b13 0%, #0c1422 60%, #0d1120 100%)"
              : "linear-gradient(160deg, #ffffff 0%, #f4f6fb 60%, #eef1f8 100%)",
          }}
        />


        {/* Ambient Orbs */}
        <div
          className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${isDark ? "bg-blue-600/8" : "bg-blue-400/12"
            }`}
        />
        <div
          className={`absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${isDark ? "bg-purple-600/8" : "bg-purple-400/8"
            }`}
        />

        {/* ── Floating Bubbles ── */}
        <PremiumBubbles />


        {/* ── Scroll progress bar ── */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50"
          style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
        />

        {/* ── Section indicator dots (Desktop Only) ── */}
        <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-500 ${activeSection === i
                ? "h-6 bg-blue-400"
                : isDark
                  ? "h-1.5 bg-white/20"
                  : "h-1.5 bg-gray-400/40"
                }`}
            />
          ))}
        </div>


        {/* ── Content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            {activeSection === 0 && <Section1 isDark={isDark} />}
            {activeSection === 1 && <Section2 isDark={isDark} />}
            {activeSection === 2 && <Section3 isDark={isDark} />}
            {activeSection === 3 && <Section4 isDark={isDark} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;