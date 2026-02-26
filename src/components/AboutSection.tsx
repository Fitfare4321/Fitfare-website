import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
  useAnimationControls,
} from "framer-motion";
import { useTheme } from "next-themes";
import { Dumbbell, Users, Heart, Trophy, CheckCircle } from "lucide-react";

/* ---------------- DATA ---------------- */

const features = [
  {
    icon: Dumbbell,
    title: "Flexible Access",
    desc: "Train at any partner gym, anytime. No lock-in contracts.",
  },
  {
    icon: Users,
    title: "Expert Trainers",
    desc: "150+ certified professionals across all disciplines.",
  },
  {
    icon: Heart,
    title: "Nutrition Guidance",
    desc: "Personalized meal plans from registered dietitians.",
  },
  {
    icon: Trophy,
    title: "Progress Tracking",
    desc: "Advanced analytics to monitor and optimize your results.",
  },
];

const whyChoose = [
  "Commission that shrinks as you grow — keep more of what you earn",
  "Dynamic pricing adapts to demand, weather, and local trends",
  "Dashboard insights that drive smarter business decisions",
  "No-risk marketing with 100% organic reach",
  "Flex access fuels higher footfall and user volume",
];

const trustStats = [
  { value: "2M+", label: "Active Members" },
  { value: "150+", label: "Gyms" },
  { value: "95%", label: "Success Rate" },
  { value: "4.9★", label: "Avg Rating" },
];

/* ---------------- NEWTON'S CRADLE CARDS ---------------- */

