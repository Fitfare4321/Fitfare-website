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
    icon: Shield,
    title: "1. What this policy covers",
    content:
      "One policy covers all FitFare products: Part A — the FitFare user app (booking gyms and Fit Credits); Part B — the FitFare Partner app (gym and studio owners); Part C — this website. The full sectioned policy, including the Google Play data-safety mapping, is at /legal/privacy-policy.html.",
  },
  {
    icon: Database,
    title: "2. Data we collect — user app (Part A)",
    content:
      "Account details (name, phone, email, gender, date of birth, profile photo, city, preferred activities); Firebase phone OTP or Google Sign-In; location when permitted, to show nearby gyms and distance; bookings, slots, QR check-ins, Fit Credit lots, escrow and transfers, favourites, reviews and searches; payment metadata via Razorpay (card, UPI and net-banking credentials are never stored by FitFare); FCM device tokens for transactional push; camera for QR scanning and photo access for your profile picture; basic device and error diagnostics; support messages you send.",
  },
  {
    icon: Lock,
    title: "3. Data we collect — Partner app (Part B)",
    content:
      "Business contact details; KYC documents (Aadhaar, Passport or Driving Licence, PAN, and business registration such as GST, Shops & Establishment, Udyam or incorporation papers); bank account holder, account number (encrypted at rest) and IFSC, verified through a RazorpayX penny-drop; centre listings, photos, pricing, slots, bookings received, attendance records and payout statements; FCM tokens; camera and photo access for document capture; Firebase Crashlytics diagnostics. Partners receive only the limited booking details needed to honour a visit and may not reuse user data.",
  },
  {
    icon: Settings,
    title: "4. How we use your data",
    content:
      "To create and secure your account, show nearby centres, process bookings and Fit Credits, take payments and issue refunds, verify Partner identity and pay out earnings, send transactional alerts you allow, prevent fraud, provide support, fix bugs, and comply with law. We do not sell personal data and do not use it for third-party advertising.",
  },
  {
    icon: Eye,
    title: "5. Sharing & processors",
    content:
      "Firebase and Google (auth, push, remote config, Crashlytics), Supabase (database and document storage), our cloud API hosting, Razorpay and RazorpayX (payments, refunds, bank verification and payouts), maps when you open directions, Partner gyms (limited booking details only), our email provider for website enquiries, and authorities when legally required. Providers act on our instructions and cannot use your data for their own purposes.",
  },
  {
    icon: Lock,
    title: "6. Security, retention & deletion",
    content:
      "HTTPS in transit, token-based authentication, encryption at rest for Partner bank fields, restricted KYC storage and role-based admin access. Users can delete an account in the app (Profile → Edit Profile → Delete my account) with a 30-day hold — sign in again within 30 days to keep it, otherwise identifiers are permanently deleted or anonymised. Partners can request deletion in-app or by email; financial and KYC records are retained where law requires.",
  },
  {
    icon: Shield,
    title: "7. Your rights (including DPDP)",
    content:
      "Subject to law, you may access or correct your data, request erasure, withdraw consent by revoking location, camera, photo or notification permissions in device settings, nominate someone to exercise your rights, and raise a grievance. FitFare is for people aged 18 and over.",
  },
  {
    icon: Mail,
    title: "8. Contact",
    content:
      "Privacy, deletion and grievance: collaborations@fitfare.in · Phone: +91 7666400518. Full policy (authoritative HTML, used for Google Play): https://fitfare.in/legal/privacy-policy.html",
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
            Last Updated • 30 July 2026
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
              At <strong>FitFare</strong>, we believe trust is earned. One policy
              covers the FitFare user app, the FitFare Partner app, and this
              website. For the complete sectioned disclosure used for Google
              Play, see our full policy at /legal/privacy-policy.html.
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