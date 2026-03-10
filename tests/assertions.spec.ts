import { test, expect } from '@playwright/test';

/**
 * assertions.spec.ts
 *
 * Demonstrates various Playwright assertion patterns including
 * auto-retry, soft/non-retry, negating-match, and combinations.
 * Each test includes explicit documentation of its intent,
 * steps, and expected behaviour.
 */

// ===== Website Assertions with Auto-Retry =====
test('should assert with auto-retry on website elements', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');

  // Auto-retry assertions - wait up to 5000ms by default
  // These will automatically retry if element is not ready
  expect(page.locator('h1')).toBeVisible();
  expect(page.locator('a:has-text("A/B Testing")')).toBeVisible();
  expect(page).toHaveURL(/the-internet/);
  expect(page.locator('body')).not.toContainText('Error');
});

/**
 * Test: website assertions without retry (soft assertions)
 *
 * Description:
 *   Shows how to use `expect.soft` for assertions that do not
 *   retry on failure. All soft assertions are collected and
 *   reported at the end of the test rather than stopping early.
 *
 * Steps:
 *   1. Navigate to https://www.saucedemo.com
 *   2. Soft-assert that the page title contains "Swag Labs"
 *   3. Soft-assert that the login button and wrapper are visible
 */
test('should assert without retry using soft assertions', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Soft assertions - do not retry, continue on failure
  expect.soft(await page.title()).toContain('Swag Labs');
  expect.soft(page.locator('[data-test="login-button"]')).toBeVisible();
  expect.soft(page.locator('.login_wrapper')).toBeVisible();

  // All assertions above will be collected and reported at the end
});

/**
 * Test: website assertions with negating matches
 *
 * Description:
 *   Demonstrates assertions that verify elements or the page
 *   do *not* meet certain conditions. Useful for ensuring
 *   absence of errors or unwanted states.
 *
 * Steps:
 *   1. Go to the demo site
 *   2. Assert no visible error elements exist
 *   3. Assert page content does not include "404 Not Found"
 *   4. Confirm header does not contain "Error"
 *   5. Ensure URL does not match a 404 pattern
 */
test('should assert with negating match conditions', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');

  // Negating assertions - element should NOT be in certain state
  expect(page.locator('[class*="error"]')).not.toBeVisible();
  expect(await page.content()).not.toContain('404 Not Found');
  expect(page.locator('h1')).not.toContainText('Error');
  expect(page.locator('body')).not.toHaveClass(/error/);
  expect(page).not.toHaveURL(/404/);
});

/**
 * Test: combined auto-retry with negating assertions
 *
 * Description:
 *   Combines auto-retry behaviour with negating conditions to
 *   wait for elements to *stop* being in certain states.
 *   This pattern is useful when waiting for transient errors
 *   to disappear or inputs to become editable.
 *
 * Steps:
 *   1. Navigate to the login page
 *   2. Assert the error message is not visible
 *   3. Assert the login button is enabled
 *   4. Assert username input is not readonly
 */
test('should combine auto-retry with negating assertions', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  // Auto-retry negating assertions - waits for element to NOT be in state
  expect(page.locator('[data-test="error"]')).not.toBeVisible();
  expect(page.locator('button:has-text("Login")')).not.toBeDisabled();
  expect(page.locator('input[type="text"]')).not.toHaveAttribute('readonly', 'true');
});

/**
 * Test: form assertions using auto-retry, soft, and negating types
 *
 * Description:
 *   Walks through a login form and applies all three assertion
 *   behaviours: default (auto-retry), soft/non-retry, and negation.
 *   This shows how to mix patterns within a single workflow.
 *
 * Steps:
 *   1. Load the Saucedemo login page
 *   2. Auto-retry: verify username field is visible and enabled
 *   3. Soft assertions: check password field and login button
 *   4. Negating: ensure no error message and inputs are editable
 */
