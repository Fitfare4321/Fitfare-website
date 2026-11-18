import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export interface GalleryCardData {
  id: string;
  image: string;
  title: string;
  isHero?: boolean;
}

export interface GalleryCityData {
  id: string;
  name: string;
  places: string;
  tagline: string;
  accent: string;
  accentRgb: string;
  link: string;
  cards: GalleryCardData[];
}

interface CityTransitionGalleryProps {
  city: GalleryCityData;
  isOpen: boolean;
  onComplete?: () => void;
  onClose: () => void;
}

export const CityTransitionGallery: React.FC<CityTransitionGalleryProps> = ({
  city,
  isOpen,
  onComplete,
  onClose,
}) => {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isCompletedRef = useRef<boolean>(false);

  // References to card DOM nodes
  const cardHeroRef = useRef<HTMLDivElement>(null);
  const cardCardioRef = useRef<HTMLDivElement>(null);
  const cardStrengthRef = useRef<HTMLDivElement>(null);
  const cardWellnessRef = useRef<HTMLDivElement>(null);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  const activeRunIdRef = useRef<string>("");

  // Map city cards to positions matching the choreography
  // Hero: Delhi (The Capital of Fitness / India Gate)
  const heroCard = city.cards.find((c) => c.isHero) || city.cards[city.cards.length - 1];
  const nonHeroCards = city.cards.filter((c) => c !== heroCard);

  // Cardio: Treadmill
  const cardioCard =
    nonHeroCards.find((c) => /cardio|endurance|athletic|fight/i.test(c.title)) ||
    nonHeroCards[2] ||
    nonHeroCards[0];

  // Strength: Gym interior
  const strengthCard =
    nonHeroCards.find((c) => /strength|iron|gym|resistance/i.test(c.title)) ||
    nonHeroCards[0];

  // Wellness: Yoga / Pilates
  const wellnessCard =
    nonHeroCards.find((c) => /wellness|mind|sanctuary|pilates/i.test(c.title)) ||
    nonHeroCards[1] ||
    nonHeroCards[0];

  const imgHero = heroCard?.image || city.cards[0]?.image;
  const imgCardio = cardioCard?.image || imgHero;
  const imgStrength = strengthCard?.image || imgHero;
  const imgWellness = wellnessCard?.image || imgHero;

  const handleFinish = useCallback(() => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    activeRunIdRef.current = "";
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    navigateRef.current(city.link, {
      state: {
        fromTransition: true,
        cityName: city.name,
        cityTagline: city.tagline,
        cityAccent: city.accent,
        cityAccentRgb: city.accentRgb,
        heroImage: imgHero,
      },
    });
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
    onCloseRef.current();
  }, [city.link, city.name, city.tagline, city.accent, city.accentRgb, imgHero]);

  // Lock scroll while active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Keyboard shortcut (Escape = skip/finish immediately)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleFinish]);

  // GSAP Timeline Construction
  useEffect(() => {
    if (!isOpen) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      activeRunIdRef.current = "";
      return;
    }

    const runId = `${city.id}`;
    if (activeRunIdRef.current === runId && timelineRef.current) {
      return;
    }

    activeRunIdRef.current = runId;

    if (
      !cardHeroRef.current ||
      !cardCardioRef.current ||
      !cardStrengthRef.current ||
      !cardWellnessRef.current
    ) {
      return;
    }

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 640;

    // 2x2 Grid dimensions
    const maxGridW = isMobile ? vw * 0.94 : Math.min(vw * 0.84, 1100);
    const maxGridH = isMobile ? vh * 0.72 : Math.min(vh - 80, 660);

    const gap = Math.max(8, Math.min(20, Math.round(vw * 0.014)));
    const cardH = Math.round(Math.min((maxGridH - gap) / 2, ((maxGridW - gap) / 2) / 1.5));
    const cardW = Math.round(cardH * 1.5);

    const offsetX = (cardW + gap) / 2;
    const offsetY = (cardH + gap) / 2;

    // Initial Stack dimensions & offsets
    const stackW = isMobile ? Math.min(260, vw * 0.70) : Math.min(320, vw * 0.28);
    const stackH = Math.round(stackW * (4.3 / 3.2));
    const stackScaleFactor = isMobile ? 0.75 : 1;

    // Stack fanned positions
    const stackOffsets = {
      hero: { x: 70 * stackScaleFactor, y: -10 * stackScaleFactor, rotation: 16, scale: 1.02 },
      cardio: { x: 24 * stackScaleFactor, y: -4 * stackScaleFactor, rotation: 6, scale: 0.98 },
      wellness: { x: -24 * stackScaleFactor, y: -4 * stackScaleFactor, rotation: -6, scale: 0.96 },
      strength: { x: -70 * stackScaleFactor, y: -10 * stackScaleFactor, rotation: -16, scale: 0.92 },
    };

    const cards = [
      cardHeroRef.current,
      cardCardioRef.current,
      cardStrengthRef.current,
      cardWellnessRef.current,
    ];

    // Initial state: Fanned Stack
    gsap.set(cardHeroRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: stackOffsets.hero.x,
      y: stackOffsets.hero.y,
      rotation: stackOffsets.hero.rotation,
      scale: stackOffsets.hero.scale,
      width: stackW,
      height: stackH,
      borderRadius: isMobile ? 24 : 32,
      opacity: 1,
      zIndex: 40,
      borderWidth: "1.5px",
      borderColor: "rgba(255, 255, 255, 0.4)",
      transformOrigin: "center center",
      force3D: true,
      display: "block",
    });

    gsap.set(cardCardioRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: stackOffsets.cardio.x,
      y: stackOffsets.cardio.y,
      rotation: stackOffsets.cardio.rotation,
      scale: stackOffsets.cardio.scale,
      width: stackW,
      height: stackH,
      borderRadius: isMobile ? 24 : 32,
      opacity: 1,
      zIndex: 30,
      borderWidth: "1.5px",
      borderColor: "rgba(255, 255, 255, 0.35)",
      transformOrigin: "center center",
      force3D: true,
      display: "block",
    });

    gsap.set(cardWellnessRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: stackOffsets.wellness.x,
      y: stackOffsets.wellness.y,
      rotation: stackOffsets.wellness.rotation,
      scale: stackOffsets.wellness.scale,
      width: stackW,
      height: stackH,
      borderRadius: isMobile ? 24 : 32,
      opacity: 1,
      zIndex: 20,
      borderWidth: "1.5px",
      borderColor: "rgba(255, 255, 255, 0.3)",
      transformOrigin: "center center",
      force3D: true,
      display: "block",
    });

    gsap.set(cardStrengthRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: stackOffsets.strength.x,
      y: stackOffsets.strength.y,
      rotation: stackOffsets.strength.rotation,
      scale: stackOffsets.strength.scale,
      width: stackW,
      height: stackH,
      borderRadius: isMobile ? 24 : 32,
      opacity: 1,
      zIndex: 10,
      borderWidth: "1.5px",
      borderColor: "rgba(255, 255, 255, 0.25)",
      transformOrigin: "center center",
      force3D: true,
      display: "block",
    });

    // Build Master GSAP Timeline with snappier, faster pacing
    const tl = gsap.timeline({
      paused: false,
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        if (isCompletedRef.current) return;
        isCompletedRef.current = true;
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }
        activeRunIdRef.current = "";
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
        onCloseRef.current();
      },
    });

    timelineRef.current = tl;

    // ─────────────────────────────────────────────────────────────
    // STAGE 1: SPREAD 4 (Stack -> 2x2 Grid)
    // ─────────────────────────────────────────────────────────────
    tl.addLabel("spread4");

    tl.to(
      cards,
      {
        width: cardW,
        height: cardH,
        borderRadius: 0,
        rotation: 0,
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.25)",
        borderWidth: "1px",
        duration: 0.54,
        ease: "power3.out",
      },
      "spread4+=0.03"
    );

    tl.to(cardHeroRef.current, { x: -offsetX, y: -offsetY, duration: 0.54, ease: "power3.out" }, "spread4+=0.03");
    tl.to(cardCardioRef.current, { x: offsetX, y: -offsetY, duration: 0.54, ease: "power3.out" }, "spread4+=0.03");
    tl.to(cardStrengthRef.current, { x: -offsetX, y: offsetY, duration: 0.54, ease: "power3.out" }, "spread4+=0.03");
    tl.to(cardWellnessRef.current, { x: offsetX, y: offsetY, duration: 0.54, ease: "power3.out" }, "spread4+=0.03");

    // Settle pause (brief and crisp)
    tl.to({}, { duration: 0.14 });

    // ─────────────────────────────────────────────────────────────
    // STAGE 2: CROSS SLIDE
    // Hero glides down to Bottom-Left; Wellness glides up to Top-Right
    // ─────────────────────────────────────────────────────────────
    tl.addLabel("crossSlide");

    tl.to(
      cardHeroRef.current,
      {
        x: -offsetX,
        y: offsetY,
        duration: 0.42,
        ease: "power2.inOut",
      },
      "crossSlide"
    );

    tl.to(
      cardWellnessRef.current,
      {
        x: offsetX,
        y: -offsetY,
        duration: 0.42,
        ease: "power2.inOut",
      },
      "crossSlide"
    );

    // Settle pause
    tl.to({}, { duration: 0.12 });

    // ─────────────────────────────────────────────────────────────
    // STAGE 3: ALIGN 2
    // Background cards fade out cleanly; Hero & Wellness align vertically
    // ─────────────────────────────────────────────────────────────
    tl.addLabel("align2");

    tl.to(
      [cardStrengthRef.current, cardCardioRef.current],
      {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      },
      "align2"
    );

    tl.to(
      cardHeroRef.current,
      {
        x: 0,
        y: offsetY,
        duration: 0.38,
        ease: "power2.inOut",
      },
      "align2"
    );

    tl.to(
      cardWellnessRef.current,
      {
        x: 0,
        y: -offsetY,
        duration: 0.38,
        ease: "power2.inOut",
      },
      "align2"
    );

    // Settle pause
    tl.to({}, { duration: 0.12 });

    // ─────────────────────────────────────────────────────────────
    // STAGE 4: MERGE 1
    // Wellness collapses and dissolves; Hero glides to center
    // ─────────────────────────────────────────────────────────────
    tl.addLabel("merge1");

    tl.to(
      cardWellnessRef.current,
      {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      },
      "merge1"
    );

    tl.to(
      cardHeroRef.current,
      {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: "power2.inOut",
      },
      "merge1"
    );

    // Settle pause
    tl.to({}, { duration: 0.08 });

    // ─────────────────────────────────────────────────────────────
    // STAGE 5: ZOOM IN (Morph Card to Full Viewport)
    // ─────────────────────────────────────────────────────────────
    tl.addLabel("zoomIn");

    tl.to(
      cardHeroRef.current,
      {
        width: vw,
        height: vh,
        x: 0,
        y: 0,
        borderRadius: 0,
        borderWidth: "0px",
        scale: 1.30,
        duration: 0.48,
        ease: "power2.inOut",
      },
      "zoomIn"
    );

    // ─────────────────────────────────────────────────────────────
    // STAGE 6: ROUTE NAVIGATION & CONTINUOUS ZOOM OUT TO FIT POSITION
    // ─────────────────────────────────────────────────────────────
    tl.addLabel("zoomOut", "zoomIn+=0.48");

    tl.call(
      () => {
        navigateRef.current(city.link, {
          state: {
            fromTransition: true,
            cityName: city.name,
            cityTagline: city.tagline,
            cityAccent: city.accent,
            cityAccentRgb: city.accentRgb,
            heroImage: imgHero,
          },
        });
      },
      [],
      "zoomOut"
    );

    // Hero card smoothly zooms out until it fits the screen position (scale: 1.0)
    tl.to(
      cardHeroRef.current,
      {
        scale: 1.0,
        duration: 0.58,
        ease: "power3.out",
      },
      "zoomOut"
    );

    // Overlay container dissolves seamlessly revealing the destination page
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      },
      "zoomOut+=0.32"
    );

    return () => {};
  }, [isOpen, city.id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      activeRunIdRef.current = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={containerRef}
      onClick={handleFinish}
      className="fixed inset-0 z-[999999] bg-black text-white overflow-hidden select-none cursor-pointer"
      style={{
        backgroundColor: "#000000",
      }}
      title="Click anywhere to skip transition"
    >
      {/* 100% Solid Pure Black Backdrop */}
      <div className="absolute inset-0 bg-[#000000]" style={{ backgroundColor: "#000000" }} />

      {/* ═══════════════════ MAIN PICTURE STAGE ═══════════════════ */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        {/* Card Cardio (Top-Right in 2x2 Grid) */}
        <div
          ref={cardCardioRef}
          className="absolute left-1/2 top-1/2 overflow-hidden shadow-2xl bg-zinc-950 will-change-transform select-none"
          style={{
            zIndex: 10,
            transformOrigin: "center center",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95)",
          }}
        >
          <img
            src={imgCardio}
            alt="Cardio & Endurance Arena"
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Card Strength (Bottom-Left in 2x2 Grid) */}
        <div
          ref={cardStrengthRef}
          className="absolute left-1/2 top-1/2 overflow-hidden shadow-2xl bg-zinc-950 will-change-transform select-none"
          style={{
            zIndex: 20,
            transformOrigin: "center center",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95)",
          }}
        >
          <img
            src={imgStrength}
            alt="Strength & Iron Conditioning"
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Card Wellness (Bottom-Right in 2x2 Grid, Top Card in 2-card align) */}
        <div
          ref={cardWellnessRef}
          className="absolute left-1/2 top-1/2 overflow-hidden shadow-2xl bg-zinc-950 will-change-transform select-none"
          style={{
            zIndex: 30,
            transformOrigin: "center center",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95)",
          }}
        >
          <img
            src={imgWellness}
            alt="Mind & Body Sanctuary"
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Card Hero (Delhi Sunset / Top-Left in 2x2 Grid, Top-most in stack, Zooms full screen) */}
        <div
          ref={cardHeroRef}
          className="absolute left-1/2 top-1/2 overflow-hidden shadow-2xl bg-zinc-950 will-change-transform select-none"
          style={{
            zIndex: 40,
            transformOrigin: "center center",
            boxShadow: "0 35px 80px rgba(0, 0, 0, 0.95)",
          }}
        >
          <img
            src={imgHero}
            alt={city.name}
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CityTransitionGallery;
