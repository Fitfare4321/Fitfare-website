import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";

import heroVideo from "@/assets/home-1.mp4";
// import heroVideo from "@/assets/v1.mp4";


/* Floating Particles */
const FloatingParticle = ({
  delay,
  x,
  y,
  size = 2,
  isDark,
}: {
  delay: number;
  x: string;
  y: string;
  size?: number;
  isDark: boolean;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle, hsl(217 91% 60% / 0.8), transparent)`,
      filter: isDark ? "blur(1.5px)" : "blur(4px)",
    }}
    animate={{
      y: [0, -250, 0],
      x: [0, Math.random() * 80 - 40, 0],
      opacity: [0, 0.7, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: 7 + Math.random() * 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

/* Floating Notification */
const LiveNotification = ({
  message,
  type,
  isDark,
}: {
  message: string;
  type: string;
  isDark: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.5, y: -20 }}
    className={`bg-background/60 ${isDark ? "backdrop-blur-sm" : "backdrop-blur-xl"
      } border border-white/10 p-3 rounded-xl shadow-2xl flex items-center gap-3`}
  >
    <div
      className={`w-2 h-2 rounded-full ${type === "booking" ? "bg-blue-500" : "bg-purple-500"
        } animate-pulse`}
    />
    <span className="text-xs font-bold text-white/90 whitespace-nowrap">
      {message}
    </span>
  </motion.div>
);

/* Hero Section */
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.3,
  });

  const bgY = useTransform(smoothScroll, [0, 1], ["0%", "30%"]);
  const textY = useTransform(smoothScroll, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(smoothScroll, [0, 0.8], [1, 0]);

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [notifications, setNotifications] = useState<
    { id: number; message: string; x: string; y: string; type: string }[]
  >([]);

  /* Mouse Glow */
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Video */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-110 opacity-100"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Overlays */}
        <div
          className={`absolute inset-0 ${isDark ? "bg-black/20" : "bg-white/10"
            }`}
        />

        <div
          className={`absolute inset-0 ${isDark
            ? "bg-gradient-to-b from-black/40 via-transparent to-black/60"
            : "bg-gradient-to-b from-white/10 via-transparent to-white"
            }`}
        />

      </motion.div>

      {/* Mouse Glow */}
      <motion.div
        className={`absolute pointer-events-none rounded-full mix-blend-screen opacity-30 z-0 ${isDark ? "blur-[25px]" : "blur-[60px]"
          }`}
        animate={{
          x: mousePos.x - 200,
          y: mousePos.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, hsl(217 91% 60%), transparent 70%)",
        }}
      />

      {/* Glow Orbs */}
      <div className="glow-orb glow-orb-primary w-[500px] h-[500px] -top-40 -right-40 opacity-40" />
      <div
        className="glow-orb glow-orb-accent w-[400px] h-[400px] bottom-20 -left-40 opacity-30"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="glow-orb glow-orb-primary w-[300px] h-[300px] top-1/2 right-1/4 opacity-20"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.2}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          size={1.5 + Math.random() * 2.5}
          isDark={isDark}
        />
      ))}

      {/* Notifications */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="absolute transition-all duration-1000"
            style={{ left: n.x, top: n.y }}
          >
            <LiveNotification
              message={n.message}
              type={n.type}
              isDark={isDark}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full flex flex-col items-center text-center"
      >
        <div className="max-w-4xl w-full flex flex-col items-center">
          {/* Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/15 ${isDark ? "backdrop-blur-sm" : "backdrop-blur-md"
                } shadow-lg`}
            >
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                #1 Growing Fitness Platform
              </span>
            </motion.div>
          </div>

          {/* Heading */}
          <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.02] mb-6">
            Powering Your.{" "}
            <motion.span className="text-gradient inline-block">
              Fitness Journey.
            </motion.span>
          </motion.h1>

          {/* Text */}
          <motion.p
            className={`text-lg sm:text-2xl max-w-2xl mb-12 leading-relaxed font-medium drop-shadow-md
  ${isDark ? "text-white/90" : "text-black"}`}
          >
            Discover. Book. Train.
            <br />
            <span
              className={`${isDark
                ? "text-white/90"
                : "text-black"
                } font-normal text-base sm:text-lg`}
            >
              Experience on-demand fitness with the top gyms and trainers.
            </span>
          </motion.p>


          {/* Buttons */}
          <motion.div className="flex flex-wrap justify-center gap-6">
            <motion.a className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground overflow-hidden">
              <span className="absolute inset-0 bg-gradient-brand" />
              <span className="relative flex items-center gap-2">
                Explore Gyms
                <ArrowRight size={18} />
              </span>
            </motion.a>

            <motion.a
              className={`group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-border 
  ${isDark
                  ?
                  "backdrop-blur-sm text-white"
                  : "backdrop-blur-none text-black"

                }`}
            >
              <Play size={18} />
              Join as Gym
            </motion.a>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
