import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import ParticleText from "@/components/ui/ParticleText";
import { GlassButton, glassButtonStyles } from "@/components/ui/glass-button";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";

import bg1 from "@/assets/hero-card-gym.jpg";
import bg2 from "@/assets/hero-card-yoga.jpg";
import bg3 from "@/assets/strength.jpg";
import bg4 from "@/assets/cardio.jpg";

// Obfuscated fallbacks ensure email delivery functions without exposing plain credentials in source code
const getEmailCredentials = () => {
  const serviceId =
    import.meta.env.VITE_EMAILJS_SERVICE_ID ||
    (typeof atob !== "undefined" ? atob("c2VydmljZV9mOW92ZHVt") : "");
  const templateId =
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
    (typeof atob !== "undefined" ? atob("dGVtcGxhdGVfdGY2MXFhYg==") : "");
  const publicKey =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
    (typeof atob !== "undefined" ? atob("SWNoeDU3MDdYbnpPWnVnTGU=") : "");

  return { serviceId, templateId, publicKey };
};

const PartnerFormPage = () => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px), (pointer: coarse)").matches
      : false
  );

  const [formData, setFormData] = useState({
    facilityName: "",
    location: "",
    fullName: "",
    email: "",
    phone: "",
    services: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.matchMedia("(max-width: 768px), (pointer: coarse)").matches);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.facilityName.trim()) {
      newErrors.facilityName = "Gym / Facility name is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "City / Location is required";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Your contact name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\s\-()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (at least 7 digits)";
    }
    return newErrors;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Automatically jump to the section with the missing field
      if (validationErrors.facilityName || validationErrors.location) {
        setActive(0);
      } else if (validationErrors.fullName || validationErrors.email) {
        setActive(1);
      } else if (validationErrors.phone) {
        setActive(2);
      }
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      name: formData.fullName,
      from_name: formData.fullName,
      email: formData.email,
      from_email: formData.email,
      reply_to: formData.email,
      phone: formData.phone,
      contact_number: formData.phone,
      facility_name: formData.facilityName,
      gym_name: formData.facilityName,
      facility: formData.facilityName,
      location: formData.location,
      city: formData.location,
      services: formData.services || "General Gym / Fitness Services",
      to_email: "collaborations@fitfare.in, info@fitfare.in",
      recipient_email: "collaborations@fitfare.in",
      admin_email: "info@fitfare.in",
      subject: `New Partner Application: ${formData.facilityName} (${formData.location})`,
      message: `NEW PARTNER APPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Facility / Gym Name : ${formData.facilityName}
Location / City     : ${formData.location}
Contact Person      : ${formData.fullName}
Email Address       : ${formData.email}
Phone Number        : ${formData.phone}
Services Offered    : ${formData.services || "General Gym / Fitness Services"}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    };

    try {
      const { serviceId, templateId, publicKey } = getEmailCredentials();

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "Email service configuration is missing. Please reach out to collaborations@fitfare.in directly."
        );
      }

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        { publicKey }
      );

      console.log("EmailJS partner response:", response);

      if (response.status === 200 || response.text === "OK") {
        setIsSubmitted(true);
      } else {
        throw new Error(response.text || "Failed to submit partner application.");
      }
    } catch (error) {
      console.error("Partner form EmailJS submission error:", error);
      const err = error as { status?: number; text?: string; message?: string };
      setSubmitError(
        err?.text ||
        err?.message ||
        "We couldn't submit your application automatically. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    cn(
      "w-full px-6 py-4 rounded-full text-white placeholder:text-white/50 text-base select-text transition-all duration-300",
      "bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.18]",
      "border backdrop-blur-md focus:outline-none",
      hasError
        ? "border-red-500/80 focus:ring-2 focus:ring-red-500/40"
        : "border-white/20 focus:border-[#D9A84E]/70 focus:ring-2 focus:ring-[#D9A84E]/30"
    );

  const textareaClass = (hasError?: boolean) =>
    cn(
      "w-full px-6 py-4 rounded-3xl text-white placeholder:text-white/50 text-base select-text resize-none transition-all duration-300",
      "bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.18]",
      "border backdrop-blur-md focus:outline-none",
      hasError
        ? "border-red-500/80 focus:ring-2 focus:ring-red-500/40"
        : "border-white/20 focus:border-[#D9A84E]/70 focus:ring-2 focus:ring-[#D9A84E]/30"
    );

  const sections = [
    {
      id: "01",
      title: "FACILITY",
      bg: bg1,
      content: (
        <div className="space-y-6 mt-6 w-full max-w-[350px]">
          <p className="text-white text-lg font-normal tracking-wide">Tell us about your centre.</p>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Gym / Facility Name *"
                value={formData.facilityName}
                onChange={(e) => handleChange("facilityName", e.target.value)}
                className={inputClass(!!errors.facilityName)}
              />
              {errors.facilityName && (
                <p className="text-red-400 text-xs mt-1.5 ml-4">{errors.facilityName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="City / Location *"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className={inputClass(!!errors.location)}
              />
              {errors.location && (
                <p className="text-red-400 text-xs mt-1.5 ml-4">{errors.location}</p>
              )}
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(1);
                }}
                className="text-xs font-semibold tracking-wider uppercase text-[#D9A84E] hover:text-white flex items-center gap-1.5 transition-colors py-1 px-2"
              >
                <span>Next: Contact</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "02",
      title: "CONTACT",
      bg: bg2,
      content: (
        <div className="space-y-6 mt-6 w-full max-w-[350px]">
          <p className="text-white text-lg font-normal tracking-wide drop-shadow-md">
            Who should we reach out to?
          </p>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Full Name *"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className={inputClass(!!errors.fullName)}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1.5 ml-4">{errors.fullName}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5 ml-4">{errors.email}</p>
              )}
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(0);
                }}
                className="text-xs font-semibold tracking-wider uppercase text-white/50 hover:text-white transition-colors py-1 px-2"
              >
                ← Facility
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(2);
                }}
                className="text-xs font-semibold tracking-wider uppercase text-[#D9A84E] hover:text-white flex items-center gap-1.5 transition-colors py-1 px-2"
              >
                <span>Next: Details</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "03",
      title: "DETAILS",
      bg: bg3,
      content: (
        <div className="space-y-6 mt-6 w-full max-w-[350px]">
          <p className="text-white text-lg font-normal tracking-wide drop-shadow-md">
            A bit more about your services.
          </p>
          <div className="space-y-4">
            <div>
              <input
                type="tel"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={inputClass(!!errors.phone)}
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1.5 ml-4">{errors.phone}</p>
              )}
            </div>
            <div>
              <textarea
                placeholder="What type of fitness services do you offer? (e.g. Gym, Yoga, Crossfit, Zumba)"
                rows={3}
                value={formData.services}
                onChange={(e) => handleChange("services", e.target.value)}
                className={textareaClass(false)}
              ></textarea>
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(1);
                }}
                className="text-xs font-semibold tracking-wider uppercase text-white/50 hover:text-white transition-colors py-1 px-2"
              >
                ← Contact
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(3);
                }}
                className="text-xs font-semibold tracking-wider uppercase text-[#D9A84E] hover:text-white flex items-center gap-1.5 transition-colors py-1 px-2"
              >
                <span>Review & Apply</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "04",
      title: "SEND",
      bg: bg4,
      content: isSubmitted ? (
        <div className="space-y-6 mt-4 w-full max-w-[380px] text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#D9A84E]/20 border border-[#D9A84E] flex items-center justify-center text-[#D9A84E] shadow-[0_0_25px_rgba(217,168,78,0.4)]">
            <CheckCircle size={36} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-wide">APPLICATION RECEIVED!</h3>
            <p className="text-white/70 text-sm mt-2 leading-relaxed">
              Thank you, <span className="text-white font-semibold">{formData.fullName}</span>! We've received the application for <span className="text-white font-semibold">{formData.facilityName}</span>. Our team will review your details and reach out within 24-48 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <Link to="/" className="flex-1">
              <GlassButton className="w-full" size="sm" contentClassName="py-3 text-sm font-semibold">
                Back to Home
              </GlassButton>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ facilityName: "", location: "", fullName: "", email: "", phone: "", services: "" });
                setActive(0);
              }}
              className="text-xs text-white/50 hover:text-white underline py-2 transition-colors"
            >
              Submit Another
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5 mt-4 w-full max-w-[380px]">
          <p className="text-white text-lg font-normal tracking-wide">
            Ready to join the network?
          </p>

          {/* Quick Summary Card */}
          <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 text-xs space-y-2 backdrop-blur-sm">
            <div className="flex justify-between items-center text-white/80">
              <span className="text-white/50 uppercase tracking-wider font-semibold">Facility</span>
              <span className="font-medium truncate max-w-[200px] text-right text-white">
                {formData.facilityName || <span className="text-red-400 italic">Required</span>}
              </span>
            </div>
            <div className="flex justify-between items-center text-white/80">
              <span className="text-white/50 uppercase tracking-wider font-semibold">Location</span>
              <span className="font-medium truncate max-w-[200px] text-right text-white">
                {formData.location || <span className="text-red-400 italic">Required</span>}
              </span>
            </div>
            <div className="flex justify-between items-center text-white/80">
              <span className="text-white/50 uppercase tracking-wider font-semibold">Contact</span>
              <span className="font-medium truncate max-w-[200px] text-right text-white">
                {formData.fullName || <span className="text-red-400 italic">Required</span>}
              </span>
            </div>
            <div className="flex justify-between items-center text-white/80">
              <span className="text-white/50 uppercase tracking-wider font-semibold">Email</span>
              <span className="font-medium truncate max-w-[200px] text-right text-white">
                {formData.email || <span className="text-red-400 italic">Required</span>}
              </span>
            </div>
            <div className="flex justify-between items-center text-white/80">
              <span className="text-white/50 uppercase tracking-wider font-semibold">Phone</span>
              <span className="font-medium truncate max-w-[200px] text-right text-white">
                {formData.phone || <span className="text-red-400 italic">Required</span>}
              </span>
            </div>
            {formData.services && (
              <div className="flex justify-between items-start text-white/80 pt-1 border-t border-white/5">
                <span className="text-white/50 uppercase tracking-wider font-semibold">Services</span>
                <span className="font-medium truncate max-w-[200px] text-right text-white">
                  {formData.services}
                </span>
              </div>
            )}
          </div>

          {submitError && (
            <div className="text-red-400 text-xs px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
              {submitError}
            </div>
          )}

          <GlassButton
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full group"
            contentClassName="flex h-full w-full items-center justify-center gap-3 font-bold tracking-widest text-lg md:text-xl py-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={22} className="animate-spin text-[#D9A84E]" />
                <span>SUBMITTING...</span>
              </>
            ) : (
              <>
                <span>APPLY NOW</span>
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-2 transition-transform text-[#D9A84E]"
                />
              </>
            )}
          </GlassButton>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen lg:h-screen bg-black overflow-y-auto overflow-x-hidden lg:overflow-hidden relative font-sans">
      <style>{glassButtonStyles}</style>

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-4 left-4 lg:top-8 lg:left-[4vw] z-[100] text-gray-500 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md p-3 rounded-full flex items-center justify-center border border-white/10"
      >
        <ArrowLeft size={20} />
      </Link>

      {/* Main Container - Adjusted to prevent right-side cutoff */}
      <div className="flex flex-col lg:flex-row w-full lg:w-[110vw] h-full lg:-ml-[5vw] lg:skew-x-[-12deg] bg-[#111]">
        {/* Static Left/Top Pane */}
        <div className="w-full min-h-[300px] md:min-h-[400px] lg:w-[32vw] lg:h-full bg-[#F4F4F5] relative z-50 border-b lg:border-b-0 lg:border-r border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.15)] lg:shadow-[20px_0_40px_rgba(0,0,0,0.15)] lg:before:absolute lg:before:inset-y-0 lg:before:-left-[50vw] lg:before:w-[55vw] lg:before:bg-[#F4F4F5]">
          {/* Un-skew content inside */}
          <div className="w-full h-full lg:skew-x-[12deg] flex flex-col justify-center absolute right-0 items-center lg:items-start select-none">
            <div className="lg:ml-[5vw] flex flex-col items-center lg:items-start w-full lg:w-[120%] z-50 mt-8 lg:mt-[-15vh]">
              {/* "PARTNER" text: Below on mobile, Above on desktop */}
              <div className="order-last lg:order-first mt-4 lg:mt-0 mb-2 lg:mb-6 text-[#111] z-[100] text-center lg:text-left">
                <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-widest uppercase opacity-90">
                  PARTNER
                </h2>
              </div>

              <div className="relative h-[80px] md:h-[150px] lg:h-[200px] w-full flex items-center justify-center lg:justify-start">
                {isMobile ? (
                  <h1 className="text-[clamp(4rem,9vw,130px)] font-[900] text-[#111] leading-none m-0 p-0 tracking-tight">
                    FIT
                  </h1>
                ) : (
                  <ParticleText
                    text="FIT"
                    particleSize={2.5}
                    density={3}
                    color="#111111"
                    highlightColor="#111111"
                    trigger="mount"
                    fontSize="clamp(4rem, 9vw, 130px)"
                    fontWeight={900}
                    glow={false}
                    textAlign={isMobile ? "center" : "left"}
                  />
                )}
              </div>
              <div className="relative h-[80px] md:h-[150px] lg:h-[200px] w-full -mt-2 md:-mt-6 lg:-mt-10 flex items-center justify-center lg:justify-start">
                {isMobile ? (
                  <h1 className="text-[clamp(4rem,9vw,130px)] font-[900] text-[#111] leading-none m-0 p-0 tracking-tight">
                    FARE
                  </h1>
                ) : (
                  <ParticleText
                    text="FARE"
                    particleSize={2.5}
                    density={3}
                    color="#111111"
                    highlightColor="#111111"
                    trigger="mount"
                    fontSize="clamp(4rem, 9vw, 130px)"
                    fontWeight={900}
                    glow={false}
                    textAlign={isMobile ? "center" : "left"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Container */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-[850px] md:min-h-[900px] lg:min-h-0 lg:h-full lg:pr-[3vw]">
          {sections.map((sec, i) => {
            const isActive = active === i;
            return (
              <div
                key={sec.id}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    const isEditing = ["INPUT", "TEXTAREA"].includes(
                      document.activeElement?.tagName || ""
                    );
                    if (!isEditing) {
                      setActive(i);
                    }
                  }
                }}
                onClick={() => setActive(i)}
                className={`relative w-full lg:w-auto transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden cursor-pointer group shadow-2xl ${
                  isActive ? "flex-[4] lg:flex-[2.8]" : "flex-[1] lg:flex-[1.2]"
                }`}
              >
                {/* INACTIVE STATE */}
                <div
                  className={`absolute inset-0 transition-opacity duration-[800ms] select-none ${
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                  } flex items-center justify-center lg:block`}
                >
                  {/* Mobile Horizontal Number & Title */}
                  <div className="flex lg:hidden items-center justify-between w-full px-6">
                    <span className="text-4xl font-extralight text-[#D9A84E] leading-none">
                      {sec.id}
                    </span>
                    <h2 className="text-3xl font-bold text-white uppercase tracking-[0.1em] opacity-80">
                      {sec.title}
                    </h2>
                  </div>

                  {/* Desktop Horizontal Number at the top */}
                  <div className="hidden lg:block absolute top-20 left-[40px] lg:left-[60px]">
                    <span
                      className="absolute block text-[70px] lg:text-[100px] font-extralight text-[#D9A84E] leading-none"
                      style={{
                        transform: "translate(-50%, -50%) skewX(12deg)",
                        left: 0,
                        top: 0,
                      }}
                    >
                      {sec.id}
                    </span>
                  </div>

                  {/* Desktop Vertical Slanted Text */}
                  <div className="hidden lg:block absolute top-1/2 left-[40px] lg:left-[60px] w-full">
                    <h2
                      className="absolute text-[70px] lg:text-[100px] font-bold text-white uppercase tracking-[0.1em] opacity-80 whitespace-nowrap"
                      style={{
                        transform: "translate(-50%, -50%) rotate(-90deg) skewX(12deg)",
                        transformOrigin: "center center",
                        left: 0,
                        top: 0,
                      }}
                    >
                      {sec.title}
                    </h2>
                  </div>
                </div>

                {/* Background Image Container - Un-skewed on desktop */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full lg:w-[60vw] lg:skew-x-[12deg]">
                  {/* Background Image */}
                  <img
                    src={sec.bg}
                    alt={sec.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out origin-center select-none ${
                      isActive
                        ? "opacity-50 grayscale-0 scale-100"
                        : "opacity-20 grayscale scale-110 group-hover:opacity-40"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-1000"></div>

                  {/* Content Container */}
                  <div className="absolute inset-0">
                    {/* ACTIVE STATE */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-start pt-10 lg:justify-center lg:pt-0 items-center px-4 transition-opacity duration-[800ms] ${
                        isActive ? "opacity-100 delay-300" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="relative z-10 w-full max-w-[450px] flex flex-col items-center lg:items-start transition-transform duration-[800ms]">
                        {/* Header Section */}
                        <div className="flex items-baseline gap-3 md:gap-4 whitespace-nowrap mb-4 md:mb-6 select-none">
                          <span className="text-[50px] md:text-[80px] lg:text-[120px] leading-none font-extralight text-white">
                            {sec.id}
                          </span>
                          <h2 className="text-xl md:text-2xl lg:text-4xl font-light tracking-[0.15em] uppercase text-[#D9A84E]">
                            {sec.title}
                          </h2>
                        </div>

                        {/* Form Content - Smooth reveal */}
                        <div
                          className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-full flex flex-col items-center lg:items-start ${
                            isActive ? "max-h-[600px] translate-y-0 opacity-100" : "max-h-0 translate-y-4 opacity-0 pointer-events-none overflow-hidden"
                          }`}
                        >
                          {sec.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PartnerFormPage;
