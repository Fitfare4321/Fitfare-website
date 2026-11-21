import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  ExternalLink,
  Loader2,
  X,
  Navigation,
  Compass,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Dumbbell,
  Sparkles,
  Clock,
  Users,
  Activity,
  Music,
  Filter,
  ArrowUpDown,
  ChevronDown,
  Flame,
  CheckCircle2,
} from "lucide-react";

// Asset imports - Images
import gymInteriorImg from "@/assets/gym_interior_color_1790323279413.jpg";
import heroYogaImg from "@/assets/hero-card-yoga.jpg";
import heroGymImg from "@/assets/hero-card-gym.jpg";
import yogaColorImg from "@/assets/yoga_color_1790323324020.jpg";
import dumbbellsImg from "@/assets/dumbbells_color_1790323293289.jpg";
import zumbaImg from "@/assets/zumba.jpg";
import womensWellnessImg from "@/assets/womens_wellness_yoga.png";

// Asset imports - User Amenity Icons
import iconAc from "@/assets/amenities-icons/Hotel-Air-Conditioner--Streamline-Core.png";
import iconLocker from "@/assets/amenities-icons/Closet--Streamline-Core.png";
import iconShower from "@/assets/amenities-icons/Hotel-Shower-Head--Streamline-Core.png";
import iconParking from "@/assets/amenities-icons/Parking-Sign--Streamline-Core.png";
import iconWifi from "@/assets/amenities-icons/Wifi-Signal-Full--Streamline-Core.png";
import iconSauna from "@/assets/amenities-icons/Sauna-Room--Streamline-Core.png";
import iconCctv from "@/assets/amenities-icons/Surveillance-Camera--Streamline-Core.png";
import iconChangingRoom from "@/assets/amenities-icons/Changing room.png";
import iconWater from "@/assets/amenities-icons/Sport-Water-Bottle--Streamline-Core.png";
import iconCafe from "@/assets/amenities-icons/Tea-Cup--Streamline-Core.png";
import iconWashroom from "@/assets/amenities-icons/Toilet--Streamline-Core.png";
import iconTowel from "@/assets/amenities-icons/Towel--Streamline-Plump.png";
import iconElevator from "@/assets/amenities-icons/Elevator--Streamline-Core.png";
import iconRamp from "@/assets/amenities-icons/Disability-Ramp-Down--Streamline-Core.png";
import iconMedical from "@/assets/amenities-icons/Online-Medical-Web-Service--Streamline-Core.png";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GymLocation {
  city: string;
  area: string;
  latitude?: number | null;
  longitude?: number | null;
  map_link?: string | null;
}

interface Gym {
  id: string;
  name: string;
  images: string[];
  location: GymLocation;
  amenities: string[];
  category?: string;
}

// ─── Static Mock Data (Rich preview while backend route is configured) ───────

const STATIC_GYMS: Gym[] = [
  {
    id: "ozone-def-col",
    name: "Ozone Luxury Fitness & Spa",
    images: [gymInteriorImg],
    location: {
      city: "Delhi",
      area: "Defence Colony",
      latitude: 28.5729,
      longitude: 77.2312,
      map_link: "https://maps.google.com/?q=Ozone+Fitness+Defence+Colony+Delhi",
    },
    amenities: ["AC", "Valet Parking", "Steam & Sauna", "WiFi"],
    category: "Gym",
  },
  {
    id: "yoga-nidhi-gurugram",
    name: "Yoga With Nidhi Studio",
    images: [heroYogaImg],
    location: {
      city: "Gurugram",
      area: "Sector 29",
      latitude: 28.4682,
      longitude: 77.0633,
      map_link: "https://maps.google.com/?q=Sector+29+Gurugram",
    },
    amenities: ["AC", "Locker Room", "Shower", "Mats Provided"],
    category: "Yoga",
  },
  {
    id: "fitzone-noida",
    name: "FitZone CrossFit & Strength Lab",
    images: [heroGymImg],
    location: {
      city: "Noida",
      area: "Sector 62",
      latitude: 28.6279,
      longitude: 77.3649,
      map_link: "https://maps.google.com/?q=Sector+62+Noida",
    },
    amenities: ["AC", "Olympic Lifting", "Parking", "CCTV"],
    category: "CrossFit",
  },
  {
    id: "serenity-south-delhi",
    name: "Serenity Pilates & Wellness Club",
    images: [yogaColorImg],
    location: {
      city: "Delhi",
      area: "Greater Kailash / South Delhi",
      latitude: 28.5412,
      longitude: 77.2345,
      map_link: "https://maps.google.com/?q=Greater+Kailash+Delhi",
    },
    amenities: ["Reformer Pilates", "AC", "WiFi", "Café"],
    category: "Pilates",
  },
  {
    id: "iron-house-dlf",
    name: "Iron House Barbell Club",
    images: [dumbbellsImg],
    location: {
      city: "Gurugram",
      area: "DLF Phase 4",
      latitude: 28.4721,
      longitude: 77.0863,
      map_link: "https://maps.google.com/?q=DLF+Phase+4+Gurugram",
    },
    amenities: ["24/7 Access", "AC", "Free Parking", "Shower"],
    category: "Gym",
  },
  {
    id: "pulse-zumba-noida",
    name: "Pulse Zumba & Dance Sanctuary",
    images: [zumbaImg],
    location: {
      city: "Noida",
      area: "Sector 18",
      latitude: 28.5708,
      longitude: 77.3271,
      map_link: "https://maps.google.com/?q=Sector+18+Noida",
    },
    amenities: ["Zumba", "AC", "Sound System", "Changing Rooms"],
    category: "Zumba",
  },
  {
    id: "womens-wellness-saket",
    name: "Aura Women's Fitness Collective",
    images: [womensWellnessImg],
    location: {
      city: "Delhi",
      area: "Saket",
      latitude: 28.5244,
      longitude: 77.2066,
      map_link: "https://maps.google.com/?q=Saket+Delhi",
    },
    amenities: ["Women Only", "AC", "Personal Training", "Parking"],
    category: "Gym",
  },
];

