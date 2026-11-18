import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";

interface CityHeroParallaxProps {
  cityName: string;
  tagline: string;
  studiosCount?: string;
  image: string;
  accentColor: string;
  accentRgb?: string;
  hubs?: string[];
}

export const CityHeroParallax = ({
  cityName,
  tagline,
  image,
  accentColor,
}: CityHeroParallaxProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const displayImage = location.state?.heroImage || image;

  const isFromTransition = !!location.state?.fromTransition;

  // Track scroll progress of this full-screen hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth buttery scroll parallax: image glides down and scales subtly as user scrolls down
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageParallaxScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[#000000] flex flex-col justify-end select-none"
    >
      {/* ═══════════════════ FULL-SCREEN PARALLAX IMAGE ═══════════════════ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Outer container handles scroll-driven parallax translation & subtle scale */}
        <motion.div
          style={{ y: imageY, scale: imageParallaxScale }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <img
            src={displayImage}
            alt={`${cityName} Fitness Hub`}
            className="w-full h-full object-cover object-center select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </div>

      {/* ═══════════════════ CRISP ATMOSPHERIC GRADIENTS ═══════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, delay: isFromTransition ? 0.55 : 0.1, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none z-10"
      >
        {/* Top subtle vignette for Navbar contrast */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/85 via-black/35 to-transparent" />

        {/* Bottom deep cinematic gradient for title readability, blending into #000000 */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/75 to-transparent" />

        {/* Left side soft vignette for typography depth */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/50 to-transparent hidden sm:block" />
      </motion.div>

      {/* ═══════════════════ BOTTOM INFORMATION ═══════════════════ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.75,
          delay: isFromTransition ? 0.78 : 0.22,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-20 px-6 sm:px-12 lg:px-16 pb-8 sm:pb-12 w-full max-w-7xl mx-auto flex flex-col gap-6"
      >
        <div>
          <div className="max-w-3xl">
            {/* City Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: isFromTransition ? 0.78 : 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-2 mb-2"
            >
              <MapPin size={17} style={{ color: accentColor }} />
              <span
                className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase"
                style={{ color: accentColor }}
              >
                {cityName}
              </span>
            </motion.div>

            {/* City Hero Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: isFromTransition ? 0.84 : 0.26,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl leading-[1.05]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {tagline}
            </motion.h1>
          </div>
        </div>

        {/* Scroll to Explore Cue */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: isFromTransition ? 1.08 : 0.45,
            ease: "easeOut",
          }}
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-1 mt-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer select-none self-center"
        >
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/80">
            Scroll to explore
          </span>
          <ChevronDown size={14} className="text-white/80 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CityHeroParallax;
