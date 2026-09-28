"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  image?: string;
}

const Timeline = ({ items }: { items: TimelineItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animate the line drawing down based on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative pt-20 pb-40" ref={containerRef}>
      {/* Background Line (Faint) */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
      
      {/* Animated Line (Draws down on scroll) */}
      <motion.div 
        className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-white via-white to-transparent -translate-x-1/2 origin-top"
        style={{ height: lineHeight }}
      />

      <div className="space-y-24 md:space-y-40">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center justify-between group ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot with Pulse Effect */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-[8px] h-[8px] rounded-full bg-white ring-4 ring-black shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
                />
              </div>
              
              {/* Text Side */}
              <div className={`w-full md:w-1/2 pl-8 md:pl-0 flex flex-col justify-center ${isEven ? "md:pr-12 lg:pr-24 md:items-end md:text-right" : "md:pl-12 lg:pl-24 md:items-start md:text-left"}`}>
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -60 : 60, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="max-w-md w-full"
                >
                  {item.date && (
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="block text-gray-500 text-sm md:text-base mb-3 font-medium uppercase tracking-widest"
                    >
                      ({item.date})
                    </motion.span>
                  )}
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-lg">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Image Side with 3D/Parallax effect */}
              <div className={`w-full md:w-1/2 mt-12 md:mt-0 pl-8 md:pl-0 ${isEven ? "md:pl-12 lg:pl-24" : "md:pr-12 lg:pr-24"}`}>
                 {item.image && (
                   <div className="perspective-[1200px]">
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.8, rotateY: isEven ? -20 : 20, rotateX: 10, y: 50 }}
                       whileInView={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.2 }}
                       whileHover={{ scale: 1.05, rotateY: isEven ? 5 : -5, transition: { duration: 0.4 } }}
                       className="overflow-hidden rounded-[24px] w-full relative group border border-white/10"
                     >
                       {/* Image Reveal Overlay */}
                       <motion.div 
                          initial={{ scaleY: 1 }}
                          whileInView={{ scaleY: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                          className="absolute inset-0 bg-[#0A0A0A] z-10 origin-top"
                       />
                       <img 
                         src={item.image} 
                         alt={item.title} 
                         className="w-full h-full object-cover aspect-[4/3] md:aspect-[3/2] opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                       />
                       
                       {/* Glossy overlay effect */}
                       <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
                     </motion.div>
                   </div>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Timeline;
