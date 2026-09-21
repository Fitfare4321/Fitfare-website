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
  CheckCircle2,
} from "lucide-react";

const highlights = [
  "Zero data selling",
  "Secure account handling",
  "Transparent processing",
];

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
      "Account details (name, phone, email, gender, date of birth, profile photo, city, preferred activities); phone OTP or Google Sign-In via Google/Firebase (we never receive your Google password); location when permitted; bookings, check-ins, Fit Credits, favourites and reviews; payment confirmation via Razorpay (card/UPI secrets are never stored by FitFare); push notification device ID; camera for QR check-in and photos for profile picture; basic device logs; support messages.",
  },
  {
    icon: Lock,
    title: "3. Data we collect — Partner app (Part B)",
    content:
      "Business contact details; KYC documents (Aadhaar, Passport or Driving Licence, PAN, and business registration); bank account details for payouts (verified via our payment partner); centre listings, bookings, attendance and payouts; push notification device ID; camera and photos for documents; crash reports. Partners receive only limited booking details needed to honour a visit and may not reuse user data.",
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
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? "bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),transparent_35%),linear-gradient(180deg,#020817_0%,#0f172a_100%)] text-white"
          : "bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)] text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            <Shield className="h-4 w-4" />
            Privacy commitment
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>

          <p className={`mt-4 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Last Updated • 30 July 2026
          </p>

          <div
            className={`mx-auto mt-8 max-w-3xl rounded-[28px] border p-6 shadow-2xl shadow-blue-950/10 backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-white/5 text-slate-300"
                : "border-slate-200 bg-white/70 text-slate-600"
            }`}
          >
            <div className="mb-3 flex items-center justify-center gap-2 text-blue-500">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">Your privacy is our priority</span>
            </div>
            <p className="text-sm leading-7 sm:text-base">
              At <strong>FitFare</strong>, trust is earned. This policy covers the FitFare user app,
              partner app, and website, and explains how we collect, process, and protect your data.
            </p>
          </div>
        </motion.header>

        <div className="mb-14 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item}
              className={`rounded-2xl border p-4 text-center text-sm font-medium ${
                isDark
                  ? "border-slate-800 bg-slate-900/70 text-slate-200"
                  : "border-slate-200 bg-white/80 text-slate-700"
              }`}
            >
              <div className="mb-2 flex justify-center">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
              </div>
              {item}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className={`rounded-[26px] border p-6 shadow-xl backdrop-blur-sm sm:p-8 ${
                    isDark
                      ? "border-slate-800 bg-slate-900/80"
                      : "border-slate-200 bg-white/80"
                  }`}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold tracking-tight sm:text-xl">{section.title}</h2>
                  </div>

                  <p className={`text-sm leading-8 sm:text-[15px] ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    {section.content}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
