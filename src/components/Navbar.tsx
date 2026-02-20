import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Zap, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import logo from "@/assets/blue-background-logo.png";
import logoVideo from "@/assets/logo_animate2.mp4";

/* ---------------- NAV LINKS ---------------- */

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [logoAnimating, setLogoAnimating] = useState(false);

  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    setLogoAnimating(true);
    video.currentTime = 0;
    video.play();

    setTimeout(() => {
      setLogoAnimating(false);
    }, 1800);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-80px 0px 0px 0px" }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ---------------- NAV LINK COMPONENT ---------------- */
  const NavItem = ({ link, onClick = () => {} }: any) => {
    const isActive = activeSection === link.href.slice(1);

    return (
      <motion.a
        href={link.href}
        onClick={onClick}
        className={`relative px-4 py-2 text-sm font-semibold rounded-xl perspective group transition-colors duration-300 ${
          isActive
            ? "text-blue-600"
            : isDark
            ? "text-gray-900 hover:text-black"
            : "text-gray-400 hover:text-white"
        }`}
        whileHover="hover"
        whileTap="tap"
      >
        <div className="relative h-5">
          <span className="opacity-0">{link.label}</span>

          <motion.div
            className="absolute inset-0"
            variants={{
              hover: { rotateX: 180 },
              tap: { rotateX: 180 },
            }}
            transition={{ duration: 0.4 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 flex items-center justify-center backface-hidden">
              {link.label}
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center backface-hidden ${
                isActive ? "text-white" : ""
              }`}
              style={{ transform: "rotateX(180deg)" }}
            >
              {link.label}
            </div>
          </motion.div>
        </div>
      </motion.a>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={`w-full max-w-5xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? isDark
              ? "backdrop-blur-md bg-white/80 text-black shadow-xl border border-gray-200"
              : "backdrop-blur-md bg-slate-900/80 text-white shadow-xl border border-white/10"
            : ""
        }`}
      >
        <div className="px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <motion.a
            href="#home"
            className="flex items-center gap-3"
            whileTap={{ scale: 0.95 }}
            onClick={handleLogoClick}
          >
            <motion.div
              className="relative w-11 h-11 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.08 }}
            >
              <img
                src={logo}
                alt="Logo"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                  logoAnimating ? "opacity-0" : "opacity-100"
                }`}
              />

              <video
                ref={videoRef}
                src={logoVideo}
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                  logoAnimating ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>

            <span className="text-xl font-bold tracking-tight">
              FitFare
            </span>
          </motion.a>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavItem key={link.href} link={link} />
            ))}

            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className={`ml-3 w-10 h-10 flex items-center justify-center rounded-xl border ${
                  isDark ? "bg-white" : "bg-slate-800"
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isDark ? (
                      <Sun size={20} className="text-yellow-400" />
                    ) : (
                      <Moon size={20} className="text-blue-500" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            )}

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Zap size={16} />
              Join Now
            </motion.a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`md:hidden border-t ${
                isDark
                  ? "bg-white text-slate-900"
                  : "bg-slate-900 text-white"
              }`}
            >
              <div className="p-6 flex flex-col items-center gap-4">
                {navLinks.map((link) => (
                  <NavItem
                    key={link.href}
                    link={link}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}

                {mounted && (
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-medium ${
                      isDark
                        ? "border-slate-300 text-slate-900"
                        : "border-white/20 text-white"
                    }`}
                  >
                    {isDark ? (
                      <>
                        <Moon size={18} className="text-blue-500" />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun size={18} className="text-yellow-400" />
                        Light Mode
                      </>
                    )}
                  </button>
                )}

                <motion.a
                  href="#contact"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  <Zap size={16} />
                  Join Now
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;