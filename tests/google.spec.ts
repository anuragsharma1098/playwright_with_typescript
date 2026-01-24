/**
 * Test suite for Google homepage verification
 * Tests basic page navigation and assertions
 */

import { test, expect } from '@playwright/test'

/**
 * Test: Google Homepage
 * 
 * Description: Verifies that Google homepage loads correctly by checking title and URL
 * 
 * Test Steps:
 * 1. Navigate to Google homepage
 * 2. Assert page title contains "Google"
 * 3. Assert URL matches expected Google homepage URL
 */
test('Google Homepage', async ({ page }) => {

  //Navigate to Google Homepage
  await page.goto('https://www.google.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
  await expect(page).toHaveURL('https://www.google.com')

 // console.log('Google homepage loaded successfully with correct title and URL.');
});