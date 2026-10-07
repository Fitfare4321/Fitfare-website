import React, { useState, useEffect } from "react";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Smartphone,
  Building2,
  Globe,
  Share2,
  Clock,
  Trash2,
  CheckCircle2,
  ChevronRight,
  ArrowUp,
  Printer,
  Copy,
  Check,
  Phone,
  Mail,
  ExternalLink,
  Info,
  Scale,
  Users,
  AlertCircle
} from "lucide-react";
import GlassButton from "@/components/ui/glass-button";
import PageSEO from "@/components/PageSEO";

const TOC_ITEMS = [
  { id: "who", label: "1. Who we are & contact", short: "Contact" },
  { id: "overview", label: "2. At-a-glance", short: "Overview" },
  { id: "user", label: "3. Part A — FitFare user app", short: "User App" },
  { id: "partner", label: "4. Part B — FitFare Partner app", short: "Partner App" },
  { id: "website", label: "5. Part C — fitfare.in website", short: "Website" },
  { id: "purposes", label: "6. How we use data", short: "Data Use" },
  { id: "sharing", label: "7. Sharing & service providers", short: "Sharing" },
  { id: "retention", label: "8. Retention", short: "Retention" },
  { id: "deletion", label: "9. Account deletion", short: "Deletion" },
  { id: "security", label: "10. Security", short: "Security" },
  { id: "rights", label: "11. Your rights (DPDP) & grievance", short: "Rights & DPDP" },
  { id: "children", label: "12. Children", short: "Children" },
  { id: "transfers", label: "13. International transfers", short: "Transfers" },
  { id: "datasafety", label: "14. Play “Data safety” mapping", short: "Google Play" },
  { id: "appprivacy", label: "15. Apple App Privacy mapping", short: "Apple iOS" },
  { id: "changes", label: "16. Changes", short: "Changes" },
  { id: "contact", label: "17. Contact", short: "Final Contact" },
];

