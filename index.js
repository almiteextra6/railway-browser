const { chromium } = require("playwright");

const URL = "https://web-terminal-b2ko2.sprites.app/";

(async () => {
  console.log("Starting browser...");

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();

  await page.goto(URL, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  console.log("Opened:", URL);

  setInterval(async () => {
    try {
      await page.reload({
        waitUntil: "domcontentloaded",
        timeout: 60000
      });

      console.log("Still running:", new Date().toISOString());
    } catch (err) {
      console.log("Reload error:", err.message);
    }
  }, 60000);
})();
