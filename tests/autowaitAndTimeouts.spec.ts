import { test, expect } from '@playwright/test';

test('Autowait and timeouts with different URL', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  await expect(page).toHaveURL('https://www.wikipedia.org/');
});

test('Page title verification', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  await expect(page).toHaveTitle(/Wikipedia/);
});

test('Element visibility check', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  const searchBox = page.locator('input[name="search"]');
  await expect(searchBox).toBeVisible();
});
