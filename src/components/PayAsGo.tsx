import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Wallet,
    CheckCircle2,
    CreditCard,
    Zap,
    TrendingDown,
    ArrowRight,
    Sparkles,
    ReceiptText,
    ShieldCheck,
    Clock,
    IndianRupee,
    Lock,
} from "lucide-react";

type Props = { isDark?: boolean };

// ─── Theme ────────────────────────────────────────────────────────────────────
const ACCENT = "#3b82f6";

// ─── Data ─────────────────────────────────────────────────────────────────────
const BENEFITS = [
    { icon: TrendingDown, label: "Save More", desc: "Pay only for sessions you actually attend" },
   { icon: ShieldCheck, label: "Upfront Pricing", desc: "Know exactly what you’ll pay before checkout" },
    { icon: CreditCard, label: "Instant Payment", desc: "One-tap checkout, no friction" },
    { icon: Lock, label: "Full Budget Control", desc: "Set monthly limits, never overspend" },
];

const STEPS = [
    { num: "01", title: "Choose Fitness Center & Time Slot",desc: "Explore fitness centers and choose your session", icon: Clock },
    { num: "02", title: "See Exact Price", desc: "Full cost shown upfront, always", icon: ReceiptText },
    { num: "03", title: "Pay in One Tap", desc: "UPI / card, done in 3 seconds", icon: Zap },
    { num: "04", title: "Workout Confirmed", desc: "QR ready, just walk in", icon: CheckCircle2 },
];


// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
    const [val, setVal] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let n = 0;
        const step = Math.ceil(to / 55);
        const t = setInterval(() => {
            n = Math.min(n + step, to);
            setVal(n);
            if (n >= to) clearInterval(t);
        }, 18);
        return () => clearInterval(t);
    }, [inView, to]);

    return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

function SessionTicker({ isDark }: { isDark: boolean }) {
    const [idx, setIdx] = useState(0);
   

    const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)";
    const bgContainer = isDark ? "rgba(255,255,255,0.03)" : "#ffffff";
    const textMuted = isDark ? "text-white/40" : "text-black/60";
    const textLight = isDark ? "text-white/25" : "text-black/50";

    return (
        <div
            className="rounded-2xl border overflow-hidden"
            style={{
                background: bgContainer,
                borderColor,
                boxShadow: isDark ? "none" : "0 8px 24px rgba(0,0,0,0.06)"
            }}
        >
         
        </div>
    );
}