const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("who");
  const [copied, setCopied] = useState<boolean>(false);
  const [showMobileTOC, setShowMobileTOC] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Scrollspy
      const sections = TOC_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
      setShowMobileTOC(false);
    }
  };

  const copyPageUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderBadge = (val: string) => {
    const lower = val.toLowerCase();
    if (lower.startsWith("yes")) {
      return (
        <span className="inline-flex items-center gap-2 text-emerald-400 font-medium tracking-wide">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
          {val}
        </span>
      );
    }
    if (lower.startsWith("no")) {
      return (
        <span className="inline-flex items-center gap-2 text-slate-500 font-medium tracking-wide">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
          {val}
        </span>
      );
    }
    if (lower.includes("optional")) {
      return (
        <span className="inline-flex items-center gap-2 text-amber-400 font-medium tracking-wide">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
          {val}
        </span>
      );
    }
    if (lower.includes("required")) {
      return (
        <span className="inline-flex items-center gap-2 text-[#D9A84E] font-medium tracking-wide">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D9A84E]"></div>
          {val}
        </span>
      );
    }
    return <span>{val}</span>;
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-[#D9A84E]/30 selection:text-white">
      <PageSEO
        title="FitFare — Privacy Policy | Data Protection & Privacy Rights"
        description="FitFare Privacy Policy covering the FitFare user app, FitFare Partner app, and fitfare.in website. Transparent data collection, DPDP compliance, and Apple/Google Play privacy disclosures."
        canonical="https://fitfare.in/privacy-policy"
      />

      {/* Back Button */}
      <div className="fixed top-6 left-6 sm:top-8 sm:left-8 z-[100]">
        <Link to="/">
          <GlassButton size="sm" className="flex items-center gap-2">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Home
            </span>
          </GlassButton>
        </Link>
      </div>

      
      <div className="min-h-screen bg-black flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <div className="lg:w-[40%] xl:w-[35%] lg:fixed lg:inset-y-0 lg:left-0 flex items-center justify-center bg-black relative overflow-hidden z-10">
          <m.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 z-0 flex items-center justify-center"
          >
            {/* The 4k Statue Background */}
            <img src="/privacy-statue-4k.jpg" alt="Focus" className="absolute inset-0 w-full h-full object-cover object-[70%_20%] opacity-50" />
            
            {/* FOCUS Text layered between image and gradient */}
            <div className="absolute inset-y-0 right-4 lg:right-8 xl:right-12 flex items-center justify-center z-10 pointer-events-none mix-blend-screen opacity-30">
               <span className="[writing-mode:vertical-rl] text-[12vh] sm:text-[14vh] font-sans font-black text-white tracking-[0.4em] uppercase">
                 Focus
               </span>
            </div>

            {/* Darker gradient on the left side to contrast with text, and a fade-to-black on the right edge to blend seamlessly with the right column */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          </m.div>
          <div className="relative z-20 p-8 lg:p-12 xl:p-16 flex flex-col justify-end w-full h-full min-h-[60vh] lg:min-h-0 pl-16 sm:pl-20">
             <m.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="relative max-w-xs"
             >
                
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-serif font-black text-white tracking-tight leading-none mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
                  Privacy<br />Policy
                </h1>
                <p className="text-white/50 tracking-[0.2em] text-xs uppercase font-medium">FitFare Legal / 2026</p>
             </m.div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-[60%] xl:w-[65%] lg:ml-auto bg-black min-h-screen relative z-0">
          
          <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20 pt-20 lg:pt-32 pb-32 relative z-10">
            <div className="flex flex-col">
              {/* 1. Who we are & how to contact us */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="who" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">01</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Who we are &amp; how to contact us` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Who we are &amp; how to contact us` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                FitFare operates a fitness marketplace. Users discover gyms and studios, book sessions, and manage prepaid <strong className="text-white">Fit Credits</strong>. Partner gyms list their centres, manage bookings and attendance, and receive payouts.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm mt-4">
                  <thead>
                    <tr className="border-b border-white/20 text-white font-medium text-xl text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <th className="pb-6 pr-4 font-semibold align-bottom">Purpose</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Privacy, data requests, deletion, grievance</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">
                        <a href="mailto:support@fitfare.in" className="text-blue-400 hover:underline font-medium break-all">
                          support@fitfare.in
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">General support</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">
                        <a href="mailto:support@fitfare.in" className="text-blue-400 hover:underline font-medium break-all">
                          support@fitfare.in
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Phone</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">
                        <a href="tel:+917666400518" className="text-[#D9A84E] hover:underline font-medium">
                          +91 7666400518
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
                </div>
              </div>
            </m.div>

            {/* 2. At a glance */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="overview" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">02</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `At a glance — what each product collects` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `At a glance — what each product collects` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm mt-4">
                  <thead>
                    <tr className="border-b border-white/20 text-white font-medium text-xl text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <th className="pb-6 pr-4 font-semibold align-bottom">Data</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">User app</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Partner app</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Website</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Name, phone, email</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Only if you submit a form</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Gender, date of birth</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (optional profile)")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Profile / centre photos</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors"><strong className="text-slate-200">No</strong> (user app has no profile photo)</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (centre & KYC images)")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Location</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (with permission)")}</td>
                      <td className="py-3 px-5 text-slate-300">Centre address only</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Government ID / PAN / business docs</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (KYC)")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Bank account details</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (payouts)")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Payment card / UPI credentials</td>
                      <td className="py-3 px-5 text-slate-300">No — handled by Razorpay</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Push notification device ID</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Crash / diagnostics</td>
                      <td className="py-3 px-5 text-slate-300">Basic app logs</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Standard website logs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-12 flex justify-center">
                <div className="relative group cursor-default">
                  {/* Subtle animated ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D9A84E]/0 via-[#D9A84E]/20 to-[#D9A84E]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 rounded-full"></div>
                  
                  {/* Glass pill */}
                  <div className="relative flex items-center gap-4 px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-white/[0.08] bg-black/40 shadow-2xl backdrop-blur-md overflow-hidden">
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out"></div>
                    
                    <span className="text-slate-300 text-sm sm:text-base font-medium tracking-wide relative z-10">
                      We do not sell personal data and we do not use your data for third-party advertising.
                    </span>
                  </div>
                </div>
              </div>
                </div>
              </div>
            </m.div>

            {/* 3. Part A — FitFare user app */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="user" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">03</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Part A — FitFare user app` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Part A — FitFare user app` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <p className="text-slate-300 text-sm">
                Applies to the FitFare user app on <strong className="text-white">iOS and Android</strong>.
              </p>

              {/* A1 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A1.</span> Account &amp; profile
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li><strong className="text-white">Name, phone number, email</strong> — to create your account, confirm bookings, and contact you about a booking. Email on your profile is for account and booking contact; it is not a separate login method unless you use Google or Apple Sign-In.</li>
                  <li><strong className="text-white">Gender</strong> — collected during onboarding and editable later; used to personalise recommendations and filter centres with gender-specific access.</li>
                  <li><strong className="text-white">Date of birth</strong> — optional; for age eligibility (18+) and personalisation.</li>
                  <li><strong className="text-white">Profile photo</strong> — <strong className="text-rose-300">not collected</strong> in the user app.</li>
                  <li><strong className="text-white">City and preferred activities</strong> — to personalise discovery.</li>
                </ul>
              </div>

              {/* A2 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A2.</span> Sign-in
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>You can sign in with a one-time code sent to your phone, with <strong className="text-white">Google Sign-In</strong>, or with <strong className="text-white">Sign in with Apple</strong> on iOS.</li>
                  <li>Sign-in is provided by <strong className="text-white">Google (Firebase)</strong> and <strong className="text-white">Apple</strong>.</li>
                  <li>If you use Google or Apple Sign-In, we may receive your name, email, and (for Google) profile photo when you share them. <strong className="text-white">We never receive or store your Google or Apple password.</strong></li>
                </ul>
              </div>

              {/* A3 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A3.</span> Location
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>With your permission, we use your <strong className="text-white">foreground</strong> location to show nearby gyms and distance while you use the app.</li>
                  <li>We do <strong className="text-white">not</strong> request background location. Booking works without location access.</li>
                  <li>You can turn location off anytime in device settings. We do not sell or share your location with advertisers.</li>
                </ul>
              </div>

              {/* A4 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A4.</span> Bookings &amp; check-in
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Centre, service, date and time, quantity, amount, payment method, and booking status.</li>
                  <li>Check-in / attendance records when you visit.</li>
                  <li>The Partner gym you booked receives only the details needed to honour your visit (see <button onClick={() => scrollTo("sharing")} className="text-blue-400 underline font-medium break-all">Sharing</button>).</li>
                </ul>
              </div>

              {/* A5 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A5.</span> Fit Credits
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Your Fit Credit balance, expiry dates, amounts held for a booking, and transaction history.</li>
                  <li>Fit Credits are a <strong className="text-white">prepaid balance used only to book physical visits</strong> at Partner gyms and studios (on-site services). They are not used to unlock digital content, subscriptions, or in-app features unrelated to a Partner visit.</li>
                  <li>If you transfer credits, we use the phone number or email you enter to find the recipient’s FitFare account and show their display name. Both sides get a transaction record and may get a notification.</li>
                </ul>
              </div>

              {/* A6 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A6.</span> Favourites, reviews &amp; activity
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Saved centres, ratings and reviews (shown publicly with your display name), and search/browse activity used to run and improve discovery.</li>
                </ul>
              </div>

              {/* A7 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A7.</span> Payments
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Payments for Partner bookings and Fit Credit top-ups are processed by <strong className="text-white">Razorpay</strong>.</li>
                  <li>These payments are for <strong className="text-white">physical fitness services delivered at Partner venues</strong> (or prepaid credit redeemable only for those services). They are not purchases of digital goods or unlockable content inside the app.</li>
                  <li>FitFare keeps payment confirmation details such as amount, order/payment id, and status.</li>
                  <li><strong className="text-white">Card numbers, CVV, UPI PIN, and net-banking passwords are never stored by FitFare.</strong></li>
                </ul>
              </div>

              {/* A8 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A8.</span> Notifications
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>We store a push notification device ID linked to your account for transactional alerts (for example booking confirmed or Fit Credits received).</li>
                  <li>It is removed when you log out or delete your account.</li>
                  <li>You can turn notifications off in device settings; bookings still work.</li>
                </ul>
              </div>

              {/* A9 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A9.</span> Camera &amp; photos
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li><strong className="text-white">Camera</strong> — only to scan a check-in QR code. We do not record video.</li>
                  <li><strong className="text-white">Photos / photo library</strong> — not used in the user app. We do not request photo-library access for a profile picture.</li>
                </ul>
              </div>

              {/* A10 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A10.</span> Device &amp; support
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Basic device and app information (for example device type, OS, app version) and error logs for reliability and security.</li>
                  <li>Some non-sensitive data may be stored on your device to make the app open faster. Clearing app data removes it.</li>
                  <li>Support messages and screenshots you send us.</li>
                </ul>
              </div>

              {/* A11 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-blue-400/80 font-mono text-sm tracking-widest">A11.</span> Permissions — user app
                </h3>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-left text-sm mt-4">
                    <thead>
                      <tr className="border-b border-white/20 text-white font-medium text-xl text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <th className="pb-6 pr-4 font-semibold align-bottom">Permission</th>
                        <th className="pb-6 pr-4 font-semibold align-bottom">Why</th>
                        <th className="pb-6 pr-4 font-semibold align-bottom">Required?</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-200">
                      <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Internet</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Connect to FitFare</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Required")}</td>
                      </tr>
                      <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Location (foreground)</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Show nearby gyms and distance</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Optional")}</td>
                      </tr>
                      <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Camera</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">QR check-in</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Required")}</td>
                      </tr>
                      <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Photos / media</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Not requested in the user app</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      </tr>
                      <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Notifications</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Booking and Fit Credit alerts</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Optional")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-slate-400 text-xs italic">
                  We do <strong className="text-white">not</strong> request SMS inbox, call logs, contacts, or microphone access in the user app.
                </p>
              </div>
                </div>
              </div>
            </m.div>

            {/* 4. Part B — FitFare Partner app */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="partner" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">04</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Part B — FitFare Partner app` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Part B — FitFare Partner app` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <p className="text-slate-300 text-sm">
                Applies to the FitFare Partner app used by gym and studio owners/operators. Partners must be 18+ and represent a legitimate business.
              </p>

              {/* B1 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-amber-300">B1.</span> Account
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Owner/business email, phone, and sign-in details.</li>
                </ul>
              </div>

              {/* B2 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-amber-300">B2.</span> Identity &amp; KYC documents
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">

                  <li>Owner name; government identity documents — <strong className="text-white">Aadhaar, Passport, or Driving Licence</strong>.</li>
                  <li><strong className="text-white">PAN</strong>.</li>
                  <li>Business registration documents as applicable — GST certificate, Shops &amp; Establishment licence, Udyam registration, electricity bill, certificate of incorporation, LLP or partnership deed.</li>
                  <li>Optional cancelled cheque or bank passbook image.</li>
                </ul>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Used for identity verification, fraud prevention, payout eligibility, and legal/tax compliance. Access is limited to authorised FitFare reviewers and systems.
                </p>
              </div>

              {/* B3 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-amber-300">B3.</span> Bank &amp; payout data
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Account holder name, bank account number, and IFSC. Account numbers are stored securely.</li>
                  <li>Bank verification status. We may verify the account through our payment partner (<strong className="text-white">RazorpayX</strong>), including a small test deposit.</li>
                  <li>Payout statements, settlement amounts, commission, and adjustments.</li>
                </ul>
              </div>

              {/* B4 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-amber-300">B4.</span> Business &amp; operations data
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Centre profile: name, address, photos, amenities, hours, services, slots, trainers, and pricing.</li>
                  <li>Bookings received, check-in / attendance records, no-shows, and support messages.</li>
                </ul>
              </div>

              {/* B5 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-amber-300">B5.</span> Notifications, media &amp; diagnostics
                </h3>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Push notification device ID for alerts such as a new booking or KYC status update.</li>
                  <li>Camera and photos — to capture or upload KYC and centre images, and to save your centre QR if you choose.</li>
                  <li>Crash and stability reports, and app version information.</li>
                </ul>
              </div>

              {/* B6 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-amber-300">B6.</span> What Partners see about users
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Partners receive only what is needed to honour a visit: booking reference, display name, booking date/time, service, quantity, and check-in status. Partners do <strong className="text-white">not</strong> receive payment credentials, Fit Credit balance, or full account profile. Partners must not reuse or sell user data.
                </p>
              </div>

              {/* B7 */}
              <div className="py-8 border-b border-white/[0.05] group">
                <h3 className="text-xl font-medium text-white mb-6 flex items-baseline gap-3">
                  <span className="text-amber-300">B7.</span> Permissions — Partner app
                </h3>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-left text-sm mt-4">
                    <thead>
                      <tr className="border-b border-white/20 text-white font-medium text-xl text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <th className="pb-6 pr-4 font-semibold align-bottom">Permission</th>
                        <th className="pb-6 pr-4 font-semibold align-bottom">Why</th>
                        <th className="pb-6 pr-4 font-semibold align-bottom">Required?</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-200">
                      <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Internet</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Connect to FitFare</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Required")}</td>
                      </tr>
                      <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Camera / Photos</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">KYC and centre documents, save QR</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Required")}</td>
                      </tr>
                      <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                        <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Notifications</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Booking and KYC/payout alerts</td>
                        <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Optional")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-slate-400 text-xs italic">
                  The Partner app does not request location, SMS, contacts, or microphone access.
                </p>
              </div>
                </div>
              </div>
            </m.div>

            {/* 5. Part C — fitfare.in website */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="website" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">05</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Part C — fitfare.in website` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Part C — fitfare.in website` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                <li><strong className="text-white">Contact and enquiry forms</strong> — name, email, phone, and message.</li>
                <li><strong className="text-white">Standard website logs</strong> — for security and abuse prevention.</li>
                <li>We do not run advertising trackers or sell website visitor data.</li>
              </ul>
                </div>
              </div>
            </m.div>

            {/* 6. How we use data */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="purposes" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">06</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `How we use data` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `How we use data` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <div className="overflow-x-auto">
                <table className="w-full text-left text-sm mt-4">
                  <thead>
                    <tr className="border-b border-white/20 text-white font-medium text-xl text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <th className="pb-6 pr-4 font-semibold align-bottom">Typical data</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Name, phone, email, sign-in</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Create and secure your account</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Location, search activity</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Show nearby centres</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Booking and credit records</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Process bookings, check-in, and Fit Credits</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Payment confirmation details via Razorpay</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Take payments and issue refunds</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Push device ID, booking events</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Send transactional notifications</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">KYC, PAN, bank details</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Verify Partner identity and pay out</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Device, sign-in, and transaction signals</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Prevent fraud and misuse</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Messages, booking history</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Provide support</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Diagnostics</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Improve reliability</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">As required</td>
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Comply with law</td>
                    </tr>
                  </tbody>
                </table>
              </div>
                </div>
              </div>
            </m.div>

            {/* 7. Sharing & service providers */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="sharing" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">07</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Sharing &amp; service providers` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Sharing &amp; service providers` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                We share personal data only as needed to run FitFare:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm mt-4">
                  <thead>
                    <tr className="border-b border-white/20 text-white font-medium text-xl text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <th className="pb-6 pr-4 font-semibold align-bottom">Recipient</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">What for</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Applies to</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-3 px-5 font-semibold text-white">Google / Firebase</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Sign-in, push notifications, remote settings, crash reports (Partner)</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">User, Partner</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-3 px-5 font-semibold text-white">Supabase</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Database and file storage under our instructions</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">User, Partner</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-3 px-5 font-semibold text-white">Cloud hosting (Render)</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Running the FitFare API</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">User, Partner</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-3 px-5 font-semibold text-white">Razorpay / RazorpayX</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Payments, refunds, bank verification, partner payouts</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">User, Partner</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-3 px-5 font-semibold text-white">Maps / navigation</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Only when you open directions to a centre</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">User</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-3 px-5 font-semibold text-white">Partner gyms</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Limited booking details to honour your visit</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">User</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-3 px-5 font-semibold text-white">Email provider</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Website contact form and support email</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">Website</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-3 px-5 font-semibold text-white">FitFare staff</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">KYC review, support, fraud checks</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">User, Partner</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-3 px-5 font-semibold text-white">Authorities</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">When legally required</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">All</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                Service providers process data on our behalf and are not allowed to use it for their own purposes.
              </p>
                </div>
              </div>
            </m.div>

            {/* 8. Retention */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="retention" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">08</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Retention` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Retention` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                <li><strong className="text-white">Account and booking records</strong> — while your account is active and for a reasonable period afterwards for disputes, accounting, and fraud prevention.</li>
                <li><strong className="text-white">Payment and payout records</strong> — as long as tax, audit, and chargeback rules require.</li>
                <li><strong className="text-white">Partner KYC and bank documents</strong> — while the partnership is active; after offboarding, deleted or anonymised subject to legal retention.</li>
                <li><strong className="text-white">Push device IDs</strong> — removed on logout or deletion.</li>
                <li><strong className="text-white">Support messages</strong> — for a reasonable period.</li>
              </ul>
                </div>
              </div>
            </m.div>

            {/* 9. Account deletion */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="deletion" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">09</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Account deletion` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Account deletion` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  {/* User app deletion */}
              <div className="group relative p-6 sm:p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.02] hover:border-white/[0.1] transition-all duration-500 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"></div>
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  User app
                </h4>
                <p className="text-slate-300 text-sm mb-4">
                  Go to <strong className="text-white">Profile → Edit Profile → Delete my account</strong>.
                </p>
                <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">
                  <li>Deletion is <strong className="text-white">scheduled with a 30-day hold</strong> and you are signed out.</li>
                  <li>If you sign in again within 30 days, deletion is cancelled.</li>
                  <li>After 30 days, we permanently delete or anonymise your account identifiers (name, email, phone, photo, gender, date of birth, preferences), remove your push device ID, and remove your sign-in account.</li>
                  <li>Records we must keep for law or tax may remain in limited or de-identified form.</li>
                </ul>
              </div>

              {/* Partner app deletion */}
              <div className="group relative p-6 sm:p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.02] hover:border-white/[0.1] transition-all duration-500 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"></div>
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  Partner app
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Request deletion from the Partner app profile screen, or email <a href="mailto:support@fitfare.in" className="text-blue-400 underline font-medium break-all">support@fitfare.in</a> from your registered address. Pending settlements are reconciled first; KYC/financial records are retained where law requires.
                </p>
              </div>

              {/* Either app */}
              <div className="group relative p-6 sm:p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.02] hover:border-white/[0.1] transition-all duration-500 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"></div>
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  Either app
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  You can always email <a href="mailto:support@fitfare.in" className="text-blue-400 underline font-medium break-all">support@fitfare.in</a> for a verified deletion request.
                </p>
              </div>
                </div>
              </div>
            </m.div>

            {/* 10. Security */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="security" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">10</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Security` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Security` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">

                <li>Encrypted connections (HTTPS) for data in transit.</li>
                <li>Secure sign-in and access controls on account data.</li>
                <li>Partner bank details and KYC documents are stored with restricted access.</li>
                <li>Payment card and UPI credentials are handled by Razorpay and never stored by FitFare.</li>
              </ul>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 text-xs italic">
                No system is completely secure. Keep your device and sign-in access protected.
              </div>
                </div>
              </div>
            </m.div>

            {/* 11. Your rights (including DPDP) & grievance */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="rights" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">11</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Your rights (including DPDP) &amp; grievance` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Your rights (including DPDP) &amp; grievance` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Subject to applicable law, you may:
              </p>

              <ul className="space-y-4 text-sm sm:text-base text-slate-400 list-disc list-inside">

                <li>Access the personal data we hold about you;</li>
                <li>Correct or update your profile in-app where available;</li>
                <li>Request deletion (see <button onClick={() => scrollTo("deletion")} className="text-blue-400 underline font-medium break-all">Account deletion</button>);</li>
                <li>Withdraw consent by turning off location, camera, or notifications in device settings;</li>
                <li>Nominate another person to exercise your rights in case of death or incapacity, as provided under DPDP;</li>
                <li>Raise a grievance about how your data is handled.</li>
              </ul>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-sm leading-relaxed">
                Email <a href="mailto:support@fitfare.in" className="text-white font-bold underline break-all">support@fitfare.in</a>. We may verify your identity before acting and will respond within the period required by law.
              </div>
                </div>
              </div>
            </m.div>

            {/* 12. Children */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="children" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">12</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Children` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Children` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                FitFare is for people aged <strong className="text-white">18 or older</strong>. We do not knowingly collect personal data from children. Contact us if you believe a child has used FitFare and we will delete the data.
              </p>
                </div>
              </div>
            </m.div>

            {/* 13. International transfers */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="transfers" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">13</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `International transfers` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `International transfers` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Your data may be processed in India or in other countries where our service providers operate. We take steps reasonably designed to protect it under applicable law.
              </p>
                </div>
              </div>
            </m.div>

            {/* 14. Google Play “Data safety” mapping */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="datasafety" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">14</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Google Play “Data safety” mapping — user app` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Google Play “Data safety” mapping — user app` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm mt-4">
                  <thead>
                    <tr className="border-b border-white/20 text-white font-medium text-xl text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <th className="pb-6 pr-4 font-semibold align-bottom">Play category</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Collected</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Shared</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Personal info (name, email, phone, gender, DOB)</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5 text-slate-300">Limited to Partner for your booking</td>
                      <td className="py-3 px-5 text-slate-300">Account, app functionality</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Photos</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Location</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (optional)")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">Nearby gyms</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Financial info (purchase history)</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (payment confirmation)")}</td>
                      <td className="py-3 px-5 text-slate-300">With payment processor</td>
                      <td className="py-3 px-5 text-slate-300">Payments for physical Partner services</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Payment card / UPI credentials</td>
                      <td className="py-3 px-5 text-slate-300"><strong className="text-white">No</strong> — handled by Razorpay</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">App activity</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Messages (support)</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes, if you send them")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">Support</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Device or other IDs</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (push device ID)")}</td>
                      <td className="py-3 px-5 text-slate-300">With Google/Firebase for push</td>
                      <td className="py-3 px-5 text-slate-300">Notifications</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Crash logs / diagnostics</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (basic)")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">Reliability</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                Data is encrypted in transit. You can request deletion in-app or by email. We do not sell data and do not use it for third-party advertising.
              </p>
                </div>
              </div>
            </m.div>

            {/* 15. Apple App Privacy mapping */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="appprivacy" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">15</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Apple App Privacy mapping — user app (iOS)` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Apple App Privacy mapping — user app (iOS)` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Use this section when completing App Store Connect → App Privacy. FitFare does <strong className="text-white">not</strong> track users across apps or websites owned by other companies for advertising.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm mt-4">
                  <thead>
                    <tr className="border-b border-white/20 text-white font-medium text-xl text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <th className="pb-6 pr-4 font-semibold align-bottom">Apple data type</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Collected?</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Linked to identity?</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Used for tracking?</th>
                      <th className="pb-6 pr-4 font-semibold align-bottom">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Name</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Email address</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Phone number</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Physical address</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Photos or Videos</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors"><strong className="text-slate-200">No</strong></td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Precise Location</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (optional, while using the app)")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality (nearby gyms)</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Coarse Location</td>
                      <td className="py-3 px-5 text-slate-300">No (we use precise when permitted)</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Purchase History</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality (bookings / credits)</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Product Interaction</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Advertising Data</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Device ID</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (push notification token)")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Crash Data</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality / reliability</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Performance Data</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes (basic)")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality / reliability</td>
                    </tr>
                    <tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group text-center [&>*:first-child]:text-left [&>*:nth-child(n+2)]:text-center">
                      <td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">Other User Content (e.g. reviews, support)</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes, if you submit it")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("Yes")}</td>
                      <td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality / customer support</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                <strong className="text-white">Sign in with Apple:</strong> available on iOS alongside phone OTP and Google Sign-In. <strong className="text-white">Account deletion:</strong> Profile → Edit Profile → Delete my account (30-day hold), or email us.
              </p>
                </div>
              </div>
            </m.div>

            {/* 16. Changes to this Policy */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="changes" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">16</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Changes to this Policy` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Changes to this Policy` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We may update this Policy. Material changes are shown by updating the “Last updated” date and, where appropriate, by in-app notice. Continued use after an update means you accept the revised Policy.
              </p>
                </div>
              </div>
            </m.div>

            {/* 17. Contact */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              id="contact" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">17</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{ __html: `Contact` }} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{ __html: `Contact` }} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Privacy, deletion and grievance</p>
                  <a
                    href="mailto:support@fitfare.in"
                    className="text-white hover:text-[#D9A84E] font-semibold text-base transition-colors flex items-center gap-2"
                  >
                    <Mail size={16} className="text-white" />
                    support@fitfare.in
                  </a>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Support & Phone</p>
                  <a
                    href="tel:+917666400518"
                    className="text-white hover:text-[#D9A84E] font-semibold text-base transition-colors flex items-center gap-2"
                  >
                    <Phone size={16} className="text-white" />
                    +91 7666400518
                  </a>
                </div>
              </div>

              
                </div>
              </div>
            </m.div>
            </div>
          </div>
        </div>
      </div>
{/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-8 right-6 sm:right-8 z-40 w-12 h-12 rounded-full bg-white/[0.08] hover:bg-white/[0.18] active:bg-white/[0.25] backdrop-blur-2xl border border-white/20 hover:border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center text-white transition-all duration-300 group cursor-pointer"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {/* Footer */}
      {/* Footer removed as requested */}
    </div>
  );
};

export default PrivacyPolicyPage;
