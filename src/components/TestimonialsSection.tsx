import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import jaiKaushik from "@/assets/JaiKaushik.jpg";
import rohitMote from "@/assets/RohitMote.jpg";

const testimonials = [
  {
    name: "Shubhangi Wakad",
    role: "Collegian",
    rating: 5,
    text: "As a college student, I love that I can hit the gym without any monthly commitment. FitFare gives me the flexibility to work out wherever and whenever I want!",
    image: "https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A=",
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
    text: "Staying fit was hard with my travel-packed job, but FitFare made it seamless. I now explore different gyms without locking into long-term plans.",
    image: rohitMote,
  },
];

const TestimonialsSection = () => {
  const { theme } = useTheme();
  const isMoon = theme === "dark"; // Moon → WHITE UI

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="testimonials"
      className={`section-padding transition-all duration-500 ${isMoon ? "bg-slate-900 text-white" : "bg-white text-black"
        }`}
    >
      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-4">
            What Our Users Say
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`
                relative p-8 rounded-3xl transition-all duration-500
                ${isMoon
                  ? "bg-[#161a22] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.7)]"
                  : "bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                }
                ${current === i ? "ring-1 ring-primary/40" : ""}
              `}
            >


              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Text */}
              <p
                className={`mb-8 leading-relaxed text-[15px] ${isMoon ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                "{t.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <motion.img
                  src={t.image}
                  alt={t.name}
                  className={`w-12 h-12 rounded-full object-cover ${isMoon
                      ? "border border-white/10"
                      : "border border-gray-200"
                    }`}
                  whileHover={{ scale: 1.08 }}
                />
                <div>
                  <div
                    className={`font-semibold ${isMoon ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {t.name}
                  </div>
                  <div
                    className={`text-sm ${isMoon ? "text-gray-400" : "text-gray-500"
                      }`}
                  >
                    {t.role}
                  </div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-b-3xl"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: current === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="p-2 transition-all duration-300 opacity-70 hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </motion.button>


          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-400 ${current === i
                    ? "w-10 bg-primary"
                    : isMoon
                      ? "w-2 bg-gray-300 hover:bg-primary/40"
                      : "w-2 bg-white/20 hover:bg-primary/40"
                  }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="p-2 transition-all duration-300 opacity-70 hover:opacity-100"
          >
            <ChevronRight size={24} />
          </motion.button>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