// ─── Savings Calculator ────────────────────────────────────────────────────────
function SavingsCalc({ isDark }: { isDark: boolean }) {
    const [sessions, setSessions] = useState(8);
    const perSession = 129;
    const traditional = 1499;
    const fitfare = sessions * perSession;
    const saved = Math.max(0, traditional - fitfare);
    const savePercent = Math.round((saved / traditional) * 100);

    const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)";
    const bgContainer = isDark ? "rgba(255,255,255,0.03)" : "#ffffff";
    const textMuted = isDark ? "text-white/40" : "text-black/60";
    const textLight = isDark ? "text-white/20" : "text-black/40";

    return (
        <div
            className="rounded-2xl border p-5"
            style={{
                background: bgContainer,
                borderColor,
                boxShadow: isDark ? "none" : "0 8px 24px rgba(0,0,0,0.05)"
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <p className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}>Savings Calculator</p>
                <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${ACCENT}20`, color: ACCENT }}
                >
                    Interactive
                </span>
            </div>

            {/* Sessions slider */}
            <div className="mb-5">
                <div className={`flex justify-between text-xs ${textMuted} mb-2`}>
                    <span>Sessions this month</span>
                    <span className={`font-bold ${isDark ? "text-white" : "text-black"}`}>{sessions}</span>
                </div>
                <input
                    type="range" min={1} max={20} value={sessions}
                    onChange={(e) => setSessions(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{ accentColor: ACCENT }}
                />
                <div className={`flex justify-between text-[10px] ${textLight} mt-1`}>
                    <span>1</span><span>20</span>
                </div>
            </div>

            {/* Cost comparison */}
            <div className="space-y-3 mb-4">
                {[
                    { label: "Traditional Monthly Gym", val: traditional, crossed: true, color: "#ef4444" },
                    { label: `FitFare (${sessions} sessions × ₹${perSession})`, val: fitfare, crossed: false, color: ACCENT },
                ].map((row) => (
                    <div key={row.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                            <span className={row.crossed ? "opacity-40 line-through" : "font-semibold"}>{row.label}</span>
                            <span style={{ color: row.color }} className="font-black">₹{row.val}</span>
                        </div>
                        <div className="h-2 rounded-full w-full" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: row.color, opacity: row.crossed ? 0.35 : 1 }}
                                animate={{ width: `${Math.min(100, (row.val / traditional) * 100)}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Saving highlight */}
            <AnimatePresence mode="wait">
                {saved > 0 && (
                    <motion.div
                        key={saved}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between px-4 py-3 rounded-xl"
                        style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}30` }}
                    >
                        <span className={`text-xs font-semibold ${isDark ? "text-white/60" : "text-black/60"}`}>You save</span>
                        <span className="text-lg font-black" style={{ color: ACCENT }}>
                            ₹{saved} ({savePercent}%)
                        </span>
                    </motion.div>
                )}
                {saved <= 0 && (
                    <motion.div
                        key="break-even"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-center text-xs ${isDark ? "text-white/30" : "text-black/40"} py-2`}
                    >
                        You've hit the traditional price — but with full flex!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PayAsYouGoUI({ isDark = true }: Props) {
    const textColor = isDark ? "text-white" : "text-gray-900";
    const bgMain = isDark ? "bg-[#020617]" : "bg-[#f8fafc]";
    const textMuted = isDark ? "text-white/50" : "text-black/60";
    const overlayColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.1)";
    const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
    const cardBg = isDark ? "rgba(255,255,255,0.03)" : "#ffffff";

    return (
        <section className={`relative min-h-screen ${bgMain} ${textColor} overflow-hidden transition-colors duration-500`}>
            {/* Background — subtle warm glow */}
            {isDark && (
                <>
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 50% 40% at 20% 25%, rgba(59,130,246,0.07) 0%, transparent 65%)",
                        }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 40% 35% at 80% 70%, rgba(59,130,246,0.04) 0%, transparent 65%)",
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

            {/* Grid texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.028]"
                style={{
                    backgroundImage:
                        `linear-gradient(${overlayColor} 1px,transparent 1px),linear-gradient(90deg,${overlayColor} 1px,transparent 1px)`,
                    backgroundSize: "36px 36px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16 md:py-24">

                {/* ── HEADER ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14 md:mb-18"
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest"
                        style={{ background: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}35` }}
                    >
                        <Sparkles size={12} /> Pay-Per-Session
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-5">
                        Only Pay When{" "}
                        <span className="text-blue-500">
                            You Train.
                        </span>
                    </h1>

                    <p className={`text-base md:text-lg ${textMuted} max-w-2xl mx-auto leading-relaxed`}>
                        No subscriptions, no wasted money. FitFare's Pay-As-You-Go model gives you
                        complete financial control — pay per session, only when you show up.
                    </p>
                </motion.div>

               

                {/* ── MAIN GRID ── */}
                <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 mb-16 items-start">

                    {/* LEFT — Benefits + Steps */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="flex flex-col gap-6"
                    >
                        {/* Benefit cards */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
                                Why it's smarter
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {BENEFITS.map((b, i) => {
                                    const Icon = b.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 + i * 0.08 }}
                                            whileHover={{ scale: 1.04, y: -3 }}
                                            className="p-4 rounded-2xl border transition-all duration-300 cursor-default group"
                                            style={{ background: cardBg, borderColor: isDark ? "rgba(59,130,246,0.10)" : "rgba(0,0,0,0.06)" }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLDivElement).style.borderColor = `${ACCENT}50`;
                                                (e.currentTarget as HTMLDivElement).style.background = `${ACCENT}09`;
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLDivElement).style.borderColor = isDark ? "rgba(59,130,246,0.10)" : "rgba(0,0,0,0.06)";
                                                (e.currentTarget as HTMLDivElement).style.background = cardBg;
                                            }}
                                        >
                                            <div
                                                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                                                style={{ background: `${ACCENT}18` }}
                                            >
                                                <Icon size={17} style={{ color: ACCENT }} />
                                            </div>
                                            <p className="text-sm font-bold leading-tight mb-0.5">{b.label}</p>
                                            <p className={`text-[11px] ${isDark ? "text-white/40" : "text-black/50"}`}>{b.desc}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Steps timeline */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
                                How it works
                            </p>
                            <div className="relative flex flex-col gap-0">
                                {STEPS.map((step, i) => {
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.09 }}
                                            className="flex gap-4 group"
                                        >
                                            {/* Line + dot */}
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110"
                                                    style={{ background: `${ACCENT}12`, borderColor: `${ACCENT}30` }}
                                                >
                                                    <span className="text-xs font-black" style={{ color: ACCENT }}>{step.num}</span>
                                                </div>
                                                {i < STEPS.length - 1 && (
                                                    <div className="w-px flex-1 my-1" style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", minHeight: 20 }} />
                                                )}
                                            </div>
                                            {/* Text */}
                                            <div className="pb-5 pt-1">
                                                <p className="font-bold text-sm">{step.title}</p>
                                                <p className={`text-xs ${isDark ? "text-white/40" : "text-black/50"} mt-0.5`}>{step.desc}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT — Ticker + Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex flex-col gap-5"
                    >
                        <SessionTicker isDark={isDark} />
                        <SavingsCalc isDark={isDark} />

                        {/* Wallet badge */}
                        <motion.div
                            className="flex items-center gap-4 px-5 py-4 rounded-2xl border"
                            style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}28` }}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: `${ACCENT}20` }}
                            >
                                <IndianRupee size={20} style={{ color: ACCENT }} />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Transparent Billing, Always</p>
                                <p className={`text-xs ${isDark ? "text-white/40" : "text-black/50"} mt-0.5`}>
                                    Your wallet shows exactly what you spent, session by session. No surprises, no fine print.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── BOTTOM COMPARISON STRIP ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="rounded-3xl border overflow-hidden"
                    style={{ borderColor: cardBorder, background: isDark ? "rgba(255,255,255,0.02)" : "white", boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.03)" }}
                >
                    <div className="px-6 md:px-10 py-5 border-b flex items-center justify-between"
                        style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                        <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-white/35" : "text-black/40"}`}>Membership Plans & Flexible Access</p>
                    </div>
                    <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x"
                        style={{
                            // Tailwind divide color variable: use CSS custom property to avoid DOM style typing errors
                            "--tw-divide-color": isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
                        } as React.CSSProperties}>
                      
