// Render brand PNGs from HTML with headless Chromium (Playwright).
// Called by scripts/make_brand_images.py with a JSON list of jobs:
//   [{"html": "/abs/path/page.html", "out": "/abs/path/image.png", "width": 1200, "height": 630}]
// Run by hand: NODE_PATH=$(npm root -g) node scripts/render_brand_images.js jobs.json
// Set CHROMIUM_PATH to use a specific browser binary. Keep this file em-dash free.
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const preferred = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch(fs.existsSync(preferred) ? { executablePath: preferred } : {});
  for (const job of jobs) {
    const page = await browser.newPage({ viewport: { width: job.width, height: job.height }, deviceScaleFactor: 1 });
    await page.goto('file://' + job.html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: job.out, clip: { x: 0, y: 0, width: job.width, height: job.height } });
    await page.close();
    console.log('Saved', job.out);
  }
  await browser.close();
})();
