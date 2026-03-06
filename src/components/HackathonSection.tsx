import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Trophy, Zap, ArrowRight, Star } from "lucide-react";
import { useTheme } from "next-themes";

/* ─────── LIVE COUNTDOWN ─────── */
const CountdownTimer = ({ isDark }: { isDark: boolean }) => {
    const target = new Date();
    target.setDate(target.getDate() + 60);

    const [t, setT] = useState({ d: 60, h: 0, m: 0, s: 0 });

    useEffect(() => {
        const id = setInterval(() => {
            const diff = target.getTime() - Date.now();
            if (diff > 0)
                setT({
                    d: Math.floor(diff / 86400000),
                    h: Math.floor((diff % 86400000) / 3600000),
                    m: Math.floor((diff % 3600000) / 60000),
                    s: Math.floor((diff % 60000) / 1000),
                });
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const units = [
        { v: t.d, l: "Days" },
        { v: t.h, l: "Hours" },
        { v: t.m, l: "Min" },
        { v: t.s, l: "Sec" },
    ];

    return (
        <div className="flex items-end gap-4 md:gap-8 justify-center">
            {units.map((u, i) => (
                <div key={u.l} className="flex items-end gap-4 md:gap-8">
                    <div className="text-center">
                        <motion.div
                            key={u.v}
                            initial={{ y: -8, opacity: 0.3 }}
                            animate={{ y: 0, opacity: 1 }}
                            className={`text-5xl md:text-7xl font-black tabular-nums leading-none ${isDark ? "text-slate-900" : "text-white"
                                }`}
                        >
                            {String(u.v).padStart(2, "0")}
                        </motion.div>
                        <div
                            className="text-[10px] uppercase tracking-[0.25em] mt-1 font-bold"
                            style={{ color: isDark ? "#94a3b8" : "rgba(255,255,255,0.5)" }}
                        >
                            {u.l}
                        </div>
                    </div>
                    {i < units.length - 1 && (
                        <span
                            className={`text-3xl md:text-5xl font-black pb-5 leading-none ${isDark ? "text-slate-400" : "text-white/40"
                                }`}
                        >
                            :
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

/* ─────── FLOATING ORB ─────── */
const Orb = ({
    color,
    size,
    style,
    duration,
}: {
    color: string;
    size: number;
    style: React.CSSProperties;
    duration: number;
}) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color}, transparent 70%)`,
            filter: "blur(60px)",
            ...style,
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
);

/* ─────── MAIN COMPONENT ─────── */
const HackathonSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.1 });
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    /* ── theme tokens ── */
    const bg = isDark ? "#ffffff" : "#060e22";
    const textPrimary = isDark ? "#0f172a" : "#ffffff";
    const textSecondary = isDark ? "#64748b" : "rgba(255,255,255,0.55)";
    const accentLine = isDark ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)";

    const highlights = [
        {
            icon: Zap,
            label: "Zero Fees",
            detail: "Completely free to participate — no registration cost, ever.",
            accent: "#FCD34D",
        },
        {
            icon: Code,
            label: "Real Challenges",
            detail: "Solve genuine fitness & health-tech problems that matter.",
            accent: "#60A5FA",
        },
        {
            icon: Trophy,
            label: "Win Big",
            detail: "Cash prizes, internships & spotlight for the best builders.",
            accent: "#34D399",
        },
        {
            icon: Star,
            label: "24-Hour Sprint",
            detail: "Intensive, focused, team-driven creation window.",
            accent: "#A78BFA",
        },
    ];

    return (
        <section
            id="hackathon"
            ref={ref}
            className="relative overflow-hidden"
            style={{ background: bg }}
        >
            {/* ── AMBIENT ORBS ── */}
            <Orb
                color={isDark ? "rgba(99,102,241,0.25)" : "rgba(59,130,246,0.45)"}
                size={700}
                style={{ top: "-20%", left: "-15%" }}
                duration={22}
            />
            <Orb
                color={isDark ? "rgba(16,185,129,0.2)" : "rgba(52,211,153,0.35)"}
                size={600}
                style={{ bottom: "-15%", right: "-10%" }}
                duration={28}
            />
            <Orb
                color={isDark ? "rgba(252,211,77,0.12)" : "rgba(252,211,77,0.2)"}
                size={400}
                style={{ top: "40%", left: "55%" }}
                duration={18}
            />

            {/* ── GRID OVERLAY (subtle only in dark mode) ── */}
            {!isDark && (
                <div
                    className="absolute inset-0 opacity-[0.035] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                        backgroundSize: "55px 55px",
                    }}
                />
            )}

            {/* ────────── HERO BAND ────────── */}
            <div className="relative z-10 pt-24 pb-16 md:pt-36 md:pb-24 px-6 max-w-7xl mx-auto">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-10"
                >
                    <span
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em]"
                        style={{
                            background: isDark ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.08)",
                            border: `1px solid ${isDark ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.15)"}`,
                            color: isDark ? "#6366f1" : "#93c5fd",
                        }}
                    >
                        <motion.span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: isDark ? "#6366f1" : "#60a5fa" }}
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                        />
                        Flagship Event · 2026
                    </span>
                </motion.div>

                {/* GIANT Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-center mb-10"
                >
                    <h2
                        className="font-black tracking-tight leading-[0.92] text-[clamp(3.5rem,10vw,8rem)]"
                        style={{ color: textPrimary }}
                    >
                        FitFare
                        <br />
                        <span
                            style={{
                                background: "linear-gradient(135deg, #60A5FA 0%, #34D399 45%, #A78BFA 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                filter: "drop-shadow(0 0 60px rgba(96,165,250,0.5))",
                            }}
                        >
                            Hackathon
                        </span>
                    </h2>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-center text-lg md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed font-light"
                    style={{ color: textSecondary }}
                >
                    Code. Create. Conquer. <br className="hidden md:block" />
                    Build the future of fitness technology — <strong style={{ color: textPrimary }}>no fees required.</strong>
                </motion.p>

                {/* COUNTDOWN */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-center mb-6"
                >
                    <p
                        className="text-xs uppercase tracking-[0.3em] font-semibold mb-6"
                        style={{ color: textSecondary }}
                    >
                        Registrations open in
                    </p>
                    <CountdownTimer isDark={isDark} />
                </motion.div>
            </div>

            {/* ────────── DIVIDER LINE ────────── */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px mx-auto max-w-7xl"
                style={{
                    background: `linear-gradient(to right, transparent, ${isDark ? "rgba(99,102,241,0.4)" : "rgba(96,165,250,0.5)"}, ${isDark ? "rgba(16,185,129,0.4)" : "rgba(52,211,153,0.5)"}, transparent)`,
                    transformOrigin: "center",
                }}
            />

            {/* ────────── FEATURE LISTING ────────── */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
                <div className="space-y-0">
                    {highlights.map((h, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + idx * 0.12 }}
                            className="group flex items-center justify-between py-8 md:py-10"
                            style={{ borderBottom: `1px solid ${accentLine}` }}
                        >
                            {/* Left: Number + Icon + Text */}
                            <div className="flex items-center gap-6 md:gap-10">
                                {/* Index number */}
                                <span
                                    className="text-sm font-black tabular-nums shrink-0"
                                    style={{ color: h.accent }}
                                >
                                    0{idx + 1}
                                </span>

                                {/* Icon */}
                                <div
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                        background: `${h.accent}15`,
                                        border: `1px solid ${h.accent}30`,
                                    }}
                                >
                                    <h.icon size={18} style={{ color: h.accent }} />
                                </div>

                                {/* Text block */}
                                <div>
                                    <h3
                                        className="text-xl md:text-3xl font-black tracking-tight transition-colors duration-300 group-hover:opacity-80"
                                        style={{ color: textPrimary }}
                                    >
                                        {h.label}
                                    </h3>
                                    <p
                                        className="text-sm md:text-base mt-0.5 font-light max-w-lg"
                                        style={{ color: textSecondary }}
                                    >
                                        {h.detail}
                                    </p>
                                </div>
                            </div>

                            {/* Right: hover arrow */}
                            <motion.div
                                className="hidden md:flex items-center gap-2 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                                style={{ color: h.accent }}
                            >
                                Coming Soon <ArrowRight size={16} />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ────────── FULL-BLEED CTA ────────── */}
            <div
                className="relative z-10"
                style={{
                    background: isDark
                        ? "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(16,185,129,0.06) 100%)"
                        : "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(52,211,153,0.15) 100%)",
                    borderTop: `1px solid ${accentLine}`,
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-10">
                    {/* Left copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="max-w-xl"
                    >
                        <p
                            className="text-xs uppercase tracking-[0.3em] font-bold mb-4"
                            style={{ color: isDark ? "#6366f1" : "#60a5fa" }}
                        >
                            Don't miss it
                        </p>
                        <h3
                            className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4"
                            style={{ color: textPrimary }}
                        >
                            Are You Ready<br />to{" "}
                            <span
                                style={{
                                    background: "linear-gradient(90deg, #60A5FA, #34D399)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Innovate?
                            </span>
                        </h3>
                        <p
                            className="text-base leading-relaxed font-light"
                            style={{ color: textSecondary }}
                        >
                            Problem statements dropping soon. Prepare your team and your ideas — this is your moment.
                        </p>
                    </motion.div>

                    {/* Right CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.75 }}
                        className="flex flex-col sm:flex-row gap-4 shrink-0"
                    >
                        <motion.button
                            whileHover={{ scale: 1.06, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white cursor-not-allowed"
                            style={{
                                background: "linear-gradient(135deg, #3b82f6, #10b981)",
                                boxShadow: "0 0 40px rgba(59,130,246,0.45), 0 8px 30px rgba(59,130,246,0.2)",
                                opacity: 0.85,
                            }}
                        >
                            <Zap size={16} />
                            Register Soon
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                            style={{
                                background: "transparent",
                                border: `1.5px solid ${isDark ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.2)"}`,
                                color: isDark ? "#6366f1" : "rgba(255,255,255,0.85)",
                            }}
                        >
                            View Problems <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HackathonSection;