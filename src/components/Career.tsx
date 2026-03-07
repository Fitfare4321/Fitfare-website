import { motion } from "framer-motion";
import { useTheme } from "next-themes";
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
} from "lucide-react";
import { Download } from "lucide-react";
import { Info } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const jobs = [
 {
  id: "01",
  title: "Cloud Engineering Intern (2 Positions)",
  location: "Remote",
  type: "Internship",
  tag: "Engineering",
  tagColor: "from-blue-500 to-cyan-600",
  duration: "3 – 6 Months",
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
    "Cloud Security Basics",
    "Monitoring Tools (Prometheus / Grafana)"
  ],
  applyLink:
    "https://docs.google.com/forms/d/e/1FAIpQLSfa7KacK2QGmVITfGNxJtItnFjd7QyPzdNVkJAb_40b3a1kuA/viewform?usp=dialog",
},

 {
  id: "02",
  title: "Android Developer Intern (6 Positions)",
  location: "Remote",
  type: "Internship",
  tag: "Mobile",
  tagColor: "from-blue-500 to-cyan-500",
  duration: "3 – 6 Months",
  description:
    "Build the Android experience used by thousands of fitness enthusiasts across India.",
  skills: [
    "Java / Kotlin",
    "Android SDK",
    "Android Studio",
    "Jetpack Compose",
    "XML Layouts",
    "MVVM Architecture",
    "Retrofit",
    "REST API Integration",
    "Firebase",
    "SQLite / Room Database",
    "Material Design",
    "Git & GitHub",
    "Debugging & Performance Optimization"
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
  duration: "3 – 6 Months",
  description:
    "Own the growth engine. You'll build FitFare's gym-partner network.",
  skills: [
    "B2B Sales",
    "Partnership Strategy",
    "CRM Tools",
    "Go-to-Market Strategy",
    "Lead Generation",
    "Market Research",
    "Negotiation Skills",
    
    "Sales Pitching",
    "Business Communication",
    "Deal Closing"
  ],
  applyLink:
    "https://docs.google.com/forms/d/e/1FAIpQLSeVteDh5UV9YHpjIsIGUXKuP-d30X8JeOURlI4yA_ZT50ePEA/viewform?usp=dialog",
},
];
const benefits = [
  {
    icon: Rocket,
    title: "Accelerated Growth",
    desc: "Work shoulder-to-shoulder with founders and senior engineers. Skip the corporate ladder and grow 10× faster in a startup environment that moves at speed.",
    gradient: "from-orange-500 to-rose-500",
    glow: "group-hover:shadow-orange-500/20",
  },
  {
    icon: Sparkles,
    title: "Real-World Impact",
    desc: "Every line of code and every partnership deal directly shapes a product used by real users. Your contributions ship to production — no toy projects.",
    gradient: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: Users,
    title: "Elite Team Culture",
    desc: "Collaborate with a tight-knit team of engineers, designers, and business builders who are genuinely invested in each other's growth and the mission.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: Target,
    title: "Ownership From Day One",
    desc: "No busywork. From your first week you'll own features, drive decisions, and see the outcomes of your work directly reflected in user metrics.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
  },
];

const steps = [
  {
    num: "01",
    title: "Intro Call & Screening Round",
    desc: "A short introductory call with our team to understand your background, career interests, and alignment with FitFare’s mission and culture.",
    icon: CheckCircle,
  },
  {
    num: "02",
    title: "Assignment Review Round",
    desc: "You'll complete a short assignment related to the role. Our team will review your approach, problem-solving ability, and technical or business skills.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Founder / Final Interview",
    desc: "A final conversation with the founder or leadership team to discuss your work, ideas, and how you can contribute to FitFare’s growth.",
    icon: Users,
  },
  {
    num: "04",
    title: "Offer & Onboarding",
    desc: "If selected, we move forward with the offer and guide you through a smooth onboarding process to get you started quickly.",
    icon: Rocket,
  },
];
// ─── COMPONENT ───────────────────────────────────────────────────────────────

const CareerPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#080c14] text-white" : "bg-[#f7f8fc] text-gray-900"
        }`}
    >
      {/* ── Ambient Blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-48 right-[-10%] w-[700px] h-[700px] rounded-full blur-[120px] ${isDark ? "bg-blue-600/10" : "bg-blue-400/15"
            }`}
        />
        <div
          className={`absolute -bottom-48 left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] ${isDark ? "bg-purple-600/10" : "bg-purple-400/10"
            }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[150px] ${isDark ? "bg-indigo-500/5" : "bg-indigo-300/8"
            }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 space-y-36">
        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          
<h1
  className={`text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight mb-8 mt-10 ${
    isDark ? "text-white" : "text-gray-900"
  }`}
>
  Accelerate Your
  <br />
  <span className="relative inline-block">
    <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
      Career Growth
    </span>
    <span className="absolute -bottom-2 left-0 w-full h-[6px] bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-violet-500/30 blur-md" />
  </span>
</h1>

          <p
            className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-500"
              }`}
          >
            FitFare is reimagining how people discover, book, and access gyms
            across India. Join a small, ambitious team where your work ships
            fast and your impact is real.
          </p>
        </motion.div>

        {/* ════════════════════════════════════════
            WHY JOIN US
        ════════════════════════════════════════ */}
        <div>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4">
              Why FitFare
            </p>
            <h2
              className={`text-3xl md:text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              More than just an internship
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Hover glow layer */}
                <div
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]`}
                />

                <div
                  className={`relative h-full rounded-2xl p-6 border transition-all duration-400 ${isDark
                    ? "bg-slate-900/80 border-slate-800 group-hover:border-transparent"
                    : "bg-white border-gray-200 group-hover:border-transparent shadow-sm group-hover:shadow-lg"
                    }`}
                >
                  {/* Icon */}
                 <div className="mb-5">
  <item.icon
    size={28}
    className={`transition-colors duration-300 ${
      isDark
        ? "text-blue-400 group-hover:text-blue-300"
        : "text-blue-600 group-hover:text-blue-500"
    }`}
  />
