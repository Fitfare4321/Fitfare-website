import { useState, useEffect, useRef, useCallback } from "react";
import { Compass, Info, Briefcase, HelpCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, animate } from "framer-motion";
import logo from "@/assets/blue-background-logo.png";
import logoVideo from "@/assets/logo_animate2.mp4";
import { GlassButton } from "@/components/ui/glass-button";

const globalNavLinks = [
  { label: "Explore", href: "/#activities", icon: Compass },
  { label: "How It Works", href: "/#how-it-works", icon: Info },
  { label: "For Partners", href: "/#partners", icon: Briefcase },
  { label: "FAQs", href: "/#faq", icon: HelpCircle },
];

/* ─── Activity items for the navbar ─── */
const activityNavItems = [
  { label: "Gyms", index: 0 },
  { label: "Yoga", index: 1 },
  { label: "Func.", index: 2 },
  { label: "Group", index: 3 },
  { label: "Dance", index: 4 },
  { label: "Explore", index: 5 },
];

/* ─── How-it-works steps for the navbar ─── */
const howItWorksNavItems = [
  { label: "Discover", index: 0 },
  { label: "Choose", index: 1 },
  { label: "Book & Pay", index: 2 },
  { label: "Check In", index: 3 },
];

type NavMode = "global" | "activities" | "howItWorks";

