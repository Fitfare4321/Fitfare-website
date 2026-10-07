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
  { id: "common", label: "1. Common terms", short: "Common terms" },
  { id: "users", label: "2. Part A — User terms", short: "User terms" },
  { id: "partners", label: "3. Part B — Partner terms", short: "Partner terms" },
  { id: "website", label: "4. Part C — Website terms", short: "Website terms" },
  { id: "legal", label: "5. Liability, disputes & governing law", short: "Legal" },
];

const TermsAndConditionsPage: React.FC = () => {
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
        title="FitFare — Terms of Service"
        description="FitFare Terms of Service covering the FitFare user app, FitFare Partner app, and fitfare.in website. Read our comprehensive rules, eligibility, cancellations, and booking policies."
        canonical="https://fitfare.in/terms-and-conditions"
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
            <img src="/discipline-statue-v2.jpg" alt="Perfection" className="absolute inset-0 w-full h-full object-cover object-[70%_20%] opacity-50" />
            
            {/* FOCUS Text layered between image and gradient */}
            <div className="absolute inset-y-0 right-4 lg:right-8 xl:right-12 flex items-center justify-center z-10 pointer-events-none mix-blend-screen opacity-60">
               <span className="[writing-mode:vertical-rl] text-[8vh] sm:text-[10vh] lg:text-[12vh] font-sans font-black text-white tracking-widest uppercase">
                 Discipline
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
                  Terms of<br />Service
                </h1>
                <p className="text-white/50 tracking-[0.2em] text-xs uppercase font-medium">FitFare Legal / 2026</p>
             </m.div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-[60%] xl:w-[65%] lg:ml-auto bg-black min-h-screen relative z-0">
          
          <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20 pt-20 lg:pt-32 pb-32 relative z-10">
            <div className="flex flex-col">
              
{/* 1. Common terms */}
<m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} id="common" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]">
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">01</span>
    <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
  </div>
  <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
    <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
      <span className="text-white/30 hidden sm:inline">「</span>
      <span>Common terms</span>
      <span className="text-white/30 hidden sm:inline">」</span>
    </h2>
    <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words">Common terms</div>
    <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
      
      <h3 className="text-xl font-medium text-white mb-2">1.1 What FitFare is</h3>
      <p>FitFare is a marketplace that connects users with independent gyms, studios, and fitness centres (“Partners”). FitFare facilitates discovery, booking, check-in, and payment. <strong className="text-white">FitFare does not own or operate the facilities</strong> and is not the provider of the fitness services delivered at a Partner centre.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">1.2 Eligibility &amp; accounts</h3>
      <ul className="space-y-4 list-disc list-inside">
        <li>You must be 18 or older (or the age of majority in your jurisdiction) and legally able to enter a contract.</li>
        <li>Provide accurate information and keep it current. You are responsible for activity under your account and for keeping your device and OTP access secure.</li>
        <li>One person or business per account, unless we agree otherwise in writing. Accounts are not transferable.</li>
      </ul>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">1.3 Acceptable use</h3>
      <p>You must not: submit false information or impersonate anyone; abuse OTP, referral, or credit systems; scrape, reverse-engineer, or interfere with the platform; upload unlawful, infringing, or harmful content; harass staff, Partners, or other users; or circumvent FitFare to avoid fees.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">1.4 Content you submit</h3>
      <p>You keep ownership of content you upload (reviews, photos, listings). You grant FitFare a non-exclusive, worldwide, royalty-free licence to host, display, and distribute that content for the purpose of operating and promoting the service. Content must be your own or properly licensed. We may remove content that breaches these Terms or the law.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">1.5 Notifications &amp; communications</h3>
      <p>We send transactional messages — booking confirmations, credit events, verification and account alerts — by push notification, SMS, or email. These are part of the service. You may disable push notifications in device settings, but essential service messages may still be sent.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">1.6 Suspension &amp; termination</h3>
      <p>We may suspend or terminate access immediately for fraud, security risk, non-payment, legal reasons, or breach of these Terms. You may stop using FitFare at any time and delete your account as described in the <Link to="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">1.7 Changes</h3>
      <p>We may update these Terms. Material changes take effect when posted with an updated date and, where appropriate, in-app notice. Continued use means acceptance.</p>
    </div>
  </div>
</m.div>

