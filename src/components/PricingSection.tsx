import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Pay As You Go",
    price: "₹199",
    period: "/session",
    description: "Perfect for flexible training.",
    features: [
      "Access to any gym",
      "Pay only when you workout",
      "No monthly commitment",
      "Instant booking",
    ],
    buttonText: "Book Now",
    popular: false,
  },
  {
    name: "Elite Membership",
    price: "₹2499",
    period: "/month",
    description: "Unlimited access for serious gains.",
    features: [
      "Unlimited gym access",
      "All partner gyms included",
      "Free personal training session",
      "Priority support",
      "Nutrition guide",
    ],
    buttonText: "Get Started",
    popular: true,
  },
  {
    name: "Corporate",
    price: "Custom",
    period: "",
    description: "Wellness solutions for teams.",
    features: [
      "Team dashboard",
      "Usage analytics",
      "Employee wellness events",
      "Dedicated account manager",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">
            Flexible Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mt-3 mb-4">
            Simple Plans for <span className="text-blue-500">Everyone</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Whether you want to drop in occasionally or train everyday, we have a plan for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-2xl flex flex-col ${plan.popular
                  ? "bg-gradient-to-b from-blue-900/50 to-slate-900 border border-blue-500/50 shadow-xl shadow-blue-500/10"
                  : "bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 backdrop-blur-sm"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-slate-400 text-lg">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="text-blue-400 shrink-0 mt-0.5" size={18} />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
                    : "bg-slate-700 hover:bg-slate-600 text-white hover:text-white"
                  }`}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
