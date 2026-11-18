import React, { useState } from "react";
import gymInteriorImg from "@/assets/gym_interior_color_1790323279413.jpg";

// DM Serif Display font helper for React (configured in tailwind / index.css)
const serif = { className: "font-serif" };

// Week days & dates matching reference calendar capsule design
const WEEK_DAYS = [
  { day: "Mon", date: 10 },
  { day: "Tue", date: 11 },
  { day: "Wed", date: 12 },
  { day: "Thu", date: 13 },
  { day: "Fri", date: 14 },
  { day: "Sat", date: 15 },
  { day: "Sun", date: 16 },
];

const CATS = ["Gyms", "Yoga", "Pilates"];

// React Link adapter matching Next.js Link interface
const Link = ({
  href,
  children,
  className,
  style,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}) => (
  <a href={href} className={className} style={style} {...props}>
    {children}
  </a>
);

export default function OnDemandHero() {
  // Tue (1), Thu (3), Fri (4 - highlighted active day like in reference screenshot)
  const [bookedDays, setBookedDays] = useState<number[]>([1, 3, 4]);

  const toggleDay = (index: number) => {
    setBookedDays((prev) =>
      prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index].sort()
    );
  };

  return (
    <section
      className="ff bg-[#060608] p-2 text-white sm:p-3 lg:p-4"
    >
      <style>{`
        @keyframes ff-rise{from{transform:translateY(110%)}to{transform:none}}
        @keyframes ff-pop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}
        @keyframes ff-fade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        @keyframes ff-lit{from{opacity:.12;transform:scale(.6)}to{opacity:1;transform:none}}
        @keyframes ff-ping{75%,100%{transform:scale(2.4);opacity:0}}
        .ff-pop{animation:ff-pop .9s cubic-bezier(.2,.8,.2,1) both}
        .ff-fade{animation:ff-fade .9s cubic-bezier(.2,.8,.2,1) both}
        .ff-rise{animation:ff-rise 1s cubic-bezier(.2,.8,.2,1) both}
        .ff-lit{animation:ff-lit .6s cubic-bezier(.3,1.4,.5,1) both}
        .ff-ping{animation:ff-ping 2s cubic-bezier(0,0,.2,1) infinite}
        @media (prefers-reduced-motion:reduce){.ff *{animation:none!important;transition:none!important}}
      `}</style>

      <div className="relative max-w-[1400px] mx-auto">
        {/* ───────── main tile: clean non-overlapping flex layout ───────── */}
        <div className="ff-pop relative flex min-h-[calc(100svh-1rem)] sm:min-h-[calc(100svh-1.5rem)] flex-col justify-between overflow-hidden rounded-[28px] sm:rounded-[36px] bg-neutral-950 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] px-5 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-7 lg:px-12 lg:pb-10 lg:pt-8">
          
          {/* Background Fitness Centre Image - Bright, Vivid & Beautifully Visible */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src={gymInteriorImg}
              alt="Premium Fitness Centre"
              className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-100 transition-transform duration-1000 ease-out"
            />
            {/* Smooth scrim gradients to ensure crisp text readability without obscuring the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/45 to-neutral-950/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/30 to-transparent" />
          </div>

          {/* ────── TOP BAR: Category Pills (Right) ────── */}
          <div className="relative z-10 flex items-center justify-end gap-2 mb-6 sm:mb-8">
            {CATS.map((c) => (
              <Link
                key={c}
                href="#download"
                className="rounded-full bg-black/40 hover:bg-white hover:text-black border border-white/15 px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs font-semibold text-neutral-200 transition-all duration-200 backdrop-blur-md"
              >
                {c}
              </Link>
            ))}
          </div>

          {/* ────── MID ROW: Floating Capsule Calendar Card (Right) ────── */}
          <div className="relative z-10 flex justify-end my-auto py-2">
            {/* Week calendar card: modern capsule pills matching reference */}
            <div
              className="ff-fade w-full max-w-sm rounded-[26px] border border-neutral-100 bg-white p-4 sm:p-5 text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] lg:w-[350px] shrink-0"
              style={{ animationDelay: ".5s" }}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-neutral-800">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="ff-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  </span>
                  This week
                </span>
                <span className="font-semibold text-neutral-900">From ₹14/day</span>
              </div>

              {/* Horizontal Capsule Date Strip (Matches User Screenshot) */}
              <div className="mt-3.5 flex items-center justify-between gap-1 sm:gap-1.5">
                {WEEK_DAYS.map((item, i) => {
                  const on = bookedDays.includes(i);
                  return (
                    <button
                      key={item.day}
                      type="button"
                      onClick={() => toggleDay(i)}
                      className={`group relative flex flex-col items-center justify-between rounded-full w-10 sm:w-11 h-[68px] sm:h-[72px] py-2 transition-all duration-300 select-none ${
                        on
                          ? "ff-lit bg-[#18181b] text-white shadow-md scale-[1.03]"
                          : "bg-[#f4f4f6] text-neutral-800 hover:bg-[#eaeaea] hover:scale-[1.02]"
                      }`}
                      style={on ? { animationDelay: `${0.6 + i * 0.12}s` } : undefined}
                      title={on ? `${item.day} ${item.date} (Booked)` : `Click to book ${item.day}`}
                    >
                      <span
                        className={`text-[11px] sm:text-xs tracking-tight transition-colors ${
                          on ? "text-white/90 font-medium" : "text-neutral-500 font-normal"
                        }`}
                      >
                        {item.day}
                      </span>
                      <span
                        className={`text-sm sm:text-base tracking-tight transition-colors ${
                          on ? "text-white font-semibold" : "text-neutral-900 font-normal"
                        }`}
                      >
                        {item.date}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-neutral-100">
                <p className="text-xs sm:text-sm text-neutral-600">
                  <strong className="text-neutral-900 font-semibold">{bookedDays.length} workouts</strong> booked. Pay for only those.
                </p>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  On demand
                </span>
              </div>
            </div>
          </div>

          {/* ────── BOTTOM ROW: Giant Typography + CTA Block (Full Width, No Clipped Right Padding) ────── */}
          <div className="relative z-10 mt-auto pt-4">
            <h1 className={`${serif.className} text-[2.25rem] leading-[1.04] sm:text-5xl lg:text-6xl xl:text-[4.5rem] tracking-[-0.02em]`}>
              <span className="block overflow-hidden pb-1">
                <span className="ff-rise block text-white" style={{ animationDelay: ".25s" }}>
                  Paying for a full month.
                </span>
              </span>
              <span className="block overflow-hidden pb-1 text-white/50">
                <span className="ff-rise block" style={{ animationDelay: ".4s" }}>
                  Showing up for a few days?
                </span>
              </span>
            </h1>

            <p className="ff-fade mt-3.5 max-w-md text-sm sm:text-base lg:text-lg text-white/85 font-normal leading-relaxed" style={{ animationDelay: ".6s" }}>
              Busy weeks happen. Your fitness spending should fit your routine.
            </p>

            <div className="ff-fade mt-5 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ animationDelay: ".8s" }}>
              <Link
                href="#download"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white text-neutral-950 px-7 py-3.5 text-sm font-bold shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.03] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Find a workout that fits your day</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <span className="text-xs sm:text-sm font-medium text-white/80">Options from ₹14/day to ₹500+.*</span>
            </div>
            
            <p className="ff-fade mt-3 text-[11px] text-white/50 italic" style={{ animationDelay: ".95s" }}>
              *Prices vary by centre, activity and booking. Check the app for current rates and availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
