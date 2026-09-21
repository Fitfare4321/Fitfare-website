import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

const faqs = [
  {
    q: "What is FitFare?",
    a: "FitFare is a flexible fitness platform that lets you discover and access partnered gyms and fitness centres without committing to a traditional long-term membership. Find a centre that suits you, book your workout, and pay based on the fitness services you actually use."
  },
  {
    q: "How does FitFare work?",
    a: "Simply create your FitFare account, explore available fitness centres near you, choose the service or session you want, complete your booking, and check in at the centre using FitFare. Your bookings and visits can all be managed through the app."
  },
  {
    q: "Do I need to buy a monthly or yearly gym membership?",
    a: "No. FitFare is built around flexibility rather than long-term commitments. You can access participating fitness centres without locking yourself into a conventional monthly or annual gym membership."
  },
  {
    q: "Can I use different gyms with FitFare?",
    a: "Yes. FitFare is designed to give you access to multiple partnered fitness centres instead of restricting you to one location. This makes it especially useful when your routine, workplace, home location, or travel schedule changes."
  },
  {
    q: "What are Fit Credits?",
    a: "Fit Credits are prepaid credits that can be used to book eligible physical fitness services at FitFare partner gyms and studios. Your available balance and transactions can be managed directly through your FitFare account."
  },
  {
    q: "How do I check in at a fitness centre?",
    a: "Once you arrive at the centre for your booking, you can use the FitFare app to complete the QR-based check-in process. Your visit is then recorded digitally, making the experience simple for both you and the fitness centre."
  },
  {
    q: "What types of fitness activities can I find on FitFare?",
    a: "Depending on availability in your location, FitFare can help you discover different fitness experiences, including gyms, strength training, cardio, yoga, meditation, calisthenics, kickboxing, Zumba and other activities offered by participating centres."
  },
  {
    q: "Can I find fitness centres near my location?",
    a: "Yes. With your permission, FitFare can use your location while you’re using the app to show nearby fitness centres and their distance from you. Location access is optional, so you can still make bookings without enabling it."
  },
  {
    q: "Is FitFare suitable for people with irregular schedules or frequent travel?",
    a: "Yes. FitFare is designed for people whose fitness routine doesn’t always fit a fixed membership—whether because of work, travel, college, changing schedules, or simply wanting the freedom to train at different locations."
  },
  {
    q: "Why should I use FitFare instead of a traditional gym membership?",
    a: "A traditional membership usually ties you to one centre and a fixed membership period. FitFare is built around choice and actual usage: discover different fitness centres, book according to your schedule, access multiple locations, and avoid being locked into a long-term membership you may not fully use."
  }
];

const FAQSection = () => {
  const { theme } = useTheme();
  const isMoon = theme === "dark";

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className={`section-padding relative overflow-hidden px-4 sm:px-6 lg:px-0 transition-all duration-500
        ${isMoon ? "bg-slate-900 text-white" : "bg-white text-black"}
      `}
    >
      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-16 lg:mb-20"
        >
          <span className="text-primary font-bold text-[20px] sm:text-[22px] lg:text-[25px] uppercase tracking-[0.3em]">
            Frequently Asked Questions
          </span>

          <h2
            className={`text-[15px] sm:text-base lg:text-xl font-normal mt-6 leading-relaxed max-w-2xl mx-auto tracking-tight
              ${isMoon ? "text-gray-400" : "text-gray-600"}
            `}
          >
            Everything you need to know about FitFare. Can’t find the answer you're looking for?
            Feel free to contact our support team.
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500
                ${isMoon
                  ? "bg-slate-800/70 backdrop-blur-xl border border-slate-700 hover:shadow-xl"
                  : "bg-white border border-gray-200 shadow-sm hover:shadow-lg"}
              `}
            >
              {/* Subtle Shine */}
          

              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-4 sm:px-6 py-5 sm:py-6 text-left flex items-center justify-between gap-4"
              >
                <span
                  className={`text-[20px] lg:text-[18px] font-bold tracking-tight transition-colors duration-300
                    ${isMoon
                      ? open === i
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                      : open === i
                      ? "text-gray-900"
                      : "text-gray-800 group-hover:text-gray-900"}
                  `}
                >
                  {faq.q}
                </span>

                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors duration-300
                    ${isMoon
                      ? "bg-slate-800/70 border-slate-700 text-gray-300 hover:bg-slate-700/50"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}`}
                  aria-hidden="true"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className={`px-4 sm:px-6 pb-5 sm:pb-6 pt-4 text-[15px] leading-relaxed border-t
                        ${isMoon ? "text-gray-300 border-slate-700" : "text-gray-600 border-gray-200"}
                      `}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
