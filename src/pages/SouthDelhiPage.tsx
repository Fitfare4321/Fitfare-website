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
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PageSEO from "@/components/PageSEO";

const faqItems = [
  {
    question: "What is FitFare?",
    answer:
      "FitFare is a flexible fitness platform that lets you discover and access partnered gyms and fitness centres without committing to a traditional long-term membership. Find a centre that suits you, book your workout, and pay based on the fitness services you actually use.",
  },
  {
    question: "How does FitFare work?",
    answer:
      "Simply create your FitFare account, explore available fitness centres near you, choose the service or session you want, complete your booking, and check in at the centre using FitFare. Your bookings and visits can all be managed through the app.",
  },
  {
    question: "Do I need to buy a monthly or yearly gym membership?",
    answer:
      "No. FitFare is built around flexibility rather than long-term commitments. You can access participating fitness centres without locking yourself into a conventional monthly or annual gym membership.",
  },
  {
    question: "Can I use different gyms with FitFare?",
    answer:
      "Yes. FitFare is designed to give you access to multiple partnered fitness centres instead of restricting you to one location. This makes it especially useful when your routine, workplace, home location, or travel schedule changes.",
  },
  {
    question: "What are Fit Credits?",
    answer:
      "Fit Credits are prepaid credits that can be used to book eligible physical fitness services at FitFare partner gyms and studios. Your available balance and transactions can be managed directly through your FitFare account.",
  },
  {
    question: "How do I check in at a fitness centre?",
    answer:
      "Once you arrive at the centre for your booking, you can use the FitFare app to complete the QR-based check-in process. Your visit is then recorded digitally, making the experience simple for both you and the fitness centre.",
  },
  {
    question: "What types of fitness activities can I find on FitFare?",
    answer:
      "Depending on availability in your location, FitFare can help you discover different fitness experiences, including gyms, strength training, cardio, yoga, meditation, calisthenics, kickboxing, Zumba and other activities offered by participating centres.",
  },
  {
    question: "Can I find fitness centres near my location?",
    answer:
      "Yes. With your permission, FitFare can use your location while you’re using the app to show nearby fitness centres and their distance from you. Location access is optional, so you can still make bookings without enabling it.",
  },
  {
    question: "Is FitFare suitable for people with irregular schedules or frequent travel?",
    answer:
      "Yes. FitFare is designed for people whose fitness routine doesn’t always fit a fixed membership—whether because of work, travel, college, changing schedules, or simply wanting the freedom to train at different locations.",
  },
  {
    question: "Why should I use FitFare instead of a traditional gym membership?",
    answer:
      "A traditional membership usually ties you to one centre and a fixed membership period. FitFare is built around choice and actual usage: discover different fitness centres, book according to your schedule, access multiple locations, and avoid being locked into a long-term membership you may not fully use.",
  },
];

const quickBenefits = [
  {
    title: "Skip the joining fee",
    description:
      "South Delhi rates without the twelve-month commitment. No upfront cost, no hidden lock-in, and no pressure to renew.",
    icon: ShieldCheck,
  },
  {
    title: "Gym one day at a time",
    description:
      "Book a single session, train, and pay only for the session you used. One day, one payment, no contract.",
    icon: TimerReset,
  },
  {
    title: "Studios and gyms",
    description:
      "Take a class on Tuesday and lift on Friday without holding two separate commitments to different spaces.",
    icon: Dumbbell,
  },
  {
    title: "Near every metro line",
    description:
      "Partner gyms across Saket, Hauz Khas, GK and Vasant Kunj give you a nearby option without needing to drive everywhere.",
    icon: MapPin,
  },
];

const workoutFormats = [
  {
    title: "Boutique studios",
    description:
      "Reformer Pilates, yoga, spin and functional formats are led, small in capacity and designed for a focused, guided session.",
  },
  {
    title: "Full-size gyms",
    description:
      "Free weights, racks, cardio machines and open access through the day for structured workouts and fixed lifting plans.",
  },
  {
    title: "Strength training",
    description:
      "The strongest option for users who want heavy lifts, wider free weight ranges and a serious training floor.",
  },
  {
    title: "Cardio & conditioning",
    description:
      "Short, efficient sessions that work well for busy weeknights, recovery weeks or when you want a focused calorie burn.",
  },
  {
    title: "Classes & coaching",
    description:
      "Choose a class, then train with weights later in the week, all under one flexible booking system.",
  },
];