const POPULAR_CITIES = [
  "Delhi",
  "Gurugram",
  "Noida",
  "South Delhi",
  "Indirapuram",
];

const CATEGORIES = ["All", "Gym", "Yoga", "CrossFit", "Pilates", "Zumba"];
const POPULAR_AMENITIES = ["AC", "Parking", "Shower", "Locker", "Steam & Sauna", "WiFi"];

// ─── Custom Filter Slider SVG (Matches Exact Reference Image) ────────────────

const FilterSliderIcon = ({ className = "w-5 h-5 text-white" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Top line with slider circle on the right */}
    <line x1="3" y1="8" x2="21" y2="8" />
    <circle cx="16.5" cy="8" r="2.8" fill="#18181b" stroke="currentColor" strokeWidth="2.2" />

    {/* Bottom line with slider circle on the left */}
    <line x1="3" y1="16" x2="21" y2="16" />
    <circle cx="7.5" cy="16" r="2.8" fill="#18181b" stroke="currentColor" strokeWidth="2.2" />
  </svg>
);

// ─── Custom Clean Amenity Icons ─────────────────────────────────────────────

const ParkingSignIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
  </svg>
);

const LockerIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <line x1="7" y1="5" x2="10" y2="5" />
    <line x1="14" y1="5" x2="17" y2="5" />
  </svg>
);

// ─── Amenity Icons Resolver (Shows ALL Amenity Icons for Each Centre) ────────

interface AmenityItem {
  id: string;
  label: string;
  iconImg?: string;
  IconComponent?: React.ComponentType<{ className?: string }>;
}