<div className="p-6 md:p-8">
  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
    Membership Model
  </p>
  <ul className="space-y-3">
    {[
      "Monthly plans for regular fitness center users",
      "Structured memberships with added benefits",
      "Commitment-based access",
      "Best suited for consistent routines",
    ].map((t, i) => (
      <li
        key={i}
        className={`flex items-start gap-2.5 text-sm ${
          isDark ? "text-white/60" : "text-black/60"
        }`}
      >
        <span className="text-base leading-tight shrink-0">•</span>
        <span>{t}</span>
      </li>
    ))}
  </ul>
</div>


<div
  className="p-6 md:p-8"
  style={{ background: `${ACCENT}05` }}
>
  <p
    className="text-xs font-black uppercase tracking-widest mb-4"
    style={{ color: ACCENT }}
  >
    Flexible Access with FitFare
  </p>
  <ul className="space-y-3">
    {[
      "Pay only when you train",
      "No joining or upfront fees",
      "No lock-in, pause anytime",
      "Freedom to train across partner gyms",
    ].map((t, i) => (
      <li key={i} className="flex items-start gap-2.5 text-sm">
        <CheckCircle2
          size={15}
          className="mt-0.5 shrink-0"
          style={{ color: ACCENT }}
        />
        <span
          className={`font-medium ${
            isDark ? "text-white/80" : "text-black/80"
          }`}
        >
          {t}
        </span>
      </li>
    ))}
  </ul>
</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}