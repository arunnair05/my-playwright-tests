import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle' });
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForURL('**/inventory.html', { timeout: 10000 });
    const url = page.url();
    if (url.includes('/inventory.html')) {
      console.log('SUCCESS: landed at', url);
      await browser.close();
      process.exit(0);
    } else {
      console.error('FAIL: landed at', url);
      await browser.close();
      process.exit(2);
    }
  } catch (err) {
    console.error('ERROR:', err.message || err);
    await browser.close();
    process.exit(1);
  }
})();
