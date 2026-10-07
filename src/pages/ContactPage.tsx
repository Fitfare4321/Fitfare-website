import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Send } from "lucide-react";
import { Link } from "react-router-dom";
import GlassButton from "@/components/ui/glass-button";
import PageSEO from "@/components/PageSEO";

const ContactPage = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 0 && name.trim()) {
      setStep(1);
    } else if (step === 1 && email.trim()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          // Reset form after a few seconds
          setStep(0);
          setName("");
          setEmail("");
          setIsSuccess(false);
        }, 3000);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-hidden">
      <PageSEO 
        title="Contact Us | FitFare"
        description="Get in touch with the FitFare team. We'd love to hear from you."
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

      {/* Dark Map Background */}
      <div 
        className="absolute inset-0 z-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: "url('/dark-map-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Map Pins / Location markers (as seen in the design) */}
      <div className="absolute top-[35%] right-[8%] lg:right-[15%] xl:right-[18%] z-0 pointer-events-none hidden md:block">
        
        <div className="relative flex items-center justify-center w-14 h-14">
          
          {/* Large faint outer ring */}
          <div className="absolute w-[350px] h-[350px] rounded-full border border-white/5" />
          
          {/* Stunning Radar Pulse Animation */}
          <m.div
            animate={{ scale: [0.8, 3], opacity: [0, 0.4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-[#dc2626]"
          />
          <m.div
            animate={{ scale: [0.8, 3], opacity: [0, 0.4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2.5 }}
            className="absolute inset-0 rounded-full border border-[#dc2626]"
          />

          {/* Clickable Map Pin */}
          <a 
            href="https://maps.google.com/?q=WeWork+Atrium+Place,+Udyog+Vihar,+Gurugram" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.4)] pointer-events-auto cursor-pointer hover:scale-110 hover:shadow-[0_0_50px_rgba(220,38,38,0.7)] transition-all duration-300 group"
          >
            <m.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MapPin size={24} className="text-[#dc2626] group-hover:text-red-400 transition-colors" strokeWidth={2.5} />
            </m.div>
          </a>
        </div>
      </div>
      
      {/* Secondary small faint circle (from design) */}
      <div className="absolute top-[45%] right-[25%] z-0 pointer-events-none hidden lg:block">
        <div className="w-12 h-12 rounded-full border border-white/10" />
      </div>

      {/* Gradient Overlay: Dark on left for text readability, fully transparent on right for map visibility. Dark at very top/bottom edges. */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-50 pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto pt-24 sm:pt-32 pb-24 px-6 sm:px-12 w-full min-h-screen flex flex-col">
        
        {/* Header Section */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-stretch gap-4 sm:gap-6 mb-12 md:mb-24"
        >
          <div className="flex flex-col justify-center">
            <span className="text-gray-400 text-sm sm:text-base font-medium mb-1">How to contact us</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">Contacts</h1>
          </div>
        </m.div>

        {/* Contact Info Grid */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 mb-16 md:mb-32 relative z-10 flex-wrap">
          {/* Address */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col"
          >
            <a 
              href="https://maps.google.com/?q=WeWork+Atrium+Place,+Udyog+Vihar,+Gurugram" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-center gap-3 text-white font-medium mb-4">
                <MapPin size={18} className="text-[#dc2626] group-hover:scale-110 transition-transform" />
                <span>Address</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[250px] group-hover:text-gray-300 transition-colors">
                WeWork Atrium Place, 6th Floor, Tower 3<br />
                Vanijya Nikunj, Phase V, Udyog Vihar<br />
                Gurugram, Haryana 122006, India
              </p>
            </a>
          </m.div>

          {/* Phone */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 text-white font-medium mb-4">
              <Phone size={18} className="text-gray-400" />
              <span>Phone</span>
            </div>
            <a href="tel:+917666400518" className="text-gray-500 text-sm hover:text-white transition-colors">
              +91 7666400518
            </a>
          </m.div>

          {/* Email */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 text-white font-medium mb-4">
              <Mail size={18} className="text-gray-400" />
              <span>E-mail</span>
            </div>
            <a href="mailto:info@fitfare.in" className="text-gray-500 text-sm hover:text-white transition-colors">
              info@fitfare.in
            </a>
          </m.div>
        </div>

        {/* Get in touch section */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="max-w-2xl relative z-10"
        >
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl font-medium text-white">Get in touch</h2>
          </div>

          {/* Interactive Form */}
          <div className="relative">
            <form onSubmit={handleNext} className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap relative z-10 pb-4 w-full">
              {/* 1. Input Field */}
              <div className="w-full sm:flex-1 overflow-hidden order-1 sm:order-1 mb-2 sm:mb-0">
                <AnimatePresence mode="wait">
                  {step === 0 ? (
                    <m.input
                      key="name-input"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent text-3xl sm:text-5xl font-medium text-white placeholder-gray-700 outline-none pb-2"
                      autoFocus
                    />
                  ) : (
                    <m.input
                      key="email-input"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      type="email"
                      placeholder="Enter your E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-3xl sm:text-5xl font-medium text-white placeholder-gray-700 outline-none pb-2"
                      autoFocus
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* 2. Action Button (Order 3 on mobile, Order 2 on desktop) */}
              <button 
                type="submit"
                disabled={isSubmitting || isSuccess || (step === 0 && !name.trim()) || (step === 1 && !email.trim())}
                className={`order-3 sm:order-2 self-end sm:self-auto mt-8 sm:mt-0 sm:ml-12 group flex items-center gap-4 shrink-0 transition-opacity ${
                  (step === 0 && !name.trim()) || (step === 1 && !email.trim()) ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                }`}
              >
                <span className="text-sm font-medium text-white hidden sm:block">
                  {isSuccess ? "Sent" : step === 0 ? "Next" : "Send"}
                </span>
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-white transition-colors">
                  {isSuccess ? (
                    <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500">
                      ✓
                    </m.div>
                  ) : step === 0 ? (
                    <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <Send size={18} className="text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </button>

            {/* 3. Progress Track (Order 2 on mobile, Order 3 on desktop) */}
            <div className="relative w-full order-2 sm:order-3 mt-4 sm:mt-6">
              <div className="h-[1px] w-full bg-gray-800 absolute top-0 left-0" />
              {/* Active segment indicator */}
              <m.div 
                className="h-[2px] bg-white absolute top-0 left-0" 
                initial={false}
                animate={{ 
                  width: step === 0 ? "50%" : "100%"
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              
              {/* Labels */}
              <div className="flex justify-between mt-4 text-xs font-medium">
                <span className={`transition-colors duration-300 ${step === 0 ? "text-white" : "text-gray-600 cursor-pointer hover:text-gray-400"}`} onClick={() => setStep(0)}>
                  Enter the name
                </span>
                <span className={`transition-colors duration-300 ${step === 1 ? "text-white" : "text-gray-600"}`}>
                  Enter the E-mail
                </span>
              </div>
            </div>
            </form>

            {/* Success Message */}
            <AnimatePresence>
              {isSuccess && (
                <m.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-12 left-0 text-green-500 text-sm"
                >
                  Message sent successfully! We'll be in touch soon.
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </m.div>

      </main>
    </div>
  );
};

export default ContactPage;
