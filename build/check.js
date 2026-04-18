import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const PASS  = '\x1b[32m✓\x1b[0m';
const WARN  = '\x1b[33m⚠\x1b[0m';
const FAIL  = '\x1b[31m✗\x1b[0m';

let warnings = 0;
let failures = 0;

function pass(msg)  { console.log(` ${PASS}  ${msg}`); }
function warn(msg)  { console.log(` ${WARN}  ${msg}`); warnings++; }
function fail(msg)  { console.log(` ${FAIL}  ${msg}`); failures++; }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readJSON(path) {
  return JSON.parse(readFileSync(resolve(path), 'utf8'));
}

function readText(path) {
  return readFileSync(resolve(path), 'utf8');
}

function fileSizeKB(path) {
  try { return Math.round(statSync(resolve(path)).size / 1024); }
  catch { return null; }
}

// ─── Checks ───────────────────────────────────────────────────────────────────

console.log('\nPost-build checks\n');

// 1. Placeholder API keys
const site = readJSON('src/_data/site.json');

if (!site.gaId) {
  warn('GA4: gaId is empty — analytics will not fire');
} else if (site.gaId.includes('XXXXXXXXXX')) {
  warn('GA4: gaId is still a placeholder — replace with real tracking ID');
} else {
  pass(`GA4 ID set: ${site.gaId}`);
}

if (!site.web3formsKey) {
  warn('Web3Forms: web3formsKey is empty — contact form will not work');
} else if (site.web3formsKey.includes('YOUR_')) {
  warn('Web3Forms: web3formsKey is still a placeholder — replace with real access key');
} else {
  pass('Web3Forms key set');
}

// 2. site.url sync between site.json and .eleventy.js
const eleventyConfig = readText('.eleventy.js');
const eleventyUrlMatch = eleventyConfig.match(/url:\s*["']([^"']+)["']/);
const eleventyUrl = eleventyUrlMatch ? eleventyUrlMatch[1] : null;

if (!eleventyUrl) {
  warn('Could not find url in .eleventy.js globalData');
} else if (eleventyUrl !== site.url) {
  fail(`site.url mismatch — site.json: "${site.url}" vs .eleventy.js: "${eleventyUrl}"`);
} else {
  pass(`site.url in sync: ${site.url}`);
}

// 3. dist/ asset sizes
const cssSize = fileSizeKB('dist/css/main.css');
const jsSize  = fileSizeKB('dist/js/main.js');

if (cssSize === null) { warn('dist/css/main.css not found — run npm run build first'); }
else if (cssSize > 100) { warn(`CSS is ${cssSize} KB — consider auditing for unused styles`); }
else { pass(`CSS: ${cssSize} KB`); }

if (jsSize === null) { warn('dist/js/main.js not found — run npm run build first'); }
else if (jsSize > 100) { warn(`JS is ${jsSize} KB — consider code splitting`); }
else { pass(`JS: ${jsSize} KB`); }

// 4. console.log in src/js
const jsFiles = readdirSync(resolve('src/js')).filter(f => f.endsWith('.js'));
const consoleLogs = [];
for (const file of jsFiles) {
  const content = readText(`src/js/${file}`);
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (/console\.log\(/.test(line)) consoleLogs.push(`src/js/${file}:${i + 1}`);
  });
}
if (consoleLogs.length) {
  warn(`console.log found — remove before launch:\n     ${consoleLogs.join('\n     ')}`);
} else {
  pass('No console.log in src/js');
}

// 5. Images missing WebP counterparts in dist/img/
const srcImgDir  = resolve('src/img');
const distImgDir = resolve('dist/img');
const srcImages  = readdirSync(srcImgDir).filter(f =>
  /\.(jpg|jpeg|png)$/i.test(f) && !f.startsWith('og-image') && !f.startsWith('icon')
);
const missingWebP = srcImages.filter(f => {
  const webp = f.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  try { statSync(join(distImgDir, webp)); return false; }
  catch { return true; }
});
if (missingWebP.length) {
  warn(`Images missing WebP in dist/ (run npm run build:images):\n     ${missingWebP.join('\n     ')}`);
} else {
  pass(`All ${srcImages.length} content images have WebP counterparts in dist/`);
}

// 6. robots.txt sitemap URL matches site.url
const robots = readText('src/static/robots.txt');
const robotsSitemapMatch = robots.match(/Sitemap:\s*(\S+)/);
const robotsSitemapUrl = robotsSitemapMatch ? robotsSitemapMatch[1] : null;
const expectedSitemap = `${site.url}/sitemap.xml`;

if (!robotsSitemapUrl) {
  warn('No Sitemap directive found in robots.txt');
} else if (robotsSitemapUrl !== expectedSitemap) {
  fail(`robots.txt Sitemap URL mismatch\n     found:    ${robotsSitemapUrl}\n     expected: ${expectedSitemap}`);
} else {
  pass('robots.txt Sitemap URL matches site.url');
}

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log('');
if (failures > 0) {
  console.log(` ${FAIL}  ${failures} failure(s), ${warnings} warning(s) — fix failures before deploying.\n`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(` ${WARN}  ${warnings} warning(s) — review before launch.\n`);
} else {
  console.log(` ${PASS}  All checks passed.\n`);
}
