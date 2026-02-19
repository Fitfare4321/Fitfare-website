"use client";

import {
  motion,
  useMotionValue
} from "framer-motion";
import { useRef, useState } from "react";
import { useTheme } from "next-themes";

import programStrength from "@/assets/cardio.jpg";

import programCardio from "@/assets/strength.jpg";
import programYoga from "@/assets/yoga.jpg";
import programCoaching from "@/assets/cal.jpg";
import programZumba from "@/assets/zumba.jpg";
import programKickboxing from "@/assets/kickboxing.jpg";

import strengthVideo from "@/assets/strength_vdo.mp4";
import yogaVideo from "@/assets/yoga and medi.mp4";
import cardio from "@/assets/cardio.mp4";
import kick_boxing from "@/assets/kick_boxing.mp4";
import calisthenics from "@/assets/calisthenics.mp4";
import etc from "@/assets/etc.mp4"

/* ---------------- DATA ---------------- */

const programs = [
  {
    title: "Strength Training",
    description: "Build muscle and power with expert-guided strength programs.",
    image : programStrength,
    tag: "Popular"
  },  
  {
    title: "Cardio",
    description: "Torch calories and boost endurance with high-intensity sessions.",
    image : programCardio,
    tag: "Trending"
  },
  {
    title: "Yoga & Meditation",
    description: "Find balance and flexibility through guided yoga flows.",
    image : programYoga,
    tag: "New"
  },  
  {
    title: "Calisthenics",
    description: "Master bodyweight strength and mobility training.",
    image : programCoaching,
    tag: "Premium"
  },
  {
    title: "Kick Boxing",
    description: "Combat training to improve strength and stamina.",
    image : programKickboxing,
    tag: "Intense"
  },
  {
    title: "Zumba",
    description: "Enhance real-world strength with dynamic functional workouts designed for everyday performance.",
    image : programZumba,
    tag: "Fun"
  }
];

/* ---------------- CARD ---------------- */

const ProgramCard = ({ program, index, isMoon }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rotateY.set(((x / width) - 0.5) * 4);
    rotateX.set(((y / height) - 0.5) * -4);

  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const isActive = isHovered || isClicked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.7 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        reset();
        setIsClicked(false);
      }}
      onClick={() => setIsClicked(!isClicked)}
      className={`group relative rounded-3xl overflow-hidden h-[360px] sm:h-[480px] lg:h-[460px]


        transition-all duration-500 border cursor-pointer
        ${isMoon
          ? "bg-white border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          : "bg-slate-900/70 border-slate-700 shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
        }
      `}
    >

      {/* Image */}
     {/* Video OR Image */}
{program.video ? (
  <motion.video
    src={program.video}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 w-full h-full object-cover"
    whileHover={{ scale: 1.015 }}
    transition={{ duration: 1 }}
  />
) : (
  <motion.img
    src={program.image}
    alt={program.title}
    className="absolute inset-0 w-full h-full object-cover"
    whileHover={{ scale: 1.015 }}
    transition={{ duration: 1 }}
  />
)}


      {/* Overlay */}
      <div
        className={`absolute inset-0 ${isMoon
          ? "bg-gradient-to-t from-white/30 via-white/10 to-transparent"
          : "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        
          }`}
      />

      {/* Shine */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={isActive ? { x: "120%" } : { x: "-100%" }}
        transition={{ duration: 1.6 }}
        className={`absolute inset-0 skew-x-12 ${isMoon
          ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
          : "bg-gradient-to-r from-transparent via-white/15 to-transparent"
          }`}
      />

      {/* PREMIUM REVEAL CONTENT */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{
          y: isActive ? 0 : 80,
          opacity: isActive ? 1 : 0
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="absolute inset-x-0 bottom-0 p-6 z-10"
      >
        <div
          className={`
            rounded-2xl p-5  border
            ${isMoon
              ? " border-white/60 shadow-lg"
              : " border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            }
          `}
        >

          {/* Title */}
          <h3
            className={`
              text-xl font-semibold mb-2 tracking-tight
              ${isMoon
                ? "text-slate-900"
                : "bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
              }
            `}
          >
            {program.title}
          </h3>

          {/* Description */}
          <p
            className={`text-sm leading-relaxed ${isMoon ? "text-slate-700" : "text-gray-300"
              }`}
          >
            {program.description}
          </p>

          {/* Divider Glow */}
          <div
            className={`
              mt-4 h-[1px] w-full
              ${isMoon
                ? "bg-gradient-to-r from-transparent via-slate-300 to-transparent"
                : "bg-gradient-to-r from-transparent via-white/40 to-transparent"
              }
            `}
          />
        </div>
      </motion.div>

    </motion.div>
  );
};

/* ---------------- SECTION ---------------- */

const ProgramsSection = () => {

  const sectionRef = useRef(null);
  const { theme } = useTheme();

  const isMoon = theme === "dark";

  return (
    <section
      id="programs"
      ref={sectionRef}
      className={`relative overflow-hidden pt-32 pb-24 transition-all duration-500
        ${isMoon ? "bg-white text-black" : "bg-slate-900 text-white"}
      `}
    >

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-6 mb-20">
        <span className="text-primary font-semibold text-sm uppercase tracking-[0.3em]">
          Our Programs
        </span>

        <h2 className="text-5xl md:text-6xl font-semibold mt-4 mb-6 tracking-tight leading-[1.1]
               bg-gradient-to-r 
               from-[#1e5f74] 
               via-[#2a9d8f] 
               to-[#3db4c7] 
               bg-clip-text text-transparent">
          Choose Your Path
        </h2>

        <p
          className={`text-lg
            ${isMoon ? "text-slate-600" : "text-gray-300"}
          `}
        >
          From strength to serenity, discover a program built for your lifestyle.
        </p>
      </div>

      {/* Cards */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch">

          {programs.map((program, i) => (
            <ProgramCard
              key={i}
              program={program}
              index={i}
              isMoon={isMoon}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default ProgramsSection;