</div>

                  <h3
                    className={`font-semibold text-base mb-2 ${isDark ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            OPEN ROLES
        ════════════════════════════════════════ */}
        <div>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4">
              Open Positions
            </p>
            <h2
              className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              Find your role
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              All positions are fully remote. We evaluate on ability, not
              credentials.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {jobs.map((job, index) => (
           <motion.div
  key={index}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.08 }}
  className={`group rounded-2xl p-8 md:p-10 transition-all duration-300
    ${isDark
      ? "border border-slate-800 hover:border-slate-700"
      : "border border-gray-200 hover:border-gray-300"
    } hover:-translate-y-1`}
>
  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
    
    {/* Left Column */}
    <div className="flex-1">
      
      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-xs tracking-wide uppercase">
        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
          {job.tag}
        </span>
        <span className={isDark ? "text-gray-500" : "text-gray-400"}>•</span>
        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
          {job.location}
        </span>
        <span className={isDark ? "text-gray-500" : "text-gray-400"}>•</span>
        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
          {job.duration}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`text-xl md:text-2xl font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {job.title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm md:text-base leading-relaxed mb-6 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {job.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-3">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className={`text-xs px-3 py-1 rounded-md border ${
              isDark
                ? "border-slate-700 text-gray-400"
                : "border-gray-200 text-gray-600"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

   {/* Apply Button */}
<div className="mt-8">
  <a
    href={job.applyLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
    bg-gradient-to-r from-blue-500 to-indigo-500
    text-white text-sm font-medium
    hover:from-blue-600 hover:to-indigo-600
    transition-all duration-300"
  >
    Apply Now
    <ArrowRight size={16} />
  </a>
</div>
  </div>
</motion.div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            HIRING PROCESS
        ════════════════════════════════════════ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4">
              How it Works
            </p>
            <h2
              className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              Our hiring process
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Simple, transparent, and respectful of your time.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connector line — desktop only */}
            <div
              className={`absolute top-12 left-[12.5%] right-[12.5%] h-px hidden md:block ${isDark
                ? "bg-gradient-to-r from-transparent via-slate-700 to-transparent"
                : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                }`}
            />

            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="group relative text-center"
                >
                  {/* Step circle */}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                    {/* Background ring */}
                    <div
                      className={`absolute inset-0 rounded-full border-2 transition-colors duration-400 ${isDark
                        ? "border-slate-800 group-hover:border-blue-500/40"
                        : "border-gray-200 group-hover:border-blue-300"
                        }`}
                    />
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-400" />
                    {/* Inner circle */}
                    <div
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-400 ${isDark
                        ? "bg-slate-800 group-hover:bg-blue-500/20"
                        : "bg-gray-100 group-hover:bg-blue-50"
                        }`}
                    >
                      <step.icon
                        size={24}
                        className={`transition-colors duration-400 ${isDark
                          ? "text-gray-400 group-hover:text-blue-400"
                          : "text-gray-500 group-hover:text-blue-500"
                          }`}
                      />
                    </div>
                   
                  </div>

                  <h3
                    className={`font-semibold text-sm mb-2 transition-colors duration-300 group-hover:text-blue-400 ${isDark ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${isDark ? "text-gray-500" : "text-gray-500"
                      }`}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
{/* ════════════════════════════════════════
    RESUME SHORTLISTING PREVIEW
════════════════════════════════════════ */}
<div className="max-w-6xl mx-auto">

  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-20"
  >
    <p className="text-xs uppercase tracking-[0.35em] text-blue-400 mb-4">
      Resume Guidelines
    </p>

    <h2
      className={`text-3xl md:text-5xl font-bold mb-6 ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      Create a resume we can evaluate quickly
    </h2>

    <p
      className={`${
        isDark ? "text-gray-400" : "text-gray-500"
      } max-w-2xl mx-auto`}
    >
      Our team reviews hundreds of applications. A clear and structured
      resume helps us understand your capabilities faster and ensures
      your profile receives proper evaluation.
    </p>
  </motion.div>

  <div className="grid lg:grid-cols-2 gap-20 items-center">

    {/* Resume Preview */}
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-2xl p-10 border ${
        isDark
          ? "border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800"
          : "border-gray-200 bg-white shadow-xl"
      }`}
    >

      <div className="space-y-6">

        {/* Name */}
        <div>
          <h3 className="text-lg font-semibold text-blue-500">
            Alex Johnson
          </h3>
         <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
  Software Developer • alex@email.com • github.com/alex
</p>
        </div>

        {/* Education */}
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
            Education
          </p>
         <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
  B.Tech in Computer Science — XYZ University
</p>
        </div>

        {/* Experience */}
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
            Experience
          </p>
       <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
  Frontend Intern — Built React dashboards used by 2k+ users.
</p>
        </div>

        {/* Projects */}
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
            Projects
          </p>
         <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
  Fitness Analytics App — React + Node.js
</p>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
            Skills
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">
              React
            </span>
            <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">
              Node.js
            </span>
            <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">
              TypeScript
            </span>
          </div>
        </div>

        {/* Download Button */}
       <div className="flex justify-center pt-6">
  <a
    href="/FitFare.docx"
    download
    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
    bg-gradient-to-r from-blue-500 to-indigo-500
    text-white text-sm font-medium
    hover:scale-105 hover:shadow-lg
    transition-all duration-300"
  >
    Download Resume Template
    <Download size={16} />

  </a>
 
</div>
<div>
 {/* Professional Note */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className={`mt-8 relative overflow-hidden rounded-xl border p-4 flex gap-3 items-start ${
    isDark
      ? "bg-slate-900/60 border-slate-800"
      : "bg-blue-50/70 border-blue-100"
  }`}
>

  {/* Icon */}
  <div
    className={`flex items-center justify-center w-9 h-9 rounded-lg ${
      isDark
        ? " text-blue-400"
        : " text-blue-600"
    }`}
  >
    <Info size={18} />
  </div>

  {/* Text */}
  <p
    className={`text-sm leading-relaxed ${
      isDark ? "text-gray-300" : "text-gray-700"
    }`}
  >
    <span className="font-semibold">Note:</span> Applicants should follow the
    provided resume template and ensure all relevant links such as{" "}
    <span className="font-medium">GitHub, portfolio, or project URLs</span>{" "}
    are properly <span className="font-medium">hyperlinked</span> before
    submitting the resume.
  </p>
</motion.div>
</div>

      </div>
    </motion.div>

    {/* Resume Sections */}
    <div className="grid gap-6">

      {[
        {
          title: "Education",
          desc: "Clearly mention your degree, university, and relevant coursework that builds your foundation.",
        },
        {
          title: "Experience",
          desc: "Include internships, work roles, or leadership positions where you delivered measurable impact.",
        },
        {
          title: "Projects",
          desc: "Showcase projects that demonstrate problem-solving ability and technical implementation.",
        },
        {
          title: "Skills",
          desc: "Highlight programming languages, frameworks, tools, and professional capabilities.",
        },
        {
          title: "Certifications",
          desc: "Add certifications or courses that strengthen your credibility and learning initiative.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className={`flex items-start gap-4 p-5 rounded-xl border transition ${
            isDark
              ? "border-slate-800 bg-slate-900/60"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-500">
            <CheckCircle size={18} />
          </div>

          <div>
            <h3
              className={`font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {item.title}
            </h3>

            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

  </div>
</div>
      </div>
    </section>
  );
};

export default CareerPage;