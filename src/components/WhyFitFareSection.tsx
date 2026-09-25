import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeatureGallery } from "./ui/image-gallery";

gsap.registerPlugin(ScrollTrigger);

const WhyFitFareSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      }
    });

    tl.from(".why-fitfare-title", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out"
    })
    .fromTo(".why-gallery-container",
      { opacity: 0, scale: 0.95, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.6"
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-2 pb-24 bg-black relative overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full mx-auto relative z-10 flex flex-col items-center">
        <div className="why-fitfare-title text-center max-w-2xl px-4 mb-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Fitness Should Fit Your Life.
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-medium">
            Your schedule changes. Your location changes. Your workout might change too. FitFare gives you a more flexible way to keep moving.
          </p>
        </div>

        {/* Feature Image Gallery */}
        <div className="why-gallery-container w-full flex justify-center">
          <FeatureGallery />
        </div>
      </div>
    </section>
  );
};

export default WhyFitFareSection;
