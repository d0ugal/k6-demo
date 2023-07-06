import { chromium } from 'k6/experimental/browser';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '1m', target: 1 },
  ],
};

export default async function () {

  const browser = chromium.launch({
    headless: false,
    timeout: '60s',
  });
  const page = browser.newPage();

  const url = `https://test.k6.io/my_messages.php`;
  try {
    await page.goto(url);
    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123'); // don't share this!
    page.screenshot({ path: 'screenshot-login.png' });
    await page.keyboard.press('Enter');
    page.screenshot({ path: 'screenshot-logged-in.png' });
    sleep(5);
  } finally {
    page.close();
    browser.close();
  }
}