{/* 2. Part A — User terms */}
<m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} id="users" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]">
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">02</span>
    <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
  </div>
  <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
    <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
      <span className="text-white/30 hidden sm:inline">「</span>
      <span>Part A — User terms</span>
      <span className="text-white/30 hidden sm:inline">」</span>
    </h2>
    <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words">Part A — User terms</div>
    <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
      <h3 className="text-xl font-medium text-white mb-2">2.1 Bookings</h3>
      <ul className="space-y-4 list-disc list-inside">
        <li>A booking is confirmed only after payment or credit deduction succeeds and the app shows a confirmed status.</li>
        <li>Prices, slot availability, amenities, and access rules are set by the Partner. FitFare shows them in good faith but does not guarantee their accuracy.</li>
        <li>You must check in using the QR flow or as instructed by the Partner. Failing to check in may be treated as a no-show.</li>
        <li>You must follow the Partner’s rules, safety instructions, dress code, and timings while at the centre.</li>
      </ul>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">2.2 Fit Credits</h3>
      <ul className="space-y-4 list-disc list-inside">
        <li>Fit Credits are a prepaid balance usable only inside FitFare to book <strong className="text-white">physical visits</strong> at Partner gyms and studios (day-passes, sessions, and similar on-site services). They are <strong className="text-white">not legal tender, not a deposit, and not redeemable for cash</strong> except where the law requires. They do <strong className="text-white">not</strong> unlock digital content, games, media, or app features unrelated to a Partner visit.</li>
        <li>Credits are issued in lots that may carry an <strong className="text-white">expiry date</strong>, shown in the app. Expired credits are forfeited.</li>
        <li>When you book, the required credits are held in escrow and released to the Partner on successful check-in, or returned to you if the booking is cancelled or fails per policy.</li>
        <li><strong className="text-white">Transfers:</strong> you may send credits to another FitFare user by phone number or email. Transfers are final once completed — verify the recipient before sending. Transferred credits keep their original expiry rules unless stated otherwise.</li>
        <li>Credits obtained through error, promotion abuse, chargeback, or fraud may be reversed or cancelled.</li>
      </ul>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">2.3 Payments</h3>
      <p>Payments for Partner bookings and Fit Credit top-ups are processed by <strong className="text-white">Razorpay</strong>. These charges are for <strong className="text-white">physical fitness services at Partner venues</strong> (or prepaid credit redeemable only for those services), not for digital goods sold inside the app. Applicable taxes and gateway rules apply. FitFare does not store your card, UPI, or net-banking credentials.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">2.4 Cancellations &amp; refunds</h3>
      <ul className="space-y-4 list-disc list-inside">
        <li>Cancellation windows and refund eligibility are shown at checkout and in the <Link to="/cancellation-and-refunds" className="text-blue-400 hover:underline">Cancellation &amp; Refunds policy</Link>.</li>
        <li>Refunds are generally returned as Fit Credits; where a money refund is due, it is returned to the original payment method and gateway timelines apply.</li>
        <li>No-shows and late cancellations may be non-refundable.</li>
        <li>If a Partner cancels or cannot honour a confirmed booking, we will refund the credits or amount for that booking.</li>
      </ul>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">2.5 Reviews</h3>
      <p>Reviews must reflect genuine experience. No abusive, defamatory, discriminatory, or paid/fake reviews. Reviews appear publicly with your display name and may be removed if they breach these Terms.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">2.6 Health &amp; safety</h3>
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-sm text-slate-400">
        <strong className="text-amber-400">Important:</strong> Physical exercise carries risk. Consult a qualified doctor before starting any programme. FitFare does not provide medical advice, supervision, or training. Any wellness, nutrition, or assistant content in the app is general information only and is not a diagnosis or treatment plan. You participate at your own risk, and the Partner is responsible for on-site safety, equipment, and supervision.
      </div>
    </div>
  </div>
</m.div>

