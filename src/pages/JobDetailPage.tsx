import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jobsData } from "@/data/jobsData";
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Currency, 
  Clock, 
  CheckCircle2, 
  Trophy,
  Rocket,
  Users,
  Target,
  Zap,
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const job = jobsData.find((j) => j.slug === jobId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobId]);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-sans">
        <div className="text-center">
          <h1 className="text-5xl font-black mb-6 tracking-tighter">Position Not Found</h1>
          <button
            onClick={() => navigate("/careers")}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const Icon = job.icon;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDark ? "bg-[#080c14] text-white" : "bg-[#f8fafc] text-slate-900"}`}>
      <Navbar />
      
      {/* ── Ambient Background Elements ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background: `radial-gradient(circle, ${job.accent} 0%, transparent 70%)`,
            top: "-10%",
            right: "-5%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{
            background: `radial-gradient(circle, ${job.accent} 0%, transparent 70%)`,
            bottom: "10%",
            left: "-10%",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-6 pt-24 pb-32 w-full">
        {/* ── Back Navigation ── */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/careers")}
          className={`group flex items-center gap-2 mb-12 text-sm font-semibold tracking-tight transition-all ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isDark ? "border-white/10 bg-white/5 group-hover:bg-white/10" : "border-slate-200 bg-white group-hover:bg-slate-50 shadow-sm"}`}>
            <ArrowLeft size={18} />
          </div>
          Back to Openings
        </motion.button>

        <div className="grid lg:grid-cols-[1fr,380px] gap-12 items-start">
          
          {/* ── Main Content ── */}
          <div className="space-y-16">
            
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${job.accent}20`, border: `1px solid ${job.accent}40` }}
                >
                  <Icon size={28} style={{ color: job.accent }} />
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border ${isDark ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-500 shadow-sm"}`}>
                  {job.role}
                </div>
              </div>

              <h1 className={`text-4xl md:text-6xl font-black leading-[1.1] tracking-tight mb-8 ${isDark ? "text-white" : "text-slate-900"}`}>
                {job.title}
              </h1>

              <p className={`text-xl leading-relaxed opacity-80 max-w-2xl font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {job.overview}
              </p>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-20">
              
              {/* Responsibilities */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-slate-900 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                    <Target size={22} />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">Key Responsibilities</h2>
                </div>
                
                <div className="grid gap-4">
                  {job.responsibilities.map((resp, i) => (
                    <div 
                      key={i} 
                      className={`group p-5 rounded-2xl border transition-all duration-300 flex gap-4 items-start ${isDark ? "bg-slate-900/40 border-slate-800 hover:border-slate-700" : "bg-white border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md"}`}
                    >
                      <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                        <CheckCircle2 size={14} />
                      </div>
                      <span className={`text-base font-medium leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Requirements */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-10"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-slate-900 text-purple-400" : "bg-purple-50 text-purple-600"}`}>
                    <Award size={22} />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">Skills & Requirements</h2>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className={`text-sm font-black uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Mandatory</h3>
                    <div className="flex flex-wrap gap-3">
                      {job.mandatoryRequirements.map((req, i) => (
                        <span key={i} className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${isDark ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"}`}>
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-sm font-black uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Preferred</h3>
                    <div className="flex flex-wrap gap-3">
                      {job.preferredRequirements.map((req, i) => (
                        <span key={i} className={`px-5 py-2.5 rounded-xl text-sm font-bold border border-dashed transition-all ${isDark ? "bg-transparent border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300" : "bg-white border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-700"}`}>
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Why Join */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`rounded-[2.5rem] p-10 md:p-14 border relative overflow-hidden ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-xl"}`}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-10">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                      <Rocket size={22} />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Why Join FitFare?</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    {job.whyJoin.map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2.5 transition-all group-hover:scale-150 ${isDark ? "bg-blue-500" : "bg-blue-600"}`} />
                        <p className={`text-base font-bold leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Visual decoration */}
                <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2`} style={{ backgroundColor: job.accent }} />
              </motion.section>

            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="sticky top-24 space-y-6">
            
            {/* Job Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`rounded-3xl p-8 border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-xl"}`}
            >
              <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                <Briefcase size={18} className="text-blue-500" />
                Job Summary
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                    <Currency size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Compensation</p>
                    <p className="font-bold text-lg">{job.salary}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                    <Clock size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Work Type</p>
                    <p className="font-bold text-lg">{job.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                    <MapPin size={18} className="text-rose-500" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Location</p>
                    <p className="font-bold text-lg leading-tight">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                    <Users size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Positions</p>
                    <p className="font-bold text-lg">{job.positions} {job.positions === 1 ? "Opening" : "Openings"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-800/10">
                <a 
                  href={job.applyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                    Apply for this Role
                    <Zap size={18} fill="currentColor" />
                  </button>
                </a>
                <p className={`text-[10px] text-center mt-4 uppercase tracking-[0.2em] font-bold ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Takes less than 2 minutes
                </p>
              </div>
            </motion.div>

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`rounded-3xl p-8 border ${isDark ? "bg-indigo-950/20 border-indigo-500/20" : "bg-indigo-50 border-indigo-100 shadow-sm"}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={20} className="text-indigo-500" />
                <h4 className="font-bold">Need Help?</h4>
              </div>
              <p className={`text-sm mb-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Have questions about the application process or the role?
              </p>
            <a 
  href="mailto:team.fitfare@gmail.com" 
  className="text-sm font-black text-indigo-500 hover:underline flex items-center gap-2"
>
  Contact Recruiting Team (team.fitfare@gmail.com)
  <ChevronRight size={14} />
</a>
            </motion.div>

          </aside>

        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default JobDetailPage;
