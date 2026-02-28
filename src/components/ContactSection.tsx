import { motion } from "framer-motion";
import { Phone, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const { theme } = useTheme();
  const isMoon = theme === "dark"; // SAME logic as navbar

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
  email: "",
  phone: "",
});


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
  let valid = true;
  const newErrors = { email: "", phone: "" };

  /* -------- Email Validation -------- */
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    newErrors.email = "Enter valid email address";
    valid = false;
  }

  /* -------- Phone Validation (India) -------- */
  const phoneRegex =
    /^(\+91|91)?[6-9]\d{9}$/;

  if (form.phone && !phoneRegex.test(form.phone)) {
    newErrors.phone = "Enter valid  phone number";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } =
      import.meta.env;

    if (VITE_EMAILJS_SERVICE_ID && VITE_EMAILJS_TEMPLATE_ID && VITE_EMAILJS_PUBLIC_KEY) {
      await emailjs.send(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          to_email: "team.fitfare@gmail.com",
        },
        { publicKey: VITE_EMAILJS_PUBLIC_KEY }
      );

      alert("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({ email: "", phone: "" });
    } else {
      const subject = encodeURIComponent("New Contact Form Submission - FitFare");
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "N/A"}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:team.fitfare@gmail.com?subject=${subject}&body=${body}`;
    }
  } catch (error) {
    console.error(error);
    alert("Error sending message");
  }
};


  const inputClasses = `
    w-full rounded-xl px-4 py-3.5 border transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-primary/20
    ${
      isMoon
        ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-400 focus:border-primary"
        : "bg-gray-100 border-gray-300 text-black placeholder:text-gray-500 focus:border-primary"
    }
  `;

  return (
    <section
      id="contact"
      className={`
        section-padding relative overflow-hidden transition-all duration-500
        ${isMoon ? "bg-slate-900 text-white" : "bg-white text-black"}
      `}
    >
      <div className="relative max-w-7xl mx-auto">
        {/* -------- Heading -------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Contact
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Start Your <span className="text-primary">Journey</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* -------- Left Info -------- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <p
              className={`text-lg leading-relaxed ${
                isMoon ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Have questions about plans, pricing, or need a custom solution?
              Our team is ready to help you achieve your goals.
            </p>

            {[
              {
                icon: Phone,
                label: "Call Us",
                value: "+91 7666400518",
                href: "tel:+917666400518",
              },
              {
                icon: Mail,
                label: "Email Us",
                value: "team.fitfare@gmail.com",
                href: "mailto:team.fitfare@gmail.com",
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className={`
                  flex items-center gap-4 p-5 rounded-xl transition-all duration-300 group
                  ${
                    isMoon
                      ? "bg-slate-800 border border-slate-700"
                      : "bg-white border border-gray-200 shadow-sm"
                  }
                `}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  <item.icon className="text-primary" size={22} />
                </motion.div>
                <div>
                  <p
                    className={`text-sm ${
                      isMoon ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className={`font-normal text-base group-hover:text-primary transition-colors ${
                    isMoon ? "text-white" : "text-gray-900"
                  }`}>
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* -------- Form -------- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
           className={`
  p-8 rounded-2xl relative transition-all duration-500 border
  ${
    isMoon
      ? "bg-slate-800 border-blue-500/60 shadow-[0_0_25px_rgba(59,130,246,0.15)]"
      : "bg-white border-gray-200 shadow-lg"
  }
`}

          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm mb-2 ${isMoon ? "text-gray-300" : "text-gray-700"}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${isMoon ? "text-gray-300" : "text-gray-700"}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {errors.email}
  </p>
)}

                </div>
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isMoon ? "text-gray-300" : "text-gray-700"}`}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="+91 9999999999"
                />
                {errors.phone && (
  <p className="text-red-500 text-sm mt-1">
    {errors.phone}
  </p>
)}

              </div>

              <div>
                <label className={`block text-sm mb-2 ${isMoon ? "text-gray-300" : "text-gray-700"}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
