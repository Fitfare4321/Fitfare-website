import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Dumbbell,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PageSEO from "@/components/PageSEO";

const faqItems = [
  {
    question: "What are the best gyms in Noida?",
    answer:
      "That depends on your sector and your training style. Judge a gym on distance, equipment range, crowding at your usual hour and cleanliness. One session tells you more than a guided tour or an online review.",
  },
  {
    question: "Where can I find an affordable gym in Noida?",
    answer:
      "Residential sectors between 50 and 78 and the Greater Noida West belt usually carry lower rates than the corporate sectors. Booking by session removes the upfront cost from the decision, since you pay for single visits.",
  },
  {
    question: "Can I use a gym in Noida without a membership?",
    answer:
      "Yes. A FitFare booking covers one session at a partner gym. There is no joining fee, no contract and no notice period. You book the days you plan to train.",
  },
  {
    question: "Where can I get a gym day pass in Noida?",
    answer:
      "Partner gyms across the main sectors take single-session bookings. Search your sector or metro station on FitFare to see which locations have slots open and what each one charges.",
  },
  {
    question: "Are there gyms in Noida open early or late for shift workers?",
    answer:
      "Several partner gyms around Sector 62, Sector 63 and Film City run extended hours for shift staff. Opening hours appear on each listing, so you can filter before booking.",
  },
  {
    question: "Which sectors in Noida have partner gyms?",
    answer:
      "Coverage runs across the commercial sectors, the Expressway belt and the main residential blocks. Search your sector number to see partner gyms near you with current availability.",
  },
];

const quickBenefits = [
  {
    title: "Train at the best gym",
    description:
      "Partner gyms from Sector 18 to Greater Noida West give you access across the city without locking you into a plan.",
    icon: ShieldCheck,
  },
  {
    title: "Any shift, any hour",
    description:
      "Book slots that match your roster, whether you train early morning, midday, or late at night.",
    icon: Clock3,
  },
  {
    title: "Pay for the day",
    description:
      "One session, one payment, no recurring commitment. Your cost follows the day you actually train.",
    icon: TimerReset,
  },
  {
    title: "Beyond the society gym",
    description:
      "Access better racks, heavier weights and a wider range of equipment when your routine needs more than a basic setup.",
    icon: MapPin,
  },
];

const workoutFormats = [
  {
    title: "Strength Training",
    description:
      "Barbells, dumbbells, racks and plate-loaded machines for serious lifting sessions and progressive strength work.",
  },
  {
    title: "Cardio & Conditioning",
    description:
      "Treadmills, cycles, rowers and cross trainers that suit shorter visits and recovery weeks.",
  },
  {
    title: "Classes & Group Sessions",
    description:
      "Yoga, HIIT, dance and combat formats provide structure, variety and accountability in a group setting.",
  },
  {
    title: "One-to-One Coaching",
    description:
      "Personal training helps when your form needs correction or your training progress has stalled.",
  },
  {
    title: "Society Gym + Studio Combo",
    description:
      "Use your society gym on light days and book a partner studio when you need heavier equipment or a class.",
  },
];

const processSteps = [
  {
    title: "Search by sector",
    description:
      "Search by sector number, metro station or society name to find partner gyms close to where you are.",
  },
  {
    title: "Check the essentials",
    description:
      "Compare opening hours, equipment range and how busy the gym gets during your normal workout window.",
  },
  {
    title: "Book a time slot",
    description:
      "Choose the date and time that works for your shift and confirm the session before you arrive.",
  },
  {
    title: "Train and leave",
    description:
      "Show your booking at the front desk, train, and pay only for the session you used.",
  },
];

const sectors = [
  "Sector 18 and Film City",
  "Sector 62 and Sector 63",
  "The Noida Expressway, Sectors 125 to 137",
  "Residential Sectors 50 to 78",
  "Greater Noida West",
];

const NoidaPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const seoJsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "Place",
        name: "FitFare Noida",
        description:
          "FitFare helps users book gym sessions across Noida without annual memberships or lock-in contracts.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Noida",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageSEO
        title="Best Gyms in Noida Without a Contract | FitFare"
        description="Book a gym session in Noida without annual memberships or long contracts. Find the best gym by sector, shift, or area and pay only for the session you train."
        canonical="https://fitfare.in/noida"
        jsonLd={seoJsonLd}
      />

      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_45%),linear-gradient(180deg,#020817_0%,#0f172a_100%)]" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "28px 28px" }} />

          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
                  <Sparkles size={14} /> Best Gyms in Noida
                </span>

                <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
                  Find the Best Gyms in Noida for Workouts That Fit Your Schedule
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  Noida runs on sectors, shifts and long commutes. A gym membership bought in January assumes that none of it changes. FitFare works by the session, so you book a slot, train, and pay only for that day.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
                  >
                    Find a Gym Near You <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-500"
                  >
                    Join as Gym
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> No annual contract</div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Flexible shift-friendly booking</div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Pay only for the session</div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[28px] border border-slate-700 bg-slate-900/70 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-sm">
                  <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-5">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Gym Access</p>
                        <p className="mt-1 text-xl font-bold text-white">Noida Session Booking</p>
                      </div>
                      <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">Flexible</div>
                    </div>

                    <div className="space-y-4">
                      {[
                        "No joining fee",
                        "No long contract",
                        "No cancellation charge",
                        "Book by sector or metro",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/80 p-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                            <Check size={16} />
                          </div>
                          <span className="text-sm text-slate-200">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                      <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                        <p className="text-2xl font-bold text-white">1</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400">Session</p>
                      </div>
                      <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                        <p className="text-2xl font-bold text-white">0</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400">Contracts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Why it works</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Affordable gyms in Noida without the yearly commitment</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quickBenefits.map(({ title, description, icon: Icon }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900/80 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">How it works</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">How to find a gym near me in Noida</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Formats</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Training formats at workout centres in Noida</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {workoutFormats.map((workout) => (
              <div key={workout.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <Dumbbell size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">{workout.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{workout.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900/80 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">By area</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Best fitness centres in Noida by sector</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {sectors.map((sector) => (
                <div key={sector} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-center">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                    <MapPin size={18} />
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{sector}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Shift-friendly</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Training around Noida shift timings</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                Noida runs on shifts more than any other part of the region. BPO floors in Sector 62, media crews in Film City and hospital staff across the city work hours a standard gym plan ignores. Booking by session follows your roster instead of forcing you into a rigid membership plan.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-950/40">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">FitFare benefit</p>
                  <h3 className="text-xl font-bold text-white">Train on your schedule</h3>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "No long-term commitment",
                  "Book a slot around your workday",
                  "Switch gyms without a renewal date",
                  "Use a society gym on light days and a studio on heavy days",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                    <Star className="h-4 w-4 text-blue-300" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">FAQs</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Questions before you book</h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={faq.question} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-base font-medium text-white">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-300 transition ${openFaq === index ? "rotate-180" : ""}`} />
                  </button>

                  {openFaq === index && (
                    <div className="border-t border-slate-800 px-5 py-4 text-sm leading-7 text-slate-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-blue-500/20 bg-gradient-to-r from-blue-600/20 via-slate-900 to-slate-900 p-8 text-center shadow-2xl shadow-blue-950/30 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Start today</p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Find a partner gym in your sector and book your slot today</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Train today and pay for today. There is nothing signed, nothing renewed, and nothing locked in if your schedule changes again next week.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400">
                Find a Gym Near You <ArrowRight size={18} />
              </Link>
              <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-500">
                Book Your First Session
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default NoidaPage;
