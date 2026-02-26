import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Zap, Moon, Sun, Lightbulb } from "lucide-react";
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
  const [logoHover, setLogoHover] = useState(false);

  const { scrollY } = useScroll();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const effectiveTheme = resolvedTheme ?? theme;
  const isDark = effectiveTheme === "dark";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* ---------- Scroll Detection ---------- */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  /* ---------- Active Section Detection ---------- */
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
  const NavItem = ({ link, onClick = () => { } }: any) => {
    const isActive = activeSection === link.href.slice(1);

    return (
      <motion.a
        href={link.href}
        onClick={onClick}
        className={`relative px-4 py-2 text-sm font-semibold rounded-xl perspective group transition-colors duration-300 ${
          isActive
            ? isDark
              ? "text-blue-400"
              : "text-blue-600"
            : isDark
            ? "text-gray-200 hover:text-white"
            : "text-gray-900 hover:text-blue-600"
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
                isActive
                  ? isDark
                    ? "text-blue-400"
                    : "text-blue-600"
                  : isDark
                  ? "text-white"
                  : "text-gray-900"
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
        className={`w-full max-w-5xl rounded-2xl transition-all duration-500 border
        ${
          isDark
            ? "bg-slate-900/85 text-white border-white/10 shadow-[0_18px_50px_rgba(15,23,42,0.7)]"
            : "bg-white/85 text-gray-900 border-gray-200/60 shadow-md md:shadow-[0_16px_40px_rgba(15,23,42,0.18)]"
        }`}
      >
        <div className="px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <motion.a
            href="#home"
            className="flex items-center gap-3"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative w-11 h-11 rounded-full overflow-hidden"
              whileHover={{ scale: 1.08 }}
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              {/* Normal Logo */}
              <img
                src={logo}
                alt="Logo"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${logoHover ? "opacity-0" : "opacity-100"
                  }`}
              />

              {/* Animated Video Logo */}
              <video
                src={logoVideo}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${logoHover ? "opacity-100" : "opacity-0"
                  }`}
              />
            </motion.div>


            <span
              className={`text-xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
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
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`ml-3 w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/80 border-white/15 hover:bg-slate-800/80"
                    : "bg-slate-100/90 border-slate-200 hover:bg-white"
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
                      <Lightbulb size={20} className="text-yellow-400" />
                    ) : (
                      <Moon size={20} className="text-blue-500" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isDark
                ? "text-white hover:bg-white/10"
                : "text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }}>
              {mobileOpen ? (
                <X size={24} className={isDark ? "text-white" : "text-gray-900"} />
              ) : (
                <Menu size={24} className={isDark ? "text-white" : "text-gray-900"} />
              )}
            </motion.div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="md:hidden pt-2 pb-4 px-4 bg-transparent"
            >
              {/* Mobile: only inner list of buttons (no outer card) */}
              <div className="mx-auto w-full max-w-xs flex flex-col items-stretch gap-2 max-h-[48vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full text-center py-2 px-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeSection === link.href.slice(1)
                        ? isDark
                          ? "bg-blue-600 text-white"
                          : "bg-blue-600 text-white"
                        : isDark
                          ? "text-white hover:bg-white/10"
                          : "text-gray-900 hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* THEME TOGGLE */}
                {mounted && (
                  <motion.button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border text-sm transition-all duration-300 ${
                      isDark
                        ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                        : "border-gray-300 bg-gray-50 text-gray-900 hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isDark ? (
                      <>
                        <Lightbulb size={18} className="text-yellow-400" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon size={18} className="text-blue-500" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </motion.button>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
export default Navbar;
