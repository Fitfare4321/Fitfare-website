import { motion } from "framer-motion";
import { Award, CheckCircle2, CreditCard, ShieldAlert } from "lucide-react";
import { useTheme } from "next-themes";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const sections = [
  {
    icon: CheckCircle2,
    title: "User bookings",
    text:
      "The cancellation window for every booking is shown at checkout and in the booking details. Cancellations within the allowed time window are eligible for a refund. No-shows and late cancellations may be non-refundable.",
  },
  {
    icon: CreditCard,
    title: "Refunds",
    text:
      "Refunds are usually returned as Fit Credits to the user account. If a monetary refund is due, it is sent back to the original payment method and follows the payment gateway timeline, usually 5–7 working days.",
  },
  {
    icon: ShieldAlert,
    title: "Gym cancellations",
    text:
      "If a partner gym cancels or cannot honour a confirmed booking, we refund the full amount or credit for that booking. We also review repeated partner cancellations, which may affect payout eligibility and platform standing.",
  },
  {
    icon: Award,
    title: "Disputes and support",
    text:
      "If you need help, email collaborations@fitfare.in with your booking ID and date, or call +91 7666400518. We review requests within a reasonable business period and aim to resolve them fairly.",
  },
];

const CancellationRefundsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-3xl border p-8 shadow-2xl shadow-slate-950/20 ${
            isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white"
          }`}
        >
          <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
            Refund policy
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Cancellations, refunds, and settlements
          </h1>

          <p className={`mt-5 max-w-3xl text-base leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            These terms explain how bookings are cancelled, how refunds are issued, and how partner settlements are adjusted when a session cannot be honoured or a booking is disputed.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sections.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl border p-6 ${
                isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white"
              }`}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Icon size={22} />
              </div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className={`mt-3 text-sm leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className={`mt-12 rounded-2xl border p-6 ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"}`}>
          <h3 className="text-xl font-bold">Need help?</h3>
          <p className={`mt-3 text-sm leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Email <a href="mailto:collaborations@fitfare.in" className="text-blue-400 underline">collaborations@fitfare.in</a> with your booking ID and date, or call <a href="tel:+917666400518" className="text-blue-400 underline">+91 7666400518</a>.
          </p>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default CancellationRefundsPage;
