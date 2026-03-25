import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Globe,
  MapPin,
  CheckCircle2,
  QrCode,
  Building2,
  Star,
  ArrowRight,
  Zap,
  Users,
  Navigation,
  Wifi,
} from "lucide-react";

const ACCENT = "#06b6d4";

type Props = { isDark?: boolean };

const gyms = [
  {
    city: "Pune",
    rating: 4.9,
    members: "1.2k",
    tag: "Premium",
    x: "18%",
    y: "62%",
  },
  {
    city: "Mumbai",
    rating: 4.7,
    members: "3.4k",
    tag: "Featured",
    x: "12%",
    y: "45%",
  },
  {
    city: "Delhi",
    rating: 4.8,
    members: "2.1k",
    tag: "Top Rated",
    x: "42%",
    y: "18%",
  },
  {
    city: "Bangalore",
    rating: 4.6,
    members: "980",
    tag: "New",
    x: "30%",
    y: "72%",
  },
  {
    city: "Hyderabad",
    rating: 4.8,
    members: "1.8k",
    tag: "Popular",
    x: "38%",
    y: "55%",
  },
];

const benefits = [
  { icon: Zap, label: "Instant Booking", desc: "Reserve your spot in seconds" },
  { icon: Navigation, label: "GPS Locate Gyms", desc: "Find clubs near you" },
  { icon: Wifi, label: "Live Availability", desc: "Real-time slot tracking" },
{ icon: Users, label: "Active Members", desc: "Growing fitness community" },
];

