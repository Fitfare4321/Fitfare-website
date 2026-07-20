import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.webp";
import stripImg from "@/assets/img4.png";
import prizeImg from "@/assets/I3.png";
import FAQ from "@/assets/img5.jpg";
import devfolioLogo from "@/assets/dev.jpg";
import unstopLogo from "@/assets/un.png";
import hackerrankLogo from "@/assets/rank.png";
import hackerearthLogo from "@/assets/earth.jpg";
import { Instagram, Linkedin, X, ArrowRight } from "lucide-react";

/* ─── Floating particle ─── */
const Particle = ({ style }: { style: React.CSSProperties }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 4, height: 4, background: "#a3e635", ...style }}
        animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity }}
    />
);

/* ─── Animated counter ─── */
const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const step = to / 60;
                    const timer = setInterval(() => {
                        start += step;
                        if (start >= to) { setCount(to); clearInterval(timer); }
                        else setCount(Math.floor(start));
                    }, 16);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [to]);
    return <p ref={ref} className="text-6xl font-black tabular-nums">{count}{suffix}</p>;
};

/* ─── FAQ Item ─── */
const faqData = [
    {
        q: "WHAT IS THRIVEATHON?",
        a: "Thriveathon is an intensive 12-hour innovation sprint where participants collaborate to transform real-world challenges into functional, scalable solutions. Blending strategic thinking, user-focused design, and rapid technical development, the event pushes teams to ideate, build, and validate their concepts within a high-energy competitive environment.",
        active: true,
    },
    { q: "WHAT IS THE TEAM SIZE?", a: "Teams can consist of 2 to 4 members. Solo participation is not allowed to encourage collaboration and diverse skill sets within each team." },
    { q: "WHAT IS EXPECTED TO BE BUILT?", a: "Participants are expected to build a functional prototype or MVP that addresses a real-world problem. The solution can be a web app, mobile app, or any digital product." },
    { q: "HOW CAN I GET SHORTLISTED?", a: "Shortlisting is based on your application, team profile, and a brief idea pitch. Strong applications with clear problem statements and innovative approaches have a higher chance of selection." },
    { q: "IS THERE A REGISTRATION FEE?", a: "No! Thriveathon is completely free to enter. We believe in democratizing innovation and removing barriers to participation." },
];

