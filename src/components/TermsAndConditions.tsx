"use client";

import { useTheme } from "next-themes";
import { FileText, Clock } from "lucide-react";
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

comms@fitfare.in`,
    },
];

const TermsAndConditions = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`min-h-screen pt-24 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
                }`}
        >
            <div className="max-w-3xl mx-auto px-6 pb-24">

                {/* ===== Centered Heading Section ===== */}
                <div
                    className={`rounded-xl border p-8 mb-12 text-center mt-8 ${isDark
                        ? "bg-slate-900 border-slate-800"
                        : "bg-white border-slate-200"
                        }`}
                >
                    {/* Centered Icon */}
                    <div
                        className={`mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-xl ${isDark
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                            }`}
                    >
                        <FileText size={24} />
                    </div>

                    {/* Title */}
                    <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
                        Terms & Conditions
                    </h1>

                    {/* Last Updated */}
                    <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <Clock size={14} />
                        <span>Last updated: January 2026</span>
                    </div>

                    {/* Info Notice */}
                    <div
                        className={`mt-6 rounded-lg border p-4 text-sm text-left ${isDark
                            ? "bg-blue-500/5 border-blue-500/20 text-slate-300"
                            : "bg-blue-50 border-blue-200 text-slate-700"
                            }`}
                    >
                        These Terms explain how FitFare operates, your rights and responsibilities
                        as a user, and the conditions governing access to our platform and partner
                        gym services.
                    </div>
                </div>
                {/* ===== Content ===== */}
                <div className="space-y-10">
                    {sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-[18px] font-semibold mb-3">
                                {section.title}
                            </h2>

                            <p className="text-[15px] leading-7 text-slate-600 dark:text-slate-400 whitespace-pre-line">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TermsAndConditions;