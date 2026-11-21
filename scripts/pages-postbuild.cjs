const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

try {
  const root = process.cwd();
  const dist = path.join(root, 'dist');
  const docs = path.join(root, 'docs');

  if (!fs.existsSync(dist)) {
    console.error('dist folder not found. Run "vite build" first.');
    process.exit(1);
  }

  // Create SPA fallback: copy index.html -> 404.html
  const indexHtml = path.join(dist, 'index.html');
  const notFoundHtml = path.join(dist, '404.html');
  fs.copyFileSync(indexHtml, notFoundHtml);

  // Create explicit directories for known static routes to prevent 404 console errors on GitHub Pages
  const staticRoutes = new Set([
    'privacy-policy',
    'privacy',
    'terms-and-conditions',
    'cancellation-refunds',
    'contact',
    'support',
    'partner-form',
    'for-partners',
    'partners',
    'on-demand',
    'compact',
    'fitness-on-demand',
    'fit-credits',
    'pay-per-go',
    'thrivethon',
    'careers',
    'about-FitFare',
    'about',
    'event',
    'services',
    'gurgaon',
    'noida',
    'south-delhi',
    'delhi-ncr',
    'blog',
    'webapp-demo',
    'owner-access',
    'owner-access/services',
    'owner-access/inbox',
    'owner-access/orders',
    'owner-access/billings',
    'owner-access/pricing',
    'owner-access/team',
    'owner-access/reviews',
    'owner-access/profile',
    'owner-access/gallery'
  ]);

  // Dynamically include all routes from sitemap.xml if available
  const sitemapPath = path.join(root, 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    for (const match of sitemapContent.matchAll(/<loc>https?:\/\/[^\/]+\/([^<]+)<\/loc>/g)) {
      let r = match[1].trim();
      if (r && !r.endsWith('.html') && !r.endsWith('.xml') && !r.endsWith('.png') && !r.endsWith('.jpg') && !r.endsWith('.svg')) {
        staticRoutes.add(r.replace(/\/+$/, ''));
      }
    }
  }

  // Also include routes from App.tsx
  const appPath = path.join(root, 'src', 'App.tsx');
  if (fs.existsSync(appPath)) {
    const appContent = fs.readFileSync(appPath, 'utf8');
    for (const match of appContent.matchAll(/<Route\s+path="([^"]+)"/g)) {
      let r = match[1].trim();
      if (r && r !== '/' && r !== '*' && !r.includes(':')) {
        if (r.startsWith('/')) r = r.slice(1);
        if (!r.endsWith('.html')) {
          staticRoutes.add(r.replace(/\/+$/, ''));
        }
      }
    }
  }

  console.log(`Generating static files for ${staticRoutes.size} routes...`);

  staticRoutes.forEach(route => {
    // 1. Generate route.html for extensionless URLs
    const htmlPath = path.join(dist, `${route}.html`);
    const htmlDir = path.dirname(htmlPath);
    if (!fs.existsSync(htmlDir)) {
      fs.mkdirSync(htmlDir, { recursive: true });
    }
    fs.copyFileSync(indexHtml, htmlPath);
    
    // 2. Generate route/index.html for trailing slash URLs
    const routeDir = path.join(dist, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.copyFileSync(indexHtml, path.join(routeDir, 'index.html'));
  });

  // Ensure Jekyll does not process output
  const nojekyllDist = path.join(dist, '.nojekyll');
  fs.writeFileSync(nojekyllDist, '');

  // Replace docs with dist
  if (fs.existsSync(docs)) {
    fs.rmSync(docs, { recursive: true, force: true });
  }
  copyDir(dist, docs);

  // Add .nojekyll in docs too
  fs.writeFileSync(path.join(docs, '.nojekyll'), '');

  console.log('✅ GitHub Pages assets prepared in /docs with SPA fallback (404.html).');
} catch (err) {
  console.error('❌ pages-postbuild failed:', err);
  process.exit(1);
}
