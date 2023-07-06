import { chromium } from 'k6/experimental/browser';
import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browser',
      vus: 1,
      duration: '1m',
    },
    news: {
      executor: 'constant-vus',
      exec: 'news',
      vus: 20,
      duration: '1m',
    },
  },
};

export async function browser() {
  const browser = chromium.launch({ headless: true });
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123'); // don't share this!

    page.screenshot({ path: 'screenshot.png' });
    sleep(5)
  } finally {
    page.close();
    browser.close();
  }
}


export function news() {
  const res = http.get('https://test.k6.io/news.php');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1)
}