/**
 * Example test suite for Playwright
 * Basic tests demonstrating page navigation, assertions, and user interactions
 */

import { test, expect } from '@playwright/test';

/**
 * Test: has title
 * 
 * Description: Verifies that the Playwright documentation page loads and contains 'Playwright' in its title
 */
test('has title', async ({ page }) => {
  // Navigate to Playwright official documentation
  await page.goto('https://playwright.dev/');

  // Assert that page title contains "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});

/**
 * Test: get started link
 * 
 * Description: Verifies the "Get started" link navigation and successful display of Installation heading
 */
test('get started link', async ({ page }) => {
  // Navigate to Playwright documentation
  await page.goto('https://playwright.dev/');

  // Click the "Get started" link using accessible role
  await page.getByRole('link', { name: 'Get started' }).click();

  // Assert that Installation heading is visible on the destination page
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
