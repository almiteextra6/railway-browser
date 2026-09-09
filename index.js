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

  try {
    await page.goto(URL, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    console.log("Opened:", URL);
  } catch (error) {
    console.log("Initial load error:", error.message);
  }

  // Keep browser process running
  setInterval(async () => {
    try {
      await page.reload({
        waitUntil: "domcontentloaded",
        timeout: 60000
      });

      console.log("Page refreshed:", new Date().toISOString());
    } catch (error) {
      console.log("Refresh error:", error.message);
    }
  }, 60000);
})();
