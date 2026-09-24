import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import logo from "@/assets/blue-background-logo.png";



const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.location.hash;
    }
    return true;
  });
  const [progress, setProgress] = useState(0);

  // Handle Progress state
  useEffect(() => {
    if (window.location.hash) {
      setIsLoading(false);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + Math.random() * 18 + 2, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // GSAP Animations
  useGSAP(() => {
    if (!isLoading) return;

    const tl = gsap.timeline();

    // Initial entrance
    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "power3.out",
    });

    // Staggered words
    if (wordsRef.current) {
      const words = gsap.utils.toArray(".preloader-word", wordsRef.current);
      tl.from(
        words,
        {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }

    // Progress bar and percentage entrance
    tl.from(
      [progressContainerRef.current, percentageRef.current],
      {
        opacity: 0,
        duration: 0.5,
      },
      "-=0.3"
    );

    // Continuous Logo Pulse
    gsap.to(pulseRef.current, {
      scale: 1.8,
      opacity: 0,
      duration: 2,
      repeat: -1,
      ease: "power1.out",
    });
  }, [isLoading]);

  // Handle Exit Animation when progress == 100
  useGSAP(() => {
    if (progress >= 100 && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.2, // Small delay at 100% before fading out
        onComplete: () => {
          setIsLoading(false);
        },
      });
    }
  }, [progress]);

  if (!isLoading) return null;

  const words = ["DISCOVER", "BOOK", "TRAIN"];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Logo with subtle pulse */}
      <div className="relative mb-12">
        <div
          ref={pulseRef}
          className="absolute inset-0 rounded-2xl bg-blue-500/30 opacity-50"
          style={{ margin: "-8px" }}
        />

        <img
          ref={logoRef}
          src={logo}
          alt="FitFare"
          className="w-16 h-16 rounded-2xl relative z-10 shadow-sm"
        />
      </div>

      {/* Staggered word reveal */}
      <div ref={wordsRef} className="flex gap-4 mb-12">
        {words.map((word, i) => (
          <span
            key={word}
            className="preloader-word text-xs font-semibold tracking-[0.3em] text-gray-500"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {word}
            {i < words.length - 1 && (
              <span className="ml-4 text-[#305CDE]/60">·</span>
            )}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div
        ref={progressContainerRef}
        className="w-48 h-[2px] bg-gray-200 rounded-full overflow-hidden"
      >
        <div
          className="h-full rounded-full transition-all duration-100 ease-linear"
          style={{
            background: "linear-gradient(90deg, #3b82f5, #305CDE)",
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Progress percentage */}
      <span
        ref={percentageRef}
        className="mt-4 text-[10px] font-medium tracking-widest text-gray-400"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  );
};

export default Preloader;