import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PayAsYouGoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Background reveal
    gsap.fromTo(el,
      { backgroundColor: "#000000" },
      {
        backgroundColor: "var(--lime)",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "top 40%",
          scrub: true,
        }
      }
    );

    // Oversized type animation
    const chars = el.querySelectorAll(".pay-char");
    gsap.from(chars, {
      scrollTrigger: { trigger: el, start: "top 60%" },
      opacity: 0,
      y: 80,
      rotateX: -60,
      scale: 0.8,
      duration: 1.2,
      stagger: 0.04,
      ease: "back.out(2)",
    });

    gsap.from(".pay-subtext", {
      scrollTrigger: { trigger: el, start: "top 60%" },
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });

    gsap.from(".pay-cta", {
      scrollTrigger: { trigger: el, start: "top 60%" },
      opacity: 0,
      y: 30,
      scale: 0.9,
      duration: 0.8,
      delay: 0.6,
      ease: "back.out(1.5)",
    });
  }, { scope: sectionRef });

  const headlineText = "Pay for Fitness. Not for an Empty Calendar.";
  
  return (
    <section ref={sectionRef} className="py-32 md:py-48 overflow-hidden relative text-white">
      {/* Dynamic graphic backdrop */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border-[100px] border-white/20 rounded-full blur-3xl scale-[2]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <h2 
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif", perspective: "1000px" }}
        >
          {headlineText.split("").map((char, i) => (
            <span
              key={i}
              className="pay-char inline-block"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        <p className="pay-subtext text-lg md:text-2xl font-medium max-w-3xl mx-auto text-white/90 leading-relaxed mb-12">
          No need to pay for an entire month just because you might work out. With FitFare, choose an available workout or access option and pay based on your booking.
        </p>

        <div className="pay-cta">
          <button className="group bg-black text-white px-10 py-5 rounded-full text-base font-bold flex items-center justify-center gap-3 mx-auto hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl relative overflow-hidden">
            <span className="relative z-10">Pay As You Go</span>
            <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-black/10 flex items-center justify-center relative z-10 transition-colors">
              <ArrowRight size={16} />
            </div>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 group-hover:via-black/5 to-transparent group-hover:animate-[shimmer-sweep_1.5s_ease-in-out]" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default PayAsYouGoSection;