const AMENITY_DEFINITIONS: Array<{
  id: string;
  label: string;
  match: (name: string) => boolean;
  iconImg?: string;
  IconComponent?: React.ComponentType<{ className?: string }>;
}> = [
  // 1. Air Conditioning / Climate
  {
    id: "ac",
    label: "Air Conditioning",
    iconImg: iconAc,
    match: (n) => /\b(ac|a\/c|air[- ]?condition|air[- ]?purifier|cooler)\b/i.test(n) || n.toLowerCase() === "ac",
  },
  // 2. Parking (Valet / Free / General) - Clean Cutout P Sign
  {
    id: "parking",
    label: "Parking Available",
    IconComponent: ParkingSignIcon,
    match: (n) => /parking/i.test(n),
  },
  // 3. High-Speed WiFi / Internet
  {
    id: "wifi",
    label: "High-Speed WiFi",
    iconImg: iconWifi,
    match: (n) => /wifi|wi-fi|internet/i.test(n),
  },
  // 4. Showers & Bathing
  {
    id: "shower",
    label: "Showers",
    iconImg: iconShower,
    match: (n) => /shower/i.test(n),
  },
  // 5. Lockers (Personal / Open / Storage)
  {
    id: "locker",
    label: "Lockers",
    IconComponent: LockerIcon,
    match: (n) => /locker/i.test(n),
  },
  // 6. Sauna & Steam Room / Spa / Jacuzzi
  {
    id: "sauna",
    label: "Sauna & Steam",
    iconImg: iconSauna,
    match: (n) => /sauna|steam|jacuzzi|spa/i.test(n),
  },
  // 7. Changing Rooms
  {
    id: "changing",
    label: "Changing Rooms",
    iconImg: iconChangingRoom,
    match: (n) => /chang|chnag/i.test(n),
  },
  // 8. Washroom / Restroom / Toilet
  {
    id: "washroom",
    label: "Clean Washrooms",
    iconImg: iconWashroom,
    match: (n) => /washroom|wash room|washoom|toilet|restroom/i.test(n),
  },
  // 9. CCTV & Security
  {
    id: "cctv",
    label: "CCTV Security",
    iconImg: iconCctv,
    match: (n) => /cctv|surveillance|security/i.test(n),
  },
  // 10. Café / Cafeteria / Coffee
  {
    id: "cafe",
    label: "Café & Nutrition",
    iconImg: iconCafe,
    match: (n) => /caf[eé]|cafeteria|coffee/i.test(n),
  },
  // 11. Drinking Water / Hydration
  {
    id: "water",
    label: "Purified Water",
    iconImg: iconWater,
    match: (n) => /water|hydration/i.test(n),
  },
  // 12. First Aid & Medical
  {
    id: "medical",
    label: "First Aid Kit",
    iconImg: iconMedical,
    match: (n) => /first aid|medical/i.test(n),
  },
  // 13. Towels Provided
  {
    id: "towel",
    label: "Towel Service",
    iconImg: iconTowel,
    match: (n) => /towel/i.test(n),
  },
  // 14. Elevator / Lift Access
  {
    id: "elevator",
    label: "Elevator / Lift",
    iconImg: iconElevator,
    match: (n) => /elevator|lift/i.test(n),
  },
  // 15. Accessible Ramp / Wheelchair
  {
    id: "ramp",
    label: "Wheelchair Accessible Ramp",
    iconImg: iconRamp,
    match: (n) => /ramp|disability|wheelchair/i.test(n),
  },
  // 16. Strength / Olympic Lifting / Barbell
  {
    id: "equipment",
    label: "Strength Equipment",
    IconComponent: Dumbbell,
    match: (n) => /lifting|equipment|barbell|weight/i.test(n),
  },
  // 17. Yoga Props & Mats / Reformer
  {
    id: "props",
    label: "Yoga Mats & Props",
    IconComponent: Sparkles,
    match: (n) => /yoga prop|yoga mat|mats|pilates|reformer/i.test(n),
  },
  // 18. 24/7 Access
  {
    id: "access247",
    label: "24/7 Access",
    IconComponent: Clock,
    match: (n) => /24\/7|24-7|24 hour/i.test(n),
  },
  // 19. Personal Training & Coaches / Women Only
  {
    id: "training",
    label: "Personal Training",
    IconComponent: Users,
    match: (n) => /trainer|training|coach|women/i.test(n),
  },
  // 20. Zumba / Dance / Music / Sound System
  {
    id: "dance",
    label: "Music & Dance Studio",
    IconComponent: Music,
    match: (n) => /sound|audio|music|zumba|dance/i.test(n),
  },
];

function getAmenityItems(amenities: string[]): AmenityItem[] {
  const result: AmenityItem[] = [];
  const seenIds = new Set<string>();

  for (const raw of amenities) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    const def = AMENITY_DEFINITIONS.find((d) => d.match(trimmed));
    if (def && !seenIds.has(def.id)) {
      seenIds.add(def.id);
      result.push({
        id: def.id,
        label: def.label,
        iconImg: def.iconImg,
        IconComponent: def.IconComponent,
      });
    }
  }

  return result;
}

// ─── Helpers for live API data ───────────────────────────────────────────────

/** The API has no category field, so infer one from the centre's name. */
function inferCategory(name: string): string {
  const n = name.toLowerCase();
  if (/cross\s?fit/.test(n)) return "CrossFit";
  if (/pilates/.test(n)) return "Pilates";
  if (/zumba|dance/.test(n)) return "Zumba";
  if (/yoga|shala/.test(n)) return "Yoga";
  return "Gym";
}

/** Great-circle distance in km. */
function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

function formatDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km < 10 ? km.toFixed(1) : Math.round(km)} km`;
}

/** Cards rendered per batch in the carousel ("Load more" adds another batch). */
const PAGE_SIZE = 12;

// ─── Center Card Component (Matches Reference Image Exactly - Square Shape) ─

function GymCard({ gym, distance, eager }: { gym: Gym; distance?: number | null; eager?: boolean }) {
  const [imgErr, setImgErr] = useState(false);
  const fallback = gymInteriorImg;
  const imageSrc = !imgErr && gym.images && gym.images.length > 0 ? gym.images[0] : fallback;

  const mapUrl =
    gym.location.map_link ||
    `https://maps.google.com/?q=${encodeURIComponent(`${gym.name} ${gym.location.area} ${gym.location.city}`)}`;

  const amenityItems = getAmenityItems(gym.amenities);

  return (
    <div className="group relative rounded-[24px] sm:rounded-[30px] md:rounded-[32px] overflow-hidden isolate [transform:translateZ(0)] [backface-visibility:hidden] aspect-square w-[82vw] max-w-[340px] xs:w-[320px] sm:w-[340px] md:w-[370px] lg:w-[390px] xl:w-[410px] shrink-0 snap-start flex flex-col justify-between p-4 sm:p-5 md:p-6 border border-white/15 bg-neutral-950 shadow-2xl transition-colors duration-300 hover:border-white/35 select-none">
      {/* ── Background Full-bleed Photo ── */}
      <img
        src={imageSrc}
        alt={gym.name}
        onError={() => setImgErr(true)}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
      />

      {/* ── Dark Gradient Overlays (Guarantees 100% legibility top and bottom) ── */}
      <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black via-black/85 via-50% to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

      {/* ── Top Row: Category Badge (Left) ── */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/45 text-white text-[11px] sm:text-xs font-semibold tracking-wide border border-white/20 shadow-sm">
          {gym.category || "Fitness"}
        </span>
      </div>

      {/* ── Bottom Section: Name, Location, Amenities Icons ── */}
      <div className="relative z-10 space-y-2 sm:space-y-2.5 mt-auto">
        {/* Center Name (Large & Bold matching Reference) */}
        <h3 className="text-white text-base sm:text-lg md:text-xl font-extrabold leading-tight tracking-tight drop-shadow-md line-clamp-2">
          {gym.name}
        </h3>

        {/* Center Location (Sub-row matching Reference Coach line) */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-white/85 hover:text-white text-xs sm:text-sm font-medium transition-colors drop-shadow"
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
          </div>
          <span className="line-clamp-1">
            {[gym.location.area, gym.location.city].filter(Boolean).join(", ")}
            {distance != null && (
              <span className="text-white/80 font-medium"> · {formatDistance(distance)}</span>
            )}
          </span>
          <ExternalLink className="w-3 h-3 opacity-60 ml-0.5 shrink-0" />
        </a>

        {/* ── Amenities Row (Only Icons, All Amenities of the Centre) ── */}
        {amenityItems.length > 0 && (
          <div className="pt-2 sm:pt-2.5 border-t border-white/15 flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {amenityItems.map((item) => (
              <div
                key={item.id}
                title={item.label}
                aria-label={item.label}
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex items-center justify-center shrink-0 group/amenity cursor-default"
              >
                {item.iconImg ? (
                  <img
                    src={item.iconImg}
                    alt={item.label}
                    className="w-full h-full object-contain brightness-0 invert drop-shadow opacity-95 group-hover/amenity:opacity-100 group-hover/amenity:scale-110 transition-all"
                  />
                ) : item.IconComponent ? (
                  <item.IconComponent className="w-full h-full text-white drop-shadow opacity-95 group-hover/amenity:opacity-100 group-hover/amenity:scale-110 transition-all" />
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Skeleton Card (Square Shape) ────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-[24px] sm:rounded-[30px] md:rounded-[32px] overflow-hidden aspect-square w-[82vw] max-w-[340px] xs:w-[320px] sm:w-[340px] md:w-[370px] lg:w-[390px] xl:w-[410px] shrink-0 snap-start bg-[#141416] border border-white/10 animate-pulse flex flex-col justify-between p-4 sm:p-5 md:p-6">
      <div className="flex items-center justify-between">
        <div className="h-5 sm:h-6 w-16 sm:w-20 bg-white/10 rounded-full" />
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full" />
      </div>
      <div className="space-y-3 mt-auto">
        <div className="h-5 w-3/4 bg-white/10 rounded" />
        <div className="h-4 w-1/2 bg-white/10 rounded" />
        <div className="pt-2.5 border-t border-white/10 flex items-center gap-2.5">
          <div className="w-4 h-4 rounded-full bg-white/10" />
          <div className="w-4 h-4 rounded-full bg-white/10" />
          <div className="w-4 h-4 rounded-full bg-white/10" />
          <div className="w-4 h-4 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

// ─── Main GymSearchSection Component ─────────────────────────────────────────

export default function GymSearchSection() {
  // All centres: live data from /data/gyms.json (built from the FitFare Public
  // Gyms API by scripts/fetch-gyms.cjs), or the demo set if that's unavailable.
  const [allGyms, setAllGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const [query, setQuery] = useState(""); // text in the input
  const [activeQuery, setActiveQuery] = useState(""); // applied search
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<"location" | "category" | "amenities">("location");
  const [sortBy, setSortBy] = useState<"distance" | "newest" | "name" | "amenities">("distance");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
        setFilterMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ── Load centres once ──────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/gyms.json`, {
          cache: "no-cache",
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list: Gym[] = (Array.isArray(json?.gyms) ? json.gyms : [])
          .filter((g: Gym) => g && g.id && g.name && g.location)
          .map((g: Gym) => ({ ...g, category: g.category || inferCategory(g.name) }));
        if (!list.length) throw new Error("empty");
        if (!cancelled) {
          setAllGyms(list);
          setIsLive(true);
        }
      } catch {
        if (!cancelled) {
          setAllGyms(STATIC_GYMS);
          setIsLive(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Cities derived from the data (most centres first) ──────────────────────
  const cities = useMemo(() => {
    if (!isLive) return POPULAR_CITIES;
    const counts = new Map<string, number>();
    for (const g of allGyms) {
      const c = g.location.city;
      if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c);
  }, [allGyms, isLive]);

  // Helper to normalize location queries (e.g. "New Delhi" <-> "Delhi", strip punctuation)
  const normalizeSearch = (str: string) =>
    (str || "")
      .toLowerCase()
      .replace(/\bnew delhi\b/g, "delhi")
      .replace(/[^\w\s]/g, " ")
      .trim();

  // ── Filter + sort (all client-side) ────────────────────────────────────────
  const results = useMemo(() => {
    const normQuery = normalizeSearch(activeQuery);
    const words = normQuery.split(/\s+/).filter(Boolean);
    let list = allGyms.filter((g) => {
      if (selectedCategory !== "All" && g.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          g.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }
      if (!words.length) return true;
      const haystack = normalizeSearch(
        [g.name, g.location?.city, g.location?.area, ...(g.amenities || [])].filter(Boolean).join(" ")
      );
      return words.every((w) => haystack.includes(w));
    });

    let distances = new Map<string, number>();
    if (userPos) {
      distances = new Map(
        list
          .filter((g) => g.location.latitude != null && g.location.longitude != null)
          .map((g) => [g.id, distanceKm(userPos.lat, userPos.lng, g.location.latitude!, g.location.longitude!)])
      );
    }

    if (sortBy === "distance" && userPos) {
      list = [...list].sort((a, b) => (distances.get(a.id) ?? Infinity) - (distances.get(b.id) ?? Infinity));
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "amenities") {
      list = [...list].sort((a, b) => (b.amenities?.length || 0) - (a.amenities?.length || 0));
    }
    return { list, distances };
  }, [allGyms, activeQuery, selectedCategory, userPos, selectedAmenities, sortBy]);

  const gyms = results.list.slice(0, visibleCount);
  const hasMore = results.list.length > visibleCount;

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (activeQuery ? 1 : 0) +
    (userPos ? 1 : 0) +
    selectedAmenities.length;

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Back to the start of the carousel whenever the result set changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    carouselRef.current?.scrollTo({ left: 0 });
  }, [activeQuery, selectedCategory, userPos, selectedAmenities]);

  // Close filter or location dropdown on Escape key
  useEffect(() => {
    if (filterMenuOpen || showDropdown) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setFilterMenuOpen(false);
          setShowDropdown(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [filterMenuOpen, showDropdown]);

  const checkScroll = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, gyms.length, loading]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cards = (Array.from(container.children) as HTMLElement[]).filter(
        (el) => el.getAttribute("aria-hidden") !== "true"
      );
      const currentScroll = container.scrollLeft;

      if (direction === "right") {
        const nextCard = cards.find((card) => card.offsetLeft > currentScroll + 100);
        if (nextCard) {
          container.scrollTo({ left: nextCard.offsetLeft, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 360, behavior: "smooth" });
        }
      } else {
        const prevCard = [...cards].reverse().find((card) => card.offsetLeft < currentScroll - 100);
        if (prevCard) {
          if (prevCard === cards[0]) {
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            container.scrollTo({ left: prevCard.offsetLeft, behavior: "smooth" });
          }
        } else {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Actions ────────────────────────────────────────────────────────────────
  const applySearch = (term: string) => {
    setQuery(term);
    setActiveQuery(term);
    setShowDropdown(false);
  };

  const resetAll = () => {
    applySearch("");
    setSelectedCategory("All");
    setUserPos(null);
    setSelectedAmenities([]);
    setGeoError(null);
  };

  // "Near Me": sort centres by real distance using their coordinates.
  // The position stays in the browser — nothing is sent anywhere.
  const handleAutoLocation = () => {
    setShowDropdown(false);
    setGeoError(null);
    if (!navigator.geolocation) {
      setGeoError("Location isn't supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        applySearch("");
      },
      (err) => {
        setLocating(false);
        setGeoError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied — pick a city instead."
            : "Couldn't get your location — pick a city instead."
        );
      },
      { timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applySearch(query);
  };

  const handleCitySelect = (cityName: string) => applySearch(cityName);

  const handleCategorySelect = (category: string) => setSelectedCategory(category);

  // Only offer category chips that actually have centres
  const categories = CATEGORIES.filter(
    (c) => c === "All" || allGyms.some((g) => g.category === c)
  );

  const matchingLocations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return cities.slice(0, 8).map((city) => ({
        label: city,
        sub: "City",
      }));
    }

    const cleanQ = q.replace(/[^\w\s]/g, " ").trim();
    const qWords = cleanQ.split(/\s+/).filter(Boolean);
    const results: Array<{ label: string; sub: string }> = [];
    const seen = new Set<string>();

    // 1. Check city names first
    for (const city of cities) {
      const cLower = city.toLowerCase();
      const normCity = cLower.replace(/\bnew delhi\b/g, "delhi");
      const normQ = q.replace(/\bnew delhi\b/g, "delhi");
      if (
        cLower.includes(q) ||
        normCity.includes(normQ) ||
        (qWords.length > 0 && qWords.every((w) => cLower.includes(w)))
      ) {
        if (!seen.has(cLower)) {
          seen.add(cLower);
          results.push({ label: city, sub: "City" });
        }
      }
    }

    // 2. Check area and area + city combinations from gyms
    for (const gym of allGyms) {
      const area = gym.location?.area?.trim();
      const city = gym.location?.city?.trim();
      if (!area) continue;

      const full = city ? `${area}, ${city}` : area;
      const fullLower = full.toLowerCase();
      const haystack = `${area} ${city || ""}`.toLowerCase().replace(/[^\w\s]/g, " ");

      if (
        fullLower.includes(q) ||
        (qWords.length > 0 && qWords.every((w) => haystack.includes(w)))
      ) {
        if (!seen.has(fullLower)) {
          seen.add(fullLower);
          results.push({ label: full, sub: city || "Area" });
        }
      }
    }

    return results.slice(0, 8);
  }, [query, cities, allGyms]);

  return (
    <section id="centres" className="py-16 sm:py-20 md:py-24 bg-black text-white relative z-10 border-t border-white/10 w-full overflow-hidden">
      {/* ── Top Centered Section: Header, Search Bar & Quick Filters ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <div className="text-center mb-8 md:mb-10">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Find Fitness Near You
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Discover gyms, yoga shalas, CrossFit boxes &amp; boutique studios with instant pay-per-session access.
          </p>
        </div>

        {/* ── Search Bar Container (Matches Reference Image) ── */}
        <div
          ref={searchContainerRef}
          className="relative max-w-xl mx-auto mb-6"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all hover:shadow-[0_10px_35px_rgba(255,255,255,0.1)] focus-within:ring-2 focus-within:ring-white/40 selection:bg-neutral-900 selection:text-white"
          >
            {/* Left: Search Magnifying Glass Icon */}
            <div className="pl-4 pr-2 text-neutral-500 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-neutral-500" strokeWidth={2} />
            </div>

            {/* Input with exact placeholder "Search" */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onClick={() => setShowDropdown(true)}
              placeholder="Search"
              className="flex-1 bg-transparent text-neutral-900 placeholder:text-neutral-400 text-base font-normal outline-none px-1 py-2 selection:bg-neutral-900 selection:text-white"
              autoComplete="off"
            />

            {/* Clear Query Button */}
            {query && (
              <button
                type="button"
                onClick={() => {
                  applySearch("");
                  inputRef.current?.focus();
                }}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors mr-1"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Right: Dark Circular Filter Button with Slider Icon (Image 2) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFilterMenuOpen((prev) => !prev);
                setShowDropdown(false);
              }}
              aria-label="Open filter options"
              title="Filter by Location, Category & Amenities"
              className={`relative w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                filterMenuOpen || activeFilterCount > 0
                  ? "bg-black text-white ring-2 ring-white/50"
                  : "bg-[#18181b] hover:bg-neutral-800 text-white active:scale-95"
              }`}
            >
              <FilterSliderIcon className="w-5 h-5 text-white" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-black font-extrabold text-[10px] flex items-center justify-center ring-2 ring-black">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </form>

          {/* ── Location Search Results Dropdown (Clean White Card Theme) ── */}
          {showDropdown && (
            <div className="absolute top-full mt-3 left-0 right-0 bg-white border border-neutral-200/80 rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] z-40 animate-in fade-in zoom-in-95 duration-150">
              {/* Header: Title on Left, Close (X) on Right */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                  Select Your Location
                </h3>
                <button
                  type="button"
                  onClick={() => setShowDropdown(false)}
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
                  aria-label="Close location search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Pill-shaped Location Results */}
              <div className="space-y-2.5 max-h-[320px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {/* Location Pills */}
                {matchingLocations.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      handleCitySelect(loc.label);
                      setShowDropdown(false);
                    }}
                    className="w-full px-5 py-3.5 rounded-full border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-300 active:scale-[0.99] text-left flex items-center gap-3 transition-all group"
                  >
                    <MapPin className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 shrink-0 transition-colors" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-800 group-hover:text-neutral-950 truncate">
                      {loc.label}
                    </span>
                  </button>
                ))}

                {matchingLocations.length === 0 && (
                  <div className="text-center py-6 text-neutral-500 text-xs">
                    No matching locations found for "{query}".
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Cascading Filter Popup (Opens via Search Bar Slider Icon Button) ── */}
          {filterMenuOpen && (
            <div
              ref={filterDropdownRef}
              className="absolute top-full mt-3 right-0 z-50 flex flex-col sm:flex-row items-stretch sm:items-start gap-1.5 animate-in fade-in zoom-in-95 duration-150"
            >
              {/* Panel 1: Primary Categories List (Left Panel) - Pure White Theme */}
              <div className="w-[170px] sm:w-[195px] bg-white border border-neutral-200/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-1.5 flex flex-col gap-0.5">
                {/* Category 1: Location */}
                <button
                  type="button"
                  onMouseEnter={() => setActiveFilterTab("location")}
                  onClick={() => setActiveFilterTab("location")}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors group ${
                    activeFilterTab === "location"
                      ? "bg-neutral-100 text-neutral-950 font-semibold"
                      : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-neutral-700 shrink-0" />
                    <span>Location</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {(userPos || activeQuery) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
                  </div>
                </button>

                {/* Category 2: Category */}
                <button
                  type="button"
                  onMouseEnter={() => setActiveFilterTab("category")}
                  onClick={() => setActiveFilterTab("category")}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors group ${
                    activeFilterTab === "category"
                      ? "bg-neutral-100 text-neutral-950 font-semibold"
                      : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Dumbbell className="w-4 h-4 text-neutral-700 shrink-0" />
                    <span>Category</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {selectedCategory !== "All" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
                  </div>
                </button>

                {/* Category 3: Amenities */}
                <button
                  type="button"
                  onMouseEnter={() => setActiveFilterTab("amenities")}
                  onClick={() => setActiveFilterTab("amenities")}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors group ${
                    activeFilterTab === "amenities"
                      ? "bg-neutral-100 text-neutral-950 font-semibold"
                      : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-neutral-700 shrink-0" />
                    <span>Amenities</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {selectedAmenities.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-neutral-900 text-white text-[10px] font-bold">
                        {selectedAmenities.length}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
                  </div>
                </button>

                {/* Divider & Reset */}
                {activeFilterCount > 0 && (
                  <>
                    <div className="h-px bg-neutral-200 my-1 mx-1" />
                    <button
                      type="button"
                      onClick={resetAll}
                      className="w-full px-3 py-1.5 rounded-lg text-xs text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors flex items-center gap-2"
                    >
                      <RotateCcw className="w-3 h-3 text-neutral-500" />
                      <span>Reset all</span>
                    </button>
                  </>
                )}
              </div>

              {/* Panel 2: Cascading Submenu Options (Right Panel) - Pure White Theme */}
              <div className="w-[210px] sm:w-[245px] bg-white border border-neutral-200/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-1.5 flex flex-col gap-0.5 max-h-[340px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {/* Location Submenu */}
                {activeFilterTab === "location" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        if (userPos) {
                          setUserPos(null);
                        } else {
                          handleAutoLocation();
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors ${
                        userPos
                          ? "bg-neutral-100 text-neutral-950 font-semibold"
                          : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Compass className={`w-3.5 h-3.5 text-neutral-700 ${locating ? "animate-spin" : ""}`} />
                        <span>Near Me (GPS)</span>
                      </div>
                      {userPos && <Check className="w-4 h-4 text-neutral-950 shrink-0" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => applySearch("")}
                      className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors ${
                        !activeQuery && !userPos
                          ? "bg-neutral-100 text-neutral-950 font-semibold"
                          : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-neutral-400 flex items-center justify-center shrink-0" />
                        <span>All Locations</span>
                      </div>
                      {!activeQuery && !userPos && <Check className="w-4 h-4 text-neutral-950 shrink-0" />}
                    </button>

                    {cities.slice(0, 8).map((cityName) => {
                      const isSel = activeQuery.toLowerCase() === cityName.toLowerCase();
                      return (
                        <button
                          key={cityName}
                          type="button"
                          onClick={() => {
                            if (isSel) {
                              applySearch("");
                            } else {
                              applySearch(cityName);
                            }
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors ${
                            isSel
                              ? "bg-neutral-100 text-neutral-950 font-semibold"
                              : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            <span>{cityName}</span>
                          </div>
                          {isSel && <Check className="w-4 h-4 text-neutral-950 shrink-0" />}
                        </button>
                      );
                    })}
                  </>
                )}

                {/* Category Submenu */}
                {activeFilterTab === "category" && (
                  <>
                    {categories.map((cat) => {
                      const isSel = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors ${
                            isSel
                              ? "bg-neutral-100 text-neutral-950 font-semibold"
                              : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {cat === "All" && <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700 shrink-0" />}
                            {cat === "Gym" && <Dumbbell className="w-3.5 h-3.5 text-neutral-700 shrink-0" />}
                            {cat === "Yoga" && <Sparkles className="w-3.5 h-3.5 text-neutral-700 shrink-0" />}
                            {cat === "CrossFit" && <Flame className="w-3.5 h-3.5 text-neutral-700 shrink-0" />}
                            {cat === "Pilates" && <Activity className="w-3.5 h-3.5 text-neutral-700 shrink-0" />}
                            {cat === "Zumba" && <Music className="w-3.5 h-3.5 text-neutral-700 shrink-0" />}
                            <span>{cat}</span>
                          </div>
                          {isSel && <Check className="w-4 h-4 text-neutral-950 shrink-0" />}
                        </button>
                      );
                    })}
                  </>
                )}

                {/* Amenities Submenu */}
                {activeFilterTab === "amenities" && (
                  <>
                    {POPULAR_AMENITIES.map((amenity) => {
                      const isSel = selectedAmenities.includes(amenity);
                      return (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors ${
                            isSel
                              ? "bg-neutral-100 text-neutral-950 font-semibold"
                              : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${isSel ? "bg-neutral-950" : "bg-neutral-300"}`} />
                            <span>{amenity}</span>
                          </div>
                          {isSel && <Check className="w-4 h-4 text-neutral-950 shrink-0" />}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Horizontal Slider Controls (Edge-to-Edge aligned) ── */}
      {gyms.length > 0 && (
        <div
          className="w-full mb-4 flex items-center justify-end"
          style={{ paddingLeft: "clamp(24px, 5vw, 72px)", paddingRight: "clamp(24px, 5vw, 72px)" }}
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous centre"
              title="Slide left"
              className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white transition-all border border-white/10 shadow-sm ${
                !canScrollLeft
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/15 active:scale-95"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next centre"
              title="Slide right"
              className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white transition-all border border-white/10 shadow-sm ${
                !canScrollRight
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/15 active:scale-95"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Cards Horizontal Sliding Track (Full Width Edge-to-Edge) ── */}
      <div className="relative w-full">
        {loading && (
          <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div
              className="shrink-0 snap-start pointer-events-none"
              style={{ width: "clamp(24px, 5vw, 72px)" }}
              aria-hidden="true"
            />
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
            <div
              className="shrink-0 pointer-events-none"
              style={{ width: "clamp(24px, 5vw, 72px)" }}
              aria-hidden="true"
            />
          </div>
        )}

        {!loading && gyms.length > 0 && (
          <div
            ref={carouselRef}
            onScroll={checkScroll}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
          >
            {/* Leading spacer: creates the visible space on the left at the start, exactly matching the end of the slide */}
            <div
              className="shrink-0 snap-start pointer-events-none"
              style={{ width: "clamp(24px, 5vw, 72px)" }}
              aria-hidden="true"
            />

            {gyms.map((gym, i) => (
              <GymCard
                key={gym.id}
                gym={gym}
                distance={results.distances.get(gym.id) ?? null}
                eager={i < 4}
              />
            ))}
            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="shrink-0 snap-start aspect-square w-[60vw] max-w-[240px] sm:w-[240px] rounded-[24px] sm:rounded-[30px] md:rounded-[32px] border border-dashed border-white/20 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/35 transition-colors flex flex-col items-center justify-center gap-2 text-white"
              >
                <ChevronRight className="w-6 h-6" />
                <span className="text-sm font-semibold">Load more</span>
                <span className="text-xs text-neutral-400">
                  {results.list.length - visibleCount} more centres
                </span>
              </button>
            )}

            {/* Trailing spacer: creates the matching space on the right at the end */}
            <div
              className="shrink-0 pointer-events-none"
              style={{ width: "clamp(24px, 5vw, 72px)" }}
              aria-hidden="true"
            />
          </div>
        )}

        {!loading && gyms.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#141416] border border-white/10 rounded-2xl max-w-md mx-auto my-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-neutral-400">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-white font-semibold text-base mb-1">
              {activeQuery ? `No centres found for "${activeQuery}"` : "No centres match these filters"}
            </h4>
            <p className="text-neutral-400 text-xs mb-4">
              We're rapidly expanding across Delhi NCR. Try{" "}
              {cities.slice(0, 3).join(", ") || "another city"}.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              View all centres
            </button>
          </div>
        )}
      </div>

    </section>
  );
}
