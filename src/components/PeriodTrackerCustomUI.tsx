import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Activity,
  Sparkles,
  Heart,
  Droplets,
  Moon,
  Zap,
  Brain,
  Leaf,
  ChevronRight,
} from "lucide-react";
import periodImg1 from "@/assets/period.jpg";
import periodImg2 from "@/assets/period2.jpg";

// ─── Phase config ─────────────────────────────────────────────────────────────
const PHASES = [
  {
    name: "Menstrual",
    days: "Day 1–5",
    range: [0, 5],
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.3)",
    icon: Droplets,
    mood: "Rest & Recover",
    desc: "Your body sheds the uterine lining. Honor rest, gentle movement, and warmth.",
  },
  {
    name: "Follicular",
    days: "Day 6–13",
    range: [5, 14],
    color: "#f97316",
    glow: "rgba(249,115,22,0.3)",
    icon: Leaf,
    mood: "Rise & Energize",
    desc: "Estrogen rises, energy returns. Great time to start new challenges and workouts.",
  },
  {
    name: "Ovulation",
    days: "Day 14–17",
    range: [14, 17],
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    icon: Zap,
    mood: "Peak Power",
    desc: "You're at your strongest. Social, confident, and high-energy — own it.",
  },
  {
    name: "Luteal",
    days: "Day 18–28",
    range: [17, 28],
    color: "#818cf8",
    glow: "rgba(129,140,248,0.3)",
    icon: Moon,
    mood: "Wind Down",
    desc: "Progesterone dominates. Shift to mindfulness, lighter workouts, and self-care.",
  },
];

