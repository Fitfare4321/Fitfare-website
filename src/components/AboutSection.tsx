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

const CradleCards = ({ isDark }: { isDark: boolean }) => {
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
  }) => (
    <motion.div
      animate={controls[i]}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`relative select-none px-4 md:px-0`}
      style={{
        transformOrigin: "top center",
        willChange: "transform, box-shadow",
        zIndex: 2,
      }}
      whileHover={{ scale: 1.05, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div
        className="flex flex-col items-center text-center gap-3 rounded-3xl w-[230px] md:w-[240px] py-7 px-6 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(145deg, rgba(15,23,42,0.06), rgba(15,23,42,0.02))",
          boxShadow: "0 26px 70px rgba(15,23,42,0.65)",
          border: "1px solid rgba(255,255,255,0.16)",
        }}
      >
        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-1"
          style={{
            boxShadow: "0 0 0 1px rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "saturate(120%) blur(10px)",
          }}
        >
          <Icon size={22} style={{ color: "#6ee7b7" }} />
        </div>
        <h4
          className={`font-semibold text-base md:text-lg text-white`}
          style={{ letterSpacing: "-0.01em" }}
        >
          {title}
        </h4>
        <p
          className={`text-[13px] md:text-sm leading-relaxed text-slate-200`}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="px-4">
      <div className="relative">
        <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
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
  const { theme } = useTheme();
  const isMoon = theme === "dark";  
  const isDark = theme === "dark";


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

  

  return (
    // <section
    //   id="about"
    //   ref={containerRef}
    //   className={`relative h-[400vh] ${isDark ? "bg-slate-900" : "bg-white"
    //     }`}
    // >
    <section
      id="about"
      ref={containerRef}
      className={`relative h-[400vh] ${
        isMoon ? "bg-white" : "bg-[#071A2F]"
      }`}
      
    >

      {/* Sticky Wrapper - SAME */}
      <div className="sticky top-0 h-screen flex items-center justify-center">

        {/* Container - SAME */}
        <div
          className={`relative w-full overflow-hidden ${isMoon ? "bg-white" : "bg-[#071A2F]"
            }`}
        >
          {/* ===== SAME GRADIENT FROM FIRST CODE ===== */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #6CA6CF 0%, #58B3CF 42%, #4CCF9C 100%)"
                : "linear-gradient(135deg, #2B6E95 0%, #2F88A5 45%, #23A97B 100%)",

            }}
          />
          {/* ===== LIVE MOVING COLORS ===== */}
          {/* ===== CURVE MASK WRAPPER ===== */}
<div className="absolute inset-0 overflow-hidden">

{/* Moving Gradient */}
<motion.div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(120deg, #6CA6CF, #58B3CF, #4CCF9C, #58B3CF, #6CA6CF)",
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

{/* TOP CURVE CUT */}
<div
  className="absolute top-0 left-1/2 -translate-x-1/2"
  style={{
    width: "160%",
    height: "260px",
    background: isMoon ? "#ffffff" : "#071A2F",
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
    background: isMoon ? "#ffffff" : "#071A2F",
    borderTopLeftRadius: "60% 120%",
    borderTopRightRadius: "60% 120%",
    zIndex: 2,
  }}
/>

</div>

          
          {/* ===== ARC STRUCTURE FROM FIRST CODE (UNCHANGED) ===== */}

          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: "160%",
              height: "260px",
              background: isDark ? "#f3f4f6" : "#0f172a",
              borderTopLeftRadius: "60% 120%",
              borderTopRightRadius: "60% 120%",
            }}
          />

          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: "160%",
              height: "260px",
              background: isDark ? "#f3f4f6" : "#0f172a",
              borderBottomLeftRadius: "60% 120%",
              borderBottomRightRadius: "60% 120%",
            }}
          />

          {/* ===== CONTENT LAYER (Premium Layout from Code 2) ===== */}

          <div className="relative z-10 min-h-[900px] flex items-center justify-center py-32">
            <div className="w-full max-w-6xl px-6 md:px-12 text-center text-white">

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
                      style={{ color: isDark ? "#223548" : "#301934", textShadow: isDark ? "none" : "0 0 30px rgba(70, 198, 209, 0.3)" }}
                    >
                      Built For Results
                    </h2>

                    <CradleCards isDark={isDark} />
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
                        color: isDark ? "#334155" : "#301934"
                      }}
                    >
                      Our Story
                    </span>

                    <h2
                      className="text-3xl md:text-5xl font-bold tracking-tight px-4"
                      style={{
                        color: isDark ? "#223548" : "#301934",
                        textShadow: isDark ? "none" : "0 0 40px rgba(70, 198, 209, 0.4)"
                      }}
                    >
                      Building The Future  of Flexible Fitness
                    </h2>

                    <p
                      className="text-md md:text-[16px] leading-relaxed max-w-2xl mx-auto px-6"
                      style={{
                        color: isDark ? "#475569" : "#fff"
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
                      style={{ color: isDark ? "#223548" : "#301934", textShadow: isDark ? "none" : "0 0 30px rgba(70, 198, 209, 0.3)" }}
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
                            className="text-primary shrink-0"
                          />
                          <span className="text-gray-200 text-base leading-relaxed">
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
                      style={{ color: isDark ? "#223548" : "#301934", textShadow: isDark ? "none" : "0 0 30px rgba(70, 198, 209, 0.3)" }}
                    >
                      Upcoming Goals
                    </h3>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
                      {trustStats.map((s, i) => (
                        <div
                          key={i}
                          className={`p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${isDark
                            ? "bg-slate-50 border-slate-200 shadow-xl"
                            : "bg-[#0F172A] border-black backdrop-blur-xl"

                            }`}
                        >
                          <div className={`text-3xl md:text-4xl font-black mb-3 ${isDark ? "text-slate-500" : "text-gray-300"}`}>
                            {s.value}
                          </div>
                          <div className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] ${isDark ? "text-slate-500" : "text-gray-300"}`}>
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
