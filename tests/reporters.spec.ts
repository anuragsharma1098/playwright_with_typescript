import { test, expect } from '@playwright/test';
import { before, beforeEach } from 'node:test';

// Allure Report
// Allure cmd line: npm install -D allure-commandline
// Pre-requisite: npm install -D allure-playwright
// To generate allure report: npx allure generate --clean
// To open allure report: npx allure open

test.beforeEach(() => {
  console.log('before each test');
});
test('reporter test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  expect(title).toBe('Fast and reliable end-to-end testing for modern web apps | Playwright');
});

test('reporter test 2', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  expect(title).toBe('Fast and reliable end-to-end testing for modern web apps | Playwright');
});

test('reporter test 3', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  expect(title).toBe('Fast and reliable end-to-end testing for modern web apps | Playwright');
});
