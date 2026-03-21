/**
 * Browser Context Test Suite
 *
 * Comprehensive tests for Playwright Browser, Context, and Page hierarchy
 *
 * Hierarchy Structure:
 * - Browser: Entry point for automation (chromium, firefox, webkit)
 * - Context: Isolated browser instance (incognito, normal)
 * - Page: Individual tab or window within a context
 *
 * Relationship:
 * browser ---> context ---> page
 * browser ---> chromium, firefox, webkit
 * contexts ---> incognito, normal
 * page ---> tab, window
 */

import { test, expect, Page, chromium, firefox, webkit } from '@playwright/test';

/**
 * Test: page demo
 *
 * Description: Verifies basic page creation and navigation using page fixture
 */
test('page demo', async ({ page }) => {
  await page.goto('https://www.google.com');
  const title = await page.title();
  expect(title).toBe('Google');
  page.close();
});

/**
 * Test: context demo
 *
 * Description: Demonstrates manual context creation and page creation within context
 */
test('context demo', async ({ context }) => {
  const page: Page = await context.newPage();
  await page.goto('https://www.google.com');
  const title = await page.title();
  expect(title).toBe('Google');
  await context.close();
});

/**
 * Test: browser demo
 *
 * Description: Demonstrates complete browser lifecycle including context and page creation
 */
test('browser demo', async ({ browser }) => {
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto('https://www.google.com');
  const title = await page.title();
  expect(title).toBe('Google');
  await context.close();
});

/**
 * Test: manual browser
 *
 * Description: Tests manual browser launch with different browser engines (chromium, firefox, webkit)
 */
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

/**
 * Test: multiple pages
 *
 * Description: Verifies creation and management of multiple pages within a single context
 */
test('multiple pages', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page1: Page = await context.newPage();
  const page2: Page = await context.newPage();
  console.log('no. of pages: ' + context.pages().length);
  await page1.goto('https://www.google.com');
  await page2.goto('https://www.bing.com');
  const title1 = await page1.title();
  const title2 = await page2.title();
  expect(title1).toBe('Google');
  expect(title2).toBe('Search - Microsoft Bing');
  await context.close();
});
