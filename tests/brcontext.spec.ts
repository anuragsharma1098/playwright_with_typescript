import { test, expect, Page, chromium, firefox, webkit } from '@playwright/test';

// browser ---> context ---> page
// browser ---> chromium, firefox, webkit
// contexts ---> incognito, normal
// page ---> tab, window

test('page demo', async ({ page }) => {
  await page.goto('https://www.google.com');
  const title = await page.title();
  expect(title).toBe('Google');
  page.close();
});

test('context demo', async ({ context }) => {
  const page: Page = await context.newPage();
  await page.goto('https://www.google.com');
  const title = await page.title();
  expect(title).toBe('Google');
  await context.close();
});

test('browser demo', async ({ browser }) => {
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto('https://www.google.com');
  const title = await page.title();
  expect(title).toBe('Google');
  await context.close();
});

test('manual browser', async () => {
//   const browser = await chromium.launch();
//   const browser = await firefox.launch();
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto('https://www.google.com');
  const title = await page.title();
  expect(title).toBe('Google');
  await context.close();
});
