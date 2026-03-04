/**
 * Pop-ups Test Suite
 * 
 * Comprehensive tests for handling browser pop-ups in Playwright
 * 
 * Pop-up Concepts:
 * - Pop-ups: New browser windows/pages opened from user interactions
 * - context.waitForEvent('popup'): Waits for a pop-up window to be created
 * - Promise.all(): Coordinate waiting for pop-up with user action that triggers it
 * - context.pages(): Returns all pages including parent and pop-up windows
 * - Page identification: Use page titles and URLs to identify specific pop-ups
 * 
 * Pop-up Handling Patterns:
 * - Detect new pop-ups from user interactions (clicks, form submissions)
 * - Access and interact with pop-up content
 * - Switch between parent page and pop-up pages
 * - Close pop-ups after verification
 */

import { test, expect, Page } from '@playwright/test';

/**
 * Test: handle popups
 * 
 * Description: Verifies browser pop-up detection, identification by title, and interaction
 * Demonstrates waiting for pop-ups, accessing multiple pages, and selective pop-up closure
 */
test('handle popups', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://testautomationpractice.blogspot.com/');

  await Promise.all([page.waitForEvent('popup'), await page.locator('#PopUp').click()]);

  const allPopupwindows = context.pages();
  console.log('allPopupwindows.length:', allPopupwindows.length);

  // Parent Page URL
  console.log('allPopupwindows[0].url():', await allPopupwindows[0].url());
  // PopUp Page URL
  console.log('allPopupwindows[1].url():', await allPopupwindows[1].url());

  for (const pw of allPopupwindows) {
    const title = await pw.title();
    console.log('Page Title: ', title);
    if (title.includes('Selenium')) {
      // Perform actions on the popup page if needed
      await pw.close();
    }
  }
});
