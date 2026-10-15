"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import { Sparkles, RefreshCw, Wand2, ArrowDown } from "lucide-react";

export interface TumbleWallItem {
  id: string;
  name: string;
  role: string;
  src?: string;
  tag?: string;
  shape?: "circle" | "chip";
  bgColor?: string;
  textColor?: string;
}

export interface TumbleWallProps {
  items: TumbleWallItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function TumbleWall({
  items,
  title = "our beautiful people",
  subtitle = "Drag, toss, and play with our collective in this interactive physics wall.",
  className = "",
}: TumbleWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesMapRef = useRef<Map<string, { body: Matter.Body; el: HTMLDivElement }>>(new Map());
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<TumbleWallItem | null>(null);
  const [gravityFlipped, setGravityFlipped] = useState(false);

  // Initialize and spawn physics bodies
  const initPhysics = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clean previous engine
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    }
    bodiesMapRef.current.clear();

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.1, scale: 0.001 },
    });
    engineRef.current = engine;

    // Boundaries: Floor, Left, Right
    const wallOptions: Matter.IBodyDefinition = {
      isStatic: true,
      restitution: 0.6,
      friction: 0.4,
    };

    const ground = Matter.Bodies.rectangle(width / 2, height + 40, width * 2, 80, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -400, width * 2, 80, wallOptions);

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Mouse constraint for throwing bodies
    const mouse = Matter.Mouse.create(container);
    // Adjust mouse offset if container is positioned
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false },
      },
    });
    mouseConstraintRef.current = mouseConstraint;
    Matter.Composite.add(engine.world, mouseConstraint);

    // Spawn elements with stagger
    items.forEach((item, index) => {
      const isCircle = item.shape !== "chip";
      const radius = isCircle ? 44 : 26; // 88px circle or pill
      const pillWidth = isCircle ? radius * 2 : 140;
      const pillHeight = isCircle ? radius * 2 : 48;

      // Spawn staggered along the top
      const spawnX = Math.max(60, Math.min(width - 60, (width / items.length) * (index + 0.5) + (Math.random() - 0.5) * 60));
      const spawnY = -60 - index * 55;

      let body: Matter.Body;
      if (isCircle) {
        body = Matter.Bodies.circle(spawnX, spawnY, radius, {
          restitution: 0.75,
          friction: 0.2,
          frictionAir: 0.015,
          density: 0.004,
          angle: (Math.random() - 0.5) * 0.5,
        });
      } else {
        body = Matter.Bodies.rectangle(spawnX, spawnY, pillWidth, pillHeight, {
          chamfer: { radius: 24 },
          restitution: 0.65,
          friction: 0.3,
          frictionAir: 0.02,
          density: 0.005,
          angle: (Math.random() - 0.5) * 0.8,
        });
      }

      // Add to world
      Matter.Composite.add(engine.world, body);

      // Link to DOM element by ID
      const domEl = container.querySelector(`[data-body-id="${item.id}"]`) as HTMLDivElement;
      if (domEl) {
        bodiesMapRef.current.set(item.id, { body, el: domEl });
      }
    });

    // Run physics loop with requestAnimationFrame
    let animationFrameId: number;
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    const updateDOM = () => {
      bodiesMapRef.current.forEach(({ body, el }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        el.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${angle}rad)`;
      });
      animationFrameId = requestAnimationFrame(updateDOM);
    };

    animationFrameId = requestAnimationFrame(updateDOM);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
    };
  }, [items]);

  // Trigger when scrolled into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            initPhysics();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [hasStarted, initPhysics]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      if (hasStarted) {
        initPhysics();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasStarted, initPhysics]);

  // Physics interaction: Explosion / Impulse to fling all bodies
  const explodePile = () => {
    if (!engineRef.current) return;
    bodiesMapRef.current.forEach(({ body }) => {
      const forceX = (Math.random() - 0.5) * 0.08;
      const forceY = -0.06 - Math.random() * 0.08;
      Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3);
    });
  };

  // Toggle Gravity
  const toggleGravity = () => {
    if (!engineRef.current) return;
    const newFlipped = !gravityFlipped;
    setGravityFlipped(newFlipped);
    engineRef.current.gravity.y = newFlipped ? -0.8 : 1.1;
  };

  // Reset Wall
  const resetWall = () => {
    initPhysics();
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* ── Wall Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 px-4 sm:px-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">
              interactive physics wall
            </span>
          </div>
          <h3 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={explodePile}
            className="px-3.5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ccff00] hover:text-[#ccff00] text-xs font-medium text-zinc-300 transition-all flex items-center gap-1.5 backdrop-blur-md active:scale-95"
            title="Throw all avatars upward"
          >
            <Wand2 size={13} />
            <span>Toss All</span>
          </button>

          <button
            onClick={toggleGravity}
            className={`px-3.5 py-2 rounded-full border text-xs font-medium transition-all flex items-center gap-1.5 backdrop-blur-md active:scale-95 ${
              gravityFlipped
                ? "bg-[#ccff00] text-black border-[#ccff00] font-bold"
                : "bg-white/5 border-white/10 text-zinc-300 hover:border-white/20"
            }`}
            title="Invert Gravity"
          >
            <Sparkles size={13} />
            <span>{gravityFlipped ? "Normal Gravity" : "Zero Gravity"}</span>
          </button>

          <button
            onClick={resetWall}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-zinc-300 transition-all active:scale-95"
            title="Reset Pile"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* ── Active Hover Info Bar ── */}
      <div className="h-9 px-6 flex items-center">
        {hoveredItem ? (
          <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-xs text-[#ccff00] backdrop-blur-md transition-all">
            <span className="font-bold">{hoveredItem.name}</span>
            <span className="text-zinc-400">·</span>
            <span className="text-zinc-300">{hoveredItem.role}</span>
          </div>
        ) : (
          <div className="text-[11px] text-zinc-500 font-mono tracking-wider flex items-center gap-1.5">
            <ArrowDown size={12} className="animate-bounce text-[#ccff00]" />
            <span>Click & drag any item to fling it around the arena</span>
          </div>
        )}
      </div>

      {/* ── Interactive Physics Arena ── */}
      <div
        ref={containerRef}
        className="relative w-full h-[540px] sm:h-[620px] md:h-[680px] rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950/80 via-black to-[#050505] overflow-hidden shadow-2xl backdrop-blur-xl select-none"
      >
        {/* Subtle grid and glowing bottom vignette */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#ccff00]/5 to-transparent pointer-events-none" />

        {/* DOM representations for bodies */}
        {items.map((item) => {
          const isCircle = item.shape !== "chip";
          return (
            <div
              key={item.id}
              data-body-id={item.id}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing pointer-events-auto will-change-transform z-10 transition-shadow"
            >
              {isCircle ? (
                /* Circle Photo Avatar */
                <div className="relative w-[88px] h-[88px] rounded-full p-[2px] bg-gradient-to-br from-white/30 via-white/10 to-transparent shadow-[0_10px_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] hover:scale-105 transition-all group">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-white/20">
                    {item.src ? (
                      <img
                        src={item.src}
                        alt={item.name}
                        className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-white text-lg bg-zinc-800">
                        {item.name[0]}
                      </div>
                    )}
                    {/* Inner subtle glow ring */}
                    <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
                  </div>
                </div>
              ) : (
                /* Pill / Chip Item */
                <div
                  className="px-4 py-2 rounded-full border shadow-[0_8px_20px_rgba(0,0,0,0.7)] flex items-center gap-2 hover:scale-105 transition-all text-xs font-semibold backdrop-blur-md select-none"
                  style={{
                    backgroundColor: item.bgColor || "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.15)",
                    color: item.textColor || "#ffffff",
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                  <span>{item.name}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
