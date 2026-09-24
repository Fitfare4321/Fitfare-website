import { Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/blue-background-logo.png";

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-6 inline-flex">
              <div className="w-10 h-10 rounded-[0.8rem] overflow-hidden">
                <img src={logo} alt="FitFare" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                FitFare
              </span>
            </a>
            <p className="text-gray-400 font-medium text-lg">
              Fitness, Your Way.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-bold text-white mb-6 tracking-tight">FitFare</h4>
            <ul className="space-y-4">
              <li><a href="#activities" className="text-gray-400 hover:text-[#305CDE] font-medium transition-colors">Explore</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-[#305CDE] font-medium transition-colors">How it Works</a></li>
              <li><a href="#partners" className="text-gray-400 hover:text-[#305CDE] font-medium transition-colors">Partner With Us</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-[#305CDE] font-medium transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-bold text-white mb-6 tracking-tight">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-[#305CDE] font-medium transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#305CDE] font-medium transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-900">
          <p className="text-gray-500 font-medium text-sm mb-4 md:mb-0">
            © 2024 FitFare
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#305CDE] transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#305CDE] transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#305CDE] transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
