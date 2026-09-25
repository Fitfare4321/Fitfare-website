import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/blue-background-logo.png";
import logoVideo from "@/assets/logo_animate2.mp4";

const navLinks = [
  { label: "Explore", href: "/#activities" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Partners", href: "/#partners" },
  { label: "FAQs", href: "/#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Logo animation state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLogoClick = async () => {
    const video = videoRef.current;
    if (!video || isPlaying) return;
    try {
      setLogoAnimating(true);
      setIsPlaying(true);
      video.currentTime = 0;
      await video.play();
    } catch (err) {
      console.error("Video play failed:", err);
      setLogoAnimating(false);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnd = () => {
      setLogoAnimating(false);
      setIsPlaying(false);
    };
    video.addEventListener("ended", handleEnd);
    return () => video.removeEventListener("ended", handleEnd);
  }, []);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active Section Detection
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    const sectionIds = navLinks.filter(l => l.href.includes("#")).map(l => l.href.split("#")[1]);
    const updateActive = () => {
      const middle = window.innerHeight * 0.4;
      let newActive = "";
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= middle && rect.bottom >= middle) newActive = id;
      });
      setActiveSection(newActive);
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.includes("#")) {
      const targetId = href.split("#")[1];
      if (location.pathname === "/") {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/#${targetId}`);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-6"
    >
      <motion.div
        layout
        className={`w-full max-w-6xl rounded-[2rem] transition-colors duration-500 overflow-hidden ${
          scrolled 
            ? "bg-white/50 dark:bg-[#0a0f1c]/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-black/60" 
            : "bg-white/30 dark:bg-[#0a0f1c]/30 backdrop-blur-xl border border-white/40 dark:border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-black/20"
        }`}
      >
        <div className={`flex items-center justify-between relative transition-all duration-500 ${scrolled ? 'py-2 px-3 md:px-4' : 'py-3 px-4 md:px-6'}`}>
          
          {/* LOGO */}
          <a
            href="#home"
            className="group flex items-center gap-3 cursor-pointer z-20"
            onClick={(e) => {
              e.preventDefault();
              handleLogoClick();
              if (location.pathname !== "/") navigate("/");
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative h-10 w-10 md:h-11 md:w-11 overflow-hidden rounded-[0.9rem] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-6deg] shadow-lg shadow-[#305CDE]/10 dark:shadow-[#305CDE]/20">
              <img src={logo} alt="Logo" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${logoAnimating ? "opacity-0" : "opacity-100"}`} />
              <video ref={videoRef} src={logoVideo} muted playsInline className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${logoAnimating ? "opacity-100" : "opacity-0"}`} />
            </div>
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              FitFare
            </span>
          </a>

          {/* DESKTOP LINKS (MAGNETIC PILL) */}
          <div className="hidden md:flex items-center gap-1 relative z-10" onMouseLeave={() => setHoveredLink(null)}>
            {navLinks.map((link) => {
              const isSectionLink = link.href.includes("#");
              const sectionId = isSectionLink ? link.href.split("#")[1] : "";
              const isActive = isSectionLink ? activeSection === sectionId : location.pathname === link.href;
              const isHovered = hoveredLink === link.label;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="relative px-5 py-2.5 text-[15px] font-semibold transition-colors duration-300 rounded-full outline-none"
                >
                  {isHovered && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full -z-10 backdrop-blur-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && !isHovered && (
                    <motion.div
                      layoutId="navDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#305CDE] dark:bg-[#5c85ff]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-[#305CDE] dark:text-[#5c85ff]" : isHovered ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"}`}>
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-1 md:gap-3 z-20">
            <a href="/#partners" onClick={(e) => { e.preventDefault(); handleNavClick("/#partners"); }} className="hidden lg:flex items-center px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-[#305CDE] dark:hover:text-[#5c85ff] transition-colors">
              Partner With FitFare
            </a>

            {/* GET THE APP (GLOW CTA) */}
            <button className="hidden md:flex relative group ml-1 rounded-full overflow-hidden p-[2px]">
              {/* Animated gradient border wrapper */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#305CDE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_2s_linear_infinite]" />
              
              {/* Inner Button */}
              <div className="relative bg-black dark:bg-white text-white dark:text-black px-7 py-2.5 rounded-full text-[15px] font-bold flex items-center justify-center transition-transform duration-300">
                Get the App
                {/* Shine effect inside button */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent group-hover:animate-[shimmer-sweep_1.5s_ease-in-out]" />
              </div>
            </button>

            {/* MOBILE TOGGLE */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-full text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors ml-1">
              <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="md:hidden border-t border-black/5 dark:border-white/5"
            >
              <div className="flex flex-col p-4 gap-2 pb-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="px-4 py-3.5 rounded-2xl text-gray-800 dark:text-gray-200 font-bold text-base hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a href="/#partners" onClick={(e) => { e.preventDefault(); handleNavClick("/#partners"); }} className="px-4 py-3.5 rounded-2xl text-[#305CDE] dark:text-[#5c85ff] font-bold text-base hover:bg-black/5 dark:hover:bg-white/10 transition-colors mt-2 border border-[#305CDE]/20 dark:border-[#305CDE]/40 bg-[#305CDE]/5">
                  Partner With FitFare
                </a>
                <button className="mt-4 bg-black dark:bg-white text-white dark:text-black w-full py-4 rounded-2xl text-base font-bold shadow-xl shadow-black/10 dark:shadow-white/5 active:scale-95 transition-transform">
                  Get the App
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;