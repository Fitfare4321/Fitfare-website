import { useState, useEffect, useRef } from "react";
import { Compass, Info, Briefcase, HelpCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/blue-background-logo.png";
import logoVideo from "@/assets/logo_animate2.mp4";
import { GlassButton, glassButtonStyles } from "@/components/ui/glass-button";

const globalNavLinks = [
  { label: "Explore", href: "/#activities", icon: Compass },
  { label: "How It Works", href: "/#how-it-works", icon: Info },
  { label: "For Partners", href: "/#partners", icon: Briefcase },
  { label: "FAQs", href: "/#faq", icon: HelpCircle },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("activities");
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

  // Scroll Detection for Top Navbar appearance
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active Section Detection (Scroll Spy)
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["activities", "how-it-works", "partners", "faq"];

    const updateActive = () => {
      // If at very top, highlight Explore
      if (window.scrollY < 150) {
        setActiveSection("activities");
        return;
      }

      // If near bottom of the page, highlight FAQs
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
        setActiveSection("faq");
        return;
      }

      const triggerLine = window.innerHeight * 0.45;
      let current = "activities";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    if (href.includes("#")) {
      const targetId = href.split("#")[1];
      if (location.pathname === "/") {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          setActiveSection(targetId);
          window.history.pushState(null, "", `#${targetId}`);
        }
      } else {
        navigate(`/#${targetId}`);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <style>{glassButtonStyles}</style>

      {/* TOP DESKTOP & MOBILE HEADER */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-end md:justify-center px-4 md:px-6 pointer-events-none"
      >
        <motion.div
          layout
          className={`w-auto md:w-full max-w-6xl rounded-[2rem] transition-colors duration-500 overflow-hidden pointer-events-auto ${
            scrolled 
              ? "md:bg-white/50 md:dark:bg-[#0a0f1c]/50 md:backdrop-blur-3xl md:border md:border-white/60 md:dark:border-white/10 md:shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:dark:shadow-black/60" 
              : "md:bg-white/30 md:dark:bg-[#0a0f1c]/30 md:backdrop-blur-xl md:border md:border-white/40 md:dark:border-white/5 md:shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:dark:shadow-black/20"
          }`}
        >
          <div className={`flex items-center justify-end md:justify-between relative transition-all duration-500 ${scrolled ? 'py-0 md:py-3 px-0 md:px-6' : 'py-0 md:py-5 px-0 md:px-8'}`}>
            
            {/* LOGO */}
            <a
              href="#home"
              className="hidden md:flex group items-center gap-3 cursor-pointer z-20"
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
              {globalNavLinks.map((link) => {
                const sectionId = link.href.split("#")[1];
                const isActive = activeSection === sectionId;
                const isHovered = hoveredLink === link.label;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onClick={(e) => { 
                      e.preventDefault(); 
                      handleNavClick(link.href); 
                    }}
                    className="relative z-10 px-5 py-2.5 text-[15px] font-semibold transition-colors duration-300 rounded-full outline-none cursor-pointer"
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
            <div className="flex items-center justify-end w-auto gap-1 md:gap-3 z-20">
              <div className="hidden lg:block scale-90 md:scale-100 origin-right">
                <GlassButton size="default" onClick={(e: React.MouseEvent) => { e.preventDefault(); handleNavClick("/#partners"); }}>
                  Partner With FitFare
                </GlassButton>
              </div>

              {/* GET THE APP (GLOW CTA) */}
              <div className="ml-1 scale-90 md:scale-100 origin-right">
                <GlassButton size="default">
                  Get the App
                </GlassButton>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* MOBILE BOTTOM TAB BAR */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="md:hidden fixed bottom-6 left-4 right-4 z-[999] pointer-events-auto drop-shadow-2xl"
      >
        <div className="glass-button-wrap w-full rounded-full pointer-events-auto bg-white/20 dark:bg-black/40 backdrop-blur-3xl border border-white/30 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="glass-button w-full h-full rounded-full pointer-events-auto">
            <div className="flex items-center justify-between p-1.5 w-full h-full relative z-20 pointer-events-auto select-none">
              {globalNavLinks.map((link) => {
                const sectionId = link.href.split("#")[1];
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleNavClick(link.href);
                    }}
                    className="relative flex items-center justify-center flex-1 py-2.5 px-1.5 transition-all rounded-full cursor-pointer touch-manipulation z-20 pointer-events-auto"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveTab"
                        className="absolute inset-0 bg-white/10 dark:bg-white/15 border border-white/20 dark:border-white/25 rounded-full -z-10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span
                      className={`text-[13px] sm:text-sm font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap ${
                        isActive ? "text-white font-bold" : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="glass-button-shadow rounded-full pointer-events-none"></div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;