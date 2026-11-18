import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Check,
  X,
  Dumbbell,
  Filter,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

// Top quality images for Delhi Fitness Centres
import gymInteriorImg from "@/assets/gym_interior_color_1790323279413.jpg";
import dumbbellsImg from "@/assets/dumbbells_color_1790323293289.jpg";
import heroCardGymImg from "@/assets/hero-card-gym.jpg";
import pilatesImg from "@/assets/categories/pilates.jpg";
import boxingImg from "@/assets/categories/boxing.jpg";
import yogaImg from "@/assets/categories/yoga.jpg";
import crossfitImg from "@/assets/categories/crossfit.jpg";
import swimmingImg from "@/assets/categories/swimming.jpg";

export interface DelhiCenter {
  id: string;
  cardNumber: string; // e.g. "CARD 1"
  name: string;
  category: "Gym & Strength" | "Pilates" | "Functional & HIIT" | "Boxing & Combat" | "Yoga & Mindfulness" | "CrossFit" | "Swimming";
  locality: string;
  fullAddress: string;
  pricePerSession: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  // Stylized two-tone headline matching reference: "Set up your event in minutes: name it, date it, done."
  headline: {
    light1: string;
    bold1: string;
    light2: string;
    bold2: string;
  };
  amenities: string[];
  timing: string;
  nextSlot: string;
}

