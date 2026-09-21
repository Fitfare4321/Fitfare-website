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
    question: "Can I get a gym day pass in Gurgaon without buying a membership?",
    answer:
      "Yes. FitFare lets you book a gym session in Gurgaon for one day and pay only for that session. There is no membership, joining fee or contract attached to the booking.",
  },
  {
    question: "Which is the best gym in Gurgaon for someone who travels for work?",
    answer:
      "The best gym is usually the one closest to where you are staying or working that week. Session booking lets you train near your hotel or office and skip the weeks you are away.",
  },
  {
    question: "How much does one gym session cost in Gurgaon?",
    answer:
      "Session prices vary by gym, location and time slot. Off-peak sessions cost less than evening peak hours, and the full price is shown before you confirm your booking.",
  },
  {
    question: "Can I book different gyms in Gurgaon on different days?",
    answer:
      "Yes. Your bookings are not tied to a single gym. You can train near your office on weekdays and near your home on weekends using the same account.",
  },
  {
    question: "Do I need to book in advance or can I walk in?",
    answer:
      "Booking through FitFare is recommended because the gym needs your session confirmed at the front desk. You can book just before arrival, but peak evening slots may have limited availability.",
  },
  {
    question: "Is a pay-per-use gym cheaper than an annual membership?",
    answer:
      "That depends on how often you train. Session booking costs less when attendance is uneven or seasonal. A steady annual membership can work out cheaper if you train five days a week consistently.",
  },
];

const quickBenefits = [
  {
    title: "No lock-in contract",
    description:
      "No joining fee, no notice period, and no cancellation charge. You pay for the session you actually train.",
    icon: ShieldCheck,
  },
  {
    title: "Pay per session",
    description:
      "Book a slot, train, and pay for that day. Your cost follows your attendance rather than the calendar.",
    icon: TimerReset,
  },
  {
    title: "Train across Gurgaon",
    description:
      "One account, many partner gyms. Choose a gym near your office, home, or hotel depending on where your day takes you.",
    icon: MapPin,
  },
  {
    title: "Off-peak pricing",
    description:
      "Sessions are cheaper when the gym is quieter. Book early morning or daytime slots to get better value.",
    icon: Clock3,
  },
];

const workoutFormats = [
  {
    title: "Strength Training",
    description:
      "Free weights, barbells, racks and plate-loaded machines for serious lifting routines and progressive strength gains.",
  },
  {
    title: "Cardio & HIIT",
    description:
      "Treadmills, cycles, rowers and circuit training options for shorter, higher-output sessions on busy days.",
  },
  {
    title: "Yoga & Mobility",
    description:
      "Recovery-focused sessions to improve flexibility, posture, breathing and movement quality between intense workouts.",
  },
  {
    title: "Functional & Combat",
    description:
      "Kettlebells, ropes, sleds, boxing and kickboxing classes that build agility, conditioning and athletic power.",
  },
  {
    title: "Group Classes",
    description:
      "Fixed-timetable coaching sessions in a motivating group setting, ideal for structured routines and accountability.",
  },
];

const processSteps = [
  {
    title: "Search your area",
    description:
      "Enter your sector, landmark or office address to see partner gyms near you with distance and opening hours.",
  },
  {
    title: "Compare what matters",
    description:
      "Check the equipment, class timetable, shower facilities, and busiest hours before you decide.",
  },
  {
    title: "Pick your slot",
    description:
      "Choose the date and time that fits your routine. Off-peak slots are often more affordable than prime-time evening sessions.",
  },
  {
    title: "Check in and train",
    description:
      "Show your booking at the front desk, confirm your session, and train without the hassle of long-term contracts.",
  },
];

const checklist = [
  "Distance: A gym more than 15 minutes away loses out to traffic and tiredness.",
  "Busiest hours: Visit when you usually train so you know how crowded it gets.",
  "Equipment: Count the racks and benches, not just the machines.",
  "Trainer credentials: Ask what certifications the staff hold.",
  "Hygiene: Look at the changing rooms and clean equipment before committing.",
  "Trial policy: A gym worth your time should let you train once before deciding.",
];

const Page = () => {
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
        name: "FitFare Gurgaon",
        description:
          "FitFare helps users book gym sessions across Gurgaon without annual memberships or lock-in contracts.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageSEO
        title="Best Gym in Gurgaon Without a Contract | FitFare"
        description="Book a gym session in Gurgaon without annual memberships or lock-in contracts. Compare gyms, choose your slot, and pay only for the session you train."
        canonical="https://fitfare.in/gurgaon"
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
                  <Sparkles size={14} /> Best Gym in Gurgaon
                </span>

                <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
                  Book the Best Gym in Gurgaon by the Session, Not the Year
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  Gurgaon has hundreds of gyms, but most ask for a full year of payment before you lift a single weight. FitFare changes that. Book a gym session, train, and pay only for the day you use it.
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
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Flexible citywide access</div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Pay only for the session</div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[28px] border border-slate-700 bg-slate-900/70 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-sm">
                  <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-5">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Gym Access</p>
                        <p className="mt-1 text-xl font-bold text-white">Gurgaon Session Booking</p>
                      </div>
                      <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">Flexible</div>
                    </div>

                    <div className="space-y-4">
                      {[
                        "No joining fee",
                        "No cancellation fee",
                        "No annual commitment",
                        "Book by area or landmark",
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
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Why FitFare fits the way Gurgaon actually works</h2>
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
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">How to find a gym near me in Gurgaon and book a session</h2>
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
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Workout centres in Gurgaon and the formats available</h2>
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
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Comparison</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Session booking compared with an annual membership</h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
              <div className="grid grid-cols-1 gap-px bg-slate-800 md:grid-cols-3">
                {[
                  ["Annual membership", "Full year in advance", "12 months, standard", "Common"],
                  ["Monthly subscription", "One month in advance", "Rolling, with notice", "Applies in some plans"],
                  ["FitFare session booking", "One session", "None", "None"],
                ].map(([label, upfront, lockIn, fee], index) => (
                  <div key={label} className="bg-slate-950/90 p-6">
                    <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.22em] ${index === 2 ? "text-blue-300" : "text-slate-400"}`}>
                      {label}
                    </p>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li><span className="font-medium text-white">Upfront cost:</span> {upfront}</li>
                      <li><span className="font-medium text-white">Lock-in:</span> {lockIn}</li>
                      <li><span className="font-medium text-white">Cancellation charge:</span> {fee}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Choose wisely</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">How to choose the best gym in Gurgaon</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                The gym you keep returning to is the one that works. Location, equipment and timing matter more than the brand name or marble in reception. A single booking helps you answer most of these questions without committing to a long-term plan.
              </p>

              <div className="mt-8 space-y-4">
                {checklist.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                      <Check size={14} />
                    </div>
                    <p className="text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-950/40">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">FitFare promise</p>
                  <h3 className="text-xl font-bold text-white">Train on your schedule</h3>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "No long-term commitment",
                  "Find a gym near your office or home",
                  "Pay for the session you actually use",
                  "Choose from multiple fitness formats",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                    <Star className="h-4 w-4 text-blue-300" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
                <p className="text-sm leading-7 text-slate-200">
                  “The right choice depends on your record, not your intention.”
                </p>
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
            <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Find a partner gym near you and book your slot today</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Train today and pay for today. There’s no need to lock yourself into a yearly contract when your schedule and your goals are flexible.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400">
                Find a Gym Near You <ArrowRight size={18} />
              </Link>
              <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-500">
                Explore More
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default Page;
