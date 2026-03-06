"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Settings,
  Mail,
  Sparkles,
} from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content:
      "When you create an account or use FitFare, we may collect your name, email address, contact number, fitness preferences, booking history, and transaction details. We also gather limited technical data such as device type and usage behavior to enhance performance and security.",
  },
  {
    icon: Settings,
    title: "How We Use Your Data",
    content:
      "Your information enables us to manage gym access, process memberships, personalize recommendations, send essential service updates, and continuously improve the FitFare experience. We use data responsibly and only for legitimate business purposes.",
  },
  {
    icon: Lock,
    title: "Security & Protection",
    content:
      "We implement advanced encryption, secure HTTPS communication, controlled access systems, and routine monitoring to safeguard your information. Protecting your data is central to our platform’s integrity.",
  },
  {
    icon: Eye,
    title: "Data Sharing & Transparency",
    content:
      "We do not sell or rent your personal data. Information may be shared only with trusted partner gyms or verified service providers strictly to operate and deliver our services effectively.",
  },
  {
    icon: Shield,
    title: "Your Rights & Control",
    content:
      "You retain full control over your personal data. You may request access, updates, corrections, or deletion at any time. We are committed to honoring your privacy rights promptly and transparently.",
  },
  {
    icon: Mail,
    title: "Contact & Support",
    content:
      "If you have any questions about this Privacy Policy or your data, please contact our support team at team.fitfare@gmail.com We’re here to help.",
  },
];

export default function PrivacyPolicy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isDark
        ? "bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#020617] text-white"
        : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#ffffff] text-slate-900"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5 mt-10">
            <div className="p-3 rounded-xl bg-blue-600/10 backdrop-blur-sm border border-blue-500/20">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Privacy Policy
            </h1>
          </div>

          <p
            className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"
              }`}
          >
            Last Updated • January 2026
          </p>

          <div
            className={`mt-8 max-w-3xl mx-auto p-6 rounded-2xl backdrop-blur-xl border ${isDark
              ? "bg-white/5 border-white/10 text-slate-300"
              : "bg-white/70 border-slate-200 text-slate-600"
              }`}
          >
            <div className="flex items-center justify-center gap-2 mb-3 text-blue-500">
              <Sparkles size={16} />
              <span className="text-sm font-medium">
                Your Privacy is Our Commitment
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              At <strong>FitFare</strong>, we believe trust is earned. This policy
              explains how we collect, use, and protect your information while
              delivering a seamless fitness experience.
            </p>
          </div>
        </motion.div>

        {/* TRUST STRIP */}
        <div className="mb-16">
          <div className="rounded-2xl bg-blue-600 text-white py-4 px-8 flex flex-col md:flex-row justify-center gap-10 text-sm font-medium shadow-lg">
            <div className="flex items-center gap-2 justify-center">
              <Shield size={16} /> Zero Data Selling
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Lock size={16} /> End-to-End Security
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Eye size={16} /> Full Transparency
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-5xl mx-auto relative">

          {/* Vertical guide line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/40 to-transparent" />

          <div className="space-y-12 pl-10">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >


                  {/* Title */}
                  <div className="flex items-center gap-3 mb-6">
                    <Icon
                      className={`w-5 h-5 ${isDark ? "text-blue-400/80" : "text-blue-600/80"
                        }`}
                    />
                    <h2 className="text-[18px] font-semibold tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  {/* Content */}
                  <p
                    className={`text-[15px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                  >
                    {section.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}