import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Premium cinematic fitness photography (distinct from previous cards)
import treadmillRunnerImg from "@/assets/treadmill_color_1790323310637.jpg";
import yogaStudioImg from "@/assets/yoga_color_1790323324020.jpg";
import gymInteriorImg from "@/assets/gym_interior_color_1790323279413.jpg";
import "./AboutEditorial.css";

const SLIDE_PHOTOS = [
  { src: treadmillRunnerImg, alt: "Cardio & Smart Treadmills" },
  { src: yogaStudioImg, alt: "Mindfulness & Yoga Sanctuary" },
  { src: gymInteriorImg, alt: "State of the Art Fitness Club" },
];

export const MissionVisionSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<"vision" | "mission" | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reliable autoplay timer that smoothly resets on any user interaction
  const resetAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % SLIDE_PHOTOS.length);
    }, 4500);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goToSlide = (idx: number) => {
    setPhotoIndex(idx);
    resetAutoplay();
  };

  const nextSlide = () => {
    setPhotoIndex((prev) => (prev + 1) % SLIDE_PHOTOS.length);
    resetAutoplay();
  };

  const prevSlide = () => {
    setPhotoIndex((prev) => (prev - 1 + SLIDE_PHOTOS.length) % SLIDE_PHOTOS.length);
    resetAutoplay();
  };

  // Intersection observer for subtle scroll triggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Touch gesture / swipe handling for mobile & tablet layouts
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - endX;
    const diffY = touchStartY.current ? Math.abs(touchStartY.current - endY) : 0;

    // Minimum swipe threshold: 35px horizontally and more horizontal than vertical
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      ref={sectionRef}
      className="mission-vision-section"
      style={{
        padding: "0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        background: "#050508",
        overflow: "hidden",
      }}
    >
      {/* Ambient corner glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(48,92,222,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(48,92,222,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
        className="mv-main-grid"
      >
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* LEFT: Content Column                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div
          className={`mv-left-col ${isInView ? "mv-animate-in" : ""}`}
          style={{
            padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 4vw, 5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0",
            position: "relative",
          }}
        >
          {/* Section Kicker */}
          <div
            className="mv-kicker-fade"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "2rem",
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "1px",
                background: "rgba(255,255,255,0.3)",
                display: "block",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', monospace",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#71717a",
              }}
            >
              Why We Exist
            </span>
          </div>

          {/* Vision Card */}
          <div
            className="mv-statement-card"
            onMouseEnter={() => setActiveCard("vision")}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              padding: "2.25rem 2.5rem",
              borderRadius: "1.5rem",
              border: `1px solid ${activeCard === "vision" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"}`,
              background: activeCard === "vision"
                ? "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(48,92,222,0.03) 100%)"
                : "rgba(255,255,255,0.015)",
              marginBottom: "1rem",
              cursor: "default",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: isInView
                ? activeCard === "vision"
                  ? "translateY(-3px)"
                  : "translateY(0)"
                : "translateY(30px)",
              opacity: isInView ? 1 : 0,
              transitionDelay: "0.2s",
              boxShadow: activeCard === "vision"
                ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(48,92,222,0.06)"
                : "0 8px 30px rgba(0,0,0,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle shimmer line on hover */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: activeCard === "vision"
                  ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)"
                  : "transparent",
                transition: "background 0.5s ease",
              }}
            />

            <div style={{ marginBottom: "1rem" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "'Inter', monospace",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                  color: activeCard === "vision" ? "#60a5fa" : "#52525b",
                  marginBottom: "0.35rem",
                  transition: "color 0.3s ease",
                }}
              >
                Our Vision
              </span>
              <h3
                className="mv-card-title"
                style={{
                  margin: 0,
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.2,
                }}
              >
                The Bigger Picture
              </h3>
            </div>

            <p
              className="mv-card-desc"
              style={{
                margin: 0,
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "#a1a1aa",
                fontWeight: 400,
                maxWidth: "460px",
              }}
            >
              To build a fitness ecosystem where everyone can access the right fitness
              experience, wherever life takes them, while helping fitness centres reach more
              people and grow their businesses.
            </p>
          </div>

          {/* Mission Card */}
          <div
            className="mv-statement-card"
            onMouseEnter={() => setActiveCard("mission")}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              padding: "2.25rem 2.5rem",
              borderRadius: "1.5rem",
              border: `1px solid ${activeCard === "mission" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"}`,
              background: activeCard === "mission"
                ? "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(48,92,222,0.03) 100%)"
                : "rgba(255,255,255,0.015)",
              marginBottom: "2.5rem",
              cursor: "default",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: isInView
                ? activeCard === "mission"
                  ? "translateY(-3px)"
                  : "translateY(0)"
                : "translateY(30px)",
              opacity: isInView ? 1 : 0,
              transitionDelay: "0.35s",
              boxShadow: activeCard === "mission"
                ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(48,92,222,0.06)"
                : "0 8px 30px rgba(0,0,0,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: activeCard === "mission"
                  ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)"
                  : "transparent",
                transition: "background 0.5s ease",
              }}
            />

            <div style={{ marginBottom: "1rem" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "'Inter', monospace",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                  color: activeCard === "mission" ? "#60a5fa" : "#52525b",
                  marginBottom: "0.35rem",
                  transition: "color 0.3s ease",
                }}
              >
                Our Mission
              </span>
              <h3
                className="mv-card-title"
                style={{
                  margin: 0,
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.2,
                }}
              >
                What Drives Us
              </h3>
            </div>

            <p
              className="mv-card-desc"
              style={{
                margin: 0,
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "#a1a1aa",
                fontWeight: 400,
                maxWidth: "460px",
              }}
            >
              To make fitness more accessible and flexible by helping people find and pay for
              the fitness experiences that suit their routines, preferences, and schedules.
            </p>
          </div>

          {/* Micro Stats Row */}
          <div
            className="mv-stats-row"
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "2rem",
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            }}
          >
            {[
              { icon: <Users size={14} />, value: "600+", label: "Centres" },
              { icon: <MapPin size={14} />, value: "4+", label: "Cities" },
              { icon: <Clock size={14} />, value: "0", label: "Contracts" },
            ].map((stat, i) => (
              <div
                key={i}
                className="mv-stat-pill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.85rem",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span style={{ color: "#52525b", display: "flex" }}>{stat.icon}</span>
                <span
                  className="mv-stat-val"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="mv-stat-lbl"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    color: "#52525b",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.06em",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>


        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* RIGHT: Cinematic Photo Column                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div
          className="mv-photo-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
            minHeight: "600px",
          }}
        >
          {/* Crossfading Photos */}
          {SLIDE_PHOTOS.map((item, idx) => {
            const isActive = photoIndex === idx;
            return (
              <img
                key={idx}
                src={item.src}
                alt={item.alt}
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : 1,
                  transform: isActive ? "scale(1.02)" : "scale(1.06)",
                  transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 5s cubic-bezier(0.16, 1, 0.3, 1)",
                  filter: "brightness(0.65) contrast(1.1) saturate(0.95)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            );
          })}

          {/* Left edge blend into content column */}
          <div
            className="mv-blend-edge"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #050508 0%, rgba(5,5,8,0.6) 15%, transparent 40%)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />

          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to top, #050508 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />

          {/* Top gradient & seam shield */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "35%",
              background: "linear-gradient(to bottom, #050508 0%, rgba(5,5,8,0.95) 15%, rgba(5,5,8,0.5) 45%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 4,
            }}
          />

          {/* 3px Solid top edge cap preventing any sub-pixel GPU composite bleed */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "#050508",
              pointerEvents: "none",
              zIndex: 6,
            }}
          />

          {/* Right edge subtle gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "15%",
              background: "linear-gradient(to left, rgba(5,5,8,0.4) 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />

          {/* Previous Arrow */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="mv-nav-arrow"
            style={{
              position: "absolute",
              left: "1.25rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            aria-label="Next slide"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="mv-nav-arrow"
            style={{
              position: "absolute",
              right: "1.25rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Photo Index Dots */}
          <div
            className="mv-photo-dots"
            style={{
              position: "absolute",
              bottom: "2.75rem",
              right: "2.5rem",
              zIndex: 10,
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          >
            {SLIDE_PHOTOS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to photo ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "10px 4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: photoIndex === idx ? "22px" : "7px",
                    height: "7px",
                    borderRadius: "4px",
                    background: photoIndex === idx ? "#ffffff" : "rgba(255,255,255,0.35)",
                    boxShadow: photoIndex === idx ? "0 0 12px rgba(255,255,255,0.7)" : "none",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Large watermark text overlay */}
          <div
            className="mv-watermark"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
              pointerEvents: "none",
              whiteSpace: "nowrap" as const,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(3rem, 7vw, 8rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.04)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              FITFARE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