test('should assert form elements with different assertion types', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // 1. AUTO-RETRY - Wait for form to be ready
  expect(page.locator('[data-test="username"]')).toBeVisible();
  expect(page.locator('[data-test="username"]')).toBeEnabled();

  // 2. SOFT/NON-RETRY - Check multiple conditions without stopping on first failure
  expect.soft(page.locator('[data-test="password"]')).toBeVisible();
  expect.soft(page.locator('[data-test="login-button"]')).toBeVisible();

  // 3. NEGATING MATCH - Verify negative conditions
  expect(page.locator('[data-test="error-message"]')).not.toBeVisible();
  expect(page.locator('[data-test="username"]')).not.toHaveAttribute('readonly');
  expect(page.locator('[data-test="password"]')).not.toHaveAttribute('disabled');
});

/**
 * Test: element state assertions on a checkbox page
 *
 * Description:
 *   Uses a page with checkboxes to demonstrate assertions on
 *   element visibility, count, and attachment state using
 *   different retry behaviours.
 *
 * Steps:
 *   1. Open the checkbox example page
 *   2. Auto-retry: verify headers and checkbox container
 *   3. Soft assertions: count checkbox inputs and form visibility
 *   4. Negating: ensure no error, notification, or hidden spans
 */
test('should assert various element states on website', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  // AUTO-RETRY - Element states with automatic waiting
  expect(page.locator('h3')).toContainText('Checkboxes');
  expect(page.locator('#checkboxes')).toBeVisible();
  expect(page.locator('input[type="checkbox"]').first()).toBeVisible();

  // NON-RETRY SOFT ASSERTIONS
  expect.soft(page.locator('input[type="checkbox"]')).toHaveCount(2);
  expect.soft(page.locator('form')).toBeVisible();

  // NEGATING MATCH
  expect(page.locator('[class="error"]')).not.toBeVisible();
  expect(page.locator('.notification')).not.toBeAttached();
  expect(page.locator('span.hidden')).not.toBeVisible();
});

/**
 * Test: text content assertions showcasing retry types
 *
 * Description:
 *   Asserts on page text and URLs with auto-retry, soft
 *   assertions, and negating matches to illustrate each
 *   behaviour with text-specific conditions.
 *
 * Steps:
 *   1. Navigate to the main demo site
 *   2. Auto-retry: ensure header and body are visible
 *   3. Soft: check header text and URL contents
 *   4. Negating: verify absence of "404"/"Error" text and URL
 */
test('should assert text content with different retry behaviors', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');

  // AUTO-RETRY - Text content with automatic waiting
  expect(page.locator('h1')).toBeVisible();
  expect(page.locator('body')).toBeVisible();

  // SOFT/NON-RETRY - Multiple assertions for content
  expect.soft(page.locator('h1')).toContainText('the-internet');
  expect.soft(page).toHaveURL(/the-internet/);

  // NEGATING MATCH - Content should NOT contain
  expect(page.locator('h1')).not.toContainText('404');
  expect(page.locator('h1')).not.toContainText('Error');
  expect(page).not.toHaveURL(/404/);
});

/**
 * Test: URL and navigation assertions with varied types
 *
 * Description:
 *   Demonstrates assertions against the page URL and title
 *   using auto-retry, soft assertions, and negating patterns.
 *   Useful for verifying navigation outcomes and page metadata.
 *
 * Steps:
 *   1. Visit the demo homepage
 *   2. Auto-retry: assert URL and title match expectations
 *   3. Soft: perform additional URL/title checks without retry
 *   4. Negating: ensure URL/title do not match error patterns
 */
test('should assert URL and navigation with different assertion types', async ({ page }) => {
  // AUTO-RETRY - URL assertion with waiting
  await page.goto('https://the-internet.herokuapp.com');
  expect(page).toHaveURL(/the-internet\.herokuapp\.com/);
  expect(page).toHaveTitle(/The Internet/);

  // SOFT/NON-RETRY - URL checks
  expect.soft(page.url()).toContain('the-internet.herokuapp.com');
  expect.soft(await page.title()).toMatch(/The Internet/);

  // NEGATING MATCH - URL should NOT be
  expect(page).not.toHaveURL(/admin\.herokuapp\.com/);
  expect(page).not.toHaveTitle('404 - Not Found');
});
