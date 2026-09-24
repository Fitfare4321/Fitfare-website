import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Cpu,
  Activity,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";

const ACCENT = "#a855f7";
const ACCENT2 = "#3b82f6";

// ─── Time-slot pricing data ───────────────────────────────────────────────────
const slots = [
  { time: "6–8 AM", label: "Morning Rush", demand: 88, color: "#f97316" },
  { time: "10–12 PM", label: "Mid Morning", demand: 42, color: "#22c55e" },
  { time: "1–3 PM", label: "Afternoon", demand: 28, color: "#3b82f6" },
  { time: "5–8 PM", label: "Peak Hours", demand: 97, color: "#ef4444" },
  { time: "9–11 PM", label: "Night Owl", demand: 18, color: "#a855f7" },
];

// ─── Benefits ──────────────────────────────────────────────────────────────────
const benefits = [
  { icon: TrendingUp, text: "Optimized revenue generation", color: "#22c55e" },
  { icon: ShieldCheck, text: "Balanced crowd distribution", color: "#3b82f6" },
  { icon: Zap, text: "Real-time adaptive pricing", color: "#f97316" },
  { icon: CheckCircle2, text: "Enhanced user affordability", color: "#a855f7" },
];

// ─── Engine pillars ────────────────────────────────────────────────────────────
const pillars = [
  { icon: BrainCircuit, label: "Smart Core", desc: "Built for adaptive pricing and seamless access" },
  { icon: BarChart3, label: "Demand Engine", desc: "Monitors demand across locations and time slots" },
  { icon: Activity, label: "Live Sync", desc: "Keeps availability and bookings in sync instantly" },
];

// ─── Live demand bar ───────────────────────────────────────────────────────────
const demandCycles = [15, 72, 45, 91, 38, 83, 60];

