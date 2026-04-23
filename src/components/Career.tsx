import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  MapPin,
  Sparkles,
  Rocket,
  Users,
  Target,
  ArrowRight,
  Clock,
  CheckCircle,
  ChevronRight,
  Zap,
  Download,
  Info,
  Globe,
  Briefcase,
  GraduationCap,
  Trophy,
  Coffee,
  Heart,
  TrendingUp,
  ShieldCheck,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { jobsData } from "@/data/jobsData";

// ─── DATA ────────────────────────────────────────────────────────────────────

const internshipJobs = [
  {
    id: "01",
    title: "Cloud Engineering Intern (4 Positions)",
    location: "Remote",
    type: "Internship",
    tag: "Engineering",
    tagColor: "from-blue-500 to-cyan-600",
    duration: "3 Months",
    description:
      "Work closely with our engineering team to design, deploy, and manage scalable cloud infrastructure for FitFare’s platform.",
    skills: [
      "AWS / Azure / GCP",
      "Docker",
      "Kubernetes",
      "Linux",
      "CI/CD Pipelines",
      "Git & GitHub",
      "Infrastructure as Code (Terraform)",
    ],
    applyLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSde748LI0NAo9XDkh-YuzlqnE0Wu3ipJTwaANTIRXU_i4dpsA/viewform?usp=publish-editor",
  },

  {
    id: "02",
    title: "Android Developer Intern (8 Positions)",
    location: "Remote",
    type: "Internship",
    tag: "Mobile",
    tagColor: "from-blue-500 to-cyan-500",
    duration: "3 Months",
    description:
      "Build the Android experience used by thousands of fitness enthusiasts across India.",
    skills: [
      "Java / Kotlin",
      "Android SDK",
      "Jetpack Compose",
      "MVVM Architecture",
      "Firebase",
      "Git & GitHub",
    ],
    applyLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfa7KacK2QGmVITfGNxJtItnFjd7QyPzdNVkJAb_40b3a1kuA/viewform?usp=dialog",
  },
  {
    id: "03",
    title: "BDE Intern (5 Positions)",
    location: "Remote",
    type: "Internship",
    tag: "Business",
    tagColor: "from-emerald-500 to-teal-500",
    duration: "3 Months",
    description:
      "Own the growth engine. You'll build FitFare's gym-partner network.",
    skills: [
      "B2B Sales",
      "Partnership Strategy",
      "Lead Generation",
      "Negotiation Skills",
      "Business Communication",
    ],
    applyLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeVteDh5UV9YHpjIsIGUXKuP-d30X8JeOURlI4yA_ZT50ePEA/viewform?usp=dialog",
  },
];

const fullTimeJobs = jobsData.map(j => ({
  id: j.slug,
  title: j.title,
  location: j.location,
  type: "Full-time",
  tag: j.role,
  tagColor: "from-indigo-500 to-purple-600",
  duration: j.salary,
  description: j.overview,
  skills: j.mandatoryRequirements.slice(0, 4),
  isExternal: false,
  applyLink: `/careers/${j.slug}`
}));

const benefits = [
  {
    icon: Rocket,
    title: "Accelerated Growth",
    desc: "Work shoulder-to-shoulder with founders. Skip the corporate ladder and grow 10× faster in a high-speed startup environment.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Sparkles,
    title: "Real-World Impact",
    desc: "Every line of code and partnership shapes a product used by thousands. Your work isn't just a task; it's a legacy.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Elite Culture",
    desc: "Join a tight-knit team of high-performers who are genuinely invested in your personal and professional evolution.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Target,
    title: "Pure Ownership",
    desc: "No busywork. You own features, drive decisions, and see your impact directly reflected in user metrics from day one.",
    gradient: "from-orange-500 to-red-600",
  },
];

const perks = [
  { icon: Coffee, title: "Work From Anywhere", desc: "Remote-first culture for most roles." },
  { icon: Heart, title: "Health & Fitness", desc: "Access to partner gyms and health perks." },
  { icon: GraduationCap, title: "Learning Credits", desc: "We invest in your upskilling journey." },
  { icon: Globe, title: "Diverse Team", desc: "Collaborate with talent across the country." },
];

