"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

import begluru from "@/assets/b.jpg";
import delhi from "@/assets/d.jpg";
import hydrabad from "@/assets/h.jpg";
import mumbai from "@/assets/m4.jpg";
import pune from "@/assets/p1.png";

import { MapPin } from "lucide-react";

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
  isMobile,
}: {
  city: typeof cities[0];
  index: number;
  active: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
  setActive: (i: number) => void;
  hasAnimated: boolean;
  isMoon: boolean;
  isMobile: boolean;
}) => {
  const offset = index - active;
  const isActive = active === index;
  const isHovered = hovered === index;

  return (
    <motion.div
      onClick={() => setActive(index)}
      onMouseEnter={() => !isMobile && setHovered(index)}
      onMouseLeave={() => !isMobile && setHovered(null)}
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
        x: isMobile ? offset * 180 : offset * 220,
        scale: isMobile
          ? isActive
            ? 1
            : 0.9
          : isHovered
          ? 1
          : isActive
          ? 1.08
          : 0.9,
        rotate: isMobile ? 0 : isHovered ? 0 : offset * 8,
        y: isMobile ? 0 : isHovered ? -10 : isActive ? -20 : 0,
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
        className={`relative z-10 w-[300px] md:w-[340px] h-[440px] md:h-[480px] rounded-[36px] border overflow-hidden backdrop-blur-xl transition-all duration-500
        ${
          isHovered
            ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            : isMoon
            ? "bg-slate-900/70 border-slate-700 shadow-[0_35px_100px_rgba(0,0,0,0.6)]"
            : "bg-white border-slate-200 shadow-[0_35px_100px_rgba(0,0,0,0.15)]"
        }`}
      >
        <motion.div
          className="absolute top-4 left-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
          initial={false}
          animate={{
            width: isHovered ? "20%" : "2%",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />

        <div className="p-8 flex flex-col h-full">
          <div className="w-full h-52 md:h-56 rounded-3xl overflow-hidden mb-6 shadow-lg">
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          <h3
            className={`text-2xl font-bold mb-2 ${
              isMoon ? "text-white" : "text-slate-900"
            }`}
          >
            {city.name}
          </h3>

          <p
            className={`text-sm font-medium mb-4 ${
              isMoon ? "text-gray-400" : "text-slate-500"
            }`}
          >
            {city.label}
          </p>

          <p
            className={`text-sm leading-relaxed ${
              isMoon ? "text-gray-300" : "text-slate-600"
            }`}
          >
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
  const [isMobile, setIsMobile] = useState(false);

  const { theme } = useTheme();
  const isMoon = theme === "dark";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section
      ref={ref}
      className={`relative z-0 py-28 overflow-hidden transition-all duration-500
        ${
          isMoon
            ? "bg-slate-900 text-white"
            : "bg-gradient-to-br from-slate-50 to-slate-100 text-black"
        }`}
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
            <MapPin size={16} />
            Live Locations
          </span>

          <h2 className="text-5xl font-bold leading-tight">
            We are Active in <br />
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent font-extrabold">

              Top Cities
            </span>
          </h2>
        </div>

        <p
          className={`max-w-md text-lg ${
            isMoon ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Find premium fitness centers, gym sessions, and expert trainers in your city.
        </p>
      </div>

      {/* STACK */}
      <div className="relative h-[460px] md:h-[520px] flex items-center justify-center w-full max-w-[1400px] mx-auto overflow-visible">
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
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* MOBILE DOT INDICATORS */}
      {isMobile && (
        <div className="mt-10 flex justify-center items-center gap-3">
          {cities.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-8 bg-blue-500 shadow-md shadow-blue-500/40"
                  : "w-2.5 bg-gray-400/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CitiesSection;