const FAQItem = ({ item, index }: { item: typeof faqData[0]; index: number }) => {
    const [open, setOpen] = useState(item.active ?? false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
            className={`border-b transition-colors ${open ? "border-[#a3e635]/40" : "border-white/10"}`}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-4 text-left group"
            >
                <span className={`text-sm md:text-base font-semibold tracking-wide uppercase transition-colors ${open ? "text-[#a3e635]" : "text-white group-hover:text-[#a3e635]"}`}>
                    {item.q}
                </span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={18} className={open ? "text-[#a3e635]" : "text-white/40"} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-white/60 text-sm md:text-base leading-relaxed pb-5 pr-4">
                            {item.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ThrivethonPage = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseX = useMotionValue(0);

    /* ─── Scroll to top on mount ─── */
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
            mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, []);

    /* ─── Starfield canvas ─── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars: any[] = [];
        for (let i = 0; i < 250; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.8 + 0.2,
                o: Math.random(),
                speed: 0.003 + Math.random() * 0.006,
                drift: (Math.random() - 0.5) * 0.1,
            });
        }

        let raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((s) => {
                s.o += s.speed;
                s.x += s.drift;
                if (s.o > 1) s.o = 0;
                if (s.x < 0) s.x = canvas.width;
                if (s.x > canvas.width) s.x = 0;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(163,230,53,${s.o * 0.65})`;
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        draw();

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#080808] text-white">

            {/* Starfield */}
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

            {/* Glow Orbs */}
            <motion.div
                className="fixed pointer-events-none z-0"
                style={{
                    width: 700,
                    height: 700,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(163,230,53,0.1), transparent 70%)",
                    top: "-200px",
                    left: "-100px",
                    filter: "blur(80px)",
                    x: springX,
                    y: springY,
                }}
                animate={{ x: [0, 50, 0], y: [0, 35, 0] }}
                transition={{ duration: 18, repeat: Infinity }}
            />

            <motion.div
                className="fixed pointer-events-none z-0"
                style={{
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(192,132,252,0.08), transparent 70%)",
                    bottom: "10%",
                    right: "-100px",
                    filter: "blur(80px)",
                }}
                animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
                transition={{ duration: 14, repeat: Infinity }}
            />

            {/* Floating particles */}
            {Array.from({ length: 18 }).map((_, i) => (
                <Particle
                    key={i}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.3,
                    }}
                />
            ))}

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.06, borderColor: "rgba(163,230,53,0.6)" }}
                onClick={() => navigate(-1)}
                className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 bg-black/40 backdrop-blur-sm text-sm transition-colors"
            >
                <ArrowLeft size={16} />
                Back
            </motion.button>

            {/* ───────────────── HERO SECTION ───────────────── */}
            <section className="relative z-10 min-h-screen flex items-center px-6 md:px-20">

                {/* Grid Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(163,230,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Scan line sweep */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: "linear-gradient(transparent 0%, rgba(163,230,53,0.015) 50%, transparent 100%)",
                        backgroundSize: "100% 8px",
                    }}
                    animate={{ backgroundPositionY: ["0px", "800px"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative w-full grid md:grid-cols-2 items-center">

                    {/* LEFT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="relative z-10 max-w-2xl md:ml-28"
                    >

                        {/* Logo Row */}
                        <motion.div
                            className="flex items-center gap-3 mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.span
                                className="text-white text-base tracking-widest"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                A 12-Hour Creative Battle by FitFare
                            </motion.span>
                        </motion.div>

                        {/* Coming Soon */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/70 text-base md:text-lg tracking-widest font-semibold mb-4"
                        >
                            Coming Soon...
                        </motion.p>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="font-black leading-[0.85]"
                            style={{
                                fontSize: "clamp(4.5rem, 11vw, 9rem)",
                                fontFamily: "'Impact', 'Arial Black', sans-serif",
                            }}
                        >
                            <span className="block text-[#a3e635] drop-shadow-[0_0_40px_rgba(163,230,53,0.5)]">THRIVE</span>
                            <span className="block text-white">ATHON</span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="mt-4 text-[#a3e635] font-bold tracking-wide text-lg"
                        >
                            CREATE. DISRUPT. INSPIRE.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex gap-16 mt-12"
                        >
                            <div className="relative group cursor-default">
                                <div className="absolute -inset-4 rounded-xl bg-[#a3e635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Counter to={12} />
                                <p className="text-lg tracking-widest text-white/60 uppercase">Hours</p>
                            </div>
                            <div className="relative group cursor-default">
                                <div className="absolute -inset-4 rounded-xl bg-[#a3e635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <p className="text-6xl font-black tabular-nums">5K</p>
                                <p className="text-lg tracking-widest text-white/60 uppercase">Prizepool</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className="relative flex justify-center md:justify-end">

                        {/* Checkered Accent */}
                        <motion.div
                            className="absolute left-10 top-16 w-72 h-72 opacity-20"
                            style={{
                                backgroundImage: "repeating-conic-gradient(#a3e635 0% 25%, transparent 0% 50%)",
                                backgroundSize: "20px 20px",
                                borderRadius: "2rem",
                            }}
                            animate={{ rotate: [0, 3, 0, -3, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                        />

                        <motion.img
                            src={img1}
                            alt="Designathon"
                            initial={{ opacity: 0, x: 80, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1.1, ease: "easeOut" }}
                            whileHover={{ scale: 1.03, rotate: -1 }}
                            className="relative z-10 w-[420px] md:w-[520px] object-contain md:translate-x-12 drop-shadow-[0_0_60px_rgba(163,230,53,0.18)] cursor-pointer"
                        />
                    </div>
                </div>
            </section>

            {/* ───────────────── WHAT IS THRIVEATHON SECTION ───────────────── */}
            <section className="relative z-10 pt-16 pb-40 px-6 md:px-28 overflow-hidden -mt-15">

                {/* LEFT ALIGNED CONTENT */}
                <div className="max-w-4xl">

                    {/* Icon + Heading Row */}
                    <div className="flex items-center gap-6 mb-10">

                        <motion.img
                            src={img2}
                            alt="Icon"
                            initial={{ opacity: 0, y: 40, rotate: -10 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="w-28 md:w-36 mb-8 cursor-pointer"
                        />

                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-6xl font-extrabold tracking-wide leading-tight"
                        >
                            WHAT IS{" "}
                            <span className="text-[#c084fc] drop-shadow-[0_0_30px_rgba(192,132,252,0.4)]">THRIVEATHON?</span>
                        </motion.h2>

                    </div>

                    {/* Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl"
                    >
                        Hosted by <span className="text-white font-semibold">FitFare</span>,{" "}
                        <span className="text-white font-semibold">Thriveathon</span> is a{" "}
                        <span className="text-white font-semibold">12-hour power-packed creative showdown</span>{" "}
                        where ideas move fast, collaboration thrives, and innovation takes center stage.{" "}
                        It's built for{" "}
                        <span className="text-white font-semibold">students and emerging talents</span>{" "}
                        ready to think big and build bigger.
                    </motion.p>
                </div>

                {/* ───── DOUBLE LAYER DIAGONAL STRIP ───── */}

                {/* Purple Under Layer */}
                <div className="absolute bottom-16 left-0 w-full rotate-[-4deg]">
                    <motion.div
                        className="bg-[#c084fc] py-6"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>

                {/* Green Main Strip Using Image */}
                <div className="absolute bottom-10 left-0 w-full rotate-[-4deg]">
                    <motion.div
                        className="w-full h-24 md:h-28 overflow-hidden"
                        animate={{ x: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img
                            src={stripImg}
                            alt="Thrivethon Strip"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

            </section>

            {/* ───────────────── PRIZE & REGISTER SECTION ───────────────── */}
            <section className="relative z-10 bg-black text-white py-28 px-6 md:px-20 overflow-hidden">

                {/* Top Prize Row */}
                <div className="grid md:grid-cols-3 gap-10 text-center mb-20">

                    {[
                        { label: "Winner", amount: "5,000 INR", color: "#c084fc", delay: 0 },
                        { label: "First Runners Up", amount: "3,000 INR", color: "#a3e635", delay: 0.1 },
                        { label: "Second Runners Up", amount: "2,000 INR", color: "#fde047", delay: 0.2 },
                    ].map(({ label, amount, color, delay }) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="relative group cursor-default"
                        >
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                                style={{ background: `${color}15` }}
                            />
                            <p className="text-white/60 tracking-widest text-sm uppercase">{label}</p>
                            <motion.p
                                className="text-4xl md:text-5xl font-bold mt-2"
                                style={{ color }}
                                animate={{ textShadow: [`0 0 0px ${color}00`, `0 0 30px ${color}60`, `0 0 0px ${color}00`] }}
                                transition={{ duration: 3, repeat: Infinity, delay }}
                            >
                                {amount}
                            </motion.p>
                        </motion.div>
                    ))}

                </div>

                {/* Main Content */}
                <div className="relative z-10 grid md:grid-cols-2 items-center gap-16">

                    {/* LEFT IMAGE */}
                    <motion.div
                        className="relative flex justify-center md:justify-start"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        viewport={{ once: true }}
                    >
                        {/* Soft Glow */}
                        <div className="absolute w-[450px] h-[450px] bg-[#a3e635]/10 blur-[140px] rounded-full" />

                        <motion.img
                            src={prizeImg}
                            alt="Prize Illustration"
                            className="relative z-10 w-[380px] md:w-[520px] object-contain"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{ scale: 1.04 }}
                        />
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <motion.div
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        viewport={{ once: true }}
                    >

                        {/* ANGLED REGISTER BUTTON */}
                        <motion.button
                            className="relative px-12 py-4 font-bold tracking-wide text-white uppercase mb-10 group"
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-[#d946ef] to-[#a855f7] skew-x-[-20deg] rounded-sm"
                                animate={{ boxShadow: ["0 0 0px #d946ef00", "0 0 30px #d946ef60", "0 0 0px #d946ef00"] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            />
                            <span className="relative z-10">REGISTER FOR FREE</span>
                        </motion.button>

                        {/* Deadline */}
                        <p className="text-white/60 tracking-widest uppercase text-sm">
                            Applications Closes On
                        </p>

                        <motion.h3
                            className="text-4xl md:text-6xl font-extrabold mt-3"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            MARCH 20<sup className="text-xl align-super">TH</sup>
                        </motion.h3>
                        <div className="w-full flex justify-center md:justify-start">
                            <button className="mt-10 bg-white text-black px-8 py-3 rounded-lg font-medium flex items-center gap-3 hover:scale-105 transition">
                                <span className="w-3 h-3 bg-black rounded-full"></span>
                                Apply Now
                            </button>
                        </div>
                    </motion.div>

                </div>

                {/* ANIMATED PARTICLES FOR 3RD SECTION */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <Particle
                            key={i}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: 0.3,
                            }}
                        />
                    ))}
                </div>

            </section>
            {/* ───────────────── ROADMAP SECTION ───────────────── */}
            <section className="relative z-10 bg-[#050505] text-white py-32 px-6 md:px-20 overflow-hidden">

                {/* Subtle Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(163,230,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,1) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />
                <div className="relative max-w-7xl mx-auto">

                    {/* Heading + Image Wrapper */}
                    <div className="flex items-center justify-between mb-20">

                        {/* Heading */}
                        <h2 className="text-[42px] md:text-[64px] font-extrabold tracking-tight leading-none flex items-center gap-6">
                            <span className="text-white">HACKATHON</span>
                            <span className="text-[#a855f7]">ROADMAP</span>

                            {/* Image Beside Text */}
                            <div className="relative hidden md:block">
                                {/* Glow Behind */}
                                <div className="absolute inset-0 w-28 h-28 bg-[#a3e635]/20 blur-3xl rounded-full"></div>

                                {/* Icon */}
                                <img
                                    src={img2}
                                    alt="Roadmap Icon"
                                    className="relative w-20 md:w-24 object-contain opacity-90"
                                />
                            </div>
                        </h2>

                    </div>

                    {/* Timeline Grid */}
                    <div className="grid md:grid-cols-2 gap-y-16 gap-x-20">

                        {/* Phase 1 */}
                        <div>
                            <h3 className="text-[#a3e635] font-bold text-lg tracking-wide mb-3">
                                PHASE 1 – PROBLEM STATEMENT & PPT SUBMISSION
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Participants must select a problem statement and prepare a detailed PPT explaining
                                their solution approach. You will have
                                <span className="text-white font-semibold"> 11 days </span>
                                to upload your presentation. Registration closes at the end of this phase.
                            </p>
                        </div>

                        {/* Phase 2 */}
                        <div>
                            <h3 className="text-[#a3e635] font-bold text-lg tracking-wide mb-3">
                                PHASE 2 – PPT PRESENTATION ROUND
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Shortlisted teams will present their PPT and justify their proposed solution.
                                This presentation round will last
                                <span className="text-white font-semibold"> 4 days</span>.
                            </p>
                        </div>

                        {/* Phase 3 */}
                        <div>
                            <h3 className="text-[#a3e635] font-bold text-lg tracking-wide mb-3">
                                PHASE 3 – MVP DEVELOPMENT
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Selected teams will build their
                                <span className="text-white font-semibold"> Minimum Viable Product (MVP)</span>.
                                You will get
                                <span className="text-white font-semibold"> 7 days </span>
                                to develop and submit your working solution.
                            </p>
                        </div>

                        {/* Phase 4 */}
                        <div>
                            <h3 className="text-[#a3e635] font-bold text-lg tracking-wide mb-3">
                                PHASE 4 – RESULT DECLARATION
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Final results will be declared
                                <span className="text-white font-semibold"> 5 days </span>
                                after MVP submission.
                            </p>
                        </div>

                    </div>
                </div>



                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <Particle
                            key={i}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: 0.25,
                            }}
                        />
                    ))}
                </div>

            </section>
            {/* ───────────────── FAQ SECTION ───────────────── */}
            <section className="relative z-10 bg-[#050505] text-white py-28 px-6 md:px-20 overflow-hidden">

                {/* Subtle Grid */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(163,230,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,1) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />

                <div className="relative grid md:grid-cols-2 items-start gap-20">

                    {/* LEFT IMAGE */}
                    <motion.div
                        className="flex justify-center md:justify-start md:sticky md:top-24"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.img
                            src={FAQ}
                            alt="FAQ Retro Illustration"
                            className="w-[400px] md:w-[500px] object-contain rounded-2xl"
                            whileHover={{ scale: 1.03, rotate: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        />
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <div className="max-w-xl">

                        {/* MAIN HEADING */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="text-[45px] md:text-[60px] font-extrabold leading-[1.05] tracking-tight mb-10"
                        >
                            <span>FREQUENTLY ASKED </span>
                            <span className="text-[#a855f7] drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">QUESTIONS</span>
                        </motion.h2>

                        {/* FAQ ACCORDION */}
                        <div className="divide-y divide-white/10">
                            {faqData.map((item, i) => (
                                <FAQItem key={i} item={item} index={i} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <Particle
                            key={i}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: 0.25,
                            }}
                        />
                    ))}
                </div>
            </section>


            {/* ───────────────── PARTNER & FOOTER SECTION ───────────────── */}
            {/* ───────────────── PARTNER & FOOTER SECTION ───────────────── */}
            <section className="relative bg-[#050505] text-white overflow-hidden">
                {/* Subtle grid with dynamic parallax-like feel */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(163,230,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,1) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16">
                    {/* ================= PARTNERS HEADING ================= */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">
                            <span className="text-white">PARTNERING</span>{" "}
                            <span className="text-[#a3e635] drop-shadow-[0_0_30px_rgba(163,230,53,0.3)]">WITH</span>
                        </h2>

                    </motion.div>

                    {/* ================= LOGOS GRID ================= */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-20 ">
                        {[
                            { logo: devfolioLogo, name: "Devfolio" },
                            { logo: unstopLogo, name: "Unstop" },
                            { logo: hackerrankLogo, name: "HackerRank" },
                            { logo: hackerearthLogo, name: "HackerEarth" }
                        ].map((partner, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6 }}
                                className="flex items-center justify-center"
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 rounded-xl"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* ================= MAIN FOOTER CONTENT ================= */}
                    <div className="grid md:grid-cols-3 gap-16 md:gap-24 mb-20">
                        {/* Branding Column */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter mb-1">
                                    THRIVE<span className="text-[#a3e635]">ATHON</span>
                                </h3>
                                <p className="text-[#a3e635] text-xs font-bold tracking-[0.2em] uppercase">
                                    A FitFare Initiative
                                </p>
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                Redefining innovation at the intersection of technology, strategy, and impact.
                                A 12-hour high-performance coding sprint where bold ideas evolve into scalable digital solutions.
                            </p>
                        </div>

                        {/* Contact Column */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold tracking-widest uppercase text-white/40">Connect With Us</h4>
                            <div className="space-y-4">
                                <a href="mailto:thriveathon@fitfare.in" className="block group">
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Drop a mail</p>
                                    <p className="text-white group-hover:text-[#a3e635] transition-colors text-lg font-medium">
                                    info@fitfare.in
                                    </p>
                                </a>
                                <div className="group">
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Call for queries</p>
                                    <p className="text-white text-lg font-medium">
                                        +91 76664 00518
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Column */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold tracking-widest uppercase text-white/40">Follow The Journey</h4>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Instagram size={20} />, link: "https://www.instagram.com/fitfare.official/", label: "Instagram" },

                                    { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/company/firfare/", label: "LinkedIn" }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#a3e635] hover:border-[#a3e635]/50 transition-all backdrop-blur-sm"
                                        title={social.label}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                            <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] leading-relaxed">
                                Join our community of innovators and stays updated on latest events.
                            </p>
                        </div>
                    </div>

                    {/* ================= COPYRIGHT BAR ================= */}
                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-[10px] md:text-xs text-white/30 tracking-[0.2em] font-medium uppercase">
                            © 2026 FITFARE TECHNOLOGY. ALL RIGHTS RESERVED.
                        </div>
                        <div className="flex gap-8 text-[10px] md:text-xs text-white/20 uppercase tracking-widest">
                            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
                        </div>
                    </div>
                </div>

                {/* Floating subtle particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Particle
                            key={i}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: 0.15,
                            }}
                        />
                    ))}
                </div>
            </section>


        </div>
    );
};

export default ThrivethonPage;