const steps = [
  {
    num: "01",
    title: "Initial Screening",
    desc: "A quick sync to align on mission, values, and expectations.",
    icon: CheckCircle,
  },
  {
    num: "02",
    title: "Skill Assessment",
    desc: "Showcase your expertise through a real-world project or task.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Deep Dive",
    desc: "Technical or strategic discussion with the core leadership team.",
    icon: Users,
  },
  {
    num: "04",
    title: "The Offer",
    desc: "Welcome to the mission! Time to build the future of fitness.",
    icon: Rocket,
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const CareerPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"jobs" | "internships">("jobs");

  return (
    <section className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${isDark ? "bg-[#05070a] text-white" : "bg-slate-50 text-slate-900"}`}>

      {/* ── Dynamic Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[160px] opacity-20 ${isDark ? "bg-blue-600/10" : "bg-blue-400/20"}`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 ${isDark ? "bg-purple-600/10" : "bg-purple-400/15"}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-40">

        {/* ════════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════════ */}
        <div className="text-center max-w-5xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[10px] font-black tracking-[0.2em] uppercase border border-blue-500/20 bg-blue-500/5 text-blue-400"
          >
            <Sparkles size={12} />
            We are hiring builders
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-10"
          >
            Join the <span className="text-blue-500">Fitness</span>
            <br />
            Revolution.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            FitFare is reimagining fitness accessibility. We're looking for ambitious minds to build the core infrastructure of the future.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { label: "Open Roles", val: "15+", icon: Briefcase },
              { label: "Cities", val: "5+", icon: MapPin },
              { label: "Team Size", val: "25+", icon: Users },
              { label: "Growth", val: "10x", icon: TrendingUp },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className={`mb-3 inline-flex w-12 h-12 items-center justify-center rounded-2xl transition-all duration-300 ${isDark ? "bg-slate-900 group-hover:bg-blue-600/20 text-slate-400 group-hover:text-blue-400" : "bg-white group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 shadow-sm"}`}>
                  <s.icon size={20} />
                </div>
                <div className="text-2xl font-black tracking-tight">{s.val}</div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════
            JOB LISTINGS WITH TABS
        ════════════════════════════════════════ */}
        <div id="open-positions" className="mb-40">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">Current Openings</h2>

            {/* Custom Tab Switcher */}
            <div className={`p-1.5 rounded-2xl flex gap-2 border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-lg"}`}>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`relative px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === "jobs" ? "text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
              >
                {activeTab === "jobs" && (
                  <motion.div layoutId="tab-bg" className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-lg shadow-blue-600/20" />
                )}
                Full-Time Roles
              </button>
              <button
                onClick={() => setActiveTab("internships")}
                className={`relative px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === "internships" ? "text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
              >
                {activeTab === "internships" && (
                  <motion.div layoutId="tab-bg" className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-lg shadow-blue-600/20" />
                )}
                Internships
              </button>
            </div>
          </div>

          <div className="grid gap-6 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid gap-6"
              >
                {(activeTab === "jobs" ? fullTimeJobs : internshipJobs).map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative p-8 md:p-12 rounded-[2rem] border transition-all duration-500 ${isDark ? "bg-slate-900/40 border-slate-800 hover:border-blue-500/30" : "bg-white border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-1"}`}
                  >
                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-blue-50 text-blue-600 border border-blue-100"}`}>
                            {job.tag}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-bold opacity-50 uppercase tracking-widest">
                            <MapPin size={12} /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-bold opacity-50 uppercase tracking-widest">
                            <Clock size={12} /> {job.duration}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-6 group-hover:text-blue-500 transition-colors">
                          {job.title}
                        </h3>

                        <p className={`text-base md:text-lg mb-8 leading-relaxed line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map(s => (
                            <span key={s} className={`px-3 py-1 rounded-lg text-[11px] font-bold border ${isDark ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-500"}`}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 w-full lg:w-auto shrink-0">
                        {activeTab === "jobs" ? (
                          <Link
                            to={job.applyLink}
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-blue-600 text-white font-black text-lg transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.03] active:scale-95 group-hover:bg-blue-700"
                          >
                            View Details
                            <ArrowRight size={20} />
                          </Link>
                        ) : (
                          <a
                            href={job.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border-2 border-blue-600 text-blue-600 font-black text-lg transition-all hover:bg-blue-600 hover:text-white"
                          >
                            Apply Now
                            <ArrowRight size={20} />
                          </a>
                        )}
                        <p className="text-center text-[10px] uppercase font-black tracking-widest opacity-40">
                          {activeTab === "jobs" ? "Full-Time Role" : "Limited Seats"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ════════════════════════════════════════
            PERKS & BENEFITS
        ════════════════════════════════════════ */}
        <div className="mb-40 grid lg:grid-cols-[1fr,1.5fr] gap-20 items-center">
          <div>
            <p className="text-xs uppercase font-black tracking-[0.4em] text-blue-500 mb-6">Built for builders</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">Why you'll love building here.</h2>
            <p className={`text-lg leading-relaxed mb-12 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              We're not just offering a desk; we're offering a launchpad. Join a culture that celebrates initiative, ownership, and obsession with quality.
            </p>

            <div className="grid gap-8">
              {perks.map((p, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? "bg-slate-900 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                    <p.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{p.title}</h4>
                    <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className={`group p-10 rounded-[2.5rem] border transition-all ${isDark ? "bg-slate-900/40 border-slate-800 hover:border-slate-700" : "bg-white border-slate-100 shadow-sm hover:shadow-xl"}`}>
                <div className={`mb-8 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${b.gradient} text-white shadow-lg`}>
                  <b.icon size={28} />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4">{b.title}</h3>
                <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            HIRING PROCESS
        ════════════════════════════════════════ */}
        <div className={`rounded-[3rem] p-12 md:p-24 overflow-hidden relative ${isDark ? "bg-slate-900/50 border border-slate-800" : "bg-white border border-slate-100 shadow-2xl"}`}>
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Our Hiring Journey</h2>
              <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>A transparent, human-centric process designed to respect your time and expertise.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-12 relative">
              {/* Connector */}
              <div className="absolute top-[52px] left-0 w-full h-[2px] bg-blue-500/10 hidden md:block" />

              {steps.map((s, i) => (
                <div key={i} className="relative z-10 text-center group">
                  <div className={`mx-auto w-24 h-24 rounded-3xl flex items-center justify-center mb-8 border-4 transition-all duration-300 ${isDark ? "bg-slate-900 border-[#05070a] group-hover:border-blue-500/50 group-hover:scale-110" : "bg-white border-slate-100 group-hover:border-blue-100 group-hover:scale-110 shadow-lg"}`}>
                    <s.icon size={32} className="text-blue-500" />
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-lg">{s.num}</span>
                  </div>
                  <h4 className="text-xl font-black tracking-tight mb-4">{s.title}</h4>
                  <p className={`text-sm leading-relaxed px-4 ${isDark ? "text-slate-500" : "text-slate-500"}`}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Blur */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        </div>

        {/* ════════════════════════════════════════
            RESUME GUIDELINES
        ════════════════════════════════════════ */}
        <div className="mt-40 grid lg:grid-cols-2 gap-20 items-center">
          <div className={`p-10 md:p-16 rounded-[3rem] border relative overflow-hidden ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-2xl"}`}>
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-3xl font-black tracking-tight text-blue-500 mb-2">Alex Johnson</h3>
                <p className="text-xs font-bold tracking-widest uppercase opacity-40">Software Developer • alex@email.com</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500/60">Education</p>
                  <p className="font-bold">B.Tech in Computer Science — XYZ University</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500/60">Experience</p>
                  <p className="font-bold">Frontend Intern — Built React dashboards used by 2k+ users.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  {["React", "TypeScript", "Tailwind", "Node.js"].map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-black border border-blue-500/20">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="pt-10 flex flex-col items-center gap-6">
                <a
                  href="/FitFare.docx"
                  download
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-black hover:scale-[1.02] transition-all shadow-xl shadow-blue-600/30"
                >
                  Download Template
                  <Download size={18} />
                </a>
                <div className="flex gap-3 items-start p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <Info size={18} className="text-blue-500 shrink-0" />
                  <p className="text-xs leading-relaxed opacity-60">
                    <span className="font-black text-blue-500">Pro Tip:</span> Hyperlink your GitHub and Portfolio URLs so we can see your amazing work instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">Make your profile stand out.</h2>
            <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              We review every application manually. A clean, structured resume helps us understand your impact faster.
            </p>

            <div className="grid gap-4">
              {[
                { t: "Measurable Impact", d: "Use numbers (e.g., 'Optimized performance by 40%')." },
                { t: "Clean Layout", d: "One page is usually plenty. Keep it scannable." },
                { t: "Relevant Skills", d: "Highlight the tech we actually use." },
                { t: "Your Passion", d: "Show us why you care about the fitness industry." },
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-2xl border transition-all ${isDark ? "bg-slate-900/30 border-slate-800 hover:border-slate-700" : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"}`}>
                  <div className="flex items-center gap-3 mb-1">
                    <CheckCircle size={18} className="text-emerald-500" />
                    <h4 className="font-bold">{item.t}</h4>
                  </div>
                  <p className="text-sm opacity-50 pl-7">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CareerPage;
