"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sparkles } from "lucide-react";

const Event = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section
      className={`relative py-24 px-6 flex items-center justify-center transition-colors duration-300 ${
        isDark
          ? "bg-[#0f172a] text-slate-100"
          : "bg-white text-slate-900"
      }`}
    >
      <div className="max-w-3xl text-center">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 mt-10 bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent"
        >
          Thriveathon
        </motion.h1>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full text-sm font-medium backdrop-blur-md border transition ${
            isDark
              ? "bg-white/10 border-white/20 text-slate-200"
              : "bg-slate-100 border-slate-200 text-slate-700"
          }`}
        >
          <Sparkles size={16} className="opacity-80" />
          Coming Soon
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-lg leading-relaxed ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          We’re preparing something exciting for the fitness community.
          Thriveathon will bring innovation, energy, and collaboration
          together. Stay tuned for updates.
        </motion.p>

      </div>
    </section>
  );
};

export default Event;