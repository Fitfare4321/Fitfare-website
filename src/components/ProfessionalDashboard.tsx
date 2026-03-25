import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useTheme } from "next-themes";

const feature = {
  title: "Professional Dashboard for Gym Owners",
  detailedDescription:
    "A premium, AI-powered management suite designed for modern gym and fitness businesses. Gain deep insights into performance, automate operations, and optimize revenue with real-time analytics and predictive intelligence.",
  benefits: [
    "Comprehensive member analytics",
    "AI-driven retention & churn prediction",
    "Automated billing, subscriptions & revenue insights",
    "Detailed membership & revenue reports",
  ],
  howItWorks: [
    "Connect your systems with FitFare API",
    "AI analyzes member activity & trends",
    "Dashboard updates in real-time",
    "Get actionable insights & growth reports",
  ],
  accent: "#3b82f6", // BLUE THEME
};

export default function ProfessionalDashboardUI() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const bgMain = isDark
    ? "bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white"
    : "bg-gradient-to-br from-blue-50 to-white text-gray-900";

  const glass = isDark
    ? "bg-white/5 border-white/10"
    : "bg-white/70 border-gray-200/40";

  return (
    <div className={`min-h-screen p-4 sm:p-6 md:p-12 ${bgMain}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start lg:items-center mt-8 md:mt-12">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full mb-6 mt-10 md:mt-0 text-xs font-bold uppercase backdrop-blur-xl"
            style={{
              background: `${feature.accent}20`,
              color: feature.accent,
              border: `1px solid ${feature.accent}40`,
            }}
          >
            <Activity size={12} /> Premium Analytics
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-4 sm:mb-5 lg:mb-6 leading-tight">
            {feature.title}
          </h1>

          <p className="text-base md:text-lg opacity-80 mb-8 md:mb-10 max-w-full md:max-w-xl">
            {feature.detailedDescription}
          </p>

          {/* BENEFITS */}
          <div className="grid sm:grid-cols-2 gap-4">
            {feature.benefits.map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`p-4 rounded-xl ${glass} border backdrop-blur-xl hover:shadow-xl`}
              >
                <CheckCircle2 size={18} style={{ color: feature.accent }} />
                <p className="mt-2 text-sm opacity-80">{b}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div
            className={`rounded-3xl p-6 ${glass} backdrop-blur-2xl shadow-[0_20px_80px_rgba(59,130,246,0.25)] border`}
          >
           
            {/* ANIMATED GRAPH */}
            <div className="h-36 md:h-44 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 flex items-end p-3 md:p-4 gap-2 overflow-hidden">
              {[40, 60, 30, 80, 55, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.12, type: "spring" }}
                  className="w-full rounded bg-blue-500/70"
                />
              ))}
            </div>

            {/* MINI INSIGHTS */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
  <MiniCard icon={TrendingUp } label="Growth Trend" value="Consistent increase in activity" />
  <MiniCard icon={Clock} label="Peak Hours" value="High demand during key time slots" />
</div>
            <p className="text-xs sm:text-sm text-gray-400 mt-3 opacity-90">
              For best mobile experience, scroll through cards and charts —
              values adapt in real-time as data changes.
            </p>

            {/* HOW IT WORKS */}
            <div className="mt-6 space-y-3">
              {feature.howItWorks.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span
                    className="w-6 h-6 flex items-center justify-center rounded-full text-xs"
                    style={{
                      background: `${feature.accent}30`,
                      color: feature.accent,
                    }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </motion.div>
              ))}
            </div>
          </div>

          {/* FLOATING ELEMENT */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="hidden md:flex absolute -top-6 -right-6 sm:-top-8 sm:-right-8 bg-blue-500/10 p-3 sm:p-4 rounded-xl backdrop-blur-xl border border-blue-400/20"
          >
            <BarChart3 size={28} className="text-blue-400" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const StatCard = ({ icon: Icon, label, value, change }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
  >
    <Icon size={18} className="text-blue-400" />
    <p className="text-xs opacity-70 mt-1">{label}</p>
    <h4 className="text-lg font-bold">{value}</h4>
    <span className="text-xs text-green-400">{change}</span>
  </motion.div>
);

const MiniCard = ({ icon: Icon, label, value }: any) => (
  <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
    <Icon size={16} className="text-blue-400 -mt-10" />
    <div>
      <p className="text-xs opacity-60">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  </div>
);
