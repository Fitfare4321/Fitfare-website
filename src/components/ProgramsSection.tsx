import CircularSplitRoll from "@/components/ui/circular-split-roll";

import gymImg from "@/assets/hero-card-gym.jpg";
import yogaImg from "@/assets/yoga.jpg";
import functionalImg from "@/assets/strength.jpg";
import groupImg from "@/assets/cardio.jpg";
import danceImg from "@/assets/zumba.jpg";
import exploreImg from "@/assets/kickboxing.jpg";

const programsData = [
  { id: 1, title: "Gyms", image: gymImg, alt: "Gyms" },
  { id: 2, title: "Yoga", image: yogaImg, alt: "Yoga" },
  { id: 3, title: "Functional Training", image: functionalImg, alt: "Functional Training" },
  { id: 4, title: "Group Fitness", image: groupImg, alt: "Group Fitness" },
  { id: 5, title: "Dance & Zumba", image: danceImg, alt: "Dance & Zumba" },
  { id: 6, title: "Explore More", image: exploreImg, alt: "Explore More" }
];

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-24 bg-[#eceef1] dark:bg-[#060608] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-tight mb-6" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
            One App. More Ways to Move.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl font-medium">
            Find the kind of movement that feels right today, all in one place.
          </p>
        </div>
      </div>

      <CircularSplitRoll
        items={programsData}
        radius={500}
        cardSize={280}
        textSideScale={0.68}
        textSideOpacity={0.18}
        background="transparent"
      />
    </section>
  );
};

export default ProgramsSection;
