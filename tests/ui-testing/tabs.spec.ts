/**
 * Tabs (Multiple Pages) Test Suite
 *
 * Comprehensive tests for handling multiple browser tabs/pages in Playwright
 *
 * Tabs/Pages Concepts:
 * - Tabs: Individual page instances within a browser context
 * - context.newPage(): Creates a new page/tab in the context
 * - context.pages(): Returns all pages in the context
 * - context.waitForEvent('page'): Waits for a new page to be created
 * - Promise.all(): Coordinate waiting for new page creation with user action
 *
 * Tab Handling Patterns:
 * - Single page: Browser automation within one tab
 * - Multiple pages: Handling user actions that open new tabs
 * - Parent-child relationships: Track relationships between pages
 * - Page switching: Navigate between multiple open pages
 */

import { test, expect, chromium } from '@playwright/test';

/**
 * Test: handle tabs
 *
 * Description: Verifies creation and handling of multiple tabs/pages within a browser context
 * Demonstrates waiting for new pages, accessing page properties, and managing multiple tabs
 */
test('handle tabs', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Open a new page (tab) in the browser context
  const parentPage = await context.newPage();

  await parentPage.goto('https://testautomationpractice.blogspot.com/');

  // context.waitForEvent('page');
  // parentPage.locator("button:has-text('New Tab')").click();

  const [childPage] = await Promise.all([
    context.waitForEvent('page'),
    parentPage.locator("button:has-text('New Tab')").click(),
  ]);

  const pages = context.pages();
  console.log('Total Pages: ', pages.length);

  for (const page of pages) {
    console.log('Page Title: ', await page.title());
  }

  console.log('Parent Page URL: ', parentPage.url());
  console.log('Parent Page Title: ', await parentPage.title());
  console.log('Child Page URL: ', childPage.url());
  console.log('Child Page Title: ', await childPage.title());
});
