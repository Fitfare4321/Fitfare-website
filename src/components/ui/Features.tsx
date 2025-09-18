import { Zap, Target, BarChart3, Users, Heart, Trophy, UserPlus, TrendingUp } from 'lucide-react';


const Features = () => {
  const features = [
    {
      icon: UserPlus,
      title: "Digital Onboarding",
      description: "Quick setup for your gym with zero tech headaches."
    },
    {
      icon: TrendingUp,
      title: "Revenue Engine",
      description: "Tools to boost sales through flexible, dynamic pricing."
    },
    {
      icon: BarChart3,
      title: "Insight Dashboard",
      description: "Real-time data on users, trends, and peak hours."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with like-minded fitness enthusiasts and share your journey together."
    },
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Track your heart rate, sleep patterns, and overall wellness metrics seamlessly."
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn badges and rewards as you reach new fitness milestones and maintain consistency."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="mb-20">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive fitness solutions designed by industry experts to help you achieve 
          lasting results and maintain a healthy lifestyle.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-blue-600">
                <Icon className="w-8 h-8 text-blue-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
