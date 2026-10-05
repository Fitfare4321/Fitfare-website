import { m, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import jaiKaushik from "@/assets/JaiKaushik.jpg";
import rohitMote from "@/assets/RohitMote.jpg";

const testimonials = [
  {
    name: "Shubhangi Wakad",
    role: "Collegian",
    rating: 5,
    text: "As a college student, I love that I can hit the gym without any monthly commitment. FitFare gives me the flexibility to work out wherever and whenever I want!",
    image:
      "https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A=",
  },
  {
    name: "Jai Kaushik",
    role: "Software Engineer",
    rating: 5,
    text: "With my hectic work schedule, FitFare's pay-per-use model fits perfectly into my lifestyle. I've discovered new gyms nearby and only pay when I actually go!",
    image: jaiKaushik,
  },
  {
    name: "Rohit Mote",
    role: "Business Owner",
    rating: 5,
    text: "Staying fit was hard with my travel packed job, but FitFare made it seamless. I now explore different gyms without locking into long-term plans.",
    image: rohitMote,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [autoProgress, setAutoProgress] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
    setAutoProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    setAutoProgress(0);
  }, []);

  /* Auto-cycle with progress */
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--surface-1)" }}
    >
      {/* Section divider */}
      <div className="section-divider-glow mb-20" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.03] pointer-events-none"
        style={{ background: "#2563eb" }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/30 block mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
            What Our Users Say
          </h2>
        </m.div>

        {/* Spotlight testimonial */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          {/* Decorative quote marks */}
          <div className="absolute top-0 left-0 text-[120px] md:text-[180px] font-serif leading-none text-white/[0.03] select-none pointer-events-none">
            "
          </div>

          <AnimatePresence mode="wait">
            <m.div
              key={current}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-blue-500 text-blue-500" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/70 max-w-3xl mx-auto mb-10 tracking-tight">
                "{t.text}"
              </p>

              {/* User info */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                  />
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full border border-blue-500/20 scale-125 opacity-50" />
                </div>

                <div className="text-center">
                  <div className="font-semibold text-sm text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-white/35">
                    {t.role}
                  </div>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <m.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="p-2 text-white/30 hover:text-white/60 transition-colors"
          >
            <ChevronLeft size={20} />
          </m.button>

          {/* Progress dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  setAutoProgress(0);
                }}
                className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: current === i ? 40 : 8 }}
              >
                <div className="absolute inset-0 bg-white/10 rounded-full" />
                {current === i && (
                  <m.div
                    className="absolute inset-0 bg-blue-500 rounded-full origin-left"
                    style={{ scaleX: autoProgress / 100 }}
                  />
                )}
              </button>
            ))}
          </div>

          <m.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="p-2 text-white/30 hover:text-white/60 transition-colors"
          >
            <ChevronRight size={20} />
          </m.button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
