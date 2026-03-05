/**
 * Test suite for HTTP Basic Authentication handling
 * Tests various approaches to authenticate with HTTP basic auth popups
 */

import { test, expect, Page } from '@playwright/test';

/**
 * Test: authenticate popups Approach 1
 * 
 * Description: 
 * Authenticates to a protected endpoint by including credentials directly in the URL.
 * This approach embeds username and password in the URL string itself.
 * 
 * Test Steps:
 * 1. Create a new browser context
 * 2. Create a new page within the context
 * 3. Navigate to basic auth endpoint with credentials in URL format (username:password@url)
 * 4. Wait for page to fully load
 * 5. Verify "Congratulations" message is displayed on successful authentication
 * 
 * Note: This approach works but is not recommended as credentials are exposed in the URL
 */
test('authenticate popups Approach 1', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // https://the-internet.herokuapp.com/basic_auth
  //https://username:password@the-internet.herokuapp.com/basic_auth
  // await page.goto('https://the-internet.herokuapp.com/basic_auth');
  await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
  await page.waitForLoadState();
  expect(await page.locator('text=Congratulations').isVisible()).toBeTruthy();
});

/**
 * Test: authenticate popups Approach 2 (preferred)
 * 
 * Description:
 * Authenticates to a protected endpoint using Playwright's built-in HTTP credentials context option.
 * This is the recommended approach as it securely handles credentials without exposing them in the URL.
 * 
 * Test Steps:
 * 1. Create a new browser context with httpCredentials option
 * 2. Pass username and password through context configuration
 * 3. Create a new page within the authenticated context
 * 4. Navigate to basic auth endpoint (without credentials in URL)
 * 5. Wait for page to fully load
 * 6. Verify "Congratulations" message is displayed on successful authentication
 * 
 * Note: This is the preferred approach as it handles HTTP basic auth securely and cleanly
 */
test('authenticate popups Approach 2 (preferred)', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: 'admin', password: 'admin' },
  });
  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/basic_auth');
  await page.waitForLoadState();
  expect(await page.locator('text=Congratulations').isVisible()).toBeTruthy();
});