const steps = [
  { num: "01", text: "Search gyms near you" },
  { num: "02", text: "Explore facilities & ratings" },
  { num: "03", text: "Book instantly" },
  { num: "04", text: "Check-in via QR code" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function MultipleClubsUI({ isDark = true }: Props) {
  const [activeGym, setActiveGym] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGym((prev) => (prev + 1) % gyms.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const textColor = isDark ? "text-white" : "text-slate-900";
  const mutedColor = isDark ? "text-white/55" : "text-slate-500";
  const sectionBg = isDark ? "bg-[#060e14]" : "bg-slate-50";

  return (
    <section className={`relative min-h-screen ${sectionBg} ${textColor} overflow-hidden transition-colors duration-500`}>
      {/* Background Radial Glows */}
      {isDark && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(6,182,212,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(99,102,241,0.06) 0%, transparent 70%)",
            }}
          />
        </>
      )}
      {!isDark && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(6,182,212,0.04) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(99,102,241,0.03) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)"
            : "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* — HEADER — */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <div
  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 mt-10 sm:mt-0 text-xs font-bold uppercase tracking-widest ${
    isDark ? "" : "bg-white shadow-sm"
  }`}
  style={{
    background: isDark ? `${ACCENT}15` : undefined,
    color: ACCENT,
    border: `1px solid ${isDark ? `${ACCENT}35` : `${ACCENT}25`}`,
  }}
>
  <Globe size={12} />
  Global Network
</div>
          <h2 className="text-5xl md:text-6xl font-black leading-tight mb-5 tracking-tight">
            Train{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #818cf8)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Anywhere.
            </span>
            <br />
            No Limits. No Boundaries.
          </h2>
          <p className={`text-lg ${mutedColor} max-w-2xl mx-auto leading-relaxed`}>
            Access a vast network of premium gyms across every major city.
            Seamless check-ins, real-time availability, and zero downtime on
            your fitness journey.
          </p>
        </motion.div>

        {/* — MAIN CONTENT — */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* LEFT – Benefits + Steps */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            {/* Benefit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{
                    scale: 1.04,
                    borderColor: isDark ? `${ACCENT}60` : `${ACCENT}40`,
                    background: isDark ? `${ACCENT}08` : `${ACCENT}05`,
                    boxShadow: isDark ? "none" : "0 4px 12px rgba(6, 182, 212, 0.08)"
                  }}
                  className={`p-4 md:p-5 rounded-2xl border ${isDark ? "border-white/8 bg-white/[0.03]" : "border-slate-200 bg-white"} backdrop-blur-sm cursor-default transition-all duration-300 focus:outline-none ${isDark ? "" : "shadow-sm"}`}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: isDark ? `${ACCENT}20` : `${ACCENT}15` }}
                  >
                    <b.icon size={17} style={{ color: ACCENT }} />
                  </div>
                  <p className={`text-sm font-semibold mb-0.5 ${isDark ? "text-white" : "text-slate-900"}`}>
                    {b.label}
                  </p>
                  <p className={`text-xs ${isDark ? "text-white/45" : "text-slate-500"}`}>{b.desc}</p>
                </motion.div>
              ))}
            </div>

            <div
              className={`rounded-2xl p-4 md:p-6 border ${isDark ? "border-white/8" : "border-slate-200"} ${isDark ? "" : "shadow-md bg-white"}`}
              style={{ 
                background: isDark ? "rgba(6,18,26,0.7)" : undefined, 
                backdropFilter: isDark ? "blur(12px)" : undefined 
              }}
            >
              <h3 className={`text-sm font-bold uppercase tracking-widest ${isDark ? "text-white/40" : "text-slate-400"} mb-5`}>
                How It Works
              </h3>
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <span
                      className={`text-2xl font-black transition-all duration-300 w-10 shrink-0 ${isDark ? "opacity-20 group-hover:opacity-90" : "opacity-30 group-hover:opacity-100"}`}
                      style={{ color: ACCENT }}
                    >
                      {step.num}
                    </span>
                    <div className={`flex-1 h-px transition-all duration-300 ${isDark ? "bg-white/5 group-hover:bg-cyan-500/30" : "bg-slate-200 group-hover:bg-cyan-500/30"}`} />
                    <span className={`text-sm transition-all duration-300 ${isDark ? "text-white/70 group-hover:text-white" : "text-slate-500 group-hover:text-slate-900"}`}>
                      {step.text}
                    </span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-cyan-400"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT – Interactive Map + Gym Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative"
          >
            {/* Map Panel */}
            <div
              className={`rounded-3xl overflow-hidden border ${isDark ? "border-white/10 shadow-2xl" : "border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/90"}`}
              style={{ 
                background: isDark ? "rgba(6,18,26,0.85)" : undefined, 
                backdropFilter: "blur(20px)" 
              }}
            >
              {/* Map Header */}
              <div className={`px-5 py-4 border-b ${isDark ? "border-white/8" : "border-slate-100"} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className={`text-xs font-semibold ${isDark ? "text-white/60" : "text-slate-500"}`}>
                    Live Club Locator
                  </span>
                </div>
                <span className={`text-xs ${isDark ? "text-white/30" : "text-slate-400"}`}>
                  {gyms.length} gyms active
                </span>
              </div>

              {/* Map Area */}
              <div className="relative h-56 overflow-hidden">
                {/* Map gradient bg */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isDark
                      ? "radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, rgba(6,14,20,0.95) 80%)"
                      : "radial-gradient(ellipse at center, rgba(6,182,212,0.04) 0%, rgba(248,250,252,0.95) 80%)",
                  }}
                />
                {/* Subtle dot grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: isDark
                      ? "radial-gradient(circle, rgba(6,182,212,0.4) 1px, transparent 1px)"
                      : "radial-gradient(circle, rgba(6,182,212,0.8) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  {gyms.map((gym, i) =>
                    gyms.slice(i + 1, i + 3).map((g2, j) => (
                      <line
                        key={`${i}-${j}`}
                        x1={gym.x}
                        y1={gym.y}
                        x2={g2.x}
                        y2={g2.y}
                        stroke={ACCENT}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    ))
                  )}
                </svg>

                {/* Gym pins */}
                {gyms.map((gym, i) => (
                  <motion.button
                    key={gym.city}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    onClick={() => setActiveGym(i)}
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                    className="absolute flex flex-col items-center"
                    style={{ left: gym.x, top: gym.y, transform: "translate(-50%,-50%)" }}
                  >
                    {/* Pulse ring for active */}
                    {activeGym === i && (
                      <motion.div
                        className="absolute rounded-full border"
                        style={{ borderColor: `${ACCENT}60` }}
                        initial={{ width: 10, height: 10, opacity: 0.8 }}
                        animate={{ width: 36, height: 36, opacity: 0 }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    )}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isDark ? "shadow-lg" : "shadow-md"}`}
                      style={{
                        background:
                          activeGym === i ? ACCENT : (isDark ? "rgba(6,14,20,0.9)" : "#ffffff"),
                        borderColor: activeGym === i ? ACCENT : (isDark ? `${ACCENT}50` : `${ACCENT}40`),
                        boxShadow: activeGym === i ? `0 0 14px ${ACCENT}60` : "none",
                      }}
                    >
                      <MapPin size={12} color={activeGym === i ? "#fff" : ACCENT} />
                    </div>
                    <AnimatePresence>
                      {(hovered === i || activeGym === i) && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className={`mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap pointer-events-none ${isDark ? "" : "shadow-sm border border-cyan-100"}`}
                          style={{ 
                            background: isDark ? `${ACCENT}25` : "white", 
                            color: isDark ? ACCENT : "#0891b2" // slightly darker cyan for readability
                          }}
                        >
                          {gym.city}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>

              {/* Active Gym Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGym}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`px-5 py-4 border-t ${isDark ? "border-white/8" : "border-slate-100"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: isDark ? `${ACCENT}15` : `${ACCENT}10` }}
                      >
                        <Building2 size={18} style={{ color: ACCENT }} />
                      </div>
                      <div>
                        <p className={`font-bold text-sm leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                          {gyms[activeGym].city}
                        </p>
                        <p className={`text-xs ${isDark ? "text-white/45" : "text-slate-500"} flex items-center gap-1 mt-0.5`}>
                          <MapPin size={10} /> Location
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{gyms[activeGym].rating}</span>
                      </div>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: isDark ? `${ACCENT}20` : `${ACCENT}15`, color: isDark ? ACCENT : "#0891b2" }}
                      >
                        {gyms[activeGym].tag}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 text-xs ${isDark ? "text-white/40" : "text-slate-500"}`}>
                      <Users size={12} />
                      <span>{gyms[activeGym].members} members</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-500 font-semibold">Available Now</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Gym List Tabs */}
              <div className="px-5 pb-5 grid grid-cols-5 gap-1.5">
                {gyms.map((g, i) => (
                  <button
                    key={g.city}
                    onClick={() => setActiveGym(i)}
                    className="py-1.5 rounded-lg text-[10px] font-semibold truncate transition-all duration-300"
                    style={{
                      background: activeGym === i ? (isDark ? `${ACCENT}25` : `${ACCENT}15`) : (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"),
                      color: activeGym === i ? (isDark ? ACCENT : "#0891b2") : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)"),
                      border: `1px solid ${activeGym === i ? (isDark ? ACCENT + "40" : ACCENT + "30") : "transparent"}`,
                    }}
                  >
                    {g.city}
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Badge – QR */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -bottom-2 -right-2 md:-bottom-5 md:-right-5 p-4 rounded-2xl border ${isDark ? "border-white/10 shadow-2xl" : "border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/95"} flex items-center gap-3`}
              style={{
                background: isDark ? "rgba(6,18,26,0.9)" : undefined,
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: isDark ? `${ACCENT}20` : `${ACCENT}15` }}
              >
                <QrCode size={20} style={{ color: ACCENT }} />
              </div>
              <div>
                <p className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Instant Check-In</p>
                <p className={`text-[10px] ${isDark ? "text-white/40" : "text-slate-500"}`}>Scan & enter in 2 sec</p>
              </div>
            </motion.div>

            {/* Floating Badge – Members */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -top-2 -left-2 md:-top-5 md:-left-5 p-3 rounded-2xl border ${isDark ? "border-white/10 shadow-2xl" : "border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/95"} flex items-center gap-2`}
              style={{
                background: isDark ? "rgba(6,18,26,0.9)" : undefined,
                backdropFilter: "blur(16px)",
              }}
            >
              <CheckCircle2 size={16} style={{ color: ACCENT }} />
              <p className={`text-xs font-bold ${isDark ? "text-white/80" : "text-slate-800"}`}>
                Network
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
