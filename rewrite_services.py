import re

content = """\"use client\";

import { useRef, useState } from "react";
import { m, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Activity, Heart, Music, Shield, Flame, Dumbbell, Bike, StretchHorizontal, Timer, Plus
} from "lucide-react";

const services = [
  {
    id: "cardio",
    name: "Cardio Elevate",
    icon: Activity,
    color: "from-blue-400 to-cyan-400",
    tag: "Endurance",
    description: "High-energy cardiovascular conditioning designed to maximize caloric burn, improve heart health, and build stamina. Features state-of-the-art treadmills, ellipticals, and guided HIIT sprints.",
    benefits: ["Increased stamina", "Heart health", "Caloric burn"],
  },
  {
    id: "strength",
    name: "Pure Strength",
    icon: Dumbbell,
    color: "from-emerald-400 to-teal-400",
    tag: "Power",
    description: "Progressive resistance training focused on hypertrophy and raw power. Full access to free weights, olympic lifting platforms, and pin-loaded isolation machines.",
    benefits: ["Muscle building", "Bone density", "Metabolic boost"],
  },
  {
    id: "yoga",
    name: "Mind & Flow Yoga",
    icon: Heart,
    color: "from-rose-400 to-pink-400",
    tag: "Recovery",
    description: "Vinyasa, Hatha, and restorative yoga sessions led by expert instructors. Designed to improve flexibility, reduce stress, and enhance mind-body connection in a completely immersive environment.",
    benefits: ["Core stability", "Mental clarity"],
  },
  {
    id: "hiit",
    name: "HIIT Performance",
    icon: Timer,
    color: "from-amber-400 to-orange-400",
    tag: "Intensity",
    description: "High-Intensity Interval Training that pushes your lactate threshold. Quick, explosive bursts of exercise followed by short recovery periods for maximum efficiency.",
    benefits: ["Time efficient", "Athletic power"],
  },
  {
    id: "calisthenics",
    name: "Urban Calisthenics",
    icon: Flame,
    color: "from-red-400 to-rose-400",
    tag: "Bodyweight",
    description: "Master your own bodyweight with progressive calisthenics. From basic pull-ups and dips to advanced static holds like muscle-ups and front levers on custom rigging.",
    benefits: ["Functional strength", "Body control", "Joint health"],
  },
  {
    id: "kickboxing",
    name: "Combat & Striking",
    icon: Shield,
    color: "from-violet-400 to-purple-400",
    tag: "Combat",
    description: "High-octane kickboxing and striking classes. Learn proper technique, footwork, and combinations while getting one of the most intense full-body workouts available.",
    benefits: ["Coordination", "Stress relief", "Agility"],
  },
  {
    id: "cycling",
    name: "Rhythm Cycling",
    icon: Bike,
    color: "from-sky-400 to-blue-400",
    tag: "Endurance",
    description: "Immersive indoor cycling driven by high-BPM playlists and dynamic lighting. Climb hills, hit sprints, and ride to the rhythm in our dedicated spin studios.",
    benefits: ["Lower body strength", "Low impact", "Cardio capacity"],
  },
  {
    id: "zumba",
    name: "Zumba Energy",
    icon: Music,
    color: "from-fuchsia-400 to-pink-400",
    tag: "Dance",
    description: "Dance your way to fitness with energetic, Latin-inspired choreography. A perfect blend of aerobic conditioning and pure fun that feels more like a party than a workout.",
    benefits: ["Cardiovascular health", "Coordination", "Mood elevation"],
  },
  {
    id: "stretching",
    name: "Mobility & Stretch",
    icon: StretchHorizontal,
    color: "from-teal-400 to-emerald-400",
    tag: "Recovery",
    description: "Dedicated mobility work and deep fascial stretching to improve range of motion, prevent injuries, and accelerate recovery between intense training days.",
    benefits: ["Injury prevention", "Posture correction", "Muscle recovery"],
  },
];

export default function Services() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || !theme;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [300, -1000]);
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden min-h-screen pt-32 pb-40 bg-black/20">
      
      {/* 1. Giant Animated Scrolling Text (Images 1-4) */}
      <div className="w-full flex items-center overflow-hidden mb-32 whitespace-nowrap select-none">
         <m.div style={{ x: x1 }} className="flex items-center gap-6 sm:gap-10 text-[18vw] leading-none font-black tracking-tighter mix-blend-difference">
            <span className="text-white/40" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)", color: "transparent" }}>We</span>
            
            {/* Wavy Arrow */}
            <svg className="w-[12vw] h-[12vw] text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 50 Q 25 20 40 50 T 70 50 M 70 50 L 55 35 M 70 50 L 55 65" />
            </svg>

            <span className="text-white">are</span>

            {/* Sparkle/Star */}
            <div className="w-[14vw] h-[14vw] bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center">
              <svg className="w-[8vw] h-[8vw] text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.6 7.6 2.4-7.6 2.4-2.4 7.6-2.4-7.6-7.6-2.4 7.6-2.4z"/>
              </svg>
            </div>

            <span className="text-white/40" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)", color: "transparent" }}>best:</span>
         </m.div>
      </div>

      {/* 2. Accordion UI List (Image 5) */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8">
        <div className="border-t border-white/10">
          {services.map((service, idx) => {
             const isOpen = openService === service.id;
             const num = (idx + 1).toString().padStart(2, '0');
             const Icon = service.icon;

             return (
               <div key={service.id} className="border-b border-white/10 group">
                 <button 
                   onClick={() => setOpenService(isOpen ? null : service.id)}
                   className="w-full py-8 sm:py-12 flex items-center justify-between text-left transition-all duration-300 hover:bg-white/[0.01] px-4"
                 >
                   <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-16 w-full">
                     <div className="flex items-center gap-10">
                       <span className="text-slate-500 font-mono text-xl w-8 shrink-0">{num}</span>
                       <div className="hidden sm:flex text-slate-500 transition-colors group-hover:text-[#D9A84E] shrink-0">
                         <m.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                            <Plus size={24} />
                         </m.div>
                       </div>
                     </div>
                     <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-200 transition-colors group-hover:text-white uppercase truncate">
                       {service.name}
                     </h3>
                   </div>
                 </button>

                 <AnimatePresence>
                   {isOpen && (
                     <m.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                       className="overflow-hidden"
                     >
                       <div className="pb-12 pt-4 px-4 sm:pl-[9.5rem] flex flex-col md:flex-row gap-10 items-start">
                         <div className="flex-1">
                           <p className="text-lg sm:text-2xl text-slate-400 font-medium leading-relaxed mb-8 max-w-4xl">
                             {service.description}
                           </p>
                           <div className="flex flex-wrap gap-4">
                             {service.benefits.map((b, i) => (
                               <span key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-slate-300 flex items-center gap-2 tracking-wide uppercase">
                                 <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                                 {b}
                               </span>
                             ))}
                           </div>
                         </div>
                         <div className="w-28 h-28 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 shadow-2xl">
                           <Icon size={48} className={`bg-clip-text text-transparent bg-gradient-to-br ${service.color}`} style={{ color: "currentColor" }} />
                         </div>
                       </div>
                     </m.div>
                   )}
                 </AnimatePresence>
               </div>
             )
          })}
        </div>
      </div>
    </div>
  )
}
"""

with open("src/components/Services.tsx", "w") as f:
    f.write(content)

print("Services.tsx rewritten!")
