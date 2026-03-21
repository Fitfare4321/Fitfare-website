import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Zap, Moon, Lightbulb } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/blue-background-logo.png";
import logoVideo from "@/assets/logo_animate2.mp4";
import { Link } from "react-router-dom";

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
  const [activeSection, setActiveSection] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  /* ---------- LOGO ANIMATION ---------- */

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

    return () => {
      video.removeEventListener("ended", handleEnd);
    };
  }, []);

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

  /* ---------- Reset active section if not home ---------- */

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
    }
  }, [location.pathname]);

  /* ---------- Active Section Detection ---------- */

  useEffect(() => {
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    navLinks.forEach(({ href }) => {
      const id = href.slice(1);

      if (id === "about") return;

      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const aboutEl = document.getElementById("about");

      if (!aboutEl) return;

      const { top, bottom } = aboutEl.getBoundingClientRect();
      const windowH = window.innerHeight;

      if (top <= windowH * 0.5 && bottom >= windowH * 0.5) {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  /* ---------------- NAV LINK COMPONENT ---------------- */

  const NavItem = ({ link, onClick = () => {} }: any) => {
    const isActive = activeSection === link.href.slice(1);

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (location.pathname === "/") {
        const targetId = link.href.slice(1);
        const element = document.getElementById(targetId);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/${link.href}`);
      }

      onClick();
    };

    return (
      <motion.a
        href={link.href}
        onClick={handleNavigation}
        className={`relative px-4 py-2 text-sm rounded-xl perspective group transition-colors duration-300
        ${
          isActive
            ? isDark
              ? "text-blue-400 font-bold"
              : "text-blue-600 font-bold"
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
              className={`absolute inset-0 flex items-center justify-center backface-hidden
              ${
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
        className={`w-full max-w-5xl rounded-2xl transition-all duration-500 border ${
          isDark
            ? "bg-slate-900/85 text-white border-white/10 shadow-[0_18px_50px_rgba(15,23,42,0.7)]"
            : "bg-white/85 text-gray-900 border-gray-200/60 shadow-md md:shadow-[0_16px_40px_rgba(15,23,42,0.18)]"
        }`}
      >
        <div className="px-6 h-20 flex items-center justify-between">
          {/* LOGO */}

          <motion.a
            href="#home"
            className="flex items-center gap-3 cursor-pointer"
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              handleLogoClick();

              if (location.pathname !== "/") {
                navigate("/");
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <motion.div
              className="relative h-11 w-11 overflow-hidden rounded-xl shadow-md"
              whileHover={{ scale: 1.05 }}
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
                preload="auto"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                  logoAnimating ? "opacity-100" : "opacity-0"
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
                className={`ml-3 w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-300 font-normal ${
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

            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-3">
              <Link
                to="/thrivethon"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <Zap size={16} />
                Join Thriveathon
              </Link>
            </motion.div> */}
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
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="md:hidden pt-2 pb-4 px-4"
            >
             <div className="mx-auto w-full max-w-xs flex flex-col items-stretch gap-2">
  {navLinks.map((link) => (
    <NavItem
      key={link.href}
      link={link}
      onClick={() => setMobileOpen(false)}
    />
  ))}

  {/* MOBILE THEME TOGGLE */}
  {mounted && (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`mt-2 w-full py-3 flex items-center justify-center gap-2 rounded-xl border transition-all duration-300 ${
        isDark
          ? "bg-slate-900 border-white/15 text-white hover:bg-slate-800"
          : "bg-slate-100 border-slate-200 text-gray-900 hover:bg-white"
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
            <Lightbulb size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-blue-500" />
          )}
        </motion.div>
      </AnimatePresence>

      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  )}


                {/* <Link
                  to="/thrivethon"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  <Zap size={16} />
                  Join Thriveathon
                </Link> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;