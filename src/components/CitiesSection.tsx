"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

import begluru from "@/assets/b.jpg";
import delhi from "@/assets/d.jpg";
import hydrabad from "@/assets/h.jpg";
import mumbai from "@/assets/m3.jpg";
import pune from "@/assets/Pun.png";

import { ArrowRight, MapPin } from "lucide-react";

/* ---------------- DATA ---------------- */

const cities = [
  { name: "Bengaluru", image: begluru, id: "blr", label: "Silicon Valley of India" },
  { name: "Delhi", image: delhi, id: "del", label: "The Capital City" },
  { name: "Hyderabad", image: hydrabad, id: "hyd", label: "City of Pearls" },
  { name: "Mumbai", image: mumbai, id: "mum", label: "The City of Dreams" },
  { name: "Pune", image: pune, id: "pun", label: "Oxford of the East" },
];

/* ---------------- CARD ---------------- */

const CityCard = ({
  city,
  index,
  active,
  hovered,
  setHovered,
  setActive,
  hasAnimated,
  isMoon,
}: {
  city: typeof cities[0];
  index: number;
  active: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
  setActive: (i: number) => void;
  hasAnimated: boolean;
  isMoon: boolean;
}) => {

  const offset = index - active;
  const isActive = active === index;
  const isHovered = hovered === index;

  return (
    <motion.div
      onClick={() => setActive(index)}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="absolute cursor-pointer will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
      initial={{
        x: 0,
        scale: 0.7,
        opacity: 0,
        rotate: 0,
        y: 80,
      }}
      animate={{
        x: offset * 220,

        scale: isHovered ? 1 : isActive ? 1.08 : 0.9,
        rotate: isHovered ? 0 : offset * 8,
        y: isHovered ? -10 : isActive ? -20 : 0,

        opacity: Math.abs(offset) > 2 ? 0 : 1,
        zIndex: isHovered ? 100 : 50 - Math.abs(offset),
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 1.2,
        delay: hasAnimated ? Math.abs(offset) * 0.15 : 0,
      }}
    >
      <div
        className={`relative z-10 w-[340px] h-[480px] rounded-[36px] border overflow-hidden backdrop-blur-xl transition-all duration-500
          ${
            isMoon
              ? "bg-slate-900/70 border-slate-700 shadow-[0_35px_100px_rgba(0,0,0,0.6)]"
              : "bg-white border-slate-200 shadow-[0_35px_100px_rgba(0,0,0,0.15)]"
          }
        `}
      >
        <div className="absolute top-4 left-8 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />

        <div className="p-8 flex flex-col h-full">

          <div className="w-full h-56 rounded-3xl overflow-hidden mb-6 shadow-lg">
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          <h3 className={`text-2xl font-bold mb-2 ${isMoon ? "text-white" : "text-slate-900"}`}>
            {city.name}
          </h3>

          <p className={`text-sm font-medium mb-4 ${isMoon ? "text-gray-400" : "text-slate-500"}`}>
            {city.label}
          </p>

          <p className={`text-sm leading-relaxed mb-6 ${isMoon ? "text-gray-300" : "text-slate-600"}`}>
            Discover premium gyms, expert trainers, and high-performance
            workout programs designed to elevate your fitness journey in{" "}
            {city.name}. Train smarter. Achieve faster.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- SECTION ---------------- */

const CitiesSection = () => {
  const [active, setActive] = useState(2);
  const [hovered, setHovered] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { theme } = useTheme();
  const isMoon = theme === "dark";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className={`relative z-0 py-28 overflow-hidden transition-all duration-500
        ${
          isMoon
            ? "bg-slate-900 text-white"
            : "bg-gradient-to-br from-slate-50 to-slate-100 text-black"
        }
      `}
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            Live Locations
          </span>

          <h2 className={`text-5xl font-bold leading-tight ${isMoon ? "text-white" : "text-slate-900"}`}>
            We are Active in <br />
            <span className="bg-gradient-to-r 
                 from-[#1f6f8b] 
                 via-[#2a9d8f] 
                 to-[#3db4c7] 
                 bg-clip-text text-transparent">
  Top Cities
</span>

          </h2>
        </div>

        <p className={`max-w-md text-lg ${isMoon ? "text-gray-300" : "text-slate-600"}`}>
          Find premium fitness centers, gym sessions, and expert trainers in your city.
        </p>
      </div>

      {/* STACK */}
      <div className="relative h-[520px] flex items-center justify-center w-full max-w-[1400px] mx-auto">
        {cities.map((city, index) => (
          <CityCard
            key={city.id}
            city={city}
            index={index}
            active={active}
            hovered={hovered}
            setHovered={setHovered}
            setActive={setActive}
            hasAnimated={hasAnimated}
            isMoon={isMoon}
          />
        ))}
      </div>
    </section>
  );
};

export default CitiesSection;
