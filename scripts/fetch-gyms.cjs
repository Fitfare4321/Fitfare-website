/**
 * Fetches all active FitFare gyms from the Public Gyms API at BUILD time and
 * writes them to public/data/gyms.json, which the site serves statically.
 *
 * Why build time: the site is static (GitHub Pages) and the API key must never
 * reach the browser. The key is read from FITFARE_API_KEY (env var or .env) —
 * deliberately NOT prefixed with VITE_, so Vite can never bundle it.
 *
 * Never fails the build: on any error it keeps the previous gyms.json (if any)
 * and the frontend falls back to its demo data.
 */
const fs = require("fs");
const path = require("path");

const BASE = process.env.FITFARE_API_BASE || "https://api.fitfare.in/api/public";
const OUT = path.join(process.cwd(), "public", "data", "gyms.json");
const PAGE_LIMIT = 50; // API max
const MAX_PAGES = 40; // safety cap (2000 gyms)
const TIMEOUT_MS = 10000;

function readKey() {
  if (process.env.FITFARE_API_KEY) return process.env.FITFARE_API_KEY.trim();
  for (const file of [".env.local", ".env"]) {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, "utf8").match(/^\s*FITFARE_API_KEY\s*=\s*["']?([^"'\r\n]+)/m);
    if (m) return m[1].trim();
  }
  return null;
}

async function getPage(key, page) {
  const url = `${BASE}/gyms?page=${page}&limit=${PAGE_LIMIT}`;
  const res = await fetch(url, {
    headers: { "x-api-key": key, Accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    throw new Error(`HTTP ${res.status}: ${body.error || res.statusText}`);
  }
  return body.data || {};
}

/** "badarpur" / "NEW DELHI" → "Badarpur" / "New Delhi" */
function titleCase(s) {
  return s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

/** Test / QA records that shouldn't appear on the public site. */
function isTestRecord(g) {
  return /\b(e2e|test)\b/i.test(`${g.name} ${g.location.city}`) || /^testville$/i.test(g.location.city);
}

/** Usable image URL: http(s), and not a Google Places photo (those need a Google key and 403 in the browser). */
function isUsableImage(u) {
  return typeof u === "string" && /^https?:\/\//.test(u) && !/places\.googleapis\.com/.test(u);
}

/** Keep only the public display fields, normalised to safe shapes. */
function clean(g) {
  const loc = g.location || {};
  const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null);
  return {
    id: String(g.id),
    name: String(g.name || "").trim(),
    images: Array.isArray(g.images) ? g.images.filter(isUsableImage) : [],
    location: {
      city: titleCase(String(loc.city || "").trim()),
      area: String(loc.area || "").trim(),
      latitude: num(loc.latitude),
      longitude: num(loc.longitude),
      map_link: typeof loc.map_link === "string" && /^https?:\/\//.test(loc.map_link) ? loc.map_link : null,
    },
    amenities: Array.isArray(g.amenities) ? g.amenities.filter((a) => typeof a === "string" && a.trim()).map((a) => a.trim()) : [],
  };
}

async function main() {
  const key = readKey();
  if (!key) {
    console.warn("[fetch-gyms] FITFARE_API_KEY not set — skipping (site will use existing/demo data).");
    return;
  }

  const gyms = [];
  let page = 1;
  let totalPages = 1;
  do {
    const data = await getPage(key, page);
    gyms.push(...(data.gyms || []).map(clean).filter((g) => g.id && g.name && !isTestRecord(g)));
    totalPages = Number(data.total_pages) || 1;
    page += 1;
  } while (page <= totalPages && page <= MAX_PAGES);

  if (gyms.length === 0) {
    console.warn("[fetch-gyms] API returned 0 gyms — keeping previous data.");
    return;
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ updated_at: new Date().toISOString(), gyms }));
  console.log(`[fetch-gyms] Wrote ${gyms.length} gyms to ${path.relative(process.cwd(), OUT)}`);
}

main().catch((err) => {
  console.warn(`[fetch-gyms] Could not fetch gyms (${err.message}) — keeping previous data.`);
});