const CradleCards = ({ isDark, isMobile }: { isDark: boolean; isMobile?: boolean }) => {
  const isMobileView = isMobile || false;
  const controls = [
    useAnimationControls(),
    useAnimationControls(),
    useAnimationControls(),
    useAnimationControls(),
  ];
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const easeMain: any = [0.4, 0, 0.2, 1];
    const edgeDeg = 16; // slightly stronger swing
    const midDeg = 5;

    async function swing() {
      while (!cancelled) {
        if (paused) {
          await new Promise((r) => setTimeout(r, 120));
          continue;
        }

        // 1) Leftmost card swings outwards (to the left)
        await controls[0].start({
          x: [0, -20, 0],
          rotateZ: [0, -edgeDeg, 0],
          transformOrigin: "top center",
          transition: { duration: 0.7, ease: easeMain },
        });

        // 2) Impact travels: 1 -> 2 -> 3, nudging each slightly, then 4 starts moving
        await Promise.all([
          controls[0].start({
            x: [0, 3, 0],
            rotateZ: [0, 3, 0],
            transformOrigin: "top center",
            transition: { duration: 0.25, ease: easeMain },
          }),
          controls[1].start({
            rotateZ: [0, -midDeg, 0, midDeg * 0.4, 0],
            transformOrigin: "top center",
            transition: { duration: 0.55, ease: easeMain },
          }),
          controls[2].start({
            rotateZ: [0, -midDeg * 0.7, 0, midDeg * 0.3, 0],
            transformOrigin: "top center",
            transition: { duration: 0.55, ease: easeMain },
          }),
        ]);

        // 3) Fourth card swings outwards to the right
        await controls[3].start({
          x: [0, 20, 0],
          rotateZ: [0, edgeDeg, 0],
          transformOrigin: "top center",
          transition: { duration: 0.7, ease: easeMain },
        });

        // 4) Fourth card comes back and lightly bumps card 3 (and a touch on 2)
        await Promise.all([
          controls[3].start({
            x: [0, -3, 0],
            rotateZ: [0, -3, 0],
            transformOrigin: "top center",
            transition: { duration: 0.25, ease: easeMain },
          }),
          controls[2].start({
            rotateZ: [0, midDeg, 0, -midDeg * 0.4, 0],
            transformOrigin: "top center",
            transition: { duration: 0.55, ease: easeMain },
          }),
          controls[1].start({
            rotateZ: [0, midDeg * 0.6, 0, -midDeg * 0.3, 0],
            transformOrigin: "top center",
            transition: { duration: 0.55, ease: easeMain },
          }),
        ]);

        await new Promise((r) => setTimeout(r, 220));
      }
    }

    swing();
    return () => {
      cancelled = true;
    };
  }, [controls, paused]);

  const Card = ({
    i,
    title,
    desc,
    Icon,
  }: {
    i: number;
    title: string;
    desc: string;
    Icon: typeof Dumbbell;
  }) => {
    // Mobile card styling based on theme
    const getMobileCardStyle = () => {
      if (!isMobileView) {
        return isDark
          ? {
              background:
                "linear-gradient(145deg, rgba(30, 30, 30, 0.95), rgba(25, 25, 25, 0.90))",
              boxShadow: "0 26px 70px rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
            }
          : {
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.90))",
              boxShadow: "0 26px 70px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.06)",
            };
      }
      
      // Always light mode - white cards
      return {
        background: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
      };
    };

    const cardStyle = getMobileCardStyle();

    return (
    <motion.div
      animate={controls[i]}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
        className={`relative select-none ${isMobileView ? 'w-full' : 'px-4 md:px-0'}`}
      style={{
        transformOrigin: "top center",
        willChange: "transform, box-shadow",
        zIndex: 2,
      }}
        whileHover={
          isMobileView
            ? {
                scale: 1.03,
                y: -4,
              }
            : {
                scale: 1.08,
                y: -10,
                rotateZ: 2,
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        <motion.div
          className={`flex flex-col items-center text-center gap-2 rounded-2xl ${isMobileView ? 'w-full py-5 px-4' : 'w-[230px] md:w-[240px] py-7 px-6'} backdrop-blur-sm transition-all duration-300`}
          style={cardStyle}
          whileHover={{
          boxShadow: isMobileView
            ? "0 12px 40px rgba(34, 197, 94, 0.2), 0 0 20px rgba(34, 197, 94, 0.15)"
            : isDark
            ? "0 32px 80px rgba(110, 231, 183, 0.3), 0 0 40px rgba(110, 231, 183, 0.25)"
            : "0 32px 80px rgba(34, 197, 94, 0.25), 0 0 40px rgba(34, 197, 94, 0.2)",
        }}
      >
          <motion.div
            className={`inline-flex items-center justify-center ${isMobileView ? 'w-10 h-10 mb-1' : 'w-11 h-11 mb-1'} rounded-full transition-all duration-300`}
          style={{
            boxShadow: isDark && !isMobileView 
              ? "0 0 0 1px rgba(255, 255, 255, 0.2)" 
              : "0 0 0 1px rgba(0, 0, 0, 0.08)",
            background: isDark && !isMobileView 
              ? "rgba(255, 255, 255, 0.1)" 
              : "rgba(0, 0, 0, 0.05)",
            backdropFilter: "saturate(120%) blur(10px)",
          }}
            whileHover={{
              scale: 1.15,
              rotate: 360,
            boxShadow: isMobileView
              ? "0 0 20px rgba(34, 197, 94, 0.3), 0 0 0 2px rgba(34, 197, 94, 0.25)"
              : isDark
              ? "0 0 30px rgba(110, 231, 183, 0.5), 0 0 0 2px rgba(110, 231, 183, 0.4)"
              : "0 0 30px rgba(34, 197, 94, 0.35), 0 0 0 2px rgba(34, 197, 94, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
            <Icon size={isMobileView ? 20 : 22} style={{ color: isDark && !isMobileView ? "#6ee7b7" : "#10B981" }} />
          </motion.div>
          <motion.h4
          className={`font-semibold ${isMobileView ? 'text-sm' : 'text-base md:text-lg'} ${isDark && !isMobileView ? 'text-white' : 'text-slate-800'} transition-colors duration-300`}
          style={{ letterSpacing: "-0.01em" }}
            whileHover={{
              color: isDark && !isMobileView ? "#6ee7b7" : "#10B981",
            }}
        >
          {title}
          </motion.h4>
          <motion.p
          className={`${isMobileView ? 'text-xs' : 'text-[13px] md:text-sm'} leading-relaxed ${isDark && !isMobileView ? 'text-gray-300' : 'text-slate-600'} transition-colors duration-300`}
            whileHover={{
              color: isDark && !isMobileView ? "#6ee7b7" : "#047857",
            }}
        >
          {desc}
          </motion.p>
        </motion.div>
    </motion.div>
  );
  };

  return (
    <div className="px-4">
      <div className="relative">
        <div className={`relative z-10 grid ${isMobileView ? 'grid-cols-2 gap-3' : 'grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10'}`}>
          <Card i={0} title={features[0].title} desc={features[0].desc} Icon={features[0].icon} />
          <Card i={1} title={features[1].title} desc={features[1].desc} Icon={features[1].icon} />
          <Card i={2} title={features[2].title} desc={features[2].desc} Icon={features[2].icon} />
          <Card i={3} title={features[3].title} desc={features[3].desc} Icon={features[3].icon} />
        </div>
      </div>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

const AboutSection = () => {
  const { theme, resolvedTheme } = useTheme();
  const effectiveTheme = resolvedTheme ?? theme;
  const isDark = effectiveTheme === "dark";


  const containerRef = useRef(null);

  // ✅ ORIGINAL SCROLL LOGIC (UNCHANGED)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    mass: 0.5,
  });

  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      if (v < 0.25) setActiveSection(0);
      else if (v < 0.5) setActiveSection(1);
      else if (v < 0.75) setActiveSection(2);
      else setActiveSection(3);
    });
  }, [smoothProgress]);

  

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className={`relative h-[400vh] transition-all duration-500 ${
        isDark ? "bg-slate-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Sticky Wrapper - Same for both mobile and desktop */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Container */}
        <div
          className={`relative w-full overflow-hidden transition-all duration-500 ${
            isDark ? "bg-slate-900" : "bg-white"
            }`}
        >
          {/* ===== GRADIENT BACKGROUND ===== */}
          {isMobile ? (
            <div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #000000 0%, #0a1a0f 50%, #0d2418 100%)"
                  : "linear-gradient(135deg,rgb(186, 222, 201) 0%, #f6fff9 60%, #ffffff 100%)",
              }}
            />
          ) : (
            <>
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #6CA6CF 0%, #58B3CF 42%, #4CCF9C 100%)"
                    : "linear-gradient(135deg, #d9f7e6 0%, #e8fff2 45%, #f4fff9 100%)",
            }}
          />

              {/* ===== MOVING GRADIENT ANIMATION (Desktop only) ===== */}
<motion.div
  className="absolute inset-0"
  style={{
                  background: isDark
                    ? "linear-gradient(120deg, #6CA6CF, #58B3CF, #4CCF9C, #58B3CF, #6CA6CF)"
                    : "linear-gradient(120deg, #e4fcef, #a6e9c4, #dffced, #a6e9c4, #e4fcef)",
    backgroundSize: "300% 300%",
  }}
  animate={{
    backgroundPosition: [
      "0% 50%",
      "100% 50%",
      "0% 50%",
    ],
  }}
  transition={{
    duration: 14,
    repeat: Infinity,
    ease: "linear",
  }}
/>
            </>
          )}

          {/* ===== CURVE MASK WRAPPER - Hide on mobile ===== */}
          {!isMobile && (
            <div className="absolute inset-0 overflow-hidden">
{/* TOP CURVE CUT */}
<div
  className="absolute top-0 left-1/2 -translate-x-1/2"
  style={{
    width: "160%",
    height: "260px",
                  background: isDark ? "#1e293b" : "#ffffff",
    borderBottomLeftRadius: "60% 120%",
    borderBottomRightRadius: "60% 120%",
    zIndex: 2,
  }}
/>

{/* BOTTOM CURVE CUT */}
<div
  className="absolute bottom-0 left-1/2 -translate-x-1/2"
  style={{
    width: "160%",
    height: "260px",
                  background: isDark ? "#1e293b" : "#ffffff",
    borderTopLeftRadius: "60% 120%",
    borderTopRightRadius: "60% 120%",
    zIndex: 2,
  }}
/>
</div>
          )}

          {/* ===== CONTENT LAYER ===== */}
          <div className={`relative z-10 ${isMobile ? 'min-h-[600px] py-16' : 'min-h-[900px] py-32'} flex items-center justify-center`}>
            <div className={`w-full max-w-6xl px-6 md:px-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {/* Scroll-based animation - Same for mobile and desktop */}
              <AnimatePresence mode="wait">


                {/* SECTION 1 */}
                {activeSection === 0 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -40 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-12"
                  >


                    <h2
                      className="text-4xl md:text-5xl font-bold tracking-tight"
                      style={{
                        color: isDark ? "#ffffff" : "#223548",
                        textShadow: "none",
                      }}
                    >
                      Built For Results
                    </h2>

                    <CradleCards isDark={isDark} isMobile={isMobile} />
                  </motion.div>
                )}

                {/* SECTION 2 */}
                {activeSection === 1 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    className="max-w-3xl mx-auto space-y-8"
                  >
                    <span
                      className="inline-block text-xs md:text-sm uppercase tracking-[0.3em] font-bold"
                      style={{
                        color: isDark ? "#e5e7eb" : "#334155",
                      }}
                    >
                      Our Story
                    </span>

                    <h2
                      className="text-3xl md:text-5xl font-bold tracking-tight px-4"
                      style={{
                        color: isDark ? "#ffffff" : "#223548",
                        textShadow: "none",
                      }}
                    >
                      Building The Future  of Flexible Fitness
                    </h2>

                    <p
                      className="text-md md:text-[16px] leading-relaxed max-w-2xl mx-auto px-6"
                      style={{
                        color: isDark ? "#e5e7eb" : "#475569",
                      }}
                    >
                      We started FitFare after facing the same problem ourselves —
                      expensive, rigid gym memberships that didn’t match modern schedules.
                      What began as a WhatsApp-based model is now evolving into a
                      structured platform connecting gyms digitally and giving users
                      seamless access to fitness spaces.
                    </p>
                  </motion.div>
                )}


                {/* SECTION 3 */}
                {/* SECTION 3 */}
                {activeSection === 2 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-12"
                  >
                    <h3
                      className="text-4xl md:text-5xl font-bold tracking-tight"
                      style={{
                        color: isDark ? "#ffffff" : "#223548",
                        textShadow: "none",
                      }}
                    >
                      Why Gyms Partner With Us
                    </h3>

                    <div className="max-w-3xl mx-auto space-y-5">
                      {whyChoose.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-center items-center gap-3 text-center"
                        >
                          <CheckCircle
                            size={20}
                            style={{ color: isDark ? "#000000" : (isMobile ? "#10B981" : undefined) }}
                            className={isMobile ? "shrink-0" : "text-primary shrink-0"}
                          />
                          <span 
                            className={`text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-slate-700'}`}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>


                  </motion.div>
                )}

                {/* SECTION 4 */}
                {activeSection === 3 && (
                  <motion.div
                    key="s4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-12"
                  >
                    <h3
                      className="text-2xl md:text-5xl font-bold tracking-tight"
                      style={{
                        color: isDark ? "#ffffff" : "#223548",
                        textShadow: "none",
                      }}
                    >
                      Upcoming Goals
                    </h3>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
                      {trustStats.map((s, i) => (
                        <div
                          key={i}
                          className={`p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl ${isDark ? 'bg-[#0F172A] border-black' : 'bg-white border-gray-200'}`}
                        >
                          <div className={`text-3xl md:text-4xl font-black mb-3 ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                            {s.value}
                          </div>
                          <div className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
