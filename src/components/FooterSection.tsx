import { motion } from "framer-motion";
import { Instagram, Linkedin, X, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

import logo from "@/assets/blue-background-logo.png";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Partners", href: "#" },
      { label: "News", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "Events", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Licenses", href: "#" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/fitfare.official/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/firfare/", label: "LinkedIn" },
  { icon: X, href: "https://x.com/fit_fare22291", label: "Twitter" },
];

const FooterSection = () => {
  const { theme } = useTheme();
  const isMoon = theme === "dark";

  return (
    <footer
      className={`
        relative overflow-hidden transition-all duration-500
        ${isMoon ? "bg-slate-900 text-white" : "bg-white text-black"}
      `}
    >

      {/* PURE BACKGROUND (NO GRAY / NO TINT) */}
      <div
        className={`
          absolute inset-0
          ${isMoon ? "bg-slate-900" : "bg-white"}
        `}
      />

      {/* Glow ONLY for dark mode */}
      {isMoon && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-400/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-purple-400/10 blur-3xl rounded-full" />
        </div>
      )}

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={logo} alt="FitFare" className="w-full h-full object-contain" />
              </div>
              <span className={`text-2xl font-bold ${isMoon ? "text-white" : "text-gray-900"}`}>FitFare</span>
            </div>

            <p className={isMoon ? "text-gray-300" : "text-gray-700"}>
              Empowering your fitness journey with flexible access to top gyms and trainers.
              Join the revolution today.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6, scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center
                    border transition-all duration-300
                    ${
                      isMoon
                        ? "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"
                        : "bg-white border-gray-300 shadow-sm text-gray-900 hover:shadow-md hover:border-gray-400"
                    }
                  `}
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* LINKS */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {footerLinks.map((col, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className={`font-bold mb-6 ${isMoon ? "text-white" : "text-gray-900"}`}>{col.title}</h4>

                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className={`
                          flex items-center gap-1 text-sm transition-all duration-300
                          ${
                            isMoon
                              ? "text-gray-400 hover:text-white"
                              : "text-gray-700 hover:text-gray-900"
                          }
                        `}
                      >
                        {link.label}
                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
          isMoon ? "border-gray-700" : "border-gray-300"
        }`}>
          <p className={isMoon ? "text-gray-400 text-sm" : "text-gray-700 text-sm"}>
            © 2025 FitFare. All rights reserved.
          </p>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className={`
                  text-sm transition
                  ${
                    isMoon
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }
                `}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