export const DELHI_CENTERS: DelhiCenter[] = [
  {
    id: "delhi-ozone-defcol",
    cardNumber: "CARD 1",
    name: "Ozone Luxury Fitness & Club",
    category: "Gym & Strength",
    locality: "Defence Colony",
    fullAddress: "D-Block, Main Ring Road, Defence Colony, South Delhi",
    pricePerSession: 349,
    originalPrice: 700,
    rating: 4.92,
    reviewsCount: 284,
    image: gymInteriorImg,
    headline: {
      light1: "Train at ",
      bold1: "Ozone Luxury Fitness",
      light2: ": Olympic racks, Swedish sauna, ",
      bold2: "no contract.",
    },
    amenities: ["Swedish Sauna", "Olympic Barbells", "Valet Parking", "Lockers & Shower"],
    timing: "06:00 AM – 10:30 PM",
    nextSlot: "Today, 05:30 PM",
  },
  {
    id: "delhi-reformer-sanctum",
    cardNumber: "CARD 2",
    name: "The Reformer Sanctum",
    category: "Pilates",
    locality: "Hauz Khas",
    fullAddress: "Near Village Gate, Hauz Khas Enclave, South Delhi",
    pricePerSession: 499,
    originalPrice: 1000,
    rating: 4.96,
    reviewsCount: 198,
    image: pilatesImg,
    headline: {
      light1: "Book your ",
      bold1: "Reformer Pilates slot",
      light2: ": arrive, align, ",
      bold2: "done.",
    },
    amenities: ["Allegro 2 Reformers", "Certified Masters", "Showers", "Private Lockers"],
    timing: "07:00 AM – 08:30 PM",
    nextSlot: "Today, 06:00 PM",
  },
  {
    id: "delhi-cult-cp",
    cardNumber: "CARD 3",
    name: "Cult.fit Elite Flagship Hub",
    category: "Functional & HIIT",
    locality: "Connaught Place",
    fullAddress: "Inner Circle, Block F, Connaught Place, Central Delhi",
    pricePerSession: 299,
    originalPrice: 650,
    rating: 4.88,
    reviewsCount: 520,
    image: heroCardGymImg,
    headline: {
      light1: "Access ",
      bold1: "Cult CP Flagship",
      light2: ": high-energy turf, ",
      bold2: "zero lock-in.",
    },
    amenities: ["Sled Turf Track", "Kettlebell Zone", "DJ Audio System", "Shower & Towel"],
    timing: "06:00 AM – 10:00 PM",
    nextSlot: "Today, 07:00 PM",
  },
  {
    id: "delhi-iron-haven",
    cardNumber: "CARD 4",
    name: "Iron Haven Barbell Club",
    category: "Gym & Strength",
    locality: "Saket",
    fullAddress: "Press Enclave Marg, Saket Business District, South Delhi",
    pricePerSession: 249,
    originalPrice: 500,
    rating: 4.93,
    reviewsCount: 342,
    image: dumbbellsImg,
    headline: {
      light1: "Crush your ",
      bold1: "PR in minutes",
      light2: ": chalk up, lift, ",
      bold2: "done.",
    },
    amenities: ["Eleiko Steel Plates", "Deadlift Jacks", "Chalk Allowed", "Cold Showers"],
    timing: "05:30 AM – 11:00 PM",
    nextSlot: "Today, 06:30 PM",
  },
  {
    id: "delhi-strike-mma",
    cardNumber: "CARD 5",
    name: "Strike MMA & Combat Lab",
    category: "Boxing & Combat",
    locality: "Dwarka",
    fullAddress: "Sector 12 Metro Plaza, Dwarka, West Delhi",
    pricePerSession: 299,
    originalPrice: 600,
    rating: 4.87,
    reviewsCount: 165,
    image: boxingImg,
    headline: {
      light1: "Step into the ",
      bold1: "Boxing Ring",
      light2: ": handwraps on, spar, ",
      bold2: "power.",
    },
    amenities: ["Pro Boxing Ring", "Aqua Heavy Bags", "Gloves Included", "Steam Bath"],
    timing: "06:30 AM – 09:30 PM",
    nextSlot: "Today, 07:30 PM",
  },
  {
    id: "delhi-ananda-yoga",
    cardNumber: "CARD 6",
    name: "Ananda Zen Shala",
    category: "Yoga & Mindfulness",
    locality: "Vasant Kunj",
    fullAddress: "Nelson Mandela Marg, Pocket 8, Vasant Kunj, South Delhi",
    pricePerSession: 349,
    originalPrice: 750,
    rating: 4.95,
    reviewsCount: 215,
    image: yogaImg,
    headline: {
      light1: "Enter your ",
      bold1: "Zen Sanctuary",
      light2: ": unroll mat, breathe, ",
      bold2: "reset.",
    },
    amenities: ["Manduka Cork Mats", "Aromatherapy", "Herbal Tea Bar", "Showers"],
    timing: "06:00 AM – 08:00 PM",
    nextSlot: "Tomorrow, 07:00 AM",
  },
  {
    id: "delhi-crossfit-vayu",
    cardNumber: "CARD 7",
    name: "CrossFit Vayu Lab",
    category: "CrossFit",
    locality: "South Extension",
    fullAddress: "South Extension Part 2, Ring Road, South Delhi",
    pricePerSession: 329,
    originalPrice: 650,
    rating: 4.89,
    reviewsCount: 178,
    image: crossfitImg,
    headline: {
      light1: "Conquer the ",
      bold1: "Daily WOD",
      light2: ": push sleds, sweat, ",
      bold2: "conquer.",
    },
    amenities: ["Rogue Fitness Rigs", "Assault Bikes", "Concept2 Rowers", "Locker Room"],
    timing: "06:00 AM – 09:00 PM",
    nextSlot: "Today, 06:00 PM",
  },
  {
    id: "delhi-aquafit-club",
    cardNumber: "CARD 8",
    name: "AquaFit Olympic Aquatic Centre",
    category: "Swimming",
    locality: "Greater Kailash",
    fullAddress: "Adjacent Siri Fort Road, GK 1, South Delhi",
    pricePerSession: 399,
    originalPrice: 800,
    rating: 4.91,
    reviewsCount: 232,
    image: swimmingImg,
    headline: {
      light1: "Dive into ",
      bold1: "Heated Olympic Lanes",
      light2: ": 50m lap pool, ",
      bold2: "swim free.",
    },
    amenities: ["50m Heated Pool", "UV Sanitized", "Steam Room", "Sun Deck"],
    timing: "06:00 AM – 09:30 PM",
    nextSlot: "Today, 05:00 PM",
  },
];

const LOCALITY_OPTIONS = [
  "All Localities",
  "Connaught Place",
  "South Delhi",
  "Defence Colony",
  "Hauz Khas",
  "Saket",
  "Dwarka",
  "Vasant Kunj",
  "South Extension",
  "Greater Kailash",
];

const CATEGORY_OPTIONS = [
  "All Activities",
  "Gym & Strength",
  "Pilates",
  "Functional & HIIT",
  "Boxing & Combat",
  "Yoga & Mindfulness",
  "CrossFit",
  "Swimming",
];

interface DelhiSearchPillProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onFilterClick: () => void;
  activeFilterCount: number;
  className?: string;
  onSearchSubmit?: () => void;
}

/**
 * ═════════════════════════════════════════════════════════════════
 * SEARCH PILL COMPONENT (Matching Image 1 reference exactly)
 * Translucent frosted glass capsule with:
 * - Magnifying glass icon on left
 * - "Where to?" headline and subtitle
 * - White circular button on right with SlidersHorizontal icon
 * ═════════════════════════════════════════════════════════════════
 */
