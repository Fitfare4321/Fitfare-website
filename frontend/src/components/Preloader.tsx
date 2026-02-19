import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }

        const newProgress = Math.min(prev + Math.random() * 15, 100);

        if (newProgress < 30) setLoadingText("Initializing");
        else if (newProgress < 60) setLoadingText("Loading Resources");
        else if (newProgress < 90) setLoadingText("Almost Ready");
        else setLoadingText("Welcome");

        return newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.8 }}
          className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden ${
            isDark
              ? "bg-gradient-to-br from-[#050505] via-[#0a0a0f] to-[#0f0f12]"
              : "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
          }`}
        >
          {/* Background Mesh */}
          <div className="absolute inset-0 opacity-40">
            <motion.div
              className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
              }}
              animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <motion.div
              className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
              }}
              animate={{ x: [0, -120, 0], y: [0, 100, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
            />
          </div>

          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

          {/* MAIN CONTENT */}
          <div className="relative z-10 text-center">

            {/* ICON + RING */}
            <div className="relative w-40 h-40 mx-auto">

              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* Ring */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="3"
                />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 44 * (1 - progress / 100),
                  }}
                  transition={{ duration: 0.3 }}
                />

                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* CENTER LOGO */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <img
                    src="/blue-background-logo.png"
                    alt="FitFare Logo"
                    className="w-14 h-14 object-contain"
                  />
                </motion.div>
              </div>
            </div>

            {/* BRAND */}
            <h1 className="mt-10 text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              FitFare
            </h1>

            {/* TAGLINE */}
            <p className="text-emerald-400/80 text-sm tracking-widest uppercase font-medium mt-4">
              Your Flexible Fitness Partner
            </p>

            {/* STATUS TEXT */}
           <div className="flex items-center justify-center gap-3 text-gray-400 text-sm mt-3">
  <motion.div
    className="w-2 h-2 rounded-full bg-emerald-400"
    animate={{
      scale: [1, 1.6, 1],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.4,
      repeat: Infinity,
    }}
  />

  <span>{loadingText}</span>
</div>
</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
