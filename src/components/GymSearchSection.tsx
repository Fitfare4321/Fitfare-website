import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, ExternalLink, Loader2, X } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface GymLocation {
  city: string;
  area: string;
  latitude?: number;
  longitude?: number;
  map_link?: string | null;
}

interface Gym {
  id: string;
  name: string;
  images: string[];
  location: GymLocation;
  amenities: string[];
}

// ─── Static fallback data (shown when backend proxy isn't available) ─────────

const STATIC_GYMS: Gym[] = [
  {
    id: "1",
    name: "Ozone Luxury Fitness & Club",
    images: ["/src/assets/gym_interior_color_1790323279413.jpg"],
    location: { city: "Delhi", area: "Defence Colony", map_link: null },
    amenities: ["AC", "Parking", "WiFi", "Locker"],
  },
  {
    id: "2",
    name: "Yoga With Nidhi",
    images: ["/src/assets/program-yoga.jpg"],
    location: { city: "Gurugram", area: "Sector 29", map_link: null },
    amenities: ["AC", "Parking"],
  },
  {
    id: "3",
    name: "FitZone CrossFit Academy",
    images: ["/src/assets/hero-card-gym.jpg"],
    location: { city: "Noida", area: "Sector 62", map_link: null },
    amenities: ["AC", "Shower", "CCTV"],
  },
  {
    id: "4",
    name: "Serenity Yoga Studio",
    images: ["/src/assets/hero-card-yoga.jpg"],
    location: { city: "Delhi", area: "Lajpat Nagar", map_link: null },
    amenities: ["AC", "Locker", "WiFi"],
  },
  {
    id: "5",
    name: "Iron House Gym",
    images: ["/src/assets/gym_interior_gray_1790322595673.jpg"],
    location: { city: "Gurugram", area: "DLF Phase 4", map_link: null },
    amenities: ["AC", "Parking", "Shower", "CCTV"],
  },
  {
    id: "6",
    name: "Wellness Republic",
    images: ["/src/assets/womens_wellness_yoga.png"],
    location: { city: "Noida", area: "Sector 18", map_link: null },
    amenities: ["AC", "WiFi", "Locker"],
  },
];

const CITY_SUGGESTIONS = ["Delhi", "Gurugram", "Noida", "South Delhi", "Indirapuram", "Faridabad", "Ghaziabad"];

// ─── Skeleton Card ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-white/10 aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 bg-white/10 rounded-full w-12" />
          <div className="h-5 bg-white/10 rounded-full w-14" />
          <div className="h-5 bg-white/10 rounded-full w-10" />
        </div>
      </div>
    </div>
  );
}

// ─── Gym Card ────────────────────────────────────────────────────────────────

function GymCard({ gym, index }: { gym: Gym; index: number }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImg = "/src/assets/gym_interior_color_1790323279413.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors group"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-white/5">
        <img
          src={imgError ? fallbackImg : gym.images[0] || fallbackImg}
          alt={gym.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">{gym.name}</h3>
          <p className="text-white/40 text-xs mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 shrink-0" />
            {gym.location.area}, {gym.location.city}
          </p>
        </div>

        {/* Amenity pills */}
        {gym.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {gym.amenities.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-white/50 border border-white/10 rounded-full px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Direction link */}
        {gym.location.map_link ? (
          <a
            href={gym.location.map_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Get Directions
          </a>
        ) : (
          <span className="text-xs text-white/20">Map unavailable</span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function GymSearchSection() {
  const [query, setQuery] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const BASE_API = import.meta.env.VITE_CONTACT_API as string | undefined;

  // ── Fetch gyms from backend proxy (or fallback) ───────────────────────────
  const fetchGyms = useCallback(
    async (city: string) => {
      if (!city.trim()) return;
      setLoading(true);
      setSearched(true);
      setShowSuggestions(false);
      setUsingFallback(false);

      try {
        // TODO: Backend route GET /api/gyms?city=... must be added to
        // fitfare-website-backend.onrender.com before live data appears.
        // Set env var FITFARE_API_KEY on Render and proxy to https://api.fitfare.in/api/public/gyms
        const url = `${BASE_API}/gyms?city=${encodeURIComponent(city)}&limit=12&page=1`;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data: Gym[] = Array.isArray(json) ? json : json.gyms ?? json.data?.gyms ?? [];
        setGyms(data);
        if (data.length === 0) setUsingFallback(false);
      } catch {
        // Backend not ready — show local demo cards filtered by city keyword
        const q = city.toLowerCase();
        const filtered = STATIC_GYMS.filter(
          (g) =>
            g.location.city.toLowerCase().includes(q) ||
            g.location.area.toLowerCase().includes(q)
        );
        setGyms(filtered.length ? filtered : STATIC_GYMS);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    },
    [BASE_API]
  );

  // ── Geolocation → Nominatim reverse geocode ───────────────────────────────
  const handleUseLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await r.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.county ||
            data.address?.state_district ||
            "";
          if (city) {
            setQuery(city);
            fetchGyms(city);
          }
        } finally {
          setLocating(false);
        }
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGyms(query);
  };

  const filteredSuggestions = CITY_SUGGESTIONS.filter((c) =>
    c.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Find Fitness{" "}
            <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Near You
            </span>
          </h2>
          <p className="mt-3 text-white/40 text-sm sm:text-base max-w-md mx-auto">
            Search gyms, studios &amp; fitness centres in your city.
          </p>
        </motion.div>

        {/* ── Search bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-xl mx-auto mb-10"
        >
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            {/* Pill input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => query.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="Search by city or area…"
                className="w-full bg-white text-black placeholder-black/30 rounded-full pl-10 pr-10 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-white/20 shadow-lg"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setSearched(false); setGyms([]); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* City suggestions dropdown */}
              <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl overflow-hidden z-20 py-1"
                  >
                    {filteredSuggestions.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onMouseDown={() => { setQuery(s); fetchGyms(s); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-black hover:bg-black/5 flex items-center gap-2"
                        >
                          <MapPin className="w-3 h-3 text-black/40" />
                          {s}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Filter / location button (dark circle — matches reference image) */}
            <button
              type="button"
              onClick={handleUseLocation}
              disabled={locating}
              title="Use my location"
              className="w-12 h-12 shrink-0 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-50 shadow-lg"
            >
              {locating ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <SlidersHorizontal className="w-5 h-5 text-white" />
              )}
            </button>
          </form>
        </motion.div>

        {/* ── Results ── */}
        <div>
          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Demo / fallback notice */}
          {!loading && usingFallback && gyms.length > 0 && (
            <p className="text-center text-xs text-white/25 mb-6">
              Showing preview cards — live gym data loads once the platform goes live in your city.
            </p>
          )}

          {/* Gym grid */}
          {!loading && gyms.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {gyms.map((gym, i) => (
                <GymCard key={gym.id} gym={gym} index={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && searched && gyms.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-white/30"
            >
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No fitness centres found for "{query}".</p>
              <p className="text-xs mt-1">Try Delhi, Gurugram or Noida.</p>
            </motion.div>
          )}

          {/* Idle state — before any search */}
          {!loading && !searched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-14 text-white/20 text-sm"
            >
              Type a city name or tap the location button to discover gyms near you.
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