export const DelhiSearchPill = ({
  searchQuery,
  onSearchChange,
  onFilterClick,
  activeFilterCount,
  className = "",
  onSearchSubmit,
}: DelhiSearchPillProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative w-full max-w-xl mx-auto ${className}`}>
      <div
        onClick={() => inputRef.current?.focus()}
        className="group relative flex items-center justify-between rounded-full bg-black/90 backdrop-blur-xl border border-white/20 p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-white/40 transition-all duration-300 cursor-text"
      >
        {/* Left: Search Icon */}
        <div className="flex items-center gap-3 pl-3 sm:pl-4 flex-1 overflow-hidden">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white/90 shrink-0 group-hover:scale-110 transition-transform" />

          {/* Middle: Text / Input */}
          <div className="flex flex-col text-left flex-1 min-w-0 pr-2">
            <span className="text-white font-semibold text-sm sm:text-base leading-tight tracking-tight">
              Where to?
            </span>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && onSearchSubmit) {
                  onSearchSubmit();
                }
              }}
              placeholder="Find your next fitness studio in Delhi..."
              className="bg-transparent text-white/90 placeholder:text-white/50 text-xs sm:text-sm font-normal outline-none border-none p-0 w-full focus:ring-0 truncate"
            />
          </div>

          {searchQuery && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSearchChange("");
              }}
              className="text-white/60 hover:text-white p-1 rounded-full text-xs hover:bg-white/10 transition-colors"
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Right: Round White Filter Button (Image 1 reference) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFilterClick();
          }}
          className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-slate-950 shadow-lg hover:scale-105 active:scale-95 hover:bg-slate-100 transition-all duration-200 shrink-0 cursor-pointer"
          aria-label="Open filters"
          title="Filter centres"
        >
          <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] text-slate-900" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-black text-black flex items-center justify-center shadow">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

/**
 * ═════════════════════════════════════════════════════════════════
 * CENTER CARD COMPONENT (Matching Image 2 reference exactly)
 * - Ultra-rounded squircle border: rounded-[36px]
 * - Distinct thick white/subtle border ring: border-[3px] border-white/90
 * - Crisp white card body (bg-white text-slate-900)
 * - Inner squircle image: rounded-[26px] with rich contrast
 * - Bottom typography:
 *   - "CARD 1" in uppercase light muted text
 *   - Two-tone styled headline: "Set up your event in minutes: name it, date it, done."
 * ═════════════════════════════════════════════════════════════════
 */
interface CenterCardProps {
  center: DelhiCenter;
  index: number;
  onBook: (center: DelhiCenter) => void;
}

export const CenterCard = ({ center, index, onBook }: CenterCardProps) => {
  // Concentric corner geometry: outer radius = inner radius + padding
  const padding = 8;
  const innerRadius = 26;
  const outerRadius = innerRadius + padding; // 34px

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.012 }}
      whileTap={{ scale: 0.985 }}
      style={{
        padding: `${padding}px`,
        borderRadius: `${outerRadius}px`,
      }}
      className="group relative flex flex-col bg-white shadow-[0_16px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)] transition-all duration-300 select-none cursor-pointer overflow-hidden"
      onClick={() => onBook(center)}
    >
      {/* ── TOP INNER SQUIRCLE IMAGE (Exact concentric radius: 26px) ── */}
      <div
        style={{ borderRadius: `${innerRadius}px` }}
        className="relative w-full aspect-[1.48/1] overflow-hidden bg-neutral-900 ring-1 ring-black/5"
      >
        <img
          src={center.image}
          alt={center.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Apple 3D Bezel / Inner Shadow effect */}
        <div
          style={{ borderRadius: `${innerRadius}px` }}
          className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.22)] ring-1 ring-black/10"
        />
      </div>

      {/* ── BOTTOM TYPOGRAPHY AREA (Exact Image 2 Syntax & Proportions) ── */}
      <div className="pt-4 pb-2 px-1.5 flex flex-col">
        {/* Label matching "CARD 1" in reference */}
        <div className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#9CA3AF] mb-2 sm:mb-2.5">
          {center.cardNumber}
        </div>

        {/* Styled Headline matching "Set up your event in minutes: name it, date it, done." */}
        <p className="text-[17px] sm:text-[19px] md:text-[20px] font-normal leading-[1.3] text-[#9CA3AF] tracking-[-0.015em]">
          {center.headline.light1}
          <span className="font-extrabold text-neutral-950">
            {center.headline.bold1}
          </span>
          {center.headline.light2}
          <span className="font-extrabold text-neutral-950">
            {center.headline.bold2}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

/**
 * ═════════════════════════════════════════════════════════════════
 * MAIN SECTION: DELHI CENTRES EXPLORER
 * Includes:
 * - Header with badge & subtitle
 * - Image 1 Search Pill
 * - Location / Activity Filter pills
 * - Filter Drawer / Popover Modal
 * - Grid of Image 2 Center Cards
 * - Booking / Slot preview modal
 * ═════════════════════════════════════════════════════════════════
 */
export const DelhiCentersSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("All Localities");
  const [selectedCategory, setSelectedCategory] = useState("All Activities");
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCenterForBooking, setSelectedCenterForBooking] = useState<DelhiCenter | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedLocality !== "All Localities") count++;
    if (selectedCategory !== "All Activities") count++;
    if (maxPrice < 600) count++;
    return count;
  }, [selectedLocality, selectedCategory, maxPrice]);

  // Filtered centers
  const filteredCenters = useMemo(() => {
    return DELHI_CENTERS.filter((center) => {
      // Search query filter (matches name, locality, address, or headline words)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = center.name.toLowerCase().includes(q);
        const matchesLocality = center.locality.toLowerCase().includes(q);
        const matchesAddress = center.fullAddress.toLowerCase().includes(q);
        const matchesCategory = center.category.toLowerCase().includes(q);
        const matchesBold = center.headline.bold1.toLowerCase().includes(q) || center.headline.bold2.toLowerCase().includes(q);
        if (!matchesName && !matchesLocality && !matchesAddress && !matchesCategory && !matchesBold) {
          return false;
        }
      }

      // Locality filter
      if (selectedLocality !== "All Localities") {
        if (selectedLocality === "South Delhi") {
          const southAreas = ["Defence Colony", "Hauz Khas", "Saket", "Vasant Kunj", "South Extension", "Greater Kailash"];
          if (!southAreas.includes(center.locality)) return false;
        } else if (center.locality !== selectedLocality) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "All Activities") {
        if (center.category !== selectedCategory) return false;
      }

      // Max price filter
      if (center.pricePerSession > maxPrice) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedLocality, selectedCategory, maxPrice]);

  const handleResetFilters = () => {
    setSelectedLocality("All Localities");
    setSelectedCategory("All Activities");
    setMaxPrice(600);
    setSearchQuery("");
  };

  return (
    <section
      id="delhi-centres"
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#000000] text-slate-100 border-t border-white/[0.08]"
    >
      {/* Subtle warm amber atmospheric depth, completely free of blue */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.015] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Search Pill & Filter Controls */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* ═══════════════════ SEARCH PILL ═══════════════════ */}
          <div>
            <DelhiSearchPill
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterClick={() => setIsFilterModalOpen(true)}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Quick Filter Locality Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {["All Localities", "Connaught Place", "South Delhi", "Saket", "Hauz Khas", "Dwarka", "Vasant Kunj"].map(
              (locality) => {
                const isActive = selectedLocality === locality;
                return (
                  <button
                    key={locality}
                    type="button"
                    onClick={() => setSelectedLocality(locality)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-amber-400 text-black shadow-md font-bold"
                        : "bg-[#141414] text-slate-300 border border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {locality}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Results Counter and Active Filter Tags */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="text-xs sm:text-sm text-slate-400">
            Showing <strong className="text-white font-bold">{filteredCenters.length}</strong> fitness centres in Delhi
            {searchQuery && (
              <span>
                {" "}
                matching &ldquo;<span className="text-amber-300">{searchQuery}</span>&rdquo;
              </span>
            )}
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* ═══════════════════ CARDS GRID (EXACT IMAGE 2 REPLICA) ═══════════════════ */}
        {filteredCenters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
            {filteredCenters.map((center, index) => (
              <CenterCard
                key={center.id}
                center={center}
                index={index}
                onBook={(c) => {
                  setSelectedCenterForBooking(c);
                  setBookingConfirmed(false);
                }}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-3xl bg-[#0D0D0D] border border-white/10 max-w-md mx-auto">
            <Dumbbell className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No centres found</h3>
            <p className="text-sm text-slate-400 mt-2">
              Try adjusting your search query or filters to find partner centres in other Delhi areas.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors"
            >
              View All Centres
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════ FILTER MODAL / DRAWER ═══════════════════ */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg rounded-[32px] bg-[#0E0E0E] border border-white/15 p-6 sm:p-7 shadow-2xl text-slate-100 z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-amber-400" />
                  <h3 className="text-lg font-black text-white">Filter Delhi Centres</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#1A1A1A] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="py-5 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
                {/* Locality Filter */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Locality / Area
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LOCALITY_OPTIONS.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setSelectedLocality(loc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedLocality === loc
                            ? "bg-amber-400 text-black font-bold"
                            : "bg-[#1A1A1A] text-slate-300 hover:bg-[#252525] border border-white/10"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activity Category Filter */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Activity / Training Style
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORY_OPTIONS.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedCategory === cat
                            ? "bg-amber-400 text-black font-bold"
                            : "bg-[#1A1A1A] text-slate-300 hover:bg-[#252525] border border-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Price Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Max Price Per Session
                    </label>
                    <span className="text-sm font-black text-amber-400">₹{maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={600}
                    step={25}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-[#1A1A1A] rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>₹200</span>
                    <span>₹400</span>
                    <span>₹600</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  Apply Filters ({filteredCenters.length} centres)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════ BOOKING / SLOT PREVIEW MODAL ═══════════════════ */}
      <AnimatePresence>
        {selectedCenterForBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCenterForBooking(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-[36px] bg-white text-slate-900 border-[3px] border-white shadow-2xl p-6 sm:p-7 z-10 overflow-hidden"
            >
              {bookingConfirmed ? (
                /* Success State */
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900">Session Confirmed!</h3>
                  <p className="text-sm text-neutral-600 mt-2 max-w-sm mx-auto">
                    Your single-session slot at <strong className="text-neutral-900">{selectedCenterForBooking.name}</strong> is reserved. No contracts, no subscriptions.
                  </p>

                  <div className="my-6 p-4 rounded-2xl bg-neutral-100 text-left space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Center:</span>
                      <span className="font-bold text-neutral-900">{selectedCenterForBooking.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Address:</span>
                      <span className="font-medium text-neutral-800">{selectedCenterForBooking.fullAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Slot:</span>
                      <span className="font-bold text-emerald-600">{selectedCenterForBooking.nextSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Amount Paid:</span>
                      <span className="font-black text-neutral-900">₹{selectedCenterForBooking.pricePerSession}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCenterForBooking(null)}
                    className="w-full py-3 rounded-full bg-black text-white font-bold text-sm hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Slot Selection State */
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        {selectedCenterForBooking.cardNumber} • {selectedCenterForBooking.locality}
                      </span>
                      <h3 className="text-xl font-black text-neutral-900 mt-0.5">
                        {selectedCenterForBooking.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                        <MapPin size={12} className="text-amber-500" />
                        {selectedCenterForBooking.fullAddress}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCenterForBooking(null)}
                      className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-900 flex items-center justify-center"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-5">
                    <img
                      src={selectedCenterForBooking.image}
                      alt={selectedCenterForBooking.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1 border border-white/20">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      {selectedCenterForBooking.rating}
                    </div>
                  </div>

                  {/* Included Amenities */}
                  <div className="mb-5">
                    <span className="text-xs font-bold text-neutral-700 block mb-2">
                      Included with this session pass:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
                      {selectedCenterForBooking.amenities.map((a) => (
                        <div key={a} className="flex items-center gap-1.5">
                          <Check size={13} className="text-emerald-600 stroke-[3]" />
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Choose Slot */}
                  <div className="mb-6">
                    <span className="text-xs font-bold text-neutral-700 block mb-2">
                      Select Workout Slot:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {["Morning (07:00 AM)", "Evening (06:00 PM)", "Night (08:30 PM)"].map((slot, i) => (
                        <button
                          key={slot}
                          type="button"
                          className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                            i === 1
                              ? "border-black bg-neutral-900 text-white"
                              : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Checkout */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-bold uppercase block">
                        Total for 1 session
                      </span>
                      <span className="text-2xl font-black text-neutral-900">
                        ₹{selectedCenterForBooking.pricePerSession}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(true)}
                      className="px-6 py-3 rounded-full bg-black text-white font-bold text-sm hover:bg-neutral-800 transition-colors shadow-lg active:scale-95 flex items-center gap-2"
                    >
                      <ShieldCheck size={16} />
                      Confirm & Pay
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DelhiCentersSection;
