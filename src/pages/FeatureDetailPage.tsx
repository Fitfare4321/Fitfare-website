import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { features } from "@/data/features";
import { ArrowLeft, CheckCircle2, Zap, Shield, Target, Cpu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import PeriodTrackerCustomUI from "@/components/PeriodTrackerCustomUI";
import DynamicPrice from "@/components/DynamicPrice";
import ProfessionalDashboard from "@/components/ProfessionalDashboard";
import MultipleClubsUI from "@/components/MultipleGyms";
import NoContractsUI from "@/components/contract";
import PayAsYouGoUI from "@/components/PayAsGo";
const FeatureDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const feature = features.find((f) => f.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Feature Not Found</h1>
          {/* <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full"
          >
            Back to Home
          </button> */}
        </div>
      </div>
    );
  }

  const Icon = feature.icon;

  return (

    <div className={`min-h-screen overflow-hidden ${isDark ? "bg-[#0a0514] text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* Background elements */}
      <Navbar />
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{
            background: `radial-gradient(circle, ${feature.accent} 0%, transparent 70%)`,
            top: "-10%",
            right: "-10%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{
            background: `radial-gradient(circle, ${feature.accent} 0%, transparent 70%)`,
            bottom: "-10%",
            left: "-10%",
          }} 
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* <nav className="relative z-20 px-6 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back to Home
        </button>
      </nav> */}

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
        {feature.slug === "period-tracking-for-women" ? (
          <PeriodTrackerCustomUI isDark={isDark} accent={feature.accent} />
        ) : feature.slug === "dynamic-price-allocation" ? (
          <DynamicPrice />
        ) : feature.slug === "professional-dashboard-for-club-owners" ? (<ProfessionalDashboard />) :
          feature.slug === "access-to-multiple-clubs-across-cities" ? (<MultipleClubsUI isDark={isDark} />) :
            feature.slug === "no-long-term-contracts" ? (<NoContractsUI isDark={isDark} />) :
              feature.slug === "pay-as-you-go-pricing" ? (<PayAsYouGoUI isDark={isDark} />) : (
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  {/* Content Left */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-bold tracking-widest uppercase"
                      style={{
                        background: `${feature.accent}15`,
                        color: feature.accent,
                        border: `1px solid ${feature.accent}30`,
                      }}
                    >
                      <Zap size={12} className="animate-pulse" />
                      Innovation Feature
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-8">
                      {feature.title}
                    </h1>

                    <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 opacity-80 max-w-xl">
                      {feature.detailedDescription}
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className={`p-6 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"} shadow-sm`}>
                        <Shield className="mb-4" style={{ color: feature.accent }} />
                        <h3 className="font-bold mb-2">Secure & Reliable</h3>
                        <p className="text-sm opacity-70">Built with enterprise-grade security protocols.</p>
                      </div>
                      <div className={`p-6 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"} shadow-sm`}>
                        <Target className="mb-4" style={{ color: feature.accent }} />
                        <h3 className="font-bold mb-2">Precision Data</h3>
                        <p className="text-sm opacity-70">Powered by advanced analytics and real-time insights.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right side - Visual & Technicals */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative"
                  >
                    {/* Feature Card */}
                    <div
                      className={`relative rounded-3xl p-8 md:p-12 overflow-hidden border ${isDark ? "border-white/10" : "border-slate-200"}`}
                      style={{
                        background: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {/* Animated Icon Container */}
                      <motion.div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-10"
                        style={{
                          background: `${feature.accent}20`,
                          border: `1.5px solid ${feature.accent}40`,
                          boxShadow: `0 0 30px ${feature.accent}30`,
                        }}
                        animate={{
                          y: [-5, 5, -5],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon size={40} style={{ color: feature.accent }} />
                      </motion.div>

                      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        Key Benefits
                      </h2>

                      <ul className="space-y-6">
                        {feature.benefits.map((benefit, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-start gap-4"
                          >
                            <div className="mt-1">
                              <CheckCircle2 size={20} style={{ color: feature.accent }} />
                            </div>
                            <span className="text-lg font-medium opacity-90">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="mt-12 pt-8 border-t border-white/10">
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-6">
                          How It Works
                        </h3>
                        <div className="space-y-4">
                          {feature.howItWorks.map((step, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `${feature.accent}30`, color: feature.accent }}>
                                {i + 1}
                              </span>
                              <p className="text-sm opacity-80">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Floating Element */}
                    <motion.div
                      className={`absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 p-6 rounded-2xl border ${isDark ? "bg-white/10 border-white/20" : "bg-white border-slate-200"} shadow-2xl backdrop-blur-xl hidden md:block`}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Cpu className="mb-2" style={{ color: feature.accent }} />
                      <div className="font-bold text-xs uppercase tracking-tighter">Proprietary Tech</div>
                      <div className="text-[10px] opacity-60">Optimized for reliability</div>
                    </motion.div>
                  </motion.div>
                </div>
              )}
      </main>

      <footer className="relative z-10 py-12 text-center opacity-50 text-xs tracking-widest uppercase">
        © 2026 Fitfare Ecosystems • {feature.title}
      </footer>

    </div>
  );
};

export default FeatureDetailPage;