/* ─────────── Pill Segmented Control (shared inner component) ─────────── */
const PillSegmentedControl = ({
  activeSection,
  handleNavClick,
  isScrollLocked,
}: {
  activeSection: string;
  handleNavClick: (href: string) => void;
  isScrollLocked: React.MutableRefObject<boolean>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track which mode the navbar is in
  const [mode, setMode] = useState<NavMode>("global");
  const [activeWheelCard, setActiveWheelCard] = useState(0);
  const [activeCarouselStep, setActiveCarouselStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevMode = useRef<NavMode>("global");
  const wheelLocked = useRef(false);
  const wheelLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselLocked = useRef(false);
  const carouselLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determine items based on mode
  const currentItems = mode === "activities"
    ? activityNavItems.map((a) => a.label)
    : mode === "howItWorks"
    ? howItWorksNavItems.map((a) => a.label)
    : globalNavLinks.map((l) => l.label);
  const tabCount = currentItems.length;

  // Determine active index based on mode
  const globalActiveIndex = globalNavLinks.findIndex(
    (l) => l.href.split("#")[1] === activeSection
  );
  const activeIndex = mode === "activities"
    ? activeWheelCard
    : mode === "howItWorks"
    ? activeCarouselStep
    : (globalActiveIndex === -1 ? 0 : globalActiveIndex);
  const safeActiveIndex = Math.max(0, Math.min(activeIndex, tabCount - 1));

  // Pill animation
  const pillX = useMotionValue(0);
  const pillScaleY = useMotionValue(1);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPillX = useRef(0);

  // Measure
  const [pillWidth, setPillWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const padding = 6;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const cw = containerRef.current.offsetWidth;
        setContainerWidth(cw);
        const innerWidth = cw - padding * 2;
        setPillWidth(innerWidth / tabCount);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [tabCount]);

  // Update pill when active tab changes
  useEffect(() => {
    if (containerWidth > 0 && !isDragging.current) {
      const targetX = padding + safeActiveIndex * pillWidth;
      animate(pillX, targetX, { type: "spring", stiffness: 500, damping: 38, mass: 0.8 });
    }
  }, [safeActiveIndex, pillWidth, containerWidth, pillX]);

  // Lock wheel updates during user-initiated navigation
  const lockWheel = useCallback((targetIndex: number) => {
    wheelLocked.current = true;
    setActiveWheelCard(targetIndex);
    if (wheelLockTimer.current) clearTimeout(wheelLockTimer.current);
    wheelLockTimer.current = setTimeout(() => {
      wheelLocked.current = false;
    }, 1400);
  }, []);

  // Lock carousel updates during user-initiated navigation
  const lockCarousel = useCallback((targetIndex: number) => {
    carouselLocked.current = true;
    setActiveCarouselStep(targetIndex);
    if (carouselLockTimer.current) clearTimeout(carouselLockTimer.current);
    carouselLockTimer.current = setTimeout(() => {
      carouselLocked.current = false;
    }, 800);
  }, []);

  // Listen for works-wheel-step events to track active card
  useEffect(() => {
    const handler = (e: Event) => {
      if (wheelLocked.current) return;
      const idx = (e as CustomEvent).detail;
      if (typeof idx === "number") {
        setActiveWheelCard(idx);
      }
    };
    window.addEventListener("works-wheel-step", handler);
    return () => window.removeEventListener("works-wheel-step", handler);
  }, []);

  // Listen for phone-carousel-step events to track active step
  useEffect(() => {
    const handler = (e: Event) => {
      if (carouselLocked.current) return;
      const idx = (e as CustomEvent).detail;
      if (typeof idx === "number") {
        setActiveCarouselStep(idx);
      }
    };
    window.addEventListener("phone-carousel-step", handler);
    return () => window.removeEventListener("phone-carousel-step", handler);
  }, []);

  // Detect which section is visible and switch navbar mode
  useEffect(() => {
    const wheelTrack = document.getElementById("wheel-scroll-track");
    const howItWorksTrack = document.getElementById("phone-carousel-track");

    const triggerTransition = (newMode: NavMode) => {
      if (newMode !== prevMode.current) {
        prevMode.current = newMode;
        setIsTransitioning(true);
        setTimeout(() => {
          setMode(newMode);
          setTimeout(() => setIsTransitioning(false), 50);
        }, 180);
      }
    };

    // We track which sections are currently intersecting
    const visible = { activities: false, howItWorks: false };

    const updateMode = () => {
      if (isScrollLocked.current) return;
      if (visible.activities) triggerTransition("activities");
      else if (visible.howItWorks) triggerTransition("howItWorks");
      else triggerTransition("global");
    };

    const observers: IntersectionObserver[] = [];

    if (wheelTrack) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visible.activities = entry.isIntersecting;
          });
          updateMode();
        },
        { threshold: 0.05, rootMargin: "-10% 0px -10% 0px" }
      );
      obs.observe(wheelTrack);
      observers.push(obs);
    }

    if (howItWorksTrack) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visible.howItWorks = entry.isIntersecting;
          });
          updateMode();
        },
        { threshold: 0.15, rootMargin: "-5% 0px -5% 0px" }
      );
      obs.observe(howItWorksTrack);
      observers.push(obs);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [isScrollLocked]);

  // Handle tab tap
  const handleTabTap = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.preventDefault();
      if (isDragging.current) return;

      if (mode === "global") {
        handleNavClick(globalNavLinks[index].href);
      } else if (mode === "activities") {
        lockWheel(index);
        window.dispatchEvent(
          new CustomEvent("works-wheel-set", { detail: index })
        );
      } else {
        lockCarousel(index);
        window.dispatchEvent(
          new CustomEvent("phone-carousel-set", { detail: index })
        );
      }
    },
    [mode, handleNavClick, lockWheel, lockCarousel]
  );

  // Pointer drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const currentPillLeft = padding + safeActiveIndex * pillWidth;
      const currentPillRight = currentPillLeft + pillWidth;

      if (relX >= currentPillLeft - 20 && relX <= currentPillRight + 20) {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragStartPillX.current = currentPillLeft;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        pillX.stop();
        animate(pillScaleY, 0.75, { type: "spring", stiffness: 600, damping: 25, mass: 0.5 });
      }
    },
    [safeActiveIndex, pillWidth, pillX, pillScaleY]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - dragStartX.current;
      const innerWidth = containerWidth - padding * 2;
      const minX = padding;
      const maxX = padding + innerWidth - pillWidth;
      const newX = Math.max(minX, Math.min(maxX, dragStartPillX.current + delta));
      pillX.set(newX);
    },
    [containerWidth, pillWidth, pillX]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const currentPillX = pillX.get();
      const pillCenter = currentPillX + pillWidth / 2 - padding;
      const innerWidth = containerWidth - padding * 2;
      const tabWidth = innerWidth / tabCount;
      const snappedIndex = Math.max(
        0,
        Math.min(tabCount - 1, Math.floor(pillCenter / tabWidth))
      );

      const snapX = padding + snappedIndex * pillWidth;
      animate(pillX, snapX, { type: "spring", stiffness: 500, damping: 38, mass: 0.8 });
      animate(pillScaleY, 1, { type: "spring", stiffness: 500, damping: 30, mass: 0.8 });

      if (snappedIndex !== safeActiveIndex) {
        if (mode === "global") {
          handleNavClick(globalNavLinks[snappedIndex].href);
        } else if (mode === "activities") {
          lockWheel(snappedIndex);
          window.dispatchEvent(
            new CustomEvent("works-wheel-set", { detail: snappedIndex })
          );
        } else {
          lockCarousel(snappedIndex);
          window.dispatchEvent(
            new CustomEvent("phone-carousel-set", { detail: snappedIndex })
          );
        }
      }
    },
    [pillX, pillScaleY, pillWidth, containerWidth, tabCount, safeActiveIndex, handleNavClick, mode, lockWheel, lockCarousel]
  );

  return (
    <div className="glass-button-wrap w-full rounded-full pointer-events-auto">
      <div className="glass-button w-full h-full rounded-full pointer-events-auto">
        <div
          ref={containerRef}
          className="relative flex items-center justify-between p-1.5 w-full h-full z-20 pointer-events-auto select-none touch-none overflow-hidden"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* The animated pill */}
          <motion.div
            className="absolute top-1.5 bottom-1.5 bg-white/12 dark:bg-white/15 border border-white/20 dark:border-white/25 rounded-full backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-grab active:cursor-grabbing"
            style={{
              x: pillX,
              scaleY: pillScaleY,
              width: pillWidth,
              left: 0,
            }}
          />

          {/* Tab labels with blur transition */}
          <div
            className="flex items-center justify-between flex-1 relative z-10"
            style={{
              filter: isTransitioning ? "blur(8px)" : "blur(0px)",
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "scale(0.95)" : "scale(1)",
              transition: "filter 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {currentItems.map((label, i) => {
              const isActive = i === safeActiveIndex;
              return (
                <button
                  key={`${mode}-${label}`}
                  onClick={(e) => handleTabTap(e as unknown as React.MouseEvent, i)}
                  className="relative flex items-center justify-center flex-1 py-4 md:py-3.5 px-0.5 rounded-full z-10 cursor-pointer touch-manipulation"
                >
                  <span
                    className={`text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap ${
                      isActive
                        ? "text-white font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="glass-button-shadow rounded-full pointer-events-none" />
    </div>
  );
};


const Navbar = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px), (pointer: coarse)').matches : false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("activities");
  const scrollLockRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollLocked = useRef(false);

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
    let prev = false;
    const handleScroll = () => {
      const isPast = window.scrollY > 20;
      if (isPast !== prev) {
        prev = isPast;
        setScrolled(isPast);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.matchMedia('(max-width: 768px), (pointer: coarse)').matches);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Active Section Detection (Scroll Spy)
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["activities", "how-it-works", "partners", "faq"];
    let rafId: number | null = null;
    let lastActive = "";

    const updateActive = () => {
      if (isScrollLocked.current) return;

      // If at very top, highlight Explore
      if (window.scrollY < 150) {
        if (lastActive !== "activities") {
          lastActive = "activities";
          setActiveSection("activities");
        }
        return;
      }

      // If near bottom of the page, highlight FAQs
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
        if (lastActive !== "faq") {
          lastActive = "faq";
          setActiveSection("faq");
        }
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

      if (current !== lastActive) {
        lastActive = current;
        setActiveSection(current);
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    if (href.includes("#")) {
      const targetId = href.split("#")[1];
      if (location.pathname === "/") {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Lock scroll spy so the pill doesn't bounce through intermediate sections
          isScrollLocked.current = true;
          if (scrollLockRef.current) clearTimeout(scrollLockRef.current);
          scrollLockRef.current = setTimeout(() => {
            isScrollLocked.current = false;
          }, 1200); // unlock after smooth scroll finishes

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

  /* ─── Logo element (reused in mobile top bar and desktop unified bar) ─── */
  const logoElement = (
    <a
      href="#home"
      className="flex group items-center gap-2.5 md:gap-3 cursor-pointer z-20"
      onClick={(e) => {
        e.preventDefault();
        handleLogoClick();
        if (location.pathname !== "/") navigate("/");
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div className="relative h-9 w-9 md:h-11 md:w-11 overflow-hidden rounded-[0.9rem] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-6deg] shadow-lg shadow-[#305CDE]/10 dark:shadow-[#305CDE]/20">
        <img src={logo} alt="Logo" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${!isMobile && logoAnimating ? "opacity-0" : "opacity-100"}`} />
        {!isMobile && (
          <video ref={videoRef} src={logoVideo} muted playsInline className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${logoAnimating ? "opacity-100" : "opacity-0"}`} />
        )}
      </div>
      <span className="hidden md:block text-lg md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        FitFare
      </span>
    </a>
  );

  /* ─── CTA buttons (reused in mobile top bar and desktop unified bar) ─── */
  const ctaButtons = (
    <div className="flex items-center justify-end w-auto gap-1 md:gap-3 z-20">
      <div className="hidden xl:block scale-90 md:scale-100 origin-right">
        <GlassButton size="default" onClick={(e: React.MouseEvent) => { e.preventDefault(); handleNavClick("/partner-form"); }}>
          Partner With FitFare
        </GlassButton>
      </div>

      {/* GET THE APP (GLOW CTA) */}
      <div className="ml-1 scale-90 md:scale-100 origin-right">
        <GlassButton 
          size="default"
          href="https://play.google.com/store/apps/details?id=in.fitfare.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the App
        </GlassButton>
      </div>
    </div>
  );

  return (
    <>
      

      {/* ─── MOBILE ONLY: Top header bar with CTAs ─── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="navbar-ui md:hidden fixed top-4 left-0 right-0 z-50 flex items-center justify-end px-4 sm:px-6 pointer-events-none"
      >
        <div className="pointer-events-auto z-20">
          {ctaButtons}
        </div>
      </motion.nav>

      {/* ─── MOBILE ONLY: Bottom pill bar ─── */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="navbar-ui md:hidden fixed bottom-6 left-4 right-4 z-[999] pointer-events-auto drop-shadow-2xl"
      >
        <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-xl rounded-full border border-white/30 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] pointer-events-none" />
        <PillSegmentedControl
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          isScrollLocked={isScrollLocked}
        />
      </motion.div>

      {/* ─── DESKTOP (md+): Top navbar without full-width back glass ─── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="hidden md:flex fixed top-4 left-0 right-0 z-[999] items-center justify-between px-6 lg:px-10 pointer-events-none"
      >
        {/* LOGO */}
        <div className="pointer-events-auto z-20">
          {logoElement}
        </div>

        {/* CENTER: Pill segmented control */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md lg:max-w-lg pointer-events-auto drop-shadow-2xl z-20">
          <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-xl rounded-full border border-white/30 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] pointer-events-none" />
          <PillSegmentedControl
            activeSection={activeSection}
            handleNavClick={handleNavClick}
            isScrollLocked={isScrollLocked}
          />
        </div>

        {/* RIGHT: CTAs */}
        <div className="pointer-events-auto z-20">
          {ctaButtons}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;