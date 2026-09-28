import { WorksWheel } from "@/components/ui/works-wheel";
import { ArrowRight } from "lucide-react";

import gymImg from "@/assets/hero-card-gym.jpg";
import yogaImg from "@/assets/yoga.jpg";
import functionalImg from "@/assets/strength.jpg";
import groupImg from "@/assets/cardio.jpg";
import danceImg from "@/assets/zumba.jpg";
import exploreImg from "@/assets/kickboxing.jpg"; // Mock image for explore more

const activitiesData = [
  { id: 1, title: "Gyms", image: gymImg, alt: "Gyms", href: "#" },
  { id: 2, title: "Yoga", image: yogaImg, alt: "Yoga", href: "#" },
  { id: 3, title: "Functional Training", image: functionalImg, alt: "Functional Training", href: "#" },
  { id: 4, title: "Group Fitness", image: groupImg, alt: "Group Fitness", href: "#" },
  { id: 5, title: "Dance & Zumba", image: danceImg, alt: "Dance & Zumba", href: "#" },
  { id: 6, title: "Explore More", image: exploreImg, alt: "Explore More", href: "#" }
];

import { motion } from "framer-motion";

const ActivitiesSection = () => {
  return (
    <section
      id="activities"
      className="py-24 bg-black relative overflow-x-clip z-10"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#305CDE]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-0 md:mb-20 mt-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 leading-[1.1] mb-6"
          style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
        >
          One App. <br className="hidden sm:block" /> More Ways to Move.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto"
        >
          Find the kind of movement that feels right today, all in one place.
        </motion.p>
      </div>

      <div className="w-full relative z-10 h-[400vh]" id="wheel-scroll-track">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <WorksWheel
            items={activitiesData}
            label="Explore"
            action="View"
            className="text-white w-full h-[90vh] min-h-[400px]"
          />
        </div>
      </div>

      <div className="text-center mt-12 mb-24 relative z-20">
        <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-3 mx-auto hover:bg-[#305CDE] dark:hover:bg-[#305CDE] hover:text-white dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-300">
          Explore Fitness Near You
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default ActivitiesSection;
