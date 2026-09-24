import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What is FitFare?",
    a: "FitFare is an app that lets you discover, book, and access participating fitness centres and activities around you, without needing a traditional gym membership."
  },
  {
    q: "How do I pay for a booking?",
    a: "You can pay per booking using your preferred payment method or by adding credits to your FitFare balance and applying them to eligible sessions."
  },
  {
    q: "Do I need a gym membership to use FitFare?",
    a: "No. FitFare gives you access to participating fitness centres on a pay-as-you-go basis."
  },
  {
    q: "Can I use FitFare at any gym?",
    a: "You can use FitFare at any participating partner centre listed in the app."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(".faq-header", {
      scrollTrigger: { trigger: el, start: "top 85%" },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".faq-item", {
      scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: sectionRef });

  const toggleFaq = (idx: number) => {
    const isClosing = openIndex === idx;
    const currentRef = contentRefs.current[idx];
    const prevRef = openIndex !== null ? contentRefs.current[openIndex] : null;

    if (prevRef && openIndex !== idx) {
      gsap.to(prevRef, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
    }

    if (isClosing) {
      if (currentRef) gsap.to(currentRef, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      setOpenIndex(null);
    } else {
      if (currentRef) {
        gsap.set(currentRef, { height: "auto" });
        const targetHeight = currentRef.clientHeight;
        gsap.fromTo(currentRef, 
          { height: 0, opacity: 0 },
          { height: targetHeight, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
      setOpenIndex(idx);
    }
  };

  return (
    <section ref={sectionRef} id="faq" className="py-24 bg-black relative text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="faq-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq-list space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="faq-item border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-colors hover:bg-white/10"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                onClick={() => toggleFaq(i)}
              >
                <span className="text-lg font-bold text-white pr-8">
                  {faq.q}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-400 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-[#305CDE]" : ""}`} 
                />
              </button>
              
              <div 
                ref={el => contentRefs.current[i] = el}
                className="h-0 overflow-hidden opacity-0"
              >
                <div className="p-6 pt-0 text-gray-400 font-medium leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
