import { cn } from "@/lib/utils";

const features = [
  {
    title: "NO LONG-TERM LOCK-IN",
    desc: "Book the sessions that work for you without committing to a traditional long-term membership.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop", // Empty gym showing flexibility
  },
  {
    title: "PAY FOR WHAT YOU USE",
    desc: "See the session price before you book and pay for the fitness services you choose.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop", // Weights/gym setup
  },
  {
    title: "MORE CHOICE",
    desc: "Explore participating gyms, classes, and activities near you.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", // Activity/Yoga variety
  },
  {
    title: "ONE EXPERIENCE",
    desc: "Discover, book, and check in with one connected FitFare experience.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2070&auto=format&fit=crop", // Working out smoothly
  }
];

export function FeatureGallery() {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4 h-[600px] md:h-[600px] w-full max-w-6xl mt-12 px-4 mx-auto">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={cn(
            "relative group flex flex-col justify-end overflow-hidden rounded-[1.5rem] md:rounded-[2rem]",
            "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
            "flex-1 hover:flex-[3] cursor-pointer shadow-xl",
            "border border-white/10 hover:border-white/20"
          )}
        >
          {/* Background Image */}
          <img
            className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 filter grayscale-[40%] group-hover:grayscale-0"
            src={feature.image}
            alt={feature.title}
          />
          
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 group-hover:from-black/80 transition-all duration-700" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700" />
          
          {/* Number indicator */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 font-mono text-xl md:text-2xl font-bold text-white/50 group-hover:text-white/90 transition-colors duration-500">
            0{idx + 1}
          </div>

          {/* Collapsed State Content */}
          <div className="absolute inset-0 md:bottom-10 md:left-8 md:top-auto md:right-auto flex items-center justify-center transition-all duration-500 ease-out group-hover:opacity-0 md:group-hover:translate-y-8">
            <h3 
              className="text-lg md:hidden font-bold text-white tracking-wider uppercase opacity-90 drop-shadow-md text-center px-4"
            >
              {feature.title}
            </h3>
            <h3 
              className="hidden md:block text-2xl font-bold text-white whitespace-nowrap tracking-wider uppercase opacity-80"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {feature.title}
            </h3>
          </div>

          {/* Expanded State Content */}
          <div className="relative p-8 md:p-12 opacity-0 translate-y-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:translate-y-0 w-full max-w-2xl hidden md:block">
            <div className="w-12 h-1 bg-[#305CDE] mb-6 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200" />
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              {feature.title}
            </h3>
            <p className="text-gray-300 text-lg drop-shadow-md leading-relaxed max-w-md">
              {feature.desc}
            </p>
          </div>

          {/* Mobile Expanded State Content (simpler for small screens) */}
          <div className="relative p-6 opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 w-full md:hidden flex flex-col justify-end h-full pointer-events-none">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2 drop-shadow-md">
              {feature.title}
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm drop-shadow-md">
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
