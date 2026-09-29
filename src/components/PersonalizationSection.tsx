import Timeline from "@/components/ui/timeline-01-utils/timeline";
import { Badge } from "@/components/ui/badge";

import imgNutrition from "@/assets/nutrition_bowl.jpg";
import imgPosture from "@/assets/perfect_squat_form.png";
import imgWomens from "@/assets/womens_wellness_yoga.png";
import imgPersonalized from "@/assets/fitness_app_smartphone.png";

const timelineData = [
  {
    title: "Nutrition",
    description:
      "Tools designed to make nutrition planning and understanding easier.",
    date: "Coming Soon",
    image: imgNutrition,
  },
  {
    title: "Posture & Form",
    description:
      "Tools designed to help you understand movement and form.",
    date: "Coming Soon",
    image: imgPosture,
  },
  {
    title: "Women's Wellness",
    description:
      "Experiences designed to better account for women's wellness and cycle-related context.",
    date: "Coming Soon",
    image: imgWomens,
  },
  {
    title: "Personalized Fitness",
    description:
      "Recommendations designed to become more relevant to your goals and activity.",
    date: "Coming Soon",
    image: imgPersonalized,
  },
];

const PersonalizationSection = () => {
  return (
    <section className="overflow-hidden bg-[#0A0A0A] global-bg-grid text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="px-6 py-10 md:px-10 md:py-16 lg:px-16 lg:py-20">
          <div className="max-w-2xl space-y-4">
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 font-normal text-gray-400 border-white/10 hover:bg-transparent"
            >
              Roadmap
            </Badge>
            <div className="space-y-3 mt-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
                Access Is Just the Beginning.
              </h2>
              <p className="md:text-lg text-base text-gray-400 leading-relaxed max-w-xl">
                FitFare is building toward a more connected, personal fitness experience, beyond finding a place to train.
              </p>
            </div>
          </div>
        </div>
        <div>
          <Timeline items={timelineData} />
        </div>
        <div className="h-18 md:h-28" />
      </div>
    </section>
  );
};

export default PersonalizationSection;
