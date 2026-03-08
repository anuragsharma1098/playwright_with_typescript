/**
 * Auto-wait and Timeouts Test Suite
 * 
 * Comprehensive tests for Playwright's auto-wait mechanism and timeout handling
 * 
 * Auto-wait Concepts:
 * - Auto-wait: Playwright automatically waits for elements to be ready before action
 * - Visibility checks: Elements must be stable, visible, and in viewport
 * - Timeout handling: Built-in waits with configurable timeouts
 * - Force actions: Override auto-wait when needed
 * 
 * Key Features Tested:
 * - Page URL verification after navigation
 * - Page title verification with regex matching
 * - Element visibility assertions
 * - Force click on hidden elements
 * - Timeout behaviors and element readiness
 */

import { test, expect } from '@playwright/test';

/**
 * Test: Autowait and timeouts with different URL
 * 
 * Description: Verifies that page navigation to Wikipedia completes and the URL is correctly set
 * Demonstrates basic URL verification after page load
 */
test('Autowait and timeouts with different URL', async ({ page }) => {
  // Navigate to Wikipedia homepage
  await page.goto('https://www.wikipedia.org/');

  // Assert that the current page URL matches the navigated URL
  await expect(page).toHaveURL('https://www.wikipedia.org/');
});

/**
 * Test: Page title verification
 * 
 * Description: Verifies that the page title contains 'Wikipedia' using regex pattern matching
 * Demonstrates title verification with regular expressions
 */
test('Page title verification', async ({ page }) => {
  // Navigate to Wikipedia homepage
  await page.goto('https://www.wikipedia.org/');

  // Assert that page title matches the regex pattern 'Wikipedia'
  await expect(page).toHaveTitle(/Wikipedia/);
});

/**
 * Test: Element visibility check
 * 
 * Description: Verifies that the Wikipedia search box element is visible after page load
 * Demonstrates element visibility assertions and CSS locator usage
 */
test('Element visibility check', async ({ page }) => {
  // Navigate to Wikipedia homepage
  await page.goto('https://www.wikipedia.org/');

  // Locate the search input element using CSS selector
  const searchBox = page.locator('input[name="search"]');
  
  // Assert that the search box is visible on the page
  await expect(searchBox).toBeVisible();
});

/**
 * Test: Force click on hidden element
 * 
 * Description: Demonstrates forced clicking on elements that are not normally visible
 * Uses { force: true } option to bypass Playwright's auto-wait visibility checks
 * Verifies successful navigation after forced element interaction
 */
test('Force click on hidden element', async ({ page }) => {
  // Navigate to Wikipedia homepage
  await page.goto('https://www.wikipedia.org/');
  
  // Locate a hidden or non-visible element using ID selector
  const hiddenElement = page.locator('#js-link-box-en');
  
  // Force click on the element, bypassing visibility checks
  // Use this when element is hidden but still clickable
  await hiddenElement.click({ force: true });
  
  // Assert that the forced click successfully navigated to the English Wikipedia main page
  await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Main_Page');
});