{/* 3. Part B — Partner terms */}
<m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} id="partners" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]">
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">03</span>
    <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
  </div>
  <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
    <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
      <span className="text-white/30 hidden sm:inline">「</span>
      <span>Part B — Partner terms</span>
      <span className="text-white/30 hidden sm:inline">」</span>
    </h2>
    <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words">Part B — Partner terms</div>
    <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
      <p>These apply to gyms, studios, and fitness businesses. Where you have signed a separate commercial Partner Agreement, that agreement prevails on commercial matters; these Terms govern app use.</p>
      
      <h3 className="text-xl font-medium text-white mb-2">3.1 Onboarding &amp; KYC</h3>
      <p>You must submit accurate identity, PAN, business registration, and bank details. FitFare and its payment partners may verify documents and bank accounts, including micro-deposit (“penny drop”) checks. False, expired, or incomplete information may result in rejection, withheld payouts, or suspension.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">3.2 Listings &amp; capacity</h3>
      <p>You must keep schedules, capacity, pricing, amenities, photos, and access rules accurate and current, and you must hold all licences, insurance, and permits required to operate.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">3.3 Honouring bookings</h3>
      <p>You must honour every confirmed FitFare booking and complete QR/attendance verification. Repeated denial of entry, unverified check-ins, or last-minute cancellations may reduce payout eligibility and affect your standing on the platform.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">3.4 Payments, commission &amp; payouts</h3>
      <ul className="space-y-4 list-disc list-inside">
        <li>User payments are collected by FitFare through its payment partners.</li>
        <li>Earnings are settled to your verified bank account on the schedule disclosed in-app, less FitFare’s platform commission, taxes, and adjustments.</li>
        <li>Settlements may be adjusted for refunds, chargebacks, unverified check-ins, fraud, or policy breaches, before or after a payout cycle.</li>
        <li>You are responsible for your own tax compliance, including GST where applicable.</li>
      </ul>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">3.5 Handling user data</h3>
      <p>You receive only the booking details needed to serve a visit. You must use them solely to deliver that service, keep them secure, and must <strong className="text-white">not</strong> market to, resell, export, or otherwise reuse FitFare user data without the user’s independent consent. This obligation survives termination.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">3.6 Prohibited conduct</h3>
      <p>No fraudulent listings or check-ins, no fee circumvention or off-platform diversion of FitFare users, no unsafe facilities, no misuse of customer data, and no illegal activity. FitFare may suspend access immediately for risk or policy breach.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">3.7 Responsibility for the facility</h3>
      <p>You are solely responsible for your premises, equipment, staff, trainers, hygiene, safety, and for any injury, loss, or dispute arising at your facility, and you will indemnify FitFare against claims arising from your operations or your breach of these Terms.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">3.8 Offboarding</h3>
      <p>Either party may end the relationship per the notice terms of the signed Partner Agreement, or by written notice if none applies. Outstanding lawful payouts remain payable after reconciliation. Data deletion follows the <Link to="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>.</p>
    </div>
  </div>
</m.div>

{/* 4. Part C — Website terms */}
<m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} id="website" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24 border-b border-white/[0.05]">
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">04</span>
    <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
  </div>
  <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
    <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
      <span className="text-white/30 hidden sm:inline">「</span>
      <span>Part C — Website terms</span>
      <span className="text-white/30 hidden sm:inline">」</span>
    </h2>
    <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words">Part C — Website terms</div>
    <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
      <p>Website content is provided for information only and may change without notice. FitFare branding, text, design, and graphics are our intellectual property and may not be copied or reused without permission. Information you submit through contact, partner enquiry, or careers forms is handled per the <Link to="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>.</p>
    </div>
  </div>
</m.div>

{/* 5. Liability, disputes & governing law */}
<m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} id="legal" className="flex gap-4 sm:gap-8 group scroll-mt-24 pt-8 pb-16 sm:pb-24">
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">05</span>
    <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors opacity-0"></div>
  </div>
  <div className="pb-16 flex-1 min-w-0 pt-1 sm:pt-3">
    <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
      <span className="text-white/30 hidden sm:inline">「</span>
      <span>Liability &amp; disputes</span>
      <span className="text-white/30 hidden sm:inline">」</span>
    </h2>
    <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words">Liability &amp; disputes</div>
    <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
      
      <h3 className="text-xl font-medium text-white mb-2">5.1 Service “as is”</h3>
      <p>FitFare is provided on an “as is” and “as available” basis. We do not warrant uninterrupted or error-free operation, or any particular fitness result.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">5.2 Limitation of liability</h3>
      <p>To the maximum extent permitted by law, FitFare is not liable for indirect, incidental, special, or consequential losses, or for loss of profits or data. Our total aggregate liability for any claim is limited to the amount you paid to FitFare for the transaction giving rise to the claim in the three months preceding it. Nothing limits liability that cannot be excluded by law.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">5.3 Third parties</h3>
      <p>FitFare is not responsible for the acts or omissions of Partners, payment gateways, or other third-party services, beyond our own obligations in these Terms.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">5.4 Disputes</h3>
      <p>Contact <a href="mailto:support@fitfare.in" className="text-blue-400 hover:underline">support@fitfare.in</a> with your booking id and date, and we will review within a reasonable business period. We encourage good-faith resolution before formal proceedings.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">5.5 Governing law</h3>
      <p>These Terms are governed by the laws of India, and courts in India have exclusive jurisdiction, subject to mandatory consumer protections available to you.</p>

      <h3 className="text-xl font-medium text-white mt-8 mb-2">5.6 Contact</h3>
      <p><a href="mailto:support@fitfare.in" className="text-blue-400 hover:underline">support@fitfare.in</a> · <a href="tel:+917666400518" className="text-blue-400 hover:underline">+91 7666400518</a></p>

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
    </div>
  );
};

export default TermsAndConditionsPage;
