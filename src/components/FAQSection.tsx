import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

const faqs = [
  {
    q: "How does the AI-powered workout system work?",
    a: "Our AI analyzes your fitness level, goals, available equipment, time constraints, and progress to create personalized workout plans. It continuously adapts based on your performance, feedback, and changing needs."
  },
  {
    q: "Can I use FitFare without any equipment?",
    a: "Absolutely! FitFare offers extensive bodyweight workout programs that require no equipment. You can also specify what equipment you have available, and the AI will customize workouts accordingly."
  },
  {
    q: "Is there a free trial available?",
    a: "Yes! All plans come with a 7-day free trial. You can explore all features and see if FitFare is right for you. No credit card required to start your trial."
  },
  {
    q: "How accurate is the progress tracking?",
    a: "Our tracking system uses advanced algorithms to monitor your progress across multiple metrics including strength gains, endurance improvements, body composition changes, and consistency patterns. Data is analyzed in real-time for maximum accuracy."
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel your subscription at any time with no penalties or fees. Your access will continue until the end of your current billing period."
  },
  {
    q: "Do you offer nutrition guidance?",
    a: "Yes! Pro and Elite plans include personalized nutrition recommendations, meal planning assistance, and macro tracking to complement your fitness routine."
  },
  {
    q: "Is FitFare suitable for beginners?",
    a: "Definitely! FitFare is designed for all fitness levels. Our AI starts by assessing your current fitness level and creates beginner-friendly programs that gradually progress as you improve."
  },
  {
    q: "How does the community support work?",
    a: "FitFare includes access to our supportive community where you can connect with other users, share progress, participate in challenges, and get motivation from like-minded individuals on similar fitness journeys."
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
