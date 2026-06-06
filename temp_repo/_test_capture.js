const path = require("path");
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file:///C:/Users/USER/Documents/agnes_project/book_grassland.html");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "C:/Users/USER/Documents/agnes_project/browser_book_grassland.png", fullPage: true });
  await browser.close();
  console.log("Done");
})();
