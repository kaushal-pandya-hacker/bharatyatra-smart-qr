import puppeteer from 'puppeteer-core';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';

const DIST_DIR = join(process.cwd(), 'dist');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

// Simple static file server for dist
function startServer(port = 4173) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      const filePath = join(DIST_DIR, reqPath);

      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => {
      resolve(server);
    });
  });
}

const VIEWPORTS = [
  { name: 'Small mobile (320x640)', width: 320, height: 640, isMobile: true },
  { name: 'Standard mobile (360x800)', width: 360, height: 800, isMobile: true },
  { name: 'Mobile (375x812)', width: 375, height: 812, isMobile: true },
  { name: 'Large mobile (390x844)', width: 390, height: 844, isMobile: true },
  { name: 'Large mobile (430x932)', width: 430, height: 932, isMobile: true },
  { name: 'Small tablet (600x960)', width: 600, height: 960, isMobile: true },
  { name: 'Tablet (768x1024)', width: 768, height: 1024, isMobile: false },
  { name: 'Large tablet (1024x768)', width: 1024, height: 768, isMobile: false },
  { name: 'Laptop (1280x800)', width: 1280, height: 800, isMobile: false },
  { name: 'Desktop (1440x900)', width: 1440, height: 900, isMobile: false },
  { name: 'Large desktop (1920x1080)', width: 1920, height: 1080, isMobile: false },
  { name: 'Ultra-wide (2560x1440)', width: 2560, height: 1440, isMobile: false },
];

async function runAudit() {
  console.log('==================================================================');
  console.log('BHARATYATRA SMART QR — COMPLETE MULTI-VIEWPORT RESPONSIVE AUDIT');
  console.log('==================================================================\n');

  const server = await startServer(4173);
  const baseUrl = 'http://localhost:4173';
  console.log(`Local test server listening at: ${baseUrl}\n`);

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  let allPassed = true;
  const results = [];

  for (const vp of VIEWPORTS) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });

    await page.goto(baseUrl, { waitUntil: 'networkidle0' });

    // Check 1: Horizontal scroll / overflow check
    const overflowCheck = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.scrollWidth;
      const winWidth = window.innerWidth;
      const hasHorizontalScroll = docWidth > winWidth || bodyWidth > winWidth;
      return {
        docWidth,
        bodyWidth,
        winWidth,
        hasHorizontalScroll,
        overflowDelta: Math.max(docWidth - winWidth, bodyWidth - winWidth),
      };
    });

    // Check 2: Key elements rendered and visible
    const elementCheck = await page.evaluate(() => {
      const primaryButtons = document.querySelectorAll('#primary-action-buttons a');
      const qrCanvas = document.querySelector('#qr-studio canvas');
      const qrScanner = document.querySelector('#qr-scanner');
      const logo = document.querySelector('img[alt*="Emblem"], img[alt*="Logo"]');

      return {
        buttonCount: primaryButtons.length,
        hasQrCanvas: !!qrCanvas,
        hasScanner: !!qrScanner,
        hasLogo: !!logo,
      };
    });

    const isPass = !overflowCheck.hasHorizontalScroll && elementCheck.buttonCount === 6 && elementCheck.hasQrCanvas;
    if (!isPass) allPassed = false;

    results.push({
      viewport: vp.name,
      width: vp.width,
      height: vp.height,
      overflow: overflowCheck.hasHorizontalScroll ? `FAIL (+${overflowCheck.overflowDelta}px)` : 'PASS (0px)',
      buttonCount: elementCheck.buttonCount,
      qrCanvas: elementCheck.hasQrCanvas ? 'PASS' : 'FAIL',
      qrScanner: elementCheck.hasScanner ? 'PASS' : 'FAIL',
      status: isPass ? 'PASS' : 'FAIL',
    });

    console.log(`[${isPass ? 'PASS' : 'FAIL'}] ${vp.name.padEnd(28)} | Overflow: ${overflowCheck.hasHorizontalScroll ? 'FAIL (' + overflowCheck.overflowDelta + 'px)' : '0px (None)'} | Buttons: ${elementCheck.buttonCount}/6 | QR Canvas: ${elementCheck.hasQrCanvas ? 'Yes' : 'No'}`);

    // Capture representative screenshots
    if ([320, 390, 768, 1280, 1920].includes(vp.width)) {
      const filename = `RESPONSIVE-PREVIEW-${vp.width}px.png`;
      const screenshotPath = join(process.cwd(), '..', 'Business Card', filename);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`       📸 Screenshot captured: ${filename}`);
    }
  }

  await browser.close();
  server.close();

  console.log('\n==================================================================');
  console.log(allPassed ? 'ALL 12 VIEWPORT BREAKPOINTS PASSED 100% WITH ZERO OVERFLOW!' : 'SOME VIEWPORTS FAILED AUDIT');
  console.log('==================================================================\n');

  return allPassed;
}

runAudit().then((success) => {
  process.exit(success ? 0 : 1);
}).catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
