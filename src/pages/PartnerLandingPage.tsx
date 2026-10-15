import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  LayoutDashboard,
  QrCode,
  BadgePercent,
  ArrowUp,
} from "lucide-react";
import logo from "@/assets/blue-background-logo.png";
import heroImg from "@/assets/gym_interior_color_1790323279413.jpg";
import discoveryImg from "@/assets/get_discovered_color_1790323029540.jpg";
import partnerToolsImg from "@/assets/bento_manage_bookings.png";
import { GlassButton } from "@/components/ui/glass-button";
import PageSEO from "@/components/PageSEO";

/* ═══════════════════════════════════════════════════════════════════════════
   FitFare Partner Landing Page
   PRD: fitfare-partner-landing-page-prd.md
   Route: /for-partners
   ═══════════════════════════════════════════════════════════════════════════ */

// ── Fade-in wrapper ──
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Section wrapper ──
const Section = ({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`py-20 md:py-28 relative overflow-hidden ${className}`}
  >
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
      {children}
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────────
   PARTNER NAVBAR — Minimal header per PRD §3
   Logo → homepage  |  "For Partners" label  |  CTA → /partner-form
   ───────────────────────────────────────────────────────────────────────── */
const PartnerNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let prev = false;
    const handle = () => {
      const s = window.scrollY > 20;
      if (s !== prev) {
        prev = s;
        setScrolled(s);
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
        {/* Logo → FitFare homepage */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 md:h-10 md:w-10 overflow-hidden rounded-[0.8rem] shadow-lg shadow-[#305CDE]/10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-4deg]">
            <img
              src={logo}
              alt="FitFare"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-lg md:text-xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            FitFare
          </span>
          <span className="hidden sm:inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 ml-1 mt-0.5">
            For Partners
          </span>
        </Link>

        {/* Desktop Anchor Navigation */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3 py-1.5 shadow-inner">
          <a
            href="#benefits"
            className="px-3.5 py-1 text-xs font-semibold text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/[0.08]"
          >
            Benefits
          </a>
          <a
            href="#why-fitfare"
            className="px-3.5 py-1 text-xs font-semibold text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/[0.08]"
          >
            Why FitFare
          </a>
          <a
            href="#how-it-works"
            className="px-3.5 py-1 text-xs font-semibold text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/[0.08]"
          >
            Onboarding
          </a>
        </div>

        {/* Header CTA */}
        <Link to="/partner-form">
          <GlassButton
            size="default"
            contentClassName="flex items-center gap-2"
          >
            <span>Become a Partner</span>
            <ArrowRight size={15} className="text-current" />
          </GlassButton>
        </Link>
      </div>
    </motion.nav>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   SECTION 1 — HERO
   ───────────────────────────────────────────────────────────────────────── */
const PartnerHero = () => (
  <section
    id="overview"
    className="relative min-h-[90vh] md:min-h-screen flex items-center bg-black overflow-hidden pt-[72px]"
  >
    {/* Ambient glow */}
    <div
      className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full pointer-events-none transform-gpu opacity-60"
      style={{
        background:
          "radial-gradient(circle, rgba(48,92,222,0.18) 0%, rgba(48,92,222,0.04) 50%, transparent 70%)",
      }}
    />

    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center py-16 md:py-0">
      {/* Text */}
      <div className="order-1">
        <FadeIn>
          <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-[#305CDE] mb-6">
            For Partners
          </span>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1
            className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-white leading-[1.08] mb-6"
            style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
          >
            Your centre.
            <br />
            More possibilities.
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-2">
            Connect with people looking for a place to train.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed mb-10 max-w-lg">
            FitFare helps people discover and book fitness experiences at
            participating centres.
          </p>
        </FadeIn>

        <FadeIn delay={0.22}>
          <Link to="/partner-form">
            <GlassButton size="lg" contentClassName="flex items-center gap-3">
              <span>Become a Partner</span>
              <ArrowRight size={18} className="text-current" />
            </GlassButton>
          </Link>
        </FadeIn>
      </div>

      {/* Image */}
      <FadeIn delay={0.15} className="order-2">
        <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
          <img
            src={heroImg}
            alt="A modern fitness centre interior"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────────
   SECTION 2 — PARTNER BENEFITS (Asymmetric bento grid)
   ───────────────────────────────────────────────────────────────────────── */
const BenefitsSection = () => (
  <Section id="benefits" className="bg-black global-bg-grid">
    {/* Glow */}
    <div
      className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none transform-gpu"
      style={{
        background:
          "radial-gradient(circle, rgba(48,92,222,0.12) 0%, rgba(48,92,222,0.03) 50%, transparent 70%)",
      }}
    />

    <div className="text-center mb-16 md:mb-20">
      <FadeIn>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-5"
          style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
        >
          Built around your centre.
        </h2>
      </FadeIn>
      <FadeIn delay={0.08}>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Be discovered. Stay organised. Keep your team focused on fitness.
        </p>
      </FadeIn>
    </div>

    {/* Asymmetric grid: tall left, stacked right */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[1100px] mx-auto">
      {/* LEFT: Tall discovery card */}
      <FadeIn className="md:row-span-2">
        <div className="relative group h-full min-h-[420px] md:min-h-[560px] rounded-[1.75rem] border border-white/10 overflow-hidden flex flex-col justify-end p-7 md:p-9 transition-all duration-500 hover:border-white/25 hover:shadow-[0_0_40px_rgba(48,92,222,0.08)]">
          <img
            src={discoveryImg}
            alt="People discovering fitness"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
              Be discovered
            </h3>
            <p className="text-white/70 text-sm md:text-base font-medium leading-relaxed max-w-sm">
              Help people exploring fitness near you find your centre on
              FitFare.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* RIGHT TOP: Wide partner-tools card */}
      <FadeIn delay={0.1}>
        <div className="relative group min-h-[240px] md:min-h-[270px] rounded-[1.75rem] border border-white/10 overflow-hidden flex flex-col justify-end p-7 md:p-9 transition-all duration-500 hover:border-white/25 hover:shadow-[0_0_40px_rgba(48,92,222,0.08)]">
          <img
            src={partnerToolsImg}
            alt="Partner dashboard"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard size={18} className="text-[#305CDE]" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1.5 tracking-tight">
              Your partner app. Your dashboard.
            </h3>
            <p className="text-white/70 text-sm md:text-base font-medium leading-relaxed max-w-md">
              View and manage FitFare bookings in one place with the partner app
              and dashboard.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* RIGHT BOTTOM: Two compact cards side by side */}
      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {/* Zero commission */}
        <FadeIn delay={0.15}>
          <div className="relative group rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-7 flex flex-col justify-between min-h-[200px] transition-all duration-500 hover:border-white/25 hover:bg-white/[0.05]">
            <BadgePercent size={24} className="text-emerald-400 mb-4" />
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-white mb-1.5 tracking-tight">
                Zero commission
              </h3>
              <p className="text-white/55 text-xs md:text-sm font-medium leading-relaxed">
                FitFare does not charge commissions to fitness centres.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Payouts */}
        <FadeIn delay={0.2}>
          <div className="relative group rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-7 flex flex-col justify-between min-h-[200px] transition-all duration-500 hover:border-white/25 hover:bg-white/[0.05]">
            <Calendar size={24} className="text-[#305CDE] mb-4" />
            <div>
              <span className="text-3xl md:text-4xl font-black text-white block mb-0.5 tracking-tight">
                5th
              </span>
              <h3 className="text-lg md:text-xl font-extrabold text-white mb-1.5 tracking-tight">
                of every month
              </h3>
              <p className="text-white/55 text-xs md:text-sm font-medium leading-relaxed">
                Monthly payouts on a clear schedule.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </Section>
);

/* ─────────────────────────────────────────────────────────────────────────
   SECTION 3 — HOW FITFARE IS DIFFERENT (Comparison table)
   ───────────────────────────────────────────────────────────────────────── */
const comparisonRows = [
  {
    label: "Commercial terms",
    other: "Platform-specific rates and payment terms.",
    fitfare: "No commission charged to fitness centres.",
  },
  {
    label: "Payout schedule",
    other: "Timing follows each platform's billing cycle.",
    fitfare: "Monthly payouts on the 5th.",
  },
  {
    label: "Partner tools",
    other: "Partner dashboards available on some platforms.",
    fitfare: "Partner app and dashboard.",
  },
  {
    label: "Visitor check-in",
    other: "QR check-in available on some platforms.",
    fitfare: "QR check-in for FitFare visitors.",
  },
];

const ComparisonSection = () => (
  <Section id="why-fitfare" className="bg-[#060608]">
    {/* Subtle ambient glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none transform-gpu"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(48,92,222,0.1) 0%, rgba(48,92,222,0.02) 50%, transparent 70%)",
      }}
    />

    <div className="text-center mb-14 md:mb-20">
      <FadeIn>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-5"
          style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
        >
          How FitFare is different.
        </h2>
      </FadeIn>
      <FadeIn delay={0.08}>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Clear commercial terms. Practical tools for your centre.
        </p>
      </FadeIn>
    </div>

    {/* Desktop Table */}
    <FadeIn delay={0.12}>
      <div className="hidden md:block max-w-[900px] mx-auto rounded-[1.5rem] border border-white/10 overflow-hidden bg-white/[0.02] backdrop-blur-sm">
        {/* Header row */}
        <div className="grid grid-cols-3 border-b border-white/10">
          <div className="px-8 py-5 text-sm font-bold tracking-wider uppercase text-white/40">
            What matters
          </div>
          <div className="px-8 py-5 text-sm font-bold tracking-wider uppercase text-white/40 border-l border-white/10">
            Other platforms*
          </div>
          <div className="px-8 py-5 text-sm font-bold tracking-wider uppercase text-[#305CDE] border-l border-white/10 bg-[#305CDE]/[0.04]">
            FitFare
          </div>
        </div>

        {/* Data rows */}
        {comparisonRows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 ${
              i < comparisonRows.length - 1
                ? "border-b border-white/[0.06]"
                : ""
            }`}
          >
            <div className="px-8 py-5 text-sm font-semibold text-white/80">
              {row.label}
            </div>
            <div className="px-8 py-5 text-sm text-white/50 font-medium border-l border-white/[0.06]">
              {row.other}
            </div>
            <div className="px-8 py-5 text-sm text-white font-semibold border-l border-white/[0.06] bg-[#305CDE]/[0.04]">
              {row.fitfare}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>

    {/* Mobile stacked groups */}
    <div className="md:hidden space-y-4">
      {comparisonRows.map((row, i) => (
        <FadeIn key={i} delay={0.08 * i}>
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <span className="text-sm font-bold text-white">{row.label}</span>
            </div>
            <div className="px-5 py-3.5 border-b border-white/[0.04]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/35 block mb-1">
                Other platforms*
              </span>
              <span className="text-sm text-white/50 font-medium">
                {row.other}
              </span>
            </div>
            <div className="px-5 py-3.5 bg-[#305CDE]/[0.04]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#305CDE] block mb-1">
                FitFare
              </span>
              <span className="text-sm text-white font-semibold">
                {row.fitfare}
              </span>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>

    {/* Qualification */}
    <FadeIn delay={0.25}>
      <p className="text-center text-xs text-white/30 mt-8 max-w-2xl mx-auto font-medium leading-relaxed">
        *Terms and features vary by provider and agreement. The comparison does
        not imply that other platforms lack these tools.
      </p>
    </FadeIn>
  </Section>
);

/* ─────────────────────────────────────────────────────────────────────────
   SECTION 4 — ONBOARDING
   ───────────────────────────────────────────────────────────────────────── */
const onboardingSteps = [
  {
    step: "01",
    heading: "Tell us about your centre",
    body: "Share your contact details, centre name and location through the partner form.",
  },
  {
    step: "02",
    heading: "Connect with the FitFare team",
    body: "Review how the partnership works and the details needed to set up your centre.",
  },
  {
    step: "03",
    heading: "Get set up. Welcome visitors.",
    body: "Complete onboarding, get familiar with your partner tools and use QR check-in for FitFare arrivals.",
  },
];

const OnboardingSection = () => (
  <Section id="how-it-works" className="bg-black global-bg-grid">
    <div className="text-center mb-16 md:mb-20">
      <FadeIn>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-5"
          style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
        >
          From introduction to first&nbsp;check&#8209;in.
        </h2>
      </FadeIn>
      <FadeIn delay={0.08}>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Start with your centre details. Let's take the next step together.
        </p>
      </FadeIn>
    </div>

    {/* Three numbered cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1000px] mx-auto mb-10">
      {onboardingSteps.map((s, i) => (
        <FadeIn key={i} delay={0.1 * i}>
          <div className="group relative rounded-[1.75rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm p-7 md:p-8 flex flex-col min-h-[240px] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]">
            {/* Step number */}
            <span className="text-[3rem] md:text-[3.5rem] font-black text-white/[0.06] leading-none mb-4 tracking-tighter select-none">
              {s.step}
            </span>
            <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight leading-snug">
              {s.heading}
            </h3>
            <p className="text-white/55 text-sm font-medium leading-relaxed flex-1">
              {s.body}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>

    {/* Summary strip */}
    <FadeIn delay={0.3}>
      <div className="max-w-[800px] mx-auto rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] px-6 md:px-8 py-5 mb-12">
        <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/35 mb-3">
          Once onboarded
        </span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {[
            { icon: LayoutDashboard, label: "Partner app / dashboard" },
            { icon: QrCode, label: "QR check-in" },
            { icon: Calendar, label: "Monthly payouts on the 5th" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon size={16} className="text-[#305CDE] shrink-0" />
              <span className="text-sm text-white/70 font-medium">
                {item.label}
              </span>
              {i < 2 && (
                <span className="text-white/15 ml-3 hidden sm:inline">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>

    {/* Closing CTA */}
    <FadeIn delay={0.35}>
      <div className="text-center">
        <Link to="/partner-form">
          <GlassButton size="lg" contentClassName="flex items-center gap-3">
            <span>Become a Partner</span>
            <ArrowRight size={18} className="text-current" />
          </GlassButton>
        </Link>
      </div>
    </FadeIn>
  </Section>
);

/* ─────────────────────────────────────────────────────────────────────────
   FOOTER — Minimal & clean per PRD §3 & §5
   Reuses existing Privacy Policy, Terms of Service and Support links
   ───────────────────────────────────────────────────────────────────────── */
const PartnerFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black border-t border-white/10 text-white overflow-hidden pt-16 pb-12">
      {/* Background ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none transform-gpu opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(48,92,222,0.12) 0%, rgba(48,92,222,0.02) 50%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-2.5 mb-2 group">
              <div className="h-8 w-8 rounded-[0.7rem] overflow-hidden shadow-md shadow-[#305CDE]/10 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={logo}
                  alt="FitFare"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="text-lg font-black tracking-tight text-white"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                FitFare
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 ml-1">
                For Partners
              </span>
            </Link>
            <p className="text-white/40 text-xs font-medium">
              Fitness, Your Way. Partner with FitFare.
            </p>
          </div>

          {/* Quick links per PRD */}
          <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
            <Link
              to="/about-FitFare"
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all whitespace-nowrap"
            >
              About Us
            </Link>
            <Link
              to="/privacy-policy"
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all whitespace-nowrap"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all whitespace-nowrap"
            >
              Support
            </Link>
          </div>

          {/* Back to top */}
          <div className="flex items-center justify-center">
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 flex items-center justify-center text-white/80 hover:text-white transition-all shadow-lg hover:shadow-[#305CDE]/20"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-white/35 text-[11px] font-medium tracking-wider uppercase">
            © 2026 FitFare. All rights reserved.
          </p>
          <p className="text-white/30 text-[11px] font-medium">
            Commercial terms & payouts subject to partner agreement.
          </p>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   PAGE COMPONENT
   ───────────────────────────────────────────────────────────────────────── */
const PartnerLandingPage = () => {
  // Mouse-follow grid glow (reused from Index.tsx)
  useEffect(() => {
    let rafId: number | null = null;
    let lastX = -1000;
    let lastY = -1000;
    let grids: HTMLElement[] = [];

    const refreshGrids = () => {
      grids = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".global-bg-grid, .footer-bg-grid"
        )
      );
    };
    refreshGrids();
    window.addEventListener("resize", refreshGrids, { passive: true });

    const updateVisibleGrids = () => {
      rafId = null;
      const vh = window.innerHeight;
      for (let i = 0; i < grids.length; i++) {
        const grid = grids[i];
        const rect = grid.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= vh) {
          grid.style.setProperty("--mouse-x", `${lastX - rect.left}px`);
          grid.style.setProperty("--mouse-y", `${lastY - rect.top}px`);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(updateVisibleGrids);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", refreshGrids);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Hash scroll support for section anchors
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <PageSEO
        title="FitFare for Partners | Grow Your Fitness Centre"
        description="Partner with FitFare — zero commission, monthly payouts, partner app and QR check-in. Help people discover your fitness centre."
        canonical="https://fitfare.in/for-partners"
      />

      <PartnerNavbar />

      <main className="relative z-10 w-full bg-black">
        <PartnerHero />
        <BenefitsSection />
        <ComparisonSection />
        <OnboardingSection />
      </main>

      <PartnerFooter />
    </div>
  );
};

export default PartnerLandingPage;
