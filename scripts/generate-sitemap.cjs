const fs = require("fs");
const path = require("path");

const SITE_URL = "https://fitfare.in";
const root = process.cwd();

function readFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function extractStaticRoutes() {
  const app = readFile("src/App.tsx");

  return [...app.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map((match) => match[1])
    .filter(
      (route) =>
        !route.includes(":") &&
        !route.startsWith("/owner-access") &&
        route !== "*"
    );
}

function extractSlugs(relativePath) {
  const content = readFile(relativePath);
  return [...content.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function extractBlogSlugs() {
  const blog = readFile("src/pages/Blog.tsx");
  const slugs = new Set();

  for (const match of blog.matchAll(/\/blog\/([a-z0-9-]+)/g)) {
    slugs.add(match[1]);
  }

  for (const match of blog.matchAll(/const post\d+Id = "([^"]+)"/g)) {
    slugs.add(match[1]);
  }

  return [...slugs];
}

function extractPublicHtmlPaths() {
  const publicDir = path.join(root, "public");
  const htmlPaths = [];

  function walk(currentDir, urlPrefix) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const nextDir = path.join(currentDir, entry.name);
      const nextUrl = `${urlPrefix}/${entry.name}`;

      if (entry.isDirectory()) {
        walk(nextDir, nextUrl);
        continue;
      }

      if (entry.name.endsWith(".html")) {
        htmlPaths.push(nextUrl);
      }
    }
  }

  walk(publicDir, "");
  return htmlPaths;
}

function buildSitemapPaths() {
  const paths = new Set([
    ...extractStaticRoutes(),
    ...extractSlugs("src/data/features.ts").map((slug) => `/features/${slug}`),
    ...extractSlugs("src/data/jobsData.ts").map((slug) => `/careers/${slug}`),
    ...extractBlogSlugs().map((slug) => `/blog/${slug}`),
    ...extractPublicHtmlPaths(),
  ]);

  return [...paths].sort((a, b) => a.localeCompare(b));
}

function toAbsoluteUrl(routePath) {
  if (routePath === "/") {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${routePath}`;
}

function generateSitemapXml(paths) {
  const lastModified = new Date().toISOString().split("T")[0];

  const urlEntries = paths
    .map((routePath) => {
      const priority = routePath === "/" ? "1.0" : "0.8";

      return [
        "  <url>",
        `    <loc>${toAbsoluteUrl(routePath)}</loc>`,
        `    <lastmod>${lastModified}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    "</urlset>",
    "",
  ].join("\n");
}

const paths = buildSitemapPaths();
const sitemap = generateSitemapXml(paths);
const outputPath = path.join(root, "public/sitemap.xml");

fs.writeFileSync(outputPath, sitemap, "utf8");
console.log(`Generated sitemap with ${paths.length} URLs at public/sitemap.xml`);
