import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import {
  ArrowLeft,
  ArrowUpRight,
  Target,
  Globe,
} from "lucide-react";
import "./AboutEditorial.css";
import MissionVisionSection from "./MissionVisionSection";

// High-fidelity fitness photography from the codebase
import gymImg from "@/assets/categories/gym.jpg";
import yogaImg from "@/assets/categories/yoga.jpg";
import pilatesImg from "@/assets/categories/pilates.jpg";
import boxingImg from "@/assets/categories/boxing.jpg";
import functionalImg from "@/assets/categories/functional.jpg";
import heroFitnessImg from "@/assets/gym_interior_color_1790323279413.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Create custom easing profiles from the design system
try {
  CustomEase.create("verticalEase", "0.4, 0, 0.2, 1");
  CustomEase.create("blurEase", "0.65, 0, 0.35, 1");
  CustomEase.create("svgEase", "0.25, 0.1, 0.25, 1");
} catch (e) {
  // Keep silent if eases are already created
}

export default function About() {
  const compRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Interactive step & discipline state for human-crafted responsiveness
  const [activeStep, setActiveStep] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    {
      num: "01",
      tag: "DISCOVER",
      title: "Discover Centres",
      desc: "Browse vetted strength gyms, yoga studios, and combat spaces near you with zero friction.",
      img: gymImg,
      badge: "600+ CURATED SPACES",
      discipline: "STRENGTH & WEIGHTS",
    },
    {
      num: "02",
      tag: "SCHEDULE",
      title: "Schedule Freely",
      desc: "Book single sessions whenever inspiration strikes. Your timetable, strictly on your terms.",
      img: yogaImg,
      badge: "ZERO CALENDAR LOCKS",
      discipline: "MINDFUL YOGA & REFORMER",
    },
    {
      num: "03",
      tag: "FLEXIBILITY",
      title: "Pay As You Go",
      desc: "Fair per-visit pricing. No monthly recurring fees, no surprise subscription renewals.",
      img: boxingImg,
      badge: "PAY ONLY WHEN YOU TRAIN",
      discipline: "COMBAT & ATHLETICS",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 6), y: x * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    // GSAP context for safe React mounting & cleanup
    const ctx = gsap.context(() => {
      // 1. Hero scale & blur animation
      gsap.to(".hero-image", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "blurEase",
      });

      // 2. Hero content staggered reveal
      gsap.fromTo(
        [
          ".editorial-kicker",
          ".editorial-headline",
          ".about-text",
          ".editorial-pillars",
          ".editorial-belief-quote",
        ],
        { y: 35, opacity: 0, filter: "blur(5px)" },
        {
          scrollTrigger: {
            trigger: ".row-content",
            start: "top bottom-=60",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1.1,
          ease: "verticalEase",
        }
      );

      // 4. Gallery clip-path reveals
      const galleryItems = document.querySelectorAll(".gallery-item img");
      galleryItems.forEach((item, index) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: item.parentElement,
              start: "top bottom-=60",
              toggleActions: "play none none reverse",
            },
          })
          .fromTo(
            item,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.1,
              delay: index * 0.08,
              ease: "verticalEase",
            }
          );
      });

      // 5. Gallery caption animation
      gsap.fromTo(
        ".gallery-caption",
        { y: 30, opacity: 0, filter: "blur(4px)" },
        {
          scrollTrigger: {
            trigger: ".gallery-caption",
            start: "top bottom-=60",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "verticalEase",
        }
      );

      // 6. Future experience card reveal
      gsap.fromTo(
        ".future-experience-card",
        { y: 45, opacity: 0, filter: "blur(6px)" },
        {
          scrollTrigger: {
            trigger: ".future-experience-section",
            start: "top bottom-=80",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "verticalEase",
        }
      );
    }, compRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={compRef} className="about-editorial-wrapper wrapper">

      {/* ── Editorial Floating Back Button ── */}
      <button
        onClick={handleBack}
        className="about-back-btn group"
        aria-label="Go back"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Hero Section (#hero)                                              */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section id="hero" className="hero">
        <div className="container">
          {/* Top Full-Width Typographic SVG Wordmark */}
          <div className="row row-svg">
            <div className="col-12">
              <div className="svg-container">
                <svg
                  width="100%"
                  height="auto"
                  viewBox="0 0 1000 120"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto select-none"
                >
                  <text
                    x="500"
                    y="92"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontFamily="'Inter', 'PP Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    fontWeight="900"
                    fontSize="104"
                    letterSpacing="0.15em"
                  >
                    ABOUT US
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Hero Row Content (Editorial Showcase: Interactive Stage Left, Narrative Right) */}
          <div className="row row-content">
            <div className="col-5 hero-left">
              <div
                className="hero-image-stage"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Ambient Backlight Aura */}
                <div className="hero-image-aura" />

                {/* 3D Perspective Card Stage */}
                <div
                  className="hero-image"
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: isHovered
                      ? "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)"
                      : "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Layered Athletics Photography with Fluid Cross-fade */}
                  {steps.map((step, idx) => (
                    <img
                      key={idx}
                      src={step.img}
                      alt={step.title}
                      className={`stage-img ${activeStep === idx ? "active" : ""}`}
                    />
                  ))}
                  <div className="stage-vignette" />

                  {/* Editorial Frame Header */}
                  <div className="stage-frame-header">
                    <span className="stage-meta-tag">ARCHIVE // {steps[activeStep].num}</span>
                    <span className="stage-meta-discipline">{steps[activeStep].discipline}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-1" /> {/* Breathing space */}

            <div className="col-6 hero-right">
              {/* Editorial Kicker */}
              <div className="editorial-kicker">
                <span className="kicker-index">01</span>
                <span className="kicker-sep">/</span>
                <span className="kicker-label">THE FITFARE MANIFESTO</span>
              </div>

              {/* Editorial Display Headline */}
              <h2 className="editorial-headline">
                Fitness That <br />
                <span className="editorial-headline-accent">Fits Your Life.</span>
              </h2>

              {/* Exact Required Body Text */}
              <p className="about-text">
                FitFare makes fitness more flexible by giving people access to fitness centres
                without the commitment of traditional memberships. Whether it’s strength training,
                yoga, dance, or other fitness activities, users can discover centres, schedule their
                sessions, and pay based on when they work out.
              </p>

              {/* 3 Interactive Editorial Pillars (Hover to cross-fade visual stage) */}
              <div className="editorial-pillars">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`editorial-pillar-row ${activeStep === idx ? "active" : ""}`}
                    onMouseEnter={() => setActiveStep(idx)}
                    onClick={() => setActiveStep(idx)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="pillar-num-col">
                      <span className="pillar-num">{step.num}</span>
                      <div className="pillar-indicator" />
                    </div>
                    <div className="pillar-content">
                      <div className="pillar-header">
                        <h3 className="pillar-title">{step.title}</h3>
                        <span className="pillar-badge">{step.tag}</span>
                      </div>
                      <p className="pillar-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Editorial Belief Statement */}
              <div className="editorial-belief-quote">
                <div className="quote-accent-bar" />
                <div className="quote-body">
                  <p className="quote-text">
                    “We believe fitness should fit into your lifestyle,{" "}
                    <span className="quote-highlight">not the other way around.</span>”
                  </p>
                  <div className="quote-meta">
                    <span className="quote-tag">THE FITFARE PRINCIPLE</span>
                    <span className="quote-divider">•</span>
                    <span className="quote-sub">BUILT FOR REAL ROUTINES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Mission & Vision Section (Architectural Interactive Centerpiece)  */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <MissionVisionSection />

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Gallery Section (#gallery) - How FitFare Works                    */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="gallery-header-row">
            <div>
              <div className="gallery-tag">✦ HOW FITFARE WORKS ✦</div>
              <h2 className="gallery-title">Every Movement. Zero Contracts.</h2>
            </div>
            <Link
              to="/for-partners"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
            >
              <span>Explore Partner Studios</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="row">
            <div className="col-12">
              {/* 5 Vertical Gallery Panels with Upward Clip-Path Reveal */}
              <div className="gallery-wrapper">
                <div className="gallery-item">
                  <span className="gallery-item-badge">01 STRENGTH</span>
                  <img src={gymImg} alt="Strength & Gym Training" />
                  <div className="gallery-item-title">Gym & Weights</div>
                </div>

                <div className="gallery-item">
                  <span className="gallery-item-badge">02 MINDFUL</span>
                  <img src={yogaImg} alt="Yoga & Mindfulness" />
                  <div className="gallery-item-title">Yoga Studios</div>
                </div>

                <div className="gallery-item">
                  <span className="gallery-item-badge">03 MOBILITY</span>
                  <img src={pilatesImg} alt="Pilates & Posture" />
                  <div className="gallery-item-title">Reformer Pilates</div>
                </div>

                <div className="gallery-item">
                  <span className="gallery-item-badge">04 COMBAT</span>
                  <img src={boxingImg} alt="Boxing & Agility" />
                  <div className="gallery-item-title">Boxing & Kickboxing</div>
                </div>

                <div className="gallery-item">
                  <span className="gallery-item-badge">05 FUNCTIONAL</span>
                  <img src={functionalImg} alt="Functional & HIIT" />
                  <div className="gallery-item-title">HIIT & Conditioning</div>
                </div>
              </div>

              {/* Caption - How FitFare Works */}
              <div className="gallery-caption">
                <h3>How FitFare Works</h3>
                <p>
                  FitFare connects fitness enthusiasts with fitness centres through a simple,
                  flexible platform. Users can discover participating centres, add credits, and
                  schedule their fitness sessions as needed. Our partner platform helps fitness
                  centres connect with new customers and make their facilities accessible to a
                  wider audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Building a More Flexible Fitness Experience Section               */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="future-experience-section">
        <div className="container">
          <div className="future-experience-card">
            <span className="future-tag">✦ THE HORIZON ✦</span>
            <h2 className="future-headline">Building a More Flexible Fitness Experience</h2>
            <p className="future-body">
              We are working towards a future where staying active is easier, more convenient, and more
              adaptable to everyday life. With our apps available on Android and iOS, FitFare is
              building a growing community around flexible fitness access.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}