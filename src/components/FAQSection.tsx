import { FaqAccordion } from "@/components/ui/faq-chat-accordion";

const faqs = [
  {
    id: 1,
    question: "What is FitFare?",
    answer: "FitFare is a flexible fitness platform that lets you discover and access partnered gyms and fitness centres without committing to a traditional long-term membership. Find a centre that suits you, book your workout, and pay based on the fitness services you actually use."
  },
  {
    id: 2,
    question: "How does FitFare work?",
    answer: "Simply create your FitFare account, explore available fitness centres near you, choose the service or session you want, complete your booking, and check in at the centre using FitFare. Your bookings and visits can all be managed through the app."
  },
  {
    id: 3,
    question: "Do I need to buy a monthly or yearly membership?",
    answer: "No. FitFare is built around flexibility rather than long-term commitments. You can access participating fitness centres without locking yourself into a conventional monthly or annual membership. "
  },
  {
    id: 4,
    question: "What are Fit Credits?",
    answer: "Fit Credits are prepaid credits that can be used to book eligible physical fitness services at FitFare partner gyms and studios. Your available balance and transactions can be managed directly through your FitFare account."
  },
  {
    id: 5,
    question: "How do I check in at a fitness centre?",
    answer: "Once you arrive at the centre for your booking, you can use the FitFare app to complete the QR-based check-in process. Your visit is then recorded digitally, making the experience simple for both you and the fitness centre. "
  },
  {
    id: 6,
    question: "Is FitFare suitable for people with irregular schedules or frequent travel?",
    answer: "Yes. FitFare is designed for people whose fitness routine doesn’t always fit a fixed membership whether because of work, travel, college, changing schedules, or simply wanting the freedom to train at different locations."
  },
  {
    id: 7,
    question: "Why should I use FitFare instead of a traditional membership?",
    answer: "A traditional membership usually ties you to one centre and a fixed membership period. FitFare is built around choice and actual usage: discover different fitness centres, book according to your schedule, access multiple locations, and avoid being locked into a long term membership you may not fully use."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-black relative text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="faq-header text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 md:mb-4 flex flex-wrap items-center justify-center gap-x-2 md:gap-x-2.5 gap-y-2 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span>Confused? We’ve Got</span>
            <span className="text-white">You.</span>
          </h2>
        </div>

        <FaqAccordion 
          data={faqs}
          className="w-full"
          questionClassName="bg-white/5 hover:bg-white/10 text-white font-bold py-5 px-6 md:py-6 md:px-8 text-xl md:text-2xl border border-white/5"
          answerClassName="bg-white text-black font-semibold py-4 px-6 md:py-5 md:px-8 text-lg md:text-xl max-w-[90%] md:max-w-2xl shadow-2xl rounded-tr-sm"
          timestamp=""
        />

      </div>
    </section>
  );
};

export default FAQSection;
