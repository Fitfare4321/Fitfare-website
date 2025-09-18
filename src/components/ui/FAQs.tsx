
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI-powered workout system work?",
      answer: "Our AI analyzes your fitness level, goals, available equipment, time constraints, and progress to create personalized workout plans. It continuously adapts based on your performance, feedback, and changing needs."
    },
    {
      question: "Can I use FitFare without any equipment?",
      answer: "Absolutely! FitFare offers extensive bodyweight workout programs that require no equipment. You can also specify what equipment you have available, and the AI will customize workouts accordingly."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! All plans come with a 7-day free trial. You can explore all features and see if FitFare is right for you. No credit card required to start your trial."
    },
    {
      question: "How accurate is the progress tracking?",
      answer: "Our tracking system uses advanced algorithms to monitor your progress across multiple metrics including strength gains, endurance improvements, body composition changes, and consistency patterns. Data is analyzed in real-time for maximum accuracy."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no penalties or fees. Your access will continue until the end of your current billing period."
    },
    {
      question: "Do you offer nutrition guidance?",
      answer: "Yes! Pro and Elite plans include personalized nutrition recommendations, meal planning assistance, and macro tracking to complement your fitness routine."
    },
    {
      question: "Is FitFare suitable for beginners?",
      answer: "Definitely! FitFare is designed for all fitness levels. Our AI starts by assessing your current fitness level and creates beginner-friendly programs that gradually progress as you improve."
    },
    {
      question: "How does the community support work?",
      answer: "FitFare includes access to our supportive community where you can connect with other users, share progress, participate in challenges, and get motivation from like-minded individuals on similar fitness journeys."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-blue-50/50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about FitFare. Can't find the answer you're looking for? 
            Feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 bg-gray-50">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default FAQ;
