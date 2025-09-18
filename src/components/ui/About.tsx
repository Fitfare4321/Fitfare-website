
import { Percent, DollarSign , Megaphone , BarChart3   } from 'lucide-react';



import CountUp from "react-countup";

const About = () => {

  const stats = [
    { number: 2000000, suffix: "+", label: "Active Users" },
    { number: 150, suffix: "+", label: "Gyms" },
    { number: 95, suffix: "%", label: "Success Rate" },
    { number: 50, suffix: "+", label: "Team Members" },
  ];

  // Format numbers as K/M for thousands and millions
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
  };

  const team = [
    {
      name: "Sarah Mitchell",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Former Olympic athlete with 15+ years in fitness technology."
    },
    {
      name: "Dr. James Rodriguez",
      role: "Head of Sports Science",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "PhD in Exercise Physiology, published researcher in athletic performance."
    },
    {
      name: "Emily Chen",
      role: "Lead Product Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Award-winning UX designer passionate about making fitness accessible."
    }
  ];

  const values = [
    {
      icon: <Percent className="w-8 h-8" />,
      title: "Decreasing Commission Model",
      description: "Grow your revenue as commissions drop from 40% to just 10% the more you earn."
    },
    {
      icon: <DollarSign  className="w-8 h-8" />,
      title: "Dynamic Price Allocation",
      description: "Smart pricing adapts to traffic, weather, and competition to maximize your bookings."
    },
    {
      icon: <Megaphone  className="w-8 h-8" />,
      title: "Zero-Cost Gym Marketing",
      description: "Expand your reach effortlessly without spending a single rupee on advertising."
    },
    {
      icon: <BarChart3   className="w-8 h-8" />,
      title: "Real-Time Gym Dashboard",
      description: "Monitor activity, predict peak hours, and make informed decisions instantly."
    }
  ];


  return (
    <section id="about" className="py-15 bg-white">
        <div className="container mx-auto px-4 ">
            <div className="text-center mb-16 ">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    About FitFare
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    FitFare helps gyms to increase increase revenue, reduce commission, and reach untapped fitness enthusiasts effortlessly.
                    Also, gives users freedom to train anywhere, anytime, no subscriptions, and no boundaries.
                </p>
            </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We started FitFare just a few months ago after facing the same problem ourselves, 
                expensive, rigid gym memberships that didn’t match our schedules. 
                As fitness enthusiasts, our founders realised the industry needed a more flexible, tech-enabled solution.

              </p>
              <p>
                What began as a WhatsApp-based model is now growing into a structured platform, 
                helping gyms onboard digitally and giving users seamless access to fitness spaces. 
                We’re building FitFare into a powerful ecosystem, scalable across cities, adaptable to local needs, 
                and easy for both users and gym partners.

              </p>
              <p>
                Our journey includes feature rollouts, pitching to investors, and closely working with our partner gyms to ensure mutual growth. 
                This is just the beginning, we’re laying the foundation of a fitness revolution that works for everyone.
              </p>
            </div>
          </div>
          
          <div className="relative">

            <h4 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Upcoming Goal
            </h4>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      <CountUp
                        start={0}
                        end={stat.number}
                        duration={2.5}
                        formattingFn={(val) => formatNumber(val) + stat.suffix}
                      />
                    </div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Gyms Benefits</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default About;