const neighbourhoods = [
  "Saket and Malviya Nagar",
  "Hauz Khas and Green Park",
  "Greater Kailash and Defence Colony",
  "Vasant Kunj and Vasant Vihar",
  "Nehru Place and Kalkaji",
];

const processSteps = [
  {
    title: "Search by landmark",
    description:
      "Enter a colony name, market or metro station. Partner gyms appear in order of distance, with opening hours and session prices.",
  },
  {
    title: "Judge distance by time",
    description:
      "South Delhi traffic can make a short distance feel much longer. Check the route at the hour you plan to train.",
  },
  {
    title: "Compare a few options",
    description:
      "Look at equipment, class timings and busy hours before you decide. The price is shown before you confirm.",
  },
  {
    title: "Book and check in",
    description:
      "Confirm your session, arrive at the gym and show your booking at the front desk when you check in.",
  },
];

const whoBooks = [
  "Students from JNU, IIT Delhi and South Campus",
  "People on short stays or work trips",
  "Office workers with irregular hours",
  "Residents testing a new gym before committing",
  "People returning after a break and wanting flexible restart options",
];

const SouthDelhiPage = () => {
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
        name: "FitFare South Delhi",
        description:
          "FitFare helps users book single gym sessions across South Delhi without annual memberships or joining fees.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "South Delhi",
          addressRegion: "Delhi",
          addressCountry: "IN",
        },
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageSEO
        title="Best Gym in South Delhi Without Joining Fee | FitFare"
        description="Book a gym session in South Delhi without a joining fee or annual contract. Find the best gym by area and pay only for the session you train."
        canonical="https://fitfare.in/south-delhi"
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
                  <Sparkles size={14} /> Best Gym in South Delhi
                </span>

                <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
                  Book the Best Gym in South Delhi for Strength, Cardio and Fitness
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  South Delhi has some of the best-equipped gyms in the capital, but it also has the highest rates. FitFare offers another route. Book a single session at a partner gym, train, and pay only for that session.
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
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> No joining fee</div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> No annual commitment</div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Pay per session</div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[28px] border border-slate-700 bg-slate-900/70 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-sm">
                  <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-5">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Gym Access</p>
                        <p className="mt-1 text-xl font-bold text-white">South Delhi Session Booking</p>
                      </div>
                      <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">Flexible</div>
                    </div>

                    <div className="space-y-4">
                      {[
                        "No joining fee",
                        "No contract",
                        "No cancellation charge",
                        "Book by landmark or metro",
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
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Fitness centres in South Delhi without the joining fee</h2>
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
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">How to find a gym near me in South Delhi</h2>
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
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">By neighbourhood</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Best gyms in South Delhi by neighbourhood</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {neighbourhoods.map((area) => (
              <div key={area} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                  <MapPin size={18} />
                </div>
                <p className="text-sm leading-7 text-slate-200">{area}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900/80 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Formats</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Boutique studios or full-size gyms in South Delhi</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {workoutFormats.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    <Dumbbell size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Who books</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Who books single sessions at a gym in South Delhi</h2>
              <div className="mt-8 space-y-4">
                {whoBooks.map((item) => (
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
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">FitFare value</p>
                  <h3 className="text-xl font-bold text-white">Train near your route</h3>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Train near home on weekends and near work on weekdays",
                  "Use different gyms without a renewal date",
                  "Book sessions around traffic and metro access",
                  "Keep your workout flexible instead of locked into one plan",
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
            <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Find a partner gym near you and book your slot today</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Train today, pay for today, and decide about next week when it arrives. There’s no joining fee and no need to sign up for a full year upfront.
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

export default SouthDelhiPage;
