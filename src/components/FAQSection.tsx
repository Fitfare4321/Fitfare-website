import { FaqAccordion } from "@/components/ui/faq-chat-accordion";
import ParticleText from "@/components/ui/ParticleText";

const faqs = [
  {
    id: 1,
    question: "What is FitFare?",
    answer: "FitFare is an app that lets you discover, book, and access participating fitness centres and activities around you, without needing a traditional gym membership."
  },
  {
    id: 2,
    question: "How do I pay for a booking?",
    answer: "You can pay per booking using your preferred payment method or by adding credits to your FitFare balance and applying them to eligible sessions."
  },
  {
    id: 3,
    question: "Do I need a gym membership to use FitFare?",
    answer: "No. FitFare gives you access to participating fitness centres on a pay-as-you-go basis."
  },
  {
    id: 4,
    question: "Can I use FitFare at any gym?",
    answer: "You can use FitFare at any participating partner centre listed in the app."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-black relative text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="faq-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 flex flex-wrap items-center justify-center gap-x-2 md:gap-x-2.5 gap-y-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="whitespace-nowrap">Confused? We’ve Got</span>
            <div className="relative inline-flex items-center justify-start w-[110px] h-[52px] md:w-[135px] md:h-[68px] flex-shrink-0">
              <ParticleText
                text="You."
                particleSize={3}
                density={4}
                color="#ffffff"
                highlightColor="#ffffff"
                trigger="mount"
                fontSize="clamp(2.25rem, 4.5vw, 3rem)"
                fontWeight={700}
                textAlign="left"
                className="w-full h-full"
              />
            </div>
          </h2>
        </div>

        <FaqAccordion 
          data={faqs}
          className="w-full"
          questionClassName="bg-white/5 hover:bg-white/10 text-white font-bold py-6 px-8 text-2xl border border-white/5"
          answerClassName="bg-white text-black font-semibold py-5 px-8 text-xl max-w-2xl shadow-2xl rounded-tr-sm"
          timestamp=""
        />

      </div>
    </section>
  );
};

export default FAQSection;