const FEATURES = [
  {
    tag: "Core",
    title: "Smart Period Tracking",
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.1)",
    icon: Heart,
    desc: "Accurately predicts your cycle phases, period start & end, and ovulation windows based on your history.",
    bullets: ["Period start & end prediction", "Cycle length analysis", "Ovulation window detection", "Late period alerts"],
  },
  {
    tag: "AI",
    title: "Advanced Health Insights",
    color: "#f97316",
    bg: "rgba(249,115,22,0.1)",
    icon: Brain,
    desc: "FitFare's AI identifies subtle hormonal patterns early — flagging potential conditions before they escalate.",
    bullets: ["PCOS / PCOD monitoring", "Iron deficiency indicators", "Hormonal imbalance signals", "Irregular cycle detection"],
  },
  {
    tag: "Smart",
    title: "Symptom Intelligence",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.1)",
    icon: Activity,
    desc: "Correlate how your body feels with biometric data and get meaningful, actionable insights.",
    bullets: ["Cramps & pain tracking", "Mood & emotional patterns", "Skin & acne changes", "Energy & fatigue levels"],
  },
  {
    tag: "Wellness",
    title: "Lifestyle Optimization",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    icon: Leaf,
    desc: "Personalized daily recommendations that adapt your fitness and nutrition to your exact cycle phase.",
    bullets: ["Hydration & sleep tracking", "Cycle-based workout plans", "Nutrition guidance", "Recovery optimization"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getPhase(day: number) {
  return PHASES.find((p) => day >= p.range[0] && day < p.range[1]) ?? PHASES[3];
}

function polarToXY(angleDeg: number, r: number, cx = 0, cy = 0) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
}

function arcPath(startDeg: number, endDeg: number, r: number, cx = 200, cy = 200) {
  const s = polarToXY(startDeg, r, cx, cy);
  const e = polarToXY(endDeg, r, cx, cy);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

// ─── SVG Cycle Ring ───────────────────────────────────────────────────────────
function CycleRing({
  currentDay,
  totalDays,
  accent,
}: {
  currentDay: number;
  totalDays: number;
  accent: string;
}) {
  const phase = getPhase(currentDay);
  const currentAngle = (currentDay / totalDays) * 360;

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer decorative ring */}
      <circle cx="200" cy="200" r="168" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <circle cx="200" cy="200" r="145" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="22" />

      {/* Phase arcs */}
      {PHASES.map((p) => {
        const startAngle = (p.range[0] / totalDays) * 360;
        const endAngle = (p.range[1] / totalDays) * 360 - 1;
        return (
          <motion.path
            key={p.name}
            d={arcPath(startAngle, endAngle, 145)}
            fill="none"
            stroke={p.color}
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.22"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        );
      })}

      {/* Progress arc (days elapsed) */}
      {currentDay > 0 && (
        <motion.path
          d={arcPath(0, currentAngle - 0.5, 145)}
          fill="none"
          stroke={phase.color}
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          filter="url(#glow)"
        />
      )}

      {/* Day tick marks */}
      {Array.from({ length: totalDays }).map((_, i) => {
        const angle = (i / totalDays) * 360 - 90;
        const rad = angle * (Math.PI / 180);
        const innerR = 133;
        const outerR = 157;
        const x1 = 200 + Math.cos(rad) * innerR;
        const y1 = 200 + Math.sin(rad) * innerR;
        const x2 = 200 + Math.cos(rad) * outerR;
        const y2 = 200 + Math.sin(rad) * outerR;
        const isPast = i < currentDay;
        const isCurrent = i === currentDay;
        const tickPhase = getPhase(i);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isPast || isCurrent ? tickPhase.color : "rgba(255,255,255,0.12)"}
            strokeWidth={isCurrent ? 2.5 : 1}
            strokeLinecap="round"
            opacity={isCurrent ? 1 : isPast ? 0.6 : 0.3}
          />
        );
      })}

      {/* Current day dot */}
      {(() => {
        const angle = (currentDay / totalDays) * 360 - 90;
        const rad = angle * (Math.PI / 180);
        const x = 200 + Math.cos(rad) * 145;
        const y = 200 + Math.sin(rad) * 145;
        return (
          <g>
            <motion.circle
              cx={x} cy={y} r={12}
              fill={phase.color}
              filter="url(#softGlow)"
              animate={{ r: [10, 13, 10], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx={x} cy={y} r={5} fill="white" opacity={0.9} />
            <motion.circle
              cx={x} cy={y} r={20}
              fill="none"
              stroke={phase.color}
              strokeWidth="1.5"
              opacity="0.4"
              animate={{ r: [16, 24, 16], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        );
      })()}

      {/* Phase label dots at boundaries */}
      {PHASES.map((p) => {
        const angle = (p.range[0] / totalDays) * 360 - 90;
        const rad = angle * (Math.PI / 180);
        const x = 200 + Math.cos(rad) * 168;
        const y = 200 + Math.sin(rad) * 168;
        return (
          <circle key={`dot-${p.name}`} cx={x} cy={y} r={3} fill={p.color} opacity={0.8} />
        );
      })}
    </svg>
  );
}

// ─── Animated Hormone Wave ────────────────────────────────────────────────────
function HormoneWave({ currentDay, totalDays }: { currentDay: number; totalDays: number }) {
  const progressX = (currentDay / totalDays) * 1000;

  return (
    <div className="relative w-full h-[180px] rounded-3xl overflow-hidden border border-white/8"
      style={{ background: "rgba(10,6,20,0.7)", backdropFilter: "blur(16px)" }}>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 180" preserveAspectRatio="none">
        <defs>
          <linearGradient id="estrogen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="progesterone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lh" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <filter id="waveGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Estrogen wave – rises around ovulation */}
        <motion.path
          d="M0,160 C100,155 150,140 200,155 C250,165 280,120 357,60 C380,40 420,50 440,70 C470,100 500,155 600,158 C700,160 800,158 1000,160 L1000,180 L0,180 Z"
          fill="url(#estrogen)"
          animate={{
            d: [
              "M0,160 C100,155 150,140 200,155 C250,165 280,120 357,60 C380,40 420,50 440,70 C470,100 500,155 600,158 C700,160 800,158 1000,160 L1000,180 L0,180 Z",
              "M0,162 C100,157 150,142 200,157 C250,167 280,118 357,58 C380,38 420,48 440,68 C470,98 500,157 600,160 C700,162 800,160 1000,162 L1000,180 L0,180 Z",
              "M0,160 C100,155 150,140 200,155 C250,165 280,120 357,60 C380,40 420,50 440,70 C470,100 500,155 600,158 C700,160 800,158 1000,160 L1000,180 L0,180 Z",
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,160 C100,155 150,140 200,155 C250,165 280,120 357,60 C380,40 420,50 440,70 C470,100 500,155 600,158 C700,160 800,158 1000,160"
          fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.7"
          filter="url(#waveGlow)"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Progesterone wave – rises in luteal */}
        <motion.path
          d="M0,170 C200,172 350,168 500,165 C550,163 580,145 620,120 C660,95 700,85 750,90 C800,95 850,120 900,140 C950,155 980,165 1000,168 L1000,180 L0,180 Z"
          fill="url(#progesterone)"
          animate={{
            d: [
              "M0,170 C200,172 350,168 500,165 C550,163 580,145 620,120 C660,95 700,85 750,90 C800,95 850,120 900,140 C950,155 980,165 1000,168 L1000,180 L0,180 Z",
              "M0,172 C200,174 350,170 500,167 C550,165 580,147 620,118 C660,93 700,83 750,88 C800,93 850,118 900,138 C950,153 980,163 1000,166 L1000,180 L0,180 Z",
              "M0,170 C200,172 350,168 500,165 C550,163 580,145 620,120 C660,95 700,85 750,90 C800,95 850,120 900,140 C950,155 980,165 1000,168 L1000,180 L0,180 Z",
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,170 C200,172 350,168 500,165 C550,163 580,145 620,120 C660,95 700,85 750,90 C800,95 850,120 900,140 C950,155 980,165 1000,168"
          fill="none" stroke="#818cf8" strokeWidth="2" opacity="0.7"
          filter="url(#waveGlow)"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        {/* LH spike at ovulation */}
        <motion.path
          d="M0,178 C300,178 330,178 355,178 C365,178 370,110 357,30 C344,110 349,178 365,178 C500,178 1000,178 1000,178 L1000,180 L0,180 Z"
          fill="url(#lh)"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M357,178 C357,178 357,100 357,28 C357,100 357,178 357,178"
          fill="none" stroke="#10b981" strokeWidth="2.5" opacity="0.8"
          filter="url(#waveGlow)"
        />

        {/* Current day vertical line */}
        <line
          x1={progressX} y1="0" x2={progressX} y2="180"
          stroke="white" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.35"
        />
        <circle cx={progressX} cy="10" r="4" fill="white" opacity="0.6" />
      </svg>

      {/* Phase labels */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-around px-6">
        {PHASES.map((p) => (
          <div key={p.name} className="flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
            <span className="text-[9px] font-black tracking-[0.18em] uppercase opacity-45">{p.name}</span>
          </div>
        ))}
      </div>

      {/* Legend top-right */}
      <div className="absolute top-3 right-4 flex items-center gap-4">
        {[
          { label: "Estrogen", color: "#f43f5e" },
          { label: "Progesterone", color: "#818cf8" },
          { label: "LH", color: "#10b981" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded-full" style={{ background: l.color }} />
            <span className="text-[9px] text-white/40 font-semibold">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Feature Row ──────────────────────────────────────────────────────────────
function FeatureRow({ f, i, isDark }: { f: typeof FEATURES[0]; i: number; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const IconComp = f.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className="group relative flex flex-col md:flex-row gap-6 md:gap-10 p-8 md:p-10 border-b last:border-0 overflow-hidden transition-all duration-500"
      style={{
        borderColor: "rgba(255,255,255,0.05)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = `${f.color}06`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      {/* Left indicator bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
        style={{ background: f.color, opacity: 0 }}
        whileHover={{ opacity: 1 }}
        animate={{ opacity: 0 }}
      />
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: f.color }}
      />

      {/* Icon */}
      <div className="shrink-0 mt-1">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110"
          style={{ background: f.bg, borderColor: `${f.color}30` }}
        >
          <IconComp size={24} style={{ color: f.color }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: f.bg, color: f.color }}
          >
            {f.tag}
          </span>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight">{f.title}</h3>
        </div>
        <p className="opacity-55 mb-6 max-w-2xl leading-relaxed text-sm md:text-base">{f.desc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
          {f.bullets.map((bullet, j) => (
            <div
              key={j}
              className="flex items-center gap-3 text-sm opacity-60 group-hover:opacity-90 transition-opacity font-medium"
            >
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: f.color, boxShadow: `0 0 6px ${f.color}` }}
              />
              {bullet}
            </div>
          ))}
        </div>
      </div>

      <ChevronRight
        size={20}
        className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
      />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const PeriodTrackerCustomUI = ({
  isDark,
  accent,
}: {
  isDark: boolean;
  accent: string;
}) => {
  const [currentDay, setCurrentDay] = useState(14);
  const totalDays = 28;
  const periodInDays = totalDays - currentDay;

  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activePhaseIdx, setActivePhaseIdx] = useState(1);

  const phase = getPhase(currentDay);

  // Auto-cycle phase highlight
  useEffect(() => {
    const t = setInterval(
      () => setActivePhaseIdx((p) => (p + 1) % PHASES.length),
      3000
    );
    return () => clearInterval(t);
  }, []);

  // Sync currentDay with startDate
  useEffect(() => {
    if (!startDate) return;
    const diffDays = Math.floor(
      (Date.now() - new Date(startDate).getTime()) / 86400000
    );
    setCurrentDay(Math.max(0, diffDays % totalDays));
  }, [startDate]);

  // Calendar strip
  const dates = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      label: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      date: d.getDate(),
      full: d.toISOString().split("T")[0],
    };
  });

  return (
    <div className="flex flex-col items-center w-full max-w-full md:max-w-5xl mx-auto py-10 px-3 sm:px-4">

      {/* ── HERO HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 w-full"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 mt-10 text-xs font-bold uppercase tracking-widest"
          style={{
            background: `${accent}18`,
            color: accent,
            border: `1px solid ${accent}35`,
          }}
        >
          <Sparkles size={12} /> Women’s Health Insights
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
          Know Your Body.{" "}
          <span
            style={{
              background: `linear-gradient(135deg, #f43f5e, #818cf8)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Live Fully.
          </span>
        </h2>
        <p className="text-sm md:text-base opacity-55 max-w-2xl mx-auto leading-relaxed">
          Advanced AI-powered cycle intelligence — helping you track, understand, and
          optimize your body through every phase, every day.
        </p>
      </motion.div>

      {/* ── EDITORIAL BENTO ── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 mb-16">
        {/* Main editorial card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-8 relative h-[360px] rounded-[2rem] overflow-hidden shadow-2xl group border border-white/8"
        >
          <img
            src={periodImg1}
            alt="Smart Period Tracking"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 w-max mb-4">
              <Sparkles size={12} className="text-rose-400" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white">Holistic Harmony</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
              Smart Period<br />Tracking
            </h3>
            <p className="text-white/65 text-sm md:text-base max-w-md">
              Track, understand, and own every phase of your cycle — with insights that are as unique as you are.
            </p>
          </div>
        </motion.div>

        {/* Side stack */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex-1 rounded-[2rem] overflow-hidden border border-white/8 p-7 flex flex-col justify-between"
            style={{ background: "rgba(244,63,94,0.07)", minHeight: 160 }}
          >
            <Activity className="absolute -right-4 -top-4 w-24 h-24 opacity-8 text-rose-400" />
            <h4 className="text-lg font-black leading-tight mb-2">Sync Nutrition &amp; Training</h4>
            <p className="opacity-55 text-sm leading-relaxed">
              Align workouts and diet with your cycle for peak performance — every phase, every day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="relative h-[170px] rounded-[2rem] overflow-hidden shadow-2xl group border border-white/8"
          >
            <img
              src={periodImg2}
              alt="Data-Driven Insights"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent flex items-end p-6">
              <p className="text-white text-lg font-black tracking-wide leading-tight">
                Data-Driven<br />Insights
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── PHASE CARDS ROW ── */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-16">
        {PHASES.map((p, i) => {
          const IconComp = p.icon;
          const isActive = activePhaseIdx === i;
          return (
            <motion.button
              key={p.name}
              onClick={() => setActivePhaseIdx(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative p-4 sm:p-5 rounded-2xl border text-left transition-all duration-400 overflow-hidden"
              style={{
                background: isActive ? `${p.color}15` : "rgba(255,255,255,0.025)",
                borderColor: isActive ? `${p.color}50` : "rgba(255,255,255,0.07)",
                boxShadow: isActive ? `0 0 24px ${p.glow}` : "none",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="phaseActive"
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: `${p.color}08` }}
                />
              )}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${p.color}20` }}
              >
                <IconComp size={17} style={{ color: p.color }} />
              </div>
              <p className="text-xs font-black mb-0.5" style={{ color: isActive ? p.color : undefined }}>
                {p.name}
              </p>
              <p className="text-[10px] opacity-40 mb-2">{p.days}</p>
              <AnimatePresence>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[11px] leading-relaxed opacity-60 overflow-hidden"
                  >
                    {p.mood}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* ── CYCLE RING + INFO ── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start md:items-center mb-16">
        {/* Ring */}
        <div className="relative w-full md:w-auto max-w-[360px] mx-auto aspect-square">
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-[80px]"
            style={{ background: phase.glow }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <CycleRing currentDay={currentDay} totalDays={totalDays} accent={accent} />

          {/* Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDay}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="flex flex-col items-center"
              >
                <p className="text-xs font-bold uppercase tracking-widest opacity-45 mb-1">
                  {currentDay < 5 ? "On Period" : "Next period in"}
                </p>
                <h2 className="text-3xl md:text-5xl font-black mb-1" style={{ color: phase.color }}>
                  {currentDay < 5 ? `Day ${currentDay + 1}` : `${periodInDays}`}
                </h2>
                {currentDay >= 5 && (
                  <p className="text-xs opacity-40 font-semibold mb-3">days away</p>
                )}
                <div
                  className="text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase"
                  style={{ background: `${phase.color}20`, color: phase.color }}
                >
                  {phase.name} Phase
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Phase detail + CTA */}
        <div className="flex flex-col gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl p-4 sm:p-6 border"
              style={{
                background: `${phase.color}0d`,
                borderColor: `${phase.color}30`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: phase.color }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: phase.color }}>
                  You Are Here · {phase.name}
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-70">{phase.desc}</p>
              <p className="text-xs font-bold mt-3 opacity-50">Mood: {phase.mood}</p>
            </motion.div>
          </AnimatePresence>

          {/* Day scrubber */}
          <div>
            <div className="flex justify-between text-xs opacity-40 mb-2">
              <span>Day {currentDay + 1} of {totalDays}</span>
              <span>{phase.name}</span>
            </div>
            <div className="relative h-2 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: phase.color, boxShadow: `0 0 10px ${phase.color}` }}
                animate={{ width: `${((currentDay + 1) / totalDays) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={totalDays - 1}
              value={currentDay}
              onChange={(e) => setCurrentDay(Number(e.target.value))}
              className="w-full mt-2 accent-pink-500 opacity-0 absolute"
            />
            {/* Visible scrubber */}
            <input
              type="range"
              min={0}
              max={totalDays - 1}
              value={currentDay}
              onChange={(e) => setCurrentDay(Number(e.target.value))}
              className="w-full mt-2 opacity-30 hover:opacity-60 transition-opacity cursor-pointer"
              style={{ accentColor: phase.color }}
            />
          </div>

          {/* Add Period button */}
          <motion.button
            onClick={() => setShowPicker(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
            style={{
              background: `linear-gradient(135deg, #f43f5e, #818cf8)`,
              boxShadow: `0 10px 30px rgba(244,63,94,0.3)`,
            }}
          >
            <Plus size={16} /> Log Period Dates
          </motion.button>
        </div>
      </div>

      {/* ── CALENDAR STRIP ── */}
      <div className="w-full mb-10">
        <p className="text-xs font-bold uppercase tracking-widest opacity-30 mb-4">Upcoming Days</p>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {dates.map((day, i) => {
            const isPeriod =
              startDate && endDate && day.full >= startDate && day.full <= endDate;
            const isToday = i === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-col items-center shrink-0 w-14 py-3 rounded-2xl border transition-all duration-300"
                style={{
                  background: isPeriod
                    ? "rgba(244,63,94,0.12)"
                    : isToday
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.02)",
                  borderColor: isPeriod
                    ? "rgba(244,63,94,0.4)"
                    : isToday
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">
                  {day.label}
                </span>
                <span
                  className="text-lg font-black mt-1"
                  style={{ color: isPeriod ? "#f43f5e" : isToday ? "white" : undefined, opacity: isToday || isPeriod ? 1 : 0.4 }}
                >
                  {day.date}
                </span>
                {isPeriod && (
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 animate-pulse" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── HORMONE WAVE ── */}
      <div className="w-full mb-16">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-30">Hormone Levels</p>
            <p className="text-sm font-semibold opacity-60 mt-0.5">Your 28-day hormonal cycle</p>
          </div>
          <div
            className="text-[10px] px-3 py-1 rounded-full font-bold"
            style={{ background: `${phase.color}20`, color: phase.color }}
          >
            Day {currentDay + 1}
          </div>
        </div>
        <HormoneWave currentDay={currentDay} totalDays={totalDays} />
      </div>

      {/* ── FEATURE ROWS ── */}
      <div className="w-full mb-8 border-t border-b border-white/5 rounded-2xl overflow-hidden">
        {FEATURES.map((f, i) => (
          <FeatureRow key={f.title} f={f} i={i} isDark={isDark} />
        ))}
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {showPicker && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPicker(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.93 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed z-50 inset-0 flex items-center justify-center px-4"
            >
              <div
                className="w-full max-w-md rounded-[2rem] p-7 border relative overflow-hidden shadow-2xl"
                style={{
                  background: isDark ? "rgba(15,8,25,0.95)" : "white",
                  borderColor: "rgba(244,63,94,0.25)",
                  backdropFilter: "blur(24px)",
                }}
              >
                {/* Glow */}
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-25 pointer-events-none"
                  style={{ background: "#f43f5e" }} />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(244,63,94,0.15)" }}>
                      <Heart size={18} style={{ color: "#f43f5e" }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black">Log Period</h3>
                      <p className="text-xs opacity-50">Choose your cycle start and end</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mb-6">
                    {[
                      { label: "Start Date", value: startDate, setter: setStartDate },
                      { label: "End Date", value: endDate, setter: setEndDate },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="text-xs opacity-50 font-semibold block mb-1.5">
                          {field.label}
                        </label>
                        <input
                          type="date"
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition"
                          style={{
                            background: isDark ? "rgba(255,255,255,0.05)" : "#f9f9f9",
                            borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e5e5",
                            color: "inherit",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPicker(false)}
                      className="flex-1 py-3 rounded-xl text-sm font-bold border transition hover:opacity-70"
                      style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowPicker(false)}
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:scale-[1.02]"
                      style={{
                        background: "linear-gradient(135deg, #f43f5e, #818cf8)",
                        boxShadow: "0 8px 24px rgba(244,63,94,0.35)",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PeriodTrackerCustomUI;
