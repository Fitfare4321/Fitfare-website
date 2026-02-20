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
          background: isDark
            ? "linear-gradient(135deg, rgba(128, 229, 202, 0.98) 0%, rgba(240,253,244,0.97) 100%)"
            : "linear-gradient(135deg, rgba(109, 180, 231, 0.83) 0%, rgba(236,252,245,0.95) 100%)",
          boxShadow: "0 10px 36px rgba(0, 0, 0, 0.14)",
          border: "1px solid rgba(16,185,129,0.18)",
        }}
      >
        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-1"
          style={{
            boxShadow: "0 0 0 1px rgba(16,185,129,0.25)",
            background: isDark
              ? "linear-gradient(135deg, rgba(16,185,129,0.20), rgba(16,185,129,0.10))"
              : "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.08))",
            backdropFilter: "saturate(120%) blur(10px)",
          }}
        >
          <Icon size={22} style={{ color: "#10B981" }} />
        </div>
        <h4
          className={`font-semibold text-base md:text-lg text-gray-900`}
          style={{ letterSpacing: "-0.01em" }}
        >
          {title}
        </h4>
        <p
          className={`text-[13px] md:text-sm leading-relaxed text-gray-600`}
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
      className={`relative h-[300vh] ${
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
          {/* ===== SOLID GREEN BACKGROUND (ZOMATO STYLE) ===== */}
          <div
            className="absolute inset-0"
            style={{
              background: "#10B981", // Solid emerald green
            }}
          />
          
          {/* ===== CURVE MASK WRAPPER (ZOMATO STYLE CURVED CARDS) ===== */}
          <div className="absolute inset-0 overflow-hidden">
            {/* TOP CURVE CUT */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: "180%",
                height: "200px",
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
                width: "180%",
                height: "200px",
                background: isMoon ? "#ffffff" : "#071A2F",
                borderTopLeftRadius: "60% 120%",
                borderTopRightRadius: "60% 120%",
                zIndex: 2,
              }}
            />
          </div>

          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
            <motion.div
              className="absolute rounded-full overflow-hidden shadow-2xl"
              style={{
                top: 140,
                left: -24,
                width: 150,
                height: 150,
                background:
                  "radial-gradient(circle at 30% 30%, #f5d38a 0%, #e0b95d 35%, #c79a3a 65%, #a87926 100%)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
                border: "3px solid rgba(255,255,255,0.2)",
              }}
              animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(255,255,255,0.28) 0%, transparent 40%)",
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: "#0f172a" }}
              >
                <Dumbbell size={42} color="#0f172a" />
              </div>
            </motion.div>

            <motion.div
              className="absolute rounded-full overflow-hidden shadow-2xl"
              style={{
                top: 130,
                right: -28,
                width: 170,
                height: 170,
                background:
                  "radial-gradient(circle at 70% 30%, #f5d38a 0%, #e0b95d 35%, #c79a3a 65%, #a87926 100%)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
                border: "3px solid rgba(255,255,255,0.2)",
              }}
              animate={{ y: [0, -10, 0], rotate: [0, -6, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.26) 0%, transparent 40%)",
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: "#0f172a" }}
              >
                <Trophy size={48} color="#0f172a" />
              </div>
            </motion.div>
          </div>

          {/* ===== CONTENT LAYER (Zomato Style Layout) ===== */}

          <div className="relative z-10 min-h-[1100px] flex items-center justify-center py-32">
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
                      className="text-4xl md:text-5xl font-bold tracking-tight text-white"
                      style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)" }}
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
                      className="inline-block text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-white/80"
                    >
                      Our Story
                    </span>

                    <h2
                      className="text-3xl md:text-5xl font-bold tracking-tight px-4 text-white"
                      style={{
                        textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
                      }}
                    >
                      Building The Future  of Flexible Fitness
                    </h2>

                    <p
                      className="text-md md:text-[16px] leading-relaxed max-w-2xl mx-auto px-6 text-white/90"
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
                            className="text-white shrink-0"
                          />
                          <span className="text-white/90 text-base leading-relaxed">
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
                      className="text-2xl md:text-5xl font-bold tracking-tight text-white"
                      style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)" }}
                    >
                      Upcoming Goals
                    </h3>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
                      {trustStats.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 24, scale: 0.96 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.6, delay: i * 0.08, type: "spring", stiffness: 160 }}
                          whileHover={{ scale: 1.04 }}
                          className="relative p-8 rounded-[2rem] border overflow-hidden"
                          style={{
                            background: isDark
                              ? "linear-gradient(180deg, rgba(16,23,42,0.92) 0%, rgba(12,20,33,0.92) 100%)"
                              : "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(236,252,245,0.75) 100%)",
                            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(16,185,129,0.18)",
                            boxShadow: isDark
                              ? "0 14px 36px rgba(0,0,0,0.35)"
                              : "0 12px 30px rgba(16,185,129,0.15)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ x: "-120%" }}
                            whileHover={{ x: "120%" }}
                            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                              background:
                                "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                            }}
                          />
                          <div className={`text-3xl md:text-4xl font-black mb-3 ${isDark ? "text-white/90" : "text-[#0f172a]"}`}>
                            {s.value}
                          </div>
                          <div className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] ${isDark ? "text-white/70" : "text-[#0f172a]/70"}`}>
                            {s.label}
                          </div>
                        </motion.div>
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
