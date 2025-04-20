const puppeteer = require('puppeteer');
const fs = require('fs');

const url = process.env.SCRAPE_URL;

(async () => {
  if (!url) {
    console.error("❌ No URL provided! Set SCRAPE_URL environment variable.");
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Inject a <meta name="description"> tag into the page (for testing only)
  await page.evaluate(() => {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "This is a sample page scraped with Puppeteer.";
      document.head.appendChild(meta);
    }
  });

  const data = await page.evaluate(() => {
    const title = document.title || "No title";
    const heading = document.querySelector('h1')?.innerText || "No <h1> found";
    const description = document.querySelector('meta[name="description"]')?.content || "No description";
    return { title, heading, description };
  });
  
  fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
