import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ShieldOff,
  Wallet,
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  CalendarX,
  HandCoins,
  TimerOff,
  Infinity as InfinityIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Props = { isDark?: boolean };

const ACCENT = "#3b82f6";

const PERKS = [
  {
    icon: ShieldOff,
    label: "No Lock-In",
    sub: "Flexible plans with no long-term commitment",
  },
  { icon: Wallet, label: "No Upfront Fees", sub: "Zero joining cost" },
  { icon: Zap, label: "Instant Start", sub: "Train from day one" },
  { icon: TimerOff, label: "Pause Anytime", sub: "Life happens — no penalty" },
  { icon: HandCoins, label: "Pay-Per-Use", sub: "Only pay for what you use" },
  { icon: CalendarX, label: "No Commitment", sub: "Day-to-day freedom" },
];

const TRADITIONAL = [
  "Fixed-duration membership plans (monthly/annual)",
  "Upfront joining or registration fees may apply",
  "Limited flexibility in cancellation or refunds",
  "Pricing varies across different fitness centers",
  "Requires manual renewal after plan expiry",
  "Access restricted to a single location or branch",
];
const STEPS = [
  { num: "01", text: "Sign up for free", detail: "No card needed to start" },
  {
    num: "02",
    text: "Browse gyms & services",
    detail: "Access a wide range of fitness centers",
  },
  {
    num: "03",
    text: "Pick a flexible plan",
    detail: "Daily, weekly, or monthly",
  },
  { num: "04", text: "Start instantly", detail: "QR check-in ready in 60 sec" },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(to / 60);
    const t = setInterval(() => {
      n = Math.min(n + step, to);
      setVal(n);
      if (n >= to) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ─── Comparison toggle ────────────────────────────────────────────────────────
function ComparePanel({ isDark }: { isDark: boolean }) {
 const [mode, setMode] = useState<"traditional" | "fitfare">("fitfare");

  const fitfareItems = [
    "Access multiple partner gyms with flexibility",
    "Simple and transparent pricing",
    "Seamless in-app booking and management",
    "Pay based on your activity",
    "Real-time availability insights",
    "Flexible pause and resume options",
  ];

  return (
    <div>
      {/* Toggle */}
      <div
        className="flex rounded-xl p-1 mb-5 w-full"
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
        }}
      >
        {(["traditional", "fitfare"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="flex-1 py-2.5 rounded-lg text-xs font-bold capitalize transition-all duration-300 shadow-sm"
            style={{
              background:
                mode === m
                  ? m === "fitfare"
                    ? ACCENT
                    : "#ef4444"
                  : "transparent",
              color:
                mode === m
                  ? "white"
                  : isDark
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(0,0,0,0.5)",
              boxShadow:
                mode === m && !isDark ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {m === "traditional" ? "Fitness Center Membership": "FitFare Access"}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-2.5">
        <AnimatePresence mode="wait">
          {(mode === "traditional" ? TRADITIONAL : fitfareItems).map(
            (item, i) => (
              <motion.div
                key={`${mode}-${i}`}
                initial={{ opacity: 0, x: mode === "traditional" ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-3 p-3 rounded-xl text-sm border"
                style={{
                  background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                  borderColor: isDark ? "transparent" : "rgba(0,0,0,0.06)",
                  borderLeft: `3px solid ${mode === "traditional" ? (isDark ? "#ef444480" : "#ef4444") : isDark ? `${ACCENT}80` : ACCENT}`,
                  boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.02)",
                }}
              >
                <CheckCircle2
                  size={15}
                  className="shrink-0"
                  style={{
                    color:
                      mode === "traditional"
                        ? isDark
                          ? "rgba(255,255,255,0.4)"
                          : "rgba(0,0,0,0.4)"
                        : ACCENT,
                  }}
                />
                <span
                  className={
                    mode === "traditional"
                      ? `${isDark ? "text-white/60" : "text-black/60"}`
                      : "font-medium"
                  }
                >
                  {item}
                </span>
              </motion.div>
            ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function NoContractsUI({ isDark = true }: Props) {
  const textColor = isDark ? "text-white" : "text-gray-900";
  const mutedColor = isDark ? "text-white/55" : "text-gray-600";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const cardShadow = isDark ? "none" : "0 8px 24px rgba(0,0,0,0.04)";
  const sectionBg = isDark ? "#020617" : "#f8fafc";

  return (
    <section
      className={`relative min-h-screen ${textColor} overflow-hidden transition-colors duration-500`}
      style={{ background: sectionBg }}
    >
      {/* Background glows — dark mode only */}
      {isDark && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 20% 30%, rgba(59,130,246,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 40% 40% at 80% 75%, rgba(59,130,246,0.12) 0%, transparent 70%)",
            }}
          />
        </>
      )}
      {!isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% -20%, rgba(59,130,246,0.08) 0%, transparent 80%)",
          }}
        />
      )}

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,1)"} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16 md:py-24">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest bg-white shadow-sm border"
            style={{
              background: isDark ? `${ACCENT}15` : "#ffffff",
              color: ACCENT,
              borderColor: isDark ? `${ACCENT}35` : `${ACCENT}25`,
            }}
          >
            <Sparkles size={12} /> Zero Lock-In
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-5">
            Your Gym.{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #60a5fa)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Rules.
            </span>
          </h1>

          <p
            className={`text-base md:text-lg ${mutedColor} max-w-2xl mx-auto leading-relaxed`}
          >
            We earn your loyalty every day — not through restrictive contracts.
            Total freedom to train, pause, or leave on your terms, always.
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 mb-14 md:mb-20 items-start">
          {/* LEFT — Perks grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: ACCENT }}
            >
              What freedom looks like
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {PERKS.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
                    whileHover={{ scale: 1.04, y: -3 }}
                    className="group p-4 rounded-2xl border transition-all duration-300 cursor-default"
                    style={{
                      background: cardBg,
                      borderColor: cardBorder,
                      boxShadow: cardShadow,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        isDark ? `${ACCENT}50` : `${ACCENT}30`;
                      (e.currentTarget as HTMLDivElement).style.background =
                        isDark ? `${ACCENT}0a` : `${ACCENT}03`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        cardBorder;
                      (e.currentTarget as HTMLDivElement).style.background =
                        cardBg;
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        background: isDark ? `${ACCENT}18` : `${ACCENT}15`,
                      }}
                    >
                      <Icon size={17} style={{ color: ACCENT }} />
                    </div>
                    <p className="text-sm font-bold leading-tight mb-0.5">
                      {perk.label}
                    </p>
                    <p className={`text-[11px] ${mutedColor}`}>{perk.sub}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Infinity badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 p-4 rounded-2xl border flex items-center gap-4"
              style={{
                background: isDark ? `${ACCENT}08` : "#ffffff",
                borderColor: isDark ? `${ACCENT}30` : "rgba(0,0,0,0.08)",
                boxShadow: cardShadow,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: isDark ? `${ACCENT}20` : `${ACCENT}15` }}
              >
                <InfinityIcon size={22} style={{ color: ACCENT }} />
              </div>
              <div>
                <p className="font-bold text-sm">Unconditional Access</p>
                <p className={`text-xs ${mutedColor} mt-0.5`}>
                  Train today, pause tomorrow, resume whenever you’re ready —
                  forever welcome.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Contract mockup + Compare */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            <ComparePanel isDark={isDark} />
          </motion.div>
        </div>

        {/* ── HOW IT WORKS — Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="text-center mb-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: ACCENT }}
            >
              Getting Started
            </p>
            <h2 className="text-2xl sm:text-3xl font-black">
              From Sign-Up to Sweat in 4 Steps
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line — desktop */}
            <div
              className="hidden md:block absolute top-8 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-px"
              style={{
                background: `linear-gradient(to right, ${isDark ? `${ACCENT}40` : `${ACCENT}20`}, ${isDark ? `${ACCENT}20` : `${ACCENT}10`}, ${isDark ? `${ACCENT}40` : `${ACCENT}20`})`,
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Number bubble */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative transition-all duration-300 border"
                    style={{
                      background: isDark ? `${ACCENT}15` : "#ffffff",
                      borderColor: isDark ? `${ACCENT}35` : `${ACCENT}30`,
                      boxShadow: isDark
                        ? "none"
                        : "0 4px 14px rgba(0,0,0,0.06)",
                    }}
                  >
                    <span
                      className="text-lg font-black"
                      style={{ color: ACCENT }}
                    >
                      {step.num}
                    </span>
                    {/* Connector arrow — desktop */}
                    {i < 3 && (
                      <div
                        className="hidden md:block absolute -right-[calc(50%+8px)] top-1/2 -translate-y-1/2 bg-white/50 rounded-full"
                        style={{
                          background: isDark ? "transparent" : "#f8fafc",
                        }}
                      >
                        <ArrowRight
                          size={14}
                          style={{
                            color: isDark ? `${ACCENT}50` : `${ACCENT}80`,
                          }}
                          className="relative z-10"
                        />
                      </div>
                    )}
                  </motion.div>

                  <p className="font-bold text-sm mb-1">{step.text}</p>
                  <p className={`text-xs ${mutedColor}`}>{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        ></motion.div>
      </div>
    </section>
  );
}
