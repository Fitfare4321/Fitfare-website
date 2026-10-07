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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 size={13} className="text-emerald-400" />
          {val}
        </span>
      );
    }
    if (lower.startsWith("no")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
          {val}
        </span>
      );
    }
    if (lower.includes("optional")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
          {val}
        </span>
      );
    }
    if (lower.includes("required")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#D9A84E]/15 text-[#E6BC65] border border-[#D9A84E]/30">
          {val}
        </span>
      );
    }
    return <span>{val}</span>;
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-200 font-sans selection:bg-[#D9A84E]/30 selection:text-white">
      <PageSEO
        title="FitFare — Privacy Policy | Data Protection & Privacy Rights"
        description="FitFare Privacy Policy covering the FitFare user app, FitFare Partner app, and fitfare.in website. Transparent data collection, DPDP compliance, and Apple/Google Play privacy disclosures."
        canonical="https://fitfare.in/privacy-policy"
      />

      {/* Global Navigation */}
      <Navbar />

      {/* Hero Header */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/[0.08] bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(48,92,222,0.18),transparent_70%)]">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D9A84E]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge & Breadcrumb */}
          <m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#D9A84E]/15 text-[#E6BC65] border border-[#D9A84E]/30 shadow-[0_0_15px_rgba(217,168,78,0.2)]">
              <Shield size={14} className="text-[#D9A84E]" />
              Official Legal Document
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
              DPDP Act, 2023 Compliant
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-slate-400 border border-white/10">
              Apple & Google Play Disclosures
            </span>
          </m.div>

          {/* Heading */}
          <m.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            FitFare Privacy Policy
          </m.h1>

          {/* Metadata Card */}
          <m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 text-sm">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Effective & Last Updated</p>
              <p className="text-white font-medium mt-1">18 August 2026</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Operator</p>
              <p className="text-white font-medium mt-1">FitFare (“FitFare”, “we”, “us”, “our”)</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Jurisdiction</p>
              <p className="text-white font-medium mt-1">India (DPDP Act, 2023)</p>
            </div>
          </m.div>

          {/* Intro Description */}
          <m.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl mb-6">
            This single Privacy Policy covers <strong className="text-white">all FitFare products</strong>. Read the part that applies to you:
          </m.p>

          {/* Scope Pills */}
          <m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mb-8">
            <button
              onClick={() => scrollTo("user")}
              className="text-left p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all group flex items-start justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#305CDE]/20 text-[#60A5FA] border border-[#305CDE]/30 mb-2">
                  Part A
                </span>
                <p className="font-semibold text-white group-hover:text-[#D9A84E] transition-colors text-sm">
                  FitFare user app
                </p>
                <p className="text-xs text-slate-400 mt-1">iOS & Android — book gyms, Fit Credits</p>
              </div>
              <ChevronRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
            </button>

            <button
              onClick={() => scrollTo("partner")}
              className="text-left p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all group flex items-start justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                  Part B
                </span>
                <p className="font-semibold text-white group-hover:text-[#D9A84E] transition-colors text-sm">
                  FitFare Partner app
                </p>
                <p className="text-xs text-slate-400 mt-1">Gym & studio owners</p>
              </div>
              <ChevronRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
            </button>

            <button
              onClick={() => scrollTo("website")}
              className="text-left p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all group flex items-start justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                  Part C
                </span>
                <p className="font-semibold text-white group-hover:text-[#D9A84E] transition-colors text-sm">
                  fitfare.in website
                </p>
                <p className="text-xs text-slate-400 mt-1">Web enquiries & careers</p>
              </div>
              <ChevronRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
            </button>
          </m.div>

          <m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 max-w-4xl text-sm leading-relaxed text-blue-200/90 mb-6">
            It explains what personal data we collect, why we collect it, who we share it with, how long we keep it, and your rights. It supports <strong className="text-white">Apple App Store</strong> App Privacy disclosures, <strong className="text-white">Google Play</strong> Data safety disclosures, and applicable Indian law, including the <strong className="text-white">Digital Personal Data Protection Act, 2023 (DPDP)</strong>.
          </m.div>

          <m.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="text-slate-400 text-sm italic max-w-4xl">
            By creating an account or using FitFare, you agree to this Policy. If you do not agree, please stop using the products.
          </m.p>

          {/* Quick Actions (Copy, Print, Mobile TOC) */}
          <m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="flex flex-wrap items-center gap-3 pt-6">
            <button
              onClick={copyPageUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? "Link Copied!" : "Copy Page Link"}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white transition-colors"
            >
              <Printer size={14} />
              Print / Save PDF
            </button>

            <button
              onClick={() => setShowMobileTOC(!showMobileTOC)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#D9A84E]/15 border border-[#D9A84E]/30 text-[#E6BC65] transition-colors"
            >
              <Info size={14} />
              Jump to Section ({TOC_ITEMS.length})
            </button>
          </m.div>

          {/* Mobile TOC Dropdown */}
          {showMobileTOC && (
            <div className="lg:hidden mt-4 p-4 rounded-2xl bg-[#0D121F] border border-white/15 max-h-72 overflow-y-auto space-y-1 shadow-2xl">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Table of Contents</p>
              {TOC_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-[#D9A84E]/20 text-[#E6BC65] font-semibold"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Two-Column Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Sticky Table of Contents (Desktop lg+) */}
          <m.aside initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 rounded-2xl bg-white/[0.02] border border-white/10 p-5 backdrop-blur-xl shadow-xl max-h-[calc(100vh-140px)] flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A84E] flex items-center gap-2">
                  <Shield size={14} />
                  Contents
                </span>
                <span className="text-[11px] text-slate-500 font-mono">17 Sections</span>
              </div>

              <div className="overflow-y-auto pr-1 space-y-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                        isActive
                          ? "bg-[#D9A84E]/15 text-[#E6BC65] font-bold border border-[#D9A84E]/30 shadow-[0_0_15px_rgba(217,168,78,0.15)]"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D9A84E] animate-pulse shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Quick Contact */}
              <div className="mt-4 pt-4 border-t border-white/10 text-xs">
                <p className="text-slate-400 font-semibold mb-1">Grievance & Privacy</p>
                <a
                  href="mailto:collaborations@fitfare.in"
                  className="text-blue-400 hover:text-blue-300 transition-colors block truncate"
                >
                  collaborations@fitfare.in
                </a>
                <a
                  href="tel:+917666400518"
                  className="text-slate-400 hover:text-white transition-colors block mt-1"
                >
                  +91 7666400518
                </a>
              </div>
            </div>
          </m.aside>

          {/* Right Column: Full Complete Policy Content */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-14">

            {/* 1. Who we are & how to contact us */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="who" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  1. Who we are &amp; how to contact us
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                FitFare operates a fitness marketplace. Users discover gyms and studios, book day passes and sessions, and manage prepaid <strong className="text-white">Fit Credits</strong>. Partner gyms list their centres, manage bookings and attendance, and receive payouts.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-5">Purpose</th>
                      <th className="py-3.5 px-5">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-slate-300">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-5 font-medium">Privacy, data requests, deletion, grievance</td>
                      <td className="py-3.5 px-5">
                        <a href="mailto:collaborations@fitfare.in" className="text-blue-400 hover:underline font-medium">
                          collaborations@fitfare.in
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-5 font-medium">General support</td>
                      <td className="py-3.5 px-5">
                        <a href="mailto:collaborations@fitfare.in" className="text-blue-400 hover:underline font-medium">
                          collaborations@fitfare.in
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-5 font-medium">Phone</td>
                      <td className="py-3.5 px-5">
                        <a href="tel:+917666400518" className="text-[#D9A84E] hover:underline font-medium">
                          +91 7666400518
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.section>

            {/* 2. At a glance */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="overview" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  2. At a glance — what each product collects
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 mb-6">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-5">Data</th>
                      <th className="py-3.5 px-5">User app</th>
                      <th className="py-3.5 px-5">Partner app</th>
                      <th className="py-3.5 px-5">Website</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-slate-300">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Name, phone, email</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5 text-slate-400">Only if you submit a form</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Gender, date of birth</td>
                      <td className="py-3 px-5">{renderBadge("Yes (optional profile)")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Profile / centre photos</td>
                      <td className="py-3 px-5"><strong className="text-slate-200">No</strong> (user app has no profile photo)</td>
                      <td className="py-3 px-5">{renderBadge("Yes (centre & KYC images)")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Location</td>
                      <td className="py-3 px-5">{renderBadge("Yes (with permission)")}</td>
                      <td className="py-3 px-5 text-slate-300">Centre address only</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Government ID / PAN / business docs</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes (KYC)")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Bank account details</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes (payouts)")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Payment card / UPI credentials</td>
                      <td className="py-3 px-5 text-slate-300">No — handled by Razorpay</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Push notification device ID</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Crash / diagnostics</td>
                      <td className="py-3 px-5 text-slate-300">Basic app logs</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5 text-slate-400">Standard website logs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-[#D9A84E]/10 border border-[#D9A84E]/20 text-[#E6BC65] text-sm font-semibold flex items-center gap-3">
                <Shield size={18} className="shrink-0 text-[#D9A84E]" />
                <span>We do not sell personal data and we do not use your data for third-party advertising.</span>
              </div>
            </m.section>

            {/* 3. Part A — FitFare user app */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="user" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-8">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="w-8 h-8 rounded-xl bg-[#305CDE]/20 border border-[#305CDE]/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#60A5FA]">Part A</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    3. Part A — FitFare user app
                  </h2>
                </div>
              </div>

              <p className="text-slate-300 text-sm">
                Applies to the FitFare user app on <strong className="text-white">iOS and Android</strong>.
              </p>

              {/* A1 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A1.</span> Account &amp; profile
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">Name, phone number, email</strong> — to create your account, confirm bookings, and contact you about a booking. Email on your profile is for account and booking contact; it is not a separate login method unless you use Google or Apple Sign-In.</li>
                  <li><strong className="text-white">Gender</strong> — collected during onboarding and editable later; used to personalise recommendations and filter centres with gender-specific access.</li>
                  <li><strong className="text-white">Date of birth</strong> — optional; for age eligibility (18+) and personalisation.</li>
                  <li><strong className="text-white">Profile photo</strong> — <strong className="text-rose-300">not collected</strong> in the user app.</li>
                  <li><strong className="text-white">City and preferred activities</strong> — to personalise discovery.</li>
                </ul>
              </div>

              {/* A2 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A2.</span> Sign-in
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>You can sign in with a one-time code sent to your phone, with <strong className="text-white">Google Sign-In</strong>, or with <strong className="text-white">Sign in with Apple</strong> on iOS.</li>
                  <li>Sign-in is provided by <strong className="text-white">Google (Firebase)</strong> and <strong className="text-white">Apple</strong>.</li>
                  <li>If you use Google or Apple Sign-In, we may receive your name, email, and (for Google) profile photo when you share them. <strong className="text-white">We never receive or store your Google or Apple password.</strong></li>
                </ul>
              </div>

              {/* A3 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A3.</span> Location
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>With your permission, we use your <strong className="text-white">foreground</strong> location to show nearby gyms and distance while you use the app.</li>
                  <li>We do <strong className="text-white">not</strong> request background location. Booking works without location access.</li>
                  <li>You can turn location off anytime in device settings. We do not sell or share your location with advertisers.</li>
                </ul>
              </div>

              {/* A4 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A4.</span> Bookings &amp; check-in
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Centre, service, date and time, quantity, amount, payment method, and booking status.</li>
                  <li>Check-in / attendance records when you visit.</li>
                  <li>The Partner gym you booked receives only the details needed to honour your visit (see <button onClick={() => scrollTo("sharing")} className="text-blue-400 underline font-medium">Sharing</button>).</li>
                </ul>
              </div>

              {/* A5 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A5.</span> Fit Credits
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Your Fit Credit balance, expiry dates, amounts held for a booking, and transaction history.</li>
                  <li>Fit Credits are a <strong className="text-white">prepaid balance used only to book physical visits</strong> at Partner gyms and studios (day-passes and similar on-site services). They are not used to unlock digital content, subscriptions, or in-app features unrelated to a Partner visit.</li>
                  <li>If you transfer credits, we use the phone number or email you enter to find the recipient’s FitFare account and show their display name. Both sides get a transaction record and may get a notification.</li>
                </ul>
              </div>

              {/* A6 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A6.</span> Favourites, reviews &amp; activity
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Saved centres, ratings and reviews (shown publicly with your display name), and search/browse activity used to run and improve discovery.</li>
                </ul>
              </div>

              {/* A7 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A7.</span> Payments
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Payments for Partner bookings and Fit Credit top-ups are processed by <strong className="text-white">Razorpay</strong>.</li>
                  <li>These payments are for <strong className="text-white">physical fitness services delivered at Partner venues</strong> (or prepaid credit redeemable only for those services). They are not purchases of digital goods or unlockable content inside the app.</li>
                  <li>FitFare keeps payment confirmation details such as amount, order/payment id, and status.</li>
                  <li><strong className="text-white">Card numbers, CVV, UPI PIN, and net-banking passwords are never stored by FitFare.</strong></li>
                </ul>
              </div>

              {/* A8 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A8.</span> Notifications
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>We store a push notification device ID linked to your account for transactional alerts (for example booking confirmed or Fit Credits received).</li>
                  <li>It is removed when you log out or delete your account.</li>
                  <li>You can turn notifications off in device settings; bookings still work.</li>
                </ul>
              </div>

              {/* A9 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A9.</span> Camera &amp; photos
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">Camera</strong> — only to scan a check-in QR code. We do not record video.</li>
                  <li><strong className="text-white">Photos / photo library</strong> — not used in the user app. We do not request photo-library access for a profile picture.</li>
                </ul>
              </div>

              {/* A10 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A10.</span> Device &amp; support
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Basic device and app information (for example device type, OS, app version) and error logs for reliability and security.</li>
                  <li>Some non-sensitive data may be stored on your device to make the app open faster. Clearing app data removes it.</li>
                  <li>Support messages and screenshots you send us.</li>
                </ul>
              </div>

              {/* A11 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">A11.</span> Permissions — user app
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 mb-4">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 font-semibold text-xs uppercase tracking-wider">
                        <th className="py-3.5 px-5">Permission</th>
                        <th className="py-3.5 px-5">Why</th>
                        <th className="py-3.5 px-5">Required?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-slate-300">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 font-medium text-white">Internet</td>
                        <td className="py-3 px-5">Connect to FitFare</td>
                        <td className="py-3 px-5">{renderBadge("Required")}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 font-medium text-white">Location (foreground)</td>
                        <td className="py-3 px-5">Show nearby gyms and distance</td>
                        <td className="py-3 px-5">{renderBadge("Optional")}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 font-medium text-white">Camera</td>
                        <td className="py-3 px-5">QR check-in</td>
                        <td className="py-3 px-5">{renderBadge("Optional")}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 font-medium text-white">Photos / media</td>
                        <td className="py-3 px-5">Not requested in the user app</td>
                        <td className="py-3 px-5">{renderBadge("No")}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 font-medium text-white">Notifications</td>
                        <td className="py-3 px-5">Booking and Fit Credit alerts</td>
                        <td className="py-3 px-5">{renderBadge("Optional")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-slate-400 text-xs italic">
                  We do <strong className="text-white">not</strong> request SMS inbox, call logs, contacts, or microphone access in the user app.
                </p>
              </div>
            </m.section>

            {/* 4. Part B — FitFare Partner app */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="partner" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-8">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-300">Part B</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    4. Part B — FitFare Partner app
                  </h2>
                </div>
              </div>

              <p className="text-slate-300 text-sm">
                Applies to the FitFare Partner app used by gym and studio owners/operators. Partners must be 18+ and represent a legitimate business.
              </p>

              {/* B1 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-amber-300">B1.</span> Account
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Owner/business email, phone, and sign-in details.</li>
                </ul>
              </div>

              {/* B2 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-amber-300">B2.</span> Identity &amp; KYC documents
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-3">
                  <li>Owner name; government identity documents — <strong className="text-white">Aadhaar, Passport, or Driving Licence</strong>.</li>
                  <li><strong className="text-white">PAN</strong>.</li>
                  <li>Business registration documents as applicable — GST certificate, Shops &amp; Establishment licence, Udyam registration, certificate of incorporation, LLP or partnership deed.</li>
                  <li>Optional cancelled cheque or bank passbook image.</li>
                </ul>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Used for identity verification, fraud prevention, payout eligibility, and legal/tax compliance. Access is limited to authorised FitFare reviewers and systems.
                </p>
              </div>

              {/* B3 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-amber-300">B3.</span> Bank &amp; payout data
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Account holder name, bank account number, and IFSC. Account numbers are stored securely.</li>
                  <li>Bank verification status. We may verify the account through our payment partner (<strong className="text-white">RazorpayX</strong>), including a small test deposit.</li>
                  <li>Payout statements, settlement amounts, commission, and adjustments.</li>
                </ul>
              </div>

              {/* B4 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-amber-300">B4.</span> Business &amp; operations data
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Centre profile: name, address, photos, amenities, hours, services, slots, trainers, and pricing.</li>
                  <li>Bookings received, check-in / attendance records, no-shows, and support messages.</li>
                </ul>
              </div>

              {/* B5 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-amber-300">B5.</span> Notifications, media &amp; diagnostics
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Push notification device ID for alerts such as a new booking or KYC status update.</li>
                  <li>Camera and photos — to capture or upload KYC and centre images, and to save your centre QR if you choose.</li>
                  <li>Crash and stability reports, and app version information.</li>
                </ul>
              </div>

              {/* B6 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-amber-300">B6.</span> What Partners see about users
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Partners receive only what is needed to honour a visit: booking reference, display name, booking date/time, service, quantity, and check-in status. Partners do <strong className="text-white">not</strong> receive payment credentials, Fit Credit balance, or full account profile. Partners must not reuse or sell user data.
                </p>
              </div>

              {/* B7 */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-amber-300">B7.</span> Permissions — Partner app
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 mb-4">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 font-semibold text-xs uppercase tracking-wider">
                        <th className="py-3.5 px-5">Permission</th>
                        <th className="py-3.5 px-5">Why</th>
                        <th className="py-3.5 px-5">Required?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-slate-300">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 font-medium text-white">Internet</td>
                        <td className="py-3 px-5">Connect to FitFare</td>
                        <td className="py-3 px-5">{renderBadge("Required")}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 font-medium text-white">Camera / Photos</td>
                        <td className="py-3 px-5">KYC and centre documents, save QR</td>
                        <td className="py-3 px-5">{renderBadge("Optional")}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 font-medium text-white">Notifications</td>
                        <td className="py-3 px-5">Booking and KYC/payout alerts</td>
                        <td className="py-3 px-5">{renderBadge("Optional")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-slate-400 text-xs italic">
                  The Partner app does not request location, SMS, contacts, or microphone access.
                </p>
              </div>
            </m.section>

            {/* 5. Part C — fitfare.in website */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="website" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-emerald-300">Part C</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    5. Part C — fitfare.in website
                  </h2>
                </div>
              </div>

              <ul className="space-y-3 text-sm sm:text-base text-slate-300 list-disc list-inside">
                <li><strong className="text-white">Contact and enquiry forms</strong> — name, email, phone, and message.</li>
                <li><strong className="text-white">Careers applications</strong> — details you send us by email.</li>
                <li><strong className="text-white">Standard website logs</strong> — for security and abuse prevention.</li>
                <li>We do not run advertising trackers or sell website visitor data.</li>
              </ul>
            </m.section>

            {/* 6. How we use data */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="purposes" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  6
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  6. How we use data
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-5">Purpose</th>
                      <th className="py-3.5 px-5">Typical data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-slate-300">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Create and secure your account</td>
                      <td className="py-3 px-5">Name, phone, email, sign-in</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Show nearby centres</td>
                      <td className="py-3 px-5">Location, search activity</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Process bookings, check-in, and Fit Credits</td>
                      <td className="py-3 px-5">Booking and credit records</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Take payments and issue refunds</td>
                      <td className="py-3 px-5">Payment confirmation details via Razorpay</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Send transactional notifications</td>
                      <td className="py-3 px-5">Push device ID, booking events</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Verify Partner identity and pay out</td>
                      <td className="py-3 px-5">KYC, PAN, bank details</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Prevent fraud and misuse</td>
                      <td className="py-3 px-5">Device, sign-in, and transaction signals</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Provide support</td>
                      <td className="py-3 px-5">Messages, booking history</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Improve reliability</td>
                      <td className="py-3 px-5">Diagnostics</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Comply with law</td>
                      <td className="py-3 px-5">As required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </m.section>

            {/* 7. Sharing & service providers */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="sharing" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  7
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  7. Sharing &amp; service providers
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                We share personal data only as needed to run FitFare:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 mb-6">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-5">Recipient</th>
                      <th className="py-3.5 px-5">What for</th>
                      <th className="py-3.5 px-5">Applies to</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-slate-300">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">Google / Firebase</td>
                      <td className="py-3 px-5">Sign-in, push notifications, remote settings, crash reports (Partner)</td>
                      <td className="py-3 px-5 text-slate-400">User, Partner</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">Supabase</td>
                      <td className="py-3 px-5">Database and file storage under our instructions</td>
                      <td className="py-3 px-5 text-slate-400">User, Partner</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">Cloud hosting (Render)</td>
                      <td className="py-3 px-5">Running the FitFare API</td>
                      <td className="py-3 px-5 text-slate-400">User, Partner</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">Razorpay / RazorpayX</td>
                      <td className="py-3 px-5">Payments, refunds, bank verification, partner payouts</td>
                      <td className="py-3 px-5 text-slate-400">User, Partner</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">Maps / navigation</td>
                      <td className="py-3 px-5">Only when you open directions to a centre</td>
                      <td className="py-3 px-5 text-slate-400">User</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">Partner gyms</td>
                      <td className="py-3 px-5">Limited booking details to honour your visit</td>
                      <td className="py-3 px-5 text-slate-400">User</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">Email provider</td>
                      <td className="py-3 px-5">Website contact form and support email</td>
                      <td className="py-3 px-5 text-slate-400">Website</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">FitFare staff</td>
                      <td className="py-3 px-5">KYC review, support, fraud checks</td>
                      <td className="py-3 px-5 text-slate-400">User, Partner</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">Authorities</td>
                      <td className="py-3 px-5">When legally required</td>
                      <td className="py-3 px-5 text-slate-400">All</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                Service providers process data on our behalf and are not allowed to use it for their own purposes.
              </p>
            </m.section>

            {/* 8. Retention */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="retention" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  8
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  8. Retention
                </h2>
              </div>

              <ul className="space-y-3 text-sm sm:text-base text-slate-300 list-disc list-inside">
                <li><strong className="text-white">Account and booking records</strong> — while your account is active and for a reasonable period afterwards for disputes, accounting, and fraud prevention.</li>
                <li><strong className="text-white">Payment and payout records</strong> — as long as tax, audit, and chargeback rules require.</li>
                <li><strong className="text-white">Partner KYC and bank documents</strong> — while the partnership is active; after offboarding, deleted or anonymised subject to legal retention.</li>
                <li><strong className="text-white">Push device IDs</strong> — removed on logout or deletion.</li>
                <li><strong className="text-white">Support messages</strong> — for a reasonable period.</li>
              </ul>
            </m.section>

            {/* 9. Account deletion */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="deletion" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
                  9
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  9. Account deletion
                </h2>
              </div>

              {/* User app deletion */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Smartphone size={18} className="text-blue-400" />
                  User app
                </h4>
                <p className="text-slate-300 text-sm mb-4">
                  Go to <strong className="text-white">Profile → Edit Profile → Delete my account</strong>.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Deletion is <strong className="text-white">scheduled with a 30-day hold</strong> and you are signed out.</li>
                  <li>If you sign in again within 30 days, deletion is cancelled.</li>
                  <li>After 30 days, we permanently delete or anonymise your account identifiers (name, email, phone, photo, gender, date of birth, preferences), remove your push device ID, and remove your sign-in account.</li>
                  <li>Records we must keep for law or tax may remain in limited or de-identified form.</li>
                </ul>
              </div>

              {/* Partner app deletion */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Building2 size={18} className="text-amber-400" />
                  Partner app
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Request deletion from the Partner app profile screen, or email <a href="mailto:collaborations@fitfare.in" className="text-blue-400 underline font-medium">collaborations@fitfare.in</a> from your registered address. Pending settlements are reconciled first; KYC/financial records are retained where law requires.
                </p>
              </div>

              {/* Either app */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Trash2 size={18} className="text-rose-400" />
                  Either app
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  You can always email <a href="mailto:collaborations@fitfare.in" className="text-blue-400 underline font-medium">collaborations@fitfare.in</a> for a verified deletion request.
                </p>
              </div>
            </m.section>

            {/* 10. Security */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="security" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  10
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  10. Security
                </h2>
              </div>

              <ul className="space-y-3 text-sm sm:text-base text-slate-300 list-disc list-inside mb-6">
                <li>Encrypted connections (HTTPS) for data in transit.</li>
                <li>Secure sign-in and access controls on account data.</li>
                <li>Partner bank details and KYC documents are stored with restricted access.</li>
                <li>Payment card and UPI credentials are handled by Razorpay and never stored by FitFare.</li>
              </ul>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 text-xs italic">
                No system is completely secure. Keep your device and sign-in access protected.
              </div>
            </m.section>

            {/* 11. Your rights (including DPDP) & grievance */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="rights" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  11
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  11. Your rights (including DPDP) &amp; grievance
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Subject to applicable law, you may:
              </p>

              <ul className="space-y-3 text-sm sm:text-base text-slate-300 list-disc list-inside mb-6">
                <li>Access the personal data we hold about you;</li>
                <li>Correct or update your profile in-app where available;</li>
                <li>Request deletion (see <button onClick={() => scrollTo("deletion")} className="text-blue-400 underline font-medium">Account deletion</button>);</li>
                <li>Withdraw consent by turning off location, camera, or notifications in device settings;</li>
                <li>Nominate another person to exercise your rights in case of death or incapacity, as provided under DPDP;</li>
                <li>Raise a grievance about how your data is handled.</li>
              </ul>

              <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-slate-300 text-sm leading-relaxed">
                Email <a href="mailto:collaborations@fitfare.in" className="text-white font-bold underline">collaborations@fitfare.in</a>. We may verify your identity before acting and will respond within the period required by law.
              </div>
            </m.section>

            {/* 12. Children */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="children" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  12
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  12. Children
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                FitFare is for people aged <strong className="text-white">18 or older</strong>. We do not knowingly collect personal data from children. Contact us if you believe a child has used FitFare and we will delete the data.
              </p>
            </m.section>

            {/* 13. International transfers */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="transfers" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  13
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  13. International transfers
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Your data may be processed in India or in other countries where our service providers operate. We take steps reasonably designed to protect it under applicable law.
              </p>
            </m.section>

            {/* 14. Google Play “Data safety” mapping */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="datasafety" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  14
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  14. Google Play “Data safety” mapping — user app
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 mb-6">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-5">Play category</th>
                      <th className="py-3.5 px-5">Collected</th>
                      <th className="py-3.5 px-5">Shared</th>
                      <th className="py-3.5 px-5">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-slate-300">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Personal info (name, email, phone, gender, DOB)</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5 text-slate-300">Limited to Partner for your booking</td>
                      <td className="py-3 px-5 text-slate-300">Account, app functionality</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Photos</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Location</td>
                      <td className="py-3 px-5">{renderBadge("Yes (optional)")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">Nearby gyms</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Financial info (purchase history)</td>
                      <td className="py-3 px-5">{renderBadge("Yes (payment confirmation)")}</td>
                      <td className="py-3 px-5 text-slate-300">With payment processor</td>
                      <td className="py-3 px-5 text-slate-300">Payments for physical Partner services</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Payment card / UPI credentials</td>
                      <td className="py-3 px-5 text-slate-300"><strong className="text-white">No</strong> — handled by Razorpay</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">App activity</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Messages (support)</td>
                      <td className="py-3 px-5">{renderBadge("Yes, if you send them")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">Support</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Device or other IDs</td>
                      <td className="py-3 px-5">{renderBadge("Yes (push device ID)")}</td>
                      <td className="py-3 px-5 text-slate-300">With Google/Firebase for push</td>
                      <td className="py-3 px-5 text-slate-300">Notifications</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Crash logs / diagnostics</td>
                      <td className="py-3 px-5">{renderBadge("Yes (basic)")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">Reliability</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                Data is encrypted in transit. You can request deletion in-app or by email. We do not sell data and do not use it for third-party advertising.
              </p>
            </m.section>

            {/* 15. Apple App Privacy mapping */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="appprivacy" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  15
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  15. Apple App Privacy mapping — user app (iOS)
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Use this section when completing App Store Connect → App Privacy. FitFare does <strong className="text-white">not</strong> track users across apps or websites owned by other companies for advertising.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 mb-6">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-5">Apple data type</th>
                      <th className="py-3.5 px-5">Collected?</th>
                      <th className="py-3.5 px-5">Linked to identity?</th>
                      <th className="py-3.5 px-5">Used for tracking?</th>
                      <th className="py-3.5 px-5">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-slate-300">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Name</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Email address</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Phone number</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Physical address</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Photos or Videos</td>
                      <td className="py-3 px-5"><strong className="text-slate-200">No</strong></td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Precise Location</td>
                      <td className="py-3 px-5">{renderBadge("Yes (optional, while using the app)")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality (nearby gyms)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Coarse Location</td>
                      <td className="py-3 px-5 text-slate-300">No (we use precise when permitted)</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Purchase History</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality (bookings / credits)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Product Interaction</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Advertising Data</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                      <td className="py-3 px-5 text-slate-500">—</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Device ID</td>
                      <td className="py-3 px-5">{renderBadge("Yes (push notification token)")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Crash Data</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality / reliability</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Performance Data</td>
                      <td className="py-3 px-5">{renderBadge("Yes (basic)")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality / reliability</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-medium text-white">Other User Content (e.g. reviews, support)</td>
                      <td className="py-3 px-5">{renderBadge("Yes, if you submit it")}</td>
                      <td className="py-3 px-5">{renderBadge("Yes")}</td>
                      <td className="py-3 px-5">{renderBadge("No")}</td>
                      <td className="py-3 px-5 text-slate-300">App functionality / customer support</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                <strong className="text-white">Sign in with Apple:</strong> available on iOS alongside phone OTP and Google Sign-In. <strong className="text-white">Account deletion:</strong> Profile → Edit Profile → Delete my account (30-day hold), or email us.
              </p>
            </m.section>

            {/* 16. Changes to this Policy */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="changes" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  16
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  16. Changes to this Policy
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We may update this Policy. Material changes are shown by updating the “Last updated” date and, where appropriate, by in-app notice. Continued use after an update means you accept the revised Policy.
              </p>
            </m.section>

            {/* 17. Contact */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              id="contact" className="scroll-mt-28 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white/[0.04] to-blue-500/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-xl bg-[#D9A84E]/20 border border-[#D9A84E]/30 text-[#E6BC65] flex items-center justify-center font-bold text-sm">
                  17
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  17. Contact
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Privacy, deletion and grievance</p>
                  <a
                    href="mailto:collaborations@fitfare.in"
                    className="text-white hover:text-[#D9A84E] font-semibold text-base transition-colors flex items-center gap-2"
                  >
                    <Mail size={16} className="text-[#D9A84E]" />
                    collaborations@fitfare.in
                  </a>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Support & Phone</p>
                  <a
                    href="tel:+917666400518"
                    className="text-white hover:text-[#D9A84E] font-semibold text-base transition-colors flex items-center gap-2"
                  >
                    <Phone size={16} className="text-[#D9A84E]" />
                    +91 7666400518
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
                <span>See also related policies:</span>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/terms-and-conditions"
                    className="text-slate-300 hover:text-[#D9A84E] transition-colors underline font-medium"
                  >
                    Terms of Service
                  </Link>
                  <span>·</span>
                  <Link
                    to="/cancellation-refunds"
                    className="text-slate-300 hover:text-[#D9A84E] transition-colors underline font-medium"
                  >
                    Cancellation &amp; Refunds
                  </Link>
                  <span>·</span>
                  <Link
                    to="/contact"
                    className="text-slate-300 hover:text-[#D9A84E] transition-colors underline font-medium"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </m.section>

          </main>
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
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
