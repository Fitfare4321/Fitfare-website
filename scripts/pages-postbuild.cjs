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
