import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple, Activity, Heart, Sparkles, Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const upcomingFeatures = [
  {
    icon: Apple,
    title: "Nutrition",
    desc: "Tools designed to make nutrition understanding and tracking easier.",
  },
  {
    icon: Activity,
    title: "Posture & Form",
    desc: "Technology designed to help users better understand exercise movement and form.",
  },
  {
    icon: Heart,
    title: "Women's Wellness",
    desc: "Experiences designed to better account for women's wellness and cycle-related context.",
  },
  {
    icon: Sparkles,
    title: "Personalized Fitness",
    desc: "Recommendations intended to become more relevant to your goals and activity.",
  },
];

const PersonalizationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(".roadmap-header", {
      scrollTrigger: { trigger: ".roadmap-header", start: "top 85%" },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
    });

    // "Locked" pulse instead of confident hover/lift
    gsap.from(".roadmap-card", {
      scrollTrigger: { trigger: ".roadmap-grid", start: "top 80%" },
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(".roadmap-card", {
          borderStyle: "dashed",
          borderColor: "rgba(48,92,222,0.3)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-black relative overflow-hidden text-white">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="roadmap-header text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/5 rounded-full px-4 py-1.5 border border-white/10">
            <Lock size={12} className="text-gray-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Roadmap
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Access Is Just the Beginning.
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-medium max-w-lg mx-auto">
            FitFare is being built to make your fitness journey more connected and personal — beyond simply finding somewhere to train.
          </p>
        </div>

        {/* Coming Soon Grid */}
        <div className="roadmap-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {upcomingFeatures.map((feat) => (
            <div
              key={feat.title}
              className="roadmap-card relative coming-soon-card bg-white/5 rounded-[2rem] p-8 border border-white/10"
            >
              <div className="absolute top-6 right-6">
                <span className="bg-gray-800/80 text-gray-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm border border-gray-700">
                  Coming Soon
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center mb-6 mix-blend-luminosity border border-gray-700/50">
                <feat.icon size={24} className="text-gray-400" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-200 mb-2 tracking-tight">
                {feat.title}
              </h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed relative z-10">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PersonalizationSection;