function LiveDemandBar() {
  const [idx, setIdx] = useState(0);
  const val = demandCycles[idx];
  const color =
    val > 80 ? "#ef4444" : val > 55 ? "#f97316" : val > 35 ? "#eab308" : "#22c55e";

  useEffect(() => {
    const t = setInterval(
      () => setIdx((p) => (p + 1) % demandCycles.length),
      1800
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-500 dark:text-white/50 uppercase tracking-widest">
          Live Demand
        </span>
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color }}
          />
          <motion.span
            key={val}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold"
            style={{ color }}
          >
            {val}%
          </motion.span>
        </div>
      </div>

      <div className="h-2.5 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${val}%`, background: color }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="h-full rounded-full"
          style={{ boxShadow: `0 0 12px ${color}80` }}
        />
      </div>

      <div className="flex justify-between text-[10px] mt-1.5 text-gray-400 dark:text-gray-400 dark:text-white/25">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
}

// ─── Mini bar chart ────────────────────────────────────────────────────────────
function MiniChart({ slot }: { slot: (typeof slots)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex items-end gap-0.5 h-8">
      {Array.from({ length: 8 }).map((_, i) => {
        const h = Math.max(20, Math.min(100, slot.demand + Math.sin(i * 1.3) * 25));
        return (
          <motion.div
            key={i}
            className="w-1.5 rounded-sm"
            style={{ background: `${slot.color}60` }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${h}%` } : {}}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          />
        );
      })}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function DynamicPricingPage() {
  const [activeSlot, setActiveSlot] = useState(3);

  return (
    <section className="relative min-h-screen bg-white dark:bg-[#0A0514] text-gray-900 dark:text-white overflow-hidden">

      {/* ALL ORIGINAL BACKGROUND EFFECTS KEPT */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 75% 30%, rgba(168,85,247,0.1) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 20% 75%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.15) 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative w-full md:max-w-7xl md:mx-auto px-4 md:px-12 py-10 md:py-20">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 mt-6 md:mt-0 text-xs font-bold uppercase tracking-widest"
            style={{
              background: `${ACCENT}15`,
              color: ACCENT,
              border: `1px solid ${ACCENT}35`,
            }}
          >
            <Sparkles size={12} />
            Dynamic Pricing
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-5">
            Smart Pricing,{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT2}, ${ACCENT})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Zero Guesswork.
            </span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-white/50 max-w-2xl mx-auto leading-relaxed">
            “Flexible pricing based on peak hours and availability — ensuring better access and fair pricing for every member.”
          </p>
        </motion.div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6 md:gap-7"
          >
            {/* Live demand bar card */}
            <div
              className="rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-white/8"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-gray-700 dark:text-white/70 uppercase tracking-widest">
                  Demand Monitor
                </h3>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${ACCENT}20`, color: ACCENT }}
                >
                  LIVE
                </span>
              </div>
              <LiveDemandBar />
            </div>

            {/* Time-slot pricing cards */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">
                Dynamic Price Slots
              </h3>
              <div className="space-y-3">
                {slots.map((slot, i) => (
                  <motion.button
                    key={slot.time}
                    onClick={() => setActiveSlot(i)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full flex items-center gap-3 md:gap-4 p-4 rounded-xl border text-left transition-all duration-300"
                    style={{
                      background:
                        activeSlot === i
                          ? `${slot.color}12`
                          : "rgba(255,255,255,0.025)",
                      borderColor:
                        activeSlot === i ? `${slot.color}50` : "rgba(255,255,255,0.07)",
                    }}
                  >
                    {/* Demand bar */}
                    <div className="w-1.5 rounded-full self-stretch"
                      style={{ background: slot.color, opacity: activeSlot === i ? 1 : 0.35 }} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold">{slot.time}</span>

                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-white/40">{slot.label}</span>
                        <div className="flex items-center gap-1.5">
                          <div
                            className="h-1.5 w-16 rounded-full bg-gray-200 dark:bg-white/5 overflow-hidden"
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: slot.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${slot.demand}%` }}
                              transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-400 dark:text-white/30">
                            {slot.demand}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mini chart */}
                    <div className="shrink-0">
                      <MiniChart slot={slot} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col gap-6 md:gap-7"
          >
            {/* Main glow card */}
            <div className="relative">
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-lg opacity-25 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT2}, ${ACCENT})`,
                }}
              />
              <div
                className="relative rounded-3xl p-5 md:p-7 border border-gray-200 dark:border-white/10"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* AI pulse */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `${ACCENT}20` }}
                    >
                      <BrainCircuit size={22} style={{ color: ACCENT }} />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-xl"
                      style={{ border: `1px solid ${ACCENT}` }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Dynamic Pricing </p>
                    <p className="text-xs font-bold text-gray-800 dark:text-white mb-0.5">· Updating live</p>
                  </div>
                  <ArrowUpRight size={16} className="ml-auto text-gray-400 dark:text-white/20" />
                </div>

                <p className="text-gray-600 dark:text-white/55 text-sm leading-relaxed mb-6">
                  “Smart pricing that adapts to demand, time slots, and gym availability. Improve revenue, reduce overcrowding, and offer users fair, flexible pricing.”
                </p>

                {/* Engine pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-7">
                  {pillars.map((p, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.06, borderColor: `${ACCENT}60` }}
                      className="flex flex-col items-center p-3 md:p-4 rounded-xl border border-white/8  bg-gray-100 dark:bg-white/[0.03] text-center transition-all duration-300 cursor-default"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                        style={{ background: `${ACCENT}18` }}
                      >
                        <p.icon size={17} style={{ color: ACCENT }} />
                      </div>
                      <p className="text-xs font-bold text-white mb-0.5">{p.label}</p>
                      <p className="text-[10px] text-gray-500 dark:text-white/35">{p.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Key benefits */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-white/35 mb-4">
                    Key Benefits
                  </h4>
                  <div className="space-y-3">
                    {benefits.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center gap-3 group"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${b.color}18` }}
                        >
                          <b.icon size={14} style={{ color: b.color }} />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-white/35 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                          {b.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: "+32%", label: "Revenue Lift", color: "#22c55e" },
                { value: "−18%", label: "Overcrowding", color: "#3b82f6" },
                { value: "24/7", label: "Automation", color: ACCENT },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                className="p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-200 dark:border-white/8 bg-white/[0.03] text-center cursor-default">
                  <p
                     className="text-lg md:text-2xl font-black mb-1"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[10px] md:text-[11px] text-gray-500 dark:text-white/40 leading-tight">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Active slot detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlot}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl p-4 md:p-5 border flex items-center justify-between"
                style={{
                  background: `${slots[activeSlot].color}0d`,
                  borderColor: `${slots[activeSlot].color}40`,
                }}
              >
                <div>
                  <p className="text-xs text-gray-500 dark:text-white/40 mb-0.5">Selected Slot</p>
                  <p className="font-bold">{slots[activeSlot].time} · {slots[activeSlot].label}</p>

                </div>

              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
