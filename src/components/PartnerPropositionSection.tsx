import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Users, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const partnerProps = [
  {
    icon: Eye,
    title: "Visibility",
    desc: "Appear in the FitFare app when users are looking for a place to train.",
  },
  {
    icon: Settings,
    title: "Operations",
    desc: "Manage bookings, verify check-ins, and view attendance.",
  },
  {
    icon: Users,
    title: "Reach",
    desc: "Connect with a community looking for flexible fitness options.",
  },
];

const PartnerPropositionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(".partner-prop-header", {
      scrollTrigger: { trigger: ".partner-prop-header", start: "top 85%" },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".partner-prop-card", {
      scrollTrigger: { trigger: ".partner-prop-grid", start: "top 80%" },
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.5)",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-black relative overflow-hidden text-white">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#305CDE]/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="partner-prop-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Grow With FitFare
          </h2>
          <p className="text-gray-400 font-medium max-w-lg mx-auto">
            Join the platform that connects fitness centres with people looking for their next workout.
          </p>
        </div>

        <div className="partner-prop-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {partnerProps.map((prop, i) => (
            <div 
              key={prop.title}
              className="partner-prop-card bg-gray-900 rounded-[2rem] p-8 border border-gray-800 hover:border-[#305CDE]/50 hover:shadow-[0_0_30px_rgba(48,92,222,0.15)] hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#305CDE]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#305CDE]/30 transition-all duration-300">
                <prop.icon size={24} className="text-[#305CDE]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {prop.title}
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed">
                {prop.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/partner-form" className="bg-white text-black px-8 py-4 rounded-full text-sm font-bold inline-flex items-center gap-3 hover:bg-[#305CDE] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl group">
            Become a Partner Centre
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PartnerPropositionSection;
