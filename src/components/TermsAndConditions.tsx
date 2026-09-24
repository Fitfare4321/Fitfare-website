"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FileText, ShieldCheck, Clock, ArrowRight } from "lucide-react";

const sections = [
  {
    title: "1. Agreement to Terms",
    content: `These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and FitFare ("Company", "we", "our", or "us") governing your access to and use of the FitFare platform, website, and related services (collectively, the "Services").

By accessing or using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must immediately discontinue use of the Services.`,
  },
  {
    title: "2. Eligibility",
    content: `You must be at least 18 years of age to use the Services. By using FitFare, you represent and warrant that you have the legal capacity to enter into this agreement and comply with all applicable laws and regulations.`,
  },
  {
    title: "3. User Accounts and Security",
    content: `To access certain features, you may be required to create an account. You agree to:

(a) Provide accurate and complete information;
(b) Maintain the confidentiality of your login credentials;
(c) Accept responsibility for all activities occurring under your account.

We reserve the right to suspend or terminate accounts that violate these Terms.`,
  },
  {
    title: "4. Memberships, Fees, and Payments",
    content: `All membership fees, subscription charges, and one-time payments must be paid in advance. Payments are processed through secure third-party payment providers.

Unless otherwise stated:
(a) Fees are non-refundable;
(b) Subscriptions automatically renew unless cancelled prior to renewal;
(c) Promotional pricing may be subject to additional conditions.`,
  },
  {
    title: "5. Assumption of Risk",
    content: `Participation in fitness activities involves inherent risks, including but not limited to bodily injury, illness, or death.

By using the Services and accessing partner facilities, you voluntarily assume all risks associated with physical exercise and agree that FitFare shall not be liable for injuries or damages arising from such activities.`,
  },
  {
    title: "6. Limitation of Liability",
    content: `To the fullest extent permitted by law, FitFare shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, or goodwill arising from your use of the Services.

Our total liability shall not exceed the amount paid by you to FitFare in the twelve (12) months preceding the claim.`,
  },
  {
    title: "7. Indemnification",
    content: `You agree to indemnify and hold harmless FitFare, its officers, employees, affiliates, and partners from any claims, damages, liabilities, costs, or expenses arising out of your misuse of the Services or violation of these Terms.`,
  },
  {
    title: "8. Termination",
    content: `We reserve the right to suspend or terminate your access to the Services at our sole discretion, without notice, if we believe you have violated these Terms or applicable laws.`,
  },
  {
    title: "9. Governing Law and Jurisdiction",
    content: `These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction in which FitFare operates, without regard to conflict of law principles.

Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts within that jurisdiction.`,
  },
  {
    title: "10. Modifications",
    content: `We reserve the right to update or modify these Terms at any time. Continued use of the Services following any changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: "11. Contact Information",
    content: `For legal inquiries regarding these Terms, please contact:

info@fitfare.in`,
  },
];

const TermsAndConditions = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? "bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),transparent_35%),linear-gradient(180deg,#020817_0%,#0f172a_100%)] text-slate-100"
          : "bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.14),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)] text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-[30px] border p-8 sm:p-10 ${
            isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white/80"
          }`}
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <FileText className="h-7 w-7" />
            </div>
          </div>

          <h1 className="text-center text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Terms & Conditions
          </h1>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
            <Clock className="h-4 w-4" />
            <span>Last updated: January 2026</span>
          </div>

          <div
            className={`mt-8 rounded-2xl border p-5 text-left text-sm leading-7 ${
              isDark ? "border-blue-500/20 bg-blue-500/5 text-slate-300" : "border-blue-200 bg-blue-50 text-slate-700"
            }`}
          >
            <div className="mb-2 flex items-center gap-2 text-blue-500">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-semibold">Important notice</span>
            </div>
            These Terms explain how FitFare operates, your rights and responsibilities as a user, and the conditions governing access to our platform and partner gym services.
          </div>
        </motion.header>

        <div className="mt-10 space-y-6">
          {sections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className={`rounded-[24px] border p-6 sm:p-7 ${
                isDark ? "border-slate-800 bg-slate-900/75" : "border-slate-200 bg-white/80"
              }`}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold sm:text-xl">{section.title}</h2>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              <p className={`whitespace-pre-line text-sm leading-8 sm:text-[15px] ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {section.content}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;